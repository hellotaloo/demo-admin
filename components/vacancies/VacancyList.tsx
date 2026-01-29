'use client';

import { Grid } from '@radix-ui/themes';
import { VacancyCard } from './VacancyCard';
import { Vacancy } from '@/lib/types';

interface VacancyListProps {
  vacancies: Vacancy[];
}

export function VacancyList({ vacancies }: VacancyListProps) {
  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-secondary)]">No vacancies found</p>
      </div>
    );
  }

  return (
    <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
    </Grid>
  );
}
