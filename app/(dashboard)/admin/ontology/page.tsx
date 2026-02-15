'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Boxes,
  Briefcase,
  ClipboardList,
  ExternalLink,
  FileText,
  Forklift,
  GitBranch,
  Globe2,
  Info,
  Landmark,
  Package,
  Phone,
  Plus,
  SprayCan,
  Stethoscope,
  Truck,
} from 'lucide-react';
import {
  PageLayout,
  PageLayoutHeader,
  PageLayoutContent,
} from '@/components/layout/page-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeaderActionButton } from '@/components/kit/header-action-button';
import { ObjectTypeCard } from '@/components/kit/object-type-card';
import { OntologySidebar } from '@/components/blocks/ontology-sidebar';
import { JobFunctionCard } from '@/components/blocks/ontology';

// =============================================================================
// MOCK DATA
// =============================================================================

const objectTypes = [
  {
    id: 'categories',
    name: 'Categorieën',
    nameEn: 'Categories',
    count: 5,
    icon: Boxes,
    color: 'bg-brand-dark-blue text-white',
    description: 'Top-level categorieën voor job functions',
  },
  {
    id: 'job-functions',
    name: 'Functies',
    nameEn: 'Job Functions',
    count: 12,
    icon: Briefcase,
    color: 'bg-brand-dark-blue text-white',
    description: 'Definieer functietypes en hun vereisten',
  },
  {
    id: 'documents',
    name: 'Documenten',
    nameEn: 'Document Types',
    count: 24,
    icon: FileText,
    color: 'bg-brand-dark-blue text-white',
    description: 'Beheer documenttypes voor verificatie',
  },
  {
    id: 'skills',
    name: 'Vaardigheden',
    nameEn: 'Skills',
    count: null,
    icon: Globe2,
    color: 'bg-brand-dark-blue text-white',
    description: 'ESCO-gebaseerde vaardigheden (binnenkort)',
    comingSoon: true,
  },
  {
    id: 'requirements',
    name: 'Vereisten',
    nameEn: 'Requirements',
    count: 45,
    icon: ClipboardList,
    color: 'bg-brand-dark-blue text-white',
    description: 'Regels en voorwaarden per functie',
    comingSoon: true,
  },
];

const jobFunctions = [
  {
    id: '1',
    slug: 'chauffeur-ce',
    name: 'Chauffeur CE',
    icon: Truck,
    documentCount: 5,
    vacancyCount: 3,
    categorySlug: 'transport',
    categoryName: 'Transport',
    categoryColor: 'bg-gray-100 text-gray-600',
    description: 'Vrachtwagenchauffeur met CE-rijbewijs',
  },
  {
    id: '2',
    slug: 'magazijnmedewerker',
    name: 'Magazijnmedewerker',
    icon: Package,
    documentCount: 3,
    vacancyCount: 8,
    categorySlug: 'logistics',
    categoryName: 'Logistics',
    categoryColor: 'bg-gray-100 text-gray-600',
    description: 'Orderpicker en magazijnwerk',
  },
  {
    id: '3',
    slug: 'verpleegkundige',
    name: 'Verpleegkundige',
    icon: Stethoscope,
    documentCount: 4,
    vacancyCount: 2,
    categorySlug: 'healthcare',
    categoryName: 'Healthcare',
    categoryColor: 'bg-gray-100 text-gray-600',
    description: 'Gediplomeerd verpleegkundige',
  },
  {
    id: '4',
    slug: 'callcenter-agent',
    name: 'Callcenter Agent',
    icon: Phone,
    documentCount: 1,
    vacancyCount: 5,
    categorySlug: 'office',
    categoryName: 'Office',
    categoryColor: 'bg-gray-100 text-gray-600',
    description: 'Klantenservice medewerker',
  },
  {
    id: '5',
    slug: 'heftruckchauffeur',
    name: 'Heftruckchauffeur',
    icon: Forklift,
    documentCount: 4,
    vacancyCount: 6,
    categorySlug: 'logistics',
    categoryName: 'Logistics',
    categoryColor: 'bg-gray-100 text-gray-600',
    description: 'Reachtruck en heftruck operator',
  },
  {
    id: '6',
    slug: 'schoonmaker',
    name: 'Schoonmaker',
    icon: SprayCan,
    documentCount: 2,
    vacancyCount: 4,
    categorySlug: 'facility',
    categoryName: 'Facility',
    categoryColor: 'bg-gray-100 text-gray-600',
    description: 'Industrieel schoonmaker',
  },
];

const documentCategories = [
  {
    name: 'Identiteit',
    count: 3,
    documents: ['Identiteitskaart', 'Paspoort', 'Verblijfsvergunning'],
  },
  {
    name: 'Rijbewijzen',
    count: 4,
    documents: ['Rijbewijs B', 'Rijbewijs C', 'Rijbewijs CE', 'Code 95'],
  },
  {
    name: 'Certificaten',
    count: 3,
    documents: ['VCA Certificaat', 'ADR Certificaat', 'Heftruckcertificaat'],
  },
  {
    name: 'Medisch',
    count: 2,
    documents: ['Medisch Attest', 'Medische Keuring Rijbewijs'],
  },
];


// =============================================================================
// MAIN PAGE
// =============================================================================

export default function OntologyPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter job functions based on search
  const filteredJobFunctions = jobFunctions.filter(
    (func) =>
      func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      func.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      func.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJobFunctionClick = (slug: string) => {
    router.push(`/admin/ontology/job-function/${slug}`);
  };

  const handleCategoryClick = (slug: string) => {
    router.push(`/admin/ontology/category/${slug}`);
  };

  const handleGraphClick = () => {
    router.push('/admin/ontology/graph');
  };

  const sidebar = (
    <OntologySidebar
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );

  return (
    <PageLayout>
      <PageLayoutHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Ontology</h1>
          </div>
          <div className="flex items-center gap-2">
            <HeaderActionButton
              icon={GitBranch}
              onClick={handleGraphClick}
              data-testid="graph-btn"
            >
              Graph
            </HeaderActionButton>
            <HeaderActionButton
              icon={Plus}
              variant="primary"
              data-testid="add-object-btn"
            >
              Nieuw
            </HeaderActionButton>
          </div>
        </div>
      </PageLayoutHeader>
      <PageLayoutContent
        sidebar={sidebar}
        sidebarPosition="left"
        sidebarWidth={240}
        sidebarClassName="bg-gray-50/50"
      >
        <div className="max-w-5xl space-y-8">
          {/* Intro Banner */}
          <div className="rounded-2xl bg-brand-dark-blue p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

            <div className="relative z-10 space-y-3">
              {/* Label */}
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-brand-lime-green" />
                <span className="text-xs font-medium text-brand-lime-green uppercase tracking-wide">
                  Wat is Ontology?
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl font-serif text-white max-w-lg">
                Het fundament waarop je agents bouwen
              </h2>

              {/* Description */}
              <p className="text-sm text-brand-light-blue max-w-xl">
                Verbind je organisatiekennis — functies, documenten, vereisten — met je agents.
                Zo krijgen ze context én guardrails, opereren ze binnen jouw mentale model,
                en vormt het de brug naar gestructureerde data met je bestaande tools en systemen.
              </p>

              {/* Secondary info */}
              <p className="text-xs text-brand-light-blue/70 max-w-xl pt-1">
                Je hoeft niet alles vanaf dag één te definiëren. De ontology groeit mee
                terwijl je schaalt — agents detecteren wat ontbreekt en stellen updates voor.
              </p>
            </div>
          </div>

          {/* Object Types Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Object Types</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {objectTypes.map((type, index) => (
                <ObjectTypeCard
                  key={type.id}
                  {...type}
                  onClick={() => setActiveSection(type.id)}
                  animationDelay={index * 50}
                />
              ))}
            </div>
          </section>

          {/* Job Functions Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Job Functions
                {searchQuery && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({filteredJobFunctions.length} resultaten)
                  </span>
                )}
              </h2>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                Bekijk alles
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobFunctions.map((func, index) => (
                <JobFunctionCard
                  key={func.id}
                  {...func}
                  onClick={() => handleJobFunctionClick(func.slug)}
                  onCategoryClick={handleCategoryClick}
                  animationDelay={250 + index * 50}
                />
              ))}
            </div>
            {filteredJobFunctions.length === 0 && searchQuery && (
              <div className="text-center py-8 text-gray-500">
                Geen functies gevonden voor &quot;{searchQuery}&quot;
              </div>
            )}
          </section>

          {/* Document Types by Category */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Documenten per Categorie
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {documentCategories.map((cat, index) => (
                <div
                  key={cat.name}
                  data-testid={`document-category-card-${cat.name.toLowerCase()}`}
                  className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 transition-colors cursor-pointer"
                  style={{ animation: `fade-in-up 0.3s ease-out ${550 + index * 50}ms backwards` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{cat.name}</h3>
                    <Badge variant="secondary" className="bg-gray-100">
                      {cat.count}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {cat.documents.map((doc) => (
                      <li
                        key={doc}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Info Banner */}
          <section className="rounded-2xl bg-brand-dark-blue p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-pink/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-lime-green flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-brand-dark-blue" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-brand-lime-green uppercase tracking-wide">
                    Binnenkort
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">
                  ESCO Skills Integratie
                </h3>
                <p className="text-sm text-brand-light-blue mb-4 max-w-xl">
                  Koppel vaardigheden aan de Europese ESCO taxonomie
                  voor gestandaardiseerde skill matching en betere candidate-vacancy
                  matching.
                </p>
                <Button className="bg-brand-lime-green hover:bg-brand-lime-green/90 text-brand-dark-blue font-medium">
                  Meer informatie
                </Button>
              </div>
            </div>
          </section>
        </div>
      </PageLayoutContent>
    </PageLayout>
  );
}
