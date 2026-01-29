// Vacancy types
export interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  status: 'new' | 'in_progress' | 'agent_created' | 'archived';
  createdAt: string;
  archivedAt?: string;
  source?: 'salesforce' | 'manual';
}

// Question types
export type QuestionType = 'knockout' | 'qualifying';
export type AnswerType = 'yes_no' | 'multiple_choice' | 'open';

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  answerType: AnswerType;
  options?: QuestionOption[];
  required: boolean;
  order: number;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Agent types
export interface Agent {
  id: string;
  vacancyId: string;
  status: 'active' | 'inactive';
  phoneNumber?: string;
  createdAt: string;
}

// Flow diagram types
export interface FlowNode {
  id: string;
  type: 'question' | 'decision' | 'start' | 'end';
  data: {
    label: string;
    questionType?: QuestionType;
    endType?: 'rejected' | 'complete';
  };
  position: { x: number; y: number };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

// Interview types
export type InterviewChannel = 'voice' | 'whatsapp';
export type InterviewStatus = 'started' | 'completed' | 'abandoned';

export interface Interview {
  id: string;
  vacancyId: string;
  agentId: string;
  channel: InterviewChannel;
  status: InterviewStatus;
  startedAt: string;
  completedAt?: string;
  questionsAnswered: number;
  totalQuestions: number;
  qualified: boolean;
  knockoutPassed: boolean;
}

// Metrics types
export interface InterviewMetrics {
  totalInterviews: number;
  completedInterviews: number;
  completionRate: number;
  qualifiedCandidates: number;
  qualificationRate: number;
  channelBreakdown: {
    voice: number;
    whatsapp: number;
  };
  weeklyTrend: { date: string; count: number }[];
  popularVacancies: { vacancyId: string; title: string; count: number }[];
}
