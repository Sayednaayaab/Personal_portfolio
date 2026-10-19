import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  /** 0 = far, 1 = mid, 2 = near; controls size, brightness and parallax */
  depth: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  /** Precomputed CSS colour (alpha is applied via globalAlpha, so no per-frame strings) */
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const DEPTHS = [
  { radius: [0.4, 0.8], alpha: [0.25, 0.55], parallax: 0.15, drift: 0.02, share: 0.6 },
  { radius: [0.7, 1.2], alpha: [0.45, 0.8], parallax: 0.35, drift: 0.04, share: 0.3 },
  { radius: [1.1, 1.8], alpha: [0.7, 1], parallax: 0.7, drift: 0.07, share: 0.1 },
] as const;

const DARK_TINTS = ['255,255,255', '200,220,255', '170,200,255', '210,190,255', '180,240,255'];
const LIGHT_TINTS = ['30,41,59', '37,99,235', '79,70,229', '14,116,144'];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

const isLowPower = () =>
  window.matchMedia('(pointer: coarse)').matches || (navigator.hardwareConcurrency || 4) <= 4;

function starCount(width: number, height: number) {
  const cap = width < 768 ? 110 : isLowPower() ? 220 : 320;
  return Math.min(Math.round((width * height) / 3600), cap);
}

/** Pre-rendered round dot for near stars (drawImage is cheaper than building an arc path per star). */
function createDotSprite() {
  const size = 16;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const g = sprite.getContext('2d')!;
  g.fillStyle = '#fff';
  g.beginPath();
  g.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
  g.fill();
  return sprite;
}

/** Pre-rendered soft glow used behind near stars (cheaper than shadowBlur). */
function createGlowSprite() {
  const size = 32;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const g = sprite.getContext('2d')!;
  const gradient = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.25, 'rgba(180,210,255,0.35)');
  gradient.addColorStop(1, 'rgba(180,210,255,0)');
  g.fillStyle = gradient;
  g.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * Full-viewport space background: near-black base, slow nebula glows and a
 * canvas starfield with three depth layers that twinkle, drift, and shift with
 * the cursor and scroll position. Decorative only (pointer-events: none).
 */
export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const glow = createGlowSprite();
    const dot = createDotSprite();
    // Phones and low-power devices draw at 30fps; the drift is slow enough that it looks the same
    const minFrameMs = isLowPower() ? 1000 / 30 : 0;
    const root = document.documentElement;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;
    let stars: Star[] = [];
    let shooting: ShootingStar | null = null;
    let nextShootingAt = performance.now() + rand(6000, 12000);
    let isDark = root.classList.contains('dark');

    // Smoothed parallax target (cursor) and current value
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const seed = () => {
      const count = starCount(width, height);
      const tints = isDark ? DARK_TINTS : LIGHT_TINTS;
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        const depth = r < DEPTHS[0].share ? 0 : r < DEPTHS[0].share + DEPTHS[1].share ? 1 : 2;
        const d = DEPTHS[depth];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          radius: rand(d.radius[0], d.radius[1]),
          alpha: rand(d.alpha[0], d.alpha[1]),
          twinkleSpeed: rand(0.0006, 0.0022),
          twinklePhase: Math.random() * Math.PI * 2,
          color: `rgb(${tints[Math.floor(Math.random() * tints.length)]})`,
        };
      });
    };

    const resize = () => {
      // 1.5x is visually identical for tiny dots and much cheaper to fill than 2-3x
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const wrap = (value: number, max: number) => ((value % max) + max) % max;

    const draw = (time: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);

      current.x += (target.x - current.x) * Math.min(0.05 * dt, 1);
      current.y += (target.y - current.y) * Math.min(0.05 * dt, 1);
      const scroll = window.scrollY;
      const lightFactor = isDark ? 1 : 0.55;

      for (const s of stars) {
        const d = DEPTHS[s.depth];
        s.x = wrap(s.x - d.drift * dt, width);

        const x = wrap(s.x + current.x * d.parallax * 30, width);
        const y = wrap(s.y - scroll * d.parallax * 0.12 + current.y * d.parallax * 30, height);
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const alpha = s.alpha * twinkle * lightFactor;

        if (s.depth === 2 && isDark) {
          const size = s.radius * 9;
          ctx.globalAlpha = alpha * 0.55;
          ctx.drawImage(glow, x - size / 2, y - size / 2, size, size);
        }

        ctx.globalAlpha = alpha;
        if (s.radius < 0.9) {
          ctx.fillStyle = s.color;
          ctx.fillRect(x, y, s.radius * 1.6, s.radius * 1.6);
        } else if (isDark) {
          // White sprite; tint differences are imperceptible at this size
          const size = s.radius * 2;
          ctx.drawImage(dot, x - s.radius, y - s.radius, size, size);
        } else {
          ctx.fillStyle = s.color;
          ctx.fillRect(x - s.radius, y - s.radius, s.radius * 2, s.radius * 2);
        }
      }

      // Occasional faint shooting star (dark theme only)
      if (!reduceMotion && isDark) {
        if (!shooting && time > nextShootingAt) {
          const fromLeft = Math.random() < 0.5;
          shooting = {
            x: fromLeft ? rand(0, width * 0.4) : rand(width * 0.6, width),
            y: rand(0, height * 0.35),
            vx: (fromLeft ? 1 : -1) * rand(7, 10),
            vy: rand(2.5, 4),
            life: 1,
          };
        }
        if (shooting) {
          const tailX = shooting.x - shooting.vx * 12;
          const tailY = shooting.y - shooting.vy * 12;
          const trail = ctx.createLinearGradient(shooting.x, shooting.y, tailX, tailY);
          trail.addColorStop(0, `rgba(220,235,255,${0.75 * shooting.life})`);
          trail.addColorStop(1, 'rgba(220,235,255,0)');
          ctx.strokeStyle = trail;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          shooting.x += shooting.vx * dt;
          shooting.y += shooting.vy * dt;
          shooting.life -= 0.012 * dt;
          if (shooting.life <= 0 || shooting.x < -200 || shooting.x > width + 200 || shooting.y > height) {
            shooting = null;
            nextShootingAt = time + rand(9000, 18000);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      frameId = requestAnimationFrame(loop);
      if (minFrameMs && lastTime && time - lastTime < minFrameMs - 1) return;
      // Normalised to 60fps steps so motion speed is the same at any refresh rate
      const dt = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1;
      lastTime = time;
      draw(time, dt);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      lastTime = 0;
      if (reduceMotion) draw(0, 0);
      else frameId = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      resize();
      if (reduceMotion) draw(0, 0);
    };

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frameId);
      else start();
    };

    const handlePointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / width) * 2 - 1;
      target.y = (e.clientY / height) * 2 - 1;
    };

    const handleScroll = () => {
      if (reduceMotion) draw(0, 0);
    };

    // Re-tint stars when the theme toggles
    const themeObserver = new MutationObserver(() => {
      const dark = root.classList.contains('dark');
      if (dark !== isDark) {
        isDark = dark;
        seed();
        if (reduceMotion) draw(0, 0);
      }
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

    resize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    if (finePointer && !reduceMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }
    start();

    return () => {
      cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      <div className="starfield-base" />
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="starfield-vignette" />
    </div>
  );
}
