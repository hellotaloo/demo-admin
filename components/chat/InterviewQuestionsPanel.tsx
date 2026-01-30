'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, GripVertical, UserX, Zap } from 'lucide-react';
import { GeneratedQuestion } from './QuestionListMessage';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface InterviewQuestionsPanelProps {
  questions: GeneratedQuestion[];
  isGenerating?: boolean;
  highlightedIds?: string[];
  onQuestionClick?: (question: GeneratedQuestion, index: number) => void;
  onReorder?: (questions: GeneratedQuestion[]) => void;
}

export function InterviewQuestionsPanel({ questions, isGenerating = false, highlightedIds = [], onQuestionClick, onReorder }: InterviewQuestionsPanelProps) {
  const knockoutQuestions = questions.filter(q => q.type === 'knockout');
  const qualifyingQuestions = questions.filter(q => q.type === 'qualifying');
  const hasQuestions = questions.length > 0;
  
  // If component mounts with questions already ready, show them immediately
  const [showQuestions, setShowQuestions] = useState(hasQuestions && !isGenerating);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const prevHasQuestionsRef = useRef(hasQuestions);
  const prevIsGeneratingRef = useRef(isGenerating);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end for knockout questions
  const handleKnockoutDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = knockoutQuestions.findIndex(q => q.id === active.id);
      const newIndex = knockoutQuestions.findIndex(q => q.id === over.id);
      
      const reorderedKnockout = arrayMove(knockoutQuestions, oldIndex, newIndex);
      const newQuestions = [...reorderedKnockout, ...qualifyingQuestions];
      
      onReorder?.(newQuestions);
    }
  };

  // Handle drag end for qualifying questions
  const handleQualifyingDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = qualifyingQuestions.findIndex(q => q.id === active.id);
      const newIndex = qualifyingQuestions.findIndex(q => q.id === over.id);
      
      const reorderedQualifying = arrayMove(qualifyingQuestions, oldIndex, newIndex);
      const newQuestions = [...knockoutQuestions, ...reorderedQualifying];
      
      onReorder?.(newQuestions);
    }
  };

  useEffect(() => {
    const wasGenerating = prevIsGeneratingRef.current;
    const hadQuestions = prevHasQuestionsRef.current;
    
    // Update refs
    prevHasQuestionsRef.current = hasQuestions;
    prevIsGeneratingRef.current = isGenerating;
    
    // Transition from generating to having questions
    if (hasQuestions && !isGenerating && (wasGenerating || !hadQuestions)) {
      // Start fade out of empty state
      setIsFadingOut(true);
      
      // After fade out (400ms) + wait (300ms), show questions
      const timer = setTimeout(() => {
        setShowQuestions(true);
        setIsFadingOut(false);
      }, 700);
      
      return () => clearTimeout(timer);
    }
    
    // Reset when going back to generating
    if (isGenerating && !wasGenerating) {
      setShowQuestions(false);
      setIsFadingOut(false);
    }
  }, [hasQuestions, isGenerating]);

  // Show empty state while generating or during transition
  if (!showQuestions || !hasQuestions || isGenerating) {
    return (
      <div 
        className={`transition-opacity ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
        style={{ transitionDuration: '400ms' }}
      >
        <EmptyState isGenerating={isGenerating} />
      </div>
    );
  }

  // Calculate animation delays for the entire flow
  // Base delay for each section, questions get their own cascade within sections
  const triggerDelay = 0;
  const introDelay = 80;
  const knockoutHeaderDelay = 160;
  const knockoutQuestionsBaseDelay = 220;
  const branchDelay = knockoutQuestionsBaseDelay + knockoutQuestions.length * 80 + 80;
  const qualifyingHeaderDelay = branchDelay + 80;
  const qualifyingQuestionsBaseDelay = qualifyingHeaderDelay + 60;
  const outcomeDelay = qualifyingQuestionsBaseDelay + qualifyingQuestions.length * 80 + 80;
  const updateRecordsDelay = outcomeDelay + 80;

  // Show the questions
  return (
    <div className="relative pl-6">
      {/* Continuous timeline line */}
      <div 
        className="absolute left-[7px] top-3 bottom-3 w-px border-l-2 border-dashed border-gray-300"
        style={{ animation: `fade-in 0.8s ease-out backwards` }}
      />

      {/* Trigger */}
      <TimelineItem animationDelay={triggerDelay}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full bg-white">
          <Zap className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs font-medium text-gray-600">Nieuwe sollicitatie</span>
        </div>
      </TimelineItem>

      {/* Intro */}
      <TimelineItem animationDelay={introDelay}>
        <div className="bg-slate-700 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-400 mb-1">Intro</p>
          <p className="text-sm text-white">Begroet kandidaat en vraag of hij/zij nu wil starten met het interview. Geef aan hoelang het duurt.</p>
        </div>
      </TimelineItem>

      {/* Knockout Questions */}
      <TimelineItem animationDelay={knockoutHeaderDelay} alignDot="top">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Knock-out vragen
        </h4>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleKnockoutDragEnd}
        >
          <SortableContext
            items={knockoutQuestions.map(q => q.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {knockoutQuestions.map((question, index) => (
                <SortableQuestionItem 
                  key={question.id} 
                  question={question} 
                  index={index + 1}
                  variant="knockout"
                  isHighlighted={highlightedIds.includes(question.id)}
                  animationDelay={knockoutQuestionsBaseDelay + index * 80}
                  onClick={onQuestionClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </TimelineItem>

      {/* Branch: Not passed */}
      <TimelineBranch 
        condition="Niet geslaagd"
        outcome="Interesse in andere matches?"
        icon={UserX}
        animationDelay={branchDelay}
      />

      {/* Geslaagd label on timeline */}
      <div 
        className="relative py-2 flex items-center"
        style={{ animation: `fade-in-up 0.6s ease-out ${branchDelay + 40}ms backwards` }}
      >
        <div className="absolute left-[-24px] w-4 h-4 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-green-600 font-medium">Geslaagd</span>
      </div>

      {/* Qualifying Questions */}
      <TimelineItem animationDelay={qualifyingHeaderDelay} alignDot="top">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Kwalificerende vragen
        </h4>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleQualifyingDragEnd}
        >
          <SortableContext
            items={qualifyingQuestions.map(q => q.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {qualifyingQuestions.map((question, index) => (
                <SortableQuestionItem 
                  key={question.id} 
                  question={question} 
                  index={index + 1}
                  variant="qualifying"
                  isHighlighted={highlightedIds.includes(question.id)}
                  animationDelay={qualifyingQuestionsBaseDelay + index * 80}
                  onClick={onQuestionClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </TimelineItem>

      {/* Outcome */}
      <TimelineItem animationDelay={outcomeDelay}>
        <div className="bg-slate-700 rounded-lg p-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <p className="text-sm text-white">Plan interview met recruiter</p>
        </div>
      </TimelineItem>

      {/* Update records */}
      <TimelineItem animationDelay={updateRecordsDelay} isLast>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full bg-white">
          <Image src="/salesforc-logo-cloud.png" alt="Salesforce" width={14} height={14} className="object-contain" />
          <span className="text-xs font-medium text-gray-600">Update ATS</span>
        </div>
      </TimelineItem>
    </div>
  );
}

function TimelineItem({ 
  children, 
  animationDelay = 0,
  isLast = false,
  alignDot = 'center'
}: { 
  children: React.ReactNode; 
  animationDelay?: number;
  isLast?: boolean;
  alignDot?: 'top' | 'center';
}) {
  const dotPosition = alignDot === 'top' 
    ? 'top-3' 
    : 'top-1/2 -translate-y-1/2';
  
  return (
    <div 
      className="relative py-3"
      style={{ animation: `fade-in-up 0.6s ease-out ${animationDelay}ms backwards` }}
    >
      {/* Timeline dot */}
      <div className={`absolute left-[-24px] ${dotPosition} w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center`}>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

function TimelineBranch({ 
  condition, 
  outcome,
  icon: Icon,
  animationDelay = 0
}: { 
  condition: string; 
  outcome: string;
  icon: React.ComponentType<{ className?: string }>;
  animationDelay?: number;
}) {
  return (
    <div 
      className="relative py-2 flex items-start ml-8"
      style={{ animation: `fade-in-up 0.6s ease-out ${animationDelay}ms backwards` }}
    >
      {/* T-shaped branch connector */}
      <div className="absolute left-[-56px] top-1/2 -translate-y-1/2 flex items-center z-0">
        <div className="w-4 h-4 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
        </div>
        <div className="w-10 border-t-2 border-dashed border-orange-300" />
      </div>
      <div className="relative z-10 flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-2 py-1">
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
    <div className="relative pl-6">
      {/* Timeline line skeleton */}
      <div className="absolute left-[7px] top-3 bottom-3 w-px border-l-2 border-dashed border-gray-200" />

      {/* Trigger / Generating indicator */}
      <SkeletonTimelineItem isAnimating={isGenerating} spinnerDot={isGenerating}>
        {isGenerating ? (
          <span className="text-sm text-gray-500">Vragen genereren op basis van vacature...</span>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full">
            <div className="w-3.5 h-3.5 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        )}
      </SkeletonTimelineItem>

      {/* Intro skeleton */}
      <SkeletonTimelineItem isAnimating={isGenerating}>
        <div className={`bg-slate-700 rounded-lg p-3 ${isGenerating ? 'animate-pulse' : ''}`}>
          <div className="h-3 w-12 bg-slate-600 rounded mb-2" />
          <div className="h-4 bg-slate-600 rounded w-3/4" />
        </div>
      </SkeletonTimelineItem>

      {/* Knockout section skeleton */}
      <SkeletonTimelineItem isAnimating={isGenerating} alignDot="top">
        <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
        <div className="space-y-2">
          <SkeletonCard isAnimating={isGenerating} />
          <SkeletonCard isAnimating={isGenerating} />
        </div>
      </SkeletonTimelineItem>

      {/* Qualifying section skeleton */}
      <SkeletonTimelineItem isAnimating={isGenerating} alignDot="top">
        <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
        <div className="space-y-2">
          <SkeletonCard isAnimating={isGenerating} />
          <SkeletonCard isAnimating={isGenerating} />
        </div>
      </SkeletonTimelineItem>

      {/* Outcome skeleton */}
      <SkeletonTimelineItem isAnimating={isGenerating}>
        <div className={`bg-slate-700 rounded-lg p-3 ${isGenerating ? 'animate-pulse' : ''}`}>
          <div className="h-4 bg-slate-600 rounded w-1/2" />
        </div>
      </SkeletonTimelineItem>

      {/* Update records skeleton */}
      <SkeletonTimelineItem isAnimating={isGenerating}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full ${isGenerating ? 'animate-pulse' : ''}`}>
          <div className="w-3.5 h-3.5 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </SkeletonTimelineItem>
    </div>
  );
}

function SkeletonTimelineItem({ 
  children, 
  isAnimating = false,
  alignDot = 'center',
  spinnerDot = false
}: { 
  children: React.ReactNode; 
  isAnimating?: boolean;
  alignDot?: 'top' | 'center';
  spinnerDot?: boolean;
}) {
  const dotPosition = alignDot === 'top' 
    ? 'top-3' 
    : 'top-1/2 -translate-y-1/2';
    
  return (
    <div className="relative py-3">
      {/* Timeline dot skeleton */}
      {spinnerDot ? (
        <div className={`absolute left-[-24px] ${dotPosition} w-4 h-4 bg-white border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin`} />
      ) : (
        <div className={`absolute left-[-24px] ${dotPosition} w-4 h-4 rounded-full bg-gray-100 border-2 border-gray-200 ${isAnimating ? 'animate-pulse' : ''}`} />
      )}
      {children}
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

function SortableQuestionItem({ 
  question, 
  index, 
  variant,
  isHighlighted = false,
  animationDelay = 0,
  onClick,
}: { 
  question: GeneratedQuestion; 
  index: number;
  variant: 'knockout' | 'qualifying';
  isHighlighted?: boolean;
  animationDelay?: number;
  onClick?: (question: GeneratedQuestion, index: number) => void;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  // Mark animation as complete after it finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, animationDelay + 600); // animation delay + animation duration
    return () => clearTimeout(timer);
  }, [animationDelay]);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(hasAnimated ? {} : { animation: `fade-in-up 0.6s ease-out ${animationDelay}ms backwards` }),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-100 rounded-lg p-2 flex items-center gap-2 group ${
        isHighlighted 
          ? 'ring-2 ring-orange-400 ring-opacity-75 shadow-[0_0_10px_rgba(251,146,60,0.4)] transition-shadow duration-500' 
          : 'ring-0 ring-transparent shadow-none transition-shadow duration-500'
      } ${isDragging ? 'opacity-60 shadow-lg z-50' : 'opacity-100'} ${onClick ? 'cursor-pointer hover:bg-gray-200' : ''}`}
      onClick={() => onClick?.(question, index)}
    >
      <button
        className="shrink-0 p-0.5 -ml-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity touch-none self-center"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <p className="text-sm text-gray-700 flex-1">{question.text}</p>
    </div>
  );
}

function QuestionItem({ 
  question, 
  index, 
  variant,
  isHighlighted = false,
  animationDelay = 0,
  onClick,
}: { 
  question: GeneratedQuestion; 
  index: number;
  variant: 'knockout' | 'qualifying';
  isHighlighted?: boolean;
  animationDelay?: number;
  onClick?: (question: GeneratedQuestion, index: number) => void;
}) {
  return (
    <div 
      className={`bg-gray-100 rounded-lg p-2 ${
        isHighlighted 
          ? 'ring-2 ring-orange-400 ring-opacity-75 shadow-[0_0_10px_rgba(251,146,60,0.4)] transition-all duration-500' 
          : 'ring-0 ring-transparent shadow-none transition-all duration-500'
      } ${onClick ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}`}
      style={{ 
        animation: `fade-in-up 0.6s ease-out ${animationDelay}ms backwards`
      }}
      onClick={() => onClick?.(question, index)}
    >
      <p className="text-sm text-gray-700">{question.text}</p>
    </div>
  );
}
