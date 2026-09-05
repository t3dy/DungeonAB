# ROUGH EDGES

Papercuts, debt, and traps for the next session. Individually none of
these justify stopping for; collectively they are most of the friction.

Companions: `PROBLEMS.md`, `PERPLEXITIES.md`, `BALANCEISSUES.md`.

---

## R1. The committed log corpus dominates every diff

`src/public/logs/` is **2.2 MB and 121 files** — larger than all three
frozen builds (v1+v2+v3 = 2.0 MB) combined. It is regenerated wholesale
by `npm run simulate`, so any narrative change produces a commit touching
125+ files, and the three lines of real source change are buried.

Options nobody has chosen between: gitignore the corpus and generate it
in CI; commit a sample of ten rather than all 120; or accept it because
the whole point is that the logs are browsable at `/logs/` on the
deployed site.

---

## R2. `grep -rn ... src/` hits the frozen builds

`src/public/v1|v2|v3` contain minified bundles. A search for `.preps`
across `src/` returned **344 KB** of minified Three.js and had to be
re-run scoped. Always scope to the live directories:

```bash
grep -rn "pattern" src/agents src/encounters src/game src/narrative src/sim src/ui src/world
```

---

## R3. `CARRY_MARKERS` is hand-synced with prose and has broken twice

`Dramaturg.js` detects continuity by string-matching the prose. Both
times a carry line's wording changed, the marker silently stopped
matching and the probe reported a *worse* game:

- shortening the forced-formation line orphaned `came through the last room`
- the venom aside was a real carry the probe had never been taught

Caught both times by `tests/dramaturg`, which refuses a probe that fails
every real delve. **Rule: change a carry's writing, change its marker in
the same commit.**

---

## R4. Emoji vocabulary is colliding

🛡️ now means: a formation tell, Aegis of Ash, the party closing ranks,
*and* the point man taking the front. 🗝️ means both a found key and a
reading of the building. In a dense boss resolution the same glyph
appears three times meaning three things.

No test covers this. It is purely a reading problem and only visible in
the transcripts.

---

## R5. The dramaturg's probes are heuristic string matching

`reversal` greps resolutions for `/damage|worse|fails|gives way|explodes/`.
`roadNotTaken` greps deliberations for `might have chosen`. `continuity`
greps for eleven marker phrases. These work, and they are all one
rewording away from silently changing meaning (see R3).

The structural fields (`falls`, `wounds`, `events[].field`) are reliable;
the prose-matching ones are not. Probes should prefer structure where a
structural signal exists.

---

## R6. Three manual steps after any narrative change

```bash
npm run bless      # and READ the diff
npm run simulate   # regenerate /logs/ and the dramaturg's read
npm run margins    # only if payoffs moved
```

Forgetting `bless` fails the suite (fine). Forgetting `simulate` leaves
the published corpus describing a game that no longer exists (silent).
Nothing enforces the second.

---

## R7. Golden diffs are large for small changes

Any new `pick()` call shifts the whole seeded RNG stream, so adding one
line of writing can rewrite most of a golden — 107 insertions for the
first concision pass. The diffs remain readable but the signal-to-noise
is poor, and "read the diff before blessing" gets harder to actually do
each time.

---

## R8. `addScore` does not clamp, and only one caller guards it

`Party.addScore(n)` adds without a floor. The mastery band can subtract
(improvising costs 10 renown), and the guard against a negative running
score lives **at the mastery call site**, not in `addScore`. The next
subtractive effect will have to remember to write its own guard.

---

## R9. `resolveEncounterOption` recomputes what the caller already knew

`evaluateOptions` computes `depth` and `improvised` per option; the
resolver then recomputes both from scratch because `resolveRoomAction`
does not pass them through. The function accepts `opts.depth` for exactly
this and nothing supplies it. Two implementations of one rule, and they
can drift.

---

## R10. The census-style gates are seed-flaky in the full suite

Was: `tests/features.test.js` flaked once and never again — "if it appears
again it is real." It appeared again. Measured 2026-09-03 across four
consecutive full-suite runs: 41/1, 41/1, 40/2, 42/0 — the failures land on
`tests/prose.test.js` and `tests/features.test.js`, each of which passes
cleanly when run in isolation. Both walk many delves on the **unseeded**
global `Math.random`, and their sharp gates (an option "offered often and
never taken", a supply-state line reachable) sit close enough to their
thresholds that some seeds fall the wrong side. Text-only UI edits do not
touch this — the delve generation is unchanged — so it is measurement
noise, not a regression.

**The fix when it is worth doing:** seed these census walks the way
`bless.mjs` pins `Math.random`, so a gate that fails fails every run and a
green run means something. Until then: a single red run on prose/features
is not a regression on its own; re-run, and if it is green the tree is
clean. A *deterministic* prose failure (fails every run, fails in
isolation) is real and must be read.

---

## R11. Fixtures name specific magi, so pool changes break unrelated tests

The scarcity rebalance broke fixtures in `capabilities`, `providence` and
`townstate` — none of which are about the card pool — because they were
built from named characters with assumed capabilities. Gradient gates
broke three more the same way.

**Rule when this happens: fix the fixture party, never the rule.** It is
tempting to relax the assertion instead, and that is how a test stops
testing.

---

## R12. `npm run simulate` renumbers delves, so page URLs are not stable

Every delve is its own chronicle and calls itself Delve I, so the tool
renumbers across the corpus. That means `delve-0081.html` is a different
delve after every regeneration. Links into the corpus rot immediately.

Seeds are stable and printed on each page, so the content is
reproducible — but a URL is not a permalink.

---

## R13. `npm run calibrate` did not run on Windows at all

`ERR_UNSUPPORTED_ESM_URL_SCHEME`. The tool measures a candidate constant
by spawning a child that dynamically imports `mine.js`, and it built the
specifier as `C:/Dev/.../mine.js` — a bare drive path, which is not a
valid ESM scheme. Fixed with `pathToFileURL`.

Standing rule 10 is *"balance is measured, not judged"*. On the machine
this is developed on, the measuring half had never worked, and the
failure was buried in a spawned child's stderr where nothing surfaced it.

**Generalises:** any tool that spawns a child with a constructed path is
suspect on Windows. `tools/` has several.

## R14. Editing source while a long background job reads it

A `calibrate --write` run died with `ReferenceError: deliberationTurn is
not defined` because a `Narrator.js` edit landed between the declaration
and its use while the job was importing. Entirely self-inflicted.

**Rule: finish all source edits before starting a long measurement.**
Docs and tests are safe to edit during; anything under `src/` is not.

## R15. The game's loop does not run in a hidden Browser pane

**Status (v9.0, 2026-09-04): mostly gone.** The loop is a timer-paced
`async` walk now (`main.js` `runLoop` → `advanceRoom` → the
performance), and timers fire in a hidden tab (throttled to once a
second). What does not run hidden is the sprite tweening, which lives in
`requestAnimationFrame`; `IsoDungeonRenderer.settle()` snaps every
tween to its end as each beat closes, so a delve watched from a hidden
pane arrives at the right places with the motion missing, and the
chronicle is written regardless. Step still performs exactly one room.
The original entry follows.

`src/main.js` drives the crawl with `requestAnimationFrame`, which does
not fire while `document.visibilityState === 'hidden'` — and the Browser
pane is hidden whenever it is not fronted. A delve therefore appears to
*stall*: the room counter freezes, the chronicle stops growing, and the
Pause button still reads "Pause" because the simulator believes it is
running.

It looks exactly like a hung game. It is not.

**To verify a delve from a hidden pane, drive it with the `Step`
button** (or front the tab). Step advances one room per click and does
not depend on animation frames. Verified this way end to end on
2026-09-01: draft → muster → delve → victory → town at depth 2.

A secondary trap: `javascript_tool` calls that loop-and-sleep for more
than ~45s time out, but their side effects still land. The clicks happen;
only the reply is lost. Re-query state in a second short call rather than
assuming the batch failed.

## R16. `[^']*` in a cleanup regex ate 1,160 lines of Narrator.js

A negated character class matches NEWLINES. A regex meant to delete
five single-line table entries (`  crypt: '...',`) matched from the
first quote across a thousand lines to a distant `',\n`, and the file
still parsed afterwards, so `node --check` said nothing. Caught only
because a follow-up grep found PREDICAMENTS missing.

**Rules:** line-based edits for anything that matters; after any bulk
edit, check `wc -l` against expectations, not just the parser. Recovery
was `git checkout` + redoing the three intended edits — which is also
the argument for committing between surgical phases.

## R17. `npm run hub` flips the line endings of every published doc

`src/public/docs/` is generated: `tools/build-hub.mjs` copies the source
markdown verbatim. `.gitattributes` normalises `*.md` to LF everywhere —
except `src/public/**`, which is pinned `-text` so the frozen v1/v2/v3
builds keep the bytes they shipped with. Published docs are caught by
that exemption without being shipped artifacts.

So the copies keep whatever bytes the copier's working tree held, and
regenerating from a checkout whose sources are CRLF rewrites all 36 of
them. Running `npm run hub` from a correct LF checkout on 2026-09-04
flipped `DUNGEON_CANON`, `RESEARCH_BRIEF`, `ROGUELIKE_ROADMAP` and
`THEME_DESIGNS` back to LF — 1,100 lines of diff that changed no words.

Harmless to the site, and pure noise in review, which is the problem: a
diff nobody can read is a diff nobody reads.

**Wanted:** either narrow the exemption to the frozen builds
(`src/public/v*/** -text`) so generated docs normalise like the rest, or
have `build-hub.mjs` write LF explicitly. The first is one line and also
stops the next generated thing under `src/public/` inheriting the
problem.

**Status (2026-09-04, v8.2): fixed the first way.** `.gitattributes` now
exempts only `src/public/v*/**`; generated docs normalise to LF like the
rest. The one-time renormalisation of the published copies rode in the
v8.2 release commit, and `npm run hub` from any checkout now yields a
diff that is only words.
