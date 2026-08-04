'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import AnimatedNumber from '@/app/components/AnimatedNumber';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SPECIALTIES = ['React.js', 'Next.js', 'TypeScript', 'UI Engineering', 'AI Products'];

const TERMINAL_LINES = [
  { text: '> Initializing Nova Star AI...', delay: 0, color: '#4F8EF7' },
  { text: '> Loading portfolio assets...', delay: 600, color: '#A8ABBE' },
  { text: '> Systems online. Welcome.', delay: 1200, color: '#06B6D4' },
  { text: '> ashkan@epic2077 ~ $', delay: 1800, color: '#4F8EF7', cursor: true },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [specialtyIdx, setSpecialtyIdx] = useState(0);
  const [terminalLines, setTerminalLines] = useState<typeof TERMINAL_LINES>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  // Animated grid canvas
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let offset = 0;
    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(79,142,247,0.08)';
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines with scroll offset
      for (let y = (offset % gridSize) - gridSize; y <= canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Bright intersection dots
      ctx.fillStyle = 'rgba(79,142,247,0.15)';
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = (offset % gridSize) - gridSize; y <= canvas.height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      offset += 0.4;
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  // Terminal lines reveal
  useEffect(() => {
    TERMINAL_LINES.forEach((line) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, 2200 + line.delay);
    });
  }, []);

  // Rotating specialties
  useEffect(() => {
    const t = setInterval(() => {
      setSpecialtyIdx((i) => (i + 1) % SPECIALTIES.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // Parallax mouse
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      id="hero"
    >
      {/* Animated grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ opacity: 1 }} />

      {/* Radial glow blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(79,142,247,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 40%, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Parallax floating accent circles */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 0.3s ease',
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-10 md:pt-28 pb-16 md:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero text */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="section-label">Designer / Project Associate</span>
              <span className="h-px flex-1 max-w-16 bg-primary opacity-30" />
              <span className="text-xs text-muted-foreground font-mono">Chennai</span>
            </div>

            {/* Main headline */}
            <div>
              <h1 className="font-display text-hero text-foreground leading-tight">
                Hi, I&apos;m <span className="gradient-text italic">Manoj.</span>
              </h1>
              <p className="font-display text-display text-secondary-foreground font-light mt-2">
                I build exceptional
                <br />
                <span className="text-foreground font-normal">Digital experiences.</span>
              </p>
            </div>

            {/* Rotating specialty */}
            <div className="flex items-center gap-3 h-8">
              <span className="text-muted-foreground text-sm">Specializing in</span>
              <div className="relative overflow-hidden h-8 flex items-center">
                {SPECIALTIES.map((s, i) => (
                  <span
                    key={s}
                    className="absolute left-0 font-bold text-sm gradient-text transition-all duration-500"
                    style={{
                      opacity: i === specialtyIdx ? 1 : 0,
                      transform:
                        i === specialtyIdx
                          ? 'translateY(0)'
                          : i < specialtyIdx
                            ? 'translateY(-100%)'
                            : 'translateY(100%)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => handleScroll('#projects')} className="btn-primary">
                <span>View Projects</span>
              </button>
              <button onClick={() => handleScroll('#contact')} className="btn-ghost">
                Contact Me
              </button>
              <a
                href="/assets/Manojkumar Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2"
              >
                <span>Download CV</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-border">
              {[
                { num: 300, suffix: '+', label: 'Designs Created' },
                { num: 50, suffix: '+', label: 'Executive Presentation' },
                { num: 7, suffix: '+', label: 'Projects Shipped' },
                { num: 3, suffix: '', label: 'Companies' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold gradient-text">
                    <AnimatedNumber value={stat.num} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div
            className="hidden lg:block"
            style={{
              transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
              transition: 'transform 0.4s ease',
            }}
          >
            <div className="relative flex items-center justify-center w-full h-[600px]">
              {/* Gradient Circle */}
              <div
                className="absolute w-[420px] h-[420px] rounded-full
      bg-gradient-to-br
      from-fuchsia-500
      via-purple-600
      to-blue-500
      blur-sm opacity-90"
              ></div>

              {/* Decorative Rings */}
              <div className="absolute w-[470px] h-[470px] border border-purple-500/30 rounded-full"></div>

              <div className="absolute top-20 right-10 w-5 h-5 border border-pink-400 rounded-full"></div>

              <div className="absolute bottom-28 left-10 w-4 h-4 border border-cyan-400 rounded-full"></div>

              <div className="absolute top-52 left-8 w-2 h-2 bg-pink-500 rounded-full"></div>

              <div className="absolute bottom-44 right-12 w-2 h-2 bg-cyan-400 rounded-full"></div>

              {/* Profile Image */}

              <img
                src="/assets/images/Manoj1.png"
                alt="Manoj"
                className="relative z-10 h-[540px] object-contain"
              />

              {/* Experience Card */}

              <div
                className="absolute bottom-20 right-2
      backdrop-blur-xl
      bg-white/10
      border border-white/20
      rounded-2xl
      px-6
      py-5
      shadow-2xl"
              >
                <h2 className="text-4xl font-bold text-white">5+</h2>

                <p className="text-sm text-gray-300">Years of</p>

                <p className="text-sm text-gray-300">Experience</p>
              </div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-32 right-40 w-1 h-1 bg-pink-400 rounded-full"></div>

              <div className="absolute top-44 left-16 w-1 h-1 bg-blue-400 rounded-full"></div>

              <div className="absolute bottom-40 left-24 w-2 h-2 bg-purple-500 rounded-full"></div>

              <div className="absolute top-48 right-16 rotate-45">
                <div className="w-8 h-[2px] bg-pink-500"></div>

                <div className="w-[2px] h-8 bg-pink-500 absolute top-[-14px] left-[15px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden bg-border">
          <div
            className="absolute top-0 left-0 w-full bg-primary"
            style={{
              height: '100%',
              animation: 'scan-line 2s ease-in-out infinite',
              background: 'linear-gradient(180deg, transparent, #4F8EF7, transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
