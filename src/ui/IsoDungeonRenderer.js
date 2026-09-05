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
import { getFeature } from '../world/RoomFeatures.js';
import {
  TILE, DOOR_W, roomHalf, roomAxis, monsterSpot, partySlots, wallSpans, doorMap,
  featureSlots, frontCount, marchingOrder,
} from './RoomLayout.js';

// Half-height of the view, in world units, before the room adds to it.
// Rooms are half again as big as they were, and a fixed wide view drew
// four adventurers as six pixels each — which is no good to anyone
// trying to read where the party is standing.
const VIEW_HALF = 6.2;
const CAM_BACK = 26;        // how far back the iso eye sits

/**
 * How high the eye rides, as a multiple of CAM_BACK.
 *
 * For a camera at 45° azimuth, a ground tile projects to a diamond whose
 * height-to-width ratio is exactly sin(elevation): the diamond is √2
 * wide and √2·sinθ tall. Ultima VII and VIII use the 2:1 convention — a
 * tile twice as wide as it is tall — which needs sin θ = 0.5, θ = 30°.
 *
 *   y = CAM_BACK·k,  ground run = CAM_BACK·√2,  tan 30° = k/√2
 *   → k = √2 · tan 30° = 0.8165
 *
 * This was 1.05 from v1.0 to v8.1: θ = 36.6°, a 1.68:1 diamond, which is
 * near true isometric — the SimCity eye, looking down at the floor. The
 * flatter Ultima eye looks *across* the chamber, which is why its
 * interiors read as rooms you stand in rather than plans you hover over.
 *
 * It lives here as one constant because resize() and animateFrame() both
 * need it and must never disagree about it.
 */
const CAM_RISE = Math.SQRT2 * Math.tan(Math.PI / 6);   // 0.8165 → θ = 30°
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

/*
 * Every theme colors its own stone (v3: the castle is not the bog).
 *
 * `fill` is new with the G2 relight and it is what keeps a theme legible
 * now that the torch is the key light. Warm torchlight on grey stone
 * makes every dungeon the same orange dungeon; the fill is the colour
 * the *shadows* go, which is where a theme actually lives — the ice
 * caverns are cold in the dark and warm only where the party is
 * standing, and the athanor is warm all the way through. `ground` is the
 * hemisphere's downward half, the bounce off the floor.
 *
 * This is the cheap version of the per-theme LUT in GRAPHICS.md §4; it
 * costs two colours and no post-processing pass. Take the LUT when a
 * grading pass exists to hang it on.
 *
 * Note on the roster: only `delve`, `castle` and `icecaverns` are built
 * in. `athanor` arrives at runtime from the alchemy pack via
 * `registerTheme()`, which is on by default — so four of these are
 * reachable in a normal session. The remaining five are the extension
 * points a future pack registers into, not dead code.
 */
const THEME_PALETTES = {
  delve: { plat: 0x615b52, wall: 0x35322c, bg: 0x0a0805, boss: 0x5a2626, fill: 0x3a4250, ground: 0x2a2118 },
  crypt: { plat: 0x4e4a56, wall: 0x2c2a33, bg: 0x070609, boss: 0x4a2a4a, fill: 0x40384f, ground: 0x231d28 },
  volcanic: { plat: 0x5c4038, wall: 0x33211c, bg: 0x0d0503, boss: 0x7a2a1a, fill: 0x5a2a1c, ground: 0x3a1408 },
  library: { plat: 0x3f4a58, wall: 0x232c38, bg: 0x04070b, boss: 0x2a3a5a, fill: 0x2e4260, ground: 0x1d2733 },
  madlab: { plat: 0x44584a, wall: 0x24352a, bg: 0x040804, boss: 0x2a5a3a, fill: 0x2c4a38, ground: 0x1b2a1f },
  castle: { plat: 0x3e3a4e, wall: 0x201d2c, bg: 0x050409, boss: 0x5a1a2a, fill: 0x39485e, ground: 0x2a1d12 },
  bogcellar: { plat: 0x4a4a34, wall: 0x2a2a1c, bg: 0x060703, boss: 0x4a5a1a, fill: 0x3d4227, ground: 0x241f12 },
  icecaverns: { plat: 0x4a5a66, wall: 0x2a3640, bg: 0x040709, boss: 0x3a5a6a, fill: 0x2f5f80, ground: 0x1c3340 },
  athanor: { plat: 0x5a4a38, wall: 0x33291c, bg: 0x0a0703, boss: 0x6a4a1a, fill: 0x54381a, ground: 0x33200c },
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

    // A torch is a high-dynamic-range object: bright core, fast falloff,
    // deep shadow. Rendered with NoToneMapping — which is what this
    // scene did from v1.0 to v8.1 — the bright end clamps to white and
    // the dark end has nowhere to go, so the range collapses and the
    // torch reads as an orange smudge on evenly grey stone. The curve is
    // what buys back the range. Own it here and nowhere else, so a
    // later post-processing pass cannot double up on it.
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0805);
    // The camera sits ~26 units back and rides with the party, so fog
    // starts past the current chamber and swallows the far dungeon —
    // which is what a torch in the dark actually does
    this.scene.fog = new THREE.Fog(0x0a0805, 34, 78);

    // The rig this replaces was SnakeAB's, inherited whole at v1.0 and
    // never revisited: AmbientLight(0xaab4d0, 1.1) plus a hemisphere at
    // 0.9 — the colours of a cold outdoor sky, in a hole in the ground.
    // Two units of flat fill reached every surface equally, so the torch
    // had no dark to carve anything out of. What is left of it here is a
    // floor to stop unlit stone going pure black, not a light source.
    // Held on `this` because buildDungeon re-tints them per theme: the
    // colour the shadows go is where a theme survives the torch.
    this.ambient = new THREE.AmbientLight(0x2b3038, 0.14);
    this.hemi = new THREE.HemisphereLight(0x39485e, 0x2a1d12, 0.22);
    this.scene.add(this.ambient, this.hemi);

    // What used to be "moonlight from the shaft" at 1.3, casting the
    // only shadows in the game. It stays as a faint cold rake that keeps
    // wall tops legible against the fog — the shadows now come from the
    // thing the party is actually carrying.
    const shaft = new THREE.DirectionalLight(0x8fa6c4, 0.16);
    shaft.position.set(-10, 20, 6);
    this.scene.add(shaft);

    // The party's torch: warm point light that travels with them, and
    // now the scene's key light and its only shadow caster. A point
    // shadow is a cube map, which would be a real cost in a busy scene;
    // this one is ~700 triangles and static between rooms, so it is not.
    this.torch = new THREE.PointLight(0xff9a3c, 30, 12, 1.8);
    this.torch.position.set(0, 2.2, 0);
    this.torch.castShadow = true;
    this.torch.shadow.mapSize.set(1024, 1024);
    this.torch.shadow.camera.near = 0.4;
    this.torch.shadow.bias = -0.004;
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

    // The performance (ui/Choreography.js). Party sprites used to be
    // rebuilt at the new room's slots every tick, which is why the
    // party never walked anywhere: there was nothing to move. Now they
    // are persistent actors keyed by name and *tweened* between slots,
    // down corridors and into lunges; the monster of the room being
    // fought is held on screen until the resolution beat says what
    // became of it; and its health bar is a sprite that ticks down a
    // round at a time.
    this.supportsBeats = true;
    this.actors = new Map();          // name → { sprite, base, cls, dead }
    this.tweens = [];
    this.held = null;                 // room index whose monster stays drawn
    this.monsterSprites = new Map();  // room index → sprite
    this.bar = null;                  // the held monster's health bar
    this.zoomBias = 0;                // the camera's per-beat push in or out
    this.zoomBiasTarget = 0;

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

  /**
   * Draw the state.
   *
   *   opts.perform — the performance will move the party itself: sync
   *                  the actors (new members appear) but do not snap
   *                  them to the room's slots, and keep the dead until
   *                  their fall beat plays.
   *   opts.hold    — room index whose monster must stay drawn even if
   *                  the state already says it is cleared.
   */
  render(state, opts = {}) {
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
      // A rebuilt dungeon has fresh floor positions; the actors stand on
      // the old ones until placed again
      this.actors.clear();
      this.partyGroup.clear();
    }

    if (opts.hold !== undefined && opts.hold !== null) this.held = opts.hold;
    this.updateIcons(state);
    this.updateOccupants(state);
    this.syncActors(state, { pruneDead: !opts.perform });
    if (!opts.perform) {
      const idx = state.currentRoomIndex ?? Math.min(state.roomIndex, rooms.length - 1);
      const room = rooms[idx];
      const facing = !!room && room.monster && !room.cleared && (room.type === 'monster' || room.type === 'boss');
      this.placeParty(idx, facing, state?.party?.formation || 'line', { ms: 0 });
      this.setZoomBias(0);
    }

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
    this.monsterSprites.clear();
    if (this.bar) { this.bar = null; }
    if (!this.atlasReady) return;
    const rooms = state.dungeon.rooms;
    const knownRooms = this.knownSet(state);

    rooms.forEach((room, i) => {
      if (room.secret && !room.discovered) return;
      const { x, y: fy, z } = this.roomPositions[i];
      const known = knownRooms.has(i) || room.type === 'boss';
      if (!known) return;

      let sprite = null;
      const heldHere = this.held === i;
      if ((room.type === 'monster' || room.type === 'boss') && room.monster && (!room.cleared || heldHere)) {
        const scale = room.type === 'boss' ? 1.7 : 1.05;
        // The monster holds its end of the room; the party gets the other
        const { mx, mz } = monsterSpot(room, x, z);
        sprite = this.tileSprite(getMonsterTile(room.monster.kind), scale);
        sprite.material = sprite.material.clone();   // its own tint, for the hit flash
        sprite.position.set(mx, fy + 0.2 + scale / 2, mz);
        sprite.userData.sway = true;
        sprite.userData.home = { x: mx, z: mz };
        sprite.userData.scale = scale;
        this.monsterSprites.set(i, sprite);
        if (heldHere) this.ensureBar(i, sprite, scale);

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
        if (!slot) return;
        // Art where the sheet has it, and the feature's own emoji as a
        // place marker where it does not. A hazard the player cannot see
        // is a hazard they cannot plan around, and waiting for pixel art
        // is not a reason to leave the floor empty.
        const fsprite = tile
          ? this.tileSprite(tile, 0.8)
          : this.emojiSprite(getFeature(fid)?.icon || '❔', 0.7);
        fsprite.position.set(slot.mx, fy + 0.58, slot.mz);
        fsprite.userData.baseY = fy + 0.58;
        fsprite.userData.phase = i * 1.1 + fi;
        // A brazier flickers; stone does not
        if (fid === 'brazier') fsprite.userData.sway = true;
        this.occupantGroup.add(fsprite);
      });
    });
  }

  /**
   * A sprite showing an emoji, sized like a tile sprite. The marker for
   * anything the Tiny Dungeon sheet has no art for.
   */
  emojiSprite(icon, scale = 0.8) {
    const sprite = new THREE.Sprite(this.getSpriteMaterial(icon));
    sprite.scale.set(scale, scale, 1);
    return sprite;
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
    // A re-fit mid-delve (the grid changed, the window did) keeps the
    // eye where it is: animateFrame reads the new aspect from lastW/H.
    // Only the first call builds the camera.
    if (this.camera) return;

    // Roughly two rooms and their corridors, top to bottom
    const aspect = w / h;
    const vertHalf = VIEW_HALF;
    this.camera = new THREE.OrthographicCamera(
      -vertHalf * aspect, vertHalf * aspect, vertHalf, -vertHalf, 0.1, 400
    );
    this.camera.position.set(CAM_BACK, CAM_BACK * CAM_RISE, CAM_BACK);
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
    // Frame the room the party is in, plus a margin, rather than a fixed
    // slab of dungeon: a boss cavern and a corridor need different eyes.
    const { hx, hz } = roomHalf(room);
    const zoomOut = Math.max(0, Math.max(hx, hz) + 2.2 - VIEW_HALF);
    // The camera follows the party down: it tracks the floor they stand
    // on, so the level below is not framed from the ceiling of the one above
    if (!this.camTarget) this.camTarget = new THREE.Vector3(x, y, z);
    this.camZoom = zoomOut;
    // A fight in progress keeps its aim (aimFight) until released
    if (this.camAim) this.camTarget.set(this.camAim.x, this.camAim.y, this.camAim.z);
    else this.camTarget.set(x, y, z);
  }

  /**
   * Put the eye where it is heading, now, instead of gliding there.
   *
   * The camera eases toward the room the party is in at 0.12 a frame,
   * which is right for watching a delve and wrong for photographing one:
   * a capture that fires before the glide finishes frames the previous
   * chamber, and if the tab is hidden — rAF throttled — it may never
   * finish at all. The capture harness calls this so a frame depends on
   * the scene and not on how many animation frames the browser felt like
   * granting (ui/Frames.js).
   */
  snapCamera() {
    if (!this.camera || !this.camTarget) return;
    this.camLook = this.camTarget.clone();
    this.camPlaced = false;    // animateFrame's "first frame snaps" path
    this.animateFrame();
  }

  buildDungeon(rooms, edges = null, themeId = 'delve', trapdoors = []) {
    this.staticGroup.clear();
    this.roomPositions = rooms.map(r => this.roomWorldPos(r));

    const palette = THEME_PALETTES[themeId] || DEFAULT_PALETTE;
    this.palette = palette;
    this.scene.background = new THREE.Color(palette.bg);
    this.scene.fog = new THREE.Fog(palette.bg, 34, 78);

    // The theme colours its own dark, not just its own stone
    if (this.hemi) {
      this.hemi.color.set(palette.fill ?? 0x39485e);
      this.hemi.groundColor.set(palette.ground ?? 0x2a1d12);
    }
    if (this.ambient) this.ambient.color.set(palette.fill ?? 0x2b3038);

    const hidden = room => room.secret && !room.discovered;
    const edgeList = edges || rooms.slice(1).map((_, i) => ({ a: i, b: i + 1, kind: 'door' }));
    const doors = doorMap(rooms, edgeList, hidden);
    const wallMat = new THREE.MeshStandardMaterial({ color: palette.wall, roughness: 1 });
    const secretWallMat = new THREE.MeshStandardMaterial({ color: palette.wall, roughness: 1 });

    // The two walls between the eye and the room are drawn as ghosts.
    //
    // The camera sits at +x, +z looking back at the chamber, so the
    // 'south' (+hz) and 'east' (+hx) runs stand in front of everything
    // that matters. At the old 36.6-degree eye that barely mattered —
    // you looked over them. At Ultima's 30 degrees a WALL_H of 1.15
    // hides 1.15/tan(30) ≈ 2.0 units of floor behind it, which is two
    // tiles of the chamber the party is standing in. Cutting the near
    // walls away is what U7 and U8 do; fading them keeps the room's
    // outline legible while letting the floor read through.
    //
    // They do not cast: a shadow from a wall you can see through reads
    // as a bug, and the torch is now the only caster (G2).
    const nearWallMat = new THREE.MeshStandardMaterial({
      color: palette.wall, roughness: 1,
      transparent: true, opacity: 0.26, depthWrite: false,
    });
    const NEAR_SIDES = new Set(['south', 'east']);

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
            const near = NEAR_SIDES.has(side.name);
            const mat = near
              ? nearWallMat
              : (sideDoors.some(dr => dr.secret) ? secretWallMat : wallMat);
            const seg = side.axis === 'x'
              ? new THREE.Mesh(new THREE.BoxGeometry(segLen, WALL_H, WALL_T), mat)
              : new THREE.Mesh(new THREE.BoxGeometry(WALL_T, WALL_H, segLen), mat);
            const mid = (from + to) / 2;
            if (side.axis === 'x') seg.position.set(x + mid, fy + WALL_H / 2, z + side.off);
            else seg.position.set(x + side.off, fy + WALL_H / 2, z + mid);
            seg.castShadow = !near;
            seg.renderOrder = near ? 2 : 0;
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

  /**
   * The actors: one persistent sprite (and class-coloured base disc) per
   * living member, keyed by name, so the performance can move them.
   * New members appear; the dead are pruned only when asked, because in
   * a performance they fall on their own beat (dropActor).
   */
  syncActors(state, { pruneDead = false } = {}) {
    const members = state.party.members;
    const names = new Set(members.map(m => m.name));
    for (const [name, actor] of this.actors) {
      const m = members.find(x => x.name === name);
      if (!m || (pruneDead && !m.alive)) {
        this.partyGroup.remove(actor.sprite);
        if (actor.base) this.partyGroup.remove(actor.base);
        this.actors.delete(name);
      }
    }
    for (const m of members) {
      if (!m.alive && !this.actors.has(m.name)) continue;
      let actor = this.actors.get(m.name);
      if (!actor) {
        actor = this.makeActor(m);
        this.actors.set(m.name, actor);
      }
      // Wounded: the sprite dims and shrinks a little, as before
      const wounded = m.alive && m.health / m.maxHealth <= 0.35;
      if (actor.sprite.isSprite && !actor.dead) {
        actor.sprite.material.color.set(wounded ? 0xb98080 : 0xffffff);
        actor.sprite.scale.y = actor.sprite.scale.x * (wounded ? 0.83 : 1);
      }
    }
    void names;
  }

  makeActor(m) {
    const actor = { name: m.name, cls: m.class, dead: false, base: null };
    if (this.atlasReady) {
      const sprite = this.tileSprite(getClassTile(m.class), 0.82);
      sprite.material = sprite.material.clone();
      sprite.userData.baseY = 0.72;
      sprite.userData.phase = this.actors.size * 1.7;
      actor.sprite = sprite;
      const base = new THREE.Mesh(this.baseGeo, this.baseMats[m.class] || this.baseMats.fighter);
      base.castShadow = true;
      actor.base = base;
      this.partyGroup.add(sprite, base);
    } else {
      const meeple = new THREE.Mesh(this.meepleGeo, this.meepleMats[m.class] || this.meepleMats.fighter);
      meeple.castShadow = true;
      meeple.userData.baseY = 0.55;
      meeple.userData.phase = this.actors.size * 1.7;
      actor.sprite = meeple;
      this.partyGroup.add(meeple);
    }
    return actor;
  }

  /** The living actors in marching order (fighters to the front). */
  livingActors() {
    const members = (this.lastState?.party?.members || []).filter(m => this.actors.has(m.name) && !this.actors.get(m.name).dead);
    return marchingOrder(members).map(m => this.actors.get(m.name));
  }

  /** Move an actor (sprite + base) to a floor position, now or over ms. */
  moveActor(actor, x, z, fy, ms = 0, delay = 0, onDone = null) {
    const y = fy + (actor.sprite.isSprite ? 0.72 : 0.55);
    const targets = [[actor.sprite, y]];
    if (actor.base) targets.push([actor.base, fy + 0.24]);
    for (const [obj, ty] of targets) {
      if (ms <= 0) {
        obj.position.set(x, ty, z);
        obj.userData.baseY = ty;
        continue;
      }
      const from = obj.position.clone();
      this.tweens.push({
        obj, ms, delay, start: this.clock.getElapsedTime() * 1000, onDone: obj === actor.sprite ? onDone : null,
        step: t => {
          obj.position.x = from.x + (x - from.x) * t;
          obj.position.z = from.z + (z - from.z) * t;
          obj.userData.baseY = ty;
        },
      });
    }
  }

  /**
   * Stand the party in the room in its formation. The torch goes with
   * them. `ms` 0 snaps (a capture, the first frame); otherwise the
   * actors step into their slots.
   */
  placeParty(roomIdx, facingMonster, formation = 'line', { ms = 0 } = {}) {
    const room = this.lastState?.dungeon?.rooms?.[roomIdx];
    const pos = this.roomPositions[roomIdx];
    if (!room || !pos) return;
    const { x, y: fy, z } = pos;

    // The torch has to light the whole chamber now, not a platform
    const reach = Math.max(roomHalf(room).hx, roomHalf(room).hz);
    this.torch.position.set(x, fy + 2.4, z);
    this.torch.distance = Math.max(12, reach * 3.4);
    this.torchBase = 24 + reach * 2.2;

    const actors = this.livingActors();
    const slots = partySlots(room, x, z, actors.length, facingMonster, formation);
    actors.forEach((actor, i) => {
      const { mx, mz } = slots[i];
      actor.slot = { x: mx, z: mz, fy };
      this.moveActor(actor, mx, mz, fy, ms, i * ms * 0.08);
    });
  }

  /**
   * Walk the party from one room to another: out through the doorway,
   * down the passage, in through the next, and into the slots there.
   * Rooms are placed by axis moves, so the centre-to-centre line runs
   * along the corridor. Staggered, so it reads as a file and not a
   * block sliding.
   */
  marchParty(fromIdx, toIdx, ms, { flee = false } = {}) {
    const rooms = this.lastState?.dungeon?.rooms || [];
    const a = this.roomPositions[fromIdx];
    const b = this.roomPositions[toIdx];
    const room = rooms[toIdx];
    if (!a || !b || !room) return;
    const facing = !flee && !!room.monster && (!room.cleared || this.held === toIdx)
      && (room.type === 'monster' || room.type === 'boss');
    const actors = this.livingActors();
    const slots = partySlots(room, b.x, b.z, actors.length, facing, this.lastState?.party?.formation || 'line');
    // The torch walks too
    this.tweens.push({
      obj: this.torch, ms, delay: 0, start: this.clock.getElapsedTime() * 1000,
      step: t => { this.torch.position.x = a.x + (b.x - a.x) * t; this.torch.position.z = a.z + (b.z - a.z) * t; },
    });
    const dx = b.x - a.x, dz = b.z - a.z;
    // Lateral offset keeps the file inside the corridor's width
    const across = Math.abs(dx) >= Math.abs(dz) ? { x: 0, z: 1 } : { x: 1, z: 0 };
    actors.forEach((actor, i) => {
      const { mx, mz } = slots[i];
      const side = ((i % 2) * 2 - 1) * 0.28;
      const p0 = actor.sprite.position.clone();
      const p1 = { x: a.x + across.x * side, z: a.z + across.z * side };
      const p2 = { x: b.x + across.x * side, z: b.z + across.z * side };
      const p3 = { x: mx, z: mz };
      actor.slot = { x: mx, z: mz, fy: b.y };
      this.pathActor(actor, [{ x: p0.x, z: p0.z }, p1, p2, p3], b.y, ms * (flee ? 0.9 : 0.88), i * ms * 0.07);
    });
  }

  /** Tween an actor along waypoints, time split by segment length. */
  pathActor(actor, points, fy, ms, delay = 0) {
    const lens = [];
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      const l = Math.hypot(points[i].x - points[i - 1].x, points[i].z - points[i - 1].z);
      lens.push(l); total += l;
    }
    if (total < 1e-3) { this.moveActor(actor, points.at(-1).x, points.at(-1).z, fy, 0); return; }
    const y = fy + (actor.sprite.isSprite ? 0.72 : 0.55);
    const at = t => {
      let d = t * total;
      for (let i = 0; i < lens.length; i++) {
        if (d <= lens[i] || i === lens.length - 1) {
          const u = lens[i] > 0 ? Math.min(1, d / lens[i]) : 1;
          return { x: points[i].x + (points[i + 1].x - points[i].x) * u, z: points[i].z + (points[i + 1].z - points[i].z) * u };
        }
        d -= lens[i];
      }
      return points.at(-1);
    };
    const objs = [[actor.sprite, y]];
    if (actor.base) objs.push([actor.base, fy + 0.24]);
    for (const [obj, ty] of objs) {
      this.tweens.push({
        obj, ms, delay, start: this.clock.getElapsedTime() * 1000, linear: true,
        step: t => { const p = at(t); obj.position.x = p.x; obj.position.z = p.z; obj.userData.baseY = ty; },
      });
    }
  }

  /** The front rank steps in at the monster and back: the swing. */
  lungeFront(roomIdx, names, ms) {
    const room = this.lastState?.dungeon?.rooms?.[roomIdx];
    const pos = this.roomPositions[roomIdx];
    if (!room || !pos) return;
    const { mx, mz } = monsterSpot(room, pos.x, pos.z);
    for (const name of names) {
      const actor = this.actors.get(name);
      if (!actor || actor.dead || !actor.slot) continue;
      const { x, z, fy } = actor.slot;
      const dx = mx - x, dz = mz - z;
      const len = Math.hypot(dx, dz) || 1;
      const reach = Math.min(0.6, len * 0.55);
      const tx = x + dx / len * reach, tz = z + dz / len * reach;
      this.moveActor(actor, tx, tz, fy, ms * 0.45, 0);
      this.moveActor(actor, x, z, fy, ms * 0.55, ms * 0.45);
    }
  }

  /** The monster's counter-blow: it lunges, the front rank recoils. */
  monsterStrike(roomIdx, names, text, ms) {
    const sprite = this.monsterSprites.get(roomIdx);
    const pos = this.roomPositions[roomIdx];
    if (!sprite || !pos) return;
    const home = sprite.userData.home;
    const dx = pos.x - home.x, dz = pos.z - home.z;
    const len = Math.hypot(dx, dz) || 1;
    const tx = home.x + dx / len * 0.5, tz = home.z + dz / len * 0.5;
    const now = this.clock.getElapsedTime() * 1000;
    this.tweens.push({ obj: sprite, ms: ms * 0.4, delay: 0, start: now, step: t => { sprite.position.x = home.x + (tx - home.x) * t; sprite.position.z = home.z + (tz - home.z) * t; } });
    this.tweens.push({ obj: sprite, ms: ms * 0.6, delay: ms * 0.4, start: now, step: t => { sprite.position.x = tx + (home.x - tx) * t; sprite.position.z = tz + (home.z - tz) * t; } });
    let shown = false;
    for (const name of names) {
      const actor = this.actors.get(name);
      if (!actor || actor.dead || !actor.slot) continue;
      const { x, z, fy } = actor.slot;
      const bx = x - dx / len * 0.3, bz = z - dz / len * 0.3;
      this.moveActor(actor, bx, bz, fy, ms * 0.3, ms * 0.35);
      this.moveActor(actor, x, z, fy, ms * 0.4, ms * 0.65);
      this.flash(actor.sprite, 0xff6a5a, 160, ms * 0.35);
      if (!shown && text) { this.floatText(x, fy + 1.3, z, text, '#ff7a6a', ms * 0.35); shown = true; }
    }
  }

  /** The monster takes the round's damage: flash, bar, number. */
  monsterHit(roomIdx, frac, text, phased = false) {
    const sprite = this.monsterSprites.get(roomIdx);
    if (!sprite) return;
    this.flash(sprite, 0xffffff, 140);
    if (this.bar && this.bar.room === roomIdx) this.setBar(frac);
    const p = sprite.position;
    if (text) this.floatText(p.x, p.y + 0.5, p.z, text, phased ? '#ffb347' : '#ffe9a0');
    if (phased) {
      sprite.userData.swayFast = true;
      this.floatText(p.x, p.y + 1.0, p.z, 'it turns', '#ff8a3c', 200);
    }
  }

  /** A mid-fight heal lands on somebody. */
  healActor(name, text) {
    const actor = this.actors.get(name);
    if (!actor || actor.dead) return;
    this.flash(actor.sprite, 0x8dffb0, 220);
    const p = actor.sprite.position;
    this.floatText(p.x, p.y + 0.5, p.z, text, '#8dffb0');
  }

  /** The monster falls: it tips, fades and is gone; the bar with it. */
  monsterFall(roomIdx, ms) {
    const sprite = this.monsterSprites.get(roomIdx);
    if (!sprite) { this.releaseHold(); return; }
    const sy = sprite.scale.y, sx = sprite.scale.x;
    const baseY = sprite.userData.baseY;
    sprite.userData.sway = false;
    this.tweens.push({
      obj: sprite, ms: ms * 0.7, delay: 0, start: this.clock.getElapsedTime() * 1000,
      step: t => {
        sprite.scale.y = sy * (1 - t * 0.9);
        sprite.scale.x = sx * (1 + t * 0.25);
        sprite.position.y = baseY - t * sy * 0.45;
        sprite.material.opacity = 1 - t;
      },
      onDone: () => {
        this.occupantGroup.remove(sprite);
        this.monsterSprites.delete(roomIdx);
        this.releaseHold();
      },
    });
    if (this.bar && this.bar.room === roomIdx) {
      const bar = this.bar.sprite;
      this.tweens.push({ obj: bar, ms: ms * 0.5, delay: 0, start: this.clock.getElapsedTime() * 1000, step: t => { bar.material.opacity = 1 - t; } });
    }
  }

  /** The party slips past: the monster stays, dimmed. */
  monsterFade(roomIdx, ms) {
    const sprite = this.monsterSprites.get(roomIdx);
    if (sprite) {
      this.tweens.push({ obj: sprite, ms, delay: 0, start: this.clock.getElapsedTime() * 1000, step: t => { sprite.material.opacity = 1 - t * 0.6; } });
    }
    this.releaseHold();
  }

  holdRoom(idx) { this.held = idx; }

  releaseHold() {
    this.held = null;
    if (this.bar) {
      this.occupantGroup.remove(this.bar.sprite);
      this.bar = null;
    }
  }

  /** A fallen actor drops where they stand and stays as a marker. */
  dropActor(name, ms) {
    const actor = this.actors.get(name);
    if (!actor || actor.dead) return;
    actor.dead = true;
    const sprite = actor.sprite;
    const sy = sprite.scale.y;
    const baseY = sprite.userData.baseY ?? sprite.position.y;
    this.tweens.push({
      obj: sprite, ms: ms * 0.6, delay: 0, start: this.clock.getElapsedTime() * 1000,
      step: t => {
        sprite.scale.y = sy * (1 - t * 0.8);
        sprite.position.y = baseY - t * sy * 0.4;
        if (sprite.material?.color) sprite.material.color.setRGB(1 - t * 0.55, 1 - t * 0.7, 1 - t * 0.7);
        if (sprite.material) sprite.material.opacity = 1 - t * 0.45;
      },
      onDone: () => { sprite.userData.baseY = undefined; },   // no more bob
    });
    this.flash(sprite, 0xff4040, 200);
  }

  /** Tint a sprite for a moment. */
  flash(sprite, color, ms, delay = 0) {
    if (!sprite?.material?.color) return;
    const original = sprite.material.color.clone();
    this.tweens.push({
      obj: sprite, ms, delay, start: this.clock.getElapsedTime() * 1000,
      step: t => { sprite.material.color.copy(original).lerp(new THREE.Color(color), t < 0.5 ? 1 : (1 - t) * 2); },
      onDone: () => sprite.material.color.copy(original),
    });
  }

  /** A number rises off a point and fades. */
  floatText(x, y, z, text, color = '#ffe9a0', delay = 0) {
    const sprite = new THREE.Sprite(this.textMaterial(text, color));
    sprite.scale.set(1.1, 0.55, 1);
    sprite.position.set(x, y, z);
    sprite.visible = delay <= 0;
    this.fxGroup.add(sprite);
    this.effects.push({ sprite, born: this.clock.getElapsedTime() + delay / 1000, life: 0.9, kind: 'float', y0: y });
  }

  textMaterial(text, color) {
    const key = `txt:${color}:${text}`;
    if (!this.spriteMaterials.has(key)) {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 128;
      const ctx = c.getContext('2d');
      ctx.font = 'bold 72px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(0,0,0,0.85)';
      ctx.strokeText(text, 128, 66);
      ctx.fillStyle = color;
      ctx.fillText(text, 128, 66);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      this.spriteMaterials.set(key, new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    }
    return this.spriteMaterials.get(key).clone();
  }

  /** The held monster's health bar, a sprite above its head. */
  ensureBar(roomIdx, monster, scale) {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 16;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.magFilter = THREE.NearestFilter;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    sprite.scale.set(1.3, 0.16, 1);
    sprite.position.set(monster.position.x, monster.position.y + scale / 2 + 0.18, monster.position.z);
    this.occupantGroup.add(sprite);
    this.bar = { room: roomIdx, sprite, canvas: c, ctx: c.getContext('2d'), tex };
    this.setBar(1);
  }

  setBar(frac) {
    if (!this.bar) return;
    const { ctx, canvas, tex } = this.bar;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = frac > 0.5 ? '#c84c3c' : frac > 0.25 ? '#e0803a' : '#f0c040';
    ctx.fillRect(2, 2, Math.max(0, (canvas.width - 4) * Math.max(0, Math.min(1, frac))), canvas.height - 4);
    tex.needsUpdate = true;
  }

  /** Finish every tween now — the performance moved on. */
  settle() {
    const now = this.clock.getElapsedTime() * 1000;
    for (const tw of this.tweens) {
      // Only tweens that should have finished by now; a lunge that has
      // not started yet keeps its cue
      if (now - tw.start - tw.delay >= tw.ms) { tw.step(1); tw.onDone?.(); tw.done = true; }
    }
    this.tweens = this.tweens.filter(tw => !tw.done);
  }

  /** Push the eye in (negative) or out (positive) for a beat. */
  setZoomBias(v) { this.zoomBiasTarget = v; }

  /**
   * Frame a fight: aim between the party's slots and the monster's end,
   * and pull in. A boss cavern is framed wide by focusOn because it is
   * big; the fight in it happens across three tiles, and that is what
   * the eye should be on (SCREENS.md S5).
   */
  aimFight(roomIdx) {
    const room = this.lastState?.dungeon?.rooms?.[roomIdx];
    const pos = this.roomPositions[roomIdx];
    if (!room || !pos || !this.camTarget) return;
    const { mx, mz } = monsterSpot(room, pos.x, pos.z);
    const actors = this.livingActors().filter(a => a.slot);
    const px = actors.length ? actors.reduce((s, a) => s + a.slot.x, 0) / actors.length : pos.x;
    const pz = actors.length ? actors.reduce((s, a) => s + a.slot.z, 0) / actors.length : pos.z;
    this.camAim = { x: (mx + px) / 2, y: pos.y, z: (mz + pz) / 2 };
    this.camTarget.set(this.camAim.x, this.camAim.y, this.camAim.z);
    // Close enough that four sprites and a monster fill the frame; the
    // room's own zoom-out is cancelled, whatever its size
    this.zoomBiasTarget = -(this.camZoom || 0) - (room.type === 'boss' ? 0.6 : 1.4);
  }

  releaseAim() {
    this.camAim = null;
    this.zoomBiasTarget = 0;
    if (this.lastState) {
      const rooms = this.lastState.dungeon.rooms;
      const idx = this.lastState.currentRoomIndex ?? Math.min(this.lastState.roomIndex, rooms.length - 1);
      this.focusOn(rooms[idx]);
    }
  }

  /** Re-fit the canvas after a layout change, without re-placing anyone. */
  refit() {
    this.lastW = null;
    if (this.lastState) this.resize(this.lastState.dungeon.rooms);
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
    // Steel lands on the thing it hit, not the middle of the floor
    const target = this.monsterSprites.get(roomIndex);
    if (target && style.kind === 'slash') sprite.position.set(target.position.x, target.position.y + 0.1, target.position.z);
    else sprite.position.set(x, fy + 1.0, z);
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
    // The canvas follows the grid; the buffer follows the canvas
    if (this.lastState && (this.canvas.clientWidth !== this.lastW || this.canvas.clientHeight !== this.lastH)) {
      this.resize(this.lastState.dungeon.rooms);
    }
    const t = this.clock.getElapsedTime();

    // Glide the camera to the room the party is in
    if (this.camTarget) {
      const back = CAM_BACK + (this.camZoom || 0) * 2;
      const want = new THREE.Vector3(
        this.camTarget.x + back, this.camTarget.y + back * CAM_RISE, this.camTarget.z + back
      );
      // First frame snaps; after that it eases
      const ease = this.camPlaced ? 0.12 : 1;
      this.camPlaced = true;
      this.camera.position.lerp(want, ease);
      if (!this.camLook) this.camLook = this.camTarget.clone();
      this.camLook.lerp(this.camTarget, ease);
      this.camera.lookAt(this.camLook);
      // The per-beat push: in on a fight, out on a throne room (SCREENS.md S5)
      this.zoomBias += (this.zoomBiasTarget - this.zoomBias) * 0.08;
      const zoom = Math.max(3.5, VIEW_HALF + (this.camZoom || 0) + this.zoomBias);
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
    // The performance's tweens: positions, tints, falls
    const nowMs = t * 1000;
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const tw = this.tweens[i];
      const u = (nowMs - tw.start - tw.delay) / tw.ms;
      if (u < 0) continue;
      const k = Math.min(1, u);
      tw.step(tw.linear ? k : 1 - (1 - k) * (1 - k));
      if (k >= 1) { tw.onDone?.(); this.tweens.splice(i, 1); }
    }
    // Party bob (they shift their feet, waiting)
    for (const m of this.partyGroup.children) {
      if (m.userData.baseY !== undefined) {
        m.position.y = m.userData.baseY + Math.abs(Math.sin(t * 2.2 + m.userData.phase)) * 0.05;
      }
    }
    // Monsters sway; props hold still; a turned boss shakes
    for (const o of this.occupantGroup.children) {
      if (o.userData.sway) {
        const rate = o.userData.swayFast ? 7 : 2.8;
        o.position.y = o.userData.baseY + Math.sin(t * rate + o.userData.phase) * 0.07;
      }
    }
    // Effects bloom and die; numbers rise and fade
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const fx = this.effects[i];
      const age = (t - fx.born) / fx.life;
      if (age < 0) { fx.sprite.visible = false; continue; }
      fx.sprite.visible = true;
      if (age >= 1) {
        this.fxGroup.remove(fx.sprite);
        this.effects.splice(i, 1);
        continue;
      }
      if (fx.kind === 'float') {
        fx.sprite.position.y = fx.y0 + age * 0.9;
        fx.sprite.material.opacity = age < 0.15 ? age / 0.15 : 1 - ((age - 0.15) / 0.85) ** 2;
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
