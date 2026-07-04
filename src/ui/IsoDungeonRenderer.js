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

const SPACING = 3.2;   // World units between room centers
const CLASS_COLORS = {
  fighter: 0xc84c3c,
  cleric: 0xe8d48a,
  wizard: 0x7a5ae8,
  rogue: 0x4a8a5c,
  alchemist: 0x3cb8a8,
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

    this.staticGroup = new THREE.Group();  // Platforms, walkways — built once per dungeon
    this.iconGroup = new THREE.Group();    // Room icon sprites — updated per tick
    this.partyGroup = new THREE.Group();   // Meeples — updated per tick
    this.scene.add(this.staticGroup, this.iconGroup, this.partyGroup);

    this.spriteMaterials = new Map();
    this.builtKey = null;
    this.roomPositions = [];
    this.clock = new THREE.Clock();

    this.meepleGeo = new THREE.CapsuleGeometry(0.16, 0.26, 4, 10);
    this.meepleMats = {};
    for (const [cls, color] of Object.entries(CLASS_COLORS)) {
      this.meepleMats[cls] = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
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

    const key = rooms.map(r => r.type).join(',');
    if (this.builtKey !== key) {
      this.buildDungeon(rooms);
      this.builtKey = key;
    }

    this.updateIcons(rooms, state.roomIndex);
    this.updateParty(state);
    this.animateFrame();
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

  buildDungeon(rooms) {
    this.staticGroup.clear();
    this.roomPositions = rooms.map(r => this.roomWorldPos(r));

    const platGeo = new THREE.BoxGeometry(2.4, 0.35, 2.4);
    const bossGeo = new THREE.BoxGeometry(3.1, 0.5, 3.1);

    rooms.forEach((room, i) => {
      const { x, z } = this.roomPositions[i];

      // Stone platform with hand-laid shade variance
      const shade = ((room.index * 7) % 5 - 2) * 0.02;
      const base = room.type === 'boss' ? 0x5a2626 : 0x615b52;
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
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x35322c, roughness: 1 });
      const wall1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 0.2), wallMat);
      wall1.position.set(x, 0.5, z - 1.15);
      wall1.castShadow = true;
      this.staticGroup.add(wall1);
      const wall2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 2.4), wallMat);
      wall2.position.set(x - 1.15, 0.5, z);
      wall2.castShadow = true;
      this.staticGroup.add(wall2);

      // Walkway to the next room
      if (i < rooms.length - 1) {
        const next = this.roomWorldPos(rooms[i + 1]);
        const dx = next.x - x;
        const dz = next.z - z;
        const len = Math.sqrt(dx * dx + dz * dz);
        const bridge = new THREE.Mesh(
          new THREE.BoxGeometry(len, 0.18, 0.8),
          new THREE.MeshStandardMaterial({ color: 0x3d3a33, roughness: 1 })
        );
        bridge.position.set(x + dx / 2, -0.02, z + dz / 2);
        bridge.rotation.y = -Math.atan2(dz, dx);
        bridge.receiveShadow = true;
        this.staticGroup.add(bridge);
      }
    });
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

  updateIcons(rooms, roomIndex) {
    this.iconGroup.clear();
    rooms.forEach((room, i) => {
      const { x, z } = this.roomPositions[i];
      const visited = i < roomIndex || room.cleared;
      const known = i <= roomIndex + 1 || room.type === 'boss';
      const icon = known ? room.icon : '❓';

      const sprite = new THREE.Sprite(this.getSpriteMaterial(icon));
      const scale = room.type === 'boss' ? 1.5 : 1.0;
      sprite.scale.set(scale, scale, 1);
      sprite.position.set(x, 1.35, z);
      sprite.material = sprite.material.clone();
      sprite.material.opacity = visited && i !== roomIndex ? 0.28 : 1;
      sprite.userData.baseY = 1.35;
      sprite.userData.phase = i;
      this.iconGroup.add(sprite);
    });
  }

  updateParty(state) {
    this.partyGroup.clear();
    const idx = Math.min(state.roomIndex, state.dungeon.rooms.length - 1);
    const { x, z } = this.roomPositions[idx] || { x: 0, z: 0 };

    // Torch travels with the party
    this.torch.position.set(x, 2.2, z);

    const living = state.party.members.filter(m => m.alive);
    const n = living.length;
    living.forEach((m, i) => {
      // Ring formation on the platform
      const angle = (i / Math.max(1, n)) * Math.PI * 2;
      const r = n > 1 ? Math.min(0.75, 0.3 + n * 0.05) : 0;
      const mx = x + Math.cos(angle) * r;
      const mz = z + Math.sin(angle) * r;

      const meeple = new THREE.Mesh(
        this.meepleGeo,
        this.meepleMats[m.class] || this.meepleMats.fighter
      );
      meeple.position.set(mx, 0.55, mz);
      meeple.castShadow = true;
      meeple.userData.baseY = 0.55;
      meeple.userData.phase = i * 1.7;
      // Wounded meeples slump
      if (m.health / m.maxHealth <= 0.35) {
        meeple.scale.y = 0.75;
        meeple.material = meeple.material.clone();
        meeple.material.color.offsetHSL(0, -0.2, -0.1);
      }
      this.partyGroup.add(meeple);
    });
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
    // Meeple bob (they shift their feet, waiting)
    for (const m of this.partyGroup.children) {
      m.position.y = m.userData.baseY + Math.abs(Math.sin(t * 2.2 + m.userData.phase)) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.renderer.dispose();
  }
}
