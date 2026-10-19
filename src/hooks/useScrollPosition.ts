import { useState, useEffect, useRef } from 'react';

/**
 * Tracks whether the page has scrolled past a threshold, for the header's
 * transparent → solid transition.
 *
 * State only changes when the threshold is crossed (not on every scroll event),
 * so components using this don't re-render on each scroll frame.
 */
export const useScrollPosition = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const state = useRef({ lastY: 0, scrolled: false, direction: 'up' as 'up' | 'down', frame: 0 });

  useEffect(() => {
    const s = state.current;
    s.lastY = window.scrollY;

    const update = () => {
      s.frame = 0;
      const y = window.scrollY;
      const scrolled = y > threshold;
      if (scrolled !== s.scrolled) {
        s.scrolled = scrolled;
        setIsScrolled(scrolled);
      }
      const direction = y > s.lastY ? 'down' : y < s.lastY ? 'up' : s.direction;
      if (direction !== s.direction) {
        s.direction = direction;
        setScrollDirection(direction);
      }
      s.lastY = y;
    };

    // At most one check per animation frame
    const handleScroll = () => {
      if (!s.frame) s.frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(s.frame);
    };
  }, [threshold]);

  return { isScrolled, scrollDirection };
};
