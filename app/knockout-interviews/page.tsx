'use client';

import { Phone, CheckCircle2, Users, MapPin, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { dummyVacancies, dummyInterviews } from '@/lib/dummy-data';
import { MetricCard, ChannelCard } from '@/components/metrics';

// Filter vacancies with status 'new' for the create conversational pre-screening section
const pendingVacancies = dummyVacancies.filter(v => v.status === 'new');

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

function PendingSetup() {
  if (pendingVacancies.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recently Added Vacancies
        </h2>
        <p className="text-sm text-gray-500">No new vacancies to set up.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recently Added Vacancies
        </h2>
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {pendingVacancies.length}
        </span>
      </div>
      
      <div className="divide-y divide-gray-100">
        {pendingVacancies.map((vacancy) => (
          <div 
            key={vacancy.id} 
            className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Link 
                  href={`/vacancies/${vacancy.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700 truncate"
                >
                  {vacancy.title}
                </Link>
                {vacancy.source === 'salesforce' && (
                  <span className="shrink-0" title="Synced from Salesforce">
                    <Image 
                      src="/salesforc-logo-cloud.png" 
                      alt="Salesforce" 
                      width={16} 
                      height={11}
                      className="opacity-70"
                    />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
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
            
            <Link
              href={`/vacancies/${vacancy.id}`}
              className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Generate pre-screening
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PreScreeningPage() {
  const weeklyMetrics = getWeeklyMetrics();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Pre-screening
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your conversational pre-screening
        </p>
      </div>

      {/* Weekly Pre-screening Metrics - 4 cards in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Pre-screening"
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

      {/* Create Conversational Pre-screening */}
      <PendingSetup />
    </div>
  );
}
