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
  /**
   * Structured pointer to the DiagnosisRecord this medication explicitly
   * treats, per the source record. This is deliberately a hard reference,
   * not a name/text match against `DiagnosisRecord.diagnosisName` — matching
   * by drug-class knowledge or fuzzy text would be exactly the kind of
   * inference the app must never do. Leave unset whenever the source
   * record does not explicitly document which condition a medication is
   * for; the UI then shows the medication under "적응증 확인되지 않음"
   * rather than guessing.
   */
  relatedDiagnosisId?: string;
}
