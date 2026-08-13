/**
 * Procedural Adventure & Site generator for DuskUltima.
 * Implements 6 Cursed Scroll biomes, Shadowdark name tables, room-count dice rolls, and the 50% Rescue Goal rule.
 */

import { Dice } from "../../engine/dice";
import type { MonsterBiome } from "../../engine";
import { Adventure, GoalVerb, SiteDef, SiteGoal, SiteSize } from "./Adventure";

const BIOMES: readonly MonsterBiome[] = [
  "diablerie",
  "red-sands",
  "midnight-sun",
  "river-of-night",
  "dwellers-in-the-deep",
  "city-of-masks",
];

const NAME_PREFIXES: Record<MonsterBiome, string[]> = {
  "diablerie": ["Mugdulblub Keep", "Rot-Bramble", "Willowman Hollow", "Gloom Bog"],
  "red-sands": ["Djurum Approach", "Burning Mines", "Red Ziggurat", "Sunken Oasis"],
  "midnight-sun": ["Rime-Sea Caves", "Frost-Jarl Tomb", "Dverg Forges", "Glacial Spire"],
  "river-of-night": ["Librarian's Chasm", "Canopy Village", "Subterranean Sea Fort", "River Vaults"],
  "dwellers-in-the-deep": ["Drowned-Star Cenote", "Abyssal Trench", "Coral Ruins", "Sunken Fane"],
  "city-of-masks": ["Rooftop Scamper", "Sunken Thieves' Guild", "Hidden Face Temple", "Masked Asylum"],
};

const NAME_SUFFIXES = [
  "of the Haunted Idol", "of the Forgotten Betrayer", "of the Disgraced King",
  "of the Cursed Knight", "of the Frozen Sword", "of the Burning Beast",
  "of the Mad Crown", "of the Lost Runes", "of the Demonic Descendant",
  "of the Radiant Sorcerer", "of the Night Queen", "of the Hidden Gem"
];

const GOAL_TARGETS = [
  { verb: "Slay" as GoalVerb, target: "Gloom Ogre" },
  { verb: "Slay" as GoalVerb, target: "Skeleton Commander" },
  { verb: "Retrieve" as GoalVerb, target: "Crown of the Deep" },
  { verb: "Retrieve" as GoalVerb, target: "Starfall Relic" },
  { verb: "Cleanse" as GoalVerb, target: "Tainted Shrine" },
  { verb: "Cleanse" as GoalVerb, target: "Foul Altar" },
  { verb: "Investigate" as GoalVerb, target: "Lost Tome" },
  { verb: "Investigate" as GoalVerb, target: "Ancient Crypt" },
];

export class AdventureGenerator {
  private dice: Dice;

  constructor(seed?: number) {
    this.dice = new Dice(seed);
  }

  public generateAdventure(partySize: number, unrescuedClasses: Array<"thief" | "priest" | "wizard">): Adventure {
    const siteCount = this.dice.die(3) + 1; // 2 to 4 sites per adventure
    const advBiome = this.getRandomItem([...BIOMES]);
    const prefixes = NAME_PREFIXES[advBiome];
    const advName = `${this.getRandomItem(prefixes)} ${this.getRandomItem(NAME_SUFFIXES)}`;

    const sites: SiteDef[] = [];
    const sizes: SiteSize[] = ["small", "medium", "large"];
    const remainingRescues = [...unrescuedClasses];

    for (let i = 0; i < siteCount; i++) {
      const biome = BIOMES[(BIOMES.indexOf(advBiome) + i) % BIOMES.length]!;
      const sizeCategory = sizes[i % sizes.length]!;
      const roomCount = this.rollRoomCount(sizeCategory);
      const sitePrefixes = NAME_PREFIXES[biome];
      const siteName = `${this.getRandomItem(sitePrefixes)} ${this.getRandomItem(NAME_SUFFIXES)}`;

      // 50% Rescue Rule if party < 4 and unrescued heroes remain
      let goal: SiteGoal;
      const rollRescue = partySize < 4 && remainingRescues.length > 0 && (this.dice.die(2) === 1 || i === 0);

      if (rollRescue && remainingRescues.length > 0) {
        const rescueClass = remainingRescues.shift()!;
        const heroName = rescueClass === "thief" ? "Lyra" : rescueClass === "priest" ? "Elen" : "Vael";
        goal = {
          verb: "Rescue",
          target: `${heroName} the ${rescueClass.toUpperCase()}`,
          isRescue: true,
          rescueClass: rescueClass,
          isCompleted: false,
          description: `Rescue ${heroName} the ${rescueClass.toUpperCase()} from captivity`,
        };
      } else {
        const standardGoal = this.getRandomItem(GOAL_TARGETS);
        goal = {
          verb: standardGoal.verb,
          target: standardGoal.target,
          isRescue: false,
          isCompleted: false,
          description: `${standardGoal.verb} the ${standardGoal.target}`,
        };
      }

      sites.push({
        id: `site-${i + 1}`,
        name: siteName,
        biome,
        sizeCategory,
        roomCount,
        goal,
      });
    }

    return {
      id: `adv-${Date.now()}`,
      name: advName,
      sites,
      currentSiteIndex: 0,
    };
  }

  private rollRoomCount(size: SiteSize): number {
    switch (size) {
      case "small":
        return this.dice.die(4) + 2; // 1d4 + 2 = 3 to 6 rooms
      case "medium":
        return this.dice.roll("2d4") + 1; // 2d4 + 1 = 3 to 9 rooms
      case "large":
        return this.dice.roll("3d4"); // 3d4 = 3 to 12 rooms
    }
  }

  private getRandomItem<T>(arr: T[]): T {
    const idx = this.dice.die(arr.length) - 1;
    return arr[idx]!;
  }
}
