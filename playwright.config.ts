import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";

export default defineConfig({
  testDir: ".",
  testMatch: [
    "e2e/**/*.spec.ts",
    "tests/{a11y,smoke,regression,visual}/**/*.spec.{ts,js}",
  ],
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [["html"], ["json", { outputFile: "test-results.json" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --host 127.0.0.1 --port 3000",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !isCI,
        timeout: 120000,
        env: {
          VITE_SUPABASE_URL: "http://127.0.0.1:54321",
          VITE_SUPABASE_ANON_KEY: "test-anon",
          VITE_WORKER_BASE_URL: "http://127.0.0.1:54321",
          VITE_COMMERCIAL_AGREEMENT_LEAD_ENDPOINT:
            "http://127.0.0.1:54321/lead",
          VITE_ESTIMATOR_LEAD_ENDPOINT: "http://127.0.0.1:54321/lead",
        },
      },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
