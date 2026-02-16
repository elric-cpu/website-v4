import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import {
  createAdminClient,
  getUserFromRequest,
  requireOrgMember,
  requireStaffRole,
} from "../_shared/utils.ts";

serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const supabase = createAdminClient();
    const { user, error } = await getUserFromRequest(supabase, req);
    if (error || !user) return jsonResponse({ error: "Unauthorized" }, 401);

    const roleCheck = requireStaffRole(user);
    if (!roleCheck.ok) return jsonResponse({ error: roleCheck.error }, 403);

    const payload = await req.json();
    const { document_id: documentId, estimate_id: estimateId } = payload || {};

    if (!documentId && !estimateId) {
      return jsonResponse({ error: "Missing document_id or estimate_id" }, 400);
    }

    let organizationId = null;
    if (documentId) {
      const { data: document } = await supabase
        .from("project_documents")
        .select("organization_id, project_id")
        .eq("id", documentId)
        .maybeSingle();
      if (!document) return jsonResponse({ error: "Document not found" }, 404);
      organizationId = document.organization_id;
      const memberCheck = await requireOrgMember(
        supabase,
        organizationId,
        user.id,
      );
      if (!memberCheck.ok)
        return jsonResponse({ error: memberCheck.error }, 403);

      const { data: run } = await supabase
        .from("extraction_runs")
        .select("id, status, completed_at")
        .eq("document_id", documentId)
        .order("started_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const { data: estimate } = await supabase
        .from("estimates")
        .select("id, current_version")
        .eq("project_id", document.project_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return jsonResponse({
        extraction_run: run,
        estimate_id: estimate?.id || null,
        estimate_version_id: estimate?.current_version || null,
      });
    }

    if (estimateId) {
      const { data: estimate } = await supabase
        .from("estimates")
        .select("organization_id, current_version")
        .eq("id", estimateId)
        .maybeSingle();

      if (!estimate) return jsonResponse({ error: "Estimate not found" }, 404);
      organizationId = estimate.organization_id;
      const memberCheck = await requireOrgMember(
        supabase,
        organizationId,
        user.id,
      );
      if (!memberCheck.ok)
        return jsonResponse({ error: memberCheck.error }, 403);

      return jsonResponse({
        estimate_id: estimateId,
        estimate_version_id: estimate.current_version,
      });
    }

    return jsonResponse({ error: "Invalid request" }, 400);
  } catch (err) {
    return jsonResponse({ error: err.message || "Server error" }, 500);
  }
});
