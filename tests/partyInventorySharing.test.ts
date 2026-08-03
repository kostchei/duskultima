import { describe, expect, it } from "vitest";
import { chooseAutoLootCarrier } from "../src/game/systems/partyInventory";
import { Inventory } from "../src/engine";
import { item } from "../src/data/items";

function mockCarrier(capacity: number) {
  return { character: { inventory: new Inventory(capacity) } };
}

describe("Party Inventory Auto-Loot Sharing & Unified Party Shop", () => {
  const def = item("potion-healing");

  it("should pick preferred carrier if they have space", () => {
    const char1 = mockCarrier(5);
    const char2 = mockCarrier(5);

    const recipient = chooseAutoLootCarrier(char1, [char1, char2], def, 1);
    expect(recipient).toBe(char1);
  });

  it("should automatically route loot to second party member if preferred pack is completely full", () => {
    const char1 = mockCarrier(1);
    const char2 = mockCarrier(5);

    char1.character.inventory.add(item("longsword"));
    expect(char1.character.inventory.canAdd(def)).toBe(false);

    // Auto-loot should automatically route to char2 who has free space
    const recipient = chooseAutoLootCarrier(char1, [char1, char2], def, 1);
    expect(recipient).toBe(char2);
  });

  it("should return undefined if every member of the party is completely full", () => {
    const char1 = mockCarrier(1);
    const char2 = mockCarrier(1);

    char1.character.inventory.add(item("longsword"));
    char2.character.inventory.add(item("longsword"));

    const recipient = chooseAutoLootCarrier(char1, [char1, char2], def, 1);
    expect(recipient).toBeUndefined();
  });
});
