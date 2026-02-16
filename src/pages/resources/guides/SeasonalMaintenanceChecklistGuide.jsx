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

const SeasonalMaintenanceChecklistGuide = () => {
  const nextSteps = [
    {
      label: "See our home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Recurring seasonal visits and documentation.",
      intent: "subscribe",
    },
    {
      label: "Plan with the maintenance estimator",
      to: TOP_TOOL_LINKS[0].to,
      description: "ZIP-adjusted annual range and priorities.",
      intent: "estimate",
    },
    {
      label: "Inspection repairs help",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Fix common inspection items before listing.",
      intent: "service",
    },
    {
      label: "Harney County coverage",
      to: GEO_HUB_LINKS[0].to,
      description: "Local service area and response options.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title: "Seasonal Home Maintenance Checklist | Benson Home Solutions",
        description:
          "Seasonal maintenance checklist for Oregon homes, organized by spring, summer, fall, and winter priorities.",
        keywords:
          "seasonal maintenance checklist, spring home maintenance, fall home maintenance, Oregon home upkeep",
      }}
      title="Seasonal Maintenance Checklist (Spring, Summer, Fall, Winter)"
      subtitle="Season-by-season checklist for Oregon homes."
      description="Use this checklist to plan inspections, prevent damage, and spread costs throughout the year."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Seasonal maintenance spreads costs and prevents emergency repairs.
          Focus on water control, HVAC performance, and safety items each
          quarter.
        </p>

        <h2>Spring checklist</h2>
        <ul>
          <li>Gutter clean-out and downspout testing</li>
          <li>Roof and flashing inspection</li>
          <li>HVAC tune-up and filter replacement</li>
        </ul>

        <h2>Summer checklist</h2>
        <ul>
          <li>Exterior caulk and paint touch-ups</li>
          <li>Window and door weatherstripping</li>
          <li>Moisture checks in crawlspaces</li>
        </ul>

        <h2>Fall checklist</h2>
        <ul>
          <li>Heating system inspection</li>
          <li>Chimney and flue review</li>
          <li>Drainage and grading checks</li>
        </ul>

        <h2>Winter checklist</h2>
        <ul>
          <li>Freeze protection for exposed plumbing</li>
          <li>Attic insulation review</li>
          <li>Emergency supplies and shutoff locations</li>
        </ul>

        <p>
          If you want a structured calendar, a{" "}
          <Link
            to={MAINTENANCE_LINKS.home.to}
            className="text-maroon font-semibold"
          >
            maintenance subscription for homeowners
          </Link>{" "}
          keeps those tasks on schedule.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[0], TOP_TOOL_LINKS[2], TOP_TOOL_LINKS[3]]}
        subtitle="Budget and plan seasonal work with these tools."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />
    </GuideLayout>
  );
};

export default SeasonalMaintenanceChecklistGuide;
