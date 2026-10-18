import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Hook for adding magnetic attraction effect to elements
 */
export function useMagneticAttraction(strength = 20) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 500, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 500, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / strength;
    const deltaY = (e.clientY - centerY) / strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x: xSpring,
    y: ySpring,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

/**
 * Hook for ripple click effect
 */
export function useRippleEffect() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const idRef = useRef(0);

  const createRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const id = idRef.current++;
    setRipples(prev => [...prev, { x, y, id }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  return { ripples, createRipple };
}

/**
 * Hook for hover glow effect
 */
export function useHoverGlow(color = '#22c55e') {
  const [isHovered, setIsHovered] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    glowStyle: {
      boxShadow: isHovered ? `0 0 30px ${color}60, 0 0 60px ${color}30` : 'none',
      transition: 'box-shadow 0.4s ease-out',
    },
  };
}

/**
 * Hook for scroll-reveal animations
 */
export function useScrollReveal(threshold = 0.1, rootMargin = '0px') {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

/**
 * Hook for parallax effect on scroll
 */
export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = (rect.top - window.innerHeight) * speed;
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

/**
 * Creates a subtle bounce animation for buttons
 */
export function useButtonBounce() {
  const [scale, setScale] = useState(1);

  const handleMouseDown = () => setScale(0.95);
  const handleMouseUp = () => setScale(1);
  const handleMouseLeave = () => setScale(1);

  return {
    style: { transform: `scale(${scale})`, transition: 'transform 0.1s ease-out' },
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
  };
}

/**
 * Creates a floating animation for decorative elements
 */
export function useFloatingAnimation(amplitude = 10, duration = 3) {
  const [y, setY] = useState(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016;
      setY(Math.sin(timeRef.current * (2 * Math.PI / duration)) * amplitude);
      requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [amplitude, duration]);

  return y;
}

/**
 * Creates a pulse animation for attention-drawing elements
 */
export function usePulseAnimation(minScale = 1, maxScale = 1.1, duration = 2) {
  const [scale, setScale] = useState(minScale);
  const directionRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextScale = directionRef.current === 1 ? maxScale : minScale;
      setScale(nextScale);
      directionRef.current *= -1;
    }, duration * 500);

    return () => clearInterval(interval);
  }, [minScale, maxScale, duration]);

  return scale;
}

/**
 * Hook for typing animation effect
 */
export function useTypewriter(text: string, speed = 50) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayText, isComplete };
}

/**
 * Creates a stagger animation for lists
 */
export function staggerAnimation(index: number, baseDelay = 0.1, maxDelay = 0.5) {
  return {
    delay: Math.min(index * baseDelay, maxDelay),
  };
}

/**
 * Creates a spring transition config
 */
export function springTransition(stiffness = 300, damping = 30) {
  return {
    type: 'spring' as const,
    stiffness,
    damping,
  };
}

/**
 * Creates an ease-out transition config
 */
export function easeOutTransition(duration = 0.4) {
  return {
    duration,
    ease: [0.22, 1, 0.36, 1] as const,
  };
}