'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  problem?: string;
  description: string;
  tech: string[];
  color: string;
  accentColor: string;
  image: string;
  imageAlt: string;
  demo?: string;
  Access: string;
  featured?: boolean;
  badge?: string;
  span?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'Tamil Nadu State Education Policy (SEP 2025)',
    title: 'Tamil Nadu State Education Policy (SEP 2025)',
    subtitle: 'Book & Layout Design',
    description:
      'Contributed to the design, layout, and publication of the Tamil Nadu State Education Policy, ensuring a professional and reader-friendly government publication.',
    tech: ['Book Design', 'Layout Design', 'Government Publication'],
    color: '#7C3AED',
    accentColor: '#06B6D4',
    image: '/assets/images/nova-star.png',
    imageAlt:
      'Dark music player interface with glowing purple waveform visualizer on black background',
    Access:
      'https://drive.google.com/drive/folders/1t-CWfrazG7HJNsbGksfdl3NcMuuej69f?usp=drive_link',
  },
  {
    id: 'TNEF Elite Magazine 2022 - 2023',
    title: 'TNEF Elite Magazine 2022 - 2023',
    subtitle: 'Editorial & Print Design',
    description:
      'Designed the magazine layout, typography, and visual elements to create a professional publication for the Tamil Nadu Education Foundation.',
    tech: ['Editorial Design', 'Adobe InDesign', 'Photoshop', 'Print Design'],
    color: '#06B6D4',
    accentColor: '#4F8EF7',
    image: '/assets/images/elegant-sound.png',
    imageAlt:
      'Premium sneaker product shot on dark studio background with dramatic cyan side lighting',
    Access: 'https://drive.google.com/drive/folders/16e229gp4w8K7a-w_qAFNKZcX-DHLAmvg?usp=sharing',
  },
  {
    id: 'Creative Poster Designs',
    title: 'Creative Poster Designs',
    subtitle: 'Branding & Visual Communication',
    description:
      'Designed promotional posters, awareness campaigns, social media creatives, banners, and branding materials for educational institutions and organizations.',
    tech: ['Branding', 'Graphic Design', 'Photoshop', 'Illustrator'],
    color: '#4F8EF7',
    accentColor: '#7C3AED',
    image: '/assets/images/text-editor.png',
    imageAlt:
      'Dark code editor with syntax highlighted markdown text, split-screen preview on deep charcoal background',
    Access: 'https://drive.google.com/drive/folders/14oJnQIvUXitAgBDYv9KmHnsqTpqAWb18?usp=sharing',
  },
  {
    id: 'Jeevi Academy Blog Site',
    title: 'Jeevi Academy Blog Site',
    subtitle: 'Website Design & Development',
    description:
      'Designed and developed a responsive educational website with a modern UI, optimized performance, and user-friendly navigation.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'web Development'],
    color: '#F59E0B',
    accentColor: '#06B6D4',
    image: '/assets/images/libria.png',
    imageAlt:
      'Cozy cafe website with warm color palette, featuring a welcoming homepage, menu page with delicious offerings, and an about page sharing the cafe’s story, all built with Next.js and Tailwind CSS.',
    Access: 'https://www.jeeviacademy.com/blog/',
    span: '',
  },
  {
    id: 'Photo Gallery',
    title: 'Photo Gallery',
    subtitle: 'Photography & Visual Showcase',
    description:
      'A curated collection of photography, creative visuals, event captures, branding work, and design projects showcasing my creative perspective.',
    tech: ['Photography', 'Creative Work', 'Portfolio', 'Figma'],
    color: '#F59E0B',
    accentColor: '#06B6D4',
    image: '/assets/images/Design.png',
    imageAlt:
      'Minimalist white sneaker on warm amber-toned studio background with soft dramatic shadows',
    Access: 'https://drive.google.com/drive/folders/1oC4U-nFDSsq04XIbigm747vvOyHpelPy?usp=sharing',
    span: '',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Build a stable, deduped list of filter chips from the actual projects.
  // We bucket related variants together (e.g. Next.js 15 + Next.js 16 -> 'Next.js') for cleaner UX.
  const filterTags = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of PROJECTS) {
      for (const t of p.tech) {
        const norm = t.replace(/\s*\d+(\.\d+)?$/, '').trim();
        set.add(norm);
      }
    }
    const priority = ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind'];
    const all = Array.from(set);
    const ordered = [
      ...priority.filter((p) => all.includes(p)),
      ...all.filter((t) => !priority.includes(t)).sort(),
    ];
    return ['All', ...ordered];
  }, []);

  const visibleProjects = React.useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) =>
      p.tech.some((t) => t.replace(/\s*\d+(\.\d+)?$/, '').trim() === activeFilter)
    );
  }, [activeFilter]);

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

  // Close modal on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6 md:px-10 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(79,142,247,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="section-label">Featured Projects</span>
              <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
            </div>
            <h2 className="font-display text-display text-foreground">
              Signature
              <br />
              <span className="gradient-text italic">Projects.</span>
            </h2>
          </div>
        </div>

        {/* Tech filter chips */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects by technology"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
          }}
        >
          {filterTags.map((tag) => {
            const isActive = tag === activeFilter;
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tag)}
                className="px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(79,142,247,0.15)' : 'transparent',
                  border: isActive
                    ? '1px solid rgba(79,142,247,0.45)'
                    : '1px solid rgba(79,142,247,0.15)',
                  color: isActive ? '#4F8EF7' : 'rgba(232,234,240,0.65)',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* BENTO GRID AUDIT:
              Array has 5 cards: [NovaStar, ElegantSounds, TSXShoes, MarkdownEditor, VanillaShoes]
              Row 1: [col-1 to col-2: NovaStar cs-2 rs-1] [col-3: ElegantSounds cs-1]
              Row 2: [col-1: TSXShoes cs-1] [col-2: MarkdownEditor cs-1] [col-3: VanillaShoes cs-1]
              Placed 5/5 cards ✓
           */}
        <div className="grid lg:grid-cols-3 gap-5">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
              onClick={() => setActiveProject(project)}
            />
          ))}
          {visibleProjects.length === 0 && (
            <div className="col-span-full text-center py-16 text-sm text-muted-foreground">
              No projects match this filter yet.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  visible,
  onClick,
}: {
  project: Project;
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isTall = project.span?.includes('row-span');

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col ${project.span || ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.08}s`,
        border: `1px solid ${hovered ? `${project.color}40` : 'rgba(79,142,247,0.1)'}`,
        boxShadow: hovered ? `0 0 40px ${project.color}15` : 'none',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — fills remaining height for tall (row-span) cards, fixed ratio otherwise */}
      <div className={`relative overflow-hidden ${isTall ? 'flex-1 min-h-0' : 'aspect-video'}`}>
        <AppImage
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 20%, var(--card) 100%), linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
          }}
        />

        {project.badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
              color: '#fff',
              boxShadow: `0 0 15px ${project.color}60`,
            }}
          >
            {project.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-shrink-0" style={{ background: 'var(--card)' }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-foreground text-lg leading-tight">{project.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{project.subtitle}</p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-all duration-300"
            style={{
              background: hovered ? `${project.color}20` : 'transparent',
              border: `1px solid ${hovered ? project.color : 'rgba(79,142,247,0.2)'}`,
              transform: hovered ? 'rotate(-45deg)' : 'none',
            }}
          >
            <Icon name="ArrowRightIcon" size={14} className="text-foreground" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs rounded"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 text-xs text-muted-foreground rounded border border-border">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          background: 'var(--card)',
          border: `1px solid ${project.color}30`,
          boxShadow: `0 0 80px ${project.color}20`,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          style={{ background: 'var(--background)', border: '1px solid rgba(79,142,247,0.2)' }}
          aria-label="Close modal"
        >
          <Icon name="XMarkIcon" size={16} className="text-foreground" />
        </button>

        {/* Hero image */}
        <div className="relative aspect-video">
          <AppImage
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover"
            priority
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 30%, var(--card) 100%)`,
            }}
          />

          {project.badge && (
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
                color: '#fff',
              }}
            >
              {project.badge}
            </div>
          )}
        </div>

        {/* Modal content */}
        <div className="p-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-1">{project.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{project.subtitle}</p>

          <div>
            <div className="section-label mb-2" style={{ color: project.color }}></div>
          </div>

          <p className="text-sm text-secondary-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mb-8">
            <div className="section-label mb-3">Tags</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs font-bold rounded-full"
                  style={{
                    background: `${project.color}10`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.demo && (
              <a
                href={project.demo}
                className="btn-primary flex-1 text-center text-sm py-3 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
                }}
              >
                <span>Live Demo</span>
                <Icon name="ArrowTopRightOnSquareIcon" size={14} className="text-white" />
              </a>
            )}
            <a
              href={project.Access}
              className="btn-ghost flex-1 text-center text-sm py-3 flex items-center justify-center gap-2"
            >
              <Icon name="CodeBracketIcon" size={14} className="text-foreground" />
              Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
