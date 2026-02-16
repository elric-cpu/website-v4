export const GUIDES = [
  {
    slug: "annual-home-maintenance-budget",
    title: "Annual Home Maintenance Budget: What to Plan For",
    description:
      "Build a realistic annual maintenance budget with system-by-system ranges and Oregon cost factors.",
    category: "Maintenance Planning",
  },
  {
    slug: "seasonal-maintenance-checklist",
    title: "Seasonal Maintenance Checklist (Spring, Summer, Fall, Winter)",
    description:
      "Season-by-season checklist for upkeep, safety, and performance.",
    category: "Maintenance Planning",
  },
  {
    slug: "commercial-preventive-maintenance-essentials",
    title: "Small Commercial Preventive Maintenance Essentials",
    description:
      "Quarterly priorities for small commercial properties under 50k sq ft.",
    category: "Commercial Maintenance",
  },
  {
    slug: "inspection-report-repairs",
    title: "How to Handle Inspection Report Repairs",
    description:
      "Common inspection items, priority order, and how to reduce delays.",
    category: "Inspection Repairs",
  },
  {
    slug: "inspection-repairs-cost-guide",
    title: "Inspection Repairs Cost Guide by System",
    description:
      "Typical ranges for roof, HVAC, electrical, plumbing, and safety fixes.",
    category: "Inspection Repairs",
  },
  {
    slug: "signs-of-hidden-water-damage",
    title: "Signs of Hidden Water Damage",
    description:
      "What to watch for and when to call for professional restoration.",
    category: "Water Damage",
  },
  {
    slug: "mold-when-to-call-a-pro",
    title: "Mold: When You Need a Pro vs When You Do Not",
    description: "How to assess risk, scope, and remediation needs safely.",
    category: "Mold Remediation",
  },
  {
    slug: "fire-smoke-what-to-do-first",
    title: "Fire and Smoke Damage: What to Do First",
    description:
      "Immediate steps to protect safety, document damage, and plan cleanup.",
    category: "Fire and Smoke",
  },
];

export const GUIDE_ROUTES = GUIDES.map((guide) => ({
  path: `/resources/guides/${guide.slug}`,
  name: guide.title,
}));
