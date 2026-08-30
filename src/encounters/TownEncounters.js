/**
 * TownEncounters — the social half of v6
 *
 * Same engine as the dungeon (capability × affordance → options), but
 * the situations test relationships, reputation, information, and
 * recovery rather than survival. This is where a "weak in combat"
 * magus is worth more than a fighter: Diplomacy, Antiquarian
 * Knowledge, Appraisal, Debate, Music, and Tinkering all answer
 * questions the dungeon never asks.
 *
 * Every outcome writes to TownState, so the town remembers.
 *
 * The context object passed as the engine's third argument is
 * `{ type: 'town', town, party, depth }` — town encounter options read
 * it in `when` predicates and their resolvers.
 */

import { registerEncounter } from './EncounterEngine.js';

/** Every town encounter registered here, in offer order. */
export const TOWN_ENCOUNTERS = [];

function townEncounter(def) {
  const registered = registerEncounter({ ...def, category: 'town' });
  TOWN_ENCOUNTERS.push(registered);
  return registered;
}

/**
 * Which situations the town puts in front of the party this visit.
 *
 * Deterministic per (seed, depth) so the town screen doesn't reshuffle
 * on every re-render — the same rule the hiring board already follows
 * (Campaign.recruitOffers). One-shots that have been resolved drop
 * out; encounters with an `available` predicate must pass it; and
 * Providence's favored encounters are drawn first, so a destiny about
 * lost books meets the bookseller more often than chance would.
 */
export function offerTownEncounters(town, rng, { count = 2, favored = [] } = {}) {
  const eligible = TOWN_ENCOUNTERS.filter(def => {
    if (def.once && town.isResolved(def.id)) return false;
    if (def.available && !def.available(town)) return false;
    return true;
  });
  if (eligible.length === 0) return [];

  const favoredPool = rng.shuffle(eligible.filter(d => favored.includes(d.id)));
  const rest = rng.shuffle(eligible.filter(d => !favored.includes(d.id)));
  // Providence leans the offer without owning it: at most one favored
  // slot, so a destiny never crowds the whole town out.
  return [...favoredPool.slice(0, 1), ...rest].slice(0, count);
}

/* ------------------------------------------------------------------ */
/* 1. The Closed Apothecary                                            */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-closed-apothecary',
  title: 'The Closed Apothecary',
  situation: 'The apothecary bolts her door when she sees the party\'s gear. She does not sell to adventurers; adventurers, she says, come back dead and owing.',
  affordances: ['people', 'substances', 'books'],
  once: true,
  options: [
    {
      id: 'negotiate-access', name: 'Negotiate Access', desc: 'Argue that this party is different',
      requires: ['diplomacy'], affordances: ['people'], weight: 1.5,
    },
    {
      id: 'offer-compounding', name: 'Offer to Compound', desc: 'Work her bench for an afternoon',
      requires: ['alchemy'], affordances: ['substances'], weight: 1.5,
    },
    {
      id: 'discuss-text', name: 'Discuss the Dispensatory', desc: 'Meet her as a colleague, not a customer',
      requires: ['medicine'], affordances: ['books'], weight: 1,
    },
    {
      id: 'identify-remedy', name: 'Identify the Old Remedy', desc: 'Recognize the jar she keeps but cannot read',
      requires: ['antiquarian'], affordances: ['books'], weight: 1,
    },
    { id: 'shop-elsewhere', name: 'Shop Elsewhere', desc: 'Her loss, and the party\'s' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'negotiate-access':
        town.adjustNpc('apothecary', 30, 'The party talked their way past the apothecary\'s bolted door.', 'the Apothecary');
        town.adjustFaction('merchants', 10, 'A hard sale made honestly: the market noticed.');
        town.unlock('supplier', 'The apothecary will sell to this party now — and at her own price, not the adventurer\'s price.');
        return { success: true, narrative: '🤝 She is argued around, slowly and on the merits. The apothecary becomes a standing supplier: potions cost less from here on.' };
      case 'offer-compounding':
        town.adjustNpc('apothecary', 40, 'The party compounded a difficult preparation at the apothecary\'s bench.', 'the Apothecary');
        town.unlock('supplier', 'The apothecary keeps this party in stock; they earned the bench.');
        party.potions.push({ kind: 'healing-draught', heal: 6 });
        return { success: true, narrative: '⚗️ An afternoon at her bench settles it — the work speaks. She becomes a standing supplier, and the day\'s yield goes into the satchel: one healing draught.' };
      case 'discuss-text':
        town.adjustNpc('apothecary', 25, 'The party met the apothecary as colleagues over her dispensatory.', 'the Apothecary');
        town.adjustFaction('scholars', 8, 'Word spreads that this party reads.');
        town.unlock('supplier', 'A colleague is served differently than a customer.');
        return { success: true, narrative: '💊 Two pages into the dispensatory she stops treating them as adventurers. The door opens: a standing supplier, and the scholars hear of it.' };
      case 'identify-remedy':
        town.adjustNpc('apothecary', 35, 'The party read the label she had given up on.', 'the Apothecary');
        town.adjustFaction('scholars', 6, 'An antiquarian eye did the town a small service.');
        party.addGold(25);
        return { success: true, narrative: '🏺 The unreadable jar is named — a preparation two centuries out of fashion and worth rather more than she thought. She splits the difference: 25 gold, and a door that stays open.' };
      case 'shop-elsewhere':
      default:
        town.adjustNpc('apothecary', -5, 'The party did not try the apothecary\'s door twice.', 'the Apothecary');
        return { success: true, narrative: '🚶 The party buys elsewhere, worse and dearer. The apothecary watches them go.' };
    }
  },
});

/* ------------------------------------------------------------------ */
/* 2. The Bookseller's Window                                          */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-bookseller',
  title: 'The Bookseller\'s Window',
  situation: 'A manuscript has appeared in the bookseller\'s window, priced like a curiosity. It may be exactly that. It may not.',
  affordances: ['books', 'valuables', 'people'],
  options: [
    {
      id: 'recognize-significance', name: 'Recognize What It Is', desc: 'Know the hand, the house, the provenance',
      requires: ['antiquarian'], affordances: ['books'], weight: 2,
    },
    {
      id: 'appraise-price', name: 'Appraise It', desc: 'Work out what it is actually worth',
      requires: ['appraisal'], affordances: ['valuables'], weight: 1.5,
    },
    {
      id: 'haggle', name: 'Haggle', desc: 'Talk the price down on general principle',
      requires: ['diplomacy'], affordances: ['people'], weight: 1,
    },
    {
      id: 'divine-contents', name: 'Divine Its Contents', desc: 'Ask whether the book is worth the coin',
      requires: ['divination'], affordances: ['books'], weight: 1,
    },
    { id: 'browse-on', name: 'Browse On', desc: 'Books do not fill bellies' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'recognize-significance': {
        town.adjustNpc('bookseller', 15, 'The party bought the manuscript the bookseller had underpriced.', 'the Bookseller');
        town.adjustFaction('scholars', 15, 'The party recovered a manuscript the scholars had been hunting.');
        town.unlock('scholars-seek-you', 'Scholars come looking for this party now.');
        party.grimoire.push({
          id: `town-manuscript-${party.grimoire.length}`, name: 'The Recovered Manuscript', icon: '📜',
          school: 'antiquarian', power: 5, use: 'combat',
          capabilities: ['knowledge'],
          text: 'Bought for the price of a curiosity from a man who had not read it.',
        });
        return { success: true, narrative: '🏺 The hand is recognized across the glass: this is not a curiosity. It goes into the grimoire for the asking price, and the scholars will want to know who has it.' };
      }
      case 'appraise-price':
        town.adjustNpc('bookseller', -5, 'The party made the bookseller feel the price he had asked.', 'the Bookseller');
        party.addGold(40);
        town.adjustFaction('merchants', 5, 'A clean trade, sharply made.');
        return { success: true, narrative: '💰 Its real value is worked out on the spot, bought, and turned over the same afternoon: 40 gold clear. The bookseller will price the next one himself.' };
      case 'haggle':
        town.adjustNpc('bookseller', 20, 'The party haggled the bookseller into a friendship.', 'the Bookseller');
        town.unlock('book-credit', 'The bookseller will hold things back for this party.');
        party.addGold(15);
        return { success: true, narrative: '🤝 The haggling goes on long enough to become a conversation, and ends in credit rather than a sale: 15 gold saved, and he will hold the next one back.' };
      case 'divine-contents':
        town.adjustFaction('scholars', 5, 'A diviner read a book without opening it. Word gets around.');
        party.spellsLearned += 1;
        party.addScore(20);
        return { success: true, narrative: '🔮 The book is read without being opened: most of it is filler, but one working is real. It is copied out on the spot, unpurchased. +1 spell learned.' };
      case 'browse-on':
      default:
        return { success: true, narrative: '🚶 The party admires the window and buys nothing.' };
    }
  },
});

/* ------------------------------------------------------------------ */
/* 3. The Tavern Brawl — where a bad visit turns violent               */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-tavern-brawl',
  title: 'The Tavern Brawl',
  situation: 'An argument two tables over is escalating past the point where anyone remembers what it was about. Half the room is standing up.',
  affordances: ['people', 'hazard'],
  options: [
    {
      id: 'defuse', name: 'Defuse It', desc: 'Get between them before the first chair moves',
      requires: ['diplomacy'], affordances: ['people'], weight: 2,
    },
    {
      id: 'play-them-down', name: 'Play Them Down', desc: 'Give the room something else to listen to',
      requires: ['music'], affordances: ['people'], weight: 1.5,
    },
    {
      id: 'find-the-instigator', name: 'Find Who Started It', desc: 'Somebody wanted this fight',
      requires: ['observation'], affordances: ['people'], weight: 1,
    },
    {
      id: 'brace-the-room', name: 'Take the Wall', desc: 'Put the party somewhere the brawl cannot flank',
      requires: ['tactics'], position: { formed: true }, weight: 1,
    },
    { id: 'wade-in', name: 'Wade In', desc: 'It is only a tavern fight' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'defuse':
        town.adjustFaction('merchants', 8, 'The party talked a tavern brawl down before it cost anyone a window.');
        town.unlock('peacemaker', 'The taverns count this party as a calming presence.');
        return { success: true, narrative: '🤝 The party gets between them and talks until both sides are embarrassed. The room sits back down. The publican remembers who did that.' };
      case 'play-them-down':
        town.adjustFaction('merchants', 6, 'A brawl became a performance.');
        town.unlock('peacemaker', 'The taverns will have this party back.');
        party.addGold(12);
        return { success: true, narrative: '🎵 Somebody starts playing. It is the wrong moment for it, which is exactly why it works — the room turns to listen and forgets the quarrel. The hat comes back with 12 gold in it.' };
      case 'find-the-instigator':
        town.adjustFaction('underworld', -10, 'The party exposed a gang\'s paid provocateur.');
        town.adjustFaction('merchants', 10, 'The party found out who was really starting tavern fights.');
        town.unlock('knows-instigator', 'The party knows who pays for trouble in this town.');
        return { success: true, narrative: '👁️ Watching rather than intervening pays: one man has been steering this from the start and leaves before it breaks. The party knows the face now. So do the merchants, shortly.' };
      case 'brace-the-room': {
        town.adjustFaction('merchants', 3, 'The party stayed out of a brawl that broke around them.');
        return { success: true, narrative: '🎯 The party takes the wall at the room\'s narrow end and the brawl breaks around them like water. Nobody in the party spills a drink.' };
      }
      case 'wade-in':
      default: {
        const damage = 3;
        party.takeDamage(damage);
        town.adjustFaction('merchants', -12, 'The party joined a tavern brawl and made it worse.');
        town.adjustFaction('clergy', -5, 'The chapter house heard about the tavern.');
        town.adjustNpc('publican', -25, 'The party fought in the publican\'s house.', 'the Publican');
        return {
          success: false, damage,
          narrative: `👊 The party wades in and the brawl becomes a proper one: ${damage} damage, a broken table nobody will pay for, and a publican who now watches the door when they enter.`,
        };
      }
    }
  },
});

/* ------------------------------------------------------------------ */
/* 4. The Printer's Breakdown                                          */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-printers-breakdown',
  title: 'The Printer\'s Breakdown',
  situation: 'The press has seized mid-run. The printer is standing in front of it with ink to the elbow, saying nothing, which is worse than shouting.',
  affordances: ['mechanism', 'people', 'books'],
  once: true,
  options: [
    {
      id: 'repair-press', name: 'Repair the Press', desc: 'Get inside the frame and find the fault',
      requires: ['tinkering'], affordances: ['mechanism'], weight: 2,
    },
    {
      id: 'diagnose-fault', name: 'Diagnose the Fault', desc: 'Reason out what a press does when it does this',
      requires: ['naturalPhilosophy'], affordances: ['mechanism'], weight: 1.5,
    },
    {
      id: 'proof-the-run', name: 'Proof the Run', desc: 'The sheets already printed are full of errors',
      requires: ['translation'], affordances: ['books'], weight: 1,
    },
    {
      id: 'negotiate-terms', name: 'Negotiate Terms', desc: 'Fix it, but agree what fixing it is worth',
      requires: ['diplomacy'], affordances: ['people'], weight: 1,
    },
    { id: 'leave-him-to-it', name: 'Leave Him To It', desc: 'Not the party\'s press' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'repair-press':
        town.adjustFaction('guild', 20, 'The party repaired the town press when the printer could not.');
        town.adjustNpc('printer', 35, 'The party got the press running again.', 'the Printer');
        town.unlock('printer-owes-you', 'The printer will run maps and broadsides for this party.');
        return { success: true, narrative: '🔧 A bent pin in the frisket, found by hand and drawn out. The press runs. The printer will print anything this party asks for now — maps included.' };
      case 'diagnose-fault':
        town.adjustFaction('guild', 12, 'The party reasoned out the press\'s fault from first principles.');
        town.adjustNpc('printer', 25, 'The party explained the press to the printer.', 'the Printer');
        town.unlock('printer-owes-you', 'The printer listens to this party.');
        return { success: true, narrative: '🌿 Not magic and not sabotage: damp paper swelling against the platen, reasoned out loud until the printer sees it himself. He is grateful and slightly annoyed, in that order.' };
      case 'proof-the-run':
        town.adjustFaction('scholars', 12, 'The party caught errors in the town\'s printed sheets.');
        party.addGold(20);
        return { success: true, narrative: '🌐 The printed sheets are proofed while the press is down — three errors that would have been quoted for a century, caught. 20 gold for the afternoon, and the scholars hear about it.' };
      case 'negotiate-terms':
        town.adjustFaction('guild', 8, 'The party did the guild a service and charged for it properly.');
        party.addGold(45);
        return { success: true, narrative: '🤝 The repair is agreed before it is attempted, at a rate that reflects a stopped press: 45 gold. The printer respects that more than charity.' };
      case 'leave-him-to-it':
      default:
        return { success: true, narrative: '🚶 The party leaves the printer with his press and his silence.' };
    }
  },
});

/* ------------------------------------------------------------------ */
/* 5. The Astrologer's Warning — the information economy               */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-astrologer',
  title: 'The Astrologer\'s Warning',
  situation: 'An astrologer has been waiting for the party specifically. He has drawn a figure for the next descent and does not like it.',
  affordances: ['astral', 'people', 'books'],
  options: [
    {
      id: 'read-the-figure', name: 'Read the Figure Yourself', desc: 'Take the chart and check his work',
      requires: ['astronomy'], affordances: ['astral'], weight: 2,
    },
    {
      id: 'deepen-the-reading', name: 'Deepen the Reading', desc: 'Ask the question he did not think to ask',
      requires: ['divination'], affordances: ['astral'], weight: 2,
    },
    {
      id: 'name-the-technique', name: 'Name the Technique', desc: 'Whose method is this, and is it any good?',
      requires: ['knowledge'], affordances: ['books'], weight: 1,
    },
    { id: 'pay-and-listen', name: 'Pay and Listen', desc: 'Take the reading at face value' },
    { id: 'wave-him-off', name: 'Wave Him Off', desc: 'The stars have been wrong before' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'read-the-figure':
        town.adjustNpc('astrologer', 20, 'The party checked the astrologer\'s work and improved it.', 'the Astrologer');
        town.unlock('sharper-omens', 'The party reads the next descent more clearly than the astrologer did.');
        party.starBlessed = true;
        return { success: true, narrative: '🔭 His arithmetic is sound and his interpretation is not. Corrected, the figure says something more useful — and the party descends under a favorable aspect (the next fight begins warded).' };
      case 'deepen-the-reading':
        town.adjustNpc('astrologer', 25, 'The party asked the astrologer a better question than his own.', 'the Astrologer');
        town.unlock('sharper-omens', 'The omens run clearer for this party.');
        party.forewarned = true;
        return { success: true, narrative: '🔮 The right question is put to the figure — not "what waits" but "what is the party walking into first." The answer is specific enough to act on: forewarned against the next snare.' };
      case 'name-the-technique':
        town.adjustFaction('scholars', 8, 'The party placed an astrological method by name and century.');
        party.addScore(20);
        return { success: true, narrative: '📖 The method is named, along with the century it went out of fashion and the reason. The astrologer is delighted; nobody has talked shop with him in years. +20 score.' };
      case 'pay-and-listen':
        party.gold = Math.max(0, party.gold - 10);
        town.adjustNpc('astrologer', 10, 'The party paid the astrologer for a reading.', 'the Astrologer');
        return { success: true, narrative: '🕯️ Ten gold for a reading taken on trust. It is ominous, unspecific, and entirely sincere.' };
      case 'wave-him-off':
      default:
        town.adjustNpc('astrologer', -15, 'The party waved the astrologer away in the street.', 'the Astrologer');
        return { success: true, narrative: '🚶 The astrologer is waved off mid-sentence. He folds the chart carefully, which is somehow worse than if he had argued.' };
    }
  },
});

/* ------------------------------------------------------------------ */
/* 6. The Public Debate                                                */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-public-debate',
  title: 'The Public Debate',
  situation: 'A visiting philosopher is holding forth in the square, and has just invited anyone who disagrees to say so in front of everyone.',
  affordances: ['people', 'books'],
  options: [
    {
      id: 'take-the-floor', name: 'Take the Floor', desc: 'Meet the thesis head-on',
      requires: ['debate'], affordances: ['people'], weight: 2,
    },
    {
      id: 'reconcile', name: 'Reconcile the Positions', desc: 'Show both sides they are arguing past each other',
      requires: ['syncretism'], affordances: ['people'], weight: 1.5,
    },
    {
      id: 'unconventional-thesis', name: 'Advance Something Stranger', desc: 'Change what the argument is about',
      requires: ['imagination'], affordances: ['people'], weight: 1.5,
    },
    {
      id: 'cite-the-source', name: 'Cite the Source', desc: 'He is quoting someone, imperfectly',
      requires: ['knowledge'], affordances: ['books'], weight: 1,
    },
    { id: 'listen', name: 'Listen', desc: 'Stay at the back and learn the room' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'take-the-floor':
        town.adjustFaction('scholars', 20, 'The party won a public debate in the square.');
        town.adjustFaction('clergy', -6, 'The chapter house did not care for the party\'s argument.');
        party.addScore(30);
        return { success: true, narrative: '💬 The thesis is met on its own ground and does not survive the encounter. The square notices. The scholars notice more; the chapter house notices differently. +30 score.' };
      case 'reconcile':
        town.adjustFaction('scholars', 14, 'The party reconciled two positions the square had been shouting about.');
        town.adjustFaction('clergy', 8, 'The party made peace where an argument was heading somewhere worse.');
        party.addScore(25);
        return { success: true, narrative: '☯️ The two positions turn out to be one position and a vocabulary problem. Both men leave believing they won, which is the mark of it being done properly. +25 score.' };
      case 'unconventional-thesis':
        town.adjustFaction('scholars', 10, 'The party said something in the square nobody had heard before.');
        town.adjustFaction('clergy', -12, 'The party said something in the square the clergy wishes they had not.');
        party.addScore(35);
        return { success: true, narrative: '✨ The party does not answer the question; it replaces it. Half the square is delighted and the other half is writing down names. +35 score.' };
      case 'cite-the-source':
        town.adjustFaction('scholars', 12, 'The party corrected a visiting philosopher\'s citation in public.');
        party.addScore(20);
        return { success: true, narrative: '📖 The quotation is corrected, with the edition and the page. The philosopher recovers well, but he has stopped improvising. +20 score.' };
      case 'listen':
      default:
        party.addScore(5);
        return { success: true, narrative: '🚶 The party listens from the back and learns who in this town nods at what. +5 score.' };
    }
  },
});

/* ------------------------------------------------------------------ */
/* 7. The Street Thief                                                 */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-street-thief',
  title: 'The Street Thief',
  situation: 'A hand that is not the party\'s goes into the party\'s purse in the crowded part of the market.',
  affordances: ['people', 'valuables'],
  options: [
    {
      id: 'catch-them', name: 'Catch the Hand', desc: 'Take the wrist before it leaves the pocket',
      requires: ['rogue'], affordances: ['people'], weight: 2,
    },
    {
      id: 'cut-them-off', name: 'Cut Them Off', desc: 'Read the crowd and close the exit',
      requires: ['tactics'], affordances: ['people'], weight: 1.5,
    },
    {
      id: 'question-them', name: 'Question Them', desc: 'Find out who they work for',
      requires: ['diplomacy'], affordances: ['people'], weight: 1.5,
    },
    { id: 'let-it-go', name: 'Let It Go', desc: 'It was only coin' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'catch-them':
        town.adjustFaction('underworld', -8, 'The party caught a cutpurse in the act.');
        party.addGold(15);
        return { success: true, narrative: '🗡️ The wrist is caught before the purse clears the pocket, and the thief hands back rather more than they took: 15 gold. The gangs will hear how quickly that happened.' };
      case 'cut-them-off':
        town.adjustFaction('merchants', 8, 'The party ran down a thief in the market without wrecking a stall.');
        party.addGold(10);
        return { success: true, narrative: '🎯 The crowd is read, the exit is closed, and the thief runs into the party rather than away from it — no stalls overturned. The market appreciates a clean job: 10 gold recovered.' };
      case 'question-them':
        town.adjustFaction('underworld', 12, 'The party let a thief go in exchange for a name.');
        town.unlock('underworld-contact', 'Somebody in the gangs owes this party a small favor.');
        return { success: true, narrative: '🤝 The thief is questioned rather than handed over, and turns out to be worth more talking than punished: a name, a street, and a small standing favor from people who do not usually grant them.' };
      case 'let-it-go':
      default: {
        const lost = Math.min(party.gold, 20);
        party.gold -= lost;
        town.adjustFaction('underworld', 4, 'The party is known as an easy purse.');
        return { success: false, narrative: `💰 The hand leaves with ${lost} gold and the party does not pursue. Word gets around the gangs about who does not pursue.` };
      }
    }
  },
});

/* ------------------------------------------------------------------ */
/* 8. The Town Remembers — the persistent-consequence encounter        */
/* ------------------------------------------------------------------ */

townEncounter({
  id: 'town-remembers',
  title: 'The Town Remembers',
  situation: 'The town has had time to form an opinion, and it has formed one.',
  affordances: ['people'],
  /** Only offered once the town actually has something to remember. */
  available: (town) => town.log.length >= 2,
  options: [
    {
      id: 'mend-fences', name: 'Mend Fences', desc: 'Go and speak to whoever the party wronged',
      requires: ['diplomacy'], affordances: ['people'], weight: 2,
      when: (party, ctx) => ctx.town.enemies().length > 0,
    },
    {
      id: 'make-repairs', name: 'Make Repairs', desc: 'Fix what the party actually broke',
      requires: ['tinkering'], weight: 1.5,
      when: (party, ctx) => ctx.town.standing('guild') < 0,
    },
    {
      id: 'work-old-friends', name: 'Work Old Friendships', desc: 'Call in what the party is owed',
      requires: ['knowledge'], affordances: ['people'], weight: 1.5,
      when: (party, ctx) => ctx.town.allies().length > 0,
    },
    {
      id: 'move-unseen', name: 'Move Unseen', desc: 'Do business without being recognized',
      requires: ['rogue'], weight: 1,
      when: (party, ctx) => ctx.town.enemies().length > 0,
    },
    {
      id: 'anticipate-retaliation', name: 'Anticipate the Retaliation', desc: 'Find out what is coming before it arrives',
      requires: ['divination'], weight: 1,
      when: (party, ctx) => ctx.town.hostility() > 0.2,
    },
    { id: 'take-the-town-as-it-is', name: 'Take the Town As It Is', desc: 'Reputation is a cost of doing business' },
  ],
  resolveOption(optionId, party, ctx) {
    const { town } = ctx;
    switch (optionId) {
      case 'mend-fences': {
        const enemies = town.enemies();
        for (const id of enemies) town.adjustFaction(id, 20);
        town.remember({ kind: 'repair', text: 'The party spent a day apologizing to everyone it had wronged, and meant enough of it.' });
        return { success: true, narrative: `🤝 A day is spent on apologies that cost something to make. ${enemies.length} standing${enemies.length === 1 ? '' : 's'} recovered — not to friendship, but out of the red.` };
      }
      case 'make-repairs':
        town.adjustFaction('guild', 25, 'The party repaired the guild property it had damaged.');
        town.remember({ kind: 'repair', text: 'The party made good on guild property.' });
        return { success: true, narrative: '🔧 The party repairs what it broke, at its own cost and competently. The guild does not forgive it exactly, but it files it differently.' };
      case 'work-old-friends': {
        const allies = town.allies();
        party.addGold(30 + allies.length * 15);
        town.remember({ kind: 'favor', text: 'The party called in favors from the friends it had made.' });
        return { success: true, narrative: `📖 Old friendships are worked for what they are worth: ${30 + allies.length * 15} gold in gifts, discounts, and debts settled early across ${allies.length} standing${allies.length === 1 ? '' : 's'}.` };
      }
      case 'move-unseen':
        town.unlock('moves-unseen', 'The party can do business in a town that dislikes it.');
        return { success: true, narrative: '🗝️ The party does its business by back doors and second-floor rooms. Nothing is mended, but nothing is closed to them either.' };
      case 'anticipate-retaliation':
        town.unlock('forewarned-in-town', 'The party knows which grudge is about to become an ambush.');
        party.forewarned = true;
        return { success: true, narrative: '🔮 The retaliation is seen coming: who, and roughly when. The party will not be surprised by it.' };
      case 'take-the-town-as-it-is':
      default: {
        const hostility = town.hostility();
        if (hostility > 0.35) {
          const damage = 4;
          party.takeDamage(damage);
          town.remember({ kind: 'violence', text: 'The party was jumped in the street by people with a grievance.' });
          return { success: false, damage, narrative: `👊 The party walks the town as if nothing has changed. Something has: ${damage} damage in an alley, from people who were owed it.` };
        }
        return { success: true, narrative: '🚶 The party walks the town as it is, and the town lets them.' };
      }
    }
  },
});
