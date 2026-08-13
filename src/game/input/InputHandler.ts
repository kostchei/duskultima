/**
 * InputHandler maps keyboard inputs to Ultima V command key bindings and directional movement.
 */

export interface CommandCallbacks {
  onMove: (dx: number, dy: number, movementBands?: 1 | 2) => void;
  onAttack: () => void;
  onCast: () => void;
  onLook: () => void;
  onTorch: () => void;
  onUseItem: () => void;
  onInventory: () => void;
  onRest: () => void;
  onPass: () => void;
  onStats: () => void;
  onSelectLeader: (index: number) => void;
  onToggleAuto: (index: number) => void;
  onInteract: () => void;
  onToggleCrt: () => void;
}

export class InputHandler {
  private callbacks: CommandCallbacks;

  constructor(callbacks: CommandCallbacks) {
    this.callbacks = callbacks;
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      // Don't capture inputs if typing inside input or textarea
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      const key = e.key;
      const movementBands = e.shiftKey ? 2 : 1;

      // Directional Movement
      if (key === "ArrowUp" || key === "w" || key === "W" || key === "8") {
        this.callbacks.onMove(0, -1, movementBands);
        return;
      }
      if (key === "ArrowDown" || key === "s" || key === "S" || key === "2") {
        this.callbacks.onMove(0, 1, movementBands);
        return;
      }
      if (key === "ArrowLeft" || key === "a" || key === "A" || key === "4") {
        // Distinguish between 'a' (attack) vs arrow movement: WASD vs Arrow keys
        if (key === "ArrowLeft" || key === "4") {
          this.callbacks.onMove(-1, 0, movementBands);
          return;
        }
      }
      if (key === "ArrowRight" || key === "d" || key === "D" || key === "6") {
        if (key === "ArrowRight" || key === "6") {
          this.callbacks.onMove(1, 0, movementBands);
          return;
        }
      }

      // WASD movement when not triggering action shortcuts
      if (key === "w" || key === "W") { this.callbacks.onMove(0, -1, movementBands); return; }
      if (key === "a" || key === "A") { this.callbacks.onAttack(); return; }
      if (key === "s" || key === "S") { this.callbacks.onStats(); return; }
      if (key === "d" || key === "D") { this.callbacks.onMove(1, 0, movementBands); return; }

      // Ultima V Single-Key Action Shortcuts
      switch (key.toLowerCase()) {
        case "c":
          this.callbacks.onCast();
          break;
        case "l":
          this.callbacks.onLook();
          break;
        case "t":
          this.callbacks.onTorch();
          break;
        case "u":
          this.callbacks.onUseItem();
          break;
        case "i":
          this.callbacks.onInventory();
          break;
        case "r":
          this.callbacks.onRest();
          break;
        case "p":
        case " ":
          this.callbacks.onPass();
          break;
        case "e":
        case "enter":
          this.callbacks.onInteract();
          break;
        case "v":
          this.callbacks.onToggleCrt();
          break;
        case "1":
          this.callbacks.onSelectLeader(0);
          break;
        case "2":
          this.callbacks.onSelectLeader(1);
          break;
        case "3":
          this.callbacks.onSelectLeader(2);
          break;
        case "4":
          this.callbacks.onSelectLeader(3);
          break;
      }
    });

    // Attach click handlers to command buttons in UI
    document.querySelectorAll(".cmd-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const cmd = target.dataset.cmd;
        if (!cmd) return;
        switch (cmd) {
          case "attack": this.callbacks.onAttack(); break;
          case "cast": this.callbacks.onCast(); break;
          case "look": this.callbacks.onLook(); break;
          case "torch": this.callbacks.onTorch(); break;
          case "use": this.callbacks.onUseItem(); break;
          case "inventory": this.callbacks.onInventory(); break;
          case "rest": this.callbacks.onRest(); break;
          case "pass": this.callbacks.onPass(); break;
          case "stats": this.callbacks.onStats(); break;
        }
      });
    });
  }
}
