import { getBaseRole, type Alignment, type ClassName, type SpellClass, type RollableTable, type TableEntry, type TreasureQuality } from "../engine";
import { characterTitle } from "../engine";
import type { SaveSlot, SavedCharacter } from "./state";
import type { VisualSkinId, ZonePackId } from "./visual/model";
import { generatedMagicItem, item, plebNameForSeed } from "../data";
import {
  TREASURE_0_3,
  TREASURE_4_6,
  TREASURE_7_9,
  TREASURE_10_PLUS,
  DIABOLICAL_TREASURE,
  DESERT_PLUNDER,
  SEAWOLF_PLUNDER,
} from "../data/tables/treasure";
import { resolveClassForZone } from "./systems/companion";

export type RewardKind = "companion" | "treasure" | "gold" | "spells";

export interface PartyProgress {
  name?: string;
  className: string;
  level: number;
  knownSpellIds: readonly string[];
  dead?: boolean;
}

export interface CompanionReward {
  kind: "companion";
  title: string;
  description: string;
  className: ClassName;
  name: string;
  alignment: Alignment;
  /** Paid on returning this adventurer to civilization when all four slots are occupied. */
  escortGold: number;
}

export interface TreasureReward {
  kind: "treasure";
  title: string;
  description: string;
  itemId: string;
  qty: number;
  valueGp: number;
  quality: TreasureQuality;
  tableId: string;
  roll: number;
  entryMin: number;
  entryMax: number;
}

export interface GoldReward {
  kind: "gold";
  title: string;
  description: string;
  amount: number;
}

export interface SpellReward {
  kind: "spells";
  title: string;
  description: string;
  spellId: string;
  className: SpellClass;
}

export type DungeonReward = CompanionReward | TreasureReward | GoldReward | SpellReward;

const COMPANION_CLASSES = ["fighter", "thief", "priest", "wizard"] as const;

/** Shadowdark unlock bands: tiers 1-5 arrive at levels 1, 3, 5, 7, and 9. */
export function maximumSpellTier(level: number): number {
  if (!Number.isInteger(level) || level < 1) throw new Error("Caster level must be a positive integer");
  return Math.min(5, Math.ceil(level / 2));
}

function stableIndex(seed: number, size: number): number {
  if (size < 1) throw new Error("Cannot choose from an empty reward pool");
  let value = (seed ^ 0x9e3779b9) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
  value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
  return ((value ^ (value >>> 15)) >>> 0) % size;
}

/** Shadowdark's own tier bands: 0-3, 4-6, 7-9, 10 (the level cap). */
function levelBandTable(maxLevel: number): RollableTable {
  if (maxLevel <= 3) return TREASURE_0_3;
  if (maxLevel <= 6) return TREASURE_4_6;
  if (maxLevel <= 9) return TREASURE_7_9;
  return TREASURE_10_PLUS;
}

/** Only the three original Cursed Scrolls have a dedicated flavor table so far. */
const ZONE_FLAVOR_TABLES: Partial<Record<ZonePackId, RollableTable>> = {
  diablerie: DIABOLICAL_TREASURE,
  "red-sands": DESERT_PLUNDER,
  "midnight-sun": SEAWOLF_PLUNDER,
};

/**
 * Picks one entry from `table` using a seed hash instead of the engine's dice —
 * the reward must stay a pure function of (dungeonIndex, party) so a reloaded
 * save reproduces the exact same vault reward without replaying every prior
 * dice roll (see the `stableIndex` calls throughout this file).
 */
function rollTableEntry(table: RollableTable, seed: number): { entry: TableEntry; roll: number } {
  const first = table.entries[0]!;
  const last = table.entries[table.entries.length - 1]!;
  const span = last.max - first.min + 1;
  const roll = first.min + stableIndex(seed, span);
  const entry = table.entries.find((e) => roll >= e.min && roll <= e.max);
  if (!entry) throw new Error(`Table "${table.id}" has no entry for roll ${roll}`);
  return { entry, roll };
}

/**
 * Resolves either treasure reward-cycle slot against the registered core and
 * Cursed Scroll treasure tables. The result's kind describes what was rolled,
 * not the old scheduled "weapon"/"armor" slot. Banded by the party's
 * furthest-advanced level; a Cursed Scroll destination has a chance to roll its
 * own flavor table instead of the level-banded core one.
 */
function rollVaultTreasure(
  rewardSlot: number,
  dungeonIndex: number,
  party: readonly PartyProgress[],
  zone: ZonePackId | undefined,
): TreasureReward | GoldReward {
  const living = party.filter((member) => !member.dead);
  const maxLevel = living.length > 0 ? Math.max(...living.map((member) => member.level)) : 1;
  const partySalt = party.reduce((acc, m, i) => acc + m.className.charCodeAt(0) * (i + 1), 0);
  const slotSalt = rewardSlot + 1;
  const flavorTable = zone ? ZONE_FLAVOR_TABLES[zone] : undefined;
  const useFlavor = flavorTable !== undefined
    && stableIndex(dungeonIndex * 353 + partySalt + slotSalt * 61, 100) < 40;
  const table = useFlavor ? flavorTable! : levelBandTable(maxLevel);
  const rolled = rollTableEntry(table, dungeonIndex * 2711 + partySalt * 97 + slotSalt);
  const { entry } = rolled;

  const data = entry.data as { itemId?: string; valueGp?: number; qty?: number; cp?: number } | undefined;
  if (!data) throw new Error(`Treasure entry "${entry.text}" has no data payload`);
  if (!data.itemId) {
    const amount = Math.max(1, Math.round(data.cp ?? data.valueGp ?? 0));
    return { kind: "gold", title: "A Meager Find", description: entry.text, amount };
  }
  const baseDef = item(data.itemId);
  const spellRoll = stableIndex(dungeonIndex * 1877 + partySalt * 43 + slotSalt * 101, 12) + 1;
  const def = generatedMagicItem(baseDef.id, spellRoll);
  const qty = data.qty ?? 1;
  const valueGp = data.valueGp ?? (def.valueGp ?? 0) * qty;
  const quality = def.treasureQuality
    ?? (valueGp < 10 ? "poor" : valueGp >= 300 ? "fabulous" : "normal");
  return {
    kind: "treasure",
    title: def.name,
    description: entry.text,
    itemId: def.id,
    qty,
    valueGp,
    quality,
    tableId: table.id,
    roll: rolled.roll,
    entryMin: entry.min,
    entryMax: entry.max,
  };
}

function missingCompanion(
  party: readonly PartyProgress[],
  dungeonIndex: number,
  zone?: ZonePackId,
): CompanionReward {
  const living = party.filter((member) => !member.dead);
  const missing = COMPANION_CLASSES.filter(
    (baseRole) => !party.some((member) => !member.dead && getBaseRole(member.className as ClassName) === baseRole),
  );
  const choices = missing.length > 0 ? missing : COMPANION_CLASSES;
  const partySalt = party.reduce((acc, m, i) => acc + m.className.charCodeAt(0) * (i + 1), 0);
  const pickIndex = stableIndex(dungeonIndex * 1337 + partySalt + 42, choices.length);
  const baseRole = choices[pickIndex]!;
  const roll50 = stableIndex(dungeonIndex * 773 + partySalt + 19, 100) < 50;
  const className = resolveClassForZone(baseRole, zone, roll50);
  const usedNames = new Set(party.flatMap((member) => member.name ? [member.name] : []));
  const name = plebNameForSeed(dungeonIndex * 977 + stableIndex(dungeonIndex + 31, 997), usedNames);
  const alignmentRoll = stableIndex(dungeonIndex * 131 + 17, 6) + 1;
  const alignment: Alignment = alignmentRoll <= 3 ? "law" : alignmentRoll <= 5 ? "neutral" : "chaos";
  const title = characterTitle(className, alignment, 1);
  const partyLevel = living.length > 0
    ? Math.max(1, Math.floor(living.reduce((sum, member) => sum + member.level, 0) / living.length))
    : 1;
  return {
    kind: "companion",
    title: `${name} the ${title}`,
    description: `${name} joins the surviving party for future dungeons.`,
    className,
    name,
    alignment,
    escortGold: 10 * partyLevel,
  };
}

export function chooseDungeonReward(
  dungeonIndex: number,
  party: readonly PartyProgress[],
  zone?: ZonePackId,
): DungeonReward {
  if (!Number.isInteger(dungeonIndex)) throw new Error("Dungeon index must be an integer");
  const companion = missingCompanion(party, dungeonIndex, zone);
  const partySalt = party.reduce((acc, member, index) =>
    acc + member.className.charCodeAt(0) * (index + 1) + member.level * 17, 0);
  const rescue = stableIndex(dungeonIndex * 4099 + partySalt + 211, 2) === 0;
  return rescue ? companion : rollVaultTreasure(0, dungeonIndex, party, zone);
}

export function progressFromSavedParty(party: readonly SavedCharacter[]): PartyProgress[] {
  return party.map((member) => ({
    name: member.name,
    className: member.className,
    level: member.level,
    knownSpellIds: member.knownSpells.map((known) => known.spellId),
    dead: member.dead,
  }));
}

import { pickSkinForScrollRun } from "./biomeChoice";

export function nextDungeonSave(
  current: Pick<SaveSlot, "coinsBanked" | "spendableGold" | "messages" | "runSeed" | "porter">,
  dungeonIndex: number,
  party: SavedCharacter[],
  chosenZone: ZonePackId,
  vaultsInScrollOrTs?: number,
  vaultsCompletedInScroll?: number,
  skinHistoryInScroll?: VisualSkinId[],
  timestamp = Date.now(),
): SaveSlot {
  let vaultsInScroll: number | undefined;
  let ts = timestamp;
  if (
    typeof vaultsInScrollOrTs === "number" &&
    vaultsCompletedInScroll === undefined &&
    skinHistoryInScroll === undefined &&
    vaultsInScrollOrTs > 100
  ) {
    ts = vaultsInScrollOrTs;
  } else {
    vaultsInScroll = vaultsInScrollOrTs;
  }

  const nextIndex = dungeonIndex + 1;
  const layoutSeed = ((current.runSeed ?? 0) + nextIndex) >>> 0;
  const skin = pickSkinForScrollRun(chosenZone, skinHistoryInScroll ?? [], layoutSeed);
  const updatedHistory = [...(skinHistoryInScroll ?? []), skin.id];
  return {
    ...current,
    slotId: 0,
    timestamp: ts,
    dungeonIndex: nextIndex,
    runSeed: current.runSeed,
    zone: chosenZone,
    vaultsInScroll,
    vaultsCompletedInScroll,
    skinHistoryInScroll: updatedHistory,
    skinId: skin.id,
    currentRoom: 1,
    hasCrown: false,
    kills: 0,
    party: party.filter((member) => !member.dead),
    rescuedIds: party.filter((member) => !member.dead).map((member) => member.className),
  };
}
