'use client';

import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const SKIP_KEY = 'epic2077:loaded';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // After mount, decide if we should show the screen at all (skip on repeat visits)
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(SKIP_KEY) === '1') {
        setVisible(false);
        return;
      }
    } catch {
      // ignore storage errors (private mode etc)
    }
    setVisible(true);
  }, []);

  // Progress animation
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setExiting(true), 300);
          setTimeout(() => {
            setVisible(false);
            try {
              sessionStorage.setItem(SKIP_KEY, '1');
            } catch {
              // ignore
            }
          }, 900);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [visible]);

  // Escape to skip
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgress(100);
        setExiting(true);
        setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem(SKIP_KEY, '1');
          } catch {
            // ignore
          }
        }, 400);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      style={{
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="load-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4F8EF7" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#load-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex items-center gap-3 float">
          <AppLogo size={56} />
          <div className="flex flex-col">
            <span className="font-display text-3xl font-light tracking-[0.3em] uppercase text-foreground">
              Welcome<span className="gradient-text font-bold">Buddy</span>
            </span>
            <span className="section-label tracking-[0.5em] text-muted-foreground">
              Initializing...
            </span>
          </div>
        </div>

        <div className="w-64 h-[2px] bg-muted rounded-full overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #4F8EF7, #7C3AED)',
              boxShadow: '0 0 8px rgba(79,142,247,0.8)',
              transition: 'width 0.15s ease',
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LOADING SYSTEMS — {Math.min(Math.round(progress), 100)}%
        </div>

        <button
          type="button"
          onClick={() => {
            setProgress(100);
            setExiting(true);
            setTimeout(() => {
              setVisible(false);
              try {
                sessionStorage.setItem(SKIP_KEY, '1');
              } catch {
                // ignore
              }
            }, 400);
          }}
          className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors"
        >
          Press ESC to skip
        </button>
      </div>

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #4F8EF7, transparent)',
          animation: 'scan-line 4s linear infinite',
        }}
      />
    </div>
  );
}
