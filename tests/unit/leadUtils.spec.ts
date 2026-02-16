import { describe, expect, it } from "vitest";
import { sanitizeLeadPayload } from "../../src/lib/leadUtils";

describe("lead utils", () => {
  it("sanitizes lead payload text", () => {
    const payload = sanitizeLeadPayload({ name: "<b>Acme</b>" });
    expect(payload.name).toBe("bAcme/b");
  });

  it("rejects invalid email fields", () => {
    expect(() => sanitizeLeadPayload({ email: "bad-email" })).toThrow();
  });
});
