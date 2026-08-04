'use client';

import React, { useState, useEffect, useRef } from 'react';

const ORB_MESSAGES = [
  'Nova Star online. Systems nominal.',
  'Scanning for exceptional opportunities...',
  'React.js expertise: Maximum.',
  'Next.js build optimized. ✓',
  'TypeScript strict mode: Enabled.',
  'UI Engineering protocols active.',
  'AI integration layer: Ready.',
  "Ashkan's portfolio loaded successfully.",
  'Looking for something specific? Try pressing ⌘K',
  'Epic2077 — where code meets craft.',
];

export default function NovaStarOrb() {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState(ORB_MESSAGES[0]);
  const [msgIdx, setMsgIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const [displayMsg, setDisplayMsg] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTyping(true);
    setDisplayMsg('');
    setCharIdx(0);
  }, [message]);

  useEffect(() => {
    if (!typing) return;
    if (charIdx < message.length) {
      const t = setTimeout(() => {
        setDisplayMsg((prev) => prev + message[charIdx]);
        setCharIdx((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      setTyping(false);
    }
  }, [charIdx, typing, message]);

  useEffect(() => {
    if (!expanded) return;
    intervalRef.current = setInterval(() => {
      setMsgIdx((i) => {
        const next = (i + 1) % ORB_MESSAGES.length;
        setMessage(ORB_MESSAGES[next]);
        return next;
      });
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [expanded]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div
          className="glass-card rounded-2xl p-4 w-72 text-sm"
          style={{
            animation: 'float 4s ease-in-out infinite',
            border: '1px solid rgba(79,142,247,0.25)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="section-label text-primary">NOVA STAR AI</span>
            <span className="ml-auto text-muted-foreground text-xs">v2.0.77</span>
          </div>
          <p className="text-foreground font-mono text-xs leading-relaxed min-h-[40px]">
            {displayMsg}
            {typing && <span className="terminal-cursor text-primary">▋</span>}
          </p>
          <div className="mt-3 flex gap-1">
            {ORB_MESSAGES.map((_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 rounded-full transition-all duration-300"
                style={{
                  background: i === msgIdx ? '#4F8EF7' : 'rgba(79,142,247,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded((e) => !e)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center orb-pulse focus:outline-none"
        style={{
          background: 'transparent',
          border: '1px solid rgba(79,142,247,0.4)',
        }}
        aria-label="Nova Star AI Assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16.5L5.5 20.5L8 13.5L2 9H9.5L12 2Z"
            fill="url(#star-grad)"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="star-grad" x1="2" y1="2" x2="22" y2="22">
              <stop stopColor="#4F8EF7" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border border-primary/20 spin-slow"
          style={{ margin: '-6px' }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          style={{
            top: '-3px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 6px #4F8EF7',
          }}
        />
      </button>
    </div>
  );
}
