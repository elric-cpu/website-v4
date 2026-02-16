import React from "react";
import { Download, FileText } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
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

const PDF_PATH = "/resources/home-restoration-resource-guide.pdf";

const HomeRestorationResourceGuide = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Resource Guide for Home Restoration",
    fileFormat: "application/pdf",
    url: PDF_PATH,
  };
  const nextSteps = [
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Emergency response",
    },
    {
      ...SERVICE_PILLAR_LINKS.mold,
      cta: "Mold assessment",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Prevent future damage",
    },
    {
      label: "request restoration help",
      to: "/contact",
      description: "Documented scopes and coordination for claims.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Resource Guide for Home Restoration (PDF) | Benson Home Solutions"
        description="Download or view the Benson Home Solutions Resource Guide for Home Restoration PDF."
        keywords="home restoration guide PDF, water damage guide Oregon, restoration checklist, insurance documentation guide"
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
            Resource Guide for Home Restoration
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            View online or download the restoration resource guide.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
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
              title="Resource Guide for Home Restoration"
              src={PDF_PATH}
              className="w-full"
              style={{ height: "80vh" }}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Move from restoration guidance to a documented response plan."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[2],
              TOP_TOOL_LINKS[1],
              TOP_TOOL_LINKS[0],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Estimate budgets and replacement timing after an event."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>
    </>
  );
};

export default HomeRestorationResourceGuide;
