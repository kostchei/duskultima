import { describe, expect, it } from "vitest";
import {
  HIDE_HINT_DURATION_MS,
  selectOverheadInteractions,
  type PromptableInteraction,
} from "../src/game/interactionPrompt";

interface TestInteraction extends PromptableInteraction {
  label: string;
}

const hide: TestInteraction = { label: "hide in nearby cover", overheadHint: "hide" };
const recover: TestInteraction = { label: "recover sword" };

describe("overhead interaction prompt", () => {
  it("briefly teaches hide once to a non-thief without removing the interaction", () => {
    const availableInteractions = [hide];
    const first = selectOverheadInteractions(availableInteractions, false, 100, undefined);
    expect(first.interactions).toEqual([hide]);
    expect(first.hideHintOfferedAt).toBe(100);

    const duringHint = selectOverheadInteractions(
      [hide],
      false,
      100 + HIDE_HINT_DURATION_MS - 1,
      first.hideHintOfferedAt,
    );
    expect(duringHint.interactions).toEqual([hide]);

    const afterHint = selectOverheadInteractions(
      [hide],
      false,
      100 + HIDE_HINT_DURATION_MS,
      first.hideHintOfferedAt,
    );
    expect(afterHint.interactions).toEqual([]);
    expect(availableInteractions).toEqual([hide]);
  });

  it("keeps other overhead interactions visible after hiding is suppressed", () => {
    const selected = selectOverheadInteractions(
      [hide, recover],
      false,
      HIDE_HINT_DURATION_MS,
      0,
    );
    expect(selected.interactions).toEqual([recover]);
  });

  it("always includes hide when the party is led by a thief role", () => {
    const selected = selectOverheadInteractions(
      [hide],
      true,
      HIDE_HINT_DURATION_MS * 10,
      0,
    );
    expect(selected.interactions).toEqual([hide]);
  });
});
