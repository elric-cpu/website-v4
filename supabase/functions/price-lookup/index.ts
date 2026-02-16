import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { getSupabaseClient } from "../_shared/supabase.ts";
import {
  fetchScrapedPrice,
  getCachedPrice,
  getSeedPrice,
  upsertCache,
} from "../_shared/pricing.ts";

Deno.serve(async (request) => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  try {
    const payload = await request.json();
    const {
      item_key,
      location_zip = null,
      unit = null,
      quantity = 1,
    } = payload;

    if (!item_key) {
      return new Response(JSON.stringify({ error: "Missing item_key." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing auth token." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cached = await getCachedPrice(
      supabaseUrl,
      supabaseAnonKey,
      token,
      item_key,
      location_zip,
      unit,
    );

    if (cached) {
      return new Response(
        JSON.stringify({
          unit_price: cached.unit_price,
          unit: cached.unit,
          source_meta: cached.source_meta,
          extended_price: Number(cached.unit_price) * Number(quantity),
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const seed = await getSeedPrice({
      itemKey: item_key,
      locationZip: location_zip,
      unit,
    });
    if (seed) {
      await upsertCache(
        supabaseUrl,
        supabaseAnonKey,
        token,
        item_key,
        location_zip,
        seed.unit,
        seed.unit_price,
        seed.source_meta,
      );
      return new Response(
        JSON.stringify({
          unit_price: seed.unit_price,
          unit: seed.unit,
          source_meta: seed.source_meta,
          extended_price: Number(seed.unit_price) * Number(quantity),
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const scraped = await fetchScrapedPrice(item_key, location_zip, unit);
    if (scraped?.unit_price) {
      await upsertCache(
        supabaseUrl,
        supabaseAnonKey,
        token,
        item_key,
        location_zip,
        scraped.unit || unit || "ea",
        scraped.unit_price,
        scraped.source_meta || { provider: "scrape" },
      );

      return new Response(
        JSON.stringify({
          unit_price: scraped.unit_price,
          unit: scraped.unit || unit || "ea",
          source_meta: scraped.source_meta,
          extended_price: Number(scraped.unit_price) * Number(quantity),
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({ error: "No pricing available for item." }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
