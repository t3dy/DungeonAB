#!/usr/bin/env node
/**
 * Build the website hub: the version gallery and the docs browser.
 *
 * The game lives at the site root. This produces the OTHER half of the
 * site — a page at /hub/ that links every playable version and lets
 * anyone read the project's documentation without cloning the repo.
 *
 *   npm run hub
 *
 * It copies the publishable markdown into src/public/docs/ and writes a
 * manifest the static hub page (src/public/hub/index.html) reads at run
 * time. Run it whenever the docs change or a version is added; the
 * result is committed and shipped by the ordinary build (Vite copies
 * src/public verbatim).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_OUT = path.join(ROOT, 'src/public/docs');

/**
 * The playable versions, newest first. Each links a frozen build under
 * src/public/vN/ (or the root for the current one). Descriptions are
 * one line: what that release was.
 */
const VERSIONS = [
  { v: 'v8.1', href: '../', tag: 'current', title: 'The brass-tacks dungeon simulator',
    blurb: 'One draft, one single-floor dungeon. The town, campaign, providence, tactic tree, wagers, locks and alchemy economy are cut; twelve capabilities across sixteen Renaissance magi, graded by depth, decide what a party can attempt. Lean and mean.' },
  { v: 'v8.0', href: '../v8/', title: 'The cut',
    blurb: 'The same simulator at the moment the systems came out — before the capability vocabulary was compressed to twelve and the card pool to fifty-two.' },
  { v: 'v7.0', href: '../v7/', title: 'The prototype (pre-cut)',
    blurb: 'The full game before the knife: riders, the mastery gradient, forward-reaching consequences, the dramaturg, the whole Renaissance apparatus at its most elaborate. The reference the cut was measured against.' },
  { v: 'v6.0', href: '../v6/', title: 'Preparation: the Renaissance magi',
    blurb: 'The roster becomes fifteen Renaissance magi, each a capability package rather than a bespoke power. A town that remembers, Providence that leans the world toward a destiny you write, Divination that sells the next descent’s demands.' },
  { v: 'v4.2', href: '../v4/', title: 'Lock, key, muster and depth',
    blurb: 'Wings sealed behind doors; the muster where you assign kit and name your party; multi-floor dungeons joined by stairs; positional combat priced by room shape; two attrition clocks; a saga that saves and continues.' },
  { v: 'v3.0', href: '../v3/', title: 'Integration',
    blurb: 'Theme-tinted worlds, readable enemies with nature badges and prose tells, element chips on draft cards, element-coloured spell FX, the deeper-systems guide.' },
  { v: 'v2.0', href: '../v2/', title: 'Systems',
    blurb: 'Branching dungeons with secret vaults, eight themes, the Bestiary, trap types, treasure finds, the Archive and card editor, the Card Workshop.' },
  { v: 'v1.0', href: '../v1/', title: 'First public release',
    blurb: 'The original draft → delve → town campaign loop, with onscreen help.' },
];

/**
 * The documentation, grouped. Only files that read well to an outsider
 * are published; each pairs a file with a human title. A `…PROPOSAL`
 * file is attached to its problem file as a sibling rather than listed
 * separately, so the browser can show "the problem, then the proposal".
 */
const GROUPS = [
  {
    group: 'Design',
    blurb: 'What the game is, and the argument for why it is that way.',
    docs: [
      ['DESIGN.md', 'The design'],
      ['DESIGN_DIALOGUE.md', 'Design dialogue — why things are the way they are'],
      ['CUTPROPOSAL.md', 'The cut proposal, and what it became'],
      ['DUNGEON_CANON.md', 'Dungeon canon'],
      ['THEME_DESIGNS.md', 'Theme designs'],
    ],
  },
  {
    group: 'The trouble log',
    blurb: 'Kept live rather than written up at the end. Each has a sister proposal with ranked options.',
    docs: [
      ['BUGS.md', 'Bugs — things that do the wrong thing', 'BUGSPROPOSAL.md'],
      ['PROBLEMS.md', 'Problems — unfinished, with status', 'PROBLEMSPROPOSAL.md'],
      ['PERPLEXITIES.md', 'Perplexities — open questions', 'PERPLEXITIESPROPOSAL.md'],
      ['BALANCEISSUES.md', 'Balance issues — measured numbers', 'BALANCEISSUESPROPOSAL.md'],
      ['SIMULATIONFINDINGS.md', 'Simulation findings', 'SIMULATIONFINDINGSPROPOSAL.md'],
      ['DRAMATURGISSUES.md', 'Dramaturg issues — defects in the critic', 'DRAMATURGISSUESPROPOSAL.md'],
      ['CONTENTREACH.md', 'Content reach — what players actually meet', 'CONTENTREACHPROPOSAL.md'],
      ['ROUGHEDGES.md', 'Rough edges — papercuts and traps', 'ROUGHEDGESPROPOSAL.md'],
    ],
  },
  {
    group: 'Architecture & method',
    blurb: 'How it fits together, what must agree with what, and how to measure without fooling yourself.',
    docs: [
      ['ARCHITECTURE.md', 'Architecture — the seams', 'ARCHITECTUREPROPOSAL.md'],
      ['DATACONTRACTS.md', 'Data contracts — the syncs nobody enforces', 'DATACONTRACTSPROPOSAL.md'],
      ['MEASUREMENT.md', 'Measurement — how not to fool yourself', 'MEASUREMENTPROPOSAL.md'],
      ['GRAPHICS.md', 'Graphics — the renderer, measured, and what it would take'],
    ],
  },
  {
    group: 'Reports & readings',
    blurb: 'What running it thousands of times, and reading the results, taught.',
    docs: [
      ['MINING_REPORT.md', 'Mining report — the measured benchmark'],
      ['ASSET_REVIEW.md', 'Asset review'],
      ['READING_SAMPLE.md', 'A reading sample — five delves, read as a reader'],
    ],
  },
  {
    group: 'Process',
    blurb: 'The working record: how the project is run, deployed, and handed off.',
    docs: [
      ['README.md', 'Readme'],
      ['DEPLOY_STATE.md', 'Deploy state'],
      ['HANDOFF_V6_TO_V7.md', 'Handoff: v6 to v7'],
      ['ROGUELIKE_ROADMAP.md', 'Roguelike roadmap'],
      ['RESEARCH_BRIEF.md', 'Research brief'],
    ],
  },
];

function main() {
  fs.rmSync(DOCS_OUT, { recursive: true, force: true });
  fs.mkdirSync(DOCS_OUT, { recursive: true });

  const manifestGroups = [];
  let copied = 0;
  const copy = (file) => {
    const src = path.join(ROOT, file);
    if (!fs.existsSync(src)) { console.warn('  missing:', file); return false; }
    fs.copyFileSync(src, path.join(DOCS_OUT, file));
    copied++;
    return true;
  };

  for (const g of GROUPS) {
    const docs = [];
    for (const [file, title, proposal] of g.docs) {
      if (!copy(file)) continue;
      const entry = { file, title };
      if (proposal && copy(proposal)) entry.proposal = proposal;
      docs.push(entry);
    }
    manifestGroups.push({ group: g.group, blurb: g.blurb, docs });
  }

  const manifest = {
    generated: new Date().toISOString(),
    versions: VERSIONS,
    groups: manifestGroups,
    corpus: { href: '../logs/', title: 'The transcript corpus', blurb: '120 simulated delves, each reproducible from its seed, read against the house poetics.' },
  };
  fs.writeFileSync(path.join(DOCS_OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`Hub built: ${copied} docs copied to src/public/docs/, manifest written.`);
  console.log(`${VERSIONS.length} versions, ${manifestGroups.reduce((s, g) => s + g.docs.length, 0)} doc entries.`);
}

main();
