# Mining Report — 700 tables (2800 games), hard

Overall win rate: **72.4%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.35,"medium":0.83,"hard":1.21,"nightmare":1.64} -->
Measured against `STAT_SCALE`: easy 0.35 · medium 0.83 · hard 1.21 · nightmare 1.64.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Bandolier of Knives | equipment | 852 | 13.0 | 85.8% | +19.2 |
| Everburning Lantern | equipment | 972 | 10.6 | 81.6% | +14.0 |
| Quicksilver Daggers | equipment | 831 | 12.8 | 81.1% | +12.3 |
| Michael Sendivogius | character | 822 | 10.9 | 79.7% | +10.3 |
| Winch Hook | equipment | 896 | 13.4 | 79.1% | +9.9 |
| Robert Fludd | character | 859 | 11.1 | 78.5% | +8.7 |
| Cornelius Agrippa | character | 837 | 10.7 | 78.5% | +8.7 |
| Tycho Brahe | character | 824 | 10.6 | 78.4% | +8.5 |
| Grapple and Line | equipment | 847 | 13.1 | 78.2% | +8.2 |
| John Napier | character | 832 | 11.0 | 78.0% | +7.9 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Fireball | spell | 756 | 12.5 | 62.6% | -13.5 |
| Giordano Bruno | character | 849 | 10.6 | 63.0% | -13.5 |
| Chain Lightning | spell | 729 | 12.6 | 62.7% | -13.2 |
| Pico della Mirandola | character | 858 | 10.8 | 63.9% | -12.3 |
| Margaret Cavendish | character | 813 | 10.5 | 63.8% | -12.1 |
| Dawnbreak | spell | 757 | 12.9 | 63.9% | -11.6 |
| Frost Lance | spell | 717 | 12.4 | 64.2% | -11.1 |
| Cause Fear | spell | 764 | 13.0 | 64.5% | -10.9 |
| Kindle | spell | 731 | 13.0 | 64.6% | -10.6 |
| Firebolt | spell | 735 | 13.2 | 65.6% | -9.3 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 75.7% | 4.0 |
| guildmaster | 0.70 | 140 | 79.3% | 4.0 |
| warlord | 0.55 | 140 | 75.7% | 4.0 |
| archmage | 0.50 | 140 | 67.9% | 4.0 |
| novice | 0.15 | 140 | 46.4% | 2.5 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 18 | 22.2% |
| 2 | 46 | 45.7% |
| 3 | 63 | 47.6% |
| 4 | 2673 | 73.8% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | 32 | 68.8% | — | — |
| 1 | 130 | 85.4% | — | — |
| 2 | 196 | 84.7% | — | — |
| 3 | 206 | 85.4% | — | — |
| 4 | 312 | 81.1% | 105 | 46.7% |
| 5 | 397 | 78.6% | 176 | 47.7% |
| 6 | 374 | 76.5% | 304 | 60.9% |
| 7 | 259 | 70.3% | 200 | 58.0% |
| 8 | 241 | 71.8% | 230 | 70.9% |
| 9+ | 653 | 53.1% | 1755 | 81.0% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 76.7% | 62.7% | +14.0 |
| cleric | 73.5% | 68.6% | +4.8 |
| wizard | 66.3% | 82.4% | -16.1 |
| rogue | 76.5% | 63.3% | +13.2 |
| alchemist | 73.8% | 69.3% | +4.5 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| craven | 833 | 76.0% | +3.6 |
| cunning | 1497 | 75.2% | +2.8 |
| brave | 802 | 73.6% | +1.1 |
| pious | 851 | 72.4% | -0.0 |
| reckless | 1427 | 71.8% | -0.6 |
| scholarly | 831 | 71.1% | -1.3 |
| greedy | 824 | 66.7% | -5.7 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 344 | 24.7% |
| 1 | 1019 | 68.2% |
| 2 | 927 | 85.9% |
| 3 | 359 | 89.1% |
| 4 | 112 | 87.5% |
| 5+ | 39 | 87.2% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| stairs:descend | 1605 | 100.0% | 0.0 |
| monster:spell-strike | 1314 | 100.0% | 0.0 |
| trap:push-through | 1253 | 100.0% | 4.1 |
| materials:gather | 1177 | 100.0% | 0.0 |
| library:study | 1103 | 100.0% | 0.0 |
| boss:spell-strike | 918 | 55.7% | 27.7 |
| shrine:rest | 675 | 100.0% | 0.0 |
| vault:loot | 524 | 71.4% | 0.0 |
| lab:pass-by | 521 | 100.0% | 0.0 |
| monster:sneak | 439 | 90.7% | 0.0 |
| library:bless-the-font | 437 | 100.0% | 0.0 |
| monster:fight | 430 | 99.8% | 0.6 |
| stairs:rope-down | 430 | 100.0% | 0.0 |
| shrine:desecrate | 427 | 100.0% | 0.0 |
| lab:alchemy | 416 | 100.0% | 0.0 |
| trap:spell-bypass | 411 | 100.0% | 0.0 |
| library:pass-by | 411 | 100.0% | 0.0 |
| library:strip-the-shelves | 403 | 100.0% | 0.0 |
| monster:flee | 396 | 100.0% | 2.3 |
| disaster:scatter | 388 | 48.7% | 0.0 |
| treasure:loot | 384 | 82.3% | 0.0 |
| trap:disarm | 366 | 93.2% | 0.0 |
| disaster:brace | 366 | 100.0% | 5.2 |
| shrine:pass-by | 356 | 100.0% | 0.0 |
| lab:crack-crates | 345 | 100.0% | 0.0 |
| lab:harvest-spout | 340 | 100.0% | 0.0 |
| materials:pass-by | 336 | 100.0% | 0.0 |
| materials:sift-rubble | 319 | 100.0% | 0.0 |
| library:deep-study | 301 | 99.7% | 0.0 |
| lab:strip-the-shelves | 300 | 100.0% | 0.0 |
| vault:inspect | 297 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 296 | 100.0% | 0.8 |
| shrine:bless-the-font | 286 | 100.0% | 0.0 |
| boss:shove-into-brazier | 278 | 82.7% | 22.1 |
| boss:flee | 276 | 100.0% | 2.2 |
| disaster:sift-rubble | 276 | 100.0% | 0.0 |
| corridor:proceed | 264 | 100.0% | 0.0 |
| boss:fight-from-cover | 262 | 83.6% | 22.5 |
| materials:crack-crates | 251 | 100.0% | 0.0 |
| boss:fight | 250 | 56.4% | 35.6 |
| library:smash-wall | 245 | 0.0% | 3.0 |
| trap:search-around | 238 | 100.0% | 0.0 |
| boss:shove-into-pit | 220 | 85.9% | 20.1 |
| trap:sift-rubble | 216 | 100.0% | 0.0 |
| trap:smoke-bomb | 216 | 100.0% | 0.0 |
| materials:harvest-spout | 202 | 100.0% | 0.0 |
| treasure:inspect | 200 | 100.0% | 0.0 |
| boss:shove-onto-spikes | 197 | 87.3% | 19.5 |
| library:fill-waterskins | 190 | 100.0% | 0.0 |
| boss:shove-into-chasm | 189 | 86.8% | 18.0 |
| monster:fight-from-cover | 188 | 100.0% | 0.2 |
| shrine:push-through | 179 | 0.0% | 6.0 |
| shrine:endure-discord | 175 | 0.0% | 3.0 |
| vault:pry-sarcophagus | 167 | 100.0% | 1.0 |
| boss:drop-portcullis | 166 | 84.3% | 19.8 |
| monster:shove-into-brazier | 165 | 100.0% | 0.0 |
| lab:take-detour | 161 | 100.0% | 0.0 |
| vault:leave-it | 160 | 100.0% | 0.0 |
| monster:sift-rubble | 160 | 100.0% | 0.0 |
| stairs:camp-stair | 159 | 100.0% | 2.9 |
| vault:strip-the-shelves | 154 | 100.0% | 0.0 |
| monster:shove-into-pit | 153 | 100.0% | 0.0 |
| lab:experiment-rebuild | 149 | 100.0% | 0.0 |
| monster:shove-onto-spikes | 149 | 100.0% | 0.0 |
| treasure:crack-crates | 137 | 100.0% | 0.0 |
| boss:pry-sarcophagus | 131 | 100.0% | 0.7 |
| monster:turn-undead | 130 | 100.0% | 0.0 |
| vault:knock-open | 126 | 100.0% | 0.0 |
| lab:tinkering-solve | 126 | 100.0% | 0.0 |
| shrine:fill-waterskins | 125 | 100.0% | 0.0 |
| lab:work-the-anvil | 125 | 100.0% | 0.0 |
| treasure:pry-sarcophagus | 124 | 100.0% | 0.9 |
| monster:put-it-down | 119 | 0.0% | 4.0 |
| lab:alchemy-bypass | 114 | 100.0% | 0.0 |
| monster:crack-crates | 110 | 100.0% | 0.0 |
| materials:search-methodical | 99 | 100.0% | 0.0 |
| materials:observe-closely | 98 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 97 | 100.0% | 0.7 |
| library:ask-where-it-lies | 96 | 100.0% | 0.0 |
| monster:bless-the-font | 95 | 100.0% | 0.0 |
| library:read-the-plan | 95 | 100.0% | 0.0 |
| monster:topple-boulder | 93 | 100.0% | 0.1 |
| treasure:leave-it | 92 | 100.0% | 0.0 |
| shrine:heal-directly | 91 | 100.0% | 0.0 |
| monster:strip-the-shelves | 90 | 100.0% | 0.0 |
| library:question-the-ghost | 88 | 100.0% | 0.0 |
| monster:drop-portcullis | 85 | 100.0% | 0.0 |
| monster:shove-into-chasm | 80 | 100.0% | 0.1 |
| library:reconstruct-memory | 78 | 100.0% | 0.0 |
| monster:harvest-spout | 76 | 100.0% | 0.0 |
| shrine:medicine-diagnose | 76 | 100.0% | 0.0 |
| shrine:music-harmony | 75 | 100.0% | 0.0 |
| treasure:knock-open | 74 | 100.0% | 0.0 |
| shrine:correspondence-solve | 73 | 100.0% | 0.0 |
| materials:divine-presence | 72 | 100.0% | 0.0 |
| trap:divine-safe-square | 71 | 100.0% | 0.0 |
| shrine:harmony-attune | 71 | 100.0% | 0.0 |
| situation:push-through | 68 | 0.0% | 6.0 |
| library:reconstruct-his-rounds | 67 | 100.0% | 0.0 |
| library:imagine-solution | 66 | 100.0% | 0.0 |
| shrine:naturalphil-remedy | 64 | 100.0% | 0.0 |
| disaster:linked-plan | 64 | 100.0% | 0.0 |
| trap:cross-in-order | 63 | 100.0% | 0.0 |
| materials:work-the-anvil | 62 | 100.0% | 0.0 |
| disaster:endure-discord | 59 | 0.0% | 3.0 |
| materials:take-detour | 59 | 100.0% | 0.0 |
| trap:solve-progression | 58 | 100.0% | 0.0 |
| library:leave-cartographer | 57 | 100.0% | 0.0 |
| situation:smash-wall | 56 | 0.0% | 3.0 |
| monster:accept-duel | 56 | 100.0% | 0.0 |
| materials:experiment-rebuild | 55 | 100.0% | 0.0 |
| situation:endure-discord | 54 | 0.0% | 3.0 |
| monster:cause-fear | 54 | 100.0% | 0.0 |
| boss:turn-undead | 53 | 88.7% | 0.0 |
| materials:alchemy-bypass | 53 | 100.0% | 0.0 |
| trap:read-the-dust | 52 | 100.0% | 0.0 |
| monster:make-it-a-melee | 52 | 100.0% | 0.0 |
| materials:tinkering-solve | 52 | 100.0% | 0.0 |
| library:knowledge-pattern | 51 | 100.0% | 0.0 |
| situation:guess-heavy | 50 | 0.0% | 5.0 |
| disaster:link-minds | 49 | 100.0% | 0.0 |
| monster:read-its-gait | 49 | 100.0% | 0.0 |
| monster:name-the-owner | 48 | 100.0% | 0.0 |
| boss:dark | 47 | 91.5% | 0.7 |
| situation:put-it-down | 46 | 0.0% | 4.0 |
| monster:strip-insignia | 45 | 100.0% | 0.0 |
| monster:negotiate-terms | 42 | 100.0% | 0.0 |
| monster:recognize-style | 41 | 100.0% | 0.0 |
| trap:walk-it | 40 | 0.0% | 3.2 |
| situation:negotiate-grievance | 39 | 100.0% | 0.0 |
| lab:brew-oil | 39 | 100.0% | 0.0 |
| disaster:signal-by-sound | 39 | 100.0% | 0.0 |
| situation:search-methodical | 39 | 100.0% | 0.0 |
| disaster:correspondence-solve | 37 | 100.0% | 0.0 |
| monster:fill-waterskins | 36 | 100.0% | 0.0 |
| monster:push-past-duellist | 36 | 0.0% | 5.0 |
| disaster:work-the-slab | 36 | 100.0% | 0.0 |
| situation:linked-plan | 36 | 100.0% | 0.0 |
| materials:brew-oil | 36 | 100.0% | 0.0 |
| disaster:send-a-messenger | 35 | 100.0% | 0.0 |
| monster:work-the-anvil | 35 | 100.0% | 0.0 |
| situation:tinkering-solve | 34 | 100.0% | 0.0 |
| monster:commune-armour | 34 | 100.0% | 0.0 |
| disaster:music-harmony | 34 | 100.0% | 0.0 |
| boss:bribe | 33 | 100.0% | 0.0 |
| disaster:harmony-attune | 32 | 100.0% | 0.0 |
| situation:make-it-a-melee | 30 | 100.0% | 0.0 |
| treasure:guess-heavy | 30 | 0.0% | 5.0 |
| situation:take-detour | 30 | 100.0% | 0.0 |
| situation:ask-where-it-lies | 30 | 100.0% | 0.0 |
| situation:observe-closely | 30 | 100.0% | 0.0 |
| situation:hurry-past | 28 | 100.0% | 0.0 |
| situation:cross-in-order | 28 | 100.0% | 0.0 |
| situation:divine-safe-square | 26 | 100.0% | 0.0 |
| monster:bribe | 25 | 100.0% | 0.0 |
| situation:push-past-duellist | 25 | 0.0% | 5.0 |
| situation:reconstruct-his-rounds | 24 | 100.0% | 0.0 |
| situation:read-the-dust | 24 | 100.0% | 0.0 |
| situation:heal-directly | 24 | 100.0% | 0.0 |
| situation:experiment-rebuild | 24 | 100.0% | 0.0 |
| situation:question-the-ghost | 23 | 100.0% | 0.0 |
| situation:accept-duel | 23 | 100.0% | 0.0 |
| situation:name-the-owner | 23 | 100.0% | 0.0 |
| situation:slip-past-grievance | 23 | 100.0% | 0.0 |
| situation:negotiate-terms | 22 | 100.0% | 0.0 |
| situation:divine-presence | 22 | 100.0% | 0.0 |
| situation:read-its-gait | 22 | 100.0% | 0.0 |
| situation:read-correspondences | 22 | 100.0% | 0.0 |
| situation:divine-instability | 22 | 100.0% | 0.0 |
| situation:strip-insignia | 21 | 100.0% | 0.0 |
| corridor:sift-rubble | 21 | 100.0% | 0.0 |
| situation:recognize-style | 21 | 100.0% | 0.0 |
| situation:appraise-chests | 21 | 100.0% | 0.0 |
| situation:read-the-plan | 20 | 100.0% | 0.0 |
| situation:music-harmony | 20 | 100.0% | 0.0 |
| corridor:harvest-spout | 20 | 100.0% | 0.0 |
| situation:planetary-sequence | 20 | 100.0% | 0.0 |
| situation:send-a-messenger | 20 | 100.0% | 0.0 |
| situation:correspondence-solve | 19 | 100.0% | 0.0 |
| situation:imagine-solution | 19 | 100.0% | 0.0 |
| situation:link-minds | 18 | 100.0% | 0.0 |
| treasure:observe-closely | 18 | 100.0% | 0.0 |
| situation:hurry-through | 18 | 0.0% | 2.0 |
| situation:signal-by-sound | 18 | 100.0% | 0.0 |
| situation:identify-artifact | 18 | 100.0% | 0.0 |
| situation:knowledge-mark | 18 | 100.0% | 0.0 |
| situation:correct-orrery | 18 | 100.0% | 0.0 |
| treasure:appraise-chests | 17 | 100.0% | 0.0 |
| situation:solve-progression | 17 | 100.0% | 0.0 |
| situation:repair-gears | 17 | 100.0% | 0.0 |
| situation:divine-sequence | 17 | 100.0% | 0.0 |
| disaster:shout-through-it | 17 | 0.0% | 5.0 |
| situation:translate-claim | 16 | 100.0% | 0.0 |
| situation:alchemy-bypass | 16 | 100.0% | 0.0 |
| situation:steady-ground | 16 | 100.0% | 0.0 |
| situation:work-the-slab | 16 | 100.0% | 0.0 |
| situation:harmony-attune | 16 | 100.0% | 0.0 |
| monster:dark | 15 | 86.7% | 1.4 |
| situation:recognize-model | 15 | 100.0% | 0.0 |
| situation:knowledge-pattern | 14 | 100.0% | 0.0 |
| situation:observation-pick | 14 | 100.0% | 0.0 |
| situation:walk-it | 14 | 0.0% | 4.0 |
| situation:leave-sealed | 14 | 100.0% | 0.0 |
| situation:naturalphil-remedy | 14 | 100.0% | 0.0 |
| situation:material-symbolism | 14 | 100.0% | 0.0 |
| situation:leave-cartographer | 13 | 100.0% | 0.0 |
| corridor:crack-crates | 13 | 100.0% | 0.0 |
| situation:reconcile-traditions | 13 | 100.0% | 0.0 |
| corridor:bless-the-font | 13 | 100.0% | 0.0 |
| treasure:observation-pick | 12 | 100.0% | 0.0 |
| treasure:search-methodical | 12 | 100.0% | 0.0 |
| situation:reconstruct-memory | 12 | 100.0% | 0.0 |
| library:dark | 12 | 100.0% | 0.5 |
| shrine:dark | 11 | 100.0% | 0.0 |
| situation:medicine-diagnose | 11 | 100.0% | 0.0 |
| treasure:knowledge-mark | 11 | 100.0% | 0.0 |
| situation:investigate-claim | 10 | 100.0% | 0.0 |
| situation:force-the-door | 10 | 0.0% | 4.0 |
| treasure:divine-presence | 10 | 100.0% | 0.0 |
| situation:commune-armour | 9 | 100.0% | 0.0 |
| situation:compute-epicycles | 9 | 100.0% | 0.0 |
| situation:fight-grievance | 9 | 0.0% | 6.0 |
| trap:dark | 9 | 100.0% | 0.0 |
| materials:dark | 8 | 100.0% | 1.0 |
| vault:dark | 7 | 100.0% | 0.9 |
| situation:shout-through-it | 7 | 0.0% | 5.0 |
| corridor:work-the-anvil | 7 | 100.0% | 0.0 |
| lab:dark | 6 | 100.0% | 0.0 |
| treasure:dark | 4 | 100.0% | 0.0 |
| corridor:fill-waterskins | 4 | 100.0% | 0.0 |
| situation:dark | 4 | 100.0% | 0.0 |
| disaster:dark | 2 | 100.0% | 0.0 |
| corridor:dark | 1 | 100.0% | 0.0 |
| corridor:divine-safe-square | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| mad-pyromancer | 62 | 54.8% | 31.9 |
| vampire-lord | 70 | 52.9% | 37.6 |
| bog-witch | 59 | 50.8% | 32.2 |
| grand-errata | 79 | 46.8% | 37.0 |
| the-bride | 77 | 45.5% | 32.5 |
| cinder-wyrm | 63 | 42.9% | 25.4 |
| ogre-king | 70 | 42.9% | 30.4 |
| dragon-whelp | 72 | 40.3% | 26.2 |
| abbot-of-worms | 88 | 39.8% | 25.3 |
| shrouded-king | 66 | 39.4% | 26.7 |
| the-cauldron | 59 | 39.0% | 25.1 |
| archivist | 61 | 37.7% | 25.4 |
| forge-tyrant | 67 | 37.3% | 26.5 |
| mad-alchemist | 68 | 36.8% | 26.9 |
| glacier-heart | 92 | 35.9% | 25.6 |
| the-precipitate | 67 | 28.4% | 21.5 |
| thawed-dead | 53 | 1.9% | 0.4 |
| potion-rats | 57 | 0.0% | 0.1 |
| goblin-gang | 48 | 0.0% | 0.1 |
| mutant-vine | 65 | 0.0% | 0.1 |
| skeleton | 44 | 0.0% | 0.1 |
| wraith | 43 | 0.0% | 0.4 |
| ink-elemental | 51 | 0.0% | 0.1 |
| obsidian-golem | 61 | 0.0% | 0.9 |
| frost-wisp | 46 | 0.0% | 0.0 |
| cinder-imp | 56 | 0.0% | 0.1 |
| hungry-ghoul | 57 | 0.0% | 0.3 |
| cinder-bats | 65 | 0.0% | 0.0 |
| jar-imp | 48 | 0.0% | 0.0 |
| bog-toad | 43 | 0.0% | 0.4 |
| pale-hound | 64 | 0.0% | 0.1 |
| magma-toad | 58 | 0.0% | 0.2 |
| rat-swarm | 48 | 0.0% | 0.0 |
| gelatinous | 36 | 0.0% | 0.1 |
| root-golem | 62 | 0.0% | 0.5 |
| pickled-thing | 43 | 0.0% | 0.1 |
| flying-tomes | 51 | 0.0% | 0.0 |
| spectral-scribe | 42 | 0.0% | 0.1 |
| bone-warden | 77 | 0.0% | 0.1 |
| crimson-mist | 41 | 0.0% | 0.0 |
| bat-cloud | 61 | 0.0% | 0.0 |
| sludge-elemental | 40 | 0.0% | 0.0 |
| grave-mites | 72 | 0.0% | 0.0 |
| index-wight | 46 | 0.0% | 0.3 |
| salamander | 71 | 0.0% | 0.2 |
| ice-crawler | 50 | 0.0% | 0.1 |
| castle-thrall | 56 | 0.0% | 0.0 |
| failed-homunculus | 39 | 0.0% | 0.2 |
| barrow-shade | 50 | 0.0% | 0.0 |
