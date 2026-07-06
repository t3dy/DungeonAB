/**
 * IsoDungeonRenderer — the delve in torchlit isometric 3D
 *
 * Adapted from SnakeAB's proven IsoRenderer. Rooms are stone
 * platforms laid out on the dungeon's winding descent, joined by
 * narrow walkways. The party is a cluster of class-colored meeples
 * under a traveling torchlight. Rooms ahead hide behind ❓ until
 * the party draws near; the boss chamber broods in red.
 *
 * Renders synchronously on every game tick (hidden-tab safe) and
 * continuously via rAF when visible (torch flicker, meeple bob).
 */

import * as THREE from 'three';
import { ATLAS, FX_TILES, getClassTile, getMonsterTile, getRoomProp } from './SpriteAtlas.js';

const SPACING = 3.2;   // World units between room centers
const CLASS_COLORS = {
  fighter: 0xc84c3c,
  cleric: 0xe8d48a,
  wizard: 0x7a5ae8,
  rogue: 0x4a8a5c,
  alchemist: 0x3cb8a8,
};

/* Every theme colors its own stone (v3: the castle is not the bog) */
const THEME_PALETTES = {
  delve: { plat: 0x615b52, wall: 0x35322c, bg: 0x0a0805, boss: 0x5a2626 },
  crypt: { plat: 0x4e4a56, wall: 0x2c2a33, bg: 0x070609, boss: 0x4a2a4a },
  volcanic: { plat: 0x5c4038, wall: 0x33211c, bg: 0x0d0503, boss: 0x7a2a1a },
  library: { plat: 0x3f4a58, wall: 0x232c38, bg: 0x04070b, boss: 0x2a3a5a },
  madlab: { plat: 0x44584a, wall: 0x24352a, bg: 0x040804, boss: 0x2a5a3a },
  castle: { plat: 0x3e3a4e, wall: 0x201d2c, bg: 0x050409, boss: 0x5a1a2a },
  bogcellar: { plat: 0x4a4a34, wall: 0x2a2a1c, bg: 0x060703, boss: 0x4a5a1a },
  icecaverns: { plat: 0x4a5a66, wall: 0x2a3640, bg: 0x040709, boss: 0x3a5a6a },
  athanor: { plat: 0x5a4a38, wall: 0x33291c, bg: 0x0a0703, boss: 0x6a4a1a },
};
const DEFAULT_PALETTE = THEME_PALETTES.delve;

/* A monster's nature shows over its head (FTL: readable enemies) */
const TRAIT_BADGES = { armored: '🛡️', ethereal: '👻', venomous: '🐍', swarm: '🐝', slow: '🐌' };
const ELEMENT_BADGES = { fire: '🔥', frost: '❄️', shock: '⚡', holy: '🌟' };
export const ELEMENT_FX_COLORS = { fire: '#ff8a3c', frost: '#7ec8ff', shock: '#ffe95e', holy: '#ffe9a0' };

/* Spell/action effects: tinted glow bursts, plus the sheet's slash */
const EFFECT_STYLES = {
  'fight': { kind: 'slash' },
  'spell-strike': { kind: 'glow', color: '#ff8a3c' },   // fire
  'turn-undead': { kind: 'glow', color: '#ffe9a0' },    // holy
  'deep-study': { kind: 'glow', color: '#b07ae8' },     // arcane
  'spell-bypass': { kind: 'glow', color: '#b07ae8' },
  'rest': { kind: 'glow', color: '#ffe9a0' },
  'alchemy': { kind: 'glow', color: '#3cb8a8' },        // alkahest green
  'disarm': { kind: 'glow', color: '#8fb8dd' },
  'push-through': { kind: 'glow', color: '#e05555' },   // it hurt
  'brace': { kind: 'glow', color: '#e05555' },
  'scatter': { kind: 'glow', color: '#e05555' },
  'loot': { kind: 'glow', color: '#ffd75e' },           // gold
  'desecrate': { kind: 'glow', color: '#ffd75e' },
};

export class IsoDungeonRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0805);
    // Fog must start beyond the camera's distance to the scene
    // (~37 units) or it eats the whole dungeon
    this.scene.fog = new THREE.Fog(0x0a0805, 44, 110);

    // Cold ambient + hemisphere skylight + moonlight from the shaft
    this.scene.add(new THREE.AmbientLight(0xaab4d0, 1.1));
    this.scene.add(new THREE.HemisphereLight(0x8a9aba, 0x3a3028, 0.9));
    const moon = new THREE.DirectionalLight(0xaabbdd, 1.3);
    moon.position.set(-10, 20, 6);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -30;
    moon.shadow.camera.right = 30;
    moon.shadow.camera.top = 30;
    moon.shadow.camera.bottom = -30;
    this.scene.add(moon);

    // The party's torch: warm point light that travels with them
    this.torch = new THREE.PointLight(0xff9a3c, 30, 12, 1.8);
    this.torch.position.set(0, 2.2, 0);
    this.scene.add(this.torch);

    this.staticGroup = new THREE.Group();   // Platforms, walkways — built once per dungeon
    this.iconGroup = new THREE.Group();     // Room icon sprites — updated per tick
    this.occupantGroup = new THREE.Group(); // Monster/prop sprites — updated per tick
    this.partyGroup = new THREE.Group();    // Party sprites — updated per tick
    this.fxGroup = new THREE.Group();       // Transient effect sprites
    this.scene.add(this.staticGroup, this.iconGroup, this.occupantGroup, this.partyGroup, this.fxGroup);

    this.spriteMaterials = new Map();
    this.builtKey = null;
    this.roomPositions = [];
    this.clock = new THREE.Clock();
    this.effects = [];

    // The Tiny Dungeon sheet (Kenney, CC0): pixel-crisp, re-render on arrival
    this.tileMats = new Map();
    this.atlasReady = false;
    this.atlasTex = new THREE.TextureLoader().load(ATLAS.url, () => {
      this.atlasReady = true;
      if (this.lastState) this.render(this.lastState);
    });
    this.atlasTex.magFilter = THREE.NearestFilter;
    this.atlasTex.minFilter = THREE.NearestFilter;
    this.atlasTex.colorSpace = THREE.SRGBColorSpace;

    // Meeple fallback for the beat before the sheet loads
    this.meepleGeo = new THREE.CapsuleGeometry(0.16, 0.26, 4, 10);
    this.meepleMats = {};
    for (const [cls, color] of Object.entries(CLASS_COLORS)) {
      this.meepleMats[cls] = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    }
    // Class-colored base discs so a sprite's class reads at a glance
    this.baseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.07, 16);
    this.baseMats = {};
    for (const [cls, color] of Object.entries(CLASS_COLORS)) {
      this.baseMats[cls] = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
    }

    this.disposed = false;
    const animate = () => {
      if (this.disposed) return;
      requestAnimationFrame(animate);
      this.animateFrame();
    };
    animate();

    // Debug handle for scene inspection from the console
    if (typeof window !== 'undefined') window.__iso = this;
  }

  render(state) {
    this.lastState = state;
    const rooms = state.dungeon.rooms;

    this.resize(rooms);

    // Discovery changes the map: found secret rooms surface.
    // The theme colors the stone.
    const themeId = state.dungeon.theme?.id || 'delve';
    const key = themeId + '|' + rooms.map(r => `${r.type}${r.secret && !r.discovered ? '?' : ''}`).join(',');
    if (this.builtKey !== key) {
      this.buildDungeon(rooms, state.dungeon.edges, themeId);
      this.builtKey = key;
    }

    this.updateIcons(state);
    this.updateOccupants(state);
    this.updateParty(state);
    this.animateFrame();
  }

  /**
   * A sprite material showing one 16px tile of the Tiny Dungeon sheet
   */
  tileMaterial(tile) {
    const key = `${tile.col},${tile.row}`;
    if (!this.tileMats.has(key)) {
      const tex = this.atlasTex.clone();
      tex.needsUpdate = true;
      tex.repeat.set(1 / ATLAS.cols, 1 / ATLAS.rows);
      tex.offset.set(tile.col / ATLAS.cols, 1 - (tile.row + 1) / ATLAS.rows);
      this.tileMats.set(key, new THREE.SpriteMaterial({ map: tex, transparent: true }));
    }
    return this.tileMats.get(key);
  }

  tileSprite(tile, scale = 1) {
    const sprite = new THREE.Sprite(this.tileMaterial(tile));
    sprite.scale.set(scale, scale, 1);
    return sprite;
  }

  /**
   * The rooms' inhabitants: monsters brood on their platforms until
   * dealt with; chests, traps, shrines and benches dress the rest.
   */
  updateOccupants(state) {
    this.occupantGroup.clear();
    if (!this.atlasReady) return;
    const rooms = state.dungeon.rooms;
    const knownRooms = this.knownSet(state);

    rooms.forEach((room, i) => {
      if (room.secret && !room.discovered) return;
      const { x, z } = this.roomPositions[i];
      const known = knownRooms.has(i) || room.type === 'boss';
      if (!known) return;

      let sprite = null;
      if ((room.type === 'monster' || room.type === 'boss') && room.monster && !room.cleared) {
        const scale = room.type === 'boss' ? 1.7 : 1.05;
        sprite = this.tileSprite(getMonsterTile(room.monster.kind), scale);
        sprite.position.set(x, 0.2 + scale / 2, z);
        sprite.userData.sway = true;

        // Its nature shows over its head — a readable enemy is a plan
        const badges = [];
        if (TRAIT_BADGES[room.monster.trait]) badges.push(TRAIT_BADGES[room.monster.trait]);
        const weakness = room.monster.undead ? 'holy' : (room.monster.weak || [])[0];
        if (ELEMENT_BADGES[weakness]) badges.push(ELEMENT_BADGES[weakness]);
        badges.forEach((emoji, bi) => {
          const badge = new THREE.Sprite(this.getSpriteMaterial(emoji));
          badge.scale.set(0.42, 0.42, 1);
          badge.position.set(x - 0.25 + bi * 0.5, 0.35 + scale, z);
          badge.userData.baseY = 0.35 + scale;
          badge.userData.phase = i * 1.3 + bi;
          badge.userData.sway = true;
          this.occupantGroup.add(badge);
        });
      } else {
        const prop = getRoomProp(room);
        if (prop) {
          sprite = this.tileSprite(prop, 0.95);
          sprite.position.set(x, 0.66, z);
          if (room.cleared) {
            sprite.material = sprite.material.clone();
            sprite.material.opacity = 0.55;
          }
        }
      }
      if (sprite) {
        sprite.userData.baseY = sprite.position.y;
        sprite.userData.phase = i * 2.3;
        this.occupantGroup.add(sprite);
      }
    });
  }

  roomWorldPos(room) {
    return { x: room.x * SPACING, z: room.y * SPACING };
  }

  resize(rooms) {
    const w = this.canvas.clientWidth || 500;
    const h = this.canvas.clientHeight || 420;
    if (this.lastW === w && this.lastH === h && this.camera && this.builtKey) return;
    this.lastW = w;
    this.lastH = h;
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const xs = rooms.map(r => r.x * SPACING);
    const zs = rooms.map(r => r.y * SPACING);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cz = (Math.min(...zs) + Math.max(...zs)) / 2;

    // Fit the frustum to the dungeon's projected footprint: in an
    // iso view the map's diagonal projects to roughly 0.72× its
    // world size vertically
    const spread = Math.max(
      Math.max(...xs) - Math.min(...xs),
      Math.max(...zs) - Math.min(...zs)
    );
    const vertHalf = Math.max(8, spread * 0.42 + 4);

    const aspect = w / h;
    this.camera = new THREE.OrthographicCamera(
      -vertHalf * aspect, vertHalf * aspect, vertHalf, -vertHalf, 0.1, 300
    );
    this.camera.position.set(cx + 20, 24, cz + 20);
    this.camera.lookAt(cx, 0, cz);
  }

  buildDungeon(rooms, edges = null, themeId = 'delve') {
    this.staticGroup.clear();
    this.roomPositions = rooms.map(r => this.roomWorldPos(r));

    const palette = THEME_PALETTES[themeId] || DEFAULT_PALETTE;
    this.scene.background = new THREE.Color(palette.bg);
    this.scene.fog = new THREE.Fog(palette.bg, 44, 110);

    const platGeo = new THREE.BoxGeometry(2.4, 0.35, 2.4);
    const bossGeo = new THREE.BoxGeometry(3.1, 0.5, 3.1);
    const hidden = room => room.secret && !room.discovered;

    rooms.forEach((room, i) => {
      // Undiscovered secret rooms simply aren't there — that's the point
      if (hidden(room)) return;
      const { x, z } = this.roomPositions[i];

      // Theme-tinted stone with hand-laid shade variance; vaults gleam
      const shade = ((room.index * 7) % 5 - 2) * 0.02;
      const base = room.type === 'boss' ? palette.boss
        : room.type === 'vault' ? 0x6a5a30
        : palette.plat;
      const c = new THREE.Color(base);
      c.offsetHSL(0, 0, shade);

      const plat = new THREE.Mesh(
        room.type === 'boss' ? bossGeo : platGeo,
        new THREE.MeshStandardMaterial({ color: c, roughness: 0.95 })
      );
      plat.position.set(x, 0, z);
      plat.receiveShadow = true;
      this.staticGroup.add(plat);

      // Low walls on two sides give chambers depth
      const wallMat = new THREE.MeshStandardMaterial({ color: palette.wall, roughness: 1 });
      const wall1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 0.2), wallMat);
      wall1.position.set(x, 0.5, z - 1.15);
      wall1.castShadow = true;
      this.staticGroup.add(wall1);
      const wall2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 2.4), wallMat);
      wall2.position.set(x - 1.15, 0.5, z);
      wall2.castShadow = true;
      this.staticGroup.add(wall2);
    });

    // Walkways along the dungeon's edges (spine + discovered branches)
    const edgeList = edges || rooms.slice(1).map((_, i) => ({ a: i, b: i + 1 }));
    for (const edge of edgeList) {
      const ra = rooms[edge.a];
      const rb = rooms[edge.b];
      if (!ra || !rb || hidden(ra) || hidden(rb)) continue;
      const pa = this.roomPositions[edge.a];
      const pb = this.roomPositions[edge.b];
      const dx = pb.x - pa.x;
      const dz = pb.z - pa.z;
      const len = Math.sqrt(dx * dx + dz * dz);
      const bridge = new THREE.Mesh(
        new THREE.BoxGeometry(len, 0.18, 0.8),
        new THREE.MeshStandardMaterial({
          // A revealed secret passage keeps a furtive, darker look
          color: edge.secret ? 0x2a2620 : 0x3d3a33, roughness: 1,
        })
      );
      bridge.position.set(pa.x + dx / 2, -0.02, pa.z + dz / 2);
      bridge.rotation.y = -Math.atan2(dz, dx);
      bridge.receiveShadow = true;
      this.staticGroup.add(bridge);
    }
  }

  getSpriteMaterial(icon) {
    if (!this.spriteMaterials.has(icon)) {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');
      ctx.font = '92px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, 64, 70);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      this.spriteMaterials.set(icon, new THREE.SpriteMaterial({ map: tex, transparent: true }));
    }
    return this.spriteMaterials.get(icon);
  }

  /** Which rooms the party can identify (path so far + one ahead + the boss) */
  knownSet(state) {
    return new Set(state.knownIdxs
      || state.dungeon.rooms.map((_, i) => i).filter(i => i <= state.roomIndex + 1));
  }

  updateIcons(state) {
    this.iconGroup.clear();
    const rooms = state.dungeon.rooms;
    const known = this.knownSet(state);
    const current = state.currentRoomIndex ?? state.roomIndex;

    rooms.forEach((room, i) => {
      if (room.secret && !room.discovered) return;   // still behind the wall
      const { x, z } = this.roomPositions[i];
      const isKnown = known.has(i) || room.type === 'boss';
      const icon = isKnown ? room.icon : '❓';

      // Rooms with a sprite standing on them don't need the emoji too
      if (isKnown && this.atlasReady) {
        const hasMonsterSprite = (room.type === 'monster' || room.type === 'boss') && room.monster && !room.cleared;
        if (hasMonsterSprite || getRoomProp(room)) return;
      }

      const sprite = new THREE.Sprite(this.getSpriteMaterial(icon));
      const scale = room.type === 'boss' ? 1.5 : 1.0;
      sprite.scale.set(scale, scale, 1);
      sprite.position.set(x, 1.35, z);
      sprite.material = sprite.material.clone();
      sprite.material.opacity = room.cleared && i !== current ? 0.28 : 1;
      sprite.userData.baseY = 1.35;
      sprite.userData.phase = i;
      this.iconGroup.add(sprite);
    });
  }

  updateParty(state) {
    this.partyGroup.clear();
    const idx = state.currentRoomIndex ?? Math.min(state.roomIndex, state.dungeon.rooms.length - 1);
    const { x, z } = this.roomPositions[idx] || { x: 0, z: 0 };

    // Torch travels with the party
    this.torch.position.set(x, 2.2, z);

    // A monster in an uncleared room holds the platform's center; the
    // party crowds the near edge, squaring up to it
    const room = state.dungeon.rooms[idx];
    const facingMonster = room && room.monster && !room.cleared &&
      (room.type === 'monster' || room.type === 'boss');
    const cx = facingMonster ? x - 0.75 : x;
    const cz = facingMonster ? z + 0.75 : z;

    const living = state.party.members.filter(m => m.alive);
    const n = living.length;
    living.forEach((m, i) => {
      // Ring formation (tighter when squaring up)
      const angle = (i / Math.max(1, n)) * Math.PI * 2;
      const r = n > 1 ? Math.min(facingMonster ? 0.5 : 0.75, 0.28 + n * 0.05) : 0;
      const mx = cx + Math.cos(angle) * r;
      const mz = cz + Math.sin(angle) * r;
      const wounded = m.health / m.maxHealth <= 0.35;

      if (this.atlasReady) {
        // The adventurer, in the flesh (well, in 16 pixels of it)
        const sprite = this.tileSprite(getClassTile(m.class), 0.82);
        sprite.position.set(mx, 0.72, mz);
        sprite.userData.baseY = 0.72;
        sprite.userData.phase = i * 1.7;
        if (wounded) {
          sprite.material = sprite.material.clone();
          sprite.material.color.set(0xb98080);
          sprite.scale.y = 0.68;
        }
        this.partyGroup.add(sprite);

        // Class-colored base disc under their feet
        const base = new THREE.Mesh(this.baseGeo, this.baseMats[m.class] || this.baseMats.fighter);
        base.position.set(mx, 0.24, mz);
        base.castShadow = true;
        this.partyGroup.add(base);
      } else {
        // Fallback meeple for the beat before the sheet loads
        const meeple = new THREE.Mesh(this.meepleGeo, this.meepleMats[m.class] || this.meepleMats.fighter);
        meeple.position.set(mx, 0.55, mz);
        meeple.castShadow = true;
        meeple.userData.baseY = 0.55;
        meeple.userData.phase = i * 1.7;
        this.partyGroup.add(meeple);
      }
    });
  }

  /**
   * Play a transient effect over the party's room: the sheet's slash
   * for steel, tinted glow bursts for magic, gold, and misfortune.
   */
  playEffect(action, roomIndex, element = null) {
    const style = EFFECT_STYLES[action];
    if (!style || !this.roomPositions[roomIndex]) return;
    const { x, z } = this.roomPositions[roomIndex];

    // A cast spell glows in its element's color
    const color = (action === 'spell-strike' && ELEMENT_FX_COLORS[element])
      ? ELEMENT_FX_COLORS[element]
      : style.color;

    let sprite;
    if (style.kind === 'slash' && this.atlasReady) {
      sprite = this.tileSprite(FX_TILES.slash, 1.1);
      sprite.material = sprite.material.clone();
    } else {
      sprite = new THREE.Sprite(this.glowMaterial(color || '#ffffff').clone());
      sprite.scale.set(1.1, 1.1, 1);
    }
    sprite.position.set(x, 1.0, z);
    this.fxGroup.add(sprite);
    this.effects.push({ sprite, born: this.clock.getElapsedTime(), life: 0.7 });
  }

  glowMaterial(color) {
    const key = `glow:${color}`;
    if (!this.spriteMaterials.has(key)) {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 6, 64, 64, 62);
      grad.addColorStop(0, color);
      grad.addColorStop(0.45, color + 'aa');
      grad.addColorStop(1, color + '00');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      this.spriteMaterials.set(key, new THREE.SpriteMaterial({
        map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      }));
    }
    return this.spriteMaterials.get(key);
  }

  animateFrame() {
    if (!this.camera) return;
    const t = this.clock.getElapsedTime();

    // Torch flicker
    this.torch.intensity = 26 + Math.sin(t * 9) * 3 + Math.sin(t * 23) * 2;

    // Icon bob
    for (const s of this.iconGroup.children) {
      s.position.y = s.userData.baseY + Math.sin(t * 1.6 + s.userData.phase) * 0.06;
    }
    // Party bob (they shift their feet, waiting)
    for (const m of this.partyGroup.children) {
      if (m.userData.baseY !== undefined) {
        m.position.y = m.userData.baseY + Math.abs(Math.sin(t * 2.2 + m.userData.phase)) * 0.05;
      }
    }
    // Monsters sway; props hold still
    for (const o of this.occupantGroup.children) {
      if (o.userData.sway) {
        o.position.y = o.userData.baseY + Math.sin(t * 2.8 + o.userData.phase) * 0.07;
      }
    }
    // Effects bloom and die
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const fx = this.effects[i];
      const age = (t - fx.born) / fx.life;
      if (age >= 1) {
        this.fxGroup.remove(fx.sprite);
        this.effects.splice(i, 1);
        continue;
      }
      const s = 0.9 + age * 1.6;
      fx.sprite.scale.set(s, s, 1);
      fx.sprite.material.opacity = 1 - age * age;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.renderer.dispose();
  }
}
