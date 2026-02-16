export const REPAIR_COSTS = {
  ac: {
    label: "Air Conditioning",
    minor: { min: 180, max: 650 },
    standard: { min: 650, max: 1800 },
    major: { min: 1800, max: 5200 },
  },
  furnace: {
    label: "Furnace / Heating",
    minor: { min: 200, max: 700 },
    standard: { min: 700, max: 2000 },
    major: { min: 2000, max: 6000 },
  },
  plumbing: {
    label: "Plumbing",
    minor: { min: 175, max: 600 },
    standard: { min: 600, max: 2500 },
    major: { min: 2500, max: 8000 },
  },
  electrical: {
    label: "Electrical",
    minor: { min: 150, max: 550 },
    standard: { min: 550, max: 2200 },
    major: { min: 2200, max: 6500 },
  },
};

export const MATERIAL_MODELS = {
  paint: {
    label: "Interior Paint",
    unit: "gallon",
    coverageSqFt: 350,
    coats: 2,
    costPerUnit: { budget: 28, standard: 45, premium: 70 },
  },
  drywall: {
    label: "Drywall",
    unit: "sheet",
    sheetSqFt: 32,
    costPerUnit: { budget: 12, standard: 18, premium: 28 },
  },
  flooring: {
    label: "Flooring",
    unit: "sqft",
    costPerUnit: { budget: 2.5, standard: 4.5, premium: 7.5 },
  },
};

export const ASSET_MODELS = {
  hvac: {
    label: "HVAC System",
    baseReplacement: 12000,
    expectedLife: 15,
    recommendedPmRate: 0.04,
  },
  roof: {
    label: "Commercial Roof",
    baseReplacement: 22000,
    expectedLife: 20,
    recommendedPmRate: 0.02,
  },
  generator: {
    label: "Backup Generator",
    baseReplacement: 18000,
    expectedLife: 18,
    recommendedPmRate: 0.05,
  },
};

export const UPGRADE_MODELS = {
  thermostat: { label: "Smart Thermostat", savings: 0.1, cost: 350 },
  hvac_tune: { label: "HVAC Tune-Up", savings: 0.12, cost: 450 },
  led: { label: "LED Lighting Upgrade", savings: 0.18, cost: 1200 },
  air_seal: { label: "Air Sealing + Insulation", savings: 0.2, cost: 3200 },
  automation: { label: "Building Automation", savings: 0.22, cost: 6500 },
};

export const PROPERTY_UPGRADES = {
  paint: { label: "Paint Refresh", rentLift: 0.04, cost: 3500 },
  landscaping: {
    label: "Landscaping / Curb Appeal",
    rentLift: 0.03,
    cost: 2800,
  },
  amenities: { label: "Amenity Upgrade", rentLift: 0.07, cost: 8000 },
  flooring: { label: "Flooring Refresh", rentLift: 0.05, cost: 5200 },
};

export const HVAC_LOAD_BASE = {
  residential: 20,
  commercial: 26,
};

export const INSULATION_FACTORS = {
  poor: 1.18,
  average: 1.0,
  good: 0.88,
};

export const CLIMATE_FACTORS = {
  cold: 1.12,
  mixed: 1.0,
  warm: 1.08,
};
