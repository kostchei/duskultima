import type { Alignment, Ancestry } from "./character";

export type WarlockPatronId = "freya" | "molek" | "rathgamnon" | "saint-ydris" | "shune-the-vile";
export type PatronAlignment = "law" | "chaos";

export interface WarlockPatronDef {
  id: WarlockPatronId;
  name: string;
  alignment: PatronAlignment;
  boon: string;
}

export const WARLOCK_PATRONS: readonly WarlockPatronDef[] = [
  { id: "freya", name: "Freya", alignment: "law", boon: "Once per day, gain advantage on melee attacks for 3 rounds." },
  { id: "molek", name: "Molek", alignment: "chaos", boon: "Once per day, force a failed roll to be rerolled." },
  { id: "rathgamnon", name: "Rathgamnon", alignment: "chaos", boon: "+1 AC from supernatural foresight." },
  { id: "saint-ydris", name: "Saint Ydris", alignment: "chaos", boon: "+1 melee and ranged attack rolls." },
  { id: "shune-the-vile", name: "Shune the Vile", alignment: "chaos", boon: "Learn one wizard spell of a tier no higher than half your level." },
];

export function warlockPatronDef(id: WarlockPatronId): WarlockPatronDef {
  const patron = WARLOCK_PATRONS.find((candidate) => candidate.id === id);
  if (!patron) throw new Error(`Unknown patron "${id}"`);
  return patron;
}

export function warlockPatronOptions(alignment: Alignment): WarlockPatronDef[] {
  if (alignment !== "law" && alignment !== "chaos") throw new Error("Only lawful or chaotic characters may choose these patrons");
  return WARLOCK_PATRONS.filter((patron) => patron.alignment === alignment);
}

export function validatePatronSelection(
  patron: WarlockPatronId,
  options: { alignment: Alignment; ancestry?: Ancestry; className?: string },
): WarlockPatronDef {
  const selected = warlockPatronDef(patron);
  if (options.alignment !== selected.alignment) {
    throw new Error(`${selected.name} requires a ${selected.alignment} alignment`);
  }
  if (options.ancestry === "tiefling-deva" && options.alignment !== "law" && options.alignment !== "chaos") {
    throw new Error("Tiefling/Deva patron blood must come from a lawful or chaotic patron");
  }
  if (options.className && options.className !== "warlock" && options.ancestry !== "tiefling-deva") {
    throw new Error("Only Warlocks and Tiefling/Deva may select a patron boon");
  }
  return selected;
}
