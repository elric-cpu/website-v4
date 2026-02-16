import { supabaseAdmin } from "../db/supabase.js";
import { getPrice } from "../pricing/getPrice.js";
import { computeLabor } from "../labor/engine.js";
import {
  createEstimateVersion,
  insertEstimateData,
} from "../services/estimateService.js";
import { writeAudit } from "../services/auditService.js";
import { applyAnswers } from "../utils/answers.js";
import { logError } from "../utils/logger.js";

export const handleRecompute = async (req, res) => {
  try {
    const { estimate_version_id: estimateVersionId, answers = [] } =
      req.body || {};
    if (!estimateVersionId) {
      return res.status(400).json({ error: "Missing estimate_version_id." });
    }

    const { data: version } = await supabaseAdmin
      .from("estimate_versions")
      .select("id, estimate_id, organization_id, created_by")
      .eq("id", estimateVersionId)
      .maybeSingle();

    if (!version) {
      return res.status(404).json({ error: "Estimate version not found" });
    }

    const { data: estimate } = await supabaseAdmin
      .from("estimates")
      .select("id, project_id")
      .eq("id", version.estimate_id)
      .maybeSingle();

    const { data: project } = await supabaseAdmin
      .from("projects")
      .select("id, zip")
      .eq("id", estimate.project_id)
      .maybeSingle();

    const { data: tasks } = await supabaseAdmin
      .from("estimate_tasks")
      .select("*")
      .eq("estimate_version_id", estimateVersionId);

    const { data: lineItems } = await supabaseAdmin
      .from("estimate_line_items")
      .select("*")
      .eq("estimate_version_id", estimateVersionId);

    const { updatedTasks, updatedLineItems, answerMap } = applyAnswers({
      tasks: tasks || [],
      lineItems: lineItems || [],
      answers,
    });

    const normalizeKey = (value) =>
      String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");

    const recomputedLineItems = [];
    let totalMaterial = 0;
    let totalLabor = 0;
    let totalPrice = 0;

    for (const item of updatedLineItems) {
      const modifiers = {
        access: Number(answerMap.get(`access:${item.task_id}`) || 1),
        finish: Number(answerMap.get(`finish:${item.task_id}`) || 1),
        occupancy: Number(answerMap.get(`occupancy:${item.task_id}`) || 1),
        height: Number(answerMap.get(`height:${item.task_id}`) || 1),
        protection: Number(answerMap.get(`protection:${item.task_id}`) || 1),
      };

      const price = await getPrice({
        organizationId: version.organization_id,
        itemKey: item.item_key,
        locationZip: project.zip,
        quantity: item.quantity,
        unit: item.unit,
      });

      const task = updatedTasks.find((t) => t.id === item.task_id);
      if (!task) continue;
      const taskKey = [
        normalizeKey(task.trade),
        normalizeKey(task.action),
        normalizeKey(task.object),
      ]
        .filter(Boolean)
        .join(":");
      const labor = await computeLabor({
        taskKey,
        trade: task.trade,
        quantity: item.quantity,
        modifiers,
      });

      const materialCost = Number(
        (price.unit_price * item.quantity).toFixed(2),
      );
      const laborCost = labor.labor_cost;
      const allowances = item.allowances || { equipment: 0, disposal: 0 };
      const baseTotal =
        materialCost +
        laborCost +
        (allowances.equipment || 0) +
        (allowances.disposal || 0);
      const lineTotal = Number(
        (baseTotal * (1 + (item.markup_percent || 0))).toFixed(2),
      );

      totalMaterial += materialCost;
      totalLabor += laborCost;
      totalPrice += lineTotal;

      recomputedLineItems.push({
        ...item,
        unit_price: price.unit_price,
        material_cost: materialCost,
        labor_hours: labor.labor_hours,
        labor_cost: laborCost,
        labor_breakdown: labor.breakdown,
        total: lineTotal,
      });
    }

    const totalCost = totalMaterial + totalLabor;
    const profit = Number((totalPrice - totalCost).toFixed(2));
    const margin = totalPrice ? Number((profit / totalPrice).toFixed(4)) : 0;

    const versionData = await createEstimateVersion({
      estimateId: estimate.id,
      organizationId: version.organization_id,
      totals: {
        material_cost: Number(totalMaterial.toFixed(2)),
        labor_cost: Number(totalLabor.toFixed(2)),
        total_cost: Number(totalCost.toFixed(2)),
        total_price: Number(totalPrice.toFixed(2)),
        profit,
        margin,
      },
      createdBy: version.created_by,
    });

    await insertEstimateData({
      versionId: versionData.id,
      organizationId: version.organization_id,
      tasks: updatedTasks,
      lineItems: recomputedLineItems,
      excerptMap: new Map(),
    });

    await writeAudit({
      organizationId: version.organization_id,
      projectId: estimate.project_id,
      actorId: version.created_by,
      eventType: "estimate_version_created",
      payload: { estimate_id: estimate.id, version_id: versionData.id },
    });

    return res.json({ ok: true, version_id: versionData.id });
  } catch (error) {
    logError("Recompute failed", { error: error.message });
    return res.status(500).json({ error: "Recompute failed." });
  }
};
