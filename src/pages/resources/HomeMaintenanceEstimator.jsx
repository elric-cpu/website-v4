import React from "react";
import { Calculator, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import HomeMaintenanceEstimatorWizard from "@/components/maintenance-estimator/HomeMaintenanceEstimatorWizard";
import FixedPriceServiceMenu from "@/components/services/FixedPriceServiceMenu";
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

const HomeMaintenanceEstimator = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home Maintenance Estimator",
    description:
      "Interactive estimator for Benson Home Solutions home maintenance plans.",
  };

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Review program tiers",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Fix inspection items",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Plan emergency coverage",
    },
    {
      label: "request a walkthrough",
      to: "/contact",
      description: "Confirm scope and scheduling with a local manager.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Home Maintenance Estimator | Benson Home Solutions"
        description="Interactive home maintenance estimator. Select your home size, enter your info, and view an estimate instantly."
        keywords="home maintenance estimator Oregon, maintenance cost estimate, annual home maintenance budget, maintenance plan pricing Oregon"
        schema={schema}
        type="website"
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Calculator className="w-4 h-4" />
            Interactive Estimator
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Home Maintenance Estimator
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Choose your home size, enter your information, and view a
            preliminary estimate. We will follow up to confirm scope and
            availability.
          </p>
          <div className="mt-6">
            <a href="tel:5413215115">
              <Button className="bg-white text-maroon hover:bg-cream font-bold">
                <Phone className="w-4 h-4 mr-2" /> Call (541) 321-5115
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeMaintenanceEstimatorWizard />

          <div className="mt-10 space-y-10">
            <NextStepsBlock
              links={nextSteps}
              subtitle="Translate your estimate into a documented maintenance plan."
            />

            <RelatedToolsBlock
              links={[
                TOP_TOOL_LINKS[2],
                TOP_TOOL_LINKS[1],
                TOP_TOOL_LINKS[0],
                TOOLS_HUB_LINK,
              ]}
              subtitle="Compare budgets, repair timing, and ROI."
            />

            <LocationsServedBlock links={GEO_HUB_LINKS} />
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Privacy: We only use this information to provide the estimate and
            follow up about your maintenance plan.
          </p>
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
    </>
  );
};

export default HomeMaintenanceEstimator;
