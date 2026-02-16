import { describe, expect, it } from "vitest";
import { canAccessRoute, hasRole } from "../../src/lib/permissions";

describe("permissions", () => {
  it("allows admin everywhere", () => {
    expect(canAccessRoute("admin", "/client-portal")).toBe(true);
  });

  it("checks role match", () => {
    expect(hasRole({ user_metadata: { role: "client" } }, "client")).toBe(true);
  });
});
