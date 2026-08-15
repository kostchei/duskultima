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
  onCustomPrompt?: () => void;
  onMenu: () => void;
}

export class InputHandler {
  private callbacks: CommandCallbacks;

  constructor(callbacks: CommandCallbacks) {
    this.callbacks = callbacks;
    this.attachEventListeners();
  }

  private lastMoveTime = 0;
  private readonly moveCooldownMs = 150;

  private attachEventListeners(): void {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      // Don't capture inputs if typing inside input or textarea
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      const key = e.key;
      const movementBands = e.shiftKey ? 2 : 1;

      const tryMove = (dx: number, dy: number): boolean => {
        const now = performance.now();
        if (now - this.lastMoveTime < this.moveCooldownMs) {
          return true; // Input handled but throttled
        }
        this.lastMoveTime = now;
        this.callbacks.onMove(dx, dy, movementBands);
        return true;
      };

      // Directional Movement
      if (key === "ArrowUp" || key === "8") {
        tryMove(0, -1);
        return;
      }
      if (key === "ArrowDown" || key === "2") {
        tryMove(0, 1);
        return;
      }
      if (key === "ArrowLeft" || key === "4") {
        tryMove(-1, 0);
        return;
      }
      if (key === "ArrowRight" || key === "6") {
        tryMove(1, 0);
        return;
      }

      // WASD movement when not triggering action shortcuts
      if (key === "w" || key === "W") { tryMove(0, -1); return; }
      if (key === "a" || key === "A") { this.callbacks.onAttack(); return; }
      if (key === "s" || key === "S") { this.callbacks.onStats(); return; }
      if (key === "d" || key === "D") { tryMove(1, 0); return; }

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
        case "n":
          this.callbacks.onCustomPrompt?.();
          break;
        case "e":
        case "enter":
          this.callbacks.onInteract();
          break;
        case "v":
          this.callbacks.onToggleCrt();
          break;
        case "escape":
          this.callbacks.onMenu();
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
          case "prompt": this.callbacks.onCustomPrompt?.(); break;
          case "menu": this.callbacks.onMenu(); break;
        }
      });
    });
  }
}
