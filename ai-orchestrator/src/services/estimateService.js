import { supabaseAdmin } from "../db/supabase.js";

export const getOrCreateEstimate = async ({
  organizationId,
  projectId,
  requestedBy,
}) => {
  const { data: existing } = await supabaseAdmin
    .from("estimates")
    .select("id, current_version")
    .eq("organization_id", organizationId)
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing?.id) return existing;

  const estimateId = crypto.randomUUID();
  await supabaseAdmin.from("estimates").insert({
    id: estimateId,
    organization_id: organizationId,
    project_id: projectId,
    status: "draft",
    created_by: requestedBy,
  });

  return { id: estimateId, current_version: null };
};

export const createEstimateVersion = async ({
  estimateId,
  organizationId,
  totals,
  createdBy,
}) => {
  const { data: latest } = await supabaseAdmin
    .from("estimate_versions")
    .select("version_number")
    .eq("estimate_id", estimateId)
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  const versionNumber = (latest?.version_number || 0) + 1;
  const versionId = crypto.randomUUID();

  await supabaseAdmin.from("estimate_versions").insert({
    id: versionId,
    estimate_id: estimateId,
    organization_id: organizationId,
    version_number: versionNumber,
    totals,
    created_by: createdBy,
  });

  await supabaseAdmin
    .from("estimates")
    .update({ current_version: versionId })
    .eq("id", estimateId);

  return { id: versionId, version_number: versionNumber };
};

export const insertEstimateData = async ({
  versionId,
  organizationId,
  tasks,
  lineItems,
  excerptMap,
}) => {
  if (tasks.length) {
    await supabaseAdmin.from("estimate_tasks").insert(
      tasks.map((task) => ({
        id: task.id,
        estimate_version_id: versionId,
        organization_id: organizationId,
        trade: task.trade,
        action: task.action,
        object: task.object,
        room: task.room,
        scope_narrative: task.scope_narrative,
        confidence: task.confidence,
        missing_fields: task.missing_fields,
        source_excerpt_id:
          task.source_excerpt_id ||
          (task.source_ref
            ? excerptMap.get(
                `${task.source_ref.page}|${task.source_ref.excerpt}`,
              )
            : null),
      })),
    );
  }

  if (lineItems.length) {
    await supabaseAdmin.from("estimate_line_items").insert(
      lineItems.map((item) => ({
        id: item.id,
        estimate_version_id: versionId,
        organization_id: organizationId,
        task_id: item.task_id,
        item_key: item.item_key,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
        unit_price: item.unit_price,
        material_cost: item.material_cost,
        labor_hours: item.labor_hours,
        labor_cost: item.labor_cost,
        labor_breakdown: item.labor_breakdown || null,
        allowances: item.allowances,
        markup_percent: item.markup_percent,
        total: item.total,
        source_excerpt_id:
          item.source_excerpt_id ||
          (item.source_ref
            ? excerptMap.get(
                `${item.source_ref.page}|${item.source_ref.excerpt}`,
              )
            : null),
      })),
    );
  }
};
