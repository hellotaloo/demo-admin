import { Vacancy, Question, ChatMessage, Interview, InterviewMetrics } from './types';

export const dummyVacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Verkoopmedewerker Bakkerij',
    company: 'Bakkerij Peeters',
    location: 'Landen, België',
    description: 'Wij zoeken een enthousiaste verkoopmedewerker voor onze bakkerij. Je bent verantwoordelijk voor het bedienen van klanten, het afrekenen aan de kassa en het verzorgen van de winkelindeling.',
    status: 'new',
    createdAt: '2026-01-28T10:00:00Z',
    source: 'salesforce',
  },
  {
    id: '2',
    title: 'Magazijnmedewerker',
    company: 'LogiTrans NV',
    location: 'Antwerpen, België',
    description: 'Voor ons distributiecentrum zoeken we een magazijnmedewerker. Je bent verantwoordelijk voor het ontvangen, opslaan en verzenden van goederen.',
    status: 'in_progress',
    createdAt: '2026-01-25T14:30:00Z',
    source: 'salesforce',
  },
  {
    id: '3',
    title: 'Klantenservice Medewerker',
    company: 'TeleCom Solutions',
    location: 'Brussel, België',
    description: 'Als klantenservice medewerker ben je het eerste aanspreekpunt voor onze klanten. Je beantwoordt vragen via telefoon, email en chat.',
    status: 'agent_created',
    createdAt: '2026-01-20T09:15:00Z',
    source: 'salesforce',
  },
  {
    id: '4',
    title: 'Productiemedewerker',
    company: 'FoodFactory BV',
    location: 'Gent, België',
    description: 'Voor onze voedselproductielijn zoeken we productiemedewerkers. Je werkt in ploegen en bent verantwoordelijk voor het bedienen van machines.',
    status: 'new',
    createdAt: '2026-01-27T11:45:00Z',
    source: 'salesforce',
  },
  {
    id: '5',
    title: 'Schoonmaker',
    company: 'CleanPro Services',
    location: 'Leuven, België',
    description: 'Wij zoeken schoonmakers voor diverse kantoorlocaties. Flexibele werktijden mogelijk, voornamelijk vroege ochtend of late avond.',
    status: 'in_progress',
    createdAt: '2026-01-22T08:00:00Z',
    source: 'salesforce',
  },
  {
    id: '6',
    title: 'Horeca Medewerker',
    company: 'Brasserie De Kroon',
    location: 'Mechelen, België',
    description: 'Voor ons restaurant zoeken we allround horeca medewerkers. Je helpt in de bediening en ondersteunt in de keuken waar nodig.',
    status: 'new',
    createdAt: '2026-01-29T07:30:00Z',
    source: 'salesforce',
  },
  // Running interviews
  {
    id: '10',
    title: 'Bezorger',
    company: 'Express Delivery',
    location: 'Gent, België',
    description: 'Wij zoeken bezorgers voor pakketleveringen in de regio Gent.',
    status: 'agent_created',
    createdAt: '2026-01-18T10:00:00Z',
    source: 'salesforce',
  },
  {
    id: '11',
    title: 'Winkelmedewerker',
    company: 'Fashion Store',
    location: 'Antwerpen, België',
    description: 'Voor onze kledingwinkel zoeken we enthousiaste winkelmedewerkers.',
    status: 'in_progress',
    createdAt: '2026-01-17T14:00:00Z',
    source: 'salesforce',
  },
  {
    id: '12',
    title: 'Heftruckchauffeur',
    company: 'Warehouse Plus',
    location: 'Mechelen, België',
    description: 'Ervaren heftruckchauffeur gezocht voor ons magazijn.',
    status: 'agent_created',
    createdAt: '2026-01-16T09:00:00Z',
    source: 'salesforce',
  },
  {
    id: '13',
    title: 'Administratief Medewerker',
    company: 'Office Solutions',
    location: 'Brussel, België',
    description: 'Administratief medewerker voor algemene kantoorwerkzaamheden.',
    status: 'agent_created',
    createdAt: '2026-01-15T11:00:00Z',
    source: 'salesforce',
  },
  {
    id: '14',
    title: 'Monteur',
    company: 'TechFix BV',
    location: 'Leuven, België',
    description: 'Monteur voor installatie en reparatie van huishoudelijke apparaten.',
    status: 'in_progress',
    createdAt: '2026-01-14T08:30:00Z',
    source: 'manual',
  },
  {
    id: '15',
    title: 'Barista',
    company: 'Coffee Corner',
    location: 'Gent, België',
    description: 'Gepassioneerde barista gezocht voor ons koffiehuis.',
    status: 'agent_created',
    createdAt: '2026-01-13T12:00:00Z',
    source: 'salesforce',
  },
  {
    id: '16',
    title: 'Orderpicker',
    company: 'E-Commerce Hub',
    location: 'Antwerpen, België',
    description: 'Orderpickers voor ons e-commerce distributiecentrum.',
    status: 'agent_created',
    createdAt: '2026-01-12T07:00:00Z',
    source: 'salesforce',
  },
  {
    id: '17',
    title: 'Beveiligingsagent',
    company: 'SecureGuard',
    location: 'Brussel, België',
    description: 'Beveiligingsagent voor evenementen en kantoorgebouwen.',
    status: 'in_progress',
    createdAt: '2026-01-11T16:00:00Z',
    source: 'salesforce',
  },
  {
    id: '18',
    title: 'Keukenhulp',
    company: 'Restaurant De Smaak',
    location: 'Hasselt, België',
    description: 'Keukenhulp voor ondersteuning in onze drukke restaurantkeuken.',
    status: 'agent_created',
    createdAt: '2026-01-10T13:00:00Z',
    source: 'manual',
  },
  {
    id: '19',
    title: 'Callcenter Agent',
    company: 'ContactCenter Pro',
    location: 'Leuven, België',
    description: 'Callcenter agent voor inkomende en uitgaande gesprekken.',
    status: 'agent_created',
    createdAt: '2026-01-09T10:00:00Z',
    source: 'salesforce',
  },
  // Archived vacancies
  {
    id: '7',
    title: 'Kassamedewerker',
    company: 'Supermarkt Plus',
    location: 'Hasselt, België',
    description: 'Wij zoeken kassamedewerkers voor onze winkel. Je staat klanten te woord en handelt betalingen af.',
    status: 'archived',
    createdAt: '2025-11-15T09:00:00Z',
    archivedAt: '2026-01-10T16:00:00Z',
    source: 'salesforce',
  },
  {
    id: '8',
    title: 'Vrachtwagenchauffeur',
    company: 'TransPort BV',
    location: 'Antwerpen, België',
    description: 'Ervaren vrachtwagenchauffeur gezocht voor nationaal transport. Rijbewijs CE vereist.',
    status: 'archived',
    createdAt: '2025-10-20T08:00:00Z',
    archivedAt: '2025-12-28T14:30:00Z',
    source: 'salesforce',
  },
  {
    id: '9',
    title: 'Receptionist(e)',
    company: 'Hotel Centraal',
    location: 'Brussel, België',
    description: 'Voor ons hotel zoeken we een vriendelijke receptionist(e) voor de ontvangst van gasten.',
    status: 'archived',
    createdAt: '2025-09-10T11:00:00Z',
    archivedAt: '2025-11-30T10:00:00Z',
    source: 'manual',
  },
];

export const dummyQuestions: Question[] = [
  // Knockout questions
  {
    id: 'q1',
    type: 'knockout',
    text: 'Ben je beschikbaar om 25 uur per week te werken?',
    answerType: 'yes_no',
    required: true,
    order: 1,
  },
  {
    id: 'q2',
    type: 'knockout',
    text: 'Kan je afwisselend in het weekend werken (zaterdag/zondag)?',
    answerType: 'yes_no',
    required: true,
    order: 2,
  },
  {
    id: 'q3',
    type: 'knockout',
    text: 'Woon je in of rond Landen, of kan je vlot tot daar geraken?',
    answerType: 'yes_no',
    required: true,
    order: 3,
  },
  {
    id: 'q4',
    type: 'knockout',
    text: 'Heb je een geldige werkvergunning om in België te werken?',
    answerType: 'yes_no',
    required: true,
    order: 4,
  },
  {
    id: 'q5',
    type: 'knockout',
    text: 'Ben je bereid om vroeg te starten (typisch voor een bakkerij)?',
    answerType: 'yes_no',
    required: true,
    order: 5,
  },
  // Qualifying questions
  {
    id: 'q6',
    type: 'qualifying',
    text: 'Heb je ervaring in één van deze omgevingen?',
    answerType: 'multiple_choice',
    options: [
      { id: 'o1', label: 'Verkoop' },
      { id: 'o2', label: 'Horeca' },
      { id: 'o3', label: 'Bakkerij' },
      { id: 'o4', label: 'Geen ervaring, maar wel gemotiveerd' },
    ],
    required: true,
    order: 6,
  },
  {
    id: 'q7',
    type: 'qualifying',
    text: 'Wat vind je het leukst aan werken in een winkel/bakkerij?',
    answerType: 'open',
    required: true,
    order: 7,
  },
  {
    id: 'q8',
    type: 'qualifying',
    text: 'Hoe comfortabel voel je je bij klanten bedienen en afrekenen aan de kassa?',
    answerType: 'multiple_choice',
    options: [
      { id: 'o5', label: 'Heel comfortabel' },
      { id: 'o6', label: 'Gaat wel' },
      { id: 'o7', label: 'Nog weinig ervaring' },
    ],
    required: true,
    order: 8,
  },
  {
    id: 'q9',
    type: 'qualifying',
    text: 'Hoe werk je het liefst?',
    answerType: 'multiple_choice',
    options: [
      { id: 'o8', label: 'In team' },
      { id: 'o9', label: 'Zelfstandig' },
      { id: 'o10', label: 'Afwisseling van beide' },
    ],
    required: true,
    order: 9,
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    role: 'assistant',
    content: 'Ik heb de vacature geanalyseerd en knock-out en kwalificerende vragen gegenereerd. Je kunt de vragen bekijken in het "Vragen" tabblad. Heb je feedback of wil je iets aanpassen?',
    timestamp: new Date().toISOString(),
  },
];

// Generate mock interviews for the last 30 days
function generateMockInterviews(): Interview[] {
  const interviews: Interview[] = [];
  const vacancyIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const channels: ('voice' | 'whatsapp')[] = ['voice', 'whatsapp'];
  const statuses: ('started' | 'completed' | 'abandoned')[] = ['completed', 'completed', 'completed', 'abandoned', 'started'];
  
  // Generate ~150 interviews over the last 30 days
  for (let i = 0; i < 156; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    startDate.setHours(startDate.getHours() - hoursAgo);
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const totalQuestions = 9;
    const questionsAnswered = status === 'completed' ? totalQuestions : Math.floor(Math.random() * (totalQuestions - 1)) + 1;
    const knockoutPassed = status === 'completed' ? Math.random() > 0.15 : Math.random() > 0.5;
    const qualified = status === 'completed' && knockoutPassed && Math.random() > 0.3;
    
    const completedAt = status === 'completed' ? new Date(startDate.getTime() + Math.floor(Math.random() * 15 + 5) * 60000).toISOString() : undefined;
    
    interviews.push({
      id: `int-${i + 1}`,
      vacancyId: vacancyIds[Math.floor(Math.random() * vacancyIds.length)],
      agentId: `agent-${Math.floor(Math.random() * 3) + 1}`,
      channel,
      status,
      startedAt: startDate.toISOString(),
      completedAt,
      questionsAnswered,
      totalQuestions,
      qualified,
      knockoutPassed,
    });
  }
  
  return interviews.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
}

export const dummyInterviews: Interview[] = generateMockInterviews();

// Calculate metrics from interviews
export function calculateInterviewMetrics(interviews: Interview[], vacancies: Vacancy[]): InterviewMetrics {
  const totalInterviews = interviews.length;
  const completedInterviews = interviews.filter(i => i.status === 'completed').length;
  const qualifiedCandidates = interviews.filter(i => i.qualified).length;
  
  const voiceCount = interviews.filter(i => i.channel === 'voice').length;
  const whatsappCount = interviews.filter(i => i.channel === 'whatsapp').length;
  
  // Weekly trend (last 4 weeks)
  const weeklyTrend: { date: string; count: number }[] = [];
  for (let i = 27; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = interviews.filter(int => int.startedAt.split('T')[0] === dateStr).length;
    weeklyTrend.push({ date: dateStr, count });
  }
  
  // Popular vacancies
  const vacancyCounts: Record<string, number> = {};
  interviews.forEach(int => {
    vacancyCounts[int.vacancyId] = (vacancyCounts[int.vacancyId] || 0) + 1;
  });
  
  const popularVacancies = Object.entries(vacancyCounts)
    .map(([vacancyId, count]) => {
      const vacancy = vacancies.find(v => v.id === vacancyId);
      return {
        vacancyId,
        title: vacancy?.title || 'Unknown',
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  return {
    totalInterviews,
    completedInterviews,
    completionRate: totalInterviews > 0 ? Math.round((completedInterviews / totalInterviews) * 100) : 0,
    qualifiedCandidates,
    qualificationRate: completedInterviews > 0 ? Math.round((qualifiedCandidates / completedInterviews) * 100) : 0,
    channelBreakdown: {
      voice: voiceCount,
      whatsapp: whatsappCount,
    },
    weeklyTrend,
    popularVacancies,
  };
}

export const dummyMetrics = calculateInterviewMetrics(dummyInterviews, dummyVacancies);
