# DungeonAB — Card Balance Audit (2026-07)

Combat v2 (exchange log, class signature moves, monster moves, elites)
changed the value of every card. This audit measured the whole pool
empirically and tuned the outliers.

## Method

`tools/balance-audit.mjs` — paired-seed marginal value. For every card
X: run N=400 seeded dungeons with a fixed base party, and again with
base+X **on the same seeds**, so dungeon variance mostly cancels. The
reported number is the win-rate delta the card buys (score delta
alongside). Decision randomness still leaks noise ≈ ±2-3%; treat
anything inside that as flat.

Contexts matter and were chosen per card type:
- **Characters** on a fighter+rogue core (no cleric/wizard/alchemist,
  so first-copy value shows) — once bare, once with 3 spells in the
  pool (so spell-carrier classes get their synergy measured).
- **Equipment / spells / personalities** on a 5-class party at *hard*
  (the medium base sat at a 99.8% win ceiling and flattened every
  delta — measure where there's room to move).

Rerun anytime: `node tools/balance-audit.mjs`.

## Findings → decisions

| Finding (measured) | Decision |
|---|---|
| Alchemists weakest class in both contexts (+16–37% vs fighters' +36–56%) | Vial opener 2→3 (4 off the Athanor Charm); Perenelle 11/2→12/3; class now within ~10 pts of the pack |
| Portable Alembic **−4.0%**, Athanor Charm −1.0% — alchemy never reads mind, so mind-tools on alchemists were dead cards | Alembic: +1 material on every gather. Athanor: working coatings bite +1, vial +1. Both now +4% |
| Melchior's card text ("doubles the power of any spell") was not implemented — all wizards gave flat +2 | Implemented literally: Melchior alive → spell power ×2. He's now the pool's build-around bomb (+61% with spells, mid-pack without — intended draft texture) |
| Sister Benedicta ~7 pts under her class (attack 2) | Attack 2→3; now on par with Oswald |
| Vex weakest rogue | Health 11→12 |
| The Reckless: **−15% win, −5 score** on hard — a strict trap with no upside | Fury: reckless parties swing +1 every combat round. Now −6% win / +20-38 score — a real risk-for-score wager like the Covetous |
| The Craven death-spiraled (−16% on medium): flee-loops bleed 2 damage each | Craven retreats cost 1, not 2. At 0 it overshot to +17% (degenerate free-retry); at 1 it lands neutral on medium, +10% on hard — a sleeper the AI drafters still flinch from (`trap: true`), which is the Boss Monster lesson done right |
| Pure-armor cards flat (chainmail, buckler, tower shield oscillating around 0): party defense dilutes (`totalDefense/3`), so +2-3 def on one member is nearly nothing | Tower Shield and Warded Buckler carry ward-1 class actions (the engine prices ward correctly: the Holy Symbol measured +4–10%). Both now +6–7%. Chainmail stays plain filler (−0.5, noise) |
| Utility spells flat; Eyes of the Mouse / Feather Step did nothing between casts | Prep hooks: Eyes +1 secret-door detection, Feather +1 trap soak |
| Combat spells +9–16%, heals +3–7%, first-copy clerics ~+50%, fighters uniformly strong | Healthy, untouched |
| The Cunning flips by difficulty (−6.5% medium, +5% hard — skipping easy bounties is bad, dodging hard fights is good) | Healthy by design, untouched |

## Watchlist for the next pass

- Melchior at +61% in spell-heavy pools — acceptable as a bomb, but if
  the Archmage AI persona hoards him every draft, cap the doubling at
  +6 or make it wizard-slot-competitive some other way.
- Craven +10% on hard is top-of-class for a card the rivals never
  fight you for. If it warps drafting, bump the flee cost on *boss*
  rooms only.
- Party defense dilution (`totalDefense/3`) is the systemic reason
  armor stats underperform; a divisor change would be a rebalance of
  everything and was deliberately out of scope here.

---

# Difficulty Curve Audit (v4.0 follow-up)

`tools/difficulty-audit.mjs` measures the *realistic* curve: the player
drafts via the balanced (Guildmaster) persona, then plays a full
campaign, delving deeper until wipe or a rational retire. Two player
models — a cautious one (retire by depth 4) and an ambitious one (push
to depth 9) — reveal where the tension lives.

## Finding

Before v4.0, campaign depth escalation was **difficulty-independent**
(a flat +0.15 atk / +0.20 hp per depth for every tier); only the flat
`STAT_SCALE` opening punch differed. Result: medium — the default tier
— was tensionless. A cautious player banked depth 4 at 96% safety, and
even an ambitious deep-diver was rarely threatened. The tiers only
diverged in late-campaign attrition, and medium's was negligible.

## Decision: DEPTH_SCALE, difficulty's second lever

Depth escalation is now per-tier ({ atk, hp } added per depth beyond
the first):

| Tier | atk/depth | hp/depth | was |
|---|---|---|---|
| easy | 0.10 | 0.14 | 0.15 / 0.20 |
| medium | 0.20 | 0.26 | 0.15 / 0.20 |
| hard | 0.26 | 0.33 | 0.15 / 0.20 |
| nightmare | 0.32 | 0.40 | 0.15 / 0.20 |

Because escalation is ×(depth−1), it is **zero at depth 1** — the
opening dungeon is difficulty-flat, so the entire card audit above
(all measured at depth 1) is provably unaffected. A regression test
(`balance.test.js`) locks the invariant: depth-1 tiers differ only by
`STAT_SCALE`.

## Measured curve after the change (ambitious deep-diver, N=300)

| Tier | avg depth | wipe% | how deep dare you go |
|---|---|---|---|
| easy | 8.7 | 2% | sandbox — learn freely |
| medium | 5.8 | 48% | a real retire-vs-delve wager ~depth 5-7 |
| hard | 3.2 | 61% | pushing past ~depth 3 is a gamble |
| nightmare | 1.9 | 71% | brutal from the first floor |

The cautious medium player still banks depth 4 at ~4% wipe, so medium
serves both playstyles: safe banking, or a genuine gamble for score.
Rerun: `node tools/difficulty-audit.mjs`.
