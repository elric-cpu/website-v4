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

const CommercialPreventiveMaintenanceEssentialsGuide = () => {
  const nextSteps = [
    {
      label: "Commercial maintenance program",
      to: MAINTENANCE_LINKS.commercial.to,
      description: "Quarterly scopes, logs, and response SLAs.",
      intent: "subscribe",
    },
    {
      label: "Preventive vs reactive ROI",
      to: TOP_TOOL_LINKS[1].to,
      description: "Compare planned work to emergency costs.",
      intent: "compare",
    },
    {
      label: "Inspection repairs support",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Close out punch lists and safety items.",
      intent: "service",
    },
    {
      label: "Mid-Willamette Valley coverage",
      to: GEO_HUB_LINKS[1].to,
      description: "Local response and facilities support.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title:
          "Small Commercial Preventive Maintenance Essentials | Benson Home Solutions",
        description:
          "Essential preventive maintenance priorities for small commercial properties under 50k sq ft in Oregon.",
        keywords:
          "commercial preventive maintenance, facilities maintenance checklist, Oregon facilities maintenance",
      }}
      title="Small Commercial Preventive Maintenance Essentials"
      subtitle="Quarterly priorities for facilities under 50k sq ft."
      description="Reduce emergency repairs, protect budgets, and stay compliant with a structured preventive plan."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Preventive maintenance protects budgets and reduces business
          disruption. Start with life-safety systems, water risk, and HVAC
          performance.
        </p>

        <h2>Quarterly priorities</h2>
        <ul>
          <li>HVAC filter schedules and equipment inspections</li>
          <li>Roof and drainage checks</li>
          <li>Plumbing leak inspections and shutoff verification</li>
          <li>Lighting, egress, and safety signage</li>
        </ul>

        <h2>Documentation matters</h2>
        <p>
          Compliance, insurance, and asset planning all depend on clear logs.
          Our{" "}
          <Link
            to={MAINTENANCE_LINKS.commercial.to}
            className="text-maroon font-semibold"
          >
            commercial maintenance program
          </Link>{" "}
          includes scope documentation and service history.
        </p>

        <h2>Connect maintenance to inspection repairs</h2>
        <p>
          If inspection items are open, schedule{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.inspection.to}
            className="text-maroon font-semibold"
          >
            inspection repairs
          </Link>{" "}
          alongside preventive visits to reduce downtime.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[1], TOP_TOOL_LINKS[4], TOP_TOOL_LINKS[2]]}
        subtitle="Facilities teams use these tools for planning and ROI."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />
    </GuideLayout>
  );
};

export default CommercialPreventiveMaintenanceEssentialsGuide;
