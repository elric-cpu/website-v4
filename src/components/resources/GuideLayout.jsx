import React from "react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const GuideLayout = ({ seo, title, subtitle, description, children }) => (
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

    <section className="bg-contractor-black text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">{title}</h1>
        {subtitle ? (
          <p className="text-xl text-cream mb-4">{subtitle}</p>
        ) : null}
        {description ? (
          <p className="text-sm text-gray-200 max-w-3xl">{description}</p>
        ) : null}
      </div>
    </section>

    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {children}
      </div>
    </section>
  </>
);

export default GuideLayout;
