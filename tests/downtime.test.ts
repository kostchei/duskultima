import { describe, expect, it } from "vitest";
import { carouseCost, instructorTrainingDc, resolveCarouse } from "../src/engine";

describe("carousing", () => {
  it("spends the tier cost and combines base XP with the event", () => {
    const dice = { die: () => 12 };
    expect(resolveCarouse(dice as any, "bold", 100)).toMatchObject({
      tier: "bold",
      cost: 100,
      xp: 6,
      event: { roll: 12, title: "Night of Legends" },
    });
    expect(carouseCost("legendary")).toBe(500);
  });

  it("cannot be selected without enough gold", () => {
    expect(() => resolveCarouse({ die: () => 1 } as any, "humble", 19)).toThrow("costs 20 gold");
  });
});

describe("instructor training", () => {
  it("lowers the retry DC to a floor of 9", () => {
    expect(instructorTrainingDc(0)).toBe(15);
    expect(instructorTrainingDc(1)).toBe(12);
    expect(instructorTrainingDc(2)).toBe(9);
    expect(instructorTrainingDc(20)).toBe(9);
  });
});
