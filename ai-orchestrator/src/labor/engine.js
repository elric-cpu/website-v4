import { supabaseAdmin } from "../db/supabase.js";

const FALLBACK_RATE = 65;

const getProductionRate = async (taskKey) => {
  const { data } = await supabaseAdmin
    .from("production_rates")
    .select("units_per_hour")
    .eq("task_key", taskKey)
    .maybeSingle();
  return data?.units_per_hour ? Number(data.units_per_hour) : null;
};

const getLaborRate = async (trade) => {
  const { data } = await supabaseAdmin
    .from("labor_rate_cards")
    .select("base_rate, burden_rate, overhead_rate, profit_rate, loaded_rate")
    .eq("trade", trade)
    .maybeSingle();

  if (!data) return FALLBACK_RATE;
  if (data.loaded_rate) return Number(data.loaded_rate);

  const base = Number(data.base_rate || FALLBACK_RATE);
  const burden = Number(data.burden_rate || 0);
  const overhead = Number(data.overhead_rate || 0);
  const profit = Number(data.profit_rate || 0);
  return base * (1 + burden + overhead + profit);
};

export const computeLabor = async ({
  taskKey,
  trade,
  quantity,
  modifiers = {},
}) => {
  const rateUnits = await getProductionRate(taskKey);
  const unitsPerHour = rateUnits || 1;
  const baseHours = quantity / unitsPerHour;
  const modifierValues = Object.values(modifiers).filter(
    (value) => typeof value === "number",
  );
  const multiplier = modifierValues.length
    ? modifierValues.reduce((acc, value) => acc * value, 1)
    : 1;
  const totalHours = baseHours * multiplier;
  const loadedRate = await getLaborRate(trade);

  return {
    labor_hours: Number(totalHours.toFixed(2)),
    labor_cost: Number((totalHours * loadedRate).toFixed(2)),
    breakdown: {
      base_hours: Number(baseHours.toFixed(2)),
      multiplier: Number(multiplier.toFixed(2)),
      loaded_rate: Number(loadedRate.toFixed(2)),
    },
  };
};
