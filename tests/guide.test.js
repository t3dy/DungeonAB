/**
 * Tests for GameGuide — onscreen help coverage and event detection.
 * The messaging is a product surface: every room type must explain
 * itself, and notable events must be caught between ticks.
 */

import { strict as assert } from 'assert';
import { ROOM_HELP, ROOM_TELL, CARD_TYPE_HELP, CONTROL_HELP, describeTickEvents } from '../src/ui/GameGuide.js';
import { lintLine } from '../src/narrative/Prose.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CARD_TYPES } from '../src/game/Cards.js';

describe('Help coverage', () => {
  test('every room type explains itself', () => {
    for (const type of Object.values(ROOM_TYPES)) {
      assert.ok(ROOM_HELP[type] && ROOM_HELP[type].length > 15, `${type} has help text`);
    }
  });

  test('every card type has a legend entry', () => {
    const covered = new Set(CARD_TYPE_HELP.map(h => h.type));
    for (const type of Object.values(CARD_TYPES)) {
      assert.ok(covered.has(type), `${type} is in the card legend`);
    }
  });

  test('the controls are all explained', () => {
    assert.ok(CONTROL_HELP.length >= 3);
    for (const c of CONTROL_HELP) {
      assert.ok(c.key && c.text.length > 10, `${c.key} is explained`);
    }
  });
});

// Minimal state snapshots shaped like Simulator.getState()
function stateWith({ members, gold = 0, spellsLearned = 0, room = 'corridor' }) {
  return {
    party: { members, gold, spellsLearned },
    narration: { room },
  };
}
const hero = (name, alive = true) => ({ name, alive });

describe('The first-visit tell', () => {
  test('every room type has one, and it fits on the screen', () => {
    for (const type of Object.values(ROOM_TYPES)) {
      const tell = ROOM_TELL[type];
      assert.ok(tell, `${type} has a tell`);
      const words = tell.trim().split(/\s+/).length;
      assert.ok(words <= 14, `${type}'s tell is a glance, not a paragraph (${words} words)`);
    }
  });

  test('a tell is shorter than the reference it stands in for', () => {
    // If the tell were as long as the help, moving it onto the map
    // would have solved nothing — which is the whole point of it.
    for (const type of Object.values(ROOM_TYPES)) {
      assert.ok(ROOM_TELL[type].length < ROOM_HELP[type].length,
        `${type}: the tell should be the short form`);
    }
  });

  test('the tells pass house style', () => {
    const findings = Object.entries(ROOM_TELL)
      .flatMap(([type, text]) => lintLine(text, { label: type }));
    assert.deepEqual(findings, [], findings.map(f => `${f.label}: ${f.why}`).join('\n'));
  });
});

describe('Event detection', () => {
  test('a null previous state yields no events (first tick is quiet)', () => {
    const curr = stateWith({ members: [hero('Brand')] });
    assert.deepEqual(describeTickEvents(null, curr), []);
  });

  test('a hero falling is reported by name', () => {
    const prev = stateWith({ members: [hero('Brand', true), hero('Vex', true)] });
    const curr = stateWith({ members: [hero('Brand', true), hero('Vex', false)] });
    const events = describeTickEvents(prev, curr);
    assert.equal(events.length, 1);
    assert.equal(events[0].kind, 'death');
    assert.ok(events[0].text.includes('Vex'));
  });

  test('the boss chamber announces itself once', () => {
    const before = stateWith({ members: [hero('Brand')], room: 'corridor' });
    const entering = stateWith({ members: [hero('Brand')], room: ROOM_TYPES.BOSS });
    const stillThere = stateWith({ members: [hero('Brand')], room: ROOM_TYPES.BOSS });

    assert.ok(describeTickEvents(before, entering).some(e => e.kind === 'boss'));
    assert.ok(!describeTickEvents(entering, stillThere).some(e => e.kind === 'boss'),
      'no repeat once already in the chamber');
  });

  test('a number the map already floats is not also said in words', () => {
    // The v4.4 division of labour: cues carry numbers (ui/Cues.js reads
    // them off the Chronicle diff), toasts carry what a number cannot.
    // Gold and the grimoire's count were being reported twice, which is
    // half of why a playtester called the game text-heavy.
    const base = [hero('Silin')];
    const events = describeTickEvents(
      stateWith({ members: base, gold: 0, spellsLearned: 0 }),
      stateWith({ members: base, gold: 400, spellsLearned: 3 }),
    );
    assert.deepEqual(events, [], 'a pure quantity is the cue layer\'s job');
  });

  test('several things can happen in one tick', () => {
    const prev = stateWith({ members: [hero('Brand'), hero('Vex')], gold: 0, spellsLearned: 0, room: 'corridor' });
    const curr = stateWith({ members: [hero('Brand'), hero('Vex', false)], gold: 30, spellsLearned: 1, room: ROOM_TYPES.BOSS });
    const kinds = describeTickEvents(prev, curr).map(e => e.kind);
    assert.ok(kinds.includes('death'));
    assert.ok(kinds.includes('boss'));
  });
});

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
    throw err;
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}
