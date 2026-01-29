import { Heading, Text } from '@radix-ui/themes';
import { Briefcase, Bot, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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
    </div>
  );
}
