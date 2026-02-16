import { CALCULATOR_ROUTES } from "../src/data/calculators.js";
import { GUIDE_ROUTES } from "../src/data/guides.js";
import { serviceAreaData } from "../src/data/serviceAreas.js";
import { BLOG_ROUTES } from "../src/data/blogPosts.js";

export const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/reviews",
  "/blog",
  "/resources",
  "/resources-help",
  "/service-areas",
  "/sitemap",
];

export const serviceRoutes = [
  "/water-damage-restoration",
  "/mold-remediation",
  "/fire-smoke-damage",
  "/bathroom-remodels",
  "/kitchen-remodels",
  "/inspection-repairs",
  "/maintenance-plans",
  "/moisture-control",
  "/accessibility-retrofits",
  "/insurance-claims-repairs",
  "/energy-comfort-retrofits",
  "/commercial-maintenance",
  "/commercial/tenant-turns",
  "/commercial/preventive-maintenance",
  "/commercial/emergency-repairs",
  "/commercial/ada-compliance",
  "/commercial-service-agreements",
];

export const resourceRoutes = [
  "/resources/calculators",
  "/resources/home-maintenance-estimator",
  "/resources/home-maintenance-recordbook",
  "/resources/home-restoration-resource-guide",
  "/resources/bathroom-remodel-roi",
  "/resources/kitchen-remodel-roi",
  "/resources/water-damage-restoration-guide",
  "/resources/ada-aging-in-place-guide",
  ...GUIDE_ROUTES.map((route) => route.path),
  ...CALCULATOR_ROUTES.map((route) => route.path),
];

export const toolsRoutes = [
  "/resources/calculators",
  "/resources/home-maintenance-estimator",
  ...CALCULATOR_ROUTES.map((route) => route.path),
];

export const blogRoutes = [
  "/blog/water-damage-insurance-oregon",
  ...BLOG_ROUTES.map((route) => route.path),
];

export const landingRoutes = [
  "/landing/residential-maintenance-programs.html",
  "/landing/residential-maintenance-pricing.html",
];

export const serviceAreaHubRoutes = [
  "/service-areas/harney-county",
  "/service-areas/mid-willamette-valley",
];

export const serviceAreaTownRoutes = [];

if (serviceAreaData?.["harney-county"]?.towns) {
  serviceAreaData["harney-county"].towns.forEach((town) => {
    serviceAreaTownRoutes.push(`/service-areas/harney-county/${town.slug}`);
  });
}

if (serviceAreaData?.["mid-valley"]?.counties) {
  Object.values(serviceAreaData["mid-valley"].counties).forEach((county) => {
    county.towns.forEach((town) => {
      serviceAreaTownRoutes.push(`/service-areas/mid-valley/${town.slug}`);
    });
  });
}

export const indexableRoutes = [
  ...staticRoutes,
  ...serviceRoutes,
  ...resourceRoutes,
  ...blogRoutes,
  ...landingRoutes,
  ...serviceAreaHubRoutes,
];
