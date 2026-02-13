'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AgentTestPage() {
  const [activeView, setActiveView] = useState<'dummy' | 'agent'>('dummy');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Agent test</h1>
        <p className="text-sm text-gray-500 mt-1">Toggle between dummy view and agent widget.</p>
      </div>

      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as 'dummy' | 'agent')}>
        <TabsList>
          <TabsTrigger value="dummy">View 1: Dummy</TabsTrigger>
          <TabsTrigger value="agent">View 2: Test your agent</TabsTrigger>
        </TabsList>

        <TabsContent value="dummy" className="mt-6">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-600">This is a dummy view.</p>
          </div>
        </TabsContent>

        <TabsContent value="agent" className="mt-6">
          {activeView === 'agent' && (
            <>
              <Script
                src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                strategy="afterInteractive"
              />
              <div className="rounded-lg border border-gray-200 bg-white p-6 min-h-[400px]">
                <elevenlabs-convai
                  agent-id="agent_2101kg9wn4xbefbrbet9p5fqnncn"
                  suppressHydrationWarning
                />
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
