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
