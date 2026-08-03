import { describe, expect, it } from "vitest";
import { item } from "../src/data/items";

describe("Scimitar of Speed (+1)", () => {
  it("should have correct item attributes, finesse, +1 magic bonus, and benefits", () => {
    const scimitar = item("scimitar-of-speed");
    expect(scimitar).toBeDefined();
    expect(scimitar.name).toBe("Scimitar of Speed (+1)");
    expect(scimitar.magicBonus).toBe(1);
    expect(scimitar.damage).toBe("1d6");
    expect(scimitar.finesse).toBe(true);
    expect(scimitar.benefits).toBeDefined();
    expect(scimitar.benefits?.some((b) => b.includes("First Strike"))).toBe(true);
    expect(scimitar.benefits?.some((b) => b.includes("Flurry"))).toBe(true);
  });
});
