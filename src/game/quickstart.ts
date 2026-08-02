/**
 * Quickstart: roll a random legal beginning and drop straight into the dungeon,
 * skipping the destination/location/class/ancestry picker.
 */

import type Phaser from "phaser";
import type { ClassName } from "../engine";
import { GameContext } from "./context";
import { startingClassesForZone, startingLocationsForZone } from "./startingChoices";
import type { VisualSkinId, ZonePackId } from "./visual/model";
import { ZONE_PACKS } from "./visual/skins";

export interface RunSelection {
  zone: ZonePackId;
  skinId: VisualSkinId;
  className: ClassName;
}

function pick<T>(options: readonly T[]): T {
  const choice = options[Math.floor(Math.random() * options.length)];
  if (choice === undefined) throw new Error("Cannot pick from an empty option list");
  return choice;
}

/** A random destination, one of its starting locations, and a class it offers. */
export function randomRunSelection(): RunSelection {
  const zone = pick(ZONE_PACKS);
  return {
    zone,
    skinId: pick(startingLocationsForZone(zone)).id,
    className: pick(startingClassesForZone(zone)),
  };
}

/**
 * Seed the registry for a fresh run and enter the dungeon. `skipBriefing` drops
 * the player into play with no opening panel at all — the mobile quickstart path.
 */
export function startRun(
  scene: Phaser.Scene,
  selection: RunSelection & { ancestry: string },
  skipBriefing = false,
): void {
  scene.registry.set("dungeonIndex", 0);
  scene.registry.set("runSeed", Math.floor(Math.random() * 0x1_0000_0000));
  scene.registry.set("startingZone", selection.zone);
  scene.registry.set("startingSkinId", selection.skinId);
  scene.registry.set("startingClass", selection.className);
  scene.registry.set("startingAncestry", selection.ancestry);
  scene.registry.set("skipBriefing", skipBriefing);
  scene.registry.set("ctx", new GameContext());
  scene.scene.start("Dungeon");
}
