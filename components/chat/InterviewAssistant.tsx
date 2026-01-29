'use client';

import { useState, useRef, useEffect } from 'react';
import { RefreshCw, Sparkles, Check, ArrowUp, Square } from 'lucide-react';
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@/components/prompt-kit/prompt-input';
import { Button } from '@/components/ui/button';
import { GeneratedQuestion } from './QuestionListMessage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface InterviewAssistantProps {
  vacancyTitle: string;
  isGenerated: boolean;
  isGenerating: boolean;
  onRegenerate: () => void;
  onQuestionsUpdate: (questions: GeneratedQuestion[]) => void;
}

export function InterviewAssistant({ 
  vacancyTitle, 
  isGenerated, 
  isGenerating,
  onRegenerate,
  onQuestionsUpdate 
}: InterviewAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial message when generation completes
  useEffect(() => {
    if (isGenerated && messages.length === 0) {
      setMessages([{
        id: 'msg-1',
        role: 'assistant',
        content: `Ik heb de screeningvragen gegenereerd voor "${vacancyTitle}". Bekijk het overzicht links en laat me weten als je aanpassingen wilt maken.`,
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [isGenerated, vacancyTitle, messages.length]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const message: Message = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, message]);
    return message;
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    addMessage('assistant', `Bedankt voor je feedback! Ik heb de aanpassing "${userMessage}" doorgevoerd. Bekijk de wijzigingen in het overzicht links.`);
  };

  const handleApprove = () => {
    addMessage('assistant', 'De vragen zijn goedgekeurd! Je kunt nu verdergaan met het publiceren van het interview.');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">Assistent</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {isGenerating && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            <span className="text-sm">Vacature analyseren...</span>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
            <span className="text-sm text-gray-500">Aan het nadenken...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      {isGenerated && !isGenerating && !isLoading && (
        <div className="px-4 py-2">
          <div className="flex gap-2">
            <button
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Regenereer
            </button>
            <button
              onClick={handleApprove}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Check className="w-3 h-3" />
              Goedkeuren
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-3">
        <PromptInput
          value={input}
          onValueChange={setInput}
          isLoading={isLoading || isGenerating}
          onSubmit={handleSubmit}
          className="w-full"
        >
          <PromptInputTextarea placeholder="Geef feedback of vraag aanpassingen..." />

          <PromptInputActions className="flex items-center justify-end gap-2 pt-2">
            <PromptInputAction tooltip="Verstuur">
              <Button
                variant="default"
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading || isGenerating}
              >
                {isLoading ? (
                  <Square className="size-3 fill-current" />
                ) : (
                  <ArrowUp className="size-3" />
                )}
              </Button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant';
  
  if (isAssistant) {
    return (
      <div>
        <p className="text-sm text-gray-700">{message.content}</p>
      </div>
    );
  }
  
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%]">
        <div className="rounded-2xl px-3 py-2 bg-gray-100">
          <p className="text-sm text-gray-700">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
