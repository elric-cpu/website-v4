create or replace function public.log_estimate_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := coalesce(auth.uid(), new.created_by);
begin
  insert into public.estimate_audit_log (
    org_id,
    actor_id,
    entity_type,
    entity_id,
    action,
    payload
  )
  values (
    new.org_id,
    actor,
    tg_table_name,
    new.id,
    'created',
    to_jsonb(new)
  );
  return new;
end;
$$;

drop trigger if exists audit_estimate_extraction_runs on public.estimate_extraction_runs;
create trigger audit_estimate_extraction_runs
after insert on public.estimate_extraction_runs
for each row execute function public.log_estimate_audit();

drop trigger if exists audit_estimate_versions on public.estimate_versions;
create trigger audit_estimate_versions
after insert on public.estimate_versions
for each row execute function public.log_estimate_audit();
