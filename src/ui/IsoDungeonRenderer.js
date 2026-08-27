/**
 * IsoDungeonRenderer — the delve in torchlit isometric 3D
 *
 * Adapted from SnakeAB's proven IsoRenderer, rebuilt for procgen v3:
 * rooms are drawn at the footprint DungeonGen gave them — halls long,
 * caverns ragged, rotundas round, vaults cramped — walled around the
 * perimeter with a doorway wherever a passage arrives, and joined by
 * corridors of real width. Trapdoors show as shafts in the floor.
 *
 * The party stands *inside* the room in marching order (fighters
 * front), spaced about a tile apart, squaring up against a monster
 * that holds the far end of the chamber.
 *
 * Renders synchronously on every game tick (hidden-tab safe) and
 * continuously via rAF when visible (torch flicker, meeple bob).
 */

import * as THREE from 'three';
import { ATLAS, FX_TILES, getClassTile, getMonsterTile, getRoomProp, getFeatureTile } from './SpriteAtlas.js';
import {
  TILE, DOOR_W, roomHalf, roomAxis, monsterSpot, partySlots, wallSpans, doorMap,
  featureSlots,
} from './RoomLayout.js';

const VIEW_HALF = 11;       // half-height of the view, in world units (~2 rooms)
const CAM_BACK = 26;        // how far back the iso eye sits
const WALL_H = 1.15;        // wall height in world units
const WALL_T = 0.28;        // wall thickness
const CORRIDOR_W = 1.7;     // connecting passage width
/** How far one floor sits below the one above it, in world units. */
const FLOOR_DROP = 7;

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
    // The camera sits ~26 units back and rides with the party, so fog
    // starts past the current chamber and swallows the far dungeon —
    // which is what a torch in the dark actually does
    this.scene.fog = new THREE.Fog(0x0a0805, 34, 78);

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

    // Discovery changes the map: found secret rooms surface. The theme
    // colors the stone. Footprints are part of the key — a resized or
    // reshaped room has to be rebuilt, not just repainted.
    const themeId = state.dungeon.theme?.id || 'delve';
    const key = themeId + '|' + rooms
      .map(r => `${r.type}${r.w}x${r.h}${r.shape}${r.secret && !r.discovered ? '?' : ''}`)
      .join(',');
    if (this.builtKey !== key) {
      this.buildDungeon(rooms, state.dungeon.edges, themeId, state.dungeon.trapdoors || []);
      this.builtKey = key;
    }

    this.updateIcons(state);
    this.updateOccupants(state);
    this.updateParty(state);

    // The camera rides with the party
    const idx = state.currentRoomIndex ?? Math.min(state.roomIndex, rooms.length - 1);
    this.focusOn(rooms[idx]);
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
      const { x, y: fy, z } = this.roomPositions[i];
      const known = knownRooms.has(i) || room.type === 'boss';
      if (!known) return;

      let sprite = null;
      if ((room.type === 'monster' || room.type === 'boss') && room.monster && !room.cleared) {
        const scale = room.type === 'boss' ? 1.7 : 1.05;
        // The monster holds its end of the room; the party gets the other
        const { mx, mz } = monsterSpot(room, x, z);
        sprite = this.tileSprite(getMonsterTile(room.monster.kind), scale);
        sprite.position.set(mx, fy + 0.2 + scale / 2, mz);
        sprite.userData.sway = true;

        // Its nature shows over its head — a readable enemy is a plan
        const badges = [];
        if (TRAIT_BADGES[room.monster.trait]) badges.push(TRAIT_BADGES[room.monster.trait]);
        const weakness = room.monster.undead ? 'holy' : (room.monster.weak || [])[0];
        if (ELEMENT_BADGES[weakness]) badges.push(ELEMENT_BADGES[weakness]);
        badges.forEach((emoji, bi) => {
          const badge = new THREE.Sprite(this.getSpriteMaterial(emoji));
          badge.scale.set(0.42, 0.42, 1);
          badge.position.set(mx - 0.25 + bi * 0.5, fy + 0.35 + scale, mz);
          badge.userData.baseY = fy + 0.35 + scale;
          badge.userData.phase = i * 1.3 + bi;
          badge.userData.sway = true;
          this.occupantGroup.add(badge);
        });
      } else {
        const prop = getRoomProp(room);
        if (prop) {
          // Furniture stands against the far end, out of the walkway
          const { mx, mz } = monsterSpot(room, x, z);
          sprite = this.tileSprite(prop, 0.95);
          sprite.position.set(mx, fy + 0.66, mz);
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

      // The room's furniture: pillars, braziers, a sarcophagus against
      // the wall (world/RoomFeatures.js). Drawn along the edges so the
      // party's ranks and the monster's end stay clear.
      const features = room.features || [];
      const slots = featureSlots(room, x, z, features.length);
      features.forEach((fid, fi) => {
        const tile = getFeatureTile(fid);
        const slot = slots[fi];
        if (!tile || !slot) return;
        const fsprite = this.tileSprite(tile, 0.8);
        fsprite.position.set(slot.mx, fy + 0.58, slot.mz);
        fsprite.userData.baseY = fy + 0.58;
        fsprite.userData.phase = i * 1.1 + fi;
        // A brazier flickers; stone does not
        if (fid === 'brazier') fsprite.userData.sway = true;
        this.occupantGroup.add(fsprite);
      });
    });
  }

  roomWorldPos(room) {
    // Floors stack: a room two levels down is drawn two drops below the
    // entrance level, so a descent is something you watch happen rather
    // than something the story panel tells you about.
    return { x: room.x * TILE, y: -(room.floor || 0) * FLOOR_DROP, z: room.y * TILE };
  }

  /**
   * The dungeon's true bounds in world space — room footprints, not
   * just their centers, or the widest cavern gets clipped off-frame.
   */
  bounds(rooms) {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const room of rooms) {
      const { x, z } = this.roomWorldPos(room);
      const { hx, hz } = roomHalf(room);
      minX = Math.min(minX, x - hx); maxX = Math.max(maxX, x + hx);
      minZ = Math.min(minZ, z - hz); maxZ = Math.max(maxZ, z + hz);
    }
    return { minX, maxX, minZ, maxZ, cx: (minX + maxX) / 2, cz: (minZ + maxZ) / 2 };
  }

  /**
   * The camera frames the party's surroundings, not the whole map —
   * a dungeon-wide view shrinks a chamber to a smudge, and the point
   * of real rooms is seeing four adventurers stand in one. The
   * minimap and the 2D floorplan carry the overview.
   */
  resize(rooms) {
    const w = this.canvas.clientWidth || 500;
    const h = this.canvas.clientHeight || 420;
    if (this.lastW === w && this.lastH === h && this.camera) return;
    this.lastW = w;
    this.lastH = h;
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Roughly two rooms and their corridors, top to bottom
    const aspect = w / h;
    const vertHalf = VIEW_HALF;
    this.camera = new THREE.OrthographicCamera(
      -vertHalf * aspect, vertHalf * aspect, vertHalf, -vertHalf, 0.1, 400
    );
    this.camera.position.set(CAM_BACK, CAM_BACK * 1.05, CAM_BACK);
    this.camera.lookAt(0, 0, 0);
    this.camTarget = new THREE.Vector3(0, 0, 0);
  }

  /**
   * Point the camera at a room. Called every tick; the actual move is
   * eased in animateFrame so the party glides between chambers.
   */
  focusOn(room) {
    if (!room || !this.camera) return;
    const { x, y, z } = this.roomWorldPos(room);
    // A big chamber needs the eye pulled back a little to fit
    const { hx, hz } = roomHalf(room);
    const zoomOut = Math.max(0, Math.max(hx, hz) - 3.5) * 0.55;
    // The camera follows the party down: it tracks the floor they stand
    // on, so the level below is not framed from the ceiling of the one above
    if (!this.camTarget) this.camTarget = new THREE.Vector3(x, y, z);
    this.camTarget.set(x, y, z);
    this.camZoom = zoomOut;
  }

  buildDungeon(rooms, edges = null, themeId = 'delve', trapdoors = []) {
    this.staticGroup.clear();
    this.roomPositions = rooms.map(r => this.roomWorldPos(r));

    const palette = THEME_PALETTES[themeId] || DEFAULT_PALETTE;
    this.palette = palette;
    this.scene.background = new THREE.Color(palette.bg);
    this.scene.fog = new THREE.Fog(palette.bg, 34, 78);

    const hidden = room => room.secret && !room.discovered;
    const edgeList = edges || rooms.slice(1).map((_, i) => ({ a: i, b: i + 1, kind: 'door' }));
    const doors = doorMap(rooms, edgeList, hidden);
    const wallMat = new THREE.MeshStandardMaterial({ color: palette.wall, roughness: 1 });
    const secretWallMat = new THREE.MeshStandardMaterial({ color: palette.wall, roughness: 1 });

    rooms.forEach((room, i) => {
      // Undiscovered secret rooms simply aren't there — that's the point
      if (hidden(room)) return;
      const { x, y: fy, z } = this.roomPositions[i];
      const { hx, hz } = roomHalf(room);
      const w = hx * 2;
      const d = hz * 2;

      // Theme-tinted stone with hand-laid shade variance; vaults gleam
      const shade = ((room.index * 7) % 5 - 2) * 0.02;
      const base = room.type === 'boss' ? palette.boss
        : room.type === 'vault' ? 0x6a5a30
        : palette.plat;
      const c = new THREE.Color(base);
      c.offsetHSL(0, 0, shade);
      const floorMat = new THREE.MeshStandardMaterial({ color: c, roughness: 0.95 });

      // The floor takes the room's shape: rotundas are round, caverns
      // ragged, everything else the honest rectangle of its footprint
      let floor;
      if (room.shape === 'rotunda') {
        floor = new THREE.Mesh(
          new THREE.CylinderGeometry(Math.min(hx, hz), Math.min(hx, hz) * 1.02, 0.35, 24),
          floorMat
        );
      } else {
        floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.35, d), floorMat);
      }
      floor.position.set(x, fy, z);
      floor.receiveShadow = true;
      this.staticGroup.add(floor);

      // A cavern's edges break up: slabs of fallen rock at the corners
      if (room.shape === 'cavern') {
        for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
          if ((room.index + sx + sz) % 2 !== 0) continue;
          const rubble = new THREE.Mesh(
            new THREE.BoxGeometry(w * 0.22, 0.5, d * 0.22),
            new THREE.MeshStandardMaterial({ color: palette.wall, roughness: 1 })
          );
          rubble.position.set(x + sx * (hx - w * 0.1), fy + 0.16, z + sz * (hz - d * 0.1));
          rubble.rotation.y = (room.index % 4) * 0.2;
          rubble.castShadow = true;
          this.staticGroup.add(rubble);
        }
      }

      // Walls around the perimeter, with a gap wherever a passage
      // meets this room. Rotundas stay open — a ring of pillars would
      // be nice but the colonnade reads worse than the clean circle.
      if (room.shape !== 'rotunda') {
        const sides = [
          { name: 'north', axis: 'x', len: w, off: -hz },
          { name: 'south', axis: 'x', len: w, off: hz },
          { name: 'west', axis: 'z', len: d, off: -hx },
          { name: 'east', axis: 'z', len: d, off: hx },
        ];
        const myDoors = doors.get(i) || [];
        for (const side of sides) {
          const sideDoors = myDoors.filter(dr => dr.side === side.name);
          // A secret door is a blank wall until it's found; the room
          // beyond is hidden anyway, so only revealed ones open up
          const spans = wallSpans(side.len, sideDoors.length);
          for (const [from, to] of spans) {
            const segLen = to - from;
            if (segLen <= 0.05) continue;
            const mat = sideDoors.some(dr => dr.secret) ? secretWallMat : wallMat;
            const seg = side.axis === 'x'
              ? new THREE.Mesh(new THREE.BoxGeometry(segLen, WALL_H, WALL_T), mat)
              : new THREE.Mesh(new THREE.BoxGeometry(WALL_T, WALL_H, segLen), mat);
            const mid = (from + to) / 2;
            if (side.axis === 'x') seg.position.set(x + mid, fy + WALL_H / 2, z + side.off);
            else seg.position.set(x + side.off, fy + WALL_H / 2, z + mid);
            seg.castShadow = true;
            this.staticGroup.add(seg);
          }
        }
      }
    });

    // Corridors: real passages between rooms, running wall to wall.
    // The layout only ever steps along one axis, so they stay straight.
    for (const edge of edgeList) {
      // A stair joins two floors, so it is a drop rather than a passage:
      // it gets its own flight of steps below, not a flat corridor.
      if (edge.kind === 'trapdoor' || edge.kind === 'stair') continue;
      const ra = rooms[edge.a];
      const rb = rooms[edge.b];
      if (!ra || !rb || hidden(ra) || hidden(rb)) continue;
      const pa = this.roomPositions[edge.a];
      const pb = this.roomPositions[edge.b];
      const ha = roomHalf(ra);
      const hb = roomHalf(rb);
      const dx = pb.x - pa.x;
      const dz = pb.z - pa.z;
      const mat = new THREE.MeshStandardMaterial({
        // A revealed secret passage keeps a furtive, darker look
        color: edge.secret ? 0x2a2620 : 0x3d3a33, roughness: 1,
      });

      let corridor;
      if (Math.abs(dx) >= Math.abs(dz)) {
        const gap = Math.abs(dx) - ha.hx - hb.hx;
        if (gap <= 0.05) continue;
        corridor = new THREE.Mesh(new THREE.BoxGeometry(gap + 0.4, 0.2, CORRIDOR_W), mat);
        corridor.position.set(pa.x + Math.sign(dx) * (ha.hx + gap / 2), pa.y - 0.02, pa.z);
      } else {
        const gap = Math.abs(dz) - ha.hz - hb.hz;
        if (gap <= 0.05) continue;
        corridor = new THREE.Mesh(new THREE.BoxGeometry(CORRIDOR_W, 0.2, gap + 0.4), mat);
        corridor.position.set(pa.x, pa.y - 0.02, pa.z + Math.sign(dz) * (ha.hz + gap / 2));
      }
      corridor.receiveShadow = true;
      this.staticGroup.add(corridor);
    }

    // Stairs: a flight of steps from the stairhead down to the room it
    // lands in, so the two floors read as one place.
    for (const edge of edgeList) {
      if (edge.kind !== 'stair') continue;
      const ra = rooms[edge.a];
      const rb = rooms[edge.b];
      if (!ra || !rb || hidden(ra) || hidden(rb)) continue;
      const pa = this.roomPositions[edge.a];
      const pb = this.roomPositions[edge.b];
      const drop = pa.y - pb.y;
      if (drop <= 0) continue;
      const steps = 6;
      const stepMat = new THREE.MeshStandardMaterial({ color: 0x35322b, roughness: 1 });
      const half = roomHalf(ra);
      for (let stp = 0; stp < steps; stp++) {
        const t = (stp + 0.5) / steps;
        const step = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.3, 1.1), stepMat);
        step.position.set(
          pa.x + (pb.x - pa.x) * t * 0.35 - half.hx * 0.2,
          pa.y - drop * t,
          pa.z + (pb.z - pa.z) * t * 0.35 + half.hz * 0.25,
        );
        step.receiveShadow = true;
        this.staticGroup.add(step);
      }
    }

    // Trapdoors: a shaft in the floor of the room that holds them
    for (const td of trapdoors) {
      const room = rooms[td.from];
      if (!room || hidden(room)) continue;
      const { x, y: fy, z } = this.roomPositions[td.from];
      const { hx, hz } = roomHalf(room);
      const shaft = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.42, 1.5),
        new THREE.MeshStandardMaterial({
          // Hidden shafts read as rubble; found ones as a black hole
          color: td.secret ? 0x2e2a24 : 0x07060a, roughness: 1,
        })
      );
      shaft.position.set(x + hx * 0.45, fy + 0.01, z - hz * 0.45);
      this.staticGroup.add(shaft);
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
      const { x, y: fy, z } = this.roomPositions[i];
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
      // Float the label clear of the room's walls
      const labelY = fy + WALL_H + 0.6;
      sprite.position.set(x, labelY, z);
      sprite.material = sprite.material.clone();
      sprite.material.opacity = room.cleared && i !== current ? 0.28 : 1;
      sprite.userData.baseY = labelY;
      sprite.userData.phase = i;
      this.iconGroup.add(sprite);
    });
  }

  updateParty(state) {
    this.partyGroup.clear();
    const idx = state.currentRoomIndex ?? Math.min(state.roomIndex, state.dungeon.rooms.length - 1);
    const { x, y: fy, z } = this.roomPositions[idx] || { x: 0, y: 0, z: 0 };
    const room = state.dungeon.rooms[idx];

    // The torch has to light the whole chamber now, not a platform
    const reach = room ? Math.max(roomHalf(room).hx, roomHalf(room).hz) : 4;
    this.torch.position.set(x, fy + 2.4, z);
    this.torch.distance = Math.max(12, reach * 3.4);
    this.torchBase = 24 + reach * 2.2;

    const facingMonster = room && room.monster && !room.cleared &&
      (room.type === 'monster' || room.type === 'boss');

    // Fighters to the front rank; the fragile behind them
    const living = state.party.members
      .filter(m => m.alive)
      .slice()
      .sort((a, b) => (a.class === 'fighter' ? -1 : 0) - (b.class === 'fighter' ? -1 : 0));
    const n = living.length;
    // Stand them the way they are actually fighting: the formation the
    // party chose is on the state, and the drawing agrees with the maths
    const slots = room
      ? partySlots(room, x, z, n, facingMonster, state?.party?.formation || 'line')
      : living.map(() => ({ mx: x, mz: z }));

    living.forEach((m, i) => {
      const { mx, mz } = slots[i];
      const wounded = m.health / m.maxHealth <= 0.35;

      if (this.atlasReady) {
        // The adventurer, in the flesh (well, in 16 pixels of it)
        const sprite = this.tileSprite(getClassTile(m.class), 0.82);
        sprite.position.set(mx, fy + 0.72, mz);
        sprite.userData.baseY = fy + 0.72;
        sprite.userData.phase = i * 1.7;
        if (wounded) {
          sprite.material = sprite.material.clone();
          sprite.material.color.set(0xb98080);
          sprite.scale.y = 0.68;
        }
        this.partyGroup.add(sprite);

        // Class-colored base disc under their feet
        const base = new THREE.Mesh(this.baseGeo, this.baseMats[m.class] || this.baseMats.fighter);
        base.position.set(mx, fy + 0.24, mz);
        base.castShadow = true;
        this.partyGroup.add(base);
      } else {
        // Fallback meeple for the beat before the sheet loads
        const meeple = new THREE.Mesh(this.meepleGeo, this.meepleMats[m.class] || this.meepleMats.fighter);
        meeple.position.set(mx, fy + 0.55, mz);
        meeple.castShadow = true;
        meeple.userData.baseY = fy + 0.55;
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
    const { x, y: fy, z } = this.roomPositions[roomIndex];

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
    sprite.position.set(x, fy + 1.0, z);
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

    // Glide the camera to the room the party is in
    if (this.camTarget) {
      const back = CAM_BACK + (this.camZoom || 0) * 2;
      const want = new THREE.Vector3(
        this.camTarget.x + back, this.camTarget.y + back * 1.05, this.camTarget.z + back
      );
      // First frame snaps; after that it eases
      const ease = this.camPlaced ? 0.12 : 1;
      this.camPlaced = true;
      this.camera.position.lerp(want, ease);
      if (!this.camLook) this.camLook = this.camTarget.clone();
      this.camLook.lerp(this.camTarget, ease);
      this.camera.lookAt(this.camLook);
      const zoom = VIEW_HALF + (this.camZoom || 0);
      const aspect = (this.lastW || 500) / (this.lastH || 420);
      this.camera.top = zoom;
      this.camera.bottom = -zoom;
      this.camera.left = -zoom * aspect;
      this.camera.right = zoom * aspect;
      this.camera.updateProjectionMatrix();
    }

    // Torch flicker
    // Bigger chambers need a brighter torch to read at all
    const torchBase = this.torchBase || 26;
    this.torch.intensity = torchBase + Math.sin(t * 9) * 3 + Math.sin(t * 23) * 2;

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
