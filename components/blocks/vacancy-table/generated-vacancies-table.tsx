'use client';

import { Building2, MapPin, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Vacancy } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/kit/status';
import { ChannelIcons } from '@/components/kit/status';

export interface GeneratedVacanciesTableProps {
  vacancies: Vacancy[];
}

function formatRelativeDate(dateString: string | null | undefined) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Zojuist';
  if (diffMins < 60) return `${diffMins}m geleden`;
  if (diffHours < 24) return `${diffHours}u geleden`;
  if (diffDays < 7) return `${diffDays}d geleden`;
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
}

export function GeneratedVacanciesTable({ vacancies }: GeneratedVacanciesTableProps) {
  const router = useRouter();

  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <Zap className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">Nog geen pre-screenings gegenereerd.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">Vacature</TableHead>
          <TableHead className="text-center">Kanalen</TableHead>
          <TableHead className="text-center">Kandidaten</TableHead>
          <TableHead className="text-center">Afgerond</TableHead>
          <TableHead className="text-center">Gekwalificeerd</TableHead>
          <TableHead>Laatste activiteit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacancies.map((vacancy) => {
          const hasActivity = vacancy.candidatesCount > 0;
          return (
            <TableRow
              key={vacancy.id}
              data-testid={`generated-vacancy-row-${vacancy.id}`}
              className="cursor-pointer"
              onClick={() => router.push(`/pre-screening/view/${vacancy.id}`)}
            >
              <TableCell>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 truncate">
                      {vacancy.title}
                    </span>
                    <StatusBadge isOnline={vacancy.isOnline} />
                  </div>
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
                <ChannelIcons channels={vacancy.channels} />
              </TableCell>
              <TableCell className="text-center">
                <span className={`font-medium ${hasActivity ? 'text-gray-900' : 'text-gray-400'}`}>
                  {hasActivity ? vacancy.candidatesCount : '-'}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className={`font-medium ${hasActivity ? 'text-gray-900' : 'text-gray-400'}`}>
                  {hasActivity ? vacancy.completedCount : '-'}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className={`font-medium ${hasActivity ? 'text-gray-900' : 'text-gray-400'}`}>
                  {hasActivity ? vacancy.qualifiedCount : '-'}
                </span>
              </TableCell>
              <TableCell className="text-gray-500 text-sm">
                {formatRelativeDate(vacancy.lastActivityAt)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
