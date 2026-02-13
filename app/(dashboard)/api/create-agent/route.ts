import { NextResponse } from 'next/server';
import { Agent } from '@/lib/types';

// Simulate network delay for agent creation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  // Simulate agent creation time
  await delay(2000);
  
  const body = await request.json();
  const { vacancyId, questions } = body;
  
  if (!vacancyId) {
    return NextResponse.json(
      { error: 'vacancyId is required' },
      { status: 400 }
    );
  }
  
  if (!questions || questions.length === 0) {
    return NextResponse.json(
      { error: 'At least one question is required' },
      { status: 400 }
    );
  }
  
  // In a real app, this would:
  // 1. Create a WhatsApp Business API configuration
  // 2. Set up the conversation flow
  // 3. Register webhooks
  // 4. Return the agent details
  
  const agent: Agent = {
    id: `agent-${Date.now()}`,
    vacancyId,
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  
  return NextResponse.json(agent, { status: 201 });
}

// Test agent endpoint
export async function PUT(request: Request) {
  await delay(1500);
  
  const body = await request.json();
  const { agentId, phoneNumber } = body;
  
  if (!agentId || !phoneNumber) {
    return NextResponse.json(
      { error: 'agentId and phoneNumber are required' },
      { status: 400 }
    );
  }
  
  // Validate phone number format (basic validation)
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
    return NextResponse.json(
      { error: 'Invalid phone number format' },
      { status: 400 }
    );
  }
  
  // In a real app, this would:
  // 1. Send a test message via WhatsApp Business API
  // 2. Log the test attempt
  // 3. Return success/failure status
  
  return NextResponse.json({
    success: true,
    message: `Test message sent to ${phoneNumber}`,
  });
}
