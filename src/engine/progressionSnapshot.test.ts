import { describe, expect, it } from "vitest";
import { classDef } from "../data/classes";
import { registerTables } from "../data";
import { Character, Engine, MAX_LEVEL, xpToNextLevel } from "./index";

const SOURCE_CLASSES = [
  "fighter", "cleric", "magic-user", "thief", "bard", "monk", "necromancer", "paladin", "ranger", "seawolf", "warlock",
  "basilisk-warrior", "ras-godai", "roustabout", "delver", "duelist", "pit-fighter",
] as const;

const EXPECTED_XP = [10, 20, 20, 20, 20, 20, 30, 30, 30, 0];
const TALENT_LEVELS = new Set([3, 5, 7, 9]);

describe("source advancement snapshots", () => {
  it("covers every starting and recoverable class through level 10", () => {
    const engine = new Engine({ seed: 101 });
    registerTables(engine);

    for (const className of SOURCE_CLASSES) {
      const def = classDef(className);
      const character = new Character({
        id: `snapshot-${className}`,
        name: className,
        className,
        stats: { STR: 14, DEX: 14, CON: 14, INT: 14, WIS: 14, CHA: 14 },
        maxHp: 10,
      });

      expect(def.talentTableId).toBeTruthy();
      for (let destinationLevel = 2; destinationLevel <= MAX_LEVEL; destinationLevel++) {
        expect(xpToNextLevel(character.level)).toBe(EXPECTED_XP[destinationLevel - 2]);
        const beforeHp = character.maxHp;
        character.xp = xpToNextLevel(character.level);
        const result = engine.levelUp(character, def.hitDie, def.talentTableId);
        expect(character.level).toBe(destinationLevel);
        expect(character.xp).toBe(0);
        expect(character.maxHp).toBeGreaterThan(beforeHp);
        expect(result.talent === null).toBe(!TALENT_LEVELS.has(destinationLevel));
      }
    }
  });
});
