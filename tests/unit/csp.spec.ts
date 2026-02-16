import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("CSP meta", () => {
  it("includes a Content-Security-Policy meta tag", () => {
    const html = fs.readFileSync(
      path.resolve(process.cwd(), "index.html"),
      "utf-8",
    );
    expect(html).toContain("Content-Security-Policy");
    expect(html).toContain("default-src");
  });
});
