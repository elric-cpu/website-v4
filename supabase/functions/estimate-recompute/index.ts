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
    const { estimate_version_id: versionId, answers = [] } = payload || {};
    if (!versionId) {
      return jsonResponse({ error: "Missing estimate_version_id" }, 400);
    }

    const { data: version } = await supabase
      .from("estimate_versions")
      .select("organization_id, estimate_id")
      .eq("id", versionId)
      .maybeSingle();

    if (!version) {
      return jsonResponse({ error: "Estimate version not found" }, 404);
    }

    const memberCheck = await requireOrgMember(
      supabase,
      version.organization_id,
      user.id,
    );
    if (!memberCheck.ok) return jsonResponse({ error: memberCheck.error }, 403);

    const questionIds = answers
      .map((answer) => answer.question_id)
      .filter(Boolean);
    let definitions = [];
    if (questionIds.length) {
      const { data } = await supabase
        .from("question_definitions")
        .select("id, field_key")
        .in("id", questionIds);
      definitions = data || [];
    }

    const definitionMap = new Map(
      definitions.map((def) => [def.id, def.field_key]),
    );

    const answerRows = answers
      .map((answer) => ({
        estimate_version_id: versionId,
        question_id: answer.question_id,
        answer: {
          field_key: definitionMap.get(answer.question_id),
          target_id: answer.target_id || null,
          value: answer.value,
        },
      }))
      .filter((row) => row.question_id);

    if (answerRows.length) {
      await supabase.from("question_answers").insert(answerRows);
    }

    let projectId = null;
    if (version?.estimate_id) {
      const { data: estimate } = await supabase
        .from("estimates")
        .select("project_id")
        .eq("id", version.estimate_id)
        .maybeSingle();
      projectId = estimate?.project_id || null;
    }

    if (orchestratorUrl) {
      const response = await fetch(
        `${orchestratorUrl.replace(/\/$/, "")}/recompute`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(orchestratorSecret
              ? { "x-orchestrator-key": orchestratorSecret }
              : {}),
          },
          body: JSON.stringify({
            estimate_version_id: versionId,
            answers: answerRows.map((row) => row.answer),
          }),
        },
      );

      if (!response.ok) {
        return jsonResponse({ error: "Orchestrator recompute failed" }, 500);
      }

      const data = await response.json();
      await supabase.from("audit_log").insert({
        organization_id: version.organization_id,
        project_id: projectId,
        actor_id: user.id,
        event_type: "answers_submitted",
        payload: {
          estimate_version_id: versionId,
          new_version_id: data?.version_id,
        },
      });

      return jsonResponse({ ok: true, version_id: data?.version_id || null });
    }

    return jsonResponse({ ok: true, version_id: null });
  } catch (err) {
    return jsonResponse({ error: err.message || "Server error" }, 500);
  }
});
