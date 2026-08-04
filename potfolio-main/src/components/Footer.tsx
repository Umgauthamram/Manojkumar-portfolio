'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="py-10 px-6 md:px-10 relative"
      style={{ borderTop: '1px solid rgba(79,142,247,0.1)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <AppLogo size={28} onClick={handleLogoClick} />
          <span className="font-display text-base font-light tracking-[0.2em] uppercase text-foreground hidden sm:block">
            M<span className="gradient-text font-bold">K</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {['#about', '#skills', '#projects', '#experience', '#contact']?.map((href) => (
            <Link
              key={href}
              href={href}
              className="capitalize hover:text-foreground transition-colors"
            >
              {href?.slice(1)}
            </Link>
          ))}
        </div>

        {/* Right */}
        <p className="text-xs text-muted-foreground font-mono">© 2026 Manojkumar </p>
      </div>
    </footer>
  );
}
