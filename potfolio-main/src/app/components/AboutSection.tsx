'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const traits = [
    {
      icon: '⚡',
      label: 'Public Policy Expert',
      desc: 'Driving education reforms through strategy, governance, and policy innovation.',
    },
    {
      icon: '🎨',
      label: 'Product Engineer',
      desc: 'Building scalable digital products with modern web technologies.',
    },
    {
      icon: '🤖',
      label: 'AI Innovator',
      desc: 'Applying AI to simplify workflows and create smarter user experiences.',
    },
    {
      icon: '🧠',
      label: 'Creative Designer',
      desc: 'Designing intuitive interfaces, impactful visuals, and engaging digital experiences.',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 md:px-10 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <span className="section-label">About Me</span>
          <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <div
            className="space-y-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s',
            }}
          >
            <h2 className="font-display text-display text-foreground">
              Shaping Policy
              <br />
              <span className="gradient-text italic">Designing Products</span>
              <br />
              Building the Future
            </h2>

            <div className="space-y-5 text-secondary-foreground leading-relaxed">
              <p>
                I&apos;m Manoj Kumar — a Policy, Technology & Design Professional from Chennai,
                India, passionate about building digital solutions that create real-world impact.
              </p>
              <p>
                I work at the intersection of public policy, technology, and design, contributing to
                education reforms, digital transformation, and user-centric products. My experience
                spans the Government of Tamil Nadu, where I&apos;ve worked on the Tamil Nadu State
                Education Policy (SEP 2025), curriculum reforms, and strategic planning, while also
                designing and developing modern web applications and digital experiences.
              </p>
              <p>
                I believe the best solutions combine innovation, thoughtful design, and meaningful
                impact.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                'Policy Strategy',
                'Full Stack',
                'Next.js',
                'UI/UX Design',
                'AI Solutions',
                'Public Sector',
                'System Design',
              ]?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-bold rounded-full"
                  style={{
                    background: 'rgba(79,142,247,0.08)',
                    border: '1px solid rgba(79,142,247,0.2)',
                    color: '#4F8EF7',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Traits + photo */}
          <div
            className="space-y-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s',
            }}
          >
            {/* Profile visual */}
            <div
              className="relative rounded-2xl overflow-hidden mb-8 aspect-[5/5] max-h-80 sm:max-h-80 lg:max-h-none lg:aspect-[6/7] mx-auto lg:mx-0"
              style={{
                border: '1px solid rgba(79,142,247,0.2)',
                boxShadow: '0 0 40px rgba(79,142,247,0.08), 0 0 80px rgba(124,58,237,0.05)',
                background: 'linear-gradient(160deg, #07091c 0%, #0c0a1e 50%, #060d1a 100%)',
              }}
            >
              <AppImage
                src="/assets/images/Manoj3.png"
                alt="Ashkan Sadeghi Developer"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 50%' }}
                quality={95}
                priority
              />

              {/* Colour-grade overlay: darkens edges, adds blue-purple tint to blend snowy bg */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,5,14,0.25) 0%, transparent 30%, transparent 55%, rgba(5,5,14,0.75) 100%), radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.1) 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, rgba(124,58,237,0.15) 0%, transparent 50%)',
                }}
              />

              <div className="absolute bottom-4 left-4 glass-card rounded-xl px-4 py-3">
                <div className="text-xs font-mono text-primary">Manojkumar</div>
                <div className="text-xs text-muted-foreground mt-0.5">Chennai</div>
              </div>
            </div>

            {/* Trait cards */}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {traits?.map((t, i) => (
            <div
              key={t?.label}
              className="glass-card-hover rounded-xl p-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s`,
              }}
            >
              <div className="text-2xl mb-2">{t?.icon}</div>
              <div className="text-sm font-bold text-foreground mb-1">{t?.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{t?.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
