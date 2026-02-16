create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'staff',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  status text default 'draft',
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.project_documents (
  id uuid primary key,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  project_id uuid not null references public.projects (id) on delete cascade,
  uploaded_by uuid references auth.users (id),
  file_name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes integer,
  status text default 'pending_upload',
  created_at timestamptz not null default now()
);

create table if not exists public.document_parses (
  document_id uuid primary key references public.project_documents (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  parsed_text text,
  page_map jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.document_pages (
  id uuid primary key,
  document_id uuid not null references public.project_documents (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  page_number integer not null,
  text text,
  start_offset integer,
  end_offset integer
);

create table if not exists public.document_excerpts (
  id uuid primary key,
  document_id uuid not null references public.project_documents (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  page_number integer not null,
  start_offset integer,
  end_offset integer,
  excerpt_text text
);

create table if not exists public.extraction_runs (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.project_documents (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  status text not null default 'queued',
  model text,
  prompt_version text,
  task_candidates jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.estimates (
  id uuid primary key,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  project_id uuid not null references public.projects (id) on delete cascade,
  status text default 'draft',
  current_version uuid,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_versions (
  id uuid primary key,
  estimate_id uuid not null references public.estimates (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  version_number integer not null,
  totals jsonb,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.estimate_tasks (
  id uuid primary key,
  estimate_version_id uuid not null references public.estimate_versions (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  trade text,
  action text,
  object text,
  room text,
  scope_narrative text,
  confidence numeric(4,3),
  source_excerpt_id uuid references public.document_excerpts (id),
  missing_fields jsonb
);

create table if not exists public.estimate_line_items (
  id uuid primary key,
  estimate_version_id uuid not null references public.estimate_versions (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  task_id uuid references public.estimate_tasks (id) on delete cascade,
  item_key text,
  description text,
  unit text,
  quantity numeric(12,2),
  unit_price numeric(12,2),
  material_cost numeric(12,2),
  labor_hours numeric(12,2),
  labor_cost numeric(12,2),
  labor_breakdown jsonb,
  allowances jsonb,
  markup_percent numeric(6,4),
  total numeric(12,2),
  source_excerpt_id uuid references public.document_excerpts (id)
);

create table if not exists public.question_definitions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations (id) on delete cascade,
  scope text not null,
  field_key text not null,
  prompt text not null,
  input_type text not null,
  options jsonb,
  depends_on jsonb,
  unique (organization_id, scope, field_key)
);

create table if not exists public.question_answers (
  id uuid primary key default gen_random_uuid(),
  estimate_version_id uuid not null references public.estimate_versions (id) on delete cascade,
  question_id uuid not null references public.question_definitions (id) on delete cascade,
  answer jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_seed_items (
  item_key text primary key,
  description text,
  unit text,
  trade text,
  base_price numeric(12,2),
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_cache (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  item_key text not null,
  location_zip text,
  unit text,
  unit_price numeric(12,2) not null,
  source_meta jsonb,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.production_rates (
  task_key text primary key,
  organization_id uuid references public.organizations (id) on delete cascade,
  unit text,
  units_per_hour numeric(10,2),
  created_at timestamptz not null default now()
);

create table if not exists public.labor_rate_cards (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations (id) on delete cascade,
  trade text not null,
  base_rate numeric(10,2),
  burden_rate numeric(6,4),
  overhead_rate numeric(6,4),
  profit_rate numeric(6,4),
  loaded_rate numeric(10,2),
  created_at timestamptz not null default now()
);

create table if not exists public.labor_modifiers (
  modifier_key text primary key,
  organization_id uuid references public.organizations (id) on delete cascade,
  label text,
  multiplier numeric(6,4) not null default 1.0
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  actor_id uuid references auth.users (id),
  event_type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists workspace_members_org_idx on public.workspace_members (organization_id);
create index if not exists projects_org_idx on public.projects (organization_id);
create index if not exists project_documents_project_idx on public.project_documents (project_id);
create index if not exists document_pages_document_idx on public.document_pages (document_id);
create index if not exists document_excerpts_document_idx on public.document_excerpts (document_id);
create index if not exists extraction_runs_document_idx on public.extraction_runs (document_id);
create index if not exists estimates_project_idx on public.estimates (project_id);
create index if not exists estimate_versions_project_idx on public.estimate_versions (project_id);
create index if not exists estimate_versions_org_idx on public.estimate_versions (org_id);
create unique index if not exists question_definitions_global_unique
  on public.question_definitions (scope, field_key)
  where organization_id is null;
create index if not exists estimate_tasks_version_idx on public.estimate_tasks (estimate_version_id);
create index if not exists estimate_line_items_task_idx on public.estimate_line_items (estimate_task_id);
create index if not exists pricing_cache_lookup_idx on public.pricing_cache (organization_id, item_key, location_zip, unit);

create or replace function public.is_org_member(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select exists (
    select 1 from public.workspace_members wm
    where wm.organization_id = org_id
      and wm.user_id = auth.uid()
  );
$$;

alter table public.organizations enable row level security;
alter table public.workspace_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_documents enable row level security;
alter table public.document_parses enable row level security;
alter table public.document_pages enable row level security;
alter table public.document_excerpts enable row level security;
alter table public.extraction_runs enable row level security;
alter table public.estimates enable row level security;
alter table public.estimate_versions enable row level security;
alter table public.estimate_tasks enable row level security;
alter table public.estimate_line_items enable row level security;
alter table public.question_definitions enable row level security;
alter table public.question_answers enable row level security;
alter table public.pricing_seed_items enable row level security;
alter table public.pricing_cache enable row level security;
alter table public.production_rates enable row level security;
alter table public.labor_rate_cards enable row level security;
alter table public.labor_modifiers enable row level security;
alter table public.audit_log enable row level security;

create policy "Org members read orgs" on public.organizations
  for select using (public.is_org_member(id));

create policy "Org members manage membership" on public.workspace_members
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage projects" on public.projects
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage documents" on public.project_documents
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage parses" on public.document_parses
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage pages" on public.document_pages
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage excerpts" on public.document_excerpts
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage extraction" on public.extraction_runs
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage estimates" on public.estimates
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage estimate versions" on public.estimate_versions
  for all using (public.is_org_member(org_id))
  with check (public.is_org_member(org_id));

create policy "Org members manage estimate tasks" on public.estimate_tasks
  for all using (
    exists (
      select 1 from public.estimate_versions ev
      where ev.id = estimate_version_id
        and public.is_org_member(ev.org_id)
    )
  )
  with check (
    exists (
      select 1 from public.estimate_versions ev
      where ev.id = estimate_version_id
        and public.is_org_member(ev.org_id)
    )
  );

create policy "Org members manage estimate line items" on public.estimate_line_items
  for all using (
    exists (
      select 1
      from public.estimate_tasks t
      join public.estimate_versions ev on ev.id = t.estimate_version_id
      where t.id = estimate_task_id
        and public.is_org_member(ev.org_id)
    )
  )
  with check (
    exists (
      select 1
      from public.estimate_tasks t
      join public.estimate_versions ev on ev.id = t.estimate_version_id
      where t.id = estimate_task_id
        and public.is_org_member(ev.org_id)
    )
  );

create policy "Org members manage questions" on public.question_definitions
  for all using (organization_id is null or public.is_org_member(organization_id))
  with check (organization_id is null or public.is_org_member(organization_id));

create policy "Org members manage answers" on public.question_answers
  for all using (
    exists (
      select 1 from public.estimate_versions ev
      where ev.id = estimate_version_id
        and public.is_org_member(ev.org_id)
    )
  )
  with check (
    exists (
      select 1 from public.estimate_versions ev
      where ev.id = estimate_version_id
        and public.is_org_member(ev.org_id)
    )
  );

create policy "Pricing seed read" on public.pricing_seed_items
  for select using (auth.uid() is not null);

create policy "Org members manage pricing cache" on public.pricing_cache
  for all using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

create policy "Org members manage production rates" on public.production_rates
  for all using (organization_id is null or public.is_org_member(organization_id))
  with check (organization_id is null or public.is_org_member(organization_id));

create policy "Org members manage labor rates" on public.labor_rate_cards
  for all using (organization_id is null or public.is_org_member(organization_id))
  with check (organization_id is null or public.is_org_member(organization_id));

create policy "Org members manage labor modifiers" on public.labor_modifiers
  for all using (organization_id is null or public.is_org_member(organization_id))
  with check (organization_id is null or public.is_org_member(organization_id));

create policy "Org members read audit" on public.audit_log
  for select using (public.is_org_member(organization_id));

insert into storage.buckets (id, name, public)
values ('project-docs', 'project-docs', false)
on conflict do nothing;
