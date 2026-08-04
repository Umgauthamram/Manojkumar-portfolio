import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

export const runtime = 'nodejs';

// Tiny in-memory rate limiter: 3 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const buckets = new Map<string, number[]>();

function rateLimit(ip: string) {
  const now = Date.now();
  const arr = (buckets.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return false;
  arr.push(now);
  buckets.set(ip, arr);
  return true;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

    const { name, email, subject, message, website } = body as Record<string, string>;

    // Honeypot — bots fill hidden fields, real users do not.
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Field too long.' }, { status: 400 });
    }

    // Store message in MongoDB
    try {
      const client = await clientPromise;
      if (client) {
        const db = client.db();
        await db.collection('messages').insertOne({
          name,
          email,
          subject,
          message,
          createdAt: new Date(),
        });
      }
    } catch (dbErr) {
      console.error('[contact] DB save error:', dbErr);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || 'epic.2077.uni@gmail.com';
    const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

    // If API key is missing, we can still succeed since we stored in MongoDB
    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY is not set. Saved to DB, but skipped sending email.');
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px;">
        <h2 style="color: #4F8EF7;">New portfolio message</h2>
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      // Since it's saved in DB, return success to user but log warning
      return NextResponse.json({ ok: true, warning: 'Email delivery failed, but message saved.' });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
