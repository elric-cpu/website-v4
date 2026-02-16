export const PROGRAM_TIERS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Scheduled essentials to reduce surprises.",
    highlights: [
      "Quarterly visit",
      "Photo documentation",
      "Predictable budgeting",
    ],
    includes: [
      "Quarterly maintenance visit (checklist-based)",
      "Smoke/CO detector test + battery replacement (owner-supplied batteries or billed as materials)",
      "Gutter and downspout visual check + minor debris removal (reachable areas)",
      "Caulking/sealing touch-ups in priority areas (as-needed, minor)",
      "HVAC filter replacement (owner-supplied filters or billed as materials)",
      "Minor drywall/paint touch-ups (small areas, as-needed)",
    ],
    finePrint:
      "Designed for proactive upkeep. Larger repairs and upgrades are quoted separately with member priority.",
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "More coverage and faster response for active households.",
    highlights: [
      "Quarterly visit",
      "Member response window",
      "Expanded minor repairs",
    ],
    includes: [
      "Everything in Basic",
      "Expanded caulking/sealing program (windows/doors, wet areas)",
      "Drainage and water-shedding review (gutters, splash blocks, grading notes)",
      "One additional minor repair visit per year (non-emergency, scheduled)",
      "Home recordkeeping: updated maintenance log with before/after photos",
    ],
    finePrint:
      "Best for homeowners who want a single trusted vendor and consistent documentation.",
  },
  {
    id: "priority",
    name: "Priority",
    tagline:
      "Top-tier scheduling, priority dispatch, and concierge coordination.",
    highlights: [
      "Fastest response",
      "Priority dispatch",
      "Best for busy owners",
    ],
    includes: [
      "Everything in Plus",
      "Priority response for urgent issues (availability-based)",
      "Preferred scheduling (first access to seasonal routes)",
      "Annual home condition review summary (photo log + recommendations)",
      "Discounted trip minimum on member-approved small repairs (per terms)",
    ],
    finePrint:
      "Ideal for second homes, rentals, and busy households that want faster service and fewer vendor calls.",
  },
];

export const HIGH_DEMAND_SERVICES = [
  {
    title: "Gutter & Drainage Maintenance",
    points: [
      "Keep water moving away from the foundation",
      "Identify clogs, leaks, and overflow points",
      "Reduce ice dams and moisture intrusion risk",
    ],
  },
  {
    title: "Caulking & Sealing",
    points: [
      "Stop drafts and minor leaks before they grow",
      "Focus on wet areas, windows, doors, penetrations",
      "Improve comfort and reduce energy loss",
    ],
  },
  {
    title: "Smoke/CO Detector Service",
    points: [
      "Test devices and replace batteries",
      "Confirm placement and basic operation",
      "Document service for your home records",
    ],
  },
  {
    title: "HVAC Filter Program",
    points: [
      "Swap filters on schedule",
      "Improve air quality and system performance",
      "Prevent premature equipment wear",
    ],
  },
  {
    title: "Minor Drywall & Paint Repairs",
    points: [
      "Handle the small damage that never gets scheduled",
      "Keep rooms looking maintained",
      "Avoid turning small repairs into big ones",
    ],
  },
];

export const PROGRAM_FAQS = [
  {
    q: "Is this a subscription with a contract?",
    a: "Yes. Most programs run month-to-month with clear terms for cancellations and scheduling. We confirm exact terms at enrollment so expectations are simple and predictable.",
  },
  {
    q: "What areas do you serve for the maintenance plan?",
    a: "Harney County (Burns, Hines) and the Mid-Willamette Valley (Sweet Home, Lebanon, Albany, Corvallis). If you are nearby, ask—routes expand as membership grows.",
  },
  {
    q: "Do you provide documentation?",
    a: "Yes. Each visit includes photos and checklist notes. Members can also use our Home Maintenance Recordbook PDF for organized home records.",
  },
  {
    q: 'What counts as "included" vs. a quoted repair?',
    a: "Included work is the checklist-based maintenance plus minor touch-ups. Anything requiring specialty trades, significant materials, or extended time is quoted separately—with member priority for scheduling.",
  },
  {
    q: "Can you use my existing fixtures/materials?",
    a: "Yes. If you have preferred filters, batteries, caulk, paint, or hardware, we can use them. Otherwise we can supply materials and bill them transparently.",
  },
  {
    q: "How do I get pricing?",
    a: "Pricing is based on home size and the tier you choose. Use the Home Maintenance Estimator for a fast estimate and we will confirm details before enrollment.",
  },
  {
    q: "Do you offer service for rentals or second homes?",
    a: "Yes. The Priority tier is built for second homes and rentals that need faster response and clearer documentation.",
  },
  {
    q: "What if I have an urgent issue between visits?",
    a: "Members receive priority response windows. We will triage the issue quickly and schedule the fastest available visit.",
  },
];
