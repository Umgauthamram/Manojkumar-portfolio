'use client';

import React, { useEffect, useState } from 'react';

const SKIP_KEY = 'epic2077:loaded';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(SKIP_KEY) === '1') {
        setVisible(false);
        return;
      }
    } catch {
      // ignore
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Phase 1: Show initial monogram "MK"
    const triggerActive = setTimeout(() => {
      setActive(true);
    }, 400);

    // Phase 2: Start exiting animation after reveal finishes
    const triggerExit = setTimeout(() => {
      setExiting(true);
    }, 2400);

    // Phase 3: Hide loading screen completely
    const hideScreen = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SKIP_KEY, '1');
      } catch {
        // ignore
      }
    }, 3000);

    return () => {
      clearTimeout(triggerActive);
      clearTimeout(triggerExit);
      clearTimeout(hideScreen);
    };
  }, [visible]);

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508]"
      style={{
        transition:
          'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="load-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4F8EF7" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#load-grid)" />
        </svg>
      </div>

      {/* Monogram to Full Name Splash Animation */}
      <div
        className={`relative z-10 flex items-center justify-center font-display ${active ? 'active' : ''}`}
      >
        <div className="flex items-center text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold tracking-tight select-none">
          {/* Left Block: M -> Manoj */}
          <div className="flex items-center text-foreground transition-all duration-1000 ease-out">
            <span className="gradient-text">M</span>
            <div
              className="overflow-hidden transition-all duration-1000 ease-out"
              style={{
                maxWidth: active ? '240px' : '0px',
                opacity: active ? 1 : 0,
              }}
            >
              <span className="text-foreground font-light pr-4">anoj</span>
            </div>
          </div>

          {/* Right Block: K -> Kumar */}
          <div className="flex items-center text-foreground transition-all duration-1000 ease-out">
            <span className="gradient-text">K</span>
            <div
              className="overflow-hidden transition-all duration-1000 ease-out"
              style={{
                maxWidth: active ? '240px' : '0px',
                opacity: active ? 1 : 0,
              }}
            >
              <span className="text-foreground font-light">umar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle loader text */}
      <div
        className="absolute bottom-16 text-[9px] font-mono tracking-[0.4em] uppercase text-muted-foreground transition-opacity duration-500"
        style={{ opacity: exiting ? 0 : 0.6 }}
      >
        Manojkumar — Portfolio v2.0
      </div>
    </div>
  );
}
