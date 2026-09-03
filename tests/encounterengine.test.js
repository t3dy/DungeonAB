/**
 * The capability engine: an option exists where the party's
 * capabilities meet what the situation affords, and nowhere else.
 * This is the promise `Party.capabilities()` was written for.
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import { getRoomOptions, resolveRoomAction } from '../src/encounters/RoomEncounters.js';
import {
  getEncounter, getEncounterForRoom, evaluateOptions, roomAffordances, allEncounters,
  getEncounterTrace, clearEncounterTrace, capabilityUsageSummary,
} from '../src/encounters/EncounterEngine.js';
import '../src/encounters/Encounters.js';
import { CHARACTER_CARDS, SPELL_CARDS } from '../src/game/Cards.js';
import { ROOM_TYPES, generateDungeon, serializeDungeon, dungeonFromLayout } from '../src/world/DungeonGen.js';

const byId = id => CHARACTER_CARDS.find(c => c.id === id);
const sp = id => SPELL_CARDS.find(s => s.id === id);
const chamber = () => ({ type: ROOM_TYPES.SITUATION, encounterId: 'astronomers-chamber', cleared: false, w: 10, h: 9 });

describe('Every registered situation is well formed', () => {
  test('each has a title, a situation, and an option anyone can take', () => {
    for (const def of allEncounters()) {
      assert.ok(def.title, `${def.id} needs a title`);
      assert.ok(def.situation, `${def.id} needs a situation`);
      assert.ok(def.options.some(o => (o.requires || []).length === 0),
        `${def.id} must be answerable by a party with no relevant capability`);
      assert.ok(typeof def.resolveOption === 'function', `${def.id} needs a resolver`);
    }
  });

  test('every option a situation can offer actually resolves', () => {
    for (const def of allEncounters().filter(d => d.category !== 'town')) {
      for (const opt of def.options) {
        const party = new Party([byId('char-dee')]);
        const result = def.resolveOption(opt.id, party, chamber());
        assert.ok(result && typeof result.narrative === 'string',
          `${def.id}/${opt.id} must return a narrative`);
      }
    }
  });
});

describe('Routing', () => {
  test('a stamped room is governed by its definition', () => {
    assert.equal(getEncounterForRoom(chamber())?.id, 'astronomers-chamber');
  });

  test('an ordinary room is not', () => {
    assert.equal(getEncounterForRoom({ type: ROOM_TYPES.LIBRARY }), null);
  });
});

describe('Affordances', () => {
  test('a definition contributes its own', () => {
    const set = roomAffordances(chamber(), getEncounter('astronomers-chamber'));
    assert.ok(set.has('mechanism'));
    assert.ok(set.has('astral'));
  });

  test('a monster payload implies its own', () => {
    const set = roomAffordances({ type: ROOM_TYPES.MONSTER, monster: { undead: true, bribable: true } });
    assert.ok(set.has('undead'));
    assert.ok(set.has('people'));
  });
});

describe('Capabilities open options, and their absence closes them', () => {
  test('what Brahe can attempt, and what he cannot', () => {
    const brahe = new Party([byId('char-brahe')]);   // astrology, observation, tinkering
    const ids = getRoomOptions(chamber(), brahe).map(o => o.id);
    assert.ok(ids.includes('repair-gears'), 'tinkering repairs it');
    assert.ok(ids.includes('correct-orrery'), 'astronomy corrects it');
    // He is no diviner — but an astronomer with an eye and a sense of
    // direction holds two of divination's neighbours, so he may attempt
    // it and the result is graded down for improvising
    // (game/Capabilities.js AFFINITIES, EncounterEngine MASTERY).
    const divine = getRoomOptions(chamber(), brahe).find(o => o.id === 'divine-instability');
    assert.ok(divine, 'adjacent disciplines may attempt it');
    assert.ok(divine.improvised, 'and the engine knows he is improvising');
    const proper = getRoomOptions(chamber(), brahe).find(o => o.id === 'correct-orrery');
    assert.ok(!proper.improvised, 'where the orrery is his own discipline');
    assert.ok(ids.includes('hurry-through'), 'the blunt option is always there');
  });

  test('a lone magus of the wrong discipline gets only what adjacency lends', () => {
    // v8.1: at twelve densely-connected capabilities, few magi are shut
    // out entirely — but a magus whose disciplines only *neighbour* the
    // orrery gets exactly the improvised options, never the proper ones.
    // Ficino (correspondence/medicine/conjuring) reaches recognize-model
    // through correspondence→scholarship, and nothing else.
    const opts = getRoomOptions(chamber(), new Party([byId('char-ficino')]));
    const nonBlunt = opts.filter(o => o.id !== 'hurry-through');
    assert.ok(nonBlunt.length >= 1, 'adjacency lends at least one attempt');
    assert.ok(nonBlunt.every(o => o.improvised),
      'but every one of them is improvised — no proper answer');
  });

  test('a drafted spell can open an option no member could', () => {
    // Napier is astrology/warcraft/tinkering — no divination, and none
    // of its neighbours either, so divine-instability is shut to him.
    const bare = getRoomOptions(chamber(), new Party([byId('char-napier')])).map(o => o.id);
    assert.ok(!bare.includes('divine-instability'), 'no divination in reach');
    const party = new Party([byId('char-napier'), sp('sp-eyes')]);
    const ids = getRoomOptions(chamber(), party).map(o => o.id);
    assert.ok(ids.includes('divine-instability'), 'Eyes of the Mouse carries divination');
  });

  test('an option records which capability unlocked it, and who holds it', () => {
    const party = new Party([byId('char-brahe')]);
    const repair = getRoomOptions(chamber(), party).find(o => o.id === 'repair-gears');
    assert.equal(repair.unlockedBy[0].capability, 'tinkering');
    assert.ok(repair.unlockedBy[0].holders.some(h => h.includes('Brahe')));
  });

  test('two different parties meet two different rooms', () => {
    const a = getRoomOptions(chamber(), new Party([byId('char-brahe')])).map(o => o.id).sort();
    const b = getRoomOptions(chamber(), new Party([byId('char-dee')])).map(o => o.id).sort();
    assert.notDeepEqual(a, b, 'the situation is the same; the decision space is not');
  });
});

describe('Consequences reach past the room', () => {
  test('correcting the orrery wards the next fight', () => {
    const party = new Party([byId('char-dee')]);
    resolveRoomAction(chamber(), party, 'correct-orrery');
    assert.equal(party.starBlessed, true);
  });

  test('divining the instability forewarns the party', () => {
    const party = new Party([byId('char-dee')]);
    resolveRoomAction(chamber(), party, 'divine-instability');
    assert.equal(party.forewarned, true);
  });

  test('repairing the gears pays', () => {
    const party = new Party([byId('char-brahe')]);
    const before = party.gold;
    resolveRoomAction(chamber(), party, 'repair-gears');
    assert.ok(party.gold > before, 'the stripped pinion sells');
  });

  test('the blunt option costs health', () => {
    const party = new Party([byId('char-ficino')]);
    const before = party.totalHealth();
    const result = resolveRoomAction(chamber(), party, 'hurry-through');
    assert.equal(result.success, false);
    assert.ok(party.totalHealth() < before);
  });
});

describe('The debug trace answers the balancing question', () => {
  test('it records what unlocked what, why options were hidden, and what was taken', () => {
    clearEncounterTrace();
    const party = new Party([byId('char-brahe')]);
    const room = chamber();
    getRoomOptions(room, party);
    resolveRoomAction(room, party, 'repair-gears');

    const trace = getEncounterTrace();
    const evaluated = trace.find(t => t.kind === 'evaluate' && t.encounterId === 'astronomers-chamber');
    assert.ok(evaluated.capabilitiesPresent.includes('tinkering'));
    // Brahe (astrology/observation/tinkering) is nowhere near
    // scholarship — its neighbours are correspondence, rhetoric and
    // medicine, none of which he or his own neighbours hold — so
    // recognize-model stays gated and the trace says why.
    assert.ok(evaluated.gatedOut.some(o => o.missingCaps.includes('scholarship')),
      'the trace explains the options that did NOT appear');

    const summary = capabilityUsageSummary();
    assert.ok(summary.tinkering.optionsUnlocked >= 1, 'tinkering created an opportunity');
    assert.ok(summary.tinkering.chosen >= 1, 'and it was taken');
  });
});

describe('Situations are part of the dungeon proper', () => {
  test('they generate, and often enough to be met', () => {
    let withOne = 0;
    for (let i = 0; i < 20; i++) {
      const d = generateDungeon(`sit-${i}`, 'medium');
      if (d.rooms.some(r => r.type === ROOM_TYPES.SITUATION)) withOne++;
    }
    assert.ok(withOne >= 10, `only ${withOne}/20 dungeons held a situation`);
  });

  test('every generated situation room carries a real definition', () => {
    for (let i = 0; i < 20; i++) {
      for (const room of generateDungeon(`sitdef-${i}`, 'medium').rooms) {
        if (room.type === ROOM_TYPES.SITUATION) {
          assert.ok(getEncounter(room.encounterId), `${room.encounterId} is registered`);
        }
      }
    }
  });

  test('a situation survives the archive round trip', () => {
    for (let i = 0; i < 20; i++) {
      const d = generateDungeon(`sitser-${i}`, 'medium');
      const stamped = d.rooms.find(r => r.encounterId);
      if (!stamped) continue;
      const rebuilt = dungeonFromLayout(serializeDungeon(d));
      assert.equal(rebuilt.rooms.find(r => r.index === stamped.index).encounterId, stamped.encounterId);
      return;
    }
    assert.fail('no situation generated to serialize');
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
