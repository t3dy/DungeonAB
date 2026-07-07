# DungeonAB — v5 Roadmap: "The Contest"

**One-line pitch:** turn the solo spectacle into a shareable, replayable
*competition*, and make the draft's consequences legible — because the
#1 design pillar is "The Draft Is the Game," and right now the draft is
the one part the player can't fully feel.

## Where v4 leaves us

- **Strong:** deterministic sim end-to-end, rich combat theater, deep
  roguelike systems (multi-floor, item identification, shops/altars,
  elites, monster signature moves), audited card balance + a real
  difficulty curve, achievements. 29 test suites.
- **Thin:**
  1. **The draft→outcome loop is loose.** Pack picks should be
     "agonizing," but signal-reading is shallow and the payoff (seeing
     your choice matter against the rivals) is a single abstract
     standings table at the very end.
  2. **Combat is presentation-rich but tactically flat** — aggregate
     party-swing vs. monster-swing. Party *composition* barely
     expresses as tactics.
  3. **No replay/retention hooks** — no daily seed, no challenge mode,
     no way to share or compare a run. Determinism makes all of these
     nearly free, and none exist yet.
  4. **Rivals already sim but are invisible and static** — you never
     watch them (`computeStandings` runs real rival delves via
     `runRival`, but only the final score surfaces), they have no
     identity or memory, and standings can be lopsided.
  5. **Tech debt:** one ~700 KB bundle (Three.js) hurts first paint;
     two measured balance watchlist items (Melchior's uncapped
     doubling, party-defense dilution at `totalDefense/3`).

## Workstreams

Legend — Effort/Risk/Value each L/M/H.

### P0 — The Living Table *(the release's spine; serves Pillar #1)*

| Item | What | E/R/V |
|---|---|---|
| **Draft signals with teeth** | During the draft, telegraph what each rival is collecting and which cards they'll fight you for ("the Archmage is spell-hungry — that Firebolt won't wheel back"). Make each pick a legible tradeoff. | M / L / **H** |
| **Watch the table delve** | Surface the rival sims that already run: a post-draft "the table descends" beat, rival run highlights in standings (how they died, their MVP, deepest floor), optional side-by-side. | M / L / **H** |
| **Rival identity & memory** | Personas gain skill tiers + quirks and per-session rivalry memory (the Warlord remembers you sniped his greatsword; grudges tilt the hex he lays). | M / M / M-H |

### P1 — Competition & retention *(near-free given determinism)*

| Item | What | E/R/V |
|---|---|---|
| **Daily / Weekly Challenge** | A fixed seed + locked difficulty/condition everyone plays the same; personal-best tracking, achievement hooks. Classic roguelike retention driver. | L-M / L / **H** |
| **Shareable run codes** | Encode seed + difficulty + draft picks + result into a copyable code; decode to *replay* or *verify* a friend's run. Async competition with **no backend** — the realistic first rung of the DESIGN.md multiplayer trajectory. | M / L / M-H |

### P2 — Depth & content *(opportunistic, scoped)*

| Item | What | E/R/V |
|---|---|---|
| **Tactical combat increment** | Marching order as an arrangeable party property + monster targeting + positional signature moves (breath hits the front rank, hex targets the caster). Makes composition express as tactics, tightening draft→outcome. **Gated** behind a re-run of the balance + difficulty audits. | H / **M-H** / H |
| **Content set #2 + set framework** | A second DLC theme/pack and a light "set" concept so content ships versioned. Parallelizable, low-risk. | M / L / M |

### Quality / tech-debt *(fold into the release)*

- **Balance watchlist:** cap Melchior's doubling (or make it
  slot-competitive); revisit party-defense dilution. Both measured —
  low-risk with `tools/balance-audit.mjs`.
- **Perf:** code-split the Three.js renderer so the draft screen paints
  before the 3D loads.

### Deferred (and why)

- **True realtime multiplayer / server leaderboard** — needs backend
  infra, out of scope for the vanilla-JS + static Vercel constraint.
  Daily seeds + shareable codes are the async substitute that delivers
  most of the social value at a fraction of the cost.

## Recommended sequence

1. **P0 Living Table** — the spine; builds directly on the existing
   rival sim, serves the core pillar.
2. **P1 Daily Challenge + Run Codes** — cheap, high retention, leverages
   determinism; thematically inseparable from "The Contest."
3. **Quality/balance watchlist** — fold in as combat is touched anyway.
4. **P2 tactical combat** as the stretch goal — ship it *only* if the
   re-run balance/difficulty audits stay green; otherwise it becomes
   v5.1 rather than blocking the release.
5. **Content set #2** — parallel track, drop in anytime.

## Success criteria (measurable, using the sim harnesses)

- **Draft matters:** the rival contest is *close* — standings spread,
  not player-always-first (measure win-share across seeded tables;
  target rivals winning ~30–45%).
- **Retention loop works:** daily challenge share→verify round-trips
  deterministically.
- **No regressions:** balance + difficulty audits re-run green after any
  combat change; test suites grow per system.
- **Faster first paint:** draft screen interactive before the renderer
  bundle loads.

## Progress

- [x] **P0.1 Draft signals with teeth** — `DraftSignals.js`: rival
  appetites (`describeAppetite`) + coveted-card prediction
  (`recipientThreats`, reusing the AI's own `scoreCard` chaos-free).
  The draft screen glows the cards the next drafter will grab and
  reads each rival's hunger. Covered by `draftsignals.test.js`.
- [ ] P0.2 Watch the table delve ← *next*
- [ ] P0.3 Rival identity & memory
- [ ] P1.1 Daily / Weekly Challenge
- [ ] P1.2 Shareable run codes
- [ ] Quality: Melchior cap, defense dilution, code-split
- [ ] P2.1 Tactical combat increment (gated on audit)
- [ ] P2.2 Content set #2
