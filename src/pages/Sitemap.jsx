import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { serviceAreaData } from "@/data/serviceAreas";
import { CALCULATOR_ROUTES } from "@/data/calculators";
import { GUIDE_ROUTES } from "@/data/guides";
import { BLOG_ROUTES } from "@/data/blogPosts";

const Sitemap = () => {
  // Static Routes
  const mainRoutes = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/services", name: "Services Overview" },
    { path: "/contact", name: "Contact" },
    { path: "/reviews", name: "Reviews" },
    { path: "/blog", name: "Blog" },
    { path: "/resources", name: "Resources" },
    { path: "/resources-help", name: "Resources Help" },
    { path: "/service-areas", name: "Service Areas" },
    { path: "/sitemap", name: "Sitemap" },
    { path: "/sitemap.xml", name: "Sitemap (XML)" },
    { path: "/robots.txt", name: "Robots.txt" },
  ];

  const serviceRoutes = [
    {
      path: "/water-damage-restoration",
      name: "Water Damage Restoration",
    },
    { path: "/mold-remediation", name: "Mold Remediation" },
    { path: "/fire-smoke-damage", name: "Fire & Smoke Damage Cleanup" },
    { path: "/bathroom-remodels", name: "Bathroom Remodels" },
    { path: "/kitchen-remodels", name: "Kitchen Remodels" },
    { path: "/inspection-repairs", name: "Inspection Repairs & Punch Lists" },
    {
      path: "/maintenance-plans",
      name: "Maintenance Plans",
    },
    {
      path: "/moisture-control",
      name: "Water Intrusion, Envelope & Moisture Control",
    },
    {
      path: "/accessibility-retrofits",
      name: "Aging-in-Place & Accessibility Retrofits",
    },
    {
      path: "/insurance-claims-repairs",
      name: "Insurance Claims Repairs",
    },
    { path: "/energy-comfort-retrofits", name: "Energy & Comfort Retrofits" },
    { path: "/commercial-maintenance", name: "Commercial Maintenance" },
    {
      path: "/commercial/tenant-turns",
      name: "Commercial Tenant Turns",
    },
    {
      path: "/commercial/preventive-maintenance",
      name: "Commercial Preventive Maintenance",
    },
    {
      path: "/commercial/emergency-repairs",
      name: "Emergency Commercial Repairs",
    },
    {
      path: "/commercial/ada-compliance",
      name: "ADA Compliance Fixes",
    },
    {
      path: "/commercial-service-agreements",
      name: "Commercial Service Agreements",
    },
  ];

  const resourceRoutes = [
    { path: "/resources/calculators", name: "Maintenance & ROI Calculators" },
    {
      path: "/resources/home-maintenance-estimator",
      name: "Home Maintenance Estimator",
    },
    {
      path: "/resources/home-maintenance-recordbook",
      name: "Home Maintenance Recordbook (PDF)",
    },
    {
      path: "/resources/home-restoration-resource-guide",
      name: "Resource Guide for Home Restoration (PDF)",
    },
    { path: "/resources/bathroom-remodel-roi", name: "Bathroom Remodel ROI" },
    { path: "/resources/kitchen-remodel-roi", name: "Kitchen Remodel ROI" },
    {
      path: "/resources/water-damage-restoration-guide",
      name: "Water Damage Restoration Guide",
    },
    {
      path: "/resources/ada-aging-in-place-guide",
      name: "ADA & Aging in Place Guide",
    },
    ...GUIDE_ROUTES,
    ...CALCULATOR_ROUTES,
  ];

  const landingRoutes = [
    {
      path: "/landing/residential-maintenance-programs.html",
      name: "Maintenance Plans (Landing)",
    },
    {
      path: "/landing/residential-maintenance-pricing.html",
      name: "Residential Maintenance Pricing Sheet",
    },
  ];

  const blogRoutes = [
    {
      path: "/blog/water-damage-insurance-oregon",
      name: "Water Damage Insurance Guide",
    },
    ...BLOG_ROUTES,
  ];

  // Helper to flatten service area data
  const getServiceAreaRoutes = () => {
    const routes = [];

    // Harney County
    if (serviceAreaData?.["harney-county"]?.towns) {
      routes.push({
        path: "/service-areas/harney-county",
        name: "Harney County Service Area",
      });
      serviceAreaData["harney-county"].towns.forEach((town) => {
        routes.push({
          path: `/service-areas/harney-county/${town.slug}`,
          name: `${town.name}, OR - Harney County`,
        });
      });
    }

    // Mid-Valley
    if (serviceAreaData?.["mid-valley"]?.counties) {
      routes.push({
        path: "/service-areas/mid-willamette-valley",
        name: "Mid-Willamette Valley Service Area",
      });
      Object.entries(serviceAreaData["mid-valley"].counties).forEach(
        ([countySlug, countyData]) => {
          if (countyData.towns) {
            countyData.towns.forEach((town) => {
              routes.push({
                path: `/service-areas/mid-valley/${town.slug}`,
                name: `${town.name}, OR - ${countyData.label}`,
              });
            });
          }
        },
      );
    }

    return routes;
  };

  const serviceAreaRoutes = getServiceAreaRoutes();

  return (
    <>
      <SEO
        title="Sitemap | Benson Home Solutions"
        description="Complete list of pages on Benson Home Solutions website."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-contractor-black mb-8">
          Sitemap
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <section>
            <h2 className="text-2xl font-bold text-maroon mb-4 border-b border-gray-200 pb-2">
              Main Pages
            </h2>
            <ul className="space-y-2">
              {mainRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="text-gray-700 hover:text-maroon hover:underline"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-maroon mb-4 border-b border-gray-200 pb-2">
              Services
            </h2>
            <ul className="space-y-2">
              {serviceRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="text-gray-700 hover:text-maroon hover:underline"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-maroon mb-4 border-b border-gray-200 pb-2">
              Resources
            </h2>
            <ul className="space-y-2">
              {resourceRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="text-gray-700 hover:text-maroon hover:underline"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-maroon mb-4 border-b border-gray-200 pb-2">
              Landing Pages
            </h2>
            <ul className="space-y-2">
              {landingRoutes.map((route) => (
                <li key={route.path}>
                  <a
                    href={route.path}
                    className="text-gray-700 hover:text-maroon hover:underline"
                  >
                    {route.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-maroon mb-4 border-b border-gray-200 pb-2">
              Blog Posts
            </h2>
            <ul className="space-y-2">
              {blogRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="text-gray-700 hover:text-maroon hover:underline"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-maroon mb-4 border-b border-gray-200 pb-2">
              Service Areas
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {serviceAreaRoutes.map((route) => (
                <div key={route.path}>
                  <Link
                    to={route.path}
                    className="text-gray-700 hover:text-maroon hover:underline block truncate"
                  >
                    {route.name}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
