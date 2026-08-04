'use client';

import React, { useEffect, useRef, useState } from 'react';

type Skill = { name: string; level: number; color: string };
type Category = { label: string; icon: string; skills: Skill[] };

const CATEGORIES: Category[] = [
  {
    label: 'Policy & Strategy',
    icon: '🤖',
    skills: [
      { name: 'Policy Research', level: 95, color: '#10A37F' },
      { name: 'Strategic Planning', level: 90, color: '#4F8EF7' },
      { name: 'Stakeholder Management', level: 92, color: '#A8ABBE' },
      { name: 'Project Coordination', level: 95, color: '#7C3AED' },
      { name: 'Government Documentation', level: 80, color: '#06B6D4' },
    ],
  },
  {
    label: 'UI/UX & Design',
    icon: '🔧',
    skills: [
      { name: 'Figma', level: 90, color: '#68A063' },
      { name: 'Canva', level: 95, color: '#A8ABBE' },
      { name: 'Responsive Design', level: 95, color: '#4F8EF7' },
      { name: 'Design Systems', level: 85, color: '#494949' },
      { name: 'Photoshop', level: 85, color: '#E535AB' },
    ],
  },
  {
    label: 'Data & Analytics',
    icon: '☁️',
    skills: [
      { name: 'Microsoft Excel', level: 95, color: '#F05032' },
      { name: 'Data Analysis', level: 90, color: '#A8ABBE' },
      { name: 'Reporting', level: 90, color: '#2496ED' },
      { name: 'Dashboard Development', level: 85, color: '#FF9900' },
      { name: 'Power BI', level: 80, color: '#F24E1E' },
    ],
  },
  {
    label: 'Web Development',
    icon: '⚛️',
    skills: [
      { name: 'HTML/CSS', level: 95, color: '#61DAFB' },
      { name: 'JavaScript', level: 90, color: '#4F8EF7' },
      { name: 'TypeScript', level: 85, color: '#3178C6' },
      { name: 'React.js', level: 90, color: '#c3c631' },
      { name: 'Node.js', level: 75, color: '#E34F26' },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setAnimatedLevels(new Array(CATEGORIES[activeCat].skills.length).fill(0));
    const timeout = setTimeout(() => {
      setAnimatedLevels(CATEGORIES[activeCat].skills.map((s) => s.level));
    }, 100);
    return () => clearTimeout(timeout);
  }, [visible, activeCat]);

  const currentSkills = CATEGORIES[activeCat].skills;

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-6 md:px-10 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(79,142,247,0.03) 0%, transparent 70%)',
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
          <span className="section-label">Technical Arsenal</span>
          <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
        </div>

        <h2
          className="font-display text-display text-foreground mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s',
          }}
        >
          Built with the
          <br />
          <span className="gradient-text italic">right tools.</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Category tabs */}
          <div
            className="space-y-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s',
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveCat(i)}
                className="w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center gap-4"
                style={{
                  background: activeCat === i ? 'rgba(79,142,247,0.1)' : 'transparent',
                  border: `1px solid ${activeCat === i ? 'rgba(79,142,247,0.3)' : 'rgba(79,142,247,0.08)'}`,
                  boxShadow: activeCat === i ? '0 0 20px rgba(79,142,247,0.1)' : 'none',
                }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: activeCat === i ? 'var(--primary)' : 'var(--foreground)' }}
                  >
                    {cat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {cat.skills.length} technologies
                  </div>
                </div>
                {activeCat === i && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            ))}
          </div>

          {/* Skills bars */}
          <div
            className="lg:col-span-2 space-y-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.3s',
            }}
          >
            <div className="glass-card rounded-2xl p-8" style={{ minHeight: '360px' }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{CATEGORIES[activeCat].icon}</span>
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    {CATEGORIES[activeCat].label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Proficiency levels based on production usage
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {currentSkills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs font-bold font-mono" style={{ color: skill.color }}>
                        {animatedLevels[i] ?? 0}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${animatedLevels[i] ?? 0}%`,
                          background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                          boxShadow: `0 0 8px ${skill.color}60`,
                          transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
