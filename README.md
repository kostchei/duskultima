<div align="center">

<img src="assets/shadowdork-icon.png" alt="Shadowdork" width="320">

# SHADOWDORK

### Explore the depths as your torch dwindles.<br>Claim riches. Rescue delvers to join your party.

[![PLAY NOW](https://img.shields.io/badge/PLAY%20NOW-free%2C%20in%20your%20browser-c1440e?style=for-the-badge&labelColor=0d0d0d)](https://happy-bay-02b1a8400.azurestaticapps.net)

*No download. No account. Runs on your phone.*

</div>

---

You went down alone, with a sword and one torch.

The torch is burning. It has been burning since you climbed down, and it does not care what
you're in the middle of. Every room you search, every corridor you double back through, every
minute you spend deciding — it costs you light. And when the light goes, the dark down here
isn't empty. Things live in it. They see fine.

But there's gold below. There's more gold the deeper you go. And you are not the first person
to try this — there are others still alive down there, in cells and pits and holdfasts,
delvers who got further than you and got caught. Cut them loose and they'll come with you.

Four of you can do what one of you cannot.

---

## What you're doing down there

**🔥 Spending light like money.**
The torch is your real health bar. Search the room or press on? Backtrack for the chest you
saw, or accept you'll never know what was in it? Every torch is a decision, and a lit torch
fills a hand — you can't hold it *and* swing a two-hander. Outside your light radius the
dungeon is genuinely black; monsters see fine in it and hit you with advantage while you
swing at a disadvantage.

**💰 Taking what you can carry.**
Gold is the only thing that makes you stronger. Not kills. Not grinding. Coins bank toward
a level every hundred, and past what your party can carry free, every hundred more costs a
slot you wanted for gear. You get better by finding the vault behind the false wall and
living long enough to spend it. The most dangerous route is usually the richest one, and
that's the whole game.

**🗝️ Cutting people loose.**
A thief behind a locked grate. A priest chained at a fouled altar. A fighter losing badly,
right now, if you're quick. Each one you free follows you, fights for you, and opens doors
you physically could not open before — the fighter puts a shoulder through cracked stone,
the thief takes the ledge nobody else fits on. Who you find first changes the run, and
survivors come with you into the next dungeon carrying their levels, gear and gold.

**⚔️ Rolling for it, in the open.**
Every swing is a real d20 and the number floats up over the hit. No invisible health bars,
no enemy that takes eleven hits because the designer said so. Strike from above and you get
the better of two dice; get caught in the dark and you get the worse. A good hit ends a
fight. So does a bad one. When half a warband goes down, the rest have to hold their nerve
or run.

---

## Your party

| | | |
|---|---|---|
| ⚔️ | **The Fighter** | Takes the hit that would end anyone else. Puts a shoulder through weak stone. The one you start with, alone. |
| 🗝️ | **The Thief** | Goes where nobody else fits — ledges, vine walls, shafts. Finds the trap before it finds you. Deadly from behind. |
| ✨ | **The Wizard** | Reaches across the room. But magic is not free: a spell that fails is *gone* until you rest, and a fumbled cast goes somewhere you did not aim it. |
| ☩ | **The Priest** | Puts you back together. Breaks the nerve of the walking dead. And when the last torch dies, can become the light. |

You control one. The rest follow, hold, or fight on your word. Swap between them instantly.
Some places down there change what a class even is — the fighter who joins you in the red
sands is a pit-fighter, the wizard you find in a cursed hall is a witch.

---

## Nothing is chasing you

This is a **thinking game**, not a twitch game.

- No timers on puzzles. No chase sequences. No boss you have to out-reflex.
- **You set the clock.** A torch lasts 3 minutes, 10 minutes, or a full hour — your choice,
  changeable any time. The pressure is real or it's barely there, and that's up to you.
- Save from the pause menu wherever you're standing. Three slots and an autosave. Put it
  down mid-room and come back tomorrow.
- Jumps are forgiving on purpose — coyote time and buffered inputs mean if it looked like
  you made it, you made it.
- Every room is a small, solvable box. You will always be able to see what the room wants.
- Rebind any key. The whole game is playable with touch alone.

The tension is the dark and the dwindling, not your reaction time. If you loved
**The Lost Vikings** and **Commander Keen** and you don't have the hands for a Souls game
anymore, this was built for you.

---

## Controls

Move `A D` / `← →` · Jump `W` `↑` `Space` · Attack `J` `X` · Interact `E` · Swap party `1–4` / `Tab` ·
Light a torch `T` · Cast `K` · Cycle spell `Q` · Follow or hold `H` · Pause & save `Esc`

Character sheet `C` · Inventory `I` · Spend a luck token to reroll `L` · Next dungeon `R`

Every one of those has an on-screen touch equivalent — the whole game is playable with touch
alone, in landscape. Keys are rebindable.

<div align="center">
<br>

[![PLAY NOW](https://img.shields.io/badge/PLAY%20NOW-free%2C%20in%20your%20browser-c1440e?style=for-the-badge&labelColor=0d0d0d)](https://happy-bay-02b1a8400.azurestaticapps.net)

<br>
</div>

---

<details>
<summary><h3>Build notes & changelog</h3></summary>

**v0.1.0 — first playable**
- Four full dungeons in the library — The Gloom Below, The Ember Crypt, The Mold Warrens,
  The Drowned Angle — each a five-room run: entrance and guardian, puzzle, setback, climax,
  reward, then a rest spot with a fresh torch each and the exit door
- Solo start as the Fighter; companions found and recruited up to a party of four, survivors
  carried into the next dungeon with their levels, gear, spells and banked gold
- Real-time torch burn, light radius, true darkness mask, selectable torch duration
- Every rules event resolved on a real d20 through one service; the natural die is shown
- Positional advantage and disadvantage, weapon reach, automatic counter-swings, morale routs
- Spells as checks rather than slots: failure loses the spell until rest, natural 1 rolls the
  mishap table, natural 20 doubles the effect
- Death timers with stabilise-or-lose-them, a luck token reroll, and a short rewind
- Shops for spending what you hauled out
- Treasure as experience, gear-slot inventory, level-up rolling HP and a live class talent
- Ten families of featured puzzle traps, appearing in roughly 40% of runs, never twice
- Save anywhere from the pause menu: three slots, an autosave, export and import
- Full touch play in landscape, rebindable keys

**Coming**
- More of the dungeon library · deeper destination chains · richer shop stock

</details>

<details>
<summary><h3>For developers</h3></summary>

Phaser 3 + TypeScript + Vite, with a pure TypeScript rules engine that has no Phaser imports
at all — dice, checks, characters, effects-as-data talents, the spell state machine,
gear-slot inventory, advancement, weighted tables, nested time (rounds, crawling rounds, real
milliseconds) and an append-only event log. The game layer never rolls dice or mutates rules
state itself; it calls the engine and renders the consequences. Invalid states — unknown
table, over-capacity inventory, resting without a ration — throw rather than quietly falling
back.

```bash
git clone https://github.com/kostchei/shadowdork.git
cd shadowdork && npm install && npm run dev   # http://localhost:5173
```

```bash
npm run build      # type-check + static production build in dist/
npm test           # engine unit tests (vitest)
npm run test:e2e   # browser smoke tests (playwright)
npm run lint       # eslint + knip
```

On Windows, run `install-shadowdork.bat` once — it installs Node and Chrome through winget
when missing, installs dependencies, and drops a desktop shortcut that starts Vite and opens
the game.

```
src/engine/   Rules engine. Pure TypeScript, no Phaser.
src/data/     Rules-as-data: classes, spells, items, monsters, talent and mishap tables.
src/game/     Phaser 3 (Arcade physics): scenes, entities, systems (light mask, party AI,
              combat, zones, spell effects), the dungeon library, and pixel art generated
              at boot with no external asset pipeline.
tests/        Engine unit tests.
e2e/          Playwright smoke tests.
```

Design docs: [Shadowdork.md](Shadowdork.md) (game design),
[docs/five-room-dungeons.md](docs/five-room-dungeons.md) (level-design bible: room-variant
library, order shuffles, 2D layout patterns),
[docs/mobile-playability-plan.md](docs/mobile-playability-plan.md) (touch input, lifecycle,
performance, release criteria),
[docs/game-improvement-plan.md](docs/game-improvement-plan.md) (presentation and replay work).

Every push to `main` runs unit tests, browser smoke tests and a build, then deploys to Azure
Static Web Apps; pull requests get preview environments.

</details>

<details>
<summary><h3>Credits & licence</h3></summary>

Code MIT. In-game art is generated procedurally at boot; the sprite packs bundled under
`public/assets/` are CC0 — **50+ Monsters Pack 2D** by isaiah658 and **Tiny Creatures** by
Clint Bellanger, itself an expansion of Kenney's Tiny Dungeon and Tiny Town.

All bundled tables — classes, talents, spells, monsters, treasure, mishaps — are original
text written for this project. If you fork this and intend to ship someone else's tabletop
content in it, read that publisher's third-party licence first.

</details>
