import { describe, expect, it } from "vitest";
import { Dice } from "../../engine/dice";
import { MONSTER_SIZE_TILES } from "../../engine/monster";
import {
  BEAT_TOPOLOGIES,
  CORRIDOR_LENGTH_TILES,
  assignBeatRoles,
  buildSitePlan,
  rollFillerCount,
  type BeatRole,
} from "./roomGeneration";
import type { SiteGoal } from "./Adventure";

const GOAL: SiteGoal = {
  kind: "monster-eggs",
  verb: "Retrieve",
  target: "monster eggs",
  isRescue: false,
  completion: "acquire",
  approaches: ["combat", "stealth", "evasion"],
  requiresAllHostilesDefeated: false,
  requiredQuantity: 1,
  guardianName: "the nesting mother",
  isCompleted: false,
  description: "Recover the monster eggs without waking the nesting mother",
};

function edgeCount(topology: (typeof BEAT_TOPOLOGIES)[number]): number {
  return topology.edges.length;
}

describe("BEAT_TOPOLOGIES", () => {
  it("has 21 uniquely-named connected graphs on 5 nodes", () => {
    expect(BEAT_TOPOLOGIES).toHaveLength(21);
    expect(new Set(BEAT_TOPOLOGIES.map((t) => t.name)).size).toBe(21);
  });

  it("matches the known edge-count distribution for connected graphs on 5 nodes (3,5,5,4,2,1,1)", () => {
    const counts = new Map<number, number>();
    for (const topology of BEAT_TOPOLOGIES) {
      counts.set(edgeCount(topology), (counts.get(edgeCount(topology)) ?? 0) + 1);
    }
    expect(counts.get(4)).toBe(3);
    expect(counts.get(5)).toBe(5);
    expect(counts.get(6)).toBe(5);
    expect(counts.get(7)).toBe(4);
    expect(counts.get(8)).toBe(2);
    expect(counts.get(9)).toBe(1);
    expect(counts.get(10)).toBe(1);
  });

  it("keeps every topology connected across all 5 nodes", () => {
    for (const topology of BEAT_TOPOLOGIES) {
      const adjacency: number[][] = Array.from({ length: 5 }, () => []);
      for (const [a, b] of topology.edges) {
        adjacency[a]!.push(b);
        adjacency[b]!.push(a);
      }
      const seen = new Set([0]);
      const queue = [0];
      while (queue.length > 0) {
        const current = queue.shift()!;
        for (const next of adjacency[current]!) {
          if (!seen.has(next)) {
            seen.add(next);
            queue.push(next);
          }
        }
      }
      expect(seen.size).toBe(5);
    }
  });
});

describe("assignBeatRoles", () => {
  it("places entrance and climax at the diameter-farthest pair on 5-path", () => {
    const path = BEAT_TOPOLOGIES.find((t) => t.name === "5-path")!;
    const roles = assignBeatRoles(new Dice(1), path);
    // 5-path's diameter pair is its two endpoints (nodes 0 and 4).
    expect(new Set([roles.entrance, roles.climax])).toEqual(new Set([0, 4]));
  });

  it("assigns all 5 distinct roles on 5-star", () => {
    const star = BEAT_TOPOLOGIES.find((t) => t.name === "5-star")!;
    const roles = assignBeatRoles(new Dice(2), star);
    const values = [roles.entrance, roles.explore, roles.trick, roles.climax, roles.reward];
    expect(new Set(values).size).toBe(5);
  });
});

describe("rollFillerCount", () => {
  it("never adds filler rooms on small sites", () => {
    for (let seed = 1; seed <= 20; seed++) {
      expect(rollFillerCount(new Dice(seed), "small")).toBe(0);
    }
  });

  it("keeps medium sites within 0-2 filler rooms and large within 1-4", () => {
    for (let seed = 1; seed <= 40; seed++) {
      const medium = rollFillerCount(new Dice(seed), "medium");
      expect(medium).toBeGreaterThanOrEqual(0);
      expect(medium).toBeLessThanOrEqual(2);
      const large = rollFillerCount(new Dice(seed), "large");
      expect(large).toBeGreaterThanOrEqual(1);
      expect(large).toBeLessThanOrEqual(4);
    }
  });
});

describe("buildSitePlan", () => {
  it("produces exactly one room per beat role plus size-appropriate filler", () => {
    for (let seed = 1; seed <= 30; seed++) {
      const plan = buildSitePlan(new Dice(seed), 0, GOAL, "diablerie");
      expect(plan.rooms).toHaveLength(5);
      const roles = plan.rooms.map((r) => r.beatRole).filter((r): r is BeatRole => r !== undefined);
      expect(new Set(roles)).toEqual(new Set(["entrance", "explore", "trick", "climax", "reward"]));
    }
  });

  it("keeps every room reachable from the entrance", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const plan = buildSitePlan(new Dice(seed), 4, GOAL, "diablerie");
      const adjacency = new Map<number, number[]>(plan.rooms.map((r) => [r.id, []]));
      for (const edge of plan.edges) {
        adjacency.get(edge.fromRoom)!.push(edge.toRoom);
        adjacency.get(edge.toRoom)!.push(edge.fromRoom);
      }
      const entrance = plan.rooms.find((r) => r.beatRole === "entrance")!.id;
      const seen = new Set([entrance]);
      const queue = [entrance];
      while (queue.length > 0) {
        const current = queue.shift()!;
        for (const next of adjacency.get(current) ?? []) {
          if (!seen.has(next)) {
            seen.add(next);
            queue.push(next);
          }
        }
      }
      expect(seen.size).toBe(plan.rooms.length);
    }
  });

  it("sizes every room at least 3 tiles and consistent with its largest monster", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const plan = buildSitePlan(new Dice(seed), 4, GOAL, "diablerie");
      for (const room of plan.rooms) {
        expect(room.rect.w).toBeGreaterThanOrEqual(3);
        expect(room.rect.h).toBe(room.rect.w);
        expect(room.rect.w).toBeGreaterThanOrEqual(MONSTER_SIZE_TILES[room.largestMonsterSize]);
      }
    }
  });

  it("keeps every corridor at least as wide as the site's largest monster", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const plan = buildSitePlan(new Dice(seed), 4, GOAL, "diablerie");
      const largest = Math.max(...plan.rooms.map((r) => MONSTER_SIZE_TILES[r.largestMonsterSize]));
      for (const edge of plan.edges) {
        expect(edge.width).toBeGreaterThanOrEqual(largest);
        expect(CORRIDOR_LENGTH_TILES[edge.lengthBand]).toBeGreaterThan(0);
      }
    }
  });

  it("carves the exact filler count the caller asked for", () => {
    for (const fillerCount of [0, 1, 3, 6]) {
      const plan = buildSitePlan(new Dice(7), fillerCount, GOAL, "diablerie");
      expect(plan.rooms).toHaveLength(5 + fillerCount);
    }
    expect(() => buildSitePlan(new Dice(7), -1, GOAL, "diablerie")).toThrow();
  });

  it("never lets two rooms overlap", () => {
    for (let seed = 1; seed <= 60; seed++) {
      const plan = buildSitePlan(new Dice(seed), 4, GOAL, "diablerie");
      for (let i = 0; i < plan.rooms.length; i++) {
        for (let j = i + 1; j < plan.rooms.length; j++) {
          const a = plan.rooms[i]!.rect;
          const b = plan.rooms[j]!.rect;
          const overlapping = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
          expect(overlapping).toBe(false);
        }
      }
    }
  });

  it("sizes the grid so every room fits inside it", () => {
    for (let seed = 1; seed <= 20; seed++) {
      const plan = buildSitePlan(new Dice(seed), 4, GOAL, "diablerie");
      for (const room of plan.rooms) {
        expect(room.rect.x).toBeGreaterThanOrEqual(0);
        expect(room.rect.y).toBeGreaterThanOrEqual(0);
        expect(room.rect.x + room.rect.w).toBeLessThanOrEqual(plan.width);
        expect(room.rect.y + room.rect.h).toBeLessThanOrEqual(plan.height);
      }
    }
  });
});
