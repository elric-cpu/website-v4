import { describe, expect, it } from "vitest";
import {
  ensureSafeRedirectUrl,
  safeExternalHref,
} from "../../src/lib/security";

describe("security url guards", () => {
  it("rejects javascript URLs", () => {
    expect(safeExternalHref("javascript:alert(1)")).toBeNull();
  });

  it("allows same-origin URLs", () => {
    expect(safeExternalHref("/client-portal")).toBe("/client-portal");
  });

  it("allows allowlisted hosts", () => {
    const url = ensureSafeRedirectUrl("https://checkout.stripe.com/test", {
      allowedHosts: ["checkout.stripe.com"],
      allowSameOrigin: false,
    });
    expect(url).toContain("checkout.stripe.com");
  });
});
