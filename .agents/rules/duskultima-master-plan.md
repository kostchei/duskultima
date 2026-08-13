# Rule: DuskUltima System Maintenance & Progression Directives

When modifying or maintaining the DuskUltima codebase:

1. **Check AGENTS.md First**:
   - Always refer to `AGENTS.md` for the current progress and active checklist.

2. **Strict Class & Ancestry Limits**:
   - Do NOT add classes or ancestries beyond those in `docs/raw_source/Classes_and_ancestry.txt`.
   - Max 17 classes (11 full + 6 recoverable) and 6 ancestries.

3. **6 Cursed Scroll Zones**:
   - Build out zone flavour, monster rosters, tilesets, and environmental hazards for:
     1. Diablerie (Swamp/Gloom)
     2. Red Sands (Desert/Ziggurat)
     3. Midnight Sun (Frost/Tundra)
     4. River of Night (Underground River)
     5. Dwellers in the Deep (Sunken Cenote)
     6. City of Masks (Urban Rooftops)

4. **Ultima V Retro Aesthetic & Procedural Audio**:
   - Preserve Ultima V 2D pixel art style.
   - Use Web Audio API for math-driven procedural sound effects and ambience.

5. **Verification**:
   - Always run `npm run build` to verify clean TypeScript compilation before ending turns.
