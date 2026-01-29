'use client';

import { Bell, Search } from 'lucide-react';
import { TextField, IconButton } from '@radix-ui/themes';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 gap-4">
      {/* Mobile sidebar trigger */}
      <SidebarTrigger className="md:hidden" />
      
      {/* Search */}
      <div className="flex-1 max-w-md">
        <TextField.Root 
          placeholder="Search vacancies, agents..." 
          size="2"
          className="w-full"
        >
          <TextField.Slot>
            <Search className="w-4 h-4 text-[var(--text-secondary)]" />
          </TextField.Slot>
        </TextField.Root>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <IconButton variant="ghost" size="2" className="text-[var(--text-secondary)]">
          <Bell className="w-5 h-5" />
        </IconButton>
      </div>
    </header>
  );
}
