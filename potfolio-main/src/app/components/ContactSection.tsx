'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: 'CodeBracketIcon',
    href: 'https://github.com/Manojmanoj3',
    color: '#A8ABBE',
  },
  {
    name: 'LinkedIn',
    icon: 'BriefcaseIcon',
    href: 'https://www.linkedin.com/in/manoj-kumar-b7572b230?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    color: '#0A66C2',
  },
  {
    name: 'Instagram',
    icon: 'ChatBubbleLeftIcon',
    href: 'https://www.instagram.com/___lovely__manoj___?igsh=MWxvcHpvdGQwNmlyag==',
    color: '#4F8EF7',
  },
  { name: 'Email', icon: 'EnvelopeIcon', href: 'convey2manojkumar@gmail.com', color: '#7C3AED' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // honeypot
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'Failed to send. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(26,26,46,0.5)',
    border: '1px solid rgba(79,142,247,0.15)',
    borderRadius: '0.75rem',
    padding: '0.875rem 1.125rem',
    color: '#E8EAF0',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontFamily: 'var(--font-sans)',
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 md:px-10 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(79,142,247,0.05) 0%, transparent 70%)',
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
          <span className="section-label">Contact</span>
          <span className="h-px flex-1 max-w-24 bg-primary opacity-20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s',
            }}
          >
            <h2 className="font-display text-display text-foreground mb-6">
              Let&apos;s Built
              <br />
              <span className="gradient-text italic">something great.</span>
            </h2>

            <p className="text-secondary-foreground leading-relaxed mb-10">
              Transforming Ideas into Achivements.
            </p>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full mb-10"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.25)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-bold text-green-400">Responsive</span>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <div className="section-label mb-4">Connect</div>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group"
                  style={{
                    border: '1px solid rgba(79,142,247,0.1)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${link.color}40`;
                    (e.currentTarget as HTMLAnchorElement).style.background = `${link.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      'rgba(79,142,247,0.1)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
                  >
                    <Icon name={link.icon as never} size={16} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{link.name}</span>
                  <Icon
                    name="ArrowRightIcon"
                    size={14}
                    className="ml-auto text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s',
            }}
          >
            {status === 'sent' ? (
              <div
                className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[500px]"
                style={{ border: '1px solid rgba(79,142,247,0.2)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 orb-pulse"
                  style={{ background: 'linear-gradient(135deg, #4F8EF7, #7C3AED)' }}
                >
                  <Icon name="CheckIcon" size={28} className="text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Message received.
                </h3>
                <p className="text-secondary-foreground leading-relaxed">
                  Nova Star has logged your message. I&apos;ll respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({ name: '', email: '', subject: '', message: '', website: '' });
                  }}
                  className="mt-8 btn-ghost text-sm px-6 py-3"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 space-y-5"
                style={{ border: '1px solid rgba(79,142,247,0.15)' }}
              >
                {/* Honeypot — hidden from users, visible to bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = 'rgba(79,142,247,0.5)';
                        (e.target as HTMLInputElement).style.boxShadow =
                          '0 0 15px rgba(79,142,247,0.1)';
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = 'rgba(79,142,247,0.15)';
                        (e.target as HTMLInputElement).style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className="section-label block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = 'rgba(79,142,247,0.5)';
                        (e.target as HTMLInputElement).style.boxShadow =
                          '0 0 15px rgba(79,142,247,0.1)';
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = 'rgba(79,142,247,0.15)';
                        (e.target as HTMLInputElement).style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="section-label block mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(79,142,247,0.5)';
                      (e.target as HTMLInputElement).style.boxShadow =
                        '0 0 15px rgba(79,142,247,0.1)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(79,142,247,0.15)';
                      (e.target as HTMLInputElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label className="section-label block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, role, or idea..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(79,142,247,0.5)';
                      (e.target as HTMLTextAreaElement).style.boxShadow =
                        '0 0 15px rgba(79,142,247,0.1)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(79,142,247,0.15)';
                      (e.target as HTMLTextAreaElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                {status === 'error' && error && (
                  <div
                    role="alert"
                    className="rounded-xl px-4 py-3 text-xs"
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#FCA5A5',
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-3"
                >
                  <span>{status === 'sending' ? 'Transmitting...' : 'Send Message'}</span>
                  {status === 'sending' ? (
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      style={{ animation: 'spin-slow 0.8s linear infinite' }}
                    />
                  ) : (
                    <Icon name="PaperAirplaneIcon" size={16} className="text-white" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
