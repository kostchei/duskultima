import { describe, expect, it } from "vitest";
import { RewindBuffer } from "../src/game/systems/rewind";

describe("RewindBuffer", () => {
  it("samples at the configured interval and resolves history at or before a time", () => {
    const history = new RewindBuffer<string>(10_000, 500);
    expect(history.capture(0, "start")).toBe(true);
    expect(history.capture(100, "too-soon")).toBe(false);
    expect(history.capture(500, "half")).toBe(true);
    expect(history.atOrBefore(499)).toBe("start");
    expect(history.atOrBefore(500)).toBe("half");
  });

  it("drops entries older than the bounded history", () => {
    const history = new RewindBuffer<number>(1_000, 100);
    history.capture(0, 0);
    history.capture(1_100, 1);
    expect(history.atOrBefore(0)).toBeNull();
  });
});
