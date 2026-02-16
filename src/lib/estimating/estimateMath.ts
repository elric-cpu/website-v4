export type LaborModifiers = {
  access?: "standard" | "limited" | "difficult";
  finish?: "basic" | "standard" | "premium";
  occupancy?: "occupied" | "vacant";
  height?: "ground" | "ladder" | "scaffold";
  protection?: "none" | "light" | "heavy";
};

const modifierFactors: Record<string, Record<string, number>> = {
  access: { standard: 1, limited: 1.15, difficult: 1.3 },
  finish: { basic: 0.9, standard: 1, premium: 1.2 },
  occupancy: { occupied: 1.15, vacant: 1 },
  height: { ground: 1, ladder: 1.1, scaffold: 1.25 },
  protection: { none: 1, light: 1.05, heavy: 1.15 },
};

export const applyModifiers = (baseRate: number, modifiers: LaborModifiers) => {
  return (
    Object.entries(modifiers) as Array<[keyof LaborModifiers, string]>
  ).reduce((rate, [key, value]) => {
    if (!value) return rate;
    const factor = modifierFactors[key]?.[value] ?? 1;
    return rate * factor;
  }, baseRate);
};

export const calculateLaborHours = (
  quantity: number,
  baseRate: number,
  modifiers: LaborModifiers,
) => {
  const adjustedRate = applyModifiers(baseRate, modifiers);
  if (adjustedRate <= 0) return 0;
  return Number((quantity / adjustedRate).toFixed(2));
};

export const calculateMaterialCost = (quantity: number, unitPrice: number) => {
  return Number((quantity * unitPrice).toFixed(2));
};

export const calculateLineItemTotal = ({
  materialCost,
  laborCost,
  equipmentCost = 0,
  disposalCost = 0,
  markupPct = 0,
}: {
  materialCost: number;
  laborCost: number;
  equipmentCost?: number;
  disposalCost?: number;
  markupPct?: number;
}) => {
  const subtotal = materialCost + laborCost + equipmentCost + disposalCost;
  const markup = subtotal * (markupPct / 100);
  return Number((subtotal + markup).toFixed(2));
};
