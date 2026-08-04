'use client';

import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ResponsePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/responses');
      if (!res.ok) throw new Error('Failed to fetch responses');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 py-20 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 focus:outline-none">
              <AppLogo size={40} />
              <div>
                <h1 className="font-display text-2xl font-bold uppercase tracking-[0.2em]">
                  Manoj<span className="gradient-text">Kumar</span>
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Responses Dashboard
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card text-foreground border border-border rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary transition-all w-full sm:w-64"
            />
            <button
              onClick={() => {
                setLoading(true);
                fetchMessages();
              }}
              className="btn-ghost text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <p className="text-sm text-muted-foreground uppercase tracking-widest animate-pulse">
              Loading submissions...
            </p>
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto border-red-500/20">
            <p className="text-red-400 font-semibold mb-4">Error loading messages</p>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <button onClick={fetchMessages} className="btn-primary py-2 px-6 rounded-xl">
              <span>Try Again</span>
            </button>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto">
            <p className="text-lg text-secondary-foreground font-display font-medium mb-2">
              No submissions found
            </p>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? 'Try adjusting your search query.'
                : 'Submissions from the contact form will show up here.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredMessages.map((msg) => (
              <div
                key={msg._id}
                className="glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{msg.name}</h3>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-primary hover:underline transition-all"
                      >
                        {msg.email}
                      </a>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap bg-muted px-2 py-1 rounded">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="border-t border-border/50 pt-4 mt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent/80 block mb-1">
                      Subject
                    </span>
                    <h4 className="font-medium text-foreground text-sm mb-3">{msg.subject}</h4>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 block mb-1">
                      Message
                    </span>
                    <p className="text-sm text-secondary-foreground whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
