export type OathRank = "worthy" | "mighty" | "legendary";
export type OathObjective = "kills" | "mercy" | "claim-no-retreat";

export interface OathState {
  id: string;
  characterId: string;
  rank: OathRank;
  objective: OathObjective;
  description: string;
  target: number;
  progress: number;
  fulfilled: boolean;
  failed: boolean;
}

const OATH_OPTIONS: Readonly<Record<OathRank, Omit<OathState, "id" | "characterId" | "progress" | "fulfilled" | "failed">>> = {
  worthy: {
    rank: "worthy",
    objective: "kills",
    description: "Defeat two foes before leaving the Midnight Sun.",
    target: 2,
  },
  mighty: {
    rank: "mighty",
    objective: "mercy",
    description: "Spare a defeated living foe with a non-lethal finishing blow.",
    target: 1,
  },
  legendary: {
    rank: "legendary",
    objective: "claim-no-retreat",
    description: "Claim the vault's treasure without retreating from an encounter.",
    target: 1,
  },
};

export function midnightSunOathOptions(characterId: string, destinationIndex: number): OathState[] {
  return (["worthy", "mighty", "legendary"] as const).map((rank) => ({
    id: `oath:${destinationIndex}:${characterId}:${rank}`,
    characterId,
    ...OATH_OPTIONS[rank],
    progress: 0,
    fulfilled: false,
    failed: false,
  }));
}

export type PatronId = "almazzat" | "kytheros" | "mugdulblub" | "shune" | "titania" | "willowman";
export type PatronDemand = "kills" | "claim" | "mercy" | "carouse";
export type PatronTaboo = "retreat" | "surrender" | "kill-spared" | "refuse-treasure";

export interface PatronDef {
  id: PatronId;
  name: string;
  boon: string;
  request: string;
  taboo: PatronTaboo;
  demand: PatronDemand;
  target: number;
}

export const PATRONS: readonly PatronDef[] = [
  { id: "almazzat", name: "Almazzat", boon: "Silver Tongue", request: "Claim a forbidden treasure.", taboo: "refuse-treasure", demand: "claim", target: 1 },
  { id: "kytheros", name: "Kytheros", boon: "Clockwork Precision", request: "Slay three dungeon foes.", taboo: "retreat", demand: "kills", target: 3 },
  { id: "mugdulblub", name: "Mugdulblub", boon: "Dissolving Flesh", request: "Spare one defeated creature.", taboo: "kill-spared", demand: "mercy", target: 1 },
  { id: "shune", name: "Shune", boon: "Vile Insight", request: "Carouse and spread a dangerous secret.", taboo: "surrender", demand: "carouse", target: 1 },
  { id: "titania", name: "Titania", boon: "Glamour", request: "Show mercy to a living foe.", taboo: "kill-spared", demand: "mercy", target: 1 },
  { id: "willowman", name: "The Willowman", boon: "Root-Walker", request: "Feed three deaths to the dark roots.", taboo: "retreat", demand: "kills", target: 3 },
];

export interface PatronState {
  characterId: string;
  patronId: PatronId;
  favor: number;
  progress: number;
  demandComplete: boolean;
  tabooBroken: boolean;
}

export type DestinationRuleEvent =
  | "kill"
  | "mercy"
  | "claim"
  | "retreat"
  | "surrender"
  | "carouse"
  | "kill-spared"
  | "refuse-treasure";

export function advanceOath(state: OathState, event: DestinationRuleEvent): OathState {
  if (state.fulfilled || state.failed) return state;
  if (state.objective === "claim-no-retreat" && event === "retreat") {
    return { ...state, failed: true };
  }
  const progresses =
    (state.objective === "kills" && event === "kill") ||
    (state.objective === "mercy" && event === "mercy") ||
    (state.objective === "claim-no-retreat" && event === "claim");
  if (!progresses) return state;
  const progress = Math.min(state.target, state.progress + 1);
  return { ...state, progress, fulfilled: progress >= state.target };
}

export function advancePatron(
  state: PatronState,
  event: DestinationRuleEvent,
): { state: PatronState; demandCompleted: boolean; tabooBroken: boolean } {
  const def = patronDef(state.patronId);
  const breaksTaboo = def.taboo === event;
  if (breaksTaboo && !state.tabooBroken) {
    return {
      state: { ...state, favor: state.favor - 1, tabooBroken: true },
      demandCompleted: false,
      tabooBroken: true,
    };
  }
  const demandEvent: DestinationRuleEvent = def.demand === "kills" ? "kill" : def.demand;
  if (state.demandComplete || event !== demandEvent) {
    return { state, demandCompleted: false, tabooBroken: false };
  }
  const progress = Math.min(def.target, state.progress + 1);
  const demandComplete = progress >= def.target;
  return {
    state: {
      ...state,
      progress,
      demandComplete,
      favor: demandComplete ? state.favor + 1 : state.favor,
    },
    demandCompleted: demandComplete,
    tabooBroken: false,
  };
}

export function patronOptions(seed: number): PatronDef[] {
  const start = Math.abs(seed) % PATRONS.length;
  return [0, 1, 2].map((offset) => PATRONS[(start + offset * 2) % PATRONS.length]!);
}

export function patronDef(id: PatronId): PatronDef {
  const result = PATRONS.find((candidate) => candidate.id === id);
  if (!result) throw new Error(`Unknown patron ${id}`);
  return result;
}
