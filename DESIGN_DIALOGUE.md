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
