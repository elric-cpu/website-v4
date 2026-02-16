import { test, expect } from "@playwright/test";
import { routes } from "../utils/routes";
import { blockExternal } from "../../e2e/utils";

test.describe("Visual: Key Templates", () => {
  test.beforeEach(async ({ page }) => {
    await blockExternal(page);
  });

  test("home snapshot", async ({ page }) => {
    await page.goto(routes.home);

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Wait for any animations to settle
    await page.waitForTimeout(500);

    // Use a more lenient comparison threshold for CI environments
    await expect(page).toHaveScreenshot("home.png", {
      fullPage: true,
      timeout: 15000,
      // Allow small pixel differences due to font rendering, etc.
      maxDiffPixelRatio: 0.02,
      // Mask dynamic content that may change between runs
      mask: [
        page.locator('[data-testid="dynamic-content"]'),
        page.locator(".animate-spin"),
        page.locator('[class*="animate-"]'),
      ],
    });
  });

  test("services snapshot", async ({ page }) => {
    await page.goto(routes.services);

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Wait for any animations to settle
    await page.waitForTimeout(500);

    // Use a more lenient comparison threshold for CI environments
    await expect(page).toHaveScreenshot("services.png", {
      fullPage: true,
      timeout: 15000,
      // Allow small pixel differences due to font rendering, etc.
      maxDiffPixelRatio: 0.02,
      // Mask dynamic content that may change between runs
      mask: [
        page.locator('[data-testid="dynamic-content"]'),
        page.locator(".animate-spin"),
        page.locator('[class*="animate-"]'),
      ],
    });
  });

  test("contact snapshot", async ({ page }) => {
    await page.goto(routes.contact);

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Wait for any animations to settle
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot("contact.png", {
      fullPage: true,
      timeout: 15000,
      maxDiffPixelRatio: 0.02,
      mask: [
        page.locator('[data-testid="dynamic-content"]'),
        page.locator(".animate-spin"),
        page.locator('[class*="animate-"]'),
      ],
    });
  });
});

// Separate describe block for generating baselines
// Run with: npx playwright test tests/visual --update-snapshots
test.describe("Visual: Baseline Generation Info", () => {
  test.skip("info: run with --update-snapshots to generate baselines", async () => {
    // This test is just informational
    // To generate or update visual baselines, run:
    // npx playwright test tests/visual --update-snapshots --project=chromium
    //
    // Baselines are stored in tests/visual/templates.spec.ts-snapshots/
    // and should be committed to version control
  });
});
