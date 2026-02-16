import React from "react";
import LinkGrid from "@/components/internal-links/LinkGrid";

const LocationsServedBlock = ({ links, subtitle }) => (
  <LinkGrid
    title="Locations we serve"
    subtitle={subtitle}
    links={links}
    columns={2}
  />
);

export default LocationsServedBlock;
