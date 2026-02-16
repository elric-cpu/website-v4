import React from "react";
import { Navigate } from "react-router-dom";
import { lazyPage } from "@/lib/lazyLoad";

// Lazy load resource pages - these are content-heavy and only needed when user navigates to them
const Resources = lazyPage(() => import("@/pages/Resources"));
const ResourcesHelp = lazyPage(() => import("@/pages/ResourcesHelp"));
const Sitemap = lazyPage(() => import("@/pages/Sitemap"));
const BathroomRemodelROI = lazyPage(
  () => import("@/pages/resources/BathroomRemodelROI"),
);
const WaterDamageMitigationGuide = lazyPage(
  () => import("@/pages/resources/WaterDamageMitigationGuide"),
);
const KitchenRemodelROI = lazyPage(
  () => import("@/pages/resources/KitchenRemodelROI"),
);
const AgingInPlaceGuide = lazyPage(
  () => import("@/pages/resources/AgingInPlaceGuide"),
);
const HomeMaintenanceEstimator = lazyPage(
  () => import("@/pages/resources/HomeMaintenanceEstimator"),
);
const HomeMaintenanceRecordbook = lazyPage(
  () => import("@/pages/resources/HomeMaintenanceRecordbook"),
);
const HomeRestorationResourceGuide = lazyPage(
  () => import("@/pages/resources/HomeRestorationResourceGuide"),
);
const CalculatorsHub = lazyPage(
  () => import("@/pages/resources/CalculatorsHub"),
);

// Lazy load guides
const AnnualHomeMaintenanceBudgetGuide = lazyPage(
  () => import("@/pages/resources/guides/AnnualHomeMaintenanceBudgetGuide"),
);
const SeasonalMaintenanceChecklistGuide = lazyPage(
  () => import("@/pages/resources/guides/SeasonalMaintenanceChecklistGuide"),
);
const CommercialPreventiveMaintenanceEssentialsGuide = lazyPage(
  () =>
    import("@/pages/resources/guides/CommercialPreventiveMaintenanceEssentialsGuide"),
);
const InspectionReportRepairsGuide = lazyPage(
  () => import("@/pages/resources/guides/InspectionReportRepairsGuide"),
);
const InspectionRepairsCostGuide = lazyPage(
  () => import("@/pages/resources/guides/InspectionRepairsCostGuide"),
);
const SignsOfHiddenWaterDamageGuide = lazyPage(
  () => import("@/pages/resources/guides/SignsOfHiddenWaterDamageGuide"),
);
const MoldWhenToCallAProGuide = lazyPage(
  () => import("@/pages/resources/guides/MoldWhenToCallAProGuide"),
);
const FireSmokeWhatToDoFirstGuide = lazyPage(
  () => import("@/pages/resources/guides/FireSmokeWhatToDoFirstGuide"),
);

// Lazy load calculators - these have complex logic and are heavy
const HVACLoadCalculator = lazyPage(
  () => import("@/pages/resources/calculators/HVACLoadCalculator"),
);
const PreventiveMaintenanceROICalculator = lazyPage(
  () =>
    import("@/pages/resources/calculators/PreventiveMaintenanceROICalculator"),
);
const InstantRepairCostCalculator = lazyPage(
  () => import("@/pages/resources/calculators/InstantRepairCostCalculator"),
);
const EnergySavingsCalculator = lazyPage(
  () => import("@/pages/resources/calculators/EnergySavingsCalculator"),
);
const ACHCalculator = lazyPage(
  () => import("@/pages/resources/calculators/ACHCalculator"),
);
const MaterialsEstimatorCalculator = lazyPage(
  () => import("@/pages/resources/calculators/MaterialsEstimatorCalculator"),
);
const AssetLifecycleCalculator = lazyPage(
  () => import("@/pages/resources/calculators/AssetLifecycleCalculator"),
);
const LaborSavingsCalculator = lazyPage(
  () => import("@/pages/resources/calculators/LaborSavingsCalculator"),
);
const PropertyValueCalculator = lazyPage(
  () => import("@/pages/resources/calculators/PropertyValueCalculator"),
);

// AI workspace - heavy with PDF parsing
const AIEstimatingWorkspace = lazyPage(
  () => import("@/pages/resources/AIEstimatingWorkspace"),
);

export const resourceRoutes = [
  { path: "/resources", element: <Resources /> },
  { path: "/resources-help", element: <ResourcesHelp /> },
  { path: "/sitemap", element: <Sitemap /> },
  { path: "/resources/calculators", element: <CalculatorsHub /> },
  { path: "/resources/bathroom-remodel-roi", element: <BathroomRemodelROI /> },
  {
    path: "/resources/water-damage-restoration-guide",
    element: <WaterDamageMitigationGuide />,
  },
  {
    path: "/resources/water-damage-mitigation-guide",
    element: (
      <Navigate to="/resources/water-damage-restoration-guide" replace />
    ),
  },
  { path: "/resources/kitchen-remodel-roi", element: <KitchenRemodelROI /> },
  {
    path: "/resources/ada-aging-in-place-guide",
    element: <AgingInPlaceGuide />,
  },
  {
    path: "/resources/home-maintenance-estimator",
    element: <HomeMaintenanceEstimator />,
  },
  {
    path: "/resources/home-maintenance-recordbook",
    element: <HomeMaintenanceRecordbook />,
  },
  {
    path: "/resources/home-restoration-resource-guide",
    element: <HomeRestorationResourceGuide />,
  },
  {
    path: "/resources/guides/annual-home-maintenance-budget",
    element: <AnnualHomeMaintenanceBudgetGuide />,
  },
  {
    path: "/resources/guides/seasonal-maintenance-checklist",
    element: <SeasonalMaintenanceChecklistGuide />,
  },
  {
    path: "/resources/guides/commercial-preventive-maintenance-essentials",
    element: <CommercialPreventiveMaintenanceEssentialsGuide />,
  },
  {
    path: "/resources/guides/inspection-report-repairs",
    element: <InspectionReportRepairsGuide />,
  },
  {
    path: "/resources/guides/inspection-repairs-cost-guide",
    element: <InspectionRepairsCostGuide />,
  },
  {
    path: "/resources/guides/signs-of-hidden-water-damage",
    element: <SignsOfHiddenWaterDamageGuide />,
  },
  {
    path: "/resources/guides/mold-when-to-call-a-pro",
    element: <MoldWhenToCallAProGuide />,
  },
  {
    path: "/resources/guides/fire-smoke-what-to-do-first",
    element: <FireSmokeWhatToDoFirstGuide />,
  },
  { path: "/resources/calculators/hvac-load", element: <HVACLoadCalculator /> },
  {
    path: "/resources/calculators/preventive-maintenance-roi",
    element: <PreventiveMaintenanceROICalculator />,
  },
  {
    path: "/resources/calculators/instant-repair-cost",
    element: <InstantRepairCostCalculator />,
  },
  {
    path: "/resources/calculators/energy-savings",
    element: <EnergySavingsCalculator />,
  },
  { path: "/resources/calculators/ach", element: <ACHCalculator /> },
  {
    path: "/resources/calculators/materials-estimator",
    element: <MaterialsEstimatorCalculator />,
  },
  {
    path: "/resources/calculators/asset-lifecycle",
    element: <AssetLifecycleCalculator />,
  },
  {
    path: "/resources/calculators/labor-savings",
    element: <LaborSavingsCalculator />,
  },
  {
    path: "/resources/calculators/property-value-rent",
    element: <PropertyValueCalculator />,
  },
  {
    path: "/resources/ai-estimating-workspace",
    element: <AIEstimatingWorkspace />,
  },
];
