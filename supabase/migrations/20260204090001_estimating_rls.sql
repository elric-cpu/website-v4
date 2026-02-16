alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.estimate_projects enable row level security;
alter table public.estimate_documents enable row level security;
alter table public.estimate_document_parses enable row level security;
alter table public.estimate_document_pages enable row level security;
alter table public.estimate_extraction_runs enable row level security;
alter table public.estimate_task_candidates enable row level security;
alter table public.estimate_versions enable row level security;
alter table public.estimate_tasks enable row level security;
alter table public.estimate_line_items enable row level security;
alter table public.estimate_questions enable row level security;
alter table public.estimate_answers enable row level security;
alter table public.estimate_pricing_cache enable row level security;
alter table public.estimate_pricing_sources enable row level security;
alter table public.estimate_production_rates enable row level security;
alter table public.estimate_labor_rate_cards enable row level security;
alter table public.estimate_audit_log enable row level security;

create policy "Org members view orgs"
  on public.organizations
  for select
  using (id in (select public.current_user_orgs()));

create policy "Users create orgs"
  on public.organizations
  for insert
  with check (created_by = auth.uid());

create policy "Org members update orgs"
  on public.organizations
  for update
  using (id in (select public.current_user_orgs()))
  with check (id in (select public.current_user_orgs()));

create policy "Org members view memberships"
  on public.organization_members
  for select
  using (org_id in (select public.current_user_orgs()));

create policy "Users add self to org"
  on public.organization_members
  for insert
  with check (
    (user_id = auth.uid() and org_id in (select id from public.organizations where created_by = auth.uid()))
    or (org_id in (select public.current_user_orgs()))
  );

create policy "Org members view projects"
  on public.estimate_projects
  for select
  using (org_id in (select public.current_user_orgs()));

create policy "Org members manage projects"
  on public.estimate_projects
  for insert
  with check (org_id in (select public.current_user_orgs()) and created_by = auth.uid());

create policy "Org members update projects"
  on public.estimate_projects
  for update
  using (org_id in (select public.current_user_orgs()))
  with check (org_id in (select public.current_user_orgs()));

create policy "Org members view documents"
  on public.estimate_documents
  for select
  using (org_id in (select public.current_user_orgs()));

create policy "Org members create documents"
  on public.estimate_documents
  for insert
  with check (org_id in (select public.current_user_orgs()) and uploaded_by = auth.uid());

create policy "Org members update documents"
  on public.estimate_documents
  for update
  using (org_id in (select public.current_user_orgs()))
  with check (org_id in (select public.current_user_orgs()));

create policy "Org members view document parses"
  on public.estimate_document_parses
  for select
  using (
    document_id in (
      select id from public.estimate_documents where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members create document parses"
  on public.estimate_document_parses
  for insert
  with check (
    document_id in (
      select id from public.estimate_documents where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members view document pages"
  on public.estimate_document_pages
  for select
  using (
    document_id in (
      select id from public.estimate_documents where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members create document pages"
  on public.estimate_document_pages
  for insert
  with check (
    document_id in (
      select id from public.estimate_documents where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members view extraction runs"
  on public.estimate_extraction_runs
  for select
  using (org_id in (select public.current_user_orgs()));

create policy "Org members create extraction runs"
  on public.estimate_extraction_runs
  for insert
  with check (org_id in (select public.current_user_orgs()) and created_by = auth.uid());

create policy "Org members update extraction runs"
  on public.estimate_extraction_runs
  for update
  using (org_id in (select public.current_user_orgs()))
  with check (org_id in (select public.current_user_orgs()));

create policy "Org members view task candidates"
  on public.estimate_task_candidates
  for select
  using (
    extraction_run_id in (
      select id from public.estimate_extraction_runs where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members create task candidates"
  on public.estimate_task_candidates
  for insert
  with check (
    extraction_run_id in (
      select id from public.estimate_extraction_runs where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members view estimate versions"
  on public.estimate_versions
  for select
  using (org_id in (select public.current_user_orgs()));

create policy "Org members create estimate versions"
  on public.estimate_versions
  for insert
  with check (org_id in (select public.current_user_orgs()) and created_by = auth.uid());

create policy "Org members update estimate versions"
  on public.estimate_versions
  for update
  using (org_id in (select public.current_user_orgs()))
  with check (org_id in (select public.current_user_orgs()));

create policy "Org members view tasks"
  on public.estimate_tasks
  for select
  using (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members create tasks"
  on public.estimate_tasks
  for insert
  with check (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members update tasks"
  on public.estimate_tasks
  for update
  using (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  )
  with check (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members view line items"
  on public.estimate_line_items
  for select
  using (
    estimate_task_id in (
      select id from public.estimate_tasks
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  );

create policy "Org members create line items"
  on public.estimate_line_items
  for insert
  with check (
    estimate_task_id in (
      select id from public.estimate_tasks
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  );

create policy "Org members update line items"
  on public.estimate_line_items
  for update
  using (
    estimate_task_id in (
      select id from public.estimate_tasks
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  )
  with check (
    estimate_task_id in (
      select id from public.estimate_tasks
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  );

create policy "Org members view questions"
  on public.estimate_questions
  for select
  using (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members create questions"
  on public.estimate_questions
  for insert
  with check (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members update questions"
  on public.estimate_questions
  for update
  using (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  )
  with check (
    estimate_version_id in (
      select id from public.estimate_versions where org_id in (select public.current_user_orgs())
    )
  );

create policy "Org members view answers"
  on public.estimate_answers
  for select
  using (
    question_id in (
      select id from public.estimate_questions
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  );

create policy "Org members create answers"
  on public.estimate_answers
  for insert
  with check (
    question_id in (
      select id from public.estimate_questions
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  );

create policy "Org members update answers"
  on public.estimate_answers
  for update
  using (
    question_id in (
      select id from public.estimate_questions
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  )
  with check (
    question_id in (
      select id from public.estimate_questions
      where estimate_version_id in (
        select id from public.estimate_versions where org_id in (select public.current_user_orgs())
      )
    )
  );

create policy "Org members view pricing cache"
  on public.estimate_pricing_cache
  for select
  using (true);

create policy "Org members manage pricing cache"
  on public.estimate_pricing_cache
  for insert
  with check (true);

create policy "Org members update pricing cache"
  on public.estimate_pricing_cache
  for update
  using (true)
  with check (true);

create policy "Org members view pricing sources"
  on public.estimate_pricing_sources
  for select
  using (true);

create policy "Org members manage pricing sources"
  on public.estimate_pricing_sources
  for insert
  with check (true);

create policy "Org members update pricing sources"
  on public.estimate_pricing_sources
  for update
  using (true)
  with check (true);

create policy "Org members view production rates"
  on public.estimate_production_rates
  for select
  using (true);

create policy "Org members manage production rates"
  on public.estimate_production_rates
  for insert
  with check (true);

create policy "Org members update production rates"
  on public.estimate_production_rates
  for update
  using (true)
  with check (true);

create policy "Org members view labor rate cards"
  on public.estimate_labor_rate_cards
  for select
  using (true);

create policy "Org members manage labor rate cards"
  on public.estimate_labor_rate_cards
  for insert
  with check (true);

create policy "Org members update labor rate cards"
  on public.estimate_labor_rate_cards
  for update
  using (true)
  with check (true);

create policy "Org members view audit log"
  on public.estimate_audit_log
  for select
  using (org_id in (select public.current_user_orgs()));

create policy "Org members insert audit log"
  on public.estimate_audit_log
  for insert
  with check (org_id in (select public.current_user_orgs()));
