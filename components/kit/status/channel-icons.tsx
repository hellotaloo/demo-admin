'use client';

import { Phone, MessageCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChannelIconsProps {
  channels: {
    voice: boolean;
    whatsapp: boolean;
    cv: boolean;
  };
  className?: string;
}

/**
 * Channel icons component showing active communication channels
 * - WhatsApp: Green with message icon
 * - Voice: Blue with phone icon
 * - CV: Purple with file icon
 */
export function ChannelIcons({ channels, className }: ChannelIconsProps) {
  const hasAnyChannel = channels.voice || channels.whatsapp || channels.cv;

  if (!hasAnyChannel) {
    return <span className={cn("text-gray-400", className)}>-</span>;
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {channels.whatsapp && (
        <div
          className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"
          title="WhatsApp-kanaal actief"
        >
          <MessageCircle className="w-3.5 h-3.5 text-green-600" />
        </div>
      )}
      {channels.voice && (
        <div
          className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"
          title="Telefoon-kanaal actief"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600" />
        </div>
      )}
      {channels.cv && (
        <div
          className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center"
          title="Smart CV-kanaal actief"
        >
          <FileText className="w-3.5 h-3.5 text-purple-600" />
        </div>
      )}
    </div>
  );
}
