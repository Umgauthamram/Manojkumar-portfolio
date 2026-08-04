'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type Command = {
  id: string;
  label: string;
  hint: string;
  icon: string;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActiveIdx(0);
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    close();
  };

  const commands: Command[] = useMemo(
    () => [
      {
        id: 'about',
        label: 'Go to About',
        hint: 'Section',
        icon: 'UserIcon',
        run: () => scrollTo('#about'),
      },
      {
        id: 'skills',
        label: 'Go to Skills',
        hint: 'Section',
        icon: 'SparklesIcon',
        run: () => scrollTo('#skills'),
      },
      {
        id: 'projects',
        label: 'Go to Projects',
        hint: 'Section',
        icon: 'RectangleGroupIcon',
        run: () => scrollTo('#projects'),
      },
      {
        id: 'experience',
        label: 'Go to Experience',
        hint: 'Section',
        icon: 'BriefcaseIcon',
        run: () => scrollTo('#experience'),
      },
      {
        id: 'contact',
        label: 'Go to Contact',
        hint: 'Section',
        icon: 'EnvelopeIcon',
        run: () => scrollTo('#contact'),
      },
      {
        id: 'top',
        label: 'Scroll to top',
        hint: 'Action',
        icon: 'ArrowUpIcon',
        run: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          close();
        },
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: 'epic.2077.uni@gmail.com',
        icon: 'ClipboardIcon',
        run: () => {
          navigator.clipboard?.writeText('epic.2077.uni@gmail.com').catch(() => {});
          close();
        },
      },
      {
        id: 'github',
        label: 'Open GitHub',
        hint: 'github.com/Epic2077',
        icon: 'CodeBracketIcon',
        run: () => {
          window.open('https://github.com/Epic2077', '_blank', 'noopener,noreferrer');
          close();
        },
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: 'linkedin.com/in/mohammadhosseinsadeghi',
        icon: 'BriefcaseIcon',
        run: () => {
          window.open(
            'https://www.linkedin.com/in/mohammadhosseinsadeghi/',
            '_blank',
            'noopener,noreferrer'
          );
          close();
        },
      },
      {
        id: 'resume',
        label: 'Download resume',
        hint: 'PDF',
        icon: 'DocumentArrowDownIcon',
        run: () => {
          window.open('/assets/Ashkan-resume.pdf', '_blank', 'noopener,noreferrer');
          close();
        },
      },
    ],
    // scrollTo/close are stable closures over setState — safe to omit
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Global hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape' && open) {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Reset active index when filtering
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  if (!open) return null;

  const onListKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIdx]?.run();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      style={{ background: 'rgba(5,5,8,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(13,13,24,0.95)',
          border: '1px solid rgba(79,142,247,0.25)',
          boxShadow: '0 0 60px rgba(79,142,247,0.15), 0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(79,142,247,0.12)' }}
        >
          <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onListKey}
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground"
          />
          <kbd
            className="text-[10px] font-mono px-2 py-1 rounded text-muted-foreground"
            style={{ border: '1px solid rgba(79,142,247,0.2)' }}
          >
            ESC
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="px-5 py-6 text-sm text-muted-foreground text-center">
              No commands match &ldquo;{query}&rdquo;
            </div>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              type="button"
              onClick={cmd.run}
              onMouseEnter={() => setActiveIdx(i)}
              className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors"
              style={{
                background: i === activeIdx ? 'rgba(79,142,247,0.08)' : 'transparent',
                color: i === activeIdx ? '#4F8EF7' : '#E8EAF0',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(79,142,247,0.08)',
                  border: '1px solid rgba(79,142,247,0.15)',
                }}
              >
                <Icon name={cmd.icon as never} size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{cmd.label}</div>
                <div className="text-xs text-muted-foreground truncate">{cmd.hint}</div>
              </div>
              {i === activeIdx && (
                <kbd
                  className="text-[10px] font-mono px-2 py-1 rounded text-primary"
                  style={{ border: '1px solid rgba(79,142,247,0.3)' }}
                >
                  ↵
                </kbd>
              )}
            </button>
          ))}
        </div>
        <div
          className="flex items-center gap-4 px-5 py-3 text-[10px] font-mono text-muted-foreground"
          style={{ borderTop: '1px solid rgba(79,142,247,0.08)' }}
        >
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
          <span className="ml-auto">⌘K to toggle</span>
        </div>
      </div>
    </div>
  );
}
