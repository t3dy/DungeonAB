(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const md="tactic",Aa={attack:i=>i.living().length>0,cast:i=>i.grimoire.length>0,room:()=>!0,march:()=>!0},So=[{id:"tac-flanking",name:"Flanking",icon:"⚔️",branch:"line",tier:1,capability:"attack",text:"When the party has the numbers, it uses them: +1 damage a round while at least three still stand.",effect:{flankDamage:1,flankMin:3}},{id:"tac-encircle",name:"Encirclement",icon:"🌀",branch:"line",tier:2,capability:"attack",requires:"tac-flanking",text:"Flanking becomes a circle: +3 a round instead of +1, and the thing in the middle swings 2 weaker.",effect:{flankDamage:2,monsterAtk:-2}},{id:"tac-shieldwall",name:"Shield Wall",icon:"🛡️",branch:"line",tier:1,capability:"attack",text:"The party closes ranks: 1 less damage a round, whatever it is standing behind.",effect:{cover:1}},{id:"tac-focusfire",name:"Focused Fire",icon:"🎯",branch:"line",tier:2,capability:"attack",requires:"tac-shieldwall",text:"Everyone hits the same thing in the same place: +1 damage a round, and +4 against anything armoured.",effect:{flankDamage:1,vsArmored:3}},{id:"tac-concentration",name:"Concentration",icon:"🧠",branch:"working",tier:1,capability:"cast",text:"A loosed working is held rather than let go: it keeps its full force each round instead of half.",effect:{sustainFull:!0}},{id:"tac-widening",name:"Widening",icon:"💠",branch:"working",tier:2,capability:"cast",requires:"tac-concentration",text:"The working is let out wide: every combat spell becomes an area working, and the room answers it.",effect:{allSpellsArea:!0}},{id:"tac-quickening",name:"Quickening",icon:"⏱️",branch:"working",tier:1,capability:"cast",text:"One more working goes off before blades are drawn, in every room, not just at the throne.",effect:{extraCast:1}},{id:"tac-wardweaving",name:"Ward-Weaving",icon:"🕸️",branch:"working",tier:2,capability:"cast",requires:"tac-quickening",text:"Every working leaves a ward behind it: 2 less damage a round for each spell loosed this fight.",effect:{wardPerCast:2}},{id:"tac-improvised",name:"Improvised Arms",icon:"🔧",branch:"room",tier:1,capability:"room",text:"The party fights with whatever the room left lying about: +5 to any opening made from the furniture.",effect:{featureOpener:5}},{id:"tac-shove",name:"Shove",icon:"🤜",branch:"room",tier:1,capability:"attack",text:"Drilled to put a thing where the room wants it: any of them can shove a monster onto the spikes, into the pit, into the fire, or down the crack, and it goes in 2 harder.",effect:{hazardShoves:!0,hazardDamage:2}},{id:"tac-pinning",name:"Pinning",icon:"📌",branch:"room",tier:2,capability:"attack",requires:"tac-shove",text:"The shove becomes a place to hold it: 2 more damage from anything the room does to a monster the party put there.",effect:{hazardDamage:2}},{id:"tac-firewatch",name:"Firewatch",icon:"🧯",branch:"room",tier:2,capability:"room",requires:"tac-improvised",text:"A party that sets the room alight knows where the fire will go: it takes nothing back from its own reactions, holds 1 more of the room as cover, and reads a flame trap for 3 less damage.",effect:{noSelfHarm:!0,fireTrapSoak:3,cover:1}},{id:"tac-rationing",name:"Rationing",icon:"🕯️",branch:"march",tier:1,capability:"march",text:"The lamp is trimmed and the oil is measured: one more march of light before the dark.",effect:{supply:1}},{id:"tac-coldcamp",name:"Cold Camp",icon:"🏕️",branch:"march",tier:2,capability:"march",requires:"tac-rationing",text:"No fire, no smell of food, watches kept: a camp at the stairhead costs one supply instead of two, and nothing climbs the stair into it.",effect:{campSupply:1,campWatched:!0}},{id:"tac-fieldsurgery",name:"Field Surgery",icon:"✚",branch:"march",tier:2,capability:"march",requires:"tac-rationing",text:"Somebody learned to set a break on the road: two wounds close at every shrine, not only in town.",effect:{mendAtShrine:2}}],Zc=So.map(i=>({id:i.id,type:md,name:i.name,icon:i.icon,branch:i.branch,tier:i.tier,capability:i.capability,requires:i.requires||null,text:i.text}));function Ms(i){return So.find(e=>e.id===i)||null}function Ss(i){const e=new Set((i.tactics||[]).map(t=>t.id));return(i.tactics||[]).filter(t=>{const n=Ms(t.id);if(!n)return!1;const s=Aa[n.capability];return!(s&&!s(i)||n.requires&&!e.has(n.requires))})}function el(i){const e=new Set((i.tactics||[]).map(n=>n.id)),t=[];for(const n of i.tactics||[]){const s=Ms(n.id);s&&(s.requires&&!e.has(s.requires)?t.push({tactic:s,reason:"requires",missing:Ms(s.requires)}):Aa[s.capability]&&!Aa[s.capability](i)&&t.push({tactic:s,reason:"capability",capability:s.capability}))}return t}function Nn(i){const e={flankDamage:0,flankMin:99,cover:0,monsterAtk:0,vsArmored:0,extraCast:0,wardPerCast:0,featureOpener:0,supply:0,mendAtShrine:0,fireTrapSoak:0,campSupply:0,hazardDamage:0,sustainFull:!1,allSpellsArea:!1,noSelfHarm:!1,campWatched:!1,hazardShoves:!1,live:[]};for(const t of Ss(i)){const n=Ms(t.id),s=n.effect||{};e.flankDamage+=s.flankDamage||0,s.flankMin&&(e.flankMin=Math.min(e.flankMin,s.flankMin)),e.cover+=s.cover||0,e.monsterAtk+=s.monsterAtk||0,e.vsArmored+=s.vsArmored||0,e.extraCast+=s.extraCast||0,e.wardPerCast+=s.wardPerCast||0,e.featureOpener+=s.featureOpener||0,e.supply+=s.supply||0,e.mendAtShrine+=s.mendAtShrine||0,e.fireTrapSoak+=s.fireTrapSoak||0,e.campSupply+=s.campSupply||0,e.hazardDamage+=s.hazardDamage||0,s.campWatched&&(e.campWatched=!0),s.hazardShoves&&(e.hazardShoves=!0),s.sustainFull&&(e.sustainFull=!0),s.allSpellsArea&&(e.allSpellsArea=!0),s.noSelfHarm&&(e.noSelfHarm=!0),e.live.push(n)}return e.flankDamage>0&&e.flankMin===99&&(e.flankMin=3),e}const Y={CHARACTER:"character",EQUIPMENT:"equipment",SPELL:"spell",PERSONALITY:"personality",TACTIC:"tactic"},W={FIGHTER:"fighter",CLERIC:"cleric",WIZARD:"wizard",ROGUE:"rogue",ALCHEMIST:"alchemist"},Eo=[{id:"char-brand",type:Y.CHARACTER,class:W.FIGHTER,name:"Brand of the Broken Shield",icon:"⚔️",stats:{health:14,attack:4,defense:3,mind:2},trait:"Holds the door: takes hits meant for the back rank."},{id:"char-ursula",type:Y.CHARACTER,class:W.FIGHTER,name:"Ursula Ironknee",icon:"⚔️",stats:{health:14,attack:3,defense:4,mind:2},trait:"Unmovable. Refuses to fall while anyone stands behind her."},{id:"char-kestrel",type:Y.CHARACTER,class:W.FIGHTER,name:"Kestrel Quickblade",icon:"⚔️",stats:{health:13,attack:5,defense:2,mind:3},trait:"Strikes first in every fight."},{id:"char-benedicta",type:Y.CHARACTER,class:W.CLERIC,name:"Sister Benedicta",icon:"✨",stats:{health:14,attack:2,defense:3,mind:6},trait:"Mends wounds between rooms; turns the restless dead."},{id:"char-oswald",type:Y.CHARACTER,class:W.CLERIC,name:"Brother Oswald of the Lantern",icon:"✨",stats:{health:14,attack:3,defense:3,mind:4},trait:"His lantern light steadies the whole party's nerve."},{id:"char-melchior",type:Y.CHARACTER,class:W.WIZARD,name:"Melchior the Moth-Eaten",icon:"🔮",stats:{health:12,attack:2,defense:3,mind:8},trait:"Doubles the power of any spell the party casts."},{id:"char-sylvane",type:Y.CHARACTER,class:W.WIZARD,name:"Sylvane of the Nine Candles",icon:"🔮",stats:{health:11,attack:3,defense:3,mind:7},trait:"Reads sealed doors and cursed scripts aloud, safely. Usually."},{id:"char-vex",type:Y.CHARACTER,class:W.ROGUE,name:"Vex Threefingers",icon:"🗡️",stats:{health:12,attack:4,defense:2,mind:6},trait:"Disarms traps and picks locks; finds the hidden coin."},{id:"char-mouse",type:Y.CHARACTER,class:W.ROGUE,name:"The Mouse",icon:"🗡️",stats:{health:11,attack:5,defense:2,mind:5},trait:"Scouts one room ahead. Nobody has ever seen The Mouse first."},{id:"char-paracelsus",type:Y.CHARACTER,class:W.ALCHEMIST,name:"Paracelsus the Lesser",icon:"⚗️",stats:{health:13,attack:3,defense:2,mind:7},trait:"Brews potions and mods weapons at any lab bench he finds."},{id:"char-perenelle",type:Y.CHARACTER,class:W.ALCHEMIST,name:"Perenelle of the Green Lion",icon:"⚗️",stats:{health:12,attack:2,defense:3,mind:8},trait:"Distills two potions from every lab instead of one."},{id:"char-gunnhild",type:Y.CHARACTER,class:W.FIGHTER,name:"Gunnhild Half-Door",icon:"⚔️",stats:{health:13,attack:4,defense:4,mind:1},trait:"Got her name blocking one. Has never explained which half."},{id:"char-ash",type:Y.CHARACTER,class:W.CLERIC,name:"Canoness Ash",icon:"✨",stats:{health:13,attack:3,defense:3,mind:5},trait:"Buried three orders of her own sisters. The dead listen when she talks."},{id:"char-yarrow",type:Y.CHARACTER,class:W.WIZARD,name:"Old Yarrow",icon:"🔮",stats:{health:13,attack:2,defense:2,mind:9},trait:"Forgot more magic than most learn. Occasionally remembers it mid-fight."},{id:"char-silin",type:Y.CHARACTER,class:W.ROGUE,name:"Silin the Debt",icon:"🗡️",stats:{health:12,attack:4,defense:3,mind:4},trait:"Owes everyone. Pays in doors opened and knives thrown."},{id:"char-crucible",type:Y.CHARACTER,class:W.ALCHEMIST,name:"Magister Crucible",icon:"⚗️",stats:{health:13,attack:3,defense:3,mind:5},trait:"Expelled from three academies. Each explosion taught him something."}],To=[{id:"eq-tower-shield",type:Y.EQUIPMENT,name:"Tower Shield",icon:"🛡️",slot:"armor",bonus:{defense:3},bestFor:W.FIGHTER,text:"A wall with a handle."},{id:"eq-greatsword",type:Y.EQUIPMENT,name:"Greatsword of the Vault",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:W.FIGHTER,text:"Found in a vault. Wants to go back. Long enough to take a whole swarm at once: 3 more damage a round against anything that comes in numbers."},{id:"eq-blessed-mace",type:Y.EQUIPMENT,name:"Blessed Mace",icon:"🔨",slot:"weapon",bonus:{attack:2,mind:1},bestFor:W.CLERIC,text:"Persuasion, sanctified. Consecrates a room as it swings: nothing climbs out of the sarcophagus while it is in hand."},{id:"eq-grimoire",type:Y.EQUIPMENT,name:"Grimoire of Low Whispers",icon:"📖",slot:"focus",bonus:{mind:3},bestFor:W.WIZARD,text:"The margins argue with the text."},{id:"eq-lockpicks",type:Y.EQUIPMENT,name:"Masterwork Lockpicks",icon:"🗝️",slot:"tool",bonus:{mind:2},bestFor:W.ROGUE,text:"Every door is a suggestion."},{id:"eq-alembic",type:Y.EQUIPMENT,name:"Portable Alembic",icon:"⚗️",slot:"tool",bonus:{mind:2},bestFor:W.ALCHEMIST,text:"A lab that fits in a satchel. Labs found in the dungeon work better, and a material can be cooked down into two marches of lamp oil."},{id:"eq-chainmail",type:Y.EQUIPMENT,name:"Dwarven Chainmail",icon:"🥋",slot:"armor",bonus:{defense:2},bestFor:null,text:"Fits anyone brave enough to wear it. Takes the worst of a blow, so fewer of them leave a lasting scar."},{id:"eq-boots",type:Y.EQUIPMENT,name:"Boots of the Quiet Step",icon:"👢",slot:"boots",bonus:{defense:1,mind:1},bestFor:W.ROGUE,text:"The floorboards never learn your name."},{id:"eq-lantern",type:Y.EQUIPMENT,name:"Everburning Lantern",icon:"🏮",slot:"tool",bonus:{mind:1,defense:1},bestFor:W.CLERIC,text:"Reveals hazards one room ahead, and sips its oil: the party burns supply every other march instead of every one."},{id:"eq-throwing-knives",type:Y.EQUIPMENT,name:"Bandolier of Knives",icon:"🔪",slot:"weapon",bonus:{attack:2},bestFor:W.ROGUE,text:"Six answers to most questions, and they arrive before the asking: 4 damage thrown before the first round."},{id:"eq-warded-buckler",type:Y.EQUIPMENT,name:"Warded Buckler",icon:"🛡️",slot:"armor",bonus:{defense:2,mind:1},bestFor:W.CLERIC,text:"The prayers are etched on the inside, where they matter. Whatever the party sets off in a room, half of it does not come back on them."},{id:"eq-quicksilver-daggers",type:Y.EQUIPMENT,name:"Quicksilver Daggers",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:W.ROGUE,text:"They land before the argument starts: the party takes no damage in the first round of a fight."},{id:"eq-athanor-charm",type:Y.EQUIPMENT,name:"Athanor Charm",icon:"🔥",slot:"tool",bonus:{mind:2},bestFor:W.ALCHEMIST,text:"A furnace in miniature, always exactly warm enough. Anything the party sets alight burns 2 harder for the rest of the fight."},{id:"eq-wand-embers",type:Y.EQUIPMENT,name:"Wand of Embers",icon:"🪄",slot:"focus",bonus:{mind:1},bestFor:W.WIZARD,text:"Warm to any hand. What comes out depends on whose.",classActions:{[W.FIGHTER]:{name:"Ember Shot",opening:4},[W.WIZARD]:{name:"Meteor Fall",opening:8},[W.CLERIC]:{name:"Flame Ward",ward:1},[W.ROGUE]:{name:"Smoke Veil",ward:1},[W.ALCHEMIST]:{name:"Accelerant Charge",opening:5}}},{id:"eq-holy-symbol",type:Y.EQUIPMENT,name:"Holy Symbol of Dawn",icon:"☀️",slot:"focus",bonus:{mind:1},bestFor:W.CLERIC,text:"Protection for most. Authority for some. A bad idea for one.",classActions:{[W.FIGHTER]:{name:"Shield of Faith",ward:1},[W.ROGUE]:{name:"Veil of Shadows",ward:1},[W.CLERIC]:{name:"Radiant Smite",opening:3,vsUndead:6},[W.WIZARD]:{name:"Animate Corpse",summonAttack:3},[W.ALCHEMIST]:{name:"Blessed Reagents",opening:2}}},{id:"eq-prybar",type:Y.EQUIPMENT,name:"Ironwood Prybar",icon:"🪝",slot:"tool",bonus:{attack:1,defense:1},bestFor:W.FIGHTER,text:"Opens sarcophagi, crates and rubble. Doubles as an argument."},{id:"eq-grapple",type:Y.EQUIPMENT,name:"Grapple and Line",icon:"🪢",slot:"tool",bonus:{mind:1,defense:1},bestFor:W.ROGUE,text:"Forty feet of good rope. Pits become options; a shaft becomes a stairway."},{id:"eq-tinderbox",type:Y.EQUIPMENT,name:"Alchemist's Tinderbox",icon:"🔥",slot:"tool",bonus:{attack:1,mind:1},bestFor:W.ALCHEMIST,text:"Lights braziers, shelves, and anything else the room has generously left flammable."},{id:"eq-winch-hook",type:Y.EQUIPMENT,name:"Winch Hook",icon:"⚓",slot:"tool",bonus:{attack:2},bestFor:W.ROGUE,text:"For chains, cranks and portcullises. Whatever the dungeon raised can be dropped."},{id:"eq-smiths-kit",type:Y.EQUIPMENT,name:"Field Smith's Kit",icon:"🔨",slot:"tool",bonus:{attack:1,defense:1},bestFor:W.FIGHTER,text:"Hammer, file, flux. Useless in a corridor; worth a sword at an anvil."},{id:"eq-waterskin",type:Y.EQUIPMENT,name:"Great Waterskin",icon:"🫗",slot:"tool",bonus:{defense:1,mind:1},bestFor:null,text:"Holds four days. Wounds get washed, venom gets flushed, fonts get emptied."},{id:"eq-silvered-mirror",type:Y.EQUIPMENT,name:"Silvered Hand-Mirror",icon:"🪞",slot:"focus",bonus:{mind:2},bestFor:W.CLERIC,text:"Shows what is standing there rather than what wants to be seen."},{id:"eq-cursed-blade",type:Y.EQUIPMENT,name:"Blade of the Adder",icon:"🐍",slot:"weapon",bonus:{attack:4,defense:-2},bestFor:W.FIGHTER,cursed:!0,text:"It whispers where to cut. It is usually right. It never says about what. Its bearer has lived with venom long enough that the party shrugs off the venomous."},{id:"eq-haunted-armor",type:Y.EQUIPMENT,name:"Haunted Armor",icon:"👻",slot:"armor",bonus:{defense:3,mind:-1},bestFor:W.FIGHTER,cursed:!0,text:"A chill down the spine — but the resident ghost hates monsters more than it hates you.",classActions:{[W.FIGHTER]:{name:"The Ghost Objects",summonAttack:1},[W.CLERIC]:{name:"The Ghost Objects",summonAttack:1},[W.WIZARD]:{name:"The Ghost Objects",summonAttack:1},[W.ROGUE]:{name:"The Ghost Objects",summonAttack:1},[W.ALCHEMIST]:{name:"The Ghost Objects",summonAttack:1}}}],Es=[{id:"sp-firebolt",type:Y.SPELL,name:"Firebolt",icon:"🔥",school:"evocation",element:"fire",power:4,use:"combat",text:"Opens combat with 4 damage before blades are drawn, and goes on burning while the fight lasts."},{id:"sp-mend",type:Y.SPELL,name:"Mending Word",icon:"💚",school:"restoration",power:5,use:"heal",text:"Restores 5 health to the most wounded companion the moment the fight turns against them, then keeps mending while it holds."},{id:"sp-knock",type:Y.SPELL,name:"Knock",icon:"🚪",school:"transmutation",power:3,use:"utility",text:"Opens any lock. Loudly."},{id:"sp-shield",type:Y.SPELL,name:"Aegis of Ash",icon:"🛡️",school:"abjuration",power:3,use:"combat",text:"Blunts every blow of the fight, not just the first."},{id:"sp-light",type:Y.SPELL,name:"Dancing Light",icon:"💡",school:"evocation",power:2,use:"utility",text:"Reveals traps and ambushes in the next room — and once the oil is gone, carries the party through a march of dark for free."},{id:"sp-fear",type:Y.SPELL,name:"Cause Fear",icon:"😱",school:"necromancy",power:4,use:"combat",text:"Weak monsters flee before the fight begins."},{id:"sp-chain",type:Y.SPELL,name:"Chain Lightning",icon:"⚡",school:"evocation",element:"shock",power:5,use:"combat",aoe:!0,text:"Arcs from foe to foe until it runs out of foes or enthusiasm — and through anything wet or metal on the way."},{id:"sp-frost",type:Y.SPELL,name:"Frost Lance",icon:"❄️",school:"evocation",element:"frost",power:5,use:"combat",text:"Cold, precise, and deeply personal."},{id:"sp-sunder",type:Y.SPELL,name:"Sunder",icon:"💢",school:"transmutation",power:4,use:"combat",text:"Armor remembers being ore. This spell reminds it, and plate stops turning blows for the rest of the fight."},{id:"sp-radiance",type:Y.SPELL,name:"Radiant Lance",icon:"🌟",school:"theurgy",element:"holy",power:4,use:"combat",text:"A line of noon driven through whatever the dark is wearing."},{id:"sp-balm",type:Y.SPELL,name:"Balm of Hours",icon:"🌾",school:"restoration",power:6,use:"heal",text:"Borrows healing from a quieter week and spends it mid-fight, then goes on spending."},{id:"sp-eyes",type:Y.SPELL,name:"Eyes of the Mouse",icon:"👁️",school:"divination",power:2,use:"utility",text:"See what the small and cautious see. It is a lot, and it is just as much in the dark: the party never pays what the dark charges."},{id:"sp-feather",type:Y.SPELL,name:"Feather Step",icon:"🪶",school:"transmutation",power:3,use:"utility",text:"The floor agrees to pretend nobody is on it: 3 less damage from anything underfoot, and no stumbling in the dark."},{id:"sp-shatter",type:Y.SPELL,name:"Shatter",icon:"🪨",school:"transmutation",element:"frost",power:4,use:"combat",aoe:!0,text:"Stone remembers being loose, and cold reminds it. Pillars, boulders and bad ceilings all listen."},{id:"sp-kindle",type:Y.SPELL,name:"Kindle",icon:"🕯️",school:"evocation",element:"fire",power:3,use:"combat",aoe:!0,text:"Lights any fire in the room from across it — braziers, crates, shelves, and whatever is standing near one."},{id:"sp-fireball",type:Y.SPELL,name:"Fireball",icon:"🔥",school:"evocation",element:"fire",power:5,use:"combat",aoe:!0,text:"It does not stop at the monster. Whatever else in the room will burn, burns."},{id:"sp-hoarfrost",type:Y.SPELL,name:"Hoarfrost",icon:"🧊",school:"evocation",element:"frost",power:4,use:"combat",aoe:!0,text:"The cold goes everywhere at once: into the water, into the fire, into the cracks in the stone."},{id:"sp-dawnbreak",type:Y.SPELL,name:"Dawnbreak",icon:"🌟",school:"theurgy",element:"holy",power:4,use:"combat",aoe:!0,text:"Noon, indoors, all at once. Old stone and old glass both answer it."},{id:"sp-purify",type:Y.SPELL,name:"Purify the Font",icon:"⛲",school:"theurgy",power:4,use:"heal",text:"Still water, said over and made willing — poured out when someone is failing, and again each round after. Best where the dungeon left a font."}],Ar=[{id:"pers-brave",type:Y.PERSONALITY,name:"The Bold",icon:"🦁",archetype:"brave",text:"Fights before fleeing; opens the ominous door. Walks the dark like a road it knows: 1 less damage a march."},{id:"pers-cunning",type:Y.PERSONALITY,name:"The Cunning",icon:"🦊",archetype:"cunning",text:"Prefers the trap disarmed, the guard bribed, the fight skipped. Trims the wick without being asked: 2 more marches of oil."},{id:"pers-greedy",type:Y.PERSONALITY,name:"The Covetous",icon:"💰",archetype:"greedy",text:"Never leaves treasure behind. Never — not even blind, which costs it 1 more damage a march in the dark."},{id:"pers-scholarly",type:Y.PERSONALITY,name:"The Scholarly",icon:"📚",archetype:"scholarly",text:"Reads everything; lingers in libraries; learns extra spells. Wastes no light doing it: 1 more march of oil."},{id:"pers-pious",type:Y.PERSONALITY,name:"The Devout",icon:"🕯️",archetype:"pious",text:"Rests at shrines; heals more; abhors desecration. Tends what the dungeon opens, so fewer blows leave a lasting scar."},{id:"pers-reckless",type:Y.PERSONALITY,name:"The Reckless",icon:"💥",archetype:"reckless",text:"Rushes in. Sometimes that works. Gloriously. Never stops to bind anything, so more of it stays as scars."},{id:"pers-craven",type:Y.PERSONALITY,name:"The Craven",icon:"🐔",archetype:"craven",trap:!0,text:"Avoids every fight it can. Notices every exit — and every tripwire. Skipped fights pay no spoils. Creeps in the dark and pays 1 more for it, but packed 2 marches of spare oil."},{id:"pers-tinkerer",type:Y.PERSONALITY,name:"The Tinkerer",icon:"🔧",archetype:"cunning",text:"Touches everything in the room: the chain, the lid, the lever. Uses the architecture as a weapon."},{id:"pers-vandal",type:Y.PERSONALITY,name:"The Vandal",icon:"🪓",archetype:"reckless",text:"If a thing in the room can be toppled, burned, or dropped on someone, it will be."}];function gd(){return[...Eo,...To,...Es,...Ar,...Zc]}function vd(i){return gd().find(e=>e.id===i)||null}const yd=.25,_d=2;let xd=1;class Ra{constructor(e){this.uid=`adv-${xd++}`,this.id=e.id,this.name=e.name,this.cardName=e.name,this.class=e.class,this.icon=e.icon,this.trait=e.trait||"",this.givenName=null,this.backstory="",this.maxHealth=e.stats.health,this.wounds=0,this.woundBias=0,this.health=e.stats.health,this.baseAttack=e.stats.attack,this.baseDefense=e.stats.defense,this.baseMind=e.stats.mind,this.equipment=[],this.weaponMods=[],this.alive=!0}get attack(){var t;let e=this.baseAttack;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.attack)||0;for(const n of this.weaponMods)e+=n.attack||0;return e}get defense(){var t;let e=this.baseDefense;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.defense)||0;return e}get mind(){var t;let e=this.baseMind;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.mind)||0;return e}takeDamage(e){const t=this.health>this.woundFloor();if(this.health=Math.max(0,this.health-e),this.health<=0){this.alive=!1;return}const n=this.maxHealth*yd*(1+(this.woundBias||0));t&&e>=n&&this.wounds++}woundFloor(){return Math.ceil(this.maxHealth/3)}effectiveMax(){return Math.max(this.woundFloor(),this.maxHealth-this.wounds*_d)}heal(e){this.alive&&(this.health=Math.min(this.effectiveMax(),this.health+e))}mendWounds(e=1/0){this.wounds=Math.max(0,this.wounds-e)}toJSON(){return{uid:this.uid,id:this.id,name:this.name,givenName:this.givenName,backstory:this.backstory,health:this.health,wounds:this.wounds,alive:this.alive,equipment:this.equipment.map(e=>({...e})),weaponMods:this.weaponMods.map(e=>({...e}))}}rename(e){const t=String(e||"").trim().slice(0,40);return this.givenName=t||null,this.name=t||this.cardName,this.name}setBackstory(e){return this.backstory=String(e||"").trim().slice(0,400),this.backstory}restore(e,t=()=>null){if(!e)return this;this.uid=e.uid||this.uid,this.name=e.name??this.name,this.givenName=e.givenName??null,this.backstory=e.backstory||"",this.health=Math.min(this.maxHealth,e.health??this.health),this.wounds=e.wounds??0,this.alive=e.alive!==!1;const n=s=>s&&(t(s.id)||s)||null;return this.equipment=(e.equipment||[]).map(n).filter(Boolean),this.weaponMods=(e.weaponMods||[]).map(n).filter(Boolean),this}isAlive(){return this.alive&&this.health>0}equip(e){this.equipment.push(e)}addWeaponMod(e){this.weaponMods.push(e)}}function bd(){return new Ra({id:"char-volunteer",name:"Pip the Tavern Volunteer",class:W.FIGHTER,icon:"🍺",stats:{health:10,attack:2,defense:1,mind:2},trait:"Nobody drafted a hero, so Pip grabbed a stool leg and came along."})}const wd={brave:{dark:-1,text:"The Bold walk the dark like a road they know. It costs them less than it should.",supplyText:null},craven:{dark:1,supply:2,text:"The Craven creep, and the dark takes its time with them.",supplyText:"The Craven packed more oil than anyone thought necessary. Nobody is laughing now."},greedy:{dark:1,text:"The Covetous will not leave a room unsearched, even blind. It costs them.",supplyText:null},cunning:{supply:2,text:null,supplyText:"The Cunning trimmed the wick and measured the oil before anyone asked."},pious:{wound:.35,text:null,woundText:"The Devout tend what the dungeon opens: fewer blows leave a mark that stays.",supplyText:null},reckless:{wound:-.25,text:null,woundText:"The Reckless do not stop to bind anything, and more of it stays with them.",supplyText:null},scholarly:{supply:1,text:null,supplyText:"The Scholarly read the passage before walking it, and wasted no light doing it."}};function hr(i){const e={dark:0,supply:0,wound:0,notes:[],supplyNotes:[],woundNotes:[]};for(const t of i.personalities||[]){const n=wd[t];n&&(e.dark+=n.dark||0,e.supply+=n.supply||0,e.wound+=n.wound||0,n.text&&e.notes.push({archetype:t,text:n.text}),n.supplyText&&e.supplyNotes.push({archetype:t,text:n.supplyText}),n.woundText&&e.woundNotes.push({archetype:t,text:n.woundText}))}return e}const vn=4,tl=8,Zi=3,nl={easy:1.1,medium:.85,hard:.7,nightmare:.55};class ii{constructor(e){const t={},n=e.filter(a=>a.type===Y.CHARACTER).map(a=>{const o=new Ra(a);if(t[a.name]=(t[a.name]||0)+1,t[a.name]>1){const c=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"][Math.min(t[a.name]-1,5)];o.name=`${a.name}, ${c}`}return o});this.members=n.slice(0,vn),this.reserve=n.slice(vn),this.members.length===0&&this.members.push(bd()),this.grimoire=e.filter(a=>a.type===Y.SPELL).map(a=>({...a,source:"prepared"})),this.castThisRoom=new Set;const s=new Set;this.tactics=e.filter(a=>a.type==="tactic").filter(a=>!s.has(a.id)&&s.add(a.id)).map(a=>({...a})),this.duplicateTactics=e.filter(a=>a.type==="tactic").length-this.tactics.length,this.personalities=e.filter(a=>a.type===Y.PERSONALITY).map(a=>a.archetype),this.applyTemper();const r=e.filter(a=>a.type===Y.EQUIPMENT);for(const a of r)this.assignEquipment(a);this.pack=[],this.supply=tl,this.marches=0,this.materials=0,this.potions=[],this.trophies=[],this.gold=0,this.score=0,this.spellsLearned=0,this.encounterHistory={}}assignEquipment(e){const t=this.living();if(t.length===0)return null;let n=null;if(e.bestFor){const s=t.filter(r=>r.class===e.bestFor);s.length>0&&(n=s.reduce((r,a)=>r.equipment.length<=a.equipment.length?r:a))}return n||(n=t.reduce((s,r)=>s.equipment.length<=r.equipment.length?s:r)),n.equip(e),this.personalities&&this.applyTemper(),n}equipTo(e,t){const n=[...this.members,...this.reserve].find(o=>o.name===t);if(!n)return null;let s=null,r=null;for(const o of[...this.members,...this.reserve]){const l=o.equipment.findIndex(c=>c.id===e);if(l>=0){s=o,r=o.equipment[l];break}}if(!r){const o=this.pack.findIndex(l=>l.id===e);if(o<0)return null;r=this.pack[o]}if(s===n)return{moved:r,from:n,to:n,displaced:null};let a=null;if(r.slot){const o=n.equipment.findIndex(l=>l.slot===r.slot);o>=0&&(a=n.equipment.splice(o,1)[0])}return s?s.equipment=s.equipment.filter(o=>o.id!==e):this.pack=this.pack.filter(o=>o.id!==e),n.equip(r),a&&(s&&!s.equipment.some(l=>l.slot===a.slot)?s.equip(a):this.pack.push(a)),this.applyTemper(),{moved:r,from:s,to:n,displaced:a}}unequip(e){for(const t of[...this.members,...this.reserve]){const n=t.equipment.findIndex(s=>s.id===e);if(n>=0){const[s]=t.equipment.splice(n,1);return this.pack.push(s),this.applyTemper(),s}}return null}assignCaster(e,t){const n=this.grimoire.find(r=>r.id===e);if(!n)return null;if(!t)return delete n.casterUid,delete n.casterName,n;const s=this.members.find(r=>r.name===t||r.uid===t);return s?(n.casterUid=s.uid,n.casterName=s.name,n):null}casterOf(e){return e!=null&&e.casterUid&&this.living().find(t=>t.uid===e.casterUid)||null}renameMember(e,t){if(!e)return null;const n=e.rename(t);for(const s of this.grimoire)s.casterUid===e.uid&&(s.casterName=n);return n}mindFor(e){const t=this.casterOf(e);return t?t.mind:this.bestMind()}toJSON(){return{members:this.members.map(e=>e.toJSON()),reserve:this.reserve.map(e=>e.toJSON()),grimoire:this.grimoire.map(e=>({...e})),tactics:this.tactics.map(e=>({...e})),personalities:[...this.personalities],trophies:this.trophies.map(e=>({...e})),gold:this.gold,score:this.score,materials:this.materials,potions:this.potions.map(e=>({...e})),pack:this.pack.map(e=>({...e})),supply:this.supply,spellsLearned:this.spellsLearned,poisonLinger:this.poisonLinger||0,alarmed:!!this.alarmed,desecrated:!!this.desecrated}}static fromJSON(e,t){const n=[];for(const l of e.members||[]){const c=t(l.id);c&&n.push(c)}for(const l of e.reserve||[]){const c=t(l.id);c&&n.push(c)}const s=new ii(n),r=[...s.members,...s.reserve],a=[...e.members||[],...e.reserve||[]];r.forEach((l,c)=>l.restore(a[c],t));const o=l=>l&&{...t(l.id)||{},...l};return s.grimoire=(e.grimoire||[]).map(o).filter(Boolean),s.tactics=(e.tactics||[]).map(o).filter(Boolean),s.personalities=[...e.personalities||[]],s.trophies=(e.trophies||[]).map(l=>({...l})),s.gold=e.gold||0,s.score=e.score||0,s.materials=e.materials||0,s.potions=(e.potions||[]).map(l=>({...l})),s.pack=(e.pack||[]).map(o).filter(Boolean),s.supply=e.supply??s.supply,s.spellsLearned=e.spellsLearned||0,s.poisonLinger=e.poisonLinger||0,s.alarmed=!!e.alarmed,s.desecrated=!!e.desecrated,s}applyTemper(){const e=hr(this).wound;for(const t of[...this.members,...this.reserve]){const n=t.equipment.some(s=>s.id==="eq-chainmail")?.3:0;t.woundBias=e+n}return e}living(){return this.members.filter(e=>e.isAlive())}addMember(e){const t=new Ra(e),n=[...this.members,...this.reserve].filter(s=>s.name.startsWith(e.name)).length;if(n>0){const s=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"];t.name=`${e.name}, ${s[Math.min(n,5)]}`}return this.living().length>=vn?this.reserve.push(t):this.members.push(t),t}isBenched(e){return this.reserve.includes(e)}promoteReserve(){if(this.reserve.length===0||this.living().length>=vn)return null;const e=this.reserve.shift();return this.members.push(e),e}isAlive(){return this.living().length>0}size(){return this.living().length}hasClass(e){return this.living().some(t=>t.class===e)}hasPersonality(e){return this.personalities.includes(e)}totalAttack(){return this.living().reduce((e,t)=>e+t.attack,0)}combatAttack(e=vn){const t=Math.max(1,Math.min(e,vn)),n=this.living().map(a=>a.attack).sort((a,o)=>o-a),s=n.slice(0,t).reduce((a,o)=>a+o,0),r=n.slice(t).reduce((a,o)=>a+o,0);return Math.round(s+r*.25)}totalDefense(){return this.living().reduce((e,t)=>e+t.defense,0)}bestMind(){return Math.max(0,...this.living().map(e=>e.mind))}totalHealth(){return this.living().reduce((e,t)=>e+t.health,0)}totalMaxHealth(){return this.members.reduce((e,t)=>e+t.maxHealth,0)}coatingBonusVs(e){let t=0;const n=new Set;for(const s of this.living())for(const r of s.weaponMods)r.element&&((e.weak||[]).includes(r.element)||r.element==="holy"&&e.undead)?(t+=2,n.add(r.name)):r.venom&&!e.undead&&(t+=1,n.add(r.name));return{bonus:t,notes:[...n]}}combatItemActions(){var t;const e=[];for(const n of this.living())for(const s of n.equipment){const r=(t=s.classActions)==null?void 0:t[n.class];r&&e.push({member:n.name,item:s.name,...r})}return e}takeDamage(e){let t=e;const n=[...this.living().filter(s=>s.class===W.FIGHTER),...this.living().filter(s=>s.class!==W.FIGHTER)];for(const s of n){if(t<=0)break;const r=Math.min(t,s.health);s.takeDamage(r),t-=r}}healParty(e){const t=this.living().filter(n=>n.health<n.maxHealth).sort((n,s)=>n.health/n.maxHealth-s.health/s.maxHealth);t.length!==0&&t[0].heal(e)}burnSupply(){this.marches++;const t=!this.living().some(l=>l.equipment.some(c=>c.id==="eq-lantern"))||this.marches%2===0;if(this.supply>0)return t?(this.supply--,this.supply===0?{kind:"guttered",supply:0}:this.supply<=2?{kind:"low",supply:this.supply}:null):null;const n=l=>{const c=this.darkCovered!==l;return this.darkCovered=l,c},s=this.castSpell("utility","sp-light");if(s)return n("conjured")?{kind:"conjured",supply:0,full:Zi,source:s.name}:null;const r=this.castSpell("utility","sp-feather");if(r)return n("sure-footed")?{kind:"sure-footed",supply:0,full:Zi,source:r.name}:null;if(this.canSeeInDark()){const l=this.grimoire.find(c=>c.id==="sp-eyes");return n("dark-seen")?{kind:"dark-seen",supply:0,full:Zi,source:(l==null?void 0:l.name)||"night-sight"}:null}this.darkCovered=null;const a=hr(this),o=Math.max(1,Zi+a.dark);for(const l of this.living())l.takeDamage(o);return this.darkMarches=(this.darkMarches||0)+1,{kind:"dark",supply:0,damage:o,full:Zi,temper:a.notes,darkMarches:this.darkMarches}}canSeeInDark(){return this.grimoire.some(e=>e.id==="sp-eyes")}provision(e,t="medium"){const n=nl[t]??nl.medium,s=Nn(this).supply,r=hr(this);return this.supply=Math.max(2,Math.round(e*n)+s+r.supply),this.provisionNotes=r.supplyNotes,this.marches=0,this.supply}addSupply(e){const t=this.supply;return this.supply=Math.min(tl*3,this.supply+e),this.supply-t}restStep(){return this.hasClass(W.CLERIC)&&this.healParty(1),this.castThisRoom.clear(),this.burnSupply()}applyLinger(){if(!this.poisonLinger)return null;const e=this.poisonLinger;return this.poisonLinger=0,this.hasClass(W.CLERIC)?{cured:!0}:(this.takeDamage(e),{damage:e})}castSpell(e,t=null){const n=c=>(t?c.id===t:c.use===e)&&!this.castThisRoom.has(c.id),s=this.grimoire.findIndex(n);if(s===-1)return null;const r=this.grimoire[s],a=this.hasClass(W.WIZARD),o=r.power+Math.floor(this.mindFor(r)/2)+(a?2:0),l=r.source==="found";return l?this.grimoire.splice(s,1):this.castThisRoom.add(r.id),{...r,effectivePower:o,consumed:l}}doAlchemy(e=Math.random()){if(!this.hasClass(W.ALCHEMIST)||this.materials<=0)return null;this.materials--;const t=this.living().some(n=>n.id==="char-perenelle");if(e<.5){const n={kind:"healing-draught",heal:6};return this.potions.push(n),t&&this.potions.push({...n}),{type:"potion",potion:n,doubled:t}}else{const n=this.living().reduce((r,a)=>r.attack>=a.attack?r:a),s=e<.75?{name:"fire coating",attack:2,element:"fire"}:{name:"venom coating",attack:3,venom:!0};return n.addWeaponMod(s),{type:"weapon-mod",mod:s,target:n.name}}}castHealIfNeeded(){const e=this.living().find(n=>n.health/n.maxHealth<=.4);if(!e)return null;const t=this.castSpell("heal");return t?(e.heal(t.effectivePower),{spell:t,target:e}):null}quaffIfNeeded(){if(this.potions.length===0)return!1;const e=this.living().find(n=>n.health/n.maxHealth<=.4);if(!e)return!1;const t=this.potions.shift();return e.heal(t.heal),!0}recordEncounter(e,t){this.encounterHistory[e]||(this.encounterHistory[e]={wins:0,losses:0}),this.encounterHistory[e][t?"wins":"losses"]++}addScore(e){this.score+=e}addGold(e){this.gold+=e,this.score+=e}}const Md={[Y.CHARACTER]:Eo,[Y.EQUIPMENT]:To,[Y.SPELL]:Es,[Y.PERSONALITY]:Ar,[Y.TACTIC]:Zc},yn={character:{statTotal:34},equipment:{bonusTotal:4},spell:{maxPower:6}},il=Ar.map(i=>i.archetype);function Qc(i){const e=[];if(!i||typeof i!="object")return["not a card"];if(i.id||e.push("needs an id"),(!i.name||i.name.length<2)&&e.push("needs a name"),Object.values(Y).includes(i.type)||e.push(`unknown type "${i.type}"`),i.type===Y.CHARACTER){Object.values(W).includes(i.class)||e.push(`unknown class "${i.class}"`);const t=i.stats||{};for(const s of["health","attack","defense","mind"])Number.isFinite(t[s])&&t[s]>=1||e.push(`stat ${s} must be ≥ 1`);const n=(t.health||0)+(t.attack||0)*2+(t.defense||0)*2+(t.mind||0);n>yn.character.statTotal&&e.push(`stat budget ${n} exceeds ${yn.character.statTotal} (health + 2×attack + 2×defense + mind)`)}if(i.type===Y.EQUIPMENT){const t=i.bonus||{},n=Object.values(t).reduce((s,r)=>s+r,0);n>yn.equipment.bonusTotal&&e.push(`bonus total ${n} exceeds ${yn.equipment.bonusTotal}`),Object.keys(t).length===0&&e.push("equipment needs at least one bonus")}return i.type===Y.SPELL&&(["combat","heal","utility"].includes(i.use)||e.push("spell use must be combat/heal/utility"),Number.isFinite(i.power)&&i.power>=1&&i.power<=yn.spell.maxPower||e.push(`spell power must be 1–${yn.spell.maxPower}`)),i.type===Y.PERSONALITY&&(il.includes(i.archetype)||e.push(`personality archetype must be one of: ${il.join(", ")}`)),e}function eh(i){const e=[];(!(i!=null&&i.id)||!(i!=null&&i.name))&&e.push("a pack needs an id and a name"),(!Array.isArray(i==null?void 0:i.cards)||i.cards.length===0)&&e.push("a pack needs cards");const t=new Set;for(const n of(i==null?void 0:i.cards)||[]){for(const s of Qc(n))e.push(`${(n==null?void 0:n.name)||(n==null?void 0:n.id)||"?"}: ${s}`);t.has(n.id)&&e.push(`duplicate card id ${n.id}`),t.add(n.id)}return e}const ki=[];function Ts(i,{enabled:e=!0}={}){const t=eh(i);if(t.length)throw new Error(`invalid pack: ${t.join("; ")}`);const n=ki.findIndex(r=>r.pack.id===i.id),s={pack:i,enabled:e};return n>=0?ki[n]=s:ki.push(s),s}function Sd(i,e){const t=ki.find(n=>n.pack.id===i);return t&&(t.enabled=e),t||null}function Ed(){return ki.map(i=>({id:i.pack.id,name:i.pack.name,description:i.pack.description,cards:i.pack.cards.length,enabled:i.enabled}))}function Qi(i){const e=ki.filter(t=>t.enabled).flatMap(t=>t.pack.cards.filter(n=>n.type===i));return[...Md[i]||[],...e]}class As{constructor(e){this.seed=this.hashCode(String(e))%2147483647,this.seed<=0&&(this.seed+=2147483646);for(let t=0;t<3;t++)this.next()}hashCode(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t=t&t;return Math.abs(t)}next(){return this.seed=this.seed*16807%2147483647,(this.seed-1)/2147483646}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(this.next()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}}const Td=[{id:"warlord",name:"The Warlord",icon:"⚔️",desc:"Drafts muscle first: fighters, weapons, and the will to use them.",skill:.55,weights:{character:3,equipment:2.5,spell:.8,personality:1,tactic:2.2},classBias:{fighter:3,rogue:1.5}},{id:"archmage",name:"The Archmage",icon:"🔮",desc:"Hoards spells and the wizards to wield them.",skill:.5,weights:{character:2,equipment:1,spell:3,personality:1,tactic:1.8},classBias:{wizard:3,cleric:1.5}},{id:"guildmaster",name:"The Guildmaster",icon:"⚖️",desc:"Balances the ledger: a bit of everything, nothing wasted.",skill:.7,weights:{character:2,equipment:2,spell:2,personality:2,tactic:2.5},classBias:{rogue:2,alchemist:2}}];function Ad(i){const e=[],t=new Set,n=(s,r)=>{const a=i.shuffle(s);let o=0;for(const l of a){if(o>=r)break;t.has(l.id)||(t.add(l.id),e.push({...l}),o++)}};return n(Qi(Y.CHARACTER),2),n(Qi(Y.EQUIPMENT),3),n(Qi(Y.SPELL),2),n(Qi(Y.PERSONALITY),1),n(Qi(Y.TACTIC),1),i.shuffle(e)}const th=["eq-lantern","sp-light","sp-eyes"];function Rd(i){return i.filter(e=>th.includes(e.id)).length}function Cd(i,e){const t=e.filter(s=>s.type===Y.CHARACTER);let n=1;if(i.type===Y.CHARACTER&&(t.length<vn?n=6.5-t.length*.4:t.length===vn?n=2:n=.2,i.class===W.CLERIC&&!t.some(s=>s.class===W.CLERIC)&&(n+=1.5)),i.type===Y.EQUIPMENT){const s=e.filter(r=>r.type===Y.EQUIPMENT).length;n=2,i.classActions&&(n+=2),i.bestFor&&t.some(r=>r.class===i.bestFor)&&(n+=1),i.cursed&&(n-=.2),s>=6&&(n-=(s-5)*.35)}if(i.type===Y.SPELL){const s=e.filter(r=>r.type===Y.SPELL).length;n=2+(t.some(r=>r.class===W.WIZARD)?1:0)+(i.use==="heal"?.5:0),s>=4&&(n-=(s-3)*.45)}if(th.includes(i.id)){const s=Rd(e);n+=s===0?3:s===1?.5:0}return i.type===Y.PERSONALITY&&(n=1-e.filter(r=>r.type===Y.PERSONALITY).length*1.2,i.archetype==="craven"&&(n-=1),(i.archetype==="reckless"||i.archetype==="greedy")&&(n+=.3)),n}function Ld(i,e,t){var a,o;const n=t.filter(l=>l.type===Y.CHARACTER),s=e.quirks||{};let r=((a=e.weights)==null?void 0:a[i.type])??1;if(i.type===Y.CHARACTER&&(r+=((o=e.classBias)==null?void 0:o[i.class])||0,r-=n.length*.35,!s.bodyBlind&&n.length===0&&(r+=3)),i.type===Y.EQUIPMENT&&i.cursed&&(r+=s.curseChaser?.8:-.8),s.shiny&&(i.classActions||i.type===Y.SPELL&&i.power>=5)&&(r+=s.shiny),i.type===Y.TACTIC&&i.requires){const l=t.some(c=>c.id===i.requires);s.treeBlind&&!l?r+=2:l||(r-=1.5)}if(i.type===Y.PERSONALITY){const l=t.filter(c=>c.type===Y.PERSONALITY);r-=l.length*1.2,i.trap&&!s.curseChaser&&(r-=.6)}return r}function Pd(i,e,t,n){const s=e.skill??.5,r=n.next()*(.4+(1-s)*1.6);return s*Cd(i,t)+(1-s)*Ld(i,e,t)+r}function kd(i,e,t,n){let s=null,r=-1/0;for(const a of i){const o=Pd(a,e,t,n);o>r&&(r=o,s=a)}return s}class Id{constructor(e="table",t=3){this.rng=new As(e),this.numRounds=t,this.seats=[{id:"player",name:"You",icon:"🐍",isAI:!1,pool:[]},...Td.map(n=>({id:n.id,name:n.name,icon:n.icon,isAI:!0,persona:n,pool:[]}))],this.round=0,this.pickInRound=0,this.packs=[],this.finished=!1,this.log=[],this.openNewPacks()}openNewPacks(){this.packs=this.seats.map(()=>Ad(this.rng)),this.pickInRound=0}passDirection(){return this.round%2===0?1:-1}getPlayerPack(){return this.packs[0]}playerPick(e){if(this.finished)return null;const t=this.packs[0],n=t.findIndex(a=>a.id===e);if(n===-1)return null;const s=t.splice(n,1)[0];this.seats[0].pool.push(s),this.log.push({round:this.round,pick:this.pickInRound,seat:0,card:s});const r=[];for(let a=1;a<this.seats.length;a++){const o=this.seats[a],l=kd(this.packs[a],o.persona,o.pool,this.rng);if(l){const c=this.packs[a].findIndex(d=>d.id===l.id);this.packs[a].splice(c,1),o.pool.push(l),this.log.push({round:this.round,pick:this.pickInRound,seat:a,card:l}),r.push({seat:o.name,icon:o.icon,card:l})}}return this.pickInRound++,this.packs[0].length>0?this.passDirection()===1?this.packs.unshift(this.packs.pop()):this.packs.push(this.packs.shift()):(this.round++,this.round>=this.numRounds?this.finished=!0:this.openNewPacks()),{playerCard:s,aiPicks:r}}getPlayerPool(){const e=this.seats[0].pool;return{all:e,characters:e.filter(t=>t.type===Y.CHARACTER),equipment:e.filter(t=>t.type===Y.EQUIPMENT),spells:e.filter(t=>t.type===Y.SPELL),personalities:e.filter(t=>t.type===Y.PERSONALITY)}}getTableSummary(){return this.seats.map(e=>({name:e.name,icon:e.icon,isAI:e.isAI,counts:{characters:e.pool.filter(t=>t.type===Y.CHARACTER).length,equipment:e.pool.filter(t=>t.type===Y.EQUIPMENT).length,spells:e.pool.filter(t=>t.type===Y.SPELL).length,personalities:e.pool.filter(t=>t.type===Y.PERSONALITY).length}}))}}const Ii={none:{id:"none",name:"Standard Delve",icon:"🗺️",text:"No wager. The dungeon as the dungeon intends.",scoreBonus:0},swarms:{id:"swarms",name:"Monster Swarms",icon:"🐝",text:"The halls run thick with the weak and the many — more fights, thinner foes, more score.",scoreBonus:.25,weightTweaks:{monster:2,corridor:-.3},monsterHealthMult:.7},traps:{id:"traps",name:"Trap-Dense",icon:"🪤",text:"Every flagstone is a question. More traps, and they bite deeper.",scoreBonus:.25,weightTweaks:{trap:2},trapBonus:2},darkpact:{id:"darkpact",name:"Dark Pact",icon:"🩸",text:"The dungeon's malice sharpens its teeth — and gilds its hoard.",scoreBonus:.3,monsterAttackMult:1.25,goldMult:1.5},nightfall:{id:"nightfall",name:"Endless Night",icon:"🌑",text:"No light reaches here. The dungeon itself turns hostile more often.",scoreBonus:.3,weightTweaks:{disaster:1.5,treasure:-.3}},throne:{id:"throne",name:"The Long Throne",icon:"👑",text:"Fewer rooms, one horror. The boss has grown fat on patience.",scoreBonus:.35,weightTweaks:{monster:-1,treasure:.5},bossAttackMult:1.4,bossHealthMult:1.4}};function Sn(i){return Ii[i]||Ii.none}function nh(i,e){const t=i&&typeof i=="object"?i:Sn(i),n=e&&typeof e=="object"?e:Sn(e);if(t.id==="none")return n;if(n.id==="none")return t;const s={...t.weightTweaks||{}};for(const[o,l]of Object.entries(n.weightTweaks||{}))s[o]=(s[o]||0)+l;const r=o=>(t[o]||1)*(n[o]||1),a={id:`${t.id}+${n.id}`,name:`${t.name} + ${n.name}`,icon:`${t.icon}${n.icon}`,text:`${t.text} ${n.text}`,scoreBonus:(t.scoreBonus||0)+(n.scoreBonus||0),weightTweaks:s,trapBonus:(t.trapBonus||0)+(n.trapBonus||0)};for(const o of["goldMult","monsterAttackMult","monsterHealthMult","bossAttackMult","bossHealthMult"]){const l=r(o);l!==1&&(a[o]=l)}return a}class Dd{constructor(e,t){this.draft=e,this.onComplete=t,this.lastAiPicks=[],this.selection={seed:"",difficulty:"medium"}}render(){const e=document.getElementById("draft-container");if(e.innerHTML="",e.style.display="block",this.draft.finished){this.renderDraftComplete(e);return}const t=this.draft.round+1,n=this.draft.pickInRound+1,s=this.draft.passDirection()===1?"→ passing left":"← passing right",r=document.createElement("div");r.style.cssText="text-align:center;margin-bottom:1rem;",r.innerHTML=`
      <div style="color:#d8a53f;font-size:1.1rem;font-weight:bold;">Pack ${t} of ${this.draft.numRounds} — Pick ${n}</div>
      <div style="color:#887755;font-size:0.8rem;">${s} · click ONE card to draft it, then the pack passes on</div>
      <div style="font-size:0.72rem;margin-top:0.4rem;display:flex;gap:0.9rem;justify-content:center;flex-wrap:wrap;">
        <span class="type-character">● Character</span>
        <span class="type-equipment">● Equipment</span>
        <span class="type-spell">● Spell</span>
        <span class="type-personality">● Personality</span>
      </div>
    `,e.appendChild(r);const a=document.createElement("div");a.className="pack-grid";for(const o of this.draft.getPlayerPack())a.appendChild(this.renderCard(o,()=>this.pick(o.id)));if(e.appendChild(a),this.lastAiPicks.length>0){const o=document.createElement("div");o.className="panel",o.style.cssText="margin-top:1rem;",o.innerHTML="<h2>The Table's Last Picks</h2>"+this.lastAiPicks.map(l=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${l.icon} ${l.seat} took <strong style="color:#c8b088;">${l.card.icon} ${l.card.name}</strong></div>`).join(""),e.appendChild(o)}this.renderPool(e)}renderCard(e,t){const n=document.createElement("div");n.className="draft-card";const s={fire:'<span style="color:#ff8a3c;">🔥 fire</span>',frost:'<span style="color:#7ec8ff;">❄️ frost</span>',shock:'<span style="color:#ffe95e;">⚡ shock</span>',holy:'<span style="color:#ffe9a0;">🌟 holy</span>'};let r="";if(e.type===Y.CHARACTER)r=`<div class="card-stats">❤️${e.stats.health} ⚔️${e.stats.attack} 🛡️${e.stats.defense} 🧠${e.stats.mind}</div>`;else if(e.type===Y.EQUIPMENT){const o=Object.entries(e.bonus).map(([c,d])=>`${d>0?"+":""}${d} ${c}`).join(", "),l=e.classActions?` · <span style="color:#d8a53f;" title="${Object.entries(e.classActions).map(([c,d])=>`${c}: ${d.name}`).join(" · ")}">✦ different in every hand</span>`:"";r=`<div class="card-stats">${o}${e.bestFor?` · best: ${e.bestFor}`:""}${l}</div>`}else if(e.type===Y.SPELL){const o=s[e.element]?` · ${s[e.element]}`:"";r=`<div class="card-stats">power ${e.power} · ${e.use}${o}</div>`}const a=e.cursed?' <span style="color:#e05555;">· CURSED</span>':"";return n.innerHTML=`
      <div class="card-type type-${e.type}">${e.type}${e.class?" · "+e.class:""}${a}</div>
      <div class="card-name">${e.icon} ${e.name}</div>
      <div class="card-text">${e.trait||e.text||""}</div>
      ${r}
    `,n.addEventListener("click",t),n}pick(e){const t=this.draft.playerPick(e);t&&(this.lastAiPicks=t.aiPicks),this.render()}renderPool(e){const t=this.draft.getPlayerPool(),n=document.createElement("div");n.className="panel",n.style.cssText="margin-top:1rem;";const s=(r,a)=>a.length?`<div style="margin-bottom:0.4rem;"><span style="color:#887755;font-size:0.72rem;">${r}:</span> ${a.map(o=>`${o.icon} ${o.name}`).join(" · ")}</div>`:"";n.innerHTML=`
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
    `,e.appendChild(n);const s=document.createElement("div");s.className="pack-grid";for(const p of t.all){const f=this.renderCard(p,()=>{});f.style.cursor="default",s.appendChild(f)}e.appendChild(s);const r=document.createElement("div");r.className="panel",r.style.cssText="margin-top:1rem;",r.innerHTML="<h2>The Rest of the Table</h2>"+this.draft.getTableSummary().filter(p=>p.isAI).map(p=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${p.icon} ${p.name}: party of ${p.counts.characters}, ${p.counts.equipment} equipment, ${p.counts.spells} spells</div>`).join(""),e.appendChild(r);const a=document.createElement("div");a.className="panel",a.style.cssText="margin-top:1rem;";const o=Object.values(Ii).map(p=>`<option value="${p.id}"${p.id==="none"?" selected":""}>${p.icon} ${p.name}${p.scoreBonus?` (+${Math.round(p.scoreBonus*100)}% score)`:""}</option>`).join("");a.innerHTML=`
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
            ${o}
          </select>
        </label>
        <div id="condition-hint" style="margin-top:0.35rem;font-size:0.75rem;color:#887755;font-style:italic;line-height:1.4;"></div>
      </div>
      <div style="margin-top:0.9rem;font-size:0.85rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;">
        <div style="color:#e8724a;margin-bottom:0.35rem;">🩸 Lay a Hex — curse a rival's run</div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <label style="flex:1;min-width:140px;">Rival
            <select id="hex-target-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
              ${this.draft.seats.filter(p=>p.isAI).map(p=>`<option value="${p.id}">${p.icon} ${p.name}</option>`).join("")}
            </select>
          </label>
          <label style="flex:1;min-width:140px;">Hex
            <select id="hex-condition-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
              <option value="none" selected>No hex — stay civil</option>
              ${Object.values(Ii).filter(p=>p.id!=="none").map(p=>`<option value="${p.id}">${p.icon} ${p.name}</option>`).join("")}
            </select>
          </label>
        </div>
        <div style="margin-top:0.35rem;font-size:0.72rem;color:#887755;font-style:italic;">Fair warning: the table hexes back. One rival will curse your run — but its score premium is yours to keep.</div>
      </div>
    `,e.appendChild(a);const l=a.querySelector("#condition-select"),c=a.querySelector("#condition-hint"),d=()=>{var p;c.textContent=((p=Ii[l.value])==null?void 0:p.text)||""};l.addEventListener("change",d),d();const h=document.createElement("button");h.textContent="🏰 Enter the Dungeon",h.style.cssText="width:100%;margin-top:1rem;padding:1rem;font-size:1rem;",h.addEventListener("click",()=>{const p=document.getElementById("difficulty-select").value,f=document.getElementById("seed-input").value.trim()||`delve-${Date.now().toString(36)}`,v=document.getElementById("condition-select").value,g=document.getElementById("hex-target-select").value,m=document.getElementById("hex-condition-select").value;this.onComplete({pool:t.all,difficulty:p,seed:f,condition:v,hexTarget:g,hexCondition:m})}),e.appendChild(h)}}class Nd{constructor(e){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext("2d")}render(e){const t=this.ctx,{dungeon:n,roomIndex:s,party:r}=e,a=this.canvas.clientWidth||500,o=this.canvas.clientHeight||420;(this.canvas.width!==a||this.canvas.height!==o)&&(this.canvas.width=a,this.canvas.height=o),t.fillStyle="#0d0b08",t.fillRect(0,0,a,o);const l=n.rooms,c=l[Math.min(s,l.length-1)],d=(c==null?void 0:c.floor)||0,h=E=>(E.floor||0)===d,p=l.filter(E=>h(E)&&!(E.secret&&!E.discovered));if(p.length===0)return;const f=26,v=Math.min(...p.map(E=>E.x-(E.w||4)/2)),g=Math.max(...p.map(E=>E.x+(E.w||4)/2)),m=Math.min(...p.map(E=>E.y-(E.h||4)/2)),u=Math.max(...p.map(E=>E.y+(E.h||4)/2)),x=Math.min((a-f*2)/Math.max(1,g-v),(o-f*2)/Math.max(1,u-m)),_=E=>f+(E.x-v)*x,w=E=>f+(E.y-m)*x,k=l[Math.min(s,l.length-1)];t.strokeStyle="#3a2f1e",t.lineWidth=Math.max(3,x*1.4);for(const E of n.edges||[]){if(E.kind==="trapdoor"||E.kind==="stair")continue;const A=l[E.a],C=l[E.b];!A||!C||!h(A)||!h(C)||A.secret&&!A.discovered||C.secret&&!C.discovered||(t.setLineDash(E.secret?[4,3]:[]),t.beginPath(),t.moveTo(_(A),w(A)),t.lineTo(_(C),w(C)),t.stroke())}t.setLineDash([]);for(let E=0;E<l.length;E++){const A=l[E];if(!h(A)||A.secret&&!A.discovered)continue;const C=Math.max(6,(A.w||4)*x),M=Math.max(6,(A.h||4)*x),y=_(A),T=w(A),D=A===k,L=A.cleared,B=A.type==="boss";if(D){const z=Math.max(C,M),Z=t.createRadialGradient(y,T,4,y,T,z);Z.addColorStop(0,"rgba(216, 165, 63, 0.45)"),Z.addColorStop(1,"rgba(216, 165, 63, 0)"),t.fillStyle=Z,t.fillRect(y-z,T-z,z*2,z*2)}t.fillStyle=D?"#2a2213":L?"#171310":"#14110b",t.strokeStyle=D?"#d8a53f":B?"#8a3a3a":"#3a2f1e",t.lineWidth=D?2.5:1.5,A.shape==="rotunda"?(t.beginPath(),t.arc(y,T,Math.min(C,M)/2,0,Math.PI*2),t.fill(),t.stroke()):(t.fillRect(y-C/2,T-M/2,C,M),t.strokeRect(y-C/2,T-M/2,C,M));const q=A.cleared||D||B||(e.knownIdxs?e.knownIdxs.includes(E):!0);t.font=`${Math.max(10,Math.min(20,Math.min(C,M)*.5))}px serif`,t.textAlign="center",t.textBaseline="middle",t.globalAlpha=L&&!D?.45:1,t.fillText(q?A.icon:"❓",y,D?T-M*.3:T),t.globalAlpha=1}if((d>0||l.some(E=>(E.floor||0)>0))&&(t.fillStyle="#8a7a58",t.font="12px system-ui, sans-serif",t.textAlign="left",t.textBaseline="top",t.fillText(`Floor ${d+1}`,8,8)),k&&r&&!(k.secret&&!k.discovered)){const E=r.members.filter(L=>L.alive),A=Math.max(6,(k.w||4)*x),C=Math.max(6,(k.h||4)*x),M=_(k),y=w(k)+C*.18;t.font=`${Math.max(11,Math.min(16,x))}px serif`,t.textAlign="center",t.textBaseline="middle";const T=C>A?Math.min(E.length,2):Math.min(E.length,4),D=Math.min(x*1.1,A/Math.max(1,T+.5));E.forEach((L,B)=>{const q=Math.floor(B/T),z=B%T,Z=Math.min(T,E.length-q*T),$=(z-(Z-1)/2)*D;t.fillText(L.icon,M+$,y+q*Math.min(x,C*.22))})}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ao="170",Ud=0,sl=1,Od=2,ih=1,sh=2,gn=3,zn=0,Lt=1,_n=2,On=0,Di=1,Ca=2,rl=3,al=4,Fd=5,Jn=100,Bd=101,zd=102,Hd=103,Gd=104,$d=200,Vd=201,Wd=202,qd=203,La=204,Pa=205,Xd=206,Yd=207,jd=208,Kd=209,Jd=210,Zd=211,Qd=212,eu=213,tu=214,ka=0,Ia=1,Da=2,Fi=3,Na=4,Ua=5,Oa=6,Fa=7,rh=0,nu=1,iu=2,Fn=0,su=1,ru=2,au=3,ou=4,lu=5,cu=6,hu=7,ah=300,Bi=301,zi=302,Ba=303,za=304,Rr=306,Ha=1e3,ei=1001,Ga=1002,Ut=1003,du=1004,Ns=1005,nn=1006,Ur=1007,ti=1008,Tn=1009,oh=1010,lh=1011,Rs=1012,Ro=1013,si=1014,bn=1015,Ls=1016,Co=1017,Lo=1018,Hi=1020,ch=35902,hh=1021,dh=1022,Jt=1023,uh=1024,fh=1025,Ni=1026,Gi=1027,ph=1028,Po=1029,mh=1030,ko=1031,Io=1033,dr=33776,ur=33777,fr=33778,pr=33779,$a=35840,Va=35841,Wa=35842,qa=35843,Xa=36196,Ya=37492,ja=37496,Ka=37808,Ja=37809,Za=37810,Qa=37811,eo=37812,to=37813,no=37814,io=37815,so=37816,ro=37817,ao=37818,oo=37819,lo=37820,co=37821,mr=36492,ho=36494,uo=36495,gh=36283,fo=36284,po=36285,mo=36286,uu=3200,fu=3201,vh=0,pu=1,Un="",Mt="srgb",qi="srgb-linear",Cr="linear",Je="srgb",ci=7680,ol=519,mu=512,gu=513,vu=514,yh=515,yu=516,_u=517,xu=518,bu=519,go=35044,ll="300 es",wn=2e3,_r=2001;class Xi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Or=Math.PI/180,vo=180/Math.PI;function Bn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function yt(i,e,t){return Math.max(e,Math.min(t,i))}function wu(i,e){return(i%e+e)%e}function Fr(i,e,t){return(1-t)*i+t*e}function tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ze(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class fe{constructor(e=0,t=0){fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,n,s,r,a,o,l,c){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],h=n[7],p=n[2],f=n[5],v=n[8],g=s[0],m=s[3],u=s[6],x=s[1],_=s[4],w=s[7],k=s[2],E=s[5],A=s[8];return r[0]=a*g+o*x+l*k,r[3]=a*m+o*_+l*E,r[6]=a*u+o*w+l*A,r[1]=c*g+d*x+h*k,r[4]=c*m+d*_+h*E,r[7]=c*u+d*w+h*A,r[2]=p*g+f*x+v*k,r[5]=p*m+f*_+v*E,r[8]=p*u+f*w+v*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,p=o*l-d*r,f=c*r-a*l,v=t*h+n*p+s*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=h*g,e[1]=(s*c-d*n)*g,e[2]=(o*n-s*a)*g,e[3]=p*g,e[4]=(d*t-s*l)*g,e[5]=(s*r-o*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Br.makeScale(e,t)),this}rotate(e){return this.premultiply(Br.makeRotation(-e)),this}translate(e,t){return this.premultiply(Br.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Br=new Ne;function _h(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Cs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mu(){const i=Cs("canvas");return i.style.display="block",i}const cl={};function ms(i){i in cl||(cl[i]=!0,console.warn(i))}function Su(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Eu(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Tu(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const qe={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Je&&(i.r=En(i.r),i.g=En(i.g),i.b=En(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Je&&(i.r=Ui(i.r),i.g=Ui(i.g),i.b=Ui(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Un?Cr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function En(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ui(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const hl=[.64,.33,.3,.6,.15,.06],dl=[.2126,.7152,.0722],ul=[.3127,.329],fl=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pl=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[qi]:{primaries:hl,whitePoint:ul,transfer:Cr,toXYZ:fl,fromXYZ:pl,luminanceCoefficients:dl,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:hl,whitePoint:ul,transfer:Je,toXYZ:fl,fromXYZ:pl,luminanceCoefficients:dl,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}});let hi;class Au{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{hi===void 0&&(hi=Cs("canvas")),hi.width=e.width,hi.height=e.height;const n=hi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=hi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Cs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=En(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(En(t[n]/255)*255):t[n]=En(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ru=0;class xh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(zr(s[a].image)):r.push(zr(s[a]))}else r=zr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Au.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Cu=0;class Et extends Xi{constructor(e=Et.DEFAULT_IMAGE,t=Et.DEFAULT_MAPPING,n=ei,s=ei,r=nn,a=ti,o=Jt,l=Tn,c=Et.DEFAULT_ANISOTROPY,d=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=Bn(),this.name="",this.source=new xh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ha:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case Ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ha:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case Ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Et.DEFAULT_IMAGE=null;Et.DEFAULT_MAPPING=ah;Et.DEFAULT_ANISOTROPY=1;class Qe{constructor(e=0,t=0,n=0,s=1){Qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],p=l[1],f=l[5],v=l[9],g=l[2],m=l[6],u=l[10];if(Math.abs(d-p)<.01&&Math.abs(h-g)<.01&&Math.abs(v-m)<.01){if(Math.abs(d+p)<.1&&Math.abs(h+g)<.1&&Math.abs(v+m)<.1&&Math.abs(c+f+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,w=(f+1)/2,k=(u+1)/2,E=(d+p)/4,A=(h+g)/4,C=(v+m)/4;return _>w&&_>k?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=E/n,r=A/n):w>k?w<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),n=E/s,r=C/s):k<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(k),n=A/r,s=C/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-v)*(m-v)+(h-g)*(h-g)+(p-d)*(p-d));return Math.abs(x)<.001&&(x=1),this.x=(m-v)/x,this.y=(h-g)/x,this.z=(p-d)/x,this.w=Math.acos((c+f+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Lu extends Xi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Et(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new xh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ri extends Lu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class bh extends Et{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Pu extends Et{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ps{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],h=n[s+3];const p=r[a+0],f=r[a+1],v=r[a+2],g=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=p,e[t+1]=f,e[t+2]=v,e[t+3]=g;return}if(h!==g||l!==p||c!==f||d!==v){let m=1-o;const u=l*p+c*f+d*v+h*g,x=u>=0?1:-1,_=1-u*u;if(_>Number.EPSILON){const k=Math.sqrt(_),E=Math.atan2(k,u*x);m=Math.sin(m*E)/k,o=Math.sin(o*E)/k}const w=o*x;if(l=l*m+p*w,c=c*m+f*w,d=d*m+v*w,h=h*m+g*w,m===1-o){const k=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=k,c*=k,d*=k,h*=k}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],h=r[a],p=r[a+1],f=r[a+2],v=r[a+3];return e[t]=o*v+d*h+l*f-c*p,e[t+1]=l*v+d*p+c*h-o*f,e[t+2]=c*v+d*f+o*p-l*h,e[t+3]=d*v-o*h-l*p-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),h=o(r/2),p=l(n/2),f=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=p*d*h+c*f*v,this._y=c*f*h-p*d*v,this._z=c*d*v+p*f*h,this._w=c*d*h-p*f*v;break;case"YXZ":this._x=p*d*h+c*f*v,this._y=c*f*h-p*d*v,this._z=c*d*v-p*f*h,this._w=c*d*h+p*f*v;break;case"ZXY":this._x=p*d*h-c*f*v,this._y=c*f*h+p*d*v,this._z=c*d*v+p*f*h,this._w=c*d*h-p*f*v;break;case"ZYX":this._x=p*d*h-c*f*v,this._y=c*f*h+p*d*v,this._z=c*d*v-p*f*h,this._w=c*d*h+p*f*v;break;case"YZX":this._x=p*d*h+c*f*v,this._y=c*f*h+p*d*v,this._z=c*d*v-p*f*h,this._w=c*d*h-p*f*v;break;case"XZY":this._x=p*d*h-c*f*v,this._y=c*f*h-p*d*v,this._z=c*d*v+p*f*h,this._w=c*d*h+p*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],p=n+o+h;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-t)*d)/c,p=Math.sin(t*d)/c;return this._w=a*h+this._w*p,this._x=n*h+this._x*p,this._y=s*h+this._y*p,this._z=r*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ml.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ml.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*d,this.y=n+l*d+o*c-r*h,this.z=s+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Hr.copy(this).projectOnVector(e),this.sub(Hr)}reflect(e){return this.sub(Hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new P,ml=new Ps;class ks{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qt):qt.fromBufferAttribute(r,a),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Us.copy(n.boundingBox)),Us.applyMatrix4(e.matrixWorld),this.union(Us)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(es),Os.subVectors(this.max,es),di.subVectors(e.a,es),ui.subVectors(e.b,es),fi.subVectors(e.c,es),Cn.subVectors(ui,di),Ln.subVectors(fi,ui),$n.subVectors(di,fi);let t=[0,-Cn.z,Cn.y,0,-Ln.z,Ln.y,0,-$n.z,$n.y,Cn.z,0,-Cn.x,Ln.z,0,-Ln.x,$n.z,0,-$n.x,-Cn.y,Cn.x,0,-Ln.y,Ln.x,0,-$n.y,$n.x,0];return!Gr(t,di,ui,fi,Os)||(t=[1,0,0,0,1,0,0,0,1],!Gr(t,di,ui,fi,Os))?!1:(Fs.crossVectors(Cn,Ln),t=[Fs.x,Fs.y,Fs.z],Gr(t,di,ui,fi,Os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hn=[new P,new P,new P,new P,new P,new P,new P,new P],qt=new P,Us=new ks,di=new P,ui=new P,fi=new P,Cn=new P,Ln=new P,$n=new P,es=new P,Os=new P,Fs=new P,Vn=new P;function Gr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Vn.fromArray(i,r);const o=s.x*Math.abs(Vn.x)+s.y*Math.abs(Vn.y)+s.z*Math.abs(Vn.z),l=e.dot(Vn),c=t.dot(Vn),d=n.dot(Vn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const ku=new ks,ts=new P,$r=new P;class Do{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ku.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ts.subVectors(e,this.center);const t=ts.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ts,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($r.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ts.copy(e.center).add($r)),this.expandByPoint(ts.copy(e.center).sub($r))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new P,Vr=new P,Bs=new P,Pn=new P,Wr=new P,zs=new P,qr=new P;class Iu{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dn.copy(this.origin).addScaledVector(this.direction,t),dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Vr.copy(e).add(t).multiplyScalar(.5),Bs.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(Vr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Bs),o=Pn.dot(this.direction),l=-Pn.dot(Bs),c=Pn.lengthSq(),d=Math.abs(1-a*a);let h,p,f,v;if(d>0)if(h=a*l-o,p=a*o-l,v=r*d,h>=0)if(p>=-v)if(p<=v){const g=1/d;h*=g,p*=g,f=h*(h+a*p+2*o)+p*(a*h+p+2*l)+c}else p=r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;else p=-r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;else p<=-v?(h=Math.max(0,-(-a*r+o)),p=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+p*(p+2*l)+c):p<=v?(h=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(h=Math.max(0,-(a*r+o)),p=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+p*(p+2*l)+c);else p=a>0?-r:r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Vr).addScaledVector(Bs,p),f}intersectSphere(e,t){dn.subVectors(e.center,this.origin);const n=dn.dot(this.direction),s=dn.dot(dn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,s=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,s=(e.min.x-p.x)*c),d>=0?(r=(e.min.y-p.y)*d,a=(e.max.y-p.y)*d):(r=(e.max.y-p.y)*d,a=(e.min.y-p.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(o=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,dn)!==null}intersectTriangle(e,t,n,s,r){Wr.subVectors(t,e),zs.subVectors(n,e),qr.crossVectors(Wr,zs);let a=this.direction.dot(qr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,e);const l=o*this.direction.dot(zs.crossVectors(Pn,zs));if(l<0)return null;const c=o*this.direction.dot(Wr.cross(Pn));if(c<0||l+c>a)return null;const d=-o*Pn.dot(qr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,n,s,r,a,o,l,c,d,h,p,f,v,g,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,h,p,f,v,g,m)}set(e,t,n,s,r,a,o,l,c,d,h,p,f,v,g,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=p,u[3]=f,u[7]=v,u[11]=g,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/pi.setFromMatrixColumn(e,0).length(),r=1/pi.setFromMatrixColumn(e,1).length(),a=1/pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const p=a*d,f=a*h,v=o*d,g=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+v*c,t[5]=p-g*c,t[9]=-o*l,t[2]=g-p*c,t[6]=v+f*c,t[10]=a*l}else if(e.order==="YXZ"){const p=l*d,f=l*h,v=c*d,g=c*h;t[0]=p+g*o,t[4]=v*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-v,t[6]=g+p*o,t[10]=a*l}else if(e.order==="ZXY"){const p=l*d,f=l*h,v=c*d,g=c*h;t[0]=p-g*o,t[4]=-a*h,t[8]=v+f*o,t[1]=f+v*o,t[5]=a*d,t[9]=g-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const p=a*d,f=a*h,v=o*d,g=o*h;t[0]=l*d,t[4]=v*c-f,t[8]=p*c+g,t[1]=l*h,t[5]=g*c+p,t[9]=f*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const p=a*l,f=a*c,v=o*l,g=o*c;t[0]=l*d,t[4]=g-p*h,t[8]=v*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*h+v,t[10]=p-g*h}else if(e.order==="XZY"){const p=a*l,f=a*c,v=o*l,g=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=p*h+g,t[5]=a*d,t[9]=f*h-v,t[2]=v*h-f,t[6]=o*d,t[10]=g*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Du,e,Nu)}lookAt(e,t,n){const s=this.elements;return kt.subVectors(e,t),kt.lengthSq()===0&&(kt.z=1),kt.normalize(),kn.crossVectors(n,kt),kn.lengthSq()===0&&(Math.abs(n.z)===1?kt.x+=1e-4:kt.z+=1e-4,kt.normalize(),kn.crossVectors(n,kt)),kn.normalize(),Hs.crossVectors(kt,kn),s[0]=kn.x,s[4]=Hs.x,s[8]=kt.x,s[1]=kn.y,s[5]=Hs.y,s[9]=kt.y,s[2]=kn.z,s[6]=Hs.z,s[10]=kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],h=n[5],p=n[9],f=n[13],v=n[2],g=n[6],m=n[10],u=n[14],x=n[3],_=n[7],w=n[11],k=n[15],E=s[0],A=s[4],C=s[8],M=s[12],y=s[1],T=s[5],D=s[9],L=s[13],B=s[2],q=s[6],z=s[10],Z=s[14],$=s[3],ee=s[7],ae=s[11],Me=s[15];return r[0]=a*E+o*y+l*B+c*$,r[4]=a*A+o*T+l*q+c*ee,r[8]=a*C+o*D+l*z+c*ae,r[12]=a*M+o*L+l*Z+c*Me,r[1]=d*E+h*y+p*B+f*$,r[5]=d*A+h*T+p*q+f*ee,r[9]=d*C+h*D+p*z+f*ae,r[13]=d*M+h*L+p*Z+f*Me,r[2]=v*E+g*y+m*B+u*$,r[6]=v*A+g*T+m*q+u*ee,r[10]=v*C+g*D+m*z+u*ae,r[14]=v*M+g*L+m*Z+u*Me,r[3]=x*E+_*y+w*B+k*$,r[7]=x*A+_*T+w*q+k*ee,r[11]=x*C+_*D+w*z+k*ae,r[15]=x*M+_*L+w*Z+k*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],p=e[10],f=e[14],v=e[3],g=e[7],m=e[11],u=e[15];return v*(+r*l*h-s*c*h-r*o*p+n*c*p+s*o*f-n*l*f)+g*(+t*l*f-t*c*p+r*a*p-s*a*f+s*c*d-r*l*d)+m*(+t*c*h-t*o*f-r*a*h+n*a*f+r*o*d-n*c*d)+u*(-s*o*d-t*l*h+t*o*p+s*a*h-n*a*p+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],p=e[10],f=e[11],v=e[12],g=e[13],m=e[14],u=e[15],x=h*m*c-g*p*c+g*l*f-o*m*f-h*l*u+o*p*u,_=v*p*c-d*m*c-v*l*f+a*m*f+d*l*u-a*p*u,w=d*g*c-v*h*c+v*o*f-a*g*f-d*o*u+a*h*u,k=v*h*l-d*g*l-v*o*p+a*g*p+d*o*m-a*h*m,E=t*x+n*_+s*w+r*k;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=x*A,e[1]=(g*p*r-h*m*r-g*s*f+n*m*f+h*s*u-n*p*u)*A,e[2]=(o*m*r-g*l*r+g*s*c-n*m*c-o*s*u+n*l*u)*A,e[3]=(h*l*r-o*p*r-h*s*c+n*p*c+o*s*f-n*l*f)*A,e[4]=_*A,e[5]=(d*m*r-v*p*r+v*s*f-t*m*f-d*s*u+t*p*u)*A,e[6]=(v*l*r-a*m*r-v*s*c+t*m*c+a*s*u-t*l*u)*A,e[7]=(a*p*r-d*l*r+d*s*c-t*p*c-a*s*f+t*l*f)*A,e[8]=w*A,e[9]=(v*h*r-d*g*r-v*n*f+t*g*f+d*n*u-t*h*u)*A,e[10]=(a*g*r-v*o*r+v*n*c-t*g*c-a*n*u+t*o*u)*A,e[11]=(d*o*r-a*h*r-d*n*c+t*h*c+a*n*f-t*o*f)*A,e[12]=k*A,e[13]=(d*g*s-v*h*s+v*n*p-t*g*p-d*n*m+t*h*m)*A,e[14]=(v*o*s-a*g*s-v*n*l+t*g*l+a*n*m-t*o*m)*A,e[15]=(a*h*s-d*o*s+d*n*l-t*h*l-a*n*p+t*o*p)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,p=r*c,f=r*d,v=r*h,g=a*d,m=a*h,u=o*h,x=l*c,_=l*d,w=l*h,k=n.x,E=n.y,A=n.z;return s[0]=(1-(g+u))*k,s[1]=(f+w)*k,s[2]=(v-_)*k,s[3]=0,s[4]=(f-w)*E,s[5]=(1-(p+u))*E,s[6]=(m+x)*E,s[7]=0,s[8]=(v+_)*A,s[9]=(m-x)*A,s[10]=(1-(p+g))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=pi.set(s[0],s[1],s[2]).length();const a=pi.set(s[4],s[5],s[6]).length(),o=pi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Xt.copy(this);const c=1/r,d=1/a,h=1/o;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=d,Xt.elements[5]*=d,Xt.elements[6]*=d,Xt.elements[8]*=h,Xt.elements[9]*=h,Xt.elements[10]*=h,t.setFromRotationMatrix(Xt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=wn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s);let f,v;if(o===wn)f=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===_r)f=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=wn){const l=this.elements,c=1/(t-e),d=1/(n-s),h=1/(a-r),p=(t+e)*c,f=(n+s)*d;let v,g;if(o===wn)v=(a+r)*h,g=-2*h;else if(o===_r)v=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const pi=new P,Xt=new ot,Du=new P(0,0,0),Nu=new P(1,1,1),kn=new P,Hs=new P,kt=new P,gl=new ot,vl=new Ps;class rn{constructor(e=0,t=0,n=0,s=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],h=s[2],p=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(yt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-yt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vl.setFromEuler(this),this.setFromQuaternion(vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class wh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Uu=0;const yl=new P,mi=new Ps,un=new ot,Gs=new P,ns=new P,Ou=new P,Fu=new Ps,_l=new P(1,0,0),xl=new P(0,1,0),bl=new P(0,0,1),wl={type:"added"},Bu={type:"removed"},gi={type:"childadded",child:null},Xr={type:"childremoved",child:null};class vt extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new P,t=new rn,n=new Ps,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ne}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.multiply(mi),this}rotateOnWorldAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.premultiply(mi),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(xl,e)}rotateZ(e){return this.rotateOnAxis(bl,e)}translateOnAxis(e,t){return yl.copy(e).applyQuaternion(this.quaternion),this.position.add(yl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(xl,e)}translateZ(e){return this.translateOnAxis(bl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Gs.copy(e):Gs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(ns,Gs,this.up):un.lookAt(Gs,ns,this.up),this.quaternion.setFromRotationMatrix(un),s&&(un.extractRotation(s.matrixWorld),mi.setFromRotationMatrix(un),this.quaternion.premultiply(mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wl),gi.child=e,this.dispatchEvent(gi),gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bu),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wl),gi.child=e,this.dispatchEvent(gi),gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,Ou),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,Fu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),p=a(e.skeletons),f=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new P(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yt=new P,fn=new P,Yr=new P,pn=new P,vi=new P,yi=new P,Ml=new P,jr=new P,Kr=new P,Jr=new P,Zr=new Qe,Qr=new Qe,ea=new Qe;class $t{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Yt.subVectors(e,t),s.cross(Yt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Yt.subVectors(s,t),fn.subVectors(n,t),Yr.subVectors(e,t);const a=Yt.dot(Yt),o=Yt.dot(fn),l=Yt.dot(Yr),c=fn.dot(fn),d=fn.dot(Yr),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const p=1/h,f=(c*l-o*d)*p,v=(a*d-o*l)*p;return r.set(1-f-v,v,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,pn.x),l.addScaledVector(a,pn.y),l.addScaledVector(o,pn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Zr.setScalar(0),Qr.setScalar(0),ea.setScalar(0),Zr.fromBufferAttribute(e,t),Qr.fromBufferAttribute(e,n),ea.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Zr,r.x),a.addScaledVector(Qr,r.y),a.addScaledVector(ea,r.z),a}static isFrontFacing(e,t,n,s){return Yt.subVectors(n,t),fn.subVectors(e,t),Yt.cross(fn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),Yt.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $t.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return $t.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return $t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;vi.subVectors(s,n),yi.subVectors(r,n),jr.subVectors(e,n);const l=vi.dot(jr),c=yi.dot(jr);if(l<=0&&c<=0)return t.copy(n);Kr.subVectors(e,s);const d=vi.dot(Kr),h=yi.dot(Kr);if(d>=0&&h<=d)return t.copy(s);const p=l*h-d*c;if(p<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(vi,a);Jr.subVectors(e,r);const f=vi.dot(Jr),v=yi.dot(Jr);if(v>=0&&f<=v)return t.copy(r);const g=f*c-l*v;if(g<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(yi,o);const m=d*v-f*h;if(m<=0&&h-d>=0&&f-v>=0)return Ml.subVectors(r,s),o=(h-d)/(h-d+(f-v)),t.copy(s).addScaledVector(Ml,o);const u=1/(m+g+p);return a=g*u,o=p*u,t.copy(n).addScaledVector(vi,a).addScaledVector(yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},$s={h:0,s:0,l:0};function ta(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=wu(e,1),t=yt(t,0,1),n=yt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ta(a,r,e+1/3),this.g=ta(a,r,e),this.b=ta(a,r,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=Mh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=En(e.r),this.g=En(e.g),this.b=En(e.b),this}copyLinearToSRGB(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return qe.fromWorkingColorSpace(bt.copy(this),e),Math.round(yt(bt.r*255,0,255))*65536+Math.round(yt(bt.g*255,0,255))*256+Math.round(yt(bt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(bt.copy(this),t);const n=bt.r,s=bt.g,r=bt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=Mt){qe.fromWorkingColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,s=bt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL($s);const n=Fr(In.h,$s.h,t),s=Fr(In.s,$s.s,t),r=Fr(In.l,$s.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new ze;ze.NAMES=Mh;let zu=0;class Yi extends Xi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=Bn(),this.name="",this.blending=Di,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Pa,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==La&&(n.blendSrc=this.blendSrc),this.blendDst!==Pa&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ol&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Sh extends Yi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new P,Vs=new fe;class Zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=go,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Vs.fromBufferAttribute(this,t),Vs.applyMatrix3(e),this.setXY(t,Vs.x,Vs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ze(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array),r=Ze(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==go&&(e.usage=this.usage),e}}class Eh extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Th extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ot extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Hu=0;const zt=new ot,na=new vt,_i=new P,It=new ks,is=new ks,gt=new P;class an extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_h(e)?Th:Eh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ne().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,n){return zt.makeTranslation(e,t,n),this.applyMatrix4(zt),this}scale(e,t,n){return zt.makeScale(e,t,n),this.applyMatrix4(zt),this}lookAt(e){return na.lookAt(e),na.updateMatrix(),this.applyMatrix4(na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ot(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];It.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,It.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,It.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(It.min),this.boundingBox.expandByPoint(It.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Do);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(It.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];is.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(It.min,is.min),It.expandByPoint(gt),gt.addVectors(It.max,is.max),It.expandByPoint(gt)):(It.expandByPoint(is.min),It.expandByPoint(is.max))}It.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)gt.fromBufferAttribute(o,c),l&&(_i.fromBufferAttribute(e,c),gt.add(_i)),s=Math.max(s,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new P,l[C]=new P;const c=new P,d=new P,h=new P,p=new fe,f=new fe,v=new fe,g=new P,m=new P;function u(C,M,y){c.fromBufferAttribute(n,C),d.fromBufferAttribute(n,M),h.fromBufferAttribute(n,y),p.fromBufferAttribute(r,C),f.fromBufferAttribute(r,M),v.fromBufferAttribute(r,y),d.sub(c),h.sub(c),f.sub(p),v.sub(p);const T=1/(f.x*v.y-v.x*f.y);isFinite(T)&&(g.copy(d).multiplyScalar(v.y).addScaledVector(h,-f.y).multiplyScalar(T),m.copy(h).multiplyScalar(f.x).addScaledVector(d,-v.x).multiplyScalar(T),o[C].add(g),o[M].add(g),o[y].add(g),l[C].add(m),l[M].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,M=x.length;C<M;++C){const y=x[C],T=y.start,D=y.count;for(let L=T,B=T+D;L<B;L+=3)u(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const _=new P,w=new P,k=new P,E=new P;function A(C){k.fromBufferAttribute(s,C),E.copy(k);const M=o[C];_.copy(M),_.sub(k.multiplyScalar(k.dot(M))).normalize(),w.crossVectors(E,M);const T=w.dot(l[C])<0?-1:1;a.setXYZW(C,_.x,_.y,_.z,T)}for(let C=0,M=x.length;C<M;++C){const y=x[C],T=y.start,D=y.count;for(let L=T,B=T+D;L<B;L+=3)A(e.getX(L+0)),A(e.getX(L+1)),A(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,d=new P,h=new P;if(e)for(let p=0,f=e.count;p<f;p+=3){const v=e.getX(p+0),g=e.getX(p+1),m=e.getX(p+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=t.count;p<f;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,p=new c.constructor(l.length*d);let f=0,v=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*d;for(let u=0;u<d;u++)p[v++]=c[f++]}return new Zt(p,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new an,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const p=c[d],f=e(p,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,p=c.length;h<p;h++){const f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let p=0,f=h.length;p<f;p++)d.push(h[p].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sl=new ot,Wn=new Iu,Ws=new Do,El=new P,qs=new P,Xs=new P,Ys=new P,ia=new P,js=new P,Tl=new P,Ks=new P;class ft extends vt{constructor(e=new an,t=new Sh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){js.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(ia.fromBufferAttribute(h,e),a?js.addScaledVector(ia,d):js.addScaledVector(ia.sub(t),d))}t.add(js)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(r),Wn.copy(e.ray).recast(e.near),!(Ws.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(Ws,El)===null||Wn.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(Sl.copy(r).invert(),Wn.copy(e.ray).applyMatrix4(Sl),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,g=p.length;v<g;v++){const m=p[v],u=a[m.materialIndex],x=Math.max(m.start,f.start),_=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let w=x,k=_;w<k;w+=3){const E=o.getX(w),A=o.getX(w+1),C=o.getX(w+2);s=Js(this,u,e,n,c,d,h,E,A,C),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=v,u=g;m<u;m+=3){const x=o.getX(m),_=o.getX(m+1),w=o.getX(m+2);s=Js(this,a,e,n,c,d,h,x,_,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,g=p.length;v<g;v++){const m=p[v],u=a[m.materialIndex],x=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let w=x,k=_;w<k;w+=3){const E=w,A=w+1,C=w+2;s=Js(this,u,e,n,c,d,h,E,A,C),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=v,u=g;m<u;m+=3){const x=m,_=m+1,w=m+2;s=Js(this,a,e,n,c,d,h,x,_,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Gu(i,e,t,n,s,r,a,o){let l;if(e.side===Lt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===zn,o),l===null)return null;Ks.copy(o),Ks.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ks);return c<t.near||c>t.far?null:{distance:c,point:Ks.clone(),object:i}}function Js(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,qs),i.getVertexPosition(l,Xs),i.getVertexPosition(c,Ys);const d=Gu(i,e,t,n,qs,Xs,Ys,Tl);if(d){const h=new P;$t.getBarycoord(Tl,qs,Xs,Ys,h),s&&(d.uv=$t.getInterpolatedAttribute(s,o,l,c,h,new fe)),r&&(d.uv1=$t.getInterpolatedAttribute(r,o,l,c,h,new fe)),a&&(d.normal=$t.getInterpolatedAttribute(a,o,l,c,h,new P),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new P,materialIndex:0};$t.getNormal(qs,Xs,Ys,p.normal),d.face=p,d.barycoord=h}return d}class Nt extends an{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let p=0,f=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(h,2));function v(g,m,u,x,_,w,k,E,A,C,M){const y=w/A,T=k/C,D=w/2,L=k/2,B=E/2,q=A+1,z=C+1;let Z=0,$=0;const ee=new P;for(let ae=0;ae<z;ae++){const Me=ae*T-L;for(let ye=0;ye<q;ye++){const Fe=ye*y-D;ee[g]=Fe*x,ee[m]=Me*_,ee[u]=B,c.push(ee.x,ee.y,ee.z),ee[g]=0,ee[m]=0,ee[u]=E>0?1:-1,d.push(ee.x,ee.y,ee.z),h.push(ye/A),h.push(1-ae/C),Z+=1}}for(let ae=0;ae<C;ae++)for(let Me=0;Me<A;Me++){const ye=p+Me+q*ae,Fe=p+Me+q*(ae+1),X=p+(Me+1)+q*(ae+1),te=p+(Me+1)+q*ae;l.push(ye,Fe,te),l.push(Fe,X,te),$+=6}o.addGroup(f,$,M),f+=$,p+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $i(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function At(i){const e={};for(let t=0;t<i.length;t++){const n=$i(i[t]);for(const s in n)e[s]=n[s]}return e}function $u(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ah(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Vu={clone:$i,merge:At};var Wu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hn extends Yi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wu,this.fragmentShader=qu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=$u(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Rh extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new P,Al=new fe,Rl=new fe;class Ht extends Rh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z)}getViewSize(e,t){return this.getViewBounds(e,Al,Rl),t.subVectors(Rl,Al)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Or*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const xi=-90,bi=1;class Xu extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ht(xi,bi,e,t);s.layers=this.layers,this.add(s);const r=new Ht(xi,bi,e,t);r.layers=this.layers,this.add(r);const a=new Ht(xi,bi,e,t);a.layers=this.layers,this.add(a);const o=new Ht(xi,bi,e,t);o.layers=this.layers,this.add(o);const l=new Ht(xi,bi,e,t);l.layers=this.layers,this.add(l);const c=new Ht(xi,bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_r)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(h,p,f),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Ch extends Et{constructor(e,t,n,s,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Bi,super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yu extends ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ch(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:nn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Nt(5,5,5),r=new Hn({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Lt,blending:On});r.uniforms.tEquirect.value=t;const a=new ft(s,r),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=nn),new Xu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const sa=new P,ju=new P,Ku=new Ne;class jn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=sa.subVectors(n,t).cross(ju.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(sa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ku.getNormalMatrix(e),s=this.coplanarPoint(sa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qn=new Do,Zs=new P;class No{constructor(e=new jn,t=new jn,n=new jn,s=new jn,r=new jn,a=new jn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],h=s[6],p=s[7],f=s[8],v=s[9],g=s[10],m=s[11],u=s[12],x=s[13],_=s[14],w=s[15];if(n[0].setComponents(l-r,p-c,m-f,w-u).normalize(),n[1].setComponents(l+r,p+c,m+f,w+u).normalize(),n[2].setComponents(l+a,p+d,m+v,w+x).normalize(),n[3].setComponents(l-a,p-d,m-v,w-x).normalize(),n[4].setComponents(l-o,p-h,m-g,w-_).normalize(),t===wn)n[5].setComponents(l+o,p+h,m+g,w+_).normalize();else if(t===_r)n[5].setComponents(o,h,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(e){return qn.center.set(0,0,0),qn.radius=.7071067811865476,qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Zs.x=s.normal.x>0?e.max.x:e.min.x,Zs.y=s.normal.y>0?e.max.y:e.min.y,Zs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ju(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,h=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const d=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,d);else{h.sort((f,v)=>f.start-v.start);let p=0;for(let f=1;f<h.length;f++){const v=h[p],g=h[f];g.start<=v.start+v.count+1?v.count=Math.max(v.count,g.start+g.count-v.start):(++p,h[p]=g)}h.length=p+1;for(let f=0,v=h.length;f<v;f++){const g=h[f];i.bufferSubData(c,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Lr extends an{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,h=e/o,p=t/l,f=[],v=[],g=[],m=[];for(let u=0;u<d;u++){const x=u*p-a;for(let _=0;_<c;_++){const w=_*h-r;v.push(w,-x,0),g.push(0,0,1),m.push(_/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let x=0;x<o;x++){const _=x+c*u,w=x+c*(u+1),k=x+1+c*(u+1),E=x+1+c*u;f.push(_,w,E),f.push(w,k,E)}this.setIndex(f),this.setAttribute("position",new Ot(v,3)),this.setAttribute("normal",new Ot(g,3)),this.setAttribute("uv",new Ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Zu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qu=`#ifdef USE_ALPHAHASH
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
#endif`,ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rf=`#ifdef USE_AOMAP
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
#endif`,af=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,of=`#ifdef USE_BATCHING
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
#endif`,lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,df=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uf=`#ifdef USE_IRIDESCENCE
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
#endif`,ff=`#ifdef USE_BUMPMAP
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
#endif`,pf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_f=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,wf=`#define PI 3.141592653589793
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
} // validated`,Mf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sf=`vec3 transformedNormal = objectNormal;
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
#endif`,Ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pf=`#ifdef USE_ENVMAP
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
#endif`,kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,If=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nf=`#ifdef USE_ENVMAP
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
#endif`,Uf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Of=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ff=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zf=`#ifdef USE_GRADIENTMAP
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
}`,Hf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vf=`uniform bool receiveShadow;
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
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,qf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kf=`PhysicalMaterial material;
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
#endif`,Jf=`struct PhysicalMaterial {
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
}`,Zf=`
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
#endif`,Qf=`#if defined( RE_IndirectDiffuse )
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
#endif`,ep=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,np=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ip=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ap=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lp=`#if defined( USE_POINTS_UV )
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
#endif`,cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,up=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pp=`#ifdef USE_MORPHTARGETS
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
#endif`,mp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bp=`#ifdef USE_NORMALMAP
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
#endif`,wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ap=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Np=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Up=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Op=`float getShadowMask() {
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
}`,Fp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bp=`#ifdef USE_SKINNING
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
#endif`,zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hp=`#ifdef USE_SKINNING
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
#endif`,Gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$p=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qp=`#ifdef USE_TRANSMISSION
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
#endif`,Xp=`#ifdef USE_TRANSMISSION
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
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qp=`uniform sampler2D t2D;
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,im=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`#include <common>
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
}`,rm=`#if DEPTH_PACKING == 3200
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
}`,am=`#define DISTANCE
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
}`,om=`#define DISTANCE
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
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hm=`uniform float scale;
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
}`,dm=`uniform vec3 diffuse;
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
}`,um=`#include <common>
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
}`,fm=`uniform vec3 diffuse;
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
}`,pm=`#define LAMBERT
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
}`,mm=`#define LAMBERT
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
}`,gm=`#define MATCAP
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
}`,vm=`#define MATCAP
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
}`,ym=`#define NORMAL
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
}`,_m=`#define NORMAL
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
}`,xm=`#define PHONG
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
}`,bm=`#define PHONG
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
}`,wm=`#define STANDARD
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
}`,Mm=`#define STANDARD
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
}`,Sm=`#define TOON
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
}`,Em=`#define TOON
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
}`,Tm=`uniform float size;
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
}`,Am=`uniform vec3 diffuse;
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
}`,Rm=`#include <common>
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
}`,Cm=`uniform vec3 color;
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
}`,Lm=`uniform float rotation;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:Zu,alphahash_pars_fragment:Qu,alphamap_fragment:ef,alphamap_pars_fragment:tf,alphatest_fragment:nf,alphatest_pars_fragment:sf,aomap_fragment:rf,aomap_pars_fragment:af,batching_pars_vertex:of,batching_vertex:lf,begin_vertex:cf,beginnormal_vertex:hf,bsdfs:df,iridescence_fragment:uf,bumpmap_pars_fragment:ff,clipping_planes_fragment:pf,clipping_planes_pars_fragment:mf,clipping_planes_pars_vertex:gf,clipping_planes_vertex:vf,color_fragment:yf,color_pars_fragment:_f,color_pars_vertex:xf,color_vertex:bf,common:wf,cube_uv_reflection_fragment:Mf,defaultnormal_vertex:Sf,displacementmap_pars_vertex:Ef,displacementmap_vertex:Tf,emissivemap_fragment:Af,emissivemap_pars_fragment:Rf,colorspace_fragment:Cf,colorspace_pars_fragment:Lf,envmap_fragment:Pf,envmap_common_pars_fragment:kf,envmap_pars_fragment:If,envmap_pars_vertex:Df,envmap_physical_pars_fragment:Wf,envmap_vertex:Nf,fog_vertex:Uf,fog_pars_vertex:Of,fog_fragment:Ff,fog_pars_fragment:Bf,gradientmap_pars_fragment:zf,lightmap_pars_fragment:Hf,lights_lambert_fragment:Gf,lights_lambert_pars_fragment:$f,lights_pars_begin:Vf,lights_toon_fragment:qf,lights_toon_pars_fragment:Xf,lights_phong_fragment:Yf,lights_phong_pars_fragment:jf,lights_physical_fragment:Kf,lights_physical_pars_fragment:Jf,lights_fragment_begin:Zf,lights_fragment_maps:Qf,lights_fragment_end:ep,logdepthbuf_fragment:tp,logdepthbuf_pars_fragment:np,logdepthbuf_pars_vertex:ip,logdepthbuf_vertex:sp,map_fragment:rp,map_pars_fragment:ap,map_particle_fragment:op,map_particle_pars_fragment:lp,metalnessmap_fragment:cp,metalnessmap_pars_fragment:hp,morphinstance_vertex:dp,morphcolor_vertex:up,morphnormal_vertex:fp,morphtarget_pars_vertex:pp,morphtarget_vertex:mp,normal_fragment_begin:gp,normal_fragment_maps:vp,normal_pars_fragment:yp,normal_pars_vertex:_p,normal_vertex:xp,normalmap_pars_fragment:bp,clearcoat_normal_fragment_begin:wp,clearcoat_normal_fragment_maps:Mp,clearcoat_pars_fragment:Sp,iridescence_pars_fragment:Ep,opaque_fragment:Tp,packing:Ap,premultiplied_alpha_fragment:Rp,project_vertex:Cp,dithering_fragment:Lp,dithering_pars_fragment:Pp,roughnessmap_fragment:kp,roughnessmap_pars_fragment:Ip,shadowmap_pars_fragment:Dp,shadowmap_pars_vertex:Np,shadowmap_vertex:Up,shadowmask_pars_fragment:Op,skinbase_vertex:Fp,skinning_pars_vertex:Bp,skinning_vertex:zp,skinnormal_vertex:Hp,specularmap_fragment:Gp,specularmap_pars_fragment:$p,tonemapping_fragment:Vp,tonemapping_pars_fragment:Wp,transmission_fragment:qp,transmission_pars_fragment:Xp,uv_pars_fragment:Yp,uv_pars_vertex:jp,uv_vertex:Kp,worldpos_vertex:Jp,background_vert:Zp,background_frag:Qp,backgroundCube_vert:em,backgroundCube_frag:tm,cube_vert:nm,cube_frag:im,depth_vert:sm,depth_frag:rm,distanceRGBA_vert:am,distanceRGBA_frag:om,equirect_vert:lm,equirect_frag:cm,linedashed_vert:hm,linedashed_frag:dm,meshbasic_vert:um,meshbasic_frag:fm,meshlambert_vert:pm,meshlambert_frag:mm,meshmatcap_vert:gm,meshmatcap_frag:vm,meshnormal_vert:ym,meshnormal_frag:_m,meshphong_vert:xm,meshphong_frag:bm,meshphysical_vert:wm,meshphysical_frag:Mm,meshtoon_vert:Sm,meshtoon_frag:Em,points_vert:Tm,points_frag:Am,shadow_vert:Rm,shadow_frag:Cm,sprite_vert:Lm,sprite_frag:Pm},re={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},en={basic:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ze(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:At([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:At([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new ze(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:At([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:At([re.points,re.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:At([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:At([re.common,re.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:At([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:At([re.sprite,re.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:At([re.common,re.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:At([re.lights,re.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};en.physical={uniforms:At([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Qs={r:0,b:0,g:0},Xn=new rn,km=new ot;function Im(i,e,t,n,s,r,a){const o=new ze(0);let l=r===!0?0:1,c,d,h=null,p=0,f=null;function v(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?t:e).get(_)),_}function g(x){let _=!1;const w=v(x);w===null?u(o,l):w&&w.isColor&&(u(w,1),_=!0);const k=i.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,a):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,_){const w=v(_);w&&(w.isCubeTexture||w.mapping===Rr)?(d===void 0&&(d=new ft(new Nt(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:$i(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(k,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Xn.copy(_.backgroundRotation),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),d.material.uniforms.envMap.value=w,d.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(km.makeRotationFromEuler(Xn)),d.material.toneMapped=qe.getTransfer(w.colorSpace)!==Je,(h!==w||p!==w.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,h=w,p=w.version,f=i.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new ft(new Lr(2,2),new Hn({name:"BackgroundMaterial",uniforms:$i(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=qe.getTransfer(w.colorSpace)!==Je,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||p!==w.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=w,p=w.version,f=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function u(x,_){x.getRGB(Qs,Ah(i)),n.buffers.color.setClear(Qs.r,Qs.g,Qs.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),l=_,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,u(o,l)},render:g,addToRenderList:m}}function Dm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(y,T,D,L,B){let q=!1;const z=h(L,D,T);r!==z&&(r=z,c(r.object)),q=f(y,L,D,B),q&&v(y,L,D,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,w(y,T,D,L),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function d(y){return i.deleteVertexArray(y)}function h(y,T,D){const L=D.wireframe===!0;let B=n[y.id];B===void 0&&(B={},n[y.id]=B);let q=B[T.id];q===void 0&&(q={},B[T.id]=q);let z=q[L];return z===void 0&&(z=p(l()),q[L]=z),z}function p(y){const T=[],D=[],L=[];for(let B=0;B<t;B++)T[B]=0,D[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:D,attributeDivisors:L,object:y,attributes:{},index:null}}function f(y,T,D,L){const B=r.attributes,q=T.attributes;let z=0;const Z=D.getAttributes();for(const $ in Z)if(Z[$].location>=0){const ae=B[$];let Me=q[$];if(Me===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(Me=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(Me=y.instanceColor)),ae===void 0||ae.attribute!==Me||Me&&ae.data!==Me.data)return!0;z++}return r.attributesNum!==z||r.index!==L}function v(y,T,D,L){const B={},q=T.attributes;let z=0;const Z=D.getAttributes();for(const $ in Z)if(Z[$].location>=0){let ae=q[$];ae===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor));const Me={};Me.attribute=ae,ae&&ae.data&&(Me.data=ae.data),B[$]=Me,z++}r.attributes=B,r.attributesNum=z,r.index=L}function g(){const y=r.newAttributes;for(let T=0,D=y.length;T<D;T++)y[T]=0}function m(y){u(y,0)}function u(y,T){const D=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;D[y]=1,L[y]===0&&(i.enableVertexAttribArray(y),L[y]=1),B[y]!==T&&(i.vertexAttribDivisor(y,T),B[y]=T)}function x(){const y=r.newAttributes,T=r.enabledAttributes;for(let D=0,L=T.length;D<L;D++)T[D]!==y[D]&&(i.disableVertexAttribArray(D),T[D]=0)}function _(y,T,D,L,B,q,z){z===!0?i.vertexAttribIPointer(y,T,D,B,q):i.vertexAttribPointer(y,T,D,L,B,q)}function w(y,T,D,L){g();const B=L.attributes,q=D.getAttributes(),z=T.defaultAttributeValues;for(const Z in q){const $=q[Z];if($.location>=0){let ee=B[Z];if(ee===void 0&&(Z==="instanceMatrix"&&y.instanceMatrix&&(ee=y.instanceMatrix),Z==="instanceColor"&&y.instanceColor&&(ee=y.instanceColor)),ee!==void 0){const ae=ee.normalized,Me=ee.itemSize,ye=e.get(ee);if(ye===void 0)continue;const Fe=ye.buffer,X=ye.type,te=ye.bytesPerElement,_e=X===i.INT||X===i.UNSIGNED_INT||ee.gpuType===Ro;if(ee.isInterleavedBufferAttribute){const le=ee.data,Ce=le.stride,ke=ee.offset;if(le.isInstancedInterleavedBuffer){for(let Be=0;Be<$.locationSize;Be++)u($.location+Be,le.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Be=0;Be<$.locationSize;Be++)m($.location+Be);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let Be=0;Be<$.locationSize;Be++)_($.location+Be,Me/$.locationSize,X,ae,Ce*te,(ke+Me/$.locationSize*Be)*te,_e)}else{if(ee.isInstancedBufferAttribute){for(let le=0;le<$.locationSize;le++)u($.location+le,ee.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let le=0;le<$.locationSize;le++)m($.location+le);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let le=0;le<$.locationSize;le++)_($.location+le,Me/$.locationSize,X,ae,Me*te,Me/$.locationSize*le*te,_e)}}else if(z!==void 0){const ae=z[Z];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv($.location,ae);break;case 3:i.vertexAttrib3fv($.location,ae);break;case 4:i.vertexAttrib4fv($.location,ae);break;default:i.vertexAttrib1fv($.location,ae)}}}}x()}function k(){C();for(const y in n){const T=n[y];for(const D in T){const L=T[D];for(const B in L)d(L[B].object),delete L[B];delete T[D]}delete n[y]}}function E(y){if(n[y.id]===void 0)return;const T=n[y.id];for(const D in T){const L=T[D];for(const B in L)d(L[B].object),delete L[B];delete T[D]}delete n[y.id]}function A(y){for(const T in n){const D=n[T];if(D[y.id]===void 0)continue;const L=D[y.id];for(const B in L)d(L[B].object),delete L[B];delete D[y.id]}}function C(){M(),a=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:M,dispose:k,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function Nm(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,h){h!==0&&(i.drawArraysInstanced(n,c,d,h),t.update(d,n,h))}function o(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,h);let f=0;for(let v=0;v<h;v++)f+=d[v];t.update(f,n,1)}function l(c,d,h,p){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)a(c[v],d[v],p[v]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,p,0,h);let v=0;for(let g=0;g<h;g++)v+=d[g]*p[g];t.update(v,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Um(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Jt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const C=A===Ls&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Tn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==bn&&!C)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),w=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),k=v>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:v,maxTextureSize:g,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:w,vertexTextures:k,maxSamples:E}}function Om(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new jn,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const f=h.length!==0||p||n!==0||s;return s=p,n=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,p){t=d(h,p,0)},this.setState=function(h,p,f){const v=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,u=i.get(h);if(!s||v===null||v.length===0||r&&!m)r?d(null):c();else{const x=r?0:n,_=x*4;let w=u.clippingState||null;l.value=w,w=d(v,p,_,f);for(let k=0;k!==_;++k)w[k]=t[k];u.clippingState=w,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,p,f,v){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,v!==!0||m===null){const u=f+g*4,x=p.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<u)&&(m=new Float32Array(u));for(let _=0,w=f;_!==g;++_,w+=4)a.copy(h[_]).applyMatrix4(x,o),a.normal.toArray(m,w),m[w+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Fm(i){let e=new WeakMap;function t(a,o){return o===Ba?a.mapping=Bi:o===za&&(a.mapping=zi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ba||o===za)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Yu(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Uo extends Rh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Pi=4,Cl=[.125,.215,.35,.446,.526,.582],Zn=20,ra=new Uo,Ll=new ze;let aa=null,oa=0,la=0,ca=!1;const Kn=(1+Math.sqrt(5))/2,wi=1/Kn,Pl=[new P(-Kn,wi,0),new P(Kn,wi,0),new P(-wi,0,Kn),new P(wi,0,Kn),new P(0,Kn,-wi),new P(0,Kn,wi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class kl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(aa,oa,la),this._renderer.xr.enabled=ca,e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),aa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:Ls,format:Jt,colorSpace:qi,depthBuffer:!1},s=Il(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Il(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bm(r)),this._blurMaterial=zm(r,e,t)}return s}_compileMaterial(e){const t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,ra)}_sceneToCubeUV(e,t,n,s){const o=new Ht(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Ll),d.toneMapping=Fn,d.autoClear=!1;const f=new Sh({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),v=new ft(new Nt,f);let g=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,g=!0):(f.color.copy(Ll),g=!0);for(let u=0;u<6;u++){const x=u%3;x===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):x===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const _=this._cubeSize;er(s,x*_,u>2?_:0,_,_),d.setRenderTarget(s),g&&d.render(v,o),d.render(e,o)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=p,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Bi||e.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ft(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;er(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ra)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Pl[(s-r-1)%Pl.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new ft(this._lodPlanes[s],c),p=c.uniforms,f=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Zn-1),g=r/v,m=isFinite(r)?1+Math.floor(d*g):Zn;m>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zn}`);const u=[];let x=0;for(let A=0;A<Zn;++A){const C=A/g,M=Math.exp(-C*C/2);u.push(M),A===0?x+=M:A<m&&(x+=2*M)}for(let A=0;A<u.length;A++)u[A]=u[A]/x;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:_}=this;p.dTheta.value=v,p.mipInt.value=_-n;const w=this._sizeLods[s],k=3*w*(s>_-Pi?s-_+Pi:0),E=4*(this._cubeSize-w);er(t,k,E,3*w,2*w),l.setRenderTarget(t),l.render(h,ra)}}function Bm(i){const e=[],t=[],n=[];let s=i;const r=i-Pi+1+Cl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Pi?l=Cl[a-i+Pi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,p=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,v=6,g=3,m=2,u=1,x=new Float32Array(g*v*f),_=new Float32Array(m*v*f),w=new Float32Array(u*v*f);for(let E=0;E<f;E++){const A=E%3*2/3-1,C=E>2?0:-1,M=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];x.set(M,g*v*E),_.set(p,m*v*E);const y=[E,E,E,E,E,E];w.set(y,u*v*E)}const k=new an;k.setAttribute("position",new Zt(x,g)),k.setAttribute("uv",new Zt(_,m)),k.setAttribute("faceIndex",new Zt(w,u)),e.push(k),s>Pi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Il(i,e,t){const n=new ri(i,e,t);return n.texture.mapping=Rr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function zm(i,e,t){const n=new Float32Array(Zn),s=new P(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Dl(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Nl(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Oo(){return`

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
	`}function Hm(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ba||l===za,d=l===Bi||l===zi;if(c||d){let h=e.get(o);const p=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new kl(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new kl(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Gm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ms("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function $m(i,e,t,n){const s={},r=new WeakMap;function a(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const v in p.attributes)e.remove(p.attributes[v]);for(const v in p.morphAttributes){const g=p.morphAttributes[v];for(let m=0,u=g.length;m<u;m++)e.remove(g[m])}p.removeEventListener("dispose",a),delete s[p.id];const f=r.get(p);f&&(e.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(h,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function l(h){const p=h.attributes;for(const v in p)e.update(p[v],i.ARRAY_BUFFER);const f=h.morphAttributes;for(const v in f){const g=f[v];for(let m=0,u=g.length;m<u;m++)e.update(g[m],i.ARRAY_BUFFER)}}function c(h){const p=[],f=h.index,v=h.attributes.position;let g=0;if(f!==null){const x=f.array;g=f.version;for(let _=0,w=x.length;_<w;_+=3){const k=x[_+0],E=x[_+1],A=x[_+2];p.push(k,E,E,A,A,k)}}else if(v!==void 0){const x=v.array;g=v.version;for(let _=0,w=x.length/3-1;_<w;_+=3){const k=_+0,E=_+1,A=_+2;p.push(k,E,E,A,A,k)}}else return;const m=new(_h(p)?Th:Eh)(p,1);m.version=g;const u=r.get(h);u&&e.remove(u),r.set(h,m)}function d(h){const p=r.get(h);if(p){const f=h.index;f!==null&&p.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function Vm(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,f){i.drawElements(n,f,r,p*a),t.update(f,n,1)}function c(p,f,v){v!==0&&(i.drawElementsInstanced(n,f,r,p*a,v),t.update(f,n,v))}function d(p,f,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,v);let m=0;for(let u=0;u<v;u++)m+=f[u];t.update(m,n,1)}function h(p,f,v,g){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<p.length;u++)c(p[u]/a,f[u],g[u]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,p,0,g,0,v);let u=0;for(let x=0;x<v;x++)u+=f[x]*g[x];t.update(u,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function Wm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function qm(i,e,t){const n=new WeakMap,s=new Qe;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let p=n.get(o);if(p===void 0||p.count!==h){let M=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",M)};p!==void 0&&p.texture.dispose();const f=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let _=0;f===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let w=o.attributes.position.count*_,k=1;w>e.maxTextureSize&&(k=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const E=new Float32Array(w*k*4*h),A=new bh(E,w,k,h);A.type=bn,A.needsUpdate=!0;const C=_*4;for(let y=0;y<h;y++){const T=m[y],D=u[y],L=x[y],B=w*k*4*y;for(let q=0;q<T.count;q++){const z=q*C;f===!0&&(s.fromBufferAttribute(T,q),E[B+z+0]=s.x,E[B+z+1]=s.y,E[B+z+2]=s.z,E[B+z+3]=0),v===!0&&(s.fromBufferAttribute(D,q),E[B+z+4]=s.x,E[B+z+5]=s.y,E[B+z+6]=s.z,E[B+z+7]=0),g===!0&&(s.fromBufferAttribute(L,q),E[B+z+8]=s.x,E[B+z+9]=s.y,E[B+z+10]=s.z,E[B+z+11]=L.itemSize===4?s.w:1)}}p={count:h,texture:A,size:new fe(w,k)},n.set(o,p),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let g=0;g<c.length;g++)f+=c[g];const v=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Xm(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Ph extends Et{constructor(e,t,n,s,r,a,o,l,c,d=Ni){if(d!==Ni&&d!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Ni&&(n=si),n===void 0&&d===Gi&&(n=Hi),super(null,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ut,this.minFilter=l!==void 0?l:Ut,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const kh=new Et,Ul=new Ph(1,1),Ih=new bh,Dh=new Pu,Nh=new Ch,Ol=[],Fl=[],Bl=new Float32Array(16),zl=new Float32Array(9),Hl=new Float32Array(4);function ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ol[s];if(r===void 0&&(r=new Float32Array(s),Ol[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Pr(i,e){let t=Fl[e];t===void 0&&(t=new Int32Array(e),Fl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ym(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2fv(this.addr,e),mt(t,e)}}function Km(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;i.uniform3fv(this.addr,e),mt(t,e)}}function Jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4fv(this.addr,e),mt(t,e)}}function Zm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Hl.set(n),i.uniformMatrix2fv(this.addr,!1,Hl),mt(t,n)}}function Qm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;zl.set(n),i.uniformMatrix3fv(this.addr,!1,zl),mt(t,n)}}function eg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Bl.set(n),i.uniformMatrix4fv(this.addr,!1,Bl),mt(t,n)}}function tg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2iv(this.addr,e),mt(t,e)}}function ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3iv(this.addr,e),mt(t,e)}}function sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4iv(this.addr,e),mt(t,e)}}function rg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2uiv(this.addr,e),mt(t,e)}}function og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3uiv(this.addr,e),mt(t,e)}}function lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4uiv(this.addr,e),mt(t,e)}}function cg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ul.compareFunction=yh,r=Ul):r=kh,t.setTexture2D(e||r,s)}function hg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Dh,s)}function dg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Nh,s)}function ug(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ih,s)}function fg(i){switch(i){case 5126:return Ym;case 35664:return jm;case 35665:return Km;case 35666:return Jm;case 35674:return Zm;case 35675:return Qm;case 35676:return eg;case 5124:case 35670:return tg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return sg;case 5125:return rg;case 36294:return ag;case 36295:return og;case 36296:return lg;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return hg;case 35680:case 36300:case 36308:case 36293:return dg;case 36289:case 36303:case 36311:case 36292:return ug}}function pg(i,e){i.uniform1fv(this.addr,e)}function mg(i,e){const t=ji(e,this.size,2);i.uniform2fv(this.addr,t)}function gg(i,e){const t=ji(e,this.size,3);i.uniform3fv(this.addr,t)}function vg(i,e){const t=ji(e,this.size,4);i.uniform4fv(this.addr,t)}function yg(i,e){const t=ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _g(i,e){const t=ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function xg(i,e){const t=ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function bg(i,e){i.uniform1iv(this.addr,e)}function wg(i,e){i.uniform2iv(this.addr,e)}function Mg(i,e){i.uniform3iv(this.addr,e)}function Sg(i,e){i.uniform4iv(this.addr,e)}function Eg(i,e){i.uniform1uiv(this.addr,e)}function Tg(i,e){i.uniform2uiv(this.addr,e)}function Ag(i,e){i.uniform3uiv(this.addr,e)}function Rg(i,e){i.uniform4uiv(this.addr,e)}function Cg(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||kh,r[a])}function Lg(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Dh,r[a])}function Pg(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Nh,r[a])}function kg(i,e,t){const n=this.cache,s=e.length,r=Pr(t,s);pt(n,r)||(i.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ih,r[a])}function Ig(i){switch(i){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return vg;case 35674:return yg;case 35675:return _g;case 35676:return xg;case 5124:case 35670:return bg;case 35667:case 35671:return wg;case 35668:case 35672:return Mg;case 35669:case 35673:return Sg;case 5125:return Eg;case 36294:return Tg;case 36295:return Ag;case 36296:return Rg;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Lg;case 35680:case 36300:case 36308:case 36293:return Pg;case 36289:case 36303:case 36311:case 36292:return kg}}class Dg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fg(t.type)}}class Ng{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ig(t.type)}}class Ug{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ha=/(\w+)(\])?(\[|\.)?/g;function Gl(i,e){i.seq.push(e),i.map[e.id]=e}function Og(i,e,t){const n=i.name,s=n.length;for(ha.lastIndex=0;;){const r=ha.exec(n),a=ha.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Gl(t,c===void 0?new Dg(o,i,e):new Ng(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Ug(o),Gl(t,h)),t=h}}}class gr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Og(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function $l(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Fg=37297;let Bg=0;function zg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Vl=new Ne;function Hg(i){qe._getMatrix(Vl,qe.workingColorSpace,i);const e=`mat3( ${Vl.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case Cr:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+zg(i.getShaderSource(e),a)}else return s}function Gg(i,e){const t=Hg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function $g(i,e){let t;switch(e){case su:t="Linear";break;case ru:t="Reinhard";break;case au:t="Cineon";break;case ou:t="ACESFilmic";break;case cu:t="AgX";break;case hu:t="Neutral";break;case lu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const tr=new P;function Vg(){qe.getLuminanceCoefficients(tr);const i=tr.x.toFixed(4),e=tr.y.toFixed(4),t=tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gs).join(`
`)}function qg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function gs(i){return i!==""}function ql(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Yg=/^[ \t]*#include +<([\w\d./]+)>/gm;function yo(i){return i.replace(Yg,Kg)}const jg=new Map;function Kg(i,e){let t=Oe[e];if(t===void 0){const n=jg.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return yo(t)}const Jg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(i){return i.replace(Jg,Zg)}function Zg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Qg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ih?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===sh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===gn&&(e="SHADOWMAP_TYPE_VSM"),e}function ev(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bi:case zi:e="ENVMAP_TYPE_CUBE";break;case Rr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zi:e="ENVMAP_MODE_REFRACTION";break}return e}function nv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case rh:e="ENVMAP_BLENDING_MULTIPLY";break;case nu:e="ENVMAP_BLENDING_MIX";break;case iu:e="ENVMAP_BLENDING_ADD";break}return e}function iv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function sv(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Qg(t),c=ev(t),d=tv(t),h=nv(t),p=iv(t),f=Wg(t),v=qg(r),g=s.createProgram();let m,u,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(gs).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(gs).join(`
`),u.length>0&&(u+=`
`)):(m=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),u=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fn?"#define TONE_MAPPING":"",t.toneMapping!==Fn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Fn?$g("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Gg("linearToOutputTexel",t.outputColorSpace),Vg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gs).join(`
`)),a=yo(a),a=ql(a,t),a=Xl(a,t),o=yo(o),o=ql(o,t),o=Xl(o,t),a=Yl(a),o=Yl(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const _=x+m+a,w=x+u+o,k=$l(s,s.VERTEX_SHADER,_),E=$l(s,s.FRAGMENT_SHADER,w);s.attachShader(g,k),s.attachShader(g,E),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(T){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(g).trim(),L=s.getShaderInfoLog(k).trim(),B=s.getShaderInfoLog(E).trim();let q=!0,z=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,k,E);else{const Z=Wl(s,k,"vertex"),$=Wl(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+D+`
`+Z+`
`+$)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(L===""||B==="")&&(z=!1);z&&(T.diagnostics={runnable:q,programLog:D,vertexShader:{log:L,prefix:m},fragmentShader:{log:B,prefix:u}})}s.deleteShader(k),s.deleteShader(E),C=new gr(s,g),M=Xg(s,g)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(g,Fg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bg++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=k,this.fragmentShader=E,this}let rv=0;class av{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ov(e),t.set(e,n)),n}}class ov{constructor(e){this.id=rv++,this.code=e,this.usedTimes=0}}function lv(i,e,t,n,s,r,a){const o=new wh,l=new av,c=new Set,d=[],h=s.logarithmicDepthBuffer,p=s.vertexTextures;let f=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,T,D,L){const B=D.fog,q=L.geometry,z=M.isMeshStandardMaterial?D.environment:null,Z=(M.isMeshStandardMaterial?t:e).get(M.envMap||z),$=Z&&Z.mapping===Rr?Z.image.height:null,ee=v[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ae=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Me=ae!==void 0?ae.length:0;let ye=0;q.morphAttributes.position!==void 0&&(ye=1),q.morphAttributes.normal!==void 0&&(ye=2),q.morphAttributes.color!==void 0&&(ye=3);let Fe,X,te,_e;if(ee){const Ke=en[ee];Fe=Ke.vertexShader,X=Ke.fragmentShader}else Fe=M.vertexShader,X=M.fragmentShader,l.update(M),te=l.getVertexShaderID(M),_e=l.getFragmentShaderID(M);const le=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),ke=L.isInstancedMesh===!0,Be=L.isBatchedMesh===!0,lt=!!M.map,Ve=!!M.matcap,dt=!!Z,O=!!M.aoMap,Ft=!!M.lightMap,He=!!M.bumpMap,Ge=!!M.normalMap,Ae=!!M.displacementMap,nt=!!M.emissiveMap,Te=!!M.metalnessMap,R=!!M.roughnessMap,b=M.anisotropy>0,F=M.clearcoat>0,K=M.dispersion>0,Q=M.iridescence>0,j=M.sheen>0,Se=M.transmission>0,ce=b&&!!M.anisotropyMap,me=F&&!!M.clearcoatMap,We=F&&!!M.clearcoatNormalMap,ne=F&&!!M.clearcoatRoughnessMap,ge=Q&&!!M.iridescenceMap,Re=Q&&!!M.iridescenceThicknessMap,Le=j&&!!M.sheenColorMap,ve=j&&!!M.sheenRoughnessMap,$e=!!M.specularMap,Ue=!!M.specularColorMap,et=!!M.specularIntensityMap,I=Se&&!!M.transmissionMap,oe=Se&&!!M.thicknessMap,V=!!M.gradientMap,J=!!M.alphaMap,ue=M.alphaTest>0,he=!!M.alphaHash,Ie=!!M.extensions;let ht=Fn;M.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ht=i.toneMapping);const _t={shaderID:ee,shaderType:M.type,shaderName:M.name,vertexShader:Fe,fragmentShader:X,defines:M.defines,customVertexShaderID:te,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Be,batchingColor:Be&&L._colorsTexture!==null,instancing:ke,instancingColor:ke&&L.instanceColor!==null,instancingMorph:ke&&L.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:qi,alphaToCoverage:!!M.alphaToCoverage,map:lt,matcap:Ve,envMap:dt,envMapMode:dt&&Z.mapping,envMapCubeUVHeight:$,aoMap:O,lightMap:Ft,bumpMap:He,normalMap:Ge,displacementMap:p&&Ae,emissiveMap:nt,normalMapObjectSpace:Ge&&M.normalMapType===pu,normalMapTangentSpace:Ge&&M.normalMapType===vh,metalnessMap:Te,roughnessMap:R,anisotropy:b,anisotropyMap:ce,clearcoat:F,clearcoatMap:me,clearcoatNormalMap:We,clearcoatRoughnessMap:ne,dispersion:K,iridescence:Q,iridescenceMap:ge,iridescenceThicknessMap:Re,sheen:j,sheenColorMap:Le,sheenRoughnessMap:ve,specularMap:$e,specularColorMap:Ue,specularIntensityMap:et,transmission:Se,transmissionMap:I,thicknessMap:oe,gradientMap:V,opaque:M.transparent===!1&&M.blending===Di&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:ue,alphaHash:he,combine:M.combine,mapUv:lt&&g(M.map.channel),aoMapUv:O&&g(M.aoMap.channel),lightMapUv:Ft&&g(M.lightMap.channel),bumpMapUv:He&&g(M.bumpMap.channel),normalMapUv:Ge&&g(M.normalMap.channel),displacementMapUv:Ae&&g(M.displacementMap.channel),emissiveMapUv:nt&&g(M.emissiveMap.channel),metalnessMapUv:Te&&g(M.metalnessMap.channel),roughnessMapUv:R&&g(M.roughnessMap.channel),anisotropyMapUv:ce&&g(M.anisotropyMap.channel),clearcoatMapUv:me&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:We&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:ve&&g(M.sheenRoughnessMap.channel),specularMapUv:$e&&g(M.specularMap.channel),specularColorMapUv:Ue&&g(M.specularColorMap.channel),specularIntensityMapUv:et&&g(M.specularIntensityMap.channel),transmissionMapUv:I&&g(M.transmissionMap.channel),thicknessMapUv:oe&&g(M.thicknessMap.channel),alphaMapUv:J&&g(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ge||b),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!q.attributes.uv&&(lt||J),fog:!!B,useFog:M.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ce,skinning:L.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:ye,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:ht,decodeVideoTexture:lt&&M.map.isVideoTexture===!0&&qe.getTransfer(M.map.colorSpace)===Je,decodeVideoTextureEmissive:nt&&M.emissiveMap.isVideoTexture===!0&&qe.getTransfer(M.emissiveMap.colorSpace)===Je,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===_n,flipSided:M.side===Lt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ie&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&M.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return _t.vertexUv1s=c.has(1),_t.vertexUv2s=c.has(2),_t.vertexUv3s=c.has(3),c.clear(),_t}function u(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const T in M.defines)y.push(T),y.push(M.defines[T]);return M.isRawShaderMaterial===!1&&(x(y,M),_(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function x(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function _(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function w(M){const y=v[M.type];let T;if(y){const D=en[y];T=Vu.clone(D.uniforms)}else T=M.uniforms;return T}function k(M,y){let T;for(let D=0,L=d.length;D<L;D++){const B=d[D];if(B.cacheKey===y){T=B,++T.usedTimes;break}}return T===void 0&&(T=new sv(i,y,M,r),d.push(T)),T}function E(M){if(--M.usedTimes===0){const y=d.indexOf(M);d[y]=d[d.length-1],d.pop(),M.destroy()}}function A(M){l.remove(M)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:w,acquireProgram:k,releaseProgram:E,releaseShaderCache:A,programs:d,dispose:C}}function cv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function hv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Kl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Jl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,p,f,v,g,m){let u=i[e];return u===void 0?(u={id:h.id,object:h,geometry:p,material:f,groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},i[e]=u):(u.id=h.id,u.object=h,u.geometry=p,u.material=f,u.groupOrder=v,u.renderOrder=h.renderOrder,u.z=g,u.group=m),e++,u}function o(h,p,f,v,g,m){const u=a(h,p,f,v,g,m);f.transmission>0?n.push(u):f.transparent===!0?s.push(u):t.push(u)}function l(h,p,f,v,g,m){const u=a(h,p,f,v,g,m);f.transmission>0?n.unshift(u):f.transparent===!0?s.unshift(u):t.unshift(u)}function c(h,p){t.length>1&&t.sort(h||hv),n.length>1&&n.sort(p||Kl),s.length>1&&s.sort(p||Kl)}function d(){for(let h=e,p=i.length;h<p;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function dv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Jl,i.set(n,[a])):s>=r.length?(a=new Jl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function uv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new ze};break;case"SpotLight":t={position:new P,direction:new P,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function fv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let pv=0;function mv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function gv(i){const e=new uv,t=fv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new ot,a=new ot;function o(c){let d=0,h=0,p=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,v=0,g=0,m=0,u=0,x=0,_=0,w=0,k=0,E=0,A=0;c.sort(mv);for(let M=0,y=c.length;M<y;M++){const T=c[M],D=T.color,L=T.intensity,B=T.distance,q=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)d+=D.r*L,h+=D.g*L,p+=D.b*L;else if(T.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(T.sh.coefficients[z],L);A++}else if(T.isDirectionalLight){const z=e.get(T);if(z.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const Z=T.shadow,$=t.get(T);$.shadowIntensity=Z.intensity,$.shadowBias=Z.bias,$.shadowNormalBias=Z.normalBias,$.shadowRadius=Z.radius,$.shadowMapSize=Z.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=T.shadow.matrix,x++}n.directional[f]=z,f++}else if(T.isSpotLight){const z=e.get(T);z.position.setFromMatrixPosition(T.matrixWorld),z.color.copy(D).multiplyScalar(L),z.distance=B,z.coneCos=Math.cos(T.angle),z.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),z.decay=T.decay,n.spot[g]=z;const Z=T.shadow;if(T.map&&(n.spotLightMap[k]=T.map,k++,Z.updateMatrices(T),T.castShadow&&E++),n.spotLightMatrix[g]=Z.matrix,T.castShadow){const $=t.get(T);$.shadowIntensity=Z.intensity,$.shadowBias=Z.bias,$.shadowNormalBias=Z.normalBias,$.shadowRadius=Z.radius,$.shadowMapSize=Z.mapSize,n.spotShadow[g]=$,n.spotShadowMap[g]=q,w++}g++}else if(T.isRectAreaLight){const z=e.get(T);z.color.copy(D).multiplyScalar(L),z.halfWidth.set(T.width*.5,0,0),z.halfHeight.set(0,T.height*.5,0),n.rectArea[m]=z,m++}else if(T.isPointLight){const z=e.get(T);if(z.color.copy(T.color).multiplyScalar(T.intensity),z.distance=T.distance,z.decay=T.decay,T.castShadow){const Z=T.shadow,$=t.get(T);$.shadowIntensity=Z.intensity,$.shadowBias=Z.bias,$.shadowNormalBias=Z.normalBias,$.shadowRadius=Z.radius,$.shadowMapSize=Z.mapSize,$.shadowCameraNear=Z.camera.near,$.shadowCameraFar=Z.camera.far,n.pointShadow[v]=$,n.pointShadowMap[v]=q,n.pointShadowMatrix[v]=T.shadow.matrix,_++}n.point[v]=z,v++}else if(T.isHemisphereLight){const z=e.get(T);z.skyColor.copy(T.color).multiplyScalar(L),z.groundColor.copy(T.groundColor).multiplyScalar(L),n.hemi[u]=z,u++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=p;const C=n.hash;(C.directionalLength!==f||C.pointLength!==v||C.spotLength!==g||C.rectAreaLength!==m||C.hemiLength!==u||C.numDirectionalShadows!==x||C.numPointShadows!==_||C.numSpotShadows!==w||C.numSpotMaps!==k||C.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=v,n.hemi.length=u,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=w,n.spotShadowMap.length=w,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=w+k-E,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,C.directionalLength=f,C.pointLength=v,C.spotLength=g,C.rectAreaLength=m,C.hemiLength=u,C.numDirectionalShadows=x,C.numPointShadows=_,C.numSpotShadows=w,C.numSpotMaps=k,C.numLightProbes=A,n.version=pv++)}function l(c,d){let h=0,p=0,f=0,v=0,g=0;const m=d.matrixWorldInverse;for(let u=0,x=c.length;u<x;u++){const _=c[u];if(_.isDirectionalLight){const w=n.directional[h];w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),h++}else if(_.isSpotLight){const w=n.spot[f];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),f++}else if(_.isRectAreaLight){const w=n.rectArea[v];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),w.halfWidth.set(_.width*.5,0,0),w.halfHeight.set(0,_.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(_.isPointLight){const w=n.point[p];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(m),p++}else if(_.isHemisphereLight){const w=n.hemi[g];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function Zl(i){const e=new gv(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function vv(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Zl(i),e.set(s,[o])):r>=a.length?(o=new Zl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class yv extends Yi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=uu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _v extends Yi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const xv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bv=`uniform sampler2D shadow_pass;
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
}`;function wv(i,e,t){let n=new No;const s=new fe,r=new fe,a=new Qe,o=new yv({depthPacking:fu}),l=new _v,c={},d=t.maxTextureSize,h={[zn]:Lt,[Lt]:zn,[_n]:_n},p=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:xv,fragmentShader:bv}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const v=new an;v.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ft(v,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ih;let u=this.type;this.render=function(E,A,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),D=i.state;D.setBlending(On),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const L=u!==gn&&this.type===gn,B=u===gn&&this.type!==gn;for(let q=0,z=E.length;q<z;q++){const Z=E[q],$=Z.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ee=$.getFrameExtents();if(s.multiply(ee),r.copy($.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ee.x),s.x=r.x*ee.x,$.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ee.y),s.y=r.y*ee.y,$.mapSize.y=r.y)),$.map===null||L===!0||B===!0){const Me=this.type!==gn?{minFilter:Ut,magFilter:Ut}:{};$.map!==null&&$.map.dispose(),$.map=new ri(s.x,s.y,Me),$.map.texture.name=Z.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const ae=$.getViewportCount();for(let Me=0;Me<ae;Me++){const ye=$.getViewport(Me);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),D.viewport(a),$.updateMatrices(Z,Me),n=$.getFrustum(),w(A,C,$.camera,Z,this.type)}$.isPointLightShadow!==!0&&this.type===gn&&x($,C),$.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(M,y,T)};function x(E,A){const C=e.update(g);p.defines.VSM_SAMPLES!==E.blurSamples&&(p.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ri(s.x,s.y)),p.uniforms.shadow_pass.value=E.map.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,C,p,g,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,C,f,g,null)}function _(E,A,C,M){let y=null;const T=C.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(T!==void 0)y=T;else if(y=C.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const D=y.uuid,L=A.uuid;let B=c[D];B===void 0&&(B={},c[D]=B);let q=B[L];q===void 0&&(q=y.clone(),B[L]=q,A.addEventListener("dispose",k)),y=q}if(y.visible=A.visible,y.wireframe=A.wireframe,M===gn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:h[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=i.properties.get(y);D.light=C}return y}function w(E,A,C,M,y){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===gn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,E.matrixWorld);const L=e.update(E),B=E.material;if(Array.isArray(B)){const q=L.groups;for(let z=0,Z=q.length;z<Z;z++){const $=q[z],ee=B[$.materialIndex];if(ee&&ee.visible){const ae=_(E,ee,M,y);E.onBeforeShadow(i,E,A,C,L,ae,$),i.renderBufferDirect(C,null,L,ae,E,$),E.onAfterShadow(i,E,A,C,L,ae,$)}}}else if(B.visible){const q=_(E,B,M,y);E.onBeforeShadow(i,E,A,C,L,q,null),i.renderBufferDirect(C,null,L,q,E,null),E.onAfterShadow(i,E,A,C,L,q,null)}}const D=E.children;for(let L=0,B=D.length;L<B;L++)w(D[L],A,C,M,y)}function k(E){E.target.removeEventListener("dispose",k);for(const C in c){const M=c[C],y=E.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const Mv={[ka]:Ia,[Da]:Oa,[Na]:Fa,[Fi]:Ua,[Ia]:ka,[Oa]:Da,[Fa]:Na,[Ua]:Fi};function Sv(i,e){function t(){let I=!1;const oe=new Qe;let V=null;const J=new Qe(0,0,0,0);return{setMask:function(ue){V!==ue&&!I&&(i.colorMask(ue,ue,ue,ue),V=ue)},setLocked:function(ue){I=ue},setClear:function(ue,he,Ie,ht,_t){_t===!0&&(ue*=ht,he*=ht,Ie*=ht),oe.set(ue,he,Ie,ht),J.equals(oe)===!1&&(i.clearColor(ue,he,Ie,ht),J.copy(oe))},reset:function(){I=!1,V=null,J.set(-1,0,0,0)}}}function n(){let I=!1,oe=!1,V=null,J=null,ue=null;return{setReversed:function(he){if(oe!==he){const Ie=e.get("EXT_clip_control");oe?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT);const ht=ue;ue=null,this.setClear(ht)}oe=he},getReversed:function(){return oe},setTest:function(he){he?le(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(he){V!==he&&!I&&(i.depthMask(he),V=he)},setFunc:function(he){if(oe&&(he=Mv[he]),J!==he){switch(he){case ka:i.depthFunc(i.NEVER);break;case Ia:i.depthFunc(i.ALWAYS);break;case Da:i.depthFunc(i.LESS);break;case Fi:i.depthFunc(i.LEQUAL);break;case Na:i.depthFunc(i.EQUAL);break;case Ua:i.depthFunc(i.GEQUAL);break;case Oa:i.depthFunc(i.GREATER);break;case Fa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=he}},setLocked:function(he){I=he},setClear:function(he){ue!==he&&(oe&&(he=1-he),i.clearDepth(he),ue=he)},reset:function(){I=!1,V=null,J=null,ue=null,oe=!1}}}function s(){let I=!1,oe=null,V=null,J=null,ue=null,he=null,Ie=null,ht=null,_t=null;return{setTest:function(Ke){I||(Ke?le(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(Ke){oe!==Ke&&!I&&(i.stencilMask(Ke),oe=Ke)},setFunc:function(Ke,Vt,ln){(V!==Ke||J!==Vt||ue!==ln)&&(i.stencilFunc(Ke,Vt,ln),V=Ke,J=Vt,ue=ln)},setOp:function(Ke,Vt,ln){(he!==Ke||Ie!==Vt||ht!==ln)&&(i.stencilOp(Ke,Vt,ln),he=Ke,Ie=Vt,ht=ln)},setLocked:function(Ke){I=Ke},setClear:function(Ke){_t!==Ke&&(i.clearStencil(Ke),_t=Ke)},reset:function(){I=!1,oe=null,V=null,J=null,ue=null,he=null,Ie=null,ht=null,_t=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},h={},p=new WeakMap,f=[],v=null,g=!1,m=null,u=null,x=null,_=null,w=null,k=null,E=null,A=new ze(0,0,0),C=0,M=!1,y=null,T=null,D=null,L=null,B=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Z=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec($)[1]),z=Z>=1):$.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),z=Z>=2);let ee=null,ae={};const Me=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),Fe=new Qe().fromArray(Me),X=new Qe().fromArray(ye);function te(I,oe,V,J){const ue=new Uint8Array(4),he=i.createTexture();i.bindTexture(I,he),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<V;Ie++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(oe+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return he}const _e={};_e[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),_e[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_e[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),le(i.DEPTH_TEST),a.setFunc(Fi),He(!1),Ge(sl),le(i.CULL_FACE),O(On);function le(I){d[I]!==!0&&(i.enable(I),d[I]=!0)}function Ce(I){d[I]!==!1&&(i.disable(I),d[I]=!1)}function ke(I,oe){return h[I]!==oe?(i.bindFramebuffer(I,oe),h[I]=oe,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=oe),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function Be(I,oe){let V=f,J=!1;if(I){V=p.get(oe),V===void 0&&(V=[],p.set(oe,V));const ue=I.textures;if(V.length!==ue.length||V[0]!==i.COLOR_ATTACHMENT0){for(let he=0,Ie=ue.length;he<Ie;he++)V[he]=i.COLOR_ATTACHMENT0+he;V.length=ue.length,J=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,J=!0);J&&i.drawBuffers(V)}function lt(I){return v!==I?(i.useProgram(I),v=I,!0):!1}const Ve={[Jn]:i.FUNC_ADD,[Bd]:i.FUNC_SUBTRACT,[zd]:i.FUNC_REVERSE_SUBTRACT};Ve[Hd]=i.MIN,Ve[Gd]=i.MAX;const dt={[$d]:i.ZERO,[Vd]:i.ONE,[Wd]:i.SRC_COLOR,[La]:i.SRC_ALPHA,[Jd]:i.SRC_ALPHA_SATURATE,[jd]:i.DST_COLOR,[Xd]:i.DST_ALPHA,[qd]:i.ONE_MINUS_SRC_COLOR,[Pa]:i.ONE_MINUS_SRC_ALPHA,[Kd]:i.ONE_MINUS_DST_COLOR,[Yd]:i.ONE_MINUS_DST_ALPHA,[Zd]:i.CONSTANT_COLOR,[Qd]:i.ONE_MINUS_CONSTANT_COLOR,[eu]:i.CONSTANT_ALPHA,[tu]:i.ONE_MINUS_CONSTANT_ALPHA};function O(I,oe,V,J,ue,he,Ie,ht,_t,Ke){if(I===On){g===!0&&(Ce(i.BLEND),g=!1);return}if(g===!1&&(le(i.BLEND),g=!0),I!==Fd){if(I!==m||Ke!==M){if((u!==Jn||w!==Jn)&&(i.blendEquation(i.FUNC_ADD),u=Jn,w=Jn),Ke)switch(I){case Di:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ca:i.blendFunc(i.ONE,i.ONE);break;case rl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Di:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ca:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case rl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case al:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}x=null,_=null,k=null,E=null,A.set(0,0,0),C=0,m=I,M=Ke}return}ue=ue||oe,he=he||V,Ie=Ie||J,(oe!==u||ue!==w)&&(i.blendEquationSeparate(Ve[oe],Ve[ue]),u=oe,w=ue),(V!==x||J!==_||he!==k||Ie!==E)&&(i.blendFuncSeparate(dt[V],dt[J],dt[he],dt[Ie]),x=V,_=J,k=he,E=Ie),(ht.equals(A)===!1||_t!==C)&&(i.blendColor(ht.r,ht.g,ht.b,_t),A.copy(ht),C=_t),m=I,M=!1}function Ft(I,oe){I.side===_n?Ce(i.CULL_FACE):le(i.CULL_FACE);let V=I.side===Lt;oe&&(V=!V),He(V),I.blending===Di&&I.transparent===!1?O(On):O(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const J=I.stencilWrite;o.setTest(J),J&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),nt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?le(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function Ge(I){I!==Ud?(le(i.CULL_FACE),I!==T&&(I===sl?i.cullFace(i.BACK):I===Od?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),T=I}function Ae(I){I!==D&&(z&&i.lineWidth(I),D=I)}function nt(I,oe,V){I?(le(i.POLYGON_OFFSET_FILL),(L!==oe||B!==V)&&(i.polygonOffset(oe,V),L=oe,B=V)):Ce(i.POLYGON_OFFSET_FILL)}function Te(I){I?le(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function R(I){I===void 0&&(I=i.TEXTURE0+q-1),ee!==I&&(i.activeTexture(I),ee=I)}function b(I,oe,V){V===void 0&&(ee===null?V=i.TEXTURE0+q-1:V=ee);let J=ae[V];J===void 0&&(J={type:void 0,texture:void 0},ae[V]=J),(J.type!==I||J.texture!==oe)&&(ee!==V&&(i.activeTexture(V),ee=V),i.bindTexture(I,oe||_e[I]),J.type=I,J.texture=oe)}function F(){const I=ae[ee];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Se(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(I){Fe.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Fe.copy(I))}function ve(I){X.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),X.copy(I))}function $e(I,oe){let V=c.get(oe);V===void 0&&(V=new WeakMap,c.set(oe,V));let J=V.get(I);J===void 0&&(J=i.getUniformBlockIndex(oe,I.name),V.set(I,J))}function Ue(I,oe){const J=c.get(oe).get(I);l.get(oe)!==J&&(i.uniformBlockBinding(oe,J,I.__bindingPointIndex),l.set(oe,J))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ee=null,ae={},h={},p=new WeakMap,f=[],v=null,g=!1,m=null,u=null,x=null,_=null,w=null,k=null,E=null,A=new ze(0,0,0),C=0,M=!1,y=null,T=null,D=null,L=null,B=null,Fe.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:le,disable:Ce,bindFramebuffer:ke,drawBuffers:Be,useProgram:lt,setBlending:O,setMaterial:Ft,setFlipSided:He,setCullFace:Ge,setLineWidth:Ae,setPolygonOffset:nt,setScissorTest:Te,activeTexture:R,bindTexture:b,unbindTexture:F,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:ge,texImage3D:Re,updateUBOMapping:$e,uniformBlockBinding:Ue,texStorage2D:We,texStorage3D:ne,texSubImage2D:j,texSubImage3D:Se,compressedTexSubImage2D:ce,compressedTexSubImage3D:me,scissor:Le,viewport:ve,reset:et}}function Ql(i,e,t,n){const s=Ev(n);switch(t){case hh:return i*e;case uh:return i*e;case fh:return i*e*2;case ph:return i*e/s.components*s.byteLength;case Po:return i*e/s.components*s.byteLength;case mh:return i*e*2/s.components*s.byteLength;case ko:return i*e*2/s.components*s.byteLength;case dh:return i*e*3/s.components*s.byteLength;case Jt:return i*e*4/s.components*s.byteLength;case Io:return i*e*4/s.components*s.byteLength;case dr:case ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fr:case pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Va:case qa:return Math.max(i,16)*Math.max(e,8)/4;case $a:case Wa:return Math.max(i,8)*Math.max(e,8)/2;case Xa:case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Za:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case eo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case to:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case no:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case io:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case so:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ro:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ao:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case oo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case lo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case co:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case mr:case ho:case uo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case gh:case fo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case po:case mo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ev(i){switch(i){case Tn:case oh:return{byteLength:1,components:1};case Rs:case lh:case Ls:return{byteLength:2,components:1};case Co:case Lo:return{byteLength:2,components:4};case si:case Ro:case bn:return{byteLength:4,components:1};case ch:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Tv(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,d=new WeakMap;let h;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,b){return f?new OffscreenCanvas(R,b):Cs("canvas")}function g(R,b,F){let K=1;const Q=Te(R);if((Q.width>F||Q.height>F)&&(K=F/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const j=Math.floor(K*Q.width),Se=Math.floor(K*Q.height);h===void 0&&(h=v(j,Se));const ce=b?v(j,Se):h;return ce.width=j,ce.height=Se,ce.getContext("2d").drawImage(R,0,0,j,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+Se+")."),ce}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function m(R){return R.generateMipmaps}function u(R){i.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(R,b,F,K,Q=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=b;if(b===i.RED&&(F===i.FLOAT&&(j=i.R32F),F===i.HALF_FLOAT&&(j=i.R16F),F===i.UNSIGNED_BYTE&&(j=i.R8)),b===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.R8UI),F===i.UNSIGNED_SHORT&&(j=i.R16UI),F===i.UNSIGNED_INT&&(j=i.R32UI),F===i.BYTE&&(j=i.R8I),F===i.SHORT&&(j=i.R16I),F===i.INT&&(j=i.R32I)),b===i.RG&&(F===i.FLOAT&&(j=i.RG32F),F===i.HALF_FLOAT&&(j=i.RG16F),F===i.UNSIGNED_BYTE&&(j=i.RG8)),b===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RG8UI),F===i.UNSIGNED_SHORT&&(j=i.RG16UI),F===i.UNSIGNED_INT&&(j=i.RG32UI),F===i.BYTE&&(j=i.RG8I),F===i.SHORT&&(j=i.RG16I),F===i.INT&&(j=i.RG32I)),b===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGB8UI),F===i.UNSIGNED_SHORT&&(j=i.RGB16UI),F===i.UNSIGNED_INT&&(j=i.RGB32UI),F===i.BYTE&&(j=i.RGB8I),F===i.SHORT&&(j=i.RGB16I),F===i.INT&&(j=i.RGB32I)),b===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),F===i.UNSIGNED_INT&&(j=i.RGBA32UI),F===i.BYTE&&(j=i.RGBA8I),F===i.SHORT&&(j=i.RGBA16I),F===i.INT&&(j=i.RGBA32I)),b===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),b===i.RGBA){const Se=Q?Cr:qe.getTransfer(K);F===i.FLOAT&&(j=i.RGBA32F),F===i.HALF_FLOAT&&(j=i.RGBA16F),F===i.UNSIGNED_BYTE&&(j=Se===Je?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function w(R,b){let F;return R?b===null||b===si||b===Hi?F=i.DEPTH24_STENCIL8:b===bn?F=i.DEPTH32F_STENCIL8:b===Rs&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===si||b===Hi?F=i.DEPTH_COMPONENT24:b===bn?F=i.DEPTH_COMPONENT32F:b===Rs&&(F=i.DEPTH_COMPONENT16),F}function k(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ut&&R.minFilter!==nn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function E(R){const b=R.target;b.removeEventListener("dispose",E),C(b),b.isVideoTexture&&d.delete(b)}function A(R){const b=R.target;b.removeEventListener("dispose",A),y(b)}function C(R){const b=n.get(R);if(b.__webglInit===void 0)return;const F=R.source,K=p.get(F);if(K){const Q=K[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(R),Object.keys(K).length===0&&p.delete(F)}n.remove(R)}function M(R){const b=n.get(R);i.deleteTexture(b.__webglTexture);const F=R.source,K=p.get(F);delete K[b.__cacheKey],a.memory.textures--}function y(R){const b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let Q=0;Q<b.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(b.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)i.deleteFramebuffer(b.__webglFramebuffer[K]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const F=R.textures;for(let K=0,Q=F.length;K<Q;K++){const j=n.get(F[K]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(F[K])}n.remove(R)}let T=0;function D(){T=0}function L(){const R=T;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),T+=1,R}function B(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function q(R,b){const F=n.get(R);if(R.isVideoTexture&&Ae(R),R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){const K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(F,R,b);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+b)}function z(R,b){const F=n.get(R);if(R.version>0&&F.__version!==R.version){X(F,R,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+b)}function Z(R,b){const F=n.get(R);if(R.version>0&&F.__version!==R.version){X(F,R,b);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+b)}function $(R,b){const F=n.get(R);if(R.version>0&&F.__version!==R.version){te(F,R,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+b)}const ee={[Ha]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[Ga]:i.MIRRORED_REPEAT},ae={[Ut]:i.NEAREST,[du]:i.NEAREST_MIPMAP_NEAREST,[Ns]:i.NEAREST_MIPMAP_LINEAR,[nn]:i.LINEAR,[Ur]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},Me={[mu]:i.NEVER,[bu]:i.ALWAYS,[gu]:i.LESS,[yh]:i.LEQUAL,[vu]:i.EQUAL,[xu]:i.GEQUAL,[yu]:i.GREATER,[_u]:i.NOTEQUAL};function ye(R,b){if(b.type===bn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===nn||b.magFilter===Ur||b.magFilter===Ns||b.magFilter===ti||b.minFilter===nn||b.minFilter===Ur||b.minFilter===Ns||b.minFilter===ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ee[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ee[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ee[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ae[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ae[b.minFilter]),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Me[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ut||b.minFilter!==Ns&&b.minFilter!==ti||b.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Fe(R,b){let F=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",E));const K=b.source;let Q=p.get(K);Q===void 0&&(Q={},p.set(K,Q));const j=B(b);if(j!==R.__cacheKey){Q[j]===void 0&&(Q[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[j].usedTimes++;const Se=Q[R.__cacheKey];Se!==void 0&&(Q[R.__cacheKey].usedTimes--,Se.usedTimes===0&&M(b)),R.__cacheKey=j,R.__webglTexture=Q[j].texture}return F}function X(R,b,F){let K=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(K=i.TEXTURE_3D);const Q=Fe(R,b),j=b.source;t.bindTexture(K,R.__webglTexture,i.TEXTURE0+F);const Se=n.get(j);if(j.version!==Se.__version||Q===!0){t.activeTexture(i.TEXTURE0+F);const ce=qe.getPrimaries(qe.workingColorSpace),me=b.colorSpace===Un?null:qe.getPrimaries(b.colorSpace),We=b.colorSpace===Un||ce===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let ne=g(b.image,!1,s.maxTextureSize);ne=nt(b,ne);const ge=r.convert(b.format,b.colorSpace),Re=r.convert(b.type);let Le=_(b.internalFormat,ge,Re,b.colorSpace,b.isVideoTexture);ye(K,b);let ve;const $e=b.mipmaps,Ue=b.isVideoTexture!==!0,et=Se.__version===void 0||Q===!0,I=j.dataReady,oe=k(b,ne);if(b.isDepthTexture)Le=w(b.format===Gi,b.type),et&&(Ue?t.texStorage2D(i.TEXTURE_2D,1,Le,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,Le,ne.width,ne.height,0,ge,Re,null));else if(b.isDataTexture)if($e.length>0){Ue&&et&&t.texStorage2D(i.TEXTURE_2D,oe,Le,$e[0].width,$e[0].height);for(let V=0,J=$e.length;V<J;V++)ve=$e[V],Ue?I&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ve.width,ve.height,ge,Re,ve.data):t.texImage2D(i.TEXTURE_2D,V,Le,ve.width,ve.height,0,ge,Re,ve.data);b.generateMipmaps=!1}else Ue?(et&&t.texStorage2D(i.TEXTURE_2D,oe,Le,ne.width,ne.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ne.width,ne.height,ge,Re,ne.data)):t.texImage2D(i.TEXTURE_2D,0,Le,ne.width,ne.height,0,ge,Re,ne.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ue&&et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Le,$e[0].width,$e[0].height,ne.depth);for(let V=0,J=$e.length;V<J;V++)if(ve=$e[V],b.format!==Jt)if(ge!==null)if(Ue){if(I)if(b.layerUpdates.size>0){const ue=Ql(ve.width,ve.height,b.format,b.type);for(const he of b.layerUpdates){const Ie=ve.data.subarray(he*ue/ve.data.BYTES_PER_ELEMENT,(he+1)*ue/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,he,ve.width,ve.height,1,ge,Ie)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,ve.width,ve.height,ne.depth,ge,ve.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Le,ve.width,ve.height,ne.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,ve.width,ve.height,ne.depth,ge,Re,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,V,Le,ve.width,ve.height,ne.depth,0,ge,Re,ve.data)}else{Ue&&et&&t.texStorage2D(i.TEXTURE_2D,oe,Le,$e[0].width,$e[0].height);for(let V=0,J=$e.length;V<J;V++)ve=$e[V],b.format!==Jt?ge!==null?Ue?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,ve.width,ve.height,ge,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,V,Le,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?I&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ve.width,ve.height,ge,Re,ve.data):t.texImage2D(i.TEXTURE_2D,V,Le,ve.width,ve.height,0,ge,Re,ve.data)}else if(b.isDataArrayTexture)if(Ue){if(et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Le,ne.width,ne.height,ne.depth),I)if(b.layerUpdates.size>0){const V=Ql(ne.width,ne.height,b.format,b.type);for(const J of b.layerUpdates){const ue=ne.data.subarray(J*V/ne.data.BYTES_PER_ELEMENT,(J+1)*V/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,ge,Re,ue)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ge,Re,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,ne.width,ne.height,ne.depth,0,ge,Re,ne.data);else if(b.isData3DTexture)Ue?(et&&t.texStorage3D(i.TEXTURE_3D,oe,Le,ne.width,ne.height,ne.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ge,Re,ne.data)):t.texImage3D(i.TEXTURE_3D,0,Le,ne.width,ne.height,ne.depth,0,ge,Re,ne.data);else if(b.isFramebufferTexture){if(et)if(Ue)t.texStorage2D(i.TEXTURE_2D,oe,Le,ne.width,ne.height);else{let V=ne.width,J=ne.height;for(let ue=0;ue<oe;ue++)t.texImage2D(i.TEXTURE_2D,ue,Le,V,J,0,ge,Re,null),V>>=1,J>>=1}}else if($e.length>0){if(Ue&&et){const V=Te($e[0]);t.texStorage2D(i.TEXTURE_2D,oe,Le,V.width,V.height)}for(let V=0,J=$e.length;V<J;V++)ve=$e[V],Ue?I&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ge,Re,ve):t.texImage2D(i.TEXTURE_2D,V,Le,ge,Re,ve);b.generateMipmaps=!1}else if(Ue){if(et){const V=Te(ne);t.texStorage2D(i.TEXTURE_2D,oe,Le,V.width,V.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Re,ne)}else t.texImage2D(i.TEXTURE_2D,0,Le,ge,Re,ne);m(b)&&u(K),Se.__version=j.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function te(R,b,F){if(b.image.length!==6)return;const K=Fe(R,b),Q=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+F);const j=n.get(Q);if(Q.version!==j.__version||K===!0){t.activeTexture(i.TEXTURE0+F);const Se=qe.getPrimaries(qe.workingColorSpace),ce=b.colorSpace===Un?null:qe.getPrimaries(b.colorSpace),me=b.colorSpace===Un||Se===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const We=b.isCompressedTexture||b.image[0].isCompressedTexture,ne=b.image[0]&&b.image[0].isDataTexture,ge=[];for(let J=0;J<6;J++)!We&&!ne?ge[J]=g(b.image[J],!0,s.maxCubemapSize):ge[J]=ne?b.image[J].image:b.image[J],ge[J]=nt(b,ge[J]);const Re=ge[0],Le=r.convert(b.format,b.colorSpace),ve=r.convert(b.type),$e=_(b.internalFormat,Le,ve,b.colorSpace),Ue=b.isVideoTexture!==!0,et=j.__version===void 0||K===!0,I=Q.dataReady;let oe=k(b,Re);ye(i.TEXTURE_CUBE_MAP,b);let V;if(We){Ue&&et&&t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,$e,Re.width,Re.height);for(let J=0;J<6;J++){V=ge[J].mipmaps;for(let ue=0;ue<V.length;ue++){const he=V[ue];b.format!==Jt?Le!==null?Ue?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,he.width,he.height,Le,he.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,he.width,he.height,Le,ve,he.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,he.width,he.height,0,Le,ve,he.data)}}}else{if(V=b.mipmaps,Ue&&et){V.length>0&&oe++;const J=Te(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,$e,J.width,J.height)}for(let J=0;J<6;J++)if(ne){Ue?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ge[J].width,ge[J].height,Le,ve,ge[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,ge[J].width,ge[J].height,0,Le,ve,ge[J].data);for(let ue=0;ue<V.length;ue++){const Ie=V[ue].image[J].image;Ue?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Ie.width,Ie.height,Le,ve,Ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Ie.width,Ie.height,0,Le,ve,Ie.data)}}else{Ue?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Le,ve,ge[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Le,ve,ge[J]);for(let ue=0;ue<V.length;ue++){const he=V[ue];Ue?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Le,ve,he.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Le,ve,he.image[J])}}}m(b)&&u(i.TEXTURE_CUBE_MAP),j.__version=Q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function _e(R,b,F,K,Q,j){const Se=r.convert(F.format,F.colorSpace),ce=r.convert(F.type),me=_(F.internalFormat,Se,ce,F.colorSpace),We=n.get(b),ne=n.get(F);if(ne.__renderTarget=b,!We.__hasExternalTextures){const ge=Math.max(1,b.width>>j),Re=Math.max(1,b.height>>j);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,j,me,ge,Re,b.depth,0,Se,ce,null):t.texImage2D(Q,j,me,ge,Re,0,Se,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Ge(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,ne.__webglTexture,0,He(b)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,ne.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(R,b,F){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer){const K=b.depthTexture,Q=K&&K.isDepthTexture?K.type:null,j=w(b.stencilBuffer,Q),Se=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=He(b);Ge(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,j,b.width,b.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,j,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,j,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,R)}else{const K=b.textures;for(let Q=0;Q<K.length;Q++){const j=K[Q],Se=r.convert(j.format,j.colorSpace),ce=r.convert(j.type),me=_(j.internalFormat,Se,ce,j.colorSpace),We=He(b);F&&Ge(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,We,me,b.width,b.height):Ge(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We,me,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,me,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(b.depthTexture);K.__renderTarget=b,(!K.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),q(b.depthTexture,0);const Q=K.__webglTexture,j=He(b);if(b.depthTexture.format===Ni)Ge(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(b.depthTexture.format===Gi)Ge(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function ke(R){const b=n.get(R),F=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),K){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=K}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ce(b.__webglFramebuffer,R)}else if(F){b.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[K]),b.__webglDepthbuffer[K]===void 0)b.__webglDepthbuffer[K]=i.createRenderbuffer(),le(b.__webglDepthbuffer[K],R,!1);else{const Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,j)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),le(b.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Q)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(R,b,F){const K=n.get(R);b!==void 0&&_e(K.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&ke(R)}function lt(R){const b=R.texture,F=n.get(R),K=n.get(b);R.addEventListener("dispose",A);const Q=R.textures,j=R.isWebGLCubeRenderTarget===!0,Se=Q.length>1;if(Se||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=b.version,a.memory.textures++),j){F.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[ce]=[];for(let me=0;me<b.mipmaps.length;me++)F.__webglFramebuffer[ce][me]=i.createFramebuffer()}else F.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let ce=0;ce<b.mipmaps.length;ce++)F.__webglFramebuffer[ce]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Se)for(let ce=0,me=Q.length;ce<me;ce++){const We=n.get(Q[ce]);We.__webglTexture===void 0&&(We.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Ge(R)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ce=0;ce<Q.length;ce++){const me=Q[ce];F.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ce]);const We=r.convert(me.format,me.colorSpace),ne=r.convert(me.type),ge=_(me.internalFormat,We,ne,me.colorSpace,R.isXRRenderTarget===!0),Re=He(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,ge,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,F.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),le(F.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ye(i.TEXTURE_CUBE_MAP,b);for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)_e(F.__webglFramebuffer[ce][me],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else _e(F.__webglFramebuffer[ce],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(b)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ce=0,me=Q.length;ce<me;ce++){const We=Q[ce],ne=n.get(We);t.bindTexture(i.TEXTURE_2D,ne.__webglTexture),ye(i.TEXTURE_2D,We),_e(F.__webglFramebuffer,R,We,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),m(We)&&u(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ce=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,K.__webglTexture),ye(ce,b),b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)_e(F.__webglFramebuffer[me],R,b,i.COLOR_ATTACHMENT0,ce,me);else _e(F.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,ce,0);m(b)&&u(ce),t.unbindTexture()}R.depthBuffer&&ke(R)}function Ve(R){const b=R.textures;for(let F=0,K=b.length;F<K;F++){const Q=b[F];if(m(Q)){const j=x(R),Se=n.get(Q).__webglTexture;t.bindTexture(j,Se),u(j),t.unbindTexture()}}}const dt=[],O=[];function Ft(R){if(R.samples>0){if(Ge(R)===!1){const b=R.textures,F=R.width,K=R.height;let Q=i.COLOR_BUFFER_BIT;const j=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(R),ce=b.length>1;if(ce)for(let me=0;me<b.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let me=0;me<b.length;me++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const We=n.get(b[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,F,K,0,0,F,K,Q,i.NEAREST),l===!0&&(dt.length=0,O.length=0,dt.push(i.COLOR_ATTACHMENT0+me),R.depthBuffer&&R.resolveDepthBuffer===!1&&(dt.push(j),O.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let me=0;me<b.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const We=n.get(b[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function He(R){return Math.min(s.maxSamples,R.samples)}function Ge(R){const b=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ae(R){const b=a.render.frame;d.get(R)!==b&&(d.set(R,b),R.update())}function nt(R,b){const F=R.colorSpace,K=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||F!==qi&&F!==Un&&(qe.getTransfer(F)===Je?(K!==Jt||Q!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function Te(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=D,this.setTexture2D=q,this.setTexture2DArray=z,this.setTexture3D=Z,this.setTextureCube=$,this.rebindTextures=Be,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ge}function Av(i,e){function t(n,s=Un){let r;const a=qe.getTransfer(s);if(n===Tn)return i.UNSIGNED_BYTE;if(n===Co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ch)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===oh)return i.BYTE;if(n===lh)return i.SHORT;if(n===Rs)return i.UNSIGNED_SHORT;if(n===Ro)return i.INT;if(n===si)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===Ls)return i.HALF_FLOAT;if(n===hh)return i.ALPHA;if(n===dh)return i.RGB;if(n===Jt)return i.RGBA;if(n===uh)return i.LUMINANCE;if(n===fh)return i.LUMINANCE_ALPHA;if(n===Ni)return i.DEPTH_COMPONENT;if(n===Gi)return i.DEPTH_STENCIL;if(n===ph)return i.RED;if(n===Po)return i.RED_INTEGER;if(n===mh)return i.RG;if(n===ko)return i.RG_INTEGER;if(n===Io)return i.RGBA_INTEGER;if(n===dr||n===ur||n===fr||n===pr)if(a===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$a||n===Va||n===Wa||n===qa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xa||n===Ya||n===ja)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xa||n===Ya)return a===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ja)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ka||n===Ja||n===Za||n===Qa||n===eo||n===to||n===no||n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ka)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ja)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Za)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qa)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===eo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===to)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===no)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===io)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===so)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ro)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ao)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===oo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===lo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===co)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mr||n===ho||n===uo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===mr)return a===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===uo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===gh||n===fo||n===po||n===mo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===mr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===po)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===mo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Rv extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class xn extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cv={type:"move"};class da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),u=this._getHandJoint(c,g);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=d.position.distanceTo(h.position),f=.02,v=.005;c.inputState.pinching&&p>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Cv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new xn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Lv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pv=`
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

}`;class kv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Et,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Hn({vertexShader:Lv,fragmentShader:Pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new Lr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Iv extends Xi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,p=null,f=null,v=null;const g=new kv,m=t.getContextAttributes();let u=null,x=null;const _=[],w=[],k=new fe;let E=null;const A=new Ht;A.viewport=new Qe;const C=new Ht;C.viewport=new Qe;const M=[A,C],y=new Rv;let T=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=_[X];return te===void 0&&(te=new da,_[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=_[X];return te===void 0&&(te=new da,_[X]=te),te.getGripSpace()},this.getHand=function(X){let te=_[X];return te===void 0&&(te=new da,_[X]=te),te.getHandSpace()};function L(X){const te=w.indexOf(X.inputSource);if(te===-1)return;const _e=_[te];_e!==void 0&&(_e.update(X.inputSource,X.frame,c||a),_e.dispatchEvent({type:X.type,data:X.inputSource}))}function B(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",q);for(let X=0;X<_.length;X++){const te=w[X];te!==null&&(w[X]=null,_[X].disconnect(te))}T=null,D=null,g.reset(),e.setRenderTarget(u),f=null,p=null,h=null,s=null,x=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(u=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",B),s.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(k),s.renderState.layers===void 0){const te={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new ri(f.framebufferWidth,f.framebufferHeight,{format:Jt,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let te=null,_e=null,le=null;m.depth&&(le=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=m.stencil?Gi:Ni,_e=m.stencil?Hi:si);const Ce={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:r};h=new XRWebGLBinding(s,t),p=h.createProjectionLayer(Ce),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),x=new ri(p.textureWidth,p.textureHeight,{format:Jt,type:Tn,depthTexture:new Ph(p.textureWidth,p.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(X){for(let te=0;te<X.removed.length;te++){const _e=X.removed[te],le=w.indexOf(_e);le>=0&&(w[le]=null,_[le].disconnect(_e))}for(let te=0;te<X.added.length;te++){const _e=X.added[te];let le=w.indexOf(_e);if(le===-1){for(let ke=0;ke<_.length;ke++)if(ke>=w.length){w.push(_e),le=ke;break}else if(w[ke]===null){w[ke]=_e,le=ke;break}if(le===-1)break}const Ce=_[le];Ce&&Ce.connect(_e)}}const z=new P,Z=new P;function $(X,te,_e){z.setFromMatrixPosition(te.matrixWorld),Z.setFromMatrixPosition(_e.matrixWorld);const le=z.distanceTo(Z),Ce=te.projectionMatrix.elements,ke=_e.projectionMatrix.elements,Be=Ce[14]/(Ce[10]-1),lt=Ce[14]/(Ce[10]+1),Ve=(Ce[9]+1)/Ce[5],dt=(Ce[9]-1)/Ce[5],O=(Ce[8]-1)/Ce[0],Ft=(ke[8]+1)/ke[0],He=Be*O,Ge=Be*Ft,Ae=le/(-O+Ft),nt=Ae*-O;if(te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(nt),X.translateZ(Ae),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ce[10]===-1)X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Te=Be+Ae,R=lt+Ae,b=He-nt,F=Ge+(le-nt),K=Ve*lt/R*Te,Q=dt*lt/R*Te;X.projectionMatrix.makePerspective(b,F,K,Q,Te,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ee(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let te=X.near,_e=X.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(_e=g.depthFar)),y.near=C.near=A.near=te,y.far=C.far=A.far=_e,(T!==y.near||D!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,D=y.far),A.layers.mask=X.layers.mask|2,C.layers.mask=X.layers.mask|4,y.layers.mask=A.layers.mask|C.layers.mask;const le=X.parent,Ce=y.cameras;ee(y,le);for(let ke=0;ke<Ce.length;ke++)ee(Ce[ke],le);Ce.length===2?$(y,A,C):y.projectionMatrix.copy(A.projectionMatrix),ae(X,y,le)};function ae(X,te,_e){_e===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(_e.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=vo*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(X){l=X,p!==null&&(p.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(y)};let Me=null;function ye(X,te){if(d=te.getViewerPose(c||a),v=te,d!==null){const _e=d.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let le=!1;_e.length!==y.cameras.length&&(y.cameras.length=0,le=!0);for(let ke=0;ke<_e.length;ke++){const Be=_e[ke];let lt=null;if(f!==null)lt=f.getViewport(Be);else{const dt=h.getViewSubImage(p,Be);lt=dt.viewport,ke===0&&(e.setRenderTargetTextures(x,dt.colorTexture,p.ignoreDepthValues?void 0:dt.depthStencilTexture),e.setRenderTarget(x))}let Ve=M[ke];Ve===void 0&&(Ve=new Ht,Ve.layers.enable(ke),Ve.viewport=new Qe,M[ke]=Ve),Ve.matrix.fromArray(Be.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Be.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(lt.x,lt.y,lt.width,lt.height),ke===0&&(y.matrix.copy(Ve.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),le===!0&&y.cameras.push(Ve)}const Ce=s.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const ke=h.getDepthInformation(_e[0]);ke&&ke.isValid&&ke.texture&&g.init(e,ke,s.renderState)}}for(let _e=0;_e<_.length;_e++){const le=w[_e],Ce=_[_e];le!==null&&Ce!==void 0&&Ce.update(le,te,c||a)}Me&&Me(X,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),v=null}const Fe=new Lh;Fe.setAnimationLoop(ye),this.setAnimationLoop=function(X){Me=X},this.dispose=function(){}}}const Yn=new rn,Dv=new ot;function Nv(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,Ah(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,x,_,w){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),h(m,u)):u.isMeshPhongMaterial?(r(m,u),d(m,u)):u.isMeshStandardMaterial?(r(m,u),p(m,u),u.isMeshPhysicalMaterial&&f(m,u,w)):u.isMeshMatcapMaterial?(r(m,u),v(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),g(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,x,_):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Lt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Lt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const x=e.get(u),_=x.envMap,w=x.envMapRotation;_&&(m.envMap.value=_,Yn.copy(w),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),m.envMapRotation.value.setFromMatrix4(Dv.makeRotationFromEuler(Yn)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,x,_){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*x,m.scale.value=_*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function p(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function f(m,u,x){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Lt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,u){u.matcap&&(m.matcap.value=u.matcap)}function g(m,u){const x=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Uv(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){const w=_.program;n.uniformBlockBinding(x,w)}function c(x,_){let w=s[x.id];w===void 0&&(v(x),w=d(x),s[x.id]=w,x.addEventListener("dispose",m));const k=_.program;n.updateUBOMapping(x,k);const E=e.render.frame;r[x.id]!==E&&(p(x),r[x.id]=E)}function d(x){const _=h();x.__bindingPointIndex=_;const w=i.createBuffer(),k=x.__size,E=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,k,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,w),w}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(x){const _=s[x.id],w=x.uniforms,k=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let E=0,A=w.length;E<A;E++){const C=Array.isArray(w[E])?w[E]:[w[E]];for(let M=0,y=C.length;M<y;M++){const T=C[M];if(f(T,E,M,k)===!0){const D=T.__offset,L=Array.isArray(T.value)?T.value:[T.value];let B=0;for(let q=0;q<L.length;q++){const z=L[q],Z=g(z);typeof z=="number"||typeof z=="boolean"?(T.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,D+B,T.__data)):z.isMatrix3?(T.__data[0]=z.elements[0],T.__data[1]=z.elements[1],T.__data[2]=z.elements[2],T.__data[3]=0,T.__data[4]=z.elements[3],T.__data[5]=z.elements[4],T.__data[6]=z.elements[5],T.__data[7]=0,T.__data[8]=z.elements[6],T.__data[9]=z.elements[7],T.__data[10]=z.elements[8],T.__data[11]=0):(z.toArray(T.__data,B),B+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,_,w,k){const E=x.value,A=_+"_"+w;if(k[A]===void 0)return typeof E=="number"||typeof E=="boolean"?k[A]=E:k[A]=E.clone(),!0;{const C=k[A];if(typeof E=="number"||typeof E=="boolean"){if(C!==E)return k[A]=E,!0}else if(C.equals(E)===!1)return C.copy(E),!0}return!1}function v(x){const _=x.uniforms;let w=0;const k=16;for(let A=0,C=_.length;A<C;A++){const M=Array.isArray(_[A])?_[A]:[_[A]];for(let y=0,T=M.length;y<T;y++){const D=M[y],L=Array.isArray(D.value)?D.value:[D.value];for(let B=0,q=L.length;B<q;B++){const z=L[B],Z=g(z),$=w%k,ee=$%Z.boundary,ae=$+ee;w+=ee,ae!==0&&k-ae<Z.storage&&(w+=k-ae),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=Z.storage}}}const E=w%k;return E>0&&(w+=k-E),x.__size=w,x.__cache={},this}function g(x){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function m(x){const _=x.target;_.removeEventListener("dispose",m);const w=a.indexOf(_.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function u(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:u}}class Ov{constructor(e={}){const{canvas:t=Mu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const v=new Uint32Array(4),g=new Int32Array(4);let m=null,u=null;const x=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this.toneMapping=Fn,this.toneMappingExposure=1;const w=this;let k=!1,E=0,A=0,C=null,M=-1,y=null;const T=new Qe,D=new Qe;let L=null;const B=new ze(0);let q=0,z=t.width,Z=t.height,$=1,ee=null,ae=null;const Me=new Qe(0,0,z,Z),ye=new Qe(0,0,z,Z);let Fe=!1;const X=new No;let te=!1,_e=!1;const le=new ot,Ce=new ot,ke=new P,Be=new Qe,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function dt(){return C===null?$:1}let O=n;function Ft(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ao}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",he,!1),O===null){const N="webgl2";if(O=Ft(N,S),O===null)throw Ft(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let He,Ge,Ae,nt,Te,R,b,F,K,Q,j,Se,ce,me,We,ne,ge,Re,Le,ve,$e,Ue,et,I;function oe(){He=new Gm(O),He.init(),Ue=new Av(O,He),Ge=new Um(O,He,e,Ue),Ae=new Sv(O,He),Ge.reverseDepthBuffer&&p&&Ae.buffers.depth.setReversed(!0),nt=new Wm(O),Te=new cv,R=new Tv(O,He,Ae,Te,Ge,Ue,nt),b=new Fm(w),F=new Hm(w),K=new Ju(O),et=new Dm(O,K),Q=new $m(O,K,nt,et),j=new Xm(O,Q,K,nt),Le=new qm(O,Ge,R),ne=new Om(Te),Se=new lv(w,b,F,He,Ge,et,ne),ce=new Nv(w,Te),me=new dv,We=new vv(He),Re=new Im(w,b,F,Ae,j,f,l),ge=new wv(w,j,Ge),I=new Uv(O,nt,Ge,Ae),ve=new Nm(O,He,nt),$e=new Vm(O,He,nt),nt.programs=Se.programs,w.capabilities=Ge,w.extensions=He,w.properties=Te,w.renderLists=me,w.shadowMap=ge,w.state=Ae,w.info=nt}oe();const V=new Iv(w,O);this.xr=V,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=He.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=He.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(z,Z,!1))},this.getSize=function(S){return S.set(z,Z)},this.setSize=function(S,N,H=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=S,Z=N,t.width=Math.floor(S*$),t.height=Math.floor(N*$),H===!0&&(t.style.width=S+"px",t.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(z*$,Z*$).floor()},this.setDrawingBufferSize=function(S,N,H){z=S,Z=N,$=H,t.width=Math.floor(S*H),t.height=Math.floor(N*H),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(T)},this.getViewport=function(S){return S.copy(Me)},this.setViewport=function(S,N,H,G){S.isVector4?Me.set(S.x,S.y,S.z,S.w):Me.set(S,N,H,G),Ae.viewport(T.copy(Me).multiplyScalar($).round())},this.getScissor=function(S){return S.copy(ye)},this.setScissor=function(S,N,H,G){S.isVector4?ye.set(S.x,S.y,S.z,S.w):ye.set(S,N,H,G),Ae.scissor(D.copy(ye).multiplyScalar($).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(S){Ae.setScissorTest(Fe=S)},this.setOpaqueSort=function(S){ee=S},this.setTransparentSort=function(S){ae=S},this.getClearColor=function(S){return S.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(S=!0,N=!0,H=!0){let G=0;if(S){let U=!1;if(C!==null){const ie=C.texture.format;U=ie===Io||ie===ko||ie===Po}if(U){const ie=C.texture.type,de=ie===Tn||ie===si||ie===Rs||ie===Hi||ie===Co||ie===Lo,xe=Re.getClearColor(),be=Re.getClearAlpha(),Pe=xe.r,De=xe.g,we=xe.b;de?(v[0]=Pe,v[1]=De,v[2]=we,v[3]=be,O.clearBufferuiv(O.COLOR,0,v)):(g[0]=Pe,g[1]=De,g[2]=we,g[3]=be,O.clearBufferiv(O.COLOR,0,g))}else G|=O.COLOR_BUFFER_BIT}N&&(G|=O.DEPTH_BUFFER_BIT),H&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",he,!1),me.dispose(),We.dispose(),Te.dispose(),b.dispose(),F.dispose(),j.dispose(),et.dispose(),I.dispose(),Se.dispose(),V.dispose(),V.removeEventListener("sessionstart",qo),V.removeEventListener("sessionend",Xo),Gn.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const S=nt.autoReset,N=ge.enabled,H=ge.autoUpdate,G=ge.needsUpdate,U=ge.type;oe(),nt.autoReset=S,ge.enabled=N,ge.autoUpdate=H,ge.needsUpdate=G,ge.type=U}function he(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ie(S){const N=S.target;N.removeEventListener("dispose",Ie),ht(N)}function ht(S){_t(S),Te.remove(S)}function _t(S){const N=Te.get(S).programs;N!==void 0&&(N.forEach(function(H){Se.releaseProgram(H)}),S.isShaderMaterial&&Se.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,H,G,U,ie){N===null&&(N=lt);const de=U.isMesh&&U.matrixWorld.determinant()<0,xe=ud(S,N,H,G,U);Ae.setMaterial(G,de);let be=H.index,Pe=1;if(G.wireframe===!0){if(be=Q.getWireframeAttribute(H),be===void 0)return;Pe=2}const De=H.drawRange,we=H.attributes.position;let Xe=De.start*Pe,tt=(De.start+De.count)*Pe;ie!==null&&(Xe=Math.max(Xe,ie.start*Pe),tt=Math.min(tt,(ie.start+ie.count)*Pe)),be!==null?(Xe=Math.max(Xe,0),tt=Math.min(tt,be.count)):we!=null&&(Xe=Math.max(Xe,0),tt=Math.min(tt,we.count));const it=tt-Xe;if(it<0||it===1/0)return;et.setup(U,G,xe,H,be);let Rt,Ye=ve;if(be!==null&&(Rt=K.get(be),Ye=$e,Ye.setIndex(Rt)),U.isMesh)G.wireframe===!0?(Ae.setLineWidth(G.wireframeLinewidth*dt()),Ye.setMode(O.LINES)):Ye.setMode(O.TRIANGLES);else if(U.isLine){let Ee=G.linewidth;Ee===void 0&&(Ee=1),Ae.setLineWidth(Ee*dt()),U.isLineSegments?Ye.setMode(O.LINES):U.isLineLoop?Ye.setMode(O.LINE_LOOP):Ye.setMode(O.LINE_STRIP)}else U.isPoints?Ye.setMode(O.POINTS):U.isSprite&&Ye.setMode(O.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ye.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))Ye.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ee=U._multiDrawStarts,cn=U._multiDrawCounts,je=U._multiDrawCount,Wt=be?K.get(be).bytesPerElement:1,li=Te.get(G).currentProgram.getUniforms();for(let Pt=0;Pt<je;Pt++)li.setValue(O,"_gl_DrawID",Pt),Ye.render(Ee[Pt]/Wt,cn[Pt])}else if(U.isInstancedMesh)Ye.renderInstances(Xe,it,U.count);else if(H.isInstancedBufferGeometry){const Ee=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,cn=Math.min(H.instanceCount,Ee);Ye.renderInstances(Xe,it,cn)}else Ye.render(Xe,it)};function Ke(S,N,H){S.transparent===!0&&S.side===_n&&S.forceSinglePass===!1?(S.side=Lt,S.needsUpdate=!0,Ds(S,N,H),S.side=zn,S.needsUpdate=!0,Ds(S,N,H),S.side=_n):Ds(S,N,H)}this.compile=function(S,N,H=null){H===null&&(H=S),u=We.get(H),u.init(N),_.push(u),H.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),S!==H&&S.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),u.setupLights();const G=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ie=U.material;if(ie)if(Array.isArray(ie))for(let de=0;de<ie.length;de++){const xe=ie[de];Ke(xe,H,U),G.add(xe)}else Ke(ie,H,U),G.add(ie)}),_.pop(),u=null,G},this.compileAsync=function(S,N,H=null){const G=this.compile(S,N,H);return new Promise(U=>{function ie(){if(G.forEach(function(de){Te.get(de).currentProgram.isReady()&&G.delete(de)}),G.size===0){U(S);return}setTimeout(ie,10)}He.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Vt=null;function ln(S){Vt&&Vt(S)}function qo(){Gn.stop()}function Xo(){Gn.start()}const Gn=new Lh;Gn.setAnimationLoop(ln),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(S){Vt=S,V.setAnimationLoop(S),S===null?Gn.stop():Gn.start()},V.addEventListener("sessionstart",qo),V.addEventListener("sessionend",Xo),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(N),N=V.getCamera()),S.isScene===!0&&S.onBeforeRender(w,S,N,C),u=We.get(S,_.length),u.init(N),_.push(u),Ce.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),X.setFromProjectionMatrix(Ce),_e=this.localClippingEnabled,te=ne.init(this.clippingPlanes,_e),m=me.get(S,x.length),m.init(),x.push(m),V.enabled===!0&&V.isPresenting===!0){const ie=w.xr.getDepthSensingMesh();ie!==null&&Nr(ie,N,-1/0,w.sortObjects)}Nr(S,N,0,w.sortObjects),m.finish(),w.sortObjects===!0&&m.sort(ee,ae),Ve=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Ve&&Re.addToRenderList(m,S),this.info.render.frame++,te===!0&&ne.beginShadows();const H=u.state.shadowsArray;ge.render(H,S,N),te===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,U=m.transmissive;if(u.setupLights(),N.isArrayCamera){const ie=N.cameras;if(U.length>0)for(let de=0,xe=ie.length;de<xe;de++){const be=ie[de];jo(G,U,S,be)}Ve&&Re.render(S);for(let de=0,xe=ie.length;de<xe;de++){const be=ie[de];Yo(m,S,be,be.viewport)}}else U.length>0&&jo(G,U,S,N),Ve&&Re.render(S),Yo(m,S,N);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),S.isScene===!0&&S.onAfterRender(w,S,N),et.resetDefaultState(),M=-1,y=null,_.pop(),_.length>0?(u=_[_.length-1],te===!0&&ne.setGlobalState(w.clippingPlanes,u.state.camera)):u=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Nr(S,N,H,G){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)u.pushLight(S),S.castShadow&&u.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||X.intersectsSprite(S)){G&&Be.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ce);const de=j.update(S),xe=S.material;xe.visible&&m.push(S,de,xe,H,Be.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||X.intersectsObject(S))){const de=j.update(S),xe=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Be.copy(S.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Be.copy(de.boundingSphere.center)),Be.applyMatrix4(S.matrixWorld).applyMatrix4(Ce)),Array.isArray(xe)){const be=de.groups;for(let Pe=0,De=be.length;Pe<De;Pe++){const we=be[Pe],Xe=xe[we.materialIndex];Xe&&Xe.visible&&m.push(S,de,Xe,H,Be.z,we)}}else xe.visible&&m.push(S,de,xe,H,Be.z,null)}}const ie=S.children;for(let de=0,xe=ie.length;de<xe;de++)Nr(ie[de],N,H,G)}function Yo(S,N,H,G){const U=S.opaque,ie=S.transmissive,de=S.transparent;u.setupLightsView(H),te===!0&&ne.setGlobalState(w.clippingPlanes,H),G&&Ae.viewport(T.copy(G)),U.length>0&&Is(U,N,H),ie.length>0&&Is(ie,N,H),de.length>0&&Is(de,N,H),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function jo(S,N,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[G.id]===void 0&&(u.state.transmissionRenderTarget[G.id]=new ri(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?Ls:Tn,minFilter:ti,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const ie=u.state.transmissionRenderTarget[G.id],de=G.viewport||T;ie.setSize(de.z,de.w);const xe=w.getRenderTarget();w.setRenderTarget(ie),w.getClearColor(B),q=w.getClearAlpha(),q<1&&w.setClearColor(16777215,.5),w.clear(),Ve&&Re.render(H);const be=w.toneMapping;w.toneMapping=Fn;const Pe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),u.setupLightsView(G),te===!0&&ne.setGlobalState(w.clippingPlanes,G),Is(S,H,G),R.updateMultisampleRenderTarget(ie),R.updateRenderTargetMipmap(ie),He.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let we=0,Xe=N.length;we<Xe;we++){const tt=N[we],it=tt.object,Rt=tt.geometry,Ye=tt.material,Ee=tt.group;if(Ye.side===_n&&it.layers.test(G.layers)){const cn=Ye.side;Ye.side=Lt,Ye.needsUpdate=!0,Ko(it,H,G,Rt,Ye,Ee),Ye.side=cn,Ye.needsUpdate=!0,De=!0}}De===!0&&(R.updateMultisampleRenderTarget(ie),R.updateRenderTargetMipmap(ie))}w.setRenderTarget(xe),w.setClearColor(B,q),Pe!==void 0&&(G.viewport=Pe),w.toneMapping=be}function Is(S,N,H){const G=N.isScene===!0?N.overrideMaterial:null;for(let U=0,ie=S.length;U<ie;U++){const de=S[U],xe=de.object,be=de.geometry,Pe=G===null?de.material:G,De=de.group;xe.layers.test(H.layers)&&Ko(xe,N,H,be,Pe,De)}}function Ko(S,N,H,G,U,ie){S.onBeforeRender(w,N,H,G,U,ie),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(w,N,H,G,S,ie),U.transparent===!0&&U.side===_n&&U.forceSinglePass===!1?(U.side=Lt,U.needsUpdate=!0,w.renderBufferDirect(H,N,G,U,S,ie),U.side=zn,U.needsUpdate=!0,w.renderBufferDirect(H,N,G,U,S,ie),U.side=_n):w.renderBufferDirect(H,N,G,U,S,ie),S.onAfterRender(w,N,H,G,U,ie)}function Ds(S,N,H){N.isScene!==!0&&(N=lt);const G=Te.get(S),U=u.state.lights,ie=u.state.shadowsArray,de=U.state.version,xe=Se.getParameters(S,U.state,ie,N,H),be=Se.getProgramCacheKey(xe);let Pe=G.programs;G.environment=S.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(S.isMeshStandardMaterial?F:b).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Pe===void 0&&(S.addEventListener("dispose",Ie),Pe=new Map,G.programs=Pe);let De=Pe.get(be);if(De!==void 0){if(G.currentProgram===De&&G.lightsStateVersion===de)return Zo(S,xe),De}else xe.uniforms=Se.getUniforms(S),S.onBeforeCompile(xe,w),De=Se.acquireProgram(xe,be),Pe.set(be,De),G.uniforms=xe.uniforms;const we=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(we.clippingPlanes=ne.uniform),Zo(S,xe),G.needsLights=pd(S),G.lightsStateVersion=de,G.needsLights&&(we.ambientLightColor.value=U.state.ambient,we.lightProbe.value=U.state.probe,we.directionalLights.value=U.state.directional,we.directionalLightShadows.value=U.state.directionalShadow,we.spotLights.value=U.state.spot,we.spotLightShadows.value=U.state.spotShadow,we.rectAreaLights.value=U.state.rectArea,we.ltc_1.value=U.state.rectAreaLTC1,we.ltc_2.value=U.state.rectAreaLTC2,we.pointLights.value=U.state.point,we.pointLightShadows.value=U.state.pointShadow,we.hemisphereLights.value=U.state.hemi,we.directionalShadowMap.value=U.state.directionalShadowMap,we.directionalShadowMatrix.value=U.state.directionalShadowMatrix,we.spotShadowMap.value=U.state.spotShadowMap,we.spotLightMatrix.value=U.state.spotLightMatrix,we.spotLightMap.value=U.state.spotLightMap,we.pointShadowMap.value=U.state.pointShadowMap,we.pointShadowMatrix.value=U.state.pointShadowMatrix),G.currentProgram=De,G.uniformsList=null,De}function Jo(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=gr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Zo(S,N){const H=Te.get(S);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function ud(S,N,H,G,U){N.isScene!==!0&&(N=lt),R.resetTextureUnits();const ie=N.fog,de=G.isMeshStandardMaterial?N.environment:null,xe=C===null?w.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:qi,be=(G.isMeshStandardMaterial?F:b).get(G.envMap||de),Pe=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,De=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),we=!!H.morphAttributes.position,Xe=!!H.morphAttributes.normal,tt=!!H.morphAttributes.color;let it=Fn;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(it=w.toneMapping);const Rt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ye=Rt!==void 0?Rt.length:0,Ee=Te.get(G),cn=u.state.lights;if(te===!0&&(_e===!0||S!==y)){const Bt=S===y&&G.id===M;ne.setState(G,S,Bt)}let je=!1;G.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==cn.state.version||Ee.outputColorSpace!==xe||U.isBatchedMesh&&Ee.batching===!1||!U.isBatchedMesh&&Ee.batching===!0||U.isBatchedMesh&&Ee.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ee.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ee.instancing===!1||!U.isInstancedMesh&&Ee.instancing===!0||U.isSkinnedMesh&&Ee.skinning===!1||!U.isSkinnedMesh&&Ee.skinning===!0||U.isInstancedMesh&&Ee.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ee.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ee.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ee.instancingMorph===!1&&U.morphTexture!==null||Ee.envMap!==be||G.fog===!0&&Ee.fog!==ie||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ne.numPlanes||Ee.numIntersection!==ne.numIntersection)||Ee.vertexAlphas!==Pe||Ee.vertexTangents!==De||Ee.morphTargets!==we||Ee.morphNormals!==Xe||Ee.morphColors!==tt||Ee.toneMapping!==it||Ee.morphTargetsCount!==Ye)&&(je=!0):(je=!0,Ee.__version=G.version);let Wt=Ee.currentProgram;je===!0&&(Wt=Ds(G,N,U));let li=!1,Pt=!1,Ki=!1;const st=Wt.getUniforms(),Qt=Ee.uniforms;if(Ae.useProgram(Wt.program)&&(li=!0,Pt=!0,Ki=!0),G.id!==M&&(M=G.id,Pt=!0),li||y!==S){Ae.buffers.depth.getReversed()?(le.copy(S.projectionMatrix),Eu(le),Tu(le),st.setValue(O,"projectionMatrix",le)):st.setValue(O,"projectionMatrix",S.projectionMatrix),st.setValue(O,"viewMatrix",S.matrixWorldInverse);const An=st.map.cameraPosition;An!==void 0&&An.setValue(O,ke.setFromMatrixPosition(S.matrixWorld)),Ge.logarithmicDepthBuffer&&st.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&st.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Pt=!0,Ki=!0)}if(U.isSkinnedMesh){st.setOptional(O,U,"bindMatrix"),st.setOptional(O,U,"bindMatrixInverse");const Bt=U.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),st.setValue(O,"boneTexture",Bt.boneTexture,R))}U.isBatchedMesh&&(st.setOptional(O,U,"batchingTexture"),st.setValue(O,"batchingTexture",U._matricesTexture,R),st.setOptional(O,U,"batchingIdTexture"),st.setValue(O,"batchingIdTexture",U._indirectTexture,R),st.setOptional(O,U,"batchingColorTexture"),U._colorsTexture!==null&&st.setValue(O,"batchingColorTexture",U._colorsTexture,R));const Ji=H.morphAttributes;if((Ji.position!==void 0||Ji.normal!==void 0||Ji.color!==void 0)&&Le.update(U,H,Wt),(Pt||Ee.receiveShadow!==U.receiveShadow)&&(Ee.receiveShadow=U.receiveShadow,st.setValue(O,"receiveShadow",U.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Qt.envMap.value=be,Qt.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(Qt.envMapIntensity.value=N.environmentIntensity),Pt&&(st.setValue(O,"toneMappingExposure",w.toneMappingExposure),Ee.needsLights&&fd(Qt,Ki),ie&&G.fog===!0&&ce.refreshFogUniforms(Qt,ie),ce.refreshMaterialUniforms(Qt,G,$,Z,u.state.transmissionRenderTarget[S.id]),gr.upload(O,Jo(Ee),Qt,R)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(gr.upload(O,Jo(Ee),Qt,R),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&st.setValue(O,"center",U.center),st.setValue(O,"modelViewMatrix",U.modelViewMatrix),st.setValue(O,"normalMatrix",U.normalMatrix),st.setValue(O,"modelMatrix",U.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Bt=G.uniformsGroups;for(let An=0,Rn=Bt.length;An<Rn;An++){const Qo=Bt[An];I.update(Qo,Wt),I.bind(Qo,Wt)}}return Wt}function fd(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function pd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(S,N,H){Te.get(S.texture).__webglTexture=N,Te.get(S.depthTexture).__webglTexture=H;const G=Te.get(S);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const H=Te.get(S);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,H=0){C=S,E=N,A=H;let G=!0,U=null,ie=!1,de=!1;if(S){const be=Te.get(S);if(be.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(O.FRAMEBUFFER,null),G=!1;else if(be.__webglFramebuffer===void 0)R.setupRenderTarget(S);else if(be.__hasExternalTextures)R.rebindTextures(S,Te.get(S.texture).__webglTexture,Te.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const we=S.depthTexture;if(be.__boundDepthTexture!==we){if(we!==null&&Te.has(we)&&(S.width!==we.image.width||S.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(S)}}const Pe=S.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(de=!0);const De=Te.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(De[N])?U=De[N][H]:U=De[N],ie=!0):S.samples>0&&R.useMultisampledRTT(S)===!1?U=Te.get(S).__webglMultisampledFramebuffer:Array.isArray(De)?U=De[H]:U=De,T.copy(S.viewport),D.copy(S.scissor),L=S.scissorTest}else T.copy(Me).multiplyScalar($).floor(),D.copy(ye).multiplyScalar($).floor(),L=Fe;if(Ae.bindFramebuffer(O.FRAMEBUFFER,U)&&G&&Ae.drawBuffers(S,U),Ae.viewport(T),Ae.scissor(D),Ae.setScissorTest(L),ie){const be=Te.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,be.__webglTexture,H)}else if(de){const be=Te.get(S.texture),Pe=N||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,be.__webglTexture,H||0,Pe)}M=-1},this.readRenderTargetPixels=function(S,N,H,G,U,ie,de){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&de!==void 0&&(xe=xe[de]),xe){Ae.bindFramebuffer(O.FRAMEBUFFER,xe);try{const be=S.texture,Pe=be.format,De=be.type;if(!Ge.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-G&&H>=0&&H<=S.height-U&&O.readPixels(N,H,G,U,Ue.convert(Pe),Ue.convert(De),ie)}finally{const be=C!==null?Te.get(C).__webglFramebuffer:null;Ae.bindFramebuffer(O.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(S,N,H,G,U,ie,de){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Te.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&de!==void 0&&(xe=xe[de]),xe){const be=S.texture,Pe=be.format,De=be.type;if(!Ge.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-G&&H>=0&&H<=S.height-U){Ae.bindFramebuffer(O.FRAMEBUFFER,xe);const we=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,we),O.bufferData(O.PIXEL_PACK_BUFFER,ie.byteLength,O.STREAM_READ),O.readPixels(N,H,G,U,Ue.convert(Pe),Ue.convert(De),0);const Xe=C!==null?Te.get(C).__webglFramebuffer:null;Ae.bindFramebuffer(O.FRAMEBUFFER,Xe);const tt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Su(O,tt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,we),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ie),O.deleteBuffer(we),O.deleteSync(tt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,H=0){S.isTexture!==!0&&(ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const G=Math.pow(2,-H),U=Math.floor(S.image.width*G),ie=Math.floor(S.image.height*G),de=N!==null?N.x:0,xe=N!==null?N.y:0;R.setTexture2D(S,0),O.copyTexSubImage2D(O.TEXTURE_2D,H,0,0,de,xe,U,ie),Ae.unbindTexture()},this.copyTextureToTexture=function(S,N,H=null,G=null,U=0){S.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,S=arguments[1],N=arguments[2],U=arguments[3]||0,H=null);let ie,de,xe,be,Pe,De,we,Xe,tt;const it=S.isCompressedTexture?S.mipmaps[U]:S.image;H!==null?(ie=H.max.x-H.min.x,de=H.max.y-H.min.y,xe=H.isBox3?H.max.z-H.min.z:1,be=H.min.x,Pe=H.min.y,De=H.isBox3?H.min.z:0):(ie=it.width,de=it.height,xe=it.depth||1,be=0,Pe=0,De=0),G!==null?(we=G.x,Xe=G.y,tt=G.z):(we=0,Xe=0,tt=0);const Rt=Ue.convert(N.format),Ye=Ue.convert(N.type);let Ee;N.isData3DTexture?(R.setTexture3D(N,0),Ee=O.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(R.setTexture2DArray(N,0),Ee=O.TEXTURE_2D_ARRAY):(R.setTexture2D(N,0),Ee=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,N.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,N.unpackAlignment);const cn=O.getParameter(O.UNPACK_ROW_LENGTH),je=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Wt=O.getParameter(O.UNPACK_SKIP_PIXELS),li=O.getParameter(O.UNPACK_SKIP_ROWS),Pt=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,it.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,it.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,be),O.pixelStorei(O.UNPACK_SKIP_ROWS,Pe),O.pixelStorei(O.UNPACK_SKIP_IMAGES,De);const Ki=S.isDataArrayTexture||S.isData3DTexture,st=N.isDataArrayTexture||N.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const Qt=Te.get(S),Ji=Te.get(N),Bt=Te.get(Qt.__renderTarget),An=Te.get(Ji.__renderTarget);Ae.bindFramebuffer(O.READ_FRAMEBUFFER,Bt.__webglFramebuffer),Ae.bindFramebuffer(O.DRAW_FRAMEBUFFER,An.__webglFramebuffer);for(let Rn=0;Rn<xe;Rn++)Ki&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Te.get(S).__webglTexture,U,De+Rn),S.isDepthTexture?(st&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Te.get(N).__webglTexture,U,tt+Rn),O.blitFramebuffer(be,Pe,ie,de,we,Xe,ie,de,O.DEPTH_BUFFER_BIT,O.NEAREST)):st?O.copyTexSubImage3D(Ee,U,we,Xe,tt+Rn,be,Pe,ie,de):O.copyTexSubImage2D(Ee,U,we,Xe,tt+Rn,be,Pe,ie,de);Ae.bindFramebuffer(O.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else st?S.isDataTexture||S.isData3DTexture?O.texSubImage3D(Ee,U,we,Xe,tt,ie,de,xe,Rt,Ye,it.data):N.isCompressedArrayTexture?O.compressedTexSubImage3D(Ee,U,we,Xe,tt,ie,de,xe,Rt,it.data):O.texSubImage3D(Ee,U,we,Xe,tt,ie,de,xe,Rt,Ye,it):S.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,U,we,Xe,ie,de,Rt,Ye,it.data):S.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,U,we,Xe,it.width,it.height,Rt,it.data):O.texSubImage2D(O.TEXTURE_2D,U,we,Xe,ie,de,Rt,Ye,it);O.pixelStorei(O.UNPACK_ROW_LENGTH,cn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,je),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Wt),O.pixelStorei(O.UNPACK_SKIP_ROWS,li),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Pt),U===0&&N.generateMipmaps&&O.generateMipmap(Ee),Ae.unbindTexture()},this.copyTextureToTexture3D=function(S,N,H=null,G=null,U=0){return S.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,S=arguments[2],N=arguments[3],U=arguments[4]||0),ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,H,G,U)},this.initRenderTarget=function(S){Te.get(S).__webglFramebuffer===void 0&&R.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?R.setTextureCube(S,0):S.isData3DTexture?R.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?R.setTexture2DArray(S,0):R.setTexture2D(S,0),Ae.unbindTexture()},this.resetState=function(){E=0,A=0,C=null,Ae.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}class xr{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new xr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Fv extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Bv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=go,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Tt=new P;class br{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ze(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ze(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ze(t,this.array),n=Ze(n,this.array),s=Ze(s,this.array),r=Ze(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new br(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class vs extends Yi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Mi;const ss=new P,Si=new P,Ei=new P,Ti=new fe,rs=new fe,Uh=new ot,nr=new P,as=new P,ir=new P,ec=new fe,ua=new fe,tc=new fe;class Ai extends vt{constructor(e=new vs){if(super(),this.isSprite=!0,this.type="Sprite",Mi===void 0){Mi=new an;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Bv(t,5);Mi.setIndex([0,1,2,0,2,3]),Mi.setAttribute("position",new br(n,3,0,!1)),Mi.setAttribute("uv",new br(n,2,3,!1))}this.geometry=Mi,this.material=e,this.center=new fe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Si.setFromMatrixScale(this.matrixWorld),Uh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ei.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Si.multiplyScalar(-Ei.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;sr(nr.set(-.5,-.5,0),Ei,a,Si,s,r),sr(as.set(.5,-.5,0),Ei,a,Si,s,r),sr(ir.set(.5,.5,0),Ei,a,Si,s,r),ec.set(0,0),ua.set(1,0),tc.set(1,1);let o=e.ray.intersectTriangle(nr,as,ir,!1,ss);if(o===null&&(sr(as.set(-.5,.5,0),Ei,a,Si,s,r),ua.set(0,1),o=e.ray.intersectTriangle(nr,ir,as,!1,ss),o===null))return;const l=e.ray.origin.distanceTo(ss);l<e.near||l>e.far||t.push({distance:l,point:ss.clone(),uv:$t.getInterpolation(ss,nr,as,ir,ec,ua,tc,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function sr(i,e,t,n,s,r){Ti.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(rs.x=r*Ti.x-s*Ti.y,rs.y=s*Ti.x+r*Ti.y):rs.copy(Ti),i.copy(e),i.x+=rs.x,i.y+=rs.y,i.applyMatrix4(Uh)}class nc extends Et{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class on{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const d=n[s],p=n[s+1]-d,f=(a-d)/p;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new fe:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new P,s=[],r=[],a=[],o=new P,l=new ot;for(let f=0;f<=e;f++){const v=f/e;s[f]=this.getTangentAt(v,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),h=Math.abs(s[0].y),p=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(yt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,v))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(yt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let v=1;v<=e;v++)r[v].applyMatrix4(l.makeRotationAxis(s[v],f*v)),a[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Fo extends on{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*d-f*h+this.aX,c=p*h+f*d+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class zv extends Fo{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Bo(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,d,h){let p=(a-r)/c-(o-r)/(c+d)+(o-a)/d,f=(o-a)/d-(l-a)/(d+h)+(l-o)/h;p*=d,f*=d,s(a,o,p,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const rr=new P,fa=new Bo,pa=new Bo,ma=new Bo;class Hv extends on{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,d;this.closed||o>0?c=s[(o-1)%r]:(rr.subVectors(s[0],s[1]).add(s[0]),c=rr);const h=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?d=s[(o+2)%r]:(rr.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=rr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(d),f);g<1e-4&&(g=1),v<1e-4&&(v=g),m<1e-4&&(m=g),fa.initNonuniformCatmullRom(c.x,h.x,p.x,d.x,v,g,m),pa.initNonuniformCatmullRom(c.y,h.y,p.y,d.y,v,g,m),ma.initNonuniformCatmullRom(c.z,h.z,p.z,d.z,v,g,m)}else this.curveType==="catmullrom"&&(fa.initCatmullRom(c.x,h.x,p.x,d.x,this.tension),pa.initCatmullRom(c.y,h.y,p.y,d.y,this.tension),ma.initCatmullRom(c.z,h.z,p.z,d.z,this.tension));return n.set(fa.calc(l),pa.calc(l),ma.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ic(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Gv(i,e){const t=1-i;return t*t*e}function $v(i,e){return 2*(1-i)*i*e}function Vv(i,e){return i*i*e}function bs(i,e,t,n){return Gv(i,e)+$v(i,t)+Vv(i,n)}function Wv(i,e){const t=1-i;return t*t*t*e}function qv(i,e){const t=1-i;return 3*t*t*i*e}function Xv(i,e){return 3*(1-i)*i*i*e}function Yv(i,e){return i*i*i*e}function ws(i,e,t,n,s){return Wv(i,e)+qv(i,t)+Xv(i,n)+Yv(i,s)}class Oh extends on{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,s.x,r.x,a.x,o.x),ws(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class jv extends on{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ws(e,s.x,r.x,a.x,o.x),ws(e,s.y,r.y,a.y,o.y),ws(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fh extends on{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kv extends on{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bh extends on{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(bs(e,s.x,r.x,a.x),bs(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jv extends on{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(bs(e,s.x,r.x,a.x),bs(e,s.y,r.y,a.y),bs(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zh extends on{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],d=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(ic(o,l.x,c.x,d.x,h.x),ic(o,l.y,c.y,d.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new fe().fromArray(s))}return this}}var sc=Object.freeze({__proto__:null,ArcCurve:zv,CatmullRomCurve3:Hv,CubicBezierCurve:Oh,CubicBezierCurve3:jv,EllipseCurve:Fo,LineCurve:Fh,LineCurve3:Kv,QuadraticBezierCurve:Bh,QuadraticBezierCurve3:Jv,SplineCurve:zh});class Zv extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new sc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const d=l[c];n&&n.equals(d)||(t.push(d),n=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new sc[s.type]().fromJSON(s))}return this}}class Qv extends Zv{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Fh(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Bh(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Oh(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new zh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new Fo(e,t,n,s,r,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zo extends an{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=yt(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],d=1/t,h=new P,p=new fe,f=new P,v=new P,g=new P;let m=0,u=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,u=e[x+1].y-e[x].y,f.x=u*1,f.y=-m,f.z=u*0,g.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(g.x,g.y,g.z);break;default:m=e[x+1].x-e[x].x,u=e[x+1].y-e[x].y,f.x=u*1,f.y=-m,f.z=u*0,v.copy(f),f.x+=g.x,f.y+=g.y,f.z+=g.z,f.normalize(),l.push(f.x,f.y,f.z),g.copy(v)}for(let x=0;x<=t;x++){const _=n+x*d*s,w=Math.sin(_),k=Math.cos(_);for(let E=0;E<=e.length-1;E++){h.x=e[E].x*w,h.y=e[E].y,h.z=e[E].x*k,a.push(h.x,h.y,h.z),p.x=x/t,p.y=E/(e.length-1),o.push(p.x,p.y);const A=l[3*E+0]*w,C=l[3*E+1],M=l[3*E+0]*k;c.push(A,C,M)}}for(let x=0;x<t;x++)for(let _=0;_<e.length-1;_++){const w=_+x*e.length,k=w,E=w+e.length,A=w+e.length+1,C=w+1;r.push(k,E,C),r.push(A,C,E)}this.setIndex(r),this.setAttribute("position",new Ot(a,3)),this.setAttribute("uv",new Ot(o,2)),this.setAttribute("normal",new Ot(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.points,e.segments,e.phiStart,e.phiLength)}}class Ho extends zo{constructor(e=1,t=1,n=4,s=8){const r=new Qv;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new Ho(e.radius,e.length,e.capSegments,e.radialSegments)}}class wr extends an{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],h=[],p=[],f=[];let v=0;const g=[],m=n/2;let u=0;x(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(d),this.setAttribute("position",new Ot(h,3)),this.setAttribute("normal",new Ot(p,3)),this.setAttribute("uv",new Ot(f,2));function x(){const w=new P,k=new P;let E=0;const A=(t-e)/n;for(let C=0;C<=r;C++){const M=[],y=C/r,T=y*(t-e)+e;for(let D=0;D<=s;D++){const L=D/s,B=L*l+o,q=Math.sin(B),z=Math.cos(B);k.x=T*q,k.y=-y*n+m,k.z=T*z,h.push(k.x,k.y,k.z),w.set(q,A,z).normalize(),p.push(w.x,w.y,w.z),f.push(L,1-y),M.push(v++)}g.push(M)}for(let C=0;C<s;C++)for(let M=0;M<r;M++){const y=g[M][C],T=g[M+1][C],D=g[M+1][C+1],L=g[M][C+1];(e>0||M!==0)&&(d.push(y,T,L),E+=3),(t>0||M!==r-1)&&(d.push(T,D,L),E+=3)}c.addGroup(u,E,0),u+=E}function _(w){const k=v,E=new fe,A=new P;let C=0;const M=w===!0?e:t,y=w===!0?1:-1;for(let D=1;D<=s;D++)h.push(0,m*y,0),p.push(0,y,0),f.push(.5,.5),v++;const T=v;for(let D=0;D<=s;D++){const B=D/s*l+o,q=Math.cos(B),z=Math.sin(B);A.x=M*z,A.y=m*y,A.z=M*q,h.push(A.x,A.y,A.z),p.push(0,y,0),E.x=q*.5+.5,E.y=z*.5*y+.5,f.push(E.x,E.y),v++}for(let D=0;D<s;D++){const L=k+D,B=T+D;w===!0?d.push(B,B+1,L):d.push(B+1,B,L),C+=3}c.addGroup(u,C,w===!0?1:2),u+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mn extends Yi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vh,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const rc={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class e0{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,p=c.length;h<p;h+=2){const f=c[h],v=c[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return v}return null}}}const t0=new e0;class Go{constructor(e){this.manager=e!==void 0?e:t0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Go.DEFAULT_MATERIAL_NAME="__DEFAULT";class n0 extends Go{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=rc.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Cs("img");function l(){d(),rc.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){d(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class ac extends Go{constructor(e){super(e)}load(e,t,n,s){const r=new Et,a=new n0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class kr extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class i0 extends kr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ga=new ot,oc=new P,lc=new P;class Hh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new No,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;oc.setFromMatrixPosition(e.matrixWorld),t.position.copy(oc),lc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lc),t.updateMatrixWorld(),ga.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const cc=new ot,os=new P,va=new P;class s0 extends Hh{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new fe(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),os.setFromMatrixPosition(e.matrixWorld),n.position.copy(os),va.copy(n.position),va.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(va),n.updateMatrixWorld(),s.makeTranslation(-os.x,-os.y,-os.z),cc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cc)}}class r0 extends kr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new s0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class a0 extends Hh{constructor(){super(new Uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class o0 extends kr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new a0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class l0 extends kr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class c0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=hc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=hc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function hc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ao}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ao);const ls={url:new URL(""+new URL("tiny-dungeon-BMWnvaym.png",import.meta.url).href,import.meta.url).href,cols:12,rows:11},dc={fighter:{col:0,row:8},cleric:{col:2,row:7},wizard:{col:0,row:7},rogue:{col:4,row:9},alchemist:{col:4,row:7}},Gh={"rat-swarm":{col:3,row:10},skeleton:{col:4,row:10},"goblin-gang":{col:1,row:7},gelatinous:{col:0,row:9},wraith:{col:1,row:10},"dragon-whelp":{col:2,row:9},"ogre-king":{col:1,row:9},"bone-warden":{col:4,row:10},"grave-mites":{col:2,row:10},"barrow-shade":{col:1,row:10},"hungry-ghoul":{col:1,row:9},"shrouded-king":{col:3,row:9},"abbot-of-worms":{col:1,row:10},salamander:{col:2,row:9},"cinder-bats":{col:0,row:10},"magma-toad":{col:0,row:9},"obsidian-golem":{col:4,row:10},"cinder-wyrm":{col:2,row:9},"forge-tyrant":{col:1,row:9},"flying-tomes":{col:0,row:10},"ink-elemental":{col:0,row:9},"spectral-scribe":{col:1,row:10},"index-wight":{col:3,row:9},archivist:{col:3,row:9},"grand-errata":{col:4,row:10},"sludge-elemental":{col:0,row:9},"potion-rats":{col:3,row:10},"mutant-vine":{col:2,row:10},"failed-homunculus":{col:1,row:9},"mad-alchemist":{col:3,row:9},"the-precipitate":{col:0,row:9},"castle-thrall":{col:1,row:7},"bat-cloud":{col:0,row:10},"pale-hound":{col:4,row:10},"crimson-mist":{col:1,row:10},"vampire-lord":{col:3,row:9},"the-bride":{col:3,row:8},"jar-imp":{col:2,row:9},"pickled-thing":{col:0,row:9},"root-golem":{col:4,row:10},"bog-toad":{col:0,row:9},"bog-witch":{col:4,row:8},"the-cauldron":{col:1,row:9},"frost-wisp":{col:1,row:10},"ice-crawler":{col:2,row:10},"thawed-dead":{col:1,row:7},"cinder-imp":{col:2,row:9},"mad-pyromancer":{col:0,row:7},"glacier-heart":{col:4,row:10}},h0={col:1,row:9},Ri={treasure:{col:5,row:7},"treasure-open":{col:7,row:7},vault:{col:6,row:7},mimic:{col:8,row:7},trap:{col:4,row:3},library:{col:5,row:5},shrine:{col:4,row:2},lab:{col:8,row:3},materials:{col:6,row:5},entrance:{col:10,row:3}},d0={pillars:{col:6,row:0},rubble:{col:0,row:1},crates:{col:1,row:6},brazier:{col:5,row:2},pit:{col:9,row:0},boulder:{col:6,row:8},sarcophagus:{col:6,row:4},font:{col:8,row:2},spout:{col:8,row:1},portcullis:{col:5,row:3},anvil:{col:2,row:6},shelves:{col:3,row:6},mirror:{col:5,row:8}};function u0(i){return d0[i]||null}const f0={slash:{col:2,row:5}};function p0(i){for(const[e,t]of Object.entries(i))Gh[e]=t}function m0(i){return dc[i]||dc.fighter}function g0(i){return Gh[i]||h0}function uc(i){return i.type==="treasure"?i.cleared?Ri["treasure-open"]:Ri.treasure:i.type==="vault"?i.cleared?Ri["treasure-open"]:Ri.vault:Ri[i.type]?Ri[i.type]:null}const $h={pillars:{id:"pillars",name:"a row of squat pillars",icon:"🏛️",tile:{col:6,row:0},rooms:["monster","boss","corridor","library","shrine"],weight:3,tags:["cover"],cover:1,tell:"Pillars break the room into aisles — something to fight behind."},rubble:{id:"rubble",name:"a fall of rubble",icon:"🪨",tile:{col:0,row:1},rooms:["monster","corridor","disaster","trap","materials"],weight:3,tags:["cover","materials"],cover:1,tell:"Half the ceiling is on the floor, in pieces worth stepping around."},crates:{id:"crates",name:"stacked crates and barrels",icon:"📦",tile:{col:1,row:6},rooms:["treasure","materials","corridor","monster","lab"],weight:2.5,tags:["cover","loot"],cover:1,tell:"Somebody stacked supplies here and never came back for them."},brazier:{id:"brazier",name:"a brazier still burning",icon:"🔥",tile:{col:5,row:2},rooms:["monster","boss","shrine","library","lab"],weight:2.5,tags:["fire","light"],tell:"A brazier burns in its bracket — nobody has been here to feed it, and it burns anyway."},pit:{id:"pit",name:"an open pit",icon:"🕳️",tile:{col:9,row:0},rooms:["monster","boss","trap","corridor","disaster"],weight:2,tags:["hazard"],tell:"A pit takes up a third of the floor. The bottom is not visible."},boulder:{id:"boulder",name:"a boulder on a bad slope",icon:"⚪",tile:{col:6,row:8},rooms:["monster","corridor","disaster","materials"],weight:1.5,tags:["hazard"],tell:"A boulder sits at the top of a slope, held by a wedge of rotten timber."},sarcophagus:{id:"sarcophagus",name:"a stone sarcophagus",icon:"⚰️",tile:{col:6,row:4},rooms:["monster","shrine","treasure","vault","boss"],weight:2,tags:["undead","loot"],undeadRisk:!0,tell:"A sarcophagus stands against the wall with its lid slightly wrong."},font:{id:"font",name:"a stone font of still water",icon:"⛲",tile:{col:8,row:2},rooms:["shrine","monster","corridor","library"],weight:2,tags:["water"],douse:!0,tell:"A font holds water that has been still a long time and is somehow clean."},spout:{id:"spout",name:"a gargoyle spout, dripping",icon:"🗿",tile:{col:8,row:1},rooms:["lab","materials","corridor","monster"],weight:1.8,tags:["alchemy"],tell:"A gargoyle spout drips something that is not water into a stained channel."},portcullis:{id:"portcullis",name:"a raised portcullis",icon:"🚧",tile:{col:5,row:3},rooms:["monster","boss","corridor","vault"],weight:1.8,tags:["mechanism"],tell:"A portcullis hangs raised above the passage, on a chain that still turns."},anvil:{id:"anvil",name:"a cold anvil",icon:"🔨",tile:{col:2,row:6},rooms:["lab","materials","corridor","monster"],weight:1.5,tags:["forge"],tell:"An anvil sits under a dead forge, still true."},shelves:{id:"shelves",name:"sagging shelves",icon:"📚",tile:{col:3,row:6},rooms:["library","lab","vault","monster"],weight:2,tags:["study","flammable"],tell:"Shelves sag under books nobody has audited in a century."},spikes:{id:"spikes",name:"a bed of rusted floor spikes",icon:"🔻",rooms:["monster","boss","trap","corridor"],weight:2,tags:["hazard","sharp"],tell:"A bed of rusted spikes stands out of the floor, most of them still upright."},chasm:{id:"chasm",name:"a crack across the floor",icon:"🌑",rooms:["monster","boss","disaster","corridor"],weight:1.4,tags:["hazard","deep"],tell:"A crack runs the width of the room, wide enough to matter and too wide to jump twice."},mirror:{id:"mirror",name:"a tall silvered mirror",icon:"🪞",tile:{col:5,row:8},rooms:["monster","boss","treasure","shrine"],weight:1.2,tags:["reveal"],revealEthereal:!0,tell:"A silvered mirror leans against the wall, and it shows the room more honestly than the room does."}},ai={"shove-into-pit":{feature:"pit",name:"Shove It In",desc:"Put the pit between you and it",gates:[{cls:W.FIGHTER},{tactic:"tac-shove"},{item:"eq-grapple"}],fightOnly:!0,openerDamage:11,tool:{openerDamage:18},weights:{reckless:3,brave:2,cunning:2}},"shove-onto-spikes":{feature:"spikes",name:"Put It On the Spikes",desc:"The floor is already armed",gates:[{cls:W.FIGHTER},{tactic:"tac-shove"},{item:"eq-tower-shield"}],fightOnly:!0,openerDamage:12,tool:{openerDamage:19},weights:{reckless:3,brave:2,cunning:1.5}},"shove-into-chasm":{feature:"chasm",name:"Put It In the Crack",desc:"The floor already opened once",gates:[{cls:W.FIGHTER},{tactic:"tac-shove"},{item:"eq-grapple"}],fightOnly:!0,openerDamage:13,tool:{openerDamage:21},weights:{reckless:3,cunning:2,craven:1.5}},"topple-boulder":{feature:"boulder",name:"Topple the Boulder",desc:"Gravity does the first round",gates:[{cls:W.FIGHTER},{spell:"sp-shatter"}],fightOnly:!0,openerDamage:5,tool:{openerDamage:13},weights:{reckless:3,brave:1.5}},"shove-into-brazier":{feature:"brazier",name:"Shove It Into the Fire",desc:"The brazier is right there",gates:[{cls:W.FIGHTER},{tactic:"tac-shove"},{item:"eq-tinderbox"},{spell:"sp-kindle"}],fightOnly:!0,openerDamage:10,element:"fire",tool:{openerDamage:16},weights:{reckless:2.5,cunning:1}},"drop-portcullis":{feature:"portcullis",name:"Drop the Portcullis",desc:"Cut the room in half on top of it",gates:[{cls:W.ROGUE},{item:"eq-winch-hook"}],fightOnly:!0,openerDamage:6,tool:{openerDamage:14},weights:{cunning:3,craven:2,scholarly:1}},"fight-from-cover":{feature:"pillars",name:"Fight From the Pillars",desc:"Make it come to you, one aisle at a time",gates:[{cls:W.ROGUE},{cls:W.FIGHTER},{item:"eq-tower-shield"}],fightOnly:!0,openerDamage:3,extraCover:1,tool:{openerDamage:4,extraCover:3},weights:{cunning:2,craven:2.5,brave:-1}},"pry-sarcophagus":{feature:"sarcophagus",name:"Pry the Lid",desc:"Grave goods, and whatever else",gates:[{item:"eq-prybar"},{cls:W.ROGUE}],gold:20,wakesDead:!0,tool:{gold:55,quiet:!0},weights:{greedy:3.5,reckless:2,pious:-3}},"bless-the-font":{feature:"font",name:"Bless the Font",desc:"Clean water, said over",gates:[{cls:W.CLERIC},{spell:"sp-purify"}],heal:5,tool:{heal:12},weights:{pious:3.5,scholarly:1}},"fill-waterskins":{feature:"font",name:"Fill the Waterskins",desc:"Cold water, and a wash for the wounds",gates:[{item:"eq-waterskin"}],heal:3,curesLinger:!0,weights:{cunning:2,craven:1.5}},"harvest-spout":{feature:"spout",name:"Harvest the Drip",desc:"Whatever that is, it is a reagent",gates:[{cls:W.ALCHEMIST},{item:"eq-waterskin"}],materials:1,tool:{materials:3},weights:{greedy:2,scholarly:2}},"sift-rubble":{feature:"rubble",name:"Sift the Rubble",desc:"Salts and oddments in the broken stone",gates:[{cls:W.ALCHEMIST},{item:"eq-prybar"}],materials:1,gold:5,tool:{materials:2,gold:25},weights:{greedy:2.5,scholarly:1}},"crack-crates":{feature:"crates",name:"Crack the Crates",desc:"Somebody else's supplies",gates:[{item:"eq-prybar"},{cls:W.ROGUE}],gold:12,materials:1,tool:{gold:40,materials:2},weights:{greedy:3.5,reckless:1}},"work-the-anvil":{feature:"anvil",name:"Work the Anvil",desc:"Put an edge back on something",gates:[{item:"eq-smiths-kit"}],weaponMod:{name:"anvil-set edge",attack:3},weights:{brave:2,cunning:1.5,scholarly:1}},"strip-the-shelves":{feature:"shelves",name:"Strip the Shelves",desc:"A working, if the damp left one",gates:[{cls:W.WIZARD},{item:"eq-grimoire"}],spell:{name:"Shelf-Found Working",icon:"📜",school:"found",power:3,use:"combat"},tool:{spell:{name:"Shelf-Found Working",icon:"📜",school:"found",power:5,use:"combat"},extraSpell:!0},weights:{scholarly:3.5,greedy:1}}};function v0(i){const e=(i.w||4)*(i.h||4);return e<18?0:e<32?1:e<56?2:e<90?3:e<140?4:5}function fc(i,e,t=null){const n=v0(i);if(n===0)return[];const s=Object.values($h).filter(a=>a.rooms.includes(i.type));if(s.length===0)return[];const r=[];for(let a=0;a<n;a++){if(e.next()<.32)continue;const o=s.filter(d=>!r.includes(d.id));if(o.length===0)break;const l=o.reduce((d,h)=>d+h.weight,0);let c=e.next()*l;for(const d of o)if(c-=d.weight,c<=0){r.push(d.id);break}}return r}function Ir(i){return $h[i]||null}function $o(i){return((i==null?void 0:i.features)||[]).map(Ir).filter(Boolean)}function y0(i){const e={cover:0,douse:!1,revealEthereal:!1,undeadRisk:!1,notes:[]};for(const t of $o(i))t.cover&&(e.cover+=t.cover,e.notes.push({feature:t.id,text:`🧱 The party fights from behind ${t.name}: ${t.cover} less damage per round.`})),t.douse&&(e.douse=!0),t.revealEthereal&&(e.revealEthereal=!0,e.notes.push({feature:t.id,text:`🪞 ${M0(t.name)} shows the ethereal where it truly stands: weapons do full damage.`})),t.undeadRisk&&(e.undeadRisk=!0);return e.cover=Math.min(e.cover,2),e}function _o(i,e,t){var n;return i.cls?e.hasClass(i.cls):i.item?t.item(i.item):i.spell?t.spell(i.spell):i.tactic?!!((n=t.tactic)!=null&&n.call(t,i.tactic)):!1}function _0(i,e,t){const n=new Set((i==null?void 0:i.features)||[]),s=(i==null?void 0:i.type)==="monster"||(i==null?void 0:i.type)==="boss",r=[];for(const[a,o]of Object.entries(ai)){if(!n.has(o.feature)||o.fightOnly&&!s||!o.gates.some(c=>_o(c,e,t)))continue;const l=o.gates.find(c=>_o(c,e,t));r.push({id:a,name:o.name,desc:o.desc,feature:o.feature,opener:l.item||l.spell||l.cls})}return r}function x0(i,e,t){const n=ai[i];if(!n)return null;const s=n.gates.some(r=>(r.item||r.spell)&&_o(r,e,t));return s&&n.tool?{...n,...n.tool,tier:"tool"}:{...n,tier:s?"tool":"class"}}function b0(i){var e;return((e=ai[i])==null?void 0:e.weights)||null}function w0(i){return Object.prototype.hasOwnProperty.call(ai,i)}function M0(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}const Mr=1,S0=1.8;function jt(i){return{hx:(i.w||4)*Mr/2,hz:(i.h||4)*Mr/2}}function Vo(i){const{hx:e,hz:t}=jt(i);return e>=t?{axis:"x",far:e,wide:t}:{axis:"z",far:t,wide:e}}function pc(i,e=0,t=0){const{axis:n,far:s}=Vo(i),r=Math.max(.8,s*.45);return n==="x"?{mx:e+r,mz:t}:{mx:e,mz:t+r}}const E0={column:1,line:2,shieldwall:2,wedge:3,loose:2};function T0(i,e,t,n,s,r="line"){const{axis:a,far:o,wide:l}=Vo(i),c=s?-Math.max(.7,o*.42):-Math.max(.2,o*.12),d=Math.min(n,E0[r]??2),h=r==="loose"?1.6:r==="shieldwall"?.7:1,p=Math.min(1.25,Math.max(.75,l*.45))*h,f=Math.min(1.3,Math.max(.8,l*.7))*h,v=[];for(let g=0;g<n;g++){const m=g<d?0:1,u=m===0?g:g-d,x=m===0?d:n-d,_=(u-(x-1)/2)*f,w=c+m*-p;v.push(a==="x"?{mx:e+w,mz:t+_}:{mx:e+_,mz:t+w})}return v}function A0(i,e){if(e===0)return[[-i/2,i/2]];const t=S0/2,n=[];return-i/2<-t&&n.push([-i/2,-t]),t<i/2&&n.push([t,i/2]),n}function R0(i,e=0,t=0,n=0){if(n<=0)return[];const{hx:s,hz:r}=jt(i),{axis:a}=Vo(i),o=.9,l=Math.max(.6,(a==="x"?r:s)-o),c=Math.max(.6,(a==="x"?s:r)-o),d=a==="x"?(p,f)=>({mx:e+c*p,mz:t+l*f}):(p,f)=>({mx:e+l*f,mz:t+c*p}),h=[d(-.15,-1),d(-.15,1),d(-.85,-.95),d(-.85,.95),d(.5,-1),d(.5,1),d(.9,-.5),d(.9,.5)];return h.slice(0,Math.min(n,h.length))}function C0(i,e,t=()=>!1){const n=new Map,s=(r,a,o)=>{n.has(r)||n.set(r,[]),n.get(r).push({side:a,secret:o})};for(const r of e){if(r.kind==="trapdoor")continue;const a=i[r.a],o=i[r.b];if(!a||!o||t(a)||t(o))continue;const l=o.x-a.x,c=o.y-a.y;Math.abs(l)>=Math.abs(c)?(s(r.a,l>0?"east":"west",r.secret),s(r.b,l>0?"west":"east",r.secret)):(s(r.a,c>0?"south":"north",r.secret),s(r.b,c>0?"north":"south",r.secret))}return n}const ya=7,ar=26,cs=1.15,mc=.28,gc=1.7,L0=7,vc={fighter:13126716,cleric:15258762,wizard:8018664,rogue:4885084,alchemist:3979432},Vh={delve:{plat:6380370,wall:3486252,bg:657413,boss:5908006},crypt:{plat:5130838,wall:2894387,bg:460297,boss:4860490},volcanic:{plat:6045752,wall:3350812,bg:853251,boss:8006170},library:{plat:4147800,wall:2305080,bg:263947,boss:2767450},madlab:{plat:4479050,wall:2372906,bg:264196,boss:2775610},castle:{plat:4078158,wall:2104620,bg:328713,boss:5904938},bogcellar:{plat:4868660,wall:2763292,bg:395011,boss:4872730},icecaverns:{plat:4872806,wall:2766400,bg:263945,boss:3824234},athanor:{plat:5917240,wall:3352860,bg:657155,boss:6965786}},P0=Vh.delve,yc={armored:"🛡️",ethereal:"👻",venomous:"🐍",swarm:"🐝",slow:"🐌"},_c={fire:"🔥",frost:"❄️",shock:"⚡",holy:"🌟"},xc={fire:"#ff8a3c",frost:"#7ec8ff",shock:"#ffe95e",holy:"#ffe9a0"},k0={fight:{kind:"slash"},"spell-strike":{kind:"glow",color:"#ff8a3c"},"turn-undead":{kind:"glow",color:"#ffe9a0"},"deep-study":{kind:"glow",color:"#b07ae8"},"spell-bypass":{kind:"glow",color:"#b07ae8"},rest:{kind:"glow",color:"#ffe9a0"},alchemy:{kind:"glow",color:"#3cb8a8"},disarm:{kind:"glow",color:"#8fb8dd"},"push-through":{kind:"glow",color:"#e05555"},brace:{kind:"glow",color:"#e05555"},scatter:{kind:"glow",color:"#e05555"},loot:{kind:"glow",color:"#ffd75e"},desecrate:{kind:"glow",color:"#ffd75e"}};class I0{constructor(e){this.canvas=document.getElementById(e),this.renderer=new Ov({canvas:this.canvas,antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=sh,this.scene=new Fv,this.scene.background=new ze(657413),this.scene.fog=new xr(657413,34,78),this.scene.add(new l0(11187408,1.1)),this.scene.add(new i0(9083578,3813416,.9));const t=new o0(11189213,1.3);t.position.set(-10,20,6),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-30,t.shadow.camera.right=30,t.shadow.camera.top=30,t.shadow.camera.bottom=-30,this.scene.add(t),this.torch=new r0(16751164,30,12,1.8),this.torch.position.set(0,2.2,0),this.scene.add(this.torch),this.staticGroup=new xn,this.iconGroup=new xn,this.occupantGroup=new xn,this.partyGroup=new xn,this.fxGroup=new xn,this.scene.add(this.staticGroup,this.iconGroup,this.occupantGroup,this.partyGroup,this.fxGroup),this.spriteMaterials=new Map,this.builtKey=null,this.roomPositions=[],this.clock=new c0,this.effects=[],this.tileMats=new Map,this.atlasReady=!1,this.atlasTex=new ac().load(ls.url,()=>{this.atlasReady=!0,this.lastState&&this.render(this.lastState)}),this.atlasTex.magFilter=Ut,this.atlasTex.minFilter=Ut,this.atlasTex.colorSpace=Mt,this.meepleGeo=new Ho(.16,.26,4,10),this.meepleMats={};for(const[s,r]of Object.entries(vc))this.meepleMats[s]=new mn({color:r,roughness:.6});this.baseGeo=new wr(.24,.28,.07,16),this.baseMats={};for(const[s,r]of Object.entries(vc))this.baseMats[s]=new mn({color:r,roughness:.7});this.disposed=!1;const n=()=>{this.disposed||(requestAnimationFrame(n),this.animateFrame())};n(),typeof window<"u"&&(window.__iso=this)}render(e){var a;this.lastState=e;const t=e.dungeon.rooms;this.resize(t);const n=((a=e.dungeon.theme)==null?void 0:a.id)||"delve",s=n+"|"+t.map(o=>`${o.type}${o.w}x${o.h}${o.shape}${o.secret&&!o.discovered?"?":""}`).join(",");this.builtKey!==s&&(this.buildDungeon(t,e.dungeon.edges,n,e.dungeon.trapdoors||[]),this.builtKey=s),this.updateIcons(e),this.updateOccupants(e),this.updateParty(e);const r=e.currentRoomIndex??Math.min(e.roomIndex,t.length-1);this.focusOn(t[r]),this.animateFrame()}tileMaterial(e){const t=`${e.col},${e.row}`;if(!this.tileMats.has(t)){const n=this.atlasTex.clone();n.needsUpdate=!0,n.repeat.set(1/ls.cols,1/ls.rows),n.offset.set(e.col/ls.cols,1-(e.row+1)/ls.rows),this.tileMats.set(t,new vs({map:n,transparent:!0}))}return this.tileMats.get(t)}imageMaterial(e){const t=`img:${e}`;if(!this.tileMats.has(t)){const n=new ac().load(e,()=>{this.lastState&&this.render(this.lastState)});n.colorSpace=Mt,this.tileMats.set(t,new vs({map:n,transparent:!0}))}return this.tileMats.get(t)}tileSprite(e,t=1){var s;if(e.img){const r=this.imageMaterial(e.img),a=new Ai(r),o=(s=r.map)==null?void 0:s.image,l=o&&o.width?o.width/o.height:1;return a.scale.set(t*Math.min(l,1.4),t,1),a}const n=new Ai(this.tileMaterial(e));return n.scale.set(t,t,1),n}updateOccupants(e){if(this.occupantGroup.clear(),!this.atlasReady)return;const t=e.dungeon.rooms,n=this.knownSet(e);t.forEach((s,r)=>{if(s.secret&&!s.discovered)return;const{x:a,y:o,z:l}=this.roomPositions[r];if(!(n.has(r)||s.type==="boss"))return;let d=null;if((s.type==="monster"||s.type==="boss")&&s.monster&&!s.cleared){const f=s.type==="boss"?1.7:1.05,{mx:v,mz:g}=pc(s,a,l);d=this.tileSprite(g0(s.monster.kind),f),d.position.set(v,o+.2+f/2,g),d.userData.sway=!0;const m=[];yc[s.monster.trait]&&m.push(yc[s.monster.trait]);const u=s.monster.undead?"holy":(s.monster.weak||[])[0];_c[u]&&m.push(_c[u]),m.forEach((x,_)=>{const w=new Ai(this.getSpriteMaterial(x));w.scale.set(.42,.42,1),w.position.set(v-.25+_*.5,o+.35+f,g),w.userData.baseY=o+.35+f,w.userData.phase=r*1.3+_,w.userData.sway=!0,this.occupantGroup.add(w)})}else{const f=uc(s);if(f){const{mx:v,mz:g}=pc(s,a,l);d=this.tileSprite(f,.95),d.position.set(v,o+.66,g),s.cleared&&(d.material=d.material.clone(),d.material.opacity=.55)}}d&&(d.userData.baseY=d.position.y,d.userData.phase=r*2.3,this.occupantGroup.add(d));const h=s.features||[],p=R0(s,a,l,h.length);h.forEach((f,v)=>{var x;const g=u0(f),m=p[v];if(!m)return;const u=g?this.tileSprite(g,.8):this.emojiSprite(((x=Ir(f))==null?void 0:x.icon)||"❔",.7);u.position.set(m.mx,o+.58,m.mz),u.userData.baseY=o+.58,u.userData.phase=r*1.1+v,f==="brazier"&&(u.userData.sway=!0),this.occupantGroup.add(u)})})}emojiSprite(e,t=.8){const n=new Ai(this.getSpriteMaterial(e));return n.scale.set(t,t,1),n}roomWorldPos(e){return{x:e.x*Mr,y:-(e.floor||0)*L0,z:e.y*Mr}}bounds(e){let t=1/0,n=-1/0,s=1/0,r=-1/0;for(const a of e){const{x:o,z:l}=this.roomWorldPos(a),{hx:c,hz:d}=jt(a);t=Math.min(t,o-c),n=Math.max(n,o+c),s=Math.min(s,l-d),r=Math.max(r,l+d)}return{minX:t,maxX:n,minZ:s,maxZ:r,cx:(t+n)/2,cz:(s+r)/2}}resize(e){const t=this.canvas.clientWidth||500,n=this.canvas.clientHeight||420;if(this.lastW===t&&this.lastH===n&&this.camera)return;this.lastW=t,this.lastH=n,this.renderer.setSize(t,n,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));const s=t/n,r=ya;this.camera=new Uo(-r*s,r*s,r,-r,.1,400),this.camera.position.set(ar,ar*1.05,ar),this.camera.lookAt(0,0,0),this.camTarget=new P(0,0,0)}focusOn(e){if(!e||!this.camera)return;const{x:t,y:n,z:s}=this.roomWorldPos(e),{hx:r,hz:a}=jt(e),o=Math.max(0,Math.max(r,a)+2.2-ya);this.camTarget||(this.camTarget=new P(t,n,s)),this.camTarget.set(t,n,s),this.camZoom=o}buildDungeon(e,t=null,n="delve",s=[]){this.staticGroup.clear(),this.roomPositions=e.map(h=>this.roomWorldPos(h));const r=Vh[n]||P0;this.palette=r,this.scene.background=new ze(r.bg),this.scene.fog=new xr(r.bg,34,78);const a=h=>h.secret&&!h.discovered,o=t||e.slice(1).map((h,p)=>({a:p,b:p+1,kind:"door"})),l=C0(e,o,a),c=new mn({color:r.wall,roughness:1}),d=new mn({color:r.wall,roughness:1});e.forEach((h,p)=>{if(a(h))return;const{x:f,y:v,z:g}=this.roomPositions[p],{hx:m,hz:u}=jt(h),x=m*2,_=u*2,w=(h.index*7%5-2)*.02,k=h.type==="boss"?r.boss:h.type==="vault"?6969904:r.plat,E=new ze(k);E.offsetHSL(0,0,w);const A=new mn({color:E,roughness:.95});let C;if(h.shape==="rotunda"?C=new ft(new wr(Math.min(m,u),Math.min(m,u)*1.02,.35,24),A):C=new ft(new Nt(x,.35,_),A),C.position.set(f,v,g),C.receiveShadow=!0,this.staticGroup.add(C),h.shape==="cavern")for(const[M,y]of[[-1,-1],[1,-1],[-1,1],[1,1]]){if((h.index+M+y)%2!==0)continue;const T=new ft(new Nt(x*.22,.5,_*.22),new mn({color:r.wall,roughness:1}));T.position.set(f+M*(m-x*.1),v+.16,g+y*(u-_*.1)),T.rotation.y=h.index%4*.2,T.castShadow=!0,this.staticGroup.add(T)}if(h.shape!=="rotunda"){const M=[{name:"north",axis:"x",len:x,off:-u},{name:"south",axis:"x",len:x,off:u},{name:"west",axis:"z",len:_,off:-m},{name:"east",axis:"z",len:_,off:m}],y=l.get(p)||[];for(const T of M){const D=y.filter(B=>B.side===T.name),L=A0(T.len,D.length);for(const[B,q]of L){const z=q-B;if(z<=.05)continue;const Z=D.some(ae=>ae.secret)?d:c,$=T.axis==="x"?new ft(new Nt(z,cs,mc),Z):new ft(new Nt(mc,cs,z),Z),ee=(B+q)/2;T.axis==="x"?$.position.set(f+ee,v+cs/2,g+T.off):$.position.set(f+T.off,v+cs/2,g+ee),$.castShadow=!0,this.staticGroup.add($)}}}});for(const h of o){if(h.kind==="trapdoor"||h.kind==="stair")continue;const p=e[h.a],f=e[h.b];if(!p||!f||a(p)||a(f))continue;const v=this.roomPositions[h.a],g=this.roomPositions[h.b],m=jt(p),u=jt(f),x=g.x-v.x,_=g.z-v.z,w=new mn({color:h.secret?2762272:4012595,roughness:1});let k;if(Math.abs(x)>=Math.abs(_)){const E=Math.abs(x)-m.hx-u.hx;if(E<=.05)continue;k=new ft(new Nt(E+.4,.2,gc),w),k.position.set(v.x+Math.sign(x)*(m.hx+E/2),v.y-.02,v.z)}else{const E=Math.abs(_)-m.hz-u.hz;if(E<=.05)continue;k=new ft(new Nt(gc,.2,E+.4),w),k.position.set(v.x,v.y-.02,v.z+Math.sign(_)*(m.hz+E/2))}k.receiveShadow=!0,this.staticGroup.add(k)}for(const h of o){if(h.kind!=="stair")continue;const p=e[h.a],f=e[h.b];if(!p||!f||a(p)||a(f))continue;const v=this.roomPositions[h.a],g=this.roomPositions[h.b],m=v.y-g.y;if(m<=0)continue;const u=6,x=new mn({color:3486251,roughness:1}),_=jt(p);for(let w=0;w<u;w++){const k=(w+.5)/u,E=new ft(new Nt(1.6,.3,1.1),x);E.position.set(v.x+(g.x-v.x)*k*.35-_.hx*.2,v.y-m*k,v.z+(g.z-v.z)*k*.35+_.hz*.25),E.receiveShadow=!0,this.staticGroup.add(E)}}for(const h of s){const p=e[h.from];if(!p||a(p))continue;const{x:f,y:v,z:g}=this.roomPositions[h.from],{hx:m,hz:u}=jt(p),x=new ft(new Nt(1.5,.42,1.5),new mn({color:h.secret?3025444:460298,roughness:1}));x.position.set(f+m*.45,v+.01,g-u*.45),this.staticGroup.add(x)}}getSpriteMaterial(e){if(!this.spriteMaterials.has(e)){const t=document.createElement("canvas");t.width=128,t.height=128;const n=t.getContext("2d");n.font="92px serif",n.textAlign="center",n.textBaseline="middle",n.fillText(e,64,70);const s=new nc(t);s.colorSpace=Mt,this.spriteMaterials.set(e,new vs({map:s,transparent:!0}))}return this.spriteMaterials.get(e)}knownSet(e){return new Set(e.knownIdxs||e.dungeon.rooms.map((t,n)=>n).filter(t=>t<=e.roomIndex+1))}updateIcons(e){this.iconGroup.clear();const t=e.dungeon.rooms,n=this.knownSet(e),s=e.currentRoomIndex??e.roomIndex;t.forEach((r,a)=>{if(r.secret&&!r.discovered)return;const{x:o,y:l,z:c}=this.roomPositions[a],d=n.has(a)||r.type==="boss",h=d?r.icon:"❓";if(d&&this.atlasReady&&((r.type==="monster"||r.type==="boss")&&r.monster&&!r.cleared||uc(r)))return;const p=new Ai(this.getSpriteMaterial(h)),f=r.type==="boss"?1.5:1;p.scale.set(f,f,1);const v=l+cs+.6;p.position.set(o,v,c),p.material=p.material.clone(),p.material.opacity=r.cleared&&a!==s?.28:1,p.userData.baseY=v,p.userData.phase=a,this.iconGroup.add(p)})}updateParty(e){var p;this.partyGroup.clear();const t=e.currentRoomIndex??Math.min(e.roomIndex,e.dungeon.rooms.length-1),{x:n,y:s,z:r}=this.roomPositions[t]||{x:0,y:0,z:0},a=e.dungeon.rooms[t],o=a?Math.max(jt(a).hx,jt(a).hz):4;this.torch.position.set(n,s+2.4,r),this.torch.distance=Math.max(12,o*3.4),this.torchBase=24+o*2.2;const l=a&&a.monster&&!a.cleared&&(a.type==="monster"||a.type==="boss"),c=e.party.members.filter(f=>f.alive).slice().sort((f,v)=>(f.class==="fighter"?-1:0)-(v.class==="fighter"?-1:0)),d=c.length,h=a?T0(a,n,r,d,l,((p=e==null?void 0:e.party)==null?void 0:p.formation)||"line"):c.map(()=>({mx:n,mz:r}));c.forEach((f,v)=>{const{mx:g,mz:m}=h[v],u=f.health/f.maxHealth<=.35;if(this.atlasReady){const x=this.tileSprite(m0(f.class),.82);x.position.set(g,s+.72,m),x.userData.baseY=s+.72,x.userData.phase=v*1.7,u&&(x.material=x.material.clone(),x.material.color.set(12157056),x.scale.y=.68),this.partyGroup.add(x);const _=new ft(this.baseGeo,this.baseMats[f.class]||this.baseMats.fighter);_.position.set(g,s+.24,m),_.castShadow=!0,this.partyGroup.add(_)}else{const x=new ft(this.meepleGeo,this.meepleMats[f.class]||this.meepleMats.fighter);x.position.set(g,s+.55,m),x.castShadow=!0,x.userData.baseY=s+.55,x.userData.phase=v*1.7,this.partyGroup.add(x)}})}playEffect(e,t,n=null){const s=k0[e];if(!s||!this.roomPositions[t])return;const{x:r,y:a,z:o}=this.roomPositions[t],l=e==="spell-strike"&&xc[n]?xc[n]:s.color;let c;s.kind==="slash"&&this.atlasReady?(c=this.tileSprite(f0.slash,1.1),c.material=c.material.clone()):(c=new Ai(this.glowMaterial(l||"#ffffff").clone()),c.scale.set(1.1,1.1,1)),c.position.set(r,a+1,o),this.fxGroup.add(c),this.effects.push({sprite:c,born:this.clock.getElapsedTime(),life:.7})}glowMaterial(e){const t=`glow:${e}`;if(!this.spriteMaterials.has(t)){const n=document.createElement("canvas");n.width=128,n.height=128;const s=n.getContext("2d"),r=s.createRadialGradient(64,64,6,64,64,62);r.addColorStop(0,e),r.addColorStop(.45,e+"aa"),r.addColorStop(1,e+"00"),s.fillStyle=r,s.fillRect(0,0,128,128);const a=new nc(n);a.colorSpace=Mt,this.spriteMaterials.set(t,new vs({map:a,transparent:!0,blending:Ca,depthWrite:!1}))}return this.spriteMaterials.get(t)}animateFrame(){if(!this.camera)return;const e=this.clock.getElapsedTime();if(this.camTarget){const n=ar+(this.camZoom||0)*2,s=new P(this.camTarget.x+n,this.camTarget.y+n*1.05,this.camTarget.z+n),r=this.camPlaced?.12:1;this.camPlaced=!0,this.camera.position.lerp(s,r),this.camLook||(this.camLook=this.camTarget.clone()),this.camLook.lerp(this.camTarget,r),this.camera.lookAt(this.camLook);const a=ya+(this.camZoom||0),o=(this.lastW||500)/(this.lastH||420);this.camera.top=a,this.camera.bottom=-a,this.camera.left=-a*o,this.camera.right=a*o,this.camera.updateProjectionMatrix()}const t=this.torchBase||26;this.torch.intensity=t+Math.sin(e*9)*3+Math.sin(e*23)*2;for(const n of this.iconGroup.children)n.position.y=n.userData.baseY+Math.sin(e*1.6+n.userData.phase)*.06;for(const n of this.partyGroup.children)n.userData.baseY!==void 0&&(n.position.y=n.userData.baseY+Math.abs(Math.sin(e*2.2+n.userData.phase))*.05);for(const n of this.occupantGroup.children)n.userData.sway&&(n.position.y=n.userData.baseY+Math.sin(e*2.8+n.userData.phase)*.07);for(let n=this.effects.length-1;n>=0;n--){const s=this.effects[n],r=(e-s.born)/s.life;if(r>=1){this.fxGroup.remove(s.sprite),this.effects.splice(n,1);continue}const a=.9+r*1.6;s.sprite.scale.set(a,a,1),s.sprite.material.opacity=1-r*r}this.renderer.render(this.scene,this.camera)}dispose(){this.disposed=!0,this.renderer.dispose()}}const D0=["weapon","armor","focus","tool","boots","trinket"];function rt(i){return String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const or="background:#14110b;border:1px solid #3a2f1e;border-radius:6px;padding:0.8rem;",hs="color:#887755;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;";function Wh(i,e,{onChange:t=()=>{},onDone:n=null,doneLabel:s="Done"}={}){const r=()=>{t(),Wh(i,e,{onChange:t,onDone:n,doneLabel:s})};i.innerHTML="";const a=document.createElement("div");a.innerHTML=`
    <h2 style="color:#d8a53f;font-size:1.3rem;margin-bottom:0.3rem;text-align:center;">🎒 The Muster</h2>
    <div style="text-align:center;color:#887755;margin-bottom:0.9rem;font-size:0.85rem;">
      Who carries what, who prepares which working, and who they are.
    </div>`,i.appendChild(a);const o=[...e.members];for(const h of o){const p=document.createElement("div");p.className="outfit-member",p.style.cssText=`${or}margin-bottom:0.7rem;`;const f=new Map(h.equipment.map(g=>[g.slot||"trinket",g])),v=D0.map(g=>{const m=f.get(g);return`
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;padding:0.15rem 0;">
          <span style="${hs}width:3.6rem;flex:none;">${g}</span>
          <span style="flex:1;color:${m?"#e8d9b3":"#4a443a"};">
            ${m?`${rt(m.icon||"")} ${rt(m.name)}`:"—"}
          </span>
          ${m?`<button class="outfit-off" data-card="${rt(m.id)}"
                 style="font-size:0.68rem;padding:0.15rem 0.4rem;background:#26200f;color:#c8b88a;">take off</button>`:""}
        </div>`}).join("");p.innerHTML=`
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
        <span style="font-size:1.2rem;">${rt(h.icon)}</span>
        <input class="outfit-name" data-uid="${rt(h.uid)}" value="${rt(h.name)}"
          maxlength="40" aria-label="Name"
          style="flex:1;background:#0f0d09;color:#e8d9b3;border:1px solid #3a2f1e;border-radius:4px;padding:0.3rem 0.45rem;font-family:inherit;font-size:0.92rem;" />
        <span style="color:#887755;font-size:0.78rem;">${rt(h.class)}</span>
        <span style="color:#887755;font-size:0.75rem;">❤️${h.health}/${h.effectiveMax()} ⚔️${h.attack} 🛡️${h.defense} 🧠${h.mind}</span>
      </div>
      <div style="display:flex;gap:0.9rem;flex-wrap:wrap;">
        <div style="flex:1;min-width:190px;">${v}</div>
        <div style="flex:1;min-width:190px;">
          <div style="${hs}margin-bottom:0.25rem;">Who they are</div>
          <textarea class="outfit-story" data-uid="${rt(h.uid)}" rows="3" maxlength="400"
            placeholder="${rt(h.trait||"Write their history, or leave it to the dungeon.")}"
            style="width:100%;background:#0f0d09;color:#c8b88a;border:1px solid #3a2f1e;border-radius:4px;padding:0.35rem;font-family:inherit;font-size:0.76rem;resize:vertical;">${rt(h.backstory)}</textarea>
        </div>
      </div>`,i.appendChild(p)}const l=document.createElement("div");l.style.cssText=`${or}margin-bottom:0.7rem;`;const c=o.map(h=>`<option value="${rt(h.name)}">${rt(h.icon)} ${rt(h.name)}</option>`).join("");l.innerHTML=`
    <div style="${hs}margin-bottom:0.4rem;">🎒 In the pack — nobody is carrying these</div>
    ${e.pack.length===0?`<div style="color:#4a443a;font-size:0.8rem;">Nothing. Every piece is in somebody's hands.</div>`:e.pack.map(h=>`
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
          <span style="flex:1;color:#e8d9b3;">${rt(h.icon||"")} ${rt(h.name)}
            <span style="color:#887755;">· ${rt(h.slot||"trinket")}</span></span>
          <select class="outfit-give" data-card="${rt(h.id)}"
            style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
            <option value="">give to…</option>${c}
          </select>
        </div>`).join("")}`,i.appendChild(l);const d=document.createElement("div");if(d.style.cssText=`${or}margin-bottom:0.7rem;`,d.innerHTML=`
    <div style="${hs}margin-bottom:0.4rem;">📖 The grimoire — a working is only as good as the mind that prepared it</div>
    ${e.grimoire.length===0?'<div style="color:#4a443a;font-size:0.8rem;">No workings drafted.</div>':e.grimoire.map(h=>{const p=e.casterOf(h),f=h.power+Math.floor(e.mindFor(h)/2);return`
          <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
            <span style="flex:1;color:#e8d9b3;">${rt(h.icon||"")} ${rt(h.name)}
              <span style="color:#887755;">· power ${f}</span></span>
            <select class="outfit-caster" data-spell="${rt(h.id)}"
              style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
              <option value="">whoever is sharpest</option>
              ${o.map(v=>`<option value="${rt(v.name)}"${p&&p.uid===v.uid?" selected":""}>${rt(v.icon)} ${rt(v.name)} (🧠${v.mind})</option>`).join("")}
            </select>
          </div>`}).join("")}`,i.appendChild(d),e.tactics.length>0){const h=document.createElement("div");h.style.cssText=`${or}margin-bottom:0.7rem;`,h.innerHTML=`
      <div style="${hs}margin-bottom:0.4rem;">🎓 Drills — trained together, carried by everyone</div>
      <div style="font-size:0.8rem;color:#e8d9b3;">
        ${e.tactics.map(p=>{var f;return`${rt(((f=Ms(p.id))==null?void 0:f.icon)||"")} ${rt(p.name)}`}).join(" · ")}
      </div>`,i.appendChild(h)}if(i.querySelectorAll(".outfit-off").forEach(h=>{h.addEventListener("click",()=>{e.unequip(h.dataset.card),r()})}),i.querySelectorAll(".outfit-give").forEach(h=>{h.addEventListener("change",()=>{h.value&&(e.equipTo(h.dataset.card,h.value),r())})}),i.querySelectorAll(".outfit-caster").forEach(h=>{h.addEventListener("change",()=>{e.assignCaster(h.dataset.spell,h.value||null),r()})}),i.querySelectorAll(".outfit-name").forEach(h=>{h.addEventListener("change",()=>{const p=e.members.find(f=>f.uid===h.dataset.uid);p&&e.renameMember(p,h.value),r()})}),i.querySelectorAll(".outfit-story").forEach(h=>{h.addEventListener("change",()=>{const p=e.members.find(f=>f.uid===h.dataset.uid);p&&p.setBackstory(h.value),t()})}),n){const h=document.createElement("button");h.id="outfit-done-btn",h.textContent=s,h.style.cssText="width:100%;margin-top:0.5rem;padding:0.9rem;font-size:1rem;",h.addEventListener("click",n),i.appendChild(h)}}const qh={"rat-swarm":{trait:"swarm",weak:["fire"]},gelatinous:{trait:"armored",weak:["frost"],resist:["shock"]},wraith:{trait:"ethereal"},"ogre-king":{trait:"armored"},"dragon-whelp":{resist:["fire"],weak:["frost"]},"bone-warden":{trait:"armored"},"grave-mites":{trait:"swarm",weak:["fire"]},"barrow-shade":{trait:"ethereal"},"hungry-ghoul":{trait:"venomous"},"shrouded-king":{trait:"armored"},"abbot-of-worms":{trait:"venomous"},salamander:{resist:["fire"],weak:["frost"]},"cinder-bats":{trait:"swarm",resist:["fire"],weak:["frost"]},"magma-toad":{resist:["fire"],weak:["frost"]},"obsidian-golem":{trait:"armored",resist:["shock"]},"cinder-wyrm":{resist:["fire"],weak:["frost"]},"forge-tyrant":{trait:"armored",resist:["fire"]},"flying-tomes":{trait:"swarm",weak:["fire"]},"ink-elemental":{weak:["fire"],resist:["shock"]},"spectral-scribe":{trait:"ethereal"},"index-wight":{weak:["fire"]},archivist:{trait:"ethereal"},"grand-errata":{trait:"armored",weak:["fire"]},"sludge-elemental":{trait:"venomous",resist:["shock"]},"potion-rats":{trait:"swarm"},"mutant-vine":{trait:"armored",weak:["fire"]},"mad-alchemist":{trait:"venomous"},"the-precipitate":{trait:"armored",resist:["fire","frost"]},"bat-cloud":{trait:"swarm"},"pale-hound":{trait:"venomous"},"crimson-mist":{trait:"ethereal"},"vampire-lord":{trait:"ethereal"},"the-bride":{trait:"ethereal"},"jar-imp":{trait:"swarm",resist:["fire"]},"pickled-thing":{trait:"venomous"},"root-golem":{trait:"armored",weak:["fire"]},"bog-toad":{trait:"venomous"},"the-cauldron":{trait:"armored",resist:["fire"]},"frost-wisp":{trait:"ethereal",resist:["frost"],weak:["fire"]},"ice-crawler":{trait:"swarm",weak:["fire"]},"thawed-dead":{trait:"venomous"},"cinder-imp":{resist:["fire"],weak:["frost"]},"mad-pyromancer":{resist:["fire"],weak:["frost"]},"glacier-heart":{trait:"armored",resist:["frost"],weak:["fire"]}};function N0(i){Object.assign(qh,i)}function xo(i){const e=qh[i.kind];return e?{...i,...e}:i}function ys(i,e){const t=i==null?void 0:i.element;return t?t==="holy"&&e.undead||(e.weak||[]).includes(t)?1.5:(e.resist||[]).includes(t)?.5:1:1}const pe={ENTRANCE:"entrance",CORRIDOR:"corridor",MONSTER:"monster",TRAP:"trap",TREASURE:"treasure",LIBRARY:"library",SHRINE:"shrine",LAB:"lab",MATERIALS:"materials",DISASTER:"disaster",BOSS:"boss",VAULT:"vault",STAIRS:"stairs"},_a={min:3,max:4},U0=3,bc={crypt:{id:"crypt",name:"the burial wing",tell:"burial niches, most of them open",body:["monster","trap","shrine"],payoff:"treasure"},works:{id:"works",name:"the workshop wing",tell:"cold furnaces and racked glassware",body:["materials","lab","trap"],payoff:"materials"},archive:{id:"archive",name:"the archive wing",tell:"shelving stacked to the ceiling, half of it collapsed",body:["library","trap","monster"],payoff:"library"},barracks:{id:"barracks",name:"the barracks wing",tell:"bunkrooms and a picked-over weapon rack",body:["monster","monster","corridor"],payoff:"treasure"},sump:{id:"sump",name:"the flooded wing",tell:"a floor that slopes down into standing water",body:["disaster","monster","trap"],payoff:"treasure"}},Sr={entrance:[{shape:"chamber",min:[7,7],max:[9,9]},{shape:"hall",min:[10,6],max:[12,6]}],corridor:[{shape:"passage",min:[7,2],max:[12,3]},{shape:"hall",min:[9,4],max:[12,5]}],monster:[{shape:"chamber",min:[8,8],max:[11,11]},{shape:"cavern",min:[11,8],max:[15,12]},{shape:"hall",min:[12,6],max:[16,8]}],trap:[{shape:"passage",min:[8,3],max:[12,4]},{shape:"chamber",min:[8,6],max:[10,8]}],treasure:[{shape:"cell",min:[5,5],max:[7,7]},{shape:"chamber",min:[8,7],max:[10,9]}],library:[{shape:"hall",min:[12,7],max:[16,8]},{shape:"chamber",min:[9,9],max:[12,12]}],shrine:[{shape:"rotunda",min:[9,9],max:[12,12]},{shape:"chamber",min:[8,8],max:[10,10]}],lab:[{shape:"chamber",min:[9,8],max:[12,10]},{shape:"hall",min:[12,6],max:[14,7]}],materials:[{shape:"cavern",min:[9,8],max:[13,10]},{shape:"cell",min:[6,5],max:[7,7]}],disaster:[{shape:"cavern",min:[12,9],max:[16,13]},{shape:"hall",min:[13,6],max:[16,8]}],boss:[{shape:"cavern",min:[17,14],max:[22,17]},{shape:"hall",min:[20,12],max:[24,14]}],vault:[{shape:"cell",min:[6,6],max:[8,8]}],stairs:[{shape:"cell",min:[6,6],max:[8,8]},{shape:"rotunda",min:[7,7],max:[9,9]}]};function O0(i,e){const t=Sr[i]||Sr.corridor,n=t[Math.floor(e.next()*t.length)];let s=n.min[0]+Math.floor(e.next()*(n.max[0]-n.min[0]+1)),r=n.min[1]+Math.floor(e.next()*(n.max[1]-n.min[1]+1));return e.next()<.5&&([s,r]=[r,s]),{w:s,h:r,shape:n.shape}}const Xh={entrance:"🚪",corridor:"⬛",monster:"👹",trap:"⚠️",treasure:"💰",library:"📚",shrine:"🕯️",lab:"⚗️",materials:"🌿",disaster:"🌋",boss:"🐉",vault:"💎",stairs:"🪜"},wc={easy:{monster:2,trap:1,treasure:2,library:1,shrine:1.5,lab:1,materials:2,disaster:.5,corridor:1},medium:{monster:3,trap:1.5,treasure:2,library:1,shrine:1,lab:1,materials:1.5,disaster:1,corridor:1},hard:{monster:4,trap:2.5,treasure:1.5,library:1,shrine:.7,lab:1,materials:1,disaster:2,corridor:.5},nightmare:{monster:5,trap:3,treasure:1.5,library:.8,shrine:.5,lab:1,materials:1,disaster:3,corridor:.3}};function F0(i,e){const t=Object.entries(e),n=t.reduce((r,[,a])=>r+a,0);let s=i.next()*n;for(const[r,a]of t)if(s-=a,s<=0)return r;return t[0][0]}class Yh{constructor(e,t,n=null,s={}){this.rooms=e,this.theme=t,this.condition=n,this.spine=s.spine||e.map((r,a)=>a),this.edges=s.edges||e.slice(1).map((r,a)=>({a,b:a+1,secret:!1,kind:"door"})),this.branches=s.branches||[],this.trapdoors=s.trapdoors||[]}getRoom(e){return this.rooms[e]||null}get length(){return this.rooms.length}branchAt(e){return this.branches.find(t=>t.junction===e&&!t.consumed)||null}trapdoorAt(e){return this.trapdoors.find(t=>t.from===e&&!t.consumed)||null}}function B0(i,e,t=2){return Math.abs(i.x-e.x)*2<i.w+e.w+t&&Math.abs(i.y-e.y)*2<i.h+e.h+t}const Mc=[[1,0],[-1,0],[0,1],[0,-1]];function Sc(i,e,t,n,s=null){const r=s?[s,...n.shuffle(Mc)]:n.shuffle(Mc),a=t.filter(o=>(o.floor||0)===(i.floor||0));for(const o of r)for(const l of[2,3,5]){const[c,d]=o;if(i.x=e.x+c*((e.w+i.w)/2+l),i.y=e.y+d*((e.h+i.h)/2+l),!a.some(h=>B0(i,h)))return o}return null}function z0(i,e,t){const n=i.map(l=>l.x),s=i.map(l=>l.y),r=Math.max(...n)-Math.min(...n),a=Math.max(...s)-Math.min(...s);return Math.abs(r-a)>8?r>a?[0,1]:[1,0]:t&&e.next()<.4?t:e.next()<.5?[1,0]:[0,1]}function H0(i,e="medium",t={}){const n=new As(i),s=Math.max(1,t.depth||1),r=oi[t.theme]||n.pick(Object.values(oi)),a=typeof t.condition=="object"&&t.condition?t.condition:Sn(t.condition),o={...wc[e]||wc.medium};for(const[E,A]of Object.entries(r.weightTweaks))o[E]=Math.max(.1,(o[E]||0)+A);for(const[E,A]of Object.entries(a.weightTweaks||{}))o[E]=Math.max(.1,(o[E]||0)+A);const l=$0[e]||1,c=Math.min(U0,2+(s>=3?1:0)),d=E=>l*(1+E*.18),h=[];h.push(Ci(0,pe.ENTRANCE,n,r,s,l,a)),h[0].floor=0;for(let E=0;E<c;E++){const A=_a.min+Math.floor(n.next()*(_a.max-_a.min+1));for(let C=0;C<A;C++){const M=F0(n,o),y=Ci(h.length,M,n,r,s,d(E),a);y.floor=E,h.push(y)}if(E<c-1){const C=Ci(h.length,pe.STAIRS,n,r,s,d(E),a);C.floor=E,C.descendsTo=E+1,h.push(C)}}lr(h,pe.LIBRARY,n,r,s,d,a,o,r.minLibraries||1),lr(h,pe.SHRINE,n,r,s,d,a,o),(t.wantLab||r.alwaysLab)&&(lr(h,pe.LAB,n,r,s,d,a,o),lr(h,pe.MATERIALS,n,r,s,d,a,o,1));const p=Ci(h.length,pe.BOSS,n,r,s,d(c-1),a);p.floor=c-1,h.push(p),h[0].x=0,h[0].y=0;const f=[h[0]];let v=[1,0];for(let E=1;E<h.length;E++){const A=h[E],C=h[E-1];if(A.floor!==C.floor){A.x=C.x,A.y=C.y,f.push(A),v=[1,0];continue}v=z0(f.filter(y=>y.floor===A.floor),n,v);const M=Sc(A,C,f,n,v);M&&(v=M),f.push(A)}const g=h.map((E,A)=>A),m=h.slice(1).map((E,A)=>({a:A,b:A+1,secret:!1,kind:h[A].floor!==h[A+1].floor?"stair":"door"})),u=[];for(const E of h)E.features=fc(E,n,r);const x=1+Math.floor(n.next()*2),_=Object.keys(bc);for(let E=0;E<x;E++){const A=1+Math.floor(n.next()*(g.length-2)),C=bc[_[Math.floor(n.next()*_.length)]],M=n.next()<.5,y=2+Math.floor(n.next()*3),T=[];let D=h[A],L=A,B=null;const q=h[A].floor||0;for(let z=0;z<y;z++){const $=z===y-1?M?pe.VAULT:C.payoff:C.body[Math.floor(n.next()*C.body.length)],ee=Ci(h.length,$,n,r,s,d(q),a);ee.floor=q;const ae=Sc(ee,D,f,n,B);if(!ae)break;B=ae,ee.secret=M,ee.discovered=!M,ee.wing=C.id,ee.features=fc(ee,n,r),h.push(ee),f.push(ee),m.push({a:L,b:ee.index,secret:M&&z===0,kind:M&&z===0?"secret":"arch"}),T.push(ee.index),L=ee.index,D=ee}T.length>0&&u.push({junction:A,rooms:T,secret:M,consumed:!1,wing:C.id,name:C.name,tell:C.tell})}const w=[],k=n.next()<.65?1:0;for(let E=0;E<k;E++){const A=g.length-1,C=1+Math.floor(n.next()*Math.max(1,Math.floor(A*.6))),M=h[C].floor||0,y=h.findIndex((D,L)=>L>C&&L<=A-1&&(D.floor||0)>M),T=y>C+1?y+Math.floor(n.next()*2):Math.min(C+2+Math.floor(n.next()*3),A-1);T<=C+1||T>A-1||(w.push({from:C,to:T,secret:n.next()<.5,fall:3+Math.floor(n.next()*3)+(s-1),consumed:!1}),m.push({a:C,b:T,secret:!1,kind:"trapdoor"}))}return new Yh(h,r,a,{spine:g,edges:m,branches:u,trapdoors:w})}const G0=new Set([pe.ENTRANCE,pe.BOSS,pe.STAIRS,pe.LIBRARY,pe.SHRINE,pe.LAB,pe.MATERIALS]);function lr(i,e,t,n,s,r,a,o,l=1){const c=i.filter(h=>h.type===e).length;let d=l-c;for(;d>0;){const h=i.filter(u=>!G0.has(u.type));if(h.length===0)break;let p=null,f=-1;for(const u of new Set(h.map(x=>x.type))){const x=h.filter(_=>_.type===u).length/Math.max(.1,(o==null?void 0:o[u])||.1);x>f&&(f=x,p=u)}const v=h.filter(u=>u.type===p),g=t.pick(v),m=Ci(g.index,e,t,n,s,r(g.floor||0),a);m.floor=g.floor,i[i.indexOf(g)]=m,d--}}function Ci(i,e,t,n,s=1,r=1,a={}){const o=O0(e,t),l={index:i,type:e,icon:Xh[e]||"⬛",cleared:!1,w:o.w,h:o.h,shape:o.shape};if(e===pe.MONSTER&&(l.monster=Ec(t,!1,n,s,r,a)),e===pe.BOSS&&(l.monster=Ec(t,!0,n,s,r,a)),e===pe.TREASURE){const c=(20+Math.floor(t.next()*40))*(1+.2*(s-1));l.gold=Math.round(c*(a.goldMult||1)),l.mimicChance=.18}if(e===pe.VAULT){const c=(60+Math.floor(t.next()*120))*(1+.2*(s-1));l.gold=Math.round(c*(a.goldMult||1)),l.mimicChance=.28}if(e===pe.TRAP){l.trapDamage=4+Math.floor(t.next()*4)+(n.trapBonus||0)+(s-1)+(a.trapBonus||0);const c=n.trapTypes||["spike"];l.trapType=c[Math.floor(t.next()*c.length)]}return e===pe.MATERIALS&&(l.materials=1+Math.floor(t.next()*2)),l}const oi={delve:{id:"delve",name:"the Old Delve",icon:"⛏️",tagline:"A classic hole in the ground, wronged by generations of management.",weightTweaks:{},trapTypes:["spike","alarm"],monsters:[{kind:"rat-swarm",name:"a chittering rat swarm",icon:"🐀",attack:4,health:10,undead:!1},{kind:"skeleton",name:"a rattling skeleton patrol",icon:"💀",attack:6,health:14,undead:!0},{kind:"goblin-gang",name:"a goblin toll-gang",icon:"👺",attack:5,health:12,undead:!1,bribable:!0},{kind:"gelatinous",name:"a gelatinous horror",icon:"🟩",attack:5,health:18,undead:!1,slow:!0},{kind:"wraith",name:"a cold-eyed wraith",icon:"👻",attack:8,health:12,undead:!0}],bosses:[{kind:"dragon-whelp",name:"the Dragon Whelp of the Deep Vault",icon:"🐉",attack:12,health:34,undead:!1},{kind:"ogre-king",name:"the Ogre King Under the Stair",icon:"👹",attack:14,health:38,undead:!1,bribable:!0}]},crypt:{id:"crypt",name:"the Ancient Crypt",icon:"⚰️",tagline:"The dead were buried with their grudges. Both kept.",weightTweaks:{monster:1,shrine:.5,treasure:-.5},trapTypes:["spike","poison"],monsters:[{kind:"bone-warden",name:"a bone warden on its rounds",icon:"💀",attack:6,health:15,undead:!0},{kind:"grave-mites",name:"a boil of grave mites",icon:"🪲",attack:4,health:9,undead:!1},{kind:"barrow-shade",name:"a barrow shade, thin as smoke",icon:"👻",attack:8,health:11,undead:!0},{kind:"hungry-ghoul",name:"a ghoul between meals",icon:"🧟",attack:7,health:13,undead:!0}],bosses:[{kind:"shrouded-king",name:"the Shrouded King in his broken throne-niche",icon:"👑",attack:12,health:32,undead:!0},{kind:"abbot-of-worms",name:"the Abbot of Worms, still preaching",icon:"☠️",attack:10,health:36,undead:!0}]},volcanic:{id:"volcanic",name:"the Cinder Galleries",icon:"🌋",tagline:"The mountain is not dormant. The mountain is patient.",weightTweaks:{disaster:1,trap:.5,shrine:-.3},trapBonus:2,trapTypes:["fire","spike"],monsters:[{kind:"salamander",name:"a salamander the size of a mistake",icon:"🦎",attack:7,health:14,undead:!1},{kind:"cinder-bats",name:"a shriek of cinder bats",icon:"🦇",attack:5,health:9,undead:!1},{kind:"magma-toad",name:"a magma toad, gently steaming",icon:"🐸",attack:6,health:16,undead:!1,slow:!0},{kind:"obsidian-golem",name:"an obsidian golem with a slow fuse",icon:"🗿",attack:8,health:20,undead:!1,slow:!0}],bosses:[{kind:"cinder-wyrm",name:"the Cinder Wyrm coiled in its forge-nest",icon:"🐉",attack:13,health:36,undead:!1},{kind:"forge-tyrant",name:"the Forge Tyrant, hammer still warm",icon:"🔨",attack:14,health:34,undead:!1,bribable:!0}]},library:{id:"library",name:"the Drowned Athenaeum",icon:"📚",tagline:"Knowledge wants to be free. It has been waiting a long time.",weightTweaks:{library:2,monster:-.5,materials:-.5},minLibraries:2,trapTypes:["alarm","spike"],monsters:[{kind:"flying-tomes",name:"a wheeling flock of flying tomes",icon:"📖",attack:5,health:10,undead:!1},{kind:"ink-elemental",name:"an ink elemental, still wet",icon:"🫧",attack:6,health:13,undead:!1},{kind:"spectral-scribe",name:"a spectral scribe mid-citation",icon:"👻",attack:7,health:12,undead:!0},{kind:"index-wight",name:"the wight of a disappointed librarian",icon:"🧟",attack:8,health:14,undead:!0}],bosses:[{kind:"archivist",name:"the Archivist, quill dripping",icon:"🪶",attack:11,health:33,undead:!0},{kind:"grand-errata",name:"the Grand Errata, a book that reads back",icon:"📕",attack:12,health:35,undead:!1}]},madlab:{id:"madlab",name:"the Mad Alchemist's Dungeon",icon:"⚗️",tagline:"The experiments continued after the funding stopped. And after the alchemist did.",weightTweaks:{lab:1.5,materials:1,disaster:.5,shrine:-.5},alwaysLab:!0,trapTypes:["poison","fire"],monsters:[{kind:"sludge-elemental",name:"a sludge elemental, recently fed",icon:"🟢",attack:6,health:15,undead:!1},{kind:"potion-rats",name:"a scurry of potion-glowing rats",icon:"🐀",attack:5,health:10,undead:!1},{kind:"mutant-vine",name:"a vine that learned grasping from a textbook",icon:"🌿",attack:6,health:14,undead:!1,slow:!0},{kind:"failed-homunculus",name:"a homunculus that failed peer review",icon:"🧪",attack:7,health:12,undead:!1,bribable:!0}],bosses:[{kind:"mad-alchemist",name:"the Mad Alchemist, flask raised in welcome",icon:"⚗️",attack:12,health:34,undead:!1},{kind:"the-precipitate",name:"the Precipitate, everything the drains refused",icon:"🫠",attack:13,health:37,undead:!1}]},castle:{id:"castle",name:"the Castle of the Vampire Lord",icon:"🦇",tagline:"The invitation was in your dreams. The exit clause was not.",weightTweaks:{treasure:1.5,library:.5,monster:.5,shrine:-.7,materials:-.5,corridor:-.3},minLibraries:1,trapTypes:["alarm","spike"],monsters:[{kind:"castle-thrall",name:"a thrall footman, polite and bloodless",icon:"🧟",attack:6,health:13,undead:!0,bribable:!0},{kind:"bat-cloud",name:"a chittering cloud of castle bats",icon:"🦇",attack:4,health:9,undead:!1},{kind:"pale-hound",name:"a pale hound with a red velvet collar",icon:"🐺",attack:7,health:12,undead:!0},{kind:"crimson-mist",name:"a crimson mist that pours under the door",icon:"🌫️",attack:8,health:11,undead:!0}],bosses:[{kind:"vampire-lord",name:"the Vampire Lord, apologizing for the hour",icon:"🧛",attack:13,health:35,undead:!0},{kind:"the-bride",name:"the Bride, who was here long before the Lord",icon:"👰",attack:12,health:33,undead:!0}]},bogcellar:{id:"bogcellar",name:"the Root Cellar of the Bog Witch",icon:"🧹",tagline:"Everything down here is pickled, potted, or patient. Some of it is all three.",weightTweaks:{materials:1.5,lab:1,trap:.5,treasure:-.5,corridor:-.3},alwaysLab:!0,trapBonus:1,trapTypes:["poison","spike"],monsters:[{kind:"jar-imp",name:"an imp still angry about the jar",icon:"🫙",attack:5,health:10,undead:!1,bribable:!0},{kind:"pickled-thing",name:"a pickled thing that finished pickling",icon:"🥒",attack:6,health:14,undead:!0},{kind:"root-golem",name:"a golem of taproots and bad intentions",icon:"🌳",attack:7,health:18,undead:!1,slow:!0},{kind:"bog-toad",name:"a bog toad the size of a smokehouse",icon:"🐸",attack:6,health:16,undead:!1,slow:!0}],bosses:[{kind:"bog-witch",name:"the Bog Witch, delighted to have company for dinner",icon:"🧙‍♀️",attack:12,health:34,undead:!1,bribable:!0},{kind:"the-cauldron",name:"the Cauldron, which learned to want",icon:"🍲",attack:13,health:36,undead:!1}]},icecaverns:{id:"icecaverns",name:"the Ice Caverns of the Mad Pyromancer",icon:"🧊",tagline:"He moved here so the fires couldn't spread. The fires found other ambitions.",weightTweaks:{disaster:1.5,trap:1,shrine:-.5,library:-.3},trapBonus:2,trapTypes:["fire","spike"],monsters:[{kind:"frost-wisp",name:"a frost wisp singed around the edges",icon:"❄️",attack:5,health:9,undead:!1},{kind:"ice-crawler",name:"an ice crawler with too many pick-shaped legs",icon:"🕷️",attack:6,health:13,undead:!1},{kind:"thawed-dead",name:"one of the thawed dead, steaming gently",icon:"🧟",attack:7,health:14,undead:!0},{kind:"cinder-imp",name:"a cinder imp wearing a snowball like armor",icon:"🔥",attack:6,health:11,undead:!1}],bosses:[{kind:"mad-pyromancer",name:"the Mad Pyromancer, delighted someone flammable came",icon:"🧙",attack:14,health:32,undead:!1},{kind:"glacier-heart",name:"the Glacier's Heart, half-melted and wholly furious",icon:"💠",attack:12,health:38,undead:!1,slow:!0}]}},$0={easy:.9,medium:1.19,hard:1.44,nightmare:1.83};function V0(i){var e;return{themeId:i.theme.id,conditionId:((e=i.condition)==null?void 0:e.id)||"none",rooms:i.rooms.map(t=>{var n;return{index:t.index,type:t.type,x:t.x,y:t.y,w:t.w,h:t.h,shape:t.shape,...(n=t.features)!=null&&n.length?{features:[...t.features]}:{},floor:t.floor||0,...t.descendsTo!==void 0?{descendsTo:t.descendsTo}:{},...t.wing?{wing:t.wing}:{},secret:!!t.secret,...t.monster?{monster:{...t.monster}}:{},...t.gold!==void 0?{gold:t.gold}:{},...t.mimicChance!==void 0?{mimicChance:t.mimicChance}:{},...t.trapDamage!==void 0?{trapDamage:t.trapDamage}:{},...t.trapType!==void 0?{trapType:t.trapType}:{},...t.materials!==void 0?{materials:t.materials}:{}}}),spine:[...i.spine],edges:i.edges.map(t=>({...t})),branches:i.branches.map(t=>({...t,rooms:[...t.rooms],consumed:!1})),trapdoors:i.trapdoors.map(t=>({...t,consumed:!1}))}}function W0(i){const e=oi[i.themeId]||oi.delve,t=Sn(i.conditionId),n=i.rooms.map(s=>({...s,icon:Xh[s.type]||"⬛",cleared:!1,discovered:!s.secret,...s.w?{}:jh(s.type),features:[...s.features||[]],...s.monster?{monster:{...s.monster}}:{}}));return new Yh(n,e,t,{spine:[...i.spine],edges:i.edges.map(s=>({...s,kind:s.kind||(s.secret?"secret":"door")})),branches:i.branches.map(s=>({...s,rooms:[...s.rooms],consumed:!1})),trapdoors:(i.trapdoors||[]).map(s=>({...s,consumed:!1}))})}function jh(i){const e=(Sr[i]||Sr.corridor)[0];return{w:e.min[0],h:e.min[1],shape:e.shape}}function q0(i,e,t=!1){const n=jh(i);return i===pe.MONSTER?{...n,monster:xo({...e.monsters[0]})}:i===pe.BOSS?{...n,monster:xo({...e.bosses[0],isBoss:!0})}:i===pe.TREASURE?{...n,gold:35,mimicChance:.18}:i===pe.VAULT?{...n,gold:100,mimicChance:.28}:i===pe.TRAP?{...n,trapDamage:5,trapType:(e.trapTypes||["spike"])[0]}:i===pe.MATERIALS?{...n,materials:2}:n}function X0(i){var e,t;if(!(i!=null&&i.id)||!((e=i.monsters)!=null&&e.length)||!((t=i.bosses)!=null&&t.length))throw new Error("a theme needs an id, monsters, and at least one boss");return oi[i.id]=i,i}function Ec(i,e,t,n=1,s=1,r={}){const a=e?t.bosses:t.monsters,o=xo({...i.pick(a)}),l=(e?r.bossAttackMult:r.monsterAttackMult)||1,c=(e?r.bossHealthMult:r.monsterHealthMult)||1,d=1+.15*(n-1);return o.attack=Math.max(1,Math.round(o.attack*d*s*l)),o.health=Math.max(1,Math.round(o.health*(1+.2*(n-1))*s*c)),e&&(o.isBoss=!0),o}const Er=1,at={BEAT:"beat",NOTABLE:"notable",LEDGER:"ledger"};function Tc(i){var t,n;const e=i.party;return{gold:e.gold,score:e.score,materials:e.materials,potions:e.potions.length,supply:e.supply,trophies:e.trophies.length,spellsLearned:e.spellsLearned,grimoire:e.grimoire.length,poison:e.poisonLinger||0,alarmed:e.alarmed?1:0,desecrated:e.desecrated?1:0,living:e.living().length,reserve:e.reserve.length,health:e.members.reduce((s,r)=>s+Math.max(0,r.health),0),wounds:e.members.reduce((s,r)=>s+r.wounds,0),equipment:e.members.reduce((s,r)=>s+r.equipment.length,0),weaponMods:e.members.reduce((s,r)=>s+r.weaponMods.length,0),roomsCleared:i.roomsCleared,floor:((n=(t=i.dungeon)==null?void 0:t.rooms[i.path[Math.min(i.roomIndex,i.path.length-1)]])==null?void 0:n.floor)||0}}const Y0={gold:{icon:"💰",label:"gold",salience:at.NOTABLE,threshold:25,up:i=>`The purse is ${i} heavier.`,down:i=>`${i} gold leaves the purse.`},score:{icon:"🏅",label:"renown",salience:at.LEDGER,up:i=>`${i} renown earned.`,down:i=>`${i} renown lost.`},materials:{icon:"🌿",label:"materials",salience:at.NOTABLE,threshold:3,up:i=>`${i} more alchemical materials in the satchel.`,down:i=>`${i} materials spent at the bench.`},potions:{icon:"🧪",label:"potions",salience:at.BEAT,up:i=>`${i} more draught${i>1?"s":""} corked and stowed.`,down:i=>`${i} draught${i>1?"s are":" is"} drunk.`},supply:{icon:"🕯️",label:"oil",salience:at.LEDGER,up:i=>`${i} more march${i>1?"es":""} of oil found.`,down:i=>`${i} march${i>1?"es":""} of oil burned.`},trophies:{icon:"🏆",label:"trophies",salience:at.BEAT,up:i=>`${i} trophy${i>1?" more taken":" taken"} from the dead.`,down:i=>`${i} trophies lost.`},spellsLearned:{icon:"📖",label:"workings learned",salience:at.BEAT,up:i=>`${i} new working${i>1?"s":""} copied into the grimoire.`,down:i=>`${i} working${i>1?"s":""} lost from memory.`},grimoire:{icon:"📜",label:"grimoire",salience:at.LEDGER,up:i=>`The grimoire grows by ${i}.`,down:i=>`${i} scroll${i>1?"s burn":" burns"} away on use.`},poison:{icon:"🐍",label:"venom",salience:at.BEAT,up:i=>`Venom works in the blood: ${i} damage waiting on the march.`,down:i=>"The venom is spent."},alarmed:{icon:"🔔",label:"the alarm",salience:at.BEAT,up:()=>"An alarm is ringing somewhere below. Whatever comes next knows.",down:()=>"The alarm has stopped mattering; the thing it warned has been met."},desecrated:{icon:"⛧",label:"desecration",salience:at.BEAT,up:()=>"The party has taken something the dungeon considers its own. It will remember.",down:()=>"The debt is settled."},living:{icon:"☠️",label:"the living",salience:at.BEAT,up:i=>`${i} more stand${i>1?"":"s"} with the party.`,down:i=>`${i} of the party ${i>1?"are":"is"} down.`},reserve:{icon:"🎭",label:"the reserve",salience:at.NOTABLE,threshold:1,up:i=>`${i} more wait${i>1?"":"s"} in town.`,down:i=>`${i} called up from the reserve.`},health:{icon:"❤️",label:"health",salience:at.NOTABLE,threshold:6,up:i=>`${i} health mended.`,down:i=>`${i} health taken.`},wounds:{icon:"✚",label:"wounds",salience:at.BEAT,up:i=>`${i} wound${i>1?"s":""} that will not close down here.`,down:i=>`${i} wound${i>1?"s":""} closed.`},equipment:{icon:"🎒",label:"kit",salience:at.NOTABLE,threshold:1,up:i=>`${i} piece${i>1?"s":""} of kit taken up.`,down:i=>`${i} piece${i>1?"s":""} of kit lost.`},weaponMods:{icon:"⚗️",label:"weapon coatings",salience:at.NOTABLE,threshold:1,up:i=>`${i} blade${i>1?"s":""} coated at the bench.`,down:i=>`${i} coating${i>1?"s wear":" wears"} off.`},floor:{icon:"🪜",label:"floor",salience:at.BEAT,up:i=>`The party descends ${i===1?"a floor":`${i} floors`}: everything below hits harder.`,down:i=>`The party climbs back up ${i===1?"a floor":`${i} floors`}.`},roomsCleared:{icon:"🚪",label:"rooms cleared",salience:at.LEDGER,up:i=>`${i} more room${i>1?"s":""} behind them.`,down:i=>`${i} room${i>1?"s":""} uncleared.`}};function j0(i,e,t={}){const n=[];for(const s of Object.keys(e)){const r=i[s]??0,a=e[s];if(r===a)continue;const o=a-r,l=Y0[s],c=Math.abs(o);let d,h=at.LEDGER,p="•";l?(p=l.icon,d=o>0?l.up(c):l.down(c),h=l.salience,h===at.NOTABLE&&l.threshold&&c<l.threshold&&(h=at.LEDGER)):d=`${s} ${o>0?"rose":"fell"} by ${c}.`,n.push({turn:t.turn??0,room:t.room??null,field:s,from:r,to:a,delta:o,icon:p,text:d,salience:h,described:!!l})}return n}class Vi{constructor(e="the party"){this.version=Er,this.partyName=e,this.delves=[],this.current=null}beginDelve({seed:e,difficulty:t,depth:n,theme:s,roster:r,condition:a}={}){return this.current={number:this.delves.length+1,seed:e??null,difficulty:t??null,depth:n??1,theme:s??null,condition:a??null,roster:r??[],rooms:[],events:[],outcome:null,startedAt:null},this.delves.push(this.current),this.current}recordRoom(e,t=[]){this.current||this.beginDelve(),this.current.rooms.push({turn:(e==null?void 0:e.turn)??this.current.rooms.length+1,room:(e==null?void 0:e.room)??null,icon:(e==null?void 0:e.icon)??null,action:(e==null?void 0:e.action)??null,predicament:(e==null?void 0:e.predicament)??null,deliberation:(e==null?void 0:e.deliberation)??null,resolution:(e==null?void 0:e.resolution)??null,aside:(e==null?void 0:e.aside)??null,falls:(e==null?void 0:e.falls)??[],wounds:(e==null?void 0:e.wounds)??[],events:t}),this.current.events.push(...t)}recordAside(e,t=at.BEAT){this.current||this.beginDelve(),this.current.events.push({turn:this.current.rooms.length,room:null,field:null,icon:"·",text:e,salience:t,described:!0})}endDelve(e){this.current&&(this.current.outcome=e)}allEvents(){return this.delves.flatMap(e=>e.events)}beats(e=this.current){return((e==null?void 0:e.events)||[]).filter(t=>t.salience===at.BEAT)}toJSON(){return{version:this.version,partyName:this.partyName,delves:this.delves}}static fromJSON(e){const t=new Vi((e==null?void 0:e.partyName)||"the party");return t.version=(e==null?void 0:e.version)??Er,t.delves=Array.isArray(e==null?void 0:e.delves)?e.delves:[],t.current=t.delves[t.delves.length-1]||null,t}}const K0=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];function J0(i){return K0[i]||String(i)}function Kh(i,{ledger:e=!1}={}){const t=[];if(t.push(`# The Chronicle of ${i.partyName}`,""),i.delves.length===0)return t.push("_Nothing has happened yet._"),t.join(`
`);for(const n of i.delves){t.push(`## Delve ${J0(n.number)}${n.theme?` — ${n.theme}`:""}`,"");const s=[n.difficulty&&`**Difficulty:** ${n.difficulty}`,n.depth&&`**Depth:** ${n.depth}`,n.condition&&`**Wager:** ${n.condition}`,n.seed&&`**Seed:** \`${n.seed}\``].filter(Boolean);s.length&&t.push(s.join(" · "),""),n.roster.length&&t.push("**Who went down:** "+n.roster.join(", "),"");for(const r of n.rooms){t.push(`### ${r.icon||""} Room ${r.turn}${r.room?` — ${r.room}`:""}`.trim(),"");for(const a of[r.predicament,r.deliberation,r.resolution])a&&t.push(a,"");r.aside&&t.push(`_${r.aside}_`,"");for(const a of r.wounds)t.push(`- ${a}`);for(const a of r.falls)t.push(`- ${a}`);if((r.wounds.length||r.falls.length)&&t.push(""),e&&r.events.length){t.push("<details><summary>Ledger</summary>","");for(const a of r.events)t.push(`- ${a.icon} ${a.text}`);t.push("","</details>","")}}if(n.outcome){t.push(`### ${n.outcome.victory?"🏆 The way out":"☠️ The end of it"}`,""),n.outcome.epitaph&&t.push(n.outcome.epitaph,"");const r=[`**Rooms cleared:** ${n.outcome.roomsCleared??0}`,`**Score:** ${n.outcome.score??0}`,`**Gold:** ${n.outcome.gold??0}`,`**Trophies:** ${n.outcome.trophies??0}`,`**Survivors:** ${n.outcome.survivors??0}`];t.push(r.join(" · "),"")}}return t.join(`
`)}const Jh={"rat-swarm":{effect:"trinket",name:"the rat-king's knot",icon:"🐀",bonus:{mind:1},text:"Deep in the tangle: a knot of nine tails, braided by no human hand. Whoever pockets it starts noticing the exits."},skeleton:{effect:"trinket",name:"a femur of surprising balance",icon:"🦴",bonus:{attack:1},text:"One femur survives the collapse, weighted like it was made for swinging. Perhaps by now it was."},"goblin-gang":{effect:"gold",name:"the toll-purse",icon:"💰",gold:15,text:"The toll-purse, fat with every honest traveler's coin the gang ever squeezed. Repossessed."},gelatinous:{effect:"potion",name:"a jar of restorative ooze",icon:"🫙",potion:{kind:"restorative-ooze",heal:6},text:"The clear stuff from its middle, scooped and jarred. Wounds close under it; nobody watches while they do."},wraith:{effect:"trinket",name:"a grave-cold ribbon",icon:"🎗️",bonus:{defense:1},text:"Where it fell: a ribbon cold as the underside of a stone. Worn at the wrist, blades slide half an inch wide."},"dragon-whelp":{effect:"coating",name:"a vial of whelp-fire",icon:"🔥",mod:{name:"whelp-fire coating",attack:2,element:"fire"},text:"The fire-gland, drained into a vial with very steady hands. Painted on steel, it remembers what it was for."},"ogre-king":{effect:"trinket",name:"the Ogre King's smallest crown",icon:"👑",bonus:{defense:2},text:"The smallest of his stacked crowns fits a human head. It has stopped one axe already — the notch proves it."},"bone-warden":{effect:"trinket",name:"a pauldron of century bone",icon:"🦴",bonus:{defense:1},text:"Its shoulder-piece outlived the rest of it: bone gone hard as kiln brick, straps still good."},"grave-mites":{effect:"materials",name:"a handful of grave-amber",icon:"🟠",count:2,text:"The mites' castings, hardened to amber. Herbalists grind it into everything and apologize for nothing."},"barrow-shade":{effect:"scroll",name:"the shade's last words",icon:"📜",spell:{name:"Barrow Chill",icon:"❄️",school:"necromantic",power:4,use:"combat",element:"frost",text:"Copied from the air where a shade stopped being."},text:"As it thins away it leaves the words it was made from, hanging in the air just long enough to copy."},"hungry-ghoul":{effect:"coating",name:"a ghoul's paralytic gland",icon:"🐍",mod:{name:"ghoul-gland venom",attack:2,venom:!0},text:"The gland behind its jaw, excised carefully. What slowed its dinners will slow yours."},"shrouded-king":{effect:"trinket",name:"the Shroud itself",icon:"👻",bonus:{mind:2},text:"Folded, the Shroud is only cloth. Worn over the shoulders, it whispers everything dead courtiers noticed."},"abbot-of-worms":{effect:"scroll",name:"the Abbot's last sermon",icon:"📖",spell:{name:"Final Benediction",icon:"✨",school:"liturgical",power:5,use:"combat",element:"holy",text:"The closing lines of a sermon preached far too long."},text:"His sermon-book is worm-eaten to lace, but the closing benediction survives — and it burns to be said aloud."},salamander:{effect:"coating",name:"a salamander gland",icon:"🦎",mod:{name:"salamander-gland coating",attack:2,element:"fire"},text:"The heat-gland comes free whole, still warm. Brushed on a blade, it holds a slow orange smolder."},"cinder-bats":{effect:"materials",name:"a pouch of wing-ash",icon:"🦇",count:2,text:"Their wings burn down to a fine bright ash the alchemists call phoenix-meal. Two good pinches."},"magma-toad":{effect:"potion",name:"a tin of toad-balm",icon:"🧴",potion:{kind:"toad-balm",heal:8},text:"The cooling mud off its back, scraped into a tin. It sets warm on a wound and takes the pain with it."},"obsidian-golem":{effect:"trinket",name:"an obsidian heart-shard",icon:"🗿",bonus:{defense:1},text:"A shard off its heart, glass-black and heavier than it looks. Carried close, it takes the edge off a blow."},"cinder-wyrm":{effect:"coating",name:"wyrm-fire, bottled",icon:"🐉",mod:{name:"wyrm-fire coating",attack:3,element:"fire"},text:"What ran in its veins fills three fingers of a vial. It has not cooled. It is not going to."},"forge-tyrant":{effect:"trinket",name:"the Tyrant's hammer-head",icon:"🔨",bonus:{attack:2},text:"The haft burned away with its owner; the head is good metal with standing opinions about being swung."},"flying-tomes":{effect:"scroll",name:"a page that surrendered",icon:"📄",spell:{name:"Loose Page",icon:"📄",school:"found",power:3,use:"utility",text:"A complete working in a fair hand. Finders keepers."},text:"One page breaks formation and glides down: a working, complete, in a fair hand. Finders keepers."},"ink-elemental":{effect:"materials",name:"a flask of living ink",icon:"🫧",count:2,text:"It settles into the flask willingly, as if it had somewhere worse to be. Alchemists thin it into everything."},"spectral-scribe":{effect:"trinket",name:"the scribe's quill",icon:"🪶",bonus:{mind:1},text:"The quill outlasts the hand. It corrects the spelling in whatever pocket it rides in."},"index-wight":{effect:"trinket",name:"the master index card",icon:"🗂️",bonus:{mind:1},text:"Its filing card, still legible: a system for finding anything. Reading it reorganizes you, slightly."},archivist:{effect:"scroll",name:"the Restricted Folio",icon:"📕",spell:{name:"Restricted Working",icon:"📕",school:"forbidden",power:6,use:"combat",text:"Nobody was cleared to read this. The margins alone are a weapon."},text:"From under the Archivist's arm: the folio no one was ever cleared to read. The margins alone are a weapon."},"grand-errata":{effect:"trinket",name:"the dearest correction",icon:"📝",bonus:{mind:2},text:"The correction slip it guarded most jealously. Whoever carries it is right slightly more often. Measurably."},"sludge-elemental":{effect:"materials",name:"reclaimed reagents",icon:"🟢",count:2,text:"Half its body was unreacted reagent. Strained through a shirt: two measures, still potent, barely angry."},"potion-rats":{effect:"potion",name:"a rat-warmed elixir",icon:"🐀",potion:{kind:"rat-warmed-elixir",heal:6},text:"One rat glowed a steadier green than the rest. The vial it swallowed is intact, and it is a healing draught."},"mutant-vine":{effect:"materials",name:"clipped mutant cuttings",icon:"🌿",count:2,text:"Cuttings, taken with respect and long tongs. They keep trying to grow. Alchemists love that in an ingredient."},"failed-homunculus":{effect:"trinket",name:"the homunculus's notes",icon:"🧪",bonus:{mind:1},text:"It kept notes on its own failure, in tiny meticulous handwriting. Peer review would have been kinder."},"mad-alchemist":{effect:"potion",name:"the masterwork draught",icon:"⚗️",potion:{kind:"masterwork-draught",heal:12},text:"His belt holds one flask he never dared drink: the masterwork. It is exactly as good as he feared it was."},"the-precipitate":{effect:"materials",name:"a core of pure precipitate",icon:"🫠",count:4,text:"At its center, everything the drains refused had refined itself pure. Four measures, humming faintly."},"castle-thrall":{effect:"gold",name:"the footman's wages",icon:"🪙",gold:12,text:"His pockets hold a lifetime of unspent wages in old silver. Bloodless, but it spends."},"bat-cloud":{effect:"materials",name:"a sheaf of wing-leather",icon:"🦇",count:1,text:"Enough fine wing-leather to interest a bookbinder or an alchemist. The party happens to know one of those."},"pale-hound":{effect:"trinket",name:"the red velvet collar",icon:"🐺",bonus:{attack:1},text:"The velvet collar, worked with a name nobody can read. Wearing it lends the wearer the hound's certainty."},"crimson-mist":{effect:"potion",name:"a phial of settled red",icon:"🌫️",potion:{kind:"settled-red",heal:8},text:"What settles out of the mist is best not examined. In a phial it keeps, and it closes wounds like it owes them."},"vampire-lord":{effect:"trinket",name:"the Lord's signet",icon:"💍",bonus:{mind:2},text:"His signet ring, older than the castle around it. Doors of good breeding still answer to it."},"the-bride":{effect:"trinket",name:"the Bride's veil",icon:"👰",bonus:{defense:2},text:"The veil is older than the Lord and stronger than mail. It has been widowed before and expects to be again."},"jar-imp":{effect:"trinket",name:"the imp's jar",icon:"🫙",bonus:{mind:1},text:"The jar that held it, unbroken. Things put inside it stay put — including, faintly, luck."},"pickled-thing":{effect:"potion",name:"the pickling liquor",icon:"🥒",potion:{kind:"pickling-liquor",heal:6},text:"The brine that kept it lively for a century. One cup, taken nose-shut, mends whatever it touches on the way down."},"root-golem":{effect:"materials",name:"a length of heartroot",icon:"🌳",count:3,text:"The taproot at its core is heartroot — pound for pound the best base reagent the bog has ever grown."},"bog-toad":{effect:"coating",name:"bog-toad milk",icon:"🐸",mod:{name:"bog-toad milk",attack:2,venom:!0},text:"Milked in the traditional way, which nobody discusses. On a blade it makes shallow cuts decisive."},"bog-witch":{effect:"scroll",name:"the Witch's receipt-book",icon:"🍲",spell:{name:"the Witch's Receipt",icon:"🍲",school:"kitchen",power:5,use:"utility",text:"Most of her pages were soup. This one is not, and it works."},text:"Her receipt-book, dinner-stained. Most pages are soup. One page is not soup, and it works."},"the-cauldron":{effect:"potion",name:"a ladle of the last soup",icon:"🍲",potion:{kind:"last-soup",heal:12},text:"What the Cauldron wanted, it seems, was to be wanted. Its final simmer is a mending broth of genuine quality."},"frost-wisp":{effect:"coating",name:"a pinch of wisp-rime",icon:"❄️",mod:{name:"wisp-rime coating",attack:2,element:"frost"},text:"The rime it left behind never quite melts. Rubbed along an edge, the metal drinks the cold and keeps it."},"ice-crawler":{effect:"trinket",name:"pick-leg greaves",icon:"🕷️",bonus:{defense:1},text:"Two of its legs, lashed on as shin-guards. Ugly, chitinous, and better than what the front rank had."},"thawed-dead":{effect:"gold",name:"a frozen soldier's pay",icon:"🪙",gold:10,text:"His pay-purse thaws slower than he did. Old coin, honest weight, no further use to the previous owner."},"cinder-imp":{effect:"coating",name:"the imp's spark",icon:"🔥",mod:{name:"imp-spark coating",attack:2,element:"fire"},text:"The spark it wore like a heart goes into a tinderbox willingly. Painted thin, it makes steel argue hotter."},"mad-pyromancer":{effect:"scroll",name:"the Exile's Working",icon:"🔥",spell:{name:"the Exile's Working",icon:"🔥",school:"forbidden",power:6,use:"combat",element:"fire",text:"Exactly as illegal as advertised."},text:"The working that got him exiled, folded eight times against his chest. It is exactly as illegal as advertised."},"glacier-heart":{effect:"trinket",name:"a splinter of the Heart",icon:"💠",bonus:{defense:2},text:"A splinter of the Heart, already frosting the pocket it rides in. Blows land on the wearer like they had second thoughts."}},Z0={swarm:{effect:"materials",name:"a residue of the swarm",icon:"🧫",count:1,text:"What {monster} leaves behind scrapes up into a measure of the residue alchemists are always asking about."},armored:{effect:"trinket",name:"a plate of scavenged armor",icon:"🛡️",bonus:{defense:1},text:"A plate off {monster} comes away intact, and the straps of the last owner's gear fit it well enough."},ethereal:{effect:"materials",name:"a wisp of ectoplasm",icon:"👻",count:1,text:"Where {monster} stopped being, something silver settles into the jar. The alchemists have a word for it and a price."},venomous:{effect:"coating",name:"a harvested venom sac",icon:"🐍",mod:{name:"harvested venom",attack:1,venom:!0},text:"The venom sac of {monster}, drawn whole. Its grudge outlives it, and now works for the party."},slow:{effect:"trinket",name:"a ponderous hide",icon:"🥾",bonus:{defense:1},text:"The hide of {monster} cuts into something between a cloak and a wall. Slower now, but so is everything hitting you."}},Q0={effect:"trinket",name:"a trophy of the kill",icon:"🏆",bonus:{attack:1},text:"Cut from {monster}: a trophy with enough menace left in it to lend some. The chroniclers will want to sketch it."};function ey(i){Object.assign(Jh,i)}function ty(i){return Jh[i==null?void 0:i.kind]||Z0[i==null?void 0:i.trait]||Q0}let xa=0;function Zh(i){return Object.entries(i||{}).map(([e,t])=>`+${t} ${e}`).join(", ")}function Ac(i,e){const t=ty(e);xa++;let n="";switch(t.effect){case"trinket":{const r=i.assignEquipment({id:`drop-${(e==null?void 0:e.kind)||"unknown"}-${xa}`,type:"equipment",name:t.name,icon:t.icon,slot:"trinket",bonus:{...t.bonus},bestFor:null,text:t.text.replace("{monster}",(e==null?void 0:e.name)||"the fallen thing")});n=`a trinket (${Zh(t.bonus)}), now worn by ${(r==null?void 0:r.name)||"no one"}`;break}case"coating":{const r=i.living().reduce((o,l)=>o.attack>=l.attack?o:l);r.addWeaponMod({...t.mod});const a=t.mod.element?`, ${t.mod.element}`:t.mod.venom?", venom":"";n=`a weapon coating (+${t.mod.attack} attack${a}), applied to ${r.name}'s weapon`;break}case"potion":i.potions.push({...t.potion}),n=`a potion (heals ${t.potion.heal}), added to the satchel`;break;case"materials":i.materials+=t.count,n=`${t.count} alchemy material${t.count===1?"":"s"}`;break;case"scroll":i.grimoire.push({...t.spell,id:`drop-${(e==null?void 0:e.kind)||"unknown"}-${xa}`,source:"found"}),n=`a scroll of ${t.spell.name} (${t.spell.use}, power ${t.spell.power}), added to the grimoire`;break;case"gold":i.addGold(t.gold),n=`${t.gold} gold`;break}const s={name:t.name,icon:t.icon,effect:t.effect,from:(e==null?void 0:e.name)||"unknown"};return(i.trophies||(i.trophies=[])).push(s),{source:t.name,find:"drop",drop:s,text:`${t.icon} ${ny((e==null?void 0:e.name)||"the monster")} drops ${t.name}: ${n}.`}}function ny(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}const ds=i=>i&&i.charAt(0).toUpperCase()+i.slice(1),iy={pillars:"stone",rubble:"stone",boulder:"stone",sarcophagus:"stone",crates:"wood",shelves:"wood",brazier:"flame",font:"water",spout:"water",portcullis:"metal",anvil:"metal",mirror:"glass",pit:"void",chasm:"void",spikes:"metal"},sy={fire:{wood:{id:"blaze",icon:"🔥",burn:3,cover:-1,light:2,consumes:!0,text:i=>`The fire takes ${i} and does not stop at the monster. The room burns: 3 damage a round while it lasts, the cover burns away with it, and 2 marches of light to burn by.`},water:{id:"steam",icon:"♨️",cover:1,monsterAtk:-2,selfHarm:1,text:i=>`The working hits ${i} and the room fills with scalding steam. The monster is fighting half-blind: -2 to what it hits for, and the fog is cover — but nobody in a boiling room gets off clean, and the party takes 1.`},flame:{id:"flare",icon:"💥",damage:6,light:1,consumes:!0,text:i=>`${ds(i)} takes the working like a bellows and erupts: 6 damage, and the flare throws a march of light down the passage. It burns its fuel doing it — the bracket is cold afterwards.`},metal:{id:"searing",icon:"🌡️",damage:2,text:i=>`${ds(i)} glows and spits where the working lands: 2 damage to whatever is near it.`},void:{id:"updraft",icon:"🌋",damage:3,cover:-1,text:i=>`The fire finds ${i} and the shaft draws like a chimney: 3 damage in the updraft, and nothing to shelter behind while it roars.`}},shock:{water:{id:"conduction",icon:"⚡",damage:7,selfHarm:1,text:i=>`The water in ${i} carries the working across the whole floor: 7 damage — and the party is standing on the same floor, for 1 back.`},metal:{id:"arc",icon:"⚡",damage:4,text:i=>`The working finds ${i} and arcs off it into everything nearby: 4 extra damage.`},glass:{id:"shiver",icon:"🪞",damage:2,consumes:!0,text:i=>`${ds(i)} shivers, flashes and comes apart: 2 damage in flying silver.`},void:{id:"earthing",icon:"🕳️",monsterAtk:-2,selfHarm:1,text:i=>`The working earths itself down ${i}, and the whole floor jumps: the monster fights off-balance for 2 less, and everyone who felt it takes 1.`}},frost:{water:{id:"glaze",icon:"🧊",monsterAtk:-3,selfHarm:1,text:i=>`${ds(i)} freezes and the glaze spreads across the floor. The monster cannot keep its feet: -3 to what it hits for. Neither can the party, quite: 1 damage.`},flame:{id:"douse",icon:"💨",cover:1,light:-2,consumes:!0,text:i=>`The working puts ${i} out. Smoke to fight behind, and 2 marches of light gone with it.`},stone:{id:"brittle",icon:"❄️",damage:2,text:i=>`Frost gets into ${i} and cracks it apart: 2 damage in splinters of cold stone.`},void:{id:"rime-bridge",icon:"🧊",cover:2,selfHarm:1,text:i=>`Frost sheets across ${i} until it will bear weight — a bridge to fight from, and a bad place to slip: 2 cover, 1 damage.`}},holy:{stone:{id:"consecrate",icon:"🌟",damage:3,undeadQuelled:!0,text:i=>`The light soaks into ${i}. Whatever was going to rise out of it stays put, and the working bites for 3.`},glass:{id:"kindled-glass",icon:"🪞",revealEthereal:!0,damage:2,text:i=>`${ds(i)} catches the light and throws it everywhere at once: 2 damage, and nothing in the room can hide behind being half-there.`},water:{id:"blessing",icon:"⛲",heal:4,text:i=>`The working settles into ${i} and stays there. The party drinks: 4 healed.`}}};function ry(i){return!!i&&i.aoe===!0}function Qh(i,e){if(!ry(i)||!i.element)return[];const t=sy[i.element];if(!t)return[];const n=[];for(const s of $o(e)){const r=iy[s.id],a=t[r];a&&n.push({...a,feature:s.id,featureName:s.name,matter:r,element:i.element,text:a.text(s.name)})}return n}function ay(i){const e={damage:0,burn:0,cover:0,monsterAtk:0,light:0,selfHarm:0,heal:0,undeadQuelled:!1,revealEthereal:!1,consumed:[],notes:[]};for(const t of i)e.damage+=t.damage||0,e.burn+=t.burn||0,e.cover+=t.cover||0,e.monsterAtk+=t.monsterAtk||0,e.light+=t.light||0,e.selfHarm+=t.selfHarm||0,e.heal+=t.heal||0,t.undeadQuelled&&(e.undeadQuelled=!0),t.revealEthereal&&(e.revealEthereal=!0),t.consumes&&e.consumed.push(t.feature),e.notes.push({source:t.featureName,text:`${t.icon} ${t.text}`});return e}const cr=(i,e,t=0)=>{const n=(i==null?void 0:i.w)??6,s=(i==null?void 0:i.h)??6;return Math.min(n,s)>=e&&n*s>=t},Wi={column:{id:"column",name:"Column",icon:"⏸️",fits:()=>!0,frontage:1,incomingMult:.55,attackMult:1,flanking:!1,areaShare:.8,tell:i=>`The ${i} is too tight to spread out: the party files up, one blade forward.`,effect:"One blade forward and one thing able to reach it: nearly half the damage a round, and only the front rank swinging."},line:{id:"line",name:"Line",icon:"➖",fits:i=>cr(i,4),frontage:2,incomingMult:1,attackMult:1,flanking:!0,areaShare:1,tell:()=>"The party spreads into a line, two forward and two behind.",effect:"The ordinary shape of a fight, and the one that leaves room to work round the sides."},shieldwall:{id:"shieldwall",name:"Shield Wall",icon:"🛡️",fits:i=>cr(i,4),frontage:2,incomingMult:.7,attackMult:.75,flanking:!1,areaShare:1.25,tell:()=>"Shields lock along the front rank and the party stops trying to win quickly.",effect:"A third less damage a round and a quarter less dealt — but packed tight, so anything with a blast radius hurts more."},wedge:{id:"wedge",name:"Wedge",icon:"🔺",fits:i=>cr(i,5,30),frontage:3,incomingMult:1.3,attackMult:1.2,flanking:!0,areaShare:1,tell:()=>"The party drives in as a wedge, everything committed forward.",effect:"A fifth more damage dealt, a third more taken, and three of them swinging instead of two."},loose:{id:"loose",name:"Loose Order",icon:"🌐",fits:i=>cr(i,6,48),frontage:2,incomingMult:.85,attackMult:.85,flanking:!1,areaShare:.5,tell:i=>`There is room enough in the ${i} to fight spread out, well apart.`,effect:"A little less given and a little less taken, and only half of any blast reaches the party."}},oy=Object.keys(Wi);function ly(i){return oy.filter(e=>Wi[e].fits(i))}function cy(i,e,t=Math.random){var d,h,p,f;if(!e||!e.w||!e.h)return"line";const n=ly(e),s={};for(const v of n)s[v]=1;const r=i.living().length>0&&i.members.reduce((v,g)=>v+Math.max(0,g.health),0)/i.members.reduce((v,g)=>v+g.maxHealth,0)<.4;n.length>1&&(s.column=r?2:.15);const a=e==null?void 0:e.monster,o=v=>{var g;return(g=i.tactics)==null?void 0:g.some(m=>m.id===v)};(a==null?void 0:a.trait)==="swarm"&&s.loose&&(s.loose+=3),a!=null&&a.isBoss&&s.shieldwall&&(s.shieldwall+=2),a&&a.attack>=12&&s.shieldwall&&(s.shieldwall+=2),a&&a.health<=12&&s.wedge&&(s.wedge+=2),(d=i.hasPersonality)!=null&&d.call(i,"brave")&&s.wedge&&(s.wedge+=2.5),(h=i.hasPersonality)!=null&&h.call(i,"reckless")&&s.wedge&&(s.wedge+=3),(p=i.hasPersonality)!=null&&p.call(i,"craven")&&s.shieldwall&&(s.shieldwall+=3),(f=i.hasPersonality)!=null&&f.call(i,"cunning")&&s.loose&&(s.loose+=2),o("tac-shieldwall")&&s.shieldwall&&(s.shieldwall+=2.5),o("tac-flanking")&&s.wedge&&(s.wedge+=2),o("tac-firewatch")&&s.loose&&(s.loose+=1.5),i.living().length<=2&&s.wedge&&(s.wedge*=.3);const l=Object.values(s).reduce((v,g)=>v+g,0);let c=t()*l;for(const[v,g]of Object.entries(s))if(c-=g,c<=0)return v;return n[n.length-1]||"line"}function hy(i,e){const t=Wi[i]||Wi.line;return{id:t.id,name:t.name,icon:t.icon,frontage:t.frontage,incomingMult:t.incomingMult,attackMult:t.attackMult,flanking:t.flanking,areaShare:t.areaShare,tell:t.tell((e==null?void 0:e.shape)||"room"),effect:t.effect}}function Ct(){return Math.random()*10}const Rc=.5;function wt(i,e){return i.living().some(t=>t.equipment.some(n=>n.id===e))}function Mn(i,e){return i.grimoire.some(t=>t.id===e)}function Qn(i){const e={sneak:0,disarm:0,deepStudy:0,secretDoor:0,trapSoak:0,cleanInspect:!1,notes:{}};return wt(i,"eq-boots")&&(e.sneak+=1.5,e.notes.sneak="Boots of the Quiet Step"),Mn(i,"sp-light")&&(e.sneak+=1,e.notes.sneakLight="Dancing Light"),wt(i,"eq-lockpicks")&&(e.disarm+=1.5,e.cleanInspect=!0,e.notes.disarm="Masterwork Lockpicks",e.notes.cleanInspect="Masterwork Lockpicks"),i.hasPersonality("cunning")&&(e.cleanInspect=!0,e.notes.cleanInspect=e.notes.cleanInspect||"the Cunning"),wt(i,"eq-grimoire")&&(e.deepStudy+=1.5,e.notes.deepStudy="the Grimoire of Low Whispers"),wt(i,"eq-lantern")&&(e.secretDoor+=2,e.trapSoak+=1,e.notes.secretDoor="the Everburning Lantern",e.notes.trapSoak="the Everburning Lantern"),e}function dy(i,e){return _0(i,e,{item:t=>wt(e,t),spell:t=>Mn(e,t),tactic:t=>Ss(e).some(n=>n.id===t)})}function Cc(i){return wt(i,"eq-alembic")&&i.materials>0&&i.supply<=5}function ed(i,e){return[...uy(i,e),...dy(i,e)]}function uy(i,e){var t,n,s,r,a;switch(i.type){case pe.MONSTER:case pe.BOSS:{const l=[{id:"fight",name:"Fight",desc:"Steel and teamwork"}];return(i.fled||0)<2&&l.push({id:"flee",name:"Fall Back",desc:`Retreat and try the fight later, worn down: ${2*((i.fled||0)+1)} damage`}),e.hasClass(W.ROGUE)&&!((t=i.monster)!=null&&t.isBoss)&&l.push({id:"sneak",name:"Sneak Past",desc:"The rogue leads a silent detour"}),e.hasClass(W.CLERIC)&&((n=i.monster)!=null&&n.undead)&&l.push({id:"turn-undead",name:"Turn Undead",desc:"The cleric raises the holy symbol"}),(s=i.monster)!=null&&s.bribable&&e.gold>=15&&l.push({id:"bribe",name:"Pay the Toll",desc:"Gold buys passage (15g)"}),e.grimoire.some(c=>c.use==="combat")&&l.push({id:"spell-strike",name:"Open with Magic",desc:"Lead with a combat spell"}),Mn(e,"sp-fear")&&!((r=i.monster)!=null&&r.isBoss)&&(((a=i.monster)==null?void 0:a.health)||99)<=14&&l.push({id:"cause-fear",name:"Cause Fear",desc:"Send the weak thing running"}),l}case pe.TRAP:{const o=[{id:"push-through",name:"Push Through",desc:"Take the hit, keep marching"},{id:"search-around",name:"Search for a Way Around",desc:"Slow but safe-ish"}];return e.hasClass(W.ROGUE)&&o.unshift({id:"disarm",name:"Disarm It",desc:"The rogue's fingers know this work"}),e.grimoire.some(l=>l.use==="utility")&&o.push({id:"spell-bypass",name:"Magic It Open",desc:"A utility spell solves this"}),e.hasClass(W.ALCHEMIST)&&e.materials>=1&&o.push({id:"smoke-bomb",name:"Alchemist's Smoke",desc:"Spend a material; spring it from afar"}),o}case pe.TREASURE:case pe.VAULT:{const o=[{id:"loot",name:"Loot It All",desc:"Everything shiny goes in the bags"},{id:"inspect",name:"Inspect First",desc:"Check for mimics and curses"},{id:"leave-it",name:"Leave It",desc:"Some gold is bait"}];return Mn(e,"sp-knock")&&o.unshift({id:"knock-open",name:"Cast Knock",desc:"Open it from across the room. Loudly."}),o}case pe.LIBRARY:{const o=[{id:"study",name:"Study the Shelves",desc:"Learn a spell from the stacks"},{id:"pass-by",name:"Pass Through",desc:"Books do not fill bellies"}];return e.hasClass(W.WIZARD)&&o.unshift({id:"deep-study",name:"Read the Sealed Texts",desc:"The wizard risks the dangerous books"}),o}case pe.SHRINE:return[{id:"rest",name:"Rest and Pray",desc:"Heal the wounded"},{id:"desecrate",name:"Pry Out the Gold Leaf",desc:"Profitable. Blasphemous."},{id:"pass-by",name:"Keep Moving",desc:"No time for candles"}];case pe.LAB:{const o=[{id:"pass-by",name:"Move On",desc:"Glassware and regret"}];return e.hasClass(W.ALCHEMIST)&&e.materials>0&&o.unshift({id:"alchemy",name:"Work the Bench",desc:"Brew a potion or mod a weapon"}),Cc(e)&&o.unshift({id:"brew-oil",name:"Cook Down Lamp Oil",desc:"A material becomes two marches of light"}),o}case pe.MATERIALS:{const o=[{id:"gather",name:"Gather Materials",desc:"Herbs, salts, quicksilver"},{id:"pass-by",name:"Leave Them",desc:"The satchel stays light"}];return Cc(e)&&o.push({id:"brew-oil",name:"Cook Down Lamp Oil",desc:"A material becomes two marches of light"}),o}case pe.STAIRS:{const o=[{id:"descend",name:"Go Down",desc:"A long climb by lamplight: 1 supply"}];wt(e,"eq-grapple")&&o.push({id:"rope-down",name:"Rope Down the Well",desc:"Straight down the shaft beside the stair: no supply spent"});const l=e.living().some(d=>d.health<d.effectiveMax()),c=e.living().some(d=>d.wounds>0);return(l||c)&&o.push({id:"camp-stair",name:"Camp at the Stairhead",desc:"Sleep and eat before the next floor: 2 supply for 6 healed each and a wound set, and something may find you"}),o}case pe.DISASTER:return[{id:"brace",name:"Brace and Endure",desc:"Shields up, heads down"},{id:"scatter",name:"Scatter and Regroup",desc:"Every hero for themselves"}];default:return[{id:"proceed",name:"Proceed",desc:"Onward and downward"}]}}const fy={brave:{fight:3,"push-through":2,brace:2,flee:-2,"leave-it":-1,"camp-stair":-1},cunning:{sneak:3,disarm:3,bribe:2,inspect:2,"spell-bypass":2,fight:-1,"rope-down":2},greedy:{loot:4,desecrate:2,gather:2,fight:1,sneak:-1,"leave-it":-3,bribe:-2,"camp-stair":-1},scholarly:{study:3,"deep-study":3,"spell-strike":2,"spell-bypass":2},pious:{rest:3,"turn-undead":3,desecrate:-5,"camp-stair":2},reckless:{fight:2,"push-through":3,loot:2,inspect:-2,"search-around":-2,"camp-stair":-3,descend:2},craven:{flee:3,sneak:2,disarm:2,"search-around":2,inspect:1,scatter:2,fight:-2,"push-through":-2,brace:-1,"cause-fear":3,"smoke-bomb":2,"knock-open":1,"camp-stair":3}},py={"knock-open":{base:1.5,cunning:2,scholarly:1},"cause-fear":{base:1.5,cunning:1},"smoke-bomb":{base:1.5,cunning:2}};function my(i,e){const t=e==null?void 0:e.monster;if(!t)return{};const n={},s=(l,c)=>{n[l]=(n[l]||0)+c};return t.trait==="ethereal"&&!i.hasClass(W.CLERIC)&&(s("fight",-2),s("sneak",2),s("spell-strike",2)),t.trait==="armored"&&(s("spell-strike",1.5),s("fight",-.5)),t.trait==="venomous"&&!i.hasClass(W.CLERIC)&&(s("sneak",1.5),s("cause-fear",1.5),s("fight",-1)),t.trait==="swarm"&&s("spell-strike",2),i.grimoire.filter(l=>l.use==="combat"&&l.aoe).some(l=>Qh(l,e).length>0)&&(s("spell-strike",3),s("fight",-1)),i.grimoire.filter(l=>l.use==="combat").some(l=>ys(l,t)>1)&&s("spell-strike",2),n}function gy(i,e){const t=ed(i,e);if(t.length===0)return null;if(t.length===1)return t[0].id;const n=my(e,i),s=t.map(o=>{let l=1;for(const h of e.personalities){const p=fy[h];p&&p[o.id]!==void 0&&(l+=p[o.id])}o.id==="alchemy"&&(l+=3),o.id==="gather"&&(l+=2);const c=py[o.id];if(c){l+=c.base;for(const h of e.personalities)c[h]&&(l+=c[h])}const d=b0(o.id);if(d){l+=1.2;for(const h of e.personalities)d[h]&&(l+=d[h])}if(n[o.id]&&(l+=n[o.id]),o.id==="rest"&&e.totalHealth()/e.totalMaxHealth()<.6&&(l+=3),o.id==="camp-stair"){const h=e.totalHealth()/e.totalMaxHealth();h<.5?l+=5:h<.75?l+=2:l-=2,e.living().some(f=>f.wounds>0)&&(l+=3);const p=Nn(e);e.supply<=(p.campSupply?2:4)&&(l-=4)}if(o.id==="rope-down"&&(l+=e.supply<=3?3:1.5),o.id==="fight"&&e.totalHealth()/e.totalMaxHealth()<.3&&(l-=2),o.id==="flee"&&e.totalHealth()/e.totalMaxHealth()<.3&&(l+=2),o.id==="study"&&(l+=1),o.id==="leave-it"){const h=e.totalHealth()/e.totalMaxHealth();h<.4?l+=4:h<.65&&(l+=1.5),e.supply===0&&(l+=1.5)}return{opt:o,w:Math.max(.1,l)}}),r=s.reduce((o,l)=>o+l.w,0);let a=Math.random()*r;for(const{opt:o,w:l}of s)if(a-=l,a<=0)return o.id;return t[0].id}function vy(i){return`💢 At half health, ${i.name} turns fierce: attack +2 for the rest of the fight.`}const Lc=[{id:"found-charm",type:"equipment",name:"a tarnished luck-charm",icon:"🍀",slot:"trinket",bonus:{mind:1},bestFor:null,text:"Somebody's luck ran out holding it. Perhaps it recharges."},{id:"found-buckle",type:"equipment",name:"a dead adventurer's belt buckle",icon:"🔩",slot:"trinket",bonus:{defense:1},bestFor:null,text:"Sturdy. Its last owner was not."},{id:"found-whetstone",type:"equipment",name:"a whetstone of surprising opinion",icon:"🪨",slot:"trinket",bonus:{attack:1},bestFor:null,text:"It hums when it works. Nobody asks what the tune is."}];function ba(i,e=!1,t=Math.random()){if(!e&&t>.35)return null;const n=Math.floor((e?t:t/.35)*4)%4;if(n===0)return i.potions.push({kind:"healing-draught",heal:6}),{source:"the hoard",find:"potion",text:"🧪 Also in the hoard: a healing draught (heals 6), added to the satchel."};if(n===1)return i.materials+=2,{source:"the hoard",find:"materials",text:"🌿 Also in the hoard: 2 alchemy materials."};if(n===2){const a=Es[Math.floor(t*997)%Es.length];return i.grimoire.push({...a,id:`found-${a.id}-${i.grimoire.length}`,source:"found"}),{source:a.name,find:"scroll",text:`📜 Also in the hoard: a scroll of ${a.name}, added to the grimoire.`}}const s=Lc[Math.floor(t*991)%Lc.length],r=i.assignEquipment({...s,id:`${s.id}-${Date.now().toString(36)}`});return{source:s.name,find:"trinket",text:`🍀 Also in the hoard: ${s.name} (${Zh(s.bonus)}), now worn by ${(r==null?void 0:r.name)||"no one"}.`}}function yy(i,e,t,n={}){const s=x0(t,e,{item:l=>wt(e,l),spell:l=>Mn(e,l),tactic:l=>Ss(e).some(c=>c.id===l)}),r=Ir(s.feature),a=[];if(s.fightOnly){const l=i.monster,c=Nn(e),d=c.featureOpener,h=((r==null?void 0:r.tags)||[]).includes("hazard")?c.hazardDamage:0,p=s.openerDamage+d+h,f=Math.min(p,Math.max(0,l.health-1));l.health=Math.max(1,l.health-p),d&&a.push({source:"improvised arms",text:`🔧 The party knows how to swing what the room left lying about: +${d} to the opening.`}),h&&a.push({source:"pinning",text:`📌 They do not let it climb straight back out: ${h} more damage from the room.`});const v=Wo(i,e,"fight",{formation:n==null?void 0:n.formation,extraCover:s.extraCover||0});return v.preps=[...a,...v.preps||[]],v.feature=s.feature,v.featureAction=t,v.featureDamage=f,v.featureTier=s.tier,v.spellElement=s.element||null,v}const o={success:!0,feature:s.feature,featureAction:t,featureTier:s.tier,preps:a};if(s.gold&&(e.addGold(s.gold),o.gold=s.gold),s.materials&&(e.materials+=s.materials,o.materials=s.materials),s.heal&&(e.healParty(s.heal),o.healed=s.heal),s.curesLinger&&e.poisonLinger>0&&(e.poisonLinger=0,o.curedLinger=!0,a.push({source:"the Great Waterskin",text:"🫗 The venom is flushed out with clean water before it can act again."})),s.weaponMod){const l=e.living().reduce((c,d)=>c.attack>=d.attack?c:d);l.addWeaponMod({...s.weaponMod}),o.weaponMod={...s.weaponMod,target:l.name}}if(s.spell){const l={...s.spell,id:`feature-${t}-${e.grimoire.length}`,source:"prepared",text:"Taken off a dungeon shelf."};if(e.grimoire.push(l),o.spell=l.name,s.extraSpell){const c={...s.spell,id:`feature-${t}-${e.grimoire.length}`,use:"utility",source:"prepared",text:"Taken off a dungeon shelf."};e.grimoire.push(c),o.extraSpell=!0}}if(s.wakesDead){const l=!s.quiet&&Ct()>6.5;o.wokeDead=l,l&&(e.takeDamage(4),o.damage=4,a.push({source:r.name,text:"⚰️ The occupant objects: 4 damage before it is put back down."}))}return i.cleared=!0,e.recordEncounter(t,!0),o}function _y(i,e=Ct()){const t=i.living().filter(r=>r.class===W.ROGUE),n=t.length>0?Math.max(...t.map(r=>r.mind)):Math.floor(i.bestMind()/2);let s=0;return i.hasPersonality("scholarly")&&(s+=1),i.hasPersonality("craven")&&(s+=1),s+=Qn(i).secretDoor,n+s+e>11}function xy(i,e=Ct()){const t=i.living().filter(r=>r.class===W.ROGUE),n=t.length>0?Math.max(...t.map(r=>r.mind))+2:Math.floor(i.bestMind()/2);let s=Qn(i).secretDoor;return i.hasPersonality("craven")&&(s+=1),i.hasPersonality("reckless")&&(s-=1),n+s+e>11}function by(i,e=Ct()){let t=3.5;return i.hasPersonality("craven")&&(t+=3),i.hasPersonality("cunning")&&(t+=1.5),i.hasPersonality("greedy")&&(t-=3),i.hasPersonality("brave")&&(t-=2),i.hasPersonality("scholarly")&&(t-=1),i.totalHealth()/i.totalMaxHealth()<.5&&(t+=3),e<t}function td(i,e){if(!e)return{weight:0,advocate:null};const t=s=>i.hasPersonality(s),n=s=>i.hasClass(s);switch(e){case"crypt":return t("greedy")?{weight:3,advocate:"the Covetous wanted what gets buried with people"}:t("pious")?{weight:2,advocate:"the Devout did not like leaving the dead untended"}:{weight:0,advocate:null};case"works":return n(W.ALCHEMIST)?{weight:4,advocate:"the alchemist wanted the bench"}:t("scholarly")?{weight:2,advocate:"the Scholarly wanted to see what was being made down there"}:{weight:0,advocate:null};case"archive":return t("scholarly")?{weight:4,advocate:"the Scholarly wanted the shelves"}:n(W.WIZARD)?{weight:3,advocate:"the wizard reads everything, on principle"}:{weight:0,advocate:null};case"barracks":return t("greedy")?{weight:3,advocate:"the Covetous wanted the weapon rack"}:t("brave")?{weight:2,advocate:"the Bold wanted whatever was garrisoned there"}:{weight:0,advocate:null};case"sump":return{weight:t("greedy")?1:-2,advocate:null};default:return{weight:0,advocate:null}}}function wy(i,e=Ct(),t=null){let n=4;return i.hasPersonality("greedy")&&(n+=3),i.hasPersonality("scholarly")&&(n+=2),i.hasPersonality("reckless")&&(n+=2),i.hasPersonality("craven")&&(n-=3),i.totalHealth()/i.totalMaxHealth()<.35&&(n-=3),n+=td(i,t).weight,e<n}function Wo(i,e,t,n=null){var s,r;if(w0(t))return yy(i,e,t,n);switch(t){case"fight":{const a=i.monster;let o=a.health,l=0;const c=e.combatItemActions();let d=0,h=0,p=0;for(const ye of c)d+=ye.opening||0,a.undead&&(d+=ye.vsUndead||0),h+=ye.ward||0,p+=ye.summonAttack||0;o-=d;const f=[],v=a.trait==="armored"&&Mn(e,"sp-sunder")?e.castSpell("combat","sp-sunder"):null,g=a.trait==="armored"&&!v?2:0;v&&f.push({source:v.name,text:`💢 ${v.name} reminds the plate it was ore: it stops turning blows for the rest of the fight.`});const m=a.trait==="swarm"&&wt(e,"eq-greatsword")?3:0;m&&f.push({source:"the Greatsword of the Vault",text:`🗡️ The greatsword takes a whole rank of them at a stroke: ${m} more damage a round.`});const u=wt(e,"eq-throwing-knives")?4:0;u&&(o-=u,f.push({source:"the Bandolier of Knives",text:`🔪 Six knives arrive before the party does: ${u} damage before the first round.`}));const x=wt(e,"eq-quicksilver-daggers");x&&f.push({source:"the Quicksilver Daggers",text:"🗡️ The daggers land before the argument starts: nothing comes back in the first round."});const _=Mn(e,"sp-shield")?e.castSpell("combat","sp-shield"):null;_&&(h+=2,f.push({source:_.name,text:`🛡️ ${_.name} goes up before the first blow: 2 less damage every round.`}));const w=y0(i);w.undeadRisk&&wt(e,"eq-blessed-mace")&&(w.undeadRisk=!1,w.notes.push({feature:"sarcophagus",text:"🔨 The Blessed Mace sanctifies the room between swings: whatever was stirring in the stone settles."}));const k=(w.cover||0)+((n==null?void 0:n.extraCover)||0),E=wt(e,"eq-silvered-mirror"),A=e.hasClass(W.CLERIC)||w.revealEthereal||E||!!(n!=null&&n.forceRevealEthereal);a.trait==="ethereal"&&E&&!w.revealEthereal&&f.push({source:"the Silvered Hand-Mirror",text:"🪞 The Silvered Hand-Mirror catches the ethereal thing where it truly stands: weapons do full damage."});const C=a.trait==="ethereal"&&!A?.6:1;for(const ye of w.notes)f.push({source:ye.feature,text:ye.text});n!=null&&n.extraCover&&f.push({source:"the pillars",text:`🏛️ Fighting from the aisles: ${n.extraCover} less damage per round on top of the cover.`}),a.trait==="ethereal"&&!w.revealEthereal&&f.push(e.hasClass(W.CLERIC)?{source:"the cleric",text:"✨ The cleric blesses the blades: the ethereal monster takes full weapon damage."}:{source:a.name,text:"👻 The monster is ethereal and the party's blows pass through it: weapon damage ×0.6 (no cleric to bless the blades)."});for(const ye of(n==null?void 0:n.reactionNotes)||[])f.push(ye);const M=hy((n==null?void 0:n.formation)||cy(e,i),i);f.push({source:M.name,text:`${M.icon} ${M.tell} ${M.effect}`});const y=Nn(e),T=y.flankDamage>0&&e.living().length>=y.flankMin&&M.flanking;T&&f.push({source:"the party's footwork",text:`⚔️ The party has the numbers and uses them: +${y.flankDamage} damage a round.`});const D=a.trait==="armored"&&y.vsArmored?y.vsArmored:0;D&&f.push({source:"focused fire",text:`🎯 Everyone strikes the same seam in the plate: +${D} damage a round.`}),y.cover&&f.push({source:"the shield wall",text:`🛡️ The party closes ranks: ${y.cover} less damage a round.`});const L=y.wardPerCast*((n==null?void 0:n.castsThisFight)||0);L&&f.push({source:"ward-weaving",text:`🕸️ Every working leaves a ward behind it: ${L} less damage a round.`});let B=Math.max(1,a.attack+((n==null?void 0:n.monsterAtkMod)||0)+(y.monsterAtk||0));e.alarmed&&(B+=2,e.alarmed=!1,f.push({source:"the alarm",text:"🔔 The alarm tripped earlier warned it: the monster attacks with +2 this fight."}));const q=(n==null?void 0:n.spellSustain)||0;q>0&&f.push({source:n.spellSustainSource||"the working",text:`✨ The working holds: +${q} damage every round while the fight lasts.`});const z=e.coatingBonusVs(a);z.bonus>0&&f.push({source:z.notes.join(" + "),text:`⚗️ The ${z.notes.join(" and ")} exploits the monster's weakness: +${z.bonus} damage per round.`});let Z=0,$=!1,ee=0;for(;o>0&&e.isAlive()&&Z<12;){Z++;const ye=(T?y.flankDamage:0)+D+m,Fe=Math.max(1,Math.round((e.combatAttack(M.frontage)+p+z.bonus+q+ye+Math.floor(Ct()/3))*C*M.attackMult)-g);if(o-=Fe,o<=0)break;if(a.isBoss&&!$&&o<=a.health/2&&($=!0,B+=2,f.push({source:a.name,text:vy(a)})),ee>0&&e.healParty(ee),(a.trait==="slow"||x)&&Z===1)continue;const X=Math.max(1,Math.round((B-Math.floor(e.totalDefense()/3)-h-k-y.cover-L)*M.incomingMult));e.takeDamage(X),l+=X;const te=e.castHealIfNeeded();if(te){const _e=Math.round(te.spell.effectivePower*Rc);ee+=_e,f.push({source:te.spell.name,text:`💚 ${te.spell.name} closes ${te.target.name}'s wounds mid-fight: ${te.spell.effectivePower} healed in round ${Z}, then ${_e} a round while it holds${te.spell.consumed?" (the scroll is consumed)":""}.`})}e.quaffIfNeeded()}if(Z===0){const ye=/every round|a round while|less damage a round|damage a round/i;for(let Fe=f.length-1;Fe>=0;Fe--)ye.test(f[Fe].text||"")&&f.splice(Fe,1)}const ae=o<=0&&e.isAlive();let Me=null;if(ae){const ye=a.isBoss?100:25;e.addScore(ye),i.cleared=!0;const Fe=Ac(e,a);if(Me=Fe.drop,f.push(Fe),a.trait==="venomous"&&(wt(e,"eq-cursed-blade")?f.push({source:"the Blade of the Adder",text:"🐍 The Blade of the Adder has taught its bearer what venom tastes like: the party shrugs this off."}):e.hasClass(W.CLERIC)?f.push({source:"the cleric",text:"🐍 The monster was venomous, but the cleric cures the poison before it can act."}):(e.poisonLinger=(e.poisonLinger||0)+2,f.push({source:a.name,text:"🐍 The monster was venomous: the party will take 2 poison damage next room (no cleric to cure it)."}))),a.isBoss){const X=ba(e,!0);X&&f.push(X)}e.hasPersonality("reckless")&&(e.addScore(5),f.push({source:"the Reckless",text:"💥 The Reckless finish the fight with style: +5 score."}))}if(e.isAlive()&&l>=6){const ye=e.castSpell("heal");ye&&(e.healParty(ye.effectivePower),f.push({source:ye.name,text:`💚 ${ye.name} heals ${ye.effectivePower} after the fight${ye.consumed?" (the scroll is consumed)":""}.`}))}return e.recordEncounter("fight",ae),{success:ae,rounds:Z,damage:l,monster:a.name,itemActions:c,preps:f,drop:Me,bossPhased:$,formation:M.id}}case"cause-fear":{const a=e.castSpell("combat","sp-fear");return e.addScore(20),i.cleared=!0,e.recordEncounter("cause-fear",!0),{success:!0,monster:i.monster.name,spell:a?a.name:"Cause Fear"}}case"spell-strike":{const a=i.monster,o=[],l=Nn(e),c=e.grimoire.filter(u=>u.use==="combat").length,d=a.isBoss?Math.max(1,c):1+(e.hasClass(W.WIZARD)?1:0)+l.extraCast,h=[];let p=null,f=0;for(let u=0;u<d;u++){const x=e.grimoire.filter(M=>M.use==="combat"&&!e.castThisRoom.has(M.id));let _=null,w=-1;for(const M of x){const y=M.power*ys(M,a);y>w&&(w=y,_=M)}const k=_?e.castSpell("combat",_.id):null;if(!k)break;const E=ys(k,a)*(a.trait==="swarm"?1.5:1);ys(k,a)>1?p=p||"weak":ys(k,a)<1&&(p=p||"resisted"),a.trait==="swarm"&&(p=p||"swarm");const A=Math.round(k.effectivePower*E);a.health=Math.max(1,a.health-A),f+=Math.round(A*(l.sustainFull?1:Rc)),h.push(k);const C=l.allSpellsArea?{...k,aoe:!0}:k;for(const M of Qh(C,i))o.push(M)}const v=a.isBoss&&h.length>1?[{source:"the boss chamber",text:`✨ Nothing is held back for later: the party looses everything it has, ${h.length} workings in the one fight that matters.`}]:[],g=ay(o);if(g.damage&&(a.health=Math.max(1,a.health-g.damage)),g.heal&&e.healParty(g.heal),g.selfHarm&&wt(e,"eq-warded-buckler")&&(g.selfHarm=Math.floor(g.selfHarm/2),g.notes.push({source:"the Warded Buckler",text:"🛡️ The prayers on the inside of the buckler turn aside half of what the party set off."})),g.burn>0&&wt(e,"eq-athanor-charm")&&(g.burn+=2,g.notes.push({source:"the Athanor Charm",text:"🔥 The athanor charm feeds the blaze: 2 more damage a round while it burns."})),g.selfHarm&&!l.noSelfHarm)for(const u of e.living())u.takeDamage(g.selfHarm);else g.selfHarm&&l.noSelfHarm&&g.notes.push({source:"firewatch",text:"🧯 The party set it off and stood well clear: none of it comes back on them."});g.light>0?e.addSupply(g.light):g.light<0&&(e.supply=Math.max(0,e.supply+g.light));for(const u of g.consumed)i.features=(i.features||[]).filter(x=>x!==u);const m=Wo(i,e,"fight",{formation:n==null?void 0:n.formation,spellSustain:f+g.burn,spellSustainSource:h.map(u=>u.name).join(" + ")||null,extraCover:g.cover,castsThisFight:h.length,monsterAtkMod:g.monsterAtk,forceRevealEthereal:g.revealEthereal,reactionNotes:[...v,...g.notes]});return m.spell=((s=h[0])==null?void 0:s.name)||null,m.spellsCast=h.map(u=>u.name),m.spellEdge=p,m.spellElement=((r=h[0])==null?void 0:r.element)||null,m}case"sneak":{const a=Math.max(...e.living().filter(h=>h.class===W.ROGUE).map(h=>h.mind)),o=e.hasPersonality("craven")?1:0,l=Qn(e),c=[];l.notes.sneak&&c.push({source:l.notes.sneak,text:`👢 The ${l.notes.sneak} add +1.5 to the sneak roll.`}),l.notes.sneakLight&&c.push({source:l.notes.sneakLight,text:"💡 Dancing Light revealed the watcher's position: +1 to the sneak roll."});const d=a+o+l.sneak+Ct()>9;return d?(e.addScore(15),i.cleared=!0):e.takeDamage(Math.ceil(i.monster.attack/2)),e.recordEncounter("sneak",d),{success:d,monster:i.monster.name,preps:d?c:[]}}case"turn-undead":{const o=Math.max(...e.living().filter(d=>d.class===W.CLERIC).map(d=>d.mind))+Ct()>8,l=[];let c=null;if(o){e.addScore(30),i.cleared=!0;const d=Ac(e,i.monster);c=d.drop,l.push(d)}else e.takeDamage(i.monster.attack);return e.recordEncounter("turn-undead",o),{success:o,monster:i.monster.name,preps:l,drop:c}}case"bribe":return e.gold-=15,e.addScore(5),i.cleared=!0,{success:!0,goldSpent:15,monster:i.monster.name};case"flee":{i.fled=(i.fled||0)+1;const a=2*i.fled;return e.takeDamage(a),{success:!0,retreated:!0,damage:a,fled:i.fled,monster:i.monster.name}}case"disarm":{const a=Math.max(...e.living().filter(d=>d.class===W.ROGUE).map(d=>d.mind)),o=Qn(e),l=[];o.notes.disarm&&l.push({source:o.notes.disarm,text:"🗝️ The Masterwork Lockpicks add +1.5 to the disarm roll."});const c=a+o.disarm+Ct()>8;return c?(e.addScore(20),i.cleared=!0):(e.takeDamage(Math.ceil(i.trapDamage/2)),i.cleared=!0),e.recordEncounter("disarm",c),{success:c,preps:c?l:[]}}case"push-through":{const a=e.hasPersonality("craven")?1:0,o=Qn(e),l=[];o.trapSoak>0&&l.push({source:o.notes.trapSoak,text:"🏮 The Everburning Lantern showed the pressure plates: 1 less damage."});const c=i.trapType||"spike",d=Mn(e,"sp-feather")?e.castSpell("utility","sp-feather"):null;d&&l.push({source:d.name,text:`🪶 ${d.name} takes the party's weight off the floor: 3 less damage from anything underfoot.`});let h=Math.max(1,(i.trapDamage||3)-a-o.trapSoak-(d?3:0));if(c==="fire"){const p=Nn(e).fireTrapSoak;p?(h=Math.max(1,h-p),l.push({source:"firewatch",text:`🧯 The party reads the jet before it fires and is not standing there: ${p} less damage.`})):Mn(e,"sp-frost")?(h=Math.max(1,h-2),l.push({source:"Frost Lance",text:"❄️ Frost Lance counters the flame jet: 2 less damage."})):h+=1}else c==="poison"?(h=Math.max(1,Math.ceil(h/2)),e.hasClass(W.CLERIC)?l.push({source:"the cleric",text:"🐍 The needles hit, but the cleric cures the venom on the spot."}):(e.poisonLinger=(e.poisonLinger||0)+2,l.push({source:"the trap",text:"🐍 Poison needles: the party will take 2 poison damage next room (no cleric to cure it)."}))):c==="alarm"&&(h=Math.min(h,2),e.alarmed=!0,l.push({source:"the alarm",text:"🔔 The alarm rings through the dungeon: the next monster will attack with +2."}));return e.takeDamage(h),i.cleared=!0,{success:!0,damage:h,spotted:a>0,trapType:c,preps:l}}case"smoke-bomb":return e.materials-=1,e.addScore(15),i.cleared=!0,e.recordEncounter("smoke-bomb",!0),{success:!0,materialsLeft:e.materials};case"search-around":{const a=e.bestMind()+Ct()>8;return a||e.takeDamage(Math.ceil((i.trapDamage||3)/2)),i.cleared=!0,{success:a}}case"spell-bypass":{const a=e.castSpell("utility");return i.cleared=!0,e.addScore(10),{success:!0,spell:a?a.name:null}}case"loot":{if(Math.random()<(i.mimicChance||0))return e.takeDamage(5),e.addGold(Math.floor((i.gold||20)/2)),i.cleared=!0,{success:!1,mimic:!0,gold:Math.floor((i.gold||20)/2)};e.addGold(i.gold||20),i.cleared=!0;const o=[],l=ba(e,i.type===pe.VAULT);return l&&o.push(l),{success:!0,gold:i.gold||20,preps:o}}case"inspect":{const a=Qn(e),o=[];let l=Math.floor((i.gold||20)*.8);a.cleanInspect&&(l=i.gold||20,o.push({source:a.notes.cleanInspect,text:`🔍 ${a.notes.cleanInspect==="the Cunning"?"The Cunning eye":"The Masterwork Lockpicks"} found everything: the full gold taken, nothing missed.`})),e.addGold(l),i.cleared=!0;const c=ba(e,i.type===pe.VAULT);return c&&o.push(c),{success:!0,gold:l,careful:!0,preps:o}}case"knock-open":{const a=e.castSpell("utility","sp-knock"),o=i.gold||20;return e.addGold(o),i.cleared=!0,e.recordEncounter("knock-open",!0),{success:!0,gold:o,spell:a?a.name:"Knock",consumed:a?a.consumed:!1,wasMimic:Math.random()<(i.mimicChance||0)}}case"leave-it":return i.cleared=!0,{success:!0,gold:0};case"study":{const a=e.hasPersonality("scholarly")?2:1;e.spellsLearned+=a,e.addScore(a*20);for(let o=0;o<a;o++)e.grimoire.push({id:`learned-${Date.now()}-${o}`,name:"Found Cantrip",icon:"📜",school:"found",power:3,use:Math.random()<.5?"combat":"utility",source:"prepared",text:"Copied from the stacks."});return i.cleared=!0,{success:!0,learned:a}}case"deep-study":{const a=Math.max(...e.living().filter(d=>d.class===W.WIZARD).map(d=>d.mind)),o=Qn(e),l=o.deepStudy>0?[{source:o.notes.deepStudy,text:"📖 The Grimoire of Low Whispers adds +1.5 to the reading roll."}]:[],c=a+o.deepStudy+Ct()>9;return c?(e.spellsLearned+=2,e.addScore(50),e.grimoire.push({id:`sealed-${Date.now()}`,name:"Sealed Working",icon:"🔏",school:"forbidden",power:6,use:"combat",source:"prepared",text:"The margins screamed. The wizard did not."})):e.takeDamage(4),i.cleared=!0,e.recordEncounter("deep-study",c),{success:c,preps:c?l:[]}}case"brew-oil":{e.materials-=1;const a=e.addSupply(2);return i.cleared=!0,{success:!0,preps:[{source:"the Portable Alembic",text:`⚗️ A material goes into the alembic and comes out as lamp oil: ${a} more march${a===1?"":"es"} of light.`}]}}case"rest":{const a=e.hasPersonality("pious")?4:0,o=Nn(e).mendAtShrine,l=[];if(o)for(const d of e.living())d.wounds>0&&(d.mendWounds(o),l.push(d.name));for(const d of e.living())d.heal(5+a);i.cleared=!0;const c=l.length?[{source:"field surgery",text:`✚ Somebody sets what the march only bandaged: a wound closed on ${l.join(", ")} without waiting for town.`}]:[];return{success:!0,healed:5+a,mended:l,preps:c}}case"desecrate":return e.addGold(30),e.desecrated=!0,i.cleared=!0,{success:!0,gold:30,ominous:!0};case"alchemy":{const a=e.doAlchemy();return i.cleared=!0,e.addScore(25),{success:!0,alchemy:a}}case"gather":return e.materials+=i.materials||1,e.addScore(5),i.cleared=!0,{success:!0,materials:i.materials||1};case"descend":{const a=Math.min(1,e.supply);return e.supply-=a,i.cleared=!0,{success:!0,descended:!0,supplySpent:a}}case"rope-down":return i.cleared=!0,{success:!0,descended:!0,supplySpent:0,preps:[{source:"the Grapple and Line",text:"🪢 The line goes down the shaft beside the stair: the party descends without burning a march of oil."}]};case"camp-stair":{const a=Nn(e),o=a.campSupply?Math.max(1,2-a.campSupply):2,l=Math.min(o,e.supply);e.supply-=l;const c=6;let d=0;for(const g of e.living()){const m=g.health;g.heal(c),d+=g.health-m}const h=e.living().filter(g=>g.wounds>0).sort((g,m)=>m.wounds-g.wounds)[0]||null;h&&h.mendWounds(1);const p=!a.campWatched&&Ct()>=5;let f=0;p&&(f=4+Math.floor(Ct()/2),e.takeDamage(f)),i.cleared=!0;const v=a.campWatched?[{source:"Cold Camp",text:`🏕️ No fire and a watch kept: the camp costs ${l} supply and nothing finds it.`}]:[];return{success:!0,descended:!0,camped:!0,healed:c,healedTotal:d,mended:(h==null?void 0:h.name)||null,supplySpent:l,damage:f,interrupted:p,preps:v}}case"brace":{const a=e.desecrated?8:5;e.takeDamage(Math.max(1,a-Math.floor(e.totalDefense()/4))),i.cleared=!0;const o=[],l=e.castSpell("heal");return l&&(e.healParty(l.effectivePower),o.push({source:l.name,text:`💚 ${l.name} heals ${l.effectivePower} as the dust settles.`})),{success:!0,damage:a,preps:o}}case"scatter":{let a=0;for(const o of e.living())Ct()<4&&(o.takeDamage(3),a++);return i.cleared=!0,{success:a<=1,hurt:a}}case"pass-by":case"proceed":default:return i.cleared=!0,{success:!0}}}const My={[W.FIGHTER]:{brave:["Stand back — this is the part I'm for.","If it bleeds on me, that's how I know it's working."],cunning:["A fight you skip counts double.","I hit hardest from the side nobody's watching."],greedy:["The sword's just how I open lockboxes.","Everything down here is carrying something. I collect.","Danger pay. Emphasis on pay."],scholarly:["I read a treatise on this maneuver. Chapter three. Brace.","Footwork is just grammar for the body."],pious:["My shield has a saint on it. She's watching. Form up.","The body is a temple. Mine's a fortress."],reckless:["Plan? I'm the plan.","Last one in buys the ale!"],craven:["I'll guard the rear. Someone has to. Far back.","My shield works best with me behind it and everything else very far away."],generic:["Behind me.","This is the job."]},[W.CLERIC]:{brave:["Faith walks in front. So do I.","The light goes first. I merely follow it, loudly."],cunning:["Grace favors the well-prepared.","The god helps those who check for tripwires."],greedy:["Tithes flow both directions, technically.","The god counts. So do I.","Even the dead tithe here. Especially the dead."],scholarly:["The liturgy has a verse for this. Several, actually.","The commentaries disagree. I don't."],pious:["We are exactly where we are meant to be. Regrettably.","Candles first. Then courage."],reckless:["The god forgives. That's the whole strategy.","Heal fast, ask later."],craven:["I have a strong feeling we should be elsewhere. Call it prophecy.","The god counsels prudence. Loudly. Through me. Right now."],generic:["Steady. All of you, steady.","Wounds after. Walking now."]},[W.WIZARD]:{brave:["I did not memorize this spell to whisper it.","Range is a suggestion. Watch."],cunning:["There's a cheaper way to do this. There always is.","Why duel what you can outwit?"],greedy:["Knowledge is treasure, but treasure is also treasure.","Transmutation started as a hobby. It's a livelihood now.","What that thing drops will fund a semester of research."],scholarly:["Fundamentals of Sorcery, volume three, page ninety: this exact mistake.","Fascinating. Everyone stand behind me while I annotate."],pious:["Magic is prayer with better handwriting.","I asked permission for this spell. Twice."],reckless:["Overchannel? I call it generous casting.","The safety margin is where the good magic lives."],craven:["I know a spell for this. It's called leaving.","I did not survive the academy by standing in the open."],generic:["Allow me.","This will only take a syllable."]},[W.ROGUE]:{brave:["Quietly is for people with time.","I'll scout it — from inside."],cunning:["Every door is a suggestion.","Doors, guards, promises — all pickable."],greedy:["It isn't stealing if the owner's a skeleton.","My fingers itch. That means gold, or a rash.","I already know which part of it sells."],scholarly:["The lock's a three-pin Herrengrave. The book was wrong about them. I'm not.","I've studied every trap in the codex. This one's new. Wonderful."],pious:["Even locks answer to providence. I just expedite.","I confess in advance. Saves time."],reckless:["Traps are just puzzles with stakes.","I disarm faster when it's already ticking."],craven:["There's a wire there. I noticed it while planning my retreat.","I've counted the exits. There are three. I love them all."],generic:["Give me a moment, and don't watch.","Nobody move. Especially the floor."]},[W.ALCHEMIST]:{brave:["I've drunk worse than whatever that is.","Every explosion is a lesson. Class is in session."],cunning:["Measure twice, pour once.","Add nothing until you know what it does. Then add plenty."],greedy:["Gold in, gold out — that's the whole science.","Everything in this room fits in my satchel if I believe.","Don't burn the carcass — half my income is in the glands."],scholarly:["The notes end mid-sentence. I intend to finish them.","Peer review can wait. The flask can't."],pious:["The Work is a devotion. The explosions are incidental.","As above, so below. Mind the fumes between."],reckless:["Shake it and see.","If it smokes, it works. If it screams, it works better."],craven:["I keep my hazards bottled, thank you.","Run first. The reaction can finish without us."],generic:["I have something for this. Probably.","Don't breathe in until I say."]}},Sy=4;let _s=[];function Ey(i,e=[],t=Math.random){const n=My[i];if(!n)return null;const s=[];for(const l of e)n[l]&&s.push(...n[l]);s.length===0&&s.push(...n.generic);const r=s.filter(l=>!_s.includes(l)),a=r.length>0?r:s,o=a[Math.floor(t()*a.length)];return _s.push(o),_s.length>Sy&&_s.shift(),o}function Ty(){_s=[]}const Pc={delve:"The party enters the Old Delve: rats, skeletons, and goblin toll-gangs between here and the boss.",crypt:"The party enters the Ancient Crypt. Most monsters here are undead — holy damage and a cleric's turning work well.",volcanic:"The party enters the Cinder Galleries. Fire traps hit harder here, and most monsters resist fire but hate frost.",library:"The party enters the Drowned Athenaeum. Extra libraries to study in; several of its monsters burn easily.",madlab:"The party enters the Mad Alchemist's Dungeon. A lab is guaranteed, materials are common, and much of what lives here is venomous.",castle:"The party enters the Castle of the Vampire Lord. Treasure is plentiful; most of the household is undead or ethereal.",bogcellar:"The party enters the Root Cellar of the Bog Witch. Poison traps and venomous monsters, with a stillroom lab guaranteed.",icecaverns:"The party enters the Ice Caverns of the Mad Pyromancer. Disasters are frequent, and fire and frost weaknesses run through everything."},kc={castle:"The candles go out: the castle itself attacks the party in the dark.",bogcellar:"A shelf of jars breaks over the party; what spills is corrosive and moving.",icecaverns:"A fire vent meets the cavern ice: a scalding steam blast fills the room.",volcanic:"Lava surges into the passage; the party must get clear before it closes the way.",crypt:"The tomb lids open at once and the dead press in from every side.",library:"The stacks collapse and the floodwater rises; falling shelves and water both do damage.",madlab:"An unattended reaction runs out of control and fills the room with caustic vapor."},wa={entrance:["The party gathers at the dungeon entrance and starts down."],corridor:["A connecting corridor. Nothing blocks the way; the party moves through."],stairs:["A stair cut into the rock, going down. Cold air comes up it.","The floor ends at a stairwell. Whatever is below has been waiting longer.","Steps down, worn in the middle by traffic that stopped a long time ago."],monster:["A monster holds the room. The party must decide how to get past it."],trap:["A trap blocks the corridor. The party must disarm it, avoid it, or take the hit."],treasure:["A treasure chest sits in the room. It may hold gold; it may be a mimic."],library:["A library. The party can study here to learn spells."],shrine:["A shrine. Resting here heals the party; the gold leaf on the altar could be stripped instead."],lab:["An alchemy lab with a working bench. An alchemist with materials can brew or coat weapons here."],materials:["A room of herbs, salts, and quicksilver — alchemy materials, free to gather."],disaster:["The dungeon itself turns hostile. The party must brace together or scatter."],boss:["The boss chamber. Killing what waits here clears the dungeon."],vault:["A hidden vault, stacked with treasure. Vaults always hold something beyond coin."]};function Ay(i,e=null){var r;const t=i.living().find(a=>a.class===W.ROGUE),n=t?t.name:((r=i.living()[0])==null?void 0:r.name)||"Someone",s=e!=null&&e.tell?` Behind it: ${e.tell}.`:"";return`🕳️ ${n} finds a hidden door into ${(e==null?void 0:e.name)||"a side passage"}.${s} Its rooms join the route.`}function Ry(i,e=null,t=null){const n=(e==null?void 0:e.name)||"the side passage",s=e!=null&&e.tell?` — ${e.tell}`:"",r=e!=null&&e.tell?` (${e.tell})`:"";return i?t?`🧭 ${t[0].toUpperCase()}${t.slice(1)}: the party turns off into ${n}. Its rooms join the route.`:`🧭 The party turns off into ${n}${s}. Its rooms join the route.`:`🚶 The party looks into ${n}${r} and keeps to the main route.`}function Ic({outcome:i,rooms:e,damage:t,floors:n=0,finder:s}){const r=n>0?` on ${xs(n)}`:"";return i==="descend"?`🕳️ ${s} finds a trapdoor in the floor. The party ropes down the shaft and lands${r}, skipping ${e} room${e===1?"":"s"} ahead and taking ${t} damage.`:i==="refused"?`🕳️ ${s} finds a trapdoor in the floor. The party leaves it shut: the rooms it skips hold loot as well as danger.`:i==="fell"?`🕳️ The floor gives way — a hidden trapdoor. The party lands${r||" further down the same level"}, ${e} room${e===1?"":"s"} past where they were, taking ${t} damage, and the rooms between go unlooted.`:""}const Dc={"brew-oil":"cook a material down into lamp oil",fight:"stand and fight",flee:"fall back",sneak:"sneak past","turn-undead":"turn the undead",bribe:"pay the toll","spell-strike":"open with a combat spell",disarm:"disarm the trap","push-through":"push through and take the hit","search-around":"search for a way around","spell-bypass":"bypass it with a utility spell",loot:"loot the treasure",inspect:"inspect it first","leave-it":"leave it alone",study:"study the shelves","deep-study":"read the sealed texts",rest:"rest and heal",desecrate:"strip the gold leaf","pass-by":"move on",proceed:"move on",alchemy:"work the lab bench",gather:"gather the materials",brace:"brace together",scatter:"scatter and regroup","knock-open":"open it with Knock","cause-fear":"cast Cause Fear","smoke-bomb":"spring it with a smoke bomb",descend:"take the stair down","rope-down":"rope down the shaft beside it","camp-stair":"camp at the stairhead first","shove-into-pit":"shove it into the pit","shove-onto-spikes":"put it onto the floor spikes","shove-into-chasm":"put it down the crack in the floor","topple-boulder":"topple the boulder onto it","shove-into-brazier":"shove it into the brazier","drop-portcullis":"drop the portcullis on it","fight-from-cover":"fight from behind the pillars","pry-sarcophagus":"pry the sarcophagus open","bless-the-font":"bless the font and drink","fill-waterskins":"fill the waterskins","harvest-spout":"harvest the spout","sift-rubble":"sift the rubble","crack-crates":"crack the crates open","work-the-anvil":"put an edge back on at the anvil","strip-the-shelves":"strip the shelves"},Nc={brave:["the Bold voted to meet it head-on","the Bold saw no reason to be careful about it","the Bold wanted it settled here"],cunning:["the Cunning picked the safer angle","the Cunning looked for the way that costs least","the Cunning had already worked out the odds"],greedy:["the Covetous wanted the payout","the Covetous counted what was in the room first","the Covetous refused to leave anything behind"],scholarly:["the Scholarly wanted the knowledge","the Scholarly wanted a closer look before anything else","the Scholarly argued from what the books say about this"],pious:["the Devout called it the right thing to do","the Devout said the god would want it this way","the Devout would not hear of the other options"],reckless:["the Reckless did not wait for a vote","the Reckless were already moving","the Reckless settled it by going first"],craven:["the Craven pushed for the safest option","the Craven wanted no part of the alternative","the Craven argued for whatever kept a door behind them"]},Cy={fight:W.FIGHTER,sneak:W.ROGUE,disarm:W.ROGUE,"turn-undead":W.CLERIC,rest:W.CLERIC,"deep-study":W.WIZARD,"spell-strike":W.WIZARD,"spell-bypass":W.WIZARD,alchemy:W.ALCHEMIST,gather:W.ALCHEMIST};function Ly(i,e,t){const n=Dc[i]||i,s=e.filter(c=>c.id!==i).slice(0,2).map(c=>Dc[c.id]||c.id);let r=null;const a=Cy[i];if(a&&t.hasClass(a)){const c=t.living().find(h=>h.class===a),d=Ey(c.class,t.personalities);r=d?`${c.name} made the case: "${d}"`:`${c.name} made the case`}else for(const c of t.personalities)if(Nc[c]){r=sn(Nc[c]);break}r||(r="nobody argued");const o=r.endsWith('"')?"":".";return s.length===0?`There was only one option: the party chose to ${n}.`:`They might have chosen to ${s.length===2?`${s[0]}, or ${s[1]}`:s[0]} — ${r}${o} The party chose to ${n}.`}function Py(i,e){const t=ai[i],n=Ir(t.feature),s=(n==null?void 0:n.icon)||"🧱",r=(n==null?void 0:n.name)||"the furniture";if(t.fightOnly){const l=e.featureDamage??t.openerDamage;switch(i){case"shove-into-pit":return`${s} The party shoves the monster into ${r}: ${l} damage, and it has to climb back out.`;case"shove-onto-spikes":return`${s} The party drives the monster back onto ${r}: ${l} damage, and it has to pull itself off them.`;case"shove-into-chasm":return`${s} The party works the monster to the edge and puts it into ${r}: ${l} damage on the way down.`;case"topple-boulder":return`${s} The party topples ${r} down the slope onto the monster: ${l} damage.`;case"shove-into-brazier":return`${s} The party drives the monster into ${r}: ${l} fire damage.`;case"drop-portcullis":return`${s} The winch lets go and ${r} comes down across the monster: ${l} damage.`;case"fight-from-cover":return`${s} The party backs into ${r} and makes the monster come down one aisle at a time: ${l} damage as it closes.`;default:return`${s} The party turns ${r} against the monster: ${l} damage.`}}const a=[];i==="pry-sarcophagus"?a.push(`${s} The party pries the lid off ${r}`):i==="bless-the-font"?a.push(`${s} The cleric says the words over ${r} and the party drinks`):i==="fill-waterskins"?a.push(`${s} The party fills its waterskins at ${r}`):i==="harvest-spout"?a.push(`${s} The alchemist bottles what drips from ${r}`):i==="sift-rubble"?a.push(`${s} The party sifts ${r}`):i==="crack-crates"?a.push(`${s} The party cracks open ${r}`):i==="work-the-anvil"?a.push(`${s} The party works ${r}`):i==="strip-the-shelves"?a.push(`${s} The wizard strips ${r}`):a.push(`${s} The party uses ${r}`);const o=[];return e.gold&&o.push(`${e.gold} gold`),e.materials&&o.push(`${e.materials} material${e.materials===1?"":"s"}`),e.healed&&o.push(`${e.healed} health healed`),e.spell&&o.push(`a scroll of ${e.spell} for the grimoire`),e.weaponMod&&o.push(`${e.weaponMod.name} on ${e.weaponMod.target}'s weapon (+${e.weaponMod.attack} attack)`),e.curedLinger&&o.push("the lingering venom flushed out"),`${a[0]}: ${o.length?o.join(", "):"nothing worth carrying"}.`}function Ma(i){return i.rounds?`⚔️ The party kills ${i.monster} in ${i.rounds} round${i.rounds===1?"":"s"}, taking ${i.damage} damage.`:`⚔️ ${Oi(i.monster)} is dead before the party closes: it never gets a round.`}const ky=["the entrance level","the second floor","the third floor","the fourth floor"];function xs(i){return ky[i]||"the floor below"}const Iy=["The party moves on to the next room.","Nothing here needs doing. The party walks on.","The party crosses the room and takes the far door.","There is nothing to fight and nothing to take. The party keeps going.","The party files through and leaves the room behind."];function Dy(i,e,t,n){var r,a;const s=[];if(ai[e]){s.push(Py(e,t)),ai[e].fightOnly&&s.push(t.success?t.rounds===0?`⚔️ ${Oi(t.monster)} is finished before it can strike back.`:Ma(t):`☠️ Even so, ${t.monster} beats the party down.`);for(const l of t.preps||[])s.push(l.text);return s.join(" ")}switch(e){case"fight":{const o=(r=t.itemActions)==null?void 0:r.find(l=>l.opening||l.vsUndead||l.summonAttack);if(o){const l=o.opening?`${o.opening}${o.vsUndead&&((a=i.monster)!=null&&a.undead)?` (+${o.vsUndead} vs undead)`:""} damage before round one`:o.summonAttack?`a summon adding ${o.summonAttack} attack each round`:"its effect";s.push(`🪄 ${o.member} uses the ${o.item} — ${o.name}: ${l}.`)}t.success&&t.rounds===0?s.push(`⚔️ ${Oi(t.monster)} is killed before it can strike back. The party takes no damage.`):t.success?s.push(Ma(t)):s.push(`☠️ ${Oi(t.monster)} is too strong: the party is beaten down over ${t.rounds} round${t.rounds===1?"":"s"}.`);break}case"spell-strike":{t.spell?t.spellEdge==="weak"?s.push(`🔥 The caster opens with ${t.spell}, chosen precisely for the monster's ${t.spellElement} weakness: spell damage ×1.5.`):t.spellEdge==="swarm"?s.push(`🔥 ${t.spell} opens the fight; against a swarm the spell hits ×1.5.`):t.spellEdge==="resisted"?s.push(`🔥 ${t.spell} opens the fight, but the monster resists the element: spell damage ×0.5.`):s.push(`🔥 ${t.spell} opens the fight, softening the monster before the first blow.`):s.push("🔥 No combat spell was available, so the party fights with weapons alone."),t.success&&t.rounds!==void 0?s.push(Ma(t)):t.success||s.push(`☠️ Even softened, ${t.monster} beats the party down.`);break}case"sneak":s.push(t.success?`🗡️ The rogue leads the party past ${t.monster} unseen. No damage taken; +15 score.`:`🗡️ The sneak fails: ${t.monster} notices and lands a blow before the party scrambles clear.`);break;case"turn-undead":s.push(t.success?`✨ The cleric turns the undead: ${t.monster} crumbles. +30 score.`:`✨ The turning fails: ${t.monster} attacks while the cleric recovers.`);break;case"bribe":s.push(`💰 The party pays ${t.goldSpent||15} gold and ${t.monster} lets them pass. No fight.`);break;case"cause-fear":s.push(`😱 ${t.spell||"Cause Fear"} routs ${t.monster}: the room clears without a fight. +20 score.`);break;case"smoke-bomb":s.push("⚗️ The alchemist spends 1 material on a smoke concoction and springs the trap from a safe distance. No damage taken.");break;case"knock-open":s.push(t.wasMimic?`🚪 ${t.spell} opens the chest from across the room — it was a mimic, and it springs at nothing. ${t.gold} gold taken safely.${t.consumed?" The scroll is consumed.":""}`:`🚪 ${t.spell} opens the lock at range: ${t.gold} gold taken.${t.consumed?" The scroll is consumed.":""} The noise carries through the dungeon.`);break;case"flee":s.push(sn(qy)(t.fled||1,t.damage??2));break;case"disarm":s.push(t.success?"🗝️ The rogue disarms the trap. No damage taken; +20 score.":"🗝️ The disarm fails: the trap springs for half damage.");break;case"push-through":s.push(`💥 The party pushes through the trap, taking ${t.damage} damage.${t.spotted?" The Craven spotted the tripwire first: 1 less damage.":""}`);break;case"loot":s.push(t.mimic?`🦷 The chest is a mimic. It bites for 5 damage before the party kills it, recovering ${t.gold} gold.`:`💰 The party loots the chest: ${t.gold} gold.`);break;case"inspect":s.push(`🔍 The party checks for mimics and curses first, then takes ${t.gold} gold safely.`);break;case"leave-it":s.push("🚶 The party leaves the treasure untouched and moves on.");break;case"study":s.push(`📚 The party studies the shelves and learns ${t.learned} spell${t.learned>1?"s":""}.`);break;case"deep-study":s.push(t.success?"🔏 The wizard reads the sealed texts: 2 spells learned, including a forbidden working. +50 score.":"🔏 The sealed text backfires: the wizard takes 4 damage and learns nothing.");break;case"rest":s.push(`🕯️ The party rests at the shrine: ${t.healed} health healed per member.`);break;case"desecrate":s.push("⛏️ The party strips 30 gold of leaf from the altar. The next disaster will hit harder for it.");break;case"alchemy":{const o=t.alchemy;o?o.type==="potion"?s.push(`⚗️ The alchemist spends 1 material and brews a healing draught (heals 6)${o.doubled?" — two, in fact; Perenelle works in doubles":""}.`):s.push(`⚗️ The alchemist spends 1 material and applies ${o.mod.name} to ${o.target}'s weapon: +${o.mod.attack} attack.`):s.push("⚗️ The bench is usable but the satchel is empty: no materials, nothing brewed.");break}case"gather":s.push(`🌿 The party gathers ${t.materials} bundle${t.materials>1?"s":""} of alchemy materials.`);break;case"brew-oil":s.push("⚗️ The alembic goes on the bench and a bundle of materials becomes light to march by.");break;case"brace":s.push(`🌋 The party braces together and rides it out: ${t.damage} damage taken.`);break;case"scatter":s.push(t.success?"🌋 The party scatters; nearly everyone finds cover. Minimal damage.":`🌋 The party scatters; ${t.hurt} member${t.hurt===1?"":"s"} guessed wrong and took 3 damage each.`);break;case"descend":s.push(`🪜 The party goes down the stair to ${xs(i.descendsTo)}, ${t.supplySpent===1?"burning a march of oil on the climb":"and the lamp is already out"}.`);break;case"rope-down":s.push(`🪜 The party ropes down the shaft beside the stair and lands on ${xs(i.descendsTo)}.`);break;case"camp-stair":{const o=t.mended?` A night off their feet sets one of ${t.mended}'s wounds.`:"";s.push(t.interrupted?`🏕️ The party makes camp at the stairhead and something climbs the stair into it: ${t.healed} healed each, ${t.damage} damage taken, and ${xs(i.descendsTo)} still to go.${o}`:`🏕️ The party makes camp at the stairhead and eats before the climb: ${t.healed} healed each, then down to ${xs(i.descendsTo)}.${o}`);break}default:s.push(sn(Iy))}for(const o of t.preps||[])s.push(o.text);return s.join(" ")}const Ny={low:[i=>`🕯️ The lantern is burning low: oil for ${i} more ${i===1?"march":"marches"}.`,i=>`🕯️ The wick is well down the oil. ${i} more ${i===1?"march":"marches"} of light, then none.`,i=>`🕯️ Someone checks the reservoir and does not like the answer: oil for ${i} more ${i===1?"march":"marches"}.`],guttered:[()=>"🕯️ The last of the oil goes. From here the party walks in the dark.",()=>"🕯️ The flame stands up, thins, and is gone. The party is out of oil.",()=>"🕯️ The lantern dies with the party still under the hill. No more light to carry."],conjured:[(i,e)=>`💡 ${i} carries the march instead of oil: none of the ${e} damage the dark would have taken.`,(i,e)=>`💡 No oil left, so ${i} does the work — light enough to walk by, and ${e} damage nobody pays.`,(i,e)=>`💡 ${i} kindles in the empty air and the party walks on seeing. The dark takes nothing.`],"sure-footed":[(i,e)=>`🪶 ${i} takes the party's weight off the floor: they walk the dark without walking into it, and pay none of the usual ${e}.`,(i,e)=>`🪶 No light, but no stumbling either — ${i} carries them through blind and whole, ${e} damage unpaid.`,(i,e)=>`🪶 ${i} means the floor never tells them what they hit. Nothing does: ${e} damage avoided.`],"dark-seen":[(i,e)=>`👁️ ${i} makes the dark no trouble: the party walks on, ${e} damage unpaid.`,(i,e)=>`👁️ ${i} reads the black like a page, and the march costs nothing.`,(i,e)=>`👁️ ${i} leads them through whole — none of the usual ${e} damage.`]},Uc=[i=>`🌑 The party gropes through the dark and pays for it: ${i} damage to everyone.`,i=>`🌑 Another march by touch alone. Walls, edges, and things underfoot take ${i} from each of them.`,i=>`🌑 The dark is telling now. Everyone is bleeding somewhere they cannot see: ${i} damage each.`,i=>`🌑 They have stopped calling it a march. ${i} damage to everyone, again, and the hill goes on.`];function Uy(i){var t;if(!i)return null;if(i.kind==="dark"){const n=Math.max(1,i.darkMarches||1),s=Uc[Math.min(n,Uc.length)-1],r=n===1&&((t=i.temper)!=null&&t.length)?" "+i.temper.map(a=>a.text).join(" "):"";return s(i.damage)+r}const e=Ny[i.kind];return e?i.kind==="conjured"||i.kind==="sure-footed"||i.kind==="dark-seen"?sn(e)(i.source,i.full):sn(e)(i.supply):null}const Oy=[(i,e)=>`✚ ${i} takes a wound that will not close down here. Healing can bring them back to ${e}, no further, until town.`,(i,e)=>`✚ That one leaves a mark on ${i}. Their ceiling drops to ${e} for the rest of the delve.`,(i,e)=>`✚ ${i} is opened up badly enough that the delve will keep it: ${e} is as whole as they get until town.`],Fy=[(i,e,t)=>`✚ ${i} is wounded again — ${t} scars now, and nothing can heal them past ${e} before town.`,(i,e,t)=>`✚ ${t} wounds on ${i}, and the ceiling with them: ${e}, and no more.`];function By(i){return!i||i.length===0?null:"🕯️ "+i.map(e=>e.text).join(" ")}function zy(i,e=null){const t=i.effectiveMax?i.effectiveMax():i.maxHealth,n=i.wounds>1?sn(Fy)(i.name,t,i.wounds):sn(Oy)(i.name,t);return e!=null&&e.length&&i.wounds===1?`${n} ${e.map(s=>s.text).join(" ")}`:n}function Hy(i){if(!i||i.wounds===0)return null;const e=i.names.length===1?i.names[0]:`${i.names.slice(0,-1).join(", ")} and ${i.names[i.names.length-1]}`;return`✚ The town surgeon sets what the march only bandaged: ${i.wounds} wound${i.wounds===1?"":"s"} closed on ${e}, and full health is theirs again.`}function Oc(i){if(!i)return null;const{tactic:e,reason:t,missing:n,capability:s}=i;if(t==="requires")return`${e.icon} ${e.name} is drafted but idle: it grows out of ${n.name}, and nobody in this party has learned that.`;const r={cast:"a working in the grimoire to use it on",attack:"somebody still standing"}[s]||"something this party does not have";return`${e.icon} ${e.name} is drafted but idle: it wants ${r}.`}function Gy(i){return!i||i.length===0?null:`The party has drilled: ${i.map(t=>`${t.icon} ${t.name}`).join(", ")}.`}function us(i){return`☠️ ${i.name} falls. The party's ${i.class} is dead; the survivors march on.`}function nd(i,e){const t=i.trophies||[];if(t.length===0)return"";const n=t[t.length-1];return e?` Trophies carried out: ${t.length} (latest: ${n.icon} ${n.name}).`:` Trophies lost with them: ${t.length} (latest: ${n.icon} ${n.name}).`}function $y(i,e,t=null){const n=i.members.map(r=>r.name).join(", ");return`The party is wiped out${t?` in ${t.name}`:""}. The dead: ${n}. Rooms cleared: ${e}.${nd(i,!1)}`}function Vy(i,e,t=null){const n=i.living().map(r=>r.name).join(", ");return`${t?`${t.name} is cleared`:"The dungeon is cleared"}: the boss is dead and the party walks out. Survivors: ${n}. Rooms cleared: ${e}.${nd(i,!0)}`}function Wy(i,e){return`The party returns to town after depth ${e}. Healing, potions, recruits, and the smith are all paid for in gold. The next dungeon waits at depth ${e+1}, and it will be harder: stronger monsters, deadlier traps, richer hoards.`}const qy=[(i,e)=>i>1?`💨 They back out again and it follows further this time: ${e} damage on the way.`:`💨 The party retreats, taking ${e} damage on the way out. The room stays hostile; they will have to try it again.`,(i,e)=>i>1?`💨 Out through the same door a second time, ${e} damage the toll. There is no third.`:`💨 The party gives ground, ${e} damage on the way out, and the room keeps what it was holding.`,(i,e)=>i>1?`💨 Another retreat, and it costs ${e} this time. The room is winning this by attrition.`:`💨 They fall back, paying ${e} for the room they do not take.`],Xy=[i=>`They are back. ${i===2?"The room has not improved.":`This is the ${i}${i===3?"rd":"th"} time, and it knows them now.`}`,i=>`The same room again${i>3?", and the party is running out of ways to describe it":""}. Whatever is in it has had time to think.`,i=>`Back through the same door, for the ${i===2?"second":i===3?"third":`${i}th`} time. Nothing here has forgotten them.`];function Sa(i,e=null){var n;if((i==null?void 0:i.fled)>=2&&!i.cleared)return`They are back, and there is no backing out this time: ${((n=i.monster)==null?void 0:n.name)||"it"} is between them and the door.`+Ta(i.monster);if((i==null?void 0:i.visits)>1&&!i.cleared)return sn(Xy)(i.visits)+Ta(i.monster);if(i.type===pe.ENTRANCE&&e&&Pc[e.id])return Pc[e.id];if(i.type===pe.DISASTER&&e&&kc[e.id])return`${kc[e.id]} The party must brace together or scatter.`;if((i.type===pe.BOSS||i.type===pe.MONSTER)&&i.monster){const s=i.monster,r=s.attack!=null&&s.health!=null?` (attack ${s.attack}, health ${s.health})`:"";return(i.type===pe.BOSS?`The boss chamber. ${Oi(s.name)} waits at its center${r}; killing it clears the dungeon.`:`${Oi(s.name)} holds the room${r}. The party must decide how to get past it.`)+Ta(s)+Ea(i)}if(i.type===pe.TRAP&&i.trapType&&zc[i.trapType])return`${sn(wa.trap)} ${zc[i.trapType]}${Ea(i)}`;const t=wa[i.type]||wa.corridor;return sn(t)+Ea(i)}function Ea(i){const e=$o(i);return e.length===0?"":" "+e.map(t=>t.tell).join(" ")}const Fc={armored:"Plate and chitin cover it: the party's blows do 2 less damage each round.",ethereal:"It is ethereal: weapons do only 60% damage unless a cleric blesses the blades.",venomous:"It is venomous: even a won fight leaves poison working, unless a cleric cures it.",swarm:"It is a swarm: spell openings hit it ×1.5.",slow:"It is slow: the party strikes first and takes no damage in round one."},Bc={fire:"It keeps clear of the torches: weak to fire (fire damage ×1.5).",frost:"It flinches from the cold: weak to frost (frost damage ×1.5).",shock:"Its hairs stand on end: weak to shock (shock damage ×1.5).",holy:"It will not face the cleric: undead take holy damage ×1.5."};function Ta(i){const e=[];i.trait&&Fc[i.trait]&&e.push(Fc[i.trait]);const t=i.undead?"holy":(i.weak||[])[0];return t&&Bc[t]&&e.push(Bc[t]),e.length?" "+e.join(" "):""}const zc={fire:"Scorch marks fan out from a seam in the floor: a fire trap. A frost spell can blunt it.",poison:"Dead beetles ring one tile: a poison trap. Light damage now, lingering venom later unless a cleric cures it.",alarm:"A tripwire runs up the wall to a bell: an alarm trap. Little damage, but the next monster will be warned (+2 attack)."};function sn(i){return i[Math.floor(Math.random()*i.length)]}function Oi(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}class Yy{constructor(e,t="delve",n="medium",s={}){var l,c;this.seed=t,this.difficulty=n,this.depth=Math.max(1,s.depth||1),this.party=e instanceof ii?e:new ii(e),this.dungeon=s.layout?W0(s.layout):H0(t,n,{wantLab:this.party.hasClass(W.ALCHEMIST),theme:s.theme,depth:this.depth,condition:s.condition}),this.condition=this.dungeon.condition,this.path=this.dungeon.spine.slice(),this.party.provision(this.path.length,n),this.roomIndex=0,this.turn=0,this.roomsCleared=0,this.gameOver=!1,this.victory=!1,this.paused=!1,this.epitaph=null,this.lastNarration=null,this.log=[],this.chronicle=s.chronicle instanceof Vi?s.chronicle:new Vi(this.party.members.map(d=>d.name).join(", ")||"the party"),Ty(),this.chronicle.beginDelve({seed:t,difficulty:n,depth:this.depth,theme:((l=this.dungeon.theme)==null?void 0:l.name)||null,condition:this.condition&&this.condition.id!=="none"?this.condition.name:null,roster:this.party.members.map(d=>`${d.icon} ${d.name} (${d.class})`+(d.backstory?` — ${d.backstory}`:""))}),this.stateBefore=Tc(this);const r=By(this.party.provisionNotes);r&&(this.log.push(r),this.chronicle.recordAside(r));const a=Gy(Ss(this.party));a&&(this.log.push(a),this.chronicle.recordAside(a));for(const d of el(this.party)){const h=Oc(d);this.log.push(h),this.chronicle.recordAside(h)}const o={easy:1,medium:1.5,hard:2,nightmare:3}[n]||1;this.scoreMultiplier=o*(1+(((c=this.condition)==null?void 0:c.scoreBonus)||0))}addLog(e){this.log.push(e)}tick(){if(this.paused||this.gameOver)return;const e=this.log.length;try{this._tick()}finally{this.recordTick(e)}}recordTick(e=this.log.length){var s,r;const t=Tc(this),n=j0(this.stateBefore,t,{turn:this.turn,room:((s=this.lastNarration)==null?void 0:s.room)||null});for(const a of this.log.slice(e))n.push({turn:this.turn,room:((r=this.lastNarration)==null?void 0:r.room)||null,field:null,icon:"·",text:a,salience:at.BEAT,described:!0});if(this.stateBefore=t,this.lastEvents=n,this.lastNarration)this.chronicle.recordRoom(this.lastNarration,n);else if(n.length)for(const a of n)this.chronicle.recordAside(a.text,a.salience)}_tick(){this.turn++,this.roomIndex++;const e=this.path[this.roomIndex],t=e!==void 0?this.dungeon.getRoom(e):null;if(!t){this.finish(!0);return}const n=this.party.living(),s=new Map(this.party.members.map(_=>[_.name,_.wounds])),r=this.party.restStep(),a=Uy(r);if(a&&this.addLog(a),!this.party.isAlive()){this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:"dark",predicament:Sa(t,this.dungeon.theme),deliberation:"There is no light left to decide anything by.",resolution:a+" The last of the party does not get up.",falls:this.party.members.filter(_=>!_.isAlive()).map(_=>us(_)),aside:null},this.finish(!1);return}const o=n.filter(_=>!_.isAlive()),l=new Set(o.map(_=>_.name)),c=o.map(_=>us(_));for(const _ of c)this.addLog(_);const d=n,h=this.party.applyLinger();if(h&&!this.party.isAlive()){this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:"linger",predicament:Sa(t,this.dungeon.theme),deliberation:"The lingering venom acts before anything can be decided.",resolution:`🐍 The venom carried from the last fight deals ${h.damage} damage, and the last of the party falls.`,falls:d.filter(_=>!_.isAlive()).map(_=>us(_)),aside:null},this.finish(!1);return}t.visits=(t.visits||0)+1;const p=Sa(t,this.dungeon.theme),f=ed(t,this.party),v=gy(t,this.party),g=Wo(t,this.party,v);this.lastResult=g,g.formation&&(this.lastFormation=g.formation);const m=d.filter(_=>!_.isAlive()&&!l.has(_.name));(g.success!==!1||t.cleared)&&this.roomsCleared++,this.lastNarration={turn:this.turn,room:t.type,icon:t.icon,roomIndex:e,action:v,offered:f.map(_=>_.id),spellElement:g.spellElement||null,predicament:p,deliberation:Ly(v,f,this.party),resolution:Dy(t,v,g,this.party),falls:[...c,...m.map(_=>us(_))],wounds:this.party.members.filter(_=>_.isAlive()&&_.wounds>(s.get(_.name)??0)).map(_=>zy(_,hr(this.party).woundNotes)),supply:this.party.supply,aside:h?h.cured?"🐍 The cleric cures the lingering venom on the march: no damage taken.":`🐍 The venom carried from the last room acts: ${h.damage} damage taken on the march.`:a};const u=this.party.isAlive()?this.dungeon.branchAt(e):null;if(u)if(u.secret){if(_y(this.party)){u.consumed=!0;for(const _ of u.rooms)this.dungeon.rooms[_].discovered=!0;this.path.splice(this.roomIndex+1,0,...u.rooms),this.lastNarration.aside=[this.lastNarration.aside,Ay(this.party,u)].filter(Boolean).join(" "),this.addLog("🕳️ A hidden door!")}}else{u.consumed=!0;const _=wy(this.party,void 0,u.wing);_&&this.path.splice(this.roomIndex+1,0,...u.rooms);const w=td(this.party,u.wing);this.lastNarration.aside=[this.lastNarration.aside,Ry(_,u,_?w.advocate:null)].filter(Boolean).join(" ")}const x=this.party.isAlive()?this.dungeon.trapdoorAt(e):null;if(x&&this.resolveTrapdoor(x),this.addLog(`${t.icon} Room ${this.roomIndex}: ${t.type} — ${v}`),g.retreated&&this.roomIndex--,!this.party.isAlive()){this.finish(!1);return}t.type===pe.BOSS&&t.cleared&&(this.party.addScore(Math.round(100*this.scoreMultiplier)),this.finish(!0))}resolveTrapdoor(e){var h,p;e.consumed=!0;const t=this.path.indexOf(e.to),n=t-this.roomIndex-1;if(t<=this.roomIndex||n<=0)return;const s=((h=this.dungeon.rooms[e.from])==null?void 0:h.floor)||0,r=((p=this.dungeon.rooms[e.to])==null?void 0:p.floor)||0,a=Math.max(0,r-s),o=!e.secret||xy(this.party);let l;if(o?l=by(this.party)?"descend":"refused":l="fell",l==="refused"){this.lastNarration.aside=[this.lastNarration.aside,Ic({outcome:l,finder:this.trapdoorFinder()})].filter(Boolean).join(" ");return}const c=l==="descend"?Math.max(1,Math.ceil(e.fall/2)):e.fall,d=this.party.living();this.party.takeDamage(c),this.path.splice(this.roomIndex+1,n);for(const f of this.dungeon.rooms.map((v,g)=>g))f===e.to&&(this.dungeon.rooms[f].discovered=!0);this.lastNarration.aside=[this.lastNarration.aside,Ic({outcome:l,rooms:n,damage:c,floors:a,finder:this.trapdoorFinder()})].filter(Boolean).join(" "),this.lastNarration.falls=[...this.lastNarration.falls||[],...d.filter(f=>!f.isAlive()).map(f=>us(f))],this.addLog(`🕳️ Trapdoor: ${n} room${n===1?"":"s"} skipped, ${c} damage.`),this.party.isAlive()||this.finish(!1)}trapdoorFinder(){var t;const e=this.party.living().find(n=>n.class===W.ROGUE);return e?e.name:((t=this.party.living()[0])==null?void 0:t.name)||"Someone"}finish(e){this.gameOver=!0,this.victory=e,this.epitaph=e?Vy(this.party,this.roomsCleared,this.dungeon.theme):$y(this.party,this.roomsCleared,this.dungeon.theme),this.addLog(e?"🏆 The dungeon is beaten!":"☠️ The party has fallen."),this.chronicle.endDelve({victory:e,epitaph:this.epitaph,roomsCleared:this.roomsCleared,score:this.party.score,gold:this.party.gold,trophies:this.party.trophies.length,survivors:this.party.living().length,turns:this.turn})}getState(){var t;const e=Math.min(this.roomIndex,this.path.length-1);return{turn:this.turn,roomIndex:this.roomIndex,currentRoomIndex:this.path[e],floor:((t=this.dungeon.rooms[this.path[e]])==null?void 0:t.floor)||0,pathLength:this.path.length,knownIdxs:[...this.path.slice(0,this.roomIndex+2),this.dungeon.spine[this.dungeon.spine.length-1]],dungeon:this.dungeon,depth:this.depth,theme:{id:this.dungeon.theme.id,name:this.dungeon.theme.name,icon:this.dungeon.theme.icon,tagline:this.dungeon.theme.tagline},condition:this.condition&&this.condition.id!=="none"?{id:this.condition.id,name:this.condition.name,icon:this.condition.icon,text:this.condition.text}:null,party:{members:this.party.members.map(n=>({name:n.name,class:n.class,icon:n.icon,health:n.health,maxHealth:n.maxHealth,attack:n.attack,defense:n.defense,mind:n.mind,alive:n.isAlive(),wounds:n.wounds,effectiveMax:n.effectiveMax(),equipment:n.equipment.map(s=>s.name),weaponMods:n.weaponMods.map(s=>s.name)})),reserve:this.party.reserve.map(n=>({name:n.name,class:n.class,icon:n.icon})),supply:this.party.supply,gold:this.party.gold,score:this.party.score,materials:this.party.materials,poisonLinger:this.party.poisonLinger||0,alarmed:!!this.party.alarmed,potions:this.party.potions.length,trophies:this.party.trophies.map(n=>({name:n.name,icon:n.icon})),grimoire:this.party.grimoire.map(n=>n.name),spellsLearned:this.party.spellsLearned,personalities:this.party.personalities,formation:this.lastFormation||"line",tactics:Ss(this.party).map(n=>({name:n.name,icon:n.icon})),dormantTactics:el(this.party).map(n=>Oc(n))},gameOver:this.gameOver,victory:this.victory,epitaph:this.epitaph,narration:this.lastNarration,log:this.log.slice(-12)}}getChronicle(){return this.chronicle}getRunResult(){return{score:this.party.score,gold:this.party.gold,roomsCleared:this.roomsCleared,turns:this.turn,victory:this.victory,survivors:this.party.living().length,partySize:this.party.members.length,spellsLearned:this.party.spellsLearned,trophies:this.party.trophies.length,epitaph:this.epitaph}}setPaused(e){this.paused=e}}const jy=new Map(So.map(i=>[i.id,i.effect])),id=12,Hc={perRound:id,perFight:2.5,perRoom:2,oneShot:1,situational:.5,resource:3},Ky={flankDamage:"perRound",cover:"perRound",monsterAtk:"perRound",vsArmored:"perRound",wardPerCast:"perRound",ward:"perRound",burn:"perRound",sustain:"perRound",attack:"perRound",defense:"perRound",opening:"perFight",damage:"perFight",featureOpener:"perFight",summonAttack:"perRound",extraCast:"perRoom",heal:"perRoom",supply:"resource",mendAtShrine:"resource",materials:"resource",potions:"resource",health:"perRound",mind:"perFight",fireTrapSoak:"situational",campSupply:"situational",hazardDamage:"perFight",vsUndead:"situational",selfHarm:"perFight",light:"resource"},Jy={defense:1/3,health:1,mind:1/2},Zy=new Set(["monsterAtk","selfHarm"]),Qy={sustainFull:12,allSpellsArea:10,noSelfHarm:6,undeadQuelled:4,revealEthereal:5,campWatched:4,hazardShoves:8,consumes:-2};function fs(i={}){let e=0;const t=[],n=[];for(const[s,r]of Object.entries(i)){if(s==="flankMin")continue;if(typeof r=="boolean"){if(!r)continue;const h=Qy[s];if(h===void 0){n.push(s);continue}e+=h,t.push({key:s,kind:"flag",worth:h});continue}if(typeof r!="number"||r===0)continue;const a=Ky[s];a||n.push(s);const o=Hc[a]??Hc.oneShot,l=Jy[s]??1,c=Zy.has(s)?r<0:r>0,d=Math.abs(r)*l*o*(c?1:-1);e+=d,t.push({key:s,kind:a||"unscaled",face:r,conversion:l,scale:o,worth:d})}return{total:e,parts:t,unknown:n}}function e_(i){if(!i)return{total:0,parts:[],unknown:[]};switch(i.type){case"character":{const e=i.stats||{};return fs({health:(e.health||0)/id,attack:e.attack||0,defense:e.defense||0,mind:e.mind||0})}case"equipment":{const e={...i.bonus||{}};for(const t of Object.values(i.classActions||{}))for(const[n,s]of Object.entries(t))typeof s=="number"&&(e[n]=Math.max(e[n]||0,s));return fs(e)}case"spell":{const e=i.power||0;return fs({damage:e,sustain:i.use==="utility"?0:e*.5})}case"tactic":{const e=i.effect||jy.get(i.id)||{};return fs(e)}default:return fs({})}}const Gt={healPerHp:2,potion:15,piousDiscount:.75,forge:20,forgeMod:{name:"smith's edge",attack:2},shopBase:35,shopPerWorth:1.8};function t_(i,e=1){const t=Math.max(1,e_(i).total),n=Gt.shopBase+t*Gt.shopPerWorth;return Math.round(n*(1+.12*(e-1)))}function n_(i,e=1){const t=i.stats,n=t.health+t.attack*2+t.defense*2+t.mind;return Math.round((12+n)*(1+.15*(e-1)))}class sd{constructor(e,{seed:t="campaign",difficulty:n="medium",condition:s="none",layout:r=null}={}){this.party=e instanceof ii?e:new ii(e),this.seed=t,this.difficulty=n,this.condition=s,this.layout=r,this.depth=0,this.roomsCleared=0,this.over=!1,this.retired=!1}nextDelve(e=void 0){return this.over?null:(this.depth++,new Yy(this.party,`${this.seed}-depth-${this.depth}`,this.difficulty,{depth:this.depth,theme:e,condition:this.condition,layout:this.depth===1?this.layout:null}))}recordDelve(e){this.roomsCleared+=e.roomsCleared,e.victory||(this.over=!0)}missingHealth(){return this.party.living().reduce((e,t)=>e+(t.maxHealth-t.health),0)}healCost(){const e=this.missingHealth()*Gt.healPerHp,t=this.party.hasPersonality("pious")?Gt.piousDiscount:1;return Math.ceil(e*t)}healAll(){const e=this.healCost(),t=this.missingHealth();if(t===0||this.party.gold<e)return null;this.party.gold-=e;const n=this.party.living().filter(r=>r.wounds>0),s={wounds:n.reduce((r,a)=>r+a.wounds,0),names:n.map(r=>r.name)};for(const r of this.party.living())r.mendWounds(),r.heal(r.maxHealth);return{healed:t,cost:e,mended:s}}buyPotion(){return this.party.gold<Gt.potion?!1:(this.party.gold-=Gt.potion,this.party.potions.push({kind:"healing-draught",heal:6}),!0)}shopOffers(){if(this._shopDepth!==this.depth){const e=new As(`${this.seed}-shop-${this.depth}`),t=new Set([...this.party.members.flatMap(s=>s.equipment.map(r=>r.id)),...this.party.reserve.flatMap(s=>s.equipment.map(r=>r.id)),...this.party.pack.map(s=>s.id),...this.party.grimoire.map(s=>s.id)]),n=[...To,...Es].filter(s=>!t.has(s.id)&&!s.cursed);this._shopOffers=e.shuffle(n).slice(0,3).map(s=>({card:s,price:t_(s,Math.max(1,this.depth))})),this._shopDepth=this.depth}return this._shopOffers.filter(e=>e)}buyFromShop(e,t=null){var l;const s=this.shopOffers().find(c=>c.card.id===e);if(!s||this.party.gold<s.price)return null;this.party.gold-=s.price;const r={...s.card};let a=null;r.type==="spell"?this.party.grimoire.push({...r,source:"bought"}):t?(this.party.pack.push(r),a=((l=this.party.equipTo(r.id,t))==null?void 0:l.to)||null,a||(a=this.party.assignEquipment(r))):a=this.party.assignEquipment(r);const o=this._shopOffers.findIndex(c=>c&&c.card.id===e);return this._shopOffers[o]=null,{card:r,price:s.price,wearer:a}}recruitOffers(){if(this._recruitDepth!==this.depth){const t=new As(`${this.seed}-hire-${this.depth}`).shuffle(Eo);this._recruitDepth=this.depth,this._recruitOffers=t.slice(0,2).map(n=>({card:n,cost:n_(n,this.depth)}))}return this._recruitOffers.filter(e=>e)}callUpReserve(){return this.party.promoteReserve()}recruit(e){const t=this.recruitOffers(),n=t.findIndex(l=>l&&l.card.id===e);if(n===-1)return null;const{card:s,cost:r}=t[n];if(this.party.gold<r)return null;this.party.gold-=r;const a=this.party.addMember(s),o=this._recruitOffers.findIndex(l=>l&&l.card.id===e);return this._recruitOffers[o]=null,a}forgeCost(){return Gt.forge+(this.depth-1)*4}forge(){const e=this.forgeCost(),t=this.party.living();if(t.length===0||this.party.gold<e)return null;this.party.gold-=e;const n=t.reduce((r,a)=>r.attack>=a.attack?r:a),s={...Gt.forgeMod};return n.addWeaponMod(s),{target:n.name,mod:s}}retire(){this.over=!0,this.retired=!0}getSummary(){return{depth:this.depth,score:this.party.score,gold:this.party.gold,roomsCleared:this.roomsCleared,survivors:this.party.living().length,partySize:this.party.members.length,spellsLearned:this.party.spellsLearned,trophies:this.party.trophies.length,retired:this.retired,over:this.over}}}const Gc={EASY:{id:"easy",name:"Easy",icon:"🌱",scoreMultiplier:1},MEDIUM:{id:"medium",name:"Medium",icon:"🌳",scoreMultiplier:1.5},HARD:{id:"hard",name:"Hard",icon:"⛰️",scoreMultiplier:2},NIGHTMARE:{id:"nightmare",name:"Nightmare",icon:"💀",scoreMultiplier:3}},$c="dungeonab_progression";class i_{constructor(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.loadFromStorage()}recordRun(e,t){this.runHistory.unshift({id:`run_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,timestamp:Date.now(),difficulty:e,score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:t.victory,survivors:t.survivors,partySize:t.partySize,depth:t.depth||1,condition:t.condition||null}),this.runHistory.length>50&&(this.runHistory=this.runHistory.slice(0,50)),(!this.bestScores[e]||t.score>this.bestScores[e])&&(this.bestScores[e]=t.score),t.victory&&(this.victories[e]=(this.victories[e]||0)+1),this.totalRuns++,this.saveToStorage()}getStats(){const e=Object.values(this.victories).reduce((t,n)=>t+n,0);return{totalRuns:this.totalRuns,totalVictories:e,bestScores:{...this.bestScores},avgScore:this.totalRuns>0?Math.round(this.runHistory.reduce((t,n)=>t+n.score,0)/Math.min(this.totalRuns,this.runHistory.length)):0}}getRecentRuns(e=5){return this.runHistory.slice(0,e)}saveToStorage(){typeof localStorage>"u"||localStorage.setItem($c,JSON.stringify({runHistory:this.runHistory,bestScores:this.bestScores,totalRuns:this.totalRuns,victories:this.victories}))}loadFromStorage(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem($c);if(!e)return;const t=JSON.parse(e);this.runHistory=t.runHistory||[],this.bestScores=t.bestScores||{},this.totalRuns=t.totalRuns||0,this.victories=t.victories||{}}catch(e){console.error("Failed to load progression:",e)}}reset(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.saveToStorage()}}const ni=new i_;function s_(i,{seed:e,difficulty:t,condition:n,targetDepth:s}){const r=new sd(i.map(o=>({...o})),{seed:e,difficulty:t,condition:n});let a=0;for(let o=0;o<s;o++){const l=r.nextDelve();if(!l)break;let c=0;for(;!l.gameOver&&c++<500;)l.tick();if(r.recordDelve(l),a++,r.over)break}return{score:r.party.score,depthReached:a}}function r_(i,e,t={}){const{seed:n="table",difficulty:s="medium",condition:r="none",hexes:a={}}=t,o=Math.max(1,e.depth||1),l=[];for(const c of i.seats.filter(d=>d.isAI)){const d=a[c.id]?Sn(a[c.id]):null,h=d?nh(r,d):r,p=s_(c.pool,{seed:`${n}-rival-${c.id}`,difficulty:s,condition:h,targetDepth:o});l.push({name:c.name,icon:c.icon,isPlayer:!1,hexIcon:d&&d.id!=="none"?d.icon:null,...p})}return l.push({name:"You",icon:"🗡️",isPlayer:!0,score:e.score,depthReached:o,hexIcon:e.hexIcon||null}),l.sort((c,d)=>d.score-c.score||d.depthReached-c.depthReached),l.forEach((c,d)=>{c.place=d+1}),l}const Vc="dungeonab_dungeon_archive",a_=30;class o_{constructor(e=null){this.storage=e||(typeof localStorage<"u"?localStorage:null),this.entries=[],this.load()}load(){if(this.storage)try{this.entries=JSON.parse(this.storage.getItem(Vc)||"[]")}catch{this.entries=[]}}persist(){if(this.storage)try{this.storage.setItem(Vc,JSON.stringify(this.entries))}catch{}}save(e){var n;const t={id:`dgn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,date:Date.now(),custom:!1,...e};if(this.entries.unshift(t),this.entries.length>a_){const s=(n=this.entries.map((r,a)=>[r,a]).reverse().find(([r])=>!r.custom))==null?void 0:n[1];this.entries.splice(s!==void 0?s:this.entries.length-1,1)}return this.persist(),t}update(e,t){const n=this.entries.find(s=>s.id===e);return n?(Object.assign(n,t),this.persist(),n):null}get(e){return this.entries.find(t=>t.id===e)||null}remove(e){const t=this.entries.length;return this.entries=this.entries.filter(n=>n.id!==e),this.persist(),this.entries.length<t}list(){return this.entries}}const vr=new o_,l_={entrance:"#8fb8dd",corridor:"#555",monster:"#c84c3c",trap:"#e8724a",treasure:"#d8a53f",library:"#b07ae8",shrine:"#e8d48a",lab:"#3cb8a8",materials:"#4a8a5c",disaster:"#e05555",boss:"#ff4444",vault:"#ffd75e",stairs:"#7a7f8a"},c_=["monster","gold","mimicChance","trapDamage","materials"];function h_(i,e,t){const n=i.rooms.find(r=>r.index===e),s=[pe.ENTRANCE,pe.BOSS,pe.STAIRS];if(!n||s.includes(n.type)||s.includes(t))return!1;for(const r of c_)delete n[r];return n.type=t,Object.assign(n,q0(t,oi[i.themeId]||oi.delve)),!0}function d_(i,e,t){const n=i.branches[e];if(!n)return!1;n.secret=t;for(const r of n.rooms){const a=i.rooms.find(o=>o.index===r);a&&(a.secret=t)}const s=i.edges.find(r=>r.b===n.rooms[0]);return s&&(s.secret=t),!0}function Wc(i,e){const t=i.getContext("2d"),n=i.width,s=i.height;t.clearRect(0,0,n,s),t.fillStyle="#0d0b08",t.fillRect(0,0,n,s);const r=T=>T.w||4,a=T=>T.h||4,o=T=>T.floor||0,l=[...new Set(e.rooms.map(o))].sort((T,D)=>T-D),c=T=>{const D=e.rooms.filter(L=>o(L)===T);return{x0:Math.min(...D.map(L=>L.x-r(L)/2)),y0:Math.min(...D.map(L=>L.y-a(L)/2)),w:Math.max(...D.map(L=>L.x+r(L)/2))-Math.min(...D.map(L=>L.x-r(L)/2)),h:Math.max(...D.map(L=>L.y+a(L)/2))-Math.min(...D.map(L=>L.y-a(L)/2))}},d=new Map(l.map(T=>[T,c(T)])),h=Math.max(...l.map(T=>d.get(T).w)),p=Math.max(...l.map(T=>d.get(T).h)),f=h+4,v=T=>l.indexOf(o(T)),g=T=>T.x-d.get(o(T)).x0+v(T)*f,m=T=>T.y-d.get(o(T)).y0,u=0,x=l.length*f-4,_=0,w=p,k=10,E=l.length>1?14:k,A=Math.min((n-k*2)/Math.max(1,x-u),(s-E-k)/Math.max(1,w-_)),C=T=>k+(g(T)-u)*A,M=T=>E+(m(T)-_)*A,y=new Map(e.rooms.map(T=>[T.index,T]));for(const T of e.edges){const D=y.get(T.a),L=y.get(T.b);if(!D||!L)continue;const B=T.kind==="trapdoor",q=T.kind==="stair";t.beginPath(),t.setLineDash(B?[1,3]:q?[2,2]:T.secret?[3,3]:[]),t.strokeStyle=B?"#c85a3c":q?"#7a7f8a":T.secret?"#d8a53f":"#4a443a",t.lineWidth=B?1:1.5,t.moveTo(C(D),M(D)),t.lineTo(C(L),M(L)),t.stroke()}t.setLineDash([]);for(const T of e.rooms){const D=Math.max(3,r(T)*A),L=Math.max(3,a(T)*A);t.fillStyle=l_[T.type]||"#777",T.shape==="rotunda"?(t.beginPath(),t.arc(C(T),M(T),Math.min(D,L)/2,0,Math.PI*2),t.fill()):t.fillRect(C(T)-D/2,M(T)-L/2,D,L),T.secret&&(t.strokeStyle="#ffd75e",t.lineWidth=1,t.strokeRect(C(T)-D/2-1.5,M(T)-L/2-1.5,D+3,L+3))}l.length>1&&(t.fillStyle="#8a7a58",t.font="9px system-ui, sans-serif",t.textAlign="left",t.textBaseline="top",l.forEach((T,D)=>{t.fillText(`Floor ${T+1}`,k+D*f*A,2)}));for(const T of e.trapdoors||[]){const D=y.get(T.from);if(!D)continue;t.fillStyle=T.secret?"#6a3a2a":"#111",t.strokeStyle="#c85a3c",t.lineWidth=1;const L=Math.max(3,A*1.4);t.fillRect(C(D)-L/2,M(D)-L/2,L,L),t.strokeRect(C(D)-L/2,M(D)-L/2,L,L)}}function u_({onDelve:i}){const e=document.getElementById("archive-overlay"),t=document.getElementById("archive-body"),n=document.getElementById("archive-btn"),s=document.getElementById("archive-close-btn"),r=l=>{const c=document.createElement("div");return c.textContent=l,c.innerHTML},a=()=>{const l=vr.list();t.innerHTML=l.length?"":'<div class="records-empty">No dungeons archived yet. Finish a delve and its design is kept here.</div>';for(const c of l){const d=document.createElement("div");d.className="arch-item";const h=c.outcome||{};d.innerHTML=`
        <canvas width="150" height="96"></canvas>
        <div style="flex:1;min-width:0;">
          <div style="color:#d8a53f;font-weight:bold;">${c.custom?"✏️ ":""}${r(c.name||"Unnamed delve")}</div>
          <div style="color:#887755;font-size:0.72rem;">
            ${h.victory===!0?"🏆":h.victory===!1?"☠️":"📐"}
            ${c.layout.rooms.length} rooms · ${c.layout.branches.filter(p=>p.secret).length} secret ·
            ${new Date(c.date).toLocaleDateString()}
          </div>
          <div style="display:flex;gap:0.35rem;margin-top:0.4rem;flex-wrap:wrap;">
            <button data-act="delve" style="font-size:0.72rem;padding:0.3rem 0.6rem;">⚔️ Delve</button>
            <button data-act="edit" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a2213;color:#d8a53f;">✏️ Edit</button>
            <button data-act="del" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a1515;color:#e08080;">🗑️</button>
          </div>
        </div>
      `,Wc(d.querySelector("canvas"),c.layout),d.querySelector('[data-act="delve"]').addEventListener("click",()=>{e.classList.remove("active"),i(c)}),d.querySelector('[data-act="edit"]').addEventListener("click",()=>o(c)),d.querySelector('[data-act="del"]').addEventListener("click",()=>{vr.remove(c.id),a()}),t.appendChild(d)}},o=l=>{var g;const c=JSON.parse(JSON.stringify(l.layout)),d=Object.values(pe).filter(m=>m!=="entrance"&&m!=="boss");t.innerHTML=`
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
    `;const h=document.getElementById("arch-edit-map"),p=()=>Wc(h,c),f=document.getElementById("arch-rooms");for(const m of c.rooms){const u=document.createElement("div");u.style.cssText="display:flex;gap:0.5rem;align-items:center;padding:0.15rem 0;border-bottom:1px dashed #2a2318;";const x=m.type==="entrance"||m.type==="boss";u.innerHTML=`
        <span style="width:1.6rem;color:#665;">#${m.index}</span>
        <span style="width:0.9rem;">${m.secret?"🕳️":""}</span>
        ${x?`<span style="color:#887755;">${m.type} (fixed)</span>`:`<select data-idx="${m.index}" style="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:3px;font-family:inherit;font-size:0.75rem;">
              ${d.map(_=>`<option value="${_}"${_===m.type?" selected":""}>${_}</option>`).join("")}
            </select>`}
      `,(g=u.querySelector("select"))==null||g.addEventListener("change",_=>{h_(c,m.index,_.target.value),p()}),f.appendChild(u)}const v=document.getElementById("arch-branches");c.branches.forEach((m,u)=>{const x=document.createElement("label");x.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;";const _=m.name||"A side passage";x.innerHTML=`<input type="checkbox" ${m.secret?"checked":""} />
        ${_[0].toUpperCase()}${_.slice(1)} off room #${m.junction}
        (${m.rooms.length} room${m.rooms.length>1?"s":""}) is secret`,x.querySelector("input").addEventListener("change",w=>{d_(c,u,w.target.checked),p()}),v.appendChild(x)}),document.getElementById("arch-back").addEventListener("click",a),document.getElementById("arch-save").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";vr.save({name:m,layout:c,custom:!0,seed:l.seed,outcome:{}}),a()}),document.getElementById("arch-delve-now").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";e.classList.remove("active"),i({name:m,layout:c})}),p()};n.addEventListener("click",()=>{a(),e.classList.add("active")}),s.addEventListener("click",()=>e.classList.remove("active")),e.addEventListener("click",l=>{l.target===e&&e.classList.remove("active")})}const Li="dungeonab_custom_cards",bo="dungeonab_imported_packs",yr="dungeonab_pack_prefs",Dt={get(i,e){try{return JSON.parse(localStorage.getItem(i))??e}catch{return e}},set(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}};function wo(i){return{id:"my-cards",name:"My Cards",description:"Cards from the workshop.",cards:i}}function f_(){const i=Dt.get(yr,{}),e=Dt.get(Li,[]);e.length&&Ts(wo(e),{enabled:i["my-cards"]!==!1});for(const t of Dt.get(bo,[]))try{Ts(t,{enabled:i[t.id]!==!1})}catch{}return i}function p_(){const i=document.getElementById("cards-overlay"),e=document.getElementById("cards-body");document.getElementById("cards-btn").addEventListener("click",()=>{r(),i.classList.add("active")}),document.getElementById("cards-close-btn").addEventListener("click",()=>i.classList.remove("active")),i.addEventListener("click",a=>{a.target===i&&i.classList.remove("active")});const t="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.35rem;border-radius:4px;font-family:inherit;font-size:0.8rem;",n=a=>{const o=document.createElement("div");return o.textContent=a,o.innerHTML};function s(a){Dt.set(Li,a),a.length&&Ts(wo(a))}function r(){const a=Dt.get(Li,[]);Dt.get(yr,{}),e.innerHTML=`
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
        My Cards (${a.length})</div>
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
    `;const o=document.getElementById("ce-fields"),l=document.getElementById("ce-type"),c=()=>{const f=l.value;f==="character"?o.innerHTML=`
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0.3rem;font-size:0.75rem;">
            <select id="ce-class" style="${t}">${Object.values(W).map(v=>`<option>${v}</option>`).join("")}</select>
            <input id="ce-hp" type="number" value="14" title="health" style="${t}" />
            <input id="ce-atk" type="number" value="4" title="attack" style="${t}" />
            <input id="ce-def" type="number" value="3" title="defense" style="${t}" />
            <input id="ce-mind" type="number" value="3" title="mind" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">class · health · attack · defense · mind — budget: health + 2×atk + 2×def + mind ≤ ${yn.character.statTotal}</div>`:f==="equipment"?o.innerHTML=`
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.3rem;font-size:0.75rem;">
            <input id="ce-eatk" type="number" value="0" title="+attack" style="${t}" />
            <input id="ce-edef" type="number" value="0" title="+defense" style="${t}" />
            <input id="ce-emind" type="number" value="2" title="+mind" style="${t}" />
            <select id="ce-best" style="${t}"><option value="">any class</option>${Object.values(W).map(v=>`<option>${v}</option>`).join("")}</select>
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">+attack · +defense · +mind · best-fit — net bonus ≤ ${yn.equipment.bonusTotal}</div>`:f==="spell"?o.innerHTML=`
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem;font-size:0.75rem;">
            <select id="ce-use" style="${t}"><option>combat</option><option>heal</option><option>utility</option></select>
            <input id="ce-power" type="number" value="4" title="power" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">use · power (1–${yn.spell.maxPower})</div>`:o.innerHTML=`
          <select id="ce-arch" style="${t};width:100%;">${Ar.map(v=>`<option value="${v.archetype}">${v.archetype} (like ${v.name})</option>`).join("")}</select>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">your name and flavor, a proven archetype's behavior</div>`};l.addEventListener("change",c),c(),document.getElementById("ce-create").addEventListener("click",()=>{const f=l.value,v={id:`my-${Date.now().toString(36)}`,type:f,name:document.getElementById("ce-name").value.trim(),icon:document.getElementById("ce-icon").value.trim()||"🎴",text:document.getElementById("ce-text").value.trim()||void 0};if(f==="character")v.class=document.getElementById("ce-class").value,v.stats={health:+document.getElementById("ce-hp").value,attack:+document.getElementById("ce-atk").value,defense:+document.getElementById("ce-def").value,mind:+document.getElementById("ce-mind").value},v.trait=v.text;else if(f==="equipment"){v.bonus={};const u=+document.getElementById("ce-eatk").value,x=+document.getElementById("ce-edef").value,_=+document.getElementById("ce-emind").value;u&&(v.bonus.attack=u),x&&(v.bonus.defense=x),_&&(v.bonus.mind=_),v.slot="tool",v.bestFor=document.getElementById("ce-best").value||null}else f==="spell"?(v.use=document.getElementById("ce-use").value,v.power=+document.getElementById("ce-power").value,v.school="homebrew"):v.archetype=document.getElementById("ce-arch").value;const g=Qc(v);if(g.length){document.getElementById("ce-problems").textContent=g.join(" · ");return}const m=Dt.get(Li,[]);m.push(v),s(m),r()});const d=document.getElementById("ce-list");d.innerHTML=a.length?"":'<div class="records-empty">The forge is cold. Make something.</div>',a.forEach((f,v)=>{const g=document.createElement("div");g.style.cssText="display:flex;gap:0.4rem;align-items:baseline;padding:0.15rem 0;border-bottom:1px dashed #2a2318;",g.innerHTML=`<span>${n(f.icon)} ${n(f.name)}</span>
        <span style="color:#665;">${f.type}${f.class?" · "+f.class:""}</span>
        <button data-i="${v}" style="margin-left:auto;font-size:0.68rem;padding:0.15rem 0.4rem;background:#2a1515;color:#e08080;">✕</button>`,g.querySelector("button").addEventListener("click",()=>{const m=Dt.get(Li,[]);m.splice(v,1),s(m),r()}),d.appendChild(g)});const h=document.getElementById("ce-packs");for(const f of Ed()){const v=document.createElement("label");v.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;padding:0.12rem 0;",v.innerHTML=`<input type="checkbox" ${f.enabled?"checked":""} />
        <span>${n(f.name)} <span style="color:#665;">(${f.cards} cards)</span></span>`,v.querySelector("input").addEventListener("change",g=>{Sd(f.id,g.target.checked);const m=Dt.get(yr,{});m[f.id]=g.target.checked,Dt.set(yr,m)}),h.appendChild(v)}const p=document.getElementById("ce-io");document.getElementById("ce-export").addEventListener("click",()=>{p.value=JSON.stringify(wo(Dt.get(Li,[])),null,1)}),document.getElementById("ce-import").addEventListener("click",()=>{try{const f=JSON.parse(p.value),v=eh(f);if(v.length)throw new Error(v.join("; "));Ts(f);const g=Dt.get(bo,[]).filter(m=>m.id!==f.id);g.push(f),Dt.set(bo,g),p.value=`✓ "${f.name}" imported (${f.cards.length} cards)`,r()}catch(f){p.value=`✗ ${f.message}`}})}}const m_={id:"alchemy-17c",name:"17th-Century Alchemy Pack",description:"Emblem monsters and laboratory gear from the age of Maier and Sendivogius.",cards:[{id:"a17-sendivogius",type:"character",class:"alchemist",name:"Michael Sendivogius",icon:"🜍",stats:{health:12,attack:3,defense:2,mind:6},trait:"Distilled the aerial nitre before anyone had a name for air."},{id:"a17-soror",type:"character",class:"cleric",name:"The Soror Mystica",icon:"🜋",stats:{health:13,attack:2,defense:3,mind:5},trait:"The Work needs two. She keeps the vigil, and the vigil keeps the party."},{id:"a17-maier",type:"character",class:"wizard",name:"Count Michael Maier",icon:"🜚",stats:{health:10,attack:2,defense:2,mind:7},trait:"Reads emblems the way others read maps. The dungeon is fifty fugues deep."},{id:"a17-athanor",type:"equipment",name:"Court Athanor",icon:"🜂",slot:"tool",bonus:{mind:2},bestFor:"alchemist",text:"The slow furnace. Patience, made of brick."},{id:"a17-pelican",type:"equipment",name:"Pelican Vessel",icon:"🜄",slot:"tool",bonus:{mind:1,defense:1},bestFor:"alchemist",text:"Circulation without loss: what wounds the flask feeds the work."},{id:"a17-vitriol",type:"equipment",name:"Flask of Vitriol",icon:"🜖",slot:"weapon",bonus:{attack:3},bestFor:"alchemist",text:"Visita Interiora Terrae — or throw it, and something else will."},{id:"a17-solve",type:"spell",name:"Solve et Coagula",icon:"☿",school:"transmutation",power:5,use:"combat",text:"Dissolve the fixed; fix the volatile. Monsters count as the fixed."},{id:"a17-aurum",type:"spell",name:"Aurum Potabile",icon:"🜚",school:"restoration",power:6,use:"heal",text:"Drinkable gold. The court physician swears by it; the court treasurer weeps."},{id:"a17-projection",type:"spell",name:"Powder of Projection",icon:"✨",school:"transmutation",power:3,use:"utility",text:"A pinch turns the lock's iron to something more agreeable."},{id:"a17-hermetic",type:"personality",name:"The Hermetic",icon:"🜁",archetype:"scholarly",text:"As above, so below; as in the library, so in the crypt. Reads everything twice."}]},g_={id:"athanor",name:"the Hermetic Athanor",icon:"🜂",tagline:"Fifty emblems deep, the Work continues whether or not anyone tends it.",weightTweaks:{lab:2,library:1,materials:1,shrine:-.3},alwaysLab:!0,monsters:[{kind:"green-lion",name:"the Green Lion, hungry for the sun",icon:"🦁",attack:7,health:15,undead:!1},{kind:"ouroboros",name:"an ouroboros too busy to notice you",icon:"🐍",attack:5,health:18,undead:!1,slow:!0},{kind:"caput-corvi",name:"the Raven's Head, black as the nigredo",icon:"🐦‍⬛",attack:6,health:11,undead:!0},{kind:"winged-wingless",name:"two birds, one winged, one not, quarrelling",icon:"🕊️",attack:5,health:10,undead:!1}],bosses:[{kind:"rebis",name:"the Rebis, crowned twice and patient",icon:"👑",attack:12,health:36,undead:!1},{kind:"philosophers-dragon",name:"the Dragon that devours its own tail and yours",icon:"🐉",attack:13,health:34,undead:!1}]},v_={"green-lion":{img:new URL(""+new URL("green-lion-Cdoc9LHy.png",import.meta.url).href,import.meta.url).href},ouroboros:{img:new URL(""+new URL("ouroboros-BkC9aheh.png",import.meta.url).href,import.meta.url).href},"caput-corvi":{img:new URL(""+new URL("caput-corvi-yFqGgKDb.png",import.meta.url).href,import.meta.url).href},"winged-wingless":{img:new URL(""+new URL("winged-wingless-BJ4nBaZO.png",import.meta.url).href,import.meta.url).href},rebis:{img:new URL(""+new URL("rebis-BbSsEiz4.png",import.meta.url).href,import.meta.url).href},"philosophers-dragon":{img:new URL(""+new URL("philosophers-dragon-CN8PF5Zm.png",import.meta.url).href,import.meta.url).href}};let qc=!1;function y_({enabled:i=!0}={}){qc||(qc=!0,Ts(m_,{enabled:i}),X0(g_),p0(v_),N0({"green-lion":{trait:"venomous"},ouroboros:{trait:"armored"},"caput-corvi":{trait:"swarm"},"winged-wingless":{trait:"swarm"},rebis:{trait:"armored"},"philosophers-dragon":{resist:["fire"],weak:["frost"]}}),ey({"green-lion":{effect:"coating",name:"green vitriol",icon:"🦁",mod:{name:"green vitriol",attack:2,venom:!0},text:"Its bite distills to green vitriol. What dissolves the sun does not hesitate at flesh."},ouroboros:{effect:"potion",name:"the shed of the ouroboros",icon:"🐍",potion:{kind:"ouroboros-shed",heal:8},text:"It sheds as it dies, as it always does. The shed skin, steeped, turns endings back into beginnings."},"caput-corvi":{effect:"materials",name:"nigredo feathers",icon:"🐦‍⬛",count:2,text:"Feathers black past black: the nigredo itself. Every great work begins with exactly this."},"winged-wingless":{effect:"trinket",name:"the settled feather",icon:"🕊️",bonus:{mind:1},text:"One feather, from whichever bird was right. Held, it makes both sides of any argument audible."},rebis:{effect:"trinket",name:"the double crown",icon:"👑",bonus:{attack:1,mind:1},text:"Both crowns, fused where the two heads met. Wearing it, the head does two kinds of thinking at once."},"philosophers-dragon":{effect:"coating",name:"the dragon's mercury",icon:"🐉",mod:{name:"burning mercury",attack:3,element:"fire"},text:"What it kept swallowing, tail after tail: quicksilver that burns. On a blade it is an unfair argument."}}))}const Xc={[pe.ENTRANCE]:"The way in. The party gathers its nerve.",[pe.CORRIDOR]:"Just passage — a breath between dangers.",[pe.MONSTER]:"A monster. The party may fight, flee, sneak past (rogue), turn undead (cleric), bribe, or open with a spell — and a spell opening keeps working through the fight. Every slain monster drops a trophy worth carrying.",[pe.TRAP]:"A trap. Rogues disarm it; the bold shove through and take the hit.",[pe.TREASURE]:"Treasure — and maybe a mimic. Loot it, inspect first, or leave the bait.",[pe.LIBRARY]:"A library. The party can learn a spell; wizards risk the sealed texts for more.",[pe.SHRINE]:"A shrine. Rest to heal — or pry off the gold leaf and let the dungeon remember it.",[pe.LAB]:"An alchemist's bench. With materials, brew a potion or coat a weapon.",[pe.MATERIALS]:"Herbs and salts — raw materials for alchemy, if you gather them.",[pe.DISASTER]:"The dungeon itself turns hostile. Brace together, or scatter and pray.",[pe.BOSS]:"The boss chamber. Everything you drafted, tested at once — and the party looses every prepared working it has kept for this.",[pe.STAIRS]:"A stair down. The floor below is meaner than this one, and there is no way back up.",[pe.VAULT]:"A vault — riches hidden behind a secret door. Rogues and scholars find these."},__=[{type:"character",label:"Character",text:"A named hero of one of five classes. Four march — the rest wait in town as reserves, ready to replace the dead."},{type:"equipment",label:"Equipment",text:"Auto-assigns to the best-fit member. Some items do different things per class."},{type:"spell",label:"Spell",text:"A prepared working in the shared grimoire: reusable, but spent for the room once cast. Power scales with the party's sharpest mind, and a loosed working keeps working for the rest of the fight — combat workings go on biting, healing ones go on mending, and a heal fires the moment someone is failing rather than after the dust settles. A wizard amplifies it and opens ordinary fights with two — and at the boss the party looses every working it has. Scrolls found in the dungeon still burn."},{type:"tactic",label:"Tactic",text:"Learned technique, gated by what the party can DO rather than by class — everyone swings at something, so anyone benefits from Flanking. Tactics form a small tree: a tier-two card does nothing without the tier-one it grows from."},{type:"personality",label:"Personality",text:"Biases the whole party's decisions. Some look weak but hide an upside."}],x_=[{key:"Oil 🏮",text:"The lamp burns a unit every march. Run dry and the whole party takes damage every room it walks in the dark. An Everburning Lantern makes it last twice as long; Dancing Light and Eyes of the Mouse answer the dark outright."},{key:"Wounds ✚",text:"A blow worth a quarter of a body leaves a scar, and healing can no longer reach past it — the hatched part of the health bar. Wounds only mend in town, so the delve accumulates."}];function b_(i,e){var o,l,c;const t=[];if(!e)return t;const n=i==null?void 0:i.party,s=e.party;if(n&&s)for(const d of s.members){const h=n.members.find(p=>p.name===d.name);h&&h.alive&&!d.alive&&t.push({icon:"☠️",kind:"death",text:`${d.name} has fallen.`})}const r=(o=i==null?void 0:i.narration)==null?void 0:o.room;if(((l=e.narration)==null?void 0:l.room)===pe.BOSS&&r!==pe.BOSS&&t.push({icon:"🐉",kind:"boss",text:"The boss chamber — everything you drafted, tested at once."}),n&&s&&s.spellsLearned>n.spellsLearned){const d=s.spellsLearned-n.spellsLearned;t.push({icon:"📖",kind:"spell",text:`The grimoire grows: ${d} new working${d>1?"s":""} learned.`})}if(n!=null&&n.trophies&&((c=s==null?void 0:s.trophies)==null?void 0:c.length)>n.trophies.length){const d=s.trophies[s.trophies.length-1];t.push({icon:d.icon,kind:"trophy",text:`Claimed from the kill: ${d.name}.`})}if(n&&s){const d=s.gold-n.gold;d>=25&&t.push({icon:"💰",kind:"gold",text:`A windfall: +${d} gold.`})}return t}const Yc="dungeonab_chronicles",ps=20;function jc(){return`saga_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}class w_{constructor(e=null){this.storage=e||(typeof localStorage<"u"?localStorage:null),this.entries=[],this.load()}load(){if(this.storage)try{const e=JSON.parse(this.storage.getItem(Yc)||"[]");this.entries=Array.isArray(e)?e:[]}catch{this.entries=[]}}persist(){if(this.storage)try{this.storage.setItem(Yc,JSON.stringify(this.entries.slice(0,ps)))}catch{}}save({id:e,chronicle:t,party:n,difficulty:s=null}){var o;const r={id:e||jc(),version:Er,date:Date.now(),partyName:t.partyName,delves:t.delves.length,lastOutcome:((o=t.delves[t.delves.length-1])==null?void 0:o.outcome)||null,difficulty:s,chronicle:t.toJSON(),party:n?n.toJSON():null},a=this.entries.findIndex(l=>l.id===r.id);return a>=0?this.entries[a]=r:this.entries.unshift(r),this.entries.length>ps&&(this.entries.length=ps),this.persist(),r}list(){return this.entries.map(e=>{var t,n,s;return{id:e.id,partyName:e.partyName,delves:e.delves,date:e.date,difficulty:e.difficulty,victory:((t=e.lastOutcome)==null?void 0:t.victory)??null,score:((n=e.lastOutcome)==null?void 0:n.score)??0,alive:(((s=e.party)==null?void 0:s.members)||[]).some(r=>r.alive!==!1)}})}get(e){return this.entries.find(t=>t.id===e)||null}remove(e){const t=this.entries.findIndex(n=>n.id===e);return t>=0?(this.entries.splice(t,1),this.persist(),!0):!1}resume(e,t=vd){const n=this.get(e);if(!n)return null;const s=Vi.fromJSON(n.chronicle),r=n.party?ii.fromJSON(n.party,t):null,a=r?r.living().length:0,o=r?r.reserve.filter(d=>d.isAlive()).length:0;let l=!0,c=null;return r?a===0&&o===0?(l=!1,c=`${s.partyName} did not come back. The chronicle can be read, but nobody is left to continue it.`):a===0&&(c=`Nobody who marched came back, but ${o} wait${o>1?"":"s"} in town. They can take up the delve.`):(l=!1,c="This saga was saved as a story only — there is no party left to send down."),{id:n.id,chronicle:s,party:r,difficulty:n.difficulty,continuable:l,reason:c,standing:a,bench:o}}exportJSON(e){const t=this.get(e);return t?JSON.stringify(t,null,2):null}exportMarkdown(e,t){const n=this.get(e);return n?Kh(Vi.fromJSON(n.chronicle),t):null}importJSON(e){let t;try{t=typeof e=="string"?JSON.parse(e):e}catch{return{ok:!1,error:"That file is not readable as a saga."}}if(!t||!t.chronicle||!Array.isArray(t.chronicle.delves))return{ok:!1,error:"That file does not hold a chronicle."};if((t.version??0)>Er)return{ok:!1,error:"That saga was written by a newer version of the game."};const n={...t,id:jc(),date:Date.now()};return this.entries.unshift(n),this.entries.length>ps&&(this.entries.length=ps),this.persist(),{ok:!0,record:n}}}function Kc(i,e="md"){return`chronicle-${(i.partyName||"party").split(",")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"party"}-delve-${i.delves.length||1}.${e}`}const M_=Object.fromEntries(Object.entries(Wi).map(([i,e])=>[i,e.icon])),S_=Object.fromEntries(Object.entries(Wi).map(([i,e])=>[i,e.name])),Kt=new w_;function Tr(i,e,t="text/markdown"){const n=new Blob([e],{type:`${t};charset=utf-8`}),s=URL.createObjectURL(n),r=document.createElement("a");r.href=s,r.download=i,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function rd(){const i=se.simulator;if(!(i!=null&&i.getChronicle))return null;try{const e=Kt.save({id:se.sagaId||null,chronicle:i.getChronicle(),party:i.party,difficulty:se.difficulty});return se.sagaId=e.id,e}catch{return null}}const Jc="dungeonab_help_seen",se={draft:null,draftUI:null,campaign:null,simulator:null,renderer:null,gameRunning:!1,lastTickTime:0,speedMultiplier:1,prevState:null,seenRoomTypes:null};function E_(){console.log("⚔️ DungeonAB initializing…");const i=f_();y_({enabled:i["alchemy-17c"]!==!1}),T_(),A_(),p_(),u_({onDelve:e=>{se.pendingReplay=e,St("🗺️",`Design loaded: "${e.name}". Draft a party, then delve it.`,"room"),Mo()}}),Mo(),document.getElementById("pause-btn").addEventListener("click",k_),document.getElementById("step-btn").addEventListener("click",P_),document.getElementById("speed-slider").addEventListener("input",e=>{se.speedMultiplier=parseFloat(e.target.value),document.getElementById("speed-label").textContent=`${se.speedMultiplier.toFixed(1)}x`}),document.getElementById("show-results-btn").addEventListener("click",()=>{document.getElementById("show-results-btn").classList.remove("active"),document.getElementById("gameover-display").classList.add("active")})}function T_(){const i=document.getElementById("help-overlay"),e=document.getElementById("help-btn"),t=document.getElementById("help-close-btn");document.getElementById("help-card-legend").innerHTML=__.map(a=>`<dt>${a.label}</dt><dd>${a.text}</dd>`).join(""),document.getElementById("help-attrition-legend").innerHTML=x_.map(a=>`<dt>${a.key}</dt><dd>${a.text}</dd>`).join("");const n=()=>i.classList.add("active"),s=()=>{i.classList.remove("active");try{localStorage.setItem(Jc,"1")}catch{}};e.addEventListener("click",n),t.addEventListener("click",s),i.addEventListener("click",a=>{a.target===i&&s()});let r=!1;try{r=localStorage.getItem(Jc)==="1"}catch{}r||n()}function A_(){const i=document.getElementById("records-overlay"),e=document.getElementById("records-btn"),t=document.getElementById("records-close-btn"),n=()=>{const o=document.getElementById("records-body"),l=ni.getStats(),c=ni.getRecentRuns(10),d=Object.values(Gc).filter(u=>ni.bestScores[u.id]).map(u=>`<dt>${u.icon} ${u.name}</dt><dd>${ni.bestScores[u.id]}</dd>`).join(""),h=`<div style="color:#887755;font-size:0.8rem;margin-bottom:0.9rem;">
      ${l.totalVictories} retirements across ${l.totalRuns} campaigns · average score ${l.avgScore}</div>`,p=c.length?c.map(u=>{const x=Gc[(u.difficulty||"").toUpperCase()]||{icon:"•"},_=u.condition?Sn(u.condition):null,w=u.victory?"🏆":"☠️",k=_&&_.id!=="none"?` · ${_.icon}`:"";return`<div class="records-run">
            <span>${w} ${x.icon} depth ${u.depth||1} · ${u.roomsCleared} rooms${k}</span>
            <span class="rr-score">${u.score}</span>
          </div>`}).join(""):'<div class="records-empty">No campaigns yet. The Hall awaits its first name.</div>',f=Kt.list(),v=f.length?f.map(u=>{const x=new Date(u.date).toLocaleDateString(),_=u.alive?'<span style="color:#3ddc84;">still standing</span>':'<span style="color:#8a6a5a;">did not come back</span>';return`<div class="saga-row" data-saga="${u.id}">
            <div style="flex:1;min-width:0;">
              <div style="color:#c0b090;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${ct(u.partyName.split(",")[0])}${u.partyName.includes(",")?" &amp; co.":""}</div>
              <div style="color:#665;font-size:0.68rem;">${u.delves} delve${u.delves>1?"s":""} · ${_} · ${x}</div>
            </div>
            <button data-read="${u.id}" title="Read the saga">📖</button>
            <button data-save="${u.id}" title="Download the save file">💾</button>
            <button data-drop="${u.id}" title="Forget this saga">🗑️</button>
          </div>`}).join(""):'<div class="records-empty">No sagas kept yet. Finish a delve and the story is written down.</div>';o.innerHTML=(d?`<dl class="records-best">${d}</dl>`:"")+h+'<div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">📜 Sagas kept</div>'+v+`<div style="display:flex;gap:0.4rem;margin:0.5rem 0 1rem;">
         <button id="saga-import-btn" style="flex:1;font-size:0.75rem;padding:0.4rem;">📂 Load a save file</button>
       </div>
       <input id="saga-import-input" type="file" accept="application/json,.json" style="display:none;"><div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">Recent campaigns</div>`+p,o.querySelectorAll("[data-read]").forEach(u=>{u.addEventListener("click",()=>s(u.dataset.read))}),o.querySelectorAll("[data-save]").forEach(u=>{u.addEventListener("click",()=>{const x=Kt.get(u.dataset.save);Tr(`chronicle-${x.partyName.split(",")[0].toLowerCase().replace(/[^a-z0-9]+/g,"-")}.json`,Kt.exportJSON(u.dataset.save),"application/json")})}),o.querySelectorAll("[data-drop]").forEach(u=>{u.addEventListener("click",()=>{const x=Kt.get(u.dataset.drop),_=(x==null?void 0:x.partyName.split(",")[0])||"this saga";window.confirm(`Forget the chronicle of ${_}? The story cannot be recovered.`)&&(Kt.remove(u.dataset.drop),n())})});const g=o.querySelector("#saga-import-btn"),m=o.querySelector("#saga-import-input");g&&m&&(g.addEventListener("click",()=>m.click()),m.addEventListener("change",async()=>{var _;const u=(_=m.files)==null?void 0:_[0];if(!u)return;const x=Kt.importJSON(await u.text());x.ok?(St("📂",`${x.record.partyName.split(",")[0]}'s saga is on the shelf.`),n()):St("⚠️",x.error)}))},s=o=>{const l=Kt.resume(o);if(!l)return;const c=document.getElementById("records-body"),d=Kt.exportMarkdown(o,{ledger:!0});c.innerHTML=`
      <button id="saga-back" style="font-size:0.75rem;padding:0.35rem 0.7rem;margin-bottom:0.6rem;">← Back to the Hall</button>
      <div style="color:${l.continuable?"#3ddc84":"#8a6a5a"};font-size:0.75rem;margin-bottom:0.6rem;">
        ${l.continuable?`${l.standing} still standing${l.bench?` · ${l.bench} in reserve`:""} — this party can delve again.`:ct(l.reason||"This saga is finished.")}
      </div>
      <div class="saga-doc">${R_(d)}</div>
      <button id="saga-download" style="width:100%;margin-top:0.7rem;padding:0.6rem;font-size:0.8rem;">📖 Download this chronicle</button>`,c.querySelector("#saga-back").addEventListener("click",n),c.querySelector("#saga-download").addEventListener("click",()=>{Tr(`chronicle-${l.chronicle.partyName.split(",")[0].toLowerCase().replace(/[^a-z0-9]+/g,"-")}.md`,d)})},r=()=>{n(),i.classList.add("active")},a=()=>i.classList.remove("active");e.addEventListener("click",r),t.addEventListener("click",a),i.addEventListener("click",o=>{o.target===i&&a()})}function R_(i){return ct(i).replace(/^### (.*)$/gm,"<h4>$1</h4>").replace(/^## (.*)$/gm,"<h3>$1</h3>").replace(/^# (.*)$/gm,"<h2>$1</h2>").replace(/^- (.*)$/gm,"<li>$1</li>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/_(.+?)_/g,"<em>$1</em>").replace(/&lt;details&gt;&lt;summary&gt;Ledger&lt;\/summary&gt;/g,"<details><summary>Ledger</summary>").replace(/&lt;\/details&gt;/g,"</details>").split(`

`).map(e=>/^<(h\d|li|details)/.test(e.trim())?e:`<p>${e}</p>`).join("")}function St(i,e,t=""){const n=document.getElementById("toast-stack"),s=document.createElement("div");for(s.className=`toast${t?" toast-"+t:""}`,s.innerHTML=`<span class="toast-icon">${i}</span><span>${ct(e)}</span>`,n.appendChild(s),setTimeout(()=>{s.classList.add("fade"),setTimeout(()=>s.remove(),500)},3600);n.children.length>3;)n.removeChild(n.firstChild)}function C_(i,e){var n;const t=(n=e.narration)==null?void 0:n.room;t&&se.seenRoomTypes&&!se.seenRoomTypes.has(t)&&Xc[t]&&(se.seenRoomTypes.add(t),St(e.narration.icon||"ℹ️",Xc[t],"room"));for(const s of b_(i,e))St(s.icon,s.text,s.kind)}function Mo(){se.draft=new Id(`table-${Date.now().toString(36)}`),se.draftUI=new Dd(se.draft,L_),se.draftUI.render(),document.getElementById("world-container").style.display="none",document.getElementById("ui-container").style.display="none"}function L_({pool:i,difficulty:e,seed:t,condition:n,hexTarget:s,hexCondition:r}){console.log(`Campaign begins: difficulty=${e}, seed=${t}, condition=${n}`);const a=document.getElementById("draft-container");a.innerHTML="",a.style.display="none",document.getElementById("world-container").style.display="flex",document.getElementById("ui-container").style.display="flex";const o=new As(`${t}-hexes`),l=se.draft.seats.filter(v=>v.isAI),c=o.pick(l),d=Object.keys(Ii).filter(v=>v!=="none"),h=Sn(o.pick(d));se.sabotage={tableWager:n,byPlayer:r&&r!=="none"?{seatId:s,conditionId:r}:null,onPlayer:{rivalName:c.name,rivalIcon:c.icon,condition:h}};const p=nh(Sn(n),h),f=se.pendingReplay||null;if(se.pendingReplay=null,f&&St("🗺️",`Delving the archived design: "${f.name}"`,"room"),se.campaign=new sd(i,{seed:t,difficulty:e,condition:p,layout:f?f.layout:null}),se.difficulty=e,se.runRecorded=!1,se.standings=null,se.seenRoomTypes=new Set,St(c.icon,`${c.name} hexes your run: ${h.name}. Its score premium is yours to keep.`,"death"),se.sabotage.byPlayer){const v=Sn(r),g=l.find(m=>m.id===s);St(v.icon,`Your hex — ${v.name} — settles over ${(g==null?void 0:g.name)||"a rival"}'s run.`,"boss")}ad(se.campaign,"⛏️ March on the Dungeon",()=>{od(se.campaign.nextDelve())})}function ad(i,e,t){const n=document.getElementById("gameover-display");n.innerHTML="";const s=document.createElement("div");n.appendChild(s),Wh(s,i.party,{doneLabel:e,onChange:()=>{se.simulator&&Dr(se.simulator.getState())},onDone:()=>{n.classList.remove("active"),n.innerHTML="",t()}}),n.classList.add("active")}function od(i){if(se.simulator=i,!se.renderer)try{se.renderer=new I0("game-canvas")}catch(t){console.warn("WebGL unavailable, using 2D map renderer:",t),se.renderer=new Nd("game-canvas")}const e=i.getState();se.prevState=e,I_(e.theme,e.depth,e.condition),e.condition&&St(e.condition.icon,`Wager: ${e.condition.name}. ${e.condition.text}`,"boss"),document.getElementById("pause-btn").disabled=!1,document.getElementById("step-btn").disabled=!1,document.getElementById("pause-btn").textContent="Pause",se.renderer.render(e),Dr(e),se.gameRunning=!0,se.lastTickTime=performance.now(),ld()}function ld(){if(!se.gameRunning)return;const i=performance.now(),e=1400/se.speedMultiplier;i-se.lastTickTime>=e&&(se.lastTickTime=i,se.simulator.tick(),cd())||requestAnimationFrame(ld)}function cd(){var e,t;const i=se.simulator.getState();if(se.renderer.render(i),Dr(i),i.narration&&(hd(i.narration,i.roomIndex),C_(se.prevState,i),(t=(e=se.renderer).playEffect)==null||t.call(e,i.narration.action,i.narration.roomIndex,i.narration.spellElement),i.narration.aside)){const n=i.narration.aside.startsWith("🕳️")?"🕳️":"🧭";St(n,i.narration.aside.replace(/^[^ ]+ /,""),"room")}return se.prevState=i,i.gameOver?(D_(i),!0):!1}function P_(){!se.simulator||!se.gameRunning||(se.simulator.tick(),cd())}function k_(){if(!se.simulator)return;const i=!se.simulator.paused;se.simulator.setPaused(i),document.getElementById("pause-btn").textContent=i?"Resume":"Pause",i||(se.lastTickTime=performance.now())}function Dr(i){document.getElementById("room-count").textContent=`${i.roomIndex} / ${(i.pathLength||i.dungeon.length)-1}`;const e=Math.max(...(i.dungeon.rooms||[]).map(g=>(g.floor||0)+1),1),t=document.getElementById("floor-count");t.textContent=`${(i.floor||0)+1} / ${e}`,t.style.color=(i.floor||0)+1===e?"#d88a3f":"#9aa3b0",document.getElementById("gold-count").textContent=i.party.gold,document.getElementById("score-count").textContent=i.party.score;const n=document.getElementById("supply-count"),s=i.party.supply??0;n.textContent=s===0?"dark":s,n.style.color=s===0?"#e05555":s<=2?"#d8a53f":"#e8c07a",n.title=s===0?"The oil is gone. Every march in the dark costs the whole party health.":`Oil for ${s} more march${s===1?"":"es"}.`,document.getElementById("materials-count").textContent=i.party.materials,document.getElementById("potions-count").textContent=i.party.potions;const r=document.getElementById("trophies-count"),a=i.party.trophies||[];r.textContent=a.length,r.title=a.map(g=>`${g.icon} ${g.name}`).join(`
`);const o=[];i.party.poisonLinger>0&&o.push("🐍 venom working"),i.party.alarmed&&o.push("🔔 alarm raised"),document.getElementById("status-badges").textContent=o.join(" · ");const l=document.getElementById("party-roster"),c=(i.party.reserve||[]).map(g=>`
      <div class="member-row" style="opacity:0.5;">
        <span>${g.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${g.name} <span style="color:#665;font-size:0.7rem;">(${g.class})</span></div>
          <div style="color:#556;font-size:0.68rem;">in reserve — waits in town for a place in the four</div>
        </span>
      </div>`).join("");l.innerHTML=i.party.members.map(g=>{const m=Math.round(g.health/g.maxHealth*100),u=m>60?"#3ddc84":m>30?"#d8a53f":"#e05555",x=[...g.equipment,...g.weaponMods].join(", "),_=g.effectiveMax??g.maxHealth,w=Math.max(0,Math.round((g.maxHealth-_)/g.maxHealth*100)),k=w>0?`<span class="hp-scar" style="position:absolute;right:0;top:0;bottom:0;width:${w}%;background:repeating-linear-gradient(45deg,#5a2a2a,#5a2a2a 2px,#3a1c1c 2px,#3a1c1c 4px);"></span>`:"",E=g.wounds?`<span title="${g.wounds} wound${g.wounds===1?"":"s"} — healing cannot pass ${_} until town" style="color:#c76;font-size:0.68rem;">${"✚".repeat(Math.min(g.wounds,4))}</span>`:"";return`
      <div class="member-row ${g.alive?"":"member-dead"}">
        <span>${g.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${g.name} <span style="color:#665;font-size:0.7rem;">(${g.class})</span></div>
          ${x?`<div style="color:#556;font-size:0.68rem;">${x}</div>`:""}
        </span>
        ${E}
        <span class="hp-bar" style="position:relative;overflow:hidden;"><span class="hp-fill" style="width:${m}%;background:${u};"></span>${k}</span>
        <span class="member-hp" style="color:${u};">${g.health}</span>
      </div>
    `}).join("")+c;const d=i.party.formation&&i.party.formation!=="line"?`<span class="tactic-chip" title="The room allowed this shape, and the party took it">${M_[i.party.formation]||""} ${ct(S_[i.party.formation]||"")}</span>`:"",h=document.getElementById("party-tactics"),p=i.party.tactics||[],f=i.party.dormantTactics||[];h.innerHTML=[d,...p.map(g=>`<span class="tactic-chip">${g.icon} ${ct(g.name)}</span>`),...f.map(g=>{const m=(g.match(/^\S+\s(.+?) is drafted/)||[])[1]||"A tactic";return`<span class="tactic-chip idle" title="${ct(g)}">${ct(m)} · idle</span>`})].join("");const v=document.getElementById("debug-log");v.innerHTML=i.log.map(g=>`<div class="log-entry">${ct(g)}</div>`).join(""),v.scrollTop=v.scrollHeight}function hd(i,e){const t=document.getElementById("story-panel"),n=t.querySelector(".story-empty");n&&n.remove();const s=(i.falls||[]).map(l=>`<div class="story-fall">${ct(l)}</div>`).join(""),r=(i.wounds||[]).map(l=>`<div class="story-wound">${ct(l)}</div>`).join(""),a=i.aside?`<div class="story-aside">${ct(i.aside)}</div>`:"",o=document.createElement("div");for(o.className="story-entry",o.innerHTML=`
    <div class="story-room">${i.icon} Room ${e} — ${i.room}</div>
    <div class="story-predicament">${ct(i.predicament)}</div>
    <div class="story-deliberation">${ct(i.deliberation)}</div>
    <div class="story-resolution">${ct(i.resolution)}</div>
    ${r}
    ${s}
    ${a}
  `,t.appendChild(o);t.children.length>14;)t.removeChild(t.firstChild);t.scrollTop=t.scrollHeight}function I_(i=null,e=1,t=null){const n=e>1?` — Depth ${e}`:"",s=t?`<div style="margin-top:0.4rem;font-size:0.8rem;color:#e8724a;">${t.icon} Wager — ${ct(t.name)}</div>`:"",r=i?`<div class="story-entry" style="border-left:3px solid #d8a53f;">
         <div class="story-room" style="font-size:1rem;">${i.icon} ${ct(i.name)}${n}</div>
         <div class="story-predicament" style="font-style:italic;">${ct(i.tagline)}</div>
         ${s}
       </div>`:"";document.getElementById("story-panel").innerHTML=r+'<div class="story-empty">The chronicle of this delve is not yet written…</div>'}function D_(i){se.gameRunning=!1,document.getElementById("pause-btn").disabled=!0,document.getElementById("step-btn").disabled=!0,se.campaign.recordDelve(se.simulator),vr.save({name:`${i.theme.name} — depth ${i.depth}`,layout:V0(se.simulator.dungeon),seed:se.simulator.seed,outcome:{victory:i.victory,score:i.party.score,depth:i.depth}}),rd(),i.victory&&!se.campaign.over?N_():dd()}function N_(i){const e=se.campaign,t=se.simulator.getRunResult(),n=document.getElementById("gameover-display");if(se.sagaId){const r=Kt.get(se.sagaId);r&&St("📜",`The chronicle is kept — delve ${r.delves} written down.`)}hd({room:"town",icon:"🏘️",predicament:Wy(e.party,e.depth),deliberation:"",resolution:""},`— after depth ${e.depth}`);const s=()=>{const r=e.healCost(),a=e.missingHealth(),o=e.party.gold,l=e.party.hasPersonality("pious");n.innerHTML=`
      <h2 style="color:#3ddc84;font-size:1.35rem;margin-bottom:0.5rem;text-align:center;">
        🏘️ The Town Between
      </h2>
      <div style="text-align:center;color:#887755;margin-bottom:1rem;">Depth ${e.depth} cleared — the road down continues</div>
      <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid #3ddc84;border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
        ${ct(t.epitaph||"")}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
        <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${e.party.score}</strong>
        <span style="color:#887755;">Gold</span><strong style="text-align:right;">${o}</strong>
        <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${e.party.living().length} / ${e.party.members.length}</strong>
        <span style="color:#887755;">Potions</span><strong style="text-align:right;">${e.party.potions.length}</strong>
        <span style="color:#887755;">Trophies</span><strong style="text-align:right;">${e.party.trophies.length}</strong>
      </div>
    `;const c=(m,u,x,_="")=>{const w=document.createElement("button");return w.textContent=m,w.disabled=!u,w.style.cssText=`width:100%;margin-top:0.5rem;padding:0.8rem;font-size:0.95rem;${_}${u?"":"opacity:0.45;cursor:default;"}`,w.addEventListener("click",x),n.appendChild(w),w};c(a===0?"💤 Everyone Is Rested":`🛏️ Rest & Heal All — ${r}g${l?" (temple rate)":""}`,a>0&&o>=r,()=>{const m=e.healAll(),u=Hy(m==null?void 0:m.mended);u&&St("✚",u.replace(/^✚\s*/,"")),s()}),c(`🧪 Buy a Healing Draught — ${Gt.potion}g`,o>=Gt.potion,()=>{e.buyPotion(),s()});const d=e.party.reserve,h=e.party.living().length<vn;if(d.length>0){const m=document.createElement("div");m.style.cssText="margin-top:1rem;color:#887755;font-size:0.78rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;",m.textContent=h?`🛡️ Your reserve — a place has opened in the party (${d.length} waiting):`:`🛡️ Your reserve — ${d.length} waiting for a place in the four:`,n.appendChild(m);const u=d[0];c(h?`${u.icon} Call up ${u.name} (${u.class}) — free`:`${u.icon} ${u.name} (${u.class}) waits — the four still stand`,h,()=>{const x=e.callUpReserve();x&&St(x.icon,`${x.name} joins the party from the reserve.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#17231a;color:#a8d5b0;")}const p=document.createElement("div");p.style.cssText="margin-top:1rem;color:#887755;font-size:0.78rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;",p.textContent="🪧 The hiring board — adventurers looking for work:",n.appendChild(p);for(const m of e.recruitOffers()){const u=m.card.stats;c(`${m.card.icon} Hire ${m.card.name} (${m.card.class}) — ${m.cost}g`,o>=m.cost,()=>{const x=e.recruit(m.card.id);x&&St(m.card.icon,`${x.name} joins the party.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#1a2617;color:#a8d5b0;").title=`❤️${u.health} ⚔️${u.attack} 🛡️${u.defense} 🧠${u.mind}`}const f=e.forgeCost(),v=e.party.living().reduce((m,u)=>m.attack>=u.attack?m:u);c(`🔨 Sharpen ${v.name}'s weapon (+${Gt.forgeMod.attack} atk) — ${f}g`,o>=f,()=>{const m=e.forge();m&&St("🔨",`The smith sets ${Gt.forgeMod.name} to ${m.target}'s blade.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#26200f;color:#e0c88a;");const g=e.shopOffers();if(g.length>0){const m=document.createElement("div");m.style.cssText="margin-top:1rem;color:#887755;font-size:0.8rem;",m.textContent="🏪 The quartermaster — what the road down is selling:",n.appendChild(m);for(const u of g){const x=u.card,_=x.type==="spell"?"a working for the grimoire":`${x.slot||"trinket"}`;c(`${x.icon} ${x.name} (${_}) — ${u.price}g`,o>=u.price,()=>{const w=e.buyFromShop(x.id);w&&St(x.icon,w.wearer?`${w.card.name} bought, and handed to ${w.wearer.name}.`:`${w.card.name} bought and copied into the grimoire.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#1b2119;color:#a8c8a0;")}}c("🎒 The Muster — kit, workings, and who they are",!0,()=>{ad(e,"🏘️ Back to Town",()=>{n.classList.add("active"),s()})},"margin-top:0.8rem;font-size:0.86rem;padding:0.65rem;background:#22201a;color:#d8c9a3;"),c(`⛏️ Delve Deeper — depth ${e.depth+1} awaits`,!0,()=>{n.classList.remove("active"),od(e.nextDelve())},"margin-top:1.25rem;font-size:1rem;padding:0.9rem;"),c("🏡 Retire & Bank the Score",!0,()=>{e.retire(),dd(se.simulator.getState())},"background:#2a2213;color:#d8a53f;"),Dr(se.simulator.getState())};s(),n.classList.add("active")}function dd(i){var f,v;const e=se.campaign,t=e.getSummary(),n=se.simulator.getRunResult(),s=t.retired;se.runRecorded||(se.runRecorded=!0,ni.recordRun(se.difficulty,{score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:s,survivors:t.survivors,partySize:t.partySize,depth:t.depth,condition:se.campaign.condition!=="none"?se.campaign.condition:null}));const r=ni.bestScores[se.difficulty]||0,a=t.score>=r&&t.score>0,o=ni.getStats();if(!se.standings&&se.draft){const g=se.sabotage||{};se.standings=r_(se.draft,{score:t.score,depth:t.depth,hexIcon:((v=(f=g.onPlayer)==null?void 0:f.condition)==null?void 0:v.icon)||null},{seed:e.seed,difficulty:e.difficulty,condition:g.tableWager??e.condition,hexes:g.byPlayer?{[g.byPlayer.seatId]:g.byPlayer.conditionId}:{}})}const l=(se.standings||[]).map(g=>`
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.28rem 0;border-bottom:1px dashed #2a2318;${g.isPlayer?"color:#d8a53f;font-weight:bold;":"color:#b0a080;"}">
      <span style="width:1.6rem;">${O_(g.place)}</span>
      <span>${g.icon} ${ct(g.name)}${g.hexIcon?` <span title="hexed">${g.hexIcon}</span>`:""}</span>
      <span style="margin-left:auto;">${g.score} <span style="color:#776;font-size:0.82em;">· depth ${g.depthReached}</span></span>
    </div>`).join(""),c=document.getElementById("gameover-display");c.innerHTML=`
    <h2 style="color:${s?"#3ddc84":"#e05555"};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
      ${s?"🏆 Retired in Glory":"☠️ The Campaign Ends in the Dark"}
    </h2>
    <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${s?"#3ddc84":"#aa5544"};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
      ${ct(n.epitaph||"")}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
      <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${t.score}${a?" ⭐ New Best!":""}</strong>
      <span style="color:#887755;">Depth reached</span><strong style="text-align:right;">${t.depth}</strong>
      <span style="color:#887755;">Gold</span><strong style="text-align:right;">${t.gold}</strong>
      <span style="color:#887755;">Rooms conquered</span><strong style="text-align:right;">${t.roomsCleared}</strong>
      <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${t.survivors} / ${t.partySize}</strong>
      <span style="color:#887755;">Spells learned</span><strong style="text-align:right;">${t.spellsLearned}</strong>
      <span style="color:#887755;">Trophies claimed</span><strong style="text-align:right;">${t.trophies}</strong>
      <span style="color:#887755;">Best on ${se.difficulty}</span><strong style="text-align:right;">${Math.max(r,t.score)}</strong>
      <span style="color:#887755;">Career</span><strong style="text-align:right;">${o.totalVictories} retirements / ${o.totalRuns} campaigns</strong>
    </div>
    ${U_(e.party.trophies,s)}
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">🎲 At the Table — how the draft played out</div>
      ${l}
    </div>
  `;const d=document.createElement("button");d.textContent="🃏 Draft a New Party",d.style.cssText="width:100%;margin-top:1.5rem;padding:0.9rem;font-size:1rem;",d.addEventListener("click",()=>{c.classList.remove("active"),document.getElementById("show-results-btn").classList.remove("active"),Mo()}),c.appendChild(d);const h=document.createElement("button");h.textContent="📖 Read the Chronicle",h.style.cssText="width:100%;margin-top:0.5rem;padding:0.7rem;font-size:0.9rem;background:#2a2213;color:#d8a53f;",h.addEventListener("click",()=>{c.classList.remove("active"),document.getElementById("show-results-btn").classList.add("active")}),c.appendChild(h);const p=rd();if(p){const g=se.simulator.getChronicle(),m=document.createElement("div");m.style.cssText="display:flex;gap:0.5rem;margin-top:0.5rem;";const u=document.createElement("button");u.textContent="📖 Download the chronicle",u.title="The whole saga as a document you can read",u.style.cssText="flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;",u.addEventListener("click",()=>{Tr(Kc(g,"md"),Kh(g,{ledger:!0}))});const x=document.createElement("button");x.textContent="💾 Save file",x.title="A save you can keep, share, or load back in to delve again with this party",x.style.cssText="flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;",x.addEventListener("click",()=>{Tr(Kc(g,"json"),Kt.exportJSON(p.id),"application/json")}),m.append(u,x),c.appendChild(m);const _=document.createElement("div");_.style.cssText="margin-top:0.4rem;font-size:0.7rem;color:#776;text-align:center;",_.textContent=`Saved as "${p.partyName.split(",")[0]}" — delve ${p.delves}. Find it under 🏛️ Records.`,c.appendChild(_)}c.classList.add("active")}function U_(i,e){if(!i||i.length===0)return"";const t=i.slice(-10).reverse(),n=i.length-t.length,s=t.map(r=>`
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.22rem 0;border-bottom:1px dashed #2a2318;color:#b0a080;font-size:0.85rem;">
      <span>${r.icon}</span>
      <span style="flex:1;">${ct(r.name)}</span>
      <span style="color:#776;font-size:0.78em;">from ${ct(r.from)}</span>
    </div>`).join("");return`
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">
        🏆 The Trophy Case — ${e?"what came up with them":"what the dark took back"}
      </div>
      ${s}
      ${n>0?`<div style="color:#776;font-size:0.78rem;padding-top:0.3rem;">… and ${n} more, further down the chronicle.</div>`:""}
    </div>`}function ct(i){const e=document.createElement("div");return e.textContent=i,e.innerHTML}function O_(i){return["🥇","🥈","🥉"][i-1]||`${i}.`}window.addEventListener("DOMContentLoaded",E_);
