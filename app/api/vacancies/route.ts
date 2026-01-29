import { NextResponse } from 'next/server';
import { dummyVacancies } from '@/lib/dummy-data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
  // Simulate API latency
  await delay(500);
  
  return NextResponse.json(dummyVacancies);
}

export async function POST(request: Request) {
  await delay(500);
  
  const body = await request.json();
  
  // In a real app, this would create a new vacancy in the database
  const newVacancy = {
    id: `${Date.now()}`,
    ...body,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  
  return NextResponse.json(newVacancy, { status: 201 });
}
