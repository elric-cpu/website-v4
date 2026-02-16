create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  org_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

create table if not exists public.estimate_projects (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  property_address text,
  location_zip text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_documents (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  project_id uuid references public.estimate_projects (id) on delete set null,
  title text,
  storage_bucket text not null,
  storage_path text not null,
  file_url text,
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_document_parses (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.estimate_documents (id) on delete cascade,
  parsed_text text,
  page_map jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_document_pages (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.estimate_documents (id) on delete cascade,
  page_number integer not null,
  text text,
  start_offset integer,
  end_offset integer
);

create table if not exists public.estimate_extraction_runs (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.estimate_documents (id) on delete cascade,
  org_id uuid not null references public.organizations (id) on delete cascade,
  status text not null default 'pending',
  model text,
  notes text,
  created_by uuid references auth.users (id) on delete set null,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.estimate_task_candidates (
  id uuid primary key default gen_random_uuid(),
  extraction_run_id uuid not null references public.estimate_extraction_runs (id) on delete cascade,
  trade text,
  action text,
  object text,
  confidence numeric(4,3),
  source_ref jsonb,
  missing_fields jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_versions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.estimate_projects (id) on delete set null,
  org_id uuid not null references public.organizations (id) on delete cascade,
  status text not null default 'draft',
  source_document_id uuid references public.estimate_documents (id) on delete set null,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_tasks (
  id uuid primary key default gen_random_uuid(),
  estimate_version_id uuid not null references public.estimate_versions (id) on delete cascade,
  task_key text,
  trade text,
  location_label text,
  scope_narrative text,
  source_ref jsonb
);

create table if not exists public.estimate_line_items (
  id uuid primary key default gen_random_uuid(),
  estimate_task_id uuid not null references public.estimate_tasks (id) on delete cascade,
  item_key text,
  description text,
  quantity numeric(12,2),
  unit text,
  material_unit_price numeric(12,2),
  labor_hours numeric(12,2),
  labor_rate numeric(12,2),
  equipment_cost numeric(12,2),
  disposal_cost numeric(12,2),
  markup_pct numeric(5,2),
  total_cost numeric(12,2),
  source_ref jsonb
);

create table if not exists public.estimate_questions (
  id uuid primary key default gen_random_uuid(),
  estimate_version_id uuid not null references public.estimate_versions (id) on delete cascade,
  task_id uuid references public.estimate_tasks (id) on delete cascade,
  scope text not null,
  question_key text not null,
  prompt text not null,
  depends_on jsonb,
  answer_type text not null,
  options jsonb,
  required boolean not null default true,
  derived_field text,
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.estimate_questions (id) on delete cascade,
  value jsonb,
  answered_by uuid references auth.users (id) on delete set null,
  answered_at timestamptz not null default now(),
  unique (question_id)
);

create table if not exists public.estimate_pricing_cache (
  id uuid primary key default gen_random_uuid(),
  item_key text not null,
  location_zip text,
  unit text,
  unit_price numeric(12,2),
  source_meta jsonb,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (item_key, location_zip, unit)
);

create table if not exists public.estimate_pricing_sources (
  id uuid primary key default gen_random_uuid(),
  item_key text not null,
  source_name text not null,
  source_url text not null,
  parser_type text not null default 'jsonld',
  selector jsonb,
  last_checked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_production_rates (
  id uuid primary key default gen_random_uuid(),
  task_key text not null,
  unit text not null,
  base_rate numeric(12,3) not null,
  trade text,
  notes text
);

create table if not exists public.estimate_labor_rate_cards (
  id uuid primary key default gen_random_uuid(),
  trade text not null,
  base_rate numeric(12,2) not null,
  burden_pct numeric(5,2) not null default 0,
  loaded_rate numeric(12,2) generated always as (base_rate * (1 + burden_pct / 100)) stored
);

create table if not exists public.estimate_audit_log (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  actor_id uuid references auth.users (id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists organization_members_user_idx on public.organization_members (user_id);
create index if not exists estimate_projects_org_idx on public.estimate_projects (org_id);
create index if not exists estimate_documents_org_idx on public.estimate_documents (org_id);
create index if not exists estimate_documents_project_idx on public.estimate_documents (project_id);
create index if not exists estimate_document_pages_doc_idx on public.estimate_document_pages (document_id);
create index if not exists estimate_extraction_runs_doc_idx on public.estimate_extraction_runs (document_id);
create index if not exists estimate_extraction_runs_org_idx on public.estimate_extraction_runs (org_id);
create index if not exists estimate_task_candidates_run_idx on public.estimate_task_candidates (extraction_run_id);
create index if not exists estimate_versions_project_idx on public.estimate_versions (project_id);
create index if not exists estimate_versions_org_idx on public.estimate_versions (org_id);
create index if not exists estimate_tasks_version_idx on public.estimate_tasks (estimate_version_id);
create index if not exists estimate_line_items_task_idx on public.estimate_line_items (estimate_task_id);
create index if not exists estimate_questions_version_idx on public.estimate_questions (estimate_version_id);
create index if not exists estimate_questions_task_idx on public.estimate_questions (task_id);
create index if not exists estimate_answers_question_idx on public.estimate_answers (question_id);
create index if not exists estimate_pricing_cache_key_idx on public.estimate_pricing_cache (item_key);
create index if not exists estimate_pricing_sources_key_idx on public.estimate_pricing_sources (item_key);
create index if not exists estimate_audit_log_org_idx on public.estimate_audit_log (org_id);

create or replace function public.current_user_orgs()
returns setof uuid
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select org_id from public.organization_members where user_id = auth.uid()
$$;
