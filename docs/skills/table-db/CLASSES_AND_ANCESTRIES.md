# DuskUltima class and ancestry constraints

This database follows `docs/raw_source/Classes_and_ancestry.txt`.

- Full classes: Fighter, Cleric, MagicUser, Thief, Bard, Monk, Necromancer, Paladin, Ranger, Seawolf, Warlock.
- Recoverable classes: Basilisk Warrior, Ras-Godai, Roustabout, Delver, Duelist, Pit Fighter.
- Project ancestries: Human, Dwarf, Elf, Half-Orc, Gnome, Tiefling/Deva.

The Western Reaches source provides eight ancestry name tables. They remain source-addressable, including Goblin, Half-Elf, and Halfling. For the project-facing six ancestries, Gnome aliases the Kobold source name table and Tiefling/Deva aliases Human names. Tiefling/Deva's mechanical distinction is represented by the patron-boon note, not by inventing an unsupported name table.

These aliases are deliberate and are exposed in `project_ancestries` and `project_ancestries` in the TypeScript bundle.
