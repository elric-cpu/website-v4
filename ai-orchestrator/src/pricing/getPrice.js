import { getCachedPrice, setCachedPrice } from "./cache.js";
import { getSeedPrice } from "./providers/seedProvider.js";
import { getExternalPrice } from "./providers/externalProvider.js";

export const getPrice = async ({
  organizationId,
  itemKey,
  locationZip,
  quantity,
  unit,
}) => {
  const cached = await getCachedPrice({
    organizationId,
    itemKey,
    locationZip,
    unit,
  });
  if (cached) {
    return {
      unit_price: Number(cached.unit_price),
      source_meta: cached.source_meta || { source: "cache" },
    };
  }

  const external = await getExternalPrice({
    locationZip,
    itemKey,
    quantity,
    unit,
  });
  if (external) {
    await setCachedPrice({
      organizationId,
      itemKey,
      locationZip,
      unit,
      unitPrice: external.unit_price,
      sourceMeta: external.source_meta,
    });
    return external;
  }

  const seed = await getSeedPrice({ itemKey });
  await setCachedPrice({
    organizationId,
    itemKey,
    locationZip,
    unit,
    unitPrice: seed.unit_price,
    sourceMeta: seed.source_meta,
  });

  return seed;
};
