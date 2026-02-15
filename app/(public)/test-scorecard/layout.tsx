import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Test Scorecard | Taloo',
};

export default function TestScorecardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
