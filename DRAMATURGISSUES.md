# DRAMATURG ISSUES

Problems with the critic itself — `src/narrative/Dramaturg.js`, the module
that reads generated transcripts against a house poetics and reports what
the mechanics are failing to give the writing.

Kept separate from `PROBLEMS.md` because these are defects in the
*instrument*, and an instrument's defects contaminate every finding taken
with it. Everything the dramaturg has ever reported should be re-read
against this list.

Gate: `tests/dramaturg.test.js`. Corpus: `npm run simulate`.

---

## D1. It became an optimisation target within one session

The nine values were written to judge logs. Within the same session they
were the acceptance gate for narrative work, and changes were made
specifically to move them:

| value | before | after | what moved it |
|---|---|---|---|
| concision | 96% miss | 21% miss | a prep budget + two prose trims |
| mortalityEarned | 85% miss | 64% miss | naming the point man |
| protagonist | 23% miss | off the list | the same change |

Goodhart's law in about forty minutes. The numbers went where they were
pushed. **Whether the transcripts got better is a separate claim and
nobody has checked it**, because the only reader is the thing being
optimised against.

The mitigation in `tests/dramaturg` catches probes that are *broken*. It
cannot catch a probe that works correctly and measures the wrong thing.

---

## D2. Two probes shipped reporting catastrophes that were parser bugs

Both looked like devastating findings about the writing:

- **`protagonist`, 100% of delves**: "nobody in the party is named." The
  roster is stored as `"✨ Simon Forman (cleric)"` and the prose says
  `Simon Forman`; the name parser stripped neither icon nor class, so no
  name ever matched.
- **`rationing`, 100% of delves**: it asked whether a room carried *any*
  beat — always true — instead of whether one room stood above the
  others. A perfectly-rationed profile of `1,2,2,1,1,2,3,2,1,1,1,6`
  failed.

Both were caught only by looking at the raw data by hand. `tests/dramaturg`
now refuses any probe that fails every real delve, which would have caught
both — but that guard has an explicit exception list (`UNIVERSAL`), and an
entry in it is a probe declared correct by argument rather than by test.

---

## D3. Five probes are string-matching prose that changes underneath them

`reversal` greps `/damage|worse|fails|gives way|explodes/`.
`roadNotTaken` greps `might have chosen`. `continuity` matches eleven
hand-maintained `CARRY_MARKERS`. `concision` measures raw character
length. `specificity` tests for the presence of a digit.

`CARRY_MARKERS` has broken **twice**, both times by an ordinary prose
edit:
- shortening the forced-formation line orphaned `came through the last room`
- the venom aside was a real carry the probe had never been taught

Structural signals exist for some of this (`falls`, `wounds`,
`events[].field`) and are reliable. The prose-matching ones are one
rewording from silently changing meaning, and the failure mode is always
the same: the game looks worse than it is.

---

## D4. `concision`'s caps have been raised twice under pressure

The probe now carries three thresholds: 650 characters for a fight, 400
for a situation, 320 for anything else. Both raises had a structural
argument — a fight legitimately shows three card promises; a situation
now says three earned things (outcome, grading, what it taught).

But the pattern is uncomfortable. A cap raised whenever it fails is a cap
that measures nothing, and this one has been raised each time new content
was added to the room type it governs. The stated principle — *the cap
tests that the editor ran, not whether the budget is right* — is sound,
and is also exactly what someone would say while quietly moving a
goalpost.

---

## D5. `mortalityEarned` fails a whole delve for one anonymous death

The probe fails if **any** fall is of somebody unnamed earlier. In a
total party kill three or four people die in the same room, and the back
rank frequently has no prior line. So a wipe fails almost automatically.

Aggregate: 97 deaths of somebody met, 45 of a stranger — 68% met, which
reads far better than the 64%-of-delves-fail headline.

Weakening it to a share would make the number look better and would be
scoring the test to the result. Leaving it means the headline overstates
the problem. Neither is obviously right.

---

## D6. Nobody has read fifty transcripts as a reader

The corpus at `/logs/` is 120 delves. It has been read by: a set of
regex probes, and a human spot-checking two or three pages for rendering.

Every claim about whether the writing is *good* currently rests on
proxies. The poetics is a hypothesis with a test suite attached, and the
experiment that would validate it — a person reading a stratified sample
and saying which logs they would tell someone about — has not been run.
