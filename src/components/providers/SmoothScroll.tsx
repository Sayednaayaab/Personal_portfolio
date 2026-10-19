import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenisInstance } from '@/lib/smoothScroll';

/**
 * Lenis smooth scrolling for mouse/trackpad devices only.
 * Phones and tablets already scroll smoothly natively; driving their scroll from JS
 * (a scrollTo every frame) costs a lot on slower CPUs and causes stutter.
 */
export function SmoothScroll() {
  useEffect(() => {
    const wantsSmoothScroll =
      window.matchMedia('(pointer: fine) and (hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!wantsSmoothScroll) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return null;
}
