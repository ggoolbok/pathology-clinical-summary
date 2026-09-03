import type { WithProvenance } from './common';

export type DiagnosisCategory =
  | 'hypertension'
  | 'diabetes'
  | 'ckd'
  | 'autoimmune'
  | 'chronic_hepatitis'
  | 'malignancy'
  | 'transplant_related'
  | 'other';

export type DiagnosisStatus = 'active' | 'resolved' | 'historical';

export interface DiagnosisRecord extends WithProvenance {
  id: string;
  patientId: string;
  diagnosisName: string;
  category: DiagnosisCategory;
  firstDocumentedDate: string;
  lastDocumentedDate?: string;
  status: DiagnosisStatus;
  /** Free-text clinical notes, only when explicitly documented in the source record. */
  notes?: string;
}

export interface MedicationRecord extends WithProvenance {
  id: string;
  patientId: string;
  medicationName: string;
  startDate: string;
  stopDate?: string;
  dose?: string;
  frequency?: string;
  route?: string;
  /** Only populated when the indication is explicitly stated in the source record — never inferred. */
  indication?: string;
}
