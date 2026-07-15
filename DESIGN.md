# DungeonAB — Design Document

**Canonical design source** for the dungeon-crawling autobattler. Consolidated from:
- Megabase: `chats_2025/2025-12-14_Dungeon crawling auto battler.md` (draft parties, personality AI, dungeon modifiers, multiplayer draft)
- Megabase: `chats_2025/2025-01-10_RPG Auto-Battler Concept.md` (personality archetypes × class scaling)
- Megabase: `chats_2025/2025-01-10_Procedural Dungeon Design Tips.md` (layered generation, controlled randomness)
- `C:\Dev\games\ideas.json` → `dungeon-autobattler` ("The Alchemist's Dungeon": room types, alchemist figures, lab interventions)
- SnakeAB (`C:\Dev\SNAKEAB`) — proven architecture: personality-weighted decisions, three-beat narration, equipment gating, seeded procgen, progression
- User goal statement (2026-07-03): MTG pack draft, five classes, variable party size, alchemy labs

---

## What This Game Is

A **narrative dungeon-crawling autobattler**. The player drafts a party MTG-style — packs passed around a table of AI (or human) opponents, one pick per pack — then watches the party descend a procedurally generated dungeon, fighting, looting, learning spells, and making personality-driven decisions on its own. The appeal is **emergent party storytelling**: the party you drafted determines not just stats but *how the group thinks*.

### Design Pillars

1. **The Draft Is the Game** — Every meaningful player decision happens at the table. Pack picks are agonizing: take the second fighter, or the fireball the wizard across the table clearly wants?
2. **Party = Whatever You Drafted** — No fixed party size. Five characters and no gear? A mob of unarmed heroes. Two characters buried in spells and equipment? A small elite. Both are viable, both tell different stories.
3. **Personality-Driven Party AI** — Personality archetypes bias group decisions (from RPG Auto-Battler Concept: the same archetype expresses differently per class — a Reckless fighter charges, a Reckless wizard overchannels).
4. **Boss Monster Lessons** (from Megabase feedback analysis): guaranteed coverage in packs (never a "no good pick" pack), gradient outcomes over binary ones, catch-up drama built into the dungeon.

---

## The Draft (MTG-style)

### Table Setup
- 4 seats: the player + 3 AI drafters (future: humans in multiplayer).
- 3 rounds of packs; each pack starts with 8 cards.
- Pick 1 card, pass the pack (left, then right, then left — alternating per round).
- Total: 24 picks per drafter → the player's pool is their party + kit.

### Card Types (one pick = one card of any type)
- **Character** — a named adventurer of one of 5 classes: **Fighter, Cleric, Wizard, Rogue, Alchemist**. Party size = number of characters drafted (minimum 1 enforced by pack coverage).
- **Equipment** — auto-assigned to the best-fit member (fighters get shields, rogues get lockpicks); class-agnostic pieces exist.
- **Spell** — party-wide magic. Wizards amplify spell power; anyone can carry a scroll.
- **Personality** — archetypes that bias the whole party's decisions (The Bold, The Cunning, The Covetous, The Scholarly, The Devout, The Reckless).

### Pack Construction (guaranteed coverage)
Every pack contains: 2–3 characters, 2–3 equipment, 2 spells, 1 personality. This guarantees a drafter can always build a legal party (Boss Monster lesson: no dead packs).

### AI Drafters
Each AI seat has a **draft persona** (e.g. "Warlord" prioritizes fighters+weapons, "Archmage" hoards spells, "Guildmaster" balances). AI picks by need-weighted scoring: class gaps, kit synergies, personality fit — with a small chaos factor so drafts differ. The player sees what neighbors picked trickle back in later packs (signal reading, like real MTG).

---

## The Party

- Characters have `health / attack / defense / mind` plus a class kit:
  - **Fighter** — front rank; soaks hits for the back rank; taunts.
  - **Cleric** — heals between rooms; turns undead; steadies morale.
  - **Wizard** — amplifies drafted spells; fragile; reads cursed texts.
  - **Rogue** — disarms traps, picks locks, scouts ahead, finds hidden treasure.
  - **Alchemist** — at **lab rooms**, brews potions and applies **weapon mods** from materials gathered in the dungeon.
- Equipment assigns automatically to best-fit members (draft decides the pool, the party sorts itself).
- Spells are a shared grimoire; casting uses them per-run (scrolls) unless a wizard is present to make them repeatable.
- Personalities apply party-wide, expressed per class (Megabase RPG Auto-Battler Concept).

---

## The Dungeon

### Generation (layered, per Procedural Dungeon Design Tips)
1. Seeded room graph: 10–14 rooms, entrance → boss, 1–2 branches with optional loot rooms.
2. Room types (from The Alchemist's Dungeon + classic crawl): **entrance, corridor, monster, trap, treasure, library, shrine, lab, materials, disaster, boss**.
3. Guarantees: ≥1 lab if any drafter took an alchemist (soft), ≥1 library, ≥1 shrine; boss always terminal.

### Room Encounters (personality-weighted party decisions, SnakeAB engine adapted)
- **Monster** — fight / flee / sneak past (rogue) / turn undead (cleric) / parley (mind check). Every *defeated* monster leaves a signature drop (`game/Drops.js`, the Bestiary's companion table): a trinket, weapon coating, potion, materials, scroll, or coin, each with its own chronicle line. Kinds without an entry fall back by trait, then to a generic trophy — nothing drops nothing. Fleeing, sneaking, and bribing claim no corpse and no drop.
  - **The trophy case**: every claim is remembered on the party (`party.trophies`, with provenance) and persists across campaign depths. It surfaces in the HUD (count + hover inventory), the town ledger, the campaign's final page (a trophy-case section — victories show what came up, wipes show what the dark took back), the endings' writing (the finest trophy is named), and the onscreen event feed (a `trophy` tick event).
  - **Drops bend decisions**: the Covetous weight `fight` up and `sneak` down — every kill pays out now — and the greedy barks know it.
- **Trap** — rogue disarms; brave parties push through; scholarly parties study it.
- **Treasure** — loot (greedy lingers, risks mimics), inspect first (cunning), leave cursed gold (devout).
- **Library** — learn a random spell (scholarly learns 2); wizards read the dangerous books.
- **Shrine** — heal; devout parties heal more; desecration tempts the covetous.
- **Lab** — with an alchemist: brew a potion (heal/buff) or **mod a weapon** (+attack, fire/venom coating) using gathered materials. Without one: just glassware and regret.
- **Materials** — herbs, salts, quicksilver: alchemy ingredients.
- **Disaster** — cave-in, flood, wild magic: party-wide checks, gradient outcomes.
- **Boss** — the run's climax; all drafted synergies fire.

### Narration
SnakeAB's three-beat Narrator adapted to a party voice: predicament → the party's deliberation (who argued for what, by class and personality) → resolution. Story panel + narrated endings.

**House style (2026-07): descriptive, not literary.** The narration reports what happens — who acts, what it costs, with the numbers stated ("The party kills the goblin toll-gang in 2 rounds, taking 4 damage"). Mechanics facts appear in the text (multipliers, bonuses, damage): the story panel doubles as the combat log. Barks (spoken character dialogue) are the one place voice and flavor live; item card text may carry flavor, but it stays off the story panel.

---

## Progression & Scoring

- Score: treasure + rooms cleared + spells learned + boss bonus, scaled by difficulty.
- Difficulty tiers with unlocks (SnakeAB progression system reused).
- Run history and leaderboards (localStorage).

## Multiplayer Trajectory

- v1: player + 3 AI drafters, solo dungeon runs, compare scores at the table.
- v2 (Megabase multiplayer variant): players draft **dungeon condition modifiers** into each other's runs; shared leaderboard.
- v3: true multiplayer draft via WebRTC/server.

## Tech

Vanilla JS + Vite + Three.js isometric renderer (SnakeAB's IsoRenderer adapted: stone floors, torchlit walls, party of meeples). Node test runner. Vercel deploy.
