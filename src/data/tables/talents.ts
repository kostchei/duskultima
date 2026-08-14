/**
 * Class talent tables (2d6, rolled at level-up). Entry text is original
 * paraphrase; effects are structured hooks the engine applies directly.
 */

import type { RollableTable } from "../../engine";

export const FIGHTER_TALENTS: RollableTable = {
  id: "fighter-talents",
  name: "Fighter Talents",
  dice: "2d6",
  entries: [
    {
      min: 2,
      max: 2,
      text: "Gain Weapon Mastery with one additional weapon type: +1 to attack and damage",
      effects: [{ kind: "weaponMasteryChoice", bonus: 1 }],
    },
    {
      min: 3,
      max: 6,
      text: "+1 to melee and ranged attacks",
      effects: [{ kind: "checkBonus", applies: "attack", bonus: 1 }],
    },
    {
      min: 7,
      max: 9,
      text: "+2 to Strength, Dexterity, or Constitution stat",
      effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON"], bonus: 2 }],
    },
    {
      min: 10,
      max: 11,
      text: "Choose one kind of armor. You get +1 AC from that armor",
      effects: [{ kind: "armorAcBonusChoice", bonus: 1 }],
    },
    {
      min: 12,
      max: 12,
      text: "Choose one option from the Fighter talent table",
      talent: [{ kind: "chooseTalent", tableId: "fighter-talents" }],
    },
  ],
};

export const THIEF_TALENTS: RollableTable = {
  id: "thief-talents",
  name: "Thief Talents",
  dice: "2d6",
  entries: [
    {
      min: 2,
      max: 2,
      text: "Gain advantage on initiative rolls (reroll if duplicate)",
      effects: [{ kind: "advantageOn", applies: "initiative" }],
    },
    {
      min: 3,
      max: 6,
      text: "Backstab deals +1 additional weapon die",
      effects: [{ kind: "extraWeaponDamageDice", count: 1, unawareOnly: true }],
    },
    {
      min: 7,
      max: 9,
      text: "+2 to Strength, Dexterity, or Charisma score",
      effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CHA"], bonus: 2 }],
    },
    {
      min: 10,
      max: 11,
      text: "+1 to melee and ranged attacks",
      effects: [{ kind: "checkBonus", applies: "attack", bonus: 1 }],
    },
    {
      min: 12,
      max: 12,
      text: "Choose one option from the Thief talent table",
      talent: [{ kind: "chooseTalent", tableId: "thief-talents" }],
    },
  ],
};

export const PRIEST_TALENTS: RollableTable = {
  id: "priest-talents",
  name: "Priest Talents",
  dice: "2d6",
  entries: [
    {
      min: 2,
      max: 2,
      text: "Gain advantage on casting one spell you know",
      talent: [{ kind: "advantageKnownSpell" }],
    },
    {
      min: 3,
      max: 6,
      text: "+1 to melee and ranged attacks",
      effects: [{ kind: "checkBonus", applies: "attack", bonus: 1 }],
    },
    {
      min: 7,
      max: 9,
      text: "+1 to cleric spellcasting checks",
      effects: [{ kind: "checkBonus", applies: "spellcast", bonus: 1 }],
    },
    {
      min: 10,
      max: 11,
      text: "+2 to Strength or Wisdom score",
      effects: [{ kind: "statBonusChoice", stats: ["STR", "WIS"], bonus: 2 }],
    },
    {
      min: 12,
      max: 12,
      text: "Choose one option from the Cleric talent table",
      talent: [{ kind: "chooseTalent", tableId: "priest-talents" }],
    },
  ],
};

export const WIZARD_TALENTS: RollableTable = {
  id: "wizard-talents",
  name: "Wizard Talents",
  dice: "2d6",
  entries: [
    {
      min: 2,
      max: 2,
      text: "Make one random magic item of a type you choose",
      effects: [],
    },
    {
      min: 3,
      max: 7,
      text: "+2 to Intelligence or +1 to wizard spellcasting checks",
      effects: [{ kind: "statOrCheckChoice", stat: "INT", statBonus: 2, applies: "spellcast", checkBonus: 1 }],
    },
    {
      min: 8,
      max: 9,
      text: "Gain advantage on casting one spell you know",
      talent: [{ kind: "advantageKnownSpell" }],
    },
    {
      min: 10,
      max: 11,
      text: "Learn one additional wizard spell of any tier you know",
      talent: [{ kind: "learnSpell", spells: [
        { id: "magic-missile", tier: 1 }, { id: "mage-armor", tier: 1 }, { id: "misty-step", tier: 2 },
        { id: "fireball", tier: 3 }, { id: "cloudkill", tier: 4 }, { id: "prismatic-orb", tier: 5 },
      ] }],
    },
    {
      min: 12,
      max: 12,
      text: "Choose one option from the Wizard talent table",
      talent: [{ kind: "chooseTalent", tableId: "wizard-talents" }],
    },
  ],
};

export const PIT_FIGHTER_TALENTS: RollableTable = {
  id: "pit-fighter-talents", name: "Pit Fighter Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "1/day, ignore all damage and effects from one attack", effects: [{ kind: "resourceBonus", resource: "ignoreAttack", bonus: 1 }] },
    { min: 3, max: 6, text: "+1 to melee attacks and damage", effects: [{ kind: "checkBonus", applies: "meleeAttack", bonus: 1 }, { kind: "meleeDamageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength or Constitution stat, or +3 HP", effects: [{ kind: "statOrHpChoice", stats: ["STR", "CON"], statBonus: 2, hpBonus: 3 }] },
    { min: 10, max: 11, text: "Increase Flourish healing by 1d6", effects: [{ kind: "flourishExtraDie", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const SEA_WOLF_TALENTS: RollableTable = {
  id: "sea-wolf-talents", name: "Sea Wolf Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "1/day, go berserk: immune to damage for 3 rounds", effects: [{ kind: "resourceBonus", resource: "berserk", bonus: 1 }] },
    { min: 3, max: 6, text: "Your attacks deal +1 damage", effects: [{ kind: "damageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength or Constitution stat, or +1 to attacks", effects: [{ kind: "statOrCheckChoice", stat: "STR", statBonus: 2, applies: "attack", checkBonus: 1 }] },
    { min: 10, max: 11, text: "Duality: choose two different Old Gods effects each day", effects: [{ kind: "oldGodDuality" }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const RAS_GODAI_TALENTS: RollableTable = {
  id: "ras-godai-talents", name: "Ras-Godai Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Trained in the use of poisons", effects: [] },
    { min: 3, max: 6, text: "Roll an additional Black Lotus talent", talent: [{ kind: "rollTable", tableId: "black-lotus-talents", count: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength or Dexterity, or +1 to melee attacks", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX"], bonus: 2 }] },
    { min: 10, max: 11, text: "Gain an additional use of Smoke Step", effects: [{ kind: "resourceBonus", resource: "smokeStep", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

const WITCH_SPELLS = [
  { id: "cauldron", tier: 1 }, { id: "witchlight", tier: 1 },
  { id: "spidersilk", tier: 2 }, { id: "bogboil", tier: 2 },
  { id: "broomstick", tier: 3 }, { id: "speak-with-dead", tier: 3 },
  { id: "dimension-door", tier: 4 }, { id: "polymorph", tier: 4 },
  { id: "scrying", tier: 5 }, { id: "shapechange", tier: 5 },
] as const;

const SEER_SPELLS = [
  { id: "chant", tier: 1 }, { id: "evoke-rage", tier: 1 },
  { id: "fate", tier: 2 }, { id: "read-runes", tier: 2 },
  { id: "cast-out", tier: 3 }, { id: "wolfshape", tier: 3 },
  { id: "odins-wisdom", tier: 4 }, { id: "thors-thunder", tier: 4 },
  { id: "world-tree", tier: 5 }, { id: "world-serpent", tier: 5 },
] as const;

export const WITCH_TALENTS: RollableTable = {
  id: "witch-talents", name: "Witch Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "1/day, teleport to your familiar's location as a move", effects: [{ kind: "resourceBonus", resource: "familiarTeleport", bonus: 1 }] },
    { min: 3, max: 7, text: "+2 to Charisma or +1 to witch spellcasting checks", effects: [{ kind: "statBonus", stat: "CHA", bonus: 2 }] },
    { min: 8, max: 9, text: "Gain advantage on casting one spell you know", talent: [{ kind: "advantageKnownSpell" }] },
    { min: 10, max: 11, text: "Learn an additional witch spell of any tier you can cast", talent: [{ kind: "learnSpell", spells: WITCH_SPELLS }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const SEER_TALENTS: RollableTable = {
  id: "seer-talents", name: "Seer Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Learn an additional seer spell from any tier you can cast", talent: [{ kind: "learnSpell", spells: SEER_SPELLS }] },
    { min: 3, max: 6, text: "Gain an additional use of Omen each day", effects: [{ kind: "resourceBonus", resource: "omen", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Wisdom or Charisma, or +1 to spellcasting checks", effects: [{ kind: "statBonusChoice", stats: ["WIS", "CHA"], bonus: 2 }] },
    { min: 10, max: 11, text: "Increase Destined die category by one", effects: [{ kind: "destinedDieStep", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const BLACK_LOTUS_TALENTS: RollableTable = {
  id: "black-lotus-talents", name: "Black Lotus Talents", dice: "1d12", entries: [
    { min: 1, max: 1, text: "Gain two Black Lotus talents", talent: [{ kind: "rollTable", tableId: "black-lotus-talents", count: 2 }] },
    { min: 2, max: 2, text: "1/day, paralyze a damaged target of level 9 or less for 1d4 rounds", effects: [{ kind: "resourceBonus", resource: "paralyze", bonus: 1 }] },
    { min: 3, max: 3, text: "Advantage on Dexterity checks to avoid entrapment or injury", effects: [{ kind: "advantageOnStat", stat: "DEX" }] },
    { min: 4, max: 4, text: "+1 AC while wielding a melee weapon in each hand", effects: [{ kind: "dualWieldAcBonus", bonus: 1 }] },
    { min: 5, max: 5, text: "Gain an additional hit points die", talent: [{ kind: "gainHitDie", dice: "1d6" }] },
    { min: 6, max: 6, text: "Deal triple damage with Assassin", effects: [{ kind: "assassinDamageMultiplier", value: 3 }] },
    { min: 7, max: 7, text: "Visible enemies make morale checks against DC 18", effects: [{ kind: "enemyMoraleDcMinimum", value: 18 }] },
    { min: 8, max: 8, text: "1/day, walk on water for 1d4 rounds", effects: [{ kind: "resourceBonus", resource: "waterWalk", bonus: 1 }] },
    { min: 9, max: 9, text: "1/day, put a living creature of level 5 or less within near to sleep (DC 15 CON)", effects: [{ kind: "resourceBonus", resource: "sleep", bonus: 1 }] },
    { min: 10, max: 10, text: "1/day, walk on sheer surfaces for 1d4 rounds", effects: [{ kind: "resourceBonus", resource: "wallWalk", bonus: 1 }] },
    { min: 11, max: 11, text: "+1 melee weapon damage", effects: [{ kind: "meleeDamageBonus", bonus: 1 }] },
    { min: 12, max: 12, text: "1/day, become unseen and unheard by a creature of level 9 or less (DC 15 WIS)", effects: [{ kind: "resourceBonus", resource: "unseen", bonus: 1 }] },
  ],
};

export const BARD_TALENTS: RollableTable = {
  id: "bard-talents", name: "Bard Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "You have ADV on downtime checks (excluding carousing)", effects: [{ kind: "advantageOn", applies: "any" }] },
    { min: 3, max: 6, text: "+1 to melee and ranged attacks or +1 to Fascinate rolls", effects: [{ kind: "checkKindChoice", applies: ["meleeAttack", "attack", "stat"], bonus: 1 }] },
    { min: 7, max: 9, text: "+2 points to distribute to any stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
    { min: 10, max: 11, text: "Add +2 to your group's carousing event rolls", effects: [] },
    { min: 12, max: 12, text: "Choose a talent", effects: [], talent: [{ kind: "chooseTalent", tableId: "bard-talents" }] },
  ],
};

export const MONK_TALENTS: RollableTable = {
  id: "monk-talents", name: "Monk Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Once per day, double your movement speed for 3 rounds", effects: [{ kind: "speedBonus", bonus: 1 }] },
    { min: 3, max: 6, text: "+1 to melee attacks and damage", effects: [{ kind: "checkBonus", applies: "meleeAttack", bonus: 1 }, { kind: "meleeDamageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength, Dexterity, or Wisdom stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "WIS"], bonus: 2 }] },
    { min: 10, max: 11, text: "Gain an additional use of Sun on the Water", effects: [{ kind: "resourceBonus", resource: "sunOnWater", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const NECROMANCER_TALENTS: RollableTable = {
  id: "necromancer-talents", name: "Necromancer Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "The next time you die, you may return to life with full HP", effects: [{ kind: "resourceBonus", resource: "returnFromDeath", bonus: 1 }] },
    { min: 3, max: 7, text: "+1 to spellcasting checks or +1 to melee attacks", effects: [{ kind: "checkKindChoice", applies: ["spellcast", "meleeAttack"], bonus: 1 }] },
    { min: 8, max: 9, text: "+2 to Strength, Constitution, or Charisma stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "CON", "CHA"], bonus: 2 }] },
    { min: 10, max: 11, text: "Gain advantage on casting one spell you know", talent: [{ kind: "advantageKnownSpell" }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const PALADIN_TALENTS: RollableTable = {
  id: "paladin-talents", name: "Paladin Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Your Named Blade gains a random magic weapon benefit", effects: [] },
    { min: 3, max: 6, text: "Gain +1 to attacks and damage with your Named Blade", effects: [{ kind: "namedBladeBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength, Constitution, or Charisma stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "CON", "CHA"], bonus: 2 }] },
    { min: 10, max: 11, text: "Increase your Inspiring Presence dying roll range by 1", effects: [{ kind: "deathSaveBonus", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const RANGER_TALENTS: RollableTable = {
  id: "ranger-talents", name: "Ranger Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "You deal d12 damage with one weapon type you choose", effects: [] },
    { min: 3, max: 6, text: "+1 to melee or ranged attacks and damage", effects: [{ kind: "checkKindChoice", applies: ["meleeAttack", "attack"], bonus: 1 }, { kind: "damageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength, Dexterity, or Intelligence stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "INT"], bonus: 2 }] },
    { min: 10, max: 11, text: "You gain ADV on Herbalism checks for a remedy you choose", effects: [{ kind: "advantageOn", applies: "stat" }] },
    { min: 12, max: 12, text: "Choose a talent", effects: [], talent: [{ kind: "chooseTalent", tableId: "ranger-talents" }] },
  ],
};

export const WARLOCK_TALENTS: RollableTable = {
  id: "warlock-talents", name: "Warlock Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Roll a Patron Boon from any patron; an unexplained gift", effects: [] },
    { min: 3, max: 6, text: "Add +1 point to two stats (they must be different)", effects: [{ kind: "statPairChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 1 }] },
    { min: 7, max: 9, text: "+1 to melee or ranged attacks", effects: [{ kind: "checkKindChoice", applies: ["meleeAttack", "attack"], bonus: 1 }] },
    { min: 10, max: 11, text: "Roll two Patron Boons and choose one to keep", effects: [] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const BASILISK_WARRIOR_TALENTS: RollableTable = {
  id: "basilisk-warrior-talents", name: "Basilisk Warrior Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "You find a basilisk egg; a loyal hatchling emerges in 1d4 days", effects: [] },
    { min: 3, max: 6, text: "+1 to weapon attacks and damage", effects: [{ kind: "checkBonus", applies: "attack", bonus: 1 }, { kind: "damageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength, Dexterity, or Constitution stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON"], bonus: 2 }] },
    { min: 10, max: 11, text: "+1 use per day of Petrifying Gaze", effects: [{ kind: "resourceBonus", resource: "petrifyingGaze", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const ROUSTABOUT_TALENTS: RollableTable = {
  id: "roustabout-talents", name: "Roustabout Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "+1 to any stat and roll another talent", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 1 }], talent: [{ kind: "rollTable", tableId: "roustabout-talents", count: 1 }] },
    { min: 3, max: 6, text: "Gain the ability to wield a new weapon or armor", effects: [] },
    { min: 7, max: 9, text: "+1 to any two stats (they can't be the same)", effects: [{ kind: "statPairChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 1 }] },
    { min: 10, max: 11, text: "Roll an extra hit points die this level", effects: [], talent: [{ kind: "gainHitDie", dice: "1d4" }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const DELVER_TALENTS: RollableTable = {
  id: "delver-talents", name: "Delver Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Gain 2 gear slots and an additional Trusty Gear", effects: [] },
    { min: 3, max: 6, text: "+1 to melee or ranged attacks and damage", effects: [{ kind: "checkKindChoice", applies: ["meleeAttack", "attack"], bonus: 1 }, { kind: "damageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength, Dexterity, or Constitution stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON"], bonus: 2 }] },
    { min: 10, max: 11, text: "Add one more point to your Scavenger success range", effects: [] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const DUELIST_TALENTS: RollableTable = {
  id: "duelist-talents", name: "Duelist Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "1/day, all attacks that would hit you this round miss instead", effects: [{ kind: "resourceBonus", resource: "parry", bonus: 1 }] },
    { min: 3, max: 6, text: "+1 to melee attacks and damage or +1 Parry per day", effects: [{ kind: "checkBonus", applies: "meleeAttack", bonus: 1 }, { kind: "meleeDamageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength, Dexterity, or Charisma stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CHA"], bonus: 2 }] },
    { min: 10, max: 11, text: "Deal +1d6 damage when you hit with a Taunt attack", effects: [{ kind: "extraDamageDice", dice: "1d6" }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};
