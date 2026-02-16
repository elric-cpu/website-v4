import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import {
  createAdminClient,
  getUserFromRequest,
  requireOrgMember,
  requireStaffRole,
} from "../_shared/utils.ts";

const orchestratorUrl = Deno.env.get("ORCHESTRATOR_URL");
const orchestratorSecret = Deno.env.get("ORCHESTRATOR_SHARED_SECRET");

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
    const { document_id: documentId } = payload || {};
    if (!documentId) {
      return jsonResponse({ error: "Missing document_id" }, 400);
    }

    const { data: document } = await supabase
      .from("project_documents")
      .select("id, organization_id, project_id")
      .eq("id", documentId)
      .maybeSingle();

    if (!document) {
      return jsonResponse({ error: "Document not found" }, 404);
    }

    const memberCheck = await requireOrgMember(
      supabase,
      document.organization_id,
      user.id,
    );
    if (!memberCheck.ok) return jsonResponse({ error: memberCheck.error }, 403);

    await supabase
      .from("project_documents")
      .update({ status: "uploaded" })
      .eq("id", documentId);

    const { data: run, error: runError } = await supabase
      .from("extraction_runs")
      .insert({
        document_id: documentId,
        organization_id: document.organization_id,
        status: "queued",
        started_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (runError) {
      return jsonResponse({ error: runError.message }, 400);
    }

    if (orchestratorUrl) {
      const response = await fetch(
        `${orchestratorUrl.replace(/\/$/, "")}/extract`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(orchestratorSecret
              ? { "x-orchestrator-key": orchestratorSecret }
              : {}),
          },
          body: JSON.stringify({
            document_id: documentId,
            organization_id: document.organization_id,
            project_id: document.project_id,
            requested_by: user.id,
          }),
        },
      );

      if (!response.ok) {
        await supabase
          .from("extraction_runs")
          .update({ status: "failed" })
          .eq("id", run.id);
        return jsonResponse({ error: "Orchestrator failed" }, 500);
      }
    }

    return jsonResponse({ ok: true, run_id: run.id, document_id: documentId });
  } catch (err) {
    return jsonResponse({ error: err.message || "Server error" }, 500);
  }
});
