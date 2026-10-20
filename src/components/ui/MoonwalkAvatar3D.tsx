import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { loadAvatarBuffer } from './avatarAsset';

/**
 * The real character: a rigged, realistic man in a black suit ("Male Character in Suit" by sthaarpit,
 * CC BY 4.0) playing a Mixamo moonwalk motion-capture clip.
 *
 *  - The clip's own footwork is played untouched: heel-up foot planted on its ball, flat foot sliding.
 *  - Its playback speed follows the distance the figure travels along the loading bar, so the planted foot stays
 *    where it is on the floor (no skating) at any progress speed. Screen position and dance are separate.
 *  - When progress stalls or ends, the clip eases to a neutral mid-step pose instead of freezing mid-stride.
 *
 * One transparent canvas over the loading bar, 1 world unit = 1 px.
 */

export { AVATAR_URL } from './avatarAsset';

interface MoonwalkAvatar3DProps {
  progress: number;
  trackStart: number;
  trackWidth: number;
  figureHeight: number;
  yaw?: number;
  debug?: boolean;
  reducedMotion?: boolean;
  onFail?: () => void;
  /** Called once the character has been drawn for the first time */
  onReady?: () => void;
}

// Measured from the clip, per frame (1-32): how fast the planted foot (the one moving forward relative to the
// pelvis while the body glides back) travels, in m/s. Playback is paced by this so the planted foot stays put.
// Planted foot by frame: L 1-9, R 10-25, L 26-32.
const PLANTED_SPEED = [0.45, 0.55, 0.64, 0.65, 0.68, 0.78, 0.93, 1.02, 1.01, 1.01, 1.04, 1.01, 0.95, 0.89, 0.83, 0.75, 0.69, 0.65, 0.59, 0.51, 0.45, 0.45, 0.5, 0.59, 0.76, 1.01, 1.17, 1.18, 1.1, 0.92, 0.6, 0.45];
const plantedSpeedAt = (clipSeconds: number) => {
  const f = clipSeconds * FPS;
  const i = Math.floor(f);
  const a = PLANTED_SPEED[((i % 32) + 32) % 32];
  const b = PLANTED_SPEED[(((i + 1) % 32) + 32) % 32];
  return a + (b - a) * (f - i);
};
const NEUTRAL_FRAME = 16; // frame where both feet are under the pelvis
const FPS = 30;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};


export default function MoonwalkAvatar3D({ progress, trackStart, trackWidth, figureHeight, yaw = 0.38, debug = false, reducedMotion = false, onFail, onReady }: MoonwalkAvatar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const live = useRef({ progress, trackStart, trackWidth, figureHeight, yaw, reducedMotion });
  live.current = { progress, trackStart, trackWidth, figureHeight, yaw, reducedMotion };
  const failRef = useRef(onFail);
  failRef.current = onFail;
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

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
    // Touch screens get a lower pixel ratio: the figure is small and phones are fill-rate bound
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.matchMedia('(pointer: coarse)').matches ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;opacity:0';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.9;

    // Soft key, teal rim from behind and blue fill, matching the site's palette
    const key = new THREE.DirectionalLight(0xfff3e6, 3.2);
    key.position.set(-1.5, 2.4, 2.6);
    const rim = new THREE.DirectionalLight(0x19e6cf, 5.5);
    rim.position.set(2.2, 1.4, -2);
    const fill = new THREE.DirectionalLight(0x6a9bff, 1.8);
    fill.position.set(2.5, 0.6, 2);
    scene.add(key, rim, fill, new THREE.AmbientLight(0x1b2540, 0.7));

    const figure = new THREE.Group();
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
    const FLOOR_Y = 2;
    let width = 0;
    let height = 0;
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

    // ---- Loaded character state ----
    let disposed = false;
    let frameId = 0;
    let lastTime = 0;
    let ready = false;
    let announced = false;
    let model: THREE.Group;
    let mixer: THREE.AnimationMixer;
    let action: THREE.AnimationAction;
    let duration = 1;
    let modelHeight = 1.75;
    const bones: Record<string, THREE.Bone> = {};
    const st = {
      x: -1, vx: 0, t: (NEUTRAL_FRAME - 1) / FPS, move: 0, prevP: 0, skipped: false, nod: 0,
    };

    const smoothDamp = (current: number, target: number, vel: number, smoothTime: number, dt: number) => {
      const omega = 2 / smoothTime;
      const ex = omega * dt;
      const decay = 1 / (1 + ex + 0.48 * ex * ex + 0.235 * ex * ex * ex);
      const change = current - target;
      const temp = (vel + omega * change) * dt;
      return { value: target + (change + temp) * decay, vel: (vel - omega * temp) * decay };
    };
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loadAvatarBuffer().then((buffer) => loader.parse(
      buffer,
      '',
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;
        model.traverse((o) => {
          if ((o as THREE.Bone).isBone) bones[o.name] = o as THREE.Bone;
          const m = o as THREE.SkinnedMesh;
          if (m.isMesh) m.frustumCulled = false;
        });
        const need = ['Hips', 'LeftToeBase', 'RightToeBase'];
        if (need.some((n) => !bones[n]) || !gltf.animations.length) {
          console.warn('Avatar rig is missing expected bones or animation');
          failRef.current?.();
          return;
        }
        const box = new THREE.Box3().setFromObject(model);
        modelHeight = box.max.y - box.min.y;
        model.position.y = -box.min.y; // feet on the floor
        figure.add(model);

        const clip = gltf.animations[0];
        duration = clip.duration;

        mixer = new THREE.AnimationMixer(model);
        action = mixer.clipAction(clip);
        action.play();
        action.paused = false;
        // Compile the shaders before the first visible frame (in parallel where the GPU driver allows),
        // so the fade-in never stalls on a phone
        const compiled = renderer.compileAsync
          ? renderer.compileAsync(scene, camera)
          : Promise.resolve(renderer.compile(scene, camera));
        compiled.catch(() => undefined).then(() => {
          if (!disposed) ready = true;
        });
      },
      () => {
        if (!disposed) failRef.current?.();
      }
    )).catch(() => {
      if (!disposed) failRef.current?.();
    });

    const pose = (time: number, dt: number) => {
      const { progress: p, trackStart: t0, trackWidth: tw, figureHeight: H, yaw: yawNow, reducedMotion: still } = live.current;
      figure.rotation.y = -Math.PI / 2 + yawNow; // faces left, glides right
      const targetX = t0 + clamp01(p / 100) * tw;
      if (st.x < 0) st.x = targetX;
      if (p - st.prevP > 12 && p >= 99.5) {
        st.skipped = true;
        st.x = targetX;
        st.vx = 0;
      }
      st.prevP = p;
      const prevX = st.x;
      const sd = smoothDamp(st.x, targetX, st.vx, 0.14, dt);
      st.x = sd.value;
      st.vx = sd.vel;
      const dx = st.x - prevX;
      const speedPx = dt > 0 ? Math.abs(dx) / dt : 0;

      const scale = H / modelHeight;
      figure.scale.setScalar(scale);
      figure.position.set(st.x, FLOOR_Y, 0);
      glow.position.set(st.x, FLOOR_Y + 0.5, 0);
      glow.scale.set(H * 1.1, H * 0.26, 1);

      if (ready) {
        const ending = !still && (p >= 99.5 || st.skipped);
        const wantMove = still || ending ? 0 : smooth(speedPx / (H * 0.12));
        st.move += (wantMove - st.move) * (1 - Math.exp(-dt * 10));
        // Clip time follows distance: the planted foot covers CLIP_SPEED metres per clip-second relative to the pelvis
        const metres = (Math.abs(dx) / scale) / Math.max(0.35, Math.cos(yawNow));
        const advance = still || ending ? 0 : metres / plantedSpeedAt(st.t);
        st.t += advance;
        // Settle into a neutral mid-step pose when stalled or finished (never freeze mid-stride)
        if (st.move < 0.4) {
          const tn = (NEUTRAL_FRAME - 1) / FPS;
          let d = tn - (st.t % duration);
          if (d > duration / 2) d -= duration;
          if (d < -duration / 2) d += duration;
          st.t += d * (1 - Math.exp(-dt * (st.skipped ? 25 : ending ? 14 : 7)));
        }
        st.t = ((st.t % duration) + duration) % duration;
        action.time = st.t;
        mixer.update(0);

        // A small nod at the very end
        st.nod += ((ending ? 1 : 0) - st.nod) * (1 - Math.exp(-dt * 6));
        if (bones.Head) {
          const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0.12 * st.nod);
          bones.Head.quaternion.multiply(q);
        }

        if (debug) {
          model.updateMatrixWorld(true);
          const w = window as unknown as { __walkerSamples?: unknown[] };
          const v = new THREE.Vector3();
          (w.__walkerSamples ??= []).push({
            t: st.t, x: st.x, move: st.move,
            toes: ['LeftToeBase', 'RightToeBase'].map((n) => { bones[n].getWorldPosition(v); return [v.x, v.y]; }),
          });
        }
      }
    };

    const loop = (now: number) => {
      frameId = requestAnimationFrame(loop);
      if (!width || !height) return;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;
      pose(now / 1000, dt);
      renderer.render(scene, camera);
      if (ready && !announced) {
        announced = true;
        // Fade and rise in on the compositor; the loading clock starts once the figure is fully visible
        const fade = renderer.domElement.animate(
          [
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
        );
        fade.finished.then(() => { if (!disposed) readyRef.current?.(); }).catch(() => undefined);
      }
    };
    const start = () => {
      cancelAnimationFrame(frameId);
      lastTime = 0;
      frameId = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frameId);
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      mixer?.stopAllAction();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        const list = Array.isArray(mat) ? mat : mat ? [mat] : [];
        for (const mt of list) {
          for (const v of Object.values(mt as unknown as Record<string, unknown>)) {
            if (v && (v as THREE.Texture).isTexture) (v as THREE.Texture).dispose();
          }
          mt.dispose();
        }
      });
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
