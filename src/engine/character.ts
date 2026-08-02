/** Character model: six stats, class, effects (talents + conditions), HP/AC/XP, spells. */

import { critThreshold, effectiveStatScore, hookAppliesToWeapon, sumHook, type Effect } from "./effects";
import type { Dice } from "./dice";
import { Inventory, ItemStateTracker, type ItemDef } from "./inventory";

export type StatName = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
export const STAT_NAMES: readonly StatName[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export type Stats = Record<StatName, number>;

export type BaseClassName = "fighter" | "thief" | "priest" | "wizard";
export type ClassName =
  | BaseClassName
  | "pit-fighter"
  | "sea-wolf"
  | "ras-godai"
  | "witch"
  | "seer";

/** The stat a class leans on, and where a free stat bonus goes once nothing is deficient. */
export const PRIMARY_STAT: Record<BaseClassName, StatName> = {
  fighter: "STR",
  thief: "DEX",
  priest: "WIS",
  wizard: "INT",
};

export function getBaseRole(className: ClassName): BaseClassName {
  switch (className) {
    case "pit-fighter":
    case "sea-wolf":
      return "fighter";
    case "ras-godai":
      return "thief";
    case "witch":
      return "wizard";
    case "seer":
      return "priest";
    default:
      return className;
  }
}

export type Alignment = "law" | "neutral" | "chaos";
export type VoiceRegister = "low" | "medium" | "high";
export type Ancestry = "human" | "dwarf" | "elf" | "half-orc";

export const ANCESTRIES: readonly Ancestry[] = ["human", "dwarf", "elf", "half-orc"];

export function parseAncestry(value: string): Ancestry {
  if ((ANCESTRIES as readonly string[]).includes(value)) return value as Ancestry;
  throw new Error(`Unknown ancestry "${value}"`);
}

const VOICE_REGISTERS: readonly VoiceRegister[] = ["low", "medium", "high"];

/** Stable cosmetic assignment that never consumes the rules engine's dice. */
export function voiceRegisterForIdentity(id: string, name: string): VoiceRegister {
  const identity = `${id}\0${name}`;
  let hash = 2166136261;
  for (let i = 0; i < identity.length; i++) {
    hash ^= identity.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return VOICE_REGISTERS[(hash >>> 0) % VOICE_REGISTERS.length]!;
}

const TITLES: Record<BaseClassName, Record<Alignment, readonly string[]>> = {
  fighter: {
    law: ["Squire", "Cavalier", "Knight", "Thane", "Lord/Lady"],
    chaos: ["Knave", "Bandit", "Slayer", "Reaver", "Warlord"],
    neutral: ["Warrior", "Barbarian", "Battlerager", "Warchief", "Chieftain"],
  },
  priest: {
    law: ["Acolyte", "Crusader", "Templar", "Champion", "Paladin"],
    chaos: ["Initiate", "Zealot", "Cultist", "Scourge", "Chaos Knight"],
    neutral: ["Seeker", "Invoker", "Haruspex", "Mystic", "Oracle"],
  },
  thief: {
    law: ["Footpad", "Burglar", "Rook", "Underboss", "Boss"],
    chaos: ["Thug", "Cutthroat", "Shadow", "Assassin", "Wraith"],
    neutral: ["Robber", "Outlaw", "Rogue", "Renegade", "Bandit King/Queen"],
  },
  wizard: {
    law: ["Apprentice", "Conjurer", "Arcanist", "Mage", "Archmage"],
    chaos: ["Adept", "Channeler", "Witch/Warlock", "Diabolist", "Sorcerer"],
    neutral: ["Shaman", "Seer", "Warden", "Sage", "Druid"],
  },
};

/** Shadowdark random-character alignment table: 1-3 law, 4-5 neutral, 6 chaos. */
export function rollAlignment(dice: Dice): Alignment {
  const roll = dice.die(6);
  return roll <= 3 ? "law" : roll <= 5 ? "neutral" : "chaos";
}

export function alignmentLabel(alignment: Alignment): string {
  return alignment === "law" ? "Lawful" : alignment === "chaos" ? "Chaotic" : "Neutral";
}

/** Titles advance in two-level bands: 1-2, 3-4, 5-6, 7-8, and 9-10. */
export function characterTitle(className: ClassName, alignment: Alignment, level: number): string {
  if (!Number.isInteger(level) || level < 1) throw new Error(`Invalid character level ${level}`);
  const band = Math.min(4, Math.floor((level - 1) / 2));
  const base = getBaseRole(className);
  return TITLES[base][alignment][band]!;
}

type SpellStatus = "available" | "lost";

export interface KnownSpell {
  spellId: string;
  status: SpellStatus;
  /** Priest crit-fail: the spell stays lost until atonement (v1: rest at a shrine). */
  requiresAtonement: boolean;
}

export interface DyingState {
  /** Rounds left before death. */
  roundsRemaining: number;
}

export interface ClassState {
  /** Pit Fighter Flourish uses remaining until rest. */
  flourishUses: number;
  /** Witch familiar availability and restoration state. */
  familiarAlive: boolean;
  /** Seer omen readings remaining until rest. */
  omenUses: number;
  /** Remaining daily uses granted by alternate-class features and talents. */
  resourceUses: Partial<Record<import("./effects").ClassResource, number>>;
  /** Sea Wolf gods selected until the next rest. */
  oldGods: ("odin" | "freya" | "loki")[];
  /** Gear held between Cauldron castings (maximum 3 slots). */
  cauldronItems: { itemId: string; qty: number }[];
}

export const DEFAULT_CLASS_STATE: Readonly<ClassState> = {
  flourishUses: 0,
  familiarAlive: false,
  omenUses: 0,
  resourceUses: {},
  oldGods: [],
  cauldronItems: [],
};

export function statModifier(score: number): number {
  if (!Number.isInteger(score) || score < 1 || score > 20) {
    throw new Error(`Invalid stat score: ${score}`);
  }
  return Math.floor((score - 10) / 2);
}

/**
 * Roll a starting stat array: 3d6 per stat, silently regenerated until the
 * set is heroic — at least two stats of 15+ and at most one stat under 6.
 */
export function rollStats(dice: Dice): Stats {
  const MAX_ATTEMPTS = 10_000;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const scores = STAT_NAMES.map(() => dice.roll("3d6"));
    const high = scores.filter((s) => s >= 15).length;
    const low = scores.filter((s) => s < 6).length;
    if (high >= 2 && low <= 1) {
      const stats = {} as Stats;
      STAT_NAMES.forEach((name, i) => (stats[name] = scores[i]!));
      return stats;
    }
  }
  throw new Error(`rollStats found no qualifying array in ${MAX_ATTEMPTS} attempts`);
}

export interface CharacterInit {
  id: string;
  name: string;
  className: ClassName;
  stats: Stats;
  maxHp: number;
  alignment?: Alignment;
  ancestry?: Ancestry;
  voiceRegister?: VoiceRegister;
}

export class Character {
  readonly id: string;
  readonly name: string;
  readonly className: ClassName;
  readonly alignment: Alignment;
  readonly stats: Stats;
  readonly ancestry: Ancestry;
  readonly voiceRegister: VoiceRegister;
  readonly trainedSkills = new Set<string>();

  level = 1;
  xp = 0;
  hp: number;
  private baseMaxHp: number;

  /** Permanent talents + temporary conditions, all as effect hooks. */
  effects: Effect[] = [];
  knownSpells: KnownSpell[] = [];
  inventory: Inventory;
  /** Charges/inertness/breakage for usable items this character carries, wears, or wields. */
  readonly itemState = new ItemStateTracker();

  /** Worn armor (class-gated via equipArmor). Null = unarmored: AC 10 + DEX. */
  wornArmor: ItemDef | null = null;
  /** Weapon currently in hand. Starting weapons are equipped during character creation. */
  wieldedWeapon: ItemDef | null = null;
  /** A readied shield: +2 AC, occupies a hand. */
  carriedShield: ItemDef | null = null;
  /** Shield slung on the back (e.g. to carry a torch): hand free, no AC bonus. */
  shieldStowed = false;

  /** One reroll, Shadowdark luck. Spent through the game layer. */
  luckToken = true;
  classState: ClassState = { ...DEFAULT_CLASS_STATE, resourceUses: {}, oldGods: [], cauldronItems: [] };

  /** Set while at 0 HP; cleared by stabilization or healing. */
  dying: DyingState | null = null;
  dead = false;

  constructor(init: CharacterInit) {
    this.id = init.id;
    this.name = init.name;
    this.className = init.className;
    this.alignment = init.alignment ?? "neutral";
    this.stats = { ...init.stats };
    this.ancestry = parseAncestry(init.ancestry ?? "human");
    this.voiceRegister = init.voiceRegister ?? voiceRegisterForIdentity(init.id, init.name);
    for (const s of STAT_NAMES) statModifier(this.stats[s]); // validate
    this.baseMaxHp = init.maxHp;
    this.hp = this.maxHp;
    // Gear slots = max(STR, 10); fighters haul + CON mod extra (Hauler).
    let capacity = Math.max(this.stats.STR, 10);
    if (init.className === "fighter") {
      capacity += Math.max(0, statModifier(this.stats.CON));
    }
    this.inventory = new Inventory(capacity);
  }

  mod(stat: StatName): number {
    return statModifier(effectiveStatScore(this.effects, stat, this.stats[stat]));
  }

  trainSkill(taskOrStat: string): void {
    const normalized = taskOrStat.trim().toLowerCase();
    if (!normalized) throw new Error("Training name cannot be empty");
    this.trainedSkills.add(normalized);
  }

  isTrainedIn(taskOrStat: string): boolean {
    return this.trainedSkills.has(taskOrStat.trim().toLowerCase());
  }

  get maxHp(): number {
    return this.baseMaxHp + sumHook(this.effects, "maxHpBonus");
  }

  get title(): string {
    return characterTitle(this.className, this.alignment, this.level);
  }

  /** AC = armor base + DEX (capped by the armor) + readied shield + effect hooks + armor type hooks. */
  get ac(): number {
    const dex = this.mod("DEX");
    const armored = this.wornArmor?.armor;
    const base = armored ? armored.acBase + Math.min(dex, armored.dexCap) : 10 + dex;
    const shield = this.carriedShield && !this.shieldStowed
      ? 2 + (this.carriedShield.magicBonus ?? 0)
      : 0;
    const dualWield = this.handFreeOfShield && this.inventory.all().filter((stack) =>
      stack.def.tags.includes("weapon") && !stack.def.tags.includes("ranged")
    ).reduce((count, stack) => count + stack.qty, 0) >= 2
      ? this.effects.flatMap((effect) => effect.hooks).reduce((sum, hook) => sum + (hook.kind === "dualWieldAcBonus" ? hook.bonus : 0), 0)
      : 0;
    const calculated = base + (this.wornArmor?.magicBonus ?? 0) + shield
      + sumHook(this.effects, "acBonus") + this.armorAcBonus() + dualWield;
    let minimum = calculated;
    for (const effect of this.effects) {
      if (effect.id === "class:sea-wolf:shield-wall" && (!this.carriedShield || this.shieldStowed)) continue;
      for (const hook of effect.hooks) if (hook.kind === "acMinimum") minimum = Math.max(minimum, hook.value);
    }
    return minimum;
  }

  private armorAcBonus(): number {
    let total = 0;
    for (const e of this.effects) {
      for (const h of e.hooks) {
        if (h.kind === "armorAcBonus" && this.wornArmor?.id === h.armorId) {
          total += h.bonus;
        }
      }
    }
    return total;
  }

  /** Wear armor. Class permissions are the armor's, and they are law. */
  equipArmor(def: ItemDef): void {
    if (!def.armor) throw new Error(`${def.name} is not armor`);
    if (!def.armor.classes.includes(this.className)) {
      throw new Error(`A ${this.className} cannot wear ${def.name}`);
    }
    if (def.requiredClass && def.requiredClass !== this.className) throw new Error(`Only a ${def.requiredClass} can wear ${def.name}`);
    if (def.requiredAlignment && def.requiredAlignment !== this.alignment) throw new Error(`${def.name} requires ${def.requiredAlignment} alignment`);
    if (def.forbiddenAlignment === this.alignment) throw new Error(`${def.name} cannot be worn by a ${this.alignment} being`);
    this.wornArmor = def;
  }

  /** Put a weapon in hand. Inventory ownership is enforced by the game/UI layer. */
  equipWeapon(def: ItemDef): void {
    if (!def.tags.includes("weapon") || !def.damage || def.reachTiles === undefined) {
      throw new Error(`${def.name} is not a melee weapon`);
    }
    if (def.requiredClass && def.requiredClass !== this.className) throw new Error(`Only a ${def.requiredClass} can wield ${def.name}`);
    if (def.requiredAlignment && def.requiredAlignment !== this.alignment) throw new Error(`${def.name} requires ${def.requiredAlignment} alignment`);
    if (def.forbiddenAlignment === this.alignment) throw new Error(`${def.name} cannot be wielded by a ${this.alignment} being`);
    this.wieldedWeapon = def;
  }

  /** The active weapon; combat cannot proceed without one. */
  get weapon(): ItemDef {
    if (!this.wieldedWeapon) throw new Error(`${this.name} has no weapon equipped`);
    return this.wieldedWeapon;
  }

  /** Ready a shield (+2 AC, occupies a hand). */
  equipShield(def: ItemDef): void {
    if (!def.shield) throw new Error(`${def.name} is not a shield`);
    this.carriedShield = def;
    this.shieldStowed = false;
  }

  /** A hand is free unless a readied shield fills it. */
  get handFreeOfShield(): boolean {
    return this.carriedShield === null || this.shieldStowed;
  }

  get critThreshold(): number {
    return critThreshold(this.effects);
  }

  get damageBonus(): number {
    return this.damageBonusWith(this.wieldedWeapon?.id);
  }

  /**
   * Flat damage on top of the weapon dice. Weapon Mastery hooks name the weapon
   * they were earned with, so they only pay out while that weapon is in hand.
   */
  damageBonusWith(weaponId: string | undefined): number {
    let total = 0;
    for (const effect of this.effects) {
      for (const hook of effect.hooks) {
        if (hook.kind === "damageBonus" && hookAppliesToWeapon(hook.weaponId, weaponId)) {
          total += hook.bonus;
        }
        if (hook.kind === "damageBonusHalfLevel" && hookAppliesToWeapon(hook.weaponId, weaponId)) {
          total += Math.floor(this.level / 2);
        }
      }
    }
    return total;
  }

  /**
   * Where a "+2 to one of these stats" talent puts its points. Patching a
   * deficiency beats padding a strength, so the weakest offered stat below 10
   * wins; with nothing under 10 the points reinforce the class's primary stat.
   */
  private statBonusTarget(offered: readonly StatName[]): StatName {
    let weakest: StatName | undefined;
    for (const stat of offered) {
      if (this.stats[stat] >= 10) continue;
      if (weakest === undefined || this.stats[stat] < this.stats[weakest]) weakest = stat;
    }
    if (weakest !== undefined) return weakest;

    const primary = PRIMARY_STAT[getBaseRole(this.className)];
    if (!offered.includes(primary)) {
      throw new Error(
        `Stat talent offering ${offered.join("/")} cannot reach ${this.className}'s primary stat ${primary}`,
      );
    }
    return primary;
  }

  /**
   * The weapon a new mastery attaches to: a carried weapon that is not already
   * mastered, preferring the one in hand. Mastering a weapon twice is wasted,
   * and a fighter's first mastery already covers their starting weapon.
   */
  private unmasteredWeaponId(): string {
    const mastered = new Set(
      this.effects.flatMap((effect) =>
        effect.hooks.flatMap((hook) =>
          hook.kind === "damageBonus" && hook.weaponId !== undefined ? [hook.weaponId] : [],
        ),
      ),
    );
    const carried = this.inventory.all()
      .map((stack) => stack.def)
      .filter((def) => def.damage !== undefined);
    const wielded = this.wieldedWeapon;
    const ordered = wielded ? [wielded, ...carried.filter((def) => def.id !== wielded.id)] : carried;
    const choice = ordered.find((def) => !mastered.has(def.id)) ?? ordered[0];
    if (!choice) throw new Error(`${this.name} has no weapon to gain Weapon Mastery with`);
    return choice.id;
  }

  addEffect(effect: Effect): void {
    const resolvedHooks = effect.hooks.flatMap((h) => {
      if (h.kind === "weaponMasteryChoice") {
        const weaponId = this.unmasteredWeaponId();
        return [
          { kind: "checkBonus" as const, applies: "attack" as const, bonus: h.bonus, weaponId },
          { kind: "damageBonus" as const, bonus: h.bonus, weaponId },
        ];
      }
      if (h.kind === "statBonusChoice") {
        const target = this.statBonusTarget(h.stats);
        this.stats[target] = Math.min(20, this.stats[target] + h.bonus);
        return { kind: "statBonus" as const, stat: target, bonus: h.bonus };
      }
      if (h.kind === "statBonus") {
        this.stats[h.stat] = Math.min(20, this.stats[h.stat] + h.bonus);
        return h;
      }
      if (h.kind === "armorAcBonusChoice") {
        const armorId = this.wornArmor ? this.wornArmor.id : (this.className === "thief" ? "leather-armor" : "chainmail");
        return { kind: "armorAcBonus" as const, armorId, bonus: h.bonus };
      }
      return h;
    });
    this.effects.push({ ...effect, hooks: resolvedHooks });
    for (const hook of resolvedHooks) {
      if (hook.kind === "resourceBonus") {
        this.classState.resourceUses[hook.resource] = (this.classState.resourceUses[hook.resource] ?? 0) + hook.bonus;
        if (hook.resource === "omen") this.classState.omenUses = this.classState.resourceUses.omen ?? 0;
      }
    }
  }

  removeEffect(id: string): void {
    this.effects = this.effects.filter((e) => e.id !== id);
  }

  increaseMaxHp(amount: number): void {
    if (amount < 1) throw new Error(`HP increase must be positive, got ${amount}`);
    this.baseMaxHp += amount;
    this.hp += amount;
  }

  permanentlyReduceMaxHp(amount: number): void {
    if (amount < 1 || amount >= this.baseMaxHp) throw new Error(`Invalid permanent HP sacrifice ${amount}`);
    this.baseMaxHp -= amount;
    this.hp = Math.min(this.hp, this.maxHp);
  }

  learnSpell(spellId: string): void {
    if (this.knownSpells.some((s) => s.spellId === spellId)) {
      throw new Error(`${this.name} already knows spell "${spellId}"`);
    }
    this.knownSpells.push({ spellId, status: "available", requiresAtonement: false });
  }

  knownSpell(spellId: string): KnownSpell {
    const s = this.knownSpells.find((k) => k.spellId === spellId);
    if (!s) throw new Error(`${this.name} does not know spell "${spellId}"`);
    return s;
  }

  takeDamage(amount: number): void {
    if (amount < 0) throw new Error(`Damage must be >= 0, got ${amount}`);
    this.hp = Math.max(0, this.hp - amount);
  }

  heal(amount: number): void {
    if (amount < 0) throw new Error(`Healing must be >= 0, got ${amount}`);
    if (this.dead) throw new Error(`${this.name} is dead and cannot be healed`);
    this.hp = Math.min(this.maxHp, this.hp + amount);
    if (this.hp > 0) this.dying = null;
  }
}
