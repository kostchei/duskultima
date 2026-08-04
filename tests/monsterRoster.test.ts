import { describe, expect, it } from "vitest";
import {
  Dice,
  MONSTER_SIZE_PX,
  monsterStatsForLevel,
  fitWave,
  pickMonster,
  targetLevel,
  type MonsterBiome,
  type MonsterRole,
} from "../src/engine";
import { allMonsters, monsterForRole, monstersForBiome } from "../src/data/monsters";
import { encounterMonster, monsterForGlyph, MONSTER_GLYPHS, roleForGlyph } from "../src/game/systems/monsterRoster";

const ZONES: readonly MonsterBiome[] = [
  "diablerie",
  "red-sands",
  "midnight-sun",
  "river-of-night",
  "dwellers-in-the-deep",
  "city-of-masks",
];

const ROLES: readonly MonsterRole[] = [
  "vermin",
  "skirmisher",
  "soldier",
  "brute",
  "caster",
  "champion",
];

describe("monster data", () => {
  it("gives every monster a legal level, a zone, and drawable art", () => {
    for (const m of allMonsters()) {
      expect(Number.isInteger(m.level), m.id).toBe(true);
      expect(m.level, m.id).toBeGreaterThanOrEqual(0);
      expect(m.level, m.id).toBeLessThanOrEqual(30);
      expect(m.biome, m.id).toBeDefined();
      expect(MONSTER_SIZE_PX[m.size], m.id).toBeDefined();
      expect(m.speed, m.id).toBeGreaterThan(0);
    }
  });

  it("keeps monster ids unique across every zone", () => {
    const ids = allMonsters().map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("lets every zone staff every dungeon tile role", () => {
    for (const zone of ZONES) {
      const roster = monstersForBiome(zone);
      for (const role of ROLES) {
        expect(roster.some((m) => m.role === role), `${zone}/${role}`).toBe(true);
      }
    }
  });

  it("spans the full 0-6 core ladder in the authored Diablerie roster", () => {
    const levels = new Set(monstersForBiome("diablerie").map((m) => m.level));
    for (let level = 0; level <= 6; level++) {
      expect(levels.has(level), `diablerie is missing level ${level}`).toBe(true);
    }
  });

  it("puts a monster's zone beyond doubt — no monster answers for two scrolls", () => {
    for (const zone of ZONES) {
      for (const m of monstersForBiome(zone)) expect(m.biome).toBe(zone);
    }
  });
});

describe("level and role stat spine", () => {
  it("raises hit dice, AC and damage with level", () => {
    const low = monsterStatsForLevel(1, "soldier");
    const high = monsterStatsForLevel(8, "soldier");
    expect(high.ac).toBeGreaterThan(low.ac);
    expect(high.attackBonus).toBeGreaterThan(low.attackBonus);
    expect(high.hitDice).toBe("8d8");
    expect(low.hitDice).toBe("1d8");
  });

  it("makes level 0 chaff rather than a scaled-down soldier", () => {
    expect(monsterStatsForLevel(0, "vermin").hitDice).toBe("1d4");
    expect(monsterStatsForLevel(0, "vermin").damage).toBe("1d4");
  });

  it("tiers XP by level", () => {
    expect(monsterStatsForLevel(2, "soldier").xpTier).toBe("minor");
    expect(monsterStatsForLevel(5, "soldier").xpTier).toBe("major");
    expect(monsterStatsForLevel(9, "champion").xpTier).toBe("legendary");
  });

  it("rejects levels outside the monster level ladder", () => {
    expect(() => monsterStatsForLevel(31, "soldier")).toThrow();
    expect(() => monsterStatsForLevel(-1, "soldier")).toThrow();
  });
});

describe("party-level-appropriate selection", () => {
  it("aims chaff below the party and champions above it", () => {
    expect(targetLevel("vermin", 5)).toBeLessThan(targetLevel("skirmisher", 5));
    expect(targetLevel("skirmisher", 5)).toBeLessThan(targetLevel("soldier", 5));
    expect(targetLevel("soldier", 5)).toBeLessThan(targetLevel("champion", 5));
  });

  it("clamps to the 0-30 ladder at both ends", () => {
    expect(targetLevel("vermin", 1)).toBe(0);
    expect(targetLevel("champion", 30)).toBe(30);
  });

  it("scales the spawned monster with the party for every zone and role", () => {
    const dice = new Dice(7);
    for (const zone of ZONES) {
      for (const role of ROLES) {
        const low = monsterForRole(dice, zone, role, 1);
        const high = monsterForRole(dice, zone, role, 10);
        expect(high.level, `${zone}/${role}`).toBeGreaterThanOrEqual(low.level);
        expect(low.biome).toBe(zone);
        expect(high.biome).toBe(zone);
      }
    }
  });

  it("keeps a tile in its own role while the roster can still answer on-level", () => {
    const dice = new Dice(17);
    for (const role of ROLES) {
      for (let level = 1; level <= 5; level++) {
        expect(monsterForRole(dice, "diablerie", role, level).role, `${role}@${level}`).toBe(role);
      }
    }
  });

  it("never leaves a dungeon tile unfillable, at any party level", () => {
    const dice = new Dice(3);
    for (const zone of ZONES) {
      for (let level = 1; level <= 10; level++) {
        for (const glyph of MONSTER_GLYPHS) {
          const def = monsterForGlyph(dice, zone, glyph, level);
          expect(def.biome, `${zone}/${glyph}@${level}`).toBe(zone);
        }
        expect(encounterMonster(dice, zone, level).biome).toBe(zone);
      }
    }
  });

  it("keeps a champion tile a champion and a vermin tile vermin", () => {
    const dice = new Dice(11);
    for (let i = 0; i < 50; i++) {
      expect(roleForGlyph(dice, "O")).toBe("champion");
      expect(roleForGlyph(dice, "r")).toBe("vermin");
    }
  });

  it("occasionally turns a skirmisher tile over to a brute", () => {
    const dice = new Dice(5);
    const rolled = new Set<MonsterRole>();
    for (let i = 0; i < 200; i++) rolled.add(roleForGlyph(dice, "g"));
    expect(rolled.has("skirmisher")).toBe(true);
    expect(rolled.has("brute")).toBe(true);
  });

  it("throws rather than substituting when a roster cannot field a role", () => {
    const dice = new Dice(1);
    // Nothing at or above "caster" on the role ladder, so escalation has
    // nowhere to go and the tile is genuinely unfillable.
    const topless = monstersForBiome("diablerie").filter(
      (m) => m.role !== "caster" && m.role !== "brute" && m.role !== "champion",
    );
    expect(() => pickMonster(dice, topless, "caster", 4)).toThrow(/caster/);
  });
});

describe("high-level parties are not fed chaff", () => {
  it("keeps the authored zone on-level all the way up the ladder", () => {
    const dice = new Dice(23);
    for (const role of ROLES) {
      for (let level = 6; level <= 10; level++) {
        const def = monsterForRole(dice, "diablerie", role, level);
        const shortfall = targetLevel(role, level) - def.level;
        expect(shortfall, `${role}@${level} fielded ${def.name} (L${def.level})`)
          .toBeLessThanOrEqual(3);
      }
    }
  });

  /**
   * The five zones still awaiting an authored roster top out around level 5, so
   * a level-10 party genuinely out-scales them. The contract there is weaker
   * but still meaningful: they must field the strongest thing they have rather
   * than falling back to chaff.
   */
  it("fields a zone's strong inhabitants once the party reaches high levels", () => {
    const dice = new Dice(23);
    for (const zone of ZONES) {
      for (const role of ROLES) {
        const def = monsterForRole(dice, zone, role, 10);
        expect(def.level, `${zone}/${role} fielded ${def.name}`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("escalates the role rather than the level — the tile still fights back", () => {
    const dice = new Dice(29);
    // A roster whose skirmishers stop at level 1 but whose brutes reach 8.
    const roster = monstersForBiome("diablerie").filter(
      (m) => (m.role === "skirmisher" && m.level <= 1) || m.role !== "skirmisher",
    );
    const def = pickMonster(dice, roster, "skirmisher", 9);
    expect(def.level).toBeGreaterThan(1);
  });
});

describe("encounter waves are sized in monster levels, not bodies", () => {
  it("sends chaff in numbers and heavy monsters alone", () => {
    const dice = new Dice(41);
    const roster = monstersForBiome("diablerie");
    const sizes = { vermin: 0, champion: 0 };
    for (let i = 0; i < 40; i++) {
      sizes.vermin += fitWave(dice, roster, "vermin", 5, 3).length;
      sizes.champion += fitWave(dice, roster, "champion", 5, 3).length;
    }
    expect(sizes.vermin).toBeGreaterThan(sizes.champion);
  });

  it("never sends an empty wave, and never one the party cannot survive", () => {
    const dice = new Dice(43);
    const roster = monstersForBiome("diablerie");
    for (const role of ROLES) {
      for (let level = 1; level <= 10; level++) {
        const wave = fitWave(dice, roster, role, level, 1);
        expect(wave.length, `${role}@${level}`).toBeGreaterThanOrEqual(1);
        const cost = wave.reduce((n, m) => n + Math.max(0.5, m.level), 0);
        // One monster may overspend (a lone champion is meant to); more than
        // one must fit the budget.
        if (wave.length > 1) expect(cost, `${role}@${level}`).toBeLessThanOrEqual(level);
      }
    }
  });
});
