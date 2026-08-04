'use client';

import React, { useEffect, useRef, useState } from 'react';

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  color: string;
  description: string;
  highlights: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: 'Secretariat',
    role: 'Project Associate to Additional Chief Secretary',
    period: '2025 — Present',
    location: 'Chennai',
    type: 'Full-Time',
    color: '#06B6D4',
    description:
      'Worked with senior government leadership to support education policy, curriculum reforms, and strategic initiatives across Tamil Nadu. Collaborated with Directorates, SCERT, and subject experts to develop policy documents, vision plans, government publications, and executive presentations.',
    highlights: [
      'Contributed to the Tamil Nadu State Education Policy (SEP 2025) and Government Policy Note.',
      'Supported statewide curriculum and textbook reforms with SCERT.',
      'Prepared executive briefings, concept papers, and strategic presentations.',
      'Contributed to the Five-Year Achievement Report (2021–2026).',
      'Assisted in developing the Vetri Tamilagam Vision Plan.',
      'Coordinated with multiple Directorates and stakeholders on key education initiatives & Monitored policy implementation and manifesto commitments.',
      'Supported planning and documentation for major government events and educational programs.',
    ],
  },
  {
    company: 'Directorate of Public Instruction',
    role: 'Regional Coordinator',
    period: '2024 — 2025',
    location: 'Chennai',
    type: 'Full-Time',
    color: '#4F8EF7',
    description:
      'Led programme coordination and digital implementation across five districts, supporting a network of 1,200+ Administrator-cum-Instructors (AIs). Worked closely with the EMIS team to strengthen data quality, build digital capacity, and improve operational efficiency across the region.',
    highlights: [
      'Managed and supported 1,200+ AIs across five districts.',
      'Delivered 100+ training sessions on EMIS and digital education platforms.',
      'Resolved EMIS and UDISE+ issues, reducing turnaround time by 30–40%.',
      'Conducted regular performance reviews, ensuring 95%+ on-time task completion.',
      'Developed training materials, SOPs, and implementation guides for statewide use.',
      'Collaborated on EMIS data validation and process improvements to enhance data accuracy and reporting.',
    ],
  },
  {
    company: 'Samagra Shiksha, kanchipuram',
    role: 'Tamil Nadu Education Fellowship',
    period: '2023 — 2024',
    location: 'Kanchipuram',
    type: 'Full-Time',
    color: '#7C3AED',
    description:
      'Supported district-level planning, programme implementation, and digital communication initiatives, working closely with education officials to strengthen monitoring, reporting, and stakeholder engagement.',
    highlights: [
      'Supported the implementation of 15+ education programmes annually across the district.',
      'Coordinated 50+ review meetings and monitored action-point compliance.',
      'Prepared reports for training programmes, field visits, and departmental activities.',
      'Designed 200+ communication materials, including posters, banners, and awareness campaigns.',
      'Managed district publications, social media, and digital outreach initiatives.',
      'Developed training videos and performed Excel-based data analysis to support evidence-based decision-making.',
    ],
  },

  {
    company: 'Jeevisoft IT Solutions',
    role: 'UI/UX Designer',
    period: '2021 — 2023',
    location: 'Remote',
    type: 'Full-Time',
    color: '#F59E0B',
    description:
      'Delivered creative design, web development, and digital marketing solutions for businesses and startups. Worked across branding, websites, content creation, SEO, and social media to enhance clients digital presence.',
    highlights: [
      'Designed 200+ digital and print marketing creatives for diverse clients.',
      'Built 5 responsive business websites with a focus on user experience.',
      'Created training materials, presentations, and learning resources.',
      'Managed social media platforms and digital branding campaigns.',
      'Produced promotional videos and visual content for corporate branding.',
      'Implemented SEO strategies to improve search rankings and online visibility.',
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeExp, setActiveExp] = useState(0);

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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 px-6 md:px-10 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)',
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
          <span className="section-label">Experience</span>
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
          The journey
          <br />
          <span className="gradient-text italic">so far.</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Timeline nav */}
          <div className="lg:col-span-2 relative">
            {/* Vertical line */}
            <div
              className="absolute left-[22px] top-4 bottom-4 w-px hidden lg:block"
              style={{ background: 'linear-gradient(180deg, #4F8EF7, #7C3AED, #06B6D4, #F59E0B)' }}
            />

            <div className="space-y-2">
              {EXPERIENCES.map((exp, i) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveExp(i)}
                  className="relative w-full text-left px-6 py-5 rounded-xl transition-all duration-300 lg:pl-14"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                    transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                    background: activeExp === i ? `${exp.color}0D` : 'transparent',
                    border: `1px solid ${activeExp === i ? `${exp.color}30` : 'transparent'}`,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full hidden lg:flex items-center justify-center"
                    style={{
                      background: activeExp === i ? exp.color : '#1A1A2E',
                      border: `2px solid ${exp.color}`,
                      boxShadow: activeExp === i ? `0 0 12px ${exp.color}80` : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {activeExp === i && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div
                    className="font-bold text-sm mb-0.5"
                    style={{ color: activeExp === i ? exp.color : '#E8EAF0' }}
                  >
                    {exp.company}
                  </div>
                  <div className="text-xs text-muted-foreground">{exp.period}</div>
                  <div
                    className="text-xs mt-1 font-medium"
                    style={{ color: activeExp === i ? exp.color : 'transparent' }}
                  >
                    {exp.type}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience detail */}
          <div
            className="lg:col-span-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.3s',
            }}
          >
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.company}
                style={{
                  display: activeExp === i ? 'block' : 'none',
                }}
              >
                <div
                  className="glass-card rounded-2xl p-8"
                  style={{ border: `1px solid ${exp.color}20` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="section-label mb-2" style={{ color: exp.color }}>
                        {exp.type} · {exp.period}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${exp.color}15`,
                        border: `1px solid ${exp.color}30`,
                      }}
                    >
                      <span className="text-xl">
                        {i === 0 ? '🎓' : i === 1 ? '📈' : i === 2 ? '⚙️' : '🌍'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-secondary-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div>
                    <div className="section-label mb-4">Key Highlights</div>
                    <div className="space-y-3">
                      {exp.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              background: exp.color,
                              boxShadow: `0 0 6px ${exp.color}80`,
                            }}
                          />
                          <span className="text-sm text-foreground">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
