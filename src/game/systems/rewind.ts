/** A bounded, time-addressable history used by the gameplay rewind verb. */
export class RewindBuffer<T> {
  private entries: { at: number; value: T }[] = [];

  constructor(
    private readonly historyMs = 10_000,
    private readonly intervalMs = 500,
  ) {}

  capture(at: number, value: T): boolean {
    const last = this.entries[this.entries.length - 1];
    if (last && at - last.at < this.intervalMs) return false;
    this.entries.push({ at, value });
    while (this.entries.length > 1 && at - this.entries[0]!.at > this.historyMs) this.entries.shift();
    return true;
  }

  atOrBefore(at: number): T | null {
    for (let i = this.entries.length - 1; i >= 0; i--) {
      if (this.entries[i]!.at <= at) return this.entries[i]!.value;
    }
    return null;
  }

  clear(): void {
    this.entries = [];
  }
}
