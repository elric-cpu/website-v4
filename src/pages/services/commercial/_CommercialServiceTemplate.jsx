import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/faq/FaqSection";
import { buildFaqSchema } from "@/lib/seo/faqSchema";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

export default function CommercialServiceTemplate({
  title,
  description,
  bullets,
  seoTitle,
  seoDescription,
  keywords,
  faqs = [],
}) {
  const faqSchema = faqs.length ? buildFaqSchema(faqs) : null;
  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Review coverage",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Bundle repairs",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Plan emergency response",
    },
    {
      label: "request a facilities plan",
      to: "/contact",
      description: "Confirm scope, response tiers, and scheduling.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={keywords}
        schema={faqSchema ? [faqSchema] : undefined}
      />
      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-cream max-w-3xl">{description}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/commercial-service-agreements">
              <Button
                size="lg"
                className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto"
              >
                Service Agreements
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:5413215115">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-cream text-cream hover:bg-cream hover:text-contractor-black w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: (541) 321-5115
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What Is Included
          </h2>
          <div className="space-y-3">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                <span className="text-restoration-gray">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-cream border border-gray-200">
            <h3 className="text-xl font-bold text-contractor-black mb-2">
              Need predictable budgeting?
            </h3>
            <p className="text-restoration-gray mb-4">
              We offer annual agreements with defined response times, scheduled
              walkthroughs, and documentation for your records.
            </p>
            <Link to="/commercial-service-agreements">
              <Button className="bg-maroon hover:bg-opacity-90 text-white">
                Review Service Agreements
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Connect this service line to a broader maintenance plan."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[1],
              TOP_TOOL_LINKS[4],
              TOP_TOOL_LINKS[2],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Estimate budgets, replacement timing, and ROI."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>

      <FaqSection items={faqs} className="bg-white" />
    </>
  );
}
