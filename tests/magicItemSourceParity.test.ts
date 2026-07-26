import { describe, expect, it } from "vitest";
import {
  Character,
  Dice,
  activateNamedItem,
  canUseItem,
  hasCapability,
  hostileSpellTargetDc,
  primeWitchknife,
  restoreOnRest,
  usePotion,
} from "../src/engine";
import { generatedMagicItem, item, magicItemSpell, spellForMagicItem } from "../src/data";
import { CORE_TREASURE_ITEM_SPECS } from "../src/data/tables/treasure";

const SOURCE_SPELLS = {
  1: ["alarm", "burning-hands", "charm-person", "detect-magic", "feather-fall", "floating-disk", "hold-portal", "light", "mage-armor", "magic-missile", "protection-from-evil", "sleep"],
  2: ["acid-arrow", "alter-self", "detect-thoughts", "fixed-object", "hold-person", "invisibility", "knock", "levitate", "mirror-image", "misty-step", "silence", "web"],
  3: ["animate-dead", "dispel-magic", "fabricate", "fireball", "fly", "gaseous-form", "illusion", "lightning-bolt", "magic-circle", "protection-from-energy", "sending", "speak-with-dead"],
  4: ["arcane-eye", "cloudkill", "confusion", "control-water", "dimension-door", "divination", "passwall", "polymorph", "resilient-sphere", "stoneskin", "telekinesis", "wall-of-force"],
  5: ["antimagic-shell", "create-undead", "disintegrate", "hold-monster", "plane-shift", "power-word-kill", "prismatic-orb", "scrying", "shapechange", "summon-extraplanar", "teleport", "wish"],
} as const;

function character(id = "hero"): Character {
  return new Character({
    id,
    name: "Hero",
    className: "wizard",
    alignment: "neutral",
    stats: { STR: 10, DEX: 10, CON: 10, INT: 16, WIS: 10, CHA: 10 },
    maxHp: 20,
  });
}

describe("core scroll and wand source parity", () => {
  it("preserves every d12 face at every tier", () => {
    for (const [tierText, ids] of Object.entries(SOURCE_SPELLS)) {
      const tier = Number(tierText);
      ids.forEach((id, index) => {
        expect(magicItemSpell(tier, index + 1), `tier ${tier} face ${index + 1}`).toMatchObject({ id, tier });
      });
    }
  });

  it("generates all twelve exact spell variants for every generic treasure row", () => {
    const containers = CORE_TREASURE_ITEM_SPECS.filter((spec) => spec.spellTier !== undefined);
    expect(containers).toHaveLength(11);
    for (const spec of containers) {
      for (let face = 1; face <= 12; face++) {
        const generated = generatedMagicItem(spec.id, face);
        const bound = spellForMagicItem(generated.id, generated.rulesId, generated.boundSpellId)!;
        expect(bound.tier, `${spec.id} face ${face}`).toBe(spec.spellTier);
        expect(bound.id).toBe(SOURCE_SPELLS[spec.spellTier as keyof typeof SOURCE_SPELLS][face - 1]);
        expect(generated.tags).toContain(spec.spellContainer);
        expect(generated.use?.actions).toContain("cast");
        expect(generated.valueGp).toBe(spec.valueGp);
        expect(generated.treasureQuality).toBe(spec.treasureQuality);
      }
    }
  });
});

describe("named magic item source parity", () => {
  it("encodes every named core-table item as executable rules", () => {
    expect(item("egg-of-cockatrice").namedEffect).toEqual({ kind: "summon", monsterId: "cockatrice", rounds: 5 });
    expect(item("bag-of-holding").capacityBonus).toBe(10);
    expect(item("ring-feather-falling").use).toMatchObject({ charges: 1, rechargeOnRest: true });
    expect(item("kytherian-cog").namedEffect).toEqual({ kind: "sessionLuck" });
    expect(item("crystal-ball")).toMatchObject({ requiredClass: "wizard", boundSpellId: "scrying", use: { inertOnFail: true } });
    expect(item("immovable-rod").namedEffect).toEqual({ kind: "fixInSpace", capacityLb: 5000 });
    expect(item("portable-hole").capacityBonus).toBe(20);
    expect(item("scroll-covenant").namedEffect).toEqual({ kind: "divineHalo", count: 3 });
    expect(item("brak-cube").namedEffect).toEqual({ kind: "statTo18" });
    expect(item("flying-carpet").namedEffect).toEqual({ kind: "flyingMount", riders: 2, speed: "doubleNear" });
    expect(item("obsidian-witchknife")).toMatchObject({ damage: "1d4", magicBonus: 2, forbiddenAlignment: "law", namedEffect: { kind: "spellcastBloodBonus" } });
    expect(item("armor-saint-terragnis")).toMatchObject({ magicBonus: 3, requiredAlignment: "law", hostileSpellDc: 18 });
    expect(item("staff-of-ord")).toMatchObject({ magicBonus: 3, requiredClass: "wizard", hostileSpellDc: 18, boundSpellIds: ["dimension-door", "fireball", "sending", "telekinesis"] });
  });

  it("executes cube, rod, halo, carpet, and witchknife effects", () => {
    const hero = character();
    const rod = item("immovable-rod");
    hero.inventory.add(rod);
    expect(activateNamedItem(hero, rod, new Dice(1)).active).toBe(true);
    expect(activateNamedItem(hero, rod, new Dice(1)).active).toBe(false);

    const cube = item("brak-cube");
    hero.inventory.add(cube);
    activateNamedItem(hero, cube, { die: () => 6 });
    expect(hero.stats.CHA).toBe(18);
    expect(hero.inventory.has(cube.id)).toBe(false);

    const covenant = item("scroll-covenant");
    hero.inventory.add(covenant);
    activateNamedItem(hero, covenant, new Dice(1));
    expect(hostileSpellTargetDc(hero)).toBe(15);

    hero.inventory.add(item("flying-carpet"));
    expect(hasCapability(hero, "canFly")).toBe(true);

    const knife = item("obsidian-witchknife");
    hero.inventory.add(knife);
    hero.equipWeapon(knife);
    expect(primeWitchknife(hero, 3)).toBe(3);
    expect(hero.hp).toBe(17);
    expect(hero.effects.find((effect) => effect.id === "item:witchknife-blood")?.hooks).toContainEqual({ kind: "checkBonus", applies: "spellcast", bonus: 3 });
  });

  it("tracks source-length weekly and monthly recharges", () => {
    const hero = character();
    const egg = item("egg-of-cockatrice");
    hero.inventory.add(egg);
    activateNamedItem(hero, egg, new Dice(1));
    expect(canUseItem(hero, hero.itemState, egg, "activate").ok).toBe(false);
    for (let rest = 0; rest < 6; rest++) restoreOnRest(hero);
    expect(canUseItem(hero, hero.itemState, egg, "activate").ok).toBe(false);
    restoreOnRest(hero);
    expect(canUseItem(hero, hero.itemState, egg, "activate").ok).toBe(true);
  });

  it("applies the exact named potion durations, healing bands, and giant-strength damage rule", () => {
    const hero = character();
    hero.level = 7;
    hero.takeDamage(19);
    const healing = item("potion-healing");
    hero.inventory.add(healing);
    const healed = usePotion(hero, hero, healing, { roll: (formula) => formula === "3d10" ? 17 : 0 });
    expect(healed.healed).toBe(17);

    for (const [id, duration] of [["potion-invisibility", 10], ["potion-flying", 10], ["potion-giant-strength", 10], ["potion-polymorph", 60]] as const) {
      const potion = item(id);
      hero.inventory.add(potion);
      const result = usePotion(hero, hero, potion, { roll: () => 1 });
      expect(result.effect?.duration?.remaining, id).toBe(duration);
    }
    expect(hero.effects.find((effect) => effect.id === "potion:giant-strength")?.hooks).toContainEqual({ kind: "meleeDamageMultiplier", value: 2 });
  });
});
