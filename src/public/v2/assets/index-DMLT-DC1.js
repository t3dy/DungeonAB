(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Q={CHARACTER:"character",EQUIPMENT:"equipment",SPELL:"spell",PERSONALITY:"personality"},K={FIGHTER:"fighter",CLERIC:"cleric",WIZARD:"wizard",ROGUE:"rogue",ALCHEMIST:"alchemist"},Bl=[{id:"char-brand",type:Q.CHARACTER,class:K.FIGHTER,name:"Brand of the Broken Shield",icon:"⚔️",stats:{health:18,attack:5,defense:4,mind:2},trait:"Holds the door: takes hits meant for the back rank."},{id:"char-ursula",type:Q.CHARACTER,class:K.FIGHTER,name:"Ursula Ironknee",icon:"⚔️",stats:{health:20,attack:4,defense:5,mind:2},trait:"Unmovable. Refuses to fall while anyone stands behind her."},{id:"char-kestrel",type:Q.CHARACTER,class:K.FIGHTER,name:"Kestrel Quickblade",icon:"⚔️",stats:{health:15,attack:6,defense:3,mind:3},trait:"Strikes first in every fight."},{id:"char-benedicta",type:Q.CHARACTER,class:K.CLERIC,name:"Sister Benedicta",icon:"✨",stats:{health:13,attack:2,defense:3,mind:5},trait:"Mends wounds between rooms; turns the restless dead."},{id:"char-oswald",type:Q.CHARACTER,class:K.CLERIC,name:"Brother Oswald of the Lantern",icon:"✨",stats:{health:14,attack:3,defense:3,mind:4},trait:"His lantern light steadies the whole party's nerve."},{id:"char-melchior",type:Q.CHARACTER,class:K.WIZARD,name:"Melchior the Moth-Eaten",icon:"🔮",stats:{health:9,attack:2,defense:1,mind:7},trait:"Doubles the power of any spell the party casts."},{id:"char-sylvane",type:Q.CHARACTER,class:K.WIZARD,name:"Sylvane of the Nine Candles",icon:"🔮",stats:{health:10,attack:3,defense:2,mind:6},trait:"Reads sealed doors and cursed scripts aloud, safely. Usually."},{id:"char-vex",type:Q.CHARACTER,class:K.ROGUE,name:"Vex Threefingers",icon:"🗡️",stats:{health:11,attack:4,defense:2,mind:5},trait:"Disarms traps and picks locks; finds the hidden coin."},{id:"char-mouse",type:Q.CHARACTER,class:K.ROGUE,name:"The Mouse",icon:"🗡️",stats:{health:10,attack:5,defense:2,mind:4},trait:"Scouts one room ahead. Nobody has ever seen The Mouse first."},{id:"char-paracelsus",type:Q.CHARACTER,class:K.ALCHEMIST,name:"Paracelsus the Lesser",icon:"⚗️",stats:{health:12,attack:3,defense:2,mind:6},trait:"Brews potions and mods weapons at any lab bench he finds."},{id:"char-perenelle",type:Q.CHARACTER,class:K.ALCHEMIST,name:"Perenelle of the Green Lion",icon:"⚗️",stats:{health:11,attack:2,defense:3,mind:6},trait:"Distills two potions from every lab instead of one."},{id:"char-gunnhild",type:Q.CHARACTER,class:K.FIGHTER,name:"Gunnhild Half-Door",icon:"⚔️",stats:{health:17,attack:5,defense:5,mind:1},trait:"Got her name blocking one. Has never explained which half."},{id:"char-ash",type:Q.CHARACTER,class:K.CLERIC,name:"Canoness Ash",icon:"✨",stats:{health:12,attack:3,defense:2,mind:6},trait:"Buried three orders of her own sisters. The dead listen when she talks."},{id:"char-yarrow",type:Q.CHARACTER,class:K.WIZARD,name:"Old Yarrow",icon:"🔮",stats:{health:11,attack:2,defense:2,mind:6},trait:"Forgot more magic than most learn. Occasionally remembers it mid-fight."},{id:"char-silin",type:Q.CHARACTER,class:K.ROGUE,name:"Silin the Debt",icon:"🗡️",stats:{health:12,attack:4,defense:3,mind:4},trait:"Owes everyone. Pays in doors opened and knives thrown."},{id:"char-crucible",type:Q.CHARACTER,class:K.ALCHEMIST,name:"Magister Crucible",icon:"⚗️",stats:{health:13,attack:3,defense:3,mind:5},trait:"Expelled from three academies. Each explosion taught him something."}],Vc=[{id:"eq-tower-shield",type:Q.EQUIPMENT,name:"Tower Shield",icon:"🛡️",slot:"armor",bonus:{defense:3},bestFor:K.FIGHTER,text:"A wall with a handle."},{id:"eq-greatsword",type:Q.EQUIPMENT,name:"Greatsword of the Vault",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:K.FIGHTER,text:"Found in a vault. Wants to go back."},{id:"eq-blessed-mace",type:Q.EQUIPMENT,name:"Blessed Mace",icon:"🔨",slot:"weapon",bonus:{attack:2,mind:1},bestFor:K.CLERIC,text:"Persuasion, sanctified."},{id:"eq-grimoire",type:Q.EQUIPMENT,name:"Grimoire of Low Whispers",icon:"📖",slot:"focus",bonus:{mind:3},bestFor:K.WIZARD,text:"The margins argue with the text."},{id:"eq-lockpicks",type:Q.EQUIPMENT,name:"Masterwork Lockpicks",icon:"🗝️",slot:"tool",bonus:{mind:2},bestFor:K.ROGUE,text:"Every door is a suggestion."},{id:"eq-alembic",type:Q.EQUIPMENT,name:"Portable Alembic",icon:"⚗️",slot:"tool",bonus:{mind:2},bestFor:K.ALCHEMIST,text:"A lab that fits in a satchel. Labs found in the dungeon work better."},{id:"eq-chainmail",type:Q.EQUIPMENT,name:"Dwarven Chainmail",icon:"🥋",slot:"armor",bonus:{defense:2},bestFor:null,text:"Fits anyone brave enough to wear it."},{id:"eq-boots",type:Q.EQUIPMENT,name:"Boots of the Quiet Step",icon:"👢",slot:"boots",bonus:{defense:1,mind:1},bestFor:K.ROGUE,text:"The floorboards never learn your name."},{id:"eq-lantern",type:Q.EQUIPMENT,name:"Everburning Lantern",icon:"🏮",slot:"tool",bonus:{mind:1,defense:1},bestFor:K.CLERIC,text:"Reveals hazards one room ahead."},{id:"eq-throwing-knives",type:Q.EQUIPMENT,name:"Bandolier of Knives",icon:"🔪",slot:"weapon",bonus:{attack:2},bestFor:K.ROGUE,text:"Six answers to most questions."},{id:"eq-warded-buckler",type:Q.EQUIPMENT,name:"Warded Buckler",icon:"🛡️",slot:"armor",bonus:{defense:2,mind:1},bestFor:K.CLERIC,text:"The prayers are etched on the inside, where they matter."},{id:"eq-quicksilver-daggers",type:Q.EQUIPMENT,name:"Quicksilver Daggers",icon:"🗡️",slot:"weapon",bonus:{attack:3},bestFor:K.ROGUE,text:"They land before the argument starts."},{id:"eq-athanor-charm",type:Q.EQUIPMENT,name:"Athanor Charm",icon:"🔥",slot:"tool",bonus:{mind:2},bestFor:K.ALCHEMIST,text:"A furnace in miniature, always exactly warm enough."},{id:"eq-wand-embers",type:Q.EQUIPMENT,name:"Wand of Embers",icon:"🪄",slot:"focus",bonus:{mind:1},bestFor:K.WIZARD,text:"Warm to any hand. What comes out depends on whose.",classActions:{[K.FIGHTER]:{name:"Ember Shot",opening:4},[K.WIZARD]:{name:"Meteor Fall",opening:8},[K.CLERIC]:{name:"Flame Ward",ward:1},[K.ROGUE]:{name:"Smoke Veil",ward:1},[K.ALCHEMIST]:{name:"Accelerant Charge",opening:5}}},{id:"eq-holy-symbol",type:Q.EQUIPMENT,name:"Holy Symbol of Dawn",icon:"☀️",slot:"focus",bonus:{mind:1},bestFor:K.CLERIC,text:"Protection for most. Authority for some. A bad idea for one.",classActions:{[K.FIGHTER]:{name:"Shield of Faith",ward:1},[K.ROGUE]:{name:"Veil of Shadows",ward:1},[K.CLERIC]:{name:"Radiant Smite",opening:3,vsUndead:6},[K.WIZARD]:{name:"Animate Corpse",summonAttack:3},[K.ALCHEMIST]:{name:"Blessed Reagents",opening:2}}},{id:"eq-cursed-blade",type:Q.EQUIPMENT,name:"Blade of the Adder",icon:"🐍",slot:"weapon",bonus:{attack:4,defense:-2},bestFor:K.FIGHTER,cursed:!0,text:"It whispers where to cut. It is usually right. It never says about what."},{id:"eq-haunted-armor",type:Q.EQUIPMENT,name:"Haunted Armor",icon:"👻",slot:"armor",bonus:{defense:3,mind:-1},bestFor:K.FIGHTER,cursed:!0,text:"A chill down the spine — but the resident ghost hates monsters more than it hates you.",classActions:{[K.FIGHTER]:{name:"The Ghost Objects",summonAttack:1},[K.CLERIC]:{name:"The Ghost Objects",summonAttack:1},[K.WIZARD]:{name:"The Ghost Objects",summonAttack:1},[K.ROGUE]:{name:"The Ghost Objects",summonAttack:1},[K.ALCHEMIST]:{name:"The Ghost Objects",summonAttack:1}}}],Hr=[{id:"sp-firebolt",type:Q.SPELL,name:"Firebolt",icon:"🔥",school:"evocation",element:"fire",power:4,use:"combat",text:"Opens combat with 4 damage before blades are drawn."},{id:"sp-mend",type:Q.SPELL,name:"Mending Word",icon:"💚",school:"restoration",power:5,use:"heal",text:"Restores 5 health to the most wounded companion."},{id:"sp-knock",type:Q.SPELL,name:"Knock",icon:"🚪",school:"transmutation",power:3,use:"utility",text:"Opens any lock. Loudly."},{id:"sp-shield",type:Q.SPELL,name:"Aegis of Ash",icon:"🛡️",school:"abjuration",power:3,use:"combat",text:"Blunts the first blow in each fight."},{id:"sp-light",type:Q.SPELL,name:"Dancing Light",icon:"💡",school:"evocation",power:2,use:"utility",text:"Reveals traps and ambushes in the next room."},{id:"sp-fear",type:Q.SPELL,name:"Cause Fear",icon:"😱",school:"necromancy",power:4,use:"combat",text:"Weak monsters flee before the fight begins."},{id:"sp-chain",type:Q.SPELL,name:"Chain Lightning",icon:"⚡",school:"evocation",element:"shock",power:5,use:"combat",text:"Arcs from foe to foe until it runs out of foes or enthusiasm."},{id:"sp-frost",type:Q.SPELL,name:"Frost Lance",icon:"❄️",school:"evocation",element:"frost",power:5,use:"combat",text:"Cold, precise, and deeply personal."},{id:"sp-sunder",type:Q.SPELL,name:"Sunder",icon:"💢",school:"transmutation",power:4,use:"combat",text:"Armor remembers being ore. This spell reminds it."},{id:"sp-radiance",type:Q.SPELL,name:"Radiant Lance",icon:"🌟",school:"theurgy",element:"holy",power:4,use:"combat",text:"A line of noon driven through whatever the dark is wearing."},{id:"sp-balm",type:Q.SPELL,name:"Balm of Hours",icon:"🌾",school:"restoration",power:6,use:"heal",text:"Borrows healing from a quieter week and spends it now."},{id:"sp-eyes",type:Q.SPELL,name:"Eyes of the Mouse",icon:"👁️",school:"divination",power:2,use:"utility",text:"See what the small and cautious see. It is a lot."},{id:"sp-feather",type:Q.SPELL,name:"Feather Step",icon:"🪶",school:"transmutation",power:3,use:"utility",text:"The floor agrees to pretend nobody is on it."}],Fa=[{id:"pers-brave",type:Q.PERSONALITY,name:"The Bold",icon:"🦁",archetype:"brave",text:"Fights before fleeing; opens the ominous door."},{id:"pers-cunning",type:Q.PERSONALITY,name:"The Cunning",icon:"🦊",archetype:"cunning",text:"Prefers the trap disarmed, the guard bribed, the fight skipped."},{id:"pers-greedy",type:Q.PERSONALITY,name:"The Covetous",icon:"💰",archetype:"greedy",text:"Never leaves treasure behind. Never."},{id:"pers-scholarly",type:Q.PERSONALITY,name:"The Scholarly",icon:"📚",archetype:"scholarly",text:"Reads everything; lingers in libraries; learns extra spells."},{id:"pers-pious",type:Q.PERSONALITY,name:"The Devout",icon:"🕯️",archetype:"pious",text:"Rests at shrines; heals more; abhors desecration."},{id:"pers-reckless",type:Q.PERSONALITY,name:"The Reckless",icon:"💥",archetype:"reckless",text:"Rushes in. Sometimes that works. Gloriously."},{id:"pers-craven",type:Q.PERSONALITY,name:"The Craven",icon:"🐔",archetype:"craven",trap:!0,text:"Avoids every fight it can. Notices every exit — and every tripwire."}],Wc={[Q.CHARACTER]:Bl,[Q.EQUIPMENT]:Vc,[Q.SPELL]:Hr,[Q.PERSONALITY]:Fa},un={character:{statTotal:34},equipment:{bonusTotal:4},spell:{maxPower:6}},uo=Fa.map(i=>i.archetype);function zl(i){const e=[];if(!i||typeof i!="object")return["not a card"];if(i.id||e.push("needs an id"),(!i.name||i.name.length<2)&&e.push("needs a name"),Object.values(Q).includes(i.type)||e.push(`unknown type "${i.type}"`),i.type===Q.CHARACTER){Object.values(K).includes(i.class)||e.push(`unknown class "${i.class}"`);const t=i.stats||{};for(const s of["health","attack","defense","mind"])Number.isFinite(t[s])&&t[s]>=1||e.push(`stat ${s} must be ≥ 1`);const n=(t.health||0)+(t.attack||0)*2+(t.defense||0)*2+(t.mind||0);n>un.character.statTotal&&e.push(`stat budget ${n} exceeds ${un.character.statTotal} (health + 2×attack + 2×defense + mind)`)}if(i.type===Q.EQUIPMENT){const t=i.bonus||{},n=Object.values(t).reduce((s,r)=>s+r,0);n>un.equipment.bonusTotal&&e.push(`bonus total ${n} exceeds ${un.equipment.bonusTotal}`),Object.keys(t).length===0&&e.push("equipment needs at least one bonus")}return i.type===Q.SPELL&&(["combat","heal","utility"].includes(i.use)||e.push("spell use must be combat/heal/utility"),Number.isFinite(i.power)&&i.power>=1&&i.power<=un.spell.maxPower||e.push(`spell power must be 1–${un.spell.maxPower}`)),i.type===Q.PERSONALITY&&(uo.includes(i.archetype)||e.push(`personality archetype must be one of: ${uo.join(", ")}`)),e}function Hl(i){const e=[];(!(i!=null&&i.id)||!(i!=null&&i.name))&&e.push("a pack needs an id and a name"),(!Array.isArray(i==null?void 0:i.cards)||i.cards.length===0)&&e.push("a pack needs cards");const t=new Set;for(const n of(i==null?void 0:i.cards)||[]){for(const s of zl(n))e.push(`${(n==null?void 0:n.name)||(n==null?void 0:n.id)||"?"}: ${s}`);t.has(n.id)&&e.push(`duplicate card id ${n.id}`),t.add(n.id)}return e}const xi=[];function Ji(i,{enabled:e=!0}={}){const t=Hl(i);if(t.length)throw new Error(`invalid pack: ${t.join("; ")}`);const n=xi.findIndex(r=>r.pack.id===i.id),s={pack:i,enabled:e};return n>=0?xi[n]=s:xi.push(s),s}function $c(i,e){const t=xi.find(n=>n.pack.id===i);return t&&(t.enabled=e),t||null}function Xc(){return xi.map(i=>({id:i.pack.id,name:i.pack.name,description:i.pack.description,cards:i.pack.cards.length,enabled:i.enabled}))}function as(i){const e=xi.filter(t=>t.enabled).flatMap(t=>t.pack.cards.filter(n=>n.type===i));return[...Wc[i]||[],...e]}class Ks{constructor(e){this.seed=this.hashCode(String(e))%2147483647,this.seed<=0&&(this.seed+=2147483646);for(let t=0;t<3;t++)this.next()}hashCode(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t=t&t;return Math.abs(t)}next(){return this.seed=this.seed*16807%2147483647,(this.seed-1)/2147483646}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(this.next()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}}const qc=[{id:"warlord",name:"The Warlord",icon:"⚔️",desc:"Drafts muscle first: fighters, weapons, and the will to use them.",weights:{character:3,equipment:2.5,spell:.8,personality:1},classBias:{fighter:3,rogue:1.5}},{id:"archmage",name:"The Archmage",icon:"🔮",desc:"Hoards spells and the wizards to wield them.",weights:{character:2,equipment:1,spell:3,personality:1},classBias:{wizard:3,cleric:1.5}},{id:"guildmaster",name:"The Guildmaster",icon:"⚖️",desc:"Balances the ledger: a bit of everything, nothing wasted.",weights:{character:2,equipment:2,spell:2,personality:2},classBias:{rogue:2,alchemist:2}}];function Yc(i){const e=[],t=new Set,n=(s,r)=>{const a=i.shuffle(s);let o=0;for(const l of a){if(o>=r)break;t.has(l.id)||(t.add(l.id),e.push({...l}),o++)}};return n(as(Q.CHARACTER),3),n(as(Q.EQUIPMENT),2),n(as(Q.SPELL),2),n(as(Q.PERSONALITY),1),i.shuffle(e)}function jc(i,e,t,n){let s=e.weights[i.type]||1;const r=t.filter(a=>a.type===Q.CHARACTER);if(i.type===Q.CHARACTER&&(s+=e.classBias[i.class]||0,s-=r.length*.35,r.length===0&&(s+=3),i.class===K.ALCHEMIST&&!r.some(a=>a.class===K.ALCHEMIST)&&(s+=.7)),i.type===Q.EQUIPMENT&&(i.bestFor&&r.some(a=>a.class===i.bestFor)&&(s+=1.5),i.bestFor&&!r.some(a=>a.class===i.bestFor)&&(s-=.5),i.cursed&&(s-=.8)),i.type===Q.SPELL&&r.some(a=>a.class===K.WIZARD)&&(s+=1.2),i.type===Q.PERSONALITY){const a=t.filter(o=>o.type===Q.PERSONALITY);s-=a.length*1.2,i.trap&&(s-=.6)}return s+=n.next()*1.2,s}function Kc(i,e,t,n){let s=null,r=-1/0;for(const a of i){const o=jc(a,e,t,n);o>r&&(r=o,s=a)}return s}class Zc{constructor(e="table",t=3){this.rng=new Ks(e),this.numRounds=t,this.seats=[{id:"player",name:"You",icon:"🐍",isAI:!1,pool:[]},...qc.map(n=>({id:n.id,name:n.name,icon:n.icon,isAI:!0,persona:n,pool:[]}))],this.round=0,this.pickInRound=0,this.packs=[],this.finished=!1,this.log=[],this.openNewPacks()}openNewPacks(){this.packs=this.seats.map(()=>Yc(this.rng)),this.pickInRound=0}passDirection(){return this.round%2===0?1:-1}getPlayerPack(){return this.packs[0]}playerPick(e){if(this.finished)return null;const t=this.packs[0],n=t.findIndex(a=>a.id===e);if(n===-1)return null;const s=t.splice(n,1)[0];this.seats[0].pool.push(s),this.log.push({round:this.round,pick:this.pickInRound,seat:0,card:s});const r=[];for(let a=1;a<this.seats.length;a++){const o=this.seats[a],l=Kc(this.packs[a],o.persona,o.pool,this.rng);if(l){const c=this.packs[a].findIndex(h=>h.id===l.id);this.packs[a].splice(c,1),o.pool.push(l),this.log.push({round:this.round,pick:this.pickInRound,seat:a,card:l}),r.push({seat:o.name,icon:o.icon,card:l})}}return this.pickInRound++,this.packs[0].length>0?this.passDirection()===1?this.packs.unshift(this.packs.pop()):this.packs.push(this.packs.shift()):(this.round++,this.round>=this.numRounds?this.finished=!0:this.openNewPacks()),{playerCard:s,aiPicks:r}}getPlayerPool(){const e=this.seats[0].pool;return{all:e,characters:e.filter(t=>t.type===Q.CHARACTER),equipment:e.filter(t=>t.type===Q.EQUIPMENT),spells:e.filter(t=>t.type===Q.SPELL),personalities:e.filter(t=>t.type===Q.PERSONALITY)}}getTableSummary(){return this.seats.map(e=>({name:e.name,icon:e.icon,isAI:e.isAI,counts:{characters:e.pool.filter(t=>t.type===Q.CHARACTER).length,equipment:e.pool.filter(t=>t.type===Q.EQUIPMENT).length,spells:e.pool.filter(t=>t.type===Q.SPELL).length,personalities:e.pool.filter(t=>t.type===Q.PERSONALITY).length}}))}}const Mi={none:{id:"none",name:"Standard Delve",icon:"🗺️",text:"No wager. The dungeon as the dungeon intends.",scoreBonus:0},swarms:{id:"swarms",name:"Monster Swarms",icon:"🐝",text:"The halls run thick with the weak and the many — more fights, thinner foes, more score.",scoreBonus:.25,weightTweaks:{monster:2,corridor:-.3},monsterHealthMult:.7},traps:{id:"traps",name:"Trap-Dense",icon:"🪤",text:"Every flagstone is a question. More traps, and they bite deeper.",scoreBonus:.25,weightTweaks:{trap:2},trapBonus:2},darkpact:{id:"darkpact",name:"Dark Pact",icon:"🩸",text:"The dungeon's malice sharpens its teeth — and gilds its hoard.",scoreBonus:.3,monsterAttackMult:1.25,goldMult:1.5},nightfall:{id:"nightfall",name:"Endless Night",icon:"🌑",text:"No light reaches here. The dungeon itself turns hostile more often.",scoreBonus:.3,weightTweaks:{disaster:1.5,treasure:-.3}},throne:{id:"throne",name:"The Long Throne",icon:"👑",text:"Fewer rooms, one horror. The boss has grown fat on patience.",scoreBonus:.35,weightTweaks:{monster:-1,treasure:.5},bossAttackMult:1.4,bossHealthMult:1.4}};function vn(i){return Mi[i]||Mi.none}function Gl(i,e){const t=i&&typeof i=="object"?i:vn(i),n=e&&typeof e=="object"?e:vn(e);if(t.id==="none")return n;if(n.id==="none")return t;const s={...t.weightTweaks||{}};for(const[o,l]of Object.entries(n.weightTweaks||{}))s[o]=(s[o]||0)+l;const r=o=>(t[o]||1)*(n[o]||1),a={id:`${t.id}+${n.id}`,name:`${t.name} + ${n.name}`,icon:`${t.icon}${n.icon}`,text:`${t.text} ${n.text}`,scoreBonus:(t.scoreBonus||0)+(n.scoreBonus||0),weightTweaks:s,trapBonus:(t.trapBonus||0)+(n.trapBonus||0)};for(const o of["goldMult","monsterAttackMult","monsterHealthMult","bossAttackMult","bossHealthMult"]){const l=r(o);l!==1&&(a[o]=l)}return a}class Jc{constructor(e,t){this.draft=e,this.onComplete=t,this.lastAiPicks=[],this.selection={seed:"",difficulty:"medium"}}render(){const e=document.getElementById("draft-container");if(e.innerHTML="",e.style.display="block",this.draft.finished){this.renderDraftComplete(e);return}const t=this.draft.round+1,n=this.draft.pickInRound+1,s=this.draft.passDirection()===1?"→ passing left":"← passing right",r=document.createElement("div");r.style.cssText="text-align:center;margin-bottom:1rem;",r.innerHTML=`
      <div style="color:#d8a53f;font-size:1.1rem;font-weight:bold;">Pack ${t} of ${this.draft.numRounds} — Pick ${n}</div>
      <div style="color:#887755;font-size:0.8rem;">${s} · click ONE card to draft it, then the pack passes on</div>
      <div style="font-size:0.72rem;margin-top:0.4rem;display:flex;gap:0.9rem;justify-content:center;flex-wrap:wrap;">
        <span class="type-character">● Character</span>
        <span class="type-equipment">● Equipment</span>
        <span class="type-spell">● Spell</span>
        <span class="type-personality">● Personality</span>
      </div>
    `,e.appendChild(r);const a=document.createElement("div");a.className="pack-grid";for(const o of this.draft.getPlayerPack())a.appendChild(this.renderCard(o,()=>this.pick(o.id)));if(e.appendChild(a),this.lastAiPicks.length>0){const o=document.createElement("div");o.className="panel",o.style.cssText="margin-top:1rem;",o.innerHTML="<h2>The Table's Last Picks</h2>"+this.lastAiPicks.map(l=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${l.icon} ${l.seat} took <strong style="color:#c8b088;">${l.card.icon} ${l.card.name}</strong></div>`).join(""),e.appendChild(o)}this.renderPool(e)}renderCard(e,t){const n=document.createElement("div");n.className="draft-card";let s="";return e.type===Q.CHARACTER?s=`<div class="card-stats">❤️${e.stats.health} ⚔️${e.stats.attack} 🛡️${e.stats.defense} 🧠${e.stats.mind}</div>`:e.type===Q.EQUIPMENT?s=`<div class="card-stats">${Object.entries(e.bonus).map(([a,o])=>`+${o} ${a}`).join(", ")}${e.bestFor?` · best: ${e.bestFor}`:""}</div>`:e.type===Q.SPELL&&(s=`<div class="card-stats">power ${e.power} · ${e.school}</div>`),n.innerHTML=`
      <div class="card-type type-${e.type}">${e.type}${e.class?" · "+e.class:""}</div>
      <div class="card-name">${e.icon} ${e.name}</div>
      <div class="card-text">${e.trait||e.text||""}</div>
      ${s}
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
    `,e.appendChild(n);const s=document.createElement("div");s.className="pack-grid";for(const f of t.all){const p=this.renderCard(f,()=>{});p.style.cursor="default",s.appendChild(p)}e.appendChild(s);const r=document.createElement("div");r.className="panel",r.style.cssText="margin-top:1rem;",r.innerHTML="<h2>The Rest of the Table</h2>"+this.draft.getTableSummary().filter(f=>f.isAI).map(f=>`<div style="font-size:0.8rem;padding:0.2rem 0;color:#998866;">${f.icon} ${f.name}: party of ${f.counts.characters}, ${f.counts.equipment} equipment, ${f.counts.spells} spells</div>`).join(""),e.appendChild(r);const a=document.createElement("div");a.className="panel",a.style.cssText="margin-top:1rem;";const o=Object.values(Mi).map(f=>`<option value="${f.id}"${f.id==="none"?" selected":""}>${f.icon} ${f.name}${f.scoreBonus?` (+${Math.round(f.scoreBonus*100)}% score)`:""}</option>`).join("");a.innerHTML=`
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
              ${this.draft.seats.filter(f=>f.isAI).map(f=>`<option value="${f.id}">${f.icon} ${f.name}</option>`).join("")}
            </select>
          </label>
          <label style="flex:1;min-width:140px;">Hex
            <select id="hex-condition-select" style="width:100%;margin-top:0.3rem;background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.4rem;border-radius:4px;font-family:inherit;">
              <option value="none" selected>No hex — stay civil</option>
              ${Object.values(Mi).filter(f=>f.id!=="none").map(f=>`<option value="${f.id}">${f.icon} ${f.name}</option>`).join("")}
            </select>
          </label>
        </div>
        <div style="margin-top:0.35rem;font-size:0.72rem;color:#887755;font-style:italic;">Fair warning: the table hexes back. One rival will curse your run — but its score premium is yours to keep.</div>
      </div>
    `,e.appendChild(a);const l=a.querySelector("#condition-select"),c=a.querySelector("#condition-hint"),h=()=>{var f;c.textContent=((f=Mi[l.value])==null?void 0:f.text)||""};l.addEventListener("change",h),h();const d=document.createElement("button");d.textContent="🏰 Enter the Dungeon",d.style.cssText="width:100%;margin-top:1rem;padding:1rem;font-size:1rem;",d.addEventListener("click",()=>{const f=document.getElementById("difficulty-select").value,p=document.getElementById("seed-input").value.trim()||`delve-${Date.now().toString(36)}`,g=document.getElementById("condition-select").value,v=document.getElementById("hex-target-select").value,m=document.getElementById("hex-condition-select").value;this.onComplete({pool:t.all,difficulty:f,seed:p,condition:g,hexTarget:v,hexCondition:m})}),e.appendChild(d)}}class Qc{constructor(e){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext("2d")}render(e){const t=this.ctx,{dungeon:n,roomIndex:s,party:r}=e,a=this.canvas.clientWidth||500,o=this.canvas.clientHeight||420;(this.canvas.width!==a||this.canvas.height!==o)&&(this.canvas.width=a,this.canvas.height=o),t.fillStyle="#0d0b08",t.fillRect(0,0,a,o);const l=n.rooms,c=Math.max(...l.map(u=>u.x)),h=Math.max(...l.map(u=>u.y)),d=40,f=(a-d*2)/Math.max(1,c),p=(o-d*2)/Math.max(1,h),g=u=>d+u.x*f,v=u=>d+u.y*p;t.strokeStyle="#3a2f1e",t.lineWidth=6,t.beginPath();for(let u=0;u<l.length-1;u++)t.moveTo(g(l[u]),v(l[u])),t.lineTo(g(l[u+1]),v(l[u+1]));t.stroke();for(let u=0;u<l.length;u++){const b=l[u],E=g(b),M=v(b),N=u===s,T=u<s||b.cleared,A=b.type==="boss",L=A?20:14;if(N){const x=t.createRadialGradient(E,M,4,E,M,44);x.addColorStop(0,"rgba(216, 165, 63, 0.5)"),x.addColorStop(1,"rgba(216, 165, 63, 0)"),t.fillStyle=x,t.fillRect(E-44,M-44,88,88)}t.fillStyle=N?"#2a2213":T?"#171310":"#14110b",t.strokeStyle=N?"#d8a53f":A?"#8a3a3a":"#3a2f1e",t.lineWidth=N?2.5:1.5,t.beginPath(),t.arc(E,M,L,0,Math.PI*2),t.fill(),t.stroke();const S=u<=s+1||A;t.font=`${A?18:13}px serif`,t.textAlign="center",t.textBaseline="middle",t.globalAlpha=T&&!N?.45:1,t.fillText(S?b.icon:"❓",E,M),t.globalAlpha=1}const m=l[Math.min(s,l.length-1)];if(m&&r){const u=r.members.filter(N=>N.alive),b=g(m),E=v(m)-26;t.font="13px serif";const M=Math.min(14,44/Math.max(1,u.length));u.forEach((N,T)=>{const A=(T-(u.length-1)/2)*M;t.fillText(N.icon,b+A,E)})}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oa="170",eh=0,fo=1,th=2,Vl=1,Wl=2,hn=3,In=0,wt=1,fn=2,Cn=0,Si=1,Gr=2,po=3,mo=4,nh=5,Vn=100,ih=101,sh=102,rh=103,ah=104,oh=200,lh=201,ch=202,hh=203,Vr=204,Wr=205,dh=206,uh=207,fh=208,ph=209,mh=210,gh=211,vh=212,_h=213,yh=214,$r=0,Xr=1,qr=2,wi=3,Yr=4,jr=5,Kr=6,Zr=7,$l=0,xh=1,Mh=2,Pn=0,Sh=1,bh=2,Eh=3,wh=4,Th=5,Ah=6,Rh=7,Xl=300,Ti=301,Ai=302,Jr=303,Qr=304,Zs=306,ea=1e3,$n=1001,ta=1002,Lt=1003,Ch=1004,os=1005,Zt=1006,ir=1007,Xn=1008,yn=1009,ql=1010,Yl=1011,Qi=1012,Ba=1013,Yn=1014,mn=1015,ts=1016,za=1017,Ha=1018,Ri=1020,jl=35902,Kl=1021,Zl=1022,Wt=1023,Jl=1024,Ql=1025,bi=1026,Ci=1027,ec=1028,Ga=1029,tc=1030,Va=1031,Wa=1033,Fs=33776,Os=33777,Bs=33778,zs=33779,na=35840,ia=35841,sa=35842,ra=35843,aa=36196,oa=37492,la=37496,ca=37808,ha=37809,da=37810,ua=37811,fa=37812,pa=37813,ma=37814,ga=37815,va=37816,_a=37817,ya=37818,xa=37819,Ma=37820,Sa=37821,Hs=36492,ba=36494,Ea=36495,nc=36283,wa=36284,Ta=36285,Aa=36286,Ph=3200,Lh=3201,ic=0,Ih=1,Rn="",St="srgb",Li="srgb-linear",Js="linear",Ke="srgb",Jn=7680,go=519,Dh=512,Uh=513,Nh=514,sc=515,kh=516,Fh=517,Oh=518,Bh=519,Ra=35044,vo="300 es",gn=2e3,Xs=2001;class Ii{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sr=Math.PI/180,Ca=180/Math.PI;function Ln(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vt[i&255]+vt[i>>8&255]+vt[i>>16&255]+vt[i>>24&255]+"-"+vt[e&255]+vt[e>>8&255]+"-"+vt[e>>16&15|64]+vt[e>>24&255]+"-"+vt[t&63|128]+vt[t>>8&255]+"-"+vt[t>>16&255]+vt[t>>24&255]+vt[n&255]+vt[n>>8&255]+vt[n>>16&255]+vt[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function zh(i,e){return(i%e+e)%e}function rr(i,e,t){return(1-t)*i+t*e}function jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Je(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class fe{constructor(e=0,t=0){fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,t,n,s,r,a,o,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],p=n[5],g=n[8],v=s[0],m=s[3],u=s[6],b=s[1],E=s[4],M=s[7],N=s[2],T=s[5],A=s[8];return r[0]=a*v+o*b+l*N,r[3]=a*m+o*E+l*T,r[6]=a*u+o*M+l*A,r[1]=c*v+h*b+d*N,r[4]=c*m+h*E+d*T,r[7]=c*u+h*M+d*A,r[2]=f*v+p*b+g*N,r[5]=f*m+p*E+g*T,r[8]=f*u+p*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,f=o*l-h*r,p=c*r-a*l,g=t*d+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=f*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ar.makeScale(e,t)),this}rotate(e){return this.premultiply(ar.makeRotation(-e)),this}translate(e,t){return this.premultiply(ar.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ar=new Ue;function rc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hh(){const i=es("canvas");return i.style.display="block",i}const _o={};function qi(i){i in _o||(_o[i]=!0,console.warn(i))}function Gh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Vh(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Wh(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:Li,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ke&&(i.r=_n(i.r),i.g=_n(i.g),i.b=_n(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ke&&(i.r=Ei(i.r),i.g=Ei(i.g),i.b=Ei(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Rn?Js:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function _n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ei(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const yo=[.64,.33,.3,.6,.15,.06],xo=[.2126,.7152,.0722],Mo=[.3127,.329],So=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bo=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[Li]:{primaries:yo,whitePoint:Mo,transfer:Js,toXYZ:So,fromXYZ:bo,luminanceCoefficients:xo,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:yo,whitePoint:Mo,transfer:Ke,toXYZ:So,fromXYZ:bo,luminanceCoefficients:xo,outputColorSpaceConfig:{drawingBufferColorSpace:St}}});let Qn;class $h{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qn===void 0&&(Qn=es("canvas")),Qn.width=e.width,Qn.height=e.height;const n=Qn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=_n(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_n(t[n]/255)*255):t[n]=_n(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xh=0;class ac{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(or(s[a].image)):r.push(or(s[a]))}else r=or(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function or(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$h.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qh=0;class yt extends Ii{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,n=$n,s=$n,r=Zt,a=Xn,o=Wt,l=yn,c=yt.DEFAULT_ANISOTROPY,h=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=Ln(),this.name="",this.source=new ac(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ea:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ea:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=Xl;yt.DEFAULT_ANISOTROPY=1;class Qe{constructor(e=0,t=0,n=0,s=1){Qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,M=(p+1)/2,N=(u+1)/2,T=(h+f)/4,A=(d+v)/4,L=(g+m)/4;return E>M&&E>N?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=A/n):M>N?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=L/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=A/r,s=L/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-v)/b,this.z=(f-h)/b,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yh extends Ii{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new yt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ac(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jn extends Yh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class oc extends yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jh extends yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const f=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==f||c!==p||h!==g){let m=1-o;const u=l*f+c*p+h*g+d*v,b=u>=0?1:-1,E=1-u*u;if(E>Number.EPSILON){const N=Math.sqrt(E),T=Math.atan2(N,u*b);m=Math.sin(m*T)/N,o=Math.sin(o*T)/N}const M=o*b;if(l=l*m+f*M,c=c*m+p*M,h=h*m+g*M,d=d*m+v*M,m===1-o){const N=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=N,c*=N,h*=N,d*=N}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*p-c*f,e[t+1]=l*g+h*f+c*d-o*p,e[t+2]=c*g+h*p+o*f-l*d,e[t+3]=h*g-o*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),f=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"YXZ":this._x=f*h*d+c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"ZXY":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d-f*p*g;break;case"ZYX":this._x=f*h*d-c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d+f*p*g;break;case"YZX":this._x=f*h*d+c*p*g,this._y=c*p*d+f*h*g,this._z=c*h*g-f*p*d,this._w=c*h*d-f*p*g;break;case"XZY":this._x=f*h*d-c*p*g,this._y=c*p*d-f*h*g,this._z=c*h*g+f*p*d,this._w=c*h*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Eo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Eo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lr.copy(this).projectOnVector(e),this.sub(lr)}reflect(e){return this.sub(lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lr=new C,Eo=new ns;class is{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ht):Ht.fromBufferAttribute(r,a),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ls.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ls.copy(n.boundingBox)),ls.applyMatrix4(e.matrixWorld),this.union(ls)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fi),cs.subVectors(this.max,Fi),ei.subVectors(e.a,Fi),ti.subVectors(e.b,Fi),ni.subVectors(e.c,Fi),Sn.subVectors(ti,ei),bn.subVectors(ni,ti),Nn.subVectors(ei,ni);let t=[0,-Sn.z,Sn.y,0,-bn.z,bn.y,0,-Nn.z,Nn.y,Sn.z,0,-Sn.x,bn.z,0,-bn.x,Nn.z,0,-Nn.x,-Sn.y,Sn.x,0,-bn.y,bn.x,0,-Nn.y,Nn.x,0];return!cr(t,ei,ti,ni,cs)||(t=[1,0,0,0,1,0,0,0,1],!cr(t,ei,ti,ni,cs))?!1:(hs.crossVectors(Sn,bn),t=[hs.x,hs.y,hs.z],cr(t,ei,ti,ni,cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const rn=[new C,new C,new C,new C,new C,new C,new C,new C],Ht=new C,ls=new is,ei=new C,ti=new C,ni=new C,Sn=new C,bn=new C,Nn=new C,Fi=new C,cs=new C,hs=new C,kn=new C;function cr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){kn.fromArray(i,r);const o=s.x*Math.abs(kn.x)+s.y*Math.abs(kn.y)+s.z*Math.abs(kn.z),l=e.dot(kn),c=t.dot(kn),h=n.dot(kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Kh=new is,Oi=new C,hr=new C;class $a{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Kh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oi.subVectors(e,this.center);const t=Oi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Oi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oi.copy(e.center).add(hr)),this.expandByPoint(Oi.copy(e.center).sub(hr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new C,dr=new C,ds=new C,En=new C,ur=new C,us=new C,fr=new C;class Zh{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,an)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=an.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(an.copy(this.origin).addScaledVector(this.direction,t),an.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){dr.copy(e).add(t).multiplyScalar(.5),ds.copy(t).sub(e).normalize(),En.copy(this.origin).sub(dr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ds),o=En.dot(this.direction),l=-En.dot(ds),c=En.lengthSq(),h=Math.abs(1-a*a);let d,f,p,g;if(h>0)if(d=a*l-o,f=a*o-l,g=r*h,d>=0)if(f>=-g)if(f<=g){const v=1/h;d*=v,f*=v,p=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(dr).addScaledVector(ds,f),p}intersectSphere(e,t){an.subVectors(e.center,this.origin);const n=an.dot(this.direction),s=an.dot(an)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,an)!==null}intersectTriangle(e,t,n,s,r){ur.subVectors(t,e),us.subVectors(n,e),fr.crossVectors(ur,us);let a=this.direction.dot(fr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;En.subVectors(this.origin,e);const l=o*this.direction.dot(us.crossVectors(En,us));if(l<0)return null;const c=o*this.direction.dot(ur.cross(En));if(c<0||l+c>a)return null;const h=-o*En.dot(fr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,s,r,a,o,l,c,h,d,f,p,g,v,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,f,p,g,v,m)}set(e,t,n,s,r,a,o,l,c,h,d,f,p,g,v,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=p,u[7]=g,u[11]=v,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/ii.setFromMatrixColumn(e,0).length(),r=1/ii.setFromMatrixColumn(e,1).length(),a=1/ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=a*h,p=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,p=l*d,g=c*h,v=c*d;t[0]=f+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,p=l*d,g=c*h,v=c*d;t[0]=f-v*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,p=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-p,t[8]=f*c+v,t[1]=l*d,t[5]=v*c+f,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-f*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+g,t[10]=f-v*d}else if(e.order==="XZY"){const f=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+v,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jh,e,Qh)}lookAt(e,t,n){const s=this.elements;return At.subVectors(e,t),At.lengthSq()===0&&(At.z=1),At.normalize(),wn.crossVectors(n,At),wn.lengthSq()===0&&(Math.abs(n.z)===1?At.x+=1e-4:At.z+=1e-4,At.normalize(),wn.crossVectors(n,At)),wn.normalize(),fs.crossVectors(At,wn),s[0]=wn.x,s[4]=fs.x,s[8]=At.x,s[1]=wn.y,s[5]=fs.y,s[9]=At.y,s[2]=wn.z,s[6]=fs.z,s[10]=At.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],u=n[14],b=n[3],E=n[7],M=n[11],N=n[15],T=s[0],A=s[4],L=s[8],S=s[12],x=s[1],R=s[5],z=s[9],F=s[13],W=s[2],q=s[6],H=s[10],J=s[14],G=s[3],se=s[7],re=s[11],Ee=s[15];return r[0]=a*T+o*x+l*W+c*G,r[4]=a*A+o*R+l*q+c*se,r[8]=a*L+o*z+l*H+c*re,r[12]=a*S+o*F+l*J+c*Ee,r[1]=h*T+d*x+f*W+p*G,r[5]=h*A+d*R+f*q+p*se,r[9]=h*L+d*z+f*H+p*re,r[13]=h*S+d*F+f*J+p*Ee,r[2]=g*T+v*x+m*W+u*G,r[6]=g*A+v*R+m*q+u*se,r[10]=g*L+v*z+m*H+u*re,r[14]=g*S+v*F+m*J+u*Ee,r[3]=b*T+E*x+M*W+N*G,r[7]=b*A+E*R+M*q+N*se,r[11]=b*L+E*z+M*H+N*re,r[15]=b*S+E*F+M*J+N*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],p=e[14],g=e[3],v=e[7],m=e[11],u=e[15];return g*(+r*l*d-s*c*d-r*o*f+n*c*f+s*o*p-n*l*p)+v*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*h-r*l*h)+m*(+t*c*d-t*o*p-r*a*d+n*a*p+r*o*h-n*c*h)+u*(-s*o*h-t*l*d+t*o*f+s*a*d-n*a*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],p=e[11],g=e[12],v=e[13],m=e[14],u=e[15],b=d*m*c-v*f*c+v*l*p-o*m*p-d*l*u+o*f*u,E=g*f*c-h*m*c-g*l*p+a*m*p+h*l*u-a*f*u,M=h*v*c-g*d*c+g*o*p-a*v*p-h*o*u+a*d*u,N=g*d*l-h*v*l-g*o*f+a*v*f+h*o*m-a*d*m,T=t*b+n*E+s*M+r*N;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=b*A,e[1]=(v*f*r-d*m*r-v*s*p+n*m*p+d*s*u-n*f*u)*A,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*u+n*l*u)*A,e[3]=(d*l*r-o*f*r-d*s*c+n*f*c+o*s*p-n*l*p)*A,e[4]=E*A,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*u+t*f*u)*A,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*u-t*l*u)*A,e[7]=(a*f*r-h*l*r+h*s*c-t*f*c-a*s*p+t*l*p)*A,e[8]=M*A,e[9]=(g*d*r-h*v*r-g*n*p+t*v*p+h*n*u-t*d*u)*A,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*u+t*o*u)*A,e[11]=(h*o*r-a*d*r-h*n*c+t*d*c+a*n*p-t*o*p)*A,e[12]=N*A,e[13]=(h*v*s-g*d*s+g*n*f-t*v*f-h*n*m+t*d*m)*A,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*A,e[15]=(a*d*s-h*o*s+h*n*l-t*d*l-a*n*f+t*o*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,f=r*c,p=r*h,g=r*d,v=a*h,m=a*d,u=o*d,b=l*c,E=l*h,M=l*d,N=n.x,T=n.y,A=n.z;return s[0]=(1-(v+u))*N,s[1]=(p+M)*N,s[2]=(g-E)*N,s[3]=0,s[4]=(p-M)*T,s[5]=(1-(f+u))*T,s[6]=(m+b)*T,s[7]=0,s[8]=(g+E)*A,s[9]=(m-b)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=ii.set(s[0],s[1],s[2]).length();const a=ii.set(s[4],s[5],s[6]).length(),o=ii.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Gt.copy(this);const c=1/r,h=1/a,d=1/o;return Gt.elements[0]*=c,Gt.elements[1]*=c,Gt.elements[2]*=c,Gt.elements[4]*=h,Gt.elements[5]*=h,Gt.elements[6]*=h,Gt.elements[8]*=d,Gt.elements[9]*=d,Gt.elements[10]*=d,t.setFromRotationMatrix(Gt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=gn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let p,g;if(o===gn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Xs)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=gn){const l=this.elements,c=1/(t-e),h=1/(n-s),d=1/(a-r),f=(t+e)*c,p=(n+s)*h;let g,v;if(o===gn)g=(a+r)*d,v=-2*d;else if(o===Xs)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ii=new C,Gt=new at,Jh=new C(0,0,0),Qh=new C(1,1,1),wn=new C,fs=new C,At=new C,wo=new at,To=new ns;class Qt{constructor(e=0,t=0,n=0,s=Qt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(mt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return To.setFromEuler(this),this.setFromQuaternion(To,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qt.DEFAULT_ORDER="XYZ";class lc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ed=0;const Ao=new C,si=new ns,on=new at,ps=new C,Bi=new C,td=new C,nd=new ns,Ro=new C(1,0,0),Co=new C(0,1,0),Po=new C(0,0,1),Lo={type:"added"},id={type:"removed"},ri={type:"childadded",child:null},pr={type:"childremoved",child:null};class pt extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new C,t=new Qt,n=new ns,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new at},normalMatrix:{value:new Ue}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return si.setFromAxisAngle(e,t),this.quaternion.multiply(si),this}rotateOnWorldAxis(e,t){return si.setFromAxisAngle(e,t),this.quaternion.premultiply(si),this}rotateX(e){return this.rotateOnAxis(Ro,e)}rotateY(e){return this.rotateOnAxis(Co,e)}rotateZ(e){return this.rotateOnAxis(Po,e)}translateOnAxis(e,t){return Ao.copy(e).applyQuaternion(this.quaternion),this.position.add(Ao.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ro,e)}translateY(e){return this.translateOnAxis(Co,e)}translateZ(e){return this.translateOnAxis(Po,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(on.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ps.copy(e):ps.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?on.lookAt(Bi,ps,this.up):on.lookAt(ps,Bi,this.up),this.quaternion.setFromRotationMatrix(on),s&&(on.extractRotation(s.matrixWorld),si.setFromRotationMatrix(on),this.quaternion.premultiply(si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lo),ri.child=e,this.dispatchEvent(ri),ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(id),pr.child=e,this.dispatchEvent(pr),pr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),on.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),on.multiply(e.parent.matrixWorld)),e.applyMatrix4(on),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lo),ri.child=e,this.dispatchEvent(ri),ri.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,e,td),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,nd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}pt.DEFAULT_UP=new C(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vt=new C,ln=new C,mr=new C,cn=new C,ai=new C,oi=new C,Io=new C,gr=new C,vr=new C,_r=new C,yr=new Qe,xr=new Qe,Mr=new Qe;class Ot{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Vt.subVectors(e,t),s.cross(Vt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Vt.subVectors(s,t),ln.subVectors(n,t),mr.subVectors(e,t);const a=Vt.dot(Vt),o=Vt.dot(ln),l=Vt.dot(mr),c=ln.dot(ln),h=ln.dot(mr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,cn)===null?!1:cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,cn.x),l.addScaledVector(a,cn.y),l.addScaledVector(o,cn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return yr.setScalar(0),xr.setScalar(0),Mr.setScalar(0),yr.fromBufferAttribute(e,t),xr.fromBufferAttribute(e,n),Mr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(yr,r.x),a.addScaledVector(xr,r.y),a.addScaledVector(Mr,r.z),a}static isFrontFacing(e,t,n,s){return Vt.subVectors(n,t),ln.subVectors(e,t),Vt.cross(ln).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vt.subVectors(this.c,this.b),ln.subVectors(this.a,this.b),Vt.cross(ln).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ot.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ot.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Ot.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Ot.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ot.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ai.subVectors(s,n),oi.subVectors(r,n),gr.subVectors(e,n);const l=ai.dot(gr),c=oi.dot(gr);if(l<=0&&c<=0)return t.copy(n);vr.subVectors(e,s);const h=ai.dot(vr),d=oi.dot(vr);if(h>=0&&d<=h)return t.copy(s);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ai,a);_r.subVectors(e,r);const p=ai.dot(_r),g=oi.dot(_r);if(g>=0&&p<=g)return t.copy(r);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(oi,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Io.subVectors(r,s),o=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(Io,o);const u=1/(m+v+f);return a=v*u,o=f*u,t.copy(n).addScaledVector(ai,a).addScaledVector(oi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const cc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tn={h:0,s:0,l:0},ms={h:0,s:0,l:0};function Sr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=$e.workingColorSpace){if(e=zh(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Sr(a,r,e+1/3),this.g=Sr(a,r,e),this.b=Sr(a,r,e-1/3)}return $e.toWorkingColorSpace(this,s),this}setStyle(e,t=St){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){const n=cc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_n(e.r),this.g=_n(e.g),this.b=_n(e.b),this}copyLinearToSRGB(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return $e.fromWorkingColorSpace(_t.copy(this),e),Math.round(mt(_t.r*255,0,255))*65536+Math.round(mt(_t.g*255,0,255))*256+Math.round(mt(_t.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(_t.copy(this),t);const n=_t.r,s=_t.g,r=_t.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(_t.copy(this),t),e.r=_t.r,e.g=_t.g,e.b=_t.b,e}getStyle(e=St){$e.fromWorkingColorSpace(_t.copy(this),e);const t=_t.r,n=_t.g,s=_t.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Tn),this.setHSL(Tn.h+e,Tn.s+t,Tn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Tn),e.getHSL(ms);const n=rr(Tn.h,ms.h,t),s=rr(Tn.s,ms.s,t),r=rr(Tn.l,ms.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _t=new Be;Be.NAMES=cc;let sd=0;class Di extends Ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=Ln(),this.name="",this.blending=Si,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vr,this.blendDst=Wr,this.blendEquation=Vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=go,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jn,this.stencilZFail=Jn,this.stencilZPass=Jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Si&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vr&&(n.blendSrc=this.blendSrc),this.blendDst!==Wr&&(n.blendDst=this.blendDst),this.blendEquation!==Vn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==go&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Jn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Jn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Jn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class hc extends Di{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=$l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new C,gs=new fe;class $t{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ra,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)gs.fromBufferAttribute(this,t),gs.applyMatrix3(e),this.setXY(t,gs.x,gs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=jt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=jt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=jt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=jt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array),r=Je(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ra&&(e.usage=this.usage),e}}class dc extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class uc extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class It extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}}let rd=0;const Nt=new at,br=new pt,li=new C,Rt=new is,zi=new is,ft=new C;class en extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rc(e)?uc:dc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nt.makeRotationFromQuaternion(e),this.applyMatrix4(Nt),this}rotateX(e){return Nt.makeRotationX(e),this.applyMatrix4(Nt),this}rotateY(e){return Nt.makeRotationY(e),this.applyMatrix4(Nt),this}rotateZ(e){return Nt.makeRotationZ(e),this.applyMatrix4(Nt),this}translate(e,t,n){return Nt.makeTranslation(e,t,n),this.applyMatrix4(Nt),this}scale(e,t,n){return Nt.makeScale(e,t,n),this.applyMatrix4(Nt),this}lookAt(e){return br.lookAt(e),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new It(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Rt.setFromBufferAttribute(r),this.morphTargetsRelative?(ft.addVectors(this.boundingBox.min,Rt.min),this.boundingBox.expandByPoint(ft),ft.addVectors(this.boundingBox.max,Rt.max),this.boundingBox.expandByPoint(ft)):(this.boundingBox.expandByPoint(Rt.min),this.boundingBox.expandByPoint(Rt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $a);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Rt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];zi.setFromBufferAttribute(o),this.morphTargetsRelative?(ft.addVectors(Rt.min,zi.min),Rt.expandByPoint(ft),ft.addVectors(Rt.max,zi.max),Rt.expandByPoint(ft)):(Rt.expandByPoint(zi.min),Rt.expandByPoint(zi.max))}Rt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(ft));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ft.fromBufferAttribute(o,c),l&&(li.fromBufferAttribute(e,c),ft.add(li)),s=Math.max(s,n.distanceToSquared(ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new C,l[L]=new C;const c=new C,h=new C,d=new C,f=new fe,p=new fe,g=new fe,v=new C,m=new C;function u(L,S,x){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,x),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,x),h.sub(c),d.sub(c),p.sub(f),g.sub(f);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(R),o[L].add(v),o[S].add(v),o[x].add(v),l[L].add(m),l[S].add(m),l[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let L=0,S=b.length;L<S;++L){const x=b[L],R=x.start,z=x.count;for(let F=R,W=R+z;F<W;F+=3)u(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const E=new C,M=new C,N=new C,T=new C;function A(L){N.fromBufferAttribute(s,L),T.copy(N);const S=o[L];E.copy(S),E.sub(N.multiplyScalar(N.dot(S))).normalize(),M.crossVectors(T,S);const R=M.dot(l[L])<0?-1:1;a.setXYZW(L,E.x,E.y,E.z,R)}for(let L=0,S=b.length;L<S;++L){const x=b[L],R=x.start,z=x.count;for(let F=R,W=R+z;F<W;F+=3)A(e.getX(F+0)),A(e.getX(F+1)),A(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,d=new C;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ft.fromBufferAttribute(e,t),ft.normalize(),e.setXYZ(t,ft.x,ft.y,ft.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let u=0;u<h;u++)f[g++]=c[p++]}return new $t(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new en,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const f=c[h],p=e(f,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Do=new at,Fn=new Zh,vs=new $a,Uo=new C,_s=new C,ys=new C,xs=new C,Er=new C,Ms=new C,No=new C,Ss=new C;class bt extends pt{constructor(e=new en,t=new hc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ms.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Er.fromBufferAttribute(d,e),a?Ms.addScaledVector(Er,h):Ms.addScaledVector(Er.sub(t),h))}t.add(Ms)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(r),Fn.copy(e.ray).recast(e.near),!(vs.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(vs,Uo)===null||Fn.origin.distanceToSquared(Uo)>(e.far-e.near)**2))&&(Do.copy(r).invert(),Fn.copy(e.ray).applyMatrix4(Do),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],u=a[m.materialIndex],b=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=b,N=E;M<N;M+=3){const T=o.getX(M),A=o.getX(M+1),L=o.getX(M+2);s=bs(this,u,e,n,c,h,d,T,A,L),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){const b=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);s=bs(this,a,e,n,c,h,d,b,E,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],u=a[m.materialIndex],b=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=b,N=E;M<N;M+=3){const T=M,A=M+1,L=M+2;s=bs(this,u,e,n,c,h,d,T,A,L),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,u=v;m<u;m+=3){const b=m,E=m+1,M=m+2;s=bs(this,a,e,n,c,h,d,b,E,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function ad(i,e,t,n,s,r,a,o){let l;if(e.side===wt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===In,o),l===null)return null;Ss.copy(o),Ss.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ss);return c<t.near||c>t.far?null:{distance:c,point:Ss.clone(),object:i}}function bs(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,_s),i.getVertexPosition(l,ys),i.getVertexPosition(c,xs);const h=ad(i,e,t,n,_s,ys,xs,No);if(h){const d=new C;Ot.getBarycoord(No,_s,ys,xs,d),s&&(h.uv=Ot.getInterpolatedAttribute(s,o,l,c,d,new fe)),r&&(h.uv1=Ot.getInterpolatedAttribute(r,o,l,c,d,new fe)),a&&(h.normal=Ot.getInterpolatedAttribute(a,o,l,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new C,materialIndex:0};Ot.getNormal(_s,ys,xs,f.normal),h.face=f,h.barycoord=d}return h}class Kt extends en{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new It(c,3)),this.setAttribute("normal",new It(h,3)),this.setAttribute("uv",new It(d,2));function g(v,m,u,b,E,M,N,T,A,L,S){const x=M/A,R=N/L,z=M/2,F=N/2,W=T/2,q=A+1,H=L+1;let J=0,G=0;const se=new C;for(let re=0;re<H;re++){const Ee=re*R-F;for(let Fe=0;Fe<q;Fe++){const et=Fe*x-z;se[v]=et*b,se[m]=Ee*E,se[u]=W,c.push(se.x,se.y,se.z),se[v]=0,se[m]=0,se[u]=T>0?1:-1,h.push(se.x,se.y,se.z),d.push(Fe/A),d.push(1-re/L),J+=1}}for(let re=0;re<L;re++)for(let Ee=0;Ee<A;Ee++){const Fe=f+Ee+q*re,et=f+Ee+q*(re+1),X=f+(Ee+1)+q*(re+1),ne=f+(Ee+1)+q*re;l.push(Fe,et,ne),l.push(et,X,ne),G+=6}o.addGroup(p,G,S),p+=G,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Pi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Mt(i){const e={};for(let t=0;t<i.length;t++){const n=Pi(i[t]);for(const s in n)e[s]=n[s]}return e}function od(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function fc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const ld={clone:Pi,merge:Mt};var cd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends Di{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cd,this.fragmentShader=hd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pi(e.uniforms),this.uniformsGroups=od(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class pc extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const An=new C,ko=new fe,Fo=new fe;class Ft extends pc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ca*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ca*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){An.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(An.x,An.y).multiplyScalar(-e/An.z),An.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(An.x,An.y).multiplyScalar(-e/An.z)}getViewSize(e,t){return this.getViewBounds(e,ko,Fo),t.subVectors(Fo,ko)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(sr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ci=-90,hi=1;class dd extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ft(ci,hi,e,t);s.layers=this.layers,this.add(s);const r=new Ft(ci,hi,e,t);r.layers=this.layers,this.add(r);const a=new Ft(ci,hi,e,t);a.layers=this.layers,this.add(a);const o=new Ft(ci,hi,e,t);o.layers=this.layers,this.add(o);const l=new Ft(ci,hi,e,t);l.layers=this.layers,this.add(l);const c=new Ft(ci,hi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class mc extends yt{constructor(e,t,n,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Ti,super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ud extends jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new mc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Kt(5,5,5),r=new Dn({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wt,blending:Cn});r.uniforms.tEquirect.value=t;const a=new bt(s,r),o=t.minFilter;return t.minFilter===Xn&&(t.minFilter=Zt),new dd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const wr=new C,fd=new C,pd=new Ue;class Hn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=wr.subVectors(n,t).cross(fd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(wr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||pd.getNormalMatrix(e),s=this.coplanarPoint(wr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const On=new $a,Es=new C;class Xa{constructor(e=new Hn,t=new Hn,n=new Hn,s=new Hn,r=new Hn,a=new Hn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],f=s[7],p=s[8],g=s[9],v=s[10],m=s[11],u=s[12],b=s[13],E=s[14],M=s[15];if(n[0].setComponents(l-r,f-c,m-p,M-u).normalize(),n[1].setComponents(l+r,f+c,m+p,M+u).normalize(),n[2].setComponents(l+a,f+h,m+g,M+b).normalize(),n[3].setComponents(l-a,f-h,m-g,M-b).normalize(),n[4].setComponents(l-o,f-d,m-v,M-E).normalize(),t===gn)n[5].setComponents(l+o,f+d,m+v,M+E).normalize();else if(t===Xs)n[5].setComponents(o,d,v,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Es.x=s.normal.x>0?e.max.x:e.min.x,Es.y=s.normal.y>0?e.max.y:e.min.y,Es.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gc(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function md(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){const g=d[f],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,d[f]=v)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){const v=d[p];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Qs extends en{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,f=t/l,p=[],g=[],v=[],m=[];for(let u=0;u<h;u++){const b=u*f-a;for(let E=0;E<c;E++){const M=E*d-r;g.push(M,-b,0),v.push(0,0,1),m.push(E/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let b=0;b<o;b++){const E=b+c*u,M=b+c*(u+1),N=b+1+c*(u+1),T=b+1+c*u;p.push(E,M,T),p.push(M,N,T)}this.setIndex(p),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(v,3)),this.setAttribute("uv",new It(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.width,e.height,e.widthSegments,e.heightSegments)}}var gd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vd=`#ifdef USE_ALPHAHASH
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
#endif`,_d=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Md=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sd=`#ifdef USE_AOMAP
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
#endif`,bd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ed=`#ifdef USE_BATCHING
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
#endif`,wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ad=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cd=`#ifdef USE_IRIDESCENCE
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
#endif`,Pd=`#ifdef USE_BUMPMAP
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
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Od=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Bd=`#define PI 3.141592653589793
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
} // validated`,zd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hd=`vec3 transformedNormal = objectNormal;
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
#endif`,Gd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xd="gl_FragColor = linearToOutputTexel( gl_FragColor );",qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yd=`#ifdef USE_ENVMAP
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
#endif`,jd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kd=`#ifdef USE_ENVMAP
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
#endif`,Zd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jd=`#ifdef USE_ENVMAP
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
#endif`,Qd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,eu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iu=`#ifdef USE_GRADIENTMAP
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
}`,su=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ru=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,au=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ou=`uniform bool receiveShadow;
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
#endif`,lu=`#ifdef USE_ENVMAP
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
#endif`,cu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,du=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fu=`PhysicalMaterial material;
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
#endif`,pu=`struct PhysicalMaterial {
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
}`,mu=`
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
#endif`,gu=`#if defined( RE_IndirectDiffuse )
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
#endif`,vu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_u=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Su=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Eu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wu=`#if defined( USE_POINTS_UV )
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
#endif`,Tu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Au=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ru=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lu=`#ifdef USE_MORPHTARGETS
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
#endif`,Iu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Du=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Uu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ku=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ou=`#ifdef USE_NORMALMAP
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
#endif`,Bu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$u=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ju=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ku=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ju=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ef=`float getShadowMask() {
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
}`,tf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nf=`#ifdef USE_SKINNING
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
#endif`,sf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rf=`#ifdef USE_SKINNING
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
#endif`,af=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,of=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hf=`#ifdef USE_TRANSMISSION
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
#endif`,df=`#ifdef USE_TRANSMISSION
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
#endif`,uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vf=`uniform sampler2D t2D;
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
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sf=`#include <common>
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
}`,bf=`#if DEPTH_PACKING == 3200
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
}`,Ef=`#define DISTANCE
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
}`,wf=`#define DISTANCE
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
}`,Tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Af=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`uniform float scale;
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
}`,Cf=`uniform vec3 diffuse;
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
}`,Pf=`#include <common>
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
}`,Lf=`uniform vec3 diffuse;
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
}`,If=`#define LAMBERT
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
}`,Df=`#define LAMBERT
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
}`,Uf=`#define MATCAP
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
}`,Nf=`#define MATCAP
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
}`,kf=`#define NORMAL
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
}`,Ff=`#define NORMAL
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
}`,Of=`#define PHONG
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
}`,Bf=`#define PHONG
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
}`,zf=`#define STANDARD
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
}`,Hf=`#define STANDARD
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
}`,Gf=`#define TOON
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
}`,Vf=`#define TOON
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
}`,Wf=`uniform float size;
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
}`,$f=`uniform vec3 diffuse;
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
}`,Xf=`#include <common>
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
}`,qf=`uniform vec3 color;
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
}`,Yf=`uniform float rotation;
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
}`,jf=`uniform vec3 diffuse;
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
}`,ke={alphahash_fragment:gd,alphahash_pars_fragment:vd,alphamap_fragment:_d,alphamap_pars_fragment:yd,alphatest_fragment:xd,alphatest_pars_fragment:Md,aomap_fragment:Sd,aomap_pars_fragment:bd,batching_pars_vertex:Ed,batching_vertex:wd,begin_vertex:Td,beginnormal_vertex:Ad,bsdfs:Rd,iridescence_fragment:Cd,bumpmap_pars_fragment:Pd,clipping_planes_fragment:Ld,clipping_planes_pars_fragment:Id,clipping_planes_pars_vertex:Dd,clipping_planes_vertex:Ud,color_fragment:Nd,color_pars_fragment:kd,color_pars_vertex:Fd,color_vertex:Od,common:Bd,cube_uv_reflection_fragment:zd,defaultnormal_vertex:Hd,displacementmap_pars_vertex:Gd,displacementmap_vertex:Vd,emissivemap_fragment:Wd,emissivemap_pars_fragment:$d,colorspace_fragment:Xd,colorspace_pars_fragment:qd,envmap_fragment:Yd,envmap_common_pars_fragment:jd,envmap_pars_fragment:Kd,envmap_pars_vertex:Zd,envmap_physical_pars_fragment:lu,envmap_vertex:Jd,fog_vertex:Qd,fog_pars_vertex:eu,fog_fragment:tu,fog_pars_fragment:nu,gradientmap_pars_fragment:iu,lightmap_pars_fragment:su,lights_lambert_fragment:ru,lights_lambert_pars_fragment:au,lights_pars_begin:ou,lights_toon_fragment:cu,lights_toon_pars_fragment:hu,lights_phong_fragment:du,lights_phong_pars_fragment:uu,lights_physical_fragment:fu,lights_physical_pars_fragment:pu,lights_fragment_begin:mu,lights_fragment_maps:gu,lights_fragment_end:vu,logdepthbuf_fragment:_u,logdepthbuf_pars_fragment:yu,logdepthbuf_pars_vertex:xu,logdepthbuf_vertex:Mu,map_fragment:Su,map_pars_fragment:bu,map_particle_fragment:Eu,map_particle_pars_fragment:wu,metalnessmap_fragment:Tu,metalnessmap_pars_fragment:Au,morphinstance_vertex:Ru,morphcolor_vertex:Cu,morphnormal_vertex:Pu,morphtarget_pars_vertex:Lu,morphtarget_vertex:Iu,normal_fragment_begin:Du,normal_fragment_maps:Uu,normal_pars_fragment:Nu,normal_pars_vertex:ku,normal_vertex:Fu,normalmap_pars_fragment:Ou,clearcoat_normal_fragment_begin:Bu,clearcoat_normal_fragment_maps:zu,clearcoat_pars_fragment:Hu,iridescence_pars_fragment:Gu,opaque_fragment:Vu,packing:Wu,premultiplied_alpha_fragment:$u,project_vertex:Xu,dithering_fragment:qu,dithering_pars_fragment:Yu,roughnessmap_fragment:ju,roughnessmap_pars_fragment:Ku,shadowmap_pars_fragment:Zu,shadowmap_pars_vertex:Ju,shadowmap_vertex:Qu,shadowmask_pars_fragment:ef,skinbase_vertex:tf,skinning_pars_vertex:nf,skinning_vertex:sf,skinnormal_vertex:rf,specularmap_fragment:af,specularmap_pars_fragment:of,tonemapping_fragment:lf,tonemapping_pars_fragment:cf,transmission_fragment:hf,transmission_pars_fragment:df,uv_pars_fragment:uf,uv_pars_vertex:ff,uv_vertex:pf,worldpos_vertex:mf,background_vert:gf,background_frag:vf,backgroundCube_vert:_f,backgroundCube_frag:yf,cube_vert:xf,cube_frag:Mf,depth_vert:Sf,depth_frag:bf,distanceRGBA_vert:Ef,distanceRGBA_frag:wf,equirect_vert:Tf,equirect_frag:Af,linedashed_vert:Rf,linedashed_frag:Cf,meshbasic_vert:Pf,meshbasic_frag:Lf,meshlambert_vert:If,meshlambert_frag:Df,meshmatcap_vert:Uf,meshmatcap_frag:Nf,meshnormal_vert:kf,meshnormal_frag:Ff,meshphong_vert:Of,meshphong_frag:Bf,meshphysical_vert:zf,meshphysical_frag:Hf,meshtoon_vert:Gf,meshtoon_frag:Vf,points_vert:Wf,points_frag:$f,shadow_vert:Xf,shadow_frag:qf,sprite_vert:Yf,sprite_frag:jf},ie={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},qt={basic:{uniforms:Mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Be(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Mt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Mt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Be(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Mt([ie.points,ie.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Mt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Mt([ie.common,ie.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Mt([ie.sprite,ie.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Mt([ie.common,ie.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Mt([ie.lights,ie.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};qt.physical={uniforms:Mt([qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const ws={r:0,b:0,g:0},Bn=new Qt,Kf=new at;function Zf(i,e,t,n,s,r,a){const o=new Be(0);let l=r===!0?0:1,c,h,d=null,f=0,p=null;function g(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?t:e).get(E)),E}function v(b){let E=!1;const M=g(b);M===null?u(o,l):M&&M.isColor&&(u(M,1),E=!0);const N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,a):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,E){const M=g(E);M&&(M.isCubeTexture||M.mapping===Zs)?(h===void 0&&(h=new bt(new Kt(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:Pi(qt.backgroundCube.uniforms),vertexShader:qt.backgroundCube.vertexShader,fragmentShader:qt.backgroundCube.fragmentShader,side:wt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(N,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Bn.copy(E.backgroundRotation),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Kf.makeRotationFromEuler(Bn)),h.material.toneMapped=$e.getTransfer(M.colorSpace)!==Ke,(d!==M||f!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=M,f=M.version,p=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new bt(new Qs(2,2),new Dn({name:"BackgroundMaterial",uniforms:Pi(qt.background.uniforms),vertexShader:qt.background.vertexShader,fragmentShader:qt.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=$e.getTransfer(M.colorSpace)!==Ke,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,p=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function u(b,E){b.getRGB(ws,fc(i)),n.buffers.color.setClear(ws.r,ws.g,ws.b,E,a)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),l=E,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,u(o,l)},render:v,addToRenderList:m}}function Jf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(x,R,z,F,W){let q=!1;const H=d(F,z,R);r!==H&&(r=H,c(r.object)),q=p(x,F,z,W),q&&g(x,F,z,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,M(x,R,z,F),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function d(x,R,z){const F=z.wireframe===!0;let W=n[x.id];W===void 0&&(W={},n[x.id]=W);let q=W[R.id];q===void 0&&(q={},W[R.id]=q);let H=q[F];return H===void 0&&(H=f(l()),q[F]=H),H}function f(x){const R=[],z=[],F=[];for(let W=0;W<t;W++)R[W]=0,z[W]=0,F[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:z,attributeDivisors:F,object:x,attributes:{},index:null}}function p(x,R,z,F){const W=r.attributes,q=R.attributes;let H=0;const J=z.getAttributes();for(const G in J)if(J[G].location>=0){const re=W[G];let Ee=q[G];if(Ee===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(Ee=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(Ee=x.instanceColor)),re===void 0||re.attribute!==Ee||Ee&&re.data!==Ee.data)return!0;H++}return r.attributesNum!==H||r.index!==F}function g(x,R,z,F){const W={},q=R.attributes;let H=0;const J=z.getAttributes();for(const G in J)if(J[G].location>=0){let re=q[G];re===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(re=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(re=x.instanceColor));const Ee={};Ee.attribute=re,re&&re.data&&(Ee.data=re.data),W[G]=Ee,H++}r.attributes=W,r.attributesNum=H,r.index=F}function v(){const x=r.newAttributes;for(let R=0,z=x.length;R<z;R++)x[R]=0}function m(x){u(x,0)}function u(x,R){const z=r.newAttributes,F=r.enabledAttributes,W=r.attributeDivisors;z[x]=1,F[x]===0&&(i.enableVertexAttribArray(x),F[x]=1),W[x]!==R&&(i.vertexAttribDivisor(x,R),W[x]=R)}function b(){const x=r.newAttributes,R=r.enabledAttributes;for(let z=0,F=R.length;z<F;z++)R[z]!==x[z]&&(i.disableVertexAttribArray(z),R[z]=0)}function E(x,R,z,F,W,q,H){H===!0?i.vertexAttribIPointer(x,R,z,W,q):i.vertexAttribPointer(x,R,z,F,W,q)}function M(x,R,z,F){v();const W=F.attributes,q=z.getAttributes(),H=R.defaultAttributeValues;for(const J in q){const G=q[J];if(G.location>=0){let se=W[J];if(se===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(se=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(se=x.instanceColor)),se!==void 0){const re=se.normalized,Ee=se.itemSize,Fe=e.get(se);if(Fe===void 0)continue;const et=Fe.buffer,X=Fe.type,ne=Fe.bytesPerElement,Me=X===i.INT||X===i.UNSIGNED_INT||se.gpuType===Ba;if(se.isInterleavedBufferAttribute){const oe=se.data,Re=oe.stride,Le=se.offset;if(oe.isInstancedInterleavedBuffer){for(let Oe=0;Oe<G.locationSize;Oe++)u(G.location+Oe,oe.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Oe=0;Oe<G.locationSize;Oe++)m(G.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Oe=0;Oe<G.locationSize;Oe++)E(G.location+Oe,Ee/G.locationSize,X,re,Re*ne,(Le+Ee/G.locationSize*Oe)*ne,Me)}else{if(se.isInstancedBufferAttribute){for(let oe=0;oe<G.locationSize;oe++)u(G.location+oe,se.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let oe=0;oe<G.locationSize;oe++)m(G.location+oe);i.bindBuffer(i.ARRAY_BUFFER,et);for(let oe=0;oe<G.locationSize;oe++)E(G.location+oe,Ee/G.locationSize,X,re,Ee*ne,Ee/G.locationSize*oe*ne,Me)}}else if(H!==void 0){const re=H[J];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(G.location,re);break;case 3:i.vertexAttrib3fv(G.location,re);break;case 4:i.vertexAttrib4fv(G.location,re);break;default:i.vertexAttrib1fv(G.location,re)}}}}b()}function N(){L();for(const x in n){const R=n[x];for(const z in R){const F=R[z];for(const W in F)h(F[W].object),delete F[W];delete R[z]}delete n[x]}}function T(x){if(n[x.id]===void 0)return;const R=n[x.id];for(const z in R){const F=R[z];for(const W in F)h(F[W].object),delete F[W];delete R[z]}delete n[x.id]}function A(x){for(const R in n){const z=n[R];if(z[x.id]===void 0)continue;const F=z[x.id];for(const W in F)h(F[W].object),delete F[W];delete z[x.id]}}function L(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:N,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function Qf(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];t.update(p,n,1)}function l(c,h,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*f[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function ep(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Wt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const L=A===ts&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==yn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mn&&!L)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:N,maxSamples:T}}function tp(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Hn,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||n!==0||s;return s=f,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,E=b*4;let M=u.clippingState||null;l.value=M,M=h(g,f,E,p);for(let N=0;N!==E;++N)M[N]=t[N];u.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,p,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const u=p+v*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<u)&&(m=new Float32Array(u));for(let E=0,M=p;E!==v;++E,M+=4)a.copy(d[E]).applyMatrix4(b,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function np(i){let e=new WeakMap;function t(a,o){return o===Jr?a.mapping=Ti:o===Qr&&(a.mapping=Ai),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Jr||o===Qr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ud(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class qa extends pc{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const yi=4,Oo=[.125,.215,.35,.446,.526,.582],Wn=20,Tr=new qa,Bo=new Be;let Ar=null,Rr=0,Cr=0,Pr=!1;const Gn=(1+Math.sqrt(5))/2,di=1/Gn,zo=[new C(-Gn,di,0),new C(Gn,di,0),new C(-di,0,Gn),new C(di,0,Gn),new C(0,Gn,-di),new C(0,Gn,di),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Ho{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ar=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ar,Rr,Cr),this._renderer.xr.enabled=Pr,e.scissorTest=!1,Ts(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===Ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ar=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:ts,format:Wt,colorSpace:Li,depthBuffer:!1},s=Go(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Go(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ip(r)),this._blurMaterial=sp(r,e,t)}return s}_compileMaterial(e){const t=new bt(this._lodPlanes[0],e);this._renderer.compile(t,Tr)}_sceneToCubeUV(e,t,n,s){const o=new Ft(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Bo),h.toneMapping=Pn,h.autoClear=!1;const p=new hc({name:"PMREM.Background",side:wt,depthWrite:!1,depthTest:!1}),g=new bt(new Kt,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Bo),v=!0);for(let u=0;u<6;u++){const b=u%3;b===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):b===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const E=this._cubeSize;Ts(s,b*E,u>2?E:0,E,E),h.setRenderTarget(s),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ti||e.mapping===Ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new bt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ts(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Tr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=zo[(s-r-1)%zo.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new bt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Wn-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Wn;m>Wn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wn}`);const u=[];let b=0;for(let A=0;A<Wn;++A){const L=A/v,S=Math.exp(-L*L/2);u.push(S),A===0?b+=S:A<m&&(b+=2*S)}for(let A=0;A<u.length;A++)u[A]=u[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const M=this._sizeLods[s],N=3*M*(s>E-yi?s-E+yi:0),T=4*(this._cubeSize-M);Ts(t,N,T,3*M,2*M),l.setRenderTarget(t),l.render(d,Tr)}}function ip(i){const e=[],t=[],n=[];let s=i;const r=i-yi+1+Oo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-yi?l=Oo[a-i+yi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,v=3,m=2,u=1,b=new Float32Array(v*g*p),E=new Float32Array(m*g*p),M=new Float32Array(u*g*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,L=T>2?0:-1,S=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];b.set(S,v*g*T),E.set(f,m*g*T);const x=[T,T,T,T,T,T];M.set(x,u*g*T)}const N=new en;N.setAttribute("position",new $t(b,v)),N.setAttribute("uv",new $t(E,m)),N.setAttribute("faceIndex",new $t(M,u)),e.push(N),s>yi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Go(i,e,t){const n=new jn(i,e,t);return n.texture.mapping=Zs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ts(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function sp(i,e,t){const n=new Float32Array(Wn),s=new C(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:Wn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Vo(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Wo(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Ya(){return`

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
	`}function rp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Jr||l===Qr,h=l===Ti||l===Ai;if(c||h){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Ho(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Ho(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ap(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&qi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function op(i,e,t,n){const s={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,u=v.length;m<u;m++)e.remove(v[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const v=p[g];for(let m=0,u=v.length;m<u;m++)e.update(v[m],i.ARRAY_BUFFER)}}function c(d){const f=[],p=d.index,g=d.attributes.position;let v=0;if(p!==null){const b=p.array;v=p.version;for(let E=0,M=b.length;E<M;E+=3){const N=b[E+0],T=b[E+1],A=b[E+2];f.push(N,T,T,A,A,N)}}else if(g!==void 0){const b=g.array;v=g.version;for(let E=0,M=b.length/3-1;E<M;E+=3){const N=E+0,T=E+1,A=E+2;f.push(N,T,T,A,A,N)}}else return;const m=new(rc(f)?uc:dc)(f,1);m.version=v;const u=r.get(d);u&&e.remove(u),r.set(d,m)}function h(d){const f=r.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function lp(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*a),t.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*a,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let u=0;u<g;u++)m+=p[u];t.update(m,n,1)}function d(f,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<f.length;u++)c(f[u]/a,p[u],v[u]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,v,0,g);let u=0;for(let b=0;b<g;b++)u+=p[b]*v[b];t.update(u,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function cp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function hp(i,e,t){const n=new WeakMap,s=new Qe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let S=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let M=o.attributes.position.count*E,N=1;M>e.maxTextureSize&&(N=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const T=new Float32Array(M*N*4*d),A=new oc(T,M,N,d);A.type=mn,A.needsUpdate=!0;const L=E*4;for(let x=0;x<d;x++){const R=m[x],z=u[x],F=b[x],W=M*N*4*x;for(let q=0;q<R.count;q++){const H=q*L;p===!0&&(s.fromBufferAttribute(R,q),T[W+H+0]=s.x,T[W+H+1]=s.y,T[W+H+2]=s.z,T[W+H+3]=0),g===!0&&(s.fromBufferAttribute(z,q),T[W+H+4]=s.x,T[W+H+5]=s.y,T[W+H+6]=s.z,T[W+H+7]=0),v===!0&&(s.fromBufferAttribute(F,q),T[W+H+8]=s.x,T[W+H+9]=s.y,T[W+H+10]=s.z,T[W+H+11]=F.itemSize===4?s.w:1)}}f={count:d,texture:A,size:new fe(M,N)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function dp(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class vc extends yt{constructor(e,t,n,s,r,a,o,l,c,h=bi){if(h!==bi&&h!==Ci)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===bi&&(n=Yn),n===void 0&&h===Ci&&(n=Ri),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Lt,this.minFilter=l!==void 0?l:Lt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const _c=new yt,$o=new vc(1,1),yc=new oc,xc=new jh,Mc=new mc,Xo=[],qo=[],Yo=new Float32Array(16),jo=new Float32Array(9),Ko=new Float32Array(4);function Ui(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Xo[s];if(r===void 0&&(r=new Float32Array(s),Xo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function er(i,e){let t=qo[e];t===void 0&&(t=new Int32Array(e),qo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function up(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2fv(this.addr,e),ut(t,e)}}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dt(t,e))return;i.uniform3fv(this.addr,e),ut(t,e)}}function mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4fv(this.addr,e),ut(t,e)}}function gp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ut(t,e)}else{if(dt(t,n))return;Ko.set(n),i.uniformMatrix2fv(this.addr,!1,Ko),ut(t,n)}}function vp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ut(t,e)}else{if(dt(t,n))return;jo.set(n),i.uniformMatrix3fv(this.addr,!1,jo),ut(t,n)}}function _p(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ut(t,e)}else{if(dt(t,n))return;Yo.set(n),i.uniformMatrix4fv(this.addr,!1,Yo),ut(t,n)}}function yp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2iv(this.addr,e),ut(t,e)}}function Mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3iv(this.addr,e),ut(t,e)}}function Sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4iv(this.addr,e),ut(t,e)}}function bp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2uiv(this.addr,e),ut(t,e)}}function wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3uiv(this.addr,e),ut(t,e)}}function Tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4uiv(this.addr,e),ut(t,e)}}function Ap(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($o.compareFunction=sc,r=$o):r=_c,t.setTexture2D(e||r,s)}function Rp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||xc,s)}function Cp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Mc,s)}function Pp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||yc,s)}function Lp(i){switch(i){case 5126:return up;case 35664:return fp;case 35665:return pp;case 35666:return mp;case 35674:return gp;case 35675:return vp;case 35676:return _p;case 5124:case 35670:return yp;case 35667:case 35671:return xp;case 35668:case 35672:return Mp;case 35669:case 35673:return Sp;case 5125:return bp;case 36294:return Ep;case 36295:return wp;case 36296:return Tp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ap;case 35679:case 36299:case 36307:return Rp;case 35680:case 36300:case 36308:case 36293:return Cp;case 36289:case 36303:case 36311:case 36292:return Pp}}function Ip(i,e){i.uniform1fv(this.addr,e)}function Dp(i,e){const t=Ui(e,this.size,2);i.uniform2fv(this.addr,t)}function Up(i,e){const t=Ui(e,this.size,3);i.uniform3fv(this.addr,t)}function Np(i,e){const t=Ui(e,this.size,4);i.uniform4fv(this.addr,t)}function kp(i,e){const t=Ui(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Fp(i,e){const t=Ui(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Op(i,e){const t=Ui(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Bp(i,e){i.uniform1iv(this.addr,e)}function zp(i,e){i.uniform2iv(this.addr,e)}function Hp(i,e){i.uniform3iv(this.addr,e)}function Gp(i,e){i.uniform4iv(this.addr,e)}function Vp(i,e){i.uniform1uiv(this.addr,e)}function Wp(i,e){i.uniform2uiv(this.addr,e)}function $p(i,e){i.uniform3uiv(this.addr,e)}function Xp(i,e){i.uniform4uiv(this.addr,e)}function qp(i,e,t){const n=this.cache,s=e.length,r=er(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||_c,r[a])}function Yp(i,e,t){const n=this.cache,s=e.length,r=er(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||xc,r[a])}function jp(i,e,t){const n=this.cache,s=e.length,r=er(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Mc,r[a])}function Kp(i,e,t){const n=this.cache,s=e.length,r=er(t,s);dt(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||yc,r[a])}function Zp(i){switch(i){case 5126:return Ip;case 35664:return Dp;case 35665:return Up;case 35666:return Np;case 35674:return kp;case 35675:return Fp;case 35676:return Op;case 5124:case 35670:return Bp;case 35667:case 35671:return zp;case 35668:case 35672:return Hp;case 35669:case 35673:return Gp;case 5125:return Vp;case 36294:return Wp;case 36295:return $p;case 36296:return Xp;case 35678:case 36198:case 36298:case 36306:case 35682:return qp;case 35679:case 36299:case 36307:return Yp;case 35680:case 36300:case 36308:case 36293:return jp;case 36289:case 36303:case 36311:case 36292:return Kp}}class Jp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lp(t.type)}}class Qp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zp(t.type)}}class em{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Lr=/(\w+)(\])?(\[|\.)?/g;function Zo(i,e){i.seq.push(e),i.map[e.id]=e}function tm(i,e,t){const n=i.name,s=n.length;for(Lr.lastIndex=0;;){const r=Lr.exec(n),a=Lr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zo(t,c===void 0?new Jp(o,i,e):new Qp(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new em(o),Zo(t,d)),t=d}}}class Gs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);tm(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Jo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const nm=37297;let im=0;function sm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Qo=new Ue;function rm(i){$e._getMatrix(Qo,$e.workingColorSpace,i);const e=`mat3( ${Qo.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case Js:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function el(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+sm(i.getShaderSource(e),a)}else return s}function am(i,e){const t=rm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function om(i,e){let t;switch(e){case Sh:t="Linear";break;case bh:t="Reinhard";break;case Eh:t="Cineon";break;case wh:t="ACESFilmic";break;case Ah:t="AgX";break;case Rh:t="Neutral";break;case Th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const As=new C;function lm(){$e.getLuminanceCoefficients(As);const i=As.x.toFixed(4),e=As.y.toFixed(4),t=As.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)}function hm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function dm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Yi(i){return i!==""}function tl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const um=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pa(i){return i.replace(um,pm)}const fm=new Map;function pm(i,e){let t=ke[e];if(t===void 0){const n=fm.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Pa(t)}const mm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function il(i){return i.replace(mm,gm)}function gm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function vm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Vl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Wl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===hn&&(e="SHADOWMAP_TYPE_VSM"),e}function _m(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ti:case Ai:e="ENVMAP_TYPE_CUBE";break;case Zs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ym(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ai:e="ENVMAP_MODE_REFRACTION";break}return e}function xm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case $l:e="ENVMAP_BLENDING_MULTIPLY";break;case xh:e="ENVMAP_BLENDING_MIX";break;case Mh:e="ENVMAP_BLENDING_ADD";break}return e}function Mm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Sm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=vm(t),c=_m(t),h=ym(t),d=xm(t),f=Mm(t),p=cm(t),g=hm(r),v=s.createProgram();let m,u,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yi).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yi).join(`
`),u.length>0&&(u+=`
`)):(m=[sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),u=[sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?ke.tonemapping_pars_fragment:"",t.toneMapping!==Pn?om("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,am("linearToOutputTexel",t.outputColorSpace),lm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yi).join(`
`)),a=Pa(a),a=tl(a,t),a=nl(a,t),o=Pa(o),o=tl(o,t),o=nl(o,t),a=il(a),o=il(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===vo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===vo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const E=b+m+a,M=b+u+o,N=Jo(s,s.VERTEX_SHADER,E),T=Jo(s,s.FRAGMENT_SHADER,M);s.attachShader(v,N),s.attachShader(v,T),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(R){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(v).trim(),F=s.getShaderInfoLog(N).trim(),W=s.getShaderInfoLog(T).trim();let q=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,N,T);else{const J=el(s,N,"vertex"),G=el(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+J+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||W==="")&&(H=!1);H&&(R.diagnostics={runnable:q,programLog:z,vertexShader:{log:F,prefix:m},fragmentShader:{log:W,prefix:u}})}s.deleteShader(N),s.deleteShader(T),L=new Gs(s,v),S=dm(s,v)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,nm)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=im++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=N,this.fragmentShader=T,this}let bm=0;class Em{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new wm(e),t.set(e,n)),n}}class wm{constructor(e){this.id=bm++,this.code=e,this.usedTimes=0}}function Tm(i,e,t,n,s,r,a){const o=new lc,l=new Em,c=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,x,R,z,F){const W=z.fog,q=F.geometry,H=S.isMeshStandardMaterial?z.environment:null,J=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),G=J&&J.mapping===Zs?J.image.height:null,se=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const re=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ee=re!==void 0?re.length:0;let Fe=0;q.morphAttributes.position!==void 0&&(Fe=1),q.morphAttributes.normal!==void 0&&(Fe=2),q.morphAttributes.color!==void 0&&(Fe=3);let et,X,ne,Me;if(se){const je=qt[se];et=je.vertexShader,X=je.fragmentShader}else et=S.vertexShader,X=S.fragmentShader,l.update(S),ne=l.getVertexShaderID(S),Me=l.getFragmentShaderID(S);const oe=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Le=F.isInstancedMesh===!0,Oe=F.isBatchedMesh===!0,ot=!!S.map,Ve=!!S.matcap,ct=!!J,U=!!S.aoMap,Dt=!!S.lightMap,ze=!!S.bumpMap,He=!!S.normalMap,Te=!!S.displacementMap,it=!!S.emissiveMap,we=!!S.metalnessMap,w=!!S.roughnessMap,_=S.anisotropy>0,k=S.clearcoat>0,Y=S.dispersion>0,Z=S.iridescence>0,$=S.sheen>0,Se=S.transmission>0,le=_&&!!S.anisotropyMap,me=k&&!!S.clearcoatMap,We=k&&!!S.clearcoatNormalMap,ee=k&&!!S.clearcoatRoughnessMap,ge=Z&&!!S.iridescenceMap,Ae=Z&&!!S.iridescenceThicknessMap,Ce=$&&!!S.sheenColorMap,ve=$&&!!S.sheenRoughnessMap,Ge=!!S.specularMap,Ne=!!S.specularColorMap,tt=!!S.specularIntensityMap,P=Se&&!!S.transmissionMap,ae=Se&&!!S.thicknessMap,V=!!S.gradientMap,j=!!S.alphaMap,ue=S.alphaTest>0,he=!!S.alphaHash,Ie=!!S.extensions;let lt=Pn;S.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(lt=i.toneMapping);const gt={shaderID:se,shaderType:S.type,shaderName:S.name,vertexShader:et,fragmentShader:X,defines:S.defines,customVertexShaderID:ne,customFragmentShaderID:Me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Oe,batchingColor:Oe&&F._colorsTexture!==null,instancing:Le,instancingColor:Le&&F.instanceColor!==null,instancingMorph:Le&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:oe===null?i.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Li,alphaToCoverage:!!S.alphaToCoverage,map:ot,matcap:Ve,envMap:ct,envMapMode:ct&&J.mapping,envMapCubeUVHeight:G,aoMap:U,lightMap:Dt,bumpMap:ze,normalMap:He,displacementMap:f&&Te,emissiveMap:it,normalMapObjectSpace:He&&S.normalMapType===Ih,normalMapTangentSpace:He&&S.normalMapType===ic,metalnessMap:we,roughnessMap:w,anisotropy:_,anisotropyMap:le,clearcoat:k,clearcoatMap:me,clearcoatNormalMap:We,clearcoatRoughnessMap:ee,dispersion:Y,iridescence:Z,iridescenceMap:ge,iridescenceThicknessMap:Ae,sheen:$,sheenColorMap:Ce,sheenRoughnessMap:ve,specularMap:Ge,specularColorMap:Ne,specularIntensityMap:tt,transmission:Se,transmissionMap:P,thicknessMap:ae,gradientMap:V,opaque:S.transparent===!1&&S.blending===Si&&S.alphaToCoverage===!1,alphaMap:j,alphaTest:ue,alphaHash:he,combine:S.combine,mapUv:ot&&v(S.map.channel),aoMapUv:U&&v(S.aoMap.channel),lightMapUv:Dt&&v(S.lightMap.channel),bumpMapUv:ze&&v(S.bumpMap.channel),normalMapUv:He&&v(S.normalMap.channel),displacementMapUv:Te&&v(S.displacementMap.channel),emissiveMapUv:it&&v(S.emissiveMap.channel),metalnessMapUv:we&&v(S.metalnessMap.channel),roughnessMapUv:w&&v(S.roughnessMap.channel),anisotropyMapUv:le&&v(S.anisotropyMap.channel),clearcoatMapUv:me&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:We&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:ve&&v(S.sheenRoughnessMap.channel),specularMapUv:Ge&&v(S.specularMap.channel),specularColorMapUv:Ne&&v(S.specularColorMap.channel),specularIntensityMapUv:tt&&v(S.specularIntensityMap.channel),transmissionMapUv:P&&v(S.transmissionMap.channel),thicknessMapUv:ae&&v(S.thicknessMap.channel),alphaMapUv:j&&v(S.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(He||_),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!q.attributes.uv&&(ot||j),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Re,skinning:F.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Fe,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:lt,decodeVideoTexture:ot&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===Ke,decodeVideoTextureEmissive:it&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===Ke,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fn,flipSided:S.side===wt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ie&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&S.extensions.multiDraw===!0||Oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function u(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)x.push(R),x.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(b(x,S),E(x,S),x.push(i.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function b(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function E(S,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),S.push(o.mask)}function M(S){const x=g[S.type];let R;if(x){const z=qt[x];R=ld.clone(z.uniforms)}else R=S.uniforms;return R}function N(S,x){let R;for(let z=0,F=h.length;z<F;z++){const W=h[z];if(W.cacheKey===x){R=W,++R.usedTimes;break}}return R===void 0&&(R=new Sm(i,x,S,r),h.push(R)),R}function T(S){if(--S.usedTimes===0){const x=h.indexOf(S);h[x]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:M,acquireProgram:N,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:L}}function Am(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Rm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function rl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function al(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,f,p,g,v,m){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},i[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=p,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=v,u.group=m),e++,u}function o(d,f,p,g,v,m){const u=a(d,f,p,g,v,m);p.transmission>0?n.push(u):p.transparent===!0?s.push(u):t.push(u)}function l(d,f,p,g,v,m){const u=a(d,f,p,g,v,m);p.transmission>0?n.unshift(u):p.transparent===!0?s.unshift(u):t.unshift(u)}function c(d,f){t.length>1&&t.sort(d||Rm),n.length>1&&n.sort(f||rl),s.length>1&&s.sort(f||rl)}function h(){for(let d=e,f=i.length;d<f;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Cm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new al,i.set(n,[a])):s>=r.length?(a=new al,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Pm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Be};break;case"SpotLight":t={position:new C,direction:new C,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function Lm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Im=0;function Dm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Um(i){const e=new Pm,t=Lm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const s=new C,r=new at,a=new at;function o(c){let h=0,d=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,v=0,m=0,u=0,b=0,E=0,M=0,N=0,T=0,A=0;c.sort(Dm);for(let S=0,x=c.length;S<x;S++){const R=c[S],z=R.color,F=R.intensity,W=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=z.r*F,d+=z.g*F,f+=z.b*F;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],F);A++}else if(R.isDirectionalLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const J=R.shadow,G=t.get(R);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=q,n.directionalShadowMatrix[p]=R.shadow.matrix,b++}n.directional[p]=H,p++}else if(R.isSpotLight){const H=e.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(z).multiplyScalar(F),H.distance=W,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[v]=H;const J=R.shadow;if(R.map&&(n.spotLightMap[N]=R.map,N++,J.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[v]=J.matrix,R.castShadow){const G=t.get(R);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=q,M++}v++}else if(R.isRectAreaLight){const H=e.get(R);H.color.copy(z).multiplyScalar(F),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=H,m++}else if(R.isPointLight){const H=e.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const J=R.shadow,G=t.get(R);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=R.shadow.matrix,E++}n.point[g]=H,g++}else if(R.isHemisphereLight){const H=e.get(R);H.skyColor.copy(R.color).multiplyScalar(F),H.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[u]=H,u++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==u||L.numDirectionalShadows!==b||L.numPointShadows!==E||L.numSpotShadows!==M||L.numSpotMaps!==N||L.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+N-T,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,L.directionalLength=p,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=u,L.numDirectionalShadows=b,L.numPointShadows=E,L.numSpotShadows=M,L.numSpotMaps=N,L.numLightProbes=A,n.version=Im++)}function l(c,h){let d=0,f=0,p=0,g=0,v=0;const m=h.matrixWorldInverse;for(let u=0,b=c.length;u<b;u++){const E=c[u];if(E.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(E.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function ol(i){const e=new Um(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Nm(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ol(i),e.set(s,[o])):r>=a.length?(o=new ol(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class km extends Di{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ph,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fm extends Di{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Om=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bm=`uniform sampler2D shadow_pass;
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
}`;function zm(i,e,t){let n=new Xa;const s=new fe,r=new fe,a=new Qe,o=new km({depthPacking:Lh}),l=new Fm,c={},h=t.maxTextureSize,d={[In]:wt,[wt]:In,[fn]:fn},f=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:Om,fragmentShader:Bm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new en;g.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new bt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vl;let u=this.type;this.render=function(T,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),x=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Cn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=u!==hn&&this.type===hn,W=u===hn&&this.type!==hn;for(let q=0,H=T.length;q<H;q++){const J=T[q],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const se=G.getFrameExtents();if(s.multiply(se),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/se.x),s.x=r.x*se.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/se.y),s.y=r.y*se.y,G.mapSize.y=r.y)),G.map===null||F===!0||W===!0){const Ee=this.type!==hn?{minFilter:Lt,magFilter:Lt}:{};G.map!==null&&G.map.dispose(),G.map=new jn(s.x,s.y,Ee),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const re=G.getViewportCount();for(let Ee=0;Ee<re;Ee++){const Fe=G.getViewport(Ee);a.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),z.viewport(a),G.updateMatrices(J,Ee),n=G.getFrustum(),M(A,L,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===hn&&b(G,L),G.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(S,x,R)};function b(T,A){const L=e.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new jn(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,L,f,v,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,L,p,v,null)}function E(T,A,L,S){let x=null;const R=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)x=R;else if(x=L.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=x.uuid,F=A.uuid;let W=c[z];W===void 0&&(W={},c[z]=W);let q=W[F];q===void 0&&(q=x.clone(),W[F]=q,A.addEventListener("dispose",N)),x=q}if(x.visible=A.visible,x.wireframe=A.wireframe,S===hn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:d[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,L.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const z=i.properties.get(x);z.light=L}return x}function M(T,A,L,S,x){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===hn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const F=e.update(T),W=T.material;if(Array.isArray(W)){const q=F.groups;for(let H=0,J=q.length;H<J;H++){const G=q[H],se=W[G.materialIndex];if(se&&se.visible){const re=E(T,se,S,x);T.onBeforeShadow(i,T,A,L,F,re,G),i.renderBufferDirect(L,null,F,re,T,G),T.onAfterShadow(i,T,A,L,F,re,G)}}}else if(W.visible){const q=E(T,W,S,x);T.onBeforeShadow(i,T,A,L,F,q,null),i.renderBufferDirect(L,null,F,q,T,null),T.onAfterShadow(i,T,A,L,F,q,null)}}const z=T.children;for(let F=0,W=z.length;F<W;F++)M(z[F],A,L,S,x)}function N(T){T.target.removeEventListener("dispose",N);for(const L in c){const S=c[L],x=T.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const Hm={[$r]:Xr,[qr]:Kr,[Yr]:Zr,[wi]:jr,[Xr]:$r,[Kr]:qr,[Zr]:Yr,[jr]:wi};function Gm(i,e){function t(){let P=!1;const ae=new Qe;let V=null;const j=new Qe(0,0,0,0);return{setMask:function(ue){V!==ue&&!P&&(i.colorMask(ue,ue,ue,ue),V=ue)},setLocked:function(ue){P=ue},setClear:function(ue,he,Ie,lt,gt){gt===!0&&(ue*=lt,he*=lt,Ie*=lt),ae.set(ue,he,Ie,lt),j.equals(ae)===!1&&(i.clearColor(ue,he,Ie,lt),j.copy(ae))},reset:function(){P=!1,V=null,j.set(-1,0,0,0)}}}function n(){let P=!1,ae=!1,V=null,j=null,ue=null;return{setReversed:function(he){if(ae!==he){const Ie=e.get("EXT_clip_control");ae?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT);const lt=ue;ue=null,this.setClear(lt)}ae=he},getReversed:function(){return ae},setTest:function(he){he?oe(i.DEPTH_TEST):Re(i.DEPTH_TEST)},setMask:function(he){V!==he&&!P&&(i.depthMask(he),V=he)},setFunc:function(he){if(ae&&(he=Hm[he]),j!==he){switch(he){case $r:i.depthFunc(i.NEVER);break;case Xr:i.depthFunc(i.ALWAYS);break;case qr:i.depthFunc(i.LESS);break;case wi:i.depthFunc(i.LEQUAL);break;case Yr:i.depthFunc(i.EQUAL);break;case jr:i.depthFunc(i.GEQUAL);break;case Kr:i.depthFunc(i.GREATER);break;case Zr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=he}},setLocked:function(he){P=he},setClear:function(he){ue!==he&&(ae&&(he=1-he),i.clearDepth(he),ue=he)},reset:function(){P=!1,V=null,j=null,ue=null,ae=!1}}}function s(){let P=!1,ae=null,V=null,j=null,ue=null,he=null,Ie=null,lt=null,gt=null;return{setTest:function(je){P||(je?oe(i.STENCIL_TEST):Re(i.STENCIL_TEST))},setMask:function(je){ae!==je&&!P&&(i.stencilMask(je),ae=je)},setFunc:function(je,Bt,nn){(V!==je||j!==Bt||ue!==nn)&&(i.stencilFunc(je,Bt,nn),V=je,j=Bt,ue=nn)},setOp:function(je,Bt,nn){(he!==je||Ie!==Bt||lt!==nn)&&(i.stencilOp(je,Bt,nn),he=je,Ie=Bt,lt=nn)},setLocked:function(je){P=je},setClear:function(je){gt!==je&&(i.clearStencil(je),gt=je)},reset:function(){P=!1,ae=null,V=null,j=null,ue=null,he=null,Ie=null,lt=null,gt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},f=new WeakMap,p=[],g=null,v=!1,m=null,u=null,b=null,E=null,M=null,N=null,T=null,A=new Be(0,0,0),L=0,S=!1,x=null,R=null,z=null,F=null,W=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,J=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=J>=2);let se=null,re={};const Ee=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),et=new Qe().fromArray(Ee),X=new Qe().fromArray(Fe);function ne(P,ae,V,j){const ue=new Uint8Array(4),he=i.createTexture();i.bindTexture(P,he),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<V;Ie++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(ae+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return he}const Me={};Me[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),Me[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Me[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(i.DEPTH_TEST),a.setFunc(wi),ze(!1),He(fo),oe(i.CULL_FACE),U(Cn);function oe(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function Re(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Le(P,ae){return d[P]!==ae?(i.bindFramebuffer(P,ae),d[P]=ae,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ae),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function Oe(P,ae){let V=p,j=!1;if(P){V=f.get(ae),V===void 0&&(V=[],f.set(ae,V));const ue=P.textures;if(V.length!==ue.length||V[0]!==i.COLOR_ATTACHMENT0){for(let he=0,Ie=ue.length;he<Ie;he++)V[he]=i.COLOR_ATTACHMENT0+he;V.length=ue.length,j=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,j=!0);j&&i.drawBuffers(V)}function ot(P){return g!==P?(i.useProgram(P),g=P,!0):!1}const Ve={[Vn]:i.FUNC_ADD,[ih]:i.FUNC_SUBTRACT,[sh]:i.FUNC_REVERSE_SUBTRACT};Ve[rh]=i.MIN,Ve[ah]=i.MAX;const ct={[oh]:i.ZERO,[lh]:i.ONE,[ch]:i.SRC_COLOR,[Vr]:i.SRC_ALPHA,[mh]:i.SRC_ALPHA_SATURATE,[fh]:i.DST_COLOR,[dh]:i.DST_ALPHA,[hh]:i.ONE_MINUS_SRC_COLOR,[Wr]:i.ONE_MINUS_SRC_ALPHA,[ph]:i.ONE_MINUS_DST_COLOR,[uh]:i.ONE_MINUS_DST_ALPHA,[gh]:i.CONSTANT_COLOR,[vh]:i.ONE_MINUS_CONSTANT_COLOR,[_h]:i.CONSTANT_ALPHA,[yh]:i.ONE_MINUS_CONSTANT_ALPHA};function U(P,ae,V,j,ue,he,Ie,lt,gt,je){if(P===Cn){v===!0&&(Re(i.BLEND),v=!1);return}if(v===!1&&(oe(i.BLEND),v=!0),P!==nh){if(P!==m||je!==S){if((u!==Vn||M!==Vn)&&(i.blendEquation(i.FUNC_ADD),u=Vn,M=Vn),je)switch(P){case Si:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gr:i.blendFunc(i.ONE,i.ONE);break;case po:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case mo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Si:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case po:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case mo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}b=null,E=null,N=null,T=null,A.set(0,0,0),L=0,m=P,S=je}return}ue=ue||ae,he=he||V,Ie=Ie||j,(ae!==u||ue!==M)&&(i.blendEquationSeparate(Ve[ae],Ve[ue]),u=ae,M=ue),(V!==b||j!==E||he!==N||Ie!==T)&&(i.blendFuncSeparate(ct[V],ct[j],ct[he],ct[Ie]),b=V,E=j,N=he,T=Ie),(lt.equals(A)===!1||gt!==L)&&(i.blendColor(lt.r,lt.g,lt.b,gt),A.copy(lt),L=gt),m=P,S=!1}function Dt(P,ae){P.side===fn?Re(i.CULL_FACE):oe(i.CULL_FACE);let V=P.side===wt;ae&&(V=!V),ze(V),P.blending===Si&&P.transparent===!1?U(Cn):U(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const j=P.stencilWrite;o.setTest(j),j&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),it(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?oe(i.SAMPLE_ALPHA_TO_COVERAGE):Re(i.SAMPLE_ALPHA_TO_COVERAGE)}function ze(P){x!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),x=P)}function He(P){P!==eh?(oe(i.CULL_FACE),P!==R&&(P===fo?i.cullFace(i.BACK):P===th?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Re(i.CULL_FACE),R=P}function Te(P){P!==z&&(H&&i.lineWidth(P),z=P)}function it(P,ae,V){P?(oe(i.POLYGON_OFFSET_FILL),(F!==ae||W!==V)&&(i.polygonOffset(ae,V),F=ae,W=V)):Re(i.POLYGON_OFFSET_FILL)}function we(P){P?oe(i.SCISSOR_TEST):Re(i.SCISSOR_TEST)}function w(P){P===void 0&&(P=i.TEXTURE0+q-1),se!==P&&(i.activeTexture(P),se=P)}function _(P,ae,V){V===void 0&&(se===null?V=i.TEXTURE0+q-1:V=se);let j=re[V];j===void 0&&(j={type:void 0,texture:void 0},re[V]=j),(j.type!==P||j.texture!==ae)&&(se!==V&&(i.activeTexture(V),se=V),i.bindTexture(P,ae||Me[P]),j.type=P,j.texture=ae)}function k(){const P=re[se];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Se(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function le(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ee(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ge(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ae(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ce(P){et.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),et.copy(P))}function ve(P){X.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),X.copy(P))}function Ge(P,ae){let V=c.get(ae);V===void 0&&(V=new WeakMap,c.set(ae,V));let j=V.get(P);j===void 0&&(j=i.getUniformBlockIndex(ae,P.name),V.set(P,j))}function Ne(P,ae){const j=c.get(ae).get(P);l.get(ae)!==j&&(i.uniformBlockBinding(ae,j,P.__bindingPointIndex),l.set(ae,j))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},se=null,re={},d={},f=new WeakMap,p=[],g=null,v=!1,m=null,u=null,b=null,E=null,M=null,N=null,T=null,A=new Be(0,0,0),L=0,S=!1,x=null,R=null,z=null,F=null,W=null,et.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:oe,disable:Re,bindFramebuffer:Le,drawBuffers:Oe,useProgram:ot,setBlending:U,setMaterial:Dt,setFlipSided:ze,setCullFace:He,setLineWidth:Te,setPolygonOffset:it,setScissorTest:we,activeTexture:w,bindTexture:_,unbindTexture:k,compressedTexImage2D:Y,compressedTexImage3D:Z,texImage2D:ge,texImage3D:Ae,updateUBOMapping:Ge,uniformBlockBinding:Ne,texStorage2D:We,texStorage3D:ee,texSubImage2D:$,texSubImage3D:Se,compressedTexSubImage2D:le,compressedTexSubImage3D:me,scissor:Ce,viewport:ve,reset:tt}}function ll(i,e,t,n){const s=Vm(n);switch(t){case Kl:return i*e;case Jl:return i*e;case Ql:return i*e*2;case ec:return i*e/s.components*s.byteLength;case Ga:return i*e/s.components*s.byteLength;case tc:return i*e*2/s.components*s.byteLength;case Va:return i*e*2/s.components*s.byteLength;case Zl:return i*e*3/s.components*s.byteLength;case Wt:return i*e*4/s.components*s.byteLength;case Wa:return i*e*4/s.components*s.byteLength;case Fs:case Os:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Bs:case zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ia:case ra:return Math.max(i,16)*Math.max(e,8)/4;case na:case sa:return Math.max(i,8)*Math.max(e,8)/2;case aa:case oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ha:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case da:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ua:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case pa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ga:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case va:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _a:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ya:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ma:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Hs:case ba:case Ea:return Math.ceil(i/4)*Math.ceil(e/4)*16;case nc:case wa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ta:case Aa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vm(i){switch(i){case yn:case ql:return{byteLength:1,components:1};case Qi:case Yl:case ts:return{byteLength:2,components:1};case za:case Ha:return{byteLength:2,components:4};case Yn:case Ba:case mn:return{byteLength:4,components:1};case jl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Wm(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,h=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return p?new OffscreenCanvas(w,_):es("canvas")}function v(w,_,k){let Y=1;const Z=we(w);if((Z.width>k||Z.height>k)&&(Y=k/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const $=Math.floor(Y*Z.width),Se=Math.floor(Y*Z.height);d===void 0&&(d=g($,Se));const le=_?g($,Se):d;return le.width=$,le.height=Se,le.getContext("2d").drawImage(w,0,0,$,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+$+"x"+Se+")."),le}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),w;return w}function m(w){return w.generateMipmaps}function u(w){i.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,_,k,Y,Z=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=_;if(_===i.RED&&(k===i.FLOAT&&($=i.R32F),k===i.HALF_FLOAT&&($=i.R16F),k===i.UNSIGNED_BYTE&&($=i.R8)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.R8UI),k===i.UNSIGNED_SHORT&&($=i.R16UI),k===i.UNSIGNED_INT&&($=i.R32UI),k===i.BYTE&&($=i.R8I),k===i.SHORT&&($=i.R16I),k===i.INT&&($=i.R32I)),_===i.RG&&(k===i.FLOAT&&($=i.RG32F),k===i.HALF_FLOAT&&($=i.RG16F),k===i.UNSIGNED_BYTE&&($=i.RG8)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RG8UI),k===i.UNSIGNED_SHORT&&($=i.RG16UI),k===i.UNSIGNED_INT&&($=i.RG32UI),k===i.BYTE&&($=i.RG8I),k===i.SHORT&&($=i.RG16I),k===i.INT&&($=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RGB8UI),k===i.UNSIGNED_SHORT&&($=i.RGB16UI),k===i.UNSIGNED_INT&&($=i.RGB32UI),k===i.BYTE&&($=i.RGB8I),k===i.SHORT&&($=i.RGB16I),k===i.INT&&($=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RGBA8UI),k===i.UNSIGNED_SHORT&&($=i.RGBA16UI),k===i.UNSIGNED_INT&&($=i.RGBA32UI),k===i.BYTE&&($=i.RGBA8I),k===i.SHORT&&($=i.RGBA16I),k===i.INT&&($=i.RGBA32I)),_===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),_===i.RGBA){const Se=Z?Js:$e.getTransfer(Y);k===i.FLOAT&&($=i.RGBA32F),k===i.HALF_FLOAT&&($=i.RGBA16F),k===i.UNSIGNED_BYTE&&($=Se===Ke?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function M(w,_){let k;return w?_===null||_===Yn||_===Ri?k=i.DEPTH24_STENCIL8:_===mn?k=i.DEPTH32F_STENCIL8:_===Qi&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Yn||_===Ri?k=i.DEPTH_COMPONENT24:_===mn?k=i.DEPTH_COMPONENT32F:_===Qi&&(k=i.DEPTH_COMPONENT16),k}function N(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Lt&&w.minFilter!==Zt?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function T(w){const _=w.target;_.removeEventListener("dispose",T),L(_),_.isVideoTexture&&h.delete(_)}function A(w){const _=w.target;_.removeEventListener("dispose",A),x(_)}function L(w){const _=n.get(w);if(_.__webglInit===void 0)return;const k=w.source,Y=f.get(k);if(Y){const Z=Y[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(w),Object.keys(Y).length===0&&f.delete(k)}n.remove(w)}function S(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const k=w.source,Y=f.get(k);delete Y[_.__cacheKey],a.memory.textures--}function x(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let Z=0;Z<_.__webglFramebuffer[Y].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Y][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=w.textures;for(let Y=0,Z=k.length;Y<Z;Y++){const $=n.get(k[Y]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(k[Y])}n.remove(w)}let R=0;function z(){R=0}function F(){const w=R;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),R+=1,w}function W(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function q(w,_){const k=n.get(w);if(w.isVideoTexture&&Te(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){const Y=w.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(k,w,_);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function H(w,_){const k=n.get(w);if(w.version>0&&k.__version!==w.version){X(k,w,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function J(w,_){const k=n.get(w);if(w.version>0&&k.__version!==w.version){X(k,w,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function G(w,_){const k=n.get(w);if(w.version>0&&k.__version!==w.version){ne(k,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}const se={[ea]:i.REPEAT,[$n]:i.CLAMP_TO_EDGE,[ta]:i.MIRRORED_REPEAT},re={[Lt]:i.NEAREST,[Ch]:i.NEAREST_MIPMAP_NEAREST,[os]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[ir]:i.LINEAR_MIPMAP_NEAREST,[Xn]:i.LINEAR_MIPMAP_LINEAR},Ee={[Dh]:i.NEVER,[Bh]:i.ALWAYS,[Uh]:i.LESS,[sc]:i.LEQUAL,[Nh]:i.EQUAL,[Oh]:i.GEQUAL,[kh]:i.GREATER,[Fh]:i.NOTEQUAL};function Fe(w,_){if(_.type===mn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Zt||_.magFilter===ir||_.magFilter===os||_.magFilter===Xn||_.minFilter===Zt||_.minFilter===ir||_.minFilter===os||_.minFilter===Xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,se[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,se[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,se[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,re[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,re[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Ee[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Lt||_.minFilter!==os&&_.minFilter!==Xn||_.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function et(w,_){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",T));const Y=_.source;let Z=f.get(Y);Z===void 0&&(Z={},f.set(Y,Z));const $=W(_);if($!==w.__cacheKey){Z[$]===void 0&&(Z[$]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Z[$].usedTimes++;const Se=Z[w.__cacheKey];Se!==void 0&&(Z[w.__cacheKey].usedTimes--,Se.usedTimes===0&&S(_)),w.__cacheKey=$,w.__webglTexture=Z[$].texture}return k}function X(w,_,k){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const Z=et(w,_),$=_.source;t.bindTexture(Y,w.__webglTexture,i.TEXTURE0+k);const Se=n.get($);if($.version!==Se.__version||Z===!0){t.activeTexture(i.TEXTURE0+k);const le=$e.getPrimaries($e.workingColorSpace),me=_.colorSpace===Rn?null:$e.getPrimaries(_.colorSpace),We=_.colorSpace===Rn||le===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let ee=v(_.image,!1,s.maxTextureSize);ee=it(_,ee);const ge=r.convert(_.format,_.colorSpace),Ae=r.convert(_.type);let Ce=E(_.internalFormat,ge,Ae,_.colorSpace,_.isVideoTexture);Fe(Y,_);let ve;const Ge=_.mipmaps,Ne=_.isVideoTexture!==!0,tt=Se.__version===void 0||Z===!0,P=$.dataReady,ae=N(_,ee);if(_.isDepthTexture)Ce=M(_.format===Ci,_.type),tt&&(Ne?t.texStorage2D(i.TEXTURE_2D,1,Ce,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Ce,ee.width,ee.height,0,ge,Ae,null));else if(_.isDataTexture)if(Ge.length>0){Ne&&tt&&t.texStorage2D(i.TEXTURE_2D,ae,Ce,Ge[0].width,Ge[0].height);for(let V=0,j=Ge.length;V<j;V++)ve=Ge[V],Ne?P&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ve.width,ve.height,ge,Ae,ve.data):t.texImage2D(i.TEXTURE_2D,V,Ce,ve.width,ve.height,0,ge,Ae,ve.data);_.generateMipmaps=!1}else Ne?(tt&&t.texStorage2D(i.TEXTURE_2D,ae,Ce,ee.width,ee.height),P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,ge,Ae,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Ce,ee.width,ee.height,0,ge,Ae,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ne&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,Ce,Ge[0].width,Ge[0].height,ee.depth);for(let V=0,j=Ge.length;V<j;V++)if(ve=Ge[V],_.format!==Wt)if(ge!==null)if(Ne){if(P)if(_.layerUpdates.size>0){const ue=ll(ve.width,ve.height,_.format,_.type);for(const he of _.layerUpdates){const Ie=ve.data.subarray(he*ue/ve.data.BYTES_PER_ELEMENT,(he+1)*ue/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,he,ve.width,ve.height,1,ge,Ie)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,ve.width,ve.height,ee.depth,ge,ve.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Ce,ve.width,ve.height,ee.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,ve.width,ve.height,ee.depth,ge,Ae,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,V,Ce,ve.width,ve.height,ee.depth,0,ge,Ae,ve.data)}else{Ne&&tt&&t.texStorage2D(i.TEXTURE_2D,ae,Ce,Ge[0].width,Ge[0].height);for(let V=0,j=Ge.length;V<j;V++)ve=Ge[V],_.format!==Wt?ge!==null?Ne?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,ve.width,ve.height,ge,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,V,Ce,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?P&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ve.width,ve.height,ge,Ae,ve.data):t.texImage2D(i.TEXTURE_2D,V,Ce,ve.width,ve.height,0,ge,Ae,ve.data)}else if(_.isDataArrayTexture)if(Ne){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,Ce,ee.width,ee.height,ee.depth),P)if(_.layerUpdates.size>0){const V=ll(ee.width,ee.height,_.format,_.type);for(const j of _.layerUpdates){const ue=ee.data.subarray(j*V/ee.data.BYTES_PER_ELEMENT,(j+1)*V/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,ee.width,ee.height,1,ge,Ae,ue)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ge,Ae,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ce,ee.width,ee.height,ee.depth,0,ge,Ae,ee.data);else if(_.isData3DTexture)Ne?(tt&&t.texStorage3D(i.TEXTURE_3D,ae,Ce,ee.width,ee.height,ee.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ge,Ae,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Ce,ee.width,ee.height,ee.depth,0,ge,Ae,ee.data);else if(_.isFramebufferTexture){if(tt)if(Ne)t.texStorage2D(i.TEXTURE_2D,ae,Ce,ee.width,ee.height);else{let V=ee.width,j=ee.height;for(let ue=0;ue<ae;ue++)t.texImage2D(i.TEXTURE_2D,ue,Ce,V,j,0,ge,Ae,null),V>>=1,j>>=1}}else if(Ge.length>0){if(Ne&&tt){const V=we(Ge[0]);t.texStorage2D(i.TEXTURE_2D,ae,Ce,V.width,V.height)}for(let V=0,j=Ge.length;V<j;V++)ve=Ge[V],Ne?P&&t.texSubImage2D(i.TEXTURE_2D,V,0,0,ge,Ae,ve):t.texImage2D(i.TEXTURE_2D,V,Ce,ge,Ae,ve);_.generateMipmaps=!1}else if(Ne){if(tt){const V=we(ee);t.texStorage2D(i.TEXTURE_2D,ae,Ce,V.width,V.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Ae,ee)}else t.texImage2D(i.TEXTURE_2D,0,Ce,ge,Ae,ee);m(_)&&u(Y),Se.__version=$.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ne(w,_,k){if(_.image.length!==6)return;const Y=et(w,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);const $=n.get(Z);if(Z.version!==$.__version||Y===!0){t.activeTexture(i.TEXTURE0+k);const Se=$e.getPrimaries($e.workingColorSpace),le=_.colorSpace===Rn?null:$e.getPrimaries(_.colorSpace),me=_.colorSpace===Rn||Se===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const We=_.isCompressedTexture||_.image[0].isCompressedTexture,ee=_.image[0]&&_.image[0].isDataTexture,ge=[];for(let j=0;j<6;j++)!We&&!ee?ge[j]=v(_.image[j],!0,s.maxCubemapSize):ge[j]=ee?_.image[j].image:_.image[j],ge[j]=it(_,ge[j]);const Ae=ge[0],Ce=r.convert(_.format,_.colorSpace),ve=r.convert(_.type),Ge=E(_.internalFormat,Ce,ve,_.colorSpace),Ne=_.isVideoTexture!==!0,tt=$.__version===void 0||Y===!0,P=Z.dataReady;let ae=N(_,Ae);Fe(i.TEXTURE_CUBE_MAP,_);let V;if(We){Ne&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ae,Ge,Ae.width,Ae.height);for(let j=0;j<6;j++){V=ge[j].mipmaps;for(let ue=0;ue<V.length;ue++){const he=V[ue];_.format!==Wt?Ce!==null?Ne?P&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,0,0,he.width,he.height,Ce,he.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,Ge,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,0,0,he.width,he.height,Ce,ve,he.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,Ge,he.width,he.height,0,Ce,ve,he.data)}}}else{if(V=_.mipmaps,Ne&&tt){V.length>0&&ae++;const j=we(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ae,Ge,j.width,j.height)}for(let j=0;j<6;j++)if(ee){Ne?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ge[j].width,ge[j].height,Ce,ve,ge[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,ge[j].width,ge[j].height,0,Ce,ve,ge[j].data);for(let ue=0;ue<V.length;ue++){const Ie=V[ue].image[j].image;Ne?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,0,0,Ie.width,Ie.height,Ce,ve,Ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,Ge,Ie.width,Ie.height,0,Ce,ve,Ie.data)}}else{Ne?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ce,ve,ge[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,Ce,ve,ge[j]);for(let ue=0;ue<V.length;ue++){const he=V[ue];Ne?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,0,0,Ce,ve,he.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,Ge,Ce,ve,he.image[j])}}}m(_)&&u(i.TEXTURE_CUBE_MAP),$.__version=Z.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Me(w,_,k,Y,Z,$){const Se=r.convert(k.format,k.colorSpace),le=r.convert(k.type),me=E(k.internalFormat,Se,le,k.colorSpace),We=n.get(_),ee=n.get(k);if(ee.__renderTarget=_,!We.__hasExternalTextures){const ge=Math.max(1,_.width>>$),Ae=Math.max(1,_.height>>$);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,$,me,ge,Ae,_.depth,0,Se,le,null):t.texImage2D(Z,$,me,ge,Ae,0,Se,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),He(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Z,ee.__webglTexture,0,ze(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Z,ee.__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(w,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const Y=_.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,$=M(_.stencilBuffer,Z),Se=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=ze(_);He(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,$,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,$,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,$,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,w)}else{const Y=_.textures;for(let Z=0;Z<Y.length;Z++){const $=Y[Z],Se=r.convert($.format,$.colorSpace),le=r.convert($.type),me=E($.internalFormat,Se,le,$.colorSpace),We=ze(_);k&&He(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,We,me,_.width,_.height):He(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We,me,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,me,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Re(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const Z=Y.__webglTexture,$=ze(_);if(_.depthTexture.format===bi)He(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(_.depthTexture.format===Ci)He(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Le(w){const _=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const Y=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=Y}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Re(_.__webglFramebuffer,w)}else if(k){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),oe(_.__webglDepthbuffer[Y],w,!1);else{const Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,$)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),oe(_.__webglDepthbuffer,w,!1);else{const Y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(w,_,k){const Y=n.get(w);_!==void 0&&Me(Y.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Le(w)}function ot(w){const _=w.texture,k=n.get(w),Y=n.get(_);w.addEventListener("dispose",A);const Z=w.textures,$=w.isWebGLCubeRenderTarget===!0,Se=Z.length>1;if(Se||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),$){k.__webglFramebuffer=[];for(let le=0;le<6;le++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[le]=[];for(let me=0;me<_.mipmaps.length;me++)k.__webglFramebuffer[le][me]=i.createFramebuffer()}else k.__webglFramebuffer[le]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let le=0;le<_.mipmaps.length;le++)k.__webglFramebuffer[le]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Se)for(let le=0,me=Z.length;le<me;le++){const We=n.get(Z[le]);We.__webglTexture===void 0&&(We.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&He(w)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let le=0;le<Z.length;le++){const me=Z[le];k.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[le]);const We=r.convert(me.format,me.colorSpace),ee=r.convert(me.type),ge=E(me.internalFormat,We,ee,me.colorSpace,w.isXRRenderTarget===!0),Ae=ze(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,ge,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,k.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),oe(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,_);for(let le=0;le<6;le++)if(_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)Me(k.__webglFramebuffer[le][me],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,me);else Me(k.__webglFramebuffer[le],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(_)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let le=0,me=Z.length;le<me;le++){const We=Z[le],ee=n.get(We);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),Fe(i.TEXTURE_2D,We),Me(k.__webglFramebuffer,w,We,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,0),m(We)&&u(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(le=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,Y.__webglTexture),Fe(le,_),_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)Me(k.__webglFramebuffer[me],w,_,i.COLOR_ATTACHMENT0,le,me);else Me(k.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,le,0);m(_)&&u(le),t.unbindTexture()}w.depthBuffer&&Le(w)}function Ve(w){const _=w.textures;for(let k=0,Y=_.length;k<Y;k++){const Z=_[k];if(m(Z)){const $=b(w),Se=n.get(Z).__webglTexture;t.bindTexture($,Se),u($),t.unbindTexture()}}}const ct=[],U=[];function Dt(w){if(w.samples>0){if(He(w)===!1){const _=w.textures,k=w.width,Y=w.height;let Z=i.COLOR_BUFFER_BIT;const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(w),le=_.length>1;if(le)for(let me=0;me<_.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let me=0;me<_.length;me++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const We=n.get(_[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,k,Y,0,0,k,Y,Z,i.NEAREST),l===!0&&(ct.length=0,U.length=0,ct.push(i.COLOR_ATTACHMENT0+me),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ct.push($),U.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let me=0;me<_.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const We=n.get(_[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ze(w){return Math.min(s.maxSamples,w.samples)}function He(w){const _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Te(w){const _=a.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function it(w,_){const k=w.colorSpace,Y=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==Li&&k!==Rn&&($e.getTransfer(k)===Ke?(Y!==Wt||Z!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),_}function we(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.setTexture2D=q,this.setTexture2DArray=H,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=Oe,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=He}function $m(i,e){function t(n,s=Rn){let r;const a=$e.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===za)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ha)return i.UNSIGNED_SHORT_5_5_5_1;if(n===jl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ql)return i.BYTE;if(n===Yl)return i.SHORT;if(n===Qi)return i.UNSIGNED_SHORT;if(n===Ba)return i.INT;if(n===Yn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===ts)return i.HALF_FLOAT;if(n===Kl)return i.ALPHA;if(n===Zl)return i.RGB;if(n===Wt)return i.RGBA;if(n===Jl)return i.LUMINANCE;if(n===Ql)return i.LUMINANCE_ALPHA;if(n===bi)return i.DEPTH_COMPONENT;if(n===Ci)return i.DEPTH_STENCIL;if(n===ec)return i.RED;if(n===Ga)return i.RED_INTEGER;if(n===tc)return i.RG;if(n===Va)return i.RG_INTEGER;if(n===Wa)return i.RGBA_INTEGER;if(n===Fs||n===Os||n===Bs||n===zs)if(a===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Os)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Bs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===zs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===na||n===ia||n===sa||n===ra)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ra)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===aa||n===oa||n===la)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===aa||n===oa)return a===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===la)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ca||n===ha||n===da||n===ua||n===fa||n===pa||n===ma||n===ga||n===va||n===_a||n===ya||n===xa||n===Ma||n===Sa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ca)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ha)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===da)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ua)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ma)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ga)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===va)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_a)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ya)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ma)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hs||n===ba||n===Ea)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Hs)return a===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ea)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nc||n===wa||n===Ta||n===Aa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Hs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Aa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ri?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Xm extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class pn extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qm={type:"move"};class Ir{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),u=this._getHandJoint(c,v);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ym=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jm=`
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

}`;class Km{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new yt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Dn({vertexShader:Ym,fragmentShader:jm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bt(new Qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zm extends Ii{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,p=null,g=null;const v=new Km,m=t.getContextAttributes();let u=null,b=null;const E=[],M=[],N=new fe;let T=null;const A=new Ft;A.viewport=new Qe;const L=new Ft;L.viewport=new Qe;const S=[A,L],x=new Xm;let R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ne=E[X];return ne===void 0&&(ne=new Ir,E[X]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(X){let ne=E[X];return ne===void 0&&(ne=new Ir,E[X]=ne),ne.getGripSpace()},this.getHand=function(X){let ne=E[X];return ne===void 0&&(ne=new Ir,E[X]=ne),ne.getHandSpace()};function F(X){const ne=M.indexOf(X.inputSource);if(ne===-1)return;const Me=E[ne];Me!==void 0&&(Me.update(X.inputSource,X.frame,c||a),Me.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",q);for(let X=0;X<E.length;X++){const ne=M[X];ne!==null&&(M[X]=null,E[X].disconnect(ne))}R=null,z=null,v.reset(),e.setRenderTarget(u),p=null,f=null,d=null,s=null,b=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(u=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",W),s.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(N),s.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new jn(p.framebufferWidth,p.framebufferHeight,{format:Wt,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,Me=null,oe=null;m.depth&&(oe=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?Ci:bi,Me=m.stencil?Ri:Yn);const Re={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(Re),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new jn(f.textureWidth,f.textureHeight,{format:Wt,type:yn,depthTexture:new vc(f.textureWidth,f.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),et.setContext(s),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(X){for(let ne=0;ne<X.removed.length;ne++){const Me=X.removed[ne],oe=M.indexOf(Me);oe>=0&&(M[oe]=null,E[oe].disconnect(Me))}for(let ne=0;ne<X.added.length;ne++){const Me=X.added[ne];let oe=M.indexOf(Me);if(oe===-1){for(let Le=0;Le<E.length;Le++)if(Le>=M.length){M.push(Me),oe=Le;break}else if(M[Le]===null){M[Le]=Me,oe=Le;break}if(oe===-1)break}const Re=E[oe];Re&&Re.connect(Me)}}const H=new C,J=new C;function G(X,ne,Me){H.setFromMatrixPosition(ne.matrixWorld),J.setFromMatrixPosition(Me.matrixWorld);const oe=H.distanceTo(J),Re=ne.projectionMatrix.elements,Le=Me.projectionMatrix.elements,Oe=Re[14]/(Re[10]-1),ot=Re[14]/(Re[10]+1),Ve=(Re[9]+1)/Re[5],ct=(Re[9]-1)/Re[5],U=(Re[8]-1)/Re[0],Dt=(Le[8]+1)/Le[0],ze=Oe*U,He=Oe*Dt,Te=oe/(-U+Dt),it=Te*-U;if(ne.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(it),X.translateZ(Te),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Re[10]===-1)X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const we=Oe+Te,w=ot+Te,_=ze-it,k=He+(oe-it),Y=Ve*ot/w*we,Z=ct*ot/w*we;X.projectionMatrix.makePerspective(_,k,Y,Z,we,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function se(X,ne){ne===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ne.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let ne=X.near,Me=X.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(Me=v.depthFar)),x.near=L.near=A.near=ne,x.far=L.far=A.far=Me,(R!==x.near||z!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,z=x.far),A.layers.mask=X.layers.mask|2,L.layers.mask=X.layers.mask|4,x.layers.mask=A.layers.mask|L.layers.mask;const oe=X.parent,Re=x.cameras;se(x,oe);for(let Le=0;Le<Re.length;Le++)se(Re[Le],oe);Re.length===2?G(x,A,L):x.projectionMatrix.copy(A.projectionMatrix),re(X,x,oe)};function re(X,ne,Me){Me===null?X.matrix.copy(ne.matrixWorld):(X.matrix.copy(Me.matrixWorld),X.matrix.invert(),X.matrix.multiply(ne.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ca*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let Ee=null;function Fe(X,ne){if(h=ne.getViewerPose(c||a),g=ne,h!==null){const Me=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let oe=!1;Me.length!==x.cameras.length&&(x.cameras.length=0,oe=!0);for(let Le=0;Le<Me.length;Le++){const Oe=Me[Le];let ot=null;if(p!==null)ot=p.getViewport(Oe);else{const ct=d.getViewSubImage(f,Oe);ot=ct.viewport,Le===0&&(e.setRenderTargetTextures(b,ct.colorTexture,f.ignoreDepthValues?void 0:ct.depthStencilTexture),e.setRenderTarget(b))}let Ve=S[Le];Ve===void 0&&(Ve=new Ft,Ve.layers.enable(Le),Ve.viewport=new Qe,S[Le]=Ve),Ve.matrix.fromArray(Oe.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Oe.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(ot.x,ot.y,ot.width,ot.height),Le===0&&(x.matrix.copy(Ve.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),oe===!0&&x.cameras.push(Ve)}const Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const Le=d.getDepthInformation(Me[0]);Le&&Le.isValid&&Le.texture&&v.init(e,Le,s.renderState)}}for(let Me=0;Me<E.length;Me++){const oe=M[Me],Re=E[Me];oe!==null&&Re!==void 0&&Re.update(oe,ne,c||a)}Ee&&Ee(X,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const et=new gc;et.setAnimationLoop(Fe),this.setAnimationLoop=function(X){Ee=X},this.dispose=function(){}}}const zn=new Qt,Jm=new at;function Qm(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,fc(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,b,E,M){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),d(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,M)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),v(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,b,E):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===wt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===wt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const b=e.get(u),E=b.envMap,M=b.envMapRotation;E&&(m.envMap.value=E,zn.copy(M),zn.x*=-1,zn.y*=-1,zn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),m.envMapRotation.value.setFromMatrix4(Jm.makeRotationFromEuler(zn)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,b,E){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*b,m.scale.value=E*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,b){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===wt&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function v(m,u){const b=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function eg(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,E){const M=E.program;n.uniformBlockBinding(b,M)}function c(b,E){let M=s[b.id];M===void 0&&(g(b),M=h(b),s[b.id]=M,b.addEventListener("dispose",m));const N=E.program;n.updateUBOMapping(b,N);const T=e.render.frame;r[b.id]!==T&&(f(b),r[b.id]=T)}function h(b){const E=d();b.__bindingPointIndex=E;const M=i.createBuffer(),N=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,N,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const E=s[b.id],M=b.uniforms,N=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,A=M.length;T<A;T++){const L=Array.isArray(M[T])?M[T]:[M[T]];for(let S=0,x=L.length;S<x;S++){const R=L[S];if(p(R,T,S,N)===!0){const z=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let W=0;for(let q=0;q<F.length;q++){const H=F[q],J=v(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,z+W,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):(H.toArray(R.__data,W),W+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,E,M,N){const T=b.value,A=E+"_"+M;if(N[A]===void 0)return typeof T=="number"||typeof T=="boolean"?N[A]=T:N[A]=T.clone(),!0;{const L=N[A];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return N[A]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function g(b){const E=b.uniforms;let M=0;const N=16;for(let A=0,L=E.length;A<L;A++){const S=Array.isArray(E[A])?E[A]:[E[A]];for(let x=0,R=S.length;x<R;x++){const z=S[x],F=Array.isArray(z.value)?z.value:[z.value];for(let W=0,q=F.length;W<q;W++){const H=F[W],J=v(H),G=M%N,se=G%J.boundary,re=G+se;M+=se,re!==0&&N-re<J.storage&&(M+=N-re),z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=M,M+=J.storage}}}const T=M%N;return T>0&&(M+=N-T),b.__size=M,b.__cache={},this}function v(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function m(b){const E=b.target;E.removeEventListener("dispose",m);const M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function u(){for(const b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:u}}class tg{constructor(e={}){const{canvas:t=Hh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,u=null;const b=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=St,this.toneMapping=Pn,this.toneMappingExposure=1;const M=this;let N=!1,T=0,A=0,L=null,S=-1,x=null;const R=new Qe,z=new Qe;let F=null;const W=new Be(0);let q=0,H=t.width,J=t.height,G=1,se=null,re=null;const Ee=new Qe(0,0,H,J),Fe=new Qe(0,0,H,J);let et=!1;const X=new Xa;let ne=!1,Me=!1;const oe=new at,Re=new at,Le=new C,Oe=new Qe,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function ct(){return L===null?G:1}let U=n;function Dt(y,I){return t.getContext(y,I)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Oa}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",he,!1),U===null){const I="webgl2";if(U=Dt(I,y),U===null)throw Dt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let ze,He,Te,it,we,w,_,k,Y,Z,$,Se,le,me,We,ee,ge,Ae,Ce,ve,Ge,Ne,tt,P;function ae(){ze=new ap(U),ze.init(),Ne=new $m(U,ze),He=new ep(U,ze,e,Ne),Te=new Gm(U,ze),He.reverseDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),it=new cp(U),we=new Am,w=new Wm(U,ze,Te,we,He,Ne,it),_=new np(M),k=new rp(M),Y=new md(U),tt=new Jf(U,Y),Z=new op(U,Y,it,tt),$=new dp(U,Z,Y,it),Ce=new hp(U,He,w),ee=new tp(we),Se=new Tm(M,_,k,ze,He,tt,ee),le=new Qm(M,we),me=new Cm,We=new Nm(ze),Ae=new Zf(M,_,k,Te,$,p,l),ge=new zm(M,$,He),P=new eg(U,it,He,Te),ve=new Qf(U,ze,it),Ge=new lp(U,ze,it),it.programs=Se.programs,M.capabilities=He,M.extensions=ze,M.properties=we,M.renderLists=me,M.shadowMap=ge,M.state=Te,M.info=it}ae();const V=new Zm(M,U);this.xr=V,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const y=ze.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ze.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(y){y!==void 0&&(G=y,this.setSize(H,J,!1))},this.getSize=function(y){return y.set(H,J)},this.setSize=function(y,I,O=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=y,J=I,t.width=Math.floor(y*G),t.height=Math.floor(I*G),O===!0&&(t.style.width=y+"px",t.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(H*G,J*G).floor()},this.setDrawingBufferSize=function(y,I,O){H=y,J=I,G=O,t.width=Math.floor(y*O),t.height=Math.floor(I*O),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(R)},this.getViewport=function(y){return y.copy(Ee)},this.setViewport=function(y,I,O,B){y.isVector4?Ee.set(y.x,y.y,y.z,y.w):Ee.set(y,I,O,B),Te.viewport(R.copy(Ee).multiplyScalar(G).round())},this.getScissor=function(y){return y.copy(Fe)},this.setScissor=function(y,I,O,B){y.isVector4?Fe.set(y.x,y.y,y.z,y.w):Fe.set(y,I,O,B),Te.scissor(z.copy(Fe).multiplyScalar(G).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(y){Te.setScissorTest(et=y)},this.setOpaqueSort=function(y){se=y},this.setTransparentSort=function(y){re=y},this.getClearColor=function(y){return y.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor.apply(Ae,arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha.apply(Ae,arguments)},this.clear=function(y=!0,I=!0,O=!0){let B=0;if(y){let D=!1;if(L!==null){const te=L.texture.format;D=te===Wa||te===Va||te===Ga}if(D){const te=L.texture.type,de=te===yn||te===Yn||te===Qi||te===Ri||te===za||te===Ha,_e=Ae.getClearColor(),ye=Ae.getClearAlpha(),Pe=_e.r,De=_e.g,xe=_e.b;de?(g[0]=Pe,g[1]=De,g[2]=xe,g[3]=ye,U.clearBufferuiv(U.COLOR,0,g)):(v[0]=Pe,v[1]=De,v[2]=xe,v[3]=ye,U.clearBufferiv(U.COLOR,0,v))}else B|=U.COLOR_BUFFER_BIT}I&&(B|=U.DEPTH_BUFFER_BIT),O&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",he,!1),me.dispose(),We.dispose(),we.dispose(),_.dispose(),k.dispose(),$.dispose(),tt.dispose(),P.dispose(),Se.dispose(),V.dispose(),V.removeEventListener("sessionstart",io),V.removeEventListener("sessionend",so),Un.stop()};function j(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const y=it.autoReset,I=ge.enabled,O=ge.autoUpdate,B=ge.needsUpdate,D=ge.type;ae(),it.autoReset=y,ge.enabled=I,ge.autoUpdate=O,ge.needsUpdate=B,ge.type=D}function he(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ie(y){const I=y.target;I.removeEventListener("dispose",Ie),lt(I)}function lt(y){gt(y),we.remove(y)}function gt(y){const I=we.get(y).programs;I!==void 0&&(I.forEach(function(O){Se.releaseProgram(O)}),y.isShaderMaterial&&Se.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,O,B,D,te){I===null&&(I=ot);const de=D.isMesh&&D.matrixWorld.determinant()<0,_e=zc(y,I,O,B,D);Te.setMaterial(B,de);let ye=O.index,Pe=1;if(B.wireframe===!0){if(ye=Z.getWireframeAttribute(O),ye===void 0)return;Pe=2}const De=O.drawRange,xe=O.attributes.position;let Xe=De.start*Pe,nt=(De.start+De.count)*Pe;te!==null&&(Xe=Math.max(Xe,te.start*Pe),nt=Math.min(nt,(te.start+te.count)*Pe)),ye!==null?(Xe=Math.max(Xe,0),nt=Math.min(nt,ye.count)):xe!=null&&(Xe=Math.max(Xe,0),nt=Math.min(nt,xe.count));const st=nt-Xe;if(st<0||st===1/0)return;tt.setup(D,B,_e,O,ye);let Et,qe=ve;if(ye!==null&&(Et=Y.get(ye),qe=Ge,qe.setIndex(Et)),D.isMesh)B.wireframe===!0?(Te.setLineWidth(B.wireframeLinewidth*ct()),qe.setMode(U.LINES)):qe.setMode(U.TRIANGLES);else if(D.isLine){let be=B.linewidth;be===void 0&&(be=1),Te.setLineWidth(be*ct()),D.isLineSegments?qe.setMode(U.LINES):D.isLineLoop?qe.setMode(U.LINE_LOOP):qe.setMode(U.LINE_STRIP)}else D.isPoints?qe.setMode(U.POINTS):D.isSprite&&qe.setMode(U.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)qe.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))qe.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const be=D._multiDrawStarts,sn=D._multiDrawCounts,Ye=D._multiDrawCount,zt=ye?Y.get(ye).bytesPerElement:1,Zn=we.get(B).currentProgram.getUniforms();for(let Tt=0;Tt<Ye;Tt++)Zn.setValue(U,"_gl_DrawID",Tt),qe.render(be[Tt]/zt,sn[Tt])}else if(D.isInstancedMesh)qe.renderInstances(Xe,st,D.count);else if(O.isInstancedBufferGeometry){const be=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,sn=Math.min(O.instanceCount,be);qe.renderInstances(Xe,st,sn)}else qe.render(Xe,st)};function je(y,I,O){y.transparent===!0&&y.side===fn&&y.forceSinglePass===!1?(y.side=wt,y.needsUpdate=!0,rs(y,I,O),y.side=In,y.needsUpdate=!0,rs(y,I,O),y.side=fn):rs(y,I,O)}this.compile=function(y,I,O=null){O===null&&(O=y),u=We.get(O),u.init(I),E.push(u),O.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(u.pushLight(D),D.castShadow&&u.pushShadow(D))}),y!==O&&y.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(u.pushLight(D),D.castShadow&&u.pushShadow(D))}),u.setupLights();const B=new Set;return y.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const te=D.material;if(te)if(Array.isArray(te))for(let de=0;de<te.length;de++){const _e=te[de];je(_e,O,D),B.add(_e)}else je(te,O,D),B.add(te)}),E.pop(),u=null,B},this.compileAsync=function(y,I,O=null){const B=this.compile(y,I,O);return new Promise(D=>{function te(){if(B.forEach(function(de){we.get(de).currentProgram.isReady()&&B.delete(de)}),B.size===0){D(y);return}setTimeout(te,10)}ze.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Bt=null;function nn(y){Bt&&Bt(y)}function io(){Un.stop()}function so(){Un.start()}const Un=new gc;Un.setAnimationLoop(nn),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(y){Bt=y,V.setAnimationLoop(y),y===null?Un.stop():Un.start()},V.addEventListener("sessionstart",io),V.addEventListener("sessionend",so),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(I),I=V.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,I,L),u=We.get(y,E.length),u.init(I),E.push(u),Re.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),X.setFromProjectionMatrix(Re),Me=this.localClippingEnabled,ne=ee.init(this.clippingPlanes,Me),m=me.get(y,b.length),m.init(),b.push(m),V.enabled===!0&&V.isPresenting===!0){const te=M.xr.getDepthSensingMesh();te!==null&&nr(te,I,-1/0,M.sortObjects)}nr(y,I,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(se,re),Ve=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Ve&&Ae.addToRenderList(m,y),this.info.render.frame++,ne===!0&&ee.beginShadows();const O=u.state.shadowsArray;ge.render(O,y,I),ne===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,D=m.transmissive;if(u.setupLights(),I.isArrayCamera){const te=I.cameras;if(D.length>0)for(let de=0,_e=te.length;de<_e;de++){const ye=te[de];ao(B,D,y,ye)}Ve&&Ae.render(y);for(let de=0,_e=te.length;de<_e;de++){const ye=te[de];ro(m,y,ye,ye.viewport)}}else D.length>0&&ao(B,D,y,I),Ve&&Ae.render(y),ro(m,y,I);L!==null&&(w.updateMultisampleRenderTarget(L),w.updateRenderTargetMipmap(L)),y.isScene===!0&&y.onAfterRender(M,y,I),tt.resetDefaultState(),S=-1,x=null,E.pop(),E.length>0?(u=E[E.length-1],ne===!0&&ee.setGlobalState(M.clippingPlanes,u.state.camera)):u=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function nr(y,I,O,B){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)u.pushLight(y),y.castShadow&&u.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||X.intersectsSprite(y)){B&&Oe.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Re);const de=$.update(y),_e=y.material;_e.visible&&m.push(y,de,_e,O,Oe.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||X.intersectsObject(y))){const de=$.update(y),_e=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Oe.copy(y.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Oe.copy(de.boundingSphere.center)),Oe.applyMatrix4(y.matrixWorld).applyMatrix4(Re)),Array.isArray(_e)){const ye=de.groups;for(let Pe=0,De=ye.length;Pe<De;Pe++){const xe=ye[Pe],Xe=_e[xe.materialIndex];Xe&&Xe.visible&&m.push(y,de,Xe,O,Oe.z,xe)}}else _e.visible&&m.push(y,de,_e,O,Oe.z,null)}}const te=y.children;for(let de=0,_e=te.length;de<_e;de++)nr(te[de],I,O,B)}function ro(y,I,O,B){const D=y.opaque,te=y.transmissive,de=y.transparent;u.setupLightsView(O),ne===!0&&ee.setGlobalState(M.clippingPlanes,O),B&&Te.viewport(R.copy(B)),D.length>0&&ss(D,I,O),te.length>0&&ss(te,I,O),de.length>0&&ss(de,I,O),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function ao(y,I,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[B.id]===void 0&&(u.state.transmissionRenderTarget[B.id]=new jn(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?ts:yn,minFilter:Xn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const te=u.state.transmissionRenderTarget[B.id],de=B.viewport||R;te.setSize(de.z,de.w);const _e=M.getRenderTarget();M.setRenderTarget(te),M.getClearColor(W),q=M.getClearAlpha(),q<1&&M.setClearColor(16777215,.5),M.clear(),Ve&&Ae.render(O);const ye=M.toneMapping;M.toneMapping=Pn;const Pe=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),u.setupLightsView(B),ne===!0&&ee.setGlobalState(M.clippingPlanes,B),ss(y,O,B),w.updateMultisampleRenderTarget(te),w.updateRenderTargetMipmap(te),ze.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let xe=0,Xe=I.length;xe<Xe;xe++){const nt=I[xe],st=nt.object,Et=nt.geometry,qe=nt.material,be=nt.group;if(qe.side===fn&&st.layers.test(B.layers)){const sn=qe.side;qe.side=wt,qe.needsUpdate=!0,oo(st,O,B,Et,qe,be),qe.side=sn,qe.needsUpdate=!0,De=!0}}De===!0&&(w.updateMultisampleRenderTarget(te),w.updateRenderTargetMipmap(te))}M.setRenderTarget(_e),M.setClearColor(W,q),Pe!==void 0&&(B.viewport=Pe),M.toneMapping=ye}function ss(y,I,O){const B=I.isScene===!0?I.overrideMaterial:null;for(let D=0,te=y.length;D<te;D++){const de=y[D],_e=de.object,ye=de.geometry,Pe=B===null?de.material:B,De=de.group;_e.layers.test(O.layers)&&oo(_e,I,O,ye,Pe,De)}}function oo(y,I,O,B,D,te){y.onBeforeRender(M,I,O,B,D,te),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),D.onBeforeRender(M,I,O,B,y,te),D.transparent===!0&&D.side===fn&&D.forceSinglePass===!1?(D.side=wt,D.needsUpdate=!0,M.renderBufferDirect(O,I,B,D,y,te),D.side=In,D.needsUpdate=!0,M.renderBufferDirect(O,I,B,D,y,te),D.side=fn):M.renderBufferDirect(O,I,B,D,y,te),y.onAfterRender(M,I,O,B,D,te)}function rs(y,I,O){I.isScene!==!0&&(I=ot);const B=we.get(y),D=u.state.lights,te=u.state.shadowsArray,de=D.state.version,_e=Se.getParameters(y,D.state,te,I,O),ye=Se.getProgramCacheKey(_e);let Pe=B.programs;B.environment=y.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(y.isMeshStandardMaterial?k:_).get(y.envMap||B.environment),B.envMapRotation=B.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,Pe===void 0&&(y.addEventListener("dispose",Ie),Pe=new Map,B.programs=Pe);let De=Pe.get(ye);if(De!==void 0){if(B.currentProgram===De&&B.lightsStateVersion===de)return co(y,_e),De}else _e.uniforms=Se.getUniforms(y),y.onBeforeCompile(_e,M),De=Se.acquireProgram(_e,ye),Pe.set(ye,De),B.uniforms=_e.uniforms;const xe=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(xe.clippingPlanes=ee.uniform),co(y,_e),B.needsLights=Gc(y),B.lightsStateVersion=de,B.needsLights&&(xe.ambientLightColor.value=D.state.ambient,xe.lightProbe.value=D.state.probe,xe.directionalLights.value=D.state.directional,xe.directionalLightShadows.value=D.state.directionalShadow,xe.spotLights.value=D.state.spot,xe.spotLightShadows.value=D.state.spotShadow,xe.rectAreaLights.value=D.state.rectArea,xe.ltc_1.value=D.state.rectAreaLTC1,xe.ltc_2.value=D.state.rectAreaLTC2,xe.pointLights.value=D.state.point,xe.pointLightShadows.value=D.state.pointShadow,xe.hemisphereLights.value=D.state.hemi,xe.directionalShadowMap.value=D.state.directionalShadowMap,xe.directionalShadowMatrix.value=D.state.directionalShadowMatrix,xe.spotShadowMap.value=D.state.spotShadowMap,xe.spotLightMatrix.value=D.state.spotLightMatrix,xe.spotLightMap.value=D.state.spotLightMap,xe.pointShadowMap.value=D.state.pointShadowMap,xe.pointShadowMatrix.value=D.state.pointShadowMatrix),B.currentProgram=De,B.uniformsList=null,De}function lo(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=Gs.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function co(y,I){const O=we.get(y);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.batchingColor=I.batchingColor,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.instancingMorph=I.instancingMorph,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function zc(y,I,O,B,D){I.isScene!==!0&&(I=ot),w.resetTextureUnits();const te=I.fog,de=B.isMeshStandardMaterial?I.environment:null,_e=L===null?M.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Li,ye=(B.isMeshStandardMaterial?k:_).get(B.envMap||de),Pe=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,De=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),xe=!!O.morphAttributes.position,Xe=!!O.morphAttributes.normal,nt=!!O.morphAttributes.color;let st=Pn;B.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(st=M.toneMapping);const Et=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,qe=Et!==void 0?Et.length:0,be=we.get(B),sn=u.state.lights;if(ne===!0&&(Me===!0||y!==x)){const Ut=y===x&&B.id===S;ee.setState(B,y,Ut)}let Ye=!1;B.version===be.__version?(be.needsLights&&be.lightsStateVersion!==sn.state.version||be.outputColorSpace!==_e||D.isBatchedMesh&&be.batching===!1||!D.isBatchedMesh&&be.batching===!0||D.isBatchedMesh&&be.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&be.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&be.instancing===!1||!D.isInstancedMesh&&be.instancing===!0||D.isSkinnedMesh&&be.skinning===!1||!D.isSkinnedMesh&&be.skinning===!0||D.isInstancedMesh&&be.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&be.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&be.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&be.instancingMorph===!1&&D.morphTexture!==null||be.envMap!==ye||B.fog===!0&&be.fog!==te||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==ee.numPlanes||be.numIntersection!==ee.numIntersection)||be.vertexAlphas!==Pe||be.vertexTangents!==De||be.morphTargets!==xe||be.morphNormals!==Xe||be.morphColors!==nt||be.toneMapping!==st||be.morphTargetsCount!==qe)&&(Ye=!0):(Ye=!0,be.__version=B.version);let zt=be.currentProgram;Ye===!0&&(zt=rs(B,I,D));let Zn=!1,Tt=!1,Ni=!1;const rt=zt.getUniforms(),Xt=be.uniforms;if(Te.useProgram(zt.program)&&(Zn=!0,Tt=!0,Ni=!0),B.id!==S&&(S=B.id,Tt=!0),Zn||x!==y){Te.buffers.depth.getReversed()?(oe.copy(y.projectionMatrix),Vh(oe),Wh(oe),rt.setValue(U,"projectionMatrix",oe)):rt.setValue(U,"projectionMatrix",y.projectionMatrix),rt.setValue(U,"viewMatrix",y.matrixWorldInverse);const xn=rt.map.cameraPosition;xn!==void 0&&xn.setValue(U,Le.setFromMatrixPosition(y.matrixWorld)),He.logarithmicDepthBuffer&&rt.setValue(U,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&rt.setValue(U,"isOrthographic",y.isOrthographicCamera===!0),x!==y&&(x=y,Tt=!0,Ni=!0)}if(D.isSkinnedMesh){rt.setOptional(U,D,"bindMatrix"),rt.setOptional(U,D,"bindMatrixInverse");const Ut=D.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),rt.setValue(U,"boneTexture",Ut.boneTexture,w))}D.isBatchedMesh&&(rt.setOptional(U,D,"batchingTexture"),rt.setValue(U,"batchingTexture",D._matricesTexture,w),rt.setOptional(U,D,"batchingIdTexture"),rt.setValue(U,"batchingIdTexture",D._indirectTexture,w),rt.setOptional(U,D,"batchingColorTexture"),D._colorsTexture!==null&&rt.setValue(U,"batchingColorTexture",D._colorsTexture,w));const ki=O.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&Ce.update(D,O,zt),(Tt||be.receiveShadow!==D.receiveShadow)&&(be.receiveShadow=D.receiveShadow,rt.setValue(U,"receiveShadow",D.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Xt.envMap.value=ye,Xt.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(Xt.envMapIntensity.value=I.environmentIntensity),Tt&&(rt.setValue(U,"toneMappingExposure",M.toneMappingExposure),be.needsLights&&Hc(Xt,Ni),te&&B.fog===!0&&le.refreshFogUniforms(Xt,te),le.refreshMaterialUniforms(Xt,B,G,J,u.state.transmissionRenderTarget[y.id]),Gs.upload(U,lo(be),Xt,w)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Gs.upload(U,lo(be),Xt,w),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&rt.setValue(U,"center",D.center),rt.setValue(U,"modelViewMatrix",D.modelViewMatrix),rt.setValue(U,"normalMatrix",D.normalMatrix),rt.setValue(U,"modelMatrix",D.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ut=B.uniformsGroups;for(let xn=0,Mn=Ut.length;xn<Mn;xn++){const ho=Ut[xn];P.update(ho,zt),P.bind(ho,zt)}}return zt}function Hc(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function Gc(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(y,I,O){we.get(y.texture).__webglTexture=I,we.get(y.depthTexture).__webglTexture=O;const B=we.get(y);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,I){const O=we.get(y);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(y,I=0,O=0){L=y,T=I,A=O;let B=!0,D=null,te=!1,de=!1;if(y){const ye=we.get(y);if(ye.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(U.FRAMEBUFFER,null),B=!1;else if(ye.__webglFramebuffer===void 0)w.setupRenderTarget(y);else if(ye.__hasExternalTextures)w.rebindTextures(y,we.get(y.texture).__webglTexture,we.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const xe=y.depthTexture;if(ye.__boundDepthTexture!==xe){if(xe!==null&&we.has(xe)&&(y.width!==xe.image.width||y.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(y)}}const Pe=y.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(de=!0);const De=we.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(De[I])?D=De[I][O]:D=De[I],te=!0):y.samples>0&&w.useMultisampledRTT(y)===!1?D=we.get(y).__webglMultisampledFramebuffer:Array.isArray(De)?D=De[O]:D=De,R.copy(y.viewport),z.copy(y.scissor),F=y.scissorTest}else R.copy(Ee).multiplyScalar(G).floor(),z.copy(Fe).multiplyScalar(G).floor(),F=et;if(Te.bindFramebuffer(U.FRAMEBUFFER,D)&&B&&Te.drawBuffers(y,D),Te.viewport(R),Te.scissor(z),Te.setScissorTest(F),te){const ye=we.get(y.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,ye.__webglTexture,O)}else if(de){const ye=we.get(y.texture),Pe=I||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,ye.__webglTexture,O||0,Pe)}S=-1},this.readRenderTargetPixels=function(y,I,O,B,D,te,de){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=we.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&de!==void 0&&(_e=_e[de]),_e){Te.bindFramebuffer(U.FRAMEBUFFER,_e);try{const ye=y.texture,Pe=ye.format,De=ye.type;if(!He.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-B&&O>=0&&O<=y.height-D&&U.readPixels(I,O,B,D,Ne.convert(Pe),Ne.convert(De),te)}finally{const ye=L!==null?we.get(L).__webglFramebuffer:null;Te.bindFramebuffer(U.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(y,I,O,B,D,te,de){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=we.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&de!==void 0&&(_e=_e[de]),_e){const ye=y.texture,Pe=ye.format,De=ye.type;if(!He.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=y.width-B&&O>=0&&O<=y.height-D){Te.bindFramebuffer(U.FRAMEBUFFER,_e);const xe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,xe),U.bufferData(U.PIXEL_PACK_BUFFER,te.byteLength,U.STREAM_READ),U.readPixels(I,O,B,D,Ne.convert(Pe),Ne.convert(De),0);const Xe=L!==null?we.get(L).__webglFramebuffer:null;Te.bindFramebuffer(U.FRAMEBUFFER,Xe);const nt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Gh(U,nt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,xe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,te),U.deleteBuffer(xe),U.deleteSync(nt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,I=null,O=0){y.isTexture!==!0&&(qi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,y=arguments[1]);const B=Math.pow(2,-O),D=Math.floor(y.image.width*B),te=Math.floor(y.image.height*B),de=I!==null?I.x:0,_e=I!==null?I.y:0;w.setTexture2D(y,0),U.copyTexSubImage2D(U.TEXTURE_2D,O,0,0,de,_e,D,te),Te.unbindTexture()},this.copyTextureToTexture=function(y,I,O=null,B=null,D=0){y.isTexture!==!0&&(qi("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,y=arguments[1],I=arguments[2],D=arguments[3]||0,O=null);let te,de,_e,ye,Pe,De,xe,Xe,nt;const st=y.isCompressedTexture?y.mipmaps[D]:y.image;O!==null?(te=O.max.x-O.min.x,de=O.max.y-O.min.y,_e=O.isBox3?O.max.z-O.min.z:1,ye=O.min.x,Pe=O.min.y,De=O.isBox3?O.min.z:0):(te=st.width,de=st.height,_e=st.depth||1,ye=0,Pe=0,De=0),B!==null?(xe=B.x,Xe=B.y,nt=B.z):(xe=0,Xe=0,nt=0);const Et=Ne.convert(I.format),qe=Ne.convert(I.type);let be;I.isData3DTexture?(w.setTexture3D(I,0),be=U.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(w.setTexture2DArray(I,0),be=U.TEXTURE_2D_ARRAY):(w.setTexture2D(I,0),be=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,I.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,I.unpackAlignment);const sn=U.getParameter(U.UNPACK_ROW_LENGTH),Ye=U.getParameter(U.UNPACK_IMAGE_HEIGHT),zt=U.getParameter(U.UNPACK_SKIP_PIXELS),Zn=U.getParameter(U.UNPACK_SKIP_ROWS),Tt=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,st.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,st.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ye),U.pixelStorei(U.UNPACK_SKIP_ROWS,Pe),U.pixelStorei(U.UNPACK_SKIP_IMAGES,De);const Ni=y.isDataArrayTexture||y.isData3DTexture,rt=I.isDataArrayTexture||I.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const Xt=we.get(y),ki=we.get(I),Ut=we.get(Xt.__renderTarget),xn=we.get(ki.__renderTarget);Te.bindFramebuffer(U.READ_FRAMEBUFFER,Ut.__webglFramebuffer),Te.bindFramebuffer(U.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let Mn=0;Mn<_e;Mn++)Ni&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,we.get(y).__webglTexture,D,De+Mn),y.isDepthTexture?(rt&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,we.get(I).__webglTexture,D,nt+Mn),U.blitFramebuffer(ye,Pe,te,de,xe,Xe,te,de,U.DEPTH_BUFFER_BIT,U.NEAREST)):rt?U.copyTexSubImage3D(be,D,xe,Xe,nt+Mn,ye,Pe,te,de):U.copyTexSubImage2D(be,D,xe,Xe,nt+Mn,ye,Pe,te,de);Te.bindFramebuffer(U.READ_FRAMEBUFFER,null),Te.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else rt?y.isDataTexture||y.isData3DTexture?U.texSubImage3D(be,D,xe,Xe,nt,te,de,_e,Et,qe,st.data):I.isCompressedArrayTexture?U.compressedTexSubImage3D(be,D,xe,Xe,nt,te,de,_e,Et,st.data):U.texSubImage3D(be,D,xe,Xe,nt,te,de,_e,Et,qe,st):y.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,D,xe,Xe,te,de,Et,qe,st.data):y.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,D,xe,Xe,st.width,st.height,Et,st.data):U.texSubImage2D(U.TEXTURE_2D,D,xe,Xe,te,de,Et,qe,st);U.pixelStorei(U.UNPACK_ROW_LENGTH,sn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ye),U.pixelStorei(U.UNPACK_SKIP_PIXELS,zt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Zn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Tt),D===0&&I.generateMipmaps&&U.generateMipmap(be),Te.unbindTexture()},this.copyTextureToTexture3D=function(y,I,O=null,B=null,D=0){return y.isTexture!==!0&&(qi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,B=arguments[1]||null,y=arguments[2],I=arguments[3],D=arguments[4]||0),qi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,I,O,B,D)},this.initRenderTarget=function(y){we.get(y).__webglFramebuffer===void 0&&w.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?w.setTextureCube(y,0):y.isData3DTexture?w.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?w.setTexture2DArray(y,0):w.setTexture2D(y,0),Te.unbindTexture()},this.resetState=function(){T=0,A=0,L=null,Te.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class ja{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Be(e),this.near=t,this.far=n}clone(){return new ja(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ng extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qt,this.environmentIntensity=1,this.environmentRotation=new Qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ig{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ra,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xt=new C;class qs{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=jt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=jt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=jt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=jt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array),r=Je(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new $t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new qs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Vs extends Di{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ui;const Hi=new C,fi=new C,pi=new C,mi=new fe,Gi=new fe,Sc=new at,Rs=new C,Vi=new C,Cs=new C,cl=new fe,Dr=new fe,hl=new fe;class Ur extends pt{constructor(e=new Vs){if(super(),this.isSprite=!0,this.type="Sprite",ui===void 0){ui=new en;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ig(t,5);ui.setIndex([0,1,2,0,2,3]),ui.setAttribute("position",new qs(n,3,0,!1)),ui.setAttribute("uv",new qs(n,2,3,!1))}this.geometry=ui,this.material=e,this.center=new fe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fi.setFromMatrixScale(this.matrixWorld),Sc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),pi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fi.multiplyScalar(-pi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Ps(Rs.set(-.5,-.5,0),pi,a,fi,s,r),Ps(Vi.set(.5,-.5,0),pi,a,fi,s,r),Ps(Cs.set(.5,.5,0),pi,a,fi,s,r),cl.set(0,0),Dr.set(1,0),hl.set(1,1);let o=e.ray.intersectTriangle(Rs,Vi,Cs,!1,Hi);if(o===null&&(Ps(Vi.set(-.5,.5,0),pi,a,fi,s,r),Dr.set(0,1),o=e.ray.intersectTriangle(Rs,Cs,Vi,!1,Hi),o===null))return;const l=e.ray.origin.distanceTo(Hi);l<e.near||l>e.far||t.push({distance:l,point:Hi.clone(),uv:Ot.getInterpolation(Hi,Rs,Vi,Cs,cl,Dr,hl,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ps(i,e,t,n,s,r){mi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Gi.x=r*mi.x-s*mi.y,Gi.y=s*mi.x+r*mi.y):Gi.copy(mi),i.copy(e),i.x+=Gi.x,i.y+=Gi.y,i.applyMatrix4(Sc)}class dl extends yt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,p=(a-h)/f;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new fe:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new C,s=[],r=[],a=[],o=new C,l=new at;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(mt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(mt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ka extends tn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*d+this.aX,c=f*d+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class sg extends Ka{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Za(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+d)+(l-o)/d;f*=h,p*=h,s(a,o,f,p)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const Ls=new C,Nr=new Za,kr=new Za,Fr=new Za;class rg extends tn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Ls.subVectors(s[0],s[1]).add(s[0]),c=Ls);const d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ls.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ls),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Nr.initNonuniformCatmullRom(c.x,d.x,f.x,h.x,g,v,m),kr.initNonuniformCatmullRom(c.y,d.y,f.y,h.y,g,v,m),Fr.initNonuniformCatmullRom(c.z,d.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Nr.initCatmullRom(c.x,d.x,f.x,h.x,this.tension),kr.initCatmullRom(c.y,d.y,f.y,h.y,this.tension),Fr.initCatmullRom(c.z,d.z,f.z,h.z,this.tension));return n.set(Nr.calc(l),kr.calc(l),Fr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ul(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function ag(i,e){const t=1-i;return t*t*e}function og(i,e){return 2*(1-i)*i*e}function lg(i,e){return i*i*e}function Ki(i,e,t,n){return ag(i,e)+og(i,t)+lg(i,n)}function cg(i,e){const t=1-i;return t*t*t*e}function hg(i,e){const t=1-i;return 3*t*t*i*e}function dg(i,e){return 3*(1-i)*i*i*e}function ug(i,e){return i*i*i*e}function Zi(i,e,t,n,s){return cg(i,e)+hg(i,t)+dg(i,n)+ug(i,s)}class bc extends tn{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zi(e,s.x,r.x,a.x,o.x),Zi(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fg extends tn{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Zi(e,s.x,r.x,a.x,o.x),Zi(e,s.y,r.y,a.y,o.y),Zi(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ec extends tn{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pg extends tn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wc extends tn{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ki(e,s.x,r.x,a.x),Ki(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mg extends tn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ki(e,s.x,r.x,a.x),Ki(e,s.y,r.y,a.y),Ki(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tc extends tn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(ul(o,l.x,c.x,h.x,d.x),ul(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new fe().fromArray(s))}return this}}var fl=Object.freeze({__proto__:null,ArcCurve:sg,CatmullRomCurve3:rg,CubicBezierCurve:bc,CubicBezierCurve3:fg,EllipseCurve:Ka,LineCurve:Ec,LineCurve3:pg,QuadraticBezierCurve:wc,QuadraticBezierCurve3:mg,SplineCurve:Tc});class gg extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new fl[s.type]().fromJSON(s))}return this}}class vg extends gg{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ec(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new wc(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new bc(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Tc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new Ka(e,t,n,s,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ja extends en{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=mt(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/t,d=new C,f=new fe,p=new C,g=new C,v=new C;let m=0,u=0;for(let b=0;b<=e.length-1;b++)switch(b){case 0:m=e[b+1].x-e[b].x,u=e[b+1].y-e[b].y,p.x=u*1,p.y=-m,p.z=u*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[b+1].x-e[b].x,u=e[b+1].y-e[b].y,p.x=u*1,p.y=-m,p.z=u*0,g.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(g)}for(let b=0;b<=t;b++){const E=n+b*h*s,M=Math.sin(E),N=Math.cos(E);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*M,d.y=e[T].y,d.z=e[T].x*N,a.push(d.x,d.y,d.z),f.x=b/t,f.y=T/(e.length-1),o.push(f.x,f.y);const A=l[3*T+0]*M,L=l[3*T+1],S=l[3*T+0]*N;c.push(A,L,S)}}for(let b=0;b<t;b++)for(let E=0;E<e.length-1;E++){const M=E+b*e.length,N=M,T=M+e.length,A=M+e.length+1,L=M+1;r.push(N,T,L),r.push(A,L,T)}this.setIndex(r),this.setAttribute("position",new It(a,3)),this.setAttribute("uv",new It(o,2)),this.setAttribute("normal",new It(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.points,e.segments,e.phiStart,e.phiLength)}}class Qa extends Ja{constructor(e=1,t=1,n=4,s=8){const r=new vg;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new Qa(e.radius,e.length,e.capSegments,e.radialSegments)}}class eo extends en{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],f=[],p=[];let g=0;const v=[],m=n/2;let u=0;b(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new It(d,3)),this.setAttribute("normal",new It(f,3)),this.setAttribute("uv",new It(p,2));function b(){const M=new C,N=new C;let T=0;const A=(t-e)/n;for(let L=0;L<=r;L++){const S=[],x=L/r,R=x*(t-e)+e;for(let z=0;z<=s;z++){const F=z/s,W=F*l+o,q=Math.sin(W),H=Math.cos(W);N.x=R*q,N.y=-x*n+m,N.z=R*H,d.push(N.x,N.y,N.z),M.set(q,A,H).normalize(),f.push(M.x,M.y,M.z),p.push(F,1-x),S.push(g++)}v.push(S)}for(let L=0;L<s;L++)for(let S=0;S<r;S++){const x=v[S][L],R=v[S+1][L],z=v[S+1][L+1],F=v[S][L+1];(e>0||S!==0)&&(h.push(x,R,F),T+=3),(t>0||S!==r-1)&&(h.push(R,z,F),T+=3)}c.addGroup(u,T,0),u+=T}function E(M){const N=g,T=new fe,A=new C;let L=0;const S=M===!0?e:t,x=M===!0?1:-1;for(let z=1;z<=s;z++)d.push(0,m*x,0),f.push(0,x,0),p.push(.5,.5),g++;const R=g;for(let z=0;z<=s;z++){const W=z/s*l+o,q=Math.cos(W),H=Math.sin(W);A.x=S*H,A.y=m*x,A.z=S*q,d.push(A.x,A.y,A.z),f.push(0,x,0),T.x=q*.5+.5,T.y=H*.5*x+.5,p.push(T.x,T.y),g++}for(let z=0;z<s;z++){const F=N+z,W=R+z;M===!0?h.push(W,W+1,F):h.push(W+1,W,F),L+=3}c.addGroup(u,L,M===!0?1:2),u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wi extends Di{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ic,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const pl={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class _g{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const yg=new _g;class to{constructor(e){this.manager=e!==void 0?e:yg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}to.DEFAULT_MATERIAL_NAME="__DEFAULT";class xg extends to{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=pl.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=es("img");function l(){h(),pl.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(d){h(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Mg extends to{constructor(e){super(e)}load(e,t,n,s){const r=new yt,a=new xg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class tr extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Sg extends tr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Or=new at,ml=new C,gl=new C;class Ac{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xa,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(ml),gl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gl),t.updateMatrixWorld(),Or.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Or),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Or)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const vl=new at,$i=new C,Br=new C;class bg extends Ac{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new fe(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),$i.setFromMatrixPosition(e.matrixWorld),n.position.copy($i),Br.copy(n.position),Br.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Br),n.updateMatrixWorld(),s.makeTranslation(-$i.x,-$i.y,-$i.z),vl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vl)}}class Eg extends tr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new bg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class wg extends Ac{constructor(){super(new qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tg extends tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new wg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ag extends tr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Rg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_l(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=_l();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function _l(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oa);const Xi={url:new URL(""+new URL("tiny-dungeon-BMWnvaym.png",import.meta.url).href,import.meta.url).href,cols:12,rows:11},yl={fighter:{col:0,row:8},cleric:{col:2,row:7},wizard:{col:0,row:7},rogue:{col:4,row:9},alchemist:{col:4,row:7}},Rc={"rat-swarm":{col:3,row:10},skeleton:{col:4,row:10},"goblin-gang":{col:1,row:7},gelatinous:{col:0,row:9},wraith:{col:1,row:10},"dragon-whelp":{col:2,row:9},"ogre-king":{col:1,row:9},"bone-warden":{col:4,row:10},"grave-mites":{col:2,row:10},"barrow-shade":{col:1,row:10},"hungry-ghoul":{col:1,row:9},"shrouded-king":{col:3,row:9},"abbot-of-worms":{col:1,row:10},salamander:{col:2,row:9},"cinder-bats":{col:0,row:10},"magma-toad":{col:0,row:9},"obsidian-golem":{col:4,row:10},"cinder-wyrm":{col:2,row:9},"forge-tyrant":{col:1,row:9},"flying-tomes":{col:0,row:10},"ink-elemental":{col:0,row:9},"spectral-scribe":{col:1,row:10},"index-wight":{col:3,row:9},archivist:{col:3,row:9},"grand-errata":{col:4,row:10},"sludge-elemental":{col:0,row:9},"potion-rats":{col:3,row:10},"mutant-vine":{col:2,row:10},"failed-homunculus":{col:1,row:9},"mad-alchemist":{col:3,row:9},"the-precipitate":{col:0,row:9},"castle-thrall":{col:1,row:7},"bat-cloud":{col:0,row:10},"pale-hound":{col:4,row:10},"crimson-mist":{col:1,row:10},"vampire-lord":{col:3,row:9},"the-bride":{col:3,row:8},"jar-imp":{col:2,row:9},"pickled-thing":{col:0,row:9},"root-golem":{col:4,row:10},"bog-toad":{col:0,row:9},"bog-witch":{col:4,row:8},"the-cauldron":{col:1,row:9},"frost-wisp":{col:1,row:10},"ice-crawler":{col:2,row:10},"thawed-dead":{col:1,row:7},"cinder-imp":{col:2,row:9},"mad-pyromancer":{col:0,row:7},"glacier-heart":{col:4,row:10}},Cg={col:1,row:9},gi={treasure:{col:5,row:7},"treasure-open":{col:7,row:7},vault:{col:6,row:7},mimic:{col:8,row:7},trap:{col:4,row:3},library:{col:5,row:5},shrine:{col:4,row:2},lab:{col:8,row:3},materials:{col:6,row:5},entrance:{col:10,row:3}},Pg={slash:{col:2,row:5}};function Lg(i){for(const[e,t]of Object.entries(i))Rc[e]=t}function Ig(i){return yl[i]||yl.fighter}function Dg(i){return Rc[i]||Cg}function xl(i){return i.type==="treasure"?i.cleared?gi["treasure-open"]:gi.treasure:i.type==="vault"?i.cleared?gi["treasure-open"]:gi.vault:gi[i.type]?gi[i.type]:null}const Is=3.2,Ml={fighter:13126716,cleric:15258762,wizard:8018664,rogue:4885084,alchemist:3979432},Ug={fight:{kind:"slash"},"spell-strike":{kind:"glow",color:"#ff8a3c"},"turn-undead":{kind:"glow",color:"#ffe9a0"},"deep-study":{kind:"glow",color:"#b07ae8"},"spell-bypass":{kind:"glow",color:"#b07ae8"},rest:{kind:"glow",color:"#ffe9a0"},alchemy:{kind:"glow",color:"#3cb8a8"},disarm:{kind:"glow",color:"#8fb8dd"},"push-through":{kind:"glow",color:"#e05555"},brace:{kind:"glow",color:"#e05555"},scatter:{kind:"glow",color:"#e05555"},loot:{kind:"glow",color:"#ffd75e"},desecrate:{kind:"glow",color:"#ffd75e"}};class Ng{constructor(e){this.canvas=document.getElementById(e),this.renderer=new tg({canvas:this.canvas,antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Wl,this.scene=new ng,this.scene.background=new Be(657413),this.scene.fog=new ja(657413,44,110),this.scene.add(new Ag(11187408,1.1)),this.scene.add(new Sg(9083578,3813416,.9));const t=new Tg(11189213,1.3);t.position.set(-10,20,6),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.left=-30,t.shadow.camera.right=30,t.shadow.camera.top=30,t.shadow.camera.bottom=-30,this.scene.add(t),this.torch=new Eg(16751164,30,12,1.8),this.torch.position.set(0,2.2,0),this.scene.add(this.torch),this.staticGroup=new pn,this.iconGroup=new pn,this.occupantGroup=new pn,this.partyGroup=new pn,this.fxGroup=new pn,this.scene.add(this.staticGroup,this.iconGroup,this.occupantGroup,this.partyGroup,this.fxGroup),this.spriteMaterials=new Map,this.builtKey=null,this.roomPositions=[],this.clock=new Rg,this.effects=[],this.tileMats=new Map,this.atlasReady=!1,this.atlasTex=new Mg().load(Xi.url,()=>{this.atlasReady=!0,this.lastState&&this.render(this.lastState)}),this.atlasTex.magFilter=Lt,this.atlasTex.minFilter=Lt,this.atlasTex.colorSpace=St,this.meepleGeo=new Qa(.16,.26,4,10),this.meepleMats={};for(const[s,r]of Object.entries(Ml))this.meepleMats[s]=new Wi({color:r,roughness:.6});this.baseGeo=new eo(.24,.28,.07,16),this.baseMats={};for(const[s,r]of Object.entries(Ml))this.baseMats[s]=new Wi({color:r,roughness:.7});this.disposed=!1;const n=()=>{this.disposed||(requestAnimationFrame(n),this.animateFrame())};n(),typeof window<"u"&&(window.__iso=this)}render(e){this.lastState=e;const t=e.dungeon.rooms;this.resize(t);const n=t.map(s=>`${s.type}${s.secret&&!s.discovered?"?":""}`).join(",");this.builtKey!==n&&(this.buildDungeon(t,e.dungeon.edges),this.builtKey=n),this.updateIcons(e),this.updateOccupants(e),this.updateParty(e),this.animateFrame()}tileMaterial(e){const t=`${e.col},${e.row}`;if(!this.tileMats.has(t)){const n=this.atlasTex.clone();n.needsUpdate=!0,n.repeat.set(1/Xi.cols,1/Xi.rows),n.offset.set(e.col/Xi.cols,1-(e.row+1)/Xi.rows),this.tileMats.set(t,new Vs({map:n,transparent:!0}))}return this.tileMats.get(t)}tileSprite(e,t=1){const n=new Ur(this.tileMaterial(e));return n.scale.set(t,t,1),n}updateOccupants(e){if(this.occupantGroup.clear(),!this.atlasReady)return;const t=e.dungeon.rooms,n=this.knownSet(e);t.forEach((s,r)=>{if(s.secret&&!s.discovered)return;const{x:a,z:o}=this.roomPositions[r];if(!(n.has(r)||s.type==="boss"))return;let c=null;if((s.type==="monster"||s.type==="boss")&&s.monster&&!s.cleared){const h=s.type==="boss"?1.7:1.05;c=this.tileSprite(Dg(s.monster.kind),h),c.position.set(a,.2+h/2,o),c.userData.sway=!0}else{const h=xl(s);h&&(c=this.tileSprite(h,.95),c.position.set(a,.66,o),s.cleared&&(c.material=c.material.clone(),c.material.opacity=.55))}c&&(c.userData.baseY=c.position.y,c.userData.phase=r*2.3,this.occupantGroup.add(c))})}roomWorldPos(e){return{x:e.x*Is,z:e.y*Is}}resize(e){const t=this.canvas.clientWidth||500,n=this.canvas.clientHeight||420;if(this.lastW===t&&this.lastH===n&&this.camera&&this.builtKey)return;this.lastW=t,this.lastH=n,this.renderer.setSize(t,n,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));const s=e.map(d=>d.x*Is),r=e.map(d=>d.y*Is),a=(Math.min(...s)+Math.max(...s))/2,o=(Math.min(...r)+Math.max(...r))/2,l=Math.max(Math.max(...s)-Math.min(...s),Math.max(...r)-Math.min(...r)),c=Math.max(8,l*.42+4),h=t/n;this.camera=new qa(-c*h,c*h,c,-c,.1,300),this.camera.position.set(a+20,24,o+20),this.camera.lookAt(a,0,o)}buildDungeon(e,t=null){this.staticGroup.clear(),this.roomPositions=e.map(o=>this.roomWorldPos(o));const n=new Kt(2.4,.35,2.4),s=new Kt(3.1,.5,3.1),r=o=>o.secret&&!o.discovered;e.forEach((o,l)=>{if(r(o))return;const{x:c,z:h}=this.roomPositions[l],d=(o.index*7%5-2)*.02,f=o.type==="boss"?5908006:o.type==="vault"?6969904:6380370,p=new Be(f);p.offsetHSL(0,0,d);const g=new bt(o.type==="boss"?s:n,new Wi({color:p,roughness:.95}));g.position.set(c,0,h),g.receiveShadow=!0,this.staticGroup.add(g);const v=new Wi({color:3486252,roughness:1}),m=new bt(new Kt(2.4,.7,.2),v);m.position.set(c,.5,h-1.15),m.castShadow=!0,this.staticGroup.add(m);const u=new bt(new Kt(.2,.7,2.4),v);u.position.set(c-1.15,.5,h),u.castShadow=!0,this.staticGroup.add(u)});const a=t||e.slice(1).map((o,l)=>({a:l,b:l+1}));for(const o of a){const l=e[o.a],c=e[o.b];if(!l||!c||r(l)||r(c))continue;const h=this.roomPositions[o.a],d=this.roomPositions[o.b],f=d.x-h.x,p=d.z-h.z,g=Math.sqrt(f*f+p*p),v=new bt(new Kt(g,.18,.8),new Wi({color:o.secret?2762272:4012595,roughness:1}));v.position.set(h.x+f/2,-.02,h.z+p/2),v.rotation.y=-Math.atan2(p,f),v.receiveShadow=!0,this.staticGroup.add(v)}}getSpriteMaterial(e){if(!this.spriteMaterials.has(e)){const t=document.createElement("canvas");t.width=128,t.height=128;const n=t.getContext("2d");n.font="92px serif",n.textAlign="center",n.textBaseline="middle",n.fillText(e,64,70);const s=new dl(t);s.colorSpace=St,this.spriteMaterials.set(e,new Vs({map:s,transparent:!0}))}return this.spriteMaterials.get(e)}knownSet(e){return new Set(e.knownIdxs||e.dungeon.rooms.map((t,n)=>n).filter(t=>t<=e.roomIndex+1))}updateIcons(e){this.iconGroup.clear();const t=e.dungeon.rooms,n=this.knownSet(e),s=e.currentRoomIndex??e.roomIndex;t.forEach((r,a)=>{if(r.secret&&!r.discovered)return;const{x:o,z:l}=this.roomPositions[a],c=n.has(a)||r.type==="boss",h=c?r.icon:"❓";if(c&&this.atlasReady&&((r.type==="monster"||r.type==="boss")&&r.monster&&!r.cleared||xl(r)))return;const d=new Ur(this.getSpriteMaterial(h)),f=r.type==="boss"?1.5:1;d.scale.set(f,f,1),d.position.set(o,1.35,l),d.material=d.material.clone(),d.material.opacity=r.cleared&&a!==s?.28:1,d.userData.baseY=1.35,d.userData.phase=a,this.iconGroup.add(d)})}updateParty(e){this.partyGroup.clear();const t=e.currentRoomIndex??Math.min(e.roomIndex,e.dungeon.rooms.length-1),{x:n,z:s}=this.roomPositions[t]||{x:0,z:0};this.torch.position.set(n,2.2,s);const r=e.dungeon.rooms[t],a=r&&r.monster&&!r.cleared&&(r.type==="monster"||r.type==="boss"),o=a?n-.75:n,l=a?s+.75:s,c=e.party.members.filter(d=>d.alive),h=c.length;c.forEach((d,f)=>{const p=f/Math.max(1,h)*Math.PI*2,g=h>1?Math.min(a?.5:.75,.28+h*.05):0,v=o+Math.cos(p)*g,m=l+Math.sin(p)*g,u=d.health/d.maxHealth<=.35;if(this.atlasReady){const b=this.tileSprite(Ig(d.class),.82);b.position.set(v,.72,m),b.userData.baseY=.72,b.userData.phase=f*1.7,u&&(b.material=b.material.clone(),b.material.color.set(12157056),b.scale.y=.68),this.partyGroup.add(b);const E=new bt(this.baseGeo,this.baseMats[d.class]||this.baseMats.fighter);E.position.set(v,.24,m),E.castShadow=!0,this.partyGroup.add(E)}else{const b=new bt(this.meepleGeo,this.meepleMats[d.class]||this.meepleMats.fighter);b.position.set(v,.55,m),b.castShadow=!0,b.userData.baseY=.55,b.userData.phase=f*1.7,this.partyGroup.add(b)}})}playEffect(e,t){const n=Ug[e];if(!n||!this.roomPositions[t])return;const{x:s,z:r}=this.roomPositions[t];let a;n.kind==="slash"&&this.atlasReady?(a=this.tileSprite(Pg.slash,1.1),a.material=a.material.clone()):(a=new Ur(this.glowMaterial(n.color||"#ffffff").clone()),a.scale.set(1.1,1.1,1)),a.position.set(s,1,r),this.fxGroup.add(a),this.effects.push({sprite:a,born:this.clock.getElapsedTime(),life:.7})}glowMaterial(e){const t=`glow:${e}`;if(!this.spriteMaterials.has(t)){const n=document.createElement("canvas");n.width=128,n.height=128;const s=n.getContext("2d"),r=s.createRadialGradient(64,64,6,64,64,62);r.addColorStop(0,e),r.addColorStop(.45,e+"aa"),r.addColorStop(1,e+"00"),s.fillStyle=r,s.fillRect(0,0,128,128);const a=new dl(n);a.colorSpace=St,this.spriteMaterials.set(t,new Vs({map:a,transparent:!0,blending:Gr,depthWrite:!1}))}return this.spriteMaterials.get(t)}animateFrame(){if(!this.camera)return;const e=this.clock.getElapsedTime();this.torch.intensity=26+Math.sin(e*9)*3+Math.sin(e*23)*2;for(const t of this.iconGroup.children)t.position.y=t.userData.baseY+Math.sin(e*1.6+t.userData.phase)*.06;for(const t of this.partyGroup.children)t.userData.baseY!==void 0&&(t.position.y=t.userData.baseY+Math.abs(Math.sin(e*2.2+t.userData.phase))*.05);for(const t of this.occupantGroup.children)t.userData.sway&&(t.position.y=t.userData.baseY+Math.sin(e*2.8+t.userData.phase)*.07);for(let t=this.effects.length-1;t>=0;t--){const n=this.effects[t],s=(e-n.born)/n.life;if(s>=1){this.fxGroup.remove(n.sprite),this.effects.splice(t,1);continue}const r=.9+s*1.6;n.sprite.scale.set(r,r,1),n.sprite.material.opacity=1-s*s}this.renderer.render(this.scene,this.camera)}dispose(){this.disposed=!0,this.renderer.dispose()}}class La{constructor(e){this.id=e.id,this.name=e.name,this.class=e.class,this.icon=e.icon,this.trait=e.trait||"",this.maxHealth=e.stats.health,this.health=e.stats.health,this.baseAttack=e.stats.attack,this.baseDefense=e.stats.defense,this.baseMind=e.stats.mind,this.equipment=[],this.weaponMods=[],this.alive=!0}get attack(){var t;let e=this.baseAttack;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.attack)||0;for(const n of this.weaponMods)e+=n.attack||0;return e}get defense(){var t;let e=this.baseDefense;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.defense)||0;return e}get mind(){var t;let e=this.baseMind;for(const n of this.equipment)e+=((t=n.bonus)==null?void 0:t.mind)||0;return e}takeDamage(e){this.health=Math.max(0,this.health-e),this.health<=0&&(this.alive=!1)}heal(e){this.alive&&(this.health=Math.min(this.maxHealth,this.health+e))}isAlive(){return this.alive&&this.health>0}equip(e){this.equipment.push(e)}addWeaponMod(e){this.weaponMods.push(e)}}function kg(){return new La({id:"char-volunteer",name:"Pip the Tavern Volunteer",class:K.FIGHTER,icon:"🍺",stats:{health:10,attack:2,defense:1,mind:2},trait:"Nobody drafted a hero, so Pip grabbed a stool leg and came along."})}class Ys{constructor(e){const t={};this.members=e.filter(s=>s.type===Q.CHARACTER).map(s=>{const r=new La(s);if(t[s.name]=(t[s.name]||0)+1,t[s.name]>1){const o=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"][Math.min(t[s.name]-1,5)];r.name=`${s.name}, ${o}`}return r}),this.members.length===0&&this.members.push(kg()),this.grimoire=e.filter(s=>s.type===Q.SPELL).map(s=>({...s})),this.personalities=e.filter(s=>s.type===Q.PERSONALITY).map(s=>s.archetype);const n=e.filter(s=>s.type===Q.EQUIPMENT);for(const s of n)this.assignEquipment(s);this.materials=0,this.potions=[],this.gold=0,this.score=0,this.spellsLearned=0,this.encounterHistory={}}assignEquipment(e){const t=this.living();if(t.length===0)return;let n=null;if(e.bestFor){const s=t.filter(r=>r.class===e.bestFor);s.length>0&&(n=s.reduce((r,a)=>r.equipment.length<=a.equipment.length?r:a))}n||(n=t.reduce((s,r)=>s.equipment.length<=r.equipment.length?s:r)),n.equip(e)}living(){return this.members.filter(e=>e.isAlive())}addMember(e){const t=new La(e),n=this.members.filter(s=>s.name.startsWith(e.name)).length;if(n>0){const s=["","the Second","the Third","the Fourth","the Fifth","the Umpteenth"];t.name=`${e.name}, ${s[Math.min(n,5)]}`}return this.members.push(t),t}isAlive(){return this.living().length>0}size(){return this.living().length}hasClass(e){return this.living().some(t=>t.class===e)}hasPersonality(e){return this.personalities.includes(e)}totalAttack(){return this.living().reduce((e,t)=>e+t.attack,0)}combatAttack(){const e=this.living().map(s=>s.attack).sort((s,r)=>r-s),t=e.slice(0,5).reduce((s,r)=>s+r,0),n=e.slice(5).reduce((s,r)=>s+r,0);return Math.round(t+n*.25)}totalDefense(){return this.living().reduce((e,t)=>e+t.defense,0)}bestMind(){return Math.max(0,...this.living().map(e=>e.mind))}totalHealth(){return this.living().reduce((e,t)=>e+t.health,0)}totalMaxHealth(){return this.members.reduce((e,t)=>e+t.maxHealth,0)}combatItemActions(){var t;const e=[];for(const n of this.living())for(const s of n.equipment){const r=(t=s.classActions)==null?void 0:t[n.class];r&&e.push({member:n.name,item:s.name,...r})}return e}takeDamage(e){let t=e;const n=[...this.living().filter(s=>s.class===K.FIGHTER),...this.living().filter(s=>s.class!==K.FIGHTER)];for(const s of n){if(t<=0)break;const r=Math.min(t,s.health);s.takeDamage(r),t-=r}}healParty(e){const t=this.living().filter(n=>n.health<n.maxHealth).sort((n,s)=>n.health/n.maxHealth-s.health/s.maxHealth);t.length!==0&&t[0].heal(e)}restStep(){this.hasClass(K.CLERIC)&&this.healParty(1)}applyLinger(){if(!this.poisonLinger)return null;const e=this.poisonLinger;return this.poisonLinger=0,this.hasClass(K.CLERIC)?{cured:!0}:(this.takeDamage(e),{damage:e})}castSpell(e,t=null){const n=t?this.grimoire.findIndex(o=>o.id===t):this.grimoire.findIndex(o=>o.use===e);if(n===-1)return null;const s=this.grimoire[n],r=this.hasClass(K.WIZARD),a=s.power+(r?2:0);return r||this.grimoire.splice(n,1),{...s,effectivePower:a,consumed:!r}}doAlchemy(e=Math.random()){if(!this.hasClass(K.ALCHEMIST)||this.materials<=0)return null;this.materials--;const t=this.living().some(n=>n.id==="char-perenelle");if(e<.5){const n={kind:"healing-draught",heal:6};return this.potions.push(n),t&&this.potions.push({...n}),{type:"potion",potion:n,doubled:t}}else{const n=this.living().reduce((r,a)=>r.attack>=a.attack?r:a),s=e<.75?{name:"fire coating",attack:2}:{name:"venom coating",attack:3};return n.addWeaponMod(s),{type:"weapon-mod",mod:s,target:n.name}}}quaffIfNeeded(){if(this.potions.length===0)return!1;const e=this.living().find(n=>n.health/n.maxHealth<=.4);if(!e)return!1;const t=this.potions.shift();return e.heal(t.heal),!0}recordEncounter(e,t){this.encounterHistory[e]||(this.encounterHistory[e]={wins:0,losses:0}),this.encounterHistory[e][t?"wins":"losses"]++}addScore(e){this.score+=e}addGold(e){this.gold+=e,this.score+=e}}const Cc={"rat-swarm":{trait:"swarm",weak:["fire"]},gelatinous:{trait:"armored",weak:["frost"],resist:["shock"]},wraith:{trait:"ethereal"},"ogre-king":{trait:"armored"},"dragon-whelp":{resist:["fire"],weak:["frost"]},"bone-warden":{trait:"armored"},"grave-mites":{trait:"swarm",weak:["fire"]},"barrow-shade":{trait:"ethereal"},"hungry-ghoul":{trait:"venomous"},"shrouded-king":{trait:"armored"},"abbot-of-worms":{trait:"venomous"},salamander:{resist:["fire"],weak:["frost"]},"cinder-bats":{trait:"swarm",resist:["fire"],weak:["frost"]},"magma-toad":{resist:["fire"],weak:["frost"]},"obsidian-golem":{trait:"armored",resist:["shock"]},"cinder-wyrm":{resist:["fire"],weak:["frost"]},"forge-tyrant":{trait:"armored",resist:["fire"]},"flying-tomes":{trait:"swarm",weak:["fire"]},"ink-elemental":{weak:["fire"],resist:["shock"]},"spectral-scribe":{trait:"ethereal"},"index-wight":{weak:["fire"]},archivist:{trait:"ethereal"},"grand-errata":{trait:"armored",weak:["fire"]},"sludge-elemental":{trait:"venomous",resist:["shock"]},"potion-rats":{trait:"swarm"},"mutant-vine":{trait:"armored",weak:["fire"]},"mad-alchemist":{trait:"venomous"},"the-precipitate":{trait:"armored",resist:["fire","frost"]},"bat-cloud":{trait:"swarm"},"pale-hound":{trait:"venomous"},"crimson-mist":{trait:"ethereal"},"vampire-lord":{trait:"ethereal"},"the-bride":{trait:"ethereal"},"jar-imp":{trait:"swarm",resist:["fire"]},"pickled-thing":{trait:"venomous"},"root-golem":{trait:"armored",weak:["fire"]},"bog-toad":{trait:"venomous"},"the-cauldron":{trait:"armored",resist:["fire"]},"frost-wisp":{trait:"ethereal",resist:["frost"],weak:["fire"]},"ice-crawler":{trait:"swarm",weak:["fire"]},"thawed-dead":{trait:"venomous"},"cinder-imp":{resist:["fire"],weak:["frost"]},"mad-pyromancer":{resist:["fire"],weak:["frost"]},"glacier-heart":{trait:"armored",resist:["frost"],weak:["fire"]}};function Fg(i){Object.assign(Cc,i)}function Ia(i){const e=Cc[i.kind];return e?{...i,...e}:i}function Ds(i,e){const t=i==null?void 0:i.element;return t?t==="holy"&&e.undead||(e.weak||[]).includes(t)?1.5:(e.resist||[]).includes(t)?.5:1:1}const pe={ENTRANCE:"entrance",CORRIDOR:"corridor",MONSTER:"monster",TRAP:"trap",TREASURE:"treasure",LIBRARY:"library",SHRINE:"shrine",LAB:"lab",MATERIALS:"materials",DISASTER:"disaster",BOSS:"boss",VAULT:"vault"},Pc={entrance:"🚪",corridor:"⬛",monster:"👹",trap:"⚠️",treasure:"💰",library:"📚",shrine:"🕯️",lab:"⚗️",materials:"🌿",disaster:"🌋",boss:"🐉",vault:"💎"},Sl={easy:{monster:2,trap:1,treasure:2,library:1,shrine:1.5,lab:1,materials:2,disaster:.5,corridor:1},medium:{monster:3,trap:1.5,treasure:2,library:1,shrine:1,lab:1,materials:1.5,disaster:1,corridor:1},hard:{monster:4,trap:2.5,treasure:1.5,library:1,shrine:.7,lab:1,materials:1,disaster:2,corridor:.5},nightmare:{monster:5,trap:3,treasure:1.5,library:.8,shrine:.5,lab:1,materials:1,disaster:3,corridor:.3}};function Og(i,e){const t=Object.entries(e),n=t.reduce((r,[,a])=>r+a,0);let s=i.next()*n;for(const[r,a]of t)if(s-=a,s<=0)return r;return t[0][0]}class Lc{constructor(e,t,n=null,s={}){this.rooms=e,this.theme=t,this.condition=n,this.spine=s.spine||e.map((r,a)=>a),this.edges=s.edges||e.slice(1).map((r,a)=>({a,b:a+1,secret:!1})),this.branches=s.branches||[]}getRoom(e){return this.rooms[e]||null}get length(){return this.rooms.length}branchAt(e){return this.branches.find(t=>t.junction===e&&!t.consumed)||null}}function Bg(i,e="medium",t={}){const n=new Ks(i),s=Math.max(1,t.depth||1),r=Kn[t.theme]||n.pick(Object.values(Kn)),a=typeof t.condition=="object"&&t.condition?t.condition:vn(t.condition),o={...Sl[e]||Sl.medium};for(const[M,N]of Object.entries(r.weightTweaks))o[M]=Math.max(.1,(o[M]||0)+N);for(const[M,N]of Object.entries(a.weightTweaks||{}))o[M]=Math.max(.1,(o[M]||0)+N);const l=Hg[e]||1,c=8+Math.floor(n.next()*4),h=[];h.push(ji(0,pe.ENTRANCE,n,r,s,l,a));for(let M=1;M<=c;M++){const N=Og(n,o);h.push(ji(M,N,n,r,s,l,a))}Us(h,pe.LIBRARY,n,r,s,l,a,o,r.minLibraries||1),Us(h,pe.SHRINE,n,r,s,l,a,o),(t.wantLab||r.alwaysLab)&&(Us(h,pe.LAB,n,r,s,l,a,o),Us(h,pe.MATERIALS,n,r,s,l,a,o,1)),h.push(ji(h.length,pe.BOSS,n,r,s,l,a));const d=new Set;let f=0,p=0;for(const M of h)M.x=f,M.y=p,d.add(`${f},${p}`),n.next()<.5?f+=1:p+=1;const g=h.map((M,N)=>N),v=h.slice(1).map((M,N)=>({a:N,b:N+1,secret:!1})),m=[],u=1+Math.floor(n.next()*2),b=[pe.TREASURE,pe.MATERIALS,pe.MONSTER,pe.LIBRARY],E=[[1,0],[-1,0],[0,1],[0,-1]];for(let M=0;M<u;M++){const N=1+Math.floor(n.next()*(g.length-2)),T=h[N],L=n.shuffle(E).find(([q,H])=>!d.has(`${T.x+q},${T.y+H}`));if(!L)continue;const S=n.next()<.5,x=1+Math.floor(n.next()*2),R=[];let z=T.x,F=T.y,W=N;for(let q=0;q<x;q++){const H=z+L[0],J=F+L[1];if(d.has(`${H},${J}`))break;const G=q===x-1,se=S&&G?pe.VAULT:b[Math.floor(n.next()*b.length)],re=ji(h.length,se,n,r,s,l,a);re.x=H,re.y=J,re.secret=S,re.discovered=!S,h.push(re),d.add(`${H},${J}`),v.push({a:W,b:re.index,secret:S&&q===0}),R.push(re.index),W=re.index,z=H,F=J}R.length>0&&m.push({junction:N,rooms:R,secret:S,consumed:!1})}return new Lc(h,r,a,{spine:g,edges:v,branches:m})}const zg=new Set([pe.ENTRANCE,pe.BOSS,pe.LIBRARY,pe.SHRINE,pe.LAB,pe.MATERIALS]);function Us(i,e,t,n,s,r,a,o,l=1){const c=i.filter(d=>d.type===e).length;let h=l-c;for(;h>0;){const d=i.filter(u=>!zg.has(u.type));if(d.length===0)break;let f=null,p=-1;for(const u of new Set(d.map(b=>b.type))){const b=d.filter(E=>E.type===u).length/Math.max(.1,(o==null?void 0:o[u])||.1);b>p&&(p=b,f=u)}const g=d.filter(u=>u.type===f),v=t.pick(g),m=ji(v.index,e,t,n,s,r,a);m.x=v.x,m.y=v.y,i[i.indexOf(v)]=m,h--}}function ji(i,e,t,n,s=1,r=1,a={}){const o={index:i,type:e,icon:Pc[e]||"⬛",cleared:!1};if(e===pe.MONSTER&&(o.monster=bl(t,!1,n,s,r,a)),e===pe.BOSS&&(o.monster=bl(t,!0,n,s,r,a)),e===pe.TREASURE){const l=(20+Math.floor(t.next()*40))*(1+.2*(s-1));o.gold=Math.round(l*(a.goldMult||1)),o.mimicChance=.18}if(e===pe.VAULT){const l=(60+Math.floor(t.next()*120))*(1+.2*(s-1));o.gold=Math.round(l*(a.goldMult||1)),o.mimicChance=.28}if(e===pe.TRAP){o.trapDamage=4+Math.floor(t.next()*4)+(n.trapBonus||0)+(s-1)+(a.trapBonus||0);const l=n.trapTypes||["spike"];o.trapType=l[Math.floor(t.next()*l.length)]}return e===pe.MATERIALS&&(o.materials=1+Math.floor(t.next()*2)),o}const Kn={delve:{id:"delve",name:"the Old Delve",icon:"⛏️",tagline:"A classic hole in the ground, wronged by generations of management.",weightTweaks:{},trapTypes:["spike","alarm"],monsters:[{kind:"rat-swarm",name:"a chittering rat swarm",icon:"🐀",attack:4,health:10,undead:!1},{kind:"skeleton",name:"a rattling skeleton patrol",icon:"💀",attack:6,health:14,undead:!0},{kind:"goblin-gang",name:"a goblin toll-gang",icon:"👺",attack:5,health:12,undead:!1,bribable:!0},{kind:"gelatinous",name:"a gelatinous horror",icon:"🟩",attack:5,health:18,undead:!1,slow:!0},{kind:"wraith",name:"a cold-eyed wraith",icon:"👻",attack:8,health:12,undead:!0}],bosses:[{kind:"dragon-whelp",name:"the Dragon Whelp of the Deep Vault",icon:"🐉",attack:12,health:34,undead:!1},{kind:"ogre-king",name:"the Ogre King Under the Stair",icon:"👹",attack:14,health:38,undead:!1,bribable:!0}]},crypt:{id:"crypt",name:"the Ancient Crypt",icon:"⚰️",tagline:"The dead were buried with their grudges. Both kept.",weightTweaks:{monster:1,shrine:.5,treasure:-.5},trapTypes:["spike","poison"],monsters:[{kind:"bone-warden",name:"a bone warden on its rounds",icon:"💀",attack:6,health:15,undead:!0},{kind:"grave-mites",name:"a boil of grave mites",icon:"🪲",attack:4,health:9,undead:!1},{kind:"barrow-shade",name:"a barrow shade, thin as smoke",icon:"👻",attack:8,health:11,undead:!0},{kind:"hungry-ghoul",name:"a ghoul between meals",icon:"🧟",attack:7,health:13,undead:!0}],bosses:[{kind:"shrouded-king",name:"the Shrouded King in his broken throne-niche",icon:"👑",attack:12,health:32,undead:!0},{kind:"abbot-of-worms",name:"the Abbot of Worms, still preaching",icon:"☠️",attack:10,health:36,undead:!0}]},volcanic:{id:"volcanic",name:"the Cinder Galleries",icon:"🌋",tagline:"The mountain is not dormant. The mountain is patient.",weightTweaks:{disaster:1,trap:.5,shrine:-.3},trapBonus:2,trapTypes:["fire","spike"],monsters:[{kind:"salamander",name:"a salamander the size of a mistake",icon:"🦎",attack:7,health:14,undead:!1},{kind:"cinder-bats",name:"a shriek of cinder bats",icon:"🦇",attack:5,health:9,undead:!1},{kind:"magma-toad",name:"a magma toad, gently steaming",icon:"🐸",attack:6,health:16,undead:!1,slow:!0},{kind:"obsidian-golem",name:"an obsidian golem with a slow fuse",icon:"🗿",attack:8,health:20,undead:!1,slow:!0}],bosses:[{kind:"cinder-wyrm",name:"the Cinder Wyrm coiled in its forge-nest",icon:"🐉",attack:13,health:36,undead:!1},{kind:"forge-tyrant",name:"the Forge Tyrant, hammer still warm",icon:"🔨",attack:14,health:34,undead:!1,bribable:!0}]},library:{id:"library",name:"the Drowned Athenaeum",icon:"📚",tagline:"Knowledge wants to be free. It has been waiting a long time.",weightTweaks:{library:2,monster:-.5,materials:-.5},minLibraries:2,trapTypes:["alarm","spike"],monsters:[{kind:"flying-tomes",name:"a wheeling flock of flying tomes",icon:"📖",attack:5,health:10,undead:!1},{kind:"ink-elemental",name:"an ink elemental, still wet",icon:"🫧",attack:6,health:13,undead:!1},{kind:"spectral-scribe",name:"a spectral scribe mid-citation",icon:"👻",attack:7,health:12,undead:!0},{kind:"index-wight",name:"the wight of a disappointed librarian",icon:"🧟",attack:8,health:14,undead:!0}],bosses:[{kind:"archivist",name:"the Archivist, quill dripping",icon:"🪶",attack:11,health:33,undead:!0},{kind:"grand-errata",name:"the Grand Errata, a book that reads back",icon:"📕",attack:12,health:35,undead:!1}]},madlab:{id:"madlab",name:"the Mad Alchemist's Dungeon",icon:"⚗️",tagline:"The experiments continued after the funding stopped. And after the alchemist did.",weightTweaks:{lab:1.5,materials:1,disaster:.5,shrine:-.5},alwaysLab:!0,trapTypes:["poison","fire"],monsters:[{kind:"sludge-elemental",name:"a sludge elemental, recently fed",icon:"🟢",attack:6,health:15,undead:!1},{kind:"potion-rats",name:"a scurry of potion-glowing rats",icon:"🐀",attack:5,health:10,undead:!1},{kind:"mutant-vine",name:"a vine that learned grasping from a textbook",icon:"🌿",attack:6,health:14,undead:!1,slow:!0},{kind:"failed-homunculus",name:"a homunculus that failed peer review",icon:"🧪",attack:7,health:12,undead:!1,bribable:!0}],bosses:[{kind:"mad-alchemist",name:"the Mad Alchemist, flask raised in welcome",icon:"⚗️",attack:12,health:34,undead:!1},{kind:"the-precipitate",name:"the Precipitate, everything the drains refused",icon:"🫠",attack:13,health:37,undead:!1}]},castle:{id:"castle",name:"the Castle of the Vampire Lord",icon:"🦇",tagline:"The invitation was in your dreams. The exit clause was not.",weightTweaks:{treasure:1.5,library:.5,monster:.5,shrine:-.7,materials:-.5,corridor:-.3},minLibraries:1,trapTypes:["alarm","spike"],monsters:[{kind:"castle-thrall",name:"a thrall footman, polite and bloodless",icon:"🧟",attack:6,health:13,undead:!0,bribable:!0},{kind:"bat-cloud",name:"a chittering cloud of castle bats",icon:"🦇",attack:4,health:9,undead:!1},{kind:"pale-hound",name:"a pale hound with a red velvet collar",icon:"🐺",attack:7,health:12,undead:!0},{kind:"crimson-mist",name:"a crimson mist that pours under the door",icon:"🌫️",attack:8,health:11,undead:!0}],bosses:[{kind:"vampire-lord",name:"the Vampire Lord, apologizing for the hour",icon:"🧛",attack:13,health:35,undead:!0},{kind:"the-bride",name:"the Bride, who was here long before the Lord",icon:"👰",attack:12,health:33,undead:!0}]},bogcellar:{id:"bogcellar",name:"the Root Cellar of the Bog Witch",icon:"🧹",tagline:"Everything down here is pickled, potted, or patient. Some of it is all three.",weightTweaks:{materials:1.5,lab:1,trap:.5,treasure:-.5,corridor:-.3},alwaysLab:!0,trapBonus:1,trapTypes:["poison","spike"],monsters:[{kind:"jar-imp",name:"an imp still angry about the jar",icon:"🫙",attack:5,health:10,undead:!1,bribable:!0},{kind:"pickled-thing",name:"a pickled thing that finished pickling",icon:"🥒",attack:6,health:14,undead:!0},{kind:"root-golem",name:"a golem of taproots and bad intentions",icon:"🌳",attack:7,health:18,undead:!1,slow:!0},{kind:"bog-toad",name:"a bog toad the size of a smokehouse",icon:"🐸",attack:6,health:16,undead:!1,slow:!0}],bosses:[{kind:"bog-witch",name:"the Bog Witch, delighted to have company for dinner",icon:"🧙‍♀️",attack:12,health:34,undead:!1,bribable:!0},{kind:"the-cauldron",name:"the Cauldron, which learned to want",icon:"🍲",attack:13,health:36,undead:!1}]},icecaverns:{id:"icecaverns",name:"the Ice Caverns of the Mad Pyromancer",icon:"🧊",tagline:"He moved here so the fires couldn't spread. The fires found other ambitions.",weightTweaks:{disaster:1.5,trap:1,shrine:-.5,library:-.3},trapBonus:2,trapTypes:["fire","spike"],monsters:[{kind:"frost-wisp",name:"a frost wisp singed around the edges",icon:"❄️",attack:5,health:9,undead:!1},{kind:"ice-crawler",name:"an ice crawler with too many pick-shaped legs",icon:"🕷️",attack:6,health:13,undead:!1},{kind:"thawed-dead",name:"one of the thawed dead, steaming gently",icon:"🧟",attack:7,health:14,undead:!0},{kind:"cinder-imp",name:"a cinder imp wearing a snowball like armor",icon:"🔥",attack:6,health:11,undead:!1}],bosses:[{kind:"mad-pyromancer",name:"the Mad Pyromancer, delighted someone flammable came",icon:"🧙",attack:14,health:32,undead:!1},{kind:"glacier-heart",name:"the Glacier's Heart, half-melted and wholly furious",icon:"💠",attack:12,health:38,undead:!1,slow:!0}]}},Hg={easy:.85,medium:1,hard:1.3,nightmare:1.7};function Gg(i){var e;return{themeId:i.theme.id,conditionId:((e=i.condition)==null?void 0:e.id)||"none",rooms:i.rooms.map(t=>({index:t.index,type:t.type,x:t.x,y:t.y,secret:!!t.secret,...t.monster?{monster:{...t.monster}}:{},...t.gold!==void 0?{gold:t.gold}:{},...t.mimicChance!==void 0?{mimicChance:t.mimicChance}:{},...t.trapDamage!==void 0?{trapDamage:t.trapDamage}:{},...t.materials!==void 0?{materials:t.materials}:{}})),spine:[...i.spine],edges:i.edges.map(t=>({...t})),branches:i.branches.map(t=>({...t,rooms:[...t.rooms],consumed:!1}))}}function Vg(i){const e=Kn[i.themeId]||Kn.delve,t=vn(i.conditionId),n=i.rooms.map(s=>({...s,icon:Pc[s.type]||"⬛",cleared:!1,discovered:!s.secret,...s.monster?{monster:{...s.monster}}:{}}));return new Lc(n,e,t,{spine:[...i.spine],edges:i.edges.map(s=>({...s})),branches:i.branches.map(s=>({...s,rooms:[...s.rooms],consumed:!1}))})}function Wg(i,e,t=!1){return i===pe.MONSTER?{monster:Ia({...e.monsters[0]})}:i===pe.BOSS?{monster:Ia({...e.bosses[0],isBoss:!0})}:i===pe.TREASURE?{gold:35,mimicChance:.18}:i===pe.VAULT?{gold:100,mimicChance:.28}:i===pe.TRAP?{trapDamage:5,trapType:(e.trapTypes||["spike"])[0]}:i===pe.MATERIALS?{materials:2}:{}}function $g(i){var e,t;if(!(i!=null&&i.id)||!((e=i.monsters)!=null&&e.length)||!((t=i.bosses)!=null&&t.length))throw new Error("a theme needs an id, monsters, and at least one boss");return Kn[i.id]=i,i}function bl(i,e,t,n=1,s=1,r={}){const a=e?t.bosses:t.monsters,o=Ia({...i.pick(a)}),l=(e?r.bossAttackMult:r.monsterAttackMult)||1,c=(e?r.bossHealthMult:r.monsterHealthMult)||1,h=1+.15*(n-1);return o.attack=Math.max(1,Math.round(o.attack*h*s*l)),o.health=Math.max(1,Math.round(o.health*(1+.2*(n-1))*s*c)),e&&(o.isBoss=!0),o}function dn(){return Math.random()*10}function Ns(i,e){return i.living().some(t=>t.equipment.some(n=>n.id===e))}function js(i,e){return i.grimoire.some(t=>t.id===e)}function vi(i){const e={sneak:0,disarm:0,deepStudy:0,secretDoor:0,trapSoak:0,cleanInspect:!1,notes:{}};return Ns(i,"eq-boots")&&(e.sneak+=1.5,e.notes.sneak="Boots of the Quiet Step"),js(i,"sp-light")&&(e.sneak+=1,e.notes.sneakLight="Dancing Light"),Ns(i,"eq-lockpicks")&&(e.disarm+=1.5,e.cleanInspect=!0,e.notes.disarm="Masterwork Lockpicks",e.notes.cleanInspect="Masterwork Lockpicks"),i.hasPersonality("cunning")&&(e.cleanInspect=!0,e.notes.cleanInspect=e.notes.cleanInspect||"the Cunning"),Ns(i,"eq-grimoire")&&(e.deepStudy+=1.5,e.notes.deepStudy="the Grimoire of Low Whispers"),Ns(i,"eq-lantern")&&(e.secretDoor+=2,e.trapSoak+=1,e.notes.secretDoor="the Everburning Lantern",e.notes.trapSoak="the Everburning Lantern"),e}function Ic(i,e){var t,n,s,r,a;switch(i.type){case pe.MONSTER:case pe.BOSS:{const o=[{id:"fight",name:"Fight",desc:"Steel and teamwork"},{id:"flee",name:"Fall Back",desc:"Retreat and try the fight later, worn down"}];return e.hasClass(K.ROGUE)&&!((t=i.monster)!=null&&t.isBoss)&&o.push({id:"sneak",name:"Sneak Past",desc:"The rogue leads a silent detour"}),e.hasClass(K.CLERIC)&&((n=i.monster)!=null&&n.undead)&&o.push({id:"turn-undead",name:"Turn Undead",desc:"The cleric raises the holy symbol"}),(s=i.monster)!=null&&s.bribable&&e.gold>=15&&o.push({id:"bribe",name:"Pay the Toll",desc:"Gold buys passage (15g)"}),e.grimoire.some(l=>l.use==="combat")&&o.push({id:"spell-strike",name:"Open with Magic",desc:"Lead with a combat spell"}),js(e,"sp-fear")&&!((r=i.monster)!=null&&r.isBoss)&&(((a=i.monster)==null?void 0:a.health)||99)<=14&&o.push({id:"cause-fear",name:"Cause Fear",desc:"Send the weak thing running"}),o}case pe.TRAP:{const o=[{id:"push-through",name:"Push Through",desc:"Take the hit, keep marching"},{id:"search-around",name:"Search for a Way Around",desc:"Slow but safe-ish"}];return e.hasClass(K.ROGUE)&&o.unshift({id:"disarm",name:"Disarm It",desc:"The rogue's fingers know this work"}),e.grimoire.some(l=>l.use==="utility")&&o.push({id:"spell-bypass",name:"Magic It Open",desc:"A utility spell solves this"}),e.hasClass(K.ALCHEMIST)&&e.materials>=1&&o.push({id:"smoke-bomb",name:"Alchemist's Smoke",desc:"Spend a material; spring it from afar"}),o}case pe.TREASURE:case pe.VAULT:{const o=[{id:"loot",name:"Loot It All",desc:"Everything shiny goes in the bags"},{id:"inspect",name:"Inspect First",desc:"Check for mimics and curses"},{id:"leave-it",name:"Leave It",desc:"Some gold is bait"}];return js(e,"sp-knock")&&o.unshift({id:"knock-open",name:"Cast Knock",desc:"Open it from across the room. Loudly."}),o}case pe.LIBRARY:{const o=[{id:"study",name:"Study the Shelves",desc:"Learn a spell from the stacks"},{id:"pass-by",name:"Pass Through",desc:"Books do not fill bellies"}];return e.hasClass(K.WIZARD)&&o.unshift({id:"deep-study",name:"Read the Sealed Texts",desc:"The wizard risks the dangerous books"}),o}case pe.SHRINE:return[{id:"rest",name:"Rest and Pray",desc:"Heal the wounded"},{id:"desecrate",name:"Pry Out the Gold Leaf",desc:"Profitable. Blasphemous."},{id:"pass-by",name:"Keep Moving",desc:"No time for candles"}];case pe.LAB:{const o=[{id:"pass-by",name:"Move On",desc:"Glassware and regret"}];return e.hasClass(K.ALCHEMIST)&&e.materials>0&&o.unshift({id:"alchemy",name:"Work the Bench",desc:"Brew a potion or mod a weapon"}),o}case pe.MATERIALS:return[{id:"gather",name:"Gather Materials",desc:"Herbs, salts, quicksilver"},{id:"pass-by",name:"Leave Them",desc:"The satchel stays light"}];case pe.DISASTER:return[{id:"brace",name:"Brace and Endure",desc:"Shields up, heads down"},{id:"scatter",name:"Scatter and Regroup",desc:"Every hero for themselves"}];default:return[{id:"proceed",name:"Proceed",desc:"Onward and downward"}]}}const Xg={brave:{fight:3,"push-through":2,brace:2,flee:-2,"leave-it":-1},cunning:{sneak:3,disarm:3,bribe:2,inspect:2,"spell-bypass":2,fight:-1},greedy:{loot:4,desecrate:2,gather:2,"leave-it":-3,bribe:-2},scholarly:{study:3,"deep-study":3,"spell-strike":2,"spell-bypass":2},pious:{rest:3,"turn-undead":3,desecrate:-5},reckless:{fight:2,"push-through":3,loot:2,inspect:-2,"search-around":-2},craven:{flee:3,sneak:2,disarm:2,"search-around":2,inspect:1,scatter:2,fight:-2,"push-through":-2,brace:-1,"cause-fear":3,"smoke-bomb":2,"knock-open":1}},qg={"knock-open":{base:1.5,cunning:2,scholarly:1},"cause-fear":{base:1.5,cunning:1},"smoke-bomb":{base:1.5,cunning:2}};function Yg(i,e){const t=Ic(i,e);if(t.length===0)return null;if(t.length===1)return t[0].id;const n=t.map(a=>{let o=1;for(const c of e.personalities){const h=Xg[c];h&&h[a.id]!==void 0&&(o+=h[a.id])}a.id==="alchemy"&&(o+=3),a.id==="gather"&&(o+=2);const l=qg[a.id];if(l){o+=l.base;for(const c of e.personalities)l[c]&&(o+=l[c])}return a.id==="rest"&&e.totalHealth()/e.totalMaxHealth()<.6&&(o+=3),a.id==="fight"&&e.totalHealth()/e.totalMaxHealth()<.3&&(o-=2),a.id==="flee"&&e.totalHealth()/e.totalMaxHealth()<.3&&(o+=2),a.id==="study"&&(o+=1),{opt:a,w:Math.max(.1,o)}}),s=n.reduce((a,o)=>a+o.w,0);let r=Math.random()*s;for(const{opt:a,w:o}of n)if(r-=o,r<=0)return a.id;return t[0].id}const El=[{id:"found-charm",type:"equipment",name:"a tarnished luck-charm",icon:"🍀",slot:"trinket",bonus:{mind:1},bestFor:null,text:"Somebody's luck ran out holding it. Perhaps it recharges."},{id:"found-buckle",type:"equipment",name:"a dead adventurer's belt buckle",icon:"🔩",slot:"trinket",bonus:{defense:1},bestFor:null,text:"Sturdy. Its last owner was not."},{id:"found-whetstone",type:"equipment",name:"a whetstone of surprising opinion",icon:"🪨",slot:"trinket",bonus:{attack:1},bestFor:null,text:"It hums when it works. Nobody asks what the tune is."}];function zr(i,e=!1,t=Math.random()){if(!e&&t>.35)return null;const n=Math.floor((e?t:t/.35)*4)%4;if(n===0)return i.potions.push({kind:"healing-draught",heal:6}),{source:"the hoard",find:"potion",text:"🧪 Tucked behind the coin: a healing draught, still corked, still honest."};if(n===1)return i.materials+=2,{source:"the hoard",find:"materials",text:"🌿 Two bundles of rare simples, wrapped in oilcloth by careful, vanished hands."};if(n===2){const r=Hr[Math.floor(t*997)%Hr.length];return i.grimoire.push({...r,id:`found-${r.id}-${i.grimoire.length}`}),{source:r.name,find:"scroll",text:`📜 A scroll of ${r.name}, sealed with someone's ring. The grimoire grows.`}}const s=El[Math.floor(t*991)%El.length];return i.assignEquipment({...s,id:`${s.id}-${Date.now().toString(36)}`}),{source:s.name,find:"trinket",text:`🍀 Among the coins, ${s.name} — claimed, worn, already working.`}}function jg(i,e=dn()){const t=i.living().filter(r=>r.class===K.ROGUE),n=t.length>0?Math.max(...t.map(r=>r.mind)):Math.floor(i.bestMind()/2);let s=0;return i.hasPersonality("scholarly")&&(s+=1),i.hasPersonality("craven")&&(s+=1),s+=vi(i).secretDoor,n+s+e>11}function Kg(i,e=dn()){let t=4;return i.hasPersonality("greedy")&&(t+=3),i.hasPersonality("scholarly")&&(t+=2),i.hasPersonality("reckless")&&(t+=2),i.hasPersonality("craven")&&(t-=3),i.totalHealth()/i.totalMaxHealth()<.35&&(t-=3),e<t}function Dc(i,e,t){switch(t){case"fight":{const n=i.monster;let s=n.health,r=0;const a=e.combatItemActions();let o=0,l=0,c=0;for(const m of a)o+=m.opening||0,n.undead&&(o+=m.vsUndead||0),l+=m.ward||0,c+=m.summonAttack||0;s-=o;const h=[],d=n.trait==="armored"?2:0,f=n.trait==="ethereal"&&!e.hasClass(K.CLERIC)?.6:1;n.trait==="ethereal"&&h.push(e.hasClass(K.CLERIC)?{source:"the cleric",text:"✨ Steel alone would pass through it — but the cleric's murmured litany gives every blade conviction."}:{source:n.name,text:"👻 Half the party's blows pass through it like an opinion through a committee."});let p=n.attack;e.alarmed&&(p+=2,e.alarmed=!1,h.push({source:"the alarm",text:"🔔 The tripped alarm did its work: the thing was waiting, braced and delighted."}));let g=0;for(;s>0&&e.isAlive()&&g<12;){g++;const m=Math.max(1,Math.round((e.combatAttack()+c+Math.floor(dn()/3))*f)-d);if(s-=m,s<=0)break;if(n.trait==="slow"&&g===1)continue;const u=Math.max(1,p-Math.floor(e.totalDefense()/3)-l);e.takeDamage(u),r+=u,e.quaffIfNeeded()}const v=s<=0&&e.isAlive();if(v){const m=n.isBoss?100:25;if(e.addScore(m),i.cleared=!0,n.trait==="venomous"&&(e.hasClass(K.CLERIC)?h.push({source:"the cleric",text:"🐍 Venom in three sets of scratches — drawn, hissing, into the cleric's salt bowl before it can work."}):(e.poisonLinger=(e.poisonLinger||0)+2,h.push({source:n.name,text:"🐍 The thing is dead, but its venom is patient. Someone will feel this a room from now."}))),n.isBoss){const u=zr(e,!0);u&&h.push(u)}e.hasPersonality("reckless")&&(e.addScore(5),h.push({source:"the Reckless",text:"💥 The Reckless insisted on doing it with style. The chronicle pays extra for style."}))}if(e.isAlive()&&r>=6){const m=e.castSpell("heal");m&&(e.healParty(m.effectivePower),h.push({source:m.name,text:`💚 ${m.name} closes the worst of the wounds before they set (${m.effectivePower} healed${m.consumed?"; the scroll burns":""}).`}))}return e.recordEncounter("fight",v),{success:v,rounds:g,damage:r,monster:n.name,itemActions:a,preps:h}}case"cause-fear":{const n=e.castSpell("combat","sp-fear");return e.addScore(20),i.cleared=!0,e.recordEncounter("cause-fear",!0),{success:!0,monster:i.monster.name,spell:n?n.name:"Cause Fear"}}case"spell-strike":{const n=i.monster,s=e.grimoire.filter(h=>h.use==="combat");let r=null,a=-1;for(const h of s){const d=h.power*Ds(h,n);d>a&&(a=d,r=h)}const o=r?e.castSpell("combat",r.id):null;let l=null;if(o){const h=Ds(o,n)*(n.trait==="swarm"?1.5:1);Ds(o,n)>1?l="weak":Ds(o,n)<1&&(l="resisted"),n.trait==="swarm"&&(l=l||"swarm"),n.health=Math.max(1,n.health-Math.round(o.effectivePower*h))}const c=Dc(i,e,"fight");return c.spell=o?o.name:null,c.spellEdge=l,c.spellElement=(o==null?void 0:o.element)||null,c}case"sneak":{const n=Math.max(...e.living().filter(l=>l.class===K.ROGUE).map(l=>l.mind)),s=e.hasPersonality("craven")?1:0,r=vi(e),a=[];r.notes.sneak&&a.push({source:r.notes.sneak,text:`👢 The ${r.notes.sneak} never let the floorboards learn a name.`}),r.notes.sneakLight&&a.push({source:r.notes.sneakLight,text:"💡 Dancing Light had already shown where the watcher watched."});const o=n+s+r.sneak+dn()>9;return o?(e.addScore(15),i.cleared=!0):e.takeDamage(Math.ceil(i.monster.attack/2)),e.recordEncounter("sneak",o),{success:o,monster:i.monster.name,preps:o?a:[]}}case"turn-undead":{const s=Math.max(...e.living().filter(r=>r.class===K.CLERIC).map(r=>r.mind))+dn()>8;return s?(e.addScore(30),i.cleared=!0):e.takeDamage(i.monster.attack),e.recordEncounter("turn-undead",s),{success:s,monster:i.monster.name}}case"bribe":return e.gold-=15,e.addScore(5),i.cleared=!0,{success:!0,goldSpent:15,monster:i.monster.name};case"flee":return e.takeDamage(2),{success:!0,retreated:!0,monster:i.monster.name};case"disarm":{const n=Math.max(...e.living().filter(o=>o.class===K.ROGUE).map(o=>o.mind)),s=vi(e),r=[];s.notes.disarm&&r.push({source:s.notes.disarm,text:"🗝️ The Masterwork Lockpicks treated the mechanism as a lock, and every door is a suggestion."});const a=n+s.disarm+dn()>8;return a?(e.addScore(20),i.cleared=!0):(e.takeDamage(Math.ceil(i.trapDamage/2)),i.cleared=!0),e.recordEncounter("disarm",a),{success:a,preps:a?r:[]}}case"push-through":{const n=e.hasPersonality("craven")?1:0,s=vi(e),r=[];s.trapSoak>0&&r.push({source:s.notes.trapSoak,text:"🏮 The Everburning Lantern showed the plates before the boots found them."});const a=i.trapType||"spike";let o=Math.max(1,(i.trapDamage||3)-n-s.trapSoak);return a==="fire"?js(e,"sp-frost")?(o=Math.max(1,o-2),r.push({source:"Frost Lance",text:"❄️ Frost Lance meets the jet of flame halfway, and the corridor fills with warm rain instead."})):o+=1:a==="poison"?(o=Math.max(1,Math.ceil(o/2)),e.hasClass(K.CLERIC)?r.push({source:"the cleric",text:"🐍 The needles bite, but the cleric draws the venom before it can settle in."}):(e.poisonLinger=(e.poisonLinger||0)+2,r.push({source:"the trap",text:"🐍 The needles barely sting. That is what worries the ones who know poison."}))):a==="alarm"&&(o=Math.min(o,2),e.alarmed=!0,r.push({source:"the alarm",text:"🔔 Bells. Bells all the way down. Everything ahead now knows the party's pace and number."})),e.takeDamage(o),i.cleared=!0,{success:!0,damage:o,spotted:n>0,trapType:a,preps:r}}case"smoke-bomb":return e.materials-=1,e.addScore(15),i.cleared=!0,e.recordEncounter("smoke-bomb",!0),{success:!0,materialsLeft:e.materials};case"search-around":{const n=e.bestMind()+dn()>8;return n||e.takeDamage(Math.ceil((i.trapDamage||3)/2)),i.cleared=!0,{success:n}}case"spell-bypass":{const n=e.castSpell("utility");return i.cleared=!0,e.addScore(10),{success:!0,spell:n?n.name:null}}case"loot":{if(Math.random()<(i.mimicChance||0))return e.takeDamage(5),e.addGold(Math.floor((i.gold||20)/2)),i.cleared=!0,{success:!1,mimic:!0,gold:Math.floor((i.gold||20)/2)};e.addGold(i.gold||20),i.cleared=!0;const s=[],r=zr(e,i.type===pe.VAULT);return r&&s.push(r),{success:!0,gold:i.gold||20,preps:s}}case"inspect":{const n=vi(e),s=[];let r=Math.floor((i.gold||20)*.8);n.cleanInspect&&(r=i.gold||20,s.push({source:n.notes.cleanInspect,text:`🔍 ${n.notes.cleanInspect==="the Cunning"?"The Cunning eye misses nothing, and nothing is left behind":"The Masterwork Lockpicks open the false bottom too"} — the full hoard, safely.`})),e.addGold(r),i.cleared=!0;const a=zr(e,i.type===pe.VAULT);return a&&s.push(a),{success:!0,gold:r,careful:!0,preps:s}}case"knock-open":{const n=e.castSpell("utility","sp-knock"),s=i.gold||20;return e.addGold(s),i.cleared=!0,e.recordEncounter("knock-open",!0),{success:!0,gold:s,spell:n?n.name:"Knock",consumed:n?n.consumed:!1,wasMimic:Math.random()<(i.mimicChance||0)}}case"leave-it":return i.cleared=!0,{success:!0,gold:0};case"study":{const n=e.hasPersonality("scholarly")?2:1;e.spellsLearned+=n,e.addScore(n*20);for(let s=0;s<n;s++)e.grimoire.push({id:`learned-${Date.now()}-${s}`,name:"Found Cantrip",icon:"📜",school:"found",power:3,use:Math.random()<.5?"combat":"utility",text:"Copied from the stacks."});return i.cleared=!0,{success:!0,learned:n}}case"deep-study":{const n=Math.max(...e.living().filter(o=>o.class===K.WIZARD).map(o=>o.mind)),s=vi(e),r=s.deepStudy>0?[{source:s.notes.deepStudy,text:"📖 The Grimoire of Low Whispers argued with the sealed text in its own language, and won."}]:[],a=n+s.deepStudy+dn()>9;return a?(e.spellsLearned+=2,e.addScore(50),e.grimoire.push({id:`sealed-${Date.now()}`,name:"Sealed Working",icon:"🔏",school:"forbidden",power:6,use:"combat",text:"The margins screamed. The wizard did not."})):e.takeDamage(4),i.cleared=!0,e.recordEncounter("deep-study",a),{success:a,preps:a?r:[]}}case"rest":{const n=e.hasPersonality("pious")?4:0;for(const s of e.living())s.heal(5+n);return i.cleared=!0,{success:!0,healed:5+n}}case"desecrate":return e.addGold(30),e.desecrated=!0,i.cleared=!0,{success:!0,gold:30,ominous:!0};case"alchemy":{const n=e.doAlchemy();return i.cleared=!0,e.addScore(25),{success:!0,alchemy:n}}case"gather":return e.materials+=i.materials||1,e.addScore(5),i.cleared=!0,{success:!0,materials:i.materials||1};case"brace":{const n=e.desecrated?8:5;e.takeDamage(Math.max(1,n-Math.floor(e.totalDefense()/4))),i.cleared=!0;const s=[],r=e.castSpell("heal");return r&&(e.healParty(r.effectivePower),s.push({source:r.name,text:`💚 ${r.name} knits the party back together while the dungeon finishes its tantrum.`})),{success:!0,damage:n,preps:s}}case"scatter":{let n=0;for(const s of e.living())dn()<4&&(s.takeDamage(3),n++);return i.cleared=!0,{success:n<=1,hurt:n}}case"pass-by":case"proceed":default:return i.cleared=!0,{success:!0}}}const Zg={[K.FIGHTER]:{brave:["Stand back — this is the part I'm for.","If it bleeds on me, that's how I know it's working."],cunning:["A fight you skip counts double.","I hit hardest from the side nobody's watching."],greedy:["The sword's just how I open lockboxes.","Danger pay. Emphasis on pay."],scholarly:["I read a treatise on this maneuver. Chapter three. Brace.","Footwork is just grammar for the body."],pious:["My shield has a saint on it. She's watching. Form up.","The body is a temple. Mine's a fortress."],reckless:["Plan? I'm the plan.","Last one in buys the ale!"],craven:["I'll guard the rear. Someone has to. Far back.","My shield works best with me behind it and everything else very far away."],generic:["Behind me.","This is the job."]},[K.CLERIC]:{brave:["Faith walks in front. So do I.","The light goes first. I merely follow it, loudly."],cunning:["Grace favors the well-prepared.","The god helps those who check for tripwires."],greedy:["Tithes flow both directions, technically.","The god counts. So do I."],scholarly:["The liturgy has a verse for this. Several, actually.","The commentaries disagree. I don't."],pious:["We are exactly where we are meant to be. Regrettably.","Candles first. Then courage."],reckless:["The god forgives. That's the whole strategy.","Heal fast, ask later."],craven:["I have a strong feeling we should be elsewhere. Call it prophecy.","The god counsels prudence. Loudly. Through me. Right now."],generic:["Steady. All of you, steady.","Wounds after. Walking now."]},[K.WIZARD]:{brave:["I did not memorize this spell to whisper it.","Range is a suggestion. Watch."],cunning:["There's a cheaper way to do this. There always is.","Why duel what you can outwit?"],greedy:["Knowledge is treasure, but treasure is also treasure.","Transmutation started as a hobby. It's a livelihood now."],scholarly:["Fundamentals of Sorcery, volume three, page ninety: this exact mistake.","Fascinating. Everyone stand behind me while I annotate."],pious:["Magic is prayer with better handwriting.","I asked permission for this spell. Twice."],reckless:["Overchannel? I call it generous casting.","The safety margin is where the good magic lives."],craven:["I know a spell for this. It's called leaving.","I did not survive the academy by standing in the open."],generic:["Allow me.","This will only take a syllable."]},[K.ROGUE]:{brave:["Quietly is for people with time.","I'll scout it — from inside."],cunning:["Every door is a suggestion.","Doors, guards, promises — all pickable."],greedy:["It isn't stealing if the owner's a skeleton.","My fingers itch. That means gold, or a rash."],scholarly:["The lock's a three-pin Herrengrave. The book was wrong about them. I'm not.","I've studied every trap in the codex. This one's new. Wonderful."],pious:["Even locks answer to providence. I just expedite.","I confess in advance. Saves time."],reckless:["Traps are just puzzles with stakes.","I disarm faster when it's already ticking."],craven:["There's a wire there. I noticed it while planning my retreat.","I've counted the exits. There are three. I love them all."],generic:["Give me a moment, and don't watch.","Nobody move. Especially the floor."]},[K.ALCHEMIST]:{brave:["I've drunk worse than whatever that is.","Every explosion is a lesson. Class is in session."],cunning:["Measure twice, pour once.","Add nothing until you know what it does. Then add plenty."],greedy:["Gold in, gold out — that's the whole science.","Everything in this room fits in my satchel if I believe."],scholarly:["The notes end mid-sentence. I intend to finish them.","Peer review can wait. The flask can't."],pious:["The Work is a devotion. The explosions are incidental.","As above, so below. Mind the fumes between."],reckless:["Shake it and see.","If it smokes, it works. If it screams, it works better."],craven:["I keep my hazards bottled, thank you.","Run first. The reaction can finish without us."],generic:["I have something for this. Probably.","Don't breathe in until I say."]}},Jg=4;let ks=[];function Qg(i,e=[],t=Math.random){const n=Zg[i];if(!n)return null;const s=[];for(const l of e)n[l]&&s.push(...n[l]);s.length===0&&s.push(...n.generic);const r=s.filter(l=>!ks.includes(l)),a=r.length>0?r:s,o=a[Math.floor(t()*a.length)];return ks.push(o),ks.length>Jg&&ks.shift(),o}function Ze(i){return i[Math.floor(Math.random()*i.length)]}const Da={delve:["The dungeon door stands open, which is never a good sign. Cold air breathes up from below, smelling of wet stone and old ambition.","Torchlight ends three steps past the threshold. Somewhere below, something drips in a rhythm that is almost, but not quite, patient."],crypt:["The Ancient Crypt. The lintel is carved with names, and the names are carved with claw marks. Down the party goes, past generations of the politely furious dead.","Grave-cold rolls up the crypt stairs to meet them. Somewhere below, stone lids are not staying put."],volcanic:["The Cinder Galleries breathe out heat like a sleeping forge. The walls glow faintly at the seams, and the floor is warm through good boots.","Down into the mountain's throat. The air shimmers, the torches are redundant, and something below is keeping the fires fed."],library:["The Drowned Athenaeum. Water-stained shelves climb out of sight, and the silence has the specific weight of a librarian's attention.","Past the flooded card catalogue and down. Every book in the dark is closed. The party tries not to think about what opens them."],madlab:["The Mad Alchemist's Dungeon. The welcome mat is a chalk circle, half-scrubbed. The smell is sulfur, roses, and a third thing nobody names aloud.","Glassware glints in the dark below — miles of it, still bubbling. The experiments did not stop when the alchemist did."],castle:["The Castle of the Vampire Lord. The doors open themselves, the candles are already lit, and somewhere above, someone is very glad you've come.","The portcullis rises without a hand on the winch. Every window is curtained against a sun that set hours ago. The party is expected."],bogcellar:["The Root Cellar of the Bog Witch. The stairs are slick, the shelves go down farther than cellars should, and every jar turns to watch.","Down past the hanging herbs and into the earth-smell. Something on the third shelf is knocking, politely, from the inside."],icecaverns:["The Ice Caverns of the Mad Pyromancer. The walls are glass-smooth where they melted and refroze, and warm air breathes up from below like the mountain has a fever.","Ice underfoot, scorch marks overhead. The physics of this place gave notice long ago and were not replaced."]},wl={castle:["The candles gutter all at once, and the darkness that follows has weight and direction. The castle is feeding.","Every mirror in the corridor turns to face the party. There are more mirrors than there were."],bogcellar:["A shelf lets go — a hundred jars at once, and not everything that spills stays spilled. The cellar floor begins to digest.","The roots in the walls flex, and the ceiling of packed earth sags like a held breath about to end."],icecaverns:["A vein of old fire meets a wall of older ice. The steam blast is instant, scalding, and very impressed with itself.","The ceiling thaws in one groaning sheet. What refreezes will refreeze sharp; what falls, falls now."],volcanic:["The mountain clears its throat. Lava finds a new opinion about which passages should exist.","A cinder squall rolls up the gallery, and the party breathes through wet cloth and profanity."],crypt:["Every lid in the corridor shifts at once — one knuckle's width. The dead are politely making room for more.","The barrow-damp thickens until the torches burn blue. Something below is exhaling."],library:["The stacks lean in. A shelf-quake rains folios, and some of them land arguing.","The flood rises a hand's width in a minute, and the books scream quietly the way wet paper does."],madlab:["Something upstream of the drains achieves criticality. The color of the light has no name and wants one.","A retort the size of a wardrobe cracks, and the room's weather becomes chemical."]},Tl={entrance:Da.delve,corridor:["A long corridor, scarred by the claws and cart-wheels of every expedition that came before. Most of them came back. Most.","The passage narrows until the fighters walk sideways and the wizard complains about the acoustics."],monster:["Something is waiting in this room, and it has heard you coming since the entrance hall.","Eyes in the dark — the reflective kind, the patient kind. The room smells of den."],trap:["The floor here is too clean. Nothing in a dungeon is clean by accident.","The rogue holds up a fist. Everyone stops. There — a seam in the flagstones, thin as a lie."],treasure:["A chest squats in the lamplight, brass-bound and altogether too inviting. The last hands to touch it left in a hurry, or not at all.","Coins spill from a split sack across the floor — the classic bait, arranged by someone who understands adventurers deeply."],library:["Shelves climb into the dark, sagging under grimoires, ledgers, and one book that is very clearly breathing.","A library, miraculously dry. The dust here is a hundred years deep and lettered in three dead languages."],shrine:["A small shrine glows at the corridor's elbow — candles that no one lights, burning anyway. The stone floor is warm here.","An altar of some patient, forgiving god. The kneeling-groove in the stone is deep; many desperate parties came this way."],lab:["An alchemist's laboratory, abandoned mid-experiment: the alembic still holds something green, and the notes end mid-sentence.","Benches of glassware, a cold athanor, jars labeled in a hurried hand — a working lab, waiting for working hands."],materials:["Herbs hang from the ceiling in dusty bundles; salts and quicksilver sit in labeled jars. A gatherer's dream, a satchel's burden.","The room is thick with dried simples and mineral blooms — everything a bench-worker could want, free for the pocketing."],disaster:["The ceiling groans. Dust sifts down in slow curtains. The dungeon is about to have an opinion.","Water is coming in somewhere — fast, cold, and rising past the ankle before anyone finishes swearing."],boss:["The final chamber. The air itself is heavier here, and the thing at its center has been expecting visitors far better armed than you.","Every dungeon keeps its worst for last. The door swings wide on the proof."],vault:["A vault. Someone sealed this room and walled over the seal, which raises exactly one question: from which side?","The hidden room is small, dry, and stacked to the beams. Whoever hoarded this never came back for it. The dungeon knows why.","Coin-shine in the dark — a vault, untouched since its owner's luck ran out somewhere between here and daylight."]},ev=["🕳️ {finder} taps the wall and the wall answers wrong — hollow. A seam, a catch, and a door that was never meant to be found swings inward.","🕳️ {finder} stops mid-stride: the dust on this stretch of floor has been disturbed from the *inside*. A hidden door gives under one shoulder.","🕳️ A draft where no draft should be. {finder} follows it to a false stone, and the dungeon reluctantly shows its hidden room."],tv=["🧭 A side passage breathes cold air across the party's torches, and curiosity wins the vote.","🧭 There is a way that is forward and a way that is *interesting*. The party takes the interesting one."],nv=["🚶 A side passage yawns to one side. The party looks at it, looks at each other, and keeps marching.","🚶 Somewhere down that branching corridor is either treasure or teeth. The party elects not to find out which."];function iv(i){var n;const e=i.living().find(s=>s.class===K.ROGUE),t=e?e.name:((n=i.living()[0])==null?void 0:n.name)||"Someone";return Ze(ev).replace("{finder}",t)}function sv(i){return Ze(i?tv:nv)}const Al={fight:"draw steel and settle it",flee:"fall back and live to try again",sneak:"follow the rogue the quiet way","turn-undead":"let the cleric's light do the arguing",bribe:"pay the toll like honest travelers","spell-strike":"open with the grimoire",disarm:"trust the rogue's fingers","push-through":"grit teeth and push through","search-around":"find another way","spell-bypass":"let magic solve it",loot:"take everything that glitters",inspect:"poke it with a stick first, as tradition demands","leave-it":"walk away from the shine",study:"raid the shelves for spells","deep-study":"let the wizard open the sealed texts",rest:"kneel and take the shrine's mercy",desecrate:"pry the gold leaf off the altar","pass-by":"keep marching",proceed:"press on",alchemy:"set the alchemist to the bench",gather:"fill the satchel",brace:"lock shields and endure",scatter:"scatter and pray","knock-open":"open it from across the room, loudly","cause-fear":"break the thing's nerve before it can use its teeth","smoke-bomb":"let the alchemist spring it from a safe distance"},Rl={brave:"the Bold blood in the party carried the vote",cunning:"the Cunning heads prevailed, as they usually do",greedy:"the Covetous streak would not be argued down",scholarly:"the Scholarly bent won out — knowledge is the only treasure that walks out on its own legs",pious:"the Devout among them spoke, quietly, and that settled it",reckless:"the Reckless howled loudest, and the Reckless got their way",craven:"the Craven voice had already counted the exits, and the counting was persuasive"},rv={fight:K.FIGHTER,sneak:K.ROGUE,disarm:K.ROGUE,"turn-undead":K.CLERIC,rest:K.CLERIC,"deep-study":K.WIZARD,"spell-strike":K.WIZARD,"spell-bypass":K.WIZARD,alchemy:K.ALCHEMIST,gather:K.ALCHEMIST};function av(i,e,t){const n=Al[i]||i,s=e.filter(c=>c.id!==i).slice(0,2).map(c=>Al[c.id]||c.id);let r=null;const a=rv[i];if(a&&t.hasClass(a)){const c=t.living().find(d=>d.class===a),h=Qg(c.class,t.personalities);r=h?`${c.name} made the case: "${h}"`:`${c.name} made the case`}else for(const c of t.personalities)if(Rl[c]){r=Rl[c];break}r||(r="instinct and tired feet decided");const o=r.endsWith('"')?"":".";return s.length===0?`There was only one road: the party chose to ${n}.`:`They might have chosen to ${s.length===2?`${s[0]}, or ${s[1]}`:s[0]} — but ${r}${o} The party chose to ${n}.`}function ov(i,e,t,n){var r;const s=[];switch(e){case"fight":{const a=(r=t.itemActions)==null?void 0:r.find(o=>o.opening||o.vsUndead||o.summonAttack);if(a&&s.push(`🪄 ${a.member}'s ${a.item} answers first — ${a.name}.`),t.success&&t.rounds===0)s.push(`⚔️ ${kt(t.monster)} is over before it begins. The party steps around what's left.`);else{const o=`${t.rounds} bloody round${t.rounds===1?"":"s"}`;s.push(t.success?Ze([`⚔️ ${kt(t.monster)} falls after ${o}. The party stands, breathing hard, in possession of the field.`,`⚔️ It takes ${o} and costs ${t.damage} health in bruises and worse, but ${t.monster} will trouble no one again.`,`⚔️ ${o[0].toUpperCase()+o.slice(1)}, and then a silence with ${t.monster} at the bottom of it. The party wins the argument.`,`⚔️ Steel does what diplomacy couldn't. ${kt(t.monster)} is down, and the room changes ownership.`]):Ze([`☠️ ${kt(t.monster)} was too much. The line broke, and the dungeon collected its due.`,`☠️ The party gave everything it had, and ${t.monster} took the rest. The dungeon is very good at arithmetic.`]))}break}case"spell-strike":{t.spell?t.spellEdge==="weak"?s.push(`🔥 The caster reads the thing and reaches for ${t.spell} — chosen precisely, because this one hates ${t.spellElement}. It lands like an argument won in advance.`):t.spellEdge==="swarm"?s.push(`🔥 ${t.spell} tears through the packed bodies — a swarm is mostly targets.`):t.spellEdge==="resisted"?s.push(`🔥 ${t.spell} lands, and the thing shrugs off half of it. The caster files that away for next time.`):s.push(`🔥 ${t.spell} lights the room before a blade is drawn — the fight that follows is short and one-sided.`):s.push("🔥 The grimoire is bare, so steel must do the whole job."),t.success&&s.push("The room is won.");break}case"sneak":s.push(t.success?Ze([`🗡️ Single file, breath held, past ${t.monster} — it never knew its luck.`,`🗡️ The rogue's route works: over the fallen lintel, behind ${t.monster}, gone. Nobody exhales until the next room.`]):Ze([`🗡️ A loose stone turns underfoot. ${kt(t.monster)} gets one good swipe in before the party scrambles clear.`,`🗡️ Halfway past, someone's buckle sings against stone. ${kt(t.monster)} charges; the party pays the toll in bruises.`]));break;case"turn-undead":s.push(t.success?"✨ The holy symbol blazes. The dead remember, briefly, that they are dead — and act accordingly.":"✨ The light flickers and fails. Bones do not always listen, and these had opinions.");break;case"bribe":s.push(`💰 Fifteen gold changes hands. ${kt(t.monster)} counts it twice and waves the party through with something like professional respect.`);break;case"cause-fear":s.push(Ze([`😱 ${t.spell||"Cause Fear"} lands like a cold hand on the neck. ${kt(t.monster)} remembers an appointment elsewhere, urgently.`,`😱 One syllable of dread, and ${t.monster} discovers it was never paid enough for this. The room empties at speed.`]));break;case"smoke-bomb":s.push(Ze(["⚗️ The alchemist lobs a smoking vial from thirty feet, and the trap spends its violence on fog. A material well spent.","⚗️ One concoction, one long arc, one very dead trap. The alchemist accepts the applause with a small bow."]));break;case"knock-open":s.push(t.wasMimic?`🚪 ${t.spell} slams the lid open from across the room — and TEETH snap shut on empty air. The mimic sulks; the party collects ${t.gold} gold at arm's length.${t.consumed?" The scroll burns.":""}`:`🚪 ${t.spell} booms through the chamber and the lock surrenders at range. ${t.gold} gold, no surprises${t.consumed?"; the scroll burns":""} — though everything below now knows precisely where you are.`);break;case"flee":s.push(Ze(["💨 The party falls back in good order — mostly. The dungeon keeps the room, for now.","💨 Retreat, regroup, pretend it was tactics. The room stays hostile behind them."]));break;case"disarm":s.push(t.success?Ze(["🗝️ A click, a held breath, a slack wire. The rogue pockets the trigger pin as a souvenir.","🗝️ Three pins, one prayer, no explosion. The rogue takes a bow nobody asked for.","🗝️ The mechanism surrenders quietly, the way good work makes things do."]):Ze(["🗝️ Almost. The mechanism spends itself with a crack, and someone limps for the next few rooms.","🗝️ The wire was a decoy; the real trigger was the floor. The rogue apologizes from the far wall."]));break;case"push-through":s.push(Ze([`💥 Straight through — it costs ${t.damage} health and nobody's pride survives, but the corridor is behind them.`,`💥 Heads down, teeth gritted: ${t.damage} health buys the far side of the room.${t.spotted?" The Craven called the tripwire, which is why it was only that much.":""}`]));break;case"loot":s.push(t.mimic?Ze([`🦷 The chest has TEETH. After a horrible interval it is persuaded to be furniture again — ${t.gold} gold richer, several nerves poorer.`,`🦷 The lid comes up and so does the tongue. When it's over there are ${t.gold} gold and a new shared silence about chests.`]):Ze([`💰 ${t.gold} gold, honest and heavy. The bags sing on the walk out.`,`💰 ${t.gold} gold counted twice, because counting it once felt too good to trust.`,`💰 The hoard is real: ${t.gold} gold, no teeth, no curse anyone's noticed yet.`]));break;case"inspect":s.push(Ze([`🔍 Poked, prodded, pronounced safe. ${t.gold} gold, collected with dignity intact.`,`🔍 Ten careful minutes and a stick sacrificed to science: ${t.gold} gold, no surprises.`]));break;case"leave-it":s.push(Ze(["🚶 The party walks away from free gold. Somewhere, a mimic sighs.","🚶 Gold left gleaming in the dark. Restraint, or superstition — the ledger doesn't care which."]));break;case"study":s.push(Ze([`📚 ${t.learned} new working${t.learned>1?"s":""} copied into the grimoire by candle stub. The stacks keep their silence.`,`📚 Dust, patience, and ${t.learned} working${t.learned>1?"s":""} the dungeon's last owners won't be needing.`]));break;case"deep-study":s.push(t.success?"🔏 The sealed text opens for the wizard and, crucially, closes again. The party is two workings richer and only slightly haunted.":"🔏 The book bites back. The wizard is thrown across the room trailing smoke and vindication.");break;case"rest":s.push(Ze([`🕯️ Candles, quiet, and ${t.healed} health apiece. The god of small mercies does steady work.`,`🕯️ The party kneels badly and means it anyway. ${t.healed} health apiece, no questions asked.`,`🕯️ Warm stone, old wax, ${t.healed} health returned. Whoever keeps this shrine keeps it well.`]));break;case"desecrate":s.push("⛏️ Thirty gold in scraped-off leaf. The silence afterward has a texture to it. The dungeon takes notes.");break;case"alchemy":{const a=t.alchemy;a?a.type==="potion"?s.push(`⚗️ Glass sings, something turns gold at the bottom of the flask: a healing draught${a.doubled?" — two, in fact; Perenelle works in doubles":""}, corked and pocketed.`):s.push(`⚗️ The alchemist paints ${a.mod.name} down the edge of ${a.target}'s weapon. It hisses. Everyone takes one respectful step back.`):s.push("⚗️ The bench is willing but the satchel is empty — no materials, no miracles.");break}case"gather":{const a=n.hasClass(K.ALCHEMIST)?"The alchemist hums approvingly at everything.":"Nobody is sure what half of it does, but weight is weight.";s.push(`🌿 ${t.materials} bundle${t.materials>1?"s":""} of herbs and salts go into the satchel. ${a}`);break}case"brace":s.push(`🌋 Shields up, heads down — the dungeon does its worst (${t.damage} damage's worth) and the party is still there when the dust settles.`);break;case"scatter":s.push(t.success?"🌋 Everyone runs their own way and nearly everyone guesses right. The regrouping is sheepish but intact.":`🌋 Scattering was a theory. ${t.hurt} of the party guessed wrong, and the bruises will remember.`);break;default:s.push("The party presses on, deeper and down.")}for(const a of t.preps||[])s.push(a.text);return s.join(" ")}const Cl={[K.FIGHTER]:["— shield still up, the door held one last time.","— facing the thing, which was always the plan.","— and the back rank learns, all at once, what the front rank was for."],[K.CLERIC]:["— mid-blessing, the lantern light going out last of all.","— hands still warm from a mending that wasn't their own.","— and whatever was listening to their prayers hears the silence."],[K.WIZARD]:["— the unfinished syllable hanging in the air like smoke.","— annotating the fatal error to the very end.","— and the grimoire is suddenly just a book."],[K.ROGUE]:["— two steps short of a shadow that would have held them.","— and everyone's spare coin, it is later discovered, goes with them.","— having checked everything in the room for traps except the obvious."],[K.ALCHEMIST]:["— the satchel breaking open in a small, private rainbow.","— mid-measurement. The reaction, at least, completes.","— leaving notes that end, as their master's always did, mid-sentence."]},lv=["The party does not stop. Stopping is for the surface.","Someone closes their eyes for them. There is no time for more.","The delve grows quieter by exactly one voice.","What can be carried of theirs is carried on. The rest is mourned at marching pace."];function Pl(i){const e=Cl[i.class]||Cl[K.FIGHTER];return`☠️ ${i.name} falls ${Ze(e)} ${Ze(lv)}`}const cv=["The dungeon goes quiet again, the way it always does. The next party will find good gear, lightly used, and a warning nobody will heed.","They were brave, or greedy, or both — the dungeon does not distinguish and does not care. The torches burn down. The dark files its claim.","Above ground, the tavern keeps their tab open a decent interval, then wipes the slate. The dungeon keeps better records.","No one sees them fall who lives to say so. The story ends the way the honest ones do: mid-sentence, underground."],hv=["Up the long stair and out into weather — sunlight, absurd and wonderful, on faces that have earned it. The tavern will not believe a word, and every word is true.","The boss's hoard divides beautifully. Someone proposes retirement. Everyone laughs. They will all be back within the month.","They come up singing something unprintable and out of tune, and the town forgives it instantly, because look what they're carrying.","The last door closes behind them and becomes, in the telling, three times as heavy and guarded by twice as much. Every victory improves with altitude."],dv=["The town takes the party in the way towns do: ale first, questions later, prices adjusted for visible wounds. Somewhere below, the next dungeon is already rearranging itself.","Lamplight, real bread, a bed that is not stone. The innkeeper chalks the party's tab with professional optimism — heroes flush with dungeon gold rarely haggle.","The temple takes donations, the apothecary takes more, and by morning the whole town knows what came crawling out of the dark with full pockets."];function uv(i,e){const t=Ze(dv),n=`Rumor already speaks of what waits at depth ${e+1}, and rumor sounds impressed.`;return`${t} ${n}`}function Ll(i,e=null){if(i.type===pe.ENTRANCE&&e&&Da[e.id])return Ze(Da[e.id]);if(i.type===pe.DISASTER&&e&&wl[e.id])return Ze(wl[e.id]);if(i.type===pe.BOSS&&i.monster)return Ze([`The final chamber. ${kt(i.monster.name)} waits at its heart, and it has been expecting visitors far better armed than you.`,`Every dungeon keeps its worst for last. The door swings wide on ${i.monster.name}.`,`${kt(i.monster.name)} fills the last room the way weather fills a sky. There is no going around this one.`]);if(i.type===pe.MONSTER&&i.monster)return Ze([`${kt(i.monster.name)} holds the room, and it heard the party coming since the entrance hall.`,`The room is not empty: ${i.monster.name}, between the party and the way down.`,`${kt(i.monster.name)} rises out of the dark. The smell of it arrives first.`]);const t=Tl[i.type]||Tl.corridor;return Ze(t)}function fv(i,e,t=null){const n=i.members.map(r=>r.name).join(", "),s=t?` in ${t.name}`:"";return`${Ze(cv)} Here ended${s}: ${n}. Rooms conquered: ${e}.`}function pv(i,e,t=null){const n=i.living().map(r=>r.name).join(", "),s=t?` of ${t.name}`:"";return`${Ze(hv)} Walked out${s}: ${n}. Rooms conquered: ${e}.`}function kt(i){return i&&i.charAt(0).toUpperCase()+i.slice(1)}class mv{constructor(e,t="delve",n="medium",s={}){var a;this.seed=t,this.difficulty=n,this.depth=Math.max(1,s.depth||1),this.party=e instanceof Ys?e:new Ys(e),this.dungeon=s.layout?Vg(s.layout):Bg(t,n,{wantLab:this.party.hasClass(K.ALCHEMIST),theme:s.theme,depth:this.depth,condition:s.condition}),this.condition=this.dungeon.condition,this.path=this.dungeon.spine.slice(),this.roomIndex=0,this.turn=0,this.roomsCleared=0,this.gameOver=!1,this.victory=!1,this.paused=!1,this.epitaph=null,this.lastNarration=null,this.log=[];const r={easy:1,medium:1.5,hard:2,nightmare:3}[n]||1;this.scoreMultiplier=r*(1+(((a=this.condition)==null?void 0:a.scoreBonus)||0))}addLog(e){this.log.push(e)}tick(){if(this.paused||this.gameOver)return;this.turn++,this.roomIndex++;const e=this.path[this.roomIndex],t=e!==void 0?this.dungeon.getRoom(e):null;if(!t){this.finish(!0);return}this.party.restStep();const n=this.party.living(),s=this.party.applyLinger();if(s&&!this.party.isAlive()){this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:"linger",predicament:Ll(t,this.dungeon.theme),deliberation:"There was no deliberating with what was already in the blood.",resolution:`🐍 The venom finishes its work a room too late to fight back against. ${s.damage} health, taken quietly.`,falls:n.filter(d=>!d.isAlive()).map(d=>Pl(d)),aside:null},this.finish(!1);return}const r=Ll(t,this.dungeon.theme),a=Ic(t,this.party),o=Yg(t,this.party),l=Dc(t,this.party,o),c=n.filter(d=>!d.isAlive());(l.success!==!1||t.cleared)&&this.roomsCleared++,this.lastNarration={room:t.type,icon:t.icon,roomIndex:e,action:o,predicament:r,deliberation:av(o,a,this.party),resolution:ov(t,o,l,this.party),falls:c.map(d=>Pl(d)),aside:s?s.cured?"🐍 On the walk, the cleric finds the venom before it finds a vein, and burns it out with a word.":`🐍 The venom from the last room chooses this moment: ${s.damage} health, paid on the march.`:null};const h=this.party.isAlive()?this.dungeon.branchAt(e):null;if(h)if(h.secret){if(jg(this.party)){h.consumed=!0;for(const d of h.rooms)this.dungeon.rooms[d].discovered=!0;this.path.splice(this.roomIndex+1,0,...h.rooms),this.lastNarration.aside=[this.lastNarration.aside,iv(this.party)].filter(Boolean).join(" "),this.addLog("🕳️ A hidden door!")}}else{h.consumed=!0;const d=Kg(this.party);d&&this.path.splice(this.roomIndex+1,0,...h.rooms),this.lastNarration.aside=[this.lastNarration.aside,sv(d)].filter(Boolean).join(" ")}if(this.addLog(`${t.icon} Room ${this.roomIndex}: ${t.type} — ${o}`),l.retreated&&this.roomIndex--,!this.party.isAlive()){this.finish(!1);return}t.type===pe.BOSS&&t.cleared&&(this.party.addScore(Math.round(100*this.scoreMultiplier)),this.finish(!0))}finish(e){this.gameOver=!0,this.victory=e,this.epitaph=e?pv(this.party,this.roomsCleared,this.dungeon.theme):fv(this.party,this.roomsCleared,this.dungeon.theme),this.addLog(e?"🏆 The dungeon is beaten!":"☠️ The party has fallen.")}getState(){const e=Math.min(this.roomIndex,this.path.length-1);return{turn:this.turn,roomIndex:this.roomIndex,currentRoomIndex:this.path[e],pathLength:this.path.length,knownIdxs:[...this.path.slice(0,this.roomIndex+2),this.dungeon.spine[this.dungeon.spine.length-1]],dungeon:this.dungeon,depth:this.depth,theme:{id:this.dungeon.theme.id,name:this.dungeon.theme.name,icon:this.dungeon.theme.icon,tagline:this.dungeon.theme.tagline},condition:this.condition&&this.condition.id!=="none"?{id:this.condition.id,name:this.condition.name,icon:this.condition.icon,text:this.condition.text}:null,party:{members:this.party.members.map(t=>({name:t.name,class:t.class,icon:t.icon,health:t.health,maxHealth:t.maxHealth,attack:t.attack,defense:t.defense,mind:t.mind,alive:t.isAlive(),equipment:t.equipment.map(n=>n.name),weaponMods:t.weaponMods.map(n=>n.name)})),gold:this.party.gold,score:this.party.score,materials:this.party.materials,potions:this.party.potions.length,grimoire:this.party.grimoire.map(t=>t.name),spellsLearned:this.party.spellsLearned,personalities:this.party.personalities},gameOver:this.gameOver,victory:this.victory,epitaph:this.epitaph,narration:this.lastNarration,log:this.log.slice(-12)}}getRunResult(){return{score:this.party.score,gold:this.party.gold,roomsCleared:this.roomsCleared,turns:this.turn,victory:this.victory,survivors:this.party.living().length,partySize:this.party.members.length,spellsLearned:this.party.spellsLearned,epitaph:this.epitaph}}setPaused(e){this.paused=e}}const Yt={healPerHp:2,potion:15,piousDiscount:.75,forge:20,forgeMod:{name:"smith's edge",attack:2}};function gv(i,e=1){const t=i.stats,n=t.health+t.attack*2+t.defense*2+t.mind;return Math.round((12+n)*(1+.15*(e-1)))}class Uc{constructor(e,{seed:t="campaign",difficulty:n="medium",condition:s="none",layout:r=null}={}){this.party=e instanceof Ys?e:new Ys(e),this.seed=t,this.difficulty=n,this.condition=s,this.layout=r,this.depth=0,this.roomsCleared=0,this.over=!1,this.retired=!1}nextDelve(e=void 0){return this.over?null:(this.depth++,new mv(this.party,`${this.seed}-depth-${this.depth}`,this.difficulty,{depth:this.depth,theme:e,condition:this.condition,layout:this.depth===1?this.layout:null}))}recordDelve(e){this.roomsCleared+=e.roomsCleared,e.victory||(this.over=!0)}missingHealth(){return this.party.living().reduce((e,t)=>e+(t.maxHealth-t.health),0)}healCost(){const e=this.missingHealth()*Yt.healPerHp,t=this.party.hasPersonality("pious")?Yt.piousDiscount:1;return Math.ceil(e*t)}healAll(){const e=this.healCost(),t=this.missingHealth();if(t===0||this.party.gold<e)return null;this.party.gold-=e;for(const n of this.party.living())n.heal(n.maxHealth);return{healed:t,cost:e}}buyPotion(){return this.party.gold<Yt.potion?!1:(this.party.gold-=Yt.potion,this.party.potions.push({kind:"healing-draught",heal:6}),!0)}recruitOffers(){if(this._recruitDepth!==this.depth){const t=new Ks(`${this.seed}-hire-${this.depth}`).shuffle(Bl);this._recruitDepth=this.depth,this._recruitOffers=t.slice(0,2).map(n=>({card:n,cost:gv(n,this.depth)}))}return this._recruitOffers.filter(e=>e)}recruit(e){const t=this.recruitOffers(),n=t.findIndex(l=>l&&l.card.id===e);if(n===-1)return null;const{card:s,cost:r}=t[n];if(this.party.gold<r)return null;this.party.gold-=r;const a=this.party.addMember(s),o=this._recruitOffers.findIndex(l=>l&&l.card.id===e);return this._recruitOffers[o]=null,a}forgeCost(){return Yt.forge+(this.depth-1)*4}forge(){const e=this.forgeCost(),t=this.party.living();if(t.length===0||this.party.gold<e)return null;this.party.gold-=e;const n=t.reduce((r,a)=>r.attack>=a.attack?r:a),s={...Yt.forgeMod};return n.addWeaponMod(s),{target:n.name,mod:s}}retire(){this.over=!0,this.retired=!0}getSummary(){return{depth:this.depth,score:this.party.score,gold:this.party.gold,roomsCleared:this.roomsCleared,survivors:this.party.living().length,partySize:this.party.members.length,spellsLearned:this.party.spellsLearned,retired:this.retired,over:this.over}}}const Il={EASY:{id:"easy",name:"Easy",icon:"🌱",scoreMultiplier:1},MEDIUM:{id:"medium",name:"Medium",icon:"🌳",scoreMultiplier:1.5},HARD:{id:"hard",name:"Hard",icon:"⛰️",scoreMultiplier:2},NIGHTMARE:{id:"nightmare",name:"Nightmare",icon:"💀",scoreMultiplier:3}},Dl="dungeonab_progression";class vv{constructor(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.loadFromStorage()}recordRun(e,t){this.runHistory.unshift({id:`run_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,timestamp:Date.now(),difficulty:e,score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:t.victory,survivors:t.survivors,partySize:t.partySize,depth:t.depth||1,condition:t.condition||null}),this.runHistory.length>50&&(this.runHistory=this.runHistory.slice(0,50)),(!this.bestScores[e]||t.score>this.bestScores[e])&&(this.bestScores[e]=t.score),t.victory&&(this.victories[e]=(this.victories[e]||0)+1),this.totalRuns++,this.saveToStorage()}getStats(){const e=Object.values(this.victories).reduce((t,n)=>t+n,0);return{totalRuns:this.totalRuns,totalVictories:e,bestScores:{...this.bestScores},avgScore:this.totalRuns>0?Math.round(this.runHistory.reduce((t,n)=>t+n.score,0)/Math.min(this.totalRuns,this.runHistory.length)):0}}getRecentRuns(e=5){return this.runHistory.slice(0,e)}saveToStorage(){typeof localStorage>"u"||localStorage.setItem(Dl,JSON.stringify({runHistory:this.runHistory,bestScores:this.bestScores,totalRuns:this.totalRuns,victories:this.victories}))}loadFromStorage(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Dl);if(!e)return;const t=JSON.parse(e);this.runHistory=t.runHistory||[],this.bestScores=t.bestScores||{},this.totalRuns=t.totalRuns||0,this.victories=t.victories||{}}catch(e){console.error("Failed to load progression:",e)}}reset(){this.runHistory=[],this.bestScores={},this.totalRuns=0,this.victories={},this.saveToStorage()}}const qn=new vv;function _v(i,{seed:e,difficulty:t,condition:n,targetDepth:s}){const r=new Uc(i.map(o=>({...o})),{seed:e,difficulty:t,condition:n});let a=0;for(let o=0;o<s;o++){const l=r.nextDelve();if(!l)break;let c=0;for(;!l.gameOver&&c++<500;)l.tick();if(r.recordDelve(l),a++,r.over)break}return{score:r.party.score,depthReached:a}}function yv(i,e,t={}){const{seed:n="table",difficulty:s="medium",condition:r="none",hexes:a={}}=t,o=Math.max(1,e.depth||1),l=[];for(const c of i.seats.filter(h=>h.isAI)){const h=a[c.id]?vn(a[c.id]):null,d=h?Gl(r,h):r,f=_v(c.pool,{seed:`${n}-rival-${c.id}`,difficulty:s,condition:d,targetDepth:o});l.push({name:c.name,icon:c.icon,isPlayer:!1,hexIcon:h&&h.id!=="none"?h.icon:null,...f})}return l.push({name:"You",icon:"🗡️",isPlayer:!0,score:e.score,depthReached:o,hexIcon:e.hexIcon||null}),l.sort((c,h)=>h.score-c.score||h.depthReached-c.depthReached),l.forEach((c,h)=>{c.place=h+1}),l}const Ul="dungeonab_dungeon_archive",xv=30;class Mv{constructor(e=null){this.storage=e||(typeof localStorage<"u"?localStorage:null),this.entries=[],this.load()}load(){if(this.storage)try{this.entries=JSON.parse(this.storage.getItem(Ul)||"[]")}catch{this.entries=[]}}persist(){if(this.storage)try{this.storage.setItem(Ul,JSON.stringify(this.entries))}catch{}}save(e){var n;const t={id:`dgn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`,date:Date.now(),custom:!1,...e};if(this.entries.unshift(t),this.entries.length>xv){const s=(n=this.entries.map((r,a)=>[r,a]).reverse().find(([r])=>!r.custom))==null?void 0:n[1];this.entries.splice(s!==void 0?s:this.entries.length-1,1)}return this.persist(),t}update(e,t){const n=this.entries.find(s=>s.id===e);return n?(Object.assign(n,t),this.persist(),n):null}get(e){return this.entries.find(t=>t.id===e)||null}remove(e){const t=this.entries.length;return this.entries=this.entries.filter(n=>n.id!==e),this.persist(),this.entries.length<t}list(){return this.entries}}const Ws=new Mv,Sv={entrance:"#8fb8dd",corridor:"#555",monster:"#c84c3c",trap:"#e8724a",treasure:"#d8a53f",library:"#b07ae8",shrine:"#e8d48a",lab:"#3cb8a8",materials:"#4a8a5c",disaster:"#e05555",boss:"#ff4444",vault:"#ffd75e"},bv=["monster","gold","mimicChance","trapDamage","materials"];function Ev(i,e,t){const n=i.rooms.find(s=>s.index===e);if(!n||n.type===pe.ENTRANCE||n.type===pe.BOSS||t===pe.ENTRANCE||t===pe.BOSS)return!1;for(const s of bv)delete n[s];return n.type=t,Object.assign(n,Wg(t,Kn[i.themeId]||Kn.delve)),!0}function wv(i,e,t){const n=i.branches[e];if(!n)return!1;n.secret=t;for(const r of n.rooms){const a=i.rooms.find(o=>o.index===r);a&&(a.secret=t)}const s=i.edges.find(r=>r.b===n.rooms[0]);return s&&(s.secret=t),!0}function Nl(i,e){const t=i.getContext("2d"),n=i.width,s=i.height;t.clearRect(0,0,n,s),t.fillStyle="#0d0b08",t.fillRect(0,0,n,s);const r=e.rooms.map(g=>g.x),a=e.rooms.map(g=>g.y),o=12,l=(n-o*2)/Math.max(1,Math.max(...r)-Math.min(...r)),c=(s-o*2)/Math.max(1,Math.max(...a)-Math.min(...a)),h=Math.min(l,c,26),d=g=>o+(g.x-Math.min(...r))*h,f=g=>o+(g.y-Math.min(...a))*h,p=new Map(e.rooms.map(g=>[g.index,g]));for(const g of e.edges){const v=p.get(g.a),m=p.get(g.b);!v||!m||(t.beginPath(),t.setLineDash(g.secret?[3,3]:[]),t.strokeStyle=g.secret?"#d8a53f":"#4a443a",t.lineWidth=1.5,t.moveTo(d(v),f(v)),t.lineTo(d(m),f(m)),t.stroke())}t.setLineDash([]);for(const g of e.rooms){const v=g.type==="boss"?9:6;t.fillStyle=Sv[g.type]||"#777",t.fillRect(d(g)-v/2,f(g)-v/2,v,v),g.secret&&(t.strokeStyle="#ffd75e",t.strokeRect(d(g)-v/2-1.5,f(g)-v/2-1.5,v+3,v+3))}}function Tv({onDelve:i}){const e=document.getElementById("archive-overlay"),t=document.getElementById("archive-body"),n=document.getElementById("archive-btn"),s=document.getElementById("archive-close-btn"),r=l=>{const c=document.createElement("div");return c.textContent=l,c.innerHTML},a=()=>{const l=Ws.list();t.innerHTML=l.length?"":'<div class="records-empty">No dungeons archived yet. Finish a delve and its design is kept here.</div>';for(const c of l){const h=document.createElement("div");h.className="arch-item";const d=c.outcome||{};h.innerHTML=`
        <canvas width="150" height="96"></canvas>
        <div style="flex:1;min-width:0;">
          <div style="color:#d8a53f;font-weight:bold;">${c.custom?"✏️ ":""}${r(c.name||"Unnamed delve")}</div>
          <div style="color:#887755;font-size:0.72rem;">
            ${d.victory===!0?"🏆":d.victory===!1?"☠️":"📐"}
            ${c.layout.rooms.length} rooms · ${c.layout.branches.filter(f=>f.secret).length} secret ·
            ${new Date(c.date).toLocaleDateString()}
          </div>
          <div style="display:flex;gap:0.35rem;margin-top:0.4rem;flex-wrap:wrap;">
            <button data-act="delve" style="font-size:0.72rem;padding:0.3rem 0.6rem;">⚔️ Delve</button>
            <button data-act="edit" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a2213;color:#d8a53f;">✏️ Edit</button>
            <button data-act="del" style="font-size:0.72rem;padding:0.3rem 0.6rem;background:#2a1515;color:#e08080;">🗑️</button>
          </div>
        </div>
      `,Nl(h.querySelector("canvas"),c.layout),h.querySelector('[data-act="delve"]').addEventListener("click",()=>{e.classList.remove("active"),i(c)}),h.querySelector('[data-act="edit"]').addEventListener("click",()=>o(c)),h.querySelector('[data-act="del"]').addEventListener("click",()=>{Ws.remove(c.id),a()}),t.appendChild(h)}},o=l=>{var v;const c=JSON.parse(JSON.stringify(l.layout)),h=Object.values(pe).filter(m=>m!=="entrance"&&m!=="boss");t.innerHTML=`
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
    `;const d=document.getElementById("arch-edit-map"),f=()=>Nl(d,c),p=document.getElementById("arch-rooms");for(const m of c.rooms){const u=document.createElement("div");u.style.cssText="display:flex;gap:0.5rem;align-items:center;padding:0.15rem 0;border-bottom:1px dashed #2a2318;";const b=m.type==="entrance"||m.type==="boss";u.innerHTML=`
        <span style="width:1.6rem;color:#665;">#${m.index}</span>
        <span style="width:0.9rem;">${m.secret?"🕳️":""}</span>
        ${b?`<span style="color:#887755;">${m.type} (fixed)</span>`:`<select data-idx="${m.index}" style="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.2rem;border-radius:3px;font-family:inherit;font-size:0.75rem;">
              ${h.map(E=>`<option value="${E}"${E===m.type?" selected":""}>${E}</option>`).join("")}
            </select>`}
      `,(v=u.querySelector("select"))==null||v.addEventListener("change",E=>{Ev(c,m.index,E.target.value),f()}),p.appendChild(u)}const g=document.getElementById("arch-branches");c.branches.forEach((m,u)=>{const b=document.createElement("label");b.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;",b.innerHTML=`<input type="checkbox" ${m.secret?"checked":""} />
        Branch off room #${m.junction} (${m.rooms.length} room${m.rooms.length>1?"s":""}) is secret`,b.querySelector("input").addEventListener("change",E=>{wv(c,u,E.target.checked),f()}),g.appendChild(b)}),document.getElementById("arch-back").addEventListener("click",a),document.getElementById("arch-save").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";Ws.save({name:m,layout:c,custom:!0,seed:l.seed,outcome:{}}),a()}),document.getElementById("arch-delve-now").addEventListener("click",()=>{const m=document.getElementById("arch-name").value.trim()||"My design";e.classList.remove("active"),i({name:m,layout:c})}),f()};n.addEventListener("click",()=>{a(),e.classList.add("active")}),s.addEventListener("click",()=>e.classList.remove("active")),e.addEventListener("click",l=>{l.target===e&&e.classList.remove("active")})}const _i="dungeonab_custom_cards",Ua="dungeonab_imported_packs",$s="dungeonab_pack_prefs",Ct={get(i,e){try{return JSON.parse(localStorage.getItem(i))??e}catch{return e}},set(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}};function Na(i){return{id:"my-cards",name:"My Cards",description:"Cards from the workshop.",cards:i}}function Av(){const i=Ct.get($s,{}),e=Ct.get(_i,[]);e.length&&Ji(Na(e),{enabled:i["my-cards"]!==!1});for(const t of Ct.get(Ua,[]))try{Ji(t,{enabled:i[t.id]!==!1})}catch{}return i}function Rv(){const i=document.getElementById("cards-overlay"),e=document.getElementById("cards-body");document.getElementById("cards-btn").addEventListener("click",()=>{r(),i.classList.add("active")}),document.getElementById("cards-close-btn").addEventListener("click",()=>i.classList.remove("active")),i.addEventListener("click",a=>{a.target===i&&i.classList.remove("active")});const t="background:#14110b;color:#e0e0e0;border:1px solid #3a2f1e;padding:0.35rem;border-radius:4px;font-family:inherit;font-size:0.8rem;",n=a=>{const o=document.createElement("div");return o.textContent=a,o.innerHTML};function s(a){Ct.set(_i,a),a.length&&Ji(Na(a))}function r(){const a=Ct.get(_i,[]);Ct.get($s,{}),e.innerHTML=`
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
    `;const o=document.getElementById("ce-fields"),l=document.getElementById("ce-type"),c=()=>{const p=l.value;p==="character"?o.innerHTML=`
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0.3rem;font-size:0.75rem;">
            <select id="ce-class" style="${t}">${Object.values(K).map(g=>`<option>${g}</option>`).join("")}</select>
            <input id="ce-hp" type="number" value="14" title="health" style="${t}" />
            <input id="ce-atk" type="number" value="4" title="attack" style="${t}" />
            <input id="ce-def" type="number" value="3" title="defense" style="${t}" />
            <input id="ce-mind" type="number" value="3" title="mind" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">class · health · attack · defense · mind — budget: health + 2×atk + 2×def + mind ≤ ${un.character.statTotal}</div>`:p==="equipment"?o.innerHTML=`
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.3rem;font-size:0.75rem;">
            <input id="ce-eatk" type="number" value="0" title="+attack" style="${t}" />
            <input id="ce-edef" type="number" value="0" title="+defense" style="${t}" />
            <input id="ce-emind" type="number" value="2" title="+mind" style="${t}" />
            <select id="ce-best" style="${t}"><option value="">any class</option>${Object.values(K).map(g=>`<option>${g}</option>`).join("")}</select>
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">+attack · +defense · +mind · best-fit — net bonus ≤ ${un.equipment.bonusTotal}</div>`:p==="spell"?o.innerHTML=`
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem;font-size:0.75rem;">
            <select id="ce-use" style="${t}"><option>combat</option><option>heal</option><option>utility</option></select>
            <input id="ce-power" type="number" value="4" title="power" style="${t}" />
          </div>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">use · power (1–${un.spell.maxPower})</div>`:o.innerHTML=`
          <select id="ce-arch" style="${t};width:100%;">${Fa.map(g=>`<option value="${g.archetype}">${g.archetype} (like ${g.name})</option>`).join("")}</select>
          <div style="color:#887755;font-size:0.68rem;margin-top:0.2rem;">your name and flavor, a proven archetype's behavior</div>`};l.addEventListener("change",c),c(),document.getElementById("ce-create").addEventListener("click",()=>{const p=l.value,g={id:`my-${Date.now().toString(36)}`,type:p,name:document.getElementById("ce-name").value.trim(),icon:document.getElementById("ce-icon").value.trim()||"🎴",text:document.getElementById("ce-text").value.trim()||void 0};if(p==="character")g.class=document.getElementById("ce-class").value,g.stats={health:+document.getElementById("ce-hp").value,attack:+document.getElementById("ce-atk").value,defense:+document.getElementById("ce-def").value,mind:+document.getElementById("ce-mind").value},g.trait=g.text;else if(p==="equipment"){g.bonus={};const u=+document.getElementById("ce-eatk").value,b=+document.getElementById("ce-edef").value,E=+document.getElementById("ce-emind").value;u&&(g.bonus.attack=u),b&&(g.bonus.defense=b),E&&(g.bonus.mind=E),g.slot="tool",g.bestFor=document.getElementById("ce-best").value||null}else p==="spell"?(g.use=document.getElementById("ce-use").value,g.power=+document.getElementById("ce-power").value,g.school="homebrew"):g.archetype=document.getElementById("ce-arch").value;const v=zl(g);if(v.length){document.getElementById("ce-problems").textContent=v.join(" · ");return}const m=Ct.get(_i,[]);m.push(g),s(m),r()});const h=document.getElementById("ce-list");h.innerHTML=a.length?"":'<div class="records-empty">The forge is cold. Make something.</div>',a.forEach((p,g)=>{const v=document.createElement("div");v.style.cssText="display:flex;gap:0.4rem;align-items:baseline;padding:0.15rem 0;border-bottom:1px dashed #2a2318;",v.innerHTML=`<span>${n(p.icon)} ${n(p.name)}</span>
        <span style="color:#665;">${p.type}${p.class?" · "+p.class:""}</span>
        <button data-i="${g}" style="margin-left:auto;font-size:0.68rem;padding:0.15rem 0.4rem;background:#2a1515;color:#e08080;">✕</button>`,v.querySelector("button").addEventListener("click",()=>{const m=Ct.get(_i,[]);m.splice(g,1),s(m),r()}),h.appendChild(v)});const d=document.getElementById("ce-packs");for(const p of Xc()){const g=document.createElement("label");g.style.cssText="display:flex;gap:0.4rem;align-items:center;color:#b8a888;padding:0.12rem 0;",g.innerHTML=`<input type="checkbox" ${p.enabled?"checked":""} />
        <span>${n(p.name)} <span style="color:#665;">(${p.cards} cards)</span></span>`,g.querySelector("input").addEventListener("change",v=>{$c(p.id,v.target.checked);const m=Ct.get($s,{});m[p.id]=v.target.checked,Ct.set($s,m)}),d.appendChild(g)}const f=document.getElementById("ce-io");document.getElementById("ce-export").addEventListener("click",()=>{f.value=JSON.stringify(Na(Ct.get(_i,[])),null,1)}),document.getElementById("ce-import").addEventListener("click",()=>{try{const p=JSON.parse(f.value),g=Hl(p);if(g.length)throw new Error(g.join("; "));Ji(p);const v=Ct.get(Ua,[]).filter(m=>m.id!==p.id);v.push(p),Ct.set(Ua,v),f.value=`✓ "${p.name}" imported (${p.cards.length} cards)`,r()}catch(p){f.value=`✗ ${p.message}`}})}}const Cv={id:"alchemy-17c",name:"17th-Century Alchemy Pack",description:"Emblem monsters and laboratory gear from the age of Maier and Sendivogius.",cards:[{id:"a17-sendivogius",type:"character",class:"alchemist",name:"Michael Sendivogius",icon:"🜍",stats:{health:12,attack:3,defense:2,mind:6},trait:"Distilled the aerial nitre before anyone had a name for air."},{id:"a17-soror",type:"character",class:"cleric",name:"The Soror Mystica",icon:"🜋",stats:{health:13,attack:2,defense:3,mind:5},trait:"The Work needs two. She keeps the vigil, and the vigil keeps the party."},{id:"a17-maier",type:"character",class:"wizard",name:"Count Michael Maier",icon:"🜚",stats:{health:10,attack:2,defense:2,mind:7},trait:"Reads emblems the way others read maps. The dungeon is fifty fugues deep."},{id:"a17-athanor",type:"equipment",name:"Court Athanor",icon:"🜂",slot:"tool",bonus:{mind:2},bestFor:"alchemist",text:"The slow furnace. Patience, made of brick."},{id:"a17-pelican",type:"equipment",name:"Pelican Vessel",icon:"🜄",slot:"tool",bonus:{mind:1,defense:1},bestFor:"alchemist",text:"Circulation without loss: what wounds the flask feeds the work."},{id:"a17-vitriol",type:"equipment",name:"Flask of Vitriol",icon:"🜖",slot:"weapon",bonus:{attack:3},bestFor:"alchemist",text:"Visita Interiora Terrae — or throw it, and something else will."},{id:"a17-solve",type:"spell",name:"Solve et Coagula",icon:"☿",school:"transmutation",power:5,use:"combat",text:"Dissolve the fixed; fix the volatile. Monsters count as the fixed."},{id:"a17-aurum",type:"spell",name:"Aurum Potabile",icon:"🜚",school:"restoration",power:6,use:"heal",text:"Drinkable gold. The court physician swears by it; the court treasurer weeps."},{id:"a17-projection",type:"spell",name:"Powder of Projection",icon:"✨",school:"transmutation",power:3,use:"utility",text:"A pinch turns the lock's iron to something more agreeable."},{id:"a17-hermetic",type:"personality",name:"The Hermetic",icon:"🜁",archetype:"scholarly",text:"As above, so below; as in the library, so in the crypt. Reads everything twice."}]},Pv={id:"athanor",name:"the Hermetic Athanor",icon:"🜂",tagline:"Fifty emblems deep, the Work continues whether or not anyone tends it.",weightTweaks:{lab:2,library:1,materials:1,shrine:-.3},alwaysLab:!0,monsters:[{kind:"green-lion",name:"the Green Lion, hungry for the sun",icon:"🦁",attack:7,health:15,undead:!1},{kind:"ouroboros",name:"an ouroboros too busy to notice you",icon:"🐍",attack:5,health:18,undead:!1,slow:!0},{kind:"caput-corvi",name:"the Raven's Head, black as the nigredo",icon:"🐦‍⬛",attack:6,health:11,undead:!0},{kind:"winged-wingless",name:"two birds, one winged, one not, quarrelling",icon:"🕊️",attack:5,health:10,undead:!1}],bosses:[{kind:"rebis",name:"the Rebis, crowned twice and patient",icon:"👑",attack:12,health:36,undead:!1},{kind:"philosophers-dragon",name:"the Dragon that devours its own tail and yours",icon:"🐉",attack:13,health:34,undead:!1}]},Lv={"green-lion":{col:0,row:9},ouroboros:{col:2,row:10},"caput-corvi":{col:0,row:10},"winged-wingless":{col:0,row:10},rebis:{col:3,row:9},"philosophers-dragon":{col:2,row:9}};let kl=!1;function Iv({enabled:i=!0}={}){kl||(kl=!0,Ji(Cv,{enabled:i}),$g(Pv),Lg(Lv),Fg({"green-lion":{trait:"venomous"},ouroboros:{trait:"armored"},"caput-corvi":{trait:"swarm"},"winged-wingless":{trait:"swarm"},rebis:{trait:"armored"},"philosophers-dragon":{resist:["fire"],weak:["frost"]}}))}const Fl={[pe.ENTRANCE]:"The way in. The party gathers its nerve.",[pe.CORRIDOR]:"Just passage — a breath between dangers.",[pe.MONSTER]:"A monster. The party may fight, flee, sneak past (rogue), turn undead (cleric), bribe, or open with a spell.",[pe.TRAP]:"A trap. Rogues disarm it; the bold shove through and take the hit.",[pe.TREASURE]:"Treasure — and maybe a mimic. Loot it, inspect first, or leave the bait.",[pe.LIBRARY]:"A library. The party can learn a spell; wizards risk the sealed texts for more.",[pe.SHRINE]:"A shrine. Rest to heal — or pry off the gold leaf and let the dungeon remember it.",[pe.LAB]:"An alchemist's bench. With materials, brew a potion or coat a weapon.",[pe.MATERIALS]:"Herbs and salts — raw materials for alchemy, if you gather them.",[pe.DISASTER]:"The dungeon itself turns hostile. Brace together, or scatter and pray.",[pe.BOSS]:"The boss chamber. Everything you drafted, tested at once.",[pe.VAULT]:"A vault — riches hidden behind a secret door. Rogues and scholars find these."},Dv=[{type:"character",label:"Character",text:"A named hero of one of five classes. Party size = however many you draft."},{type:"equipment",label:"Equipment",text:"Auto-assigns to the best-fit member. Some items do different things per class."},{type:"spell",label:"Spell",text:"Shared grimoire. A scroll burns after one cast — unless a wizard makes it repeatable."},{type:"personality",label:"Personality",text:"Biases the whole party's decisions. Some look weak but hide an upside."}];function Uv(i,e){var o,l;const t=[];if(!e)return t;const n=i==null?void 0:i.party,s=e.party;if(n&&s)for(const c of s.members){const h=n.members.find(d=>d.name===c.name);h&&h.alive&&!c.alive&&t.push({icon:"☠️",kind:"death",text:`${c.name} has fallen.`})}const r=(o=i==null?void 0:i.narration)==null?void 0:o.room;if(((l=e.narration)==null?void 0:l.room)===pe.BOSS&&r!==pe.BOSS&&t.push({icon:"🐉",kind:"boss",text:"The boss chamber — everything you drafted, tested at once."}),n&&s&&s.spellsLearned>n.spellsLearned){const c=s.spellsLearned-n.spellsLearned;t.push({icon:"📖",kind:"spell",text:`The grimoire grows: ${c} new working${c>1?"s":""} learned.`})}if(n&&s){const c=s.gold-n.gold;c>=25&&t.push({icon:"💰",kind:"gold",text:`A windfall: +${c} gold.`})}return t}const Ol="dungeonab_help_seen",ce={draft:null,draftUI:null,campaign:null,simulator:null,renderer:null,gameRunning:!1,lastTickTime:0,speedMultiplier:1,prevState:null,seenRoomTypes:null};function Nv(){console.log("⚔️ DungeonAB initializing…");const i=Av();Iv({enabled:i["alchemy-17c"]!==!1}),kv(),Fv(),Rv(),Tv({onDelve:e=>{ce.pendingReplay=e,Jt("🗺️",`Design loaded: "${e.name}". Draft a party, then delve it.`,"room"),ka()}}),ka(),document.getElementById("pause-btn").addEventListener("click",Hv),document.getElementById("step-btn").addEventListener("click",zv),document.getElementById("speed-slider").addEventListener("input",e=>{ce.speedMultiplier=parseFloat(e.target.value),document.getElementById("speed-label").textContent=`${ce.speedMultiplier.toFixed(1)}x`}),document.getElementById("show-results-btn").addEventListener("click",()=>{document.getElementById("show-results-btn").classList.remove("active"),document.getElementById("gameover-display").classList.add("active")})}function kv(){const i=document.getElementById("help-overlay"),e=document.getElementById("help-btn"),t=document.getElementById("help-close-btn");document.getElementById("help-card-legend").innerHTML=Dv.map(a=>`<dt>${a.label}</dt><dd>${a.text}</dd>`).join("");const n=()=>i.classList.add("active"),s=()=>{i.classList.remove("active");try{localStorage.setItem(Ol,"1")}catch{}};e.addEventListener("click",n),t.addEventListener("click",s),i.addEventListener("click",a=>{a.target===i&&s()});let r=!1;try{r=localStorage.getItem(Ol)==="1"}catch{}r||n()}function Fv(){const i=document.getElementById("records-overlay"),e=document.getElementById("records-btn"),t=document.getElementById("records-close-btn"),n=()=>{const a=document.getElementById("records-body"),o=qn.getStats(),l=qn.getRecentRuns(10),c=Object.values(Il).filter(f=>qn.bestScores[f.id]).map(f=>`<dt>${f.icon} ${f.name}</dt><dd>${qn.bestScores[f.id]}</dd>`).join(""),h=`<div style="color:#887755;font-size:0.8rem;margin-bottom:0.9rem;">
      ${o.totalVictories} retirements across ${o.totalRuns} campaigns · average score ${o.avgScore}</div>`,d=l.length?l.map(f=>{const p=Il[(f.difficulty||"").toUpperCase()]||{icon:"•"},g=f.condition?vn(f.condition):null,v=f.victory?"🏆":"☠️",m=g&&g.id!=="none"?` · ${g.icon}`:"";return`<div class="records-run">
            <span>${v} ${p.icon} depth ${f.depth||1} · ${f.roomsCleared} rooms${m}</span>
            <span class="rr-score">${f.score}</span>
          </div>`}).join(""):'<div class="records-empty">No campaigns yet. The Hall awaits its first name.</div>';a.innerHTML=(c?`<dl class="records-best">${c}</dl>`:"")+h+'<div style="color:#d8a53f;font-size:0.8rem;margin-bottom:0.4rem;">Recent campaigns</div>'+d},s=()=>{n(),i.classList.add("active")},r=()=>i.classList.remove("active");e.addEventListener("click",s),t.addEventListener("click",r),i.addEventListener("click",a=>{a.target===i&&r()})}function Jt(i,e,t=""){const n=document.getElementById("toast-stack"),s=document.createElement("div");for(s.className=`toast${t?" toast-"+t:""}`,s.innerHTML=`<span class="toast-icon">${i}</span><span>${Pt(e)}</span>`,n.appendChild(s),setTimeout(()=>{s.classList.add("fade"),setTimeout(()=>s.remove(),500)},3600);n.children.length>4;)n.removeChild(n.firstChild)}function Ov(i,e){var n;const t=(n=e.narration)==null?void 0:n.room;t&&ce.seenRoomTypes&&!ce.seenRoomTypes.has(t)&&Fl[t]&&(ce.seenRoomTypes.add(t),Jt(e.narration.icon||"ℹ️",Fl[t],"room"));for(const s of Uv(i,e))Jt(s.icon,s.text,s.kind)}function ka(){ce.draft=new Zc(`table-${Date.now().toString(36)}`),ce.draftUI=new Jc(ce.draft,Bv),ce.draftUI.render(),document.getElementById("world-container").style.display="none",document.getElementById("ui-container").style.display="none"}function Bv({pool:i,difficulty:e,seed:t,condition:n,hexTarget:s,hexCondition:r}){console.log(`Campaign begins: difficulty=${e}, seed=${t}, condition=${n}`);const a=document.getElementById("draft-container");a.innerHTML="",a.style.display="none",document.getElementById("world-container").style.display="flex",document.getElementById("ui-container").style.display="flex";const o=new Ks(`${t}-hexes`),l=ce.draft.seats.filter(g=>g.isAI),c=o.pick(l),h=Object.keys(Mi).filter(g=>g!=="none"),d=vn(o.pick(h));ce.sabotage={tableWager:n,byPlayer:r&&r!=="none"?{seatId:s,conditionId:r}:null,onPlayer:{rivalName:c.name,rivalIcon:c.icon,condition:d}};const f=Gl(vn(n),d),p=ce.pendingReplay||null;if(ce.pendingReplay=null,p&&Jt("🗺️",`Delving the archived design: "${p.name}"`,"room"),ce.campaign=new Uc(i,{seed:t,difficulty:e,condition:f,layout:p?p.layout:null}),ce.difficulty=e,ce.runRecorded=!1,ce.standings=null,ce.seenRoomTypes=new Set,Jt(c.icon,`${c.name} hexes your run: ${d.name}. Its score premium is yours to keep.`,"death"),ce.sabotage.byPlayer){const g=vn(r),v=l.find(m=>m.id===s);Jt(g.icon,`Your hex — ${g.name} — settles over ${(v==null?void 0:v.name)||"a rival"}'s run.`,"boss")}Nc(ce.campaign.nextDelve())}function Nc(i){if(ce.simulator=i,!ce.renderer)try{ce.renderer=new Ng("game-canvas")}catch(t){console.warn("WebGL unavailable, using 2D map renderer:",t),ce.renderer=new Qc("game-canvas")}const e=i.getState();ce.prevState=e,Gv(e.theme,e.depth,e.condition),e.condition&&Jt(e.condition.icon,`Wager: ${e.condition.name}. ${e.condition.text}`,"boss"),document.getElementById("pause-btn").disabled=!1,document.getElementById("step-btn").disabled=!1,document.getElementById("pause-btn").textContent="Pause",ce.renderer.render(e),no(e),ce.gameRunning=!0,ce.lastTickTime=performance.now(),kc()}function kc(){if(!ce.gameRunning)return;const i=performance.now(),e=1400/ce.speedMultiplier;i-ce.lastTickTime>=e&&(ce.lastTickTime=i,ce.simulator.tick(),Fc())||requestAnimationFrame(kc)}function Fc(){var e,t;const i=ce.simulator.getState();if(ce.renderer.render(i),no(i),i.narration&&(Oc(i.narration,i.roomIndex),Ov(ce.prevState,i),(t=(e=ce.renderer).playEffect)==null||t.call(e,i.narration.action,i.narration.roomIndex),i.narration.aside)){const n=i.narration.aside.startsWith("🕳️")?"🕳️":"🧭";Jt(n,i.narration.aside.replace(/^[^ ]+ /,""),"room")}return ce.prevState=i,i.gameOver?(Vv(i),!0):!1}function zv(){!ce.simulator||!ce.gameRunning||(ce.simulator.tick(),Fc())}function Hv(){if(!ce.simulator)return;const i=!ce.simulator.paused;ce.simulator.setPaused(i),document.getElementById("pause-btn").textContent=i?"Resume":"Pause",i||(ce.lastTickTime=performance.now())}function no(i){document.getElementById("room-count").textContent=`${i.roomIndex} / ${(i.pathLength||i.dungeon.length)-1}`,document.getElementById("gold-count").textContent=i.party.gold,document.getElementById("score-count").textContent=i.party.score,document.getElementById("materials-count").textContent=i.party.materials,document.getElementById("potions-count").textContent=i.party.potions;const e=document.getElementById("party-roster");e.innerHTML=i.party.members.map(n=>{const s=Math.round(n.health/n.maxHealth*100),r=s>60?"#3ddc84":s>30?"#d8a53f":"#e05555",a=[...n.equipment,...n.weaponMods].join(", ");return`
      <div class="member-row ${n.alive?"":"member-dead"}">
        <span>${n.icon}</span>
        <span style="flex:1;min-width:0;">
          <div>${n.name} <span style="color:#665;font-size:0.7rem;">(${n.class})</span></div>
          ${a?`<div style="color:#556;font-size:0.68rem;">${a}</div>`:""}
        </span>
        <span class="hp-bar"><span class="hp-fill" style="width:${s}%;background:${r};"></span></span>
        <span class="member-hp" style="color:${r};">${n.health}</span>
      </div>
    `}).join("");const t=document.getElementById("debug-log");t.innerHTML=i.log.map(n=>`<div class="log-entry">${Pt(n)}</div>`).join(""),t.scrollTop=t.scrollHeight}function Oc(i,e){const t=document.getElementById("story-panel"),n=t.querySelector(".story-empty");n&&n.remove();const s=(i.falls||[]).map(o=>`<div class="story-fall">${Pt(o)}</div>`).join(""),r=i.aside?`<div class="story-aside">${Pt(i.aside)}</div>`:"",a=document.createElement("div");for(a.className="story-entry",a.innerHTML=`
    <div class="story-room">${i.icon} Room ${e} — ${i.room}</div>
    <div class="story-predicament">${Pt(i.predicament)}</div>
    <div class="story-deliberation">${Pt(i.deliberation)}</div>
    <div class="story-resolution">${Pt(i.resolution)}</div>
    ${s}
    ${r}
  `,t.appendChild(a);t.children.length>14;)t.removeChild(t.firstChild);t.scrollTop=t.scrollHeight}function Gv(i=null,e=1,t=null){const n=e>1?` — Depth ${e}`:"",s=t?`<div style="margin-top:0.4rem;font-size:0.8rem;color:#e8724a;">${t.icon} Wager — ${Pt(t.name)}</div>`:"",r=i?`<div class="story-entry" style="border-left:3px solid #d8a53f;">
         <div class="story-room" style="font-size:1rem;">${i.icon} ${Pt(i.name)}${n}</div>
         <div class="story-predicament" style="font-style:italic;">${Pt(i.tagline)}</div>
         ${s}
       </div>`:"";document.getElementById("story-panel").innerHTML=r+'<div class="story-empty">The chronicle of this delve is not yet written…</div>'}function Vv(i){ce.gameRunning=!1,document.getElementById("pause-btn").disabled=!0,document.getElementById("step-btn").disabled=!0,ce.campaign.recordDelve(ce.simulator),Ws.save({name:`${i.theme.name} — depth ${i.depth}`,layout:Gg(ce.simulator.dungeon),seed:ce.simulator.seed,outcome:{victory:i.victory,score:i.party.score,depth:i.depth}}),i.victory&&!ce.campaign.over?Wv():Bc()}function Wv(i){const e=ce.campaign,t=ce.simulator.getRunResult(),n=document.getElementById("gameover-display");Oc({room:"town",icon:"🏘️",predicament:uv(e.party,e.depth),deliberation:"",resolution:""},`— after depth ${e.depth}`);const s=()=>{const r=e.healCost(),a=e.missingHealth(),o=e.party.gold,l=e.party.hasPersonality("pious");n.innerHTML=`
      <h2 style="color:#3ddc84;font-size:1.35rem;margin-bottom:0.5rem;text-align:center;">
        🏘️ The Town Between
      </h2>
      <div style="text-align:center;color:#887755;margin-bottom:1rem;">Depth ${e.depth} cleared — the road down continues</div>
      <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid #3ddc84;border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
        ${Pt(t.epitaph||"")}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
        <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${e.party.score}</strong>
        <span style="color:#887755;">Gold</span><strong style="text-align:right;">${o}</strong>
        <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${e.party.living().length} / ${e.party.members.length}</strong>
        <span style="color:#887755;">Potions</span><strong style="text-align:right;">${e.party.potions.length}</strong>
      </div>
    `;const c=(p,g,v,m="")=>{const u=document.createElement("button");return u.textContent=p,u.disabled=!g,u.style.cssText=`width:100%;margin-top:0.5rem;padding:0.8rem;font-size:0.95rem;${m}${g?"":"opacity:0.45;cursor:default;"}`,u.addEventListener("click",v),n.appendChild(u),u};c(a===0?"💤 Everyone Is Rested":`🛏️ Rest & Heal All — ${r}g${l?" (temple rate)":""}`,a>0&&o>=r,()=>{e.healAll(),s()}),c(`🧪 Buy a Healing Draught — ${Yt.potion}g`,o>=Yt.potion,()=>{e.buyPotion(),s()});const h=document.createElement("div");h.style.cssText="margin-top:1rem;color:#887755;font-size:0.78rem;border-top:1px dashed #3a2f1e;padding-top:0.7rem;",h.textContent="🪧 The hiring board — adventurers looking for work:",n.appendChild(h);for(const p of e.recruitOffers()){const g=p.card.stats;c(`${p.card.icon} Hire ${p.card.name} (${p.card.class}) — ${p.cost}g`,o>=p.cost,()=>{const v=e.recruit(p.card.id);v&&Jt(p.card.icon,`${v.name} joins the party.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#1a2617;color:#a8d5b0;").title=`❤️${g.health} ⚔️${g.attack} 🛡️${g.defense} 🧠${g.mind}`}const d=e.forgeCost(),f=e.party.living().reduce((p,g)=>p.attack>=g.attack?p:g);c(`🔨 Sharpen ${f.name}'s weapon (+${Yt.forgeMod.attack} atk) — ${d}g`,o>=d,()=>{const p=e.forge();p&&Jt("🔨",`The smith sets ${Yt.forgeMod.name} to ${p.target}'s blade.`,"room"),s()},"font-size:0.82rem;padding:0.6rem;background:#26200f;color:#e0c88a;"),c(`⛏️ Delve Deeper — depth ${e.depth+1} awaits`,!0,()=>{n.classList.remove("active"),Nc(e.nextDelve())},"margin-top:1.25rem;font-size:1rem;padding:0.9rem;"),c("🏡 Retire & Bank the Score",!0,()=>{e.retire(),Bc(ce.simulator.getState())},"background:#2a2213;color:#d8a53f;"),no(ce.simulator.getState())};s(),n.classList.add("active")}function Bc(i){var f,p;const e=ce.campaign,t=e.getSummary(),n=ce.simulator.getRunResult(),s=t.retired;ce.runRecorded||(ce.runRecorded=!0,qn.recordRun(ce.difficulty,{score:t.score,gold:t.gold,roomsCleared:t.roomsCleared,victory:s,survivors:t.survivors,partySize:t.partySize,depth:t.depth,condition:ce.campaign.condition!=="none"?ce.campaign.condition:null}));const r=qn.bestScores[ce.difficulty]||0,a=t.score>=r&&t.score>0,o=qn.getStats();if(!ce.standings&&ce.draft){const g=ce.sabotage||{};ce.standings=yv(ce.draft,{score:t.score,depth:t.depth,hexIcon:((p=(f=g.onPlayer)==null?void 0:f.condition)==null?void 0:p.icon)||null},{seed:e.seed,difficulty:e.difficulty,condition:g.tableWager??e.condition,hexes:g.byPlayer?{[g.byPlayer.seatId]:g.byPlayer.conditionId}:{}})}const l=(ce.standings||[]).map(g=>`
    <div style="display:flex;gap:0.5rem;align-items:baseline;padding:0.28rem 0;border-bottom:1px dashed #2a2318;${g.isPlayer?"color:#d8a53f;font-weight:bold;":"color:#b0a080;"}">
      <span style="width:1.6rem;">${$v(g.place)}</span>
      <span>${g.icon} ${Pt(g.name)}${g.hexIcon?` <span title="hexed">${g.hexIcon}</span>`:""}</span>
      <span style="margin-left:auto;">${g.score} <span style="color:#776;font-size:0.82em;">· depth ${g.depthReached}</span></span>
    </div>`).join(""),c=document.getElementById("gameover-display");c.innerHTML=`
    <h2 style="color:${s?"#3ddc84":"#e05555"};font-size:1.35rem;margin-bottom:1rem;text-align:center;">
      ${s?"🏆 Retired in Glory":"☠️ The Campaign Ends in the Dark"}
    </h2>
    <div style="margin-bottom:1.25rem;padding:0.9rem;background:#151b10;border-left:3px solid ${s?"#3ddc84":"#aa5544"};border-radius:4px;color:#d8c9a3;font-style:italic;line-height:1.6;">
      ${Pt(n.epitaph||"")}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;font-size:0.92rem;">
      <span style="color:#887755;">Campaign score</span><strong style="color:#d8a53f;text-align:right;">${t.score}${a?" ⭐ New Best!":""}</strong>
      <span style="color:#887755;">Depth reached</span><strong style="text-align:right;">${t.depth}</strong>
      <span style="color:#887755;">Gold</span><strong style="text-align:right;">${t.gold}</strong>
      <span style="color:#887755;">Rooms conquered</span><strong style="text-align:right;">${t.roomsCleared}</strong>
      <span style="color:#887755;">Survivors</span><strong style="text-align:right;">${t.survivors} / ${t.partySize}</strong>
      <span style="color:#887755;">Spells learned</span><strong style="text-align:right;">${t.spellsLearned}</strong>
      <span style="color:#887755;">Best on ${ce.difficulty}</span><strong style="text-align:right;">${Math.max(r,t.score)}</strong>
      <span style="color:#887755;">Career</span><strong style="text-align:right;">${o.totalVictories} retirements / ${o.totalRuns} campaigns</strong>
    </div>
    <div style="margin-top:1.25rem;">
      <div style="color:#d8a53f;font-size:0.85rem;margin-bottom:0.4rem;border-top:1px solid #3a2f1e;padding-top:0.8rem;">🎲 At the Table — how the draft played out</div>
      ${l}
    </div>
  `;const h=document.createElement("button");h.textContent="🃏 Draft a New Party",h.style.cssText="width:100%;margin-top:1.5rem;padding:0.9rem;font-size:1rem;",h.addEventListener("click",()=>{c.classList.remove("active"),document.getElementById("show-results-btn").classList.remove("active"),ka()}),c.appendChild(h);const d=document.createElement("button");d.textContent="📖 Read the Chronicle",d.style.cssText="width:100%;margin-top:0.5rem;padding:0.7rem;font-size:0.9rem;background:#2a2213;color:#d8a53f;",d.addEventListener("click",()=>{c.classList.remove("active"),document.getElementById("show-results-btn").classList.add("active")}),c.appendChild(d),c.classList.add("active")}function Pt(i){const e=document.createElement("div");return e.textContent=i,e.innerHTML}function $v(i){return["🥇","🥈","🥉"][i-1]||`${i}.`}window.addEventListener("DOMContentLoaded",Nv);
