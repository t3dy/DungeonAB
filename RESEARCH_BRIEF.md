# The Historians' Table — worldview into meaningful choice

*Working session: the narrative designer (**NARR**) and TCG designer
(**TCG**) from `DESIGN_DIALOGUE.md`, joined by two historians from the
alchemy & medieval-magic research corpus — **HIST-A** (history of
alchemy, 15th-17th c.) and **HIST-M** (medieval learned magic). The
charge: make the player's meaningful choices capture what the
historical magi and alchemists actually believed they were choosing
between. Output: a worldview-to-mechanics map (§2) and the question
list for the C:/Dev research databases (§3).*

---

## 1. What the game already borrows — and what the audit opened up

Inventory of historical material currently in the build:

| In the game | Source | Where |
|---|---|---|
| Green Lion, Ouroboros, Caput Corvi, the two birds, Rebis, tail-devouring Dragon — with the actual engravings | Maier, *Atalanta Fugiens* (1617), plates processed in the **EmblemRoguelike** project | `alchemyPack.js`, `src/assets/emblems/` |
| Michael Sendivogius ("aerial nitre"), Count Michael Maier, the Soror Mystica | biographical | pack characters |
| Perenelle (works in doubles) | Flamel legend | base `Cards.js` |
| Solve et Coagula, Aurum Potabile, Powder of Projection | operations of the Work | pack spells |
| Court Athanor, Pelican Vessel, Flask of Vitriol ("Visita Interiora Terrae…") | laboratory apparatus; the VITRIOL acrostic | pack equipment |
| The Hermetic ("as above, so below") | Emerald Tablet | pack personality |
| Lab/materials/library room economy; the stillroom; "glassware and regret" | the working laboratory | core room types |

**TCG:** And the audit (`AUDIT.md`) just cleared the ground exactly
where a historical system would want to build: the elemental table
needs redesign anyway (shock has no upside — A4), the drop economy is
about to reprice every card (B3), the archetypes need their wagers
printed (dialogue §3), and rarity/bomb design is open (dialogue §4).
We are not decorating a finished game with history; the redesign has
holes shaped like a worldview.

**HIST-A:** Good, because the worst outcome is *reskinning* — pasting
Decknamen on a fireball. The historical material is interesting to a
game precisely because it was already a **decision system**: what to
work on, when, with whom, under whose protection, at what spiritual
risk. Those are draft picks and room choices. Use the structure, not
just the nouns.

---

## 2. Worldview structures as choice architectures

Each entry: the historical structure → the meaningful choice it
generates → the existing system it lands in → what we need from the
databases (feeds §3).

### 2a. Correspondence and election — *as above, so below*
**HIST-M:** The learned magician's core act is not throwing force; it's
**choosing the right materials, timing, and channel** according to
correspondence tables — planets to metals to plants to hours (the
scales in Agrippa's *Three Books*, the elections of the Picatrix). The
practitioner's skill IS the lookup.
**TCG:** That's an element system with real texture. Today's
fire/frost/shock/holy is a bare rock-paper-scissors, and the audit
shows it's half-broken. A correspondence redesign — say seven planetary
channels binding metals, materials, monster natures, and room types —
would make the *draft* the place where you assemble a correspondence
engine, and `spell-strike`'s "the caster reads the foe" logic already
models election. The Bestiary's weak/resist table is the crude ancestor
of Agrippa's scales.
**NARR:** And the narration house style fits: "Mars governs the iron in
the blade: damage ×1.5 against the martial golem" is descriptive AND
worldview-laden.
**Needs from the corpus:** structured correspondence tables (planet ↔
metal ↔ material ↔ hour ↔ character), and which system (Agrippa? Ficino?
Picatrix?) the research is deepest in.

### 2b. The stages of the Work — nigredo, albedo, citrinitas, rubedo
**HIST-A:** The Work is a **sequence with mandatory suffering**: the
nigredo (blackening, death, putrefaction) is not failure — it is the
prerequisite. Skipping ahead is precisely how you shatter the vessel.
**NARR:** That is a run-structure idea the game gropes toward already:
campaign depths, boss phases, the wipe-as-story. A run (or campaign)
staged as the opus — where early adversity mechanically *feeds* later
transmutation — would give the drop/trophy economy its historical
meaning: the multiplication of the stone.
**TCG:** Mechanically it's a comeback engine, which the Boss Monster
lessons already demand ("build-in catch-up"), and it answers audit B4
(drops don't scale): drops could ripen with the stage of the Work
rather than raw depth.
**Needs:** which stage-schemes the research favors (4-stage, 7-gate
Ripley, 12-gate?), and emblem/plate sequences keyed to stages
(Atalanta's 50, Splendor Solis's 22, the Ripley Scroll).

### 2c. Licit and illicit knowledge — the transgression wager
**HIST-M:** The medieval magus's sharpest choice: **natural magic or
necromancy** — is this working drawing on the hidden virtues of things
(licit, mostly) or on intelligences you must petition (perilous, and
damning if they're demons wearing better names)? Every grimoire
transaction prices this: circles, fasts, confession first — protective
ritual as *cost paid up front against a tail risk*.
**NARR:** The game already has the seed: `deep-study` (the sealed
texts), `desecrate` (the Devout's -5 refusal), forbidden-school spells.
What's missing is the **worldview-true cost structure**: today the
sealed text costs 4 damage on a bad roll; historically the cost is
*deferred and compounding* — exactly what the desecration flag
(`party.desecrated`, next disaster hits harder) does in miniature.
**TCG:** So the transgression axis becomes a printed wager class:
immediate power, deferred compounding cost, with piety (Devout,
shrines, the cleric) as the hedge you draft. That's the Craven lesson
(audit B3) applied deliberately: avoidance archetypes and indulgence
archetypes should both have legible prices.
**Needs:** the condemnation/discernment material — which texts frame
the licit/illicit line (Aquinas? the 1398 Paris articles? grimoire
prologues?), and good concrete *named* costs and protections to print
on cards.

### 2d. Patronage and the court — the alchemist's other dungeon
**HIST-A:** Most historical alchemists' risk wasn't monsters; it was
**patrons**. Promise transmutation to a prince and the timeline is a
noose: Kelley died of the escape from Rudolf II's castle; Sendivogius
was robbed and imprisoned; court positions were wagers with gold
multipliers and imprisonment as the loss condition.
**TCG:** That is *literally* the Conditions system — a wager laid on
the run for a score multiplier — and the town between dungeons. The
audit says conditions ignore the new systems (B4) and the town is a
vending machine; the patronage frame unifies them: the wager has a
face, a deadline, and a temper. Score-as-reputation gives Standings a
fiction.
**NARR:** And it adds the loss-shape the game lacks: between "retired"
and "wiped" there is *ruined* — the patron's dungeon. Rudolf's Prague
is a theme begging to exist (the game already has his court alchemists
in the pack).
**Needs:** the patronage case studies in the corpus — who promised
what, on what timeline, with what outcome — as a table we can price
wagers from.

### 2e. Secrecy and Decknamen — the draft as reading practice
**HIST-A:** Alchemical texts hide the Work under cover-names: "our
mercury is not the common mercury." The reader's choice — literal or
decoded reading — is the difference between poisoning yourself and
proceeding. The tradition's *trap cards* are literalist readings.
**TCG:** The game's trap-card rule (curses printed, AI drafters
flinch, wheels to players who read deeper — items.test) is already
this. Formalize it: cards whose surface text and true function
diverge, with the decode learnable (from library rooms, from the
Hermetic personality, from having Maier at the table). Signal-reading
in the draft becomes textual reading — the historians' skill as the
player's skill.
**Needs:** favorite Decknamen pairs (cover-name ↔ referent) from the
corpus, especially ones with a *punishing* literal reading.

### 2f. Ora et labora — the shrine and the bench
**HIST-M:** The laborant's day was prayer AND furnace-work; the
*Mutus Liber*'s plates alternate oratory and laboratory. The Soror
Mystica card already gestures at the two-person, two-mode Work.
**NARR:** The game has the geography (shrine rooms, lab rooms) but no
tension between them. Under scarcity — one detour, shrine or lab? —
the choice would capture the devotional-operative balance instead of
being two unrelated vending machines. The `pious` and `scholarly`
weights already pull in those directions; the map just never makes
them compete.
**Needs:** whether the corpus has material on laboratory piety
(prayers before working, Khunrath's oratory-laboratory) to write the
choice honestly.

### 2g. The weighing — the Chymical Wedding's admission test
**HIST-A:** In the *Chymical Wedding of Christian Rosenkreutz* (1616),
the invited guests are **weighed on scales against weights of virtue**;
most fail and are ransomed or whipped; the worthy proceed to stages of
the wedding. It is a party-evaluation mechanic in a 1616 text — an
initiatic structure where *composition is judged before the trial
begins*.
**TCG:** That's a draft-scoring ritual and a dungeon-gate mechanic in
one: the weighing as the moment the drafted party's wagers are read
back to the player before the descent. It could also be the standings
ceremony's fiction.
**Needs:** the initiatic-trial structures the research covers (CRC's
days, Egyptian-rite material, tower-of-Olympus stages) as candidate
run/ceremony skeletons.

---

## 3. The questions for the research databases (C:/Dev)

*The point of these: every §2 thread needs specific corpus material to
become assets. Answers shape which threads we pull first and what the
asset schema must hold.*

**About EmblemRoguelike** (the pack credits it for the emblem plates):
1. How much of *Atalanta Fugiens* is processed — all 50 plates, or the
   six in `src/assets/emblems/`? Are the **epigrams/mottos and
   discourses** captured as structured text (Latin, English, both)?
   Are the **fugues** (the music) digitized? A full 50-emblem corpus
   with text would let the emblem monsters/drops/spells carry authentic
   mottos in the descriptive style — and 50 is exactly a card set.
2. Are other emblem/plate series processed there or nearby — *Splendor
   Solis* (22 plates), the Ripley Scroll, *Mutus Liber* (piety ↔ labor,
   §2f), *Rosarium Philosophorum* (the Rebis sequence)? Which have
   image extractions usable as sprites the way the Atalanta plates were?

**About Megabase** (DESIGN.md cites its chats as upstream sources):
3. Do your alchemy/medieval-magic research conversations live in
   Megabase in queryable form, and how are they organized — by figure,
   by text, by theme? Concretely: are there chats on **Dee, Kelley,
   Ficino, Agrippa, Paracelsus, Khunrath, the Flamels, Sendivogius,
   Maier** deep enough to mine for character cards whose traits are
   *documented positions and anecdotes* rather than invented flavor?
4. Is there patronage/court material (§2d) — Rudolf II's Prague, who
   promised what to whom, imprisonments, escapes — that could be
   tabulated into wager-conditions with historical names and prices?

**About structured data:**
5. Do you have (or want built) **correspondence tables as data** —
   planet ↔ metal ↔ material ↔ hour ↔ virtue (Agrippa's scales, Ficinian
   astro-medicine, Picatrix elections)? This is the single highest-value
   dataset: it would replace the broken 4-element table (audit A4) with
   a historically grounded system, and §2a can't start without knowing
   which correspondence scheme your research trusts.
6. `C:\Dev\games\ideas.json` — beyond the `dungeon-autobattler` entry,
   are there other alchemy-adjacent concepts there (the EmblemRoguelike
   entry itself?) whose mechanics or asset lists we should fold into
   this redesign rather than rediscover?

**Strategy questions (these shape which §2 threads lead):**
7. Which worldview tension do you most want the *player to feel in
   their choices*: the *licit/illicit* wager (§2c), the *patronage*
   economy (§2d), *correspondence mastery* (§2a), or the *stages of the
   Work* as run structure (§2b)? We'd sequence the asset rewrite around
   the top one or two.
8. Historical fidelity register: are invented-but-plausible figures
   (the Soror Mystica) and composite monsters acceptable alongside
   documented ones, or should the pack split "documented / legendary /
   invented" tiers explicitly (which the TCG designer notes would map
   neatly onto card rarity)?
9. Period boundary: the pack says 17th-century, the research says
   medieval too — do we treat *medieval learned magic* (Picatrix,
   grimoires, §2c) and *early-modern alchemy* (§2a-b-d) as **two packs
   with different choice-textures**, or one continuous corpus?

---

## 4. Standing note for the redesign

Whatever the answers, one rule from both historians: **the worldview
lives in the costs, not the nouns.** A player who learns "don't read
the sealed text without the cleric's blessing, don't promise the
patron gold you haven't made, don't mistake the Green Lion for a lion"
has learned something true about the historical mind — even if they
never read a caption. Renaming fireballs teaches nothing. Price things
the way the magi priced them, and the game becomes the argument.
