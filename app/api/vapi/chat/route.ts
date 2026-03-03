import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, previousChatId } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // VAPI Configuration
    const VAPI_CONFIG = {
      assistantId: process.env.VAPI_ASSISTANT_ID || 'd8b50524-1f09-44b8-8002-bcaf88cd4d0d',
      apiKey: process.env.VAPI_API_KEY || 'a025d33b-8e6a-45ee-bda4-ec22db21e1b6',
    };

    // Build payload for VAPI
    const payload: any = {
      assistantId: VAPI_CONFIG.assistantId,
      input: input.trim(),
    };

    // Include previous chat ID for conversation continuity
    if (previousChatId) {
      payload.previousChatId = previousChatId;
    }

    // Call VAPI Chat API from server-side
    const response = await fetch('https://api.vapi.ai/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('VAPI API Error:', response.status, errorData);

      return NextResponse.json(
        {
          error: 'Chat service temporarily unavailable',
          details: response.status === 401 ? 'Authentication failed' : 'Service error'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the VAPI response
    return NextResponse.json(data);

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
