import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/vapi/outbound
 *
 * Triggers an outbound call via VAPI using a squad.
 *
 * Query params:
 * - phoneNumber: The phone number to call (required, e.g., +32487441391)
 * - squadId: Override the default squad (optional)
 *
 * Example: /api/vapi/outbound?phoneNumber=32487441391
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let phoneNumber = searchParams.get('phoneNumber');
  const squadId = searchParams.get('squadId') || process.env.VAPI_SQUAD_ID;

  // Validate required params
  if (!phoneNumber) {
    return NextResponse.json(
      { error: 'Missing required parameter: phoneNumber' },
      { status: 400 }
    );
  }

  // Fix URL encoding: + becomes space, so restore it for E.164 format
  phoneNumber = phoneNumber.trim();
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = '+' + phoneNumber;
  }

  // Validate environment variables
  const apiKey = process.env.VAPI_API_KEY;
  const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'VAPI_API_KEY not configured' },
      { status: 500 }
    );
  }

  if (!phoneNumberId) {
    return NextResponse.json(
      { error: 'VAPI_PHONE_NUMBER_ID not configured. Get this from VAPI Dashboard → Phone Numbers → click your number → copy the UUID' },
      { status: 500 }
    );
  }

  if (!squadId) {
    return NextResponse.json(
      { error: 'VAPI_SQUAD_ID not configured and not provided' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        squadId,
        phoneNumberId,
        customer: {
          number: phoneNumber,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('VAPI API error:', data);
      return NextResponse.json(
        { error: 'Failed to initiate call', details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      callId: data.id,
      status: data.status,
      message: `Call initiated to ${phoneNumber}`,
    });
  } catch (error) {
    console.error('Error calling VAPI:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
