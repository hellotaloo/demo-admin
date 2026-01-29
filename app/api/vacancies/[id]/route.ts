import { NextResponse } from 'next/server';
import { dummyVacancies } from '@/lib/dummy-data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(300);
  
  const { id } = await params;
  const vacancy = dummyVacancies.find(v => v.id === id);
  
  if (!vacancy) {
    return NextResponse.json(
      { error: 'Vacancy not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(vacancy);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(300);
  
  const { id } = await params;
  const body = await request.json();
  const vacancyIndex = dummyVacancies.findIndex(v => v.id === id);
  
  if (vacancyIndex === -1) {
    return NextResponse.json(
      { error: 'Vacancy not found' },
      { status: 404 }
    );
  }
  
  // In a real app, this would update the vacancy in the database
  const updatedVacancy = {
    ...dummyVacancies[vacancyIndex],
    ...body,
  };
  
  return NextResponse.json(updatedVacancy);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(300);
  
  const { id } = await params;
  const vacancyIndex = dummyVacancies.findIndex(v => v.id === id);
  
  if (vacancyIndex === -1) {
    return NextResponse.json(
      { error: 'Vacancy not found' },
      { status: 404 }
    );
  }
  
  // In a real app, this would delete the vacancy from the database
  return NextResponse.json({ success: true });
}
