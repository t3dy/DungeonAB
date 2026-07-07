# ⚔️ DungeonAB — Dungeon-Crawling Autobattler

**▶️ Play v4.0: https://dungeon-ab.vercel.app** &nbsp;·&nbsp; [v3.0](https://dungeon-ab.vercel.app/v3/) &nbsp;·&nbsp; [v2.0](https://dungeon-ab.vercel.app/v2/) &nbsp;·&nbsp; [v1.0](https://dungeon-ab.vercel.app/v1/) &nbsp;·&nbsp; [mirror](https://t3dy.github.io/DungeonAB/)

## Versions

| Version | Play | What it is |
|---|---|---|
| **v4.0** (current) | [dungeon-ab.vercel.app](https://dungeon-ab.vercel.app) | The roguelike release: multi-floor dungeons with stairwells, lock-and-key vaults, unlabeled phials (item identification), in-dungeon peddlers and altars, elite veterans, blow-by-blow combat theater (attributed hits, backstab crits, monster signature moves, morale routs), dug cave layouts, tiled dungeon fabric with torches, and a simulation-audited card balance pass |
| **v3.0** | [dungeon-ab.vercel.app/v3/](https://dungeon-ab.vercel.app/v3/) | The integration release: theme-tinted worlds, readable enemies (nature badges + prose tells), nature-aware party planning, element chips on draft cards, element-colored spell FX, affliction badges, the deeper-systems guide |
| **v2.0** | [dungeon-ab.vercel.app/v2/](https://dungeon-ab.vercel.app/v2/) | The systems release: branching dungeons with secret vaults, eight themes, the Bestiary, trap types, treasure finds, preparation effects, the Archive & editor, the Card Workshop, the Alchemy Pack |
| **v1.0** | [dungeon-ab.vercel.app/v1/](https://dungeon-ab.vercel.app/v1/) | The first public release: the original draft → delve → town campaign loop with onscreen help |

Git tags `v1.0` through `v4.0` mark the exact sources.

Draft a party MTG-style — packs passed around a table of AI rivals, one pick per pack — then watch your Fighters, Clerics, Wizards, Rogues, and Alchemists auto-crawl a procedurally generated dungeon: fighting, looting, learning spells, and brewing potions at abandoned lab benches. Survive, spend your gold in town, and delve deeper.

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
Every room is narrated in three beats: the predicament, the party's deliberation (who argued for what, in character — *"Vex Threefingers made the case: 'I know a spell for this. It's called leaving.'"*), and the resolution. Wipes get epitaphs; victories get codas.

### 4. The Campaign
Survive a dungeon and the party carries its scars, loot, grimoire, and gold onward. **Town** between delves: heal for coin (temples discount the Devout), stock healing draughts, then choose — descend to a deeper, meaner dungeon, or retire and bank the score. Each of the five **themed dungeons** (the Old Delve, the Ancient Crypt, the Cinder Galleries, the Drowned Athenaeum, the Mad Alchemist's Dungeon) brings its own monster roster, hazards, and arrival.

---

## Run It

```bash
npm install
npm run dev    # http://localhost:5175
npm test       # 87 tests across 8 suites
npm run build  # production bundle → dist/
```

The prototype is hosted on **Vercel** ([dungeon-ab.vercel.app](https://dungeon-ab.vercel.app)).
Every push to `main` also runs the tests and publishes a mirror to GitHub Pages
(see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

## Art Credits

Sprites from [**Tiny Dungeon** by Kenney](https://kenney.nl/assets/tiny-dungeon) (Creative Commons Zero).
Party classes, monsters, chests, traps, and props all come from this one lovely 16px sheet
(license bundled at `src/assets/tiny-dungeon-LICENSE.txt`). Support Kenney at [kenney.nl](https://kenney.nl).

The Alchemy Pack's emblem monsters wear **actual engravings from Michael Maier's
*Atalanta Fugiens* (1617)** — public-domain plates, extracted and processed in the
EmblemRoguelike project (`src/assets/emblems/`). The Green Lion is really the Green Lion.

## Design Lineage

Consolidated in `DESIGN.md` from:
- Megabase chats: *Dungeon crawling auto battler* (2025-12-14), *RPG Auto-Battler Concept* (2025-01-10)
- Games catalog: *The Alchemist's Dungeon* (`dungeon-autobattler`)
- SnakeAB's proven architecture (personality decisions, narration engine, seeded procgen)

## Roadmap

- [x] Isometric Three.js dungeon renderer (SnakeAB's IsoRenderer, re-themed)
- [x] Progression: difficulty tiers, run history, best scores
- [x] Personality barks — same archetype, different voice per class
- [x] Class-keyed equipment — a wand is a fireball for a fighter, meteors for a wizard
- [x] Trap cards & personalities — cursed gear and The Craven, weak-looking with hidden upside
- [x] Themed dungeons — five faces, each with its own roster and hazards
- [x] Campaign mode — town between delves, party carryover, depth scaling
- [x] Dungeon conditions — wager a meaner delve (swarms, traps, dark pact…) for a bigger score
- [x] Town services — hire replacements from the board, sharpen weapons at the smith
- [x] Onscreen help — how-to-play overlay, event toasts, room/control legends
- [x] Hall of Records — best scores and past campaigns, persisted locally
- [x] Rival standings — the AI drafters delve their own parties; scores compared at the table
- [x] Hex exchange — lay a condition on a rival's run; one hexes yours back (Megabase multiplayer variant)
- [x] Procgen v2 — branching layouts, secret doors, hidden vaults (see `ROGUELIKE_ROADMAP.md`)
- [x] Dungeon Archive — every design kept, minimapped, re-enterable
- [x] Dungeon editor — retype rooms, toggle secrets, save and delve your own designs
- [x] Card Workshop — forge cards under stat budgets, import/export packs
- [x] DLC: 17th-Century Alchemy Pack — emblem monsters (the Green Lion, the Rebis), the Hermetic Athanor theme
- [x] Eight themed dungeons — incl. the Vampire Lord's Castle, the Bog Witch's Root Cellar, the Mad Pyromancer's Ice Caverns (`THEME_DESIGNS.md`)
- [x] Preparation effects — your drafted kit unlocks options and shifts outcomes, credited by name in the chronicle (the FTL lesson)
- [x] Deploy the prototype (Vercel, with a GitHub Pages mirror)
- [ ] True multiplayer draft
