import { moneyRange } from "./base";

export const agingInPlaceMenu = {
  slug: "aging-in-place",
  title: "Aging-in-Place & Accessibility Retrofits",
  ctaLabel: "Request an Accessibility Quote",
  ctaHref: "/contact",
  anchors: {
    positioning: "Sell safety + dignity, not construction",
    speed: "Short sales cycles with standardized scopes",
  },
  serviceMenu: {
    title: "Service Menu",
    items: [
      {
        name: "Home safety walk-through + recommendations",
        typical: moneyRange(195, 395),
        includes: [
          "Fall-risk checklist",
          "Simple priority list",
          "Budget ranges",
        ],
      },
      {
        name: "Grab bars / rail systems (installed)",
        typical: moneyRange(225, 650),
        includes: [
          "Layout guidance",
          "Anchoring into framing",
          "Hardware included (standard)",
        ],
      },
      {
        name: "Door widening (typical interior)",
        typical: moneyRange(850, 1800),
        includes: [
          "Framing as needed",
          "New casing/trim",
          "Paint touch-up (basic)",
        ],
      },
    ],
  },
  pricingMatrix: {
    title: "Common Projects",
    columns: ["Entry Level", "Standard", "Premium"],
    rows: [
      {
        label: "Curbless shower conversion",
        values: [
          moneyRange(6500, 9500),
          moneyRange(9500, 14500),
          moneyRange(14500, 22000),
        ],
      },
      {
        label: "Stair solutions (handrails to lifts)",
        values: [
          moneyRange(450, 1200),
          moneyRange(1200, 4500),
          moneyRange(4500, 12000),
        ],
      },
      {
        label: "Non-slip flooring (small area)",
        values: [
          moneyRange(650, 1400),
          moneyRange(1400, 2800),
          moneyRange(2800, 5200),
        ],
      },
    ],
    finePrint: [
      "We confirm clearances, framing conditions, and finish selections before final pricing.",
    ],
  },
};
