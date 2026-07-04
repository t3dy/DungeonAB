# DungeonAB: Implementation Plan for Fable

**Prepared:** 2026-07-03  
**Model Target:** Fable 5  
**Scope:** MVP covering draft, party AI, dungeon simulation, and narration.

---

## Phase 1: Foundations (Modules & Data Structures)

### 1.1 Card Pool & Draft System
**Files to create:**
- `src/game/Cards.js` — Master card database (5 classes, 20 personalities, 20 equipment, 15 spells, 15 conditions, 10 rules).
- `src/draft/PackDraft.js` — MTG pack generation, pick logic, AI drafter personas.

**Requirements:**
- Card class with properties: `id`, `type`, `name`, `cost`, `class`, `abilities`.
- Pack generation respecting guaranteed coverage (2–3 characters, 2–3 equipment, 2 spells, 1 personality per pack).
- AI drafter personas: Warlord (fighters/weapons), Archmage (spells), Guildmaster (balanced).
- Pick priority scoring: need-weighted, synergy-aware, small chaos factor.

**Testing:**
- Verify every pack contains minimum coverage.
- Verify packs are balanced across 3 AI drafters.
- Unit tests for each AI persona's pick logic.

---

### 1.2 Party & Character Objects
**Files to create:**
- `src/agents/Adventurer.js` — Individual character with stats, class kit, equipment, personality.
- `src/agents/Party.js` — Party aggregation, equipment auto-assignment, group decision logic.

**Requirements:**
- Adventurer: `health`, `attack`, `defense`, `mind`, `class`, `personality`, `equipment[]`.
- Class kits: Fighter (taunt), Cleric (heal), Wizard (amplify spells), Rogue (trap interact), Alchemist (potions).
- Personality influence: each archetype (Brave, Cowardly, Protective, Know-It-All, Faithless) biases decision weights.
- Party methods: `getPartyHealth()`, `assignEquipment()`, `decideAction()` (personality-weighted).

**Testing:**
- Verify equipment assigns to best-fit class.
- Verify personality weights affect decision outcomes.
- Unit tests for each class kit's stat contribution.

---

### 1.3 Dungeon Generator
**Files to create:**
- `src/world/DungeonGen.js` — Seeded room graph, room type distribution, boss placement.

**Requirements:**
- Layered generation: 10–14 rooms, 3–5 layers, 1–2 branching paths per layer.
- Room type distribution: Combat (50%), Trap (20%), Treasure (15%), Rest (10%), Special (5%).
- Guarantee: ≥1 lab if alchemist drafted, ≥1 library, ≥1 shrine, boss at end.
- Seeded random for reproducibility.
- Validation: graph is traversable entrance→boss.

**Testing:**
- Test all dungeons are traversable.
- Test room type distribution matches spec.
- Test coverage guarantees (lab, library, shrine, boss).
- Validate on 100 seeded generations.

---

## Phase 2: Encounter & Combat Logic

### 2.1 Room Encounters & Decision Points
**Files to create:**
- `src/encounters/RoomEncounters.js` — Per-room-type encounter generator and outcome logic.

**Requirements:**
- Monster: fight/flee/sneak/turn undead/parley.
- Trap: disarm/push through/study.
- Treasure: loot/inspect/leave cursed.
- Library: learn spell (scholars learn 2).
- Shrine: heal (devout heal more).
- Lab: brew potion/mod weapon (alchemist only).
- Materials: gather ingredients.
- Disaster: cave-in/flood/wild magic (party checks, gradient outcomes).

**Testing:**
- Unit tests for each encounter type's decision generation.
- Integration test: personality + class determines decision correctly.

---

### 2.2 Combat & Damage Resolution
**Files to create:**
- `src/sim/Combat.js` — Combat round logic, damage type system, ability resolution.

**Requirements:**
- Combat round: both sides act, damage applied, outcomes checked.
- Damage types: physical, fire (🔥), ice (❄️), lightning (⚡), holy, poison.
- Abilities: fighter attacks, wizard casts, cleric heals, rogue backstabs.
- Status effects: stun, bleed, buff, debuff.
- Combat ends when party or enemies are defeated.

**Testing:**
- Unit tests for damage calculation per type.
- Integration test: full combat round with multiple combatants.
- Test critical hit and miss scenarios.

---

## Phase 3: Narration & Story Panel

### 3.1 Narrator Engine
**Files to create:**
- `src/narrative/Narrator.js` — Three-beat narration generator (predicament → deliberation → resolution).

**Requirements:**
- Input: encounter type, party composition, personalities, outcome.
- Predicament: describe the room and initial challenge.
- Deliberation: show which party members argue for which action (based on personality + class).
- Resolution: describe the outcome in prose (victory/loss/partial).
- Output: text suitable for story panel display.

**Testing:**
- Coverage tests: every room type × outcome has narration.
- Personality + class combinations generate distinct deliberation text.
- No narrator crashes on edge cases (party wipe, cursed items, fools).

---

### 3.2 Bark System
**Files to create:**
- `src/narrative/Barks.js` — Character dialogue snippets per personality and class.

**Requirements:**
- Barks triggered on: start combat, use skill, low health, critical hit, betrayal.
- 5 barks per personality × 4 classes = 20 bark sets.
- Dynamic substitution: "{Character} says '{bark}'" in narrator text.

**Testing:**
- Verify bark selection logic (personality + class → correct bark set).
- Verify no bark crashes on undefined character state.

---

## Phase 4: Dungeon Simulation Loop

### 4.1 Simulator
**Files to create:**
- `src/sim/Simulator.js` — Room-by-room auto-crawl, decision application, state tracking.

**Requirements:**
- Main loop: for each room → generate encounter → apply party decision → resolve outcome → advance.
- State tracking: current room, party health/status, loot, spells learned.
- Victory condition: reach boss room, defeat boss.
- Defeat condition: all party members dead.
- Partial outcomes: loot but wounded, avoid but lose time.

**Testing:**
- Integration test: full run from entrance to boss.
- Test win/loss scenarios.
- Test all encounter types generate and resolve.

---

### 4.2 Progression & Scoring
**Files to create:**
- `src/game/Progression.js` — Difficulty tiers, score calculation, run history.

**Requirements:**
- Score formula: treasure + rooms cleared + spells learned + boss bonus, scaled by difficulty.
- Difficulty tiers: Beginner, Intermediate, Advanced, Elite.
- Run history: persist via localStorage or IndexedDB.
- Leaderboard: top runs by score.

**Testing:**
- Unit test score calculation for various party compositions.
- Verify run history persistence.

---

## Phase 5: UI & Rendering

### 5.1 Draft UI
**Files to create:**
- `src/ui/DraftUI.js` — Pack display, pick buttons, AI drafter display.

**Requirements:**
- Three-card pack layout.
- Pick button for each card.
- Display of AI drafter picks and signal reading.
- Navigation through 3 packs.

**Testing:**
- Visual regression: screenshot before/after picks.
- Button interaction tests.

---

### 5.2 Story Panel & Dashboard
**Files to create:**
- `src/ui/StoryPanel.js` — Narrator output display, barks, action log.

**Requirements:**
- Main story area: three-beat narration.
- Action log: scrollable list of all encounters.
- Party status bar: health, buffs, debuffs.
- Color-coded damage numbers floating on-screen.

**Testing:**
- Visual regression: story panel layout with various text lengths.

---

### 5.3 Isometric Renderer (adapted from SnakeAB)
**Files to create:**
- `src/ui/IsoRenderer.js` — Three.js isometric view, party movement, room transitions.

**Requirements:**
- Isometric camera and lighting.
- Party meeple rendering (small character sprites).
- Room tiles: stone floors, walls, torches.
- Animated transitions between rooms.

**Testing:**
- Verify camera and perspective render correctly.
- Test animation smoothness across room transitions.

---

## Phase 6: Integration & Polish

### 6.1 Full Game Loop
**Files to create:**
- `src/Game.js` — Main orchestrator (draft → party → dungeon → narrator → UI).

**Requirements:**
- State machine: DraftPhase → PartyPhase → DungeonPhase → ResultsPhase.
- Persist drafts and run results.
- Handle transitions between phases.

**Testing:**
- End-to-end test: complete draft, run dungeon, view results.

---

### 6.2 Configuration & Difficulty
**Files to create:**
- `src/game/Config.js` — Game constants (pack size, party size, room count, etc.).

**Requirements:**
- Difficulty modifiers: scale enemy stats, reduce rest stops, increase trap damage.
- Customizable card pool (subset for testing).

**Testing:**
- Unit test difficulty scaling produces expected enemy stats.

---

## Phase 7: Testing Strategy

### Test Structure
```
tests/
  unit/
    game/Cards.test.js
    game/Progression.test.js
    draft/PackDraft.test.js
    agents/Adventurer.test.js
    agents/Party.test.js
    world/DungeonGen.test.js
    encounters/RoomEncounters.test.js
    sim/Combat.test.js
    narrative/Narrator.test.js
    narrative/Barks.test.js
    sim/Simulator.test.js
  integration/
    FullGameLoop.test.js
    DraftToDungeon.test.js
    NarrationCoverage.test.js
```

### Test First Principles
- Every mechanic ships with tests before feature implementation.
- Narration coverage tests: every room type × outcome has generated text (no crashes).
- Simulator integration: 10 full runs per dungeon type, no softlocks.
- Party AI: personality × class combinations produce distinct behaviors (no crashes, correct decision weighting).

---

## Phase 8: Town System (Post-MVP)

**Files to create:**
- `src/town/Town.js` — Rest, heal, upgrade equipment, buy consumables, unlock perks.

**Requirements:**
- Healing cost: scaled by damage taken.
- Equipment upgrades: gold cost reduction per tier.
- Consumables: potions, scrolls, dungeon-specific tools.
- Permanent perks: alchemist (stronger potions), blacksmith (cheaper upgrades).

**Testing:**
- Unit test upgrade costs scale correctly.
- Integration test: complete run → town → next run → equipment persists.

---

## Implementation Order (Dependency Graph)

1. **Foundation (Week 1)**
   - Cards.js → PackDraft.js
   - Adventurer.js → Party.js
   - DungeonGen.js (with validation)

2. **Encounters (Week 2)**
   - RoomEncounters.js
   - Combat.js

3. **Narration (Week 3)**
   - Narrator.js
   - Barks.js

4. **Simulation (Week 3-4)**
   - Simulator.js
   - Progression.js

5. **UI & Rendering (Week 4-5)**
   - DraftUI.js
   - StoryPanel.js
   - IsoRenderer.js (optional for MVP; text-only acceptable)

6. **Integration (Week 5-6)**
   - Game.js (main orchestrator)
   - Full test suite

---

## Success Criteria

- ✅ Every pack contains ≥2 characters (no dead drafts).
- ✅ Every dungeon is traversable (entrance→boss).
- ✅ Personality + class combinations produce distinct AI behaviors (4 barks per combo, correct decisions).
- ✅ Narrator generates text for every room type × outcome (no crashes, >80% unique).
- ✅ Full dungeon run completes without softlock.
- ✅ Score calculation matches spec (treasure + rooms + spells + boss bonus).
- ✅ 100+ unit & integration tests, all passing.

---

## Known Unknowns / Risk Areas

1. **Narrator quality:** Generating 100+ unique, coherent passages may require prompt engineering or a finalized narrative template library.
2. **AI decision quality:** Personality weighting may need tuning post-playtest.
3. **Procgen dungeon variety:** Room type distribution + multiple dungeon types may require parameter tweaking to avoid repetition.
4. **Performance:** Three.js isometric rendering on web may need optimization.

---

## Future Expansions (Post-MVP)

- Multiplayer drafting (v2 multiplayer logic).
- Dungeon condition modifiers (players draft hazards into each other's runs).
- Additional dungeon types (Witcher/Dragon Age inspirations).
- Boss-specific mechanics (multi-phase, unique abilities).
- Equipment modding system (Alchemist crafting).
- Leaderboard integration.
