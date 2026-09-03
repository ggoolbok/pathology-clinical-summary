import type { WithProvenance } from './common';

export type LabFlag = 'H' | 'L' | 'N' | 'critical';

export interface LabResult extends WithProvenance {
  id: string;
  patientId: string;
  /** Stable machine key used by relevance profiles, e.g. 'CREATININE'. */
  testCode: string;
  testName: string;
  value: string;
  numericValue?: number;
  unit?: string;
  referenceRange?: string;
  dateTime: string;
  flag?: LabFlag;
}
