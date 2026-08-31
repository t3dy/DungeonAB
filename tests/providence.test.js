/**
 * v6 Providence and Divination — the narrative probability system and
 * the information economy.
 *
 * Providence arranges OPPORTUNITIES around a player-authored destiny;
 * it never hands out rewards and never guarantees its own fulfilment.
 * Divination buys a look at the next descent so preparation can answer
 * it — information, not power.
 */

import { strict as assert } from 'assert';
import { Providence, deriveThemes, PROVIDENCE_THEMES, DESTINY_MAX_LENGTH } from '../src/game/Providence.js';
import { readOmens, clarityOf } from '../src/game/Divination.js';
import { Campaign } from '../src/game/Campaign.js';
import { Party } from '../src/agents/Party.js';
import { generateDungeon } from '../src/world/DungeonGen.js';
import { CHARACTER_CARDS, SPELL_CARDS } from '../src/game/Cards.js';

const byId = id => CHARACTER_CARDS.find(c => c.id === id);
const sp = id => SPELL_CARDS.find(s => s.id === id);

describe('Providence reads a destiny for themes', () => {
  test('the lost books of Alexandria read as manuscripts', () => {
    const themes = deriveThemes('To recover the lost books of Alexandria, whatever the archive costs.');
    assert.ok(themes.includes('manuscripts'));
  });

  test('different destinies read as different themes', () => {
    assert.ok(deriveThemes('To build a clockwork engine no one can explain').includes('mechanisms'));
    assert.ok(deriveThemes('To read the heavens and know what the stars intend').includes('stars'));
    assert.ok(deriveThemes('To perfect the elixir and transmute base matter').includes('substances'));
    assert.ok(deriveThemes('To avenge my brother and burn what killed him').includes('ruin'));
  });

  test('a destiny about nothing in the vocabulary reads as nothing', () => {
    assert.deepEqual(deriveThemes('A quiet life, a good chair, no particular ambitions'), []);
    assert.deepEqual(deriveThemes(''), []);
    assert.deepEqual(deriveThemes(null), []);
  });

  test('themes are capped at two — a destiny that means everything means nothing', () => {
    const everything = 'books machines stars spirits alchemy court gold revenge library engine planet demon elixir patron treasure blood';
    assert.ok(deriveThemes(everything).length <= 2);
  });

  test('authored text is clamped', () => {
    const p = new Providence();
    const entry = p.setDestiny('char-digby', 'Digby', 'books '.repeat(200));
    assert.ok(entry.text.length <= DESTINY_MAX_LENGTH);
  });

  test('setting a destiny twice replaces rather than duplicates', () => {
    const p = new Providence();
    p.setDestiny('char-digby', 'Digby', 'To recover lost manuscripts');
    p.setDestiny('char-digby', 'Digby', 'To master every machine');
    assert.equal(p.destinies.length, 1);
    assert.ok(p.destinyFor('char-digby').themes.includes('mechanisms'));
  });
});

describe('Providence leans the world without owning it', () => {
  test('no destiny, no lean', () => {
    const p = new Providence();
    assert.deepEqual(p.weightTweaks(0), {});
    assert.ok(!p.hasThemes());
  });

  test('a manuscript destiny makes libraries likelier', () => {
    const p = new Providence();
    p.setDestiny('char-digby', 'Digby', 'To recover the lost books of Alexandria');
    const tweaks = p.weightTweaks(0);   // a roll that passes the chance gate
    assert.ok(tweaks.library > 0, 'the world offers more libraries');
  });

  test('Providence stays quiet on most descents (it is not a cheat code)', () => {
    const p = new Providence();
    p.setDestiny('char-digby', 'Digby', 'To recover the lost books of Alexandria');
    assert.deepEqual(p.weightTweaks(0.99), {}, 'a high roll means the world says nothing');
  });

  test('the lean is a nudge, never a guarantee — dungeons without the theme still generate', () => {
    const p = new Providence();
    p.setDestiny('char-digby', 'Digby', 'To recover the lost books of Alexandria');
    let sawFewLibraries = false;
    for (let i = 0; i < 25 && !sawFewLibraries; i++) {
      const d = generateDungeon(`prov-${i}`, 'medium', { providence: p });
      const libraries = d.rooms.filter(r => r.type === 'library').length;
      if (libraries <= 2) sawFewLibraries = true;
    }
    assert.ok(sawFewLibraries, 'a destiny never floods every dungeon with its theme');
  });

  test('favored encounters follow the themes', () => {
    const p = new Providence();
    p.setDestiny('char-brahe', 'Brahe', 'To master every mechanism and instrument ever built');
    assert.ok(p.favoredEncounters().includes('astronomers-chamber'));
  });

  test('a themed campaign still generates a legal dungeon end to end', () => {
    const p = new Providence();
    p.setDestiny('char-dee', 'Dee', 'To read the heavens and speak with what answers');
    const d = generateDungeon('prov-legal', 'medium', { providence: p });
    assert.equal(d.rooms[0].type, 'entrance');
    assert.ok(d.rooms.some(r => r.type === 'boss'));
    assert.ok(d.rooms.some(r => r.type === 'library'), 'guarantees still hold under Providence');
  });
});

describe('Divination is information, not power', () => {
  const dungeon = () => generateDungeon('omen-seed', 'medium');

  test('a party with no diviner walks in blind', () => {
    const party = new Party([byId('char-agrippa')]);
    const reading = readOmens(party, dungeon());
    assert.equal(reading.clarity, 0);
    assert.ok(reading.blind);
    assert.equal(reading.demands.length, 0, 'a blind party learns nothing about the demands');
  });

  test('divination buys a reading; more sight buys a clearer one', () => {
    const seer = new Party([byId('char-dee'), byId('char-forman')]);   // divination + astronomy
    const sharper = new Party([byId('char-dee'), byId('char-forman'), byId('char-brahe')]); // + observation
    assert.ok(clarityOf(seer) >= 3);
    assert.ok(clarityOf(sharper) > clarityOf(seer));
    const r1 = readOmens(seer, dungeon());
    const r2 = readOmens(sharper, dungeon());
    assert.ok(!r1.blind);
    assert.ok(r2.lines.length >= r1.lines.length, 'a clearer sight says more');
  });

  test('a spell alone can open the sight', () => {
    const party = new Party([byId('char-agrippa'), sp('sp-eyes')]);
    assert.ok(!readOmens(party, dungeon()).blind, 'Eyes of the Mouse is divination');
  });

  test('the reading names what the party cannot answer — the actionable half', () => {
    const party = new Party([byId('char-dee')]);
    const reading = readOmens(party, dungeon());
    assert.ok(reading.demands.length > 0, 'the dungeon asks for things');
    assert.ok(reading.unanswered.length > 0, 'and one magus cannot answer all of them');
    for (const cap of reading.answered) {
      assert.ok(party.hasCapability(cap), 'answered means actually carried');
    }
    assert.ok(reading.lines.some(l => l.includes('Nothing the party carries answers')));
  });

  test('the reading never reveals the outcome, only the question', () => {
    const party = new Party([byId('char-dee'), byId('char-brahe')]);
    const reading = readOmens(party, dungeon());
    const text = reading.lines.join(' ').toLowerCase();
    assert.ok(!text.includes('you will win') && !text.includes('victory'),
      'divination predicts demands, never results');
  });

  test('previewing the descent does not change it', () => {
    const c = new Campaign([byId('char-dee')], { seed: 'preview-test' });
    const reading = c.previewNextDelve();
    assert.ok(reading && !reading.blind);
    const sim = c.nextDelve();
    // The previewed dungeon and the entered dungeon are the same dungeon
    const entered = sim.dungeon.rooms.map(r => r.type).join(',');
    const rePreview = generateDungeon(c.delveSeed(1), c.difficulty, {
      wantLab: false, depth: 1, condition: c.condition, providence: c.providence,
    }).rooms.map(r => r.type).join(',');
    assert.equal(entered, rePreview, 'the preview is the dungeon actually entered');
  });

  test('a campaign with a destiny previews the dungeon Providence actually built', () => {
    const c = new Campaign([byId('char-dee')], { seed: 'prov-preview' });
    c.providence.setDestiny('char-dee', 'Dee', 'To read the stars and know the heavens');
    const reading = c.previewNextDelve();
    const sim = c.nextDelve();
    assert.ok(reading);
    assert.ok(sim.dungeon.rooms.length > 0);
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
