export const PRICING_NOTES = [
  "Prices shown are typical ranges. Final pricing depends on access, conditions, and scope details.",
  "Permit fees, specialty testing, and material selections are handled as needed and disclosed before work starts.",
  "Service areas: Harney County and Mid-Valley (Sweet Home / Lebanon / Albany / Corvallis).",
];

export const moneyRange = (min, max) =>
  `$${min.toLocaleString()}-$${max.toLocaleString()}`;
