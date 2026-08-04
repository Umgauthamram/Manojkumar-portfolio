'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import ThemeToggle from '@/components/ui/ThemeToggle';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is currently in view to highlight nav
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(
      (el): el is Element => !!el
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const onScroll = () => setMobileOpen(false);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 focus:outline-none"
            aria-label="Back to top"
          >
            <AppLogo size={36} />
            <span className="font-display text-lg font-light tracking-[0.2em] uppercase hidden sm:block text-foreground">
              Manoj<span className="gradient-text font-bold">Kumar</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div
            className="hidden md:flex items-center gap-1 p-1 rounded-full"
            style={{
              background: 'var(--nav-inner-bg)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  color: activeSection === item.href ? 'var(--primary)' : 'var(--muted-foreground)',
                  background: activeSection === item.href ? 'rgba(79,142,247,0.1)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    activeSection === item.href ? 'var(--primary)' : 'var(--muted-foreground)';
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary text-xs px-5 py-2.5"
            >
              <span>Let&apos;s Talk</span>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2.5 rounded-lg focus:outline-none"
              style={{ border: '1px solid rgba(79,142,247,0.2)' }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span
                  className="block h-0.5 bg-foreground rounded transition-all duration-300"
                  style={{
                    transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                  }}
                />
                <span
                  className="block h-0.5 bg-foreground rounded transition-all duration-300"
                  style={{ opacity: mobileOpen ? 0 : 1 }}
                />
                <span
                  className="block h-0.5 bg-foreground rounded transition-all duration-300"
                  style={{
                    transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col pt-24 px-6"
          style={{
            background: 'var(--nav-overlay-bg)',
            backdropFilter: 'blur(30px)',
          }}
        >
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="text-left px-6 py-5 rounded-xl text-xl font-display font-light text-foreground transition-all duration-200 hover:text-primary"
                style={{
                  border: '1px solid rgba(79,142,247,0.08)',
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <span className="text-primary text-sm font-mono mr-3 opacity-50">0{i + 1}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for hire</span>
          </div>
        </div>
      )}
    </>
  );
}
