import {
  PreOnboardingConfig,
  PreOnboardingRequest,
  JobType,
  DocumentType,
  NationalityStatus,
  DocumentCollectionStatus
} from './types';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

// =============================================================================
// REAL ENDPOINT - Already exists in backend
// =============================================================================

export async function initiateDocumentCollection(request: {
  vacancy_id: string;
  candidate_name: string;
  candidate_lastname: string;
  whatsapp_number: string;
  documents: string[]; // e.g., ["id_card", "driver_license"]
}): Promise<any> {
  const response = await fetch(`${BACKEND_URL}/documents/collect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Failed to initiate document collection');
  }

  return response.json();
}

// =============================================================================
// DUMMY DATA - Hardcoded for now, will be replaced with real API later
// =============================================================================

export async function getOnboardingConfig(
  vacancyId: string
): Promise<PreOnboardingConfig | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return dummy config
  return {
    id: '123',
    vacancy_id: vacancyId,
    job_type: 'arbeider',
    required_documents: ['id_card', 'bank_account', 'medical_certificate'],
    status: 'active',
    is_online: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  };
}

export async function createOnboardingConfig(
  vacancyId: string,
  jobType: JobType,
  requiredDocuments: DocumentType[]
): Promise<PreOnboardingConfig> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return dummy response
  return {
    id: Math.random().toString(36).substring(7),
    vacancy_id: vacancyId,
    job_type: jobType,
    required_documents: requiredDocuments,
    status: 'draft',
    is_online: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

export async function getOnboardingRequests(
  vacancyId: string
): Promise<PreOnboardingRequest[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return dummy requests
  return [
    {
      id: '1',
      vacancy_id: vacancyId,
      application_id: 'app-1',
      candidate_name: 'Jan',
      candidate_lastname: 'Jansen',
      whatsapp_number: '+32487123456',
      nationality: 'belg',
      documents_required: ['id_card', 'bank_account'],
      documents_collected: [
        {
          document_type: 'id_card',
          collected: true,
          verified: true,
          uploaded_at: new Date().toISOString()
        },
        {
          document_type: 'bank_account',
          collected: false,
          verified: false
        }
      ],
      status: 'in_progress',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      vacancy_id: vacancyId,
      application_id: 'app-2',
      candidate_name: 'Pieter',
      candidate_lastname: 'Pieters',
      whatsapp_number: '+32487654321',
      nationality: 'niet-belg',
      documents_required: ['id_card', 'bank_account', 'work_permit'],
      documents_collected: [
        {
          document_type: 'id_card',
          collected: true,
          verified: true,
          uploaded_at: new Date().toISOString()
        },
        {
          document_type: 'bank_account',
          collected: true,
          verified: true,
          uploaded_at: new Date().toISOString()
        },
        {
          document_type: 'work_permit',
          collected: true,
          verified: false,
          uploaded_at: new Date().toISOString()
        }
      ],
      status: 'completed',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    }
  ];
}

export async function getOnboardingStats(): Promise<{
  totalRequests: number;
  completionRate: number;
  fullyCollected: number;
  verificationPending: number;
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return dummy stats
  return {
    totalRequests: 24,
    completionRate: 75,
    fullyCollected: 18,
    verificationPending: 3
  };
}
