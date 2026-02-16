import React from "react";

const formatCurrency = (value) =>
  value !== null && value !== undefined ? `$${Number(value).toFixed(2)}` : "—";

export default function LaborSummary({ lineItems }) {
  const totalHours = lineItems.reduce(
    (sum, item) => sum + Number(item.labor_hours || 0),
    0,
  );
  const totalCost = lineItems.reduce(
    (sum, item) => sum + Number(item.labor_cost || 0),
    0,
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-contractor-black mb-2">
        Labor Summary
      </h3>
      <div className="text-sm text-gray-600">Total hours</div>
      <div className="text-2xl font-semibold text-contractor-black">
        {totalHours.toFixed(2)} hrs
      </div>
      <div className="text-sm text-gray-600 mt-3">Total labor cost</div>
      <div className="text-2xl font-semibold text-contractor-black">
        {formatCurrency(totalCost)}
      </div>
    </div>
  );
}
