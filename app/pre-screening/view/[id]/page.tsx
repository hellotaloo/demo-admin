'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  InterviewDashboard, 
  ApplicationsTable, 
  ApplicationDetailPane,
  Application 
} from '@/components/interview';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Pencil, Loader2, ArrowLeft, TrendingUp, Clock, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
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
import { 
  PreScreening,
  getVacancy,
  getApplications,
  getPreScreening,
} from '@/lib/interview-api';
import { Vacancy, Application as BackendApplication } from '@/lib/types';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Check if vacancy is a kassamedewerker position
function isKassamedewerkerVacancy(title: string): boolean {
  return title.toLowerCase().includes('kassamedewerker') || 
         title.toLowerCase().includes('kassa');
}

// Smart Insights component - shows AI-generated insights
function SmartInsights({ vacancyId }: { vacancyId: string }) {
  const router = useRouter();
  
  const insights = [
    {
      icon: TrendingUp,
      title: 'Hoge conversie op donderdagen',
      description: 'Kandidaten die op donderdag solliciteren hebben 34% meer kans om gekwalificeerd te worden.',
      type: 'positive' as const,
    },
    {
      icon: Clock,
      title: 'Optimale gespreksduur',
      description: 'De gemiddelde gespreksduur van gekwalificeerde kandidaten is 3m 45s. Kortere gesprekken (<2m) leiden vaak tot onvolledige antwoorden.',
      type: 'neutral' as const,
    },
    {
      icon: AlertTriangle,
      title: 'Vraag 4 is onduidelijk',
      description: 'De vraag over fysiek werk (vraag 4) is voor veel kandidaten niet duidelijk. Overweeg deze vraag specifieker te maken.',
      type: 'warning' as const,
      action: {
        label: 'Vraag aanpassen',
        prompt: 'De vraag over fysiek werk (vraag 4) is voor veel kandidaten niet duidelijk. Kun je deze vraag specifieker en concreter maken?',
      },
    },
  ];

  const handleAction = (prompt: string) => {
    const encodedPrompt = encodeURIComponent(prompt);
    router.push(`/pre-screening/edit/${vacancyId}?prompt=${encodedPrompt}`);
  };

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-100">
          <Lightbulb className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Smart Insights</h3>
          <p className="text-xs text-gray-500">Door AI gegenereerde inzichten over dit pre-screening proces</p>
        </div>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              insight.type === 'positive' ? 'bg-lime-100' :
              insight.type === 'warning' ? 'bg-orange-100' :
              'bg-sky-100'
            }`}>
              <insight.icon className={`w-4 h-4 ${
                insight.type === 'positive' ? 'text-lime-600' :
                insight.type === 'warning' ? 'text-orange-600' :
                'text-sky-600'
              }`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{insight.title}</p>
              <p className="text-xs text-gray-600 mt-0.5">{insight.description}</p>
              {insight.action && (
                <button
                  onClick={() => handleAction(insight.action.prompt)}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
                >
                  {insight.action.label}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper to format seconds to "Xm Ys" format
function formatInteractionTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (minutes === 0) return `${secs}s`;
  return `${minutes}m ${secs.toString().padStart(2, '0')}s`;
}

// Convert backend Application to component Application format
function convertToComponentApplication(app: BackendApplication): Application {
  return {
    id: app.id,
    candidateName: app.candidateName,
    interactionTime: formatInteractionTime(app.interactionSeconds),
    interactionSeconds: app.interactionSeconds,
    completed: app.completed,
    qualified: app.qualified,
    timestamp: app.startedAt,
    synced: app.synced,
    channel: app.channel,
    answers: app.answers.map(a => ({
      questionId: a.questionId,
      questionText: a.questionText,
      answer: a.answer,
      passed: a.passed ?? undefined,
    })),
  };
}

export default function ViewPreScreeningPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  // Vacancy state
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isLoadingVacancy, setIsLoadingVacancy] = useState(true);
  const [vacancyError, setVacancyError] = useState<string | null>(null);
  
  // Pre-screening state
  const [existingPreScreening, setExistingPreScreening] = useState<PreScreening | null>(null);
  
  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  
  // UI state
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isAgentOnline, setIsAgentOnline] = useState(false);
  const [showOfflineDialog, setShowOfflineDialog] = useState(false);

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
        
        // If no pre-screening exists, redirect to edit page
        if (!preScreeningData) {
          router.replace(`/pre-screening/edit/${id}`);
          return;
        }
        
        setExistingPreScreening(preScreeningData);
        setIsAgentOnline(vacancyData.status === 'agent_created');
      } catch (err) {
        console.error('Failed to fetch vacancy:', err);
        setVacancyError('Vacancy not found');
      } finally {
        setIsLoadingVacancy(false);
      }
    }

    fetchVacancyAndPreScreening();
  }, [id, router]);

  // Fetch applications when data is loaded
  useEffect(() => {
    if (!vacancy || !existingPreScreening) return;

    async function fetchApplications() {
      try {
        setIsLoadingApplications(true);
        const data = await getApplications(id);
        setApplications(data.applications.map(convertToComponentApplication));
      } catch (err) {
        console.error('Failed to fetch applications:', err);
        setApplications([]);
      } finally {
        setIsLoadingApplications(false);
      }
    }

    fetchApplications();
  }, [vacancy, existingPreScreening, id]);

  // Set document title when vacancy loads
  useEffect(() => {
    if (vacancy) {
      document.title = `${vacancy.title} - Taloo`;
    }
  }, [vacancy?.title]);

  // Get selected application for detail pane
  const selectedApplication = applications.find(a => a.id === selectedApplicationId) || null;

  const handleSelectApplication = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
  };

  const handleCloseDetail = () => {
    setSelectedApplicationId(null);
  };

  const handleEditQuestions = () => {
    router.push(`/pre-screening/edit/${id}`);
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
    <div className="flex h-[calc(100vh-40px)] -m-6">
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        <div className="flex items-center justify-between mb-6">
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
              onClick={handleEditQuestions}
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

        {isLoadingApplications ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Loading applications...</span>
          </div>
        ) : (
          <>
            <InterviewDashboard applications={applications} />
            {isKassamedewerkerVacancy(vacancy.title) && <SmartInsights vacancyId={id} />}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Sollicitaties</h2>
              <ApplicationsTable 
                applications={applications}
                selectedId={selectedApplicationId}
                onSelectApplication={handleSelectApplication}
              />
            </div>
          </>
        )}
      </div>

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
