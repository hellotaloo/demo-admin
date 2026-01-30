'use client';

import { use, useState, useEffect, useCallback, useRef } from 'react';
import { InterviewQuestionsPanel } from '@/components/chat/InterviewQuestionsPanel';
import { InterviewAssistant } from '@/components/chat/InterviewAssistant';
import { GeneratedQuestion } from '@/components/chat/QuestionListMessage';
import { 
  InterviewDashboard, 
  ApplicationsTable, 
  ApplicationDetailPane,
  Application 
} from '@/components/interview';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { generateInterview, reorderQuestions, SSEEvent, Interview } from '@/lib/interview-api';

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

// Mock application data for the approved state
const mockApplications: Application[] = [
  {
    id: 'app-1',
    candidateName: 'Jan Peeters',
    interactionTime: '3m 45s',
    interactionSeconds: 225,
    completed: true,
    qualified: true,
    timestamp: '2026-01-29T09:15:00Z',
    synced: true,
    channel: 'voice',
    answers: [
      { questionId: 'k1', questionText: 'Heb je een technische achtergrond of ervaring met machines?', answer: 'Ja, ik heb 5 jaar ervaring als machineoperator bij een voedselverwerkingsbedrijf.', passed: true },
      { questionId: 'k2', questionText: 'Kan je werken in een 2-ploegensysteem?', answer: 'Ja, dat is geen probleem. Ik heb al eerder in ploegen gewerkt.', passed: true },
      { questionId: 'k3', questionText: 'Woon je in de regio Diest of kan je er vlot geraken?', answer: 'Ik woon in Scherpenheuvel, dat is 10 minuten rijden.', passed: true },
      { questionId: 'k4', questionText: 'Ben je beschikbaar voor een voltijdse betrekking?', answer: 'Ja, ik zoek specifiek een voltijdse job.', passed: true },
      { questionId: 'q1', questionText: 'Welke ervaring heb je met het instellen of bedienen van machines?', answer: 'Bij mijn vorige werkgever was ik verantwoordelijk voor het instellen en bedienen van verpakkingsmachines. Ik deed ook kleine onderhoudstaken.' },
      { questionId: 'q2', questionText: 'Heb je ervaring met het oplossen van storingen?', answer: 'Ja, ik heb basistraining gehad in troubleshooting en kan de meeste voorkomende storingen zelf oplossen.' },
      { questionId: 'q3', questionText: 'Hoe comfortabel ben je met het aansturen van collega\'s?', answer: 'Ik heb ervaring als teamleider tijdens weekendshifts. Ik vind het leuk om collega\'s te helpen.' },
      { questionId: 'q4', questionText: 'Wat trekt je aan in deze functie?', answer: 'De variatie in het werk en de mogelijkheid om door te groeien naar lijnverantwoordelijke.' },
    ],
  },
  {
    id: 'app-2',
    candidateName: 'Marie Janssens',
    interactionTime: '2m 12s',
    interactionSeconds: 132,
    completed: true,
    qualified: false,
    timestamp: '2026-01-29T10:30:00Z',
    synced: true,
    channel: 'whatsapp',
    answers: [
      { questionId: 'k1', questionText: 'Heb je een technische achtergrond of ervaring met machines?', answer: 'Nee, ik heb geen technische achtergrond maar ik leer snel.', passed: false },
      { questionId: 'k2', questionText: 'Kan je werken in een 2-ploegensysteem?', answer: 'Ja, dat kan.', passed: true },
      { questionId: 'k3', questionText: 'Woon je in de regio Diest of kan je er vlot geraken?', answer: 'Ja, ik woon in Diest zelf.', passed: true },
      { questionId: 'k4', questionText: 'Ben je beschikbaar voor een voltijdse betrekking?', answer: 'Ja.', passed: true },
    ],
  },
  {
    id: 'app-3',
    candidateName: 'Tom Vermeersch',
    interactionTime: '4m 02s',
    interactionSeconds: 242,
    completed: true,
    qualified: true,
    timestamp: '2026-01-28T14:45:00Z',
    synced: true,
    channel: 'voice',
    answers: [
      { questionId: 'k1', questionText: 'Heb je een technische achtergrond of ervaring met machines?', answer: 'Ja, ik heb een diploma industriële wetenschappen en 3 jaar ervaring.', passed: true },
      { questionId: 'k2', questionText: 'Kan je werken in een 2-ploegensysteem?', answer: 'Absoluut, ik geef de voorkeur aan vroege shiften maar kan beide.', passed: true },
      { questionId: 'k3', questionText: 'Woon je in de regio Diest of kan je er vlot geraken?', answer: 'Ik woon in Aarschot, 20 minuten met de auto.', passed: true },
      { questionId: 'k4', questionText: 'Ben je beschikbaar voor een voltijdse betrekking?', answer: 'Ja, ik kan direct starten.', passed: true },
      { questionId: 'q1', questionText: 'Welke ervaring heb je met het instellen of bedienen van machines?', answer: 'Ik heb gewerkt met CNC-machines en automatische assemblagelijnen. Instellen en programmeren is mijn specialiteit.' },
      { questionId: 'q2', questionText: 'Heb je ervaring met het oplossen van storingen?', answer: 'Ja, ik heb een opleiding gevolgd in preventief onderhoud en storinganalyse.' },
      { questionId: 'q3', questionText: 'Hoe comfortabel ben je met het aansturen van collega\'s?', answer: 'Ik heb geen leidinggevende ervaring maar ik sta open om dit te leren.' },
      { questionId: 'q4', questionText: 'Wat trekt je aan in deze functie?', answer: 'Het aantrekkelijke salaris en de mogelijkheid tot een vast contract na de proefperiode.' },
    ],
  },
  {
    id: 'app-4',
    candidateName: 'Sarah De Wit',
    interactionTime: '1m 30s',
    interactionSeconds: 90,
    completed: false,
    qualified: false,
    timestamp: '2026-01-28T16:20:00Z',
    synced: false,
    channel: 'whatsapp',
    answers: [
      { questionId: 'k1', questionText: 'Heb je een technische achtergrond of ervaring met machines?', answer: 'Ja, ik heb een elektromechanica opleiding.', passed: true },
      { questionId: 'k2', questionText: 'Kan je werken in een 2-ploegensysteem?', answer: 'Nee, ik kan alleen dagshiften werken wegens kinderopvang.', passed: false },
    ],
  },
  {
    id: 'app-5',
    candidateName: 'Pieter Claes',
    interactionTime: '3m 58s',
    interactionSeconds: 238,
    completed: true,
    qualified: true,
    timestamp: '2026-01-27T11:00:00Z',
    synced: true,
    channel: 'voice',
    answers: [
      { questionId: 'k1', questionText: 'Heb je een technische achtergrond of ervaring met machines?', answer: 'Ja, 8 jaar als productieoperator in de automobielindustrie.', passed: true },
      { questionId: 'k2', questionText: 'Kan je werken in een 2-ploegensysteem?', answer: 'Ja, ik heb altijd in ploegen gewerkt.', passed: true },
      { questionId: 'k3', questionText: 'Woon je in de regio Diest of kan je er vlot geraken?', answer: 'Ik woon in Beringen, 25 minuten rijden.', passed: true },
      { questionId: 'k4', questionText: 'Ben je beschikbaar voor een voltijdse betrekking?', answer: 'Ja, voltijds.', passed: true },
      { questionId: 'q1', questionText: 'Welke ervaring heb je met het instellen of bedienen van machines?', answer: 'Ik heb gewerkt met robotarmen, lasmachines en transportbanden. Instellen en finetunen is mijn dagelijkse werk.' },
      { questionId: 'q2', questionText: 'Heb je ervaring met het oplossen van storingen?', answer: 'Ja, ik ben TPMO-gecertificeerd en los dagelijks storingen op.' },
      { questionId: 'q3', questionText: 'Hoe comfortabel ben je met het aansturen van collega\'s?', answer: 'Zeer comfortabel. Ik ben momenteel ploegbaas van een team van 6 personen.' },
      { questionId: 'q4', questionText: 'Wat trekt je aan in deze functie?', answer: 'De opleiding op de werkvloer en de mogelijkheid om door te groeien. Mijn huidige werkgever heeft geen doorgroeimogelijkheden meer.' },
    ],
  },
];

export default function GenerateInterviewPage({ params }: PageProps) {
  const { id } = use(params);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isAgentOnline, setIsAgentOnline] = useState(false);
  const [showOfflineDialog, setShowOfflineDialog] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [initialMessage, setInitialMessage] = useState<string>('');
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [pendingPrompt, setPendingPrompt] = useState<string>('');
  const prevQuestionsRef = useRef<GeneratedQuestion[]>([]);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // In real app, fetch vacancy by id
  const vacancy = mockVacancy;

  // Set document title
  useEffect(() => {
    document.title = `${vacancy.title} - Taloo`;
  }, [vacancy.title]);
  
  // Get selected application for detail pane
  const selectedApplication = mockApplications.find(a => a.id === selectedApplicationId) || null;

  // Convert backend Interview to frontend GeneratedQuestion[]
  const convertToFrontendQuestions = useCallback((interview: Interview): GeneratedQuestion[] => {
    return [
      ...interview.knockout_questions.map(q => ({
        id: q.id,
        text: q.question,
        type: 'knockout' as const,
      })),
      ...interview.qualification_questions.map(q => ({
        id: q.id,
        text: q.question,
        type: 'qualifying' as const,
      })),
    ];
  }, []);

  // Handle SSE events for status updates
  const handleSSEEvent = useCallback((event: SSEEvent) => {
    if (event.type === 'status') {
      setCurrentStatus(event.message || '');
    }
  }, []);

  // Generate interview questions via backend API
  const doGenerateInterview = useCallback(async (existingSessionId?: string) => {
    setIsGenerating(true);
    setCurrentStatus('Vacature analyseren...');

    try {
      const { interview, sessionId: newSessionId, message } = await generateInterview(
        vacancy.description,
        handleSSEEvent,
        existingSessionId
      );

      setSessionId(newSessionId);
      setInitialMessage(message);
      const frontendQuestions = convertToFrontendQuestions(interview);
      // Store for future comparison (don't highlight on initial load)
      prevQuestionsRef.current = frontendQuestions;
      setQuestions(frontendQuestions);
      setIsGenerated(true);
    } catch (error) {
      console.error('Failed to generate interview:', error);
      // Show error message without fallback questions
      setInitialMessage('Er is een fout opgetreden bij het genereren van de vragen. Controleer of de backend draait en probeer het opnieuw.');
      setIsGenerated(true);
    } finally {
      setIsGenerating(false);
      setCurrentStatus('');
    }
  }, [vacancy.description, handleSSEEvent, convertToFrontendQuestions]);

  // Auto-generate questions on page load
  useEffect(() => {
    doGenerateInterview();
  }, [doGenerateInterview]);

  // Detect which questions changed and highlight them
  const updateQuestionsWithHighlight = useCallback((newQuestions: GeneratedQuestion[]) => {
    const prevQuestions = prevQuestionsRef.current;
    
    // Find changed or new questions
    const changedIds: string[] = [];
    
    newQuestions.forEach(newQ => {
      const prevQ = prevQuestions.find(p => p.id === newQ.id);
      // Highlight if it's new or if the text changed
      if (!prevQ || prevQ.text !== newQ.text) {
        changedIds.push(newQ.id);
      }
    });
    
    // Also highlight questions with new IDs (completely new questions)
    const newIds = newQuestions
      .filter(q => !prevQuestions.some(p => p.id === q.id))
      .map(q => q.id);
    
    const allChangedIds = [...new Set([...changedIds, ...newIds])];
    
    if (allChangedIds.length > 0) {
      setHighlightedIds(allChangedIds);
      
      // Clear any existing timeout
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      
      // Remove highlights after 5 seconds
      highlightTimeoutRef.current = setTimeout(() => {
        setHighlightedIds([]);
      }, 5000);
    }
    
    // Update the ref for next comparison
    prevQuestionsRef.current = newQuestions;
    setQuestions(newQuestions);
  }, []);

  const handleQuestionsUpdate = (newQuestions: GeneratedQuestion[]) => {
    updateQuestionsWithHighlight(newQuestions);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  const handleRegenerate = async () => {
    // Regenerate by calling the API again (without session to get fresh questions)
    await doGenerateInterview();
  };

  const handleApprove = () => {
    setIsApproved(true);
    setIsAgentOnline(true);
  };

  const handleSelectApplication = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
  };

  const handleCloseDetail = () => {
    setSelectedApplicationId(null);
  };

  const handleQuestionClick = (question: GeneratedQuestion, index: number) => {
    const typeLabel = question.type === 'knockout' ? 'knockout vraag' : 'kwalificatie vraag';
    setPendingPrompt(`Ik heb een vraag over ${typeLabel} ${index}: `);
  };

  const handleReorder = async (reorderedQuestions: GeneratedQuestion[]) => {
    // Don't call API if no session yet
    if (!sessionId) {
      setQuestions(reorderedQuestions);
      prevQuestionsRef.current = reorderedQuestions;
      return;
    }

    // Save current state for rollback
    const previousQuestions = [...questions];
    const previousRef = [...prevQuestionsRef.current];

    // Optimistic update - update UI immediately
    setQuestions(reorderedQuestions);
    prevQuestionsRef.current = reorderedQuestions;

    // Extract the knockout and qualification order arrays
    const knockoutOrder = reorderedQuestions
      .filter(q => q.type === 'knockout')
      .map(q => q.id);
    const qualificationOrder = reorderedQuestions
      .filter(q => q.type === 'qualifying')
      .map(q => q.id);

    try {
      await reorderQuestions(sessionId, knockoutOrder, qualificationOrder);
    } catch (error) {
      // Rollback on failure
      console.error('Failed to reorder questions:', error);
      setQuestions(previousQuestions);
      prevQuestionsRef.current = previousRef;
    }
  };

  // Approved state - Dashboard view
  if (isApproved) {
    return (
      <div className="flex h-[calc(100vh-40px)] -m-6">
        {/* Left column - Dashboard */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          {/* Header with vacancy info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-gray-900">{vacancy.title}</h1>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{vacancy.company}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{vacancy.location}</span>
              <span className={`inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                isAgentOnline 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {isAgentOnline ? 'Actief' : 'Offline'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsApproved(false)}
                className="gap-1.5 font-normal"
              >
                <Pencil className="w-3.5 h-3.5" />
                Vragen bewerken
              </Button>
              <div className="flex items-center gap-2">
                <label htmlFor="agent-online" className="text-sm text-gray-600">
                  Agent online
                </label>
                <Switch
                  id="agent-online"
                  checked={isAgentOnline}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      setShowOfflineDialog(true);
                    } else {
                      setIsAgentOnline(true);
                    }
                  }}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>
          </div>

          {/* Offline confirmation dialog */}
          <AlertDialog open={showOfflineDialog} onOpenChange={setShowOfflineDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Agent offline zetten?</AlertDialogTitle>
                <AlertDialogDescription>
                  Als je de agent offline zet, worden nieuwe sollicitaties niet meer automatisch verwerkt. 
                  Kandidaten kunnen dan geen interview meer starten voor deze vacature.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setIsAgentOnline(false);
                    setShowOfflineDialog(false);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Offline zetten
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Dashboard widgets */}
          <InterviewDashboard applications={mockApplications} />

          {/* Applications table */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Sollicitaties</h2>
            <ApplicationsTable 
              applications={mockApplications}
              selectedId={selectedApplicationId}
              onSelectApplication={handleSelectApplication}
            />
          </div>
        </div>

        {/* Right column - Detail pane (slides in when application selected) */}
        {selectedApplicationId && (
          <div className="hidden lg:flex w-[500px] flex-col border-l border-gray-200 min-h-0">
            <ApplicationDetailPane 
              application={selectedApplication}
              onClose={handleCloseDetail}
            />
          </div>
        )}
      </div>
    );
  }

  // Editing state - Flow builder view
  return (
    <div className="flex flex-col h-[calc(100vh-40px)] -m-6">
      {/* Header with vacancy info - full width */}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">{vacancy.title}</h1>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{vacancy.company}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{vacancy.location}</span>
          <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Concept
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="agent-online-edit" className="text-sm text-gray-400">
            Agent online
          </label>
          <Switch
            id="agent-online-edit"
            checked={isAgentOnline}
            disabled
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      {/* Full-width divider line */}
      <div className="border-t border-gray-200" />

      {/* Content area below the line */}
      <div className="flex flex-1 min-h-0">
        {/* Left column - Interview Questions Panel */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="max-w-[720px]">
            <InterviewQuestionsPanel 
              questions={questions} 
              isGenerating={isGenerating}
              highlightedIds={highlightedIds}
              onQuestionClick={handleQuestionClick}
              onReorder={handleReorder}
            />
          </div>
        </div>

        {/* Right column - Chat Assistant */}
        <div className="hidden lg:flex w-[500px] flex-col border-l border-gray-200 min-h-0">
          <InterviewAssistant
            vacancyTitle={vacancy.title}
            vacancyText={vacancy.description}
            isGenerated={isGenerated}
            isGenerating={isGenerating}
            sessionId={sessionId}
            currentStatus={currentStatus}
            initialMessage={initialMessage}
            onRegenerate={handleRegenerate}
            onQuestionsUpdate={handleQuestionsUpdate}
            onApprove={handleApprove}
            externalPrompt={pendingPrompt}
            onExternalPromptConsumed={() => setPendingPrompt('')}
          />
        </div>
      </div>
    </div>
  );
}
