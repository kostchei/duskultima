/**
 * Device/session preferences — render quality, muted — stored under their own
 * localStorage key, deliberately separate from SaveRepository's run-save
 * slots and schema versioning. A save migration, a slot delete, or a "clear
 * my saves" action must never touch these: they describe the device and the
 * player's session settings, not the run.
 */

import { qualityLevel, setQualityLevel, type QualityLevel } from "./systems/quality";
import { setMasterVolume, setMuted } from "./audio/context";
import type { GameAction } from "./input/actions";
import type { KeyBindingOverrides } from "./input/bindings";

const KEY = "shadowdork_prefs";

interface StoredPrefs {
  quality?: QualityLevel;
  muted?: boolean;
  touchControls?: TouchControlSetting;
  volume?: number;
  torchDuration?: TorchDurationSetting;
  keyBindings?: KeyBindingOverrides;
}

function readRaw(): StoredPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeRaw(prefs: StoredPrefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // Preferences are a nice-to-have; a full quota or disabled storage
    // shouldn't block gameplay the way a failed run-save should.
  }
}

/**
 * Apply any saved preferences over the auto-detected defaults. Call once at
 * boot, before anything reads `qualityLevel()` or the audio graph exists.
 * A stored "unmuted" is never applied — that's already the default, and
 * applying it would force-create the AudioContext before any user gesture.
 */
export function loadMobilePrefs(): void {
  const prefs = readRaw();
  if (prefs.quality === "high" || prefs.quality === "low") setQualityLevel(prefs.quality);
  if (prefs.muted === true) setMuted(true);
  if (typeof prefs.volume === "number") setMasterVolume(prefs.volume);
}

export function saveQualityPref(level: QualityLevel): void {
  writeRaw({ ...readRaw(), quality: level });
}

export type TouchControlSetting = "auto" | "on" | "off";

export function shouldShowTouchControls(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mobile") === "on") return true;
    const override = params.get("touch");
    if (override === "on") return true;
    if (override === "off") return false;
  } catch {
    // Ignore URL parsing errors
  }
  const prefs = readRaw();
  const setting = prefs.touchControls ?? "auto";
  if (setting === "on") return true;
  if (setting === "off") return false;
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}

export function saveTouchControlsPref(setting: TouchControlSetting): void {
  writeRaw({ ...readRaw(), touchControls: setting });
}

export function saveMutedPref(muted: boolean): void {
  writeRaw({ ...readRaw(), muted });
}

export function volumePref(): number {
  const value = readRaw().volume;
  return typeof value === "number" ? Math.max(0, Math.min(1, value)) : 1;
}

export function saveVolumePref(volume: number): void {
  const value = Math.max(0, Math.min(1, volume));
  writeRaw({ ...readRaw(), volume: value });
  setMasterVolume(value);
}

export type TorchDurationSetting = "3m" | "10m" | "60m";
const TORCH_MS: Record<TorchDurationSetting, number> = {
  "3m": 3 * 60_000,
  "10m": 10 * 60_000,
  "60m": 60 * 60_000,
};

export function torchDurationPref(): TorchDurationSetting {
  const value = readRaw().torchDuration;
  return value === "10m" || value === "60m" ? value : "3m";
}

export function torchDurationMs(): number {
  return TORCH_MS[torchDurationPref()];
}

export function saveTorchDurationPref(setting: TorchDurationSetting): void {
  writeRaw({ ...readRaw(), torchDuration: setting });
}

export function keyBindingPrefs(): KeyBindingOverrides {
  const value = readRaw().keyBindings;
  return value && typeof value === "object" ? { ...value } : {};
}

export function saveKeyBindingPref(action: GameAction, key: string): void {
  writeRaw({ ...readRaw(), keyBindings: { ...keyBindingPrefs(), [action]: key } });
}

export function resetKeyBindingPrefs(): void {
  const prefs = readRaw();
  delete prefs.keyBindings;
  writeRaw(prefs);
}

/** For a future settings screen: the currently active quality level. */
export function currentQualityPref(): QualityLevel {
  return qualityLevel();
}
