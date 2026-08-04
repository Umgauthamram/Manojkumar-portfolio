import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Database client not initialized.' }, { status: 500 });
    }
    const db = client.db();
    const messages = await db.collection('messages').find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ messages });
  } catch (err) {
    console.error('[responses api] unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
