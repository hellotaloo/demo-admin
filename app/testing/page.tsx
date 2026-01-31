'use client';

import { IPhoneMockup } from '@/components/testing/IPhoneMockup';
import { WhatsAppChat } from '@/components/testing/WhatsAppChat';

export default function TestingPage() {
  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100 -m-6 p-6">
      <IPhoneMockup>
        <WhatsAppChat />
      </IPhoneMockup>
    </div>
  );
}
