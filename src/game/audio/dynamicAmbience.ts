import type { AmbienceHandle } from "./ambience";

export interface DynamicAmbienceConfig {
  /** Soft baseline volume multiplier during music playback (default: 0.35). */
  baseVolume?: number;
  /** Volume swell multiplier when entering a new room/vault ("in") (default: 1.35). */
  vaultSwellMult?: number;
  /** Volume swell multiplier when finding/claiming an objective ("objective") (default: 1.55). */
  objectiveSwellMult?: number;
  /** Maximum volume swell multiplier near exit ("out") (default: 1.25). */
  exitSwellMult?: number;
  /** Total duty cycle period in ms (default: 100,000 ms = 100 s). */
  cyclePeriodMs?: number;
  /** Percentage of cycle period where music is active (default: 0.40 = 40%). */
  dutyCycleRatio?: number;
}

export class DynamicAmbienceController {
  private readonly handles: readonly AmbienceHandle[];
  private readonly baseVolume: number;
  private readonly vaultSwellMult: number;
  private readonly objectiveSwellMult: number;
  private readonly exitSwellMult: number;

  private currentSwell = 1.0;
  private targetSwell = 1.0;
  private exitFactor = 1.0;

  // 40% duty cycle timing
  private readonly cyclePeriodMs: number;
  private readonly activeDurationMs: number;
  private cycleTimer = 0;
  private forcedActiveUntilMs = 0;

  constructor(handles: readonly AmbienceHandle[], config: DynamicAmbienceConfig = {}) {
    this.handles = handles;
    this.baseVolume = config.baseVolume ?? 0.35;
    this.vaultSwellMult = config.vaultSwellMult ?? 1.35;
    this.objectiveSwellMult = config.objectiveSwellMult ?? 1.55;
    this.exitSwellMult = config.exitSwellMult ?? 1.25;
    this.cyclePeriodMs = config.cyclePeriodMs ?? 100_000;
    const ratio = config.dutyCycleRatio ?? 0.40;
    this.activeDurationMs = this.cyclePeriodMs * ratio;

    this.applyVolume(1.0);
  }

  /** Trigger "in" swell: entering a new room/vault immediately activates music & swells volume. */
  onEnterVault(): void {
    this.targetSwell = Math.max(this.targetSwell, this.vaultSwellMult);
    this.currentSwell = Math.max(this.currentSwell, this.vaultSwellMult);
    // Force active music window for at least 15 seconds
    this.forcedActiveUntilMs = Math.max(this.forcedActiveUntilMs, this.cycleTimer + 15_000);
  }

  /** Trigger "objective" swell: discovering or claiming an objective immediately activates music & swells volume. */
  onDiscoverObjective(): void {
    this.targetSwell = Math.max(this.targetSwell, this.objectiveSwellMult);
    this.currentSwell = Math.max(this.currentSwell, this.objectiveSwellMult);
    // Force active music window for at least 20 seconds
    this.forcedActiveUntilMs = Math.max(this.forcedActiveUntilMs, this.cycleTimer + 20_000);
  }

  /** Trigger "out" swell: nearing the exit activates music & swells volume proportionally. */
  updateExitProximity(distancePx: number, maxThresholdPx: number = 280): void {
    if (distancePx <= maxThresholdPx) {
      const ratio = 1 - Math.max(0, distancePx) / maxThresholdPx;
      this.exitFactor = 1.0 + (this.exitSwellMult - 1.0) * ratio;
      // Nearing exit keeps music active
      this.forcedActiveUntilMs = Math.max(this.forcedActiveUntilMs, this.cycleTimer + 5_000);
    } else {
      this.exitFactor = 1.0;
    }
  }

  /** Tick method called every frame in the scene loop. */
  tick(deltaMs: number): void {
    this.cycleTimer = (this.cycleTimer + deltaMs) % this.cyclePeriodMs;

    // Decay temporary event swells back toward 1.0 baseline
    if (this.targetSwell > 1.0) {
      this.targetSwell = Math.max(1.0, this.targetSwell - (deltaMs / 1000) * 0.15);
    }
    const swellStep = (this.targetSwell - this.currentSwell) * Math.min(1.0, (deltaMs / 1000) * 8.0);
    this.currentSwell += swellStep;

    // Determine 40% duty cycle multiplier (with smooth fade ramps)
    let dutyMultiplier = 0.0;
    const fadeRampMs = 3000; // 3 second smooth fade-in/fade-out

    const isScheduledActive = this.cycleTimer < this.activeDurationMs;
    const isForcedActive = this.cycleTimer < this.forcedActiveUntilMs;

    if (isScheduledActive || isForcedActive) {
      if (this.cycleTimer < fadeRampMs) {
        dutyMultiplier = this.cycleTimer / fadeRampMs;
      } else if (isScheduledActive && this.cycleTimer > (this.activeDurationMs - fadeRampMs)) {
        dutyMultiplier = (this.activeDurationMs - this.cycleTimer) / fadeRampMs;
      } else {
        dutyMultiplier = 1.0;
      }
    }

    this.applyVolume(dutyMultiplier);
  }

  /** Calculate combined volume and set level on all ambience handles. */
  private applyVolume(dutyMultiplier: number): void {
    const finalVolume = this.baseVolume * this.currentSwell * this.exitFactor * dutyMultiplier;
    for (const h of this.handles) {
      h.setLevel(finalVolume);
    }
  }

  /** Clean up handles when scene shuts down. */
  destroy(): void {
    for (const h of this.handles) {
      h.destroy();
    }
  }
}
