/**
 * Procedural Adventure & Site generator for DuskUltima.
 * Implements 6 Cursed Scroll biomes, Shadowdark name tables, room-count dice rolls, and the 50% Rescue Goal rule.
 */

import { Dice } from "../../engine/dice";
import type { MonsterBiome, MonsterSize } from "../../engine";
import { Adventure, GoalKind, GoalVerb, SiteDef, SiteGoal, SiteSize } from "./Adventure";

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

interface GoalTemplate {
  kind: GoalKind;
  verb: GoalVerb;
  target: string;
  completion: SiteGoal["completion"];
  approaches: readonly SiteGoal["approaches"][number][];
  objectiveEntity?: SiteGoal["objectiveEntity"];
  targetItemId?: string;
  requiredQuantity?: number;
  treasureQuality?: SiteGoal["treasureQuality"];
  guardianName?: string;
  description: string;
}

export interface EggGuardianProfile {
  speciesId: string;
  speciesName: string;
  guardianName: string;
  guardianMonsterId: string;
  guardianSize: Exclude<MonsterSize, "tiny" | "small">;
  treasureQuality: "fabulous" | "legendary";
}

/**
 * Egg goals are ecological, not a generic "monster mother" encounter. The
 * target can be harvested without killing the guardian, and the guardian's
 * size/name communicates why the nest is dangerous before the approach.
 */
export const EGG_GUARDIANS_BY_BIOME: Readonly<Record<MonsterBiome, readonly EggGuardianProfile[]>> = {
  diablerie: [
    { speciesId: "giant-spider", speciesName: "Giant Spider", guardianName: "the broodmother spider", guardianMonsterId: "giant-spider", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "giant-wasp", speciesName: "Giant Wasp", guardianName: "the wasp queen", guardianMonsterId: "giant-wasp", guardianSize: "large", treasureQuality: "fabulous" },
  ],
  "red-sands": [
    { speciesId: "kobold", speciesName: "Kobold", guardianName: "the kobold matron", guardianMonsterId: "kobold", guardianSize: "medium", treasureQuality: "fabulous" },
    { speciesId: "scrag", speciesName: "Scrag", guardianName: "the scrag matriarch", guardianMonsterId: "scrag", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "wyvern", speciesName: "Wyvern", guardianName: "the wyvern mother", guardianMonsterId: "wyvern", guardianSize: "large", treasureQuality: "legendary" },
    { speciesId: "desert-dragon", speciesName: "Desert Dragon", guardianName: "the desert dragon", guardianMonsterId: "desert-dragon", guardianSize: "gargantuan", treasureQuality: "legendary" },
    { speciesId: "purple-worm", speciesName: "Purple Worm", guardianName: "the purple worm mother", guardianMonsterId: "purple-worm", guardianSize: "gargantuan", treasureQuality: "legendary" },
  ],
  "midnight-sun": [
    { speciesId: "cockatrice", speciesName: "Cockatrice", guardianName: "the nesting cockatrice", guardianMonsterId: "cockatrice", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "hippogriff", speciesName: "Hippogriff", guardianName: "the nesting hippogriff", guardianMonsterId: "hippogriff", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "plesiosaurus", speciesName: "Plesiosaurus", guardianName: "the lake mother", guardianMonsterId: "plesiosaurus", guardianSize: "huge", treasureQuality: "fabulous" },
    { speciesId: "remorhaz", speciesName: "Remorhaz", guardianName: "the ember broodmother", guardianMonsterId: "remorhaz", guardianSize: "gargantuan", treasureQuality: "legendary" },
  ],
  "river-of-night": [
    { speciesId: "ankheg", speciesName: "Ankheg", guardianName: "the ankheg queen", guardianMonsterId: "ankheg", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "crocodile", speciesName: "Crocodile", guardianName: "the river mother", guardianMonsterId: "crocodile", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "basilisk", speciesName: "Basilisk", guardianName: "the clutch keeper", guardianMonsterId: "basilisk", guardianSize: "large", treasureQuality: "fabulous" },
  ],
  "dwellers-in-the-deep": [
    { speciesId: "chuul", speciesName: "Chuul", guardianName: "the clutch sentinel", guardianMonsterId: "chuul", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "void-spider", speciesName: "Void Spider", guardianName: "the abyssal broodmother", guardianMonsterId: "void-spider", guardianSize: "large", treasureQuality: "fabulous" },
  ],
  "city-of-masks": [],
};

function eggProfilesForBiome(biome: MonsterBiome): readonly EggGuardianProfile[] {
  return EGG_GUARDIANS_BY_BIOME[biome];
}

export const GOAL_TEMPLATES: readonly GoalTemplate[] = [
  {
    kind: "fabled-item",
    verb: "Retrieve",
    target: "a random fabled magical item",
    completion: "acquire",
    approaches: ["combat", "stealth", "evasion"],
    treasureQuality: "legendary",
    description: "Recover a random fabled magical item with at least one benefit",
  },
  {
    kind: "lift-hex",
    verb: "Cleanse",
    target: "the Rot-Bramble hex",
    completion: "interact",
    approaches: ["combat", "stealth", "evasion", "social"],
    objectiveEntity: "objective",
    description: "Lift the Rot-Bramble hex",
  },
  {
    kind: "harvest-components",
    verb: "Retrieve",
    target: "ritual components",
    completion: "acquire",
    approaches: ["combat", "stealth", "evasion"],
    requiredQuantity: 3,
    description: "Harvest 3 ritual components",
  },
  {
    kind: "treasure-cache",
    verb: "Retrieve",
    target: "the sealed treasure cache",
    completion: "acquire",
    approaches: ["combat", "stealth", "evasion"],
    description: "Secure the sealed treasure cache",
  },
  {
    kind: "exotic-materials",
    verb: "Retrieve",
    target: "exotic materials",
    completion: "acquire",
    approaches: ["combat", "stealth", "evasion"],
    requiredQuantity: 3,
    description: "Harvest 3 exotic materials",
  },
  {
    kind: "rescue-hostage",
    verb: "Rescue",
    target: "the captive hostage",
    completion: "rescue",
    approaches: ["combat", "stealth", "evasion", "social"],
    objectiveEntity: "hostage",
    description: "Rescue the hostage",
  },
  {
    kind: "monster-eggs",
    verb: "Retrieve",
    target: "monster eggs",
    completion: "acquire",
    approaches: ["combat", "stealth", "evasion"],
    requiredQuantity: 1,
    guardianName: "the nesting mother",
    description: "Recover the monster eggs without waking the nesting mother",
  },
  {
    kind: "assassinate-leader",
    verb: "Slay",
    target: "the enemy leader",
    completion: "defeat-target",
    approaches: ["combat", "stealth", "evasion"],
    description: "Assassinate the enemy leader",
  },
  {
    kind: "secure-chokepoint",
    verb: "Investigate",
    target: "the mountain chokepoint",
    completion: "interact",
    approaches: ["combat", "stealth", "evasion", "social"],
    objectiveEntity: "objective",
    description: "Secure the chokepoint",
  },
  {
    kind: "kill-boss",
    verb: "Slay",
    target: "the site boss",
    completion: "defeat-target",
    approaches: ["combat", "stealth", "evasion"],
    description: "Kill the site boss",
  },
  {
    kind: "clear-border",
    verb: "Investigate",
    target: "the border crossing",
    completion: "secure-area",
    approaches: ["combat", "stealth", "evasion", "social"],
    objectiveEntity: "objective",
    description: "Clear the border crossing for safe passage",
  },
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
          kind: "rescue-companion",
          verb: "Rescue",
          target: `${heroName} the ${rescueClass.toUpperCase()}`,
          isRescue: true,
          rescueClass: rescueClass,
          completion: "rescue",
          approaches: ["combat", "stealth", "evasion", "social"],
          requiresAllHostilesDefeated: false,
          objectiveEntity: "rescue-companion",
          isCompleted: false,
          description: `Rescue ${heroName} the ${rescueClass.toUpperCase()} from captivity`,
        };
      } else {
        const availableTemplates = GOAL_TEMPLATES.filter((template) =>
          template.kind !== "monster-eggs" || eggProfilesForBiome(biome).length > 0,
        );
        const standardGoal = this.getRandomItem([...availableTemplates]);
        const eggProfile = standardGoal.kind === "monster-eggs"
          ? this.getRandomItem([...eggProfilesForBiome(biome)])
          : undefined;
        goal = {
          kind: standardGoal.kind,
          verb: standardGoal.verb,
          target: eggProfile ? `${eggProfile.speciesName} eggs` : standardGoal.target,
          isRescue: false,
          completion: standardGoal.completion,
          approaches: standardGoal.approaches,
          requiresAllHostilesDefeated: false,
          objectiveEntity: standardGoal.objectiveEntity,
          targetItemId: standardGoal.targetItemId,
          requiredQuantity: standardGoal.requiredQuantity,
          treasureQuality: eggProfile?.treasureQuality ?? standardGoal.treasureQuality,
          guardianName: eggProfile?.guardianName ?? standardGoal.guardianName,
          eggSpeciesId: eggProfile?.speciesId,
          eggSpeciesName: eggProfile?.speciesName,
          guardianMonsterId: eggProfile?.guardianMonsterId,
          guardianSize: eggProfile?.guardianSize,
          isCompleted: false,
          description: eggProfile
            ? `Harvest ${eggProfile.speciesName} eggs without waking ${eggProfile.guardianName}`
            : standardGoal.description,
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
