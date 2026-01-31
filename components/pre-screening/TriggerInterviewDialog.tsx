'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';

interface TriggerInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacancyId: string;
  vacancyTitle: string;
  hasWhatsApp: boolean;
  hasVoice: boolean;
}

type ApplicationMethod = 'email' | 'whatsapp' | 'phone';
type PhoneContactMethod = 'whatsapp' | 'phone';

export function TriggerInterviewDialog({
  open,
  onOpenChange,
  vacancyId,
  vacancyTitle,
  hasWhatsApp,
  hasVoice,
}: TriggerInterviewDialogProps) {
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('+32 ');
  // Default to whichever channel is available
  const defaultPhoneMethod: PhoneContactMethod = hasWhatsApp ? 'whatsapp' : 'phone';
  const [phoneContactMethod, setPhoneContactMethod] = useState<PhoneContactMethod>(defaultPhoneMethod);
  const [isSubmitting, setIsSubmitting] = useState<ApplicationMethod | null>(null);
  
  const hasPhoneOption = hasWhatsApp || hasVoice;
  const hasBothPhoneOptions = hasWhatsApp && hasVoice;

  const handleSubmit = async (method: ApplicationMethod) => {
    setIsSubmitting(method);
    
    // TODO: Connect to actual endpoints later
    // For now just simulate a delay and close
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Trigger interview:', {
      method,
      vacancyId,
      value: method === 'email' ? emailValue : phoneValue,
    });
    
    setIsSubmitting(null);
    onOpenChange(false);
    
    // Reset values
    setEmailValue('');
    setPhoneValue('+32 ');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-5xl! p-0 gap-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <AlertDialogHeader className="px-8 pt-8 pb-6">
          <AlertDialogTitle className="text-3xl font-semibold text-center text-gray-900">
            Hoe wil je solliciteren?
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Option cards - 2 columns if phone available, 1 column if only email */}
        <div className={`grid gap-5 px-8 pb-8 ${hasPhoneOption ? 'grid-cols-2' : 'grid-cols-1 max-w-md mx-auto'}`}>
          {/* Option 1: Apply by email */}
          <div className="flex flex-col rounded-xl border border-gray-200 p-6 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-gray-900">Solliciteer via e-mail</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 grow">
              Alleen een e-mailadres is nodig. We controleren of je al geregistreerd bent en nemen je mee naar de volgende stap.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="jouw@email.com"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CDFE00]/50 focus:border-[#CDFE00]"
              />
              <button
                onClick={() => handleSubmit('email')}
                disabled={!emailValue || isSubmitting !== null}
                className="w-full py-3 px-4 rounded-lg bg-[#CDFE00] text-gray-900 font-medium hover:bg-[#bce900] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting === 'email' ? 'Bezig...' : 'Doorgaan met e-mail'}
              </button>
            </div>
          </div>

          {/* Option 2: Apply by phone (WhatsApp or Voice) - only show if at least one is available */}
          {hasPhoneOption && (
            <div className="flex flex-col rounded-xl border border-gray-200 p-6 bg-white">
              <div className="flex items-center gap-2 mb-3">
                {hasWhatsApp && !hasVoice ? (
                  <MessageCircle className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                ) : (
                  <Phone className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                )}
                <h3 className="text-lg font-semibold text-gray-900">
                  {hasWhatsApp && !hasVoice 
                    ? 'Solliciteer via WhatsApp' 
                    : hasVoice && !hasWhatsApp 
                      ? 'Solliciteer via telefoon'
                      : 'Solliciteer via telefoon'}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 grow">
                Geen CV, geen formulieren. Onze virtuele assistent begeleidt je en regelt de rest.
              </p>
              
              {/* Toggle between WhatsApp and Call - only show if both are available */}
              {hasBothPhoneOptions && (
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg mb-4">
                  <button
                    type="button"
                    onClick={() => setPhoneContactMethod('whatsapp')}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      phoneContactMethod === 'whatsapp'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp mij
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhoneContactMethod('phone')}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      phoneContactMethod === 'phone'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Bel mij
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-white">
                  {/* Belgian flag */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-6 h-4 rounded-sm overflow-hidden flex">
                      <div className="w-1/3 bg-black" />
                      <div className="w-1/3 bg-yellow-400" />
                      <div className="w-1/3 bg-red-500" />
                    </div>
                  </div>
                  <input
                    type="tel"
                    value={phoneValue}
                    onChange={(e) => setPhoneValue(e.target.value)}
                    className="flex-1 text-gray-700 focus:outline-none bg-transparent"
                    placeholder="+32 XXX XX XX XX"
                  />
                </div>
                <button
                  onClick={() => handleSubmit(phoneContactMethod)}
                  disabled={phoneValue.replace(/\s/g, '').length < 12 || isSubmitting !== null}
                  className="w-full py-3 px-4 rounded-lg bg-[#CDFE00] text-gray-900 font-medium hover:bg-[#bce900] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting === phoneContactMethod
                    ? phoneContactMethod === 'whatsapp' ? 'Bezig...' : 'Bellen...'
                    : phoneContactMethod === 'whatsapp' ? 'Doorgaan met WhatsApp' : 'Bel mij op'
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
