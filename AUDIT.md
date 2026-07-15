# Systems Audit — do the expansions expand the design?

*Audit of every feature layered onto the original SnakeAB-derived core
(drops & trophies, natures, elements & coatings, boss phases, preps,
conditions & hexes, trap types, campaign town, standings, archive,
packs, descriptive narration). The question asked of each: does it
**connect** to the systems around it, or sit beside them? Companion
document: `DESIGN_DIALOGUE.md` (the draft-vs-dungeon design brief).
Both feed the ground-up asset redesign.*

Findings verified against the code (file:line); items marked ⚠️ were
also reproduced behaviorally in headless simulation.

---

## A. Broken connections — a system reads a field nobody writes, or vice versa

### A1. The `slow` trait reaches zero monsters ⚠️
- Combat implements it (first round costs no damage,
  `RoomEncounters.js:437`), the Narrator tells it, the Bestiary lists
  it in `TRAITS`, the drop table has a `slow` fallback (`Drops.js:95`).
- **No monster anywhere is assigned `trait: 'slow'`** — not in
  `NATURES`, not in the alchemy pack.
- Eight monsters instead carry a stray roster-level `slow: true`
  (`DungeonGen.js:310,345,346,381,422,423,448`; `alchemyPack.js:93`)
  that **no code reads** — and most of them were then given a
  *different* trait by the Bestiary (gelatinous → armored, bog-toad →
  venomous…), silently overriding the original design intent. The
  gelatinous horror, magma toad, obsidian golem, mutant vine, root
  golem, bog toad, Glacier's Heart, and ouroboros were all designed
  slow; none of them are.

### A2. Failing to turn the boss wins the dungeon ⚠️
- `turn-undead` failure deals damage but neither clears the room nor
  retreats (`RoomEncounters.js:546-560`). The Simulator advances every
  tick and treats walking off the end of the path as victory
  (`Simulator.js:81-84`).
- Net: against any undead boss (Shrouded King, Abbot of Worms, both
  vampires), a failed turning **marches the party past the boss into a
  victory** — no kill, no drop, no hoard, and the epitaph reports a
  cleared dungeon. Reproduced directly. It is the only non-clearing,
  non-retreating, non-lethal monster outcome, so it is the only way to
  fall off the path — but the undead-boss rosters make it common.

### A3. Archived layouts lose trap types and combined conditions ⚠️
- `serializeDungeon` persists `trapDamage` but **not `trapType`**
  (`DungeonGen.js:477-485`). Replayed traps all default to `'spike'`
  (`RoomEncounters.js:604`): fire counters, poison linger, the
  alarm → +2 chain, and trap tells all vanish from archived dungeons —
  against the Archive's stated promise, "re-enterable exactly as they
  were" (`Archive.js:5-8`).
- Combined/hexed conditions don't survive either: `serializeDungeon`
  stores `conditionId`, but `combineConditions` mints ids like
  `'swarms+traps'` that `getCondition` can't resolve — replay falls
  back to `none` (`Conditions.js:67,89`), zeroing the score wager.
- Monster fields, by contrast, round-trip perfectly (the object is
  spread whole, `DungeonGen.js:480,504`) — kind, trait, weak, resist,
  undead, bribable, isBoss all survive. The trap/condition gaps are
  omissions, not a systemic flaw.

### A4. The shock element has no upside
- `sp-chain` (Chain Lightning) is `element: 'shock'` (`Cards.js:138`).
  Four monsters **resist** shock; **no monster in the game is weak to
  it** (`Bestiary.js`, all blocks). The element can only ever fizzle
  (×0.5) or do nothing (×1) — strictly worse than no element, and the
  smart-caster logic (`spell-strike` picks the best element) will
  correctly never favor it. Fire/frost/holy all have both sides.

---

## B. Missing accommodations — systems that ignore each other

### B1. Non-kill boss clears bypass the reward layer ⚠️
Bribable bosses exist (Ogre King, Forge Tyrant, Bog Witch). Bribing one
clears the run for 15g with **no boss drop, no hoard find, no trophy**
(`RoomEncounters.js:562-568`) — the trophy case then testifies the
dungeon paid nothing. `turn-undead` success *does* claim the drop, so
the two non-fight clears disagree with each other as well as with the
fight path.

### B2. The score economy pays the same boss three different amounts
- Fight: flat `+100` bounty (`RoomEncounters.js:447-448`) **plus** the
  Simulator's `+100 × scoreMultiplier` boss-clear bonus
  (`Simulator.js:169-172`). Turn: `+30` + the bonus. Bribe: `+5` + the
  bonus.
- The fight bounty is also flat — untouched by the difficulty/wager
  multiplier — so the wager pays differently depending on *how* the
  boss died. Standings compare these as one currency.

### B3. The drop economy re-priced old cards and nobody re-read them
Sneak, flee, fear, and bribe now carry an invisible opportunity cost
(the foregone drop). Measured consequence: **Craven is a trap pick —
62% wins vs 83% baseline, 0.8 trophies vs 2.1** (200-run sweep,
`DESIGN_DIALOGUE.md` §3). Covetous got the mirror buff deliberately
(`RoomEncounters.js:187-189`); every other avoidance archetype and
card text still reads as if fights were pure cost.

### B4. Drops and conditions don't know about each other
- Monster gold-drops are flat while chest gold scales: Dark Pact's
  `goldMult 1.5` inflates room gold (`DungeonGen.js:272,279`) but not
  the toll-purse's 15g (`Drops.js:168`).
- Drops don't scale with depth/difficulty at all, though the monsters
  dropping them do (`DungeonGen.js:545-551`). Duplicate kills stack
  duplicate trinkets.
- The boss phase bump is a flat `+2` (`RoomEncounters.js:434`),
  unscaled by the Long Throne's `bossAttackMult` — a wagered boss
  enrages by the same amount as a plain one.

### B5. The alarm only warns the `fight` path
A tripped alarm gives the next monster +2 attack in a fight
(`RoomEncounters.js:406-410`), but sneak, turn, fear, and bribe ignore
`party.alarmed` — a forewarned monster is exactly as easy to sneak past
as an unwarned one, contradicting what the narration states.

### B6. What the game remembers, nothing persists
`party.trophies` flows to every *live* surface (HUD, town, endings,
event feed) and to `getSummary`/`getRunResult` — then dies at every
persistence boundary:
- `Progression.recordRun` drops `trophies` **and `spellsLearned`**
  despite both arriving in the summary (`Progression.js:24-37`,
  `main.js:567-576`); its `victory` field actually records "retired,"
  not "won."
- `Standings` rows carry score + depth only — rivals earn trophies in
  their headless runs and the table can't show them
  (`Standings.js:30,59-71`).
- `Archive.save` outcomes are `{victory, score, depth}`; editor-saved
  copies store `outcome: {}` (`main.js:421-426`, `ArchiveUI.js:191`).

---

## C. UI: surfaces that never learned about the new systems

### C1. Dead state — exposed every tick, rendered nowhere
- **`party.grimoire` is never displayed** (`Simulator.js:220`; no
  reader in `main.js`/`index.html`). The live spell list — which grows
  mid-run from library study and scroll drops — is invisible except as
  a one-shot toast. The headline UI gap: elemental casting is a core
  system whose resource has no surface.
- **`party.personalities`** shows at draft time only — never during
  the delve, though it biases every room decision.
- The roster shows health but not the exposed attack/defense/mind, so
  a coating's numeric effect is invisible even as the kit line names it.

### C2. Renderers
- The 2D fallback `DungeonRenderer` predates every new system: no
  trait/weakness badges, no trap types, no statuses — no-WebGL players
  see the pre-Bestiary game (`DungeonRenderer.js:16-102`).
- The iso renderer badges the trait and *one* weakness but never
  resists (`IsoDungeonRenderer.js:233-246`) — the player can't see why
  their fire spell fizzled on a salamander.
- All three trap types render as the same spike-gate tile
  (`SpriteAtlas.js:105,144-153`).
- `playEffect` has no case for `linger` (venom death) or `bribe` — those
  ticks produce no visual at all (`IsoDungeonRenderer.js:46-60`).

### C3. Events flattened before the UI can see them
The Simulator's narration payload carries only composed strings —
`bossPhased`, `preps`, `spellEdge`, and the structured `drop` never
reach `getState` (`Simulator.js:117-132`). So `describeTickEvents`
cannot toast the boss enrage (the marquee mid-fight moment), an
element resist that wasted a scroll, or venom onset — while lesser
events (gold windfall, spell learned) all have toasts. The trophy
event only works because it diffs `party.trophies` instead.

### C4. The creation tools build pre-expansion content
- **Card Workshop**: the spell form has no `element` field (school is
  hardcoded `'homebrew'`) — forged spells can never participate in the
  elemental system; no coating/venom fields for forged equipment
  (`CardEditorUI.js:104-160`).
- **Archive editor**: `PAYLOAD_KEYS` is the pre-nature schema — no
  trait/weak/resist/bribable/undead/trapType — and `retypeRoom`
  actively deletes what it doesn't know (`ArchiveUI.js:19,22-30,
  154-173`). The editor cannot express, and destroys on contact, most
  of what now defines a room.
- DraftUI shows spell elements on the card face but drops them in the
  pool and rival summaries (`DraftUI.js:93,116-135,163-166`).

### C5. Style split-brain in the story panel
The narration is descriptive (house style), but the panel banner still
opens with literary theme taglines and condition flavor
(`main.js:397-411`), and the town interlude entry renders two empty
beat divs (`main.js:450-454`). Card text keeps flavor by design; the
banner is the one panel surface where the styles collide.

---

## D. Design-pillar violations (measured)

### D1. "Both are viable" isn't true — the draft is solved
Pillar 2 promises the 5-character mob and the 2-character elite are
both viable. Measured (200 seeded runs per config, medium):

| Draft | Win % |
|---|---|
| 5 characters, no kit | **100%** |
| 4 characters + full kit spread | 100% |
| 3 characters + best bomb item | 64% |
| 2 characters + the entire kit budget | 55% |

A body outvalues any item at every difficulty — two bomb items close
less than one body's gap even at nightmare (24% vs 32%). Consequence
for Pillar 1: the top of the draft has no agonizing picks. Full
analysis and redesign brief: `DESIGN_DIALOGUE.md`.

### D2. Baseline difficulty doesn't resist a full party
Any 4+ body draft wins ≥92% on medium; run-level tension only exists
at nightmare or in deliberately thin drafts.

---

## E. What holds together (verified good connections)

- **Monster serialization is whole**: kind/trait/weak/resist/undead/
  bribable/isBoss all survive the archive round-trip.
- **Drops ↔ Bestiary**: every kind in every theme and pack has a
  signature drop; trait fallback + generic floor make "nothing drops
  nothing" structural and test-enforced.
- **Personality archetypes are fully consistent**: all 7 archetypes
  have a card, decision weights, a deliberation voice, and barks in
  all five classes — no orphans in either direction.
- **Spell/equipment id cross-references all resolve**: every
  `hasSpell`/`castSpell`/prep-bonus id exists with the right fields;
  class-keyed items cover all five classes; conditions are none-safe.
- **Preps discipline**: every kit modifier lives in one table with its
  narration note attached — the pattern the redesign should copy.
- **The rivals play the same game**: standings run real campaigns
  through the same encounter code, so balance changes (including
  drops) hit the whole table symmetrically.
- Cosmetic dead fields, for the record: equipment `slot` and spell
  `school` are written but read by no mechanic.

### The five plain monsters (probably fine, now documented)
`skeleton`, `goblin-gang`, `failed-homunculus`, `castle-thrall`, and
`bog-witch` have drops but no Bestiary nature — traitless, weakness-less
"plain" monsters. Acceptable as pacing, but currently an accident of
omission rather than a stated tier.

---

## F. Redesign priorities

1. **Reconnect the broken wires** (A1-A4): assign or retire `slow`;
   close the boss walk-off; serialize `trapType` + combined
   conditions; give shock a weakness or drop the element.
2. **One reward rule for non-kill clears** (B1), then reprice and
   re-text every card the drop economy touched (B3).
3. **Unify the score economy** (B2, B4) — one currency before
   standings mean anything; scale drops and phase bumps with the same
   knobs that scale monsters.
4. **Persist what the game remembers** (B6) and **surface what it
   computes** (C1-C3): grimoire and personalities on the HUD;
   structured narration payload so enrage/resist/drop become events.
5. **Bring the creation tools onto the current schema** (C4) — until
   the editor can express natures, trap types, and elements, every
   archived or player-made asset regresses to the old game.
6. **Then the balance redesign** per `DESIGN_DIALOGUE.md` §4-5: body
   pricing, kit that scales with smallness, rarity-as-event, drafting
   against a visible dungeon. Asset rewrites follow the new economy —
   not before it.
