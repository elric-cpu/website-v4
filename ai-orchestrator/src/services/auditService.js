import { supabaseAdmin } from "../db/supabase.js";

export const writeAudit = async ({
  organizationId,
  projectId,
  actorId,
  eventType,
  payload,
}) => {
  await supabaseAdmin.from("audit_log").insert({
    organization_id: organizationId,
    project_id: projectId,
    actor_id: actorId,
    event_type: eventType,
    payload,
  });
};
