'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  CheckCircle, 
  ListChecks, 
  Sparkles,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Clock,
  Users,
  Zap,
  Globe,
  Plus,
  GripVertical,
  X,
  UserX,
  Pencil,
  Trash2
} from 'lucide-react';

// Dummy question data
const dummyQuestions = {
  knockout: [
    { id: 'k1', text: 'Ben je 18 jaar of ouder?', icon: CheckCircle },
    { id: 'k2', text: 'Heb je een geldig rijbewijs B?', icon: CheckCircle },
    { id: 'k3', text: 'Ben je beschikbaar voor weekendwerk?', icon: CheckCircle },
  ],
  qualifying: [
    { id: 'q1', text: 'Hoeveel jaar ervaring heb je in de retail?', idealAnswer: 'Minimaal 2 jaar ervaring in een klantgerichte functie' },
    { id: 'q2', text: 'Wat is je grootste sterkte in klantenservice?', idealAnswer: 'Geduld, empathie en probleemoplossend vermogen' },
    { id: 'q3', text: 'Hoe ga je om met drukte tijdens piekuren?', idealAnswer: 'Prioriteiten stellen, kalm blijven, team ondersteunen' },
  ],
};

// ============================================
// DESIGN VARIANT A: Classic Two-Column Cards
// ============================================
function DesignVariantA() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Variant A: Classic Two-Column</h2>
        <p className="text-sm text-gray-500 mt-1">Traditional separated sections</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Knockout Questions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Knockout vragen</h3>
              <p className="text-sm text-gray-500">Must-have criteria</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {dummyQuestions.knockout.map((q, idx) => (
              <div 
                key={q.id}
                className="group flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                  {idx + 1}
                </span>
                <p className="flex-1 text-sm text-gray-700 leading-relaxed">{q.text}</p>
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Qualifying Questions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Kwalificatie vragen</h3>
              <p className="text-sm text-gray-500">Deeper evaluation</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {dummyQuestions.qualifying.map((q, idx) => (
              <div 
                key={q.id}
                className="group p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">{q.text}</p>
                    <p className="text-xs text-gray-400 mt-2 italic">"{q.idealAnswer}"</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESIGN VARIANT B: Workflow Steps (Inspired by Operator)
// ============================================
function DesignVariantB() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Variant B: Workflow Steps</h2>
        <p className="text-sm text-gray-500 mt-1">Operator-inspired sequential flow</p>
      </div>
      
      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-900">Kassamedewerker Interview</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-600 hover:bg-gray-200 transition-colors">
              Productivity
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Trigger badge */}
        <div className="flex justify-center py-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Nieuwe sollicitatie</span>
          </div>
        </div>

        {/* Steps */}
        <div className="px-5 pb-5 space-y-3">
          {/* Intro step */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">Begin met een persoonlijke begroeting en leg het interview proces uit.</p>
            </div>
          </div>

          {/* Knockout questions */}
          {dummyQuestions.knockout.map((q, idx) => (
            <div 
              key={q.id}
              className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{q.text}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600">
                  Knockout
                </span>
              </div>
            </div>
          ))}

          {/* Qualifying questions */}
          {dummyQuestions.qualifying.map((q, idx) => (
            <div 
              key={q.id}
              className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                <ListChecks className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{q.text}</p>
                <p className="text-xs text-gray-400 mt-1.5">Ideal: {q.idealAnswer}</p>
              </div>
            </div>
          ))}

          {/* Add step button */}
          <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            Create Interview
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESIGN VARIANT C: Unified Flow with Timeline
// ============================================
function DesignVariantC() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Variant C: Timeline Flow</h2>
        <p className="text-sm text-gray-500 mt-1">Connected steps with visual timeline</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Interview Flow</h3>
            <p className="text-sm text-gray-500 mt-1">6 vragen in totaal - ~5 min</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Sparkles className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

          {/* Start node */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center z-10">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <div className="flex-1 py-3">
              <p className="font-medium text-gray-900">Interview gestart</p>
              <p className="text-sm text-gray-500">Kandidaat ontvangt begroeting</p>
            </div>
          </div>

          {/* Knockout section */}
          <div className="relative mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center z-10">
                <Zap className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-600">Knockout vragen</p>
              </div>
            </div>
            
            <div className="ml-14 space-y-2">
              {dummyQuestions.knockout.map((q, idx) => (
                <div 
                  key={q.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                    {idx + 1}
                  </span>
                  <p className="flex-1 text-sm text-gray-700">{q.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decision node */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg rotate-45 bg-yellow-100 flex items-center justify-center z-10">
              <CheckCircle className="w-4 h-4 text-yellow-600 -rotate-45" />
            </div>
            <div className="flex-1 py-3">
              <p className="font-medium text-gray-900">Knockout check</p>
              <p className="text-sm text-gray-500">Voldoet aan minimale eisen?</p>
            </div>
          </div>

          {/* Qualifying section */}
          <div className="relative mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center z-10">
                <ListChecks className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-600">Kwalificatie vragen</p>
              </div>
            </div>
            
            <div className="ml-14 space-y-2">
              {dummyQuestions.qualifying.map((q, idx) => (
                <div 
                  key={q.id}
                  className="group p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                      {idx + 4}
                    </span>
                    <p className="flex-1 text-sm text-gray-700">{q.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* End node */}
          <div className="relative flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center z-10">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
            </div>
            <div className="flex-1 py-3">
              <p className="font-medium text-gray-900">Interview voltooid</p>
              <p className="text-sm text-gray-500">Resultaten beschikbaar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESIGN VARIANT D: Compact Card Grid
// ============================================
function DesignVariantD() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Variant D: Compact Cards</h2>
        <p className="text-sm text-gray-500 mt-1">Dense but scannable grid layout</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Kassamedewerker</h3>
              <div className="flex items-center gap-3 mt-0.5 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~5 min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  6 vragen
                </span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
            Publiceren
          </button>
        </div>

        {/* Section labels */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-gray-600">Knockout ({dummyQuestions.knockout.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-gray-600">Kwalificatie ({dummyQuestions.qualifying.length})</span>
          </div>
        </div>

        {/* Questions grid */}
        <div className="grid grid-cols-2 gap-3">
          {dummyQuestions.knockout.map((q, idx) => (
            <div 
              key={q.id}
              className="group relative p-4 rounded-xl border-2 border-red-100 bg-red-50/30 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed pr-4">{q.text}</p>
              </div>
              <button className="absolute top-3 right-3 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
          
          {dummyQuestions.qualifying.map((q, idx) => (
            <div 
              key={q.id}
              className="group relative p-4 rounded-xl border-2 border-blue-100 bg-blue-50/30 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                  {idx + 4}
                </span>
                <div className="flex-1 pr-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{q.text}</p>
                </div>
              </div>
              <button className="absolute top-3 right-3 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-blue-100 transition-all">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESIGN VARIANT E: Minimal List (Dashboard Focus)
// ============================================
function DesignVariantE() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Variant E: Minimal List</h2>
        <p className="text-sm text-gray-500 mt-1">Clean, scannable with clear hierarchy</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Interview vragen</h3>
              <p className="text-sm text-gray-500 mt-0.5">6 vragen - geschatte duur 5 minuten</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
              <Sparkles className="w-4 h-4" />
              AI aanpassen
            </button>
          </div>
        </div>

        {/* Knockout Section */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <h4 className="text-sm font-semibold text-gray-900">Knockout vragen</h4>
            <span className="text-xs text-gray-400">Ja/nee vereist</span>
          </div>
          <div className="space-y-2">
            {dummyQuestions.knockout.map((q, idx) => (
              <div 
                key={q.id}
                className="group flex items-center gap-4 p-3 -mx-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-gray-400 w-4">{idx + 1}</span>
                <p className="flex-1 text-sm text-gray-700">{q.text}</p>
                <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Qualifying Section */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <h4 className="text-sm font-semibold text-gray-900">Kwalificatie vragen</h4>
            <span className="text-xs text-gray-400">Open antwoord</span>
          </div>
          <div className="space-y-2">
            {dummyQuestions.qualifying.map((q, idx) => (
              <div 
                key={q.id}
                className="group flex items-center gap-4 p-3 -mx-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-gray-400 w-4">{idx + 4}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{q.text}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <Plus className="w-4 h-4" />
              Vraag toevoegen
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESIGN VARIANT F: Timeline + Minimal (Full Flow)
// ============================================
function DesignVariantF() {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => 
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Variant F: Timeline + Minimal</h2>
        <p className="text-sm text-gray-500 mt-1">Complete flow with all functional elements</p>
      </div>

      {/* Main Flow Container */}
      <div className="relative pl-6">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-gray-200" />

        {/* 1. TRIGGER - Nieuwe sollicitatie */}
        <div className="relative flex items-start gap-4 pb-6">
          <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
          </div>
          <div className="flex-1 -mt-0.5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c4e456] text-gray-900">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Nieuwe sollicitatie</span>
            </div>
          </div>
        </div>

        {/* 2. INTRO CARD */}
        <div className="relative flex items-start gap-4 pb-6">
          <div className="relative z-10 w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="flex-1 -mt-0.5">
            <div className="bg-[#1e3a5f] rounded-xl p-4 text-white">
              <p className="text-xs text-white/60 mb-1">Intro</p>
              <p className="text-sm leading-relaxed">
                Begroet kandidaat en vraag of hij/zij nu wil starten met het interview. Geef aan hoelang het duurt.
              </p>
            </div>
          </div>
        </div>

        {/* 3. KNOCKOUT VRAGEN Section */}
        <div className="relative flex items-start gap-4 pb-2">
          <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
          </div>
          <div className="flex-1 -mt-0.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Knock-out vragen</p>
          </div>
        </div>

        {/* Knockout Questions List */}
        <div className="relative pl-10 pb-6 space-y-2">
          {dummyQuestions.knockout.map((q) => (
            <div 
              key={q.id}
              className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
            >
              <p className="flex-1 text-sm text-gray-700">{q.text}</p>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
            </div>
          ))}
        </div>

        {/* 4. KNOCKOUT DECISION - Branch Point */}
        <div className="relative flex items-start gap-4 pb-6">
          {/* Dashed line branching off */}
          <div className="absolute left-[11px] top-3 w-8 border-t-2 border-dashed border-red-300" />
          <div className="relative z-10 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1 -mt-0.5">
            {/* Fail branch card */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-red-200 bg-white">
              <UserX className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-600">Niet geslaagd: Interesse in andere matches?</span>
            </div>
          </div>
        </div>

        {/* 5. GESLAAGD - Success Continuation */}
        <div className="relative flex items-start gap-4 pb-2">
          <div className="relative z-10 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1 -mt-0.5">
            <p className="text-sm font-medium text-green-600">Geslaagd</p>
          </div>
        </div>

        {/* 6. KWALIFICERENDE VRAGEN Section */}
        <div className="relative flex items-start gap-4 pb-2 pt-4">
          <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
          </div>
          <div className="flex-1 -mt-0.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kwalificerende vragen</p>
          </div>
        </div>

        {/* Qualifying Questions List - Expandable */}
        <div className="relative pl-10 pb-6 space-y-2">
          {dummyQuestions.qualifying.map((q) => (
            <div 
              key={q.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <button
                onClick={() => toggleQuestion(q.id)}
                className="w-full flex items-center gap-3 p-3 text-left cursor-pointer"
              >
                <p className="flex-1 text-sm text-gray-700">{q.text}</p>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-300 transition-transform ${
                    expandedQuestions.includes(q.id) ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {expandedQuestions.includes(q.id) && (
                <div className="px-3 pb-3 pt-0">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Ideaal antwoord:</p>
                    <p className="text-sm text-gray-600">{q.idealAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 7. FINAL ACTION - Plan interview with Outlook */}
        <div className="relative flex items-start gap-4 pb-6">
          <div className="relative z-10 w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="flex-1 -mt-0.5">
            <div className="bg-[#1e3a5f] rounded-xl p-4 text-white flex items-center gap-3">
              {/* Outlook icon */}
              <div className="w-6 h-6 rounded flex items-center justify-center bg-[#0078d4]">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 3C4.239 3 2 5.239 2 8v8c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V8c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v.586l-8 5.714-8-5.714V8c0-1.654 1.346-3 3-3zm-3 5.414l8 5.714 8-5.714V16c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3v-5.586z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Plan interview met recruiter</span>
            </div>
          </div>
        </div>

        {/* 8. UPDATE ATS Action with Salesforce */}
        <div className="relative flex items-start gap-4">
          <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
          </div>
          <div className="flex-1 -mt-0.5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
              {/* Salesforce icon */}
              <div className="w-5 h-5 rounded flex items-center justify-center bg-[#00a1e0]">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.45 0-.884-.06-1.305-.165a3.975 3.975 0 01-3.51 2.13 4.017 4.017 0 01-2.115-.6 4.246 4.246 0 01-3.616 2.025c-2.22 0-4.05-1.665-4.29-3.81A4.453 4.453 0 010 11.67c0-2.475 1.98-4.485 4.44-4.485.72 0 1.41.165 2.01.465a4.18 4.18 0 013.556-2.235z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Update ATS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <Plus className="w-4 h-4" />
          Stap toevoegen
        </button>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            Preview
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            Publiceren
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESIGN VARIANT G: Minimal + Subtle Timeline
// ============================================
function DesignVariantG() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Variant G: Minimal Timeline</h2>
        <p className="text-sm text-gray-500 mt-1">Clean list with subtle flow indicator</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Interview flow</h3>
              <p className="text-sm text-gray-500 mt-0.5">6 vragen - geschatte duur 5 minuten</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
              <Sparkles className="w-4 h-4" />
              AI aanpassen
            </button>
          </div>
        </div>

        {/* Flow Content */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-100" />

          {/* Trigger */}
          <div className="relative px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-gray-200 border-2 border-white" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Trigger</span>
              <span className="text-sm text-gray-600">Nieuwe sollicitatie ontvangen</span>
            </div>
          </div>

          {/* Intro */}
          <div className="relative px-6 py-4 border-b border-gray-50">
            <div className="flex items-start gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-gray-300 border-2 border-white mt-0.5" />
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Intro</span>
                <p className="text-sm text-gray-700 mt-1">Begroet kandidaat en vraag of hij/zij nu wil starten. Geef aan hoelang het duurt.</p>
              </div>
            </div>
          </div>

          {/* Knockout Section */}
          <div className="relative px-6 py-4 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-red-400 border-2 border-white mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Knockout vragen</span>
                  <span className="text-xs text-gray-400">3 vragen</span>
                </div>
                <div className="space-y-1">
                  {dummyQuestions.knockout.map((q, idx) => (
                    <div 
                      key={q.id}
                      className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-gray-300 w-4">{idx + 1}</span>
                      <p className="flex-1 text-sm text-gray-700">{q.text}</p>
                      {/* Hover actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-gray-200 transition-colors" title="Chat">
                          <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <button className="p-1 rounded hover:bg-red-100 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Knockout Failed Branch */}
          <div className="relative px-6 py-3 border-b border-gray-50 bg-gray-50/50">
            <div className="flex items-center gap-4 pl-8">
              <div className="w-px h-4 border-l border-dashed border-gray-300" />
              <span className="text-xs text-red-500">Niet geslaagd</span>
              <span className="text-xs text-gray-400">-</span>
              <span className="text-sm text-gray-500">Interesse in andere matches?</span>
            </div>
          </div>

          {/* Success indicator */}
          <div className="relative px-6 py-3 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
              <span className="text-xs font-medium text-green-600">Geslaagd - doorgaan</span>
            </div>
          </div>

          {/* Qualifying Section */}
          <div className="relative px-6 py-4 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-blue-400 border-2 border-white mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Kwalificatie vragen</span>
                  <span className="text-xs text-gray-400">3 vragen</span>
                </div>
                <div className="space-y-1">
                  {dummyQuestions.qualifying.map((q, idx) => (
                    <div 
                      key={q.id}
                      className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-gray-300 w-4">{idx + 4}</span>
                      <p className="flex-1 text-sm text-gray-700">{q.text}</p>
                      {/* Hover actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-gray-200 transition-colors" title="Chat">
                          <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <button className="p-1 rounded hover:bg-red-100 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Final Actions - Outlook Calendar */}
          <div className="relative px-6 py-4 border-b border-gray-50">
            <div className="flex items-start gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-gray-300 border-2 border-white mt-0.5" />
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Afsluiting</span>
                <div className="flex items-center gap-2 mt-1">
                  {/* Outlook icon */}
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-[#0078d4]">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 3C4.239 3 2 5.239 2 8v8c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V8c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v.586l-8 5.714-8-5.714V8c0-1.654 1.346-3 3-3zm-3 5.414l8 5.714 8-5.714V16c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3v-5.586z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Plan interview met recruiter</span>
                </div>
              </div>
            </div>
          </div>

          {/* ATS Update - Salesforce */}
          <div className="relative px-6 py-4">
            <div className="flex items-start gap-4">
              <div className="relative z-10 w-4 h-4 rounded-full bg-gray-200 border-2 border-white mt-0.5" />
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Integratie</span>
                <div className="flex items-center gap-2 mt-1">
                  {/* Salesforce icon */}
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-[#00a1e0]">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.45 0-.884-.06-1.305-.165a3.975 3.975 0 01-3.51 2.13 4.017 4.017 0 01-2.115-.6 4.246 4.246 0 01-3.616 2.025c-2.22 0-4.05-1.665-4.29-3.81A4.453 4.453 0 010 11.67c0-2.475 1.98-4.485 4.44-4.485.72 0 1.41.165 2.01.465a4.18 4.18 0 013.556-2.235z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Update ATS met resultaten</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <Plus className="w-4 h-4" />
              Stap toevoegen
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Page Component
// ============================================
export default function DesignSandboxPage() {
  const [activeVariant, setActiveVariant] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'>('G');

  const variants = [
    { id: 'E' as const, label: 'Minimal', desc: 'Clean list' },
    { id: 'G' as const, label: 'Minimal+', desc: 'Subtle timeline' },
    { id: 'F' as const, label: 'Full Flow', desc: 'Rich timeline' },
    { id: 'C' as const, label: 'Timeline', desc: 'Connected flow' },
    { id: 'B' as const, label: 'Workflow', desc: 'Operator-style' },
    { id: 'A' as const, label: 'Two-Column', desc: 'Classic separated' },
    { id: 'D' as const, label: 'Card Grid', desc: 'Compact cards' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Design Sandbox</h1>
              <p className="text-sm text-gray-500 mt-0.5">Interview block design iterations</p>
            </div>
            
            {/* Variant Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVariant(v.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeVariant === v.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="block">{v.label}</span>
                  <span className="block text-xs text-gray-400 font-normal">{v.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeVariant === 'A' && <DesignVariantA />}
        {activeVariant === 'B' && <DesignVariantB />}
        {activeVariant === 'C' && <DesignVariantC />}
        {activeVariant === 'D' && <DesignVariantD />}
        {activeVariant === 'E' && <DesignVariantE />}
        {activeVariant === 'F' && <DesignVariantF />}
        {activeVariant === 'G' && <DesignVariantG />}
      </div>

      {/* Design Brief Reference */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Design Principles</h4>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>Clarity over density</li>
            <li>Soft confidence (rounded, subtle)</li>
            <li>AI-native, not AI-themed</li>
            <li>Card-based architecture</li>
            <li>Single blue accent</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
