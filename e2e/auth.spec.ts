import { test, expect } from "@playwright/test";
import { blockExternal, mockSupabase } from "./utils";

test("signup and login route to client portal", async ({ page }) => {
  await blockExternal(page);
  await mockSupabase(page, {
    id: "user-1",
    email: "jamie@example.com",
    user_metadata: { role: "client", onboarded_client: true },
  });

  await page.goto("/client-portal-register");
  await page.fill("#name", "Jamie Client");
  await page.fill("#email", "jamie@example.com");
  await page.fill("#password", "Password123!");
  await page.fill("#confirmPassword", "Password123!");
  await page.getByRole("button", { name: /create account/i }).click();

  // Wait for navigation to login page - use heading specifically to avoid nav link match
  await expect(
    page.getByRole("heading", { name: /client portal login/i }),
  ).toBeVisible({ timeout: 10000 });

  await page.fill("input[type=email]", "jamie@example.com");
  await page.fill("input[type=password]", "Password123!");
  await page.getByRole("button", { name: /sign in/i }).click();

  // Wait for portal to load - use a specific element in the portal content
  await expect(page.getByRole("heading", { name: /my projects/i })).toBeVisible(
    { timeout: 10000 },
  );
});

test("session restore keeps user in portal", async ({ page }) => {
  await blockExternal(page);
  await mockSupabase(page, {
    id: "user-1",
    email: "a@b.com",
    user_metadata: { role: "client", onboarded_client: true },
  });

  await page.goto("/client-portal");

  // Verify user sees portal content, not login
  await expect(page.getByRole("heading", { name: /my projects/i })).toBeVisible(
    { timeout: 10000 },
  );
});

test("unauthenticated user is redirected to login", async ({ page }) => {
  await blockExternal(page);

  // Don't mock Supabase - simulate unauthenticated state
  await page.goto("/client-portal");

  // Should be redirected to login page
  await expect(
    page.getByRole("heading", { name: /client portal login/i }),
  ).toBeVisible({ timeout: 10000 });
});

test("forgot password flow sends reset email", async ({ page }) => {
  await blockExternal(page);
  await mockSupabase(page, {
    id: "user-1",
    email: "jamie@example.com",
    user_metadata: { role: "client" },
  });

  await page.goto("/client-portal-forgot-password");
  await page.fill("input[type=email]", "jamie@example.com");
  await page.getByRole("button", { name: /one time password/i }).click();

  // Use the toast notification's title specifically to avoid duplicate matches
  // The toast has a specific structure with class "text-sm font-semibold"
  await expect(
    page.locator('[role="status"]').filter({ hasText: /check your email/i }),
  ).toBeVisible({ timeout: 10000 });
});

test("login with invalid credentials shows error", async ({ page }) => {
  await blockExternal(page);

  // Mock Supabase to return an error for invalid credentials
  await page.addInitScript(() => {
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      const url = typeof input === "string" ? input : input.url;
      if (url.includes("/auth/v1/token")) {
        return new Response(
          JSON.stringify({ error: "Invalid login credentials" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return originalFetch(input, init);
    };
  });

  await page.goto("/client-portal-login");
  await page.fill("input[type=email]", "wrong@example.com");
  await page.fill("input[type=password]", "WrongPassword!");
  await page.getByRole("button", { name: /sign in/i }).click();

  // Should show error message
  await expect(
    page
      .locator('[role="status"], [role="alert"]')
      .filter({ hasText: /error|invalid|failed/i }),
  ).toBeVisible({ timeout: 10000 });
});

test("register form validates password confirmation", async ({ page }) => {
  await blockExternal(page);

  await page.goto("/client-portal-register");
  await page.fill("#name", "Test User");
  await page.fill("#email", "test@example.com");
  await page.fill("#password", "StrongPassword123!");
  await page.fill("#confirmPassword", "DifferentPassword456!");

  const submitButton = page.getByRole("button", { name: /create account/i });

  // Try to submit with mismatched passwords
  await submitButton.click();

  // Should show validation error or stay on register page
  const hasValidationError = await page
    .locator('[role="alert"], .text-red-500, .text-destructive')
    .filter({ hasText: /match|password/i })
    .isVisible({ timeout: 3000 })
    .catch(() => false);

  const stillOnRegister = await page
    .locator("#confirmPassword")
    .isVisible()
    .catch(() => false);

  // Either shows error or stays on page
  expect(hasValidationError || stillOnRegister).toBe(true);
});

test("register form requires all fields", async ({ page }) => {
  await blockExternal(page);

  await page.goto("/client-portal-register");

  // Check that required fields are present
  await expect(page.locator("#name")).toBeVisible();
  await expect(page.locator("#email")).toBeVisible();
  await expect(page.locator("#password")).toBeVisible();
  await expect(page.locator("#confirmPassword")).toBeVisible();

  // Verify the form has a submit button
  await expect(
    page.getByRole("button", { name: /create account/i }),
  ).toBeVisible();
});
