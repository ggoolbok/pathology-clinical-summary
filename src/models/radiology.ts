import type { WithProvenance } from './common';

/**
 * Radiology records deliberately separate the short clinical summary from
 * the full original report text — the UI shows only `relevantFindings` /
 * `impressionSummary` inline, and the full text only inside the detail drawer.
 */
export interface RadiologyRecord extends WithProvenance {
  id: string;
  patientId: string;
  studyType: string;
  studyDate: string;
  organSite: string;
  isSameLesion: boolean;
  isStaging: boolean;
  relevantFindings: string;
  impressionSummary: string;
  fullFindingsText: string;
  fullImpressionText: string;
}
