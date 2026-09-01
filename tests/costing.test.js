/**
 * Tests for the cost model.
 *
 * The model exists to encode a lesson this project learned three times,
 * each by measurement and each after shipping something that looked
 * fine: **an effect that repeats every round is worth roughly an order
 * of magnitude more than the same number applied once**, because the
 * damage in this game concentrates in one long fight.
 *
 * What it is for: screening. Measured against `npm run card`, its rank
 * correlation with real win-rate contribution is about 0.69 over a
 * sample of fourteen cards — good enough to point at a card worth
 * measuring, not good enough to price one. These tests defend the
 * screening properties, not an accuracy it does not have.
 */

import { strict as assert } from 'assert';
import {
  costEffects, costCard, costOutliers, SCALING, EFFECT_SCALING,
  CONVERSION, GOOD_WHEN_NEGATIVE, FLAG_WORTH, ROUNDS_THAT_MATTER,
} from '../src/game/Costing.js';
import { getAllCards, getCard } from '../src/game/Cards.js';

describe('The model encodes how effects scale', () => {
  test('a per-round point is worth far more than a one-shot point', () => {
    const perRound = costEffects({ cover: 1 }).total;
    const oneShot = costEffects({ damage: 1 }).total;
    assert.ok(perRound > oneShot * 3,
      `a point every round beats a point once (${perRound} vs ${oneShot})`);
    assert.equal(SCALING.perRound, ROUNDS_THAT_MATTER,
      'and the weight is the length of the fight that decides the run');
  });

  test('the model prices what the mechanic sees, not what the card prints', () => {
    // Incoming damage subtracts totalDefense()/3, so three points of
    // defence is one point of mitigation a round. Costing it raw made
    // Haunted Armor read as eight times the card Flanking is.
    assert.equal(CONVERSION.defense, 1 / 3);
    const three = costEffects({ defense: 3 }).total;
    const one = costEffects({ cover: 1 }).total;
    assert.equal(three, one, 'three defence is one point of cover a round');
  });

  test('a negative number is a payout where the mechanic says it is', () => {
    // monsterAtk: -2 means the foe hits two weaker. Reading the sign
    // naively priced Encirclement at exactly zero, its flanking damage
    // and its debuff cancelling, for one of the strongest cards we have.
    assert.ok(GOOD_WHEN_NEGATIVE.has('monsterAtk'));
    assert.ok(costEffects({ monsterAtk: -2 }).total > 0, 'a weaker foe is good news');
    assert.ok(costEffects({ selfHarm: -1 }).total > 0, 'so is taking less back');
    assert.ok(costEffects({ selfHarm: 1 }).total < 0, 'and taking more is a cost');

  });

  test('only the wearer\'s class action fires, so it is not summed', () => {
    // Haunted Armor lists summonAttack:1 under all five classes; one
    // wearer summons one blade, not five.
    const armor = getCard('eq-haunted-armor');
    const parts = costCard(armor).parts;
    const summon = parts.find(p => p.key === 'summonAttack');
    assert.ok(summon, 'the ghost blade is priced');
    assert.equal(summon.face, 1, 'once, not once per class in the table');
  });

  test('flags carry a worth and unknown ones are refused silently', () => {
    for (const [flag, worth] of Object.entries(FLAG_WORTH)) {
      const r = costEffects({ [flag]: true });
      assert.equal(r.total, worth, `${flag} is priced`);
      assert.equal(r.unknown.length, 0);
    }
    assert.equal(costEffects({ somethingNew: true }).unknown[0], 'somethingNew');
    assert.equal(costEffects({ sustainFull: false }).total, 0, 'a false flag costs nothing');
  });
});

describe('Nothing enters the pool uncosted', () => {
  test('every effect key any card uses has a scaling', () => {
    // The guard that matters: a mechanic added without a weight would
    // otherwise be priced at zero and never flagged. This caught `ward`
    // and `vsUndead` the first time it ran.
    const report = costOutliers(getAllCards());
    assert.deepEqual(report.unknown, [],
      `every effect is costed (${report.unknown.map(u => `${u.name}: ${u.keys}`).join('; ')})`);
  });

  test('the model runs over the whole live pool without throwing', () => {
    for (const card of getAllCards()) {
      const r = costCard(card);
      assert.equal(typeof r.total, 'number', `${card.name} prices`);
      assert.ok(Number.isFinite(r.total), `${card.name} prices finitely`);
    }
  });
});

describe('Outliers are found by distance from their own peers', () => {
  test('a card far from its type is flagged', () => {
    // Absolute bands were tried and thrown away: guessed rather than
    // measured, they flagged all sixteen characters at once. Distance
    // from a type's own distribution needs nobody to know the right
    // number in advance -- which is how Rationing, at +13.8 win points
    // against about +3 for every other tactic, would have been caught.
    const mk = (id, name, mind) => ({ type: 'equipment', id, name, slot: 'tool', bonus: { mind } });
    const pool = [
      mk('a', 'Ordinary A', 1), mk('b', 'Ordinary B', 1), mk('c', 'Ordinary C', 1),
      mk('d', 'Ordinary D', 1), mk('e', 'The Bomb', 9),
    ];
    const { outliers } = costOutliers(pool, { sigmas: 1.5 });
    assert.equal(outliers.length, 1, 'exactly the bomb');
    assert.equal(outliers[0].name, 'The Bomb');
    assert.equal(outliers[0].high, true, 'and it is flagged as too strong, not too weak');
  });

  test('a type whose cards are all alike reports no outliers', () => {
    const pool = [
      { type: 'tactic', id: 'a', name: 'A', effect: { cover: 1 } },
      { type: 'tactic', id: 'b', name: 'B', effect: { cover: 1 } },
      { type: 'tactic', id: 'c', name: 'C', effect: { cover: 1 } },
    ];
    assert.deepEqual(costOutliers(pool).outliers, [], 'no spread, nothing to flag');
  });

  test('the live pool reports its outliers rather than hiding them', () => {
    const { outliers, types } = costOutliers(getAllCards());
    assert.ok(Object.keys(types).length >= 4, 'it sees every card type');
    // Outliers are a work-list, not a failure: `npm run card <id>`
    // decides. This asserts the list stays short enough to act on.
    assert.ok(outliers.length <= 4,
      `few enough outliers to actually review (${outliers.map(o => o.name).join(', ')})`);
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
