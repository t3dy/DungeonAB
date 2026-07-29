# MORIGNY — Handover

State of the sub-project as of the end of the first build sessions, so a
fresh window can pick up without re-reading the whole conversation.
Branch: **`claude/morigny-monastic-game-tpw2j6`**.

---

## What MORIGNY is

A monastic life & practice simulator of **John of Morigny** (fl. c. 1300–1323),
the Benedictine who practiced the *ars notoria*, repented of it, and rewrote it
as the *Liber florum celestis doctrine* under claimed Marian authorization —
condemned and burned at Paris in 1323, surviving only in copies. Grounded in
**Claire Fanger's** scholarship, whose reflexive method (the scholar written
into the narrative) is the model for the game's fourth wall.

Standalone sub-project inside the DungeonAB repo. Shares the house culture
(design-first, test-first, seeded determinism, writing-coverage tests) but
none of the autobattler engine.

## Run it

```bash
npm install
npm run dev          # http://localhost:5176
npm test             # all green
```

**Standalone project.** It has its own `package.json`, `vite.config.js`,
`src/`, and `tests/`, and imports nothing from outside this folder. It
currently still *sits* inside the DungeonAB repo; see
"Extracting to its own repo" below.

At the incipit: **B** = a day inside the walls · **E** = a road day to Étampes.
Keyboard-first; arrow keys walk the world map; **T** talks; **Z** = state of
the soul.

## Documents (read in this order)

| File | What it holds |
|---|---|
| `DESIGN.md` | pillars, nested loops, the Struggle, fixed-1323 horizon |
| `STYLE_GUIDE.md` | **three-hands voice system; binding register rules for the temptation material; encoded scholarly values** |
| `CLAUDE.md` | **standing rules — enforced by tests** |
| `INTERFACE.md` | codex UI, grisaille palette, semantic earned color |
| `COMMANDS.md` | the 26-letter Ultima V alphabet |
| `WORLD_DESIGN.md` | tile world, towns, reagent→preparation translation, Radical Axis |
| `SLICE_SPEC.md` | the numbers: recitation, Struggle, discernment |
| `PACING.md` | the 70/20/10 ratio and the four kinds of choice |
| `SCRIPTORIUM.md` | **planned, not built** — manuscript production system |
| `ART_SOURCES.md` | image sourcing pipeline + provenance schema |
| `BIBLIOGRAPHY.md` | reading program + **Research Queue** |

## The five rules that shape everything

1. **No unsourced content.** Every record carries `sources[]` +
   `status: attested|adapted|invented`. Tests fail otherwise.
2. **Never fabricate quotations** — from John, from Fanger, from anyone.
   Invented text in John's voice is marked `invented` and the in-game
   apparatus can disclose it.
3. **The Struggle register is binding**: interior simulation only, never
   depicted, never mocked, no reward loop that makes lapse desirable.
4. **Use Fanger's method, not her person.** The pencil hand is our own
   designer-scholar voice; it never bears her name or invents her words.
5. **Fixed history stays fixed.** 1323 always arrives. Counterfactuals only
   through the *marked* departure annotation.

## Code map (`src/`)

```
engine/     state · day · recitation · struggle · vision · commands
            world · talk · chronicle          ← all pure, all tested
content/    content.js — every authored passage, with envelopes
data/       hours · worldmap · npcs · assets_manifest
ui/         tiles.js — original procedural 16px tiles
main.js     controller: keyboard dispatch, scenes, DOM
morigny.css grisaille codex + Ultima V frame
```

Tests: `tests/morigny_engine.test.js`, `morigny_content.test.js`
(provenance lint + writing coverage), `morigny_world.test.js`,
`morigny_chronicle.test.js`.

## Built and working

- **Full day loop**: Matins (with the procedure-prayer slot) → Lauds →
  Prime/chapter → daylight or the road → Vespers → Compline → the night →
  the dream → the reckoning, with a witness saved to localStorage.
- **Recitation** as *custodia oculorum*: distractions pull at the margin;
  **H** holds fast (costs resolve, doubled when scrupulous), **E** attends
  (loses the verse). Some distractions are the scholar's pencil notes —
  reading the scholarship costs John a verse.
- **The Struggle**: pressure tiers, night verbs (V/K/M/W) plus an
  always-present **Y**ield, gradient outcomes, and the confession
  asymmetry — lapse recovers in a day, scrupulosity lingers and taxes
  attention.
- **Discernment**: seeded visions, three tells (one always ambiguous),
  four asymmetrically-priced outcomes; accepting a counterfeit corrupts
  *silently* until the reckoning.
- **World layer**: tile map Morigny→Étampes, road bells for Terce/Sext/None
  (**K** keeps the office where you stand — conspicuous in town), four
  Talk-keyword NPCs, the poppy draught (no siege, and no dream), and the
  first Radical Axis beat (Evrart's `scorn`).
- **The command alphabet**: 26 letters, each with a refusal line in period
  voice. **A**ttack is nearly always refused by design.

- **1323, complete**: renown accumulates across witnesses until the
  summons; the examination (three questions from the period's real
  objections to the *ars notoria*, each answerable submit/defend/scorn);
  three authored endings — every road burns the book; the **departure
  annotation** on the counterfactual path; and the **stemma** screen where
  the modern scholar receives not the best copy but the one that got out.

## In flight — pick up here

**Nothing is half-built.** The campaign loop closes. The next work is new:

1. **The scriptorium** (`SCRIPTORIUM.md`) — the biggest remaining design,
   and the one that makes transmission (the actual victory condition)
   mechanical rather than a metaphor. Build order is in that document:
   data → pure engine + tests → a stage reusing the recitation grammar →
   witnesses gaining real copies.
2. **Orléans, Sens, Paris** on the world map (`WORLD_DESIGN.md` §5), with
   the pecia book-trade and the clerical underworld as *memory and
   transaction*, kept rare per `PACING.md`.
3. **City leaves** — sourced historical imagery for the towns, in the
   pencil layer with honest dates (`ART_SOURCES.md`).
4. **The reading sprint** below, which unblocks every `verify` flag.

## Extracting to its own repo

The folder is already self-contained and its history is in the DungeonAB
repo. To split it out with history intact (run locally, where you can
create repos):

```bash
# 1. create an empty GitHub repo named Morigny (no README/gitignore)

# 2. from a clone of DungeonAB, on the morigny branch:
git subtree split --prefix=morigny -b morigny-only

# 3. push that branch as the new repo's main:
git push git@github.com:t3dy/Morigny.git morigny-only:main

# 4. clone it wherever you want it:
git clone git@github.com:t3dy/Morigny.git C:/Dev/Morigny
cd C:/Dev/Morigny && npm install && npm test && npm run dev
```

Afterwards, delete `morigny/` from DungeonAB in a separate commit so the
two projects stop sharing a tree. (I could not create the repo from this
session — the GitHub integration lacks repository-creation permission.)

## Research Queue (blocks `verify` flags)

The next real sprint is reading, not coding: **Fanger's *Rewriting Magic*
and the Fanger–Watson edition** with `BIBLIOGRAPHY.md`'s queue in hand —
John's dates, the prayer procedures' true structure, the Book of Visions
episode list, the sexual-temptation loci and Fanger's handling of them,
Bridget, and the 1323 notice's wording. Every item moves into data only
with `sources: [{work, locus}]` filled.

---

## Continuation prompt (paste into a new window)

> Continue building **MORIGNY**, a monastic life & practice simulator of
> John of Morigny (fl. c. 1300–1323), grounded in Claire Fanger's
> scholarship. The campaign loop is complete through the 1323 ending and
> the stemma; `npm test` and `npm run dev` should both be green before you
> change anything.
>
> Read `HANDOVER.md` first, then `CLAUDE.md`, `STYLE_GUIDE.md`, and
> `PACING.md`. Their rules are binding and enforced by tests: no unsourced
> content (every record carries `sources[]` + `attested|adapted|invented`),
> no fabricated quotations from John or from Fanger, the Struggle material
> stays interior and never depicted, and fixed history stays fixed (1323
> always arrives; counterfactuals only through the marked departure
> annotation).
>
> Next task: **build the scriptorium system** specified in
> `SCRIPTORIUM.md` — manuscript production as core play, since copying is
> what makes transmission (the victory condition) mechanical. Follow that
> document's build order: data (`exemplars`, `materials`) → a pure
> `engine/scriptorium.js` with tests (quire model, the copy loop reusing
> the recitation grammar, the error classes including the *verba ignota*
> that cannot be self-corrected from sense, the figure check that sets
> `procedure.corrupt` silently, concealment state) → a scriptorium stage
> with the daylight constraint on screen → witnesses gaining real copies
> that feed the stemma.
>
> Keep the house rules: tests ship with mechanics (`npm test`), the engine
> stays pure and seeded-deterministic, writing coverage and the provenance
> lint must stay green. Commit when done.
