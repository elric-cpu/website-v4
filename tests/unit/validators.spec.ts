import { describe, expect, it } from "vitest";
import {
  isEmail,
  isPhone,
  sanitizeText,
  isStrongPassword,
} from "../../src/lib/validators";

describe("validators", () => {
  it("validates email formats", () => {
    expect(isEmail("a@b.com")).toBe(true);
    expect(isEmail("invalid")).toBe(false);
  });

  it("validates phone formats", () => {
    expect(isPhone("+1 (541) 555-1212")).toBe(true);
    expect(isPhone("abc")).toBe(false);
  });

  it("sanitizes angle brackets", () => {
    expect(sanitizeText("<script>")).toBe("script");
  });

  it("validates strong passwords", () => {
    expect(isStrongPassword("abc12345")).toBe(true);
    expect(isStrongPassword("short1")).toBe(false);
  });
});
