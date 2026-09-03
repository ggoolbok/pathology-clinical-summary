import type { WithProvenance } from './common';

/**
 * Generic type of a scanned/attached external clinical document. Deliberately
 * not DSA-specific — DSA is just one member of this set alongside
 * immunofixation, electrophoresis, flow cytometry, cytogenetics, etc.
 */
export type ExternalReportType =
  | 'DSA'
  | 'SERUM_IMMUNOFIXATION'
  | 'URINE_IMMUNOFIXATION'
  | 'SERUM_PROTEIN_ELECTROPHORESIS'
  | 'URINE_PROTEIN_ELECTROPHORESIS'
  | 'FLOW_CYTOMETRY'
  | 'CYTOGENETICS'
  | 'MOLECULAR_REPORT'
  | 'EXTERNAL_LAB_REPORT'
  | 'OTHER';

export type ExternalDocumentFileType = 'image' | 'pdf';

/**
 * A scanned/attached external clinical document (report or image) that is
 * not represented as structured lab data. Version 1 never interprets the
 * content automatically — it only identifies relevance and lets the
 * pathologist open the original.
 */
export interface ExternalClinicalDocument extends WithProvenance {
  id: string;
  patientId: string;
  reportType: ExternalReportType;
  reportDate: string;
  title: string;
  fileType: ExternalDocumentFileType;
  /** Path to a synthetic local placeholder asset — never a real scanned document. */
  fileUrl: string;
  organSite?: string;
  notes?: string;
}
