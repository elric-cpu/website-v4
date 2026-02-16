import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LinkCard = ({ link }) => {
  const content = (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-maroon hover:shadow-md">
      {link.intent ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 m-0">
          {link.intent}
        </p>
      ) : null}
      <h3 className="text-lg font-bold text-contractor-black mt-2 mb-2">
        {link.label}
      </h3>
      {link.description ? (
        <p className="text-sm text-restoration-gray mb-4">{link.description}</p>
      ) : null}
      <span className="inline-flex items-center gap-2 text-maroon font-semibold text-sm">
        {link.cta || "Learn more"}
        <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  );

  if (link.to) {
    return (
      <Link to={link.to} className="block h-full">
        {content}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      className="block h-full"
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
};

const resolveGridCols = (columns) => {
  if (columns === 2) return "grid-cols-1 md:grid-cols-2";
  if (columns === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

const LinkGrid = ({ title, subtitle, links = [], columns = 3 }) => (
  <section className="space-y-4">
    <div>
      <h2 className="text-2xl font-bold text-contractor-black mb-2">{title}</h2>
      {subtitle ? (
        <p className="text-restoration-gray max-w-3xl">{subtitle}</p>
      ) : null}
    </div>
    <div className={`grid ${resolveGridCols(columns)} gap-5`}>
      {links.map((link) => (
        <LinkCard key={`${link.label}-${link.to || link.href}`} link={link} />
      ))}
    </div>
  </section>
);

export default LinkGrid;
