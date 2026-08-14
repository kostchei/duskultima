import { describe, expect, it } from "vitest";
import { carouseCost, carouseEffectsForText, resolveCarouse, resolveGroupCarouse, groupCarouseCost, type CarouseTier } from "./downtime";
import { Dice } from "./dice";
import { TableRegistry } from "./tables";
import { ALL_CAROUSE_TABLES } from "../data/tables/carousing";

function tablesWithCarousing(): TableRegistry {
  const tables = new TableRegistry();
  for (const table of ALL_CAROUSE_TABLES) tables.register(table);
  return tables;
}

describe("Shadowdark carousing XP", () => {
  it("uses the published ten cost and event-bonus tiers", () => {
    const cases: Array<[CarouseTier, number]> = [
      ["worthy-night", 30],
      ["full-revelry", 100],
      ["tavern-crawl", 300],
      ["finest-voyage", 600],
      ["weeklong-bender", 900],
      ["ten-day-fete", 1200],
      ["legendary-weeks", 1800],
      ["outrageous-finery", 2400],
      ["citywide-festival", 3000],
      ["nobles-fete", 4000],
    ];
    expect(cases.map(([tier]) => carouseCost(tier))).toEqual(cases.map(([, cost]) => cost));
  });

  it("rolls 1d8 plus the tier bonus against the Carousing Outcome table for XP and benefit/mishap rolls", () => {
    const tables = tablesWithCarousing();

    const low = resolveCarouse(new Dice(1), tables, "worthy-night", 30);
    expect(low.result.total).toBeGreaterThanOrEqual(1);
    expect(low.result.xp).toBeGreaterThanOrEqual(2);

    const high = resolveCarouse(new Dice(2), tables, "nobles-fete", 4000);
    expect(high.result.total).toBeGreaterThan(0);
    expect(high.result.benefits.length + high.result.mishaps.length).toBeGreaterThan(0);
  });

  it("charges per head: total cost is the tier cost times the number of participants", () => {
    expect(groupCarouseCost("full-revelry", 3)).toBe(300);
    expect(() => groupCarouseCost("full-revelry", 0)).toThrow();
  });

  it("rolls every participant independently for their own total, XP, and outcomes", () => {
    const tables = tablesWithCarousing();
    const group = resolveGroupCarouse(new Dice(42), tables, "tavern-crawl", 900, 3);
    expect(group.cost).toBe(900);
    expect(group.results).toHaveLength(3);
    for (const result of group.results) {
      expect(result.total).toBeGreaterThanOrEqual(1);
      expect(result.xp).toBeGreaterThan(0);
    }
  });

  it("throws when the pooled gold can't cover the whole party", () => {
    const tables = tablesWithCarousing();
    expect(() => resolveGroupCarouse(new Dice(1), tables, "worthy-night", 29, 1)).toThrow();
  });

  it("returns structured effects for mechanically explicit outcomes", () => {
    expect(carouseEffectsForText("You won 50 gp against a famous gambler; +1 renown", "benefit"))
      .toEqual([{ kind: "goldDelta", amount: 50 }]);
    expect(carouseEffectsForText("A gloating thief burgled 50% of your wealth; -3 renown", "mishap"))
      .toEqual([{ kind: "goldPercent", percent: -50 }]);
    expect(carouseEffectsForText("A soothsayer reads your palm; gain a luck token", "benefit"))
      .toEqual([{ kind: "gainLuck", amount: 1 }]);
    expect(carouseEffectsForText("A beggar gives you a gutter trinket (roll an ancestry trinket)", "benefit"))
      .toEqual([{ kind: "addTrinket" }]);
    expect(carouseEffectsForText("You woke up in a lab; gain two random magic potions", "benefit"))
      .toEqual([{ kind: "addRandomPotion", quantity: 2 }]);
    expect(carouseEffectsForText("A pickpocket successfully lifted 1d4 pieces of your gear", "mishap"))
      .toEqual([{ kind: "removeGear", count: "1d4" }]);
  });
});
