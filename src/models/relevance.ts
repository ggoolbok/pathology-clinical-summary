import type { RelevancePriority } from './common';
import type { ClinicalRelevanceProfile } from './config';
import type { ExternalReportType } from './externalDocument';

export type RelevantItemCategory =
  | 'pathology'
  | 'diagnosis'
  | 'medication'
  | 'procedure'
  | 'radiology'
  | 'lab'
  | 'external_document';

/** A single record tagged with why and how strongly it matters for the current case. */
export interface RelevantItemRef {
  category: RelevantItemCategory;
  recordId: string;
  priority: RelevancePriority;
  reasonCode: string;
  reasonLabelKo: string;
}

/** Output of RuleBasedClinicalRelevanceService for one patient + current case. */
export interface ClinicalRelevanceResult {
  matchedProfiles: ClinicalRelevanceProfile[];
  relevantLabTestCodes: string[];
  relevantExternalReportTypes: ExternalReportType[];
  rankedItems: RelevantItemRef[];
}
