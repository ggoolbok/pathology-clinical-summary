import type { Sex } from './common';

export type AccessionStatus = 'PENDING' | 'IN_PROGRESS' | 'SIGNED_OUT' | 'AMENDED';

/** One row of the pathology worklist. */
export interface WorklistItem {
  accessionNumber: string;
  patientId: string;
  mockPatientId: string;
  age: number;
  sex: Sex;
  specimen: string;
  organSite: string;
  procedure: string;
  receivedDateTime: string;
  status: AccessionStatus;
}
