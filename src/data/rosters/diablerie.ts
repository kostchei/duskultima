/**
 * The Diablerie roster: black forests, thorn mazes and dissolving keeps.
 *
 * Roughly sixty monsters spanning levels 0-10, grouped into families so a run
 * reads as a place rather than a bag of stat blocks. The quillboar warbands
 * hold the middle of the ladder, the beasts of the thorn plains fill the
 * flanks, and the barrow dead climb toward the lich at the top.
 *
 * Every entry states its level, role, silhouette and colours; the numbers come
 * from the level/role spine unless a monster earns an exception.
 */

import type { MonsterArt, MonsterDef } from "../../engine";
import { assertRosterComplete, mon } from "./build";

const art = (
  body: number,
  shade: number,
  accent: number,
  eye: number,
  ...features: NonNullable<MonsterArt["features"]>
): MonsterArt => ({ body, shade, accent, eye, features });

// --- Family palettes -------------------------------------------------------
const MADMAN = art(0xc0a284, 0x8a6b56, 0x6b2f2f, 0xf2e6b0);
const FLAGELLANT = art(0xb09070, 0x7a5c46, 0x8a2a2a, 0xf2e6b0, "weapon");
const CULTIST = art(0x4a3a52, 0x2c2130, 0x9c5f8a, 0xe0c060, "robe");
const GRUB = art(0xd8c6a8, 0xa89070, 0x8fae5a, 0x2a2420);
const CRAWLER = art(0x7a5f3c, 0x4e3a24, 0xb8d05a, 0xe05a5a);
const SPIDER = art(0x2b1d24, 0x140d12, 0x7a2a3a, 0xdb3535, "manyEyes");
const WERE = art(0x5a4432, 0x342515, 0xd0c090, 0xe0b040, "tusks", "mane");
// Three tribes, three accents, and a silhouette per rank: bare-tusked chaff,
// warriors with a shouldered haft, shamans under a war-blanket.
const QUILL = art(0x6b5a44, 0x40342a, 0xe0cfa0, 0xd7a24a, "tusks", "quills");
const QUILL_WARRIOR = art(0x6b5a44, 0x40342a, 0xe0cfa0, 0xd7a24a, "tusks", "quills", "weapon");
const QUILL_SHAMAN = art(0x6b5a44, 0x40342a, 0x9c5fc0, 0xd7a24a, "tusks", "quills", "robe");
const RAZOR = art(0x7d5a3e, 0x4a3324, 0xe0562a, 0xe06a3a, "tusks", "quills");
const RAZOR_WARRIOR = art(0x7d5a3e, 0x4a3324, 0xe0562a, 0xe06a3a, "tusks", "quills", "weapon");
const RAZOR_SHAMAN = art(0x7d5a3e, 0x4a3324, 0xe0562a, 0xe06a3a, "tusks", "quills", "robe");
const BRISTLE = art(0x4f4a3a, 0x2e2b20, 0x9ab05a, 0xc8d060, "tusks", "quills", "weapon");
const BRISTLE_SHAMAN = art(0x4f4a3a, 0x2e2b20, 0x9ab05a, 0xc8d060, "tusks", "quills", "robe");
const WOLF = art(0x6a6a72, 0x3e3e46, 0xb0b0bc, 0xd8d050, "mane", "tail");
const VULTURE = art(0x3a3038, 0x1e1820, 0xc0a070, 0xe0d0a0, "wings");
const CAT = art(0xb08a4e, 0x7a5c30, 0xe0cc94, 0x8fe05a, "tail");
const ZEBRA = art(0xc8c0b0, 0x2a2620, 0xe0d8c8, 0x503820, "mane", "tail");
const RODENT = art(0xa88a62, 0x74593a, 0xd8c0a0, 0x2a2420, "tail");
const HYENA = art(0x8a7248, 0x54432a, 0xc0a878, 0xe08a3a, "mane");
const SNAKE = art(0x4a5c34, 0x28341c, 0xc8d060, 0xe0c040);
const STORM = art(0x5c6470, 0x333a44, 0x8fd0ee, 0xd8f0ff, "tusks");
const GIRAFFE = art(0xc09a58, 0x7a5c30, 0x4a3520, 0x3a2c18);
const STRIDER = art(0x8a6a4a, 0x543f2c, 0xd05a3a, 0xe0c060);
const STONE = art(0x8a8d92, 0x55585e, 0xb8bcc4, 0x9ac673);
const WIND = art(0xa8b8c8, 0x6a7a8c, 0xe0eef8, 0xffffff);
const ELDRITCH_BONE = art(0xd8d2b8, 0x9a9278, 0x8a5fc0, 0xc07be0, "manyEyes");
const ELDRITCH_FLESH = art(0x8a4a5c, 0x542c38, 0xc07be0, 0xe0e060, "manyEyes");
const MOUTHER = art(0x9a5a6a, 0x5c3440, 0xe0c0c8, 0xf0f0a0, "manyEyes");
const BOAR = art(0x6b4a32, 0x3e2a1c, 0xd8ccae, 0xd05a3a, "tusks");
const DIRE_BOAR = art(0x4a3626, 0x281c14, 0xe0d4b6, 0xe07030, "tusks", "quills");
const WARTHOG = art(0x8a7458, 0x544530, 0xf0e4c0, 0xd8a040, "tusks");
const DAEODON = art(0x5c4030, 0x33211a, 0xf0dcb0, 0xff6a30, "tusks");
const SWINETAUR = art(0x6b4a32, 0x3e2a1c, 0xb8bcc4, 0xe0c040, "tusks", "weapon");
const BAT = art(0x3e3440, 0x221c26, 0x8a7a90, 0xe05a5a, "wings");
const BLIND_BAT = art(0xd8d4cc, 0x9a968c, 0xf0ece0, 0xc07be0, "wings");
const BLOOD = art(0x8a1f2a, 0x4e0f16, 0xd0454e, 0xffd0d0);
const GHOUL = art(0x8a9a80, 0x54604c, 0xd0d8b8, 0xe0e040);
const BARROW_BONE = art(0xc8c0a0, 0x8a8470, 0x5a6b3a, 0x9ac673);
const BARROW_ARMED = art(0xc8c0a0, 0x8a8470, 0x8a8d92, 0x9ac673, "weapon");
const SPECTRE = art(0x6a7a9a, 0x38445c, 0xa8c0e0, 0xd8f0ff);
const FLESH_GOLEM = art(0x7a6a5a, 0x463c32, 0x9a3a3a, 0xd0d060);
const FROST_BONE = art(0xc0d8e8, 0x7a94a8, 0x75c7e8, 0x8fd0ee, "robe");
const LICH = art(0xd8d2c0, 0x8a8474, 0x8a5fc0, 0x60e0d0, "robe", "horns");

const d = (id: string, name: string, spec: Parameters<typeof mon>[3]): MonsterDef =>
  mon("diablerie", id, name, spec);

export const DIABLERIE_ROSTER: readonly MonsterDef[] = [
  // --- The maddened: pilgrims the bramble broke -----------------------------
  d("madman", "Madman", { level: 0, role: "skirmisher", archetype: "biped", size: "medium", art: MADMAN, darkvision: false }),
  d("flagellant", "Flagellant", { level: 2, role: "soldier", archetype: "biped", size: "medium", art: FLAGELLANT, darkvision: false }),
  d("cultist-brawler", "Cultist Brawler", { level: 1, role: "soldier", archetype: "biped", size: "medium", art: CULTIST, darkvision: false }),
  d("cultist-witch", "Cultist Witch", { level: 3, role: "caster", archetype: "biped", size: "medium", art: CULTIST, darkvision: false }),

  // --- Rotgrubs: the thing the bramble digests with -------------------------
  d("rotgrub-swarm", "Rotgrub Swarm", { level: 0, role: "vermin", archetype: "swarm", size: "small", art: GRUB }),
  d("maggot-pack", "Maggot Pack", { level: 1, role: "vermin", archetype: "swarm", size: "medium", art: GRUB }),
  d("carrion-crawler", "Carrion Crawler", { level: 3, role: "brute", archetype: "vermin", size: "large", art: CRAWLER, specialAbility: "poison" }),
  d("great-carrion-crawler", "Great Carrion Crawler", { level: 5, role: "brute", archetype: "vermin", size: "huge", art: CRAWLER, specialAbility: "poison" }),

  // --- Spiders of the black hedge -------------------------------------------
  d("webber-spider", "Webber Spider", { level: 2, role: "skirmisher", archetype: "spider", size: "medium", art: SPIDER, specialAbility: "web" }),
  d("spitter-spider", "Spitter Spider", { level: 3, role: "skirmisher", archetype: "spider", size: "medium", art: SPIDER, specialAbility: "poison" }),
  d("arachnorok", "Arachnorok", { level: 9, role: "champion", archetype: "spider", size: "gargantuan", art: SPIDER, specialAbility: "web" }),

  // --- Quillboar warband: chaff, line, and the thorn-priests -----------------
  d("quillboar-wretch", "Quillboar Wretch", { level: 0, role: "vermin", archetype: "boar", size: "small", art: QUILL, specialAbility: "poison" }),
  d("quillboar-chopper", "Quillboar Chopper", { level: 1, role: "skirmisher", archetype: "boar", size: "medium", art: QUILL_WARRIOR }),
  d("quillboar-slasher", "Quillboar Slasher", { level: 2, role: "skirmisher", archetype: "boar", size: "medium", art: QUILL_WARRIOR }),
  d("quillboar-spearhide", "Quillboar Spearhide", { level: 3, role: "soldier", archetype: "boar", size: "medium", art: QUILL_WARRIOR, specialAbility: "thorns" }),
  d("quillboar-geomancer", "Quillboar Geomancer", { level: 4, role: "caster", archetype: "boar", size: "medium", art: QUILL_SHAMAN }),
  d("quillboar-necromancer", "Quillboar Necromancer", { level: 4, role: "caster", archetype: "boar", size: "medium", art: QUILL_SHAMAN }),
  d("razormane-hunter", "Razormane Hunter", { level: 2, role: "skirmisher", archetype: "boar", size: "medium", art: RAZOR_WARRIOR }),
  d("razormane-frenzy", "Razormane Frenzy", { level: 3, role: "brute", archetype: "boar", size: "large", art: RAZOR })
  ,d("razormane-warstalker", "Razormane Warstalker", { level: 8, role: "skirmisher", archetype: "boar", size: "large", art: RAZOR_WARRIOR }),
  d("razormane-geomancer", "Razormane Geomancer", { level: 5, role: "caster", archetype: "boar", size: "large", art: RAZOR_SHAMAN }),
  d("bristleback-bladewarden", "Bristleback Bladewarden", { level: 4, role: "soldier", archetype: "boar", size: "large", art: BRISTLE, specialAbility: "thorns" }),
  d("bristleback-thornweaver", "Bristleback Thornweaver", { level: 5, role: "caster", archetype: "boar", size: "large", art: BRISTLE_SHAMAN, specialAbility: "web" }),
  d("razormane-seer", "Razormane Seer", { level: 6, role: "caster", archetype: "boar", size: "large", art: RAZOR_SHAMAN }),
  d("razormane-warfrenzy", "Razormane Warfrenzy", { level: 6, role: "champion", archetype: "boar", size: "large", art: RAZOR_WARRIOR, specialAbility: "thorns" }),

  // --- Beasts of the thorn plains --------------------------------------------
  d("timber-wolf", "Timber Wolf", { level: 1, role: "skirmisher", archetype: "quadruped", size: "medium", art: WOLF }),
  d("vulture", "Vulture", { level: 0, role: "vermin", archetype: "avian", size: "small", art: VULTURE }),
  d("hunting-cat", "Hunting Cat", { level: 1, role: "skirmisher", archetype: "quadruped", size: "small", art: CAT }),
  d("savannah-huntress", "Savannah Huntress", { level: 3, role: "skirmisher", archetype: "quadruped", size: "medium", art: CAT }),
  d("pridemane", "Pridemane", { level: 5, role: "champion", archetype: "quadruped", size: "large", art: CAT }),
  d("zhevra", "Zhevra", { level: 2, role: "brute", archetype: "quadruped", size: "large", art: ZEBRA }),
  d("prairie-dog", "Prairie Dog", { level: 0, role: "vermin", archetype: "vermin", size: "tiny", art: RODENT }),
  d("heckfang-scavenger", "Heckfang Scavenger", { level: 2, role: "skirmisher", archetype: "quadruped", size: "medium", art: HYENA }),
  d("adder", "Adder", { level: 1, role: "vermin", archetype: "serpent", size: "small", art: SNAKE, specialAbility: "poison" }),
  d("stormsnout", "Stormsnout", { level: 6, role: "brute", archetype: "boar", size: "huge", art: STORM }),
  d("dusthoof-giraffe", "Dusthoof Giraffe", { level: 4, role: "brute", archetype: "quadruped", size: "huge", art: GIRAFFE }),
  d("plains-strider", "Towering Plains Strider", { level: 3, role: "brute", archetype: "avian", size: "large", art: STRIDER }),

  // --- Elementals the thorn-priests bind --------------------------------------
  d("stone-elemental", "Stone Elemental", { level: 6, role: "brute", archetype: "elemental", size: "large", art: STONE }),
  d("wind-elemental", "Wind Elemental", { level: 5, role: "skirmisher", archetype: "elemental", size: "large", art: WIND }),

  // --- Eldritch: what answers when the hedge is asked a question --------------
  d("eldritch-bone", "Eldritch Bone", { level: 4, role: "soldier", archetype: "skeletal", size: "medium", art: ELDRITCH_BONE }),
  d("eldritch-flesh", "Eldritch Flesh", { level: 5, role: "brute", archetype: "ooze", size: "large", art: ELDRITCH_FLESH, specialAbility: "engulf" }),
  d("gibbering-mouther", "Gibbering Mouther", { level: 7, role: "caster", archetype: "ooze", size: "large", art: MOUTHER, specialAbility: "engulf" }),

  // --- Swine: the bramble's favourite shape -----------------------------------
  d("wild-boar", "Wild Boar", { level: 1, role: "brute", archetype: "boar", size: "medium", art: BOAR }),
  d("giant-boar", "Giant Boar", { level: 3, role: "brute", archetype: "boar", size: "large", art: BOAR }),
  d("dire-boar", "Dire Boar", { level: 5, role: "brute", archetype: "boar", size: "large", art: DIRE_BOAR }),
  d("giant-warthog", "Giant Warthog", { level: 6, role: "brute", archetype: "boar", size: "huge", art: WARTHOG }),
  d("daeodon", "Daeodon", { level: 8, role: "brute", archetype: "boar", size: "gargantuan", art: DAEODON }),
  d("swinetaur", "Swinetaur", { level: 7, role: "soldier", archetype: "centaur", size: "huge", art: SWINETAUR }),
  d("wereboar", "Wereboar", { level: 5, role: "champion", archetype: "brute", size: "large", art: WERE }),

  // --- Things that hang in the dark --------------------------------------------
  d("large-bat", "Large Bat", { level: 1, role: "skirmisher", archetype: "flyer", size: "medium", art: BAT }),
  d("blind-hunter", "Blind Hunter", { level: 6, role: "skirmisher", archetype: "flyer", size: "large", art: BLIND_BAT }),
  d("blood-of-agamaggan", "Blood of Agamaggan", { level: 3, role: "brute", archetype: "ooze", size: "medium", art: BLOOD, specialAbility: "split" }),

  // --- The barrow dead ----------------------------------------------------------
  d("ghoul", "Ghoul", { level: 2, role: "skirmisher", archetype: "biped", size: "medium", art: GHOUL, undead: true }),
  d("barrow-ghast", "Barrow Ghast", { level: 6, role: "vermin", archetype: "biped", size: "medium", art: GHOUL, undead: true }),
  // --- Diablerie bestiary & core gloaming ------------------------------------
  d("skrell", "Skrell Raptor", { level: 1, role: "skirmisher", archetype: "biped", size: "small", art: CRAWLER }),
  d("tar-bat", "Tar Bat", { level: 1, role: "vermin", archetype: "flyer", size: "small", art: BAT }),
  d("howler", "Howler Halfling", { level: 1, role: "vermin", archetype: "biped", size: "small", art: MADMAN, darkvision: false }),
  d("mutant-catfish", "Mutant Catfish", { level: 2, role: "skirmisher", archetype: "serpent", size: "medium", art: CRAWLER, specialAbility: "poison" }),
  d("ichor-ooze", "Ichor Ooze", { level: 3, role: "brute", archetype: "ooze", size: "medium", art: GRUB, specialAbility: "corrode" }),
  d("gordock-breeg", "Gordock Breeg", { level: 4, role: "champion", archetype: "biped", size: "small", art: CULTIST, darkvision: false }),
  d("plogrina-bittermold", "Plogrina Bittermold", { level: 5, role: "caster", archetype: "ooze", size: "medium", art: CULTIST, specialAbility: "split" }),
  d("dralech", "Dralech Bone-Axe Demon", { level: 6, role: "champion", archetype: "biped", size: "large", art: ELDRITCH_BONE }),
  d("marrow-fiend", "Marrow Fiend", { level: 8, role: "champion", archetype: "quadruped", size: "large", art: ELDRITCH_FLESH, specialAbility: "thorns" }),

  // --- Core Gloaming Additions ---
  d("spider", "Spider", { level: 0, role: "vermin", archetype: "spider", size: "tiny", art: SPIDER, specialAbility: "web" }),
  d("rat", "Rat", { level: 0, role: "vermin", archetype: "vermin", size: "tiny", art: RODENT }),
  d("jellyfish", "Jellyfish", { level: 0, role: "vermin", archetype: "ooze", size: "small", art: GRUB }),
  d("giant-centipede", "Giant Centipede", { level: 1, role: "vermin", archetype: "vermin", size: "medium", art: CRAWLER, specialAbility: "poison" }),
  d("stingbat", "Stingbat", { level: 1, role: "vermin", archetype: "flyer", size: "small", art: BAT }),
  d("badger", "Badger", { level: 1, role: "skirmisher", archetype: "quadruped", size: "small", art: RODENT }),
  d("fairy", "Fairy", { level: 1, role: "caster", archetype: "flyer", size: "tiny", art: CULTIST, darkvision: true }),
  d("acolyte", "Acolyte", { level: 1, role: "caster", archetype: "biped", size: "medium", art: CULTIST, darkvision: false }),
  d("peasant", "Peasant", { level: 1, role: "vermin", archetype: "biped", size: "medium", art: MADMAN, darkvision: false }),
  d("spider-swarm", "Spider Swarm", { level: 2, role: "vermin", archetype: "swarm", size: "medium", art: SPIDER, specialAbility: "web" }),
  d("violet-fungus", "Violet Fungus", { level: 2, role: "brute", archetype: "plant", size: "medium", art: GRUB }),
  d("giant-wasp", "Giant Wasp", { level: 2, role: "vermin", archetype: "flyer", size: "medium", art: CRAWLER, specialAbility: "poison" }),
  d("rot-flower-gloaming", "Rot Flower", { level: 2, role: "brute", archetype: "plant", size: "medium", art: GRUB }),
  d("giant-frog", "Giant Frog", { level: 2, role: "brute", archetype: "vermin", size: "medium", art: GRUB }),
  d("giant-leech", "Giant Leech", { level: 2, role: "vermin", archetype: "vermin", size: "medium", art: GRUB }),
  d("gray-ooze", "Gray Ooze", { level: 2, role: "brute", archetype: "ooze", size: "medium", art: GRUB, specialAbility: "corrode" }),
  d("will-o-wisp", "Will-o'-Wisp", { level: 2, role: "caster", archetype: "elemental", size: "tiny", art: CULTIST }),
  d("zombie", "Zombie", { level: 2, role: "soldier", archetype: "biped", size: "medium", art: GHOUL, undead: true }),
  d("ettercap", "Ettercap", { level: 3, role: "skirmisher", archetype: "spider", size: "medium", art: SPIDER, specialAbility: "web" }),
  d("scarecrow", "Scarecrow", { level: 3, role: "soldier", archetype: "biped", size: "medium", art: MADMAN }),
  d("harpy", "Harpy", { level: 3, role: "skirmisher", archetype: "avian", size: "medium", art: VULTURE }),
  d("strangler", "Strangler", { level: 3, role: "skirmisher", archetype: "biped", size: "medium", art: CRAWLER }),
  d("centipede-swarm", "Centipede Swarm", { level: 4, role: "vermin", archetype: "swarm", size: "medium", art: CRAWLER, specialAbility: "poison" }),
  d("dryad", "Dryad", { level: 4, role: "caster", archetype: "biped", size: "medium", art: CULTIST }),
  d("shambling-mound", "Shambling Mound", { level: 4, role: "brute", archetype: "plant", size: "large", art: GRUB }),
  d("siren", "Siren", { level: 4, role: "caster", archetype: "biped", size: "medium", art: CULTIST }),
  d("werewolf", "Werewolf", { level: 4, role: "champion", archetype: "biped", size: "medium", art: WERE }),
  d("gelatinous-cube", "Gelatinous Cube", { level: 5, role: "brute", archetype: "ooze", size: "large", art: GRUB, specialAbility: "engulf" }),
  d("troll", "Troll", { level: 5, role: "champion", archetype: "brute", size: "large", art: CRAWLER }),
  d("weald-hag", "Weald Hag", { level: 6, role: "caster", archetype: "biped", size: "medium", art: CULTIST }),
  d("black-pudding", "Black Pudding", { level: 6, role: "brute", archetype: "ooze", size: "large", art: GRUB, specialAbility: "split" }),
  d("night-hag", "Night Hag", { level: 8, role: "caster", archetype: "biped", size: "medium", art: CULTIST }),
  d("treant", "Treant", { level: 8, role: "champion", archetype: "plant", size: "huge", art: GRUB }),
];

assertRosterComplete("diablerie", DIABLERIE_ROSTER);
