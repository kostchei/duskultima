/** Contextual hide is taught briefly; it remains available through the E interaction list. */
export const HIDE_HINT_DURATION_MS = 2500;

export interface PromptableInteraction {
  overheadHint?: "hide";
}

export interface OverheadInteractionSelection<T> {
  interactions: T[];
  hideHintOfferedAt: number | undefined;
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
