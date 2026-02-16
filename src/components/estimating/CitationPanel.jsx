import React from "react";

export default function CitationPanel({ excerpt }) {
  if (!excerpt) return null;
  return (
    <div className="text-xs text-gray-500 mt-1">
      <span className="font-semibold">Citation:</span> Page{" "}
      {excerpt.page_number}
      {excerpt.excerpt_text ? ` — “${excerpt.excerpt_text}”` : ""}
    </div>
  );
}
