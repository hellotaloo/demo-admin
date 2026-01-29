'use client';

import Image from 'next/image';
import { ArrowDown, Calendar, UserX, Zap } from 'lucide-react';
import { GeneratedQuestion } from './QuestionListMessage';

interface InterviewQuestionsPanelProps {
  questions: GeneratedQuestion[];
  isGenerating?: boolean;
}

export function InterviewQuestionsPanel({ questions, isGenerating = false }: InterviewQuestionsPanelProps) {
  const knockoutQuestions = questions.filter(q => q.type === 'knockout');
  const qualifyingQuestions = questions.filter(q => q.type === 'qualifying');
  const hasQuestions = questions.length > 0;

  if (!hasQuestions || isGenerating) {
    return <EmptyState isGenerating={isGenerating} />;
  }

  return (
    <div className="space-y-1">
      {/* Trigger */}
      <div className="flex justify-start mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full">
          <Zap className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs font-medium text-gray-600">Nieuwe sollicitatie</span>
        </div>
      </div>

      <FlowConnector />

      {/* Intro */}
      <FlowSection>
        <div className="bg-slate-700 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-400 mb-1">Intro</p>
          <p className="text-sm text-white">Begroet kandidaat en vraag of hij/zij nu wil starten met het interview. Geef aan hoelang het duurt.</p>
        </div>
      </FlowSection>

      <FlowConnector />

      {/* Knockout Questions */}
      <FlowSection>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Knock-out vragen
        </h4>
        <div className="space-y-2">
          {knockoutQuestions.map((question, index) => (
            <QuestionItem 
              key={question.id} 
              question={question} 
              index={index + 1}
              variant="knockout"
            />
          ))}
        </div>
      </FlowSection>

      {/* Branch: Not passed */}
      <FlowBranch 
        condition="Niet geslaagd"
        outcome="Interesse in andere matches?"
        icon={UserX}
      />

      <FlowConnector label="Geslaagd" />

      {/* Qualifying Questions */}
      <FlowSection>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Kwalificerende vragen
        </h4>
        <div className="space-y-2">
          {qualifyingQuestions.map((question, index) => (
            <QuestionItem 
              key={question.id} 
              question={question} 
              index={index + 1}
              variant="qualifying"
            />
          ))}
        </div>
      </FlowSection>

      <FlowConnector />

      {/* Outcome */}
      <FlowSection>
        <div className="bg-slate-700 rounded-lg p-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <p className="text-sm text-white">Plan interview met recruiter</p>
        </div>
      </FlowSection>

      <FlowConnector />

      {/* Update records */}
      <div className="flex justify-start">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full">
          <Image src="/bullhorn-icon-small.png" alt="Bullhorn" width={14} height={14} className="object-contain" />
          <span className="text-xs font-medium text-gray-600">Update records</span>
        </div>
      </div>
    </div>
  );
}

function FlowSection({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function FlowConnector({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-1 pl-4">
      <div className="flex flex-col items-center">
        <div className="w-px h-3 border-l-2 border-dashed border-orange-300" />
        <ArrowDown className="w-3 h-3 text-orange-400" />
      </div>
      {label && (
        <span className="text-xs text-orange-500 font-medium">{label}</span>
      )}
    </div>
  );
}

function FlowBranch({ 
  condition, 
  outcome,
  icon: Icon
}: { 
  condition: string; 
  outcome: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-2 py-1 pl-4">
      <div className="flex items-center gap-1">
        <div className="w-4 border-t-2 border-dashed border-orange-300" />
        <div className="w-px h-4 border-l-2 border-dashed border-orange-300" />
      </div>
      <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-2 py-1">
        <Icon className="w-3.5 h-3.5 text-orange-500" />
        <div>
          <span className="text-xs text-orange-600 font-medium">{condition}: </span>
          <span className="text-xs text-orange-600">{outcome}</span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ isGenerating = false }: { isGenerating?: boolean }) {
  return (
    <div className="space-y-1">
      {/* Generating indicator */}
      {isGenerating && (
        <div className="flex items-center gap-2 mb-4 text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          <span className="text-sm">Vragen genereren op basis van vacature...</span>
        </div>
      )}

      {/* Trigger skeleton */}
      <div className="flex justify-start mb-2">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full ${isGenerating ? 'animate-pulse' : ''}`}>
          <div className="w-3.5 h-3.5 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="flex items-center py-1 pl-4">
        <div className="w-px h-6 border-l-2 border-dashed border-gray-200" />
      </div>

      {/* Intro skeleton */}
      <div className={`bg-slate-700 rounded-lg p-3 ${isGenerating ? 'animate-pulse' : ''}`}>
        <div className="h-3 w-12 bg-slate-600 rounded mb-2" />
        <div className="h-4 bg-slate-600 rounded w-3/4" />
      </div>

      <div className="flex items-center py-1 pl-4">
        <div className="w-px h-6 border-l-2 border-dashed border-gray-200" />
      </div>

      {/* Knockout section skeleton */}
      <div>
        <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
        <div className="space-y-2">
          <SkeletonCard isAnimating={isGenerating} />
          <SkeletonCard isAnimating={isGenerating} />
        </div>
      </div>

      <div className="flex items-center py-1 pl-4">
        <div className="w-px h-6 border-l-2 border-dashed border-gray-200" />
      </div>

      {/* Qualifying section skeleton */}
      <div>
        <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
        <div className="space-y-2">
          <SkeletonCard isAnimating={isGenerating} />
          <SkeletonCard isAnimating={isGenerating} />
        </div>
      </div>

      <div className="flex items-center py-1 pl-4">
        <div className="w-px h-6 border-l-2 border-dashed border-gray-200" />
      </div>

      {/* Outcome skeleton */}
      <div className={`bg-slate-700 rounded-lg p-3 ${isGenerating ? 'animate-pulse' : ''}`}>
        <div className="h-4 bg-slate-600 rounded w-1/2" />
      </div>

      <div className="flex items-center py-1 pl-4">
        <div className="w-px h-6 border-l-2 border-dashed border-gray-200" />
      </div>

      {/* Update records skeleton */}
      <div className="flex justify-start">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full ${isGenerating ? 'animate-pulse' : ''}`}>
          <div className="w-3.5 h-3.5 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

function SkeletonCard({ isAnimating = false }: { isAnimating?: boolean }) {
  return (
    <div className={`bg-gray-100 rounded-lg p-2 ${isAnimating ? 'animate-pulse' : ''}`}>
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  );
}

function QuestionItem({ 
  question, 
  index, 
  variant 
}: { 
  question: GeneratedQuestion; 
  index: number;
  variant: 'knockout' | 'qualifying';
}) {
  return (
    <div className="bg-gray-100 rounded-lg p-2">
      <p className="text-sm text-gray-700">{question.text}</p>
    </div>
  );
}
