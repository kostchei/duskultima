import { KEY_BINDINGS, type GameAction } from "./actions";

export type KeyBindingOverrides = Partial<Record<GameAction, string>>;

export const REBINDABLE_ACTIONS: readonly GameAction[] = [
  "moveLeft", "moveRight", "moveUp", "moveDown", "jump",
  "attack", "cast", "interact", "torch", "rewind",
];

export const REBINDABLE_KEYS = [
  "A", "D", "W", "S", "F", "Z", "LEFT", "RIGHT", "UP", "DOWN",
  "SPACE", "J", "X", "K", "Q", "E", "T", "H", "L", "R",
] as const;

export function isRebindableKey(value: string): value is (typeof REBINDABLE_KEYS)[number] {
  return (REBINDABLE_KEYS as readonly string[]).includes(value);
}

/** Apply one preferred physical key per overridden action without disturbing other actions. */
export function effectiveKeyBindings(
  overrides: KeyBindingOverrides,
): Readonly<Record<string, readonly GameAction[]>> {
  const result: Record<string, GameAction[]> = Object.fromEntries(
    Object.entries(KEY_BINDINGS).map(([key, actions]) => [key, [...actions]]),
  );
  for (const [action, key] of Object.entries(overrides) as [GameAction, string][]) {
    if (!REBINDABLE_ACTIONS.includes(action) || !isRebindableKey(key)) continue;
    for (const actions of Object.values(result)) {
      const index = actions.indexOf(action);
      if (index >= 0) actions.splice(index, 1);
    }
    (result[key] ??= []).push(action);
  }
  return result;
}

export function primaryKeyFor(action: GameAction, overrides: KeyBindingOverrides): string {
  const override = overrides[action];
  if (override) return override;
  return Object.entries(KEY_BINDINGS).find(([, actions]) => actions.includes(action))?.[0] ?? "?";
}
