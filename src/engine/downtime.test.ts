import { describe, expect, it } from "vitest";
import { carouseCost, resolveCarouse, type CarouseTier } from "./downtime";

describe("Shadowdark carousing XP", () => {
  it("uses the published seven cost and event-bonus tiers", () => {
    const cases: Array<[CarouseTier, number]> = [
      ["worthy-night", 30],
      ["full-revelry", 100],
      ["tavern-crawl", 300],
      ["finest-voyage", 600],
      ["weeklong-bender", 900],
      ["ten-day-fete", 1200],
      ["legendary-weeks", 1800],
    ];
    expect(cases.map(([tier]) => carouseCost(tier))).toEqual(cases.map(([, cost]) => cost));
  });

  it("rolls 1d8 plus the tier bonus and awards the matching XP band", () => {
    const result = resolveCarouse({ die: () => 1 }, "legendary-weeks", 1800);
    expect(result.event.roll).toBe(1);
    expect(result.event.total).toBe(7);
    expect(result.xp).toBe(4);

    const legendaryFind = resolveCarouse({ die: () => 8 }, "legendary-weeks", 1800);
    expect(legendaryFind.event.total).toBe(14);
    expect(legendaryFind.xp).toBe(4);
  });
});
