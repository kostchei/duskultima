import {
  Character,
  applyTalentResult,
  getBaseRole,
  initializeClassState,
  rollAlignment,
  rollAncestry,
  rollStatsByPriority,
  rollStatsIronMan,
  type ClassName,
  type Engine,
  type StatGenerationMethod,
  type StatName,
  type Stats,
  type Alignment,
  type Ancestry,
  type Effect,
  type MonsterBiome,
  chooseWarlockPatron,
  warlockPatronOptions,
  type WarlockPatronId,
} from "../engine";
import { classDef } from "./classes";
import { item, namedBlade } from "./items";
import { statPriorityForClass } from "./statPriority";
import { getBackground, getTrinket } from "../engine/tableService";
import { spellsForClass } from "./spells";
import { ALL_CAROUSE_TABLES } from "./tables/carousing";
import { ALL_MISHAP_TABLES } from "./tables/mishaps";
import {
  FIGHTER_TALENTS,
  PRIEST_TALENTS,
  THIEF_TALENTS,
  WIZARD_TALENTS,
  PIT_FIGHTER_TALENTS,
  SEA_WOLF_TALENTS,
  RAS_GODAI_TALENTS,
  WITCH_TALENTS,
  SEER_TALENTS,
  BLACK_LOTUS_TALENTS,
  BARD_TALENTS,
  MONK_TALENTS,
  NECROMANCER_TALENTS,
  PALADIN_TALENTS,
  RANGER_TALENTS,
  WARLOCK_TALENTS,
  BASILISK_WARRIOR_TALENTS,
  ROUSTABOUT_TALENTS,
  DELVER_TALENTS,
  DUELIST_TALENTS,
} from "./tables/talents";

import { ALL_TREASURE_TABLES } from "./tables/treasure";

export { classDef, type ClassDef } from "./classes";
export {
  MAGIC_ARMOR_BASE_IDS,
  NAMED_BLADE_SWORD_IDS,
  allItems,
  generatedMagicArmor,
  generatedMagicItem,
  isGenericMagicArmorId,
  item,
  namedBlade,
} from "./items";
export { resolveFoundItem, rollItemTraits, type RolledItemTraits } from "./magicItemTraitRoll";
export {
  bestTreasureQuality,
  rollFabledItem,
  rollGemstoneFind,
  rollLuxuryItem,
  rollTreasureCache,
  rollTreasureFind,
  type FabledItemFind,
  type TreasureFind,
  type TreasureFindKind,
} from "./treasureGeneration";
export { ITEM_BENEFITS, ITEM_CURSES, ITEM_FLAWS, ITEM_VIRTUES, type MagicItemTrait } from "./tables/magicItemTraits";
export { monster } from "./monsters";
export { CLASS_SPELL_ROSTER, highestAvailableSpellIndex, highestAvailableDamagingSpellIndex, magicItemSpell, spell, spellForMagicItem, spellsForClass, unlockClassSpellsForLevel } from "./spells";

/** Fills a class's known-spell counts from the implemented class list. */
export function advanceKnownSpells(character: Character): string[] {
  const progression = classDef(character.className).spellsKnownByLevel?.[character.level - 1];
  if (!progression) return [];
  const spellClass = character.className === "cleric" || character.className === "priest"
    ? "priest"
    : character.className === "necromancer" ? "necromancer" : "wizard";
  const candidates = spellsForClass(spellClass);
  const learned: string[] = [];
  progression.forEach((target, tierIndex) => {
    const current = character.knownSpells.filter((known) => candidates.find((candidate) => candidate.id === known.spellId)?.tier === tierIndex + 1).length;
    for (const candidate of candidates) {
      if (candidate.tier !== tierIndex + 1 || character.knownSpells.some((known) => known.spellId === candidate.id)) continue;
      if (current + learned.filter((id) => candidates.find((entry) => entry.id === id)?.tier === tierIndex + 1).length >= target) break;
      character.learnSpell(candidate.id);
      learned.push(candidate.id);
    }
  });
  return learned;
}
export { isPlebName, plebNameForSeed, randomPlebName } from "./names";
export {
  ALL_TREASURE_TABLES,
  GEMSTONE_TABLE,
  GEMSTONE_ITEM_SPECS,
  LUXURY_FEATURE_TABLE,
  LUXURY_FEATURES,
  LUXURY_ITEM_SPECS,
} from "./tables/treasure";

/** Register all data tables with an engine instance. Call once at boot. */
export function registerTables(engine: Engine): void {
  engine.tables.register(FIGHTER_TALENTS);
  engine.tables.register(THIEF_TALENTS);
  engine.tables.register(PRIEST_TALENTS);
  engine.tables.register(WIZARD_TALENTS);
  engine.tables.register(PIT_FIGHTER_TALENTS);
  engine.tables.register(SEA_WOLF_TALENTS);
  engine.tables.register(RAS_GODAI_TALENTS);
  engine.tables.register(WITCH_TALENTS);
  engine.tables.register(SEER_TALENTS);
  engine.tables.register(BLACK_LOTUS_TALENTS);
  engine.tables.register(BARD_TALENTS);
  engine.tables.register(MONK_TALENTS);
  engine.tables.register(NECROMANCER_TALENTS);
  engine.tables.register(PALADIN_TALENTS);
  engine.tables.register(RANGER_TALENTS);
  engine.tables.register(WARLOCK_TALENTS);
  engine.tables.register(BASILISK_WARRIOR_TALENTS);
  engine.tables.register(ROUSTABOUT_TALENTS);
  engine.tables.register(DELVER_TALENTS);
  engine.tables.register(DUELIST_TALENTS);
  for (const table of ALL_MISHAP_TABLES) engine.tables.register(table);
  for (const table of ALL_TREASURE_TABLES) engine.tables.register(table);
  for (const table of ALL_CAROUSE_TABLES) engine.tables.register(table);
}

/**
 * Minimum stats a class demands before it can be played, per the Cursed
 * Scroll class table. Classes without an entry here (recoverable-only
 * classes) roll unconstrained — the priority-order method already stacks
 * their best rolls onto their own primary/secondary stats.
 */
export const CLASS_STAT_REQUIREMENTS: Partial<Record<ClassName, Partial<Record<StatName, number>>>> = {
  fighter: { STR: 12 },
  cleric: { WIS: 12 },
  thief: { DEX: 12 },
  "magic-user": { INT: 12 },
  bard: { CHA: 12 },
  monk: { DEX: 12, WIS: 12 },
  necromancer: { CHA: 12 },
  paladin: { STR: 12, CHA: 12 },
  ranger: { DEX: 12, INT: 12 },
  seawolf: { STR: 12, CON: 12 },
  warlock: { CHA: 12 },
};

export function isClassQualified(stats: Stats, cls: ClassName): boolean {
  const reqs = CLASS_STAT_REQUIREMENTS[cls];
  if (!reqs) return true;
  return (Object.entries(reqs) as [StatName, number][]).every(([stat, min]) => stats[stat] >= min);
}

/**
 * Roll a stat array for this class with the chosen generation method, silently
 * rerolling the whole array in the background until it clears the class's
 * minimum requirements (if any) — only the finished character is ever shown.
 * Unearthed Arcana assigns stats in the class's own priority order (see
 * statPriorityForClass); Iron Man rolls a flat STR-through-CHA array.
 */
function rollStatsForClass(dice: Engine["dice"], cls: ClassName, method: StatGenerationMethod): Stats {
  const requirements = CLASS_STAT_REQUIREMENTS[cls];
  const MAX_ATTEMPTS = 10_000;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const stats = method === "iron-man"
      ? rollStatsIronMan(dice)
      : rollStatsByPriority(dice, statPriorityForClass(cls));
    if (!requirements) return stats;
    const meetsAll = (Object.entries(requirements) as [StatName, number][])
      .every(([stat, minimum]) => stats[stat] >= minimum);
    if (meetsAll) return stats;
  }
  throw new Error(`Could not roll a stat array meeting ${cls}'s requirements in ${MAX_ATTEMPTS} attempts`);
}

/**
 * Weapon Mastery is earned with a specific weapon type, and the first one a
 * fighter has is the weapon they start holding. Class features declare their
 * mastery hooks unbound; this stamps the weapon on before the effect is added.
 */
function bindMastery(feature: Effect, weaponId: string): Effect {
  if (!feature.id.endsWith("weapon-mastery")) return feature;
  return {
    ...feature,
    name: `${feature.name} (${item(weaponId).name})`,
    hooks: feature.hooks.map((hook) =>
      hook.kind === "checkBonus"
        || hook.kind === "checkBonusHalfLevel"
        || hook.kind === "damageBonus"
        || hook.kind === "damageBonusHalfLevel"
        ? { ...hook, weaponId }
        : hook,
    ),
  };
}

/**
 * Build a level-1 character of the given class: 3d6 stats via the chosen
 * generation method (silently rerolled until they clear the class's stat
 * requirements — see rollStatsForClass), max HP at level 1, class armor kit,
 * starting gear and spells. AC is computed from armor + DEX, never stored.
 * Ancestry is rolled from the project ancestry table when not given.
 */
export function createCharacter(
  engine: Engine,
  id: string,
  name: string,
  cls: ClassName,
  ancestry?: Ancestry,
  alignment?: Alignment,
  homeBiome?: MonsterBiome,
  method: StatGenerationMethod = "unearthed-arcana",
  customStats?: Stats,
  namedBladeSwordId?: string,
  warlockPatronId?: WarlockPatronId,
): Character {
  const def = classDef(cls);
  const resolvedAncestry = ancestry ?? rollAncestry(engine.dice);
  const stats = customStats ?? rollStatsForClass(engine.dice, cls, method);
  const background = getBackground();

  const conMod = Math.floor((stats.CON - 10) / 2);
  const hitDieSides = parseInt(def.hitDie.split("d")[1] || "8", 10);
  const maxHp = Math.max(1, hitDieSides + conMod);
  const c = new Character({
    id,
    name,
    className: cls,
    stats,
    maxHp,
    ancestry: resolvedAncestry,
    alignment: alignment ?? rollAlignment(engine.dice),
    homeBiome,
    method,
    background: background.name,
  });
  for (const f of def.features) c.addEffect(bindMastery(structuredClone(f), def.startingWeaponId));
  initializeClassState(c);
  if (cls === "warlock") {
    const selectedPatron = warlockPatronId ?? warlockPatronOptions(c.alignment === "neutral" ? "chaos" : c.alignment)[0]?.id;
    if (!selectedPatron) throw new Error("A Warlock must have a lawful or chaotic patron");
    chooseWarlockPatron(c, selectedPatron);
  }
  if (getBaseRole(cls) === "thief") {
    for (const skill of ["thievery", "stealth", "climbing", "swimming"]) c.trainSkill(skill);
  }

  // Grit is a Fighter feature; the alternate martial classes use their own features.
  if (cls === "fighter") {
    const gritStat = stats.DEX > stats.STR ? "DEX" : "STR";
    c.addEffect({
      id: `feat-${cls}-grit`,
      name: `Grit (${gritStat === "STR" ? "Strength" : "Dexterity"})`,
      hooks: [{ kind: "advantageOnStat", stat: gritStat }],
    });
  }

  for (const spellId of def.startingSpellIds) c.learnSpell(spellId);
  advanceKnownSpells(c);
  if (cls === "ras-godai") {
    const blackLotus = engine.tables.roll(engine.dice, "black-lotus-talents");
    applyTalentResult(engine.dice, engine.tables, c, blackLotus, "talent-black-lotus-start");
  }
  // Named Blade: a Paladin's 1st-level feature grants a sword of their choice as a
  // +0 magic weapon. Dwarves can wield finesse weapons same as anyone — they just
  // fight with STR instead of DEX (see Engine.attack) — so no weapon gets swapped out.
  const startingWeapon = cls === "paladin" ? namedBlade(namedBladeSwordId ?? def.startingWeaponId) : item(def.startingWeaponId);
  c.inventory.add(startingWeapon, 1, true);
  c.equipWeapon(startingWeapon);
  if (def.armorId) {
    const armor = item(def.armorId);
    c.inventory.add(armor, 1, true);
    c.equipArmor(armor);
  }
  if (def.startsWithShield) {
    // Seawolves carry a round shield instead of the standard kite shield.
    const shield = item(cls === "seawolf" ? "round-shield" : "shield");
    c.inventory.add(shield, 1, true);
    c.equipShield(shield);
  }

  // Universal starting kit.
  c.inventory.add(item("backpack"), 1, true);
  c.inventory.add(item("torch"), 2, true);
  c.inventory.add(item("ration"), 3, true);

  // A trinket from before the adventuring life — free to carry, no coin value.
  const trinket = getTrinket(resolvedAncestry);
  c.inventory.add(
    { id: `trinket-${c.id}`, name: trinket.result_text, slotCost: 0, bundleSize: 1, tags: ["gear", "trinket"] },
    1,
    true,
  );

  if (def.secondaryWeaponId) c.inventory.add(item(def.secondaryWeaponId), 1, true);

  // Bonus field gear for the classes that live off the land.
  if (cls === "pit-fighter" || cls === "sea-wolf" || cls === "seawolf") {
    c.inventory.add(item("javelin"), 3, true);
    c.inventory.add(item("flint-and-steel"), 1, true);
  }
  // Class sidearms outside the standard secondary-weapon slot: ras-godai shoots from the
  // shadows like a thief, wizards & witches keep an extra knife.
  if (cls === "ras-godai") c.inventory.add(item("shortbow"), 1, true);
  if (cls === "wizard" || cls === "witch") c.inventory.add(item("dagger"), 2, true);

  // Roll starting talents (1 + 1 extra if human/ambitious)
  const talentCount = resolvedAncestry === "human" ? 2 : 1;
  for (let i = 0; i < talentCount; i++) {
    const talent = engine.tables.roll(engine.dice, def.talentTableId);
    applyTalentResult(engine.dice, engine.tables, c, talent, `talent-start-${i}`);
  }

  engine.registerCharacter(c);
  return c;
}
