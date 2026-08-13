export type LightSourceKind = "torch" | "lantern" | "campfire";

export interface ActiveLightSource {
  kind: LightSourceKind;
  range: "near";
  remainingMs: number;
  remainingRounds: number | null;
}

export interface LightTrackerOptions {
  torchMs: number;
  soloDark: boolean;
  torchRounds?: number;
}

export const DEFAULT_LIGHT_OPTIONS: Readonly<LightTrackerOptions> = {
  torchMs: 60 * 60 * 1000,
  soloDark: false,
  torchRounds: 10,
};

/** Light durations are isolated from map geometry so the renderer can query lit/dark state. */
export class LightTracker {
  readonly options: LightTrackerOptions;
  active: ActiveLightSource | null = null;
  torches = 0;

  constructor(options: Partial<LightTrackerOptions> = {}) {
    this.options = { ...DEFAULT_LIGHT_OPTIONS, ...options };
    if (this.options.torchMs <= 0 || (this.options.torchRounds ?? 0) <= 0) throw new Error("Light durations must be positive");
  }

  addTorches(amount: number): void {
    if (!Number.isInteger(amount) || amount < 0) throw new Error("Torch count must be non-negative");
    this.torches += amount;
  }

  lightTorch(): ActiveLightSource {
    if (this.torches < 1) throw new Error("Lighting a torch requires a torch");
    this.torches--;
    return this.start("torch", this.options.torchMs, this.options.soloDark ? this.options.torchRounds! : null);
  }

  lightLantern(durationMs = this.options.torchMs): ActiveLightSource {
    return this.start("lantern", durationMs, null);
  }

  /** A campfire consumes three torches and lasts eight hours. */
  lightCampfire(): ActiveLightSource {
    if (this.torches < 3) throw new Error("A campfire requires three torches");
    this.torches -= 3;
    return this.start("campfire", 8 * 60 * 60 * 1000, null);
  }

  advanceMs(deltaMs: number): void {
    if (deltaMs < 0) throw new Error("Light time cannot move backwards");
    if (!this.active || this.options.soloDark && this.active.kind === "torch") return;
    this.active.remainingMs = Math.max(0, this.active.remainingMs - deltaMs);
    if (this.active.remainingMs === 0) this.active = null;
  }

  advanceRound(): void {
    if (!this.active || this.active.remainingRounds === null) return;
    this.active.remainingRounds = Math.max(0, this.active.remainingRounds - 1);
    if (this.active.remainingRounds === 0) this.active = null;
  }

  extinguish(): void {
    this.active = null;
  }

  private start(kind: LightSourceKind, remainingMs: number, remainingRounds: number | null): ActiveLightSource {
    this.active = { kind, range: "near", remainingMs, remainingRounds };
    return this.active;
  }
}
