(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const zd="tactic",Oa={attack:i=>i.living().length>0,cast:i=>i.grimoire.length>0,room:()=>!0,march:()=>!0},Uo=[{id:"tac-flanking",name:"Flanking",icon:"⚔️",branch:"line",tier:1,capability:"attack",text:"When the party has the numbers, it uses them: +1 damage a round while at least three still stand.",effect:{flankDamage:1,flankMin:3}},{id:"tac-encircle",name:"Encirclement",icon:"🌀",branch:"line",tier:2,capability:"attack",requires:"tac-flanking",text:"Flanking becomes a circle: +3 a round instead of +1, and the thing in the middle swings 2 weaker.",effect:{flankDamage:2,monsterAtk:-2}},{id:"tac-shieldwall",name:"Shield Wall",icon:"🛡️",branch:"line",tier:1,capability:"attack",text:"The party closes ranks: 1 less damage a round, whatever it is standing behind.",effect:{cover:1}},{id:"tac-focusfire",name:"Focused Fire",icon:"🎯",branch:"line",tier:2,capability:"attack",requires:"tac-shieldwall",text:"Everyone hits the same thing in the same place: +1 damage a round, and +4 against anything armoured.",effect:{flankDamage:1,vsArmored:3}},{id:"tac-concentration",name:"Concentration",icon:"🧠",branch:"working",tier:1,capability:"cast",text:"A loosed working is held rather than let go: it keeps its full force each round instead of half.",effect:{sustainFull:!0}},{id:"tac-widening",name:"Widening",icon:"💠",branch:"working",tier:2,capability:"cast",requires:"tac-concentration",text:"The working is let out wide: every combat spell becomes an area working, and the room answers it.",effect:{allSpellsArea:!0}},{id:"tac-quickening",name:"Quickening",icon:"⏱️",branch:"working",tier:1,capability:"cast",text:"One more working goes off before blades are drawn, in every room, not just at the throne.",effect:{extraCast:1}},{id:"tac-wardweaving",name:"Ward-Weaving",icon:"🕸️",branch:"working",tier:2,capability:"cast",requires:"tac-quickening",text:"Every working leaves a ward behind it: 2 less damage a round for each spell loosed this fight.",effect:{wardPerCast:2}},{id:"tac-improvised",name:"Improvised Arms",icon:"🔧",branch:"room",tier:1,capability:"room",text:"The party fights with whatever the room left lying about: +5 to any opening made from the furniture.",effect:{featureOpener:5}},{id:"tac-shove",name:"Shove",icon:"🤜",branch:"room",tier:1,capability:"attack",text:"Drilled to put a thing where the room wants it: any of them can shove a monster onto the spikes, into the pit, into the fire, or down the crack, and it goes in 2 harder.",effect:{hazardShoves:!0,hazardDamage:2}},{id:"tac-pinning",name:"Pinning",icon:"📌",branch:"room",tier:2,capability:"attack",requires:"tac-shove",text:"The shove becomes a place to hold it: 2 more damage from anything the room does to a monster the party put there.",effect:{hazardDamage:2}},{id:"tac-firewatch",name:"Firewatch",icon:"🧯",branch:"room",tier:2,capability:"room",requires:"tac-improvised",text:"A party that sets the room alight knows where the fire will go: it takes nothing back from its own reactions, holds 1 more of the room as cover, and reads a flame trap for 3 less damage.",effect:{noSelfHarm:!0,fireTrapSoak:3,cover:1}},{id:"tac-rationing",name:"Rationing",icon:"🕯️",branch:"march",tier:1,capability:"march",text:"The lamp is trimmed and the oil is measured: one more march of light before the dark.",effect:{supply:1}},{id:"tac-coldcamp",name:"Cold Camp",icon:"🏕️",branch:"march",tier:2,capability:"march",requires:"tac-rationing",text:"No fire, no smell of food, watches kept: a camp at the stairhead costs one supply instead of two, and nothing climbs the stair into it.",effect:{campSupply:1,campWatched:!0}},{id:"tac-fieldsurgery",name:"Field Surgery",icon:"✚",branch:"march",tier:2,capability:"march",requires:"tac-rationing",text:"Somebody learned to set a break on the road: two wounds close at every shrine, not only in town.",effect:{mendAtShrine:2}}],_h=Uo.map(i=>({id:i.id,type:zd,name:i.name,icon:i.icon,branch:i.branch,tier:i.tier,capability:i.capability,requires:i.requires||null,text:i.text}));function Rs(i){return Uo.find(e=>e.id===i)||null}function Cs(i){const e=new Set((i.tactics||[]).map(t=>t.id));return(i.tactics||[]).filter(t=>{const n=Rs(t.id);if(!n)return!1;const s=Oa[n.capability];return!(s&&!s(i)||n.requires&&!e.has(n.requires))})}function fl(i){const e=new Set((i.tactics||[]).map(n=>n.id)),t=[];for(const n of i.tactics||[]){const s=Rs(n.id);s&&(s.requires&&!e.has(s.requires)?t.push({tactic:s,reason:"requires",missing:Rs(s.requires)}):Oa[s.capability]&&!Oa[s.capability](i)&&t.push({tactic:s,reason:"capability",capability:s.capability}))}return t}function Un(i){const e={flankDamage:0,flankMin:99,cover:0,monsterAtk:0,vsArmored:0,extraCast:0,wardPerCast:0,featureOpener:0,supply:0,mendAtShrine:0,fireTrapSoak:0,campSupply:0,hazardDamage:0,sustainFull:!1,allSpellsArea:!1,noSelfHarm:!1,campWatched:!1,hazardShoves:!1,live:[]};for(const t of Cs(i)){const n=Rs(t.id),s=n.effect||{};e.flankDamage+=s.flankDamage||0,s.flankMin&&(e.flankMin=Math.min(e.flankMin,s.flankMin)),e.cover+=s.cover||0,e.monsterAtk+=s.monsterAtk||0,e.vsArmored+=s.vsArmored||0,e.extraCast+=s.extraCast||0,e.wardPerCast+=s.wardPerCast||0,e.featureOpener+=s.featureOpener||0,e.supply+=s.supply||0,e.mendAtShrine+=s.mendAtShrine||0,e.fireTrapSoak+=s.fireTrapSoak||0,e.campSupply+=s.campSupply||0,e.hazardDamage+=s.hazardDamage||0,s.campWatched&&(e.campWatched=!0),s.hazardShoves&&(e.hazardShoves=!0),s.sustainFull&&(e.sustainFull=!0),s.allSpellsArea&&(e.allSpellsArea=!0),s.noSelfHarm&&(e.noSelfHarm=!0),e.live.push(n)}return e.flankDamage>0&&e.flankMin===99&&(e.flankMin=3),e}const Y={CHARACTER:"character",EQUIPMENT:"equipment",SPELL:"spell",PERSONALITY:"personality",TACTIC:"tactic"},q={FIGHTER:"fighter",CLERIC:"cleric",WIZARD:"wizard",ROGUE:"rogue",ALCHEMIST:"alchemist"},wt={SIGIL:"sigil",ESCAPE:"escape",HARMONY:"harmony",CONJURATION:"conjuration",ASTROLOGY:"astrology",MEMORY:"memory",CORRESPONDENCE:"correspondence",ACQUISITION:"acquisition",CIPHER:"cipher",TRANSMUTATION:"transmutation",EMBLEM:"emblem",NUMEROLOGY:"numerology",NATURAL:"natural"},Oo=[{id:"char-agrippa",type:Y.CHARACTER,class:q.FIGHTER,discipline:wt.SIGIL,name:"Cornelius Agrippa",icon:"⚔️",stats:{health:14,attack:4,defense:3,mind:2},trait:"A soldier's occult philosophy: sigils cut into plain steel, and a bench wherever he kneels.",capabilities:["knowledge","correspondence","alchemy","conjuring"]},{id:"char-sendivogius",type:Y.CHARACTER,class:q.FIGHTER,discipline:wt.ESCAPE,name:"Michael Sendivogius",icon:"⚔️",stats:{health:13,attack:4,defense:4,mind:1},trait:"Has talked and cut his way out of worse than this dungeon. Twice out of the same castle.",capabilities:["rogue","tactics","navigation","diplomacy"]},{id:"char-brahe",type:Y.CHARACTER,class:q.FIGHTER,discipline:wt.ASTROLOGY,name:"Tycho Brahe",icon:"⚔️",stats:{health:13,attack:5,defense:2,mind:3},trait:"As quick to duel over a star-chart as to draw one. The false nose has never slowed his sword arm.",capabilities:["tinkering","astronomy","observation","experimentation"]},{id:"char-napier",type:Y.CHARACTER,class:q.FIGHTER,discipline:wt.NUMEROLOGY,name:"John Napier",icon:"⚔️",stats:{health:15,attack:3,defense:3,mind:3},trait:"The Laird of Merchiston defends his own estate. The neighbours whisper of a black familiar; he keeps better numbers.",capabilities:["mathematics","tactics","knowledge","observation"]},{id:"char-ficino",type:Y.CHARACTER,class:q.CLERIC,discipline:wt.HARMONY,name:"Marsilio Ficino",icon:"✨",stats:{health:14,attack:2,defense:3,mind:6},trait:"Sings the wounded steady with astral harmony; a shrine under his hand mends deeper.",capabilities:["music","harmony","healing","translation"]},{id:"char-dee",type:Y.CHARACTER,class:q.CLERIC,discipline:wt.CONJURATION,name:"John Dee",icon:"✨",stats:{health:13,attack:2,defense:3,mind:7},trait:"Would rather question the restless dead than destroy them — and they usually answer.",capabilities:["conjuring","divination","astronomy","mathematics"]},{id:"char-forman",type:Y.CHARACTER,class:q.CLERIC,discipline:wt.ASTROLOGY,name:"Simon Forman",icon:"✨",stats:{health:14,attack:3,defense:2,mind:6},trait:"Reads a wound by the stars it was struck under. His remedies run stronger for it.",capabilities:["astronomy","divination","medicine","healing"]},{id:"char-bruno",type:Y.CHARACTER,class:q.WIZARD,discipline:wt.MEMORY,name:"Giordano Bruno",icon:"🔮",stats:{health:12,attack:2,defense:2,mind:10},trait:"His memory palace has room for one more working than anyone else's head.",capabilities:["memory","imagination","correspondence","conjuring"]},{id:"char-pico",type:Y.CHARACTER,class:q.WIZARD,discipline:wt.CORRESPONDENCE,name:"Pico della Mirandola",icon:"🔮",stats:{health:13,attack:2,defense:2,mind:9},trait:"Finds the thread joining every school of magic, and pulls it.",capabilities:["debate","syncretism","translation","knowledge"]},{id:"char-cavendish",type:Y.CHARACTER,class:q.WIZARD,discipline:wt.NATURAL,name:"Margaret Cavendish",icon:"🔮",stats:{health:12,attack:2,defense:3,mind:8},trait:"Trusts the microscope as much as the grimoire — a non-occult answer for half the dungeon's magical problems.",capabilities:["naturalPhilosophy","experimentation","imagination","alchemy"]},{id:"char-digby",type:Y.CHARACTER,class:q.ROGUE,discipline:wt.ACQUISITION,name:"Kenelm Digby",icon:"🗡️",stats:{health:12,attack:4,defense:2,mind:6},trait:"Courtier, privateer, and collector: a pirate's eye for what is actually worth taking.",capabilities:["diplomacy","fencing","antiquarian","appraisal"]},{id:"char-trithemius",type:Y.CHARACTER,class:q.ROGUE,discipline:wt.CIPHER,name:"Johannes Trithemius",icon:"🗡️",stats:{health:11,attack:4,defense:3,mind:5},trait:"Buried ciphers in mechanisms long before anyone thought to look there. Alarms he passes stay silent.",capabilities:["telepathy","tactics","mathematics","knowledge"]},{id:"char-fludd",type:Y.CHARACTER,class:q.ROGUE,discipline:wt.ASTROLOGY,name:"Robert Fludd",icon:"🗡️",stats:{health:11,attack:5,defense:2,mind:5},trait:"Reads the stars over a room before he reads the room. Nothing in a hoard stays hidden long.",capabilities:["music","medicine","astronomy","appraisal"]},{id:"char-paracelsus",type:Y.CHARACTER,class:q.ALCHEMIST,discipline:wt.TRANSMUTATION,name:"Paracelsus",icon:"⚗️",stats:{health:13,attack:3,defense:2,mind:7},trait:"Brews at any bench he finds, and has burned down three academies' worth of orthodoxy doing it.",capabilities:["alchemy","medicine","naturalPhilosophy","experimentation"]},{id:"char-maier",type:Y.CHARACTER,class:q.ALCHEMIST,discipline:wt.EMBLEM,name:"Michael Maier",icon:"⚗️",stats:{health:12,attack:2,defense:3,mind:8},trait:"Sets the Work to music: fifty emblems, fifty fugues, and two flasks where others draw one.",capabilities:["alchemy","correspondence","music","knowledge"]},{id:"char-cortese",type:Y.CHARACTER,class:q.ALCHEMIST,discipline:wt.TRANSMUTATION,name:"Isabella Cortese",icon:"⚗️",stats:{health:13,attack:3,defense:3,mind:5},trait:"Her book of secrets went through edition after edition because the recipes in it actually work.",capabilities:["alchemy","medicine","appraisal","experimentation"]}],Fo=[{id:"eq-tower-shield",type:Y.EQUIPMENT,name:"Tower Shield",icon:"🛡️",slot:"armor",bonus:{defense:3},bestFor:q.FIGHTER,text:"A wall with a handle.",capabilities:["tactics"]},{id:"eq-greatsword",type:Y.EQUIPMENT,name:"Greatsword of the Vault",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:q.FIGHTER,text:"Found in a vault. Wants to go back. Long enough to take a whole swarm at once: 3 more damage a round against anything that comes in numbers.",capabilities:["tinkering"]},{id:"eq-blessed-mace",type:Y.EQUIPMENT,name:"Blessed Mace",icon:"🔨",slot:"weapon",bonus:{attack:2,mind:1},bestFor:q.CLERIC,text:"Persuasion, sanctified. Consecrates a room as it swings: nothing climbs out of the sarcophagus while it is in hand.",capabilities:["diplomacy"]},{id:"eq-grimoire",type:Y.EQUIPMENT,name:"Grimoire of Low Whispers",icon:"📖",slot:"focus",bonus:{mind:3},bestFor:q.WIZARD,text:"The margins argue with the text.",capabilities:["knowledge","correspondence","memory"]},{id:"eq-lockpicks",type:Y.EQUIPMENT,name:"Masterwork Lockpicks",icon:"🗝️",slot:"tool",bonus:{mind:2},bestFor:q.ROGUE,text:"Every door is a suggestion.",capabilities:["rogue"]},{id:"eq-alembic",type:Y.EQUIPMENT,name:"Portable Alembic",icon:"⚗️",slot:"tool",bonus:{mind:2},bestFor:q.ALCHEMIST,text:"A lab that fits in a satchel. Labs found in the dungeon work better, and a material can be cooked down into two marches of lamp oil.",capabilities:["alchemy","experimentation"]},{id:"eq-chainmail",type:Y.EQUIPMENT,name:"Dwarven Chainmail",icon:"🥋",slot:"armor",bonus:{defense:2},bestFor:null,text:"Fits anyone brave enough to wear it. Takes the worst of a blow, so fewer of them leave a lasting scar."},{id:"eq-boots",type:Y.EQUIPMENT,name:"Boots of the Quiet Step",icon:"👢",slot:"boots",bonus:{defense:1,mind:1},bestFor:q.ROGUE,text:"The floorboards never learn your name.",capabilities:["observation"]},{id:"eq-lantern",type:Y.EQUIPMENT,name:"Everburning Lantern",icon:"🏮",slot:"tool",bonus:{mind:1,defense:1},bestFor:q.CLERIC,text:"Reveals hazards one room ahead, and sips its oil: the party burns supply every other march instead of every one.",capabilities:["observation","navigation"]},{id:"eq-throwing-knives",type:Y.EQUIPMENT,name:"Bandolier of Knives",icon:"🔪",slot:"weapon",bonus:{attack:2},bestFor:q.ROGUE,text:"Six answers to most questions, and they arrive before the asking: 4 damage thrown before the first round.",capabilities:["fencing"]},{id:"eq-warded-buckler",type:Y.EQUIPMENT,name:"Warded Buckler",icon:"🛡️",slot:"armor",bonus:{defense:2,mind:1},bestFor:q.CLERIC,text:"The prayers are etched on the inside, where they matter. Whatever the party sets off in a room, half of it does not come back on them.",capabilities:["knowledge"]},{id:"eq-quicksilver-daggers",type:Y.EQUIPMENT,name:"Quicksilver Daggers",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:q.ROGUE,text:"They land before the argument starts: the party takes no damage in the first round of a fight.",capabilities:["rogue","fencing"]},{id:"eq-athanor-charm",type:Y.EQUIPMENT,name:"Athanor Charm",icon:"🔥",slot:"tool",bonus:{mind:2},bestFor:q.ALCHEMIST,text:"A furnace in miniature, always exactly warm enough. Anything the party sets alight burns 2 harder for the rest of the fight.",capabilities:["alchemy"]},{id:"eq-wand-embers",type:Y.EQUIPMENT,name:"Wand of Embers",icon:"🪄",slot:"focus",bonus:{mind:1},bestFor:q.WIZARD,text:"Warm to any hand. What comes out depends on whose.",classActions:{[q.FIGHTER]:{name:"Ember Shot",opening:4},[q.WIZARD]:{name:"Meteor Fall",opening:8},[q.CLERIC]:{name:"Flame Ward",ward:1},[q.ROGUE]:{name:"Smoke Veil",ward:1},[q.ALCHEMIST]:{name:"Accelerant Charge",opening:5}}},{id:"eq-holy-symbol",type:Y.EQUIPMENT,name:"Holy Symbol of Dawn",icon:"☀️",capabilities:["harmony","healing"],slot:"focus",bonus:{mind:1},bestFor:q.CLERIC,text:"Protection for most. Authority for some. A bad idea for one.",classActions:{[q.FIGHTER]:{name:"Shield of Faith",ward:1},[q.ROGUE]:{name:"Veil of Shadows",ward:1},[q.CLERIC]:{name:"Radiant Smite",opening:3,vsUndead:6},[q.WIZARD]:{name:"Animate Corpse",summonAttack:3},[q.ALCHEMIST]:{name:"Blessed Reagents",opening:2}}},{id:"eq-prybar",type:Y.EQUIPMENT,name:"Ironwood Prybar",icon:"🪝",slot:"tool",bonus:{attack:1,defense:1},bestFor:q.FIGHTER,text:"Opens sarcophagi, crates and rubble. Doubles as an argument."},{id:"eq-grapple",type:Y.EQUIPMENT,name:"Grapple and Line",icon:"🪢",slot:"tool",bonus:{mind:1,defense:1},bestFor:q.ROGUE,text:"Forty feet of good rope. Pits become options; a shaft becomes a stairway."},{id:"eq-tinderbox",type:Y.EQUIPMENT,name:"Alchemist's Tinderbox",icon:"🔥",slot:"tool",bonus:{attack:1,mind:1},bestFor:q.ALCHEMIST,text:"Lights braziers, shelves, and anything else the room has generously left flammable."},{id:"eq-winch-hook",type:Y.EQUIPMENT,name:"Winch Hook",icon:"⚓",slot:"tool",bonus:{attack:2},bestFor:q.ROGUE,text:"For chains, cranks and portcullises. Whatever the dungeon raised can be dropped."},{id:"eq-smiths-kit",type:Y.EQUIPMENT,name:"Field Smith's Kit",icon:"🔨",slot:"tool",bonus:{attack:1,defense:1},bestFor:q.FIGHTER,text:"Hammer, file, flux. Useless in a corridor; worth a sword at an anvil."},{id:"eq-waterskin",type:Y.EQUIPMENT,name:"Great Waterskin",icon:"🫗",slot:"tool",bonus:{defense:1,mind:1},bestFor:null,text:"Holds four days. Wounds get washed, venom gets flushed, fonts get emptied."},{id:"eq-silvered-mirror",type:Y.EQUIPMENT,name:"Silvered Hand-Mirror",icon:"🪞",capabilities:["antiquarian","observation"],slot:"focus",bonus:{mind:2},bestFor:q.CLERIC,text:"Shows what is standing there rather than what wants to be seen."},{id:"eq-cursed-blade",type:Y.EQUIPMENT,name:"Blade of the Adder",icon:"🐍",slot:"weapon",bonus:{attack:4,defense:-2},bestFor:q.FIGHTER,cursed:!0,text:"It whispers where to cut. It is usually right. It never says about what. Its bearer has lived with venom long enough that the party shrugs off the venomous."},{id:"eq-haunted-armor",type:Y.EQUIPMENT,name:"Haunted Armor",icon:"👻",slot:"armor",bonus:{defense:3,mind:-1},bestFor:q.FIGHTER,cursed:!0,text:"A chill down the spine — but the resident ghost hates monsters more than it hates you.",classActions:{[q.FIGHTER]:{name:"The Ghost Objects",summonAttack:1},[q.CLERIC]:{name:"The Ghost Objects",summonAttack:1},[q.WIZARD]:{name:"The Ghost Objects",summonAttack:1},[q.ROGUE]:{name:"The Ghost Objects",summonAttack:1},[q.ALCHEMIST]:{name:"The Ghost Objects",summonAttack:1}}}],ks=[{id:"sp-firebolt",type:Y.SPELL,name:"Firebolt",icon:"🔥",school:"evocation",element:"fire",power:4,use:"combat",text:"Opens combat with 4 damage before blades are drawn, and goes on burning while the fight lasts."},{id:"sp-mend",type:Y.SPELL,name:"Mending Word",icon:"💚",school:"restoration",power:5,use:"heal",text:"Restores 5 health to the most wounded companion the moment the fight turns against them, then keeps mending while it holds."},{id:"sp-knock",type:Y.SPELL,name:"Knock",icon:"🚪",school:"transmutation",power:3,use:"utility",text:"Opens any lock. Loudly."},{id:"sp-shield",type:Y.SPELL,name:"Aegis of Ash",icon:"🛡️",school:"abjuration",power:3,use:"combat",text:"Blunts every blow of the fight, not just the first."},{id:"sp-light",type:Y.SPELL,name:"Dancing Light",icon:"💡",school:"evocation",power:2,use:"utility",text:"Reveals traps and ambushes in the next room — and once the oil is gone, carries the party through a march of dark for free."},{id:"sp-fear",type:Y.SPELL,name:"Cause Fear",icon:"😱",school:"necromancy",power:4,use:"combat",text:"Weak monsters flee before the fight begins."},{id:"sp-chain",type:Y.SPELL,name:"Chain Lightning",icon:"⚡",school:"evocation",element:"shock",power:5,use:"combat",aoe:!0,text:"Arcs from foe to foe until it runs out of foes or enthusiasm — and through anything wet or metal on the way."},{id:"sp-frost",type:Y.SPELL,name:"Frost Lance",icon:"❄️",school:"evocation",element:"frost",power:5,use:"combat",text:"Cold, precise, and deeply personal."},{id:"sp-sunder",type:Y.SPELL,name:"Sunder",icon:"💢",school:"transmutation",power:4,use:"combat",text:"Armor remembers being ore. This spell reminds it, and plate stops turning blows for the rest of the fight."},{id:"sp-radiance",type:Y.SPELL,name:"Radiant Lance",icon:"🌟",school:"theurgy",element:"holy",power:4,use:"combat",text:"A line of noon driven through whatever the dark is wearing."},{id:"sp-balm",type:Y.SPELL,name:"Balm of Hours",icon:"🌾",school:"restoration",power:6,use:"heal",text:"Borrows healing from a quieter week and spends it mid-fight, then goes on spending."},{id:"sp-eyes",type:Y.SPELL,name:"Eyes of the Mouse",icon:"👁️",school:"divination",power:2,use:"utility",text:"See what the small and cautious see. It is a lot, and it is just as much in the dark: the party never pays what the dark charges.",capabilities:["divination","telepathy"]},{id:"sp-feather",type:Y.SPELL,name:"Feather Step",icon:"🪶",school:"transmutation",power:3,use:"utility",text:"The floor agrees to pretend nobody is on it: 3 less damage from anything underfoot, and no stumbling in the dark."},{id:"sp-shatter",type:Y.SPELL,name:"Shatter",icon:"🪨",school:"transmutation",element:"frost",power:4,use:"combat",aoe:!0,text:"Stone remembers being loose, and cold reminds it. Pillars, boulders and bad ceilings all listen."},{id:"sp-kindle",type:Y.SPELL,name:"Kindle",icon:"🕯️",school:"evocation",element:"fire",power:3,use:"combat",aoe:!0,text:"Lights any fire in the room from across it — braziers, crates, shelves, and whatever is standing near one."},{id:"sp-fireball",type:Y.SPELL,name:"Fireball",icon:"🔥",school:"evocation",element:"fire",power:5,use:"combat",aoe:!0,text:"It does not stop at the monster. Whatever else in the room will burn, burns."},{id:"sp-hoarfrost",type:Y.SPELL,name:"Hoarfrost",icon:"🧊",school:"evocation",element:"frost",power:4,use:"combat",aoe:!0,text:"The cold goes everywhere at once: into the water, into the fire, into the cracks in the stone."},{id:"sp-dawnbreak",type:Y.SPELL,name:"Dawnbreak",icon:"🌟",school:"theurgy",element:"holy",power:4,use:"combat",aoe:!0,text:"Noon, indoors, all at once. Old stone and old glass both answer it.",capabilities:["syncretism"]},{id:"sp-purify",type:Y.SPELL,name:"Purify the Font",icon:"⛲",school:"theurgy",power:4,use:"heal",text:"Still water, said over and made willing — poured out when someone is failing, and again each round after. Best where the dungeon left a font.",capabilities:["debate","healing"]}],Dr=[{id:"pers-brave",type:Y.PERSONALITY,name:"The Bold",icon:"🦁",archetype:"brave",text:"Fights before fleeing; opens the ominous door. Walks the dark like a road it knows: 1 less damage a march."},{id:"pers-cunning",type:Y.PERSONALITY,name:"The Cunning",icon:"🦊",archetype:"cunning",text:"Prefers the trap disarmed, the guard bribed, the fight skipped. Trims the wick without being asked: 2 more marches of oil."},{id:"pers-greedy",type:Y.PERSONALITY,name:"The Covetous",icon:"💰",archetype:"greedy",text:"Never leaves treasure behind. Never — not even blind, which costs it 1 more damage a march in the dark."},{id:"pers-scholarly",type:Y.PERSONALITY,name:"The Scholarly",icon:"📚",archetype:"scholarly",text:"Reads everything; lingers in libraries; learns extra spells. Wastes no light doing it: 1 more march of oil."},{id:"pers-pious",type:Y.PERSONALITY,name:"The Devout",icon:"🕯️",archetype:"pious",text:"Rests at shrines; heals more; abhors desecration. Tends what the dungeon opens, so fewer blows leave a lasting scar."},{id:"pers-reckless",type:Y.PERSONALITY,name:"The Reckless",icon:"💥",archetype:"reckless",text:"Rushes in. Sometimes that works. Gloriously. Never stops to bind anything, so more of it stays as scars."},{id:"pers-craven",type:Y.PERSONALITY,name:"The Craven",icon:"🐔",archetype:"craven",trap:!0,text:"Avoids every fight it can. Notices every exit — and every tripwire. Skipped fights pay no spoils. Creeps in the dark and pays 1 more for it, but packed 2 marches of spare oil."},{id:"pers-tinkerer",type:Y.PERSONALITY,name:"The Tinkerer",icon:"🔧",archetype:"cunning",text:"Touches everything in the room: the chain, the lid, the lever. Uses the architecture as a weapon."},{id:"pers-vandal",type:Y.PERSONALITY,name:"The Vandal",icon:"🪓",archetype:"reckless",text:"If a thing in the room can be toppled, burned, or dropped on someone, it will be."}];function Hd(){return[...Oo,...Fo,...ks,...Dr,..._h]}function $d(i){return Hd().find(e=>e.id===i)||null}const Gd=.25,Vd=2;let Wd=1;class Fa{constructor(e){this.uid=`adv-${Wd++}`,this.id=e.id,this.card=e,this.name=e.name,this.cardName=e.name,this.class=e.class,this.icon=e.icon,this.trait=e.trait||"",this.givenName=null,this.backstory="",this.maxHealth=e.stats.health,this.wounds=0,this.woundBias=0,this.health=e.stats.health,this.baseAttack=e.stats.attack,this.baseDefense=e.stats.defense,this.baseMind=e.stats.mind,this.equipment=[],this.weaponMods=[],this.alive=!0}get attack(){var t;let e=this.baseAttack;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.attack)||0;for(const n of this.weaponMods)e+=n.attack||0;return e}get defense(){var t;let e=this.baseDefense;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.defense)||0;return e}get mind(){var t;let e=this.baseMind;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.mind)||0;return e}takeDamage(e){const t=this.health>this.woundFloor();if(this.health=Math.max(0,this.health-e),this.health<=0){this.alive=!1;return}const n=this.maxHealth*Gd*(1+(this.woundBias||0));t&&e>=n&&this.wounds++}woundFloor(){return Math.ceil(this.maxHealth/3)}effectiveMax(){return Math.max(this.woundFloor(),this.maxHealth-this.wounds*Vd)}heal(e){this.alive&&(this.health=Math.min(this.effectiveMax(),this.health+e))}mendWounds(e=1/0){this.wounds=Math.max(0,this.wounds-e)}toJSON(){return{uid:this.uid,id:this.id,name:this.name,givenName:this.givenName,backstory:this.backstory,health:this.health,wounds:this.wounds,alive:this.alive,equipment:this.equipment.map(e=>({...e})),weaponMods:this.weaponMods.map(e=>({...e}))}}rename(e){const t=String(e||"").trim().slice(0,40);return this.givenName=t||null,this.name=t||this.cardName,this.name}setBackstory(e){return this.backstory=String(e||"").trim().slice(0,400),this.backstory}restore(e,t=()=>null){if(!e)return this;this.uid=e.uid||this.uid,this.name=e.name??this.name,this.givenName=e.givenName??null,this.backstory=e.backstory||"",this.health=Math.min(this.maxHealth,e.health??this.health),this.wounds=e.wounds??0,this.alive=e.alive!==!1;const n=s=>s&&(t(s.id)||s)||null;return this.equipment=(e.equipment||[]).map(n).filter(Boolean),this.weaponMods=(e.weaponMods||[]).map(n).filter(Boolean),this}isAlive(){return this.alive&&this.health>0}equip(e){this.equipment.push(e)}addWeaponMod(e){this.weaponMods.push(e)}}function qd(){return new Fa({id:"char-volunteer",name:"Pip the Tavern Volunteer",class:q.FIGHTER,icon:"🍺",stats:{health:10,attack:2,defense:1,mind:2},trait:"Nobody drafted a hero, so Pip grabbed a stool leg and came along."})}const Xd={brave:{dark:-1,text:"The Bold walk the dark like a road they know. It costs them less than it should.",supplyText:null},craven:{dark:1,supply:2,text:"The Craven creep, and the dark takes its time with them.",supplyText:"The Craven packed more oil than anyone thought necessary. Nobody is laughing now."},greedy:{dark:1,text:"The Covetous will not leave a room unsearched, even blind. It costs them.",supplyText:null},cunning:{supply:2,text:null,supplyText:"The Cunning trimmed the wick and measured the oil before anyone asked."},pious:{wound:.35,text:null,woundText:"The Devout tend what the dungeon opens: fewer blows leave a mark that stays.",supplyText:null},reckless:{wound:-.25,text:null,woundText:"The Reckless do not stop to bind anything, and more of it stays with them.",supplyText:null},scholarly:{supply:1,text:null,supplyText:"The Scholarly read the passage before walking it, and wasted no light doing it."}};function mr(i){const e={dark:0,supply:0,wound:0,notes:[],supplyNotes:[],woundNotes:[]};for(const t of i.personalities||[]){const n=Xd[t];n&&(e.dark+=n.dark||0,e.supply+=n.supply||0,e.wound+=n.wound||0,n.text&&e.notes.push({archetype:t,text:n.text}),n.supplyText&&e.supplyNotes.push({archetype:t,text:n.supplyText}),n.woundText&&e.woundNotes.push({archetype:t,text:n.woundText}))}return e}const yn=4,pl=8,ns=3,ml={easy:1.1,medium:.85,hard:.7,nightmare:.55};class ai{constructor(e){const t={},n=e.filter(o=>o.type===Y.CHARACTER).map(o=>{const a=new Fa(o);if(t[o.name]=(t[o.name]||0)+1,t[o.name]>1){const c=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"][Math.min(t[o.name]-1,5)];a.name=`${o.name}, ${c}`}return a});this.members=n.slice(0,yn),this.reserve=n.slice(yn),this.members.length===0&&this.members.push(qd()),this.grimoire=e.filter(o=>o.type===Y.SPELL).map(o=>({...o,source:"prepared"})),this.castThisRoom=new Set;const s=new Set;this.tactics=e.filter(o=>o.type==="tactic").filter(o=>!s.has(o.id)&&s.add(o.id)).map(o=>({...o})),this.duplicateTactics=e.filter(o=>o.type==="tactic").length-this.tactics.length,this.personalities=e.filter(o=>o.type===Y.PERSONALITY).map(o=>o.archetype),this.applyTemper();const r=e.filter(o=>o.type===Y.EQUIPMENT);for(const o of r)this.assignEquipment(o);this.pack=[],this.keys=[],this.supply=pl,this.marches=0,this.materials=0,this.potions=[],this.trophies=[],this.gold=0,this.score=0,this.spellsLearned=0,this.encounterHistory={}}assignEquipment(e){const t=this.living();if(t.length===0)return null;let n=null;if(e.bestFor){const s=t.filter(r=>r.class===e.bestFor);s.length>0&&(n=s.reduce((r,o)=>r.equipment.length<=o.equipment.length?r:o))}return n||(n=t.reduce((s,r)=>s.equipment.length<=r.equipment.length?s:r)),n.equip(e),this.personalities&&this.applyTemper(),n}equipTo(e,t){const n=[...this.members,...this.reserve].find(a=>a.name===t);if(!n)return null;let s=null,r=null;for(const a of[...this.members,...this.reserve]){const l=a.equipment.findIndex(c=>c.id===e);if(l>=0){s=a,r=a.equipment[l];break}}if(!r){const a=this.pack.findIndex(l=>l.id===e);if(a<0)return null;r=this.pack[a]}if(s===n)return{moved:r,from:n,to:n,displaced:null};let o=null;if(r.slot){const a=n.equipment.findIndex(l=>l.slot===r.slot);a>=0&&(o=n.equipment.splice(a,1)[0])}return s?s.equipment=s.equipment.filter(a=>a.id!==e):this.pack=this.pack.filter(a=>a.id!==e),n.equip(r),o&&(s&&!s.equipment.some(l=>l.slot===o.slot)?s.equip(o):this.pack.push(o)),this.applyTemper(),{moved:r,from:s,to:n,displaced:o}}takeKey(e){return!e||this.keys.some(t=>t.wing===e.wing)?null:(this.keys.push({...e}),e)}hasKey(e){return this.keys.some(t=>t.wing===e)}unequip(e){for(const t of[...this.members,...this.reserve]){const n=t.equipment.findIndex(s=>s.id===e);if(n>=0){const[s]=t.equipment.splice(n,1);return this.pack.push(s),this.applyTemper(),s}}return null}assignCaster(e,t){const n=this.grimoire.find(r=>r.id===e);if(!n)return null;if(!t)return delete n.casterUid,delete n.casterName,n;const s=this.members.find(r=>r.name===t||r.uid===t);return s?(n.casterUid=s.uid,n.casterName=s.name,n):null}casterOf(e){return e!=null&&e.casterUid&&this.living().find(t=>t.uid===e.casterUid)||null}renameMember(e,t){if(!e)return null;const n=e.rename(t);for(const s of this.grimoire)s.casterUid===e.uid&&(s.casterName=n);return n}mindFor(e){const t=this.casterOf(e);return t?t.mind:this.bestMind()}toJSON(){return{members:this.members.map(e=>e.toJSON()),reserve:this.reserve.map(e=>e.toJSON()),grimoire:this.grimoire.map(e=>({...e})),tactics:this.tactics.map(e=>({...e})),personalities:[...this.personalities],trophies:this.trophies.map(e=>({...e})),gold:this.gold,score:this.score,materials:this.materials,potions:this.potions.map(e=>({...e})),pack:this.pack.map(e=>({...e})),keys:this.keys.map(e=>({...e})),supply:this.supply,spellsLearned:this.spellsLearned,poisonLinger:this.poisonLinger||0,alarmed:!!this.alarmed,desecrated:!!this.desecrated}}static fromJSON(e,t){const n=[];for(const l of e.members||[]){const c=t(l.id);c&&n.push(c)}for(const l of e.reserve||[]){const c=t(l.id);c&&n.push(c)}const s=new ai(n),r=[...s.members,...s.reserve],o=[...e.members||[],...e.reserve||[]];r.forEach((l,c)=>l.restore(o[c],t));const a=l=>l&&{...t(l.id)||{},...l};return s.grimoire=(e.grimoire||[]).map(a).filter(Boolean),s.tactics=(e.tactics||[]).map(a).filter(Boolean),s.personalities=[...e.personalities||[]],s.trophies=(e.trophies||[]).map(l=>({...l})),s.gold=e.gold||0,s.score=e.score||0,s.materials=e.materials||0,s.potions=(e.potions||[]).map(l=>({...l})),s.pack=(e.pack||[]).map(a).filter(Boolean),s.keys=(e.keys||[]).map(l=>({...l})),s.supply=e.supply??s.supply,s.spellsLearned=e.spellsLearned||0,s.poisonLinger=e.poisonLinger||0,s.alarmed=!!e.alarmed,s.desecrated=!!e.desecrated,s}applyTemper(){const e=mr(this).wound;for(const t of[...this.members,...this.reserve]){const n=t.equipment.some(s=>s.id==="eq-chainmail")?.3:0;t.woundBias=e+n}return e}capabilities(){var t;const e=new Set;for(const n of[...this.members,...this.reserve]){const s=((t=n.card)==null?void 0:t.capabilities)||[];for(const r of s)e.add(r);for(const r of n.equipment){const o=r.capabilities||[];for(const a of o)e.add(a)}}for(const n of this.pack||[])for(const s of n.capabilities||[])e.add(s);for(const n of this.grimoire||[])for(const s of n.capabilities||[])e.add(s);return e}hasCapability(e){return this.capabilities().has(e)}capabilityHolders(e){var n;const t=[];for(const s of[...this.members,...this.reserve]){(((n=s.card)==null?void 0:n.capabilities)||[]).includes(e)&&t.push({member:s,source:"character"});for(const o of s.equipment)(o.capabilities||[]).includes(e)&&t.push({member:s,source:"equipment",equipment:o})}for(const s of this.grimoire||[])(s.capabilities||[]).includes(e)&&t.push({member:{name:"the grimoire"},source:"spell",equipment:s});return t}living(){return this.members.filter(e=>e.isAlive())}addMember(e){const t=new Fa(e),n=[...this.members,...this.reserve].filter(s=>s.name.startsWith(e.name)).length;if(n>0){const s=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"];t.name=`${e.name}, ${s[Math.min(n,5)]}`}return this.living().length>=yn?this.reserve.push(t):this.members.push(t),t}isBenched(e){return this.reserve.includes(e)}promoteReserve(){if(this.reserve.length===0||this.living().length>=yn)return null;const e=this.reserve.shift();return this.members.push(e),e}isAlive(){return this.living().length>0}size(){return this.living().length}hasClass(e){return this.living().some(t=>t.class===e)}hasPersonality(e){return this.personalities.includes(e)}totalAttack(){return this.living().reduce((e,t)=>e+t.attack,0)}combatAttack(e=yn){const t=Math.max(1,Math.min(e,yn)),n=this.living().map(o=>o.attack).sort((o,a)=>a-o),s=n.slice(0,t).reduce((o,a)=>o+a,0),r=n.slice(t).reduce((o,a)=>o+a,0);return Math.round(s+r*.25)}totalDefense(){return this.living().reduce((e,t)=>e+t.defense,0)}bestMind(){return Math.max(0,...this.living().map(e=>e.mind))}totalHealth(){return this.living().reduce((e,t)=>e+t.health,0)}totalMaxHealth(){return this.members.reduce((e,t)=>e+t.maxHealth,0)}coatingBonusVs(e){let t=0;const n=new Set;for(const s of this.living())for(const r of s.weaponMods)r.element&&((e.weak||[]).includes(r.element)||r.element==="holy"&&e.undead)?(t+=2,n.add(r.name)):r.venom&&!e.undead&&(t+=1,n.add(r.name));return{bonus:t,notes:[...n]}}combatItemActions(){var t;const e=[];for(const n of this.living())for(const s of n.equipment){const r=(t=s.classActions)==null?void 0:t[n.class];r&&e.push({member:n.name,item:s.name,...r})}return e}takeDamage(e){let t=e;const n=[...this.living().filter(s=>s.class===q.FIGHTER),...this.living().filter(s=>s.class!==q.FIGHTER)];for(const s of n){if(t<=0)break;const r=Math.min(t,s.health);s.takeDamage(r),t-=r}}healParty(e){const t=this.living().filter(n=>n.health<n.maxHealth).sort((n,s)=>n.health/n.maxHealth-s.health/s.maxHealth);t.length!==0&&t[0].heal(e)}burnSupply(){this.marches++;const t=!this.living().some(l=>l.equipment.some(c=>c.id==="eq-lantern"))||this.marches%2===0;if(this.supply>0)return t?(this.supply--,this.supply===0?{kind:"guttered",supply:0}:this.supply<=2?{kind:"low",supply:this.supply}:null):null;const n=l=>{const c=this.darkCovered!==l;return this.darkCovered=l,c},s=this.castSpell("utility","sp-light");if(s)return n("conjured")?{kind:"conjured",supply:0,full:ns,source:s.name}:null;const r=this.castSpell("utility","sp-feather");if(r)return n("sure-footed")?{kind:"sure-footed",supply:0,full:ns,source:r.name}:null;if(this.canSeeInDark()){const l=this.grimoire.find(c=>c.id==="sp-eyes");return n("dark-seen")?{kind:"dark-seen",supply:0,full:ns,source:(l==null?void 0:l.name)||"night-sight"}:null}this.darkCovered=null;const o=mr(this),a=Math.max(1,ns+o.dark);for(const l of this.living())l.takeDamage(a);return this.darkMarches=(this.darkMarches||0)+1,{kind:"dark",supply:0,damage:a,full:ns,temper:o.notes,darkMarches:this.darkMarches}}canSeeInDark(){return this.grimoire.some(e=>e.id==="sp-eyes")}provision(e,t="medium"){const n=ml[t]??ml.medium,s=Un(this).supply,r=mr(this);return this.supply=Math.max(2,Math.round(e*n)+s+r.supply),this.provisionNotes=r.supplyNotes,this.marches=0,this.supply}addSupply(e){const t=this.supply;return this.supply=Math.min(pl*3,this.supply+e),this.supply-t}restStep(){return this.hasClass(q.CLERIC)&&this.healParty(1),this.castThisRoom.clear(),this.burnSupply()}applyLinger(){if(!this.poisonLinger)return null;const e=this.poisonLinger;return this.poisonLinger=0,this.hasClass(q.CLERIC)?{cured:!0}:(this.takeDamage(e),{damage:e})}castSpell(e,t=null){const n=c=>(t?c.id===t:c.use===e)&&!this.castThisRoom.has(c.id),s=this.grimoire.findIndex(n);if(s===-1)return null;const r=this.grimoire[s],o=this.hasClass(q.WIZARD),a=r.power+Math.floor(this.mindFor(r)/2)+(o?2:0),l=r.source==="found";return l?this.grimoire.splice(s,1):this.castThisRoom.add(r.id),{...r,effectivePower:a,consumed:l}}doAlchemy(e=Math.random()){if(!this.hasClass(q.ALCHEMIST)||this.materials<=0)return null;this.materials--;const t=this.hasCapability("alchemy")&&this.hasCapability("music");if(e<.5){const n={kind:"healing-draught",heal:6};return this.potions.push(n),t&&this.potions.push({...n}),{type:"potion",potion:n,doubled:t}}else{const n=this.living().reduce((r,o)=>r.attack>=o.attack?r:o),s=e<.75?{name:"fire coating",attack:2,element:"fire"}:{name:"venom coating",attack:3,venom:!0};return n.addWeaponMod(s),{type:"weapon-mod",mod:s,target:n.name}}}castHealIfNeeded(){const e=this.living().find(n=>n.health/n.maxHealth<=.4);if(!e)return null;const t=this.castSpell("heal");return t?(e.heal(t.effectivePower),{spell:t,target:e}):null}quaffIfNeeded(){if(this.potions.length===0)return!1;const e=this.living().find(n=>n.health/n.maxHealth<=.4);if(!e)return!1;const t=this.potions.shift();return e.heal(t.heal),!0}recordEncounter(e,t){this.encounterHistory[e]||(this.encounterHistory[e]={wins:0,losses:0}),this.encounterHistory[e][t?"wins":"losses"]++}addScore(e){this.score+=e}addGold(e){this.gold+=e,this.score+=e}}const Yd={[Y.CHARACTER]:Oo,[Y.EQUIPMENT]:Fo,[Y.SPELL]:ks,[Y.PERSONALITY]:Dr,[Y.TACTIC]:_h},_n={character:{statTotal:34},equipment:{bonusTotal:4},spell:{maxPower:6}},gl=Dr.map(i=>i.archetype);function xh(i){const e=[];if(!i||typeof i!="object")return["not a card"];if(i.id||e.push("needs an id"),(!i.name||i.name.length<2)&&e.push("needs a name"),Object.values(Y).includes(i.type)||e.push(`unknown type "${i.type}"`),i.type===Y.CHARACTER){Object.values(q).includes(i.class)||e.push(`unknown class "${i.class}"`);const t=i.stats||{};for(const s of["health","attack","defense","mind"])Number.isFinite(t[s])&&t[s]>=1||e.push(`stat ${s} must be ≥ 1`);const n=(t.health||0)+(t.attack||0)*2+(t.defense||0)*2+(t.mind||0);n>_n.character.statTotal&&e.push(`stat budget ${n} exceeds ${_n.character.statTotal} (health + 2×attack + 2×defense + mind)`)}if(i.type===Y.EQUIPMENT){const t=i.bonus||{},n=Object.values(t).reduce((s,r)=>s+r,0);n>_n.equipment.bonusTotal&&e.push(`bonus total ${n} exceeds ${_n.equipment.bonusTotal}`),Object.keys(t).length===0&&e.push("equipment needs at least one bonus")}return i.type===Y.SPELL&&(["combat","heal","utility"].includes(i.use)||e.push("spell use must be combat/heal/utility"),Number.isFinite(i.power)&&i.power>=1&&i.power<=_n.spell.maxPower||e.push(`spell power must be 1–${_n.spell.maxPower}`)),i.type===Y.PERSONALITY&&(gl.includes(i.archetype)||e.push(`personality archetype must be one of: ${gl.join(", ")}`)),e}function bh(i){const e=[];(!(i!=null&&i.id)||!(i!=null&&i.name))&&e.push("a pack needs an id and a name"),(!Array.isArray(i==null?void 0:i.cards)||i.cards.length===0)&&e.push("a pack needs cards");const t=new Set;for(const n of(i==null?void 0:i.cards)||[]){for(const s of xh(n))e.push(`${(n==null?void 0:n.name)||(n==null?void 0:n.id)||"?"}: ${s}`);t.has(n.id)&&e.push(`duplicate card id ${n.id}`),t.add(n.id)}return e}const Ni=[];function Ls(i,{enabled:e=!0}={}){const t=bh(i);if(t.length)throw new Error(`invalid pack: ${t.join("; ")}`);const n=Ni.findIndex(r=>r.pack.id===i.id),s={pack:i,enabled:e};return n>=0?Ni[n]=s:Ni.push(s),s}function jd(i,e){const t=Ni.find(n=>n.pack.id===i);return t&&(t.enabled=e),t||null}function Kd(){return Ni.map(i=>({id:i.pack.id,name:i.pack.name,description:i.pack.description,cards:i.pack.cards.length,enabled:i.enabled}))}function is(i){const e=Ni.filter(t=>t.enabled).flatMap(t=>t.pack.cards.filter(n=>n.type===i));return[...Yd[i]||[],...e]}class Ui{constructor(e){this.seed=this.hashCode(String(e))%2147483647,this.seed<=0&&(this.seed+=2147483646);for(let t=0;t<3;t++)this.next()}hashCode(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t=t&t;return Math.abs(t)}next(){return this.seed=this.seed*16807%2147483647,(this.seed-1)/2147483646}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(this.next()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}}const Jd=[{id:"warlord",name:"The Warlord",icon:"⚔️",desc:"Drafts muscle first: fighters, weapons, and the will to use them.",skill:.55,weights:{character:3,equipment:2.5,spell:.8,personality:1,tactic:2.2},classBias:{fighter:3,rogue:1.5}},{id:"archmage",name:"The Archmage",icon:"🔮",desc:"Hoards spells and the wizards to wield them.",skill:.5,weights:{character:2,equipment:1,spell:3,personality:1,tactic:1.8},classBias:{wizard:3,cleric:1.5}},{id:"guildmaster",name:"The Guildmaster",icon:"⚖️",desc:"Balances the ledger: a bit of everything, nothing wasted.",skill:.7,weights:{character:2,equipment:2,spell:2,personality:2,tactic:2.5},classBias:{rogue:2,alchemist:2}}];function Zd(i){const e=[],t=new Set,n=(s,r)=>{const o=i.shuffle(s);let a=0;for(const l of o){if(a>=r)break;t.has(l.id)||(t.add(l.id),e.push({...l}),a++)}};return n(is(Y.CHARACTER),2),n(is(Y.EQUIPMENT),3),n(is(Y.SPELL),2),n(is(Y.PERSONALITY),1),n(is(Y.TACTIC),1),i.shuffle(e)}const wh=["eq-lantern","sp-light","sp-eyes"];function Qd(i){return i.filter(e=>wh.includes(e.id)).length}function eu(i,e){const t=e.filter(s=>s.type===Y.CHARACTER);let n=1;if(i.type===Y.CHARACTER&&(t.length<yn?n=6.5-t.length*.4:t.length===yn?n=2:n=.2,i.class===q.CLERIC&&!t.some(s=>s.class===q.CLERIC)&&(n+=1.5)),i.type===Y.EQUIPMENT){const s=e.filter(r=>r.type===Y.EQUIPMENT).length;n=2,i.classActions&&(n+=2),i.bestFor&&t.some(r=>r.class===i.bestFor)&&(n+=1),i.cursed&&(n-=.2),s>=6&&(n-=(s-5)*.35)}if(i.type===Y.SPELL){const s=e.filter(r=>r.type===Y.SPELL).length;n=2+(t.some(r=>r.class===q.WIZARD)?1:0)+(i.use==="heal"?.5:0),s>=4&&(n-=(s-3)*.45)}if(wh.includes(i.id)){const s=Qd(e);n+=s===0?3:s===1?.5:0}return i.type===Y.PERSONALITY&&(n=1-e.filter(r=>r.type===Y.PERSONALITY).length*1.2,i.archetype==="craven"&&(n-=1),(i.archetype==="reckless"||i.archetype==="greedy")&&(n+=.3)),n}function tu(i,e,t){var o,a;const n=t.filter(l=>l.type===Y.CHARACTER),s=e.quirks||{};let r=((o=e.weights)==null?void 0:o[i.type])??1;if(i.type===Y.CHARACTER&&(r+=((a=e.classBias)==null?void 0:a[i.class])||0,r-=n.length*.35,!s.bodyBlind&&n.length===0&&(r+=3)),i.type===Y.EQUIPMENT&&i.cursed&&(r+=s.curseChaser?.8:-.8),s.shiny&&(i.classActions||i.type===Y.SPELL&&i.power>=5)&&(r+=s.shiny),i.type===Y.TACTIC&&i.requires){const l=t.some(c=>c.id===i.requires);s.treeBlind&&!l?r+=2:l||(r-=1.5)}if(i.type===Y.PERSONALITY){const l=t.filter(c=>c.type===Y.PERSONALITY);r-=l.length*1.2,i.trap&&!s.curseChaser&&(r-=.6)}return r}function nu(i,e,t,n){const s=e.skill??.5,r=n.next()*(.4+(1-s)*1.6);return s*eu(i,t)+(1-s)*tu(i,e,t)+r}function iu(i,e,t,n){let s=null,r=-1/0;for(const o of i){const a=nu(o,e,t,n);a>r&&(r=a,s=o)}return s}class su{constructor(e="table",t=3){this.rng=new Ui(e),this.numRounds=t,this.seats=[{id:"player",name:"You",icon:"🐍",isAI:!1,pool:[]},...Jd.map(n=>({id:n.id,name:n.name,icon:n.icon,isAI:!0,persona:n,pool:[]}))],this.round=0,this.pickInRound=0,this.packs=[],this.finished=!1,this.log=[],this.openNewPacks()}openNewPacks(){this.packs=this.seats.map(()=>Zd(this.rng)),this.pickInRound=0}passDirection(){return this.round%2===0?1:-1}getPlayerPack(){return this.packs[0]}playerPick(e){if(this.finished)return null;const t=this.packs[0],n=t.findIndex(o=>o.id===e);if(n===-1)return null;const s=t.splice(n,1)[0];this.seats[0].pool.push(s),this.log.push({round:this.round,pick:this.pickInRound,seat:0,card:s});const r=[];for(let o=1;o<this.seats.length;o++){const a=this.seats[o],l=iu(this.packs[o],a.persona,a.pool,this.rng);if(l){const c=this.packs[o].findIndex(d=>d.id===l.id);this.packs[o].splice(c,1),a.pool.push(l),this.log.push({round:this.round,pick:this.pickInRound,seat:o,card:l}),r.push({seat:a.name,icon:a.icon,card:l})}}return this.pickInRound++,this.packs[0].length>0?this.passDirection()===1?this.packs.unshift(this.packs.pop()):this.packs.push(this.packs.shift()):(this.round++,this.round>=this.numRounds?this.finished=!0:this.openNewPacks()),{playerCard:s,aiPicks:r}}getPlayerPool(){const e=this.seats[0].pool;return{all:e,characters:e.filter(t=>t.type===Y.CHARACTER),equipment:e.filter(t=>t.type===Y.EQUIPMENT),spells:e.filter(t=>t.type===Y.SPELL),personalities:e.filter(t=>t.type===Y.PERSONALITY)}}getTableSummary(){return this.seats.map(e=>({name:e.name,icon:e.icon,isAI:e.isAI,counts:{characters:e.pool.filter(t=>t.type===Y.CHARACTER).length,equipment:e.pool.filter(t=>t.type===Y.EQUIPMENT).length,spells:e.pool.filter(t=>t.type===Y.SPELL).length,personalities:e.pool.filter(t=>t.type===Y.PERSONALITY).length}}))}}const Ps={tinkering:{name:"Tinkering",icon:"🔧",text:"Manipulates machines and mechanisms."},diplomacy:{name:"Diplomacy",icon:"🤝",text:"Another way of interacting with people."},rogue:{name:"Rogue Craft",icon:"🗡️",text:"Locks, traps, shadows, and the exits nobody else noticed."},fencing:{name:"Fencing",icon:"🤺",text:"Blade-work as a social and a combat option both."},tactics:{name:"Tactics",icon:"🎯",text:"Reads and reshapes the formation."},conjuring:{name:"Conjuring",icon:"🪄",text:"Summons, binds, and speaks with what is not flesh."},divination:{name:"Divination",icon:"🔮",text:"Information before commitment, not raw power."},alchemy:{name:"Alchemy",icon:"⚗️",text:"Substances, bodies, medicines, poisons, reactions."},healing:{name:"Healing",icon:"💚",text:"Mends wounds and cures what lingers."},knowledge:{name:"Knowledge",icon:"📖",text:"Recognizes traditions, histories, and texts."},appraisal:{name:"Appraisal",icon:"💰",text:"Knows what a thing is actually worth."},translation:{name:"Translation",icon:"🌐",text:"Renders the obscure legible."},observation:{name:"Observation",icon:"👁️",text:"Notices what a careless party would miss."},experimentation:{name:"Experimentation",icon:"🧪",text:"Tests, iterates, transforms materials."},correspondence:{name:"Correspondence",icon:"🔗",text:"Links disparate systems of meaning."},memory:{name:"Memory",icon:"🧠",text:"Holds more, and holds it in relation."},mathematics:{name:"Mathematical Magic",icon:"📐",text:"Number, proportion, and the working built on them."},navigation:{name:"Navigation",icon:"🧭",text:"Finds the way, or the way around."},antiquarian:{name:"Antiquarian Knowledge",icon:"🏺",text:"Recognizes what is historically significant."},astronomy:{name:"Astronomy",icon:"🔭",text:"Reads the sky and what moves by it."},naturalPhilosophy:{name:"Natural Philosophy",icon:"🌿",text:"Non-occult explanations for magical problems."},imagination:{name:"Imagination",icon:"✨",text:"Unconventional associations, novel solutions."},debate:{name:"Debate",icon:"💬",text:"Challenges an argument's assumptions."},syncretism:{name:"Syncretism",icon:"☯️",text:"Reconciles competing traditions."},music:{name:"Music",icon:"🎵",text:"Performance as persuasion, distraction, or balm."},harmony:{name:"Harmony",icon:"🎶",text:"Strengthens what already works together."},medicine:{name:"Medicine",icon:"💊",text:"Diagnoses and treats the body."},telepathy:{name:"Telepathy",icon:"📡",text:"A link to minds that carry their own capabilities."}},Oi={none:{id:"none",name:"Standard Delve",icon:"🗺️",text:"No wager. The dungeon as the dungeon intends.",scoreBonus:0},swarms:{id:"swarms",name:"Monster Swarms",icon:"🐝",text:"The halls run thick with the weak and the many — more fights, thinner foes, more score.",scoreBonus:.25,weightTweaks:{monster:2,corridor:-.3},monsterHealthMult:.7},traps:{id:"traps",name:"Trap-Dense",icon:"🪤",text:"Every flagstone is a question. More traps, and they bite deeper.",scoreBonus:.25,weightTweaks:{trap:2},trapBonus:2},darkpact:{id:"darkpact",name:"Dark Pact",icon:"🩸",text:"The dungeon's malice sharpens its teeth — and gilds its hoard.",scoreBonus:.3,monsterAttackMult:1.25,goldMult:1.5},nightfall:{id:"nightfall",name:"Endless Night",icon:"🌑",text:"No light reaches here. The dungeon itself turns hostile more often.",scoreBonus:.3,weightTweaks:{disaster:1.5,treasure:-.3}},throne:{id:"throne",name:"The Long Throne",icon:"👑",text:"Fewer rooms, one horror. The boss has grown fat on patience.",scoreBonus:.35,weightTweaks:{monster:-1,treasure:.5},bossAttackMult:1.4,bossHealthMult:1.4}};function Tn(i){return Oi[i]||Oi.none}function Mh(i,e){const t=i&&typeof i=="object"?i:Tn(i),n=e&&typeof e=="object"?e:Tn(e);if(t.id==="none")return n;if(n.id==="none")return t;const s={...t.weightTweaks||{}};for(const[a,l]of Object.entries(n.weightTweaks||{}))s[a]=(s[a]||0)+l;const r=a=>(t[a]||1)*(n[a]||1),o={id:`${t.id}+${n.id}`,name:`${t.name} + ${n.name}`,icon:`${t.icon}${n.icon}`,text:`${t.text} ${n.text}`,scoreBonus:(t.scoreBonus||0)+(n.scoreBonus||0),weightTweaks:s,trapBonus:(t.trapBonus||0)+(n.trapBonus||0)};for(const a of["goldMult","monsterAttackMult","monsterHealthMult","bossAttackMult","bossHealthMult"]){const l=r(a);l!==1&&(o[a]=l)}return o}function ru(i){const e=i.capabilities||[];return e.length===0?"":`<div class="card-caps" style="margin-top:0.3rem;font-size:0.68rem;display:flex;gap:0.3rem;flex-wrap:wrap;">${e.map(n=>{const s=Ps[n];return s?`<span style="color:#9fc4a8;border:1px solid #3a4a3e;border-radius:3px;padding:0 0.3rem;" title="${s.text}">${s.icon} ${s.name}</span>`:""}).join("")}</div>`}class au{constructor(e,t){this.draft=e,this.onComplete=t,this.lastAiPicks=[],this.selection={seed:"",difficulty:"medium"}}render(){const e=document.getElementById("draft-container");if(e.innerHTML="",e.style.display="block",this.draft.finished){this.renderDraftComplete(e);return}const t=this.draft.round+1,n=this.draft.pickInRound+1,s=this.draft.passDirection()===1?"→ passing left":"← passing right",r=document.createElement("div");r.style.cssText="text-align:center;margin-bottom:1rem;",r.innerHTML=`
      <div style="color:#d8a53f;font-size:1.1rem;font-weight:bold;">Pack ${t} of ${this.draft.numRounds} — Pick ${n}</div>
      <div style="color:#887755;font-size:0.8rem;">${s} · click ONE card to draft it, then the pack passes on</div>
      <div style="font-size:0.72rem;margin-top:0.4rem;display:flex;gap:0.9rem;justify-content:center;flex-wrap:wrap;">
        <span class="type-character">● Character</span>
        <span class="type-equipment">● Equipment</span>
        <span class="type-spell">● Spell</span>
        <span class="type-personality">● Personality</span>
      </div>
    `,e.appendChild(r);const o=document.createElement("div");o.className="pack-grid";for(const a of this.draft.getPlayerPack())o.appendChild(this.renderCard(a,()=>this.pick(a.id)));if(e.appendChild(o),this.lastAiPicks.length>0){const a=document.createElement("div");a.className="panel",a.style.cssText="margin-top:1rem;",a.innerHTML="<h2>The Table's Last Picks</h2>"+this.lastAiPicks.map(l=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${l.icon} ${l.seat} took <strong style="color:#c8b088;">${l.card.icon} ${l.card.name}</strong></div>`).join(""),e.appendChild(a)}this.renderPool(e)}renderCard(e,t){const n=document.createElement("div");n.className="draft-card";const s={fire:'<span style="color:#ff8a3c;">🔥 fire</span>',frost:'<span style="color:#7ec8ff;">❄️ frost</span>',shock:'<span style="color:#ffe95e;">⚡ shock</span>',holy:'<span style="color:#ffe9a0;">🌟 holy</span>'};let r="";if(e.type===Y.CHARACTER)r=`<div class="card-stats">❤️${e.stats.health} ⚔️${e.stats.attack} 🛡️${e.stats.defense} 🧠${e.stats.mind}</div>`;else if(e.type===Y.EQUIPMENT){const a=Object.entries(e.bonus).map(([c,d])=>`${d>0?"+":""}${d} ${c}`).join(", "),l=e.classActions?` · <span style="color:#d8a53f;" title="${Object.entries(e.classActions).map(([c,d])=>`${c}: ${d.name}`).join(" · ")}">✦ different in every hand</span>`:"";r=`<div class="card-stats">${a}${e.bestFor?` · best: ${e.bestFor}`:""}${l}</div>`}else if(e.type===Y.SPELL){const a=s[e.element]?` · ${s[e.element]}`:"";r=`<div class="card-stats">power ${e.power} · ${e.use}${a}</div>`}const o=e.cursed?' <span style="color:#e05555;">· CURSED</span>':"";return n.innerHTML=`
      <div class="card-type type-${e.type}">${e.type}${e.class?" · "+e.class:""}${o}</div>
      <div class="card-name">${e.icon} ${e.name}</div>
      <div class="card-text">${e.trait||e.text||""}</div>
      ${r}
      ${ru(e)}
    `,n.addEventListener("click",t),n}pick(e){const t=this.draft.playerPick(e);t&&(this.lastAiPicks=t.aiPicks),this.render()}renderPool(e){const t=this.draft.getPlayerPool(),n=document.createElement("div");n.className="panel",n.style.cssText="margin-top:1rem;";const s=(r,o)=>o.length?`<div style="margin-bottom:0.4rem;"><span style="color:#887755;font-size:0.72rem;">${r}:</span> ${o.map(a=>`${a.icon} ${a.name}`).join(" · ")}</div>`:"";n.innerHTML=`
      <h2>Your Pool (${t.all.length} cards)</h2>
      <div style="font-size:0.78rem;line-height:1.6;">
        ${s("Party",t.characters)||'<div style="color:#775544;font-size:0.75rem;">⚠️ No characters yet — a party of zero gets Pip the Tavern Volunteer</div>'}
        ${s("Equipment",t.equipment)}
        ${s("Grimoire",t.spells)}
        ${s("Personalities",t.personalities)}
      </div>
    `,e.appendChild(n)}renderDraftComplete(e){const t=this.draft.getPlayerPool(),n=document.createElement("div");n.style.cssText="text-align:center;margin-bottom:1.25rem;",n.innerHTML=`
      <div style="color:#d8a53f;font-size:1.2rem;font-weight:bold;">The Draft Is Done</div>
      <div style="color:#887755;font-size:0.85rem;">Party of ${Math.max(1,t.characters.length)} · ${t.equipment.length} equipment · ${t.spells.length} spells · ${t.personalities.length} personalities</div>
    `,e.appendChild(n);const s=document.createElement("div");s.className="pack-grid";for(const u of t.all){const p=this.renderCard(u,()=>{});p.style.cursor="default",s.appendChild(p)}e.appendChild(s);const r=document.createElement("div");r.className="panel",r.style.cssText="margin-top:1rem;",r.innerHTML="<h2>The Rest of the Table</h2>"+this.draft.getTableSummary().filter(u=>u.isAI).map(u=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${u.icon} ${u.name}: party of ${u.counts.characters}, ${u.counts.equipment} equipment, ${u.counts.spells} spells</div>`).join(""),e.appendChild(r);const o=document.createElement("div");o.className="panel",o.style.cssText="margin-top:1rem;";const a=Object.values(Oi).map(u=>`<option value="${u.id}"${u.id==="none"?" selected":""}>${u.icon} ${u.name}${u.scoreBonus?` (+${Math.round(u.scoreBonus*100)}% score)`:""}</option>`).join("");o.innerHTML=`
      <h2>The Delve</h2>
      <div style="display:flex;gap:0.75rem;align-items:center;flex-wrap:wrap;font-size:0.85rem;">
        <label>Difficulty
          <select id="difficulty-select" style="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
            <option value="easy">Easy</option>
            <option value="medium" selected>Medium</option>
            <option value="hard">Hard</option>
            <option value="nightmare">Nightmare</option>
          </select>
        </label>
        <label style="flex:1;">Seed
          <input id="seed-input" type="text" placeholder="blank = random dungeon" style="width:100%;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;" />
        </label>
      </div>
      <div style="margin-top:0.7rem;font-size:0.85rem;">
        <label style="display:block;">Dungeon Condition — a wager for a bigger score
          <select id="condition-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
            ${a}
          </select>
        </label>
        <div id="condition-hint" style="margin-top:0.35rem;font-size:0.75rem;color:#887755;font-style:italic;line-height:1.4;"></div>
      </div>
      <div style="margin-top:0.9rem;font-size:0.85rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;">
        <div style="color:#e8724a;margin-bottom:0.35rem;">🩸 Lay a Hex — curse a rival's run</div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <label style="flex:1;min-width:140px;">Rival
            <select id="hex-target-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
              ${this.draft.seats.filter(u=>u.isAI).map(u=>`<option value="${u.id}">${u.icon} ${u.name}</option>`).join("")}
            </select>
          </label>
          <label style="flex:1;min-width:140px;">Hex
            <select id="hex-condition-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
              <option value="none" selected>No hex — stay civil</option>
              ${Object.values(Oi).filter(u=>u.id!=="none").map(u=>`<option value="${u.id}">${u.icon} ${u.name}</option>`).join("")}
            </select>
          </label>
        </div>
        <div style="margin-top:0.35rem;font-size:0.72rem;color:#887755;font-style:italic;">Fair warning: the table hexes back. One rival will curse your run — but its score premium is yours to keep.</div>
      </div>
    `,e.appendChild(o);const l=o.querySelector("#condition-select"),c=o.querySelector("#condition-hint"),d=()=>{var u;c.textContent=((u=Oi[l.value])==null?void 0:u.text)||""};l.addEventListener("change",d),d();const h=document.createElement("button");h.textContent="🏰 Enter the Dungeon",h.style.cssText="width:100%;margin-top:1rem;padding:1rem;font-size:1rem;",h.addEventListener("click",()=>{const u=document.getElementById("difficulty-select").value,p=document.getElementById("seed-input").value.trim()||`delve-${Date.now().toString(36)}`,g=document.getElementById("condition-select").value,v=document.getElementById("hex-target-select").value,m=document.getElementById("hex-condition-select").value;this.onComplete({pool:t.all,difficulty:u,seed:p,condition:g,hexTarget:v,hexCondition:m})}),e.appendChild(h)}}class ou{constructor(e){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext("2d")}render(e){const t=this.ctx,{dungeon:n,roomIndex:s,party:r}=e,o=this.canvas.clientWidth||500,a=this.canvas.clientHeight||420;(this.canvas.width!==o||this.canvas.height!==a)&&(this.canvas.width=o,this.canvas.height=a),t.fillStyle="#0d0b08",t.fillRect(0,0,o,a);const l=n.rooms,c=l[Math.min(s,l.length-1)],d=(c==null?void 0:c.floor)||0,h=E=>(E.floor||0)===d,u=l.filter(E=>h(E)&&!(E.secret&&!E.discovered));if(u.length===0)return;const p=26,g=Math.min(...u.map(E=>E.x-(E.w||4)/2)),v=Math.max(...u.map(E=>E.x+(E.w||4)/2)),m=Math.min(...u.map(E=>E.y-(E.h||4)/2)),f=Math.max(...u.map(E=>E.y+(E.h||4)/2)),x=Math.min((o-p*2)/Math.max(1,v-g),(a-p*2)/Math.max(1,f-m)),M=E=>p+(E.x-g)*x,_=E=>p+(E.y-m)*x,k=l[Math.min(s,l.length-1)];t.strokeStyle="#3a2f1e",t.lineWidth=Math.max(3,x*1.4);for(const E of n.edges||[]){if(E.kind==="trapdoor"||E.kind==="stair")continue;const C=l[E.a],R=l[E.b];!C||!R||!h(C)||!h(R)||C.secret&&!C.discovered||R.secret&&!R.discovered||(t.setLineDash(E.secret?[4,3]:[]),t.beginPath(),t.moveTo(M(C),_(C)),t.lineTo(M(R),_(R)),t.stroke())}t.setLineDash([]);for(let E=0;E<l.length;E++){const C=l[E];if(!h(C)||C.secret&&!C.discovered)continue;const R=Math.max(6,(C.w||4)*x),b=Math.max(6,(C.h||4)*x),y=M(C),T=_(C),I=C===k,L=C.cleared,B=C.type==="boss";if(I){const G=Math.max(R,b),Z=t.createRadialGradient(y,T,4,y,T,G);Z.addColorStop(0,"rgba(216, 165, 63, 0.45)"),Z.addColorStop(1,"rgba(216, 165, 63, 0)"),t.fillStyle=Z,t.fillRect(y-G,T-G,G*2,G*2)}t.fillStyle=I?"#2a2213":L?"#171310":"#14110b",t.strokeStyle=I?"#d8a53f":B?"#8a3a3a":"#3a2f1e",t.lineWidth=I?2.5:1.5,C.shape==="rotunda"?(t.beginPath(),t.arc(y,T,Math.min(R,b)/2,0,Math.PI*2),t.fill(),t.stroke()):(t.fillRect(y-R/2,T-b/2,R,b),t.strokeRect(y-R/2,T-b/2,R,b));const X=C.cleared||I||B||(e.knownIdxs?e.knownIdxs.includes(E):!0);t.font=`${Math.max(10,Math.min(20,Math.min(R,b)*.5))}px serif`,t.textAlign="center",t.textBaseline="middle",t.globalAlpha=L&&!I?.45:1,t.fillText(X?C.icon:"❓",y,I?T-b*.3:T),t.globalAlpha=1}if((d>0||l.some(E=>(E.floor||0)>0))&&(t.fillStyle="#8a7a58",t.font="12px system-ui, sans-serif",t.textAlign="left",t.textBaseline="top",t.fillText(`Floor ${d+1}`,8,8)),k&&r&&!(k.secret&&!k.discovered)){const E=r.members.filter(L=>L.alive),C=Math.max(6,(k.w||4)*x),R=Math.max(6,(k.h||4)*x),b=M(k),y=_(k)+R*.18;t.font=`${Math.max(11,Math.min(16,x))}px serif`,t.textAlign="center",t.textBaseline="middle";const T=R>C?Math.min(E.length,2):Math.min(E.length,4),I=Math.min(x*1.1,C/Math.max(1,T+.5));E.forEach((L,B)=>{const X=Math.floor(B/T),G=B%T,Z=Math.min(T,E.length-X*T),z=(G-(Z-1)/2)*I;t.fillText(L.icon,b+z,y+X*Math.min(x,R*.22))})}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bo="170",lu=0,vl=1,cu=2,Sh=1,Th=2,vn=3,Gn=0,Lt=1,xn=2,zn=0,Fi=1,Ba=2,yl=3,_l=4,hu=5,ti=100,du=101,uu=102,fu=103,pu=104,mu=200,gu=201,vu=202,yu=203,za=204,Ha=205,_u=206,xu=207,bu=208,wu=209,Mu=210,Su=211,Tu=212,Eu=213,Au=214,$a=0,Ga=1,Va=2,$i=3,Wa=4,qa=5,Xa=6,Ya=7,Eh=0,Ru=1,Cu=2,Hn=0,ku=1,Lu=2,Pu=3,Iu=4,Du=5,Nu=6,Uu=7,Ah=300,Gi=301,Vi=302,ja=303,Ka=304,Nr=306,Ja=1e3,ii=1001,Za=1002,Ot=1003,Ou=1004,zs=1005,nn=1006,Wr=1007,si=1008,An=1009,Rh=1010,Ch=1011,Is=1012,zo=1013,oi=1014,Mn=1015,Ns=1016,Ho=1017,$o=1018,Wi=1020,kh=35902,Lh=1021,Ph=1022,Jt=1023,Ih=1024,Dh=1025,Bi=1026,qi=1027,Nh=1028,Go=1029,Uh=1030,Vo=1031,Wo=1033,gr=33776,vr=33777,yr=33778,_r=33779,Qa=35840,eo=35841,to=35842,no=35843,io=36196,so=37492,ro=37496,ao=37808,oo=37809,lo=37810,co=37811,ho=37812,uo=37813,fo=37814,po=37815,mo=37816,go=37817,vo=37818,yo=37819,_o=37820,xo=37821,xr=36492,bo=36494,wo=36495,Oh=36283,Mo=36284,So=36285,To=36286,Fu=3200,Bu=3201,Fh=0,zu=1,On="",Tt="srgb",Ki="srgb-linear",Ur="linear",Ze="srgb",ui=7680,xl=519,Hu=512,$u=513,Gu=514,Bh=515,Vu=516,Wu=517,qu=518,Xu=519,Eo=35044,bl="300 es",Sn=2e3,Tr=2001;class Ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qr=Math.PI/180,Ao=180/Math.PI;function $n(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mt[i&255]+Mt[i>>8&255]+Mt[i>>16&255]+Mt[i>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]).toLowerCase()}function _t(i,e,t){return Math.max(e,Math.min(t,i))}function Yu(i,e){return(i%e+e)%e}function Xr(i,e,t){return(1-t)*i+t*e}function tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qe(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class me{constructor(e=0,t=0){me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,t,n,s,r,o,a,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=a,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],x=s[1],M=s[4],_=s[7],k=s[2],E=s[5],C=s[8];return r[0]=o*v+a*x+l*k,r[3]=o*m+a*M+l*E,r[6]=o*f+a*_+l*C,r[1]=c*v+d*x+h*k,r[4]=c*m+d*M+h*E,r[7]=c*f+d*_+h*C,r[2]=u*v+p*x+g*k,r[5]=u*m+p*M+g*E,r[8]=u*f+p*_+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*r*d+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,u=a*l-d*r,p=c*r-o*l,g=t*h+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(s*c-d*n)*v,e[2]=(a*n-s*o)*v,e[3]=u*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Yr.makeScale(e,t)),this}rotate(e){return this.premultiply(Yr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Yr=new Ue;function zh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ds(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ju(){const i=Ds("canvas");return i.style.display="block",i}const wl={};function _s(i){i in wl||(wl[i]=!0,console.warn(i))}function Ku(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Ju(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Zu(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const qe={enabled:!0,workingColorSpace:Ki,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ze&&(i.r=En(i.r),i.g=En(i.g),i.b=En(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ze&&(i.r=zi(i.r),i.g=zi(i.g),i.b=zi(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===On?Ur:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function En(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ml=[.64,.33,.3,.6,.15,.06],Sl=[.2126,.7152,.0722],Tl=[.3127,.329],El=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Al=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[Ki]:{primaries:Ml,whitePoint:Tl,transfer:Ur,toXYZ:El,fromXYZ:Al,luminanceCoefficients:Sl,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:Ml,whitePoint:Tl,transfer:Ze,toXYZ:El,fromXYZ:Al,luminanceCoefficients:Sl,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}});let fi;class Qu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{fi===void 0&&(fi=Ds("canvas")),fi.width=e.width,fi.height=e.height;const n=fi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=fi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ds("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=En(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(En(t[n]/255)*255):t[n]=En(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ef=0;class Hh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(jr(s[o].image)):r.push(jr(s[o]))}else r=jr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Qu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let tf=0;class Et extends Ji{constructor(e=Et.DEFAULT_IMAGE,t=Et.DEFAULT_MAPPING,n=ii,s=ii,r=nn,o=si,a=Jt,l=An,c=Et.DEFAULT_ANISOTROPY,d=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=$n(),this.name="",this.source=new Hh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ja:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case Za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ja:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case Za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Et.DEFAULT_IMAGE=null;Et.DEFAULT_MAPPING=Ah;Et.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,n=0,s=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,_=(p+1)/2,k=(f+1)/2,E=(d+u)/4,C=(h+v)/4,R=(g+m)/4;return M>_&&M>k?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=E/n,r=C/n):_>k?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=R/s):k<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(k),n=C/r,s=R/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(u-d)*(u-d));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-v)/x,this.z=(u-d)/x,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nf extends Ji{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Et(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Hh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends nf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class $h extends Et{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class sf extends Et{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Us{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],d=n[s+2],h=n[s+3];const u=r[o+0],p=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==u||c!==p||d!==g){let m=1-a;const f=l*u+c*p+d*g+h*v,x=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const k=Math.sqrt(M),E=Math.atan2(k,f*x);m=Math.sin(m*E)/k,a=Math.sin(a*E)/k}const _=a*x;if(l=l*m+u*_,c=c*m+p*_,d=d*m+g*_,h=h*m+v*_,m===1-a){const k=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=k,c*=k,d*=k,h*=k}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],d=n[s+3],h=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+d*h+l*p-c*u,e[t+1]=l*g+d*u+c*h-a*p,e[t+2]=c*g+d*p+a*u-l*h,e[t+3]=d*g-a*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(s/2),h=a(r/2),u=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=n+a+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(d-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_t(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-n*c,this._z=r*d+o*c+n*l-s*a,this._w=o*d-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-t)*d)/c,u=Math.sin(t*d)/c;return this._w=o*h+this._w*u,this._x=n*h+this._x*u,this._y=s*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Rl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Rl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),d=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*d,this.y=n+l*d+a*c-r*h,this.z=s+l*h+r*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kr.copy(this).projectOnVector(e),this.sub(Kr)}reflect(e){return this.sub(Kr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(_t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kr=new P,Rl=new Us;class Os{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,qt):qt.fromBufferAttribute(r,o),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hs.copy(n.boundingBox)),Hs.applyMatrix4(e.matrixWorld),this.union(Hs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ss),$s.subVectors(this.max,ss),pi.subVectors(e.a,ss),mi.subVectors(e.b,ss),gi.subVectors(e.c,ss),kn.subVectors(mi,pi),Ln.subVectors(gi,mi),Xn.subVectors(pi,gi);let t=[0,-kn.z,kn.y,0,-Ln.z,Ln.y,0,-Xn.z,Xn.y,kn.z,0,-kn.x,Ln.z,0,-Ln.x,Xn.z,0,-Xn.x,-kn.y,kn.x,0,-Ln.y,Ln.x,0,-Xn.y,Xn.x,0];return!Jr(t,pi,mi,gi,$s)||(t=[1,0,0,0,1,0,0,0,1],!Jr(t,pi,mi,gi,$s))?!1:(Gs.crossVectors(kn,Ln),t=[Gs.x,Gs.y,Gs.z],Jr(t,pi,mi,gi,$s))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const dn=[new P,new P,new P,new P,new P,new P,new P,new P],qt=new P,Hs=new Os,pi=new P,mi=new P,gi=new P,kn=new P,Ln=new P,Xn=new P,ss=new P,$s=new P,Gs=new P,Yn=new P;function Jr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Yn.fromArray(i,r);const a=s.x*Math.abs(Yn.x)+s.y*Math.abs(Yn.y)+s.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),d=n.dot(Yn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const rf=new Os,rs=new P,Zr=new P;class qo{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):rf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rs.subVectors(e,this.center);const t=rs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(rs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rs.copy(e.center).add(Zr)),this.expandByPoint(rs.copy(e.center).sub(Zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const un=new P,Qr=new P,Vs=new P,Pn=new P,ea=new P,Ws=new P,ta=new P;class af{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(un.copy(this.origin).addScaledVector(this.direction,t),un.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Qr.copy(e).add(t).multiplyScalar(.5),Vs.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(Qr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Vs),a=Pn.dot(this.direction),l=-Pn.dot(Vs),c=Pn.lengthSq(),d=Math.abs(1-o*o);let h,u,p,g;if(d>0)if(h=o*l-a,u=o*a-l,g=r*d,h>=0)if(u>=-g)if(u<=g){const v=1/d;h*=v,u*=v,p=h*(h+o*u+2*a)+u*(o*h+u+2*l)+c}else u=r,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-o*r+a)),u=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(h=Math.max(0,-(o*r+a)),u=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c);else u=o>0?-r:r,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Qr).addScaledVector(Vs,u),p}intersectSphere(e,t){un.subVectors(e.center,this.origin);const n=un.dot(this.direction),s=un.dot(un)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,o=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,o=(e.min.y-u.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(a=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,un)!==null}intersectTriangle(e,t,n,s,r){ea.subVectors(t,e),Ws.subVectors(n,e),ta.crossVectors(ea,Ws);let o=this.direction.dot(ta),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pn.subVectors(this.origin,e);const l=a*this.direction.dot(Ws.crossVectors(Pn,Ws));if(l<0)return null;const c=a*this.direction.dot(ea.cross(Pn));if(c<0||l+c>o)return null;const d=-a*Pn.dot(ta);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,s,r,o,a,l,c,d,h,u,p,g,v,m){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,d,h,u,p,g,v,m)}set(e,t,n,s,r,o,a,l,c,d,h,u,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/vi.setFromMatrixColumn(e,0).length(),r=1/vi.setFromMatrixColumn(e,1).length(),o=1/vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=o*d,p=o*h,g=a*d,v=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=u-v*c,t[9]=-a*l,t[2]=v-u*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*d,p=l*h,g=c*d,v=c*h;t[0]=u+v*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=p*a-g,t[6]=v+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*d,p=l*h,g=c*d,v=c*h;t[0]=u-v*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*d,t[9]=v-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*d,p=o*h,g=a*d,v=a*h;t[0]=l*d,t[4]=g*c-p,t[8]=u*c+v,t[1]=l*h,t[5]=v*c+u,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,g=a*l,v=a*c;t[0]=l*d,t[4]=v-u*h,t[8]=g*h+p,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=p*h+g,t[10]=u-v*h}else if(e.order==="XZY"){const u=o*l,p=o*c,g=a*l,v=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+v,t[5]=o*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*d,t[10]=v*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(of,e,lf)}lookAt(e,t,n){const s=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),In.crossVectors(n,It),In.lengthSq()===0&&(Math.abs(n.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),In.crossVectors(n,It)),In.normalize(),qs.crossVectors(It,In),s[0]=In.x,s[4]=qs.x,s[8]=It.x,s[1]=In.y,s[5]=qs.y,s[9]=It.y,s[2]=In.z,s[6]=qs.z,s[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],x=n[3],M=n[7],_=n[11],k=n[15],E=s[0],C=s[4],R=s[8],b=s[12],y=s[1],T=s[5],I=s[9],L=s[13],B=s[2],X=s[6],G=s[10],Z=s[14],z=s[3],se=s[7],ae=s[11],oe=s[15];return r[0]=o*E+a*y+l*B+c*z,r[4]=o*C+a*T+l*X+c*se,r[8]=o*R+a*I+l*G+c*ae,r[12]=o*b+a*L+l*Z+c*oe,r[1]=d*E+h*y+u*B+p*z,r[5]=d*C+h*T+u*X+p*se,r[9]=d*R+h*I+u*G+p*ae,r[13]=d*b+h*L+u*Z+p*oe,r[2]=g*E+v*y+m*B+f*z,r[6]=g*C+v*T+m*X+f*se,r[10]=g*R+v*I+m*G+f*ae,r[14]=g*b+v*L+m*Z+f*oe,r[3]=x*E+M*y+_*B+k*z,r[7]=x*C+M*T+_*X+k*se,r[11]=x*R+M*I+_*G+k*ae,r[15]=x*b+M*L+_*Z+k*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+r*l*h-s*c*h-r*a*u+n*c*u+s*a*p-n*l*p)+v*(+t*l*p-t*c*u+r*o*u-s*o*p+s*c*d-r*l*d)+m*(+t*c*h-t*a*p-r*o*h+n*o*p+r*a*d-n*c*d)+f*(-s*a*d-t*l*h+t*a*u+s*o*h-n*o*u+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],x=h*m*c-v*u*c+v*l*p-a*m*p-h*l*f+a*u*f,M=g*u*c-d*m*c-g*l*p+o*m*p+d*l*f-o*u*f,_=d*v*c-g*h*c+g*a*p-o*v*p-d*a*f+o*h*f,k=g*h*l-d*v*l-g*a*u+o*v*u+d*a*m-o*h*m,E=t*x+n*M+s*_+r*k;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return e[0]=x*C,e[1]=(v*u*r-h*m*r-v*s*p+n*m*p+h*s*f-n*u*f)*C,e[2]=(a*m*r-v*l*r+v*s*c-n*m*c-a*s*f+n*l*f)*C,e[3]=(h*l*r-a*u*r-h*s*c+n*u*c+a*s*p-n*l*p)*C,e[4]=M*C,e[5]=(d*m*r-g*u*r+g*s*p-t*m*p-d*s*f+t*u*f)*C,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*f-t*l*f)*C,e[7]=(o*u*r-d*l*r+d*s*c-t*u*c-o*s*p+t*l*p)*C,e[8]=_*C,e[9]=(g*h*r-d*v*r-g*n*p+t*v*p+d*n*f-t*h*f)*C,e[10]=(o*v*r-g*a*r+g*n*c-t*v*c-o*n*f+t*a*f)*C,e[11]=(d*a*r-o*h*r-d*n*c+t*h*c+o*n*p-t*a*p)*C,e[12]=k*C,e[13]=(d*v*s-g*h*s+g*n*u-t*v*u-d*n*m+t*h*m)*C,e[14]=(g*a*s-o*v*s-g*n*l+t*v*l+o*n*m-t*a*m)*C,e[15]=(o*h*s-d*a*s+d*n*l-t*h*l-o*n*u+t*a*u)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,d=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+n,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,d=o+o,h=a+a,u=r*c,p=r*d,g=r*h,v=o*d,m=o*h,f=a*h,x=l*c,M=l*d,_=l*h,k=n.x,E=n.y,C=n.z;return s[0]=(1-(v+f))*k,s[1]=(p+_)*k,s[2]=(g-M)*k,s[3]=0,s[4]=(p-_)*E,s[5]=(1-(u+f))*E,s[6]=(m+x)*E,s[7]=0,s[8]=(g+M)*C,s[9]=(m-x)*C,s[10]=(1-(u+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=vi.set(s[0],s[1],s[2]).length();const o=vi.set(s[4],s[5],s[6]).length(),a=vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Xt.copy(this);const c=1/r,d=1/o,h=1/a;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=d,Xt.elements[5]*=d,Xt.elements[6]*=d,Xt.elements[8]*=h,Xt.elements[9]*=h,Xt.elements[10]*=h,t.setFromRotationMatrix(Xt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Sn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),u=(n+s)/(n-s);let p,g;if(a===Sn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Tr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Sn){const l=this.elements,c=1/(t-e),d=1/(n-s),h=1/(o-r),u=(t+e)*c,p=(n+s)*d;let g,v;if(a===Sn)g=(o+r)*h,v=-2*h;else if(a===Tr)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vi=new P,Xt=new lt,of=new P(0,0,0),lf=new P(1,1,1),In=new P,qs=new P,It=new P,Cl=new lt,kl=new Us;class an{constructor(e=0,t=0,n=0,s=an.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],h=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(_t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-_t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(_t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-_t(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(_t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-_t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kl.setFromEuler(this),this.setFromQuaternion(kl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class Gh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cf=0;const Ll=new P,yi=new Us,fn=new lt,Xs=new P,as=new P,hf=new P,df=new Us,Pl=new P(1,0,0),Il=new P(0,1,0),Dl=new P(0,0,1),Nl={type:"added"},uf={type:"removed"},_i={type:"childadded",child:null},na={type:"childremoved",child:null};class vt extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new P,t=new an,n=new Us,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new Ue}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(Pl,e)}rotateY(e){return this.rotateOnAxis(Il,e)}rotateZ(e){return this.rotateOnAxis(Dl,e)}translateOnAxis(e,t){return Ll.copy(e).applyQuaternion(this.quaternion),this.position.add(Ll.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pl,e)}translateY(e){return this.translateOnAxis(Il,e)}translateZ(e){return this.translateOnAxis(Dl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xs.copy(e):Xs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(as,Xs,this.up):fn.lookAt(Xs,as,this.up),this.quaternion.setFromRotationMatrix(fn),s&&(fn.extractRotation(s.matrixWorld),yi.setFromRotationMatrix(fn),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nl),_i.child=e,this.dispatchEvent(_i),_i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(uf),na.child=e,this.dispatchEvent(na),na.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nl),_i.child=e,this.dispatchEvent(_i),_i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,e,hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new P(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yt=new P,pn=new P,ia=new P,mn=new P,xi=new P,bi=new P,Ul=new P,sa=new P,ra=new P,aa=new P,oa=new et,la=new et,ca=new et;class Gt{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Yt.subVectors(e,t),s.cross(Yt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Yt.subVectors(s,t),pn.subVectors(n,t),ia.subVectors(e,t);const o=Yt.dot(Yt),a=Yt.dot(pn),l=Yt.dot(ia),c=pn.dot(pn),d=pn.dot(ia),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const u=1/h,p=(c*l-a*d)*u,g=(o*d-a*l)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mn.x),l.addScaledVector(o,mn.y),l.addScaledVector(a,mn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return oa.setScalar(0),la.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(e,t),la.fromBufferAttribute(e,n),ca.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(oa,r.x),o.addScaledVector(la,r.y),o.addScaledVector(ca,r.z),o}static isFrontFacing(e,t,n,s){return Yt.subVectors(n,t),pn.subVectors(e,t),Yt.cross(pn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Yt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Gt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;xi.subVectors(s,n),bi.subVectors(r,n),sa.subVectors(e,n);const l=xi.dot(sa),c=bi.dot(sa);if(l<=0&&c<=0)return t.copy(n);ra.subVectors(e,s);const d=xi.dot(ra),h=bi.dot(ra);if(d>=0&&h<=d)return t.copy(s);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(xi,o);aa.subVectors(e,r);const p=xi.dot(aa),g=bi.dot(aa);if(g>=0&&p<=g)return t.copy(r);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(bi,a);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return Ul.subVectors(r,s),a=(h-d)/(h-d+(p-g)),t.copy(s).addScaledVector(Ul,a);const f=1/(m+v+u);return o=v*f,a=u*f,t.copy(n).addScaledVector(xi,o).addScaledVector(bi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function ha(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=Yu(e,1),t=_t(t,0,1),n=_t(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ha(o,r,e+1/3),this.g=ha(o,r,e),this.b=ha(o,r,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,t=Tt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const n=Vh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=En(e.r),this.g=En(e.g),this.b=En(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return qe.fromWorkingColorSpace(St.copy(this),e),Math.round(_t(St.r*255,0,255))*65536+Math.round(_t(St.g*255,0,255))*256+Math.round(_t(St.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(St.copy(this),t);const n=St.r,s=St.g,r=St.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=Tt){qe.fromWorkingColorSpace(St.copy(this),e);const t=St.r,n=St.g,s=St.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(Ys);const n=Xr(Dn.h,Ys.h,t),s=Xr(Dn.s,Ys.s,t),r=Xr(Dn.l,Ys.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new ze;ze.NAMES=Vh;let ff=0;class Zi extends Ji{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=$n(),this.name="",this.blending=Fi,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=za,this.blendDst=Ha,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ui,this.stencilZFail=ui,this.stencilZPass=ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==za&&(n.blendSrc=this.blendSrc),this.blendDst!==Ha&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Wh extends Zi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Eh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new P,js=new me;class Zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Eo,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)js.fromBufferAttribute(this,t),js.applyMatrix3(e),this.setXY(t,js.x,js.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Eo&&(e.usage=this.usage),e}}class qh extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Xh extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ft extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let pf=0;const Ht=new lt,da=new vt,wi=new P,Dt=new Os,os=new Os,gt=new P;class on extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zh(e)?Xh:qh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,n){return Ht.makeTranslation(e,t,n),this.applyMatrix4(Ht),this}scale(e,t,n){return Ht.makeScale(e,t,n),this.applyMatrix4(Ht),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ft(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Dt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Dt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Dt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Dt.min),this.boundingBox.expandByPoint(Dt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(Dt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];os.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(Dt.min,os.min),Dt.expandByPoint(gt),gt.addVectors(Dt.max,os.max),Dt.expandByPoint(gt)):(Dt.expandByPoint(os.min),Dt.expandByPoint(os.max))}Dt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)gt.fromBufferAttribute(a,c),l&&(wi.fromBufferAttribute(e,c),gt.add(wi)),s=Math.max(s,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new P,l[R]=new P;const c=new P,d=new P,h=new P,u=new me,p=new me,g=new me,v=new P,m=new P;function f(R,b,y){c.fromBufferAttribute(n,R),d.fromBufferAttribute(n,b),h.fromBufferAttribute(n,y),u.fromBufferAttribute(r,R),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,y),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const T=1/(p.x*g.y-g.x*p.y);isFinite(T)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(T),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(T),a[R].add(v),a[b].add(v),a[y].add(v),l[R].add(m),l[b].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let R=0,b=x.length;R<b;++R){const y=x[R],T=y.start,I=y.count;for(let L=T,B=T+I;L<B;L+=3)f(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const M=new P,_=new P,k=new P,E=new P;function C(R){k.fromBufferAttribute(s,R),E.copy(k);const b=a[R];M.copy(b),M.sub(k.multiplyScalar(k.dot(b))).normalize(),_.crossVectors(E,b);const T=_.dot(l[R])<0?-1:1;o.setXYZW(R,M.x,M.y,M.z,T)}for(let R=0,b=x.length;R<b;++R){const y=x[R],T=y.start,I=y.count;for(let L=T,B=T+I;L<B;L+=3)C(e.getX(L+0)),C(e.getX(L+1)),C(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,d=new P,h=new P;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new Zt(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=e(u,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ol=new lt,jn=new af,Ks=new qo,Fl=new P,Js=new P,Zs=new P,Qs=new P,ua=new P,er=new P,Bl=new P,tr=new P;class ft extends vt{constructor(e=new on,t=new Wh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){er.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],h=r[l];d!==0&&(ua.fromBufferAttribute(h,e),o?er.addScaledVector(ua,d):er.addScaledVector(ua.sub(t),d))}t.add(er)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere),Ks.applyMatrix4(r),jn.copy(e.ray).recast(e.near),!(Ks.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Ks,Fl)===null||jn.origin.distanceToSquared(Fl)>(e.far-e.near)**2))&&(Ol.copy(r).invert(),jn.copy(e.ray).applyMatrix4(Ol),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=o[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=x,k=M;_<k;_+=3){const E=a.getX(_),C=a.getX(_+1),R=a.getX(_+2);s=nr(this,f,e,n,c,d,h,E,C,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const x=a.getX(m),M=a.getX(m+1),_=a.getX(m+2);s=nr(this,o,e,n,c,d,h,x,M,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=o[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=x,k=M;_<k;_+=3){const E=_,C=_+1,R=_+2;s=nr(this,f,e,n,c,d,h,E,C,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const x=m,M=m+1,_=m+2;s=nr(this,o,e,n,c,d,h,x,M,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function mf(i,e,t,n,s,r,o,a){let l;if(e.side===Lt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Gn,a),l===null)return null;tr.copy(a),tr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(tr);return c<t.near||c>t.far?null:{distance:c,point:tr.clone(),object:i}}function nr(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Js),i.getVertexPosition(l,Zs),i.getVertexPosition(c,Qs);const d=mf(i,e,t,n,Js,Zs,Qs,Bl);if(d){const h=new P;Gt.getBarycoord(Bl,Js,Zs,Qs,h),s&&(d.uv=Gt.getInterpolatedAttribute(s,a,l,c,h,new me)),r&&(d.uv1=Gt.getInterpolatedAttribute(r,a,l,c,h,new me)),o&&(d.normal=Gt.getInterpolatedAttribute(o,a,l,c,h,new P),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new P,materialIndex:0};Gt.getNormal(Js,Zs,Qs,u.normal),d.face=u,d.barycoord=h}return d}class Ut extends on{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(d,3)),this.setAttribute("uv",new Ft(h,2));function g(v,m,f,x,M,_,k,E,C,R,b){const y=_/C,T=k/R,I=_/2,L=k/2,B=E/2,X=C+1,G=R+1;let Z=0,z=0;const se=new P;for(let ae=0;ae<G;ae++){const oe=ae*T-L;for(let ke=0;ke<X;ke++){const Te=ke*y-I;se[v]=Te*x,se[m]=oe*M,se[f]=B,c.push(se.x,se.y,se.z),se[v]=0,se[m]=0,se[f]=E>0?1:-1,d.push(se.x,se.y,se.z),h.push(ke/C),h.push(1-ae/R),Z+=1}}for(let ae=0;ae<R;ae++)for(let oe=0;oe<C;oe++){const ke=u+oe+X*ae,Te=u+oe+X*(ae+1),W=u+(oe+1)+X*(ae+1),ee=u+(oe+1)+X*ae;l.push(ke,Te,ee),l.push(Te,W,ee),z+=6}a.addGroup(p,z,b),p+=z,u+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=Xi(i[t]);for(const s in n)e[s]=n[s]}return e}function gf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const vf={clone:Xi,merge:Rt};var yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_f=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Zi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yf,this.fragmentShader=_f,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xi(e.uniforms),this.uniformsGroups=gf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jh extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Sn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new P,zl=new me,Hl=new me;class $t extends jh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ao*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z)}getViewSize(e,t){return this.getViewBounds(e,zl,Hl),t.subVectors(Hl,zl)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Mi=-90,Si=1;class xf extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $t(Mi,Si,e,t);s.layers=this.layers,this.add(s);const r=new $t(Mi,Si,e,t);r.layers=this.layers,this.add(r);const o=new $t(Mi,Si,e,t);o.layers=this.layers,this.add(o);const a=new $t(Mi,Si,e,t);a.layers=this.layers,this.add(a);const l=new $t(Mi,Si,e,t);l.layers=this.layers,this.add(l);const c=new $t(Mi,Si,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Kh extends Et{constructor(e,t,n,s,r,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Gi,super(e,t,n,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bf extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Kh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:nn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ut(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Lt,blending:zn});r.uniforms.tEquirect.value=t;const o=new ft(s,r),a=t.minFilter;return t.minFilter===si&&(t.minFilter=nn),new xf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const fa=new P,wf=new P,Mf=new Ue;class Qn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=fa.subVectors(n,t).cross(wf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mf.getNormalMatrix(e),s=this.coplanarPoint(fa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new qo,ir=new P;class Xo{constructor(e=new Qn,t=new Qn,n=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],d=s[5],h=s[6],u=s[7],p=s[8],g=s[9],v=s[10],m=s[11],f=s[12],x=s[13],M=s[14],_=s[15];if(n[0].setComponents(l-r,u-c,m-p,_-f).normalize(),n[1].setComponents(l+r,u+c,m+p,_+f).normalize(),n[2].setComponents(l+o,u+d,m+g,_+x).normalize(),n[3].setComponents(l-o,u-d,m-g,_-x).normalize(),n[4].setComponents(l-a,u-h,m-v,_-M).normalize(),t===Sn)n[5].setComponents(l+a,u+h,m+v,_+M).normalize();else if(t===Tr)n[5].setComponents(a,h,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(e){return Kn.center.set(0,0,0),Kn.radius=.7071067811865476,Kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ir.x=s.normal.x>0?e.max.x:e.min.x,ir.y=s.normal.y>0?e.max.y:e.min.y,ir.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ir)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Jh(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Sf(i){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,h=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,d),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const d=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,h[u]=v)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Or extends on{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,d=l+1,h=e/a,u=t/l,p=[],g=[],v=[],m=[];for(let f=0;f<d;f++){const x=f*u-o;for(let M=0;M<c;M++){const _=M*h-r;g.push(_,-x,0),v.push(0,0,1),m.push(M/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<a;x++){const M=x+c*f,_=x+c*(f+1),k=x+1+c*(f+1),E=x+1+c*f;p.push(M,_,E),p.push(_,k,E)}this.setIndex(p),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(v,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Or(e.width,e.height,e.widthSegments,e.heightSegments)}}var Tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ef=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Af=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,If=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Df=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Of=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ff=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Yf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Kf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Jf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",np=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ap=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,up=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,vp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_p=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Mp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ep=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ap=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ip=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Op=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,em=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,am=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,om=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ym=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_m=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Am=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,km=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Lm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Pm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Im=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Um=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Om=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ng=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ig=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:Tf,alphahash_pars_fragment:Ef,alphamap_fragment:Af,alphamap_pars_fragment:Rf,alphatest_fragment:Cf,alphatest_pars_fragment:kf,aomap_fragment:Lf,aomap_pars_fragment:Pf,batching_pars_vertex:If,batching_vertex:Df,begin_vertex:Nf,beginnormal_vertex:Uf,bsdfs:Of,iridescence_fragment:Ff,bumpmap_pars_fragment:Bf,clipping_planes_fragment:zf,clipping_planes_pars_fragment:Hf,clipping_planes_pars_vertex:$f,clipping_planes_vertex:Gf,color_fragment:Vf,color_pars_fragment:Wf,color_pars_vertex:qf,color_vertex:Xf,common:Yf,cube_uv_reflection_fragment:jf,defaultnormal_vertex:Kf,displacementmap_pars_vertex:Jf,displacementmap_vertex:Zf,emissivemap_fragment:Qf,emissivemap_pars_fragment:ep,colorspace_fragment:tp,colorspace_pars_fragment:np,envmap_fragment:ip,envmap_common_pars_fragment:sp,envmap_pars_fragment:rp,envmap_pars_vertex:ap,envmap_physical_pars_fragment:vp,envmap_vertex:op,fog_vertex:lp,fog_pars_vertex:cp,fog_fragment:hp,fog_pars_fragment:dp,gradientmap_pars_fragment:up,lightmap_pars_fragment:fp,lights_lambert_fragment:pp,lights_lambert_pars_fragment:mp,lights_pars_begin:gp,lights_toon_fragment:yp,lights_toon_pars_fragment:_p,lights_phong_fragment:xp,lights_phong_pars_fragment:bp,lights_physical_fragment:wp,lights_physical_pars_fragment:Mp,lights_fragment_begin:Sp,lights_fragment_maps:Tp,lights_fragment_end:Ep,logdepthbuf_fragment:Ap,logdepthbuf_pars_fragment:Rp,logdepthbuf_pars_vertex:Cp,logdepthbuf_vertex:kp,map_fragment:Lp,map_pars_fragment:Pp,map_particle_fragment:Ip,map_particle_pars_fragment:Dp,metalnessmap_fragment:Np,metalnessmap_pars_fragment:Up,morphinstance_vertex:Op,morphcolor_vertex:Fp,morphnormal_vertex:Bp,morphtarget_pars_vertex:zp,morphtarget_vertex:Hp,normal_fragment_begin:$p,normal_fragment_maps:Gp,normal_pars_fragment:Vp,normal_pars_vertex:Wp,normal_vertex:qp,normalmap_pars_fragment:Xp,clearcoat_normal_fragment_begin:Yp,clearcoat_normal_fragment_maps:jp,clearcoat_pars_fragment:Kp,iridescence_pars_fragment:Jp,opaque_fragment:Zp,packing:Qp,premultiplied_alpha_fragment:em,project_vertex:tm,dithering_fragment:nm,dithering_pars_fragment:im,roughnessmap_fragment:sm,roughnessmap_pars_fragment:rm,shadowmap_pars_fragment:am,shadowmap_pars_vertex:om,shadowmap_vertex:lm,shadowmask_pars_fragment:cm,skinbase_vertex:hm,skinning_pars_vertex:dm,skinning_vertex:um,skinnormal_vertex:fm,specularmap_fragment:pm,specularmap_pars_fragment:mm,tonemapping_fragment:gm,tonemapping_pars_fragment:vm,transmission_fragment:ym,transmission_pars_fragment:_m,uv_pars_fragment:xm,uv_pars_vertex:bm,uv_vertex:wm,worldpos_vertex:Mm,background_vert:Sm,background_frag:Tm,backgroundCube_vert:Em,backgroundCube_frag:Am,cube_vert:Rm,cube_frag:Cm,depth_vert:km,depth_frag:Lm,distanceRGBA_vert:Pm,distanceRGBA_frag:Im,equirect_vert:Dm,equirect_frag:Nm,linedashed_vert:Um,linedashed_frag:Om,meshbasic_vert:Fm,meshbasic_frag:Bm,meshlambert_vert:zm,meshlambert_frag:Hm,meshmatcap_vert:$m,meshmatcap_frag:Gm,meshnormal_vert:Vm,meshnormal_frag:Wm,meshphong_vert:qm,meshphong_frag:Xm,meshphysical_vert:Ym,meshphysical_frag:jm,meshtoon_vert:Km,meshtoon_frag:Jm,points_vert:Zm,points_frag:Qm,shadow_vert:eg,shadow_frag:tg,sprite_vert:ng,sprite_frag:ig},le={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},en={basic:{uniforms:Rt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Rt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ze(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Rt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Rt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Rt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new ze(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Rt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Rt([le.points,le.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Rt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Rt([le.common,le.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Rt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Rt([le.sprite,le.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Rt([le.common,le.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Rt([le.lights,le.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};en.physical={uniforms:Rt([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const sr={r:0,b:0,g:0},Jn=new an,sg=new lt;function rg(i,e,t,n,s,r,o){const a=new ze(0);let l=r===!0?0:1,c,d,h=null,u=0,p=null;function g(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?t:e).get(M)),M}function v(x){let M=!1;const _=g(x);_===null?f(a,l):_&&_.isColor&&(f(_,1),M=!0);const k=i.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,o):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,M){const _=g(M);_&&(_.isCubeTexture||_.mapping===Nr)?(d===void 0&&(d=new ft(new Ut(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Xi(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(k,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Jn.copy(M.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),d.material.uniforms.envMap.value=_,d.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(sg.makeRotationFromEuler(Jn)),d.material.toneMapped=qe.getTransfer(_.colorSpace)!==Ze,(h!==_||u!==_.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,h=_,u=_.version,p=i.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ft(new Or(2,2),new Vn({name:"BackgroundMaterial",uniforms:Xi(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=qe.getTransfer(_.colorSpace)!==Ze,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,p=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function f(x,M){x.getRGB(sr,Yh(i)),n.buffers.color.setClear(sr.r,sr.g,sr.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),l=M,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,f(a,l)},render:v,addToRenderList:m}}function ag(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(y,T,I,L,B){let X=!1;const G=h(L,I,T);r!==G&&(r=G,c(r.object)),X=p(y,L,I,B),X&&g(y,L,I,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,_(y,T,I,L),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function d(y){return i.deleteVertexArray(y)}function h(y,T,I){const L=I.wireframe===!0;let B=n[y.id];B===void 0&&(B={},n[y.id]=B);let X=B[T.id];X===void 0&&(X={},B[T.id]=X);let G=X[L];return G===void 0&&(G=u(l()),X[L]=G),G}function u(y){const T=[],I=[],L=[];for(let B=0;B<t;B++)T[B]=0,I[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:I,attributeDivisors:L,object:y,attributes:{},index:null}}function p(y,T,I,L){const B=r.attributes,X=T.attributes;let G=0;const Z=I.getAttributes();for(const z in Z)if(Z[z].location>=0){const ae=B[z];let oe=X[z];if(oe===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor)),ae===void 0||ae.attribute!==oe||oe&&ae.data!==oe.data)return!0;G++}return r.attributesNum!==G||r.index!==L}function g(y,T,I,L){const B={},X=T.attributes;let G=0;const Z=I.getAttributes();for(const z in Z)if(Z[z].location>=0){let ae=X[z];ae===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor));const oe={};oe.attribute=ae,ae&&ae.data&&(oe.data=ae.data),B[z]=oe,G++}r.attributes=B,r.attributesNum=G,r.index=L}function v(){const y=r.newAttributes;for(let T=0,I=y.length;T<I;T++)y[T]=0}function m(y){f(y,0)}function f(y,T){const I=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;I[y]=1,L[y]===0&&(i.enableVertexAttribArray(y),L[y]=1),B[y]!==T&&(i.vertexAttribDivisor(y,T),B[y]=T)}function x(){const y=r.newAttributes,T=r.enabledAttributes;for(let I=0,L=T.length;I<L;I++)T[I]!==y[I]&&(i.disableVertexAttribArray(I),T[I]=0)}function M(y,T,I,L,B,X,G){G===!0?i.vertexAttribIPointer(y,T,I,B,X):i.vertexAttribPointer(y,T,I,L,B,X)}function _(y,T,I,L){v();const B=L.attributes,X=I.getAttributes(),G=T.defaultAttributeValues;for(const Z in X){const z=X[Z];if(z.location>=0){let se=B[Z];if(se===void 0&&(Z==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),Z==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),se!==void 0){const ae=se.normalized,oe=se.itemSize,ke=e.get(se);if(ke===void 0)continue;const Te=ke.buffer,W=ke.type,ee=ke.bytesPerElement,ge=W===i.INT||W===i.UNSIGNED_INT||se.gpuType===zo;if(se.isInterleavedBufferAttribute){const ce=se.data,Ce=ce.stride,Ie=se.offset;if(ce.isInstancedInterleavedBuffer){for(let Be=0;Be<z.locationSize;Be++)f(z.location+Be,ce.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Be=0;Be<z.locationSize;Be++)m(z.location+Be);i.bindBuffer(i.ARRAY_BUFFER,Te);for(let Be=0;Be<z.locationSize;Be++)M(z.location+Be,oe/z.locationSize,W,ae,Ce*ee,(Ie+oe/z.locationSize*Be)*ee,ge)}else{if(se.isInstancedBufferAttribute){for(let ce=0;ce<z.locationSize;ce++)f(z.location+ce,se.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ce=0;ce<z.locationSize;ce++)m(z.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Te);for(let ce=0;ce<z.locationSize;ce++)M(z.location+ce,oe/z.locationSize,W,ae,oe*ee,oe/z.locationSize*ce*ee,ge)}}else if(G!==void 0){const ae=G[Z];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(z.location,ae);break;case 3:i.vertexAttrib3fv(z.location,ae);break;case 4:i.vertexAttrib4fv(z.location,ae);break;default:i.vertexAttrib1fv(z.location,ae)}}}}x()}function k(){R();for(const y in n){const T=n[y];for(const I in T){const L=T[I];for(const B in L)d(L[B].object),delete L[B];delete T[I]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;const T=n[y.id];for(const I in T){const L=T[I];for(const B in L)d(L[B].object),delete L[B];delete T[I]}delete n[y.id]}function C(y){for(const T in n){const I=n[T];if(I[y.id]===void 0)continue;const L=I[y.id];for(const B in L)d(L[B].object),delete L[B];delete I[y.id]}}function R(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:k,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function og(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function o(c,d,h){h!==0&&(i.drawArraysInstanced(n,c,d,h),t.update(d,n,h))}function a(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,h);let p=0;for(let g=0;g<h;g++)p+=d[g];t.update(p,n,1)}function l(c,d,h,u){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],d[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,d,0,u,0,h);let g=0;for(let v=0;v<h;v++)g+=d[v]*u[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function lg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Jt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const R=C===Ns&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==An&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Mn&&!R)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),k=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:k,maxSamples:E}}function cg(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Qn,a=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||n!==0||s;return s=u,n=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const x=r?0:n,M=x*4;let _=f.clippingState||null;l.value=_,_=d(g,u,M,p);for(let k=0;k!==M;++k)_[k]=t[k];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,_=p;M!==v;++M,_+=4)o.copy(h[M]).applyMatrix4(x,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function hg(i){let e=new WeakMap;function t(o,a){return a===ja?o.mapping=Gi:a===Ka&&(o.mapping=Vi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ja||a===Ka)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new bf(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Yo extends jh{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Di=4,$l=[.125,.215,.35,.446,.526,.582],ni=20,pa=new Yo,Gl=new ze;let ma=null,ga=0,va=0,ya=!1;const ei=(1+Math.sqrt(5))/2,Ti=1/ei,Vl=[new P(-ei,Ti,0),new P(ei,Ti,0),new P(-Ti,0,ei),new P(Ti,0,ei),new P(0,ei,-Ti),new P(0,ei,Ti),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Wl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ma,ga,va),this._renderer.xr.enabled=ya,e.scissorTest=!1,rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:Ns,format:Jt,colorSpace:Ki,depthBuffer:!1},s=ql(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ql(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dg(r)),this._blurMaterial=ug(r,e,t)}return s}_compileMaterial(e){const t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,pa)}_sceneToCubeUV(e,t,n,s){const a=new $t(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,u=d.toneMapping;d.getClearColor(Gl),d.toneMapping=Hn,d.autoClear=!1;const p=new Wh({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),g=new ft(new Ut,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Gl),v=!0);for(let f=0;f<6;f++){const x=f%3;x===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):x===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const M=this._cubeSize;rr(s,x*M,f>2?M:0,M,M),d.setRenderTarget(s),v&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=u,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Gi||e.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ft(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;rr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,pa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Vl[(s-r-1)%Vl.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new ft(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ni-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):ni;m>ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const f=[];let x=0;for(let C=0;C<ni;++C){const R=C/v,b=Math.exp(-R*R/2);f.push(b),C===0?x+=b:C<m&&(x+=2*b)}for(let C=0;C<f.length;C++)f[C]=f[C]/x;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-n;const _=this._sizeLods[s],k=3*_*(s>M-Di?s-M+Di:0),E=4*(this._cubeSize-_);rr(t,k,E,3*_,2*_),l.setRenderTarget(t),l.render(h,pa)}}function dg(i){const e=[],t=[],n=[];let s=i;const r=i-Di+1+$l.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Di?l=$l[o-i+Di-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,v=3,m=2,f=1,x=new Float32Array(v*g*p),M=new Float32Array(m*g*p),_=new Float32Array(f*g*p);for(let E=0;E<p;E++){const C=E%3*2/3-1,R=E>2?0:-1,b=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];x.set(b,v*g*E),M.set(u,m*g*E);const y=[E,E,E,E,E,E];_.set(y,f*g*E)}const k=new on;k.setAttribute("position",new Zt(x,v)),k.setAttribute("uv",new Zt(M,m)),k.setAttribute("faceIndex",new Zt(_,f)),e.push(k),s>Di&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ql(i,e,t){const n=new li(i,e,t);return n.texture.mapping=Nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ug(i,e,t){const n=new Float32Array(ni),s=new P(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Xl(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Yl(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function jo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fg(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ja||l===Ka,d=l===Gi||l===Vi;if(c||d){let h=e.get(a);const u=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Wl(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||d&&p&&s(p)?(t===null&&(t=new Wl(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function pg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&_s("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mg(i,e,t,n){const s={},r=new WeakMap;function o(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)e.remove(v[m])}u.removeEventListener("dispose",o),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(h,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(h){const u=h.attributes;for(const g in u)e.update(u[g],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const v=p[g];for(let m=0,f=v.length;m<f;m++)e.update(v[m],i.ARRAY_BUFFER)}}function c(h){const u=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const x=p.array;v=p.version;for(let M=0,_=x.length;M<_;M+=3){const k=x[M+0],E=x[M+1],C=x[M+2];u.push(k,E,E,C,C,k)}}else if(g!==void 0){const x=g.array;v=g.version;for(let M=0,_=x.length/3-1;M<_;M+=3){const k=M+0,E=M+1,C=M+2;u.push(k,E,E,C,C,k)}}else return;const m=new(zh(u)?Xh:qh)(u,1);m.version=v;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function d(h){const u=r.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function gg(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,p){i.drawElements(n,p,r,u*o),t.update(p,n,1)}function c(u,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,u*o,g),t.update(p,n,g))}function d(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function h(u,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/o,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,v,0,g);let f=0;for(let x=0;x<g;x++)f+=p[x]*v[x];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function vg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function yg(i,e,t){const n=new WeakMap,s=new et;function r(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(a);if(u===void 0||u.count!==h){let b=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),v===!0&&(M=3);let _=a.attributes.position.count*M,k=1;_>e.maxTextureSize&&(k=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const E=new Float32Array(_*k*4*h),C=new $h(E,_,k,h);C.type=Mn,C.needsUpdate=!0;const R=M*4;for(let y=0;y<h;y++){const T=m[y],I=f[y],L=x[y],B=_*k*4*y;for(let X=0;X<T.count;X++){const G=X*R;p===!0&&(s.fromBufferAttribute(T,X),E[B+G+0]=s.x,E[B+G+1]=s.y,E[B+G+2]=s.z,E[B+G+3]=0),g===!0&&(s.fromBufferAttribute(I,X),E[B+G+4]=s.x,E[B+G+5]=s.y,E[B+G+6]=s.z,E[B+G+7]=0),v===!0&&(s.fromBufferAttribute(L,X),E[B+G+8]=s.x,E[B+G+9]=s.y,E[B+G+10]=s.z,E[B+G+11]=L.itemSize===4?s.w:1)}}u={count:h,texture:C,size:new me(_,k)},n.set(a,u),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function _g(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Zh extends Et{constructor(e,t,n,s,r,o,a,l,c,d=Bi){if(d!==Bi&&d!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Bi&&(n=oi),n===void 0&&d===qi&&(n=Wi),super(null,s,r,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ot,this.minFilter=l!==void 0?l:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Qh=new Et,jl=new Zh(1,1),ed=new $h,td=new sf,nd=new Kh,Kl=[],Jl=[],Zl=new Float32Array(16),Ql=new Float32Array(9),ec=new Float32Array(4);function Qi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Kl[s];if(r===void 0&&(r=new Float32Array(s),Kl[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fr(i,e){let t=Jl[e];t===void 0&&(t=new Int32Array(e),Jl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function xg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2fv(this.addr,e),mt(t,e)}}function wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;i.uniform3fv(this.addr,e),mt(t,e)}}function Mg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4fv(this.addr,e),mt(t,e)}}function Sg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;ec.set(n),i.uniformMatrix2fv(this.addr,!1,ec),mt(t,n)}}function Tg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Ql.set(n),i.uniformMatrix3fv(this.addr,!1,Ql),mt(t,n)}}function Eg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Zl.set(n),i.uniformMatrix4fv(this.addr,!1,Zl),mt(t,n)}}function Ag(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2iv(this.addr,e),mt(t,e)}}function Cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3iv(this.addr,e),mt(t,e)}}function kg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4iv(this.addr,e),mt(t,e)}}function Lg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2uiv(this.addr,e),mt(t,e)}}function Ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3uiv(this.addr,e),mt(t,e)}}function Dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4uiv(this.addr,e),mt(t,e)}}function Ng(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(jl.compareFunction=Bh,r=jl):r=Qh,t.setTexture2D(e||r,s)}function Ug(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||td,s)}function Og(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||nd,s)}function Fg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ed,s)}function Bg(i){switch(i){case 5126:return xg;case 35664:return bg;case 35665:return wg;case 35666:return Mg;case 35674:return Sg;case 35675:return Tg;case 35676:return Eg;case 5124:case 35670:return Ag;case 35667:case 35671:return Rg;case 35668:case 35672:return Cg;case 35669:case 35673:return kg;case 5125:return Lg;case 36294:return Pg;case 36295:return Ig;case 36296:return Dg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return Fg}}function zg(i,e){i.uniform1fv(this.addr,e)}function Hg(i,e){const t=Qi(e,this.size,2);i.uniform2fv(this.addr,t)}function $g(i,e){const t=Qi(e,this.size,3);i.uniform3fv(this.addr,t)}function Gg(i,e){const t=Qi(e,this.size,4);i.uniform4fv(this.addr,t)}function Vg(i,e){const t=Qi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Wg(i,e){const t=Qi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function qg(i,e){const t=Qi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xg(i,e){i.uniform1iv(this.addr,e)}function Yg(i,e){i.uniform2iv(this.addr,e)}function jg(i,e){i.uniform3iv(this.addr,e)}function Kg(i,e){i.uniform4iv(this.addr,e)}function Jg(i,e){i.uniform1uiv(this.addr,e)}function Zg(i,e){i.uniform2uiv(this.addr,e)}function Qg(i,e){i.uniform3uiv(this.addr,e)}function ev(i,e){i.uniform4uiv(this.addr,e)}function tv(i,e,t){const n=this.cache,s=e.length,r=Fr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Qh,r[o])}function nv(i,e,t){const n=this.cache,s=e.length,r=Fr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||td,r[o])}function iv(i,e,t){const n=this.cache,s=e.length,r=Fr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||nd,r[o])}function sv(i,e,t){const n=this.cache,s=e.length,r=Fr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||ed,r[o])}function rv(i){switch(i){case 5126:return zg;case 35664:return Hg;case 35665:return $g;case 35666:return Gg;case 35674:return Vg;case 35675:return Wg;case 35676:return qg;case 5124:case 35670:return Xg;case 35667:case 35671:return Yg;case 35668:case 35672:return jg;case 35669:case 35673:return Kg;case 5125:return Jg;case 36294:return Zg;case 36295:return Qg;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return tv;case 35679:case 36299:case 36307:return nv;case 35680:case 36300:case 36308:case 36293:return iv;case 36289:case 36303:case 36311:case 36292:return sv}}class av{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bg(t.type)}}class ov{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rv(t.type)}}class lv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function tc(i,e){i.seq.push(e),i.map[e.id]=e}function cv(i,e,t){const n=i.name,s=n.length;for(_a.lastIndex=0;;){const r=_a.exec(n),o=_a.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){tc(t,c===void 0?new av(a,i,e):new ov(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new lv(a),tc(t,h)),t=h}}}class br{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);cv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function nc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const hv=37297;let dv=0;function uv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const ic=new Ue;function fv(i){qe._getMatrix(ic,qe.workingColorSpace,i);const e=`mat3( ${ic.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case Ur:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function sc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+uv(i.getShaderSource(e),o)}else return s}function pv(i,e){const t=fv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function mv(i,e){let t;switch(e){case ku:t="Linear";break;case Lu:t="Reinhard";break;case Pu:t="Cineon";break;case Iu:t="ACESFilmic";break;case Nu:t="AgX";break;case Uu:t="Neutral";break;case Du:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ar=new P;function gv(){qe.getLuminanceCoefficients(ar);const i=ar.x.toFixed(4),e=ar.y.toFixed(4),t=ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xs).join(`
`)}function yv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function _v(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function xs(i){return i!==""}function rc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ac(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ro(i){return i.replace(xv,wv)}const bv=new Map;function wv(i,e){let t=Fe[e];if(t===void 0){const n=bv.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ro(t)}const Mv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oc(i){return i.replace(Mv,Sv)}function Sv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Tv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Sh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Th?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ev(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Gi:case Vi:e="ENVMAP_TYPE_CUBE";break;case Nr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Av(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function Rv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Eh:e="ENVMAP_BLENDING_MULTIPLY";break;case Ru:e="ENVMAP_BLENDING_MIX";break;case Cu:e="ENVMAP_BLENDING_ADD";break}return e}function Cv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function kv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Tv(t),c=Ev(t),d=Av(t),h=Rv(t),u=Cv(t),p=vv(t),g=yv(r),v=s.createProgram();let m,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xs).join(`
`),f.length>0&&(f+=`
`)):(m=[lc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xs).join(`
`),f=[lc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Hn?mv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,pv("linearToOutputTexel",t.outputColorSpace),gv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xs).join(`
`)),o=Ro(o),o=rc(o,t),o=ac(o,t),a=Ro(a),a=rc(a,t),a=ac(a,t),o=oc(o),a=oc(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===bl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=x+m+o,_=x+f+a,k=nc(s,s.VERTEX_SHADER,M),E=nc(s,s.FRAGMENT_SHADER,_);s.attachShader(v,k),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(T){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(v).trim(),L=s.getShaderInfoLog(k).trim(),B=s.getShaderInfoLog(E).trim();let X=!0,G=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,k,E);else{const Z=sc(s,k,"vertex"),z=sc(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+I+`
`+Z+`
`+z)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(L===""||B==="")&&(G=!1);G&&(T.diagnostics={runnable:X,programLog:I,vertexShader:{log:L,prefix:m},fragmentShader:{log:B,prefix:f}})}s.deleteShader(k),s.deleteShader(E),R=new br(s,v),b=_v(s,v)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,hv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=k,this.fragmentShader=E,this}let Lv=0;class Pv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Iv(e),t.set(e,n)),n}}class Iv{constructor(e){this.id=Lv++,this.code=e,this.usedTimes=0}}function Dv(i,e,t,n,s,r,o){const a=new Gh,l=new Pv,c=new Set,d=[],h=s.logarithmicDepthBuffer,u=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,y,T,I,L){const B=I.fog,X=L.geometry,G=b.isMeshStandardMaterial?I.environment:null,Z=(b.isMeshStandardMaterial?t:e).get(b.envMap||G),z=Z&&Z.mapping===Nr?Z.image.height:null,se=g[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const ae=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,oe=ae!==void 0?ae.length:0;let ke=0;X.morphAttributes.position!==void 0&&(ke=1),X.morphAttributes.normal!==void 0&&(ke=2),X.morphAttributes.color!==void 0&&(ke=3);let Te,W,ee,ge;if(se){const Je=en[se];Te=Je.vertexShader,W=Je.fragmentShader}else Te=b.vertexShader,W=b.fragmentShader,l.update(b),ee=l.getVertexShaderID(b),ge=l.getFragmentShaderID(b);const ce=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Ie=L.isInstancedMesh===!0,Be=L.isBatchedMesh===!0,ct=!!b.map,Ve=!!b.matcap,dt=!!Z,O=!!b.aoMap,Bt=!!b.lightMap,He=!!b.bumpMap,$e=!!b.normalMap,Ae=!!b.displacementMap,st=!!b.emissiveMap,Ee=!!b.metalnessMap,A=!!b.roughnessMap,w=b.anisotropy>0,F=b.clearcoat>0,K=b.dispersion>0,Q=b.iridescence>0,j=b.sheen>0,Me=b.transmission>0,de=w&&!!b.anisotropyMap,ve=F&&!!b.clearcoatMap,We=F&&!!b.clearcoatNormalMap,te=F&&!!b.clearcoatRoughnessMap,ye=Q&&!!b.iridescenceMap,Re=Q&&!!b.iridescenceThicknessMap,Le=j&&!!b.sheenColorMap,_e=j&&!!b.sheenRoughnessMap,Ge=!!b.specularMap,Oe=!!b.specularColorMap,tt=!!b.specularIntensityMap,D=Me&&!!b.transmissionMap,he=Me&&!!b.thicknessMap,V=!!b.gradientMap,J=!!b.alphaMap,pe=b.alphaTest>0,ue=!!b.alphaHash,De=!!b.extensions;let ht=Hn;b.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(ht=i.toneMapping);const bt={shaderID:se,shaderType:b.type,shaderName:b.name,vertexShader:Te,fragmentShader:W,defines:b.defines,customVertexShaderID:ee,customFragmentShaderID:ge,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Be,batchingColor:Be&&L._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&L.instanceColor!==null,instancingMorph:Ie&&L.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Ki,alphaToCoverage:!!b.alphaToCoverage,map:ct,matcap:Ve,envMap:dt,envMapMode:dt&&Z.mapping,envMapCubeUVHeight:z,aoMap:O,lightMap:Bt,bumpMap:He,normalMap:$e,displacementMap:u&&Ae,emissiveMap:st,normalMapObjectSpace:$e&&b.normalMapType===zu,normalMapTangentSpace:$e&&b.normalMapType===Fh,metalnessMap:Ee,roughnessMap:A,anisotropy:w,anisotropyMap:de,clearcoat:F,clearcoatMap:ve,clearcoatNormalMap:We,clearcoatRoughnessMap:te,dispersion:K,iridescence:Q,iridescenceMap:ye,iridescenceThicknessMap:Re,sheen:j,sheenColorMap:Le,sheenRoughnessMap:_e,specularMap:Ge,specularColorMap:Oe,specularIntensityMap:tt,transmission:Me,transmissionMap:D,thicknessMap:he,gradientMap:V,opaque:b.transparent===!1&&b.blending===Fi&&b.alphaToCoverage===!1,alphaMap:J,alphaTest:pe,alphaHash:ue,combine:b.combine,mapUv:ct&&v(b.map.channel),aoMapUv:O&&v(b.aoMap.channel),lightMapUv:Bt&&v(b.lightMap.channel),bumpMapUv:He&&v(b.bumpMap.channel),normalMapUv:$e&&v(b.normalMap.channel),displacementMapUv:Ae&&v(b.displacementMap.channel),emissiveMapUv:st&&v(b.emissiveMap.channel),metalnessMapUv:Ee&&v(b.metalnessMap.channel),roughnessMapUv:A&&v(b.roughnessMap.channel),anisotropyMapUv:de&&v(b.anisotropyMap.channel),clearcoatMapUv:ve&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:We&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:_e&&v(b.sheenRoughnessMap.channel),specularMapUv:Ge&&v(b.specularMap.channel),specularColorMapUv:Oe&&v(b.specularColorMap.channel),specularIntensityMapUv:tt&&v(b.specularIntensityMap.channel),transmissionMapUv:D&&v(b.transmissionMap.channel),thicknessMapUv:he&&v(b.thicknessMap.channel),alphaMapUv:J&&v(b.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&($e||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!X.attributes.uv&&(ct||J),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ce,skinning:L.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ke,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:ht,decodeVideoTexture:ct&&b.map.isVideoTexture===!0&&qe.getTransfer(b.map.colorSpace)===Ze,decodeVideoTextureEmissive:st&&b.emissiveMap.isVideoTexture===!0&&qe.getTransfer(b.emissiveMap.colorSpace)===Ze,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===xn,flipSided:b.side===Lt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:De&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&b.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return bt.vertexUv1s=c.has(1),bt.vertexUv2s=c.has(2),bt.vertexUv3s=c.has(3),c.clear(),bt}function f(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const T in b.defines)y.push(T),y.push(b.defines[T]);return b.isRawShaderMaterial===!1&&(x(y,b),M(y,b),y.push(i.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function x(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function M(b,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){const y=g[b.type];let T;if(y){const I=en[y];T=vf.clone(I.uniforms)}else T=b.uniforms;return T}function k(b,y){let T;for(let I=0,L=d.length;I<L;I++){const B=d[I];if(B.cacheKey===y){T=B,++T.usedTimes;break}}return T===void 0&&(T=new kv(i,y,b,r),d.push(T)),T}function E(b){if(--b.usedTimes===0){const y=d.indexOf(b);d[y]=d[d.length-1],d.pop(),b.destroy()}}function C(b){l.remove(b)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:k,releaseProgram:E,releaseShaderCache:C,programs:d,dispose:R}}function Nv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Uv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function cc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,u,p,g,v,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:u,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=m),e++,f}function a(h,u,p,g,v,m){const f=o(h,u,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(h,u,p,g,v,m){const f=o(h,u,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(h,u){t.length>1&&t.sort(h||Uv),n.length>1&&n.sort(u||cc),s.length>1&&s.sort(u||cc)}function d(){for(let h=e,u=i.length;h<u;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function Ov(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new hc,i.set(n,[o])):s>=r.length?(o=new hc,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Fv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new ze};break;case"SpotLight":t={position:new P,direction:new P,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Bv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let zv=0;function Hv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $v(i){const e=new Fv,t=Bv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new lt,o=new lt;function a(c){let d=0,h=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,x=0,M=0,_=0,k=0,E=0,C=0;c.sort(Hv);for(let b=0,y=c.length;b<y;b++){const T=c[b],I=T.color,L=T.intensity,B=T.distance,X=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)d+=I.r*L,h+=I.g*L,u+=I.b*L;else if(T.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(T.sh.coefficients[G],L);C++}else if(T.isDirectionalLight){const G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const Z=T.shadow,z=t.get(T);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=X,n.directionalShadowMatrix[p]=T.shadow.matrix,x++}n.directional[p]=G,p++}else if(T.isSpotLight){const G=e.get(T);G.position.setFromMatrixPosition(T.matrixWorld),G.color.copy(I).multiplyScalar(L),G.distance=B,G.coneCos=Math.cos(T.angle),G.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),G.decay=T.decay,n.spot[v]=G;const Z=T.shadow;if(T.map&&(n.spotLightMap[k]=T.map,k++,Z.updateMatrices(T),T.castShadow&&E++),n.spotLightMatrix[v]=Z.matrix,T.castShadow){const z=t.get(T);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=X,_++}v++}else if(T.isRectAreaLight){const G=e.get(T);G.color.copy(I).multiplyScalar(L),G.halfWidth.set(T.width*.5,0,0),G.halfHeight.set(0,T.height*.5,0),n.rectArea[m]=G,m++}else if(T.isPointLight){const G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),G.distance=T.distance,G.decay=T.decay,T.castShadow){const Z=T.shadow,z=t.get(T);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,z.shadowCameraNear=Z.camera.near,z.shadowCameraFar=Z.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=T.shadow.matrix,M++}n.point[g]=G,g++}else if(T.isHemisphereLight){const G=e.get(T);G.skyColor.copy(T.color).multiplyScalar(L),G.groundColor.copy(T.groundColor).multiplyScalar(L),n.hemi[f]=G,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==m||R.hemiLength!==f||R.numDirectionalShadows!==x||R.numPointShadows!==M||R.numSpotShadows!==_||R.numSpotMaps!==k||R.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+k-E,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,R.directionalLength=p,R.pointLength=g,R.spotLength=v,R.rectAreaLength=m,R.hemiLength=f,R.numDirectionalShadows=x,R.numPointShadows=M,R.numSpotShadows=_,R.numSpotMaps=k,R.numLightProbes=C,n.version=zv++)}function l(c,d){let h=0,u=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let f=0,x=c.length;f<x;f++){const M=c[f];if(M.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(M.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const _=n.point[u];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function dc(i){const e=new $v(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function o(d){n.push(d)}function a(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Gv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new dc(i),e.set(s,[a])):r>=o.length?(a=new dc(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Vv extends Zi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Fu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wv extends Zi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Yv(i,e,t){let n=new Xo;const s=new me,r=new me,o=new et,a=new Vv({depthPacking:Bu}),l=new Wv,c={},d=t.maxTextureSize,h={[Gn]:Lt,[Lt]:Gn,[xn]:xn},u=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:qv,fragmentShader:Xv}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new on;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ft(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sh;let f=this.type;this.render=function(E,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const b=i.getRenderTarget(),y=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),I=i.state;I.setBlending(zn),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const L=f!==vn&&this.type===vn,B=f===vn&&this.type!==vn;for(let X=0,G=E.length;X<G;X++){const Z=E[X],z=Z.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const se=z.getFrameExtents();if(s.multiply(se),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/se.x),s.x=r.x*se.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/se.y),s.y=r.y*se.y,z.mapSize.y=r.y)),z.map===null||L===!0||B===!0){const oe=this.type!==vn?{minFilter:Ot,magFilter:Ot}:{};z.map!==null&&z.map.dispose(),z.map=new li(s.x,s.y,oe),z.map.texture.name=Z.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const ae=z.getViewportCount();for(let oe=0;oe<ae;oe++){const ke=z.getViewport(oe);o.set(r.x*ke.x,r.y*ke.y,r.x*ke.z,r.y*ke.w),I.viewport(o),z.updateMatrices(Z,oe),n=z.getFrustum(),_(C,R,z.camera,Z,this.type)}z.isPointLightShadow!==!0&&this.type===vn&&x(z,R),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(b,y,T)};function x(E,C){const R=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new li(s.x,s.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,R,u,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,R,p,v,null)}function M(E,C,R,b){let y=null;const T=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(T!==void 0)y=T;else if(y=R.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const I=y.uuid,L=C.uuid;let B=c[I];B===void 0&&(B={},c[I]=B);let X=B[L];X===void 0&&(X=y.clone(),B[L]=X,C.addEventListener("dispose",k)),y=X}if(y.visible=C.visible,y.wireframe=C.wireframe,b===vn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:h[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const I=i.properties.get(y);I.light=R}return y}function _(E,C,R,b,y){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===vn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const L=e.update(E),B=E.material;if(Array.isArray(B)){const X=L.groups;for(let G=0,Z=X.length;G<Z;G++){const z=X[G],se=B[z.materialIndex];if(se&&se.visible){const ae=M(E,se,b,y);E.onBeforeShadow(i,E,C,R,L,ae,z),i.renderBufferDirect(R,null,L,ae,E,z),E.onAfterShadow(i,E,C,R,L,ae,z)}}}else if(B.visible){const X=M(E,B,b,y);E.onBeforeShadow(i,E,C,R,L,X,null),i.renderBufferDirect(R,null,L,X,E,null),E.onAfterShadow(i,E,C,R,L,X,null)}}const I=E.children;for(let L=0,B=I.length;L<B;L++)_(I[L],C,R,b,y)}function k(E){E.target.removeEventListener("dispose",k);for(const R in c){const b=c[R],y=E.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}const jv={[$a]:Ga,[Va]:Xa,[Wa]:Ya,[$i]:qa,[Ga]:$a,[Xa]:Va,[Ya]:Wa,[qa]:$i};function Kv(i,e){function t(){let D=!1;const he=new et;let V=null;const J=new et(0,0,0,0);return{setMask:function(pe){V!==pe&&!D&&(i.colorMask(pe,pe,pe,pe),V=pe)},setLocked:function(pe){D=pe},setClear:function(pe,ue,De,ht,bt){bt===!0&&(pe*=ht,ue*=ht,De*=ht),he.set(pe,ue,De,ht),J.equals(he)===!1&&(i.clearColor(pe,ue,De,ht),J.copy(he))},reset:function(){D=!1,V=null,J.set(-1,0,0,0)}}}function n(){let D=!1,he=!1,V=null,J=null,pe=null;return{setReversed:function(ue){if(he!==ue){const De=e.get("EXT_clip_control");he?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);const ht=pe;pe=null,this.setClear(ht)}he=ue},getReversed:function(){return he},setTest:function(ue){ue?ce(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(ue){V!==ue&&!D&&(i.depthMask(ue),V=ue)},setFunc:function(ue){if(he&&(ue=jv[ue]),J!==ue){switch(ue){case $a:i.depthFunc(i.NEVER);break;case Ga:i.depthFunc(i.ALWAYS);break;case Va:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case Wa:i.depthFunc(i.EQUAL);break;case qa:i.depthFunc(i.GEQUAL);break;case Xa:i.depthFunc(i.GREATER);break;case Ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=ue}},setLocked:function(ue){D=ue},setClear:function(ue){pe!==ue&&(he&&(ue=1-ue),i.clearDepth(ue),pe=ue)},reset:function(){D=!1,V=null,J=null,pe=null,he=!1}}}function s(){let D=!1,he=null,V=null,J=null,pe=null,ue=null,De=null,ht=null,bt=null;return{setTest:function(Je){D||(Je?ce(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(Je){he!==Je&&!D&&(i.stencilMask(Je),he=Je)},setFunc:function(Je,Vt,cn){(V!==Je||J!==Vt||pe!==cn)&&(i.stencilFunc(Je,Vt,cn),V=Je,J=Vt,pe=cn)},setOp:function(Je,Vt,cn){(ue!==Je||De!==Vt||ht!==cn)&&(i.stencilOp(Je,Vt,cn),ue=Je,De=Vt,ht=cn)},setLocked:function(Je){D=Je},setClear:function(Je){bt!==Je&&(i.clearStencil(Je),bt=Je)},reset:function(){D=!1,he=null,V=null,J=null,pe=null,ue=null,De=null,ht=null,bt=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let d={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,x=null,M=null,_=null,k=null,E=null,C=new ze(0,0,0),R=0,b=!1,y=null,T=null,I=null,L=null,B=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Z=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(z)[1]),G=Z>=1):z.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),G=Z>=2);let se=null,ae={};const oe=i.getParameter(i.SCISSOR_BOX),ke=i.getParameter(i.VIEWPORT),Te=new et().fromArray(oe),W=new et().fromArray(ke);function ee(D,he,V,J){const pe=new Uint8Array(4),ue=i.createTexture();i.bindTexture(D,ue),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<V;De++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,pe):i.texImage2D(he+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pe);return ue}const ge={};ge[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(i.DEPTH_TEST),o.setFunc($i),He(!1),$e(vl),ce(i.CULL_FACE),O(zn);function ce(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function Ce(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Ie(D,he){return h[D]!==he?(i.bindFramebuffer(D,he),h[D]=he,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=he),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=he),!0):!1}function Be(D,he){let V=p,J=!1;if(D){V=u.get(he),V===void 0&&(V=[],u.set(he,V));const pe=D.textures;if(V.length!==pe.length||V[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,De=pe.length;ue<De;ue++)V[ue]=i.COLOR_ATTACHMENT0+ue;V.length=pe.length,J=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,J=!0);J&&i.drawBuffers(V)}function ct(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const Ve={[ti]:i.FUNC_ADD,[du]:i.FUNC_SUBTRACT,[uu]:i.FUNC_REVERSE_SUBTRACT};Ve[fu]=i.MIN,Ve[pu]=i.MAX;const dt={[mu]:i.ZERO,[gu]:i.ONE,[vu]:i.SRC_COLOR,[za]:i.SRC_ALPHA,[Mu]:i.SRC_ALPHA_SATURATE,[bu]:i.DST_COLOR,[_u]:i.DST_ALPHA,[yu]:i.ONE_MINUS_SRC_COLOR,[Ha]:i.ONE_MINUS_SRC_ALPHA,[wu]:i.ONE_MINUS_DST_COLOR,[xu]:i.ONE_MINUS_DST_ALPHA,[Su]:i.CONSTANT_COLOR,[Tu]:i.ONE_MINUS_CONSTANT_COLOR,[Eu]:i.CONSTANT_ALPHA,[Au]:i.ONE_MINUS_CONSTANT_ALPHA};function O(D,he,V,J,pe,ue,De,ht,bt,Je){if(D===zn){v===!0&&(Ce(i.BLEND),v=!1);return}if(v===!1&&(ce(i.BLEND),v=!0),D!==hu){if(D!==m||Je!==b){if((f!==ti||_!==ti)&&(i.blendEquation(i.FUNC_ADD),f=ti,_=ti),Je)switch(D){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ba:i.blendFunc(i.ONE,i.ONE);break;case yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _l:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ba:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _l:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}x=null,M=null,k=null,E=null,C.set(0,0,0),R=0,m=D,b=Je}return}pe=pe||he,ue=ue||V,De=De||J,(he!==f||pe!==_)&&(i.blendEquationSeparate(Ve[he],Ve[pe]),f=he,_=pe),(V!==x||J!==M||ue!==k||De!==E)&&(i.blendFuncSeparate(dt[V],dt[J],dt[ue],dt[De]),x=V,M=J,k=ue,E=De),(ht.equals(C)===!1||bt!==R)&&(i.blendColor(ht.r,ht.g,ht.b,bt),C.copy(ht),R=bt),m=D,b=!1}function Bt(D,he){D.side===xn?Ce(i.CULL_FACE):ce(i.CULL_FACE);let V=D.side===Lt;he&&(V=!V),He(V),D.blending===Fi&&D.transparent===!1?O(zn):O(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const J=D.stencilWrite;a.setTest(J),J&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),st(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(D){y!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),y=D)}function $e(D){D!==lu?(ce(i.CULL_FACE),D!==T&&(D===vl?i.cullFace(i.BACK):D===cu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),T=D}function Ae(D){D!==I&&(G&&i.lineWidth(D),I=D)}function st(D,he,V){D?(ce(i.POLYGON_OFFSET_FILL),(L!==he||B!==V)&&(i.polygonOffset(he,V),L=he,B=V)):Ce(i.POLYGON_OFFSET_FILL)}function Ee(D){D?ce(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function A(D){D===void 0&&(D=i.TEXTURE0+X-1),se!==D&&(i.activeTexture(D),se=D)}function w(D,he,V){V===void 0&&(se===null?V=i.TEXTURE0+X-1:V=se);let J=ae[V];J===void 0&&(J={type:void 0,texture:void 0},ae[V]=J),(J.type!==D||J.texture!==he)&&(se!==V&&(i.activeTexture(V),se=V),i.bindTexture(D,he||ge[D]),J.type=D,J.texture=he)}function F(){const D=ae[se];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function de(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(D){Te.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Te.copy(D))}function _e(D){W.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),W.copy(D))}function Ge(D,he){let V=c.get(he);V===void 0&&(V=new WeakMap,c.set(he,V));let J=V.get(D);J===void 0&&(J=i.getUniformBlockIndex(he,D.name),V.set(D,J))}function Oe(D,he){const J=c.get(he).get(D);l.get(he)!==J&&(i.uniformBlockBinding(he,J,D.__bindingPointIndex),l.set(he,J))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},se=null,ae={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,x=null,M=null,_=null,k=null,E=null,C=new ze(0,0,0),R=0,b=!1,y=null,T=null,I=null,L=null,B=null,Te.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ce,disable:Ce,bindFramebuffer:Ie,drawBuffers:Be,useProgram:ct,setBlending:O,setMaterial:Bt,setFlipSided:He,setCullFace:$e,setLineWidth:Ae,setPolygonOffset:st,setScissorTest:Ee,activeTexture:A,bindTexture:w,unbindTexture:F,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:ye,texImage3D:Re,updateUBOMapping:Ge,uniformBlockBinding:Oe,texStorage2D:We,texStorage3D:te,texSubImage2D:j,texSubImage3D:Me,compressedTexSubImage2D:de,compressedTexSubImage3D:ve,scissor:Le,viewport:_e,reset:tt}}function uc(i,e,t,n){const s=Jv(n);switch(t){case Lh:return i*e;case Ih:return i*e;case Dh:return i*e*2;case Nh:return i*e/s.components*s.byteLength;case Go:return i*e/s.components*s.byteLength;case Uh:return i*e*2/s.components*s.byteLength;case Vo:return i*e*2/s.components*s.byteLength;case Ph:return i*e*3/s.components*s.byteLength;case Jt:return i*e*4/s.components*s.byteLength;case Wo:return i*e*4/s.components*s.byteLength;case gr:case vr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yr:case _r:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case eo:case no:return Math.max(i,16)*Math.max(e,8)/4;case Qa:case to:return Math.max(i,8)*Math.max(e,8)/2;case io:case so:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case lo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ho:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case uo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case fo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case po:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case _o:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case xr:case bo:case wo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Oh:case Mo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case So:case To:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Jv(i){switch(i){case An:case Rh:return{byteLength:1,components:1};case Is:case Ch:case Ns:return{byteLength:2,components:1};case Ho:case $o:return{byteLength:2,components:4};case oi:case zo:case Mn:return{byteLength:4,components:1};case kh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Zv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new me,d=new WeakMap;let h;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,w){return p?new OffscreenCanvas(A,w):Ds("canvas")}function v(A,w,F){let K=1;const Q=Ee(A);if((Q.width>F||Q.height>F)&&(K=F/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(K*Q.width),Me=Math.floor(K*Q.height);h===void 0&&(h=g(j,Me));const de=w?g(j,Me):h;return de.width=j,de.height=Me,de.getContext("2d").drawImage(A,0,0,j,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+Me+")."),de}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function x(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,w,F,K,Q=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=w;if(w===i.RED&&(F===i.FLOAT&&(j=i.R32F),F===i.HALF_FLOAT&&(j=i.R16F),F===i.UNSIGNED_BYTE&&(j=i.R8)),w===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.R8UI),F===i.UNSIGNED_SHORT&&(j=i.R16UI),F===i.UNSIGNED_INT&&(j=i.R32UI),F===i.BYTE&&(j=i.R8I),F===i.SHORT&&(j=i.R16I),F===i.INT&&(j=i.R32I)),w===i.RG&&(F===i.FLOAT&&(j=i.RG32F),F===i.HALF_FLOAT&&(j=i.RG16F),F===i.UNSIGNED_BYTE&&(j=i.RG8)),w===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RG8UI),F===i.UNSIGNED_SHORT&&(j=i.RG16UI),F===i.UNSIGNED_INT&&(j=i.RG32UI),F===i.BYTE&&(j=i.RG8I),F===i.SHORT&&(j=i.RG16I),F===i.INT&&(j=i.RG32I)),w===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGB8UI),F===i.UNSIGNED_SHORT&&(j=i.RGB16UI),F===i.UNSIGNED_INT&&(j=i.RGB32UI),F===i.BYTE&&(j=i.RGB8I),F===i.SHORT&&(j=i.RGB16I),F===i.INT&&(j=i.RGB32I)),w===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),F===i.UNSIGNED_INT&&(j=i.RGBA32UI),F===i.BYTE&&(j=i.RGBA8I),F===i.SHORT&&(j=i.RGBA16I),F===i.INT&&(j=i.RGBA32I)),w===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),w===i.RGBA){const Me=Q?Ur:qe.getTransfer(K);F===i.FLOAT&&(j=i.RGBA32F),F===i.HALF_FLOAT&&(j=i.RGBA16F),F===i.UNSIGNED_BYTE&&(j=Me===Ze?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function _(A,w){let F;return A?w===null||w===oi||w===Wi?F=i.DEPTH24_STENCIL8:w===Mn?F=i.DEPTH32F_STENCIL8:w===Is&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===oi||w===Wi?F=i.DEPTH_COMPONENT24:w===Mn?F=i.DEPTH_COMPONENT32F:w===Is&&(F=i.DEPTH_COMPONENT16),F}function k(A,w){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ot&&A.minFilter!==nn?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function E(A){const w=A.target;w.removeEventListener("dispose",E),R(w),w.isVideoTexture&&d.delete(w)}function C(A){const w=A.target;w.removeEventListener("dispose",C),y(w)}function R(A){const w=n.get(A);if(w.__webglInit===void 0)return;const F=A.source,K=u.get(F);if(K){const Q=K[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(A),Object.keys(K).length===0&&u.delete(F)}n.remove(A)}function b(A){const w=n.get(A);i.deleteTexture(w.__webglTexture);const F=A.source,K=u.get(F);delete K[w.__cacheKey],o.memory.textures--}function y(A){const w=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(w.__webglFramebuffer[K]))for(let Q=0;Q<w.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(w.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(w.__webglFramebuffer[K]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[K])}else{if(Array.isArray(w.__webglFramebuffer))for(let K=0;K<w.__webglFramebuffer.length;K++)i.deleteFramebuffer(w.__webglFramebuffer[K]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let K=0;K<w.__webglColorRenderbuffer.length;K++)w.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[K]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const F=A.textures;for(let K=0,Q=F.length;K<Q;K++){const j=n.get(F[K]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(F[K])}n.remove(A)}let T=0;function I(){T=0}function L(){const A=T;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),T+=1,A}function B(A){const w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function X(A,w){const F=n.get(A);if(A.isVideoTexture&&Ae(A),A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(F,A,w);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+w)}function G(A,w){const F=n.get(A);if(A.version>0&&F.__version!==A.version){W(F,A,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+w)}function Z(A,w){const F=n.get(A);if(A.version>0&&F.__version!==A.version){W(F,A,w);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+w)}function z(A,w){const F=n.get(A);if(A.version>0&&F.__version!==A.version){ee(F,A,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+w)}const se={[Ja]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[Za]:i.MIRRORED_REPEAT},ae={[Ot]:i.NEAREST,[Ou]:i.NEAREST_MIPMAP_NEAREST,[zs]:i.NEAREST_MIPMAP_LINEAR,[nn]:i.LINEAR,[Wr]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},oe={[Hu]:i.NEVER,[Xu]:i.ALWAYS,[$u]:i.LESS,[Bh]:i.LEQUAL,[Gu]:i.EQUAL,[qu]:i.GEQUAL,[Vu]:i.GREATER,[Wu]:i.NOTEQUAL};function ke(A,w){if(w.type===Mn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===nn||w.magFilter===Wr||w.magFilter===zs||w.magFilter===si||w.minFilter===nn||w.minFilter===Wr||w.minFilter===zs||w.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,se[w.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,se[w.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,se[w.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ae[w.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ae[w.minFilter]),w.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,oe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ot||w.minFilter!==zs&&w.minFilter!==si||w.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Te(A,w){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",E));const K=w.source;let Q=u.get(K);Q===void 0&&(Q={},u.set(K,Q));const j=B(w);if(j!==A.__cacheKey){Q[j]===void 0&&(Q[j]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Q[j].usedTimes++;const Me=Q[A.__cacheKey];Me!==void 0&&(Q[A.__cacheKey].usedTimes--,Me.usedTimes===0&&b(w)),A.__cacheKey=j,A.__webglTexture=Q[j].texture}return F}function W(A,w,F){let K=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(K=i.TEXTURE_3D);const Q=Te(A,w),j=w.source;t.bindTexture(K,A.__webglTexture,i.TEXTURE0+F);const Me=n.get(j);if(j.version!==Me.__version||Q===!0){t.activeTexture(i.TEXTURE0+F);const de=qe.getPrimaries(qe.workingColorSpace),ve=w.colorSpace===On?null:qe.getPrimaries(w.colorSpace),We=w.colorSpace===On||de===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let te=v(w.image,!1,s.maxTextureSize);te=st(w,te);const ye=r.convert(w.format,w.colorSpace),Re=r.convert(w.type);let Le=M(w.internalFormat,ye,Re,w.colorSpace,w.isVideoTexture);ke(K,w);let _e;const Ge=w.mipmaps,Oe=w.isVideoTexture!==!0,tt=Me.__version===void 0||Q===!0,D=j.dataReady,he=k(w,te);if(w.isDepthTexture)Le=_(w.format===qi,w.type),tt&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,Le,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Le,te.width,te.height,0,ye,Re,null));else if(w.isDataTexture)if(Ge.length>0){Oe&&tt&&t.texStorage2D(i.TEXTURE_2D,he,Le,Ge[0].width,Ge[0].height);for(let V=0,J=Ge.length;V<J;V++)_e=Ge[V],Oe?D&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,_e.width,_e.height,ye,Re,_e.data):t.texImage2D(i.TEXTURE_2D,V,Le,_e.width,_e.height,0,ye,Re,_e.data);w.generateMipmaps=!1}else Oe?(tt&&t.texStorage2D(i.TEXTURE_2D,he,Le,te.width,te.height),D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,te.width,te.height,ye,Re,te.data)):t.texImage2D(i.TEXTURE_2D,0,Le,te.width,te.height,0,ye,Re,te.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Oe&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Le,Ge[0].width,Ge[0].height,te.depth);for(let V=0,J=Ge.length;V<J;V++)if(_e=Ge[V],w.format!==Jt)if(ye!==null)if(Oe){if(D)if(w.layerUpdates.size>0){const pe=uc(_e.width,_e.height,w.format,w.type);for(const ue of w.layerUpdates){const De=_e.data.subarray(ue*pe/_e.data.BYTES_PER_ELEMENT,(ue+1)*pe/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,ue,_e.width,_e.height,1,ye,De)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,_e.width,_e.height,te.depth,ye,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Le,_e.width,_e.height,te.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,_e.width,_e.height,te.depth,ye,Re,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,V,Le,_e.width,_e.height,te.depth,0,ye,Re,_e.data)}else{Oe&&tt&&t.texStorage2D(i.TEXTURE_2D,he,Le,Ge[0].width,Ge[0].height);for(let V=0,J=Ge.length;V<J;V++)_e=Ge[V],w.format!==Jt?ye!==null?Oe?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,_e.width,_e.height,ye,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,V,Le,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?D&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,_e.width,_e.height,ye,Re,_e.data):t.texImage2D(i.TEXTURE_2D,V,Le,_e.width,_e.height,0,ye,Re,_e.data)}else if(w.isDataArrayTexture)if(Oe){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Le,te.width,te.height,te.depth),D)if(w.layerUpdates.size>0){const V=uc(te.width,te.height,w.format,w.type);for(const J of w.layerUpdates){const pe=te.data.subarray(J*V/te.data.BYTES_PER_ELEMENT,(J+1)*V/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,te.width,te.height,1,ye,Re,pe)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ye,Re,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,te.width,te.height,te.depth,0,ye,Re,te.data);else if(w.isData3DTexture)Oe?(tt&&t.texStorage3D(i.TEXTURE_3D,he,Le,te.width,te.height,te.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ye,Re,te.data)):t.texImage3D(i.TEXTURE_3D,0,Le,te.width,te.height,te.depth,0,ye,Re,te.data);else if(w.isFramebufferTexture){if(tt)if(Oe)t.texStorage2D(i.TEXTURE_2D,he,Le,te.width,te.height);else{let V=te.width,J=te.height;for(let pe=0;pe<he;pe++)t.texImage2D(i.TEXTURE_2D,pe,Le,V,J,0,ye,Re,null),V>>=1,J>>=1}}else if(Ge.length>0){if(Oe&&tt){const V=Ee(Ge[0]);t.texStorage2D(i.TEXTURE_2D,he,Le,V.width,V.height)}for(let V=0,J=Ge.length;V<J;V++)_e=Ge[V],Oe?D&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ye,Re,_e):t.texImage2D(i.TEXTURE_2D,V,Le,ye,Re,_e);w.generateMipmaps=!1}else if(Oe){if(tt){const V=Ee(te);t.texStorage2D(i.TEXTURE_2D,he,Le,V.width,V.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ye,Re,te)}else t.texImage2D(i.TEXTURE_2D,0,Le,ye,Re,te);m(w)&&f(K),Me.__version=j.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function ee(A,w,F){if(w.image.length!==6)return;const K=Te(A,w),Q=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+F);const j=n.get(Q);if(Q.version!==j.__version||K===!0){t.activeTexture(i.TEXTURE0+F);const Me=qe.getPrimaries(qe.workingColorSpace),de=w.colorSpace===On?null:qe.getPrimaries(w.colorSpace),ve=w.colorSpace===On||Me===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const We=w.isCompressedTexture||w.image[0].isCompressedTexture,te=w.image[0]&&w.image[0].isDataTexture,ye=[];for(let J=0;J<6;J++)!We&&!te?ye[J]=v(w.image[J],!0,s.maxCubemapSize):ye[J]=te?w.image[J].image:w.image[J],ye[J]=st(w,ye[J]);const Re=ye[0],Le=r.convert(w.format,w.colorSpace),_e=r.convert(w.type),Ge=M(w.internalFormat,Le,_e,w.colorSpace),Oe=w.isVideoTexture!==!0,tt=j.__version===void 0||K===!0,D=Q.dataReady;let he=k(w,Re);ke(i.TEXTURE_CUBE_MAP,w);let V;if(We){Oe&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ge,Re.width,Re.height);for(let J=0;J<6;J++){V=ye[J].mipmaps;for(let pe=0;pe<V.length;pe++){const ue=V[pe];w.format!==Jt?Le!==null?Oe?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe,0,0,ue.width,ue.height,Le,ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe,Ge,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe,0,0,ue.width,ue.height,Le,_e,ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe,Ge,ue.width,ue.height,0,Le,_e,ue.data)}}}else{if(V=w.mipmaps,Oe&&tt){V.length>0&&he++;const J=Ee(ye[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ge,J.width,J.height)}for(let J=0;J<6;J++)if(te){Oe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ye[J].width,ye[J].height,Le,_e,ye[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ge,ye[J].width,ye[J].height,0,Le,_e,ye[J].data);for(let pe=0;pe<V.length;pe++){const De=V[pe].image[J].image;Oe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe+1,0,0,De.width,De.height,Le,_e,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe+1,Ge,De.width,De.height,0,Le,_e,De.data)}}else{Oe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Le,_e,ye[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ge,Le,_e,ye[J]);for(let pe=0;pe<V.length;pe++){const ue=V[pe];Oe?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe+1,0,0,Le,_e,ue.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,pe+1,Ge,Le,_e,ue.image[J])}}}m(w)&&f(i.TEXTURE_CUBE_MAP),j.__version=Q.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function ge(A,w,F,K,Q,j){const Me=r.convert(F.format,F.colorSpace),de=r.convert(F.type),ve=M(F.internalFormat,Me,de,F.colorSpace),We=n.get(w),te=n.get(F);if(te.__renderTarget=w,!We.__hasExternalTextures){const ye=Math.max(1,w.width>>j),Re=Math.max(1,w.height>>j);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,j,ve,ye,Re,w.depth,0,Me,de,null):t.texImage2D(Q,j,ve,ye,Re,0,Me,de,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),$e(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,te.__webglTexture,0,He(w)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,te.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(A,w,F){if(i.bindRenderbuffer(i.RENDERBUFFER,A),w.depthBuffer){const K=w.depthTexture,Q=K&&K.isDepthTexture?K.type:null,j=_(w.stencilBuffer,Q),Me=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=He(w);$e(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,j,w.width,w.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,de,j,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,j,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,A)}else{const K=w.textures;for(let Q=0;Q<K.length;Q++){const j=K[Q],Me=r.convert(j.format,j.colorSpace),de=r.convert(j.type),ve=M(j.internalFormat,Me,de,j.colorSpace),We=He(w);F&&$e(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,We,ve,w.width,w.height):$e(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We,ve,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ve,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(w.depthTexture);K.__renderTarget=w,(!K.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),X(w.depthTexture,0);const Q=K.__webglTexture,j=He(w);if(w.depthTexture.format===Bi)$e(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(w.depthTexture.format===qi)$e(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ie(A){const w=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),K){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=K}if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ce(w.__webglFramebuffer,A)}else if(F){w.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[K]),w.__webglDepthbuffer[K]===void 0)w.__webglDepthbuffer[K]=i.createRenderbuffer(),ce(w.__webglDepthbuffer[K],A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,j)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),ce(w.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Q)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(A,w,F){const K=n.get(A);w!==void 0&&ge(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ie(A)}function ct(A){const w=A.texture,F=n.get(A),K=n.get(w);A.addEventListener("dispose",C);const Q=A.textures,j=A.isWebGLCubeRenderTarget===!0,Me=Q.length>1;if(Me||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=w.version,o.memory.textures++),j){F.__webglFramebuffer=[];for(let de=0;de<6;de++)if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer[de]=[];for(let ve=0;ve<w.mipmaps.length;ve++)F.__webglFramebuffer[de][ve]=i.createFramebuffer()}else F.__webglFramebuffer[de]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer=[];for(let de=0;de<w.mipmaps.length;de++)F.__webglFramebuffer[de]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Me)for(let de=0,ve=Q.length;de<ve;de++){const We=n.get(Q[de]);We.__webglTexture===void 0&&(We.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&$e(A)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let de=0;de<Q.length;de++){const ve=Q[de];F.__webglColorRenderbuffer[de]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[de]);const We=r.convert(ve.format,ve.colorSpace),te=r.convert(ve.type),ye=M(ve.internalFormat,We,te,ve.colorSpace,A.isXRRenderTarget===!0),Re=He(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,ye,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,F.__webglColorRenderbuffer[de])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ce(F.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ke(i.TEXTURE_CUBE_MAP,w);for(let de=0;de<6;de++)if(w.mipmaps&&w.mipmaps.length>0)for(let ve=0;ve<w.mipmaps.length;ve++)ge(F.__webglFramebuffer[de][ve],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ve);else ge(F.__webglFramebuffer[de],A,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(w)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let de=0,ve=Q.length;de<ve;de++){const We=Q[de],te=n.get(We);t.bindTexture(i.TEXTURE_2D,te.__webglTexture),ke(i.TEXTURE_2D,We),ge(F.__webglFramebuffer,A,We,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,0),m(We)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let de=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,K.__webglTexture),ke(de,w),w.mipmaps&&w.mipmaps.length>0)for(let ve=0;ve<w.mipmaps.length;ve++)ge(F.__webglFramebuffer[ve],A,w,i.COLOR_ATTACHMENT0,de,ve);else ge(F.__webglFramebuffer,A,w,i.COLOR_ATTACHMENT0,de,0);m(w)&&f(de),t.unbindTexture()}A.depthBuffer&&Ie(A)}function Ve(A){const w=A.textures;for(let F=0,K=w.length;F<K;F++){const Q=w[F];if(m(Q)){const j=x(A),Me=n.get(Q).__webglTexture;t.bindTexture(j,Me),f(j),t.unbindTexture()}}}const dt=[],O=[];function Bt(A){if(A.samples>0){if($e(A)===!1){const w=A.textures,F=A.width,K=A.height;let Q=i.COLOR_BUFFER_BIT;const j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(A),de=w.length>1;if(de)for(let ve=0;ve<w.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ve=0;ve<w.length;ve++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),de){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);const We=n.get(w[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,F,K,0,0,F,K,Q,i.NEAREST),l===!0&&(dt.length=0,O.length=0,dt.push(i.COLOR_ATTACHMENT0+ve),A.depthBuffer&&A.resolveDepthBuffer===!1&&(dt.push(j),O.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),de)for(let ve=0;ve<w.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);const We=n.get(w[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const w=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function He(A){return Math.min(s.maxSamples,A.samples)}function $e(A){const w=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ae(A){const w=o.render.frame;d.get(A)!==w&&(d.set(A,w),A.update())}function st(A,w){const F=A.colorSpace,K=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==Ki&&F!==On&&(qe.getTransfer(F)===Ze?(K!==Jt||Q!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),w}function Ee(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=I,this.setTexture2D=X,this.setTexture2DArray=G,this.setTexture3D=Z,this.setTextureCube=z,this.rebindTextures=Be,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=$e}function Qv(i,e){function t(n,s=On){let r;const o=qe.getTransfer(s);if(n===An)return i.UNSIGNED_BYTE;if(n===Ho)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$o)return i.UNSIGNED_SHORT_5_5_5_1;if(n===kh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Rh)return i.BYTE;if(n===Ch)return i.SHORT;if(n===Is)return i.UNSIGNED_SHORT;if(n===zo)return i.INT;if(n===oi)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===Ns)return i.HALF_FLOAT;if(n===Lh)return i.ALPHA;if(n===Ph)return i.RGB;if(n===Jt)return i.RGBA;if(n===Ih)return i.LUMINANCE;if(n===Dh)return i.LUMINANCE_ALPHA;if(n===Bi)return i.DEPTH_COMPONENT;if(n===qi)return i.DEPTH_STENCIL;if(n===Nh)return i.RED;if(n===Go)return i.RED_INTEGER;if(n===Uh)return i.RG;if(n===Vo)return i.RG_INTEGER;if(n===Wo)return i.RGBA_INTEGER;if(n===gr||n===vr||n===yr||n===_r)if(o===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qa||n===eo||n===to||n===no)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===no)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===io||n===so||n===ro)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===io||n===so)return o===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ro)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===yo||n===_o||n===xo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ao)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===co)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ho)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===po)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===go)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_o)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xr||n===bo||n===wo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===xr)return o===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oh||n===Mo||n===So||n===To)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===xr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===To)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Wi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class ey extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class bn extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ty={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ty)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new bn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const ny=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Et,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Vn({vertexShader:ny,fragmentShader:iy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new Or(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ry extends Ji{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const v=new sy,m=t.getContextAttributes();let f=null,x=null;const M=[],_=[],k=new me;let E=null;const C=new $t;C.viewport=new et;const R=new $t;R.viewport=new et;const b=[C,R],y=new ey;let T=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ee=M[W];return ee===void 0&&(ee=new xa,M[W]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(W){let ee=M[W];return ee===void 0&&(ee=new xa,M[W]=ee),ee.getGripSpace()},this.getHand=function(W){let ee=M[W];return ee===void 0&&(ee=new xa,M[W]=ee),ee.getHandSpace()};function L(W){const ee=_.indexOf(W.inputSource);if(ee===-1)return;const ge=M[ee];ge!==void 0&&(ge.update(W.inputSource,W.frame,c||o),ge.dispatchEvent({type:W.type,data:W.inputSource}))}function B(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",X);for(let W=0;W<M.length;W++){const ee=_[W];ee!==null&&(_[W]=null,M[W].disconnect(ee))}T=null,I=null,v.reset(),e.setRenderTarget(f),p=null,u=null,h=null,s=null,x=null,Te.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",B),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(k),s.renderState.layers===void 0){const ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new li(p.framebufferWidth,p.framebufferHeight,{format:Jt,type:An,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,ge=null,ce=null;m.depth&&(ce=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?qi:Bi,ge=m.stencil?Wi:oi);const Ce={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};h=new XRWebGLBinding(s,t),u=h.createProjectionLayer(Ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new li(u.textureWidth,u.textureHeight,{format:Jt,type:An,depthTexture:new Zh(u.textureWidth,u.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Te.setContext(s),Te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function X(W){for(let ee=0;ee<W.removed.length;ee++){const ge=W.removed[ee],ce=_.indexOf(ge);ce>=0&&(_[ce]=null,M[ce].disconnect(ge))}for(let ee=0;ee<W.added.length;ee++){const ge=W.added[ee];let ce=_.indexOf(ge);if(ce===-1){for(let Ie=0;Ie<M.length;Ie++)if(Ie>=_.length){_.push(ge),ce=Ie;break}else if(_[Ie]===null){_[Ie]=ge,ce=Ie;break}if(ce===-1)break}const Ce=M[ce];Ce&&Ce.connect(ge)}}const G=new P,Z=new P;function z(W,ee,ge){G.setFromMatrixPosition(ee.matrixWorld),Z.setFromMatrixPosition(ge.matrixWorld);const ce=G.distanceTo(Z),Ce=ee.projectionMatrix.elements,Ie=ge.projectionMatrix.elements,Be=Ce[14]/(Ce[10]-1),ct=Ce[14]/(Ce[10]+1),Ve=(Ce[9]+1)/Ce[5],dt=(Ce[9]-1)/Ce[5],O=(Ce[8]-1)/Ce[0],Bt=(Ie[8]+1)/Ie[0],He=Be*O,$e=Be*Bt,Ae=ce/(-O+Bt),st=Ae*-O;if(ee.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(st),W.translateZ(Ae),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ce[10]===-1)W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Ee=Be+Ae,A=ct+Ae,w=He-st,F=$e+(ce-st),K=Ve*ct/A*Ee,Q=dt*ct/A*Ee;W.projectionMatrix.makePerspective(w,F,K,Q,Ee,A),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function se(W,ee){ee===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ee.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let ee=W.near,ge=W.far;v.texture!==null&&(v.depthNear>0&&(ee=v.depthNear),v.depthFar>0&&(ge=v.depthFar)),y.near=R.near=C.near=ee,y.far=R.far=C.far=ge,(T!==y.near||I!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,I=y.far),C.layers.mask=W.layers.mask|2,R.layers.mask=W.layers.mask|4,y.layers.mask=C.layers.mask|R.layers.mask;const ce=W.parent,Ce=y.cameras;se(y,ce);for(let Ie=0;Ie<Ce.length;Ie++)se(Ce[Ie],ce);Ce.length===2?z(y,C,R):y.projectionMatrix.copy(C.projectionMatrix),ae(W,y,ce)};function ae(W,ee,ge){ge===null?W.matrix.copy(ee.matrixWorld):(W.matrix.copy(ge.matrixWorld),W.matrix.invert(),W.matrix.multiply(ee.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ao*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(W){l=W,u!==null&&(u.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let oe=null;function ke(W,ee){if(d=ee.getViewerPose(c||o),g=ee,d!==null){const ge=d.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ce=!1;ge.length!==y.cameras.length&&(y.cameras.length=0,ce=!0);for(let Ie=0;Ie<ge.length;Ie++){const Be=ge[Ie];let ct=null;if(p!==null)ct=p.getViewport(Be);else{const dt=h.getViewSubImage(u,Be);ct=dt.viewport,Ie===0&&(e.setRenderTargetTextures(x,dt.colorTexture,u.ignoreDepthValues?void 0:dt.depthStencilTexture),e.setRenderTarget(x))}let Ve=b[Ie];Ve===void 0&&(Ve=new $t,Ve.layers.enable(Ie),Ve.viewport=new et,b[Ie]=Ve),Ve.matrix.fromArray(Be.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Be.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(ct.x,ct.y,ct.width,ct.height),Ie===0&&(y.matrix.copy(Ve.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ce===!0&&y.cameras.push(Ve)}const Ce=s.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const Ie=h.getDepthInformation(ge[0]);Ie&&Ie.isValid&&Ie.texture&&v.init(e,Ie,s.renderState)}}for(let ge=0;ge<M.length;ge++){const ce=_[ge],Ce=M[ge];ce!==null&&Ce!==void 0&&Ce.update(ce,ee,c||o)}oe&&oe(W,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Te=new Jh;Te.setAnimationLoop(ke),this.setAnimationLoop=function(W){oe=W},this.dispose=function(){}}}const Zn=new an,ay=new lt;function oy(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Yh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,x,M,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),d(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,x,M):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Lt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Lt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const x=e.get(f),M=x.envMap,_=x.envMapRotation;M&&(m.envMap.value=M,Zn.copy(_),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),m.envMapRotation.value.setFromMatrix4(ay.makeRotationFromEuler(Zn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,x,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=M*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Lt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const x=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ly(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const _=M.program;n.uniformBlockBinding(x,_)}function c(x,M){let _=s[x.id];_===void 0&&(g(x),_=d(x),s[x.id]=_,x.addEventListener("dispose",m));const k=M.program;n.updateUBOMapping(x,k);const E=e.render.frame;r[x.id]!==E&&(u(x),r[x.id]=E)}function d(x){const M=h();x.__bindingPointIndex=M;const _=i.createBuffer(),k=x.__size,E=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,k,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,_),_}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const M=s[x.id],_=x.uniforms,k=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let E=0,C=_.length;E<C;E++){const R=Array.isArray(_[E])?_[E]:[_[E]];for(let b=0,y=R.length;b<y;b++){const T=R[b];if(p(T,E,b,k)===!0){const I=T.__offset,L=Array.isArray(T.value)?T.value:[T.value];let B=0;for(let X=0;X<L.length;X++){const G=L[X],Z=v(G);typeof G=="number"||typeof G=="boolean"?(T.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,I+B,T.__data)):G.isMatrix3?(T.__data[0]=G.elements[0],T.__data[1]=G.elements[1],T.__data[2]=G.elements[2],T.__data[3]=0,T.__data[4]=G.elements[3],T.__data[5]=G.elements[4],T.__data[6]=G.elements[5],T.__data[7]=0,T.__data[8]=G.elements[6],T.__data[9]=G.elements[7],T.__data[10]=G.elements[8],T.__data[11]=0):(G.toArray(T.__data,B),B+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,M,_,k){const E=x.value,C=M+"_"+_;if(k[C]===void 0)return typeof E=="number"||typeof E=="boolean"?k[C]=E:k[C]=E.clone(),!0;{const R=k[C];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return k[C]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(x){const M=x.uniforms;let _=0;const k=16;for(let C=0,R=M.length;C<R;C++){const b=Array.isArray(M[C])?M[C]:[M[C]];for(let y=0,T=b.length;y<T;y++){const I=b[y],L=Array.isArray(I.value)?I.value:[I.value];for(let B=0,X=L.length;B<X;B++){const G=L[B],Z=v(G),z=_%k,se=z%Z.boundary,ae=z+se;_+=se,ae!==0&&k-ae<Z.storage&&(_+=k-ae),I.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=Z.storage}}}const E=_%k;return E>0&&(_+=k-E),x.__size=_,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(const x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class cy{constructor(e={}){const{canvas:t=ju(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this.toneMapping=Hn,this.toneMappingExposure=1;const _=this;let k=!1,E=0,C=0,R=null,b=-1,y=null;const T=new et,I=new et;let L=null;const B=new ze(0);let X=0,G=t.width,Z=t.height,z=1,se=null,ae=null;const oe=new et(0,0,G,Z),ke=new et(0,0,G,Z);let Te=!1;const W=new Xo;let ee=!1,ge=!1;const ce=new lt,Ce=new lt,Ie=new P,Be=new et,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function dt(){return R===null?z:1}let O=n;function Bt(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bo}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",ue,!1),O===null){const N="webgl2";if(O=Bt(N,S),O===null)throw Bt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let He,$e,Ae,st,Ee,A,w,F,K,Q,j,Me,de,ve,We,te,ye,Re,Le,_e,Ge,Oe,tt,D;function he(){He=new pg(O),He.init(),Oe=new Qv(O,He),$e=new lg(O,He,e,Oe),Ae=new Kv(O,He),$e.reverseDepthBuffer&&u&&Ae.buffers.depth.setReversed(!0),st=new vg(O),Ee=new Nv,A=new Zv(O,He,Ae,Ee,$e,Oe,st),w=new hg(_),F=new fg(_),K=new Sf(O),tt=new ag(O,K),Q=new mg(O,K,st,tt),j=new _g(O,Q,K,st),Le=new yg(O,$e,A),te=new cg(Ee),Me=new Dv(_,w,F,He,$e,tt,te),de=new oy(_,Ee),ve=new Ov,We=new Gv(He),Re=new rg(_,w,F,Ae,j,p,l),ye=new Yv(_,j,$e),D=new ly(O,st,$e,Ae),_e=new og(O,He,st),Ge=new gg(O,He,st),st.programs=Me.programs,_.capabilities=$e,_.extensions=He,_.properties=Ee,_.renderLists=ve,_.shadowMap=ye,_.state=Ae,_.info=st}he();const V=new ry(_,O);this.xr=V,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=He.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=He.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(S){S!==void 0&&(z=S,this.setSize(G,Z,!1))},this.getSize=function(S){return S.set(G,Z)},this.setSize=function(S,N,H=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=S,Z=N,t.width=Math.floor(S*z),t.height=Math.floor(N*z),H===!0&&(t.style.width=S+"px",t.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(G*z,Z*z).floor()},this.setDrawingBufferSize=function(S,N,H){G=S,Z=N,z=H,t.width=Math.floor(S*H),t.height=Math.floor(N*H),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(T)},this.getViewport=function(S){return S.copy(oe)},this.setViewport=function(S,N,H,$){S.isVector4?oe.set(S.x,S.y,S.z,S.w):oe.set(S,N,H,$),Ae.viewport(T.copy(oe).multiplyScalar(z).round())},this.getScissor=function(S){return S.copy(ke)},this.setScissor=function(S,N,H,$){S.isVector4?ke.set(S.x,S.y,S.z,S.w):ke.set(S,N,H,$),Ae.scissor(I.copy(ke).multiplyScalar(z).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(S){Ae.setScissorTest(Te=S)},this.setOpaqueSort=function(S){se=S},this.setTransparentSort=function(S){ae=S},this.getClearColor=function(S){return S.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(S=!0,N=!0,H=!0){let $=0;if(S){let U=!1;if(R!==null){const ne=R.texture.format;U=ne===Wo||ne===Vo||ne===Go}if(U){const ne=R.texture.type,fe=ne===An||ne===oi||ne===Is||ne===Wi||ne===Ho||ne===$o,xe=Re.getClearColor(),be=Re.getClearAlpha(),Pe=xe.r,Ne=xe.g,we=xe.b;fe?(g[0]=Pe,g[1]=Ne,g[2]=we,g[3]=be,O.clearBufferuiv(O.COLOR,0,g)):(v[0]=Pe,v[1]=Ne,v[2]=we,v[3]=be,O.clearBufferiv(O.COLOR,0,v))}else $|=O.COLOR_BUFFER_BIT}N&&($|=O.DEPTH_BUFFER_BIT),H&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),ve.dispose(),We.dispose(),Ee.dispose(),w.dispose(),F.dispose(),j.dispose(),tt.dispose(),D.dispose(),Me.dispose(),V.dispose(),V.removeEventListener("sessionstart",rl),V.removeEventListener("sessionend",al),qn.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const S=st.autoReset,N=ye.enabled,H=ye.autoUpdate,$=ye.needsUpdate,U=ye.type;he(),st.autoReset=S,ye.enabled=N,ye.autoUpdate=H,ye.needsUpdate=$,ye.type=U}function ue(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function De(S){const N=S.target;N.removeEventListener("dispose",De),ht(N)}function ht(S){bt(S),Ee.remove(S)}function bt(S){const N=Ee.get(S).programs;N!==void 0&&(N.forEach(function(H){Me.releaseProgram(H)}),S.isShaderMaterial&&Me.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,H,$,U,ne){N===null&&(N=ct);const fe=U.isMesh&&U.matrixWorld.determinant()<0,xe=Od(S,N,H,$,U);Ae.setMaterial($,fe);let be=H.index,Pe=1;if($.wireframe===!0){if(be=Q.getWireframeAttribute(H),be===void 0)return;Pe=2}const Ne=H.drawRange,we=H.attributes.position;let Xe=Ne.start*Pe,nt=(Ne.start+Ne.count)*Pe;ne!==null&&(Xe=Math.max(Xe,ne.start*Pe),nt=Math.min(nt,(ne.start+ne.count)*Pe)),be!==null?(Xe=Math.max(Xe,0),nt=Math.min(nt,be.count)):we!=null&&(Xe=Math.max(Xe,0),nt=Math.min(nt,we.count));const rt=nt-Xe;if(rt<0||rt===1/0)return;tt.setup(U,$,xe,H,be);let kt,je=_e;if(be!==null&&(kt=K.get(be),je=Ge,je.setIndex(kt)),U.isMesh)$.wireframe===!0?(Ae.setLineWidth($.wireframeLinewidth*dt()),je.setMode(O.LINES)):je.setMode(O.TRIANGLES);else if(U.isLine){let Se=$.linewidth;Se===void 0&&(Se=1),Ae.setLineWidth(Se*dt()),U.isLineSegments?je.setMode(O.LINES):U.isLineLoop?je.setMode(O.LINE_LOOP):je.setMode(O.LINE_STRIP)}else U.isPoints?je.setMode(O.POINTS):U.isSprite&&je.setMode(O.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)je.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))je.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Se=U._multiDrawStarts,hn=U._multiDrawCounts,Ke=U._multiDrawCount,Wt=be?K.get(be).bytesPerElement:1,di=Ee.get($).currentProgram.getUniforms();for(let Pt=0;Pt<Ke;Pt++)di.setValue(O,"_gl_DrawID",Pt),je.render(Se[Pt]/Wt,hn[Pt])}else if(U.isInstancedMesh)je.renderInstances(Xe,rt,U.count);else if(H.isInstancedBufferGeometry){const Se=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,hn=Math.min(H.instanceCount,Se);je.renderInstances(Xe,rt,hn)}else je.render(Xe,rt)};function Je(S,N,H){S.transparent===!0&&S.side===xn&&S.forceSinglePass===!1?(S.side=Lt,S.needsUpdate=!0,Bs(S,N,H),S.side=Gn,S.needsUpdate=!0,Bs(S,N,H),S.side=xn):Bs(S,N,H)}this.compile=function(S,N,H=null){H===null&&(H=S),f=We.get(H),f.init(N),M.push(f),H.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),S!==H&&S.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const $=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ne=U.material;if(ne)if(Array.isArray(ne))for(let fe=0;fe<ne.length;fe++){const xe=ne[fe];Je(xe,H,U),$.add(xe)}else Je(ne,H,U),$.add(ne)}),M.pop(),f=null,$},this.compileAsync=function(S,N,H=null){const $=this.compile(S,N,H);return new Promise(U=>{function ne(){if($.forEach(function(fe){Ee.get(fe).currentProgram.isReady()&&$.delete(fe)}),$.size===0){U(S);return}setTimeout(ne,10)}He.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Vt=null;function cn(S){Vt&&Vt(S)}function rl(){qn.stop()}function al(){qn.start()}const qn=new Jh;qn.setAnimationLoop(cn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(S){Vt=S,V.setAnimationLoop(S),S===null?qn.stop():qn.start()},V.addEventListener("sessionstart",rl),V.addEventListener("sessionend",al),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(N),N=V.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,N,R),f=We.get(S,M.length),f.init(N),M.push(f),Ce.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),W.setFromProjectionMatrix(Ce),ge=this.localClippingEnabled,ee=te.init(this.clippingPlanes,ge),m=ve.get(S,x.length),m.init(),x.push(m),V.enabled===!0&&V.isPresenting===!0){const ne=_.xr.getDepthSensingMesh();ne!==null&&Vr(ne,N,-1/0,_.sortObjects)}Vr(S,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(se,ae),Ve=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Ve&&Re.addToRenderList(m,S),this.info.render.frame++,ee===!0&&te.beginShadows();const H=f.state.shadowsArray;ye.render(H,S,N),ee===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,U=m.transmissive;if(f.setupLights(),N.isArrayCamera){const ne=N.cameras;if(U.length>0)for(let fe=0,xe=ne.length;fe<xe;fe++){const be=ne[fe];ll($,U,S,be)}Ve&&Re.render(S);for(let fe=0,xe=ne.length;fe<xe;fe++){const be=ne[fe];ol(m,S,be,be.viewport)}}else U.length>0&&ll($,U,S,N),Ve&&Re.render(S),ol(m,S,N);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(_,S,N),tt.resetDefaultState(),b=-1,y=null,M.pop(),M.length>0?(f=M[M.length-1],ee===!0&&te.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Vr(S,N,H,$){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||W.intersectsSprite(S)){$&&Be.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ce);const fe=j.update(S),xe=S.material;xe.visible&&m.push(S,fe,xe,H,Be.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||W.intersectsObject(S))){const fe=j.update(S),xe=S.material;if($&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Be.copy(S.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Be.copy(fe.boundingSphere.center)),Be.applyMatrix4(S.matrixWorld).applyMatrix4(Ce)),Array.isArray(xe)){const be=fe.groups;for(let Pe=0,Ne=be.length;Pe<Ne;Pe++){const we=be[Pe],Xe=xe[we.materialIndex];Xe&&Xe.visible&&m.push(S,fe,Xe,H,Be.z,we)}}else xe.visible&&m.push(S,fe,xe,H,Be.z,null)}}const ne=S.children;for(let fe=0,xe=ne.length;fe<xe;fe++)Vr(ne[fe],N,H,$)}function ol(S,N,H,$){const U=S.opaque,ne=S.transmissive,fe=S.transparent;f.setupLightsView(H),ee===!0&&te.setGlobalState(_.clippingPlanes,H),$&&Ae.viewport(T.copy($)),U.length>0&&Fs(U,N,H),ne.length>0&&Fs(ne,N,H),fe.length>0&&Fs(fe,N,H),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function ll(S,N,H,$){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[$.id]===void 0&&(f.state.transmissionRenderTarget[$.id]=new li(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?Ns:An,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const ne=f.state.transmissionRenderTarget[$.id],fe=$.viewport||T;ne.setSize(fe.z,fe.w);const xe=_.getRenderTarget();_.setRenderTarget(ne),_.getClearColor(B),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),Ve&&Re.render(H);const be=_.toneMapping;_.toneMapping=Hn;const Pe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),f.setupLightsView($),ee===!0&&te.setGlobalState(_.clippingPlanes,$),Fs(S,H,$),A.updateMultisampleRenderTarget(ne),A.updateRenderTargetMipmap(ne),He.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let we=0,Xe=N.length;we<Xe;we++){const nt=N[we],rt=nt.object,kt=nt.geometry,je=nt.material,Se=nt.group;if(je.side===xn&&rt.layers.test($.layers)){const hn=je.side;je.side=Lt,je.needsUpdate=!0,cl(rt,H,$,kt,je,Se),je.side=hn,je.needsUpdate=!0,Ne=!0}}Ne===!0&&(A.updateMultisampleRenderTarget(ne),A.updateRenderTargetMipmap(ne))}_.setRenderTarget(xe),_.setClearColor(B,X),Pe!==void 0&&($.viewport=Pe),_.toneMapping=be}function Fs(S,N,H){const $=N.isScene===!0?N.overrideMaterial:null;for(let U=0,ne=S.length;U<ne;U++){const fe=S[U],xe=fe.object,be=fe.geometry,Pe=$===null?fe.material:$,Ne=fe.group;xe.layers.test(H.layers)&&cl(xe,N,H,be,Pe,Ne)}}function cl(S,N,H,$,U,ne){S.onBeforeRender(_,N,H,$,U,ne),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(_,N,H,$,S,ne),U.transparent===!0&&U.side===xn&&U.forceSinglePass===!1?(U.side=Lt,U.needsUpdate=!0,_.renderBufferDirect(H,N,$,U,S,ne),U.side=Gn,U.needsUpdate=!0,_.renderBufferDirect(H,N,$,U,S,ne),U.side=xn):_.renderBufferDirect(H,N,$,U,S,ne),S.onAfterRender(_,N,H,$,U,ne)}function Bs(S,N,H){N.isScene!==!0&&(N=ct);const $=Ee.get(S),U=f.state.lights,ne=f.state.shadowsArray,fe=U.state.version,xe=Me.getParameters(S,U.state,ne,N,H),be=Me.getProgramCacheKey(xe);let Pe=$.programs;$.environment=S.isMeshStandardMaterial?N.environment:null,$.fog=N.fog,$.envMap=(S.isMeshStandardMaterial?F:w).get(S.envMap||$.environment),$.envMapRotation=$.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Pe===void 0&&(S.addEventListener("dispose",De),Pe=new Map,$.programs=Pe);let Ne=Pe.get(be);if(Ne!==void 0){if($.currentProgram===Ne&&$.lightsStateVersion===fe)return dl(S,xe),Ne}else xe.uniforms=Me.getUniforms(S),S.onBeforeCompile(xe,_),Ne=Me.acquireProgram(xe,be),Pe.set(be,Ne),$.uniforms=xe.uniforms;const we=$.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(we.clippingPlanes=te.uniform),dl(S,xe),$.needsLights=Bd(S),$.lightsStateVersion=fe,$.needsLights&&(we.ambientLightColor.value=U.state.ambient,we.lightProbe.value=U.state.probe,we.directionalLights.value=U.state.directional,we.directionalLightShadows.value=U.state.directionalShadow,we.spotLights.value=U.state.spot,we.spotLightShadows.value=U.state.spotShadow,we.rectAreaLights.value=U.state.rectArea,we.ltc_1.value=U.state.rectAreaLTC1,we.ltc_2.value=U.state.rectAreaLTC2,we.pointLights.value=U.state.point,we.pointLightShadows.value=U.state.pointShadow,we.hemisphereLights.value=U.state.hemi,we.directionalShadowMap.value=U.state.directionalShadowMap,we.directionalShadowMatrix.value=U.state.directionalShadowMatrix,we.spotShadowMap.value=U.state.spotShadowMap,we.spotLightMatrix.value=U.state.spotLightMatrix,we.spotLightMap.value=U.state.spotLightMap,we.pointShadowMap.value=U.state.pointShadowMap,we.pointShadowMatrix.value=U.state.pointShadowMatrix),$.currentProgram=Ne,$.uniformsList=null,Ne}function hl(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=br.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function dl(S,N){const H=Ee.get(S);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Od(S,N,H,$,U){N.isScene!==!0&&(N=ct),A.resetTextureUnits();const ne=N.fog,fe=$.isMeshStandardMaterial?N.environment:null,xe=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ki,be=($.isMeshStandardMaterial?F:w).get($.envMap||fe),Pe=$.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ne=!!H.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),we=!!H.morphAttributes.position,Xe=!!H.morphAttributes.normal,nt=!!H.morphAttributes.color;let rt=Hn;$.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(rt=_.toneMapping);const kt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,je=kt!==void 0?kt.length:0,Se=Ee.get($),hn=f.state.lights;if(ee===!0&&(ge===!0||S!==y)){const zt=S===y&&$.id===b;te.setState($,S,zt)}let Ke=!1;$.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==hn.state.version||Se.outputColorSpace!==xe||U.isBatchedMesh&&Se.batching===!1||!U.isBatchedMesh&&Se.batching===!0||U.isBatchedMesh&&Se.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Se.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Se.instancing===!1||!U.isInstancedMesh&&Se.instancing===!0||U.isSkinnedMesh&&Se.skinning===!1||!U.isSkinnedMesh&&Se.skinning===!0||U.isInstancedMesh&&Se.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Se.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Se.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Se.instancingMorph===!1&&U.morphTexture!==null||Se.envMap!==be||$.fog===!0&&Se.fog!==ne||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==te.numPlanes||Se.numIntersection!==te.numIntersection)||Se.vertexAlphas!==Pe||Se.vertexTangents!==Ne||Se.morphTargets!==we||Se.morphNormals!==Xe||Se.morphColors!==nt||Se.toneMapping!==rt||Se.morphTargetsCount!==je)&&(Ke=!0):(Ke=!0,Se.__version=$.version);let Wt=Se.currentProgram;Ke===!0&&(Wt=Bs($,N,U));let di=!1,Pt=!1,es=!1;const at=Wt.getUniforms(),Qt=Se.uniforms;if(Ae.useProgram(Wt.program)&&(di=!0,Pt=!0,es=!0),$.id!==b&&(b=$.id,Pt=!0),di||y!==S){Ae.buffers.depth.getReversed()?(ce.copy(S.projectionMatrix),Ju(ce),Zu(ce),at.setValue(O,"projectionMatrix",ce)):at.setValue(O,"projectionMatrix",S.projectionMatrix),at.setValue(O,"viewMatrix",S.matrixWorldInverse);const Rn=at.map.cameraPosition;Rn!==void 0&&Rn.setValue(O,Ie.setFromMatrixPosition(S.matrixWorld)),$e.logarithmicDepthBuffer&&at.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&at.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Pt=!0,es=!0)}if(U.isSkinnedMesh){at.setOptional(O,U,"bindMatrix"),at.setOptional(O,U,"bindMatrixInverse");const zt=U.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),at.setValue(O,"boneTexture",zt.boneTexture,A))}U.isBatchedMesh&&(at.setOptional(O,U,"batchingTexture"),at.setValue(O,"batchingTexture",U._matricesTexture,A),at.setOptional(O,U,"batchingIdTexture"),at.setValue(O,"batchingIdTexture",U._indirectTexture,A),at.setOptional(O,U,"batchingColorTexture"),U._colorsTexture!==null&&at.setValue(O,"batchingColorTexture",U._colorsTexture,A));const ts=H.morphAttributes;if((ts.position!==void 0||ts.normal!==void 0||ts.color!==void 0)&&Le.update(U,H,Wt),(Pt||Se.receiveShadow!==U.receiveShadow)&&(Se.receiveShadow=U.receiveShadow,at.setValue(O,"receiveShadow",U.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Qt.envMap.value=be,Qt.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&N.environment!==null&&(Qt.envMapIntensity.value=N.environmentIntensity),Pt&&(at.setValue(O,"toneMappingExposure",_.toneMappingExposure),Se.needsLights&&Fd(Qt,es),ne&&$.fog===!0&&de.refreshFogUniforms(Qt,ne),de.refreshMaterialUniforms(Qt,$,z,Z,f.state.transmissionRenderTarget[S.id]),br.upload(O,hl(Se),Qt,A)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(br.upload(O,hl(Se),Qt,A),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&at.setValue(O,"center",U.center),at.setValue(O,"modelViewMatrix",U.modelViewMatrix),at.setValue(O,"normalMatrix",U.normalMatrix),at.setValue(O,"modelMatrix",U.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const zt=$.uniformsGroups;for(let Rn=0,Cn=zt.length;Rn<Cn;Rn++){const ul=zt[Rn];D.update(ul,Wt),D.bind(ul,Wt)}}return Wt}function Fd(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Bd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,N,H){Ee.get(S.texture).__webglTexture=N,Ee.get(S.depthTexture).__webglTexture=H;const $=Ee.get(S);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=H===void 0,$.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const H=Ee.get(S);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,H=0){R=S,E=N,C=H;let $=!0,U=null,ne=!1,fe=!1;if(S){const be=Ee.get(S);if(be.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(O.FRAMEBUFFER,null),$=!1;else if(be.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(be.__hasExternalTextures)A.rebindTextures(S,Ee.get(S.texture).__webglTexture,Ee.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const we=S.depthTexture;if(be.__boundDepthTexture!==we){if(we!==null&&Ee.has(we)&&(S.width!==we.image.width||S.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}const Pe=S.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(fe=!0);const Ne=Ee.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ne[N])?U=Ne[N][H]:U=Ne[N],ne=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?U=Ee.get(S).__webglMultisampledFramebuffer:Array.isArray(Ne)?U=Ne[H]:U=Ne,T.copy(S.viewport),I.copy(S.scissor),L=S.scissorTest}else T.copy(oe).multiplyScalar(z).floor(),I.copy(ke).multiplyScalar(z).floor(),L=Te;if(Ae.bindFramebuffer(O.FRAMEBUFFER,U)&&$&&Ae.drawBuffers(S,U),Ae.viewport(T),Ae.scissor(I),Ae.setScissorTest(L),ne){const be=Ee.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,be.__webglTexture,H)}else if(fe){const be=Ee.get(S.texture),Pe=N||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,be.__webglTexture,H||0,Pe)}b=-1},this.readRenderTargetPixels=function(S,N,H,$,U,ne,fe){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ee.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&fe!==void 0&&(xe=xe[fe]),xe){Ae.bindFramebuffer(O.FRAMEBUFFER,xe);try{const be=S.texture,Pe=be.format,Ne=be.type;if(!$e.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-$&&H>=0&&H<=S.height-U&&O.readPixels(N,H,$,U,Oe.convert(Pe),Oe.convert(Ne),ne)}finally{const be=R!==null?Ee.get(R).__webglFramebuffer:null;Ae.bindFramebuffer(O.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(S,N,H,$,U,ne,fe){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ee.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&fe!==void 0&&(xe=xe[fe]),xe){const be=S.texture,Pe=be.format,Ne=be.type;if(!$e.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-$&&H>=0&&H<=S.height-U){Ae.bindFramebuffer(O.FRAMEBUFFER,xe);const we=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,we),O.bufferData(O.PIXEL_PACK_BUFFER,ne.byteLength,O.STREAM_READ),O.readPixels(N,H,$,U,Oe.convert(Pe),Oe.convert(Ne),0);const Xe=R!==null?Ee.get(R).__webglFramebuffer:null;Ae.bindFramebuffer(O.FRAMEBUFFER,Xe);const nt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ku(O,nt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,we),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ne),O.deleteBuffer(we),O.deleteSync(nt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,H=0){S.isTexture!==!0&&(_s("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const $=Math.pow(2,-H),U=Math.floor(S.image.width*$),ne=Math.floor(S.image.height*$),fe=N!==null?N.x:0,xe=N!==null?N.y:0;A.setTexture2D(S,0),O.copyTexSubImage2D(O.TEXTURE_2D,H,0,0,fe,xe,U,ne),Ae.unbindTexture()},this.copyTextureToTexture=function(S,N,H=null,$=null,U=0){S.isTexture!==!0&&(_s("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,S=arguments[1],N=arguments[2],U=arguments[3]||0,H=null);let ne,fe,xe,be,Pe,Ne,we,Xe,nt;const rt=S.isCompressedTexture?S.mipmaps[U]:S.image;H!==null?(ne=H.max.x-H.min.x,fe=H.max.y-H.min.y,xe=H.isBox3?H.max.z-H.min.z:1,be=H.min.x,Pe=H.min.y,Ne=H.isBox3?H.min.z:0):(ne=rt.width,fe=rt.height,xe=rt.depth||1,be=0,Pe=0,Ne=0),$!==null?(we=$.x,Xe=$.y,nt=$.z):(we=0,Xe=0,nt=0);const kt=Oe.convert(N.format),je=Oe.convert(N.type);let Se;N.isData3DTexture?(A.setTexture3D(N,0),Se=O.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(A.setTexture2DArray(N,0),Se=O.TEXTURE_2D_ARRAY):(A.setTexture2D(N,0),Se=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,N.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,N.unpackAlignment);const hn=O.getParameter(O.UNPACK_ROW_LENGTH),Ke=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Wt=O.getParameter(O.UNPACK_SKIP_PIXELS),di=O.getParameter(O.UNPACK_SKIP_ROWS),Pt=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,rt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,rt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,be),O.pixelStorei(O.UNPACK_SKIP_ROWS,Pe),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ne);const es=S.isDataArrayTexture||S.isData3DTexture,at=N.isDataArrayTexture||N.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const Qt=Ee.get(S),ts=Ee.get(N),zt=Ee.get(Qt.__renderTarget),Rn=Ee.get(ts.__renderTarget);Ae.bindFramebuffer(O.READ_FRAMEBUFFER,zt.__webglFramebuffer),Ae.bindFramebuffer(O.DRAW_FRAMEBUFFER,Rn.__webglFramebuffer);for(let Cn=0;Cn<xe;Cn++)es&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ee.get(S).__webglTexture,U,Ne+Cn),S.isDepthTexture?(at&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ee.get(N).__webglTexture,U,nt+Cn),O.blitFramebuffer(be,Pe,ne,fe,we,Xe,ne,fe,O.DEPTH_BUFFER_BIT,O.NEAREST)):at?O.copyTexSubImage3D(Se,U,we,Xe,nt+Cn,be,Pe,ne,fe):O.copyTexSubImage2D(Se,U,we,Xe,nt+Cn,be,Pe,ne,fe);Ae.bindFramebuffer(O.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else at?S.isDataTexture||S.isData3DTexture?O.texSubImage3D(Se,U,we,Xe,nt,ne,fe,xe,kt,je,rt.data):N.isCompressedArrayTexture?O.compressedTexSubImage3D(Se,U,we,Xe,nt,ne,fe,xe,kt,rt.data):O.texSubImage3D(Se,U,we,Xe,nt,ne,fe,xe,kt,je,rt):S.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,U,we,Xe,ne,fe,kt,je,rt.data):S.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,U,we,Xe,rt.width,rt.height,kt,rt.data):O.texSubImage2D(O.TEXTURE_2D,U,we,Xe,ne,fe,kt,je,rt);O.pixelStorei(O.UNPACK_ROW_LENGTH,hn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ke),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Wt),O.pixelStorei(O.UNPACK_SKIP_ROWS,di),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Pt),U===0&&N.generateMipmaps&&O.generateMipmap(Se),Ae.unbindTexture()},this.copyTextureToTexture3D=function(S,N,H=null,$=null,U=0){return S.isTexture!==!0&&(_s("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,$=arguments[1]||null,S=arguments[2],N=arguments[3],U=arguments[4]||0),_s('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,H,$,U)},this.initRenderTarget=function(S){Ee.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),Ae.unbindTexture()},this.resetState=function(){E=0,C=0,R=null,Ae.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}class Er{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new Er(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class hy extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class dy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Eo,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const At=new P;class Ar{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ar(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bs extends Zi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ei;const ls=new P,Ai=new P,Ri=new P,Ci=new me,cs=new me,id=new lt,or=new P,hs=new P,lr=new P,fc=new me,ba=new me,pc=new me;class ki extends vt{constructor(e=new bs){if(super(),this.isSprite=!0,this.type="Sprite",Ei===void 0){Ei=new on;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new dy(t,5);Ei.setIndex([0,1,2,0,2,3]),Ei.setAttribute("position",new Ar(n,3,0,!1)),Ei.setAttribute("uv",new Ar(n,2,3,!1))}this.geometry=Ei,this.material=e,this.center=new me(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ai.setFromMatrixScale(this.matrixWorld),id.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ri.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ai.multiplyScalar(-Ri.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;cr(or.set(-.5,-.5,0),Ri,o,Ai,s,r),cr(hs.set(.5,-.5,0),Ri,o,Ai,s,r),cr(lr.set(.5,.5,0),Ri,o,Ai,s,r),fc.set(0,0),ba.set(1,0),pc.set(1,1);let a=e.ray.intersectTriangle(or,hs,lr,!1,ls);if(a===null&&(cr(hs.set(-.5,.5,0),Ri,o,Ai,s,r),ba.set(0,1),a=e.ray.intersectTriangle(or,lr,hs,!1,ls),a===null))return;const l=e.ray.origin.distanceTo(ls);l<e.near||l>e.far||t.push({distance:l,point:ls.clone(),uv:Gt.getInterpolation(ls,or,hs,lr,fc,ba,pc,new me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function cr(i,e,t,n,s,r){Ci.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(cs.x=r*Ci.x-s*Ci.y,cs.y=s*Ci.x+r*Ci.y):cs.copy(Ci),i.copy(e),i.x+=cs.x,i.y+=cs.y,i.applyMatrix4(id)}class mc extends Et{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ln{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const d=n[s],u=n[s+1]-d,p=(o-d)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new me:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new P,s=[],r=[],o=[],a=new P,l=new lt;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),h=Math.abs(s[0].y),u=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(_t(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(_t(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ko extends ln{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new me){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*d-p*h+this.aX,c=u*h+p*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class uy extends Ko{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Jo(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,d,h){let u=(o-r)/c-(a-r)/(c+d)+(a-o)/d,p=(a-o)/d-(l-o)/(d+h)+(l-a)/h;u*=d,p*=d,s(o,a,u,p)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const hr=new P,wa=new Jo,Ma=new Jo,Sa=new Jo;class fy extends ln{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,d;this.closed||a>0?c=s[(a-1)%r]:(hr.subVectors(s[0],s[1]).add(s[0]),c=hr);const h=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(hr.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=hr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),p),v=Math.pow(h.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(d),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),wa.initNonuniformCatmullRom(c.x,h.x,u.x,d.x,g,v,m),Ma.initNonuniformCatmullRom(c.y,h.y,u.y,d.y,g,v,m),Sa.initNonuniformCatmullRom(c.z,h.z,u.z,d.z,g,v,m)}else this.curveType==="catmullrom"&&(wa.initCatmullRom(c.x,h.x,u.x,d.x,this.tension),Ma.initCatmullRom(c.y,h.y,u.y,d.y,this.tension),Sa.initCatmullRom(c.z,h.z,u.z,d.z,this.tension));return n.set(wa.calc(l),Ma.calc(l),Sa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function gc(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function py(i,e){const t=1-i;return t*t*e}function my(i,e){return 2*(1-i)*i*e}function gy(i,e){return i*i*e}function Es(i,e,t,n){return py(i,e)+my(i,t)+gy(i,n)}function vy(i,e){const t=1-i;return t*t*t*e}function yy(i,e){const t=1-i;return 3*t*t*i*e}function _y(i,e){return 3*(1-i)*i*i*e}function xy(i,e){return i*i*i*e}function As(i,e,t,n,s){return vy(i,e)+yy(i,t)+_y(i,n)+xy(i,s)}class sd extends ln{constructor(e=new me,t=new me,n=new me,s=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new me){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(As(e,s.x,r.x,o.x,a.x),As(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class by extends ln{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(As(e,s.x,r.x,o.x,a.x),As(e,s.y,r.y,o.y,a.y),As(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class rd extends ln{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wy extends ln{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ad extends ln{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Es(e,s.x,r.x,o.x),Es(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class My extends ln{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Es(e,s.x,r.x,o.x),Es(e,s.y,r.y,o.y),Es(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class od extends ln{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],d=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(gc(a,l.x,c.x,d.x,h.x),gc(a,l.y,c.y,d.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new me().fromArray(s))}return this}}var vc=Object.freeze({__proto__:null,ArcCurve:uy,CatmullRomCurve3:fy,CubicBezierCurve:sd,CubicBezierCurve3:by,EllipseCurve:Ko,LineCurve:rd,LineCurve3:wy,QuadraticBezierCurve:ad,QuadraticBezierCurve3:My,SplineCurve:od});class Sy extends ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new vc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const d=l[c];n&&n.equals(d)||(t.push(d),n=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new vc[s.type]().fromJSON(s))}return this}}class Ty extends Sy{constructor(e){super(),this.type="Path",this.currentPoint=new me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new rd(this.currentPoint.clone(),new me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new ad(this.currentPoint.clone(),new me(e,t),new me(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new sd(this.currentPoint.clone(),new me(e,t),new me(n,s),new me(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new od(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new Ko(e,t,n,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Zo extends on{constructor(e=[new me(0,-.5),new me(.5,0),new me(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=_t(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],d=1/t,h=new P,u=new me,p=new P,g=new P,v=new P;let m=0,f=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,f=e[x+1].y-e[x].y,p.x=f*1,p.y=-m,p.z=f*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[x+1].x-e[x].x,f=e[x+1].y-e[x].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let x=0;x<=t;x++){const M=n+x*d*s,_=Math.sin(M),k=Math.cos(M);for(let E=0;E<=e.length-1;E++){h.x=e[E].x*_,h.y=e[E].y,h.z=e[E].x*k,o.push(h.x,h.y,h.z),u.x=x/t,u.y=E/(e.length-1),a.push(u.x,u.y);const C=l[3*E+0]*_,R=l[3*E+1],b=l[3*E+0]*k;c.push(C,R,b)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const _=M+x*e.length,k=_,E=_+e.length,C=_+e.length+1,R=_+1;r.push(k,E,R),r.push(C,R,E)}this.setIndex(r),this.setAttribute("position",new Ft(o,3)),this.setAttribute("uv",new Ft(a,2)),this.setAttribute("normal",new Ft(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zo(e.points,e.segments,e.phiStart,e.phiLength)}}class Qo extends Zo{constructor(e=1,t=1,n=4,s=8){const r=new Ty;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new Qo(e.radius,e.length,e.capSegments,e.radialSegments)}}class Rr extends on{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],h=[],u=[],p=[];let g=0;const v=[],m=n/2;let f=0;x(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new Ft(h,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(p,2));function x(){const _=new P,k=new P;let E=0;const C=(t-e)/n;for(let R=0;R<=r;R++){const b=[],y=R/r,T=y*(t-e)+e;for(let I=0;I<=s;I++){const L=I/s,B=L*l+a,X=Math.sin(B),G=Math.cos(B);k.x=T*X,k.y=-y*n+m,k.z=T*G,h.push(k.x,k.y,k.z),_.set(X,C,G).normalize(),u.push(_.x,_.y,_.z),p.push(L,1-y),b.push(g++)}v.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){const y=v[b][R],T=v[b+1][R],I=v[b+1][R+1],L=v[b][R+1];(e>0||b!==0)&&(d.push(y,T,L),E+=3),(t>0||b!==r-1)&&(d.push(T,I,L),E+=3)}c.addGroup(f,E,0),f+=E}function M(_){const k=g,E=new me,C=new P;let R=0;const b=_===!0?e:t,y=_===!0?1:-1;for(let I=1;I<=s;I++)h.push(0,m*y,0),u.push(0,y,0),p.push(.5,.5),g++;const T=g;for(let I=0;I<=s;I++){const B=I/s*l+a,X=Math.cos(B),G=Math.sin(B);C.x=b*G,C.y=m*y,C.z=b*X,h.push(C.x,C.y,C.z),u.push(0,y,0),E.x=X*.5+.5,E.y=G*.5*y+.5,p.push(E.x,E.y),g++}for(let I=0;I<s;I++){const L=k+I,B=T+I;_===!0?d.push(B,B+1,L):d.push(B+1,B,L),R+=3}c.addGroup(f,R,_===!0?1:2),f+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gn extends Zi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fh,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const yc={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Ey{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null}}}const Ay=new Ey;class el{constructor(e){this.manager=e!==void 0?e:Ay,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}el.DEFAULT_MATERIAL_NAME="__DEFAULT";class Ry extends el{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=yc.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Ds("img");function l(){d(),yc.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){d(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class _c extends el{constructor(e){super(e)}load(e,t,n,s){const r=new Et,o=new Ry(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Br extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Cy extends Br{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ta=new lt,xc=new P,bc=new P;class ld{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xo,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xc.setFromMatrixPosition(e.matrixWorld),t.position.copy(xc),bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bc),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const wc=new lt,ds=new P,Ea=new P;class ky extends ld{constructor(){super(new $t(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new me(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ds.setFromMatrixPosition(e.matrixWorld),n.position.copy(ds),Ea.copy(n.position),Ea.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ea),n.updateMatrixWorld(),s.makeTranslation(-ds.x,-ds.y,-ds.z),wc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wc)}}class Ly extends Br{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ky}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Py extends ld{constructor(){super(new Yo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Iy extends Br{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new Py}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Dy extends Br{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ny{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Mc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Mc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Mc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bo);const us={url:new URL(""+new URL("tiny-dungeon-BMWnvaym.png",import.meta.url).href,import.meta.url).href,cols:12,rows:11},Sc={fighter:{col:0,row:8},cleric:{col:2,row:7},wizard:{col:0,row:7},rogue:{col:4,row:9},alchemist:{col:4,row:7}},cd={"rat-swarm":{col:3,row:10},skeleton:{col:4,row:10},"goblin-gang":{col:1,row:7},gelatinous:{col:0,row:9},wraith:{col:1,row:10},"dragon-whelp":{col:2,row:9},"ogre-king":{col:1,row:9},"bone-warden":{col:4,row:10},"grave-mites":{col:2,row:10},"barrow-shade":{col:1,row:10},"hungry-ghoul":{col:1,row:9},"shrouded-king":{col:3,row:9},"abbot-of-worms":{col:1,row:10},salamander:{col:2,row:9},"cinder-bats":{col:0,row:10},"magma-toad":{col:0,row:9},"obsidian-golem":{col:4,row:10},"cinder-wyrm":{col:2,row:9},"forge-tyrant":{col:1,row:9},"flying-tomes":{col:0,row:10},"ink-elemental":{col:0,row:9},"spectral-scribe":{col:1,row:10},"index-wight":{col:3,row:9},archivist:{col:3,row:9},"grand-errata":{col:4,row:10},"sludge-elemental":{col:0,row:9},"potion-rats":{col:3,row:10},"mutant-vine":{col:2,row:10},"failed-homunculus":{col:1,row:9},"mad-alchemist":{col:3,row:9},"the-precipitate":{col:0,row:9},"castle-thrall":{col:1,row:7},"bat-cloud":{col:0,row:10},"pale-hound":{col:4,row:10},"crimson-mist":{col:1,row:10},"vampire-lord":{col:3,row:9},"the-bride":{col:3,row:8},"jar-imp":{col:2,row:9},"pickled-thing":{col:0,row:9},"root-golem":{col:4,row:10},"bog-toad":{col:0,row:9},"bog-witch":{col:4,row:8},"the-cauldron":{col:1,row:9},"frost-wisp":{col:1,row:10},"ice-crawler":{col:2,row:10},"thawed-dead":{col:1,row:7},"cinder-imp":{col:2,row:9},"mad-pyromancer":{col:0,row:7},"glacier-heart":{col:4,row:10}},Uy={col:1,row:9},Li={treasure:{col:5,row:7},"treasure-open":{col:7,row:7},vault:{col:6,row:7},mimic:{col:8,row:7},trap:{col:4,row:3},library:{col:5,row:5},shrine:{col:4,row:2},lab:{col:8,row:3},materials:{col:6,row:5},entrance:{col:10,row:3}},Oy={pillars:{col:6,row:0},rubble:{col:0,row:1},crates:{col:1,row:6},brazier:{col:5,row:2},pit:{col:9,row:0},boulder:{col:6,row:8},sarcophagus:{col:6,row:4},font:{col:8,row:2},spout:{col:8,row:1},portcullis:{col:5,row:3},anvil:{col:2,row:6},shelves:{col:3,row:6},mirror:{col:5,row:8}};function Fy(i){return Oy[i]||null}const By={slash:{col:2,row:5}};function zy(i){for(const[e,t]of Object.entries(i))cd[e]=t}function Hy(i){return Sc[i]||Sc.fighter}function $y(i){return cd[i]||Uy}function Tc(i){return i.type==="treasure"?i.cleared?Li["treasure-open"]:Li.treasure:i.type==="vault"?i.cleared?Li["treasure-open"]:Li.vault:Li[i.type]?Li[i.type]:null}const hd={pillars:{id:"pillars",name:"a row of squat pillars",icon:"🏛️",tile:{col:6,row:0},rooms:["monster","boss","corridor","library","shrine"],weight:3,tags:["cover"],cover:1,tell:"Pillars break the room into aisles — something to fight behind."},rubble:{id:"rubble",name:"a fall of rubble",icon:"🪨",tile:{col:0,row:1},rooms:["monster","corridor","disaster","trap","materials"],weight:3,tags:["cover","materials"],cover:1,tell:"Half the ceiling is on the floor, in pieces worth stepping around."},crates:{id:"crates",name:"stacked crates and barrels",icon:"📦",tile:{col:1,row:6},rooms:["treasure","materials","corridor","monster","lab"],weight:2.5,tags:["cover","loot"],cover:1,tell:"Somebody stacked supplies here and never came back for them."},brazier:{id:"brazier",name:"a brazier still burning",icon:"🔥",tile:{col:5,row:2},rooms:["monster","boss","shrine","library","lab"],weight:2.5,tags:["fire","light"],tell:"A brazier burns in its bracket — nobody has been here to feed it, and it burns anyway."},pit:{id:"pit",name:"an open pit",icon:"🕳️",tile:{col:9,row:0},rooms:["monster","boss","trap","corridor","disaster"],weight:2,tags:["hazard"],tell:"A pit takes up a third of the floor. The bottom is not visible."},boulder:{id:"boulder",name:"a boulder on a bad slope",icon:"⚪",tile:{col:6,row:8},rooms:["monster","corridor","disaster","materials"],weight:1.5,tags:["hazard"],tell:"A boulder sits at the top of a slope, held by a wedge of rotten timber."},sarcophagus:{id:"sarcophagus",name:"a stone sarcophagus",icon:"⚰️",tile:{col:6,row:4},rooms:["monster","shrine","treasure","vault","boss"],weight:2,tags:["undead","loot"],undeadRisk:!0,tell:"A sarcophagus stands against the wall with its lid slightly wrong."},font:{id:"font",name:"a stone font of still water",icon:"⛲",tile:{col:8,row:2},rooms:["shrine","monster","corridor","library"],weight:2,tags:["water"],douse:!0,tell:"A font holds water that has been still a long time and is somehow clean."},spout:{id:"spout",name:"a gargoyle spout, dripping",icon:"🗿",tile:{col:8,row:1},rooms:["lab","materials","corridor","monster"],weight:1.8,tags:["alchemy"],tell:"A gargoyle spout drips something that is not water into a stained channel."},portcullis:{id:"portcullis",name:"a raised portcullis",icon:"🚧",tile:{col:5,row:3},rooms:["monster","boss","corridor","vault"],weight:1.8,tags:["mechanism"],tell:"A portcullis hangs raised above the passage, on a chain that still turns."},anvil:{id:"anvil",name:"a cold anvil",icon:"🔨",tile:{col:2,row:6},rooms:["lab","materials","corridor","monster"],weight:1.5,tags:["forge"],tell:"An anvil sits under a dead forge, still true."},shelves:{id:"shelves",name:"sagging shelves",icon:"📚",tile:{col:3,row:6},rooms:["library","lab","vault","monster"],weight:2,tags:["study","flammable"],tell:"Shelves sag under books nobody has audited in a century."},spikes:{id:"spikes",name:"a bed of rusted floor spikes",icon:"🔻",rooms:["monster","boss","trap","corridor"],weight:2,tags:["hazard","sharp"],tell:"A bed of rusted spikes stands out of the floor, most of them still upright."},chasm:{id:"chasm",name:"a crack across the floor",icon:"🌑",rooms:["monster","boss","disaster","corridor"],weight:1.4,tags:["hazard","deep"],tell:"A crack runs the width of the room, wide enough to matter and too wide to jump twice."},mirror:{id:"mirror",name:"a tall silvered mirror",icon:"🪞",tile:{col:5,row:8},rooms:["monster","boss","treasure","shrine"],weight:1.2,tags:["reveal"],revealEthereal:!0,tell:"A silvered mirror leans against the wall, and it shows the room more honestly than the room does."}},ci={"shove-into-pit":{feature:"pit",name:"Shove It In",desc:"Put the pit between you and it",gates:[{cls:q.FIGHTER},{tactic:"tac-shove"},{item:"eq-grapple"}],fightOnly:!0,openerDamage:11,tool:{openerDamage:18},weights:{reckless:3,brave:2,cunning:2}},"shove-onto-spikes":{feature:"spikes",name:"Put It On the Spikes",desc:"The floor is already armed",gates:[{cls:q.FIGHTER},{tactic:"tac-shove"},{item:"eq-tower-shield"}],fightOnly:!0,openerDamage:12,tool:{openerDamage:19},weights:{reckless:3,brave:2,cunning:1.5}},"shove-into-chasm":{feature:"chasm",name:"Put It In the Crack",desc:"The floor already opened once",gates:[{cls:q.FIGHTER},{tactic:"tac-shove"},{item:"eq-grapple"}],fightOnly:!0,openerDamage:13,tool:{openerDamage:21},weights:{reckless:3,cunning:2,craven:1.5}},"topple-boulder":{feature:"boulder",name:"Topple the Boulder",desc:"Gravity does the first round",gates:[{cls:q.FIGHTER},{spell:"sp-shatter"}],fightOnly:!0,openerDamage:5,tool:{openerDamage:13},weights:{reckless:3,brave:1.5}},"shove-into-brazier":{feature:"brazier",name:"Shove It Into the Fire",desc:"The brazier is right there",gates:[{cls:q.FIGHTER},{tactic:"tac-shove"},{item:"eq-tinderbox"},{spell:"sp-kindle"}],fightOnly:!0,openerDamage:10,element:"fire",tool:{openerDamage:16},weights:{reckless:2.5,cunning:1}},"drop-portcullis":{feature:"portcullis",name:"Drop the Portcullis",desc:"Cut the room in half on top of it",gates:[{cls:q.ROGUE},{item:"eq-winch-hook"}],fightOnly:!0,openerDamage:6,tool:{openerDamage:14},weights:{cunning:3,craven:2,scholarly:1}},"fight-from-cover":{feature:"pillars",name:"Fight From the Pillars",desc:"Make it come to you, one aisle at a time",gates:[{cls:q.ROGUE},{cls:q.FIGHTER},{item:"eq-tower-shield"}],fightOnly:!0,openerDamage:3,extraCover:1,tool:{openerDamage:4,extraCover:3},weights:{cunning:2,craven:2.5,brave:-1}},"pry-sarcophagus":{feature:"sarcophagus",name:"Pry the Lid",desc:"Grave goods, and whatever else",gates:[{item:"eq-prybar"},{cls:q.ROGUE}],gold:20,wakesDead:!0,tool:{gold:55,quiet:!0},weights:{greedy:3.5,reckless:2,pious:-3}},"bless-the-font":{feature:"font",name:"Bless the Font",desc:"Clean water, said over",gates:[{cls:q.CLERIC},{spell:"sp-purify"}],heal:5,tool:{heal:12},weights:{pious:3.5,scholarly:1}},"fill-waterskins":{feature:"font",name:"Fill the Waterskins",desc:"Cold water, and a wash for the wounds",gates:[{item:"eq-waterskin"}],heal:3,curesLinger:!0,weights:{cunning:2,craven:1.5}},"harvest-spout":{feature:"spout",name:"Harvest the Drip",desc:"Whatever that is, it is a reagent",gates:[{cls:q.ALCHEMIST},{item:"eq-waterskin"}],materials:1,tool:{materials:3},weights:{greedy:2,scholarly:2}},"sift-rubble":{feature:"rubble",name:"Sift the Rubble",desc:"Salts and oddments in the broken stone",gates:[{cls:q.ALCHEMIST},{item:"eq-prybar"}],materials:1,gold:5,tool:{materials:2,gold:25},weights:{greedy:2.5,scholarly:1}},"crack-crates":{feature:"crates",name:"Crack the Crates",desc:"Somebody else's supplies",gates:[{item:"eq-prybar"},{cls:q.ROGUE}],gold:12,materials:1,tool:{gold:40,materials:2},weights:{greedy:3.5,reckless:1}},"work-the-anvil":{feature:"anvil",name:"Work the Anvil",desc:"Put an edge back on something",gates:[{item:"eq-smiths-kit"}],weaponMod:{name:"anvil-set edge",attack:3},weights:{brave:2,cunning:1.5,scholarly:1}},"strip-the-shelves":{feature:"shelves",name:"Strip the Shelves",desc:"A working, if the damp left one",gates:[{cls:q.WIZARD},{item:"eq-grimoire"}],spell:{name:"Shelf-Found Working",icon:"📜",school:"found",power:3,use:"combat"},tool:{spell:{name:"Shelf-Found Working",icon:"📜",school:"found",power:5,use:"combat"},extraSpell:!0},weights:{scholarly:3.5,greedy:1}}};function Gy(i){const e=(i.w||4)*(i.h||4);return e<18?0:e<32?1:e<56?2:e<90?3:e<140?4:5}function Ec(i,e,t=null){const n=Gy(i);if(n===0)return[];const s=Object.values(hd).filter(o=>o.rooms.includes(i.type));if(s.length===0)return[];const r=[];for(let o=0;o<n;o++){if(e.next()<.32)continue;const a=s.filter(d=>!r.includes(d.id));if(a.length===0)break;const l=a.reduce((d,h)=>d+h.weight,0);let c=e.next()*l;for(const d of a)if(c-=d.weight,c<=0){r.push(d.id);break}}return r}function zr(i){return hd[i]||null}function Hr(i){return((i==null?void 0:i.features)||[]).map(zr).filter(Boolean)}function Vy(i){const e={cover:0,douse:!1,revealEthereal:!1,undeadRisk:!1,notes:[]};for(const t of Hr(i))t.cover&&(e.cover+=t.cover,e.notes.push({feature:t.id,text:`🧱 The party fights from behind ${t.name}: ${t.cover} less damage per round.`})),t.douse&&(e.douse=!0),t.revealEthereal&&(e.revealEthereal=!0,e.notes.push({feature:t.id,text:`🪞 ${jy(t.name)} shows the ethereal where it truly stands: weapons do full damage.`})),t.undeadRisk&&(e.undeadRisk=!0);return e.cover=Math.min(e.cover,2),e}function Co(i,e,t){var n;return i.cls?e.hasClass(i.cls):i.item?t.item(i.item):i.spell?t.spell(i.spell):i.tactic?!!((n=t.tactic)!=null&&n.call(t,i.tactic)):!1}function Wy(i,e,t){const n=new Set((i==null?void 0:i.features)||[]),s=(i==null?void 0:i.type)==="monster"||(i==null?void 0:i.type)==="boss",r=[];for(const[o,a]of Object.entries(ci)){if(!n.has(a.feature)||a.fightOnly&&!s||!a.gates.some(c=>Co(c,e,t)))continue;const l=a.gates.find(c=>Co(c,e,t));r.push({id:o,name:a.name,desc:a.desc,feature:a.feature,opener:l.item||l.spell||l.cls})}return r}function qy(i,e,t){const n=ci[i];if(!n)return null;const s=n.gates.some(r=>(r.item||r.spell)&&Co(r,e,t));return s&&n.tool?{...n,...n.tool,tier:"tool"}:{...n,tier:s?"tool":"class"}}function Xy(i){var e;return((e=ci[i])==null?void 0:e.weights)||null}function Yy(i){return Object.prototype.hasOwnProperty.call(ci,i)}function jy(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}const Cr=1,Ky=1.8;function jt(i){return{hx:(i.w||4)*Cr/2,hz:(i.h||4)*Cr/2}}function tl(i){const{hx:e,hz:t}=jt(i);return e>=t?{axis:"x",far:e,wide:t}:{axis:"z",far:t,wide:e}}function Ac(i,e=0,t=0){const{axis:n,far:s}=tl(i),r=Math.max(.8,s*.45);return n==="x"?{mx:e+r,mz:t}:{mx:e,mz:t+r}}const Jy={column:1,line:2,shieldwall:2,wedge:3,loose:2};function Zy(i,e,t,n,s,r="line"){const{axis:o,far:a,wide:l}=tl(i),c=s?-Math.max(.7,a*.42):-Math.max(.2,a*.12),d=Math.min(n,Jy[r]??2),h=r==="loose"?1.6:r==="shieldwall"?.7:1,u=Math.min(1.25,Math.max(.75,l*.45))*h,p=Math.min(1.3,Math.max(.8,l*.7))*h,g=[];for(let v=0;v<n;v++){const m=v<d?0:1,f=m===0?v:v-d,x=m===0?d:n-d,M=(f-(x-1)/2)*p,_=c+m*-u;g.push(o==="x"?{mx:e+_,mz:t+M}:{mx:e+M,mz:t+_})}return g}function Qy(i,e){if(e===0)return[[-i/2,i/2]];const t=Ky/2,n=[];return-i/2<-t&&n.push([-i/2,-t]),t<i/2&&n.push([t,i/2]),n}function e0(i,e=0,t=0,n=0){if(n<=0)return[];const{hx:s,hz:r}=jt(i),{axis:o}=tl(i),a=.9,l=Math.max(.6,(o==="x"?r:s)-a),c=Math.max(.6,(o==="x"?s:r)-a),d=o==="x"?(u,p)=>({mx:e+c*u,mz:t+l*p}):(u,p)=>({mx:e+l*p,mz:t+c*u}),h=[d(-.15,-1),d(-.15,1),d(-.85,-.95),d(-.85,.95),d(.5,-1),d(.5,1),d(.9,-.5),d(.9,.5)];return h.slice(0,Math.min(n,h.length))}function t0(i,e,t=()=>!1){const n=new Map,s=(r,o,a)=>{n.has(r)||n.set(r,[]),n.get(r).push({side:o,secret:a})};for(const r of e){if(r.kind==="trapdoor")continue;const o=i[r.a],a=i[r.b];if(!o||!a||t(o)||t(a))continue;const l=a.x-o.x,c=a.y-o.y;Math.abs(l)>=Math.abs(c)?(s(r.a,l>0?"east":"west",r.secret),s(r.b,l>0?"west":"east",r.secret)):(s(r.a,c>0?"south":"north",r.secret),s(r.b,c>0?"north":"south",r.secret))}return n}const Aa=7,dr=26,fs=1.15,Rc=.28,Cc=1.7,n0=7,kc={fighter:13126716,cleric:15258762,wizard:8018664,rogue:4885084,alchemist:3979432},dd={delve:{plat:6380370,wall:3486252,bg:657413,boss:5908006},crypt:{plat:5130838,wall:2894387,bg:460297,boss:4860490},volcanic:{plat:6045752,wall:3350812,bg:853251,boss:8006170},library:{plat:4147800,wall:2305080,bg:263947,boss:2767450},madlab:{plat:4479050,wall:2372906,bg:264196,boss:2775610},castle:{plat:4078158,wall:2104620,bg:328713,boss:5904938},bogcellar:{plat:4868660,wall:2763292,bg:395011,boss:4872730},icecaverns:{plat:4872806,wall:2766400,bg:263945,boss:3824234},athanor:{plat:5917240,wall:3352860,bg:657155,boss:6965786}},i0=dd.delve,Lc={armored:"🛡️",ethereal:"👻",venomous:"🐍",swarm:"🐝",slow:"🐌"},Pc={fire:"🔥",frost:"❄️",shock:"⚡",holy:"🌟"},Ic={fire:"#ff8a3c",frost:"#7ec8ff",shock:"#ffe95e",holy:"#ffe9a0"},s0={fight:{kind:"slash"},"spell-strike":{kind:"glow",color:"#ff8a3c"},"turn-undead":{kind:"glow",color:"#ffe9a0"},"deep-study":{kind:"glow",color:"#b07ae8"},"spell-bypass":{kind:"glow",color:"#b07ae8"},rest:{kind:"glow",color:"#ffe9a0"},alchemy:{kind:"glow",color:"#3cb8a8"},disarm:{kind:"glow",color:"#8fb8dd"},"push-through":{kind:"glow",color:"#e05555"},brace:{kind:"glow",color:"#e05555"},scatter:{kind:"glow",color:"#e05555"},loot:{kind:"glow",color:"#ffd75e"},desecrate:{kind:"glow",color:"#ffd75e"}};class r0{constructor(e){this.canvas=document.getElementById(e),this.renderer=new cy({canvas:this.canvas,antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Th,this.scene=new hy,this.scene.background=new ze(657413),this.scene.fog=new Er(657413,34,78),this.scene.add(new Dy(11187408,1.1)),this.scene.add(new Cy(9083578,3813416,.9));const t=new Iy(11189213,1.3);t.position.set(-10,20,6),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-30,t.shadow.camera.right=30,t.shadow.camera.top=30,t.shadow.camera.bottom=-30,this.scene.add(t),this.torch=new Ly(16751164,30,12,1.8),this.torch.position.set(0,2.2,0),this.scene.add(this.torch),this.staticGroup=new bn,this.iconGroup=new bn,this.occupantGroup=new bn,this.partyGroup=new bn,this.fxGroup=new bn,this.scene.add(this.staticGroup,this.iconGroup,this.occupantGroup,this.partyGroup,this.fxGroup),this.spriteMaterials=new Map,this.builtKey=null,this.roomPositions=[],this.clock=new Ny,this.effects=[],this.tileMats=new Map,this.atlasReady=!1,this.atlasTex=new _c().load(us.url,()=>{this.atlasReady=!0,this.lastState&&this.render(this.lastState)}),this.atlasTex.magFilter=Ot,this.atlasTex.minFilter=Ot,this.atlasTex.colorSpace=Tt,this.meepleGeo=new Qo(.16,.26,4,10),this.meepleMats={};for(const[s,r]of Object.entries(kc))this.meepleMats[s]=new gn({color:r,roughness:.6});this.baseGeo=new Rr(.24,.28,.07,16),this.baseMats={};for(const[s,r]of Object.entries(kc))this.baseMats[s]=new gn({color:r,roughness:.7});this.disposed=!1;const n=()=>{this.disposed||(requestAnimationFrame(n),this.animateFrame())};n(),typeof window<"u"&&(window.__iso=this)}render(e){var o;this.lastState=e;const t=e.dungeon.rooms;this.resize(t);const n=((o=e.dungeon.theme)==null?void 0:o.id)||"delve",s=n+"|"+t.map(a=>`${a.type}${a.w}x${a.h}${a.shape}${a.secret&&!a.discovered?"?":""}`).join(",");this.builtKey!==s&&(this.buildDungeon(t,e.dungeon.edges,n,e.dungeon.trapdoors||[]),this.builtKey=s),this.updateIcons(e),this.updateOccupants(e),this.updateParty(e);const r=e.currentRoomIndex??Math.min(e.roomIndex,t.length-1);this.focusOn(t[r]),this.animateFrame()}tileMaterial(e){const t=`${e.col},${e.row}`;if(!this.tileMats.has(t)){const n=this.atlasTex.clone();n.needsUpdate=!0,n.repeat.set(1/us.cols,1/us.rows),n.offset.set(e.col/us.cols,1-(e.row+1)/us.rows),this.tileMats.set(t,new bs({map:n,transparent:!0}))}return this.tileMats.get(t)}imageMaterial(e){const t=`img:${e}`;if(!this.tileMats.has(t)){const n=new _c().load(e,()=>{this.lastState&&this.render(this.lastState)});n.colorSpace=Tt,this.tileMats.set(t,new bs({map:n,transparent:!0}))}return this.tileMats.get(t)}tileSprite(e,t=1){var s;if(e.img){const r=this.imageMaterial(e.img),o=new ki(r),a=(s=r.map)==null?void 0:s.image,l=a&&a.width?a.width/a.height:1;return o.scale.set(t*Math.min(l,1.4),t,1),o}const n=new ki(this.tileMaterial(e));return n.scale.set(t,t,1),n}updateOccupants(e){if(this.occupantGroup.clear(),!this.atlasReady)return;const t=e.dungeon.rooms,n=this.knownSet(e);t.forEach((s,r)=>{if(s.secret&&!s.discovered)return;const{x:o,y:a,z:l}=this.roomPositions[r];if(!(n.has(r)||s.type==="boss"))return;let d=null;if((s.type==="monster"||s.type==="boss")&&s.monster&&!s.cleared){const p=s.type==="boss"?1.7:1.05,{mx:g,mz:v}=Ac(s,o,l);d=this.tileSprite($y(s.monster.kind),p),d.position.set(g,a+.2+p/2,v),d.userData.sway=!0;const m=[];Lc[s.monster.trait]&&m.push(Lc[s.monster.trait]);const f=s.monster.undead?"holy":(s.monster.weak||[])[0];Pc[f]&&m.push(Pc[f]),m.forEach((x,M)=>{const _=new ki(this.getSpriteMaterial(x));_.scale.set(.42,.42,1),_.position.set(g-.25+M*.5,a+.35+p,v),_.userData.baseY=a+.35+p,_.userData.phase=r*1.3+M,_.userData.sway=!0,this.occupantGroup.add(_)})}else{const p=Tc(s);if(p){const{mx:g,mz:v}=Ac(s,o,l);d=this.tileSprite(p,.95),d.position.set(g,a+.66,v),s.cleared&&(d.material=d.material.clone(),d.material.opacity=.55)}}d&&(d.userData.baseY=d.position.y,d.userData.phase=r*2.3,this.occupantGroup.add(d));const h=s.features||[],u=e0(s,o,l,h.length);h.forEach((p,g)=>{var x;const v=Fy(p),m=u[g];if(!m)return;const f=v?this.tileSprite(v,.8):this.emojiSprite(((x=zr(p))==null?void 0:x.icon)||"❔",.7);f.position.set(m.mx,a+.58,m.mz),f.userData.baseY=a+.58,f.userData.phase=r*1.1+g,p==="brazier"&&(f.userData.sway=!0),this.occupantGroup.add(f)})})}emojiSprite(e,t=.8){const n=new ki(this.getSpriteMaterial(e));return n.scale.set(t,t,1),n}roomWorldPos(e){return{x:e.x*Cr,y:-(e.floor||0)*n0,z:e.y*Cr}}bounds(e){let t=1/0,n=-1/0,s=1/0,r=-1/0;for(const o of e){const{x:a,z:l}=this.roomWorldPos(o),{hx:c,hz:d}=jt(o);t=Math.min(t,a-c),n=Math.max(n,a+c),s=Math.min(s,l-d),r=Math.max(r,l+d)}return{minX:t,maxX:n,minZ:s,maxZ:r,cx:(t+n)/2,cz:(s+r)/2}}resize(e){const t=this.canvas.clientWidth||500,n=this.canvas.clientHeight||420;if(this.lastW===t&&this.lastH===n&&this.camera)return;this.lastW=t,this.lastH=n,this.renderer.setSize(t,n,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));const s=t/n,r=Aa;this.camera=new Yo(-r*s,r*s,r,-r,.1,400),this.camera.position.set(dr,dr*1.05,dr),this.camera.lookAt(0,0,0),this.camTarget=new P(0,0,0)}focusOn(e){if(!e||!this.camera)return;const{x:t,y:n,z:s}=this.roomWorldPos(e),{hx:r,hz:o}=jt(e),a=Math.max(0,Math.max(r,o)+2.2-Aa);this.camTarget||(this.camTarget=new P(t,n,s)),this.camTarget.set(t,n,s),this.camZoom=a}buildDungeon(e,t=null,n="delve",s=[]){this.staticGroup.clear(),this.roomPositions=e.map(h=>this.roomWorldPos(h));const r=dd[n]||i0;this.palette=r,this.scene.background=new ze(r.bg),this.scene.fog=new Er(r.bg,34,78);const o=h=>h.secret&&!h.discovered,a=t||e.slice(1).map((h,u)=>({a:u,b:u+1,kind:"door"})),l=t0(e,a,o),c=new gn({color:r.wall,roughness:1}),d=new gn({color:r.wall,roughness:1});e.forEach((h,u)=>{if(o(h))return;const{x:p,y:g,z:v}=this.roomPositions[u],{hx:m,hz:f}=jt(h),x=m*2,M=f*2,_=(h.index*7%5-2)*.02,k=h.type==="boss"?r.boss:h.type==="vault"?6969904:r.plat,E=new ze(k);E.offsetHSL(0,0,_);const C=new gn({color:E,roughness:.95});let R;if(h.shape==="rotunda"?R=new ft(new Rr(Math.min(m,f),Math.min(m,f)*1.02,.35,24),C):R=new ft(new Ut(x,.35,M),C),R.position.set(p,g,v),R.receiveShadow=!0,this.staticGroup.add(R),h.shape==="cavern")for(const[b,y]of[[-1,-1],[1,-1],[-1,1],[1,1]]){if((h.index+b+y)%2!==0)continue;const T=new ft(new Ut(x*.22,.5,M*.22),new gn({color:r.wall,roughness:1}));T.position.set(p+b*(m-x*.1),g+.16,v+y*(f-M*.1)),T.rotation.y=h.index%4*.2,T.castShadow=!0,this.staticGroup.add(T)}if(h.shape!=="rotunda"){const b=[{name:"north",axis:"x",len:x,off:-f},{name:"south",axis:"x",len:x,off:f},{name:"west",axis:"z",len:M,off:-m},{name:"east",axis:"z",len:M,off:m}],y=l.get(u)||[];for(const T of b){const I=y.filter(B=>B.side===T.name),L=Qy(T.len,I.length);for(const[B,X]of L){const G=X-B;if(G<=.05)continue;const Z=I.some(ae=>ae.secret)?d:c,z=T.axis==="x"?new ft(new Ut(G,fs,Rc),Z):new ft(new Ut(Rc,fs,G),Z),se=(B+X)/2;T.axis==="x"?z.position.set(p+se,g+fs/2,v+T.off):z.position.set(p+T.off,g+fs/2,v+se),z.castShadow=!0,this.staticGroup.add(z)}}}});for(const h of a){if(h.kind==="trapdoor"||h.kind==="stair")continue;const u=e[h.a],p=e[h.b];if(!u||!p||o(u)||o(p))continue;const g=this.roomPositions[h.a],v=this.roomPositions[h.b],m=jt(u),f=jt(p),x=v.x-g.x,M=v.z-g.z,_=new gn({color:h.secret?2762272:4012595,roughness:1});let k;if(Math.abs(x)>=Math.abs(M)){const E=Math.abs(x)-m.hx-f.hx;if(E<=.05)continue;k=new ft(new Ut(E+.4,.2,Cc),_),k.position.set(g.x+Math.sign(x)*(m.hx+E/2),g.y-.02,g.z)}else{const E=Math.abs(M)-m.hz-f.hz;if(E<=.05)continue;k=new ft(new Ut(Cc,.2,E+.4),_),k.position.set(g.x,g.y-.02,g.z+Math.sign(M)*(m.hz+E/2))}k.receiveShadow=!0,this.staticGroup.add(k)}for(const h of a){if(h.kind!=="stair")continue;const u=e[h.a],p=e[h.b];if(!u||!p||o(u)||o(p))continue;const g=this.roomPositions[h.a],v=this.roomPositions[h.b],m=g.y-v.y;if(m<=0)continue;const f=6,x=new gn({color:3486251,roughness:1}),M=jt(u);for(let _=0;_<f;_++){const k=(_+.5)/f,E=new ft(new Ut(1.6,.3,1.1),x);E.position.set(g.x+(v.x-g.x)*k*.35-M.hx*.2,g.y-m*k,g.z+(v.z-g.z)*k*.35+M.hz*.25),E.receiveShadow=!0,this.staticGroup.add(E)}}for(const h of s){const u=e[h.from];if(!u||o(u))continue;const{x:p,y:g,z:v}=this.roomPositions[h.from],{hx:m,hz:f}=jt(u),x=new ft(new Ut(1.5,.42,1.5),new gn({color:h.secret?3025444:460298,roughness:1}));x.position.set(p+m*.45,g+.01,v-f*.45),this.staticGroup.add(x)}}getSpriteMaterial(e){if(!this.spriteMaterials.has(e)){const t=document.createElement("canvas");t.width=128,t.height=128;const n=t.getContext("2d");n.font="92px serif",n.textAlign="center",n.textBaseline="middle",n.fillText(e,64,70);const s=new mc(t);s.colorSpace=Tt,this.spriteMaterials.set(e,new bs({map:s,transparent:!0}))}return this.spriteMaterials.get(e)}knownSet(e){return new Set(e.knownIdxs||e.dungeon.rooms.map((t,n)=>n).filter(t=>t<=e.roomIndex+1))}updateIcons(e){this.iconGroup.clear();const t=e.dungeon.rooms,n=this.knownSet(e),s=e.currentRoomIndex??e.roomIndex;t.forEach((r,o)=>{if(r.secret&&!r.discovered)return;const{x:a,y:l,z:c}=this.roomPositions[o],d=n.has(o)||r.type==="boss",h=d?r.icon:"❓";if(d&&this.atlasReady&&((r.type==="monster"||r.type==="boss")&&r.monster&&!r.cleared||Tc(r)))return;const u=new ki(this.getSpriteMaterial(h)),p=r.type==="boss"?1.5:1;u.scale.set(p,p,1);const g=l+fs+.6;u.position.set(a,g,c),u.material=u.material.clone(),u.material.opacity=r.cleared&&o!==s?.28:1,u.userData.baseY=g,u.userData.phase=o,this.iconGroup.add(u)})}updateParty(e){var u;this.partyGroup.clear();const t=e.currentRoomIndex??Math.min(e.roomIndex,e.dungeon.rooms.length-1),{x:n,y:s,z:r}=this.roomPositions[t]||{x:0,y:0,z:0},o=e.dungeon.rooms[t],a=o?Math.max(jt(o).hx,jt(o).hz):4;this.torch.position.set(n,s+2.4,r),this.torch.distance=Math.max(12,a*3.4),this.torchBase=24+a*2.2;const l=o&&o.monster&&!o.cleared&&(o.type==="monster"||o.type==="boss"),c=e.party.members.filter(p=>p.alive).slice().sort((p,g)=>(p.class==="fighter"?-1:0)-(g.class==="fighter"?-1:0)),d=c.length,h=o?Zy(o,n,r,d,l,((u=e==null?void 0:e.party)==null?void 0:u.formation)||"line"):c.map(()=>({mx:n,mz:r}));c.forEach((p,g)=>{const{mx:v,mz:m}=h[g],f=p.health/p.maxHealth<=.35;if(this.atlasReady){const x=this.tileSprite(Hy(p.class),.82);x.position.set(v,s+.72,m),x.userData.baseY=s+.72,x.userData.phase=g*1.7,f&&(x.material=x.material.clone(),x.material.color.set(12157056),x.scale.y=.68),this.partyGroup.add(x);const M=new ft(this.baseGeo,this.baseMats[p.class]||this.baseMats.fighter);M.position.set(v,s+.24,m),M.castShadow=!0,this.partyGroup.add(M)}else{const x=new ft(this.meepleGeo,this.meepleMats[p.class]||this.meepleMats.fighter);x.position.set(v,s+.55,m),x.castShadow=!0,x.userData.baseY=s+.55,x.userData.phase=g*1.7,this.partyGroup.add(x)}})}playEffect(e,t,n=null){const s=s0[e];if(!s||!this.roomPositions[t])return;const{x:r,y:o,z:a}=this.roomPositions[t],l=e==="spell-strike"&&Ic[n]?Ic[n]:s.color;let c;s.kind==="slash"&&this.atlasReady?(c=this.tileSprite(By.slash,1.1),c.material=c.material.clone()):(c=new ki(this.glowMaterial(l||"#ffffff").clone()),c.scale.set(1.1,1.1,1)),c.position.set(r,o+1,a),this.fxGroup.add(c),this.effects.push({sprite:c,born:this.clock.getElapsedTime(),life:.7})}glowMaterial(e){const t=`glow:${e}`;if(!this.spriteMaterials.has(t)){const n=document.createElement("canvas");n.width=128,n.height=128;const s=n.getContext("2d"),r=s.createRadialGradient(64,64,6,64,64,62);r.addColorStop(0,e),r.addColorStop(.45,e+"aa"),r.addColorStop(1,e+"00"),s.fillStyle=r,s.fillRect(0,0,128,128);const o=new mc(n);o.colorSpace=Tt,this.spriteMaterials.set(t,new bs({map:o,transparent:!0,blending:Ba,depthWrite:!1}))}return this.spriteMaterials.get(t)}animateFrame(){if(!this.camera)return;const e=this.clock.getElapsedTime();if(this.camTarget){const n=dr+(this.camZoom||0)*2,s=new P(this.camTarget.x+n,this.camTarget.y+n*1.05,this.camTarget.z+n),r=this.camPlaced?.12:1;this.camPlaced=!0,this.camera.position.lerp(s,r),this.camLook||(this.camLook=this.camTarget.clone()),this.camLook.lerp(this.camTarget,r),this.camera.lookAt(this.camLook);const o=Aa+(this.camZoom||0),a=(this.lastW||500)/(this.lastH||420);this.camera.top=o,this.camera.bottom=-o,this.camera.left=-o*a,this.camera.right=o*a,this.camera.updateProjectionMatrix()}const t=this.torchBase||26;this.torch.intensity=t+Math.sin(e*9)*3+Math.sin(e*23)*2;for(const n of this.iconGroup.children)n.position.y=n.userData.baseY+Math.sin(e*1.6+n.userData.phase)*.06;for(const n of this.partyGroup.children)n.userData.baseY!==void 0&&(n.position.y=n.userData.baseY+Math.abs(Math.sin(e*2.2+n.userData.phase))*.05);for(const n of this.occupantGroup.children)n.userData.sway&&(n.position.y=n.userData.baseY+Math.sin(e*2.8+n.userData.phase)*.07);for(let n=this.effects.length-1;n>=0;n--){const s=this.effects[n],r=(e-s.born)/s.life;if(r>=1){this.fxGroup.remove(s.sprite),this.effects.splice(n,1);continue}const o=.9+r*1.6;s.sprite.scale.set(o,o,1),s.sprite.material.opacity=1-r*r}this.renderer.render(this.scene,this.camera)}dispose(){this.disposed=!0,this.renderer.dispose()}}const a0=["weapon","armor","focus","tool","boots","trinket"];function ot(i){return String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const ur="background:#14110b;border:1px solid #3a2f1e;border-radius:6px;padding:0.8rem;",ps="color:#887755;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;";function ud(i,e,{onChange:t=()=>{},onDone:n=null,doneLabel:s="Done"}={}){const r=()=>{t(),ud(i,e,{onChange:t,onDone:n,doneLabel:s})};i.innerHTML="";const o=document.createElement("div");o.innerHTML=`
    <h2 style="color:#d8a53f;font-size:1.3rem;margin-bottom:0.3rem;text-align:center;">🎒 The Muster</h2>
    <div style="text-align:center;color:#887755;margin-bottom:0.9rem;font-size:0.85rem;">
      Who carries what, who prepares which working, and who they are.
    </div>`,i.appendChild(o);const a=[...e.members];for(const h of a){const u=document.createElement("div");u.className="outfit-member",u.style.cssText=`${ur}margin-bottom:0.7rem;`;const p=new Map(h.equipment.map(v=>[v.slot||"trinket",v])),g=a0.map(v=>{const m=p.get(v);return`
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;padding:0.15rem 0;">
          <span style="${ps}width:3.6rem;flex:none;">${v}</span>
          <span style="flex:1;color:${m?"#e8d9b3":"#4a443a"};">
            ${m?`${ot(m.icon||"")} ${ot(m.name)}`:"—"}
          </span>
          ${m?`<button class="outfit-off" data-card="${ot(m.id)}"
                 style="font-size:0.68rem;padding:0.15rem 0.4rem;background:#26200f;color:#c8b88a;">take off</button>`:""}
        </div>`}).join("");u.innerHTML=`
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
        <span style="font-size:1.2rem;">${ot(h.icon)}</span>
        <input class="outfit-name" data-uid="${ot(h.uid)}" value="${ot(h.name)}"
          maxlength="40" aria-label="Name"
          style="flex:1;background:#0f0d09;color:#e8d9b3;border:1px solid #3a2f1e;border-radius:4px;padding:0.3rem 0.45rem;font-family:inherit;font-size:0.92rem;" />
        <span style="color:#887755;font-size:0.78rem;">${ot(h.class)}</span>
        <span style="color:#887755;font-size:0.75rem;">❤️${h.health}/${h.effectiveMax()} ⚔️${h.attack} 🛡️${h.defense} 🧠${h.mind}</span>
      </div>
      <div style="display:flex;gap:0.9rem;flex-wrap:wrap;">
        <div style="flex:1;min-width:190px;">${g}</div>
        <div style="flex:1;min-width:190px;">
          <div style="${ps}margin-bottom:0.25rem;">Who they are</div>
          <textarea class="outfit-story" data-uid="${ot(h.uid)}" rows="3" maxlength="400"
            placeholder="${ot(h.trait||"Write their history, or leave it to the dungeon.")}"
            style="width:100%;background:#0f0d09;color:#c8b88a;border:1px solid #3a2f1e;border-radius:4px;padding:0.35rem;font-family:inherit;font-size:0.76rem;resize:vertical;">${ot(h.backstory)}</textarea>
        </div>
      </div>`,i.appendChild(u)}const l=document.createElement("div");l.style.cssText=`${ur}margin-bottom:0.7rem;`;const c=a.map(h=>`<option value="${ot(h.name)}">${ot(h.icon)} ${ot(h.name)}</option>`).join("");l.innerHTML=`
    <div style="${ps}margin-bottom:0.4rem;">🎒 In the pack — nobody is carrying these</div>
    ${e.pack.length===0?`<div style="color:#4a443a;font-size:0.8rem;">Nothing. Every piece is in somebody's hands.</div>`:e.pack.map(h=>`
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
          <span style="flex:1;color:#e8d9b3;">${ot(h.icon||"")} ${ot(h.name)}
            <span style="color:#887755;">· ${ot(h.slot||"trinket")}</span></span>
          <select class="outfit-give" data-card="${ot(h.id)}"
            style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
            <option value="">give to…</option>${c}
          </select>
        </div>`).join("")}`,i.appendChild(l);const d=document.createElement("div");if(d.style.cssText=`${ur}margin-bottom:0.7rem;`,d.innerHTML=`
    <div style="${ps}margin-bottom:0.4rem;">📖 The grimoire — a working is only as good as the mind that prepared it</div>
    ${e.grimoire.length===0?'<div style="color:#4a443a;font-size:0.8rem;">No workings drafted.</div>':e.grimoire.map(h=>{const u=e.casterOf(h),p=h.power+Math.floor(e.mindFor(h)/2);return`
          <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
            <span style="flex:1;color:#e8d9b3;">${ot(h.icon||"")} ${ot(h.name)}
              <span style="color:#887755;">· power ${p}</span></span>
            <select class="outfit-caster" data-spell="${ot(h.id)}"
              style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
              <option value="">whoever is sharpest</option>
              ${a.map(g=>`<option value="${ot(g.name)}"${u&&u.uid===g.uid?" selected":""}>${ot(g.icon)} ${ot(g.name)} (🧠${g.mind})</option>`).join("")}
            </select>
          </div>`}).join("")}`,i.appendChild(d),e.tactics.length>0){const h=document.createElement("div");h.style.cssText=`${ur}margin-bottom:0.7rem;`,h.innerHTML=`
      <div style="${ps}margin-bottom:0.4rem;">🎓 Drills — trained together, carried by everyone</div>
      <div style="font-size:0.8rem;color:#e8d9b3;">
        ${e.tactics.map(u=>{var p;return`${ot(((p=Rs(u.id))==null?void 0:p.icon)||"")} ${ot(u.name)}`}).join(" · ")}
      </div>`,i.appendChild(h)}if(i.querySelectorAll(".outfit-off").forEach(h=>{h.addEventListener("click",()=>{e.unequip(h.dataset.card),r()})}),i.querySelectorAll(".outfit-give").forEach(h=>{h.addEventListener("change",()=>{h.value&&(e.equipTo(h.dataset.card,h.value),r())})}),i.querySelectorAll(".outfit-caster").forEach(h=>{h.addEventListener("change",()=>{e.assignCaster(h.dataset.spell,h.value||null),r()})}),i.querySelectorAll(".outfit-name").forEach(h=>{h.addEventListener("change",()=>{const u=e.members.find(p=>p.uid===h.dataset.uid);u&&e.renameMember(u,h.value),r()})}),i.querySelectorAll(".outfit-story").forEach(h=>{h.addEventListener("change",()=>{const u=e.members.find(p=>p.uid===h.dataset.uid);u&&u.setBackstory(h.value),t()})}),n){const h=document.createElement("button");h.id="outfit-done-btn",h.textContent=s,h.style.cssText="width:100%;margin-top:0.5rem;padding:0.9rem;font-size:1rem;",h.addEventListener("click",n),i.appendChild(h)}}const fd={"rat-swarm":{trait:"swarm",weak:["fire"]},gelatinous:{trait:"armored",weak:["frost"],resist:["shock"]},wraith:{trait:"ethereal"},"ogre-king":{trait:"armored"},"dragon-whelp":{resist:["fire"],weak:["frost"]},"bone-warden":{trait:"armored"},"grave-mites":{trait:"swarm",weak:["fire"]},"barrow-shade":{trait:"ethereal"},"hungry-ghoul":{trait:"venomous"},"shrouded-king":{trait:"armored"},"abbot-of-worms":{trait:"venomous"},salamander:{resist:["fire"],weak:["frost"]},"cinder-bats":{trait:"swarm",resist:["fire"],weak:["frost"]},"magma-toad":{resist:["fire"],weak:["frost"]},"obsidian-golem":{trait:"armored",resist:["shock"]},"cinder-wyrm":{resist:["fire"],weak:["frost"]},"forge-tyrant":{trait:"armored",resist:["fire"]},"flying-tomes":{trait:"swarm",weak:["fire"]},"ink-elemental":{weak:["fire"],resist:["shock"]},"spectral-scribe":{trait:"ethereal"},"index-wight":{weak:["fire"]},archivist:{trait:"ethereal"},"grand-errata":{trait:"armored",weak:["fire"]},"sludge-elemental":{trait:"venomous",resist:["shock"]},"potion-rats":{trait:"swarm"},"mutant-vine":{trait:"armored",weak:["fire"]},"mad-alchemist":{trait:"venomous"},"the-precipitate":{trait:"armored",resist:["fire","frost"]},"bat-cloud":{trait:"swarm"},"pale-hound":{trait:"venomous"},"crimson-mist":{trait:"ethereal"},"vampire-lord":{trait:"ethereal"},"the-bride":{trait:"ethereal"},"jar-imp":{trait:"swarm",resist:["fire"]},"pickled-thing":{trait:"venomous"},"root-golem":{trait:"armored",weak:["fire"]},"bog-toad":{trait:"venomous"},"the-cauldron":{trait:"armored",resist:["fire"]},"frost-wisp":{trait:"ethereal",resist:["frost"],weak:["fire"]},"ice-crawler":{trait:"swarm",weak:["fire"]},"thawed-dead":{trait:"venomous"},"cinder-imp":{resist:["fire"],weak:["frost"]},"mad-pyromancer":{resist:["fire"],weak:["frost"]},"glacier-heart":{trait:"armored",resist:["frost"],weak:["fire"]}};function o0(i){Object.assign(fd,i)}function ko(i){const e=fd[i.kind];return e?{...i,...e}:i}function ws(i,e){const t=i==null?void 0:i.element;return t?t==="holy"&&e.undead||(e.weak||[]).includes(t)?1.5:(e.resist||[]).includes(t)?.5:1:1}const ie={ENTRANCE:"entrance",CORRIDOR:"corridor",MONSTER:"monster",TRAP:"trap",TREASURE:"treasure",LIBRARY:"library",SHRINE:"shrine",LAB:"lab",MATERIALS:"materials",DISASTER:"disaster",BOSS:"boss",VAULT:"vault",STAIRS:"stairs",SITUATION:"situation"},Ra={min:3,max:4},l0=3,Dc={crypt:{id:"crypt",door:"a barred grille, its bar on the far side",keyName:"the sexton's key",name:"the burial wing",tell:"burial niches, most of them open",body:["monster","trap","shrine"],payoff:"treasure"},works:{id:"works",door:"a workshop door with a lock cast into it",keyName:"a brass workshop key",name:"the workshop wing",tell:"cold furnaces and racked glassware",body:["materials","lab","trap"],payoff:"materials"},archive:{id:"archive",door:"a reading-room door, locked since the last audit",keyName:"the archivist's key",name:"the archive wing",tell:"shelving stacked to the ceiling, half of it collapsed",body:["library","trap","monster"],payoff:"library"},barracks:{id:"barracks",door:"a guardroom door with a drop-bar",keyName:"the watch-captain's key",name:"the barracks wing",tell:"bunkrooms and a picked-over weapon rack",body:["monster","monster","corridor"],payoff:"treasure"},sump:{id:"sump",door:"a sluice gate, wound shut",keyName:"a sluice crank",name:"the flooded wing",tell:"a floor that slopes down into standing water",body:["disaster","monster","trap"],payoff:"treasure"}},kr={entrance:[{shape:"chamber",min:[7,7],max:[9,9]},{shape:"hall",min:[10,6],max:[12,6]}],corridor:[{shape:"passage",min:[7,2],max:[12,3]},{shape:"hall",min:[9,4],max:[12,5]}],monster:[{shape:"chamber",min:[8,8],max:[11,11]},{shape:"cavern",min:[11,8],max:[15,12]},{shape:"hall",min:[12,6],max:[16,8]}],trap:[{shape:"passage",min:[8,3],max:[12,4]},{shape:"chamber",min:[8,6],max:[10,8]}],treasure:[{shape:"cell",min:[5,5],max:[7,7]},{shape:"chamber",min:[8,7],max:[10,9]}],library:[{shape:"hall",min:[12,7],max:[16,8]},{shape:"chamber",min:[9,9],max:[12,12]}],shrine:[{shape:"rotunda",min:[9,9],max:[12,12]},{shape:"chamber",min:[8,8],max:[10,10]}],lab:[{shape:"chamber",min:[9,8],max:[12,10]},{shape:"hall",min:[12,6],max:[14,7]}],materials:[{shape:"cavern",min:[9,8],max:[13,10]},{shape:"cell",min:[6,5],max:[7,7]}],disaster:[{shape:"cavern",min:[12,9],max:[16,13]},{shape:"hall",min:[13,6],max:[16,8]}],boss:[{shape:"cavern",min:[17,14],max:[22,17]},{shape:"hall",min:[20,12],max:[24,14]}],vault:[{shape:"cell",min:[6,6],max:[8,8]}],stairs:[{shape:"cell",min:[6,6],max:[8,8]},{shape:"rotunda",min:[7,7],max:[9,9]}],situation:[{shape:"chamber",min:[9,8],max:[12,11]},{shape:"rotunda",min:[9,9],max:[12,12]},{shape:"hall",min:[12,6],max:[15,8]}]};function c0(i,e){const t=kr[i]||kr.corridor,n=t[Math.floor(e.next()*t.length)];let s=n.min[0]+Math.floor(e.next()*(n.max[0]-n.min[0]+1)),r=n.min[1]+Math.floor(e.next()*(n.max[1]-n.min[1]+1));return e.next()<.5&&([s,r]=[r,s]),{w:s,h:r,shape:n.shape}}const pd={entrance:"🚪",corridor:"⬛",monster:"👹",trap:"⚠️",treasure:"💰",library:"📚",shrine:"🕯️",lab:"⚗️",materials:"🌿",disaster:"🌋",boss:"🐉",vault:"💎",stairs:"🪜",situation:"🪐"},Nc={easy:{monster:2,trap:1,treasure:2,library:1,shrine:1.5,lab:1,materials:2,disaster:.5,corridor:1,situation:3},medium:{monster:3,trap:1.5,treasure:2,library:1,shrine:1,lab:1,materials:1.5,disaster:1,corridor:1,situation:3},hard:{monster:4,trap:2.5,treasure:1.5,library:1,shrine:.7,lab:1,materials:1,disaster:2,corridor:.5,situation:2.6},nightmare:{monster:5,trap:3,treasure:1.5,library:.8,shrine:.5,lab:1,materials:1,disaster:3,corridor:.3,situation:2.2}};function h0(i,e){const t=Object.entries(e),n=t.reduce((r,[,o])=>r+o,0);let s=i.next()*n;for(const[r,o]of t)if(s-=o,s<=0)return r;return t[0][0]}class md{constructor(e,t,n=null,s={}){this.rooms=e,this.theme=t,this.condition=n,this.spine=s.spine||e.map((r,o)=>o),this.edges=s.edges||e.slice(1).map((r,o)=>({a:o,b:o+1,secret:!1,kind:"door"})),this.branches=s.branches||[],this.trapdoors=s.trapdoors||[]}getRoom(e){return this.rooms[e]||null}get length(){return this.rooms.length}branchAt(e){return this.branches.find(t=>t.junction===e&&!t.consumed)||null}trapdoorAt(e){return this.trapdoors.find(t=>t.from===e&&!t.consumed)||null}}function d0(i,e,t=2){return Math.abs(i.x-e.x)*2<i.w+e.w+t&&Math.abs(i.y-e.y)*2<i.h+e.h+t}const Uc=[[1,0],[-1,0],[0,1],[0,-1]];function Oc(i,e,t,n,s=null){const r=s?[s,...n.shuffle(Uc)]:n.shuffle(Uc),o=t.filter(a=>(a.floor||0)===(i.floor||0));for(const a of r)for(const l of[2,3,5]){const[c,d]=a;if(i.x=e.x+c*((e.w+i.w)/2+l),i.y=e.y+d*((e.h+i.h)/2+l),!o.some(h=>d0(i,h)))return a}return null}function u0(i,e,t){const n=i.map(l=>l.x),s=i.map(l=>l.y),r=Math.max(...n)-Math.min(...n),o=Math.max(...s)-Math.min(...s);return Math.abs(r-o)>8?r>o?[0,1]:[1,0]:t&&e.next()<.4?t:e.next()<.5?[1,0]:[0,1]}function gd(i,e="medium",t={}){var E,C;const n=new Ui(i),s=Math.max(1,t.depth||1),r=hi[t.theme]||n.pick(Object.values(hi)),o=typeof t.condition=="object"&&t.condition?t.condition:Tn(t.condition),a={...Nc[e]||Nc.medium};for(const[R,b]of Object.entries(r.weightTweaks))a[R]=Math.max(.1,(a[R]||0)+b);for(const[R,b]of Object.entries(o.weightTweaks||{}))a[R]=Math.max(.1,(a[R]||0)+b);if((C=(E=t.providence)==null?void 0:E.hasThemes)!=null&&C.call(E))for(const[R,b]of Object.entries(t.providence.weightTweaks(n.next())))a[R]=Math.max(.1,(a[R]||0)+b);const l=p0[e]||1,c=Math.min(l0,2+(s>=3?1:0)),d=R=>l*(1+R*.18),h=[];h.push(Pi(0,ie.ENTRANCE,n,r,s,l,o)),h[0].floor=0;for(let R=0;R<c;R++){const b=Ra.min+Math.floor(n.next()*(Ra.max-Ra.min+1));for(let y=0;y<b;y++){const T=h0(n,a),I=Pi(h.length,T,n,r,s,d(R),o);I.floor=R,h.push(I)}if(R<c-1){const y=Pi(h.length,ie.STAIRS,n,r,s,d(R),o);y.floor=R,y.descendsTo=R+1,h.push(y)}}fr(h,ie.LIBRARY,n,r,s,d,o,a,r.minLibraries||1),fr(h,ie.SHRINE,n,r,s,d,o,a),(t.wantLab||r.alwaysLab)&&(fr(h,ie.LAB,n,r,s,d,o,a),fr(h,ie.MATERIALS,n,r,s,d,o,a,1));const u=Pi(h.length,ie.BOSS,n,r,s,d(c-1),o);u.floor=c-1,h.push(u),h[0].x=0,h[0].y=0;const p=[h[0]];let g=[1,0];for(let R=1;R<h.length;R++){const b=h[R],y=h[R-1];if(b.floor!==y.floor){b.x=y.x,b.y=y.y,p.push(b),g=[1,0];continue}g=u0(p.filter(I=>I.floor===b.floor),n,g);const T=Oc(b,y,p,n,g);T&&(g=T),p.push(b)}const v=h.map((R,b)=>b),m=h.slice(1).map((R,b)=>({a:b,b:b+1,secret:!1,kind:h[b].floor!==h[b+1].floor?"stair":"door"})),f=[];for(const R of h)R.features=Ec(R,n,r);const x=1+Math.floor(n.next()*2),M=Object.keys(Dc);for(let R=0;R<x;R++){const b=1+Math.floor(n.next()*(v.length-2)),y=Dc[M[Math.floor(n.next()*M.length)]],T=n.next()<.5,I=2+Math.floor(n.next()*3),L=[];let B=h[b],X=b,G=null;const Z=h[b].floor||0;for(let z=0;z<I;z++){const ae=z===I-1?T?ie.VAULT:y.payoff:y.body[Math.floor(n.next()*y.body.length)],oe=Pi(h.length,ae,n,r,s,d(Z),o);oe.floor=Z;const ke=Oc(oe,B,p,n,G);if(!ke)break;G=ke,oe.secret=T,oe.discovered=!T,oe.wing=y.id,oe.features=Ec(oe,n,r),h.push(oe),p.push(oe),m.push({a:X,b:oe.index,secret:T&&z===0,kind:T&&z===0?"secret":"arch"}),L.push(oe.index),X=oe.index,B=oe}if(L.length>0){const se=!T&&b>2&&n.next()<.55;let ae=null;if(se&&n.next()<.6){const oe=v.slice(1,b).filter(ke=>h[ke].type!==ie.STAIRS);oe.length>0&&(ae=oe[Math.floor(n.next()*oe.length)],h[ae].key={wing:y.id,name:y.keyName})}f.push({junction:b,rooms:L,secret:T,consumed:!1,wing:y.id,name:y.name,tell:y.tell,locked:se,keyRoom:ae,keyName:y.keyName,door:y.door})}}const _=[],k=n.next()<.65?1:0;for(let R=0;R<k;R++){const b=v.length-1,y=1+Math.floor(n.next()*Math.max(1,Math.floor(b*.6))),T=h[y].floor||0,I=h.findIndex((B,X)=>X>y&&X<=b-1&&(B.floor||0)>T),L=I>y+1?I+Math.floor(n.next()*2):Math.min(y+2+Math.floor(n.next()*3),b-1);L<=y+1||L>b-1||(_.push({from:y,to:L,secret:n.next()<.5,fall:3+Math.floor(n.next()*3)+(s-1),consumed:!1}),m.push({a:y,b:L,secret:!1,kind:"trapdoor"}))}return new md(h,r,o,{spine:v,edges:m,branches:f,trapdoors:_})}const f0=new Set([ie.ENTRANCE,ie.BOSS,ie.STAIRS,ie.LIBRARY,ie.SHRINE,ie.LAB,ie.MATERIALS]);function fr(i,e,t,n,s,r,o,a,l=1){const c=i.filter(h=>h.type===e).length;let d=l-c;for(;d>0;){const h=i.filter(f=>!f0.has(f.type));if(h.length===0)break;let u=null,p=-1;for(const f of new Set(h.map(x=>x.type))){const x=h.filter(M=>M.type===f).length/Math.max(.1,(a==null?void 0:a[f])||.1);x>p&&(p=x,u=f)}const g=h.filter(f=>f.type===u),v=t.pick(g),m=Pi(v.index,e,t,n,s,r(v.floor||0),o);m.floor=v.floor,i[i.indexOf(v)]=m,d--}}function Pi(i,e,t,n,s=1,r=1,o={}){const a=c0(e,t),l={index:i,type:e,icon:pd[e]||"⬛",cleared:!1,w:a.w,h:a.h,shape:a.shape};if(e===ie.MONSTER&&(l.monster=Bc(t,!1,n,s,r,o)),e===ie.BOSS&&(l.monster=Bc(t,!0,n,s,r,o)),e===ie.TREASURE){const c=(20+Math.floor(t.next()*40))*(1+.2*(s-1));l.gold=Math.round(c*(o.goldMult||1)),l.mimicChance=.18}if(e===ie.VAULT){const c=(60+Math.floor(t.next()*120))*(1+.2*(s-1));l.gold=Math.round(c*(o.goldMult||1)),l.mimicChance=.28}if(e===ie.TRAP){l.trapDamage=4+Math.floor(t.next()*4)+(n.trapBonus||0)+(s-1)+(o.trapBonus||0);const c=n.trapTypes||["spike"];l.trapType=c[Math.floor(t.next()*c.length)]}return e===ie.MATERIALS&&(l.materials=1+Math.floor(t.next()*2)),e===ie.SITUATION&&(l.encounterId=Fc[Math.floor(t.next()*Fc.length)]),l}const Fc=["astronomers-chamber","sealed-laboratory","monster-grievance"],hi={delve:{id:"delve",name:"the Old Delve",icon:"⛏️",tagline:"A classic hole in the ground, wronged by generations of management.",weightTweaks:{},trapTypes:["spike","alarm"],monsters:[{kind:"rat-swarm",name:"a chittering rat swarm",icon:"🐀",attack:4,health:10,undead:!1},{kind:"skeleton",name:"a rattling skeleton patrol",icon:"💀",attack:6,health:14,undead:!0},{kind:"goblin-gang",name:"a goblin toll-gang",icon:"👺",attack:5,health:12,undead:!1,bribable:!0},{kind:"gelatinous",name:"a gelatinous horror",icon:"🟩",attack:5,health:18,undead:!1,slow:!0},{kind:"wraith",name:"a cold-eyed wraith",icon:"👻",attack:8,health:12,undead:!0}],bosses:[{kind:"dragon-whelp",name:"the Dragon Whelp of the Deep Vault",icon:"🐉",attack:12,health:34,undead:!1},{kind:"ogre-king",name:"the Ogre King Under the Stair",icon:"👹",attack:14,health:38,undead:!1,bribable:!0}]},crypt:{id:"crypt",name:"the Ancient Crypt",icon:"⚰️",tagline:"The dead were buried with their grudges. Both kept.",weightTweaks:{monster:1,shrine:.5,treasure:-.5},trapTypes:["spike","poison"],monsters:[{kind:"bone-warden",name:"a bone warden on its rounds",icon:"💀",attack:6,health:15,undead:!0},{kind:"grave-mites",name:"a boil of grave mites",icon:"🪲",attack:4,health:9,undead:!1},{kind:"barrow-shade",name:"a barrow shade, thin as smoke",icon:"👻",attack:8,health:11,undead:!0},{kind:"hungry-ghoul",name:"a ghoul between meals",icon:"🧟",attack:7,health:13,undead:!0}],bosses:[{kind:"shrouded-king",name:"the Shrouded King in his broken throne-niche",icon:"👑",attack:12,health:32,undead:!0},{kind:"abbot-of-worms",name:"the Abbot of Worms, still preaching",icon:"☠️",attack:10,health:36,undead:!0}]},volcanic:{id:"volcanic",name:"the Cinder Galleries",icon:"🌋",tagline:"The mountain is not dormant. The mountain is patient.",weightTweaks:{disaster:1,trap:.5,shrine:-.3},trapBonus:2,trapTypes:["fire","spike"],monsters:[{kind:"salamander",name:"a salamander the size of a mistake",icon:"🦎",attack:7,health:14,undead:!1},{kind:"cinder-bats",name:"a shriek of cinder bats",icon:"🦇",attack:5,health:9,undead:!1},{kind:"magma-toad",name:"a magma toad, gently steaming",icon:"🐸",attack:6,health:16,undead:!1,slow:!0},{kind:"obsidian-golem",name:"an obsidian golem with a slow fuse",icon:"🗿",attack:8,health:20,undead:!1,slow:!0}],bosses:[{kind:"cinder-wyrm",name:"the Cinder Wyrm coiled in its forge-nest",icon:"🐉",attack:13,health:36,undead:!1},{kind:"forge-tyrant",name:"the Forge Tyrant, hammer still warm",icon:"🔨",attack:14,health:34,undead:!1,bribable:!0}]},library:{id:"library",name:"the Drowned Athenaeum",icon:"📚",tagline:"Knowledge wants to be free. It has been waiting a long time.",weightTweaks:{library:2,monster:-.5,materials:-.5},minLibraries:2,trapTypes:["alarm","spike"],monsters:[{kind:"flying-tomes",name:"a wheeling flock of flying tomes",icon:"📖",attack:5,health:10,undead:!1},{kind:"ink-elemental",name:"an ink elemental, still wet",icon:"🫧",attack:6,health:13,undead:!1},{kind:"spectral-scribe",name:"a spectral scribe mid-citation",icon:"👻",attack:7,health:12,undead:!0},{kind:"index-wight",name:"the wight of a disappointed librarian",icon:"🧟",attack:8,health:14,undead:!0}],bosses:[{kind:"archivist",name:"the Archivist, quill dripping",icon:"🪶",attack:11,health:33,undead:!0},{kind:"grand-errata",name:"the Grand Errata, a book that reads back",icon:"📕",attack:12,health:35,undead:!1}]},madlab:{id:"madlab",name:"the Mad Alchemist's Dungeon",icon:"⚗️",tagline:"The experiments continued after the funding stopped. And after the alchemist did.",weightTweaks:{lab:1.5,materials:1,disaster:.5,shrine:-.5},alwaysLab:!0,trapTypes:["poison","fire"],monsters:[{kind:"sludge-elemental",name:"a sludge elemental, recently fed",icon:"🟢",attack:6,health:15,undead:!1},{kind:"potion-rats",name:"a scurry of potion-glowing rats",icon:"🐀",attack:5,health:10,undead:!1},{kind:"mutant-vine",name:"a vine that learned grasping from a textbook",icon:"🌿",attack:6,health:14,undead:!1,slow:!0},{kind:"failed-homunculus",name:"a homunculus that failed peer review",icon:"🧪",attack:7,health:12,undead:!1,bribable:!0}],bosses:[{kind:"mad-alchemist",name:"the Mad Alchemist, flask raised in welcome",icon:"⚗️",attack:12,health:34,undead:!1},{kind:"the-precipitate",name:"the Precipitate, everything the drains refused",icon:"🫠",attack:13,health:37,undead:!1}]},castle:{id:"castle",name:"the Castle of the Vampire Lord",icon:"🦇",tagline:"The invitation was in your dreams. The exit clause was not.",weightTweaks:{treasure:1.5,library:.5,monster:.5,shrine:-.7,materials:-.5,corridor:-.3},minLibraries:1,trapTypes:["alarm","spike"],monsters:[{kind:"castle-thrall",name:"a thrall footman, polite and bloodless",icon:"🧟",attack:6,health:13,undead:!0,bribable:!0},{kind:"bat-cloud",name:"a chittering cloud of castle bats",icon:"🦇",attack:4,health:9,undead:!1},{kind:"pale-hound",name:"a pale hound with a red velvet collar",icon:"🐺",attack:7,health:12,undead:!0},{kind:"crimson-mist",name:"a crimson mist that pours under the door",icon:"🌫️",attack:8,health:11,undead:!0}],bosses:[{kind:"vampire-lord",name:"the Vampire Lord, apologizing for the hour",icon:"🧛",attack:13,health:35,undead:!0},{kind:"the-bride",name:"the Bride, who was here long before the Lord",icon:"👰",attack:12,health:33,undead:!0}]},bogcellar:{id:"bogcellar",name:"the Root Cellar of the Bog Witch",icon:"🧹",tagline:"Everything down here is pickled, potted, or patient. Some of it is all three.",weightTweaks:{materials:1.5,lab:1,trap:.5,treasure:-.5,corridor:-.3},alwaysLab:!0,trapBonus:1,trapTypes:["poison","spike"],monsters:[{kind:"jar-imp",name:"an imp still angry about the jar",icon:"🫙",attack:5,health:10,undead:!1,bribable:!0},{kind:"pickled-thing",name:"a pickled thing that finished pickling",icon:"🥒",attack:6,health:14,undead:!0},{kind:"root-golem",name:"a golem of taproots and bad intentions",icon:"🌳",attack:7,health:18,undead:!1,slow:!0},{kind:"bog-toad",name:"a bog toad the size of a smokehouse",icon:"🐸",attack:6,health:16,undead:!1,slow:!0}],bosses:[{kind:"bog-witch",name:"the Bog Witch, delighted to have company for dinner",icon:"🧙‍♀️",attack:12,health:34,undead:!1,bribable:!0},{kind:"the-cauldron",name:"the Cauldron, which learned to want",icon:"🍲",attack:13,health:36,undead:!1}]},icecaverns:{id:"icecaverns",name:"the Ice Caverns of the Mad Pyromancer",icon:"🧊",tagline:"He moved here so the fires couldn't spread. The fires found other ambitions.",weightTweaks:{disaster:1.5,trap:1,shrine:-.5,library:-.3},trapBonus:2,trapTypes:["fire","spike"],monsters:[{kind:"frost-wisp",name:"a frost wisp singed around the edges",icon:"❄️",attack:5,health:9,undead:!1},{kind:"ice-crawler",name:"an ice crawler with too many pick-shaped legs",icon:"🕷️",attack:6,health:13,undead:!1},{kind:"thawed-dead",name:"one of the thawed dead, steaming gently",icon:"🧟",attack:7,health:14,undead:!0},{kind:"cinder-imp",name:"a cinder imp wearing a snowball like armor",icon:"🔥",attack:6,health:11,undead:!1}],bosses:[{kind:"mad-pyromancer",name:"the Mad Pyromancer, delighted someone flammable came",icon:"🧙",attack:14,health:32,undead:!1},{kind:"glacier-heart",name:"the Glacier's Heart, half-melted and wholly furious",icon:"💠",attack:12,health:38,undead:!1,slow:!0}]}},p0={easy:.9,medium:1.19,hard:1.44,nightmare:1.83};function m0(i){var e;return{themeId:i.theme.id,conditionId:((e=i.condition)==null?void 0:e.id)||"none",rooms:i.rooms.map(t=>{var n;return{index:t.index,type:t.type,x:t.x,y:t.y,w:t.w,h:t.h,shape:t.shape,...(n=t.features)!=null&&n.length?{features:[...t.features]}:{},floor:t.floor||0,...t.descendsTo!==void 0?{descendsTo:t.descendsTo}:{},...t.wing?{wing:t.wing}:{},...t.key?{key:{...t.key}}:{},secret:!!t.secret,...t.monster?{monster:{...t.monster}}:{},...t.gold!==void 0?{gold:t.gold}:{},...t.mimicChance!==void 0?{mimicChance:t.mimicChance}:{},...t.trapDamage!==void 0?{trapDamage:t.trapDamage}:{},...t.trapType!==void 0?{trapType:t.trapType}:{},...t.materials!==void 0?{materials:t.materials}:{},...t.encounterId?{encounterId:t.encounterId}:{}}}),spine:[...i.spine],edges:i.edges.map(t=>({...t})),branches:i.branches.map(t=>({...t,rooms:[...t.rooms],consumed:!1})),trapdoors:i.trapdoors.map(t=>({...t,consumed:!1}))}}function g0(i){const e=hi[i.themeId]||hi.delve,t=Tn(i.conditionId),n=i.rooms.map(s=>({...s,icon:pd[s.type]||"⬛",cleared:!1,discovered:!s.secret,...s.w?{}:vd(s.type),features:[...s.features||[]],...s.monster?{monster:{...s.monster}}:{}}));return new md(n,e,t,{spine:[...i.spine],edges:i.edges.map(s=>({...s,kind:s.kind||(s.secret?"secret":"door")})),branches:i.branches.map(s=>({...s,rooms:[...s.rooms],consumed:!1})),trapdoors:(i.trapdoors||[]).map(s=>({...s,consumed:!1}))})}function vd(i){const e=(kr[i]||kr.corridor)[0];return{w:e.min[0],h:e.min[1],shape:e.shape}}function v0(i,e,t=!1){const n=vd(i);return i===ie.MONSTER?{...n,monster:ko({...e.monsters[0]})}:i===ie.BOSS?{...n,monster:ko({...e.bosses[0],isBoss:!0})}:i===ie.TREASURE?{...n,gold:35,mimicChance:.18}:i===ie.VAULT?{...n,gold:100,mimicChance:.28}:i===ie.TRAP?{...n,trapDamage:5,trapType:(e.trapTypes||["spike"])[0]}:i===ie.MATERIALS?{...n,materials:2}:n}function y0(i){var e,t;if(!(i!=null&&i.id)||!((e=i.monsters)!=null&&e.length)||!((t=i.bosses)!=null&&t.length))throw new Error("a theme needs an id, monsters, and at least one boss");return hi[i.id]=i,i}function Bc(i,e,t,n=1,s=1,r={}){const o=e?t.bosses:t.monsters,a=ko({...i.pick(o)}),l=(e?r.bossAttackMult:r.monsterAttackMult)||1,c=(e?r.bossHealthMult:r.monsterHealthMult)||1,d=1+.15*(n-1);return a.attack=Math.max(1,Math.round(a.attack*d*s*l)),a.health=Math.max(1,Math.round(a.health*(1+.2*(n-1))*s*c)),e&&(a.isBoss=!0),a}const Lr=1,it={BEAT:"beat",NOTABLE:"notable",LEDGER:"ledger"};function zc(i){var t,n;const e=i.party;return{gold:e.gold,score:e.score,materials:e.materials,potions:e.potions.length,supply:e.supply,trophies:e.trophies.length,spellsLearned:e.spellsLearned,grimoire:e.grimoire.length,poison:e.poisonLinger||0,alarmed:e.alarmed?1:0,desecrated:e.desecrated?1:0,living:e.living().length,reserve:e.reserve.length,health:e.members.reduce((s,r)=>s+Math.max(0,r.health),0),wounds:e.members.reduce((s,r)=>s+r.wounds,0),equipment:e.members.reduce((s,r)=>s+r.equipment.length,0),weaponMods:e.members.reduce((s,r)=>s+r.weaponMods.length,0),keys:e.keys.length,roomsCleared:i.roomsCleared,floor:((n=(t=i.dungeon)==null?void 0:t.rooms[i.path[Math.min(i.roomIndex,i.path.length-1)]])==null?void 0:n.floor)||0}}const _0={gold:{icon:"💰",label:"gold",salience:it.NOTABLE,threshold:25,up:i=>`The purse is ${i} heavier.`,down:i=>`${i} gold leaves the purse.`},score:{icon:"🏅",label:"renown",salience:it.LEDGER,up:i=>`${i} renown earned.`,down:i=>`${i} renown lost.`},materials:{icon:"🌿",label:"materials",salience:it.NOTABLE,threshold:3,up:i=>`${i} more alchemical materials in the satchel.`,down:i=>`${i} materials spent at the bench.`},potions:{icon:"🧪",label:"potions",salience:it.BEAT,up:i=>`${i} more draught${i>1?"s":""} corked and stowed.`,down:i=>`${i} draught${i>1?"s are":" is"} drunk.`},supply:{icon:"🕯️",label:"oil",salience:it.LEDGER,up:i=>`${i} more march${i>1?"es":""} of oil found.`,down:i=>`${i} march${i>1?"es":""} of oil burned.`},trophies:{icon:"🏆",label:"trophies",salience:it.BEAT,up:i=>`${i} trophy${i>1?" more taken":" taken"} from the dead.`,down:i=>`${i} trophies lost.`},spellsLearned:{icon:"📖",label:"workings learned",salience:it.BEAT,up:i=>`${i} new working${i>1?"s":""} copied into the grimoire.`,down:i=>`${i} working${i>1?"s":""} lost from memory.`},grimoire:{icon:"📜",label:"grimoire",salience:it.LEDGER,up:i=>`The grimoire grows by ${i}.`,down:i=>`${i} scroll${i>1?"s burn":" burns"} away on use.`},poison:{icon:"🐍",label:"venom",salience:it.BEAT,up:i=>`Venom works in the blood: ${i} damage waiting on the march.`,down:i=>"The venom is spent."},alarmed:{icon:"🔔",label:"the alarm",salience:it.BEAT,up:()=>"An alarm is ringing somewhere below. Whatever comes next knows.",down:()=>"The alarm has stopped mattering; the thing it warned has been met."},desecrated:{icon:"⛧",label:"desecration",salience:it.BEAT,up:()=>"The party has taken something the dungeon considers its own. It will remember.",down:()=>"The debt is settled."},living:{icon:"☠️",label:"the living",salience:it.BEAT,up:i=>`${i} more stand${i>1?"":"s"} with the party.`,down:i=>`${i} of the party ${i>1?"are":"is"} down.`},reserve:{icon:"🎭",label:"the reserve",salience:it.NOTABLE,threshold:1,up:i=>`${i} more wait${i>1?"":"s"} in town.`,down:i=>`${i} called up from the reserve.`},health:{icon:"❤️",label:"health",salience:it.NOTABLE,threshold:6,up:i=>`${i} health mended.`,down:i=>`${i} health taken.`},wounds:{icon:"✚",label:"wounds",salience:it.BEAT,up:i=>`${i} wound${i>1?"s":""} that will not close down here.`,down:i=>`${i} wound${i>1?"s":""} closed.`},equipment:{icon:"🎒",label:"kit",salience:it.NOTABLE,threshold:1,up:i=>`${i} piece${i>1?"s":""} of kit taken up.`,down:i=>`${i} piece${i>1?"s":""} of kit lost.`},weaponMods:{icon:"⚗️",label:"weapon coatings",salience:it.NOTABLE,threshold:1,up:i=>`${i} blade${i>1?"s":""} coated at the bench.`,down:i=>`${i} coating${i>1?"s wear":" wears"} off.`},keys:{icon:"🗝️",label:"keys",salience:it.NOTABLE,up:i=>`${i===1?"A key":`${i} keys`} taken up. Somewhere below there is a door for it.`,down:i=>`${i===1?"A key":`${i} keys`} gone from the ring.`},floor:{icon:"🪜",label:"floor",salience:it.BEAT,up:i=>`The party descends ${i===1?"a floor":`${i} floors`}: everything below hits harder.`,down:i=>`The party climbs back up ${i===1?"a floor":`${i} floors`}.`},roomsCleared:{icon:"🚪",label:"rooms cleared",salience:it.LEDGER,up:i=>`${i} more room${i>1?"s":""} behind them.`,down:i=>`${i} room${i>1?"s":""} uncleared.`}};function x0(i,e,t={}){const n=[];for(const s of Object.keys(e)){const r=i[s]??0,o=e[s];if(r===o)continue;const a=o-r,l=_0[s],c=Math.abs(a);let d,h=it.LEDGER,u="•";l?(u=l.icon,d=a>0?l.up(c):l.down(c),h=l.salience,h===it.NOTABLE&&l.threshold&&c<l.threshold&&(h=it.LEDGER)):d=`${s} ${a>0?"rose":"fell"} by ${c}.`,n.push({turn:t.turn??0,room:t.room??null,field:s,from:r,to:o,delta:a,icon:u,text:d,salience:h,described:!!l})}return n}class Yi{constructor(e="the party"){this.version=Lr,this.partyName=e,this.delves=[],this.current=null}beginDelve({seed:e,difficulty:t,depth:n,theme:s,roster:r,condition:o}={}){return this.current={number:this.delves.length+1,seed:e??null,difficulty:t??null,depth:n??1,theme:s??null,condition:o??null,roster:r??[],rooms:[],events:[],outcome:null,startedAt:null},this.delves.push(this.current),this.current}recordRoom(e,t=[]){this.current||this.beginDelve(),this.current.rooms.push({turn:(e==null?void 0:e.turn)??this.current.rooms.length+1,room:(e==null?void 0:e.room)??null,icon:(e==null?void 0:e.icon)??null,action:(e==null?void 0:e.action)??null,predicament:(e==null?void 0:e.predicament)??null,deliberation:(e==null?void 0:e.deliberation)??null,resolution:(e==null?void 0:e.resolution)??null,aside:(e==null?void 0:e.aside)??null,falls:(e==null?void 0:e.falls)??[],wounds:(e==null?void 0:e.wounds)??[],events:t}),this.current.events.push(...t)}recordAside(e,t=it.BEAT){this.current||this.beginDelve(),this.current.events.push({turn:this.current.rooms.length,room:null,field:null,icon:"·",text:e,salience:t,described:!0})}endDelve(e){this.current&&(this.current.outcome=e)}allEvents(){return this.delves.flatMap(e=>e.events)}beats(e=this.current){return((e==null?void 0:e.events)||[]).filter(t=>t.salience===it.BEAT)}toJSON(){return{version:this.version,partyName:this.partyName,delves:this.delves}}static fromJSON(e){const t=new Yi((e==null?void 0:e.partyName)||"the party");return t.version=(e==null?void 0:e.version)??Lr,t.delves=Array.isArray(e==null?void 0:e.delves)?e.delves:[],t.current=t.delves[t.delves.length-1]||null,t}}const b0=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];function w0(i){return b0[i]||String(i)}function yd(i,{ledger:e=!1}={}){const t=[];if(t.push(`# The Chronicle of ${i.partyName}`,""),i.delves.length===0)return t.push("_Nothing has happened yet._"),t.join(`
`);for(const n of i.delves){t.push(`## Delve ${w0(n.number)}${n.theme?` — ${n.theme}`:""}`,"");const s=[n.difficulty&&`**Difficulty:** ${n.difficulty}`,n.depth&&`**Depth:** ${n.depth}`,n.condition&&`**Wager:** ${n.condition}`,n.seed&&`**Seed:** \`${n.seed}\``].filter(Boolean);s.length&&t.push(s.join(" · "),""),n.roster.length&&t.push("**Who went down:** "+n.roster.join(", "),"");for(const r of n.rooms){t.push(`### ${r.icon||""} Room ${r.turn}${r.room?` — ${r.room}`:""}`.trim(),"");for(const o of[r.predicament,r.deliberation,r.resolution])o&&t.push(o,"");r.aside&&t.push(`_${r.aside}_`,"");for(const o of r.wounds)t.push(`- ${o}`);for(const o of r.falls)t.push(`- ${o}`);if((r.wounds.length||r.falls.length)&&t.push(""),e&&r.events.length){t.push("<details><summary>Ledger</summary>","");for(const o of r.events)t.push(`- ${o.icon} ${o.text}`);t.push("","</details>","")}}if(n.outcome){t.push(`### ${n.outcome.victory?"🏆 The way out":"☠️ The end of it"}`,""),n.outcome.epitaph&&t.push(n.outcome.epitaph,"");const r=[`**Rooms cleared:** ${n.outcome.roomsCleared??0}`,`**Score:** ${n.outcome.score??0}`,`**Gold:** ${n.outcome.gold??0}`,`**Trophies:** ${n.outcome.trophies??0}`,`**Survivors:** ${n.outcome.survivors??0}`];t.push(r.join(" · "),"")}}return t.join(`
`)}const _d={"rat-swarm":{effect:"trinket",name:"the rat-king's knot",icon:"🐀",bonus:{mind:1},text:"Deep in the tangle: a knot of nine tails, braided by no human hand. Whoever pockets it starts noticing the exits."},skeleton:{effect:"trinket",name:"a femur of surprising balance",icon:"🦴",bonus:{attack:1},text:"One femur survives the collapse, weighted like it was made for swinging. Perhaps by now it was."},"goblin-gang":{effect:"gold",name:"the toll-purse",icon:"💰",gold:15,text:"The toll-purse, fat with every honest traveler's coin the gang ever squeezed. Repossessed."},gelatinous:{effect:"potion",name:"a jar of restorative ooze",icon:"🫙",potion:{kind:"restorative-ooze",heal:6},text:"The clear stuff from its middle, scooped and jarred. Wounds close under it; nobody watches while they do."},wraith:{effect:"trinket",name:"a grave-cold ribbon",icon:"🎗️",bonus:{defense:1},text:"Where it fell: a ribbon cold as the underside of a stone. Worn at the wrist, blades slide half an inch wide."},"dragon-whelp":{effect:"coating",name:"a vial of whelp-fire",icon:"🔥",mod:{name:"whelp-fire coating",attack:2,element:"fire"},text:"The fire-gland, drained into a vial with very steady hands. Painted on steel, it remembers what it was for."},"ogre-king":{effect:"trinket",name:"the Ogre King's smallest crown",icon:"👑",bonus:{defense:2},text:"The smallest of his stacked crowns fits a human head. It has stopped one axe already — the notch proves it."},"bone-warden":{effect:"trinket",name:"a pauldron of century bone",icon:"🦴",bonus:{defense:1},text:"Its shoulder-piece outlived the rest of it: bone gone hard as kiln brick, straps still good."},"grave-mites":{effect:"materials",name:"a handful of grave-amber",icon:"🟠",count:2,text:"The mites' castings, hardened to amber. Herbalists grind it into everything and apologize for nothing."},"barrow-shade":{effect:"scroll",name:"the shade's last words",icon:"📜",spell:{name:"Barrow Chill",icon:"❄️",school:"necromantic",power:4,use:"combat",element:"frost",text:"Copied from the air where a shade stopped being."},text:"As it thins away it leaves the words it was made from, hanging in the air just long enough to copy."},"hungry-ghoul":{effect:"coating",name:"a ghoul's paralytic gland",icon:"🐍",mod:{name:"ghoul-gland venom",attack:2,venom:!0},text:"The gland behind its jaw, excised carefully. What slowed its dinners will slow yours."},"shrouded-king":{effect:"trinket",name:"the Shroud itself",icon:"👻",bonus:{mind:2},text:"Folded, the Shroud is only cloth. Worn over the shoulders, it whispers everything dead courtiers noticed."},"abbot-of-worms":{effect:"scroll",name:"the Abbot's last sermon",icon:"📖",spell:{name:"Final Benediction",icon:"✨",school:"liturgical",power:5,use:"combat",element:"holy",text:"The closing lines of a sermon preached far too long."},text:"His sermon-book is worm-eaten to lace, but the closing benediction survives — and it burns to be said aloud."},salamander:{effect:"coating",name:"a salamander gland",icon:"🦎",mod:{name:"salamander-gland coating",attack:2,element:"fire"},text:"The heat-gland comes free whole, still warm. Brushed on a blade, it holds a slow orange smolder."},"cinder-bats":{effect:"materials",name:"a pouch of wing-ash",icon:"🦇",count:2,text:"Their wings burn down to a fine bright ash the alchemists call phoenix-meal. Two good pinches."},"magma-toad":{effect:"potion",name:"a tin of toad-balm",icon:"🧴",potion:{kind:"toad-balm",heal:8},text:"The cooling mud off its back, scraped into a tin. It sets warm on a wound and takes the pain with it."},"obsidian-golem":{effect:"trinket",name:"an obsidian heart-shard",icon:"🗿",bonus:{defense:1},text:"A shard off its heart, glass-black and heavier than it looks. Carried close, it takes the edge off a blow."},"cinder-wyrm":{effect:"coating",name:"wyrm-fire, bottled",icon:"🐉",mod:{name:"wyrm-fire coating",attack:3,element:"fire"},text:"What ran in its veins fills three fingers of a vial. It has not cooled. It is not going to."},"forge-tyrant":{effect:"trinket",name:"the Tyrant's hammer-head",icon:"🔨",bonus:{attack:2},text:"The haft burned away with its owner; the head is good metal with standing opinions about being swung."},"flying-tomes":{effect:"scroll",name:"a page that surrendered",icon:"📄",spell:{name:"Loose Page",icon:"📄",school:"found",power:3,use:"utility",text:"A complete working in a fair hand. Finders keepers."},text:"One page breaks formation and glides down: a working, complete, in a fair hand. Finders keepers."},"ink-elemental":{effect:"materials",name:"a flask of living ink",icon:"🫧",count:2,text:"It settles into the flask willingly, as if it had somewhere worse to be. Alchemists thin it into everything."},"spectral-scribe":{effect:"trinket",name:"the scribe's quill",icon:"🪶",bonus:{mind:1},text:"The quill outlasts the hand. It corrects the spelling in whatever pocket it rides in."},"index-wight":{effect:"trinket",name:"the master index card",icon:"🗂️",bonus:{mind:1},text:"Its filing card, still legible: a system for finding anything. Reading it reorganizes you, slightly."},archivist:{effect:"scroll",name:"the Restricted Folio",icon:"📕",spell:{name:"Restricted Working",icon:"📕",school:"forbidden",power:6,use:"combat",text:"Nobody was cleared to read this. The margins alone are a weapon."},text:"From under the Archivist's arm: the folio no one was ever cleared to read. The margins alone are a weapon."},"grand-errata":{effect:"trinket",name:"the dearest correction",icon:"📝",bonus:{mind:2},text:"The correction slip it guarded most jealously. Whoever carries it is right slightly more often. Measurably."},"sludge-elemental":{effect:"materials",name:"reclaimed reagents",icon:"🟢",count:2,text:"Half its body was unreacted reagent. Strained through a shirt: two measures, still potent, barely angry."},"potion-rats":{effect:"potion",name:"a rat-warmed elixir",icon:"🐀",potion:{kind:"rat-warmed-elixir",heal:6},text:"One rat glowed a steadier green than the rest. The vial it swallowed is intact, and it is a healing draught."},"mutant-vine":{effect:"materials",name:"clipped mutant cuttings",icon:"🌿",count:2,text:"Cuttings, taken with respect and long tongs. They keep trying to grow. Alchemists love that in an ingredient."},"failed-homunculus":{effect:"trinket",name:"the homunculus's notes",icon:"🧪",bonus:{mind:1},text:"It kept notes on its own failure, in tiny meticulous handwriting. Peer review would have been kinder."},"mad-alchemist":{effect:"potion",name:"the masterwork draught",icon:"⚗️",potion:{kind:"masterwork-draught",heal:12},text:"His belt holds one flask he never dared drink: the masterwork. It is exactly as good as he feared it was."},"the-precipitate":{effect:"materials",name:"a core of pure precipitate",icon:"🫠",count:4,text:"At its center, everything the drains refused had refined itself pure. Four measures, humming faintly."},"castle-thrall":{effect:"gold",name:"the footman's wages",icon:"🪙",gold:12,text:"His pockets hold a lifetime of unspent wages in old silver. Bloodless, but it spends."},"bat-cloud":{effect:"materials",name:"a sheaf of wing-leather",icon:"🦇",count:1,text:"Enough fine wing-leather to interest a bookbinder or an alchemist. The party happens to know one of those."},"pale-hound":{effect:"trinket",name:"the red velvet collar",icon:"🐺",bonus:{attack:1},text:"The velvet collar, worked with a name nobody can read. Wearing it lends the wearer the hound's certainty."},"crimson-mist":{effect:"potion",name:"a phial of settled red",icon:"🌫️",potion:{kind:"settled-red",heal:8},text:"What settles out of the mist is best not examined. In a phial it keeps, and it closes wounds like it owes them."},"vampire-lord":{effect:"trinket",name:"the Lord's signet",icon:"💍",bonus:{mind:2},text:"His signet ring, older than the castle around it. Doors of good breeding still answer to it."},"the-bride":{effect:"trinket",name:"the Bride's veil",icon:"👰",bonus:{defense:2},text:"The veil is older than the Lord and stronger than mail. It has been widowed before and expects to be again."},"jar-imp":{effect:"trinket",name:"the imp's jar",icon:"🫙",bonus:{mind:1},text:"The jar that held it, unbroken. Things put inside it stay put — including, faintly, luck."},"pickled-thing":{effect:"potion",name:"the pickling liquor",icon:"🥒",potion:{kind:"pickling-liquor",heal:6},text:"The brine that kept it lively for a century. One cup, taken nose-shut, mends whatever it touches on the way down."},"root-golem":{effect:"materials",name:"a length of heartroot",icon:"🌳",count:3,text:"The taproot at its core is heartroot — pound for pound the best base reagent the bog has ever grown."},"bog-toad":{effect:"coating",name:"bog-toad milk",icon:"🐸",mod:{name:"bog-toad milk",attack:2,venom:!0},text:"Milked in the traditional way, which nobody discusses. On a blade it makes shallow cuts decisive."},"bog-witch":{effect:"scroll",name:"the Witch's receipt-book",icon:"🍲",spell:{name:"the Witch's Receipt",icon:"🍲",school:"kitchen",power:5,use:"utility",text:"Most of her pages were soup. This one is not, and it works."},text:"Her receipt-book, dinner-stained. Most pages are soup. One page is not soup, and it works."},"the-cauldron":{effect:"potion",name:"a ladle of the last soup",icon:"🍲",potion:{kind:"last-soup",heal:12},text:"What the Cauldron wanted, it seems, was to be wanted. Its final simmer is a mending broth of genuine quality."},"frost-wisp":{effect:"coating",name:"a pinch of wisp-rime",icon:"❄️",mod:{name:"wisp-rime coating",attack:2,element:"frost"},text:"The rime it left behind never quite melts. Rubbed along an edge, the metal drinks the cold and keeps it."},"ice-crawler":{effect:"trinket",name:"pick-leg greaves",icon:"🕷️",bonus:{defense:1},text:"Two of its legs, lashed on as shin-guards. Ugly, chitinous, and better than what the front rank had."},"thawed-dead":{effect:"gold",name:"a frozen soldier's pay",icon:"🪙",gold:10,text:"His pay-purse thaws slower than he did. Old coin, honest weight, no further use to the previous owner."},"cinder-imp":{effect:"coating",name:"the imp's spark",icon:"🔥",mod:{name:"imp-spark coating",attack:2,element:"fire"},text:"The spark it wore like a heart goes into a tinderbox willingly. Painted thin, it makes steel argue hotter."},"mad-pyromancer":{effect:"scroll",name:"the Exile's Working",icon:"🔥",spell:{name:"the Exile's Working",icon:"🔥",school:"forbidden",power:6,use:"combat",element:"fire",text:"Exactly as illegal as advertised."},text:"The working that got him exiled, folded eight times against his chest. It is exactly as illegal as advertised."},"glacier-heart":{effect:"trinket",name:"a splinter of the Heart",icon:"💠",bonus:{defense:2},text:"A splinter of the Heart, already frosting the pocket it rides in. Blows land on the wearer like they had second thoughts."}},M0={swarm:{effect:"materials",name:"a residue of the swarm",icon:"🧫",count:1,text:"What {monster} leaves behind scrapes up into a measure of the residue alchemists are always asking about."},armored:{effect:"trinket",name:"a plate of scavenged armor",icon:"🛡️",bonus:{defense:1},text:"A plate off {monster} comes away intact, and the straps of the last owner's gear fit it well enough."},ethereal:{effect:"materials",name:"a wisp of ectoplasm",icon:"👻",count:1,text:"Where {monster} stopped being, something silver settles into the jar. The alchemists have a word for it and a price."},venomous:{effect:"coating",name:"a harvested venom sac",icon:"🐍",mod:{name:"harvested venom",attack:1,venom:!0},text:"The venom sac of {monster}, drawn whole. Its grudge outlives it, and now works for the party."},slow:{effect:"trinket",name:"a ponderous hide",icon:"🥾",bonus:{defense:1},text:"The hide of {monster} cuts into something between a cloak and a wall. Slower now, but so is everything hitting you."}},S0={effect:"trinket",name:"a trophy of the kill",icon:"🏆",bonus:{attack:1},text:"Cut from {monster}: a trophy with enough menace left in it to lend some. The chroniclers will want to sketch it."};function T0(i){Object.assign(_d,i)}function E0(i){return _d[i==null?void 0:i.kind]||M0[i==null?void 0:i.trait]||S0}let Ca=0;function xd(i){return Object.entries(i||{}).map(([e,t])=>`+${t} ${e}`).join(", ")}function Hc(i,e){const t=E0(e);Ca++;let n="";switch(t.effect){case"trinket":{const r=i.assignEquipment({id:`drop-${(e==null?void 0:e.kind)||"unknown"}-${Ca}`,type:"equipment",name:t.name,icon:t.icon,slot:"trinket",bonus:{...t.bonus},bestFor:null,text:t.text.replace("{monster}",(e==null?void 0:e.name)||"the fallen thing")});n=`a trinket (${xd(t.bonus)}), now worn by ${(r==null?void 0:r.name)||"no one"}`;break}case"coating":{const r=i.living().reduce((a,l)=>a.attack>=l.attack?a:l);r.addWeaponMod({...t.mod});const o=t.mod.element?`, ${t.mod.element}`:t.mod.venom?", venom":"";n=`a weapon coating (+${t.mod.attack} attack${o}), applied to ${r.name}'s weapon`;break}case"potion":i.potions.push({...t.potion}),n=`a potion (heals ${t.potion.heal}), added to the satchel`;break;case"materials":i.materials+=t.count,n=`${t.count} alchemy material${t.count===1?"":"s"}`;break;case"scroll":i.grimoire.push({...t.spell,id:`drop-${(e==null?void 0:e.kind)||"unknown"}-${Ca}`,source:"found"}),n=`a scroll of ${t.spell.name} (${t.spell.use}, power ${t.spell.power}), added to the grimoire`;break;case"gold":i.addGold(t.gold),n=`${t.gold} gold`;break}const s={name:t.name,icon:t.icon,effect:t.effect,from:(e==null?void 0:e.name)||"unknown"};return(i.trophies||(i.trophies=[])).push(s),{source:t.name,find:"drop",drop:s,text:`${t.icon} ${A0((e==null?void 0:e.name)||"the monster")} drops ${t.name}: ${n}.`}}function A0(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}const ms=i=>i&&i.charAt(0).toUpperCase()+i.slice(1),R0={pillars:"stone",rubble:"stone",boulder:"stone",sarcophagus:"stone",crates:"wood",shelves:"wood",brazier:"flame",font:"water",spout:"water",portcullis:"metal",anvil:"metal",mirror:"glass",pit:"void",chasm:"void",spikes:"metal"},C0={fire:{wood:{id:"blaze",icon:"🔥",burn:3,cover:-1,light:2,consumes:!0,text:i=>`The fire takes ${i} and does not stop at the monster. The room burns: 3 damage a round while it lasts, the cover burns away with it, and 2 marches of light to burn by.`},water:{id:"steam",icon:"♨️",cover:1,monsterAtk:-2,selfHarm:1,text:i=>`The working hits ${i} and the room fills with scalding steam. The monster is fighting half-blind: -2 to what it hits for, and the fog is cover — but nobody in a boiling room gets off clean, and the party takes 1.`},flame:{id:"flare",icon:"💥",damage:6,light:1,consumes:!0,text:i=>`${ms(i)} takes the working like a bellows and erupts: 6 damage, and the flare throws a march of light down the passage. It burns its fuel doing it — the bracket is cold afterwards.`},metal:{id:"searing",icon:"🌡️",damage:2,text:i=>`${ms(i)} glows and spits where the working lands: 2 damage to whatever is near it.`},void:{id:"updraft",icon:"🌋",damage:3,cover:-1,text:i=>`The fire finds ${i} and the shaft draws like a chimney: 3 damage in the updraft, and nothing to shelter behind while it roars.`}},shock:{water:{id:"conduction",icon:"⚡",damage:7,selfHarm:1,text:i=>`The water in ${i} carries the working across the whole floor: 7 damage — and the party is standing on the same floor, for 1 back.`},metal:{id:"arc",icon:"⚡",damage:4,text:i=>`The working finds ${i} and arcs off it into everything nearby: 4 extra damage.`},glass:{id:"shiver",icon:"🪞",damage:2,consumes:!0,text:i=>`${ms(i)} shivers, flashes and comes apart: 2 damage in flying silver.`},void:{id:"earthing",icon:"🕳️",monsterAtk:-2,selfHarm:1,text:i=>`The working earths itself down ${i}, and the whole floor jumps: the monster fights off-balance for 2 less, and everyone who felt it takes 1.`}},frost:{water:{id:"glaze",icon:"🧊",monsterAtk:-3,selfHarm:1,text:i=>`${ms(i)} freezes and the glaze spreads across the floor. The monster cannot keep its feet: -3 to what it hits for. Neither can the party, quite: 1 damage.`},flame:{id:"douse",icon:"💨",cover:1,light:-2,consumes:!0,text:i=>`The working puts ${i} out. Smoke to fight behind, and 2 marches of light gone with it.`},stone:{id:"brittle",icon:"❄️",damage:2,text:i=>`Frost gets into ${i} and cracks it apart: 2 damage in splinters of cold stone.`},void:{id:"rime-bridge",icon:"🧊",cover:2,selfHarm:1,text:i=>`Frost sheets across ${i} until it will bear weight — a bridge to fight from, and a bad place to slip: 2 cover, 1 damage.`}},holy:{stone:{id:"consecrate",icon:"🌟",damage:3,undeadQuelled:!0,text:i=>`The light soaks into ${i}. Whatever was going to rise out of it stays put, and the working bites for 3.`},glass:{id:"kindled-glass",icon:"🪞",revealEthereal:!0,damage:2,text:i=>`${ms(i)} catches the light and throws it everywhere at once: 2 damage, and nothing in the room can hide behind being half-there.`},water:{id:"blessing",icon:"⛲",heal:4,text:i=>`The working settles into ${i} and stays there. The party drinks: 4 healed.`}}};function k0(i){return!!i&&i.aoe===!0}function bd(i,e){if(!k0(i)||!i.element)return[];const t=C0[i.element];if(!t)return[];const n=[];for(const s of Hr(e)){const r=R0[s.id],o=t[r];o&&n.push({...o,feature:s.id,featureName:s.name,matter:r,element:i.element,text:o.text(s.name)})}return n}function L0(i){const e={damage:0,burn:0,cover:0,monsterAtk:0,light:0,selfHarm:0,heal:0,undeadQuelled:!1,revealEthereal:!1,consumed:[],notes:[]};for(const t of i)e.damage+=t.damage||0,e.burn+=t.burn||0,e.cover+=t.cover||0,e.monsterAtk+=t.monsterAtk||0,e.light+=t.light||0,e.selfHarm+=t.selfHarm||0,e.heal+=t.heal||0,t.undeadQuelled&&(e.undeadQuelled=!0),t.revealEthereal&&(e.revealEthereal=!0),t.consumes&&e.consumed.push(t.feature),e.notes.push({source:t.featureName,text:`${t.icon} ${t.text}`});return e}const pr=(i,e,t=0)=>{const n=(i==null?void 0:i.w)??6,s=(i==null?void 0:i.h)??6;return Math.min(n,s)>=e&&n*s>=t},ji={column:{id:"column",name:"Column",icon:"⏸️",fits:()=>!0,frontage:1,incomingMult:.55,attackMult:1,flanking:!1,areaShare:.8,tell:i=>`The ${i} is too tight to spread out: the party files up, one blade forward.`,effect:"One blade forward and one thing able to reach it: nearly half the damage a round, and only the front rank swinging."},line:{id:"line",name:"Line",icon:"➖",fits:i=>pr(i,4),frontage:2,incomingMult:1,attackMult:1,flanking:!0,areaShare:1,tell:()=>"The party spreads into a line, two forward and two behind.",effect:"The ordinary shape of a fight, and the one that leaves room to work round the sides."},shieldwall:{id:"shieldwall",name:"Shield Wall",icon:"🛡️",fits:i=>pr(i,4),frontage:2,incomingMult:.7,attackMult:.75,flanking:!1,areaShare:1.25,tell:()=>"Shields lock along the front rank and the party stops trying to win quickly.",effect:"A third less damage a round and a quarter less dealt — but packed tight, so anything with a blast radius hurts more."},wedge:{id:"wedge",name:"Wedge",icon:"🔺",fits:i=>pr(i,5,30),frontage:3,incomingMult:1.3,attackMult:1.2,flanking:!0,areaShare:1,tell:()=>"The party drives in as a wedge, everything committed forward.",effect:"A fifth more damage dealt, a third more taken, and three of them swinging instead of two."},loose:{id:"loose",name:"Loose Order",icon:"🌐",fits:i=>pr(i,6,48),frontage:2,incomingMult:.85,attackMult:.85,flanking:!1,areaShare:.5,tell:i=>`There is room enough in the ${i} to fight spread out, well apart.`,effect:"A little less given and a little less taken, and only half of any blast reaches the party."}},P0=Object.keys(ji);function I0(i){return P0.filter(e=>ji[e].fits(i))}function D0(i,e,t=Math.random){var d,h,u,p;if(!e||!e.w||!e.h)return"line";const n=I0(e),s={};for(const g of n)s[g]=1;const r=i.living().length>0&&i.members.reduce((g,v)=>g+Math.max(0,v.health),0)/i.members.reduce((g,v)=>g+v.maxHealth,0)<.4;n.length>1&&(s.column=r?2:.15);const o=e==null?void 0:e.monster,a=g=>{var v;return(v=i.tactics)==null?void 0:v.some(m=>m.id===g)};(o==null?void 0:o.trait)==="swarm"&&s.loose&&(s.loose+=3),o!=null&&o.isBoss&&s.shieldwall&&(s.shieldwall+=2),o&&o.attack>=12&&s.shieldwall&&(s.shieldwall+=2),o&&o.health<=12&&s.wedge&&(s.wedge+=2),(d=i.hasPersonality)!=null&&d.call(i,"brave")&&s.wedge&&(s.wedge+=2.5),(h=i.hasPersonality)!=null&&h.call(i,"reckless")&&s.wedge&&(s.wedge+=3),(u=i.hasPersonality)!=null&&u.call(i,"craven")&&s.shieldwall&&(s.shieldwall+=3),(p=i.hasPersonality)!=null&&p.call(i,"cunning")&&s.loose&&(s.loose+=2),a("tac-shieldwall")&&s.shieldwall&&(s.shieldwall+=2.5),a("tac-flanking")&&s.wedge&&(s.wedge+=2),a("tac-firewatch")&&s.loose&&(s.loose+=1.5),i.living().length<=2&&s.wedge&&(s.wedge*=.3);const l=Object.values(s).reduce((g,v)=>g+v,0);let c=t()*l;for(const[g,v]of Object.entries(s))if(c-=v,c<=0)return g;return n[n.length-1]||"line"}function N0(i,e){const t=ji[i]||ji.line;return{id:t.id,name:t.name,icon:t.icon,frontage:t.frontage,incomingMult:t.incomingMult,attackMult:t.attackMult,flanking:t.flanking,areaShare:t.areaShare,tell:t.tell((e==null?void 0:e.shape)||"room"),effect:t.effect}}const Pr=new Map,wd=new Map;function $r(i){if(!(i!=null&&i.id)||!Array.isArray(i.options))throw new Error("an encounter needs an id and options");return Pr.set(i.id,i),i.roomType&&wd.set(i.roomType,i),i}function wr(i){return Pr.get(i)||null}function nl(i){return i?i.encounterId&&Pr.has(i.encounterId)?Pr.get(i.encounterId):wd.get(i.type)||null:null}const U0={trap:["mechanism","hazard"],monster:["creature"],boss:["creature"],treasure:["valuables","container"],vault:["valuables","container"],library:["books","study"],shrine:["sacred"],lab:["apparatus","substances"],materials:["substances"],disaster:["hazard","unstable-environment"]};function O0(i,e=null){const t=new Set(U0[i==null?void 0:i.type]||[]);for(const n of(e==null?void 0:e.affordances)||[])t.add(n);try{for(const n of Hr(i)||[])for(const s of n.tags||[])t.add(s)}catch{}return i!=null&&i.monster&&(i.monster.undead&&t.add("undead"),i.monster.bribable&&t.add("people")),t}function Md(i,e,t){const n=e.capabilities(),s=O0(t,i),r=[],o=[];for(const a of i.options){const l=a.requires||[],c=l.filter(u=>!n.has(u)),d=(a.affordances||[]).filter(u=>!s.has(u)),h=a.when?!!a.when(e,t):!0;c.length===0&&d.length===0&&h?r.push({id:a.id,name:a.name,desc:a.desc,weight:a.weight,unlockedBy:l.map(u=>({capability:u,holders:e.capabilityHolders(u).map(p=>{var g;return p.source==="character"?p.member.name:`${p.member.name} (${((g=p.equipment)==null?void 0:g.name)||p.source})`})}))}):o.push({id:a.id,missingCaps:c,missingAffordances:d,conditionBlocked:!h})}return Td({kind:"evaluate",encounterId:i.id,roomType:(t==null?void 0:t.type)||null,capabilitiesPresent:[...n],affordances:[...s],available:r.map(a=>({id:a.id,unlockedBy:a.unlockedBy})),gatedOut:o}),r}function Sd(i,e,t,n){const s=i.resolveOption(e,t,n);return Td({kind:"resolve",encounterId:i.id,roomType:(n==null?void 0:n.type)||null,optionId:e,success:(s==null?void 0:s.success)!==!1}),s}const $c=400;let Fn=[];function Td(i){Fn.push({...i,at:Fn.length}),Fn.length>$c&&(Fn=Fn.slice(-$c))}function F0(){return Fn.slice()}function B0(){Fn=[]}function z0(){const i={},e=(n,s)=>{i[n]=i[n]||{optionsUnlocked:0,chosen:0},i[n][s]++},t=new Map;for(const n of Fn)if(n.kind==="evaluate")for(const s of n.available){const r=s.unlockedBy.map(o=>o.capability);r.length&&t.set(`${n.encounterId}:${s.id}`,r);for(const o of r)e(o,"optionsUnlocked")}else if(n.kind==="resolve")for(const s of t.get(`${n.encounterId}:${n.optionId}`)||[])e(s,"chosen");return i}$r({id:"astronomers-chamber",title:"The Astronomer's Chamber",situation:"A brass orrery fills the room, its planets moving incorrectly — and the walls have begun to turn with them.",affordances:["mechanism","astral","unstable-environment"],options:[{id:"repair-gears",name:"Repair the Gears",desc:"Still the mechanism and salvage what it sheds",requires:["tinkering"],affordances:["mechanism"],weight:1.5},{id:"correct-orrery",name:"Correct the Orrery",desc:"Set the planets right and read what they say",requires:["astronomy"],affordances:["astral"],weight:1.5},{id:"divine-instability",name:"Divine the Instability",desc:"Ask which motion is the dangerous one",requires:["divination"],affordances:["astral"],weight:1},{id:"recognize-model",name:"Recognize the Model",desc:"Name the cosmology; note it for the record",requires:["knowledge"],affordances:["mechanism","astral"],weight:1},{id:"steady-ground",name:"Hold the Stationary Floor",desc:"Put the party on the part that is not turning",requires:["tactics"],weight:1},{id:"hurry-through",name:"Hurry Through",desc:"Run the turning floor and hope"}],resolveOption(i,e,t){switch(t.cleared=!0,i){case"repair-gears":return e.materials+=1,e.addScore(20),{success:!0,narrative:"🔧 The gears are coaxed still and the walls stop. A stripped bronze pinion goes into the satchel: +1 material, +20 score."};case"correct-orrery":return e.addScore(20),e.starBlessed=!0,{success:!0,narrative:"🔭 The planets are set right and the room settles. The corrected heavens counsel the party: the next fight begins under a favourable aspect. +20 score."};case"divine-instability":return e.addScore(15),e.forewarned=!0,{success:!0,narrative:"🔮 The dangerous motion is named before it completes. The party crosses untouched, and forewarned of the next snare in their path. +15 score."};case"recognize-model":return e.addScore(30),{success:!0,narrative:"📖 The cosmological model is recognized and recorded — worth rather more to the right buyer than the brass it turns on. +30 score."};case"steady-ground":return e.addScore(10),{success:!0,narrative:"🎯 The stationary floor is found and held; the party crosses in order while the room turns around them. +10 score."};case"hurry-through":default:return e.takeDamage(2),{success:!1,damage:2,narrative:"💫 The floor turns underfoot mid-crossing: 2 damage, and the party comes out of it in no order at all."}}}});$r({id:"sealed-laboratory",title:"The Sealed Laboratory",situation:"A door bears the signs of Mercury, Venus, Mars, Jupiter, Saturn and the Sun. It has no handle, and the room beyond it is plainly still in use.",affordances:["mechanism","astral","apparatus","study"],options:[{id:"read-correspondences",name:"Read the Correspondences",desc:"The signs are a system; follow it",requires:["correspondence"],affordances:["astral"],weight:2},{id:"planetary-sequence",name:"Work the Planetary Sequence",desc:"The order is astronomical, not decorative",requires:["astronomy"],affordances:["astral"],weight:1.5},{id:"material-symbolism",name:"Read the Metals",desc:"Each planet is also a metal, and the metals are the lock",requires:["alchemy"],affordances:["apparatus"],weight:1.5},{id:"reconcile-traditions",name:"Reconcile the Traditions",desc:"Two systems overlap here; use both",requires:["syncretism"],weight:1.5},{id:"divine-sequence",name:"Divine the Order",desc:"Ask which sign opens it and which is the trap",requires:["divination"],weight:1},{id:"force-the-door",name:"Force the Door",desc:"It is only a door"},{id:"leave-sealed",name:"Leave It Sealed",desc:"Some laboratories are sealed on purpose"}],resolveOption(i,e,t){t.cleared=!0;const n=(s,r)=>(e.materials+=2,e.addScore(r),{success:!0,narrative:s});switch(i){case"read-correspondences":return n("🔗 The signs are not a lock but an argument, and it can be followed to its conclusion. The door opens on a working laboratory: +2 materials, +35 score.",35);case"planetary-sequence":return n("🔭 Pressed in the order the planets actually stand tonight, the signs give. +2 materials, +30 score.",30);case"material-symbolism":return n("⚗️ Each sign is its metal, and the metals want touching in the order of their melting. +2 materials, +30 score.",30);case"reconcile-traditions":return n("☯️ Two traditions are quarrelling on one door; reconciled, they agree to open it. +2 materials, +35 score.",35);case"divine-sequence":return e.addScore(15),e.forewarned=!0,{success:!0,narrative:"🔮 The sequence is read before it is attempted — and so is the sign that would have taken a hand off. +15 score, and the next snare is known."};case"force-the-door":return e.takeDamage(4),e.addScore(10),e.materials+=1,{success:!1,damage:4,narrative:"💥 The door yields to shoulders and a crowbar, and the ward on it yields something back: 4 damage, and only what could be grabbed on the way past. +1 material."};case"leave-sealed":default:return{success:!0,narrative:"🚪 The party leaves the laboratory sealed, as several previous parties evidently decided to."}}}});$r({id:"monster-grievance",title:"The Monster With a Grievance",situation:"Something large blocks the passage and does not attack. It says, in a language it did not expect anyone to answer, that adventurers stole something from its people.",affordances:["creature","people"],options:[{id:"negotiate-grievance",name:"Negotiate",desc:"It is talking. Talk back",requires:["diplomacy"],affordances:["people"],weight:2},{id:"translate-claim",name:"Answer in Its Own Tongue",desc:"Nobody has done that in a long time",requires:["translation"],weight:2},{id:"identify-artifact",name:"Identify the Disputed Thing",desc:"Recognize what was actually taken",requires:["antiquarian"],weight:1.5},{id:"investigate-claim",name:"Investigate the Claim",desc:"Find out whether it is even true",requires:["knowledge"],weight:1},{id:"slip-past-grievance",name:"Slip Past It",desc:"It is watching the passage, not the ceiling",requires:["rogue"],weight:1},{id:"fight-grievance",name:"Fight It",desc:"Talking is not the party's strength"}],resolveOption(i,e,t){switch(t.cleared=!0,i){case"negotiate-grievance":return e.addScore(25),e.addGold(20),{success:!0,narrative:"🤝 The grievance is real, old, and settleable. It stands aside, and pays 20 gold out of a hoard it says was never the point. +25 score."};case"translate-claim":return e.addScore(30),e.materials+=2,{success:!0,narrative:"🌐 Answered in its own tongue, it stops being a monster in the passage and becomes someone with a complaint. It gives the party passage and a gift of its own reagents: +2 materials, +30 score."};case"identify-artifact":return e.addScore(30),e.addGold(35),{success:!0,narrative:"🏺 The disputed thing is named, dated, and — awkwardly — recognized as something a previous party sold. It settles for the coin that changed hands: 35 gold to the party for the honesty. +30 score."};case"investigate-claim":return e.addScore(20),{success:!0,narrative:"📖 The claim checks out in every particular, which it did not expect anyone to bother doing. It steps out of the way. +20 score."};case"slip-past-grievance":return e.addScore(15),{success:!0,narrative:"🗡️ The party goes over and around while it watches the floor. Nothing is settled, but nothing is spent either. +15 score."};case"fight-grievance":default:return e.takeDamage(6),e.addScore(15),{success:!1,damage:6,narrative:"⚔️ It is not a difficult fight, because it was not expecting one. That is most of what is wrong with it: 6 damage, and the passage is clear."}}}});let H0=0;function Lo(){return(++H0).toString(36)}function Ct(){return Math.random()*10}const Gc=.5;function yt(i,e){return i.living().some(t=>t.equipment.some(n=>n.id===e))}function sn(i,e){return i.grimoire.some(t=>t.id===e)}function Bn(i){const e={sneak:0,disarm:0,deepStudy:0,secretDoor:0,trapSoak:0,cleanInspect:!1,notes:{}};return yt(i,"eq-boots")&&(e.sneak+=1.5,e.notes.sneak="Boots of the Quiet Step"),sn(i,"sp-light")&&(e.sneak+=1,e.notes.sneakLight="Dancing Light"),yt(i,"eq-lockpicks")&&(e.disarm+=1.5,e.cleanInspect=!0,e.notes.disarm="Masterwork Lockpicks",e.notes.cleanInspect="Masterwork Lockpicks"),i.hasPersonality("cunning")&&(e.cleanInspect=!0,e.notes.cleanInspect=e.notes.cleanInspect||"the Cunning"),yt(i,"eq-grimoire")&&(e.deepStudy+=1.5,e.notes.deepStudy="the Grimoire of Low Whispers"),yt(i,"eq-lantern")&&(e.secretDoor+=2,e.trapSoak+=1,e.notes.secretDoor="the Everburning Lantern",e.notes.trapSoak="the Everburning Lantern"),e}function Vc(i,e){return Wy(i,e,{item:t=>yt(e,t),spell:t=>sn(e,t),tactic:t=>Cs(e).some(n=>n.id===t)})}function Wc(i){return yt(i,"eq-alembic")&&i.materials>0&&i.supply<=5}function Ed(i,e){const t=nl(i);return t?[...Md(t,e,i),...Vc(i,e)]:[...$0(i,e),...Vc(i,e)]}function $0(i,e){var t,n,s,r,o;switch(i.type){case ie.MONSTER:case ie.BOSS:{const l=[{id:"fight",name:"Fight",desc:"Steel and teamwork"}];return(i.fled||0)<2&&l.push({id:"flee",name:"Fall Back",desc:`Retreat and try the fight later, worn down: ${2*((i.fled||0)+1)} damage`}),e.hasClass(q.ROGUE)&&!((t=i.monster)!=null&&t.isBoss)&&l.push({id:"sneak",name:"Sneak Past",desc:"The rogue leads a silent detour"}),e.hasClass(q.CLERIC)&&((n=i.monster)!=null&&n.undead)&&l.push({id:"turn-undead",name:"Turn Undead",desc:"The cleric raises the holy symbol"}),(s=i.monster)!=null&&s.bribable&&e.gold>=15&&l.push({id:"bribe",name:"Pay the Toll",desc:"Gold buys passage (15g)"}),e.grimoire.some(c=>c.use==="combat")&&l.push({id:"spell-strike",name:"Open with Magic",desc:"Lead with a combat spell"}),sn(e,"sp-fear")&&!((r=i.monster)!=null&&r.isBoss)&&(((o=i.monster)==null?void 0:o.health)||99)<=14&&l.push({id:"cause-fear",name:"Cause Fear",desc:"Send the weak thing running"}),l}case ie.TRAP:{const a=[{id:"push-through",name:"Push Through",desc:"Take the hit, keep marching"},{id:"search-around",name:"Search for a Way Around",desc:"Slow but safe-ish"}];return e.hasClass(q.ROGUE)&&a.unshift({id:"disarm",name:"Disarm It",desc:"The rogue's fingers know this work"}),e.grimoire.some(l=>l.use==="utility")&&a.push({id:"spell-bypass",name:"Magic It Open",desc:"A utility spell solves this"}),e.hasClass(q.ALCHEMIST)&&e.materials>=1&&a.push({id:"smoke-bomb",name:"Alchemist's Smoke",desc:"Spend a material; spring it from afar"}),a}case ie.TREASURE:case ie.VAULT:{const a=[{id:"loot",name:"Loot It All",desc:"Everything shiny goes in the bags"},{id:"inspect",name:"Inspect First",desc:"Check for mimics and curses"},{id:"leave-it",name:"Leave It",desc:"Some gold is bait"}];return sn(e,"sp-knock")&&a.unshift({id:"knock-open",name:"Cast Knock",desc:"Open it from across the room. Loudly."}),a}case ie.LIBRARY:{const a=[{id:"study",name:"Study the Shelves",desc:"Learn a spell from the stacks"},{id:"pass-by",name:"Pass Through",desc:"Books do not fill bellies"}];return e.hasClass(q.WIZARD)&&a.unshift({id:"deep-study",name:"Read the Sealed Texts",desc:"The wizard risks the dangerous books"}),a}case ie.SHRINE:return[{id:"rest",name:"Rest and Pray",desc:"Heal the wounded"},{id:"desecrate",name:"Pry Out the Gold Leaf",desc:"Profitable. Blasphemous."},{id:"pass-by",name:"Keep Moving",desc:"No time for candles"}];case ie.LAB:{const a=[{id:"pass-by",name:"Move On",desc:"Glassware and regret"}];return e.hasClass(q.ALCHEMIST)&&e.materials>0&&a.unshift({id:"alchemy",name:"Work the Bench",desc:"Brew a potion or mod a weapon"}),Wc(e)&&a.unshift({id:"brew-oil",name:"Cook Down Lamp Oil",desc:"A material becomes two marches of light"}),a}case ie.MATERIALS:{const a=[{id:"gather",name:"Gather Materials",desc:"Herbs, salts, quicksilver"},{id:"pass-by",name:"Leave Them",desc:"The satchel stays light"}];return Wc(e)&&a.push({id:"brew-oil",name:"Cook Down Lamp Oil",desc:"A material becomes two marches of light"}),a}case ie.STAIRS:{const a=[{id:"descend",name:"Go Down",desc:"A long climb by lamplight: 1 supply"}];yt(e,"eq-grapple")&&a.push({id:"rope-down",name:"Rope Down the Well",desc:"Straight down the shaft beside the stair: no supply spent"});const l=e.living().some(d=>d.health<d.effectiveMax()),c=e.living().some(d=>d.wounds>0);return(l||c)&&a.push({id:"camp-stair",name:"Camp at the Stairhead",desc:"Sleep and eat before the next floor: 2 supply for 6 healed each and a wound set, and something may find you"}),a}case ie.DISASTER:return[{id:"brace",name:"Brace and Endure",desc:"Shields up, heads down"},{id:"scatter",name:"Scatter and Regroup",desc:"Every hero for themselves"}];default:return[{id:"proceed",name:"Proceed",desc:"Onward and downward"}]}}const G0={brave:{fight:3,"push-through":2,brace:2,flee:-2,"leave-it":-1,"camp-stair":-1},cunning:{sneak:3,disarm:3,bribe:2,inspect:2,"spell-bypass":2,fight:-1,"rope-down":2},greedy:{loot:4,desecrate:2,gather:2,fight:1,sneak:-1,"leave-it":-3,bribe:-2,"camp-stair":-1},scholarly:{study:3,"deep-study":3,"spell-strike":2,"spell-bypass":2},pious:{rest:3,"turn-undead":3,desecrate:-5,"camp-stair":2},reckless:{fight:2,"push-through":3,loot:2,inspect:-2,"search-around":-2,"camp-stair":-3,descend:2},craven:{flee:3,sneak:2,disarm:2,"search-around":2,inspect:1,scatter:2,fight:-2,"push-through":-2,brace:-1,"cause-fear":3,"smoke-bomb":2,"knock-open":1,"camp-stair":3}},V0={"knock-open":{base:1.5,cunning:2,scholarly:1},"cause-fear":{base:1.5,cunning:1},"smoke-bomb":{base:1.5,cunning:2}};function W0(i,e){const t=e==null?void 0:e.monster;if(!t)return{};const n={},s=(l,c)=>{n[l]=(n[l]||0)+c};return t.trait==="ethereal"&&!i.hasClass(q.CLERIC)&&(s("fight",-2),s("sneak",2),s("spell-strike",2)),t.trait==="armored"&&(s("spell-strike",1.5),s("fight",-.5)),t.trait==="venomous"&&!i.hasClass(q.CLERIC)&&(s("sneak",1.5),s("cause-fear",1.5),s("fight",-1)),t.trait==="swarm"&&s("spell-strike",2),i.grimoire.filter(l=>l.use==="combat"&&l.aoe).some(l=>bd(l,e).length>0)&&(s("spell-strike",3),s("fight",-1)),i.grimoire.filter(l=>l.use==="combat").some(l=>ws(l,t)>1)&&s("spell-strike",2),n}function q0(i,e){const t=Ed(i,e);if(t.length===0)return null;if(t.length===1)return t[0].id;const n=W0(e,i),s=t.map(a=>{let l=1;for(const h of e.personalities){const u=G0[h];u&&u[a.id]!==void 0&&(l+=u[a.id])}a.id==="alchemy"&&(l+=3),a.id==="gather"&&(l+=2);const c=V0[a.id];if(c){l+=c.base;for(const h of e.personalities)c[h]&&(l+=c[h])}const d=Xy(a.id);if(d){l+=1.2;for(const h of e.personalities)d[h]&&(l+=d[h])}if(n[a.id]&&(l+=n[a.id]),a.id==="rest"&&e.totalHealth()/e.totalMaxHealth()<.6&&(l+=3),a.id==="camp-stair"){const h=e.totalHealth()/e.totalMaxHealth();h<.5?l+=5:h<.75?l+=2:l-=2,e.living().some(p=>p.wounds>0)&&(l+=3);const u=Un(e);e.supply<=(u.campSupply?2:4)&&(l-=4)}if(a.id==="rope-down"&&(l+=e.supply<=3?3:1.5),a.id==="fight"&&e.totalHealth()/e.totalMaxHealth()<.3&&(l-=2),a.id==="flee"&&e.totalHealth()/e.totalMaxHealth()<.3&&(l+=2),a.id==="study"&&(l+=1),a.id==="leave-it"){const h=e.totalHealth()/e.totalMaxHealth();h<.4?l+=4:h<.65&&(l+=1.5),e.supply===0&&(l+=1.5)}return{opt:a,w:Math.max(.1,l)}}),r=s.reduce((a,l)=>a+l.w,0);let o=Math.random()*r;for(const{opt:a,w:l}of s)if(o-=l,o<=0)return a.id;return t[0].id}function X0(i){return`💢 At half health, ${i.name} turns fierce: attack +2 for the rest of the fight.`}const qc=[{id:"found-charm",type:"equipment",name:"a tarnished luck-charm",icon:"🍀",slot:"trinket",bonus:{mind:1},bestFor:null,text:"Somebody's luck ran out holding it. Perhaps it recharges."},{id:"found-buckle",type:"equipment",name:"a dead adventurer's belt buckle",icon:"🔩",slot:"trinket",bonus:{defense:1},bestFor:null,text:"Sturdy. Its last owner was not."},{id:"found-whetstone",type:"equipment",name:"a whetstone of surprising opinion",icon:"🪨",slot:"trinket",bonus:{attack:1},bestFor:null,text:"It hums when it works. Nobody asks what the tune is."}];function ka(i,e=!1,t=Math.random()){if(!e&&t>.35)return null;const n=Math.floor((e?t:t/.35)*4)%4;if(n===0)return i.potions.push({kind:"healing-draught",heal:6}),{source:"the hoard",find:"potion",text:"🧪 Also in the hoard: a healing draught (heals 6), added to the satchel."};if(n===1)return i.materials+=2,{source:"the hoard",find:"materials",text:"🌿 Also in the hoard: 2 alchemy materials."};if(n===2){const o=ks[Math.floor(t*997)%ks.length];return i.grimoire.push({...o,id:`found-${o.id}-${i.grimoire.length}`,source:"found"}),{source:o.name,find:"scroll",text:`📜 Also in the hoard: a scroll of ${o.name}, added to the grimoire.`}}const s=qc[Math.floor(t*991)%qc.length],r=i.assignEquipment({...s,id:`${s.id}-${Lo()}`});return{source:s.name,find:"trinket",text:`🍀 Also in the hoard: ${s.name} (${xd(s.bonus)}), now worn by ${(r==null?void 0:r.name)||"no one"}.`}}function Y0(i,e,t,n={}){const s=qy(t,e,{item:l=>yt(e,l),spell:l=>sn(e,l),tactic:l=>Cs(e).some(c=>c.id===l)}),r=zr(s.feature),o=[];if(s.fightOnly){const l=i.monster,c=Un(e),d=c.featureOpener,h=((r==null?void 0:r.tags)||[]).includes("hazard")?c.hazardDamage:0,u=s.openerDamage+d+h,p=Math.min(u,Math.max(0,l.health-1));l.health=Math.max(1,l.health-u),d&&o.push({source:"improvised arms",text:`🔧 The party knows how to swing what the room left lying about: +${d} to the opening.`}),h&&o.push({source:"pinning",text:`📌 They do not let it climb straight back out: ${h} more damage from the room.`});const g=il(i,e,"fight",{formation:n==null?void 0:n.formation,extraCover:s.extraCover||0});return g.preps=[...o,...g.preps||[]],g.feature=s.feature,g.featureAction=t,g.featureDamage=p,g.featureTier=s.tier,g.spellElement=s.element||null,g}const a={success:!0,feature:s.feature,featureAction:t,featureTier:s.tier,preps:o};if(s.gold&&(e.addGold(s.gold),a.gold=s.gold),s.materials&&(e.materials+=s.materials,a.materials=s.materials),s.heal&&(e.healParty(s.heal),a.healed=s.heal),s.curesLinger&&e.poisonLinger>0&&(e.poisonLinger=0,a.curedLinger=!0,o.push({source:"the Great Waterskin",text:"🫗 The venom is flushed out with clean water before it can act again."})),s.weaponMod){const l=e.living().reduce((c,d)=>c.attack>=d.attack?c:d);l.addWeaponMod({...s.weaponMod}),a.weaponMod={...s.weaponMod,target:l.name}}if(s.spell){const l={...s.spell,id:`feature-${t}-${e.grimoire.length}`,source:"prepared",text:"Taken off a dungeon shelf."};if(e.grimoire.push(l),a.spell=l.name,s.extraSpell){const c={...s.spell,id:`feature-${t}-${e.grimoire.length}`,use:"utility",source:"prepared",text:"Taken off a dungeon shelf."};e.grimoire.push(c),a.extraSpell=!0}}if(s.wakesDead){const l=!s.quiet&&Ct()>6.5;a.wokeDead=l,l&&(e.takeDamage(4),a.damage=4,o.push({source:r.name,text:"⚰️ The occupant objects: 4 damage before it is put back down."}))}return i.cleared=!0,e.recordEncounter(t,!0),a}function j0(i,e=Ct()){const t=i.living().filter(r=>r.class===q.ROGUE),n=t.length>0?Math.max(...t.map(r=>r.mind)):Math.floor(i.bestMind()/2);let s=0;return i.hasPersonality("scholarly")&&(s+=1),i.hasPersonality("craven")&&(s+=1),s+=Bn(i).secretDoor,n+s+e>11}function K0(i,e=Ct()){const t=i.living().filter(r=>r.class===q.ROGUE),n=t.length>0?Math.max(...t.map(r=>r.mind))+2:Math.floor(i.bestMind()/2);let s=Bn(i).secretDoor;return i.hasPersonality("craven")&&(s+=1),i.hasPersonality("reckless")&&(s-=1),n+s+e>11}function J0(i,e=Ct()){let t=3.5;return i.hasPersonality("craven")&&(t+=3),i.hasPersonality("cunning")&&(t+=1.5),i.hasPersonality("greedy")&&(t-=3),i.hasPersonality("brave")&&(t-=2),i.hasPersonality("scholarly")&&(t-=1),i.totalHealth()/i.totalMaxHealth()<.5&&(t+=3),e<t}function Po(i,e){if(!e)return{weight:0,advocate:null};const t=s=>i.hasPersonality(s),n=s=>i.hasClass(s);switch(e){case"crypt":return t("greedy")?{weight:3,advocate:"the Covetous wanted what gets buried with people"}:t("pious")?{weight:2,advocate:"the Devout did not like leaving the dead untended"}:{weight:0,advocate:null};case"works":return n(q.ALCHEMIST)?{weight:4,advocate:"the alchemist wanted the bench"}:t("scholarly")?{weight:2,advocate:"the Scholarly wanted to see what was being made down there"}:{weight:0,advocate:null};case"archive":return t("scholarly")?{weight:4,advocate:"the Scholarly wanted the shelves"}:n(q.WIZARD)?{weight:3,advocate:"the wizard reads everything, on principle"}:{weight:0,advocate:null};case"barracks":return t("greedy")?{weight:3,advocate:"the Covetous wanted the weapon rack"}:t("brave")?{weight:2,advocate:"the Bold wanted whatever was garrisoned there"}:{weight:0,advocate:null};case"sump":return{weight:t("greedy")?1:-2,advocate:null};default:return{weight:0,advocate:null}}}function Z0(i,e,t=Ct()){if(i.hasKey(e))return{opened:!0,how:"key",noisy:!1};const n=i.living().filter(o=>o.class===q.ROGUE);if(n.length>0){const o=Math.max(...n.map(l=>l.mind)),a=Bn(i).disarm;if(o+a+t>9)return{opened:!0,how:"picked",noisy:!1}}if(sn(i,"sp-knock")){const o=i.castSpell("utility","sp-knock");if(o)return{opened:!0,how:"knock",noisy:!0,source:o.name}}const s=Math.max(0,...i.living().map(o=>o.attack)),r=yt(i,"eq-prybar")?4:0;if(s+r+t>15){const o=r?0:2;return o&&i.takeDamage(o),{opened:!0,how:"forced",noisy:!0,lever:r>0,damage:o}}return{opened:!1,how:null,noisy:!1}}function Xc(i,e=Ct(),t=null){let n=4;return i.hasPersonality("greedy")&&(n+=3),i.hasPersonality("scholarly")&&(n+=2),i.hasPersonality("reckless")&&(n+=2),i.hasPersonality("craven")&&(n-=3),i.totalHealth()/i.totalMaxHealth()<.35&&(n-=3),n+=Po(i,t).weight,e<n}function il(i,e,t,n=null){var r,o;if(Yy(t))return Y0(i,e,t,n);const s=nl(i);if(s!=null&&s.resolveOption&&s.options.some(a=>a.id===t))return Sd(s,t,e,i);switch(t){case"fight":{const a=i.monster;let l=a.health,c=0;const d=e.combatItemActions();let h=0,u=0,p=0;for(const Te of d)h+=Te.opening||0,a.undead&&(h+=Te.vsUndead||0),u+=Te.ward||0,p+=Te.summonAttack||0;l-=h;const g=[],v=a.trait==="armored"&&sn(e,"sp-sunder")?e.castSpell("combat","sp-sunder"):null,m=a.trait==="armored"&&!v?2:0;v&&g.push({source:v.name,text:`💢 ${v.name} reminds the plate it was ore: it stops turning blows for the rest of the fight.`});const f=a.trait==="swarm"&&yt(e,"eq-greatsword")?3:0;f&&g.push({source:"the Greatsword of the Vault",text:`🗡️ The greatsword takes a whole rank of them at a stroke: ${f} more damage a round.`});const x=yt(e,"eq-throwing-knives")?4:0;x&&(l-=x,g.push({source:"the Bandolier of Knives",text:`🔪 Six knives arrive before the party does: ${x} damage before the first round.`}));const M=yt(e,"eq-quicksilver-daggers");M&&g.push({source:"the Quicksilver Daggers",text:"🗡️ The daggers land before the argument starts: nothing comes back in the first round."});const _=sn(e,"sp-shield")?e.castSpell("combat","sp-shield"):null;_&&(u+=2,g.push({source:_.name,text:`🛡️ ${_.name} goes up before the first blow: 2 less damage every round.`}));const k=Vy(i);k.undeadRisk&&yt(e,"eq-blessed-mace")&&(k.undeadRisk=!1,k.notes.push({feature:"sarcophagus",text:"🔨 The Blessed Mace sanctifies the room between swings: whatever was stirring in the stone settles."}));const E=(k.cover||0)+((n==null?void 0:n.extraCover)||0),C=yt(e,"eq-silvered-mirror"),R=e.hasClass(q.CLERIC)||k.revealEthereal||C||!!(n!=null&&n.forceRevealEthereal);a.trait==="ethereal"&&C&&!k.revealEthereal&&g.push({source:"the Silvered Hand-Mirror",text:"🪞 The Silvered Hand-Mirror catches the ethereal thing where it truly stands: weapons do full damage."});const b=a.trait==="ethereal"&&!R?.6:1;for(const Te of k.notes)g.push({source:Te.feature,text:Te.text});n!=null&&n.extraCover&&g.push({source:"the pillars",text:`🏛️ Fighting from the aisles: ${n.extraCover} less damage per round on top of the cover.`}),a.trait==="ethereal"&&!k.revealEthereal&&g.push(e.hasClass(q.CLERIC)?{source:"the cleric",text:"✨ The cleric blesses the blades: the ethereal monster takes full weapon damage."}:{source:a.name,text:"👻 The monster is ethereal and the party's blows pass through it: weapon damage ×0.6 (no cleric to bless the blades)."});for(const Te of(n==null?void 0:n.reactionNotes)||[])g.push(Te);const y=N0((n==null?void 0:n.formation)||D0(e,i),i);g.push({source:y.name,text:`${y.icon} ${y.tell} ${y.effect}`});const T=Un(e),I=T.flankDamage>0&&e.living().length>=T.flankMin&&y.flanking;I&&g.push({source:"the party's footwork",text:`⚔️ The party has the numbers and uses them: +${T.flankDamage} damage a round.`});const L=a.trait==="armored"&&T.vsArmored?T.vsArmored:0;L&&g.push({source:"focused fire",text:`🎯 Everyone strikes the same seam in the plate: +${L} damage a round.`}),T.cover&&g.push({source:"the shield wall",text:`🛡️ The party closes ranks: ${T.cover} less damage a round.`});const B=T.wardPerCast*((n==null?void 0:n.castsThisFight)||0);B&&g.push({source:"ward-weaving",text:`🕸️ Every working leaves a ward behind it: ${B} less damage a round.`});let X=Math.max(1,a.attack+((n==null?void 0:n.monsterAtkMod)||0)+(T.monsterAtk||0));e.alarmed&&(X+=2,e.alarmed=!1,g.push({source:"the alarm",text:"🔔 The alarm tripped earlier warned it: the monster attacks with +2 this fight."}));const G=(n==null?void 0:n.spellSustain)||0;G>0&&g.push({source:n.spellSustainSource||"the working",text:`✨ The working holds: +${G} damage every round while the fight lasts.`});const Z=e.coatingBonusVs(a);Z.bonus>0&&g.push({source:Z.notes.join(" + "),text:`⚗️ The ${Z.notes.join(" and ")} exploits the monster's weakness: +${Z.bonus} damage per round.`});let z=0,se=!1,ae=0;for(;l>0&&e.isAlive()&&z<12;){z++;const Te=(I?T.flankDamage:0)+L+f,W=Math.max(1,Math.round((e.combatAttack(y.frontage)+p+Z.bonus+G+Te+Math.floor(Ct()/3))*b*y.attackMult)-m);if(l-=W,l<=0)break;if(a.isBoss&&!se&&l<=a.health/2&&(se=!0,X+=2,g.push({source:a.name,text:X0(a)})),ae>0&&e.healParty(ae),(a.trait==="slow"||M)&&z===1)continue;const ee=Math.max(1,Math.round((X-Math.floor(e.totalDefense()/3)-u-E-T.cover-B)*y.incomingMult));e.takeDamage(ee),c+=ee;const ge=e.castHealIfNeeded();if(ge){const ce=Math.round(ge.spell.effectivePower*Gc);ae+=ce,g.push({source:ge.spell.name,text:`💚 ${ge.spell.name} closes ${ge.target.name}'s wounds mid-fight: ${ge.spell.effectivePower} healed in round ${z}, then ${ce} a round while it holds${ge.spell.consumed?" (the scroll is consumed)":""}.`})}e.quaffIfNeeded()}if(z===0){const Te=/every round|a round while|less damage a round|damage a round/i;for(let W=g.length-1;W>=0;W--)Te.test(g[W].text||"")&&g.splice(W,1)}const oe=l<=0&&e.isAlive();let ke=null;if(oe){const Te=a.isBoss?100:25;e.addScore(Te),i.cleared=!0;const W=Hc(e,a);if(ke=W.drop,g.push(W),a.trait==="venomous"&&(yt(e,"eq-cursed-blade")?g.push({source:"the Blade of the Adder",text:"🐍 The Blade of the Adder has taught its bearer what venom tastes like: the party shrugs this off."}):e.hasClass(q.CLERIC)?g.push({source:"the cleric",text:"🐍 The monster was venomous, but the cleric cures the poison before it can act."}):(e.poisonLinger=(e.poisonLinger||0)+2,g.push({source:a.name,text:"🐍 The monster was venomous: the party will take 2 poison damage next room (no cleric to cure it)."}))),a.isBoss){const ee=ka(e,!0);ee&&g.push(ee)}e.hasPersonality("reckless")&&(e.addScore(5),g.push({source:"the Reckless",text:"💥 The Reckless finish the fight with style: +5 score."}))}if(e.isAlive()&&c>=6){const Te=e.castSpell("heal");Te&&(e.healParty(Te.effectivePower),g.push({source:Te.name,text:`💚 ${Te.name} heals ${Te.effectivePower} after the fight${Te.consumed?" (the scroll is consumed)":""}.`}))}return e.recordEncounter("fight",oe),{success:oe,rounds:z,damage:c,monster:a.name,itemActions:d,preps:g,drop:ke,bossPhased:se,formation:y.id}}case"cause-fear":{const a=e.castSpell("combat","sp-fear");return e.addScore(20),i.cleared=!0,e.recordEncounter("cause-fear",!0),{success:!0,monster:i.monster.name,spell:a?a.name:"Cause Fear"}}case"spell-strike":{const a=i.monster,l=[],c=Un(e),d=e.grimoire.filter(x=>x.use==="combat").length,h=a.isBoss?Math.max(1,d):1+(e.hasClass(q.WIZARD)?1:0)+c.extraCast,u=[];let p=null,g=0;for(let x=0;x<h;x++){const M=e.grimoire.filter(y=>y.use==="combat"&&!e.castThisRoom.has(y.id));let _=null,k=-1;for(const y of M){const T=y.power*ws(y,a);T>k&&(k=T,_=y)}const E=_?e.castSpell("combat",_.id):null;if(!E)break;const C=ws(E,a)*(a.trait==="swarm"?1.5:1);ws(E,a)>1?p=p||"weak":ws(E,a)<1&&(p=p||"resisted"),a.trait==="swarm"&&(p=p||"swarm");const R=Math.round(E.effectivePower*C);a.health=Math.max(1,a.health-R),g+=Math.round(R*(c.sustainFull?1:Gc)),u.push(E);const b=c.allSpellsArea?{...E,aoe:!0}:E;for(const y of bd(b,i))l.push(y)}const v=a.isBoss&&u.length>1?[{source:"the boss chamber",text:`✨ Nothing is held back for later: the party looses everything it has, ${u.length} workings in the one fight that matters.`}]:[],m=L0(l);if(m.damage&&(a.health=Math.max(1,a.health-m.damage)),m.heal&&e.healParty(m.heal),m.selfHarm&&yt(e,"eq-warded-buckler")&&(m.selfHarm=Math.floor(m.selfHarm/2),m.notes.push({source:"the Warded Buckler",text:"🛡️ The prayers on the inside of the buckler turn aside half of what the party set off."})),m.burn>0&&yt(e,"eq-athanor-charm")&&(m.burn+=2,m.notes.push({source:"the Athanor Charm",text:"🔥 The athanor charm feeds the blaze: 2 more damage a round while it burns."})),m.selfHarm&&!c.noSelfHarm)for(const x of e.living())x.takeDamage(m.selfHarm);else m.selfHarm&&c.noSelfHarm&&m.notes.push({source:"firewatch",text:"🧯 The party set it off and stood well clear: none of it comes back on them."});m.light>0?e.addSupply(m.light):m.light<0&&(e.supply=Math.max(0,e.supply+m.light));for(const x of m.consumed)i.features=(i.features||[]).filter(M=>M!==x);const f=il(i,e,"fight",{formation:n==null?void 0:n.formation,spellSustain:g+m.burn,spellSustainSource:u.map(x=>x.name).join(" + ")||null,extraCover:m.cover,castsThisFight:u.length,monsterAtkMod:m.monsterAtk,forceRevealEthereal:m.revealEthereal,reactionNotes:[...v,...m.notes]});return f.spell=((r=u[0])==null?void 0:r.name)||null,f.spellsCast=u.map(x=>x.name),f.spellEdge=p,f.spellElement=((o=u[0])==null?void 0:o.element)||null,f}case"sneak":{const a=Math.max(...e.living().filter(u=>u.class===q.ROGUE).map(u=>u.mind)),l=e.hasPersonality("craven")?1:0,c=Bn(e),d=[];c.notes.sneak&&d.push({source:c.notes.sneak,text:`👢 The ${c.notes.sneak} add +1.5 to the sneak roll.`}),c.notes.sneakLight&&d.push({source:c.notes.sneakLight,text:"💡 Dancing Light revealed the watcher's position: +1 to the sneak roll."});const h=a+l+c.sneak+Ct()>9;return h?(e.addScore(15),i.cleared=!0):e.takeDamage(Math.ceil(i.monster.attack/2)),e.recordEncounter("sneak",h),{success:h,monster:i.monster.name,preps:h?d:[]}}case"turn-undead":{const l=Math.max(...e.living().filter(h=>h.class===q.CLERIC).map(h=>h.mind))+Ct()>8,c=[];let d=null;if(l){e.addScore(30),i.cleared=!0;const h=Hc(e,i.monster);d=h.drop,c.push(h)}else e.takeDamage(i.monster.attack);return e.recordEncounter("turn-undead",l),{success:l,monster:i.monster.name,preps:c,drop:d}}case"bribe":return e.gold-=15,e.addScore(5),i.cleared=!0,{success:!0,goldSpent:15,monster:i.monster.name};case"flee":{i.fled=(i.fled||0)+1;const a=2*i.fled;return e.takeDamage(a),{success:!0,retreated:!0,damage:a,fled:i.fled,monster:i.monster.name}}case"disarm":{const a=Math.max(...e.living().filter(h=>h.class===q.ROGUE).map(h=>h.mind)),l=Bn(e),c=[];l.notes.disarm&&c.push({source:l.notes.disarm,text:"🗝️ The Masterwork Lockpicks add +1.5 to the disarm roll."});const d=a+l.disarm+Ct()>8;return d?(e.addScore(20),i.cleared=!0):(e.takeDamage(Math.ceil(i.trapDamage/2)),i.cleared=!0),e.recordEncounter("disarm",d),{success:d,preps:d?c:[]}}case"push-through":{const a=e.hasPersonality("craven")?1:0,l=Bn(e),c=[];l.trapSoak>0&&c.push({source:l.notes.trapSoak,text:"🏮 The Everburning Lantern showed the pressure plates: 1 less damage."});const d=i.trapType||"spike",h=sn(e,"sp-feather")?e.castSpell("utility","sp-feather"):null;h&&c.push({source:h.name,text:`🪶 ${h.name} takes the party's weight off the floor: 3 less damage from anything underfoot.`});let u=Math.max(1,(i.trapDamage||3)-a-l.trapSoak-(h?3:0));if(d==="fire"){const p=Un(e).fireTrapSoak;p?(u=Math.max(1,u-p),c.push({source:"firewatch",text:`🧯 The party reads the jet before it fires and is not standing there: ${p} less damage.`})):sn(e,"sp-frost")?(u=Math.max(1,u-2),c.push({source:"Frost Lance",text:"❄️ Frost Lance counters the flame jet: 2 less damage."})):u+=1}else d==="poison"?(u=Math.max(1,Math.ceil(u/2)),e.hasClass(q.CLERIC)?c.push({source:"the cleric",text:"🐍 The needles hit, but the cleric cures the venom on the spot."}):(e.poisonLinger=(e.poisonLinger||0)+2,c.push({source:"the trap",text:"🐍 Poison needles: the party will take 2 poison damage next room (no cleric to cure it)."}))):d==="alarm"&&(u=Math.min(u,2),e.alarmed=!0,c.push({source:"the alarm",text:"🔔 The alarm rings through the dungeon: the next monster will attack with +2."}));return e.takeDamage(u),i.cleared=!0,{success:!0,damage:u,spotted:a>0,trapType:d,preps:c}}case"smoke-bomb":return e.materials-=1,e.addScore(15),i.cleared=!0,e.recordEncounter("smoke-bomb",!0),{success:!0,materialsLeft:e.materials};case"search-around":{const a=e.bestMind()+Ct()>8;return a||e.takeDamage(Math.ceil((i.trapDamage||3)/2)),i.cleared=!0,{success:a}}case"spell-bypass":{const a=e.castSpell("utility");return i.cleared=!0,e.addScore(10),{success:!0,spell:a?a.name:null}}case"loot":{if(Math.random()<(i.mimicChance||0))return e.takeDamage(5),e.addGold(Math.floor((i.gold||20)/2)),i.cleared=!0,{success:!1,mimic:!0,gold:Math.floor((i.gold||20)/2)};e.addGold(i.gold||20),i.cleared=!0;const l=[],c=ka(e,i.type===ie.VAULT);return c&&l.push(c),{success:!0,gold:i.gold||20,preps:l}}case"inspect":{const a=Bn(e),l=[];let c=Math.floor((i.gold||20)*.8);a.cleanInspect&&(c=i.gold||20,l.push({source:a.notes.cleanInspect,text:`🔍 ${a.notes.cleanInspect==="the Cunning"?"The Cunning eye":"The Masterwork Lockpicks"} found everything: the full gold taken, nothing missed.`})),e.addGold(c),i.cleared=!0;const d=ka(e,i.type===ie.VAULT);return d&&l.push(d),{success:!0,gold:c,careful:!0,preps:l}}case"knock-open":{const a=e.castSpell("utility","sp-knock"),l=i.gold||20;return e.addGold(l),i.cleared=!0,e.recordEncounter("knock-open",!0),{success:!0,gold:l,spell:a?a.name:"Knock",consumed:a?a.consumed:!1,wasMimic:Math.random()<(i.mimicChance||0)}}case"leave-it":return i.cleared=!0,{success:!0,gold:0};case"study":{const a=e.hasPersonality("scholarly")?2:1;e.spellsLearned+=a,e.addScore(a*20);for(let l=0;l<a;l++)e.grimoire.push({id:`learned-${Lo()}`,name:"Found Cantrip",icon:"📜",school:"found",power:3,use:Math.random()<.5?"combat":"utility",source:"prepared",text:"Copied from the stacks."});return i.cleared=!0,{success:!0,learned:a}}case"deep-study":{const a=Math.max(...e.living().filter(h=>h.class===q.WIZARD).map(h=>h.mind)),l=Bn(e),c=l.deepStudy>0?[{source:l.notes.deepStudy,text:"📖 The Grimoire of Low Whispers adds +1.5 to the reading roll."}]:[],d=a+l.deepStudy+Ct()>9;return d?(e.spellsLearned+=2,e.addScore(50),e.grimoire.push({id:`sealed-${Lo()}`,name:"Sealed Working",icon:"🔏",school:"forbidden",power:6,use:"combat",source:"prepared",text:"The margins screamed. The wizard did not."})):e.takeDamage(4),i.cleared=!0,e.recordEncounter("deep-study",d),{success:d,preps:d?c:[]}}case"brew-oil":{e.materials-=1;const a=e.addSupply(2);return i.cleared=!0,{success:!0,preps:[{source:"the Portable Alembic",text:`⚗️ A material goes into the alembic and comes out as lamp oil: ${a} more march${a===1?"":"es"} of light.`}]}}case"rest":{const a=e.hasPersonality("pious")?4:0,l=Un(e).mendAtShrine,c=[];if(l)for(const h of e.living())h.wounds>0&&(h.mendWounds(l),c.push(h.name));for(const h of e.living())h.heal(5+a);i.cleared=!0;const d=c.length?[{source:"field surgery",text:`✚ Somebody sets what the march only bandaged: a wound closed on ${c.join(", ")} without waiting for town.`}]:[];return{success:!0,healed:5+a,mended:c,preps:d}}case"desecrate":return e.addGold(30),e.desecrated=!0,i.cleared=!0,{success:!0,gold:30,ominous:!0};case"alchemy":{const a=e.doAlchemy();return i.cleared=!0,e.addScore(25),{success:!0,alchemy:a}}case"gather":return e.materials+=i.materials||1,e.addScore(5),i.cleared=!0,{success:!0,materials:i.materials||1};case"descend":{const a=Math.min(1,e.supply);return e.supply-=a,i.cleared=!0,{success:!0,descended:!0,supplySpent:a}}case"rope-down":return i.cleared=!0,{success:!0,descended:!0,supplySpent:0,preps:[{source:"the Grapple and Line",text:"🪢 The line goes down the shaft beside the stair: the party descends without burning a march of oil."}]};case"camp-stair":{const a=Un(e),l=a.campSupply?Math.max(1,2-a.campSupply):2,c=Math.min(l,e.supply);e.supply-=c;const d=6;let h=0;for(const m of e.living()){const f=m.health;m.heal(d),h+=m.health-f}const u=e.living().filter(m=>m.wounds>0).sort((m,f)=>f.wounds-m.wounds)[0]||null;u&&u.mendWounds(1);const p=!a.campWatched&&Ct()>=5;let g=0;p&&(g=4+Math.floor(Ct()/2),e.takeDamage(g)),i.cleared=!0;const v=a.campWatched?[{source:"Cold Camp",text:`🏕️ No fire and a watch kept: the camp costs ${c} supply and nothing finds it.`}]:[];return{success:!0,descended:!0,camped:!0,healed:d,healedTotal:h,mended:(u==null?void 0:u.name)||null,supplySpent:c,damage:g,interrupted:p,preps:v}}case"brace":{const a=e.desecrated?8:5;e.takeDamage(Math.max(1,a-Math.floor(e.totalDefense()/4))),i.cleared=!0;const l=[],c=e.castSpell("heal");return c&&(e.healParty(c.effectivePower),l.push({source:c.name,text:`💚 ${c.name} heals ${c.effectivePower} as the dust settles.`})),{success:!0,damage:a,preps:l}}case"scatter":{let a=0;for(const l of e.living())Ct()<4&&(l.takeDamage(3),a++);return i.cleared=!0,{success:a<=1,hurt:a}}case"pass-by":case"proceed":default:return i.cleared=!0,{success:!0}}}const Q0={[q.FIGHTER]:{brave:["Stand back — this is the part I'm for.","If it bleeds on me, that's how I know it's working."],cunning:["A fight you skip counts double.","I hit hardest from the side nobody's watching."],greedy:["The sword's just how I open lockboxes.","Everything down here is carrying something. I collect.","Danger pay. Emphasis on pay."],scholarly:["I read a treatise on this maneuver. Chapter three. Brace.","Footwork is just grammar for the body."],pious:["My shield has a saint on it. She's watching. Form up.","The body is a temple. Mine's a fortress."],reckless:["Plan? I'm the plan.","Last one in buys the ale!"],craven:["I'll guard the rear. Someone has to. Far back.","My shield works best with me behind it and everything else very far away."],generic:["Behind me.","This is the job."]},[q.CLERIC]:{brave:["Faith walks in front. So do I.","The light goes first. I merely follow it, loudly."],cunning:["Grace favors the well-prepared.","The god helps those who check for tripwires."],greedy:["Tithes flow both directions, technically.","The god counts. So do I.","Even the dead tithe here. Especially the dead."],scholarly:["The liturgy has a verse for this. Several, actually.","The commentaries disagree. I don't."],pious:["We are exactly where we are meant to be. Regrettably.","Candles first. Then courage."],reckless:["The god forgives. That's the whole strategy.","Heal fast, ask later."],craven:["I have a strong feeling we should be elsewhere. Call it prophecy.","The god counsels prudence. Loudly. Through me. Right now."],generic:["Steady. All of you, steady.","Wounds after. Walking now."]},[q.WIZARD]:{brave:["I did not memorize this spell to whisper it.","Range is a suggestion. Watch."],cunning:["There's a cheaper way to do this. There always is.","Why duel what you can outwit?"],greedy:["Knowledge is treasure, but treasure is also treasure.","Transmutation started as a hobby. It's a livelihood now.","What that thing drops will fund a semester of research."],scholarly:["Fundamentals of Sorcery, volume three, page ninety: this exact mistake.","Fascinating. Everyone stand behind me while I annotate."],pious:["Magic is prayer with better handwriting.","I asked permission for this spell. Twice."],reckless:["Overchannel? I call it generous casting.","The safety margin is where the good magic lives."],craven:["I know a spell for this. It's called leaving.","I did not survive the academy by standing in the open."],generic:["Allow me.","This will only take a syllable."]},[q.ROGUE]:{brave:["Quietly is for people with time.","I'll scout it — from inside."],cunning:["Every door is a suggestion.","Doors, guards, promises — all pickable."],greedy:["It isn't stealing if the owner's a skeleton.","My fingers itch. That means gold, or a rash.","I already know which part of it sells."],scholarly:["The lock's a three-pin Herrengrave. The book was wrong about them. I'm not.","I've studied every trap in the codex. This one's new. Wonderful."],pious:["Even locks answer to providence. I just expedite.","I confess in advance. Saves time."],reckless:["Traps are just puzzles with stakes.","I disarm faster when it's already ticking."],craven:["There's a wire there. I noticed it while planning my retreat.","I've counted the exits. There are three. I love them all."],generic:["Give me a moment, and don't watch.","Nobody move. Especially the floor."]},[q.ALCHEMIST]:{brave:["I've drunk worse than whatever that is.","Every explosion is a lesson. Class is in session."],cunning:["Measure twice, pour once.","Add nothing until you know what it does. Then add plenty."],greedy:["Gold in, gold out — that's the whole science.","Everything in this room fits in my satchel if I believe.","Don't burn the carcass — half my income is in the glands."],scholarly:["The notes end mid-sentence. I intend to finish them.","Peer review can wait. The flask can't."],pious:["The Work is a devotion. The explosions are incidental.","As above, so below. Mind the fumes between."],reckless:["Shake it and see.","If it smokes, it works. If it screams, it works better."],craven:["I keep my hazards bottled, thank you.","Run first. The reaction can finish without us."],generic:["I have something for this. Probably.","Don't breathe in until I say."]}},e_=4;let Ms=[];function t_(i,e=[],t=Math.random){const n=Q0[i];if(!n)return null;const s=[];for(const l of e)n[l]&&s.push(...n[l]);s.length===0&&s.push(...n.generic);const r=s.filter(l=>!Ms.includes(l)),o=r.length>0?r:s,a=o[Math.floor(t()*o.length)];return Ms.push(a),Ms.length>e_&&Ms.shift(),a}function n_(){Ms=[]}const Yc={delve:"The party enters the Old Delve: rats, skeletons, and goblin toll-gangs between here and the boss.",crypt:"The party enters the Ancient Crypt. Most monsters here are undead — holy damage and a cleric's turning work well.",volcanic:"The party enters the Cinder Galleries. Fire traps hit harder here, and most monsters resist fire but hate frost.",library:"The party enters the Drowned Athenaeum. Extra libraries to study in; several of its monsters burn easily.",madlab:"The party enters the Mad Alchemist's Dungeon. A lab is guaranteed, materials are common, and much of what lives here is venomous.",castle:"The party enters the Castle of the Vampire Lord. Treasure is plentiful; most of the household is undead or ethereal.",bogcellar:"The party enters the Root Cellar of the Bog Witch. Poison traps and venomous monsters, with a stillroom lab guaranteed.",icecaverns:"The party enters the Ice Caverns of the Mad Pyromancer. Disasters are frequent, and fire and frost weaknesses run through everything."},jc={castle:"The candles go out: the castle itself attacks the party in the dark.",bogcellar:"A shelf of jars breaks over the party; what spills is corrosive and moving.",icecaverns:"A fire vent meets the cavern ice: a scalding steam blast fills the room.",volcanic:"Lava surges into the passage; the party must get clear before it closes the way.",crypt:"The tomb lids open at once and the dead press in from every side.",library:"The stacks collapse and the floodwater rises; falling shelves and water both do damage.",madlab:"An unattended reaction runs out of control and fills the room with caustic vapor."},La={entrance:["The party gathers at the dungeon entrance and starts down."],corridor:["A connecting corridor. Nothing blocks the way; the party moves through."],stairs:["A stair cut into the rock, going down. Cold air comes up it.","The floor ends at a stairwell. Whatever is below has been waiting longer.","Steps down, worn in the middle by traffic that stopped a long time ago."],monster:["A monster holds the room. The party must decide how to get past it."],trap:["A trap blocks the corridor. The party must disarm it, avoid it, or take the hit."],treasure:["A treasure chest sits in the room. It may hold gold; it may be a mimic."],library:["A library. The party can study here to learn spells."],shrine:["A shrine. Resting here heals the party; the gold leaf on the altar could be stripped instead."],lab:["An alchemy lab with a working bench. An alchemist with materials can brew or coat weapons here."],materials:["A room of herbs, salts, and quicksilver — alchemy materials, free to gather."],disaster:["The dungeon itself turns hostile. The party must brace together or scatter."],boss:["The boss chamber. Killing what waits here clears the dungeon."],vault:["A hidden vault, stacked with treasure. Vaults always hold something beyond coin."]};function i_(i,e=null){var r;const t=i.living().find(o=>o.class===q.ROGUE),n=t?t.name:((r=i.living()[0])==null?void 0:r.name)||"Someone",s=e!=null&&e.tell?` Behind it: ${e.tell}.`:"";return`🕳️ ${n} finds a hidden door into ${(e==null?void 0:e.name)||"a side passage"}.${s} Its rooms join the route.`}function s_(i,e){return`🗝️ ${e} pockets ${i.name}. Somewhere below there is a door it belongs to.`}function Kc(i,e){const t=(i==null?void 0:i.door)||"a locked door",n=(i==null?void 0:i.name)||"a side passage";if(!e.opened)return`🔒 ${n[0].toUpperCase()}${n.slice(1)} is shut behind ${t}. Nobody here can open it, and the party walks on.`;switch(e.how){case"key":return`🗝️ ${t[0].toUpperCase()}${t.slice(1)} — and the party is carrying ${i.keyName}. ${n[0].toUpperCase()}${n.slice(1)} opens.`;case"picked":return`🗝️ ${t[0].toUpperCase()}${t.slice(1)}. The rogue has it open in the time it takes to say so, and quietly.`;case"knock":return`💥 ${e.source||"Knock"} takes ${t} off its fastenings. ${n[0].toUpperCase()}${n.slice(1)} is open, and everything below heard it.`;case"forced":return e.lever?`💪 ${t[0].toUpperCase()}${t.slice(1)} comes off its hinges under the prybar. ${n[0].toUpperCase()}${n.slice(1)} is open, and that was not quiet.`:`💪 ${t[0].toUpperCase()}${t.slice(1)} goes down under somebody's shoulder: ${e.damage} damage taken doing it, and everything below heard.`;default:return`🔒 ${n} opens.`}}function Jc(i,e=null,t=null){const n=(e==null?void 0:e.name)||"the side passage",s=e!=null&&e.tell?` — ${e.tell}`:"",r=e!=null&&e.tell?` (${e.tell})`:"";return i?t?`🧭 ${t[0].toUpperCase()}${t.slice(1)}: the party turns off into ${n}. Its rooms join the route.`:`🧭 The party turns off into ${n}${s}. Its rooms join the route.`:`🚶 The party looks into ${n}${r} and keeps to the main route.`}function Zc({outcome:i,rooms:e,damage:t,floors:n=0,finder:s}){const r=n>0?` on ${Ss(n)}`:"";return i==="descend"?`🕳️ ${s} finds a trapdoor in the floor. The party ropes down the shaft and lands${r}, skipping ${e} room${e===1?"":"s"} ahead and taking ${t} damage.`:i==="refused"?`🕳️ ${s} finds a trapdoor in the floor. The party leaves it shut: the rooms it skips hold loot as well as danger.`:i==="fell"?`🕳️ The floor gives way — a hidden trapdoor. The party lands${r||" further down the same level"}, ${e} room${e===1?"":"s"} past where they were, taking ${t} damage, and the rooms between go unlooted.`:""}const Qc={"repair-gears":"repair the gears","correct-orrery":"correct the orrery","divine-instability":"divine the unstable motion","recognize-model":"recognize the cosmological model","steady-ground":"hold the stationary floor","hurry-through":"hurry through the turning room","read-correspondences":"read the correspondences","planetary-sequence":"work the planetary sequence","material-symbolism":"read the metals","reconcile-traditions":"reconcile the traditions","divine-sequence":"divine the opening order","force-the-door":"force the door","leave-sealed":"leave it sealed","negotiate-grievance":"negotiate with it","translate-claim":"answer it in its own tongue","identify-artifact":"identify the disputed thing","investigate-claim":"investigate its claim","slip-past-grievance":"slip past it","fight-grievance":"fight it","brew-oil":"cook a material down into lamp oil",fight:"stand and fight",flee:"fall back",sneak:"sneak past","turn-undead":"turn the undead",bribe:"pay the toll","spell-strike":"open with a combat spell",disarm:"disarm the trap","push-through":"push through and take the hit","search-around":"search for a way around","spell-bypass":"bypass it with a utility spell",loot:"loot the treasure",inspect:"inspect it first","leave-it":"leave it alone",study:"study the shelves","deep-study":"read the sealed texts",rest:"rest and heal",desecrate:"strip the gold leaf","pass-by":"move on",proceed:"move on",alchemy:"work the lab bench",gather:"gather the materials",brace:"brace together",scatter:"scatter and regroup","knock-open":"open it with Knock","cause-fear":"cast Cause Fear","smoke-bomb":"spring it with a smoke bomb",descend:"take the stair down","rope-down":"rope down the shaft beside it","camp-stair":"camp at the stairhead first","shove-into-pit":"shove it into the pit","shove-onto-spikes":"put it onto the floor spikes","shove-into-chasm":"put it down the crack in the floor","topple-boulder":"topple the boulder onto it","shove-into-brazier":"shove it into the brazier","drop-portcullis":"drop the portcullis on it","fight-from-cover":"fight from behind the pillars","pry-sarcophagus":"pry the sarcophagus open","bless-the-font":"bless the font and drink","fill-waterskins":"fill the waterskins","harvest-spout":"harvest the spout","sift-rubble":"sift the rubble","crack-crates":"crack the crates open","work-the-anvil":"put an edge back on at the anvil","strip-the-shelves":"strip the shelves"},eh={brave:["the Bold voted to meet it head-on","the Bold saw no reason to be careful about it","the Bold wanted it settled here"],cunning:["the Cunning picked the safer angle","the Cunning looked for the way that costs least","the Cunning had already worked out the odds"],greedy:["the Covetous wanted the payout","the Covetous counted what was in the room first","the Covetous refused to leave anything behind"],scholarly:["the Scholarly wanted the knowledge","the Scholarly wanted a closer look before anything else","the Scholarly argued from what the books say about this"],pious:["the Devout called it the right thing to do","the Devout said the god would want it this way","the Devout would not hear of the other options"],reckless:["the Reckless did not wait for a vote","the Reckless were already moving","the Reckless settled it by going first"],craven:["the Craven pushed for the safest option","the Craven wanted no part of the alternative","the Craven argued for whatever kept a door behind them"]},r_={fight:q.FIGHTER,sneak:q.ROGUE,disarm:q.ROGUE,"turn-undead":q.CLERIC,rest:q.CLERIC,"deep-study":q.WIZARD,"spell-strike":q.WIZARD,"spell-bypass":q.WIZARD,alchemy:q.ALCHEMIST,gather:q.ALCHEMIST};function a_(i,e,t){const n=Qc[i]||i,s=e.filter(c=>c.id!==i).slice(0,2).map(c=>Qc[c.id]||c.id);let r=null;const o=r_[i];if(o&&t.hasClass(o)){const c=t.living().find(h=>h.class===o),d=t_(c.class,t.personalities);r=d?`${c.name} made the case: "${d}"`:`${c.name} made the case`}else for(const c of t.personalities)if(eh[c]){r=rn(eh[c]);break}r||(r="nobody argued");const a=r.endsWith('"')?"":".";return s.length===0?`There was only one option: the party chose to ${n}.`:`They might have chosen to ${s.length===2?`${s[0]}, or ${s[1]}`:s[0]} — ${r}${a} The party chose to ${n}.`}function o_(i,e){const t=ci[i],n=zr(t.feature),s=(n==null?void 0:n.icon)||"🧱",r=(n==null?void 0:n.name)||"the furniture";if(t.fightOnly){const l=e.featureDamage??t.openerDamage;switch(i){case"shove-into-pit":return`${s} The party shoves the monster into ${r}: ${l} damage, and it has to climb back out.`;case"shove-onto-spikes":return`${s} The party drives the monster back onto ${r}: ${l} damage, and it has to pull itself off them.`;case"shove-into-chasm":return`${s} The party works the monster to the edge and puts it into ${r}: ${l} damage on the way down.`;case"topple-boulder":return`${s} The party topples ${r} down the slope onto the monster: ${l} damage.`;case"shove-into-brazier":return`${s} The party drives the monster into ${r}: ${l} fire damage.`;case"drop-portcullis":return`${s} The winch lets go and ${r} comes down across the monster: ${l} damage.`;case"fight-from-cover":return`${s} The party backs into ${r} and makes the monster come down one aisle at a time: ${l} damage as it closes.`;default:return`${s} The party turns ${r} against the monster: ${l} damage.`}}const o=[];i==="pry-sarcophagus"?o.push(`${s} The party pries the lid off ${r}`):i==="bless-the-font"?o.push(`${s} The cleric says the words over ${r} and the party drinks`):i==="fill-waterskins"?o.push(`${s} The party fills its waterskins at ${r}`):i==="harvest-spout"?o.push(`${s} The alchemist bottles what drips from ${r}`):i==="sift-rubble"?o.push(`${s} The party sifts ${r}`):i==="crack-crates"?o.push(`${s} The party cracks open ${r}`):i==="work-the-anvil"?o.push(`${s} The party works ${r}`):i==="strip-the-shelves"?o.push(`${s} The wizard strips ${r}`):o.push(`${s} The party uses ${r}`);const a=[];return e.gold&&a.push(`${e.gold} gold`),e.materials&&a.push(`${e.materials} material${e.materials===1?"":"s"}`),e.healed&&a.push(`${e.healed} health healed`),e.spell&&a.push(`a scroll of ${e.spell} for the grimoire`),e.weaponMod&&a.push(`${e.weaponMod.name} on ${e.weaponMod.target}'s weapon (+${e.weaponMod.attack} attack)`),e.curedLinger&&a.push("the lingering venom flushed out"),`${o[0]}: ${a.length?a.join(", "):"nothing worth carrying"}.`}function Pa(i){return i.rounds?`⚔️ The party kills ${i.monster} in ${i.rounds} round${i.rounds===1?"":"s"}, taking ${i.damage} damage.`:`⚔️ ${Hi(i.monster)} is dead before the party closes: it never gets a round.`}const l_=["the entrance level","the second floor","the third floor","the fourth floor"];function Ss(i){return l_[i]||"the floor below"}const c_=["The party moves on to the next room.","Nothing here needs doing. The party walks on.","The party crosses the room and takes the far door.","There is nothing to fight and nothing to take. The party keeps going.","The party files through and leaves the room behind."];function h_(i,e,t,n){var r,o;const s=[];if(t!=null&&t.narrative){s.push(t.narrative);for(const a of t.preps||[])s.push(a.text);return s.join(" ")}if(ci[e]){s.push(o_(e,t)),ci[e].fightOnly&&s.push(t.success?t.rounds===0?`⚔️ ${Hi(t.monster)} is finished before it can strike back.`:Pa(t):`☠️ Even so, ${t.monster} beats the party down.`);for(const l of t.preps||[])s.push(l.text);return s.join(" ")}switch(e){case"fight":{const a=(r=t.itemActions)==null?void 0:r.find(l=>l.opening||l.vsUndead||l.summonAttack);if(a){const l=a.opening?`${a.opening}${a.vsUndead&&((o=i.monster)!=null&&o.undead)?` (+${a.vsUndead} vs undead)`:""} damage before round one`:a.summonAttack?`a summon adding ${a.summonAttack} attack each round`:"its effect";s.push(`🪄 ${a.member} uses the ${a.item} — ${a.name}: ${l}.`)}t.success&&t.rounds===0?s.push(`⚔️ ${Hi(t.monster)} is killed before it can strike back. The party takes no damage.`):t.success?s.push(Pa(t)):s.push(`☠️ ${Hi(t.monster)} is too strong: the party is beaten down over ${t.rounds} round${t.rounds===1?"":"s"}.`);break}case"spell-strike":{t.spell?t.spellEdge==="weak"?s.push(`🔥 The caster opens with ${t.spell}, chosen precisely for the monster's ${t.spellElement} weakness: spell damage ×1.5.`):t.spellEdge==="swarm"?s.push(`🔥 ${t.spell} opens the fight; against a swarm the spell hits ×1.5.`):t.spellEdge==="resisted"?s.push(`🔥 ${t.spell} opens the fight, but the monster resists the element: spell damage ×0.5.`):s.push(`🔥 ${t.spell} opens the fight, softening the monster before the first blow.`):s.push("🔥 No combat spell was available, so the party fights with weapons alone."),t.success&&t.rounds!==void 0?s.push(Pa(t)):t.success||s.push(`☠️ Even softened, ${t.monster} beats the party down.`);break}case"sneak":s.push(t.success?`🗡️ The rogue leads the party past ${t.monster} unseen. No damage taken; +15 score.`:`🗡️ The sneak fails: ${t.monster} notices and lands a blow before the party scrambles clear.`);break;case"turn-undead":s.push(t.success?`✨ The cleric turns the undead: ${t.monster} crumbles. +30 score.`:`✨ The turning fails: ${t.monster} attacks while the cleric recovers.`);break;case"bribe":s.push(`💰 The party pays ${t.goldSpent||15} gold and ${t.monster} lets them pass. No fight.`);break;case"cause-fear":s.push(`😱 ${t.spell||"Cause Fear"} routs ${t.monster}: the room clears without a fight. +20 score.`);break;case"smoke-bomb":s.push("⚗️ The alchemist spends 1 material on a smoke concoction and springs the trap from a safe distance. No damage taken.");break;case"knock-open":s.push(t.wasMimic?`🚪 ${t.spell} opens the chest from across the room — it was a mimic, and it springs at nothing. ${t.gold} gold taken safely.${t.consumed?" The scroll is consumed.":""}`:`🚪 ${t.spell} opens the lock at range: ${t.gold} gold taken.${t.consumed?" The scroll is consumed.":""} The noise carries through the dungeon.`);break;case"flee":s.push(rn(w_)(t.fled||1,t.damage??2));break;case"disarm":s.push(t.success?"🗝️ The rogue disarms the trap. No damage taken; +20 score.":"🗝️ The disarm fails: the trap springs for half damage.");break;case"push-through":s.push(`💥 The party pushes through the trap, taking ${t.damage} damage.${t.spotted?" The Craven spotted the tripwire first: 1 less damage.":""}`);break;case"loot":s.push(t.mimic?`🦷 The chest is a mimic. It bites for 5 damage before the party kills it, recovering ${t.gold} gold.`:`💰 The party loots the chest: ${t.gold} gold.`);break;case"inspect":s.push(`🔍 The party checks for mimics and curses first, then takes ${t.gold} gold safely.`);break;case"leave-it":s.push("🚶 The party leaves the treasure untouched and moves on.");break;case"study":s.push(`📚 The party studies the shelves and learns ${t.learned} spell${t.learned>1?"s":""}.`);break;case"deep-study":s.push(t.success?"🔏 The wizard reads the sealed texts: 2 spells learned, including a forbidden working. +50 score.":"🔏 The sealed text backfires: the wizard takes 4 damage and learns nothing.");break;case"rest":s.push(`🕯️ The party rests at the shrine: ${t.healed} health healed per member.`);break;case"desecrate":s.push("⛏️ The party strips 30 gold of leaf from the altar. The next disaster will hit harder for it.");break;case"alchemy":{const a=t.alchemy;a?a.type==="potion"?s.push(`⚗️ The alchemist spends 1 material and brews a healing draught (heals 6)${a.doubled?" — two, in fact; Perenelle works in doubles":""}.`):s.push(`⚗️ The alchemist spends 1 material and applies ${a.mod.name} to ${a.target}'s weapon: +${a.mod.attack} attack.`):s.push("⚗️ The bench is usable but the satchel is empty: no materials, nothing brewed.");break}case"gather":s.push(`🌿 The party gathers ${t.materials} bundle${t.materials>1?"s":""} of alchemy materials.`);break;case"brew-oil":s.push("⚗️ The alembic goes on the bench and a bundle of materials becomes light to march by.");break;case"brace":s.push(`🌋 The party braces together and rides it out: ${t.damage} damage taken.`);break;case"scatter":s.push(t.success?"🌋 The party scatters; nearly everyone finds cover. Minimal damage.":`🌋 The party scatters; ${t.hurt} member${t.hurt===1?"":"s"} guessed wrong and took 3 damage each.`);break;case"descend":s.push(`🪜 The party goes down the stair to ${Ss(i.descendsTo)}, ${t.supplySpent===1?"burning a march of oil on the climb":"and the lamp is already out"}.`);break;case"rope-down":s.push(`🪜 The party ropes down the shaft beside the stair and lands on ${Ss(i.descendsTo)}.`);break;case"camp-stair":{const a=t.mended?` A night off their feet sets one of ${t.mended}'s wounds.`:"";s.push(t.interrupted?`🏕️ The party makes camp at the stairhead and something climbs the stair into it: ${t.healed} healed each, ${t.damage} damage taken, and ${Ss(i.descendsTo)} still to go.${a}`:`🏕️ The party makes camp at the stairhead and eats before the climb: ${t.healed} healed each, then down to ${Ss(i.descendsTo)}.${a}`);break}default:s.push(rn(c_))}for(const a of t.preps||[])s.push(a.text);return s.join(" ")}const d_={low:[i=>`🕯️ The lantern is burning low: oil for ${i} more ${i===1?"march":"marches"}.`,i=>`🕯️ The wick is well down the oil. ${i} more ${i===1?"march":"marches"} of light, then none.`,i=>`🕯️ Someone checks the reservoir and does not like the answer: oil for ${i} more ${i===1?"march":"marches"}.`],guttered:[()=>"🕯️ The last of the oil goes. From here the party walks in the dark.",()=>"🕯️ The flame stands up, thins, and is gone. The party is out of oil.",()=>"🕯️ The lantern dies with the party still under the hill. No more light to carry."],conjured:[(i,e)=>`💡 ${i} carries the march instead of oil: none of the ${e} damage the dark would have taken.`,(i,e)=>`💡 No oil left, so ${i} does the work — light enough to walk by, and ${e} damage nobody pays.`,(i,e)=>`💡 ${i} kindles in the empty air and the party walks on seeing. The dark takes nothing.`],"sure-footed":[(i,e)=>`🪶 ${i} takes the party's weight off the floor: they walk the dark without walking into it, and pay none of the usual ${e}.`,(i,e)=>`🪶 No light, but no stumbling either — ${i} carries them through blind and whole, ${e} damage unpaid.`,(i,e)=>`🪶 ${i} means the floor never tells them what they hit. Nothing does: ${e} damage avoided.`],"dark-seen":[(i,e)=>`👁️ ${i} makes the dark no trouble: the party walks on, ${e} damage unpaid.`,(i,e)=>`👁️ ${i} reads the black like a page, and the march costs nothing.`,(i,e)=>`👁️ ${i} leads them through whole — none of the usual ${e} damage.`]},th=[i=>`🌑 The party gropes through the dark and pays for it: ${i} damage to everyone.`,i=>`🌑 Another march by touch alone. Walls, edges, and things underfoot take ${i} from each of them.`,i=>`🌑 The dark is telling now. Everyone is bleeding somewhere they cannot see: ${i} damage each.`,i=>`🌑 They have stopped calling it a march. ${i} damage to everyone, again, and the hill goes on.`];function u_(i){var t;if(!i)return null;if(i.kind==="dark"){const n=Math.max(1,i.darkMarches||1),s=th[Math.min(n,th.length)-1],r=n===1&&((t=i.temper)!=null&&t.length)?" "+i.temper.map(o=>o.text).join(" "):"";return s(i.damage)+r}const e=d_[i.kind];return e?i.kind==="conjured"||i.kind==="sure-footed"||i.kind==="dark-seen"?rn(e)(i.source,i.full):rn(e)(i.supply):null}const f_=[(i,e)=>`✚ ${i} takes a wound that will not close down here. Healing can bring them back to ${e}, no further, until town.`,(i,e)=>`✚ That one leaves a mark on ${i}. Their ceiling drops to ${e} for the rest of the delve.`,(i,e)=>`✚ ${i} is opened up badly enough that the delve will keep it: ${e} is as whole as they get until town.`],p_=[(i,e,t)=>`✚ ${i} is wounded again — ${t} scars now, and nothing can heal them past ${e} before town.`,(i,e,t)=>`✚ ${t} wounds on ${i}, and the ceiling with them: ${e}, and no more.`];function m_(i){return!i||i.length===0?null:"🕯️ "+i.map(e=>e.text).join(" ")}function g_(i,e=null){const t=i.effectiveMax?i.effectiveMax():i.maxHealth,n=i.wounds>1?rn(p_)(i.name,t,i.wounds):rn(f_)(i.name,t);return e!=null&&e.length&&i.wounds===1?`${n} ${e.map(s=>s.text).join(" ")}`:n}function v_(i){if(!i||i.wounds===0)return null;const e=i.names.length===1?i.names[0]:`${i.names.slice(0,-1).join(", ")} and ${i.names[i.names.length-1]}`;return`✚ The town surgeon sets what the march only bandaged: ${i.wounds} wound${i.wounds===1?"":"s"} closed on ${e}, and full health is theirs again.`}function nh(i){if(!i)return null;const{tactic:e,reason:t,missing:n,capability:s}=i;if(t==="requires")return`${e.icon} ${e.name} is drafted but idle: it grows out of ${n.name}, and nobody in this party has learned that.`;const r={cast:"a working in the grimoire to use it on",attack:"somebody still standing"}[s]||"something this party does not have";return`${e.icon} ${e.name} is drafted but idle: it wants ${r}.`}function y_(i){return!i||i.length===0?null:`The party has drilled: ${i.map(t=>`${t.icon} ${t.name}`).join(", ")}.`}function gs(i){return`☠️ ${i.name} falls. The party's ${i.class} is dead; the survivors march on.`}function Ad(i,e){const t=i.trophies||[];if(t.length===0)return"";const n=t[t.length-1];return e?` Trophies carried out: ${t.length} (latest: ${n.icon} ${n.name}).`:` Trophies lost with them: ${t.length} (latest: ${n.icon} ${n.name}).`}function __(i,e,t=null){const n=i.members.map(r=>r.name).join(", ");return`The party is wiped out${t?` in ${t.name}`:""}. The dead: ${n}. Rooms cleared: ${e}.${Ad(i,!1)}`}function x_(i,e,t=null){const n=i.living().map(r=>r.name).join(", ");return`${t?`${t.name} is cleared`:"The dungeon is cleared"}: the boss is dead and the party walks out. Survivors: ${n}. Rooms cleared: ${e}.${Ad(i,!0)}`}function b_(i,e){return`The party returns to town after depth ${e}. Healing, potions, recruits, and the smith are all paid for in gold. The next dungeon waits at depth ${e+1}, and it will be harder: stronger monsters, deadlier traps, richer hoards.`}const w_=[(i,e)=>i>1?`💨 They back out again and it follows further this time: ${e} damage on the way.`:`💨 The party retreats, taking ${e} damage on the way out. The room stays hostile; they will have to try it again.`,(i,e)=>i>1?`💨 Out through the same door a second time, ${e} damage the toll. There is no third.`:`💨 The party gives ground, ${e} damage on the way out, and the room keeps what it was holding.`,(i,e)=>i>1?`💨 Another retreat, and it costs ${e} this time. The room is winning this by attrition.`:`💨 They fall back, paying ${e} for the room they do not take.`],M_=[i=>`They are back. ${i===2?"The room has not improved.":`This is the ${i}${i===3?"rd":"th"} time, and it knows them now.`}`,i=>`The same room again${i>3?", and the party is running out of ways to describe it":""}. Whatever is in it has had time to think.`,i=>`Back through the same door, for the ${i===2?"second":i===3?"third":`${i}th`} time. Nothing here has forgotten them.`];function Ia(i,e=null){var n;if(i!=null&&i.encounterId&&!i.visits){const s=wr(i.encounterId);if(s!=null&&s.situation)return s.situation}if((i==null?void 0:i.fled)>=2&&!i.cleared)return`They are back, and there is no backing out this time: ${((n=i.monster)==null?void 0:n.name)||"it"} is between them and the door.`+Na(i.monster);if((i==null?void 0:i.visits)>1&&!i.cleared)return rn(M_)(i.visits)+Na(i.monster);if(i.type===ie.ENTRANCE&&e&&Yc[e.id])return Yc[e.id];if(i.type===ie.DISASTER&&e&&jc[e.id])return`${jc[e.id]} The party must brace together or scatter.`;if((i.type===ie.BOSS||i.type===ie.MONSTER)&&i.monster){const s=i.monster,r=s.attack!=null&&s.health!=null?` (attack ${s.attack}, health ${s.health})`:"";return(i.type===ie.BOSS?`The boss chamber. ${Hi(s.name)} waits at its center${r}; killing it clears the dungeon.`:`${Hi(s.name)} holds the room${r}. The party must decide how to get past it.`)+Na(s)+Da(i)}if(i.type===ie.TRAP&&i.trapType&&rh[i.trapType])return`${rn(La.trap)} ${rh[i.trapType]}${Da(i)}`;const t=La[i.type]||La.corridor;return rn(t)+Da(i)}function Da(i){const e=Hr(i);return e.length===0?"":" "+e.map(t=>t.tell).join(" ")}const ih={armored:"Plate and chitin cover it: the party's blows do 2 less damage each round.",ethereal:"It is ethereal: weapons do only 60% damage unless a cleric blesses the blades.",venomous:"It is venomous: even a won fight leaves poison working, unless a cleric cures it.",swarm:"It is a swarm: spell openings hit it ×1.5.",slow:"It is slow: the party strikes first and takes no damage in round one."},sh={fire:"It keeps clear of the torches: weak to fire (fire damage ×1.5).",frost:"It flinches from the cold: weak to frost (frost damage ×1.5).",shock:"Its hairs stand on end: weak to shock (shock damage ×1.5).",holy:"It will not face the cleric: undead take holy damage ×1.5."};function Na(i){const e=[];i.trait&&ih[i.trait]&&e.push(ih[i.trait]);const t=i.undead?"holy":(i.weak||[])[0];return t&&sh[t]&&e.push(sh[t]),e.length?" "+e.join(" "):""}const rh={fire:"Scorch marks fan out from a seam in the floor: a fire trap. A frost spell can blunt it.",poison:"Dead beetles ring one tile: a poison trap. Light damage now, lingering venom later unless a cleric cures it.",alarm:"A tripwire runs up the wall to a bell: an alarm trap. Little damage, but the next monster will be warned (+2 attack)."};function rn(i){return i[Math.floor(Math.random()*i.length)]}function Hi(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}class S_{constructor(e,t="delve",n="medium",s={}){var l,c;this.seed=t,this.difficulty=n,this.depth=Math.max(1,s.depth||1),this.party=e instanceof ai?e:new ai(e),this.dungeon=s.layout?g0(s.layout):gd(t,n,{wantLab:this.party.hasClass(q.ALCHEMIST),theme:s.theme,depth:this.depth,condition:s.condition,providence:s.providence}),this.condition=this.dungeon.condition,this.path=this.dungeon.spine.slice(),this.party.provision(this.path.length,n),this.roomIndex=0,this.turn=0,this.roomsCleared=0,this.gameOver=!1,this.victory=!1,this.paused=!1,this.epitaph=null,this.lastNarration=null,this.log=[],this.chronicle=s.chronicle instanceof Yi?s.chronicle:new Yi(this.party.members.map(d=>d.name).join(", ")||"the party"),n_(),this.chronicle.beginDelve({seed:t,difficulty:n,depth:this.depth,theme:((l=this.dungeon.theme)==null?void 0:l.name)||null,condition:this.condition&&this.condition.id!=="none"?this.condition.name:null,roster:this.party.members.map(d=>`${d.icon} ${d.name} (${d.class})`+(d.backstory?` — ${d.backstory}`:""))}),this.stateBefore=zc(this);const r=m_(this.party.provisionNotes);r&&(this.log.push(r),this.chronicle.recordAside(r));const o=y_(Cs(this.party));o&&(this.log.push(o),this.chronicle.recordAside(o));for(const d of fl(this.party)){const h=nh(d);this.log.push(h),this.chronicle.recordAside(h)}const a={easy:1,medium:1.5,hard:2,nightmare:3}[n]||1;this.scoreMultiplier=a*(1+(((c=this.condition)==null?void 0:c.scoreBonus)||0))}addLog(e){this.log.push(e)}tick(){if(this.paused||this.gameOver)return;const e=this.log.length;try{this._tick()}finally{this.recordTick(e)}}recordTick(e=this.log.length){var s,r;const t=zc(this),n=x0(this.stateBefore,t,{turn:this.turn,room:((s=this.lastNarration)==null?void 0:s.room)||null});for(const o of this.log.slice(e))n.push({turn:this.turn,room:((r=this.lastNarration)==null?void 0:r.room)||null,field:null,icon:"·",text:o,salience:it.BEAT,described:!0});if(this.stateBefore=t,this.lastEvents=n,this.lastNarration)this.chronicle.recordRoom(this.lastNarration,n);else if(n.length)for(const o of n)this.chronicle.recordAside(o.text,o.salience)}_tick(){var M;this.turn++,this.roomIndex++;const e=this.path[this.roomIndex],t=e!==void 0?this.dungeon.getRoom(e):null;if(!t){this.finish(!0);return}const n=this.party.living(),s=new Map(this.party.members.map(_=>[_.name,_.wounds])),r=this.party.restStep(),o=u_(r);if(o&&this.addLog(o),!this.party.isAlive()){this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:"dark",predicament:Ia(t,this.dungeon.theme),deliberation:"There is no light left to decide anything by.",resolution:o+" The last of the party does not get up.",falls:this.party.members.filter(_=>!_.isAlive()).map(_=>gs(_)),aside:null},this.finish(!1);return}const a=n.filter(_=>!_.isAlive()),l=new Set(a.map(_=>_.name)),c=a.map(_=>gs(_));for(const _ of c)this.addLog(_);const d=n,h=this.party.applyLinger();if(h&&!this.party.isAlive()){this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:"linger",predicament:Ia(t,this.dungeon.theme),deliberation:"The lingering venom acts before anything can be decided.",resolution:`🐍 The venom carried from the last fight deals ${h.damage} damage, and the last of the party falls.`,falls:d.filter(_=>!_.isAlive()).map(_=>gs(_)),aside:null},this.finish(!1);return}t.visits=(t.visits||0)+1;const u=Ia(t,this.dungeon.theme),p=Ed(t,this.party),g=q0(t,this.party),v=il(t,this.party,g);this.lastResult=v,v.formation&&(this.lastFormation=v.formation);const m=d.filter(_=>!_.isAlive()&&!l.has(_.name));if((v.success!==!1||t.cleared)&&this.roomsCleared++,this.lastNarration={turn:this.turn,room:t.type,icon:t.icon,roomIndex:e,action:g,offered:p.map(_=>_.id),spellElement:v.spellElement||null,predicament:u,deliberation:a_(g,p,this.party),resolution:h_(t,g,v,this.party),falls:[...c,...m.map(_=>gs(_))],wounds:this.party.members.filter(_=>_.isAlive()&&_.wounds>(s.get(_.name)??0)).map(_=>g_(_,mr(this.party).woundNotes)),supply:this.party.supply,aside:h?h.cured?"🐍 The cleric cures the lingering venom on the march: no damage taken.":`🐍 The venom carried from the last room acts: ${h.damage} damage taken on the march.`:o},t.key&&this.party.isAlive()){const _=this.party.takeKey(t.key);if(_){const k=((M=this.party.living()[0])==null?void 0:M.name)||"Somebody";this.lastNarration.aside=[this.lastNarration.aside,s_(_,k)].filter(Boolean).join(" "),this.addLog(`🗝️ ${_.name} found.`)}}const f=this.party.isAlive()?this.dungeon.branchAt(e):null;if(f)if(f.secret){if(j0(this.party)){f.consumed=!0;for(const _ of f.rooms)this.dungeon.rooms[_].discovered=!0;this.path.splice(this.roomIndex+1,0,...f.rooms),this.lastNarration.aside=[this.lastNarration.aside,i_(this.party,f)].filter(Boolean).join(" "),this.addLog("🕳️ A hidden door!")}}else if(f.locked){f.consumed=!0;const _=Z0(this.party,f.wing);if(_.noisy&&(this.party.alarmed=!0),_.opened){const k=Xc(this.party,void 0,f.wing);k&&this.path.splice(this.roomIndex+1,0,...f.rooms);const E=Po(this.party,f.wing);this.lastNarration.aside=[this.lastNarration.aside,Kc(f,_),Jc(k,f,k?E.advocate:null)].filter(Boolean).join(" ")}else this.lastNarration.aside=[this.lastNarration.aside,Kc(f,_)].filter(Boolean).join(" ")}else{f.consumed=!0;const _=Xc(this.party,void 0,f.wing);_&&this.path.splice(this.roomIndex+1,0,...f.rooms);const k=Po(this.party,f.wing);this.lastNarration.aside=[this.lastNarration.aside,Jc(_,f,_?k.advocate:null)].filter(Boolean).join(" ")}const x=this.party.isAlive()?this.dungeon.trapdoorAt(e):null;if(x&&this.resolveTrapdoor(x),this.addLog(`${t.icon} Room ${this.roomIndex}: ${t.type} — ${g}`),v.retreated&&this.roomIndex--,!this.party.isAlive()){this.finish(!1);return}t.type===ie.BOSS&&t.cleared&&(this.party.addScore(Math.round(100*this.scoreMultiplier)),this.finish(!0))}resolveTrapdoor(e){var h,u;e.consumed=!0;const t=this.path.indexOf(e.to),n=t-this.roomIndex-1;if(t<=this.roomIndex||n<=0)return;const s=((h=this.dungeon.rooms[e.from])==null?void 0:h.floor)||0,r=((u=this.dungeon.rooms[e.to])==null?void 0:u.floor)||0,o=Math.max(0,r-s),a=!e.secret||K0(this.party);let l;if(a?l=J0(this.party)?"descend":"refused":l="fell",l==="refused"){this.lastNarration.aside=[this.lastNarration.aside,Zc({outcome:l,finder:this.trapdoorFinder()})].filter(Boolean).join(" ");return}const c=l==="descend"?Math.max(1,Math.ceil(e.fall/2)):e.fall,d=this.party.living();this.party.takeDamage(c),this.path.splice(this.roomIndex+1,n);for(const p of this.dungeon.rooms.map((g,v)=>v))p===e.to&&(this.dungeon.rooms[p].discovered=!0);this.lastNarration.aside=[this.lastNarration.aside,Zc({outcome:l,rooms:n,damage:c,floors:o,finder:this.trapdoorFinder()})].filter(Boolean).join(" "),this.lastNarration.falls=[...this.lastNarration.falls||[],...d.filter(p=>!p.isAlive()).map(p=>gs(p))],this.addLog(`🕳️ Trapdoor: ${n} room${n===1?"":"s"} skipped, ${c} damage.`),this.party.isAlive()||this.finish(!1)}trapdoorFinder(){var t;const e=this.party.living().find(n=>n.class===q.ROGUE);return e?e.name:((t=this.party.living()[0])==null?void 0:t.name)||"Someone"}finish(e){this.gameOver=!0,this.victory=e,this.epitaph=e?x_(this.party,this.roomsCleared,this.dungeon.theme):__(this.party,this.roomsCleared,this.dungeon.theme),this.addLog(e?"🏆 The dungeon is beaten!":"☠️ The party has fallen."),this.chronicle.endDelve({victory:e,epitaph:this.epitaph,roomsCleared:this.roomsCleared,score:this.party.score,gold:this.party.gold,trophies:this.party.trophies.length,survivors:this.party.living().length,turns:this.turn})}getState(){var t;const e=Math.min(this.roomIndex,this.path.length-1);return{turn:this.turn,roomIndex:this.roomIndex,currentRoomIndex:this.path[e],floor:((t=this.dungeon.rooms[this.path[e]])==null?void 0:t.floor)||0,pathLength:this.path.length,knownIdxs:[...this.path.slice(0,this.roomIndex+2),this.dungeon.spine[this.dungeon.spine.length-1]],dungeon:this.dungeon,depth:this.depth,theme:{id:this.dungeon.theme.id,name:this.dungeon.theme.name,icon:this.dungeon.theme.icon,tagline:this.dungeon.theme.tagline},condition:this.condition&&this.condition.id!=="none"?{id:this.condition.id,name:this.condition.name,icon:this.condition.icon,text:this.condition.text}:null,party:{members:this.party.members.map(n=>({name:n.name,class:n.class,icon:n.icon,health:n.health,maxHealth:n.maxHealth,attack:n.attack,defense:n.defense,mind:n.mind,alive:n.isAlive(),wounds:n.wounds,effectiveMax:n.effectiveMax(),equipment:n.equipment.map(s=>s.name),weaponMods:n.weaponMods.map(s=>s.name)})),reserve:this.party.reserve.map(n=>({name:n.name,class:n.class,icon:n.icon})),supply:this.party.supply,gold:this.party.gold,score:this.party.score,materials:this.party.materials,poisonLinger:this.party.poisonLinger||0,alarmed:!!this.party.alarmed,potions:this.party.potions.length,trophies:this.party.trophies.map(n=>({name:n.name,icon:n.icon})),grimoire:this.party.grimoire.map(n=>n.name),spellsLearned:this.party.spellsLearned,personalities:this.party.personalities,formation:this.lastFormation||"line",tactics:Cs(this.party).map(n=>({name:n.name,icon:n.icon})),dormantTactics:fl(this.party).map(n=>nh(n))},gameOver:this.gameOver,victory:this.victory,epitaph:this.epitaph,narration:this.lastNarration,log:this.log.slice(-12)}}getChronicle(){return this.chronicle}getRunResult(){return{score:this.party.score,gold:this.party.gold,roomsCleared:this.roomsCleared,turns:this.turn,victory:this.victory,survivors:this.party.living().length,partySize:this.party.members.length,spellsLearned:this.party.spellsLearned,trophies:this.party.trophies.length,epitaph:this.epitaph}}setPaused(e){this.paused=e}}const T_=new Map(Uo.map(i=>[i.id,i.effect])),Rd=12,ah={perRound:Rd,perFight:2.5,perRoom:2,oneShot:1,situational:.5,resource:3},E_={flankDamage:"perRound",cover:"perRound",monsterAtk:"perRound",vsArmored:"perRound",wardPerCast:"perRound",ward:"perRound",burn:"perRound",sustain:"perRound",attack:"perRound",defense:"perRound",opening:"perFight",damage:"perFight",featureOpener:"perFight",summonAttack:"perRound",extraCast:"perRoom",heal:"perRoom",supply:"resource",mendAtShrine:"resource",materials:"resource",potions:"resource",health:"perRound",mind:"perFight",fireTrapSoak:"situational",campSupply:"situational",hazardDamage:"perFight",vsUndead:"situational",selfHarm:"perFight",light:"resource"},A_={defense:1/3,health:1,mind:1/2},R_=new Set(["monsterAtk","selfHarm"]),C_={sustainFull:12,allSpellsArea:10,noSelfHarm:6,undeadQuelled:4,revealEthereal:5,campWatched:4,hazardShoves:8,consumes:-2};function vs(i={}){let e=0;const t=[],n=[];for(const[s,r]of Object.entries(i)){if(s==="flankMin")continue;if(typeof r=="boolean"){if(!r)continue;const h=C_[s];if(h===void 0){n.push(s);continue}e+=h,t.push({key:s,kind:"flag",worth:h});continue}if(typeof r!="number"||r===0)continue;const o=E_[s];o||n.push(s);const a=ah[o]??ah.oneShot,l=A_[s]??1,c=R_.has(s)?r<0:r>0,d=Math.abs(r)*l*a*(c?1:-1);e+=d,t.push({key:s,kind:o||"unscaled",face:r,conversion:l,scale:a,worth:d})}return{total:e,parts:t,unknown:n}}function k_(i){if(!i)return{total:0,parts:[],unknown:[]};switch(i.type){case"character":{const e=i.stats||{};return vs({health:(e.health||0)/Rd,attack:e.attack||0,defense:e.defense||0,mind:e.mind||0})}case"equipment":{const e={...i.bonus||{}};for(const t of Object.values(i.classActions||{}))for(const[n,s]of Object.entries(t))typeof s=="number"&&(e[n]=Math.max(e[n]||0,s));return vs(e)}case"spell":{const e=i.power||0;return vs({damage:e,sustain:i.use==="utility"?0:e*.5})}case"tactic":{const e=i.effect||T_.get(i.id)||{};return vs(e)}default:return vs({})}}const Ua={scholars:{name:"the Scholars",icon:"📚",text:"Librarians, translators, and the university men."},guild:{name:"the Craft Guild",icon:"⚒️",text:"Smiths, printers, tinkers, and their apprentices."},nobles:{name:"the Noble Houses",icon:"👑",text:"Patrons, courtiers, and everyone who wants their ear."},clergy:{name:"the Clergy",icon:"🕯️",text:"The chapter house, the almshouse, and the tribunal."},merchants:{name:"the Merchants",icon:"⚖️",text:"The market, the moneylenders, the caravan masters."},underworld:{name:"the Underworld",icon:"🗝️",text:"Fences, gangs, and the people who know where things went."}};function oh(i){return i>=60?"allied":i>=25?"friendly":i>-25?"neutral":i>-60?"wary":"hostile"}class L_{constructor(){this.factions=Object.fromEntries(Object.keys(Ua).map(e=>[e,0])),this.npcs={},this.log=[],this.resolved=new Set,this.unlocked=new Set,this.lastVisitDepth=-1}standing(e){return this.factions[e]??0}standingOf(e){return oh(this.standing(e))}adjustFaction(e,t,n=null){if(!(e in this.factions))return 0;const s=this.factions[e];return this.factions[e]=Math.max(-100,Math.min(100,s+t)),n&&this.remember({kind:"faction",faction:e,delta:t,text:n,standing:this.factions[e]}),this.factions[e]}allies(){return Object.keys(this.factions).filter(e=>this.factions[e]>=25)}enemies(){return Object.keys(this.factions).filter(e=>this.factions[e]<=-25)}npc(e,t=null){return this.npcs[e]||(this.npcs[e]={id:e,name:t||e,met:!1,disposition:0,flags:new Set}),t&&(this.npcs[e].name=t),this.npcs[e]}meet(e,t){const n=this.npc(e,t);return n.met=!0,n}adjustNpc(e,t,n=null,s=null){const r=this.npc(e,s);return r.met=!0,r.disposition=Math.max(-100,Math.min(100,r.disposition+t)),n&&this.remember({kind:"npc",npc:e,delta:t,text:n,disposition:r.disposition}),r}flag(e,t){this.npc(e).flags.add(t)}hasFlag(e,t){var n;return!!((n=this.npcs[e])!=null&&n.flags.has(t))}knows(e){var t;return!!((t=this.npcs[e])!=null&&t.met)}unlock(e,t=null){this.unlocked.add(e),t&&this.remember({kind:"unlock",key:e,text:t})}has(e){return this.unlocked.has(e)}markResolved(e){this.resolved.add(e)}isResolved(e){return this.resolved.has(e)}remember(e){return this.log.push({...e,at:this.log.length}),e}recent(e=3){return this.log.slice(-e)}priceMultiplier(){let t=1-this.standing("merchants")/100*.25;return this.has("supplier")&&(t-=.08),this.standing("underworld")>=25&&(t-=.05),this.standing("guild")<=-25&&(t+=.12),Math.max(.7,Math.min(1.35,Math.round(t*100)/100))}hostility(){let t=this.enemies().length*.12;return this.standing("underworld")<=-40&&(t+=.15),this.has("peacemaker")&&(t-=.2),Math.max(0,Math.min(.75,Math.round(t*100)/100))}summary(){return{factions:Object.entries(this.factions).map(([e,t])=>({id:e,name:Ua[e].name,icon:Ua[e].icon,value:t,label:oh(t)})),allies:this.allies(),enemies:this.enemies(),unlocked:[...this.unlocked],knownNpcs:Object.values(this.npcs).filter(e=>e.met).map(e=>({id:e.id,name:e.name,disposition:e.disposition,flags:[...e.flags]})),priceMultiplier:this.priceMultiplier(),hostility:this.hostility(),log:this.log.slice()}}}const Ts={manuscripts:{name:"the Recovery of Books",icon:"📜",keywords:["book","books","manuscript","manuscripts","library","libraries","alexandria","archive","archives","codex","text","texts","scroll","scrolls","read","reading","lost words"],weightTweaks:{library:1.2,treasure:.3},favors:["town-bookseller","town-closed-apothecary"]},mechanisms:{name:"the Mastery of Machines",icon:"⚙️",keywords:["machine","machines","mechanism","mechanisms","clock","clockwork","engine","device","instrument","instruments","gear","gears","automaton","press","build","invent"],weightTweaks:{trap:.8,corridor:.6},favors:["astronomers-chamber","town-printers-breakdown"]},stars:{name:"the Reading of the Heavens",icon:"🔭",keywords:["star","stars","heaven","heavens","sky","planet","planets","astrology","astronomy","celestial","orrery","horoscope","prophecy","omen","omens","fate","foresee"],weightTweaks:{corridor:.8,library:.4},favors:["astronomers-chamber","town-astrologer"]},spirits:{name:"the Conversation with Spirits",icon:"👻",keywords:["spirit","spirits","angel","angels","demon","demons","dead","ghost","ghosts","summon","summoning","conjure","conjuring","seance","scrying","beyond","speak with"],weightTweaks:{monster:.6,shrine:.8},favors:[]},substances:{name:"the Perfection of Matter",icon:"⚗️",keywords:["alchemy","alchemical","stone","elixir","transmute","transmutation","gold","mercury","sulphur","salt","distill","furnace","laboratory","medicine","cure","panacea"],weightTweaks:{lab:1.2,materials:.8},favors:["town-closed-apothecary"]},people:{name:"the Winning of Hearts",icon:"🤝",keywords:["court","courtier","patron","patronage","friend","friends","ally","allies","reputation","name","fame","famous","noble","nobles","diplomacy","peace","persuade"],weightTweaks:{monster:-.3,treasure:.3},favors:["town-public-debate","town-tavern-brawl","town-remembers"]},wealth:{name:"the Filling of the Purse",icon:"💰",keywords:["gold","wealth","rich","riches","fortune","treasure","coin","money","hoard","profit","debt","debts","pay","buy","collection","collector"],weightTweaks:{treasure:1,vault:.5},favors:["town-street-thief","town-bookseller"]},ruin:{name:"the Facing of Ruin",icon:"🌋",keywords:["revenge","vengeance","ruin","destroy","destruction","burn","war","blood","kill","slay","monster","monsters","beast","hunt","avenge","died","death"],weightTweaks:{monster:1,disaster:.5},favors:[]}};function P_(i){if(!i||typeof i!="string")return[];const e=i.toLowerCase().match(/[a-z']+/g)||[],t=new Set(e),n=[];for(const[s,r]of Object.entries(Ts)){let o=0;for(const a of r.keywords)a.includes(" ")?i.toLowerCase().includes(a)&&o++:t.has(a)&&o++;o>0&&n.push({id:s,hits:o})}return n.sort((s,r)=>r.hits-s.hits),n.slice(0,2).map(s=>s.id)}const I_=240;class D_{constructor(){this.destinies=[],this.log=[]}setDestiny(e,t,n){const s=String(n||"").slice(0,I_),r=P_(s),o=this.destinies.findIndex(l=>l.characterId===e),a={characterId:e,characterName:t,text:s,themes:r};return o>=0?this.destinies[o]=a:this.destinies.push(a),a}destinyFor(e){return this.destinies.find(t=>t.characterId===e)||null}themes(){return[...new Set(this.destinies.flatMap(e=>e.themes))]}hasThemes(){return this.themes().length>0}weightTweaks(e=Math.random(),{chance:t=.6,strength:n=.7}={}){const s=this.themes();if(s.length===0||e>t)return{};const r={};for(const o of s){const a=Ts[o];if(a)for(const[l,c]of Object.entries(a.weightTweaks))r[l]=(r[l]||0)+c*n}return r}favoredEncounters(){return[...new Set(this.themes().flatMap(e=>{var t;return((t=Ts[e])==null?void 0:t.favors)||[]}))]}recordTest(e,t){this.log.push({characterId:e,text:t,at:this.log.length})}summary(){return{destinies:this.destinies.map(e=>({characterId:e.characterId,characterName:e.characterName,text:e.text,themes:e.themes.map(t=>({id:t,name:Ts[t].name,icon:Ts[t].icon}))})),log:this.log.slice()}}}function N_(i){let e=0;return i.hasCapability("divination")&&(e+=2),i.hasCapability("astronomy")&&(e+=1),i.hasCapability("observation")&&(e+=1),i.hasCapability("memory")&&(e+=1),e}const U_={[ie.MONSTER]:{tag:"creatures",capabilities:["tactics","conjuring"]},[ie.BOSS]:{tag:"a guardian",capabilities:["tactics"]},[ie.TRAP]:{tag:"mechanisms",capabilities:["tinkering","rogue"]},[ie.TREASURE]:{tag:"hoards",capabilities:["appraisal"]},[ie.VAULT]:{tag:"a sealed vault",capabilities:["appraisal","rogue"]},[ie.LIBRARY]:{tag:"books",capabilities:["knowledge","antiquarian","memory"]},[ie.SHRINE]:{tag:"sacred ground",capabilities:["healing","harmony"]},[ie.LAB]:{tag:"apparatus",capabilities:["alchemy","experimentation"]},[ie.MATERIALS]:{tag:"raw substances",capabilities:["alchemy"]},[ie.DISASTER]:{tag:"unstable ground",capabilities:["tactics","naturalPhilosophy"]},[ie.STAIRS]:{tag:"a way down",capabilities:["navigation"]}};function lh(i){const e=nl(i);return!e||!e.options?[]:[...new Set(e.options.flatMap(t=>t.requires||[]))]}function O_(i,e){var p;const t=N_(i),n=(e==null?void 0:e.rooms)||[];if(t===0)return{clarity:0,blind:!0,headline:"Nobody in the party reads what is coming.",lines:["🕯️ The descent is made blind: whatever the dungeon asks, it will ask without warning."],demands:[],answered:[],unanswered:[]};const s={},r=new Set;for(const g of n){if(g.type===ie.ENTRANCE||g.type===ie.CORRIDOR){for(const m of lh(g))r.add(m);g.encounterId&&(s.situations=(s.situations||0)+1);continue}const v=U_[g.type];if(v){s[v.tag]=(s[v.tag]||0)+1;for(const m of v.capabilities)r.add(m);for(const m of lh(g))r.add(m)}}const o=i.capabilities(),a=[...r],l=a.filter(g=>o.has(g)),c=a.filter(g=>!o.has(g)),d=[],h=Object.entries(s).sort((g,v)=>v[1]-g[1]);if(h.length>0){const g=t>=3?h.map(([v,m])=>`${m}× ${v}`).join(", "):h.slice(0,3).map(([v])=>v).join(", ");d.push(`🔮 The descent holds ${g}.`)}if(t>=3){const g=[...new Set(n.filter(m=>m.trapType).map(m=>m.trapType))];g.length&&d.push(`⚠️ Snares run to ${g.join(" and ")}.`);const v=n.filter(m=>{var f;return(f=m.monster)==null?void 0:f.undead}).length;v>0&&d.push(`💀 ${v} of what waits there is already dead.`)}if(t>=4){const g=(p=n.find(v=>v.type===ie.BOSS))==null?void 0:p.monster;g&&d.push(`🐉 At the bottom: ${g.name} (attack ${g.attack}, health ${g.health}).`)}if(c.length>0){const g=c.map(v=>{var m;return((m=Ps[v])==null?void 0:m.name)||v});d.push(`❓ Nothing the party carries answers: ${g.join(", ")}.`)}if(l.length>0&&t>=3){const g=l.map(v=>{var m;return((m=Ps[v])==null?void 0:m.name)||v});d.push(`✅ The party is already equipped for: ${g.join(", ")}.`)}const u=t>=4?"The figure is drawn clean: the descent is legible end to end.":t>=3?"The reading comes through clearly enough to plan around.":"The reading is partial — shapes, not particulars.";return{clarity:t,blind:!1,headline:u,lines:d,demands:a,answered:l,unanswered:c}}const Cd=[];function Wn(i){const e=$r({...i,category:"town"});return Cd.push(e),e}function F_(i,e,{count:t=2,favored:n=[]}={}){const s=Cd.filter(a=>!(a.once&&i.isResolved(a.id)||a.available&&!a.available(i)));if(s.length===0)return[];const r=e.shuffle(s.filter(a=>n.includes(a.id))),o=e.shuffle(s.filter(a=>!n.includes(a.id)));return[...r.slice(0,1),...o].slice(0,t)}Wn({id:"town-closed-apothecary",title:"The Closed Apothecary",situation:"The apothecary bolts her door when she sees the party's gear. She does not sell to adventurers; adventurers, she says, come back dead and owing.",affordances:["people","substances","books"],once:!0,options:[{id:"negotiate-access",name:"Negotiate Access",desc:"Argue that this party is different",requires:["diplomacy"],affordances:["people"],weight:1.5},{id:"offer-compounding",name:"Offer to Compound",desc:"Work her bench for an afternoon",requires:["alchemy"],affordances:["substances"],weight:1.5},{id:"discuss-text",name:"Discuss the Dispensatory",desc:"Meet her as a colleague, not a customer",requires:["medicine"],affordances:["books"],weight:1},{id:"identify-remedy",name:"Identify the Old Remedy",desc:"Recognize the jar she keeps but cannot read",requires:["antiquarian"],affordances:["books"],weight:1},{id:"shop-elsewhere",name:"Shop Elsewhere",desc:"Her loss, and the party's"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"negotiate-access":return n.adjustNpc("apothecary",30,"The party talked their way past the apothecary's bolted door.","the Apothecary"),n.adjustFaction("merchants",10,"A hard sale made honestly: the market noticed."),n.unlock("supplier","The apothecary will sell to this party now — and at her own price, not the adventurer's price."),{success:!0,narrative:"🤝 She is argued around, slowly and on the merits. The apothecary becomes a standing supplier: potions cost less from here on."};case"offer-compounding":return n.adjustNpc("apothecary",40,"The party compounded a difficult preparation at the apothecary's bench.","the Apothecary"),n.unlock("supplier","The apothecary keeps this party in stock; they earned the bench."),e.potions.push({kind:"healing-draught",heal:6}),{success:!0,narrative:"⚗️ An afternoon at her bench settles it — the work speaks. She becomes a standing supplier, and the day's yield goes into the satchel: one healing draught."};case"discuss-text":return n.adjustNpc("apothecary",25,"The party met the apothecary as colleagues over her dispensatory.","the Apothecary"),n.adjustFaction("scholars",8,"Word spreads that this party reads."),n.unlock("supplier","A colleague is served differently than a customer."),{success:!0,narrative:"💊 Two pages into the dispensatory she stops treating them as adventurers. The door opens: a standing supplier, and the scholars hear of it."};case"identify-remedy":return n.adjustNpc("apothecary",35,"The party read the label she had given up on.","the Apothecary"),n.adjustFaction("scholars",6,"An antiquarian eye did the town a small service."),e.addGold(25),{success:!0,narrative:"🏺 The unreadable jar is named — a preparation two centuries out of fashion and worth rather more than she thought. She splits the difference: 25 gold, and a door that stays open."};case"shop-elsewhere":default:return n.adjustNpc("apothecary",-5,"The party did not try the apothecary's door twice.","the Apothecary"),{success:!0,narrative:"🚶 The party buys elsewhere, worse and dearer. The apothecary watches them go."}}}});Wn({id:"town-bookseller",title:"The Bookseller's Window",situation:"A manuscript has appeared in the bookseller's window, priced like a curiosity. It may be exactly that. It may not.",affordances:["books","valuables","people"],options:[{id:"recognize-significance",name:"Recognize What It Is",desc:"Know the hand, the house, the provenance",requires:["antiquarian"],affordances:["books"],weight:2},{id:"appraise-price",name:"Appraise It",desc:"Work out what it is actually worth",requires:["appraisal"],affordances:["valuables"],weight:1.5},{id:"haggle",name:"Haggle",desc:"Talk the price down on general principle",requires:["diplomacy"],affordances:["people"],weight:1},{id:"divine-contents",name:"Divine Its Contents",desc:"Ask whether the book is worth the coin",requires:["divination"],affordances:["books"],weight:1},{id:"browse-on",name:"Browse On",desc:"Books do not fill bellies"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"recognize-significance":return n.adjustNpc("bookseller",15,"The party bought the manuscript the bookseller had underpriced.","the Bookseller"),n.adjustFaction("scholars",15,"The party recovered a manuscript the scholars had been hunting."),n.unlock("scholars-seek-you","Scholars come looking for this party now."),e.grimoire.push({id:`town-manuscript-${e.grimoire.length}`,name:"The Recovered Manuscript",icon:"📜",school:"antiquarian",power:5,use:"combat",capabilities:["knowledge"],text:"Bought for the price of a curiosity from a man who had not read it."}),{success:!0,narrative:"🏺 The hand is recognized across the glass: this is not a curiosity. It goes into the grimoire for the asking price, and the scholars will want to know who has it."};case"appraise-price":return n.adjustNpc("bookseller",-5,"The party made the bookseller feel the price he had asked.","the Bookseller"),e.addGold(40),n.adjustFaction("merchants",5,"A clean trade, sharply made."),{success:!0,narrative:"💰 Its real value is worked out on the spot, bought, and turned over the same afternoon: 40 gold clear. The bookseller will price the next one himself."};case"haggle":return n.adjustNpc("bookseller",20,"The party haggled the bookseller into a friendship.","the Bookseller"),n.unlock("book-credit","The bookseller will hold things back for this party."),e.addGold(15),{success:!0,narrative:"🤝 The haggling goes on long enough to become a conversation, and ends in credit rather than a sale: 15 gold saved, and he will hold the next one back."};case"divine-contents":return n.adjustFaction("scholars",5,"A diviner read a book without opening it. Word gets around."),e.spellsLearned+=1,e.addScore(20),{success:!0,narrative:"🔮 The book is read without being opened: most of it is filler, but one working is real. It is copied out on the spot, unpurchased. +1 spell learned."};case"browse-on":default:return{success:!0,narrative:"🚶 The party admires the window and buys nothing."}}}});Wn({id:"town-tavern-brawl",title:"The Tavern Brawl",situation:"An argument two tables over is escalating past the point where anyone remembers what it was about. Half the room is standing up.",affordances:["people","hazard"],options:[{id:"defuse",name:"Defuse It",desc:"Get between them before the first chair moves",requires:["diplomacy"],affordances:["people"],weight:2},{id:"play-them-down",name:"Play Them Down",desc:"Give the room something else to listen to",requires:["music"],affordances:["people"],weight:1.5},{id:"find-the-instigator",name:"Find Who Started It",desc:"Somebody wanted this fight",requires:["observation"],affordances:["people"],weight:1},{id:"brace-the-room",name:"Take the Wall",desc:"Put the party somewhere the brawl cannot flank",requires:["tactics"],position:{formed:!0},weight:1},{id:"wade-in",name:"Wade In",desc:"It is only a tavern fight"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"defuse":return n.adjustFaction("merchants",8,"The party talked a tavern brawl down before it cost anyone a window."),n.unlock("peacemaker","The taverns count this party as a calming presence."),{success:!0,narrative:"🤝 The party gets between them and talks until both sides are embarrassed. The room sits back down. The publican remembers who did that."};case"play-them-down":return n.adjustFaction("merchants",6,"A brawl became a performance."),n.unlock("peacemaker","The taverns will have this party back."),e.addGold(12),{success:!0,narrative:"🎵 Somebody starts playing. It is the wrong moment for it, which is exactly why it works — the room turns to listen and forgets the quarrel. The hat comes back with 12 gold in it."};case"find-the-instigator":return n.adjustFaction("underworld",-10,"The party exposed a gang's paid provocateur."),n.adjustFaction("merchants",10,"The party found out who was really starting tavern fights."),n.unlock("knows-instigator","The party knows who pays for trouble in this town."),{success:!0,narrative:"👁️ Watching rather than intervening pays: one man has been steering this from the start and leaves before it breaks. The party knows the face now. So do the merchants, shortly."};case"brace-the-room":return n.adjustFaction("merchants",3,"The party stayed out of a brawl that broke around them."),{success:!0,narrative:"🎯 The party takes the wall at the room's narrow end and the brawl breaks around them like water. Nobody in the party spills a drink."};case"wade-in":default:return e.takeDamage(3),n.adjustFaction("merchants",-12,"The party joined a tavern brawl and made it worse."),n.adjustFaction("clergy",-5,"The chapter house heard about the tavern."),n.adjustNpc("publican",-25,"The party fought in the publican's house.","the Publican"),{success:!1,damage:3,narrative:"👊 The party wades in and the brawl becomes a proper one: 3 damage, a broken table nobody will pay for, and a publican who now watches the door when they enter."}}}});Wn({id:"town-printers-breakdown",title:"The Printer's Breakdown",situation:"The press has seized mid-run. The printer is standing in front of it with ink to the elbow, saying nothing, which is worse than shouting.",affordances:["mechanism","people","books"],once:!0,options:[{id:"repair-press",name:"Repair the Press",desc:"Get inside the frame and find the fault",requires:["tinkering"],affordances:["mechanism"],weight:2},{id:"diagnose-fault",name:"Diagnose the Fault",desc:"Reason out what a press does when it does this",requires:["naturalPhilosophy"],affordances:["mechanism"],weight:1.5},{id:"proof-the-run",name:"Proof the Run",desc:"The sheets already printed are full of errors",requires:["translation"],affordances:["books"],weight:1},{id:"negotiate-terms",name:"Negotiate Terms",desc:"Fix it, but agree what fixing it is worth",requires:["diplomacy"],affordances:["people"],weight:1},{id:"leave-him-to-it",name:"Leave Him To It",desc:"Not the party's press"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"repair-press":return n.adjustFaction("guild",20,"The party repaired the town press when the printer could not."),n.adjustNpc("printer",35,"The party got the press running again.","the Printer"),n.unlock("printer-owes-you","The printer will run maps and broadsides for this party."),{success:!0,narrative:"🔧 A bent pin in the frisket, found by hand and drawn out. The press runs. The printer will print anything this party asks for now — maps included."};case"diagnose-fault":return n.adjustFaction("guild",12,"The party reasoned out the press's fault from first principles."),n.adjustNpc("printer",25,"The party explained the press to the printer.","the Printer"),n.unlock("printer-owes-you","The printer listens to this party."),{success:!0,narrative:"🌿 Not magic and not sabotage: damp paper swelling against the platen, reasoned out loud until the printer sees it himself. He is grateful and slightly annoyed, in that order."};case"proof-the-run":return n.adjustFaction("scholars",12,"The party caught errors in the town's printed sheets."),e.addGold(20),{success:!0,narrative:"🌐 The printed sheets are proofed while the press is down — three errors that would have been quoted for a century, caught. 20 gold for the afternoon, and the scholars hear about it."};case"negotiate-terms":return n.adjustFaction("guild",8,"The party did the guild a service and charged for it properly."),e.addGold(45),{success:!0,narrative:"🤝 The repair is agreed before it is attempted, at a rate that reflects a stopped press: 45 gold. The printer respects that more than charity."};case"leave-him-to-it":default:return{success:!0,narrative:"🚶 The party leaves the printer with his press and his silence."}}}});Wn({id:"town-astrologer",title:"The Astrologer's Warning",situation:"An astrologer has been waiting for the party specifically. He has drawn a figure for the next descent and does not like it.",affordances:["astral","people","books"],options:[{id:"read-the-figure",name:"Read the Figure Yourself",desc:"Take the chart and check his work",requires:["astronomy"],affordances:["astral"],weight:2},{id:"deepen-the-reading",name:"Deepen the Reading",desc:"Ask the question he did not think to ask",requires:["divination"],affordances:["astral"],weight:2},{id:"name-the-technique",name:"Name the Technique",desc:"Whose method is this, and is it any good?",requires:["knowledge"],affordances:["books"],weight:1},{id:"pay-and-listen",name:"Pay and Listen",desc:"Take the reading at face value"},{id:"wave-him-off",name:"Wave Him Off",desc:"The stars have been wrong before"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"read-the-figure":return n.adjustNpc("astrologer",20,"The party checked the astrologer's work and improved it.","the Astrologer"),n.unlock("sharper-omens","The party reads the next descent more clearly than the astrologer did."),e.starBlessed=!0,{success:!0,narrative:"🔭 His arithmetic is sound and his interpretation is not. Corrected, the figure says something more useful — and the party descends under a favorable aspect (the next fight begins warded)."};case"deepen-the-reading":return n.adjustNpc("astrologer",25,"The party asked the astrologer a better question than his own.","the Astrologer"),n.unlock("sharper-omens","The omens run clearer for this party."),e.forewarned=!0,{success:!0,narrative:'🔮 The right question is put to the figure — not "what waits" but "what is the party walking into first." The answer is specific enough to act on: forewarned against the next snare.'};case"name-the-technique":return n.adjustFaction("scholars",8,"The party placed an astrological method by name and century."),e.addScore(20),{success:!0,narrative:"📖 The method is named, along with the century it went out of fashion and the reason. The astrologer is delighted; nobody has talked shop with him in years. +20 score."};case"pay-and-listen":return e.gold=Math.max(0,e.gold-10),n.adjustNpc("astrologer",10,"The party paid the astrologer for a reading.","the Astrologer"),{success:!0,narrative:"🕯️ Ten gold for a reading taken on trust. It is ominous, unspecific, and entirely sincere."};case"wave-him-off":default:return n.adjustNpc("astrologer",-15,"The party waved the astrologer away in the street.","the Astrologer"),{success:!0,narrative:"🚶 The astrologer is waved off mid-sentence. He folds the chart carefully, which is somehow worse than if he had argued."}}}});Wn({id:"town-public-debate",title:"The Public Debate",situation:"A visiting philosopher is holding forth in the square, and has just invited anyone who disagrees to say so in front of everyone.",affordances:["people","books"],options:[{id:"take-the-floor",name:"Take the Floor",desc:"Meet the thesis head-on",requires:["debate"],affordances:["people"],weight:2},{id:"reconcile",name:"Reconcile the Positions",desc:"Show both sides they are arguing past each other",requires:["syncretism"],affordances:["people"],weight:1.5},{id:"unconventional-thesis",name:"Advance Something Stranger",desc:"Change what the argument is about",requires:["imagination"],affordances:["people"],weight:1.5},{id:"cite-the-source",name:"Cite the Source",desc:"He is quoting someone, imperfectly",requires:["knowledge"],affordances:["books"],weight:1},{id:"listen",name:"Listen",desc:"Stay at the back and learn the room"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"take-the-floor":return n.adjustFaction("scholars",20,"The party won a public debate in the square."),n.adjustFaction("clergy",-6,"The chapter house did not care for the party's argument."),e.addScore(30),{success:!0,narrative:"💬 The thesis is met on its own ground and does not survive the encounter. The square notices. The scholars notice more; the chapter house notices differently. +30 score."};case"reconcile":return n.adjustFaction("scholars",14,"The party reconciled two positions the square had been shouting about."),n.adjustFaction("clergy",8,"The party made peace where an argument was heading somewhere worse."),e.addScore(25),{success:!0,narrative:"☯️ The two positions turn out to be one position and a vocabulary problem. Both men leave believing they won, which is the mark of it being done properly. +25 score."};case"unconventional-thesis":return n.adjustFaction("scholars",10,"The party said something in the square nobody had heard before."),n.adjustFaction("clergy",-12,"The party said something in the square the clergy wishes they had not."),e.addScore(35),{success:!0,narrative:"✨ The party does not answer the question; it replaces it. Half the square is delighted and the other half is writing down names. +35 score."};case"cite-the-source":return n.adjustFaction("scholars",12,"The party corrected a visiting philosopher's citation in public."),e.addScore(20),{success:!0,narrative:"📖 The quotation is corrected, with the edition and the page. The philosopher recovers well, but he has stopped improvising. +20 score."};case"listen":default:return e.addScore(5),{success:!0,narrative:"🚶 The party listens from the back and learns who in this town nods at what. +5 score."}}}});Wn({id:"town-street-thief",title:"The Street Thief",situation:"A hand that is not the party's goes into the party's purse in the crowded part of the market.",affordances:["people","valuables"],options:[{id:"catch-them",name:"Catch the Hand",desc:"Take the wrist before it leaves the pocket",requires:["rogue"],affordances:["people"],weight:2},{id:"cut-them-off",name:"Cut Them Off",desc:"Read the crowd and close the exit",requires:["tactics"],affordances:["people"],weight:1.5},{id:"question-them",name:"Question Them",desc:"Find out who they work for",requires:["diplomacy"],affordances:["people"],weight:1.5},{id:"let-it-go",name:"Let It Go",desc:"It was only coin"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"catch-them":return n.adjustFaction("underworld",-8,"The party caught a cutpurse in the act."),e.addGold(15),{success:!0,narrative:"🗡️ The wrist is caught before the purse clears the pocket, and the thief hands back rather more than they took: 15 gold. The gangs will hear how quickly that happened."};case"cut-them-off":return n.adjustFaction("merchants",8,"The party ran down a thief in the market without wrecking a stall."),e.addGold(10),{success:!0,narrative:"🎯 The crowd is read, the exit is closed, and the thief runs into the party rather than away from it — no stalls overturned. The market appreciates a clean job: 10 gold recovered."};case"question-them":return n.adjustFaction("underworld",12,"The party let a thief go in exchange for a name."),n.unlock("underworld-contact","Somebody in the gangs owes this party a small favor."),{success:!0,narrative:"🤝 The thief is questioned rather than handed over, and turns out to be worth more talking than punished: a name, a street, and a small standing favor from people who do not usually grant them."};case"let-it-go":default:{const s=Math.min(e.gold,20);return e.gold-=s,n.adjustFaction("underworld",4,"The party is known as an easy purse."),{success:!1,narrative:`💰 The hand leaves with ${s} gold and the party does not pursue. Word gets around the gangs about who does not pursue.`}}}}});Wn({id:"town-remembers",title:"The Town Remembers",situation:"The town has had time to form an opinion, and it has formed one.",affordances:["people"],available:i=>i.log.length>=2,options:[{id:"mend-fences",name:"Mend Fences",desc:"Go and speak to whoever the party wronged",requires:["diplomacy"],affordances:["people"],weight:2,when:(i,e)=>e.town.enemies().length>0},{id:"make-repairs",name:"Make Repairs",desc:"Fix what the party actually broke",requires:["tinkering"],weight:1.5,when:(i,e)=>e.town.standing("guild")<0},{id:"work-old-friends",name:"Work Old Friendships",desc:"Call in what the party is owed",requires:["knowledge"],affordances:["people"],weight:1.5,when:(i,e)=>e.town.allies().length>0},{id:"move-unseen",name:"Move Unseen",desc:"Do business without being recognized",requires:["rogue"],weight:1,when:(i,e)=>e.town.enemies().length>0},{id:"anticipate-retaliation",name:"Anticipate the Retaliation",desc:"Find out what is coming before it arrives",requires:["divination"],weight:1,when:(i,e)=>e.town.hostility()>.2},{id:"take-the-town-as-it-is",name:"Take the Town As It Is",desc:"Reputation is a cost of doing business"}],resolveOption(i,e,t){const{town:n}=t;switch(i){case"mend-fences":{const s=n.enemies();for(const r of s)n.adjustFaction(r,20);return n.remember({kind:"repair",text:"The party spent a day apologizing to everyone it had wronged, and meant enough of it."}),{success:!0,narrative:`🤝 A day is spent on apologies that cost something to make. ${s.length} standing${s.length===1?"":"s"} recovered — not to friendship, but out of the red.`}}case"make-repairs":return n.adjustFaction("guild",25,"The party repaired the guild property it had damaged."),n.remember({kind:"repair",text:"The party made good on guild property."}),{success:!0,narrative:"🔧 The party repairs what it broke, at its own cost and competently. The guild does not forgive it exactly, but it files it differently."};case"work-old-friends":{const s=n.allies();return e.addGold(30+s.length*15),n.remember({kind:"favor",text:"The party called in favors from the friends it had made."}),{success:!0,narrative:`📖 Old friendships are worked for what they are worth: ${30+s.length*15} gold in gifts, discounts, and debts settled early across ${s.length} standing${s.length===1?"":"s"}.`}}case"move-unseen":return n.unlock("moves-unseen","The party can do business in a town that dislikes it."),{success:!0,narrative:"🗝️ The party does its business by back doors and second-floor rooms. Nothing is mended, but nothing is closed to them either."};case"anticipate-retaliation":return n.unlock("forewarned-in-town","The party knows which grudge is about to become an ambush."),e.forewarned=!0,{success:!0,narrative:"🔮 The retaliation is seen coming: who, and roughly when. The party will not be surprised by it."};case"take-the-town-as-it-is":default:return n.hostility()>.35?(e.takeDamage(4),n.remember({kind:"violence",text:"The party was jumped in the street by people with a grievance."}),{success:!1,damage:4,narrative:"👊 The party walks the town as if nothing has changed. Something has: 4 damage in an alley, from people who were owed it."}):{success:!0,narrative:"🚶 The party walks the town as it is, and the town lets them."}}}});const wn={healPerHp:2,potion:15,piousDiscount:.75,forge:20,forgeMod:{name:"smith's edge",attack:2},shopBase:35,shopPerWorth:1.8};function B_(i,e=1){const t=Math.max(1,k_(i).total),n=wn.shopBase+t*wn.shopPerWorth;return Math.round(n*(1+.12*(e-1)))}function z_(i,e=1){const t=i.stats,n=t.health+t.attack*2+t.defense*2+t.mind;return Math.round((12+n)*(1+.15*(e-1)))}class kd{constructor(e,{seed:t="campaign",difficulty:n="medium",condition:s="none",layout:r=null}={}){this.party=e instanceof ai?e:new ai(e),this.seed=t,this.difficulty=n,this.condition=s,this.layout=r,this.depth=0,this.roomsCleared=0,this.over=!1,this.retired=!1,this.town=new L_,this.providence=new D_}delveSeed(e=this.depth+1){return`${this.seed}-depth-${e}`}nextDelve(e=void 0){return this.over?null:(this.depth++,new S_(this.party,this.delveSeed(this.depth),this.difficulty,{depth:this.depth,theme:e,condition:this.condition,layout:this.depth===1?this.layout:null,providence:this.providence}))}previewNextDelve(e=void 0){if(this.over)return null;const t=this.depth+1;if(t===1&&this.layout)return null;const n=gd(this.delveSeed(t),this.difficulty,{wantLab:this.party.hasClass(q.ALCHEMIST),theme:e,depth:t,condition:this.condition,providence:this.providence});return O_(this.party,n)}townOffers(){if(this._offerDepth!==this.depth){const e=new Ui(`${this.seed}-town-${this.depth}`);this._offerDepth=this.depth,this._townOffers=F_(this.town,e,{count:2,favored:this.providence.favoredEncounters()}).map(t=>t.id)}return this._townOffers.map(e=>wr(e)).filter(Boolean)}townContext(){return{type:"town",town:this.town,party:this.party,depth:this.depth}}townOptions(e){const t=wr(e);return t?Md(t,this.party,this.townContext()):[]}resolveTownOption(e,t){const n=wr(e);if(!n||!this.townOffers().some(r=>r.id===e)||!this.townOptions(e).some(r=>r.id===t))return null;const s=Sd(n,t,this.party,this.townContext());if(n.once&&this.town.markResolved(n.id),this._townOffers=this._townOffers.filter(r=>r!==e),this.providence.favoredEncounters().includes(e)){const r=this.providence.destinies[0];r&&this.providence.recordTest(r.characterId,`${n.title} — the world put ${r.characterName}'s destiny in their way.`)}return s}recordDelve(e){this.roomsCleared+=e.roomsCleared,e.victory||(this.over=!0)}missingHealth(){return this.party.living().reduce((e,t)=>e+(t.maxHealth-t.health),0)}healCost(){const e=this.missingHealth()*wn.healPerHp,t=this.party.hasPersonality("pious")?wn.piousDiscount:1;return Math.ceil(e*t*this.town.priceMultiplier())}potionCost(){return Math.ceil(wn.potion*this.town.priceMultiplier())}healAll(){const e=this.healCost(),t=this.missingHealth();if(t===0||this.party.gold<e)return null;this.party.gold-=e;const n=this.party.living().filter(r=>r.wounds>0),s={wounds:n.reduce((r,o)=>r+o.wounds,0),names:n.map(r=>r.name)};for(const r of this.party.living())r.mendWounds(),r.heal(r.maxHealth);return{healed:t,cost:e,mended:s}}buyPotion(){const e=this.potionCost();return this.party.gold<e?!1:(this.party.gold-=e,this.party.potions.push({kind:"healing-draught",heal:6}),!0)}shopOffers(){if(this._shopDepth!==this.depth){const e=new Ui(`${this.seed}-shop-${this.depth}`),t=new Set([...this.party.members.flatMap(s=>s.equipment.map(r=>r.id)),...this.party.reserve.flatMap(s=>s.equipment.map(r=>r.id)),...this.party.pack.map(s=>s.id),...this.party.grimoire.map(s=>s.id)]),n=[...Fo,...ks].filter(s=>!t.has(s.id)&&!s.cursed);this._shopOffers=e.shuffle(n).slice(0,3).map(s=>({card:s,price:B_(s,Math.max(1,this.depth))})),this._shopDepth=this.depth}return this._shopOffers.filter(e=>e)}buyFromShop(e,t=null){var l;const s=this.shopOffers().find(c=>c.card.id===e);if(!s||this.party.gold<s.price)return null;this.party.gold-=s.price;const r={...s.card};let o=null;r.type==="spell"?this.party.grimoire.push({...r,source:"bought"}):t?(this.party.pack.push(r),o=((l=this.party.equipTo(r.id,t))==null?void 0:l.to)||null,o||(o=this.party.assignEquipment(r))):o=this.party.assignEquipment(r);const a=this._shopOffers.findIndex(c=>c&&c.card.id===e);return this._shopOffers[a]=null,{card:r,price:s.price,wearer:o}}recruitOffers(){if(this._recruitDepth!==this.depth){const t=new Ui(`${this.seed}-hire-${this.depth}`).shuffle(Oo);this._recruitDepth=this.depth,this._recruitOffers=t.slice(0,2).map(n=>({card:n,cost:z_(n,this.depth)}))}return this._recruitOffers.filter(e=>e)}callUpReserve(){return this.party.promoteReserve()}recruit(e){const t=this.recruitOffers(),n=t.findIndex(l=>l&&l.card.id===e);if(n===-1)return null;const{card:s,cost:r}=t[n];if(this.party.gold<r)return null;this.party.gold-=r;const o=this.party.addMember(s),a=this._recruitOffers.findIndex(l=>l&&l.card.id===e);return this._recruitOffers[a]=null,o}forgeCost(){return Math.ceil((wn.forge+(this.depth-1)*4)*this.town.priceMultiplier())}forge(){const e=this.forgeCost(),t=this.party.living();if(t.length===0||this.party.gold<e)return null;this.party.gold-=e;const n=t.reduce((r,o)=>r.attack>=o.attack?r:o),s={...wn.forgeMod};return n.addWeaponMod(s),{target:n.name,mod:s}}retire(){this.over=!0,this.retired=!0}getSummary(){return{depth:this.depth,score:this.party.score,gold:this.party.gold,roomsCleared:this.roomsCleared,survivors:this.party.living().length,partySize:this.party.members.length,spellsLearned:this.party.spellsLearned,trophies:this.party.trophies.length,retired:this.retired,over:this.over,town:this.town.summary(),providence:this.providence.summary()}}}const ch={EASY:{id:"easy",name:"Easy",icon:"🌱",scoreMultiplier:1},MEDIUM:{id:"medium",name:"Medium",icon:"🌳",scoreMultiplier:1.5},HARD:{id:"hard",name:"Hard",icon:"⛰️",scoreMultiplier:2},NIGHTMARE:{id:"nightmare",name:"Nightmare",icon:"💀",scoreMultiplier:3}},hh="dungeonab_progression";class H_{constructor(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.loadFromStorage()}recordRun(e,t){this.runHistory.unshift({id:`run_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,timestamp:Date.now(),difficulty:e,score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:t.victory,survivors:t.survivors,partySize:t.partySize,depth:t.depth||1,condition:t.condition||null}),this.runHistory.length>50&&(this.runHistory=this.runHistory.slice(0,50)),(!this.bestScores[e]||t.score>this.bestScores[e])&&(this.bestScores[e]=t.score),t.victory&&(this.victories[e]=(this.victories[e]||0)+1),this.totalRuns++,this.saveToStorage()}getStats(){const e=Object.values(this.victories).reduce((t,n)=>t+n,0);return{totalRuns:this.totalRuns,totalVictories:e,bestScores:{...this.bestScores},avgScore:this.totalRuns>0?Math.round(this.runHistory.reduce((t,n)=>t+n.score,0)/Math.min(this.totalRuns,this.runHistory.length)):0}}getRecentRuns(e=5){return this.runHistory.slice(0,e)}saveToStorage(){typeof localStorage>"u"||localStorage.setItem(hh,JSON.stringify({runHistory:this.runHistory,bestScores:this.bestScores,totalRuns:this.totalRuns,victories:this.victories}))}loadFromStorage(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(hh);if(!e)return;const t=JSON.parse(e);this.runHistory=t.runHistory||[],this.bestScores=t.bestScores||{},this.totalRuns=t.totalRuns||0,this.victories=t.victories||{}}catch(e){console.error("Failed to load progression:",e)}}reset(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.saveToStorage()}}const ri=new H_;function $_(i,{seed:e,difficulty:t,condition:n,targetDepth:s}){const r=new kd(i.map(a=>({...a})),{seed:e,difficulty:t,condition:n});let o=0;for(let a=0;a<s;a++){const l=r.nextDelve();if(!l)break;let c=0;for(;!l.gameOver&&c++<500;)l.tick();if(r.recordDelve(l),o++,r.over)break}return{score:r.party.score,depthReached:o}}function G_(i,e,t={}){const{seed:n="table",difficulty:s="medium",condition:r="none",hexes:o={}}=t,a=Math.max(1,e.depth||1),l=[];for(const c of i.seats.filter(d=>d.isAI)){const d=o[c.id]?Tn(o[c.id]):null,h=d?Mh(r,d):r,u=$_(c.pool,{seed:`${n}-rival-${c.id}`,difficulty:s,condition:h,targetDepth:a});l.push({name:c.name,icon:c.icon,isPlayer:!1,hexIcon:d&&d.id!=="none"?d.icon:null,...u})}return l.push({name:"You",icon:"🗡️",isPlayer:!0,score:e.score,depthReached:a,hexIcon:e.hexIcon||null}),l.sort((c,d)=>d.score-c.score||d.depthReached-c.depthReached),l.forEach((c,d)=>{c.place=d+1}),l}const dh="dungeonab_dungeon_archive",V_=30;class W_{constructor(e=null){this.storage=e||(typeof localStorage<"u"?localStorage:null),this.entries=[],this.load()}load(){if(this.storage)try{this.entries=JSON.parse(this.storage.getItem(dh)||"[]")}catch{this.entries=[]}}persist(){if(this.storage)try{this.storage.setItem(dh,JSON.stringify(this.entries))}catch{}}save(e){var n;const t={id:`dgn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,date:Date.now(),custom:!1,...e};if(this.entries.unshift(t),this.entries.length>V_){const s=(n=this.entries.map((r,o)=>[r,o]).reverse().find(([r])=>!r.custom))==null?void 0:n[1];this.entries.splice(s!==void 0?s:this.entries.length-1,1)}return this.persist(),t}update(e,t){const n=this.entries.find(s=>s.id===e);return n?(Object.assign(n,t),this.persist(),n):null}get(e){return this.entries.find(t=>t.id===e)||null}remove(e){const t=this.entries.length;return this.entries=this.entries.filter(n=>n.id!==e),this.persist(),this.entries.length<t}list(){return this.entries}}const Mr=new W_,q_={entrance:"#8fb8dd",corridor:"#555",monster:"#c84c3c",trap:"#e8724a",treasure:"#d8a53f",library:"#b07ae8",shrine:"#e8d48a",lab:"#3cb8a8",materials:"#4a8a5c",disaster:"#e05555",boss:"#ff4444",vault:"#ffd75e",stairs:"#7a7f8a"},X_=["monster","gold","mimicChance","trapDamage","materials"];function Y_(i,e,t){const n=i.rooms.find(r=>r.index===e),s=[ie.ENTRANCE,ie.BOSS,ie.STAIRS];if(!n||s.includes(n.type)||s.includes(t))return!1;for(const r of X_)delete n[r];return n.type=t,Object.assign(n,v0(t,hi[i.themeId]||hi.delve)),!0}function j_(i,e,t){const n=i.branches[e];if(!n)return!1;n.secret=t;for(const r of n.rooms){const o=i.rooms.find(a=>a.index===r);o&&(o.secret=t)}const s=i.edges.find(r=>r.b===n.rooms[0]);return s&&(s.secret=t),!0}function uh(i,e){const t=i.getContext("2d"),n=i.width,s=i.height;t.clearRect(0,0,n,s),t.fillStyle="#0d0b08",t.fillRect(0,0,n,s);const r=T=>T.w||4,o=T=>T.h||4,a=T=>T.floor||0,l=[...new Set(e.rooms.map(a))].sort((T,I)=>T-I),c=T=>{const I=e.rooms.filter(L=>a(L)===T);return{x0:Math.min(...I.map(L=>L.x-r(L)/2)),y0:Math.min(...I.map(L=>L.y-o(L)/2)),w:Math.max(...I.map(L=>L.x+r(L)/2))-Math.min(...I.map(L=>L.x-r(L)/2)),h:Math.max(...I.map(L=>L.y+o(L)/2))-Math.min(...I.map(L=>L.y-o(L)/2))}},d=new Map(l.map(T=>[T,c(T)])),h=Math.max(...l.map(T=>d.get(T).w)),u=Math.max(...l.map(T=>d.get(T).h)),p=h+4,g=T=>l.indexOf(a(T)),v=T=>T.x-d.get(a(T)).x0+g(T)*p,m=T=>T.y-d.get(a(T)).y0,f=0,x=l.length*p-4,M=0,_=u,k=10,E=l.length>1?14:k,C=Math.min((n-k*2)/Math.max(1,x-f),(s-E-k)/Math.max(1,_-M)),R=T=>k+(v(T)-f)*C,b=T=>E+(m(T)-M)*C,y=new Map(e.rooms.map(T=>[T.index,T]));for(const T of e.edges){const I=y.get(T.a),L=y.get(T.b);if(!I||!L)continue;const B=T.kind==="trapdoor",X=T.kind==="stair";t.beginPath(),t.setLineDash(B?[1,3]:X?[2,2]:T.secret?[3,3]:[]),t.strokeStyle=B?"#c85a3c":X?"#7a7f8a":T.secret?"#d8a53f":"#4a443a",t.lineWidth=B?1:1.5,t.moveTo(R(I),b(I)),t.lineTo(R(L),b(L)),t.stroke()}t.setLineDash([]);for(const T of e.rooms){const I=Math.max(3,r(T)*C),L=Math.max(3,o(T)*C);t.fillStyle=q_[T.type]||"#777",T.shape==="rotunda"?(t.beginPath(),t.arc(R(T),b(T),Math.min(I,L)/2,0,Math.PI*2),t.fill()):t.fillRect(R(T)-I/2,b(T)-L/2,I,L),T.secret&&(t.strokeStyle="#ffd75e",t.lineWidth=1,t.strokeRect(R(T)-I/2-1.5,b(T)-L/2-1.5,I+3,L+3))}l.length>1&&(t.fillStyle="#8a7a58",t.font="9px system-ui, sans-serif",t.textAlign="left",t.textBaseline="top",l.forEach((T,I)=>{t.fillText(`Floor ${T+1}`,k+I*p*C,2)}));for(const T of e.trapdoors||[]){const I=y.get(T.from);if(!I)continue;t.fillStyle=T.secret?"#6a3a2a":"#111",t.strokeStyle="#c85a3c",t.lineWidth=1;const L=Math.max(3,C*1.4);t.fillRect(R(I)-L/2,b(I)-L/2,L,L),t.strokeRect(R(I)-L/2,b(I)-L/2,L,L)}}function K_({onDelve:i}){const e=document.getElementById("archive-overlay"),t=document.getElementById("archive-body"),n=document.getElementById("archive-btn"),s=document.getElementById("archive-close-btn"),r=l=>{const c=document.createElement("div");return c.textContent=l,c.innerHTML},o=()=>{const l=Mr.list();t.innerHTML=l.length?"":'<div class="records-empty">No dungeons archived yet. Finish a delve and its design is kept here.</div>';for(const c of l){const d=document.createElement("div");d.className="arch-item";const h=c.outcome||{};d.innerHTML=`
        <canvas width="150" height="96"></canvas>
        <div style="flex:1;min-width:0;">
          <div style="color:#d8a53f;font-weight:bold;">${c.custom?"✏️ ":""}${r(c.name||"Unnamed delve")}</div>
          <div style="color:#887755;font-size:0.72rem;">
            ${h.victory===!0?"🏆":h.victory===!1?"☠️":"📐"}
            ${c.layout.rooms.length} rooms · ${c.layout.branches.filter(u=>u.secret).length} secret ·
            ${new Date(c.date).toLocaleDateString()}
          </div>
          <div style="display:flex;gap:0.35rem;margin-top:0.4rem;flex-wrap:wrap;">
            <button data-act="delve" style="font-size:0.72rem;padding:0.3rem 0.6rem;">⚔️ Delve</button>
            <button data-act="edit" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a2213;color:#d8a53f;">✏️ Edit</button>
            <button data-act="del" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a1515;color:#e08080;">🗑️</button>
          </div>
        </div>
      `,uh(d.querySelector("canvas"),c.layout),d.querySelector('[data-act="delve"]').addEventListener("click",()=>{e.classList.remove("active"),i(c)}),d.querySelector('[data-act="edit"]').addEventListener("click",()=>a(c)),d.querySelector('[data-act="del"]').addEventListener("click",()=>{Mr.remove(c.id),o()}),t.appendChild(d)}},a=l=>{var v;const c=JSON.parse(JSON.stringify(l.layout)),d=Object.values(ie).filter(m=>m!=="entrance"&&m!=="boss");t.innerHTML=`
      <div style="display:flex;gap:0.6rem;align-items:center;margin-bottom:0.6rem;">
        <button id="arch-back" style="font-size:0.75rem;padding:0.3rem 0.6rem;background:#2a2213;color:#d8a53f;">← Back</button>
        <input id="arch-name" value="${l.name?l.name.replace(/"/g,"&quot;"):"My design"}"
          style="flex:1;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;" />
      </div>
      <canvas id="arch-edit-map" width="330" height="170" style="width:100%;border:1px solid #3a2f1e;border-radius:4px;"></canvas>
      <div id="arch-rooms" style="max-height:220px;overflow-y:auto;margin-top:0.6rem;font-size:0.78rem;"></div>
      <div id="arch-branches" style="margin-top:0.5rem;font-size:0.78rem;"></div>
      <button id="arch-save" style="width:100%;margin-top:0.8rem;padding:0.7rem;">💾 Save as My Design</button>
      <button id="arch-delve-now" style="width:100%;margin-top:0.4rem;padding:0.7rem;background:#1a2617;color:#a8d5b0;">⚔️ Delve This Design</button>
    `;const h=document.getElementById("arch-edit-map"),u=()=>uh(h,c),p=document.getElementById("arch-rooms");for(const m of c.rooms){const f=document.createElement("div");f.style.cssText="display:flex;gap:0.5rem;align-items:center;padding:0.15rem 0;border-bottom:1px dashed #2a2318;";const x=m.type==="entrance"||m.type==="boss";f.innerHTML=`
        <span style="width:1.6rem;color:#665;">#${m.index}</span>
        <span style="width:0.9rem;">${m.secret?"🕳️":""}</span>
        ${x?`<span style="color:#887755;">${m.type} (fixed)</span>`:`<select data-idx="${m.index}" style="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:3px;font-family:inherit;font-size:0.75rem;">
              ${d.map(M=>`<option value="${M}"${M===m.type?" selected":""}>${M}</option>`).join("")}
            </select>`}
      `,(v=f.querySelector("select"))==null||v.addEventListener("change",M=>{Y_(c,m.index,M.target.value),u()}),p.appendChild(f)}const g=document.getElementById("arch-branches");c.branches.forEach((m,f)=>{const x=document.createElement("label");x.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;";const M=m.name||"A side passage";x.innerHTML=`<input type="checkbox" ${m.secret?"checked":""} />
        ${M[0].toUpperCase()}${M.slice(1)} off room #${m.junction}
        (${m.rooms.length} room${m.rooms.length>1?"s":""}) is secret`,x.querySelector("input").addEventListener("change",_=>{j_(c,f,_.target.checked),u()}),g.appendChild(x)}),document.getElementById("arch-back").addEventListener("click",o),document.getElementById("arch-save").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";Mr.save({name:m,layout:c,custom:!0,seed:l.seed,outcome:{}}),o()}),document.getElementById("arch-delve-now").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";e.classList.remove("active"),i({name:m,layout:c})}),u()};n.addEventListener("click",()=>{o(),e.classList.add("active")}),s.addEventListener("click",()=>e.classList.remove("active")),e.addEventListener("click",l=>{l.target===e&&e.classList.remove("active")})}const Ii="dungeonab_custom_cards",Io="dungeonab_imported_packs",Sr="dungeonab_pack_prefs",Nt={get(i,e){try{return JSON.parse(localStorage.getItem(i))??e}catch{return e}},set(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}};function Do(i){return{id:"my-cards",name:"My Cards",description:"Cards from the workshop.",cards:i}}function J_(){const i=Nt.get(Sr,{}),e=Nt.get(Ii,[]);e.length&&Ls(Do(e),{enabled:i["my-cards"]!==!1});for(const t of Nt.get(Io,[]))try{Ls(t,{enabled:i[t.id]!==!1})}catch{}return i}function Z_(){const i=document.getElementById("cards-overlay"),e=document.getElementById("cards-body");document.getElementById("cards-btn").addEventListener("click",()=>{r(),i.classList.add("active")}),document.getElementById("cards-close-btn").addEventListener("click",()=>i.classList.remove("active")),i.addEventListener("click",o=>{o.target===i&&i.classList.remove("active")});const t="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.35rem;border-radius:4px;font-family:inherit;font-size:0.8rem;",n=o=>{const a=document.createElement("div");return a.textContent=o,a.innerHTML};function s(o){Nt.set(Ii,o),o.length&&Ls(Do(o))}function r(){const o=Nt.get(Ii,[]);Nt.get(Sr,{}),e.innerHTML=`
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;">Forge a card</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;font-size:0.8rem;">
        <select id="ce-type" style="${t}">
          <option value="character">Character</option>
          <option value="equipment">Equipment</option>
          <option value="spell">Spell</option>
          <option value="personality">Personality</option>
        </select>
        <input id="ce-name" placeholder="Name" style="${t}" />
        <input id="ce-icon" placeholder="Icon (emoji)" style="${t}" />
        <input id="ce-text" placeholder="Flavor text" style="${t}" />
      </div>
      <div id="ce-fields" style="margin-top:0.4rem;"></div>
      <div id="ce-problems" style="color:#e08080;font-size:0.72rem;margin-top:0.3rem;"></div>
      <button id="ce-create" style="width:100%;margin-top:0.5rem;padding:0.55rem;">➕ Add to My Cards</button>

      <div style="color:#d8a53f;font-size:0.85rem;margin:0.9rem 0 0.3rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;">
        My Cards (${o.length})</div>
      <div id="ce-list" style="max-height:130px;overflow-y:auto;font-size:0.76rem;"></div>

      <div style="color:#d8a53f;font-size:0.85rem;margin:0.9rem 0 0.3rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;">
        Content packs in the draft</div>
      <div id="ce-packs" style="font-size:0.78rem;"></div>

      <div style="display:flex;gap:0.4rem;margin-top:0.8rem;">
        <button id="ce-export" style="flex:1;font-size:0.75rem;padding:0.4rem;background:#2a2213;color:#d8a53f;">⬇ Export My Cards</button>
        <button id="ce-import" style="flex:1;font-size:0.75rem;padding:0.4rem;background:#2a2213;color:#d8a53f;">⬆ Import Pack JSON</button>
      </div>
      <textarea id="ce-io" placeholder="Pack JSON appears/goes here" rows="3"
        style="width:100%;margin-top:0.4rem;${t}"></textarea>
    `;const a=document.getElementById("ce-fields"),l=document.getElementById("ce-type"),c=()=>{const p=l.value;p==="character"?a.innerHTML=`
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0.3rem;font-size:0.75rem;">
            <select id="ce-class" style="${t}">${Object.values(q).map(g=>`<option>${g}</option>`).join("")}</select>
            <input id="ce-hp" type="number" value="14" title="health" style="${t}" />
            <input id="ce-atk" type="number" value="4" title="attack" style="${t}" />
            <input id="ce-def" type="number" value="3" title="defense" style="${t}" />
            <input id="ce-mind" type="number" value="3" title="mind" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">class · health · attack · defense · mind — budget: health + 2×atk + 2×def + mind ≤ ${_n.character.statTotal}</div>`:p==="equipment"?a.innerHTML=`
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.3rem;font-size:0.75rem;">
            <input id="ce-eatk" type="number" value="0" title="+attack" style="${t}" />
            <input id="ce-edef" type="number" value="0" title="+defense" style="${t}" />
            <input id="ce-emind" type="number" value="2" title="+mind" style="${t}" />
            <select id="ce-best" style="${t}"><option value="">any class</option>${Object.values(q).map(g=>`<option>${g}</option>`).join("")}</select>
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">+attack · +defense · +mind · best-fit — net bonus ≤ ${_n.equipment.bonusTotal}</div>`:p==="spell"?a.innerHTML=`
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem;font-size:0.75rem;">
            <select id="ce-use" style="${t}"><option>combat</option><option>heal</option><option>utility</option></select>
            <input id="ce-power" type="number" value="4" title="power" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">use · power (1–${_n.spell.maxPower})</div>`:a.innerHTML=`
          <select id="ce-arch" style="${t};width:100%;">${Dr.map(g=>`<option value="${g.archetype}">${g.archetype} (like ${g.name})</option>`).join("")}</select>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">your name and flavor, a proven archetype's behavior</div>`};l.addEventListener("change",c),c(),document.getElementById("ce-create").addEventListener("click",()=>{const p=l.value,g={id:`my-${Date.now().toString(36)}`,type:p,name:document.getElementById("ce-name").value.trim(),icon:document.getElementById("ce-icon").value.trim()||"🎴",text:document.getElementById("ce-text").value.trim()||void 0};if(p==="character")g.class=document.getElementById("ce-class").value,g.stats={health:+document.getElementById("ce-hp").value,attack:+document.getElementById("ce-atk").value,defense:+document.getElementById("ce-def").value,mind:+document.getElementById("ce-mind").value},g.trait=g.text;else if(p==="equipment"){g.bonus={};const f=+document.getElementById("ce-eatk").value,x=+document.getElementById("ce-edef").value,M=+document.getElementById("ce-emind").value;f&&(g.bonus.attack=f),x&&(g.bonus.defense=x),M&&(g.bonus.mind=M),g.slot="tool",g.bestFor=document.getElementById("ce-best").value||null}else p==="spell"?(g.use=document.getElementById("ce-use").value,g.power=+document.getElementById("ce-power").value,g.school="homebrew"):g.archetype=document.getElementById("ce-arch").value;const v=xh(g);if(v.length){document.getElementById("ce-problems").textContent=v.join(" · ");return}const m=Nt.get(Ii,[]);m.push(g),s(m),r()});const d=document.getElementById("ce-list");d.innerHTML=o.length?"":'<div class="records-empty">The forge is cold. Make something.</div>',o.forEach((p,g)=>{const v=document.createElement("div");v.style.cssText="display:flex;gap:0.4rem;align-items:baseline;padding:0.15rem 0;border-bottom:1px dashed #2a2318;",v.innerHTML=`<span>${n(p.icon)} ${n(p.name)}</span>
        <span style="color:#665;">${p.type}${p.class?" · "+p.class:""}</span>
        <button data-i="${g}" style="margin-left:auto;font-size:0.68rem;padding:0.15rem 0.4rem;background:#2a1515;color:#e08080;">✕</button>`,v.querySelector("button").addEventListener("click",()=>{const m=Nt.get(Ii,[]);m.splice(g,1),s(m),r()}),d.appendChild(v)});const h=document.getElementById("ce-packs");for(const p of Kd()){const g=document.createElement("label");g.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;padding:0.12rem 0;",g.innerHTML=`<input type="checkbox" ${p.enabled?"checked":""} />
        <span>${n(p.name)} <span style="color:#665;">(${p.cards} cards)</span></span>`,g.querySelector("input").addEventListener("change",v=>{jd(p.id,v.target.checked);const m=Nt.get(Sr,{});m[p.id]=v.target.checked,Nt.set(Sr,m)}),h.appendChild(g)}const u=document.getElementById("ce-io");document.getElementById("ce-export").addEventListener("click",()=>{u.value=JSON.stringify(Do(Nt.get(Ii,[])),null,1)}),document.getElementById("ce-import").addEventListener("click",()=>{try{const p=JSON.parse(u.value),g=bh(p);if(g.length)throw new Error(g.join("; "));Ls(p);const v=Nt.get(Io,[]).filter(m=>m.id!==p.id);v.push(p),Nt.set(Io,v),u.value=`✓ "${p.name}" imported (${p.cards.length} cards)`,r()}catch(p){u.value=`✗ ${p.message}`}})}}const Q_={id:"alchemy-17c",name:"17th-Century Alchemy Pack",description:"Emblem monsters and laboratory gear from the age of Maier and Sendivogius.",cards:[{id:"a17-sendivogius",type:"character",class:"alchemist",name:"Michael Sendivogius",icon:"🜍",stats:{health:12,attack:3,defense:2,mind:6},trait:"Distilled the aerial nitre before anyone had a name for air."},{id:"a17-soror",type:"character",class:"cleric",name:"The Soror Mystica",icon:"🜋",stats:{health:13,attack:2,defense:3,mind:5},trait:"The Work needs two. She keeps the vigil, and the vigil keeps the party."},{id:"a17-maier",type:"character",class:"wizard",name:"Count Michael Maier",icon:"🜚",stats:{health:10,attack:2,defense:2,mind:7},trait:"Reads emblems the way others read maps. The dungeon is fifty fugues deep."},{id:"a17-athanor",type:"equipment",name:"Court Athanor",icon:"🜂",slot:"tool",bonus:{mind:2},bestFor:"alchemist",text:"The slow furnace. Patience, made of brick."},{id:"a17-pelican",type:"equipment",name:"Pelican Vessel",icon:"🜄",slot:"tool",bonus:{mind:1,defense:1},bestFor:"alchemist",text:"Circulation without loss: what wounds the flask feeds the work."},{id:"a17-vitriol",type:"equipment",name:"Flask of Vitriol",icon:"🜖",slot:"weapon",bonus:{attack:3},bestFor:"alchemist",text:"Visita Interiora Terrae — or throw it, and something else will."},{id:"a17-solve",type:"spell",name:"Solve et Coagula",icon:"☿",school:"transmutation",power:5,use:"combat",text:"Dissolve the fixed; fix the volatile. Monsters count as the fixed."},{id:"a17-aurum",type:"spell",name:"Aurum Potabile",icon:"🜚",school:"restoration",power:6,use:"heal",text:"Drinkable gold. The court physician swears by it; the court treasurer weeps."},{id:"a17-projection",type:"spell",name:"Powder of Projection",icon:"✨",school:"transmutation",power:3,use:"utility",text:"A pinch turns the lock's iron to something more agreeable."},{id:"a17-hermetic",type:"personality",name:"The Hermetic",icon:"🜁",archetype:"scholarly",text:"As above, so below; as in the library, so in the crypt. Reads everything twice."}]},ex={id:"athanor",name:"the Hermetic Athanor",icon:"🜂",tagline:"Fifty emblems deep, the Work continues whether or not anyone tends it.",weightTweaks:{lab:2,library:1,materials:1,shrine:-.3},alwaysLab:!0,monsters:[{kind:"green-lion",name:"the Green Lion, hungry for the sun",icon:"🦁",attack:7,health:15,undead:!1},{kind:"ouroboros",name:"an ouroboros too busy to notice you",icon:"🐍",attack:5,health:18,undead:!1,slow:!0},{kind:"caput-corvi",name:"the Raven's Head, black as the nigredo",icon:"🐦‍⬛",attack:6,health:11,undead:!0},{kind:"winged-wingless",name:"two birds, one winged, one not, quarrelling",icon:"🕊️",attack:5,health:10,undead:!1}],bosses:[{kind:"rebis",name:"the Rebis, crowned twice and patient",icon:"👑",attack:12,health:36,undead:!1},{kind:"philosophers-dragon",name:"the Dragon that devours its own tail and yours",icon:"🐉",attack:13,health:34,undead:!1}]},tx={"green-lion":{img:new URL(""+new URL("green-lion-Cdoc9LHy.png",import.meta.url).href,import.meta.url).href},ouroboros:{img:new URL(""+new URL("ouroboros-BkC9aheh.png",import.meta.url).href,import.meta.url).href},"caput-corvi":{img:new URL(""+new URL("caput-corvi-yFqGgKDb.png",import.meta.url).href,import.meta.url).href},"winged-wingless":{img:new URL(""+new URL("winged-wingless-BJ4nBaZO.png",import.meta.url).href,import.meta.url).href},rebis:{img:new URL(""+new URL("rebis-BbSsEiz4.png",import.meta.url).href,import.meta.url).href},"philosophers-dragon":{img:new URL(""+new URL("philosophers-dragon-CN8PF5Zm.png",import.meta.url).href,import.meta.url).href}};let fh=!1;function nx({enabled:i=!0}={}){fh||(fh=!0,Ls(Q_,{enabled:i}),y0(ex),zy(tx),o0({"green-lion":{trait:"venomous"},ouroboros:{trait:"armored"},"caput-corvi":{trait:"swarm"},"winged-wingless":{trait:"swarm"},rebis:{trait:"armored"},"philosophers-dragon":{resist:["fire"],weak:["frost"]}}),T0({"green-lion":{effect:"coating",name:"green vitriol",icon:"🦁",mod:{name:"green vitriol",attack:2,venom:!0},text:"Its bite distills to green vitriol. What dissolves the sun does not hesitate at flesh."},ouroboros:{effect:"potion",name:"the shed of the ouroboros",icon:"🐍",potion:{kind:"ouroboros-shed",heal:8},text:"It sheds as it dies, as it always does. The shed skin, steeped, turns endings back into beginnings."},"caput-corvi":{effect:"materials",name:"nigredo feathers",icon:"🐦‍⬛",count:2,text:"Feathers black past black: the nigredo itself. Every great work begins with exactly this."},"winged-wingless":{effect:"trinket",name:"the settled feather",icon:"🕊️",bonus:{mind:1},text:"One feather, from whichever bird was right. Held, it makes both sides of any argument audible."},rebis:{effect:"trinket",name:"the double crown",icon:"👑",bonus:{attack:1,mind:1},text:"Both crowns, fused where the two heads met. Wearing it, the head does two kinds of thinking at once."},"philosophers-dragon":{effect:"coating",name:"the dragon's mercury",icon:"🐉",mod:{name:"burning mercury",attack:3,element:"fire"},text:"What it kept swallowing, tail after tail: quicksilver that burns. On a blade it is an unfair argument."}}))}const ph={[ie.ENTRANCE]:"The way in. The party gathers its nerve.",[ie.CORRIDOR]:"Just passage — a breath between dangers.",[ie.MONSTER]:"A monster. The party may fight, flee, sneak past (rogue), turn undead (cleric), bribe, or open with a spell — and a spell opening keeps working through the fight. Every slain monster drops a trophy worth carrying.",[ie.TRAP]:"A trap. Rogues disarm it; the bold shove through and take the hit.",[ie.TREASURE]:"Treasure — and maybe a mimic. Loot it, inspect first, or leave the bait.",[ie.LIBRARY]:"A library. The party can learn a spell; wizards risk the sealed texts for more.",[ie.SHRINE]:"A shrine. Rest to heal — or pry off the gold leaf and let the dungeon remember it.",[ie.LAB]:"An alchemist's bench. With materials, brew a potion or coat a weapon.",[ie.MATERIALS]:"Herbs and salts — raw materials for alchemy, if you gather them.",[ie.DISASTER]:"The dungeon itself turns hostile. Brace together, or scatter and pray.",[ie.BOSS]:"The boss chamber. Everything you drafted, tested at once — and the party looses every prepared working it has kept for this.",[ie.STAIRS]:"A stair down. The floor below is meaner than this one, and there is no way back up.",[ie.VAULT]:"A vault — riches hidden behind a secret door. Rogues and scholars find these.",[ie.SITUATION]:"A situation, not a fight: a seized orrery, a sealed door, something large that would rather talk. What the party can attempt here depends entirely on the capabilities it drafted — Tinkering, Astronomy, Divination, Diplomacy and the rest each open their own answer, and a party carrying none of them has only the blunt one."},ix=[{type:"character",label:"Character",text:"A named hero of one of five classes. Four march — the rest wait in town as reserves, ready to replace the dead."},{type:"equipment",label:"Equipment",text:"Auto-assigns to the best-fit member. Some items do different things per class."},{type:"spell",label:"Spell",text:"A prepared working in the shared grimoire: reusable, but spent for the room once cast. Power scales with the party's sharpest mind, and a loosed working keeps working for the rest of the fight — combat workings go on biting, healing ones go on mending, and a heal fires the moment someone is failing rather than after the dust settles. A wizard amplifies it and opens ordinary fights with two — and at the boss the party looses every working it has. Scrolls found in the dungeon still burn."},{type:"tactic",label:"Tactic",text:"Learned technique, gated by what the party can DO rather than by class — everyone swings at something, so anyone benefits from Flanking. Tactics form a small tree: a tier-two card does nothing without the tier-one it grows from."},{type:"personality",label:"Personality",text:"Biases the whole party's decisions. Some look weak but hide an upside."}],sx=[{key:"Oil 🏮",text:"The lamp burns a unit every march. Run dry and the whole party takes damage every room it walks in the dark. An Everburning Lantern makes it last twice as long; Dancing Light and Eyes of the Mouse answer the dark outright."},{key:"Wounds ✚",text:"A blow worth a quarter of a body leaves a scar, and healing can no longer reach past it — the hatched part of the health bar. Wounds only mend in town, so the delve accumulates."}];function rx(i,e){var a,l,c;const t=[];if(!e)return t;const n=i==null?void 0:i.party,s=e.party;if(n&&s)for(const d of s.members){const h=n.members.find(u=>u.name===d.name);h&&h.alive&&!d.alive&&t.push({icon:"☠️",kind:"death",text:`${d.name} has fallen.`})}const r=(a=i==null?void 0:i.narration)==null?void 0:a.room;if(((l=e.narration)==null?void 0:l.room)===ie.BOSS&&r!==ie.BOSS&&t.push({icon:"🐉",kind:"boss",text:"The boss chamber — everything you drafted, tested at once."}),n&&s&&s.spellsLearned>n.spellsLearned){const d=s.spellsLearned-n.spellsLearned;t.push({icon:"📖",kind:"spell",text:`The grimoire grows: ${d} new working${d>1?"s":""} learned.`})}if(n!=null&&n.trophies&&((c=s==null?void 0:s.trophies)==null?void 0:c.length)>n.trophies.length){const d=s.trophies[s.trophies.length-1];t.push({icon:d.icon,kind:"trophy",text:`Claimed from the kill: ${d.name}.`})}if(n&&s){const d=s.gold-n.gold;d>=25&&t.push({icon:"💰",kind:"gold",text:`A windfall: +${d} gold.`})}return t}const mh="dungeonab_chronicles",ys=20;function gh(){return`saga_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}class ax{constructor(e=null){this.storage=e||(typeof localStorage<"u"?localStorage:null),this.entries=[],this.load()}load(){if(this.storage)try{const e=JSON.parse(this.storage.getItem(mh)||"[]");this.entries=Array.isArray(e)?e:[]}catch{this.entries=[]}}persist(){if(this.storage)try{this.storage.setItem(mh,JSON.stringify(this.entries.slice(0,ys)))}catch{}}save({id:e,chronicle:t,party:n,difficulty:s=null}){var a;const r={id:e||gh(),version:Lr,date:Date.now(),partyName:t.partyName,delves:t.delves.length,lastOutcome:((a=t.delves[t.delves.length-1])==null?void 0:a.outcome)||null,difficulty:s,chronicle:t.toJSON(),party:n?n.toJSON():null},o=this.entries.findIndex(l=>l.id===r.id);return o>=0?this.entries[o]=r:this.entries.unshift(r),this.entries.length>ys&&(this.entries.length=ys),this.persist(),r}list(){return this.entries.map(e=>{var t,n,s;return{id:e.id,partyName:e.partyName,delves:e.delves,date:e.date,difficulty:e.difficulty,victory:((t=e.lastOutcome)==null?void 0:t.victory)??null,score:((n=e.lastOutcome)==null?void 0:n.score)??0,alive:(((s=e.party)==null?void 0:s.members)||[]).some(r=>r.alive!==!1)}})}get(e){return this.entries.find(t=>t.id===e)||null}remove(e){const t=this.entries.findIndex(n=>n.id===e);return t>=0?(this.entries.splice(t,1),this.persist(),!0):!1}resume(e,t=$d){const n=this.get(e);if(!n)return null;const s=Yi.fromJSON(n.chronicle),r=n.party?ai.fromJSON(n.party,t):null,o=r?r.living().length:0,a=r?r.reserve.filter(d=>d.isAlive()).length:0;let l=!0,c=null;return r?o===0&&a===0?(l=!1,c=`${s.partyName} did not come back. The chronicle can be read, but nobody is left to continue it.`):o===0&&(c=`Nobody who marched came back, but ${a} wait${a>1?"":"s"} in town. They can take up the delve.`):(l=!1,c="This saga was saved as a story only — there is no party left to send down."),{id:n.id,chronicle:s,party:r,difficulty:n.difficulty,continuable:l,reason:c,standing:o,bench:a}}exportJSON(e){const t=this.get(e);return t?JSON.stringify(t,null,2):null}exportMarkdown(e,t){const n=this.get(e);return n?yd(Yi.fromJSON(n.chronicle),t):null}importJSON(e){let t;try{t=typeof e=="string"?JSON.parse(e):e}catch{return{ok:!1,error:"That file is not readable as a saga."}}if(!t||!t.chronicle||!Array.isArray(t.chronicle.delves))return{ok:!1,error:"That file does not hold a chronicle."};if((t.version??0)>Lr)return{ok:!1,error:"That saga was written by a newer version of the game."};const n={...t,id:gh(),date:Date.now()};return this.entries.unshift(n),this.entries.length>ys&&(this.entries.length=ys),this.persist(),{ok:!0,record:n}}}function vh(i,e="md"){return`chronicle-${(i.partyName||"party").split(",")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"party"}-delve-${i.delves.length||1}.${e}`}const ox=Object.fromEntries(Object.entries(ji).map(([i,e])=>[i,e.icon])),lx=Object.fromEntries(Object.entries(ji).map(([i,e])=>[i,e.name]));window.v6debug={trace:F0,summary:z0,clear:B0};const Kt=new ax;function Ir(i,e,t="text/markdown"){const n=new Blob([e],{type:`${t};charset=utf-8`}),s=URL.createObjectURL(n),r=document.createElement("a");r.href=s,r.download=i,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function Ld(){const i=re.simulator;if(!(i!=null&&i.getChronicle))return null;try{const e=Kt.save({id:re.sagaId||null,chronicle:i.getChronicle(),party:i.party,difficulty:re.difficulty});return re.sagaId=e.id,e}catch{return null}}const yh="dungeonab_help_seen",re={draft:null,draftUI:null,campaign:null,simulator:null,renderer:null,gameRunning:!1,lastTickTime:0,speedMultiplier:1,prevState:null,seenRoomTypes:null};function cx(){console.log("⚔️ DungeonAB initializing…");const i=J_();nx({enabled:i["alchemy-17c"]!==!1}),hx(),dx(),Z_(),K_({onDelve:e=>{re.pendingReplay=e,xt("🗺️",`Design loaded: "${e.name}". Draft a party, then delve it.`,"room"),No()}}),No(),document.getElementById("pause-btn").addEventListener("click",gx),document.getElementById("step-btn").addEventListener("click",mx),document.getElementById("speed-slider").addEventListener("input",e=>{re.speedMultiplier=parseFloat(e.target.value),document.getElementById("speed-label").textContent=`${re.speedMultiplier.toFixed(1)}x`}),document.getElementById("show-results-btn").addEventListener("click",()=>{document.getElementById("show-results-btn").classList.remove("active"),document.getElementById("gameover-display").classList.add("active")})}function hx(){const i=document.getElementById("help-overlay"),e=document.getElementById("help-btn"),t=document.getElementById("help-close-btn");document.getElementById("help-card-legend").innerHTML=ix.map(o=>`<dt>${o.label}</dt><dd>${o.text}</dd>`).join(""),document.getElementById("help-attrition-legend").innerHTML=sx.map(o=>`<dt>${o.key}</dt><dd>${o.text}</dd>`).join("");const n=()=>i.classList.add("active"),s=()=>{i.classList.remove("active");try{localStorage.setItem(yh,"1")}catch{}};e.addEventListener("click",n),t.addEventListener("click",s),i.addEventListener("click",o=>{o.target===i&&s()});let r=!1;try{r=localStorage.getItem(yh)==="1"}catch{}r||n()}function dx(){const i=document.getElementById("records-overlay"),e=document.getElementById("records-btn"),t=document.getElementById("records-close-btn"),n=()=>{const a=document.getElementById("records-body"),l=ri.getStats(),c=ri.getRecentRuns(10),d=Object.values(ch).filter(f=>ri.bestScores[f.id]).map(f=>`<dt>${f.icon} ${f.name}</dt><dd>${ri.bestScores[f.id]}</dd>`).join(""),h=`<div style="color:#887755;font-size:0.8rem;margin-bottom:0.9rem;">
      ${l.totalVictories} retirements across ${l.totalRuns} campaigns · average score ${l.avgScore}</div>`,u=c.length?c.map(f=>{const x=ch[(f.difficulty||"").toUpperCase()]||{icon:"•"},M=f.condition?Tn(f.condition):null,_=f.victory?"🏆":"☠️",k=M&&M.id!=="none"?` · ${M.icon}`:"";return`<div class="records-run">
            <span>${_} ${x.icon} depth ${f.depth||1} · ${f.roomsCleared} rooms${k}</span>
            <span class="rr-score">${f.score}</span>
          </div>`}).join(""):'<div class="records-empty">No campaigns yet. The Hall awaits its first name.</div>',p=Kt.list(),g=p.length?p.map(f=>{const x=new Date(f.date).toLocaleDateString(),M=f.alive?'<span style="color:#3ddc84;">still standing</span>':'<span style="color:#8a6a5a;">did not come back</span>';return`<div class="saga-row" data-saga="${f.id}">
            <div style="flex:1;min-width:0;">
              <div style="color:#c0b090;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Ye(f.partyName.split(",")[0])}${f.partyName.includes(",")?" &amp; co.":""}</div>
              <div style="color:#665;font-size:0.68rem;">${f.delves} delve${f.delves>1?"s":""} · ${M} · ${x}</div>
            </div>
            <button data-read="${f.id}" title="Read the saga">📖</button>
            <button data-save="${f.id}" title="Download the save file">💾</button>
            <button data-drop="${f.id}" title="Forget this saga">🗑️</button>
          </div>`}).join(""):'<div class="records-empty">No sagas kept yet. Finish a delve and the story is written down.</div>';a.innerHTML=(d?`<dl class="records-best">${d}</dl>`:"")+h+'<div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">📜 Sagas kept</div>'+g+`<div style="display:flex;gap:0.4rem;margin:0.5rem 0 1rem;">
         <button id="saga-import-btn" style="flex:1;font-size:0.75rem;padding:0.4rem;">📂 Load a save file</button>
       </div>
       <input id="saga-import-input" type="file" accept="application/json,.json" style="display:none;"><div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">Recent campaigns</div>`+u,a.querySelectorAll("[data-read]").forEach(f=>{f.addEventListener("click",()=>s(f.dataset.read))}),a.querySelectorAll("[data-save]").forEach(f=>{f.addEventListener("click",()=>{const x=Kt.get(f.dataset.save);Ir(`chronicle-${x.partyName.split(",")[0].toLowerCase().replace(/[^a-z0-9]+/g,"-")}.json`,Kt.exportJSON(f.dataset.save),"application/json")})}),a.querySelectorAll("[data-drop]").forEach(f=>{f.addEventListener("click",()=>{const x=Kt.get(f.dataset.drop),M=(x==null?void 0:x.partyName.split(",")[0])||"this saga";window.confirm(`Forget the chronicle of ${M}? The story cannot be recovered.`)&&(Kt.remove(f.dataset.drop),n())})});const v=a.querySelector("#saga-import-btn"),m=a.querySelector("#saga-import-input");v&&m&&(v.addEventListener("click",()=>m.click()),m.addEventListener("change",async()=>{var M;const f=(M=m.files)==null?void 0:M[0];if(!f)return;const x=Kt.importJSON(await f.text());x.ok?(xt("📂",`${x.record.partyName.split(",")[0]}'s saga is on the shelf.`),n()):xt("⚠️",x.error)}))},s=a=>{const l=Kt.resume(a);if(!l)return;const c=document.getElementById("records-body"),d=Kt.exportMarkdown(a,{ledger:!0});c.innerHTML=`
      <button id="saga-back" style="font-size:0.75rem;padding:0.35rem 0.7rem;margin-bottom:0.6rem;">← Back to the Hall</button>
      <div style="color:${l.continuable?"#3ddc84":"#8a6a5a"};font-size:0.75rem;margin-bottom:0.6rem;">
        ${l.continuable?`${l.standing} still standing${l.bench?` · ${l.bench} in reserve`:""} — this party can delve again.`:Ye(l.reason||"This saga is finished.")}
      </div>
      <div class="saga-doc">${ux(d)}</div>
      <button id="saga-download" style="width:100%;margin-top:0.7rem;padding:0.6rem;font-size:0.8rem;">📖 Download this chronicle</button>`,c.querySelector("#saga-back").addEventListener("click",n),c.querySelector("#saga-download").addEventListener("click",()=>{Ir(`chronicle-${l.chronicle.partyName.split(",")[0].toLowerCase().replace(/[^a-z0-9]+/g,"-")}.md`,d)})},r=()=>{n(),i.classList.add("active")},o=()=>i.classList.remove("active");e.addEventListener("click",r),t.addEventListener("click",o),i.addEventListener("click",a=>{a.target===i&&o()})}function ux(i){return Ye(i).replace(/^### (.*)$/gm,"<h4>$1</h4>").replace(/^## (.*)$/gm,"<h3>$1</h3>").replace(/^# (.*)$/gm,"<h2>$1</h2>").replace(/^- (.*)$/gm,"<li>$1</li>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/_(.+?)_/g,"<em>$1</em>").replace(/&lt;details&gt;&lt;summary&gt;Ledger&lt;\/summary&gt;/g,"<details><summary>Ledger</summary>").replace(/&lt;\/details&gt;/g,"</details>").split(`

`).map(e=>/^<(h\d|li|details)/.test(e.trim())?e:`<p>${e}</p>`).join("")}function xt(i,e,t=""){const n=document.getElementById("toast-stack"),s=document.createElement("div");for(s.className=`toast${t?" toast-"+t:""}`,s.innerHTML=`<span class="toast-icon">${i}</span><span>${Ye(e)}</span>`,n.appendChild(s),setTimeout(()=>{s.classList.add("fade"),setTimeout(()=>s.remove(),500)},3600);n.children.length>3;)n.removeChild(n.firstChild)}function fx(i,e){var n;const t=(n=e.narration)==null?void 0:n.room;t&&re.seenRoomTypes&&!re.seenRoomTypes.has(t)&&ph[t]&&(re.seenRoomTypes.add(t),xt(e.narration.icon||"ℹ️",ph[t],"room"));for(const s of rx(i,e))xt(s.icon,s.text,s.kind)}function No(){re.draft=new su(`table-${Date.now().toString(36)}`),re.draftUI=new au(re.draft,px),re.draftUI.render(),document.getElementById("world-container").style.display="none",document.getElementById("ui-container").style.display="none"}function px({pool:i,difficulty:e,seed:t,condition:n,hexTarget:s,hexCondition:r}){console.log(`Campaign begins: difficulty=${e}, seed=${t}, condition=${n}`);const o=document.getElementById("draft-container");o.innerHTML="",o.style.display="none",document.getElementById("world-container").style.display="flex",document.getElementById("ui-container").style.display="flex";const a=new Ui(`${t}-hexes`),l=re.draft.seats.filter(g=>g.isAI),c=a.pick(l),d=Object.keys(Oi).filter(g=>g!=="none"),h=Tn(a.pick(d));re.sabotage={tableWager:n,byPlayer:r&&r!=="none"?{seatId:s,conditionId:r}:null,onPlayer:{rivalName:c.name,rivalIcon:c.icon,condition:h}};const u=Mh(Tn(n),h),p=re.pendingReplay||null;if(re.pendingReplay=null,p&&xt("🗺️",`Delving the archived design: "${p.name}"`,"room"),re.campaign=new kd(i,{seed:t,difficulty:e,condition:u,layout:p?p.layout:null}),re.difficulty=e,re.runRecorded=!1,re.standings=null,re.seenRoomTypes=new Set,xt(c.icon,`${c.name} hexes your run: ${h.name}. Its score premium is yours to keep.`,"death"),re.sabotage.byPlayer){const g=Tn(r),v=l.find(m=>m.id===s);xt(g.icon,`Your hex — ${g.name} — settles over ${(v==null?void 0:v.name)||"a rival"}'s run.`,"boss")}Pd(re.campaign,"⛏️ March on the Dungeon",()=>{Id(re.campaign.nextDelve())})}function Pd(i,e,t){const n=document.getElementById("gameover-display");n.innerHTML="";const s=document.createElement("div");n.appendChild(s),ud(s,i.party,{doneLabel:e,onChange:()=>{re.simulator&&Gr(re.simulator.getState())},onDone:()=>{n.classList.remove("active"),n.innerHTML="",t()}}),n.classList.add("active")}function Id(i){if(re.simulator=i,!re.renderer)try{re.renderer=new r0("game-canvas")}catch(t){console.warn("WebGL unavailable, using 2D map renderer:",t),re.renderer=new ou("game-canvas")}const e=i.getState();re.prevState=e,vx(e.theme,e.depth,e.condition),e.condition&&xt(e.condition.icon,`Wager: ${e.condition.name}. ${e.condition.text}`,"boss"),document.getElementById("pause-btn").disabled=!1,document.getElementById("step-btn").disabled=!1,document.getElementById("pause-btn").textContent="Pause",re.renderer.render(e),Gr(e),re.gameRunning=!0,re.lastTickTime=performance.now(),Dd()}function Dd(){if(!re.gameRunning)return;const i=performance.now(),e=1400/re.speedMultiplier;i-re.lastTickTime>=e&&(re.lastTickTime=i,re.simulator.tick(),Nd())||requestAnimationFrame(Dd)}function Nd(){var e,t;const i=re.simulator.getState();if(re.renderer.render(i),Gr(i),i.narration&&(sl(i.narration,i.roomIndex),fx(re.prevState,i),(t=(e=re.renderer).playEffect)==null||t.call(e,i.narration.action,i.narration.roomIndex,i.narration.spellElement),i.narration.aside)){const n=i.narration.aside.startsWith("🕳️")?"🕳️":"🧭";xt(n,i.narration.aside.replace(/^[^ ]+ /,""),"room")}return re.prevState=i,i.gameOver?(yx(i),!0):!1}function mx(){!re.simulator||!re.gameRunning||(re.simulator.tick(),Nd())}function gx(){if(!re.simulator)return;const i=!re.simulator.paused;re.simulator.setPaused(i),document.getElementById("pause-btn").textContent=i?"Resume":"Pause",i||(re.lastTickTime=performance.now())}function Gr(i){document.getElementById("room-count").textContent=`${i.roomIndex} / ${(i.pathLength||i.dungeon.length)-1}`;const e=Math.max(...(i.dungeon.rooms||[]).map(v=>(v.floor||0)+1),1),t=document.getElementById("floor-count");t.textContent=`${(i.floor||0)+1} / ${e}`,t.style.color=(i.floor||0)+1===e?"#d88a3f":"#9aa3b0",document.getElementById("gold-count").textContent=i.party.gold,document.getElementById("score-count").textContent=i.party.score;const n=document.getElementById("supply-count"),s=i.party.supply??0;n.textContent=s===0?"dark":s,n.style.color=s===0?"#e05555":s<=2?"#d8a53f":"#e8c07a",n.title=s===0?"The oil is gone. Every march in the dark costs the whole party health.":`Oil for ${s} more march${s===1?"":"es"}.`,document.getElementById("materials-count").textContent=i.party.materials,document.getElementById("potions-count").textContent=i.party.potions;const r=document.getElementById("trophies-count"),o=i.party.trophies||[];r.textContent=o.length,r.title=o.map(v=>`${v.icon} ${v.name}`).join(`
`);const a=[];i.party.poisonLinger>0&&a.push("🐍 venom working"),i.party.alarmed&&a.push("🔔 alarm raised"),document.getElementById("status-badges").textContent=a.join(" · ");const l=document.getElementById("party-roster"),c=(i.party.reserve||[]).map(v=>`
      <div class="member-row" style="opacity:0.5;">
        <span>${v.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${v.name} <span style="color:#665;font-size:0.7rem;">(${v.class})</span></div>
          <div style="color:#556;font-size:0.68rem;">in reserve — waits in town for a place in the four</div>
        </span>
      </div>`).join("");l.innerHTML=i.party.members.map(v=>{const m=Math.round(v.health/v.maxHealth*100),f=m>60?"#3ddc84":m>30?"#d8a53f":"#e05555",x=[...v.equipment,...v.weaponMods].join(", "),M=v.effectiveMax??v.maxHealth,_=Math.max(0,Math.round((v.maxHealth-M)/v.maxHealth*100)),k=_>0?`<span class="hp-scar" style="position:absolute;right:0;top:0;bottom:0;width:${_}%;background:repeating-linear-gradient(45deg,#5a2a2a,#5a2a2a 2px,#3a1c1c 2px,#3a1c1c 4px);"></span>`:"",E=v.wounds?`<span title="${v.wounds} wound${v.wounds===1?"":"s"} — healing cannot pass ${M} until town" style="color:#c76;font-size:0.68rem;">${"✚".repeat(Math.min(v.wounds,4))}</span>`:"";return`
      <div class="member-row ${v.alive?"":"member-dead"}">
        <span>${v.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${v.name} <span style="color:#665;font-size:0.7rem;">(${v.class})</span></div>
          ${x?`<div style="color:#556;font-size:0.68rem;">${x}</div>`:""}
        </span>
        ${E}
        <span class="hp-bar" style="position:relative;overflow:hidden;"><span class="hp-fill" style="width:${m}%;background:${f};"></span>${k}</span>
        <span class="member-hp" style="color:${f};">${v.health}</span>
      </div>
    `}).join("")+c;const d=i.party.formation&&i.party.formation!=="line"?`<span class="tactic-chip" title="The room allowed this shape, and the party took it">${ox[i.party.formation]||""} ${Ye(lx[i.party.formation]||"")}</span>`:"",h=document.getElementById("party-tactics"),u=i.party.tactics||[],p=i.party.dormantTactics||[];h.innerHTML=[d,...u.map(v=>`<span class="tactic-chip">${v.icon} ${Ye(v.name)}</span>`),...p.map(v=>{const m=(v.match(/^\S+\s(.+?) is drafted/)||[])[1]||"A tactic";return`<span class="tactic-chip idle" title="${Ye(v)}">${Ye(m)} · idle</span>`})].join("");const g=document.getElementById("debug-log");g.innerHTML=i.log.map(v=>`<div class="log-entry">${Ye(v)}</div>`).join(""),g.scrollTop=g.scrollHeight}function sl(i,e){const t=document.getElementById("story-panel"),n=t.querySelector(".story-empty");n&&n.remove();const s=(i.falls||[]).map(l=>`<div class="story-fall">${Ye(l)}</div>`).join(""),r=(i.wounds||[]).map(l=>`<div class="story-wound">${Ye(l)}</div>`).join(""),o=i.aside?`<div class="story-aside">${Ye(i.aside)}</div>`:"",a=document.createElement("div");for(a.className="story-entry",a.innerHTML=`
    <div class="story-room">${i.icon} Room ${e} — ${i.room}</div>
    <div class="story-predicament">${Ye(i.predicament)}</div>
    <div class="story-deliberation">${Ye(i.deliberation)}</div>
    <div class="story-resolution">${Ye(i.resolution)}</div>
    ${r}
    ${s}
    ${o}
  `,t.appendChild(a);t.children.length>14;)t.removeChild(t.firstChild);t.scrollTop=t.scrollHeight}function vx(i=null,e=1,t=null){const n=e>1?` — Depth ${e}`:"",s=t?`<div style="margin-top:0.4rem;font-size:0.8rem;color:#e8724a;">${t.icon} Wager — ${Ye(t.name)}</div>`:"",r=i?`<div class="story-entry" style="border-left:3px solid #d8a53f;">
         <div class="story-room" style="font-size:1rem;">${i.icon} ${Ye(i.name)}${n}</div>
         <div class="story-predicament" style="font-style:italic;">${Ye(i.tagline)}</div>
         ${s}
       </div>`:"";document.getElementById("story-panel").innerHTML=r+'<div class="story-empty">The chronicle of this delve is not yet written…</div>'}function yx(i){re.gameRunning=!1,document.getElementById("pause-btn").disabled=!0,document.getElementById("step-btn").disabled=!0,re.campaign.recordDelve(re.simulator),Mr.save({name:`${i.theme.name} — depth ${i.depth}`,layout:m0(re.simulator.dungeon),seed:re.simulator.seed,outcome:{victory:i.victory,score:i.party.score,depth:i.depth}}),Ld(),i.victory&&!re.campaign.over?_x():Ud()}function _x(i){const e=re.campaign,t=re.simulator.getRunResult(),n=document.getElementById("gameover-display");if(re.sagaId){const r=Kt.get(re.sagaId);r&&xt("📜",`The chronicle is kept — delve ${r.delves} written down.`)}sl({room:"town",icon:"🏘️",predicament:b_(e.party,e.depth),deliberation:"",resolution:""},`— after depth ${e.depth}`);const s=()=>{const r=e.healCost(),o=e.missingHealth(),a=e.party.gold,l=e.party.hasPersonality("pious");n.innerHTML=`
      <h2 style="color:#3ddc84;font-size:1.35rem;margin-bottom:0.5rem;text-align:center;">
        🏘️ The Town Between
      </h2>
      <div style="text-align:center;color:#887755;margin-bottom:1rem;">Depth ${e.depth} cleared — the road down continues</div>
      <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid #3ddc84;border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
        ${Ye(t.epitaph||"")}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
        <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${e.party.score}</strong>
        <span style="color:#887755;">Gold</span><strong style="text-align:right;">${a}</strong>
        <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${e.party.living().length} / ${e.party.members.length}</strong>
        <span style="color:#887755;">Potions</span><strong style="text-align:right;">${e.party.potions.length}</strong>
        <span style="color:#887755;">Trophies</span><strong style="text-align:right;">${e.party.trophies.length}</strong>
      </div>
    `;const c=(f,x,M,_="")=>{const k=document.createElement("button");return k.textContent=f,k.disabled=!x,k.style.cssText=`width:100%;margin-top:0.5rem;padding:0.8rem;font-size:0.95rem;${_}${x?"":"opacity:0.45;cursor:default;"}`,k.addEventListener("click",M),n.appendChild(k),k};c(o===0?"💤 Everyone Is Rested":`🛏️ Rest & Heal All — ${r}g${l?" (temple rate)":""}`,o>0&&a>=r,()=>{const f=e.healAll(),x=v_(f==null?void 0:f.mended);x&&xt("✚",x.replace(/^✚\s*/,"")),s()});const d=e.potionCost();c(`🧪 Buy a Healing Draught — ${d}g`,a>=d,()=>{e.buyPotion(),s()}),xx(n,e,s);const h=e.party.reserve,u=e.party.living().length<yn;if(h.length>0){const f=document.createElement("div");f.style.cssText="margin-top:1rem;color:#887755;font-size:0.78rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;",f.textContent=u?`🛡️ Your reserve — a place has opened in the party (${h.length} waiting):`:`🛡️ Your reserve — ${h.length} waiting for a place in the four:`,n.appendChild(f);const x=h[0];c(u?`${x.icon} Call up ${x.name} (${x.class}) — free`:`${x.icon} ${x.name} (${x.class}) waits — the four still stand`,u,()=>{const M=e.callUpReserve();M&&xt(M.icon,`${M.name} joins the party from the reserve.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#17231a;color:#a8d5b0;")}const p=document.createElement("div");p.style.cssText="margin-top:1rem;color:#887755;font-size:0.78rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;",p.textContent="🪧 The hiring board — adventurers looking for work:",n.appendChild(p);for(const f of e.recruitOffers()){const x=f.card.stats;c(`${f.card.icon} Hire ${f.card.name} (${f.card.class}) — ${f.cost}g`,a>=f.cost,()=>{const M=e.recruit(f.card.id);M&&xt(f.card.icon,`${M.name} joins the party.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#1a2617;color:#a8d5b0;").title=`❤️${x.health} ⚔️${x.attack} 🛡️${x.defense} 🧠${x.mind}`}const g=e.forgeCost(),v=e.party.living().reduce((f,x)=>f.attack>=x.attack?f:x);c(`🔨 Sharpen ${v.name}'s weapon (+${wn.forgeMod.attack} atk) — ${g}g`,a>=g,()=>{const f=e.forge();f&&xt("🔨",`The smith sets ${wn.forgeMod.name} to ${f.target}'s blade.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#26200f;color:#e0c88a;");const m=e.shopOffers();if(m.length>0){const f=document.createElement("div");f.style.cssText="margin-top:1rem;color:#887755;font-size:0.8rem;",f.textContent="🏪 The quartermaster — what the road down is selling:",n.appendChild(f);for(const x of m){const M=x.card,_=M.type==="spell"?"a working for the grimoire":`${M.slot||"trinket"}`;c(`${M.icon} ${M.name} (${_}) — ${x.price}g`,a>=x.price,()=>{const k=e.buyFromShop(M.id);k&&xt(M.icon,k.wearer?`${k.card.name} bought, and handed to ${k.wearer.name}.`:`${k.card.name} bought and copied into the grimoire.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#1b2119;color:#a8c8a0;")}}c("🎒 The Muster — kit, workings, and who they are",!0,()=>{Pd(e,"🏘️ Back to Town",()=>{n.classList.add("active"),s()})},"margin-top:0.8rem;font-size:0.86rem;padding:0.65rem;background:#22201a;color:#d8c9a3;"),bx(n,e),wx(n,e),c(`⛏️ Delve Deeper — depth ${e.depth+1} awaits`,!0,()=>{n.classList.remove("active"),Id(e.nextDelve())},"margin-top:1.25rem;font-size:1rem;padding:0.9rem;"),c("🏡 Retire & Bank the Score",!0,()=>{e.retire(),Ud(re.simulator.getState())},"background:#2a2213;color:#d8a53f;"),Gr(re.simulator.getState())};s(),n.classList.add("active")}function xx(i,e,t){var r,o;const n=e.townOffers();if(n.length===0)return;const s=document.createElement("div");s.style.cssText="margin-top:1rem;color:#887755;font-size:0.78rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;",s.textContent="🏘️ In town this visit:",i.appendChild(s);for(const a of n){const l=document.createElement("div");l.style.cssText="margin-top:0.6rem;padding:0.7rem;background:#141110;border:1px solid #3a2f1e;border-radius:4px;",l.innerHTML=`
      <div style="color:#c8b088;font-weight:bold;font-size:0.9rem;">${Ye(a.title)}</div>
      <div style="color:#998866;font-size:0.82rem;margin:0.3rem 0 0.5rem;line-height:1.5;">${Ye(a.situation||"")}</div>
    `;for(const c of e.townOptions(a.id)){const d=(r=c.unlockedBy)!=null&&r.length?c.unlockedBy.map(u=>{var p;return((p=Ps[u.capability])==null?void 0:p.name)||u.capability}).join(" + "):null,h=document.createElement("button");h.style.cssText="width:100%;margin-top:0.35rem;padding:0.55rem;font-size:0.82rem;text-align:left;"+(d?"background:#16211a;color:#9fc4a8;border:1px solid #3a4a3e;":"background:#1b1713;color:#b8a888;"),h.innerHTML=`<strong>${Ye(c.name)}</strong>`+(d?` <span style="color:#7fae8c;font-size:0.72rem;">· ${Ye(d)}</span>`:"")+`<br><span style="color:#887755;font-size:0.74rem;">${Ye(c.desc||"")}</span>`,(o=c.unlockedBy)!=null&&o.length&&(h.title=c.unlockedBy.map(u=>{var p;return`${((p=Ps[u.capability])==null?void 0:p.name)||u.capability}: ${u.holders.join(", ")}`}).join(`
`)),h.addEventListener("click",()=>{const u=e.resolveTownOption(a.id,c.id);u&&(xt(u.success===!1?"⚠️":"🏘️",u.narrative||a.title,"room"),sl({room:"town",icon:"🏘️",predicament:a.situation||a.title,deliberation:`The party chose: ${c.name}.`,resolution:u.narrative||""},a.title)),t()}),l.appendChild(h)}i.appendChild(l)}}function bx(i,e){const t=e.town.summary(),n=t.factions.filter(o=>o.value!==0);if(n.length===0&&t.log.length===0)return;const s=t.priceMultiplier===1?"":t.priceMultiplier<1?` · prices ×${t.priceMultiplier} (your name is worth money)`:` · prices ×${t.priceMultiplier} (your name is costing you)`,r=document.createElement("div");r.style.cssText="margin-top:1rem;padding:0.7rem;background:#12100e;border-left:3px solid #6a5a3a;border-radius:4px;",r.innerHTML=`<div style="color:#887755;font-size:0.78rem;margin-bottom:0.4rem;">📜 The town's opinion${s}</div>`+(n.length?'<div style="display:flex;flex-wrap:wrap;gap:0.4rem;">'+n.map(o=>`<span style="font-size:0.75rem;padding:0.15rem 0.4rem;border-radius:3px;border:1px solid #3a2f1e;color:${o.value>0?"#9fc4a8":"#d99a8a"};">${o.icon} ${Ye(o.name)}: ${o.label}</span>`).join("")+"</div>":'<div style="color:#665544;font-size:0.75rem;">No faction has made up its mind yet.</div>')+(t.hostility>.2?'<div style="color:#d99a8a;font-size:0.75rem;margin-top:0.4rem;">⚠️ The streets are not safe for this party.</div>':""),i.appendChild(r)}function wx(i,e){const t=e.previewNextDelve();if(!t)return;const n=document.createElement("div");n.style.cssText=`margin-top:0.8rem;padding:0.7rem;background:#0f1016;border-left:3px solid ${t.blind?"#4a4458":"#7a6ad8"};border-radius:4px;`,n.innerHTML=`<div style="color:#887799;font-size:0.78rem;margin-bottom:0.4rem;">🔮 ${Ye(t.headline)}</div>`+t.lines.map(s=>`<div style="color:#b0a8c8;font-size:0.8rem;line-height:1.55;">${Ye(s)}</div>`).join(""),i.appendChild(n)}function Ud(i){var p,g;const e=re.campaign,t=e.getSummary(),n=re.simulator.getRunResult(),s=t.retired;re.runRecorded||(re.runRecorded=!0,ri.recordRun(re.difficulty,{score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:s,survivors:t.survivors,partySize:t.partySize,depth:t.depth,condition:re.campaign.condition!=="none"?re.campaign.condition:null}));const r=ri.bestScores[re.difficulty]||0,o=t.score>=r&&t.score>0,a=ri.getStats();if(!re.standings&&re.draft){const v=re.sabotage||{};re.standings=G_(re.draft,{score:t.score,depth:t.depth,hexIcon:((g=(p=v.onPlayer)==null?void 0:p.condition)==null?void 0:g.icon)||null},{seed:e.seed,difficulty:e.difficulty,condition:v.tableWager??e.condition,hexes:v.byPlayer?{[v.byPlayer.seatId]:v.byPlayer.conditionId}:{}})}const l=(re.standings||[]).map(v=>`
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.28rem 0;border-bottom:1px dashed #2a2318;${v.isPlayer?"color:#d8a53f;font-weight:bold;":"color:#b0a080;"}">
      <span style="width:1.6rem;">${Sx(v.place)}</span>
      <span>${v.icon} ${Ye(v.name)}${v.hexIcon?` <span title="hexed">${v.hexIcon}</span>`:""}</span>
      <span style="margin-left:auto;">${v.score} <span style="color:#776;font-size:0.82em;">· depth ${v.depthReached}</span></span>
    </div>`).join(""),c=document.getElementById("gameover-display");c.innerHTML=`
    <h2 style="color:${s?"#3ddc84":"#e05555"};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
      ${s?"🏆 Retired in Glory":"☠️ The Campaign Ends in the Dark"}
    </h2>
    <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${s?"#3ddc84":"#aa5544"};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
      ${Ye(n.epitaph||"")}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
      <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${t.score}${o?" ⭐ New Best!":""}</strong>
      <span style="color:#887755;">Depth reached</span><strong style="text-align:right;">${t.depth}</strong>
      <span style="color:#887755;">Gold</span><strong style="text-align:right;">${t.gold}</strong>
      <span style="color:#887755;">Rooms conquered</span><strong style="text-align:right;">${t.roomsCleared}</strong>
      <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${t.survivors} / ${t.partySize}</strong>
      <span style="color:#887755;">Spells learned</span><strong style="text-align:right;">${t.spellsLearned}</strong>
      <span style="color:#887755;">Trophies claimed</span><strong style="text-align:right;">${t.trophies}</strong>
      <span style="color:#887755;">Best on ${re.difficulty}</span><strong style="text-align:right;">${Math.max(r,t.score)}</strong>
      <span style="color:#887755;">Career</span><strong style="text-align:right;">${a.totalVictories} retirements / ${a.totalRuns} campaigns</strong>
    </div>
    ${Mx(e.party.trophies,s)}
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">🎲 At the Table — how the draft played out</div>
      ${l}
    </div>
  `;const d=document.createElement("button");d.textContent="🃏 Draft a New Party",d.style.cssText="width:100%;margin-top:1.5rem;padding:0.9rem;font-size:1rem;",d.addEventListener("click",()=>{c.classList.remove("active"),document.getElementById("show-results-btn").classList.remove("active"),No()}),c.appendChild(d);const h=document.createElement("button");h.textContent="📖 Read the Chronicle",h.style.cssText="width:100%;margin-top:0.5rem;padding:0.7rem;font-size:0.9rem;background:#2a2213;color:#d8a53f;",h.addEventListener("click",()=>{c.classList.remove("active"),document.getElementById("show-results-btn").classList.add("active")}),c.appendChild(h);const u=Ld();if(u){const v=re.simulator.getChronicle(),m=document.createElement("div");m.style.cssText="display:flex;gap:0.5rem;margin-top:0.5rem;";const f=document.createElement("button");f.textContent="📖 Download the chronicle",f.title="The whole saga as a document you can read",f.style.cssText="flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;",f.addEventListener("click",()=>{Ir(vh(v,"md"),yd(v,{ledger:!0}))});const x=document.createElement("button");x.textContent="💾 Save file",x.title="A save you can keep, share, or load back in to delve again with this party",x.style.cssText="flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;",x.addEventListener("click",()=>{Ir(vh(v,"json"),Kt.exportJSON(u.id),"application/json")}),m.append(f,x),c.appendChild(m);const M=document.createElement("div");M.style.cssText="margin-top:0.4rem;font-size:0.7rem;color:#776;text-align:center;",M.textContent=`Saved as "${u.partyName.split(",")[0]}" — delve ${u.delves}. Find it under 🏛️ Records.`,c.appendChild(M)}c.classList.add("active")}function Mx(i,e){if(!i||i.length===0)return"";const t=i.slice(-10).reverse(),n=i.length-t.length,s=t.map(r=>`
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.22rem 0;border-bottom:1px dashed #2a2318;color:#b0a080;font-size:0.85rem;">
      <span>${r.icon}</span>
      <span style="flex:1;">${Ye(r.name)}</span>
      <span style="color:#776;font-size:0.78em;">from ${Ye(r.from)}</span>
    </div>`).join("");return`
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">
        🏆 The Trophy Case — ${e?"what came up with them":"what the dark took back"}
      </div>
      ${s}
      ${n>0?`<div style="color:#776;font-size:0.78rem;padding-top:0.3rem;">… and ${n} more, further down the chronicle.</div>`:""}
    </div>`}function Ye(i){const e=document.createElement("div");return e.textContent=i,e.innerHTML}function Sx(i){return["🥇","🥈","🥉"][i-1]||`${i}.`}window.addEventListener("DOMContentLoaded",cx);
