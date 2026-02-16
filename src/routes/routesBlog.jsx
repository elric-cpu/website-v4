import React from "react";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import WaterDamageInsuranceOregon from "@/pages/blog/WaterDamageInsuranceOregon";
import HiddenWaterDamageSigns from "@/pages/blog/HiddenWaterDamageSigns";

export const blogRoutes = [
  { path: "/blog", element: <Blog /> },
  {
    path: "/blog/water-damage-insurance-oregon",
    element: <WaterDamageInsuranceOregon />,
  },
  {
    path: "/blog/hidden-water-damage-signs",
    element: <HiddenWaterDamageSigns />,
  },
  { path: "/blog/:slug", element: <BlogPost /> },
];
