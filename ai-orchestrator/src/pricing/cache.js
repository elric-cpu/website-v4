import { supabaseAdmin } from "../db/supabase.js";

const ttlDays = Number(process.env.PRICING_CACHE_TTL_DAYS || 7);

export const getCachedPrice = async ({
  organizationId,
  itemKey,
  locationZip,
  unit,
}) => {
  const now = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("pricing_cache")
    .select("unit_price, source_meta, expires_at")
    .eq("organization_id", organizationId)
    .eq("item_key", itemKey)
    .eq("location_zip", locationZip)
    .eq("unit", unit)
    .gt("expires_at", now)
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data;
};

export const setCachedPrice = async ({
  organizationId,
  itemKey,
  locationZip,
  unit,
  unitPrice,
  sourceMeta,
}) => {
  const expiresAt = new Date(
    Date.now() + ttlDays * 24 * 60 * 60 * 1000,
  ).toISOString();
  await supabaseAdmin.from("pricing_cache").insert({
    organization_id: organizationId,
    item_key: itemKey,
    location_zip: locationZip,
    unit,
    unit_price: unitPrice,
    source_meta: sourceMeta || {},
    expires_at: expiresAt,
  });
};
