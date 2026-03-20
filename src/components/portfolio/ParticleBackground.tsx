import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useScroll } from 'framer-motion';
import type { RefObject } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: 'back' | 'mid' | 'front';
  color: string;
}

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  // Removed useScroll - using window.scrollY state for global fixed background
  const y = useMotionValue(0);

  // Animation frame loop
  const rafRef = useRef<number>(0);

const updateParticles = useCallback(() => {
    setParticles((prev) =>
      prev.map((p) => {
        let { x, y, vx, vy } = p;
        x += vx;
        y += vy + scrollY * 0.0005; // slower for full-site
        vx *= 0.99; // less friction for smoother
        vy *= 0.99;

        // Bounce - full viewport
        if (rect) {
          if (x <= p.size || x >= rect.width - p.size) vx *= -1;
          if (y <= p.size || y >= rect.height - p.size) vy *= -1;
        }

        return { ...p, x, y, vx, vy };
      })
    );
    rafRef.current = requestAnimationFrame(updateParticles);
  }, [rect, scrollY]);

  // Network draw
  const drawNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rect || particles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'destination-over';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 * (1 - dist / 200) * (1 - scrollY % 100 / 100)})`;
          ctx.lineWidth = 1 + (1 - dist / 200);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }, [rect, particles, scrollY]);

  useEffect(() => {
    updateParticles();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateParticles]);

  // Draw on particles change
  useEffect(() => {
    const frame = requestAnimationFrame(() => drawNetwork());
    return () => cancelAnimationFrame(frame);
  }, [drawNetwork]);

  // Resize handler
  const updateRect = useCallback(() => {
    setRect({
      width: window.innerWidth,
      height: document.documentElement.scrollHeight || window.innerHeight,
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      toJSON: () => ({})
    } as DOMRect);
  }, []);

  useEffect(() => {
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [updateRect]);

  // Initialize particles
  useEffect(() => {
    if (!rect) return;

    const particleCount = window.innerWidth > 768 ? 80 : 50;
    const layers = ['back', 'mid', 'front'] as const;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const layer = layers[Math.floor(Math.random() * layers.length)] as Particle['layer'];
      newParticles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        layer,
        color: layer === 'front' ? 'var(--accent)' : 'var(--primary)',
      });
    }
    setParticles(newParticles);
  }, [rect]);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Parallax Particles - using transform for perf */}
{particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full pointer-events-none parallax-layer-${p.layer} glow animation-float`}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            transform: `translateY(${scrollY * (p.layer === 'back' ? 0.02 : p.layer === 'mid' ? 0.01 : 0.005)}px)`,
          }}
        />
      ))}

      {/* Network Canvas */}
      <canvas
        ref={canvasRef}
        className="network-canvas"
        style={{ display: rect ? 'block' : 'none' }}
      />

      {/* Back Orb */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[100px] parallax-layer-back"
        style={{ background: 'var(--primary)', opacity: 0.15 }}
        animate={{ 
          y: [-50, 0, 50],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      {/* Front Orb */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[100px] parallax-layer-front"
        style={{ background: 'var(--accent)', opacity: 0.12 }}
        animate={{ 
          y: [50, 0, -50],
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          y: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-[100px]"
        style={{ background: 'var(--accent)', opacity: 0.12 }}
      />
    </div>
  );
}
