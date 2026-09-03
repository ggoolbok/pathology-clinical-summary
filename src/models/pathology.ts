import type { Sex, WithProvenance } from './common';
import type { AccessionStatus } from './worklist';

/** The pathology case the pathologist currently has open (header of the main panel). */
export interface CurrentPathologyCase {
  accessionNumber: string;
  patientId: string;
  age: number;
  sex: Sex;
  specimen: string;
  organSite: string;
  procedure: string;
  receivedDateTime: string;
  status: AccessionStatus;
  /** Clinical information submitted with the pathology request by the ordering clinician. */
  clinicalInformationSubmitted: string;
}

/**
 * A previous (or current) pathology diagnosis for a patient. Full ancillary
 * sections are optional because not every case has IHC / molecular / etc.,
 * and their absence must read as "not performed / not documented", not as
 * a blank rendering error.
 */
export interface PathologyRecord extends WithProvenance {
  pathologyNumber: string;
  patientId: string;
  accessionNumber?: string;
  organSite: string;
  specimen: string;
  diagnosisDate: string;
  /** Short diagnosis line for table display. */
  diagnosisSummary: string;
  pathologist: string;
  /** Previous malignancy must stay high priority regardless of organ — see relevance service. */
  isMalignant: boolean;
  fullFinalDiagnosis: string;
  comment?: string;
  microscopicDescription?: string;
  immunohistochemistry?: string;
  specialStains?: string;
  molecularStudies?: string;
  ancillaryStudies?: string;
}
