/**
 * Which input family produced the most recent action — used to show or hide
 * hard-coded key-hint copy ("(ESC)", "Up/Down select | E use/equip | ...")
 * that's dead weight once a player is actually driving the game by touch.
 * Starts from a coarse-pointer guess and flips the instant either family is
 * actually used, so a hybrid device (a touchscreen laptop) tracks whichever
 * the player is really doing right now.
 */

import { IS_MOBILE_DISPLAY } from "../display";

export type InputFamily = "keyboard" | "touch";

let family: InputFamily = IS_MOBILE_DISPLAY ? "touch" : "keyboard";

export function currentInputFamily(): InputFamily {
  return family;
}

export function noteKeyboardActivity(): void {
  family = "keyboard";
}

export function noteTouchActivity(): void {
  family = "touch";
}
