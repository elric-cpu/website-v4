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

export default function InsuranceAdjacent() {
  const data = NICHE_MENUS.insurance_adjacent;

  const meta = {
    title: "Insurance Claims Repairs",
    serviceType: "Insurance Claims Repairs",
    description:
      "Partial dry-outs, post-leak rebuilds, small mold remediation, and documentation support for denied or partial claims.",
    seoTitle:
      "Insurance Claims Repairs Oregon | Post-Leak Rebuilds & Documentation",
    seoDescription:
      "Partial dry-outs, post-leak rebuilds, small mold remediation, and documentation support for denied or partial claims.",
    keywords:
      "insurance claims repairs Oregon, post leak rebuild, insurance denied repairs, claim documentation support, small mold remediation, water damage repair",
  };

  const hero = {
    badge: "Documentation Support",
    h1: "Insurance Claims Repairs",
    subhead:
      "Targeted repairs and documentation support when claims are partial, delayed, or denied.",
    visual: {
      variant: "ink",
      eyebrow: "Claims Support",
      title: "Scope + Documentation",
      subtitle:
        "Photo logs, moisture data, and repair scopes that support claim clarity.",
    },
    primaryCtaLabel: "Get a Triage Quote",
    primaryCtaHref: "/contact",
  };

  const faqs = [
    {
      question: "What does insurance claims repairs cover?",
      answer:
        "We handle repairs that fall outside or after an insurance claim—partial approvals, denied claims, or small scopes.",
    },
    {
      question: "Can you help with documentation for my claim?",
      answer:
        "Yes. We provide photos, moisture logs, and scope documentation that can support claim discussions.",
    },
    {
      question: "Do you handle post-leak rebuilds?",
      answer:
        "Yes. We repair drywall, flooring, trim, and finishes after the drying phase is complete.",
    },
    {
      question: "Will you coordinate with my adjuster?",
      answer:
        "We can communicate with adjusters to clarify scope, but final coverage decisions are made by the insurer.",
    },
    {
      question: "What if the claim is denied?",
      answer:
        "We can still complete the repair with a clear, homeowner-funded scope and fair pricing.",
    },
    {
      question: "Do you provide mold remediation for small areas?",
      answer:
        "Yes. We handle small, contained remediation projects and recommend specialists for large-scale issues.",
    },
    {
      question: "How fast can you start?",
      answer:
        "Most small scopes can start within 1-2 weeks depending on materials and scheduling.",
    },
    {
      question: "What is the first step?",
      answer:
        "Contact us for a triage walkthrough and we will outline the smallest reliable fix.",
    },
  ];

  const internalLinks = {
    subtitle: "Clarify scope, document repairs, and resolve coverage gaps.",
    nextSteps: [
      {
        ...SERVICE_PILLAR_LINKS.water,
        cta: "Mitigate water damage",
      },
      {
        ...SERVICE_PILLAR_LINKS.mold,
        cta: "Address mold risk",
      },
      {
        ...SERVICE_PILLAR_LINKS.inspection,
        cta: "Close repair items",
      },
      {
        label: "request claim support",
        to: "/contact",
        description: "Get documentation-ready scopes and photo logs.",
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
    guides: [GUIDE_LINKS[3], GUIDE_LINKS[2], GUIDE_LINKS[0]],
    locations: GEO_HUB_LINKS,
  };

  return (
    <NichePageTemplate
      meta={meta}
      hero={hero}
      highlights={[
        "Fast response and clear documentation for next steps.",
        "Capture both insurance-paid and homeowner-pay portions cleanly.",
        "Small scopes executed to code with a professional closeout.",
      ]}
      faqs={faqs}
      menu={data.serviceMenu}
      pricing={data.pricingMatrix}
      internalLinks={internalLinks}
    />
  );
}
