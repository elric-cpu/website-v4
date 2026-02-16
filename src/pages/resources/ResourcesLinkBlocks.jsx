import React from "react";
import LinkGrid from "@/components/internal-links/LinkGrid";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";

const ResourcesLinkBlocks = ({
  toolDirectoryLinks,
  resourceLibraryLinks,
  serviceDirectoryLinks,
  blogLinks,
  nextSteps,
  geoHubLinks,
}) => (
  <section className="bg-white border border-gray-200 rounded-xl p-8 space-y-10">
    <LinkGrid
      title="Tools directory"
      subtitle="Every calculator and estimator in one place."
      links={toolDirectoryLinks}
      columns={3}
    />
    <LinkGrid
      title="Resource library"
      subtitle="Downloads and reference guides for Oregon owners."
      links={resourceLibraryLinks}
      columns={3}
    />
    <LinkGrid
      title="Service pathways"
      subtitle="Connect resources to the right service team."
      links={serviceDirectoryLinks}
      columns={3}
    />
    <LinkGrid
      title="Latest insights"
      subtitle="Recent guidance from our restoration team."
      links={blogLinks}
      columns={2}
    />
    <NextStepsBlock
      links={nextSteps}
      subtitle="Use these resources to choose the right service or maintenance plan."
    />
    <LocationsServedBlock links={geoHubLinks} />
  </section>
);

export default ResourcesLinkBlocks;
