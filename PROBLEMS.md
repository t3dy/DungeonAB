# PROBLEMS

Things that are wrong, or right but not finished. Each entry says what is
broken, how it is known to be broken, and what state it is in. Written as
work proceeds rather than at the end, because the ones that get forgotten
are the ones that looked small at the time.

Companion files: `PERPLEXITIES.md` (open questions I cannot resolve),
`BALANCEISSUES.md` (measured numbers), `ROUGHEDGES.md` (papercuts).

---

## P1. Two worlds share one resolver, and things leak between them

**Status: one leak found and fixed; the class is open.**

Town encounters and dungeon situations both route through
`resolveEncounterOption`. That is good design — a capability means the
same thing in both places — but every side effect written for one world
silently applies to the other. Found by direct probe: consulting the
**town astrologer granted `wayIn`**, a reading of how a dungeon is built,
earned in a tavern before the delve began. Fiction backwards, and a free
resource banked in advance.

Fixed with `ctx.type !== 'town'`. But that is a patch on one symptom.
Nothing structurally prevents the next dungeon-shaped effect from
reaching town, and the mastery band currently *does* apply in town, which
may or may not be intended (see PERPLEXITIES Q4).

**Wanted:** a declared scope on effects, or two resolvers sharing a core.

---

## P2. Deaths in a wipe are still deaths of strangers

**Status: improved 85% → 64%, residue is structural.**

`Party.pointMan()` fixed the common case — the party's most exposed
member is now named before the room that kills them. But when a party
wipes, three or four people die in the *same room*, and the back rank has
usually never been named. The dramaturg's `mortalityEarned` fails a delve
if **any** death is unmet, so a single anonymous casualty in a wipe fails
the whole log.

Measured across 120 delves: 97 deaths of somebody the reader had met, 45
of a stranger. The strangers are overwhelmingly wizards and clerics dying
in the last room of a losing delve.

**Not fixed because the honest fix is not obvious.** Naming everyone
pre-emptively would be padding. Weakening the probe to a share rather
than a floor would be scoring the test to the result, which is the one
thing this codebase has repeatedly refused to do.

---

## P3. Continuity is wired, rare, and probably needs sources not plumbing

**Status: open, 82% of delves miss it.**

The dramaturg wants two rooms per delve that answer an earlier room. The
wired carries — `forcedFormation`, `starBlessed`, `forewarned`, wounds,
poison, the alarm — fire about once a delve between them. The plumbing
works; there simply are not enough things that reach forward.

**Wanted:** more effects whose consequence lands in a later room, not
better wiring of the existing six. Candidates nobody has built: a monster
that follows the party, a debt owed to something that let you past, a
theft the dungeon notices later, weather/flooding that advances.

---

## P4. The access levers are opportunity-bound

**Status: works as content (20% of delves), fails as a draft signal.**

`wayIn` opens a keyless locked wing or deduces a missed secret door. But
a delve holds only ~0.33 locked wings and ~0.68 secret ones, and even a
narrow party earns 1.10 readings. So the resource saturates against
opportunity: grants are draft-sensitive (1.10 narrow / 1.44 broad),
spends are flat (0.17 / 0.19).

Adding more locked content costs room budget, which is zero-sum and
already fully allocated (DESIGN_DIALOGUE §N). So this lever cannot be
scaled the obvious way.

---

## P5. Fallback options keep dying, and will die again

**Status: patched three times; now table-driven; the cause is structural.**

Every change that makes skilled options more attractive pushes the blunt
answer under the `tests/prose` floor (offered 40+, taken <3%):

1. honouring `opt.weight` killed `push-past-duellist`
2. adjacency killed `put-it-down`
3. the same change killed `endure-discord`

Now consolidated into `BLUNT_ANSWERS` in `RoomEncounters.js`, with eight
options listed. **This will recur** every time option availability or
weighting changes, and the table has to be extended by hand each time.
The signal is reliable (tests/prose catches it) but the fix is manual.

**Wanted:** fallbacks weighted by a rule rather than a lookup — e.g. the
blunt answer's pull scales automatically with how many skilled options
are on the menu beside it.

---

## P6. Six mechanics are met by under 5% of delves

**Status: known, unaddressed. From `npm run census` at 600 delves.**

- locked wing refused
- cold camp
- cornered (no third retreat)
- lamp oil cooked
- bribe
- turn undead

Standing rule 12 says a mechanic nobody meets is not in the game. Each of
these is built, tested, and written. Either the decision layer cannot see
them, or their preconditions are too narrow, or they want cutting. Nobody
has gone through them one at a time.

`turn undead` is the most galling: it is a whole class's signature move.

---

## P7. Score inflation from the mastery band is unreconciled

**Status: open, probably harmless, unverified.**

The mastery band (§Q) adds up to +25 renown per situation, ~2.75
situations a delve, so a mastering party can gain ~50 renown a delve on
top of a ~390 baseline — up to 13% inflation, concentrated on good
drafts (which is the point).

But `MINING_REPORT.md` and the calibration constants were measured
before this existed. Nothing in `tests/balance-gate` reads score (it
gates win rate), so nothing failed — which means nothing checked either.

**Wanted:** `npm run bench` re-run and the report re-stamped, with a
decision about whether score baselines matter.
