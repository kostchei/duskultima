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
    { min: 3, max: 6, text: "+1 to melee weapon damage", effects: [{ kind: "meleeDamageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength or Constitution, or +1 to melee attacks", effects: [{ kind: "statBonusChoice", stats: ["STR", "CON"], bonus: 2 }] },
    { min: 10, max: 11, text: "Increase Flourish healing by 1d6", effects: [{ kind: "flourishExtraDie", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const SEA_WOLF_TALENTS: RollableTable = {
  id: "sea-wolf-talents", name: "Sea Wolf Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "1/day, go berserk: immune to damage for 3 rounds", effects: [{ kind: "resourceBonus", resource: "berserk", bonus: 1 }] },
    { min: 3, max: 6, text: "Attacks deal +1 damage", effects: [{ kind: "damageBonus", bonus: 1 }] },
    { min: 7, max: 9, text: "+2 to Strength or Constitution, or +1 to attacks", effects: [{ kind: "statBonusChoice", stats: ["STR", "CON"], bonus: 2 }] },
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
    { min: 2, max: 2, text: "Song of Courage: party gains advantage vs fear", effects: [{ kind: "checkBonus", applies: "morale", bonus: 2 }] },
    { min: 3, max: 6, text: "+1 to Charisma or Dexterity stat", effects: [{ kind: "statBonusChoice", stats: ["CHA", "DEX"], bonus: 1 }] },
    { min: 7, max: 9, text: "+1 to spellcasting checks", effects: [{ kind: "statBonus", stat: "CHA", bonus: 2 }] },
    { min: 10, max: 11, text: "Inspire bonus increases to +2", effects: [{ kind: "checkBonus", applies: "attack", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const MONK_TALENTS: RollableTable = {
  id: "monk-talents", name: "Monk Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Flurry of Blows: extra attack on melee turn", effects: [{ kind: "checkBonus", applies: "attack", bonus: 1 }] },
    { min: 3, max: 6, text: "+1 to Strength or Wisdom stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "WIS"], bonus: 1 }] },
    { min: 7, max: 9, text: "Unarmored AC increases by +1", effects: [{ kind: "acBonus", bonus: 1 }] },
    { min: 10, max: 11, text: "Ki Strike: melee attacks count as magic", effects: [{ kind: "damageBonus", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const NECROMANCER_TALENTS: RollableTable = {
  id: "necromancer-talents", name: "Necromancer Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Animate undead thrall with +1d6 HP", effects: [{ kind: "statBonus", stat: "CHA", bonus: 2 }] },
    { min: 3, max: 6, text: "+1 to Charisma or Intelligence stat", effects: [{ kind: "statBonusChoice", stats: ["CHA", "INT"], bonus: 1 }] },
    { min: 7, max: 9, text: "Siphon Life restores +1d4 additional HP", effects: [{ kind: "damageBonus", bonus: 1 }] },
    { min: 10, max: 11, text: "Undead monsters treat you as neutral", effects: [{ kind: "advantageOn", applies: "stealth" }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const PALADIN_TALENTS: RollableTable = {
  id: "paladin-talents", name: "Paladin Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Smite deals +1d8 extra radiant damage", effects: [{ kind: "damageBonus", bonus: 2 }] },
    { min: 3, max: 6, text: "+1 to Strength or Charisma stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "CHA"], bonus: 1 }] },
    { min: 7, max: 9, text: "Aura of Protection: +1 AC to adjacent allies", effects: [{ kind: "acBonus", bonus: 1 }] },
    { min: 10, max: 11, text: "Lay on Hands heals full HP once per day", effects: [{ kind: "statBonus", stat: "CHA", bonus: 2 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const RANGER_TALENTS: RollableTable = {
  id: "ranger-talents", name: "Ranger Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Sniper: ranged crits on 19-20", effects: [{ kind: "critRange", value: 19 }] },
    { min: 3, max: 6, text: "+1 to Dexterity or Intelligence stat", effects: [{ kind: "statBonusChoice", stats: ["DEX", "INT"], bonus: 1 }] },
    { min: 7, max: 9, text: "Wilderness Survival: party ignores hazard damage", effects: [{ kind: "advantageOn", applies: "traps" }] },
    { min: 10, max: 11, text: "+2 to ranged damage rolls", effects: [{ kind: "damageBonus", bonus: 2 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const WARLOCK_TALENTS: RollableTable = {
  id: "warlock-talents", name: "Warlock Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Patron's Gift: gain a second patron boon", effects: [{ kind: "statBonus", stat: "CHA", bonus: 2 }] },
    { min: 3, max: 6, text: "+1 to Charisma or Constitution stat", effects: [{ kind: "statBonusChoice", stats: ["CHA", "CON"], bonus: 1 }] },
    { min: 7, max: 9, text: "Eldritch Blast deals +1d6 force damage", effects: [{ kind: "damageBonus", bonus: 1 }] },
    { min: 10, max: 11, text: "Regain 1 spent spell slot on critical hit", effects: [{ kind: "critRange", value: 19 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const BASILISK_WARRIOR_TALENTS: RollableTable = {
  id: "basilisk-warrior-talents", name: "Basilisk Warrior Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Petrifying Strike: 1/day slow target for 2 rounds", effects: [{ kind: "damageBonus", bonus: 1 }] },
    { min: 3, max: 6, text: "+1 to Constitution or Strength stat", effects: [{ kind: "statBonusChoice", stats: ["CON", "STR"], bonus: 1 }] },
    { min: 7, max: 9, text: "Stone Skin increases to +3 AC", effects: [{ kind: "acBonus", bonus: 1 }] },
    { min: 10, max: 11, text: "Immunity to poison and paralysis", effects: [{ kind: "advantageOnStat", stat: "CON" }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const ROUSTABOUT_TALENTS: RollableTable = {
  id: "roustabout-talents", name: "Roustabout Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Brawl King: +2 to unarmed attack rolls", effects: [{ kind: "checkBonus", applies: "attack", bonus: 2 }] },
    { min: 3, max: 6, text: "+1 to Strength or Constitution stat", effects: [{ kind: "statBonusChoice", stats: ["STR", "CON"], bonus: 1 }] },
    { min: 7, max: 9, text: "Iron Gut: advantage on CON saves vs poison/alcohol", effects: [{ kind: "advantageOnStat", stat: "CON" }] },
    { min: 10, max: 11, text: "Knockout Blow: 1/day stun target on hit", effects: [{ kind: "damageBonus", bonus: 2 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const DELVER_TALENTS: RollableTable = {
  id: "delver-talents", name: "Delver Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Keen Sense: detect hidden treasure and traps automatically", effects: [{ kind: "advantageOn", applies: "traps" }] },
    { min: 3, max: 6, text: "+1 to Dexterity or Intelligence stat", effects: [{ kind: "statBonusChoice", stats: ["DEX", "INT"], bonus: 1 }] },
    { min: 7, max: 9, text: "Torch Bearer: carried torches burn 50% longer", effects: [{ kind: "statBonus", stat: "INT", bonus: 1 }] },
    { min: 10, max: 11, text: "+1 to all saving throws in dungeons", effects: [{ kind: "checkBonus", applies: "traps", bonus: 1 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};

export const DUELIST_TALENTS: RollableTable = {
  id: "duelist-talents", name: "Duelist Talents", dice: "2d6", entries: [
    { min: 2, max: 2, text: "Master Fencer: crit on 19-20 with finesse weapons", effects: [{ kind: "critRange", value: 19 }] },
    { min: 3, max: 6, text: "+1 to Dexterity or Charisma stat", effects: [{ kind: "statBonusChoice", stats: ["DEX", "CHA"], bonus: 1 }] },
    { min: 7, max: 9, text: "Parry: +2 AC when wielding a rapier", effects: [{ kind: "acBonus", bonus: 2 }] },
    { min: 10, max: 11, text: "Flamboyant Strike: +2 damage on finesse attacks", effects: [{ kind: "damageBonus", bonus: 2 }] },
    { min: 12, max: 12, text: "Choose a talent or +2 points to distribute to stats", effects: [{ kind: "statBonusChoice", stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"], bonus: 2 }] },
  ],
};
