import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none';
      
      const size = Math.random() * 4 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.3 + 0.1;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: var(--primary);
        opacity: ${opacity};
        animation: float ${duration}s ease-in-out ${delay}s infinite;
      `;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Gradient orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: 'easeInOut',
        }}
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[100px]"
        style={{ background: 'var(--primary)', opacity: 0.15 }}
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
