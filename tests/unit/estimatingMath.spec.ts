import { describe, expect, it } from "vitest";
import {
  calculateLineItemTotal,
  calculateLaborHours,
} from "../../src/lib/estimating/estimateMath";

describe("estimating math", () => {
  it("calculates line item total with markup", () => {
    const total = calculateLineItemTotal({
      materialCost: 100,
      laborCost: 50,
      equipmentCost: 10,
      disposalCost: 5,
      markupPct: 20,
    });
    expect(total).toBe(198);
  });

  it("calculates labor hours with quantity and base rate", () => {
    const hours = calculateLaborHours(4, 2, {
      access: "limited",
      finish: "standard",
    });
    expect(hours).toBe(1.74); // 4 / (2 * 1.15) = 1.74
  });

  it("calculates line item total without markup", () => {
    const total = calculateLineItemTotal({
      materialCost: 100,
      laborCost: 50,
    });
    expect(total).toBe(150);
  });
});
