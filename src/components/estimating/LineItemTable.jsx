import React from "react";
import CitationPanel from "./CitationPanel";

const formatCurrency = (value) =>
  value !== null && value !== undefined ? `$${Number(value).toFixed(2)}` : "—";

export default function LineItemTable({ lineItems, taskMap, excerptMap }) {
  return (
    <div className="space-y-4">
      {lineItems.map((item) => {
        const task = taskMap[item.task_id] || {};
        const excerpt = excerptMap[item.source_excerpt_id];
        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex justify-between flex-wrap gap-2">
              <div>
                <div className="font-semibold text-contractor-black">
                  {item.description || "Line item"}
                </div>
                <div className="text-xs text-gray-500">
                  {task.trade || "—"} · {task.room || "General"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-semibold text-contractor-black">
                  {formatCurrency(item.total)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3 text-sm">
              <div>
                <div className="text-gray-500">Qty</div>
                <div>
                  {item.quantity ?? "—"} {item.unit || ""}
                </div>
              </div>
              <div>
                <div className="text-gray-500">Unit Price</div>
                <div>{formatCurrency(item.unit_price)}</div>
              </div>
              <div>
                <div className="text-gray-500">Material</div>
                <div>{formatCurrency(item.material_cost)}</div>
              </div>
              <div>
                <div className="text-gray-500">Labor</div>
                <div>{formatCurrency(item.labor_cost)}</div>
              </div>
              <div>
                <div className="text-gray-500">Labor Hours</div>
                <div>{item.labor_hours ?? "—"}</div>
              </div>
            </div>
            <CitationPanel excerpt={excerpt} />
          </div>
        );
      })}
    </div>
  );
}
