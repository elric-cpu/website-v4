import React from "react";
import NichePageTemplate from "./NichePageTemplate";
import { NICHE_MENUS } from "@/data/nicheMenus";
import {
  GEO_HUB_LINKS,
  GUIDE_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

export default function MoistureEnvelope() {
  const data = NICHE_MENUS.moisture_envelope;

  const meta = {
    title: data.title,
    serviceType: data.title,
    description:
      "Moisture diagnostics and targeted repairs: flashing corrections, crawlspace moisture control, leak diagnostics, and drainage fixes across Harney County and the Mid-Willamette Valley.",
    seoTitle:
      "Water Intrusion & Moisture Control Oregon | Envelope Diagnostics",
    seoDescription:
      "Moisture diagnostics and targeted repairs: flashing corrections, crawlspace moisture control, leak diagnostics, and drainage fixes across Harney County and the Mid-Willamette Valley.",
    keywords:
      "water intrusion repair Oregon, moisture control contractor, leak diagnostics, window flashing correction, crawlspace moisture control, drainage grading",
  };

  const hero = {
    badge: "Moisture Diagnostics",
    h1: "Water Intrusion, Envelope & Moisture Control",
    subhead: "Identify leak pathways early and fix them before damage spreads.",
    visual: {
      variant: "slate",
      eyebrow: "Moisture Control",
      title: "Leak Pathway Diagnostics",
      subtitle:
        "Flashing corrections, crawlspace moisture control, and documented findings.",
    },
    primaryCtaLabel: "Book a Moisture Assessment",
    primaryCtaHref: "/contact",
  };

  const faqs = [
    {
      question: "What are the early signs of water intrusion?",
      answer:
        "Staining around windows, musty smells, bubbling paint, soft drywall, and persistent condensation are common indicators.",
    },
    {
      question: "Do you handle crawlspace moisture issues?",
      answer:
        "Yes. We inspect ventilation, vapor barriers, grading, and drainage to reduce moisture buildup.",
    },
    {
      question: "Can you fix flashing and window leaks?",
      answer:
        "Yes. We perform targeted flashing corrections and seal failures to prevent repeat leaks.",
    },
    {
      question: "Will you provide a moisture report?",
      answer:
        "Yes. We document findings with photos and recommendations for repair or monitoring.",
    },
    {
      question: "Is this covered by insurance?",
      answer:
        "Most moisture intrusion repairs are preventive and not insurance claims. We can advise if damage qualifies.",
    },
    {
      question: "How long does an assessment take?",
      answer:
        "Most inspections take 1-2 hours depending on access and the number of suspected entry points.",
    },
    {
      question: "Can you coordinate with roofers or plumbers?",
      answer:
        "Yes. We coordinate specialized trades when needed for a complete fix.",
    },
    {
      question: "What is the next step after the assessment?",
      answer:
        "We provide a prioritized scope and recommend the smallest reliable fix first.",
    },
  ];

  const internalLinks = {
    subtitle: "Move from moisture diagnostics to prevention and repair scopes.",
    nextSteps: [
      {
        ...SERVICE_PILLAR_LINKS.water,
        cta: "Stop active intrusion",
      },
      {
        ...SERVICE_PILLAR_LINKS.mold,
        cta: "Address mold risk",
      },
      {
        ...MAINTENANCE_LINKS.home,
        cta: "Prevent repeat issues",
      },
      {
        label: "request a moisture scope",
        to: "/contact",
        description: "Get a documented repair and prevention plan.",
        intent: "contact",
        cta: "Request service",
      },
    ],
    tools: [
      TOP_TOOL_LINKS[2],
      TOP_TOOL_LINKS[0],
      TOP_TOOL_LINKS[1],
      TOOLS_HUB_LINK,
    ],
    guides: [GUIDE_LINKS[3], GUIDE_LINKS[0], GUIDE_LINKS[1]],
    locations: GEO_HUB_LINKS,
  };

  return (
    <NichePageTemplate
      meta={meta}
      hero={hero}
      highlights={[
        "Fast diagnostics with photos and clear recommendations.",
        "Small, targeted scopes with strong long-term reliability.",
        "Documentation for homeowners, property managers, and future resale.",
      ]}
      faqs={faqs}
      menu={data.serviceMenu}
      pricing={data.pricingMatrix}
      internalLinks={internalLinks}
    />
  );
}
