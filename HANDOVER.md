# HANDOVER — DungeonAB design/research session → desktop continuation

*Written 2026-07-15 from a remote (cloud) session that cannot see
C:\Dev. Everything below is committed and pushed on branch
`claude/monster-item-drops-wsc0sp` (no PR opened). Verify state with
`npm test` (23 suites) and `npm run mine`.*

---

## What happened, turn by turn

**1. Monster drops** (`2b54961`) — `src/game/Drops.js`: every defeated
monster drops a signature item (46 base kinds + 6 alchemy-pack, all
themed; trait fallback then generic floor so nothing drops nothing).
Wired into fight/spell-strike/turn-undead kill paths; bosses drop on
top of the hoard find; flee/sneak/bribe claim nothing. Coverage
test-enforced (`tests/drops.test.js`).

**2. Trophy case** (`1f259c1`) — `party.trophies` remembers every
claim with provenance and persists across campaign depths. Surfaces:
HUD counter (hover = inventory), town ledger, final-screen trophy
case, endings, `describeTickEvents` 'trophy' toast. Mechanics: the
Covetous now weight fight up / sneak down (kills pay); drop-aware
greedy barks per class. (`tests/trophies.test.js`)

**3. Descriptive narration** (`b8528cb`) — house style change:
narration reports actor/action/numbers ("The party kills X in 2
rounds, taking 4 damage"), no literary flourishes; the story panel
doubles as combat log. Narrator.js rewritten wholesale; drop chronicle
lines generated from effects ("…drops the toll-purse: 15 gold");
barks (dialogue) and item card text keep flavor. Style rule recorded
in DESIGN.md.

**4. Systems audit** (`40c6b34`) — `AUDIT.md` + `DESIGN_DIALOGUE.md`.
Key verified bugs (all still UNFIXED, queued in AUDIT.md §F):
- A1 `slow` trait implemented but assigned to zero monsters; 8 dead
  roster `slow: true` flags nothing reads.
- A2 failed turn-undead vs a boss → party walks past the boss into a
  false VICTORY (Simulator treats path-end as win).
- A3 `serializeDungeon` drops `trapType` and combined-condition ids —
  archived replays lose fire/poison/alarm traps and the score wager.
- A4 shock element has resisters but no monster weak to it.
- B-series: bribed bosses pay no drop/hoard/trophy; boss worth 3
  different scores by clear path; drops ignore depth/condition
  scaling; alarm only affects the fight path; trophies/spellsLearned
  die at every persistence boundary (Progression/Standings/Archive).
- C-series: live grimoire + personalities rendered NOWHERE; 2D
  fallback renderer and both editors (CardEditorUI, ArchiveUI) still
  on pre-natures/pre-element schema (ArchiveUI retypeRoom destroys new
  fields); bossPhased/spellEdge/drop flattened out of the narration
  payload before the event feed can toast them.
- Measured pillar violations: 5 bare bodies 100% vs elite duo 55%
  (the draft is solved); medium doesn't resist any 4+ body pool.

**5. Historians' session** (`cc5bab7`) — `RESEARCH_BRIEF.md`: seven
worldview→mechanics mappings (correspondence/election → element
redesign; stages of the Work → run structure + drop ripening;
licit/illicit wager → deferred compounding costs; patronage → wagers/
town/ruin as a loss-shape; Decknamen → trap cards; ora-et-labora →
shrine/lab competition; Chymical Wedding weighing → party evaluation
ceremony) + 9 questions to Ted (§3). Standing rule: **the worldview
lives in the costs, not the nouns.**

**6. Mining harness + skill tiers** (`9aa641e`) — `tools/mine.js`
(17lands-style): AI-piloted full draft tables → delves → ATA / WR-in /
IWD / curves / decision tables / monster lethality. `npm run mine
[tables] [difficulty] [out.md]`; 2000 games ≈ 1s. PackDraft now has
`rationalValue` (mining-calibrated pro baseline), `biasValue`
(preferences + novice quirks: shiny-chasing, body-blind,
curse-chasing), `evaluatePick` (skill blend, chaos shrinks with
skill), `PILOT_TIERS` (Prodigy .95 / Novice .15) + `PILOT_PERSONAS`.
Findings (`MINING_REPORT.md`, 500 tables nightmare): 96% overall WR;
skill spread only 17 pts at nightmare, ZERO below (guaranteed-coverage
packs force ~6+ bodies into any pool); the whole IWD bottom-10 is
spells/wizards (wizard presence −3.3, cleric +6.7 = the mythic
uncommon); non-boss monsters post 0% party-loss. DESIGN_DIALOGUE §6 =
skill-expression brief (punishing difficulty floor, designed traps,
mid-dungeon exams, pilot ladder as calibration/percentiles).

**7. This turn (interrupted)** — Ted answered brief questions
mid-turn: **Megabase holds the LLM chats raw + processed**;
**correspondence tables endorsed** as the organizing spine for asset
data; see his **Alchemy Blocks** system (Unicode alchemical glyphs,
U+1F700 block, + alchemy emojis as mechanical visual cues — the
alchemy pack already uses 🜂🜄🜚🜍🜖☿🜁🜋). Located the emblem research:
`t3dy/AtalantaClaudiens` on GitHub (= C:\Dev\Claudiens). Remote
sandbox denied cloning; explored read-only via GitHub API instead.

## What we learned about AtalantaClaudiens (don't re-derive)

- Architecture: corpus .md → Python scripts → SQLite → `build_site.py`
  → static HTML (GitHub Pages). No frameworks.
- **Provenance tiers on every datum**: DETERMINISTIC /
  CORPUS_EXTRACTION / LLM_ASSISTED / SEED_DATA / HUMAN_VERIFIED, with
  review badges. (This discipline is the model for everything below.)
- **EMBLEMGUIDE.md is the agent entry point**: all 51 emblems (F +
  I-L) with label, motto, stage tag (NIG/ALB/CIT/RUB — many still
  `-`), source counts, image status (24/51 confirmed; Wikimedia
  download pattern documented). SQL recipes for content/refs/terms.
- `data/`: `emblem_manifest.json` (canonical identity, agent-editable),
  `emblem_identity_seed.json`, `visual_scene_summaries.json` (30KB —
  likely LLM scene descriptions). Root: `atalanta_fugiens_seed.json`
  (191KB), `ForshawAF.txt` (69KB scholarship), `AFMUSIC.txt` (fugues),
  SCHOLARSHIPREPORT.md, AFSTYLING.md, PHASESTATUS.md,
  DOCUMENTAIRTRAFFICCONTROL.md.
- De Jong scholarship spine; cross-refs Tilton/Craven/Wescott/Pagel/
  Miner; maps Maier's sources (Turba, Rosarium, Tabula Smaragdina,
  Ovid) per emblem; dictionary + timeline + bibliography.
- Related: HPMarginalia (same architecture, Hypnerotomachia),
  furnaceandfugue.org (primary source: text/music/images).
- **Observed data issues** (from the guide's own tables): mottos are
  OCR-dirty ("His nurseis the earth", "Clzmgor BMcc:Ta:ae…"); stage
  tags incomplete (~20 of 51 blank); 27 images unsourced.

## Draft recommendations — databases × LLM access (refine on desktop)

1. **Clean-text pass** on the 51 motto/epigram rows (OCR artifacts) →
   mark HUMAN_VERIFIED. Games need clean strings; so does the site.
2. **One game-facing export**: a canonical `emblems.json` view — id,
   roman, label, motto (la/en), epigram, discourse summary, stage,
   scene summary, image path + license + confirmed, sources,
   confidence. Stable IDs = the ingestion contract for DungeonAB /
   EmblemRoguelike. Generated by a script next to `build_site.py`.
3. **Finish stage tagging** (NIG/ALB/CIT/RUB) — DungeonAB wants stages
   as run structure (RESEARCH_BRIEF §2b); blanks block that.
4. **Correspondence tables as first-class data** (Ted endorsed):
   `correspondences` table (planet ↔ metal ↔ material ↔ hour ↔ virtue ↔
   glyph) + per-emblem links; DungeonAB mirrors it as the data-driven
   replacement for the broken 4-element system (audit A4).
5. **Alchemy Blocks as shared legend**: a `glyphs` mapping (entity →
   U+1F700-block codepoint + emoji fallback) used by BOTH the site and
   the game — one visual language for mechanics and scholarship.
6. **LLM retrieval shape**: per-emblem markdown chunks with stable
   anchors (or a small MCP server over the SQLite DB) + an `llms.txt`
   index, so an agent can pull exactly one emblem's full record.
7. **Megabase**: link every processed claim back to its raw chat
   (same provenance discipline as the site); expose a query surface
   the game-design sessions can cite.

## Next steps (desktop queue, roughly in order)

1. Open C:\Dev\Claudiens directly; verify the recommendations against
   the actual SQLite schema + scripts; check C:\Dev for Megabase and
   the Alchemy Blocks system; refine recs into concrete scripts.
2. Implement the `emblems.json` export in Claudiens, then in DungeonAB
   a `tools/ingest-emblems.js` that regenerates the alchemy pack from
   it (50-emblem monster/drop/spell set, authentic mottos as card
   text — house style: flavor on cards, mechanics in narration).
3. `src/game/Glyphs.js` in DungeonAB — the Alchemy Blocks legend
   (elements/traits/drop effects/stages ↔ glyphs), wired into DraftUI
   element chips, narration tells, and MINING_REPORT rendering.
4. Correspondence-driven element redesign per RESEARCH_BRIEF §2a
   (pick the scheme: Agrippa scales vs Ficino vs Picatrix — Ted's
   call, brief question #5-7).
5. Audit fix queue (AUDIT.md §F): slow trait, boss walk-off, trapType
   serialization, non-kill boss rewards, score economy unification,
   trophy persistence, editor schema.
6. Re-run `npm run mine` after each balance-relevant change; the
   skill-spread number (DESIGN_DIALOGUE §6) is the regression metric.
7. Still-open brief questions for Ted: patronage material (#4),
   priority worldview tension (#7), fidelity tiers ↔ rarity (#8),
   medieval vs early-modern as two packs (#9).
