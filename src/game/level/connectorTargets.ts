import type { ExpandedConnector } from "./dungeons";

/** Authored NPC actions must point at a real connector; bad content is never a no-op. */
export function resolveTargetConnector(
  connectors: readonly ExpandedConnector[],
  connectorId: string | undefined,
): ExpandedConnector {
  if (!connectorId) throw new Error("NPC open-connector action is missing connectorId");
  const connector = connectors.find((candidate) => candidate.id === connectorId);
  if (!connector) throw new Error(`NPC open-connector action references unknown connector "${connectorId}"`);
  return connector;
}
