-- Portal schema + RLS for client/subcontractor portals
-- Run in Supabase SQL editor

-- Client tables
create table if not exists public.client_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id text,
  project_name text,
  job_type text,
  current_state text,
  created_at timestamptz not null default now()
);

create table if not exists public.client_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  file_name text,
  category text,
  url text,
  created_at timestamptz not null default now()
);

create table if not exists public.client_invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  amount numeric,
  amount_cents integer,
  currency text default 'usd',
  due_date date,
  status text default 'Unpaid',
  stripe_price_id text,
  is_subscription boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists public.client_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subcontractor tables
create table if not exists public.subcontractors (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  company_name text,
  email text,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  license_number text,
  insurance_expiry date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subcontractor_work_orders (
  id uuid primary key default gen_random_uuid(),
  subcontractor_id uuid not null references auth.users(id) on delete cascade,
  title text,
  description text,
  scheduled_date date,
  status text default 'Assigned',
  created_at timestamptz not null default now()
);

create table if not exists public.subcontractor_performance (
  id uuid primary key default gen_random_uuid(),
  subcontractor_id uuid not null references auth.users(id) on delete cascade,
  rating numeric,
  notes text,
  updated_at timestamptz not null default now()
);

-- RLS
alter table public.client_projects enable row level security;
alter table public.client_documents enable row level security;
alter table public.client_invoices enable row level security;
alter table public.client_profiles enable row level security;
alter table public.subcontractors enable row level security;
alter table public.subcontractor_work_orders enable row level security;
alter table public.subcontractor_performance enable row level security;

-- Client access policies
create policy if not exists "client_projects_select_own"
  on public.client_projects for select
  using (auth.uid() = user_id);

create policy if not exists "client_documents_select_own"
  on public.client_documents for select
  using (auth.uid() = user_id);

create policy if not exists "client_invoices_select_own"
  on public.client_invoices for select
  using (auth.uid() = user_id);

create policy if not exists "client_profiles_select_own"
  on public.client_profiles for select
  using (auth.uid() = id);

-- Optional self-insert/update (for testing)
create policy if not exists "client_projects_insert_own"
  on public.client_projects for insert
  with check (auth.uid() = user_id);

create policy if not exists "client_documents_insert_own"
  on public.client_documents for insert
  with check (auth.uid() = user_id);

create policy if not exists "client_invoices_insert_own"
  on public.client_invoices for insert
  with check (auth.uid() = user_id);

create policy if not exists "client_profiles_insert_own"
  on public.client_profiles for insert
  with check (auth.uid() = id);

create policy if not exists "client_profiles_update_own"
  on public.client_profiles for update
  using (auth.uid() = id);

-- Subcontractor access policies
create policy if not exists "subcontractors_select_own"
  on public.subcontractors for select
  using (auth.uid() = id);

create policy if not exists "subcontractors_insert_own"
  on public.subcontractors for insert
  with check (auth.uid() = id);

create policy if not exists "subcontractors_update_own"
  on public.subcontractors for update
  using (auth.uid() = id);

create policy if not exists "sub_work_orders_select_own"
  on public.subcontractor_work_orders for select
  using (auth.uid() = subcontractor_id);

create policy if not exists "sub_performance_select_own"
  on public.subcontractor_performance for select
  using (auth.uid() = subcontractor_id);
