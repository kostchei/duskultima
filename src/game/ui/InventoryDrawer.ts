/**
 * Inventory Drawer component: displays equipped gear, slot capacity,
 * item stacks, and item action options.
 */

import Phaser from "phaser";
import type { Character, ItemStack } from "../../engine";
import { partyCoinSlots, stackSlots } from "../../engine";
import { RENDER_SCALE } from "../display";

const UI_STYLE = {
  fontFamily: '"Trebuchet MS", Arial, sans-serif',
  fontSize: "12px",
  color: "#f0eee9",
  resolution: RENDER_SCALE,
} as const;

const DATA_STYLE = {
  fontFamily: "Consolas, monospace",
  fontSize: "10px",
  color: "#c9cbd1",
  resolution: RENDER_SCALE,
} as const;

export interface InventoryDrawerConfig {
  character: Character;
  isLeader: boolean;
  totalCoins: number;
  partySize: number;
  selectedItemId?: string;
  titleColor?: string;
}

export function formatInventorySummary(cfg: InventoryDrawerConfig): {
  usedSlots: number;
  capacity: number;
  coinSlots: number;
  equipmentText: string;
} {
  const { character, isLeader, totalCoins, partySize } = cfg;
  const coinSlots = isLeader ? partyCoinSlots(totalCoins, partySize) : 0;
  const usedSlots = character.inventory.slotsUsed() + coinSlots;
  const capacity = character.inventory.capacity;

  const armorName = character.wornArmor ? character.wornArmor.name : "None (AC 10)";
  const weaponName = character.wieldedWeapon ? character.wieldedWeapon.name : "None";
  const shieldName = character.carriedShield
    ? `${character.carriedShield.name}${character.shieldStowed ? " (Stowed)" : ""}`
    : "None";

  const equipmentText =
    `WEAPON : ${weaponName}\n\n` +
    `ARMOR  : ${armorName}\n\n` +
    `SHIELD : ${shieldName}`;

  return { usedSlots, capacity, coinSlots, equipmentText };
}
