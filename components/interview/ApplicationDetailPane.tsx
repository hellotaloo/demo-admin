'use client';

import { X, CheckCircle, XCircle, Clock, MessageSquare, Award, UserX, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Application } from './InterviewDashboard';

interface ApplicationDetailPaneProps {
  application: Application | null;
  onClose: () => void;
}

export function ApplicationDetailPane({ application, onClose }: ApplicationDetailPaneProps) {
  if (!application) return null;

  const knockoutAnswers = application.answers.filter(a => a.passed !== undefined);
  const qualifyingAnswers = application.answers.filter(a => a.passed === undefined);
  const failedKnockout = knockoutAnswers.find(a => a.passed === false);

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            {application.candidateName}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {new Date(application.timestamp).toLocaleDateString('nl-BE', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            View in ATS
            <ExternalLink className="w-3 h-3" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status Summary */}
        <div className="grid grid-cols-2 gap-3">
          <StatusCard
            label="Status"
            value={application.completed ? 'Afgerond' : 'Niet afgerond'}
            icon={application.completed ? CheckCircle : XCircle}
            variant={application.completed ? 'success' : 'error'}
          />
          <StatusCard
            label="Kwalificatie"
            value={application.qualified ? 'Gekwalificeerd' : 'Niet gekwalificeerd'}
            icon={application.qualified ? Award : UserX}
            variant={application.qualified ? 'success' : 'error'}
          />
          <StatusCard
            label="Interactietijd"
            value={application.interactionTime}
            icon={Clock}
            variant="neutral"
          />
          <StatusCard
            label="Antwoorden"
            value={`${application.answers.length} vragen`}
            icon={MessageSquare}
            variant="neutral"
          />
        </div>

        {/* Failed Knockout Reason */}
        {failedKnockout && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-700">Knock-out vraag niet gehaald</p>
                <p className="text-xs text-red-600 mt-1">{failedKnockout.questionText}</p>
                <p className="text-xs text-red-500 mt-1 italic">"{failedKnockout.answer}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Knockout Questions */}
        {knockoutAnswers.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Knock-out vragen
            </h3>
            <div className="space-y-3">
              {knockoutAnswers.map((answer, index) => (
                <AnswerCard 
                  key={index} 
                  answer={answer} 
                  showStatus 
                />
              ))}
            </div>
          </div>
        )}

        {/* Qualifying Questions */}
        {qualifyingAnswers.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Kwalificerende vragen
            </h3>
            <div className="space-y-3">
              {qualifyingAnswers.map((answer, index) => (
                <AnswerCard 
                  key={index} 
                  answer={answer} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatusCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: 'success' | 'error' | 'neutral';
}

function StatusCard({ label, value, icon: Icon, variant }: StatusCardProps) {
  const variantStyles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    neutral: 'bg-gray-50 border-gray-200 text-gray-700',
  };

  const iconStyles = {
    success: 'text-green-500',
    error: 'text-red-500',
    neutral: 'text-gray-400',
  };

  return (
    <div className={`border rounded-lg p-3 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-3.5 h-3.5 ${iconStyles[variant]}`} />
        <span className="text-xs font-medium opacity-75">{label}</span>
      </div>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

interface AnswerCardProps {
  answer: {
    questionText: string;
    answer: string;
    passed?: boolean;
  };
  showStatus?: boolean;
}

function AnswerCard({ answer, showStatus = false }: AnswerCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-gray-700 font-medium">{answer.questionText}</p>
        {showStatus && answer.passed !== undefined && (
          <span className={`shrink-0 ${answer.passed ? 'text-green-500' : 'text-red-500'}`}>
            {answer.passed ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2 italic">"{answer.answer}"</p>
    </div>
  );
}
