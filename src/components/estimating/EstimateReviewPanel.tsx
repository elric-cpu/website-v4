import React, { useMemo } from "react";
import type { EstimateLineItem, EstimateTask } from "@/lib/estimating/types";

const formatCurrency = (value: number | null | undefined) =>
  value === null || value === undefined ? "—" : `$${value.toFixed(2)}`;

type Props = {
  tasks: EstimateTask[];
  lineItems: EstimateLineItem[];
};

const groupByTrade = (tasks: EstimateTask[], lineItems: EstimateLineItem[]) => {
  const taskMap = new Map(tasks.map((task) => [task.id, task]));
  return lineItems.reduce<Record<string, EstimateLineItem[]>>((acc, item) => {
    const task = taskMap.get(item.estimate_task_id);
    const trade = task?.trade || "General";
    if (!acc[trade]) acc[trade] = [];
    acc[trade].push(item);
    return acc;
  }, {});
};

const EstimateReviewPanel = ({ tasks, lineItems }: Props) => {
  const grouped = groupByTrade(tasks, lineItems);
  const totals = lineItems.reduce(
    (acc, item) => {
      const material =
        item.quantity && item.material_unit_price
          ? item.quantity * item.material_unit_price
          : 0;
      const labor =
        item.labor_hours && item.labor_rate
          ? item.labor_hours * item.labor_rate
          : 0;
      const laborHours = Number(item.labor_hours || 0);
      acc.material += material;
      acc.labor += labor;
      acc.laborHours += laborHours;
      acc.equipment += Number(item.equipment_cost || 0);
      acc.disposal += Number(item.disposal_cost || 0);
      acc.total += Number(item.total_cost || 0);
      return acc;
    },
    {
      material: 0,
      labor: 0,
      laborHours: 0,
      equipment: 0,
      disposal: 0,
      total: 0,
    },
  );

  const subtotal =
    totals.material + totals.labor + totals.equipment + totals.disposal;
  const profit = totals.total - subtotal;
  const margin = totals.total > 0 ? (profit / totals.total) * 100 : 0;

  const taskMap = useMemo(
    () => new Map(tasks.map((task) => [task.id, task])),
    [tasks],
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Estimate review</h3>
      <p className="text-sm text-gray-600 mt-1">
        Line items grouped by trade with citations back to the inspection
        report.
      </p>
      <div className="mt-4 space-y-6">
        {Object.entries(grouped).map(([trade, items]) => (
          <div key={trade} className="space-y-3">
            <h4 className="text-md font-semibold text-gray-800">{trade}</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-500">
                  <tr>
                    <th className="py-2 pr-4">Line item</th>
                    <th className="py-2 pr-4">Qty</th>
                    <th className="py-2 pr-4">Material</th>
                    <th className="py-2 pr-4">Labor hrs</th>
                    <th className="py-2 pr-4">Labor</th>
                    <th className="py-2 pr-4">Total</th>
                    <th className="py-2">Citation</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {items.map((item) => {
                    const task = taskMap.get(item.estimate_task_id);
                    const location = task?.location_label;
                    return (
                      <tr key={item.id} className="border-t border-gray-100">
                        <td className="py-2 pr-4">
                          <div className="font-medium">
                            {item.description || item.item_key}
                          </div>
                          {location && (
                            <div className="text-xs text-gray-500">
                              Room: {location}
                            </div>
                          )}
                        </td>
                        <td className="py-2 pr-4">
                          {item.quantity
                            ? `${item.quantity} ${item.unit || ""}`
                            : "—"}
                        </td>
                        <td className="py-2 pr-4">
                          {formatCurrency(
                            item.quantity && item.material_unit_price
                              ? item.quantity * item.material_unit_price
                              : null,
                          )}
                        </td>
                        <td className="py-2 pr-4">
                          {item.labor_hours ? item.labor_hours.toFixed(2) : "—"}
                        </td>
                        <td className="py-2 pr-4">
                          {formatCurrency(
                            item.labor_hours && item.labor_rate
                              ? item.labor_hours * item.labor_rate
                              : null,
                          )}
                        </td>
                        <td className="py-2 pr-4">
                          {formatCurrency(item.total_cost)}
                        </td>
                        <td className="py-2 text-xs text-gray-500">
                          {item.source_ref?.page ? (
                            <div>
                              Page {item.source_ref.page}:{" "}
                              {item.source_ref.excerpt}
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="rounded-lg border border-gray-100 p-4">
          <div className="text-sm font-semibold text-gray-800">
            Estimate totals
          </div>
          <div className="mt-2 grid gap-2 text-sm text-gray-600 md:grid-cols-3">
            <div>Material: {formatCurrency(totals.material)}</div>
            <div>Labor: {formatCurrency(totals.labor)}</div>
            <div>Labor hours: {totals.laborHours.toFixed(2)}</div>
            <div>
              Equipment/Disposal:{" "}
              {formatCurrency(totals.equipment + totals.disposal)}
            </div>
            <div>Subtotal: {formatCurrency(subtotal)}</div>
            <div>Profit: {formatCurrency(profit)}</div>
            <div>Margin: {margin.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateReviewPanel;
