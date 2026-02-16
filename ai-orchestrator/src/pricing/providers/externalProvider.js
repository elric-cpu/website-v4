const apiUrl = process.env.PRICING_API_URL;
const apiKey = process.env.PRICING_API_KEY;

export const getExternalPrice = async ({
  locationZip,
  itemKey,
  quantity,
  unit,
}) => {
  if (!apiUrl || !apiKey) {
    return null;
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, "")}/price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      location_zip: locationZip,
      item_key: itemKey,
      quantity,
      unit,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (typeof data?.unit_price !== "number") {
    return null;
  }

  return {
    unit_price: data.unit_price,
    source_meta: data.source_meta || { source: "external" },
  };
};
