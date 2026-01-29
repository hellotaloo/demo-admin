import { Vacancy, Question, ChatMessage, Agent } from './types';

const API_BASE = '/api';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Vacancies API
export async function getVacancies(): Promise<Vacancy[]> {
  const response = await fetch(`${API_BASE}/vacancies`);
  if (!response.ok) throw new Error('Failed to fetch vacancies');
  return response.json();
}

export async function getVacancy(id: string): Promise<Vacancy> {
  const response = await fetch(`${API_BASE}/vacancies/${id}`);
  if (!response.ok) throw new Error('Failed to fetch vacancy');
  return response.json();
}

// Questions API
export async function extractQuestions(vacancyId: string): Promise<Question[]> {
  const response = await fetch(`${API_BASE}/extract-questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vacancyId }),
  });
  if (!response.ok) throw new Error('Failed to extract questions');
  return response.json();
}

// Feedback API
export async function sendFeedback(
  vacancyId: string,
  message: string,
  questions: Question[]
): Promise<{ message: ChatMessage; updatedQuestions: Question[] }> {
  const response = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vacancyId, message, questions }),
  });
  if (!response.ok) throw new Error('Failed to send feedback');
  return response.json();
}

// Agent API
export async function createAgent(
  vacancyId: string,
  questions: Question[]
): Promise<Agent> {
  const response = await fetch(`${API_BASE}/create-agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vacancyId, questions }),
  });
  if (!response.ok) throw new Error('Failed to create agent');
  return response.json();
}

export async function testAgent(agentId: string, phoneNumber: string): Promise<{ success: boolean }> {
  // This would trigger a test call/message to the phone number
  await delay(1000);
  return { success: true };
}
