import React from "react";
import LinkGrid from "@/components/internal-links/LinkGrid";

const RelatedToolsBlock = ({ links, subtitle }) => (
  <LinkGrid
    title="Tools to plan your next step"
    subtitle={subtitle}
    links={links}
  />
);

export default RelatedToolsBlock;
