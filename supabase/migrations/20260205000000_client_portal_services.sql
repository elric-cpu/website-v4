-- Client Portal Services and Subscriptions Schema
-- This migration adds tables and functions to support:
-- 1. Fixed-price service menu and ordering
-- 2. Subscription management for maintenance plans
-- 3. Job request system for clients
-- 4. Service order tracking and billing

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Service Categories and Fixed-Price Menu
CREATE TABLE service_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  icon text,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE fixed_price_services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES service_categories(id),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  unit text NOT NULL DEFAULT 'each',
  features jsonb DEFAULT '[]',
  stripe_price_id text,
  active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscription Plans
CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  interval text NOT NULL CHECK (interval IN ('month', 'quarter', 'year')),
  features jsonb DEFAULT '[]',
  stripe_price_id text,
  active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Client Subscriptions
CREATE TABLE client_subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_plan_id uuid NOT NULL REFERENCES subscription_plans(id),
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'canceled', 'past_due')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  next_billing_date timestamptz,
  paused_at timestamptz,
  canceled_at timestamptz,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job Requests from Clients
CREATE TABLE job_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('general', 'insurance', 'emergency', 'maintenance')),
  title text NOT NULL,
  description text,
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  service_address text NOT NULL,
  contact_phone text NOT NULL,
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'quoted', 'scheduled', 'in_progress', 'completed', 'canceled')),
  assigned_to uuid REFERENCES auth.users(id),
  estimated_cost decimal(10,2),
  actual_cost decimal(10,2),
  scheduled_date timestamptz,
  completed_date timestamptz,
  notes text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Orders (Fixed-Price Services)
CREATE TABLE service_orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id uuid REFERENCES fixed_price_services(id),
  service_type text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  service_address text NOT NULL,
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'scheduled', 'in_progress', 'completed', 'canceled')),
  stripe_payment_intent_id text,
  scheduled_date timestamptz,
  completed_date timestamptz,
  assigned_technician uuid REFERENCES auth.users(id),
  notes text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Order Line Items (for complex orders)
CREATE TABLE service_order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_order_id uuid NOT NULL REFERENCES service_orders(id) ON DELETE CASCADE,
  service_id uuid REFERENCES fixed_price_services(id),
  description text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Client Subscription Usage Tracking
CREATE TABLE subscription_usage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id uuid NOT NULL REFERENCES client_subscriptions(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  usage_date date NOT NULL DEFAULT CURRENT_DATE,
  quantity integer NOT NULL DEFAULT 1,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Insert default service categories
INSERT INTO service_categories (name, description, icon, display_order) VALUES
('Maintenance', 'Regular maintenance and upkeep services', 'home', 1),
('Plumbing', 'Plumbing repairs and installations', 'wrench', 2),
('Electrical', 'Electrical work and installations', 'zap', 3),
('HVAC', 'Heating and cooling services', 'thermometer', 4),
('General', 'General repair and improvement services', 'tool', 5);

-- Insert default fixed-price services
INSERT INTO fixed_price_services (category_id, name, description, price, unit, features, stripe_price_id) VALUES
((SELECT id FROM service_categories WHERE name = 'Maintenance'),
 'Smoke Alarm Installation',
 'Professional installation of smoke alarm with testing and compliance check',
 75.00,
 'each',
 '["Professional installation", "Testing included", "Compliance verification", "1-year warranty"]',
 'price_smoke_alarm_install'),

((SELECT id FROM service_categories WHERE name = 'Maintenance'),
 'Air Handler Filter Cleaning',
 'Complete cleaning and filter replacement for air handler unit',
 95.00,
 'each',
 '["Filter replacement", "Coil cleaning", "System inspection", "Performance test"]',
 'price_air_handler_clean'),

((SELECT id FROM service_categories WHERE name = 'Maintenance'),
 'Gutter Cleaning Service',
 'Complete gutter cleaning, debris removal, and downspout check',
 150.00,
 'linear foot',
 '["Debris removal", "Downspout clearing", "Visual inspection", "Minor repair identification"]',
 'price_gutter_clean'),

((SELECT id FROM service_categories WHERE name = 'Maintenance'),
 'HVAC Filter Replacement',
 'Professional filter replacement service (up to 4 units)',
 60.00,
 'service call',
 '["Up to 4 filters", "Filter disposal", "System check", "Maintenance log"]',
 'price_hvac_filter'),

((SELECT id FROM service_categories WHERE name = 'Plumbing'),
 'Faucet Repair Service',
 'Fix leaky or malfunctioning faucets with parts included',
 85.00,
 'each',
 '["Diagnosis included", "Common parts included", "2-hour service window", "90-day warranty"]',
 'price_faucet_repair'),

((SELECT id FROM service_categories WHERE name = 'Plumbing'),
 'Toilet Repair Service',
 'Complete toilet repair including flush mechanism and seals',
 95.00,
 'each',
 '["Complete diagnosis", "Parts replacement", "Leak testing", "Performance verification"]',
 'price_toilet_repair'),

((SELECT id FROM service_categories WHERE name = 'Electrical'),
 'Electrical Outlet Installation',
 'Install new electrical outlet with GFCI protection where required',
 125.00,
 'each',
 '["GFCI protection", "Code compliance", "Safety testing", "Clean installation"]',
 'price_outlet_install'),

((SELECT id FROM service_categories WHERE name = 'Electrical'),
 'Light Fixture Installation',
 'Professional installation of ceiling or wall-mounted light fixture',
 145.00,
 'each',
 '["Wiring included", "Switch installation", "Safety testing", "Fixture mounting"]',
 'price_light_install');

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, interval, features, stripe_price_id) VALUES
('Basic Maintenance Plan',
 'Quarterly maintenance visits including filter changes and basic inspections',
 49.00,
 'month',
 '["Quarterly visits", "Filter replacements", "Basic inspections", "Priority scheduling"]',
 'price_basic_maintenance'),

('Premium Maintenance Plan',
 'Monthly maintenance with priority service and emergency response',
 99.00,
 'month',
 '["Monthly visits", "Emergency response", "Priority service", "Comprehensive inspections", "Repair discounts"]',
 'price_premium_maintenance');

-- Create indexes for performance
CREATE INDEX idx_client_subscriptions_user_id ON client_subscriptions(user_id);
CREATE INDEX idx_client_subscriptions_status ON client_subscriptions(status);
CREATE INDEX idx_job_requests_user_id ON job_requests(user_id);
CREATE INDEX idx_job_requests_status ON job_requests(status);
CREATE INDEX idx_job_requests_type ON job_requests(type);
CREATE INDEX idx_service_orders_user_id ON service_orders(user_id);
CREATE INDEX idx_service_orders_status ON service_orders(status);
CREATE INDEX idx_service_orders_scheduled_date ON service_orders(scheduled_date);
CREATE INDEX idx_fixed_price_services_category ON fixed_price_services(category_id);
CREATE INDEX idx_fixed_price_services_active ON fixed_price_services(active);

-- Row Level Security Policies
ALTER TABLE client_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_usage ENABLE ROW LEVEL SECURITY;

-- Clients can only access their own data
CREATE POLICY "clients_own_subscriptions" ON client_subscriptions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "clients_own_job_requests" ON job_requests
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "clients_own_service_orders" ON service_orders
  FOR ALL USING (auth.uid() = user_id);

-- Staff can access all records
CREATE POLICY "staff_access_all_subscriptions" ON client_subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' = 'staff'
    )
  );

CREATE POLICY "staff_access_all_job_requests" ON job_requests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' = 'staff'
    )
  );

CREATE POLICY "staff_access_all_service_orders" ON service_orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' = 'staff'
    )
  );

-- Public read access to service catalog
CREATE POLICY "public_read_service_categories" ON service_categories
  FOR SELECT USING (active = true);

CREATE POLICY "public_read_fixed_price_services" ON fixed_price_services
  FOR SELECT USING (active = true);

CREATE POLICY "public_read_subscription_plans" ON subscription_plans
  FOR SELECT USING (active = true);

-- Functions for portal data retrieval
CREATE OR REPLACE FUNCTION get_client_portal_bundle()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  user_id uuid;
BEGIN
  user_id := auth.uid();

  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT jsonb_build_object(
    'project', (
      SELECT jsonb_build_object(
        'project_id', 'PROJ-' || substr(user_id::text, 1, 8),
        'project_name', 'Client Project',
        'job_type', 'Residential Service',
        'current_state', 'Active'
      )
    ),
    'documents', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', id,
          'title', title,
          'file_name', file_name,
          'category', category,
          'url', url,
          'upload_source', upload_source
        )
      ), '[]'::jsonb)
      FROM documents
      WHERE user_id = get_client_portal_bundle.user_id
    ),
    'invoices', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', id,
          'title', title,
          'amount', amount,
          'status', status,
          'due_date', due_date
        )
      ), '[]'::jsonb)
      FROM invoices
      WHERE user_id = get_client_portal_bundle.user_id
    ),
    'subscriptions', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', cs.id,
          'name', sp.name,
          'description', sp.description,
          'price', sp.price,
          'interval', sp.interval,
          'status', cs.status,
          'next_billing_date', cs.next_billing_date,
          'features', sp.features
        )
      ), '[]'::jsonb)
      FROM client_subscriptions cs
      JOIN subscription_plans sp ON cs.subscription_plan_id = sp.id
      WHERE cs.user_id = get_client_portal_bundle.user_id
    ),
    'job_requests', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', id,
          'type', type,
          'title', title,
          'status', status,
          'priority', priority,
          'service_address', service_address,
          'created_at', created_at
        )
      ), '[]'::jsonb)
      FROM job_requests
      WHERE user_id = get_client_portal_bundle.user_id
    ),
    'service_orders', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', so.id,
          'service_name', fps.name,
          'quantity', so.quantity,
          'total_amount', so.total_amount,
          'status', so.status,
          'scheduled_date', so.scheduled_date,
          'service_address', so.service_address
        )
      ), '[]'::jsonb)
      FROM service_orders so
      LEFT JOIN fixed_price_services fps ON so.service_id = fps.id
      WHERE so.user_id = get_client_portal_bundle.user_id
    )
  ) INTO result;

  RETURN result;
END;
$$;

-- Function to get available services for ordering
CREATE OR REPLACE FUNCTION get_available_services(category_filter text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'services', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', fps.id,
          'name', fps.name,
          'description', fps.description,
          'price', fps.price,
          'unit', fps.unit,
          'features', fps.features,
          'category', sc.name,
          'stripe_price_id', fps.stripe_price_id
        )
      )
      FROM fixed_price_services fps
      JOIN service_categories sc ON fps.category_id = sc.id
      WHERE fps.active = true
        AND sc.active = true
        AND (category_filter IS NULL OR sc.name = category_filter)
      ORDER BY sc.display_order, fps.name
    ),
    'subscription_plans', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', id,
          'name', name,
          'description', description,
          'price', price,
          'interval', interval,
          'features', features,
          'stripe_price_id', stripe_price_id
        )
      )
      FROM subscription_plans
      WHERE active = true
      ORDER BY price
    )
  ) INTO result;

  RETURN result;
END;
$$;

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fixed_price_services_updated_at BEFORE UPDATE ON fixed_price_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_subscriptions_updated_at BEFORE UPDATE ON client_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_requests_updated_at BEFORE UPDATE ON job_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_orders_updated_at BEFORE UPDATE ON service_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
