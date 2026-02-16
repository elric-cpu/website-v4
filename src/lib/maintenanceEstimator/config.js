export const HOME_SIZE_OPTIONS = [
  { id: "0_1500", label: "0–1500 sq/ft" },
  { id: "1501_2500", label: "1501–2500 sq/ft" },
  { id: "2501_3500", label: "2501–3500 sq/ft" },
];

// Replace with your real pricing when ready.
// These defaults keep the UI functional without implying final pricing.
export const ESTIMATE_BY_SIZE = {
  "0_1500": {
    headline: "Estimated starting range (monthly)",
    range: "$189–$249",
    notes: [
      "Includes quarterly maintenance visits and priority scheduling.",
      "Final pricing depends on location, home age, and required tasks.",
    ],
  },
  "1501_2500": {
    headline: "Estimated starting range (monthly)",
    range: "$239–$329",
    notes: [
      "Includes quarterly maintenance visits and priority scheduling.",
      "Final pricing depends on location, home age, and required tasks.",
    ],
  },
  "2501_3500": {
    headline: "Estimated starting range (monthly)",
    range: "$299–$399",
    notes: [
      "Includes quarterly maintenance visits and priority scheduling.",
      "Final pricing depends on location, home age, and required tasks.",
    ],
  },
};
