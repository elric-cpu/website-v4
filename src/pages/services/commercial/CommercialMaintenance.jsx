import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingMatrix from "@/components/services/PricingMatrix";
import ServiceMenu from "@/components/services/ServiceMenu";
import FixedPriceServiceMenu from "@/components/services/FixedPriceServiceMenu";
import FaqSection from "@/components/faq/FaqSection";
import { NICHE_MENUS } from "@/data/nicheMenus";
import CommercialMaintenancePlannerModule from "@/components/maintenance-planner/CommercialMaintenancePlannerModule";
import { buildFaqSchema } from "@/lib/seo/faqSchema";
import FeaturedToolsBlock from "@/components/internal-links/FeaturedToolsBlock";
import RelatedGuidesBlock from "@/components/internal-links/RelatedGuidesBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LinkGrid from "@/components/internal-links/LinkGrid";
import {
  ALL_GUIDE_LINKS,
  ALL_TOOL_LINKS,
  GEO_HUB_LINKS,
  SERVICE_PILLAR_LINKS,
  RESOURCE_LIBRARY_LINKS,
} from "@/data/internalLinks";

const CommercialMaintenance = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Small Commercial & Light Industrial Maintenance",
    provider: { "@type": "GeneralContractor", name: "Benson Home Solutions" },
    description:
      "Tenant turns, preventive maintenance, emergency repairs, and ADA compliance fixes for small commercial properties under 50k sq ft in Oregon.",
  };

  const whoWeServe = [
    "Medical offices & clinics",
    "Property managers",
    "Churches & community facilities",
    "Warehouses under 50,000 sq ft",
  ];

  const pricingData = NICHE_MENUS.commercial_maintenance;

  const services = [
    {
      title: "Tenant Turns",
      desc: "Fast, clean turnover between tenants with predictable scopes.",
      to: "/commercial/tenant-turns",
    },
    {
      title: "Preventive Maintenance",
      desc: "Scheduled inspections and small fixes that prevent bigger failures.",
      to: "/commercial/preventive-maintenance",
    },
    {
      title: "Emergency Repairs",
      desc: "Priority response for leaks, door/security issues, and urgent damage.",
      to: "/commercial/emergency-repairs",
    },
    {
      title: "ADA Compliance Fixes",
      desc: "Targeted modifications to reduce liability and improve accessibility.",
      to: "/commercial/ada-compliance",
    },
  ];

  const nextSteps = [
    {
      label: "commercial service agreements",
      to: "/commercial-service-agreements",
      description: "Documented scopes, budgets, and response expectations.",
      intent: "subscribe",
      cta: "Review agreements",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Bundle repairs",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Plan emergency coverage",
    },
    {
      label: "request a facilities plan",
      to: "/contact",
      description: "Confirm scopes, SLAs, and scheduling.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const resourceLibraryLinks = RESOURCE_LIBRARY_LINKS.map((link) => ({
    ...link,
    cta: link.cta || "View resource",
  }));

  const faqs = [
    {
      question: "What size commercial properties do you serve?",
      answer:
        "We focus on small commercial and light industrial properties under 50,000 sq ft across Oregon.",
    },
    {
      question: "Do you offer scheduled preventive maintenance?",
      answer:
        "Yes. We build quarterly or monthly walkthroughs that reduce emergency repairs and improve compliance.",
    },
    {
      question: "How fast is your response time for urgent issues?",
      answer:
        "Service agreement clients receive priority response. Typical turnaround is same-day or next-day depending on scope.",
    },
    {
      question: "Can you handle tenant turns end-to-end?",
      answer:
        "Yes. We provide punch lists, repairs, paint, flooring, and closeout documentation for property managers.",
    },
    {
      question: "Do you provide documentation for compliance?",
      answer:
        "Yes. We provide photo documentation, maintenance logs, and repair notes suitable for property records.",
    },
    {
      question: "Do you coordinate specialized trades?",
      answer:
        "We can coordinate licensed trade partners for HVAC, electrical, and plumbing as needed.",
    },
    {
      question: "What does pricing look like?",
      answer:
        "Pricing depends on building size, condition, and response tier. Use the ZIP-adjusted planner for budget ranges.",
    },
    {
      question: "How do we start a service agreement?",
      answer:
        "Complete the service agreement funnel and we will schedule a walkthrough to finalize scope and pricing.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Commercial Property Maintenance Oregon"
        description="Small commercial & light industrial maintenance for properties under 50k sq ft: tenant turns, preventive maintenance, emergency repairs, ADA compliance fixes."
        schema={[schema, faqSchema]}
        keywords="commercial maintenance Oregon, tenant turns, preventive maintenance, emergency facility repairs, ADA compliance contractor"
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Small Commercial & Light Industrial Maintenance
              </h1>
              <p className="text-xl text-cream mb-6">
                Predictable scopes, documented closeout, and responsive service
                for properties under 50k sq ft across Oregon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Ideal Clients</h2>
                <ul className="space-y-2">
                  {whoWeServe.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cream flex-shrink-0 mt-0.5" />
                      <span className="text-cream">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-contractor-black mb-4">
              What We Do
            </h2>
            <p className="text-lg text-restoration-gray mb-10">
              We focus on small commercial properties that need dependable
              maintenance, fast response, and clear documentation. Most work is
              scoped, scheduled, and completed with minimal downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  {s.title}
                </h3>
                <p className="text-restoration-gray mb-4">{s.desc}</p>
                <div className="text-maroon font-semibold inline-flex items-center gap-2">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CommercialMaintenancePlannerModule />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FeaturedToolsBlock
            links={ALL_TOOL_LINKS}
            subtitle="Budget ranges, replacement timing, and ROI scenarios."
          />
          <RelatedGuidesBlock
            links={ALL_GUIDE_LINKS}
            subtitle="Planning guidance for facilities teams and property managers."
          />
          <LinkGrid
            title="Resource library"
            subtitle="Downloads and reference guides for facilities teams."
            links={resourceLibraryLinks}
            columns={3}
          />
          <NextStepsBlock
            links={nextSteps}
            subtitle="Connect planning to SLAs, repair scopes, and emergency readiness."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-4 text-center">
            Order Fixed-Price Maintenance Services
          </h2>
          <p className="text-lg text-restoration-gray text-center mb-10 max-w-3xl mx-auto">
            Skip the estimate process for common maintenance tasks. Fixed
            pricing, professional service, guaranteed results.
          </p>
          <FixedPriceServiceMenu
            filterCategory="maintenance"
            showSubscriptions={true}
            className="mb-16"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-bold text-contractor-black">
            Service Menus + Budget Ranges
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ServiceMenu
              title={pricingData.serviceMenu.title}
              items={pricingData.serviceMenu.items}
              disclaimer="Start with the smallest predictable scope. We can roll repeated issues into a service agreement."
            />
            <PricingMatrix
              title={pricingData.pricingMatrix.title}
              columns={pricingData.pricingMatrix.columns}
              rows={pricingData.pricingMatrix.rows}
              finePrint={pricingData.pricingMatrix.finePrint}
            />
          </div>
        </div>
      </section>

      <FaqSection items={faqs} className="bg-white" />

      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-6">
            Become the Default Vendor
          </h2>
          <p className="text-xl text-restoration-gray mb-8">
            Annual service agreements and priority response contracts reduce
            surprises, protect budgets, and keep tenants happy.
          </p>
          <Link to="/commercial-service-agreements">
            <Button
              size="lg"
              className="bg-maroon hover:bg-opacity-90 text-white"
            >
              Start the Agreement Funnel
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-restoration-gray mt-6">
            Licensed, Bonded & Insured • CCB# 258533
          </p>
        </div>
      </section>
    </>
  );
};

export default CommercialMaintenance;
