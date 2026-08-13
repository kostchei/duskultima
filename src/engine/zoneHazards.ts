/**
 * Zone-specific Environmental Hazards & Rules for the 6 Cursed Scroll biomes.
 */

import { Character } from "./character";
import { Dice } from "./dice";
import { resolveCheck, type CheckResult } from "./check";
import type { MonsterBiome } from "./index";

export interface HazardCheckResult {
  triggered: boolean;
  success: boolean;
  damage: number;
  message: string;
  check?: CheckResult;
}

export class ZoneHazards {

  /**
   * Resolves environmental hazards based on active site biome.
   */
  /** Rounds a character can hold their breath before asphyxiating. Minimum 2. */
  public static breathCapacity(char: Character): number {
    return Math.max(2, 4 + char.mod("CON"));
  }

  public static resolveEnvironmentalTick(
    char: Character,
    biome: MonsterBiome,
    dice: Dice,
    hasTorchOrFire = true,
    breathRoundsSubmerged = 0
  ): HazardCheckResult {
    switch (biome) {
      case "diablerie":
        // Poisonous Gas / Swamp Miasma
        if (dice.die(6) === 1) {
          const check = hazardCheck(dice, char, "CON");
          if (!check.success) {
            const dmg = dice.die(4);
            char.takeDamage(dmg);
            return {
              triggered: true,
              success: false,
              damage: dmg,
              check,
              message: `Swamp Miasma! ${char.name} inhales poisonous gas and takes ${dmg} poison damage.`,
            };
          }
          return {
            triggered: true,
            success: true,
            damage: 0,
            check,
            message: `${char.name} resists the swamp miasma gas.`,
          };
        }
        // Deep Murky Water — sucking bog beneath the surface
        if (dice.die(8) === 1) {
          const check = hazardCheck(dice, char, "STR");
          if (!check.success) {
            const dmg = dice.die(4);
            char.takeDamage(dmg);
            return {
              triggered: true,
              success: false,
              damage: dmg,
              check,
              message: `Deep Murky Water! ${char.name} is dragged under by the sucking bog (${dmg} damage).`,
            };
          }
          return {
            triggered: true,
            success: true,
            damage: 0,
            check,
            message: `${char.name} hauls free of the murky water.`,
          };
        }
        break;

      case "red-sands":
        // Scorching Sun / Heat Exhaustion
        if (dice.die(6) === 1) {
          const check = hazardCheck(dice, char, "CON");
          if (!check.success) {
            const dmg = dice.die(4);
            char.takeDamage(dmg);
            return {
              triggered: true,
              success: false,
              damage: dmg,
              check,
              message: `Heat Exhaustion! ${char.name} suffers under the scorching red sun (${dmg} damage).`,
            };
          }
          return {
            triggered: true,
            success: true,
            damage: 0,
            check,
            message: `${char.name} endures the desert heat.`,
          };
        }
        break;

      case "midnight-sun":
        // Sub-Zero Cold & Frostbite (mitigated by torch/campfire)
        if (!hasTorchOrFire || dice.die(6) === 1) {
          const check = dice.die(20) + char.mod("CON");
          if (check < 12) {
            const dmg = dice.die(4);
            char.takeDamage(dmg);
            return {
              triggered: true,
              success: false,
              damage: dmg,
              message: `Sub-Zero Cold! ${char.name} suffers frostbite from the freezing arctic wind (${dmg} cold damage).`,
            };
          }
          return {
            triggered: true,
            success: true,
            damage: 0,
            message: `${char.name} resists the freezing sub-zero cold.`,
          };
        }
        break;

      case "river-of-night":
        // Canopy Rope Bridge hazard
        if (dice.die(8) === 1) {
          const check = hazardCheck(dice, char, "DEX");
          if (!check.success) {
            const dmg = dice.die(4);
            char.takeDamage(dmg);
            return {
              triggered: true,
              success: false,
              damage: dmg,
              check,
              message: `Rope Bridge Sway! ${char.name} slips on a slick canopy bridge (${dmg} bludgeoning damage).`,
            };
          }
        }
        // Fast Water Current — the Black River tries to sweep swimmers downstream
        if (dice.die(6) === 1) {
          const check = hazardCheck(dice, char, "STR");
          if (!check.success) {
            const dmg = dice.die(4);
            char.takeDamage(dmg);
            return {
              triggered: true,
              success: false,
              damage: dmg,
              check,
              message: `Fast Current! ${char.name} is swept against rocks by the river's pull (${dmg} damage).`,
            };
          }
          return {
            triggered: true,
            success: true,
            damage: 0,
            check,
            message: `${char.name} swims hard and holds position against the current.`,
          };
        }
        break;

      case "dwellers-in-the-deep": {
        // Submerged Cenote / Holding Breath
        const capacity = ZoneHazards.breathCapacity(char);
        if (breathRoundsSubmerged > capacity) {
          const dmg = dice.die(6);
          char.takeDamage(dmg);
          return {
            triggered: true,
            success: false,
            damage: dmg,
            message: `Out of Air! ${char.name} asphyxiates in the flooded trench (${dmg} damage).`,
          };
        }
        if (breathRoundsSubmerged === capacity) {
          return {
            triggered: true,
            success: true,
            damage: 0,
            message: `${char.name}'s lungs burn — air is nearly spent!`,
          };
        }
        break;
      }

      case "city-of-masks":
        // Rooftop scamper / Thief guild trap
        if (dice.die(8) === 1) {
          const check = hazardCheck(dice, char, "DEX");
          if (!check.success) {
            const dmg = dice.die(4);
            char.takeDamage(dmg);
            return {
              triggered: true,
              success: false,
              damage: dmg,
              check,
              message: `Loose Rooftop Tile! ${char.name} trips on an urban slate tile (${dmg} fall damage).`,
            };
          }
        }
        break;
    }

    return { triggered: false, success: true, damage: 0, message: "" };
  }
}

function hazardCheck(dice: Dice, character: Character, stat: "STR" | "DEX" | "CON"): CheckResult {
  return resolveCheck(dice, {
    actor: character,
    stat,
    dc: 12,
    kind: "stat",
    task: "environmental hazard",
    hasTimePressure: true,
    hasDireConsequences: true,
  });
}
