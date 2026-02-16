import React from "react";
import LinkGrid from "@/components/internal-links/LinkGrid";

const RelatedGuidesBlock = ({ links, subtitle }) => (
  <LinkGrid title="Related guides" subtitle={subtitle} links={links} />
);

export default RelatedGuidesBlock;
