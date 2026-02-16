-- Demo seed data for local development (idempotent).
-- Uses auth.users to satisfy FK constraints.

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
)
values (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'client@example.com',
  crypt('change-me', gen_salt('bf')),
  now(),
  '{"role":"client","full_name":"Client Example"}'
)
on conflict do nothing;

-- Estimating seed data (org, project, rates, pricing sources).
insert into public.organizations (
  id, name, created_by
)
values (
  '22222222-2222-2222-2222-222222222222',
  'Benson Demo Org',
  '11111111-1111-1111-1111-111111111111'
)
on conflict do nothing;

insert into public.organization_members (
  org_id, user_id, role
)
values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'owner'
)
on conflict do nothing;

insert into public.estimate_projects (
  id, org_id, name, property_address, location_zip, created_by
)
values (
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'Demo Inspection Report',
  '123 Main St, Salem, OR',
  '97301',
  '11111111-1111-1111-1111-111111111111'
)
on conflict do nothing;

insert into public.estimate_labor_rate_cards (
  trade, base_rate, burden_pct
)
values
  ('carpentry', 48, 35),
  ('water_mitigation', 52, 40),
  ('mold_remediation', 60, 45),
  ('fire_restoration', 58, 42),
  ('general', 45, 30)
on conflict do nothing;

insert into public.estimate_production_rates (
  task_key, unit, base_rate, trade, notes
)
values
  ('drywall_patch', 'sqft', 20, 'carpentry', 'Per hour coverage'),
  ('flooring_remove', 'sqft', 35, 'carpentry', 'Removal rate'),
  ('water_extract', 'sqft', 60, 'water_mitigation', 'Extraction rate'),
  ('mold_treat', 'sqft', 25, 'mold_remediation', 'Surface treatment'),
  ('smoke_clean', 'sqft', 30, 'fire_restoration', 'Cleaning rate')
on conflict do nothing;

insert into public.estimate_pricing_sources (
  item_key, source_name, source_url, parser_type
)
values
  ('drywall_patch', 'homedepot', 'https://www.homedepot.com/', 'jsonld'),
  ('flooring_remove', 'lowes', 'https://www.lowes.com/', 'jsonld'),
  ('water_extract', 'homewyse', 'https://www.homewyse.com/', 'jsonld'),
  ('mold_treat', 'construction_db', 'https://example.com/construction-db', 'jsonld'),
  ('smoke_clean', 'homewyse', 'https://www.homewyse.com/', 'jsonld')
on conflict do nothing;

insert into public.client_profiles (
  id, full_name, phone, address, city, state, zip
)
values (
  '11111111-1111-1111-1111-111111111111',
  'Client Example',
  '+1 (555) 000-0000',
  '123 Main St',
  'Salem',
  'OR',
  '97301'
)
on conflict do nothing;

-- Staff users for estimating portal (password: change-me)
insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
)
values (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'staff@example.com',
  crypt('change-me', gen_salt('bf')),
  now(),
  '{"role":"staff","full_name":"Staff Estimator"}'
),
(
  '33333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'staff2@example.com',
  crypt('change-me', gen_salt('bf')),
  now(),
  '{"role":"staff","full_name":"Secondary Staff"}'
)
on conflict do nothing;

insert into public.organizations (id, name)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Benson Enterprises'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Demo Partner')
on conflict do nothing;

insert into public.workspace_members (id, organization_id, user_id, role)
values
  ('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'staff'),
  ('55555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'staff')
on conflict do nothing;

insert into public.projects (id, organization_id, name, address, city, state, zip, status, created_by)
values
  ('66666666-6666-6666-6666-666666666666', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Demo Inspection Report', '742 Evergreen Ter', 'Salem', 'OR', '97301', 'active', '22222222-2222-2222-2222-222222222222'),
  ('77777777-7777-7777-7777-777777777777', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Secondary Project', '100 Main St', 'Portland', 'OR', '97205', 'active', '33333333-3333-3333-3333-333333333333')
on conflict do nothing;

insert into public.pricing_seed_items (item_key, description, unit, trade, base_price)
values
  ('drywall_patch_small', 'Patch small drywall hole', 'each', 'drywall', 125),
  ('paint_touchup', 'Interior paint touch-up', 'each', 'painting', 90),
  ('plumbing_leak_fix', 'Repair minor plumbing leak', 'each', 'plumbing', 220),
  ('electrical_outlet_replace', 'Replace electrical outlet', 'each', 'electrical', 140)
on conflict do nothing;

insert into public.production_rates (task_key, organization_id, unit, units_per_hour)
values
  ('drywall:patch:hole', null, 'each', 1.5),
  ('painting:touchup:wall', null, 'each', 2.0),
  ('plumbing:repair:leak', null, 'each', 1.0),
  ('electrical:replace:outlet', null, 'each', 1.2)
on conflict do nothing;

insert into public.labor_rate_cards (organization_id, trade, base_rate, burden_rate, overhead_rate, profit_rate, loaded_rate)
values
  (null, 'drywall', 48, 0.18, 0.12, 0.1, null),
  (null, 'painting', 45, 0.16, 0.12, 0.1, null),
  (null, 'plumbing', 75, 0.22, 0.14, 0.12, null),
  (null, 'electrical', 78, 0.2, 0.15, 0.12, null);

insert into public.labor_modifiers (modifier_key, organization_id, label, multiplier)
values
  ('access', null, 'Access difficulty', 1.0),
  ('finish', null, 'Finish level', 1.0),
  ('occupancy', null, 'Occupied space', 1.0),
  ('height', null, 'Working height', 1.0),
  ('protection', null, 'Protection/containment', 1.0)
on conflict do nothing;

insert into public.question_definitions (organization_id, scope, field_key, prompt, input_type, options, depends_on)
values
  (null, 'task', 'quantity', 'What quantity is required for this task?', 'number', null, null),
  (null, 'task', 'unit', 'Select the unit for this task.', 'select', '[{"label":"each","value":"each"},{"label":"sqft","value":"sqft"},{"label":"lf","value":"lf"}]'::jsonb, null),
  (null, 'task', 'item_key', 'Confirm the pricing item key.', 'text', null, null),
  (null, 'task', 'room', 'Which room or area is impacted?', 'text', null, null),
  (null, 'task', 'access', 'Access difficulty multiplier', 'select', '[{"label":"Standard (1.0)","value":1.0},{"label":"Tight (1.15)","value":1.15},{"label":"Hard (1.3)","value":1.3}]'::jsonb, null),
  (null, 'task', 'finish', 'Finish level multiplier', 'select', '[{"label":"Standard (1.0)","value":1.0},{"label":"Premium (1.2)","value":1.2}]'::jsonb, null),
  (null, 'task', 'occupancy', 'Occupancy multiplier', 'select', '[{"label":"Vacant (1.0)","value":1.0},{"label":"Occupied (1.1)","value":1.1}]'::jsonb, null),
  (null, 'task', 'height', 'Working height multiplier', 'select', '[{"label":"Under 10ft (1.0)","value":1.0},{"label":"10-14ft (1.15)","value":1.15},{"label":"14ft+ (1.3)","value":1.3}]'::jsonb, null),
  (null, 'task', 'protection', 'Protection/containment multiplier', 'select', '[{"label":"None (1.0)","value":1.0},{"label":"Light (1.1)","value":1.1},{"label":"Full (1.25)","value":1.25}]'::jsonb, null)
on conflict do nothing;
