import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import {
  createAdminClient,
  getUserFromRequest,
  requireOrgMember,
  requireStaffRole,
} from "../_shared/utils.ts";

const evaluateCondition = (condition, answers) => {
  if (!condition) return true;
  if (Array.isArray(condition.all)) {
    return condition.all.every((item) => evaluateCondition(item, answers));
  }
  if (Array.isArray(condition.any)) {
    return condition.any.some((item) => evaluateCondition(item, answers));
  }
  if (condition.field_key) {
    const matches = answers.filter(
      (answer) => answer.field_key === condition.field_key,
    );
    if (!matches.length) return false;
    if (condition.equals !== undefined) {
      return matches.some(
        (answer) => String(answer.value) === String(condition.equals),
      );
    }
    return true;
  }
  return true;
};

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
    const { estimate_version_id: versionId } = payload || {};
    if (!versionId) {
      return jsonResponse({ error: "Missing estimate_version_id" }, 400);
    }

    const { data: version } = await supabase
      .from("estimate_versions")
      .select("organization_id")
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

    const { data: tasks } = await supabase
      .from("estimate_tasks")
      .select("id, trade, missing_fields")
      .eq("estimate_version_id", versionId);

    const { data: definitions } = await supabase
      .from("question_definitions")
      .select("*")
      .or(
        `organization_id.is.null,organization_id.eq.${version.organization_id}`,
      );

    const { data: answers } = await supabase
      .from("question_answers")
      .select("answer")
      .eq("estimate_version_id", versionId);

    const answerPayload = (answers || [])
      .map((row) => row.answer)
      .filter(Boolean);

    const questionInstances = [];
    (tasks || []).forEach((task) => {
      const missing = Array.isArray(task.missing_fields)
        ? task.missing_fields
        : [];
      missing.forEach((field) => {
        const definition = (definitions || []).find(
          (def) => def.scope === "task" && def.field_key === field,
        );
        if (!definition) return;
        if (!evaluateCondition(definition.depends_on, answerPayload)) return;
        questionInstances.push({
          question_id: definition.id,
          field_key: definition.field_key,
          prompt: definition.prompt,
          input_type: definition.input_type,
          options: definition.options,
          target_id: task.id,
        });
      });
    });

    const globalQuestions = (definitions || [])
      .filter((def) => def.scope === "global")
      .filter((def) => evaluateCondition(def.depends_on, answerPayload))
      .map((def) => ({
        question_id: def.id,
        field_key: def.field_key,
        prompt: def.prompt,
        input_type: def.input_type,
        options: def.options,
        target_id: null,
      }));

    return jsonResponse({
      questions: [...globalQuestions, ...questionInstances],
    });
  } catch (err) {
    return jsonResponse({ error: err.message || "Server error" }, 500);
  }
});
