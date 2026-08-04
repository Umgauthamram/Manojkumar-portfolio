'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when the user has requested reduced motion via OS / browser
 * settings. Components can branch on this value to disable expensive or
 * distracting animations (RAF loops, parallax, infinite keyframes, etc).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return reduced;
}
