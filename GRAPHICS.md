# GRAPHICS.md — the picture, and what it would take to make it a good one

Research file, 2026-09-04. Scope: what the dungeon-crawl view actually
is at every version, what an Ultima-style CRPG look would require, which
of the 24 `threejs-*` skills are worth spending on, and which alchemical
image corpora in `C:\Dev` can supply the art.

Written to the house pattern: **the trouble first, then ranked proposals**
(§G at the bottom). Every number below was measured or read out of the
running build, not estimated. What I did *not* verify is marked
**[unverified]**, and the full split is in the last section.

---

## 1. The renderer has been frozen since v4.1

`src/ui/IsoDungeonRenderer.js` is **808 lines at v4.1, v4.2,
v7.0-prototype and v8.0 — byte-identical**. The systems went v4.1 → v6
(capabilities, situations) → v7 (scarcity) → v8 (the great cut) → v8.1
(vocabulary, card pool) without the picture changing once.

The lighting rig is older still. It is **unchanged since v1.0**:

```js
this.scene.add(new THREE.AmbientLight(0xaab4d0, 1.1));
this.scene.add(new THREE.HemisphereLight(0x8a9aba, 0x3a3028, 0.9));
const moon = new THREE.DirectionalLight(0xaabbdd, 1.3);
```

Those are the colours of a cold outdoor sky, because that is where they
come from: `SNAKEAB/src/ui/IsoRenderer.js` opens with
`AmbientLight(0xbdd3ff, 0.55)` plus a warm sun. DungeonAB inherited the
rig, doubled the ambient, added a hemisphere light, renamed the sun
`moon`, and shipped it into a dungeon. The variable is still called
`moon` and the comment still says "moonlight from the shaft."

**Consequence:** the party's torch is a `PointLight` at intensity 26–30
with `distance: 12`, competing against roughly 2.0 units of flat sky fill
that reaches every surface equally. The torch cannot carve anything out
of the dark because there is no dark. That is why the delve reads as
*grey rooms with an orange smudge* rather than *torchlight*.

### The version-by-version record

| Version | What changed in the picture | Evidence |
|---|---|---|
| v0 (`fe2a9e9`) | 2D canvas map only (`DungeonRenderer.js`) | initial commit |
| **v1.0** (`e33f79e`) | Isometric 3D arrives, ported from SnakeAB. Meeple capsules. Fog 44→110. | tag `v1.0`, 285 lines |
| v1.x (`fcead0b`) | Kenney *Tiny Dungeon* atlas: real sprites for party, monsters, props | 192×176 sheet, 16 px tiles, CC0 |
| **v2.0** (`b7385f7`) | Procgen v2 — branching, secret doors, hidden vaults | 503 lines |
| **v3.0** (`a123bf1`) | `THEME_PALETTES`, six emblem engravings as card art, boss phases, elemental FX colours | 548 lines |
| **v4.0** (`14bc325`) | Real room footprints, walls with doorways, corridors, `FLOOR_DROP = 7` for stacked floors, formations | 785 lines |
| **v4.1** (`ae122ae`) | `VIEW_HALF` 11 → 7 (the camera comes in close), hazards | 808 lines |
| v4.2 → **v8.1** | **nothing** | 808 lines, identical |

### What the frozen renderer now draws for a game that no longer exists

- `THEME_PALETTES` holds **nine** palettes. `DUNGEON_THEMES` declares
  **three** (`delve`, `castle`, `icecaverns`). ~~Six palettes are dead.~~
  **Corrected 2026-09-04 — see §6.** `registerTheme()` mutates
  `DUNGEON_THEMES` at load and the alchemy pack is on by default, which
  adds `athanor`: **four** themes are reachable in a normal session, and
  the other five palettes are the extension points a pack registers
  into. This changed the recommendation in §G6.
- `FLOOR_DROP`, `roomWorldPos`'s `y = -(room.floor||0) * FLOOR_DROP`, and
  the `stair`/`trapdoor` edge skips exist for multi-floor descent.
  `DungeonGen.MAX_FLOORS = 1`. The vertical machinery is inert.
- `SpriteAtlas.js` maps monsters for **eight** rosters, including the
  Cinder Galleries, the Drowned Athenaeum and the Mad Alchemist's
  Dungeon — themes the cut removed.

None of this is broken. It is all *unread*, which is exactly the category
`npm run audit` was built to find in game code and does not look for here.

### The blind spot

Twelve trouble files (`BUGS`, `PROBLEMS`, `PERPLEXITIES`, `BALANCEISSUES`,
`SIMULATIONFINDINGS`, `DRAMATURGISSUES`, `ARCHITECTURE`, `DATACONTRACTS`,
`CONTENTREACH`, `MEASUREMENT`, `ROUGHEDGES`, `DESIGN_DIALOGUE`) and **not
one entry about the renderer**. `DESIGN_DIALOGUE.md` — 97 KB of "why
things are the way they are" — mentions the renderer once, in passing, in
a paragraph about marching order.

The project has instruments for mechanics (`audit`), balance
(`calibrate`, `bench`), reach (`census`), assets-as-data (`assets`),
prose (`prose.test.js`), and the critic itself (`Dramaturg`). It has **no
instrument for the image**. `tests/sprites.test.js` is real but it is a
*completeness* test — "every monster maps to a tile in bounds" — not a
picture test. Nothing anywhere renders a frame and looks at it.

This matters more than any individual visual defect, and it is the one
finding that maps cleanly onto an existing skill
(`threejs-visual-validation`, §4 Tier 1).

---

## 2. Measured state of the live build

Read out of `window.__iso` on `localhost:5175`, room 2 of 10, the Old Delve:

| | |
|---|---|
| Canvas | 554 × 517 CSS px, DPR 1, drawing buffer 554 × 517 |
| Pixel ratio | `setPixelRatio(min(devicePixelRatio, 2))` — correct |
| Camera | `OrthographicCamera`, half-extents ±7.72 × ±7.20 world units |
| Camera position | (26, 27.3, 26), looking at the party's room |
| **Triangles** | **692** |
| **Draw calls** | **52** |
| Geometries / textures | 45 / 8 |
| Tone mapping | `NoToneMapping`, exposure 1.0 |
| Output colour space | sRGB |
| Shadows | on, `PCFSoftShadowMap`, one 2048² directional over a 60×60 area |
| Console errors | none |

**692 triangles.** The scene is boxes and billboards. Whatever the visual
ceiling of this game is, it is not the GPU — there are three to four
orders of magnitude of headroom before a modern browser notices. The
constraint is a 554 px panel and the fact that nobody has touched the
file in four versions.

Two things follow that are worth stating plainly:

1. **`NoToneMapping` with a 26-intensity point light is the wrong
   pairing.** A torch is a high-dynamic-range object — bright core, fast
   falloff, deep shadow. Without a tone-mapping curve the bright end
   clamps to white and the dark end has nowhere to go, so the range
   collapses. This is a two-line change (`ACESFilmicToneMapping` plus an
   exposure) that would visibly alter the game, and it is the cheapest
   single improvement available.
2. **The scene is static per room.** A spectator autobattler pauses on a
   room, resolves it, moves on. Nothing needs recomputing at 60 Hz. That
   makes normally-expensive techniques — cached shadows, baked ambient
   occlusion, precomputed LUTs, temporal accumulation — nearly free here,
   because the cost is paid once per chamber rather than once per frame.
   This is the single most important fact for choosing skills.

---

## 3. The camera is not the Ultima camera

The request is a Ultima VII / VIII feel. Those games use the **2:1
pixel-isometric convention**: a ground tile projects to a diamond twice
as wide as it is tall.

For a 45°-azimuth axonometric camera, that ratio is exactly
`sin(elevation)`:

```
diamond width  = √2
diamond height = √2 · sin θ
width : height = 1 : sin θ
```

- **2:1 (Ultima)** requires `sin θ = 0.5` → **θ = 30.0°**
- **Current build**: camera (26, 27.3, 26), horizontal run `26√2 = 36.77`,
  so `θ = atan(27.3 / 36.77) =` **36.6°** → a **1.68 : 1** diamond.

36.6° is close to *true* isometric (35.26°) — the SimCity / Transport
Tycoon eye. It looks down at the floor. Ultima's flatter 30° looks
*across* the room, which is why its interiors read as rooms you stand
among rather than floorplans you hover over.

**The fix is one constant.** In `animateFrame`:

```js
const want = new THREE.Vector3(
  this.camTarget.x + back, this.camTarget.y + back * 1.05, this.camTarget.z + back
);                                            //              ^^^^
```

`1.05` → **`0.816`** gives exactly 30°. (`y = back·k`, run `= back√2`,
`tan 30° = k/√2` → `k = √2 · 0.5774 = 0.8165`.) The same ratio appears in
`resize()` as `CAM_BACK * 1.05`; both must move together.

This costs nothing, breaks nothing, and is the highest ratio of "visibly
the requested game" to "lines changed" in this whole document. It will
require re-checking `VIEW_HALF` (a flatter eye fits less floor
vertically) and `WALL_H = 1.15` (flatter eyes see more wall).

Two further Ultima-isms worth naming, both cheap:

- **Walls that don't block the view.** U7/U8 cut away or fade the walls
  between camera and party. The renderer currently walls the full
  perimeter at 1.15 units and relies on the eye being high enough to see
  over. At 30° it will not be. The standard answer — fade the two
  camera-facing wall runs to low opacity — is a small change given
  `wallSpans`/`doorMap` already know which run is which.
- **Sprite billboards are correct here, not a compromise.** U7's people
  and props are 2D art in a 3D-ish space. `THREE.Sprite` under an
  orthographic camera is the same trick. The existing `imageMaterial()`
  path (§5f) already does it properly, aspect preserved.

---

## 4. The Three.js skills: what to use and what to leave

All 24 skills from `scottstts/Threejs-Awesome-Graphics-Agent-Skills` are
**already installed in this environment** (`threejs-skill-router`,
`threejs-bloom`, and the rest appear in the session's skill list). There
is no install step.

The honest problem: that library is built for **outdoor, planetary and
cinematic** work — oceans, atmospheres, volumetric clouds, black holes,
FFT water, GPU grass, reentry plasma. DungeonAB is a **554 px torchlit
box with 692 triangles in it**. Most of the library is inapplicable, and
the failure mode is obvious — spend a week on a beautiful atmosphere
system for a game that takes place underground.

So: ranked, with reasons, including the ones to refuse.

### Tier 1 — use these, in this order

| Skill | Why it fits *this* game |
|---|---|
| **`threejs-visual-validation`** | The missing instrument (§1). Fixed-view captures, seed sweeps, no-post baselines, regression evidence — the image-space sibling of `npm run audit` / `census`. This project's whole culture is "measure it or it isn't real"; graphics is the one surface with no measurement. **Do this first, before changing any pixel**, so every later change has a before/after. |
| **`threejs-exposure-color-grading`** | Directly addresses the §2 finding. Gives one owner for tone mapping (currently `NoToneMapping`) plus a generated 32-cube LUT — which is exactly how the four live themes get to read as four places instead of four flat hex triples. Torchlight is an exposure problem before it is a lighting problem. |
| **`threejs-shadow-systems`** | The torch is the game's mood and it currently casts nothing (only the "moon" directional has `castShadow`). This skill's cached, update-budgeted approach is ideal for a static-per-room scene: build the shadow once on room arrival, never again. |
| **`threejs-procedural-architecture`** | The rooms are `BoxGeometry` slabs and 1.15-unit walls. Massing grammars, façade bays, arches, cornices, profiles — a vault that looks like a vault. This is the biggest single jump in "looks like a CRPG," and it consumes the alchemical architecture cutouts in §5a (181 arches, 62 columns, 60 towers, 47 castles) as reference. |
| **`threejs-procedural-materials`** | Stone that is stone. Currently `MeshStandardMaterial({ color, roughness: 1 })` — flat colour, no normal, no variation. Authored PBR identities plus derivative normals per theme; the skill also covers emissive/lava surfaces, which the athanor and forge rooms still want. |

### Tier 2 — after Tier 1 lands and is measured

| Skill | Condition |
|---|---|
| `threejs-bloom` | Only *after* exposure/tone mapping is owned. Bloom before tone mapping is how you get a smeary mess. Torches, the Everburning Lantern and spell FX all want it; scope it to selective bloom on emissives. |
| `threejs-screen-space-ambient-occlusion` | GTAO would ground the sprites and give room corners depth — the single biggest cue that a box is a room. Half-res horizon sampling on a 554 px panel is trivial. Gated on Tier 1 because AO on top of flat sky fill does nothing visible. |
| `threejs-image-pipeline` | Becomes necessary the moment two of {AO, bloom, LUT} coexist — it exists to stop them fighting over depth/normal/history ownership. Adopt it *when* the second post effect lands, not before. |
| `threejs-camera-direction` | For §3 if the 30° change grows past one constant: authored framing per room type, quaternion handoffs, camera collision so the eye doesn't clip walls at a flatter angle. |
| `threejs-procedural-vfx` | Spell effects are currently expanding sprite quads with an opacity ramp. Fresnel rim shells, dissolves, instanced sparks and additive projections are the right vocabulary for Radiant Smite / Frost Lance / Firebolt. It also covers "scene-relative HDR emission hierarchy" — the discipline that keeps a torchlit scene from blowing out. |
| `threejs-parallax-occlusion-mapping` | Real depth in the stone at almost no triangle cost — very attractive for a 692-triangle scene. **Requires WebGPU/TSL**; see the fork below. |

### Tier 3 — do not use, and why

`threejs-spectral-ocean`, `threejs-water-optics`, `threejs-procedural-planets`,
`threejs-atmosphere-aerial-perspective`, `threejs-volumetric-clouds`,
`threejs-raymarched-space-effects`, `threejs-precipitation-surfaces`,
`threejs-procedural-vegetation` — outdoor, planetary and sky systems with
no underground use. The flooded wing could argue for `water-optics`'
bounded heightfield pool, but the sump is one tell in one wing; that is a
decoration budget, not a system budget.

`threejs-temporal-surfaces` (frost on glass, rain on windows),
`threejs-procedural-animation` (launch kinematics, gravity turns,
staging), `threejs-procedural-geometry` (hard-surface assemblies,
humanoid robots) and `threejs-procedural-fields` — either aimed at a
different subject or solving a problem this game doesn't have.
`procedural-fields` is a maybe-later if the stone materials need shared
cause-linked variation across channels.

`threejs-skill-router` — worth one invocation at the start of an actual
build session to sanity-check this ranking against the current skill
texts; not a deliverable itself.

### The WebGPU / TSL fork — decide before Tier 2

`package.json` pins `three@^0.170.0` (installed: exactly 0.170.0,
October 2024). It **does** expose `three/webgpu` and `three/tsl`
(`build/three.webgpu.js` is present), so the door is open without
rewriting the import graph. But several skills in this library are
written against TSL as it stands now, and TSL moved substantially after
r170. **[unverified]** — I have not diffed the skills' code against
r170's TSL surface.

Recommendation: **stay on `WebGLRenderer` for Tier 1.** Every Tier 1
skill works there. If Tier 2 reaches parallax-occlusion or GPU-side VFX,
bump `three` first, on its own commit, with the visual-validation
baseline from Tier 1 as the regression gate — which is the whole reason
Tier 1 starts with the instrument.

---

## 5. The alchemical image corpora — the real asset answer

This is where the graphics budget should actually go. The renderer's
problem is partly lighting, but the *look* problem is that a Renaissance
magus drafted from a pool of Agrippa, Dee, Paracelsus, Fludd, Maier and
Isabella Cortese is currently represented on screen by a 16-pixel Kenney
knight — while five projects' worth of mined, tagged, provenanced
early-modern engraving sits in `C:\Dev`.

### What is on disk

| Project | Contents | Count |
|---|---|---|
| **`EmblemPrintShop/`** | Extracted, **tagged, transparent-PNG object cutouts** from emblem plates, with a GroundingDINO + SAM + OpenCV pipeline, a browsable gallery, a 65-entry motif atlas, and per-plate `summary.json` | **11,038** individual cutouts across **2,140** plates (plus composites); 48,115 image files total |
| **`OCCULTIMGDB/`** | Whole illustrations, scholarly-catalogued, **every row carrying a `rights` string and `provenance_url`** | **3,572** images, 21-table SQLite at `db/occultimgdb.db` |
| **`Claudiens/`** | *Atalanta Fugiens* — 51 emblems plus apparatus, `atalanta.db` | 1,172 images |
| **`EMBLEMSIN3D/`** | **51 recovered camera solves** for Merian's AF engravings (horizon plus vanishing points, drawn back onto the plates, with per-plate quality flags), toon/woodcut Three.js renderers | 296 images, 3 art modules |
| **`3dprintlab/`** | **17 parametric Three.js apparatus generators**, each returning a `THREE.Group`, each with a provenance record | 17 generators |
| **`ANTIGRAVEMBLEMSIN3D/`** | Fork of the above; game and experiment shells | — |

### 5a. `EmblemPrintShop` — the parts bin

Labelled cutout inventory, mapped straight onto DungeonAB's needs (counts
from `assets/extracted_all/*/individual/*_transparent.png`):

| DungeonAB need | Cutouts available |
|---|---|
| **Weapons** (Greatsword of the Vault, Quicksilver Daggers, Blessed Mace) | `sword_axe` 232 · `sword_axe_torch` 72 · `sword_spear_axe` 61 · `sword_spear_axe_torc` 59 · `sword_axe_02` 37 — **≈460** |
| **Alchemical equipment** (lab rooms, Portable Alembic, Athanor Charm) | `distillation_vessel` 342 + 57 · `cauldron` 217 + 32 · `hearth` 156 · `furnace` 126 · `philosophical_egg` 97 · `anvil` 63 · `cup` 61 · `pestle` 49 · `lamp` 37 · `torch` 36 |
| **Royalty / characters** | `crown` 325 + 63 · `person` 499 (+ `_02` 198, `_03` 87) · `hermaphrodite` 178 · `man_old_man` 133 · `woman` 78 · `child` 56 · `old_man` 46 · `scepter` 49 |
| **Monsters** | `skeleton` 167 · `hermaphrodite` 178 (the Rebis is a boss if anything is) · `bird` / `peacock` 118 · `hermaphrodite_skelet` composites 32 |
| **Architecture** (rooms, walls, doors) | `wall` 482 · `arch` 181 · `window` 136 · `tower_chimney` 97 · `bridge` 64 · `column` 62 · `door` 62 · `tower` 60 · `building_house` 53 · `chimney` 50 · `castle` 47 · `altar` 72 · `cave` 102 |
| **Room dressing** | `book` **1,121** (the library rooms draw themselves) · `mirror` 136 (Silvered Hand-Mirror) · `wheel` 94 · `wreath` 79 · `hourglass` 78 · `ring` 39 |
| **Sky / landscape** | `star` 563 + 73 · `moon` 216 · `sun` 71 · `sun_moon` 67 · `flower` 184 · `tree` 104 · `forest` 45 · `palm` 44 · `bush` 39 · `sky` 38 |

Source books mined so far: **Stolcius, *Viridarium chymicum*** (108
plates), **Cramer, *Emblemata sacra*** (75), **Maier, *Atalanta
Fugiens*** (51), ***Splendor Solis*** (Wellcome plus local, ~44),
***Rosarium Philosophorum*** (19), ***Hypnerotomachia Poliphili*** (1499
Aldine, ~172 woodcuts), plus an Aurora Consurgens override batch.

**Two caveats that must not be skipped.**

1. **The labels are known to be unreliable for apparatus.**
   `EmblemPrintShop/README.md` reports, from its own WO-012 study, that
   *4 of 4 sampled apparatus labels were wrong*. `visual_elements.json`
   rows carry `"confidence": "medium"` and `"review_status": "stub"`.
   Treat the histogram above as a **search index, not a catalogue** —
   every asset that ships needs a human look.
   `prototype/review.html` is an approve/reject queue that already exists
   for exactly this.
2. **Many cutouts are page-sized with alpha, not cropped.** Sampled
   dimensions: `pestle` 1275×1650, `wall` 1275×1650, `hourglass`
   1275×1650 — the SAM mask applied to the full page canvas. Others *are*
   tight (`bird_03` 387×570, `book` 711×1065). Any import pipeline needs
   an **auto-crop-to-alpha-bbox** step before downscaling.

### 5b. `OCCULTIMGDB` — the rights layer

3,572 images, all with `source_file`, all with a `rights` string: 1,530
"Public domain. Via Wikimedia Commons" · 464 Internet Archive · 68 CC BY
4.0 (Wellcome) · 56 CC0 · 52 Princeton (Garrett) · 51 via
furnaceandfugue.org / Science History Institute. Eras: early modern 1,447
· renaissance 936 · modern 618 · medieval 360 · antiquity 211.

Keyword hits against `title || summary` that map onto the game:
**demon 464** (with motifs `demon portrait` 84, `demon seal` 82,
`Dictionnaire Infernal` 72, `ars goetia` 70) · king 1,143 · crown 355 ·
laboratory 310 · lion 299 · vessel 273 · furnace 203 · serpent 170 ·
queen 153 · tree 132 · dragon 124 · fountain 108 · monster 107 · bath 100
· tower 99 · cave 65 · shield 52 · sword 50 · tomb 45 · retort 35 ·
armour 34 · knight 33 · skeleton 32 · wolf 31 · alembic 29 · athanor 15.

**The Dictionnaire Infernal / Goetia block is a monster bestiary that
already exists, is public domain, and is already catalogued with
scholarly summaries.** DungeonAB's current roster (`rat-swarm`,
`gelatinous`, `ogre-king`, `wraith`…) is generic fantasy and was written
against a 16 px Kenney sheet. A roster drawn from actual demonological
portraiture would be both better-looking and more on-theme than anything
that sheet can offer.

### 5c. `3dprintlab` — real 3D props, already written in Three.js

Seventeen generators in `app/js/apparatus/`: **albarello, alembic,
athanor, balneum, bellows, cooling-vat, crucible, cucurbit, cupel,
furnace, mortar, pelican, receiver, retort, rosenhut, train**, plus a
registry. Each is `import * as THREE from 'three'` and each `build(p)`
returns a `THREE.Group`. Each has a provenance record in
`app/data/provenance/`, sourced to Brunschwig 1500, Libavius 1606 and
others.

Now compare against DungeonAB's actual card list:

| Card | 3dprintlab generator |
|---|---|
| **Portable Alembic** | `alembic.js` |
| **Athanor Charm** | `athanor.js` |
| **Pelican Vessel** (in play — visible on the muster screen) | `pelican.js` |
| **Flask of Vitriol** | `cucurbit.js` / `receiver.js` |
| lab-room prop (currently a 16 px "green reagent vat") | `furnace.js`, `crucible.js`, `train.js` |

A direct 1:1 match, in the same language, with provenance attached. A lab
room could stop being a green square and become an actual distillation
train a player could name. **[unverified]** — I have not tried importing
a generator into DungeonAB; the geometry is authored in millimetres for
printing and would need a scale factor plus a check that
`latheFromPairs` / `taperedTube` don't drag in print-validation
dependencies.

### 5d. `EMBLEMSIN3D` — the camera authority

Phase 5 of that project recovered, for **all 51 Atalanta Fugiens plates**,
the horizon and vanishing points Merian actually ruled, solved a pinhole
camera against them, drew the solve back onto the engraving, and
published which solves are weak. It also renders in a deliberate
toon/woodcut style to match the engravings.

For §3 this is better than my trigonometry: it is **empirical evidence of
how an early-modern engraver staged an interior**, from the same author,
already validated, already in Three.js. If the goal is "period CRPG"
rather than "1990s CRPG," those 51 solves are the reference set for camera
height, wall-run treatment and figure scale — and the findings page says
which ones not to trust.

### 5e. Character portraits — coverage against the sixteen magi

DungeonAB's character cards are historical: Agrippa, Sendivogius, Brahe,
Napier, Ficino, Dee, Forman, Bruno, Pico, Cavendish, Digby, Trithemius,
Fludd, Paracelsus, Maier, Cortese. Portrait-tagged rows in `OCCULTIMGDB`:

| Covered (portraits on disk) | Thin or absent |
|---|---|
| Cavendish 41 · Dee 19 · Paracelsus 15 · Agrippa 13 · Maier 6 · Ficino 5 · Trithemius 5 · Fludd 3 · Pico 3 · Bruno 2 | **Sendivogius 0** · **Napier 0** · **Cortese 0** · **Digby 0** · Brahe 0 · Forman 0 |

(Adjacent figures also covered, if the pool ever widens: Ripley 4,
Lull 4, Khunrath 1.)

Ten of sixteen are covered from disk today. The six gaps all have
well-known period images findable on Wikimedia or the Internet Archive —
Digby has Van Dyck portraits, Brahe has many engraved ones, Cortese's
*Secreti* has a title page. That is a small, bounded sourcing job, and
`OCCULTIMGDB` has a `wanted` table that is presumably the mechanism for
exactly it.

### 5f. The precedent is already in the codebase

`src/assets/emblems/` ships six extracted engravings — `green-lion`,
`ouroboros`, `caput-corvi`, `rebis`, `winged-wingless`,
`philosophers-dragon` — at **128 px max dimension, RGBA, 16–40 KB**, and
`src/packs/alchemyPack.js` wires them to cards. The renderer already has
the code path: `imageMaterial(url)` loads them with sRGB, smooth
filtering, aspect preserved, cached, and re-renders on load.

**Nothing architectural stands between the corpora and the game.** The
path is proven at n = 6. The work is volume, curation and rights
discipline, not plumbing. **128 px RGBA / ≤40 KB is the established
target spec** for anything imported.

### 5g. As prompt material

The corpora are also the best available prompt source for generated art.
The motif atlas (`EmblemPrintShop/data/motifs.json`, 65 entries with
iconographic descriptions and alchemical valences) and `OCCULTIMGDB`'s
sectioned essays (*Iconography* / *Significance* / *Reading*) are already
written in the register a prompt wants: an image description plus what it
means. External corroboration for descriptions:
[Furnace and Fugue](https://furnaceandfugue.org/atalanta-fugiens/) (UVA
Press / Brown, open access, high-res zoomable AF plates with commentary),
the [Public Domain Image Archive *Splendor Solis* entry](https://pdimagearchive.org/images/7fd31676-2969-433a-99d6-3e3e0f09f76c/)
(BL Harley 3469, 1582), the
[Internet Archive *Splendor Solis* facsimile](https://archive.org/details/cu31924012366021),
and [PICRYL's *Splendor Solis* collection](https://picryl.com/collections/splendor-solis-e76584).

One caution, consistent with this project's own rules: generated art has
no provenance, and every other image system here (`OCCULTIMGDB`,
`3dprintlab`, `EmblemPrintShop`) is built on the principle that an image
without a source is not an asset. If generated art enters, it should
carry a `method: generated` field the way `visual_elements.json` already
carries `method` — so a later pass can tell the two apart.

---

## G. Ranked proposals

House style: the problem, then options ranked, with a recommendation.

### G1 — The picture has no instrument *(the root finding)*

1. **`threejs-visual-validation`: fixed-view seeded captures of all three
   themes × the room types, as an `npm run frames` script writing to a
   gitignored directory with a small committed manifest. ★ recommended** —
   the same shape as `census` / `audit`, it makes every later change
   arguable, and it costs one sitting.
2. A single golden screenshot test. Cheaper; brittle across GPUs.
3. Nothing. Continue changing graphics by eye. *(This is the status quo,
   and it is how the renderer stayed frozen for four versions without
   anyone noticing.)*

### G2 — The dungeon is lit like an outdoor scene

1. **Own the exposure: `ACESFilmicToneMapping`, drop ambient ~1.1 → ~0.15,
   drop hemisphere ~0.9 → ~0.2, retune the torch, then one LUT per theme
   via `threejs-exposure-color-grading`. ★ recommended** — the biggest
   visible change per line, and it turns the three surviving themes into
   three places.
2. Tone mapping only, leave the light rig. Half the win, ten minutes.
3. Full re-light with `threejs-shadow-systems` torch shadows in the same
   pass. Better result; do it as G4, after G1 exists to prove it.

### G3 — The camera is SimCity, not Ultima

1. **`1.05` → `0.816` in both `resize()` and `animateFrame()` (θ = 30°, a
   true 2:1 diamond), then retune `VIEW_HALF` and `WALL_H`, then fade the
   two camera-facing wall runs. ★ recommended** — one constant, then two
   small follow-ons.
2. As above, but take the camera from `EMBLEMSIN3D`'s 51 solved plates
   instead of from the 2:1 convention. More interesting, more work, and
   genuinely the more *original* answer — worth doing after option 1
   proves the flatter eye works at all.
3. `threejs-camera-direction` for per-room authored framing. Overkill
   until the base angle is settled.

### G4 — Rooms are boxes; stone is flat colour

1. **`threejs-procedural-architecture` for room shells (arches, cornices,
   vaults, door surrounds) plus `threejs-procedural-materials` for themed
   stone, referencing the 181 arch / 62 column / 482 wall cutouts.
   ★ recommended** — the largest "looks like a CRPG" jump, and it consumes
   §5a's architecture assets rather than needing new ones.
2. Materials only (normal maps, roughness variation) on the existing
   boxes. Much cheaper; the boxes stay boxes.
3. Parallax-occlusion stone. Best depth-per-triangle, but forces the
   WebGPU/TSL decision early.

### G5 — Kenney's 16 px sheet against a cast of Renaissance magi

1. **A curated import pipeline: auto-crop-to-alpha → downscale to 128 px
   RGBA → human review via `EmblemPrintShop/prototype/review.html` → a
   `src/assets/engravings/` manifest carrying `source`, `rights` and
   `provenance_url` per file. Start with the 16 character portraits and
   the ~10 lab-apparatus props. ★ recommended** — bounded, and it uses the
   proven n = 6 path in `imageMaterial()`.
2. Wholesale import of all 11,038 cutouts. The labels are
   known-unreliable (WO-012) and unreviewed art on cards is worse than
   Kenney's, which at least is consistent.
3. Keep Kenney for monsters, engravings for characters and props only. A
   reasonable half-measure and a good first slice of option 1.

### G6 — Dead visual code for a game that was cut

**Ranking reversed 2026-09-04.** The original recommendation was to
delete, on the reading that six of nine palettes served themes the cut
removed. That reading was wrong: `registerTheme()` mutates
`DUNGEON_THEMES` at load, the alchemy pack is on by default and registers
`athanor`, so a palette can be live without appearing in the built-in
roster — which is precisely `ARCHITECTURE.md`'s extension-point case.
Deleting on the old reading would have removed a pack's stone.

1. ~~Delete the six unused `THEME_PALETTES`…~~ **Withdrawn.** It would
   have broken any pack registering into them, `athanor` included had it
   been listed a line lower.
2. **Document them as extension points, in the file, at the definition —
   done in the G2 relight commit. Extend `npm run audit`'s reach to
   `src/ui/` so the *genuinely* unread cases (the `FLOOR_DROP` / stair
   machinery, with `MAX_FLOORS = 1`) are found by a tool rather than by
   an argument. ★ recommended (revised)**
3. Leave it undocumented. *(Status quo.)*

### The smallest thing that proves the whole direction

**G1, then G2, then G3, in one sitting.** Capture the baseline, own the
exposure, drop the camera to 30°. No new assets, no new dependencies, no
WebGPU decision, roughly a day — and at the end there is a before/after
pair that says whether "Ultima-style torchlit CRPG" is a direction worth
funding the rest of this document for.

---

## 6. What was built, and what building it corrected

Branch `graphics-v8`, worktree `C:\Dev\DungeonAB-graphics` (rule 14: the
main tree was held by another session, which moved it from `v8` to `main`
mid-session — the isolation earned its keep). Three commits; `npm test`
42 files, 42 pass, 0 fail at each.

**G1 — `src/ui/Frames.js`, committed alone so the "before" is
checkout-able.** A URL puts the game in a reproducible place:
`?capture=1&draftSeed=frames&seed=frames-01&room=6`. Seeded draft through
the same `playerPick()` the UI uses, muster skipped, simulator ticked in
a loop rather than on a timer, camera snapped rather than eased.
`window.__frameReady` / `__frameInfo` report when it has settled and what
it shows. `FIXTURES` covers all four live themes at three depths;
`tools/find-frame-seeds.mjs` produced the seeds and `themeCheck()`
re-asserts them at capture time.

**G2 — exposure and the light rig.** `ACESFilmicToneMapping` at 1.25;
ambient 1.1 → 0.14, hemisphere 0.9 → 0.22, the `moon` 1.3 → 0.16,
renamed `shaft`, no longer casting. The torch is the key light and the
only shadow caster (1024 cube; ~700 triangles, static between rooms).
Sprites use `SpriteMaterial` and are unlit, so party, monsters and props
stay fully legible while only the stone goes dark — mood on the
architecture, clarity on the actors.

**G2b — `fill` and `ground` per theme.** Not in the original plan. Under
a warm key light every theme became the same orange dungeon, so the
palettes gained the colour their *shadows* go: the ice caverns are cold
in the dark and warm only where the party stands; the athanor is warm
through. This is the cheap version of §4's per-theme LUT and costs no
post-processing pass — take the LUT when a grading pass exists to hang it
on.

**G3 — the camera, and the walls that follow from it.** `1.05` → a named
`CAM_RISE = √2·tan(30°)`, in one constant rather than two literals.
Verified live: elevation **30.00°**, diamond **2.000 : 1**. `VIEW_HALF`
7 → 6.2. Then the consequence: at 36.6° a 1.15-unit wall hid little,
but at 30° it hides `1.15/tan 30° ≈ 2.0` units of floor — two tiles of
the chamber the party is standing in. The two camera-facing runs
(`south`, `east`) are now drawn at 0.26 opacity, `depthWrite: false`,
and do not cast.

### Three things this got wrong, found by doing it

1. **The harness flagged ready before the camera arrived.** The eye eases
   at 0.12 a frame, so the first captures photographed the *previous*
   chamber — and in a hidden tab, with rAF throttled, would never have
   arrived at all. Fixed with `snapCamera()`. The instrument catching its
   own defect on day one is the argument for building it first.
2. **"Six palettes are dead" was wrong** (§1, §G6). `registerTheme()`
   mutates `DUNGEON_THEMES` at load; the alchemy pack is on by default
   and registers `athanor`. Four themes are reachable, not three, and the
   remaining five palettes are extension points. Acting on the original
   G6 would have deleted a live pack's stone.
3. **The seed names a dungeon, not a delve.** Two runs of one seeded URL
   give the same party, map, theme and chamber, then diverge on every
   choice — thirteen `Math.random()` calls sit outside the seeded stream.
   Written up as `PROBLEMS.md` P8 and deliberately **not** fixed here:
   threading the rng moves which numbers come up, which moves the
   99/88/71/45 curve and forces a re-calibrate and a re-stamped
   `MINING_REPORT.md`. That is a balance job and must not ride along
   inside a renderer change.

### Not done

G4 (procedural architecture and materials), G5 (the engraving import
pipeline), the `npm run audit` extension in the revised G6, and the
Tier 2 skills. G1–G3 were the sitting that proves the direction; the rest
is the direction.

---

## Verified / unverified

**Verified live, 2026-09-04:** renderer line counts and lighting
constants at every tag (`git show <tag>:src/ui/IsoDungeonRenderer.js`);
canvas size, camera parameters, triangle and draw-call counts,
tone-mapping and colour-space settings read from `window.__iso` on a
running delve; `MAX_FLOORS = 1` and the three surviving themes in
`DungeonGen.js`; the absence of renderer entries in the twelve trouble
files; cutout counts, label histogram and sampled dimensions in
`EmblemPrintShop`; row counts, schema, rights strings and keyword hits in
`OCCULTIMGDB/db/occultimgdb.db`; the 17 generator filenames and the
`THREE.Group` contract in `3dprintlab`; the six shipped emblem PNGs and
their dimensions; SnakeAB's lighting rig for the inheritance claim.

**Not verified:** frame rate (the browser pane was hidden, so rAF was
throttled — but 692 triangles makes this uninteresting); whether a
`3dprintlab` generator imports cleanly into DungeonAB; whether the
installed skills' TSL code matches three@0.170's TSL surface; the visual
quality of the cutout corpus beyond an eight-file sample; `EMBLEMSIN3D`'s
51 solves beyond that project's own account of them; that the six
portrait gaps in §5e are fillable from Wikimedia (asserted from general
knowledge, not checked).
