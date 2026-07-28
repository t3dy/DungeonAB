# MORIGNY — Agent Guide (system file)

Sub-project of DungeonAB: **monastic life & practice simulator** of John of
Morigny. Read in order: `DESIGN.md`, `STYLE_GUIDE.md`, `INTERFACE.md`,
`ART_SOURCES.md`, `BIBLIOGRAPHY.md`. The repo root's standing rules apply;
these are additional and binding for everything under `morigny/`.

## Standing Rules

1. **No unsourced content.** Every content record (data, narration, vision,
   Struggle event) carries `sources: [{work, locus}]` and
   `status: attested | adapted | invented`. Renderer and tests refuse
   records without them. Uncertain claims carry `verify: true` and appear in
   the Research Queue (`BIBLIOGRAPHY.md`).
2. **Never fabricate quotations** — not from John, not from Fanger, not from
   anyone. Invented text in John's voice is `status: invented`, and the
   in-game apparatus can disclose that.
3. **The Struggle register rules in `STYLE_GUIDE.md` are binding**: interior
   simulation only; never depicted; never mocked; no reward loop that makes
   lapse desirable. Any new mechanic touching this system gets a style-guide
   check before merge.
4. **Use Fanger's method, not her person.** The pencil hand is the
   designer-scholar's own voice. It never bears her name or invents her
   words. Cite her constantly; impersonate her never.
5. **Fixed history stays fixed.** 1323 always arrives. No alternate-history
   endings. Agency = endurance, revision, transmission.
6. **Asset provenance before pixels.** No image or audio enters the repo
   without a complete `assets_manifest.json` entry (schema in
   `ART_SOURCES.md`). Processing beyond cleanup demotes `attested` →
   `adapted`, recorded in the manifest.
7. **Period discipline:** core-play imagery c. 1280–1330 northern France
   (see `ART_SOURCES.md`); later material only in the pencil apparatus and
   the whitening epilogue, always dated on-screen.
8. **Tests ship with mechanics** (house rule), plus this sub-project's own:
   provenance lint, schema validation, writing coverage
   (hour × obligation × interruption; every Struggle state), horarium
   integrity on seeded days.
9. **When the scholarship and a fun mechanic conflict, the scholarship
   wins** — then find the fun *inside* what the sources actually say. The
   record so far is that the sources are stranger and better than invention.

## Data layout (all under `morigny/data/`)

| File | Contents |
|---|---|
| `hours.json` | canonical hours, seasonal horarium (seeded example present) |
| `rule.json` | Rule of St Benedict excerpts in play (RB 8–20 offices, 22 dormitory, 48 labor/lectio, chapter/discipline) |
| `liber_florum.json` | structure of the work: books, procedures, prayer sequences, figures — populate from the Fanger–Watson edition |
| `personae.json` | John, Bridget, the community, the Virgin, the apparitions |
| `chronology.json` | dated beats incl. 1323; `verify` until pinned |
| `visions.json` | vision episodes + discernment tells |
| `struggle.json` | temptation events/states; register-checked |
| `assets_manifest.json` | every art/audio asset's provenance |

**Record envelope** (all files):

```json
{
  "id": "…",
  "…": "content fields",
  "sources": [{ "work": "…", "locus": "…" }],
  "status": "attested | adapted | invented",
  "verify": false,
  "sim": { "mechanical fields — invention by definition, no sources needed": true }
}
```

Historical fields need sources; the `sim` block is where game math lives so
the two are never confused.
