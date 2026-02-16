import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  indexableRoutes,
  serviceRoutes,
  toolsRoutes,
  blogRoutes,
  landingRoutes,
  serviceAreaHubRoutes,
} from "./routes.mjs";
import {
  GEO_HUB_LINKS,
  GUIDE_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOOLS_HUB_LINK,
  TOP_TOOL_LINKS,
} from "../src/data/internalLinks.js";
import { CALCULATOR_ROUTES, CALCULATORS } from "../src/data/calculators.js";
import { GUIDE_ROUTES, GUIDES } from "../src/data/guides.js";

const docsDir = path.join(process.cwd(), "docs");
const outputPath = path.join(docsDir, "link-map.csv");

const nameByRoute = new Map();
const addName = (route, name) => {
  if (!route || !name) return;
  nameByRoute.set(route, name);
};

addName("/", "Homepage");
addName("/services", "Services Overview");
addName("/resources", "Resources Hub");
addName("/resources-help", "Resources Help");
addName("/service-areas", "Service Areas Index");
addName("/about", "About");
addName("/contact", "Contact");
addName("/reviews", "Reviews");
addName("/blog", "Blog");
addName("/sitemap", "Sitemap");

addName(MAINTENANCE_LINKS.home.to, "Home Maintenance Program");
addName(MAINTENANCE_LINKS.commercial.to, "Commercial Maintenance Program");
addName(TOOLS_HUB_LINK.to, "Tools Hub");

Object.values(SERVICE_PILLAR_LINKS).forEach((link) =>
  addName(link.to, link.label),
);
GEO_HUB_LINKS.forEach((link) => addName(link.to, link.label));
TOP_TOOL_LINKS.forEach((link) => addName(link.to, link.label));
GUIDE_LINKS.forEach((link) => addName(link.to, link.label));
CALCULATOR_ROUTES.forEach((route) => addName(route.path, route.name));
GUIDE_ROUTES.forEach((route) => addName(route.path, route.name));
CALCULATORS.forEach((calc) =>
  addName(`/resources/calculators/${calc.slug}`, calc.title),
);
GUIDES.forEach((guide) =>
  addName(`/resources/guides/${guide.slug}`, guide.title),
);

blogRoutes.forEach((route) => {
  if (!nameByRoute.has(route)) addName(route, route.split("/").pop());
});

const geoLinks = GEO_HUB_LINKS.map((link) => link.to);
const topTools = TOP_TOOL_LINKS.map((link) => link.to);
const servicePillars = Object.values(SERVICE_PILLAR_LINKS).map(
  (link) => link.to,
);
const maintenanceLinks = [
  MAINTENANCE_LINKS.home.to,
  MAINTENANCE_LINKS.commercial.to,
];

const dedupe = (items) => [...new Set(items.filter(Boolean))];

const getType = (route) => {
  if (route === "/") return "Home";
  if (route === "/services") return "Services Overview";
  if (serviceRoutes.includes(route)) {
    if (maintenanceLinks.includes(route)) return "Maintenance";
    return "Service";
  }
  if (route === TOOLS_HUB_LINK.to) return "Tools Hub";
  if (route === "/resources/home-maintenance-estimator") return "Tool";
  if (route.startsWith("/resources/calculators/")) return "Tool";
  if (route.startsWith("/resources/guides/")) return "Guide";
  if (route.startsWith("/resources")) return "Resource";
  if (route.startsWith("/blog/") && route !== "/blog") return "Blog Post";
  if (route === "/blog") return "Blog Hub";
  if (serviceAreaHubRoutes.includes(route)) return "Location Hub";
  if (route === "/service-areas") return "Location Index";
  if (route.startsWith("/landing/")) return "Landing";
  return "Page";
};

const getPrimaryCTA = (type) => {
  switch (type) {
    case "Tool":
      return "Estimate";
    case "Tools Hub":
      return "Use tool";
    case "Maintenance":
      return "Subscribe";
    case "Service":
      return "Request service";
    case "Guide":
      return "Plan next step";
    case "Location Hub":
      return "Request service";
    case "Landing":
      return "Contact";
    case "Services Overview":
      return "Request service";
    default:
      return "Contact";
  }
};

const getPrimaryTopic = (route, type) => {
  if (type === "Service" || type === "Maintenance")
    return nameByRoute.get(route) || "Service";
  if (type === "Tool") return nameByRoute.get(route) || "Tool";
  if (type === "Guide") return nameByRoute.get(route) || "Guide";
  if (type === "Location Hub") return nameByRoute.get(route) || "Location";
  if (type === "Landing") return "Marketing";
  return nameByRoute.get(route) || "General";
};

const relatedServiceMap = {
  "/water-damage-restoration": "/mold-remediation",
  "/mold-remediation": "/water-damage-restoration",
  "/fire-smoke-damage": "/inspection-repairs",
  "/inspection-repairs": "/water-damage-restoration",
};

const getOutLinks = (route, type) => {
  switch (type) {
    case "Home":
      return dedupe([
        ...maintenanceLinks,
        ...servicePillars,
        TOOLS_HUB_LINK.to,
        ...geoLinks,
      ]).slice(0, 8);
    case "Tools Hub":
      return dedupe([
        ...topTools,
        ...maintenanceLinks,
        SERVICE_PILLAR_LINKS.inspection.to,
        ...geoLinks,
        "/contact",
      ]).slice(0, 8);
    case "Tool":
      return dedupe([
        ...maintenanceLinks,
        SERVICE_PILLAR_LINKS.inspection.to,
        TOOLS_HUB_LINK.to,
        ...geoLinks,
        "/contact",
      ]).slice(0, 8);
    case "Maintenance":
      return dedupe([
        TOOLS_HUB_LINK.to,
        ...topTools.slice(0, 3),
        SERVICE_PILLAR_LINKS.inspection.to,
        SERVICE_PILLAR_LINKS.water.to,
        SERVICE_PILLAR_LINKS.mold.to,
        SERVICE_PILLAR_LINKS.fire.to,
        ...geoLinks,
      ]).slice(0, 8);
    case "Service":
      return dedupe([
        ...maintenanceLinks,
        TOOLS_HUB_LINK.to,
        ...topTools.slice(0, 2),
        relatedServiceMap[route],
        ...geoLinks,
      ]).slice(0, 8);
    case "Guide":
      return dedupe([
        SERVICE_PILLAR_LINKS.inspection.to,
        MAINTENANCE_LINKS.home.to,
        TOOLS_HUB_LINK.to,
        topTools[0],
        ...geoLinks,
      ]).slice(0, 8);
    case "Location Hub":
      return dedupe([
        ...maintenanceLinks,
        SERVICE_PILLAR_LINKS.water.to,
        SERVICE_PILLAR_LINKS.mold.to,
        SERVICE_PILLAR_LINKS.fire.to,
        SERVICE_PILLAR_LINKS.inspection.to,
        TOOLS_HUB_LINK.to,
        "/contact",
      ]).slice(0, 8);
    case "Services Overview":
      return dedupe([
        ...maintenanceLinks,
        ...servicePillars,
        TOOLS_HUB_LINK.to,
        ...geoLinks,
      ]).slice(0, 8);
    case "Resource":
      return dedupe([
        TOOLS_HUB_LINK.to,
        ...topTools.slice(0, 3),
        MAINTENANCE_LINKS.home.to,
        ...geoLinks,
      ]).slice(0, 8);
    case "Blog Hub":
    case "Blog Post":
      return dedupe([
        ...servicePillars,
        MAINTENANCE_LINKS.home.to,
        TOOLS_HUB_LINK.to,
        ...geoLinks,
      ]).slice(0, 8);
    case "Landing":
      return dedupe([
        MAINTENANCE_LINKS.home.to,
        MAINTENANCE_LINKS.commercial.to,
        "/contact",
        TOOLS_HUB_LINK.to,
        ...geoLinks,
      ]).slice(0, 8);
    default:
      return dedupe([
        ...maintenanceLinks,
        TOOLS_HUB_LINK.to,
        ...geoLinks,
      ]).slice(0, 8);
  }
};

const getInboundSources = (type) => {
  switch (type) {
    case "Home":
      return [
        "/services",
        "/resources",
        "/maintenance-plans",
        "/commercial-maintenance",
        "/service-areas",
      ];
    case "Tools Hub":
      return [
        "/",
        "/maintenance-plans",
        "/commercial-maintenance",
        "/resources",
        "/services",
      ];
    case "Tool":
      return [
        TOOLS_HUB_LINK.to,
        "/maintenance-plans",
        "/commercial-maintenance",
        "/resources",
        "/services",
      ];
    case "Maintenance":
      return [
        "/",
        TOOLS_HUB_LINK.to,
        "/services",
        "/resources",
        "/service-areas",
      ];
    case "Service":
      return [
        "/services",
        "/maintenance-plans",
        "/commercial-maintenance",
        TOOLS_HUB_LINK.to,
        "/service-areas",
      ];
    case "Guide":
      return [
        "/resources",
        TOOLS_HUB_LINK.to,
        "/maintenance-plans",
        "/services",
        "/blog",
      ];
    case "Location Hub":
      return [
        "/",
        "/services",
        "/maintenance-plans",
        "/commercial-maintenance",
        TOOLS_HUB_LINK.to,
      ];
    case "Landing":
      return [
        "/",
        "/services",
        "/maintenance-plans",
        "/commercial-maintenance",
        "/contact",
      ];
    case "Blog Hub":
    case "Blog Post":
      return [
        "/blog",
        "/services",
        "/resources",
        "/maintenance-plans",
        TOOLS_HUB_LINK.to,
      ];
    default:
      return ["/", "/services", "/resources", "/contact", "/service-areas"];
  }
};

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

const rows = [
  [
    "page_name",
    "url",
    "page_type",
    "primary_topic",
    "primary_cta",
    "out_1",
    "out_2",
    "out_3",
    "out_4",
    "out_5",
    "out_6",
    "out_7",
    "out_8",
    "in_1",
    "in_2",
    "in_3",
    "in_4",
    "in_5",
  ],
];

indexableRoutes.forEach((route) => {
  const pageType = getType(route);
  const pageName = nameByRoute.get(route) || route;
  const primaryTopic = getPrimaryTopic(route, pageType);
  const primaryCTA = getPrimaryCTA(pageType);
  const outLinks = getOutLinks(route, pageType);
  const inbound = getInboundSources(pageType);

  rows.push([
    pageName,
    route,
    pageType,
    primaryTopic,
    primaryCTA,
    ...Array.from({ length: 8 }).map((_, i) => outLinks[i] || ""),
    ...Array.from({ length: 5 }).map((_, i) => inbound[i] || ""),
  ]);
});

const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");

await mkdir(docsDir, { recursive: true });
await writeFile(outputPath, csv, "utf8");
console.log(`Link map generated at ${outputPath}`);
