/**
 * Web Audio API Procedural Sound Engine for DuskUltima.
 * Zero external audio files — all sounds and zone ambiences synthesized via math and AudioNodes.
 */

import type { MonsterBiome } from "../../engine";

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted = false;
  private ambience: Ambience | null = null;

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

    const profile = ambienceProfiles[biome];
    const now = this.ctx.currentTime;

    // The old implementation left one sine oscillator running forever. Apart
    // from sounding artificial, that tone was especially noticeable on
    // headphones. Fade the previous sound out before replacing it with a
    // small, moving soundscape.
    this.stopAmbience(0.35);

    const output = this.ctx.createGain();
    output.gain.setValueAtTime(0, now);
    output.gain.linearRampToValueAtTime(0.7, now + 1.2);
    output.connect(this.ctx.destination);

    const nodes: AudioScheduledSourceNode[] = [];

    // A very quiet triangle tone gives each zone a character, but its pitch
    // is continuously bent by two slow LFOs so it cannot become a static hum.
    const tone = this.ctx.createOscillator();
    const toneGain = this.ctx.createGain();
    const toneLfo = this.ctx.createOscillator();
    const toneLfoDepth = this.ctx.createGain();
    const toneTremolo = this.ctx.createOscillator();
    const toneTremoloDepth = this.ctx.createGain();

    tone.type = "triangle";
    tone.frequency.setValueAtTime(profile.toneFrequency, now);
    toneGain.gain.setValueAtTime(0.075, now);
    toneLfo.type = "sine";
    toneLfo.frequency.value = profile.pitchMotionRate;
    toneLfoDepth.gain.value = profile.pitchMotionDepth;
    toneTremolo.type = "sine";
    toneTremolo.frequency.value = profile.tremoloRate;
    toneTremoloDepth.gain.value = 0.045;

    toneLfo.connect(toneLfoDepth);
    toneLfoDepth.connect(tone.frequency);
    toneTremolo.connect(toneTremoloDepth);
    toneTremoloDepth.connect(toneGain.gain);
    tone.connect(toneGain);
    toneGain.connect(output);
    nodes.push(tone, toneLfo, toneTremolo);

    // Filtered looping noise supplies the non-tonal bed. The filter moves
    // slowly as well, making the ambience breathe instead of hiss constantly.
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(3);
    noise.loop = true;
    const noiseFilter = this.ctx.createBiquadFilter();
    const noiseGain = this.ctx.createGain();
    const noiseLfo = this.ctx.createOscillator();
    const noiseFilterDepth = this.ctx.createGain();
    const noiseTremolo = this.ctx.createOscillator();
    const noiseTremoloDepth = this.ctx.createGain();

    noiseFilter.type = profile.noiseFilterType;
    noiseFilter.frequency.value = profile.noiseFrequency;
    noiseFilter.Q.value = profile.noiseQ;
    noiseGain.gain.setValueAtTime(0.13, now);
    noiseLfo.type = "sine";
    noiseLfo.frequency.value = profile.noiseMotionRate;
    noiseFilterDepth.gain.value = profile.noiseMotionDepth;
    noiseTremolo.type = "sine";
    noiseTremolo.frequency.value = profile.noiseTremoloRate;
    noiseTremoloDepth.gain.value = 0.07;

    noiseLfo.connect(noiseFilterDepth);
    noiseFilterDepth.connect(noiseFilter.frequency);
    noiseTremolo.connect(noiseTremoloDepth);
    noiseTremoloDepth.connect(noiseGain.gain);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(output);
    nodes.push(noise, noiseLfo, noiseTremolo);

    // A second, sparse layer prevents the sound from settling into one
    // texture. It is still synthesized entirely in Web Audio and stays quiet
    // enough to read as atmosphere rather than a sound effect.
    const shimmer = this.ctx.createOscillator();
    const shimmerGain = this.ctx.createGain();
    const shimmerLfo = this.ctx.createOscillator();
    const shimmerDepth = this.ctx.createGain();
    shimmer.type = profile.shimmerType;
    shimmer.frequency.setValueAtTime(profile.shimmerFrequency, now);
    shimmerGain.gain.setValueAtTime(0.018, now);
    shimmerLfo.type = "sine";
    shimmerLfo.frequency.value = profile.shimmerRate;
    shimmerDepth.gain.value = profile.shimmerDepth;
    shimmerLfo.connect(shimmerDepth);
    shimmerDepth.connect(shimmer.frequency);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(output);
    nodes.push(shimmer, shimmerLfo);

    for (const node of nodes) node.start(now);

    this.ambience = { output, nodes };
  }

  private stopAmbience(fadeSeconds: number): void {
    if (!this.ambience || !this.ctx) return;

    const oldAmbience = this.ambience;
    this.ambience = null;
    const stopAt = this.ctx.currentTime + fadeSeconds;
    oldAmbience.output.gain.cancelScheduledValues(this.ctx.currentTime);
    oldAmbience.output.gain.setValueAtTime(oldAmbience.output.gain.value, this.ctx.currentTime);
    oldAmbience.output.gain.linearRampToValueAtTime(0, stopAt);
    for (const node of oldAmbience.nodes) {
      try {
        node.stop(stopAt);
      } catch {
        // A scheduled source can already be stopped during a rapid site change.
      }
    }
    window.setTimeout(() => {
      oldAmbience.output.disconnect();
      for (const node of oldAmbience.nodes) node.disconnect();
    }, fadeSeconds * 1000 + 50);
  }

  private createNoiseBuffer(seconds: number): AudioBuffer {
    if (!this.ctx) throw new Error("Audio context is not initialized");
    const length = Math.max(1, Math.floor(this.ctx.sampleRate * seconds));
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      // Slightly softer than full white noise so the filter does less work.
      channel[index] = (Math.random() * 2 - 1) * 0.65;
    }
    return buffer;
  }
}

interface Ambience {
  output: GainNode;
  nodes: AudioScheduledSourceNode[];
}

interface AmbienceProfile {
  toneFrequency: number;
  pitchMotionRate: number;
  pitchMotionDepth: number;
  tremoloRate: number;
  noiseFilterType: BiquadFilterType;
  noiseFrequency: number;
  noiseQ: number;
  noiseMotionRate: number;
  noiseMotionDepth: number;
  noiseTremoloRate: number;
  shimmerType: OscillatorType;
  shimmerFrequency: number;
  shimmerRate: number;
  shimmerDepth: number;
}

const ambienceProfiles: Record<MonsterBiome, AmbienceProfile> = {
  diablerie: {
    toneFrequency: 58, pitchMotionRate: 0.07, pitchMotionDepth: 4, tremoloRate: 0.11,
    noiseFilterType: "lowpass", noiseFrequency: 420, noiseQ: 0.5, noiseMotionRate: 0.035,
    noiseMotionDepth: 240, noiseTremoloRate: 0.08, shimmerType: "sine", shimmerFrequency: 176,
    shimmerRate: 0.025, shimmerDepth: 9,
  },
  "red-sands": {
    toneFrequency: 92, pitchMotionRate: 0.045, pitchMotionDepth: 7, tremoloRate: 0.075,
    noiseFilterType: "bandpass", noiseFrequency: 680, noiseQ: 0.35, noiseMotionRate: 0.025,
    noiseMotionDepth: 360, noiseTremoloRate: 0.055, shimmerType: "triangle", shimmerFrequency: 246,
    shimmerRate: 0.018, shimmerDepth: 14,
  },
  "midnight-sun": {
    toneFrequency: 146, pitchMotionRate: 0.06, pitchMotionDepth: 11, tremoloRate: 0.13,
    noiseFilterType: "highpass", noiseFrequency: 980, noiseQ: 0.4, noiseMotionRate: 0.04,
    noiseMotionDepth: 470, noiseTremoloRate: 0.095, shimmerType: "sine", shimmerFrequency: 392,
    shimmerRate: 0.031, shimmerDepth: 20,
  },
  "river-of-night": {
    toneFrequency: 71, pitchMotionRate: 0.055, pitchMotionDepth: 5, tremoloRate: 0.09,
    noiseFilterType: "lowpass", noiseFrequency: 520, noiseQ: 0.7, noiseMotionRate: 0.06,
    noiseMotionDepth: 310, noiseTremoloRate: 0.12, shimmerType: "triangle", shimmerFrequency: 213,
    shimmerRate: 0.022, shimmerDepth: 12,
  },
  "dwellers-in-the-deep": {
    toneFrequency: 44, pitchMotionRate: 0.035, pitchMotionDepth: 3, tremoloRate: 0.065,
    noiseFilterType: "lowpass", noiseFrequency: 260, noiseQ: 0.8, noiseMotionRate: 0.028,
    noiseMotionDepth: 150, noiseTremoloRate: 0.045, shimmerType: "sine", shimmerFrequency: 131,
    shimmerRate: 0.014, shimmerDepth: 6,
  },
  "city-of-masks": {
    toneFrequency: 116, pitchMotionRate: 0.08, pitchMotionDepth: 8, tremoloRate: 0.16,
    noiseFilterType: "bandpass", noiseFrequency: 760, noiseQ: 0.55, noiseMotionRate: 0.07,
    noiseMotionDepth: 420, noiseTremoloRate: 0.14, shimmerType: "square", shimmerFrequency: 232,
    shimmerRate: 0.04, shimmerDepth: 18,
  },
};
