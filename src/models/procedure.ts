import type { PresenceStatus, WithProvenance } from './common';

export type ProcedureCategory = 'surgery' | 'endoscopy' | 'biopsy' | 'other';

/** Only populated when the source record explicitly documents an R-status. */
export type ResectionStatus = 'R0' | 'R1' | 'R2';

export interface CancerSurgeryFindings {
  tumorLocation?: string;
  tumorSize?: string;
  grossInvasion: PresenceStatus;
  adjacentOrganInvolvement: PresenceStatus;
  lymphNodeFindings?: string;
  metastaticLesions: PresenceStatus;
  peritonealDissemination: PresenceStatus;
  surgicalMarginInfo?: string;
  frozenSectionMarginInfo?: string;
  resectionStatus?: ResectionStatus;
}

export interface AppendectomyFindings {
  perforation: PresenceStatus;
  peritonitis: PresenceStatus;
  /** Meaningful only when peritonitis is 'present'; otherwise 'not_documented'. */
  peritonitisExtent: 'localized' | 'generalized' | 'not_documented';
  abscess: PresenceStatus;
  gangrenousChange: PresenceStatus;
  appendicolith: PresenceStatus;
}

export interface ProcedureRecord extends WithProvenance {
  id: string;
  patientId: string;
  category: ProcedureCategory;
  procedureName: string;
  procedureDate: string;
  organSite: string;
  surgeon?: string;
  operativeFindingsSummary?: string;
  cancerSurgeryFindings?: CancerSurgeryFindings;
  appendectomyFindings?: AppendectomyFindings;
  fullOperativeNote: string;
  /** Accession number of the pathology case this procedure generated a specimen for, if any. */
  relatedAccessionNumber?: string;
}
