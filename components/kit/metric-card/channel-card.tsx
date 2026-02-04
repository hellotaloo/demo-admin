'use client';

import { Phone, MessageCircle, Split } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChannelCardProps {
  voice: number;
  whatsapp: number;
  className?: string;
}

export function ChannelCard({ voice, whatsapp, className }: ChannelCardProps) {
  const total = voice + whatsapp;
  const voicePercent = total > 0 ? Math.round((voice / total) * 100) : 50;
  const whatsappPercent = 100 - voicePercent;

  return (
    <div className={cn(
      'rounded-xl p-5 min-h-[140px] flex flex-col bg-gray-800',
      className
    )}>
      {/* Header with icon and title */}
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <Split className="w-4 h-4" />
        Channel Distribution
      </div>

      {/* Visual bar */}
      <div className="my-3 flex-1 flex items-center">
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-gray-600">
          <div 
            className="bg-blue-500 transition-all"
            style={{ width: `${voicePercent}%` }}
          />
          <div 
            className="bg-green-500 transition-all"
            style={{ width: `${whatsappPercent}%` }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-end mt-auto">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <Phone className="w-3 h-3 text-gray-300" />
          <span className="text-xs font-semibold text-white">{voice}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <MessageCircle className="w-3 h-3 text-gray-300" />
          <span className="text-xs font-semibold text-white">{whatsapp}</span>
        </div>
      </div>
    </div>
  );
}
