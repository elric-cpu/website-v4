import { Page } from "@playwright/test";

export async function blockExternal(page: Page) {
  await page.route("**/*", (route) => {
    const url = route.request().url();
    const allowed =
      url.startsWith("http://127.0.0.1:3000") ||
      url.startsWith("http://localhost:3000") ||
      url.startsWith("http://127.0.0.1:54321") ||
      url.startsWith("data:") ||
      url.startsWith("blob:");
    return allowed ? route.continue() : route.abort();
  });
}

export async function mockSupabase(page: Page, user: any) {
  await page.addInitScript((userData) => {
    const session = {
      access_token: "token",
      refresh_token: "refresh",
      token_type: "bearer",
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      user: userData,
    };
    const storageKeys = ["sb-127-auth-token", "sb-localhost-auth-token"];
    storageKeys.forEach((key) => {
      window.localStorage.setItem(key, JSON.stringify(session));
    });

    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      const url = typeof input === "string" ? input : input.url;
      if (url.includes("/auth/v1/")) {
        if (url.includes("/recover")) {
          return new Response(JSON.stringify({}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        const body = url.includes("/user")
          ? { user: userData }
          : {
              access_token: "token",
              refresh_token: "refresh",
              token_type: "bearer",
              expires_in: 3600,
              user: userData,
            };
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/rest/v1/")) {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return originalFetch(input, init);
    };
  }, user);
}
