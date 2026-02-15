import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activiteiten | Taloo',
  description: 'Overzicht van alle actieve agent taken',
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
