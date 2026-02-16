import React from "react";

export default function FaqSection({
  title = "Frequently Asked Questions",
  items = [],
  className = "",
}) {
  if (!items.length) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-contractor-black mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((faq) => (
            <div
              key={faq.question}
              className="border border-gray-200 rounded-lg p-5 bg-white"
            >
              <h3 className="font-bold text-contractor-black mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-restoration-gray m-0">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
