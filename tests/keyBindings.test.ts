import { describe, expect, it } from "vitest";
import { effectiveKeyBindings, primaryKeyFor } from "../src/game/input/bindings";

describe("key binding overrides", () => {
  it("moves a semantic action to one preferred key", () => {
    const bindings = effectiveKeyBindings({ jump: "J" });
    expect(bindings.SPACE).not.toContain("jump");
    expect(bindings.J).toContain("jump");
    expect(primaryKeyFor("jump", { jump: "J" })).toBe("J");
  });

  it("ignores unsupported persisted values", () => {
    const bindings = effectiveKeyBindings({ jump: "NOPE" });
    expect(bindings.SPACE).toContain("jump");
  });

  it("can represent a conflict-free swap", () => {
    const bindings = effectiveKeyBindings({ jump: "J", attack: "SPACE" });
    expect(bindings.J).toContain("jump");
    expect(bindings.J).not.toContain("attack");
    expect(bindings.SPACE).toContain("attack");
  });
});
