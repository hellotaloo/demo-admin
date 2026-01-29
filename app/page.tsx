import { Heading, Text } from '@radix-ui/themes';
import { Briefcase, Bot, MessageSquare, TrendingUp, MapPin, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { dummyVacancies } from '@/lib/dummy-data';

// Filter vacancies with status 'new' for the create conversational interview section
const pendingVacancies = dummyVacancies.filter(v => v.status === 'new');

function PendingInterviewSetup() {
  if (pendingVacancies.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Create Conversational Interview
        </h2>
        <p className="text-sm text-gray-500">No new vacancies to set up.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
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
              Create voice interview
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const stats = [
  { 
    name: 'Total Vacancies', 
    value: '12', 
    change: '+2 this week',
    icon: Briefcase,
    href: '/vacancies'
  },
  { 
    name: 'Active Agents', 
    value: '8', 
    change: '+3 this month',
    icon: Bot,
    href: '/agents'
  },
  { 
    name: 'Messages Sent', 
    value: '1,247', 
    change: '+18% vs last week',
    icon: MessageSquare,
    href: '/messages'
  },
  { 
    name: 'Response Rate', 
    value: '67%', 
    change: '+5% improvement',
    icon: TrendingUp,
    href: '#'
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your recruitment automation platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-semibold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-2 font-medium">
                    {stat.change}
                  </p>
                </div>
                <div className="p-2.5 bg-gray-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex gap-3 flex-wrap">
          <Link 
            href="/vacancies"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            View Vacancies
          </Link>
          <Link 
            href="/vacancies?new=true"
            className="px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Add New Vacancy
          </Link>
        </div>
      </div>

      {/* Create Conversational Interview */}
      <PendingInterviewSetup />
    </div>
  );
}
