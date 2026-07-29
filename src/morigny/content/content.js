/**
 * MORIGNY — authored content for the vertical slice.
 *
 * Every record carries the envelope (morigny/CLAUDE.md):
 *   status: 'attested' | 'adapted' | 'invented'
 *   sources: [{work, locus}] — required (non-empty locus) for attested/adapted;
 *            invented records may cite a register model or carry [].
 * The pencil apparatus reads these envelopes at runtime: the fourth wall
 * is powered by the database.
 */

// ── Bibliography (cited by pencil notes) ────────────────────────────────
export const BIBLIO = {
  'fanger-rewriting': 'Claire Fanger, Rewriting Magic (Penn State UP, 2015)',
  'fanger-watson-edition':
    'Fanger & Watson (eds.), John of Morigny, Liber florum celestis doctrine (PIMS)',
  'watson-conjuring':
    'Nicholas Watson, in Fanger (ed.), Conjuring Spirits (Penn State UP, 1998)',
  'fanger-watson-esoterica':
    'Fanger & Watson, "The Prologue to John of Morigny\'s Liber Visionum," Esoterica 3 (2001)',
  'kieckhefer-mma': 'Richard Kieckhefer, Magic in the Middle Ages (CUP)',
  'rb1980': 'RB 1980: The Rule of St. Benedict (ed. Fry)',
  'newman-speculum':
    'Barbara Newman, "What Did It Mean to Say ‘I Saw’?" Speculum 80 (2005)',
  'camille-margins': 'Michael Camille, Image on the Edge (1992)',
};

// ── The hours: arrival text (John's hand) + rubric ──────────────────────
export const HOUR_TEXT = {
  matins: {
    rubric: '¶ Of rising to the night office.',
    body:
      'The bell had not yet rung when I woke, which I confess was not vigilance but fear; ' +
      'the dark of the dormitory lay on me like a hand. A single lamp burned, as the Rule ' +
      'provides. I rose, and my intention rose with me, and not all of it was for the choir.',
    sources: [{ work: 'RB 1980', locus: 'chs. 8, 22 (register model)' }],
    status: 'invented',
  },
  lauds: {
    rubric: '¶ Of Lauds, at first light.',
    body:
      'At daybreak we praised, and the windows went from black to grey, and I was glad of it ' +
      'as a man is glad who has come through water.',
    sources: [],
    status: 'invented',
  },
  prime: {
    rubric: '¶ Of Prime, and of chapter.',
    body:
      'After Prime we went into chapter, where faults are spoken and corrected. I sat among ' +
      'my brothers with my book in my mind, and hoped my face was a closed door.',
    sources: [{ work: 'RB 1980', locus: 'chs. 46 (register model)' }],
    status: 'invented',
  },
  terce: {
    rubric: '¶ Of Terce.',
    body: 'At the third hour, a short office; the day’s work waiting at the door of it.',
    sources: [],
    status: 'invented',
  },
  sext: {
    rubric: '¶ Of Sext.',
    body: 'At midday we sang, and the sun stood over the garth, and the flies were at the ink.',
    sources: [],
    status: 'invented',
  },
  none: {
    rubric: '¶ Of None.',
    body: 'At the ninth hour the office, brief; my hand ached from the pen, which I offered up.',
    sources: [],
    status: 'invented',
  },
  vespers: {
    rubric: '¶ Of Vespers.',
    body:
      'At evening we sang Vespers, and the light in the choir went the color of old vellum, ' +
      'and I thought: tonight I will ask her. And then I thought: who am I, to ask.',
    sources: [],
    status: 'invented',
  },
  compline: {
    rubric: '¶ Of Compline, and the Great Silence after.',
    body:
      'We said Compline and the silence began, which is the Rule’s mercy and the enemy’s ' +
      'opportunity, for in silence a man hears everything that is in him.',
    sources: [{ work: 'RB 1980', locus: 'ch. 42 (register model)' }],
    status: 'invented',
  },
};

// ── Prayers ─────────────────────────────────────────────────────────────
/** The versicle that opens each hour — real liturgy, prescribed by the Rule. */
export const VERSICLE = {
  id: 'deus-in-adiutorium',
  latin: 'Deus, in adiutorium meum intende; Domine, ad adiuvandum me festina.',
  english: 'O God, come to my assistance; O Lord, make haste to help me.',
  sources: [
    { work: 'RB 1980', locus: 'chs. 17-18 (opening versicle of the hours)' },
    { work: 'Vulgate', locus: 'Ps 69:2' },
  ],
  status: 'attested',
};

/**
 * The procedure prayer (slice stand-in). John's actual prayers exist in the
 * Fanger-Watson edition and are on the Research Queue; until verified, this
 * is our invention in his register, and the apparatus says so on screen.
 */
export const PROCEDURE_PRAYER = {
  id: 'procedure-prayer-1',
  title: 'The first prayer of the procedure, said in the heart at Matins',
  verses: [
    'Flower of the field, in whose keeping is all teaching, look upon a man in the dark.',
    'I do not ask knowledge as the proud ask it, seizing; I ask it as the ground asks rain.',
    'What I learned crookedly, make straight; what I took from the enemy’s table, I have put down.',
    'If it please you, give me leave to go on; and if it does not please you, give me leave to stop.',
    'And keep the gate of my eyes, and the gate of my hands, and the gate of my sleep, this night.',
  ],
  sources: [{ work: 'Fanger & Watson, Esoterica 3 (2001)', locus: 'register model only' }],
  status: 'invented',
};

/** Compline's canticle — real liturgy (the Nunc dimittis is Compline's own). */
export const COMPLINE_PRAYER = {
  id: 'compline-office',
  title: 'Compline, before the Great Silence',
  verses: [
    'Deus, in adiutorium meum intende; Domine, ad adiuvandum me festina.',
    'Nunc dimittis servum tuum, Domine, secundum verbum tuum in pace.',
    'Now let your servant depart in peace: the day is given back, such as it was.',
  ],
  sources: [
    { work: 'RB 1980', locus: 'chs. 17-18 (Compline structure)' },
    { work: 'Vulgate', locus: 'Ps 69:2; Lc 2:29' },
  ],
  status: 'attested',
};

/** When the sought dream does not come. */
export const DREAM_SHUT = {
  rubric: '¶ Of the night, in which nothing was given.',
  body:
    'I slept, and no dream rose. The books are plain that the fault in such cases is to be ' +
    'sought in the observance — a prayer scattered, a purity not kept, a work already spoiled ' +
    '— and I made my inventory in the dark, item by item, like a merchant after a bad fair.',
  sources: [],
  status: 'invented',
};

// ── Distractions (the margin's pull during recitation) ──────────────────
// kind: 'mundane' | 'memory' | 'flesh' | 'pencil'
// effects apply only when ATTENDED.
export const DISTRACTIONS = [
  {
    id: 'cold-feet',
    kind: 'mundane',
    text: 'The stone is very cold underfoot, and the cold climbs.',
    effects: { pressure: 0, despair: 0 },
    sources: [],
    status: 'invented',
  },
  {
    id: 'brother-cough',
    kind: 'mundane',
    text: 'Brother Herbert coughs, three stalls down, the same three notes as always.',
    effects: { pressure: 0, despair: 0 },
    sources: [],
    status: 'invented',
  },
  {
    id: 'hunger',
    kind: 'mundane',
    text: 'The fast sits in the stomach like a stone with opinions.',
    effects: { pressure: 1, despair: 0 },
    sources: [],
    status: 'invented',
  },
  {
    id: 'orleans-books',
    kind: 'memory',
    text:
      'Orléans. The room over the candlemaker’s, and the book that was lent, not given, ' +
      'and what it promised. It kept none of it. It kept other things.',
    effects: { pressure: 1, despair: 0 },
    sources: [{ work: 'Kieckhefer, Magic in the Middle Ages', locus: 'the "clerical underworld" (frame)' }],
    status: 'adapted',
  },
  {
    id: 'notae-memory',
    kind: 'memory',
    text:
      'The notae of the old art, wheels within wheels. I could draw them still with my eyes shut. ' +
      'That is the trouble. My eyes are shut.',
    effects: { pressure: 2, despair: 0 },
    sources: [{ work: 'Fanger, Rewriting Magic', locus: 'John’s ars notoria practice (frame)' }],
    status: 'adapted',
  },
  {
    id: 'flesh-warmth',
    kind: 'flesh',
    text: 'A warmth that has no business in a choir stall, and knows it, and does not leave.',
    effects: { pressure: 2, despair: 0 },
    sources: [],
    status: 'invented',
  },
  {
    id: 'flesh-remembered',
    kind: 'flesh',
    text:
      'The enemy does not invent; he quotes. Something remembered is offered back to me ' +
      'with interest, and I am ashamed how good the interest is.',
    effects: { pressure: 3, despair: 1 },
    sources: [],
    status: 'invented',
  },
  {
    id: 'flesh-despair',
    kind: 'flesh',
    text:
      'The thought under the thought: that I have already fallen so often that this once is ' +
      'arithmetic, not sin. This is the most dangerous voice, because it sounds like reason.',
    effects: { pressure: 2, despair: 1 },
    sources: [],
    status: 'invented',
  },
  {
    id: 'pencil-rb22',
    kind: 'pencil',
    text:
      'The dormitory rules he lives under are in the Rule, ch. 22: all sleep clothed, a lamp ' +
      'burning until morning. Staging, for the hardest hours. — n.',
    effects: { pressure: 0, despair: 0 },
    cites: ['rb1980'],
    sources: [{ work: 'RB 1980', locus: 'ch. 22' }],
    status: 'attested',
  },
  {
    id: 'pencil-margins',
    kind: 'pencil',
    text:
      'These marginal intrusions are the game’s version of what Gothic margins actually did: ' +
      'commentary, mischief, pressure at the edge of the sacred page. You just proved the ' +
      'mechanic by reading this instead of the prayer. — n.',
    effects: { pressure: 0, despair: 0 },
    cites: ['camille-margins'],
    sources: [{ work: 'Camille, Image on the Edge', locus: 'passim (frame)' }],
    status: 'adapted',
  },
];

// ── The Struggle: tier interiority ──────────────────────────────────────
export const TIER_TEXT = {
  QUIET: 'The house of the mind is swept, and nothing walks in it tonight.',
  STIRRED: 'Something paces at the edge of thought, not yet knocking, patient as rot.',
  BESIEGED:
    'The siege is set. Every unguarded thought is a gate, and I am a town with too many gates.',
  CRISIS:
    'It is here, and it is not outside me, which is the horror of it; the enemy holds ground ' +
    'that is mine, and argues from my own memory, in my own voice.',
};
export const TIER_ENVELOPE = { sources: [], status: 'invented' };

// ── Night verbs and outcomes ────────────────────────────────────────────
export const NIGHT_CHOICES = {
  vigil: 'Rise and keep vigil — outlast it on your knees, and pay for it tomorrow.',
  prayer: 'Set the prayer against it, word by word, like sandbags.',
  cold: 'The stone floor, bare feet, the old remedy: give the body a different argument.',
  endure: 'Lie still in the dark and hold. Only hold.',
};

export const NIGHT_OUTCOMES = {
  vigil: {
    mastery:
      'Toward Matins the siege lifted all at once, the way weather lifts; I was on my knees ' +
      'and then I was only a tired man on his knees, which is a good thing to be.',
    endured: 'I outlasted it. There is no glory in it. The lamp burned; I watched it burn.',
    lapse:
      'I kept the vigil an hour and then the vigil kept nothing. Of what followed I write only ' +
      'that it followed, and that afterward the dark was very quiet, and I was alone in it.',
  },
  prayer: {
    mastery:
      'At the third verse the words stopped being sandbags and started being water; I went ' +
      'under them gladly, and when I surfaced the enemy had lost interest in me.',
    endured: 'I prayed the thing to a standstill. A standstill is not a victory. I will take it.',
    lapse:
      'The prayer and the temptation braided together until I could not tell which I was ' +
      'saying. Then I was saying neither. I record this against myself, as is right.',
  },
  cold: {
    mastery:
      'The cold made the body’s case absurd, and absurdity is a kind of exorcism; I nearly ' +
      'laughed, and the enemy cannot abide being laughed at.',
    endured: 'The stone argued; the flesh sulked; morning came on schedule. Nothing worse.',
    lapse:
      'The cold worked until it became one more sensation, and the enemy is a chemist of ' +
      'sensation. I fell. The floor was still cold afterward, which felt like a comment.',
  },
  endure: {
    mastery:
      'I held. I did nothing, said nothing, was nothing but a man refusing, and it turned out ' +
      'refusing was enough, this once.',
    endured: 'I held until it got bored of me. Being boring is an underpraised discipline.',
    lapse:
      'Stillness became drift, and drift became consent by inches, and there was no single ' +
      'moment I chose it, which does not mean I did not choose it.',
  },
};
export const NIGHT_ENVELOPE = { sources: [], status: 'invented' };

// ── Confession beats (at chapter) ───────────────────────────────────────
export const CONFESSION = {
  offerPolluted:
    'I am unclean, and the Work is shut to me until I say so aloud to another man. The saying ' +
    'aloud is the whole medicine and the whole price.',
  offerClean:
    'I have nothing grave to confess, and the scrupulous voice says: are you sure? say ' +
    'something anyway, say everything, be safe. That voice wears a cassock but I do not ' +
    'think it is a monk.',
  confess:
    'I said it plainly and did not decorate it. The confessor was brief and kind, which was ' +
    'worse than severity, and then it was done, and the Work stood open again.',
  delay:
    'I said nothing. The fault rode out of chapter on my back, and it has friends where ' +
    'we are going.',
  scruple:
    'I confessed what was not matter, and confessed the confessing, and felt no cleaner — ' +
    'only smaller. This is the wheel Fanger’s monk knew well: scruple grinding the soul ' +
    'finer than any sin managed.',
};
export const CONFESSION_ENVELOPE = {
  sources: [{ work: 'Fanger, Rewriting Magic', locus: 'scrupulosity (frame; verify loci)' }],
  status: 'adapted',
};

// ── The sought vision & discernment ─────────────────────────────────────
export const VISION_TELLS = {
  color: {
    true_:
      'The blue of her mantle was the blue that costs a year’s wages of lapis: deep, ' +
      'unflattering, exact.',
    false_:
      'The blue of the mantle was beautiful and slightly wrong — a blue that flatters, ' +
      'like a mirror that has learned what you hope.',
    ambiguous:
      'Of the color I can say only that it was blue, and that I wanted it to be the right ' +
      'blue so badly that I do not trust my own report.',
  },
  speech: {
    true_:
      'She said less than I wanted and better than I asked: that I should go on slowly, ' +
      'and confess often, and that nothing would be given that prayer had not carried.',
    false_:
      'The figure promised everything at once — the whole art, perfected, and soon — and ' +
      'called me by a name more honorable than mine.',
    ambiguous:
      'The words were scriptural, or nearly; I could not afterward find the verse, which ' +
      'proves nothing either way, my memory being what it is.',
  },
  affect: {
    true_: 'When I woke, the room was ordinary and I was at peace with its ordinariness.',
    false_:
      'When I woke I was exalted and restless, and wanted at once to tell someone, and to ' +
      'begin, and to be seen beginning.',
    ambiguous: 'I woke moved and shaking, which the books say may attend either visitor.',
  },
};

export const VISION_SCENE = {
  rubric: '¶ Of the dream that was sought, and what came.',
  body:
    'Having said the prayer and kept the observance, I slept, and a dream rose to meet me ' +
    'the way a fish rises: deliberately. A figure stood in a walled garden that was also, ' +
    'as is the way of dreams, the abbey church. I record the marks of it faithfully, ' +
    'because everything now depends on reading them right.',
  sources: [{ work: 'Newman, Speculum 80 (2005)', locus: 'cultivated visionary experience (frame)' }],
  status: 'adapted',
};

export const DISCERNMENT_OUTCOMES = {
  licentia:
    'I judged it of God, and it was of God. In the morning the license lay in me like gold ' +
    'leaf laid on and burnished: the Work may proceed. Blessed is she who is patient with ' +
    'slow students.',
  delayed:
    'I judged it false, and it was true. She is not wounded by my caution — the books say ' +
    'she prefers it to presumption — but the license is withheld, and the fault of the delay ' +
    'is mine, and it sits in me like a stone of a particular weight.',
  corrupted:
    'I judged it of God. (It was not. Nothing announced this. The work went on, and seemed ' +
    'to prosper, and something rode along inside it the way rot rides in a beam — found ' +
    'only when weight is put on it.)',
  mastery:
    'I judged it false, and it was false, and the naming broke it like a stick. Let it be ' +
    'recorded that the counterfeit cannot abide examination — this is its one honesty.',
};
export const DISCERNMENT_ENVELOPE = {
  sources: [{ work: 'Fanger, Rewriting Magic', locus: 'discretio spirituum in John (frame; verify loci)' }],
  status: 'adapted',
};

// ── Pencil endnotes (reckoning apparatus) ───────────────────────────────
export const PENCIL_NOTES = [
  {
    id: 'note-invented-prayer',
    text:
      'The prayer you recited tonight is my invention. John’s real prayers survive, edited ' +
      'by Fanger and Watson; until I have that volume open on this desk, the database marks ' +
      'this text invented, and refuses to let me pretend otherwise.',
    cites: ['fanger-watson-edition'],
    sources: [{ work: 'Fanger & Watson (eds.), Liber florum', locus: 'edition (pending)' }],
    status: 'attested',
  },
  {
    id: 'note-struggle',
    text:
      'The night system simulates what John actually recorded: sexual temptation, pollution ' +
      'anxiety, and the scruple-spiral that was worse than either. Fanger’s care with this ' +
      'material set the register rules I am writing under. Nothing is depicted; everything ' +
      'is felt. That was her method before it was my mechanic.',
    cites: ['fanger-rewriting'],
    sources: [{ work: 'Fanger, Rewriting Magic', locus: 'frame; loci on Research Queue' }],
    status: 'attested',
  },
  {
    id: 'note-audit',
    text:
      'John audited his own miracles — tested his visions while receiving them. I have made ' +
      'that audit a mechanic with a cost matrix, and I am aware this is a strange thing to ' +
      'do to a man’s recorded inner life. The alternative was to invent a monk, and he ' +
      'deserved better than to be replaced by one.',
    cites: ['fanger-rewriting', 'newman-speculum'],
    sources: [{ work: 'Fanger, Rewriting Magic', locus: 'frame' }],
    status: 'attested',
  },
  {
    id: 'note-witness',
    text:
      'This run has been saved as a witness — your particular Liber florum, with its variants. ' +
      'The real text survived 1323 the same way: copies, in other hands, elsewhere. One of ' +
      'them surfaced at McMaster University and started the modern recovery. Transmission ' +
      'is the victory condition. It always was.',
    cites: ['watson-conjuring'],
    sources: [{ work: 'Watson, in Conjuring Spirits (1998)', locus: 'the rediscovery' }],
    status: 'attested',
  },
];

// ── Daylight choice (compressed hours) ──────────────────────────────────
export const DAYLIGHT = {
  rubric: '¶ Of the day’s work, between Terce and None.',
  body:
    'The hours of the day passed in their order — Terce, Sext, None — brief offices set in ' +
    'work like stones in mortar. The work assigned to me was in the scriptorium; the work ' +
    'not assigned to me was also in the scriptorium, which is the difficulty.',
  choices: {
    labor:
      'Keep to the assigned copying. Obedience is a wall, and walls also shelter.',
    lectio:
      'Steal an hour for the Work — a leaf of the figures, copied quick, quarto hidden under psalter.',
  },
  results: {
    labor:
      'I copied what I was given, and the giving-over of my own will was, for one afternoon, ' +
      'almost restful. Almost.',
    lectio:
      'The leaf is copied and hidden. My hand knew the figures better than my conscience ' +
      'liked. Brother Herbert looked at me once, longer than a look needs to be.',
  },
  sources: [],
  status: 'invented',
};

// ── The journey (world stage) ───────────────────────────────────────────
export const JOURNEY = {
  depart: {
    rubric: '¶ Of the errand to Étampes, after chapter.',
    body:
      'The prior gave me the errand as one gives a coin to a child: kindly, and watching what ' +
      'I did with it. The infirmary wants poppy and the sacristy wants ink, and I want — I ' +
      'record it honestly — the road. A monk outside his wall is a snail out of its shell: ' +
      'quicker, softer, and in season.',
    sources: [],
    status: 'invented',
  },
  officeWild: {
    text:
      'The bell of no church rang it, but the hour rang in me, and I said the office where I ' +
      'stood, the river carrying the psalm downstream to whoever has ears.',
    sources: [],
    status: 'invented',
  },
  officeTown: {
    text:
      'I said the office in the street, hood back, voice level. A monk praying in a market is ' +
      'a spectacle exactly as edifying as it is conspicuous, and the town counted the house I ' +
      'came from twice.',
    sources: [],
    status: 'invented',
  },
  officeMissedLine:
    'The hours I let pass on the road sat in me at evening like unanswered letters.',
  blocked: [
    'The Juine has the right of way here.',
    'The forest keeps its own rule, and does not admit novices.',
    'Wall. The town is firm on the subject.',
  ],
  sources: [],
  status: 'invented',
};

/** The night after the draught: pressure bought with dreamlessness. */
export const DRUGGED_DREAM = {
  rubric: '¶ Of the night under poppy, in which nothing at all was given.',
  body:
    'The draught did what the apothecary promised: it shuttered the house of the mind entire. ' +
    'No siege — and no garden, no figure, no blue of any kind. I woke with the sense of a ' +
    'door having been knocked upon, softly, in a house where no one was home. I do not know ' +
    'who knocked. That is the price, and I paid it in advance, and I will wonder about it ' +
    'for longer than the sleep was worth.',
  sources: [],
  status: 'invented',
};

/** The Radical Axis surfacing (WORLD_DESIGN.md §4) — the pencil hand notices. */
export const RADICAL_NOTE = {
  id: 'note-radical',
  text:
    'That answer is not in any record. John’s audacity ran through visionary channels — ' +
    'authorization, not defiance. Keep pushing in this register and this witness will earn ' +
    'the margin’s gravest annotation: departure from the record. I will mark it when it ' +
    'comes. That is the deal we made, you and I.',
  cites: ['fanger-rewriting'],
  sources: [{ work: 'Fanger, Rewriting Magic', locus: 'John’s stance toward authority (frame)' }],
  status: 'attested',
};

// ── Content note (first launch; canonical wording from STYLE_GUIDE.md) ──
export const CONTENT_NOTE =
  'This game simulates the inner life of a real fourteenth-century monk, John of Morigny, ' +
  'as recorded in his own visionary autobiography: his religious practice, and his ' +
  'struggles with sexual temptation and scrupulosity, in the confessional language of his ' +
  'time. Nothing is explicitly depicted. The historical John is treated throughout with ' +
  'the dignity owed to the dead.';
