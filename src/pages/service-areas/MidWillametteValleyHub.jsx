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

const MidWillametteValleyHub = () => {
  const counties = serviceAreaData["mid-valley"].counties;

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
    name: "Mid-Willamette Valley Service Area",
    description:
      "Service area hub for the Mid-Willamette Valley with maintenance plans, restoration, and inspection repairs.",
    provider: {
      "@type": "Organization",
      name: "Benson Home Solutions",
      url: "https://bensonhomesolutions.com",
    },
    areaServed: "Mid-Willamette Valley, OR",
  };

  return (
    <>
      <SEO
        title="Mid-Willamette Valley Service Area | Benson Home Solutions"
        description="Maintenance plans, water damage restoration, mold remediation, and inspection repairs across the Mid-Willamette Valley. Serving Linn, Marion, Polk, and Yamhill counties."
        keywords="Mid-Willamette Valley contractor, Linn County maintenance plans, Marion County water damage restoration, Polk County inspection repairs, Yamhill County mold remediation"
        schema={schema}
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <MapPin className="w-4 h-4" />
              Mid-Willamette Valley
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Mid-Willamette Valley Maintenance, Restoration, and Repairs
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Licensed Oregon contractor serving Linn, Marion, Polk, and Yamhill
              counties with maintenance plans, emergency restoration, and
              inspection repairs.
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
              variant="moss"
              eyebrow="Mid-Willamette Valley"
              title="Regional Coverage"
              subtitle="Maintenance programs and documented restoration for the valley."
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <LinkGrid
            title="Primary services in the Mid-Valley"
            subtitle="Emergency restoration, inspection repairs, and moisture control with clear documentation."
            links={serviceLinks}
          />

          <LinkGrid
            title="Maintenance programs for the Mid-Valley"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-bold text-contractor-black">
            Cities we serve across the Mid-Willamette Valley
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(counties).map(([key, county]) => (
              <div
                key={key}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  {county.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {county.towns.map((town) => (
                    <Link
                      key={town.slug}
                      to={`/service-areas/mid-valley/${town.slug}`}
                      className="text-xs text-gray-600 hover:text-maroon"
                    >
                      {town.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-restoration-gray">
            Also serving surrounding rural communities across the valley.
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-contractor-black mb-4">
            Ready to plan or repair in the Mid-Valley?
          </h2>
          <p className="text-restoration-gray mb-8">
            We coordinate emergency restoration, maintenance planning, and
            inspection repairs with clear scopes and documentation.
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
            Looking for Harney County coverage?{" "}
            <Link
              to={GEO_HUB_LINKS[0].to}
              className="text-maroon font-semibold"
            >
              View Harney County service area
            </Link>
            .
          </div>
        </div>
      </section>
    </>
  );
};

export default MidWillametteValleyHub;
