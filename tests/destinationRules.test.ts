import { describe, expect, it } from "vitest";
import {
  advanceOath,
  advancePatron,
  midnightSunOathOptions,
  patronOptions,
  type PatronState,
} from "../src/engine";

describe("Midnight Sun oaths", () => {
  it("offers all three ranks and fulfils their distinct objectives", () => {
    const [worthy, mighty, legendary] = midnightSunOathOptions("hero", 4);
    expect([worthy!.rank, mighty!.rank, legendary!.rank]).toEqual(["worthy", "mighty", "legendary"]);
    expect(advanceOath(advanceOath(worthy!, "kill"), "kill")).toMatchObject({
      progress: 2,
      fulfilled: true,
      failed: false,
    });
    expect(advanceOath(mighty!, "mercy")).toMatchObject({ fulfilled: true });
    expect(advanceOath(legendary!, "claim")).toMatchObject({ fulfilled: true });
  });

  it("breaks the no-retreat legendary oath before a later claim can fulfil it", () => {
    const legendary = midnightSunOathOptions("hero", 1)[2]!;
    const broken = advanceOath(legendary, "retreat");
    expect(broken.failed).toBe(true);
    expect(advanceOath(broken, "claim")).toEqual(broken);
  });
});

describe("Diablerie patron bargains", () => {
  const state = (patronId: PatronState["patronId"]): PatronState => ({
    characterId: "hero",
    patronId,
    favor: 0,
    progress: 0,
    demandComplete: false,
    tabooBroken: false,
  });

  it("offers a deterministic subset of three patrons", () => {
    expect(patronOptions(12)).toEqual(patronOptions(12));
    expect(new Set(patronOptions(12).map((def) => def.id)).size).toBe(3);
  });

  it("raises favor exactly once when a demand is completed", () => {
    let bargain = state("kytheros");
    bargain = advancePatron(bargain, "kill").state;
    bargain = advancePatron(bargain, "kill").state;
    const completion = advancePatron(bargain, "kill");
    expect(completion.demandCompleted).toBe(true);
    expect(completion.state).toMatchObject({ progress: 3, demandComplete: true, favor: 1 });
    expect(advancePatron(completion.state, "kill").state.favor).toBe(1);
  });

  it("records a taboo breach and reduces favor", () => {
    const result = advancePatron({ ...state("willowman"), favor: 1 }, "retreat");
    expect(result.tabooBroken).toBe(true);
    expect(result.state).toMatchObject({ favor: 0, tabooBroken: true });
  });
});
