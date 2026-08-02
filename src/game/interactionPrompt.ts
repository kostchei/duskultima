/** Contextual hide is taught briefly; it remains available through the E interaction list. */
export const HIDE_HINT_DURATION_MS = 2500;

export interface PromptableInteraction {
  overheadHint?: "hide";
  /**
   * Run this action immediately when it shares the E prompt with optional
   * hiding. Used for single-purpose world interactions such as traps and
   * switches, which should not require navigating past Hide first.
   */
  immediate?: boolean;
}

export interface OverheadInteractionSelection<T> {
  interactions: T[];
  hideHintOfferedAt: number | undefined;
}

/** Return the contextual action that should take precedence over optional hide. */
export function selectImmediateInteraction<T extends PromptableInteraction>(
  interactions: readonly T[],
): T | undefined {
  return interactions.find((interaction) => interaction.immediate);
}

/**
 * Keep routine hide actions out of the permanent overhead prompt for non-thief
 * leaders. Thief-led parties retain the always-on contextual hint.
 */
export function selectOverheadInteractions<T extends PromptableInteraction>(
  interactions: T[],
  thiefLed: boolean,
  now: number,
  previousHideHintOfferedAt: number | undefined,
): OverheadInteractionSelection<T> {
  const hasHide = interactions.some((interaction) => interaction.overheadHint === "hide");
  const hideHintOfferedAt = !thiefLed && hasHide && previousHideHintOfferedAt === undefined
    ? now
    : previousHideHintOfferedAt;
  const showHide = thiefLed
    || (hideHintOfferedAt !== undefined && now < hideHintOfferedAt + HIDE_HINT_DURATION_MS);

  return {
    interactions: showHide
      ? interactions
      : interactions.filter((interaction) => interaction.overheadHint !== "hide"),
    hideHintOfferedAt,
  };
}
