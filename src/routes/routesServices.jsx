import React from "react";
import { Navigate } from "react-router-dom";
import ServicesOverview from "@/pages/ServicesOverview";
import WaterDamageMitigation from "@/pages/services/WaterDamageMitigation";
import MoldRemediation from "@/pages/services/MoldRemediation";
import FireSmokeDamage from "@/pages/services/FireSmokeDamage";
import BathroomRemodels from "@/pages/services/BathroomRemodels";
import KitchenRemodels from "@/pages/services/KitchenRemodels";
import GeneralContracting from "@/pages/services/GeneralContracting";
import ResidentialMaintenancePrograms from "@/pages/services/residential/ResidentialMaintenancePrograms";
import MoistureEnvelope from "@/pages/services/niches/MoistureEnvelope";
import AgingInPlace from "@/pages/services/niches/AgingInPlace";
import InsuranceAdjacent from "@/pages/services/niches/InsuranceAdjacent";
import EnergyComfort from "@/pages/services/niches/EnergyComfort";
import CommercialMaintenance from "@/pages/services/commercial/CommercialMaintenance";
import TenantTurns from "@/pages/services/commercial/TenantTurns";
import PreventiveMaintenance from "@/pages/services/commercial/PreventiveMaintenance";
import EmergencyRepairs from "@/pages/services/commercial/EmergencyRepairs";
import ADACompliance from "@/pages/services/commercial/ADACompliance";
import CommercialServiceAgreements from "@/pages/services/commercial/CommercialServiceAgreements";

export const serviceRoutes = [
  { path: "/services", element: <ServicesOverview /> },
  { path: "/water-damage-restoration", element: <WaterDamageMitigation /> },
  { path: "/mold-remediation", element: <MoldRemediation /> },
  { path: "/fire-smoke-damage", element: <FireSmokeDamage /> },
  { path: "/bathroom-remodels", element: <BathroomRemodels /> },
  { path: "/kitchen-remodels", element: <KitchenRemodels /> },
  { path: "/inspection-repairs", element: <GeneralContracting /> },
  { path: "/maintenance-plans", element: <ResidentialMaintenancePrograms /> },
  { path: "/moisture-control", element: <MoistureEnvelope /> },
  { path: "/accessibility-retrofits", element: <AgingInPlace /> },
  { path: "/insurance-claims-repairs", element: <InsuranceAdjacent /> },
  { path: "/energy-comfort-retrofits", element: <EnergyComfort /> },
  { path: "/commercial-maintenance", element: <CommercialMaintenance /> },
  { path: "/commercial/tenant-turns", element: <TenantTurns /> },
  {
    path: "/commercial/preventive-maintenance",
    element: <PreventiveMaintenance />,
  },
  { path: "/commercial/emergency-repairs", element: <EmergencyRepairs /> },
  { path: "/commercial/ada-compliance", element: <ADACompliance /> },
  {
    path: "/commercial-service-agreements",
    element: <CommercialServiceAgreements />,
  },
  {
    path: "/services/water-damage-mitigation",
    element: <Navigate to="/water-damage-restoration" replace />,
  },
  {
    path: "/services/mold-remediation",
    element: <Navigate to="/mold-remediation" replace />,
  },
  {
    path: "/services/fire-smoke-damage",
    element: <Navigate to="/fire-smoke-damage" replace />,
  },
  {
    path: "/services/bathroom-remodels",
    element: <Navigate to="/bathroom-remodels" replace />,
  },
  {
    path: "/services/kitchen-remodels",
    element: <Navigate to="/kitchen-remodels" replace />,
  },
  {
    path: "/services/general-contracting",
    element: <Navigate to="/inspection-repairs" replace />,
  },
  {
    path: "/services/residential-maintenance",
    element: <Navigate to="/maintenance-plans" replace />,
  },
  {
    path: "/services/moisture-envelope",
    element: <Navigate to="/moisture-control" replace />,
  },
  {
    path: "/services/aging-in-place",
    element: <Navigate to="/accessibility-retrofits" replace />,
  },
  {
    path: "/services/insurance-adjacent",
    element: <Navigate to="/insurance-claims-repairs" replace />,
  },
  {
    path: "/services/energy-comfort",
    element: <Navigate to="/energy-comfort-retrofits" replace />,
  },
  {
    path: "/services/commercial",
    element: <Navigate to="/commercial-maintenance" replace />,
  },
  {
    path: "/services/commercial/tenant-turns",
    element: <Navigate to="/commercial/tenant-turns" replace />,
  },
  {
    path: "/services/commercial/preventive-maintenance",
    element: <Navigate to="/commercial/preventive-maintenance" replace />,
  },
  {
    path: "/services/commercial/emergency-repairs",
    element: <Navigate to="/commercial/emergency-repairs" replace />,
  },
  {
    path: "/services/commercial/ada-compliance",
    element: <Navigate to="/commercial/ada-compliance" replace />,
  },
  {
    path: "/services/commercial/service-agreements",
    element: <Navigate to="/commercial-service-agreements" replace />,
  },
];
