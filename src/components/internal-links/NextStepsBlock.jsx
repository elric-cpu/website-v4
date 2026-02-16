import React from "react";
import LinkGrid from "@/components/internal-links/LinkGrid";

const NextStepsBlock = ({ links, subtitle }) => (
  <LinkGrid
    title="What to do next"
    subtitle={subtitle}
    links={links}
    columns={2}
  />
);

export default NextStepsBlock;
