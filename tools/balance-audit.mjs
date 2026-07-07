import { CHARACTER_CARDS, EQUIPMENT_CARDS, SPELL_CARDS, PERSONALITY_CARDS } from '../src/game/Cards.js';
import { Simulator } from '../src/sim/Simulator.js';

const N = 400;
const seeds = Array.from({ length: N }, (_, i) => `bal-${i}`);
const all = [...CHARACTER_CARDS, ...EQUIPMENT_CARDS, ...SPELL_CARDS, ...PERSONALITY_CARDS];
const by = id => all.find(c => c.id === id);

function evalPool(pool, diff) {
  let wins = 0, score = 0; const perSeed = [];
  for (const s of seeds) {
    const sim = new Simulator(pool.map(c => ({ ...c })), s, diff);
    let g = 0; while (!sim.gameOver && g++ < 200) sim.tick();
    wins += sim.victory ? 1 : 0; score += sim.party.score; perSeed.push(sim.victory ? 1 : 0);
  }
  return { win: wins / N, score: score / N, perSeed };
}

function report(title, base, cards, diff) {
  const baseR = evalPool(base, diff);
  console.log(`\n=== ${title} (base win ${(baseR.win * 100).toFixed(1)}%, score ${baseR.score.toFixed(0)}, ${diff}) ===`);
  const rows = cards.map(card => {
    const r = evalPool([...base, card], diff);
    const diffs = r.perSeed.map((w, i) => w - baseR.perSeed[i]);
    const mean = diffs.reduce((s, d) => s + d, 0) / N;
    return { id: card.id, cls: card.class || card.archetype || card.use || '', dWin: mean * 100, dScore: r.score - baseR.score };
  }).sort((a, b) => b.dWin - a.dWin);
  for (const r of rows) console.log(`${r.dWin >= 0 ? '+' : ''}${r.dWin.toFixed(1).padStart(5)}%  score ${r.dScore >= 0 ? '+' : ''}${r.dScore.toFixed(0).padStart(4)}  ${r.id.padEnd(24)} ${r.cls}`);
}

const CTX_A = ['char-brand', 'char-vex'].map(by);                                     // no cleric/wizard/alch
const CTX_B = [...CTX_A, by('sp-firebolt'), by('sp-frost'), by('sp-balm')];           // spells to carry
const FULL5 = ['char-brand', 'char-benedicta', 'char-vex', 'char-melchior', 'char-paracelsus'].map(by);

report('CHARACTERS on fighter+rogue core, no spells', CTX_A, CHARACTER_CARDS, 'medium');
report('CHARACTERS on fighter+rogue core + 3 spells', CTX_B, CHARACTER_CARDS, 'medium');
report('EQUIPMENT on 5-class party', FULL5, EQUIPMENT_CARDS, 'hard');
report('SPELLS on 5-class party', FULL5, SPELL_CARDS, 'hard');
report('PERSONALITIES on 5-class party', FULL5, PERSONALITY_CARDS, 'hard');
