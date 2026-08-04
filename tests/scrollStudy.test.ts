import { describe, expect, it } from "vitest";
import {
  SCROLL_LEARNING_DC,
  studyableScrolls,
  type ScrollCandidate,
} from "../src/engine/downtime";

const scroll = (
  itemId: string,
  spellId: string,
  spellTier: number,
  spellClasses: readonly string[],
): ScrollCandidate => ({
  itemId,
  scrollName: `Scroll of ${spellId}`,
  spellId,
  spellName: spellId,
  spellTier,
  spellClasses,
});

const wizard = {
  castStat: "INT" as const,
  className: "wizard",
  maximumTier: 2,
  knownSpellIds: ["magic-missile"],
};

describe("studying a scroll at rest", () => {
  it("uses a DC of 15", () => {
    expect(SCROLL_LEARNING_DC).toBe(15);
  });

  it("offers a scroll on the caster's own list within their tier", () => {
    const offered = studyableScrolls([scroll("s1", "light", 1, ["wizard"])], wizard);
    expect(offered).toEqual([
      { itemId: "s1", scrollName: "Scroll of light", spellId: "light", spellName: "light", spellTier: 1 },
    ]);
  });

  it("offers nothing to a character with no casting stat", () => {
    const offered = studyableScrolls([scroll("s1", "light", 1, ["wizard"])], {
      ...wizard,
      castStat: undefined,
    });
    expect(offered).toEqual([]);
  });

  it("skips a spell that is not on the caster's class list", () => {
    expect(studyableScrolls([scroll("s1", "cure-wounds", 1, ["priest"])], wizard)).toEqual([]);
  });

  it("accepts a spell shared by several classes", () => {
    expect(studyableScrolls([scroll("s1", "light", 1, ["priest", "wizard"])], wizard)).toHaveLength(1);
  });

  it("skips a tier the caster cannot reach yet", () => {
    expect(studyableScrolls([scroll("s1", "fireball", 3, ["wizard"])], wizard)).toEqual([]);
    expect(studyableScrolls([scroll("s1", "fireball", 3, ["wizard"])], { ...wizard, maximumTier: 3 }))
      .toHaveLength(1);
  });

  it("skips a spell the caster already knows", () => {
    expect(studyableScrolls([scroll("s1", "magic-missile", 1, ["wizard"])], wizard)).toEqual([]);
  });

  it("offers a carried stack once, not once per copy", () => {
    const two = [scroll("s1", "light", 1, ["wizard"]), scroll("s1", "light", 1, ["wizard"])];
    expect(studyableScrolls(two, wizard)).toHaveLength(1);
  });

  it("offers each distinct scroll a caster carries", () => {
    const offered = studyableScrolls(
      [scroll("s1", "light", 1, ["wizard"]), scroll("s2", "shield", 2, ["wizard"])],
      wizard,
    );
    expect(offered.map((option) => option.spellId)).toEqual(["light", "shield"]);
  });

  it("returns nothing when the pack holds no scrolls at all", () => {
    expect(studyableScrolls([], wizard)).toEqual([]);
  });
});
