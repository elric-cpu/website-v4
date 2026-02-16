import React from "react";
import { Link } from "react-router-dom";
import GuideLayout from "@/components/resources/GuideLayout";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
} from "@/data/internalLinks";

const MoldWhenToCallAProGuide = () => {
  const nextSteps = [
    {
      label: "Mold remediation service",
      to: SERVICE_PILLAR_LINKS.mold.to,
      description: "Containment, removal, and prevention.",
      intent: "service",
    },
    {
      label: "Moisture control repairs",
      to: SERVICE_PILLAR_LINKS.moisture.to,
      description: "Fix the root cause of mold growth.",
      intent: "service",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Prevent moisture recurrence.",
      intent: "subscribe",
    },
    {
      label: "Mid-Willamette Valley coverage",
      to: GEO_HUB_LINKS[1].to,
      description: "Local mold response and prevention.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title: "Mold: When to Call a Pro | Benson Home Solutions",
        description:
          "Learn when DIY mold cleanup is safe and when to hire a professional for remediation.",
        keywords:
          "mold remediation Oregon, mold cleanup tips, when to call mold professional",
      }}
      title="Mold: When You Need a Pro vs When You Do Not"
      subtitle="A practical guide to safe cleanup and escalation."
      description="Use this guide to decide when DIY cleanup is appropriate and when professional remediation is required."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Mold requires moisture, organic material, and time. Small areas may be
          manageable, but widespread growth or hidden moisture should be handled
          by professionals.
        </p>

        <h2>DIY is usually safe when</h2>
        <ul>
          <li>The affected area is under 10 square feet</li>
          <li>You can fix the moisture source immediately</li>
          <li>No HVAC or crawlspace contamination is present</li>
        </ul>

        <h2>Call a professional when</h2>
        <ul>
          <li>Growth exceeds 10 square feet</li>
          <li>There is a musty odor without visible mold</li>
          <li>HVAC systems or insulation are affected</li>
          <li>Moisture is recurring or hidden</li>
        </ul>

        <p>
          If moisture is the root cause, start with{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.moisture.to}
            className="text-maroon font-semibold"
          >
            moisture control repairs
          </Link>{" "}
          or book a{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.mold.to}
            className="text-maroon font-semibold"
          >
            mold remediation
          </Link>{" "}
          assessment.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[0], TOP_TOOL_LINKS[2], TOP_TOOL_LINKS[4]]}
        subtitle="Estimate repair ranges and plan prevention."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />
    </GuideLayout>
  );
};

export default MoldWhenToCallAProGuide;
