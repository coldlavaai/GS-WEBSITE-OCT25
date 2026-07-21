import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual, createHash } from 'crypto';
import { getSophieConfig } from '@/lib/sophieConfig';

export const dynamic = 'force-dynamic';

// Reports what Sophie is ACTUALLY serving right now (respecting her short config
// cache), so the Sol dashboard can verify that a publish has gone live. Returns
// the live version + a hash of the assembled system prompt. Secret-gated.
function authorised(req: NextRequest): boolean {
  const secret = process.env.SOPHIE_PREVIEW_SECRET;
  const provided = req.headers.get('x-sophie-preview');
  if (!secret || !provided) return false;
  const a = Buffer.from(secret);
  const b = Buffer.from(provided);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: NextRequest) {
  if (!authorised(req)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }
  try {
    const cfg = await getSophieConfig();
    const hash = createHash('sha256').update(cfg.systemPrompt).digest('hex');
    return NextResponse.json({
      ok: true,
      version: cfg.version,
      model: cfg.model,
      style: cfg.style,
      hash,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'status failed' },
      { status: 500 },
    );
  }
}
