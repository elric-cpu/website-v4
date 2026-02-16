import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import VisualBlock from "@/components/VisualBlock";
import { Button } from "@/components/ui/button";
import LinkGrid from "@/components/internal-links/LinkGrid";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOOLS_HUB_LINK,
  TOP_TOOL_LINKS,
} from "@/data/internalLinks";
import { serviceAreaData } from "@/data/serviceAreas";

const HarneyCountyHub = () => {
  const towns = serviceAreaData["harney-county"].towns;

  const serviceLinks = [
    SERVICE_PILLAR_LINKS.water,
    SERVICE_PILLAR_LINKS.mold,
    SERVICE_PILLAR_LINKS.fire,
    SERVICE_PILLAR_LINKS.inspection,
    SERVICE_PILLAR_LINKS.moisture,
  ].map((link) => ({ ...link, cta: "View service" }));

  const maintenanceLinks = [
    { ...MAINTENANCE_LINKS.home, cta: "View plans" },
    { ...MAINTENANCE_LINKS.commercial, cta: "View commercial" },
  ];

  const toolLinks = [TOOLS_HUB_LINK, ...TOP_TOOL_LINKS].map((link) => ({
    ...link,
    cta: "Open tool",
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Harney County Service Area",
    description:
      "Service area hub for Harney County, Oregon with maintenance plans, restoration, and inspection repairs.",
    provider: {
      "@type": "Organization",
      name: "Benson Home Solutions",
      url: "https://bensonhomesolutions.com",
    },
    areaServed: "Harney County, OR",
  };

  return (
    <>
      <SEO
        title="Harney County Service Area | Benson Home Solutions"
        description="Maintenance plans, water damage restoration, mold remediation, and inspection repairs in Harney County, Oregon. Serving Burns, Hines, and nearby communities."
        keywords="Harney County contractor, Burns OR maintenance plans, Hines OR water damage restoration, Harney County inspection repairs"
        schema={schema}
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <MapPin className="w-4 h-4" />
              Harney County, Oregon
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Harney County Maintenance, Restoration, and Repair Services
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Licensed Oregon contractor serving Burns, Hines, and surrounding
              communities with maintenance plans, emergency restoration, and
              inspection-ready repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:5413215115">
                <Button className="bg-maroon hover:bg-red-700 text-white font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call (541) 321-5115
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-contractor-black"
                >
                  Request Service
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <VisualBlock
              variant="slate"
              eyebrow="Harney County"
              title="Local Coverage"
              subtitle="Documented scopes, fast response, and licensed crews."
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <LinkGrid
            title="Primary services in Harney County"
            subtitle="Emergency restoration, inspection repairs, and moisture control with clear documentation."
            links={serviceLinks}
          />

          <LinkGrid
            title="Maintenance programs for Harney County"
            subtitle="Plan annual budgets and prevent costly emergencies."
            links={maintenanceLinks}
            columns={2}
          />

          <LinkGrid
            title="Tools and planning resources"
            subtitle="Use ZIP-adjusted calculators to estimate budgets and timelines."
            links={toolLinks}
          />
        </div>
      </section>

      <section className="py-12 bg-cream border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-contractor-black mb-6">
            Cities we serve in Harney County
          </h2>
          <div className="flex flex-wrap gap-3">
            {towns.map((town) => (
              <Link
                key={town.slug}
                to={`/service-areas/harney-county/${town.slug}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-contractor-black hover:border-maroon hover:text-maroon transition-colors"
              >
                {town.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-sm text-restoration-gray">
            Also serving surrounding rural communities across Harney County.
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-contractor-black mb-4">
            Need fast help in Harney County?
          </h2>
          <p className="text-restoration-gray mb-8">
            We coordinate emergency response, maintenance planning, and repair
            scopes for Harney County homes and facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button className="bg-maroon hover:bg-red-700 text-white font-semibold">
                Call (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-maroon text-maroon hover:bg-maroon hover:text-white"
              >
                Request Service
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-xs text-gray-500">
            Looking for Mid-Valley coverage?{" "}
            <Link
              to={GEO_HUB_LINKS[1].to}
              className="text-maroon font-semibold"
            >
              View Mid-Willamette Valley service area
            </Link>
            .
          </div>
        </div>
      </section>
    </>
  );
};

export default HarneyCountyHub;
