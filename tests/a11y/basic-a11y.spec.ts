import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "../utils/routes";
import { blockExternal } from "../../e2e/utils";

test.describe("A11y: Core Pages", () => {
  const runA11y = async (page, options) => {
    const builder = new AxeBuilder({ page });
    if (options) {
      builder.options(options);
    }
    const results = await builder.analyze();
    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  };

  test("home", async ({ page }) => {
    await blockExternal(page);
    await page.goto(routes.home);
    await runA11y(page, { rules: { "color-contrast": { enabled: true } } });
  });

  test("services", async ({ page }) => {
    await blockExternal(page);
    await page.goto(routes.services);
    await runA11y(page);
  });

  test("contact", async ({ page }) => {
    await blockExternal(page);
    await page.goto(routes.contact);
    await runA11y(page);
  });

  test("keyboard smoke path", async ({ page }) => {
    await blockExternal(page);
    await page.goto(routes.contact);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const activeTag = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(activeTag).not.toBe("BODY");
  });
});
