# Mining Report — 700 tables (2800 games), hard

Overall win rate: **69.0%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.35,"medium":0.83,"hard":1.52,"nightmare":2.03} -->
Measured against `STAT_SCALE`: easy 0.35 · medium 0.83 · hard 1.52 · nightmare 2.03.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 1435 | 14.1 | 79.0% | +20.5 |
| John Napier | character | 813 | 10.6 | 77.5% | +11.9 |
| Cornelius Agrippa | character | 852 | 10.6 | 77.2% | +11.8 |
| Tycho Brahe | character | 842 | 10.4 | 77.1% | +11.5 |
| Greatsword of the Vault | equipment | 1423 | 13.6 | 74.1% | +10.4 |
| Tower Shield | equipment | 1429 | 13.9 | 73.3% | +8.8 |
| Michael Sendivogius | character | 776 | 10.6 | 75.3% | +8.6 |
| Grapple and Line | equipment | 1439 | 13.8 | 72.9% | +7.9 |
| Kenelm Digby | character | 877 | 10.6 | 74.5% | +7.9 |
| Johannes Trithemius | character | 887 | 10.8 | 74.4% | +7.9 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Fireball | spell | 996 | 12.8 | 58.3% | -16.6 |
| Giordano Bruno | character | 839 | 11.0 | 57.4% | -16.5 |
| Frost Lance | spell | 987 | 12.5 | 59.2% | -15.2 |
| Pico della Mirandola | character | 827 | 10.8 | 59.3% | -13.9 |
| Margaret Cavendish | character | 814 | 11.0 | 60.3% | -12.3 |
| Dawnbreak | spell | 1008 | 13.4 | 61.2% | -12.2 |
| Cause Fear | spell | 1058 | 13.1 | 62.8% | -10.1 |
| Shatter | spell | 1054 | 13.2 | 63.0% | -9.7 |
| Grimoire of Low Whispers | equipment | 1479 | 14.0 | 64.6% | -9.3 |
| Firebolt | spell | 1016 | 13.4 | 63.4% | -8.9 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 75.7% | 4.0 |
| guildmaster | 0.70 | 140 | 76.4% | 4.0 |
| warlord | 0.55 | 140 | 76.4% | 4.0 |
| archmage | 0.50 | 140 | 51.4% | 4.0 |
| novice | 0.15 | 140 | 53.6% | 3.0 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 1 | 4 | 25.0% |
| 2 | 32 | 31.3% |
| 3 | 59 | 66.1% |
| 4 | 2705 | 69.6% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | — | — | — | — |
| 1 | 74 | 79.7% | — | — |
| 2 | 188 | 86.7% | — | — |
| 3 | 233 | 82.8% | — | — |
| 4 | 315 | 80.0% | — | — |
| 5 | 383 | 75.2% | — | — |
| 6 | 427 | 76.3% | — | — |
| 7 | 302 | 61.6% | 63 | 33.3% |
| 8 | 287 | 61.3% | 173 | 48.6% |
| 9+ | 578 | 48.4% | 2552 | 71.5% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 73.7% | 58.1% | +15.6 |
| cleric | 69.5% | 67.0% | +2.5 |
| wizard | 62.2% | 79.6% | -17.4 |
| rogue | 73.5% | 60.0% | +13.5 |
| alchemist | 68.6% | 70.0% | -1.5 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| craven | 1027 | 73.5% | +4.5 |
| cunning | 1055 | 70.4% | +1.4 |
| pious | 1017 | 70.1% | +1.1 |
| greedy | 1032 | 68.2% | -0.8 |
| brave | 1084 | 67.9% | -1.1 |
| scholarly | 987 | 67.3% | -1.8 |
| reckless | 1043 | 66.7% | -2.3 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 175 | 20.0% |
| 1 | 639 | 57.1% |
| 2 | 840 | 71.0% |
| 3 | 587 | 78.0% |
| 4 | 350 | 85.4% |
| 5+ | 209 | 86.1% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 2129 | 100.0% | 0.0 |
| trap:push-through | 1946 | 100.0% | 3.6 |
| library:study | 1124 | 100.0% | 0.0 |
| disaster:scatter | 984 | 48.9% | 0.0 |
| treasure:loot | 974 | 82.1% | 0.0 |
| boss:spell-strike | 932 | 51.1% | 32.2 |
| monster:fight | 932 | 99.8% | 0.6 |
| disaster:sift-rubble | 892 | 100.0% | 0.0 |
| trap:spell-bypass | 862 | 100.0% | 0.0 |
| disaster:brace | 801 | 100.0% | 5.2 |
| monster:flee | 752 | 100.0% | 2.3 |
| shrine:rest | 729 | 100.0% | 0.0 |
| monster:sneak | 623 | 95.0% | 0.0 |
| trap:disarm | 562 | 95.9% | 0.0 |
| trap:sift-rubble | 557 | 100.0% | 0.0 |
| trap:search-around | 557 | 100.0% | 0.0 |
| vault:loot | 556 | 73.9% | 0.0 |
| library:fill-waterskins | 527 | 100.0% | 0.0 |
| library:bless-the-font | 460 | 100.0% | 0.0 |
| library:strip-the-shelves | 458 | 100.0% | 0.0 |
| shrine:desecrate | 451 | 100.0% | 0.0 |
| treasure:inspect | 438 | 100.0% | 0.0 |
| library:pass-by | 393 | 100.0% | 0.0 |
| treasure:crack-crates | 380 | 100.0% | 0.0 |
| shrine:fill-waterskins | 369 | 100.0% | 0.0 |
| shrine:pass-by | 365 | 100.0% | 0.0 |
| corridor:proceed | 364 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 346 | 100.0% | 0.5 |
| treasure:knock-open | 329 | 100.0% | 0.0 |
| boss:flee | 316 | 100.0% | 2.3 |
| boss:fight | 313 | 58.5% | 33.5 |
| treasure:pry-sarcophagus | 303 | 100.0% | 0.5 |
| vault:inspect | 294 | 100.0% | 0.0 |
| monster:sift-rubble | 289 | 100.0% | 0.0 |
| treasure:leave-it | 285 | 100.0% | 0.0 |
| monster:fight-from-cover | 283 | 100.0% | 0.2 |
| shrine:bless-the-font | 282 | 100.0% | 0.0 |
| boss:fight-from-cover | 276 | 74.6% | 28.3 |
| library:deep-study | 272 | 100.0% | 0.0 |
| monster:shove-into-pit | 269 | 99.6% | 0.0 |
| monster:turn-undead | 256 | 100.0% | 0.0 |
| monster:shove-into-brazier | 245 | 100.0% | 0.0 |
| monster:shove-onto-spikes | 237 | 100.0% | 0.0 |
| boss:shove-into-pit | 230 | 83.5% | 20.4 |
| monster:crack-crates | 224 | 100.0% | 0.0 |
| boss:shove-onto-spikes | 218 | 82.6% | 21.3 |
| trap:walk-it | 214 | 0.0% | 3.4 |
| monster:work-the-anvil | 210 | 100.0% | 0.0 |
| vault:strip-the-shelves | 196 | 100.0% | 0.0 |
| vault:knock-open | 195 | 100.0% | 0.0 |
| boss:shove-into-brazier | 194 | 75.3% | 24.6 |
| monster:shove-into-chasm | 188 | 100.0% | 0.0 |
| monster:put-it-down | 187 | 0.0% | 4.0 |
| monster:fill-waterskins | 187 | 100.0% | 0.0 |
| monster:pry-sarcophagus | 187 | 100.0% | 0.6 |
| boss:shove-into-chasm | 180 | 83.9% | 18.4 |
| trap:solve-progression | 180 | 100.0% | 0.0 |
| vault:leave-it | 178 | 100.0% | 0.0 |
| monster:harvest-spout | 177 | 100.0% | 0.0 |
| shrine:push-through | 177 | 0.0% | 6.0 |
| monster:strip-the-shelves | 176 | 100.0% | 0.0 |
| boss:drop-portcullis | 174 | 71.8% | 23.7 |
| monster:drop-portcullis | 172 | 100.0% | 0.0 |
| monster:topple-boulder | 171 | 100.0% | 0.1 |
| vault:pry-sarcophagus | 167 | 100.0% | 0.6 |
| boss:pry-sarcophagus | 158 | 100.0% | 0.6 |
| library:smash-wall | 152 | 0.0% | 3.0 |
| monster:bless-the-font | 149 | 100.0% | 0.0 |
| disaster:endure-discord | 145 | 0.0% | 3.0 |
| disaster:shout-through-it | 141 | 0.0% | 5.0 |
| monster:push-past-duellist | 140 | 0.0% | 5.0 |
| trap:read-the-dust | 137 | 100.0% | 0.0 |
| monster:commune-armour | 127 | 100.0% | 0.0 |
| shrine:medicine-diagnose | 124 | 100.0% | 0.0 |
| trap:divine-safe-square | 123 | 100.0% | 0.0 |
| monster:accept-duel | 122 | 100.0% | 0.0 |
| library:reconstruct-memory | 117 | 100.0% | 0.0 |
| monster:recognize-style | 116 | 100.0% | 0.0 |
| trap:cross-in-order | 116 | 100.0% | 0.0 |
| library:read-the-plan | 113 | 100.0% | 0.0 |
| monster:negotiate-terms | 109 | 100.0% | 0.0 |
| disaster:link-minds | 108 | 100.0% | 0.0 |
| shrine:endure-discord | 108 | 0.0% | 3.0 |
| disaster:work-the-slab | 105 | 100.0% | 0.0 |
| disaster:harmony-attune | 103 | 100.0% | 0.0 |
| monster:name-the-owner | 103 | 100.0% | 0.0 |
| situation:put-it-down | 98 | 0.0% | 4.0 |
| disaster:linked-plan | 98 | 100.0% | 0.0 |
| library:reconstruct-his-rounds | 98 | 100.0% | 0.0 |
| monster:cause-fear | 95 | 100.0% | 0.0 |
| monster:strip-insignia | 95 | 100.0% | 0.0 |
| monster:read-its-gait | 93 | 100.0% | 0.0 |
| shrine:heal-directly | 93 | 100.0% | 0.0 |
| shrine:naturalphil-remedy | 91 | 100.0% | 0.0 |
| disaster:music-harmony | 90 | 100.0% | 0.0 |
| library:imagine-solution | 90 | 100.0% | 0.0 |
| situation:smash-wall | 87 | 0.0% | 3.0 |
| library:ask-where-it-lies | 86 | 100.0% | 0.0 |
| disaster:signal-by-sound | 85 | 100.0% | 0.0 |
| library:knowledge-pattern | 84 | 100.0% | 0.0 |
| treasure:guess-heavy | 84 | 0.0% | 5.0 |
| shrine:harmony-attune | 81 | 100.0% | 0.0 |
| library:question-the-ghost | 80 | 100.0% | 0.0 |
| situation:tinkering-solve | 79 | 100.0% | 0.0 |
| situation:experiment-rebuild | 79 | 100.0% | 0.0 |
| situation:guess-heavy | 79 | 0.0% | 5.0 |
| shrine:correspondence-solve | 78 | 100.0% | 0.0 |
| disaster:send-a-messenger | 77 | 100.0% | 0.0 |
| disaster:correspondence-solve | 77 | 100.0% | 0.0 |
| situation:negotiate-terms | 77 | 100.0% | 0.0 |
| situation:push-through | 75 | 0.0% | 6.0 |
| situation:observe-closely | 75 | 100.0% | 0.0 |
| treasure:search-methodical | 75 | 100.0% | 0.0 |
| situation:alchemy-bypass | 74 | 100.0% | 0.0 |
| shrine:music-harmony | 73 | 100.0% | 0.0 |
| situation:shout-through-it | 73 | 0.0% | 5.0 |
| monster:bribe | 71 | 100.0% | 0.0 |
| situation:medicine-diagnose | 70 | 100.0% | 0.0 |
| situation:endure-discord | 69 | 0.0% | 3.0 |
| situation:identify-artifact | 68 | 100.0% | 0.0 |
| situation:harmony-attune | 67 | 100.0% | 0.0 |
| boss:turn-undead | 67 | 100.0% | 0.0 |
| situation:accept-duel | 65 | 100.0% | 0.0 |
| situation:reconstruct-his-rounds | 63 | 100.0% | 0.0 |
| treasure:experiment-rebuild | 63 | 100.0% | 0.0 |
| situation:correspondence-solve | 62 | 100.0% | 0.0 |
| situation:repair-gears | 62 | 100.0% | 0.0 |
| situation:translate-claim | 62 | 100.0% | 0.0 |
| situation:walk-it | 62 | 0.0% | 4.0 |
| treasure:observe-closely | 60 | 100.0% | 0.0 |
| situation:ask-where-it-lies | 60 | 100.0% | 0.0 |
| situation:reconstruct-memory | 58 | 100.0% | 0.0 |
| situation:negotiate-grievance | 58 | 100.0% | 0.0 |
| situation:read-the-plan | 58 | 100.0% | 0.0 |
| situation:recognize-style | 56 | 100.0% | 0.0 |
| situation:search-methodical | 55 | 100.0% | 0.0 |
| situation:appraise-chests | 55 | 100.0% | 0.0 |
| situation:music-harmony | 55 | 100.0% | 0.0 |
| situation:heal-directly | 55 | 100.0% | 0.0 |
| situation:commune-armour | 53 | 100.0% | 0.0 |
| situation:knowledge-pattern | 52 | 100.0% | 0.0 |
| situation:divine-instability | 52 | 100.0% | 0.0 |
| treasure:alchemy-bypass | 52 | 100.0% | 0.0 |
| treasure:divine-presence | 51 | 100.0% | 0.0 |
| situation:solve-progression | 51 | 100.0% | 0.0 |
| situation:knowledge-mark | 51 | 100.0% | 0.0 |
| situation:question-the-ghost | 51 | 100.0% | 0.0 |
| treasure:tinkering-solve | 49 | 100.0% | 0.0 |
| situation:divine-presence | 49 | 100.0% | 0.0 |
| situation:read-correspondences | 49 | 100.0% | 0.0 |
| situation:correct-orrery | 48 | 100.0% | 0.0 |
| situation:name-the-owner | 47 | 100.0% | 0.0 |
| situation:push-past-duellist | 46 | 0.0% | 5.0 |
| situation:observation-pick | 46 | 100.0% | 0.0 |
| situation:material-symbolism | 45 | 100.0% | 0.0 |
| situation:link-minds | 45 | 100.0% | 0.0 |
| situation:work-the-slab | 44 | 100.0% | 0.0 |
| treasure:knowledge-mark | 44 | 100.0% | 0.0 |
| situation:linked-plan | 43 | 100.0% | 0.0 |
| treasure:take-detour | 42 | 100.0% | 0.0 |
| corridor:sift-rubble | 42 | 100.0% | 0.0 |
| situation:reconcile-traditions | 42 | 100.0% | 0.0 |
| situation:divine-safe-square | 41 | 100.0% | 0.0 |
| situation:steady-ground | 40 | 100.0% | 0.0 |
| situation:planetary-sequence | 40 | 100.0% | 0.0 |
| situation:cross-in-order | 39 | 100.0% | 0.0 |
| treasure:observation-pick | 39 | 100.0% | 0.0 |
| situation:hurry-past | 38 | 100.0% | 0.0 |
| treasure:appraise-chests | 37 | 100.0% | 0.0 |
| situation:naturalphil-remedy | 37 | 100.0% | 0.0 |
| situation:strip-insignia | 36 | 100.0% | 0.0 |
| situation:take-detour | 36 | 100.0% | 0.0 |
| boss:bribe | 36 | 100.0% | 0.0 |
| corridor:crack-crates | 36 | 100.0% | 0.0 |
| situation:send-a-messenger | 36 | 100.0% | 0.0 |
| situation:recognize-model | 35 | 100.0% | 0.0 |
| situation:divine-sequence | 35 | 100.0% | 0.0 |
| situation:investigate-claim | 35 | 100.0% | 0.0 |
| situation:signal-by-sound | 34 | 100.0% | 0.0 |
| library:leave-cartographer | 34 | 100.0% | 0.0 |
| situation:read-the-dust | 32 | 100.0% | 0.0 |
| situation:imagine-solution | 30 | 100.0% | 0.0 |
| corridor:harvest-spout | 30 | 100.0% | 0.0 |
| situation:slip-past-grievance | 28 | 100.0% | 0.0 |
| situation:read-its-gait | 22 | 100.0% | 0.0 |
| corridor:work-the-anvil | 22 | 100.0% | 0.0 |
| corridor:fill-waterskins | 22 | 100.0% | 0.0 |
| situation:hurry-through | 19 | 0.0% | 2.0 |
| situation:leave-cartographer | 17 | 100.0% | 0.0 |
| situation:leave-sealed | 14 | 100.0% | 0.0 |
| boss:dark | 11 | 100.0% | 0.7 |
| situation:fight-grievance | 11 | 0.0% | 6.0 |
| corridor:bless-the-font | 10 | 100.0% | 0.0 |
| situation:force-the-door | 7 | 0.0% | 4.0 |
| monster:dark | 4 | 100.0% | 0.5 |
| corridor:shout-through-it | 4 | 0.0% | 5.0 |
| situation:dark | 3 | 100.0% | 0.0 |
| trap:dark | 3 | 66.7% | 0.0 |
| corridor:observe-closely | 2 | 100.0% | 0.0 |
| corridor:push-through | 2 | 0.0% | 6.0 |
| corridor:hurry-past | 2 | 100.0% | 0.0 |
| corridor:search-methodical | 2 | 100.0% | 0.0 |
| corridor:read-its-gait | 2 | 100.0% | 0.0 |
| corridor:recognize-style | 2 | 100.0% | 0.0 |
| corridor:experiment-rebuild | 2 | 100.0% | 0.0 |
| corridor:read-the-plan | 2 | 100.0% | 0.0 |
| corridor:alchemy-bypass | 2 | 100.0% | 0.0 |
| corridor:take-detour | 2 | 100.0% | 0.0 |
| disaster:dark | 2 | 100.0% | 0.0 |
| corridor:divine-presence | 2 | 100.0% | 0.0 |
| corridor:negotiate-terms | 2 | 100.0% | 0.0 |
| shrine:dark | 2 | 100.0% | 0.0 |
| corridor:push-past-duellist | 1 | 0.0% | 5.0 |
| corridor:tinkering-solve | 1 | 100.0% | 0.0 |
| corridor:leave-cartographer | 1 | 100.0% | 0.0 |
| treasure:dark | 1 | 100.0% | 0.0 |
| corridor:question-the-ghost | 1 | 100.0% | 0.0 |
| corridor:accept-duel | 1 | 100.0% | 0.0 |
| vault:dark | 1 | 100.0% | 0.0 |
| corridor:reconstruct-his-rounds | 1 | 100.0% | 0.0 |
| corridor:divine-safe-square | 1 | 100.0% | 0.0 |
| corridor:signal-by-sound | 1 | 100.0% | 0.0 |
| corridor:dark | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| mad-pyromancer | 212 | 56.6% | 34.0 |
| vampire-lord | 198 | 55.6% | 35.0 |
| the-bride | 195 | 46.2% | 34.3 |
| ogre-king | 177 | 43.5% | 30.2 |
| dragon-whelp | 221 | 43.4% | 32.8 |
| glacier-heart | 229 | 34.9% | 25.9 |
| frost-wisp | 226 | 0.4% | 0.2 |
| crimson-mist | 237 | 0.4% | 0.2 |
| pale-hound | 245 | 0.0% | 0.1 |
| skeleton | 198 | 0.0% | 0.2 |
| wraith | 188 | 0.0% | 0.2 |
| gelatinous | 243 | 0.0% | 0.6 |
| rat-swarm | 274 | 0.0% | 0.0 |
| bat-cloud | 281 | 0.0% | 0.1 |
| ice-crawler | 286 | 0.0% | 0.2 |
| goblin-gang | 175 | 0.0% | 0.2 |
| castle-thrall | 244 | 0.0% | 0.2 |
| cinder-imp | 253 | 0.0% | 0.2 |
| thawed-dead | 211 | 0.0% | 0.3 |
