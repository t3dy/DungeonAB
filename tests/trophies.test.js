/**
 * Tests for the trophy case — how the drops feature threads through
 * the larger system: party memory, simulator state, campaign summary,
 * the endings' writing, the onscreen event feed, and the Covetous
 * learning that every fight is a payday now.
 */

import { strict as assert } from 'assert';
import { Party } from '../src/agents/Party.js';
import { claimDrop } from '../src/game/Drops.js';
import { resolveRoomAction, decideRoomAction } from '../src/encounters/RoomEncounters.js';
import { composeVictory, composeWipe } from '../src/narrative/Narrator.js';
import { describeTickEvents, ROOM_HELP } from '../src/ui/GameGuide.js';
import { Simulator } from '../src/sim/Simulator.js';
import { Campaign } from '../src/game/Campaign.js';
import { ROOM_TYPES } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, CLASSES } from '../src/game/Cards.js';

const fighter = CHARACTER_CARDS.find(c => c.class === CLASSES.FIGHTER);

function slay(party, kind, name) {
  const room = { type: ROOM_TYPES.MONSTER, monster: { kind, name, attack: 1, health: 2 } };
  return resolveRoomAction(room, party, 'fight');
}

describe('The trophy case — party memory', () => {
  test('every claimed drop is remembered, with its provenance', () => {
    const party = new Party([fighter]);
    assert.deepEqual(party.trophies, [], 'the case starts empty');
    slay(party, 'goblin-gang', 'a goblin toll-gang');
    slay(party, 'wraith', 'a cold-eyed wraith');
    assert.equal(party.trophies.length, 2);
    assert.equal(party.trophies[0].name, 'the toll-purse');
    assert.equal(party.trophies[0].from, 'a goblin toll-gang');
    assert.equal(party.trophies[1].name, 'a grave-cold ribbon');
  });

  test('trophies persist across campaign depths with the party', () => {
    const campaign = new Campaign([fighter], { seed: 'trophy-run' });
    campaign.nextDelve();
    claimDrop(campaign.party, { kind: 'skeleton', name: 'a rattling skeleton patrol' });
    campaign.nextDelve(); // a new dungeon, the same party
    assert.equal(campaign.party.trophies.length, 1, 'the case rides along');
    assert.equal(campaign.getSummary().trophies, 1, 'and the summary counts it');
  });
});

describe('The trophy case — simulator surfaces', () => {
  test('getState and getRunResult expose the trophies', () => {
    const sim = new Simulator([fighter], 'trophy-state');
    claimDrop(sim.party, { kind: 'salamander', name: 'a salamander' });
    const state = sim.getState();
    assert.equal(state.party.trophies.length, 1);
    assert.equal(state.party.trophies[0].name, 'a salamander gland');
    assert.ok(state.party.trophies[0].icon, 'the UI gets an icon to show');
    assert.equal(sim.getRunResult().trophies, 1);
  });
});

describe('The endings tell the spoils', () => {
  test('a victory carries the finest trophy into the sunlight', () => {
    const party = new Party([fighter]);
    slay(party, 'skeleton', 'a rattling skeleton patrol');
    slay(party, 'ogre-king', 'the Ogre King Under the Stair');
    const text = composeVictory(party, 9);
    assert.ok(text.includes('the Ogre King\'s smallest crown'), 'the last kill\'s trophy is named');
    assert.ok(text.includes('1 lesser trophy'), 'the rest are counted');
  });

  test('a wipe returns the spoils to the dark', () => {
    const party = new Party([fighter]);
    slay(party, 'wraith', 'a cold-eyed wraith');
    party.takeDamage(999);
    const text = composeWipe(party, 4);
    assert.ok(text.includes('a grave-cold ribbon'), 'the dark takes back what it minted');
  });

  test('an empty case stays out of the writing', () => {
    const party = new Party([fighter]);
    assert.ok(!composeVictory(party, 3).includes('trophy'), 'no spoils, no spoils sentence');
    assert.ok(!composeWipe(party, 3).includes('spoils'), 'same on a wipe');
  });
});

describe('The event feed notices a claim', () => {
  const snapshot = trophies => ({ party: { members: [], gold: 0, spellsLearned: 0, trophies } });

  test('a new trophy becomes an onscreen event, named while warm', () => {
    const events = describeTickEvents(
      snapshot([]),
      snapshot([{ name: 'the toll-purse', icon: '💰' }]),
    );
    const claim = events.find(e => e.kind === 'trophy');
    assert.ok(claim, 'the claim surfaces');
    assert.equal(claim.icon, '💰');
    assert.ok(claim.text.includes('the toll-purse'));
  });

  test('old snapshots without a trophy list stay quiet (no crash)', () => {
    const events = describeTickEvents(
      { party: { members: [], gold: 0, spellsLearned: 0 } },
      snapshot([{ name: 'the toll-purse', icon: '💰' }]),
    );
    assert.ok(!events.some(e => e.kind === 'trophy'), 'no baseline, no event');
  });

  test('the monster room help promises the drop', () => {
    assert.ok(ROOM_HELP[ROOM_TYPES.MONSTER].includes('drops a trophy'));
  });
});

describe('The Covetous fight for loot now', () => {
  test('at the same roll, a greedy party fights where a plain one flees', () => {
    const realRandom = Math.random;
    Math.random = () => 0.6; // deep enough into the weights to split them
    try {
      const room = { type: ROOM_TYPES.MONSTER, monster: { name: 'a bandit', attack: 3, health: 10 } };

      const plain = new Party([fighter]);
      assert.equal(decideRoomAction(room, plain), 'flee', 'an unmotivated party backs off');

      const covetous = new Party([fighter]);
      covetous.personalities.push('greedy');
      assert.equal(decideRoomAction(room, covetous), 'fight', 'the Covetous smell the drop');
    } finally {
      Math.random = realRandom;
    }
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
