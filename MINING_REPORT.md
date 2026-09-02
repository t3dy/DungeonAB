# Mining Report — 700 tables (2800 games), hard

Overall win rate: **70.7%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.35,"medium":0.83,"hard":1.52,"nightmare":2.03} -->
Measured against `STAT_SCALE`: easy 0.35 · medium 0.83 · hard 1.52 · nightmare 2.03.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Bandolier of Knives | equipment | 1086 | 13.6 | 83.2% | +20.5 |
| Quicksilver Daggers | equipment | 1091 | 13.8 | 80.8% | +16.5 |
| Everburning Lantern | equipment | 1199 | 11.4 | 76.3% | +9.9 |
| Robert Fludd | character | 900 | 11.0 | 76.3% | +8.3 |
| Eyes of the Mouse | spell | 846 | 10.6 | 76.5% | +8.3 |
| Tycho Brahe | character | 797 | 10.4 | 76.3% | +7.8 |
| Michael Sendivogius | character | 820 | 10.6 | 75.7% | +7.1 |
| John Napier | character | 790 | 10.1 | 75.7% | +7.0 |
| Haunted Armor | equipment | 1054 | 11.4 | 74.8% | +6.5 |
| The Tinkerer | personality | 824 | 16.9 | 75.2% | +6.5 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Margaret Cavendish | character | 844 | 10.5 | 60.1% | -15.2 |
| Pico della Mirandola | character | 831 | 10.9 | 62.0% | -12.4 |
| Giordano Bruno | character | 850 | 11.3 | 62.5% | -11.8 |
| Fireball | spell | 760 | 12.7 | 62.6% | -11.0 |
| Grimoire of Low Whispers | equipment | 1104 | 14.0 | 64.4% | -10.4 |
| Chain Lightning | spell | 758 | 12.7 | 63.5% | -9.9 |
| Shatter | spell | 700 | 12.9 | 63.6% | -9.5 |
| Dawnbreak | spell | 763 | 13.0 | 64.0% | -9.2 |
| Radiant Lance | spell | 790 | 13.0 | 64.2% | -9.1 |
| Cause Fear | spell | 754 | 12.8 | 65.0% | -7.8 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 75.0% | 4.0 |
| guildmaster | 0.70 | 140 | 79.3% | 4.0 |
| warlord | 0.55 | 140 | 77.9% | 4.0 |
| archmage | 0.50 | 140 | 65.0% | 4.0 |
| novice | 0.15 | 140 | 54.3% | 2.8 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 7 | 28.6% |
| 2 | 47 | 51.1% |
| 3 | 56 | 53.6% |
| 4 | 2690 | 71.5% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | — | — | — | — |
| 1 | 98 | 83.7% | — | — |
| 2 | 187 | 75.4% | — | — |
| 3 | 240 | 83.8% | — | — |
| 4 | 323 | 77.4% | — | — |
| 5 | 374 | 82.4% | — | — |
| 6 | 358 | 76.0% | — | — |
| 7 | 321 | 70.1% | 77 | 54.5% |
| 8 | 288 | 61.1% | 191 | 53.9% |
| 9+ | 602 | 53.0% | 2509 | 72.7% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 73.5% | 63.5% | +10.0 |
| cleric | 70.8% | 70.3% | +0.5 |
| wizard | 64.9% | 80.2% | -15.4 |
| rogue | 74.8% | 61.9% | +12.9 |
| alchemist | 70.7% | 70.7% | -0.1 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| cunning | 1485 | 74.4% | +3.7 |
| craven | 861 | 74.3% | +3.7 |
| pious | 851 | 72.3% | +1.6 |
| brave | 826 | 68.9% | -1.8 |
| reckless | 1493 | 68.6% | -2.1 |
| greedy | 798 | 67.0% | -3.6 |
| scholarly | 812 | 66.9% | -3.8 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 154 | 14.3% |
| 1 | 617 | 60.1% |
| 2 | 814 | 72.1% |
| 3 | 669 | 78.8% |
| 4 | 349 | 86.0% |
| 5+ | 197 | 87.3% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 2267 | 100.0% | 0.0 |
| trap:push-through | 2193 | 100.0% | 4.0 |
| library:study | 1209 | 100.0% | 0.0 |
| disaster:scatter | 1030 | 47.6% | 0.0 |
| treasure:loot | 1003 | 83.1% | 0.0 |
| boss:spell-strike | 914 | 59.2% | 24.7 |
| trap:spell-bypass | 840 | 100.0% | 0.0 |
| monster:fight | 801 | 100.0% | 0.5 |
| disaster:sift-rubble | 783 | 100.0% | 0.0 |
| disaster:brace | 768 | 100.0% | 5.2 |
| monster:sneak | 758 | 93.4% | 0.0 |
| monster:flee | 715 | 100.0% | 2.3 |
| shrine:rest | 676 | 100.0% | 0.0 |
| trap:disarm | 635 | 94.5% | 0.0 |
| vault:loot | 515 | 70.1% | 0.0 |
| shrine:desecrate | 485 | 100.0% | 0.0 |
| library:bless-the-font | 465 | 100.0% | 0.0 |
| trap:sift-rubble | 464 | 100.0% | 0.0 |
| treasure:inspect | 459 | 100.0% | 0.0 |
| library:strip-the-shelves | 455 | 100.0% | 0.0 |
| trap:search-around | 447 | 99.8% | 0.0 |
| library:pass-by | 433 | 100.0% | 0.0 |
| shrine:pass-by | 396 | 100.0% | 0.0 |
| treasure:crack-crates | 394 | 100.0% | 0.0 |
| corridor:proceed | 366 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 361 | 100.0% | 0.7 |
| treasure:leave-it | 331 | 100.0% | 0.0 |
| shrine:bless-the-font | 329 | 100.0% | 0.0 |
| library:deep-study | 310 | 99.4% | 0.0 |
| monster:fight-from-cover | 306 | 100.0% | 0.1 |
| library:fill-waterskins | 290 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 289 | 100.0% | 0.7 |
| boss:flee | 288 | 100.0% | 2.3 |
| vault:inspect | 282 | 100.0% | 0.0 |
| monster:shove-into-brazier | 279 | 99.6% | 0.1 |
| shrine:push-through | 276 | 0.0% | 6.0 |
| boss:fight-from-cover | 262 | 79.0% | 23.1 |
| boss:shove-into-brazier | 259 | 74.1% | 21.0 |
| boss:fight | 256 | 55.9% | 33.2 |
| boss:shove-into-pit | 250 | 81.2% | 19.4 |
| treasure:knock-open | 247 | 100.0% | 0.0 |
| monster:shove-into-pit | 246 | 100.0% | 0.0 |
| library:smash-wall | 244 | 0.0% | 3.0 |
| monster:shove-onto-spikes | 241 | 100.0% | 0.0 |
| monster:turn-undead | 239 | 99.6% | 0.0 |
| monster:crack-crates | 217 | 100.0% | 0.0 |
| monster:shove-into-chasm | 210 | 100.0% | 0.0 |
| monster:sift-rubble | 208 | 100.0% | 0.0 |
| monster:put-it-down | 203 | 0.0% | 4.0 |
| vault:leave-it | 202 | 100.0% | 0.0 |
| boss:shove-onto-spikes | 188 | 82.4% | 20.0 |
| monster:pry-sarcophagus | 183 | 100.0% | 0.7 |
| shrine:fill-waterskins | 180 | 100.0% | 0.0 |
| disaster:shout-through-it | 174 | 0.0% | 5.0 |
| monster:topple-boulder | 173 | 100.0% | 0.1 |
| boss:drop-portcullis | 170 | 82.4% | 18.8 |
| boss:shove-into-chasm | 168 | 86.3% | 18.4 |
| monster:drop-portcullis | 159 | 100.0% | 0.0 |
| monster:harvest-spout | 157 | 100.0% | 0.0 |
| vault:pry-sarcophagus | 157 | 100.0% | 0.6 |
| monster:strip-the-shelves | 156 | 100.0% | 0.0 |
| disaster:endure-discord | 155 | 0.0% | 3.0 |
| vault:strip-the-shelves | 148 | 100.0% | 0.0 |
| trap:solve-progression | 148 | 100.0% | 0.0 |
| monster:bless-the-font | 144 | 100.0% | 0.0 |
| monster:make-it-a-melee | 144 | 100.0% | 0.0 |
| disaster:linked-plan | 142 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 137 | 100.0% | 0.5 |
| trap:divine-safe-square | 135 | 100.0% | 0.0 |
| shrine:endure-discord | 131 | 0.0% | 3.0 |
| trap:cross-in-order | 126 | 100.0% | 0.0 |
| trap:read-the-dust | 123 | 100.0% | 0.0 |
| situation:smash-wall | 120 | 0.0% | 3.0 |
| situation:endure-discord | 115 | 0.0% | 3.0 |
| monster:fill-waterskins | 115 | 100.0% | 0.0 |
| situation:push-through | 115 | 0.0% | 6.0 |
| monster:accept-duel | 115 | 100.0% | 0.0 |
| disaster:harmony-attune | 112 | 100.0% | 0.0 |
| shrine:heal-directly | 112 | 100.0% | 0.0 |
| situation:guess-heavy | 108 | 0.0% | 5.0 |
| library:reconstruct-memory | 103 | 100.0% | 0.0 |
| monster:commune-armour | 103 | 100.0% | 0.0 |
| monster:negotiate-terms | 101 | 100.0% | 0.0 |
| situation:put-it-down | 99 | 0.0% | 4.0 |
| disaster:music-harmony | 92 | 100.0% | 0.0 |
| library:ask-where-it-lies | 90 | 100.0% | 0.0 |
| shrine:music-harmony | 89 | 100.0% | 0.0 |
| library:reconstruct-his-rounds | 89 | 100.0% | 0.0 |
| treasure:guess-heavy | 88 | 0.0% | 5.0 |
| disaster:link-minds | 87 | 100.0% | 0.0 |
| library:question-the-ghost | 85 | 100.0% | 0.0 |
| vault:knock-open | 84 | 100.0% | 0.0 |
| monster:strip-insignia | 84 | 100.0% | 0.0 |
| situation:take-detour | 83 | 100.0% | 0.0 |
| library:read-the-plan | 83 | 100.0% | 0.0 |
| monster:read-its-gait | 82 | 100.0% | 0.0 |
| monster:work-the-anvil | 81 | 100.0% | 0.0 |
| monster:push-past-duellist | 81 | 0.0% | 5.0 |
| disaster:send-a-messenger | 80 | 100.0% | 0.0 |
| situation:negotiate-grievance | 76 | 100.0% | 0.0 |
| monster:cause-fear | 75 | 100.0% | 0.0 |
| shrine:medicine-diagnose | 75 | 100.0% | 0.0 |
| situation:search-methodical | 75 | 100.0% | 0.0 |
| monster:name-the-owner | 75 | 100.0% | 0.0 |
| monster:bribe | 74 | 100.0% | 0.0 |
| shrine:correspondence-solve | 74 | 100.0% | 0.0 |
| disaster:correspondence-solve | 71 | 100.0% | 0.0 |
| situation:ask-where-it-lies | 71 | 100.0% | 0.0 |
| disaster:signal-by-sound | 70 | 100.0% | 0.0 |
| treasure:search-methodical | 70 | 100.0% | 0.0 |
| disaster:work-the-slab | 70 | 100.0% | 0.0 |
| library:imagine-solution | 70 | 100.0% | 0.0 |
| situation:make-it-a-melee | 69 | 100.0% | 0.0 |
| situation:shout-through-it | 69 | 0.0% | 5.0 |
| shrine:harmony-attune | 68 | 100.0% | 0.0 |
| monster:recognize-style | 68 | 100.0% | 0.0 |
| situation:experiment-rebuild | 65 | 100.0% | 0.0 |
| trap:walk-it | 65 | 0.0% | 3.5 |
| situation:tinkering-solve | 64 | 100.0% | 0.0 |
| shrine:naturalphil-remedy | 62 | 100.0% | 0.0 |
| treasure:observe-closely | 62 | 100.0% | 0.0 |
| situation:linked-plan | 62 | 100.0% | 0.0 |
| situation:observe-closely | 60 | 100.0% | 0.0 |
| treasure:take-detour | 59 | 100.0% | 0.0 |
| situation:heal-directly | 56 | 100.0% | 0.0 |
| treasure:appraise-chests | 54 | 100.0% | 0.0 |
| situation:alchemy-bypass | 54 | 100.0% | 0.0 |
| situation:solve-progression | 53 | 100.0% | 0.0 |
| situation:slip-past-grievance | 53 | 100.0% | 0.0 |
| situation:cross-in-order | 52 | 100.0% | 0.0 |
| situation:observation-pick | 50 | 100.0% | 0.0 |
| situation:read-the-dust | 50 | 100.0% | 0.0 |
| library:knowledge-pattern | 49 | 100.0% | 0.0 |
| situation:negotiate-terms | 49 | 100.0% | 0.0 |
| situation:read-the-plan | 48 | 100.0% | 0.0 |
| situation:commune-armour | 48 | 100.0% | 0.0 |
| situation:reconstruct-his-rounds | 48 | 100.0% | 0.0 |
| situation:question-the-ghost | 48 | 100.0% | 0.0 |
| situation:read-correspondences | 48 | 100.0% | 0.0 |
| situation:identify-artifact | 47 | 100.0% | 0.0 |
| library:leave-cartographer | 47 | 100.0% | 0.0 |
| boss:turn-undead | 47 | 100.0% | 0.0 |
| situation:harmony-attune | 47 | 100.0% | 0.0 |
| situation:music-harmony | 47 | 100.0% | 0.0 |
| boss:bribe | 46 | 100.0% | 0.0 |
| situation:correspondence-solve | 44 | 100.0% | 0.0 |
| situation:accept-duel | 44 | 100.0% | 0.0 |
| situation:reconstruct-memory | 43 | 100.0% | 0.0 |
| situation:link-minds | 43 | 100.0% | 0.0 |
| situation:translate-claim | 43 | 100.0% | 0.0 |
| situation:divine-presence | 43 | 100.0% | 0.0 |
| situation:correct-orrery | 42 | 100.0% | 0.0 |
| situation:medicine-diagnose | 42 | 100.0% | 0.0 |
| situation:divine-instability | 42 | 100.0% | 0.0 |
| situation:reconcile-traditions | 42 | 100.0% | 0.0 |
| situation:recognize-style | 42 | 100.0% | 0.0 |
| situation:divine-safe-square | 42 | 100.0% | 0.0 |
| treasure:divine-presence | 41 | 100.0% | 0.0 |
| situation:steady-ground | 41 | 100.0% | 0.0 |
| treasure:tinkering-solve | 41 | 100.0% | 0.0 |
| situation:push-past-duellist | 41 | 0.0% | 5.0 |
| situation:hurry-through | 40 | 0.0% | 2.0 |
| situation:material-symbolism | 40 | 100.0% | 0.0 |
| treasure:experiment-rebuild | 38 | 100.0% | 0.0 |
| situation:hurry-past | 38 | 100.0% | 0.0 |
| situation:name-the-owner | 38 | 100.0% | 0.0 |
| treasure:knowledge-mark | 38 | 100.0% | 0.0 |
| treasure:alchemy-bypass | 38 | 100.0% | 0.0 |
| situation:read-its-gait | 37 | 100.0% | 0.0 |
| corridor:crack-crates | 37 | 100.0% | 0.0 |
| situation:knowledge-mark | 37 | 100.0% | 0.0 |
| situation:signal-by-sound | 36 | 100.0% | 0.0 |
| situation:appraise-chests | 36 | 100.0% | 0.0 |
| corridor:sift-rubble | 36 | 100.0% | 0.0 |
| situation:strip-insignia | 34 | 100.0% | 0.0 |
| situation:leave-cartographer | 34 | 100.0% | 0.0 |
| boss:dark | 33 | 90.9% | 0.9 |
| situation:imagine-solution | 32 | 100.0% | 0.0 |
| situation:repair-gears | 31 | 100.0% | 0.0 |
| situation:divine-sequence | 31 | 100.0% | 0.0 |
| situation:work-the-slab | 31 | 100.0% | 0.0 |
| situation:send-a-messenger | 31 | 100.0% | 0.0 |
| situation:knowledge-pattern | 31 | 100.0% | 0.0 |
| situation:planetary-sequence | 30 | 100.0% | 0.0 |
| situation:compute-epicycles | 30 | 100.0% | 0.0 |
| situation:recognize-model | 29 | 100.0% | 0.0 |
| corridor:harvest-spout | 26 | 100.0% | 0.0 |
| situation:walk-it | 26 | 0.0% | 4.0 |
| situation:naturalphil-remedy | 25 | 100.0% | 0.0 |
| situation:force-the-door | 23 | 0.0% | 4.0 |
| situation:investigate-claim | 22 | 100.0% | 0.0 |
| treasure:observation-pick | 22 | 100.0% | 0.0 |
| situation:leave-sealed | 20 | 100.0% | 0.0 |
| situation:fight-grievance | 20 | 0.0% | 6.0 |
| corridor:bless-the-font | 17 | 100.0% | 0.0 |
| monster:dark | 15 | 100.0% | 0.5 |
| treasure:dark | 10 | 90.0% | 1.4 |
| trap:dark | 10 | 80.0% | 0.3 |
| disaster:dark | 7 | 85.7% | 3.1 |
| vault:dark | 7 | 100.0% | 2.0 |
| shrine:dark | 6 | 83.3% | 1.5 |
| corridor:fill-waterskins | 6 | 100.0% | 0.0 |
| library:dark | 6 | 100.0% | 0.2 |
| situation:dark | 5 | 100.0% | 0.0 |
| corridor:reconstruct-his-rounds | 4 | 100.0% | 0.0 |
| corridor:divine-presence | 3 | 100.0% | 0.0 |
| corridor:work-the-anvil | 3 | 100.0% | 0.0 |
| corridor:accept-duel | 2 | 100.0% | 0.0 |
| corridor:put-it-down | 2 | 0.0% | 4.0 |
| corridor:experiment-rebuild | 2 | 100.0% | 0.0 |
| corridor:alchemy-bypass | 2 | 100.0% | 0.0 |
| corridor:tinkering-solve | 2 | 100.0% | 0.0 |
| corridor:recognize-style | 2 | 100.0% | 0.0 |
| corridor:shout-through-it | 2 | 0.0% | 5.0 |
| corridor:link-minds | 2 | 100.0% | 0.0 |
| corridor:push-through | 1 | 0.0% | 6.0 |
| corridor:hurry-past | 1 | 100.0% | 0.0 |
| corridor:make-it-a-melee | 1 | 100.0% | 0.0 |
| corridor:take-detour | 1 | 100.0% | 0.0 |
| corridor:divine-safe-square | 1 | 100.0% | 0.0 |
| corridor:ask-where-it-lies | 1 | 100.0% | 0.0 |
| corridor:search-methodical | 1 | 100.0% | 0.0 |
| corridor:observe-closely | 1 | 100.0% | 0.0 |
| corridor:linked-plan | 1 | 100.0% | 0.0 |
| corridor:dark | 1 | 100.0% | 0.0 |
| corridor:push-past-duellist | 1 | 0.0% | 5.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| mad-pyromancer | 191 | 47.6% | 28.8 |
| ogre-king | 171 | 41.5% | 26.7 |
| glacier-heart | 204 | 40.2% | 23.1 |
| the-bride | 175 | 38.3% | 26.1 |
| vampire-lord | 192 | 38.0% | 25.3 |
| dragon-whelp | 214 | 36.9% | 25.1 |
| pale-hound | 270 | 0.0% | 0.1 |
| skeleton | 184 | 0.0% | 0.2 |
| gelatinous | 237 | 0.0% | 0.1 |
| rat-swarm | 267 | 0.0% | 0.0 |
| wraith | 189 | 0.0% | 0.3 |
| crimson-mist | 242 | 0.0% | 0.1 |
| bat-cloud | 283 | 0.0% | 0.0 |
| ice-crawler | 288 | 0.0% | 0.1 |
| cinder-imp | 262 | 0.0% | 0.1 |
| thawed-dead | 210 | 0.0% | 0.2 |
| goblin-gang | 187 | 0.0% | 0.2 |
| castle-thrall | 237 | 0.0% | 0.1 |
| frost-wisp | 212 | 0.0% | 0.0 |
