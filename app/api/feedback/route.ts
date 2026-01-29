import { NextResponse } from 'next/server';
import { Question, ChatMessage } from '@/lib/types';

// Simulate network delay for AI processing
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Sample AI responses based on common feedback patterns
const aiResponses: Record<string, string> = {
  default: 'Bedankt voor je feedback! Ik heb de vragen aangepast. Bekijk de wijzigingen in het Vragen tabblad.',
  add: 'Ik heb een nieuwe vraag toegevoegd op basis van je suggestie.',
  remove: 'Ik heb de vraag verwijderd zoals gevraagd.',
  edit: 'De vraag is aangepast volgens je feedback.',
  reorder: 'De volgorde van de vragen is aangepast.',
};

export async function POST(request: Request) {
  // Simulate AI processing time
  await delay(1500);
  
  const body = await request.json();
  const { vacancyId, message, questions } = body;
  
  if (!vacancyId || !message) {
    return NextResponse.json(
      { error: 'vacancyId and message are required' },
      { status: 400 }
    );
  }
  
  // Determine response based on message content
  let responseText = aiResponses.default;
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('toevoegen') || lowerMessage.includes('add')) {
    responseText = aiResponses.add;
  } else if (lowerMessage.includes('verwijder') || lowerMessage.includes('remove')) {
    responseText = aiResponses.remove;
  } else if (lowerMessage.includes('wijzig') || lowerMessage.includes('aanpassen') || lowerMessage.includes('edit')) {
    responseText = aiResponses.edit;
  } else if (lowerMessage.includes('volgorde') || lowerMessage.includes('order')) {
    responseText = aiResponses.reorder;
  }
  
  // Create assistant message
  const assistantMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: `${responseText} Je feedback was: "${message}"`,
    timestamp: new Date().toISOString(),
  };
  
  // In a real app, the AI would actually modify the questions
  // For now, return the questions unchanged
  const updatedQuestions: Question[] = questions || [];
  
  return NextResponse.json({
    message: assistantMessage,
    updatedQuestions,
  });
}
