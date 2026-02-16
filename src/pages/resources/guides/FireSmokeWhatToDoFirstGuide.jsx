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

const FireSmokeWhatToDoFirstGuide = () => {
  const nextSteps = [
    {
      label: "Fire and smoke damage cleanup",
      to: SERVICE_PILLAR_LINKS.fire.to,
      description: "Cleanup, odor control, and repair coordination.",
      intent: "service",
    },
    {
      label: "Inspection repairs",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Scope repairs and close out punch lists.",
      intent: "service",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Prevent future risk with structured maintenance.",
      intent: "subscribe",
    },
    {
      label: "Harney County coverage",
      to: GEO_HUB_LINKS[0].to,
      description: "Local fire and smoke cleanup support.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title:
          "Fire and Smoke Damage: What to Do First | Benson Home Solutions",
        description:
          "Immediate steps after fire or smoke damage, including safety, documentation, and cleanup planning.",
        keywords:
          "fire damage cleanup steps, smoke damage what to do, Oregon fire cleanup",
      }}
      title="Fire and Smoke Damage: What to Do First"
      subtitle="Immediate actions to protect safety and speed recovery."
      description="Use this guide to document damage, reduce risk, and plan cleanup after a fire."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Fire and smoke damage creates safety, structural, and air quality
          risks. The first 24 hours determine how quickly a cleanup and repair
          plan can move forward.
        </p>

        <h2>First steps after a fire</h2>
        <ol>
          <li>Confirm safety and follow local authority guidance.</li>
          <li>Document damage with photos before cleanup.</li>
          <li>Secure the property to prevent further damage.</li>
          <li>Call for professional cleanup and scope documentation.</li>
        </ol>

        <h2>Why documentation matters</h2>
        <p>
          Insurance claims move faster with clear photo logs and written scope.
          Our{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.fire.to}
            className="text-maroon font-semibold"
          >
            fire and smoke damage cleanup
          </Link>{" "}
          service includes documentation and repair coordination.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[2], TOP_TOOL_LINKS[1], TOP_TOOL_LINKS[4]]}
        subtitle="Estimate repair ranges and plan budgets."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />
    </GuideLayout>
  );
};

export default FireSmokeWhatToDoFirstGuide;
