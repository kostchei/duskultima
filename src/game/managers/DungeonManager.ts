/**
 * DungeonManager: High-level facade that coordinates PartyManager, LightSystem,
 * and GameContext for DungeonScene.
 */

import type Phaser from "phaser";
import type { GameContext } from "../context";
import { PartyManager } from "../systems/party";
import { LightSystem } from "../systems/light";

export class DungeonManager {
  readonly party: PartyManager;
  readonly light: LightSystem;

  constructor(
    readonly scene: Phaser.Scene,
    readonly ctx: GameContext,
  ) {
    this.party = new PartyManager(ctx);
    this.light = new LightSystem(scene, ctx);
  }

  update(): void {
    // Update light sources and timers
    this.light.update();
  }
}
