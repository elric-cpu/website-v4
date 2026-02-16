import React from "react";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

export default function ServiceMenu({ title, items, disclaimer }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="bg-white border border-gray-200 rounded-lg">
      <div className="px-6 py-5 bg-white border-b border-gray-200">
        <h3 className="text-xl font-bold text-contractor-black">{title}</h3>
        {isNonEmptyString(disclaimer) && (
          <p className="text-sm text-restoration-gray mt-1">{disclaimer}</p>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-bold text-contractor-black m-0">
                  {item.name}
                </p>
                {isNonEmptyString(item.subtitle) && (
                  <p className="text-sm text-restoration-gray mt-1">
                    {item.subtitle}
                  </p>
                )}
              </div>
              {isNonEmptyString(item.price || item.typical) && (
                <div className="text-right">
                  <p className="text-sm text-restoration-gray m-0">Typical</p>
                  <p className="text-base font-bold text-maroon m-0 whitespace-nowrap">
                    {item.price || item.typical}
                  </p>
                </div>
              )}
            </div>

            {Array.isArray(item.bullets || item.includes) &&
              (item.bullets || item.includes).length > 0 && (
                <ul className="mt-4 space-y-2">
                  {(item.bullets || item.includes).map((b) => (
                    <li key={b} className="text-sm text-restoration-gray">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ))}
      </div>
    </section>
  );
}
