'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    const doc = document.documentElement;

    // View Transitions API transition animation
    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        if (nextDark) {
          doc.classList.add('dark');
        } else {
          doc.classList.remove('dark');
        }
        localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        doc.animate(
          {
            clipPath: nextDark ? clipPath : clipPath.slice().reverse(),
          },
          {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: nextDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
          }
        );
      });
    } else {
      // Fallback if View Transitions is unsupported
      if (nextDark) {
        doc.classList.add('dark');
      } else {
        doc.classList.remove('dark');
      }
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-secondary/80 border border-border/80 flex items-center justify-center">
        <span className="w-4 h-4 rounded-full bg-border animate-pulse" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full bg-secondary/80 border border-border hover:border-primary/50 text-foreground transition-all duration-300 flex items-center justify-center focus:outline-none cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={16} className="text-amber-400" />
      ) : (
        <Moon size={16} className="text-violet-500" />
      )}
    </button>
  );
}
