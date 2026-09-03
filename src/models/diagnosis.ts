import type { WithProvenance } from './common';

export type DiagnosisCategory =
  | 'hypertension'
  | 'diabetes'
  | 'ckd'
  | 'autoimmune'
  | 'chronic_hepatitis'
  | 'malignancy'
  | 'transplant_related'
  | 'tuberculosis'
  | 'other';

/** General diagnosis lifecycle — whether the problem-list entry itself is still current. */
export type DiagnosisStatus = 'active' | 'resolved' | 'historical';

/**
 * Disease-specific clinical activity, distinct from the general
 * `DiagnosisStatus` lifecycle above. Most chronic diseases (hypertension,
 * diabetes, CKD, malignancy history, etc.) have no clinically meaningful
 * "activity" concept worth surfacing in the summary — whether the
 * diagnosis is still on the problem list is enough. Tuberculosis is the
 * one category in Version 1 where activity (active vs inactive disease)
 * is itself an important clinical fact, so it gets its own field rather
 * than overloading DiagnosisStatus. Only ever set from an explicit source
 * statement — never inferred from treatment history, imaging, medication,
 * or elapsed time.
 */
export type DiseaseActivityStatus = 'active' | 'inactive' | 'unknown';

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
  /** Only meaningful (and only ever populated) for category 'tuberculosis' — see DiseaseActivityStatus. */
  activityStatus?: DiseaseActivityStatus;
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
