import { describe, it } from "vitest";
import { allItems } from "../src/data/items";

describe("audit", () => {
  it("dumps", () => {
    const rows: string[] = [];
    for (const def of allItems()) {
      const equippable = Boolean(def.armor || def.damage || def.shield);
      const usable = Boolean(def.use);
      const sellable = def.valueGp !== undefined && def.valueGp > 0;
      const passive = Boolean(def.capacityBonus || def.namedEffect || def.hostileSpellDc);
      if (!equippable && !usable && !sellable && !passive) {
        rows.push(`INERT   ${def.id.padEnd(28)} "${def.name}" tags=${def.tags.join("|")} xp=${def.xpValue ?? "-"}`);
      }
    }
    console.log("\n" + rows.length + " inert\n" + (rows.join("\n") || "(clean)"));
  });
});
