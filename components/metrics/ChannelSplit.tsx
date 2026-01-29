'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChannelSplitProps {
  voice: number;
  whatsapp: number;
  className?: string;
}

export function ChannelSplit({ voice, whatsapp, className }: ChannelSplitProps) {
  const total = voice + whatsapp;
  const voicePercent = total > 0 ? Math.round((voice / total) * 100) : 50;
  const whatsappPercent = 100 - voicePercent;

  return (
    <div className={cn('', className)}>
      <h3 className="text-sm font-medium text-gray-900 mb-4">Channel Distribution</h3>
      
      {/* Visual bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-4">
        <div 
          className="bg-blue-500 transition-all"
          style={{ width: `${voicePercent}%` }}
        />
        <div 
          className="bg-green-500 transition-all"
          style={{ width: `${whatsappPercent}%` }}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Voice</span>
          <span className="text-sm font-semibold text-gray-900">{voice}</span>
          <span className="text-xs text-gray-400">({voicePercent}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <MessageCircle className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">WhatsApp</span>
          <span className="text-sm font-semibold text-gray-900">{whatsapp}</span>
          <span className="text-xs text-gray-400">({whatsappPercent}%)</span>
        </div>
      </div>
    </div>
  );
}
