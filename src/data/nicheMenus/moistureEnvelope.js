import { moneyRange } from "./base";

export const moistureEnvelopeMenu = {
  slug: "moisture-envelope",
  title: "Water Intrusion, Envelope & Moisture Control",
  ctaLabel: "Book a Moisture Inspection",
  ctaHref: "/contact",
  anchors: {
    positioning: "Pre-loss, non-cat moisture work (not restoration)",
    margin: "Typical 45-70% gross (scope dependent)",
  },
  serviceMenu: {
    title: "Service Menu",
    items: [
      {
        name: "Targeted leak diagnosis (1 area)",
        typical: moneyRange(295, 495),
        includes: [
          "Moisture mapping",
          "Photo documentation",
          "Simple repair recommendations",
        ],
      },
      {
        name: "Full envelope investigation + report",
        typical: moneyRange(650, 1250),
        includes: [
          "Roof-to-wall + penetrations",
          "Window/door flashing review",
          "Written recommendations + priority list",
        ],
      },
      {
        name: "Crawlspace moisture control plan",
        typical: moneyRange(395, 895),
        includes: [
          "Vapor barrier evaluation",
          "Ventilation review",
          "Drainage and grading guidance",
        ],
      },
    ],
  },
  pricingMatrix: {
    title: "Typical Repair Ranges",
    columns: ["Small", "Medium", "Large"],
    rows: [
      {
        label: "Window/door flashing correction (per opening)",
        values: [
          moneyRange(450, 850),
          moneyRange(850, 1650),
          moneyRange(1650, 3200),
        ],
      },
      {
        label: "Roof-to-wall transition correction",
        values: [
          moneyRange(650, 1250),
          moneyRange(1250, 2500),
          moneyRange(2500, 5500),
        ],
      },
      {
        label: "Drainage/grading fix (localized)",
        values: [
          moneyRange(750, 1500),
          moneyRange(1500, 3500),
          moneyRange(3500, 9000),
        ],
      },
    ],
    finePrint: [
      "Repairs are quoted after diagnostics because the fix depends on what is actually failing (flashing, sealant, drainage, cladding transitions).",
    ],
  },
};
