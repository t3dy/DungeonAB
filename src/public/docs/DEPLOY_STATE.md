# DEPLOY_STATE — DungeonAB

Where this project is hosted and how it gets there. Read this before touching
deploy config.

## Canonical production URL

**https://dungeon-ab.vercel.app** — the URL to give people.

## Hosts

| Host | URL | Trigger |
|---|---|---|
| **Vercel** (primary) | https://dungeon-ab.vercel.app | Auto-deploys on push to `main` |
| **GitHub Pages** (mirror) | https://t3dy.github.io/DungeonAB/ | `.github/workflows/deploy.yml` on push to `main` |

Vercel project `dungeon-ab` (`.vercel/project.json`).

### Versioned archives (Vercel only)

`/v1/` … `/v8/` and `/v81/` are frozen builds committed under `src/public/vN/`.
CI does not rebuild them. Git tags mark the exact sources.

To freeze the current root build before the root moves on:

```bash
npx vite build --base=./
```

then copy `dist/index.html` and `dist/assets/` to `src/public/vNN/`. The
relative base is the point: the normal build emits `/assets/…`, which looks
fine locally and 404s from the subpath. Check with
`grep -o 'src="[^"]*"' src/public/vNN/index.html` — it must say `./assets/…`.
Then add the version in `tools/build-hub.mjs` (`VERSIONS`) and the README
table, and run `npm run hub`.

## Build

```bash
npm run build      # vite build → dist/
```

Vite `root` is `src/`, output `../dist` (`vite.config.js`); `vercel.json` pins
`outputDirectory: dist`.

### The base-path gotcha

GitHub Pages serves from `/DungeonAB/`; Vercel serves from the root.
`vite.config.js` switches on an env var:

```js
base: process.env.GITHUB_PAGES ? '/DungeonAB/' : '/'
```

The Pages workflow sets `GITHUB_PAGES: 'true'`; Vercel does not. **Any new host
needs that decision made explicitly**, or assets 404 under a subpath.

## Environment variables

None. No backend, no API key, no secret. All state is client-side
(localStorage: run history, archive, chronicles, player packs). If that ever
changes, secrets go in Vercel project settings or a gitignored `.env.local` —
never in the repo, never pasted into chat.

## CI gate

`.github/workflows/deploy.yml` runs `npm ci && npm test` **before** building, so
a red suite blocks the Pages deploy. **Vercel's Git integration does not run the
tests**, so a red suite can still reach production — run `npm test` locally
before pushing to `main`.

## Deploy procedure

1. `npm test` — must be green (42 files as of v8.2).
2. `npm run build` — must succeed.
3. Push to `main`.
4. Both hosts pick it up automatically. **Confirm the live URL actually shows
   the change before calling it deployed.**

## Known gotchas

- **`package.json` must not carry a UTF-8 BOM.** Writing it from PowerShell with
  `Set-Content -Encoding utf8` adds one, and Vite's PostCSS config loader then
  fails at dev-server startup with `Unexpected token '﻿'`. Write it BOM-free.
- **`requestAnimationFrame` drives the delve loop** (`main.js:mainLoop`). In a
  hidden or background tab it never fires and the crawl looks frozen at Room 0.
  That is the browser, not a bug — use the Step button to advance a hidden tab.
- **The golden chronicles (`tests/golden/`) pin the whole prose of three seeded
  delves.** Any roster, balance, or writing change will fail them. `npm run
  bless` regenerates; read the diff first, because a golden re-blessed unread
  has stopped testing anything.
- Ids for things picked up mid-delve come from a counter, not `Date.now()`.
  Timestamps collided within a millisecond and made the goldens drift between
  runs (fixed in v6.0 — see `nextFoundId` in `RoomEncounters.js`).
- The main JS chunk is ~750 kB (Three.js). The build warns about chunk size;
  expected, not an error.

## Branch history worth knowing

v6.0 was developed on a branch that had diverged from `main` before `main`'s
v4.x work, and the two lines independently built overlapping systems (both had
capability tags; both fixed a "can't see the dungeon" bug). v6.0 was
re-integrated onto `main` deliberately: `main`'s Formation, RoomFeatures,
Tactics, PARTY_CAP and pack shapes were kept, and only the genuinely new v6
systems were ported on top. **Before starting large work here, check how far
`main` has moved** — `git fetch && git log --oneline origin/main -20`.
