import React from "react";
import LinkGrid from "@/components/internal-links/LinkGrid";

const FeaturedToolsBlock = ({ links, subtitle }) => (
  <LinkGrid
    title="Tools that make planning easier"
    subtitle={subtitle}
    links={links}
  />
);

export default FeaturedToolsBlock;
