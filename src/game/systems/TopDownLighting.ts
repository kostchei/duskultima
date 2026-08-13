import Phaser from "phaser";

export interface OverheadLightSource {
  id: string;
  tx: number;
  ty: number;
  radiusTiles: number;
  tint: number;
}

export class TopDownLightingSystem {
  private sources = new Map<string, OverheadLightSource>();
  private darknessRt!: Phaser.GameObjects.RenderTexture;
  private brush!: Phaser.GameObjects.Image;
  readonly tileSize: number;

  constructor(
    private scene: Phaser.Scene,
    tileSize = 16,
    private darknessAlpha = 0.85,
  ) {
    this.tileSize = tileSize;
  }

  initOverheadDarkness(widthPx: number, heightPx: number): void {
    if (this.darknessRt) this.darknessRt.destroy();
    
    this.darknessRt = this.scene.add.renderTexture(0, 0, widthPx, heightPx);
    this.darknessRt.setOrigin(0, 0).setScrollFactor(1).setDepth(900);

    this.brush = this.scene.make.image({ key: "light-radial", add: false });
    this.brush.setOrigin(0.5, 0.5);
  }

  addSource(source: OverheadLightSource): void {
    this.sources.set(source.id, source);
  }

  removeSource(id: string): void {
    this.sources.delete(id);
  }

  updateSourcePos(id: string, tx: number, ty: number): void {
    const s = this.sources.get(id);
    if (s) {
      s.tx = tx;
      s.ty = ty;
    }
  }

  isTileLit(tx: number, ty: number, defaultLit = false): boolean {
    if (defaultLit) return true;
    for (const s of this.sources.values()) {
      const dist = Math.hypot(tx - s.tx, ty - s.ty);
      if (dist <= s.radiusTiles) return true;
    }
    return false;
  }

  renderDarkness(ambientLit = false): void {
    if (!this.darknessRt) return;

    this.darknessRt.clear();
    if (ambientLit) return; // Daylight, no darkness overlay

    this.darknessRt.fill(0x000008, this.darknessAlpha);

    for (const s of this.sources.values()) {
      const worldX = (s.tx + 0.5) * this.tileSize;
      const worldY = (s.ty + 0.5) * this.tileSize;
      const radiusPx = s.radiusTiles * this.tileSize;

      this.brush.setScale((radiusPx * 2) / 256);
      this.darknessRt.erase(this.brush, worldX, worldY);
    }
  }
}
