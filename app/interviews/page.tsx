'use client';

import { Phone, CheckCircle2, Users, MapPin, Building2, ArrowRight, Archive, List, Loader, Info } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dummyVacancies, dummyInterviews } from '@/lib/dummy-data';
import { MetricCard, ChannelCard } from '@/components/metrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Filter vacancies by status
const pendingVacancies = dummyVacancies.filter(v => v.status === 'new');
const runningVacancies = dummyVacancies.filter(v => v.status === 'in_progress' || v.status === 'agent_created');
const archivedVacancies = dummyVacancies.filter(v => v.status === 'archived');

// Calculate interview stats per vacancy
function getVacancyStats(vacancyId: string) {
  const interviews = dummyInterviews.filter(i => i.vacancyId === vacancyId);
  const total = interviews.length;
  const completed = interviews.filter(i => i.status === 'completed').length;
  const qualified = interviews.filter(i => i.qualified).length;
  const lastInterview = interviews.length > 0 ? interviews[0].startedAt : null;
  
  return {
    total,
    completed,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    qualified,
    lastInterview,
  };
}

// Calculate weekly metrics
function getWeeklyMetrics() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const weeklyInterviews = dummyInterviews.filter(i => new Date(i.startedAt) > weekAgo);
  const totalWeekly = weeklyInterviews.length;
  const completedWeekly = weeklyInterviews.filter(i => i.status === 'completed').length;
  const qualifiedWeekly = weeklyInterviews.filter(i => i.qualified).length;
  const voiceWeekly = weeklyInterviews.filter(i => i.channel === 'voice').length;
  const whatsappWeekly = weeklyInterviews.filter(i => i.channel === 'whatsapp').length;
  
  // Get daily data for sparkline (last 7 days)
  const dailyData: { value: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = dummyInterviews.filter(int => int.startedAt.split('T')[0] === dateStr).length;
    dailyData.push({ value: count });
  }
  
  return {
    total: totalWeekly,
    completed: completedWeekly,
    completionRate: totalWeekly > 0 ? Math.round((completedWeekly / totalWeekly) * 100) : 0,
    qualified: qualifiedWeekly,
    qualificationRate: completedWeekly > 0 ? Math.round((qualifiedWeekly / completedWeekly) * 100) : 0,
    voice: voiceWeekly,
    whatsapp: whatsappWeekly,
    dailyData,
  };
}

function formatDate(dateString: string | null) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });
}

function PendingInterviewSetup() {
  if (pendingVacancies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">All vacancies have been set up.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">Vacancy</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Imported</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pendingVacancies.map((vacancy) => (
          <TableRow key={vacancy.id}>
            <TableCell>
              <div className="min-w-0">
                <Link 
                  href={`/vacancies/${vacancy.id}`}
                  className="font-medium text-gray-900 hover:text-gray-700 truncate block"
                >
                  {vacancy.title}
                </Link>
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
              {vacancy.source === 'salesforce' ? (
                <span title="Synced from Salesforce">
                  <Image 
                    src="/salesforc-logo-cloud.png" 
                    alt="Salesforce" 
                    width={16} 
                    height={11}
                    className="opacity-70"
                  />
                </span>
              ) : (
                <span className="text-xs text-gray-500">Manual</span>
              )}
            </TableCell>
            <TableCell className="text-gray-500 text-sm">
              {formatDate(vacancy.createdAt)}
            </TableCell>
            <TableCell className="text-right">
              <Link
                href={`/interviews/generate/${vacancy.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Generate interview
                <ArrowRight className="w-3 h-3" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function VacanciesTable({ vacancies, showArchiveDate = false }: { vacancies: typeof dummyVacancies; showArchiveDate?: boolean }) {
  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <Archive className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">No vacancies found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">Vacancy</TableHead>
          <TableHead className="text-center">Interviews</TableHead>
          <TableHead className="text-center">Completed</TableHead>
          <TableHead className="text-center">Qualified</TableHead>
          <TableHead>{showArchiveDate ? 'Archived' : 'Last Interview'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacancies.map((vacancy) => {
          const stats = getVacancyStats(vacancy.id);
          return (
            <TableRow key={vacancy.id}>
              <TableCell>
                <div className="min-w-0">
                  <Link 
                    href={`/vacancies/${vacancy.id}`}
                    className="font-medium text-gray-900 hover:text-gray-700 truncate block"
                  >
                    {vacancy.title}
                  </Link>
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
              <TableCell className="text-center">
                <span className="font-medium">{stats.total}</span>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-medium">{stats.completed}</span>
                <span className="text-gray-400 text-xs ml-1">({stats.completionRate}%)</span>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-medium text-green-600">{stats.qualified}</span>
              </TableCell>
              <TableCell className="text-gray-500 text-sm">
                {showArchiveDate 
                  ? formatDate(vacancy.archivedAt || null)
                  : formatDate(stats.lastInterview)
                }
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default function InterviewsPage() {
  const weeklyMetrics = getWeeklyMetrics();
  const [autoGenerate, setAutoGenerate] = useState(false);
  
  return (
    <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Interviews
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your conversational interviews
          </p>
        </div>

        {/* Weekly Interview Metrics - 4 cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Interviews"
            value={weeklyMetrics.total}
            label="This week"
            icon={Phone}
            variant="blue"
            sparklineData={weeklyMetrics.dailyData}
          />
          
          <MetricCard
            title="Completion Rate"
            value={`${weeklyMetrics.completionRate}%`}
            label="This week"
            icon={CheckCircle2}
            variant="dark"
            progress={weeklyMetrics.completionRate}
          />
          
          <MetricCard
            title="Qualified"
            value={weeklyMetrics.qualified}
            label={`${weeklyMetrics.qualificationRate}% of completed`}
            icon={Users}
            variant="lime"
            sparklineData={weeklyMetrics.dailyData}
          />

          <ChannelCard
            voice={weeklyMetrics.voice}
            whatsapp={weeklyMetrics.whatsapp}
          />
        </div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="recent" className="space-y-2">
        <div className="flex items-center justify-between">
          <TabsList variant="line">
            <TabsTrigger value="recent">
              <List className="w-3.5 h-3.5" />
              Recently Added
              <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                {pendingVacancies.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="running">
              <Loader className="w-3.5 h-3.5" />
              Running Interviews
              <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                {runningVacancies.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="archived">
              <Archive className="w-3.5 h-3.5" />
              Archived
              <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                {archivedVacancies.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <label htmlFor="auto-generate" className="text-sm text-gray-600">
              Auto generate
            </label>
            <Switch
              id="auto-generate"
              checked={autoGenerate}
              onCheckedChange={setAutoGenerate}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[240px]">
                When enabled, every vacancy sent to Taloo will be automatically converted to an interview. Interviews can always be modified later.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <TabsContent value="recent" className="">
          <PendingInterviewSetup />
        </TabsContent>
        
        <TabsContent value="running" className="">
          <VacanciesTable vacancies={runningVacancies} />
        </TabsContent>
        
        <TabsContent value="archived" className="">
          <VacanciesTable vacancies={archivedVacancies} showArchiveDate />
        </TabsContent>
      </Tabs>
    </div>
  );
}
