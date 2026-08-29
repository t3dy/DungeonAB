# HANDOVER — DungeonAB → a less sandboxed session

*Written 2026-08-29 from a remote (cloud) container. It can see nothing
but this repo: no `C:\Dev`, no `%USERPROFILE%\Downloads`, no local
research databases. That is why this document exists — the next job
needs a file this session cannot open.*

**Branch:** `claude/monster-item-drops-wsc0sp` — everything below is
committed and pushed. No PR opened. `origin/main` is still at `7bd6366`
(the v4.3 merge); v4.4 has **not** been merged or published yet.

**Verify state before doing anything:**

```
cd /d C:\Dev\DungeonAB
git fetch origin claude/monster-item-drops-wsc0sp
git checkout claude/monster-item-drops-wsc0sp
git pull origin claude/monster-item-drops-wsc0sp
npm install
npm test          # expect 45 tests, 0 failures
npm run calibrate # expect "The curve is on target"
```

---

## 1. The job that is waiting

**Read `renaissance.txt` (in Downloads) and build a "Renaissance Magic"
alternate card set: new character cards, new spell cards, a new magic
system, and a pass over every attendant mechanic. Possibly an expansion
set, possibly a whole reworking of the game.**

That is the user's brief, verbatim in intent. This session could not
start it because `renaissance.txt` is not reachable from the container.

### Two things to settle before writing any code

**(a) Is `renaissance.txt` new material, or the same tradition already
in the repo?** The repo already carries a worked design document on
exactly this subject: **`RESEARCH_BRIEF.md`**, a session between the
narrative designer, the TCG designer and two historians (15th–17th c.
alchemy; medieval learned magic). It maps seven worldview structures
onto mechanics:

| § | Historical structure | Proposed mechanic |
|---|---|---|
| 2a | Correspondence and election (*as above, so below*) | replace the flat fire/frost/shock/holy table with **seven planetary channels** binding metals, materials, monster natures and room types — the caster's skill becomes the lookup, not the throw |
| 2b | The stages of the Work (nigredo → albedo → citrinitas → rubedo) | run structure with mandatory suffering; a comeback engine |
| 2c | Licit vs illicit knowledge | the **transgression wager**: deferred compounding costs, growing out of `deep-study`'s sealed texts |
| 2d | Patronage and the court | the alchemist's other dungeon — lands in Conditions; supplies the loss-shape between "retired" and "wiped" |
| 2e | Secrecy and *Decknamen* | the draft as a **reading practice**; extends the existing trap-card rule |
| 2f | *Ora et labora* | shrine and bench in competition rather than coexistence |
| 2g | The weighing (*Chymical Wedding*, 1616) | a draft-scoring ritual and a dungeon gate |

If `renaissance.txt` covers the same ground, **fold it into this plan**
rather than starting a parallel one. If it is genuinely new, say what it
adds that §2 does not.

`RESEARCH_BRIEF.md` §3 is a question list aimed at the local research
databases (**EmblemRoguelike**, **Megabase**) — how much of *Atalanta
Fugiens* is processed, whether *Splendor Solis* / Ripley Scroll / *Mutus
Liber* / *Rosarium Philosophorum* are available as sprites, whether the
alchemy chats are queryable by figure and text. **A less sandboxed
session can actually answer those**, which this one could not. Answering
them decides which threads are buildable as assets and which are just
prose.

**(b) Expansion set, or reworking?** These are very different jobs and
the user explicitly left it open.

- **Expansion set** — keep fire/frost/shock/holy, add Renaissance cards
  beside them. The pack system already supports this cleanly:
  `src/game/CardPacks.js` (`registerPack`, `validatePack`, `BUDGETS`,
  `pooledCards`) and `src/packs/alchemyPack.js` as the worked example —
  the 17th-Century Alchemy Pack already ships Maier's *Atalanta
  Fugiens* emblems, Sendivogius, the Soror Mystica, Solve et Coagula
  and the Court Athanor, with its own theme and emblem monsters.
  Contained, additive, no recalibration of existing cards.
- **Reworking** — replace the element table with planetary
  correspondence. This reaches the resolver, the Bestiary, every
  existing spell card, `Costing.js`, and **forces a full recalibration**
  of the 99/88/71/45 curve. Bigger, better, and it obsoletes some
  existing cards on purpose.

`AUDIT.md` argues the ground is already cleared for the second: the
elemental table needs redesign regardless (shock has resisters but
nothing weak to it — A4).

---

## 2. What this session shipped

### v4.4 — *watch the delve instead of reading it* (`921efde`)

Driven by playtester feedback: *"when you lose life a -X heart displays…
it'd be more satisfying to have visuals associated, and then I could go
inspect/read the log if I wanted more details. I think a little text
heavy."*

- **`src/ui/Cues.js` (new)** — numbers float over the map: damage, gold,
  a trophy, an oil march, a floor descended. Not a second bookkeeping
  system: it reads `Chronicle.diffEvents`, the same per-tick record
  standing rule 7 guarantees nothing can move without appearing in. So a
  new mechanic gets its floating number for free and cannot be added
  without one. Salience decides what floats — BEAT and NOTABLE over the
  map, LEDGER in the log. `selectCues()` is pulled out of the DOM so the
  decision is testable (`tests/cues.test.js`, 5 tests).
- **Terse Chronicle** — a line a room, full account one click away, plus
  a "full prose" toggle. Clicking a room *on the map* opens that room's
  log: `IsoDungeonRenderer.pickRoom` raycasts against tagged floor
  meshes (so a room two floors down is the room you clicked), and
  `DungeonRenderer` keeps hit-boxes for the 2D fallback. Both call
  `onRoomClick` → `focusRoomStory` in `main.js`.
- **Accordion panels** — every panel folds, state in `localStorage`.
- **Toasts moved off the map** and under it, into a column that was
  empty. They now carry only what a number cannot say: who fell, which
  trophy, what kind of room this is the first time you meet one. The
  gold-windfall and spells-learned toasts are **gone** — the cue already
  said it. The first-visit room text is a new one-line `ROOM_TELL`;
  the reference paragraph stays in `ROOM_HELP` / How to Play.
- **`window.dungeonAB`** exposes `appState` for the console and e2e.

### Difficulty is choice density (`a1123c9`)

Implements the user's design note: *"difficulty controls choice density,
not whether certain cards are accessible."*

- `PACK_SIZES` = easy 6 / medium 5 / hard 4 / nightmare 3.
- **`TARGET_POOL = 24` and `roundsForPackSize()`** — rounds scale
  inversely so every difficulty leaves the table with 24–25 cards. This
  was the fix for a real collapse: three rounds at every size gave a
  nightmare drafter nine cards against an easy drafter's eighteen, the
  curve read hard 20% / nightmare 6%, and the calibrator's only escape
  was making nightmare monsters *weaker than easy's*.
- **`packCharacterFloor(round)`** — guaranteed coverage exists to
  prevent dead drafts, and two characters in *every* pack overshot it:
  a nightmare drafter took 16 characters and 8 of everything else,
  twelve adventurers past a party cap of four. Now two for the opening
  two rounds, one thereafter.
- `STAT_SCALE` re-swept: **0.90 / 1.19 / 1.34 / 1.38**. Hard and
  nightmare sit almost together on purpose — at near-identical monsters
  a hard party wins 70% and a nightmare party 46%, and the whole gap is
  choice density. **A future `PACK_SIZES` change is a difficulty change
  and must re-run `npm run calibrate`.**

### A bug worth knowing about

Found by the golden suite's determinism check. Found scrolls and dropped
trinkets were stamped `Date.now()`, so two finds inside the same
millisecond shared an id — and `castThisRoom` is a set of ids, so **the
party silently lost a working it had earned**. Ids are counted now
(`Party.mintId`), and the counter survives a save.

### Current measurements

```
curve       easy 98.5 · medium 87.7 · hard 71.0 · nightmare 44.5
            (targets 99 / 88 / 71 / 45)
tests       45 tests, 0 failures  (npm test)
e2e         18/18 checks          (npm run e2e — needs a dev server, it starts its own)
census      6 mechanics under 5% of delves: cold camp, cornered,
            bribe, locked wing refused, lamp oil cooked, stairhead camp
            (all pre-existing; the sharp-end gate in tests/prose.test.js passes)
assets      0 of 83 cards touch nothing; every promising card keeps its
            promise in ≥1 delve in 10
```

---

## 3. Things this container could not do — try them on the desktop

1. **Push tags.** The git proxy accepts `refs/heads/*` and rejects tag
   pushes *and* ref deletions (proven with a control: the same commit
   pushed fine as a branch, refused as a tag). So `v4.0`–`v4.4` exist
   only as local tags on your machine, if at all — the remote still
   shows `v1.0`, `v2.0`, `v3.0`. Run:
   `git push origin v4.0 v4.1 v4.2 v4.3` (and tag v4.4).
2. **Delete `tagtest-throwaway`.** A throwaway branch of mine is still
   on the remote and this container cannot delete a ref:
   `git push origin --delete tagtest-throwaway`
3. **Reach `vercel.app` and `github.io`** — both are blocked here (403
   on CONNECT), so no deployment could be verified from this session.
4. **Read the research corpora** — `C:\Dev` EmblemRoguelike and
   Megabase. See `RESEARCH_BRIEF.md` §3 for the specific questions.

---

## 4. If you merge and publish v4.4

Not done here, deliberately — it is an outward-facing action and the
previous four releases were each confirmed first. When you want it:

```
git checkout main
git merge --no-ff claude/monster-item-drops-wsc0sp -m "Merge v4.4 - watch the delve instead of reading it"
git push origin main
```

`package.json`, the in-app badge, `dist/` and `README.md` already say
v4.4. The README's version table marks v4.3 "superseded" — v4.0–v4.3
were never frozen at their own paths the way v1–v3 were, so if you want
`/v4.3/` archived, that has to happen before the merge.

---

## 5. House rules the next session must not skip

`CLAUDE.md` carries thirteen standing rules. The four that catch the
most in practice:

- **7 — no state change is silent.** Every observable field lives in
  `Chronicle.snapshotState` and has writing in `Chronicle.FIELDS`;
  `tests/silence.test.js` fails if a field can move unreported. This is
  now also what the cue layer reads, so it has teeth in two places.
- **8 — a new mechanic ships with its writing and its record.** A
  Renaissance magic system means prose, a Chronicle field, and coverage
  that both exist — not just a resolver change.
- **11 — a comparison that cannot fail is worse than no test.** Use
  `tests/helpers.js` `armsDiffer`; combat rolls come from the **global
  `Math.random`**, so pin it or measure a distribution.
- **12 — a mechanic nobody meets is not in the game.** `npm run census`
  walks 600 delves and flags anything under 5%. A gorgeous planetary
  correspondence table that the decision layer never consults will
  measure at zero, and this session watched exactly that happen to three
  separate mechanics.

**Tools:** `npm run census | assets | card <id> | calibrate [--write] |
bench | bless | e2e | new-card | mine`.
`npm run card <id>` prints its own 95% band — the default n=500 carries
about ±6 points of noise, so a single run is not a verdict.

---

*The previous handover (2026-07-15, the drops/trophies/audit session) is
in git history: `git show 48b2586:HANDOVER.md`.*
