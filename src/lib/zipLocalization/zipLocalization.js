import {
  getOregonCostFactor,
  getOregonCostRegion,
} from "@/lib/maintenancePlanner/oregonCostFactors";

const BASE_ENERGY_RATE = 0.145;
const BASE_GAS_RATE = 1.55;
const BASE_LABOR_RATE = 85;

const roundTo = (value, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export const inferClimateBand = (zip) => {
  if (!zip || String(zip).length < 1) return "mixed";
  const value = String(zip);
  if (value.startsWith("97") || value.startsWith("98")) return "mixed";
  const first = Number(value[0]);
  if (Number.isNaN(first)) return "mixed";
  if (first <= 2) return "cold";
  if (first <= 6) return "mixed";
  return "warm";
};

export const getOregonDefaults = (zip) => {
  const costFactor = getOregonCostFactor(zip);
  return {
    costFactor,
    regionLabel: getOregonCostRegion(zip),
    climateBand: inferClimateBand(zip),
    energyRate: roundTo(BASE_ENERGY_RATE * costFactor, 3),
    gasRate: roundTo(BASE_GAS_RATE * costFactor, 2),
    laborRate: Math.round(BASE_LABOR_RATE * costFactor),
  };
};

export const getEnergyRateLabel = (rate) =>
  `$${roundTo(rate, 3).toFixed(3)} / kWh`;

export const getLaborRateLabel = (rate) =>
  `$${Math.round(rate).toLocaleString("en-US")} / hr`;
