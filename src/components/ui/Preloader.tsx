import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Sparkles, Code2, Cpu } from 'lucide-react';
import { developerInfo } from '@/data/developer';

interface PreloaderProps {
  onComplete: () => void;
}

const bootLogs = [
  'INITIALIZING SYSTEM CORE...',
  'COMPILING REACT & TYPESCRIPT ENGINE...',
  'CONNECTING PYTHON, ODOO & NODE APIS...',
  'CALIBRATING 3D SHADERS & PARALLAX...',
  'EXPERIENCE READY.',
];

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(1);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const TOTAL_DURATION_MS = 3000; // 3 seconds total
    const startTime = performance.now();
    let rafId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(1, elapsed / TOTAL_DURATION_MS);
      const currentPercentage = Math.max(1, Math.min(100, Math.floor(progressFraction * 100)));

      setProgress(currentPercentage);

      if (progressFraction < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 250);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  // Update telemetry log based on current progress percentage
  useEffect(() => {
    if (progress >= 95) setLogIndex(4);
    else if (progress >= 70) setLogIndex(3);
    else if (progress >= 45) setLogIndex(2);
    else if (progress >= 20) setLogIndex(1);
    else setLogIndex(0);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#07090e] text-foreground flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(16px)',
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Ambient background mesh glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, #06b6d4 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
        }}
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
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dashed border-primary/40 p-1"
          />

          {/* Inner pulsating glow ring */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-purple-500/30 blur-md"
          />

          {/* Core Monogram */}
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-card/90 backdrop-blur-xl border border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-black gradient-text tracking-tighter">
              SM
            </span>
          </div>
        </div>

        {/* Identity & Subtitle */}
        <div className="space-y-1.5">
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
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            {developerInfo.heroSubtitle}
          </p>
        </div>

        {/* Precision Progress Bar & Large Percentage */}
        <div className="w-full space-y-3 pt-2">
          {/* Large Minimalist Counter */}
          <div className="flex items-baseline justify-between font-mono text-xs text-muted-foreground px-1">
            <span className="flex items-center gap-1.5 text-accent">
              <Terminal className="size-3 animate-pulse" />
              <span>SYS_BOOT</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
              {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}
              <span className="text-xs text-primary font-normal ml-0.5">%</span>
            </span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1 bg-secondary/80 rounded-full overflow-hidden border border-border/40 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>

          {/* Telemetry Log Feed */}
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
        </div>
      </div>
    </motion.div>
  );
}
