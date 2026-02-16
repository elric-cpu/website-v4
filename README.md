# Benson Estimating Workspace

This repo ships the AI-native estimating workflow for inspection reports. The flow:

1. Upload an inspection PDF.
2. Parse pages into anchored text.
3. Extract task candidates with citations.
4. Ask targeted questions for missing fields.
5. Build line-item estimates with labor + material pricing.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start Supabase locally (requires Supabase CLI):

```bash
supabase start
supabase db reset
```

3. Create the storage bucket (one-time):

```bash
supabase storage create-bucket estimate-documents --public
```

4. Serve Supabase Edge Functions locally:

```bash
supabase functions serve --env-file .env
```

5. Start the Vite app:

```bash
npm run dev
```

Open `http://127.0.0.1:3000/resources/ai-estimating-workspace`.

## AI orchestrator (optional but recommended)

The orchestrator provides extraction and scraping endpoints that the Edge Functions can call.

```bash
cd ai-orchestrator
npm install
npm run dev
```

Set these environment variables (see `.env.example`):

- `ORCHESTRATOR_URL=http://localhost:8787`
- `SCRAPE_PROVIDER_URL=http://localhost:8787`
- `ALLOW_SCRAPE=true` to enable live scraping.

## Pricing sources

Populate pricing sources through one of these:

1. Environment-based scraping:

```
PRICING_SOURCE_URLS=[
  {"source_name":"homewyse","source_url":"https://www.homewyse.com/"},
  {"source_name":"homedepot","source_url":"https://www.homedepot.com/"},
  {"source_name":"lowes","source_url":"https://www.lowes.com/"}
]
```

2. Database sources:

- Insert rows into `estimate_pricing_sources` for each item key.
- The scraping service can be extended to query those URLs directly.

Always confirm the target site’s terms of service and robots policy before enabling scraping.

## Tests

Unit tests:

```bash
npm run test:unit
```

Integration tests (requires local or hosted Supabase with service role key):

```bash
SUPABASE_URL=... SUPABASE_ANON_KEY=... SUPABASE_SERVICE_ROLE_KEY=... npm run test:integration
```

## Key files

- `supabase/migrations/20260204090000_estimating_core.sql`
- `supabase/functions/extract-estimate/index.ts`
- `supabase/functions/price-lookup/index.ts`
- `src/components/estimating/EstimateWorkspace.tsx`
- `src/lib/estimating/estimateApi.ts`
