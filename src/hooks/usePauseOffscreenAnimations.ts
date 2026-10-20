import { useEffect } from 'react';

/**
 * Pauses the looping CSS animations (marquee, pipeline packets, pings, pulses) inside page sections
 * that are scrolled out of view, so the browser isn't restyling and repainting things nobody can see.
 */
export function usePauseOffscreenAnimations() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
      },
      { rootMargin: '300px 0px' }
    );
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll('main section, section[id]').forEach((section) => {
        if (seen.has(section)) return;
        seen.add(section);
        io.observe(section);
      });
    };
    scan();
    // Sections below the hero mount lazily
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
