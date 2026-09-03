import type { ExternalClinicalDocument } from '../models';

const PDF_ASSET = '/mock-assets/placeholder-external-report.pdf';
const IMAGE_ASSET = '/mock-assets/placeholder-image-report.svg';

/**
 * Synthetic external/scanned clinical documents. fileUrl always points to a
 * local synthetic placeholder asset (see /public/mock-assets) — never a
 * real scanned document. Version 1 never OCRs or auto-interprets these;
 * the app only surfaces relevance and lets the pathologist open the original.
 * Every record is `extractionStatus: 'not_processed'` — Version 1 does not
 * populate extractedFields/extractedText/verifiedBy/verifiedAt for any
 * document; those fields exist only so a future OCR pipeline can be added
 * without reshaping this model. See ExtractionStatus in
 * src/models/externalDocument.ts.
 */
export const mockExternalDocuments: ExternalClinicalDocument[] = [
  // PT-001 — kidney transplant: DSA
  {
    id: 'EXT-001',
    patientId: 'PT-001',
    reportType: 'DSA',
    reportDate: '2026-08-28',
    title: 'Donor-Specific Antibody Panel',
    fileType: 'pdf',
    fileUrl: PDF_ASSET,
    organSite: 'Kidney (transplant allograft)',
    notes: 'Ordered as part of rising-creatinine workup prior to allograft biopsy.',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-001' },
  },

  // PT-003 — MGRS: immunofixation + electrophoresis (serum and urine)
  {
    id: 'EXT-002',
    patientId: 'PT-003',
    reportType: 'SERUM_IMMUNOFIXATION',
    reportDate: '2026-08-20',
    title: 'Serum Immunofixation Electrophoresis',
    fileType: 'image',
    fileUrl: IMAGE_ASSET,
    organSite: 'Kidney (native)',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-002' },
  },
  {
    id: 'EXT-003',
    patientId: 'PT-003',
    reportType: 'URINE_IMMUNOFIXATION',
    reportDate: '2026-08-20',
    title: 'Urine Immunofixation Electrophoresis',
    fileType: 'image',
    fileUrl: IMAGE_ASSET,
    organSite: 'Kidney (native)',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-003' },
  },
  {
    id: 'EXT-004',
    patientId: 'PT-003',
    reportType: 'SERUM_PROTEIN_ELECTROPHORESIS',
    reportDate: '2026-08-20',
    title: 'Serum Protein Electrophoresis (SPEP)',
    fileType: 'pdf',
    fileUrl: PDF_ASSET,
    organSite: 'Kidney (native)',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-004' },
  },
  {
    id: 'EXT-005',
    patientId: 'PT-003',
    reportType: 'URINE_PROTEIN_ELECTROPHORESIS',
    reportDate: '2026-08-20',
    title: 'Urine Protein Electrophoresis (UPEP)',
    fileType: 'pdf',
    fileUrl: PDF_ASSET,
    organSite: 'Kidney (native)',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-005' },
  },

  // PT-012 — lymph node/lymphoma workup: flow cytometry, cytogenetics
  {
    id: 'EXT-006',
    patientId: 'PT-012',
    reportType: 'FLOW_CYTOMETRY',
    reportDate: '2026-09-03',
    title: 'Flow Cytometry Immunophenotyping, Lymph Node',
    fileType: 'pdf',
    fileUrl: PDF_ASSET,
    organSite: 'Lymph node, cervical',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-006' },
  },
  {
    id: 'EXT-007',
    patientId: 'PT-012',
    reportType: 'CYTOGENETICS',
    reportDate: '2026-09-05',
    title: 'Cytogenetics / FISH Panel, Lymph Node',
    fileType: 'pdf',
    fileUrl: PDF_ASSET,
    organSite: 'Lymph node, cervical',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-007' },
  },

  // PT-005 — outside molecular report referenced during HCC recurrence workup
  {
    id: 'EXT-008',
    patientId: 'PT-005',
    reportType: 'EXTERNAL_LAB_REPORT',
    reportDate: '2023-04-08',
    title: 'Outside Hospital Liver Function Panel (Referral Records)',
    fileType: 'pdf',
    fileUrl: PDF_ASSET,
    organSite: 'Liver',
    notes: 'Scanned referral labs from outside hospital prior to transfer of care.',
    extractionStatus: 'not_processed',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'EXT-008' },
  },
];

export function getExternalDocumentsForPatient(patientId: string): ExternalClinicalDocument[] {
  return mockExternalDocuments.filter((d) => d.patientId === patientId);
}
