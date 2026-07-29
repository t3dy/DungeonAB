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
npm run dev          # http://localhost:5175/morigny/
npm test             # 23 suites, all green
node --test tests/morigny_*.test.js   # just this sub-project
```

At the incipit: **B** = a day inside the walls · **E** = a road day to Étampes.
Keyboard-first; arrow keys walk the world map; **T** talks; **Z** = state of
the soul.

## Documents (read in this order)

| File | What it holds |
|---|---|
| `morigny/DESIGN.md` | pillars, nested loops, the Struggle, fixed-1323 horizon |
| `morigny/STYLE_GUIDE.md` | **three-hands voice system; binding register rules for the temptation material; encoded scholarly values** |
| `morigny/CLAUDE.md` | **standing rules — enforced by tests** |
| `morigny/INTERFACE.md` | codex UI, grisaille palette, semantic earned color |
| `morigny/COMMANDS.md` | the 26-letter Ultima V alphabet |
| `morigny/WORLD_DESIGN.md` | tile world, towns, reagent→preparation translation, Radical Axis |
| `morigny/SLICE_SPEC.md` | the numbers: recitation, Struggle, discernment |
| `morigny/SCRIPTORIUM.md` | **planned, not built** — manuscript production system |
| `morigny/ART_SOURCES.md` | image sourcing pipeline + provenance schema |
| `morigny/BIBLIOGRAPHY.md` | reading program + **Research Queue** |

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

## Code map (`src/morigny/`)

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

## In flight — pick up here

**`engine/chronicle.js` is written and tested but NOT wired to the UI.**
It is the v3 spine:
- `recordDay()` accumulates renown across witnesses (suspicion + audacity
  + licence).
- `summonsDue()` fires at `SUMMONS_AT` (12 renown).
- `createExamination()` / `answerQuestion()` / `verdict()` → one of
  `submitted` | `defiant` | `departed`. Every verdict burns the book;
  `departed` is the marked counterfactual and must be *earned across days*,
  not improvised at the bar.

**To finish v3:**
1. Load the chronicle at `start()`; call `recordDay()` in `reckoning()`.
2. If `summonsDue()`, open the day with the summons to Paris instead of
   chapter; write the examination stage (three questions, stances
   submit/defend/scorn) in the three hands.
3. Author the three endings. On `departed`, the pencil hand writes the
   mandatory annotation — *"Here the witness departs from the record"* —
   and the witness is filed as a **contaminated witness**.
4. The stemma screen: witnesses from localStorage as a descent tree; the
   framing ending (a modern reading room, the manuscript found).

**Then**: the scriptorium system in `morigny/SCRIPTORIUM.md` — the
biggest remaining design, and the one that makes transmission (the actual
victory condition) mechanical.

## Research Queue (blocks `verify` flags)

The next real sprint is reading, not coding: **Fanger's *Rewriting Magic*
and the Fanger–Watson edition** with `BIBLIOGRAPHY.md`'s queue in hand —
John's dates, the prayer procedures' true structure, the Book of Visions
episode list, the sexual-temptation loci and Fanger's handling of them,
Bridget, and the 1323 notice's wording. Every item moves into data only
with `sources: [{work, locus}]` filled.

---

## Continuation prompt (paste into a new window)

> Continue building **MORIGNY**, the John of Morigny monastic practice
> simulator in the `morigny/` sub-project of this repo, on branch
> `claude/morigny-monastic-game-tpw2j6`.
>
> Read `morigny/HANDOVER.md` first, then `morigny/CLAUDE.md` and
> `morigny/STYLE_GUIDE.md` — their rules are binding: no unsourced content
> (every record carries `sources[]` + `attested|adapted|invented`), no
> fabricated quotations from John or from Fanger, the Struggle material
> stays interior and never depicted, and fixed history stays fixed (1323
> always arrives; counterfactuals only through the marked departure
> annotation).
>
> Next task: **finish the v3 chronicle layer.** `src/morigny/engine/chronicle.js`
> is written and tested but not wired to the UI. Load the chronicle at
> `start()`, fold each day in at `reckoning()`, open the day with the
> summons to Paris when `summonsDue()`, write the examination stage (three
> questions; stances submit/defend/scorn) and author its three endings in
> the three hands — with the mandatory departure annotation on `departed`.
> Then build the stemma screen: witnesses from localStorage as a descent
> tree, ending in the modern reading room where the manuscript is found.
>
> Keep the house rules: tests ship with mechanics (`node --test
> tests/morigny_*.test.js`), engine stays pure, writing coverage and the
> provenance lint must stay green. Commit and push to the branch when done.
