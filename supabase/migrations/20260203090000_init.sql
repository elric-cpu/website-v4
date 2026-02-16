create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.client_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  project_id text not null,
  project_name text not null,
  job_type text,
  current_state text,
  created_at timestamptz not null default now()
);

create table if not exists public.client_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  file_name text,
  url text,
  category text,
  upload_source text,
  created_at timestamptz not null default now()
);

create table if not exists public.client_invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  amount numeric(12,2),
  amount_cents integer,
  currency text default 'usd',
  status text,
  due_date date,
  is_subscription boolean default false,
  stripe_price_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.subcontractors (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  company_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  license_number text,
  insurance_expiry date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subcontractor_work_orders (
  id uuid primary key default gen_random_uuid(),
  subcontractor_id uuid not null references public.subcontractors (id) on delete cascade,
  title text not null,
  scheduled_date date,
  status text,
  created_at timestamptz not null default now()
);

create table if not exists public.subcontractor_performance (
  id uuid primary key default gen_random_uuid(),
  subcontractor_id uuid not null references public.subcontractors (id) on delete cascade,
  rating numeric(3,2),
  completed_jobs integer default 0,
  on_time_percent numeric(5,2),
  updated_at timestamptz not null default now()
);

create unique index if not exists subcontractor_performance_unique
  on public.subcontractor_performance (subcontractor_id);
create index if not exists client_projects_user_id_idx on public.client_projects (user_id);
create index if not exists client_documents_user_id_idx on public.client_documents (user_id);
create index if not exists client_invoices_user_id_idx on public.client_invoices (user_id);
create index if not exists subcontractor_orders_sub_id_idx on public.subcontractor_work_orders (subcontractor_id);

drop trigger if exists set_client_profiles_updated_at on public.client_profiles;
create trigger set_client_profiles_updated_at
before update on public.client_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_subcontractors_updated_at on public.subcontractors;
create trigger set_subcontractors_updated_at
before update on public.subcontractors
for each row execute function public.set_updated_at();

alter table public.client_profiles enable row level security;
alter table public.client_projects enable row level security;
alter table public.client_documents enable row level security;
alter table public.client_invoices enable row level security;
alter table public.subcontractors enable row level security;
alter table public.subcontractor_work_orders enable row level security;
alter table public.subcontractor_performance enable row level security;

create policy "Clients manage own profile"
  on public.client_profiles
  for all
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Clients view own projects"
  on public.client_projects
  for select
  using (user_id = auth.uid());

create policy "Clients view own documents"
  on public.client_documents
  for select
  using (user_id = auth.uid());

create policy "Clients manage own documents"
  on public.client_documents
  for insert
  with check (user_id = auth.uid());

create policy "Clients update own documents"
  on public.client_documents
  for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Clients view own invoices"
  on public.client_invoices
  for select
  using (user_id = auth.uid());

create policy "Subcontractors manage own profile"
  on public.subcontractors
  for all
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Subcontractors view own work orders"
  on public.subcontractor_work_orders
  for select
  using (subcontractor_id = auth.uid());

create policy "Subcontractors view own performance"
  on public.subcontractor_performance
  for select
  using (subcontractor_id = auth.uid());

create or replace function public.get_client_portal_bundle()
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'project', (
      select row_to_json(p)
      from public.client_projects p
      where p.user_id = auth.uid()
      order by p.created_at desc
      limit 1
    ),
    'documents', (
      select coalesce(jsonb_agg(d order by d.created_at desc), '[]'::jsonb)
      from public.client_documents d
      where d.user_id = auth.uid()
    ),
    'invoices', (
      select coalesce(jsonb_agg(i order by i.due_date asc), '[]'::jsonb)
      from public.client_invoices i
      where i.user_id = auth.uid()
    )
  );
$$;

create or replace function public.get_subcontractor_portal_bundle()
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'work_orders', (
      select coalesce(jsonb_agg(w order by w.scheduled_date asc), '[]'::jsonb)
      from public.subcontractor_work_orders w
      where w.subcontractor_id = auth.uid()
    ),
    'performance', (
      select row_to_json(p)
      from public.subcontractor_performance p
      where p.subcontractor_id = auth.uid()
      limit 1
    ),
    'profile', (
      select row_to_json(s)
      from public.subcontractors s
      where s.id = auth.uid()
      limit 1
    )
  );
$$;
