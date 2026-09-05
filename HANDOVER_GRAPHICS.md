# HANDOVER — the graphics branch, and shipping it as v8.2

Written 2026-09-04 at the end of the graphics research session. The work
is done and committed on a branch; what remains is merging it and
cutting a release. Everything below has been verified except where it
says otherwise.

---

## Where the work is

| | |
|---|---|
| **Worktree** | `C:\Dev\DungeonAB-graphics` |
| **Branch** | `graphics-v8`, four commits on top of `611a7e3` (`v8.1 — ship: the versions/docs hub`) |
| **Not pushed** | the branch is local only |
| **Tests** | `npm test` — 42 files, 42 pass, 0 fail |
| **Build** | `npm run build` — clean (781 kB main chunk, the usual Three.js warning) |
| **Read first** | `GRAPHICS.md` — the research, and §6 for what was built |

```
7f77fdb  Publish GRAPHICS.md through the hub
e2af05b  G2b + G3b — themes keep their dark, and the near walls get out of the way
56d1775  G2 + G3 — the dungeon stops being lit like a field, and drops to Ultima's eye
08415dc  G1 — the picture gets an instrument
611a7e3  v8.1 — ship: the versions/docs hub, and honest onboarding   ← base
```

`08415dc` is deliberately a no-op visually: it adds the capture harness
and nothing else, so it is the checkout-able "before" for any comparison.

**Why a worktree.** `CLAUDE.md` rule 14. `C:\Dev\DungeonAB` was held by
another session throughout, and that session moved it from `v8` to `main`
mid-work. Check where `main` actually is before merging —
`git fetch && git log --oneline origin/main -20` — because `DEPLOY_STATE.md`
warns about exactly this and it happened again.

**One loose end in the other tree:** `GRAPHICS.md` was first written into
`C:\Dev\DungeonAB` before the worktree existed and is sitting there
untracked. The canonical copy is on this branch. Delete the stray so it
does not get committed twice.

---

## What changed, in one paragraph each

**The renderer had not changed since v4.1** — byte-identical at v4.1,
v4.2, v7.0-prototype and v8.0 — and its lighting rig had not changed
since v1.0, because it was SnakeAB's *outdoor* rig inherited whole: a
cold sky at 2.0 combined intensity, with the sun renamed `moon`. The
torch could not carve anything out of the dark because there was no dark.

**G1 — `src/ui/Frames.js`.** A capture harness. `?capture=1&draftSeed=frames&seed=frames-01&room=6`
seeds the draft, skips the muster, ticks the simulator synchronously and
snaps the camera, then sets `window.__frameReady` and `window.__frameInfo`.
`FIXTURES` covers all four live themes at three depths;
`tools/find-frame-seeds.mjs` produced the seeds and `themeCheck()`
re-asserts them at capture time.

**G2 — exposure and lighting.** `ACESFilmicToneMapping` at 1.25; ambient
1.1 → 0.14, hemisphere 0.9 → 0.22, `moon` 1.3 → 0.16 and renamed `shaft`,
no longer casting. The torch is now the key light and the only shadow
caster. Sprites are `SpriteMaterial` and unlit, so party, monsters and
props stay fully legible while only the stone goes dark.

**G2b — per-theme `fill` / `ground`.** Under a warm key light every theme
became the same orange dungeon, so the palettes gained the colour their
*shadows* go. The ice caverns are cold in the dark and warm only where
the party stands.

**G3 — the camera.** `1.05` → `CAM_RISE = √2·tan(30°)`, one named
constant instead of two literals. Verified live off `window.__iso`:
elevation **30.00°**, ground diamond **2.000 : 1** — the Ultima VII/VIII
convention. Was 36.6° / 1.68:1, which is the SimCity eye.

**G3b — near walls.** At 30° a 1.15-unit wall hides ≈2.0 units of floor.
The two camera-facing runs (`south`, `east`) are drawn at 0.26 opacity,
`depthWrite: false`, and do not cast.

---

## Three findings that outlive the graphics work

1. **`PROBLEMS.md` P8 — the seed names a dungeon, not a delve.** Two runs
   of one seeded URL give the same party, map, theme and chamber, then
   diverge on every choice: thirteen `Math.random()` calls sit outside
   the seeded stream (`RoomEncounters.js:37, :549, :1469, :1513, :1531`,
   `Simulator.js:58`). No test catches it because goldens compare a run
   to itself inside one process. **Deliberately not fixed** — threading
   the rng moves which numbers come up, which moves the 99/88/71/45
   curve and forces a re-calibrate and a re-stamped `MINING_REPORT.md`.
   That is a balance job and must not ride inside a renderer change.
   Someone has to decide whether the seed is meant to name a delve.
2. **`GRAPHICS.md` §1 and §G6 carry a correction.** The report first
   claimed six of nine `THEME_PALETTES` were dead. Wrong:
   `registerTheme()` mutates `DUNGEON_THEMES` at load and the alchemy
   pack is on by default, so `athanor` is live — four themes are
   reachable, and the other five palettes are extension points. The G6
   "delete it" recommendation is **withdrawn** in the file. Acting on the
   original would have deleted a live pack's stone.
3. **`ROUGHEDGES.md` R17 — `npm run hub` flips line endings.**
   `.gitattributes` pins `src/public/**` to `-text` for the frozen
   builds, and generated docs get caught by the exemption. Running the
   hub build from a correct LF checkout rewrote four published docs,
   1,100 lines that changed no words. One-line fix suggested in the
   entry: narrow the exemption to `src/public/v*/**`.

---

## Shipping it as v8.2

The pattern to copy is `dfcaa3e` (how v8.1 froze v8 under `/v8/`).

### 1. Merge

```bash
cd C:\Dev\DungeonAB
git fetch && git log --oneline origin/main -10
git merge graphics-v8
npm test
```

Green suite is required — `DEPLOY_STATE.md` notes that **Vercel does not
run the tests**, so a red suite can still reach production.

### 2. Freeze v8.1 as a permanent link

The current root build has to be preserved before the root moves on.
Frozen builds use **relative** asset paths (`./assets/index-*.js`), which
the normal build does not produce — `vite.config.js` sets
`base: '/'`. Build with an explicit relative base:

```bash
npx vite build --base=./
```

then copy `dist/` to `src/public/v81/`. Check the result before
committing: `grep -o 'src="[^"]*"' src/public/v81/index.html` must show
`./assets/…`, not `/assets/…`. An absolute base here is the failure mode
— it 404s only when served from the subpath, so it looks fine locally.

### 3. Add the version in the three places that list versions

- **`tools/build-hub.mjs`** — the `VERSIONS` array at the top. Add the
  new entry as `{ v: 'v8.2', href: '../', tag: 'current', … }` and change
  the existing v8.1 entry to `href: '../v81/'` with its `tag` removed.
- **`README.md`** — the "Every playable version" table. The site link at
  the very top (`▶️ Play v8.1: …`) needs its version number bumped; the
  hub and mirror links beside it are already there and stay.
- **`DEPLOY_STATE.md`** — the "Versioned archives" line still says
  `/v1/, /v2/, /v3/`; it is stale by five versions. Worth fixing while
  you are in there.

Then `npm run hub` to regenerate `src/public/docs/` and the manifest.
Expect the R17 line-ending noise; check the diff is only line endings
before committing it, or fix R17 first (one line in `.gitattributes`).

### 4. Tag, push, and *verify live*

```bash
git tag v8.2
git push && git push --tags
```

`CLAUDE.md`'s working discipline is explicit about the last step: before
writing "deployed," load the actual live URL and confirm the *specific*
change is there. For this release that means:

- https://dungeon-ab.vercel.app — start a delve and check the dungeon is
  torchlit rather than evenly grey, and that the camera looks across the
  room rather than down at it.
- https://dungeon-ab.vercel.app/v81/ — the frozen v8.1 still plays, with
  the *old* flat lighting. If it looks like the new build, the freeze
  copied the wrong thing.
- https://dungeon-ab.vercel.app/hub/ — v8.2 listed as current, v8.1
  linked, and GRAPHICS.md readable under "Architecture & method".
- https://t3dy.github.io/DungeonAB/ — the mirror, which builds with
  `GITHUB_PAGES=true` and a different base path.

A capture URL is the fastest way to check the render on the live site:
`https://dungeon-ab.vercel.app/?capture=1&draftSeed=frames&seed=frames-01&room=6`

### Also worth doing while releasing

- **`package.json` says `"version": "6.0.0"`.** It has been wrong since
  v6. Bump it to match the release.
- **`DEPLOY_STATE.md` says "44 suites as of v6.0"**; it is 42 files now.

---

## What was not done

From `GRAPHICS.md`'s ranked proposals: **G4** (procedural architecture
and materials — the largest remaining "looks like a CRPG" jump), **G5**
(the engraving import pipeline: 11,038 tagged transparent cutouts in
`EmblemPrintShop`, 3,572 rights-cleared images in `OCCULTIMGDB`, 17
parametric Three.js apparatus generators in `3dprintlab` that map 1:1
onto cards already in the game), the `npm run audit` extension in the
revised G6, and every Tier 2 skill. G1–G3 were the sitting that proves
the direction; the rest is the direction.

The research also has a browsable version:
https://claude.ai/code/artifact/5ead01ea-7098-401c-9ab9-9a020dad8a96
(private until shared).
