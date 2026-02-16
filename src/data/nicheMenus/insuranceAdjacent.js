import { moneyRange } from "./base";

export const insuranceAdjacentMenu = {
  slug: "insurance-claims-repairs",
  title: "Insurance Claims Repairs",
  ctaLabel: "Get a Fast Triage Visit",
  ctaHref: "/contact",
  anchors: {
    positioning: "The fixer after the adjuster leaves",
    sweetSpot: "Too small for big restoration, too complex for a handyman",
  },
  serviceMenu: {
    title: "Service Menu",
    items: [
      {
        name: "Post-leak triage visit + moisture map",
        typical: moneyRange(350, 650),
        includes: [
          "Moisture readings",
          "Photo documentation",
          "Immediate next steps",
        ],
      },
      {
        name: "Partial dry-out package (small loss)",
        typical: moneyRange(900, 2500),
        includes: [
          "Equipment set",
          "Daily monitoring (typical)",
          "Simple drying log",
        ],
      },
      {
        name: "Claim documentation support",
        typical: moneyRange(250, 600),
        includes: [
          "Photo organization",
          "Scope summary",
          "Adjuster-ready notes",
        ],
      },
    ],
  },
  pricingMatrix: {
    title: "Typical Rebuild Ranges",
    columns: ["Small", "Medium", "Large"],
    rows: [
      {
        label: "Post-leak drywall/paint rebuild (single room)",
        values: [
          moneyRange(950, 2500),
          moneyRange(2500, 5200),
          moneyRange(5200, 9800),
        ],
      },
      {
        label: "Cabinet toe-kick / base repair",
        values: [
          moneyRange(650, 1500),
          moneyRange(1500, 3200),
          moneyRange(3200, 7500),
        ],
      },
      {
        label: "Small mold remediation (localized)",
        values: [
          moneyRange(1200, 2800),
          moneyRange(2800, 6500),
          moneyRange(6500, 14000),
        ],
      },
    ],
    finePrint: [
      "We can split scopes into insurance-covered and homeowner-pay portions when appropriate.",
    ],
  },
};
