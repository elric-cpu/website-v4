import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const requiredKeys = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "STRIPE_SECRET_KEY",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
];

const loadEnv = () => {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    throw new Error("Missing .env file in project root.");
  }

  const raw = fs.readFileSync(envPath, "utf8");
  const env = {};

  raw.split(/\r?\n/).forEach((line) => {
    if (!line || line.trim().startsWith("#")) return;
    const idx = line.indexOf("=");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) env[key] = value;
  });

  return env;
};

const syncSecret = (key, value) => {
  const result = spawnSync(
    "npx",
    ["wrangler", "secret", "put", key, "--config", "workers/wrangler.toml"],
    {
      input: value,
      stdio: "pipe",
      encoding: "utf8",
    },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || `Failed to sync ${key}`);
  }
};

const main = () => {
  const env = loadEnv();

  requiredKeys.forEach((key) => {
    if (!env[key]) {
      throw new Error(`Missing ${key} in .env`);
    }
  });

  requiredKeys.forEach((key) => {
    syncSecret(key, env[key]);
    console.log(`Synced ${key}`);
  });
};

main();
