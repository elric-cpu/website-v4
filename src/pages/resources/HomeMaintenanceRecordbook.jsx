import React from "react";
import { Download, FileText } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
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

const PDF_PATH = "/resources/home-maintenance-recordbook.pdf";

const HomeMaintenanceRecordbook = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Home Maintenance Recordbook",
    fileFormat: "application/pdf",
    url: PDF_PATH,
  };
  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Review maintenance plans",
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
      description: "Confirm scope, priorities, and seasonal scheduling.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Home Maintenance Recordbook (PDF) | Benson Home Solutions"
        description="Download or view the Benson Home Solutions Home Maintenance Recordbook PDF."
        keywords="home maintenance recordbook PDF, maintenance log template, home upkeep checklist Oregon, maintenance documentation"
        schema={schema}
        type="website"
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <FileText className="w-4 h-4" /> PDF Resource
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Home Maintenance Recordbook
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            View online or download the fillable recordbook to track repairs,
            warranties, appliance data, and ongoing home upkeep.
          </p>
          <div className="mt-6">
            <a href={PDF_PATH} download>
              <Button className="bg-white text-maroon hover:bg-cream font-bold">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <iframe
              title="Home Maintenance Recordbook"
              src={PDF_PATH}
              className="w-full"
              style={{ height: "80vh" }}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-4 text-center">
            Order Fixed-Price Maintenance Services
          </h2>
          <p className="text-lg text-restoration-gray text-center mb-10 max-w-3xl mx-auto">
            Keep your maintenance recordbook up-to-date with professional
            services. Fixed pricing, guaranteed results.
          </p>
          <FixedPriceServiceMenu
            filterCategory="maintenance"
            showSubscriptions={true}
            className="mb-16"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Turn your recordbook into a documented maintenance plan."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[0],
              TOP_TOOL_LINKS[2],
              TOP_TOOL_LINKS[1],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Budget ranges and replacement timing tools."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>
    </>
  );
};

export default HomeMaintenanceRecordbook;
