/**
 * DB Manifest Loader: Exposes populated SQL table statistics and manifests
 * to the rules engine.
 */

import manifest from "./tables_manifest.json";

export interface DatabaseManifest {
  database: string;
  monsters_count: number;
  spells_count: number;
  roll_tables_count: number;
  rules_count: number;
  status: string;
}

export function getDatabaseManifest(): DatabaseManifest {
  return manifest as DatabaseManifest;
}
