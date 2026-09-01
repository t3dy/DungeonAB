# DATA CONTRACTS — PROPOSALS

Ranked options per contract in `DATACONTRACTS.md`. Recommendation ★.

---

## For C1 — snapshot / FIELDS / save, third leg ungated

**★ Option 1: gate it only if the save becomes real.**
The contract is currently vacuous because nothing restores a party
(`ARCHITECTURE.md` A2). Resolve A2 first: if the answer is "archive
only", this contract *should not* exist and the audit check should be
retired. Gating a round trip that never happens is ceremony.
*Cost:* none now; decision-blocked.

**Option 2: gate it anyway.**
A `tests/contract` asserting the three structures agree, with the excuse
list from `tools/audit.mjs` made explicit. *Cost:* small. *Risk:* locks
in a contract before deciding whether it is wanted.

---

## For C2 — CARRY_MARKERS hand-synced with prose, broken twice

**★ Option 1: emit the marker from the mechanic.**
Effects that reach forward set `result.carriedFrom = <turn>`; the
Chronicle records it; `continuity` counts structural facts and the
eleven-phrase table disappears. Kills the whole contract rather than
policing it. *Cost:* touching each forward-reaching effect (six).
*Risk:* low. Same as `DRAMATURGISSUESPROPOSAL` D3 Option 2 — one change
retires two entries.

**Option 2: keep the table, add the reverse check.**
The audit finds markers with no prose; it cannot find prose with no
marker. A test could assert every `party.<flag> = true` site has a
corresponding marker. *Cost:* small, fragile, still hand-synced.

---

## For C5 — card promises, with an escape hatch at two exceptions

**★ Option 1: leave the rule, watch the count.**
Two documented exceptions (`alchemy: 3`, `concision: UNIVERSAL`). Both
are argued and evidenced. A **third** should trigger asking whether the
rule is right rather than adding a fourth. *Cost:* none; this is a
tripwire, not a task.

**Option 2: require exceptions to carry an expiry.**
Each names a condition under which it should be revisited. *Cost:* small.
*Risk:* expiry dates nobody honours are worse than none.

---

## For C6 — additive-not-multiplicative as an architectural contract

Nothing to fix; this is the entry that worked. **★ Recommended action:
generalise the pattern deliberately.** When a new effect must compose
with existing prose that states its own numbers, prefer an additive
effect with its own sentence over adjusting someone else's figures. It
made the gradient-gate change composable with 86 options without editing
any of them, and no test could have been written that would have caught
the alternative as reliably as the shape did.

---

## For C7 — MINING_REPORT stale against the mastery band

**★ Option 1: re-run `npm run bench` and read the drift.**
Cheap, and it is the outstanding item from `BALANCEISSUES.md` B7.
*Cost:* one long tool run.

**Option 2: extend the stamp to cover score baselines.**
The report currently stamps `STAT_SCALE`, which guards the constant and
not the outcome. Stamping a score baseline would have caught this.
*Cost:* small. *Risk:* a second thing that goes stale and fails builds
for benign reasons — only worth it if score baselines start mattering.
