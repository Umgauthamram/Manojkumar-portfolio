'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 left-8 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        background: 'rgba(13,13,24,0.85)',
        border: '1px solid rgba(79,142,247,0.25)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 20px rgba(79,142,247,0.15)',
      }}
    >
      <Icon name="ArrowUpIcon" size={16} className="text-primary" />
    </button>
  );
}
