import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import Anthropic from '@anthropic-ai/sdk';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Secret-gated generic Claude proxy. Lets the Sol dashboard run a tool-calling
// agent on the Max subscription without holding the OAuth token itself: the
// dashboard sends system/messages/tools, this route adds the required Claude
// Code identity block + oauth beta header and returns the raw Anthropic
// response (content blocks + stop_reason) so the dashboard can run the tool loop.
function authorised(req: NextRequest): boolean {
  const secret = process.env.SOPHIE_PREVIEW_SECRET;
  const provided = req.headers.get('x-sophie-preview');
  if (!secret || !provided) return false;
  const a = Buffer.from(secret);
  const b = Buffer.from(provided);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  if (!authorised(req)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const authToken = process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (!authToken) {
    return NextResponse.json({ error: 'agent not configured' }, { status: 503 });
  }
  try {
    const body = await req.json() as {
      system?: string;
      messages: Anthropic.MessageParam[];
      tools?: Anthropic.Tool[];
      model?: string;
      max_tokens?: number;
    };
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: 'messages required' }, { status: 400 });
    }

    const client = new Anthropic({
      authToken,
      defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' },
    });

    const system: Anthropic.TextBlockParam[] = [
      { type: 'text', text: "You are Claude Code, Anthropic's official CLI for Claude." },
    ];
    if (body.system) system.push({ type: 'text', text: body.system });

    const response = await client.messages.create({
      model: body.model || 'claude-opus-4-8',
      max_tokens: Math.min(Math.max(body.max_tokens ?? 2048, 256), 8192),
      system,
      messages: body.messages,
      ...(body.tools && body.tools.length > 0 ? { tools: body.tools } : {}),
    });

    return NextResponse.json({
      ok: true,
      content: response.content,
      stop_reason: response.stop_reason,
    });
  } catch (error) {
    console.error('Agent proxy error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'agent error' },
      { status: 500 },
    );
  }
}
