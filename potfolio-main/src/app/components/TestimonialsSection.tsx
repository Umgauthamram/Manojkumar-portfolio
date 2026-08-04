'use client';

import React, { useEffect, useRef, useState } from 'react';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '"Manoj consistently delivers high-quality work with exceptional attention to detail. His ability to translate complex policy requirements into practical solutions makes him a valuable contributor to every project."',
    name: 'Additional Chief Secretary',
    role: 'School Education Department',
    initials: 'CM',
    accent: '#4F8EF7',
  },
  {
    quote:
      '"Working with Manoj has always been seamless. Whether it is policy documentation, strategic planning, or digital solutions, he combines analytical thinking with creativity to deliver outstanding results."',
    name: 'Senior Private Secretary',
    role: 'School Education Department',
    initials: 'JR',
    accent: '#7C3AED',
  },
  {
    quote:
      '"Manoj bridges the gap between policy, technology, and design with remarkable ease. His professionalism, problem-solving skills, and commitment to excellence leave a lasting impact on every initiative."',
    name: 'State Coordinator',
    role: 'Samagra Shiksha',
    initials: 'MS',
    accent: '#06B6D4',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 px-6 md:px-10 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center gap-4 mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <span className="section-label">Testimonials</span>
          <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
        </div>

        <h2
          className="font-display text-display text-foreground mb-16 max-w-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s',
          }}
        >
          What people <span className="gradient-text italic">say.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="glass-card-hover rounded-2xl p-6 flex flex-col"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${0.2 + i * 0.1}s`,
                border: '1px solid rgba(79,142,247,0.12)',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={{ color: t.accent, opacity: 0.6 }}
              >
                <path
                  d="M9.13 14.05c-2.86 0-3.92-2.06-3.92-4.13 0-3.41 2.86-6.27 6.27-6.27v2.06c-2.27 0-4.13 1.86-4.13 4.13 0 .55.16 1.06.43 1.51.41-.27.92-.43 1.43-.43 1.43 0 2.59 1.16 2.59 2.59 0 1.43-1.16 2.54-2.67 2.54Zm9.41 0c-2.86 0-3.92-2.06-3.92-4.13 0-3.41 2.86-6.27 6.27-6.27v2.06c-2.27 0-4.13 1.86-4.13 4.13 0 .55.16 1.06.43 1.51.41-.27.92-.43 1.43-.43 1.43 0 2.59 1.16 2.59 2.59 0 1.43-1.16 2.54-2.67 2.54Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="text-sm text-secondary-foreground leading-relaxed mt-4 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `${t.accent}15`,
                    border: `1px solid ${t.accent}40`,
                    color: t.accent,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
