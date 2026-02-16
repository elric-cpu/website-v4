import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import CommercialAgreementFunnel from "@/components/commercial-agreements/CommercialAgreementFunnel";
import FaqSection from "@/components/faq/FaqSection";
import { buildFaqSchema } from "@/lib/seo/faqSchema";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import LinkGrid from "@/components/internal-links/LinkGrid";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_DIRECTORY_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

export default function CommercialServiceAgreements() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Commercial Service Agreement",
    provider: { "@type": "GeneralContractor", name: "Benson Home Solutions" },
    description:
      "Annual commercial maintenance agreements with priority response, scheduled walkthroughs, and documentation for small commercial properties in Oregon.",
  };

  const outcomes = [
    "Predictable scopes and budgeting",
    "Faster response for urgent issues",
    "Scheduled walkthroughs + documented findings",
    "Less tenant churn and fewer surprises",
  ];

  const faqs = [
    {
      question: "What is included in a service agreement?",
      answer:
        "Response tiers, scheduled walkthroughs, defined scopes, and documentation for maintenance records.",
    },
    {
      question: "Is there a minimum term?",
      answer:
        "Agreements are typically annual to allow for seasonal planning and predictable budgeting.",
    },
    {
      question: "Can we customize the scope?",
      answer:
        "Yes. We tailor scopes to your property type, tenant mix, and budget priorities.",
    },
    {
      question: "Do agreements include emergency response?",
      answer: "Yes. Priority response is a core benefit of service agreements.",
    },
    {
      question: "How do you price agreements?",
      answer:
        "Pricing is based on building size, condition, and response tier. We confirm after a walkthrough.",
    },
    {
      question: "Do you provide documentation?",
      answer:
        "Yes. We provide photos, maintenance logs, and closeout notes for your records.",
    },
    {
      question: "Can agreements cover multiple locations?",
      answer:
        "Yes. We support multi-site property managers with consolidated scheduling.",
    },
    {
      question: "What happens after I submit the funnel?",
      answer:
        "We schedule a walkthrough, confirm scope, and provide a final agreement proposal.",
    },
  ];

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Review maintenance program",
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
      label: "request a facilities walkthrough",
      to: "/contact",
      description: "Confirm scope, response tiers, and reporting.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const commercialServiceLinks = SERVICE_DIRECTORY_LINKS.filter(
    (link) =>
      link.to.startsWith("/commercial/") ||
      link.to === "/commercial-maintenance",
  ).map((link) => ({
    ...link,
    cta: link.cta || "View scope",
  }));

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Commercial Service Agreements Oregon"
        description="Annual commercial maintenance agreements with priority response, scheduled walkthroughs, and documentation. Built for properties under 50k sq ft."
        schema={[schema, faqSchema]}
        keywords="commercial service agreement, facility maintenance contract Oregon, priority response contractor"
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Commercial Service Agreements
            </h1>
            <p className="text-xl text-cream mb-8">
              A structured agreement for predictable maintenance: scheduled
              walkthroughs, defined response tiers, and documented scopes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/commercial-maintenance" className="inline-flex">
                <Button
                  variant="outline"
                  className="border-2 border-cream text-cream hover:bg-cream hover:text-contractor-black w-full sm:w-auto"
                >
                  Back to Commercial Services
                </Button>
              </Link>
              <a href="tel:5413215115" className="inline-flex">
                <Button className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: (541) 321-5115
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-contractor-black mb-4">
                What you get
              </h2>
              <div className="space-y-3">
                {outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                    <span className="text-restoration-gray">{o}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-cream border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-contractor-black">
                  Typical fit
                </h3>
                <p className="text-restoration-gray mt-2">
                  Medical offices, property managers, churches, and warehouses
                  under 50,000 sq ft.
                </p>
                <p className="text-restoration-gray mt-2">
                  Goal: become your default vendor with an annual agreement and
                  priority response.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <CommercialAgreementFunnel />

              <div className="mt-6 text-sm text-restoration-gray">
                Submission routing:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Set{" "}
                    <span className="font-mono">
                      VITE_COMMERCIAL_AGREEMENT_LEAD_ENDPOINT
                    </span>{" "}
                    to route these leads separately.
                  </li>
                  <li>
                    If not set, the funnel falls back to{" "}
                    <span className="font-mono">
                      VITE_ESTIMATOR_LEAD_ENDPOINT
                    </span>
                    .
                  </li>
                </ul>
              </div>

              <div className="mt-10">
                <Link to="/contact" className="inline-flex">
                  <Button
                    variant="outline"
                    className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white"
                  >
                    Prefer email instead?
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Connect agreements to preventive scopes and emergency coverage."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[1],
              TOP_TOOL_LINKS[4],
              TOP_TOOL_LINKS[2],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Support budgeting, replacement timing, and ROI comparisons."
          />
          <LinkGrid
            title="Commercial service scopes"
            subtitle="Tenant turns, compliance fixes, and preventive repair paths."
            links={commercialServiceLinks}
            columns={2}
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>

      <FaqSection items={faqs} className="bg-white" />
    </>
  );
}
