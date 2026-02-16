import React from "react";
import ServiceArea from "@/pages/ServiceArea";
import ServiceAreas from "@/pages/ServiceAreas";
import HarneyCountyHub from "@/pages/service-areas/HarneyCountyHub";
import MidWillametteValleyHub from "@/pages/service-areas/MidWillametteValleyHub";

export const serviceAreaRoutes = [
  { path: "/service-areas", element: <ServiceAreas /> },
  { path: "/service-areas/harney-county", element: <HarneyCountyHub /> },
  {
    path: "/service-areas/mid-willamette-valley",
    element: <MidWillametteValleyHub />,
  },
  { path: "/service-areas/:region/:town", element: <ServiceArea /> },
];
