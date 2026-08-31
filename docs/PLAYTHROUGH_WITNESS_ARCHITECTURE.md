# PLAYTHROUGH_WITNESS_ARCHITECTURE.md

**Date**: 2026-08-31. **Question**: how a completed MORIGNY playthrough becomes a
permanent, editable *scholarly witness* — a stable URL Ted can send to Matt
Melvin-Koushki, where Matt (and players, as a distinct hand) can edit generated text
and add marginalia, without ever touching the simulation's mechanical record.

**Method**: the DungeonAB repository was read as the primary engineering reference —
`DEPLOY_STATE.md`, `vercel.json`, `package.json`, `src/game/Chronicles.js`/`Archive.js`
on `main`, and the MORIGNY tree (`src/engine/chronicle.js`, `stemma.js`, `state.js`,
`main.js`) on `morigny-only`. Every claim below about existing code was verified by
reading it, not recalled.

---

## Part 1 — What DungeonAB actually implements (the ten questions)

An honest inventory matters more than a flattering one, so: **DungeonAB ships no
publish/edit backend.** Its own `DEPLOY_STATE.md` states it plainly: *"None. No
backend, no API key, no secret. All state is client-side (localStorage: run history,
archive, chronicles, player packs)."* What DungeonAB proves is the **front half** of
the pipeline (chronicle generation, run recording, static Vercel deployment) — the
back half (persistence, URLs, editing) exists as design and as localStorage
structures, not as hosted infrastructure. The answers below say which is which.

1. **How a completed playthrough becomes a persistent record** — At run end the game
   folds the run into localStorage: DungeonAB main keeps run history + chronicles;
   MORIGNY (`stemma.js`) is more advanced — every finished run is saved as a
   **witness** in a stemma (tree of descent), assigned a real editorial **siglum**
   (A, B, C … then lowercase for contaminated witnesses), inheriting the previous
   witness's corruptions and adding its own. *Persistent to that browser only.* No
   server round-trip exists anywhere in either tree.

2. **What data format is stored** — Plain JSON. MORIGNY's witness object is the
   day-journal plus outcome flags: `{ seed, journey, prayed, night, dream,
   confession, officesKept, talked, licentia, corrupt, suspicion, despair,
   disposition, at }`. Crucially this is **seed + decisions, not prose**: the house
   culture is seeded determinism, so narrated text can be *regenerated* from the
   seed by the same code. The chronicle meta-record (`chronicle.js`) is aggregate
   counters (`days, renown, disposition, examined`) driving the 1323 summons.

3. **Where it is stored** — `localStorage` keys `morigny-witnesses`,
   `morigny-chronicle` (MORIGNY); analogous keys on DungeonAB main. Nowhere else.

4. **How the public URL is generated** — It isn't. The only public URLs are the
   deployed games themselves (`dungeon-ab.vercel.app`, Pages mirror). A witness has
   no URL; it lives and dies with one browser profile.

5. **How the editing URL/authentication works** — No such mechanism exists in
   either tree. (DungeonAB's `CardEditorUI.js` is an in-game content editor for
   local card packs — an authoring tool, not a shared-document system.)

6. **How edits are persisted** — They aren't, beyond localStorage overwrites with
   no history.

7. **How public and editor views differ** — No published view exists. The nearest
   thing is MORIGNY's in-game stemma display of local witnesses.

8. **How deployment on Vercel is configured** — This part is real, proven, and
   exactly the pattern to keep: a **static Vite build** with a five-line
   `vercel.json` (`framework: vite`, `outputDirectory: dist`), auto-deploy on push
   to `main`, GitHub Pages as mirror via one workflow, and a single documented
   gotcha (the Pages base-path env switch). No env vars, no functions, no ops.

9. **Reusable for MORIGNY's witness system** —
   - The **witness/stemma data structures and sigla** (`stemma.js`) — the published
     witness is the same object, elevated from localStorage to a URL.
   - The **event-record habit**: `john.log[]` and the day-journal already separate
     *what happened* from *how it is narrated*.
   - The **Vercel static deployment pattern** verbatim (vercel.json, auto-deploy).
   - The **golden-chronicle testing culture** (DEPLOY_STATE: seeded runs whose
     whole prose is pinned) — reused as payload-shape tests for the witness.

10. **NOT to be copied, because a scholarly witness has different requirements** —
    - **Seed-regenerable prose.** DungeonAB may regenerate narration from
      `seed+choices` at view time; a witness for scholarly correction must
      **freeze the generated text verbatim at publish time**. Matt corrects what
      the game *said on that date*; later engine changes must not silently rewrite
      the document under his comments. The witness snapshots prose; the seed is
      kept as provenance, not as the text's source of truth.
    - **localStorage as the system of record.** Fine for play; fatal for "send the
      URL to Matt."
    - **Mutable overwrites.** The witness needs layered, attributed, reversible
      edits — original text always recoverable (§4).
    - **The versioned-archive habit** (`/v1/ /v2/` frozen builds) is solved at the
      *data* level here (frozen payloads), not by freezing site builds.

---

## Part 2 — MORIGNY's current chronicle/event architecture, mapped

The conceptual model required:

```
game state → immutable event record → generated witness → editorial layers → published witness
```

What exists today, in those terms:

| Layer | MORIGNY today | Status |
|---|---|---|
| game state | `createJohn()` — meters, purity, procedure, items | ✅ sound |
| immutable event record | `john.log[]` + day `journal` (flags/choices) + `seed` | ◐ exists, but the day's **narrated lines are not captured into it** — they go to the screen and are lost |
| generated witness | `stemma.js` witness w/ siglum, descent, corruptions | ✅ exists (locally) |
| editorial layers | — | ✗ absent |
| published witness | — | ✗ absent |

So the two genuinely missing pieces are (a) capturing narrated prose into the
journal so the witness contains its own text, and (b) the publish/editorial layer.
Everything upstream already matches the target model — this is an elevation of the
existing architecture, not a replacement. (The same layered model was independently
converged on this week for the Ibn Turka career sim in `TurkaGame/CareerSim` —
its published payload snapshots full encounter text with grounding tags. The two
games should share the witness *format contract*, not code, per house rules.)

## Part 3 — Storage decision (with the honesty the choice requires)

**Nothing server-side is "already proven in DungeonAB"** — so the rule *"if Blob is
the proven solution, use it"* resolves to: choose the lightest thing that meets the
requirements, and justify it.

| Requirement | Vercel Blob | Vercel KV/Redis | Postgres/Supabase |
|---|---|---|---|
| No conventional database | ✅ files of JSON | ◐ a database in spirit | ✗ |
| Zero manual ops after setup | ✅ | ✅ | ◐ schema, policies |
| Fits "one JSON doc per witness, read-mostly" | ✅ exactly | ◐ | overkill |
| Survives without maintenance | ✅ | ✅ | ◐ |
| Cost at this scale | free tier | free tier | free tier |

**Decision: Vercel Blob** — one JSON file per witness, written and read by three
tiny serverless functions living in the same Vercel project as the static game.
No framework change: the game remains the existing static Vite app; `api/*.mjs`
files sit beside it and Vercel runs them as functions automatically. This is the
*smallest possible* extension of DungeonAB's proven deployment pattern: same
vercel.json philosophy, plus one storage primitive and one secret that Vercel
itself provisions (§6). A conventional database is not necessary and is not used.

## Part 4 — The witness data format

One JSON document per witness, at Blob path `witnesses/{id}.json`. The document has
an **immutable core** (never modified after publish) and **editorial layers**
(append-only). Editorial changes can never alter mechanical state because the
mechanical record and the editable surfaces are different fields — the API only
accepts writes into the layers.

```jsonc
{
  "v": 1,
  "id": "w_k7Qp…",             // unguessable, in the public URL
  "game": "morigny",            // format shared with "ibn-turka-occult-court"
  "siglum": "A",                // stemma identity, from the local witness
  "parent": null,               // witness id this one descends from → future branching/forking
  "createdAt": "2026-08-31T…",

  // ---- immutable core: the record + the generated text, frozen ----
  "mechanical": { "seed": 1234, "journal": { …flags/choices… }, "outcome": { …suspicion, corrupt… } },
  "narrative": [                 // the day, as the game actually narrated it
    { "i": 0, "kind": "bell", "text": "Matins. The cold is a fact…" },
    …
  ],

  // ---- editorial layers: append-only, attributed, hand-tagged ----
  "keys": { "playerHash": "sha256…", "scholarHash": "sha256…" },  // never the keys themselves
  "revisions": [                 // text edits; original always recoverable
    { "ts": "…", "anchor": 3, "old": "…", "new": "…", "author": "MMK", "hand": "scholar" }
  ],
  "marginalia": [                // comments/corrections beside the text
    { "ts": "…", "anchor": 3, "text": "The office at this hour would be…", "author": "MMK", "hand": "scholar" }
  ],
  "preface": { "orig": "", "current": "", "hand": null }
}
```

Design points, mapped to the requirements:

- **Original text recoverable** — `narrative[].text` is never overwritten; the
  *current* reading of a line is `narrative` + latest revision for that anchor.
  The viewer renders the current text; a click shows the original and the chain.
- **Hands are identified by which key made the edit.** Publishing mints **two**
  secret keys: a *player key* (kept by the run's author) and a *scholar key* (the
  one Ted sends Matt). The API stamps `hand: "player"` or `hand: "scholar"` from
  the key used — players get the same rich edit+marginalia powers, but the two
  hands are never confusable in the record.
- **Scholar edits are high-priority editorial signal.** Every narrative line
  carries provenance to its source (for MORIGNY: the stage/beat; for Turka: the
  `encounterId`). Because scholar-hand revisions/marginalia are structured and
  anchored, a reviewer endpoint (`/api/feedback`) can list **all scholar-hand
  changes across all witnesses, grouped by source beat/encounter** — Ted's inbox
  for "Matt corrected this choice; consider rewriting/re-mechanizing it in the
  game." (Slice 2; the data model supports it from day one.)
- **Branching/forking later** — `parent` + `siglum` already express descent;
  forking a witness is "new id, parent set, layers empty." Not implemented now.
- **Not an admin database in public** — the public page is a continuous readable
  document in the game's manuscript aesthetic (marginalia in the margins, hands
  distinguished typographically, sigla in the header); no tables, no forms beyond
  a quill button in edit mode.

## Part 5 — The smallest viable slice

**Goal: complete one MORIGNY playthrough → receive a URL to send Matt.**

In scope (and nothing else):
1. Capture narrated lines into the journal during play (~5 lines in `main.js`).
2. A **Publish this witness** action at day's end: POST the payload → get back the
   public URL + both secret edit URLs (shown once, with copy buttons).
3. `api/publish.mjs` (validate, mint id + two keys, store hashes, write blob) and
   `api/witness.mjs` (read blob, strip hashes, return JSON).
4. `w.html` — the public witness page: continuous document, header (siglum, date,
   outcome), the narrated day with mechanical outcome footer. Read-only.
5. Deploy as one Vercel project (static game + the two functions + Blob store).

Deliberately **out** of the slice (next slices, in order): the editor UI (edit +
marginalia, using the already-minted keys), the scholar-feedback inbox, revision
history view, stemma-aware publishing of descent chains, Turka-side adoption.

## Part 6 — What Ted has to do in Vercel (all of it)

Vercel CLI on this machine is already logged in as `tedhand-2181`; the agent can
run the deploys. The one thing that may need a human click, in plain terms:

1. **Nothing before first deploy** — the agent runs `vercel` to create the project
   (same as dungeon-ab was created).
2. **Connect storage once**: Vercel dashboard → the new project → *Storage* tab →
   *Create → Blob* → accept defaults. This mints the single secret
   (`BLOB_READ_WRITE_TOKEN`) into the project automatically. No values to copy,
   nothing to paste anywhere. (If the CLI's `vercel blob store add` works under
   this account, the agent does even this and step 2 disappears.)
3. **After that: nothing.** Publishing, reading, and editing all run through the
   deployed functions. No dashboards to tend, no database to migrate.

## Part 7 — The researcher's desk (Ted's dashboard)

Requirement added 2026-08-31: a private interface for Ted over **all** witness data
— simulated runs (the house `mine`/`census` tools already mass-generate runs),
player runs, and Matt-reviewed runs — with comments, sortable and filterable by
theme/type/entity for relational browsing and data mining.

**The data model above already supports it; the dashboard is a consumer, not a new
architecture.** What it needs designed in from day one (and therefore included in
the slice-1 payload):

- `origin: "played" | "simulated"` on every witness — the mining tools publish
  through the same `/api/publish` endpoint with `origin: "simulated"`.
- Facet-bearing fields already present: `game`, `siglum`, `parent`, `createdAt`,
  `mechanical.outcome.*` (suspicion, corrupt, disposition…), per-line source
  anchors (beat/encounterId), and every editorial layer's `hand` + `author`.
- At publish time the API also writes a tiny **summary row**
  (`index/{id}.json`: id, game, origin, siglum, createdAt, outcome digest,
  counts of revisions/marginalia by hand) so the dashboard can list thousands of
  witnesses without downloading full payloads.

**The desk itself (Slice 3)**: a private static page (`desk.html`, reached only by
Ted's own secret admin key) + `api/index.mjs` (lists summary rows from Blob) —
filter chips by game / origin / hand-activity / outcome facets / phase / encounter;
click-through to any witness; and the **scholar-priority view**: every scholar-hand
revision and marginale across all witnesses, grouped by the encounter/beat it
corrects, newest first — the queue that feeds rewrites of the game's own content.
Sorting/filtering is client-side over summary rows (fine into the thousands); no
database enters the system.

Slice order stands: **1** publish+public witness (this build) → **2** editor
(edit+marginalia with hands) → **3** the desk + scholar-feedback queue →
**4** stemma descent publishing, forking, Turka adoption of the shared format.
