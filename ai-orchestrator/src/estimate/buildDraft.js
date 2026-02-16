import { getPrice } from "../pricing/getPrice.js";
import { computeLabor } from "../labor/engine.js";

const DEFAULT_MARKUP = 0.2;

const normalizeKey = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const buildTaskKey = (task) =>
  [task.trade, task.action, task.object]
    .map(normalizeKey)
    .filter(Boolean)
    .join(":");

export const buildDraftEstimate = async ({
  organizationId,
  project,
  taskCandidates,
}) => {
  const tasks = [];
  const lineItems = [];
  let totalMaterial = 0;
  let totalLabor = 0;
  let totalPrice = 0;

  for (const candidate of taskCandidates) {
    const taskId = crypto.randomUUID();
    const taskKey = buildTaskKey(candidate);
    const missing = Array.isArray(candidate.missing_fields)
      ? candidate.missing_fields
      : [];
    const quantity = missing.includes("quantity") ? 1 : 1;
    const unit = missing.includes("unit") ? "each" : "each";
    const itemKey =
      normalizeKey(
        `${candidate.trade}_${candidate.action}_${candidate.object}`,
      ) || taskKey;

    const price = await getPrice({
      organizationId,
      itemKey,
      locationZip: project.zip,
      quantity,
      unit,
    });

    const labor = await computeLabor({
      taskKey,
      trade: candidate.trade,
      quantity,
      modifiers: {},
    });

    const materialCost = Number((price.unit_price * quantity).toFixed(2));
    const laborCost = labor.labor_cost;
    const allowances = { equipment: 0, disposal: 0 };
    const markupPercent = DEFAULT_MARKUP;
    const baseTotal =
      materialCost + laborCost + allowances.equipment + allowances.disposal;
    const lineTotal = Number((baseTotal * (1 + markupPercent)).toFixed(2));

    totalMaterial += materialCost;
    totalLabor += laborCost;
    totalPrice += lineTotal;

    tasks.push({
      id: taskId,
      trade: candidate.trade,
      action: candidate.action,
      object: candidate.object,
      room: candidate.room || "General",
      scope_narrative: `${candidate.action} ${candidate.object} (${candidate.trade}).`,
      confidence: candidate.confidence,
      missing_fields: missing,
      source_ref: candidate.source_ref,
    });

    lineItems.push({
      id: crypto.randomUUID(),
      task_id: taskId,
      item_key: itemKey,
      description: `${candidate.action} ${candidate.object}`,
      unit,
      quantity,
      unit_price: price.unit_price,
      material_cost: materialCost,
      labor_hours: labor.labor_hours,
      labor_cost: laborCost,
      allowances,
      markup_percent: markupPercent,
      total: lineTotal,
      source_ref: candidate.source_ref,
      labor_breakdown: labor.breakdown,
      pricing_source: price.source_meta,
    });
  }

  const totalCost = totalMaterial + totalLabor;
  const profit = Number((totalPrice - totalCost).toFixed(2));
  const margin = totalPrice ? Number((profit / totalPrice).toFixed(4)) : 0;

  return {
    tasks,
    lineItems,
    totals: {
      material_cost: Number(totalMaterial.toFixed(2)),
      labor_cost: Number(totalLabor.toFixed(2)),
      total_cost: Number(totalCost.toFixed(2)),
      total_price: Number(totalPrice.toFixed(2)),
      profit,
      margin,
    },
  };
};
