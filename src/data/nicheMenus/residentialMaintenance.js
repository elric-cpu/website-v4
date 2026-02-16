import { moneyRange } from "./base";

export const residentialMaintenanceMenu = {
  slug: "maintenance-plans",
  title: "Residential Maintenance Plans",
  ctaLabel: "Get Exact Pricing",
  ctaHref: "/resources/home-maintenance-estimator",
  anchors: {
    enrollmentFee: "$0-$149 onboarding (typical)",
    responseWindow: "Member-first scheduling windows",
  },
  pricingMatrix: {
    title: "Typical Monthly Pricing",
    columns: ["Basic", "Plus (Most Popular)", "Priority"],
    rows: [
      {
        label: "Small Home (up to ~1,600 sq ft)",
        values: [
          moneyRange(79, 119),
          moneyRange(129, 189),
          moneyRange(199, 289),
        ],
      },
      {
        label: "Medium Home (~1,600-2,800 sq ft)",
        values: [
          moneyRange(99, 149),
          moneyRange(169, 239),
          moneyRange(249, 349),
        ],
      },
      {
        label: "Large Home (2,800+ sq ft)",
        values: [
          moneyRange(129, 199),
          moneyRange(219, 329),
          moneyRange(319, 449),
        ],
      },
    ],
    finePrint: [
      "Includes recurring checklist visits and documentation. Includes allowances per tier; heavy repairs are quoted separately.",
      "Add-ons: dryer vent clean-out, minor carpentry, appliance hook-ups, seasonal weatherization.",
    ],
  },
  serviceMenu: {
    title: "Popular Add-Ons",
    items: [
      {
        name: "Dryer vent clean-out",
        typical: moneyRange(129, 229),
        includes: [
          "Exterior termination check",
          "Lint removal",
          "Photo documentation",
        ],
      },
      {
        name: "Gutter cleaning (single story)",
        typical: moneyRange(199, 399),
        includes: ["Debris removal", "Downspout flush", "Before/after photos"],
      },
      {
        name: "Caulking & sealing touch-up (per zone)",
        typical: moneyRange(149, 349),
        includes: [
          "Window/door perimeter",
          "Tub/shower touch-ups",
          "Targeted exterior seal points",
        ],
      },
    ],
  },
};
