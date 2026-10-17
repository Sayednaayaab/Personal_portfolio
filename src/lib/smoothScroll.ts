import type Lenis from 'lenis';

// Lenis writes its own version info to `window.lenis`, so the active instance
// is kept here instead of on the window object.
let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

const HEADER_OFFSET = -70;

/**
 * Smoothly scroll to a pixel position or element, using Lenis when it is
 * running and native smooth scrolling otherwise.
 */
export function scrollToTarget(target: number | HTMLElement, offset = HEADER_OFFSET) {
  if (typeof target === 'number') {
    if (lenisInstance) lenisInstance.scrollTo(target);
    else window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function scrollToId(id: string, offset = HEADER_OFFSET) {
  const el = document.getElementById(id);
  if (el) scrollToTarget(el, offset);
}
