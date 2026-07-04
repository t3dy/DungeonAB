# DungeonAB: Megabase Conversation Summary

**Date:** 2026-07-03  
**Source:** Synthesis of Megabase chats:
- `2025-12-14_Dungeon crawling auto battler`
- `2025-01-10_RPG Auto-Battler Concept`
- `2025-01-10_Procedural Dungeon Design Tips`

---

## Core Vision

A **narrative dungeon-crawling autobattler** where the draft IS the game. Players use MTG-style pack drafting to assemble a party (characters + equipment + spells + personalities), then watch that party's drafted traits and personalities determine how they think, fight, and survive a procedurally generated dungeon. The appeal is **emergent party storytelling**: the party you drafted determines not just mechanics but *voice*.

---

## Major Goals

### 1. **The Draft Is the Game**
- Every meaningful player decision happens at the table.
- 3 rounds of packs, 8 cards per pack, pick 1 per pack → 24 picks per player.
- AI drafters with distinct personas (Warlord, Archmage, Guildmaster) create signal-reading tension.
- Player sees what neighbors picked trickle into later packs, mimicking real MTG.

### 2. **Guaranteed Coverage & No Dead Packs**
- Every pack contains 2–3 characters, 2–3 equipment, 2 spells, 1 personality.
- Ensures legal party construction (minimum 1 character guaranteed).
- Key lesson from Boss Monster feedback: avoid "no good play" turns.

### 3. **Personality-Driven AI**
- 5 personality archetypes that express differently per class:
  - **Brave** → Fighter charges, Wizard casts risky spells, Priest smites.
  - **Cowardly** → Fighter hides, Wizard debuffs safely, Priest heals from distance.
  - **Protective** → Fighter intercepts, Wizard shields, Priest heals allies.
  - **Know-It-All** → All classes lecture the party, delay optimally.
  - **Faithless** → All classes self-preserve, betray, steal resources.
- Same mechanic; distinct expression per class (from RPG Auto-Battler Concept).
- Personalities trigger barks and flavor reactions in dungeon events.

### 4. **Variable Party Size**
- No fixed party size. Five characters + gear = mob. Two characters buried in spells = elite.
- Both are viable; both tell different stories.

### 5. **Class-Specific Item Interactions**
- A wand gives a Fighter fireball, a Wizard meteor strikes.
- A holy symbol grants protection to Fighters/Rogues, lets Clerics smite undead, lets Wizard animate corpses.
- Fighters struggle with wands; Rogues excel with them in stealth.
- Encourages experimentation and synergy discovery.

### 6. **Dungeon Events Are Simulated, Narrated**
- Room-by-room auto-crawl with personality-weighted party decisions.
- Behind-the-scenes simulation surfaced via:
  - Dynamic flavor-rich messages ("The Fool falls into a trap that disarms itself").
  - Color-coded damage numbers (🔥 fire, ❄️ ice, ⚡ lightning, 🛡️ healing).
  - Character reactions and brief animations.
  - Three-beat narration: predicament → party deliberation → resolution.

### 7. **Gradient Outcomes Over Binary**
- Encounters resolve on a spectrum, not instant win/lose.
- Partial success (loot but take wounds, clear floor but lose time).
- Pressure meters instead of cliffs (alarm, darkness, morale).

### 8. **Procgen Validates**
- Dungeon graph must be traversable (entrance → boss).
- Procedural generation must be seeded and controllable.
- Room layout follows layered generation (10–14 rooms per dungeon).

### 9. **Multiple Dungeon Types**
- Each has unique challenges, themes, and rewards:
  - **Ancient Crypt** (dark, undead-heavy).
  - **Volcanic Cavern** (fire hazards, lava flows).
  - **Enchanted Forest** (tricksy terrain, mischievous foes).
  - **Sunken Ruins** (aquatic, drowning risk).
  - **Haunted Library** (cursed tomes, spectral enemies).
  - **Mechanized Fortress** (gears, clockwork traps).
  - **Abyssal Chasm** (reality-warping, demonic foes).
  - **Crumbling Watchtower, Blighted Hollow, Moonlit Ruins** (Witcher/Dragon Age inspirations).
  - **Mad Alchemist's Lab** (chaotic experiments, mutant creatures, random effects).

### 10. **Trap Cards & Hidden Advantages**
- Cursed items and cowardly/fool personalities appear weak but offer:
  - Cursed Sword Backfires: low damage BUT crits under conditions.
  - Haunted Armor: slows movement BUT ghost attacks enemies.
  - The Fool: makes ridiculous decisions BUT accidentally triggers lucky events.
  - The Coward: flees combat BUT detects traps early.

### 11. **Progression & Scoring**
- Score: treasure + rooms cleared + spells learned + boss bonus, scaled by difficulty.
- Difficulty tiers with unlocks (SnakeAB progression reused).
- Run history and leaderboards (localStorage).
- **Town System:** After each run, rest/heal, upgrade equipment, buy consumables, unlock permanent perks.

### 12. **Five Classes with Distinct Kits**
- **Fighter** → front rank, taunts, soaks hits.
- **Cleric** → heals, turns undead, steadies morale.
- **Wizard** → amplifies spells, fragile, reads cursed texts.
- **Rogue** → disarms traps, picks locks, scouts, finds hidden treasure.
- **Alchemist** → at lab rooms, brews potions, applies weapon mods from gathered materials.

### 13. **Guaranteed Room Types & Lab Coverage**
- Entrance, corridor, monster, trap, treasure, library, shrine, lab, materials, disaster, boss.
- ≥1 lab if any drafter took an alchemist (soft guarantee).
- ≥1 library, ≥1 shrine; boss always terminal.

### 14. **Card Pool Design (100 Assets)**
- 20 Hero Classes (Fighter, Knight, Barbarian, Paladin, Rogue, Thief, Ranger, Hunter, Wizard, Sorcerer, Cleric, Priest, Druid, Shaman, Necromancer, Warlock, Monk, Bard, Alchemist, Engineer).
- 20 Personality Traits (Bold, Cautious, Greedy, Cowardly, Berserk, Protective, Reckless, Methodical, Opportunistic, Curious, Faithful, Paranoid, Stoic, Vengeful, Loyal, Mercenary, Fanatical, Lazy, Tactician, Superstitious).
- 20 Equipment (shields, swords, staves, cloaks, boots, amulets, kits, etc.).
- 15 Spells (Fireball, Heal, Teleport, Fear, Silence, Curse, Entangle, Revive, etc.).
- 15 Dungeon Condition Modifiers (Low Light, Poison Air, Flooded Floors, Cursed Altars, Monster Swarms, Elite Guards, Treasure Vaults, Boss-Centric, Living Dungeon, etc.).
- 10 Meta/Draft Rule Twists (Snake Draft, Hidden Picks, Banned Trait, Shared Pool, Forced Synergy, Risk Picks, Secret Objective, Wildcard Slot, etc.).

### 15. **Boss Monster Lessons Applied**
- **Rules overhead > payoff is fatal** → Keep timing windows few, edge cases rare, cool things happen often.
- **No good play turns** → Every pick is playable via fallback utility, tagged synergies, baseline coverage.
- **Card flow is oxygen** → Frequent micro-drafts, generous redraw, "discover 3 pick 1" offerings.
- **Clarify timing** → Explicit triggers (Start of Turn, Before Move, On Enter Tile, On Trap Trigger, On Death, End of Round).
- **Reduce swinginess** → Gradient outcomes, pressure meters, multiple scoring vectors.
- **Take-that needs counterplay** → Telegraphed hate-cards, defenses, limited disruption frequency.
- **Build-in catch-up** → Disadvantaged player drafts first or gets extra reroll.
- **Keep dungeon alive late-game** → Rotating rooms, evolving traps, branching paths, boss phase.

---

## Design Pillars

1. **The Draft Is the Game** — Every meaningful player decision happens at the table.
2. **Party = Whatever You Drafted** — No fixed party size. Both 5 unarmed heroes and 2 spell-buried heroes are viable.
3. **Personality-Driven Party AI** — Archetypes bias group decisions, expressed per class.
4. **Boss Monster Lessons** — Guaranteed coverage, gradient outcomes, catch-up drama built in.

---

## Multiplayer Trajectory

- **v1:** Player + 3 AI drafters, solo dungeon runs, score comparison at table.
- **v2:** Players draft dungeon modifiers into each other's runs; shared leaderboard.
- **v3:** True multiplayer draft via WebRTC/server.

---

## Tech Stack (from SnakeAB)

- Vanilla JS + Vite + Three.js isometric renderer.
- Node test runner.
- Vercel deploy.
- IsoRenderer adapted from SnakeAB: stone floors, torchlit walls, party of meeples.

---

## Key Deliverables for MVP

1. **Draft UI** — 3-card pick interface, AI drafter display, pack passing animation.
2. **Party Object** — Stats aggregation, equipment assignment, personality expression.
3. **Dungeon Generator** — Seeded room graph, guaranteed traversability, room type distribution.
4. **Autobattler Simulator** — Room-by-room loop, personality-weighted decisions, combat resolution.
5. **Narrator** — Three-beat text generation for each encounter.
6. **Isometric Renderer** — Party movement, room transitions, visual feedback.
7. **Test Suite** — Full coverage for draft, party AI, dungeon generation, narrator output.

---

## Standing Rules (from SnakeAB Practice)

1. **Design-first:** Spec lives in DESIGN.md; Megabase chats are upstream.
2. **Test-first:** Every mechanic ships with tests; narration has coverage tests.
3. **Guaranteed coverage:** Packs always contain ≥2 characters (no dead drafts).
4. **Gradient outcomes:** Encounters resolve on a spectrum, not binary.
5. **Procgen validates:** Dungeon graph must be traversable entrance→boss before acceptance.
6. **Story panel is product:** Writing quality matters as much as mechanics.
