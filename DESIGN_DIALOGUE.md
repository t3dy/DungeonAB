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
