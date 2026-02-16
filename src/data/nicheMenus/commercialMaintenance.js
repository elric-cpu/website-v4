import { moneyRange } from "./base";

export const commercialMaintenanceMenu = {
  slug: "commercial-maintenance",
  title: "Small Commercial & Light Industrial Facilities Maintenance",
  ctaLabel: "Start a Service Agreement",
  ctaHref: "/commercial-service-agreements",
  anchors: {
    positioning:
      "Predictable scopes + documentation for properties under 50k sq ft",
    repeat: "Designed for repeat clients and annual agreements",
  },
  pricingMatrix: {
    title: "Typical Agreement Anchors",
    columns: ["Core", "Preferred", "Priority"],
    rows: [
      {
        label: "Under 10k sq ft",
        values: [
          moneyRange(450, 850),
          moneyRange(850, 1450),
          moneyRange(1450, 2400),
        ],
      },
      {
        label: "10k-25k sq ft",
        values: [
          moneyRange(750, 1250),
          moneyRange(1250, 2200),
          moneyRange(2200, 3600),
        ],
      },
      {
        label: "25k-50k sq ft",
        values: [
          moneyRange(1100, 1900),
          moneyRange(1900, 3200),
          moneyRange(3200, 5200),
        ],
      },
    ],
    finePrint: [
      "Monthly retainers cover scheduled site walks, documentation, and prioritized dispatch. Repairs are billed per scope with pre-approval.",
    ],
  },
  serviceMenu: {
    title: "Common Work Orders",
    items: [
      {
        name: "Tenant turn punch list (small suite)",
        typical: moneyRange(950, 3500),
        includes: [
          "Drywall/paint touch-ups",
          "Hardware/door adjustments",
          "Fixture swaps (basic)",
        ],
      },
      {
        name: "Preventive maintenance site walk",
        typical: moneyRange(250, 650),
        includes: [
          "Safety/maintenance checklist",
          "Photo punch list",
          "Budget ranges",
        ],
      },
      {
        name: "ADA compliance fixes (targeted)",
        typical: moneyRange(650, 5500),
        includes: [
          "Grab bars/rails",
          "Door hardware",
          "Signage and minor adjustments",
        ],
      },
    ],
  },
};
