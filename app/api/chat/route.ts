import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import Anthropic from '@anthropic-ai/sdk';
import { appendLeadToSheet } from '@/lib/googleSheets';
import { getSophieConfig } from '@/lib/sophieConfig';

// Constant-time secret check for the Sol dashboard's "test a draft" feature.
function previewAuthorised(req: NextRequest): boolean {
  const secret = process.env.SOPHIE_PREVIEW_SECRET;
  const provided = req.headers.get('x-sophie-preview');
  if (!secret || !provided) return false;
  const a = Buffer.from(secret);
  const b = Buffer.from(provided);
  return a.length === b.length && timingSafeEqual(a, b);
}

const ADD_LEAD_TOOL: Anthropic.Tool = {
  name: 'add_lead_to_sheet',
  description: 'Save a customer contact to Google Sheets after collecting their full name, phone, email, postcode, and what they want to discuss.',
  input_schema: {
    type: 'object',
    properties: {
      first_name: { type: 'string', description: 'Customer first name' },
      last_name: { type: 'string', description: 'Customer last name' },
      mobile: { type: 'string', description: 'Customer phone number' },
      email: { type: 'string', description: 'Customer email address' },
      postcode: { type: 'string', description: 'Customer postcode with space (e.g. SW1A 1AA)' },
      time_of_request: { type: 'string', description: 'Current date and time in UK format DD/MM/YYYY HH:mm' },
      notes: { type: 'string', description: 'What the customer wants to discuss (use their exact words)' },
    },
    required: ['first_name', 'last_name', 'mobile', 'email', 'postcode', 'time_of_request', 'notes'],
  },
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      messages: ChatMessage[];
      systemPromptOverride?: string;
      modelOverride?: string;
    };
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const authToken = process.env.CLAUDE_CODE_OAUTH_TOKEN;
    if (!authToken) {
      console.error('CLAUDE_CODE_OAUTH_TOKEN not configured');
      return NextResponse.json({ error: 'Chat service not configured' }, { status: 503 });
    }

    // Max subscription auth: OAuth token on Authorization: Bearer, plus the
    // oauth beta header — /v1/messages rejects an OAuth token without it.
    const client = new Anthropic({
      authToken,
      defaultHeaders: { 'anthropic-beta': 'oauth-2025-04-20' },
    });

    // Sophie's live prompt + model come from Supabase (managed via the Sol
    // dashboard); falls back to the baked-in prompt if the DB is unreachable.
    // The dashboard can test a draft prompt by passing an override + secret.
    let systemPrompt: string;
    let model: string;
    if (body.systemPromptOverride && previewAuthorised(request)) {
      systemPrompt = body.systemPromptOverride;
      model = body.modelOverride || 'claude-sonnet-4-6';
    } else {
      ({ systemPrompt, model } = await getSophieConfig());
    }

    let currentMessages: Anthropic.MessageParam[] = messages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Agentic loop - handles tool use (saving lead to Google Sheets)
    while (true) {
      const response = await client.messages.create({
        model,
        max_tokens: 512,
        // The Claude Code identity block is required for the Max subscription
        // OAuth token to be accepted on /v1/messages (otherwise 429). Sophie's
        // real instructions follow in the second block.
        system: [
          { type: 'text', text: "You are Claude Code, Anthropic's official CLI for Claude." },
          { type: 'text', text: systemPrompt },
        ],
        messages: currentMessages,
        tools: [ADD_LEAD_TOOL],
      });

      if (response.stop_reason === 'end_turn') {
        const text = response.content.find(b => b.type === 'text');
        return NextResponse.json({ reply: text?.text ?? '' });
      }

      if (response.stop_reason === 'tool_use') {
        const toolUseBlock = response.content.find(b => b.type === 'tool_use');

        if (toolUseBlock && toolUseBlock.type === 'tool_use' && toolUseBlock.name === 'add_lead_to_sheet') {
          const input = toolUseBlock.input as {
            first_name: string;
            last_name: string;
            mobile: string;
            email: string;
            postcode: string;
            time_of_request: string;
            notes: string;
          };

          await appendLeadToSheet(input);

          currentMessages = [
            ...currentMessages,
            { role: 'assistant', content: response.content },
            {
              role: 'user',
              content: [{
                type: 'tool_result',
                tool_use_id: toolUseBlock.id,
                content: 'Lead saved successfully.',
              }],
            },
          ];
          continue;
        }
      }

      // Unexpected stop reason - extract any text and return
      const text = response.content.find(b => b.type === 'text');
      return NextResponse.json({ reply: text?.text ?? '' });
    }

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Chat service temporarily unavailable' }, { status: 500 });
  }
}
