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
 * Where a document sits in the future OCR/structured-extraction workflow:
 *
 *   original scanned report
 *     → OCR / document extraction        (not_processed → extracted)
 *     → structured candidate values      (extracted)
 *     → compare with original image      (needs_verification)
 *     → human verification               (verified, or failed if rejected)
 *
 * Version 1 does not implement OCR: every mock document is
 * 'not_processed', and no code path may fabricate a value for any other
 * status. This field exists so a later version can add real extraction
 * without reshaping the model or the UI's original-vs-extracted-vs-verified
 * distinction.
 */
export type ExtractionStatus = 'not_processed' | 'extracted' | 'needs_verification' | 'verified' | 'failed';

/** One candidate key/value pair proposed by (future) OCR/extraction — never trusted until verified. */
export interface ExtractedField {
  label: string;
  value: string;
}

/**
 * A scanned/attached external clinical document (report or image) that is
 * not represented as structured lab data. Version 1 never interprets the
 * content automatically — it only identifies relevance and lets the
 * pathologist open the original. The extraction/verification fields below
 * are the seam for a future OCR pipeline; they are optional and unpopulated
 * in Version 1's mock data so the UI never presents unverified candidate
 * data as trusted clinical fact.
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
  /** Defaults to 'not_processed' in Version 1 — see ExtractionStatus. */
  extractionStatus: ExtractionStatus;
  /** Only meaningful once extractionStatus is 'extracted' or later. Never fabricated in Version 1. */
  extractedFields?: ExtractedField[];
  extractedText?: string;
  /** Set only once a human has reviewed the extracted candidate data against the original. */
  verifiedBy?: string;
  verifiedAt?: string;
}

export const EXTRACTION_STATUS_LABEL_KO: Record<ExtractionStatus, string> = {
  not_processed: '자동 추출 미처리 · 원본만 확인 가능',
  extracted: '자동 추출 완료 · 미검증',
  needs_verification: '검증 필요',
  verified: '검증 완료',
  failed: '자동 추출 실패',
};
