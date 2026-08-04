'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse/trackpad).
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    let rafId = 0;
    const animate = () => {
      followerPos.current.x += (posRef.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (posRef.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (followerRef.current) {
        followerRef.current.style.width = '50px';
        followerRef.current.style.height = '50px';
        followerRef.current.style.borderColor = 'rgba(79, 142, 247, 0.9)';
      }
    };

    const onLeaveLink = () => {
      if (followerRef.current) {
        followerRef.current.style.width = '32px';
        followerRef.current.style.height = '32px';
        followerRef.current.style.borderColor = 'rgba(79, 142, 247, 0.5)';
      }
    };

    window.addEventListener('mousemove', onMove);
    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor" style={{ transform: 'translate(-50%, -50%)' }} />
      <div
        ref={followerRef}
        className="cursor-follower"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
