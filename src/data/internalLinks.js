import { CALCULATORS } from "./calculators.js";
import { GUIDES } from "./guides.js";

export const GEO_HUB_LINKS = [
  {
    label: "Harney County service area",
    to: "/service-areas/harney-county",
    description: "Burns, Hines, and surrounding high desert communities.",
    intent: "location",
  },
  {
    label: "Mid-Willamette Valley service area",
    to: "/service-areas/mid-willamette-valley",
    description: "Linn, Marion, Polk, and Yamhill county coverage.",
    intent: "location",
  },
];

export const TOOLS_HUB_LINK = {
  label: "Maintenance and ROI calculators",
  to: "/resources/calculators",
  description: "ZIP-adjusted tools for budgets, planning, and ROI.",
  intent: "estimate",
};

export const TOP_TOOL_LINKS = [
  {
    label: "Home maintenance estimator",
    to: "/resources/home-maintenance-estimator",
    description: "Annual budget range with ZIP-based pricing.",
    intent: "estimate",
  },
  {
    label: "Preventive vs reactive ROI",
    to: "/resources/calculators/preventive-maintenance-roi",
    description: "Compare preventive spend to emergency costs.",
    intent: "compare",
  },
  {
    label: "Instant repair cost calculator",
    to: "/resources/calculators/instant-repair-cost",
    description: "Fast repair ranges by system and urgency.",
    intent: "estimate",
  },
  {
    label: "HVAC load calculator",
    to: "/resources/calculators/hvac-load",
    description: "Sizing guidance and localized replacement ranges.",
    intent: "plan",
  },
  {
    label: "Asset lifecycle extension",
    to: "/resources/calculators/asset-lifecycle",
    description: "Model replacement timing and life extension.",
    intent: "plan",
  },
];

export const MAINTENANCE_LINKS = {
  home: {
    label: "home maintenance program",
    to: "/maintenance-plans",
    description: "Subscription maintenance with documented scopes.",
    intent: "subscribe",
  },
  commercial: {
    label: "commercial maintenance program",
    to: "/commercial-maintenance",
    description: "Facilities maintenance for properties under 50k sq ft.",
    intent: "subscribe",
  },
};

export const SERVICE_PILLAR_LINKS = {
  water: {
    label: "water damage restoration",
    to: "/water-damage-restoration",
    description: "24/7 extraction, drying, and documentation.",
    intent: "service",
  },
  mold: {
    label: "mold remediation",
    to: "/mold-remediation",
    description: "Containment, removal, and moisture correction.",
    intent: "service",
  },
  fire: {
    label: "fire and smoke damage cleanup",
    to: "/fire-smoke-damage",
    description: "Cleanup, odor control, and rebuild coordination.",
    intent: "service",
  },
  inspection: {
    label: "inspection repairs",
    to: "/inspection-repairs",
    description: "Punch lists, pre-sale repairs, and code fixes.",
    intent: "service",
  },
  moisture: {
    label: "moisture control",
    to: "/moisture-control",
    description: "Leak diagnostics and envelope repairs.",
    intent: "service",
  },
};

export const GUIDE_LINKS = [
  {
    label: "Annual home maintenance budget guide",
    to: "/resources/guides/annual-home-maintenance-budget",
    description: "What to plan for by system and season.",
    intent: "guide",
  },
  {
    label: "Seasonal maintenance checklist",
    to: "/resources/guides/seasonal-maintenance-checklist",
    description: "Spring, summer, fall, and winter checklists.",
    intent: "guide",
  },
  {
    label: "Inspection report repairs guide",
    to: "/resources/guides/inspection-report-repairs",
    description: "Common items, priorities, and next steps.",
    intent: "guide",
  },
  {
    label: "Hidden water damage signs",
    to: "/resources/guides/signs-of-hidden-water-damage",
    description: "Symptoms, risks, and when to call a pro.",
    intent: "guide",
  },
];

export const ALL_TOOL_LINKS = [
  {
    label: "Home maintenance estimator",
    to: "/resources/home-maintenance-estimator",
    description: "Annual budget range with ZIP-based pricing.",
    intent: "estimate",
  },
  ...CALCULATORS.map((tool) => ({
    label: tool.title,
    to: `/resources/calculators/${tool.slug}`,
    description: tool.description,
    intent: "tool",
  })),
];

export const ALL_GUIDE_LINKS = GUIDES.map((guide) => ({
  label: guide.title,
  to: `/resources/guides/${guide.slug}`,
  description: guide.description,
  intent: "guide",
}));

export const SERVICE_DIRECTORY_LINKS = [
  SERVICE_PILLAR_LINKS.water,
  SERVICE_PILLAR_LINKS.mold,
  SERVICE_PILLAR_LINKS.fire,
  SERVICE_PILLAR_LINKS.inspection,
  SERVICE_PILLAR_LINKS.moisture,
  {
    label: "bathroom remodels",
    to: "/bathroom-remodels",
    description: "Durable, accessible bathrooms with clear scopes.",
    intent: "service",
  },
  {
    label: "kitchen remodels",
    to: "/kitchen-remodels",
    description: "Layouts, cabinetry, and finishes tailored for daily use.",
    intent: "service",
  },
  {
    label: "accessibility retrofits",
    to: "/accessibility-retrofits",
    description: "Safety upgrades, grab bars, and barrier-free access.",
    intent: "service",
  },
  {
    label: "insurance claims repairs",
    to: "/insurance-claims-repairs",
    description: "Scope documentation, repairs, and claims coordination.",
    intent: "service",
  },
  {
    label: "energy comfort retrofits",
    to: "/energy-comfort-retrofits",
    description: "Air sealing and comfort improvements.",
    intent: "service",
  },
  {
    label: "commercial maintenance",
    to: "/commercial-maintenance",
    description: "Facilities maintenance for properties under 50k sq ft.",
    intent: "service",
  },
  {
    label: "commercial tenant turns",
    to: "/commercial/tenant-turns",
    description: "Turnover scopes, refreshes, and punch lists.",
    intent: "service",
  },
  {
    label: "commercial preventive maintenance",
    to: "/commercial/preventive-maintenance",
    description: "Scheduled checks that reduce emergencies.",
    intent: "service",
  },
  {
    label: "emergency commercial repairs",
    to: "/commercial/emergency-repairs",
    description: "Rapid response for urgent issues.",
    intent: "service",
  },
  {
    label: "ADA compliance fixes",
    to: "/commercial/ada-compliance",
    description: "Targeted accessibility upgrades.",
    intent: "service",
  },
  {
    label: "commercial service agreements",
    to: "/commercial-service-agreements",
    description: "Documented scopes, budgets, and response times.",
    intent: "service",
  },
];

export const RESOURCE_LIBRARY_LINKS = [
  {
    label: "Home maintenance recordbook",
    to: "/resources/home-maintenance-recordbook",
    description: "Track repairs, warranties, and seasonal tasks.",
    intent: "download",
  },
  {
    label: "Home restoration resource guide",
    to: "/resources/home-restoration-resource-guide",
    description: "Step-by-step restoration guide for Oregon homeowners.",
    intent: "download",
  },
  {
    label: "Water damage restoration guide",
    to: "/resources/water-damage-restoration-guide",
    description: "Mitigation steps and documentation checklist.",
    intent: "guide",
  },
  {
    label: "Bathroom remodel ROI",
    to: "/resources/bathroom-remodel-roi",
    description: "Estimate payback and planning ranges.",
    intent: "estimate",
  },
  {
    label: "Kitchen remodel ROI",
    to: "/resources/kitchen-remodel-roi",
    description: "Estimate payback and planning ranges.",
    intent: "estimate",
  },
  {
    label: "ADA & aging-in-place guide",
    to: "/resources/ada-aging-in-place-guide",
    description: "Accessibility priorities and retrofit planning.",
    intent: "guide",
  },
];
