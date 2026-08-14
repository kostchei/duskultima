import type { ItemDef } from "../engine";
import { CORE_TREASURE_ITEM_SPECS, GEMSTONE_ITEM_SPECS, LUXURY_ITEM_SPECS } from "./tables/treasure";
import { magicItemSpell } from "./spells";

/** All item definitions, keyed by id. Unknown lookups throw via item(). */
const BASE_ITEM_LIST: readonly ItemDef[] = [
  // Gear
  { id: "torch", name: "Torch", slotCost: 1, bundleSize: 1, tags: ["light"], valueGp: 2, use: { actions: ["place"], target: "point" } },
  { id: "ration", name: "Ration", slotCost: 1, bundleSize: 3, tags: ["food"], valueGp: 1 },
  { id: "backpack", name: "Backpack", slotCost: 0, bundleSize: 1, tags: ["gear"], valueGp: 2 },
  { id: "flint-and-steel", name: "Flint and Steel", slotCost: 1, bundleSize: 1, tags: ["gear"], valueGp: 5 },
  { id: "iron-spikes", name: "Iron Spikes", slotCost: 1, bundleSize: 10, tags: ["gear"], valueGp: 1, use: { actions: ["place"], target: "object" } },
  { id: "grappling-hook", name: "Grappling Hook", slotCost: 1, bundleSize: 1, tags: ["gear"], valueGp: 1, use: { actions: ["place", "activate"], target: "surface" } },
  { id: "rope", name: "Rope (60')", slotCost: 1, bundleSize: 1, tags: ["gear"], valueGp: 1, use: { actions: ["place", "activate"], target: "surface" } },
  { id: "oil-flask", name: "Oil Flask", slotCost: 1, bundleSize: 1, tags: ["gear"], valueGp: 2, use: { actions: ["place"], target: "point" } },
  { id: "mirror", name: "Steel Mirror", slotCost: 1, bundleSize: 1, tags: ["gear"], valueGp: 5, use: { actions: ["activate", "place"], target: "point" } },

  // Weapons — reachTiles: how far the swing lands; monsters strike at 1.6, so
  // the spear (and staff) can poke from beyond a monster's claws.
  { id: "longsword", name: "Longsword", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d8", reachTiles: 1.8, weaponVisual: "longsword", valueGp: 9 },
  { id: "dagger", name: "Dagger", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d4", finesse: true, reachTiles: 1.6, weaponVisual: "dagger", valueGp: 5 },
  { id: "mace", name: "Mace", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d6", reachTiles: 1.6, weaponVisual: "mace", valueGp: 5 },
  { id: "staff", name: "Staff", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d4", twoHanded: true, reachTiles: 2.0, weaponVisual: "staff", valueGp: 2 },
  { id: "shortsword", name: "Shortsword", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d6", finesse: true, reachTiles: 1.7, weaponVisual: "dagger", valueGp: 7 },
  { id: "spear", name: "Spear", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d6", finesse: true, reachTiles: 2.4, weaponVisual: "spear", valueGp: 5 },
  // Thrown, so no reachTiles: a javelin is loosed at range like a bow, not swung.
  { id: "javelin", name: "Javelin", slotCost: 1, bundleSize: 1, tags: ["weapon", "ranged"], damage: "1d4", finesse: true, weaponVisual: "javelin", valueGp: 1 },
  { id: "warhammer", name: "Warhammer", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d8", reachTiles: 1.7, weaponVisual: "mace", valueGp: 10 },
  { id: "bastard-sword", name: "Bastard Sword", slotCost: 1, bundleSize: 1, tags: ["weapon"], damage: "1d10", twoHanded: true, reachTiles: 1.9, weaponVisual: "longsword", valueGp: 10 },
  { id: "greatsword", name: "Greatsword", slotCost: 2, bundleSize: 1, tags: ["weapon"], damage: "1d12", twoHanded: true, reachTiles: 2.0, weaponVisual: "longsword", valueGp: 12 },
  { id: "greataxe", name: "Greataxe", slotCost: 2, bundleSize: 1, tags: ["weapon"], damage: "1d10", twoHanded: true, reachTiles: 2.0, weaponVisual: "mace", valueGp: 9 },
  // Ranged only: no reachTiles, so it can never be wielded for melee.
  { id: "shortbow", name: "Shortbow", slotCost: 1, bundleSize: 1, tags: ["weapon", "ranged"], damage: "1d4", finesse: true, valueGp: 6 },
  { id: "longbow", name: "Longbow", slotCost: 2, bundleSize: 1, tags: ["weapon", "ranged"], damage: "1d8", finesse: true, twoHanded: true, valueGp: 10 },
  { id: "crossbow", name: "Crossbow", slotCost: 2, bundleSize: 1, tags: ["weapon", "ranged"], damage: "1d10", finesse: true, twoHanded: true, valueGp: 60 },
  {
    id: "starfall-blade", name: "Starfall Blade", slotCost: 1, bundleSize: 1, tags: ["weapon", "magic"],
    treasureQuality: "fabulous", magicBonus: 1, benefitRolls: 1,
    damage: "1d10", finesse: true, reachTiles: 1.9, weaponVisual: "longsword",
  },

  // Armor — AC = acBase + DEX (capped); class permissions are RAW.
  {
    id: "leather-armor", name: "Leather Armor", slotCost: 1, bundleSize: 1, tags: ["armor"],
    armor: { acBase: 11, dexCap: 99, classes: ["fighter", "priest", "thief", "pit-fighter", "sea-wolf", "ras-godai", "witch", "seer", "cleric", "bard", "ranger", "seawolf", "warlock", "roustabout", "delver", "duelist"] }, armorVisual: "leather", valueGp: 10,
  },
  {
    id: "chainmail", name: "Chainmail", slotCost: 2, bundleSize: 1, tags: ["armor"],
    description: "Disadvantage on stealth checks.",
    armor: { acBase: 13, dexCap: 99, classes: ["fighter", "priest", "pit-fighter", "sea-wolf", "cleric", "paladin", "seawolf", "basilisk-warrior"], stealthDisadvantage: true }, armorVisual: "chain", valueGp: 60,
  },
  {
    id: "plate-mail", name: "Plate Mail", slotCost: 3, bundleSize: 1, tags: ["armor"],
    description: "Disadvantage on stealth checks.",
    armor: { acBase: 15, dexCap: 0, classes: ["fighter", "priest", "pit-fighter", "sea-wolf", "cleric", "paladin", "seawolf", "basilisk-warrior"], stealthDisadvantage: true }, armorVisual: "plate", valueGp: 130,
  },
  {
    id: "mithral-chainmail", name: "Mithral Chainmail", slotCost: 1, bundleSize: 1, tags: ["armor", "magic"],
    treasureQuality: "fabulous", benefits: ["Occupies only one gear slot and can be worn by lightly armored classes."],
    armor: { acBase: 13, dexCap: 99, classes: ["fighter", "priest", "thief", "pit-fighter", "sea-wolf", "ras-godai", "witch", "seer", "cleric", "bard", "ranger", "seawolf", "warlock", "roustabout", "delver", "duelist"] }, armorVisual: "mithral",
  },
  {
    id: "aegis-mail", name: "Aegis Mail", slotCost: 1, bundleSize: 1, tags: ["armor", "magic"],
    treasureQuality: "fabulous", magicBonus: 1, benefitRolls: 1, curseRolls: 1,
    armor: { acBase: 13, dexCap: 99, classes: ["fighter", "priest", "thief", "wizard", "pit-fighter", "sea-wolf", "ras-godai", "witch", "seer", "cleric", "magic-user", "bard", "monk", "necromancer", "paladin", "ranger", "seawolf", "warlock", "basilisk-warrior", "roustabout", "delver", "duelist"] }, armorVisual: "mithral",
  },
  { id: "shield", name: "Shield", slotCost: 1, bundleSize: 1, tags: ["armor"], shield: true, valueGp: 10 },

  // Treasure — treasure quality is contextual XP: poor 0-1, normal 2,
  // fabulous 3, legendary 4. The find is rated once, not per coin bundle.
  // First 100 coins ride free; every 100 after costs a slot. XP is rated once
  // for the treasure find that produced them, never per 100 coins.
  // valueGp lets loose treasure be sold at a shop; "coins" is money already, so it has none.
  { id: "coins", name: "Coins", slotCost: 0, bundleSize: 100, freeQty: 100, tags: ["treasure"], xpValue: 2, treasureQuality: "normal" },
  { id: "gem", name: "Gem", slotCost: 0, bundleSize: 10, tags: ["treasure"], xpValue: 2, valueGp: 10, treasureQuality: "normal" },
  { id: "jeweled-idol", name: "Jeweled Idol", slotCost: 0, bundleSize: 1, tags: ["treasure"], xpValue: 3, valueGp: 50, treasureQuality: "fabulous" },
  { id: "crown-of-the-deep", name: "Crown of the Deep", slotCost: 0, bundleSize: 1, tags: ["treasure"], xpValue: 4, treasureQuality: "legendary" },

  // Potions & Consumables
  { id: "potion-healing", name: "Potion of Healing", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], valueGp: 75, treasureQuality: "normal", benefits: ["Restores hit points based on the drinker's level."], description: "Restore 1d6/2d8/3d10/4d12 HP at levels 0-3/4-6/7-9/10+.", use: { actions: ["consume", "inspect"], target: "ally" } },
  { id: "potion-invisibility", name: "Potion of Invisibility", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], treasureQuality: "normal", benefits: ["The drinker becomes invisible until the duration ends, they attack, or they cast a spell."], description: "Become invisible for 10 rounds; attacking or casting ends it.", use: { actions: ["consume", "inspect"], target: "self" } },
  { id: "potion-water-breathing", name: "Potion of Water Breathing", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], treasureQuality: "normal", benefits: ["The drinker can breathe underwater."], description: "Breathe underwater for 20 rounds.", use: { actions: ["consume", "inspect"], target: "self" } },
  { id: "potion-flying", name: "Potion of Flying", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], treasureQuality: "normal", benefits: ["The drinker can fly a near distance as movement."], description: "Fly with the normal movement controls for 10 rounds.", use: { actions: ["consume", "inspect"], target: "self" } },
  { id: "potion-giant-strength", name: "Potion of Giant Strength", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], treasureQuality: "normal", benefits: ["The drinker's Strength becomes 18 (+4) and their melee attacks deal double damage."], description: "Your Strength becomes at least 18 and melee damage doubles for 10 rounds.", use: { actions: ["consume", "inspect"], target: "self" } },
  { id: "potion-polymorph", name: "Potion of Polymorph", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], treasureQuality: "normal", benefits: ["Casts polymorph on the drinker for one hour."], description: "Assume a powerful natural form for one hour.", use: { actions: ["consume", "inspect"], target: "self" } },
  { id: "potion-extirpation", name: "Potion of Extirpation", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], treasureQuality: "fabulous", benefits: ["Utterly removes one close-sized creature or object from reality; only wish can restore it."], personality: { alignment: "chaos", trait: "Protests its use and insists the chosen target is wrong." }, namedEffect: { kind: "extirpate" }, description: "Remove one close-sized target from reality; only wish can restore it.", use: { actions: ["activate", "inspect"], target: "enemy" } },
  {
    id: "serpent-venom",
    name: "Serpent Venom",
    slotCost: 1,
    bundleSize: 1,
    tags: ["poison", "consumable"],
    valueGp: 45,
    description: "Coat a melee weapon for +1d6 poison on its next hit. Application accidents occur on 1-2; Ras-Godai only on a natural 1.",
    use: { actions: ["activate", "inspect"], target: "self" },
  },

  // Spell Scrolls
  { id: "scroll-cure-wounds", name: "Scroll of Cure Wounds", slotCost: 1, bundleSize: 1, tags: ["scroll", "magic"], treasureQuality: "normal", benefits: ["Contains one casting of cure wounds."], use: { actions: ["cast", "inspect"], target: "none" } },
  { id: "scroll-light", name: "Scroll of Light", slotCost: 1, bundleSize: 1, tags: ["scroll", "magic"], treasureQuality: "normal", benefits: ["Contains one casting of light."], use: { actions: ["cast", "inspect"], target: "none" } },
  { id: "scroll-burning-hands", name: "Scroll of Burning Hands", slotCost: 1, bundleSize: 1, tags: ["scroll", "magic"], treasureQuality: "normal", benefits: ["Contains one casting of burning hands."], use: { actions: ["cast", "inspect"], target: "none" } },
  { id: "scroll-feather-fall", name: "Scroll of Feather Fall", slotCost: 1, bundleSize: 1, tags: ["scroll", "magic"], treasureQuality: "normal", benefits: ["Contains one casting of feather fall."], use: { actions: ["cast", "inspect"], target: "none" } },
  { id: "scroll-covenant", name: "Scroll of the Covenant", slotCost: 1, bundleSize: 1, tags: ["scroll", "magic"], treasureQuality: "fabulous", benefits: ["Bestows three Divine Halo blessings."], namedEffect: { kind: "divineHalo", count: 3 }, description: "Bestow three Divine Halo blessings (hostile targeted spells are DC 15).", use: { actions: ["activate", "inspect"], target: "self" } },

  // Wands, Rings & Utility Items
  { id: "wand-fireball", name: "Wand of Fireballs", slotCost: 1, bundleSize: 1, tags: ["wand", "magic"], treasureQuality: "normal", benefits: ["Casts fireball using the wielder's spellcasting check."], curses: ["A failed casting makes the wand inert until rest; a critical failure breaks it permanently."], use: { actions: ["cast", "inspect"], target: "none", inertOnFail: true, breaksOnCriticalFail: true } },
  { id: "ring-feather-falling", name: "Ring of Feather Falling", slotCost: 1, bundleSize: 1, tags: ["ring", "magic"], treasureQuality: "fabulous", benefits: ["Once per day, casts feather fall on its wearer when they fall."], personality: { alignment: "neutral", trait: "Fearful of heights and mentally hoots warnings near edges.", flaws: ["Fearful of heights."] }, description: "Automatically prevents one dangerous fall, then recharges on rest.", use: { actions: ["activate", "inspect"], target: "self", charges: 1, rechargeOnRest: true } },
  { id: "egg-of-cockatrice", name: "Egg of the Cockatrice", slotCost: 0, bundleSize: 1, tags: ["relic", "magic"], treasureQuality: "fabulous", benefits: ["Once per week, hatches a cockatrice that follows commands for 5 rounds; the egg repairs itself over a week."], namedEffect: { kind: "summon", monsterId: "cockatrice", rounds: 5 }, description: "Summon a cockatrice follower for 5 rounds (once per week).", use: { actions: ["activate", "inspect"], target: "none", charges: 1, rechargeAfterRests: 7 } },
  { id: "bag-of-holding", name: "Bag of Holding", slotCost: 1, bundleSize: 1, tags: ["utility", "magic"], treasureQuality: "fabulous", benefits: ["Contains an interdimensional storage space."], curses: ["Putting it inside another Bag of Holding or Portable Hole destroys both and everything inside."], capacityBonus: 10, description: "Adds 10 gear slots while carried. It cannot be dropped while over capacity.", use: { actions: ["inspect"], target: "none" } },
  { id: "kytherian-cog", name: "Kytherian Cog", slotCost: 0, bundleSize: 1, tags: ["relic", "magic"], treasureQuality: "fabulous", benefits: ["The bearer starts every session with a luck token."], namedEffect: { kind: "sessionLuck" }, description: "Begin each session with a luck token.", use: { actions: ["inspect"], target: "none" } },
  { id: "crystal-ball", name: "Crystal Ball", slotCost: 1, bundleSize: 1, tags: ["utility", "magic"], treasureQuality: "fabulous", benefits: ["A wizard can use it to cast scrying."], curses: ["A failed scrying check makes it cease functioning for one day."], requiredClass: "wizard", boundSpellId: "scrying", description: "Cast scrying; a failed check makes the ball inert until rest.", use: { actions: ["cast", "inspect"], target: "none", inertOnFail: true } },
  { id: "immovable-rod", name: "Immovable Rod", slotCost: 1, bundleSize: 1, tags: ["utility", "magic"], treasureQuality: "fabulous", benefits: ["Its button fixes it in space, where it holds up to 5,000 pounds."], namedEffect: { kind: "fixInSpace", capacityLb: 5000 }, description: "Toggle fixed-in-space mode; holds up to 5,000 pounds.", use: { actions: ["activate", "inspect"], target: "none" } },
  { id: "portable-hole", name: "Portable Hole", slotCost: 0, bundleSize: 1, tags: ["utility", "magic"], treasureQuality: "fabulous", benefits: ["Opens into a six-foot-deep extradimensional space with 20 gear slots."], curses: ["Putting it inside a Bag of Holding or another Portable Hole destroys both and everything inside."], capacityBonus: 20, description: "Adds 20 extradimensional gear slots while carried; never nest it with extradimensional storage.", use: { actions: ["inspect"], target: "none" } },
  { id: "brak-cube", name: "Brak's Cube of Perfection", slotCost: 1, bundleSize: 1, tags: ["artifact", "magic"], treasureQuality: "fabulous", benefits: ["Permanently raises one randomly selected stat to 18 (+4)."], curses: ["After use, teleports to a random location in the multiverse."], namedEffect: { kind: "statTo18" }, description: "Roll d6 to permanently set the corresponding stat to 18; the cube then vanishes.", use: { actions: ["activate", "inspect"], target: "self" } },
  { id: "flying-carpet", name: "Flying Carpet", slotCost: 2, bundleSize: 1, tags: ["utility", "magic"], treasureQuality: "fabulous", benefits: ["Carries two riders and flies double near on the driver's turn."], personality: { alignment: "neutral", trait: "Playful and mischievous; gets restless without frequent travel.", virtues: ["Enjoys visiting new places."] }, namedEffect: { kind: "flyingMount", riders: 2, speed: "doubleNear" }, description: "Carries two riders and flies double near on the driver's turn.", use: { actions: ["activate", "inspect"], target: "self" } },

  // Weapons & Armor Artifacts
  { id: "blade-of-vengeance", name: "Blade of Vengeance (+2)", slotCost: 1, bundleSize: 1, tags: ["weapon", "magic"], treasureQuality: "fabulous", magicBonus: 2, benefitRolls: 1, curseRolls: 1, damage: "1d8", finesse: true, reachTiles: 1.8, weaponVisual: "longsword" },
  { id: "greataxe-of-horde", name: "Greataxe of the Horde (+3)", slotCost: 2, bundleSize: 1, tags: ["weapon", "magic"], treasureQuality: "fabulous", magicBonus: 3, benefitRolls: 2, damage: "1d12", twoHanded: true, reachTiles: 2.0, weaponVisual: "mace" },
  { id: "scimitar-of-speed", name: "Scimitar of Speed (+1)", slotCost: 1, bundleSize: 1, tags: ["weapon", "magic"], treasureQuality: "fabulous", magicBonus: 1, benefitRolls: 1, damage: "1d6", finesse: true, reachTiles: 1.7, weaponVisual: "dagger", benefits: ["First Strike: Preemptively strikes first against incoming melee attackers.", "Flurry of Speed: Every 2nd attack strikes twice in rapid succession."], description: "A blade blurs with supernatural haste — grants First Strike in melee and double attacks on every 2nd swing." },
  { id: "obsidian-witchknife", name: "Obsidian Witchknife (+2)", slotCost: 1, bundleSize: 1, tags: ["weapon", "magic", "artifact"], treasureQuality: "legendary", magicBonus: 2, benefits: ["When casting while holding it, the wielder may take damage and add that amount to the spellcasting check."], curses: ["A lawful being cannot wield it."], forbiddenAlignment: "law", namedEffect: { kind: "spellcastBloodBonus" }, damage: "1d4", finesse: true, reachTiles: 1.8, weaponVisual: "dagger" },
  { id: "armor-saint-terragnis", name: "Armor of Saint Terragnis (+3)", slotCost: 3, bundleSize: 1, tags: ["armor", "magic", "artifact"], treasureQuality: "legendary", magicBonus: 3, benefits: ["Hostile spells targeting the wearer are DC 18 to cast.", "Once per month, summons an avatar of Saint Terragnis for 10 rounds."], curses: ["Only a lawful worshipper of Saint Terragnis can wear it."], requiredAlignment: "law", hostileSpellDc: 18, namedEffect: { kind: "summon", monsterId: "archangel", rounds: 10 }, use: { actions: ["activate", "inspect"], target: "none", charges: 1, rechargeAfterRests: 30 }, armor: { acBase: 15, dexCap: 0, classes: ["fighter", "priest"], stealthDisadvantage: true }, armorVisual: "plate" },
  { id: "staff-of-ord", name: "Staff of Ord (+3)", slotCost: 1, bundleSize: 1, tags: ["weapon", "magic", "artifact"], treasureQuality: "legendary", magicBonus: 3, benefits: ["Functions as wands of dimension door, fireball, sending, and telekinesis without breaking on a natural 1.", "Hostile spells targeting the wielder are DC 18 to cast."], curses: ["Only a wizard can wield it."], requiredClass: "wizard", hostileSpellDc: 18, boundSpellIds: ["dimension-door", "fireball", "sending", "telekinesis"], use: { actions: ["cast", "inspect"], target: "none", inertOnFail: true }, damage: "1d4", twoHanded: true, reachTiles: 2.2, weaponVisual: "staff" },

  // Per-setting relics & drops.
  //
  // These carried nothing but flavour text: no valueGp (so a shop refused them),
  // no `use`, and slotCost 0, which made them free to hoard and worth nothing on
  // either side of the trade. They are trinkets, so they pack ten to a slot
  // through the shared pouch group, and each carries the coin value its own
  // treasure-table row already advertised.
  { id: "carved-flame-bone", name: "Carved Flame Bone", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic", "magic"], valueGp: 30, treasureQuality: "normal", benefits: ["Ignites in flame once per day for 1d4 rounds."] },
  { id: "eyeball-charm", name: "Eyeball Charm", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic", "magic"], valueGp: 40, treasureQuality: "normal", benefits: ["Repels insects and spiders."] },
  { id: "floating-wolf-idol", name: "Floating Wolf Idol", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic", "magic"], valueGp: 50, treasureQuality: "normal", benefits: ["Floats under its own magic."] },
  { id: "compass-rose", name: "Compass Rose", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic", "magic"], valueGp: 25, treasureQuality: "normal", benefits: ["Points due north while untouched."] },
  { id: "pickled-imp-jar", name: "Pickled Imp Jar", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic", "magic"], valueGp: 60, treasureQuality: "normal", curses: ["Attracts demonic creatures."] },
  { id: "vial-demon-blood", name: "Vial of Demon Blood", slotCost: 1, bundleSize: 1, tags: ["potion", "magic"], valueGp: 75, treasureQuality: "normal", benefits: ["Grants fire resistance for one hour."], description: "Drink to resist fire for one hour.", use: { actions: ["consume", "inspect"], target: "self" } },
  { id: "cursed-eye-token", name: "Cursed Eye Token", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic", "magic"], valueGp: 10, treasureQuality: "poor", curses: ["Imposes disadvantage on the bearer's next check."] },
  { id: "cobra-bag", name: "Burlap Cobra Bag", slotCost: 1, bundleSize: 1, tags: ["utility"], valueGp: 15 },
  { id: "treasure-map-half", name: "Treasure Map Half", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic"], valueGp: 35 },
  { id: "scarab-jar", name: "Sealed Scarab Jar", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic"], valueGp: 20 },
  { id: "poison-wine-cup", name: "Poison Reservoir Cup", slotCost: 1, bundleSize: 10, slotGroup: "small-treasure", tags: ["relic"], valueGp: 45 },
];

const BASE_ITEMS = new Map(BASE_ITEM_LIST.map((entry) => [entry.id, entry]));

/**
 * Bulk markers that keep a treasure find out of the shared pouch.
 *
 * Anything a party would have to carry in both arms, prop on a shoulder, or
 * roll out of the room: furniture, statuary, framed art, instruments, and
 * anything the table itself calls giant or life-sized.
 */
const BULKY_TREASURE = new RegExp(
  "\\b(?:giant|large|life-sized|full-length|adult|marble|throne|sarcophagus|chest|tapestry"
  + "|taxidermied|lute|board|pane|statue|suit|carpet|conch|censer|python|horn mug|cask"
  + "|painting|bestiary|mirror|lantern|robes?|cloak|surcoat|slippers|boots|helm|tusk|shell)\\b",
  "i",
);

/**
 * Small valuables share a pouch even when their exact names remain separate.
 *
 * Only asked about finds with no base item behind them — a found greatsword is
 * a greatsword and packs like one. Everything else is loot, and loot goes ten to
 * a slot; the previous allowlist of a dozen nouns meant most of the d100 tables
 * charged a full slot for a single scarab pin or a pouch of spices.
 */
function isPouchSizedTreasure(name: string): boolean {
  return !BULKY_TREASURE.test(name);
}

const CORE_TREASURE_ITEMS: readonly ItemDef[] = CORE_TREASURE_ITEM_SPECS.map((spec) => {
  const base = spec.baseItemId ? BASE_ITEMS.get(spec.baseItemId) : undefined;
  if (spec.baseItemId && !base) throw new Error(`Unknown core treasure base item "${spec.baseItemId}"`);
  const generatedSpell = spec.spellTier ? magicItemSpell(spec.spellTier, 1) : undefined;
  const pouchSized = !base && isPouchSizedTreasure(spec.name);
  return {
    ...(base ?? { slotCost: 1, bundleSize: 1, tags: ["treasure"] }),
    id: spec.id,
    rulesId: base?.id,
    name: spec.name,
    description: spec.description,
    valueGp: spec.valueGp,
    slotCost: spec.slotCost ?? base?.slotCost ?? 1,
    bundleSize: pouchSized ? 10 : (base?.bundleSize ?? 1),
    slotGroup: pouchSized ? "small-treasure" : base?.slotGroup,
    treasureQuality: spec.treasureQuality,
    xpValue: { poor: 0, normal: 2, fabulous: 3, legendary: 4 }[spec.treasureQuality],
    magicBonus: spec.magicBonus ?? base?.magicBonus,
    benefitRolls: spec.benefitRolls ?? base?.benefitRolls,
    curseRolls: spec.curseRolls ?? base?.curseRolls,
    personality: spec.personality ?? base?.personality,
    benefits: spec.benefits ?? base?.benefits,
    boundSpellId: generatedSpell?.id ?? base?.boundSpellId,
    use: spec.spellContainer
      ? {
          actions: ["cast", "inspect"],
          target: "none",
          ...(spec.spellContainer === "wand"
            ? { inertOnFail: true, breaksOnCriticalFail: true }
            : {}),
        }
      : base?.use,
  };
});

const GEMSTONE_ITEMS: readonly ItemDef[] = GEMSTONE_ITEM_SPECS.map((spec) => ({
  id: `gemstone-${spec.id}`,
  name: spec.name,
  slotCost: 0,
  bundleSize: 10,
  slotGroup: "small-treasure",
  tags: ["treasure", "gem"],
  valueGp: spec.valueGp,
  xpValue: 2,
  treasureQuality: "normal",
}));

const LUXURY_ITEMS: readonly ItemDef[] = LUXURY_ITEM_SPECS.map((spec) => {
  const pouchSized = isPouchSizedTreasure(spec.name);
  return {
    id: spec.id,
    name: spec.name,
    description: spec.description,
    slotCost: 1,
    bundleSize: pouchSized ? 10 : 1,
    slotGroup: pouchSized ? "small-treasure" : undefined,
    tags: ["treasure", "luxury"],
    xpValue: 2,
    treasureQuality: "normal",
  };
});

const GENERATED_SPELL_ITEMS: readonly ItemDef[] = CORE_TREASURE_ITEM_SPECS.flatMap((spec) => {
  if (!spec.spellTier || !spec.spellContainer) return [];
  const base = CORE_TREASURE_ITEMS.find((candidate) => candidate.id === spec.id)!;
  return Array.from({ length: 12 }, (_, index) => {
    const contained = magicItemSpell(spec.spellTier!, index + 1);
    return {
      ...base,
      id: `${spec.id}--${contained.id}`,
      rulesId: spec.spellContainer === "wand" ? "generated-wand" : "generated-scroll",
      name: `${spec.spellContainer === "wand" ? "Wand" : "Scroll"} of ${contained.name}`,
      boundSpellId: contained.id,
      description: `${spec.description} Contains ${contained.name}, a tier ${spec.spellTier} spell.`,
    };
  });
});

/**
 * "+N magic armor" names no armor type, so the find is minted as one. These are
 * the types it can take; the reward layer picks which, filling the party's gaps.
 */
export const MAGIC_ARMOR_BASE_IDS: readonly string[] = ["leather-armor", "chainmail", "plate-mail"];

/** The generic magic-armor rows: a bonus and a benefit/curse with no armor behind them. */
const GENERIC_MAGIC_ARMOR_BASE = "aegis-mail";

export function isGenericMagicArmorId(id: string): boolean {
  return CORE_TREASURE_ITEM_SPECS.some(
    (spec) => spec.id === id && spec.baseItemId === GENERIC_MAGIC_ARMOR_BASE,
  );
}

/**
 * One concrete item per (generic magic-armor row × armor type). The armor's own
 * stats come from the real mundane armor — a +2 plate keeps plate's DEX cap,
 * slot cost, and stealth disadvantage — while the bonus and the benefit/curse
 * rolls come from the treasure row.
 */
const GENERATED_ARMOR_ITEMS: readonly ItemDef[] = CORE_TREASURE_ITEM_SPECS.flatMap((spec) => {
  if (spec.baseItemId !== GENERIC_MAGIC_ARMOR_BASE) return [];
  const treasureDef = CORE_TREASURE_ITEMS.find((candidate) => candidate.id === spec.id)!;
  return MAGIC_ARMOR_BASE_IDS.map((armorId) => {
    const armorDef = BASE_ITEMS.get(armorId);
    if (!armorDef?.armor) throw new Error(`Magic armor base "${armorId}" is not armor`);
    const bonus = treasureDef.magicBonus ?? 0;
    return {
      ...treasureDef,
      id: `${spec.id}--${armorId}`,
      rulesId: armorId,
      name: `+${bonus} ${armorDef.name}`,
      description: `${spec.description} It is a suit of ${armorDef.name.toLowerCase()}.`,
      armor: armorDef.armor,
      armorVisual: armorDef.armorVisual,
      slotCost: armorDef.slotCost,
    };
  });
});

const ITEM_LIST: readonly ItemDef[] = [
  ...BASE_ITEM_LIST,
  ...CORE_TREASURE_ITEMS,
  ...GEMSTONE_ITEMS,
  ...LUXURY_ITEMS,
  ...GENERATED_SPELL_ITEMS,
  ...GENERATED_ARMOR_ITEMS,
];

const ITEMS = new Map(ITEM_LIST.map((i) => [i.id, i]));
if (ITEMS.size !== ITEM_LIST.length) throw new Error("Duplicate item ids in data");

export function item(id: string): ItemDef {
  const def = ITEMS.get(id);
  if (!def) throw new Error(`Unknown item "${id}"`);
  return def;
}

export function allItems(): readonly ItemDef[] {
  return ITEM_LIST;
}

/** Resolve one exact d12 spell face for a generic core-table scroll or wand. */
export function generatedMagicItem(baseItemId: string, d12: number): ItemDef {
  const spec = CORE_TREASURE_ITEM_SPECS.find((candidate) => candidate.id === baseItemId);
  if (!spec?.spellTier || !spec.spellContainer) return item(baseItemId);
  const contained = magicItemSpell(spec.spellTier, d12);
  return item(`${baseItemId}--${contained.id}`);
}

/** Resolve a generic "+N magic armor" find as a specific suit of armor. */
export function generatedMagicArmor(baseItemId: string, armorId: string): ItemDef {
  if (!isGenericMagicArmorId(baseItemId)) throw new Error(`"${baseItemId}" is not generic magic armor`);
  if (!MAGIC_ARMOR_BASE_IDS.includes(armorId)) throw new Error(`"${armorId}" is not a magic armor base`);
  return item(`${baseItemId}--${armorId}`);
}
