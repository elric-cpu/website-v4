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

const InspectionReportRepairsGuide = () => {
  const nextSteps = [
    {
      label: "Get inspection repairs",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Close out punch lists with clear timelines.",
      intent: "service",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Prevent issues before the next inspection.",
      intent: "subscribe",
    },
    {
      label: "Instant repair cost calculator",
      to: TOP_TOOL_LINKS[2].to,
      description: "Quick ranges for common repair items.",
      intent: "estimate",
    },
    {
      label: "Harney County service area",
      to: GEO_HUB_LINKS[0].to,
      description: "Local response and inspection repair support.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title: "Inspection Report Repairs Guide | Benson Home Solutions",
        description:
          "How to handle inspection report repairs with priority order, documentation tips, and realistic timelines.",
        keywords:
          "inspection report repairs, inspection punch list repairs, home inspection repairs Oregon",
      }}
      title="How to Handle Inspection Report Repairs"
      subtitle="Common items, priorities, and next steps for closing a report."
      description="Use this guide to triage inspection items and keep transactions moving."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Inspection reports often include a mix of safety, water, and code
          items. Start with anything that affects safety or structure, then
          address water intrusion and deferred maintenance.
        </p>

        <h2>Priority order</h2>
        <ol>
          <li>Safety and life-safety items</li>
          <li>Active leaks and moisture risks</li>
          <li>Roofing, flashing, and drainage</li>
          <li>Electrical and plumbing fixes</li>
          <li>Cosmetic or low-risk items</li>
        </ol>

        <h2>Documentation tips</h2>
        <p>
          Keep before-and-after photos and clear scopes. If the issue is water
          related, link repairs to{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.moisture.to}
            className="text-maroon font-semibold"
          >
            moisture control
          </Link>{" "}
          or{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.water.to}
            className="text-maroon font-semibold"
          >
            water damage restoration
          </Link>{" "}
          when needed.
        </p>

        <h2>Prevent repeat issues</h2>
        <p>
          A{" "}
          <Link
            to={MAINTENANCE_LINKS.home.to}
            className="text-maroon font-semibold"
          >
            maintenance subscription for homeowners
          </Link>{" "}
          keeps these items from showing up again on the next inspection.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[2], TOP_TOOL_LINKS[0], TOP_TOOL_LINKS[3]]}
        subtitle="Estimate repair ranges and prioritize scope."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />
    </GuideLayout>
  );
};

export default InspectionReportRepairsGuide;
