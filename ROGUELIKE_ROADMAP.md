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
| Shops / town | Spelunky, roguelites | ✅ town between delves |
| Risk wagers | DCSS Zig, Pact-likes | ✅ conditions + hex exchange |
| Item identification | NetHack, DCSS | 🕐 Phase 5 (unidentified potions/scrolls) |
| Lock & key | Zelda-likes, BSP partitions | 🕐 Phase 5 |
| Multi-floor stairs | all | 🕐 Phase 5 (campaign depth is the current analogue) |
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

### Phase 5 — Deeper roguelike systems
- Item identification (quaff-test the unlabeled potion), lock-and-key
  over BSP-style partitions, in-dungeon shops, altars, multi-floor
  dungeons with stairs, agent-dug cave layouts for the Cinder
  Galleries, cellular-automata grottos.

## Architecture notes
- Generation stays **seed-deterministic** end to end — that's what
  makes archived dungeons re-enterable for free.
- The editor requires generation to also accept a **literal layout**
  (rooms+edges JSON) in place of a seed; `generateDungeon(seed, ...)`
  gains a sibling `buildDungeon(layout, ...)` in Phase 2.
- Content packs never mutate base data: the card pool, monster
  rosters, and sprite atlas all take **registries** that packs append to.
