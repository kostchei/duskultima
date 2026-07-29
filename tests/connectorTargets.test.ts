import { describe, expect, it } from "vitest";
import { resolveTargetConnector } from "../src/game/level/connectorTargets";

const connector = {
  id: "gate-a",
  fromRoomId: "room-1",
  toRoomId: "room-2",
  kind: "gate",
} as any;

describe("resolveTargetConnector", () => {
  it("returns an authored connector", () => {
    expect(resolveTargetConnector([connector], "gate-a")).toBe(connector);
  });

  it("throws for missing or unresolved targets", () => {
    expect(() => resolveTargetConnector([connector], undefined)).toThrow(/missing connectorId/);
    expect(() => resolveTargetConnector([connector], "typo")).toThrow(/unknown connector "typo"/);
  });
});
