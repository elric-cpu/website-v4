import React from "react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CalculatorLayout({
  seo,
  badge,
  title,
  subtitle,
  description,
  children,
  sidebar,
}) {
  return (
    <>
      {seo ? (
        <SEO
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
          schema={seo.schema}
          type={seo.type || "website"}
        />
      ) : null}
      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {badge ? (
              <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                {badge}
              </div>
            ) : null}
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">{title}</h1>
            {subtitle ? (
              <p className="text-xl text-cream mb-4">{subtitle}</p>
            ) : null}
            {description ? (
              <p className="text-sm text-gray-200 max-w-2xl">{description}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-10">{children}</div>
            <div className="lg:col-span-5 space-y-6">{sidebar}</div>
          </div>
        </div>
      </section>
    </>
  );
}
