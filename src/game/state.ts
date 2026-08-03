import type {
  Alignment,
  Ancestry,
  Character,
  ClassState,
  DyingState,
  Effect,
  Engine,
  ItemInstanceState,
  KnownSpell,
  OathState,
  PatronState,
  Stats,
  VoiceRegister,
} from "../engine";
import { Character as EngineCharacter, applySessionItemEffects, initializeClassState, parseAncestry } from "../engine";
import { item, unlockClassSpellsForLevel } from "../data";
import type { VisualSkinId, ZonePackId } from "./visual/model";

interface SavedInventoryItem {
  itemId: string;
  qty: number;
}

export interface SavedPorter {
  name: string;
  ownerId: string;
  hp: number;
  inventory: SavedInventoryItem[];
}

export interface PlacedGearState {
  id: string;
  itemId: "rope" | "grappling-hook" | "oil-flask" | "mirror" | "torch";
  x: number;
  y: number;
  mode: "climb" | "slick" | "fire" | "peek" | "light";
  /** Lit oil and torches expire in gameplay time instead of creating permanent free light. */
  burnRemainingMs?: number;
}

export interface SavedCharacter {
  id: string;
  name: string;
  className: string;
  /** Optional for backward compatibility with saves created before character identity data. */
  alignment?: Alignment;
  ancestry?: Ancestry;
  /** Permanent trained tasks used by the auto-success check rule. */
  trainedSkills?: string[];
  /** Optional for backward compatibility with saves created before character voices. */
  voiceRegister?: VoiceRegister;
  stats: Stats;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  knownSpells: KnownSpell[];
  effects: Effect[];
  inventory: SavedInventoryItem[];
  /** Per-item-id charges/inertness/breakage. Absent on saves from before usable items. */
  itemState?: [string, ItemInstanceState][];
  wornArmorId: string | null;
  wieldedWeaponId: string | null;
  carriedShieldId: string | null;
  shieldStowed: boolean;
  luckToken: boolean;
  /** Alternate-class per-rest resources. Optional for pre-Phase-2 saves. */
  classState?: ClassState;
  dying: DyingState | null;
  dead: boolean;
}

export interface SaveSlot {
  slotId: number;
  timestamp: number;
  dungeonIndex: number;
  /** Stable layout seed for this expedition; absent in saves from before procedural runs. */
  runSeed?: number;
  /** The cursed-scroll biome the party is currently in; absent in saves from before biome choice. */
  zone?: ZonePackId;
  /** Total number of vaults (1d6) in the current Cursed Scroll destination run. */
  vaultsInScroll?: number;
  /** Number of vaults completed so far in this scroll run. */
  vaultsCompletedInScroll?: number;
  /** Visual skins used so far in this scroll run (max 2x per skin). */
  skinHistoryInScroll?: VisualSkinId[];
  /** The specific visual skin resolved within that scroll for this dungeon. */
  skinId?: VisualSkinId;
  /** Region id of the room last occupied, e.g. "room-3" or "sanctuary". */
  roomId?: string;
  /** @deprecated Legacy 1-based room index (1-6); read only to migrate old saves. */
  currentRoom?: number;
  /** Requirements acquired or switches activated in the current non-linear layout. */
  activatedRequirementIds?: string[];
  /** Non-linear connector ids opened, revealed, or broken during this run. */
  openedConnectorIds?: string[];
  /** Recoverable exploration gear placed into the current dungeon. */
  placedGear?: PlacedGearState[];
  /** At most one town downtime activity may be completed in a vault visit. */
  downtimeUsed?: boolean;
  /** Failed instructor attempts lower the next DC, keyed by character and skill. */
  trainingFailures?: Record<string, number>;
  /** Destination-length Midnight Sun vows, one per participating character. */
  oaths?: OathState[];
  /** Diablerie patron bargains and their bounded favor/demand state. */
  patrons?: PatronState[];
  /** Deterministic talkable-NPC conversation progress keyed by NPC id. */
  npcInteractionStates?: Record<string, "unmet" | "heard" | "resolved" | "hostile-npc" | "hostile-allies" | "departed">;
  /** Stable ids of rooms revealed on the compact expedition map. */
  discoveredRoomIds?: string[];
  /** @deprecated Legacy open-terrain timeout value. Ignored when loading. */
  survivalRemainingMs?: number;
  /** Open-terrain danger track and progress toward its next travel-and-kill trigger. */
  /** @deprecated Party-wide counters, replaced by per-character {@link dangerFails}. */
  dangerFlags?: number;
  /** @deprecated Party-wide counters, replaced by per-character {@link dangerFails}. */
  dangerChecks?: number;
  /** Per-character danger-track fails accrued this zone, keyed by character id. */
  dangerFails?: Record<string, number>;
  dangerDistancePx?: number;
  dangerKillPending?: boolean;
  hasCrown: boolean;
  kills: number;
  /**
   * Stable source ids for treasure already collected in this dungeon. This
   * prevents a reloaded pile or defeated encounter from awarding coin, items,
   * or XP twice.
   */
  claimedTreasureFindIds?: string[];
  coinsBanked: number;
  /** Spendable shop wallet, separate from the cumulative coin ledger. Absent
   * on legacy saves, which seed it from coinsBanked on load. */
  spendableGold?: number;
  /** Optional hired porter and the loot entrusted to them. */
  porter?: SavedPorter;
  /** A failed recruitment roll cannot be spammed by reopening or reloading this shop. */
  porterHireAttempted?: boolean;
  party: SavedCharacter[];
  rescuedIds: string[]; // Classes of characters already rescued
  messages: { text: string; color: string }[];
}

export function serializeCharacter(c: Character): SavedCharacter {
  const inventory: SavedInventoryItem[] = c.inventory.all().map((stack) => ({
    itemId: stack.def.id,
    qty: stack.qty,
  }));

  return {
    id: c.id,
    name: c.name,
    className: c.className,
    alignment: c.alignment,
    ancestry: c.ancestry,
    trainedSkills: [...c.trainedSkills],
    voiceRegister: c.voiceRegister,
    stats: c.stats,
    level: c.level,
    xp: c.xp,
    hp: c.hp,
    maxHp: c.maxHp, // Character.maxHp includes effects, but constructor sets baseMaxHp
    knownSpells: c.knownSpells.map((s) => ({ ...s })),
    effects: c.effects.map((e) => ({ ...e })),
    itemState: c.itemState.entries().map(([id, s]) => [id, { ...s }]),
    inventory,
    wornArmorId: c.wornArmor?.id ?? null,
    wieldedWeaponId: c.wieldedWeapon?.id ?? null,
    carriedShieldId: c.carriedShield?.id ?? null,
    shieldStowed: c.shieldStowed,
    luckToken: c.luckToken,
    classState: {
      ...c.classState,
      resourceUses: { ...c.classState.resourceUses },
      oldGods: [...c.classState.oldGods],
      cauldronItems: c.classState.cauldronItems.map((entry) => ({ ...entry })),
    },
    dying: c.dying ? { ...c.dying } : null,
    dead: c.dead,
  };
}

export function deserializeCharacter(state: SavedCharacter, _engine: Engine): Character {
  const c = new EngineCharacter({
    id: state.id,
    name: state.name,
    className: state.className as any,
    alignment: state.alignment ?? "neutral",
    ancestry: parseAncestry(state.ancestry ?? "human"),
    voiceRegister: state.voiceRegister,
    stats: state.stats,
    maxHp: state.hp, // Set initial hp to prevent maxHp calculation issues during init
  });

  // Re-assign correct levels, base max Hp, and other values
  c.level = state.level;
  c.xp = state.xp;
  (c as any).baseMaxHp = state.maxHp;
  c.hp = state.hp;
  c.luckToken = state.luckToken;
  initializeClassState(c);
  c.classState = {
    ...c.classState,
    ...(state.classState ?? {}),
    resourceUses: { ...c.classState.resourceUses, ...(state.classState?.resourceUses ?? {}) },
    oldGods: [...(state.classState?.oldGods ?? c.classState.oldGods)],
    cauldronItems: (state.classState?.cauldronItems ?? []).map((entry) => ({ ...entry })),
  };
  c.dead = state.dead;
  c.dying = state.dying ? { ...state.dying } : null;
  c.knownSpells = state.knownSpells.map((s) => ({ ...s }));
  unlockClassSpellsForLevel(c);
  // Focus is an active scene relationship (targets, areas, light positions),
  // so it ends cleanly rather than reviving stale references after load/transition.
  c.effects = state.effects.filter((effect) => effect.duration?.unit !== "focus").map((e) => ({ ...e }));
  for (const skill of state.trainedSkills ?? []) c.trainSkill(skill);
  // Saves from the first instructor implementation encoded training only as
  // an effect. Promote those markers into the explicit trained-skill set.
  for (const effect of c.effects) {
    if (effect.id.startsWith("training:")) c.trainSkill(effect.id.slice("training:".length));
  }
  c.itemState.load((state.itemState ?? []).map(([id, s]) => [id, { ...s }]));
  c.shieldStowed = state.shieldStowed;

  // Restore inventory (stripping legacy coins which live in shared party purse).
  for (const itemState of state.inventory) {
    if (itemState.itemId === "coins") {
      continue;
    }
    c.inventory.add(item(itemState.itemId), itemState.qty, true);
  }
  applySessionItemEffects(c);

  // Restore equipment
  if (state.wornArmorId) c.wornArmor = item(state.wornArmorId);
  if (state.wieldedWeaponId) c.wieldedWeapon = item(state.wieldedWeaponId);
  if (state.carriedShieldId) c.carriedShield = item(state.carriedShieldId);

  return c;
}
