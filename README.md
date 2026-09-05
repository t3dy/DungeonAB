# ⚔️ DungeonAB — Dungeon-Crawling Autobattler

**▶️ Play v8.2: https://dungeon-ab.vercel.app** &nbsp;·&nbsp; [**all versions &amp; docs**](https://dungeon-ab.vercel.app/hub/) &nbsp;·&nbsp; [mirror](https://t3dy.github.io/DungeonAB/)

Draft a party of Renaissance magi MTG-style — packs passed around a table of AI rivals, one pick per pack — then watch them auto-crawl one procedurally generated dungeon, deciding for themselves. One draft, one delve, a score. Draft a better party and try again.

> **v8 is the cut.** The town, the campaign, providence, the tactic tree, wagers and hexes, lock-and-key wings, multi-floor dungeons and the alchemy inventory loop were all removed on 2026-09-01 to make a leaner game — see [`CUTPROPOSAL.md`](CUTPROPOSAL.md). The larger game is not gone: **every past build is still playable** below, so the town, the campaign and the rest live on at their own links.

## Every playable version

Each link runs that release, frozen, exactly as it was. The [hub](https://dungeon-ab.vercel.app/hub/) collects them all alongside the full documentation set.

| Version | Play | What it is |
|---|---|---|
| **v8.2** (current) | [dungeon-ab.vercel.app](https://dungeon-ab.vercel.app) | **The torchlit dungeon.** The same simulator, seen properly for the first time since v4.1. The outdoor sky rig inherited from SnakeAB is gone: the party’s torch is the key light and the only shadow caster, every theme keeps its own dark (the ice caverns are cold except where the party stands), the camera drops to the 30° Ultima VII eye and the near walls step aside so the floor can be seen. A capture harness (`?capture=1&draftSeed=frames&seed=frames-01&room=6`) photographs any seeded room reproducibly. Research and the ranked next steps in [`GRAPHICS.md`](GRAPHICS.md). |
| **v8.1** | [/v81/](https://dungeon-ab.vercel.app/v81/) | **The brass-tacks dungeon simulator.** One draft, one single-floor dungeon. Twelve **capabilities** — warcraft, roguery, observation, tinkering, alchemy, medicine, scholarship, astrology, divination, conjuring, correspondence, rhetoric — across sixteen Renaissance magi; every situation is graded on who holds the needed capability and how deeply (improvised → assisted → mastered). Fifty-two cards compressed toward five distinct traditions of magic. Lean and mean. |
| **v8.0** | [/v8/](https://dungeon-ab.vercel.app/v8/) | The cut at the moment the systems came out — before the capability vocabulary was compressed to twelve words and the card pool to fifty-two. |
| **v7.0** | [/v7/](https://dungeon-ab.vercel.app/v7/) | The full game before the knife: riders, the mastery gradient, forward-reaching consequences, the dramaturg, the whole Renaissance apparatus at its most elaborate — the reference the cut was measured against. |
| **v6.0** | [/v6/](https://dungeon-ab.vercel.app/v6/) | The preparation release: the roster becomes fifteen **Renaissance magi**, each a **capability package** rather than a bespoke power. A **town that remembers** (six factions, a reputation that moves every price), **Providence** that leans the world toward a destiny you write, and **Divination** that sells the next descent's demands while you can still prepare. |
| **v4.2** | [/v4/](https://dungeon-ab.vercel.app/v4/) | Lock, key, muster and depth: wings sealed behind doors; the **muster** where you assign kit, name your party, and say who prepares each working; **multi-floor** dungeons joined by stairs; positional combat priced by room shape; two attrition clocks; and a saga that saves and continues. |
| **v3.0** | [/v3/](https://dungeon-ab.vercel.app/v3/) | The integration release: theme-tinted worlds, readable enemies (nature badges + prose tells), nature-aware planning, element chips on draft cards, element-coloured spell FX, the deeper-systems guide. |
| **v2.0** | [/v2/](https://dungeon-ab.vercel.app/v2/) | The systems release: branching dungeons with secret vaults, eight themes, the Bestiary, trap types, treasure finds, the Archive &amp; editor, the Card Workshop, the Alchemy Pack. |
| **v1.0** | [/v1/](https://dungeon-ab.vercel.app/v1/) | The first public release: the original draft → delve → town campaign loop with onscreen help. |

Git tags `v1.0`–`v4.2`, `v7.0-prototype` and `v8.0`–`v8.2` mark the exact sources; the frozen builds are served from `src/public/vN/`.

**Sibling project**: [SnakeAB](https://github.com/t3dy/SnakeAB) — same engine philosophy (personality-driven AI, three-beat narration, gradient outcomes), a different genre.

---

## How v8 Plays

### 1. The Draft
- You sit at a table with **3 AI drafters** (each with real pick heuristics) and pass packs — one pick per pack, then it moves on.
- Every pick is one of four card types:
  - **Character** — a named magus of one of five classes. Four march; a drafted fifth waits in **reserve** and steps up when someone falls.
  - **Equipment** — auto-assigns to the best-fit member; some items do different things per class.
  - **Spell** — the shared grimoire; a working's power scales with the party's sharpest mind, and a wizard amplifies it.
  - **Personality** — archetypes that bias the whole party's decisions.
- Packs guarantee **≥2 characters** — no dead drafts.

### 2. The Muster
Before the march, assign drafted kit to particular characters, say **who prepares each working** (their mind sets its power), and rename anybody — the name and history go into the saga.

### 3. The Delve
The party descends room by room, deciding for itself (personality-weighted, class- and capability-gated). **Capabilities are the language of the dungeon**: each situation asks for one of the twelve, and how well the party answers depends on who holds it and how deep they go — a skill nobody has can still be *improvised* from a neighbour at a penalty, one character brings the *assisted* option, real depth unlocks the *mastered* one. Monsters have **natures** (armored, ethereal, venomous, swarming, slow); spells carry **elements**; the **room is a weapon** (drive a foe onto a pit, spikes, a chasm or a brazier with the right body or kit); and two attrition clocks — the **lamp's oil** and lasting **wounds** — wear the party down toward the throne. Off the spine hang **wings**, open by a vote or hidden and ending in a vault.

### 4. The Chronicle
Every room is narrated in three beats: the predicament, the party's deliberation (who argued for what, in character), and the resolution. Wipes get epitaphs; victories get codas. When the throne falls or the party does, the delve is **scored** — then draft again against a new dungeon.

The simulated corpus of delves, read against the house poetics, is browsable at [/logs/](https://dungeon-ab.vercel.app/logs/).

---

## Run It

```bash
npm install
npm run dev    # http://localhost:5175
npm test       # ~543 cases across 42 suites
npm run build  # production bundle → dist/
npm run hub    # regenerate the versions/docs hub (src/public/hub + docs)
```

The prototype is hosted on **Vercel** ([dungeon-ab.vercel.app](https://dungeon-ab.vercel.app)).
Every push to `main` also runs the tests and publishes a mirror to GitHub Pages
(see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and [`DEPLOY_STATE.md`](DEPLOY_STATE.md)).

### The working record
The project keeps its trouble live rather than writing it up at the end. The design, the bug and problem logs, the architecture notes and the measured reports are all in the repo root and browsable on the [hub](https://dungeon-ab.vercel.app/hub/): start with [`DESIGN.md`](DESIGN.md) and [`DESIGN_DIALOGUE.md`](DESIGN_DIALOGUE.md), then the trouble log (`BUGS.md`, `PROBLEMS.md`, `PERPLEXITIES.md`, `BALANCEISSUES.md`, …), each with a ranked-options `…PROPOSAL.md` sibling.

## Art Credits

Sprites from [**Tiny Dungeon** by Kenney](https://kenney.nl/assets/tiny-dungeon) (Creative Commons Zero).
Party classes, monsters, chests, traps, and props all come from this one lovely 16px sheet
(license bundled at `src/assets/tiny-dungeon-LICENSE.txt`). Support Kenney at [kenney.nl](https://kenney.nl).

The archived Alchemy Pack's emblem monsters wear **actual engravings from Michael Maier's
*Atalanta Fugiens* (1617)** — public-domain plates, extracted and processed in the
EmblemRoguelike project (`src/assets/emblems/`). The Green Lion is really the Green Lion.

## Design Lineage

Consolidated in `DESIGN.md` from:
- Megabase chats: *Dungeon crawling auto battler* (2025-12-14), *RPG Auto-Battler Concept* (2025-01-10)
- Games catalog: *The Alchemist's Dungeon* (`dungeon-autobattler`)
- SnakeAB's proven architecture (personality decisions, narration engine, seeded procgen)

## The road here

Everything below was built and shipped across v1–v7, and each remains playable at its version link above. **v8 deliberately cut most of it** ([`CUTPROPOSAL.md`](CUTPROPOSAL.md)) down to the draft-and-delve core; these entries are the history, not the current feature list.

- [x] Isometric Three.js dungeon renderer (SnakeAB's IsoRenderer, re-themed)
- [x] Progression: difficulty tiers, run history, best scores
- [x] Personality barks — same archetype, different voice per class
- [x] Class-keyed equipment — a wand is a fireball for a fighter, meteors for a wizard
- [x] Themed dungeons — each with its own roster and hazards
- [x] *(v1–v7, archived)* Campaign mode — town between delves, party carryover, depth scaling
- [x] *(v1–v7, archived)* Dungeon conditions and the hex exchange — wager a meaner delve for a bigger score; one rival hexes yours back
- [x] *(v1–v7, archived)* Town services — hire replacements, sharpen at the smith, shop the quartermaster
- [x] Onscreen help — how-to-play overlay, event toasts, room/control legends
- [x] Hall of Records — best scores and past runs, persisted locally
- [x] Rival standings — the AI drafters delve their own parties; scores compared at the table
- [x] *(v2, archived)* Procgen v2, the Dungeon Archive, the Dungeon editor, the Card Workshop, the 17th-Century Alchemy Pack
- [x] Preparation effects — drafted kit unlocks options and shifts outcomes, credited by name in the chronicle (the FTL lesson)
- [x] The capability system — situations resolved by what the party can *do*, graded by depth
- [x] Deploy (Vercel, with a GitHub Pages mirror) and the versions/docs hub
- [ ] True multiplayer draft
