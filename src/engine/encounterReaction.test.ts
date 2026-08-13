import { describe, expect, it } from "vitest";
import { Dice } from "./dice";
import { rollActivity, rollDistance, rollReaction } from "./encounterReaction";

describe("wandering encounter tables", () => {
  it("returns only source-defined activities, distances, and reactions", () => {
    const dice = new Dice(12);
    expect(["eating", "guarding", "sleeping", "building", "hunting", "socializing"]).toContain(rollActivity(dice));
    expect(["close", "near", "far"]).toContain(rollDistance(dice));
    expect(["hostile", "suspicious", "neutral", "curious", "friendly"]).toContain(rollReaction(dice));
  });
});
