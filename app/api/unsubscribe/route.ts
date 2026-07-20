import { NextRequest, NextResponse } from 'next/server';

const DBR_ENGINE_URL = process.env.DBR_ENGINE_URL || 'https://dbr.coldlava.ai';

export async function POST(request: NextRequest) {
  try {
    const { lead } = (await request.json()) as { lead?: string };
    if (!lead || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lead)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const res = await fetch(`${DBR_ENGINE_URL}/public/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead_id: lead }),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
