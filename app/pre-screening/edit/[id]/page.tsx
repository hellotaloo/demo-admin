'use client';

import { use, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InterviewQuestionsPanel } from '@/components/chat/InterviewQuestionsPanel';
import { InterviewAssistant } from '@/components/chat/InterviewAssistant';
import { GeneratedQuestion } from '@/components/chat/QuestionListMessage';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { 
  generateInterview, 
  reorderQuestions, 
  SSEEvent, 
  Interview,
  PreScreening,
  getVacancy,
  getPreScreening,
  savePreScreening 
} from '@/lib/interview-api';
import { Vacancy } from '@/lib/types';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPreScreeningPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Vacancy state
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isLoadingVacancy, setIsLoadingVacancy] = useState(true);
  const [vacancyError, setVacancyError] = useState<string | null>(null);
  
  // Pre-screening state
  const [existingPreScreening, setExistingPreScreening] = useState<PreScreening | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Question generation state
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isAgentOnline, setIsAgentOnline] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [thinkingContent, setThinkingContent] = useState<string>('');
  const [initialMessage, setInitialMessage] = useState<string>('');
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [pendingPrompt, setPendingPrompt] = useState<string>('');
  const prevQuestionsRef = useRef<GeneratedQuestion[]>([]);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch vacancy and check for existing pre-screening on mount
  useEffect(() => {
    async function fetchVacancyAndPreScreening() {
      try {
        setIsLoadingVacancy(true);
        setVacancyError(null);
        
        // Fetch vacancy and pre-screening in parallel
        const [vacancyData, preScreeningData] = await Promise.all([
          getVacancy(id),
          getPreScreening(id),
        ]);
        
        setVacancy(vacancyData);
        
        // If we have an existing pre-screening, load the questions from it
        if (preScreeningData) {
          setExistingPreScreening(preScreeningData);
          
          // Set session ID for AI editing - always use vacancy ID since session_id === vacancy_id
          // The backend auto-creates the session when fetching pre-screening
          setSessionId(id);
          
          // Convert pre-screening questions to frontend format
          const loadedQuestions: GeneratedQuestion[] = [
            ...preScreeningData.knockout_questions.map(q => ({
              id: q.id,
              text: q.question_text,
              type: 'knockout' as const,
            })),
            ...preScreeningData.qualification_questions.map(q => ({
              id: q.id,
              text: q.question_text,
              type: 'qualifying' as const,
              idealAnswer: q.ideal_answer,
            })),
          ];
          
          setQuestions(loadedQuestions);
          prevQuestionsRef.current = loadedQuestions;
          setIsGenerated(true);
          setInitialMessage('Laat me weten als je vragen hebt of iets wilt aanpassen of toevoegen!');
          setIsAgentOnline(vacancyData.status === 'agent_created');
        }
      } catch (err) {
        console.error('Failed to fetch vacancy:', err);
        setVacancyError('Vacancy not found');
      } finally {
        setIsLoadingVacancy(false);
      }
    }

    fetchVacancyAndPreScreening();
  }, [id]);

  // Set document title when vacancy loads
  useEffect(() => {
    if (vacancy) {
      document.title = `${vacancy.title} - Bewerken - Taloo`;
    }
  }, [vacancy?.title]);

  // Check for preloaded prompt from URL params (e.g., from Smart Insights)
  useEffect(() => {
    const promptParam = searchParams.get('prompt');
    if (promptParam && isGenerated && !isGenerating) {
      setPendingPrompt(promptParam);
      // Clear the URL param after consuming it
      const url = new URL(window.location.href);
      url.searchParams.delete('prompt');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams, isGenerated, isGenerating]);

  // Convert backend Interview to frontend GeneratedQuestion[]
  const convertToFrontendQuestions = useCallback((interview: Interview): GeneratedQuestion[] => {
    // Debug: Log what the backend sends for change_status
    console.log('[EditPage] Backend response - knockout_questions:', 
      interview.knockout_questions.map(q => ({ id: q.id, change_status: q.change_status }))
    );
    console.log('[EditPage] Backend response - qualification_questions:', 
      interview.qualification_questions.map(q => ({ id: q.id, change_status: q.change_status }))
    );
    
    return [
      ...interview.knockout_questions.map(q => ({
        id: q.id,
        text: q.question,
        type: 'knockout' as const,
        isModified: q.is_modified,
        changeStatus: q.change_status,
      })),
      ...interview.qualification_questions.map(q => ({
        id: q.id,
        text: q.question,
        type: 'qualifying' as const,
        idealAnswer: q.ideal_answer,
        isModified: q.is_modified,
        changeStatus: q.change_status,
      })),
    ];
  }, []);

  // Handle SSE events for status updates
  const handleSSEEvent = useCallback((event: SSEEvent) => {
    if (event.type === 'status') {
      // Only update status if we already have thinking content,
      // otherwise keep showing "Data verzamelen..."
      setThinkingContent(prev => {
        if (prev.length > 0) {
          // We have thinking content, update the status
          setCurrentStatus(event.message || 'Analyseren...');
        }
        return prev;
      });
    } else if (event.type === 'thinking') {
      // Append thinking content as it streams in
      setThinkingContent(prev => {
        const newContent = prev + (event.content || '');
        // When first thinking content arrives, update status to "Analyseren"
        if (prev.length === 0 && newContent.length > 0) {
          setCurrentStatus('Analyseren...');
        }
        return newContent;
      });
    }
  }, []);

  // Generate interview questions via backend API with retry logic
  const doGenerateInterview = useCallback(async (existingSessionId?: string) => {
    if (!vacancy) return;
    
    setIsGenerating(true);
    setCurrentStatus('Data verzamelen...');
    setThinkingContent(''); // Reset thinking content for new generation

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { interview, sessionId: newSessionId, message } = await generateInterview(
          vacancy.description,
          handleSSEEvent,
          existingSessionId
        );

        setSessionId(newSessionId);
        setInitialMessage(message);
        const frontendQuestions = convertToFrontendQuestions(interview);
        // Clear changeStatus on initial generation - we only want to show the effect after feedback
        const questionsWithoutChangeStatus = frontendQuestions.map(q => ({
          ...q,
          changeStatus: undefined,
        }));
        prevQuestionsRef.current = questionsWithoutChangeStatus;
        setQuestions(questionsWithoutChangeStatus);
        setIsGenerated(true);
        setIsGenerating(false);
        setCurrentStatus('');
        setThinkingContent(''); // Clear thinking content on success
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`Generate interview attempt ${attempt + 1} failed:`, error);
        
        if (attempt < maxRetries - 1) {
          const backoffMs = Math.pow(2, attempt) * 1000;
          setCurrentStatus('Opnieuw proberen...');
          await new Promise(resolve => setTimeout(resolve, backoffMs));
          setCurrentStatus('Data verzamelen...');
        }
      }
    }

    console.error('Failed to generate interview after all retries:', lastError);
    setInitialMessage('Er is een fout opgetreden bij het genereren van de vragen. Controleer of de backend draait en probeer het opnieuw.');
    setIsGenerated(true);
    setIsGenerating(false);
    setCurrentStatus('');
    setThinkingContent(''); // Clear thinking content on error
  }, [vacancy, handleSSEEvent, convertToFrontendQuestions]);

  // Auto-generate questions when vacancy loads (only if no existing pre-screening)
  useEffect(() => {
    if (vacancy && !isGenerated && !isGenerating && !existingPreScreening) {
      doGenerateInterview();
    }
  }, [vacancy, isGenerated, isGenerating, existingPreScreening, doGenerateInterview]);

  // Detect which questions changed and highlight them using change_status from API
  const updateQuestionsWithHighlight = useCallback((newQuestions: GeneratedQuestion[]) => {
    // Use the changeStatus flag from the API to determine which questions to highlight
    const changedIds = newQuestions
      .filter(q => q.changeStatus === 'new' || q.changeStatus === 'updated')
      .map(q => q.id);
    
    if (changedIds.length > 0) {
      setHighlightedIds(changedIds);
      
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      
      highlightTimeoutRef.current = setTimeout(() => {
        setHighlightedIds([]);
        // Clear changeStatus after timeout so labels don't persist
        setQuestions(prev => prev.map(q => ({
          ...q,
          changeStatus: undefined,
        })));
      }, 5000);
    }
    
    // Keep changeStatus in questions so the label can display, but clear isModified
    const questionsToStore = newQuestions.map(q => ({
      ...q,
      isModified: undefined,
    }));
    
    prevQuestionsRef.current = questionsToStore;
    setQuestions(questionsToStore);
  }, []);

  const handleQuestionsUpdate = (newQuestions: GeneratedQuestion[]) => {
    updateQuestionsWithHighlight(newQuestions);
  };

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  const handleRegenerate = async () => {
    await doGenerateInterview();
  };

  const handleApprove = async () => {
    if (!vacancy) return;
    
    setIsSaving(true);
    
    try {
      // Build the pre-screening config from current questions
      const knockoutQuestions = questions
        .filter(q => q.type === 'knockout')
        .map(q => ({ id: q.id, question: q.text }));
      
      const qualificationQuestions = questions
        .filter(q => q.type === 'qualifying')
        .map(q => ({ 
          id: q.id, 
          question: q.text,
          ideal_answer: q.idealAnswer,
        }));
      
      // Get intro and actions from existing config or use defaults
      const intro = existingPreScreening?.intro || 
        "Hallo! Leuk dat je solliciteert. Ben je klaar voor een paar korte vragen?";
      const knockoutFailedAction = existingPreScreening?.knockout_failed_action || 
        "Helaas voldoe je niet aan de basisvereisten. Interesse in andere matches?";
      const finalAction = existingPreScreening?.final_action || 
        "Perfect! We plannen een gesprek met de recruiter.";
      
      console.log('Saving pre-screening to database...');
      
      await savePreScreening(vacancy.id, {
        intro,
        knockout_questions: knockoutQuestions,
        knockout_failed_action: knockoutFailedAction,
        qualification_questions: qualificationQuestions,
        final_action: finalAction,
        approved_ids: questions.map(q => q.id),
      });
      
      console.log('Pre-screening saved successfully!');
      
      // Navigate to the view page after saving
      router.push(`/pre-screening/view/${id}`);
    } catch (error) {
      console.error('Failed to save pre-screening:', error);
      alert(error instanceof Error ? error.message : 'Opslaan mislukt. Probeer het opnieuw.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuestionClick = (question: GeneratedQuestion, index: number) => {
    const typeLabel = question.type === 'knockout' ? 'knockout vraag' : 'kwalificatie vraag';
    setPendingPrompt(`Ik heb een vraag over ${typeLabel} ${index}: `);
  };

  const handleReorder = async (reorderedQuestions: GeneratedQuestion[]) => {
    if (!sessionId) {
      setQuestions(reorderedQuestions);
      prevQuestionsRef.current = reorderedQuestions;
      return;
    }

    const previousQuestions = [...questions];
    const previousRef = [...prevQuestionsRef.current];

    setQuestions(reorderedQuestions);
    prevQuestionsRef.current = reorderedQuestions;

    const knockoutOrder = reorderedQuestions
      .filter(q => q.type === 'knockout')
      .map(q => q.id);
    const qualificationOrder = reorderedQuestions
      .filter(q => q.type === 'qualifying')
      .map(q => q.id);

    const maxRetries = 3;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await reorderQuestions(sessionId, knockoutOrder, qualificationOrder);
        return;
      } catch (error) {
        console.warn(`Reorder questions attempt ${attempt + 1} failed:`, error);
        
        if (attempt < maxRetries - 1) {
          const backoffMs = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, backoffMs));
        }
      }
    }

    console.error('Failed to reorder questions after all retries');
    setQuestions(previousQuestions);
    prevQuestionsRef.current = previousRef;
  };

  if (isLoadingVacancy) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-40px)]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-500">Loading vacancy...</span>
      </div>
    );
  }

  if (vacancyError || !vacancy) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-40px)]">
        <p className="text-gray-500 mb-4">Vacancy not found</p>
        <Link href="/pre-screening" className="text-blue-500 hover:underline">
          Back to pre-screening
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-40px)] -m-6">
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{vacancy.title}</h1>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{vacancy.company}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{vacancy.location}</span>
          <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Concept
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Test Interview Buttons */}
          <div className="flex items-center gap-2">
            <span className={`text-sm mr-1 ${questions.length === 0 || isGenerating ? 'text-gray-300' : 'text-gray-500'}`}>Test interview:</span>
            <button
              type="button"
              disabled={questions.length === 0 || isGenerating}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm ${
                questions.length === 0 || isGenerating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={() => {
                // TODO: Implement call test
                alert('Call test coming soon');
              }}
            >
              <Phone className="w-4 h-4" />
              Bellen
            </button>
            <button
              type="button"
              disabled={questions.length === 0 || isGenerating}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm ${
                questions.length === 0 || isGenerating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={() => {
                // TODO: Implement WhatsApp test
                alert('WhatsApp test coming soon');
              }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
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
      </div>

      <div className="border-t border-gray-200" />

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto p-6 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="max-w-[720px] -mt-3">
            <InterviewQuestionsPanel 
              questions={questions} 
              isGenerating={isGenerating}
              highlightedIds={highlightedIds}
              onQuestionClick={handleQuestionClick}
              onReorder={handleReorder}
            />
          </div>
        </div>

        <div className="hidden lg:flex w-[500px] flex-col border-l border-gray-200 min-h-0">
          <InterviewAssistant
            vacancyTitle={vacancy.title}
            vacancyText={vacancy.description}
            vacancySource={vacancy.source}
            vacancySourceId={vacancy.sourceId}
            isGenerated={isGenerated}
            isGenerating={isGenerating}
            isSaving={isSaving}
            sessionId={sessionId}
            currentStatus={currentStatus}
            generationThinkingContent={thinkingContent}
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
