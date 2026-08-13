# Goals and Dungeon Traversal Plan

## Design intent

DuskUltima objectives are about accomplishing a concrete mission, not
systematically killing every creature on the map. Combat is one possible tool;
stealth, evasion, deception, morale breaks, and route choice are valid ways to
finish a site. The party only needs to defeat a named target when the goal
specifically says so.

## Site goals

The site goal vocabulary is:

- `rescue-companion`: free a class companion who joins the party.
- `fabled-item`: recover a named, guaranteed item such as the Crown of the Deep.
- `lift-hex`: break a curse, blight, or zone affliction.
- `harvest-components`: collect a required number of ritual or alchemical components.
- `treasure-cache`: open and secure a cache; the contents use treasure generation.
- `exotic-materials`: gather rare materials, usually from dangerous terrain or creatures.
- `rescue-hostage`: free a hostage without implying party recruitment.
- `monster-eggs`: recover species-specific eggs; the nest has an ecological guardian that can be fought, distracted, or avoided. Scrag, kobold, spider/wasp, ankheg, crocodile, basilisk, cockatrice, hippogriff, wyvern, dragon, plesiosaurus, remorhaz, chuul, and void-spider clutches are plausible by biome. Purple Worm eggs are rare, epic/legendary targets.
- `assassinate-leader`: eliminate one named leader; other enemies may survive.
- `secure-chokepoint`: reach and hold an important passage, gate, bridge, or shaft.
- `kill-boss`: defeat one named site boss; clearing every room is unnecessary.
- `clear-border`: make a border safe enough for passage. Killing every hostile is not required; fleeing, sneaking, or breaking morale can qualify.

Every goal records its intended completion mode and explicitly allows
non-lethal approaches unless the named target itself must be defeated. Future
progress should track objective state separately from hostile counts.

Daeodon is already gargantuan in the roster, but is a mammal rather than an
egg-layer, so it is not used as an egg guardian. Kobolds are present in the
Red Sands roster as small desert lizard-folk; their eggs are intentionally a
strange but valid lower-tier objective. Scrags are large monitor lizards and
Purple Worms are gargantuan, legendary nest guardians. Hippogriffs are
already present in the Midnight Sun roster; Wyverns and Desert Dragons are
now explicit Red Sands roster creatures and egg-goal candidates.

## Room archetypes

The room generator will use these twelve archetypes:

1. Entrance
2. Empty / exploration
3. Monster encounter
4. Elite encounter
5. Trap room
6. Environmental hazard
7. Puzzle / obstacle
8. Shrine / boon
9. Rescue or hostage chamber
10. Treasure cache
11. Goal vault / objective chamber
12. Exit / rest chamber

The site room-count tables still determine how many rooms exist (3–12). The
number twelve is the maximum room count for a large site, not twelve rooms in
every dungeon.

## Travel spaces

Rooms are connected by explicit travel segments. A segment may be a corridor,
ramp, or shaft. Some segments are deliberately wide enough for the largest
monster size selected for the site. Traps are allowed on travel segments, not
only inside rooms. A corridor encounter must not force a full clear; the party
can retreat, bypass, hide, or break morale where the situation permits.

## Implementation slices

1. Expand goal data and generator templates while preserving existing rescue,
   slay, and retrieve compatibility.
2. Add room archetypes and travel-segment metadata, including wide corridors
   and corridor trap locations.
3. Bind fabled-item goals to real item IDs and make treasure-cache goals roll
   actual treasure.
4. Add objective interactions for hexes, components, materials, hostages,
   chokepoints, and eggs, including avoidable guardian monsters.
5. Add monster treasure chance and post-encounter treasure resolution.
6. Add tests for non-lethal completion paths, target-only kill goals, room
   plans, corridor widths, and goal rewards.
