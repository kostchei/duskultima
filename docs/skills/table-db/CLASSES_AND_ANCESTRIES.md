# DuskUltima class and ancestry constraints

This database follows `docs/raw_source/Classes_and_ancestry.txt`.

- Full classes: Fighter, Cleric, MagicUser, Thief, Bard (city of masks), Monk, Necromancer, Paladin, Ranger (river of night), Seawolf (midnight sun), Warlock (Diablrie) .
- Recoverable classes: Basilisk Warrior (red sands), Ras-Godai (red sands), Roustabout (city of masks), Delver (dwellers in the deep), Duelist (city of masks), Pit Fighter (red sands).
- Project ancestries: Human 1-4, Dwarf 5-6, Elf 7-8, Half-Orc 9-10  Gnome 11, Tiefling/Deva 12.

The Western Reaches source provides eight ancestry name tables. They remain source-addressable, including Goblin, Half-Elf, and Halfling. For the project-facing six ancestries, Gnome aliases the Kobold source name table and Tiefling/Deva aliases Human names. Tiefling/Deva's mechanical distinction is represented by the patron-boon note, not by inventing an unsupported name table.

These aliases are deliberate and are exposed in `project_ancestries` and `project_ancestries` in the TypeScript bundle.
