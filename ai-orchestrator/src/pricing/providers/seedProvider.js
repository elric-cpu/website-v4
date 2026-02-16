import { supabaseAdmin } from "../../db/supabase.js";

export const getSeedPrice = async ({ itemKey }) => {
  const { data, error } = await supabaseAdmin
    .from("pricing_seed_items")
    .select("base_price, unit, description, trade")
    .eq("item_key", itemKey)
    .maybeSingle();

  if (error || !data) {
    return {
      unit_price: 100,
      unit: "each",
      source_meta: { source: "seed", note: "default fallback" },
    };
  }

  return {
    unit_price: Number(data.base_price),
    unit: data.unit,
    source_meta: { source: "seed", trade: data.trade },
  };
};
