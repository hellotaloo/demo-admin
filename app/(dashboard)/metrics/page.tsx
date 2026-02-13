'use client';

import { 
  Phone, 
  CheckCircle2, 
  Users, 
  TrendingUp,
  Star,
  Clock,
} from 'lucide-react';
import { MetricCard, ChannelSplit } from '@/components/kit/metric-card';
import { PopularVacancies } from '@/components/metrics';
import { dummyMetrics, dummyInterviews } from '@/lib/dummy-data';

// Calculate additional metrics
function getWeeklyChange(weeklyTrend: { date: string; count: number }[]) {
  if (weeklyTrend.length < 14) return 0;
  const lastWeek = weeklyTrend.slice(-7).reduce((sum, d) => sum + d.count, 0);
  const previousWeek = weeklyTrend.slice(-14, -7).reduce((sum, d) => sum + d.count, 0);
  if (previousWeek === 0) return lastWeek > 0 ? 100 : 0;
  return Math.round(((lastWeek - previousWeek) / previousWeek) * 100);
}

function getThisWeekInterviews(interviews: typeof dummyInterviews) {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return interviews.filter(i => new Date(i.startedAt) > weekAgo).length;
}

export default function MetricsPage() {
  const metrics = dummyMetrics;
  const weeklyChange = getWeeklyChange(metrics.weeklyTrend);
  const thisWeekCount = getThisWeekInterviews(dummyInterviews);
  
  // Transform weekly trend data for sparklines
  const sparklineData = metrics.weeklyTrend.map(d => ({ value: d.count }));
  
  // Calculate completion trend (simulated)
  const completionTrend = metrics.weeklyTrend.map((_, i) => ({ 
    value: 60 + Math.sin(i * 0.3) * 15 + Math.random() * 5 
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Pre-screening Metrics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Performance insights for your interview agents
        </p>
      </div>

      {/* Primary Metrics - Colorful Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Pre-screening"
          value={metrics.totalInterviews}
          label="Totaal"
          icon={Phone}
          variant="blue"
          sparklineData={sparklineData}
        />
        
        <MetricCard
          title="New This Week"
          value={weeklyChange >= 0 ? `+${weeklyChange}%` : `${weeklyChange}%`}
          label="Week"
          icon={Star}
          variant="lime"
          sparklineData={sparklineData.slice(-7)}
        />
        
        <MetricCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          label="Gem"
          icon={CheckCircle2}
          variant="dark"
          progress={metrics.completionRate}
        />
        
        <MetricCard
          title="Qualified"
          value={metrics.qualifiedCandidates}
          label={`${metrics.qualificationRate}% rate`}
          icon={Users}
          variant="purple"
          sparklineData={completionTrend}
        />
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard
          title="This Week"
          value={thisWeekCount}
          label="interviews"
          icon={Clock}
          variant="orange"
          sparklineData={sparklineData.slice(-7)}
        />
        
        <MetricCard
          title="Completed"
          value={metrics.completedInterviews}
          label={`of ${metrics.totalInterviews}`}
          icon={CheckCircle2}
          variant="blue"
          progress={(metrics.completedInterviews / metrics.totalInterviews) * 100}
        />
        
        <MetricCard
          title="Knockout Pass"
          value={`${Math.round((dummyInterviews.filter(i => i.knockoutPassed).length / dummyInterviews.length) * 100)}%`}
          label="pass rate"
          icon={TrendingUp}
          variant="lime"
          progress={Math.round((dummyInterviews.filter(i => i.knockoutPassed).length / dummyInterviews.length) * 100)}
        />
      </div>

      {/* Channel Distribution & Popular Vacancies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChannelSplit 
          voice={metrics.channelBreakdown.voice} 
          whatsapp={metrics.channelBreakdown.whatsapp} 
        />
        
        <PopularVacancies vacancies={metrics.popularVacancies} />
      </div>
    </div>
  );
}
