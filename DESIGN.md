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
2. **Party = Which Four You Drafted** *(revised 2026-07-15)* — A party is **four adventurers**, so the question is never *how many* bodies but *which four*, and what kit the other twenty picks win. Four fighters and a pile of steel? A wall. A cleric, a rogue, a wizard and a mule of scrolls? A toolkit. Both are viable, both tell different stories.
   *This pillar previously promised unlimited party size ("five characters and no gear… two buried in spells… both viable"). Measurement killed it: a body outvalued any item at every difficulty, so "draft every character" dominated and the draft solved itself (AUDIT.md D1 — five bare bodies won 100% of medium runs; the fully-kitted elite duo won 55%). The cap restores the tension the pillar was reaching for, by making composition and kit the axes instead of headcount.*
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
- **Character** — a named adventurer of one of 5 classes: **Fighter, Cleric, Wizard, Rogue, Alchemist**. **A party is four** (`Party.PARTY_CAP`): the first four in draft order march, and any beyond that wait in town as the **reserve**, free to call up when someone dies. The cap replaced "draft every body," which measured as the dominant line (AUDIT.md D1: five bare bodies won 100% of medium runs) and solved the draft.
- **Equipment** — auto-assigned to the best-fit member (fighters get shields, rogues get lockpicks); class-agnostic pieces exist.
- **Spell** — party-wide magic. Wizards amplify spell power; anyone can carry a scroll.
- **Personality** — archetypes that bias the whole party's decisions (The Bold, The Cunning, The Covetous, The Scholarly, The Devout, The Reckless).

### Pack Construction (guaranteed coverage)
Every pack contains: **2 characters, 3 equipment, 2 spells, 1 personality**. Two characters is the coverage floor — enough that no draft is dead, few enough that a four-strong party isn't force-fed adventurers it can never field (at 3/pack the mining harness measured ~5 wasted picks per draft). With the cap, 20 of a drafter's 24 picks are kit, which is where the format's decisions now live.

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

### Structure (procgen v3 — rooms with footprints)
Rooms are **rectangles in tile space, not graph dots**. Each carries `w × h` and a `shape`:

| Shape | Reads as | Typical use |
|---|---|---|
| `chamber` | squarish room | the standard fighting room |
| `hall` | long rectangle | processionals, libraries |
| `cavern` | big and ragged (broken corners) | disasters, materials, boss lairs |
| `passage` | narrow connector | corridors, trap runs |
| `cell` | closet | vaults, treasure, oubliettes |
| `rotunda` | round | shrines, wells |

`ROOM_GEOMETRY` maps each room *function* to the shapes and sizes it may take, so structure follows purpose: a boss gets a 10×8-to-14×11 cavern (always the largest room in the dungeon), a vault is 4×4. Fighting rooms are floored at `COMBAT_FLOOR` (5×4) — genuine floor space for four adventurers plus a monster, which the renderer draws literally.

Placement walks the spine outward, one axis at a time, rejecting any position whose footprint (plus a corridor gap) overlaps a placed room, and steering to keep the map roughly square rather than a 130-tile straight line. Tests enforce: no overlaps, every fighting room ≥ the combat floor, the boss is the biggest room, and the layout's aspect ratio stays under 4:1.

**Connections** carry a `kind`: `door`, `arch`, `secret`, `trapdoor`. Doorways are derived from edge directions and drawn as real gaps in the perimeter walls.

**Trapdoors** are the vertical shortcut: a shaft that skips 2–4 rooms of the spine (never the boss) for a fall. Found ones are a choice — the Craven take them, the Covetous refuse to skip loot, a battered party takes any road to the end; roping down halves the drop. Unfound ones are an accident that costs the full fall. Either way the skipped rooms' loot *and* danger are both forgone.

### Room Features (what's *in* a chamber)
A room is no longer one type and one decision. Every room big enough to
hold furniture (≥18 tiles; a vault-sized cell holds none) is furnished
from `world/RoomFeatures.js` — up to three of: **pillars, rubble,
crates, brazier, pit, boulder, sarcophagus, font, spout, portcullis,
anvil, shelves, mirror**. Each is drawn with art already on the Kenney
sheet, so the catalog was designed around tiles that exist rather than
tiles we'd need.

Features do three jobs:

1. **Passive modifiers.** Pillars, rubble and crates give **cover**
   (−1 incoming damage each, capped at 2 — furniture is not a
   fortress). A **mirror** negates the ethereal ×0.6 penalty exactly as
   a cleric does. A **font** douses fire; a **sarcophagus** is a risk
   carried into the fight.
2. **Interactions.** Thirteen extra options, each gated by a class *or*
   a drafted card. In a fight the furniture is a weapon (shove the
   monster into the pit, drop the portcullis on it, topple the boulder)
   and the opener damages the monster before the first blow, exactly as
   `spell-strike` does. Outside a fight it's a resource (pry the
   sarcophagus, harvest the spout, work the anvil, strip the shelves).
3. **Writing.** Every feature states its own `tell` in the predicament,
   so the player can see why an option exists, and every interaction
   reports what it did with the number.

**Tools upgrade; they don't merely unlock.** A fighter can shove
something into a pit barehanded for 5; a party holding the Grapple and
Line does it for 12. This rule exists because the first cut gated on
presence alone and a controlled A/B measured the new tools as
*redundant* — a four-class party already opened eleven of thirteen
interactions, so the cards were worth only their stat lines. A few
interactions are **tool-only**: an anvil without hammer, file and flux
is a heavy table.

#### Feature cards (2026-07-15)
Seven tools, three workings and two personalities exist to exploit the
architecture. Measured against an equal-bonus plain card over 500
seeded delves on hard, six of seven tools are worth **+1.8 to +3.8 win
points** (the Ironwood Prybar also +44 score). The **Silvered
Hand-Mirror** is the format's first true hate card: roughly neutral in
general and **+38 win points in the Castle of the Vampire Lord**, where
an ethereal household meets a party with no cleric.

| Card | Feature hook |
|---|---|
| Ironwood Prybar | sarcophagi, crates, rubble — opens them cleanly and quietly |
| Grapple and Line | pits (shove without following), and shafts |
| Alchemist's Tinderbox | braziers, and anything flammable |
| Winch Hook | portcullis chains — drops the whole gate at once |
| Field Smith's Kit | the anvil (tool-only): a permanent +3 attack edge |
| Great Waterskin | fonts and spouts; flushes lingering venom |
| Silvered Hand-Mirror | carries the mirror's ethereal-reveal with the party |
| Shatter | boulders and pillars — drops the slope, not one stone |
| Kindle | lights a brazier at range |
| Purify the Font | a font, said over, for double the healing |
| The Tinkerer / The Vandal | reuse `cunning` / `reckless`; reach for the furniture |

The three new *spells* measure at −19 to −21 IWD, in the same band as
every other spell in the pool (Knock −24, Dancing Light −22, Firebolt
−20). They are not uniquely bad — they inherit the format's standing
spell problem, which remains the top balance target
(`DESIGN_DIALOGUE.md` §6-7).

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
