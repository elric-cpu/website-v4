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
    const { estimate_id: estimateId, estimate_version_id: versionId } =
      payload || {};

    if (!estimateId && !versionId) {
      return jsonResponse(
        { error: "Missing estimate_id or estimate_version_id" },
        400,
      );
    }

    let estimate = null;
    if (estimateId) {
      const { data } = await supabase
        .from("estimates")
        .select("id, organization_id, project_id, current_version, status")
        .eq("id", estimateId)
        .maybeSingle();
      estimate = data;
    } else if (versionId) {
      const { data: version } = await supabase
        .from("estimate_versions")
        .select("estimate_id")
        .eq("id", versionId)
        .maybeSingle();
      if (version?.estimate_id) {
        const { data } = await supabase
          .from("estimates")
          .select("id, organization_id, project_id, current_version, status")
          .eq("id", version.estimate_id)
          .maybeSingle();
        estimate = data;
      }
    }

    if (!estimate) {
      return jsonResponse({ error: "Estimate not found" }, 404);
    }

    const memberCheck = await requireOrgMember(
      supabase,
      estimate.organization_id,
      user.id,
    );
    if (!memberCheck.ok) return jsonResponse({ error: memberCheck.error }, 403);

    const activeVersionId = versionId || estimate.current_version;
    if (!activeVersionId) {
      return jsonResponse({
        estimate,
        version: null,
        tasks: [],
        line_items: [],
        excerpts: [],
      });
    }

    const { data: version } = await supabase
      .from("estimate_versions")
      .select("id, version_number, totals, created_at")
      .eq("id", activeVersionId)
      .maybeSingle();

    const { data: tasks } = await supabase
      .from("estimate_tasks")
      .select("*")
      .eq("estimate_version_id", activeVersionId);

    const { data: lineItems } = await supabase
      .from("estimate_line_items")
      .select("*")
      .eq("estimate_version_id", activeVersionId);

    const excerptIds = new Set([
      ...(tasks || []).map((task) => task.source_excerpt_id).filter(Boolean),
      ...(lineItems || [])
        .map((item) => item.source_excerpt_id)
        .filter(Boolean),
    ]);

    let excerpts = [];
    if (excerptIds.size) {
      const { data } = await supabase
        .from("document_excerpts")
        .select("id, page_number, excerpt_text")
        .in("id", Array.from(excerptIds));
      excerpts = data || [];
    }

    return jsonResponse({
      estimate,
      version,
      tasks: tasks || [],
      line_items: lineItems || [],
      excerpts,
    });
  } catch (err) {
    return jsonResponse({ error: err.message || "Server error" }, 500);
  }
});
