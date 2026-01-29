'use client';

import { use, useState, useEffect } from 'react';
import { InterviewQuestionsPanel } from '@/components/chat/InterviewQuestionsPanel';
import { InterviewAssistant } from '@/components/chat/InterviewAssistant';
import { GeneratedQuestion } from '@/components/chat/QuestionListMessage';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Mock vacancy data - in real app this would come from API/database
const mockVacancy = {
  id: 'operator-diest',
  title: 'Operator (2-ploegen)',
  company: 'Klant regio Diest',
  location: 'Diest, België',
  description: `### Over deze job
Samen met onze klant, gelegen regio Diest, zijn we op zoek naar een operator die graag in 2 ploegen wilt werken.

### Jouw verantwoordelijkheden
- Instellen van machines
- De bevoorrading van de werkplaatsen of productielijnen met materiaal opvolgen en controleren
- Productielijn opvolgen en controleren
- Storingen oplossen
- Kwaliteitscontroles
- Het opvolgen van de hygiënevoorschriften
- Collega's aansturen waar nodig

### Kwalificaties
- Je bezit een technische achtergrond
- Zin voor initiatief: uit eigen beweging gepaste acties ondernemen
- Je kan goed communiceren en kan jouw kennis en vaardigheden op een duidelijke manier overbrengen
- Mensgericht zijn om goed met mensen te kunnen omgaan

### Ontwikkeling en groei
- Snelle opstart is mogelijk
- Aantrekkelijk salaris van €17,59/uur, maaltijdcheques + ploegenpremie
- Fulltime betrekking
- Optie tot een vast contract
- Je zal werken in een twee ploegensysteem
- Variatie in je takenpakket
- Opleiding op de werkvloer
- Mogelijkheid om door te groeien tot lijnverantwoordelijke

Diversiteit en inclusie zijn belangrijk voor ons. Onze vacatures staan dan ook open voor iedereen, ongeacht leeftijd, gender of afkomst. Samen gaan we op zoek naar de ideale jobmatch.`,
};

// Mock generated questions
const mockGeneratedQuestions: GeneratedQuestion[] = [
  { id: 'k1', text: 'Heb je een technische achtergrond of ervaring met machines?', type: 'knockout' },
  { id: 'k2', text: 'Kan je werken in een 2-ploegensysteem?', type: 'knockout' },
  { id: 'k3', text: 'Woon je in de regio Diest of kan je er vlot geraken?', type: 'knockout' },
  { id: 'k4', text: 'Ben je beschikbaar voor een voltijdse betrekking?', type: 'knockout' },
  { id: 'q1', text: 'Welke ervaring heb je met het instellen of bedienen van machines?', type: 'qualifying' },
  { id: 'q2', text: 'Heb je ervaring met het oplossen van storingen?', type: 'qualifying' },
  { id: 'q3', text: 'Hoe comfortabel ben je met het aansturen van collega\'s?', type: 'qualifying' },
  { id: 'q4', text: 'Wat trekt je aan in deze functie?', type: 'qualifying' },
];

export default function GenerateInterviewPage({ params }: PageProps) {
  const { id } = use(params);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  
  // In real app, fetch vacancy by id
  const vacancy = mockVacancy;

  // Auto-generate questions on page load
  useEffect(() => {
    const generateQuestions = async () => {
      // Simulate AI generation delay (4 seconds)
      await new Promise(resolve => setTimeout(resolve, 4000));
      setQuestions(mockGeneratedQuestions);
      setIsGenerating(false);
      setIsGenerated(true);
    };

    generateQuestions();
  }, []);

  const handleQuestionsUpdate = (newQuestions: GeneratedQuestion[]) => {
    setQuestions(newQuestions);
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Slightly modify questions for demo
    const regenerated = mockGeneratedQuestions.map(q => ({
      ...q,
      id: `${q.id}-regen-${Date.now()}`,
    }));
    setQuestions(regenerated);
    setIsGenerating(false);
  };

  return (
    <div className="flex h-[calc(100vh-40px)] -m-6">
      {/* Left column - Interview Flow Builder (main focus) */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        {/* Header with vacancy info */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-lg font-semibold text-gray-900">{vacancy.title}</h1>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{vacancy.company}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{vacancy.location}</span>
        </div>

        {/* Questions panel */}
        <div className="max-w-[720px]">
          <InterviewQuestionsPanel 
            questions={questions} 
            isGenerating={isGenerating}
          />
        </div>
      </div>

      {/* Right column - Compact Chat Assistant */}
      <div className="hidden lg:flex w-[500px] flex-col border-l border-gray-200 min-h-0">
        <InterviewAssistant
          vacancyTitle={vacancy.title}
          isGenerated={isGenerated}
          isGenerating={isGenerating}
          onRegenerate={handleRegenerate}
          onQuestionsUpdate={handleQuestionsUpdate}
        />
      </div>
    </div>
  );
}
