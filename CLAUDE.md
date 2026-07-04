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
  game/Progression.js    ← Difficulty tiers, run history (from SnakeAB)
  draft/PackDraft.js     ← MTG pack draft engine + AI drafter personas
  agents/Adventurer.js   ← One character: stats, class kit, equipment
  agents/Party.js        ← The drafted party: group decisions, marching order
  world/DungeonGen.js    ← Seeded room-graph dungeon generation
  encounters/RoomEncounters.js ← Per-room-type options/outcomes (personality-weighted)
  narrative/Narrator.js  ← Three-beat party narration (predicament/deliberation/resolution)
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
