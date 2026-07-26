import { describe, expect, it } from "vitest";
import type { SavedCharacter } from "../src/game/state";
import {
  chooseDungeonReward,
  maximumSpellTier,
  nextDungeonSave,
  type PartyProgress,
} from "../src/game/progression";
import { isPlebName, item } from "../src/data";
import { skinsForZone } from "../src/game/visual/skins";

const fighter: PartyProgress = { className: "fighter", level: 1, knownSpellIds: [] };
const thief: PartyProgress = { className: "thief", level: 1, knownSpellIds: [] };
const priest: PartyProgress = {
  className: "priest",
  level: 1,
  knownSpellIds: ["cure-wounds", "light", "turn-undead"],
};
const wizard: PartyProgress = {
  className: "wizard",
  level: 1,
  knownSpellIds: ["magic-missile", "burning-hands", "mage-armor"],
};

function saved(id: string, className: string, dead = false): SavedCharacter {
  return {
    id,
    name: id,
    className,
    stats: { STR: 15, DEX: 12, CON: 12, INT: 12, WIS: 12, CHA: 10 },
    level: 1,
    xp: 0,
    hp: dead ? 0 : 8,
    maxHp: 8,
    knownSpells: [],
    effects: [],
    inventory: [],
    wornArmorId: null,
    wieldedWeaponId: null,
    carriedShieldId: null,
    shieldStowed: false,
    luckToken: true,
    dying: null,
    dead,
  };
}

describe("campaign rewards", () => {
  it("can turn the guaranteed treasure result into one rescued companion", () => {
    const reward = Array.from({ length: 50 }, (_, dungeonIndex) => chooseDungeonReward(dungeonIndex, [fighter]))
      .find((candidate) => candidate.kind === "companion")!;
    expect(reward.kind).toBe("companion");
    if (reward.kind !== "companion") throw new Error("Expected a companion reward");
    expect(["thief", "priest", "wizard"]).toContain(reward.className);
    expect(isPlebName(reward.name)).toBe(true);
    expect(reward.title).toContain(reward.name);
  });

  it("splits guaranteed finds approximately 50/50 between treasure and rescues", () => {
    const fullParty = [fighter, thief, priest, wizard];
    const rewards = Array.from({ length: 1000 }, (_, dungeonIndex) => chooseDungeonReward(dungeonIndex, fullParty));
    const rescues = rewards.filter((reward) => reward.kind === "companion");
    const treasures = rewards.filter((reward) => reward.kind === "treasure" || reward.kind === "gold");
    expect(rescues.length).toBeGreaterThan(450);
    expect(rescues.length).toBeLessThan(550);
    expect(treasures).toHaveLength(1000 - rescues.length);
    expect(rescues.every((reward) => reward.kind === "companion" && reward.escortGold === 10)).toBe(true);
  });

  it("rolls the vault treasure tables instead of always the same item", () => {
    const fullParty = [fighter, thief, priest, wizard];
    const firstTreasureSlotItemIds = new Set<string>();
    const secondTreasureSlotItemIds = new Set<string>();
    // Every 5th dungeonIndex lands back on one of the two treasure positions;
    // sample several cycles so both positions produce a real spread of finds.
    for (let cycle = 0; cycle < 12; cycle++) {
      const firstReward = chooseDungeonReward(1 + cycle * 5, fullParty);
      const secondReward = chooseDungeonReward(2 + cycle * 5, fullParty);
      if (firstReward.kind === "treasure") firstTreasureSlotItemIds.add(firstReward.itemId);
      if (secondReward.kind === "treasure") secondTreasureSlotItemIds.add(secondReward.itemId);
    }
    expect(firstTreasureSlotItemIds.size).toBeGreaterThan(1);
    expect(secondTreasureSlotItemIds.size).toBeGreaterThan(1);
  });

  it("bands vault treasure by the party's furthest-advanced level", () => {
    const lowParty = [fighter, thief, priest, wizard];
    const highParty = [
      { ...fighter, level: 10 },
      { ...thief, level: 10 },
      { ...priest, level: 10 },
      { ...wizard, level: 10 },
    ];
    // Sample many cycles at each tier; a levelled-up party should see at least
    // one reward a fresh level-1 party never rolls (and vice versa isn't
    // required, since low-tier loot can still appear high-tier tables' text
    // never does at level 1) — the meaningful signal is the two samples differ.
    const lowItems = new Set<string>();
    const highItems = new Set<string>();
    for (let cycle = 0; cycle < 20; cycle++) {
      const lowReward = chooseDungeonReward(1 + cycle * 5, lowParty);
      const highReward = chooseDungeonReward(1 + cycle * 5, highParty);
      if (lowReward.kind === "treasure") lowItems.add(lowReward.itemId);
      if (highReward.kind === "treasure") highItems.add(highReward.itemId);
    }
    expect(lowItems).not.toEqual(highItems);
  });

  it("gives a Cursed Scroll destination a chance at its own flavor treasure", () => {
    const fullParty = [fighter, thief, priest, wizard];
    const itemIds = new Set<string>();
    for (let cycle = 0; cycle < 30; cycle++) {
      const reward = chooseDungeonReward(1 + cycle * 5, fullParty, "diablerie");
      if (reward.kind === "treasure") itemIds.add(reward.itemId);
    }
    // carved-flame-bone only exists in DIABOLICAL_TREASURE (CS1's flavor table).
    expect(itemIds.has("carved-flame-bone")).toBe(true);
  });

  it("keeps a rolled vault-treasure reward stable when the same save is reloaded", () => {
    const fullParty = [fighter, thief, priest, wizard];
    expect(chooseDungeonReward(1, fullParty, "red-sands")).toEqual(
      chooseDungeonReward(1, fullParty, "red-sands"),
    );
  });

  it("only ever grants vault treasure itemIds that resolve to a real item", () => {
    const fullParty = [fighter, thief, priest, wizard];
    for (let cycle = 0; cycle < 40; cycle++) {
      for (const zone of [undefined, "diablerie", "red-sands", "midnight-sun", "city-of-masks"] as const) {
        const firstReward = chooseDungeonReward(1 + cycle * 5, fullParty, zone);
        const secondReward = chooseDungeonReward(2 + cycle * 5, fullParty, zone);
        for (const reward of [firstReward, secondReward]) {
          if (reward.kind === "treasure") {
            expect(() => item(reward.itemId)).not.toThrow();
          }
        }
      }
    }
  });

  it("describes rolled treasure by its actual table result rather than its cycle position", () => {
    const fullParty = [fighter, thief, priest, wizard];
    for (let dungeonIndex = 1; dungeonIndex < 100; dungeonIndex += 5) {
      const reward = chooseDungeonReward(dungeonIndex, fullParty);
      if (reward.kind !== "treasure") continue;
      const def = item(reward.itemId);
      expect(reward).toMatchObject({
        title: def.name,
        valueGp: (def.valueGp ?? 0) * reward.qty,
        quality: def.treasureQuality,
        tableId: "treasure-0-3",
      });
      expect(reward.roll).toBeGreaterThanOrEqual(reward.entryMin);
      expect(reward.roll).toBeLessThanOrEqual(reward.entryMax);
      expect(reward.entryMin).toBeLessThanOrEqual(reward.entryMax);
      return;
    }
    throw new Error("No treasure reward produced");
  });

  it("retains spell-tier progression for scroll and item effects", () => {
    expect([1, 1, 2, 2, 3, 3, 4, 4, 5, 5].map((_, index) => maximumSpellTier(index + 1)))
      .toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);

  });

  it("keeps the random reward stable when the same save is reloaded", () => {
    const party = [fighter, thief, { ...priest, level: 3 }, { ...wizard, level: 3 }];
    expect(chooseDungeonReward(9, party)).toEqual(chooseDungeonReward(9, party));
  });

  it("chooses a missing base role when the treasure result is a rescue", () => {
    const reward = Array.from({ length: 50 }, (_, dungeonIndex) => chooseDungeonReward(dungeonIndex, [fighter, thief]))
      .find((candidate) => candidate.kind === "companion")!;
    expect(reward.kind).toBe("companion");
    if (reward.kind !== "companion") throw new Error("Expected a companion reward");
    expect(["priest", "wizard"]).toContain(reward.className);
  });

  it("scales the full-party escort reward to 10 gp times average party level", () => {
    const fullParty = [
      { ...fighter, level: 2 }, { ...thief, level: 3 }, { ...priest, level: 4 }, { ...wizard, level: 5 },
    ];
    const reward = Array.from({ length: 50 }, (_, dungeonIndex) => chooseDungeonReward(dungeonIndex, fullParty))
      .find((candidate) => candidate.kind === "companion")!;
    expect(reward).toMatchObject({ kind: "companion", escortGold: 30 });
  });
});

describe("between-dungeon persistence", () => {
  it("carries living party members and campaign wealth into the next dungeon", () => {
    const brakka = saved("Brakka", "fighter");
    const vex = saved("Vex", "thief");
    const fallen = saved("Odessa", "priest", true);
    const next = nextDungeonSave(
      { coinsBanked: 740, messages: [{ text: "Vault opened", color: "#fff" }], runSeed: 99 },
      7,
      [brakka, vex, fallen],
      "red-sands",
      1234,
    );

    expect(next).toMatchObject({
      slotId: 0,
      timestamp: 1234,
      dungeonIndex: 8,
      zone: "red-sands",
      currentRoom: 1,
      hasCrown: false,
      kills: 0,
      coinsBanked: 740,
      rescuedIds: ["fighter", "thief"],
    });
    expect(next.party.map((member) => member.name)).toEqual(["Brakka", "Vex"]);
    // The stored skin belongs to the chosen scroll.
    expect(next.skinId).toBeDefined();
    expect(skinsForZone("red-sands").some((s) => s.id === next.skinId)).toBe(true);
  });
});
