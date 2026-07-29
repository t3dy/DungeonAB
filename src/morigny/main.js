/**
 * MORIGNY — slice controller: one seeded day in the codex, driven by the
 * command alphabet (morigny/COMMANDS.md). Engine is pure and tested; this
 * file is presentation, keyboard dispatch, and flow.
 */

import {
  createJohn, pressureTier, isScrupulous,
  addFatigue, addResolve, addSuspicion, addPressure, addDespair,
} from './engine/state.js';
import { buildDay, stageRng } from './engine/day.js';
import { createRecitation } from './engine/recitation.js';
import { nightThreatens, resolveNight } from './engine/struggle.js';
import { dreamEligible, createVision, judge, reckonCorruption } from './engine/vision.js';
import { COMMANDS, LETTERS, NIGHT_KEYS } from './engine/commands.js';
import { confess } from './engine/struggle.js';
import { HOURS } from './data/hours.js';
import {
  HOUR_TEXT, VERSICLE, PROCEDURE_PRAYER, COMPLINE_PRAYER, DISTRACTIONS,
  TIER_TEXT, NIGHT_CHOICES, NIGHT_OUTCOMES, CONFESSION, VISION_SCENE,
  DREAM_SHUT, DISCERNMENT_OUTCOMES, PENCIL_NOTES, BIBLIO, DAYLIGHT, CONTENT_NOTE,
  JOURNEY, DRUGGED_DREAM, RADICAL_NOTE,
} from './content/content.js';
import {
  MAPS, createWorld, move, keepOffice, missedOffices, adjacentNpc, npcAt, tileAt,
} from './engine/world.js';
import { startTalk, ask, knownKeywords } from './engine/talk.js';
import { NPCS } from './data/npcs.js';
import { SIGNPOST_TEXT } from './data/worldmap.js';
import { TILE, PAINTERS, paintFigure, paintNpc } from './ui/tiles.js';

const $ = id => document.getElementById(id);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

function provenance(record) {
  const bits = (record.sources ?? [])
    .map(s => `${s.work}${s.locus ? `, ${s.locus}` : ''}`)
    .join('; ');
  return `[${record.status}${bits ? ` — ${bits}` : ''}]`;
}

function passage(record, text = record.body) {
  const p = el('p', null, text);
  p.appendChild(el('span', 'provenance', provenance(record)));
  return p;
}

// ── message scroll ────────────────────────────────────────────
function log(text, cls) {
  const line = el('div', cls, text);
  $('log').appendChild(line);
  $('log').scrollTop = $('log').scrollHeight;
}

// ── keyboard dispatch ─────────────────────────────────────────
// sceneKeys: letters live for the current scene. globalKeys: always live.
let sceneKeys = {};
let prompt = null; // sub-prompt override: {text, keys:{K:fn}}

function setKeys(map) {
  sceneKeys = map;
  renderCommands();
}

function act(letter, label, why, fn) {
  sceneKeys[letter] = fn;
  const b = el('button');
  b.appendChild(el('span', null, `${letter} — ${label}`));
  if (why) b.appendChild(el('span', 'why', why));
  b.onclick = fn;
  $('choices').appendChild(b);
  renderCommands();
  return b;
}

function clearActs() {
  sceneKeys = {};
  $('choices').replaceChildren();
  renderCommands();
}

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target?.tagName === 'INPUT') return; // the Talk line owns its keys
  if (worldCtl && e.key.startsWith('Arrow')) {
    e.preventDefault();
    const d = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
    if (d) worldCtl.step(d[0], d[1]);
    return;
  }
  const letter = e.key.length === 1 ? e.key.toUpperCase() : e.key;
  if (prompt) {
    const fn = prompt.keys[letter];
    if (fn) { prompt = null; fn(); }
    return;
  }
  if (sceneKeys[letter]) return void sceneKeys[letter]();
  if (globalKeys[letter]) {
    // soul-verbs need a living run; before Matins the book only waits
    if (!john && letter !== 'Q') {
      return log('The book lies open at its first leaf. Begin, and the alphabet will live.', 'refused');
    }
    return void globalKeys[letter]();
  }
  if (COMMANDS[letter]) log(`${COMMANDS[letter].verb} — ${COMMANDS[letter].refusal}`, 'refused');
});

function subPrompt(text, keys) {
  prompt = { text, keys };
  log(text, 'bell');
}

// ── sidebar ───────────────────────────────────────────────────
const pips = (v, max) => '●'.repeat(v) + '○'.repeat(max - v);

function renderStatus() {
  if (!john) return;
  const s = $('status');
  s.replaceChildren(el('h3', null, 'zelus animae'));
  const rows = [
    ['fatigue', pips(john.fatigue, 10)],
    ['resolve', pips(john.resolve, 5)],
    ['pressure', pips(john.pressure, 10)],
    ['despair', pips(john.despair, 5)],
    ['suspicion', pips(john.suspicion, 10)],
  ];
  for (const [k, v] of rows) {
    const row = el('div', 'stat');
    row.appendChild(el('span', null, k));
    row.appendChild(el('span', 'pips', v));
    s.appendChild(row);
  }
  if (john.purity.polluted) s.appendChild(el('div', 'flag bad', 'unclean — the Work is shut'));
  if (isScrupulous(john)) s.appendChild(el('div', 'flag bad', 'scrupulous — holding fast costs double'));
  if (john.procedure.licentia) s.appendChild(el('div', 'flag gold', 'LICENTIA'));
  $('tier').textContent = pressureTier(john.pressure).toLowerCase();
}

function renderCommands() {
  const c = $('commands');
  c.replaceChildren(el('h3', null, 'the alphabet'));
  for (const letter of LETTERS) {
    const live = !!(sceneKeys[letter] || globalKeys[letter]);
    const d = el('div', `cmd${live ? ' live' : ''}`);
    d.appendChild(el('span', 'key', letter));
    d.appendChild(el('span', null, COMMANDS[letter].verb));
    c.appendChild(d);
  }
}

// ── always-on verbs ───────────────────────────────────────────
let stageFlags = {}; // per-stage once-limits (K, X)

const globalKeys = {
  L: () => log(currentLook || COMMANDS.L.refusal),
  Z: () => {
    log(`Fatigue ${john.fatigue}/10 · Resolve ${john.resolve}/5 · Pressure ${john.pressure}/10 ` +
      `· Despair ${john.despair}/5 · Suspicion ${john.suspicion}/10 · ` +
      `${john.purity.polluted ? 'unclean' : 'clean'} · prayer ${john.procedure.prayed ? john.procedure.quality : 'unsaid'}`);
  },
  K: () => {
    if (stageFlags.knelt) return log(COMMANDS.K.refusal, 'refused');
    stageFlags.knelt = true;
    addPressure(john, -1);
    log('You kneel where you are. A little of the weight sets itself down.');
    renderStatus();
  },
  X: () => {
    stageFlags.crossed = (stageFlags.crossed ?? 0) + 1;
    if (stageFlags.crossed === 1) {
      addPressure(john, -1);
      log('You make the sign of the cross, once, and mean it.');
    } else if (stageFlags.crossed === 2) {
      log(COMMANDS.X.refusal, 'refused');
    } else {
      addDespair(john, 1);
      log('Again the sign, and again — and each repetition believes itself less. The wheel turns.', 'refused');
    }
    renderStatus();
  },
  N: () => {
    addPressure(john, 1);
    log('You let the old wheels turn behind your eyes: notae, nested and shining. You know things a monk of Morigny should not. The knowing has a rent, and it is now due.');
    renderStatus();
  },
  Q: () => {
    if (journal) saveWitness();
    log('The book is closed. The witness is saved, such as it is.', 'bell');
    incipit();
  },
};

// ── run state ─────────────────────────────────────────────────
let john, day, stageIdx, journal, currentLook = '';
let worldCtl = null; // live only during the world stage (arrow keys)

function start(seed, opts = {}) {
  john = createJohn();
  day = buildDay(seed, opts);
  stageIdx = 0;
  journal = {
    seed, journey: !!opts.journey,
    prayed: false, night: null, dream: null, confession: null,
    officesKept: null, talked: [],
  };
  $('footnotes').replaceChildren();
  log(`— A new witness begins. seed: ${seed}${opts.journey ? ' · a road day' : ''} —`, 'bell');
  runStage();
}

function next() {
  stageIdx++;
  runStage();
}

function runStage() {
  const stage = day.stages[stageIdx];
  if (!stage) return;
  stageFlags = {};
  renderStatus();
  const handlers = {
    'office-full': officeFull, 'office-brief': officeBrief, chapter,
    daylight, world: worldStage, night, dream, reckoning,
  };
  if (stage.kind !== 'world') worldCtl = null;
  handlers[stage.kind](stage);
}

const ui = {
  setHour(name) { $('hour-name').textContent = name; log(`✝ ${name}`, 'bell'); },
  scene({ rubric = '', verso = '' } = {}) {
    $('rubric').textContent = rubric;
    $('verso-body').textContent = verso;
    $('body').replaceChildren();
    $('verse').replaceChildren();
    $('margin').replaceChildren();
    clearActs();
    currentLook = verso || rubric;
  },
  body(node) { $('body').appendChild(node); },
  margin(node) { $('margin').appendChild(node); },
  footnote(note) {
    const d = el('div', 'pencil-note', note.text);
    for (const c of note.cites ?? []) d.appendChild(el('cite', null, BIBLIO[c]));
    $('footnotes').appendChild(d);
  },
};

// ── stages ────────────────────────────────────────────────────

function officeBrief(stage) {
  const hour = HOURS.find(h => h.id === stage.hourId);
  const text = HOUR_TEXT[stage.hourId];
  ui.setHour(hour.names[0]);
  ui.scene({ rubric: text.rubric, verso: TIER_TEXT[pressureTier(john.pressure)] });
  ui.body(passage(text));
  addFatigue(john, hour.sim.fatigueCost);
  renderStatus();
  act('B', 'Let the bell carry the day onward.', '', next);
}

function officeFull(stage) {
  const hour = HOURS.find(h => h.id === stage.hourId);
  const text = HOUR_TEXT[stage.hourId];
  ui.setHour(hour.names[0]);
  ui.scene({ rubric: text.rubric, verso: TIER_TEXT[pressureTier(john.pressure)] });
  ui.body(passage(text));
  addFatigue(john, hour.sim.fatigueCost);
  renderStatus();

  if (stage.procedureSlot) {
    act('O', 'Obey: say the office only.', 'The Rule asks nothing else of you.', () =>
      recite(stage, [VERSICLE.latin, VERSICLE.english], false));
    act('P', 'Pray the Work — the office, and within it, the first prayer.',
      'If it is scattered, it is nothing; and the night will ask about it.', () =>
      recite(stage, [VERSICLE.latin, ...PROCEDURE_PRAYER.verses], true));
  } else {
    recite(stage, COMPLINE_PRAYER.verses, false);
  }
}

function recite(stage, verses, isProcedure) {
  clearActs();
  const rng = stageRng(day, stage.id);
  const rec = createRecitation(rng, john, { verses, pool: DISTRACTIONS });
  const verseBox = $('verse');

  const step = () => {
    verseBox.replaceChildren();
    renderStatus();
    if (rec.done) return finish();
    if (!rec.pending) rec.advance();

    if (rec.pending) {
      const d = rec.pending;
      const gloss = el('div', `gloss ${d.kind}`, d.text);
      gloss.appendChild(el('span', 'provenance', provenance(d)));
      ui.margin(gloss);
      log('Something pulls at the edge of the page.', 'refused');
      clearActs();
      if (rec.canHoldFast()) {
        act('H', 'Hold fast to the text.',
          `Costs ${rec.holdFastCost()} resolve (you have ${john.resolve}).`,
          () => { rec.holdFast(); step(); });
      }
      act('E', 'Examine it. Attend.', 'The verse is lost; the margin gets its hearing.',
        () => {
          const record = rec.attend();
          if (record.kind === 'pencil') log(record.text, 'pencil-log');
          step();
        });
      return;
    }

    verseBox.appendChild(el('div', 'latin', verses[Math.min(rec.verse, verses.length - 1)]));
    verseBox.appendChild(el('div', 'said', `verse ${rec.verse} of ${verses.length}`));
    const filler = el('span', 'line-filler');
    filler.style.setProperty('--fill', `${(rec.verse / verses.length) * 100}%`);
    verseBox.appendChild(filler);
    clearActs();
    act('O', rec.verse >= verses.length - 1 ? 'Finish the prayer.' : 'The next verse.', '', step);
  };

  const finish = () => {
    const grade = rec.grade();
    if (isProcedure) {
      john.procedure.prayed = grade !== 'scattered';
      john.procedure.quality = grade;
      journal.prayed = john.procedure.prayed;
    }
    if (grade === 'scattered' && stage.hourId !== 'compline') {
      addSuspicion(john, 1);
      log('Your absence from your own mouth was noticed.', 'refused');
    }
    log(`The recitation was ${grade}.`);
    verseBox.replaceChildren(el('div', 'said',
      `The recitation was ${grade}.` +
      (isProcedure && !john.procedure.prayed ? ' The Work’s prayer did not hold.' : '')));
    clearActs();
    act('B', 'So ends the hour.', '', next);
  };

  step();
}

function chapter(stage) {
  const text = HOUR_TEXT[stage.hourId];
  ui.setHour('Prime · Chapter');
  ui.scene({ rubric: text.rubric, verso: TIER_TEXT[pressureTier(john.pressure)] });
  ui.body(passage(text));
  const env = { sources: CONFESSION_SOURCES, status: 'adapted' };

  const say = (textStr, after) => {
    ui.body(passage({ ...env, body: textStr }, textStr));
    clearActs();
    act('B', after, '', next);
  };

  if (john.purity.polluted) {
    ui.body(passage({ ...env }, CONFESSION.offerPolluted));
    act('C', 'Confess it, plainly.', 'The saying aloud is the whole medicine and the whole price.', () => {
      confess(john, 'confess'); journal.confession = 'confess'; renderStatus();
      say(CONFESSION.confess, 'Go out to the day.');
    });
    act('B', 'Say nothing. Not today.', 'The Work stays shut, and the fault rides along.', () => {
      confess(john, 'delay'); journal.confession = 'delay'; renderStatus();
      say(CONFESSION.delay, 'Go out to the day.');
    });
  } else {
    ui.body(passage({ ...env }, CONFESSION.offerClean));
    act('B', 'You have nothing grave to say. Keep silence.', '', next);
    act('C', 'Confess anyway. Everything. Be safe.', 'The scrupulous wheel turns.', () => {
      confess(john, 'scruple'); journal.confession = 'scruple'; renderStatus();
      say(CONFESSION.scruple, 'Go out to the day, smaller.');
    });
  }
}

const CONFESSION_SOURCES = [
  { work: 'Fanger, Rewriting Magic', locus: 'scrupulosity (frame; verify loci)' },
];

function daylight() {
  ui.setHour('Terce · Sext · None');
  ui.scene({ rubric: DAYLIGHT.rubric, verso: TIER_TEXT[pressureTier(john.pressure)] });
  ui.body(passage(DAYLIGHT, DAYLIGHT.body));
  act('S', 'Scribe: keep to the assigned copying.', 'Obedience is a wall, and walls also shelter.', () => {
    addResolve(john, 1); renderStatus();
    ui.body(passage(DAYLIGHT, DAYLIGHT.results.labor));
    clearActs();
    act('B', 'To Vespers.', '', next);
  });
  act('I', 'Illuminate: steal the hour for the Work.', 'Suspicion is a slow reader, but it reads.', () => {
    addSuspicion(john, 1); addPressure(john, 1); renderStatus();
    ui.body(passage(DAYLIGHT, DAYLIGHT.results.lectio));
    clearActs();
    act('B', 'To Vespers.', '', next);
  });
}

// ── the world stage (journey day) ────────────────────────────
const VIEW_W = 15, VIEW_H = 11;
let talkOpen = false;

function worldStage() {
  ui.setHour('The Road');
  ui.scene({ rubric: JOURNEY.depart.rubric, verso: '' });
  ui.body(passage(JOURNEY.depart));
  ui.body(el('p', 'said',
    'Walk with the arrow keys. T talks to a neighbor; K keeps a rung hour where you stand; ' +
    'the abbey door ends the day’s wandering.'));

  const world = createWorld();
  const canvas = el('canvas', 'worldmap');
  canvas.width = VIEW_W * TILE;
  canvas.height = VIEW_H * TILE;
  $('verso-body').replaceChildren(canvas);
  const ctx = canvas.getContext('2d');

  const render = () => {
    const ox = world.x - Math.floor(VIEW_W / 2);
    const oy = world.y - Math.floor(VIEW_H / 2);
    ctx.fillStyle = '#22201b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let vy = 0; vy < VIEW_H; vy++) {
      for (let vx = 0; vx < VIEW_W; vx++) {
        const t = tileAt(world.mapId, ox + vx, oy + vy);
        if (t === null) continue;
        (PAINTERS[t] ?? PAINTERS['.'])(ctx, vx * TILE, vy * TILE);
        if (npcAt(world.mapId, ox + vx, oy + vy)) paintNpc(ctx, vx * TILE, vy * TILE);
      }
    }
    paintFigure(ctx, Math.floor(VIEW_W / 2) * TILE, Math.floor(VIEW_H / 2) * TILE);
  };

  const endStage = () => {
    worldCtl = null;
    const missed = missedOffices(world);
    journal.officesKept = world.kept.length;
    for (const _ of missed) addPressure(john, 1);
    if (missed.length) log(JOURNEY.officeMissedLine, 'refused');
    renderStatus();
    next();
  };

  worldCtl = {
    world,
    step(dx, dy) {
      if (talkOpen) return;
      const ev = move(world, dx, dy);
      if (ev.sign) log(SIGNPOST_TEXT);
      if (ev.blocked) log(JOURNEY.blocked[world.steps % JOURNEY.blocked.length], 'refused');
      if (ev.bell) {
        const name = ev.bell[0].toUpperCase() + ev.bell.slice(1);
        log(`✝ The hour of ${name} rings in you. (K to keep it where you stand.)`, 'bell');
      }
      if (ev.enter === 'etampes') {
        log('You pass under the gate of Étampes. The town smells of tallow, mud, and argument.', 'bell');
      }
      if (ev.exitTown) log('The gate lets you out with less ceremony than it let you in.');
      if (ev.enter === 'abbey') {
        log('The abbey takes you back like a breath drawn in.', 'bell');
        return endStage();
      }
      render();
    },
  };

  sceneKeys.T = () => {
    const npc = adjacentNpc(world);
    if (!npc) return log(COMMANDS.T.refusal, 'refused');
    openTalk(npc);
  };
  sceneKeys.K = () => {
    const kept = keepOffice(world);
    if (!kept) return log('No hour stands rung and unkept.', 'refused');
    addPressure(john, -1);
    if (kept.inTown) {
      addSuspicion(john, 1);
      log(JOURNEY.officeTown.text);
    } else {
      log(JOURNEY.officeWild.text);
    }
    renderStatus();
  };
  renderCommands();
  render();
}

function openTalk(npc) {
  talkOpen = true;
  if (!journal.talked.includes(npc.id)) journal.talked.push(npc.id);
  const convo = startTalk(npc);
  log(`You speak with ${npc.label}.`, 'bell');
  log(npc.greeting);

  const input = el('input');
  input.type = 'text';
  input.placeholder = 'ask a word… (name, job, bye)';
  input.className = 'talk-input';
  $('choices').appendChild(input);
  input.focus();

  const finish = () => {
    talkOpen = false;
    input.remove();
    log('You part ways.', 'bell');
  };

  input.addEventListener('keydown', e => {
    e.stopPropagation();
    if (e.key === 'Escape') return finish();
    if (e.key !== 'Enter') return;
    const word = input.value;
    input.value = '';
    log(`» ${word.trim().toLowerCase()}`);
    const res = ask(convo, word);
    log(res.text);
    if (res.unlocked.length) log(`(you might ask: ${res.unlocked.join(', ')})`, 'pencil-log');
    if (res.effect) applyTalkEffect(res.effect);
    if (res.ended) finish();
    else input.placeholder = `ask… (${knownKeywords(convo).join(', ')})`;
  });
}

function applyTalkEffect(effect) {
  switch (effect) {
    case 'give-draught':
      john.items.draught++;
      log('(The poppy draught is in your scrip. U, on a bad night — at a price.)', 'pencil-log');
      break;
    case 'give-quire':
      john.items.quire++;
      log('(A ruled quire, wrapped. The Work has paper now.)', 'pencil-log');
      break;
    case 'suspicion':
      addSuspicion(john, 1);
      break;
    case 'lie':
      addPressure(john, 1);
      break;
    case 'honesty':
      addSuspicion(john, 1);
      addDespair(john, -1);
      break;
    case 'alms':
      addDespair(john, -1);
      break;
    case 'radical':
      john.disposition++;
      addSuspicion(john, 2);
      log('The pencil hand writes small and fast in the margin.', 'pencil-log');
      ui.footnote(RADICAL_NOTE);
      break;
  }
  renderStatus();
}

function night(stage) {
  ui.setHour('The Dormitory');
  const tier = pressureTier(john.pressure);
  ui.scene({ rubric: '¶ Of the night.', verso: TIER_TEXT[tier] });
  ui.body(passage({ sources: [], status: 'invented' }, TIER_TEXT[tier]));

  const sleep = () => { addFatigue(john, -3); next(); };

  if (john.items.draught > 0) {
    act('U', 'Use the poppy draught.',
      'It shutters the house of the mind entire — no siege, and no visitors. None at all.', () => {
        john.items.draught--;
        addPressure(john, -3);
        journal.night = { outcome: 'drugged' };
        renderStatus();
        clearActs();
        act('R', 'Sink into it.', '', () => { addFatigue(john, -4); next(); });
      });
  }

  if (!nightThreatens(john)) {
    journal.night = { outcome: 'quiet' };
    act('R', 'Rest, while sleep is simple.', '', sleep);
    return;
  }

  const rng = stageRng(day, stage.id);
  const settle = result => {
    journal.night = result;
    ui.body(passage({ sources: [], status: 'invented' },
      NIGHT_OUTCOMES[result.verb]?.[result.outcome] ?? NIGHT_OUTCOMES.endure.lapse));
    renderStatus();
    clearActs();
    act('R', 'Let the rest of the night pass.', '', sleep);
  };

  for (const [key, verb] of Object.entries(NIGHT_KEYS)) {
    act(key, NIGHT_CHOICES[verb], '', () => settle(resolveNight(rng, john, verb)));
  }
  act('Y', 'Yield.', 'The game will not choose this for you. Exhaustion argues.', () => {
    john.purity.polluted = true;
    john.purity.confessed = false;
    john.pressure = 2;
    addDespair(john, 1);
    settle({ verb: 'endure', outcome: 'lapse' });
  });
}

function dream(stage) {
  ui.setHour('The Dream');
  if (journal.night?.outcome === 'drugged') {
    ui.scene({ rubric: DRUGGED_DREAM.rubric, verso: '' });
    ui.body(passage(DRUGGED_DREAM));
    journal.dream = 'drugged';
    act('B', 'Toward Matins, and the reckoning.', '', next);
    return;
  }
  if (!dreamEligible(john)) {
    ui.scene({ rubric: DREAM_SHUT.rubric, verso: '' });
    ui.body(passage(DREAM_SHUT));
    journal.dream = 'shut';
    act('B', 'Toward Matins, and the reckoning.', '', next);
    return;
  }
  const rng = stageRng(day, stage.id);
  const vision = createVision(rng);
  ui.scene({ rubric: VISION_SCENE.rubric, verso: '' });
  ui.body(passage(VISION_SCENE));
  for (const tell of vision.tells) {
    const p = el('p', 'ultramarine', tell.text);
    p.appendChild(el('span', 'provenance', `[tell: ${tell.category}${tell.ambiguous ? ' — ambiguous' : ''}]`));
    ui.body(p);
  }
  const outcome = key => {
    journal.dream = key;
    ui.body(el('p', key === 'licentia' ? 'gold' : null, DISCERNMENT_OUTCOMES[key]));
    renderStatus();
    clearActs();
    act('B', 'Toward Matins, and the reckoning.', '', next);
  };
  act('D', 'Discern the visitation.', 'Everything now depends on reading the marks right.', () => {
    subPrompt('Judge: of God (G), or make the Cross against it (X)?', {
      G: () => outcome(judge(john, vision, true)),
      X: () => outcome(judge(john, vision, false)),
    });
  });
  act('E', 'Examine the tells once more.', '', () => {
    for (const t of vision.tells) log(`${t.category}: ${t.ambiguous ? '(ambiguous) ' : ''}${t.text}`);
  });
}

function reckoning() {
  ui.setHour('The Reckoning');
  ui.scene({ rubric: '¶ The examination of conscience, and the ledger of the day.', verso: '' });

  const corrupted = reckonCorruption(john);
  const lines = [
    `The Work's prayer: ${journal.prayed ? `said, ${john.procedure.quality}` : 'not said, or it did not hold'}.`,
    `The night: ${journal.night?.outcome ?? 'quiet'}.`,
    `Confession: ${journal.confession ?? 'no matter, no scruple'}.`,
    `The dream: ${journal.dream ?? 'none'}${john.procedure.licentia ? ' — LICENTIA' : ''}.`,
    corrupted ? 'And at the putting-on of weight, the beam spoke: the work was rotten. It must be begun again, and cleanly.' : null,
    journal.journey
      ? `The road: hours kept ${journal.officesKept ?? 0} of 3; souls spoken with, ${journal.talked.length}.`
      : null,
    john.disposition > 0
      ? `The witness leans. (Disposition +${john.disposition}. The pencil hand is watching.)`
      : null,
    `Suspicion in the house: ${john.suspicion} of 10. Despair: ${john.despair} of 5.`,
  ].filter(Boolean);

  const ul = el('ul', 'ledger');
  for (const l of lines) ul.appendChild(el('li', null, l));
  ui.body(ul);
  renderStatus();

  const notes = PENCIL_NOTES.filter(n =>
    (n.id !== 'note-invented-prayer' || journal.prayed) &&
    (n.id !== 'note-struggle' || journal.night?.outcome !== 'quiet') &&
    (n.id !== 'note-audit' || (journal.dream && journal.dream !== 'shut')));
  for (const n of notes) ui.footnote(n);

  saveWitness();
  act('J', 'Journal: write the day into the Liber.', 'He wrote it all down. That is why any of this exists.', () => {
    addDespair(john, -1); renderStatus();
    log('You write the day as it was, sparing no one, least of all yourself. The page holds it so you need not.', 'pencil-log');
    clearActs();
    act('B', 'Begin another day. (A new witness.)', '', () =>
      start(`${day.seed}-${Math.floor(Math.random() * 1e6)}`));
  });
  act('B', 'Begin another day. (A new witness.)', '', () =>
    start(`${day.seed}-${Math.floor(Math.random() * 1e6)}`));
}

function saveWitness() {
  try {
    const key = 'morigny-witnesses';
    const witnesses = JSON.parse(localStorage.getItem(key) ?? '[]');
    witnesses.push({
      ...journal,
      licentia: john.procedure.licentia,
      corrupt: john.procedure.corrupt,
      at: Date.now(),
    });
    localStorage.setItem(key, JSON.stringify(witnesses));
  } catch { /* storage unavailable: the witness is lost, as many were */ }
}

// ── incipit ──────────────────────────────────────────────────

$('pencil-toggle').onclick = () => {
  const off = document.body.classList.toggle('no-pencil');
  const b = $('pencil-toggle');
  b.textContent = `pencil layer: ${off ? 'off' : 'on'}`;
  b.setAttribute('aria-pressed', String(!off));
};

function incipit() {
  john = null; day = null; journal = null;
  ui.setHour('Incipit');
  ui.scene({ rubric: '¶ Here begins the book of the flowers of heavenly teaching.', verso: '' });
  ui.body(el('p', null,
    'MORIGNY — one day and one night in the life of Brother John, monk of Morigny, ' +
    'who practiced a forbidden art, repented of it, and rebuilt it in the Virgin’s name; ' +
    'and who wrote down his temptations so exactly that we can, seven centuries on, attempt this.'));
  ui.body(el('p', 'pencil-note', CONTENT_NOTE));
  const seed = `witness-${Math.floor(Math.random() * 1e6)}`;
  act('B', 'Begin at Matins — a day within the walls.', `seed: ${seed}`, () => start(seed));
  act('E', 'Begin at Matins — a road day: the errand to Étampes.',
    'The world, with witnesses. Arrow keys walk; T talks.', () => start(seed, { journey: true }));
  renderCommands();
}

incipit();
