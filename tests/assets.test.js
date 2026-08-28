/**
 * Tests for the asset pass — the cards that were rewritten to have a
 * job in the systems the game grew.
 *
 * The audit that prompted it found all nine personalities touching none
 * of the mechanics added since they were written: they had opinions
 * about monsters and none at all about walking in the dark or carrying a
 * scar to the throne, which is now most of what a delve is made of.
 *
 * Standing rule 9: when a mechanic lands, ask which existing cards should
 * now interact with it. `npm run assets` is the work-list.
 */

import { strict as assert } from 'assert';
import { STANCES, STANCED, personalityModifiers } from '../src/game/Personalities.js';
import { auditAssets, firingRates } from '../tools/assets.mjs';
import { MATTER, hasReaction, REACTIVE_ELEMENTS } from '../src/world/Reactions.js';
import { Party, DARK_TOLL } from '../src/agents/Party.js';
import { Adventurer } from '../src/agents/Adventurer.js';
import { composeSupply, composeProvision, composeWound } from '../src/narrative/Narrator.js';
import {
  CHARACTER_CARDS, PERSONALITY_CARDS, getCard,
} from '../src/game/Cards.js';

const byClass = cls => CHARACTER_CARDS.find(c => c.class === cls);
const pers = a => PERSONALITY_CARDS.find(c => c.archetype === a);
const hp = p => p.members.reduce((s, m) => s + Math.max(0, m.health), 0);

describe('A temper has an opinion about the march', () => {
  test('every stance moves a clock and says something about it', () => {
    for (const [archetype, stance] of Object.entries(STANCES)) {
      const moves = ['dark', 'supply', 'wound'].some(k => stance[k]);
      assert.ok(moves, `${archetype} actually changes something`);
      const lines = [stance.text, stance.supplyText, stance.woundText].filter(Boolean);
      assert.ok(lines.length > 0, `${archetype} explains itself`);
      for (const l of lines) assert.ok(l.length > 25, `${archetype}'s line says something`);
    }
  });

  test('the Bold walk the dark cheaper than the Craven creep it', () => {
    const toll = archetype => {
      const party = new Party([byClass('fighter'), byClass('rogue'), pers(archetype)]);
      party.provision(2, 'medium');
      while (party.supply > 0) party.restStep();
      const before = hp(party);
      const note = party.restStep();
      return { paid: before - hp(party), note };
    };
    const bold = toll('brave');
    const craven = toll('craven');
    assert.ok(bold.paid < craven.paid,
      `the Bold pay less for the dark (${bold.paid} < ${craven.paid})`);
    assert.equal(bold.note.damage, DARK_TOLL - 1);
    assert.equal(craven.note.damage, DARK_TOLL + 1);
  });

  test('the dark line names the temper that changed its price, once', () => {
    const party = new Party([byClass('fighter'), pers('brave')]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();
    const first = composeSupply(party.restStep());
    assert.match(first, /The Bold walk the dark/, 'the first benighted march explains itself');
    const second = composeSupply(party.restStep());
    assert.doesNotMatch(second, /The Bold walk the dark/, 'and then stops explaining');
  });

  test('a wound stance never surfaces under a dark toll', () => {
    // A line filed under the wrong clock reads as a non-sequitur: "the
    // Devout tend what the dungeon opens" after a damage total is noise.
    const party = new Party([byClass('fighter'), pers('pious')]);
    party.provision(2, 'medium');
    while (party.supply > 0) party.restStep();
    const line = composeSupply(party.restStep());
    assert.doesNotMatch(line, /tend what the dungeon opens/,
      'the wound stance stays on the wound beat');
  });

  test('rationing tempers pack more oil, and the quartermaster says so', () => {
    const supplyFor = archetype => {
      const p = new Party([byClass('fighter'), ...(archetype ? [pers(archetype)] : [])]);
      p.provision(10, 'hard');
      return p;
    };
    const plain = supplyFor(null);
    const cunning = supplyFor('cunning');
    assert.ok(cunning.supply > plain.supply,
      `the Cunning ration (${plain.supply} → ${cunning.supply})`);
    const line = composeProvision(cunning.provisionNotes);
    assert.match(line, /trimmed the wick/i, 'and it is said at the mouth of the dungeon');
    assert.equal(composeProvision(plain.provisionNotes), null, 'a plain party says nothing');
  });

  test('the Devout scar less readily than the Reckless', () => {
    const scars = archetype => {
      const party = new Party([byClass('fighter'), pers(archetype)]);
      const m = party.members[0];
      m.takeDamage(Math.ceil(m.maxHealth * 0.28));
      return m.wounds;
    };
    assert.ok(scars('pious') < scars('reckless'),
      'tending what opens is worth something');
  });

  test('conflicting tempers cancel rather than crash', () => {
    const party = new Party([byClass('fighter'), pers('brave'), pers('craven')]);
    const mods = personalityModifiers(party);
    assert.equal(mods.dark, 0, 'a Bold, Craven party is exactly as conflicted as it sounds');
    assert.ok(mods.notes.length === 2, 'and both tempers still speak');
  });

  test('the first wound names the temper, later ones do not', () => {
    const m = new Adventurer(CHARACTER_CARDS.find(c => c.class === 'fighter'));
    const notes = [{ archetype: 'pious', text: 'The Devout tend what the dungeon opens.' }];
    m.wounds = 1;
    assert.match(composeWound(m, notes), /Devout/, 'the first scar explains the temper');
    m.wounds = 2;
    assert.doesNotMatch(composeWound(m, notes), /Devout/, 'the second does not repeat it');
  });
});

describe('The reworked kit has a job', () => {
  test('dwarven mail makes a blow less likely to leave a scar', () => {
    const wounds = mail => {
      const cards = [byClass('fighter'), ...(mail ? [getCard('eq-chainmail')] : [])];
      const party = new Party(cards);
      const m = party.members[0];
      m.takeDamage(Math.ceil(m.maxHealth * 0.28));
      return m.wounds;
    };
    assert.equal(wounds(false), 1, 'a bare fighter scars');
    assert.equal(wounds(true), 0, 'an armoured one does not');
  });

  test('kit assigned after muster still reaches the wearer', () => {
    // Equipment is assigned after the temper is first applied, so the
    // mail has to re-apply when it finds a wearer -- it did not, at first.
    const party = new Party([byClass('fighter'), pers('reckless'), getCard('eq-chainmail')]);
    const wearer = party.members.find(m => m.equipment.some(e => e.id === 'eq-chainmail'));
    assert.ok(wearer, 'somebody is wearing it');
    assert.ok(wearer.woundBias > personalityModifiers(party).wound,
      'and the armour counts on top of the temper');
  });

  test('the reworked items all say what they now do', () => {
    for (const id of ['eq-alembic', 'eq-chainmail', 'eq-warded-buckler', 'eq-athanor-charm']) {
      const card = getCard(id);
      assert.ok(card, `${id} exists`);
      assert.ok(card.text.length > 60, `${card.name} explains its new job`);
    }
    assert.match(getCard('eq-alembic').text, /oil/i);
    assert.match(getCard('eq-chainmail').text, /scar/i);
    assert.match(getCard('eq-warded-buckler').text, /come back on them/i);
    assert.match(getCard('eq-athanor-charm').text, /alight|burn/i);
  });
});

describe('The drift audit is honest about what it finds', () => {
  test('personalities are no longer inert', () => {
    const { byType } = auditAssets();
    const inert = byType.personality.filter(r => r.hooks.length === 0);
    assert.equal(inert.length, 0,
      `every temper touches a mechanic (${inert.map(r => r.card.name).join(', ')})`);
    for (const a of STANCED) {
      assert.ok(STANCES[a], `${a} has a stance`);
    }
  });

  test('every matter something is made of has at least one answer', () => {
    for (const matter of new Set(Object.values(MATTER))) {
      const answered = REACTIVE_ELEMENTS.filter(el => hasReaction(el, matter));
      assert.ok(answered.length > 0,
        `${matter} answers to something (a pit answered to nothing until the audit found it)`);
    }
  });

  test('the audit reports rather than crashes on the live pool', () => {
    const report = auditAssets();
    assert.ok(Object.keys(report.byType).length >= 4, 'it sees every card type');
    assert.ok(Array.isArray(report.inert));
    assert.deepEqual(report.matterGaps, [], 'and nothing is unanswered right now');
  });
});

describe('A card that promises something keeps it', () => {
  test('every promise fires in at least one delve in ten', () => {
    // "Inert" is a static question: does any mechanic read this card?
    // The sharper one is dynamic — hand the card to a party, send them
    // down, and see whether what the card says it does ever reaches
    // what the player reads. Eyes of the Mouse fired every time and was
    // never named for it, so a player who drafted it could not tell it
    // was working.
    //
    // Stat-only cards are excluded by the tool: their promise is the
    // number on the card, which the roster already shows.
    const cold = firingRates(20)
      .filter(r => r.rate < 0.1)
      .map(r => `${r.card.name} (${(r.rate * 100).toFixed(0)}%)`);
    assert.deepEqual(cold, [],
      `cards whose writing the player almost never sees: ${cold.join(', ')}`);
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
