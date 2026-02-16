import React, { useMemo } from "react";
import LineItemTable from "./LineItemTable";
import LaborSummary from "./LaborSummary";

const formatCurrency = (value) =>
  value !== null && value !== undefined ? `$${Number(value).toFixed(2)}` : "—";

export default function EstimateReview({ estimateData }) {
  const {
    version,
    tasks,
    line_items: lineItems,
    excerpts,
  } = estimateData || {};
  const taskMap = useMemo(() => {
    return (tasks || []).reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {});
  }, [tasks]);

  const excerptMap = useMemo(() => {
    return (excerpts || []).reduce((acc, excerpt) => {
      acc[excerpt.id] = excerpt;
      return acc;
    }, {});
  }, [excerpts]);

  const grouped = useMemo(() => {
    return (lineItems || []).reduce((acc, item) => {
      const task = taskMap[item.task_id] || {};
      const key = `${task.trade || "General"} | ${task.room || "General"}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [lineItems, taskMap]);

  const taskSummaries = useMemo(() => {
    return (lineItems || []).reduce((acc, item) => {
      const task = taskMap[item.task_id];
      if (!task) return acc;
      if (!acc[item.task_id]) {
        acc[item.task_id] = {
          label: `${task.trade || "General"} · ${task.room || "General"}`,
          hours: 0,
          cost: 0,
        };
      }
      acc[item.task_id].hours += Number(item.labor_hours || 0);
      acc[item.task_id].cost += Number(item.labor_cost || 0);
      return acc;
    }, {});
  }, [lineItems, taskMap]);

  if (!estimateData) return null;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="text-sm text-gray-500">Material</div>
          <div className="text-2xl font-semibold text-contractor-black">
            {formatCurrency(version?.totals?.material_cost)}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="text-sm text-gray-500">Labor</div>
          <div className="text-2xl font-semibold text-contractor-black">
            {formatCurrency(version?.totals?.labor_cost)}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-2xl font-semibold text-contractor-black">
            {formatCurrency(version?.totals?.total_price)}
          </div>
        </div>
      </div>

      <LaborSummary lineItems={lineItems || []} />

      {Object.entries(grouped).map(([groupKey, items]) => (
        <div key={groupKey} className="space-y-3">
          <div className="text-sm font-semibold text-gray-600 uppercase">
            {groupKey}
          </div>
          <LineItemTable
            lineItems={items}
            taskMap={taskMap}
            excerptMap={excerptMap}
          />
          <div className="space-y-2">
            {(items || []).map((item) => {
              const task = taskMap[item.task_id];
              if (!task?.scope_narrative) return null;
              return (
                <div key={`${item.id}-scope`} className="text-sm text-gray-500">
                  <span className="font-semibold">Scope:</span>{" "}
                  {task.scope_narrative}
                </div>
              );
            })}
          </div>
          <div className="text-sm text-gray-500">
            {Object.entries(taskSummaries).map(([taskId, summary]) => (
              <div key={taskId} className="flex justify-between">
                <span>{summary.label}</span>
                <span>
                  {summary.hours.toFixed(2)} hrs ·{" "}
                  {formatCurrency(summary.cost)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
