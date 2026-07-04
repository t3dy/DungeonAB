# ⚔️ DungeonAB — Dungeon-Crawling Autobattler

Draft a party MTG-style — packs passed around a table of AI rivals, one pick per pack — then watch your Fighters, Clerics, Wizards, Rogues, and Alchemists auto-crawl a procedurally generated dungeon: fighting, looting, learning spells, and brewing potions at abandoned lab benches.

**Sibling project**: [SnakeAB](https://github.com/t3dy/SnakeAB) — same engine philosophy (personality-driven AI, three-beat narration, gradient outcomes), new genre.

---

## How It Plays

### 1. The Draft
- You sit at a table with **3 AI drafters** (The Warlord, The Archmage, The Guildmaster — each with real pick heuristics).
- 3 packs of 8 cards each; pick one, pass the pack. Directions alternate per round.
- Every pick is one of four card types:
  - **Character** — a named adventurer (5 classes). Party size = however many you draft.
  - **Equipment** — auto-assigns to the best-fit member.
  - **Spell** — shared grimoire; scrolls burn unless a wizard makes them repeatable.
  - **Personality** — archetypes that bias the whole party's decisions.
- Packs guarantee coverage (3 characters each) — no dead drafts. Draft zero characters anyway? You get **Pip the Tavern Volunteer**.

### 2. The Delve
The party descends room by room, deciding for itself (personality-weighted, class-gated):
- **Monsters** — fight, flee, sneak (rogue), turn undead (cleric), bribe, open with magic
- **Traps** — rogue disarms; brave parties push through
- **Treasure** — loot (mimic risk), inspect first, or walk away
- **Libraries** — learn spells; wizards risk the sealed texts
- **Shrines** — heal; the covetous pry off the gold leaf (the dungeon remembers)
- **Labs** — an alchemist + gathered materials = potions or weapon mods
- **Disasters** — brace or scatter
- **The Boss** — everything you drafted, tested at once

### 3. The Chronicle
Every room is narrated in three beats: the predicament, the party's deliberation (who argued for what — "Vex Threefingers made the case"), and the resolution. Wipes get epitaphs; victories get codas.

---

## Run It

```bash
npm install
npm run dev    # http://localhost:5175
npm test       # 30+ engine tests
```

## Design Lineage

Consolidated in `DESIGN.md` from:
- Megabase chats: *Dungeon crawling auto battler* (2025-12-14), *RPG Auto-Battler Concept* (2025-01-10)
- Games catalog: *The Alchemist's Dungeon* (`dungeon-autobattler`)
- SnakeAB's proven architecture (personality decisions, narration engine, seeded procgen)

## Roadmap

- [ ] Isometric Three.js dungeon renderer (SnakeAB's IsoRenderer, re-themed)
- [ ] Progression: difficulty unlocks, run history, leaderboards
- [ ] Dungeon condition modifiers drafted against rivals (Megabase multiplayer variant)
- [ ] True multiplayer draft
- [ ] Deploy to Vercel
