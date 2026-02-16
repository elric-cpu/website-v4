import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingMatrix from "@/components/services/PricingMatrix";
import ServiceMenu from "@/components/services/ServiceMenu";
import FixedPriceServiceMenu from "@/components/services/FixedPriceServiceMenu";
import ResidentialMaintenancePlannerModule from "@/components/maintenance-planner/ResidentialMaintenancePlannerModule";
import { NICHE_MENUS } from "@/data/nicheMenus";
import VisualBlock from "@/components/VisualBlock";
import FeaturedToolsBlock from "@/components/internal-links/FeaturedToolsBlock";
import RelatedGuidesBlock from "@/components/internal-links/RelatedGuidesBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LinkGrid from "@/components/internal-links/LinkGrid";
import {
  ALL_GUIDE_LINKS,
  ALL_TOOL_LINKS,
  GEO_HUB_LINKS,
  RESOURCE_LIBRARY_LINKS,
  SERVICE_PILLAR_LINKS,
} from "@/data/internalLinks";
import {
  HIGH_DEMAND_SERVICES,
  PROGRAM_FAQS,
  PROGRAM_TIERS,
} from "./residentialMaintenanceData";

const buildFaqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const ResidentialMaintenancePrograms = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Residential Maintenance Plan",
    provider: { "@type": "GeneralContractor", name: "Benson Home Solutions" },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Harney County, OR" },
      { "@type": "AdministrativeArea", name: "Mid-Willamette Valley, OR" },
    ],
    description:
      "Subscription-based residential maintenance with predictable pricing, documentation, and one trusted provider for small repairs and seasonal upkeep.",
  };

  const faqSchema = buildFaqSchema(PROGRAM_FAQS);

  const pricingData = NICHE_MENUS.residential_maintenance;
  const nextSteps = [
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Fix inspection items",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Plan emergency coverage",
    },
    {
      ...SERVICE_PILLAR_LINKS.mold,
      cta: "Reduce mold risk",
    },
    {
      label: "request a walkthrough",
      to: "/contact",
      description: "Confirm scope, priorities, and seasonal scheduling.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const resourceLibraryLinks = RESOURCE_LIBRARY_LINKS.map((link) => ({
    ...link,
    cta: link.cta || "View resource",
  }));
  return (
    <>
      <SEO
        title="Maintenance Plans Oregon | Subscription Home Maintenance"
        description="Residential maintenance plans for Oregon homeowners: predictable pricing, one trusted provider, photos & logs, and priority scheduling. Serving Harney County & the Mid-Willamette Valley."
        keywords="home maintenance plans Oregon, residential maintenance plan, quarterly home maintenance, gutter maintenance, caulking sealing, smoke detector service"
        schema={[serviceSchema, faqSchema]}
        type="service"
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <ShieldCheck className="w-4 h-4" />
                Maintenance Plans
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Residential Maintenance Plans
              </h1>
              <p className="text-xl text-cream mb-6">
                One trusted provider, predictable pricing, and documentation you
                can keep.
              </p>
              <div className="space-y-3 text-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cream flex-shrink-0 mt-1" />
                  <p className="m-0">
                    Recurring visits that prevent small issues from becoming big
                    failures.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cream flex-shrink-0 mt-1" />
                  <p className="m-0">
                    Photos and logs for home records, resale, and peace of mind.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cream flex-shrink-0 mt-1" />
                  <p className="m-0">
                    Priority scheduling over one-off calls when your home needs
                    attention.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/resources/home-maintenance-estimator">
                  <Button
                    size="lg"
                    className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto"
                  >
                    Get Pricing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:5413215115">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-contractor-black w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call (541) 321-5115
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-cream rounded-lg p-6 shadow-2xl">
                <VisualBlock
                  variant="clay"
                  eyebrow="Maintenance Plans"
                  title="Documented Home Care"
                  subtitle="Seasonal checklists, photo logs, and predictable scheduling."
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-contractor-black mb-4">
                What Homeowners Want (And Can’t Find)
              </h2>
              <p className="text-lg text-restoration-gray mb-5">
                Most contractors avoid small jobs. Homeowners end up calling
                multiple vendors, waiting weeks, and still lack a clear record
                of what was done. Our residential maintenance plans solve that.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "One Trusted Provider",
                    desc: "A single point of contact for recurring maintenance and small repairs.",
                  },
                  {
                    title: "Predictable Pricing",
                    desc: "Simple tiers and clear expectations. No guesswork or surprise trip fees.",
                  },
                  {
                    title: "Documentation",
                    desc: "Photos, checklist notes, and a maintenance log you can keep.",
                  },
                  {
                    title: "Priority Scheduling",
                    desc: "Members get first access to routes and scheduling windows.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border border-gray-200 rounded-lg p-5"
                  >
                    <p className="font-bold text-contractor-black mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-restoration-gray m-0">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cream border border-cream rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-maroon flex-shrink-0" />
                <div>
                  <p className="font-bold text-contractor-black m-0">
                    Member-First Workflow
                  </p>
                  <p className="text-sm text-restoration-gray mt-1">
                    You get a clear checklist, photo log, and a simple next-step
                    recommendation list.
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="text-sm text-restoration-gray m-0">
                  Want documentation you can keep year over year?
                </p>
                <Link
                  to="/resources/home-maintenance-recordbook"
                  className="inline-flex items-center gap-2 mt-3 text-maroon font-semibold hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  View the Home Maintenance Recordbook
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResidentialMaintenancePlannerModule />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-bold text-contractor-black text-center">
            Typical Pricing + Add-Ons
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <PricingMatrix
              title={pricingData.pricingMatrix.title}
              columns={pricingData.pricingMatrix.columns}
              rows={pricingData.pricingMatrix.rows}
              finePrint={pricingData.pricingMatrix.finePrint}
            />
            <ServiceMenu
              title={pricingData.serviceMenu.title}
              items={pricingData.serviceMenu.items.map((i) => ({
                name: i.name,
                subtitle: "Optional add-on (members get scheduling priority)",
                typical: i.typical,
                includes: i.includes,
              }))}
              disclaimer={`Onboarding: ${pricingData.anchors.enrollmentFee}. ${pricingData.anchors.responseWindow}.`}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-4 text-center">
            Order Fixed-Price Services
          </h2>
          <p className="text-lg text-restoration-gray text-center mb-10 max-w-3xl mx-auto">
            Skip the estimate process and order maintenance services directly.
            Fixed pricing, professional service, guaranteed results.
          </p>
          <FixedPriceServiceMenu
            filterCategory="maintenance"
            showSubscriptions={true}
            className="mb-16"
          />
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-10 text-center">
            High-Demand Services We Cover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGH_DEMAND_SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-contractor-black mb-4">
                  {s.title}
                </h3>
                <div className="space-y-3">
                  {s.points.map((p) => (
                    <div key={p} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-restoration-gray m-0">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-maroon hover:bg-opacity-90 text-white"
              >
                Request Enrollment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-10 text-center">
            Subscription Tiers
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROGRAM_TIERS.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`rounded-xl border bg-white shadow-sm overflow-hidden ${tier.id === "priority" ? "border-maroon" : "border-gray-200"}`}
              >
                <div
                  className={`p-6 ${tier.id === "priority" ? "bg-cream" : "bg-white"}`}
                >
                  <h3 className="text-2xl font-bold text-contractor-black">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-restoration-gray mt-1">
                    {tier.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tier.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-semibold bg-maroon/10 text-maroon px-3 py-1 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <p className="font-semibold text-contractor-black mb-3">
                    Included
                  </p>
                  <div className="space-y-3">
                    {tier.includes.map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-restoration-gray m-0">{i}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 mt-5">{tier.finePrint}</p>

                  <div className="mt-6">
                    <Link
                      to="/resources/home-maintenance-estimator"
                      className="block"
                    >
                      <Button className="w-full bg-maroon hover:bg-opacity-90 text-white font-bold">
                        Get Pricing
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Pricing depends on home size and tier. Estimates are confirmed
            during enrollment.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FeaturedToolsBlock
            links={ALL_TOOL_LINKS}
            subtitle="Budget ranges, replacement timing, and ROI planning."
          />
          <RelatedGuidesBlock
            links={ALL_GUIDE_LINKS}
            subtitle="Practical guidance on budgets, checklists, and repair priorities."
          />
          <LinkGrid
            title="Resource library"
            subtitle="Downloads and reference guides for homeowners."
            links={resourceLibraryLinks}
            columns={3}
          />
          <NextStepsBlock
            links={nextSteps}
            subtitle="Connect your plan to repairs, mitigation, and seasonal priorities."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {PROGRAM_FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <p className="font-bold text-contractor-black mb-2">{faq.q}</p>
                <p className="text-sm text-restoration-gray m-0">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="tel:5413215115">
              <Button
                size="lg"
                className="bg-maroon hover:bg-opacity-90 text-white"
              >
                <Phone className="w-5 h-5 mr-2" />
                Talk To Us About Enrollment
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResidentialMaintenancePrograms;
