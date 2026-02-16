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

const AnnualHomeMaintenanceBudgetGuide = () => {
  const nextSteps = [
    {
      label: "See our home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Predictable scopes, seasonal visits, and documentation.",
      intent: "subscribe",
    },
    {
      label: "Use the home maintenance estimator",
      to: TOP_TOOL_LINKS[0].to,
      description: "ZIP-adjusted annual budget range in minutes.",
      intent: "estimate",
    },
    {
      label: "Fix inspection items early",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Targeted repairs that protect resale and safety.",
      intent: "service",
    },
    {
      label: "View Mid-Willamette Valley coverage",
      to: GEO_HUB_LINKS[1].to,
      description: "Service area coverage and local response options.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title: "Annual Home Maintenance Budget Guide | Benson Home Solutions",
        description:
          "Plan your annual home maintenance budget with system-by-system ranges, seasonal priorities, and Oregon cost factors.",
        keywords:
          "annual home maintenance budget, home maintenance checklist Oregon, maintenance budget by system",
      }}
      title="Annual Home Maintenance Budget: What to Plan For"
      subtitle="Build a realistic annual budget with seasonal priorities and system-based ranges."
      description="This guide helps Oregon homeowners budget for maintenance, reduce surprises, and plan ahead for repairs."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          An annual maintenance budget keeps small issues from becoming
          expensive repairs. Start with a realistic baseline, then allocate
          additional reserves for older systems or homes with deferred upkeep.
        </p>
        <p>
          If you want a fast estimate, use the{" "}
          <Link to={TOP_TOOL_LINKS[0].to} className="text-maroon font-semibold">
            home maintenance estimator
          </Link>{" "}
          to see ZIP-adjusted ranges for your area.
        </p>

        <h2>Core systems to budget for</h2>
        <ul>
          <li>Roofing, gutters, and exterior drainage</li>
          <li>HVAC tune-ups and filter replacement</li>
          <li>Water heater and plumbing fixtures</li>
          <li>Electrical safety and panel updates</li>
          <li>Interior paint, trim, and finishes</li>
        </ul>

        <h2>How to prioritize if budget is tight</h2>
        <p>
          Start with safety and water risk. Projects that prevent water
          intrusion or correct code issues should come first. That includes leak
          tracing and{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.moisture.to}
            className="text-maroon font-semibold"
          >
            moisture control repairs
          </Link>{" "}
          as well as{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.inspection.to}
            className="text-maroon font-semibold"
          >
            inspection repairs
          </Link>{" "}
          tied to safety or resale.
        </p>

        <h2>Use a program to stay on track</h2>
        <p>
          A structured{" "}
          <Link
            to={MAINTENANCE_LINKS.home.to}
            className="text-maroon font-semibold"
          >
            home maintenance program
          </Link>{" "}
          provides predictable visits, documentation, and follow-up scopes so
          annual budgeting is less reactive.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[0], TOP_TOOL_LINKS[2], TOP_TOOL_LINKS[4]]}
        subtitle="Budgeting and planning tools used by Oregon homeowners."
      />

      <LocationsServedBlock
        links={GEO_HUB_LINKS}
        subtitle="Local service coverage for maintenance planning and repairs."
      />
    </GuideLayout>
  );
};

export default AnnualHomeMaintenanceBudgetGuide;
