'use client';

import { Building2, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Vacancy } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface PendingVacanciesTableProps {
  vacancies: Vacancy[];
  onViewSource: (vacancy: Vacancy) => void;
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function PendingVacanciesTable({
  vacancies,
  onViewSource,
}: PendingVacanciesTableProps) {
  const router = useRouter();

  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">Alle vacatures zijn ingesteld.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">Vacature</TableHead>
          <TableHead>Bron</TableHead>
          <TableHead>Geïmporteerd</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacancies.map((vacancy) => (
          <TableRow
            key={vacancy.id}
            data-testid={`pending-vacancy-row-${vacancy.id}`}
            className="cursor-pointer"
            onClick={() => router.push(`/pre-screening/edit/${vacancy.id}`)}
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
              {vacancy.source === 'salesforce' ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSource(vacancy);
                  }}
                  data-testid={`view-source-btn-${vacancy.id}`}
                  className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  title="Brongegevens bekijken"
                >
                  <Image
                    src="/salesforc-logo-cloud.png"
                    alt="Salesforce"
                    width={16}
                    height={11}
                    className="opacity-70"
                  />
                  <span className="text-xs font-medium">Bekijken</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : vacancy.source === 'bullhorn' ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSource(vacancy);
                  }}
                  data-testid={`view-source-btn-${vacancy.id}`}
                  className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  title="Brongegevens bekijken"
                >
                  <Image
                    src="/bullhorn-icon-small.png"
                    alt="Bullhorn"
                    width={16}
                    height={16}
                    className="opacity-70"
                  />
                  <span className="text-xs font-medium">Bekijken</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : (
                <span className="text-xs text-gray-500">Handmatig</span>
              )}
            </TableCell>
            <TableCell className="text-gray-500 text-sm">{formatDate(vacancy.createdAt)}</TableCell>
            <TableCell className="text-right">
              <Link
                href={`/pre-screening/edit/${vacancy.id}`}
                onClick={(e) => e.stopPropagation()}
                data-testid={`generate-prescreening-btn-${vacancy.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Pre-screening genereren
                <ArrowRight className="w-3 h-3" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
