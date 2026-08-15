/**
 * Procedural Adventure & Site generator for DuskUltima.
 * Implements 6 Cursed Scroll biomes, Shadowdark name tables, room-count dice rolls, and the 50% Rescue Goal rule.
 */

import { Dice } from "../../engine/dice";
import type { ClassName, MonsterBiome, MonsterSize } from "../../engine";
import { generateShopName, generateTavernName } from "../../engine/downtime";
import { classesForBiome } from "../../data/biomeOrigins";
import { classDef } from "../../data/classes";
import { randomPlebName } from "../../data/names";
import { Adventure, EggGuardianSize, GoalKind, GoalVerb, SiteDef, SiteGoal, SiteSize, SiteType } from "./Adventure";
import { monstersForBiome } from "../../data/monsters";
import { rollFillerCount } from "./roomGeneration";

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

const SITE_TYPES: readonly SiteType[] = ["cave", "ruins", "tomb", "fortress", "temple", "lair"];

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
    { speciesId: "swamp-dragon", speciesName: "Swamp Dragon", guardianName: "the swamp dragon", guardianMonsterId: "swamp-dragon", guardianSize: "gargantuan", treasureQuality: "legendary" },
  ],
  "red-sands": [
    { speciesId: "kobold", speciesName: "Kobold", guardianName: "the kobold matron", guardianMonsterId: "kobold", guardianSize: "medium", treasureQuality: "fabulous" },
    { speciesId: "scrag", speciesName: "Scrag", guardianName: "the scrag matriarch", guardianMonsterId: "scrag", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "wyvern", speciesName: "Wyvern", guardianName: "the wyvern mother", guardianMonsterId: "wyvern", guardianSize: "large", treasureQuality: "legendary" },
    { speciesId: "desert-dragon", speciesName: "Desert Dragon", guardianName: "the desert dragon", guardianMonsterId: "desert-dragon", guardianSize: "gargantuan", treasureQuality: "legendary" },
    { speciesId: "fire-dragon", speciesName: "Fire Dragon", guardianName: "the fire dragon", guardianMonsterId: "fire-dragon", guardianSize: "gargantuan", treasureQuality: "legendary" },
    { speciesId: "purple-worm", speciesName: "Purple Worm", guardianName: "the purple worm mother", guardianMonsterId: "purple-worm", guardianSize: "gargantuan", treasureQuality: "legendary" },
  ],
  "midnight-sun": [
    { speciesId: "cockatrice", speciesName: "Cockatrice", guardianName: "the nesting cockatrice", guardianMonsterId: "cockatrice", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "hippogriff", speciesName: "Hippogriff", guardianName: "the nesting hippogriff", guardianMonsterId: "hippogriff", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "plesiosaurus", speciesName: "Plesiosaurus", guardianName: "the lake mother", guardianMonsterId: "plesiosaurus", guardianSize: "huge", treasureQuality: "fabulous" },
    { speciesId: "remorhaz", speciesName: "Remorhaz", guardianName: "the ember broodmother", guardianMonsterId: "remorhaz", guardianSize: "gargantuan", treasureQuality: "legendary" },
    { speciesId: "frost-dragon", speciesName: "Frost Dragon", guardianName: "the frost dragon", guardianMonsterId: "frost-dragon", guardianSize: "gargantuan", treasureQuality: "legendary" },
  ],
  "river-of-night": [
    { speciesId: "ankheg", speciesName: "Ankheg", guardianName: "the ankheg queen", guardianMonsterId: "ankheg", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "crocodile", speciesName: "Crocodile", guardianName: "the river mother", guardianMonsterId: "crocodile", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "basilisk", speciesName: "Basilisk", guardianName: "the clutch keeper", guardianMonsterId: "basilisk", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "forest-dragon", speciesName: "Forest Dragon", guardianName: "the forest dragon", guardianMonsterId: "forest-dragon", guardianSize: "gargantuan", treasureQuality: "legendary" },
  ],
  "dwellers-in-the-deep": [
    { speciesId: "chuul", speciesName: "Chuul", guardianName: "the clutch sentinel", guardianMonsterId: "chuul", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "void-spider", speciesName: "Void Spider", guardianName: "the abyssal broodmother", guardianMonsterId: "void-spider", guardianSize: "large", treasureQuality: "fabulous" },
    { speciesId: "sea-dragon", speciesName: "Sea Dragon", guardianName: "the sea dragon", guardianMonsterId: "sea-dragon", guardianSize: "gargantuan", treasureQuality: "legendary" },
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
  /** Names already assigned to generated companions in this campaign generator. */
  private readonly companionNames = new Set<string>();

  constructor(seed?: number) {
    this.dice = new Dice(seed);
  }

  private nextCompanionName(): string {
    const name = randomPlebName(this.dice, this.companionNames);
    this.companionNames.add(name);
    return name;
  }

  public generateAdventure(partySize: number, excludedClasses: readonly ClassName[]): Adventure {
    const siteCount = this.dice.die(3) + 1; // 2 to 4 sites per adventure
    const advBiome = this.getRandomItem([...BIOMES]);
    const prefixes = NAME_PREFIXES[advBiome];
    const advName = `${this.getRandomItem(prefixes)} ${this.getRandomItem(NAME_SUFFIXES)}`;
    const tavernName = generateTavernName(this.dice);
    const shopName = generateShopName(this.dice);

    const sites: SiteDef[] = [];
    const sizes: SiteSize[] = ["small", "medium", "large"];
    // Classes already spoken for — in the party, or already rescued earlier
    // in this same adventure — are never offered again as a rescue target.
    const spokenFor = new Set<ClassName>(excludedClasses);

    for (let i = 0; i < siteCount; i++) {
      const biome = BIOMES[(BIOMES.indexOf(advBiome) + i) % BIOMES.length]!;
      const sizeCategory = sizes[i % sizes.length]!;
      const siteType = this.getRandomItem([...SITE_TYPES]);
      const roomCount = this.rollRoomCount(sizeCategory);
      const sitePrefixes = NAME_PREFIXES[biome];
      const siteName = `${this.getRandomItem(sitePrefixes)} ${this.getRandomItem(NAME_SUFFIXES)}`;

      // 50% Rescue Rule if party < 4 and this biome has an un-recruited class to offer.
      // A captive's class is always native to the biome they are found in.
      const eligibleRescueClasses = classesForBiome(biome).filter((c) => !spokenFor.has(c));
      let goal: SiteGoal;
      const rollRescue = partySize < 4 && eligibleRescueClasses.length > 0 && (this.dice.die(2) === 1 || i === 0);

      if (rollRescue) {
        const rescueClass = this.getRandomItem([...eligibleRescueClasses]);
        spokenFor.add(rescueClass);
        const heroName = this.nextCompanionName();
        const rescueClassLabel = classDef(rescueClass).displayName.toUpperCase();
        goal = {
          kind: "rescue-companion",
          verb: "Rescue",
          target: `${heroName} the ${rescueClassLabel}`,
          isRescue: true,
          rescueClass: rescueClass,
          rescueHeroName: heroName,
          completion: "rescue",
          approaches: ["combat", "stealth", "evasion", "social"],
          requiresAllHostilesDefeated: false,
          objectiveEntity: "rescue-companion",
          isCompleted: false,
          description: `Rescue ${heroName} the ${rescueClassLabel} from captivity`,
        };
      } else {
        const availableTemplates = GOAL_TEMPLATES.filter((template) =>
          template.kind !== "monster-eggs" || eggProfilesForBiome(biome).length > 0,
        );
        const standardGoal = this.getRandomItem([...availableTemplates]);
        const eggProfile = standardGoal.kind === "monster-eggs"
          ? this.getRandomItem([...eggProfilesForBiome(biome)])
          : undefined;
        const isNonKill = standardGoal.completion !== "defeat-target";
        const isHidden = isNonKill && this.dice.die(100) <= 35;
        const isTrapped = isNonKill && this.dice.die(100) <= 40;
        const trapId = isTrapped ? this.dice.die(12) : undefined;
        const rollGuardian = isNonKill && !eggProfile;
        const biomeMonsters = monstersForBiome(biome);
        const guardian = rollGuardian
          ? (biomeMonsters.find((m) => m.role === "brute" || m.role === "champion") ?? biomeMonsters[0])
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
          treasureQuality: eggProfile?.treasureQuality ?? standardGoal.treasureQuality ?? "normal",
          guardianName: eggProfile?.guardianName ?? (guardian ? guardian.name : standardGoal.guardianName),
          eggSpeciesId: eggProfile?.speciesId,
          eggSpeciesName: eggProfile?.speciesName,
          guardianMonsterId: eggProfile?.guardianMonsterId ?? guardian?.id,
          guardianSize: eggProfile?.guardianSize ?? (guardian ? (guardian.size as EggGuardianSize) : undefined),
          isHidden,
          isTrapped,
          trapId,
          trapFound: false,
          trapDisabled: false,
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
        siteType,
        roomCount,
        goal,
      });
    }

    return {
      id: `adv-${Date.now()}`,
      name: advName,
      sites,
      currentSiteIndex: 0,
      tavernName,
      shopName,
    };
  }

  /**
   * Generates a play-ready Adventure parsed from natural language prompt descriptions.
   * Prompts can contain site descriptions separated by " or ", " and ", ";", or newlines.
   * Dynamic room counting is applied automatically according to the parsed site size category.
   */
  public generateFromPrompt(
    prompt: string,
    partySize: number = 1,
    unrescuedClasses: readonly ClassName[] = ["thief", "priest", "wizard"]
  ): Adventure {
    const rawFragments = prompt
      .split(/\s+(?:or|and)\s+|[;\n]+/i)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const siteDescriptions = rawFragments.length > 0 ? rawFragments : [prompt];
    const sites: SiteDef[] = siteDescriptions.map((desc, idx) => this.parseSiteFromPrompt(desc, idx));

    const firstSite = sites[0];
    const advTitle = firstSite
      ? `Adventure: ${firstSite.name}`
      : "Custom Prompt Adventure";

    return {
      id: `adv-prompt-${Date.now()}`,
      name: advTitle,
      sites,
      currentSiteIndex: 0,
      tavernName: generateTavernName(this.dice),
      shopName: generateShopName(this.dice),
    };
  }

  /**
   * Parses a single site description string into a structured SiteDef.
   * Handles size extraction, biome matching across all 6 zones, goal extraction,
   * typo correction ("dargon" -> "dragon"), and placeholder substitution ("<name>").
   */
  public parseSiteFromPrompt(description: string, siteIndex: number = 0, defaultBiome?: MonsterBiome): SiteDef {
    const text = description.trim();

    // 1. Size Category & Room Count
    let sizeCategory: SiteSize = "medium";
    if (/\bsmall\b/i.test(text)) sizeCategory = "small";
    else if (/\blarge\b/i.test(text)) sizeCategory = "large";
    else if (/\bmedium\b/i.test(text)) sizeCategory = "medium";

    const roomCount = this.rollRoomCount(sizeCategory);

    // 1b. Site Type
    let siteType: SiteType | undefined;
    if (/\bcaves?\b/i.test(text)) siteType = "cave";
    else if (/\bruins?\b/i.test(text)) siteType = "ruins";
    else if (/\btombs?\b/i.test(text)) siteType = "tomb";
    else if (/\bfortress(?:es)?\b/i.test(text)) siteType = "fortress";
    else if (/\btemples?\b/i.test(text)) siteType = "temple";
    else if (/\blairs?\b/i.test(text)) siteType = "lair";
    if (!siteType) siteType = this.getRandomItem([...SITE_TYPES]);

    // 2. Biome Resolution
    let biome: MonsterBiome = defaultBiome ?? "diablerie";
    if (/\b(?:rimesea|rime-sea|rime|frost|dverg|glacial|ice)\b/i.test(text)) {
      biome = "midnight-sun";
    } else if (/\b(?:hazardous\s+approach|hazardous|red\s*sand|red-sands|sand|desert|ziggurat|djurum)\b/i.test(text)) {
      biome = "red-sands";
    } else if (/\b(?:rot-bramble|bramble|swamp|bog|mud|diablerie|willowman|mugdulblub)\b/i.test(text)) {
      biome = "diablerie";
    } else if (/\b(?:river\s*of\s*night|chasm|canopy|subterranean|vaults)\b/i.test(text)) {
      biome = "river-of-night";
    } else if (/\b(?:dwellers|deep|cenote|trench|coral|abyssal|sunken\s*fane)\b/i.test(text)) {
      biome = "dwellers-in-the-deep";
    } else if (/\b(?:city\s*of\s*masks|rooftop|thieves|asylum|urban|cobblestone)\b/i.test(text)) {
      biome = "city-of-masks";
    }

    // 3. Goal Extraction
    let goal: SiteGoal;

    // A. Rescue Goal
    if (/\brescue\b/i.test(text) || /\bhostage\b/i.test(text)) {
      let rescueClass: "thief" | "priest" | "wizard" = "thief";
      if (/\bpriest\b/i.test(text)) rescueClass = "priest";
      else if (/\bwizard\b/i.test(text) || /\bmagic-user\b/i.test(text)) rescueClass = "wizard";

      const defaultName = rescueClass === "thief" ? "Lyra" : rescueClass === "priest" ? "Elen" : "Vael";

      // Match explicit name if given (e.g. "rescue the thief Lyra" or "rescue the thief <name>")
      let heroName = defaultName;
      const nameMatch = text.match(/\brescue\s+(?:the\s+)?(?:thief|priest|wizard)\s+(?:<([\w\s]+)>|([\w]+))/i);
      if (nameMatch) {
        const extracted = (nameMatch[1] || nameMatch[2] || "").trim();
        if (extracted && extracted.toLowerCase() !== "from" && extracted.toLowerCase() !== "in" && extracted !== "name") {
          heroName = extracted;
        }
      }

      const rescueClassLabel = classDef(rescueClass).displayName.toUpperCase();
      goal = {
        kind: "rescue-companion",
        verb: "Rescue",
        target: `${heroName} the ${rescueClassLabel}`,
        isRescue: true,
        rescueClass: rescueClass,
        rescueHeroName: heroName,
        completion: "rescue",
        approaches: ["combat", "stealth", "evasion", "social"],
        requiresAllHostilesDefeated: false,
        objectiveEntity: "rescue-companion",
        isCompleted: false,
        description: `Rescue ${heroName} the ${rescueClassLabel} from captivity`,
      };
    }
    // B. Monster Eggs Goal (supports typo "dargon")
    else if (/\b(?:gather|retrieve|collect|steal|harvest|find)\s+.*(?:dargon|dragon|monster|\w+)\s+eggs\b/i.test(text) || /\beggs\b/i.test(text)) {
      const isDragon = /\b(?:dargon|dragon)\b/i.test(text) || !eggProfilesForBiome(biome).length;
      const profiles = eggProfilesForBiome(biome);

      let eggProfile: EggGuardianProfile | undefined;
      if (isDragon) {
        eggProfile = profiles.find((p) => p.speciesId.includes("dragon")) ?? {
          speciesId: "frost-dragon",
          speciesName: "Dragon",
          guardianName: "the dragon mother",
          guardianMonsterId: "frost-dragon",
          guardianSize: "gargantuan",
          treasureQuality: "legendary",
        };
      } else if (profiles.length > 0) {
        eggProfile = profiles[0];
      }

      const speciesName = eggProfile?.speciesName ?? "Dragon";
      const guardianName = eggProfile?.guardianName ?? "the nesting mother";

      goal = {
        kind: "monster-eggs",
        verb: "Retrieve",
        target: `${speciesName} eggs`,
        isRescue: false,
        completion: "acquire",
        approaches: ["combat", "stealth", "evasion"],
        requiresAllHostilesDefeated: false,
        targetItemId: "monster-egg",
        requiredQuantity: 1,
        treasureQuality: eggProfile?.treasureQuality ?? "legendary",
        guardianName,
        eggSpeciesId: eggProfile?.speciesId ?? "dragon",
        eggSpeciesName: speciesName,
        guardianMonsterId: eggProfile?.guardianMonsterId ?? "frost-dragon",
        guardianSize: eggProfile?.guardianSize ?? "gargantuan",
        isCompleted: false,
        description: `Gather ${speciesName} eggs without waking ${guardianName}`,
      };
    }
    // C. Cleanse / Hex Goal
    else if (/\b(?:cleanse|lift|hex|rot-bramble)\b/i.test(text)) {
      goal = {
        kind: "lift-hex",
        verb: "Cleanse",
        target: "the Rot-Bramble hex",
        isRescue: false,
        completion: "interact",
        approaches: ["combat", "stealth", "evasion", "social"],
        requiresAllHostilesDefeated: false,
        objectiveEntity: "objective",
        isCompleted: false,
        description: "Lift the Rot-Bramble hex",
      };
    }
    // D. Slay / Boss Goal
    else if (/\b(?:slay|kill|defeat|assassinate)\b/i.test(text)) {
      goal = {
        kind: "kill-boss",
        verb: "Slay",
        target: "the site boss",
        isRescue: false,
        completion: "defeat-target",
        approaches: ["combat", "stealth", "evasion"],
        requiresAllHostilesDefeated: false,
        isCompleted: false,
        description: "Slay the site boss",
      };
    }
    // E. Default: Fabled Item / Treasure
    else {
      goal = {
        kind: "fabled-item",
        verb: "Retrieve",
        target: "a random fabled magical item",
        isRescue: false,
        completion: "acquire",
        approaches: ["combat", "stealth", "evasion"],
        requiresAllHostilesDefeated: false,
        treasureQuality: "legendary",
        isCompleted: false,
        description: "Recover a random fabled magical item",
      };
    }

    // 4. Site Name Construction
    // Clean up description for nice site name
    let siteName = text
      .replace(/^(?:the|an|a)\s+/i, "")
      .replace(/<[^>]+>/g, "Lyra")
      .replace(/\b(dargon)\b/ig, "dragon");

    siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1);

    return {
      id: `site-prompt-${siteIndex + 1}`,
      name: siteName,
      biome,
      sizeCategory,
      siteType,
      roomCount,
      goal,
    };
  }

  /** 5 beat rooms plus size-dependent filler (see roomGeneration.ts). */
  private rollRoomCount(size: SiteSize): number {
    return 5 + rollFillerCount(this.dice, size);
  }

  private getRandomItem<T>(arr: T[]): T {
    const idx = this.dice.die(arr.length) - 1;
    return arr[idx]!;
  }
}
