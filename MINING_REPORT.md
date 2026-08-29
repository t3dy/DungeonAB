# Mining Report — 700 tables (2800 games), hard

Overall win rate: **71.6%**. AI-piloted drafts
(personas rotate through seat 0), one delve per pool. IWD is
correlational — see caveats in tools/mine.js.

<!-- STAT_SCALE {"easy":0.9,"medium":1.19,"hard":1.34,"nightmare":1.38} -->
Measured against `STAT_SCALE`: easy 0.9 · medium 1.19 · hard 1.34 · nightmare 1.38.

## Cards by improvement-when-drafted (min 40 games)

### Top 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Quicksilver Daggers | equipment | 752 | 12.5 | 82.7% | +15.1 |
| Dancing Light | spell | 703 | 14.2 | 79.7% | +10.7 |
| Eyes of the Mouse | spell | 751 | 14.2 | 78.8% | +9.8 |
| Feather Step | spell | 708 | 15.1 | 78.5% | +9.2 |
| Everburning Lantern | equipment | 759 | 11.7 | 77.6% | +8.2 |
| The Scholarly | personality | 435 | 13.9 | 78.4% | +8.0 |
| Bandolier of Knives | equipment | 804 | 12.4 | 77.0% | +7.5 |
| The Craven | personality | 440 | 13.8 | 77.0% | +6.4 |
| The Devout | personality | 448 | 13.8 | 75.7% | +4.8 |
| Blade of the Adder | equipment | 760 | 12.5 | 74.6% | +4.1 |

### Bottom 10

| Card | Type | Games | ATA | WR-in | IWD |
|---|---|---|---|---|---|
| Shove | tactic | 267 | 13.5 | 59.9% | -13.0 |
| The Covetous | personality | 422 | 13.7 | 64.7% | -8.2 |
| The Reckless | personality | 441 | 13.8 | 64.9% | -8.1 |
| The Vandal | personality | 401 | 13.5 | 64.8% | -7.9 |
| Radiant Lance | spell | 695 | 15.2 | 67.6% | -5.3 |
| Masterwork Lockpicks | equipment | 743 | 12.3 | 67.8% | -5.2 |
| The Bold | personality | 443 | 13.6 | 67.5% | -4.9 |
| Cause Fear | spell | 706 | 15.0 | 68.0% | -4.9 |
| Shatter | spell | 692 | 14.9 | 68.1% | -4.8 |
| Improvised Arms | tactic | 292 | 13.6 | 67.5% | -4.7 |

## Skill expression — seat-0 pilot win rates

The Prodigy (skill .95) vs the table personas (.5-.7) vs the Novice
(.15, shiny-chasing, body-blind). The spread between these rows is
the format's measured skill ceiling.

| Pilot | Skill | Games | Win % | Avg bodies drafted |
|---|---|---|---|---|
| prodigy | 0.95 | 140 | 74.3% | 4.0 |
| guildmaster | 0.70 | 140 | 84.3% | 4.0 |
| warlord | 0.55 | 140 | 75.0% | 4.0 |
| archmage | 0.50 | 140 | 70.7% | 4.0 |
| novice | 0.15 | 140 | 65.0% | 3.9 |

## Party-size win curve

| Characters | Games | Win % |
|---|---|---|
| 2 | 2 | 50.0% |
| 3 | 10 | 40.0% |
| 4 | 2788 | 71.8% |

## Kit-count win curves (read this before trusting IWD)

How the pool's *composition* pays off. Equipment scales with count;
spells are flat to about four and then fall away, because ordinary
rooms only ration one or two casts. This is why per-card IWD
understates every individual spell — spell-hoarding pools lose, and
they drag down the WR-in of each spell they happen to contain.

| Held | Spells: games | Spells: win % | Equipment: games | Equipment: win % |
|---|---|---|---|---|
| 0 | — | — | — | — |
| 1 | 68 | 69.1% | — | — |
| 2 | 176 | 67.0% | — | — |
| 3 | 304 | 71.1% | 92 | 66.3% |
| 4 | 465 | 75.3% | 235 | 65.5% |
| 5 | 408 | 74.3% | 325 | 67.4% |
| 6 | 367 | 72.5% | 332 | 70.2% |
| 7 | 419 | 72.8% | 385 | 73.8% |
| 8 | 336 | 66.4% | 400 | 72.0% |
| 9+ | 249 | 69.1% | 1008 | 74.4% |

## Class presence

| Class | WR with | WR without | Delta |
|---|---|---|---|
| fighter | 71.4% | 73.0% | -1.6 |
| cleric | 72.4% | 67.6% | +4.8 |
| wizard | 70.7% | 74.4% | -3.7 |
| rogue | 71.7% | 71.4% | +0.3 |
| alchemist | 71.8% | 71.2% | +0.6 |

## Personality presence

| Archetype | Games | WR with | Delta vs field |
|---|---|---|---|
| scholarly | 435 | 78.4% | +6.7 |
| craven | 440 | 77.0% | +5.4 |
| pious | 448 | 75.7% | +4.0 |
| cunning | 797 | 70.9% | -0.8 |
| brave | 443 | 67.5% | -4.1 |
| reckless | 785 | 65.7% | -5.9 |
| greedy | 422 | 64.7% | -7.0 |

## Trophies claimed vs winning

| Trophies | Games | Win % |
|---|---|---|
| 0 | 282 | 17.7% |
| 1 | 891 | 64.0% |
| 2 | 968 | 81.4% |
| 3 | 443 | 91.0% |
| 4 | 163 | 89.6% |
| 5+ | 53 | 92.5% |

## Decision outcomes by room and action

| Room:Action | N | Success | Avg damage |
|---|---|---|---|
| monster:spell-strike | 1767 | 99.7% | 0.0 |
| stairs:descend | 1641 | 100.0% | 0.0 |
| materials:gather | 1450 | 100.0% | 0.0 |
| library:study | 1431 | 100.0% | 0.0 |
| boss:spell-strike | 1033 | 96.6% | 2.7 |
| trap:push-through | 858 | 100.0% | 4.3 |
| lab:pass-by | 800 | 100.0% | 0.0 |
| shrine:rest | 798 | 100.0% | 0.0 |
| shrine:desecrate | 667 | 100.0% | 0.0 |
| disaster:scatter | 646 | 48.0% | 0.0 |
| disaster:brace | 610 | 100.0% | 5.3 |
| shrine:pass-by | 609 | 100.0% | 0.0 |
| library:pass-by | 607 | 100.0% | 0.0 |
| trap:spell-bypass | 531 | 100.0% | 0.0 |
| library:bless-the-font | 530 | 100.0% | 0.0 |
| lab:alchemy | 529 | 100.0% | 0.0 |
| library:strip-the-shelves | 492 | 100.0% | 0.0 |
| trap:search-around | 484 | 98.1% | 0.0 |
| materials:pass-by | 467 | 100.0% | 0.0 |
| trap:disarm | 443 | 86.2% | 0.0 |
| monster:flee | 436 | 100.0% | 2.3 |
| disaster:sift-rubble | 424 | 100.0% | 0.0 |
| lab:crack-crates | 423 | 100.0% | 0.0 |
| stairs:rope-down | 414 | 100.0% | 0.0 |
| monster:fight | 405 | 99.5% | 1.3 |
| monster:sneak | 392 | 86.0% | 0.0 |
| lab:strip-the-shelves | 374 | 100.0% | 0.0 |
| library:deep-study | 360 | 96.4% | 0.0 |
| lab:harvest-spout | 357 | 100.0% | 0.0 |
| treasure:loot | 346 | 84.1% | 0.0 |
| shrine:bless-the-font | 340 | 100.0% | 0.0 |
| shrine:pry-sarcophagus | 326 | 100.0% | 1.0 |
| trap:smoke-bomb | 325 | 100.0% | 0.0 |
| materials:sift-rubble | 323 | 100.0% | 0.0 |
| trap:sift-rubble | 309 | 100.0% | 0.0 |
| boss:flee | 286 | 100.0% | 2.3 |
| materials:crack-crates | 277 | 100.0% | 0.0 |
| vault:loot | 272 | 72.1% | 0.0 |
| boss:fight-from-cover | 270 | 53.7% | 36.6 |
| corridor:proceed | 222 | 100.0% | 0.0 |
| boss:shove-into-brazier | 220 | 61.8% | 32.1 |
| materials:harvest-spout | 218 | 100.0% | 0.0 |
| treasure:inspect | 215 | 100.0% | 0.0 |
| boss:fight | 211 | 36.5% | 44.7 |
| monster:fight-from-cover | 200 | 100.0% | 0.3 |
| vault:inspect | 198 | 100.0% | 0.0 |
| library:fill-waterskins | 193 | 100.0% | 0.0 |
| boss:shove-into-pit | 186 | 71.5% | 31.5 |
| monster:shove-into-brazier | 178 | 100.0% | 0.4 |
| boss:shove-onto-spikes | 174 | 66.7% | 30.6 |
| vault:leave-it | 170 | 100.0% | 0.0 |
| monster:sift-rubble | 163 | 100.0% | 0.0 |
| monster:shove-onto-spikes | 154 | 100.0% | 0.0 |
| treasure:leave-it | 149 | 100.0% | 0.0 |
| boss:drop-portcullis | 142 | 58.5% | 32.7 |
| boss:pry-sarcophagus | 140 | 100.0% | 0.8 |
| monster:shove-into-pit | 140 | 100.0% | 0.2 |
| treasure:pry-sarcophagus | 140 | 100.0% | 0.9 |
| treasure:crack-crates | 138 | 100.0% | 0.0 |
| boss:shove-into-chasm | 137 | 60.6% | 32.5 |
| shrine:fill-waterskins | 130 | 100.0% | 0.0 |
| monster:crack-crates | 130 | 100.0% | 0.0 |
| monster:shove-into-chasm | 124 | 100.0% | 0.0 |
| lab:work-the-anvil | 124 | 100.0% | 0.0 |
| monster:bless-the-font | 124 | 100.0% | 0.0 |
| stairs:camp-stair | 122 | 100.0% | 3.1 |
| vault:pry-sarcophagus | 111 | 100.0% | 0.8 |
| monster:pry-sarcophagus | 111 | 100.0% | 0.8 |
| monster:drop-portcullis | 108 | 99.1% | 0.3 |
| monster:turn-undead | 106 | 88.7% | 0.0 |
| vault:strip-the-shelves | 104 | 100.0% | 0.0 |
| monster:strip-the-shelves | 102 | 100.0% | 0.0 |
| monster:topple-boulder | 97 | 100.0% | 0.4 |
| treasure:knock-open | 89 | 100.0% | 0.0 |
| materials:work-the-anvil | 88 | 100.0% | 0.0 |
| monster:harvest-spout | 86 | 100.0% | 0.0 |
| vault:knock-open | 82 | 100.0% | 0.0 |
| boss:turn-undead | 66 | 81.8% | 0.0 |
| lab:brew-oil | 53 | 100.0% | 0.0 |
| boss:dark | 51 | 98.0% | 0.6 |
| monster:cause-fear | 49 | 100.0% | 0.0 |
| monster:fill-waterskins | 43 | 100.0% | 0.0 |
| materials:brew-oil | 40 | 100.0% | 0.0 |
| monster:work-the-anvil | 39 | 100.0% | 0.0 |
| boss:bribe | 35 | 100.0% | 0.0 |
| monster:dark | 22 | 100.0% | 0.5 |
| monster:bribe | 21 | 100.0% | 0.0 |
| corridor:sift-rubble | 18 | 100.0% | 0.0 |
| library:dark | 15 | 100.0% | 0.3 |
| corridor:crack-crates | 12 | 100.0% | 0.0 |
| trap:dark | 12 | 100.0% | 0.6 |
| vault:dark | 11 | 100.0% | 0.0 |
| shrine:dark | 11 | 100.0% | 0.0 |
| corridor:harvest-spout | 11 | 100.0% | 0.0 |
| corridor:bless-the-font | 10 | 100.0% | 0.0 |
| materials:dark | 10 | 100.0% | 0.0 |
| lab:dark | 9 | 100.0% | 0.0 |
| treasure:dark | 8 | 100.0% | 0.6 |
| disaster:dark | 6 | 100.0% | 0.8 |
| stairs:dark | 3 | 100.0% | 0.0 |
| corridor:fill-waterskins | 2 | 100.0% | 0.0 |
| corridor:work-the-anvil | 1 | 100.0% | 0.0 |

## Monster lethality (fights + spell-strikes)

| Kind | Fights | Party loss % | Avg damage |
|---|---|---|---|
| the-precipitate | 81 | 24.7% | 16.2 |
| bog-witch | 76 | 18.4% | 10.1 |
| mad-pyromancer | 68 | 17.6% | 13.7 |
| the-cauldron | 70 | 17.1% | 11.2 |
| ogre-king | 75 | 14.7% | 9.9 |
| grand-errata | 78 | 14.1% | 10.4 |
| cinder-wyrm | 81 | 13.6% | 11.8 |
| vampire-lord | 78 | 12.8% | 10.8 |
| dragon-whelp | 86 | 12.8% | 10.4 |
| glacier-heart | 111 | 12.6% | 8.7 |
| archivist | 80 | 12.5% | 8.0 |
| the-bride | 68 | 11.8% | 8.4 |
| mad-alchemist | 72 | 11.1% | 8.6 |
| abbot-of-worms | 77 | 9.1% | 6.8 |
| forge-tyrant | 68 | 7.4% | 9.8 |
| shrouded-king | 75 | 6.7% | 2.5 |
| barrow-shade | 90 | 2.2% | 0.5 |
| spectral-scribe | 54 | 1.9% | 0.5 |
| magma-toad | 59 | 1.7% | 0.2 |
| pickled-thing | 64 | 1.6% | 0.1 |
| bone-warden | 75 | 1.3% | 0.7 |
| cinder-bats | 90 | 1.1% | 0.0 |
| mutant-vine | 75 | 0.0% | 0.4 |
| ink-elemental | 70 | 0.0% | 0.2 |
| ice-crawler | 75 | 0.0% | 0.0 |
| root-golem | 65 | 0.0% | 0.5 |
| jar-imp | 61 | 0.0% | 0.0 |
| crimson-mist | 82 | 0.0% | 0.5 |
| wraith | 58 | 0.0% | 0.2 |
| goblin-gang | 49 | 0.0% | 0.1 |
| thawed-dead | 53 | 0.0% | 0.1 |
| flying-tomes | 72 | 0.0% | 0.1 |
| salamander | 78 | 0.0% | 0.2 |
| obsidian-golem | 68 | 0.0% | 1.4 |
| grave-mites | 112 | 0.0% | 0.0 |
| skeleton | 45 | 0.0% | 0.1 |
| potion-rats | 77 | 0.0% | 0.1 |
| frost-wisp | 53 | 0.0% | 0.0 |
| castle-thrall | 65 | 0.0% | 0.2 |
| failed-homunculus | 47 | 0.0% | 0.3 |
| hungry-ghoul | 72 | 0.0% | 0.5 |
| gelatinous | 60 | 0.0% | 0.2 |
| pale-hound | 65 | 0.0% | 0.3 |
| bat-cloud | 78 | 0.0% | 0.0 |
| sludge-elemental | 44 | 0.0% | 0.4 |
| index-wight | 44 | 0.0% | 0.1 |
| cinder-imp | 64 | 0.0% | 0.2 |
| rat-swarm | 54 | 0.0% | 0.1 |
| bog-toad | 54 | 0.0% | 0.6 |
