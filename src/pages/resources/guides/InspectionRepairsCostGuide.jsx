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

const InspectionRepairsCostGuide = () => {
  const nextSteps = [
    {
      label: "Schedule inspection repairs",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Clear timelines and documented scopes.",
      intent: "service",
    },
    {
      label: "Instant repair cost calculator",
      to: TOP_TOOL_LINKS[2].to,
      description: "ZIP-adjusted ranges for common repairs.",
      intent: "estimate",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Prevent repeat inspection findings.",
      intent: "subscribe",
    },
    {
      label: "Mid-Willamette Valley coverage",
      to: GEO_HUB_LINKS[1].to,
      description: "Local inspection repair coverage.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title: "Inspection Repairs Cost Guide | Benson Home Solutions",
        description:
          "Typical inspection repair cost ranges by system, with planning tips and Oregon cost factors.",
        keywords:
          "inspection repairs cost, inspection report repair pricing, Oregon inspection repairs",
      }}
      title="Inspection Repairs Cost Guide (Typical Ranges)"
      subtitle="Budget ranges by system to help you plan inspection repairs."
      description="This guide helps you estimate repair ranges for the most common inspection findings."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Inspection repair pricing varies by system, access, and damage
          severity. Use these ranges to plan, then confirm scope with a licensed
          contractor.
        </p>

        <h2>Typical system ranges</h2>
        <ul>
          <li>Roof and flashing repairs</li>
          <li>Plumbing fixture and supply line fixes</li>
          <li>Electrical panel and outlet corrections</li>
          <li>HVAC tune-ups and safety items</li>
          <li>Dry rot and moisture corrections</li>
        </ul>

        <p>
          For ZIP-adjusted estimates, run the{" "}
          <Link to={TOP_TOOL_LINKS[2].to} className="text-maroon font-semibold">
            instant repair cost calculator
          </Link>{" "}
          or the{" "}
          <Link to={TOP_TOOL_LINKS[0].to} className="text-maroon font-semibold">
            home maintenance estimator
          </Link>
          .
        </p>

        <h2>Use maintenance to keep costs down</h2>
        <p>
          A{" "}
          <Link
            to={MAINTENANCE_LINKS.home.to}
            className="text-maroon font-semibold"
          >
            home maintenance program
          </Link>{" "}
          helps reduce recurring inspection findings and spreads costs across
          the year.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[2], TOP_TOOL_LINKS[0], TOP_TOOL_LINKS[3]]}
        subtitle="Estimate ranges and prepare a repair budget."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />
    </GuideLayout>
  );
};

export default InspectionRepairsCostGuide;
