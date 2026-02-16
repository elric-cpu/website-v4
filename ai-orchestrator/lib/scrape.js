import * as cheerio from "cheerio";

const parseJsonLd = (html) => {
  const $ = cheerio.load(html);
  const scripts = $('script[type="application/ld+json"]');
  const values = [];

  scripts.each((_, el) => {
    const text = $(el).contents().text();
    if (!text) return;
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        values.push(...parsed);
      } else {
        values.push(parsed);
      }
    } catch {
      // ignore invalid JSON-LD
    }
  });

  return values;
};

const extractPriceFromJsonLd = (entries) => {
  for (const entry of entries) {
    const offers = entry?.offers;
    if (!offers) continue;
    const offerList = Array.isArray(offers) ? offers : [offers];
    for (const offer of offerList) {
      const price = Number(offer?.price ?? offer?.lowPrice ?? offer?.highPrice);
      if (!Number.isNaN(price) && price > 0) {
        return price;
      }
    }
  }
  return null;
};

const extractPriceFromMeta = (html) => {
  const $ = cheerio.load(html);
  const metaValue =
    $('meta[property="product:price:amount"]').attr("content") ||
    $('meta[name="twitter:data1"]').attr("content");
  const price = Number(String(metaValue || "").replace(/[^0-9.]/g, ""));
  return Number.isNaN(price) ? null : price;
};

const getSourcesFromEnv = () => {
  const raw = process.env.PRICING_SOURCE_URLS;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const scrapePricing = async ({
  item_key,
  location_zip,
  unit,
  sources,
}) => {
  const sourceList =
    sources && Array.isArray(sources) ? sources : getSourcesFromEnv();
  if (!item_key || sourceList.length === 0) {
    return { error: "No sources configured." };
  }

  for (const source of sourceList) {
    if (!source?.source_url) continue;

    const response = await fetch(source.source_url, {
      headers: { "User-Agent": "BensonEstimatingBot/1.0" },
    });

    if (!response.ok) continue;
    const html = await response.text();
    const jsonLd = parseJsonLd(html);
    const price = extractPriceFromJsonLd(jsonLd) ?? extractPriceFromMeta(html);

    if (price) {
      return {
        item_key,
        unit_price: price,
        unit: unit || "ea",
        source_meta: {
          provider: "scrape",
          source_name: source.source_name || "unknown",
          url: source.source_url,
          location_zip,
          scraped_at: new Date().toISOString(),
        },
      };
    }
  }

  return { error: "No price detected from sources." };
};
