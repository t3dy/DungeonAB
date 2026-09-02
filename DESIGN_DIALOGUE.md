# Draft vs. Dungeon — a design conversation

*A narrative designer (**NARR**) and a TCG designer (**TCG**) discuss how
interesting stories emerge from draft decisions, grounded in measured
outcomes from the current build. Companion document to `AUDIT.md`; both
feed the ground-up asset redesign.*

**Method note.** All win rates below are from headless simulation, 200
seeded runs per configuration, single delve, `medium` difficulty unless
stated. The harness lives in the session scratchpad; configurations are
built from the real card pool.

---

## 1. What actually keeps a party alive (the measured hierarchy)

**TCG:** Before we talk stories, let's be honest about the math, because
the math *is* the draft. I ran the compositions:

| Draft shape | Win % | Avg survivors |
|---|---|---|
| 5 characters, zero kit | **100%** | 4.8 |
| 4 characters + 3 equipment + 2 spells | 100% | 3.8 |
| 4 characters, no cleric | 92% | 3.0 |
| 3 characters + the best bomb item (Wand of Embers) | 64% | 1.5 |
| 3 characters + a plain equipment card | 42% | 1.0 |
| 2 characters + *everything* (heavy kit, spells, wand) | 55% | 1.0 |

And the control experiment — can items ever close a body gap?

| | Medium | Nightmare |
|---|---|---|
| 5 characters, plain | 100% | 32% |
| 4 characters + Wand of Embers + Holy Symbol (two bombs) | 99% | **24%** |

**TCG:** So the pivotal decision hierarchy, in order:

1. **Bodies.** A character is worth more than any item in the pool,
   at every difficulty. Two bomb items together do not equal one body.
   The reason is structural: `Party.takeDamage` spreads damage across
   health pools, `combatAttack` sums the front five attackers, and
   between-room attrition (venom, traps, disasters) is paid in health
   that only bodies provide.
2. **The cleric tax.** A cleric is worth ~7 win points (99% vs 92%) —
   and more than that on venomous/ethereal themes, because three
   separate systems (poison linger, ethereal ×0.6 steel, turn-undead)
   all check `hasClass(CLERIC)`.
3. **Bomb items.** On a small party, the Wand of Embers is worth +22
   points (64% vs 42%). Class-keyed items are the only equipment with
   first-pick energy — exactly the "rare worth first-picking" case.
4. **Spells.** Heal and combat spells are roughly equal value (98% both)
   but produce different *shapes* of run — combat spells generate more
   trophies (3.0 vs 2.8), heal spells more survivors.
5. **Personalities.** The wildest swing in the pool, and it's asymmetric —
   see §3.

**NARR:** Which is a story problem, because the game's own pillar says
*"Five characters and no gear? A mob. Two characters buried in kit? A
small elite. Both are viable, both tell different stories."* The second
story is currently a 55% coin flip told by one survivor. The draft has
a solved first line — take bodies until you have four — and a solved
draft is a draft without drama. Pillar 1 says picks should be
*agonizing*. Nobody agonizes over a solved pick.

---

## 2. Where the stories actually live

**NARR:** Here's what I care about: a story crops up when the player
makes a decision whose consequences they can *narrate afterward*. "I
took the wand over the third fighter, and in the boss room the wand was
the whole fight" is a story. "I took the fourth character like always"
is a shopping list. The draft generates stories exactly at the points
where the math is *close*.

**TCG:** Right, and the measurements tell us where the math is close
today: it's close between kit pieces *after* the body floor is met.
Cleric-vs-rogue at seat four. Wand-vs-heal-spell at pick six. The rich
decisions exist — they're just all in the mid-draft, never at the top.

**NARR:** The dungeon side has the same structure. The pivotal run
decisions are personality-weighted, not player-made — the player's real
lever is *composition*: drafting a cleric is really drafting "the venom
subplot always resolves"; drafting a rogue is drafting "trap rooms are
scenes instead of tolls." The draft is where the player writes the
promises; the dungeon is where the game keeps them. That's a good
narrative machine! It's the promise-keeping that must stay legible —
which the new descriptive narration finally makes visible ("the cleric
cures the poison before it can act" = a drafted promise, kept).

**TCG:** So the redesign target isn't "make the dungeon harder" or
"make items stronger" uniformly. It's: **move real decisions to the top
of the draft, and make each viable line produce a different, visible
run-shape.** Both-viable isn't a balance nicety — it's the story
generator.

---

## 3. The Craven discovery — systems accidentally telling a story

**TCG:** The strangest number in the sweep: the Craven personality is a
*trap pick* — 62% wins vs 83% baseline, and only 0.8 trophies against
2.1. Mechanically: Craven weights flee/sneak up, so the party skips
fights; skipped fights mean no drops (the new drop economy pays only on
kills); no drops means no trinkets, coatings, or potions; so the party
that avoids danger gets progressively weaker relative to a dungeon that
doesn't care. They also grind (19.8 rooms per run vs ~13 — endless
retreat-and-retry loops) and die anyway.

**NARR:** That is — accidentally — the best story in the game.
*Cowardice compounds.* The party that won't fight can't grow, and the
chronicle shows it: an empty trophy case at the wipe. I want to keep
that arc. What I don't want is for it to be a secret rules-trap the
player only discovers by losing.

**TCG:** Agreed, with a TCG framing: trap picks are fine **only if
they're telegraphed and priced**. The Blade of the Adder already does
this correctly — the curse is printed on the card and the AI drafters
flinch from it, so it wheels to players who *choose* the gamble. The
Craven card should carry its price the same way ("fights avoided pay no
spoils") — and its hidden upsides (tripwire-spotting, secret-door
counting, smoke bombs) should be printed too, so picking it is a
legible wager, not a rug-pull. Same audit lens for every personality:
**every archetype needs a printed cost and a printed edge, and the
drop economy is now part of both.**

**NARR:** Generalize that: the drops system quietly re-priced *every*
existing card and archetype the day it shipped. Greedy got better
(fights pay). Craven got worse. Sneak-heavy rogue builds got worse
(sneaking past a monster now has an invisible opportunity cost — the
foregone drop). Nobody re-read the old cards in the new light. That's
the "designs paying attention to each other" failure in miniature, and
it's the pattern the audit found everywhere.

---

## 4. Making the top of the draft interesting again

**TCG:** Directions, not features — this is the redesign brief:

- **Price bodies honestly.** If a 5th body is always right, the pack
  must make it cost something real: fewer characters per pack in later
  rounds, or characters whose stats trade against party-wide effects.
  The guaranteed-coverage rule (≥2 characters per pack) protects floor,
  not ceiling — keep it, but coverage shouldn't mean *surplus*.
- **Let kit scale with smallness.** The elite-duo fantasy needs a
  mechanical spine: class-keyed items and spells could care about
  party size (a wand in a duo's hands vs a mob's), the way corridor
  frontage already caps mob attack at five blades. The frontage rule
  proves the sim can express "small and dense beats wide and thin" —
  today only the *penalty* half of that idea exists.
- **Rarity as event.** The wand's +22 points is first-pick equity —
  make such cards visibly rare (one bomb per draft, not per pack) so
  "do I take the rare over the body?" happens once per draft with real
  stakes, and gets remembered.
- **Draft against a visible dungeon.** The biggest untapped connection:
  the theme is rolled *after* the draft. Reveal it (or candidates)
  before pack one and every card gets a situational price — the Holy
  Symbol in a crypt draft is a different card than in the galleries.
  The drafters' table talk writes itself.

**NARR:** And each of those produces narratable moments: the one rare,
the revealed crypt, the duo that armed itself for exactly this. My side
of the brief:

- **The trophy case is the run's memoir** — it should be the spine of
  the ending text and the town scene, because it's the one system that
  already records *decisions as objects* (every trophy names the fight
  the party chose to take).
- **Keep promises visible.** Every drafted card should be *seen paying
  off* at least once per run in the story panel, in the descriptive
  house style — the preps system does this for gear; personalities need
  the same explicit callouts when their weights decide a room.
- **Wipes need authorship.** A wipe should read as the consequence of a
  draft decision when it was one ("no cleric; the venom compounded")
  — the data to say so exists in `encounterHistory` and the trophy
  case; the endings just don't consult it yet.

**TCG:** Note how many of these are *connections between systems that
already exist*, not new systems. That's the audit's theme: drops,
natures, personalities, packs, and the draft were each added as sound
mechanics that don't yet read each other's cards.

---

## 5. The shared brief (what both designers sign)

1. **Restore the both-viable pillar**: small-dense drafts must reach
   parity with wide drafts before any content expansion. (Measured
   target: elite duo within ~10 points of the mob, not 45.)
2. **Every card states its wager**: cost and edge printed, including
   the drop-economy consequences of avoidance archetypes.
3. **One agonizing pick per pack**: rarity, dungeon-preview, and
   body-pricing exist to manufacture close calls at the top of the
   draft, where today there are none.
4. **The chronicle proves the draft mattered**: endings and town scenes
   built from encounterHistory + trophy case, in the descriptive style
   — decisions in, story out.
5. **Rebalance is re-narration**: any future mechanic that changes the
   value of existing cards (as drops did) triggers a re-read of every
   archetype and card text it re-priced.

---

## 6. Skill expression — what the mining harness measured

*Added after `tools/mine.js` shipped: AI pilots at five skill tiers
(the Prodigy .95 → the Novice .15, with identifiable novice quirks:
shiny-chasing, body-blindness, curse-chasing) drafted 500 full tables;
every pool ran a nightmare delve. Full data: `MINING_REPORT.md`.*

**TCG:** Skill expression is one number: the win-rate spread between
the best and worst evaluator. Ours, measured:

| Pilot | Skill | Win % (nightmare) | Avg bodies |
|---|---|---|---|
| The Prodigy | .95 | 98% | 8.6 |
| table personas | .5-.7 | 97-100% | 8.7-9.7 |
| The Novice | .15 | 81% | 6.0 |

Seventeen points, top to bottom, **at the hardest difficulty in the
game** — and at medium and hard the spread is zero: the Novice wins
100% of those. Three causes, all measurable:

1. **Guaranteed coverage force-feeds the answer.** Packs are 3/8
   characters, so even the body-blind Novice ends with six bodies —
   and six bodies win. The no-dead-drafts rule, designed to protect
   floors, currently also protects mistakes. Coverage should guarantee
   *a legal party*, not *a winning one*.
2. **Nothing between the door and the boss asks questions.** Ordinary
   monster fights average 0.6 damage on nightmare; every non-boss kind
   posts a 0% party-loss rate. Only bosses (23-24 avg damage, up to
   13% loss) examine the pool at all. A format where only the final
   exam counts has no room to demonstrate skill before it.
3. **The trap archetype is real but unintended.** The entire bottom-10
   by improvement-when-drafted is spells and wizards; wizard presence
   is **-3.3 win points** (every other class is positive; the cleric's
   +6.7 makes it the mythic uncommon, exactly as predicted in §1).
   That's the classic novice mistake — the flashy, finicky package
   over the reliable one — existing in our data *by accident*. The
   archmage persona drafts it and still wins 97%, because bodies bail
   everything out.

**TCG:** So the design brief for skill opportunities, in order:

- **Make the mistake cost something**: the difficulty floor must
  punish thin and greedy pools somewhere below nightmare, or every
  evaluation lesson is unlearnable — nothing ever disconfirms the
  Novice.
- **Design the traps on purpose.** The wand is a true finicky rare
  (+22 points on a thin party, worthless on a mob) and the
  spell-school is an accidental trap. Convert accidents into printed,
  learnable wagers — finicky rares whose ceiling is real, "mythic
  uncommons" whose value is quiet and systemic. The gap between a
  card's *apparent* and *actual* value is exactly where drafting skill
  lives; today that gap exists but the dungeon never grades it.
- **Let the dungeon examine more than the boss.** Mid-dungeon skill
  checks (theme-fit, prep-fit, element-fit) turn draft reads into
  visible payoffs — and give the historians' correspondence systems
  (§2a of `RESEARCH_BRIEF.md`) their mechanical seat.
- **Ship the pilot ladder as a product feature.** The Novice→Prodigy
  bots are calibration opponents: seat the player against harder
  tables as they climb, and report their draft percentile against the
  tiers, 17lands-style. The mining harness is the referee — every
  balance patch re-runs it and re-measures the spread.

**NARR:** And note what the skill spread does for story: the Novice's
81% is boring, but the *shape* of their losses isn't — no cleric, five
trophies short, a grimoire full of resisted elements. When the
endings learn to read `encounterHistory` (§4), a loss should teach the
evaluation lesson in prose. Skill expression and storytelling are the
same feature viewed from two chairs.

---

## 7. What the party cap did (measured, 2026-07-15)

*The cap (`Party.PARTY_CAP = 4`) plus the pack rebalance (2 characters
per pack instead of 3) landed. Re-measured on the same harness.*

**TCG:** Every number in §1-6 moved, and mostly the way we wanted:

| | Before the cap | After |
|---|---|---|
| Overall win rate | 96% (nightmare) | 88% medium / **73%** hard / 44% nightmare |
| Difficulty gradient | none — 100% at medium *and* 96% at nightmare | a real curve |
| Party-size curve | 8-10 bodies, flat 98%+ | 2 → 30%, 3 → 58%, **4 → 74%** |
| Wasted character picks | ~5 per draft (forced by 3/pack) | ~2 |
| Skill spread (Prodigy vs Novice) | 17 pts at nightmare, **0 below** | 12 pts at hard, and it holds |
| Top 10 by improvement-when-drafted | mostly characters | **9 of 10 are equipment** (+16 to +21) |
| Bottom 10 | spells + wizards | **all spells + wizards** (−18 to −24) |

Three findings worth acting on:

1. **The format's decisions moved to the kit, which was the point.**
   With bodies capped, equipment is where wins come from — Haunted
   Armor +21.3, Greatsword +19.9, Tower Shield +19.9. Twenty of
   twenty-four picks now matter.
2. **The spell package is the clearest balance problem in the game.**
   Every one of the bottom ten cards is a spell or a wizard; the
   Archmage persona wins 55% where the Warlord wins 89% — a 34-point
   gap between two *identity* personas at the same skill tier. That is
   no longer an accidental trap, it's the headline: spells need to be
   worth their picks, or the wizard needs a reason to exist that isn't
   "amplifies cards you shouldn't have taken."
3. **The Novice's mistake changed shape.** Body-blindness used to be
   invisible (coverage force-fed everyone bodies); now it shows as a
   **short-handed party 50% of the time**, which is exactly the kind of
   legible, teachable error a skill ladder should produce.

**NARR:** And the cap gave the reserve a story job it didn't have: a
fifth pick is now insurance with a name, sitting in town, waiting for
someone to die. The town screen calls them up for free. That's a small
narrative engine — the understudy — that only exists because the cap
made "one more body" a decision instead of a default.

---

## 8. The arcane package, diagnosed and fixed (measured, 2026-08-19)

§7 named the spell package as "the clearest balance problem in the
game" and left it there. This section is the work of closing it, and
the honest account of how much is closed.

### What was actually wrong (three causes, only two suspected)

**TCG:** We had three hypotheses. Two were right and one was a red
herring, which is exactly why we measured instead of patching.

1. **Drafted spells burned on use.** A spell you spent a pick on was a
   one-shot, while a weapon you spent a pick on was permanent. Fixed by
   splitting the grimoire: drafted workings are *prepared* — reusable
   run-long, spent once per room — and only scrolls **found** in the
   dungeon burn. Card text and the help now say which is which.
2. **`mind` bought nothing.** Wizards were built around a stat with no
   payout. Spell power is now `power + ⌊best mind ÷ 2⌋`, +2 more with a
   wizard present, so the class and the stat finally point at each other.
3. **The wizard was a 24-point body competing for one of four slots
   against 38-point fighters.** The character pool had never been
   costed: fighters ran 36–40 points on a documented cap of 34, wizards
   22–26. Every character is now costed at exactly 30
   (`health + 2·attack + 2·defense + mind`), the pool's own historical
   mean, so parity cost no power. Two invariant tests in
   `tests/balance.test.js` now hold the line, one on equal cost and one
   on each class still *reading* as itself.

That trio fixed the **characters**: average improvement-when-drafted by
card type went from Melchior at −22 to characters sitting at +0.6 to
+1.2 across every difficulty. It barely moved the **spells**, which
stayed at −19.4 on hard against equipment's +14.2. So the red herring
was ours: we had assumed one-shot-ness was the binding constraint.

### The real constraint: spells had no presence in a long fight

**TCG:** So we stopped reasoning and built a controlled A/B — identical
four bodies, identical seeds, three top equipment cards in one arm and
three combat spells in the other. The gap was **33 points on hard**
(50.0% vs 17.0%) and 23.6 on medium. Then we instrumented where the
health actually went, and the answer was unambiguous:

| | equipment arm | spell arm |
|---|---|---|
| Reached the boss | 400/400 | 398/400 |
| Damage taken, ordinary rooms | ~11 total | ~12 total |
| Damage taken, **boss chamber** | **34.8** | **42.9** |
| Died in the boss chamber | 202 | 324 |

Both arms walked to the throne. **The entire win-rate gap was the boss
fight**, and the spell arm took *more* damage there, not less — because
its fights ran longer. A +2 weapon is +2 for all twelve rounds of a
boss. A one-shot burst against a large health pool is a rounding error.
Equipment scaled with fight length and spells did not scale at all.

**NARR:** Which is also a fiction problem, and the fiction told us the
fix. Fire that lands does not politely stop burning for the remaining
eleven rounds. The mechanic was less realistic than the prose.

### Two changes, both aimed at the boss chamber

1. **A working holds.** A loosed combat spell keeps half its force
   (`SPELL_SUSTAIN_SHARE = 0.5`) as damage *every round for the rest of
   the fight*. This is the shape Aegis of Ash always had — a ward that
   blunts every round — which is precisely why Aegis was the least-bad
   spell in the pool. Now every combat working works that way.
2. **At the throne the party holds nothing back.** Ordinary rooms still
   ration the grimoire (one working, two with a wizard). Against a boss,
   *every* prepared combat working goes off. Under the old flat cast the
   second and third spell in a grimoire were dead cards in the one fight
   that decides the run.

Together these make a grimoire **a reserve you spend down toward the
throne**: one spell is a tool, three are a plan.

### What it bought (and what it did not)

Controlled A/B, same bodies and seeds throughout:

| | before | sustain only | sustain + boss unleash |
|---|---|---|---|
| hard, equipment arm | 50.0% | 54.2% | 58.6% |
| hard, spell arm | 17.0% | 38.2% | 53.6% |
| **hard gap** | **33.0** | **16.0** | **5.0** |
| medium gap | 23.6 | — | **13.8** |

The three-spell *archetype* is now within 5 points of the three-equipment
archetype on hard. That is the headline, and it is a real fix rather
than a difficulty cut: both arms rose, so we re-swept `STAT_SCALE` a
second time to put the curve back on its target (88% medium / 71% hard /
45% nightmare), and the measured curve is now 99.1 / 88.8 / 71.1 / 42.3.

At the population level the change is real but smaller — worst spell
improved from −22.6 to −18.5 IWD, and the bottom ten tightened from a
−18-to-−23 spread to −14-to-−18. **This is the correct result, not a
disappointment, and the difference is worth being precise about.** IWD
asks "what is *one* of these worth"; most mined pools hold one or two
combat spells, so the boss unleash rarely has a third working to spend.
The A/B asks "what is the *package* worth". A package fix should move
the A/B a lot and the per-card IWD a little, which is what happened.

> **Corrected in §9.** The "residual per-card gap" this section signs
> off on turned out to be largely an artifact of the instrument. Read §9
> before quoting the −12 figure: the conclusion below survives, but the
> evidence for it does not.

**TCG:** And I'd argue the residual per-card gap should *stay*. Spells
are a package that pays at the throne; equipment is modular and pays
everywhere. That is an articulable difference between two card types
rather than a bug, and it creates the draft tension we wanted in §4 —
committing to the grimoire is a plan you can be punished for abandoning.

### What is still open (the next unit of work)

Two findings we are deliberately not fixing in this pass, because both
are design decisions rather than defects:

1. **Utility and healing workings are now the worst cards in the game.**
   Sustain and the boss unleash only touch *combat* spells, so the
   bottom of the list is Mending Word (−18.5), Dancing Light (−15.7),
   Balm of Hours (−15.1), Feather Step (−14.6), Eyes of the Mouse
   (−14.4). They are situational one-liners in a game whose damage is
   concentrated in one room. They need either a per-round shape of their
   own or a reason to matter *before* the throne.
2. **The Archmage persona still wins 47.9% where the Warlord wins
   84.3%.** The archetype gap narrowed but the *pilot* gap did not,
   because the Archmage over-drafts spells relative to bodies and
   equipment and one spell is still worth less than one item. Whether
   that is the persona drafting badly (fine — it is a .50-skill
   persona) or the format punishing a legitimate archetype too hard is
   the open question, and it is answered by deciding item 1.

**NARR:** Worth saying what the fix did to the writing, too. "The
working holds: +N damage every round while the fight lasts" is a line
the player now sees in the boss chamber, and it lands as a *promise
kept* — the spell they drafted eight picks ago is still doing something
in the fight that decides the run. That is the trophy-case lesson again:
a mechanic the player can watch paying off is worth more than the same
mechanic resolved silently in the maths.

---

## 9. The healing defect, and what the instrument was hiding (2026-08-19)

§8 closed with two things left open: utility and healing workings being
the worst cards in the game, and the Archmage persona trailing the
Warlord by 34 points. Chasing the first one turned up a genuine bug and
then, unexpectedly, a flaw in how we had been measuring the whole
problem.

### The bug: a heal that could not fire when it mattered

**TCG:** Healing was applied *after* the fight, gated on
`party.isAlive()`. Read that gate carefully. The fight loop only exits
when the monster is dead **or the party is**. So the single situation a
player drafts a healing spell for — the fight that is about to kill them
— was the one situation where the heal was guaranteed never to go off.
Meanwhile a *potion* quaffs mid-fight, inside the round loop, and a
potion is not even a draft pick.

Measured, holding four bodies and the seeds fixed and filling three flex
picks with healing workings:

| | heal arm |
|---|---|
| Win rate, hard | **13.0%** |
| Runs where any heal was seen to fire | 79.7% |
| **Runs that ended with the party dead and a working still prepared** | **87.0%** |

Eighty-seven percent. The card did nothing in the moment it existed for.

Two changes: a prepared healing working now fires **mid-fight** the way a
potion does, when a companion drops below 40% — and it is tried *before*
the potion, because a prepared working comes back next room and a potion
does not, so you spend the renewable resource first. And it **holds**,
mending each round afterward, on the same `SPELL_SUSTAIN_SHARE` rule as a
combat working. One rule now covers both: *a working that lands keeps
working.*

That took Mending Word from −18.5 to −13.6 IWD and levelled the three
spell uses against each other — utility −12.9, combat −12.6, heal −12.4,
where healing had been the clear worst.

### The flaw: per-card IWD is confounded for a hoarded card type

**TCG:** At which point I nearly wrote "so spells are still −12 a card
and equipment is +9, and the 22-point gap is the intentional
package-vs-modular tradeoff we signed off on in §8." That would have
been wrong, and the thing that caught it was asking a different
question: not *what is a spell worth*, but **what is the Nth spell
worth.**

Controlled, same bodies and seeds, N flex picks filled one way or the
other:

| Flex picks | All equipment | All spells | Gap |
|---|---|---|---|
| 1 | 21.3% | 23.8% | **−2.5 (spells ahead)** |
| 2 | 30.8% | 40.5% | **−9.8 (spells well ahead)** |
| 3 | 44.3% | 49.3% | **−5.0 (spells ahead)** |
| 5 | 50.7% | 51.0% | −0.3 (parity) |
| 8 | 61.8% | 55.8% | +6.0 (equipment ahead) |

And in real drafted pools from the mining harness, win rate by how many
of each type the pool holds:

| Held | Spells | Equipment |
|---|---|---|
| 0–4 | ~79–86% (flat) | 47–59% (climbing) |
| 5–8 | 71–79% (sagging) | 60–75% (still climbing) |
| 9+ | **55.5%** | **80.0%** |

**Equipment scales with count. Spells are flat to about four and then
fall away** — because ordinary rooms ration the grimoire to one or two
casts, so past the fourth working the extras only ever matter at the
throne.

So the −12 per-card figure was never a statement about spells. It was a
statement about the *company they keep*: a card's WR-in averages over
every pool containing it, spell-hoarding pools lose badly, and that drags
down every individual spell those pools happen to hold. **IWD is
confounded for any card type a drafter persona hoards.** The Archmage
seat was quietly poisoning the measurement of the cards it liked.

We have added both curves to `MINING_REPORT.md` under *Kit-count win
curves (read this before trusting IWD)*, so the instrument now carries
its own caveat instead of us remembering it.

**NARR:** Which retires the "spells are underpowered" story completely,
and replaces it with a better one: the grimoire is a *front-loaded*
investment and the armoury is a *linear* one. Two or three workings is
one of the strongest things you can do with early picks. Nine is a
hoarder's mistake.

### So the Archmage is not a balance bug

**TCG:** The Archmage drafts nine-plus spells and wins 50% where the
Warlord wins 83.6%. Given the curves, that is not the format punishing a
legitimate archetype — it is a persona making a **real, identifiable,
learnable drafting error**, which is exactly what a .50-skill identity
persona is supposed to do. It sits alongside the Novice's
body-blindness (§7) as the second legible mistake in the ladder, and
both are now *measurable* rather than merely asserted.

And we deliberately stopped buffing here. Every spell buff so far has
raised the overall win rate and forced a fresh `STAT_SCALE` sweep — this
pass needed one more (medium 1.37 / hard 1.62 / nightmare 2.01, measured
99.3 / 88.0 / 71.3 / 46.5). Buffing spells further would not have fixed
a weak card type; it would have flattened a genuinely good curve.

### Still open

**Utility workings remain the flattest cards in the pool** — Dancing
Light is now the worst card in the game at −15.4, with Eyes of the Mouse
and Knock beside it. Sustain and the boss unleash are damage-and-mending
rules and touch nothing they do. Their real problem is the one the
instrumentation in §8 exposed: **ordinary rooms cost a party about 11
health across a whole delve while the boss costs 35–43**, so a card whose
job is to make ordinary rooms safer is optimising a rounding error. That
is not fixable by tuning a utility spell. It is fixable by making the
march itself cost something — which is the **attrition** direction
already chosen for the dungeon rework, and where this thread should
rejoin the roadmap rather than spawn another balance pass.

---

## 10. Attrition — making the march cost something (2026-08-19)

§9 ended by naming the real reason utility workings were dead: **a whole
delve's ordinary rooms cost a party about 11 health while the boss
chamber cost 35–43**, so any card whose job was to make the march safer
was optimising a rounding error. This section is the fix, which is the
attrition direction already chosen for the dungeon rework.

The number that framed it: instrumented over 300 runs, a party arrived
at the throne holding **90% of its health pool after ten rooms**. Ten
rooms of monsters, traps and disasters, and the party turned up
essentially fresh. Everything before the boss was a formality.

### Two clocks, because one would only have been half of it

**TCG:** Resource attrition and damage attrition answer different
questions, and a dungeon crawl wants both. A resource clock asks *how
long can you stay down here*; a wound clock asks *what does this fight
cost you three rooms from now*. Either alone leaves the other lesson
unlearned.

**1. Supply — the lamp burns down.** Every march spends a unit of oil.
Run dry and the party is in the dark, taking `DARK_TOLL` (3) damage
each march thereafter. Provisioning is scaled to the walk ahead rather
than fixed, and difficulty sets the share of it that is covered
(`SUPPLY_COVERAGE`): easy is never benighted, nightmare walks the last
third in the dark. A flat allowance was tried first and rejected — it
dropped easy from 99% to 87% while barely touching nightmare, because
the same 8 units mean very different things in a short dungeon and a
long one.

The counterplay is entirely made of cards that already existed:
the **Everburning Lantern** sips (burns every *other* march), **Dancing
Light** carries a march for free once the oil is gone, and **Eyes of the
Mouse** reads the dark so the toll is never paid at all.

**2. Wounds — not everything mends on the march.** A blow worth a
quarter of a body (`WOUND_THRESHOLD`) leaves a scar. Each wound costs
two points (`WOUND_COST`) off the ceiling healing can reach, never below
a third of the body, and only **town** clears them. So damage
accumulates across a delve instead of washing out between rooms, and the
health bar shows it: the unreachable part is hatched.

### What it did

The march now costs what it should: **health entering the throne fell
from 90% of pool to 55%**, and a delve that used to reach the boss 299
times in 300 now does so about four times in five.

But the headline is what happened to the cards nobody wanted:

| Card | Before attrition | After |
|---|---|---|
| Dancing Light | **−15.4** (worst card in the game) | **+6.3** |
| Eyes of the Mouse | −13.2 | **+7.4** |

**NARR:** And note *how* they got good. We did not touch either card's
power. We built a system that made what they already did matter, and
they became premium picks on their own. That is the difference between
balancing a card and giving it a job.

The card economy came level as a whole. Average
improvement-when-drafted by type on hard is now character +0.8,
equipment +1.4, spell −0.8, personality +0.1 — inside two points of each
other, where this thread started with equipment at +14 and spells at
−19. The bottom ten of the whole pool is now **mixed across all four
card types**, worst card −8.2. It used to be ten spells out of ten at
−18 to −23. There is no longer a dead card type in the game.

It also retired the Archmage problem for free: 50.0% against the
Warlord's 83.6% became 66.4% against 77.1%. A 34-point identity gap
became 11, without touching a single spell, because the arcane package
finally had a job on the march as well as at the throne.

### The regression we caused, and had to chase

**TCG:** Attrition broke the skill ladder, and it took a moment to see
why. Right after the change the Guildmaster (.70) was *beating* the
Prodigy (.95), and the Prodigy-to-Novice spread had collapsed to nine
points. Nothing was wrong with the dungeon. **The draft AI's value model
was stale** — `rationalValue` had been calibrated against a game with no
supply clock, so it priced the lantern as a minor trinket and Dancing
Light as filler. The "skilled" drafter was skilled at the old game.

Teaching it the new economy — the first answer to the dark is a staple
and the second is nearly dead weight, and both kit types stop paying
past their measured ceilings — restored the ladder and then some:

| | before attrition | right after | after re-teaching the AI |
|---|---|---|---|
| Prodigy − Novice | 4–8 pts | ~9 pts, order inverted | **25.7 pts, correctly ordered** |

That is the widest, cleanest skill signal this format has ever measured.

**NARR:** It is also a standing lesson for this project: every time we
change what the game rewards, the AI drafters encode the *old* answer
until told otherwise, and a stale evaluator reads exactly like a balance
problem. Worth checking the pilots after any economy change.

### Calibration, and where difficulty lives now

Attrition needed two `STAT_SCALE` sweeps in opposite directions — down
when the march started costing health, back up when the drafters got
smarter — settling at medium 1.29 / hard 1.50 / nightmare 1.84, measured
99.1 / 88.9 / 69.7 / 44.8 against the standing 88 / 71 / 45 target.

Worth naming explicitly: **difficulty now lives in two constants, not
one.** `STAT_SCALE` sharpens the monsters; `SUPPLY_COVERAGE` decides how
much of the walk is spent in the dark. Anyone tuning one should look at
the other.

---

## 11. The room as a participant — element × feature reactions (2026-08-19)

The question that started this: *would an area-of-effect spell like a
fireball light wooden furniture in the room on fire?*

It should. And once you ask it, the answer reorganises how the whole
game's parts relate. Up to now a room's furniture was a menu of
*options* — shove the monster into the pit, crack the crates, fight from
behind the pillars — and a spell was a number applied to a monster. The
two systems shared a room and ignored each other.

### The design, in two rules

**NARR:** The rule we wrote first was not mechanical, it was about
legibility: **every reaction must be one a player would guess.** Fire
takes wood. Lightning runs through standing water. Frost puts a brazier
out and glazes a floor. Holy light soaks into old stone and stops
whatever was going to climb out of the sarcophagus. Nobody should need a
rules lookup, because the fun is *seeing it coming* — noticing the
crates before you cast, not being surprised afterwards.

**TCG:** And the mechanical rule: **a reaction is a trade, not a bonus.**
Burning the crates costs the cover they were giving. Dousing the brazier
costs the light. Freezing the font makes the floor treacherous for
everyone, party included. Electrifying standing water hurts the party,
because the party is standing on the same floor.

That rule is enforced by a test rather than by good intentions, and it
caught two entries we had written as pure upside — steam (cover *and* a
half-blind monster, for nothing) and the brazier flare (six damage and
light, for nothing). Steam now scalds the party too; the flare spends the
brazier's fuel and leaves the bracket cold.

### It is built entirely out of what we already had

Thirteen features already existed with tiles on screen. Four elements
already existed on spell cards. All the new module adds is a **matter**
map — what each feature is physically made of, kept separate from `tags`
because a font's matter is water and its *role* is a shrine fixture, and
those are different questions — and a 4 x 7 reaction table.

Three existing cards became area workings (Chain Lightning, Kindle, and
Shatter, which gained the frost element its own card text always implied
— "stone remembers being loose, and cold reminds it"). Three new ones
fill out the elements: **Fireball**, **Hoarfrost**, **Dawnbreak**.

A bolt is still a bolt. Firebolt does not set the room alight, and a
player who wants the room to catch has to draft for it.

### It reaches the other systems, which is the point

**NARR:** The line that made this feel like one game instead of three
was the blaze feeding the lamp. A burning room *is* light. So a fireball
in a crate-stacked room buys marches of oil, and a frost working that
douses the only brazier takes light away — the grimoire, the room and
the supply clock turn out to be one economy, and nobody had to bolt that
together. It fell out of the fiction.

### The measurement that mattered was not damage, it was noticing

First pass, the system was almost invisible: **55% of fight rooms held
something the party's elements could touch, and a reaction fired in
15% of them.** The reactions worked; the party never looked up.

So the decision layer learned to read the room — a caster holding fire,
standing in front of dry crates, can see what is about to happen.
Firing went to **30%**, and the arcane package went from −1.3 to +0.1
average improvement-when-drafted on hard.

**TCG:** Which is the more interesting finding. We could have made
Fireball hit harder and got nothing; the card was never underpowered, it
was under-*noticed*. Content that the decision layer cannot see is
content that does not exist — the same lesson as the stale drafter
evaluator in §10, one layer down.

Final state: all four card types within 1.1 points of each other on hard,
curve at 87.9 / 69.5 / 45.6 against the 88 / 71 / 45 target.

### Where this goes next

Two threads open deliberately. **Positional combat** — ranks, and who
stands where when the fireball goes off — is the half of the spatial
rework not yet built; the reaction table is written so a position layer
can extend it rather than replace it. And **tactics cards**, a
class-agnostic skill tree, which is where a player will buy the ability
to exploit all of this on purpose.

---

## 12. Tactics — a skill tree gated by capability, not class (2026-08-19)

The brief: a tree of combat and magical technique that is **not
class-specific** — any class that attacks (which is all of them) should
benefit from Flanking; anything that casts should benefit from
Concentration.

### Why capability beats class as a gate

**TCG:** A card that reads "fighters only" collapses into the class it
names. It stops being a decision and becomes a rider on a character
card, and the draft already has character cards for that. Gating on
*capability* keeps the card wide: `attack` is true of any living party,
`cast` is true of anyone with a working in the grimoire regardless of who
put it there. Twelve tactics across four branches — the Line, the
Working, the Room, the March — and only the arcane branch has a gate that
can actually be closed.

**NARR:** It also reads better. "The party has drilled" is a thing a
band of people does together; "the fighter has drilled" is a stat block.

### The tree is the decision

A tier-two tactic is a **blank** without its root. That makes tactics
the first card type where a pick's value depends on a pick you already
made, which is a real draft tension and a real skill test — reading a
splashy tier-two card early, before you own the trunk, is exactly the
mistake the Novice persona should make. It now does, on purpose
(`quirks.treeBlind`).

Measured on hard, holding bodies, kit and seeds fixed:

| | win % |
|---|---|
| no tactics | 10.6 |
| orphaned branch card | 11.8 |
| a root alone | ~15 |
| **complete line branch** | **22.0** |
| two unrelated roots | 17.4 |

An orphan is worth almost nothing, a root is worth a few points, and
completing the branch beats spreading. That is the shape we wanted.

### Two things the measurement corrected

**Rationing was a bomb.** At +2 marches of oil it was worth **+13.8 win
points alone** — four times any other tactic — because the supply clock
is the dominant threat on hard and a card that answers it directly runs
away with the whole type. Cut to +1, it sits with Flanking and Shield
Wall at about +3.

**The first cut had the tree backwards.** Roots were individually strong
and branches individually weak, so *two unrelated roots beat every
complete branch* (+9.4 against +1.8 to +7.4) — the tree created no
decision at all. Branches must pay **more** than a second root precisely
because they are conditional: a safe pick that always works should earn
less than a risky pick that can be a blank. Encirclement, Focused Fire
and Ward-Weaving were all roughly doubled.

**NARR:** And a silently dead card reads as a bug, so an idle tactic now
says why: *"Field Surgery is drafted but idle: it grows out of Rationing,
and nobody in this party has learned that."* It shows dashed in the party
panel with that line on hover.

### A bug the browser found that the tests did not

Drafting the same tactic twice **stacked** it. Three Quickenings meant
three extra workings a room. The party panel showed the same chip three
times, which is how it surfaced — the unit tests all used distinct
cards. A tactic is knowledge; knowing it twice is knowing it once, so
they deduplicate by id now, and the duplicate count is kept rather than
silently dropped.

### The honest residual

The four branches are not equal, and the reason is structural rather
than numerical:

| branch | over baseline |
|---|---|
| Line (Flanking → Encirclement) | +11.4 |
| Wall (Shield Wall → Focused Fire) | +6.4 |
| March (Rationing → Field Surgery) | +3.4 |
| Room (Improvised Arms → Firewatch) | +3.0 |

**TCG:** Line and Wall give **per-round** combat value. Room and March
give situational and utility value. We have measured three times now
that this game's damage concentrates almost entirely in the boss chamber
— it is why equipment beat spells in §8, and why healing beat nothing in
§9 — so a per-round combat effect compounds over twelve rounds while a
situational one fires once or not at all.

No branch is a *trap*: all four beat taking nothing. But closing this
spread means giving the Room and March branches per-round presence, the
same structural fix the grimoire needed, not bigger numbers. Deliberately
left for a future pass rather than tuned blind.

### What it did to skill expression

The Prodigy-to-Novice spread went from 25.7 points to **27.7–32.0**,
with the Prodigy top in every run. The tree added a real evaluation
skill — knowing when a conditional card is a bomb and when it is a blank
— which is the most transferable kind of card-game judgement there is.

Curve held at 99.4 / 87.9 / 70.8 / 45.0.

---

## 13. Nothing silent, and the shelf it is kept on (2026-08-27)

Two goals in one pass: **no state change goes unreported**, and the
record of a delve becomes a document that can be saved, read later, and
continued by the same party.

### The audit that found real bugs, not gaps

We built a runtime silence audit — snapshot the whole run state every
tick, diff it, and ask whether anything the player could read that tick
mentioned the change. It found two bugs, not stylistic gaps:

| | silent |
|---|---|
| wounds | **47%** |
| a hero dying | **it happened, and the Chronicle said nothing** |

Neither was a missing line. The roster was snapshotted *after*
`restStep()`, which burns the lamp and lets the dark take health and
leave scars — so anyone the march killed was already filtered out before
the comparison ran. Hoisting the snapshot fixed it, and immediately
introduced a worse regression that an existing test caught: **36 of 40
wipes lost their fall line**, because march deaths were now being
classified after the room resolved and so swallowed everyone the room had
killed.

**NARR:** Two bugs in a row, in ten lines of code, both of them silence.
That is the argument for not solving this with discipline.

### So the guarantee is structural

`tick()` now wraps its body and diffs on every exit path — including the
half-dozen early returns for wipes, venom and the dark. A mechanic cannot
dodge the record by returning early, because it does not control the
exit. A field with no writing still produces an event with a fallback
line rather than vanishing, which is what makes silence *impossible*
rather than merely discouraged.

**TCG:** And two layers, because "nothing silent" and "readable" pull
against each other. The **ledger** records everything. The **prose** stays
curated — the earlier lesson holds, six identical "the dark takes
nothing" lines buried the beats that mattered — so every event carries a
salience and only beats reach the story. A ledger nobody has to remember
to write, plus prose somebody curated, answers both halves.

### The saga

A chronicle spans a campaign, not a delve. The same party descending
again appends a chapter, so the document reads as one thing: Delve I,
Delve II, and the scars carried between. It saves to localStorage after
*every* delve (not just at the end — a player who shut the tab in town
used to lose the story, the same silence problem one layer up), exports
as JSON to keep or hand on, and renders as Markdown to simply read.

Two more silent failures surfaced building it:

- Serialising kit **by id** quietly lost anything the draft pool has
  never heard of. A scroll from a library is `found-sp-fear-1`, a dead
  adventurer's buckle is `found-buckle`; neither resolves, and both
  vanished on load. Cards are stored whole now.
- A **wiped party could be sent down again**, producing a delve that
  ended on its first tick and appended an empty chapter. Resume now
  reports who is left: *"0 still standing · 1 in reserve — this party can
  delve again"*, or names the party that did not come back and offers the
  story instead.

### The asset pass

**NARR:** Then we asked which cards were written for a game that no
longer exists, and the answer was worse than expected: **all nine
personalities touched none of the mechanics added this session.** They
had opinions about monsters and none at all about walking in the dark or
carrying a scar to the throne — which is now most of what a delve is.

Nobody had done anything wrong. There was no moment in the workflow that
asked the question.

Every temper now has a stance on the two clocks. The Bold walk the dark
like a road they know. The Craven creep and pay for creeping, but packed
spare oil nobody is laughing about now. The Devout tend what the dungeon
opens; the Reckless never stop to bind anything. Four idle items got a
job the fiction already implied — an alembic that cooks a material down
into lamp oil, mail that takes the worst of a blow, a buckler that turns
aside half of what the party sets off, a charm that feeds a blaze.

**TCG:** And the tooling caught itself being dishonest. The first audit
called fifteen character cards "inert" because no mechanic named them by
id — but a character participates through its *class*, which every system
reads. A tool that cries wolf gets ignored, so it now reports class
coverage instead. Honest count: 26 inert became 5, and those five are
plain weapons that should stay plain.

### What went into the environment

Per the brief, three things outlive this session: **CLAUDE.md rules 7–9**
(no state change is silent; a mechanic ships with its writing and its
record; run the asset pass when a mechanic lands), **`tests/silence.test.js`**
as a gate that fails if a field can move unreported, and
**`ASSET_REVIEW.md`** with `npm run assets` as its work-list.

**NARR:** The rule worth carrying is the small one: *a mechanic the
player cannot see is a mechanic they cannot plan around* — and a bug the
tests cannot see is a bug that ships. Both were true here, in the same
ten lines.

---

## 14. Positional combat — the last dungeon fork (2026-08-27)

Of the four directions chosen for the dungeon rework, three were built
and this one kept getting named as next. It is the one that ties the
others together.

### Position was already half-real

**NARR:** The renderer has drawn a party as two ranks with the fighters
forward since the isometric view existed, and `Party.takeDamage` has
sent blows to the fighters first for just as long. So position was
visible, and quietly mechanical, and never a decision anybody made. The
picture was telling the player something the rules did not quite mean.

**TCG:** What it needed was the thing rooms already had and nothing
used: their **shape**. Rooms have carried `w`, `h` and a shape name
since the procgen v3 rework — chamber, hall, cavern, passage, cell,
rotunda — and no mechanic had ever read them. A passage six tiles by two
cannot hold a line abreast. A boss cavern fourteen by eleven can hold
anything. So the room sets the menu and the party chooses from it: two
systems that already existed, finally meeting.

Five formations. A **column** brings one blade and takes one blade — the
corridor fight, and the only thing a passage permits. A **line** is the
ordinary shape and the one that leaves room to work round the sides. A
**shield wall** trades a quarter of the party's output for a third of
the incoming, and packs them tight enough that a blast catches everyone.
A **wedge** commits everything forward. **Loose order** needs a big
floor and halves anything with a blast radius.

### Flat numbers made one formation strictly correct

**TCG:** The first cut used flat modifiers, and it was wrong in a way
worth recording. Incoming damage runs about 5 a round; a party's swing
runs about 20. So "2 less taken, 2 less dealt" is a 40% defensive gain
for a 10% offensive cost, and Shield Wall strictly dominated a plain
Line. The **baseline formation was the worst thing a party could stand
in**, which is the same failure as a trap card and harder to see.

Percentages cost what they look like they cost, so the modifiers are
proportional now. Two other traps came out in the same pass: Loose Order
was strictly worse than a line in any fight without a blast in it, and
Column — which at frontage 1 never killed anything in a cavern across
sixty measured fights — could be chosen at random in open ground. Loose
got a real defensive edge; filing up is now weighted for the doorway and
the desperate, which is when a person would actually do it.

### The measurement that corrected me

Testing whether the modifiers reached the fight, the obvious assertion
was that a shield wall takes less damage than a wedge. It measured the
other way: **21.0 against 23.4**, because the wedge ends the fight
sooner. Against a killable monster, offence is defence — which is
precisely the trade the formations exist to offer, and precisely why
totals cannot isolate the modifier. The test measures damage *per round*
now, and a second test measures the rounds the wedge buys.

### What it did to the rest of the suite

**NARR:** Four existing tests started failing, and not one of them was
about formations. They compared two arms of a fight, one arm drew a
wedge and the other a column, and the thing being measured was smaller
than the noise that had just been added underneath it.

`armsDiffer` — written two commits earlier for exactly this — caught
three of them by refusing to pass on a saturated fixture rather than
reporting a green comparison of 52 against 52. That is the whole
argument for the guard, arriving sooner than expected.

The systemic fix was not twenty edits: **a room that does not describe
its own shape cannot constrain where anyone stands**, so a
geometry-less fixture takes the ordinary line. Real dungeon rooms always
carry geometry; test rooms mostly do not. One line, and the confound is
gone from every fixture at once.

### The drawing agrees with the maths

A column is drawn one-forward, a wedge three, and loose order genuinely
stands further apart — the same fact the `areaShare` modifier prices.
The party panel carries a chip for anything other than a plain line, so
the player can see where they are standing as well as read it.

Curve recalibrated by the tool in one command: medium 1.48, hard 1.71,
nightmare 2.41, measured 99.4 / 87.5 / 73.1 / 45.1.


## 15. The dungeon goes down — floors, wings, and what the map was hiding (2026-08-27)

### The claim that was wrong

**NARR:** The record said all four dungeon forks were built. They were
not. What existed was a spine of eight to eleven rooms with one or two
two-room stubs off it, plus trapdoors that skipped *along* that spine.
A trapdoor is a hole in a floor; a hole that lands you on the same level
is a hole to nowhere. The dungeon had no floors for it to go through.

### Floors are a schedule, not a coin flip

**TCG:** The first cut rolled a third floor 35% of the time at any
depth, and the attrition test caught it inside a minute: 23 of 60
parties reached the throne, against a design that wants most of them to.
Supply is provisioned from the length of the path, so the lamp scaled —
but health did not, and a dungeon of twenty-five rooms is a different
game from one of eleven. Floor count is now **how far the campaign has
dug**: two, and three from depth 3.

Each floor multiplies its monsters by `1 + 0.18f`, guarantees included —
a library swapped in on the bottom floor is a bottom-floor library, not
a soft one grafted onto deep stone. That is one of three bugs the same
shape: the guarantee pass replaced rooms **without carrying their
floor**, and it could eat a stair, leaving a floor with no way down.
Adding `STAIRS` to `PROTECTED_TYPES` and copying `floor` onto the
replacement fixed both. A 200-seed sweep is the gate now: no room with
an undefined floor, one stair per floor boundary, boss on the last.

### Four tests failed for four different reasons, and three were the tests

**NARR:** Lengthening the dungeon broke tests that were never measuring
what they claimed:

- *Room footprints never overlap* — floors stack, so a stairhead sits
  directly above the room you land in. The overlap check had to become
  per-floor. **The generator was right and the test was wrong.**
- *Deeper dungeons pay better* — compared one seed's first gold room
  against another's, and depth now changes the shape of the draw. It
  reported `43 > 43`. Averaged over 24 seeds it says what it meant.
- *Monster Swarms multiplies the fights* — a weight tweak is a change to
  a distribution, and one seed can land either way. 24 seeds.
- *The caverns keep failing* — counted disasters absolutely, so it read
  the length of the dungeon as much as its weighting. It now compares
  the caverns against a plain delve on the same seeds: 4× the rate.

**TCG:** And one was a real design hole. *The boss gets the great hall*
asserted the boss chamber is the biggest room, and it was passing by
luck: a boss hall could roll 72 tiles while a disaster cavern rolled
108. The fix belongs in the generator, not the assertion — the boss's
smallest footprint now beats every other type's largest.

### What the goldens caught that no unit test could

Re-blessing the three golden transcripts and **reading the diff** turned
up three things at once:

1. `### ⬛ Room 7 — stairs` — the new room type had no icon.
2. `The party chose to camp-stair.` — a raw option id in the prose,
   because `OPTION_PHRASES` had no entry and **nothing checked that it
   did**. There is a gate for that now: every option any room can offer
   across 30 seeded delves must have a phrase, and removing one line
   from the table fails it.
3. Two identical renders of the same seeded case. `recentBarks` is
   module state that survived from one delve into the next, so a party's
   dialogue depended on what a previous party had said. The golden
   harness pins `Math.random`; it cannot pin a module-level array.

### The party that fled seven times

**NARR:** The repetition gate found a Craven party backing out of the
same room seven times with an identical deliberation each time. The
answer is not seven more ways to write a retreat. **Twice is a retreat;
a third time is a rout**, and the room does not permit one: each
withdrawal costs `2 × the number of times they have tried it`, and after
two the `flee` option is gone and the predicament says why —
*it is between them and the door*.

### Wings

A branch of one or two random rooms is an alcove with loot in it. A wing
is a 2–4 room themed detour with a payoff: the burial, workshop,
archive, barracks and flooded wings, each with a body pool and an end
room, and a secret one always ends in a vault. The name and the tell go
into the writing, because a detour the player cannot tell apart from any
other detour is not a decision.

### The drawing

Floors drop 7 world units each, stair edges draw as a flight of steps
instead of a corridor, and the camera tracks the floor the party stands
on rather than framing the level below from the ceiling of the one
above. The 2D floorplan draws one floor and labels it.

Recalibrated after: medium 1.19, hard 1.45, nightmare 1.97 — measured
97.9 / 88.0 / 69.4 / 45.6 against a 99 / 88 / 71 / 45 target.

### The archive was flattening them

**NARR:** `serializeDungeon` enumerates the fields it saves, and it had
never heard of `floor`, `descendsTo` or `wing`. An archived three-floor
dungeon replayed as one level with its footprints overlapping and no
descent to record — the same failure as the archived trap that replayed
as a generic spike pit, and the found scroll that vanished from a saved
kit. Three times is a pattern, so the fix is not three more fields in
the list: the round-trip test now compares **every** key on every room
against its rebuilt copy and names the ones it does not expect to
survive (`cleared`, `discovered`, `visits`, `fled`, `icon`). Deleting
one line from the serializer fails it with twenty-nine names.

The editor got the same treatment: a stair is structure, not furniture,
and retyping one leaves a floor with no way off it. The archive's
minimap draws each floor as its own plan, side by side, from its own
origin — floors stacked in a single plan view are an illegible pile.


## 16. The census — asking how often, not whether (2026-08-27)

**NARR:** Every gate here answers *whether*. Coverage says a beat has
writing; `tests/prose.js` says it appears in a real seeded transcript;
the golden files say it has not changed. None of them says **how
often**, and that is a different question with different answers.

`npm run census` walks six hundred delves and counts what the player
actually reads. The first run, once the extractor was pointed at the
right field, found six mechanics under 5% and three of them were real:

- **The boss unleash had no line.** The help has promised since the
  spell rework that the party empties the grimoire in the throne room.
  The resolver did it. No transcript ever said so — the mechanic
  shipped without its writing and every existence-shaped test passed.
- **The idle-tactic warning reached the panel and never the saga.** A
  player who reads the record later cannot see why their Field Surgery
  did nothing, which is exactly the thing the line exists to explain.
- **The stairhead camp was met by 2% of delves.** Built that morning,
  with a tactic card written for it. The instrumentation says why: a
  party reaches the stair at **96% health with 0.35 wounds**, because
  the first floor is three or four rooms long. A camp that only heals
  is a choice nobody has a reason to make.

**TCG:** The fix is not to make camping stronger, it is to give it a
job that exists at 96% health. Wounds do not heal down here — Field
Surgery at a shrine is the only exception — so a night off the party's
feet now sets one wound, and the option is offered to the wounded as
well as the hurt. Met by 2% of delves before, 4-7% after, and Cold Camp
has something to be good at.

### Offered against taken

The census counts options as well as beats, and the two columns answer
different questions: an option nobody is *offered* is a generation
problem, an option nobody *takes* is a decision-layer problem. That
second column is where the recurring failure of this project lives —
reactions at 15%, the stale drafter evaluator, the coin-flip stairhead.
It is now a gate: an option offered forty times and taken under 3% of
them is decoration.

Calibrating the gate meant sabotaging it. Pinning `study` to a negative
weight did not make it unreachable, because the chooser floors every
weight at 0.1 — it was still taken 1.3% of the time it was offered. So
the threshold sits between a pinned option (~1%) and the least popular
live one (`leave-it`, 4.8%). A gate whose floor is below what a dead
option actually scores is a gate that passes on the thing it was
written to catch.

### The gate it took two goes to make honest

**NARR:** The dead-option gate failed on its first outing for the
reason it was written to catch, only in reverse: `search-around` sits
at 8.6% most runs and came back 1.6% on one run in three, because
combat rolls come from the global `Math.random` and 120 delves is a
small sample when the denominator is one option in one room type. It
was committed green and failed on the next run.

Pinning the stream — the golden harness's trick — makes the same 120
delves give the same rates every time, and the lowest live option
(`leave-it`, 5.3%) now sits well clear of the 3% floor. The gate
measures one fixed stream rather than the average of all of them, which
is the right trade for an invariant about the decision layer: a
borderline option now fails loudly at the moment somebody writes it,
instead of failing at random forever afterwards.

The same sweep turned up an older flake of exactly this shape:
*a mirror does for the ethereal what a cleric does* compared a single
fight against a single fight, and returned 11 rounds against 10 about
once in twelve runs. Twenty-five fights an arm, compared as means
through `armsDiffer`, and it stops lying in both directions.


## 17. Promises kept — the asset audit's second question (2026-08-27)

**TCG:** `npm run assets` has always asked a static question: does any
mechanic read this card? Every card passed. The sharper question is
dynamic — hand the card to a party, send them down thirty times, and
see whether the thing the card *says it does* ever reaches what the
player reads.

Five cards came back at zero. Three were the tool's fault and worth
recording, because they are the shape of mistake this kind of
instrument makes:

- **The Greatsword, the Bandolier and the Quicksilver Daggers** all
  fire constantly. Their prep lines name them in `source` and not in
  the prose — the greatsword's line says "the greatsword", not "the
  Greatsword of the Vault" — so a text-only matcher read three live
  cards as dead.
- **The Tinkerer** looked dead because a personality speaks as its
  *archetype*, and most personality cards are named after theirs. The
  Tinkerer is the odd one out, so it was the only one that looked
  silent. A tool that cries wolf gets ignored.

**NARR:** And one was real. **Eyes of the Mouse** covers the dark toll
every single march, and its three lines are *"The dark is no trouble to
eyes that know it"*, *"Someone in the party reads the black like a
page"*, *"Borrowed night-sight leads them through whole"*. Not one of
them names the card. Feather Step, which does the same job by a
different route, has always said which working carried the party
through. So a player who drafted Eyes of the Mouse read three lines
about night-sight and had no way to know they were reading about their
own pick — the card was mechanically alive and narratively invisible.

Zero to 83% of delves, from naming it.

This is the same lesson as the boss unleash one section up, from the
other end: there, a mechanic ran with no line at all; here, the lines
existed and credited nobody. Both are only visible if you ask how often
a thing is *read*, rather than whether it *exists*.


## 18. Room enough to fight in (2026-08-28)

**NARR:** The note that started this: *"I want the rooms to be bigger
and more detailed, so as to really enable positional combat with a team
of four PCs and various monsters challenging them."* Formations shipped
two sessions ago and they were doing arithmetic in a broom cupboard —
a "chamber" was five by five, which is four adventurers, a monster and
a pillar standing on each other's feet.

Rooms are half again as big now (fighting chambers 64–180 tiles, a boss
cavern up to 22×17), they hold five pieces of furniture rather than
three, and **corridors stayed exactly as narrow as they were**. That
last part is the design: a passage is the room where the column is the
only thing that fits, and if every room is a ballroom then no formation
is a decision.

The camera had to move with them. At the old fixed view, four
adventurers in a twelve-by-twelve chamber drew as six pixels each — the
picture stopped showing the thing the mechanics had started caring
about. It frames the room the party is standing in now.

### Emoji as place markers

The feature catalog had a hard rule — *every feature is drawn with art
already on the sheet* — which quietly meant **the game could only grow
hazards somebody had already drawn**. The rule is now "every feature is
drawable": a tile where the sheet has one, the feature's own emoji as a
marker where it does not. That is what let the floor spikes (🔻) and the
chasm (🌑) exist this afternoon instead of next month.

### A key is not worth a card

**TCG:** Shove — *any class can put a monster into a hazard* — is
exactly the card the note asked for, and as a pure key it measured
**−0.3 ± 2.8 over 2500 delves an arm**: worth nothing. A party with a
fighter could already shove; a party without one rarely met a hazard it
wanted. That is the same answer the feature-tools A/B gave when the
tools only unlocked, and it is worth stating as a rule: **in this game,
presence is not value.** Shove keeps the key and gains a number (+2 to
hazard openers), and lands at about +2.3 — the band the other roots
live in.

Chasing that number turned up the deeper problem. A shove into a pit
was priced at **5 damage** against a combat spell that opens for eight
and keeps half of that every round after, so the room was always the
worse plan — and the tactic that opened hazards to everyone was worth
*minus* four win points, because it spent the party's opening on the
weaker option. A hazard is not a nudge. Putting something onto spikes
hits like the spell it competes with now (11–21), and the curve was
re-swept twice around it.

### The instrument was lying by six points

**NARR:** Pinning measured +7.0, then −2.0, then +4.8, +0.2, +3.8 on
five consecutive runs of `npm run card`. The card had not changed; the
default sample of 500 delves an arm carries a 95% band of about **six
points**, which is wider than every tactic in the game. Two runs at
2500 settled it at roughly +3.

The tool prints its own band now, and refuses to let a number be read
as signal until it clears it. A measurement instrument that does not
report its noise is how a design session spends an hour tuning a
constant that was never moving.


## 19. The muster, and a shop worth visiting (2026-08-28)

**NARR:** Two requests in one note: *let the party spend money at shops
in town*, and *let the player assign what they drafted to particular
characters, rename them, write a backstory*. The second is the one that
changes the game, because until now the draft handed kit out by best
fit and that was the end of the player's involvement with their own
party.

### Assignment has to be worth something

**TCG:** Moving the Tower Shield is easy to build and easy to make
meaningless. The question is whether *who holds a thing* has any
mechanical weight, and for equipment it plainly does — the wearer's
stats are what the fight reads. For **spells** it did not: power came
from `bestMind()`, the sharpest mind in the party, wherever the book
happened to be.

So a working now has a **caster**, and its power comes from that
character's mind. Handing Fireball to the fighter is a real mistake you
can make, which is what makes handing it to the wizard a real decision.
A dead caster falls back to the sharpest survivor rather than turning
the working off — a party should not lose its grimoire because the
wizard died in room three.

### The test found the bug a rename would have caused

The caster was stored as a *name*, and the outfitting screen also lets
you rename people. `tests/outfitting` caught it on the first run:
rename the wizard, and their working silently reverted to the party's
best mind. Bodies have a `uid` now, and the name is only what gets
printed.

### The shop had to be priced, not invented

**TCG:** `game/Costing.js` already scores every card, so the shop reads
its prices off the model rather than a hand-written table — a new card
in the pool is priced by what it actually does, without anybody
remembering to add a line. But the model's totals span 2.5 to 60,
because a per-round effect is worth twelve times a one-shot, and a flat
multiple asked **388 gold for Fireball and 22 for the lockpicks**.

The fix was to price it against the town rather than against the model:
instrumented, a party comes out of a delve with a median of 67 gold, a
hire costs 42, a full heal about 7. Kit at 35–140 makes a town visit
worth exactly one purchase, which is a decision. Buying stays a worse
deal than drafting on purpose — the draft is the game, and the shop is
the consolation for a draft that went badly.


## 20. Lock and key, and the gate that was not a gate (2026-08-28)

**NARR:** The brief was the dungeon canon — what a tabletop dungeon,
a Poe story, and a roguelike each expect a dungeon to have. Writing
`DUNGEON_CANON.md` as an audit rather than a wish list was the useful
part: three columns, and the gaps stop being a mood and become a list.
Most of the canon is already here. What was missing and cheap was
**lock and key**, which the roadmap's own research names next.

### The key on the critical path is not a lock

**TCG:** The first cut worked and meant nothing. To guarantee a locked
wing was always solvable I put its key on the spine before the door —
and the spine is the *critical path*, the rooms the party walks by
definition. So the party picked the key up on the way past every single
time. Instrumented: **93 of 98 doors opened with the key.** The rogue
had nothing to do, the prybar had nothing to do, Knock had nothing to
do, and no door was ever refused.

That is the same failure as a card that only unlocks: a gate that
cannot say no is decoration. And I would not have seen it from the
prose — every transcript read beautifully, because opening a door with
its key is a perfectly good beat. It took counting.

**NARR:** So four locks in ten now have **no key in the dungeon at
all**. The wing is optional loot; it is allowed to stay shut. That one
change turned four dead alternatives into live ones — key 57, picked
17, refused 12, Knock 5, forced 4 — and gave the shut door back its
meaning.

### Two of the four ways in are loud

The interesting part of the design is that the ways through are not
interchangeable. A key is silent. A rogue is silent. **Knock** and a
**shoulder** are loud, and set the same `alarmed` flag a tripped bell
does, so the next monster fights forewarned — and a bare-handed force
costs health, because a door is not a monster and shouldering one
hurts. The party without a key gets in; it just does not get in for
free.

### What the conservation gate caught, again

Adding `room.key` broke `tests/archive` within a minute: the archive
serializes an enumerated list of room fields, and a replayed dungeon
would have locked a wing whose key no longer existed anywhere in it.
That gate has now caught four fields in four sessions — trapType,
floor, wing, key — which is a good argument for writing the general
check instead of the specific one.

## §N. Why the dungeon still does not grade the draft

Nine capability tests are written, the consequences are wired, and the
dungeon examines a party several times a delve. It still cannot tell a
good draft from a bad one, and the reason turned out not to be any of
the three things it looked like.

### It was not frequency, though frequency was real

A situation room costs a room, and the room budget is zero-sum: a spine
is ~11 weighted picks with four already spent on guarantees, so every
extra situation is bought with a monster. Measured, a three-situation
guarantee stripped the Ice Caverns from 1.0 disasters a delve to 0.25;
excluding theme-boosted rooms from conversion fixed that and cost the
Greatsword its swarms (promised writing on 0% of delves, under the 10%
floor `tests/assets` holds); weight 4.5 bought situations with monsters
directly; weight 6 squeezed every other type onto its guarantee floor
until the castle and the plain delve held the same rooms as each other.

The way out was to stop buying rooms. A definition now either **owns** a
room or **rides** one: a treasure room stamped with an appraisal problem
is still a treasure room, still offers to loot, inspect and leave it, and
*also* offers to appraise the three chests if anybody drafted appraisal.
Tests per delve went 1.03 → 2.75 with room counts, theme identity and the
difficulty curve all untouched. Frequency is solved.

### Nor was it that consequences were too small — they were absent

Three declarations were being written and never read.

- `starBlessed` and `forewarned` were set in **seven** places across
  `Encounters.js` and `TownEncounters.js` and read in **zero**. The
  writing promised "the next fight begins under a favourable aspect" and
  "forewarned of the next snare" and neither did anything.
- `opt.weight` — declared on every situation option since the first one
  was written — was read nowhere. `weight: 2` on "reconstruct the mosaic
  from memory" did nothing, and against a library's own furniture that
  option was offered 41 times and taken once. `tests/prose` caught it.

All three are now wired, along with `party.forcedFormation`, which lets a
situation hand the party a stance for the fight after it. Formation is
the right currency because it is the only one already priced across a
whole fight — 0.55× to 1.3× incoming every round, against the two or
three points of flat damage a situation used to trade in. It is also not
a strictly-better button: forcing a shield wall *cost* damage on a
seeded fight (8 against a plain 7), because its 0.75× attack multiplier
makes the fight run longer. A stance is a trade, which is what makes
handing one over worth a capability.

### It is that a capability gate gates nothing

The pool is saturated. A drafted party held a median **19 of 28**
capabilities, and `knowledge` was on 99% of parties. Some of that was a
plain bug — `capabilities()` counted the reserve and the dead, so a magus
waiting out the delve in the tavern was lending the party his divination,
and so was one lying in room four. Reading only the living marchers took
the median to 16 and thinned the tail considerably.

It is not enough. `knowledge` is still on 94% of parties and `alchemy` on
83%, and the residue is arithmetic rather than a defect: four marchers
carrying four capabilities each is sixteen slots against twenty-eight
capabilities, drawn from fifteen characters that share the common tags.
**An option 94% of parties can take is not a decision, it is flavour.**

Measured against outcomes, capability breadth predicts nothing. At `hard`
and n=160 the narrow half won 64% against the broad half's 80%, which
looked like the result this whole line of work was after; at n=480 the
same comparison is 68.1% against 71.6%, a gap of 3.5 points and 0.8
sigma. Noise. Medium has no headroom to show anything at all — the
overall win rate is 89%, and nothing can differentiate when nine runs in
ten succeed regardless.

### So draft economics is the prerequisite, not the sequel

The plan had reworking the draft last, after learning which capabilities
matter. That order cannot run: which capabilities matter is unmeasurable
while every party holds most of them. Scarcity has to come first —
fewer capabilities per character, less overlap between characters, a
smaller marching roster, or a cost for using one — and only then does the
examination layer have anything to examine.

**A note on measurement, earned twice.** A party-size or capability
bucket needs several hundred delves before it says anything. Two separate
claims of success in this work — "67% against 100%" and "64% against
80%" — were both noise at n≈150 that vanished at n≈500.

## §O. What a good draft buys, and the resolution gets an editor

Three decisions (2026-08-31, all Ted's):

**A good draft buys margins and access, not win rate.** The difficulty
curve (99/88/71/45) is calibrated and enforced — `npm run calibrate`
holds it, `tests/balance-gate` gates it — so aggregate win rate is a
controlled variable and can never express draft quality. The readout is
score, survivors, trophies, and what the party gets to see and answer.
`npm run margins` measures it. Baseline at n=600, medium, quartile
split on capability breadth:

| | narrow | broad | r |
|---|---|---|---|
| score | 369.5 | 391.6 | 0.119 |
| survivors | 3.1 | 3.4 | 0.155 |
| situations answered | 43.4% | 54.2% | — |
| vaults reached | 0.3 | 0.5 | 0.072 |

Direction right everywhere, magnitude weak: the 370-point score base is
dominated by draft-insensitive sources. **Strengthening the payoffs is
the named next project.** The clean access lever is the one that reuses
existing plumbing: situation successes granting wing KEYS (keys are
already found, carried, narrated, chronicled, and open wings). Do not
half-wire it — that is the dead-declaration bug class.

**The resolution has a budget** (the concision fix, dramaturg finding at
96%). One budget of three prep slots, cards outrank generics, continuity
carries ride free, spell/item lead lines spend a slot, everything else
folds to one clause and the ledger keeps it whole. Two prose trims came
out of it: the formation `effect` gloss (static rules text repeating
verbatim every fight) is gone from prose, and the forced-formation carry
line was shortened. Measured: fight resolutions median 1113 → 393
characters, max 2290 → 642; non-fight rooms all under 320. Concision is
off the dramaturg's systemic list.

**Spotlight is narrated mechanical truth.** The fight resolver measures
health lost per member (blows go to the front rank first) and names the
brunt when it is a real blow (≥4): "🩸 Paracelsus takes the worst of it:
13 of the 68 the party takes." Rationing by threshold means it is
exactly the hard fights — where people die — that clear the bar.

**What the brunt line did not fix:** mortalityEarned still fails ~85% of
delves with deaths, because the doomed usually take their first notable
brunt in the fight that kills them — same room, not an earlier one. The
fix is pre-fight presence, which is Barks work (fighters bark too), not
resolver work. Continuity (~86%) needs more carry *sources* reaching
prose, not better wiring: the wired carries fire ~once a delve against a
probe that wants two.

**A probe broke twice more while this landed** — shortening the carry
line's text broke its marker, and the venom aside was a real carry the
probe couldn't see. Both caught by tests/dramaturg. The lesson stands:
when a mechanic's writing changes, its marker in `CARRY_MARKERS` changes
with it, and the test that refuses all-false probes is load-bearing.

## §P. The gate that does not gate

Two levers built (2026-08-31), one working, one measured into the ground —
and the measurement is the more useful result.

**Access: a reading of the building.** Answering a situation with a
drafted capability now grants `Party.wayIn`, spent at a sealed door: it
opens a locked wing with no key in the dungeon (four in ten have none),
and — worth twice as much, because secret wings are twice as common
(0.68 a delve against 0.33) and a missed one is lost entirely — it
deduces a secret door the roll failed to find. Both halves narrated at
grant and at spend; ledger field added; 20% of delves see it pay, over
the 10% floor `tests/assets` holds.

**And it does not discriminate between drafts.** Grants are
draft-sensitive (1.10 a delve narrow, 1.44 broad). The payoff is not:
0.17 against 0.19, and rooms cleared 11.38 against 11.40. The lever
saturates on *opportunity*: there are ~0.8 addressable doors a delve and
even a narrow party earns more readings than that. Banking more readings
buys nothing when there is nothing left to spend them on.

**The upstream constraint, measured.** Of situations met:

| | narrow draft | broad draft |
|---|---|---|
| offered a capability option | **93%** | 100% |
| took one | 75% | 82% |

A gate 93% of narrow parties pass is not a gate. This is §N's finding one
level down: capability scarcity was fixed on the *cards* (median 19 → 15
of 28) and then re-saturated by the *encounters*, because each asks "do
you hold any of these four?" — and against four independent draws even a
thin party nearly always holds one. Every downstream payoff is capped by
that 7-point gap. No amount of access-lever tuning can exceed it.

The fork this opens is whether an encounter option should be a binary
gate at all. The house already answers this everywhere else (standing
rule 4: gradient outcomes, not binary win/lose) — an option could be
open to everyone and *resolve* by how much of it the party can bring, one
relevant capability giving a partial result and three the full one. That
converts breadth from a key into a quality, which is measurable and
cannot saturate. It is also a change to every encounter's resolveOption,
so it is a decision rather than a refactor.

**Spotlight: the point man.** `Party.pointMan()` names who is actually
standing in front — fighters first, the same order `takeDamage` sends
blows down — said on the first dangerous room and again whenever it
changes, which is nearly always a succession over somebody's body. With
the brunt line it composes into an arc: "Tycho Brahe takes the front of
the march" in room 3, "Tycho Brahe takes the worst of it: 13 of the
party's 14" in room 9. Deaths of somebody the reader had met went from
~22% to 68%; `mortalityEarned` 85% → 67% miss, and `protagonist` left
the systemic list entirely. The residue is mass death in wipes, where
the back rank dies in the same room it is first named — a structural
limit, not a writing failure, and not worth weakening the probe over.

## §Q. The lock becomes a slope

The gate that did not gate (§P) is gone. An encounter option is no
longer a key-check; it is a question the party answers with whatever
disciplines it can bring, and how much it brings decides how well it
goes.

**Adjacency opens the door.** `game/Capabilities.js` now carries
`AFFINITIES`: for each of the 28 capabilities, the two or three
neighbours a person would actually want beside them on that problem.
Holding what an option asks for is still the clean way in; holding two
of its neighbours gets you in as an improviser. A mathematician with a
sense of direction may attempt an orrery.

**Depth grades the answer.** `depth` is how many bearing tags the party
holds, and it prices the outcome in an ADDITIVE band with its own
narrated line: improvising costs 10 renown against a clean job, a second
informed pair of hands pays 10, three disciplines on one problem pay 25.

Additive rather than multiplicative on purpose, and this is the whole
reason the change was affordable. Each of the 86 gated options states
its own figures in its own writing ("+40 gold, +25 score"); scaling
those quietly would make every one of those sentences a lie, which
`tests/prose` gates and which is the Aegis of Ash failure (rule 13). A
separate effect with a separate sentence stating its own number is
honest — and it composed with all 86 options without editing any of
them.

**Measured, at last it discriminates.** Score by draft breadth:

| | before §Q | after §Q |
|---|---|---|
| narrow / broad score | 386.9 / 395.4 | **386.9 / 420.3** |
| pearson r | 0.084 | **0.124** |
| mastery events a delve | — | 0.47 narrow / **1.02 broad** |

On wider-spread random pools the gap is +16%. And the telling line:
*situations answered* went from 45%/54% to 48%/51% — the gap **narrowed**,
which is the point. Discrimination moved off "whether you could" and onto
"how well you did", where it is continuous and cannot saturate. There is
always one more relevant tag to hold; there was never one more lock to
pass.

**What it cost.** Three fixtures asserted the binary model and now assert
the graded one (Brahe is still no diviner, but he may try, and the engine
records that he is improvising). Fallbacks got squeezed a third time —
wider availability outbids the blunt answer — so the per-option patches
became one `BLUNT_ANSWERS` table: a party in trouble stops being clever,
and a fresh party with a temper does not bother, so both ends of the
health curve want the blunt answer and the tidy middle is where expertise
gets spent. Concision regressed to 53% and came back to 21% by trimming
the two new lines and giving situations a 400-character cap, because a
situation now says three earned things rather than one.

## §R. Somebody read the transcripts

Three separate proposal documents converged on the same outstanding
item: every claim about whether the writing was good rested on proxies,
and nobody had read the logs as a reader. So five were read end to end —
the best-scoring, the worst, two medians and a wipe, chosen by the
dramaturg's own ranking across sixty delves.

**The instrument had scored them 56% to 100%. They had the same three
faults, and it saw none of them.** That is the strongest evidence this
project has produced about the limits of automated judgement, and it
arrived within a session of the instrument being built.

### What a reader sees that no probe did

**The party argues in one voice.** "The Reckless were already moving"
six times in nine rooms; "the Cunning picked the safer angle" five times
in eight. The deliberation beat fell back to the party's *temper* — an
abstraction belonging to nobody — whenever no class owned the decision.
Line-level repetition checks missed it because the sentences differ
slightly. A reader does not miss it for a moment. Fixed by preferring a
named magus with a bark over the archetype: the same delve now runs 15
of 16 deliberations in four distinct voices.

**Rooms are furniture inventories.** A monster room opened by listing a
brazier, pillars, a sarcophagus and a pit before the fight was
mentioned, and the same four pieces recurred across rooms, so the
dungeon read as one room redecorated. This is the resolution's
accumulation failure in the predicament beat — a place the concision
editor never looked. Now budgeted at two tells, actionable ones first.

**The climax is an anticlimax.** Bosses died in ONE round taking ZERO
damage: a 65-health monster with attack 20 evaporating before it swung,
because opening damage plus one party swing cleared the bar and the
resolver `break`s on death before the monster acts. The boss's second
act — it turns fierce at half health, with a line written for it — was
being skipped entirely. **No amount of prose could have fixed this**;
it is a mechanical fact presenting as the flattest writing in the log.

### And two things that were simply wrong

**The prose lied at the most consequential moment.** A wipe printed the
same sentence four times, the last announcing that "the survivors march
on" with nobody left to march. Deaths are now counted down through the
group, and the last of a party is written as the last of a party.

**The lines added this session to fix repetition were themselves
repeating.** The mastery band and the reading-of-the-building both
printed verbatim twice in a good delve.

### What it cost, and what it changes

The boss floor moved the curve hard — easy 99% → 70.6%, medium 88% →
46.8% — because bosses now deal about 43 damage where they dealt none.
That is the calibration machinery working as designed: the curve is a
target to re-hit, not a reason to leave a broken climax alone.

`npm run calibrate` then turned out **not to run on Windows at all**
(`ERR_UNSUPPORTED_ESM_URL_SCHEME` — a bare `C:/...` specifier is not a
valid ESM scheme). Standing rule 10 says balance is measured and not
judged; on the machine this is developed on, the measuring half had
never worked.

Three new values were written into the dramaturg **from** the reading
rather than from a theory — `freshVoices`, `freshLines`, `climax` — so
the next reading pass finds something new instead of these again. The
older lesson stands and is now load-bearing: **the reading pass is the
only channel that is not an optimisation target, and it should be run
before any narrative work is called done.**

## §S. v8 — brass tacks

Ted's call, answering §Q's fork in three words: *a dungeon simulator*.
The delve is the heart; everything orbiting it went. Cut wholesale on
2026-09-01, against `v7.0-prototype` as the preserved reference:

- **The town and the campaign.** One draft, one dungeon. Victory shows
  the table standings and offers a fresh draft. A lost magus stays lost.
- **Providence and Divination** — information a self-crawling party
  could never act on.
- **The tactic tree** — a third draft axis at 11% reach. Its pack slot
  went to equipment (2/4/2/1). The hazard architecture now opens to kit:
  the grapple for the pit, the shield for the spikes.
- **Wagers and hexes** — the whole conditions UI. The internal
  `condition` plumbing remains, inert at `none`, removable at leisure.
- **Lock-and-key wings and `wayIn`** — a wing is open or secret, one
  roll, one decision. The mastery band is now the whole payoff for
  answering a situation well: renown, not access.
- **Multi-floor dungeons, stairs, trapdoors** — one floor, 8–10 spine
  rooms, every one of them mattering.
- **Five of eight themes** — delve, castle, icecaverns remain, each
  mechanically distinct (neutral / undead+treasure / elements+disasters).
- **The alchemy inventory loop** — lab and materials rooms, gather,
  brewing, the smoke bomb, the materials currency, `doAlchemy` and with
  it the fugue rule. Hoard potions and monster-drop coatings stay (loot,
  not economy); reagent drops sell for gold; every encounter reward that
  paid materials pays gold and says so.
- **Debate merged into diplomacy** (its only askers were town
  encounters), which sent fencing to Agrippa — the actual soldier — and
  trimmed Sendivogius to three capabilities.

Fallout worth remembering: `leave-it`, `make-it-a-melee` and
`shout-through-it` all starved when the decision weights shifted around
them — the third, fourth and fifth instances of the fallback-starvation
pattern, all caught by tests/prose, all answered in `BLUNT_ANSWERS` or
by weight. And one self-inflicted wound for MEASUREMENT.md: a cleanup
regex using `[^']*` ate 1,160 lines of Narrator.js, because that class
matches newlines — line-based edits only, in files that matter.
