/**
 * Web Audio API Procedural Sound Engine for DuskUltima.
 * Zero external audio files — all sounds and zone ambiences synthesized via math and AudioNodes.
 */

import type { MonsterBiome } from "../../engine";

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted = false;
  private ambienceOsc: OscillatorNode | null = null;
  private ambienceGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
    window.addEventListener("click", () => this.ensureContext(), { once: true });
    window.addEventListener("keydown", () => this.ensureContext(), { once: true });
  }

  private ensureContext(): void {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playHitSfx(): void {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  public playSpellSfx(): void {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  public playStepSfx(): void {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playVictoryJingle(): void {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.value = freq;

      const startTime = this.ctx.currentTime + idx * 0.1;
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  public updateBiomeAmbience(biome: MonsterBiome): void {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    if (this.ambienceOsc) {
      this.ambienceOsc.stop();
      this.ambienceOsc.disconnect();
    }

    this.ambienceOsc = this.ctx.createOscillator();
    this.ambienceGain = this.ctx.createGain();

    let freq = 110;
    switch (biome) {
      case "diablerie": freq = 65; break; // Low swamp drone
      case "red-sands": freq = 130; break; // Warm desert hum
      case "midnight-sun": freq = 220; break; // High icy whistle
      case "river-of-night": freq = 85; break; // Subterranean aquatic drone
      case "dwellers-in-the-deep": freq = 55; break; // Abyssal deep roar
      case "city-of-masks": freq = 175; break; // Urban tavern hum
    }

    this.ambienceOsc.type = "sine";
    this.ambienceOsc.frequency.value = freq;

    this.ambienceGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

    this.ambienceOsc.connect(this.ambienceGain);
    this.ambienceGain.connect(this.ctx.destination);

    this.ambienceOsc.start();
  }
}
