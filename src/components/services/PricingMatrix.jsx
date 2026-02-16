import React from "react";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

export default function PricingMatrix({ title, columns, rows, finePrint }) {
  if (!Array.isArray(columns) || columns.length === 0) return null;
  if (!Array.isArray(rows) || rows.length === 0) return null;

  return (
    <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-6 py-5 bg-cream border-b border-gray-200">
        <h3 className="text-xl font-bold text-contractor-black">{title}</h3>
        {Array.isArray(finePrint) ? (
          <ul className="mt-2 space-y-1">
            {finePrint.map((n) => (
              <li key={n} className="text-sm text-restoration-gray">
                {n}
              </li>
            ))}
          </ul>
        ) : (
          isNonEmptyString(finePrint) && (
            <p className="text-sm text-restoration-gray mt-1">{finePrint}</p>
          )
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-white">
              <th className="px-6 py-4 text-sm font-semibold text-restoration-gray">
                Scope
              </th>
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-6 py-4 text-sm font-semibold text-restoration-gray"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm font-semibold text-contractor-black">
                  {row.label}
                </td>
                {row.values.map((v, idx) => (
                  <td
                    key={`${row.label}-${idx}`}
                    className="px-6 py-4 text-sm text-restoration-gray whitespace-nowrap"
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
