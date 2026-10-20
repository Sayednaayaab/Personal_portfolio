import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import { developerInfo } from '@/data/developer';

export function HeroPortal3D() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for buttery-smooth responsiveness
  const mouseX = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 220, damping: 22 });

  // 3D rotation angles
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-14deg', '14deg']);

  // Dynamic holographic glare effect
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  // Parallax floating offsets for layered 3D badges
  const badgeTranslateX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const badgeTranslateY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative w-full max-w-[440px] mx-auto py-4 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background ambient glowing orbs */}
      <div
        className="absolute -inset-24 rounded-full opacity-30 dark:opacity-40 -z-10 animate-pulse pointer-events-none"
        style={{
          // Soft multi-stop gradient instead of filter: blur() on a large animated layer
          background: 'radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(6,182,212,0.3) 30%, rgba(6,182,212,0.1) 50%, transparent 68%)',
          animationDuration: '6s',
        }}
      />

      {/* Main 3D Tilted Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-[32px] p-2.5 bg-gradient-to-tr from-primary/40 via-accent/30 to-purple-500/40 border border-border/80 shadow-[0_20px_50px_rgba(59,130,246,0.2)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.35)] transition-shadow duration-500 cursor-pointer group"
      >
        {/* Inner Card Container */}
        <div className="relative rounded-[26px] overflow-hidden bg-card/95 border border-white/10 p-4 space-y-4">
          {/* Holographic light sheen that glides with mouse */}
          <motion.div
            className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(600px circle at ${gx} ${gy}, rgba(255, 255, 255, 0.15), transparent 60%)`
              ),
            }}
          />

          {/* Top Header Row of Card */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/80 border border-border/50 text-[11px] font-mono text-muted-foreground">
              <Terminal className="size-3 text-primary" />
              <span>sayed.dev</span>
            </div>
          </div>

          {/* Portrait Image Frame */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-inner border border-border/40">
            <img
              src={developerInfo.profileImage}
              alt={developerInfo.name}
              width={586}
              height={732}
              decoding="async"
              // React 18 only passes the lowercase attribute through to the DOM
              {...{ fetchpriority: 'high' }}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Subtle bottom shadow vignette for typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

            {/* Floating Info on Bottom of Photo */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-20">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold text-foreground drop-shadow-md">
                  {developerInfo.name}
                </h3>
                <p className="text-xs text-primary font-mono font-medium drop-shadow-sm">
                  {developerInfo.title}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Online</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="flex items-center justify-between text-xs px-1 text-muted-foreground font-mono">
            <span>Savanur, India</span>
            <span className="text-accent flex items-center gap-1">
              <Sparkles className="size-3" />
              {developerInfo.projectsCompleted}+ Projects Built
            </span>
          </div>
        </div>

        {/* Floating 3D Badge 1: Full-Stack React (Top Left) */}
        <motion.div
          style={{
            x: badgeTranslateX,
            y: badgeTranslateY,
            transform: 'translateZ(45px)',
          }}
          className="absolute -top-3 -left-4 px-3.5 py-1.5 rounded-2xl bg-card/95 border border-primary/40 shadow-xl flex items-center gap-2 z-40 pointer-events-none group-hover:scale-105 transition-transform"
        >
          <div className="p-1 rounded-lg bg-primary/20 text-primary">
            <Code2 className="size-3.5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono text-muted-foreground uppercase leading-none">Specialty</p>
            <p className="text-xs font-bold text-foreground leading-tight">React & Flutter</p>
          </div>
        </motion.div>

        {/* Floating 3D Badge 2: Android & AI (Bottom Right) */}
        <motion.div
          style={{
            x: useTransform(mouseX, [-0.5, 0.5], [12, -12]),
            y: useTransform(mouseY, [-0.5, 0.5], [12, -12]),
            transform: 'translateZ(50px)',
          }}
          className="absolute -bottom-3 -right-4 px-3.5 py-1.5 rounded-2xl bg-card/95 border border-accent/40 shadow-xl flex items-center gap-2 z-40 pointer-events-none group-hover:scale-105 transition-transform"
        >
          <div className="p-1 rounded-lg bg-accent/20 text-accent">
            <Cpu className="size-3.5" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono text-muted-foreground uppercase leading-none">Platform</p>
            <p className="text-xs font-bold text-foreground leading-tight">Odoo & Python</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

