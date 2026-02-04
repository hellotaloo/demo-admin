'use client';

import { Building2, FileCheck, CheckCircle2, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Vacancy } from '@/lib/types';
import { getVacancies } from '@/lib/interview-api';
import { getOnboardingStats } from '@/lib/pre-onboarding-api';
import { MetricCard } from '@/components/kit/metric-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TriggerOnboardingDialog } from '@/components/pre-onboarding/TriggerOnboardingDialog';

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });
}

function PendingSetup({ vacancies }: { vacancies: Vacancy[] }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">Alle vacatures zijn ingesteld.</p>
      </div>
    );
  }

  const handleRowClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Vacature</TableHead>
            <TableHead>Functie type</TableHead>
            <TableHead>Geïmporteerd</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacancies.map((vacancy) => (
            <TableRow
              key={vacancy.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(vacancy)}
            >
              <TableCell>
                <div className="min-w-0">
                  <span className="font-medium text-gray-900 truncate block">
                    {vacancy.title}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {vacancy.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {vacancy.location}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                  {vacancy.job_type || 'Arbeider'}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {formatDate(vacancy.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <button
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(vacancy);
                  }}
                >
                  Genereer pre-onboarding
                  <ArrowRight className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedVacancy && (
        <TriggerOnboardingDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          vacancyId={selectedVacancy.id}
          vacancyTitle={selectedVacancy.title}
          jobType={selectedVacancy.job_type || 'arbeider'}
        />
      )}
    </>
  );
}

function GeneratedVacancies({ vacancies }: { vacancies: Vacancy[] }) {
  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <FileCheck className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          Nog geen pre-onboarding ingesteld.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vacature</TableHead>
          <TableHead>Documenten</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Verzameld</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacancies.map((vacancy) => (
          <TableRow key={vacancy.id} className="cursor-pointer hover:bg-gray-50">
            <TableCell>
              <div className="min-w-0">
                <span className="font-medium text-gray-900 truncate block">
                  {vacancy.title}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {vacancy.company}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-gray-500">
                📄 🚗 🏥 💳
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
                Actief
              </span>
            </TableCell>
            <TableCell className="text-sm text-gray-600">
              {Math.floor(Math.random() * 10)}/10
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function PreOnboardingPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRequests: 0,
    completionRate: 0,
    fullyCollected: 0,
    verificationPending: 0
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [vacanciesData, statsData] = await Promise.all([
          getVacancies(),
          getOnboardingStats()
        ]);

        setVacancies(vacanciesData.vacancies);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter vacancies into categories
  const newVacancies = vacancies.filter(v => !v.hasOnboarding && v.status === 'new');
  const generatedVacancies = vacancies.filter(v => v.hasOnboarding);
  const archivedVacancies = vacancies.filter(v => v.status === 'archived');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pre-onboarding</h1>
        <p className="text-gray-500 mt-1">
          Verzamel documenten voor nieuwe medewerkers
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Totaal verzoeken"
          value={stats.totalRequests}
          icon={FileCheck}
        />
        <MetricCard
          title="Afrondingspercentage"
          value={`${stats.completionRate}%`}
          icon={CheckCircle2}
        />
        <MetricCard
          title="Volledig verzameld"
          value={stats.fullyCollected}
          icon={CheckCircle2}
        />
        <MetricCard
          title="Verificatie pending"
          value={stats.verificationPending}
          icon={FileCheck}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="new" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">
            Nieuw ({newVacancies.length})
          </TabsTrigger>
          <TabsTrigger value="generated">
            Gegenereerd ({generatedVacancies.length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Gearchiveerd ({archivedVacancies.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Pending Setup</h3>
              <p className="text-sm text-gray-500 mt-1">
                Vacatures zonder pre-onboarding configuratie
              </p>
            </div>
            <PendingSetup vacancies={newVacancies} />
          </div>
        </TabsContent>

        <TabsContent value="generated" className="space-y-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Actieve pre-onboarding</h3>
              <p className="text-sm text-gray-500 mt-1">
                Vacatures met actieve document collectie
              </p>
            </div>
            <GeneratedVacancies vacancies={generatedVacancies} />
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Gearchiveerd</h3>
              <p className="text-sm text-gray-500 mt-1">
                Gearchiveerde vacatures
              </p>
            </div>
            <GeneratedVacancies vacancies={archivedVacancies} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
