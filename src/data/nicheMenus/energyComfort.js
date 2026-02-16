import { moneyRange } from "./base";

export const energyComfortMenu = {
  slug: "energy-comfort",
  title: "Energy & Comfort Retrofits",
  ctaLabel: "Book a Comfort Audit",
  ctaHref: "/contact",
  anchors: {
    positioning: "Comfort and bill reduction without solar hype",
    method: "Diagnostics + education, then targeted work",
  },
  serviceMenu: {
    title: "Service Menu",
    items: [
      {
        name: "Comfort audit (whole-home)",
        typical: moneyRange(295, 595),
        includes: ["Air leak assessment", "Insulation check", "Priority plan"],
      },
      {
        name: "Air sealing package (targeted)",
        typical: moneyRange(1200, 3500),
        includes: [
          "Common leak points sealed",
          "Verification walk-through",
          "Before/after notes",
        ],
      },
      {
        name: "Insulation upgrade (attic typical)",
        typical: moneyRange(1800, 6500),
        includes: [
          "Baffles and air sealing as needed",
          "Blown or batt options",
          "Depth markers (as applicable)",
        ],
      },
    ],
  },
  pricingMatrix: {
    title: "Typical Upgrade Ranges",
    columns: ["Small Home", "Medium Home", "Large Home"],
    rows: [
      {
        label: "Attic insulation + air seal (combined)",
        values: [
          moneyRange(2200, 5200),
          moneyRange(5200, 9500),
          moneyRange(9500, 16500),
        ],
      },
      {
        label: "Window/door performance improvements",
        values: [
          moneyRange(450, 1800),
          moneyRange(1800, 6500),
          moneyRange(6500, 18000),
        ],
      },
      {
        label: "Crawlspace insulation/moisture combo",
        values: [
          moneyRange(1800, 4500),
          moneyRange(4500, 9000),
          moneyRange(9000, 18000),
        ],
      },
    ],
    finePrint: [
      "We focus on the highest ROI comfort fixes first: air sealing and insulation before expensive replacements.",
    ],
  },
};
