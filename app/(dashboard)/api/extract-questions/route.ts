import { NextResponse } from 'next/server';
import { dummyQuestions } from '@/lib/dummy-data';

// Simulate network delay for AI processing
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  // Simulate AI processing time (would be longer in production)
  await delay(2000);
  
  const body = await request.json();
  const { vacancyId } = body;
  
  if (!vacancyId) {
    return NextResponse.json(
      { error: 'vacancyId is required' },
      { status: 400 }
    );
  }
  
  // In a real app, this would:
  // 1. Fetch the vacancy details
  // 2. Send to an AI model to extract relevant questions
  // 3. Return the generated questions
  
  // For now, return dummy questions with slight variations
  const questions = dummyQuestions.map(q => ({
    ...q,
    id: `${q.id}-${vacancyId}`,
  }));
  
  return NextResponse.json(questions);
}
