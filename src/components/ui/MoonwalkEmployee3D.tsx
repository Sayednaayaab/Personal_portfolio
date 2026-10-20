import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * A 3D office worker in an all-black suit, shirt, tie, shoes and briefcase, rigged as a bone
 * hierarchy (pelvis, spine, chest, neck, head, shoulders, elbows, hips, knees, ankles) and
 * animated procedurally with two-bone IK. The character faces left and glides right.
 *
 * Moonwalk mechanics:
 *  - Both feet stay on the floor at all times; no foot is ever lifted.
 *  - One foot is flat and slides backwards under the hips (smooth, ~2x body speed).
 *  - The other foot is on the ball with the heel raised ~35 degrees and the knee bent forward.
 *    It is locked to the floor: relative to the pelvis it moves forward by exactly the distance
 *    the body travels, so it never skates.
 *  - The swap is a quick snap (~15% of the half cycle): the raised heel drops flat while the
 *    other heel pops up.
 *  - The gait phase is distance / stride, never elapsed time, so the feet match the body at any speed.
 *  - Hips barely bob (<1% of height) and sway toward the bent leg, the torso leans forward ~6
 *    degrees, the head stays level, and the arms swing as small loose pendulums out of phase
 *    with the legs. The briefcase and tie lag behind with spring inertia.
 *  - When progress stalls the figure settles into a flat-footed weight-shift idle; at the end it
 *    finishes the current stride and rises onto its toes with a hand to the lapel.
 *
 * The scene is one wide transparent canvas laid over the loading bar. 1 world unit = 1 px.
 */

interface MoonwalkEmployee3DProps {
  /** Loading progress, 0 to 100 (any update rate; the character interpolates) */
  progress: number;
  /** Where along the canvas the bar starts and how wide it is, in CSS px */
  trackStart: number;
  trackWidth: number;
  /** Height of the character in CSS px */
  figureHeight: number;
  /** Camera turn towards the viewer in radians (0.38 by default); used for validation views */
  yaw?: number;
  /** Records foot positions on window.__walkerSamples for animation validation */
  debug?: boolean;
  /** Static standing pose that just slides with the bar (prefers-reduced-motion) */
  reducedMotion?: boolean;
  /** Called when WebGL is unavailable so the caller can show a fallback */
  onFail?: () => void;
}

// Gait tuning (lengths are fractions of the figure's height)
const STRIDE = 0.12; // half a step: each foot travels 2 x STRIDE relative to the pelvis per step
const LEG = 0.245; // thigh and shin length
const ANKLE_H = 0.04; // ankle height above the sole
const BALL = 0.09; // ankle to ball of the foot
const HEEL = 0.61; // ~35 degrees: heel-up pitch of the weight-bearing foot, in radians
const TOE_STAND = 0.85; // both heels up for the finishing pose
const SWAP = 0.15; // fraction of a half cycle the heel swap takes (quick snap)
const TAU = Math.PI * 2;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Leg {
  hip: THREE.Group;
  knee: THREE.Group;
  ankle: THREE.Group;
  side: 1 | -1;
  ballMarker: THREE.Object3D;
}

interface Arm {
  shoulder: THREE.Group;
  elbow: THREE.Group;
  side: 1 | -1;
}

function buildEmployee() {
  // Everything the character wears is black: jacket, trousers, shirt, tie, shoes and briefcase.
  // Slightly different black tones and surface finishes keep the pieces readable.
  const suit = new THREE.MeshPhysicalMaterial({
    color: 0x0d0e11,
    roughness: 0.5,
    metalness: 0.04,
    sheen: 0.6,
    sheenColor: new THREE.Color(0x4a4d57),
    sheenRoughness: 0.5,
    clearcoat: 0.1,
  });
  const trousers = new THREE.MeshPhysicalMaterial({ color: 0x0a0b0d, roughness: 0.6, sheen: 0.5, sheenColor: new THREE.Color(0x40434c) });
  const shirt = new THREE.MeshStandardMaterial({ color: 0x17181c, roughness: 0.5 });
  const tie = new THREE.MeshStandardMaterial({ color: 0x050607, roughness: 0.3, metalness: 0.1 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xdfae88, roughness: 0.62 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x15100c, roughness: 0.7 });
  const shoe = new THREE.MeshPhysicalMaterial({ color: 0x07080b, roughness: 0.14, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.05 });
  const leather = new THREE.MeshPhysicalMaterial({ color: 0x0c0d10, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3 });
  const brass = new THREE.MeshStandardMaterial({ color: 0x2b2d33, roughness: 0.3, metalness: 0.9 }); // dark steel clasps
  const dark = new THREE.MeshStandardMaterial({ color: 0x05060a, roughness: 0.5 });
  const materials = [suit, trousers, shirt, tie, skin, hairMat, shoe, leather, brass, dark];

  const box = (w: number, h: number, d: number, r: number, mat: THREE.Material) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), mat);
  const capsule = (r: number, len: number, mat: THREE.Material) => new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 14), mat);
  const sphere = (r: number, mat: THREE.Material) => new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), mat);

  const root = new THREE.Group();
  const pelvis = new THREE.Group();
  root.add(pelvis);
  pelvis.add(box(0.2, 0.1, 0.125, 0.04, trousers));

  // Legs
  const legs: Leg[] = [];
  for (const side of [1, -1] as const) {
    const hip = new THREE.Group();
    hip.position.set(side * 0.052, -0.03, 0);
    const thigh = capsule(0.047, LEG - 0.094, trousers);
    thigh.position.y = -LEG / 2;
    hip.add(thigh);

    const knee = new THREE.Group();
    knee.position.y = -LEG;
    hip.add(knee);
    knee.add(sphere(0.04, trousers));
    const shin = capsule(0.04, LEG - 0.08, trousers);
    shin.position.y = -LEG / 2;
    knee.add(shin);

    const ankle = new THREE.Group();
    ankle.position.y = -LEG;
    knee.add(ankle);
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.039, 0.044, 0.05, 16), trousers);
    cuff.position.y = 0.012;
    ankle.add(cuff);
    const shoeBody = box(0.07, 0.052, 0.196, 0.024, shoe);
    shoeBody.position.set(0, -0.016, 0.05);
    ankle.add(shoeBody);
    const sole = box(0.072, 0.012, 0.2, 0.005, dark);
    sole.position.set(0, -0.036, 0.05);
    ankle.add(sole);

    // Marker at the ball of the foot, used to validate floor contact
    const ballMarker = new THREE.Object3D();
    ballMarker.position.set(0, -ANKLE_H, BALL);
    ankle.add(ballMarker);

    pelvis.add(hip);
    legs.push({ hip, knee, ankle, side, ballMarker });
  }

  // Spine, chest and jacket
  const spine = new THREE.Group();
  spine.position.y = 0.04;
  pelvis.add(spine);
  const waist = box(0.235, 0.14, 0.135, 0.05, suit);
  waist.position.y = 0.06;
  spine.add(waist);

  const chest = new THREE.Group();
  chest.position.y = 0.13;
  spine.add(chest);
  const chestMesh = box(0.3, 0.23, 0.155, 0.065, suit);
  chestMesh.position.y = 0.085;
  chest.add(chestMesh);
  // White shirt front and a slim teal tie, matching the site's accent
  const shirtFront = box(0.075, 0.2, 0.012, 0.004, shirt);
  shirtFront.position.set(0, 0.075, 0.074);
  chest.add(shirtFront);
  // The tie hangs from its knot so it can swing with the body's momentum
  const tiePivot = new THREE.Group();
  tiePivot.position.set(0, 0.165, 0.082);
  chest.add(tiePivot);
  const tieMesh = box(0.022, 0.19, 0.012, 0.004, tie);
  tieMesh.position.set(0, -0.098, 0.001);
  tiePivot.add(tieMesh);
  const knot = box(0.03, 0.03, 0.016, 0.006, tie);
  knot.position.set(0, -0.004, 0.001);
  tiePivot.add(knot);
  for (const side of [1, -1]) {
    const lapel = box(0.04, 0.17, 0.012, 0.004, suit);
    lapel.position.set(side * 0.055, 0.075, 0.078);
    lapel.rotation.z = side * -0.18;
    chest.add(lapel);
  }

  // Neck and head
  const neck = new THREE.Group();
  neck.position.y = 0.2;
  chest.add(neck);
  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.03, 0.05, 14), skin);
  neckMesh.position.y = 0.01;
  neck.add(neckMesh);
  const collar = box(0.075, 0.02, 0.07, 0.008, shirt);
  collar.position.y = -0.008;
  neck.add(collar);

  const head = new THREE.Group();
  head.position.y = 0.045;
  neck.add(head);
  const skull = sphere(0.058, skin);
  skull.scale.set(0.96, 1.14, 1.05);
  skull.position.y = 0.055;
  head.add(skull);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.0615, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.56), hairMat);
  hair.scale.set(0.97, 1.14, 1.07);
  hair.position.set(0, 0.058, -0.004);
  hair.rotation.x = -0.18;
  head.add(hair);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.009, 0.022, 10), skin);
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, 0.046, 0.066);
  head.add(nose);
  for (const side of [1, -1]) {
    const eye = sphere(0.0062, dark);
    eye.position.set(side * 0.021, 0.063, 0.057);
    head.add(eye);
    const ear = sphere(0.012, skin);
    ear.scale.set(0.5, 1, 0.8);
    ear.position.set(side * 0.056, 0.052, -0.002);
    head.add(ear);
  }
  const mouth = box(0.026, 0.004, 0.006, 0.002, dark);
  mouth.position.set(0, 0.024, 0.058);
  head.add(mouth);

  // Arms. The +x arm (nearest the camera) carries the briefcase.
  const arms: Arm[] = [];
  let caseSwing!: THREE.Group;
  for (const side of [1, -1] as const) {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.158, 0.17, 0);
    chest.add(shoulder);
    shoulder.add(sphere(0.037, suit));
    const upper = capsule(0.03, 0.095, suit);
    upper.position.y = -0.0775;
    shoulder.add(upper);

    const elbow = new THREE.Group();
    elbow.position.y = -0.155;
    shoulder.add(elbow);
    elbow.add(sphere(0.028, suit));
    const fore = capsule(0.026, 0.09, suit);
    fore.position.y = -0.073;
    elbow.add(fore);
    const cuffShirt = new THREE.Mesh(new THREE.CylinderGeometry(0.0235, 0.0235, 0.012, 12), shirt);
    cuffShirt.position.y = -0.138;
    elbow.add(cuffShirt);

    const hand = new THREE.Group();
    hand.position.y = -0.148;
    elbow.add(hand);
    const palm = box(0.034, 0.06, 0.03, 0.012, skin);
    palm.position.y = -0.03;
    hand.add(palm);
    const thumb = capsule(0.008, 0.025, skin);
    thumb.position.set(0, -0.03, 0.02);
    thumb.rotation.x = 0.4;
    hand.add(thumb);

    if (side === 1) {
      caseSwing = new THREE.Group();
      caseSwing.position.y = -0.05;
      hand.add(caseSwing);
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.006, 8, 20, Math.PI), leather);
      handle.rotation.y = Math.PI / 2;
      handle.position.y = -0.03;
      handle.scale.set(1, 0.9, 1);
      caseSwing.add(handle);
      const body = box(0.058, 0.165, 0.235, 0.012, leather);
      body.position.y = -0.125;
      caseSwing.add(body);
      for (const z of [-0.06, 0.06]) {
        const clasp = box(0.01, 0.018, 0.026, 0.003, brass);
        clasp.position.set(0.03, -0.065, z);
        caseSwing.add(clasp);
      }
      const seam = box(0.062, 0.004, 0.236, 0.001, dark);
      seam.position.y = -0.085;
      caseSwing.add(seam);
    }
    arms.push({ shoulder, elbow, side });
  }

  return { root, pelvis, spine, chest, neck, head, legs, arms, caseSwing, tiePivot, materials };
}

export default function MoonwalkEmployee3D({ progress, trackStart, trackWidth, figureHeight, yaw = 0.38, debug = false, reducedMotion = false, onFail }: MoonwalkEmployee3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // The render loop reads these every frame without restarting the scene
  const live = useRef({ progress, trackStart, trackWidth, figureHeight, yaw, reducedMotion });
  live.current = { progress, trackStart, trackWidth, figureHeight, yaw, reducedMotion };
  const failRef = useRef(onFail);
  failRef.current = onFail;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      failRef.current?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.55;

    // Cinematic lighting: soft key, teal rim from behind, blue fill
    const key = new THREE.DirectionalLight(0xfff3e6, 3.0);
    key.position.set(-1.5, 2.4, 2.6);
    const rim = new THREE.DirectionalLight(0x19e6cf, 3.2);
    rim.position.set(2.2, 1.4, -2);
    const fill = new THREE.DirectionalLight(0x3d7bf0, 0.9);
    fill.position.set(2.5, 0.6, 2);
    scene.add(key, rim, fill, new THREE.AmbientLight(0x1b2540, 0.6));

    const rig = buildEmployee();
    rig.caseSwing.visible = false; // no briefcase
    const figure = new THREE.Group();
    figure.add(rig.root);
    // Face left (the direction of the "walk") and turn a little towards the camera
    rig.root.rotation.y = -Math.PI / 2 + live.current.yaw;
    scene.add(figure);

    // Soft pool of light under the character
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = glowCanvas.height = 128;
    const gctx = glowCanvas.getContext('2d')!;
    const gg = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gg.addColorStop(0, 'rgba(25,230,207,0.8)');
    gg.addColorStop(0.45, 'rgba(61,123,240,0.3)');
    gg.addColorStop(1, 'rgba(61,123,240,0)');
    gctx.fillStyle = gg;
    gctx.fillRect(0, 0, 128, 128);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    glow.rotation.x = -Math.PI / 2;
    scene.add(glow);

    const camera = new THREE.PerspectiveCamera(20, 1, 10, 4000);
    const CAM_DIST = 1300;
    let width = 0;
    let height = 0;
    const FLOOR_Y = 2;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = (2 * Math.atan(height / 2 / CAM_DIST) * 180) / Math.PI;
      camera.position.set(width / 2, height / 2, CAM_DIST);
      camera.lookAt(width / 2, height / 2, 0);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // ---- Animation state ----
    const state = {
      x: -1, vx: 0, theta: 0, move: 0, end: 0, prevP: 0, skipped: false, endTheta: 0, endLocked: false,
      hipY: 0.545, prevHipY: 0.545,
      caseAngle: 0, caseVel: 0, prevArm: 0, tieAngle: 0, tieVel: 0,
      farArm: 0, farVel: 0, nearArm: 0, nearVel: 0,
    };
    let lastTime = 0;
    let frameId = 0;

    // Critically damped follow (smooth acceleration and deceleration, no overshoot)
    const smoothDamp = (current: number, target: number, vel: number, smoothTime: number, dt: number) => {
      const omega = 2 / smoothTime;
      const ex = omega * dt;
      const decay = 1 / (1 + ex + 0.48 * ex * ex + 0.235 * ex * ex * ex);
      const change = current - target;
      const temp = (vel + omega * change) * dt;
      return { value: target + (change + temp) * decay, vel: (vel - omega * temp) * decay };
    };

    // A loose pendulum: damped spring chasing a target angle
    const spring = (angle: number, vel: number, target: number, k: number, c: number, dt: number) => {
      const steps = 2;
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        vel += ((target - angle) * k - vel * c) * h;
        angle += vel * h;
      }
      return { angle, vel };
    };

    /**
     * Foot target for one leg at gait phase `phi`; both feet always touch the floor.
     * [0, PI): weight-bearing on the ball of the foot, heel raised, locked to the floor.
     * [PI, 2PI): flat, sliding backwards under the hips.
     * The heel swap happens in the last SWAP of the half cycle: the planted heel drops while the
     * sliding foot's heel pops up, so the two feet exchange roles in one quick snap.
     */
    const footTarget = (phiRaw: number) => {
      const phi = ((phiRaw % TAU) + TAU) % TAU;
      if (phi < Math.PI) {
        const u = phi / Math.PI;
        const ball = STRIDE * (2 * u - 1); // forward relative to the pelvis at exactly the body's speed
        const pitch = HEEL * (1 - smooth((u - (1 - SWAP)) / SWAP));
        return { ball, pitch };
      }
      const v = (phi - Math.PI) / Math.PI;
      const ball = STRIDE * (1 - 2 * smooth(v));
      return { ball, pitch: HEEL * smooth((v - (1 - SWAP)) / SWAP) };
    };

    const solveLeg = (leg: Leg, phi: number, move: number, end: number, sway: number) => {
      const t = footTarget(phi);
      // Stalled: feet flat and side by side. Ending: feet together, up on both toes.
      const ball = t.ball * move * (1 - end);
      const pitch = lerp(t.pitch * move, TOE_STAND, end);

      // Ankle position from the ball-of-foot contact point (the foot pivots about its ball)
      const ankleY = ANKLE_H * Math.cos(pitch) + BALL * Math.sin(pitch);
      const ankleZ = ball + ANKLE_H * Math.sin(pitch) - BALL * Math.cos(pitch);

      // Two-bone IK in the sagittal plane (hip at origin, +z forward, +y up)
      const hipY = state.hipY;
      const ty = ankleY - (hipY - 0.03);
      // The pelvis twists about the vertical axis, which moves the hip sockets along z; compensate so the foot stays put
      const tz = ankleZ + leg.side * 0.052 * Math.sin(sway * 0.07);
      const d = Math.min(Math.hypot(tz, ty), LEG * 2 - 0.0005);
      const cosB = (d * d - 2 * LEG * LEG) / (2 * LEG * LEG);
      const flex = Math.acos(Math.max(-1, Math.min(1, cosB)));
      const toTarget = Math.atan2(tz, -ty);
      const gamma = Math.atan2(LEG * Math.sin(flex), LEG + LEG * Math.cos(flex));
      const thighFwd = toTarget + gamma;

      leg.hip.rotation.x = -thighFwd;
      // Weight shift moves the hips sideways while the foot stays on its spot: the leg abducts
      leg.hip.rotation.z = -(sway * 0.02) / (hipY - 0.03 - ankleY * 0.5);
      leg.knee.rotation.x = flex;
      // Keep the sole at the planned pitch regardless of the leg angles
      leg.ankle.rotation.x = pitch - (-thighFwd + flex);
    };

    const pose = (time: number, dt: number) => {
      const { progress: p, trackStart: t0, trackWidth: tw, figureHeight: H, yaw: yawNow, reducedMotion: still } = live.current;
      rig.root.rotation.y = -Math.PI / 2 + yawNow;
      const targetX = t0 + clamp01(p / 100) * tw;
      if (state.x < 0) state.x = targetX;

      // Skip (progress jumps to the end): go straight to the end pose
      if (p - state.prevP > 12 && p >= 99.5) {
        state.skipped = true;
        state.x = targetX;
        state.vx = 0;
      }
      state.prevP = p;

      const prevX = state.x;
      const sd = smoothDamp(state.x, targetX, state.vx, 0.14, dt);
      state.x = sd.value;
      state.vx = sd.vel;
      const dx = state.x - prevX;
      const speed = dt > 0 ? dx / dt : 0;

      // Gait phase = distance travelled / stride length (never elapsed time), so the feet cannot skate.
      // The figure is turned a little towards the camera, so the feet travel 1/cos(yaw) as far along the walking axis.
      state.theta += (dx / (H * Math.max(0.35, Math.cos(yawNow)))) * (Math.PI / (2 * STRIDE));

      // Moving vs stalled
      const wantMove = still ? 0 : smooth(Math.abs(speed) / (H * 0.12));
      state.move += (wantMove - state.move) * (1 - Math.exp(-dt * 10));
      const m = state.move;

      // Finish: complete the current half stride, then settle into the end pose
      const ending = !still && (p >= 99.5 || state.skipped);
      if (ending && !state.endLocked) {
        state.endLocked = true;
        state.endTheta = Math.ceil(state.theta / Math.PI - 0.001) * Math.PI;
      }
      if (ending && Math.abs(speed) < H * 0.25) {
        state.theta += (state.endTheta - state.theta) * (1 - Math.exp(-dt * (state.skipped ? 30 : 11)));
      }
      const wantEnd = ending && (state.endTheta - state.theta < 0.35) ? 1 : 0;
      state.end += (wantEnd - state.end) * (1 - Math.exp(-dt * (state.skipped ? 24 : 9)));
      const end = state.end;
      const th = state.theta;

      // Hips: almost no vertical bob (<1% of height). They rise onto the toes at the end.
      // (Low enough that both feet can reach their extremes without leaving the floor.)
      state.hipY = lerp(0.545, 0.512, m) + 0.003 * Math.cos(2 * th) * m + 0.054 * end;
      // Weight shifts toward the bent (ball-of-foot) leg while moving; a slow side-to-side shift when stalled
      const idle = still ? 0 : Math.sin(time * 1.3) * 0.45 * (1 - m) * (1 - end);
      const sway = Math.sin(th) * m * (1 - end) + idle;
      for (const leg of rig.legs) solveLeg(leg, leg.side === 1 ? th : th + Math.PI, m, end, sway);
      rig.pelvis.position.y = state.hipY;

      // Pelvis stays level, twists a little; the chest counter-rotates; torso leans ~6 degrees forward
      rig.pelvis.position.x = sway * 0.02;
      rig.pelvis.rotation.z = -sway * 0.03;
      rig.pelvis.rotation.y = sway * 0.06;
      rig.chest.rotation.y = -sway * 0.1;
      rig.chest.rotation.z = sway * 0.02;
      const lean = lerp(0.09, 0.02, end);
      rig.spine.rotation.x = lean;
      rig.chest.rotation.x = lerp(0.02, 0, end);

      // Arms: small loose pendulums out of phase with the legs (spring-driven for a relaxed feel)
      const swing = Math.cos(th) * m * (1 - end);
      const farTarget = still ? 0 : -0.16 * swing;
      const nearTarget = still ? 0 : 0.07 * swing;
      const fa = spring(state.farArm, state.farVel, farTarget, 90, 9, dt);
      state.farArm = fa.angle;
      state.farVel = fa.vel;
      const na = spring(state.nearArm, state.nearVel, nearTarget, 90, 9, dt);
      state.nearArm = na.angle;
      state.nearVel = na.vel;
      const [near, far] = rig.arms;
      near.shoulder.rotation.x = -state.nearArm;
      near.shoulder.rotation.z = -0.06;
      near.elbow.rotation.x = -0.2;
      // Free hand relaxed, then raised to the lapel for the end pose
      far.shoulder.rotation.x = -(state.farArm + end * 0.5);
      far.shoulder.rotation.z = 0.06 - end * 0.18;
      far.elbow.rotation.x = -0.3 - end * 1.75;

      // Briefcase: damped spring that lags behind the arm for natural inertia
      if (!still) {
        const targetCase = state.nearArm * 0.5;
        const c = spring(state.caseAngle, state.caseVel, targetCase, 70, 7, dt);
        state.caseVel = c.vel + (state.prevArm - state.nearArm) * 3; // jolt from arm acceleration
        state.prevArm = state.nearArm;
        state.caseAngle = Math.max(-0.5, Math.min(0.5, c.angle));
      }
      rig.caseSwing.rotation.x = state.caseAngle;

      // Head stays level and steady whatever the torso does (small nod at the end)
      rig.neck.rotation.x = -(rig.spine.rotation.x + rig.chest.rotation.x) + end * 0.1;
      rig.head.rotation.y = -0.05;

      // Subtle breathing
      const breath = still ? 0 : Math.sin(time * 2) * 0.005;
      rig.chest.scale.set(1 + breath, 1 + breath * 0.8, 1 + breath);

      // Tie: damped spring driven by the pelvis's vertical motion
      if (!still) {
        const hipVel = dt > 0 ? (state.hipY - state.prevHipY) / dt : 0;
        state.prevHipY = state.hipY;
        const tieTarget = -0.06 - hipVel * 0.9 - sway * 0.02;
        const tt = spring(state.tieAngle, state.tieVel, tieTarget, 90, 9, dt);
        state.tieVel = tt.vel;
        state.tieAngle = Math.max(-0.5, Math.min(0.3, tt.angle));
      }
      rig.tiePivot.rotation.x = state.tieAngle;

      figure.position.set(state.x, FLOOR_Y, 0);
      figure.scale.setScalar(H);
      glow.position.set(state.x + H * 0.02, FLOOR_Y + 0.5, 0);
      glow.scale.set(H * 1.1, H * 0.26, 1);

      if (debug) {
        figure.updateMatrixWorld(true);
        const w = window as unknown as { __walkerSamples?: unknown[] };
        (w.__walkerSamples ??= []).push({
          theta: th,
          move: m,
          end,
          x: state.x,
          hipY: state.hipY,
          balls: rig.legs.map((leg) => {
            const v = new THREE.Vector3();
            leg.ballMarker.getWorldPosition(v);
            return [v.x, v.y];
          }),
        });
      }
    };

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop);
      if (!width || !height) return;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;
      pose(now / 1000, dt);
      renderer.render(scene, camera);
    };
    const start = () => {
      cancelAnimationFrame(frameId);
      lastTime = 0;
      frameId = requestAnimationFrame(loop);
    };
    // Pause while the tab is hidden; resume without a time jump
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frameId);
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      rig.materials.forEach((mat) => mat.dispose());
      glowTex.dispose();
      (glow.material as THREE.Material).dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
