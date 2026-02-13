'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page now redirects to the unified edit page with dashboard mode
// All functionality is consolidated in /pre-screening/edit/[id]

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ViewPreScreeningPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    // Redirect to the unified page with dashboard mode
    router.replace(`/pre-screening/edit/${id}?mode=dashboard`);
  }, [id, router]);

  return null;
}
