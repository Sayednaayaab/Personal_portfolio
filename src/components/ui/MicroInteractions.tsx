import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useMagneticAttraction, useButtonBounce, useRippleEffect } from '@/hooks/useMicroInteractions';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends Omit<HTMLMotionProps<'button'>, 'onClick' | 'children'> {
  children: ReactNode;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'subtle' | 'strong';
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, strength = 20, onClick, variant = 'default', className, style, ...props }, ref) => {
    const magnetic = useMagneticAttraction(strength);
    const bounce = useButtonBounce();
    const { ripples, createRipple } = useRippleEffect();

    const combinedStyle = {
      ...style,
      transform: `translate(${magnetic.x.get()}px, ${magnetic.y.get()}px) scale(${bounce.scale})`,
      position: 'relative',
      overflow: 'hidden',
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onClick?.(e);
    };

    return (
      <motion.button
        ref={(el) => {
          magnetic.ref.current = el as HTMLDivElement;
          if (ref && typeof ref === 'object' && 'current' in ref) {
            (ref as React.RefObject<HTMLButtonElement>).current = el;
          } else if (typeof ref === 'function') {
            ref(el);
          }
        }}
        style={combinedStyle}
        onClick={handleClick}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        onMouseDown={bounce.onMouseDown}
        onMouseUp={bounce.onMouseUp}
        onMouseLeave={bounce.onMouseLeave}
        className={cn(
          'relative z-10',
          variant === 'subtle' && 'transition-transform duration-200',
          variant === 'strong' && 'transition-transform duration-100',
          className
        )}
        {...props}
      >
        {/* Ripple effect */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute rounded-full bg-current pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 4,
              height: 4,
              marginLeft: -2,
              marginTop: -2,
            }}
          />
        ))}

        {/* Magnetic glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none"
          animate={{ opacity: magnetic.x.get() !== 0 || magnetic.y.get() !== 0 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

interface FloatingElementProps {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({ children, amplitude = 10, duration = 3, delay = 0, className, ...props }: FloatingElementProps) {
  const [y, setY] = useState(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016;
      setY(Math.sin(timeRef.current * (2 * Math.PI / duration) + delay) * amplitude);
      requestAnimationFrame(animate);
    };
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [amplitude, duration, delay]);

  return (
    <motion.div
      className={cn('inline-block', className)}
      animate={{ y }}
      transition={{ duration: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface PulseElementProps {
  children: ReactNode;
  minScale?: number;
  maxScale?: number;
  duration?: number;
  className?: string;
}

export function PulseElement({ children, minScale = 1, maxScale = 1.05, duration = 2, className, ...props }: PulseElementProps) {
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

  return (
    <motion.span
      className={cn('inline-block', className)}
      animate={{ scale }}
      transition={{ duration: duration * 500, ease: 'easeInOut' }}
      {...props}
    >
      {children}
    </motion.span>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: number;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({ children, threshold = 0.1, rootMargin = 0, className, delay = 0, direction = 'up', ...props }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: `${rootMargin}px` }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  const initialVariants = {
    up: { opacity: 0, y: 30 },
    down: { opacity: 0, y: -30 },
    left: { opacity: 0, x: 30 },
    right: { opacity: 0, x: -30 },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initialVariants[direction]}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface HoverGlowProps {
  children: ReactNode;
  color?: string;
  className?: string;
  intensity?: number;
}

export function HoverGlow({ children, color = '#22c55e', className, intensity = 1, ...props }: HoverGlowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn('relative transition-all duration-300', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered 
          ? `0 0 ${20 * intensity}px ${color}40, 0 0 ${40 * intensity}px ${color}20`
          : 'none',
        y: isHovered ? -4 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ShimmerProps {
  className?: string;
  speed?: number;
  angle?: number;
}

export function Shimmer({ className, speed = 2, angle = 135 }: ShimmerProps) {
  return (
    <motion.div
      className={cn('absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none', className)}
      animate={{
        x: ['-100%', '100%'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        repeatDelay: 3,
        ease: 'linear',
      }}
      style={{
        transform: `rotate(${angle}deg)`,
        width: '300%',
        left: '-100%',
      }}
    />
  );
}