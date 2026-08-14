import type { Character, StatName } from "./character";
import type { Dice } from "./dice";
import type { TableRegistry } from "./tables";

/** Shape of the "carouse-outcome" table's per-entry `data` (see data/tables/carousing.ts). */
interface CarouseOutcomeData {
  mishapRolls: number;
  benefitRolls: number;
  modifier: number;
  xp: number;
}

export type CarouseTier =
  | "worthy-night"
  | "full-revelry"
  | "tavern-crawl"
  | "finest-voyage"
  | "weeklong-bender"
  | "ten-day-fete"
  | "legendary-weeks"
  | "outrageous-finery"
  | "citywide-festival"
  | "nobles-fete";

/** Cost/bonus/flavor per tier — Western Reaches p.236, extended past base Shadowdark's seven tiers. */
const CAROUSE_OPTIONS: Readonly<Record<CarouseTier, { cost: number; bonus: number; description: string }>> = {
  "worthy-night": { cost: 30, bonus: 0, description: "Night at the tavern to toast and gossip" },
  "full-revelry": { cost: 100, bonus: 1, description: "Festive day of high spirits and revelry" },
  "tavern-crawl": { cost: 300, bonus: 2, description: "Full day and night of raucous celebration" },
  "finest-voyage": { cost: 600, bonus: 3, description: "Three days of merrymaking and antics" },
  "weeklong-bender": { cost: 900, bonus: 4, description: "Five-day spree of exuberant feasting" },
  "ten-day-fete": { cost: 1_200, bonus: 5, description: "Full week of total excess and indulgence" },
  "legendary-weeks": { cost: 1_800, bonus: 6, description: "Hazy, weeklong voyage into splendid luxury" },
  "outrageous-finery": { cost: 2_400, bonus: 7, description: "Lavish, weeklong party of outrageous finery" },
  "citywide-festival": { cost: 3_000, bonus: 8, description: "2-week, city-wide festival of supreme opulence" },
  "nobles-fete": { cost: 4_000, bonus: 9, description: "Extravagant, 2-week fete in a noble's court" },
};

export function carouseCost(tier: CarouseTier): number {
  return CAROUSE_OPTIONS[tier].cost;
}

export function carouseDescription(tier: CarouseTier): string {
  return CAROUSE_OPTIONS[tier].description;
}

export interface CarouseRollResult {
  /** 1d8 + tier bonus, clamped into the Outcome table's covered range. */
  total: number;
  xp: number;
  benefits: readonly CarouseEvent[];
  mishaps: readonly CarouseEvent[];
}

export type CarouseEffect =
  | { kind: "goldDelta"; amount: number }
  | { kind: "goldPercent"; percent: number }
  | { kind: "gainLuck"; amount: number }
  | { kind: "loseAllLuck" }
  | { kind: "addItem"; itemId: string; quantity: number }
  | { kind: "addRandomPotion"; quantity: number }
  | { kind: "addTrinket" }
  | { kind: "treasureRoll" }
  | { kind: "increaseMaxHp"; amount: number }
  | { kind: "removeGear"; count: number | "1d4" };

export interface CarouseEvent {
  text: string;
  effects: readonly CarouseEffect[];
}

export interface CarouseResult {
  tier: CarouseTier;
  cost: number;
  result: CarouseRollResult;
}

const TAVERN_NAME_PREFIXES: readonly string[] = [
  "The Rusty", "The Drunken", "The Salty", "The Broken", "The Golden",
  "The Weary", "The Laughing", "The Black", "The Silver", "The Crooked",
  "The Gilded", "The Howling",
];
const TAVERN_NAME_NOUNS: readonly string[] = [
  "Anchor", "Dragon", "Boar", "Crown", "Lantern", "Serpent",
  "Griffin", "Tankard", "Raven", "Mermaid", "Kraken", "Wyrm",
];

/** A tavern name, rolled once per adventure so it stays put across sites. */
export function generateTavernName(dice: Pick<Dice, "die">): string {
  const prefix = TAVERN_NAME_PREFIXES[dice.die(TAVERN_NAME_PREFIXES.length) - 1]!;
  const noun = TAVERN_NAME_NOUNS[dice.die(TAVERN_NAME_NOUNS.length) - 1]!;
  return `${prefix} ${noun}`;
}

const SHOP_NAME_PREFIXES: readonly string[] = [
  "Old", "Quiet", "Broken", "Rusty", "Gilded", "Honest",
  "Wandering", "Shady", "Faded", "Ember",
];
const SHOP_NAME_NOUNS: readonly string[] = [
  "Pawnshop", "Trading Post", "Curiosities", "Armory", "Apothecary",
  "Exchange", "Bazaar", "Emporium", "Sundries",
];

/** A shop name, rolled once per adventure so it stays put across sites. */
export function generateShopName(dice: Pick<Dice, "die">): string {
  const prefix = SHOP_NAME_PREFIXES[dice.die(SHOP_NAME_PREFIXES.length) - 1]!;
  const noun = SHOP_NAME_NOUNS[dice.die(SHOP_NAME_NOUNS.length) - 1]!;
  return `${prefix} ${noun}`;
}

/**
 * Roll one participant's carousing night: 1d8 + the tier's bonus against the
 * Carousing Outcome table (Western Reaches p.237). The outcome sets how many
 * times this reveler rolls the d100 Benefit and Mishap tables — and at what
 * modifier — plus their XP for the night. Benefit/Mishap text can name
 * mechanics this codebase doesn't model (renown, allies, temporary stat
 * bonuses); those stay flavor-only, same as the old table's wealth-% lines.
 */
export function carouseEffectsForText(text: string, category: "benefit" | "mishap"): readonly CarouseEffect[] {
  const lower = text.toLowerCase();
  const effects: CarouseEffect[] = [];

  if (lower.includes("gain a luck token")) effects.push({ kind: "gainLuck", amount: 1 });
  if (lower.includes("lose all luck tokens")) effects.push({ kind: "loseAllLuck" });
  if (lower.includes("roll an ancestry trinket")) effects.push({ kind: "addTrinket" });
  if (lower.includes("potion of polymorph")) effects.push({ kind: "addItem", itemId: "potion-polymorph", quantity: 1 });
  if (lower.includes("potion of healing")) effects.push({ kind: "addItem", itemId: "potion-healing", quantity: 1 });
  if (lower.includes("two random magic potions")) effects.push({ kind: "addRandomPotion", quantity: 2 });
  if (lower.includes("permanently gain 1 hp")) effects.push({ kind: "increaseMaxHp", amount: 1 });
  if (category === "benefit" && /roll on .*treasure table/.test(lower)) effects.push({ kind: "treasureRoll" });

  const wealthPercent = lower.includes("half your wealth")
    ? 50
    : Number(lower.match(/(?:lose|lost|fined|missing|burgled|stole) (\d+)%/)?.[1] ?? 0);
  if (wealthPercent > 0) effects.push({ kind: "goldPercent", percent: -wealthPercent });

  const goldMatch = lower.match(/(?:win|won|lose|lost|for|gave|spent|pay|paid|borrowed) (\d+) gp/);
  if (goldMatch) {
    const amount = Number(goldMatch[1]);
    const isGain = category === "benefit" && /(?:win|won) \d+ gp/.test(lower);
    effects.push({ kind: "goldDelta", amount: isGain ? amount : -amount });
  }

  if (lower.includes("1d4 pieces of your gear")) effects.push({ kind: "removeGear", count: "1d4" });
  else if (lower.includes("random piece of your gear")) effects.push({ kind: "removeGear", count: 1 });

  return effects;
}

export function resolveCarouseRoll(dice: Dice, tables: TableRegistry, tier: CarouseTier): CarouseRollResult {
  const bonus = CAROUSE_OPTIONS[tier].bonus;
  const outcome = tables.roll(dice, "carouse-outcome", bonus);
  const data = outcome.entry.data as unknown as CarouseOutcomeData;
  const benefits = Array.from(
    { length: data.benefitRolls },
    () => {
      const text = tables.roll(dice, "carouse-benefit", data.modifier).entry.text;
      return { text, effects: carouseEffectsForText(text, "benefit") };
    },
  );
  const mishaps = Array.from(
    { length: data.mishapRolls },
    () => {
      const text = tables.roll(dice, "carouse-mishap", data.modifier).entry.text;
      return { text, effects: carouseEffectsForText(text, "mishap") };
    },
  );
  return { total: outcome.roll, xp: data.xp, benefits, mishaps };
}

export function resolveCarouse(dice: Dice, tables: TableRegistry, tier: CarouseTier, availableGold: number): CarouseResult {
  const cost = carouseCost(tier);
  if (availableGold < cost) throw new Error(`Carousing costs ${cost} gold`);
  return { tier, cost, result: resolveCarouseRoll(dice, tables, tier) };
}

/**
 * The party pools gold to fund one night out, but the price is per head:
 * total cost is the tier's cost multiplied by how many characters carouse.
 * The pooled spend sets a single bonus everyone rolls with — it does not
 * buy a shared result.
 */
export function groupCarouseCost(tier: CarouseTier, participantCount: number): number {
  if (!Number.isInteger(participantCount) || participantCount < 1) {
    throw new Error(`Participant count must be a positive integer, got ${participantCount}`);
  }
  return carouseCost(tier) * participantCount;
}

export interface GroupCarouseResult {
  tier: CarouseTier;
  cost: number;
  results: readonly CarouseRollResult[];
}

/**
 * Resolve a night of carousing for the whole party: one pooled, per-head
 * cost, but every participant rolls independently, so each ends up with
 * their own total, XP, and set of benefit/mishap results.
 */
export function resolveGroupCarouse(
  dice: Dice,
  tables: TableRegistry,
  tier: CarouseTier,
  availableGold: number,
  participantCount: number,
): GroupCarouseResult {
  const cost = groupCarouseCost(tier, participantCount);
  if (availableGold < cost) throw new Error(`Carousing costs ${cost} gold for ${participantCount} participants`);
  const results = Array.from({ length: participantCount }, () => resolveCarouseRoll(dice, tables, tier));
  return { tier, cost, results };
}

export type TrainingSkill = "athletics" | "stealth" | "lore" | "survival";

export const TRAINING_STAT: Readonly<Record<TrainingSkill, StatName>> = {
  athletics: "STR",
  stealth: "DEX",
  lore: "INT",
  survival: "WIS",
};

export function instructorTrainingDc(previousFailures: number): number {
  if (!Number.isInteger(previousFailures) || previousFailures < 0) throw new Error("Training failures must be non-negative");
  return Math.max(9, 15 - previousFailures * 3);
}

/**
 * Learning a spell from a found scroll.
 *
 * A scroll can always be cast once. A caster resting with one may instead study
 * it: a DC 15 casting-stat check to copy the spell into their repertoire. The
 * scroll is spent either way — that is the wager, and the reason it is offered
 * as a choice at rest rather than applied automatically.
 */
export const SCROLL_LEARNING_DC = 15;

export interface ScrollStudyOption {
  /** Inventory id of the scroll being studied. */
  itemId: string;
  scrollName: string;
  spellId: string;
  spellName: string;
  spellTier: number;
}

/** The caster-facing shape of a scroll, so this stays free of item/spell data. */
export interface ScrollCandidate {
  itemId: string;
  scrollName: string;
  spellId: string;
  spellName: string;
  spellTier: number;
  /** Classes the spell appears on. */
  spellClasses: readonly string[];
}

/**
 * Which carried scrolls this caster could actually study: a spell on their own
 * class list, within the tier they can cast, that they do not already know.
 * A non-caster gets nothing — `castStat` absent means no repertoire to copy into.
 */
export function studyableScrolls(
  candidates: readonly ScrollCandidate[],
  options: {
    castStat: StatName | undefined;
    className: string;
    maximumTier: number;
    knownSpellIds: readonly string[];
  },
): ScrollStudyOption[] {
  if (!options.castStat) return [];
  const known = new Set(options.knownSpellIds);
  const seen = new Set<string>();
  const studyable: ScrollStudyOption[] = [];
  for (const candidate of candidates) {
    if (known.has(candidate.spellId)) continue;
    if (seen.has(candidate.itemId)) continue;
    if (!candidate.spellClasses.includes(options.className)) continue;
    if (candidate.spellTier > options.maximumTier) continue;
    seen.add(candidate.itemId);
    studyable.push({
      itemId: candidate.itemId,
      scrollName: candidate.scrollName,
      spellId: candidate.spellId,
      spellName: candidate.spellName,
      spellTier: candidate.spellTier,
    });
  }
  return studyable;
}

export interface DowntimeCheckResult {
  activityId: string;
  activityName: string;
  success: boolean;
  rawRoll: number;
  modifier: number;
  total: number;
  effectiveDc: number;
  baseDc: number;
  cost: number;
  logText: string;
  effectSummary: string;
}

/**
 * Spiritualism activity resolution (Western Reaches p. 234).
 * WIS Check.
 */
export function resolveSpiritualism(
  dice: Dice,
  char: Character,
  option: "sp-favor" | "sp-strengthening" | "sp-insight" | "sp-cleansing"
): DowntimeCheckResult {
  const baseDc = option === "sp-favor" ? 9 : option === "sp-strengthening" ? 12 : option === "sp-insight" ? 15 : 18;
  const cost = option === "sp-insight" || option === "sp-cleansing" ? 50 : 0;
  if (char.gold < cost) throw new Error(`Spiritualism option requires ${cost} gp`);

  const activityKey = `spiritualism-${option}`;
  const effectiveDc = char.getDowntimeDc(activityKey, baseDc);
  const mod = char.mod("WIS");
  const rawRoll = dice.die(20);
  const total = rawRoll + mod;
  const success = total >= effectiveDc;

  char.gold -= cost;

  let effectSummary = "";
  if (success) {
    char.resetDowntimeFailure(activityKey);
    if (option === "sp-favor") {
      char.renown += 1;
      effectSummary = "Gained favor with local church! +1 Renown.";
    } else if (option === "sp-strengthening") {
      char.xp += 2;
      effectSummary = "Spiritual strengthening! Gained 2 XP.";
    } else if (option === "sp-insight") {
      char.gainLuckTokens(1);
      effectSummary = "Found personal insight! Gained 1 Luck Token.";
    } else if (option === "sp-cleansing") {
      char.effects = char.effects.filter((e) => !e.id.startsWith("curse-"));
      effectSummary = "Spiritual cleansing! Ended curses afflicting you.";
    }
  } else {
    char.recordDowntimeFailure(activityKey);
    effectSummary = `Failed check. DC for future attempts reduced to ${char.getDowntimeDc(activityKey, baseDc)}.`;
  }

  return {
    activityId: option,
    activityName: "Spiritualism",
    success,
    rawRoll,
    modifier: mod,
    total,
    effectiveDc,
    baseDc,
    cost,
    logText: `Spiritualism (${option}): rolled ${rawRoll} + ${mod} = ${total} vs DC ${effectiveDc} (${success ? "SUCCESS" : "FAIL"}). ${effectSummary}`,
    effectSummary,
  };
}

/**
 * Skulduggery activity resolution (Western Reaches p. 234).
 */
export function resolveSkulduggery(
  dice: Dice,
  char: Character,
  option: "sk-rumor" | "sk-lay-low" | "sk-extortion" | "sk-hide-out" | "sk-minor-crime" | "sk-major-crime",
  targetRumorDelta: 1 | -1 = 1
): DowntimeCheckResult {
  const isDex = option === "sk-minor-crime" || option === "sk-major-crime";
  const stat: StatName = isDex ? "DEX" : "CHA";
  const baseDc =
    option === "sk-rumor"
      ? 9
      : option === "sk-lay-low"
      ? 12
      : option === "sk-extortion" || option === "sk-minor-crime"
      ? 15
      : 18;
  const cost = option === "sk-major-crime" ? 50 : 0;

  if (char.gold < cost) throw new Error(`Skulduggery option requires ${cost} gp`);

  const activityKey = `skulduggery-${option}`;
  const effectiveDc = char.getDowntimeDc(activityKey, baseDc);
  const mod = char.mod(stat);
  const rawRoll = dice.die(20);
  const total = rawRoll + mod;
  const success = total >= effectiveDc;

  char.gold -= cost;

  let effectSummary = "";
  if (success) {
    char.resetDowntimeFailure(activityKey);
    if (option === "sk-rumor") {
      char.renown += targetRumorDelta;
      effectSummary = `Started rumor! Renown ${targetRumorDelta > 0 ? "increased" : "decreased"} by 1.`;
    } else if (option === "sk-lay-low") {
      effectSummary = "Successfully laid low and escaped local authorities for a small crime.";
    } else if (option === "sk-extortion") {
      char.gold += 50;
      effectSummary = "Extortion successful! Extorted 50 gp in merchandise value.";
    } else if (option === "sk-hide-out") {
      effectSummary = "Successfully hid out and escaped local authorities for a major crime.";
    } else if (option === "sk-minor-crime") {
      char.gold += 30;
      effectSummary = "Petty theft successful! Gained 30 gp loot.";
    } else if (option === "sk-major-crime") {
      char.gold += 150;
      char.renown += 1;
      effectSummary = "Major heist successful! Gained 150 gp and +1 Renown.";
    }
  } else {
    char.recordDowntimeFailure(activityKey);
    if (isDex) {
      char.renown -= 1;
      effectSummary = `Crime failed and authorities investigated! -1 Renown. Future DC reduced to ${char.getDowntimeDc(activityKey, baseDc)}.`;
    } else {
      effectSummary = `Failed check. Future DC reduced to ${char.getDowntimeDc(activityKey, baseDc)}.`;
    }
  }

  return {
    activityId: option,
    activityName: "Skulduggery",
    success,
    rawRoll,
    modifier: mod,
    total,
    effectiveDc,
    baseDc,
    cost,
    logText: `Skulduggery (${option}): rolled ${rawRoll} + ${mod} = ${total} vs DC ${effectiveDc} (${success ? "SUCCESS" : "FAIL"}). ${effectSummary}`,
    effectSummary,
  };
}

/**
 * Martial Training activity resolution (Western Reaches p. 235).
 * INT, STR, or DEX Check.
 */
export function resolveMartialTraining(
  dice: Dice,
  char: Character,
  stat: "STR" | "DEX" | "INT",
  option: "mt-bonus" | "mt-learn" | "mt-increase-die"
): DowntimeCheckResult {
  const hpDie = char.className === "wizard" || char.className === "necromancer" || char.className === "witch" || char.className === "seer" ? 4 : (char.className === "bard" || char.className === "thief" || char.className === "ranger" ? 6 : 8);
  const cost = 50;

  if (char.gold < cost) throw new Error("Martial Training requires 50 gp");

  let baseDc = 15;
  if (hpDie === 4) {
    baseDc = option === "mt-bonus" ? 15 : 18;
  } else if (hpDie === 6) {
    baseDc = option === "mt-bonus" ? 12 : 15;
  } else {
    baseDc = option === "mt-learn" ? 9 : option === "mt-bonus" ? 12 : 15;
  }

  const activityKey = `martial-${hpDie}-${option}`;
  const effectiveDc = char.getDowntimeDc(activityKey, baseDc);
  const mod = char.mod(stat);
  const rawRoll = dice.die(20);
  const total = rawRoll + mod;
  const success = total >= effectiveDc;

  char.gold -= cost;

  let effectSummary = "";
  if (success) {
    char.resetDowntimeFailure(activityKey);
    if (option === "mt-bonus") {
      effectSummary = "Martial Training successful! +1 to hit and damage with trained weapon.";
    } else if (option === "mt-learn") {
      effectSummary = "Martial Training successful! Learned new weapon/armor proficiency.";
    } else if (option === "mt-increase-die") {
      effectSummary = "Martial Training successful! Increased weapon damage die step (max d12).";
    }
  } else {
    char.recordDowntimeFailure(activityKey);
    effectSummary = `Failed training check. Future DC reduced to ${char.getDowntimeDc(activityKey, baseDc)}.`;
  }

  return {
    activityId: option,
    activityName: "Martial Training",
    success,
    rawRoll,
    modifier: mod,
    total,
    effectiveDc,
    baseDc,
    cost,
    logText: `Martial Training (${option}): rolled ${rawRoll} + ${mod} = ${total} vs DC ${effectiveDc} (${success ? "SUCCESS" : "FAIL"}). ${effectSummary}`,
    effectSummary,
  };
}

/**
 * Magical Research activity resolution (Western Reaches p. 235).
 */
export function resolveMagicalResearch(
  dice: Dice,
  char: Character,
  option: "mr-scroll-adv" | "mr-create-scroll" | "mr-potion" | "mr-wand" | "mr-trade-spell",
  potionChoice?: string
): DowntimeCheckResult {
  const isWis = char.className === "cleric" || char.className === "seer" || char.className === "priest";
  const stat: StatName = isWis ? "WIS" : "INT";
  
  let baseDc = 15;
  let cost = 50;

  if (option === "mr-scroll-adv") {
    baseDc = 12;
    cost = 0;
  } else if (option === "mr-wand") {
    baseDc = 20;
  } else if (option === "mr-trade-spell" || option === "mr-create-scroll" || option === "mr-potion") {
    baseDc = 15;
  }

  if (char.gold < cost) throw new Error(`Magical Research option requires ${cost} gp`);

  const activityKey = `magical-${option}`;
  const effectiveDc = char.getDowntimeDc(activityKey, baseDc);
  const mod = char.mod(stat);
  const rawRoll = dice.die(20);
  const total = rawRoll + mod;
  const success = total >= effectiveDc;

  char.gold -= cost;

  let effectSummary = "";
  if (success) {
    char.resetDowntimeFailure(activityKey);
    if (option === "mr-scroll-adv") {
      effectSummary = "Magical Research success! Gained Advantage on next scroll check or spell casts.";
    } else if (option === "mr-create-scroll") {
      effectSummary = "Magical Research success! Created a tier 1-3 spell scroll.";
    } else if (option === "mr-potion") {
      const potName = potionChoice ?? "Potion of Healing";
      effectSummary = `Magical Research success! Created a ${potName}.`;
    } else if (option === "mr-wand") {
      effectSummary = "Magical Research success! Created a spell wand.";
    } else if (option === "mr-trade-spell") {
      effectSummary = "Magical Research success! Traded one known spell for another of the same tier.";
    }
  } else {
    char.recordDowntimeFailure(activityKey);
    effectSummary = `Research failed. Future DC reduced to ${char.getDowntimeDc(activityKey, baseDc)}.`;
  }

  return {
    activityId: option,
    activityName: "Magical Research",
    success,
    rawRoll,
    modifier: mod,
    total,
    effectiveDc,
    baseDc,
    cost,
    logText: `Magical Research (${option}): rolled ${rawRoll} + ${mod} = ${total} vs DC ${effectiveDc} (${success ? "SUCCESS" : "FAIL"}). ${effectSummary}`,
    effectSummary,
  };
}

/**
 * Mount Training resolution for Desert Rider, Kyzian Archer, Paladin (p. 41, 49, 54).
 */
export function resolveMountTraining(dice: Dice, char: Character): DowntimeCheckResult {
  const baseDc = 15;
  const cost = 50;
  if (char.gold < cost) throw new Error("Mount Training requires 50 gp");

  const activityKey = "mount-training";
  const effectiveDc = char.getDowntimeDc(activityKey, baseDc);
  const mod = char.mod("CHA");
  const rawRoll = dice.die(20);
  const total = rawRoll + mod;
  const success = total >= effectiveDc;

  char.gold -= cost;

  let effectSummary = "";
  if (success) {
    char.resetDowntimeFailure(activityKey);
    effectSummary = "Mount Training successful! Acquired and bonded with a new mount.";
  } else {
    char.recordDowntimeFailure(activityKey);
    effectSummary = `Mount training failed. Future DC reduced to ${char.getDowntimeDc(activityKey, baseDc)}.`;
  }

  return {
    activityId: "mount-training",
    activityName: "Mount Training",
    success,
    rawRoll,
    modifier: mod,
    total,
    effectiveDc,
    baseDc,
    cost,
    logText: `Mount Training: rolled ${rawRoll} + ${mod} = ${total} vs DC ${effectiveDc} (${success ? "SUCCESS" : "FAIL"}). ${effectSummary}`,
    effectSummary,
  };
}

