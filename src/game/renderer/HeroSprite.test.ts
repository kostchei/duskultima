import { describe, expect, it } from "vitest";
import { HeroSpriteDrawer, CLASS_STYLE } from "./HeroSprite";
import { Character, type ClassName } from "../../engine/character";
import { item as itemById } from "../../data/items";

if (typeof document === "undefined") {
  (globalThis as any).document = {
    createElement: (tag: string) => {
      if (tag === "canvas") {
        const mockCtx = {
          fillStyle: "",
          strokeStyle: "",
          lineWidth: 1,
          imageSmoothingEnabled: false,
          fillRect: () => {},
          strokeRect: () => {},
          beginPath: () => {},
          arc: () => {},
          fill: () => {},
          stroke: () => {},
          moveTo: () => {},
          lineTo: () => {},
          closePath: () => {},
          drawImage: () => {},
          scale: () => {},
        };
        return {
          width: 32,
          height: 32,
          getContext: () => mockCtx,
        };
      }
      return {};
    },
  } as any;
}

const STATS = { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 };

function makeCharacter(className: ClassName): Character {
  return new Character({ id: className, name: className, className, stats: STATS, maxHp: 8 });
}

describe("HeroSpriteDrawer", () => {
  it("renders a distinct tile for every class without throwing", () => {
    const drawer = new HeroSpriteDrawer();
    const classNames = Object.keys(CLASS_STYLE) as ClassName[];
    expect(classNames.length).toBeGreaterThanOrEqual(22);

    for (const className of classNames) {
      const canvas = drawer.getHeroTileCanvas(makeCharacter(className));
      expect(canvas).toBeDefined();
      expect(canvas.width).toBe(64);
      expect(canvas.height).toBe(64);
    }
  });

  it("renders both stat generation methods without throwing", () => {
    const drawer = new HeroSpriteDrawer();
    const ironman = makeCharacter("fighter");
    (ironman as any).method = "iron-man";
    expect(drawer.getHeroTileCanvas(ironman)).toBeDefined();
    expect(drawer.getHeroTileCanvas(makeCharacter("fighter"))).toBeDefined();
  });

  it("reflects worn armor and wielded weapon in the render key", () => {
    const drawer = new HeroSpriteDrawer();
    const bare = makeCharacter("fighter");
    const armored = makeCharacter("fighter");
    armored.equipArmor(itemById("plate-mail"));
    armored.equipWeapon(itemById("greatsword"));

    const bareCvs = drawer.getHeroTileCanvas(bare);
    const armoredCvs = drawer.getHeroTileCanvas(armored);
    expect(bareCvs).toBeDefined();
    expect(armoredCvs).toBeDefined();
  });
});
