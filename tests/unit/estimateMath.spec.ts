import { describe, expect, it } from "vitest";
import {
  applyModifiers,
  calculateLaborHours,
  calculateLineItemTotal,
  calculateMaterialCost,
} from "../../src/lib/estimating/estimateMath";

describe("estimateMath", () => {
  it("applies labor modifiers", () => {
    const adjusted = applyModifiers(10, {
      access: "limited",
      finish: "premium",
      occupancy: "occupied",
    });
    expect(adjusted).toBeGreaterThan(10);
  });

  it("calculates labor hours from production rate", () => {
    const hours = calculateLaborHours(100, 20, {
      access: "standard",
      occupancy: "vacant",
    });
    expect(hours).toBe(5);
  });

  it("calculates material cost", () => {
    expect(calculateMaterialCost(10, 2.5)).toBe(25);
  });

  it("calculates total with markup", () => {
    const total = calculateLineItemTotal({
      materialCost: 100,
      laborCost: 50,
      equipmentCost: 20,
      disposalCost: 10,
      markupPct: 10,
    });
    expect(total).toBe(198);
  });
});
