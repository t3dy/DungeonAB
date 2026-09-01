# DungeonAB — Agent Guide

**Dungeon-crawling autobattler.** MTG-style pack draft (player + 3 AI drafters, pass the packs), then a drafted party of Fighters / Clerics / Wizards / Rogues / Alchemists auto-crawls a procgen dungeon: fights, loot, spell-learning, alchemy at lab rooms.

**Read `DESIGN.md` first** — it consolidates the Megabase design chats
(`2025-12-14_Dungeon crawling auto battler`, `2025-01-10_RPG Auto-Battler Concept`),
the games catalog entry (`dungeon-autobattler` / "The Alchemist's Dungeon"),
and the proven SnakeAB architecture this adapts.

## Quick Start

```bash
cd C:\Dev\DungeonAB
npm install
npm run dev      # http://localhost:5175
npm test
```

## Where the trouble is written down

Read these before concluding something is fine, and add to them as you
go — they are kept live rather than written up at the end, because the
entries that get lost are the ones that looked small at the time.

Every one has a sister `…PROPOSAL.md` holding ranked options with a
recommendation for each entry. Read the problem, then its proposal; do
not invent a third approach without saying why the ranked ones were
rejected.

| File | Holds |
|---|---|
| `BUGS.md` | Defects — things that do the wrong thing |
| `PROBLEMS.md` | Unfinished, with how it is known and its status |
| `PERPLEXITIES.md` | Open design questions with no obvious answer |
| `BALANCEISSUES.md` | Measured numbers that look wrong, with the measurement |
| `SIMULATIONFINDINGS.md` | What running it thousands of times taught |
| `DRAMATURGISSUES.md` | Defects in the critic — contaminates every finding taken with it |
| `ARCHITECTURE.md` | How it fits, and where the seams leak |
| `DATACONTRACTS.md` | What must agree with what, and which agreements are ungated |
| `CONTENTREACH.md` | What players actually meet vs what was built |
| `MEASUREMENT.md` | How to measure without fooling yourself — **read before quoting a number** |
| `ROUGHEDGES.md` | Papercuts, debt, and traps |
| `DESIGN_DIALOGUE.md` | The narrative of why things are the way they are (§N–§Q) |

`npm run audit` regenerates the measurable facts these cite (dead
exports, unread fields, contract drift, hand-synced tables). It is an
**instrument, not a gate** — a finding usually means something is
unfinished, where a `npm test` failure means something is broken.

## Structure

```
src/
  game/Cards.js          ← Draftable card pool (characters/equipment/spells/personalities)
  game/Campaign.js       ← Town between dungeons, party carryover, depth scaling
  game/Progression.js    ← Difficulty tiers, run history (from SnakeAB)
  draft/PackDraft.js     ← MTG pack draft engine + AI drafter personas
  agents/Adventurer.js   ← One character: stats, class kit, equipment
  agents/Party.js        ← The drafted party: group decisions, marching order
  world/DungeonGen.js    ← Seeded room-graph dungeon generation
  encounters/RoomEncounters.js ← Per-room-type options/outcomes (personality-weighted)
  narrative/Narrator.js  ← Three-beat party narration (predicament/deliberation/resolution)
  narrative/Barks.js     ← Personality × class dialogue (same archetype, different voice per class)
  sim/Simulator.js       ← Room-by-room auto-crawl loop
  ui/                    ← DraftUI (pack picks), story panel, renderer
tests/                   ← Node test runner suites
```

## Standing Rules (inherited from SnakeAB practice)

1. **Design-first**: spec lives in DESIGN.md; Megabase chats are upstream sources.
2. **Test-first**: every mechanic ships with tests; narration has coverage tests (every room type × option has writing).
3. **Guaranteed coverage**: packs always contain ≥2 characters — no dead drafts (Boss Monster lesson).
4. **Gradient outcomes**: encounters resolve on a spectrum, not binary win/lose.
5. **Procgen validates**: dungeon graph must be traversable entrance→boss before acceptance.
6. **The story panel is a product surface**: writing quality matters as much as mechanics.
7. **No state change is silent**: if a number the player could care about moves, the run's
   record says so. Every observable field lives in `Chronicle.snapshotState` and has writing
   in `Chronicle.FIELDS`; `tick()` wraps its body and diffs on every exit path, so a mechanic
   cannot dodge the record by returning early. `tests/silence.test.js` is the gate and fails
   if a field can move unreported or is added without writing.
   *Why it is a rule:* hand-placed narration proved bypassable — heroes were dying on the
   march with the Chronicle saying nothing, because a snapshot was taken three lines too late.
8. **A new mechanic ships with its writing and its record**: prose for what the player reads,
   a `Chronicle` field + entry for what gets saved, and coverage that both exist. Curate what
   reaches the prose (a beat, not a steady state) — but record everything.
9. **When a mechanic lands, run the asset pass**: ask which existing cards, classes and
   personalities should now interact with it, and redesign the ones written for a game that no
   longer exists. Mechanics drift ahead of assets otherwise. See `ASSET_REVIEW.md`.
   `npm run assets` asks two questions: does any mechanic *read* this card (static), and does
   the thing the card promises ever *reach the player* (dynamic, measured over real delves).
   `tests/assets.test.js` gates the second at one delve in ten.
   *Why the second question exists:* Eyes of the Mouse fired on every dark march and its
   three lines never named it, so a player who drafted it could not tell it was working.
10. **Balance is measured, not judged**: the curve is 99/88/71/45 and every mechanic or
   asset change moves it. `npm run calibrate` reports the drift and `--write` searches for
   new constants; `npm run bench` regenerates `MINING_REPORT.md`, which stamps the
   `STAT_SCALE` it ran against so a stale benchmark fails the gate rather than quietly
   describing a different game. `npm run card <id>` measures one card's real contribution —
   the cost model in `game/Costing.js` only screens (rank correlation ~0.69).
   *Why it is a rule:* STAT_SCALE was re-swept by hand six times in one session, and doing
   it by hand means sometimes not doing it.
11. **A comparison that cannot fail is worse than no test**: fixtures must sit in a regime
   where the arms could differ. `tests/helpers.js` `armsDiffer` refuses saturated totals,
   the `max(1, …)` damage floor, and differences inside the noise.
12. **A mechanic nobody meets is not in the game**: coverage proves a beat *can*
   happen and `tests/prose.js` proves it appears in *some* transcript; neither says how
   often. `npm run census` walks 600 delves and reports, per mechanic, the share of delves
   that met it and the times a delve — plus every option offered against how often it was
   taken, which separates "nobody is offered this" from "nobody wants this". Anything under
   5% of delves is flagged. `tests/prose.test.js` gates the sharp end: an option offered
   forty times and taken under 3% of them is decoration.
   *Why it is a rule:* the boss unleash had no line at all, the idle-tactic warning reached
   the panel and never the saga, and the stairhead camp — built the same day, with a card
   supporting it — was met by 2% of delves because parties arrive at the stair at 96% health.
13. **Writing is gated on accuracy, not just existence**: a line must state the number the
   mechanic applied and invent none (`narrative/Prose.js`), no line may repeat itself through
   a delve, card text and room tells pass a house-style lint, and every writable beat must
   appear in a real seeded transcript. `tests/prose.test.js` is the gate.
   *Why it is a rule:* Aegis of Ash read "blunts the first blow in each fight" while the
   resolver warded every round, and a player who believed the card drafted it wrong.
14. **One session per working tree**: parallel Claude sessions must not share this
   directory — each takes its own worktree (`git worktree add ../DungeonAB-v7 -b v7`).
   *Why it is a rule:* the v6/v7 tangle of 2026-08-31. Two sessions edited `main`'s tree at
   once; each saw the other's half-finished edits land mid-turn, neither could tell
   committed work from uncommitted, and the sorting-out needed its own handoff document
   (`HANDOFF_V6_TO_V7.md`).
