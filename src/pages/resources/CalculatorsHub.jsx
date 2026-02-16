import React from "react";
import { Link } from "react-router-dom";
import { Calculator, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { CALCULATORS } from "@/data/calculators";
import FeaturedToolsBlock from "@/components/internal-links/FeaturedToolsBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
} from "@/data/internalLinks";

const groupByCategory = (items) =>
  items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

const CalculatorsHub = () => {
  const grouped = groupByCategory(CALCULATORS);
  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Compare plans",
    },
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Review coverage",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Fix inspection items",
    },
    {
      label: "request a scope review",
      to: "/contact",
      description: "Get a documented plan for repairs or ongoing maintenance.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Construction & Maintenance Calculators | Benson Home Solutions"
        description="Professional calculators for maintenance planning, ROI, HVAC sizing, and repair costs with Oregon ZIP code adjustments."
        keywords="Oregon maintenance calculators, HVAC load calculator Oregon, preventive maintenance ROI, repair cost estimator, energy savings calculator, facilities maintenance tools"
        type="website"
      />
      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <Calculator className="w-4 h-4" /> Maintenance Calculators
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Maintenance, Energy, and ROI Tools
            </h1>
            <p className="text-xl text-cream mb-4">
              Fast, localized estimates for property owners and facility teams
              across Oregon.
            </p>
            <p className="text-sm text-gray-200">
              Each tool uses ZIP-adjusted cost factors, documented assumptions,
              and editable inputs. Summary results are instant; detailed reports
              are delivered after submission.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {Object.entries(grouped).map(([category, tools]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-maroon" />
                <h2 className="text-2xl font-bold text-contractor-black m-0">
                  {category}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/resources/calculators/${tool.slug}`}
                    className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                          Interactive Tool
                        </p>
                        <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                          {tool.title}
                        </h3>
                      </div>
                      <Calculator className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
                    </div>
                    <p className="text-sm text-gray-600 mt-3 mb-0">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FeaturedToolsBlock
            links={TOP_TOOL_LINKS}
            subtitle="High-intent tools for budgets, replacement timing, and ROI."
          />
          <NextStepsBlock
            links={nextSteps}
            subtitle="Connect estimates to a maintenance program or project scope."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
          <div className="text-center">
            <Link to="/contact">
              <Button className="bg-maroon hover:bg-red-700 text-white font-bold">
                Talk With a Specialist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CalculatorsHub;
