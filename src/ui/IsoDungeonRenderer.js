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
import {
  ATLAS, FX_TILES, ARCH_TILES,
  getClassTile, getMonsterTile, getRoomProp, getFloorTile, getTorchTile,
} from './SpriteAtlas.js';

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
    this.timeline = [];    // scheduled combat-theater beats
    this.shakeAmp = 0;     // camera shake, decaying
    this.lastT = 0;

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

    // The camera frames the floor the party is on, not the whole stack
    this.currentFloor = state.currentFloor || 0;
    const floorRooms = rooms.filter(r => (r.floor || 0) === this.currentFloor);
    this.resize(floorRooms.length ? floorRooms : rooms);

    // Discovery changes the map: found secret rooms surface, an
    // opened iron door comes off its hinges, and descending a stair
    // swaps the whole visible stratum. The theme colors the stone.
    const themeId = state.dungeon.theme?.id || 'delve';
    const branches = state.dungeon.branches || [];
    const openedLocks = branches.filter(b => b.locked && b.consumed).length;
    const key = (this.atlasReady ? 'A|' : 'a|') + themeId + '|' + openedLocks + '|f' + this.currentFloor + '|' + rooms.map(r => `${r.type}${r.secret && !r.discovered ? '?' : ''}`).join(',');
    if (this.builtKey !== key) {
      this.buildDungeon(rooms, state.dungeon.edges, themeId, branches);
      this.builtKey = key;
    }

    this.updateIcons(state);
    this.updateOccupants(state);
    this.updateParty(state);
    this.animateFrame();
  }

  /**
   * A standalone, repeatable texture of one sheet tile — extracted to
   * its own canvas so walls and floors can tile it freely (an atlas
   * sub-region can't wrap without bleeding into its neighbors).
   */
  tileTexture(tile, repeatX = 1, repeatY = 1) {
    const key = `tt:${tile.col},${tile.row}:${repeatX},${repeatY}`;
    if (!this.spriteMaterials.has(key)) {
      const c = document.createElement('canvas');
      c.width = ATLAS.tile;
      c.height = ATLAS.tile;
      c.getContext('2d').drawImage(
        this.atlasTex.image,
        tile.col * ATLAS.tile, tile.row * ATLAS.tile, ATLAS.tile, ATLAS.tile,
        0, 0, ATLAS.tile, ATLAS.tile,
      );
      const tex = new THREE.CanvasTexture(c);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatX, repeatY);
      this.spriteMaterials.set(key, tex);
    }
    return this.spriteMaterials.get(key);
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

  /**
   * Standalone image art (engraving extractions, pack art): smooth
   * filtering, aspect preserved, cached per URL.
   */
  imageMaterial(url) {
    const key = `img:${url}`;
    if (!this.tileMats.has(key)) {
      const tex = new THREE.TextureLoader().load(url, () => {
        if (this.lastState) this.render(this.lastState);
      });
      tex.colorSpace = THREE.SRGBColorSpace;
      this.tileMats.set(key, new THREE.SpriteMaterial({ map: tex, transparent: true }));
    }
    return this.tileMats.get(key);
  }

  tileSprite(tile, scale = 1) {
    if (tile.img) {
      const mat = this.imageMaterial(tile.img);
      const sprite = new THREE.Sprite(mat);
      // Preserve the plate's aspect once the image is known
      const img = mat.map?.image;
      const aspect = img && img.width ? img.width / img.height : 1;
      sprite.scale.set(scale * Math.min(aspect, 1.4), scale, 1);
      return sprite;
    }
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
      if ((room.floor || 0) !== (this.currentFloor || 0)) return;
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
        if (room.monster.elite) badges.push('⭐');   // a veteran, and proud of it
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
        // The peddler stocks the stall: a barrel beside the counter
        if (room.type === 'shop' && !room.cleared) {
          const barrel = this.tileSprite(getRoomProp({ type: 'shop-barrel' }) || { col: 7, row: 5 }, 0.6);
          barrel.position.set(x + 0.62, 0.5, z + 0.3);
          barrel.userData.baseY = 0.5;
          this.occupantGroup.add(barrel);
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
    if (this.lastW === w && this.lastH === h && this.camera && this.builtKey && this.lastFloor === this.currentFloor) return;
    this.lastW = w;
    this.lastH = h;
    this.lastFloor = this.currentFloor;
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
    this.camBase = this.camera.position.clone();   // shake pivots off this
  }

  buildDungeon(rooms, edges = null, themeId = 'delve', branches = []) {
    this.staticGroup.clear();
    this.roomPositions = rooms.map(r => this.roomWorldPos(r));

    const palette = THEME_PALETTES[themeId] || DEFAULT_PALETTE;
    this.scene.background = new THREE.Color(palette.bg);
    this.scene.fog = new THREE.Fog(palette.bg, 44, 110);

    const platGeo = new THREE.BoxGeometry(2.4, 0.35, 2.4);
    const bossGeo = new THREE.BoxGeometry(3.1, 0.5, 3.1);
    // Off-floor rooms are behind the world, not just behind a wall
    const hidden = room => (room.secret && !room.discovered)
      || (room.floor || 0) !== (this.currentFloor || 0);

    // With the sheet loaded, the dungeon gets real fabric: tiled stone
    // floors, brick walls, torches on the sconces. Before it loads (or
    // if it never does), the flat-color boxes still stand.
    const dressed = this.atlasReady;
    const floorTex = dressed ? this.tileTexture(getFloorTile(themeId), 2, 2) : null;
    const wallTexA = dressed ? this.tileTexture(ARCH_TILES.wallBrick, 2, 0.62) : null;
    const wallTexB = dressed ? this.tileTexture(ARCH_TILES.wallBrickB, 2, 0.62) : null;
    const floorGeo = new THREE.PlaneGeometry(2.36, 2.36);
    const torchTile = getTorchTile(themeId);

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

      // The tiled floor lies on the platform top, tinted by the theme
      if (dressed) {
        const tint = new THREE.Color(base).lerp(new THREE.Color(0xffffff), 0.72);
        const floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({
          map: floorTex, color: tint, roughness: 0.95,
        }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(x, 0.181, z);
        if (room.type === 'boss') floor.scale.set(1.28, 1.28, 1);
        floor.receiveShadow = true;
        this.staticGroup.add(floor);
      }

      // Low walls on two sides give chambers depth — brickwork when
      // the sheet is in, flat stone until then
      const wallTint = dressed ? new THREE.Color(palette.wall).lerp(new THREE.Color(0xffffff), 0.55) : palette.wall;
      const wallMat = new THREE.MeshStandardMaterial({
        color: wallTint, roughness: 1,
        ...(dressed ? { map: (room.index % 2 ? wallTexA : wallTexB) } : {}),
      });
      const wall1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 0.2), wallMat);
      wall1.position.set(x, 0.5, z - 1.15);
      wall1.castShadow = true;
      this.staticGroup.add(wall1);
      const wall2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 2.4), wallMat);
      wall2.position.set(x - 1.15, 0.5, z);
      wall2.castShadow = true;
      this.staticGroup.add(wall2);

      if (dressed) {
        // The boss chamber hangs its colors
        if (room.type === 'boss') {
          const banner = this.tileSprite(ARCH_TILES.banner, 0.85);
          banner.position.set(x, 1.05, z - 1.0);
          this.staticGroup.add(banner);
        }
        // Torches on the sconces: gathering rooms always, corridors
        // every third room, flames in the theme's color
        const lit = ['shrine', 'altar', 'shop', 'stairs', 'boss', 'entrance'].includes(room.type)
          || room.index % 3 === 0;
        if (lit) {
          const torch = this.tileSprite(torchTile, 0.55);
          torch.position.set(x - 0.85, 1.05, z - 1.0);
          torch.userData.flicker = (room.index * 1.7) % 6;
          this.staticGroup.add(torch);
        }
      }
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
          // A revealed secret passage keeps a furtive, darker look;
          // a locked walkway carries an iron-and-brass cast
          color: edge.secret ? 0x2a2620 : edge.locked ? 0x4a4030 : 0x3d3a33, roughness: 1,
        })
      );
      bridge.position.set(pa.x + dx / 2, -0.02, pa.z + dz / 2);
      bridge.rotation.y = -Math.atan2(dz, dx);
      bridge.receiveShadow = true;
      this.staticGroup.add(bridge);

      // The iron gate itself stands mid-walkway until it opens: the
      // sheet's portcullis when the art is in, a plain bar until then
      const doorOpened = branches.some(b => b.locked && b.consumed && b.rooms[0] === edge.b);
      if (edge.locked && !doorOpened) {
        if (this.atlasReady) {
          const gate = this.tileSprite(ARCH_TILES.portcullis, 1.0);
          gate.position.set(pa.x + dx / 2, 0.62, pa.z + dz / 2);
          this.staticGroup.add(gate);
        } else {
          const door = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 1.1, 1.0),
            new THREE.MeshStandardMaterial({ color: 0x8a7a45, metalness: 0.5, roughness: 0.6 })
          );
          door.position.set(pa.x + dx / 2, 0.55, pa.z + dz / 2);
          door.rotation.y = -Math.atan2(dz, dx);
          door.castShadow = true;
          this.staticGroup.add(door);
        }
      }
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
      if ((room.floor || 0) !== (this.currentFloor || 0)) return;   // another stratum
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
   * Play a transient effect over the party's room: a full blow-by-blow
   * combat playback when a fight happened, otherwise the sheet's slash
   * for steel, tinted glow bursts for magic — and the numbers, always
   * the numbers: gold in gold, blood in red, mending in green.
   */
  playEffect(action, roomIndex, element = null, fx = null) {
    if (!this.roomPositions[roomIndex]) return;
    const { x, z } = this.roomPositions[roomIndex];

    if (fx?.combatLog?.length) {
      this.playCombat(fx, roomIndex);
      return;
    }

    // Quieter rooms still show their arithmetic
    if (fx) {
      if (fx.gold > 0) this.spawnNumber(x, 1.35, z, `+${fx.gold}g`, '#ffd75e', 1.05);
      if (fx.damage > 0) this.spawnNumber(x - 0.6, 1.1, z + 0.6, `-${fx.damage}`, '#ff6a5e', 0.95);
      if (fx.healed > 0) this.spawnNumber(x - 0.4, 1.1, z + 0.4, `+${fx.healed}`, '#7ee787', 0.95);
    }

    const style = EFFECT_STYLES[action];
    if (!style) return;

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

  /**
   * The fight, staged: a ghost of the monster stands its ground while
   * the log replays — attributed hits, backstab crits, cantrip chips,
   * the counter-blows shaking the camera, a health bar draining to
   * the verdict. Compressed to fit inside one game tick.
   */
  playCombat(fx, roomIndex) {
    const { x, z } = this.roomPositions[roomIndex];
    const now = this.clock.getElapsedTime();
    const log = fx.combatLog;
    const isBoss = !!log.length && fx.monsterMaxHealth >= 30;   // heuristic scale
    const mScale = isBoss ? 1.6 : 1.05;

    // The ghost: the monster as it stood, plus its health bar
    let ghost = null;
    let barFg = null;
    if (this.atlasReady && fx.monsterKind) {
      ghost = this.tileSprite(getMonsterTile(fx.monsterKind), mScale);
      ghost.material = ghost.material.clone();   // its fate is its own
      ghost.position.set(x, 0.2 + mScale / 2, z);
      ghost.userData.combatGhost = true;
      ghost.userData.baseScale = mScale;
      this.fxGroup.add(ghost);

      const barBg = new THREE.Sprite(this.glowMaterial('#000000').clone());
      barBg.material.blending = THREE.NormalBlending;
      barBg.material.opacity = 0.55;
      barBg.scale.set(1.15, 0.14, 1);
      barBg.position.set(x, 0.55 + mScale, z);
      this.fxGroup.add(barBg);

      barFg = new THREE.Sprite(this.glowMaterial('#e05555').clone());
      barFg.material.blending = THREE.NormalBlending;
      barFg.scale.set(1.05, 0.09, 1);
      barFg.position.set(x, 0.55 + mScale, z);
      this.fxGroup.add(barFg);
      ghost.userData.barSprites = [barBg, barFg];
    }

    // Compress the rounds so the theater fits the tick
    const dt = Math.min(0.5, 1.9 / log.length);
    const px = x - 0.75;   // where the party squares up
    const pz = z + 0.75;

    log.forEach((entry, r) => {
      const base = now + 0.15 + r * dt;
      entry.events.forEach((ev, e) => {
        const at = base + e * Math.min(0.11, dt / Math.max(2, entry.events.length));
        const jx = ((r * 7 + e * 3) % 5 - 2) * 0.14;   // scatter, deterministic
        this.timeline.push({ at, fn: () => {
          if (ev.kind === 'hero-hit' || ev.kind === 'opening') {
            if (this.atlasReady) {
              const slash = this.tileSprite(FX_TILES.slash, ev.crit ? 1.25 : 0.9);
              slash.material = slash.material.clone();
              slash.position.set(x + jx, 0.95, z);
              this.fxGroup.add(slash);
              this.effects.push({ sprite: slash, born: this.clock.getElapsedTime(), life: 0.4 });
            }
            this.spawnNumber(x + jx, 1.5 + mScale * 0.5, z,
              ev.crit ? `✦${ev.amount}` : `${ev.amount}`,
              ev.crit ? '#ffe95e' : '#ffffff', ev.crit ? 1.25 : 0.85);
            if (ghost) ghost.userData.flinchUntil = this.clock.getElapsedTime() + 0.14;
          } else if (ev.kind === 'cantrip') {
            this.spawnGlow(x + jx, 1.0, z, '#b07ae8', 0.8);
            this.spawnNumber(x + jx, 1.5 + mScale * 0.5, z, `${ev.amount}`, '#b07ae8', 0.8);
          } else if (ev.kind === 'vial') {
            this.spawnGlow(x + jx, 1.0, z, '#3cb8a8', 0.8);
            this.spawnNumber(x + jx, 1.5 + mScale * 0.5, z, `${ev.amount}`, '#3cb8a8', 0.8);
          } else if (ev.kind === 'monster-hit') {
            this.spawnNumber(px, 1.35, pz, `-${ev.amount}`, '#ff6a5e', 0.95);
            this.shakeAmp = Math.max(this.shakeAmp, 0.1 + Math.min(0.12, ev.amount * 0.015));
          } else if (ev.kind === 'monster-move') {
            // A signature move washes over the party in its own color
            this.spawnGlow(px, 1.0, pz, ELEMENT_FX_COLORS[ev.element] || '#ff5540', 1.5);
            this.spawnNumber(px, 1.45, pz, `-${ev.amount}`, '#ff6a5e', 1.2);
            this.shakeAmp = Math.max(this.shakeAmp, 0.24);
          } else if (ev.kind === 'drain') {
            this.spawnNumber(x, 1.25 + mScale * 0.5, z, `+${ev.amount}`, '#c05a78', 0.85);
          } else if (ev.kind === 'triage') {
            this.spawnNumber(px - 0.3, 1.3, pz, `+${ev.amount}`, '#7ee787', 0.85);
          } else if (ev.kind === 'phase') {
            this.spawnGlow(x, 1.1, z, '#ff5540', 1.6);
            this.shakeAmp = Math.max(this.shakeAmp, 0.3);
          } else if (ev.kind === 'rout') {
            this.spawnNumber(x, 1.2 + mScale * 0.5, z, '💨', '#cccccc', 1.1);
            if (ghost) ghost.userData.fleeing = true;
          }
          // The bar drains to where the round left it
          if (barFg && fx.monsterMaxHealth > 0) {
            const frac = Math.max(0, entry.monsterHp) / fx.monsterMaxHealth;
            barFg.scale.x = 1.05 * frac;
            barFg.position.x = x - (1.05 * (1 - frac)) / 2;
          }
        } });
      });
    });

    // Curtain: the ghost falls (or flees), the bar goes with it
    const endAt = now + 0.3 + log.length * dt;
    this.timeline.push({ at: endAt, fn: () => {
      if (!ghost) return;
      ghost.userData.dying = this.clock.getElapsedTime();
      for (const b of ghost.userData.barSprites || []) this.fxGroup.remove(b);
      const won = log[log.length - 1].monsterHp <= 0 || fx.routed;
      if (won && !fx.routed) this.spawnGlow(x, 0.8, z, '#ffd75e', 1.3);
    } });
  }

  /** A floating combat number: rises, fades, never lies. */
  spawnNumber(x, y, z, text, color, scale = 1) {
    const sprite = new THREE.Sprite(this.textMaterial(text, color));
    sprite.scale.set(scale * 0.62 * Math.max(1.6, text.length * 0.62), scale * 0.62, 1);
    sprite.position.set(x, y, z);
    this.fxGroup.add(sprite);
    this.effects.push({ sprite, born: this.clock.getElapsedTime(), life: 0.9, rise: 0.75, isText: true, baseY: y });
  }

  spawnGlow(x, y, z, color, scale = 1) {
    const sprite = new THREE.Sprite(this.glowMaterial(color).clone());
    sprite.scale.set(scale, scale, 1);
    sprite.position.set(x, y, z);
    this.fxGroup.add(sprite);
    this.effects.push({ sprite, born: this.clock.getElapsedTime(), life: 0.6 });
  }

  /** Crisp outlined number/text material (canvas-drawn, cached). */
  textMaterial(text, color) {
    const key = `txt:${color}:${text}`;
    if (!this.spriteMaterials.has(key)) {
      const c = document.createElement('canvas');
      c.width = 160;
      c.height = 64;
      const ctx = c.getContext('2d');
      ctx.font = 'bold 42px "Trebuchet MS", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 8;
      ctx.strokeStyle = 'rgba(10,8,5,0.9)';
      ctx.strokeText(text, 80, 34);
      ctx.fillStyle = color;
      ctx.fillText(text, 80, 34);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      this.spriteMaterials.set(key, new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    }
    return this.spriteMaterials.get(key).clone();
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
    const delta = Math.min(0.1, t - this.lastT);
    this.lastT = t;

    // Torch flicker (the traveling one, and every sconce on the walls)
    this.torch.intensity = 26 + Math.sin(t * 9) * 3 + Math.sin(t * 23) * 2;
    for (const s of this.staticGroup.children) {
      if (s.userData.flicker !== undefined) {
        const ph = s.userData.flicker;
        s.scale.y = 0.55 * (1 + 0.10 * Math.sin(t * 11 + ph));
        s.scale.x = 0.55 * (1 + 0.06 * Math.sin(t * 13 + ph * 1.7));
      }
    }

    // The combat theater runs its script
    while (this.timeline.length && this.timeline[0].at <= t) {
      this.timeline.shift().fn();
    }
    // Sort-on-insert isn't guaranteed; sweep any stragglers due now
    if (this.timeline.length && this.timeline.some(e => e.at <= t)) {
      const due = this.timeline.filter(e => e.at <= t);
      this.timeline = this.timeline.filter(e => e.at > t);
      due.forEach(e => e.fn());
    }

    // Combat ghosts flinch, flee, and fall
    for (let i = this.fxGroup.children.length - 1; i >= 0; i--) {
      const o = this.fxGroup.children[i];
      const u = o.userData;
      if (!u.combatGhost) continue;
      if (u.fleeing) {
        o.position.x += 2.4 * delta;
        o.position.z += 1.2 * delta;
        o.material.opacity = Math.max(0, o.material.opacity - 1.6 * delta);
        if (o.material.opacity <= 0) this.fxGroup.remove(o);
      } else if (u.dying !== undefined) {
        const a = (t - u.dying) / 0.5;
        o.material.opacity = Math.max(0, 1 - a);
        o.scale.y = Math.max(0.05, u.baseScale * (1 - a * 0.8));
        if (a >= 1) this.fxGroup.remove(o);
      } else if (u.flinchUntil) {
        const flinching = t < u.flinchUntil;
        o.scale.x = u.baseScale * (flinching ? 0.82 : 1);
        o.position.x += flinching ? 0.001 : 0; // imperceptible, keeps it "live"
      }
    }

    // Camera shake: the blows land on the viewer too
    if (this.camBase) {
      if (this.shakeAmp > 0.004) {
        this.camera.position.set(
          this.camBase.x + (Math.random() - 0.5) * this.shakeAmp * 2,
          this.camBase.y + (Math.random() - 0.5) * this.shakeAmp,
          this.camBase.z + (Math.random() - 0.5) * this.shakeAmp * 2,
        );
        this.shakeAmp *= 0.88;
      } else if (!this.camera.position.equals(this.camBase)) {
        this.camera.position.copy(this.camBase);
      }
    }

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
    // Effects bloom and die; numbers rise and fade instead
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const fx = this.effects[i];
      const age = (t - fx.born) / fx.life;
      if (age >= 1) {
        this.fxGroup.remove(fx.sprite);
        this.effects.splice(i, 1);
        continue;
      }
      if (fx.isText) {
        fx.sprite.position.y = fx.baseY + fx.rise * age;
        fx.sprite.material.opacity = age < 0.15 ? age / 0.15 : 1 - ((age - 0.15) / 0.85) ** 2;
      } else {
        const s = 0.9 + age * 1.6;
        fx.sprite.scale.set(s, s, 1);
        fx.sprite.material.opacity = 1 - age * age;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.renderer.dispose();
  }
}
