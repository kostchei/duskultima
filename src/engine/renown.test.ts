import { describe, expect, it } from "vitest";
import { evaluateRenown, initialRenown, renownDelta } from "./renown";

describe("renown module", () => {
  it("initializes renown from CHA modifier", () => {
    expect(initialRenown(2)).toBe(2);
    expect(initialRenown(-1)).toBe(-1);
  });

  it("evaluates renown tiers and bonuses correctly", () => {
    const low = evaluateRenown(2);
    expect(low.tier).toBe("invisible");
    expect(low.carouseBonus).toBe(0);

    const mid = evaluateRenown(5);
    expect(mid.tier).toBe("favorable");
    expect(mid.carouseBonus).toBe(1);

    const high = evaluateRenown(10);
    expect(high.tier).toBe("renowned");
    expect(high.carouseBonus).toBe(2);

    const max = evaluateRenown(14);
    expect(max.tier).toBe("celebrity");
    expect(max.carouseBonus).toBe(3);
  });

  it("calculates renown gain/loss deltas", () => {
    expect(renownDelta("level_up")).toBe(1);
    expect(renownDelta("major_triumph")).toBe(1);
    expect(renownDelta("public_humiliation")).toBe(-1);
    expect(renownDelta("law_run_in")).toBe(-1);
  });
});
