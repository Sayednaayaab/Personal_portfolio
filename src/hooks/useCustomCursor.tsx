import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState extends CursorPosition {
  isVisible: boolean;
  isClicking: boolean;
  isHovering: boolean;
  elementType: string | null;
}

export function useCustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isClicking: false,
    isHovering: false,
    elementType: null,
  });

  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isVisible: true,
      }));
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isVisible: false }));
    };

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isVisible: true }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return cursorState;
}

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, .cursor-interactive';

/**
 * Cursor follower: a ring that tracks the pointer and a dot that trails behind it.
 * Positions live in motion values, so mouse movement never re-renders React.
 * Disabled on touch devices and for visitors who prefer reduced motion.
 */
export function CustomCursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 200, damping: 20 });
  const dotY = useSpring(y, { stiffness: 200, damping: 20 });

  const visibleRef = useRef(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const handleMouseOver = (e: MouseEvent) => {
      const isInteractive = !!(e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR);
      if (isInteractive !== hoveringRef.current) {
        hoveringRef.current = isInteractive;
        setHovering(isInteractive);
      }
    };
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    const handleLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10002] w-8 h-8 rounded-full border-2"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.6 : hovering ? 1.5 : 1,
          borderColor: clicking ? '#f97316' : hovering ? '#22c55e' : 'rgba(255, 255, 255, 0.8)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10002] w-2 h-2 rounded-full bg-emerald-400/70"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

export function useCursorInteractions() {
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select, .cursor-interactive')) {
        setHoveredElement(target);
      }
    };

    const handleMouseOut = () => {
      setHoveredElement(null);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return hoveredElement;
}