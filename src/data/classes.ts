import type { ClassName, Effect, StatName } from "../engine";

export interface ClassDef {
  name: ClassName;
  displayName: string;
  hitDie: string;
  startingWeaponId: string;
  /** Starting armor kit: worn armor id (null = unarmored) and optional shield. */
  armorId: string | null;
  startsWithShield: boolean;
  talentTableId: string;
  castStat?: StatName;
  startingSpellIds: readonly string[];
  /** Baseline class features as permanent effect hooks. */
  features: readonly Effect[];
}

const CLASS_LIST: readonly ClassDef[] = [
  {
    name: "fighter",
    displayName: "Fighter",
    hitDie: "1d8",
    startingWeaponId: "spear",
    armorId: "chainmail",
    startsWithShield: true,
    talentTableId: "fighter-talents",
    startingSpellIds: [],
    features: [
      {
        // Mastery is per weapon type. The first one lands on the fighter's
        // starting weapon; `weaponId` is filled in at character creation.
        id: "feat-fighter-weapon-mastery",
        name: "Weapon Mastery: +1 to attack and damage, +half level to attack and damage",
        hooks: [
          { kind: "checkBonus", applies: "attack", bonus: 1 },
          { kind: "checkBonusHalfLevel", applies: "attack" },
          { kind: "damageBonus", bonus: 1 },
          { kind: "damageBonusHalfLevel" },
        ],
      },
    ],
  },
  {
    name: "thief",
    displayName: "Thief",
    hitDie: "1d4",
    startingWeaponId: "shortsword",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "thief-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-thief-nimble",
        name: "Nimble: advantage on initiative",
        hooks: [{ kind: "advantageOn", applies: "initiative" }],
      },
    ],
  },
  {
    name: "priest",
    displayName: "Priest",
    hitDie: "1d6",
    startingWeaponId: "mace",
    armorId: "chainmail",
    startsWithShield: true,
    talentTableId: "priest-talents",
    castStat: "WIS",
    startingSpellIds: ["cure-wounds", "turn-undead"],
    features: [],
  },
  {
    name: "wizard",
    displayName: "MagicUser",
    hitDie: "1d4",
    startingWeaponId: "staff",
    armorId: null,
    startsWithShield: false,
    talentTableId: "wizard-talents",
    castStat: "INT",
    startingSpellIds: ["magic-missile", "mage-armor"],
    features: [],
  },
  {
    name: "pit-fighter",
    displayName: "Gladiator",
    hitDie: "1d8",
    startingWeaponId: "longsword",
    armorId: "leather-armor",
    startsWithShield: true,
    talentTableId: "pit-fighter-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-pit-fighter-flourish",
        name: "Flourish: regain 1d6 HP on melee hit (3/day)",
        hooks: [],
      },
      {
        id: "feat-pit-fighter-implacable",
        name: "Implacable: advantage on CON checks to resist injury/poison",
        hooks: [{ kind: "advantageOnStat", stat: "CON" }],
      },
      { id: "feat-pit-fighter-last-stand", name: "Last Stand: rise from dying on 18-20", hooks: [] },
      { id: "feat-pit-fighter-relentless", name: "Relentless: 3/day DC 18 CON to remain at 1 HP", hooks: [] },
    ],
  },
  {
    name: "sea-wolf",
    displayName: "Sea Wolf",
    hitDie: "1d8",
    startingWeaponId: "spear",
    armorId: "chainmail",
    startsWithShield: true,
    talentTableId: "sea-wolf-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-sea-wolf-shield-wall",
        name: "Shield Wall: AC becomes 20 in defensive stance with a shield",
        hooks: [],
      },
      {
        id: "feat-sea-wolf-seafarer",
        name: "Seafarer: advantage on navigation and boating",
        hooks: [{ kind: "seafarer" }],
      },
      { id: "feat-sea-wolf-old-gods", name: "Old Gods: choose Odin, Freya, or Loki each day", hooks: [] },
    ],
  },
  {
    name: "ras-godai",
    displayName: "Ras-Godai",
    hitDie: "1d6",
    startingWeaponId: "dagger",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "ras-godai-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-ras-godai-assassin",
        name: "Assassin: advantage on stealth/hiding, double damage vs unaware targets",
        hooks: [{ kind: "advantageOn", applies: "stealth" }],
      },
      { id: "feat-ras-godai-smoke-step", name: "Smoke Step: teleport within near 3/day without an action", hooks: [] },
    ],
  },
  {
    name: "witch",
    displayName: "Witch",
    hitDie: "1d4",
    startingWeaponId: "staff",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "witch-talents",
    castStat: "CHA",
    startingSpellIds: ["cauldron", "witchlight"],
    features: [
      {
        id: "feat-witch-familiar",
        name: "Familiar: small loyal animal serves as spellcasting origin",
        hooks: [],
      },
    ],
  },
  {
    name: "seer",
    displayName: "Seer",
    hitDie: "1d6",
    startingWeaponId: "staff",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "seer-talents",
    castStat: "WIS",
    startingSpellIds: ["chant", "evoke-rage"],
    features: [
      {
        id: "feat-seer-destined",
        name: "Destined: add 1d6 when spending luck tokens",
        hooks: [],
      },
      { id: "feat-seer-omen", name: "Omen: 3/day, DC 9 WIS to gain a Luck token", hooks: [] },
    ],
  },
  {
    name: "cleric",
    displayName: "Cleric",
    hitDie: "1d6",
    startingWeaponId: "mace",
    armorId: "chainmail",
    startsWithShield: true,
    talentTableId: "priest-talents",
    castStat: "WIS",
    startingSpellIds: ["cure-wounds", "turn-undead"],
    features: [],
  },
  {
    name: "magic-user",
    displayName: "MagicUser",
    hitDie: "1d4",
    startingWeaponId: "staff",
    armorId: null,
    startsWithShield: false,
    talentTableId: "wizard-talents",
    castStat: "INT",
    startingSpellIds: ["magic-missile", "mage-armor"],
    features: [],
  },
  {
    name: "bard",
    displayName: "Bard",
    hitDie: "1d6",
    startingWeaponId: "shortsword",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "bard-talents",
    castStat: "CHA",
    startingSpellIds: ["charm", "song-of-rest"],
    features: [
      {
        id: "feat-bard-inspire",
        name: "Inspire: +1 to party attack rolls and saving throws",
        hooks: [{ kind: "checkBonus", applies: "attack", bonus: 1 }],
      },
    ],
  },
  {
    name: "monk",
    displayName: "Monk",
    hitDie: "1d8",
    startingWeaponId: "staff",
    armorId: null,
    startsWithShield: false,
    talentTableId: "monk-talents",
    castStat: "WIS",
    startingSpellIds: [],
    features: [
      {
        id: "feat-monk-unarmored",
        name: "Unarmored Defense: AC = 10 + DEX + WIS",
        hooks: [],
      },
      {
        id: "feat-monk-ki-dodge",
        name: "Ki Dodge: advantage on DEX saving throws",
        hooks: [{ kind: "advantageOnStat", stat: "DEX" }],
      },
    ],
  },
  {
    name: "necromancer",
    displayName: "Necromancer",
    hitDie: "1d4",
    startingWeaponId: "dagger",
    armorId: null,
    startsWithShield: false,
    talentTableId: "necromancer-talents",
    castStat: "CHA",
    startingSpellIds: ["siphon-life", "animate-thrall"],
    features: [],
  },
  {
    name: "paladin",
    displayName: "Paladin",
    hitDie: "1d10",
    startingWeaponId: "longsword",
    armorId: "plate-mail",
    startsWithShield: true,
    talentTableId: "paladin-talents",
    castStat: "CHA",
    startingSpellIds: ["smite", "lay-on-hands"],
    features: [
      {
        id: "feat-paladin-smite",
        name: "Divine Smite: +1d8 radiant damage vs undead/evil",
        hooks: [],
      },
    ],
  },
  {
    name: "ranger",
    displayName: "Ranger",
    hitDie: "1d8",
    startingWeaponId: "longbow",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "ranger-talents",
    castStat: "INT",
    startingSpellIds: [],
    features: [
      {
        id: "feat-ranger-ranged-master",
        name: "Ranged Master: +1 to ranged attack and damage rolls",
        hooks: [
          { kind: "checkBonus", applies: "attack", bonus: 1 },
          { kind: "damageBonus", bonus: 1 },
        ],
      },
    ],
  },
  {
    name: "seawolf",
    displayName: "Barbarian",
    hitDie: "1d8",
    startingWeaponId: "spear",
    armorId: "chainmail",
    startsWithShield: true,
    talentTableId: "sea-wolf-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-seawolf-reckless",
        name: "Reckless Attack: swap shield wall for melee attack advantage",
        hooks: [{ kind: "advantageOn", applies: "attack" }],
      },
    ],
  },
  {
    name: "warlock",
    displayName: "Warlock",
    hitDie: "1d6",
    startingWeaponId: "dagger",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "warlock-talents",
    castStat: "CHA",
    startingSpellIds: ["eldritch-blast"],
    features: [
      {
        id: "feat-warlock-pact",
        name: "Pact Magic: bound to a cosmic patron",
        hooks: [],
      },
    ],
  },
  {
    name: "basilisk-warrior",
    displayName: "Basilisk Warrior",
    hitDie: "1d10",
    startingWeaponId: "greatsword",
    armorId: "plate-mail",
    startsWithShield: false,
    talentTableId: "basilisk-warrior-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-basilisk-stone-skin",
        name: "Stone Skin: +2 bonus AC",
        hooks: [{ kind: "acBonus", bonus: 2 }],
      },
    ],
  },
  {
    name: "roustabout",
    displayName: "Roustabout",
    hitDie: "1d8",
    startingWeaponId: "mace",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "roustabout-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-roustabout-brawler",
        name: "Tavern Brawler: +1 unarmed and improvised weapon damage",
        hooks: [{ kind: "damageBonus", bonus: 1 }],
      },
    ],
  },
  {
    name: "delver",
    displayName: "Delver",
    hitDie: "1d6",
    startingWeaponId: "mace",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "delver-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-delver-dungeon-expert",
        name: "Dungeon Expert: advantage on secret door detection and trap evasion",
        hooks: [{ kind: "advantageOn", applies: "traps" }],
      },
    ],
  },
  {
    name: "duelist",
    displayName: "Duelist",
    hitDie: "1d6",
    startingWeaponId: "shortsword",
    armorId: "leather-armor",
    startsWithShield: false,
    talentTableId: "duelist-talents",
    startingSpellIds: [],
    features: [
      {
        id: "feat-duelist-riposte",
        name: "Riposte: counter-attack on melee miss",
        hooks: [],
      },
    ],
  },
];

const CLASSES = new Map(CLASS_LIST.map((c) => [c.name, c]));

export function classDef(name: ClassName): ClassDef {
  const def = CLASSES.get(name);
  if (!def) throw new Error(`Unknown class "${name}"`);
  return def;
}
