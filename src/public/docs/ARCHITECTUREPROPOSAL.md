# ARCHITECTURE — PROPOSALS

Ranked options per entry in `ARCHITECTURE.md`. Recommendation ★.

---

## For A1 — town/dungeon effect leakage

See `BUGSPROPOSAL.md` B1. **★ Declared effect scope** is the recommended
line for both, and it also answers the open question of whether the
mastery band should apply in town — it forces someone to write down which
scope it is in.

---

## For A2 — the write-only persistence layer

See `BUGSPROPOSAL.md` B2. **★ Decide it is an archive and make the code
say so.** The deciding question is a product one: *should closing the tab
mid-campaign lose the party?* If yes, delete the phantom; if no, it is a
feature, not a bug fix, and should be scoped as one.

---

## For A4 — Simulator is accumulating narration policy

**★ Option 1: move composition into the Narrator, pass it what it needs.**
The prep editor, mastery line and `wayIn` line live in `Simulator._tick`
only because they need `result` before composition. Give
`composeResolution` the whole result and let it own all three.
*Cost:* moderate; a clean seam already exists. *Risk:* low.

**Option 2: a `Narration` module between them.**
Takes `(room, result, party, state)` and returns the finished beats.
Simulator keeps mechanics, Narrator keeps sentences, the new module keeps
policy. *Cost:* real refactor. *Risk:* a third home for logic that is
currently in two.

**Option 3: leave it, add a comment marking the boundary.** *Cost:* none.
Acceptable while the file is still legible; revisit when the next
cross-cutting effect lands.

---

## For A5 — thirty exports nothing imports

**★ Option 1: walk the list once, in one sitting.**
Delete genuine leftovers (`biasValue`, `drawMinimap`, `capabilityChips`
look like candidates), and add a one-line comment to the deliberate
extension points (`registerTheme`, `registerNatures`,
`registerMonsterTiles`) saying they are public API with no consumer yet.
Then the audit's count means something. *Cost:* an hour. *Risk:* low —
tests catch a wrong deletion immediately.

**Option 2: leave and let the audit report it.** *Cost:* none. *Risk:* a
list nobody acts on trains the reader to ignore the audit.

---

## For A6 — frozen builds inside `src/`

**★ Option 1: leave them, keep `LIVE_DIRS` as the search convention.**
They are served from there by design (`DEPLOY_STATE.md`). The cost is
purely searching, and the convention is now written down in two places.
*Cost:* none.

**Option 2: move to `public-archive/` and adjust the build.**
Cleaner tree. *Risk:* touches deploy config for two hosts, which
`DEPLOY_STATE.md` explicitly warns about. Not worth it for grep hygiene.
