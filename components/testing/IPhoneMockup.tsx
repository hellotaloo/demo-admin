'use client';

import { ReactNode } from 'react';

interface IPhoneMockupProps {
  children: ReactNode;
}

export function IPhoneMockup({ children }: IPhoneMockupProps) {
  return (
    <div className="relative">
      {/* Device frame */}
      <div
        className="relative bg-black rounded-[55px] p-3 shadow-2xl"
        style={{
          width: '375px',
          height: '812px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        }}
      >
        {/* Side buttons - Volume */}
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[30px] bg-gray-800 rounded-l-sm" />
        <div className="absolute left-[-3px] top-[160px] w-[3px] h-[60px] bg-gray-800 rounded-l-sm" />
        <div className="absolute left-[-3px] top-[230px] w-[3px] h-[60px] bg-gray-800 rounded-l-sm" />
        
        {/* Side button - Power */}
        <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-gray-800 rounded-r-sm" />

        {/* Screen bezel */}
        <div
          className="relative w-full h-full bg-black rounded-[45px] overflow-hidden"
          style={{
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-50">
            <div
              className="bg-black rounded-full flex items-center justify-center"
              style={{
                width: '120px',
                height: '34px',
              }}
            >
              {/* Camera lens */}
              <div className="absolute right-4 w-3 h-3 rounded-full bg-gray-900 border border-gray-800">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-900/50" />
              </div>
            </div>
          </div>

          {/* Screen content area */}
          <div className="w-full h-full overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
