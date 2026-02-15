'use client';

import { useState } from 'react';
import {
  Briefcase,
  FileText,
  Sparkles,
  ClipboardList,
  Search,
  History,
  Settings,
  ChevronRight,
  Boxes,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { NavItem } from '@/components/kit/nav-item';

export interface OntologySidebarProps {
  /** Currently active section */
  activeSection: string;
  /** Handler for section change */
  onSectionChange: (section: string) => void;
  /** Current search query */
  searchQuery: string;
  /** Handler for search query change */
  onSearchChange: (query: string) => void;
  /** Additional class name */
  className?: string;
}

export function OntologySidebar({
  activeSection,
  onSectionChange,
  searchQuery,
  onSearchChange,
  className,
}: OntologySidebarProps) {
  const [resourcesOpen, setResourcesOpen] = useState(true);

  return (
    <div className={`flex flex-col h-full py-4 ${className || ''}`}>
      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Zoeken..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="px-2 space-y-1">
        <NavItem
          icon={Search}
          label="Ontdekken"
          active={activeSection === 'discover'}
          onClick={() => onSectionChange('discover')}
          testId="discover"
        />
        <NavItem
          icon={History}
          label="Geschiedenis"
          active={activeSection === 'history'}
          onClick={() => onSectionChange('history')}
          testId="history"
        />
      </div>

      {/* Object Types Section */}
      <Collapsible open={resourcesOpen} onOpenChange={setResourcesOpen}>
        <div className="mt-6 px-2">
          <CollapsibleTrigger className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <ChevronRight
              className={`w-3 h-3 transition-transform ${resourcesOpen ? 'rotate-90' : ''}`}
            />
            Object Types
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-1 space-y-1">
              <NavItem
                icon={Boxes}
                label="Categorieën"
                count={5}
                active={activeSection === 'categories'}
                onClick={() => onSectionChange('categories')}
                testId="categories"
              />
              <NavItem
                icon={Briefcase}
                label="Functies"
                count={12}
                active={activeSection === 'job-functions'}
                onClick={() => onSectionChange('job-functions')}
                testId="job-functions"
              />
              <NavItem
                icon={FileText}
                label="Documenten"
                count={24}
                active={activeSection === 'documents'}
                onClick={() => onSectionChange('documents')}
                testId="documents"
              />
              <NavItem
                icon={Sparkles}
                label="Vaardigheden"
                count={0}
                active={activeSection === 'skills'}
                onClick={() => onSectionChange('skills')}
                testId="skills"
              />
              <NavItem
                icon={ClipboardList}
                label="Vereisten"
                count={45}
                active={activeSection === 'requirements'}
                onClick={() => onSectionChange('requirements')}
                testId="requirements"
              />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Bottom Section */}
      <div className="mt-auto px-2">
        <NavItem
          icon={Settings}
          label="Configuratie"
          active={activeSection === 'settings'}
          onClick={() => onSectionChange('settings')}
          testId="settings"
        />
      </div>
    </div>
  );
}
