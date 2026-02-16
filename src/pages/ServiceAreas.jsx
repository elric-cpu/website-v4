import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { serviceAreaData } from "@/data/serviceAreas";
import VisualBlock from "@/components/VisualBlock";
import { Button } from "@/components/ui/button";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import { MAINTENANCE_LINKS, SERVICE_PILLAR_LINKS } from "@/data/internalLinks";

const ServiceAreas = () => {
  const harney = serviceAreaData["harney-county"];
  const midValley = serviceAreaData["mid-valley"];

  const primaryMidValleyTowns = [
    { name: "Sweet Home", slug: "sweet-home" },
    { name: "Lebanon", slug: "lebanon" },
    { name: "Albany", slug: "albany" },
    { name: "Corvallis", slug: "corvallis" },
    { name: "Salem", slug: "salem" },
    { name: "Keizer", slug: "keizer" },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Oregon Service Areas",
    description:
      "Service areas for Benson Home Solutions across Harney County and the Mid-Willamette Valley. Maintenance plans, restoration, and inspection repairs.",
    provider: {
      "@type": "Organization",
      name: "Benson Home Solutions",
      url: "https://bensonhomesolutions.com",
    },
    areaServed: [
      "Harney County, OR",
      "Linn County, OR",
      "Marion County, OR",
      "Polk County, OR",
      "Yamhill County, OR",
    ],
  };
  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Explore plans",
    },
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Review coverage",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Emergency response",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Inspection repairs",
    },
  ];

  return (
    <>
      <SEO
        title="Oregon Service Areas | Benson Home Solutions"
        description="Service areas across Harney County and the Mid-Willamette Valley for maintenance plans, water damage restoration, mold remediation, moisture control, and inspection repairs."
        keywords="Oregon service areas, Harney County contractor, Mid-Willamette Valley contractor, Burns OR contractor, Hines OR contractor, Sweet Home contractor, Lebanon contractor, Albany contractor, Corvallis contractor, Salem contractor"
        schema={schema}
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-maroon/90 text-white px-3 py-1 rounded-full text-sm font-semibold mb-5">
                <MapPin className="w-4 h-4" />
                Oregon Service Areas
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                Local Coverage for Maintenance, Restoration, and Repairs
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                We serve Harney County and the Mid-Willamette Valley with
                maintenance plans, water damage restoration, mold remediation,
                moisture control, and inspection-ready repairs.
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
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <VisualBlock
                variant="slate"
                eyebrow="Local Coverage"
                title="Harney County + Mid-Valley"
                subtitle="Documented scopes, fast response, and licensed Oregon crews."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-cream border border-cream rounded-xl p-6">
            <h2 className="text-2xl font-bold text-contractor-black mb-2">
              <Link to="/service-areas/harney-county">{harney.label}</Link>
            </h2>
            <p className="text-restoration-gray mb-4">{harney.description}</p>
            <div className="flex flex-wrap gap-2">
              {harney.towns.map((town) => (
                <Link
                  key={town.slug}
                  to={`/service-areas/harney-county/${town.slug}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-contractor-black hover:border-maroon hover:text-maroon transition-colors"
                >
                  {town.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-cream border border-cream rounded-xl p-6">
            <h2 className="text-2xl font-bold text-contractor-black mb-2">
              <Link to="/service-areas/mid-willamette-valley">
                {midValley.label}
              </Link>
            </h2>
            <p className="text-restoration-gray mb-4">
              Restoration, maintenance, and repair coverage throughout Linn,
              Marion, Polk, and Yamhill counties.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {primaryMidValleyTowns.map((town) => (
                <Link
                  key={town.slug}
                  to={`/service-areas/mid-valley/${town.slug}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-contractor-black hover:border-maroon hover:text-maroon transition-colors text-center"
                >
                  {town.name}
                </Link>
              ))}
            </div>
            <details className="mt-5">
              <summary className="cursor-pointer text-maroon font-semibold">
                View full Mid-Valley service list
              </summary>
              <div className="grid md:grid-cols-2 gap-5 mt-4">
                {Object.entries(midValley.counties).map(([key, county]) => (
                  <div key={key}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
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
            </details>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Explore maintenance programs and service pillars for your area."
          />
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-contractor-black mb-4">
            Need a Fast Response?
          </h2>
          <p className="text-restoration-gray mb-8">
            We coordinate emergency restoration, maintenance plans, and
            inspection repairs with documented scopes and clear next steps.
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
        </div>
      </section>
    </>
  );
};

export default ServiceAreas;
