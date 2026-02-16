import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const parseCsv = (content) => {
  const [headerLine, ...rows] = content.trim().split(/\r?\n/);
  const headers = headerLine.split(",").map((h) => h.trim());
  return rows.filter(Boolean).map((row) => {
    const cols = row.split(",").map((c) => c.trim());
    return headers.reduce((acc, header, idx) => {
      acc[header] = cols[idx] ?? null;
      return acc;
    }, {});
  });
};

const readFile = (filePath) => {
  const absolute = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absolute, "utf8");
  if (filePath.endsWith(".json")) {
    return JSON.parse(content);
  }
  return parseCsv(content);
};

const upsertProductionRates = async (rows) => {
  if (!rows.length) return;
  const normalized = rows.map((row) => ({
    task_key: row.task_key,
    organization_id: row.organization_id || null,
    unit: row.unit || null,
    units_per_hour: row.units_per_hour ? Number(row.units_per_hour) : null,
  }));
  await supabase
    .from("production_rates")
    .upsert(normalized, { onConflict: "task_key" });
};

const upsertLaborCards = async (rows) => {
  if (!rows.length) return;
  const normalized = rows.map((row) => ({
    organization_id: row.organization_id || null,
    trade: row.trade,
    base_rate: row.base_rate ? Number(row.base_rate) : null,
    burden_rate: row.burden_rate ? Number(row.burden_rate) : null,
    overhead_rate: row.overhead_rate ? Number(row.overhead_rate) : null,
    profit_rate: row.profit_rate ? Number(row.profit_rate) : null,
    loaded_rate: row.loaded_rate ? Number(row.loaded_rate) : null,
  }));
  await supabase.from("labor_rate_cards").insert(normalized);
};

const args = process.argv.slice(2);
const ratesIndex = args.indexOf("--rates");
const cardsIndex = args.indexOf("--cards");
const ratesPath = ratesIndex >= 0 ? args[ratesIndex + 1] : null;
const cardsPath = cardsIndex >= 0 ? args[cardsIndex + 1] : null;

if (!ratesPath || !cardsPath) {
  console.log(
    "Usage: node scripts/seed/import-labor-rates.js --rates rates.csv --cards cards.csv",
  );
  process.exit(1);
}

const rates = readFile(ratesPath);
const cards = readFile(cardsPath);

await upsertProductionRates(rates);
await upsertLaborCards(cards);

console.log("Import complete");
