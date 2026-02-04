import { JobType, NationalityStatus, DocumentType } from './types';

export interface DocumentRequirement {
  type: DocumentType;
  label: string;
  description: string;
  required: boolean;
  reason: string;
}

/**
 * Determines which documents are required based on job type and nationality
 */
export function getRequiredDocuments(
  jobType: JobType,
  nationality: NationalityStatus,
  hasDriverLicenseRequirement?: boolean,
  hasMedicalRequirement?: boolean
): DocumentRequirement[] {
  const requirements: DocumentRequirement[] = [];

  // ALWAYS REQUIRED: ID card (front and back)
  requirements.push({
    type: 'id_card',
    label: 'Identiteitskaart',
    description: 'Voor- en achterkant van identiteitskaart',
    required: true,
    reason: 'Wettelijk verplicht voor alle werknemers'
  });

  // ALWAYS REQUIRED: Bank account number
  requirements.push({
    type: 'bank_account',
    label: 'Rekeningnummer',
    description: 'IBAN rekeningnummer voor loonbetaling',
    required: true,
    reason: 'Nodig voor loonbetaling'
  });

  // NON-BELGIAN: Work permit
  if (nationality === 'niet-belg') {
    requirements.push({
      type: 'work_permit',
      label: 'Werkvergunning',
      description: 'Geldige werkvergunning voor België',
      required: true,
      reason: 'Wettelijk verplicht voor niet-Belgische werknemers'
    });
  }

  // JOB-SPECIFIC: Driver's license
  if (hasDriverLicenseRequirement) {
    requirements.push({
      type: 'driver_license',
      label: 'Rijbewijs',
      description: 'Geldig rijbewijs',
      required: true,
      reason: 'Vereist voor deze functie (vervoer/mobiliteit)'
    });
  }

  // JOB-SPECIFIC: Medical certificate
  if (hasMedicalRequirement || jobType === 'arbeider') {
    requirements.push({
      type: 'medical_certificate',
      label: 'Medisch attest',
      description: 'Medische keuring of geschiktheidsattest',
      required: jobType === 'arbeider',
      reason: jobType === 'arbeider'
        ? 'Wettelijk verplicht voor arbeiders (fysiek werk)'
        : 'Vereist voor deze specifieke functie'
    });
  }

  // OPTIONAL: Certificates/Diplomas
  requirements.push({
    type: 'certificate_diploma',
    label: 'Certificaten & Diploma',
    description: 'Relevante certificaten, diploma\'s of opleidingen',
    required: false,
    reason: 'Optioneel, maar kan selectie versterken'
  });

  return requirements;
}

/**
 * Get a simple summary of required documents
 */
export function getRequiredDocumentsSummary(
  jobType: JobType,
  nationality: NationalityStatus,
  requirements?: DocumentRequirement[]
): string {
  const docs = requirements || getRequiredDocuments(jobType, nationality);
  const required = docs.filter(d => d.required);
  const optional = docs.filter(d => !d.required);

  let summary = `${required.length} verplichte documenten`;
  if (optional.length > 0) {
    summary += ` + ${optional.length} optionele`;
  }
  return summary;
}

/**
 * Get document type icon
 */
export function getDocumentIcon(type: DocumentType): string {
  const icons: Record<DocumentType, string> = {
    id_card: '📄',
    driver_license: '🚗',
    work_permit: '📋',
    medical_certificate: '🏥',
    certificate_diploma: '🎓',
    bank_account: '💳'
  };
  return icons[type] || '📄';
}

/**
 * Get document type label
 */
export function getDocumentLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    id_card: 'Identiteitskaart',
    driver_license: 'Rijbewijs',
    work_permit: 'Werkvergunning',
    medical_certificate: 'Medisch attest',
    certificate_diploma: 'Certificaten & Diploma',
    bank_account: 'Rekeningnummer'
  };
  return labels[type] || type;
}
