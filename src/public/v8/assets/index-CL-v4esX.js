(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const wd=[],Q={CHARACTER:"character",EQUIPMENT:"equipment",SPELL:"spell",PERSONALITY:"personality"},X={FIGHTER:"fighter",CLERIC:"cleric",WIZARD:"wizard",ROGUE:"rogue",ALCHEMIST:"alchemist"},xt={SIGIL:"sigil",ESCAPE:"escape",HARMONY:"harmony",CONJURATION:"conjuration",ASTROLOGY:"astrology",MEMORY:"memory",CORRESPONDENCE:"correspondence",ACQUISITION:"acquisition",CIPHER:"cipher",TRANSMUTATION:"transmutation",EMBLEM:"emblem",NUMEROLOGY:"numerology",NATURAL:"natural"},nh=[{id:"char-agrippa",type:Q.CHARACTER,class:X.FIGHTER,discipline:xt.SIGIL,name:"Cornelius Agrippa",icon:"⚔️",stats:{health:14,attack:4,defense:3,mind:2},trait:"A soldier's occult philosophy: everything answers to something else, and he will argue the point with anyone who says otherwise.",capabilities:["rhetoric","conjuring","correspondence"]},{id:"char-sendivogius",type:Q.CHARACTER,class:X.FIGHTER,discipline:xt.ESCAPE,name:"Michael Sendivogius",icon:"⚔️",stats:{health:13,attack:4,defense:4,mind:1},trait:"Has talked and cut his way out of worse than this dungeon. Twice out of the same castle.",capabilities:["warcraft","roguery","rhetoric"]},{id:"char-brahe",type:Q.CHARACTER,class:X.FIGHTER,discipline:xt.ASTROLOGY,name:"Tycho Brahe",icon:"⚔️",stats:{health:13,attack:5,defense:2,mind:3},trait:"As quick to duel over a star-chart as to draw one. The false nose has never slowed his sword arm.",capabilities:["astrology","observation","tinkering"]},{id:"char-napier",type:Q.CHARACTER,class:X.FIGHTER,discipline:xt.NUMEROLOGY,name:"John Napier",icon:"⚔️",stats:{health:15,attack:3,defense:3,mind:3},trait:"The Laird of Merchiston defends his own estate. The neighbours whisper of a black familiar; he keeps better numbers.",capabilities:["warcraft","astrology","tinkering"]},{id:"char-ficino",type:Q.CHARACTER,class:X.CLERIC,discipline:xt.HARMONY,name:"Marsilio Ficino",icon:"✨",stats:{health:14,attack:2,defense:3,mind:6},trait:"Sings the wounded steady with astral harmony; a shrine under his hand mends deeper.",capabilities:["correspondence","medicine","conjuring"]},{id:"char-dee",type:Q.CHARACTER,class:X.CLERIC,discipline:xt.CONJURATION,name:"John Dee",icon:"✨",stats:{health:13,attack:2,defense:3,mind:7},trait:"Would rather question the restless dead than destroy them — and they usually answer.",capabilities:["conjuring","astrology","divination"]},{id:"char-forman",type:Q.CHARACTER,class:X.CLERIC,discipline:xt.ASTROLOGY,name:"Simon Forman",icon:"✨",stats:{health:14,attack:3,defense:2,mind:6},trait:"Reads a wound by the stars it was struck under. His remedies run stronger for it.",capabilities:["astrology","medicine","divination"]},{id:"char-bruno",type:Q.CHARACTER,class:X.WIZARD,discipline:xt.MEMORY,name:"Giordano Bruno",icon:"🔮",stats:{health:12,attack:2,defense:2,mind:10},trait:"His memory palace has room for one more working than anyone else's head.",capabilities:["conjuring","scholarship","rhetoric"]},{id:"char-pico",type:Q.CHARACTER,class:X.WIZARD,discipline:xt.CORRESPONDENCE,name:"Pico della Mirandola",icon:"🔮",stats:{health:13,attack:2,defense:2,mind:9},trait:"Finds the thread joining every school of magic, and pulls it.",capabilities:["scholarship","correspondence","rhetoric"]},{id:"char-cavendish",type:Q.CHARACTER,class:X.WIZARD,discipline:xt.NATURAL,name:"Margaret Cavendish",icon:"🔮",stats:{health:12,attack:2,defense:3,mind:8},trait:"Trusts the microscope as much as the grimoire — a non-occult answer for half the dungeon's magical problems.",capabilities:["tinkering","observation","alchemy"]},{id:"char-digby",type:Q.CHARACTER,class:X.ROGUE,discipline:xt.ACQUISITION,name:"Kenelm Digby",icon:"🗡️",stats:{health:12,attack:4,defense:2,mind:6},trait:"Courtier, privateer, and collector: a pirate's eye for what is actually worth taking.",capabilities:["warcraft","roguery","observation"]},{id:"char-trithemius",type:Q.CHARACTER,class:X.ROGUE,discipline:xt.CIPHER,name:"Johannes Trithemius",icon:"🗡️",stats:{health:11,attack:4,defense:3,mind:5},trait:"Buried ciphers in mechanisms long before anyone thought to look there. Alarms he passes stay silent.",capabilities:["scholarship","divination","roguery"]},{id:"char-fludd",type:Q.CHARACTER,class:X.ROGUE,discipline:xt.ASTROLOGY,name:"Robert Fludd",icon:"🗡️",stats:{health:11,attack:5,defense:2,mind:5},trait:"Read the whole cosmos as one diagram. Knows what a room will do before he is in it, and finds the ways through that were not meant to be found.",capabilities:["divination","medicine","roguery"]},{id:"char-paracelsus",type:Q.CHARACTER,class:X.ALCHEMIST,discipline:xt.TRANSMUTATION,name:"Paracelsus",icon:"⚗️",stats:{health:13,attack:3,defense:2,mind:7},trait:"Reads a body like an assay, and has burned down three academies of orthodoxy proving it.",capabilities:["alchemy","medicine","warcraft"]},{id:"char-maier",type:Q.CHARACTER,class:X.ALCHEMIST,discipline:xt.EMBLEM,name:"Michael Maier",icon:"⚗️",stats:{health:12,attack:2,defense:3,mind:8},trait:"Sets the Work to music: fifty emblems, fifty fugues, and an answer for any door with a system on it.",capabilities:["alchemy","correspondence","scholarship"]},{id:"char-cortese",type:Q.CHARACTER,class:X.ALCHEMIST,discipline:xt.TRANSMUTATION,name:"Isabella Cortese",icon:"⚗️",stats:{health:13,attack:3,defense:3,mind:5},trait:"Her book of secrets went through edition after edition because everything in it was tested first.",capabilities:["alchemy","tinkering","observation"]}],ih=[{id:"eq-tower-shield",type:Q.EQUIPMENT,name:"Tower Shield",icon:"🛡️",slot:"armor",bonus:{defense:3},bestFor:X.FIGHTER,text:"A wall with a handle.",capabilities:["warcraft"]},{id:"eq-greatsword",type:Q.EQUIPMENT,name:"Greatsword of the Vault",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:X.FIGHTER,text:"Found in a vault. Wants to go back. Long enough to take a whole swarm at once: 3 more damage a round against anything that comes in numbers.",capabilities:["tinkering"]},{id:"eq-blessed-mace",type:Q.EQUIPMENT,name:"Blessed Mace",icon:"🔨",slot:"weapon",bonus:{attack:2,mind:1},bestFor:X.CLERIC,text:"Persuasion, sanctified. Consecrates a room as it swings: nothing climbs out of the sarcophagus while it is in hand.",capabilities:["rhetoric"]},{id:"eq-grimoire",type:Q.EQUIPMENT,name:"Grimoire of Low Whispers",icon:"📖",slot:"focus",bonus:{mind:3},bestFor:X.WIZARD,text:"The margins argue with the text.",capabilities:["scholarship"]},{id:"eq-lockpicks",type:Q.EQUIPMENT,name:"Masterwork Lockpicks",icon:"🗝️",slot:"tool",bonus:{mind:2},bestFor:X.ROGUE,text:"Every door is a suggestion.",capabilities:["roguery"]},{id:"eq-alembic",type:Q.EQUIPMENT,name:"Portable Alembic",icon:"⚗️",slot:"tool",bonus:{mind:2},bestFor:X.ALCHEMIST,text:"A laboratory folded into a satchel. Whoever carries it can answer as an alchemist answers.",capabilities:["alchemy"]},{id:"eq-lantern",type:Q.EQUIPMENT,name:"Everburning Lantern",icon:"🏮",slot:"tool",bonus:{mind:1,defense:1},bestFor:X.CLERIC,text:"Reveals hazards one room ahead, and sips its oil: the party burns supply every other march instead of every one.",capabilities:["observation"]},{id:"eq-quicksilver-daggers",type:Q.EQUIPMENT,name:"Quicksilver Daggers",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:X.ROGUE,text:"They land before the argument starts: the party takes no damage in the first round of a fight."},{id:"eq-athanor-charm",type:Q.EQUIPMENT,name:"Athanor Charm",icon:"🔥",slot:"tool",bonus:{mind:2},bestFor:X.ALCHEMIST,text:"A furnace in miniature, always exactly warm enough. Anything the party sets alight burns 2 harder for the rest of the fight."},{id:"eq-holy-symbol",type:Q.EQUIPMENT,name:"Holy Symbol of Dawn",icon:"☀️",capabilities:["medicine"],slot:"focus",bonus:{mind:1},bestFor:X.CLERIC,text:"Protection for most. Authority for some. A bad idea for one.",classActions:{[X.FIGHTER]:{name:"Shield of Faith",ward:1},[X.ROGUE]:{name:"Veil of Shadows",ward:1},[X.CLERIC]:{name:"Radiant Smite",opening:3,vsUndead:6},[X.WIZARD]:{name:"Animate Corpse",summonAttack:3},[X.ALCHEMIST]:{name:"Blessed Reagents",opening:2}}},{id:"eq-silvered-mirror",type:Q.EQUIPMENT,name:"Silvered Hand-Mirror",icon:"🪞",slot:"focus",bonus:{mind:2},bestFor:X.CLERIC,text:"Shows what is standing there rather than what wants to be seen. Whoever carries it can scry as a diviner scries.",capabilities:["divination"]},{id:"eq-haunted-armor",type:Q.EQUIPMENT,name:"Haunted Armor",icon:"👻",slot:"armor",bonus:{defense:3,mind:-1},bestFor:X.FIGHTER,cursed:!0,capabilities:["conjuring"],text:"A chill down the spine — but the resident ghost hates monsters more than it hates you.",classActions:{[X.FIGHTER]:{name:"The Ghost Objects",summonAttack:1},[X.CLERIC]:{name:"The Ghost Objects",summonAttack:1},[X.WIZARD]:{name:"The Ghost Objects",summonAttack:1},[X.ROGUE]:{name:"The Ghost Objects",summonAttack:1},[X.ALCHEMIST]:{name:"The Ghost Objects",summonAttack:1}}},{id:"eq-astrolabe",type:Q.EQUIPMENT,name:"Brass Astrolabe",icon:"🔭",slot:"tool",bonus:{mind:2},bestFor:X.CLERIC,text:"The heavens folded flat and turned by hand. Whoever carries it reads the sky as an astrologer reads it.",capabilities:["astrology"]},{id:"eq-emblem-book",type:Q.EQUIPMENT,name:"Book of Emblems",icon:"📕",slot:"focus",bonus:{mind:2},bestFor:X.WIZARD,text:"Fifty pictures and fifty fugues, all making one argument. Everything answers to everything, and whoever carries it can work those answers.",capabilities:["correspondence"]},{id:"eq-grapple",type:Q.EQUIPMENT,name:"Grapple and Line",icon:"🪢",slot:"tool",bonus:{mind:1,defense:1},bestFor:X.ROGUE,text:"Forty feet of good rope. Pits become options; a shaft becomes a stairway."},{id:"eq-wand-embers",type:Q.EQUIPMENT,name:"Wand of Embers",icon:"🪄",slot:"focus",bonus:{mind:1},bestFor:X.WIZARD,text:"Warm to any hand. What comes out depends on whose.",classActions:{[X.FIGHTER]:{name:"Ember Shot",opening:4},[X.WIZARD]:{name:"Meteor Fall",opening:8},[X.CLERIC]:{name:"Flame Ward",ward:1},[X.ROGUE]:{name:"Smoke Veil",ward:1},[X.ALCHEMIST]:{name:"Accelerant Charge",opening:5}}}],ur=[{id:"sp-firebolt",type:Q.SPELL,name:"Firebolt",icon:"🔥",school:"evocation",element:"fire",power:4,use:"combat",text:"Opens combat with 4 damage before blades are drawn, and goes on burning while the fight lasts."},{id:"sp-mend",type:Q.SPELL,name:"Mending Word",icon:"💚",school:"restoration",power:5,use:"heal",text:"Restores 5 health to the most wounded companion the moment the fight turns against them, then keeps mending while it holds."},{id:"sp-light",type:Q.SPELL,name:"Dancing Light",icon:"💡",school:"evocation",power:2,use:"utility",text:"Reveals traps and ambushes in the next room — and once the oil is gone, carries the party through a march of dark for free."},{id:"sp-knock",type:Q.SPELL,name:"Knock",icon:"🚪",school:"transmutation",power:3,use:"utility",text:"Opens any lock. Loudly."},{id:"sp-fear",type:Q.SPELL,name:"Cause Fear",icon:"😱",school:"necromancy",power:4,use:"combat",text:"Weak monsters flee before the fight begins."},{id:"sp-shatter",type:Q.SPELL,name:"Shatter",icon:"🪨",school:"transmutation",element:"frost",power:4,use:"combat",aoe:!0,text:"Stone remembers being loose, and cold reminds it. Pillars, boulders and bad ceilings all listen."},{id:"sp-frost",type:Q.SPELL,name:"Frost Lance",icon:"❄️",school:"evocation",element:"frost",power:5,use:"combat",text:"Cold, precise, and deeply personal."},{id:"sp-sunder",type:Q.SPELL,name:"Sunder",icon:"💢",school:"transmutation",power:4,use:"combat",text:"Armor remembers being ore. This spell reminds it, and plate stops turning blows for the rest of the fight."},{id:"sp-eyes",type:Q.SPELL,name:"Eyes of the Mouse",icon:"👁️",school:"divination",power:2,use:"utility",text:"See what the small and cautious see. It is a lot, and it is just as much in the dark: the party never pays what the dark charges.",capabilities:["divination"]},{id:"sp-feather",type:Q.SPELL,name:"Feather Step",icon:"🪶",school:"transmutation",power:3,use:"utility",text:"The floor agrees to pretend nobody is on it: 3 less damage from anything underfoot, and no stumbling in the dark."},{id:"sp-fireball",type:Q.SPELL,name:"Fireball",icon:"🔥",school:"evocation",element:"fire",power:5,use:"combat",aoe:!0,text:"It does not stop at the monster. Whatever else in the room will burn, burns."},{id:"sp-dawnbreak",type:Q.SPELL,name:"Dawnbreak",icon:"🌟",school:"theurgy",element:"holy",power:4,use:"combat",aoe:!0,text:"Noon, indoors, all at once. Old stone and old glass both answer it.",capabilities:["correspondence"]},{id:"sp-purify",type:Q.SPELL,name:"Purify the Font",icon:"⛲",school:"theurgy",power:4,use:"heal",text:"Still water, said over and made willing — poured out when someone is failing, and again each round after. Best where the dungeon left a font.",capabilities:["rhetoric","medicine"]}],Sr=[{id:"pers-brave",type:Q.PERSONALITY,name:"The Bold",icon:"🦁",archetype:"brave",text:"Fights before fleeing; opens the ominous door. Walks the dark like a road it knows: 1 less damage a march."},{id:"pers-cunning",type:Q.PERSONALITY,name:"The Cunning",icon:"🦊",archetype:"cunning",text:"Prefers the trap disarmed, the guard bribed, the fight skipped. Trims the wick without being asked: 2 more marches of oil."},{id:"pers-greedy",type:Q.PERSONALITY,name:"The Covetous",icon:"💰",archetype:"greedy",text:"Never leaves treasure behind. Never — not even blind, which costs it 1 more damage a march in the dark."},{id:"pers-scholarly",type:Q.PERSONALITY,name:"The Scholarly",icon:"📚",archetype:"scholarly",text:"Reads everything; lingers in libraries; learns extra spells. Wastes no light doing it: 1 more march of oil."},{id:"pers-pious",type:Q.PERSONALITY,name:"The Devout",icon:"🕯️",archetype:"pious",text:"Rests at shrines; heals more; abhors desecration. Tends what the dungeon opens, so fewer blows leave a lasting scar."},{id:"pers-reckless",type:Q.PERSONALITY,name:"The Reckless",icon:"💥",archetype:"reckless",text:"Rushes in. Sometimes that works. Gloriously. Never stops to bind anything, so more of it stays as scars."},{id:"pers-craven",type:Q.PERSONALITY,name:"The Craven",icon:"🐔",archetype:"craven",trap:!0,text:"Avoids every fight it can. Notices every exit — and every tripwire. Skipped fights pay no spoils. Creeps in the dark and pays 1 more for it, but packed 2 marches of spare oil."}];function sh(){return[...nh,...ih,...ur,...Sr,...wd]}function Sd(n){return sh().find(e=>e.id===n)||null}const Md=.25,Ed=2;let Td=1;class Ra{constructor(e){this.uid=`adv-${Td++}`,this.id=e.id,this.card=e,this.name=e.name,this.cardName=e.name,this.class=e.class,this.icon=e.icon,this.trait=e.trait||"",this.givenName=null,this.backstory="",this.maxHealth=e.stats.health,this.wounds=0,this.woundBias=0,this.health=e.stats.health,this.baseAttack=e.stats.attack,this.baseDefense=e.stats.defense,this.baseMind=e.stats.mind,this.equipment=[],this.weaponMods=[],this.alive=!0}get attack(){var t;let e=this.baseAttack;for(const i of this.equipment)e+=((t=i.bonus)==null?void 0:t.attack)||0;for(const i of this.weaponMods)e+=i.attack||0;return e}get defense(){var t;let e=this.baseDefense;for(const i of this.equipment)e+=((t=i.bonus)==null?void 0:t.defense)||0;return e}get mind(){var t;let e=this.baseMind;for(const i of this.equipment)e+=((t=i.bonus)==null?void 0:t.mind)||0;return e}takeDamage(e){const t=this.health>this.woundFloor();if(this.health=Math.max(0,this.health-e),this.health<=0){this.alive=!1;return}const i=this.maxHealth*Md*(1+(this.woundBias||0));t&&e>=i&&this.wounds++}woundFloor(){return Math.ceil(this.maxHealth/3)}effectiveMax(){return Math.max(this.woundFloor(),this.maxHealth-this.wounds*Ed)}heal(e){this.alive&&(this.health=Math.min(this.effectiveMax(),this.health+e))}mendWounds(e=1/0){this.wounds=Math.max(0,this.wounds-e)}toJSON(){return{uid:this.uid,id:this.id,name:this.name,givenName:this.givenName,backstory:this.backstory,health:this.health,wounds:this.wounds,alive:this.alive,equipment:this.equipment.map(e=>({...e})),weaponMods:this.weaponMods.map(e=>({...e}))}}rename(e){const t=String(e||"").trim().slice(0,40);return this.givenName=t||null,this.name=t||this.cardName,this.name}setBackstory(e){return this.backstory=String(e||"").trim().slice(0,400),this.backstory}restore(e,t=()=>null){if(!e)return this;this.uid=e.uid||this.uid,this.name=e.name??this.name,this.givenName=e.givenName??null,this.backstory=e.backstory||"",this.health=Math.min(this.maxHealth,e.health??this.health),this.wounds=e.wounds??0,this.alive=e.alive!==!1;const i=s=>s&&(t(s.id)||s)||null;return this.equipment=(e.equipment||[]).map(i).filter(Boolean),this.weaponMods=(e.weaponMods||[]).map(i).filter(Boolean),this}isAlive(){return this.alive&&this.health>0}equip(e){this.equipment.push(e)}addWeaponMod(e){this.weaponMods.push(e)}}function Ad(){return new Ra({id:"char-volunteer",name:"Pip the Tavern Volunteer",class:X.FIGHTER,icon:"🍺",stats:{health:10,attack:2,defense:1,mind:2},trait:"Nobody drafted a hero, so Pip grabbed a stool leg and came along."})}const Rd={brave:{dark:-1,text:"The Bold walk the dark like a road they know. It costs them less than it should.",supplyText:null},craven:{dark:1,supply:2,text:"The Craven creep, and the dark takes its time with them.",supplyText:"The Craven packed more oil than anyone thought necessary. Nobody is laughing now."},greedy:{dark:1,text:"The Covetous will not leave a room unsearched, even blind. It costs them.",supplyText:null},cunning:{supply:2,text:null,supplyText:"The Cunning trimmed the wick and measured the oil before anyone asked."},pious:{wound:.35,text:null,woundText:"The Devout tend what the dungeon opens: fewer blows leave a mark that stays.",supplyText:null},reckless:{wound:-.25,text:null,woundText:"The Reckless do not stop to bind anything, and more of it stays with them.",supplyText:null},scholarly:{supply:1,text:null,supplyText:"The Scholarly read the passage before walking it, and wasted no light doing it."}};function ir(n){const e={dark:0,supply:0,wound:0,notes:[],supplyNotes:[],woundNotes:[]};for(const t of n.personalities||[]){const i=Rd[t];i&&(e.dark+=i.dark||0,e.supply+=i.supply||0,e.wound+=i.wound||0,i.text&&e.notes.push({archetype:t,text:i.text}),i.supplyText&&e.supplyNotes.push({archetype:t,text:i.supplyText}),i.woundText&&e.woundNotes.push({archetype:t,text:i.woundText}))}return e}const kn=4,el=8,Zi=3,tl={easy:1.1,medium:.85,hard:.7,nightmare:.55};class Oi{constructor(e){const t={},i=e.filter(r=>r.type===Q.CHARACTER).map(r=>{const o=new Ra(r);if(t[r.name]=(t[r.name]||0)+1,t[r.name]>1){const l=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"][Math.min(t[r.name]-1,5)];o.name=`${r.name}, ${l}`}return o});this.members=i.slice(0,kn),this.reserve=i.slice(kn),this.members.length===0&&this.members.push(Ad()),this.grimoire=e.filter(r=>r.type===Q.SPELL).map(r=>({...r,source:"prepared"})),this.castThisRoom=new Set,this.personalities=e.filter(r=>r.type===Q.PERSONALITY).map(r=>r.archetype),this.applyTemper();const s=e.filter(r=>r.type===Q.EQUIPMENT);for(const r of s)this.assignEquipment(r);this.pack=[],this.supply=el,this.marches=0,this.potions=[],this.trophies=[],this.gold=0,this.score=0,this.spellsLearned=0,this.encounterHistory={}}assignEquipment(e){const t=this.living();if(t.length===0)return null;let i=null;if(e.bestFor){const s=t.filter(r=>r.class===e.bestFor);s.length>0&&(i=s.reduce((r,o)=>r.equipment.length<=o.equipment.length?r:o))}return i||(i=t.reduce((s,r)=>s.equipment.length<=r.equipment.length?s:r)),i.equip(e),this.personalities&&this.applyTemper(),i}equipTo(e,t){const i=[...this.members,...this.reserve].find(a=>a.name===t);if(!i)return null;let s=null,r=null;for(const a of[...this.members,...this.reserve]){const l=a.equipment.findIndex(c=>c.id===e);if(l>=0){s=a,r=a.equipment[l];break}}if(!r){const a=this.pack.findIndex(l=>l.id===e);if(a<0)return null;r=this.pack[a]}if(s===i)return{moved:r,from:i,to:i,displaced:null};let o=null;if(r.slot){const a=i.equipment.findIndex(l=>l.slot===r.slot);a>=0&&(o=i.equipment.splice(a,1)[0])}return s?s.equipment=s.equipment.filter(a=>a.id!==e):this.pack=this.pack.filter(a=>a.id!==e),i.equip(r),o&&(s&&!s.equipment.some(l=>l.slot===o.slot)?s.equip(o):this.pack.push(o)),this.applyTemper(),{moved:r,from:s,to:i,displaced:o}}unequip(e){for(const t of[...this.members,...this.reserve]){const i=t.equipment.findIndex(s=>s.id===e);if(i>=0){const[s]=t.equipment.splice(i,1);return this.pack.push(s),this.applyTemper(),s}}return null}assignCaster(e,t){const i=this.grimoire.find(r=>r.id===e);if(!i)return null;if(!t)return delete i.casterUid,delete i.casterName,i;const s=this.members.find(r=>r.name===t||r.uid===t);return s?(i.casterUid=s.uid,i.casterName=s.name,i):null}casterOf(e){return e!=null&&e.casterUid&&this.living().find(t=>t.uid===e.casterUid)||null}renameMember(e,t){if(!e)return null;const i=e.rename(t);for(const s of this.grimoire)s.casterUid===e.uid&&(s.casterName=i);return i}mindFor(e){const t=this.casterOf(e);return t?t.mind:this.bestMind()}toJSON(){return{members:this.members.map(e=>e.toJSON()),reserve:this.reserve.map(e=>e.toJSON()),grimoire:this.grimoire.map(e=>({...e})),personalities:[...this.personalities],trophies:this.trophies.map(e=>({...e})),gold:this.gold,score:this.score,potions:this.potions.map(e=>({...e})),pack:this.pack.map(e=>({...e})),supply:this.supply,spellsLearned:this.spellsLearned,poisonLinger:this.poisonLinger||0,alarmed:!!this.alarmed,desecrated:!!this.desecrated}}static fromJSON(e,t){const i=[];for(const l of e.members||[]){const c=t(l.id);c&&i.push(c)}for(const l of e.reserve||[]){const c=t(l.id);c&&i.push(c)}const s=new Oi(i),r=[...s.members,...s.reserve],o=[...e.members||[],...e.reserve||[]];r.forEach((l,c)=>l.restore(o[c],t));const a=l=>l&&{...t(l.id)||{},...l};return s.grimoire=(e.grimoire||[]).map(a).filter(Boolean),s.personalities=[...e.personalities||[]],s.trophies=(e.trophies||[]).map(l=>({...l})),s.gold=e.gold||0,s.score=e.score||0,s.potions=(e.potions||[]).map(l=>({...l})),s.pack=(e.pack||[]).map(a).filter(Boolean),s.supply=e.supply??s.supply,s.spellsLearned=e.spellsLearned||0,s.poisonLinger=e.poisonLinger||0,s.alarmed=!!e.alarmed,s.desecrated=!!e.desecrated,s}applyTemper(){const e=ir(this).wound;for(const t of[...this.members,...this.reserve])t.woundBias=e+0;return e}capabilities(){var t;const e=new Set;for(const i of this.living()){const s=((t=i.card)==null?void 0:t.capabilities)||[];for(const r of s)e.add(r);for(const r of i.equipment){const o=r.capabilities||[];for(const a of o)e.add(a)}}for(const i of this.pack||[])for(const s of i.capabilities||[])e.add(s);for(const i of this.grimoire||[])for(const s of i.capabilities||[])e.add(s);return e}hasCapability(e){return this.capabilities().has(e)}capabilityHolders(e){var i;const t=[];for(const s of this.living()){(((i=s.card)==null?void 0:i.capabilities)||[]).includes(e)&&t.push({member:s,source:"character"});for(const o of s.equipment)(o.capabilities||[]).includes(e)&&t.push({member:s,source:"equipment",equipment:o})}for(const s of this.grimoire||[])(s.capabilities||[]).includes(e)&&t.push({member:{name:"the grimoire"},source:"spell",equipment:s});return t}living(){return this.members.filter(e=>e.isAlive())}addMember(e){const t=new Ra(e),i=[...this.members,...this.reserve].filter(s=>s.name.startsWith(e.name)).length;if(i>0){const s=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"];t.name=`${e.name}, ${s[Math.min(i,5)]}`}return this.living().length>=kn?this.reserve.push(t):this.members.push(t),t}isBenched(e){return this.reserve.includes(e)}promoteReserve(){if(this.reserve.length===0||this.living().length>=kn)return null;const e=this.reserve.shift();return this.members.push(e),e}isAlive(){return this.living().length>0}size(){return this.living().length}hasClass(e){return this.living().some(t=>t.class===e)}hasPersonality(e){return this.personalities.includes(e)}totalAttack(){return this.living().reduce((e,t)=>e+t.attack,0)}combatAttack(e=kn){const t=Math.max(1,Math.min(e,kn)),i=this.living().map(o=>o.attack).sort((o,a)=>a-o),s=i.slice(0,t).reduce((o,a)=>o+a,0),r=i.slice(t).reduce((o,a)=>o+a,0);return Math.round(s+r*.25)}totalDefense(){return this.living().reduce((e,t)=>e+t.defense,0)}bestMind(){return Math.max(0,...this.living().map(e=>e.mind))}totalHealth(){return this.living().reduce((e,t)=>e+t.health,0)}totalMaxHealth(){return this.members.reduce((e,t)=>e+t.maxHealth,0)}coatingBonusVs(e){let t=0;const i=new Set;for(const s of this.living())for(const r of s.weaponMods)r.element&&((e.weak||[]).includes(r.element)||r.element==="holy"&&e.undead)?(t+=2,i.add(r.name)):r.venom&&!e.undead&&(t+=1,i.add(r.name));return{bonus:t,notes:[...i]}}combatItemActions(){var t;const e=[];for(const i of this.living())for(const s of i.equipment){const r=(t=s.classActions)==null?void 0:t[i.class];r&&e.push({member:i.name,item:s.name,...r})}return e}pointMan(){return this.damageOrder()[0]||null}damageOrder(){return[...this.living().filter(e=>e.class===X.FIGHTER),...this.living().filter(e=>e.class!==X.FIGHTER)]}takeDamage(e){let t=e;const i=this.damageOrder();for(const s of i){if(t<=0)break;const r=Math.min(t,s.health);s.takeDamage(r),t-=r}}healParty(e){const t=this.living().filter(i=>i.health<i.maxHealth).sort((i,s)=>i.health/i.maxHealth-s.health/s.maxHealth);t.length!==0&&t[0].heal(e)}burnSupply(){this.marches++;const t=!this.living().some(l=>l.equipment.some(c=>c.id==="eq-lantern"))||this.marches%2===0;if(this.supply>0)return t?(this.supply--,this.supply===0?{kind:"guttered",supply:0}:this.supply<=2?{kind:"low",supply:this.supply}:null):null;const i=l=>{const c=this.darkCovered!==l;return this.darkCovered=l,c},s=this.castSpell("utility","sp-light");if(s)return i("conjured")?{kind:"conjured",supply:0,full:Zi,source:s.name}:null;const r=this.castSpell("utility","sp-feather");if(r)return i("sure-footed")?{kind:"sure-footed",supply:0,full:Zi,source:r.name}:null;if(this.canSeeInDark()){const l=this.grimoire.find(c=>c.id==="sp-eyes");return i("dark-seen")?{kind:"dark-seen",supply:0,full:Zi,source:(l==null?void 0:l.name)||"night-sight"}:null}this.darkCovered=null;const o=ir(this),a=Math.max(1,Zi+o.dark);for(const l of this.living())l.takeDamage(a);return this.darkMarches=(this.darkMarches||0)+1,{kind:"dark",supply:0,damage:a,full:Zi,temper:o.notes,darkMarches:this.darkMarches}}canSeeInDark(){return this.grimoire.some(e=>e.id==="sp-eyes")}provision(e,t="medium"){const i=tl[t]??tl.medium,s=0,r=ir(this);return this.supply=Math.max(2,Math.round(e*i)+s+r.supply),this.provisionNotes=r.supplyNotes,this.marches=0,this.supply}addSupply(e){const t=this.supply;return this.supply=Math.min(el*3,this.supply+e),this.supply-t}restStep(){return this.hasClass(X.CLERIC)&&this.healParty(1),this.castThisRoom.clear(),this.burnSupply()}applyLinger(){if(!this.poisonLinger)return null;const e=this.poisonLinger;return this.poisonLinger=0,this.hasClass(X.CLERIC)?{cured:!0}:(this.takeDamage(e),{damage:e})}castSpell(e,t=null){const i=c=>(t?c.id===t:c.use===e)&&!this.castThisRoom.has(c.id),s=this.grimoire.findIndex(i);if(s===-1)return null;const r=this.grimoire[s],o=this.hasClass(X.WIZARD),a=r.power+Math.floor(this.mindFor(r)/2)+(o?2:0),l=r.source==="found";return l?this.grimoire.splice(s,1):this.castThisRoom.add(r.id),{...r,effectivePower:a,consumed:l}}castHealIfNeeded(){const e=this.living().find(i=>i.health/i.maxHealth<=.4);if(!e)return null;const t=this.castSpell("heal");return t?(e.heal(t.effectivePower),{spell:t,target:e}):null}quaffIfNeeded(){if(this.potions.length===0)return!1;const e=this.living().find(i=>i.health/i.maxHealth<=.4);if(!e)return!1;const t=this.potions.shift();return e.heal(t.heal),!0}recordEncounter(e,t){this.encounterHistory[e]||(this.encounterHistory[e]={wins:0,losses:0}),this.encounterHistory[e][t?"wins":"losses"]++}addScore(e){this.score+=e}addGold(e){this.gold+=e,this.score+=e}}const Cd={[Q.CHARACTER]:nh,[Q.EQUIPMENT]:ih,[Q.SPELL]:ur,[Q.PERSONALITY]:Sr},vn={character:{statTotal:34},equipment:{bonusTotal:4},spell:{maxPower:6}},nl=Sr.map(n=>n.archetype);function rh(n){const e=[];if(!n||typeof n!="object")return["not a card"];if(n.id||e.push("needs an id"),(!n.name||n.name.length<2)&&e.push("needs a name"),Object.values(Q).includes(n.type)||e.push(`unknown type "${n.type}"`),n.type===Q.CHARACTER){Object.values(X).includes(n.class)||e.push(`unknown class "${n.class}"`);const t=n.stats||{};for(const s of["health","attack","defense","mind"])Number.isFinite(t[s])&&t[s]>=1||e.push(`stat ${s} must be ≥ 1`);const i=(t.health||0)+(t.attack||0)*2+(t.defense||0)*2+(t.mind||0);i>vn.character.statTotal&&e.push(`stat budget ${i} exceeds ${vn.character.statTotal} (health + 2×attack + 2×defense + mind)`)}if(n.type===Q.EQUIPMENT){const t=n.bonus||{},i=Object.values(t).reduce((s,r)=>s+r,0);i>vn.equipment.bonusTotal&&e.push(`bonus total ${i} exceeds ${vn.equipment.bonusTotal}`),Object.keys(t).length===0&&e.push("equipment needs at least one bonus")}return n.type===Q.SPELL&&(["combat","heal","utility"].includes(n.use)||e.push("spell use must be combat/heal/utility"),Number.isFinite(n.power)&&n.power>=1&&n.power<=vn.spell.maxPower||e.push(`spell power must be 1–${vn.spell.maxPower}`)),n.type===Q.PERSONALITY&&(nl.includes(n.archetype)||e.push(`personality archetype must be one of: ${nl.join(", ")}`)),e}function ah(n){const e=[];(!(n!=null&&n.id)||!(n!=null&&n.name))&&e.push("a pack needs an id and a name"),(!Array.isArray(n==null?void 0:n.cards)||n.cards.length===0)&&e.push("a pack needs cards");const t=new Set;for(const i of(n==null?void 0:n.cards)||[]){for(const s of rh(i))e.push(`${(i==null?void 0:i.name)||(i==null?void 0:i.id)||"?"}: ${s}`);t.has(i.id)&&e.push(`duplicate card id ${i.id}`),t.add(i.id)}return e}const Ii=[];function ys(n,{enabled:e=!0}={}){const t=ah(n);if(t.length)throw new Error(`invalid pack: ${t.join("; ")}`);const i=Ii.findIndex(r=>r.pack.id===n.id),s={pack:n,enabled:e};return i>=0?Ii[i]=s:Ii.push(s),s}function Ld(n,e){const t=Ii.find(i=>i.pack.id===n);return t&&(t.enabled=e),t||null}function Pd(){return Ii.map(n=>({id:n.pack.id,name:n.pack.name,description:n.pack.description,cards:n.pack.cards.length,enabled:n.enabled}))}function Ts(n){const e=Ii.filter(t=>t.enabled).flatMap(t=>t.pack.cards.filter(i=>i.type===n));return[...Cd[n]||[],...e]}class oh{constructor(e){this.seed=this.hashCode(String(e))%2147483647,this.seed<=0&&(this.seed+=2147483646);for(let t=0;t<3;t++)this.next()}hashCode(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t=t&t;return Math.abs(t)}next(){return this.seed=this.seed*16807%2147483647,(this.seed-1)/2147483646}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let i=t.length-1;i>0;i--){const s=Math.floor(this.next()*(i+1));[t[i],t[s]]=[t[s],t[i]]}return t}}const Id=[{id:"warlord",name:"The Warlord",icon:"⚔️",desc:"Drafts muscle first: fighters, weapons, and the will to use them.",skill:.55,weights:{character:3,equipment:2.5,spell:.8,personality:1},classBias:{fighter:3,rogue:1.5}},{id:"archmage",name:"The Archmage",icon:"🔮",desc:"Hoards spells and the wizards to wield them.",skill:.5,weights:{character:2,equipment:1,spell:3,personality:1},classBias:{wizard:3,cleric:1.5}},{id:"guildmaster",name:"The Guildmaster",icon:"⚖️",desc:"Balances the ledger: a bit of everything, nothing wasted.",skill:.7,weights:{character:2,equipment:2,spell:2,personality:2},classBias:{rogue:2,alchemist:2}}];function kd(n){const e=[],t=new Set,i=(s,r)=>{const o=n.shuffle(s);let a=0;for(const l of o){if(a>=r)break;t.has(l.id)||(t.add(l.id),e.push({...l}),a++)}};return i(Ts(Q.CHARACTER),2),i(Ts(Q.EQUIPMENT),4),i(Ts(Q.SPELL),2),i(Ts(Q.PERSONALITY),1),n.shuffle(e)}const lh=["eq-lantern","sp-light","sp-eyes"];function Dd(n){return n.filter(e=>lh.includes(e.id)).length}function Nd(n,e){const t=e.filter(s=>s.type===Q.CHARACTER);let i=1;if(n.type===Q.CHARACTER&&(t.length<kn?i=6.5-t.length*.4:t.length===kn?i=2:i=.2,n.class===X.CLERIC&&!t.some(s=>s.class===X.CLERIC)&&(i+=1.5)),n.type===Q.EQUIPMENT){const s=e.filter(r=>r.type===Q.EQUIPMENT).length;i=2,n.classActions&&(i+=2),n.bestFor&&t.some(r=>r.class===n.bestFor)&&(i+=1),n.cursed&&(i-=.2),s>=6&&(i-=(s-5)*.35)}if(n.type===Q.SPELL){const s=e.filter(r=>r.type===Q.SPELL).length;i=2+(t.some(r=>r.class===X.WIZARD)?1:0)+(n.use==="heal"?.5:0),s>=4&&(i-=(s-3)*.45)}if(lh.includes(n.id)){const s=Dd(e);i+=s===0?3:s===1?.5:0}return n.type===Q.PERSONALITY&&(i=1-e.filter(r=>r.type===Q.PERSONALITY).length*1.2,n.archetype==="craven"&&(i-=1),(n.archetype==="reckless"||n.archetype==="greedy")&&(i+=.3)),i}function Ud(n,e,t){var o,a;const i=t.filter(l=>l.type===Q.CHARACTER),s=e.quirks||{};let r=((o=e.weights)==null?void 0:o[n.type])??1;if(n.type===Q.CHARACTER&&(r+=((a=e.classBias)==null?void 0:a[n.class])||0,r-=i.length*.35,!s.bodyBlind&&i.length===0&&(r+=3)),n.type===Q.EQUIPMENT&&n.cursed&&(r+=s.curseChaser?.8:-.8),s.shiny&&(n.classActions||n.type===Q.SPELL&&n.power>=5)&&(r+=s.shiny),n.type===Q.PERSONALITY){const l=t.filter(c=>c.type===Q.PERSONALITY);r-=l.length*1.2,n.trap&&!s.curseChaser&&(r-=.6)}return r}function Od(n,e,t,i){const s=e.skill??.5,r=i.next()*(.4+(1-s)*1.6);return s*Nd(n,t)+(1-s)*Ud(n,e,t)+r}function Fd(n,e,t,i){let s=null,r=-1/0;for(const o of n){const a=Od(o,e,t,i);a>r&&(r=a,s=o)}return s}class Bd{constructor(e="table",t=3){this.rng=new oh(e),this.numRounds=t,this.seats=[{id:"player",name:"You",icon:"🐍",isAI:!1,pool:[]},...Id.map(i=>({id:i.id,name:i.name,icon:i.icon,isAI:!0,persona:i,pool:[]}))],this.round=0,this.pickInRound=0,this.packs=[],this.finished=!1,this.log=[],this.openNewPacks()}openNewPacks(){this.packs=this.seats.map(()=>kd(this.rng)),this.pickInRound=0}passDirection(){return this.round%2===0?1:-1}getPlayerPack(){return this.packs[0]}playerPick(e){if(this.finished)return null;const t=this.packs[0],i=t.findIndex(o=>o.id===e);if(i===-1)return null;const s=t.splice(i,1)[0];this.seats[0].pool.push(s),this.log.push({round:this.round,pick:this.pickInRound,seat:0,card:s});const r=[];for(let o=1;o<this.seats.length;o++){const a=this.seats[o],l=Fd(this.packs[o],a.persona,a.pool,this.rng);if(l){const c=this.packs[o].findIndex(d=>d.id===l.id);this.packs[o].splice(c,1),a.pool.push(l),this.log.push({round:this.round,pick:this.pickInRound,seat:o,card:l}),r.push({seat:a.name,icon:a.icon,card:l})}}return this.pickInRound++,this.packs[0].length>0?this.passDirection()===1?this.packs.unshift(this.packs.pop()):this.packs.push(this.packs.shift()):(this.round++,this.round>=this.numRounds?this.finished=!0:this.openNewPacks()),{playerCard:s,aiPicks:r}}getPlayerPool(){const e=this.seats[0].pool;return{all:e,characters:e.filter(t=>t.type===Q.CHARACTER),equipment:e.filter(t=>t.type===Q.EQUIPMENT),spells:e.filter(t=>t.type===Q.SPELL),personalities:e.filter(t=>t.type===Q.PERSONALITY)}}getTableSummary(){return this.seats.map(e=>({name:e.name,icon:e.icon,isAI:e.isAI,counts:{characters:e.pool.filter(t=>t.type===Q.CHARACTER).length,equipment:e.pool.filter(t=>t.type===Q.EQUIPMENT).length,spells:e.pool.filter(t=>t.type===Q.SPELL).length,personalities:e.pool.filter(t=>t.type===Q.PERSONALITY).length}}))}}const zd={warcraft:{name:"Warcraft",icon:"⚔️",text:"Formations, duels, and the reading of a fight before it starts."},roguery:{name:"Roguery",icon:"🗡️",text:"Locks, shadows, ciphers, and the exits nobody else noticed."},observation:{name:"Observation",icon:"👁️",text:"Notices what a careless party would miss, and what a thing is worth."},tinkering:{name:"Tinkering",icon:"🔧",text:"Mechanisms, instruments, and the patience to test until it works."},alchemy:{name:"Alchemy",icon:"⚗️",text:"Substances, reactions, and non-occult explanations for occult problems."},medicine:{name:"Medicine",icon:"💊",text:"Diagnoses, treats, and mends the body."},scholarship:{name:"Scholarship",icon:"📖",text:"Texts, histories, tongues, and the memory that holds them in relation."},astrology:{name:"Astrology",icon:"🔭",text:"The sky, the number, and everything that moves by either."},divination:{name:"Divination",icon:"🔮",text:"Knowing the hidden before committing to it."},conjuring:{name:"Conjuring",icon:"🪄",text:"Summons, binds, and imagines what is not flesh into answering."},correspondence:{name:"Correspondence",icon:"🔗",text:"The links between systems — metals to planets, tones to spheres, one tradition to another."},rhetoric:{name:"Rhetoric",icon:"🤝",text:"Persuasion, disputation, and the bargain nobody planned to offer."}},Hd={warcraft:["roguery","observation"],roguery:["observation","warcraft","tinkering"],observation:["roguery","divination","tinkering"],tinkering:["observation","alchemy","astrology"],alchemy:["tinkering","medicine","correspondence"],medicine:["alchemy","scholarship"],scholarship:["correspondence","rhetoric","medicine"],astrology:["divination","correspondence","tinkering"],divination:["astrology","conjuring","observation"],conjuring:["divination","correspondence"],correspondence:["scholarship","astrology","conjuring"],rhetoric:["scholarship","correspondence","warcraft"]};function ch(n=[]){const e=new Set(n);for(const t of n)for(const i of Hd[t]||[])e.add(i);return e}function Gd(n){const e=n.capabilities||[];return e.length===0?"":`<div class="card-caps" style="margin-top:0.3rem;font-size:0.68rem;display:flex;gap:0.3rem;flex-wrap:wrap;">${e.map(i=>{const s=zd[i];return s?`<span style="color:#9fc4a8;border:1px solid #3a4a3e;border-radius:3px;padding:0 0.3rem;" title="${s.text}">${s.icon} ${s.name}</span>`:""}).join("")}</div>`}class Vd{constructor(e,t){this.draft=e,this.onComplete=t,this.lastAiPicks=[],this.selection={seed:"",difficulty:"medium"}}render(){const e=document.getElementById("draft-container");if(e.innerHTML="",e.style.display="block",this.draft.finished){this.renderDraftComplete(e);return}const t=this.draft.round+1,i=this.draft.pickInRound+1,s=this.draft.passDirection()===1?"→ passing left":"← passing right",r=document.createElement("div");r.style.cssText="text-align:center;margin-bottom:1rem;",r.innerHTML=`
      <div style="color:#d8a53f;font-size:1.1rem;font-weight:bold;">Pack ${t} of ${this.draft.numRounds} — Pick ${i}</div>
      <div style="color:#887755;font-size:0.8rem;">${s} · click ONE card to draft it, then the pack passes on</div>
      <div style="font-size:0.72rem;margin-top:0.4rem;display:flex;gap:0.9rem;justify-content:center;flex-wrap:wrap;">
        <span class="type-character">● Character</span>
        <span class="type-equipment">● Equipment</span>
        <span class="type-spell">● Spell</span>
        <span class="type-personality">● Personality</span>
      </div>
    `,e.appendChild(r);const o=document.createElement("div");o.className="pack-grid";for(const a of this.draft.getPlayerPack())o.appendChild(this.renderCard(a,()=>this.pick(a.id)));if(e.appendChild(o),this.lastAiPicks.length>0){const a=document.createElement("div");a.className="panel",a.style.cssText="margin-top:1rem;",a.innerHTML="<h2>The Table's Last Picks</h2>"+this.lastAiPicks.map(l=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${l.icon} ${l.seat} took <strong style="color:#c8b088;">${l.card.icon} ${l.card.name}</strong></div>`).join(""),e.appendChild(a)}this.renderPool(e)}renderCard(e,t){const i=document.createElement("div");i.className="draft-card";const s={fire:'<span style="color:#ff8a3c;">🔥 fire</span>',frost:'<span style="color:#7ec8ff;">❄️ frost</span>',shock:'<span style="color:#ffe95e;">⚡ shock</span>',holy:'<span style="color:#ffe9a0;">🌟 holy</span>'};let r="";if(e.type===Q.CHARACTER)r=`<div class="card-stats">❤️${e.stats.health} ⚔️${e.stats.attack} 🛡️${e.stats.defense} 🧠${e.stats.mind}</div>`;else if(e.type===Q.EQUIPMENT){const a=Object.entries(e.bonus).map(([c,d])=>`${d>0?"+":""}${d} ${c}`).join(", "),l=e.classActions?` · <span style="color:#d8a53f;" title="${Object.entries(e.classActions).map(([c,d])=>`${c}: ${d.name}`).join(" · ")}">✦ different in every hand</span>`:"";r=`<div class="card-stats">${a}${e.bestFor?` · best: ${e.bestFor}`:""}${l}</div>`}else if(e.type===Q.SPELL){const a=s[e.element]?` · ${s[e.element]}`:"";r=`<div class="card-stats">power ${e.power} · ${e.use}${a}</div>`}const o=e.cursed?' <span style="color:#e05555;">· CURSED</span>':"";return i.innerHTML=`
      <div class="card-type type-${e.type}">${e.type}${e.class?" · "+e.class:""}${o}</div>
      <div class="card-name">${e.icon} ${e.name}</div>
      <div class="card-text">${e.trait||e.text||""}</div>
      ${r}
      ${Gd(e)}
    `,i.addEventListener("click",t),i}pick(e){const t=this.draft.playerPick(e);t&&(this.lastAiPicks=t.aiPicks),this.render()}renderPool(e){const t=this.draft.getPlayerPool(),i=document.createElement("div");i.className="panel",i.style.cssText="margin-top:1rem;";const s=(r,o)=>o.length?`<div style="margin-bottom:0.4rem;"><span style="color:#887755;font-size:0.72rem;">${r}:</span> ${o.map(a=>`${a.icon} ${a.name}`).join(" · ")}</div>`:"";i.innerHTML=`
      <h2>Your Pool (${t.all.length} cards)</h2>
      <div style="font-size:0.78rem;line-height:1.6;">
        ${s("Party",t.characters)||'<div style="color:#775544;font-size:0.75rem;">⚠️ No characters yet — a party of zero gets Pip the Tavern Volunteer</div>'}
        ${s("Equipment",t.equipment)}
        ${s("Grimoire",t.spells)}
        ${s("Personalities",t.personalities)}
      </div>
    `,e.appendChild(i)}renderDraftComplete(e){const t=this.draft.getPlayerPool(),i=document.createElement("div");i.style.cssText="text-align:center;margin-bottom:1.25rem;",i.innerHTML=`
      <div style="color:#d8a53f;font-size:1.2rem;font-weight:bold;">The Draft Is Done</div>
      <div style="color:#887755;font-size:0.85rem;">Party of ${Math.max(1,t.characters.length)} · ${t.equipment.length} equipment · ${t.spells.length} spells · ${t.personalities.length} personalities</div>
    `,e.appendChild(i);const s=document.createElement("div");s.className="pack-grid";for(const l of t.all){const c=this.renderCard(l,()=>{});c.style.cursor="default",s.appendChild(c)}e.appendChild(s);const r=document.createElement("div");r.className="panel",r.style.cssText="margin-top:1rem;",r.innerHTML="<h2>The Rest of the Table</h2>"+this.draft.getTableSummary().filter(l=>l.isAI).map(l=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${l.icon} ${l.name}: party of ${l.counts.characters}, ${l.counts.equipment} equipment, ${l.counts.spells} spells</div>`).join(""),e.appendChild(r);const o=document.createElement("div");o.className="panel",o.style.cssText="margin-top:1rem;",o.innerHTML=`
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
    `,e.appendChild(o);const a=document.createElement("button");a.textContent="🏰 Enter the Dungeon",a.style.cssText="width:100%;margin-top:1rem;padding:1rem;font-size:1rem;",a.addEventListener("click",()=>{const l=document.getElementById("difficulty-select").value,c=document.getElementById("seed-input").value.trim()||`delve-${Date.now().toString(36)}`;this.onComplete({pool:t.all,difficulty:l,seed:c})}),e.appendChild(a)}}class $d{constructor(e){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext("2d")}render(e){const t=this.ctx,{dungeon:i,roomIndex:s,party:r}=e,o=this.canvas.clientWidth||500,a=this.canvas.clientHeight||420;(this.canvas.width!==o||this.canvas.height!==a)&&(this.canvas.width=o,this.canvas.height=a),t.fillStyle="#0d0b08",t.fillRect(0,0,o,a);const l=i.rooms,c=l[Math.min(s,l.length-1)],d=(c==null?void 0:c.floor)||0,h=b=>(b.floor||0)===d,f=l.filter(b=>h(b)&&!(b.secret&&!b.discovered));if(f.length===0)return;const p=26,g=Math.min(...f.map(b=>b.x-(b.w||4)/2)),v=Math.max(...f.map(b=>b.x+(b.w||4)/2)),m=Math.min(...f.map(b=>b.y-(b.h||4)/2)),u=Math.max(...f.map(b=>b.y+(b.h||4)/2)),x=Math.min((o-p*2)/Math.max(1,v-g),(a-p*2)/Math.max(1,u-m)),E=b=>p+(b.x-g)*x,S=b=>p+(b.y-m)*x,I=l[Math.min(s,l.length-1)];t.strokeStyle="#3a2f1e",t.lineWidth=Math.max(3,x*1.4);for(const b of i.edges||[]){if(b.kind==="trapdoor"||b.kind==="stair")continue;const A=l[b.a],C=l[b.b];!A||!C||!h(A)||!h(C)||A.secret&&!A.discovered||C.secret&&!C.discovered||(t.setLineDash(b.secret?[4,3]:[]),t.beginPath(),t.moveTo(E(A),S(A)),t.lineTo(E(C),S(C)),t.stroke())}t.setLineDash([]);for(let b=0;b<l.length;b++){const A=l[b];if(!h(A)||A.secret&&!A.discovered)continue;const C=Math.max(6,(A.w||4)*x),w=Math.max(6,(A.h||4)*x),y=E(A),T=S(A),N=A===I,L=A.cleared,B=A.type==="boss";if(N){const G=Math.max(C,w),K=t.createRadialGradient(y,T,4,y,T,G);K.addColorStop(0,"rgba(216, 165, 63, 0.45)"),K.addColorStop(1,"rgba(216, 165, 63, 0)"),t.fillStyle=K,t.fillRect(y-G,T-G,G*2,G*2)}t.fillStyle=N?"#2a2213":L?"#171310":"#14110b",t.strokeStyle=N?"#d8a53f":B?"#8a3a3a":"#3a2f1e",t.lineWidth=N?2.5:1.5,A.shape==="rotunda"?(t.beginPath(),t.arc(y,T,Math.min(C,w)/2,0,Math.PI*2),t.fill(),t.stroke()):(t.fillRect(y-C/2,T-w/2,C,w),t.strokeRect(y-C/2,T-w/2,C,w));const W=A.cleared||N||B||(e.knownIdxs?e.knownIdxs.includes(b):!0);t.font=`${Math.max(10,Math.min(20,Math.min(C,w)*.5))}px serif`,t.textAlign="center",t.textBaseline="middle",t.globalAlpha=L&&!N?.45:1,t.fillText(W?A.icon:"❓",y,N?T-w*.3:T),t.globalAlpha=1}if((d>0||l.some(b=>(b.floor||0)>0))&&(t.fillStyle="#8a7a58",t.font="12px system-ui, sans-serif",t.textAlign="left",t.textBaseline="top",t.fillText(`Floor ${d+1}`,8,8)),I&&r&&!(I.secret&&!I.discovered)){const b=r.members.filter(L=>L.alive),A=Math.max(6,(I.w||4)*x),C=Math.max(6,(I.h||4)*x),w=E(I),y=S(I)+C*.18;t.font=`${Math.max(11,Math.min(16,x))}px serif`,t.textAlign="center",t.textBaseline="middle";const T=C>A?Math.min(b.length,2):Math.min(b.length,4),N=Math.min(x*1.1,A/Math.max(1,T+.5));b.forEach((L,B)=>{const W=Math.floor(B/T),G=B%T,K=Math.min(T,b.length-W*T),V=(G-(K-1)/2)*N;t.fillText(L.icon,w+V,y+W*Math.min(x,C*.22))})}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ao="170",Wd=0,il=1,qd=2,hh=1,dh=2,gn=3,Bn=0,Ct=1,yn=2,Un=0,ki=1,Ca=2,sl=3,rl=4,Xd=5,Kn=100,Yd=101,jd=102,Jd=103,Kd=104,Zd=200,Qd=201,eu=202,tu=203,La=204,Pa=205,nu=206,iu=207,su=208,ru=209,au=210,ou=211,lu=212,cu=213,hu=214,Ia=0,ka=1,Da=2,Fi=3,Na=4,Ua=5,Oa=6,Fa=7,uh=0,du=1,uu=2,On=0,fu=1,pu=2,mu=3,gu=4,vu=5,yu=6,_u=7,fh=300,Bi=301,zi=302,Ba=303,za=304,Mr=306,Ha=1e3,Qn=1001,Ga=1002,Ut=1003,xu=1004,As=1005,sn=1006,Ir=1007,ei=1008,Mn=1009,ph=1010,mh=1011,_s=1012,Ro=1013,ni=1014,xn=1015,bs=1016,Co=1017,Lo=1018,Hi=1020,gh=35902,vh=1021,yh=1022,Kt=1023,_h=1024,xh=1025,Di=1026,Gi=1027,bh=1028,Po=1029,wh=1030,Io=1031,ko=1033,sr=33776,rr=33777,ar=33778,or=33779,Va=35840,$a=35841,Wa=35842,qa=35843,Xa=36196,Ya=37492,ja=37496,Ja=37808,Ka=37809,Za=37810,Qa=37811,eo=37812,to=37813,no=37814,io=37815,so=37816,ro=37817,ao=37818,oo=37819,lo=37820,co=37821,lr=36492,ho=36494,uo=36495,Sh=36283,fo=36284,po=36285,mo=36286,bu=3200,wu=3201,Mh=0,Su=1,Dn="",St="srgb",qi="srgb-linear",Er="linear",Ze="srgb",oi=7680,al=519,Mu=512,Eu=513,Tu=514,Eh=515,Au=516,Ru=517,Cu=518,Lu=519,go=35044,ol="300 es",bn=2e3,fr=2001;class Xi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],kr=Math.PI/180,vo=180/Math.PI;function Fn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]).toLowerCase()}function yt(n,e,t){return Math.max(e,Math.min(t,n))}function Pu(n,e){return(n%e+e)%e}function Dr(n,e,t){return(1-t)*n+t*e}function nn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Qe(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class pe{constructor(e=0,t=0){pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,t,i,s,r,o,a,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=a,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],p=i[5],g=i[8],v=s[0],m=s[3],u=s[6],x=s[1],E=s[4],S=s[7],I=s[2],b=s[5],A=s[8];return r[0]=o*v+a*x+l*I,r[3]=o*m+a*E+l*b,r[6]=o*u+a*S+l*A,r[1]=c*v+d*x+h*I,r[4]=c*m+d*E+h*b,r[7]=c*u+d*S+h*A,r[2]=f*v+p*x+g*I,r[5]=f*m+p*E+g*b,r[8]=f*u+p*S+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-i*r*d+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,f=a*l-d*r,p=c*r-o*l,g=t*h+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(s*c-d*i)*v,e[2]=(a*i-s*o)*v,e[3]=f*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Nr.makeScale(e,t)),this}rotate(e){return this.premultiply(Nr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Nr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Nr=new Ue;function Th(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function xs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Iu(){const n=xs("canvas");return n.style.display="block",n}const ll={};function ds(n){n in ll||(ll[n]=!0,console.warn(n))}function ku(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function Du(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Nu(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const We={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ze&&(n.r=Sn(n.r),n.g=Sn(n.g),n.b=Sn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ze&&(n.r=Ni(n.r),n.g=Ni(n.g),n.b=Ni(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Dn?Er:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Sn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ni(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const cl=[.64,.33,.3,.6,.15,.06],hl=[.2126,.7152,.0722],dl=[.3127,.329],ul=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fl=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);We.define({[qi]:{primaries:cl,whitePoint:dl,transfer:Er,toXYZ:ul,fromXYZ:fl,luminanceCoefficients:hl,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:cl,whitePoint:dl,transfer:Ze,toXYZ:ul,fromXYZ:fl,luminanceCoefficients:hl,outputColorSpaceConfig:{drawingBufferColorSpace:St}}});let li;class Uu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{li===void 0&&(li=xs("canvas")),li.width=e.width,li.height=e.height;const i=li.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Sn(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Sn(t[i]/255)*255):t[i]=Sn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ou=0;class Ah{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=Fn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ur(s[o].image)):r.push(Ur(s[o]))}else r=Ur(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ur(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Uu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fu=0;class Mt extends Xi{constructor(e=Mt.DEFAULT_IMAGE,t=Mt.DEFAULT_MAPPING,i=Qn,s=Qn,r=sn,o=ei,a=Kt,l=Mn,c=Mt.DEFAULT_ANISOTROPY,d=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=Fn(),this.name="",this.source=new Ah(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ha:e.x=e.x-Math.floor(e.x);break;case Qn:e.x=e.x<0?0:1;break;case Ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ha:e.y=e.y-Math.floor(e.y);break;case Qn:e.y=e.y<0?0:1;break;case Ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mt.DEFAULT_IMAGE=null;Mt.DEFAULT_MAPPING=fh;Mt.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,i=0,s=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,S=(p+1)/2,I=(u+1)/2,b=(d+f)/4,A=(h+v)/4,C=(g+m)/4;return E>S&&E>I?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=b/i,r=A/i):S>I?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=b/s,r=C/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=A/r,s=C/r),this.set(i,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-d)*(f-d));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-v)/x,this.z=(f-d)/x,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bu extends Xi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Mt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ah(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends Bu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Rh extends Mt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zu extends Mt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ws{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],d=i[s+2],h=i[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==f||c!==p||d!==g){let m=1-a;const u=l*f+c*p+d*g+h*v,x=u>=0?1:-1,E=1-u*u;if(E>Number.EPSILON){const I=Math.sqrt(E),b=Math.atan2(I,u*x);m=Math.sin(m*b)/I,a=Math.sin(a*b)/I}const S=a*x;if(l=l*m+f*S,c=c*m+p*S,d=d*m+g*S,h=h*m+v*S,m===1-a){const I=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=I,c*=I,d*=I,h*=I}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],d=i[s+3],h=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+d*h+l*p-c*f,e[t+1]=l*g+d*f+c*h-a*p,e[t+2]=c*g+d*p+a*f-l*h,e[t+3]=d*g-a*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(s/2),h=a(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*d*h+c*p*g,this._y=c*p*h-f*d*g,this._z=c*d*g+f*p*h,this._w=c*d*h-f*p*g;break;case"YXZ":this._x=f*d*h+c*p*g,this._y=c*p*h-f*d*g,this._z=c*d*g-f*p*h,this._w=c*d*h+f*p*g;break;case"ZXY":this._x=f*d*h-c*p*g,this._y=c*p*h+f*d*g,this._z=c*d*g+f*p*h,this._w=c*d*h-f*p*g;break;case"ZYX":this._x=f*d*h-c*p*g,this._y=c*p*h+f*d*g,this._z=c*d*g-f*p*h,this._w=c*d*h+f*p*g;break;case"YZX":this._x=f*d*h+c*p*g,this._y=c*p*h+f*d*g,this._z=c*d*g-f*p*h,this._w=c*d*h-f*p*g;break;case"XZY":this._x=f*d*h-c*p*g,this._y=c*p*h-f*d*g,this._z=c*d*g+f*p*h,this._w=c*d*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(d-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-i*c,this._z=r*d+o*c+i*l-s*a,this._w=o*d-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),d=2*(a*t-r*s),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*d,this.y=i+l*d+a*c-r*h,this.z=s+l*h+r*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Or.copy(this).projectOnVector(e),this.sub(Or)}reflect(e){return this.sub(Or.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Or=new P,pl=new ws;class Ss{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Xt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xt):Xt.fromBufferAttribute(r,o),Xt.applyMatrix4(e.matrixWorld),this.expandByPoint(Xt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Rs.copy(i.boundingBox)),Rs.applyMatrix4(e.matrixWorld),this.union(Rs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xt),Xt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qi),Cs.subVectors(this.max,Qi),ci.subVectors(e.a,Qi),hi.subVectors(e.b,Qi),di.subVectors(e.c,Qi),An.subVectors(hi,ci),Rn.subVectors(di,hi),Vn.subVectors(ci,di);let t=[0,-An.z,An.y,0,-Rn.z,Rn.y,0,-Vn.z,Vn.y,An.z,0,-An.x,Rn.z,0,-Rn.x,Vn.z,0,-Vn.x,-An.y,An.x,0,-Rn.y,Rn.x,0,-Vn.y,Vn.x,0];return!Fr(t,ci,hi,di,Cs)||(t=[1,0,0,0,1,0,0,0,1],!Fr(t,ci,hi,di,Cs))?!1:(Ls.crossVectors(An,Rn),t=[Ls.x,Ls.y,Ls.z],Fr(t,ci,hi,di,Cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hn=[new P,new P,new P,new P,new P,new P,new P,new P],Xt=new P,Rs=new Ss,ci=new P,hi=new P,di=new P,An=new P,Rn=new P,Vn=new P,Qi=new P,Cs=new P,Ls=new P,$n=new P;function Fr(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){$n.fromArray(n,r);const a=s.x*Math.abs($n.x)+s.y*Math.abs($n.y)+s.z*Math.abs($n.z),l=e.dot($n),c=t.dot($n),d=i.dot($n);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const Hu=new Ss,es=new P,Br=new P;class Do{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Hu.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;es.subVectors(e,this.center);const t=es.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(es,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Br.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(es.copy(e.center).add(Br)),this.expandByPoint(es.copy(e.center).sub(Br))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new P,zr=new P,Ps=new P,Cn=new P,Hr=new P,Is=new P,Gr=new P;class Gu{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dn.copy(this.origin).addScaledVector(this.direction,t),dn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){zr.copy(e).add(t).multiplyScalar(.5),Ps.copy(t).sub(e).normalize(),Cn.copy(this.origin).sub(zr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ps),a=Cn.dot(this.direction),l=-Cn.dot(Ps),c=Cn.lengthSq(),d=Math.abs(1-o*o);let h,f,p,g;if(d>0)if(h=o*l-a,f=o*a-l,g=r*d,h>=0)if(f>=-g)if(f<=g){const v=1/d;h*=v,f*=v,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(zr).addScaledVector(Ps,f),p}intersectSphere(e,t){dn.subVectors(e.center,this.origin);const i=dn.dot(this.direction),s=dn.dot(dn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,o=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,o=(e.min.y-f.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,dn)!==null}intersectTriangle(e,t,i,s,r){Hr.subVectors(t,e),Is.subVectors(i,e),Gr.crossVectors(Hr,Is);let o=this.direction.dot(Gr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Cn.subVectors(this.origin,e);const l=a*this.direction.dot(Is.crossVectors(Cn,Is));if(l<0)return null;const c=a*this.direction.dot(Hr.cross(Cn));if(c<0||l+c>o)return null;const d=-a*Cn.dot(Gr);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,i,s,r,o,a,l,c,d,h,f,p,g,v,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,d,h,f,p,g,v,m)}set(e,t,i,s,r,o,a,l,c,d,h,f,p,g,v,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=s,u[1]=r,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=p,u[7]=g,u[11]=v,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/ui.setFromMatrixColumn(e,0).length(),r=1/ui.setFromMatrixColumn(e,1).length(),o=1/ui.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*d,p=o*h,g=a*d,v=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=f-v*c,t[9]=-a*l,t[2]=v-f*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*d,p=l*h,g=c*d,v=c*h;t[0]=f+v*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=p*a-g,t[6]=v+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*d,p=l*h,g=c*d,v=c*h;t[0]=f-v*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*d,t[9]=v-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*d,p=o*h,g=a*d,v=a*h;t[0]=l*d,t[4]=g*c-p,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,v=a*c;t[0]=l*d,t[4]=v-f*h,t[8]=g*h+p,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=p*h+g,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,v=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=f*h+v,t[5]=o*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*d,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vu,e,$u)}lookAt(e,t,i){const s=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),Ln.crossVectors(i,It),Ln.lengthSq()===0&&(Math.abs(i.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),Ln.crossVectors(i,It)),Ln.normalize(),ks.crossVectors(It,Ln),s[0]=Ln.x,s[4]=ks.x,s[8]=It.x,s[1]=Ln.y,s[5]=ks.y,s[9]=It.y,s[2]=Ln.z,s[6]=ks.z,s[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],p=i[13],g=i[2],v=i[6],m=i[10],u=i[14],x=i[3],E=i[7],S=i[11],I=i[15],b=s[0],A=s[4],C=s[8],w=s[12],y=s[1],T=s[5],N=s[9],L=s[13],B=s[2],W=s[6],G=s[10],K=s[14],V=s[3],se=s[7],ie=s[11],_e=s[15];return r[0]=o*b+a*y+l*B+c*V,r[4]=o*A+a*T+l*W+c*se,r[8]=o*C+a*N+l*G+c*ie,r[12]=o*w+a*L+l*K+c*_e,r[1]=d*b+h*y+f*B+p*V,r[5]=d*A+h*T+f*W+p*se,r[9]=d*C+h*N+f*G+p*ie,r[13]=d*w+h*L+f*K+p*_e,r[2]=g*b+v*y+m*B+u*V,r[6]=g*A+v*T+m*W+u*se,r[10]=g*C+v*N+m*G+u*ie,r[14]=g*w+v*L+m*K+u*_e,r[3]=x*b+E*y+S*B+I*V,r[7]=x*A+E*T+S*W+I*se,r[11]=x*C+E*N+S*G+I*ie,r[15]=x*w+E*L+S*K+I*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],p=e[14],g=e[3],v=e[7],m=e[11],u=e[15];return g*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*p-i*l*p)+v*(+t*l*p-t*c*f+r*o*f-s*o*p+s*c*d-r*l*d)+m*(+t*c*h-t*a*p-r*o*h+i*o*p+r*a*d-i*c*d)+u*(-s*a*d-t*l*h+t*a*f+s*o*h-i*o*f+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],p=e[11],g=e[12],v=e[13],m=e[14],u=e[15],x=h*m*c-v*f*c+v*l*p-a*m*p-h*l*u+a*f*u,E=g*f*c-d*m*c-g*l*p+o*m*p+d*l*u-o*f*u,S=d*v*c-g*h*c+g*a*p-o*v*p-d*a*u+o*h*u,I=g*h*l-d*v*l-g*a*f+o*v*f+d*a*m-o*h*m,b=t*x+i*E+s*S+r*I;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=x*A,e[1]=(v*f*r-h*m*r-v*s*p+i*m*p+h*s*u-i*f*u)*A,e[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*u+i*l*u)*A,e[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*p-i*l*p)*A,e[4]=E*A,e[5]=(d*m*r-g*f*r+g*s*p-t*m*p-d*s*u+t*f*u)*A,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*u-t*l*u)*A,e[7]=(o*f*r-d*l*r+d*s*c-t*f*c-o*s*p+t*l*p)*A,e[8]=S*A,e[9]=(g*h*r-d*v*r-g*i*p+t*v*p+d*i*u-t*h*u)*A,e[10]=(o*v*r-g*a*r+g*i*c-t*v*c-o*i*u+t*a*u)*A,e[11]=(d*a*r-o*h*r-d*i*c+t*h*c+o*i*p-t*a*p)*A,e[12]=I*A,e[13]=(d*v*s-g*h*s+g*i*f-t*v*f-d*i*m+t*h*m)*A,e[14]=(g*a*s-o*v*s-g*i*l+t*v*l+o*i*m-t*a*m)*A,e[15]=(o*h*s-d*a*s+d*i*l-t*h*l-o*i*f+t*a*f)*A,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,d=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+i,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,d=o+o,h=a+a,f=r*c,p=r*d,g=r*h,v=o*d,m=o*h,u=a*h,x=l*c,E=l*d,S=l*h,I=i.x,b=i.y,A=i.z;return s[0]=(1-(v+u))*I,s[1]=(p+S)*I,s[2]=(g-E)*I,s[3]=0,s[4]=(p-S)*b,s[5]=(1-(f+u))*b,s[6]=(m+x)*b,s[7]=0,s[8]=(g+E)*A,s[9]=(m-x)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=ui.set(s[0],s[1],s[2]).length();const o=ui.set(s[4],s[5],s[6]).length(),a=ui.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Yt.copy(this);const c=1/r,d=1/o,h=1/a;return Yt.elements[0]*=c,Yt.elements[1]*=c,Yt.elements[2]*=c,Yt.elements[4]*=d,Yt.elements[5]*=d,Yt.elements[6]*=d,Yt.elements[8]*=h,Yt.elements[9]*=h,Yt.elements[10]*=h,t.setFromRotationMatrix(Yt),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=bn){const l=this.elements,c=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s);let p,g;if(a===bn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===fr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=bn){const l=this.elements,c=1/(t-e),d=1/(i-s),h=1/(o-r),f=(t+e)*c,p=(i+s)*d;let g,v;if(a===bn)g=(o+r)*h,v=-2*h;else if(a===fr)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ui=new P,Yt=new ot,Vu=new P(0,0,0),$u=new P(1,1,1),Ln=new P,ks=new P,It=new P,ml=new ot,gl=new ws;class rn{constructor(e=0,t=0,i=0,s=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(yt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-yt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class Ch{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wu=0;const vl=new P,fi=new ws,un=new ot,Ds=new P,ts=new P,qu=new P,Xu=new ws,yl=new P(1,0,0),_l=new P(0,1,0),xl=new P(0,0,1),bl={type:"added"},Yu={type:"removed"},pi={type:"childadded",child:null},Vr={type:"childremoved",child:null};class vt extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new P,t=new rn,i=new ws,s=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ue}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ch,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.multiply(fi),this}rotateOnWorldAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.premultiply(fi),this}rotateX(e){return this.rotateOnAxis(yl,e)}rotateY(e){return this.rotateOnAxis(_l,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return vl.copy(e).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yl,e)}translateY(e){return this.translateOnAxis(_l,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ds.copy(e):Ds.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(ts,Ds,this.up):un.lookAt(Ds,ts,this.up),this.quaternion.setFromRotationMatrix(un),s&&(un.extractRotation(s.matrixWorld),fi.setFromRotationMatrix(un),this.quaternion.premultiply(fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bl),pi.child=e,this.dispatchEvent(pi),pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yu),Vr.child=e,this.dispatchEvent(Vr),Vr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bl),pi.child=e,this.dispatchEvent(pi),pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,e,qu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,Xu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}vt.DEFAULT_UP=new P(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jt=new P,fn=new P,$r=new P,pn=new P,mi=new P,gi=new P,wl=new P,Wr=new P,qr=new P,Xr=new P,Yr=new et,jr=new et,Jr=new et;class $t{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),jt.subVectors(e,t),s.cross(jt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){jt.subVectors(s,t),fn.subVectors(i,t),$r.subVectors(e,t);const o=jt.dot(jt),a=jt.dot(fn),l=jt.dot($r),c=fn.dot(fn),d=fn.dot($r),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-a*d)*f,g=(o*d-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,pn.x),l.addScaledVector(o,pn.y),l.addScaledVector(a,pn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Yr.setScalar(0),jr.setScalar(0),Jr.setScalar(0),Yr.fromBufferAttribute(e,t),jr.fromBufferAttribute(e,i),Jr.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Yr,r.x),o.addScaledVector(jr,r.y),o.addScaledVector(Jr,r.z),o}static isFrontFacing(e,t,i,s){return jt.subVectors(i,t),fn.subVectors(e,t),jt.cross(fn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),jt.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $t.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return $t.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return $t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;mi.subVectors(s,i),gi.subVectors(r,i),Wr.subVectors(e,i);const l=mi.dot(Wr),c=gi.dot(Wr);if(l<=0&&c<=0)return t.copy(i);qr.subVectors(e,s);const d=mi.dot(qr),h=gi.dot(qr);if(d>=0&&h<=d)return t.copy(s);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(i).addScaledVector(mi,o);Xr.subVectors(e,r);const p=mi.dot(Xr),g=gi.dot(Xr);if(g>=0&&p<=g)return t.copy(r);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(gi,a);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return wl.subVectors(r,s),a=(h-d)/(h-d+(p-g)),t.copy(s).addScaledVector(wl,a);const u=1/(m+v+f);return o=v*u,a=f*u,t.copy(i).addScaledVector(mi,o).addScaledVector(gi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},Ns={h:0,s:0,l:0};function Kr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Be{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=We.workingColorSpace){return this.r=e,this.g=t,this.b=i,We.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=We.workingColorSpace){if(e=Pu(e,1),t=yt(t,0,1),i=yt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Kr(o,r,e+1/3),this.g=Kr(o,r,e),this.b=Kr(o,r,e-1/3)}return We.toWorkingColorSpace(this,s),this}setStyle(e,t=St){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){const i=Lh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Sn(e.r),this.g=Sn(e.g),this.b=Sn(e.b),this}copyLinearToSRGB(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return We.fromWorkingColorSpace(wt.copy(this),e),Math.round(yt(wt.r*255,0,255))*65536+Math.round(yt(wt.g*255,0,255))*256+Math.round(yt(wt.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(wt.copy(this),t);const i=wt.r,s=wt.g,r=wt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=St){We.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,i=wt.g,s=wt.b;return e!==St?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Pn),this.setHSL(Pn.h+e,Pn.s+t,Pn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Pn),e.getHSL(Ns);const i=Dr(Pn.h,Ns.h,t),s=Dr(Pn.s,Ns.s,t),r=Dr(Pn.l,Ns.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Be;Be.NAMES=Lh;let ju=0;class Yi extends Xi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Fn(),this.name="",this.blending=ki,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Pa,this.blendEquation=Kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oi,this.stencilZFail=oi,this.stencilZPass=oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ki&&(i.blending=this.blending),this.side!==Bn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==La&&(i.blendSrc=this.blendSrc),this.blendDst!==Pa&&(i.blendDst=this.blendDst),this.blendEquation!==Kn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==al&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==oi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==oi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ph extends Yi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=uh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new P,Us=new pe;class Zt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=go,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Us.fromBufferAttribute(this,t),Us.applyMatrix3(e),this.setXY(t,Us.x,Us.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=nn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Qe(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==go&&(e.usage=this.usage),e}}class Ih extends Zt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class kh extends Zt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ot extends Zt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Ju=0;const Ht=new ot,Zr=new vt,vi=new P,kt=new Ss,ns=new Ss,gt=new P;class an extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Th(e)?kh:Ih)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ue().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,i){return Ht.makeTranslation(e,t,i),this.applyMatrix4(Ht),this}scale(e,t,i){return Ht.makeScale(e,t,i),this.applyMatrix4(Ht),this}lookAt(e){return Zr.lookAt(e),Zr.updateMatrix(),this.applyMatrix4(Zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ot(i,3))}else{for(let i=0,s=t.count;i<s;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];kt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Do);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ns.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(kt.min,ns.min),kt.expandByPoint(gt),gt.addVectors(kt.max,ns.max),kt.expandByPoint(gt)):(kt.expandByPoint(ns.min),kt.expandByPoint(ns.max))}kt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)gt.fromBufferAttribute(a,c),l&&(vi.fromBufferAttribute(e,c),gt.add(vi)),s=Math.max(s,i.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<i.count;C++)a[C]=new P,l[C]=new P;const c=new P,d=new P,h=new P,f=new pe,p=new pe,g=new pe,v=new P,m=new P;function u(C,w,y){c.fromBufferAttribute(i,C),d.fromBufferAttribute(i,w),h.fromBufferAttribute(i,y),f.fromBufferAttribute(r,C),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,y),d.sub(c),h.sub(c),p.sub(f),g.sub(f);const T=1/(p.x*g.y-g.x*p.y);isFinite(T)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(T),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(T),a[C].add(v),a[w].add(v),a[y].add(v),l[C].add(m),l[w].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,w=x.length;C<w;++C){const y=x[C],T=y.start,N=y.count;for(let L=T,B=T+N;L<B;L+=3)u(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const E=new P,S=new P,I=new P,b=new P;function A(C){I.fromBufferAttribute(s,C),b.copy(I);const w=a[C];E.copy(w),E.sub(I.multiplyScalar(I.dot(w))).normalize(),S.crossVectors(b,w);const T=S.dot(l[C])<0?-1:1;o.setXYZW(C,E.x,E.y,E.z,T)}for(let C=0,w=x.length;C<w;++C){const y=x[C],T=y.start,N=y.count;for(let L=T,B=T+N;L<B;L+=3)A(e.getX(L+0)),A(e.getX(L+1)),A(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,d=new P,h=new P;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(d),l.add(d),c.add(d),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,f=new c.constructor(l.length*d);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*d;for(let u=0;u<d;u++)f[g++]=c[p++]}return new Zt(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new an,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=e(f,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let f=0,p=h.length;f<p;f++)d.push(h[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sl=new ot,Wn=new Gu,Os=new Do,Ml=new P,Fs=new P,Bs=new P,zs=new P,Qr=new P,Hs=new P,El=new P,Gs=new P;class ft extends vt{constructor(e=new an,t=new Ph){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Hs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],h=r[l];d!==0&&(Qr.fromBufferAttribute(h,e),o?Hs.addScaledVector(Qr,d):Hs.addScaledVector(Qr.sub(t),d))}t.add(Hs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere),Os.applyMatrix4(r),Wn.copy(e.ray).recast(e.near),!(Os.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(Os,Ml)===null||Wn.origin.distanceToSquared(Ml)>(e.far-e.near)**2))&&(Sl.copy(r).invert(),Wn.copy(e.ray).applyMatrix4(Sl),!(i.boundingBox!==null&&Wn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],u=o[m.materialIndex],x=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,I=E;S<I;S+=3){const b=a.getX(S),A=a.getX(S+1),C=a.getX(S+2);s=Vs(this,u,e,i,c,d,h,b,A,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){const x=a.getX(m),E=a.getX(m+1),S=a.getX(m+2);s=Vs(this,o,e,i,c,d,h,x,E,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],u=o[m.materialIndex],x=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=x,I=E;S<I;S+=3){const b=S,A=S+1,C=S+2;s=Vs(this,u,e,i,c,d,h,b,A,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){const x=m,E=m+1,S=m+2;s=Vs(this,o,e,i,c,d,h,x,E,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Ku(n,e,t,i,s,r,o,a){let l;if(e.side===Ct?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Bn,a),l===null)return null;Gs.copy(a),Gs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Gs);return c<t.near||c>t.far?null:{distance:c,point:Gs.clone(),object:n}}function Vs(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Fs),n.getVertexPosition(l,Bs),n.getVertexPosition(c,zs);const d=Ku(n,e,t,i,Fs,Bs,zs,El);if(d){const h=new P;$t.getBarycoord(El,Fs,Bs,zs,h),s&&(d.uv=$t.getInterpolatedAttribute(s,a,l,c,h,new pe)),r&&(d.uv1=$t.getInterpolatedAttribute(r,a,l,c,h,new pe)),o&&(d.normal=$t.getInterpolatedAttribute(o,a,l,c,h,new P),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new P,materialIndex:0};$t.getNormal(Fs,Bs,zs,f.normal),d.face=f,d.barycoord=h}return d}class Nt extends an{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(h,2));function g(v,m,u,x,E,S,I,b,A,C,w){const y=S/A,T=I/C,N=S/2,L=I/2,B=b/2,W=A+1,G=C+1;let K=0,V=0;const se=new P;for(let ie=0;ie<G;ie++){const _e=ie*T-L;for(let Pe=0;Pe<W;Pe++){const qe=Pe*y-N;se[v]=qe*x,se[m]=_e*E,se[u]=B,c.push(se.x,se.y,se.z),se[v]=0,se[m]=0,se[u]=b>0?1:-1,d.push(se.x,se.y,se.z),h.push(Pe/A),h.push(1-ie/C),K+=1}}for(let ie=0;ie<C;ie++)for(let _e=0;_e<A;_e++){const Pe=f+_e+W*ie,qe=f+_e+W*(ie+1),q=f+(_e+1)+W*(ie+1),ee=f+(_e+1)+W*ie;l.push(Pe,qe,ee),l.push(qe,q,ee),V+=6}a.addGroup(p,V,w),p+=V,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Tt(n){const e={};for(let t=0;t<n.length;t++){const i=Vi(n[t]);for(const s in i)e[s]=i[s]}return e}function Zu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Dh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const Qu={clone:Vi,merge:Tt};var ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zn extends Yi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ef,this.fragmentShader=tf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=Zu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Nh extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const In=new P,Tl=new pe,Al=new pe;class Vt extends Nh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(In.x,In.y).multiplyScalar(-e/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(In.x,In.y).multiplyScalar(-e/In.z)}getViewSize(e,t){return this.getViewBounds(e,Tl,Al),t.subVectors(Al,Tl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(kr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const yi=-90,_i=1;class nf extends vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vt(yi,_i,e,t);s.layers=this.layers,this.add(s);const r=new Vt(yi,_i,e,t);r.layers=this.layers,this.add(r);const o=new Vt(yi,_i,e,t);o.layers=this.layers,this.add(o);const a=new Vt(yi,_i,e,t);a.layers=this.layers,this.add(a);const l=new Vt(yi,_i,e,t);l.layers=this.layers,this.add(l);const c=new Vt(yi,_i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===bn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,d),e.setRenderTarget(h,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Uh extends Mt{constructor(e,t,i,s,r,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Bi,super(e,t,i,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sf extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Uh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Nt(5,5,5),r=new zn({name:"CubemapFromEquirect",uniforms:Vi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ct,blending:Un});r.uniforms.tEquirect.value=t;const o=new ft(s,r),a=t.minFilter;return t.minFilter===ei&&(t.minFilter=sn),new nf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const ea=new P,rf=new P,af=new Ue;class jn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ea.subVectors(i,t).cross(rf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ea),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||af.getNormalMatrix(e),s=this.coplanarPoint(ea).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qn=new Do,$s=new P;class No{constructor(e=new jn,t=new jn,i=new jn,s=new jn,r=new jn,o=new jn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=bn){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],d=s[5],h=s[6],f=s[7],p=s[8],g=s[9],v=s[10],m=s[11],u=s[12],x=s[13],E=s[14],S=s[15];if(i[0].setComponents(l-r,f-c,m-p,S-u).normalize(),i[1].setComponents(l+r,f+c,m+p,S+u).normalize(),i[2].setComponents(l+o,f+d,m+g,S+x).normalize(),i[3].setComponents(l-o,f-d,m-g,S-x).normalize(),i[4].setComponents(l-a,f-h,m-v,S-E).normalize(),t===bn)i[5].setComponents(l+a,f+h,m+v,S+E).normalize();else if(t===fr)i[5].setComponents(a,h,v,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(e){return qn.center.set(0,0,0),qn.radius=.7071067811865476,qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if($s.x=s.normal.x>0?e.max.x:e.min.x,$s.y=s.normal.y>0?e.max.y:e.min.y,$s.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint($s)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Oh(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function of(n){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,d),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const d=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];n.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Tr extends an{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,d=l+1,h=e/a,f=t/l,p=[],g=[],v=[],m=[];for(let u=0;u<d;u++){const x=u*f-o;for(let E=0;E<c;E++){const S=E*h-r;g.push(S,-x,0),v.push(0,0,1),m.push(E/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let x=0;x<a;x++){const E=x+c*u,S=x+c*(u+1),I=x+1+c*(u+1),b=x+1+c*u;p.push(E,S,b),p.push(S,I,b)}this.setIndex(p),this.setAttribute("position",new Ot(g,3)),this.setAttribute("normal",new Ot(v,3)),this.setAttribute("uv",new Ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tr(e.width,e.height,e.widthSegments,e.heightSegments)}}var lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cf=`#ifdef USE_ALPHAHASH
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
#endif`,hf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pf=`#ifdef USE_AOMAP
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
#endif`,mf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gf=`#ifdef USE_BATCHING
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
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_f=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bf=`#ifdef USE_IRIDESCENCE
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
#endif`,wf=`#ifdef USE_BUMPMAP
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
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Pf=`#define PI 3.141592653589793
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
} // validated`,If=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kf=`vec3 transformedNormal = objectNormal;
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
#endif`,Df=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ff="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zf=`#ifdef USE_ENVMAP
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
#endif`,Hf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gf=`#ifdef USE_ENVMAP
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
#endif`,Vf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$f=`#ifdef USE_ENVMAP
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
#endif`,Wf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jf=`#ifdef USE_GRADIENTMAP
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
}`,Jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qf=`uniform bool receiveShadow;
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
#endif`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rp=`PhysicalMaterial material;
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
#endif`,ap=`struct PhysicalMaterial {
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
}`,op=`
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
#endif`,lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,up=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vp=`#if defined( USE_POINTS_UV )
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
#endif`,yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sp=`#ifdef USE_MORPHTARGETS
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
#endif`,Mp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ep=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lp=`#ifdef USE_NORMALMAP
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
#endif`,Pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ip=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Up=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Op=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$p=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qp=`float getShadowMask() {
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
}`,Xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yp=`#ifdef USE_SKINNING
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
#endif`,jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jp=`#ifdef USE_SKINNING
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
#endif`,Kp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,em=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tm=`#ifdef USE_TRANSMISSION
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
#endif`,nm=`#ifdef USE_TRANSMISSION
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
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const om=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lm=`uniform sampler2D t2D;
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`#include <common>
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
}`,pm=`#if DEPTH_PACKING == 3200
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
}`,mm=`#define DISTANCE
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
}`,gm=`#define DISTANCE
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
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`uniform float scale;
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
}`,xm=`uniform vec3 diffuse;
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
}`,bm=`#include <common>
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
}`,wm=`uniform vec3 diffuse;
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
}`,Sm=`#define LAMBERT
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
}`,Mm=`#define LAMBERT
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
}`,Em=`#define MATCAP
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
}`,Tm=`#define MATCAP
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
}`,Am=`#define NORMAL
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
}`,Rm=`#define NORMAL
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
}`,Cm=`#define PHONG
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
}`,Lm=`#define PHONG
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
}`,Pm=`#define STANDARD
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
}`,Im=`#define STANDARD
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
}`,km=`#define TOON
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
}`,Dm=`#define TOON
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
}`,Nm=`uniform float size;
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
}`,Um=`uniform vec3 diffuse;
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
}`,Om=`#include <common>
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
}`,Fm=`uniform vec3 color;
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
}`,Bm=`uniform float rotation;
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
}`,zm=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:lf,alphahash_pars_fragment:cf,alphamap_fragment:hf,alphamap_pars_fragment:df,alphatest_fragment:uf,alphatest_pars_fragment:ff,aomap_fragment:pf,aomap_pars_fragment:mf,batching_pars_vertex:gf,batching_vertex:vf,begin_vertex:yf,beginnormal_vertex:_f,bsdfs:xf,iridescence_fragment:bf,bumpmap_pars_fragment:wf,clipping_planes_fragment:Sf,clipping_planes_pars_fragment:Mf,clipping_planes_pars_vertex:Ef,clipping_planes_vertex:Tf,color_fragment:Af,color_pars_fragment:Rf,color_pars_vertex:Cf,color_vertex:Lf,common:Pf,cube_uv_reflection_fragment:If,defaultnormal_vertex:kf,displacementmap_pars_vertex:Df,displacementmap_vertex:Nf,emissivemap_fragment:Uf,emissivemap_pars_fragment:Of,colorspace_fragment:Ff,colorspace_pars_fragment:Bf,envmap_fragment:zf,envmap_common_pars_fragment:Hf,envmap_pars_fragment:Gf,envmap_pars_vertex:Vf,envmap_physical_pars_fragment:ep,envmap_vertex:$f,fog_vertex:Wf,fog_pars_vertex:qf,fog_fragment:Xf,fog_pars_fragment:Yf,gradientmap_pars_fragment:jf,lightmap_pars_fragment:Jf,lights_lambert_fragment:Kf,lights_lambert_pars_fragment:Zf,lights_pars_begin:Qf,lights_toon_fragment:tp,lights_toon_pars_fragment:np,lights_phong_fragment:ip,lights_phong_pars_fragment:sp,lights_physical_fragment:rp,lights_physical_pars_fragment:ap,lights_fragment_begin:op,lights_fragment_maps:lp,lights_fragment_end:cp,logdepthbuf_fragment:hp,logdepthbuf_pars_fragment:dp,logdepthbuf_pars_vertex:up,logdepthbuf_vertex:fp,map_fragment:pp,map_pars_fragment:mp,map_particle_fragment:gp,map_particle_pars_fragment:vp,metalnessmap_fragment:yp,metalnessmap_pars_fragment:_p,morphinstance_vertex:xp,morphcolor_vertex:bp,morphnormal_vertex:wp,morphtarget_pars_vertex:Sp,morphtarget_vertex:Mp,normal_fragment_begin:Ep,normal_fragment_maps:Tp,normal_pars_fragment:Ap,normal_pars_vertex:Rp,normal_vertex:Cp,normalmap_pars_fragment:Lp,clearcoat_normal_fragment_begin:Pp,clearcoat_normal_fragment_maps:Ip,clearcoat_pars_fragment:kp,iridescence_pars_fragment:Dp,opaque_fragment:Np,packing:Up,premultiplied_alpha_fragment:Op,project_vertex:Fp,dithering_fragment:Bp,dithering_pars_fragment:zp,roughnessmap_fragment:Hp,roughnessmap_pars_fragment:Gp,shadowmap_pars_fragment:Vp,shadowmap_pars_vertex:$p,shadowmap_vertex:Wp,shadowmask_pars_fragment:qp,skinbase_vertex:Xp,skinning_pars_vertex:Yp,skinning_vertex:jp,skinnormal_vertex:Jp,specularmap_fragment:Kp,specularmap_pars_fragment:Zp,tonemapping_fragment:Qp,tonemapping_pars_fragment:em,transmission_fragment:tm,transmission_pars_fragment:nm,uv_pars_fragment:im,uv_pars_vertex:sm,uv_vertex:rm,worldpos_vertex:am,background_vert:om,background_frag:lm,backgroundCube_vert:cm,backgroundCube_frag:hm,cube_vert:dm,cube_frag:um,depth_vert:fm,depth_frag:pm,distanceRGBA_vert:mm,distanceRGBA_frag:gm,equirect_vert:vm,equirect_frag:ym,linedashed_vert:_m,linedashed_frag:xm,meshbasic_vert:bm,meshbasic_frag:wm,meshlambert_vert:Sm,meshlambert_frag:Mm,meshmatcap_vert:Em,meshmatcap_frag:Tm,meshnormal_vert:Am,meshnormal_frag:Rm,meshphong_vert:Cm,meshphong_frag:Lm,meshphysical_vert:Pm,meshphysical_frag:Im,meshtoon_vert:km,meshtoon_frag:Dm,points_vert:Nm,points_frag:Um,shadow_vert:Om,shadow_frag:Fm,sprite_vert:Bm,sprite_frag:zm},oe={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},tn={basic:{uniforms:Tt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Tt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Be(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Tt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Tt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Tt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Be(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Tt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Tt([oe.points,oe.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Tt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Tt([oe.common,oe.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Tt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Tt([oe.sprite,oe.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Tt([oe.common,oe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Tt([oe.lights,oe.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};tn.physical={uniforms:Tt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Ws={r:0,b:0,g:0},Xn=new rn,Hm=new ot;function Gm(n,e,t,i,s,r,o){const a=new Be(0);let l=r===!0?0:1,c,d,h=null,f=0,p=null;function g(x){let E=x.isScene===!0?x.background:null;return E&&E.isTexture&&(E=(x.backgroundBlurriness>0?t:e).get(E)),E}function v(x){let E=!1;const S=g(x);S===null?u(a,l):S&&S.isColor&&(u(S,1),E=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,E){const S=g(E);S&&(S.isCubeTexture||S.mapping===Mr)?(d===void 0&&(d=new ft(new Nt(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:Vi(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Xn.copy(E.backgroundRotation),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),d.material.uniforms.envMap.value=S,d.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Hm.makeRotationFromEuler(Xn)),d.material.toneMapped=We.getTransfer(S.colorSpace)!==Ze,(h!==S||f!==S.version||p!==n.toneMapping)&&(d.material.needsUpdate=!0,h=S,f=S.version,p=n.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new ft(new Tr(2,2),new zn({name:"BackgroundMaterial",uniforms:Vi(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=We.getTransfer(S.colorSpace)!==Ze,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function u(x,E){x.getRGB(Ws,Dh(n)),i.buffers.color.setClear(Ws.r,Ws.g,Ws.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(x,E=1){a.set(x),l=E,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,u(a,l)},render:v,addToRenderList:m}}function Vm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(y,T,N,L,B){let W=!1;const G=h(L,N,T);r!==G&&(r=G,c(r.object)),W=p(y,L,N,B),W&&g(y,L,N,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,S(y,T,N,L),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function d(y){return n.deleteVertexArray(y)}function h(y,T,N){const L=N.wireframe===!0;let B=i[y.id];B===void 0&&(B={},i[y.id]=B);let W=B[T.id];W===void 0&&(W={},B[T.id]=W);let G=W[L];return G===void 0&&(G=f(l()),W[L]=G),G}function f(y){const T=[],N=[],L=[];for(let B=0;B<t;B++)T[B]=0,N[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:N,attributeDivisors:L,object:y,attributes:{},index:null}}function p(y,T,N,L){const B=r.attributes,W=T.attributes;let G=0;const K=N.getAttributes();for(const V in K)if(K[V].location>=0){const ie=B[V];let _e=W[V];if(_e===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(_e=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(_e=y.instanceColor)),ie===void 0||ie.attribute!==_e||_e&&ie.data!==_e.data)return!0;G++}return r.attributesNum!==G||r.index!==L}function g(y,T,N,L){const B={},W=T.attributes;let G=0;const K=N.getAttributes();for(const V in K)if(K[V].location>=0){let ie=W[V];ie===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ie=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ie=y.instanceColor));const _e={};_e.attribute=ie,ie&&ie.data&&(_e.data=ie.data),B[V]=_e,G++}r.attributes=B,r.attributesNum=G,r.index=L}function v(){const y=r.newAttributes;for(let T=0,N=y.length;T<N;T++)y[T]=0}function m(y){u(y,0)}function u(y,T){const N=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;N[y]=1,L[y]===0&&(n.enableVertexAttribArray(y),L[y]=1),B[y]!==T&&(n.vertexAttribDivisor(y,T),B[y]=T)}function x(){const y=r.newAttributes,T=r.enabledAttributes;for(let N=0,L=T.length;N<L;N++)T[N]!==y[N]&&(n.disableVertexAttribArray(N),T[N]=0)}function E(y,T,N,L,B,W,G){G===!0?n.vertexAttribIPointer(y,T,N,B,W):n.vertexAttribPointer(y,T,N,L,B,W)}function S(y,T,N,L){v();const B=L.attributes,W=N.getAttributes(),G=T.defaultAttributeValues;for(const K in W){const V=W[K];if(V.location>=0){let se=B[K];if(se===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),se!==void 0){const ie=se.normalized,_e=se.itemSize,Pe=e.get(se);if(Pe===void 0)continue;const qe=Pe.buffer,q=Pe.type,ee=Pe.bytesPerElement,xe=q===n.INT||q===n.UNSIGNED_INT||se.gpuType===Ro;if(se.isInterleavedBufferAttribute){const ae=se.data,re=ae.stride,Me=se.offset;if(ae.isInstancedInterleavedBuffer){for(let ke=0;ke<V.locationSize;ke++)u(V.location+ke,ae.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ke=0;ke<V.locationSize;ke++)m(V.location+ke);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let ke=0;ke<V.locationSize;ke++)E(V.location+ke,_e/V.locationSize,q,ie,re*ee,(Me+_e/V.locationSize*ke)*ee,xe)}else{if(se.isInstancedBufferAttribute){for(let ae=0;ae<V.locationSize;ae++)u(V.location+ae,se.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ae=0;ae<V.locationSize;ae++)m(V.location+ae);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let ae=0;ae<V.locationSize;ae++)E(V.location+ae,_e/V.locationSize,q,ie,_e*ee,_e/V.locationSize*ae*ee,xe)}}else if(G!==void 0){const ie=G[K];if(ie!==void 0)switch(ie.length){case 2:n.vertexAttrib2fv(V.location,ie);break;case 3:n.vertexAttrib3fv(V.location,ie);break;case 4:n.vertexAttrib4fv(V.location,ie);break;default:n.vertexAttrib1fv(V.location,ie)}}}}x()}function I(){C();for(const y in i){const T=i[y];for(const N in T){const L=T[N];for(const B in L)d(L[B].object),delete L[B];delete T[N]}delete i[y]}}function b(y){if(i[y.id]===void 0)return;const T=i[y.id];for(const N in T){const L=T[N];for(const B in L)d(L[B].object),delete L[B];delete T[N]}delete i[y.id]}function A(y){for(const T in i){const N=i[T];if(N[y.id]===void 0)continue;const L=N[y.id];for(const B in L)d(L[B].object),delete L[B];delete N[y.id]}}function C(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:w,dispose:I,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function $m(n,e,t){let i;function s(c){i=c}function r(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function o(c,d,h){h!==0&&(n.drawArraysInstanced(i,c,d,h),t.update(d,i,h))}function a(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let p=0;for(let g=0;g<h;g++)p+=d[g];t.update(p,i,1)}function l(c,d,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],d[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,h);let g=0;for(let v=0;v<h;v++)g+=d[v]*f[v];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Wm(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Kt&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const C=A===bs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Mn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==xn&&!C)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:x,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:I,maxSamples:b}}function qm(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new jn,a=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,u=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const x=r?0:i,E=x*4;let S=u.clippingState||null;l.value=S,S=d(g,f,E,p);for(let I=0;I!==E;++I)S[I]=t[I];u.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,f,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const u=p+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<u)&&(m=new Float32Array(u));for(let E=0,S=p;E!==v;++E,S+=4)o.copy(h[E]).applyMatrix4(x,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Xm(n){let e=new WeakMap;function t(o,a){return a===Ba?o.mapping=Bi:a===za&&(o.mapping=zi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ba||a===za)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new sf(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Uo extends Nh{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Pi=4,Rl=[.125,.215,.35,.446,.526,.582],Zn=20,ta=new Uo,Cl=new Be;let na=null,ia=0,sa=0,ra=!1;const Jn=(1+Math.sqrt(5))/2,xi=1/Jn,Ll=[new P(-Jn,xi,0),new P(Jn,xi,0),new P(-xi,0,Jn),new P(xi,0,Jn),new P(0,Jn,-xi),new P(0,Jn,xi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(na,ia,sa),this._renderer.xr.enabled=ra,e.scissorTest=!1,qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:bs,format:Kt,colorSpace:qi,depthBuffer:!1},s=Il(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Il(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ym(r)),this._blurMaterial=jm(r,e,t)}return s}_compileMaterial(e){const t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,ta)}_sceneToCubeUV(e,t,i,s){const a=new Vt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Cl),d.toneMapping=On,d.autoClear=!1;const p=new Ph({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new ft(new Nt,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Cl),v=!0);for(let u=0;u<6;u++){const x=u%3;x===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):x===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const E=this._cubeSize;qs(s,x*E,u>2?E:0,E,E),d.setRenderTarget(s),v&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Bi||e.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ft(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;qs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,ta)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ll[(s-r-1)%Ll.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new ft(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Zn-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):Zn;m>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zn}`);const u=[];let x=0;for(let A=0;A<Zn;++A){const C=A/v,w=Math.exp(-C*C/2);u.push(w),A===0?x+=w:A<m&&(x+=2*w)}for(let A=0;A<u.length;A++)u[A]=u[A]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-i;const S=this._sizeLods[s],I=3*S*(s>E-Pi?s-E+Pi:0),b=4*(this._cubeSize-S);qs(t,I,b,3*S,2*S),l.setRenderTarget(t),l.render(h,ta)}}function Ym(n){const e=[],t=[],i=[];let s=n;const r=n-Pi+1+Rl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Pi?l=Rl[o-n+Pi-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,v=3,m=2,u=1,x=new Float32Array(v*g*p),E=new Float32Array(m*g*p),S=new Float32Array(u*g*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,C=b>2?0:-1,w=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];x.set(w,v*g*b),E.set(f,m*g*b);const y=[b,b,b,b,b,b];S.set(y,u*g*b)}const I=new an;I.setAttribute("position",new Zt(x,v)),I.setAttribute("uv",new Zt(E,m)),I.setAttribute("faceIndex",new Zt(S,u)),e.push(I),s>Pi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Il(n,e,t){const i=new ii(n,e,t);return i.texture.mapping=Mr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function jm(n,e,t){const i=new Float32Array(Zn),s=new P(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function kl(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Dl(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Oo(){return`

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
	`}function Jm(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ba||l===za,d=l===Bi||l===zi;if(c||d){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Pl(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||d&&p&&s(p)?(t===null&&(t=new Pl(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Km(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ds("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Zm(n,e,t,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,u=v.length;m<u;m++)e.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const v=p[g];for(let m=0,u=v.length;m<u;m++)e.update(v[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const x=p.array;v=p.version;for(let E=0,S=x.length;E<S;E+=3){const I=x[E+0],b=x[E+1],A=x[E+2];f.push(I,b,b,A,A,I)}}else if(g!==void 0){const x=g.array;v=g.version;for(let E=0,S=x.length/3-1;E<S;E+=3){const I=E+0,b=E+1,A=E+2;f.push(I,b,b,A,A,I)}}else return;const m=new(Th(f)?kh:Ih)(f,1);m.version=v;const u=r.get(h);u&&e.remove(u),r.set(h,m)}function d(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function Qm(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*o),t.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*o,g),t.update(p,i,g))}function d(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let u=0;u<g;u++)m+=p[u];t.update(m,i,1)}function h(f,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<f.length;u++)c(f[u]/o,p[u],v[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,v,0,g);let u=0;for(let x=0;x<g;x++)u+=p[x]*v[x];t.update(u,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function eg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function tg(n,e,t){const i=new WeakMap,s=new et;function r(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let w=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],u=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let E=0;p===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let S=a.attributes.position.count*E,I=1;S>e.maxTextureSize&&(I=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const b=new Float32Array(S*I*4*h),A=new Rh(b,S,I,h);A.type=xn,A.needsUpdate=!0;const C=E*4;for(let y=0;y<h;y++){const T=m[y],N=u[y],L=x[y],B=S*I*4*y;for(let W=0;W<T.count;W++){const G=W*C;p===!0&&(s.fromBufferAttribute(T,W),b[B+G+0]=s.x,b[B+G+1]=s.y,b[B+G+2]=s.z,b[B+G+3]=0),g===!0&&(s.fromBufferAttribute(N,W),b[B+G+4]=s.x,b[B+G+5]=s.y,b[B+G+6]=s.z,b[B+G+7]=0),v===!0&&(s.fromBufferAttribute(L,W),b[B+G+8]=s.x,b[B+G+9]=s.y,b[B+G+10]=s.z,b[B+G+11]=L.itemSize===4?s.w:1)}}f={count:h,texture:A,size:new pe(S,I)},i.set(a,f),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function ng(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Fh extends Mt{constructor(e,t,i,s,r,o,a,l,c,d=Di){if(d!==Di&&d!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Di&&(i=ni),i===void 0&&d===Gi&&(i=Hi),super(null,s,r,o,a,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ut,this.minFilter=l!==void 0?l:Ut,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bh=new Mt,Nl=new Fh(1,1),zh=new Rh,Hh=new zu,Gh=new Uh,Ul=[],Ol=[],Fl=new Float32Array(16),Bl=new Float32Array(9),zl=new Float32Array(4);function ji(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ul[s];if(r===void 0&&(r=new Float32Array(s),Ul[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ar(n,e){let t=Ol[e];t===void 0&&(t=new Int32Array(e),Ol[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ig(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function sg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2fv(this.addr,e),mt(t,e)}}function rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;n.uniform3fv(this.addr,e),mt(t,e)}}function ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4fv(this.addr,e),mt(t,e)}}function og(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;zl.set(i),n.uniformMatrix2fv(this.addr,!1,zl),mt(t,i)}}function lg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Bl.set(i),n.uniformMatrix3fv(this.addr,!1,Bl),mt(t,i)}}function cg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Fl.set(i),n.uniformMatrix4fv(this.addr,!1,Fl),mt(t,i)}}function hg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2iv(this.addr,e),mt(t,e)}}function ug(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3iv(this.addr,e),mt(t,e)}}function fg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4iv(this.addr,e),mt(t,e)}}function pg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2uiv(this.addr,e),mt(t,e)}}function gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3uiv(this.addr,e),mt(t,e)}}function vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4uiv(this.addr,e),mt(t,e)}}function yg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Nl.compareFunction=Eh,r=Nl):r=Bh,t.setTexture2D(e||r,s)}function _g(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Hh,s)}function xg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Gh,s)}function bg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||zh,s)}function wg(n){switch(n){case 5126:return ig;case 35664:return sg;case 35665:return rg;case 35666:return ag;case 35674:return og;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return hg;case 35667:case 35671:return dg;case 35668:case 35672:return ug;case 35669:case 35673:return fg;case 5125:return pg;case 36294:return mg;case 36295:return gg;case 36296:return vg;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return bg}}function Sg(n,e){n.uniform1fv(this.addr,e)}function Mg(n,e){const t=ji(e,this.size,2);n.uniform2fv(this.addr,t)}function Eg(n,e){const t=ji(e,this.size,3);n.uniform3fv(this.addr,t)}function Tg(n,e){const t=ji(e,this.size,4);n.uniform4fv(this.addr,t)}function Ag(n,e){const t=ji(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Rg(n,e){const t=ji(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Cg(n,e){const t=ji(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Lg(n,e){n.uniform1iv(this.addr,e)}function Pg(n,e){n.uniform2iv(this.addr,e)}function Ig(n,e){n.uniform3iv(this.addr,e)}function kg(n,e){n.uniform4iv(this.addr,e)}function Dg(n,e){n.uniform1uiv(this.addr,e)}function Ng(n,e){n.uniform2uiv(this.addr,e)}function Ug(n,e){n.uniform3uiv(this.addr,e)}function Og(n,e){n.uniform4uiv(this.addr,e)}function Fg(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Bh,r[o])}function Bg(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Hh,r[o])}function zg(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Gh,r[o])}function Hg(n,e,t){const i=this.cache,s=e.length,r=Ar(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||zh,r[o])}function Gg(n){switch(n){case 5126:return Sg;case 35664:return Mg;case 35665:return Eg;case 35666:return Tg;case 35674:return Ag;case 35675:return Rg;case 35676:return Cg;case 5124:case 35670:return Lg;case 35667:case 35671:return Pg;case 35668:case 35672:return Ig;case 35669:case 35673:return kg;case 5125:return Dg;case 36294:return Ng;case 36295:return Ug;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return Bg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Hg}}class Vg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=wg(t.type)}}class $g{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gg(t.type)}}class Wg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const aa=/(\w+)(\])?(\[|\.)?/g;function Hl(n,e){n.seq.push(e),n.map[e.id]=e}function qg(n,e,t){const i=n.name,s=i.length;for(aa.lastIndex=0;;){const r=aa.exec(i),o=aa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Hl(t,c===void 0?new Vg(a,n,e):new $g(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new Wg(a),Hl(t,h)),t=h}}}class cr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);qg(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Gl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Xg=37297;let Yg=0;function jg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Vl=new Ue;function Jg(n){We._getMatrix(Vl,We.workingColorSpace,n);const e=`mat3( ${Vl.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(n)){case Er:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function $l(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+jg(n.getShaderSource(e),o)}else return s}function Kg(n,e){const t=Jg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Zg(n,e){let t;switch(e){case fu:t="Linear";break;case pu:t="Reinhard";break;case mu:t="Cineon";break;case gu:t="ACESFilmic";break;case yu:t="AgX";break;case _u:t="Neutral";break;case vu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xs=new P;function Qg(){We.getLuminanceCoefficients(Xs);const n=Xs.x.toFixed(4),e=Xs.y.toFixed(4),t=Xs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ev(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function tv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function nv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function us(n){return n!==""}function Wl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ql(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const iv=/^[ \t]*#include +<([\w\d./]+)>/gm;function yo(n){return n.replace(iv,rv)}const sv=new Map;function rv(n,e){let t=Fe[e];if(t===void 0){const i=sv.get(e);if(i!==void 0)t=Fe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return yo(t)}const av=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(n){return n.replace(av,ov)}function ov(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function lv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===dh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===gn&&(e="SHADOWMAP_TYPE_VSM"),e}function cv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Bi:case zi:e="ENVMAP_TYPE_CUBE";break;case Mr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case zi:e="ENVMAP_MODE_REFRACTION";break}return e}function dv(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case uh:e="ENVMAP_BLENDING_MULTIPLY";break;case du:e="ENVMAP_BLENDING_MIX";break;case uu:e="ENVMAP_BLENDING_ADD";break}return e}function uv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function fv(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=lv(t),c=cv(t),d=hv(t),h=dv(t),f=uv(t),p=ev(t),g=tv(r),v=s.createProgram();let m,u,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(us).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(us).join(`
`),u.length>0&&(u+=`
`)):(m=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),u=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?Fe.tonemapping_pars_fragment:"",t.toneMapping!==On?Zg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Kg("linearToOutputTexel",t.outputColorSpace),Qg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(us).join(`
`)),o=yo(o),o=Wl(o,t),o=ql(o,t),a=yo(a),a=Wl(a,t),a=ql(a,t),o=Xl(o),a=Xl(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const E=x+m+o,S=x+u+a,I=Gl(s,s.VERTEX_SHADER,E),b=Gl(s,s.FRAGMENT_SHADER,S);s.attachShader(v,I),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(T){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(v).trim(),L=s.getShaderInfoLog(I).trim(),B=s.getShaderInfoLog(b).trim();let W=!0,G=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,I,b);else{const K=$l(s,I,"vertex"),V=$l(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+N+`
`+K+`
`+V)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(L===""||B==="")&&(G=!1);G&&(T.diagnostics={runnable:W,programLog:N,vertexShader:{log:L,prefix:m},fragmentShader:{log:B,prefix:u}})}s.deleteShader(I),s.deleteShader(b),C=new cr(s,v),w=nv(s,v)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,Xg)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=b,this}let pv=0;class mv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new gv(e),t.set(e,i)),i}}class gv{constructor(e){this.id=pv++,this.code=e,this.usedTimes=0}}function vv(n,e,t,i,s,r,o){const a=new Ch,l=new mv,c=new Set,d=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,T,N,L){const B=N.fog,W=L.geometry,G=w.isMeshStandardMaterial?N.environment:null,K=(w.isMeshStandardMaterial?t:e).get(w.envMap||G),V=K&&K.mapping===Mr?K.image.height:null,se=g[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,_e=ie!==void 0?ie.length:0;let Pe=0;W.morphAttributes.position!==void 0&&(Pe=1),W.morphAttributes.normal!==void 0&&(Pe=2),W.morphAttributes.color!==void 0&&(Pe=3);let qe,q,ee,xe;if(se){const Ke=tn[se];qe=Ke.vertexShader,q=Ke.fragmentShader}else qe=w.vertexShader,q=w.fragmentShader,l.update(w),ee=l.getVertexShaderID(w),xe=l.getFragmentShaderID(w);const ae=n.getRenderTarget(),re=n.state.buffers.depth.getReversed(),Me=L.isInstancedMesh===!0,ke=L.isBatchedMesh===!0,Ye=!!w.map,ze=!!w.matcap,ht=!!K,O=!!w.aoMap,Bt=!!w.lightMap,He=!!w.bumpMap,Ge=!!w.normalMap,Re=!!w.displacementMap,it=!!w.emissiveMap,Ae=!!w.metalnessMap,R=!!w.roughnessMap,_=w.anisotropy>0,F=w.clearcoat>0,j=w.dispersion>0,Z=w.iridescence>0,Y=w.sheen>0,Ee=w.transmission>0,ce=_&&!!w.anisotropyMap,ge=F&&!!w.clearcoatMap,$e=F&&!!w.clearcoatNormalMap,te=F&&!!w.clearcoatRoughnessMap,ve=Z&&!!w.iridescenceMap,Ce=Z&&!!w.iridescenceThicknessMap,Le=Y&&!!w.sheenColorMap,ye=Y&&!!w.sheenRoughnessMap,Ve=!!w.specularMap,Oe=!!w.specularColorMap,tt=!!w.specularIntensityMap,k=Ee&&!!w.transmissionMap,le=Ee&&!!w.thicknessMap,$=!!w.gradientMap,J=!!w.alphaMap,ue=w.alphaTest>0,he=!!w.alphaHash,De=!!w.extensions;let ct=On;w.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ct=n.toneMapping);const _t={shaderID:se,shaderType:w.type,shaderName:w.name,vertexShader:qe,fragmentShader:q,defines:w.defines,customVertexShaderID:ee,customFragmentShaderID:xe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:ke,batchingColor:ke&&L._colorsTexture!==null,instancing:Me,instancingColor:Me&&L.instanceColor!==null,instancingMorph:Me&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:qi,alphaToCoverage:!!w.alphaToCoverage,map:Ye,matcap:ze,envMap:ht,envMapMode:ht&&K.mapping,envMapCubeUVHeight:V,aoMap:O,lightMap:Bt,bumpMap:He,normalMap:Ge,displacementMap:f&&Re,emissiveMap:it,normalMapObjectSpace:Ge&&w.normalMapType===Su,normalMapTangentSpace:Ge&&w.normalMapType===Mh,metalnessMap:Ae,roughnessMap:R,anisotropy:_,anisotropyMap:ce,clearcoat:F,clearcoatMap:ge,clearcoatNormalMap:$e,clearcoatRoughnessMap:te,dispersion:j,iridescence:Z,iridescenceMap:ve,iridescenceThicknessMap:Ce,sheen:Y,sheenColorMap:Le,sheenRoughnessMap:ye,specularMap:Ve,specularColorMap:Oe,specularIntensityMap:tt,transmission:Ee,transmissionMap:k,thicknessMap:le,gradientMap:$,opaque:w.transparent===!1&&w.blending===ki&&w.alphaToCoverage===!1,alphaMap:J,alphaTest:ue,alphaHash:he,combine:w.combine,mapUv:Ye&&v(w.map.channel),aoMapUv:O&&v(w.aoMap.channel),lightMapUv:Bt&&v(w.lightMap.channel),bumpMapUv:He&&v(w.bumpMap.channel),normalMapUv:Ge&&v(w.normalMap.channel),displacementMapUv:Re&&v(w.displacementMap.channel),emissiveMapUv:it&&v(w.emissiveMap.channel),metalnessMapUv:Ae&&v(w.metalnessMap.channel),roughnessMapUv:R&&v(w.roughnessMap.channel),anisotropyMapUv:ce&&v(w.anisotropyMap.channel),clearcoatMapUv:ge&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:$e&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:ye&&v(w.sheenRoughnessMap.channel),specularMapUv:Ve&&v(w.specularMap.channel),specularColorMapUv:Oe&&v(w.specularColorMap.channel),specularIntensityMapUv:tt&&v(w.specularIntensityMap.channel),transmissionMapUv:k&&v(w.transmissionMap.channel),thicknessMapUv:le&&v(w.thicknessMap.channel),alphaMapUv:J&&v(w.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Ge||_),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!W.attributes.uv&&(Ye||J),fog:!!B,useFog:w.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:re,skinning:L.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Pe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:ct,decodeVideoTexture:Ye&&w.map.isVideoTexture===!0&&We.getTransfer(w.map.colorSpace)===Ze,decodeVideoTextureEmissive:it&&w.emissiveMap.isVideoTexture===!0&&We.getTransfer(w.emissiveMap.colorSpace)===Ze,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===yn,flipSided:w.side===Ct,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:De&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&w.extensions.multiDraw===!0||ke)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return _t.vertexUv1s=c.has(1),_t.vertexUv2s=c.has(2),_t.vertexUv3s=c.has(3),c.clear(),_t}function u(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const T in w.defines)y.push(T),y.push(w.defines[T]);return w.isRawShaderMaterial===!1&&(x(y,w),E(y,w),y.push(n.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function x(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function E(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function S(w){const y=g[w.type];let T;if(y){const N=tn[y];T=Qu.clone(N.uniforms)}else T=w.uniforms;return T}function I(w,y){let T;for(let N=0,L=d.length;N<L;N++){const B=d[N];if(B.cacheKey===y){T=B,++T.usedTimes;break}}return T===void 0&&(T=new fv(n,y,w,r),d.push(T)),T}function b(w){if(--w.usedTimes===0){const y=d.indexOf(w);d[y]=d[d.length-1],d.pop(),w.destroy()}}function A(w){l.remove(w)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:S,acquireProgram:I,releaseProgram:b,releaseShaderCache:A,programs:d,dispose:C}}function yv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function _v(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function jl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Jl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h,f,p,g,v,m){let u=n[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},n[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=p,u.groupOrder=g,u.renderOrder=h.renderOrder,u.z=v,u.group=m),e++,u}function a(h,f,p,g,v,m){const u=o(h,f,p,g,v,m);p.transmission>0?i.push(u):p.transparent===!0?s.push(u):t.push(u)}function l(h,f,p,g,v,m){const u=o(h,f,p,g,v,m);p.transmission>0?i.unshift(u):p.transparent===!0?s.unshift(u):t.unshift(u)}function c(h,f){t.length>1&&t.sort(h||_v),i.length>1&&i.sort(f||jl),s.length>1&&s.sort(f||jl)}function d(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function xv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Jl,n.set(i,[o])):s>=r.length?(o=new Jl,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function bv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Be};break;case"SpotLight":t={position:new P,direction:new P,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function wv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Sv=0;function Mv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Ev(n){const e=new bv,t=wv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const s=new P,r=new ot,o=new ot;function a(c){let d=0,h=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,v=0,m=0,u=0,x=0,E=0,S=0,I=0,b=0,A=0;c.sort(Mv);for(let w=0,y=c.length;w<y;w++){const T=c[w],N=T.color,L=T.intensity,B=T.distance,W=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)d+=N.r*L,h+=N.g*L,f+=N.b*L;else if(T.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(T.sh.coefficients[G],L);A++}else if(T.isDirectionalLight){const G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const K=T.shadow,V=t.get(T);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=W,i.directionalShadowMatrix[p]=T.shadow.matrix,x++}i.directional[p]=G,p++}else if(T.isSpotLight){const G=e.get(T);G.position.setFromMatrixPosition(T.matrixWorld),G.color.copy(N).multiplyScalar(L),G.distance=B,G.coneCos=Math.cos(T.angle),G.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),G.decay=T.decay,i.spot[v]=G;const K=T.shadow;if(T.map&&(i.spotLightMap[I]=T.map,I++,K.updateMatrices(T),T.castShadow&&b++),i.spotLightMatrix[v]=K.matrix,T.castShadow){const V=t.get(T);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.spotShadow[v]=V,i.spotShadowMap[v]=W,S++}v++}else if(T.isRectAreaLight){const G=e.get(T);G.color.copy(N).multiplyScalar(L),G.halfWidth.set(T.width*.5,0,0),G.halfHeight.set(0,T.height*.5,0),i.rectArea[m]=G,m++}else if(T.isPointLight){const G=e.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),G.distance=T.distance,G.decay=T.decay,T.castShadow){const K=T.shadow,V=t.get(T);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=T.shadow.matrix,E++}i.point[g]=G,g++}else if(T.isHemisphereLight){const G=e.get(T);G.skyColor.copy(T.color).multiplyScalar(L),G.groundColor.copy(T.groundColor).multiplyScalar(L),i.hemi[u]=G,u++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const C=i.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==u||C.numDirectionalShadows!==x||C.numPointShadows!==E||C.numSpotShadows!==S||C.numSpotMaps!==I||C.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=u,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+I-b,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,C.directionalLength=p,C.pointLength=g,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=u,C.numDirectionalShadows=x,C.numPointShadows=E,C.numSpotShadows=S,C.numSpotMaps=I,C.numLightProbes=A,i.version=Sv++)}function l(c,d){let h=0,f=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let u=0,x=c.length;u<x;u++){const E=c[u];if(E.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),h++}else if(E.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function Kl(n){const e=new Ev(n),t=[],i=[];function s(d){c.camera=d,t.length=0,i.length=0}function r(d){t.push(d)}function o(d){i.push(d)}function a(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Tv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Kl(n),e.set(s,[a])):r>=o.length?(a=new Kl(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class Av extends Yi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=bu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rv extends Yi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Cv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lv=`uniform sampler2D shadow_pass;
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
}`;function Pv(n,e,t){let i=new No;const s=new pe,r=new pe,o=new et,a=new Av({depthPacking:wu}),l=new Rv,c={},d=t.maxTextureSize,h={[Bn]:Ct,[Ct]:Bn,[yn]:yn},f=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:Cv,fragmentShader:Lv}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new an;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ft(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hh;let u=this.type;this.render=function(b,A,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const w=n.getRenderTarget(),y=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Un),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const L=u!==gn&&this.type===gn,B=u===gn&&this.type!==gn;for(let W=0,G=b.length;W<G;W++){const K=b[W],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const se=V.getFrameExtents();if(s.multiply(se),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/se.x),s.x=r.x*se.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/se.y),s.y=r.y*se.y,V.mapSize.y=r.y)),V.map===null||L===!0||B===!0){const _e=this.type!==gn?{minFilter:Ut,magFilter:Ut}:{};V.map!==null&&V.map.dispose(),V.map=new ii(s.x,s.y,_e),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const ie=V.getViewportCount();for(let _e=0;_e<ie;_e++){const Pe=V.getViewport(_e);o.set(r.x*Pe.x,r.y*Pe.y,r.x*Pe.z,r.y*Pe.w),N.viewport(o),V.updateMatrices(K,_e),i=V.getFrustum(),S(A,C,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===gn&&x(V,C),V.needsUpdate=!1}u=this.type,m.needsUpdate=!1,n.setRenderTarget(w,y,T)};function x(b,A){const C=e.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ii(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,C,f,v,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,C,p,v,null)}function E(b,A,C,w){let y=null;const T=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(T!==void 0)y=T;else if(y=C.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const N=y.uuid,L=A.uuid;let B=c[N];B===void 0&&(B={},c[N]=B);let W=B[L];W===void 0&&(W=y.clone(),B[L]=W,A.addEventListener("dispose",I)),y=W}if(y.visible=A.visible,y.wireframe=A.wireframe,w===gn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:h[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=n.properties.get(y);N.light=C}return y}function S(b,A,C,w,y){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===gn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const L=e.update(b),B=b.material;if(Array.isArray(B)){const W=L.groups;for(let G=0,K=W.length;G<K;G++){const V=W[G],se=B[V.materialIndex];if(se&&se.visible){const ie=E(b,se,w,y);b.onBeforeShadow(n,b,A,C,L,ie,V),n.renderBufferDirect(C,null,L,ie,b,V),b.onAfterShadow(n,b,A,C,L,ie,V)}}}else if(B.visible){const W=E(b,B,w,y);b.onBeforeShadow(n,b,A,C,L,W,null),n.renderBufferDirect(C,null,L,W,b,null),b.onAfterShadow(n,b,A,C,L,W,null)}}const N=b.children;for(let L=0,B=N.length;L<B;L++)S(N[L],A,C,w,y)}function I(b){b.target.removeEventListener("dispose",I);for(const C in c){const w=c[C],y=b.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const Iv={[Ia]:ka,[Da]:Oa,[Na]:Fa,[Fi]:Ua,[ka]:Ia,[Oa]:Da,[Fa]:Na,[Ua]:Fi};function kv(n,e){function t(){let k=!1;const le=new et;let $=null;const J=new et(0,0,0,0);return{setMask:function(ue){$!==ue&&!k&&(n.colorMask(ue,ue,ue,ue),$=ue)},setLocked:function(ue){k=ue},setClear:function(ue,he,De,ct,_t){_t===!0&&(ue*=ct,he*=ct,De*=ct),le.set(ue,he,De,ct),J.equals(le)===!1&&(n.clearColor(ue,he,De,ct),J.copy(le))},reset:function(){k=!1,$=null,J.set(-1,0,0,0)}}}function i(){let k=!1,le=!1,$=null,J=null,ue=null;return{setReversed:function(he){if(le!==he){const De=e.get("EXT_clip_control");le?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);const ct=ue;ue=null,this.setClear(ct)}le=he},getReversed:function(){return le},setTest:function(he){he?ae(n.DEPTH_TEST):re(n.DEPTH_TEST)},setMask:function(he){$!==he&&!k&&(n.depthMask(he),$=he)},setFunc:function(he){if(le&&(he=Iv[he]),J!==he){switch(he){case Ia:n.depthFunc(n.NEVER);break;case ka:n.depthFunc(n.ALWAYS);break;case Da:n.depthFunc(n.LESS);break;case Fi:n.depthFunc(n.LEQUAL);break;case Na:n.depthFunc(n.EQUAL);break;case Ua:n.depthFunc(n.GEQUAL);break;case Oa:n.depthFunc(n.GREATER);break;case Fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}J=he}},setLocked:function(he){k=he},setClear:function(he){ue!==he&&(le&&(he=1-he),n.clearDepth(he),ue=he)},reset:function(){k=!1,$=null,J=null,ue=null,le=!1}}}function s(){let k=!1,le=null,$=null,J=null,ue=null,he=null,De=null,ct=null,_t=null;return{setTest:function(Ke){k||(Ke?ae(n.STENCIL_TEST):re(n.STENCIL_TEST))},setMask:function(Ke){le!==Ke&&!k&&(n.stencilMask(Ke),le=Ke)},setFunc:function(Ke,Wt,ln){($!==Ke||J!==Wt||ue!==ln)&&(n.stencilFunc(Ke,Wt,ln),$=Ke,J=Wt,ue=ln)},setOp:function(Ke,Wt,ln){(he!==Ke||De!==Wt||ct!==ln)&&(n.stencilOp(Ke,Wt,ln),he=Ke,De=Wt,ct=ln)},setLocked:function(Ke){k=Ke},setClear:function(Ke){_t!==Ke&&(n.clearStencil(Ke),_t=Ke)},reset:function(){k=!1,le=null,$=null,J=null,ue=null,he=null,De=null,ct=null,_t=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let d={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,u=null,x=null,E=null,S=null,I=null,b=null,A=new Be(0,0,0),C=0,w=!1,y=null,T=null,N=null,L=null,B=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=K>=2);let se=null,ie={};const _e=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),qe=new et().fromArray(_e),q=new et().fromArray(Pe);function ee(k,le,$,J){const ue=new Uint8Array(4),he=n.createTexture();n.bindTexture(k,he),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<$;De++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,J,0,n.RGBA,n.UNSIGNED_BYTE,ue):n.texImage2D(le+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ue);return he}const xe={};xe[n.TEXTURE_2D]=ee(n.TEXTURE_2D,n.TEXTURE_2D,1),xe[n.TEXTURE_CUBE_MAP]=ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[n.TEXTURE_2D_ARRAY]=ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xe[n.TEXTURE_3D]=ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(n.DEPTH_TEST),o.setFunc(Fi),He(!1),Ge(il),ae(n.CULL_FACE),O(Un);function ae(k){d[k]!==!0&&(n.enable(k),d[k]=!0)}function re(k){d[k]!==!1&&(n.disable(k),d[k]=!1)}function Me(k,le){return h[k]!==le?(n.bindFramebuffer(k,le),h[k]=le,k===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=le),k===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=le),!0):!1}function ke(k,le){let $=p,J=!1;if(k){$=f.get(le),$===void 0&&($=[],f.set(le,$));const ue=k.textures;if($.length!==ue.length||$[0]!==n.COLOR_ATTACHMENT0){for(let he=0,De=ue.length;he<De;he++)$[he]=n.COLOR_ATTACHMENT0+he;$.length=ue.length,J=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,J=!0);J&&n.drawBuffers($)}function Ye(k){return g!==k?(n.useProgram(k),g=k,!0):!1}const ze={[Kn]:n.FUNC_ADD,[Yd]:n.FUNC_SUBTRACT,[jd]:n.FUNC_REVERSE_SUBTRACT};ze[Jd]=n.MIN,ze[Kd]=n.MAX;const ht={[Zd]:n.ZERO,[Qd]:n.ONE,[eu]:n.SRC_COLOR,[La]:n.SRC_ALPHA,[au]:n.SRC_ALPHA_SATURATE,[su]:n.DST_COLOR,[nu]:n.DST_ALPHA,[tu]:n.ONE_MINUS_SRC_COLOR,[Pa]:n.ONE_MINUS_SRC_ALPHA,[ru]:n.ONE_MINUS_DST_COLOR,[iu]:n.ONE_MINUS_DST_ALPHA,[ou]:n.CONSTANT_COLOR,[lu]:n.ONE_MINUS_CONSTANT_COLOR,[cu]:n.CONSTANT_ALPHA,[hu]:n.ONE_MINUS_CONSTANT_ALPHA};function O(k,le,$,J,ue,he,De,ct,_t,Ke){if(k===Un){v===!0&&(re(n.BLEND),v=!1);return}if(v===!1&&(ae(n.BLEND),v=!0),k!==Xd){if(k!==m||Ke!==w){if((u!==Kn||S!==Kn)&&(n.blendEquation(n.FUNC_ADD),u=Kn,S=Kn),Ke)switch(k){case ki:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ca:n.blendFunc(n.ONE,n.ONE);break;case sl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ca:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case sl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}x=null,E=null,I=null,b=null,A.set(0,0,0),C=0,m=k,w=Ke}return}ue=ue||le,he=he||$,De=De||J,(le!==u||ue!==S)&&(n.blendEquationSeparate(ze[le],ze[ue]),u=le,S=ue),($!==x||J!==E||he!==I||De!==b)&&(n.blendFuncSeparate(ht[$],ht[J],ht[he],ht[De]),x=$,E=J,I=he,b=De),(ct.equals(A)===!1||_t!==C)&&(n.blendColor(ct.r,ct.g,ct.b,_t),A.copy(ct),C=_t),m=k,w=!1}function Bt(k,le){k.side===yn?re(n.CULL_FACE):ae(n.CULL_FACE);let $=k.side===Ct;le&&($=!$),He($),k.blending===ki&&k.transparent===!1?O(Un):O(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const J=k.stencilWrite;a.setTest(J),J&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),it(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):re(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(k){y!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),y=k)}function Ge(k){k!==Wd?(ae(n.CULL_FACE),k!==T&&(k===il?n.cullFace(n.BACK):k===qd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):re(n.CULL_FACE),T=k}function Re(k){k!==N&&(G&&n.lineWidth(k),N=k)}function it(k,le,$){k?(ae(n.POLYGON_OFFSET_FILL),(L!==le||B!==$)&&(n.polygonOffset(le,$),L=le,B=$)):re(n.POLYGON_OFFSET_FILL)}function Ae(k){k?ae(n.SCISSOR_TEST):re(n.SCISSOR_TEST)}function R(k){k===void 0&&(k=n.TEXTURE0+W-1),se!==k&&(n.activeTexture(k),se=k)}function _(k,le,$){$===void 0&&(se===null?$=n.TEXTURE0+W-1:$=se);let J=ie[$];J===void 0&&(J={type:void 0,texture:void 0},ie[$]=J),(J.type!==k||J.texture!==le)&&(se!==$&&(n.activeTexture($),se=$),n.bindTexture(k,le||xe[k]),J.type=k,J.texture=le)}function F(){const k=ie[se];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Z(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ee(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ce(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function $e(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ve(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ce(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(k){qe.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),qe.copy(k))}function ye(k){q.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),q.copy(k))}function Ve(k,le){let $=c.get(le);$===void 0&&($=new WeakMap,c.set(le,$));let J=$.get(k);J===void 0&&(J=n.getUniformBlockIndex(le,k.name),$.set(k,J))}function Oe(k,le){const J=c.get(le).get(k);l.get(le)!==J&&(n.uniformBlockBinding(le,J,k.__bindingPointIndex),l.set(le,J))}function tt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},se=null,ie={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,u=null,x=null,E=null,S=null,I=null,b=null,A=new Be(0,0,0),C=0,w=!1,y=null,T=null,N=null,L=null,B=null,qe.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:re,bindFramebuffer:Me,drawBuffers:ke,useProgram:Ye,setBlending:O,setMaterial:Bt,setFlipSided:He,setCullFace:Ge,setLineWidth:Re,setPolygonOffset:it,setScissorTest:Ae,activeTexture:R,bindTexture:_,unbindTexture:F,compressedTexImage2D:j,compressedTexImage3D:Z,texImage2D:ve,texImage3D:Ce,updateUBOMapping:Ve,uniformBlockBinding:Oe,texStorage2D:$e,texStorage3D:te,texSubImage2D:Y,texSubImage3D:Ee,compressedTexSubImage2D:ce,compressedTexSubImage3D:ge,scissor:Le,viewport:ye,reset:tt}}function Zl(n,e,t,i){const s=Dv(i);switch(t){case vh:return n*e;case _h:return n*e;case xh:return n*e*2;case bh:return n*e/s.components*s.byteLength;case Po:return n*e/s.components*s.byteLength;case wh:return n*e*2/s.components*s.byteLength;case Io:return n*e*2/s.components*s.byteLength;case yh:return n*e*3/s.components*s.byteLength;case Kt:return n*e*4/s.components*s.byteLength;case ko:return n*e*4/s.components*s.byteLength;case sr:case rr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ar:case or:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $a:case qa:return Math.max(n,16)*Math.max(e,8)/4;case Va:case Wa:return Math.max(n,8)*Math.max(e,8)/2;case Xa:case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case eo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case to:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case no:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case io:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case so:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ao:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case oo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case lo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case co:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case lr:case ho:case uo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Sh:case fo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case po:case mo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dv(n){switch(n){case Mn:case ph:return{byteLength:1,components:1};case _s:case mh:case bs:return{byteLength:2,components:1};case Co:case Lo:return{byteLength:2,components:4};case ni:case Ro:case xn:return{byteLength:4,components:1};case gh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Nv(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pe,d=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,_){return p?new OffscreenCanvas(R,_):xs("canvas")}function v(R,_,F){let j=1;const Z=Ae(R);if((Z.width>F||Z.height>F)&&(j=F/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(j*Z.width),Ee=Math.floor(j*Z.height);h===void 0&&(h=g(Y,Ee));const ce=_?g(Y,Ee):h;return ce.width=Y,ce.height=Ee,ce.getContext("2d").drawImage(R,0,0,Y,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+Y+"x"+Ee+")."),ce}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),R;return R}function m(R){return R.generateMipmaps}function u(R){n.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(R,_,F,j,Z=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=_;if(_===n.RED&&(F===n.FLOAT&&(Y=n.R32F),F===n.HALF_FLOAT&&(Y=n.R16F),F===n.UNSIGNED_BYTE&&(Y=n.R8)),_===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.R8UI),F===n.UNSIGNED_SHORT&&(Y=n.R16UI),F===n.UNSIGNED_INT&&(Y=n.R32UI),F===n.BYTE&&(Y=n.R8I),F===n.SHORT&&(Y=n.R16I),F===n.INT&&(Y=n.R32I)),_===n.RG&&(F===n.FLOAT&&(Y=n.RG32F),F===n.HALF_FLOAT&&(Y=n.RG16F),F===n.UNSIGNED_BYTE&&(Y=n.RG8)),_===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.RG8UI),F===n.UNSIGNED_SHORT&&(Y=n.RG16UI),F===n.UNSIGNED_INT&&(Y=n.RG32UI),F===n.BYTE&&(Y=n.RG8I),F===n.SHORT&&(Y=n.RG16I),F===n.INT&&(Y=n.RG32I)),_===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),F===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),F===n.UNSIGNED_INT&&(Y=n.RGB32UI),F===n.BYTE&&(Y=n.RGB8I),F===n.SHORT&&(Y=n.RGB16I),F===n.INT&&(Y=n.RGB32I)),_===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),F===n.UNSIGNED_INT&&(Y=n.RGBA32UI),F===n.BYTE&&(Y=n.RGBA8I),F===n.SHORT&&(Y=n.RGBA16I),F===n.INT&&(Y=n.RGBA32I)),_===n.RGB&&F===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),_===n.RGBA){const Ee=Z?Er:We.getTransfer(j);F===n.FLOAT&&(Y=n.RGBA32F),F===n.HALF_FLOAT&&(Y=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Y=Ee===Ze?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function S(R,_){let F;return R?_===null||_===ni||_===Hi?F=n.DEPTH24_STENCIL8:_===xn?F=n.DEPTH32F_STENCIL8:_===_s&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ni||_===Hi?F=n.DEPTH_COMPONENT24:_===xn?F=n.DEPTH_COMPONENT32F:_===_s&&(F=n.DEPTH_COMPONENT16),F}function I(R,_){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ut&&R.minFilter!==sn?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function b(R){const _=R.target;_.removeEventListener("dispose",b),C(_),_.isVideoTexture&&d.delete(_)}function A(R){const _=R.target;_.removeEventListener("dispose",A),y(_)}function C(R){const _=i.get(R);if(_.__webglInit===void 0)return;const F=R.source,j=f.get(F);if(j){const Z=j[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&w(R),Object.keys(j).length===0&&f.delete(F)}i.remove(R)}function w(R){const _=i.get(R);n.deleteTexture(_.__webglTexture);const F=R.source,j=f.get(F);delete j[_.__cacheKey],o.memory.textures--}function y(R){const _=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(_.__webglFramebuffer[j]))for(let Z=0;Z<_.__webglFramebuffer[j].length;Z++)n.deleteFramebuffer(_.__webglFramebuffer[j][Z]);else n.deleteFramebuffer(_.__webglFramebuffer[j]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[j])}else{if(Array.isArray(_.__webglFramebuffer))for(let j=0;j<_.__webglFramebuffer.length;j++)n.deleteFramebuffer(_.__webglFramebuffer[j]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let j=0;j<_.__webglColorRenderbuffer.length;j++)_.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[j]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=R.textures;for(let j=0,Z=F.length;j<Z;j++){const Y=i.get(F[j]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(F[j])}i.remove(R)}let T=0;function N(){T=0}function L(){const R=T;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),T+=1,R}function B(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function W(R,_){const F=i.get(R);if(R.isVideoTexture&&Re(R),R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){const j=R.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,R,_);return}}t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+_)}function G(R,_){const F=i.get(R);if(R.version>0&&F.__version!==R.version){q(F,R,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+_)}function K(R,_){const F=i.get(R);if(R.version>0&&F.__version!==R.version){q(F,R,_);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+_)}function V(R,_){const F=i.get(R);if(R.version>0&&F.__version!==R.version){ee(F,R,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+_)}const se={[Ha]:n.REPEAT,[Qn]:n.CLAMP_TO_EDGE,[Ga]:n.MIRRORED_REPEAT},ie={[Ut]:n.NEAREST,[xu]:n.NEAREST_MIPMAP_NEAREST,[As]:n.NEAREST_MIPMAP_LINEAR,[sn]:n.LINEAR,[Ir]:n.LINEAR_MIPMAP_NEAREST,[ei]:n.LINEAR_MIPMAP_LINEAR},_e={[Mu]:n.NEVER,[Lu]:n.ALWAYS,[Eu]:n.LESS,[Eh]:n.LEQUAL,[Tu]:n.EQUAL,[Cu]:n.GEQUAL,[Au]:n.GREATER,[Ru]:n.NOTEQUAL};function Pe(R,_){if(_.type===xn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===sn||_.magFilter===Ir||_.magFilter===As||_.magFilter===ei||_.minFilter===sn||_.minFilter===Ir||_.minFilter===As||_.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,se[_.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,se[_.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,se[_.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,ie[_.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,ie[_.minFilter]),_.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,_e[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ut||_.minFilter!==As&&_.minFilter!==ei||_.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function qe(R,_){let F=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",b));const j=_.source;let Z=f.get(j);Z===void 0&&(Z={},f.set(j,Z));const Y=B(_);if(Y!==R.__cacheKey){Z[Y]===void 0&&(Z[Y]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Z[Y].usedTimes++;const Ee=Z[R.__cacheKey];Ee!==void 0&&(Z[R.__cacheKey].usedTimes--,Ee.usedTimes===0&&w(_)),R.__cacheKey=Y,R.__webglTexture=Z[Y].texture}return F}function q(R,_,F){let j=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(j=n.TEXTURE_3D);const Z=qe(R,_),Y=_.source;t.bindTexture(j,R.__webglTexture,n.TEXTURE0+F);const Ee=i.get(Y);if(Y.version!==Ee.__version||Z===!0){t.activeTexture(n.TEXTURE0+F);const ce=We.getPrimaries(We.workingColorSpace),ge=_.colorSpace===Dn?null:We.getPrimaries(_.colorSpace),$e=_.colorSpace===Dn||ce===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let te=v(_.image,!1,s.maxTextureSize);te=it(_,te);const ve=r.convert(_.format,_.colorSpace),Ce=r.convert(_.type);let Le=E(_.internalFormat,ve,Ce,_.colorSpace,_.isVideoTexture);Pe(j,_);let ye;const Ve=_.mipmaps,Oe=_.isVideoTexture!==!0,tt=Ee.__version===void 0||Z===!0,k=Y.dataReady,le=I(_,te);if(_.isDepthTexture)Le=S(_.format===Gi,_.type),tt&&(Oe?t.texStorage2D(n.TEXTURE_2D,1,Le,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Le,te.width,te.height,0,ve,Ce,null));else if(_.isDataTexture)if(Ve.length>0){Oe&&tt&&t.texStorage2D(n.TEXTURE_2D,le,Le,Ve[0].width,Ve[0].height);for(let $=0,J=Ve.length;$<J;$++)ye=Ve[$],Oe?k&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ye.width,ye.height,ve,Ce,ye.data):t.texImage2D(n.TEXTURE_2D,$,Le,ye.width,ye.height,0,ve,Ce,ye.data);_.generateMipmaps=!1}else Oe?(tt&&t.texStorage2D(n.TEXTURE_2D,le,Le,te.width,te.height),k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te.width,te.height,ve,Ce,te.data)):t.texImage2D(n.TEXTURE_2D,0,Le,te.width,te.height,0,ve,Ce,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Oe&&tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,Le,Ve[0].width,Ve[0].height,te.depth);for(let $=0,J=Ve.length;$<J;$++)if(ye=Ve[$],_.format!==Kt)if(ve!==null)if(Oe){if(k)if(_.layerUpdates.size>0){const ue=Zl(ye.width,ye.height,_.format,_.type);for(const he of _.layerUpdates){const De=ye.data.subarray(he*ue/ye.data.BYTES_PER_ELEMENT,(he+1)*ue/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,he,ye.width,ye.height,1,ve,De)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ye.width,ye.height,te.depth,ve,ye.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Le,ye.width,ye.height,te.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?k&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ye.width,ye.height,te.depth,ve,Ce,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,Le,ye.width,ye.height,te.depth,0,ve,Ce,ye.data)}else{Oe&&tt&&t.texStorage2D(n.TEXTURE_2D,le,Le,Ve[0].width,Ve[0].height);for(let $=0,J=Ve.length;$<J;$++)ye=Ve[$],_.format!==Kt?ve!==null?Oe?k&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,ye.width,ye.height,ve,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,$,Le,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?k&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ye.width,ye.height,ve,Ce,ye.data):t.texImage2D(n.TEXTURE_2D,$,Le,ye.width,ye.height,0,ve,Ce,ye.data)}else if(_.isDataArrayTexture)if(Oe){if(tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,Le,te.width,te.height,te.depth),k)if(_.layerUpdates.size>0){const $=Zl(te.width,te.height,_.format,_.type);for(const J of _.layerUpdates){const ue=te.data.subarray(J*$/te.data.BYTES_PER_ELEMENT,(J+1)*$/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,te.width,te.height,1,ve,Ce,ue)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ve,Ce,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,te.width,te.height,te.depth,0,ve,Ce,te.data);else if(_.isData3DTexture)Oe?(tt&&t.texStorage3D(n.TEXTURE_3D,le,Le,te.width,te.height,te.depth),k&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ve,Ce,te.data)):t.texImage3D(n.TEXTURE_3D,0,Le,te.width,te.height,te.depth,0,ve,Ce,te.data);else if(_.isFramebufferTexture){if(tt)if(Oe)t.texStorage2D(n.TEXTURE_2D,le,Le,te.width,te.height);else{let $=te.width,J=te.height;for(let ue=0;ue<le;ue++)t.texImage2D(n.TEXTURE_2D,ue,Le,$,J,0,ve,Ce,null),$>>=1,J>>=1}}else if(Ve.length>0){if(Oe&&tt){const $=Ae(Ve[0]);t.texStorage2D(n.TEXTURE_2D,le,Le,$.width,$.height)}for(let $=0,J=Ve.length;$<J;$++)ye=Ve[$],Oe?k&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ve,Ce,ye):t.texImage2D(n.TEXTURE_2D,$,Le,ve,Ce,ye);_.generateMipmaps=!1}else if(Oe){if(tt){const $=Ae(te);t.texStorage2D(n.TEXTURE_2D,le,Le,$.width,$.height)}k&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,Ce,te)}else t.texImage2D(n.TEXTURE_2D,0,Le,ve,Ce,te);m(_)&&u(j),Ee.__version=Y.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function ee(R,_,F){if(_.image.length!==6)return;const j=qe(R,_),Z=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+F);const Y=i.get(Z);if(Z.version!==Y.__version||j===!0){t.activeTexture(n.TEXTURE0+F);const Ee=We.getPrimaries(We.workingColorSpace),ce=_.colorSpace===Dn?null:We.getPrimaries(_.colorSpace),ge=_.colorSpace===Dn||Ee===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const $e=_.isCompressedTexture||_.image[0].isCompressedTexture,te=_.image[0]&&_.image[0].isDataTexture,ve=[];for(let J=0;J<6;J++)!$e&&!te?ve[J]=v(_.image[J],!0,s.maxCubemapSize):ve[J]=te?_.image[J].image:_.image[J],ve[J]=it(_,ve[J]);const Ce=ve[0],Le=r.convert(_.format,_.colorSpace),ye=r.convert(_.type),Ve=E(_.internalFormat,Le,ye,_.colorSpace),Oe=_.isVideoTexture!==!0,tt=Y.__version===void 0||j===!0,k=Z.dataReady;let le=I(_,Ce);Pe(n.TEXTURE_CUBE_MAP,_);let $;if($e){Oe&&tt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,le,Ve,Ce.width,Ce.height);for(let J=0;J<6;J++){$=ve[J].mipmaps;for(let ue=0;ue<$.length;ue++){const he=$[ue];_.format!==Kt?Le!==null?Oe?k&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,he.width,he.height,Le,he.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,Ve,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,he.width,he.height,Le,ye,he.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,Ve,he.width,he.height,0,Le,ye,he.data)}}}else{if($=_.mipmaps,Oe&&tt){$.length>0&&le++;const J=Ae(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,le,Ve,J.width,J.height)}for(let J=0;J<6;J++)if(te){Oe?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ve[J].width,ve[J].height,Le,ye,ve[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ve,ve[J].width,ve[J].height,0,Le,ye,ve[J].data);for(let ue=0;ue<$.length;ue++){const De=$[ue].image[J].image;Oe?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,De.width,De.height,Le,ye,De.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,Ve,De.width,De.height,0,Le,ye,De.data)}}else{Oe?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Le,ye,ve[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ve,Le,ye,ve[J]);for(let ue=0;ue<$.length;ue++){const he=$[ue];Oe?k&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Le,ye,he.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,Ve,Le,ye,he.image[J])}}}m(_)&&u(n.TEXTURE_CUBE_MAP),Y.__version=Z.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function xe(R,_,F,j,Z,Y){const Ee=r.convert(F.format,F.colorSpace),ce=r.convert(F.type),ge=E(F.internalFormat,Ee,ce,F.colorSpace),$e=i.get(_),te=i.get(F);if(te.__renderTarget=_,!$e.__hasExternalTextures){const ve=Math.max(1,_.width>>Y),Ce=Math.max(1,_.height>>Y);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,Y,ge,ve,Ce,_.depth,0,Ee,ce,null):t.texImage2D(Z,Y,ge,ve,Ce,0,Ee,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ge(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,Z,te.__webglTexture,0,He(_)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,Z,te.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(R,_,F){if(n.bindRenderbuffer(n.RENDERBUFFER,R),_.depthBuffer){const j=_.depthTexture,Z=j&&j.isDepthTexture?j.type:null,Y=S(_.stencilBuffer,Z),Ee=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=He(_);Ge(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce,Y,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,Y,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Y,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,R)}else{const j=_.textures;for(let Z=0;Z<j.length;Z++){const Y=j[Z],Ee=r.convert(Y.format,Y.colorSpace),ce=r.convert(Y.type),ge=E(Y.internalFormat,Ee,ce,Y.colorSpace),$e=He(_);F&&Ge(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,$e,ge,_.width,_.height):Ge(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$e,ge,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ge,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function re(R,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(_.depthTexture);j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W(_.depthTexture,0);const Z=j.__webglTexture,Y=He(_);if(_.depthTexture.format===Di)Ge(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(_.depthTexture.format===Gi)Ge(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Me(R){const _=i.get(R),F=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const j=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),j){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,j.removeEventListener("dispose",Z)};j.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=j}if(R.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");re(_.__webglFramebuffer,R)}else if(F){_.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[j]),_.__webglDepthbuffer[j]===void 0)_.__webglDepthbuffer[j]=n.createRenderbuffer(),ae(_.__webglDepthbuffer[j],R,!1);else{const Z=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),ae(_.__webglDepthbuffer,R,!1);else{const j=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,Z)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(R,_,F){const j=i.get(R);_!==void 0&&xe(j.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Me(R)}function Ye(R){const _=R.texture,F=i.get(R),j=i.get(_);R.addEventListener("dispose",A);const Z=R.textures,Y=R.isWebGLCubeRenderTarget===!0,Ee=Z.length>1;if(Ee||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=_.version,o.memory.textures++),Y){F.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ce]=[];for(let ge=0;ge<_.mipmaps.length;ge++)F.__webglFramebuffer[ce][ge]=n.createFramebuffer()}else F.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ce=0;ce<_.mipmaps.length;ce++)F.__webglFramebuffer[ce]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let ce=0,ge=Z.length;ce<ge;ce++){const $e=i.get(Z[ce]);$e.__webglTexture===void 0&&($e.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&Ge(R)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ce=0;ce<Z.length;ce++){const ge=Z[ce];F.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[ce]);const $e=r.convert(ge.format,ge.colorSpace),te=r.convert(ge.type),ve=E(ge.internalFormat,$e,te,ge.colorSpace,R.isXRRenderTarget===!0),Ce=He(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,ve,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,F.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),ae(F.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,_);for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0)for(let ge=0;ge<_.mipmaps.length;ge++)xe(F.__webglFramebuffer[ce][ge],R,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ge);else xe(F.__webglFramebuffer[ce],R,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(_)&&u(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ce=0,ge=Z.length;ce<ge;ce++){const $e=Z[ce],te=i.get($e);t.bindTexture(n.TEXTURE_2D,te.__webglTexture),Pe(n.TEXTURE_2D,$e),xe(F.__webglFramebuffer,R,$e,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,0),m($e)&&u(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ce=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,j.__webglTexture),Pe(ce,_),_.mipmaps&&_.mipmaps.length>0)for(let ge=0;ge<_.mipmaps.length;ge++)xe(F.__webglFramebuffer[ge],R,_,n.COLOR_ATTACHMENT0,ce,ge);else xe(F.__webglFramebuffer,R,_,n.COLOR_ATTACHMENT0,ce,0);m(_)&&u(ce),t.unbindTexture()}R.depthBuffer&&Me(R)}function ze(R){const _=R.textures;for(let F=0,j=_.length;F<j;F++){const Z=_[F];if(m(Z)){const Y=x(R),Ee=i.get(Z).__webglTexture;t.bindTexture(Y,Ee),u(Y),t.unbindTexture()}}}const ht=[],O=[];function Bt(R){if(R.samples>0){if(Ge(R)===!1){const _=R.textures,F=R.width,j=R.height;let Z=n.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(R),ce=_.length>1;if(ce)for(let ge=0;ge<_.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let ge=0;ge<_.length;ge++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ge]);const $e=i.get(_[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$e,0)}n.blitFramebuffer(0,0,F,j,0,0,F,j,Z,n.NEAREST),l===!0&&(ht.length=0,O.length=0,ht.push(n.COLOR_ATTACHMENT0+ge),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ht.push(Y),O.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,O)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let ge=0;ge<_.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[ge]);const $e=i.get(_[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,$e,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const _=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function He(R){return Math.min(s.maxSamples,R.samples)}function Ge(R){const _=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Re(R){const _=o.render.frame;d.get(R)!==_&&(d.set(R,_),R.update())}function it(R,_){const F=R.colorSpace,j=R.format,Z=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||F!==qi&&F!==Dn&&(We.getTransfer(F)===Ze?(j!==Kt||Z!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function Ae(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=W,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=ke,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Ge}function Uv(n,e){function t(i,s=Dn){let r;const o=We.getTransfer(s);if(i===Mn)return n.UNSIGNED_BYTE;if(i===Co)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Lo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===gh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ph)return n.BYTE;if(i===mh)return n.SHORT;if(i===_s)return n.UNSIGNED_SHORT;if(i===Ro)return n.INT;if(i===ni)return n.UNSIGNED_INT;if(i===xn)return n.FLOAT;if(i===bs)return n.HALF_FLOAT;if(i===vh)return n.ALPHA;if(i===yh)return n.RGB;if(i===Kt)return n.RGBA;if(i===_h)return n.LUMINANCE;if(i===xh)return n.LUMINANCE_ALPHA;if(i===Di)return n.DEPTH_COMPONENT;if(i===Gi)return n.DEPTH_STENCIL;if(i===bh)return n.RED;if(i===Po)return n.RED_INTEGER;if(i===wh)return n.RG;if(i===Io)return n.RG_INTEGER;if(i===ko)return n.RGBA_INTEGER;if(i===sr||i===rr||i===ar||i===or)if(o===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Va||i===$a||i===Wa||i===qa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===$a)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xa||i===Ya||i===ja)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Xa||i===Ya)return o===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ja)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ja||i===Ka||i===Za||i===Qa||i===eo||i===to||i===no||i===io||i===so||i===ro||i===ao||i===oo||i===lo||i===co)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ja)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ka)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Za)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Qa)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===eo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===to)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===no)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===io)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===so)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ro)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ao)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===oo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===lo)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===co)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lr||i===ho||i===uo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===lr)return o===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===uo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Sh||i===fo||i===po||i===mo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===lr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===fo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===po)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Ov extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _n extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fv={type:"move"};class oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),u=this._getHandJoint(c,v);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Fv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Bv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zv=`
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

}`;class Hv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Mt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new zn({vertexShader:Bv,fragmentShader:zv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new Tr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gv extends Xi{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,f=null,p=null,g=null;const v=new Hv,m=t.getContextAttributes();let u=null,x=null;const E=[],S=[],I=new pe;let b=null;const A=new Vt;A.viewport=new et;const C=new Vt;C.viewport=new et;const w=[A,C],y=new Ov;let T=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ee=E[q];return ee===void 0&&(ee=new oa,E[q]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(q){let ee=E[q];return ee===void 0&&(ee=new oa,E[q]=ee),ee.getGripSpace()},this.getHand=function(q){let ee=E[q];return ee===void 0&&(ee=new oa,E[q]=ee),ee.getHandSpace()};function L(q){const ee=S.indexOf(q.inputSource);if(ee===-1)return;const xe=E[ee];xe!==void 0&&(xe.update(q.inputSource,q.frame,c||o),xe.dispatchEvent({type:q.type,data:q.inputSource}))}function B(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",W);for(let q=0;q<E.length;q++){const ee=S[q];ee!==null&&(S[q]=null,E[q].disconnect(ee))}T=null,N=null,v.reset(),e.setRenderTarget(u),p=null,f=null,h=null,s=null,x=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(u=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",B),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(I),s.renderState.layers===void 0){const ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new ii(p.framebufferWidth,p.framebufferHeight,{format:Kt,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,xe=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?Gi:Di,xe=m.stencil?Hi:ni);const re={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(re),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new ii(f.textureWidth,f.textureHeight,{format:Kt,type:Mn,depthTexture:new Fh(f.textureWidth,f.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),qe.setContext(s),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(q){for(let ee=0;ee<q.removed.length;ee++){const xe=q.removed[ee],ae=S.indexOf(xe);ae>=0&&(S[ae]=null,E[ae].disconnect(xe))}for(let ee=0;ee<q.added.length;ee++){const xe=q.added[ee];let ae=S.indexOf(xe);if(ae===-1){for(let Me=0;Me<E.length;Me++)if(Me>=S.length){S.push(xe),ae=Me;break}else if(S[Me]===null){S[Me]=xe,ae=Me;break}if(ae===-1)break}const re=E[ae];re&&re.connect(xe)}}const G=new P,K=new P;function V(q,ee,xe){G.setFromMatrixPosition(ee.matrixWorld),K.setFromMatrixPosition(xe.matrixWorld);const ae=G.distanceTo(K),re=ee.projectionMatrix.elements,Me=xe.projectionMatrix.elements,ke=re[14]/(re[10]-1),Ye=re[14]/(re[10]+1),ze=(re[9]+1)/re[5],ht=(re[9]-1)/re[5],O=(re[8]-1)/re[0],Bt=(Me[8]+1)/Me[0],He=ke*O,Ge=ke*Bt,Re=ae/(-O+Bt),it=Re*-O;if(ee.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(it),q.translateZ(Re),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),re[10]===-1)q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Ae=ke+Re,R=Ye+Re,_=He-it,F=Ge+(ae-it),j=ze*Ye/R*Ae,Z=ht*Ye/R*Ae;q.projectionMatrix.makePerspective(_,F,j,Z,Ae,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function se(q,ee){ee===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ee.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let ee=q.near,xe=q.far;v.texture!==null&&(v.depthNear>0&&(ee=v.depthNear),v.depthFar>0&&(xe=v.depthFar)),y.near=C.near=A.near=ee,y.far=C.far=A.far=xe,(T!==y.near||N!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,N=y.far),A.layers.mask=q.layers.mask|2,C.layers.mask=q.layers.mask|4,y.layers.mask=A.layers.mask|C.layers.mask;const ae=q.parent,re=y.cameras;se(y,ae);for(let Me=0;Me<re.length;Me++)se(re[Me],ae);re.length===2?V(y,A,C):y.projectionMatrix.copy(A.projectionMatrix),ie(q,y,ae)};function ie(q,ee,xe){xe===null?q.matrix.copy(ee.matrixWorld):(q.matrix.copy(xe.matrixWorld),q.matrix.invert(),q.matrix.multiply(ee.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=vo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let _e=null;function Pe(q,ee){if(d=ee.getViewerPose(c||o),g=ee,d!==null){const xe=d.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ae=!1;xe.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let Me=0;Me<xe.length;Me++){const ke=xe[Me];let Ye=null;if(p!==null)Ye=p.getViewport(ke);else{const ht=h.getViewSubImage(f,ke);Ye=ht.viewport,Me===0&&(e.setRenderTargetTextures(x,ht.colorTexture,f.ignoreDepthValues?void 0:ht.depthStencilTexture),e.setRenderTarget(x))}let ze=w[Me];ze===void 0&&(ze=new Vt,ze.layers.enable(Me),ze.viewport=new et,w[Me]=ze),ze.matrix.fromArray(ke.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(ke.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),Me===0&&(y.matrix.copy(ze.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(ze)}const re=s.enabledFeatures;if(re&&re.includes("depth-sensing")){const Me=h.getDepthInformation(xe[0]);Me&&Me.isValid&&Me.texture&&v.init(e,Me,s.renderState)}}for(let xe=0;xe<E.length;xe++){const ae=S[xe],re=E[xe];ae!==null&&re!==void 0&&re.update(ae,ee,c||o)}_e&&_e(q,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),g=null}const qe=new Oh;qe.setAnimationLoop(Pe),this.setAnimationLoop=function(q){_e=q},this.dispose=function(){}}}const Yn=new rn,Vv=new ot;function $v(n,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Dh(n)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,x,E,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),h(m,u)):u.isMeshPhongMaterial?(r(m,u),d(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,S)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),v(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,x,E):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Ct&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Ct&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const x=e.get(u),E=x.envMap,S=x.envMapRotation;E&&(m.envMap.value=E,Yn.copy(S),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),m.envMapRotation.value.setFromMatrix4(Vv.makeRotationFromEuler(Yn)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,x,E){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*x,m.scale.value=E*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,x){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ct&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function v(m,u){const x=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Wv(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,E){const S=E.program;i.uniformBlockBinding(x,S)}function c(x,E){let S=s[x.id];S===void 0&&(g(x),S=d(x),s[x.id]=S,x.addEventListener("dispose",m));const I=E.program;i.updateUBOMapping(x,I);const b=e.render.frame;r[x.id]!==b&&(f(x),r[x.id]=b)}function d(x){const E=h();x.__bindingPointIndex=E;const S=n.createBuffer(),I=x.__size,b=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,I,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const E=s[x.id],S=x.uniforms,I=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let b=0,A=S.length;b<A;b++){const C=Array.isArray(S[b])?S[b]:[S[b]];for(let w=0,y=C.length;w<y;w++){const T=C[w];if(p(T,b,w,I)===!0){const N=T.__offset,L=Array.isArray(T.value)?T.value:[T.value];let B=0;for(let W=0;W<L.length;W++){const G=L[W],K=v(G);typeof G=="number"||typeof G=="boolean"?(T.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,N+B,T.__data)):G.isMatrix3?(T.__data[0]=G.elements[0],T.__data[1]=G.elements[1],T.__data[2]=G.elements[2],T.__data[3]=0,T.__data[4]=G.elements[3],T.__data[5]=G.elements[4],T.__data[6]=G.elements[5],T.__data[7]=0,T.__data[8]=G.elements[6],T.__data[9]=G.elements[7],T.__data[10]=G.elements[8],T.__data[11]=0):(G.toArray(T.__data,B),B+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(x,E,S,I){const b=x.value,A=E+"_"+S;if(I[A]===void 0)return typeof b=="number"||typeof b=="boolean"?I[A]=b:I[A]=b.clone(),!0;{const C=I[A];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return I[A]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function g(x){const E=x.uniforms;let S=0;const I=16;for(let A=0,C=E.length;A<C;A++){const w=Array.isArray(E[A])?E[A]:[E[A]];for(let y=0,T=w.length;y<T;y++){const N=w[y],L=Array.isArray(N.value)?N.value:[N.value];for(let B=0,W=L.length;B<W;B++){const G=L[B],K=v(G),V=S%I,se=V%K.boundary,ie=V+se;S+=se,ie!==0&&I-ie<K.storage&&(S+=I-ie),N.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=K.storage}}}const b=S%I;return b>0&&(S+=I-b),x.__size=S,x.__cache={},this}function v(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),E}function m(x){const E=x.target;E.removeEventListener("dispose",m);const S=o.indexOf(E.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function u(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:l,update:c,dispose:u}}class qv{constructor(e={}){const{canvas:t=Iu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,u=null;const x=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=St,this.toneMapping=On,this.toneMappingExposure=1;const S=this;let I=!1,b=0,A=0,C=null,w=-1,y=null;const T=new et,N=new et;let L=null;const B=new Be(0);let W=0,G=t.width,K=t.height,V=1,se=null,ie=null;const _e=new et(0,0,G,K),Pe=new et(0,0,G,K);let qe=!1;const q=new No;let ee=!1,xe=!1;const ae=new ot,re=new ot,Me=new P,ke=new et,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function ht(){return C===null?V:1}let O=i;function Bt(M,D){return t.getContext(M,D)}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ao}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",he,!1),O===null){const D="webgl2";if(O=Bt(D,M),O===null)throw Bt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let He,Ge,Re,it,Ae,R,_,F,j,Z,Y,Ee,ce,ge,$e,te,ve,Ce,Le,ye,Ve,Oe,tt,k;function le(){He=new Km(O),He.init(),Oe=new Uv(O,He),Ge=new Wm(O,He,e,Oe),Re=new kv(O,He),Ge.reverseDepthBuffer&&f&&Re.buffers.depth.setReversed(!0),it=new eg(O),Ae=new yv,R=new Nv(O,He,Re,Ae,Ge,Oe,it),_=new Xm(S),F=new Jm(S),j=new of(O),tt=new Vm(O,j),Z=new Zm(O,j,it,tt),Y=new ng(O,Z,j,it),Le=new tg(O,Ge,R),te=new qm(Ae),Ee=new vv(S,_,F,He,Ge,tt,te),ce=new $v(S,Ae),ge=new xv,$e=new Tv(He),Ce=new Gm(S,_,F,Re,Y,p,l),ve=new Pv(S,Y,Ge),k=new Wv(O,it,Ge,Re),ye=new $m(O,He,it),Ve=new Qm(O,He,it),it.programs=Ee.programs,S.capabilities=Ge,S.extensions=He,S.properties=Ae,S.renderLists=ge,S.shadowMap=ve,S.state=Re,S.info=it}le();const $=new Gv(S,O);this.xr=$,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const M=He.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=He.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(G,K,!1))},this.getSize=function(M){return M.set(G,K)},this.setSize=function(M,D,z=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=M,K=D,t.width=Math.floor(M*V),t.height=Math.floor(D*V),z===!0&&(t.style.width=M+"px",t.style.height=D+"px"),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(G*V,K*V).floor()},this.setDrawingBufferSize=function(M,D,z){G=M,K=D,V=z,t.width=Math.floor(M*z),t.height=Math.floor(D*z),this.setViewport(0,0,M,D)},this.getCurrentViewport=function(M){return M.copy(T)},this.getViewport=function(M){return M.copy(_e)},this.setViewport=function(M,D,z,H){M.isVector4?_e.set(M.x,M.y,M.z,M.w):_e.set(M,D,z,H),Re.viewport(T.copy(_e).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(Pe)},this.setScissor=function(M,D,z,H){M.isVector4?Pe.set(M.x,M.y,M.z,M.w):Pe.set(M,D,z,H),Re.scissor(N.copy(Pe).multiplyScalar(V).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(M){Re.setScissorTest(qe=M)},this.setOpaqueSort=function(M){se=M},this.setTransparentSort=function(M){ie=M},this.getClearColor=function(M){return M.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(M=!0,D=!0,z=!0){let H=0;if(M){let U=!1;if(C!==null){const ne=C.texture.format;U=ne===ko||ne===Io||ne===Po}if(U){const ne=C.texture.type,de=ne===Mn||ne===ni||ne===_s||ne===Hi||ne===Co||ne===Lo,be=Ce.getClearColor(),we=Ce.getClearAlpha(),Ie=be.r,Ne=be.g,Se=be.b;de?(g[0]=Ie,g[1]=Ne,g[2]=Se,g[3]=we,O.clearBufferuiv(O.COLOR,0,g)):(v[0]=Ie,v[1]=Ne,v[2]=Se,v[3]=we,O.clearBufferiv(O.COLOR,0,v))}else H|=O.COLOR_BUFFER_BIT}D&&(H|=O.DEPTH_BUFFER_BIT),z&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",he,!1),ge.dispose(),$e.dispose(),Ae.dispose(),_.dispose(),F.dispose(),Y.dispose(),tt.dispose(),k.dispose(),Ee.dispose(),$.dispose(),$.removeEventListener("sessionstart",qo),$.removeEventListener("sessionend",Xo),Gn.stop()};function J(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const M=it.autoReset,D=ve.enabled,z=ve.autoUpdate,H=ve.needsUpdate,U=ve.type;le(),it.autoReset=M,ve.enabled=D,ve.autoUpdate=z,ve.needsUpdate=H,ve.type=U}function he(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function De(M){const D=M.target;D.removeEventListener("dispose",De),ct(D)}function ct(M){_t(M),Ae.remove(M)}function _t(M){const D=Ae.get(M).programs;D!==void 0&&(D.forEach(function(z){Ee.releaseProgram(z)}),M.isShaderMaterial&&Ee.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,z,H,U,ne){D===null&&(D=Ye);const de=U.isMesh&&U.matrixWorld.determinant()<0,be=_d(M,D,z,H,U);Re.setMaterial(H,de);let we=z.index,Ie=1;if(H.wireframe===!0){if(we=Z.getWireframeAttribute(z),we===void 0)return;Ie=2}const Ne=z.drawRange,Se=z.attributes.position;let Xe=Ne.start*Ie,nt=(Ne.start+Ne.count)*Ie;ne!==null&&(Xe=Math.max(Xe,ne.start*Ie),nt=Math.min(nt,(ne.start+ne.count)*Ie)),we!==null?(Xe=Math.max(Xe,0),nt=Math.min(nt,we.count)):Se!=null&&(Xe=Math.max(Xe,0),nt=Math.min(nt,Se.count));const st=nt-Xe;if(st<0||st===1/0)return;tt.setup(U,H,be,z,we);let At,je=ye;if(we!==null&&(At=j.get(we),je=Ve,je.setIndex(At)),U.isMesh)H.wireframe===!0?(Re.setLineWidth(H.wireframeLinewidth*ht()),je.setMode(O.LINES)):je.setMode(O.TRIANGLES);else if(U.isLine){let Te=H.linewidth;Te===void 0&&(Te=1),Re.setLineWidth(Te*ht()),U.isLineSegments?je.setMode(O.LINES):U.isLineLoop?je.setMode(O.LINE_LOOP):je.setMode(O.LINE_STRIP)}else U.isPoints?je.setMode(O.POINTS):U.isSprite&&je.setMode(O.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)je.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))je.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Te=U._multiDrawStarts,cn=U._multiDrawCounts,Je=U._multiDrawCount,qt=we?j.get(we).bytesPerElement:1,ai=Ae.get(H).currentProgram.getUniforms();for(let Pt=0;Pt<Je;Pt++)ai.setValue(O,"_gl_DrawID",Pt),je.render(Te[Pt]/qt,cn[Pt])}else if(U.isInstancedMesh)je.renderInstances(Xe,st,U.count);else if(z.isInstancedBufferGeometry){const Te=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,cn=Math.min(z.instanceCount,Te);je.renderInstances(Xe,st,cn)}else je.render(Xe,st)};function Ke(M,D,z){M.transparent===!0&&M.side===yn&&M.forceSinglePass===!1?(M.side=Ct,M.needsUpdate=!0,Es(M,D,z),M.side=Bn,M.needsUpdate=!0,Es(M,D,z),M.side=yn):Es(M,D,z)}this.compile=function(M,D,z=null){z===null&&(z=M),u=$e.get(z),u.init(D),E.push(u),z.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),M!==z&&M.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),u.setupLights();const H=new Set;return M.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ne=U.material;if(ne)if(Array.isArray(ne))for(let de=0;de<ne.length;de++){const be=ne[de];Ke(be,z,U),H.add(be)}else Ke(ne,z,U),H.add(ne)}),E.pop(),u=null,H},this.compileAsync=function(M,D,z=null){const H=this.compile(M,D,z);return new Promise(U=>{function ne(){if(H.forEach(function(de){Ae.get(de).currentProgram.isReady()&&H.delete(de)}),H.size===0){U(M);return}setTimeout(ne,10)}He.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Wt=null;function ln(M){Wt&&Wt(M)}function qo(){Gn.stop()}function Xo(){Gn.start()}const Gn=new Oh;Gn.setAnimationLoop(ln),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(M){Wt=M,$.setAnimationLoop(M),M===null?Gn.stop():Gn.start()},$.addEventListener("sessionstart",qo),$.addEventListener("sessionend",Xo),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(D),D=$.getCamera()),M.isScene===!0&&M.onBeforeRender(S,M,D,C),u=$e.get(M,E.length),u.init(D),E.push(u),re.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),q.setFromProjectionMatrix(re),xe=this.localClippingEnabled,ee=te.init(this.clippingPlanes,xe),m=ge.get(M,x.length),m.init(),x.push(m),$.enabled===!0&&$.isPresenting===!0){const ne=S.xr.getDepthSensingMesh();ne!==null&&Pr(ne,D,-1/0,S.sortObjects)}Pr(M,D,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(se,ie),ze=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,ze&&Ce.addToRenderList(m,M),this.info.render.frame++,ee===!0&&te.beginShadows();const z=u.state.shadowsArray;ve.render(z,M,D),ee===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,U=m.transmissive;if(u.setupLights(),D.isArrayCamera){const ne=D.cameras;if(U.length>0)for(let de=0,be=ne.length;de<be;de++){const we=ne[de];jo(H,U,M,we)}ze&&Ce.render(M);for(let de=0,be=ne.length;de<be;de++){const we=ne[de];Yo(m,M,we,we.viewport)}}else U.length>0&&jo(H,U,M,D),ze&&Ce.render(M),Yo(m,M,D);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),M.isScene===!0&&M.onAfterRender(S,M,D),tt.resetDefaultState(),w=-1,y=null,E.pop(),E.length>0?(u=E[E.length-1],ee===!0&&te.setGlobalState(S.clippingPlanes,u.state.camera)):u=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Pr(M,D,z,H){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)u.pushLight(M),M.castShadow&&u.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||q.intersectsSprite(M)){H&&ke.setFromMatrixPosition(M.matrixWorld).applyMatrix4(re);const de=Y.update(M),be=M.material;be.visible&&m.push(M,de,be,z,ke.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||q.intersectsObject(M))){const de=Y.update(M),be=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ke.copy(M.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),ke.copy(de.boundingSphere.center)),ke.applyMatrix4(M.matrixWorld).applyMatrix4(re)),Array.isArray(be)){const we=de.groups;for(let Ie=0,Ne=we.length;Ie<Ne;Ie++){const Se=we[Ie],Xe=be[Se.materialIndex];Xe&&Xe.visible&&m.push(M,de,Xe,z,ke.z,Se)}}else be.visible&&m.push(M,de,be,z,ke.z,null)}}const ne=M.children;for(let de=0,be=ne.length;de<be;de++)Pr(ne[de],D,z,H)}function Yo(M,D,z,H){const U=M.opaque,ne=M.transmissive,de=M.transparent;u.setupLightsView(z),ee===!0&&te.setGlobalState(S.clippingPlanes,z),H&&Re.viewport(T.copy(H)),U.length>0&&Ms(U,D,z),ne.length>0&&Ms(ne,D,z),de.length>0&&Ms(de,D,z),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function jo(M,D,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[H.id]===void 0&&(u.state.transmissionRenderTarget[H.id]=new ii(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?bs:Mn,minFilter:ei,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));const ne=u.state.transmissionRenderTarget[H.id],de=H.viewport||T;ne.setSize(de.z,de.w);const be=S.getRenderTarget();S.setRenderTarget(ne),S.getClearColor(B),W=S.getClearAlpha(),W<1&&S.setClearColor(16777215,.5),S.clear(),ze&&Ce.render(z);const we=S.toneMapping;S.toneMapping=On;const Ie=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),u.setupLightsView(H),ee===!0&&te.setGlobalState(S.clippingPlanes,H),Ms(M,z,H),R.updateMultisampleRenderTarget(ne),R.updateRenderTargetMipmap(ne),He.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let Se=0,Xe=D.length;Se<Xe;Se++){const nt=D[Se],st=nt.object,At=nt.geometry,je=nt.material,Te=nt.group;if(je.side===yn&&st.layers.test(H.layers)){const cn=je.side;je.side=Ct,je.needsUpdate=!0,Jo(st,z,H,At,je,Te),je.side=cn,je.needsUpdate=!0,Ne=!0}}Ne===!0&&(R.updateMultisampleRenderTarget(ne),R.updateRenderTargetMipmap(ne))}S.setRenderTarget(be),S.setClearColor(B,W),Ie!==void 0&&(H.viewport=Ie),S.toneMapping=we}function Ms(M,D,z){const H=D.isScene===!0?D.overrideMaterial:null;for(let U=0,ne=M.length;U<ne;U++){const de=M[U],be=de.object,we=de.geometry,Ie=H===null?de.material:H,Ne=de.group;be.layers.test(z.layers)&&Jo(be,D,z,we,Ie,Ne)}}function Jo(M,D,z,H,U,ne){M.onBeforeRender(S,D,z,H,U,ne),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),U.onBeforeRender(S,D,z,H,M,ne),U.transparent===!0&&U.side===yn&&U.forceSinglePass===!1?(U.side=Ct,U.needsUpdate=!0,S.renderBufferDirect(z,D,H,U,M,ne),U.side=Bn,U.needsUpdate=!0,S.renderBufferDirect(z,D,H,U,M,ne),U.side=yn):S.renderBufferDirect(z,D,H,U,M,ne),M.onAfterRender(S,D,z,H,U,ne)}function Es(M,D,z){D.isScene!==!0&&(D=Ye);const H=Ae.get(M),U=u.state.lights,ne=u.state.shadowsArray,de=U.state.version,be=Ee.getParameters(M,U.state,ne,D,z),we=Ee.getProgramCacheKey(be);let Ie=H.programs;H.environment=M.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(M.isMeshStandardMaterial?F:_).get(M.envMap||H.environment),H.envMapRotation=H.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,Ie===void 0&&(M.addEventListener("dispose",De),Ie=new Map,H.programs=Ie);let Ne=Ie.get(we);if(Ne!==void 0){if(H.currentProgram===Ne&&H.lightsStateVersion===de)return Zo(M,be),Ne}else be.uniforms=Ee.getUniforms(M),M.onBeforeCompile(be,S),Ne=Ee.acquireProgram(be,we),Ie.set(we,Ne),H.uniforms=be.uniforms;const Se=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Se.clippingPlanes=te.uniform),Zo(M,be),H.needsLights=bd(M),H.lightsStateVersion=de,H.needsLights&&(Se.ambientLightColor.value=U.state.ambient,Se.lightProbe.value=U.state.probe,Se.directionalLights.value=U.state.directional,Se.directionalLightShadows.value=U.state.directionalShadow,Se.spotLights.value=U.state.spot,Se.spotLightShadows.value=U.state.spotShadow,Se.rectAreaLights.value=U.state.rectArea,Se.ltc_1.value=U.state.rectAreaLTC1,Se.ltc_2.value=U.state.rectAreaLTC2,Se.pointLights.value=U.state.point,Se.pointLightShadows.value=U.state.pointShadow,Se.hemisphereLights.value=U.state.hemi,Se.directionalShadowMap.value=U.state.directionalShadowMap,Se.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Se.spotShadowMap.value=U.state.spotShadowMap,Se.spotLightMatrix.value=U.state.spotLightMatrix,Se.spotLightMap.value=U.state.spotLightMap,Se.pointShadowMap.value=U.state.pointShadowMap,Se.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=Ne,H.uniformsList=null,Ne}function Ko(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=cr.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Zo(M,D){const z=Ae.get(M);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.batchingColor=D.batchingColor,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.instancingMorph=D.instancingMorph,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function _d(M,D,z,H,U){D.isScene!==!0&&(D=Ye),R.resetTextureUnits();const ne=D.fog,de=H.isMeshStandardMaterial?D.environment:null,be=C===null?S.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:qi,we=(H.isMeshStandardMaterial?F:_).get(H.envMap||de),Ie=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ne=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Se=!!z.morphAttributes.position,Xe=!!z.morphAttributes.normal,nt=!!z.morphAttributes.color;let st=On;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(st=S.toneMapping);const At=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,je=At!==void 0?At.length:0,Te=Ae.get(H),cn=u.state.lights;if(ee===!0&&(xe===!0||M!==y)){const zt=M===y&&H.id===w;te.setState(H,M,zt)}let Je=!1;H.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==cn.state.version||Te.outputColorSpace!==be||U.isBatchedMesh&&Te.batching===!1||!U.isBatchedMesh&&Te.batching===!0||U.isBatchedMesh&&Te.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Te.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Te.instancing===!1||!U.isInstancedMesh&&Te.instancing===!0||U.isSkinnedMesh&&Te.skinning===!1||!U.isSkinnedMesh&&Te.skinning===!0||U.isInstancedMesh&&Te.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Te.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Te.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Te.instancingMorph===!1&&U.morphTexture!==null||Te.envMap!==we||H.fog===!0&&Te.fog!==ne||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==te.numPlanes||Te.numIntersection!==te.numIntersection)||Te.vertexAlphas!==Ie||Te.vertexTangents!==Ne||Te.morphTargets!==Se||Te.morphNormals!==Xe||Te.morphColors!==nt||Te.toneMapping!==st||Te.morphTargetsCount!==je)&&(Je=!0):(Je=!0,Te.__version=H.version);let qt=Te.currentProgram;Je===!0&&(qt=Es(H,D,U));let ai=!1,Pt=!1,Ji=!1;const rt=qt.getUniforms(),Qt=Te.uniforms;if(Re.useProgram(qt.program)&&(ai=!0,Pt=!0,Ji=!0),H.id!==w&&(w=H.id,Pt=!0),ai||y!==M){Re.buffers.depth.getReversed()?(ae.copy(M.projectionMatrix),Du(ae),Nu(ae),rt.setValue(O,"projectionMatrix",ae)):rt.setValue(O,"projectionMatrix",M.projectionMatrix),rt.setValue(O,"viewMatrix",M.matrixWorldInverse);const En=rt.map.cameraPosition;En!==void 0&&En.setValue(O,Me.setFromMatrixPosition(M.matrixWorld)),Ge.logarithmicDepthBuffer&&rt.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&rt.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Pt=!0,Ji=!0)}if(U.isSkinnedMesh){rt.setOptional(O,U,"bindMatrix"),rt.setOptional(O,U,"bindMatrixInverse");const zt=U.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),rt.setValue(O,"boneTexture",zt.boneTexture,R))}U.isBatchedMesh&&(rt.setOptional(O,U,"batchingTexture"),rt.setValue(O,"batchingTexture",U._matricesTexture,R),rt.setOptional(O,U,"batchingIdTexture"),rt.setValue(O,"batchingIdTexture",U._indirectTexture,R),rt.setOptional(O,U,"batchingColorTexture"),U._colorsTexture!==null&&rt.setValue(O,"batchingColorTexture",U._colorsTexture,R));const Ki=z.morphAttributes;if((Ki.position!==void 0||Ki.normal!==void 0||Ki.color!==void 0)&&Le.update(U,z,qt),(Pt||Te.receiveShadow!==U.receiveShadow)&&(Te.receiveShadow=U.receiveShadow,rt.setValue(O,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Qt.envMap.value=we,Qt.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&D.environment!==null&&(Qt.envMapIntensity.value=D.environmentIntensity),Pt&&(rt.setValue(O,"toneMappingExposure",S.toneMappingExposure),Te.needsLights&&xd(Qt,Ji),ne&&H.fog===!0&&ce.refreshFogUniforms(Qt,ne),ce.refreshMaterialUniforms(Qt,H,V,K,u.state.transmissionRenderTarget[M.id]),cr.upload(O,Ko(Te),Qt,R)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(cr.upload(O,Ko(Te),Qt,R),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&rt.setValue(O,"center",U.center),rt.setValue(O,"modelViewMatrix",U.modelViewMatrix),rt.setValue(O,"normalMatrix",U.normalMatrix),rt.setValue(O,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const zt=H.uniformsGroups;for(let En=0,Tn=zt.length;En<Tn;En++){const Qo=zt[En];k.update(Qo,qt),k.bind(Qo,qt)}}return qt}function xd(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function bd(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(M,D,z){Ae.get(M.texture).__webglTexture=D,Ae.get(M.depthTexture).__webglTexture=z;const H=Ae.get(M);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,D){const z=Ae.get(M);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,z=0){C=M,b=D,A=z;let H=!0,U=null,ne=!1,de=!1;if(M){const we=Ae.get(M);if(we.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(O.FRAMEBUFFER,null),H=!1;else if(we.__webglFramebuffer===void 0)R.setupRenderTarget(M);else if(we.__hasExternalTextures)R.rebindTextures(M,Ae.get(M.texture).__webglTexture,Ae.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Se=M.depthTexture;if(we.__boundDepthTexture!==Se){if(Se!==null&&Ae.has(Se)&&(M.width!==Se.image.width||M.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(M)}}const Ie=M.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(de=!0);const Ne=Ae.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ne[D])?U=Ne[D][z]:U=Ne[D],ne=!0):M.samples>0&&R.useMultisampledRTT(M)===!1?U=Ae.get(M).__webglMultisampledFramebuffer:Array.isArray(Ne)?U=Ne[z]:U=Ne,T.copy(M.viewport),N.copy(M.scissor),L=M.scissorTest}else T.copy(_e).multiplyScalar(V).floor(),N.copy(Pe).multiplyScalar(V).floor(),L=qe;if(Re.bindFramebuffer(O.FRAMEBUFFER,U)&&H&&Re.drawBuffers(M,U),Re.viewport(T),Re.scissor(N),Re.setScissorTest(L),ne){const we=Ae.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+D,we.__webglTexture,z)}else if(de){const we=Ae.get(M.texture),Ie=D||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,we.__webglTexture,z||0,Ie)}w=-1},this.readRenderTargetPixels=function(M,D,z,H,U,ne,de){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ae.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&de!==void 0&&(be=be[de]),be){Re.bindFramebuffer(O.FRAMEBUFFER,be);try{const we=M.texture,Ie=we.format,Ne=we.type;if(!Ge.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-H&&z>=0&&z<=M.height-U&&O.readPixels(D,z,H,U,Oe.convert(Ie),Oe.convert(Ne),ne)}finally{const we=C!==null?Ae.get(C).__webglFramebuffer:null;Re.bindFramebuffer(O.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(M,D,z,H,U,ne,de){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ae.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&de!==void 0&&(be=be[de]),be){const we=M.texture,Ie=we.format,Ne=we.type;if(!Ge.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=M.width-H&&z>=0&&z<=M.height-U){Re.bindFramebuffer(O.FRAMEBUFFER,be);const Se=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Se),O.bufferData(O.PIXEL_PACK_BUFFER,ne.byteLength,O.STREAM_READ),O.readPixels(D,z,H,U,Oe.convert(Ie),Oe.convert(Ne),0);const Xe=C!==null?Ae.get(C).__webglFramebuffer:null;Re.bindFramebuffer(O.FRAMEBUFFER,Xe);const nt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await ku(O,nt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Se),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ne),O.deleteBuffer(Se),O.deleteSync(nt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,D=null,z=0){M.isTexture!==!0&&(ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,M=arguments[1]);const H=Math.pow(2,-z),U=Math.floor(M.image.width*H),ne=Math.floor(M.image.height*H),de=D!==null?D.x:0,be=D!==null?D.y:0;R.setTexture2D(M,0),O.copyTexSubImage2D(O.TEXTURE_2D,z,0,0,de,be,U,ne),Re.unbindTexture()},this.copyTextureToTexture=function(M,D,z=null,H=null,U=0){M.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,M=arguments[1],D=arguments[2],U=arguments[3]||0,z=null);let ne,de,be,we,Ie,Ne,Se,Xe,nt;const st=M.isCompressedTexture?M.mipmaps[U]:M.image;z!==null?(ne=z.max.x-z.min.x,de=z.max.y-z.min.y,be=z.isBox3?z.max.z-z.min.z:1,we=z.min.x,Ie=z.min.y,Ne=z.isBox3?z.min.z:0):(ne=st.width,de=st.height,be=st.depth||1,we=0,Ie=0,Ne=0),H!==null?(Se=H.x,Xe=H.y,nt=H.z):(Se=0,Xe=0,nt=0);const At=Oe.convert(D.format),je=Oe.convert(D.type);let Te;D.isData3DTexture?(R.setTexture3D(D,0),Te=O.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(R.setTexture2DArray(D,0),Te=O.TEXTURE_2D_ARRAY):(R.setTexture2D(D,0),Te=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,D.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,D.unpackAlignment);const cn=O.getParameter(O.UNPACK_ROW_LENGTH),Je=O.getParameter(O.UNPACK_IMAGE_HEIGHT),qt=O.getParameter(O.UNPACK_SKIP_PIXELS),ai=O.getParameter(O.UNPACK_SKIP_ROWS),Pt=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,st.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,we),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ie),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ne);const Ji=M.isDataArrayTexture||M.isData3DTexture,rt=D.isDataArrayTexture||D.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const Qt=Ae.get(M),Ki=Ae.get(D),zt=Ae.get(Qt.__renderTarget),En=Ae.get(Ki.__renderTarget);Re.bindFramebuffer(O.READ_FRAMEBUFFER,zt.__webglFramebuffer),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,En.__webglFramebuffer);for(let Tn=0;Tn<be;Tn++)Ji&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ae.get(M).__webglTexture,U,Ne+Tn),M.isDepthTexture?(rt&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ae.get(D).__webglTexture,U,nt+Tn),O.blitFramebuffer(we,Ie,ne,de,Se,Xe,ne,de,O.DEPTH_BUFFER_BIT,O.NEAREST)):rt?O.copyTexSubImage3D(Te,U,Se,Xe,nt+Tn,we,Ie,ne,de):O.copyTexSubImage2D(Te,U,Se,Xe,nt+Tn,we,Ie,ne,de);Re.bindFramebuffer(O.READ_FRAMEBUFFER,null),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else rt?M.isDataTexture||M.isData3DTexture?O.texSubImage3D(Te,U,Se,Xe,nt,ne,de,be,At,je,st.data):D.isCompressedArrayTexture?O.compressedTexSubImage3D(Te,U,Se,Xe,nt,ne,de,be,At,st.data):O.texSubImage3D(Te,U,Se,Xe,nt,ne,de,be,At,je,st):M.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,U,Se,Xe,ne,de,At,je,st.data):M.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,U,Se,Xe,st.width,st.height,At,st.data):O.texSubImage2D(O.TEXTURE_2D,U,Se,Xe,ne,de,At,je,st);O.pixelStorei(O.UNPACK_ROW_LENGTH,cn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Je),O.pixelStorei(O.UNPACK_SKIP_PIXELS,qt),O.pixelStorei(O.UNPACK_SKIP_ROWS,ai),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Pt),U===0&&D.generateMipmaps&&O.generateMipmap(Te),Re.unbindTexture()},this.copyTextureToTexture3D=function(M,D,z=null,H=null,U=0){return M.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,M=arguments[2],D=arguments[3],U=arguments[4]||0),ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,D,z,H,U)},this.initRenderTarget=function(M){Ae.get(M).__webglFramebuffer===void 0&&R.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?R.setTextureCube(M,0):M.isData3DTexture?R.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?R.setTexture2DArray(M,0):R.setTexture2D(M,0),Re.unbindTexture()},this.resetState=function(){b=0,A=0,C=null,Re.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}class pr{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Be(e),this.near=t,this.far=i}clone(){return new pr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xv extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Yv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=go,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Et=new P;class mr{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=nn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Qe(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),i=Qe(i,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new mr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class fs extends Yi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let bi;const is=new P,wi=new P,Si=new P,Mi=new pe,ss=new pe,Vh=new ot,Ys=new P,rs=new P,js=new P,Ql=new pe,la=new pe,ec=new pe;class Ei extends vt{constructor(e=new fs){if(super(),this.isSprite=!0,this.type="Sprite",bi===void 0){bi=new an;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Yv(t,5);bi.setIndex([0,1,2,0,2,3]),bi.setAttribute("position",new mr(i,3,0,!1)),bi.setAttribute("uv",new mr(i,2,3,!1))}this.geometry=bi,this.material=e,this.center=new pe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),wi.setFromMatrixScale(this.matrixWorld),Vh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Si.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&wi.multiplyScalar(-Si.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Js(Ys.set(-.5,-.5,0),Si,o,wi,s,r),Js(rs.set(.5,-.5,0),Si,o,wi,s,r),Js(js.set(.5,.5,0),Si,o,wi,s,r),Ql.set(0,0),la.set(1,0),ec.set(1,1);let a=e.ray.intersectTriangle(Ys,rs,js,!1,is);if(a===null&&(Js(rs.set(-.5,.5,0),Si,o,wi,s,r),la.set(0,1),a=e.ray.intersectTriangle(Ys,js,rs,!1,is),a===null))return;const l=e.ray.origin.distanceTo(is);l<e.near||l>e.far||t.push({distance:l,point:is.clone(),uv:$t.getInterpolation(is,Ys,rs,js,Ql,la,ec,new pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Js(n,e,t,i,s,r){Mi.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(ss.x=r*Mi.x-s*Mi.y,ss.y=s*Mi.x+r*Mi.y):ss.copy(Mi),n.copy(e),n.x+=ss.x,n.y+=ss.y,n.applyMatrix4(Vh)}class tc extends Mt{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class on{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const d=i[s],f=i[s+1]-d,p=(o-d)/f;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new pe:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new P,s=[],r=[],o=[],a=new P,l=new ot;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);d<=c&&(c=d,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(yt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(yt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Fo extends on{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new pe){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*d-p*h+this.aX,c=f*h+p*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class jv extends Fo{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Bo(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,d,h){let f=(o-r)/c-(a-r)/(c+d)+(a-o)/d,p=(a-o)/d-(l-o)/(d+h)+(l-a)/h;f*=d,p*=d,s(o,a,f,p)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const Ks=new P,ca=new Bo,ha=new Bo,da=new Bo;class Jv extends on{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new P){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,d;this.closed||a>0?c=s[(a-1)%r]:(Ks.subVectors(s[0],s[1]).add(s[0]),c=Ks);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(Ks.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=Ks),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),p),v=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(d),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),ca.initNonuniformCatmullRom(c.x,h.x,f.x,d.x,g,v,m),ha.initNonuniformCatmullRom(c.y,h.y,f.y,d.y,g,v,m),da.initNonuniformCatmullRom(c.z,h.z,f.z,d.z,g,v,m)}else this.curveType==="catmullrom"&&(ca.initCatmullRom(c.x,h.x,f.x,d.x,this.tension),ha.initCatmullRom(c.y,h.y,f.y,d.y,this.tension),da.initCatmullRom(c.z,h.z,f.z,d.z,this.tension));return i.set(ca.calc(l),ha.calc(l),da.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function nc(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function Kv(n,e){const t=1-n;return t*t*e}function Zv(n,e){return 2*(1-n)*n*e}function Qv(n,e){return n*n*e}function gs(n,e,t,i){return Kv(n,e)+Zv(n,t)+Qv(n,i)}function e0(n,e){const t=1-n;return t*t*t*e}function t0(n,e){const t=1-n;return 3*t*t*n*e}function n0(n,e){return 3*(1-n)*n*n*e}function i0(n,e){return n*n*n*e}function vs(n,e,t,i,s){return e0(n,e)+t0(n,t)+n0(n,i)+i0(n,s)}class $h extends on{constructor(e=new pe,t=new pe,i=new pe,s=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new pe){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(vs(e,s.x,r.x,o.x,a.x),vs(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class s0 extends on{constructor(e=new P,t=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new P){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(vs(e,s.x,r.x,o.x,a.x),vs(e,s.y,r.y,o.y,a.y),vs(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Wh extends on{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class r0 extends on{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qh extends on{constructor(e=new pe,t=new pe,i=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new pe){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(gs(e,s.x,r.x,o.x),gs(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class a0 extends on{constructor(e=new P,t=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new P){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(gs(e,s.x,r.x,o.x),gs(e,s.y,r.y,o.y),gs(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xh extends on{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],d=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(nc(a,l.x,c.x,d.x,h.x),nc(a,l.y,c.y,d.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new pe().fromArray(s))}return this}}var ic=Object.freeze({__proto__:null,ArcCurve:jv,CatmullRomCurve3:Jv,CubicBezierCurve:$h,CubicBezierCurve3:s0,EllipseCurve:Fo,LineCurve:Wh,LineCurve3:r0,QuadraticBezierCurve:qh,QuadraticBezierCurve3:a0,SplineCurve:Xh});class o0 extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ic[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new ic[s.type]().fromJSON(s))}return this}}class l0 extends o0{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Wh(this.currentPoint.clone(),new pe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new qh(this.currentPoint.clone(),new pe(e,t),new pe(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){const a=new $h(this.currentPoint.clone(),new pe(e,t),new pe(i,s),new pe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Xh(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){const c=new Fo(e,t,i,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zo extends an{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=yt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],d=1/t,h=new P,f=new pe,p=new P,g=new P,v=new P;let m=0,u=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,u=e[x+1].y-e[x].y,p.x=u*1,p.y=-m,p.z=u*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[x+1].x-e[x].x,u=e[x+1].y-e[x].y,p.x=u*1,p.y=-m,p.z=u*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let x=0;x<=t;x++){const E=i+x*d*s,S=Math.sin(E),I=Math.cos(E);for(let b=0;b<=e.length-1;b++){h.x=e[b].x*S,h.y=e[b].y,h.z=e[b].x*I,o.push(h.x,h.y,h.z),f.x=x/t,f.y=b/(e.length-1),a.push(f.x,f.y);const A=l[3*b+0]*S,C=l[3*b+1],w=l[3*b+0]*I;c.push(A,C,w)}}for(let x=0;x<t;x++)for(let E=0;E<e.length-1;E++){const S=E+x*e.length,I=S,b=S+e.length,A=S+e.length+1,C=S+1;r.push(I,b,C),r.push(A,C,b)}this.setIndex(r),this.setAttribute("position",new Ot(o,3)),this.setAttribute("uv",new Ot(a,2)),this.setAttribute("normal",new Ot(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.points,e.segments,e.phiStart,e.phiLength)}}class Ho extends zo{constructor(e=1,t=1,i=4,s=8){const r=new l0;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new Ho(e.radius,e.length,e.capSegments,e.radialSegments)}}class gr extends an{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],h=[],f=[],p=[];let g=0;const v=[],m=i/2;let u=0;x(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new Ot(h,3)),this.setAttribute("normal",new Ot(f,3)),this.setAttribute("uv",new Ot(p,2));function x(){const S=new P,I=new P;let b=0;const A=(t-e)/i;for(let C=0;C<=r;C++){const w=[],y=C/r,T=y*(t-e)+e;for(let N=0;N<=s;N++){const L=N/s,B=L*l+a,W=Math.sin(B),G=Math.cos(B);I.x=T*W,I.y=-y*i+m,I.z=T*G,h.push(I.x,I.y,I.z),S.set(W,A,G).normalize(),f.push(S.x,S.y,S.z),p.push(L,1-y),w.push(g++)}v.push(w)}for(let C=0;C<s;C++)for(let w=0;w<r;w++){const y=v[w][C],T=v[w+1][C],N=v[w+1][C+1],L=v[w][C+1];(e>0||w!==0)&&(d.push(y,T,L),b+=3),(t>0||w!==r-1)&&(d.push(T,N,L),b+=3)}c.addGroup(u,b,0),u+=b}function E(S){const I=g,b=new pe,A=new P;let C=0;const w=S===!0?e:t,y=S===!0?1:-1;for(let N=1;N<=s;N++)h.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const T=g;for(let N=0;N<=s;N++){const B=N/s*l+a,W=Math.cos(B),G=Math.sin(B);A.x=w*G,A.y=m*y,A.z=w*W,h.push(A.x,A.y,A.z),f.push(0,y,0),b.x=W*.5+.5,b.y=G*.5*y+.5,p.push(b.x,b.y),g++}for(let N=0;N<s;N++){const L=I+N,B=T+N;S===!0?d.push(B,B+1,L):d.push(B+1,B,L),C+=3}c.addGroup(u,C,S===!0?1:2),u+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mn extends Yi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mh,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const sc={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class c0{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=c.length;h<f;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null}}}const h0=new c0;class Go{constructor(e){this.manager=e!==void 0?e:h0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Go.DEFAULT_MATERIAL_NAME="__DEFAULT";class d0 extends Go{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=sc.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=xs("img");function l(){d(),sc.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){d(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class rc extends Go{constructor(e){super(e)}load(e,t,i,s){const r=new Mt,o=new d0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class Rr extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class u0 extends Rr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ua=new ot,ac=new P,oc=new P;class Yh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new No,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ac.setFromMatrixPosition(e.matrixWorld),t.position.copy(ac),oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(oc),t.updateMatrixWorld(),ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ua),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const lc=new ot,as=new P,fa=new P;class f0 extends Yh{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pe(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),as.setFromMatrixPosition(e.matrixWorld),i.position.copy(as),fa.copy(i.position),fa.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(fa),i.updateMatrixWorld(),s.makeTranslation(-as.x,-as.y,-as.z),lc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lc)}}class p0 extends Rr{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new f0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class m0 extends Yh{constructor(){super(new Uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class g0 extends Rr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new m0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class v0 extends Rr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class y0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=cc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=cc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function cc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ao}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ao);const os={url:new URL(""+new URL("tiny-dungeon-BMWnvaym.png",import.meta.url).href,import.meta.url).href,cols:12,rows:11},hc={fighter:{col:0,row:8},cleric:{col:2,row:7},wizard:{col:0,row:7},rogue:{col:4,row:9},alchemist:{col:4,row:7}},jh={"rat-swarm":{col:3,row:10},skeleton:{col:4,row:10},"goblin-gang":{col:1,row:7},gelatinous:{col:0,row:9},wraith:{col:1,row:10},"dragon-whelp":{col:2,row:9},"ogre-king":{col:1,row:9},"bone-warden":{col:4,row:10},"grave-mites":{col:2,row:10},"barrow-shade":{col:1,row:10},"hungry-ghoul":{col:1,row:9},"shrouded-king":{col:3,row:9},"abbot-of-worms":{col:1,row:10},salamander:{col:2,row:9},"cinder-bats":{col:0,row:10},"magma-toad":{col:0,row:9},"obsidian-golem":{col:4,row:10},"cinder-wyrm":{col:2,row:9},"forge-tyrant":{col:1,row:9},"flying-tomes":{col:0,row:10},"ink-elemental":{col:0,row:9},"spectral-scribe":{col:1,row:10},"index-wight":{col:3,row:9},archivist:{col:3,row:9},"grand-errata":{col:4,row:10},"sludge-elemental":{col:0,row:9},"potion-rats":{col:3,row:10},"mutant-vine":{col:2,row:10},"failed-homunculus":{col:1,row:9},"mad-alchemist":{col:3,row:9},"the-precipitate":{col:0,row:9},"castle-thrall":{col:1,row:7},"bat-cloud":{col:0,row:10},"pale-hound":{col:4,row:10},"crimson-mist":{col:1,row:10},"vampire-lord":{col:3,row:9},"the-bride":{col:3,row:8},"jar-imp":{col:2,row:9},"pickled-thing":{col:0,row:9},"root-golem":{col:4,row:10},"bog-toad":{col:0,row:9},"bog-witch":{col:4,row:8},"the-cauldron":{col:1,row:9},"frost-wisp":{col:1,row:10},"ice-crawler":{col:2,row:10},"thawed-dead":{col:1,row:7},"cinder-imp":{col:2,row:9},"mad-pyromancer":{col:0,row:7},"glacier-heart":{col:4,row:10}},_0={col:1,row:9},Ti={treasure:{col:5,row:7},"treasure-open":{col:7,row:7},vault:{col:6,row:7},mimic:{col:8,row:7},trap:{col:4,row:3},library:{col:5,row:5},shrine:{col:4,row:2},lab:{col:8,row:3},materials:{col:6,row:5},entrance:{col:10,row:3}},x0={pillars:{col:6,row:0},rubble:{col:0,row:1},crates:{col:1,row:6},brazier:{col:5,row:2},pit:{col:9,row:0},boulder:{col:6,row:8},sarcophagus:{col:6,row:4},font:{col:8,row:2},spout:{col:8,row:1},portcullis:{col:5,row:3},anvil:{col:2,row:6},shelves:{col:3,row:6},mirror:{col:5,row:8}};function b0(n){return x0[n]||null}const w0={slash:{col:2,row:5}};function S0(n){for(const[e,t]of Object.entries(n))jh[e]=t}function M0(n){return hc[n]||hc.fighter}function E0(n){return jh[n]||_0}function dc(n){return n.type==="treasure"?n.cleared?Ti["treasure-open"]:Ti.treasure:n.type==="vault"?n.cleared?Ti["treasure-open"]:Ti.vault:Ti[n.type]?Ti[n.type]:null}const Jh={pillars:{id:"pillars",name:"a row of squat pillars",icon:"🏛️",tile:{col:6,row:0},rooms:["monster","boss","corridor","library","shrine"],weight:3,tags:["cover"],cover:1,tell:"Pillars break the room into aisles — something to fight behind."},rubble:{id:"rubble",name:"a fall of rubble",icon:"🪨",tile:{col:0,row:1},rooms:["monster","corridor","disaster","trap"],weight:3,tags:["cover"],cover:1,tell:"Half the ceiling is on the floor, in pieces worth stepping around."},crates:{id:"crates",name:"stacked crates and barrels",icon:"📦",tile:{col:1,row:6},rooms:["treasure","corridor","monster"],weight:2.5,tags:["cover","loot"],cover:1,tell:"Somebody stacked supplies here and never came back for them."},brazier:{id:"brazier",name:"a brazier still burning",icon:"🔥",tile:{col:5,row:2},rooms:["monster","boss","shrine","library"],weight:2.5,tags:["fire","light"],tell:"A brazier burns in its bracket — nobody has been here to feed it, and it burns anyway."},pit:{id:"pit",name:"an open pit",icon:"🕳️",tile:{col:9,row:0},rooms:["monster","boss","trap","corridor","disaster"],weight:2,tags:["hazard"],tell:"A pit takes up a third of the floor. The bottom is not visible."},boulder:{id:"boulder",name:"a boulder on a bad slope",icon:"⚪",tile:{col:6,row:8},rooms:["monster","corridor","disaster"],weight:1.5,tags:["hazard"],tell:"A boulder sits at the top of a slope, held by a wedge of rotten timber."},sarcophagus:{id:"sarcophagus",name:"a stone sarcophagus",icon:"⚰️",tile:{col:6,row:4},rooms:["monster","shrine","treasure","vault","boss"],weight:2,tags:["undead","loot"],undeadRisk:!0,tell:"A sarcophagus stands against the wall with its lid slightly wrong."},font:{id:"font",name:"a stone font of still water",icon:"⛲",tile:{col:8,row:2},rooms:["shrine","monster","corridor","library"],weight:2,tags:["water"],douse:!0,tell:"A font holds water that has been still a long time and is somehow clean."},spout:{id:"spout",name:"a gargoyle spout, dripping",icon:"🗿",tile:{col:8,row:1},rooms:["corridor","monster"],weight:1.8,tags:["alchemy"],tell:"A gargoyle spout drips something that is not water into a stained channel."},portcullis:{id:"portcullis",name:"a raised portcullis",icon:"🚧",tile:{col:5,row:3},rooms:["monster","boss","corridor","vault"],weight:1.8,tags:["mechanism"],tell:"A portcullis hangs raised above the passage, on a chain that still turns."},anvil:{id:"anvil",name:"a cold anvil",icon:"🔨",tile:{col:2,row:6},rooms:["corridor","monster"],weight:1.5,tags:["forge"],tell:"An anvil sits under a dead forge, still true."},shelves:{id:"shelves",name:"sagging shelves",icon:"📚",tile:{col:3,row:6},rooms:["library","vault","monster"],weight:2,tags:["study","flammable"],tell:"Shelves sag under books nobody has audited in a century."},spikes:{id:"spikes",name:"a bed of rusted floor spikes",icon:"🔻",rooms:["monster","boss","trap","corridor"],weight:2,tags:["hazard","sharp"],tell:"A bed of rusted spikes stands out of the floor, most of them still upright."},chasm:{id:"chasm",name:"a crack across the floor",icon:"🌑",rooms:["monster","boss","disaster","corridor"],weight:1.4,tags:["hazard","deep"],tell:"A crack runs the width of the room, wide enough to matter and too wide to jump twice."},mirror:{id:"mirror",name:"a tall silvered mirror",icon:"🪞",tile:{col:5,row:8},rooms:["monster","boss","treasure","shrine"],weight:1.2,tags:["reveal"],revealEthereal:!0,tell:"A silvered mirror leans against the wall, and it shows the room more honestly than the room does."}},Hn={"shove-into-pit":{feature:"pit",name:"Shove It In",desc:"Put the pit between you and it",gates:[{cls:X.FIGHTER},{item:"eq-grapple"}],fightOnly:!0,openerDamage:11,tool:{openerDamage:18},weights:{reckless:3,brave:2,cunning:2}},"shove-onto-spikes":{feature:"spikes",name:"Put It On the Spikes",desc:"The floor is already armed",gates:[{cls:X.FIGHTER},{item:"eq-tower-shield"}],fightOnly:!0,openerDamage:12,tool:{openerDamage:19},weights:{reckless:3,brave:2,cunning:1.5}},"shove-into-chasm":{feature:"chasm",name:"Put It In the Crack",desc:"The floor already opened once",gates:[{cls:X.FIGHTER},{item:"eq-grapple"}],fightOnly:!0,openerDamage:13,tool:{openerDamage:21},weights:{reckless:3,cunning:2,craven:1.5}},"topple-boulder":{feature:"boulder",name:"Topple the Boulder",desc:"Gravity does the first round",gates:[{cls:X.FIGHTER},{spell:"sp-shatter"}],fightOnly:!0,openerDamage:5,tool:{openerDamage:13},weights:{reckless:3,brave:1.5}},"shove-into-brazier":{feature:"brazier",name:"Shove It Into the Fire",desc:"The brazier is right there",gates:[{cls:X.FIGHTER},{item:"eq-athanor-charm"}],fightOnly:!0,openerDamage:10,element:"fire",tool:{openerDamage:16},weights:{reckless:2.5,cunning:1}},"drop-portcullis":{feature:"portcullis",name:"Drop the Portcullis",desc:"Cut the room in half on top of it",gates:[{cls:X.ROGUE},{item:"eq-grapple"}],fightOnly:!0,openerDamage:6,tool:{openerDamage:14},weights:{cunning:3,craven:2,scholarly:1}},"fight-from-cover":{feature:"pillars",name:"Fight From the Pillars",desc:"Make it come to you, one aisle at a time",gates:[{cls:X.ROGUE},{cls:X.FIGHTER},{item:"eq-tower-shield"}],fightOnly:!0,openerDamage:3,extraCover:1,tool:{openerDamage:4,extraCover:3},weights:{cunning:2,craven:2.5,brave:-1}},"pry-sarcophagus":{feature:"sarcophagus",name:"Pry the Lid",desc:"Grave goods, and whatever else",gates:[{cls:X.ROGUE},{item:"eq-greatsword"}],gold:20,wakesDead:!0,tool:{gold:55,quiet:!0},weights:{greedy:3.5,reckless:2,pious:-3}},"bless-the-font":{feature:"font",name:"Bless the Font",desc:"Clean water, said over",gates:[{cls:X.CLERIC},{spell:"sp-purify"}],heal:5,tool:{heal:12},weights:{pious:3.5,scholarly:1}},"fill-waterskins":{feature:"font",name:"Fill the Waterskins",desc:"Cold water, and a wash for the wounds",gates:[{cls:X.CLERIC},{cls:X.ALCHEMIST},{spell:"sp-purify"}],heal:3,curesLinger:!0,weights:{cunning:2,craven:1.5}},"harvest-spout":{feature:"spout",name:"Harvest the Drip",desc:"Whatever that is, it is a reagent",gates:[{cls:X.ALCHEMIST},{item:"eq-alembic"}],gold:8,tool:{gold:20},weights:{greedy:2,scholarly:2}},"sift-rubble":{feature:"rubble",name:"Sift the Rubble",desc:"Salts and oddments in the broken stone",gates:[{cls:X.ALCHEMIST},{item:"eq-grapple"}],gold:13,tool:{gold:40},weights:{greedy:2.5,scholarly:1}},"crack-crates":{feature:"crates",name:"Crack the Crates",desc:"Somebody else's supplies",gates:[{cls:X.ROGUE},{item:"eq-lockpicks"}],gold:20,tool:{gold:55},weights:{greedy:3.5,reckless:1}},"work-the-anvil":{feature:"anvil",name:"Work the Anvil",desc:"Put an edge back on something",gates:[{cls:X.FIGHTER},{cls:X.ALCHEMIST},{item:"eq-athanor-charm"}],weaponMod:{name:"anvil-set edge",attack:3},weights:{brave:2,cunning:1.5,scholarly:1}},"strip-the-shelves":{feature:"shelves",name:"Strip the Shelves",desc:"A working, if the damp left one",gates:[{cls:X.WIZARD},{item:"eq-grimoire"}],spell:{name:"Shelf-Found Working",icon:"📜",school:"found",power:3,use:"combat"},tool:{spell:{name:"Shelf-Found Working",icon:"📜",school:"found",power:5,use:"combat"},extraSpell:!0},weights:{scholarly:3.5,greedy:1}}};function T0(n){const e=(n.w||4)*(n.h||4);return e<18?0:e<32?1:e<56?2:e<90?3:e<140?4:5}function uc(n,e,t=null){const i=T0(n);if(i===0)return[];const s=Object.values(Jh).filter(o=>o.rooms.includes(n.type));if(s.length===0)return[];const r=[];for(let o=0;o<i;o++){if(e.next()<.32)continue;const a=s.filter(d=>!r.includes(d.id));if(a.length===0)break;const l=a.reduce((d,h)=>d+h.weight,0);let c=e.next()*l;for(const d of a)if(c-=d.weight,c<=0){r.push(d.id);break}}return r}function Cr(n){return Jh[n]||null}function Lr(n){return((n==null?void 0:n.features)||[]).map(Cr).filter(Boolean)}function A0(n){const e={cover:0,douse:!1,revealEthereal:!1,undeadRisk:!1,notes:[]};for(const t of Lr(n))t.cover&&(e.cover+=t.cover,e.notes.push({feature:t.id,text:`🧱 The party fights from behind ${t.name}: ${t.cover} less damage per round.`})),t.douse&&(e.douse=!0),t.revealEthereal&&(e.revealEthereal=!0,e.notes.push({feature:t.id,text:`🪞 ${I0(t.name)} shows the ethereal where it truly stands: weapons do full damage.`})),t.undeadRisk&&(e.undeadRisk=!0);return e.cover=Math.min(e.cover,2),e}function _o(n,e,t){var i;return n.cls?e.hasClass(n.cls):n.item?t.item(n.item):n.spell?t.spell(n.spell):n.tactic?!!((i=t.tactic)!=null&&i.call(t,n.tactic)):!1}function R0(n,e,t){const i=new Set((n==null?void 0:n.features)||[]),s=(n==null?void 0:n.type)==="monster"||(n==null?void 0:n.type)==="boss",r=[];for(const[o,a]of Object.entries(Hn)){if(!i.has(a.feature)||a.fightOnly&&!s||!a.gates.some(c=>_o(c,e,t)))continue;const l=a.gates.find(c=>_o(c,e,t));r.push({id:o,name:a.name,desc:a.desc,feature:a.feature,opener:l.item||l.spell||l.cls})}return r}function C0(n,e,t){const i=Hn[n];if(!i)return null;const s=i.gates.some(r=>(r.item||r.spell)&&_o(r,e,t));return s&&i.tool?{...i,...i.tool,tier:"tool"}:{...i,tier:s?"tool":"class"}}function L0(n){var e;return((e=Hn[n])==null?void 0:e.weights)||null}function P0(n){return Object.prototype.hasOwnProperty.call(Hn,n)}function I0(n){return n&&n.charAt(0).toUpperCase()+n.slice(1)}const vr=1,k0=1.8;function Jt(n){return{hx:(n.w||4)*vr/2,hz:(n.h||4)*vr/2}}function Vo(n){const{hx:e,hz:t}=Jt(n);return e>=t?{axis:"x",far:e,wide:t}:{axis:"z",far:t,wide:e}}function fc(n,e=0,t=0){const{axis:i,far:s}=Vo(n),r=Math.max(.8,s*.45);return i==="x"?{mx:e+r,mz:t}:{mx:e,mz:t+r}}const D0={column:1,line:2,shieldwall:2,wedge:3,loose:2};function N0(n,e,t,i,s,r="line"){const{axis:o,far:a,wide:l}=Vo(n),c=s?-Math.max(.7,a*.42):-Math.max(.2,a*.12),d=Math.min(i,D0[r]??2),h=r==="loose"?1.6:r==="shieldwall"?.7:1,f=Math.min(1.25,Math.max(.75,l*.45))*h,p=Math.min(1.3,Math.max(.8,l*.7))*h,g=[];for(let v=0;v<i;v++){const m=v<d?0:1,u=m===0?v:v-d,x=m===0?d:i-d,E=(u-(x-1)/2)*p,S=c+m*-f;g.push(o==="x"?{mx:e+S,mz:t+E}:{mx:e+E,mz:t+S})}return g}function U0(n,e){if(e===0)return[[-n/2,n/2]];const t=k0/2,i=[];return-n/2<-t&&i.push([-n/2,-t]),t<n/2&&i.push([t,n/2]),i}function O0(n,e=0,t=0,i=0){if(i<=0)return[];const{hx:s,hz:r}=Jt(n),{axis:o}=Vo(n),a=.9,l=Math.max(.6,(o==="x"?r:s)-a),c=Math.max(.6,(o==="x"?s:r)-a),d=o==="x"?(f,p)=>({mx:e+c*f,mz:t+l*p}):(f,p)=>({mx:e+l*p,mz:t+c*f}),h=[d(-.15,-1),d(-.15,1),d(-.85,-.95),d(-.85,.95),d(.5,-1),d(.5,1),d(.9,-.5),d(.9,.5)];return h.slice(0,Math.min(i,h.length))}function F0(n,e,t=()=>!1){const i=new Map,s=(r,o,a)=>{i.has(r)||i.set(r,[]),i.get(r).push({side:o,secret:a})};for(const r of e){if(r.kind==="trapdoor")continue;const o=n[r.a],a=n[r.b];if(!o||!a||t(o)||t(a))continue;const l=a.x-o.x,c=a.y-o.y;Math.abs(l)>=Math.abs(c)?(s(r.a,l>0?"east":"west",r.secret),s(r.b,l>0?"west":"east",r.secret)):(s(r.a,c>0?"south":"north",r.secret),s(r.b,c>0?"north":"south",r.secret))}return i}const pa=7,Zs=26,ls=1.15,pc=.28,mc=1.7,B0=7,gc={fighter:13126716,cleric:15258762,wizard:8018664,rogue:4885084,alchemist:3979432},Kh={delve:{plat:6380370,wall:3486252,bg:657413,boss:5908006},crypt:{plat:5130838,wall:2894387,bg:460297,boss:4860490},volcanic:{plat:6045752,wall:3350812,bg:853251,boss:8006170},library:{plat:4147800,wall:2305080,bg:263947,boss:2767450},madlab:{plat:4479050,wall:2372906,bg:264196,boss:2775610},castle:{plat:4078158,wall:2104620,bg:328713,boss:5904938},bogcellar:{plat:4868660,wall:2763292,bg:395011,boss:4872730},icecaverns:{plat:4872806,wall:2766400,bg:263945,boss:3824234},athanor:{plat:5917240,wall:3352860,bg:657155,boss:6965786}},z0=Kh.delve,vc={armored:"🛡️",ethereal:"👻",venomous:"🐍",swarm:"🐝",slow:"🐌"},yc={fire:"🔥",frost:"❄️",shock:"⚡",holy:"🌟"},_c={fire:"#ff8a3c",frost:"#7ec8ff",shock:"#ffe95e",holy:"#ffe9a0"},H0={fight:{kind:"slash"},"spell-strike":{kind:"glow",color:"#ff8a3c"},"turn-undead":{kind:"glow",color:"#ffe9a0"},"deep-study":{kind:"glow",color:"#b07ae8"},"spell-bypass":{kind:"glow",color:"#b07ae8"},rest:{kind:"glow",color:"#ffe9a0"},alchemy:{kind:"glow",color:"#3cb8a8"},disarm:{kind:"glow",color:"#8fb8dd"},"push-through":{kind:"glow",color:"#e05555"},brace:{kind:"glow",color:"#e05555"},scatter:{kind:"glow",color:"#e05555"},loot:{kind:"glow",color:"#ffd75e"},desecrate:{kind:"glow",color:"#ffd75e"}};class G0{constructor(e){this.canvas=document.getElementById(e),this.renderer=new qv({canvas:this.canvas,antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=dh,this.scene=new Xv,this.scene.background=new Be(657413),this.scene.fog=new pr(657413,34,78),this.scene.add(new v0(11187408,1.1)),this.scene.add(new u0(9083578,3813416,.9));const t=new g0(11189213,1.3);t.position.set(-10,20,6),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-30,t.shadow.camera.right=30,t.shadow.camera.top=30,t.shadow.camera.bottom=-30,this.scene.add(t),this.torch=new p0(16751164,30,12,1.8),this.torch.position.set(0,2.2,0),this.scene.add(this.torch),this.staticGroup=new _n,this.iconGroup=new _n,this.occupantGroup=new _n,this.partyGroup=new _n,this.fxGroup=new _n,this.scene.add(this.staticGroup,this.iconGroup,this.occupantGroup,this.partyGroup,this.fxGroup),this.spriteMaterials=new Map,this.builtKey=null,this.roomPositions=[],this.clock=new y0,this.effects=[],this.tileMats=new Map,this.atlasReady=!1,this.atlasTex=new rc().load(os.url,()=>{this.atlasReady=!0,this.lastState&&this.render(this.lastState)}),this.atlasTex.magFilter=Ut,this.atlasTex.minFilter=Ut,this.atlasTex.colorSpace=St,this.meepleGeo=new Ho(.16,.26,4,10),this.meepleMats={};for(const[s,r]of Object.entries(gc))this.meepleMats[s]=new mn({color:r,roughness:.6});this.baseGeo=new gr(.24,.28,.07,16),this.baseMats={};for(const[s,r]of Object.entries(gc))this.baseMats[s]=new mn({color:r,roughness:.7});this.disposed=!1;const i=()=>{this.disposed||(requestAnimationFrame(i),this.animateFrame())};i(),typeof window<"u"&&(window.__iso=this)}render(e){var o;this.lastState=e;const t=e.dungeon.rooms;this.resize(t);const i=((o=e.dungeon.theme)==null?void 0:o.id)||"delve",s=i+"|"+t.map(a=>`${a.type}${a.w}x${a.h}${a.shape}${a.secret&&!a.discovered?"?":""}`).join(",");this.builtKey!==s&&(this.buildDungeon(t,e.dungeon.edges,i,e.dungeon.trapdoors||[]),this.builtKey=s),this.updateIcons(e),this.updateOccupants(e),this.updateParty(e);const r=e.currentRoomIndex??Math.min(e.roomIndex,t.length-1);this.focusOn(t[r]),this.animateFrame()}tileMaterial(e){const t=`${e.col},${e.row}`;if(!this.tileMats.has(t)){const i=this.atlasTex.clone();i.needsUpdate=!0,i.repeat.set(1/os.cols,1/os.rows),i.offset.set(e.col/os.cols,1-(e.row+1)/os.rows),this.tileMats.set(t,new fs({map:i,transparent:!0}))}return this.tileMats.get(t)}imageMaterial(e){const t=`img:${e}`;if(!this.tileMats.has(t)){const i=new rc().load(e,()=>{this.lastState&&this.render(this.lastState)});i.colorSpace=St,this.tileMats.set(t,new fs({map:i,transparent:!0}))}return this.tileMats.get(t)}tileSprite(e,t=1){var s;if(e.img){const r=this.imageMaterial(e.img),o=new Ei(r),a=(s=r.map)==null?void 0:s.image,l=a&&a.width?a.width/a.height:1;return o.scale.set(t*Math.min(l,1.4),t,1),o}const i=new Ei(this.tileMaterial(e));return i.scale.set(t,t,1),i}updateOccupants(e){if(this.occupantGroup.clear(),!this.atlasReady)return;const t=e.dungeon.rooms,i=this.knownSet(e);t.forEach((s,r)=>{if(s.secret&&!s.discovered)return;const{x:o,y:a,z:l}=this.roomPositions[r];if(!(i.has(r)||s.type==="boss"))return;let d=null;if((s.type==="monster"||s.type==="boss")&&s.monster&&!s.cleared){const p=s.type==="boss"?1.7:1.05,{mx:g,mz:v}=fc(s,o,l);d=this.tileSprite(E0(s.monster.kind),p),d.position.set(g,a+.2+p/2,v),d.userData.sway=!0;const m=[];vc[s.monster.trait]&&m.push(vc[s.monster.trait]);const u=s.monster.undead?"holy":(s.monster.weak||[])[0];yc[u]&&m.push(yc[u]),m.forEach((x,E)=>{const S=new Ei(this.getSpriteMaterial(x));S.scale.set(.42,.42,1),S.position.set(g-.25+E*.5,a+.35+p,v),S.userData.baseY=a+.35+p,S.userData.phase=r*1.3+E,S.userData.sway=!0,this.occupantGroup.add(S)})}else{const p=dc(s);if(p){const{mx:g,mz:v}=fc(s,o,l);d=this.tileSprite(p,.95),d.position.set(g,a+.66,v),s.cleared&&(d.material=d.material.clone(),d.material.opacity=.55)}}d&&(d.userData.baseY=d.position.y,d.userData.phase=r*2.3,this.occupantGroup.add(d));const h=s.features||[],f=O0(s,o,l,h.length);h.forEach((p,g)=>{var x;const v=b0(p),m=f[g];if(!m)return;const u=v?this.tileSprite(v,.8):this.emojiSprite(((x=Cr(p))==null?void 0:x.icon)||"❔",.7);u.position.set(m.mx,a+.58,m.mz),u.userData.baseY=a+.58,u.userData.phase=r*1.1+g,p==="brazier"&&(u.userData.sway=!0),this.occupantGroup.add(u)})})}emojiSprite(e,t=.8){const i=new Ei(this.getSpriteMaterial(e));return i.scale.set(t,t,1),i}roomWorldPos(e){return{x:e.x*vr,y:-(e.floor||0)*B0,z:e.y*vr}}bounds(e){let t=1/0,i=-1/0,s=1/0,r=-1/0;for(const o of e){const{x:a,z:l}=this.roomWorldPos(o),{hx:c,hz:d}=Jt(o);t=Math.min(t,a-c),i=Math.max(i,a+c),s=Math.min(s,l-d),r=Math.max(r,l+d)}return{minX:t,maxX:i,minZ:s,maxZ:r,cx:(t+i)/2,cz:(s+r)/2}}resize(e){const t=this.canvas.clientWidth||500,i=this.canvas.clientHeight||420;if(this.lastW===t&&this.lastH===i&&this.camera)return;this.lastW=t,this.lastH=i,this.renderer.setSize(t,i,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));const s=t/i,r=pa;this.camera=new Uo(-r*s,r*s,r,-r,.1,400),this.camera.position.set(Zs,Zs*1.05,Zs),this.camera.lookAt(0,0,0),this.camTarget=new P(0,0,0)}focusOn(e){if(!e||!this.camera)return;const{x:t,y:i,z:s}=this.roomWorldPos(e),{hx:r,hz:o}=Jt(e),a=Math.max(0,Math.max(r,o)+2.2-pa);this.camTarget||(this.camTarget=new P(t,i,s)),this.camTarget.set(t,i,s),this.camZoom=a}buildDungeon(e,t=null,i="delve",s=[]){this.staticGroup.clear(),this.roomPositions=e.map(h=>this.roomWorldPos(h));const r=Kh[i]||z0;this.palette=r,this.scene.background=new Be(r.bg),this.scene.fog=new pr(r.bg,34,78);const o=h=>h.secret&&!h.discovered,a=t||e.slice(1).map((h,f)=>({a:f,b:f+1,kind:"door"})),l=F0(e,a,o),c=new mn({color:r.wall,roughness:1}),d=new mn({color:r.wall,roughness:1});e.forEach((h,f)=>{if(o(h))return;const{x:p,y:g,z:v}=this.roomPositions[f],{hx:m,hz:u}=Jt(h),x=m*2,E=u*2,S=(h.index*7%5-2)*.02,I=h.type==="boss"?r.boss:h.type==="vault"?6969904:r.plat,b=new Be(I);b.offsetHSL(0,0,S);const A=new mn({color:b,roughness:.95});let C;if(h.shape==="rotunda"?C=new ft(new gr(Math.min(m,u),Math.min(m,u)*1.02,.35,24),A):C=new ft(new Nt(x,.35,E),A),C.position.set(p,g,v),C.receiveShadow=!0,this.staticGroup.add(C),h.shape==="cavern")for(const[w,y]of[[-1,-1],[1,-1],[-1,1],[1,1]]){if((h.index+w+y)%2!==0)continue;const T=new ft(new Nt(x*.22,.5,E*.22),new mn({color:r.wall,roughness:1}));T.position.set(p+w*(m-x*.1),g+.16,v+y*(u-E*.1)),T.rotation.y=h.index%4*.2,T.castShadow=!0,this.staticGroup.add(T)}if(h.shape!=="rotunda"){const w=[{name:"north",axis:"x",len:x,off:-u},{name:"south",axis:"x",len:x,off:u},{name:"west",axis:"z",len:E,off:-m},{name:"east",axis:"z",len:E,off:m}],y=l.get(f)||[];for(const T of w){const N=y.filter(B=>B.side===T.name),L=U0(T.len,N.length);for(const[B,W]of L){const G=W-B;if(G<=.05)continue;const K=N.some(ie=>ie.secret)?d:c,V=T.axis==="x"?new ft(new Nt(G,ls,pc),K):new ft(new Nt(pc,ls,G),K),se=(B+W)/2;T.axis==="x"?V.position.set(p+se,g+ls/2,v+T.off):V.position.set(p+T.off,g+ls/2,v+se),V.castShadow=!0,this.staticGroup.add(V)}}}});for(const h of a){if(h.kind==="trapdoor"||h.kind==="stair")continue;const f=e[h.a],p=e[h.b];if(!f||!p||o(f)||o(p))continue;const g=this.roomPositions[h.a],v=this.roomPositions[h.b],m=Jt(f),u=Jt(p),x=v.x-g.x,E=v.z-g.z,S=new mn({color:h.secret?2762272:4012595,roughness:1});let I;if(Math.abs(x)>=Math.abs(E)){const b=Math.abs(x)-m.hx-u.hx;if(b<=.05)continue;I=new ft(new Nt(b+.4,.2,mc),S),I.position.set(g.x+Math.sign(x)*(m.hx+b/2),g.y-.02,g.z)}else{const b=Math.abs(E)-m.hz-u.hz;if(b<=.05)continue;I=new ft(new Nt(mc,.2,b+.4),S),I.position.set(g.x,g.y-.02,g.z+Math.sign(E)*(m.hz+b/2))}I.receiveShadow=!0,this.staticGroup.add(I)}for(const h of a){if(h.kind!=="stair")continue;const f=e[h.a],p=e[h.b];if(!f||!p||o(f)||o(p))continue;const g=this.roomPositions[h.a],v=this.roomPositions[h.b],m=g.y-v.y;if(m<=0)continue;const u=6,x=new mn({color:3486251,roughness:1}),E=Jt(f);for(let S=0;S<u;S++){const I=(S+.5)/u,b=new ft(new Nt(1.6,.3,1.1),x);b.position.set(g.x+(v.x-g.x)*I*.35-E.hx*.2,g.y-m*I,g.z+(v.z-g.z)*I*.35+E.hz*.25),b.receiveShadow=!0,this.staticGroup.add(b)}}for(const h of s){const f=e[h.from];if(!f||o(f))continue;const{x:p,y:g,z:v}=this.roomPositions[h.from],{hx:m,hz:u}=Jt(f),x=new ft(new Nt(1.5,.42,1.5),new mn({color:h.secret?3025444:460298,roughness:1}));x.position.set(p+m*.45,g+.01,v-u*.45),this.staticGroup.add(x)}}getSpriteMaterial(e){if(!this.spriteMaterials.has(e)){const t=document.createElement("canvas");t.width=128,t.height=128;const i=t.getContext("2d");i.font="92px serif",i.textAlign="center",i.textBaseline="middle",i.fillText(e,64,70);const s=new tc(t);s.colorSpace=St,this.spriteMaterials.set(e,new fs({map:s,transparent:!0}))}return this.spriteMaterials.get(e)}knownSet(e){return new Set(e.knownIdxs||e.dungeon.rooms.map((t,i)=>i).filter(t=>t<=e.roomIndex+1))}updateIcons(e){this.iconGroup.clear();const t=e.dungeon.rooms,i=this.knownSet(e),s=e.currentRoomIndex??e.roomIndex;t.forEach((r,o)=>{if(r.secret&&!r.discovered)return;const{x:a,y:l,z:c}=this.roomPositions[o],d=i.has(o)||r.type==="boss",h=d?r.icon:"❓";if(d&&this.atlasReady&&((r.type==="monster"||r.type==="boss")&&r.monster&&!r.cleared||dc(r)))return;const f=new Ei(this.getSpriteMaterial(h)),p=r.type==="boss"?1.5:1;f.scale.set(p,p,1);const g=l+ls+.6;f.position.set(a,g,c),f.material=f.material.clone(),f.material.opacity=r.cleared&&o!==s?.28:1,f.userData.baseY=g,f.userData.phase=o,this.iconGroup.add(f)})}updateParty(e){var f;this.partyGroup.clear();const t=e.currentRoomIndex??Math.min(e.roomIndex,e.dungeon.rooms.length-1),{x:i,y:s,z:r}=this.roomPositions[t]||{x:0,y:0,z:0},o=e.dungeon.rooms[t],a=o?Math.max(Jt(o).hx,Jt(o).hz):4;this.torch.position.set(i,s+2.4,r),this.torch.distance=Math.max(12,a*3.4),this.torchBase=24+a*2.2;const l=o&&o.monster&&!o.cleared&&(o.type==="monster"||o.type==="boss"),c=e.party.members.filter(p=>p.alive).slice().sort((p,g)=>(p.class==="fighter"?-1:0)-(g.class==="fighter"?-1:0)),d=c.length,h=o?N0(o,i,r,d,l,((f=e==null?void 0:e.party)==null?void 0:f.formation)||"line"):c.map(()=>({mx:i,mz:r}));c.forEach((p,g)=>{const{mx:v,mz:m}=h[g],u=p.health/p.maxHealth<=.35;if(this.atlasReady){const x=this.tileSprite(M0(p.class),.82);x.position.set(v,s+.72,m),x.userData.baseY=s+.72,x.userData.phase=g*1.7,u&&(x.material=x.material.clone(),x.material.color.set(12157056),x.scale.y=.68),this.partyGroup.add(x);const E=new ft(this.baseGeo,this.baseMats[p.class]||this.baseMats.fighter);E.position.set(v,s+.24,m),E.castShadow=!0,this.partyGroup.add(E)}else{const x=new ft(this.meepleGeo,this.meepleMats[p.class]||this.meepleMats.fighter);x.position.set(v,s+.55,m),x.castShadow=!0,x.userData.baseY=s+.55,x.userData.phase=g*1.7,this.partyGroup.add(x)}})}playEffect(e,t,i=null){const s=H0[e];if(!s||!this.roomPositions[t])return;const{x:r,y:o,z:a}=this.roomPositions[t],l=e==="spell-strike"&&_c[i]?_c[i]:s.color;let c;s.kind==="slash"&&this.atlasReady?(c=this.tileSprite(w0.slash,1.1),c.material=c.material.clone()):(c=new Ei(this.glowMaterial(l||"#ffffff").clone()),c.scale.set(1.1,1.1,1)),c.position.set(r,o+1,a),this.fxGroup.add(c),this.effects.push({sprite:c,born:this.clock.getElapsedTime(),life:.7})}glowMaterial(e){const t=`glow:${e}`;if(!this.spriteMaterials.has(t)){const i=document.createElement("canvas");i.width=128,i.height=128;const s=i.getContext("2d"),r=s.createRadialGradient(64,64,6,64,64,62);r.addColorStop(0,e),r.addColorStop(.45,e+"aa"),r.addColorStop(1,e+"00"),s.fillStyle=r,s.fillRect(0,0,128,128);const o=new tc(i);o.colorSpace=St,this.spriteMaterials.set(t,new fs({map:o,transparent:!0,blending:Ca,depthWrite:!1}))}return this.spriteMaterials.get(t)}animateFrame(){if(!this.camera)return;const e=this.clock.getElapsedTime();if(this.camTarget){const i=Zs+(this.camZoom||0)*2,s=new P(this.camTarget.x+i,this.camTarget.y+i*1.05,this.camTarget.z+i),r=this.camPlaced?.12:1;this.camPlaced=!0,this.camera.position.lerp(s,r),this.camLook||(this.camLook=this.camTarget.clone()),this.camLook.lerp(this.camTarget,r),this.camera.lookAt(this.camLook);const o=pa+(this.camZoom||0),a=(this.lastW||500)/(this.lastH||420);this.camera.top=o,this.camera.bottom=-o,this.camera.left=-o*a,this.camera.right=o*a,this.camera.updateProjectionMatrix()}const t=this.torchBase||26;this.torch.intensity=t+Math.sin(e*9)*3+Math.sin(e*23)*2;for(const i of this.iconGroup.children)i.position.y=i.userData.baseY+Math.sin(e*1.6+i.userData.phase)*.06;for(const i of this.partyGroup.children)i.userData.baseY!==void 0&&(i.position.y=i.userData.baseY+Math.abs(Math.sin(e*2.2+i.userData.phase))*.05);for(const i of this.occupantGroup.children)i.userData.sway&&(i.position.y=i.userData.baseY+Math.sin(e*2.8+i.userData.phase)*.07);for(let i=this.effects.length-1;i>=0;i--){const s=this.effects[i],r=(e-s.born)/s.life;if(r>=1){this.fxGroup.remove(s.sprite),this.effects.splice(i,1);continue}const o=.9+r*1.6;s.sprite.scale.set(o,o,1),s.sprite.material.opacity=1-r*r}this.renderer.render(this.scene,this.camera)}dispose(){this.disposed=!0,this.renderer.dispose()}}const V0=["weapon","armor","focus","tool","boots","trinket"];function lt(n){return String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const ma="background:#14110b;border:1px solid #3a2f1e;border-radius:6px;padding:0.8rem;",Qs="color:#887755;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;";function Zh(n,e,{onChange:t=()=>{},onDone:i=null,doneLabel:s="Done"}={}){const r=()=>{t(),Zh(n,e,{onChange:t,onDone:i,doneLabel:s})};n.innerHTML="";const o=document.createElement("div");o.innerHTML=`
    <h2 style="color:#d8a53f;font-size:1.3rem;margin-bottom:0.3rem;text-align:center;">🎒 The Muster</h2>
    <div style="text-align:center;color:#887755;margin-bottom:0.9rem;font-size:0.85rem;">
      Who carries what, who prepares which working, and who they are.
    </div>`,n.appendChild(o);const a=[...e.members];for(const h of a){const f=document.createElement("div");f.className="outfit-member",f.style.cssText=`${ma}margin-bottom:0.7rem;`;const p=new Map(h.equipment.map(v=>[v.slot||"trinket",v])),g=V0.map(v=>{const m=p.get(v);return`
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;padding:0.15rem 0;">
          <span style="${Qs}width:3.6rem;flex:none;">${v}</span>
          <span style="flex:1;color:${m?"#e8d9b3":"#4a443a"};">
            ${m?`${lt(m.icon||"")} ${lt(m.name)}`:"—"}
          </span>
          ${m?`<button class="outfit-off" data-card="${lt(m.id)}"
                 style="font-size:0.68rem;padding:0.15rem 0.4rem;background:#26200f;color:#c8b88a;">take off</button>`:""}
        </div>`}).join("");f.innerHTML=`
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
        <span style="font-size:1.2rem;">${lt(h.icon)}</span>
        <input class="outfit-name" data-uid="${lt(h.uid)}" value="${lt(h.name)}"
          maxlength="40" aria-label="Name"
          style="flex:1;background:#0f0d09;color:#e8d9b3;border:1px solid #3a2f1e;border-radius:4px;padding:0.3rem 0.45rem;font-family:inherit;font-size:0.92rem;" />
        <span style="color:#887755;font-size:0.78rem;">${lt(h.class)}</span>
        <span style="color:#887755;font-size:0.75rem;">❤️${h.health}/${h.effectiveMax()} ⚔️${h.attack} 🛡️${h.defense} 🧠${h.mind}</span>
      </div>
      <div style="display:flex;gap:0.9rem;flex-wrap:wrap;">
        <div style="flex:1;min-width:190px;">${g}</div>
        <div style="flex:1;min-width:190px;">
          <div style="${Qs}margin-bottom:0.25rem;">Who they are</div>
          <textarea class="outfit-story" data-uid="${lt(h.uid)}" rows="3" maxlength="400"
            placeholder="${lt(h.trait||"Write their history, or leave it to the dungeon.")}"
            style="width:100%;background:#0f0d09;color:#c8b88a;border:1px solid #3a2f1e;border-radius:4px;padding:0.35rem;font-family:inherit;font-size:0.76rem;resize:vertical;">${lt(h.backstory)}</textarea>
        </div>
      </div>`,n.appendChild(f)}const l=document.createElement("div");l.style.cssText=`${ma}margin-bottom:0.7rem;`;const c=a.map(h=>`<option value="${lt(h.name)}">${lt(h.icon)} ${lt(h.name)}</option>`).join("");l.innerHTML=`
    <div style="${Qs}margin-bottom:0.4rem;">🎒 In the pack — nobody is carrying these</div>
    ${e.pack.length===0?`<div style="color:#4a443a;font-size:0.8rem;">Nothing. Every piece is in somebody's hands.</div>`:e.pack.map(h=>`
        <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
          <span style="flex:1;color:#e8d9b3;">${lt(h.icon||"")} ${lt(h.name)}
            <span style="color:#887755;">· ${lt(h.slot||"trinket")}</span></span>
          <select class="outfit-give" data-card="${lt(h.id)}"
            style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
            <option value="">give to…</option>${c}
          </select>
        </div>`).join("")}`,n.appendChild(l);const d=document.createElement("div");if(d.style.cssText=`${ma}margin-bottom:0.7rem;`,d.innerHTML=`
    <div style="${Qs}margin-bottom:0.4rem;">📖 The grimoire — a working is only as good as the mind that prepared it</div>
    ${e.grimoire.length===0?'<div style="color:#4a443a;font-size:0.8rem;">No workings drafted.</div>':e.grimoire.map(h=>{const f=e.casterOf(h),p=h.power+Math.floor(e.mindFor(h)/2);return`
          <div style="display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;padding:0.2rem 0;">
            <span style="flex:1;color:#e8d9b3;">${lt(h.icon||"")} ${lt(h.name)}
              <span style="color:#887755;">· power ${p}</span></span>
            <select class="outfit-caster" data-spell="${lt(h.id)}"
              style="background:#0f0d09;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:4px;font-family:inherit;font-size:0.75rem;">
              <option value="">whoever is sharpest</option>
              ${a.map(g=>`<option value="${lt(g.name)}"${f&&f.uid===g.uid?" selected":""}>${lt(g.icon)} ${lt(g.name)} (🧠${g.mind})</option>`).join("")}
            </select>
          </div>`}).join("")}`,n.appendChild(d),n.querySelectorAll(".outfit-off").forEach(h=>{h.addEventListener("click",()=>{e.unequip(h.dataset.card),r()})}),n.querySelectorAll(".outfit-give").forEach(h=>{h.addEventListener("change",()=>{h.value&&(e.equipTo(h.dataset.card,h.value),r())})}),n.querySelectorAll(".outfit-caster").forEach(h=>{h.addEventListener("change",()=>{e.assignCaster(h.dataset.spell,h.value||null),r()})}),n.querySelectorAll(".outfit-name").forEach(h=>{h.addEventListener("change",()=>{const f=e.members.find(p=>p.uid===h.dataset.uid);f&&e.renameMember(f,h.value),r()})}),n.querySelectorAll(".outfit-story").forEach(h=>{h.addEventListener("change",()=>{const f=e.members.find(p=>p.uid===h.dataset.uid);f&&f.setBackstory(h.value),t()})}),i){const h=document.createElement("button");h.id="outfit-done-btn",h.textContent=s,h.style.cssText="width:100%;margin-top:0.5rem;padding:0.9rem;font-size:1rem;",h.addEventListener("click",i),n.appendChild(h)}}const xc={none:{id:"none",name:"Standard Delve",icon:"🗺️",text:"No wager. The dungeon as the dungeon intends.",scoreBonus:0},swarms:{id:"swarms",name:"Monster Swarms",icon:"🐝",text:"The halls run thick with the weak and the many — more fights, thinner foes, more score.",scoreBonus:.25,weightTweaks:{monster:2,corridor:-.3},monsterHealthMult:.7},traps:{id:"traps",name:"Trap-Dense",icon:"🪤",text:"Every flagstone is a question. More traps, and they bite deeper.",scoreBonus:.25,weightTweaks:{trap:2},trapBonus:2},darkpact:{id:"darkpact",name:"Dark Pact",icon:"🩸",text:"The dungeon's malice sharpens its teeth — and gilds its hoard.",scoreBonus:.3,monsterAttackMult:1.25,goldMult:1.5},nightfall:{id:"nightfall",name:"Endless Night",icon:"🌑",text:"No light reaches here. The dungeon itself turns hostile more often.",scoreBonus:.3,weightTweaks:{disaster:1.5,treasure:-.3}},throne:{id:"throne",name:"The Long Throne",icon:"👑",text:"Fewer rooms, one horror. The boss has grown fat on patience.",scoreBonus:.35,weightTweaks:{monster:-1,treasure:.5},bossAttackMult:1.4,bossHealthMult:1.4}};function Qh(n){return xc[n]||xc.none}const ed={"rat-swarm":{trait:"swarm",weak:["fire"]},gelatinous:{trait:"armored",weak:["frost"],resist:["shock"]},wraith:{trait:"ethereal"},"ogre-king":{trait:"armored"},"dragon-whelp":{resist:["fire"],weak:["frost"]},"bone-warden":{trait:"armored"},"grave-mites":{trait:"swarm",weak:["fire"]},"barrow-shade":{trait:"ethereal"},"hungry-ghoul":{trait:"venomous"},"shrouded-king":{trait:"armored"},"abbot-of-worms":{trait:"venomous"},salamander:{resist:["fire"],weak:["frost"]},"cinder-bats":{trait:"swarm",resist:["fire"],weak:["frost"]},"magma-toad":{resist:["fire"],weak:["frost"]},"obsidian-golem":{trait:"armored",resist:["shock"]},"cinder-wyrm":{resist:["fire"],weak:["frost"]},"forge-tyrant":{trait:"armored",resist:["fire"]},"flying-tomes":{trait:"swarm",weak:["fire"]},"ink-elemental":{weak:["fire"],resist:["shock"]},"spectral-scribe":{trait:"ethereal"},"index-wight":{weak:["fire"]},archivist:{trait:"ethereal"},"grand-errata":{trait:"armored",weak:["fire"]},"sludge-elemental":{trait:"venomous",resist:["shock"]},"potion-rats":{trait:"swarm"},"mutant-vine":{trait:"armored",weak:["fire"]},"mad-alchemist":{trait:"venomous"},"the-precipitate":{trait:"armored",resist:["fire","frost"]},"bat-cloud":{trait:"swarm"},"pale-hound":{trait:"venomous"},"crimson-mist":{trait:"ethereal"},"vampire-lord":{trait:"ethereal"},"the-bride":{trait:"ethereal"},"jar-imp":{trait:"swarm",resist:["fire"]},"pickled-thing":{trait:"venomous"},"root-golem":{trait:"armored",weak:["fire"]},"bog-toad":{trait:"venomous"},"the-cauldron":{trait:"armored",resist:["fire"]},"frost-wisp":{trait:"ethereal",resist:["frost"],weak:["fire"]},"ice-crawler":{trait:"swarm",weak:["fire"]},"thawed-dead":{trait:"venomous"},"cinder-imp":{resist:["fire"],weak:["frost"]},"mad-pyromancer":{resist:["fire"],weak:["frost"]},"glacier-heart":{trait:"armored",resist:["frost"],weak:["fire"]}};function $0(n){Object.assign(ed,n)}function xo(n){const e=ed[n.kind];return e?{...n,...e}:n}function ps(n,e){const t=n==null?void 0:n.element;return t?t==="holy"&&e.undead||(e.weak||[]).includes(t)?1.5:(e.resist||[]).includes(t)?.5:1:1}const fe={ENTRANCE:"entrance",CORRIDOR:"corridor",MONSTER:"monster",TRAP:"trap",TREASURE:"treasure",LIBRARY:"library",SHRINE:"shrine",LAB:"lab",MATERIALS:"materials",DISASTER:"disaster",BOSS:"boss",VAULT:"vault",STAIRS:"stairs",SITUATION:"situation"},ga={min:8,max:10},bc={crypt:{id:"crypt",name:"the burial wing",tell:"burial niches, most of them open",body:["monster","trap","shrine"],payoff:"treasure"},archive:{id:"archive",name:"the archive wing",tell:"shelving stacked to the ceiling, half of it collapsed",body:["library","trap","monster"],payoff:"library"},barracks:{id:"barracks",name:"the barracks wing",tell:"bunkrooms and a picked-over weapon rack",body:["monster","monster","corridor"],payoff:"treasure"},sump:{id:"sump",name:"the flooded wing",tell:"a floor that slopes down into standing water",body:["disaster","monster","trap"],payoff:"treasure"}},yr={entrance:[{shape:"chamber",min:[7,7],max:[9,9]},{shape:"hall",min:[10,6],max:[12,6]}],corridor:[{shape:"passage",min:[7,2],max:[12,3]},{shape:"hall",min:[9,4],max:[12,5]}],monster:[{shape:"chamber",min:[8,8],max:[11,11]},{shape:"cavern",min:[11,8],max:[15,12]},{shape:"hall",min:[12,6],max:[16,8]}],trap:[{shape:"passage",min:[8,3],max:[12,4]},{shape:"chamber",min:[8,6],max:[10,8]}],treasure:[{shape:"cell",min:[5,5],max:[7,7]},{shape:"chamber",min:[8,7],max:[10,9]}],library:[{shape:"hall",min:[12,7],max:[16,8]},{shape:"chamber",min:[9,9],max:[12,12]}],shrine:[{shape:"rotunda",min:[9,9],max:[12,12]},{shape:"chamber",min:[8,8],max:[10,10]}],disaster:[{shape:"cavern",min:[12,9],max:[16,13]},{shape:"hall",min:[13,6],max:[16,8]}],boss:[{shape:"cavern",min:[17,14],max:[22,17]},{shape:"hall",min:[20,12],max:[24,14]}],vault:[{shape:"cell",min:[6,6],max:[8,8]}],stairs:[{shape:"cell",min:[6,6],max:[8,8]},{shape:"rotunda",min:[7,7],max:[9,9]}],situation:[{shape:"chamber",min:[9,8],max:[12,11]},{shape:"rotunda",min:[9,9],max:[12,12]},{shape:"hall",min:[12,6],max:[15,8]}]};function W0(n,e){const t=yr[n]||yr.corridor,i=t[Math.floor(e.next()*t.length)];let s=i.min[0]+Math.floor(e.next()*(i.max[0]-i.min[0]+1)),r=i.min[1]+Math.floor(e.next()*(i.max[1]-i.min[1]+1));return e.next()<.5&&([s,r]=[r,s]),{w:s,h:r,shape:i.shape}}const td={entrance:"🚪",corridor:"⬛",monster:"👹",trap:"⚠️",treasure:"💰",library:"📚",shrine:"🕯️",lab:"⚗️",materials:"🌿",disaster:"🌋",boss:"🐉",vault:"💎",stairs:"🪜",situation:"🪐"},wc={easy:{monster:2,trap:1,treasure:2,library:1,shrine:1.5,disaster:.5,corridor:1,situation:3},medium:{monster:3,trap:1.5,treasure:2,library:1,shrine:1,disaster:1,corridor:1,situation:3},hard:{monster:4,trap:2.5,treasure:1.5,library:1,shrine:.7,disaster:2,corridor:.5,situation:2.6},nightmare:{monster:5,trap:3,treasure:1.5,library:.8,shrine:.5,disaster:3,corridor:.3,situation:2.2}};function q0(n,e){const t=Object.entries(e),i=t.reduce((r,[,o])=>r+o,0);let s=n.next()*i;for(const[r,o]of t)if(s-=o,s<=0)return r;return t[0][0]}class nd{constructor(e,t,i=null,s={}){this.rooms=e,this.theme=t,this.condition=i,this.spine=s.spine||e.map((r,o)=>o),this.edges=s.edges||e.slice(1).map((r,o)=>({a:o,b:o+1,secret:!1,kind:"door"})),this.branches=s.branches||[],this.trapdoors=s.trapdoors||[]}getRoom(e){return this.rooms[e]||null}get length(){return this.rooms.length}branchAt(e){return this.branches.find(t=>t.junction===e&&!t.consumed)||null}trapdoorAt(e){return this.trapdoors.find(t=>t.from===e&&!t.consumed)||null}}function X0(n,e,t=2){return Math.abs(n.x-e.x)*2<n.w+e.w+t&&Math.abs(n.y-e.y)*2<n.h+e.h+t}const Sc=[[1,0],[-1,0],[0,1],[0,-1]];function Mc(n,e,t,i,s=null){const r=s?[s,...i.shuffle(Sc)]:i.shuffle(Sc),o=t.filter(a=>(a.floor||0)===(n.floor||0));for(const a of r)for(const l of[2,3,5]){const[c,d]=a;if(n.x=e.x+c*((e.w+n.w)/2+l),n.y=e.y+d*((e.h+n.h)/2+l),!o.some(h=>X0(n,h)))return a}return null}function Y0(n,e,t){const i=n.map(l=>l.x),s=n.map(l=>l.y),r=Math.max(...i)-Math.min(...i),o=Math.max(...s)-Math.min(...s);return Math.abs(r-o)>8?r>o?[0,1]:[1,0]:t&&e.next()<.4?t:e.next()<.5?[1,0]:[0,1]}function j0(n,e="medium",t={}){const i=new oh(n),s=Math.max(1,t.depth||1),r=si[t.theme]||i.pick(Object.values(si)),o=typeof t.condition=="object"&&t.condition?t.condition:Qh(t.condition),a={...wc[e]||wc.medium};for(const[A,C]of Object.entries(r.weightTweaks))a[A]=Math.max(.1,(a[A]||0)+C);for(const[A,C]of Object.entries(o.weightTweaks||{}))a[A]=Math.max(.1,(a[A]||0)+C);const l=Z0[e]||1,c=1,d=A=>l*(1+A*.18),h=[];h.push(Ai(0,fe.ENTRANCE,i,r,s,l,o)),h[0].floor=0;for(let A=0;A<c;A++){const C=ga.min+Math.floor(i.next()*(ga.max-ga.min+1));for(let w=0;w<C;w++){const y=q0(i,a),T=Ai(h.length,y,i,r,s,d(A),o);T.floor=A,h.push(T)}if(A<c-1){const w=Ai(h.length,fe.STAIRS,i,r,s,d(A),o);w.floor=A,w.descendsTo=A+1,h.push(w)}}Ec(h,fe.LIBRARY,i,r,s,d,o,a,r.minLibraries||1),Ec(h,fe.SHRINE,i,r,s,d,o,a);const f=_r.slice(),p=new Set;for(const A of h)A.type===fe.SITUATION&&(f.length===0&&f.push(..._r),A.encounterId=f.splice(Math.floor(i.next()*f.length),1)[0],p.add(A.encounterId));for(const A of h){if(A.encounterId||!Tc[A.type]||i.next()>K0)continue;const C=Tc[A.type].filter(w=>!p.has(w));C.length!==0&&(A.encounterId=C[Math.floor(i.next()*C.length)],p.add(A.encounterId))}const g=Ai(h.length,fe.BOSS,i,r,s,d(c-1),o);g.floor=c-1,h.push(g),h[0].x=0,h[0].y=0;const v=[h[0]];let m=[1,0];for(let A=1;A<h.length;A++){const C=h[A],w=h[A-1];if(C.floor!==w.floor){C.x=w.x,C.y=w.y,v.push(C),m=[1,0];continue}m=Y0(v.filter(T=>T.floor===C.floor),i,m);const y=Mc(C,w,v,i,m);y&&(m=y),v.push(C)}const u=h.map((A,C)=>C),x=h.slice(1).map((A,C)=>({a:C,b:C+1,secret:!1,kind:h[C].floor!==h[C+1].floor?"stair":"door"})),E=[];for(const A of h)A.features=uc(A,i,r);const S=1+Math.floor(i.next()*2),I=Object.keys(bc);for(let A=0;A<S;A++){const C=1+Math.floor(i.next()*(u.length-2)),w=bc[I[Math.floor(i.next()*I.length)]],y=i.next()<.5,T=2+Math.floor(i.next()*3),N=[];let L=h[C],B=C,W=null;const G=h[C].floor||0;for(let K=0;K<T;K++){const se=K===T-1?y?fe.VAULT:w.payoff:w.body[Math.floor(i.next()*w.body.length)],ie=Ai(h.length,se,i,r,s,d(G),o);ie.floor=G;const _e=Mc(ie,L,v,i,W);if(!_e)break;W=_e,ie.secret=y,ie.discovered=!y,ie.wing=w.id,ie.features=uc(ie,i,r),h.push(ie),v.push(ie),x.push({a:B,b:ie.index,secret:y&&K===0,kind:y&&K===0?"secret":"arch"}),N.push(ie.index),B=ie.index,L=ie}N.length>0&&E.push({junction:C,rooms:N,secret:y,consumed:!1,wing:w.id,name:w.name,tell:w.tell})}const b=[];return new nd(h,r,o,{spine:u,edges:x,branches:E,trapdoors:b})}const J0=new Set([fe.ENTRANCE,fe.BOSS,fe.STAIRS,fe.LIBRARY,fe.SHRINE,fe.LAB,fe.MATERIALS]);function Ec(n,e,t,i,s,r,o,a,l=1){const c=n.filter(h=>h.type===e).length;let d=l-c;for(;d>0;){const h=n.filter(u=>!J0.has(u.type)&&u.type!==e);if(h.length===0)break;let f=null,p=-1;for(const u of new Set(h.map(x=>x.type))){const x=h.filter(E=>E.type===u).length/Math.max(.1,(a==null?void 0:a[u])||.1);x>p&&(p=x,f=u)}const g=h.filter(u=>u.type===f),v=t.pick(g),m=Ai(v.index,e,t,i,s,r(v.floor||0),o);m.floor=v.floor,n[n.indexOf(v)]=m,d--}}function Ai(n,e,t,i,s=1,r=1,o={}){const a=W0(e,t),l={index:n,type:e,icon:td[e]||"⬛",cleared:!1,w:a.w,h:a.h,shape:a.shape};if(e===fe.MONSTER&&(l.monster=Ac(t,!1,i,s,r,o)),e===fe.BOSS&&(l.monster=Ac(t,!0,i,s,r,o)),e===fe.TREASURE){const c=(20+Math.floor(t.next()*40))*(1+.2*(s-1));l.gold=Math.round(c*(o.goldMult||1)),l.mimicChance=.18}if(e===fe.VAULT){const c=(60+Math.floor(t.next()*120))*(1+.2*(s-1));l.gold=Math.round(c*(o.goldMult||1)),l.mimicChance=.28}if(e===fe.TRAP){l.trapDamage=4+Math.floor(t.next()*4)+(i.trapBonus||0)+(s-1)+(o.trapBonus||0);const c=i.trapTypes||["spike"];l.trapType=c[Math.floor(t.next()*c.length)]}return e===fe.MATERIALS&&(l.materials=1+Math.floor(t.next()*2)),e===fe.SITUATION&&(l.encounterId=_r[Math.floor(t.next()*_r.length)]),l}const _r=["astronomers-chamber","sealed-laboratory","monster-grievance","appraiser-test","experimental-crossroads","healer-trial","memory-reconstruction","musician-harmony","observer-secret","haunted-armour","duellists-challenge","chessboard-floor","cartographers-ghost","severed-council"],K0=.5,Tc={treasure:["appraiser-test","observer-secret","experimental-crossroads"],vault:["appraiser-test"],shrine:["healer-trial","musician-harmony"],corridor:["healer-trial","observer-secret","experimental-crossroads","haunted-armour","duellists-challenge","chessboard-floor","cartographers-ghost","severed-council"],library:["memory-reconstruction","cartographers-ghost"],disaster:["musician-harmony","severed-council"],monster:["haunted-armour","duellists-challenge"],trap:["chessboard-floor"]},si={delve:{id:"delve",name:"the Old Delve",icon:"⛏️",tagline:"A classic hole in the ground, wronged by generations of management.",weightTweaks:{},trapTypes:["spike","alarm"],monsters:[{kind:"rat-swarm",name:"a chittering rat swarm",icon:"🐀",attack:4,health:10,undead:!1},{kind:"skeleton",name:"a rattling skeleton patrol",icon:"💀",attack:6,health:14,undead:!0},{kind:"goblin-gang",name:"a goblin toll-gang",icon:"👺",attack:5,health:12,undead:!1,bribable:!0},{kind:"gelatinous",name:"a gelatinous horror",icon:"🟩",attack:5,health:18,undead:!1,slow:!0},{kind:"wraith",name:"a cold-eyed wraith",icon:"👻",attack:8,health:12,undead:!0}],bosses:[{kind:"dragon-whelp",name:"the Dragon Whelp of the Deep Vault",icon:"🐉",attack:12,health:34,undead:!1},{kind:"ogre-king",name:"the Ogre King Under the Stair",icon:"👹",attack:14,health:38,undead:!1,bribable:!0}]},castle:{id:"castle",name:"the Castle of the Vampire Lord",icon:"🦇",tagline:"The invitation was in your dreams. The exit clause was not.",weightTweaks:{treasure:1.5,library:.5,monster:.5,shrine:-.7,corridor:-.3},minLibraries:1,trapTypes:["alarm","spike"],monsters:[{kind:"castle-thrall",name:"a thrall footman, polite and bloodless",icon:"🧟",attack:6,health:13,undead:!0,bribable:!0},{kind:"bat-cloud",name:"a chittering cloud of castle bats",icon:"🦇",attack:4,health:9,undead:!1},{kind:"pale-hound",name:"a pale hound with a red velvet collar",icon:"🐺",attack:7,health:12,undead:!0},{kind:"crimson-mist",name:"a crimson mist that pours under the door",icon:"🌫️",attack:8,health:11,undead:!0}],bosses:[{kind:"vampire-lord",name:"the Vampire Lord, apologizing for the hour",icon:"🧛",attack:13,health:35,undead:!0},{kind:"the-bride",name:"the Bride, who was here long before the Lord",icon:"👰",attack:12,health:33,undead:!0}]},icecaverns:{id:"icecaverns",name:"the Ice Caverns of the Mad Pyromancer",icon:"🧊",tagline:"He moved here so the fires couldn't spread. The fires found other ambitions.",weightTweaks:{disaster:1.5,trap:1,shrine:-.5,library:-.3},trapBonus:2,trapTypes:["fire","spike"],monsters:[{kind:"frost-wisp",name:"a frost wisp singed around the edges",icon:"❄️",attack:5,health:9,undead:!1},{kind:"ice-crawler",name:"an ice crawler with too many pick-shaped legs",icon:"🕷️",attack:6,health:13,undead:!1},{kind:"thawed-dead",name:"one of the thawed dead, steaming gently",icon:"🧟",attack:7,health:14,undead:!0},{kind:"cinder-imp",name:"a cinder imp wearing a snowball like armor",icon:"🔥",attack:6,health:11,undead:!1}],bosses:[{kind:"mad-pyromancer",name:"the Mad Pyromancer, delighted someone flammable came",icon:"🧙",attack:14,health:32,undead:!1},{kind:"glacier-heart",name:"the Glacier's Heart, half-melted and wholly furious",icon:"💠",attack:12,health:38,undead:!1,slow:!0}]}},Z0={easy:.35,medium:.83,hard:1.52,nightmare:2.03};function Q0(n){var e;return{themeId:n.theme.id,conditionId:((e=n.condition)==null?void 0:e.id)||"none",rooms:n.rooms.map(t=>{var i;return{index:t.index,type:t.type,x:t.x,y:t.y,w:t.w,h:t.h,shape:t.shape,...(i=t.features)!=null&&i.length?{features:[...t.features]}:{},floor:t.floor||0,...t.descendsTo!==void 0?{descendsTo:t.descendsTo}:{},...t.wing?{wing:t.wing}:{},...t.key?{key:{...t.key}}:{},secret:!!t.secret,...t.monster?{monster:{...t.monster}}:{},...t.gold!==void 0?{gold:t.gold}:{},...t.mimicChance!==void 0?{mimicChance:t.mimicChance}:{},...t.trapDamage!==void 0?{trapDamage:t.trapDamage}:{},...t.trapType!==void 0?{trapType:t.trapType}:{},...t.materials!==void 0?{materials:t.materials}:{},...t.encounterId?{encounterId:t.encounterId}:{}}}),spine:[...n.spine],edges:n.edges.map(t=>({...t})),branches:n.branches.map(t=>({...t,rooms:[...t.rooms],consumed:!1})),trapdoors:n.trapdoors.map(t=>({...t,consumed:!1}))}}function ey(n){const e=si[n.themeId]||si.delve,t=Qh(n.conditionId),i=n.rooms.map(s=>({...s,icon:td[s.type]||"⬛",cleared:!1,discovered:!s.secret,...s.w?{}:id(s.type),features:[...s.features||[]],...s.monster?{monster:{...s.monster}}:{}}));return new nd(i,e,t,{spine:[...n.spine],edges:n.edges.map(s=>({...s,kind:s.kind||(s.secret?"secret":"door")})),branches:n.branches.map(s=>({...s,rooms:[...s.rooms],consumed:!1})),trapdoors:(n.trapdoors||[]).map(s=>({...s,consumed:!1}))})}function id(n){const e=(yr[n]||yr.corridor)[0];return{w:e.min[0],h:e.min[1],shape:e.shape}}function ty(n,e,t=!1){const i=id(n);return n===fe.MONSTER?{...i,monster:xo({...e.monsters[0]})}:n===fe.BOSS?{...i,monster:xo({...e.bosses[0],isBoss:!0})}:n===fe.TREASURE?{...i,gold:35,mimicChance:.18}:n===fe.VAULT?{...i,gold:100,mimicChance:.28}:n===fe.TRAP?{...i,trapDamage:5,trapType:(e.trapTypes||["spike"])[0]}:n===fe.MATERIALS?{...i,materials:2}:i}function ny(n){var e,t;if(!(n!=null&&n.id)||!((e=n.monsters)!=null&&e.length)||!((t=n.bosses)!=null&&t.length))throw new Error("a theme needs an id, monsters, and at least one boss");return si[n.id]=n,n}function Ac(n,e,t,i=1,s=1,r={}){const o=e?t.bosses:t.monsters,a=xo({...n.pick(o)}),l=(e?r.bossAttackMult:r.monsterAttackMult)||1,c=(e?r.bossHealthMult:r.monsterHealthMult)||1,d=1+.15*(i-1);return a.attack=Math.max(1,Math.round(a.attack*d*s*l)),a.health=Math.max(1,Math.round(a.health*(1+.2*(i-1))*s*c)),e&&(a.isBoss=!0),a}const xr=1,at={BEAT:"beat",NOTABLE:"notable",LEDGER:"ledger"};function Rc(n){var t,i;const e=n.party;return{gold:e.gold,score:e.score,potions:e.potions.length,supply:e.supply,trophies:e.trophies.length,spellsLearned:e.spellsLearned,grimoire:e.grimoire.length,poison:e.poisonLinger||0,alarmed:e.alarmed?1:0,desecrated:e.desecrated?1:0,living:e.living().length,reserve:e.reserve.length,health:e.members.reduce((s,r)=>s+Math.max(0,r.health),0),wounds:e.members.reduce((s,r)=>s+r.wounds,0),equipment:e.members.reduce((s,r)=>s+r.equipment.length,0),weaponMods:e.members.reduce((s,r)=>s+r.weaponMods.length,0),roomsCleared:n.roomsCleared,floor:((i=(t=n.dungeon)==null?void 0:t.rooms[n.path[Math.min(n.roomIndex,n.path.length-1)]])==null?void 0:i.floor)||0}}const iy={gold:{icon:"💰",label:"gold",salience:at.NOTABLE,threshold:25,up:n=>`The purse is ${n} heavier.`,down:n=>`${n} gold leaves the purse.`},score:{icon:"🏅",label:"renown",salience:at.LEDGER,up:n=>`${n} renown earned.`,down:n=>`${n} renown lost.`},potions:{icon:"🧪",label:"potions",salience:at.BEAT,up:n=>`${n} more draught${n>1?"s":""} corked and stowed.`,down:n=>`${n} draught${n>1?"s are":" is"} drunk.`},supply:{icon:"🕯️",label:"oil",salience:at.LEDGER,up:n=>`${n} more march${n>1?"es":""} of oil found.`,down:n=>`${n} march${n>1?"es":""} of oil burned.`},trophies:{icon:"🏆",label:"trophies",salience:at.BEAT,up:n=>`${n} trophy${n>1?" more taken":" taken"} from the dead.`,down:n=>`${n} trophies lost.`},spellsLearned:{icon:"📖",label:"workings learned",salience:at.BEAT,up:n=>`${n} new working${n>1?"s":""} copied into the grimoire.`,down:n=>`${n} working${n>1?"s":""} lost from memory.`},grimoire:{icon:"📜",label:"grimoire",salience:at.LEDGER,up:n=>`The grimoire grows by ${n}.`,down:n=>`${n} scroll${n>1?"s burn":" burns"} away on use.`},poison:{icon:"🐍",label:"venom",salience:at.BEAT,up:n=>`Venom works in the blood: ${n} damage waiting on the march.`,down:n=>"The venom is spent."},alarmed:{icon:"🔔",label:"the alarm",salience:at.BEAT,up:()=>"An alarm is ringing somewhere below. Whatever comes next knows.",down:()=>"The alarm has stopped mattering; the thing it warned has been met."},desecrated:{icon:"⛧",label:"desecration",salience:at.BEAT,up:()=>"The party has taken something the dungeon considers its own. It will remember.",down:()=>"The debt is settled."},living:{icon:"☠️",label:"the living",salience:at.BEAT,up:n=>`${n} more stand${n>1?"":"s"} with the party.`,down:n=>`${n} of the party ${n>1?"are":"is"} down.`},reserve:{icon:"🎭",label:"the reserve",salience:at.NOTABLE,threshold:1,up:n=>`${n} more wait${n>1?"":"s"} in town.`,down:n=>`${n} called up from the reserve.`},health:{icon:"❤️",label:"health",salience:at.NOTABLE,threshold:6,up:n=>`${n} health mended.`,down:n=>`${n} health taken.`},wounds:{icon:"✚",label:"wounds",salience:at.BEAT,up:n=>`${n} wound${n>1?"s":""} that will not close down here.`,down:n=>`${n} wound${n>1?"s":""} closed.`},equipment:{icon:"🎒",label:"kit",salience:at.NOTABLE,threshold:1,up:n=>`${n} piece${n>1?"s":""} of kit taken up.`,down:n=>`${n} piece${n>1?"s":""} of kit lost.`},weaponMods:{icon:"⚗️",label:"weapon coatings",salience:at.NOTABLE,threshold:1,up:n=>`${n} blade${n>1?"s":""} coated at the bench.`,down:n=>`${n} coating${n>1?"s wear":" wears"} off.`},floor:{icon:"🪜",label:"floor",salience:at.BEAT,up:n=>`The party descends ${n===1?"a floor":`${n} floors`}: everything below hits harder.`,down:n=>`The party climbs back up ${n===1?"a floor":`${n} floors`}.`},roomsCleared:{icon:"🚪",label:"rooms cleared",salience:at.LEDGER,up:n=>`${n} more room${n>1?"s":""} behind them.`,down:n=>`${n} room${n>1?"s":""} uncleared.`}};function sy(n,e,t={}){const i=[];for(const s of Object.keys(e)){const r=n[s]??0,o=e[s];if(r===o)continue;const a=o-r,l=iy[s],c=Math.abs(a);let d,h=at.LEDGER,f="•";l?(f=l.icon,d=a>0?l.up(c):l.down(c),h=l.salience,h===at.NOTABLE&&l.threshold&&c<l.threshold&&(h=at.LEDGER)):d=`${s} ${a>0?"rose":"fell"} by ${c}.`,i.push({turn:t.turn??0,room:t.room??null,field:s,from:r,to:o,delta:a,icon:f,text:d,salience:h,described:!!l})}return i}class $i{constructor(e="the party"){this.version=xr,this.partyName=e,this.delves=[],this.current=null}beginDelve({seed:e,difficulty:t,depth:i,theme:s,roster:r,condition:o}={}){return this.current={number:this.delves.length+1,seed:e??null,difficulty:t??null,depth:i??1,theme:s??null,condition:o??null,roster:r??[],rooms:[],events:[],outcome:null,startedAt:null},this.delves.push(this.current),this.current}recordRoom(e,t=[]){this.current||this.beginDelve(),this.current.rooms.push({turn:(e==null?void 0:e.turn)??this.current.rooms.length+1,room:(e==null?void 0:e.room)??null,icon:(e==null?void 0:e.icon)??null,action:(e==null?void 0:e.action)??null,predicament:(e==null?void 0:e.predicament)??null,deliberation:(e==null?void 0:e.deliberation)??null,resolution:(e==null?void 0:e.resolution)??null,aside:(e==null?void 0:e.aside)??null,falls:(e==null?void 0:e.falls)??[],wounds:(e==null?void 0:e.wounds)??[],events:t}),this.current.events.push(...t)}recordAside(e,t=at.BEAT){this.current||this.beginDelve(),this.current.events.push({turn:this.current.rooms.length,room:null,field:null,icon:"·",text:e,salience:t,described:!0})}endDelve(e){this.current&&(this.current.outcome=e)}allEvents(){return this.delves.flatMap(e=>e.events)}beats(e=this.current){return((e==null?void 0:e.events)||[]).filter(t=>t.salience===at.BEAT)}toJSON(){return{version:this.version,partyName:this.partyName,delves:this.delves}}static fromJSON(e){const t=new $i((e==null?void 0:e.partyName)||"the party");return t.version=(e==null?void 0:e.version)??xr,t.delves=Array.isArray(e==null?void 0:e.delves)?e.delves:[],t.current=t.delves[t.delves.length-1]||null,t}}const ry=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];function ay(n){return ry[n]||String(n)}function sd(n,{ledger:e=!1}={}){const t=[];if(t.push(`# The Chronicle of ${n.partyName}`,""),n.delves.length===0)return t.push("_Nothing has happened yet._"),t.join(`
`);for(const i of n.delves){t.push(`## Delve ${ay(i.number)}${i.theme?` — ${i.theme}`:""}`,"");const s=[i.difficulty&&`**Difficulty:** ${i.difficulty}`,i.depth&&`**Depth:** ${i.depth}`,i.condition&&`**Wager:** ${i.condition}`,i.seed&&`**Seed:** \`${i.seed}\``].filter(Boolean);s.length&&t.push(s.join(" · "),""),i.roster.length&&t.push("**Who went down:** "+i.roster.join(", "),"");for(const r of i.rooms){t.push(`### ${r.icon||""} Room ${r.turn}${r.room?` — ${r.room}`:""}`.trim(),"");for(const o of[r.predicament,r.deliberation,r.resolution])o&&t.push(o,"");r.aside&&t.push(`_${r.aside}_`,"");for(const o of r.wounds)t.push(`- ${o}`);for(const o of r.falls)t.push(`- ${o}`);if((r.wounds.length||r.falls.length)&&t.push(""),e&&r.events.length){t.push("<details><summary>Ledger</summary>","");for(const o of r.events)t.push(`- ${o.icon} ${o.text}`);t.push("","</details>","")}}if(i.outcome){t.push(`### ${i.outcome.victory?"🏆 The way out":"☠️ The end of it"}`,""),i.outcome.epitaph&&t.push(i.outcome.epitaph,"");const r=[`**Rooms cleared:** ${i.outcome.roomsCleared??0}`,`**Score:** ${i.outcome.score??0}`,`**Gold:** ${i.outcome.gold??0}`,`**Trophies:** ${i.outcome.trophies??0}`,`**Survivors:** ${i.outcome.survivors??0}`];t.push(r.join(" · "),"")}}return t.join(`
`)}const rd={"rat-swarm":{effect:"trinket",name:"the rat-king's knot",icon:"🐀",bonus:{mind:1},text:"Deep in the tangle: a knot of nine tails, braided by no human hand. Whoever pockets it starts noticing the exits."},skeleton:{effect:"trinket",name:"a femur of surprising balance",icon:"🦴",bonus:{attack:1},text:"One femur survives the collapse, weighted like it was made for swinging. Perhaps by now it was."},"goblin-gang":{effect:"gold",name:"the toll-purse",icon:"💰",gold:15,text:"The toll-purse, fat with every honest traveler's coin the gang ever squeezed. Repossessed."},gelatinous:{effect:"potion",name:"a jar of restorative ooze",icon:"🫙",potion:{kind:"restorative-ooze",heal:6},text:"The clear stuff from its middle, scooped and jarred. Wounds close under it; nobody watches while they do."},wraith:{effect:"trinket",name:"a grave-cold ribbon",icon:"🎗️",bonus:{defense:1},text:"Where it fell: a ribbon cold as the underside of a stone. Worn at the wrist, blades slide half an inch wide."},"dragon-whelp":{effect:"coating",name:"a vial of whelp-fire",icon:"🔥",mod:{name:"whelp-fire coating",attack:2,element:"fire"},text:"The fire-gland, drained into a vial with very steady hands. Painted on steel, it remembers what it was for."},"ogre-king":{effect:"trinket",name:"the Ogre King's smallest crown",icon:"👑",bonus:{defense:2},text:"The smallest of his stacked crowns fits a human head. It has stopped one axe already — the notch proves it."},"bone-warden":{effect:"trinket",name:"a pauldron of century bone",icon:"🦴",bonus:{defense:1},text:"Its shoulder-piece outlived the rest of it: bone gone hard as kiln brick, straps still good."},"grave-mites":{effect:"materials",name:"a handful of grave-amber",icon:"🟠",count:2,text:"The mites' castings, hardened to amber. Herbalists grind it into everything and apologize for nothing."},"barrow-shade":{effect:"scroll",name:"the shade's last words",icon:"📜",spell:{name:"Barrow Chill",icon:"❄️",school:"necromantic",power:4,use:"combat",element:"frost",text:"Copied from the air where a shade stopped being."},text:"As it thins away it leaves the words it was made from, hanging in the air just long enough to copy."},"hungry-ghoul":{effect:"coating",name:"a ghoul's paralytic gland",icon:"🐍",mod:{name:"ghoul-gland venom",attack:2,venom:!0},text:"The gland behind its jaw, excised carefully. What slowed its dinners will slow yours."},"shrouded-king":{effect:"trinket",name:"the Shroud itself",icon:"👻",bonus:{mind:2},text:"Folded, the Shroud is only cloth. Worn over the shoulders, it whispers everything dead courtiers noticed."},"abbot-of-worms":{effect:"scroll",name:"the Abbot's last sermon",icon:"📖",spell:{name:"Final Benediction",icon:"✨",school:"liturgical",power:5,use:"combat",element:"holy",text:"The closing lines of a sermon preached far too long."},text:"His sermon-book is worm-eaten to lace, but the closing benediction survives — and it burns to be said aloud."},salamander:{effect:"coating",name:"a salamander gland",icon:"🦎",mod:{name:"salamander-gland coating",attack:2,element:"fire"},text:"The heat-gland comes free whole, still warm. Brushed on a blade, it holds a slow orange smolder."},"cinder-bats":{effect:"materials",name:"a pouch of wing-ash",icon:"🦇",count:2,text:"Their wings burn down to a fine bright ash the alchemists call phoenix-meal. Two good pinches."},"magma-toad":{effect:"potion",name:"a tin of toad-balm",icon:"🧴",potion:{kind:"toad-balm",heal:8},text:"The cooling mud off its back, scraped into a tin. It sets warm on a wound and takes the pain with it."},"obsidian-golem":{effect:"trinket",name:"an obsidian heart-shard",icon:"🗿",bonus:{defense:1},text:"A shard off its heart, glass-black and heavier than it looks. Carried close, it takes the edge off a blow."},"cinder-wyrm":{effect:"coating",name:"wyrm-fire, bottled",icon:"🐉",mod:{name:"wyrm-fire coating",attack:3,element:"fire"},text:"What ran in its veins fills three fingers of a vial. It has not cooled. It is not going to."},"forge-tyrant":{effect:"trinket",name:"the Tyrant's hammer-head",icon:"🔨",bonus:{attack:2},text:"The haft burned away with its owner; the head is good metal with standing opinions about being swung."},"flying-tomes":{effect:"scroll",name:"a page that surrendered",icon:"📄",spell:{name:"Loose Page",icon:"📄",school:"found",power:3,use:"utility",text:"A complete working in a fair hand. Finders keepers."},text:"One page breaks formation and glides down: a working, complete, in a fair hand. Finders keepers."},"ink-elemental":{effect:"materials",name:"a flask of living ink",icon:"🫧",count:2,text:"It settles into the flask willingly, as if it had somewhere worse to be. Alchemists thin it into everything."},"spectral-scribe":{effect:"trinket",name:"the scribe's quill",icon:"🪶",bonus:{mind:1},text:"The quill outlasts the hand. It corrects the spelling in whatever pocket it rides in."},"index-wight":{effect:"trinket",name:"the master index card",icon:"🗂️",bonus:{mind:1},text:"Its filing card, still legible: a system for finding anything. Reading it reorganizes you, slightly."},archivist:{effect:"scroll",name:"the Restricted Folio",icon:"📕",spell:{name:"Restricted Working",icon:"📕",school:"forbidden",power:6,use:"combat",text:"Nobody was cleared to read this. The margins alone are a weapon."},text:"From under the Archivist's arm: the folio no one was ever cleared to read. The margins alone are a weapon."},"grand-errata":{effect:"trinket",name:"the dearest correction",icon:"📝",bonus:{mind:2},text:"The correction slip it guarded most jealously. Whoever carries it is right slightly more often. Measurably."},"sludge-elemental":{effect:"materials",name:"reclaimed reagents",icon:"🟢",count:2,text:"Half its body was unreacted reagent. Strained through a shirt: two measures, still potent, barely angry."},"potion-rats":{effect:"potion",name:"a rat-warmed elixir",icon:"🐀",potion:{kind:"rat-warmed-elixir",heal:6},text:"One rat glowed a steadier green than the rest. The vial it swallowed is intact, and it is a healing draught."},"mutant-vine":{effect:"materials",name:"clipped mutant cuttings",icon:"🌿",count:2,text:"Cuttings, taken with respect and long tongs. They keep trying to grow. Alchemists love that in an ingredient."},"failed-homunculus":{effect:"trinket",name:"the homunculus's notes",icon:"🧪",bonus:{mind:1},text:"It kept notes on its own failure, in tiny meticulous handwriting. Peer review would have been kinder."},"mad-alchemist":{effect:"potion",name:"the masterwork draught",icon:"⚗️",potion:{kind:"masterwork-draught",heal:12},text:"His belt holds one flask he never dared drink: the masterwork. It is exactly as good as he feared it was."},"the-precipitate":{effect:"materials",name:"a core of pure precipitate",icon:"🫠",count:4,text:"At its center, everything the drains refused had refined itself pure. Four measures, humming faintly."},"castle-thrall":{effect:"gold",name:"the footman's wages",icon:"🪙",gold:12,text:"His pockets hold a lifetime of unspent wages in old silver. Bloodless, but it spends."},"bat-cloud":{effect:"materials",name:"a sheaf of wing-leather",icon:"🦇",count:1,text:"Enough fine wing-leather to interest a bookbinder or an alchemist. The party happens to know one of those."},"pale-hound":{effect:"trinket",name:"the red velvet collar",icon:"🐺",bonus:{attack:1},text:"The velvet collar, worked with a name nobody can read. Wearing it lends the wearer the hound's certainty."},"crimson-mist":{effect:"potion",name:"a phial of settled red",icon:"🌫️",potion:{kind:"settled-red",heal:8},text:"What settles out of the mist is best not examined. In a phial it keeps, and it closes wounds like it owes them."},"vampire-lord":{effect:"trinket",name:"the Lord's signet",icon:"💍",bonus:{mind:2},text:"His signet ring, older than the castle around it. Doors of good breeding still answer to it."},"the-bride":{effect:"trinket",name:"the Bride's veil",icon:"👰",bonus:{defense:2},text:"The veil is older than the Lord and stronger than mail. It has been widowed before and expects to be again."},"jar-imp":{effect:"trinket",name:"the imp's jar",icon:"🫙",bonus:{mind:1},text:"The jar that held it, unbroken. Things put inside it stay put — including, faintly, luck."},"pickled-thing":{effect:"potion",name:"the pickling liquor",icon:"🥒",potion:{kind:"pickling-liquor",heal:6},text:"The brine that kept it lively for a century. One cup, taken nose-shut, mends whatever it touches on the way down."},"root-golem":{effect:"materials",name:"a length of heartroot",icon:"🌳",count:3,text:"The taproot at its core is heartroot — pound for pound the best base reagent the bog has ever grown."},"bog-toad":{effect:"coating",name:"bog-toad milk",icon:"🐸",mod:{name:"bog-toad milk",attack:2,venom:!0},text:"Milked in the traditional way, which nobody discusses. On a blade it makes shallow cuts decisive."},"bog-witch":{effect:"scroll",name:"the Witch's receipt-book",icon:"🍲",spell:{name:"the Witch's Receipt",icon:"🍲",school:"kitchen",power:5,use:"utility",text:"Most of her pages were soup. This one is not, and it works."},text:"Her receipt-book, dinner-stained. Most pages are soup. One page is not soup, and it works."},"the-cauldron":{effect:"potion",name:"a ladle of the last soup",icon:"🍲",potion:{kind:"last-soup",heal:12},text:"What the Cauldron wanted, it seems, was to be wanted. Its final simmer is a mending broth of genuine quality."},"frost-wisp":{effect:"coating",name:"a pinch of wisp-rime",icon:"❄️",mod:{name:"wisp-rime coating",attack:2,element:"frost"},text:"The rime it left behind never quite melts. Rubbed along an edge, the metal drinks the cold and keeps it."},"ice-crawler":{effect:"trinket",name:"pick-leg greaves",icon:"🕷️",bonus:{defense:1},text:"Two of its legs, lashed on as shin-guards. Ugly, chitinous, and better than what the front rank had."},"thawed-dead":{effect:"gold",name:"a frozen soldier's pay",icon:"🪙",gold:10,text:"His pay-purse thaws slower than he did. Old coin, honest weight, no further use to the previous owner."},"cinder-imp":{effect:"coating",name:"the imp's spark",icon:"🔥",mod:{name:"imp-spark coating",attack:2,element:"fire"},text:"The spark it wore like a heart goes into a tinderbox willingly. Painted thin, it makes steel argue hotter."},"mad-pyromancer":{effect:"scroll",name:"the Exile's Working",icon:"🔥",spell:{name:"the Exile's Working",icon:"🔥",school:"forbidden",power:6,use:"combat",element:"fire",text:"Exactly as illegal as advertised."},text:"The working that got him exiled, folded eight times against his chest. It is exactly as illegal as advertised."},"glacier-heart":{effect:"trinket",name:"a splinter of the Heart",icon:"💠",bonus:{defense:2},text:"A splinter of the Heart, already frosting the pocket it rides in. Blows land on the wearer like they had second thoughts."}},oy={swarm:{effect:"materials",name:"a residue of the swarm",icon:"🧫",count:1,text:"What {monster} leaves behind scrapes up into a measure of the residue alchemists are always asking about."},armored:{effect:"trinket",name:"a plate of scavenged armor",icon:"🛡️",bonus:{defense:1},text:"A plate off {monster} comes away intact, and the straps of the last owner's gear fit it well enough."},ethereal:{effect:"materials",name:"a wisp of ectoplasm",icon:"👻",count:1,text:"Where {monster} stopped being, something silver settles into the jar. The alchemists have a word for it and a price."},venomous:{effect:"coating",name:"a harvested venom sac",icon:"🐍",mod:{name:"harvested venom",attack:1,venom:!0},text:"The venom sac of {monster}, drawn whole. Its grudge outlives it, and now works for the party."},slow:{effect:"trinket",name:"a ponderous hide",icon:"🥾",bonus:{defense:1},text:"The hide of {monster} cuts into something between a cloak and a wall. Slower now, but so is everything hitting you."}},ly={effect:"trinket",name:"a trophy of the kill",icon:"🏆",bonus:{attack:1},text:"Cut from {monster}: a trophy with enough menace left in it to lend some. The chroniclers will want to sketch it."};function cy(n){Object.assign(rd,n)}function hy(n){return rd[n==null?void 0:n.kind]||oy[n==null?void 0:n.trait]||ly}let va=0;function ad(n){return Object.entries(n||{}).map(([e,t])=>`+${t} ${e}`).join(", ")}function Cc(n,e){const t=hy(e);va++;let i="";switch(t.effect){case"trinket":{const r=n.assignEquipment({id:`drop-${(e==null?void 0:e.kind)||"unknown"}-${va}`,type:"equipment",name:t.name,icon:t.icon,slot:"trinket",bonus:{...t.bonus},bestFor:null,text:t.text.replace("{monster}",(e==null?void 0:e.name)||"the fallen thing")});i=`a trinket (${ad(t.bonus)}), now worn by ${(r==null?void 0:r.name)||"no one"}`;break}case"coating":{const r=n.living().reduce((a,l)=>a.attack>=l.attack?a:l);r.addWeaponMod({...t.mod});const o=t.mod.element?`, ${t.mod.element}`:t.mod.venom?", venom":"";i=`a weapon coating (+${t.mod.attack} attack${o}), applied to ${r.name}'s weapon`;break}case"potion":n.potions.push({...t.potion}),i=`a potion (heals ${t.potion.heal}), added to the satchel`;break;case"materials":n.addGold(t.count*8),i=`reagents worth ${t.count*8} gold to the right buyer`;break;case"scroll":n.grimoire.push({...t.spell,id:`drop-${(e==null?void 0:e.kind)||"unknown"}-${va}`,source:"found"}),i=`a scroll of ${t.spell.name} (${t.spell.use}, power ${t.spell.power}), added to the grimoire`;break;case"gold":n.addGold(t.gold),i=`${t.gold} gold`;break}const s={name:t.name,icon:t.icon,effect:t.effect,from:(e==null?void 0:e.name)||"unknown"};return(n.trophies||(n.trophies=[])).push(s),{source:t.name,find:"drop",drop:s,text:`${t.icon} ${dy((e==null?void 0:e.name)||"the monster")} drops ${t.name}: ${i}.`}}function dy(n){return n&&n.charAt(0).toUpperCase()+n.slice(1)}const cs=n=>n&&n.charAt(0).toUpperCase()+n.slice(1),uy={pillars:"stone",rubble:"stone",boulder:"stone",sarcophagus:"stone",crates:"wood",shelves:"wood",brazier:"flame",font:"water",spout:"water",portcullis:"metal",anvil:"metal",mirror:"glass",pit:"void",chasm:"void",spikes:"metal"},fy={fire:{wood:{id:"blaze",icon:"🔥",burn:3,cover:-1,light:2,consumes:!0,text:n=>`The fire takes ${n} and does not stop at the monster. The room burns: 3 damage a round while it lasts, the cover burns away with it, and 2 marches of light to burn by.`},water:{id:"steam",icon:"♨️",cover:1,monsterAtk:-2,selfHarm:1,text:n=>`The working hits ${n} and the room fills with scalding steam. The monster is fighting half-blind: -2 to what it hits for, and the fog is cover — but nobody in a boiling room gets off clean, and the party takes 1.`},flame:{id:"flare",icon:"💥",damage:6,light:1,consumes:!0,text:n=>`${cs(n)} takes the working like a bellows and erupts: 6 damage, and the flare throws a march of light down the passage. It burns its fuel doing it — the bracket is cold afterwards.`},metal:{id:"searing",icon:"🌡️",damage:2,text:n=>`${cs(n)} glows and spits where the working lands: 2 damage to whatever is near it.`},void:{id:"updraft",icon:"🌋",damage:3,cover:-1,text:n=>`The fire finds ${n} and the shaft draws like a chimney: 3 damage in the updraft, and nothing to shelter behind while it roars.`}},shock:{water:{id:"conduction",icon:"⚡",damage:7,selfHarm:1,text:n=>`The water in ${n} carries the working across the whole floor: 7 damage — and the party is standing on the same floor, for 1 back.`},metal:{id:"arc",icon:"⚡",damage:4,text:n=>`The working finds ${n} and arcs off it into everything nearby: 4 extra damage.`},glass:{id:"shiver",icon:"🪞",damage:2,consumes:!0,text:n=>`${cs(n)} shivers, flashes and comes apart: 2 damage in flying silver.`},void:{id:"earthing",icon:"🕳️",monsterAtk:-2,selfHarm:1,text:n=>`The working earths itself down ${n}, and the whole floor jumps: the monster fights off-balance for 2 less, and everyone who felt it takes 1.`}},frost:{water:{id:"glaze",icon:"🧊",monsterAtk:-3,selfHarm:1,text:n=>`${cs(n)} freezes and the glaze spreads across the floor. The monster cannot keep its feet: -3 to what it hits for. Neither can the party, quite: 1 damage.`},flame:{id:"douse",icon:"💨",cover:1,light:-2,consumes:!0,text:n=>`The working puts ${n} out. Smoke to fight behind, and 2 marches of light gone with it.`},stone:{id:"brittle",icon:"❄️",damage:2,text:n=>`Frost gets into ${n} and cracks it apart: 2 damage in splinters of cold stone.`},void:{id:"rime-bridge",icon:"🧊",cover:2,selfHarm:1,text:n=>`Frost sheets across ${n} until it will bear weight — a bridge to fight from, and a bad place to slip: 2 cover, 1 damage.`}},holy:{stone:{id:"consecrate",icon:"🌟",damage:3,undeadQuelled:!0,text:n=>`The light soaks into ${n}. Whatever was going to rise out of it stays put, and the working bites for 3.`},glass:{id:"kindled-glass",icon:"🪞",revealEthereal:!0,damage:2,text:n=>`${cs(n)} catches the light and throws it everywhere at once: 2 damage, and nothing in the room can hide behind being half-there.`},water:{id:"blessing",icon:"⛲",heal:4,text:n=>`The working settles into ${n} and stays there. The party drinks: 4 healed.`}}};function py(n){return!!n&&n.aoe===!0}function od(n,e){if(!py(n)||!n.element)return[];const t=fy[n.element];if(!t)return[];const i=[];for(const s of Lr(e)){const r=uy[s.id],o=t[r];o&&i.push({...o,feature:s.id,featureName:s.name,matter:r,element:n.element,text:o.text(s.name)})}return i}function my(n){const e={damage:0,burn:0,cover:0,monsterAtk:0,light:0,selfHarm:0,heal:0,undeadQuelled:!1,revealEthereal:!1,consumed:[],notes:[]};for(const t of n)e.damage+=t.damage||0,e.burn+=t.burn||0,e.cover+=t.cover||0,e.monsterAtk+=t.monsterAtk||0,e.light+=t.light||0,e.selfHarm+=t.selfHarm||0,e.heal+=t.heal||0,t.undeadQuelled&&(e.undeadQuelled=!0),t.revealEthereal&&(e.revealEthereal=!0),t.consumes&&e.consumed.push(t.feature),e.notes.push({source:t.featureName,text:`${t.icon} ${t.text}`});return e}const er=(n,e,t=0)=>{const i=(n==null?void 0:n.w)??6,s=(n==null?void 0:n.h)??6;return Math.min(i,s)>=e&&i*s>=t},Wi={column:{id:"column",name:"Column",icon:"⏸️",fits:()=>!0,frontage:1,incomingMult:.55,attackMult:1,flanking:!1,areaShare:.8,tell:n=>`The ${n} is too tight to spread out: the party files up, one blade forward.`,effect:"One blade forward and one thing able to reach it: nearly half the damage a round, and only the front rank swinging."},line:{id:"line",name:"Line",icon:"➖",fits:n=>er(n,4),frontage:2,incomingMult:1,attackMult:1,flanking:!0,areaShare:1,tell:()=>"The party spreads into a line, two forward and two behind.",effect:"The ordinary shape of a fight, and the one that leaves room to work round the sides."},shieldwall:{id:"shieldwall",name:"Shield Wall",icon:"🛡️",fits:n=>er(n,4),frontage:2,incomingMult:.7,attackMult:.75,flanking:!1,areaShare:1.25,tell:()=>"Shields lock along the front rank and the party stops trying to win quickly.",effect:"A third less damage a round and a quarter less dealt — but packed tight, so anything with a blast radius hurts more."},wedge:{id:"wedge",name:"Wedge",icon:"🔺",fits:n=>er(n,5,30),frontage:3,incomingMult:1.3,attackMult:1.2,flanking:!0,areaShare:1,tell:()=>"The party drives in as a wedge, everything committed forward.",effect:"A fifth more damage dealt, a third more taken, and three of them swinging instead of two."},loose:{id:"loose",name:"Loose Order",icon:"🌐",fits:n=>er(n,6,48),frontage:2,incomingMult:.85,attackMult:.85,flanking:!1,areaShare:.5,tell:n=>`There is room enough in the ${n} to fight spread out, well apart.`,effect:"A little less given and a little less taken, and only half of any blast reaches the party."}},gy=Object.keys(Wi);function ld(n){return gy.filter(e=>Wi[e].fits(n))}function vy(n,e,t=Math.random){var c,d,h,f;if(!e||!e.w||!e.h)return"line";const i=ld(e),s={};for(const p of i)s[p]=1;const r=n.living().length>0&&n.members.reduce((p,g)=>p+Math.max(0,g.health),0)/n.members.reduce((p,g)=>p+g.maxHealth,0)<.4;i.length>1&&(s.column=r?2:.15);const o=e==null?void 0:e.monster;(o==null?void 0:o.trait)==="swarm"&&s.loose&&(s.loose+=3),o!=null&&o.isBoss&&s.shieldwall&&(s.shieldwall+=2),o&&o.attack>=12&&s.shieldwall&&(s.shieldwall+=2),o&&o.health<=12&&s.wedge&&(s.wedge+=2),(c=n.hasPersonality)!=null&&c.call(n,"brave")&&s.wedge&&(s.wedge+=2.5),(d=n.hasPersonality)!=null&&d.call(n,"reckless")&&s.wedge&&(s.wedge+=3),(h=n.hasPersonality)!=null&&h.call(n,"craven")&&s.shieldwall&&(s.shieldwall+=3),(f=n.hasPersonality)!=null&&f.call(n,"cunning")&&s.loose&&(s.loose+=2),n.living().length<=2&&s.wedge&&(s.wedge*=.3);const a=Object.values(s).reduce((p,g)=>p+g,0);let l=t()*a;for(const[p,g]of Object.entries(s))if(l-=g,l<=0)return p;return i[i.length-1]||"line"}function yy(n,e){const t=Wi[n]||Wi.line;return{id:t.id,name:t.name,icon:t.icon,frontage:t.frontage,incomingMult:t.incomingMult,attackMult:t.attackMult,flanking:t.flanking,areaShare:t.areaShare,tell:t.tell((e==null?void 0:e.shape)||"room"),effect:t.effect}}const br=new Map,cd=new Map;function Lt(n){if(!(n!=null&&n.id)||!Array.isArray(n.options))throw new Error("an encounter needs an id and options");return br.set(n.id,n),n.roomType&&cd.set(n.roomType,n),n}function _y(n){return br.get(n)||null}function hd(n){return n?n.encounterId&&br.has(n.encounterId)?br.get(n.encounterId):cd.get(n.type)||null:null}const xy={trap:["mechanism","hazard"],monster:["creature"],boss:["creature"],treasure:["valuables","container"],vault:["valuables","container"],library:["books","study"],shrine:["sacred"],lab:["apparatus","substances"],materials:["substances"],disaster:["hazard","unstable-environment"]};function by(n,e=null){const t=new Set(xy[n==null?void 0:n.type]||[]);for(const i of(e==null?void 0:e.affordances)||[])t.add(i);try{for(const i of Lr(n)||[])for(const s of i.tags||[])t.add(s)}catch{}return n!=null&&n.monster&&(n.monster.undead&&t.add("undead"),n.monster.bribable&&t.add("people")),t}function wy(n,e,t){const i=e.capabilities(),s=by(t,n),r=[],o=[];for(const a of n.options){const l=a.requires||[],c=l.filter(m=>!i.has(m)),d=(a.affordances||[]).filter(m=>!s.has(m)),h=a.when?!!a.when(e,t):!0,f=l.length?ch(l):new Set,p=[...f].filter(m=>i.has(m)).length,g=c.length>0&&p>=2;(c.length===0||g)&&d.length===0&&h?r.push({id:a.id,name:a.name,desc:a.desc,weight:a.weight,depth:p,bearing:[...f],improvised:g,onlyWhenOwned:!!a.onlyWhenOwned,unlockedBy:l.map(m=>({capability:m,holders:e.capabilityHolders(m).map(u=>{var x;return u.source==="character"?u.member.name:`${u.member.name} (${((x=u.equipment)==null?void 0:x.name)||u.source})`})}))}):o.push({id:a.id,missingCaps:c,missingAffordances:d,conditionBlocked:!h})}return dd({kind:"evaluate",encounterId:n.id,roomType:(t==null?void 0:t.type)||null,capabilitiesPresent:[...i],affordances:[...s],available:r.map(a=>({id:a.id,unlockedBy:a.unlockedBy})),gatedOut:o}),r}const ya={improvised:{score:-10,label:"improvised"},1:{score:0,label:null},2:{score:10,label:"assisted"},3:{score:25,label:"mastered"}};function Sy(n,e){return e?ya.improvised:ya[Math.min(3,n)]||ya[1]}function My(n,e,t,i,s={}){const r=n.options.find(a=>a.id===e),o=n.resolveOption(e,t,i);if(((r==null?void 0:r.requires)||[]).length>0&&(o==null?void 0:o.success)!==!1){const a=t.capabilities(),l=ch(r.requires),c=s.depth??[...l].filter(f=>a.has(f)).length,d=s.improvised??r.requires.some(f=>!a.has(f)),h=Sy(c,d);if(h.score){const f=h.score<0?-Math.min(-h.score,t.score):h.score;f&&(t.addScore(f),o.mastery={...h,depth:c,score:f})}}return dd({kind:"resolve",encounterId:n.id,roomType:(i==null?void 0:i.type)||null,optionId:e,success:(o==null?void 0:o.success)!==!1}),o}const Lc=400;let Nn=[];function dd(n){Nn.push({...n,at:Nn.length}),Nn.length>Lc&&(Nn=Nn.slice(-Lc))}function Ey(){return Nn.slice()}function Ty(){Nn=[]}function Ay(){const n={},e=(i,s)=>{n[i]=n[i]||{optionsUnlocked:0,chosen:0},n[i][s]++},t=new Map;for(const i of Nn)if(i.kind==="evaluate")for(const s of i.available){const r=s.unlockedBy.map(o=>o.capability);r.length&&t.set(`${i.encounterId}:${s.id}`,r);for(const o of r)e(o,"optionsUnlocked")}else if(i.kind==="resolve")for(const s of t.get(`${i.encounterId}:${i.optionId}`)||[])e(s,"chosen");return n}Lt({id:"astronomers-chamber",title:"The Astronomer's Chamber",situation:"A brass orrery fills the room, its planets moving incorrectly — and the walls have begun to turn with them.",affordances:["mechanism","astral","unstable-environment"],options:[{id:"repair-gears",name:"Repair the Gears",desc:"Still the mechanism and salvage what it sheds",requires:["tinkering"],affordances:["mechanism"],weight:1.5},{id:"correct-orrery",name:"Correct the Orrery",desc:"Set the planets right and read what they say",requires:["astrology"],affordances:["astral"],weight:1.5},{id:"divine-instability",name:"Divine the Instability",desc:"Ask which motion is the dangerous one",requires:["divination"],affordances:["astral"],weight:1},{id:"recognize-model",name:"Recognize the Model",desc:"Name the cosmology; note it for the record",requires:["scholarship"],affordances:["mechanism","astral"],weight:1},{id:"steady-ground",name:"Hold the Stationary Floor",desc:"Put the party on the part that is not turning",requires:["warcraft"],weight:1},{id:"hurry-through",name:"Hurry Through",desc:"Run the turning floor and hope"}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"repair-gears":return e.addGold(8),e.addScore(20),{success:!0,narrative:"🔧 The gears are coaxed still and the walls stop. A stripped bronze pinion goes into the satchel: +8 gold, +20 score."};case"correct-orrery":return e.addScore(20),e.starBlessed=!0,{success:!0,narrative:"🔭 The planets are set right and the room settles. The corrected heavens counsel the party: the next fight begins under a favourable aspect. +20 score."};case"divine-instability":return e.addScore(15),e.forewarned=!0,{success:!0,narrative:"🔮 The dangerous motion is named before it completes. The party crosses untouched, and forewarned of the next snare in their path. +15 score."};case"recognize-model":return e.addScore(30),{success:!0,narrative:"📖 The cosmological model is recognized and recorded — worth rather more to the right buyer than the brass it turns on. +30 score."};case"steady-ground":return e.addScore(10),{success:!0,narrative:"🎯 The stationary floor is found and held; the party crosses in order while the room turns around them. +10 score."};case"hurry-through":default:return e.takeDamage(2),{success:!1,damage:2,narrative:"💫 The floor turns underfoot mid-crossing: 2 damage, and the party comes out of it in no order at all."}}}});Lt({id:"sealed-laboratory",title:"The Sealed Laboratory",situation:"A door bears the signs of Mercury, Venus, Mars, Jupiter, Saturn and the Sun. It has no handle, and the room beyond it is plainly still in use.",affordances:["mechanism","astral","apparatus","study"],options:[{id:"read-correspondences",name:"Read the Correspondences",desc:"The signs are a system; follow it",requires:["correspondence"],affordances:["astral"],weight:2},{id:"planetary-sequence",name:"Work the Planetary Sequence",desc:"The order is astronomical, not decorative",requires:["astrology"],affordances:["astral"],weight:1.5},{id:"material-symbolism",name:"Read the Metals",desc:"Each planet is also a metal, and the metals are the lock",requires:["alchemy"],affordances:["apparatus"],weight:1.5},{id:"reconcile-traditions",name:"Reconcile the Traditions",desc:"Two systems overlap here; use both",requires:["scholarship"],weight:1.5},{id:"divine-sequence",name:"Divine the Order",desc:"Ask which sign opens it and which is the trap",requires:["divination"],weight:1},{id:"force-the-door",name:"Force the Door",desc:"It is only a door"},{id:"leave-sealed",name:"Leave It Sealed",desc:"Some laboratories are sealed on purpose"}],resolveOption(n,e,t){t.cleared=!0;const i=(s,r)=>(e.addGold(15),e.addScore(r),{success:!0,narrative:s});switch(n){case"read-correspondences":return i("🔗 The signs are not a lock but an argument, and it can be followed to its conclusion. The door opens on a working laboratory: +15 gold, +35 score.",35);case"planetary-sequence":return i("🔭 Pressed in the order the planets actually stand tonight, the signs give. +15 gold, +30 score.",30);case"material-symbolism":return i("⚗️ Each sign is its metal, and the metals want touching in the order of their melting. +15 gold, +30 score.",30);case"reconcile-traditions":return i("☯️ Two traditions are quarrelling on one door; reconciled, they agree to open it. +15 gold, +35 score.",35);case"divine-sequence":return e.addScore(15),e.forewarned=!0,{success:!0,narrative:"🔮 The sequence is read before it is attempted — and so is the sign that would have taken a hand off. +15 score, and the next snare is known."};case"force-the-door":return e.takeDamage(4),e.addScore(10),e.addGold(8),{success:!1,damage:4,narrative:"💥 The door yields to shoulders and a crowbar, and the ward on it yields something back: 4 damage, and only what could be grabbed on the way past. +8 gold scraped up."};case"leave-sealed":default:return{success:!0,narrative:"🚪 The party leaves the laboratory sealed, as several previous parties evidently decided to."}}}});Lt({id:"monster-grievance",title:"The Monster With a Grievance",situation:"Something large blocks the passage and does not attack. It says, in a language it did not expect anyone to answer, that adventurers stole something from its people.",affordances:["creature","people"],options:[{id:"negotiate-grievance",name:"Negotiate",desc:"It is talking. Talk back",requires:["rhetoric"],affordances:["people"],weight:2},{id:"translate-claim",name:"Answer in Its Own Tongue",desc:"Nobody has done that in a long time",requires:["scholarship"],weight:2},{id:"identify-artifact",name:"Identify the Disputed Thing",desc:"Recognize what was actually taken",requires:["scholarship"],weight:1.5},{id:"investigate-claim",name:"Investigate the Claim",desc:"Find out whether it is even true",requires:["scholarship"],weight:1},{id:"slip-past-grievance",name:"Slip Past It",desc:"It is watching the passage, not the ceiling",requires:["roguery"],weight:1},{id:"fight-grievance",name:"Fight It",desc:"Talking is not the party's strength"}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"negotiate-grievance":return e.addScore(25),e.addGold(20),{success:!0,narrative:"🤝 The grievance is real, old, and settleable. It stands aside, and pays 20 gold out of a hoard it says was never the point. +25 score."};case"translate-claim":return e.addScore(30),e.addGold(15),{success:!0,narrative:"🌐 Answered in its own tongue, it stops being a monster in the passage and becomes someone with a complaint. It gives the party passage and a gift of its own reagents: +15 gold, +30 score."};case"identify-artifact":return e.addScore(30),e.addGold(35),{success:!0,narrative:"🏺 The disputed thing is named, dated, and — awkwardly — recognized as something a previous party sold. It settles for the coin that changed hands: 35 gold to the party for the honesty. +30 score."};case"investigate-claim":return e.addScore(20),{success:!0,narrative:"📖 The claim checks out in every particular, which it did not expect anyone to bother doing. It steps out of the way. +20 score."};case"slip-past-grievance":return e.addScore(15),{success:!0,narrative:"🗡️ The party goes over and around while it watches the floor. Nothing is settled, but nothing is spent either. +15 score."};case"fight-grievance":default:return e.takeDamage(6),e.addScore(15),{success:!1,damage:6,narrative:"⚔️ It is not a difficult fight, because it was not expecting one. That is most of what is wrong with it: 6 damage, and the passage is clear."}}}});Lt({id:"appraiser-test",rides:["treasure","vault"],title:"A Choice Between Treasures",situation:"Three chests lie ahead, each promising wealth. Only one holds real value; the others are cursed, trapped, or simply weighted lead. You have time for one.",affordances:["valuables","hazard"],options:[{id:"appraise-chests",name:"Appraise Each Chest",desc:"Examine them carefully and identify the true prize",requires:["observation"],affordances:["valuables"],weight:2},{id:"knowledge-mark",name:"Recognize the Maker's Mark",desc:"The goldsmith's seal tells you which is real",requires:["scholarship"],affordances:[],weight:1.5},{id:"observation-pick",name:"Notice What Others Missed",desc:"One chest has a scratch where the lock was tested",requires:["observation"],affordances:[],weight:1},{id:"guess-heavy",name:"Take the Heaviest",desc:"Gold is heavy. Probably.",requires:[]}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"appraise-chests":return e.gold+=40,e.addScore(25),e.forewarned=!0,{success:!0,narrative:"💰 Examined closely, the real chest is obvious — and so is how the other two were rigged, which is a lesson that keeps. +40 gold, +25 score, and the next snare is already understood."};case"knowledge-mark":return e.gold+=35,e.addScore(20),{success:!0,narrative:"🏺 The mark of Maestro Cellini seals the chest — his work alone was worth the journey. +35 gold, +20 score."};case"observation-pick":return e.gold+=30,e.addScore(18),{success:!0,narrative:"👁️ That faint scratch tells the story: this chest was opened, tested, and resealed. The real prize. +30 gold, +18 score."};case"guess-heavy":default:return e.takeDamage(5),e.forcedFormation="loose",e.gold+=10,{success:!1,damage:5,narrative:"💥 The heaviest chest was heavy because of what was packed around the lead. 5 damage, the party scattered across the floor, and only 10 gold in the wreckage — and it meets the next room spread out and unready."}}}});Lt({id:"experimental-crossroads",rides:["treasure","corridor"],title:"A Mechanism in Pieces",situation:"A elaborate mechanism blocks the passage, broken into components. It was clearly built to open the far door, but whether it can be reassembled, or should be, is unclear. There are three similar passages around it.",affordances:["mechanism","apparatus"],options:[{id:"experiment-rebuild",name:"Experiment With Assembly",desc:"Try combinations until something works",requires:["tinkering"],affordances:["mechanism","apparatus"],weight:2},{id:"alchemy-bypass",name:"Dissolve the Lock",desc:"The mechanism is guarding something. Dissolve it.",requires:["alchemy"],affordances:["apparatus"],weight:1.5},{id:"tinkering-solve",name:"Understand and Fix It",desc:"This was engineered carefully. Restore it.",requires:["tinkering"],affordances:["mechanism"],weight:1.5},{id:"take-detour",name:"Take One of the Side Passages",desc:"Avoid the mechanism entirely",requires:[]}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"experiment-rebuild":return e.addGold(15),e.addScore(20),{success:!0,narrative:"🧪 Trial and error yields insight. The mechanism opens, and what its builder left in the works rewards the experiment. +15 gold, +20 score."};case"alchemy-bypass":return e.addScore(15),{success:!0,narrative:"⚗️ The lock dissolves. The mechanism doesn't open the door, but it doesn't need to now. +15 score."};case"tinkering-solve":return e.addScore(22),e.forcedFormation="shieldwall",{success:!0,narrative:"🔧 The mechanism is understood and restored — it was a door-holder, and it shows the party how the builders meant to stand in this passage. The party takes that shape and keeps it. +22 score, and a shield wall into the next fight."};case"take-detour":default:return e.supply=Math.max(0,e.supply-2),e.addScore(8),{success:!0,narrative:"🛤️ The side passage goes round, and round, and eventually through. Two more marches of oil burned than the direct road would have cost. +8 score."}}}});Lt({id:"healer-trial",rides:["shrine","corridor"],title:"A Companion Falls Suddenly Ill",situation:"One party member collapses with a fever that will only worsen. The next room is impassable without someone strong enough to navigate. Medicine might help immediately; preparation would have prevented this.",affordances:[],options:[{id:"heal-directly",name:"Apply Direct Healing",desc:"A healing working brings the fever down",requires:["medicine"],affordances:[],weight:2},{id:"medicine-diagnose",name:"Diagnose and Treat",desc:"Medical knowledge identifies the cause and cure",requires:["medicine"],affordances:[],weight:2},{id:"naturalphil-remedy",name:"Apply Natural Remedy",desc:"A non-occult solution is sometimes strongest",requires:["alchemy"],affordances:[],weight:1.5},{id:"push-through",name:"Press On Without Treatment",desc:"They'll recover or they won't",requires:[]}],resolveOption(n,e,t){t.cleared=!0;const i=e.living(),s=i.length>0?i[0]:null;switch(n){case"heal-directly":return s&&s.heal(3),e.addScore(15),{success:!0,narrative:"💚 The fever breaks under the working's touch. "+((s==null?void 0:s.name)||"The member")+" is steady again. +15 score."};case"medicine-diagnose":return s&&s.heal(4),e.addScore(18),{success:!0,narrative:"💊 The diagnosis is swift: a blood imbalance, easily corrected. Medical knowledge and a minute's treatment restore full vigor. +18 score."};case"naturalphil-remedy":return s&&s.heal(3),e.addScore(16),{success:!0,narrative:"🌿 The cure is mundane: cool water, rest, and specific herbs gathered from the last room. Within the hour, the crisis passes. +16 score."};case"push-through":default:return s&&s.takeDamage(6),e.forcedFormation="column",{success:!1,damage:6,narrative:`🤒 ${(s==null?void 0:s.name)||"The stricken member"} is carried rather than treated, and the fever takes its price in full: 6 damage, and the party files through the next passage strung out around the litter.`}}}});Lt({id:"memory-reconstruction",rides:["library"],title:"A Puzzle From the Past",situation:"On the floor lies a mosaic, shattered into fragments. Its original pattern would show the way forward, but the image is fractured. Several walls hold clues: a scratched mural, a partial inscription, numbered tiles arranged in an earlier room.",affordances:["books","mechanism"],options:[{id:"reconstruct-memory",name:"Reconstruct From Memory",desc:"Recall every detail from earlier passages and rebuild the image",requires:["scholarship"],affordances:[],weight:2},{id:"imagine-solution",name:"Imagine What It Should Be",desc:"Creative insight fills the gaps",requires:["conjuring"],affordances:[],weight:1.5},{id:"knowledge-pattern",name:"Recognize the Pattern",desc:"You have seen this design before, on a floor much like this one",requires:["observation"],affordances:["books"],weight:1.5},{id:"smash-wall",name:"Break Through the Wall",desc:"The hard way",requires:[]}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"reconstruct-memory":return e.forewarned=!0,e.forcedFormation="line",e.addScore(20),{success:!0,narrative:"🧠 Every detail aligns. The mosaic rebuilds perfectly, and what it shows is the floor plan of the rooms ahead — where the snare is, and where there is room to spread out before it. +20 score."};case"imagine-solution":return e.addScore(16),e.gold+=10,{success:!0,narrative:"✨ Your creative instinct pieces together something that was never there but might have been. A hidden cache reveals itself. +10 gold, +16 score."};case"knowledge-pattern":return e.addScore(18),{success:!0,narrative:"📖 This is a map of the crypt of San Severino. You know its layout from history. The path forward is obvious. +18 score."};case"smash-wall":default:return e.takeDamage(3),e.supply=Math.max(0,e.supply-1),e.forcedFormation="column",{success:!1,damage:3,narrative:"💥 The wall yields to force and the ceiling comes with it. 3 damage, a march of oil spent clearing the rubble, and what is left is a hole the party can only go through one at a time."}}}});Lt({id:"musician-harmony",rides:["shrine","disaster"],title:"A Room in Discord",situation:"The air thrums with conflicting resonances. Three different frequencies echo in the chamber, each slightly out of tune with the others. The dissonance is growing, and the walls show stress fractures. Silence would fail: something here needs to be singing.",affordances:["sacred","unstable-environment"],options:[{id:"music-harmony",name:"Sing the Harmony",desc:"A voice trained in music can unify the three tones",requires:["correspondence"],affordances:[],weight:2},{id:"harmony-attune",name:"Attune the Resonances",desc:"Bring them into consonance through sympathetic magic",requires:["correspondence"],affordances:["sacred"],weight:2},{id:"correspondence-solve",name:"Understand and Link Them",desc:"The three frequencies correspond to three principles that must agree",requires:["correspondence"],affordances:[],weight:1.5},{id:"endure-discord",name:"Endure the Discord",desc:"Push through the noise",requires:[]}],resolveOption(n,e,t){t.cleared=!0;const i=e.living();switch(n){case"music-harmony":return i.length>0&&i[0].heal(2),e.addScore(18),{success:!0,narrative:"🎵 A perfect voice finds the third harmony. The three frequencies lock into a single, beautiful chord. The walls settle and the front-rank member feels renewed. +18 score."};case"harmony-attune":for(const s of e.living())s.heal(2);return e.starBlessed=!0,e.addScore(22),{success:!0,narrative:"🎶 The resonances snap into attunement. The chamber sings with one voice, the party heals 2 apiece, and they carry the chord out with them: the next fight comes 1 damage a round softer. +22 score."};case"correspondence-solve":return e.addScore(16),{success:!0,narrative:"🔗 The three principles understand each other. Tension dissolves; the frequencies fade into silence, and the walls steady. +16 score."};case"endure-discord":default:return e.takeDamage(3),e.forcedFormation="loose",{success:!1,damage:3,narrative:"🔊 The discord tears at the ears and nerves, and the party comes out of it well apart, each of them having walked away from the sound in a different direction. 3 damage, and no line to speak of."}}}});Lt({id:"observer-secret",rides:["corridor","treasure"],title:"A Room With Hidden Reserves",situation:"The passage looks bare — stone, dust, and the bare minimum of architecture. But something nags. There is excess here somewhere. Finding it requires attention that casual exploration will never provide.",affordances:[],options:[{id:"observe-closely",name:"Observe Every Detail",desc:"Spend time examining everything the others missed",requires:["observation"],affordances:[],weight:2},{id:"search-methodical",name:"Search Methodically",desc:"Systematic inspection finds what casual glances miss",requires:["roguery","scholarship"],affordances:[],weight:1.5},{id:"divine-presence",name:"Divine What's Here",desc:"Sense the hidden without seeing",requires:["divination"],affordances:[],weight:1},{id:"hurry-past",name:"Move Along",desc:"Nothing here",requires:[],onlyWhenOwned:!0}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"observe-closely":return e.addGold(15),e.gold+=15,e.addScore(18),{success:!0,narrative:"👁️ Hidden in plain sight: an alcove holding coin and small valuables, overlooked by a hundred hurrying parties. +15 gold, +18 score."};case"search-methodical":return e.addGold(8),e.gold+=12,e.addScore(14),{success:!0,narrative:"🔎 Systematic searching reveals a cache in the oldest stones. Not as rich as it might have been, but real. +20 gold, +14 score."};case"divine-presence":return e.gold+=8,e.addScore(10),{success:!0,narrative:"🔮 Divine sense finds what mortal eyes miss: a handful of coin scattered in crevices. +8 gold, +10 score."};case"hurry-past":default:return e.addScore(3),{success:!0,narrative:"⏭️ Nothing here. You move on, and never know what you passed."}}}});Lt({id:"haunted-armour",rides:["monster","corridor"],title:"The Armour That Follows",situation:"A suit of plate has been standing in the corner, and is now standing rather closer. Nothing is wearing it. It has not attacked; it is waiting to be addressed.",affordances:["creature","undead","mechanism"],options:[{id:"commune-armour",name:"Speak With Whatever Wears It",desc:"Something is in there. Ask it what it wants",requires:["conjuring"],affordances:["undead"],weight:2},{id:"name-the-owner",name:"Name Its Owner",desc:"The heraldry on the breastplate is not anonymous",requires:["scholarship"],weight:1.5},{id:"strip-insignia",name:"Strip the Insignia",desc:"Whatever binds it is riveted on, and rivets come off",requires:["roguery"],affordances:["mechanism"],weight:1.5},{id:"read-its-gait",name:"Read Its Movement",desc:"It repeats itself, and what repeats can be walked around",requires:["warcraft"],weight:1.5},{id:"put-it-down",name:"Put It Down",desc:"Empty armour dents like full armour"}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"commune-armour":return e.addScore(28),e.forcedFormation="shieldwall",{success:!0,narrative:"🪄 It answers at length, and mostly about a siege nobody else remembers. It asks only to be told the war is over — then falls in beside the party for the next stretch, shield up. +28 score, and a shield wall into the next fight."};case"name-the-owner":return e.addScore(24),e.addGold(20),{success:!0,narrative:"🏺 The heraldry belongs to a house that ended badly and expensively. Named aloud, the armour stops following and folds up where it stands, and what is inside it is worth 20 gold. +24 score."};case"strip-insignia":return e.addScore(20),e.addGold(8),{success:!0,narrative:"🗡️ The binding is three rivets and a sealed strip of vellum. Out they come, and the plate is only plate again — with a strip of very old vellum worth keeping. +8 gold, +20 score."};case"read-its-gait":return e.addScore(18),e.forcedFormation="line",{success:!0,narrative:"🎯 Eleven paces, a turn, eleven paces back. The party crosses in the gap and comes out the far side abreast and unhurried. +18 score."};case"put-it-down":default:return e.takeDamage(4),e.forcedFormation="loose",{success:!1,damage:4,narrative:"⚔️ Empty armour does dent like full armour, and hits back like it too. 4 damage, a great deal of noise, and the party comes out of it spread across the passage."}}}});Lt({id:"duellists-challenge",rides:["corridor","monster"],title:"The Duellist's Challenge",situation:"A swordsman is sitting on a chair in the middle of the passage, and stands when the party arrives. He indicates, courteously, that one of them may pass by beating him, and that he has been here some time.",affordances:["creature","people"],options:[{id:"accept-duel",name:"Accept the Duel",desc:"Blade to blade, on his terms",requires:["warcraft"],affordances:["people"],weight:2},{id:"negotiate-terms",name:"Negotiate the Terms",desc:"He named the contest; he did not name the stakes",requires:["rhetoric"],affordances:["people"],weight:1.5},{id:"recognize-style",name:"Recognize the School",desc:"That guard has a name and a published weakness",requires:["scholarship"],weight:1.5},{id:"push-past-duellist",name:"Push Past Him",desc:"Decline, loudly, and keep walking"}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"accept-duel":return e.addScore(30),e.forcedFormation="wedge",{success:!0,narrative:"🤺 It is a real bout and a close one, and he loses it grinning. The party goes through with its blood up and its front foot forward. +30 score, and a wedge into the next fight."};case"negotiate-terms":return e.addScore(22),e.addGold(30),{success:!0,narrative:"🤝 The stakes are agreed before the blades are: purse against passage. He is a better swordsman than a bargainer, and pays out. +30 gold, +22 score."};case"recognize-style":return e.addScore(26),e.forewarned=!0,{success:!0,narrative:"📖 The guard is Bolognese, the counter to it is on a page somebody in the party has read, and the bout lasts four seconds. He takes it well, and mentions what is waiting further down. +26 score, and the next snare is known."};case"push-past-duellist":default:return e.takeDamage(5),e.forcedFormation="column",{success:!1,damage:5,narrative:"💨 He does not stop them, exactly. He simply takes a toll on the way past, one at a time, and the party is still strung out single file when the passage opens. 5 damage."}}}});Lt({id:"chessboard-floor",rides:["trap","corridor"],title:"The Chessboard Floor",situation:"The floor is laid in alternating slabs, and the pattern is not decorative — some of the squares sit a finger lower than the rest, and the ceiling above them is scored.",affordances:["mechanism","hazard"],options:[{id:"solve-progression",name:"Solve the Progression",desc:"The safe squares are a sequence, and sequences can be continued",requires:["astrology"],affordances:["mechanism"],weight:2},{id:"read-the-dust",name:"Read the Dust",desc:"Dust does not settle where things move",requires:["observation"],weight:1.5},{id:"divine-safe-square",name:"Ask Which Square Is Safe",desc:"Put the question before putting a foot down",requires:["divination"],weight:1.5},{id:"cross-in-order",name:"Cross in Order",desc:"Weight distributed, one at a time, on the tested squares",requires:["warcraft"],weight:1.5},{id:"walk-it",name:"Just Walk It",desc:"It is a floor"}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"solve-progression":return e.addScore(30),e.forewarned=!0,{success:!0,narrative:"📐 Every third square, then every fifth: the safe path is a sequence, and once it is written down the rest of the mechanism is legible too. The party crosses dry-shod and reads the next snare off the same logic. +30 score."};case"read-the-dust":return e.addScore(22),{success:!0,narrative:"👁️ Dust lies thick on the squares that never move. The party walks the dusty ones. +22 score."};case"divine-safe-square":return e.addScore(20),{success:!0,narrative:"🔮 The question is put once, at the threshold, and answered squarely enough to cross on. +20 score."};case"cross-in-order":return e.addScore(18),e.forcedFormation="column",{success:!0,narrative:"🎯 One at a time, weight where the weight has already been tested. Slow, sound, and the party is in single file at the far end. +18 score."};case"walk-it":default:{const i=Math.max(2,t.trapDamage?Math.ceil(t.trapDamage/2):4);return e.takeDamage(i),e.forcedFormation="loose",{success:!1,damage:i,narrative:`💥 It is a floor for about six paces. ${i} damage out of the ceiling, and the party finishes the crossing at a scattered run.`}}}}});Lt({id:"cartographers-ghost",rides:["library","corridor"],title:"The Cartographer's Ghost",situation:"Someone mapped this place thoroughly and never left it. What remains of him is agitated, helpful, and cannot remember where he put the map.",affordances:["books","undead","people"],options:[{id:"read-the-plan",name:"Read the Place Itself",desc:"The dungeon has a logic; a surveyor can follow it without his map",requires:["astrology"],weight:2},{id:"reconstruct-his-rounds",name:"Reconstruct His Rounds",desc:"He described his route. Hold all of it at once and the map falls out",requires:["scholarship"],affordances:["books"],weight:2},{id:"question-the-ghost",name:"Question Him Gently",desc:"He is not obstructive, only frightened and very old",requires:["rhetoric"],affordances:["people"],weight:1.5},{id:"ask-where-it-lies",name:"Scry for the Map",desc:"Ask the question he cannot answer himself",requires:["divination"],weight:1.5},{id:"leave-cartographer",name:"Leave Him To It",desc:"The party has its own way of getting lost"}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"read-the-plan":return e.addScore(30),e.forewarned=!0,e.supply=(e.supply||0)+2,{success:!0,narrative:"🧭 The map is unnecessary: the place was laid out by someone with habits, and habits can be read off three corridors. The party stops doubling back — two marches of oil saved, and the next snare is on the route before they reach it. +30 score."};case"reconstruct-his-rounds":return e.addScore(28),e.supply=(e.supply||0)+2,{success:!0,narrative:"🧠 He is asked to describe his rounds, all of them, and somebody holds the whole account at once until the shape closes. The map was behind the shelving. Two marches of oil saved. +28 score."};case"question-the-ghost":return e.addScore(22),e.supply=(e.supply||0)+1,{success:!0,narrative:"🤝 Asked gently and given time, he remembers most of it — enough to save a march of oil, and to be a good deal calmer about the whole business. +22 score."};case"ask-where-it-lies":return e.addScore(20),e.supply=(e.supply||0)+1,{success:!0,narrative:"🔮 The map is under the flagstone he has been standing on for two centuries. He takes this news hard. +20 score, a march of oil saved."};case"leave-cartographer":default:return e.supply=Math.max(0,(e.supply||0)-1),{success:!0,narrative:"🚶 The party leaves him looking for it and finds its own way round the long side. A march of oil for the privilege."}}}});Lt({id:"severed-council",rides:["disaster","corridor"],title:"The Party Is Cut in Half",situation:"A slab comes down across the passage without warning, and the party is on both sides of it. Neither half can hear the other through a foot of stone, and something on the far side has already started moving.",affordances:["hazard","mechanism","unstable-environment"],options:[{id:"linked-plan",name:"Pass a Plan Through the Stone",desc:"A link is only worth what is sent along it",requires:["divination","warcraft"],weight:2.5},{id:"link-minds",name:"Speak Mind to Mind",desc:"Stone is no barrier to a thing air never carried",requires:["divination"],weight:2},{id:"send-a-messenger",name:"Send Something Through",desc:"Summon something that does not need the door",requires:["conjuring"],weight:1.5},{id:"signal-by-sound",name:"Signal by Sound",desc:"Stone carries a struck note further than a shout",requires:["correspondence"],weight:1.5},{id:"work-the-slab",name:"Work the Slab",desc:"It came down on a mechanism, and mechanisms go both ways",requires:["tinkering"],affordances:["mechanism"],weight:1.5},{id:"shout-through-it",name:"Shout Through It",desc:"And hope"}],resolveOption(n,e,t){switch(t.cleared=!0,n){case"linked-plan":return e.addScore(36),e.forcedFormation="wedge",e.forewarned=!0,{success:!0,narrative:"📡 The link carries more than reassurance: a plan goes across it, timed, with both halves moving on the same count. They meet in the middle of whatever was waiting, from two sides at once, and are still in that shape when the next room opens. +36 score."};case"link-minds":return e.addScore(26),e.forcedFormation="line",{success:!0,narrative:"📡 The link opens as easily as speech, and both halves know at once that the other is standing. They come back together at the far junction abreast and unpanicked. +26 score."};case"send-a-messenger":return e.addScore(22),{success:!0,narrative:"🪄 Something small and borrowed goes under the slab with a message tied to the idea of it, and comes back with an answer. Slower than thought, faster than digging. +22 score."};case"signal-by-sound":return e.addScore(20),e.forcedFormation="line",{success:!0,narrative:"🎵 Struck rather than shouted: the note goes through the stone where a voice would not, and a rhythm is agreed in about a minute. +20 score."};case"work-the-slab":return e.addScore(24),e.addGold(8),{success:!0,narrative:"🔧 The counterweight is found, persuaded, and reversed. The slab goes back up, and a length of its chain comes away useful. +1 material, +24 score."};case"shout-through-it":default:return e.takeDamage(5),e.forcedFormation="loose",{success:!1,damage:5,narrative:"📢 Nothing carries. Both halves eventually go the long way round and meet somewhere in the middle, having each independently fought whatever it was. 5 damage, and nobody is standing where they meant to be."}}}});let Ry=0;function bo(){return(++Ry).toString(36)}function Gt(){return Math.random()*10}const Pc=.5;function Rt(n,e){return n.living().some(t=>t.equipment.some(i=>i.id===e))}function wn(n,e){return n.grimoire.some(t=>t.id===e)}function Ri(n){const e={sneak:0,disarm:0,deepStudy:0,secretDoor:0,trapSoak:0,cleanInspect:!1,notes:{}};return wn(n,"sp-light")&&(e.sneak+=1,e.notes.sneakLight="Dancing Light"),Rt(n,"eq-lockpicks")&&(e.disarm+=1.5,e.cleanInspect=!0,e.notes.disarm="Masterwork Lockpicks",e.notes.cleanInspect="Masterwork Lockpicks"),n.hasPersonality("cunning")&&(e.cleanInspect=!0,e.notes.cleanInspect=e.notes.cleanInspect||"the Cunning"),Rt(n,"eq-grimoire")&&(e.deepStudy+=1.5,e.notes.deepStudy="the Grimoire of Low Whispers"),Rt(n,"eq-lantern")&&(e.secretDoor+=2,e.trapSoak+=1,e.notes.secretDoor="the Everburning Lantern",e.notes.trapSoak="the Everburning Lantern"),e}function _a(n,e){return R0(n,e,{item:t=>Rt(e,t),spell:t=>wn(e,t),tactic:()=>!1})}function ud(n,e){const t=hd(n);if(!t)return[...Ic(n,e),..._a(n,e)];const i=wy(t,e,n),s=Ic(n,e),r=s.length===1&&s[0].id==="proceed";if(!(!!n.encounterId&&t.roomType!==n.type&&!r))return[...i,..._a(n,e)];const a=new Set(i.map(l=>l.id));return[...i.filter(l=>!l.onlyWhenOwned),...s.filter(l=>!a.has(l.id)),..._a(n,e)]}function Ic(n,e){var t,i,s,r,o;switch(n.type){case fe.MONSTER:case fe.BOSS:{const l=[{id:"fight",name:"Fight",desc:"Steel and teamwork"}];return(n.fled||0)<2&&l.push({id:"flee",name:"Fall Back",desc:`Retreat and try the fight later, worn down: ${2*((n.fled||0)+1)} damage`}),e.hasClass(X.ROGUE)&&!((t=n.monster)!=null&&t.isBoss)&&l.push({id:"sneak",name:"Sneak Past",desc:"The rogue leads a silent detour"}),e.hasClass(X.CLERIC)&&((i=n.monster)!=null&&i.undead)&&l.push({id:"turn-undead",name:"Turn Undead",desc:"The cleric raises the holy symbol"}),(s=n.monster)!=null&&s.bribable&&e.gold>=15&&l.push({id:"bribe",name:"Pay the Toll",desc:"Gold buys passage (15g)"}),e.grimoire.some(c=>c.use==="combat")&&l.push({id:"spell-strike",name:"Open with Magic",desc:"Lead with a combat spell"}),wn(e,"sp-fear")&&!((r=n.monster)!=null&&r.isBoss)&&(((o=n.monster)==null?void 0:o.health)||99)<=14&&l.push({id:"cause-fear",name:"Cause Fear",desc:"Send the weak thing running"}),l}case fe.TRAP:{const a=[{id:"push-through",name:"Push Through",desc:"Take the hit, keep marching"},{id:"search-around",name:"Search for a Way Around",desc:"Slow but safe-ish"}];return e.hasClass(X.ROGUE)&&a.unshift({id:"disarm",name:"Disarm It",desc:"The rogue's fingers know this work"}),e.grimoire.some(l=>l.use==="utility")&&a.push({id:"spell-bypass",name:"Magic It Open",desc:"A utility spell solves this"}),a}case fe.TREASURE:case fe.VAULT:{const a=[{id:"loot",name:"Loot It All",desc:"Everything shiny goes in the bags"},{id:"inspect",name:"Inspect First",desc:"Check for mimics and curses"},{id:"leave-it",name:"Leave It",desc:"Some gold is bait"}];return wn(e,"sp-knock")&&a.unshift({id:"knock-open",name:"Cast Knock",desc:"Open it from across the room. Loudly."}),a}case fe.LIBRARY:{const a=[{id:"study",name:"Study the Shelves",desc:"Learn a spell from the stacks"},{id:"pass-by",name:"Pass Through",desc:"Books do not fill bellies"}];return e.hasClass(X.WIZARD)&&a.unshift({id:"deep-study",name:"Read the Sealed Texts",desc:"The wizard risks the dangerous books"}),a}case fe.SHRINE:return[{id:"rest",name:"Rest and Pray",desc:"Heal the wounded"},{id:"desecrate",name:"Pry Out the Gold Leaf",desc:"Profitable. Blasphemous."},{id:"pass-by",name:"Keep Moving",desc:"No time for candles"}];case fe.STAIRS:{const a=[{id:"descend",name:"Go Down",desc:"A long climb by lamplight: 1 supply"}];Rt(e,"eq-grapple")&&a.push({id:"rope-down",name:"Rope Down the Well",desc:"Straight down the shaft beside the stair: no supply spent"});const l=e.living().some(d=>d.health<d.effectiveMax()),c=e.living().some(d=>d.wounds>0);return(l||c)&&a.push({id:"camp-stair",name:"Camp at the Stairhead",desc:"Sleep and eat before the next floor: 2 supply for 6 healed each and a wound set, and something may find you"}),a}case fe.DISASTER:return[{id:"brace",name:"Brace and Endure",desc:"Shields up, heads down"},{id:"scatter",name:"Scatter and Regroup",desc:"Every hero for themselves"}];default:return[{id:"proceed",name:"Proceed",desc:"Onward and downward"}]}}const Cy=.25;function kc(n,e,t){if(!(n!=null&&n.isBoss)||t)return e;const i=Math.max(1,Math.ceil(n.health*Cy));return e<i?i:e}const Ly=Object.freeze({flankDamage:0,flankMin:99,vsArmored:0,cover:0,wardPerCast:0,monsterAtk:0,extraCast:0,sustainFull:!1,allSpellsArea:!1,noSelfHarm:!1,fireTrapSoak:0,mendAtShrine:0,campSupply:0,campWatched:!1,featureOpener:0,hazardDamage:0,supply:0}),Ci=()=>Ly,Py={brave:{fight:3,"push-through":2,brace:2,flee:-2,"leave-it":-1,"camp-stair":-1},cunning:{sneak:3,disarm:3,bribe:2,inspect:2,"spell-bypass":2,fight:-1,"rope-down":2},greedy:{loot:4,desecrate:2,gather:2,fight:1,sneak:-1,"leave-it":-3,bribe:-2,"camp-stair":-1},scholarly:{study:3,"deep-study":3,"spell-strike":2,"spell-bypass":2},pious:{rest:3,"turn-undead":3,desecrate:-5,"camp-stair":2},reckless:{fight:2,"push-through":3,loot:2,inspect:-2,"search-around":-2,"camp-stair":-3,descend:2},craven:{flee:3,sneak:2,disarm:2,"search-around":2,inspect:1,scatter:2,fight:-2,"push-through":-2,brace:-1,"cause-fear":3,"knock-open":1,"camp-stair":3}},Iy={"knock-open":{base:1.5,cunning:2,scholarly:1},"cause-fear":{base:1.5,cunning:1}};function ky(n,e){const t=e==null?void 0:e.monster;if(!t)return{};const i={},s=(l,c)=>{i[l]=(i[l]||0)+c};return t.trait==="ethereal"&&!n.hasClass(X.CLERIC)&&(s("fight",-2),s("sneak",2),s("spell-strike",2)),t.trait==="armored"&&(s("spell-strike",1.5),s("fight",-.5)),t.trait==="venomous"&&!n.hasClass(X.CLERIC)&&(s("sneak",1.5),s("cause-fear",1.5),s("fight",-1)),t.trait==="swarm"&&s("spell-strike",2),n.grimoire.filter(l=>l.use==="combat"&&l.aoe).some(l=>od(l,e).length>0)&&(s("spell-strike",3),s("fight",-1)),n.grimoire.filter(l=>l.use==="combat").some(l=>ps(l,t)>1)&&s("spell-strike",2),i}const Dc=new Map([["push-past-duellist",{spent:4,fresh:1,tempers:{craven:2}}],["put-it-down",{spent:2,fresh:3,tempers:{reckless:2,brave:1}}],["endure-discord",{spent:3,fresh:2,tempers:{reckless:2,brave:1}}],["guess-heavy",{spent:2,fresh:2,tempers:{greedy:2,reckless:1}}],["smash-wall",{spent:2,fresh:3,tempers:{reckless:2,brave:1}}],["hurry-past",{spent:4,fresh:0,tempers:{craven:2}}],["take-detour",{spent:3,fresh:0,tempers:{craven:2,cunning:1}}],["push-through",{spent:0,fresh:2,tempers:{reckless:2,brave:1}}],["shout-through-it",{spent:3,fresh:2,tempers:{reckless:2,brave:2}}],["walk-it",{spent:3,fresh:2,tempers:{reckless:3,brave:1}}]]);function Dy(n,e){const t=ud(n,e);if(t.length===0)return null;if(t.length===1)return t[0].id;const i=ky(e,n),s=t.map(a=>{let l=1;for(const h of e.personalities){const f=Py[h];f&&f[a.id]!==void 0&&(l+=f[a.id])}a.weight!==void 0&&(l+=a.weight);const c=Iy[a.id];if(c){l+=c.base;for(const h of e.personalities)c[h]&&(l+=c[h])}const d=L0(a.id);if(d){l+=1.2;for(const h of e.personalities)d[h]&&(l+=d[h])}if(i[a.id]&&(l+=i[a.id]),a.id==="rest"&&e.totalHealth()/e.totalMaxHealth()<.6&&(l+=3),a.id==="camp-stair"){const h=e.totalHealth()/e.totalMaxHealth();h<.5?l+=5:h<.75?l+=2:l-=2,e.living().some(f=>f.wounds>0)&&(l+=3),e.supply<=4&&(l-=4)}if(a.id==="rope-down"&&(l+=e.supply<=3?3:1.5),a.id==="fight"&&e.totalHealth()/e.totalMaxHealth()<.3&&(l-=2),a.id==="flee"&&e.totalHealth()/e.totalMaxHealth()<.3&&(l+=2),a.id==="study"&&(l+=1),a.id==="leave-it"){const h=e.totalHealth()/e.totalMaxHealth();h<.4?l+=5:h<.7&&(l+=2),e.supply===0&&(l+=1.5),e.hasPersonality("craven")&&(l+=2)}if(Dc.has(a.id)){const h=e.totalHealth()/e.totalMaxHealth(),f=Dc.get(a.id);h<.4?l+=f.spent:h<.65?l+=f.spent*.4:h>.8&&(l+=f.fresh);for(const[p,g]of Object.entries(f.tempers||{}))e.hasPersonality(p)&&(l+=g)}return{opt:a,w:Math.max(.1,l)}}),r=s.reduce((a,l)=>a+l.w,0);let o=Math.random()*r;for(const{opt:a,w:l}of s)if(o-=l,o<=0)return a.id;return t[0].id}function Ny(n){return`💢 At half health, ${n.name} turns fierce: attack +2 for the rest of the fight.`}const Nc=[{id:"found-charm",type:"equipment",name:"a tarnished luck-charm",icon:"🍀",slot:"trinket",bonus:{mind:1},bestFor:null,text:"Somebody's luck ran out holding it. Perhaps it recharges."},{id:"found-buckle",type:"equipment",name:"a dead adventurer's belt buckle",icon:"🔩",slot:"trinket",bonus:{defense:1},bestFor:null,text:"Sturdy. Its last owner was not."},{id:"found-whetstone",type:"equipment",name:"a whetstone of surprising opinion",icon:"🪨",slot:"trinket",bonus:{attack:1},bestFor:null,text:"It hums when it works. Nobody asks what the tune is."}];function xa(n,e=!1,t=Math.random()){if(!e&&t>.35)return null;const i=Math.floor((e?t:t/.35)*4)%4;if(i===0)return n.potions.push({kind:"healing-draught",heal:6}),{source:"the hoard",find:"potion",text:"🧪 Also in the hoard: a healing draught (heals 6), added to the satchel."};if(i===1)return n.addGold(15),{source:"the hoard",find:"gold",text:"💰 Also in the hoard: a purse nobody came back for, 15 gold."};if(i===2){const o=ur[Math.floor(t*997)%ur.length];return n.grimoire.push({...o,id:`found-${o.id}-${n.grimoire.length}`,source:"found"}),{source:o.name,find:"scroll",text:`📜 Also in the hoard: a scroll of ${o.name}, added to the grimoire.`}}const s=Nc[Math.floor(t*991)%Nc.length],r=n.assignEquipment({...s,id:`${s.id}-${bo()}`});return{source:s.name,find:"trinket",text:`🍀 Also in the hoard: ${s.name} (${ad(s.bonus)}), now worn by ${(r==null?void 0:r.name)||"no one"}.`}}function Uy(n,e,t,i={}){const s=C0(t,e,{item:l=>Rt(e,l),spell:l=>wn(e,l),tactic:()=>!1}),r=Cr(s.feature),o=[];if(s.fightOnly){const l=n.monster,c=Ci(),d=c.featureOpener,h=((r==null?void 0:r.tags)||[]).includes("hazard")?c.hazardDamage:0,f=s.openerDamage+d+h,p=Math.min(f,Math.max(0,l.health-1));l.health=Math.max(1,l.health-f),d&&o.push({source:"improvised arms",text:`🔧 The party knows how to swing what the room left lying about: +${d} to the opening.`}),h&&o.push({source:"pinning",text:`📌 They do not let it climb straight back out: ${h} more damage from the room.`});const g=$o(n,e,"fight",{formation:i==null?void 0:i.formation,extraCover:s.extraCover||0});return g.preps=[...o,...g.preps||[]],g.feature=s.feature,g.featureAction=t,g.featureDamage=p,g.featureTier=s.tier,g.spellElement=s.element||null,g}const a={success:!0,feature:s.feature,featureAction:t,featureTier:s.tier,preps:o};if(s.gold&&(e.addGold(s.gold),a.gold=s.gold),s.heal&&(e.healParty(s.heal),a.healed=s.heal),s.curesLinger&&e.poisonLinger>0&&(e.poisonLinger=0,a.curedLinger=!0,o.push({source:"the Great Waterskin",text:"🫗 The venom is flushed out with clean water before it can act again."})),s.weaponMod){const l=e.living().reduce((c,d)=>c.attack>=d.attack?c:d);l.addWeaponMod({...s.weaponMod}),a.weaponMod={...s.weaponMod,target:l.name}}if(s.spell){const l={...s.spell,id:`feature-${t}-${e.grimoire.length}`,source:"prepared",text:"Taken off a dungeon shelf."};if(e.grimoire.push(l),a.spell=l.name,s.extraSpell){const c={...s.spell,id:`feature-${t}-${e.grimoire.length}`,use:"utility",source:"prepared",text:"Taken off a dungeon shelf."};e.grimoire.push(c),a.extraSpell=!0}}if(s.wakesDead){const l=!s.quiet&&Gt()>6.5;a.wokeDead=l,l&&(e.takeDamage(4),a.damage=4,o.push({source:r.name,text:"⚰️ The occupant objects: 4 damage before it is put back down."}))}return n.cleared=!0,e.recordEncounter(t,!0),a}function Oy(n,e=Gt()){const t=n.living().filter(r=>r.class===X.ROGUE),i=t.length>0?Math.max(...t.map(r=>r.mind)):Math.floor(n.bestMind()/2);let s=0;return n.hasPersonality("scholarly")&&(s+=1),n.hasPersonality("craven")&&(s+=1),s+=Ri(n).secretDoor,i+s+e>11}function fd(n,e){if(!e)return{weight:0,advocate:null};const t=s=>n.hasPersonality(s),i=s=>n.hasClass(s);switch(e){case"crypt":return t("greedy")?{weight:3,advocate:"the Covetous wanted what gets buried with people"}:t("pious")?{weight:2,advocate:"the Devout did not like leaving the dead untended"}:{weight:0,advocate:null};case"works":return i(X.ALCHEMIST)?{weight:4,advocate:"the alchemist wanted the bench"}:t("scholarly")?{weight:2,advocate:"the Scholarly wanted to see what was being made down there"}:{weight:0,advocate:null};case"archive":return t("scholarly")?{weight:4,advocate:"the Scholarly wanted the shelves"}:i(X.WIZARD)?{weight:3,advocate:"the wizard reads everything, on principle"}:{weight:0,advocate:null};case"barracks":return t("greedy")?{weight:3,advocate:"the Covetous wanted the weapon rack"}:t("brave")?{weight:2,advocate:"the Bold wanted whatever was garrisoned there"}:{weight:0,advocate:null};case"sump":return{weight:t("greedy")?1:-2,advocate:null};default:return{weight:0,advocate:null}}}function Fy(n,e=Gt(),t=null){let i=4;return n.hasPersonality("greedy")&&(i+=3),n.hasPersonality("scholarly")&&(i+=2),n.hasPersonality("reckless")&&(i+=2),n.hasPersonality("craven")&&(i-=3),n.totalHealth()/n.totalMaxHealth()<.35&&(i-=3),i+=fd(n,t).weight,e<i}function $o(n,e,t,i=null){var r,o;if(P0(t))return Uy(n,e,t,i);const s=hd(n);if(s!=null&&s.resolveOption&&s.options.some(a=>a.id===t))return My(s,t,e,n);switch(t){case"fight":{const a=n.monster;let l=a.health,c=0;const d=new Map(e.members.map(re=>[re.name,re.health])),h=e.combatItemActions();let f=0,p=0,g=0;for(const re of h)f+=re.opening||0,a.undead&&(f+=re.vsUndead||0),p+=re.ward||0,g+=re.summonAttack||0;l-=f,l=kc(a,l,!1);const v=[],m=a.trait==="armored"&&wn(e,"sp-sunder")?e.castSpell("combat","sp-sunder"):null,u=a.trait==="armored"&&!m?2:0;m&&v.push({source:m.name,text:`💢 ${m.name} reminds the plate it was ore: it stops turning blows for the rest of the fight.`});const x=a.trait==="swarm"&&Rt(e,"eq-greatsword")?3:0;x&&v.push({source:"the Greatsword of the Vault",text:`🗡️ The greatsword takes a whole rank of them at a stroke: ${x} more damage a round.`});const E=Rt(e,"eq-throwing-knives")?4:0;E&&(l-=E,v.push({source:"the Bandolier of Knives",text:`🔪 Six knives arrive before the party does: ${E} damage before the first round.`}));const S=Rt(e,"eq-quicksilver-daggers");S&&v.push({source:"the Quicksilver Daggers",text:"🗡️ The daggers land before the argument starts: nothing comes back in the first round."});const I=wn(e,"sp-shield")?e.castSpell("combat","sp-shield"):null;I&&(p+=2,v.push({source:I.name,text:`🛡️ ${I.name} goes up before the first blow: 2 less damage every round.`}));const b=A0(n);b.undeadRisk&&Rt(e,"eq-blessed-mace")&&(b.undeadRisk=!1,b.notes.push({feature:"sarcophagus",text:"🔨 The Blessed Mace sanctifies the room between swings: whatever was stirring in the stone settles."}));const A=(b.cover||0)+((i==null?void 0:i.extraCover)||0),C=Rt(e,"eq-silvered-mirror"),w=e.hasClass(X.CLERIC)||b.revealEthereal||C||!!(i!=null&&i.forceRevealEthereal);a.trait==="ethereal"&&C&&!b.revealEthereal&&v.push({source:"the Silvered Hand-Mirror",text:"🪞 The Silvered Hand-Mirror catches the ethereal thing where it truly stands: weapons do full damage."});const y=a.trait==="ethereal"&&!w?.6:1;for(const re of b.notes)v.push({source:re.feature,text:re.text});i!=null&&i.extraCover&&v.push({source:"the pillars",text:`🏛️ Fighting from the aisles: ${i.extraCover} less damage per round on top of the cover.`}),a.trait==="ethereal"&&!b.revealEthereal&&v.push(e.hasClass(X.CLERIC)?{source:"the cleric",text:"✨ The cleric blesses the blades: the ethereal monster takes full weapon damage."}:{source:a.name,text:"👻 The monster is ethereal and the party's blows pass through it: weapon damage ×0.6 (no cleric to bless the blades)."});for(const re of(i==null?void 0:i.reactionNotes)||[])v.push(re);const T=e.forcedFormation;delete e.forcedFormation;const N=(i==null?void 0:i.formation)||(T&&ld(n).includes(T)?T:null)||vy(e,n),L=yy(N,n);v.push({source:L.name,text:`${L.icon} ${L.tell}`}),T===N&&v.push({source:"the room before this one",text:"📐 The party meets it standing as the last room left them."});const B=!!e.starBlessed;B&&(e.starBlessed=!1,v.push({source:"the corrected heavens",text:"🔭 The aspect is favourable and the party knows it: 1 less damage a round."}));const W=Ci(),G=W.flankDamage>0&&e.living().length>=W.flankMin&&L.flanking;G&&v.push({source:"the party's footwork",text:`⚔️ The party has the numbers and uses them: +${W.flankDamage} damage a round.`});const K=a.trait==="armored"&&W.vsArmored?W.vsArmored:0;K&&v.push({source:"focused fire",text:`🎯 Everyone strikes the same seam in the plate: +${K} damage a round.`}),W.cover&&v.push({source:"the shield wall",text:`🛡️ The party closes ranks: ${W.cover} less damage a round.`});const V=W.wardPerCast*((i==null?void 0:i.castsThisFight)||0);V&&v.push({source:"ward-weaving",text:`🕸️ Every working leaves a ward behind it: ${V} less damage a round.`});let se=Math.max(1,a.attack+((i==null?void 0:i.monsterAtkMod)||0)+(W.monsterAtk||0));e.alarmed&&(se+=2,e.alarmed=!1,v.push({source:"the alarm",text:"🔔 The alarm tripped earlier warned it: the monster attacks with +2 this fight."}));const ie=(i==null?void 0:i.spellSustain)||0;ie>0&&v.push({source:i.spellSustainSource||"the working",text:`✨ The working holds: +${ie} damage every round while the fight lasts.`});const _e=e.coatingBonusVs(a);_e.bonus>0&&v.push({source:_e.notes.join(" + "),text:`⚗️ The ${_e.notes.join(" and ")} exploits the monster's weakness: +${_e.bonus} damage per round.`});let Pe=0,qe=!1,q=0;for(;l>0&&e.isAlive()&&Pe<12;){Pe++;const re=(G?W.flankDamage:0)+K+x,Me=Math.max(1,Math.round((e.combatAttack(L.frontage)+g+_e.bonus+ie+re+Math.floor(Gt()/3))*y*L.attackMult)-u);if(l-=Me,l=kc(a,l,qe),l<=0)break;if(a.isBoss&&!qe&&l<=a.health/2&&(qe=!0,se+=2,v.push({source:a.name,text:Ny(a)})),q>0&&e.healParty(q),(a.trait==="slow"||S)&&Pe===1)continue;const ke=Math.max(1,Math.round((se-Math.floor(e.totalDefense()/3)-p-A-W.cover-V-(B?1:0))*L.incomingMult));e.takeDamage(ke),c+=ke;const Ye=e.castHealIfNeeded();if(Ye){const ze=Math.round(Ye.spell.effectivePower*Pc);q+=ze,v.push({source:Ye.spell.name,text:`💚 ${Ye.spell.name} closes ${Ye.target.name}'s wounds mid-fight: ${Ye.spell.effectivePower} healed in round ${Pe}, then ${ze} a round while it holds${Ye.spell.consumed?" (the scroll is consumed)":""}.`})}e.quaffIfNeeded()}if(Pe===0){const re=/every round|a round while|less damage a round|damage a round/i;for(let Me=v.length-1;Me>=0;Me--)re.test(v[Me].text||"")&&v.splice(Me,1)}const ee=l<=0&&e.isAlive();let xe=null;if(ee){const re=a.isBoss?100:25;e.addScore(re),n.cleared=!0;const Me=Cc(e,a);if(xe=Me.drop,v.push(Me),a.trait==="venomous"&&(Rt(e,"eq-cursed-blade")?v.push({source:"the Blade of the Adder",text:"🐍 The Blade of the Adder has taught its bearer what venom tastes like: the party shrugs this off."}):e.hasClass(X.CLERIC)?v.push({source:"the cleric",text:"🐍 The monster was venomous, but the cleric cures the poison before it can act."}):(e.poisonLinger=(e.poisonLinger||0)+2,v.push({source:a.name,text:"🐍 The monster was venomous: the party will take 2 poison damage next room (no cleric to cure it)."}))),a.isBoss){const ke=xa(e,!0);ke&&v.push(ke)}e.hasPersonality("reckless")&&(e.addScore(5),v.push({source:"the Reckless",text:"💥 The Reckless finish the fight with style: +5 score."}))}if(e.isAlive()&&c>=6){const re=e.castSpell("heal");re&&(e.healParty(re.effectivePower),v.push({source:re.name,text:`💚 ${re.name} heals ${re.effectivePower} after the fight${re.consumed?" (the scroll is consumed)":""}.`}))}e.recordEncounter("fight",ee);let ae=null;for(const re of e.members){const Me=(d.get(re.name)??re.health)-Math.max(0,re.health);Me>0&&(!ae||Me>ae.lost)&&(ae={name:re.name,lost:Me})}return{success:ee,rounds:Pe,damage:c,monster:a.name,itemActions:h,preps:v,drop:xe,bossPhased:qe,formation:L.id,brunt:ae}}case"cause-fear":{const a=e.castSpell("combat","sp-fear");return e.addScore(20),n.cleared=!0,e.recordEncounter("cause-fear",!0),{success:!0,monster:n.monster.name,spell:a?a.name:"Cause Fear"}}case"spell-strike":{const a=n.monster,l=[],c=Ci(),d=e.grimoire.filter(x=>x.use==="combat").length,h=a.isBoss?Math.max(1,d):1+(e.hasClass(X.WIZARD)?1:0)+c.extraCast,f=[];let p=null,g=0;for(let x=0;x<h;x++){const E=e.grimoire.filter(y=>y.use==="combat"&&!e.castThisRoom.has(y.id));let S=null,I=-1;for(const y of E){const T=y.power*ps(y,a);T>I&&(I=T,S=y)}const b=S?e.castSpell("combat",S.id):null;if(!b)break;const A=ps(b,a)*(a.trait==="swarm"?1.5:1);ps(b,a)>1?p=p||"weak":ps(b,a)<1&&(p=p||"resisted"),a.trait==="swarm"&&(p=p||"swarm");const C=Math.round(b.effectivePower*A);a.health=Math.max(1,a.health-C),g+=Math.round(C*(c.sustainFull?1:Pc)),f.push(b);const w=c.allSpellsArea?{...b,aoe:!0}:b;for(const y of od(w,n))l.push(y)}const v=a.isBoss&&f.length>1?[{source:"the boss chamber",text:`✨ Nothing is held back for later: the party looses everything it has, ${f.length} workings in the one fight that matters.`}]:[],m=my(l);if(m.damage&&(a.health=Math.max(1,a.health-m.damage)),m.heal&&e.healParty(m.heal),m.selfHarm&&Rt(e,"eq-warded-buckler")&&(m.selfHarm=Math.floor(m.selfHarm/2),m.notes.push({source:"the Warded Buckler",text:"🛡️ The prayers on the inside of the buckler turn aside half of what the party set off."})),m.burn>0&&Rt(e,"eq-athanor-charm")&&(m.burn+=2,m.notes.push({source:"the Athanor Charm",text:"🔥 The athanor charm feeds the blaze: 2 more damage a round while it burns."})),m.selfHarm&&!c.noSelfHarm)for(const x of e.living())x.takeDamage(m.selfHarm);else m.selfHarm&&c.noSelfHarm&&m.notes.push({source:"firewatch",text:"🧯 The party set it off and stood well clear: none of it comes back on them."});m.light>0?e.addSupply(m.light):m.light<0&&(e.supply=Math.max(0,e.supply+m.light));for(const x of m.consumed)n.features=(n.features||[]).filter(E=>E!==x);const u=$o(n,e,"fight",{formation:i==null?void 0:i.formation,spellSustain:g+m.burn,spellSustainSource:f.map(x=>x.name).join(" + ")||null,extraCover:m.cover,castsThisFight:f.length,monsterAtkMod:m.monsterAtk,forceRevealEthereal:m.revealEthereal,reactionNotes:[...v,...m.notes]});return u.spell=((r=f[0])==null?void 0:r.name)||null,u.spellsCast=f.map(x=>x.name),u.spellEdge=p,u.spellElement=((o=f[0])==null?void 0:o.element)||null,u}case"sneak":{const a=Math.max(...e.living().filter(f=>f.class===X.ROGUE).map(f=>f.mind)),l=e.hasPersonality("craven")?1:0,c=Ri(e),d=[];c.notes.sneak&&d.push({source:c.notes.sneak,text:`👢 The ${c.notes.sneak} add +1.5 to the sneak roll.`}),c.notes.sneakLight&&d.push({source:c.notes.sneakLight,text:"💡 Dancing Light revealed the watcher's position: +1 to the sneak roll."});const h=a+l+c.sneak+Gt()>9;return h?(e.addScore(15),n.cleared=!0):e.takeDamage(Math.ceil(n.monster.attack/2)),e.recordEncounter("sneak",h),{success:h,monster:n.monster.name,preps:h?d:[]}}case"turn-undead":{const l=Math.max(...e.living().filter(h=>h.class===X.CLERIC).map(h=>h.mind))+Gt()>8,c=[];let d=null;if(l){e.addScore(30),n.cleared=!0;const h=Cc(e,n.monster);d=h.drop,c.push(h)}else e.takeDamage(n.monster.attack);return e.recordEncounter("turn-undead",l),{success:l,monster:n.monster.name,preps:c,drop:d}}case"bribe":return e.gold-=15,e.addScore(5),n.cleared=!0,{success:!0,goldSpent:15,monster:n.monster.name};case"flee":{n.fled=(n.fled||0)+1;const a=2*n.fled;return e.takeDamage(a),{success:!0,retreated:!0,damage:a,fled:n.fled,monster:n.monster.name}}case"disarm":{const a=Math.max(...e.living().filter(h=>h.class===X.ROGUE).map(h=>h.mind)),l=Ri(e),c=[];l.notes.disarm&&c.push({source:l.notes.disarm,text:"🗝️ The Masterwork Lockpicks add +1.5 to the disarm roll."});const d=a+l.disarm+Gt()>8;return d?(e.addScore(20),n.cleared=!0):(e.takeDamage(Math.ceil(n.trapDamage/2)),n.cleared=!0),e.recordEncounter("disarm",d),{success:d,preps:d?c:[]}}case"push-through":{const a=e.hasPersonality("craven")?1:0,l=Ri(e),c=[];l.trapSoak>0&&c.push({source:l.notes.trapSoak,text:"🏮 The Everburning Lantern showed the pressure plates: 1 less damage."});const d=!!e.forewarned;d&&(e.forewarned=!1,c.push({source:"the warning",text:"🔮 This is the snare the party was told about: half the damage it would have done."}));const h=n.trapType||"spike",f=wn(e,"sp-feather")?e.castSpell("utility","sp-feather"):null;f&&c.push({source:f.name,text:`🪶 ${f.name} takes the party's weight off the floor: 3 less damage from anything underfoot.`});let p=Math.max(1,(n.trapDamage||3)-a-l.trapSoak-(f?3:0));if(h==="fire"){const g=Ci().fireTrapSoak;g?(p=Math.max(1,p-g),c.push({source:"firewatch",text:`🧯 The party reads the jet before it fires and is not standing there: ${g} less damage.`})):wn(e,"sp-frost")?(p=Math.max(1,p-2),c.push({source:"Frost Lance",text:"❄️ Frost Lance counters the flame jet: 2 less damage."})):p+=1}else h==="poison"?(p=Math.max(1,Math.ceil(p/2)),e.hasClass(X.CLERIC)?c.push({source:"the cleric",text:"🐍 The needles hit, but the cleric cures the venom on the spot."}):(e.poisonLinger=(e.poisonLinger||0)+2,c.push({source:"the trap",text:"🐍 Poison needles: the party will take 2 poison damage next room (no cleric to cure it)."}))):h==="alarm"&&(p=Math.min(p,2),e.alarmed=!0,c.push({source:"the alarm",text:"🔔 The alarm rings through the dungeon: the next monster will attack with +2."}));return d&&(p=Math.max(1,Math.ceil(p/2))),e.takeDamage(p),n.cleared=!0,{success:!0,damage:p,spotted:a>0,trapType:h,preps:c}}case"search-around":{const a=e.bestMind()+Gt()>8;return a||e.takeDamage(Math.ceil((n.trapDamage||3)/2)),n.cleared=!0,{success:a}}case"spell-bypass":{const a=e.castSpell("utility");return n.cleared=!0,e.addScore(10),{success:!0,spell:a?a.name:null}}case"loot":{if(Math.random()<(n.mimicChance||0))return e.takeDamage(5),e.addGold(Math.floor((n.gold||20)/2)),n.cleared=!0,{success:!1,mimic:!0,gold:Math.floor((n.gold||20)/2)};e.addGold(n.gold||20),n.cleared=!0;const l=[],c=xa(e,n.type===fe.VAULT);return c&&l.push(c),{success:!0,gold:n.gold||20,preps:l}}case"inspect":{const a=Ri(e),l=[];let c=Math.floor((n.gold||20)*.8);a.cleanInspect&&(c=n.gold||20,l.push({source:a.notes.cleanInspect,text:`🔍 ${a.notes.cleanInspect==="the Cunning"?"The Cunning eye":"The Masterwork Lockpicks"} found everything: the full gold taken, nothing missed.`})),e.addGold(c),n.cleared=!0;const d=xa(e,n.type===fe.VAULT);return d&&l.push(d),{success:!0,gold:c,careful:!0,preps:l}}case"knock-open":{const a=e.castSpell("utility","sp-knock"),l=n.gold||20;return e.addGold(l),n.cleared=!0,e.recordEncounter("knock-open",!0),{success:!0,gold:l,spell:a?a.name:"Knock",consumed:a?a.consumed:!1,wasMimic:Math.random()<(n.mimicChance||0)}}case"leave-it":return n.cleared=!0,{success:!0,gold:0};case"study":{const a=e.hasPersonality("scholarly")?2:1;e.spellsLearned+=a,e.addScore(a*20);for(let l=0;l<a;l++)e.grimoire.push({id:`learned-${bo()}`,name:"Found Cantrip",icon:"📜",school:"found",power:3,use:Math.random()<.5?"combat":"utility",source:"prepared",text:"Copied from the stacks."});return n.cleared=!0,{success:!0,learned:a}}case"deep-study":{const a=Math.max(...e.living().filter(h=>h.class===X.WIZARD).map(h=>h.mind)),l=Ri(e),c=l.deepStudy>0?[{source:l.notes.deepStudy,text:"📖 The Grimoire of Low Whispers adds +1.5 to the reading roll."}]:[],d=a+l.deepStudy+Gt()>9;return d?(e.spellsLearned+=2,e.addScore(50),e.grimoire.push({id:`sealed-${bo()}`,name:"Sealed Working",icon:"🔏",school:"forbidden",power:6,use:"combat",source:"prepared",text:"The margins screamed. The wizard did not."})):e.takeDamage(4),n.cleared=!0,e.recordEncounter("deep-study",d),{success:d,preps:d?c:[]}}case"rest":{const a=e.hasPersonality("pious")?4:0,l=Ci().mendAtShrine,c=[];if(l)for(const h of e.living())h.wounds>0&&(h.mendWounds(l),c.push(h.name));for(const h of e.living())h.heal(5+a);n.cleared=!0;const d=c.length?[{source:"field surgery",text:`✚ Somebody sets what the march only bandaged: a wound closed on ${c.join(", ")} without waiting for town.`}]:[];return{success:!0,healed:5+a,mended:c,preps:d}}case"desecrate":return e.addGold(30),e.desecrated=!0,n.cleared=!0,{success:!0,gold:30,ominous:!0};case"descend":{const a=Math.min(1,e.supply);return e.supply-=a,n.cleared=!0,{success:!0,descended:!0,supplySpent:a}}case"rope-down":return n.cleared=!0,{success:!0,descended:!0,supplySpent:0,preps:[{source:"the Grapple and Line",text:"🪢 The line goes down the shaft beside the stair: the party descends without burning a march of oil."}]};case"camp-stair":{const a=Ci(),l=a.campSupply?Math.max(1,2-a.campSupply):2,c=Math.min(l,e.supply);e.supply-=c;const d=6;let h=0;for(const m of e.living()){const u=m.health;m.heal(d),h+=m.health-u}const f=e.living().filter(m=>m.wounds>0).sort((m,u)=>u.wounds-m.wounds)[0]||null;f&&f.mendWounds(1);const p=!a.campWatched&&Gt()>=5;let g=0;p&&(g=4+Math.floor(Gt()/2),e.takeDamage(g)),n.cleared=!0;const v=a.campWatched?[{source:"Cold Camp",text:`🏕️ No fire and a watch kept: the camp costs ${c} supply and nothing finds it.`}]:[];return{success:!0,descended:!0,camped:!0,healed:d,healedTotal:h,mended:(f==null?void 0:f.name)||null,supplySpent:c,damage:g,interrupted:p,preps:v}}case"brace":{const a=e.desecrated?8:5;e.takeDamage(Math.max(1,a-Math.floor(e.totalDefense()/4))),n.cleared=!0;const l=[],c=e.castSpell("heal");return c&&(e.healParty(c.effectivePower),l.push({source:c.name,text:`💚 ${c.name} heals ${c.effectivePower} as the dust settles.`})),{success:!0,damage:a,preps:l}}case"scatter":{let a=0;for(const l of e.living())Gt()<4&&(l.takeDamage(3),a++);return n.cleared=!0,{success:a<=1,hurt:a}}case"pass-by":case"proceed":default:return n.cleared=!0,{success:!0}}}const By={[X.FIGHTER]:{brave:["Stand back — this is the part I'm for.","If it bleeds on me, that's how I know it's working."],cunning:["A fight you skip counts double.","I hit hardest from the side nobody's watching."],greedy:["The sword's just how I open lockboxes.","Everything down here is carrying something. I collect.","Danger pay. Emphasis on pay."],scholarly:["I read a treatise on this maneuver. Chapter three. Brace.","Footwork is just grammar for the body."],pious:["My shield has a saint on it. She's watching. Form up.","The body is a temple. Mine's a fortress."],reckless:["Plan? I'm the plan.","Last one in buys the ale!"],craven:["I'll guard the rear. Someone has to. Far back.","My shield works best with me behind it and everything else very far away."],generic:["Behind me.","This is the job."]},[X.CLERIC]:{brave:["Faith walks in front. So do I.","The light goes first. I merely follow it, loudly."],cunning:["Grace favors the well-prepared.","The god helps those who check for tripwires."],greedy:["Tithes flow both directions, technically.","The god counts. So do I.","Even the dead tithe here. Especially the dead."],scholarly:["The liturgy has a verse for this. Several, actually.","The commentaries disagree. I don't."],pious:["We are exactly where we are meant to be. Regrettably.","Candles first. Then courage."],reckless:["The god forgives. That's the whole strategy.","Heal fast, ask later."],craven:["I have a strong feeling we should be elsewhere. Call it prophecy.","The god counsels prudence. Loudly. Through me. Right now."],generic:["Steady. All of you, steady.","Wounds after. Walking now."]},[X.WIZARD]:{brave:["I did not memorize this spell to whisper it.","Range is a suggestion. Watch."],cunning:["There's a cheaper way to do this. There always is.","Why duel what you can outwit?"],greedy:["Knowledge is treasure, but treasure is also treasure.","Transmutation started as a hobby. It's a livelihood now.","What that thing drops will fund a semester of research."],scholarly:["Fundamentals of Sorcery, volume three, page ninety: this exact mistake.","Fascinating. Everyone stand behind me while I annotate."],pious:["Magic is prayer with better handwriting.","I asked permission for this spell. Twice."],reckless:["Overchannel? I call it generous casting.","The safety margin is where the good magic lives."],craven:["I know a spell for this. It's called leaving.","I did not survive the academy by standing in the open."],generic:["Allow me.","This will only take a syllable."]},[X.ROGUE]:{brave:["Quietly is for people with time.","I'll scout it — from inside."],cunning:["Every door is a suggestion.","Doors, guards, promises — all pickable."],greedy:["It isn't stealing if the owner's a skeleton.","My fingers itch. That means gold, or a rash.","I already know which part of it sells."],scholarly:["The lock's a three-pin Herrengrave. The book was wrong about them. I'm not.","I've studied every trap in the codex. This one's new. Wonderful."],pious:["Even locks answer to providence. I just expedite.","I confess in advance. Saves time."],reckless:["Traps are just puzzles with stakes.","I disarm faster when it's already ticking."],craven:["There's a wire there. I noticed it while planning my retreat.","I've counted the exits. There are three. I love them all."],generic:["Give me a moment, and don't watch.","Nobody move. Especially the floor."]},[X.ALCHEMIST]:{brave:["I've drunk worse than whatever that is.","Every explosion is a lesson. Class is in session."],cunning:["Measure twice, pour once.","Add nothing until you know what it does. Then add plenty."],greedy:["Gold in, gold out — that's the whole science.","Everything in this room fits in my satchel if I believe.","Don't burn the carcass — half my income is in the glands."],scholarly:["The notes end mid-sentence. I intend to finish them.","Peer review can wait. The flask can't."],pious:["The Work is a devotion. The explosions are incidental.","As above, so below. Mind the fumes between."],reckless:["Shake it and see.","If it smokes, it works. If it screams, it works better."],craven:["I keep my hazards bottled, thank you.","Run first. The reaction can finish without us."],generic:["I have something for this. Probably.","Don't breathe in until I say."]}},zy=4;let ms=[];function Hy(n,e=[],t=Math.random){const i=By[n];if(!i)return null;const s=[];for(const l of e)i[l]&&s.push(...i[l]);s.length===0&&s.push(...i.generic);const r=s.filter(l=>!ms.includes(l)),o=r.length>0?r:s,a=o[Math.floor(t()*o.length)];return ms.push(a),ms.length>zy&&ms.shift(),a}function Gy(){ms=[]}const Uc={delve:"The party enters the Old Delve: rats, skeletons, and goblin toll-gangs between here and the boss.",castle:"The party enters the Castle of the Vampire Lord. Treasure is plentiful; most of the household is undead or ethereal.",icecaverns:"The party enters the Ice Caverns of the Mad Pyromancer. Disasters are frequent, and fire and frost weaknesses run through everything."},Oc={castle:"The candles go out: the castle itself attacks the party in the dark.",icecaverns:"A fire vent meets the cavern ice: a scalding steam blast fills the room."},ba={entrance:["The party gathers at the dungeon entrance and starts down."],corridor:["A connecting corridor. Nothing blocks the way; the party moves through."],stairs:["A stair cut into the rock, going down. Cold air comes up it.","The floor ends at a stairwell. Whatever is below has been waiting longer.","Steps down, worn in the middle by traffic that stopped a long time ago."],monster:["A monster holds the room. The party must decide how to get past it."],trap:["A trap blocks the corridor. The party must disarm it, avoid it, or take the hit."],treasure:["A treasure chest sits in the room. It may hold gold; it may be a mimic."],library:["A library. The party can study here to learn spells."],shrine:["A shrine. Resting here heals the party; the gold leaf on the altar could be stripped instead."],lab:["An alchemy lab with a working bench. An alchemist with materials can brew or coat weapons here."],materials:["A room of herbs, salts, and quicksilver — alchemy materials, free to gather."],disaster:["The dungeon itself turns hostile. The party must brace together or scatter."],boss:["The boss chamber. Killing what waits here clears the dungeon."],vault:["A hidden vault, stacked with treasure. Vaults always hold something beyond coin."]};function Vy(n,e=null){var r;const t=n.living().find(o=>o.class===X.ROGUE),i=t?t.name:((r=n.living()[0])==null?void 0:r.name)||"Someone",s=e!=null&&e.tell?` Behind it: ${e.tell}.`:"";return`🕳️ ${i} finds a hidden door into ${(e==null?void 0:e.name)||"a side passage"}.${s} Its rooms join the route.`}function $y(n,e=null,t=null){const i=(e==null?void 0:e.name)||"the side passage",s=e!=null&&e.tell?` — ${e.tell}`:"",r=e!=null&&e.tell?` (${e.tell})`:"";return n?t?`🧭 ${t[0].toUpperCase()}${t.slice(1)}: the party turns off into ${i}. Its rooms join the route.`:`🧭 The party turns off into ${i}${s}. Its rooms join the route.`:`🚶 The party looks into ${i}${r} and keeps to the main route.`}const Fc={"commune-armour":"speak with whatever wears the armour","name-the-owner":"name the armour by its heraldry","strip-insignia":"strip the insignia off it","read-its-gait":"read its movement and walk around it","put-it-down":"put the armour down","accept-duel":"accept the duel","negotiate-terms":"negotiate the terms","recognize-style":"recognize his school","push-past-duellist":"push past him","solve-progression":"solve the progression","read-the-dust":"read the dust","divine-safe-square":"ask which square is safe","cross-in-order":"cross in order","walk-it":"just walk it","read-the-plan":"read the place itself","reconstruct-his-rounds":"reconstruct his rounds","question-the-ghost":"question the ghost gently","ask-where-it-lies":"scry for the map","leave-cartographer":"leave him looking for it","linked-plan":"pass a plan through the stone","link-minds":"speak mind to mind","send-a-messenger":"send something under the slab","signal-by-sound":"signal by sound","work-the-slab":"work the slab","shout-through-it":"shout through it","repair-gears":"repair the gears","correct-orrery":"correct the orrery","divine-instability":"divine the unstable motion","recognize-model":"recognize the cosmological model","steady-ground":"hold the stationary floor","hurry-through":"hurry through the turning room","read-correspondences":"read the correspondences","planetary-sequence":"work the planetary sequence","material-symbolism":"read the metals","reconcile-traditions":"reconcile the traditions","divine-sequence":"divine the opening order","force-the-door":"force the door","leave-sealed":"leave it sealed","negotiate-grievance":"negotiate with it","translate-claim":"answer it in its own tongue","identify-artifact":"identify the disputed thing","investigate-claim":"investigate its claim","slip-past-grievance":"slip past it","fight-grievance":"fight it","appraise-chests":"appraise the three chests","knowledge-mark":"read the maker's mark","observation-pick":"pick the chest that was opened before","guess-heavy":"take the heaviest chest","experiment-rebuild":"experiment with the assembly","alchemy-bypass":"dissolve the lock","tinkering-solve":"understand the mechanism and fix it","take-detour":"take one of the side passages","heal-directly":"bring the fever down","medicine-diagnose":"diagnose and treat the fever","naturalphil-remedy":"apply a natural remedy","reconstruct-memory":"reconstruct the mosaic from memory","imagine-solution":"imagine what the image should be","knowledge-pattern":"recognize the mosaic","smash-wall":"break through the wall","music-harmony":"sing the third harmony","harmony-attune":"attune the resonances","correspondence-solve":"link the three frequencies","endure-discord":"endure the discord","observe-closely":"observe every detail","search-methodical":"search the room methodically","divine-presence":"divine what is hidden here","hurry-past":"move along","brew-oil":"cook a material down into lamp oil",fight:"stand and fight",flee:"fall back",sneak:"sneak past","turn-undead":"turn the undead",bribe:"pay the toll","spell-strike":"open with a combat spell",disarm:"disarm the trap","push-through":"push through and take the hit","search-around":"search for a way around","spell-bypass":"bypass it with a utility spell",loot:"loot the treasure",inspect:"inspect it first","leave-it":"leave it alone",study:"study the shelves","deep-study":"read the sealed texts",rest:"rest and heal",desecrate:"strip the gold leaf","pass-by":"move on",proceed:"move on",alchemy:"work the lab bench",gather:"gather the materials",brace:"brace together",scatter:"scatter and regroup","knock-open":"open it with Knock","cause-fear":"cast Cause Fear","smoke-bomb":"spring it with a smoke bomb",descend:"take the stair down","rope-down":"rope down the shaft beside it","camp-stair":"camp at the stairhead first","shove-into-pit":"shove it into the pit","shove-onto-spikes":"put it onto the floor spikes","shove-into-chasm":"put it down the crack in the floor","topple-boulder":"topple the boulder onto it","shove-into-brazier":"shove it into the brazier","drop-portcullis":"drop the portcullis on it","fight-from-cover":"fight from behind the pillars","pry-sarcophagus":"pry the sarcophagus open","bless-the-font":"bless the font and drink","fill-waterskins":"fill the waterskins","harvest-spout":"harvest the spout","sift-rubble":"sift the rubble","crack-crates":"crack the crates open","work-the-anvil":"put an edge back on at the anvil","strip-the-shelves":"strip the shelves"};let wo=0;function Wy(){wo=0}const Bc={brave:["the Bold voted to meet it head-on","the Bold saw no reason to be careful about it","the Bold wanted it settled here"],cunning:["the Cunning picked the safer angle","the Cunning looked for the way that costs least","the Cunning had already worked out the odds"],greedy:["the Covetous wanted the payout","the Covetous counted what was in the room first","the Covetous refused to leave anything behind"],scholarly:["the Scholarly wanted the knowledge","the Scholarly wanted a closer look before anything else","the Scholarly argued from what the books say about this"],pious:["the Devout called it the right thing to do","the Devout said the god would want it this way","the Devout would not hear of the other options"],reckless:["the Reckless did not wait for a vote","the Reckless were already moving","the Reckless settled it by going first"],craven:["the Craven pushed for the safest option","the Craven wanted no part of the alternative","the Craven argued for whatever kept a door behind them"]},qy={fight:X.FIGHTER,sneak:X.ROGUE,disarm:X.ROGUE,"turn-undead":X.CLERIC,rest:X.CLERIC,"deep-study":X.WIZARD,"spell-strike":X.WIZARD,"spell-bypass":X.WIZARD,alchemy:X.ALCHEMIST,gather:X.ALCHEMIST};function Xy(n,e,t){const i=Fc[n]||n,s=e.filter(d=>d.id!==n).slice(0,2).map(d=>Fc[d.id]||d.id);let r=null;const o=qy[n],a=d=>{const h=Hy(d.class,t.personalities);return h?`${d.name} made the case: "${h}"`:null};if(o&&t.hasClass(o)){const d=t.living().find(h=>h.class===o);r=a(d)||`${d.name} made the case`}if(!r){const d=t.living();for(let h=0;h<d.length&&!r;h++)r=a(d[(wo+h)%d.length])}if(wo++,!r){for(const d of t.personalities)if(Bc[d]){r=Ft(Bc[d]);break}}r||(r="nobody argued");const l=r.endsWith('"')?"":".";return s.length===0?`There was only one option: the party chose to ${i}.`:`They might have chosen to ${s.length===2?`${s[0]}, or ${s[1]}`:s[0]} — ${r}${l} The party chose to ${i}.`}function Yy(n,e){const t=Hn[n],i=Cr(t.feature),s=(i==null?void 0:i.icon)||"🧱",r=(i==null?void 0:i.name)||"the furniture";if(t.fightOnly){const l=e.featureDamage??t.openerDamage;switch(n){case"shove-into-pit":return`${s} The party shoves the monster into ${r}: ${l} damage, and it has to climb back out.`;case"shove-onto-spikes":return`${s} The party drives the monster back onto ${r}: ${l} damage, and it has to pull itself off them.`;case"shove-into-chasm":return`${s} The party works the monster to the edge and puts it into ${r}: ${l} damage on the way down.`;case"topple-boulder":return`${s} The party topples ${r} down the slope onto the monster: ${l} damage.`;case"shove-into-brazier":return`${s} The party drives the monster into ${r}: ${l} fire damage.`;case"drop-portcullis":return`${s} The winch lets go and ${r} comes down across the monster: ${l} damage.`;case"fight-from-cover":return`${s} The party backs into ${r} and makes the monster come down one aisle at a time: ${l} damage as it closes.`;default:return`${s} The party turns ${r} against the monster: ${l} damage.`}}const o=[];n==="pry-sarcophagus"?o.push(`${s} The party pries the lid off ${r}`):n==="bless-the-font"?o.push(`${s} The cleric says the words over ${r} and the party drinks`):n==="fill-waterskins"?o.push(`${s} The party fills its waterskins at ${r}`):n==="harvest-spout"?o.push(`${s} The alchemist bottles what drips from ${r}`):n==="sift-rubble"?o.push(`${s} The party sifts ${r}`):n==="crack-crates"?o.push(`${s} The party cracks open ${r}`):n==="work-the-anvil"?o.push(`${s} The party works ${r}`):n==="strip-the-shelves"?o.push(`${s} The wizard strips ${r}`):o.push(`${s} The party uses ${r}`);const a=[];return e.gold&&a.push(`${e.gold} gold`),e.materials&&a.push(`${e.materials} material${e.materials===1?"":"s"}`),e.healed&&a.push(`${e.healed} health healed`),e.spell&&a.push(`a scroll of ${e.spell} for the grimoire`),e.weaponMod&&a.push(`${e.weaponMod.name} on ${e.weaponMod.target}'s weapon (+${e.weaponMod.attack} attack)`),e.curedLinger&&a.push("the lingering venom flushed out"),`${o[0]}: ${a.length?a.join(", "):"nothing worth carrying"}.`}function wa(n){return n.rounds?`⚔️ The party kills ${n.monster} in ${n.rounds} round${n.rounds===1?"":"s"}, taking ${n.damage} damage.`:`⚔️ ${Ui(n.monster)} is dead before the party closes: it never gets a round.`}const jy=["the entrance level","the second floor","the third floor","the fourth floor"];function tr(n){return jy[n]||"the floor below"}const Jy=["The party moves on to the next room.","Nothing here needs doing. The party walks on.","The party crosses the room and takes the far door.","There is nothing to fight and nothing to take. The party keeps going.","The party files through and leaves the room behind."],zc=new Set(sh().map(n=>n.name.toLowerCase())),Ky=new Set(["the room before this one","the corrected heavens","the warning","the alarm"]),Zy=3;function Qy(n=[],e=0){const t=Math.max(2,Zy-e),i=[],s=[];for(const l of n){const c=String(l.source||"").toLowerCase();if(Ky.has(c)){i.push(l);continue}const d=zc.has(c)||zc.has(c.replace(/^the /,""));s.push({p:l,isCard:d})}const r=[...s.filter(l=>l.isCard),...s.filter(l=>!l.isCard)],o=new Set(r.slice(0,t).map(l=>l.p)),a=[];for(const{p:l}of s)(o.has(l)?i:a).push(l);return{inline:i,folded:a}}function Sa(n){return`🎒 ${n} more preparation${n===1?" holds":"s hold"} besides — the ledger keeps ${n===1?"it":"them"}.`}function Hc(n){const e=n.brunt;return!e||!n.rounds||e.lost<4||e.lost>n.damage?null:Ft([`🩸 ${e.name} takes the worst of it: ${e.lost} of the party's ${n.damage}.`,`🩸 Most of that lands on ${e.name} — ${e.lost} of the ${n.damage} taken.`,`🩸 It is ${e.name} standing in front of it: ${e.lost} of the ${n.damage} the party takes.`])}function e_(n,e,t,i){var o,a;const s=[];if(t!=null&&t.narrative){s.push(t.narrative);for(const l of t.preps||[])s.push(l.text);return t.foldedPreps&&s.push(Sa(t.foldedPreps)),s.join(" ")}if(Hn[e]){if(s.push(Yy(e,t)),Hn[e].fightOnly){s.push(t.success?t.rounds===0?`⚔️ ${Ui(t.monster)} is finished before it can strike back.`:wa(t):`☠️ Even so, ${t.monster} beats the party down.`);const c=Hc(t);c&&s.push(c)}for(const c of t.preps||[])s.push(c.text);return t.foldedPreps&&s.push(Sa(t.foldedPreps)),s.join(" ")}switch(e){case"fight":{const l=(o=t.itemActions)==null?void 0:o.find(c=>c.opening||c.vsUndead||c.summonAttack);if(l){const c=l.opening?`${l.opening}${l.vsUndead&&((a=n.monster)!=null&&a.undead)?` (+${l.vsUndead} vs undead)`:""} damage before round one`:l.summonAttack?`a summon adding ${l.summonAttack} attack each round`:"its effect";s.push(`🪄 ${l.member} uses the ${l.item} — ${l.name}: ${c}.`)}t.success&&t.rounds===0?s.push(`⚔️ ${Ui(t.monster)} is killed before it can strike back. The party takes no damage.`):t.success?s.push(wa(t)):s.push(`☠️ ${Ui(t.monster)} is too strong: the party is beaten down over ${t.rounds} round${t.rounds===1?"":"s"}.`);break}case"spell-strike":{t.spell?t.spellEdge==="weak"?s.push(`🔥 The caster opens with ${t.spell}, chosen precisely for the monster's ${t.spellElement} weakness: spell damage ×1.5.`):t.spellEdge==="swarm"?s.push(`🔥 ${t.spell} opens the fight; against a swarm the spell hits ×1.5.`):t.spellEdge==="resisted"?s.push(`🔥 ${t.spell} opens the fight, but the monster resists the element: spell damage ×0.5.`):s.push(`🔥 ${t.spell} opens the fight, softening the monster before the first blow.`):s.push("🔥 No combat spell was available, so the party fights with weapons alone."),t.success&&t.rounds!==void 0?s.push(wa(t)):t.success||s.push(`☠️ Even softened, ${t.monster} beats the party down.`);break}case"sneak":s.push(t.success?`🗡️ The rogue leads the party past ${t.monster} unseen. No damage taken; +15 score.`:`🗡️ The sneak fails: ${t.monster} notices and lands a blow before the party scrambles clear.`);break;case"turn-undead":s.push(t.success?`✨ The cleric turns the undead: ${t.monster} crumbles. +30 score.`:`✨ The turning fails: ${t.monster} attacks while the cleric recovers.`);break;case"bribe":s.push(`💰 The party pays ${t.goldSpent||15} gold and ${t.monster} lets them pass. No fight.`);break;case"cause-fear":s.push(`😱 ${t.spell||"Cause Fear"} routs ${t.monster}: the room clears without a fight. +20 score.`);break;case"smoke-bomb":s.push("⚗️ The alchemist spends 1 material on a smoke concoction and springs the trap from a safe distance. No damage taken.");break;case"knock-open":s.push(t.wasMimic?`🚪 ${t.spell} opens the chest from across the room — it was a mimic, and it springs at nothing. ${t.gold} gold taken safely.${t.consumed?" The scroll is consumed.":""}`:`🚪 ${t.spell} opens the lock at range: ${t.gold} gold taken.${t.consumed?" The scroll is consumed.":""} The noise carries through the dungeon.`);break;case"flee":s.push(Ft(d_)(t.fled||1,t.damage??2));break;case"disarm":s.push(t.success?"🗝️ The rogue disarms the trap. No damage taken; +20 score.":"🗝️ The disarm fails: the trap springs for half damage.");break;case"push-through":s.push(`💥 The party pushes through the trap, taking ${t.damage} damage.${t.spotted?" The Craven spotted the tripwire first: 1 less damage.":""}`);break;case"loot":s.push(t.mimic?`🦷 The chest is a mimic. It bites for 5 damage before the party kills it, recovering ${t.gold} gold.`:`💰 The party loots the chest: ${t.gold} gold.`);break;case"inspect":s.push(`🔍 The party checks for mimics and curses first, then takes ${t.gold} gold safely.`);break;case"leave-it":s.push("🚶 The party leaves the treasure untouched and moves on.");break;case"study":s.push(`📚 The party studies the shelves and learns ${t.learned} spell${t.learned>1?"s":""}.`);break;case"deep-study":s.push(t.success?"🔏 The wizard reads the sealed texts: 2 spells learned, including a forbidden working. +50 score.":"🔏 The sealed text backfires: the wizard takes 4 damage and learns nothing.");break;case"rest":s.push(`🕯️ The party rests at the shrine: ${t.healed} health healed per member.`);break;case"desecrate":s.push("⛏️ The party strips 30 gold of leaf from the altar. The next disaster will hit harder for it.");break;case"alchemy":{const l=t.alchemy;l?l.type==="potion"?s.push(`⚗️ The alchemist spends 1 material and brews a healing draught (heals 6)${l.doubled?" — two, in fact; Perenelle works in doubles":""}.`):s.push(`⚗️ The alchemist spends 1 material and applies ${l.mod.name} to ${l.target}'s weapon: +${l.mod.attack} attack.`):s.push("⚗️ The bench is usable but the satchel is empty: no materials, nothing brewed.");break}case"gather":s.push(`🌿 The party gathers ${t.materials} bundle${t.materials>1?"s":""} of alchemy materials.`);break;case"brew-oil":s.push("⚗️ The alembic goes on the bench and a bundle of materials becomes light to march by.");break;case"brace":s.push(`🌋 The party braces together and rides it out: ${t.damage} damage taken.`);break;case"scatter":s.push(t.success?"🌋 The party scatters; nearly everyone finds cover. Minimal damage.":`🌋 The party scatters; ${t.hurt} member${t.hurt===1?"":"s"} guessed wrong and took 3 damage each.`);break;case"descend":s.push(`🪜 The party goes down the stair to ${tr(n.descendsTo)}, ${t.supplySpent===1?"burning a march of oil on the climb":"and the lamp is already out"}.`);break;case"rope-down":s.push(`🪜 The party ropes down the shaft beside the stair and lands on ${tr(n.descendsTo)}.`);break;case"camp-stair":{const l=t.mended?` A night off their feet sets one of ${t.mended}'s wounds.`:"";s.push(t.interrupted?`🏕️ The party makes camp at the stairhead and something climbs the stair into it: ${t.healed} healed each, ${t.damage} damage taken, and ${tr(n.descendsTo)} still to go.${l}`:`🏕️ The party makes camp at the stairhead and eats before the climb: ${t.healed} healed each, then down to ${tr(n.descendsTo)}.${l}`);break}default:s.push(Ft(Jy))}const r=Hc(t);r&&s.push(r);for(const l of t.preps||[])s.push(l.text);return t.foldedPreps&&s.push(Sa(t.foldedPreps)),s.join(" ")}function t_(n,{succeeding:e=null}={}){return n?Ft(e?[`🛡️ With ${e} down, ${n.name} takes the front. The next thing through the door meets them first.`,`🛡️ Somebody has to stand where ${e} was standing. ${n.name} moves up.`,`🛡️ ${n.name} steps into the gap ${e} left, and the party re-forms behind them.`]:[`🛡️ ${n.name} walks in front, which is where the blows land first.`,`🛡️ The order settles with ${n.name} at the head of it: whatever comes, comes to them.`,`🛡️ ${n.name} takes the front of the march, and the rest fall in behind.`]):null}const n_={low:[n=>`🕯️ The lantern is burning low: oil for ${n} more ${n===1?"march":"marches"}.`,n=>`🕯️ The wick is well down the oil. ${n} more ${n===1?"march":"marches"} of light, then none.`,n=>`🕯️ Someone checks the reservoir and does not like the answer: oil for ${n} more ${n===1?"march":"marches"}.`],guttered:[()=>"🕯️ The last of the oil goes. From here the party walks in the dark.",()=>"🕯️ The flame stands up, thins, and is gone. The party is out of oil.",()=>"🕯️ The lantern dies with the party still under the hill. No more light to carry."],conjured:[(n,e)=>`💡 ${n} carries the march instead of oil: none of the ${e} damage the dark would have taken.`,(n,e)=>`💡 No oil left, so ${n} does the work — light enough to walk by, and ${e} damage nobody pays.`,(n,e)=>`💡 ${n} kindles in the empty air and the party walks on seeing. The dark takes nothing.`],"sure-footed":[(n,e)=>`🪶 ${n} takes the party's weight off the floor: they walk the dark without walking into it, and pay none of the usual ${e}.`,(n,e)=>`🪶 No light, but no stumbling either — ${n} carries them through blind and whole, ${e} damage unpaid.`,(n,e)=>`🪶 ${n} means the floor never tells them what they hit. Nothing does: ${e} damage avoided.`],"dark-seen":[(n,e)=>`👁️ ${n} makes the dark no trouble: the party walks on, ${e} damage unpaid.`,(n,e)=>`👁️ ${n} reads the black like a page, and the march costs nothing.`,(n,e)=>`👁️ ${n} leads them through whole — none of the usual ${e} damage.`]},Gc=[n=>`🌑 The party gropes through the dark and pays for it: ${n} damage to everyone.`,n=>`🌑 Another march by touch alone. Walls, edges, and things underfoot take ${n} from each of them.`,n=>`🌑 The dark is telling now. Everyone is bleeding somewhere they cannot see: ${n} damage each.`,n=>`🌑 They have stopped calling it a march. ${n} damage to everyone, again, and the hill goes on.`];function i_(n){var t;if(!n)return null;if(n.kind==="dark"){const i=Math.max(1,n.darkMarches||1),s=Gc[Math.min(i,Gc.length)-1],r=i===1&&((t=n.temper)!=null&&t.length)?" "+n.temper.map(o=>o.text).join(" "):"";return s(n.damage)+r}const e=n_[n.kind];return e?n.kind==="conjured"||n.kind==="sure-footed"||n.kind==="dark-seen"?Ft(e)(n.source,n.full):Ft(e)(n.supply):null}const s_=[(n,e)=>`✚ ${n} takes a wound that will not close down here. Healing can bring them back to ${e}, no further, until town.`,(n,e)=>`✚ That one leaves a mark on ${n}. Their ceiling drops to ${e} for the rest of the delve.`,(n,e)=>`✚ ${n} is opened up badly enough that the delve will keep it: ${e} is as whole as they get until town.`],r_=[(n,e,t)=>`✚ ${n} is wounded again — ${t} scars now, and nothing can heal them past ${e} before town.`,(n,e,t)=>`✚ ${t} wounds on ${n}, and the ceiling with them: ${e}, and no more.`];function a_(n){return!n||n.length===0?null:"🕯️ "+n.map(e=>e.text).join(" ")}function o_(n,e=null){const t=n.effectiveMax?n.effectiveMax():n.maxHealth,i=n.wounds>1?Ft(r_)(n.name,t,n.wounds):Ft(s_)(n.name,t);return e!=null&&e.length&&n.wounds===1?`${i} ${e.map(s=>s.text).join(" ")}`:i}function l_(n,e=null){const t=`☠️ ${n.name} falls. The party's ${n.class} is dead`;return e===null?`${t}.`:e<=0?`${t}, and there is nobody left to carry them out.`:e===1?`${t}; one of them is still standing.`:`${t}; the ${e} still standing march on.`}function pd(n,e){const t=n.trophies||[];if(t.length===0)return"";const i=t[t.length-1];return e?` Trophies carried out: ${t.length} (latest: ${i.icon} ${i.name}).`:` Trophies lost with them: ${t.length} (latest: ${i.icon} ${i.name}).`}function c_(n,e,t=null){const i=n.members.map(r=>r.name).join(", ");return`The party is wiped out${t?` in ${t.name}`:""}. The dead: ${i}. Rooms cleared: ${e}.${pd(n,!1)}`}function h_(n,e,t=null){const i=n.living().map(r=>r.name).join(", ");return`${t?`${t.name} is cleared`:"The dungeon is cleared"}: the boss is dead and the party walks out. Survivors: ${i}. Rooms cleared: ${e}.${pd(n,!0)}`}const d_=[(n,e)=>n>1?`💨 They back out again and it follows further this time: ${e} damage on the way.`:`💨 The party retreats, taking ${e} damage on the way out. The room stays hostile; they will have to try it again.`,(n,e)=>n>1?`💨 Out through the same door a second time, ${e} damage the toll. There is no third.`:`💨 The party gives ground, ${e} damage on the way out, and the room keeps what it was holding.`,(n,e)=>n>1?`💨 Another retreat, and it costs ${e} this time. The room is winning this by attrition.`:`💨 They fall back, paying ${e} for the room they do not take.`],u_=[n=>`They are back. ${n===2?"The room has not improved.":`This is the ${n}${n===3?"rd":"th"} time, and it knows them now.`}`,n=>`The same room again${n>3?", and the party is running out of ways to describe it":""}. Whatever is in it has had time to think.`,n=>`Back through the same door, for the ${n===2?"second":n===3?"third":`${n}th`} time. Nothing here has forgotten them.`];function Ma(n,e=null){var i;if(n!=null&&n.encounterId&&!n.visits){const s=_y(n.encounterId);if(s!=null&&s.situation)return s.situation}if((n==null?void 0:n.fled)>=2&&!n.cleared)return`They are back, and there is no backing out this time: ${((i=n.monster)==null?void 0:i.name)||"it"} is between them and the door.`+Ta(n.monster);if((n==null?void 0:n.visits)>1&&!n.cleared)return Ft(u_)(n.visits)+Ta(n.monster);if(n.type===fe.ENTRANCE&&e&&Uc[e.id])return Uc[e.id];if(n.type===fe.DISASTER&&e&&Oc[e.id])return`${Oc[e.id]} The party must brace together or scatter.`;if((n.type===fe.BOSS||n.type===fe.MONSTER)&&n.monster){const s=n.monster,r=s.attack!=null&&s.health!=null?` (attack ${s.attack}, health ${s.health})`:"";return(n.type===fe.BOSS?`The boss chamber. ${Ui(s.name)} waits at its center${r}; killing it clears the dungeon.`:`${Ui(s.name)} holds the room${r}. The party must decide how to get past it.`)+Ta(s)+Ea(n)}if(n.type===fe.TRAP&&n.trapType&&Wc[n.trapType])return`${Ft(ba.trap)} ${Wc[n.trapType]}${Ea(n)}`;const t=ba[n.type]||ba.corridor;return Ft(t)+Ea(n)}const f_=2;function Ea(n){const e=Lr(n);if(e.length===0)return"";const t=e.filter(s=>Hn[s.action]||s.action);return" "+[...t,...e.filter(s=>!t.includes(s))].slice(0,f_).map(s=>s.tell).join(" ")}const Vc={armored:"Plate and chitin cover it: the party's blows do 2 less damage each round.",ethereal:"It is ethereal: weapons do only 60% damage unless a cleric blesses the blades.",venomous:"It is venomous: even a won fight leaves poison working, unless a cleric cures it.",swarm:"It is a swarm: spell openings hit it ×1.5.",slow:"It is slow: the party strikes first and takes no damage in round one."},$c={fire:"It keeps clear of the torches: weak to fire (fire damage ×1.5).",frost:"It flinches from the cold: weak to frost (frost damage ×1.5).",shock:"Its hairs stand on end: weak to shock (shock damage ×1.5).",holy:"It will not face the cleric: undead take holy damage ×1.5."};function Ta(n){const e=[];n.trait&&Vc[n.trait]&&e.push(Vc[n.trait]);const t=n.undead?"holy":(n.weak||[])[0];return t&&$c[t]&&e.push($c[t]),e.length?" "+e.join(" "):""}const Wc={fire:"Scorch marks fan out from a seam in the floor: a fire trap. A frost spell can blunt it.",poison:"Dead beetles ring one tile: a poison trap. Light damage now, lingering venom later unless a cleric cures it.",alarm:"A tripwire runs up the wall to a bell: an alarm trap. Little damage, but the next monster will be warned (+2 attack)."};function Ft(n){return n[Math.floor(Math.random()*n.length)]}function Ui(n){return n&&n.charAt(0).toUpperCase()+n.slice(1)}const So=new Map;function p_(){So.clear()}function Aa(n){const e=n[0],t=So.get(e),i=n.filter(r=>r!==t),s=i[Math.floor(Math.random()*i.length)]||n[0];return So.set(e,s),s}function nr(n,e){const t=n.living().length;return e.map((i,s)=>l_(i,t+(e.length-1-s)))}class md{constructor(e,t="delve",i="medium",s={}){var a,l;this.seed=t,this.difficulty=i,this.depth=Math.max(1,s.depth||1),this.party=e instanceof Oi?e:new Oi(e),this.dungeon=s.layout?ey(s.layout):j0(t,i,{wantLab:this.party.hasClass(X.ALCHEMIST),theme:s.theme,depth:this.depth,condition:s.condition,providence:s.providence}),this.condition=this.dungeon.condition,this.path=this.dungeon.spine.slice(),this.party.provision(this.path.length,i),this.roomIndex=0,this.turn=0,this.roomsCleared=0,this.gameOver=!1,this.victory=!1,this.paused=!1,this.epitaph=null,this.lastNarration=null,this.pointName=null,this.log=[],this.pendingLedger=[],this.chronicle=s.chronicle instanceof $i?s.chronicle:new $i(this.party.members.map(c=>c.name).join(", ")||"the party"),Gy(),Wy(),p_(),this.chronicle.beginDelve({seed:t,difficulty:i,depth:this.depth,theme:((a=this.dungeon.theme)==null?void 0:a.name)||null,condition:this.condition&&this.condition.id!=="none"?this.condition.name:null,roster:this.party.members.map(c=>`${c.icon} ${c.name} (${c.class})`+(c.backstory?` — ${c.backstory}`:""))}),this.stateBefore=Rc(this);const r=a_(this.party.provisionNotes);r&&(this.log.push(r),this.chronicle.recordAside(r));const o={easy:1,medium:1.5,hard:2,nightmare:3}[i]||1;this.scoreMultiplier=o*(1+(((l=this.condition)==null?void 0:l.scoreBonus)||0))}addLog(e){this.log.push(e)}tick(){if(this.paused||this.gameOver)return;const e=this.log.length;try{this._tick()}finally{this.recordTick(e)}}recordTick(e=this.log.length){var s,r,o;const t=Rc(this),i=sy(this.stateBefore,t,{turn:this.turn,room:((s=this.lastNarration)==null?void 0:s.room)||null});for(const a of this.log.slice(e))i.push({turn:this.turn,room:((r=this.lastNarration)==null?void 0:r.room)||null,field:null,icon:"·",text:a,salience:at.BEAT,described:!0});for(const a of this.pendingLedger.splice(0))i.push({turn:this.turn,room:((o=this.lastNarration)==null?void 0:o.room)||null,field:null,icon:"🎒",text:a,salience:at.LEDGER,described:!0});if(this.stateBefore=t,this.lastEvents=i,this.lastNarration)this.chronicle.recordRoom(this.lastNarration,i);else if(i.length)for(const a of i)this.chronicle.recordAside(a.text,a.salience)}_tick(){var S,I;this.turn++,this.roomIndex++;const e=this.path[this.roomIndex],t=e!==void 0?this.dungeon.getRoom(e):null;if(!t){this.finish(!0);return}const i=this.party.living(),s=new Map(this.party.members.map(b=>[b.name,b.wounds])),r=this.party.restStep(),o=i_(r);if(o&&this.addLog(o),!this.party.isAlive()){this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:"dark",predicament:Ma(t,this.dungeon.theme),deliberation:"There is no light left to decide anything by.",resolution:o+" The last of the party does not get up.",falls:nr(this.party,this.party.members.filter(b=>!b.isAlive())),aside:null},this.finish(!1);return}const a=i.filter(b=>!b.isAlive()),l=new Set(a.map(b=>b.name)),c=nr(this.party,a);for(const b of c)this.addLog(b);const d=i,h=this.party.applyLinger();if(h&&!this.party.isAlive()){this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:"linger",predicament:Ma(t,this.dungeon.theme),deliberation:"The lingering venom acts before anything can be decided.",resolution:`🐍 The venom carried from the last fight deals ${h.damage} damage, and the last of the party falls.`,falls:nr(this.party,d.filter(b=>!b.isAlive())),aside:null},this.finish(!1);return}t.visits=(t.visits||0)+1;const f=Ma(t,this.dungeon.theme),p=ud(t,this.party),g=Dy(t,this.party),v=new Set([fe.MONSTER,fe.BOSS,fe.TRAP,fe.DISASTER]);let m=null;if(v.has(t.type)){const b=this.party.pointMan();b&&b.name!==this.pointName&&(m=t_(b,{succeeding:this.pointName}),this.pointName=b.name)}const u=$o(t,this.party,g);if(this.lastResult=u,u.mastery){const b=u.mastery;u.preps=u.preps||[],u.preps.push({source:"the reckoning",text:b.score<0?Aa([`🎓 Done by people who do something near it: ${-b.score} renown less than a clean job.`,`🎓 Near enough to the discipline to try, not near enough to be paid for it: ${-b.score} renown short.`,`🎓 Nobody here is the person you would send. It shows, by ${-b.score} renown.`]):b.depth>=3?Aa([`🎓 Three disciplines on one problem, none of them guessing: +${b.score} renown.`,`🎓 Everything this asks for, the party happens to have brought: +${b.score} renown.`,`🎓 It is answered from three directions at once and stays answered: +${b.score} renown.`]):Aa([`🎓 A second pair of hands that knows what it sees: +${b.score} renown.`,`🎓 Somebody checks the work who is qualified to: +${b.score} renown.`,`🎓 Not done alone, and better for it: +${b.score} renown.`])})}if((S=u.preps)!=null&&S.length){const b=(u.spell?1:0)+((I=u.itemActions)!=null&&I.some(C=>C.opening||C.vsUndead||C.summonAttack)?1:0),A=Qy(u.preps,b);A.folded.length&&(this.pendingLedger.push(...A.folded.map(C=>C.text)),u.preps=A.inline,u.foldedPreps=A.folded.length)}u.formation&&(this.lastFormation=u.formation);const x=d.filter(b=>!b.isAlive()&&!l.has(b.name));(u.success!==!1||t.cleared)&&this.roomsCleared++,this.lastNarration={turn:this.turn,room:t.type,icon:t.icon,roomIndex:e,action:g,offered:p.map(b=>b.id),spellElement:u.spellElement||null,predicament:f,deliberation:Xy(g,p,this.party),resolution:e_(t,g,u,this.party),falls:[...c,...nr(this.party,x)],wounds:this.party.members.filter(b=>b.isAlive()&&b.wounds>(s.get(b.name)??0)).map(b=>o_(b,ir(this.party).woundNotes)),supply:this.party.supply,aside:[m,h?h.cured?"🐍 The cleric cures the lingering venom on the march: no damage taken.":`🐍 The venom carried from the last room acts: ${h.damage} damage taken on the march.`:o].filter(Boolean).join(" ")||null};const E=this.party.isAlive()?this.dungeon.branchAt(e):null;if(E)if(E.secret){if(Oy(this.party)){E.consumed=!0;for(const b of E.rooms)this.dungeon.rooms[b].discovered=!0;this.path.splice(this.roomIndex+1,0,...E.rooms),this.lastNarration.aside=[this.lastNarration.aside,Vy(this.party,E)].filter(Boolean).join(" "),this.addLog("🕳️ A hidden door!")}}else{E.consumed=!0;const b=Fy(this.party,void 0,E.wing);b&&this.path.splice(this.roomIndex+1,0,...E.rooms);const A=fd(this.party,E.wing);this.lastNarration.aside=[this.lastNarration.aside,$y(b,E,b?A.advocate:null)].filter(Boolean).join(" ")}if(this.addLog(`${t.icon} Room ${this.roomIndex}: ${t.type} — ${g}`),u.retreated&&this.roomIndex--,!this.party.isAlive()){this.finish(!1);return}t.type===fe.BOSS&&t.cleared&&(this.party.addScore(Math.round(100*this.scoreMultiplier)),this.finish(!0))}trapdoorFinder(){var t;const e=this.party.living().find(i=>i.class===X.ROGUE);return e?e.name:((t=this.party.living()[0])==null?void 0:t.name)||"Someone"}finish(e){this.gameOver=!0,this.victory=e,this.epitaph=e?h_(this.party,this.roomsCleared,this.dungeon.theme):c_(this.party,this.roomsCleared,this.dungeon.theme),this.addLog(e?"🏆 The dungeon is beaten!":"☠️ The party has fallen."),this.chronicle.endDelve({victory:e,epitaph:this.epitaph,roomsCleared:this.roomsCleared,score:this.party.score,gold:this.party.gold,trophies:this.party.trophies.length,survivors:this.party.living().length,turns:this.turn})}getState(){var t;const e=Math.min(this.roomIndex,this.path.length-1);return{turn:this.turn,roomIndex:this.roomIndex,currentRoomIndex:this.path[e],floor:((t=this.dungeon.rooms[this.path[e]])==null?void 0:t.floor)||0,pathLength:this.path.length,knownIdxs:[...this.path.slice(0,this.roomIndex+2),this.dungeon.spine[this.dungeon.spine.length-1]],dungeon:this.dungeon,depth:this.depth,theme:{id:this.dungeon.theme.id,name:this.dungeon.theme.name,icon:this.dungeon.theme.icon,tagline:this.dungeon.theme.tagline},condition:this.condition&&this.condition.id!=="none"?{id:this.condition.id,name:this.condition.name,icon:this.condition.icon,text:this.condition.text}:null,party:{members:this.party.members.map(i=>({name:i.name,class:i.class,icon:i.icon,health:i.health,maxHealth:i.maxHealth,attack:i.attack,defense:i.defense,mind:i.mind,alive:i.isAlive(),wounds:i.wounds,effectiveMax:i.effectiveMax(),equipment:i.equipment.map(s=>s.name),weaponMods:i.weaponMods.map(s=>s.name)})),reserve:this.party.reserve.map(i=>({name:i.name,class:i.class,icon:i.icon})),supply:this.party.supply,gold:this.party.gold,score:this.party.score,poisonLinger:this.party.poisonLinger||0,alarmed:!!this.party.alarmed,potions:this.party.potions.length,trophies:this.party.trophies.map(i=>({name:i.name,icon:i.icon})),grimoire:this.party.grimoire.map(i=>i.name),spellsLearned:this.party.spellsLearned,personalities:this.party.personalities,formation:this.lastFormation||"line",tactics:[],dormantTactics:[]},gameOver:this.gameOver,victory:this.victory,epitaph:this.epitaph,narration:this.lastNarration,log:this.log.slice(-12)}}getChronicle(){return this.chronicle}getRunResult(){return{score:this.party.score,gold:this.party.gold,roomsCleared:this.roomsCleared,turns:this.turn,victory:this.victory,survivors:this.party.living().length,partySize:this.party.members.length,spellsLearned:this.party.spellsLearned,trophies:this.party.trophies.length,epitaph:this.epitaph}}setPaused(e){this.paused=e}}const qc={EASY:{id:"easy",name:"Easy",icon:"🌱",scoreMultiplier:1},MEDIUM:{id:"medium",name:"Medium",icon:"🌳",scoreMultiplier:1.5},HARD:{id:"hard",name:"Hard",icon:"⛰️",scoreMultiplier:2},NIGHTMARE:{id:"nightmare",name:"Nightmare",icon:"💀",scoreMultiplier:3}},Xc="dungeonab_progression";class m_{constructor(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.loadFromStorage()}recordRun(e,t){this.runHistory.unshift({id:`run_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,timestamp:Date.now(),difficulty:e,score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:t.victory,survivors:t.survivors,partySize:t.partySize,depth:t.depth||1,condition:t.condition||null}),this.runHistory.length>50&&(this.runHistory=this.runHistory.slice(0,50)),(!this.bestScores[e]||t.score>this.bestScores[e])&&(this.bestScores[e]=t.score),t.victory&&(this.victories[e]=(this.victories[e]||0)+1),this.totalRuns++,this.saveToStorage()}getStats(){const e=Object.values(this.victories).reduce((t,i)=>t+i,0);return{totalRuns:this.totalRuns,totalVictories:e,bestScores:{...this.bestScores},avgScore:this.totalRuns>0?Math.round(this.runHistory.reduce((t,i)=>t+i.score,0)/Math.min(this.totalRuns,this.runHistory.length)):0}}getRecentRuns(e=5){return this.runHistory.slice(0,e)}saveToStorage(){typeof localStorage>"u"||localStorage.setItem(Xc,JSON.stringify({runHistory:this.runHistory,bestScores:this.bestScores,totalRuns:this.totalRuns,victories:this.victories}))}loadFromStorage(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Xc);if(!e)return;const t=JSON.parse(e);this.runHistory=t.runHistory||[],this.bestScores=t.bestScores||{},this.totalRuns=t.totalRuns||0,this.victories=t.victories||{}}catch(e){console.error("Failed to load progression:",e)}}reset(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.saveToStorage()}}const ti=new m_;function g_(n,{seed:e,difficulty:t}){const i=new md(n.map(r=>({...r})),e,t);let s=0;for(;!i.gameOver&&s++<500;)i.tick();return{score:i.party.score,depthReached:1}}function v_(n,e,t={}){const{seed:i="table",difficulty:s="medium"}=t,r=[];for(const o of n.seats.filter(a=>a.isAI)){const a=g_(o.pool,{seed:`${i}-rival-${o.id}`,difficulty:s});r.push({name:o.name,icon:o.icon,isPlayer:!1,...a})}return r.push({name:"You",icon:"🗡️",isPlayer:!0,score:e.score,depthReached:1}),r.sort((o,a)=>a.score-o.score||a.depthReached-o.depthReached),r.forEach((o,a)=>{o.place=a+1}),r}const Yc="dungeonab_dungeon_archive",y_=30;class __{constructor(e=null){this.storage=e||(typeof localStorage<"u"?localStorage:null),this.entries=[],this.load()}load(){if(this.storage)try{this.entries=JSON.parse(this.storage.getItem(Yc)||"[]")}catch{this.entries=[]}}persist(){if(this.storage)try{this.storage.setItem(Yc,JSON.stringify(this.entries))}catch{}}save(e){var i;const t={id:`dgn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,date:Date.now(),custom:!1,...e};if(this.entries.unshift(t),this.entries.length>y_){const s=(i=this.entries.map((r,o)=>[r,o]).reverse().find(([r])=>!r.custom))==null?void 0:i[1];this.entries.splice(s!==void 0?s:this.entries.length-1,1)}return this.persist(),t}update(e,t){const i=this.entries.find(s=>s.id===e);return i?(Object.assign(i,t),this.persist(),i):null}get(e){return this.entries.find(t=>t.id===e)||null}remove(e){const t=this.entries.length;return this.entries=this.entries.filter(i=>i.id!==e),this.persist(),this.entries.length<t}list(){return this.entries}}const hr=new __,x_={entrance:"#8fb8dd",corridor:"#555",monster:"#c84c3c",trap:"#e8724a",treasure:"#d8a53f",library:"#b07ae8",shrine:"#e8d48a",lab:"#3cb8a8",materials:"#4a8a5c",disaster:"#e05555",boss:"#ff4444",vault:"#ffd75e",stairs:"#7a7f8a"},b_=["monster","gold","mimicChance","trapDamage","materials"];function w_(n,e,t){const i=n.rooms.find(r=>r.index===e),s=[fe.ENTRANCE,fe.BOSS,fe.STAIRS];if(!i||s.includes(i.type)||s.includes(t))return!1;for(const r of b_)delete i[r];return i.type=t,Object.assign(i,ty(t,si[n.themeId]||si.delve)),!0}function S_(n,e,t){const i=n.branches[e];if(!i)return!1;i.secret=t;for(const r of i.rooms){const o=n.rooms.find(a=>a.index===r);o&&(o.secret=t)}const s=n.edges.find(r=>r.b===i.rooms[0]);return s&&(s.secret=t),!0}function jc(n,e){const t=n.getContext("2d"),i=n.width,s=n.height;t.clearRect(0,0,i,s),t.fillStyle="#0d0b08",t.fillRect(0,0,i,s);const r=T=>T.w||4,o=T=>T.h||4,a=T=>T.floor||0,l=[...new Set(e.rooms.map(a))].sort((T,N)=>T-N),c=T=>{const N=e.rooms.filter(L=>a(L)===T);return{x0:Math.min(...N.map(L=>L.x-r(L)/2)),y0:Math.min(...N.map(L=>L.y-o(L)/2)),w:Math.max(...N.map(L=>L.x+r(L)/2))-Math.min(...N.map(L=>L.x-r(L)/2)),h:Math.max(...N.map(L=>L.y+o(L)/2))-Math.min(...N.map(L=>L.y-o(L)/2))}},d=new Map(l.map(T=>[T,c(T)])),h=Math.max(...l.map(T=>d.get(T).w)),f=Math.max(...l.map(T=>d.get(T).h)),p=h+4,g=T=>l.indexOf(a(T)),v=T=>T.x-d.get(a(T)).x0+g(T)*p,m=T=>T.y-d.get(a(T)).y0,u=0,x=l.length*p-4,E=0,S=f,I=10,b=l.length>1?14:I,A=Math.min((i-I*2)/Math.max(1,x-u),(s-b-I)/Math.max(1,S-E)),C=T=>I+(v(T)-u)*A,w=T=>b+(m(T)-E)*A,y=new Map(e.rooms.map(T=>[T.index,T]));for(const T of e.edges){const N=y.get(T.a),L=y.get(T.b);if(!N||!L)continue;const B=T.kind==="trapdoor",W=T.kind==="stair";t.beginPath(),t.setLineDash(B?[1,3]:W?[2,2]:T.secret?[3,3]:[]),t.strokeStyle=B?"#c85a3c":W?"#7a7f8a":T.secret?"#d8a53f":"#4a443a",t.lineWidth=B?1:1.5,t.moveTo(C(N),w(N)),t.lineTo(C(L),w(L)),t.stroke()}t.setLineDash([]);for(const T of e.rooms){const N=Math.max(3,r(T)*A),L=Math.max(3,o(T)*A);t.fillStyle=x_[T.type]||"#777",T.shape==="rotunda"?(t.beginPath(),t.arc(C(T),w(T),Math.min(N,L)/2,0,Math.PI*2),t.fill()):t.fillRect(C(T)-N/2,w(T)-L/2,N,L),T.secret&&(t.strokeStyle="#ffd75e",t.lineWidth=1,t.strokeRect(C(T)-N/2-1.5,w(T)-L/2-1.5,N+3,L+3))}l.length>1&&(t.fillStyle="#8a7a58",t.font="9px system-ui, sans-serif",t.textAlign="left",t.textBaseline="top",l.forEach((T,N)=>{t.fillText(`Floor ${T+1}`,I+N*p*A,2)}));for(const T of e.trapdoors||[]){const N=y.get(T.from);if(!N)continue;t.fillStyle=T.secret?"#6a3a2a":"#111",t.strokeStyle="#c85a3c",t.lineWidth=1;const L=Math.max(3,A*1.4);t.fillRect(C(N)-L/2,w(N)-L/2,L,L),t.strokeRect(C(N)-L/2,w(N)-L/2,L,L)}}function M_({onDelve:n}){const e=document.getElementById("archive-overlay"),t=document.getElementById("archive-body"),i=document.getElementById("archive-btn"),s=document.getElementById("archive-close-btn"),r=l=>{const c=document.createElement("div");return c.textContent=l,c.innerHTML},o=()=>{const l=hr.list();t.innerHTML=l.length?"":'<div class="records-empty">No dungeons archived yet. Finish a delve and its design is kept here.</div>';for(const c of l){const d=document.createElement("div");d.className="arch-item";const h=c.outcome||{};d.innerHTML=`
        <canvas width="150" height="96"></canvas>
        <div style="flex:1;min-width:0;">
          <div style="color:#d8a53f;font-weight:bold;">${c.custom?"✏️ ":""}${r(c.name||"Unnamed delve")}</div>
          <div style="color:#887755;font-size:0.72rem;">
            ${h.victory===!0?"🏆":h.victory===!1?"☠️":"📐"}
            ${c.layout.rooms.length} rooms · ${c.layout.branches.filter(f=>f.secret).length} secret ·
            ${new Date(c.date).toLocaleDateString()}
          </div>
          <div style="display:flex;gap:0.35rem;margin-top:0.4rem;flex-wrap:wrap;">
            <button data-act="delve" style="font-size:0.72rem;padding:0.3rem 0.6rem;">⚔️ Delve</button>
            <button data-act="edit" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a2213;color:#d8a53f;">✏️ Edit</button>
            <button data-act="del" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a1515;color:#e08080;">🗑️</button>
          </div>
        </div>
      `,jc(d.querySelector("canvas"),c.layout),d.querySelector('[data-act="delve"]').addEventListener("click",()=>{e.classList.remove("active"),n(c)}),d.querySelector('[data-act="edit"]').addEventListener("click",()=>a(c)),d.querySelector('[data-act="del"]').addEventListener("click",()=>{hr.remove(c.id),o()}),t.appendChild(d)}},a=l=>{var v;const c=JSON.parse(JSON.stringify(l.layout)),d=Object.values(fe).filter(m=>m!=="entrance"&&m!=="boss");t.innerHTML=`
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
    `;const h=document.getElementById("arch-edit-map"),f=()=>jc(h,c),p=document.getElementById("arch-rooms");for(const m of c.rooms){const u=document.createElement("div");u.style.cssText="display:flex;gap:0.5rem;align-items:center;padding:0.15rem 0;border-bottom:1px dashed #2a2318;";const x=m.type==="entrance"||m.type==="boss";u.innerHTML=`
        <span style="width:1.6rem;color:#665;">#${m.index}</span>
        <span style="width:0.9rem;">${m.secret?"🕳️":""}</span>
        ${x?`<span style="color:#887755;">${m.type} (fixed)</span>`:`<select data-idx="${m.index}" style="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:3px;font-family:inherit;font-size:0.75rem;">
              ${d.map(E=>`<option value="${E}"${E===m.type?" selected":""}>${E}</option>`).join("")}
            </select>`}
      `,(v=u.querySelector("select"))==null||v.addEventListener("change",E=>{w_(c,m.index,E.target.value),f()}),p.appendChild(u)}const g=document.getElementById("arch-branches");c.branches.forEach((m,u)=>{const x=document.createElement("label");x.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;";const E=m.name||"A side passage";x.innerHTML=`<input type="checkbox" ${m.secret?"checked":""} />
        ${E[0].toUpperCase()}${E.slice(1)} off room #${m.junction}
        (${m.rooms.length} room${m.rooms.length>1?"s":""}) is secret`,x.querySelector("input").addEventListener("change",S=>{S_(c,u,S.target.checked),f()}),g.appendChild(x)}),document.getElementById("arch-back").addEventListener("click",o),document.getElementById("arch-save").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";hr.save({name:m,layout:c,custom:!0,seed:l.seed,outcome:{}}),o()}),document.getElementById("arch-delve-now").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";e.classList.remove("active"),n({name:m,layout:c})}),f()};i.addEventListener("click",()=>{o(),e.classList.add("active")}),s.addEventListener("click",()=>e.classList.remove("active")),e.addEventListener("click",l=>{l.target===e&&e.classList.remove("active")})}const Li="dungeonab_custom_cards",Mo="dungeonab_imported_packs",dr="dungeonab_pack_prefs",Dt={get(n,e){try{return JSON.parse(localStorage.getItem(n))??e}catch{return e}},set(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch{}}};function Eo(n){return{id:"my-cards",name:"My Cards",description:"Cards from the workshop.",cards:n}}function E_(){const n=Dt.get(dr,{}),e=Dt.get(Li,[]);e.length&&ys(Eo(e),{enabled:n["my-cards"]!==!1});for(const t of Dt.get(Mo,[]))try{ys(t,{enabled:n[t.id]!==!1})}catch{}return n}function T_(){const n=document.getElementById("cards-overlay"),e=document.getElementById("cards-body");document.getElementById("cards-btn").addEventListener("click",()=>{r(),n.classList.add("active")}),document.getElementById("cards-close-btn").addEventListener("click",()=>n.classList.remove("active")),n.addEventListener("click",o=>{o.target===n&&n.classList.remove("active")});const t="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.35rem;border-radius:4px;font-family:inherit;font-size:0.8rem;",i=o=>{const a=document.createElement("div");return a.textContent=o,a.innerHTML};function s(o){Dt.set(Li,o),o.length&&ys(Eo(o))}function r(){const o=Dt.get(Li,[]);Dt.get(dr,{}),e.innerHTML=`
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
            <select id="ce-class" style="${t}">${Object.values(X).map(g=>`<option>${g}</option>`).join("")}</select>
            <input id="ce-hp" type="number" value="14" title="health" style="${t}" />
            <input id="ce-atk" type="number" value="4" title="attack" style="${t}" />
            <input id="ce-def" type="number" value="3" title="defense" style="${t}" />
            <input id="ce-mind" type="number" value="3" title="mind" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">class · health · attack · defense · mind — budget: health + 2×atk + 2×def + mind ≤ ${vn.character.statTotal}</div>`:p==="equipment"?a.innerHTML=`
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.3rem;font-size:0.75rem;">
            <input id="ce-eatk" type="number" value="0" title="+attack" style="${t}" />
            <input id="ce-edef" type="number" value="0" title="+defense" style="${t}" />
            <input id="ce-emind" type="number" value="2" title="+mind" style="${t}" />
            <select id="ce-best" style="${t}"><option value="">any class</option>${Object.values(X).map(g=>`<option>${g}</option>`).join("")}</select>
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">+attack · +defense · +mind · best-fit — net bonus ≤ ${vn.equipment.bonusTotal}</div>`:p==="spell"?a.innerHTML=`
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem;font-size:0.75rem;">
            <select id="ce-use" style="${t}"><option>combat</option><option>heal</option><option>utility</option></select>
            <input id="ce-power" type="number" value="4" title="power" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">use · power (1–${vn.spell.maxPower})</div>`:a.innerHTML=`
          <select id="ce-arch" style="${t};width:100%;">${Sr.map(g=>`<option value="${g.archetype}">${g.archetype} (like ${g.name})</option>`).join("")}</select>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">your name and flavor, a proven archetype's behavior</div>`};l.addEventListener("change",c),c(),document.getElementById("ce-create").addEventListener("click",()=>{const p=l.value,g={id:`my-${Date.now().toString(36)}`,type:p,name:document.getElementById("ce-name").value.trim(),icon:document.getElementById("ce-icon").value.trim()||"🎴",text:document.getElementById("ce-text").value.trim()||void 0};if(p==="character")g.class=document.getElementById("ce-class").value,g.stats={health:+document.getElementById("ce-hp").value,attack:+document.getElementById("ce-atk").value,defense:+document.getElementById("ce-def").value,mind:+document.getElementById("ce-mind").value},g.trait=g.text;else if(p==="equipment"){g.bonus={};const u=+document.getElementById("ce-eatk").value,x=+document.getElementById("ce-edef").value,E=+document.getElementById("ce-emind").value;u&&(g.bonus.attack=u),x&&(g.bonus.defense=x),E&&(g.bonus.mind=E),g.slot="tool",g.bestFor=document.getElementById("ce-best").value||null}else p==="spell"?(g.use=document.getElementById("ce-use").value,g.power=+document.getElementById("ce-power").value,g.school="homebrew"):g.archetype=document.getElementById("ce-arch").value;const v=rh(g);if(v.length){document.getElementById("ce-problems").textContent=v.join(" · ");return}const m=Dt.get(Li,[]);m.push(g),s(m),r()});const d=document.getElementById("ce-list");d.innerHTML=o.length?"":'<div class="records-empty">The forge is cold. Make something.</div>',o.forEach((p,g)=>{const v=document.createElement("div");v.style.cssText="display:flex;gap:0.4rem;align-items:baseline;padding:0.15rem 0;border-bottom:1px dashed #2a2318;",v.innerHTML=`<span>${i(p.icon)} ${i(p.name)}</span>
        <span style="color:#665;">${p.type}${p.class?" · "+p.class:""}</span>
        <button data-i="${g}" style="margin-left:auto;font-size:0.68rem;padding:0.15rem 0.4rem;background:#2a1515;color:#e08080;">✕</button>`,v.querySelector("button").addEventListener("click",()=>{const m=Dt.get(Li,[]);m.splice(g,1),s(m),r()}),d.appendChild(v)});const h=document.getElementById("ce-packs");for(const p of Pd()){const g=document.createElement("label");g.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;padding:0.12rem 0;",g.innerHTML=`<input type="checkbox" ${p.enabled?"checked":""} />
        <span>${i(p.name)} <span style="color:#665;">(${p.cards} cards)</span></span>`,g.querySelector("input").addEventListener("change",v=>{Ld(p.id,v.target.checked);const m=Dt.get(dr,{});m[p.id]=v.target.checked,Dt.set(dr,m)}),h.appendChild(g)}const f=document.getElementById("ce-io");document.getElementById("ce-export").addEventListener("click",()=>{f.value=JSON.stringify(Eo(Dt.get(Li,[])),null,1)}),document.getElementById("ce-import").addEventListener("click",()=>{try{const p=JSON.parse(f.value),g=ah(p);if(g.length)throw new Error(g.join("; "));ys(p);const v=Dt.get(Mo,[]).filter(m=>m.id!==p.id);v.push(p),Dt.set(Mo,v),f.value=`✓ "${p.name}" imported (${p.cards.length} cards)`,r()}catch(p){f.value=`✗ ${p.message}`}})}}const A_={id:"alchemy-17c",name:"17th-Century Alchemy Pack",description:"Emblem monsters and laboratory gear from the age of Maier and Sendivogius.",cards:[{id:"a17-sendivogius",type:"character",class:"alchemist",name:"Michael Sendivogius",icon:"🜍",stats:{health:12,attack:3,defense:2,mind:6},trait:"Distilled the aerial nitre before anyone had a name for air."},{id:"a17-soror",type:"character",class:"cleric",name:"The Soror Mystica",icon:"🜋",stats:{health:13,attack:2,defense:3,mind:5},trait:"The Work needs two. She keeps the vigil, and the vigil keeps the party."},{id:"a17-maier",type:"character",class:"wizard",name:"Count Michael Maier",icon:"🜚",stats:{health:10,attack:2,defense:2,mind:7},trait:"Reads emblems the way others read maps. The dungeon is fifty fugues deep."},{id:"a17-athanor",type:"equipment",name:"Court Athanor",icon:"🜂",slot:"tool",bonus:{mind:2},bestFor:"alchemist",text:"The slow furnace. Patience, made of brick."},{id:"a17-pelican",type:"equipment",name:"Pelican Vessel",icon:"🜄",slot:"tool",bonus:{mind:1,defense:1},bestFor:"alchemist",text:"Circulation without loss: what wounds the flask feeds the work."},{id:"a17-vitriol",type:"equipment",name:"Flask of Vitriol",icon:"🜖",slot:"weapon",bonus:{attack:3},bestFor:"alchemist",text:"Visita Interiora Terrae — or throw it, and something else will."},{id:"a17-solve",type:"spell",name:"Solve et Coagula",icon:"☿",school:"transmutation",power:5,use:"combat",text:"Dissolve the fixed; fix the volatile. Monsters count as the fixed."},{id:"a17-aurum",type:"spell",name:"Aurum Potabile",icon:"🜚",school:"restoration",power:6,use:"heal",text:"Drinkable gold. The court physician swears by it; the court treasurer weeps."},{id:"a17-projection",type:"spell",name:"Powder of Projection",icon:"✨",school:"transmutation",power:3,use:"utility",text:"A pinch turns the lock's iron to something more agreeable."},{id:"a17-hermetic",type:"personality",name:"The Hermetic",icon:"🜁",archetype:"scholarly",text:"As above, so below; as in the library, so in the crypt. Reads everything twice."}]},R_={id:"athanor",name:"the Hermetic Athanor",icon:"🜂",tagline:"Fifty emblems deep, the Work continues whether or not anyone tends it.",weightTweaks:{lab:2,library:1,materials:1,shrine:-.3},alwaysLab:!0,monsters:[{kind:"green-lion",name:"the Green Lion, hungry for the sun",icon:"🦁",attack:7,health:15,undead:!1},{kind:"ouroboros",name:"an ouroboros too busy to notice you",icon:"🐍",attack:5,health:18,undead:!1,slow:!0},{kind:"caput-corvi",name:"the Raven's Head, black as the nigredo",icon:"🐦‍⬛",attack:6,health:11,undead:!0},{kind:"winged-wingless",name:"two birds, one winged, one not, quarrelling",icon:"🕊️",attack:5,health:10,undead:!1}],bosses:[{kind:"rebis",name:"the Rebis, crowned twice and patient",icon:"👑",attack:12,health:36,undead:!1},{kind:"philosophers-dragon",name:"the Dragon that devours its own tail and yours",icon:"🐉",attack:13,health:34,undead:!1}]},C_={"green-lion":{img:new URL(""+new URL("green-lion-Cdoc9LHy.png",import.meta.url).href,import.meta.url).href},ouroboros:{img:new URL(""+new URL("ouroboros-BkC9aheh.png",import.meta.url).href,import.meta.url).href},"caput-corvi":{img:new URL(""+new URL("caput-corvi-yFqGgKDb.png",import.meta.url).href,import.meta.url).href},"winged-wingless":{img:new URL(""+new URL("winged-wingless-BJ4nBaZO.png",import.meta.url).href,import.meta.url).href},rebis:{img:new URL(""+new URL("rebis-BbSsEiz4.png",import.meta.url).href,import.meta.url).href},"philosophers-dragon":{img:new URL(""+new URL("philosophers-dragon-CN8PF5Zm.png",import.meta.url).href,import.meta.url).href}};let Jc=!1;function L_({enabled:n=!0}={}){Jc||(Jc=!0,ys(A_,{enabled:n}),ny(R_),S0(C_),$0({"green-lion":{trait:"venomous"},ouroboros:{trait:"armored"},"caput-corvi":{trait:"swarm"},"winged-wingless":{trait:"swarm"},rebis:{trait:"armored"},"philosophers-dragon":{resist:["fire"],weak:["frost"]}}),cy({"green-lion":{effect:"coating",name:"green vitriol",icon:"🦁",mod:{name:"green vitriol",attack:2,venom:!0},text:"Its bite distills to green vitriol. What dissolves the sun does not hesitate at flesh."},ouroboros:{effect:"potion",name:"the shed of the ouroboros",icon:"🐍",potion:{kind:"ouroboros-shed",heal:8},text:"It sheds as it dies, as it always does. The shed skin, steeped, turns endings back into beginnings."},"caput-corvi":{effect:"materials",name:"nigredo feathers",icon:"🐦‍⬛",count:2,text:"Feathers black past black: the nigredo itself. Every great work begins with exactly this."},"winged-wingless":{effect:"trinket",name:"the settled feather",icon:"🕊️",bonus:{mind:1},text:"One feather, from whichever bird was right. Held, it makes both sides of any argument audible."},rebis:{effect:"trinket",name:"the double crown",icon:"👑",bonus:{attack:1,mind:1},text:"Both crowns, fused where the two heads met. Wearing it, the head does two kinds of thinking at once."},"philosophers-dragon":{effect:"coating",name:"the dragon's mercury",icon:"🐉",mod:{name:"burning mercury",attack:3,element:"fire"},text:"What it kept swallowing, tail after tail: quicksilver that burns. On a blade it is an unfair argument."}}))}const Kc={[fe.ENTRANCE]:"The way in. The party gathers its nerve.",[fe.CORRIDOR]:"Just passage — a breath between dangers.",[fe.MONSTER]:"A monster. The party may fight, flee, sneak past (rogue), turn undead (cleric), bribe, or open with a spell — and a spell opening keeps working through the fight. Every slain monster drops a trophy worth carrying.",[fe.TRAP]:"A trap. Rogues disarm it; the bold shove through and take the hit.",[fe.TREASURE]:"Treasure — and maybe a mimic. Loot it, inspect first, or leave the bait.",[fe.LIBRARY]:"A library. The party can learn a spell; wizards risk the sealed texts for more.",[fe.SHRINE]:"A shrine. Rest to heal — or pry off the gold leaf and let the dungeon remember it.",[fe.LAB]:"An alchemist's bench. With materials, brew a potion or coat a weapon.",[fe.MATERIALS]:"Herbs and salts — raw materials for alchemy, if you gather them.",[fe.DISASTER]:"The dungeon itself turns hostile. Brace together, or scatter and pray.",[fe.BOSS]:"The boss chamber. Everything you drafted, tested at once — and the party looses every prepared working it has kept for this.",[fe.STAIRS]:"A stair down. The floor below is meaner than this one, and there is no way back up.",[fe.VAULT]:"A vault — riches hidden behind a secret door. Rogues and scholars find these.",[fe.SITUATION]:"A situation, not a fight: a seized orrery, a sealed door, something large that would rather talk. What the party can attempt here depends entirely on the capabilities it drafted — Tinkering, Astrology, Divination, Rhetoric and the rest each open their own answer, and a party carrying none of them has only the blunt one."},P_=[{type:"character",label:"Character",text:"A named hero of one of five classes. Four march — the rest wait in town as reserves, ready to replace the dead."},{type:"equipment",label:"Equipment",text:"Auto-assigns to the best-fit member. Some items do different things per class."},{type:"spell",label:"Spell",text:"A prepared working in the shared grimoire: reusable, but spent for the room once cast. Power scales with the party's sharpest mind, and a loosed working keeps working for the rest of the fight — combat workings go on biting, healing ones go on mending, and a heal fires the moment someone is failing rather than after the dust settles. A wizard amplifies it and opens ordinary fights with two — and at the boss the party looses every working it has. Scrolls found in the dungeon still burn."},{type:"personality",label:"Personality",text:"Biases the whole party's decisions. Some look weak but hide an upside."}],I_=[{key:"Oil 🏮",text:"The lamp burns a unit every march. Run dry and the whole party takes damage every room it walks in the dark. An Everburning Lantern makes it last twice as long; Dancing Light and Eyes of the Mouse answer the dark outright."},{key:"Wounds ✚",text:"A blow worth a quarter of a body leaves a scar, and healing can no longer reach past it — the hatched part of the health bar. Wounds only mend in town, so the delve accumulates."}];function k_(n,e){var a,l,c;const t=[];if(!e)return t;const i=n==null?void 0:n.party,s=e.party;if(i&&s)for(const d of s.members){const h=i.members.find(f=>f.name===d.name);h&&h.alive&&!d.alive&&t.push({icon:"☠️",kind:"death",text:`${d.name} has fallen.`})}const r=(a=n==null?void 0:n.narration)==null?void 0:a.room;if(((l=e.narration)==null?void 0:l.room)===fe.BOSS&&r!==fe.BOSS&&t.push({icon:"🐉",kind:"boss",text:"The boss chamber — everything you drafted, tested at once."}),i&&s&&s.spellsLearned>i.spellsLearned){const d=s.spellsLearned-i.spellsLearned;t.push({icon:"📖",kind:"spell",text:`The grimoire grows: ${d} new working${d>1?"s":""} learned.`})}if(i!=null&&i.trophies&&((c=s==null?void 0:s.trophies)==null?void 0:c.length)>i.trophies.length){const d=s.trophies[s.trophies.length-1];t.push({icon:d.icon,kind:"trophy",text:`Claimed from the kill: ${d.name}.`})}if(i&&s){const d=s.gold-i.gold;d>=25&&t.push({icon:"💰",kind:"gold",text:`A windfall: +${d} gold.`})}return t}const Zc="dungeonab_chronicles",hs=20;function Qc(){return`saga_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}class D_{constructor(e=null){this.storage=e||(typeof localStorage<"u"?localStorage:null),this.entries=[],this.load()}load(){if(this.storage)try{const e=JSON.parse(this.storage.getItem(Zc)||"[]");this.entries=Array.isArray(e)?e:[]}catch{this.entries=[]}}persist(){if(this.storage)try{this.storage.setItem(Zc,JSON.stringify(this.entries.slice(0,hs)))}catch{}}save({id:e,chronicle:t,party:i,difficulty:s=null}){var a;const r={id:e||Qc(),version:xr,date:Date.now(),partyName:t.partyName,delves:t.delves.length,lastOutcome:((a=t.delves[t.delves.length-1])==null?void 0:a.outcome)||null,difficulty:s,chronicle:t.toJSON(),party:i?i.toJSON():null},o=this.entries.findIndex(l=>l.id===r.id);return o>=0?this.entries[o]=r:this.entries.unshift(r),this.entries.length>hs&&(this.entries.length=hs),this.persist(),r}list(){return this.entries.map(e=>{var t,i,s;return{id:e.id,partyName:e.partyName,delves:e.delves,date:e.date,difficulty:e.difficulty,victory:((t=e.lastOutcome)==null?void 0:t.victory)??null,score:((i=e.lastOutcome)==null?void 0:i.score)??0,alive:(((s=e.party)==null?void 0:s.members)||[]).some(r=>r.alive!==!1)}})}get(e){return this.entries.find(t=>t.id===e)||null}remove(e){const t=this.entries.findIndex(i=>i.id===e);return t>=0?(this.entries.splice(t,1),this.persist(),!0):!1}resume(e,t=Sd){const i=this.get(e);if(!i)return null;const s=$i.fromJSON(i.chronicle),r=i.party?Oi.fromJSON(i.party,t):null,o=r?r.living().length:0,a=r?r.reserve.filter(d=>d.isAlive()).length:0;let l=!0,c=null;return r?o===0&&a===0?(l=!1,c=`${s.partyName} did not come back. The chronicle can be read, but nobody is left to continue it.`):o===0&&(c=`Nobody who marched came back, but ${a} wait${a>1?"":"s"} in town. They can take up the delve.`):(l=!1,c="This saga was saved as a story only — there is no party left to send down."),{id:i.id,chronicle:s,party:r,difficulty:i.difficulty,continuable:l,reason:c,standing:o,bench:a}}exportJSON(e){const t=this.get(e);return t?JSON.stringify(t,null,2):null}exportMarkdown(e,t){const i=this.get(e);return i?sd($i.fromJSON(i.chronicle),t):null}importJSON(e){let t;try{t=typeof e=="string"?JSON.parse(e):e}catch{return{ok:!1,error:"That file is not readable as a saga."}}if(!t||!t.chronicle||!Array.isArray(t.chronicle.delves))return{ok:!1,error:"That file does not hold a chronicle."};if((t.version??0)>xr)return{ok:!1,error:"That saga was written by a newer version of the game."};const i={...t,id:Qc(),date:Date.now()};return this.entries.unshift(i),this.entries.length>hs&&(this.entries.length=hs),this.persist(),{ok:!0,record:i}}}function eh(n,e="md"){return`chronicle-${(n.partyName||"party").split(",")[0].trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"party"}-delve-${n.delves.length||1}.${e}`}const N_=Object.fromEntries(Object.entries(Wi).map(([n,e])=>[n,e.icon])),U_=Object.fromEntries(Object.entries(Wi).map(([n,e])=>[n,e.name]));window.v6debug={trace:Ey,summary:Ay,clear:Ty};const en=new D_;function wr(n,e,t="text/markdown"){const i=new Blob([e],{type:`${t};charset=utf-8`}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=n,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3)}function gd(){const n=me.simulator;if(!(n!=null&&n.getChronicle))return null;try{const e=en.save({id:me.sagaId||null,chronicle:n.getChronicle(),party:n.party,difficulty:me.difficulty});return me.sagaId=e.id,e}catch{return null}}const th="dungeonab_help_seen",me={draft:null,draftUI:null,simulator:null,renderer:null,gameRunning:!1,lastTickTime:0,speedMultiplier:1,prevState:null,seenRoomTypes:null};function O_(){console.log("⚔️ DungeonAB initializing…");const n=E_();L_({enabled:n["alchemy-17c"]!==!1}),F_(),B_(),T_(),M_({onDelve:e=>{me.pendingReplay=e,ri("🗺️",`Design loaded: "${e.name}". Draft a party, then delve it.`,"room"),To()}}),To(),document.getElementById("pause-btn").addEventListener("click",q_),document.getElementById("step-btn").addEventListener("click",W_),document.getElementById("speed-slider").addEventListener("input",e=>{me.speedMultiplier=parseFloat(e.target.value),document.getElementById("speed-label").textContent=`${me.speedMultiplier.toFixed(1)}x`}),document.getElementById("show-results-btn").addEventListener("click",()=>{document.getElementById("show-results-btn").classList.remove("active"),document.getElementById("gameover-display").classList.add("active")})}function F_(){const n=document.getElementById("help-overlay"),e=document.getElementById("help-btn"),t=document.getElementById("help-close-btn");document.getElementById("help-card-legend").innerHTML=P_.map(o=>`<dt>${o.label}</dt><dd>${o.text}</dd>`).join(""),document.getElementById("help-attrition-legend").innerHTML=I_.map(o=>`<dt>${o.key}</dt><dd>${o.text}</dd>`).join("");const i=()=>n.classList.add("active"),s=()=>{n.classList.remove("active");try{localStorage.setItem(th,"1")}catch{}};e.addEventListener("click",i),t.addEventListener("click",s),n.addEventListener("click",o=>{o.target===n&&s()});let r=!1;try{r=localStorage.getItem(th)==="1"}catch{}r||i()}function B_(){const n=document.getElementById("records-overlay"),e=document.getElementById("records-btn"),t=document.getElementById("records-close-btn"),i=()=>{const a=document.getElementById("records-body"),l=ti.getStats(),c=ti.getRecentRuns(10),d=Object.values(qc).filter(u=>ti.bestScores[u.id]).map(u=>`<dt>${u.icon} ${u.name}</dt><dd>${ti.bestScores[u.id]}</dd>`).join(""),h=`<div style="color:#887755;font-size:0.8rem;margin-bottom:0.9rem;">
      ${l.totalVictories} retirements across ${l.totalRuns} campaigns · average score ${l.avgScore}</div>`,f=c.length?c.map(u=>{const x=qc[(u.difficulty||"").toUpperCase()]||{icon:"•"};return`<div class="records-run">
            <span>${u.victory?"🏆":"☠️"} ${x.icon} depth ${u.depth||1} · ${u.roomsCleared} rooms</span>
            <span class="rr-score">${u.score}</span>
          </div>`}).join(""):'<div class="records-empty">No campaigns yet. The Hall awaits its first name.</div>',p=en.list(),g=p.length?p.map(u=>{const x=new Date(u.date).toLocaleDateString(),E=u.alive?'<span style="color:#3ddc84;">still standing</span>':'<span style="color:#8a6a5a;">did not come back</span>';return`<div class="saga-row" data-saga="${u.id}">
            <div style="flex:1;min-width:0;">
              <div style="color:#c0b090;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${dt(u.partyName.split(",")[0])}${u.partyName.includes(",")?" &amp; co.":""}</div>
              <div style="color:#665;font-size:0.68rem;">${u.delves} delve${u.delves>1?"s":""} · ${E} · ${x}</div>
            </div>
            <button data-read="${u.id}" title="Read the saga">📖</button>
            <button data-save="${u.id}" title="Download the save file">💾</button>
            <button data-drop="${u.id}" title="Forget this saga">🗑️</button>
          </div>`}).join(""):'<div class="records-empty">No sagas kept yet. Finish a delve and the story is written down.</div>';a.innerHTML=(d?`<dl class="records-best">${d}</dl>`:"")+h+'<div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">📜 Sagas kept</div>'+g+`<div style="display:flex;gap:0.4rem;margin:0.5rem 0 1rem;">
         <button id="saga-import-btn" style="flex:1;font-size:0.75rem;padding:0.4rem;">📂 Load a save file</button>
       </div>
       <input id="saga-import-input" type="file" accept="application/json,.json" style="display:none;"><div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">Recent campaigns</div>`+f,a.querySelectorAll("[data-read]").forEach(u=>{u.addEventListener("click",()=>s(u.dataset.read))}),a.querySelectorAll("[data-save]").forEach(u=>{u.addEventListener("click",()=>{const x=en.get(u.dataset.save);wr(`chronicle-${x.partyName.split(",")[0].toLowerCase().replace(/[^a-z0-9]+/g,"-")}.json`,en.exportJSON(u.dataset.save),"application/json")})}),a.querySelectorAll("[data-drop]").forEach(u=>{u.addEventListener("click",()=>{const x=en.get(u.dataset.drop),E=(x==null?void 0:x.partyName.split(",")[0])||"this saga";window.confirm(`Forget the chronicle of ${E}? The story cannot be recovered.`)&&(en.remove(u.dataset.drop),i())})});const v=a.querySelector("#saga-import-btn"),m=a.querySelector("#saga-import-input");v&&m&&(v.addEventListener("click",()=>m.click()),m.addEventListener("change",async()=>{var E;const u=(E=m.files)==null?void 0:E[0];if(!u)return;const x=en.importJSON(await u.text());x.ok?(ri("📂",`${x.record.partyName.split(",")[0]}'s saga is on the shelf.`),i()):ri("⚠️",x.error)}))},s=a=>{const l=en.resume(a);if(!l)return;const c=document.getElementById("records-body"),d=en.exportMarkdown(a,{ledger:!0});c.innerHTML=`
      <button id="saga-back" style="font-size:0.75rem;padding:0.35rem 0.7rem;margin-bottom:0.6rem;">← Back to the Hall</button>
      <div style="color:${l.continuable?"#3ddc84":"#8a6a5a"};font-size:0.75rem;margin-bottom:0.6rem;">
        ${l.continuable?`${l.standing} still standing${l.bench?` · ${l.bench} in reserve`:""} — this party can delve again.`:dt(l.reason||"This saga is finished.")}
      </div>
      <div class="saga-doc">${z_(d)}</div>
      <button id="saga-download" style="width:100%;margin-top:0.7rem;padding:0.6rem;font-size:0.8rem;">📖 Download this chronicle</button>`,c.querySelector("#saga-back").addEventListener("click",i),c.querySelector("#saga-download").addEventListener("click",()=>{wr(`chronicle-${l.chronicle.partyName.split(",")[0].toLowerCase().replace(/[^a-z0-9]+/g,"-")}.md`,d)})},r=()=>{i(),n.classList.add("active")},o=()=>n.classList.remove("active");e.addEventListener("click",r),t.addEventListener("click",o),n.addEventListener("click",a=>{a.target===n&&o()})}function z_(n){return dt(n).replace(/^### (.*)$/gm,"<h4>$1</h4>").replace(/^## (.*)$/gm,"<h3>$1</h3>").replace(/^# (.*)$/gm,"<h2>$1</h2>").replace(/^- (.*)$/gm,"<li>$1</li>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/_(.+?)_/g,"<em>$1</em>").replace(/&lt;details&gt;&lt;summary&gt;Ledger&lt;\/summary&gt;/g,"<details><summary>Ledger</summary>").replace(/&lt;\/details&gt;/g,"</details>").split(`

`).map(e=>/^<(h\d|li|details)/.test(e.trim())?e:`<p>${e}</p>`).join("")}function ri(n,e,t=""){const i=document.getElementById("toast-stack"),s=document.createElement("div");for(s.className=`toast${t?" toast-"+t:""}`,s.innerHTML=`<span class="toast-icon">${n}</span><span>${dt(e)}</span>`,i.appendChild(s),setTimeout(()=>{s.classList.add("fade"),setTimeout(()=>s.remove(),500)},3600);i.children.length>3;)i.removeChild(i.firstChild)}function H_(n,e){var i;const t=(i=e.narration)==null?void 0:i.room;t&&me.seenRoomTypes&&!me.seenRoomTypes.has(t)&&Kc[t]&&(me.seenRoomTypes.add(t),ri(e.narration.icon||"ℹ️",Kc[t],"room"));for(const s of k_(n,e))ri(s.icon,s.text,s.kind)}function To(){me.draft=new Bd(`table-${Date.now().toString(36)}`),me.draftUI=new Vd(me.draft,G_),me.draftUI.render(),document.getElementById("world-container").style.display="none",document.getElementById("ui-container").style.display="none"}function G_({pool:n,difficulty:e,seed:t}){console.log(`Delve begins: difficulty=${e}, seed=${t}`);const i=document.getElementById("draft-container");i.innerHTML="",i.style.display="none",document.getElementById("world-container").style.display="flex",document.getElementById("ui-container").style.display="flex";const s=me.pendingReplay||null;me.pendingReplay=null,s&&ri("🗺️",`Delving the archived design: "${s.name}"`,"room");const r=new Oi(n);me.difficulty=e,me.runRecorded=!1,me.standings=null,me.seenRoomTypes=new Set,V_(r,"⛏️ March on the Dungeon",()=>{$_(new md(r,t,e,{layout:s?s.layout:null}))})}function V_(n,e,t){const i=document.getElementById("gameover-display");i.innerHTML="";const s=document.createElement("div");i.appendChild(s),Zh(s,n,{doneLabel:e,onChange:()=>{me.simulator&&Wo(me.simulator.getState())},onDone:()=>{i.classList.remove("active"),i.innerHTML="",t()}}),i.classList.add("active")}function $_(n){if(me.simulator=n,!me.renderer)try{me.renderer=new G0("game-canvas")}catch(t){console.warn("WebGL unavailable, using 2D map renderer:",t),me.renderer=new $d("game-canvas")}const e=n.getState();me.prevState=e,Y_(e.theme),document.getElementById("pause-btn").disabled=!1,document.getElementById("step-btn").disabled=!1,document.getElementById("pause-btn").textContent="Pause",me.renderer.render(e),Wo(e),me.gameRunning=!0,me.lastTickTime=performance.now(),vd()}function vd(){if(!me.gameRunning)return;const n=performance.now(),e=1400/me.speedMultiplier;n-me.lastTickTime>=e&&(me.lastTickTime=n,me.simulator.tick(),yd())||requestAnimationFrame(vd)}function yd(){var e,t;const n=me.simulator.getState();if(me.renderer.render(n),Wo(n),n.narration&&(X_(n.narration,n.roomIndex),H_(me.prevState,n),(t=(e=me.renderer).playEffect)==null||t.call(e,n.narration.action,n.narration.roomIndex,n.narration.spellElement),n.narration.aside)){const i=n.narration.aside.startsWith("🕳️")?"🕳️":"🧭";ri(i,n.narration.aside.replace(/^[^ ]+ /,""),"room")}return me.prevState=n,n.gameOver?(j_(n),!0):!1}function W_(){!me.simulator||!me.gameRunning||(me.simulator.tick(),yd())}function q_(){if(!me.simulator)return;const n=!me.simulator.paused;me.simulator.setPaused(n),document.getElementById("pause-btn").textContent=n?"Resume":"Pause",n||(me.lastTickTime=performance.now())}function Wo(n){document.getElementById("room-count").textContent=`${n.roomIndex} / ${(n.pathLength||n.dungeon.length)-1}`;const e=Math.max(...(n.dungeon.rooms||[]).map(v=>(v.floor||0)+1),1),t=document.getElementById("floor-count");t.textContent=`${(n.floor||0)+1} / ${e}`,t.style.color=(n.floor||0)+1===e?"#d88a3f":"#9aa3b0",document.getElementById("gold-count").textContent=n.party.gold,document.getElementById("score-count").textContent=n.party.score;const i=document.getElementById("supply-count"),s=n.party.supply??0;i.textContent=s===0?"dark":s,i.style.color=s===0?"#e05555":s<=2?"#d8a53f":"#e8c07a",i.title=s===0?"The oil is gone. Every march in the dark costs the whole party health.":`Oil for ${s} more march${s===1?"":"es"}.`,document.getElementById("potions-count").textContent=n.party.potions;const r=document.getElementById("trophies-count"),o=n.party.trophies||[];r.textContent=o.length,r.title=o.map(v=>`${v.icon} ${v.name}`).join(`
`);const a=[];n.party.poisonLinger>0&&a.push("🐍 venom working"),n.party.alarmed&&a.push("🔔 alarm raised"),document.getElementById("status-badges").textContent=a.join(" · ");const l=document.getElementById("party-roster"),c=(n.party.reserve||[]).map(v=>`
      <div class="member-row" style="opacity:0.5;">
        <span>${v.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${v.name} <span style="color:#665;font-size:0.7rem;">(${v.class})</span></div>
          <div style="color:#556;font-size:0.68rem;">in reserve — waits in town for a place in the four</div>
        </span>
      </div>`).join("");l.innerHTML=n.party.members.map(v=>{const m=Math.round(v.health/v.maxHealth*100),u=m>60?"#3ddc84":m>30?"#d8a53f":"#e05555",x=[...v.equipment,...v.weaponMods].join(", "),E=v.effectiveMax??v.maxHealth,S=Math.max(0,Math.round((v.maxHealth-E)/v.maxHealth*100)),I=S>0?`<span class="hp-scar" style="position:absolute;right:0;top:0;bottom:0;width:${S}%;background:repeating-linear-gradient(45deg,#5a2a2a,#5a2a2a 2px,#3a1c1c 2px,#3a1c1c 4px);"></span>`:"",b=v.wounds?`<span title="${v.wounds} wound${v.wounds===1?"":"s"} — healing cannot pass ${E} until town" style="color:#c76;font-size:0.68rem;">${"✚".repeat(Math.min(v.wounds,4))}</span>`:"";return`
      <div class="member-row ${v.alive?"":"member-dead"}">
        <span>${v.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${v.name} <span style="color:#665;font-size:0.7rem;">(${v.class})</span></div>
          ${x?`<div style="color:#556;font-size:0.68rem;">${x}</div>`:""}
        </span>
        ${b}
        <span class="hp-bar" style="position:relative;overflow:hidden;"><span class="hp-fill" style="width:${m}%;background:${u};"></span>${I}</span>
        <span class="member-hp" style="color:${u};">${v.health}</span>
      </div>
    `}).join("")+c;const d=n.party.formation&&n.party.formation!=="line"?`<span class="tactic-chip" title="The room allowed this shape, and the party took it">${N_[n.party.formation]||""} ${dt(U_[n.party.formation]||"")}</span>`:"",h=document.getElementById("party-tactics"),f=n.party.tactics||[],p=n.party.dormantTactics||[];h.innerHTML=[d,...f.map(v=>`<span class="tactic-chip">${v.icon} ${dt(v.name)}</span>`),...p.map(v=>{const m=(v.match(/^\S+\s(.+?) is drafted/)||[])[1]||"A tactic";return`<span class="tactic-chip idle" title="${dt(v)}">${dt(m)} · idle</span>`})].join("");const g=document.getElementById("debug-log");g.innerHTML=n.log.map(v=>`<div class="log-entry">${dt(v)}</div>`).join(""),g.scrollTop=g.scrollHeight}function X_(n,e){const t=document.getElementById("story-panel"),i=t.querySelector(".story-empty");i&&i.remove();const s=(n.falls||[]).map(l=>`<div class="story-fall">${dt(l)}</div>`).join(""),r=(n.wounds||[]).map(l=>`<div class="story-wound">${dt(l)}</div>`).join(""),o=n.aside?`<div class="story-aside">${dt(n.aside)}</div>`:"",a=document.createElement("div");for(a.className="story-entry",a.innerHTML=`
    <div class="story-room">${n.icon} Room ${e} — ${n.room}</div>
    <div class="story-predicament">${dt(n.predicament)}</div>
    <div class="story-deliberation">${dt(n.deliberation)}</div>
    <div class="story-resolution">${dt(n.resolution)}</div>
    ${r}
    ${s}
    ${o}
  `,t.appendChild(a);t.children.length>14;)t.removeChild(t.firstChild);t.scrollTop=t.scrollHeight}function Y_(n=null){const i=n?`<div class="story-entry" style="border-left:3px solid #d8a53f;">
         <div class="story-room" style="font-size:1rem;">${n.icon} ${dt(n.name)}</div>
         <div class="story-predicament" style="font-style:italic;">${dt(n.tagline)}</div>
         
       </div>`:"";document.getElementById("story-panel").innerHTML=i+'<div class="story-empty">The chronicle of this delve is not yet written…</div>'}function j_(n){me.gameRunning=!1,document.getElementById("pause-btn").disabled=!0,document.getElementById("step-btn").disabled=!0,hr.save({name:`${n.theme.name} — depth ${n.depth}`,layout:Q0(me.simulator.dungeon),seed:me.simulator.seed,outcome:{victory:n.victory,score:n.party.score,depth:n.depth}}),gd(),J_()}function J_(n){const e=me.simulator.getRunResult(),t={...e,depth:1,retired:e.victory},i=t.retired;me.runRecorded||(me.runRecorded=!0,ti.recordRun(me.difficulty,{score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:i,survivors:t.survivors,partySize:t.partySize,depth:t.depth}));const s=ti.bestScores[me.difficulty]||0,r=t.score>=s&&t.score>0,o=ti.getStats();!me.standings&&me.draft&&(me.standings=v_(me.draft,{score:t.score},{seed:me.simulator.seed,difficulty:me.difficulty}));const a=(me.standings||[]).map(f=>`
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.28rem 0;border-bottom:1px dashed #2a2318;${f.isPlayer?"color:#d8a53f;font-weight:bold;":"color:#b0a080;"}">
      <span style="width:1.6rem;">${Z_(f.place)}</span>
      <span>${f.icon} ${dt(f.name)}</span>
      <span style="margin-left:auto;">${f.score} <span style="color:#776;font-size:0.82em;">· depth ${f.depthReached}</span></span>
    </div>`).join(""),l=document.getElementById("gameover-display");l.innerHTML=`
    <h2 style="color:${i?"#3ddc84":"#e05555"};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
      ${i?"🏆 Out of the Dungeon, Alive":"☠️ The Run Ends in the Dark"}
    </h2>
    <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${i?"#3ddc84":"#aa5544"};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
      ${dt(e.epitaph||"")}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
      <span style="color:#887755;">Score</span><strong style="color:#d8a53f;text-align:right;">${t.score}${r?" ⭐ New Best!":""}</strong>
      <span style="color:#887755;">Gold</span><strong style="text-align:right;">${t.gold}</strong>
      <span style="color:#887755;">Rooms conquered</span><strong style="text-align:right;">${t.roomsCleared}</strong>
      <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${t.survivors} / ${t.partySize}</strong>
      <span style="color:#887755;">Spells learned</span><strong style="text-align:right;">${t.spellsLearned}</strong>
      <span style="color:#887755;">Trophies claimed</span><strong style="text-align:right;">${t.trophies}</strong>
      <span style="color:#887755;">Best on ${me.difficulty}</span><strong style="text-align:right;">${Math.max(s,t.score)}</strong>
      <span style="color:#887755;">Career</span><strong style="text-align:right;">${o.totalVictories} escapes / ${o.totalRuns} runs</strong>
    </div>
    ${K_(me.simulator.party.trophies,i)}
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">🎲 At the Table — how the draft played out</div>
      ${a}
    </div>
  `;const c=document.createElement("button");c.textContent="🃏 Draft a New Party",c.style.cssText="width:100%;margin-top:1.5rem;padding:0.9rem;font-size:1rem;",c.addEventListener("click",()=>{l.classList.remove("active"),document.getElementById("show-results-btn").classList.remove("active"),To()}),l.appendChild(c);const d=document.createElement("button");d.textContent="📖 Read the Chronicle",d.style.cssText="width:100%;margin-top:0.5rem;padding:0.7rem;font-size:0.9rem;background:#2a2213;color:#d8a53f;",d.addEventListener("click",()=>{l.classList.remove("active"),document.getElementById("show-results-btn").classList.add("active")}),l.appendChild(d);const h=gd();if(h){const f=me.simulator.getChronicle(),p=document.createElement("div");p.style.cssText="display:flex;gap:0.5rem;margin-top:0.5rem;";const g=document.createElement("button");g.textContent="📖 Download the chronicle",g.title="The whole saga as a document you can read",g.style.cssText="flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;",g.addEventListener("click",()=>{wr(eh(f,"md"),sd(f,{ledger:!0}))});const v=document.createElement("button");v.textContent="💾 Save file",v.title="A save you can keep, share, or load back in to delve again with this party",v.style.cssText="flex:1;padding:0.7rem;font-size:0.82rem;background:#221c14;color:#c0b090;",v.addEventListener("click",()=>{wr(eh(f,"json"),en.exportJSON(h.id),"application/json")}),p.append(g,v),l.appendChild(p);const m=document.createElement("div");m.style.cssText="margin-top:0.4rem;font-size:0.7rem;color:#776;text-align:center;",m.textContent=`Saved as "${h.partyName.split(",")[0]}" — delve ${h.delves}. Find it under 🏛️ Records.`,l.appendChild(m)}l.classList.add("active")}function K_(n,e){if(!n||n.length===0)return"";const t=n.slice(-10).reverse(),i=n.length-t.length,s=t.map(r=>`
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.22rem 0;border-bottom:1px dashed #2a2318;color:#b0a080;font-size:0.85rem;">
      <span>${r.icon}</span>
      <span style="flex:1;">${dt(r.name)}</span>
      <span style="color:#776;font-size:0.78em;">from ${dt(r.from)}</span>
    </div>`).join("");return`
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">
        🏆 The Trophy Case — ${e?"what came up with them":"what the dark took back"}
      </div>
      ${s}
      ${i>0?`<div style="color:#776;font-size:0.78rem;padding-top:0.3rem;">… and ${i} more, further down the chronicle.</div>`:""}
    </div>`}function dt(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}function Z_(n){return["🥇","🥈","🥉"][n-1]||`${n}.`}window.addEventListener("DOMContentLoaded",O_);
