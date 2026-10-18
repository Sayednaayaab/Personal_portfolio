import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { developerInfo } from '@/data/developer';

interface PreloaderProps {
  /** Called when the reveal begins, so the site can mount and animate in underneath */
  onRevealStart: () => void;
  /** Called when the reveal has finished and the preloader can unmount */
  onComplete: () => void;
}

/**
 * loading → charge (UI clears, logo glows) → seam (light cracks down the middle)
 * → open (the two halves slide apart like blast doors) → unmount
 */
type Phase = 'loading' | 'charge' | 'seam' | 'open';

const LOADING_MS = 3000;
const CHARGE_MS = 400;
const SEAM_MS = 280;
const DOORS_MS = 1000;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_DOORS = 'cubic-bezier(0.76, 0, 0.24, 1)';

const bootLogs = [
  'INITIALIZING SYSTEM CORE...',
  'COMPILING REACT & TYPESCRIPT ENGINE...',
  'CONNECTING PYTHON, ODOO & NODE APIS...',
  'CALIBRATING 3D SHADERS & PARALLAX...',
  'EXPERIENCE READY.',
];

interface SplashScreenProps {
  progress: number;
  logIndex: number;
  isLoading: boolean;
}

/** The full splash screen. Rendered once per door, each clipped to its half. */
function SplashScreen({ progress, logIndex, isLoading }: SplashScreenProps) {
  const fadeOut = { opacity: isLoading ? 1 : 0, y: isLoading ? 0 : 10 };

  return (
    <div className="absolute inset-0 bg-[#07090e] text-foreground flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Ambient background mesh glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, #06b6d4 40%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />

      {/* Cyber Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Centerpiece Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">
        {/* Animated Brand Monogram Orb */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating neon ring */}
          <motion.div
            animate={{ rotate: 360, opacity: isLoading ? 1 : 0, scale: isLoading ? 1 : 1.4 }}
            transition={{
              rotate: { repeat: Infinity, duration: 6, ease: 'linear' },
              opacity: { duration: 0.35 },
              scale: { duration: 0.4, ease: EASE_OUT },
            }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed border-primary/40 p-1"
          />

          {/* Inner pulsating glow ring */}
          <motion.div
            animate={isLoading ? { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] } : { scale: 1.6, opacity: 1 }}
            transition={isLoading ? { repeat: Infinity, duration: 2, ease: 'easeInOut' } : { duration: 0.4, ease: EASE_OUT }}
            className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-purple-500/30 blur-md"
          />

          {/* Core Monogram: charges up when loading completes */}
          <motion.div
            animate={{
              scale: isLoading ? 1 : 1.12,
              boxShadow: isLoading
                ? '0 0 30px rgba(59,130,246,0.4)'
                : '0 0 60px rgba(34,211,238,0.65), 0 0 120px rgba(59,130,246,0.45)',
            }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card/90 backdrop-blur-xl border border-primary/50 flex items-center justify-center"
          >
            <span className="text-xl sm:text-2xl font-black gradient-text tracking-tighter">SM</span>
          </motion.div>
        </div>

        {/* Identity & Subtitle */}
        <motion.div className="space-y-1.5" animate={fadeOut} transition={{ duration: 0.3 }}>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center justify-center gap-2"
          >
            <span>{developerInfo.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-mono">
              PORTFOLIO
            </span>
          </motion.h2>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{developerInfo.heroSubtitle}</p>
        </motion.div>

        {/* Precision Progress Bar & Large Percentage */}
        <motion.div className="w-full space-y-3 pt-2" animate={fadeOut} transition={{ duration: 0.3, delay: 0.05 }}>
          <div className="flex items-baseline justify-between font-mono text-xs text-muted-foreground px-1">
            <span className="flex items-center gap-1.5 text-accent">
              <Terminal className="size-3 animate-pulse" />
              <span>SYS_BOOT</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono tabular-nums">
              <span className="inline-block min-w-[3ch] text-right">{progress}</span>
              <span className="text-xs text-primary font-normal ml-0.5">%</span>
            </span>
          </div>

          <div className="w-full h-1 bg-secondary/80 rounded-full overflow-hidden border border-border/40 relative">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={logIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-mono text-muted-foreground/80 tracking-wider flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span>{bootLogs[logIndex]}</span>
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Preloader({ onRevealStart, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(1);
  const [logIndex, setLogIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const reduceMotion = useReducedMotion();

  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLSpanElement>(null);

  // Keep the latest callbacks without restarting the progress timer
  const callbacks = useRef({ onRevealStart, onComplete });
  callbacks.current = { onRevealStart, onComplete };

  useEffect(() => {
    const startTime = performance.now();
    let rafId: number;

    const tick = (currentTime: number) => {
      const progressFraction = Math.min(1, (currentTime - startTime) / LOADING_MS);
      setProgress(Math.max(1, Math.min(100, Math.floor(progressFraction * 100))));

      if (progressFraction < 1) rafId = requestAnimationFrame(tick);
      else setPhase('charge');
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Charge: UI clears and the logo glows. Mount the site now, hidden behind the doors,
  // so its heavy first render is done before they open.
  useEffect(() => {
    if (phase !== 'charge') return;
    callbacks.current.onRevealStart();
    if (reduceMotion) {
      callbacks.current.onComplete();
      return;
    }
    const timer = setTimeout(() => setPhase('seam'), CHARGE_MS);
    return () => clearTimeout(timer);
  }, [phase, reduceMotion]);

  // Seam: a line of light cracks down the middle
  useLayoutEffect(() => {
    if (phase !== 'seam' || !seamRef.current) return;
    const crack = seamRef.current.animate(
      [
        { transform: 'translateX(-50%) scaleY(0)', opacity: 1 },
        { transform: 'translateX(-50%) scaleY(1)', opacity: 1 },
      ],
      { duration: SEAM_MS, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
    );
    let cancelled = false;
    crack.finished
      .then(() => {
        if (!cancelled) setPhase('open');
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      crack.cancel();
    };
  }, [phase]);

  // Open: the halves slide apart (transform only, on the compositor), then unmount
  useLayoutEffect(() => {
    if (phase !== 'open') return;
    const left = leftDoorRef.current;
    const right = rightDoorRef.current;
    const seam = seamRef.current;
    if (!left || !right || !seam) return;

    const doorTiming: KeyframeAnimationOptions = { duration: DOORS_MS, easing: EASE_DOORS, fill: 'forwards' };
    const edges = [...left.querySelectorAll('[data-door-edge]'), ...right.querySelectorAll('[data-door-edge]')];

    // Each door is a full-screen copy clipped to one half, so -52%/52% fully clears the viewport
    const animations = [
      left.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-52%)' }], doorTiming),
      right.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(52%)' }], doorTiming),
      seam.animate(
        [
          { transform: 'translateX(-50%) scaleY(1)', opacity: 1 },
          { transform: 'translateX(-50%) scaleY(1)', opacity: 0 },
        ],
        { duration: 380, easing: 'ease-out', fill: 'forwards' }
      ),
      ...edges.map((edge) => edge.animate([{ opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 1 }], doorTiming)),
    ];

    let cancelled = false;
    animations[0].finished
      .then(() => {
        if (!cancelled) callbacks.current.onComplete();
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      animations.forEach((anim) => anim.cancel());
    };
  }, [phase]);

  // Update telemetry log based on current progress percentage
  useEffect(() => {
    if (progress >= 95) setLogIndex(4);
    else if (progress >= 70) setLogIndex(3);
    else if (progress >= 45) setLogIndex(2);
    else if (progress >= 20) setLogIndex(1);
    else setLogIndex(0);
  }, [progress]);

  const isLoading = phase === 'loading';
  const splash = <SplashScreen progress={progress} logIndex={logIndex} isLoading={isLoading} />;
  const exit = { opacity: 0, transition: { duration: reduceMotion ? 0.3 : 0.1 } };

  return (
    <>
      {/* Left door: full splash clipped to the left half */}
      <motion.div
        ref={leftDoorRef}
        className="fixed inset-0 z-[9999] will-change-transform"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
        exit={exit}
        aria-hidden={!isLoading}
      >
        {splash}
        <span
          data-door-edge
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-full bg-accent opacity-0 shadow-[0_0_24px_4px_rgba(34,211,238,0.6)]"
        />
      </motion.div>

      {/* Right door: identical copy clipped to the right half (hidden from screen readers) */}
      <motion.div
        ref={rightDoorRef}
        className="fixed inset-0 z-[9999] will-change-transform"
        style={{ clipPath: 'inset(0 0 0 50%)' }}
        exit={exit}
        aria-hidden="true"
      >
        {splash}
        <span
          data-door-edge
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-[2px] bg-accent opacity-0 shadow-[0_0_24px_4px_rgba(34,211,238,0.6)]"
        />
      </motion.div>

      {/* The seam of light that cracks down the middle before the doors open */}
      <span
        ref={seamRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-1/2 z-[10000] w-[2px] bg-[#e0fbff] opacity-0 shadow-[0_0_36px_10px_rgba(34,211,238,0.65)]"
        style={{ transform: 'translateX(-50%) scaleY(0)' }}
      />
    </>
  );
}
