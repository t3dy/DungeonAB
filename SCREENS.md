# SCREENS.md — the screens, the frames, and why the crawl cannot be watched

Design file, 2026-09-04. Written after Ted's report that he still does
not see the party moving through the dungeon or fighting positional
battles when he watches a delve, and that he has to scroll to find the
button that starts it. Both are measured below on the live v8.2 build at
a 1366×768 laptop viewport, and both are real. Neither is a tuning
problem. The first is a pacing model that resolves a whole room in one
call and draws only the result; the second is a page model in which the
primary action is always the last thing on a scrolling page.

House pattern: **the trouble first, then ranked proposals** (§S at the
bottom), with a recommendation and a phasing.

---

## 1. The crawl is a slideshow

What the player is promised is an autobattler: a party that walks the
dungeon and fights in formation while you watch. What is built is a
room-per-tick slideshow with a caption.

**The pacing model.** `main.js` `mainLoop` calls `simulator.tick()` every
1400 ms (÷ the speed slider). One tick is one *room*, resolved whole in
`Simulator._tick`: the march and its lamp cost, the lingering poison, the
predicament, the party's decision, and the resolution — including every
round of a fight. `RoomEncounters.resolveFight` runs its rounds in a
`while` loop (`RoomEncounters.js:1072`) and returns totals: how many
rounds, how much damage taken, whether it was won. The rounds are counted,
not recorded. Nothing outside that function ever learns that in round two
the boss phased and in round three the cleric healed mid-fight — except
as prose.

**The drawing model.** `IsoDungeonRenderer.updateParty` runs once per
tick. It calls `partyGroup.clear()`, rebuilds every party sprite from
scratch and places it at the new room's slots. The party does not walk
between rooms; the *camera* eases toward the new room at 0.12 a frame
(`animateFrame`) while the party sprites are already standing there. The
corridor the party "walks" is drawn and never walked.

A fight is drawn as: the monster sprite is present when the party
arrives; `playEffect` puts one slash sprite over the room's centre for
0.7 s; on the next `render` the monster sprite is gone because
`room.cleared` is true. One flash, then an empty room.

**The formation is honoured and invisible.** `RoomLayout.partySlots`
really does put one blade forward for a column and three for a wedge,
1.6× spacing for loose order and 0.7× for a shield wall, and squares the
front rank up against `monsterSpot`. This is the positional battle Ted
is looking for, and it exists as a *pose* — the party stands in it for
1.4 s and never moves inside it. The frontage that prices the fight
(`Formation.js`, `combatAttack(form.frontage)`) is never shown as the
front rank swinging while the back rank waits.

**Measured on the live delve** (seed `delve-*`, castle, 1366×768):

| | |
|---|---|
| Time a room is on screen | 1.4 s at 1.0× |
| Distinct beats drawn per fight | 1 (the slash), 0.7 s |
| Party sprite motion between rooms | none (rebuilt at the new slots) |
| Party sprite motion within a fight | idle bob only, ±0.05 units |
| Monster sprite motion within a fight | sway only; removed on the next render |
| Canvas | 593 × 565 px of a 1366 × 768 viewport (32%) |
| Party sprite height on that canvas | ≈ 22 px |

The chronicle, meanwhile, narrates a fight that took "3 rounds" with a
mid-fight heal and a boss phase. The prose and the picture describe
different games. Rule 13 gates the prose on accuracy; nothing gates the
picture on the prose.

**Why the balance is not the problem.** Every number is right. The
resolver is deterministic given its rolls, the curve is calibrated, and
`tests/silence.test.js` proves nothing moves unreported *in the record*.
The record is complete; the *performance* of the record is a single
frame. That distinction is the whole design below: change how the result
is shown, and do not touch how it is computed.

## 2. The button is always below the fold

Three surfaces stand between the draft's last pick and the first frame
of the crawl, and the primary action is the last element on two of them.

**Draft complete** (`DraftUI.renderDraftComplete`): the whole pool is
rendered as full cards in a grid — 27 cards on the measured run — then
"The Rest of the Table", then "The Delve" (difficulty + seed), then
🏰 Enter the Dungeon.

**The muster** (`showMuster` → `OutfitUI.renderOutfitting`, drawn into the
`#gameover-display` overlay): one tall card per adventurer with kit,
workings and "take off" buttons, then ⛏️ March on the Dungeon.

| Surface | Scroll container | Content height | Primary button top | Fold |
|---|---|---|---|---|
| Draft complete | `#draft-container`, 692 px | 1761 px | **1763 px** | 2.5 screens down |
| Muster | `#gameover-display`, 628 px | 1215 px | **1211 px** | 1.9 screens down |

Two scrolls to the bottom of two pages, back to back, to start watching
the thing the game is named for. The muster's kit is already dealt out
by best fit before the screen opens (`startDelve`: "kit is dealt out by
best fit"), so the second page is asking the player to scroll past a
decision that has already been made well.

There is a third, smaller version of the same fault on the delve screen
itself: `#ui-container` is a scrolling column (736 px of content in 692)
with the party roster, the controls and a help sentence on top and **the
chronicle last, 135 px tall** at the fold. Rule 6 calls the story panel a
product surface. It gets 18% of the column and scrolls.

## 3. There is no screen model

The app has five surfaces and three ways of showing one:

| Surface | Mechanism |
|---|---|
| Help | `#help-overlay`, a `.help-card` modal |
| Draft / draft complete | `#draft-container`, shown by `style.display` |
| Muster | the `#gameover-display` overlay, borrowed |
| Delve | `#world-container` + `#ui-container`, shown by `style.display` |
| Results | `#gameover-display` again |

`main.js` toggles `display` on containers by id in `startNewDraft`,
`startDelve`, `runCapture` and `endGame`. There is no notion of "the
current screen", no place a screen declares its primary action, and no
shared frame (header + body + action bar) they all fit into. That is why
each one solved "where does the button go" separately and each put it at
the bottom of the content. The header is 76 px on every screen, its
buttons (Archive, Cards, Records, Help) are dev and meta surfaces that
have nothing to do with a delve in progress, and the delve's own
controls (Pause, Step, Speed) are a panel in the scrolling column.

---

## §S. Proposals, ranked

Each is independent; S1 and S2 are a day, S3 is the real work. Everything
here is presentation. **No proposal changes a number the simulator
computes**, so the curve, the goldens, the census and the mining report
all stand (rule 10 is the reason; PROBLEMS P8 is the warning).

### S1. One frame, and the button lives in it — *recommended, first*

A `ui/Screens.js` with four screens — **Table** (the draft), **Muster**,
**Delve**, **Reckoning** (results) — each rendered into one body region
under a slimmer header, with a **fixed action bar** at the bottom of the
viewport that every screen owns. The primary action is *always* in the
bar, never in the scroll: `Take the pick` is implicit on the Table, the
Muster's bar holds ⛏️ March, the Delve's bar holds Pause / Step / Speed,
the Reckoning's holds Draft Again / Read the Saga.

Then compress what scrolls:

1. **Draft complete and the muster are one screen.** Both show the pool;
   the draft-complete page's 27 full cards are the thing the muster
   shows again with kit attached. Merge them: the Muster shows the party
   as a *row of four* with their kit, the rest of the pool as compact
   one-line entries, difficulty and seed in the bar beside March.
2. **Skip the muster by default.** Kit is dealt by best fit already. The
   bar reads ⛏️ March · *change kit* — the outfitting is a step back, not
   a step through. A player who never touches it never scrolls.
3. **The rivals' pools** go behind a disclosure on the Reckoning, where
   comparing scores is the point, instead of between the pool and the
   button.

Measured target: Enter/March visible without scrolling at 1366×768 and
at 1280×720; the chronicle never below the fold on the Delve.

**Why first:** it is the cheapest, it is what Ted asked for in words,
and S3 needs a frame to put its controls in.

### S2. The delve screen is the picture — *recommended, with S1*

Invert the split. Today the canvas is 46% wide and the text column 54%;
the canvas is 32% of the viewport and the chronicle 2.4%.

- **Canvas takes the width** (≈ 68%), full height under the header,
  camera pulled in on the party's room (`camZoom` exists and is unused
  during play; a fight should tighten it). Party sprites go from ≈ 22 px
  to ≈ 40 px tall without touching the atlas.
- **The chronicle is a full-height column** (≈ 32%) beside it, newest
  entry pinned to the bottom, no other panel in it.
- **The party roster becomes a HUD strip** over the bottom of the canvas:
  four portraits with health bars, the wounded dimmed, the dead greyed —
  the same data `party-roster` shows, in a quarter of the height.
- **Controls move to the action bar** (S1). The stat line (rooms, gold,
  score, oil) moves to the header's right side.
- The debug log leaves the product surface (a `?debug=1` panel).

This is Ultima's frame — the world large, the text beside it — and it is
what GRAPHICS.md §G3 dropped the camera to 30° for. A 593 px canvas
wastes that.

### S3. Beats, not ticks — the room is *performed* — *the real fix*

Keep `Simulator._tick` exactly as it is: one call resolves one room and
the record is complete. Change what happens *between* two ticks: instead
of drawing the result and waiting 1.4 s, the UI plays the room as a
sequence of **beats**, and the next tick is not taken until the
performance is done. The speed slider scales beat durations instead of
the interval.

**The beats of a room**, in order, from data the simulator already has:

| Beat | Drawn as | Data source |
|---|---|---|
| March | party sprites tween along the corridor from the last room to this one, camera following, torch with them (≈ 0.8 s) | `roomIndex` before/after; `dungeon.edges` for the corridor |
| Arrival | predicament line appears in the chronicle; monster (if any) is already standing at `monsterSpot`; the party forms up into the chosen formation — slots tween, not snap | `narration.predicament`, `lastFormation` |
| Deliberation | the advocate's portrait pulses in the HUD; deliberation line appears | `narration.deliberation` |
| **Round** ×N | front-rank sprite(s) lunge toward the monster and back; slash / element glow lands *on the monster*, not the room centre; monster health bar ticks down; monster's counter — the front rank recoils, a damage number rises; mid-heal glows the target; boss phase flashes and the monster's sway quickens | **new:** a `rounds[]` record from `resolveFight` |
| Resolution | monster falls (sprite tips and fades) and the drop glints; or the party turns and tweens back down the corridor (flee); or sneaks along the wall (sneak); resolution line appears | `narration.resolution`, `room.cleared`, `action` |
| Falls | the fallen sprite drops and stays as a marker; fall line appears | `narration.falls` |

**What has to change in the simulator: one thing.** `resolveFight`
pushes one entry per round into the result — `{ round, swing, incoming,
monsterHealth, heal?, phased?, quaffed? }` — where it currently only
increments `rounds`. The numbers are the ones already computed; the
record gets *longer*, not different. The narration payload carries it as
`narration.rounds`. That is a rule 8 change (a new field with writing):
the per-round prose is a beat, not a chronicle paragraph, so the
chronicle keeps its three-beat entry and the ledger keeps the rounds.

**What has to change in the renderer.** Party and monster sprites become
**persistent, keyed by name**, tweened between slots, instead of
rebuilt each tick. A `ui/Choreography.js` owns a beat queue: it takes a
narration + rounds, emits a timed sequence of sprite tweens, FX and
chronicle appends, and resolves a promise when done; `mainLoop` waits on
that promise instead of the 1400 ms interval. The chronicle appends each
line *when its beat plays*, so the prose and the picture finally agree —
the resolution line lands on the frame the monster falls.

**Why this is the positional battle.** Nothing new is simulated. The
front rank that `frontage` prices is the front rank that swings; the
back rank that stands off is seen standing off; a wedge's three blades
lunge and a column's one does; flanking (`tac.flankDamage`) is the
party wrapping the monster's slot. The formation the maths chose is
performed rather than posed.

**Cost.** Two to three sessions. Test surface: `tests/choreography.test.js`
proves every action id has a beat sequence and every rounds record plays
to completion in bounded time (a fight of 12 rounds at 1.0× must finish
under ~10 s, or the crawl drags); the capture harness (`Frames.js`)
gains a `beat=` parameter so a screenshot can be taken mid-round.

**Gate.** Rule 13 extended one step: for every room in a seeded
transcript, the beats played equal the beats narrated.

### S4. A real tactical layer — *rejected for now*

Simulate the fight on the room's tiles: positions, reach, movement,
per-round decisions. This is the "positional battle" in its strongest
sense and it would be a new game. It replaces the resolver, moves every
number, and needs the calibration, the census, the mining report and
half the prose gates re-run. GRAPHICS.md §G4/§G5 and this file's S3 get
the picture most of the way there without it. Revisit if S3's performed
fights still feel like a pose.

### S5. Cinematic camera per beat — *later, with S3*

`threejs-camera-direction` (the skill exists in this workspace): a
fight beat pulls in and drops lower; a march beat pulls back and leads;
the boss room holds wide. Cheap once S3's beats exist; meaningless
before.

---

## Recommendation and phasing

**Do S1 + S2 first, as one change** — the frame, the bars, the merged
Muster, the inverted delve split. It is the day's work that removes the
scrolling and makes the picture the size the picture deserves, and it is
the frame S3's controls need.

**Then S3**, in two halves: (a) persistent sprites + the march tween +
beats for arrival and resolution — the party visibly *walks* and
*fights once*; (b) the `rounds[]` record and per-round beats — the
fight is *performed*. Half (a) alone answers "I don't see them moving";
half (b) answers "or fighting positional battles".

**Not touched:** `Simulator._tick`, `resolveFight`'s arithmetic, the
curve, the goldens.

## What was verified, and what was not

Verified on the live v8.2 build, 1366×768: every number in §1 and §2.
The pacing and drawing models are read from `main.js`, `Simulator.js`,
`RoomEncounters.js` and `IsoDungeonRenderer.js` at `7ebd569`.

**[unverified]** the beat durations in S3 — the 0.8 s march and the
~10 s twelve-round ceiling are targets, not measurements. The speed
slider's range (0.5×–3×) may need re-thinking once beats replace the
interval: at 3× a performed fight is a blur, at 0.5× a march is a wait.
