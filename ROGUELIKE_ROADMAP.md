# DungeonAB — Roguelike Roadmap

The plan for growing DungeonAB into a full dungeon-crawling roguelike:
rich procedural generation, an archive of re-enterable dungeons, player
editors, and themed content packs.

## Research Sources

From the game design library (`E:\pdf\Game Design`):

- **Shaker, Togelius & Nelson, *Procedural Content Generation in Games*
  (Springer)** — ch. 3 "Constructive generation methods for dungeons":
  - **Space partitioning (BSP)**: macro "architect" approach; guaranteed
    non-overlapping rooms; corridors connect siblings up the tree.
    Crucially, *partitions enable themed sections and lock-and-key
    design* — a subtree with a single entrance can be locked, its key
    placed elsewhere (their Fig. 3.5).
  - **Agent-based diggers**: micro approach, organic/chaotic results —
    right for cave themes (Cinder Galleries).
  - **Cellular automata**: cave-like erosion, few parameters but hard
    to control connectivity.
  - **Spelunky's critical path**: a room grid with a guaranteed
    entrance→exit path; off-path rooms hold optional riches and cost
    resources to reach. *This maps directly onto DungeonAB's
    room-sequence crawl and is the pattern v2 implements.*
  - ch. 11 "Mixed-initiative content creation" — the design frame for
    our dungeon editor (human edits + generator assists + validation).
- **Garzia, *Roguelike Development with JavaScript* (Apress)** —
  tilemaps/spritesheets (validates the Kenney pipeline), enemies &
  permadeath, treasure/equipment structure.
- **Bycer, *Game Design Deep Dive: Trading and Collectible Card Games*
  (CRC)** — card design and monetization chapters inform the card
  editor and DLC pack architecture.
- **Daniels, *RTOR: Roguelike Theory of Relativity*** — genre theory.

## Genre canon → DungeonAB mapping

| Roguelike staple | Source examples | DungeonAB status |
|---|---|---|
| Procedural dungeons | Rogue, NetHack | ✅ seeded, themed; **v2 adds branches/secrets** |
| Permadeath | all | ✅ campaign wipe ends the run |
| Secret doors | NetHack, Brogue | 🔨 **v2 (this phase)** — rogue/scholar detection |
| Vaults (rich hidden rooms) | NetHack, DCSS | 🔨 **v2 (this phase)** |
| Branches / optional areas | DCSS, Spelunky off-path | 🔨 **v2 (this phase)** |
| Meta-progression / archives | modern roguelites | 🔨 **Dungeon Archive (this phase)** |
| Shops / town | Spelunky, roguelites | ✅ town between delves + in-dungeon peddler stalls |
| Altars / offerings | NetHack, DCSS | ✅ gold and blood offerings, boons, desecrator refusal |
| Risk wagers | DCSS Zig, Pact-likes | ✅ conditions + hex exchange |
| Item identification | NetHack, DCSS | ✅ unlabeled phials, seeded appearance map, quaff-testing |
| Lock & key | Zelda-likes, BSP partitions | ✅ locked branch vaults, spine-placed keys, rogue lockpicking |
| Multi-floor stairs | all | ✅ stacked floors, stairwell beats, per-floor scaling |
| Character classes/party | ADOM, ToME | ✅ five classes, personalities |

## Phases

### Phase 1 — Spatial procgen v2 + Dungeon Archive (current)
- Critical-path spine + **branch rooms** on the grid, explicit edge
  list; **secret doors** (rogue mind / scholarly detection) hiding
  **vault rooms** (2–3× treasure); personality-weighted detour
  decisions narrated as asides.
- **Dungeon Archive**: every finished delve's layout persisted
  (seed, theme, condition, rooms, edges, outcome); minimap viewer;
  "delve this layout again" re-enters by seed (generation is
  deterministic).

### Phase 2 — Dungeon editor (mixed-initiative, PCG ch. 11)
- Open an archived dungeon in an editor: retype rooms, toggle secrets,
  add branches, re-seed sections; validator enforces
  entrance→boss traversability and coverage guarantees.
- Custom dungeons saved to the archive and delve-able; shareable as
  JSON exports.

### Phase 3 — Card editor + content pack format
- **Pack format**: JSON module (cards + optional monsters + theme +
  sprite atlas mapping) with schema validation; packs register into
  the draft pool at table setup.
- **Card editor UI**: create characters/equipment/spells/personalities
  with stat budgets (Bycer: costed design), preview as draft cards,
  export/import packs. Player packs live in localStorage + file
  export.

### Phase 4 — DLC theme packs
- **"17th-Century Alchemy Pack"** — monsters drawn from alchemical
  emblems (Atalanta Fugiens: the green lion, the hermaphrodite, the
  dragon that devours its tail...), lab-heavy dungeon theme, Paracelsian
  equipment. Art pipeline: engraving extractions already exist in the
  EmblemRoguelike project.
- Era/culture equipment packs (e.g. Norse, Crusades-era, Heian Japan)
  and era magic packs (Renaissance natural magic, goetia, cunning-folk
  charms) — each a self-contained pack file with its own sprites.

### Phase 5 — Deeper roguelike systems (in progress)
- ✅ **Item identification** — hoards deal unlabeled phials whose
  appearance→effect map is a seeded per-run secret (fixed by the
  party's first dungeon, kept for the campaign). Knowledge is earned:
  the alchemist's nose, a scholar's treatise memory, or a reckless
  quaff-test; learned lore recognizes every later phial on sight, and
  a known Elixir of Mending serves as a potion when the party bleeds.
- ✅ **Lock-and-key** — roughly half the open branches now hang an
  iron door guarding a vault, its key stashed earlier on the spine
  (cleared rooms give it up); rogues can pick the lock as a fallback,
  and a shut door is optional riches lost, never a softlock.
- ✅ **In-dungeon shops** — a peddler's stall as a room type (Spelunky
  tradition): seeded stock (draughts, materials, iron keys) with
  depth-taxed prices, need-driven buying, haggling for rogues and the
  Cunning, and robbery for the brave-or-foolish — the peddler is
  armed, and a failed heist raises the alarm.
- ✅ **Altars** — offerings for boons (DCSS tradition): gold on the
  stone buys mending, a run-long warding, or a permanently keener
  edge (light purses get small mercies); blood buys +2 attack from
  the sturdiest volunteer; quiet prayer is free, cleanses venom, and
  the Devout are heard more clearly. Gods refuse a desecrator's coin.
- ✅ **Multi-floor dungeons** — meaner difficulties dig deeper (easy 1
  floor, hard 2, nightmare 2-3; `opts.floors` pins it). Floors are
  spine segments joined by stairwell rooms — a beat of their own,
  with a march-or-rest choice on the landing — and every stratum
  down, monsters hit ~12% harder and hoards pay ~15% richer. Each
  floor lays out in its own grid band (the minimap reads them as
  strata), the iso view frames only the floor the party walks, and
  branches never leave their stratum. Stairs are structural in the
  editor, like the entrance and the boss.
- ✅ **Combat engine v2 + combat theater** — fights resolve as a
  blow-by-blow exchange log: per-hero attributed hits, rogue backstab
  crits, wizard cantrip chips, alchemist vial openers, cleric
  mid-fight triage, morale routs (the beaten and the bribable flee
  for half bounty; bosses and the undead never), and elite veterans
  (~1-in-8, ⭐-badged, +30/40% stats, richer bounty, index-hashed so
  layouts stay deterministic). The renderer replays the log as
  theater: a monster ghost that flinches and falls, floating damage
  numbers (crits in gold), a draining health bar, camera shake, rout
  dust — and the story panel carries a muted round-by-round ticker.
- ✅ **Dungeon fabric (all Kenney Tiny Dungeon CC0)** — the previously
  unused corners of the vendored sheet now dress the world: tiled
  stone/sand/paver floors and brick walls per theme, flame-colored
  wall torches that flicker, the portcullis on locked branch doors,
  boss-chamber banners, the peddler's counter and barrel, the
  offering basin, the ladder down.
- ✅ **Monster signature moves** — the Bestiary's answer to the class
  moves: every few rounds, ~18 kinds fight with more than teeth.
  Breath washes (+damage, element-colored), drains feed the thing
  half its hit back, hexes weigh every party swing down, crushes come
  through the shields. First fire gets a chronicle beat; every fire
  lands on the exchange log, the ticker, and the FX playback.
- ✅ **Cave layouts (PCG ch.3 agent diggers)** — the Cinder Galleries
  and the Bog Cellar are now dug, not built: a persistent tunneling
  agent walks their spines (long stubborn lava tubes, root-runs); the
  Ice Caverns use a turn-happy grotto walker that curls back on
  itself. Built dungeons keep the classic winding descent. All modes
  respect floor strata, never re-dig a cell, and stay seed-exact.

**Phase 5 complete.** Future phases live in the "Future Expansions"
list and whatever the next playtest demands.

## Architecture notes
- Generation stays **seed-deterministic** end to end — that's what
  makes archived dungeons re-enterable for free.
- The editor requires generation to also accept a **literal layout**
  (rooms+edges JSON) in place of a seed; `generateDungeon(seed, ...)`
  gains a sibling `buildDungeon(layout, ...)` in Phase 2.
- Content packs never mutate base data: the card pool, monster
  rosters, and sprite atlas all take **registries** that packs append to.
