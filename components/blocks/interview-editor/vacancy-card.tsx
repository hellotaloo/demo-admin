'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Building2, MapPin } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface VacancyCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  defaultOpen?: boolean;
}

export function VacancyCard({ 
  title, 
  company, 
  location, 
  description,
  defaultOpen = true 
}: VacancyCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 flex items-start justify-between hover:bg-gray-50 transition-colors text-left">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </span>
              </div>
            </div>
            <div className="ml-3 shrink-0">
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="pt-4 prose prose-sm max-w-none text-gray-600">
              <VacancyDescription content={description} />
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function VacancyDescription({ content }: { content: string }) {
  // Parse markdown-style content into sections
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 mb-4">
          {currentList.map((item, i) => (
            <li key={i} className="text-gray-600">{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={key++} className="font-semibold text-gray-900 mt-4 mb-2 first:mt-0">
          {trimmed.slice(4)}
        </h4>
      );
    } else if (trimmed.startsWith('- ')) {
      currentList.push(trimmed.slice(2));
    } else if (trimmed) {
      flushList();
      elements.push(
        <p key={key++} className="mb-3 text-gray-600">{trimmed}</p>
      );
    }
  }
  
  flushList();

  return <>{elements}</>;
}
