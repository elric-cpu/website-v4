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

const SignsOfHiddenWaterDamageGuide = () => {
  const nextSteps = [
    {
      label: "Water damage restoration",
      to: SERVICE_PILLAR_LINKS.water.to,
      description: "Emergency extraction, drying, and documentation.",
      intent: "service",
    },
    {
      label: "Moisture control repairs",
      to: SERVICE_PILLAR_LINKS.moisture.to,
      description: "Leak diagnostics and envelope fixes.",
      intent: "service",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Prevent recurring leaks and moisture issues.",
      intent: "subscribe",
    },
    {
      label: "Harney County coverage",
      to: GEO_HUB_LINKS[0].to,
      description: "Local response and restoration support.",
      intent: "location",
    },
  ];

  return (
    <GuideLayout
      seo={{
        title: "Signs of Hidden Water Damage | Benson Home Solutions",
        description:
          "Common signs of hidden water damage, how to confirm risk, and when to call for restoration.",
        keywords:
          "hidden water damage signs, water damage symptoms, Oregon water damage restoration",
      }}
      title="Signs of Hidden Water Damage"
      subtitle="Symptoms to watch for and when to call a pro."
      description="Hidden water damage spreads fast. Use these signs to identify risk early."
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Water damage is not always visible. It can travel behind walls or
          under floors before you see staining. Early detection limits damage
          and keeps restoration costs down.
        </p>

        <h2>Common warning signs</h2>
        <ul>
          <li>Musty odors or persistent humidity</li>
          <li>Discolored drywall or bubbling paint</li>
          <li>Warped floors or loose baseboards</li>
          <li>Recurring mold or mildew spots</li>
          <li>Unexplained spikes in water bills</li>
        </ul>

        <h2>What to do next</h2>
        <p>
          If you suspect active moisture, start with{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.moisture.to}
            className="text-maroon font-semibold"
          >
            moisture control
          </Link>{" "}
          or call for{" "}
          <Link
            to={SERVICE_PILLAR_LINKS.water.to}
            className="text-maroon font-semibold"
          >
            water damage restoration
          </Link>{" "}
          when conditions are urgent.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[TOP_TOOL_LINKS[2], TOP_TOOL_LINKS[0], TOP_TOOL_LINKS[4]]}
        subtitle="Estimate repair ranges and plan prevention."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />
    </GuideLayout>
  );
};

export default SignsOfHiddenWaterDamageGuide;
