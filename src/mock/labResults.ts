import type { LabResult } from '../models';

/**
 * Structured numeric/qualitative lab results. Which of these are shown for
 * a given case is decided by clinicalRelevanceProfiles.ts (matched by
 * testCode), not by hard-coded logic here or in the UI.
 */
export const mockLabResults: LabResult[] = [
  // PT-001 — kidney transplant: creatinine/eGFR trend prompting biopsy, tacrolimus trough, BK/CMV
  { id: 'LAB-001', patientId: 'PT-001', testCode: 'CREATININE', testName: 'Serum Creatinine', value: '1.3', numericValue: 1.3, unit: 'mg/dL', referenceRange: '0.6-1.2', dateTime: '2026-06-01T09:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-001' } },
  { id: 'LAB-002', patientId: 'PT-001', testCode: 'CREATININE', testName: 'Serum Creatinine', value: '1.5', numericValue: 1.5, unit: 'mg/dL', referenceRange: '0.6-1.2', dateTime: '2026-08-01T09:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-002' } },
  { id: 'LAB-003', patientId: 'PT-001', testCode: 'CREATININE', testName: 'Serum Creatinine', value: '1.9', numericValue: 1.9, unit: 'mg/dL', referenceRange: '0.6-1.2', dateTime: '2026-09-02T07:30:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-003' } },
  { id: 'LAB-004', patientId: 'PT-001', testCode: 'EGFR', testName: 'eGFR (CKD-EPI)', value: '58', numericValue: 58, unit: 'mL/min/1.73m²', referenceRange: '>60', dateTime: '2026-06-01T09:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-004' } },
  { id: 'LAB-005', patientId: 'PT-001', testCode: 'EGFR', testName: 'eGFR (CKD-EPI)', value: '48', numericValue: 48, unit: 'mL/min/1.73m²', referenceRange: '>60', dateTime: '2026-08-01T09:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-005' } },
  { id: 'LAB-006', patientId: 'PT-001', testCode: 'EGFR', testName: 'eGFR (CKD-EPI)', value: '36', numericValue: 36, unit: 'mL/min/1.73m²', referenceRange: '>60', dateTime: '2026-09-02T07:30:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-006' } },
  { id: 'LAB-007', patientId: 'PT-001', testCode: 'TACROLIMUS', testName: 'Tacrolimus Trough', value: '6.2', numericValue: 6.2, unit: 'ng/mL', referenceRange: '5-10', dateTime: '2026-08-01T09:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-007' } },
  { id: 'LAB-008', patientId: 'PT-001', testCode: 'TACROLIMUS', testName: 'Tacrolimus Trough', value: '4.1', numericValue: 4.1, unit: 'ng/mL', referenceRange: '5-10', dateTime: '2026-09-02T07:30:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-008' } },
  { id: 'LAB-009', patientId: 'PT-001', testCode: 'BK_PCR', testName: 'BK Virus PCR, plasma', value: 'Not detected', referenceRange: 'Not detected', dateTime: '2026-09-02T07:30:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-009' } },
  { id: 'LAB-010', patientId: 'PT-001', testCode: 'CMV_PCR', testName: 'CMV PCR, plasma', value: 'Not detected', referenceRange: 'Not detected', dateTime: '2026-09-02T07:30:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-010' } },

  // PT-002 — native kidney biopsy: proteinuria, hematuria workup, complement, autoimmune serology
  { id: 'LAB-011', patientId: 'PT-002', testCode: 'CREATININE', testName: 'Serum Creatinine', value: '1.1', numericValue: 1.1, unit: 'mg/dL', referenceRange: '0.5-1.0', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-011' } },
  { id: 'LAB-012', patientId: 'PT-002', testCode: 'EGFR', testName: 'eGFR (CKD-EPI)', value: '72', numericValue: 72, unit: 'mL/min/1.73m²', referenceRange: '>90', dateTime: '2026-09-01T08:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-012' } },
  { id: 'LAB-013', patientId: 'PT-002', testCode: 'URINE_PROTEIN', testName: 'Urine Protein, dipstick', value: '3+', referenceRange: 'Negative', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-013' } },
  { id: 'LAB-014', patientId: 'PT-002', testCode: 'UPCR', testName: 'Urine Protein/Creatinine Ratio', value: '4.8', numericValue: 4.8, unit: 'g/g', referenceRange: '<0.2', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-014' } },
  { id: 'LAB-015', patientId: 'PT-002', testCode: 'UACR', testName: 'Urine Albumin/Creatinine Ratio', value: '3200', numericValue: 3200, unit: 'mg/g', referenceRange: '<30', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-015' } },
  { id: 'LAB-016', patientId: 'PT-002', testCode: 'C3', testName: 'Complement C3', value: '65', numericValue: 65, unit: 'mg/dL', referenceRange: '90-180', dateTime: '2026-09-01T08:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-016' } },
  { id: 'LAB-017', patientId: 'PT-002', testCode: 'C4', testName: 'Complement C4', value: '8', numericValue: 8, unit: 'mg/dL', referenceRange: '10-40', dateTime: '2026-09-01T08:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-017' } },
  { id: 'LAB-018', patientId: 'PT-002', testCode: 'ANA', testName: 'Antinuclear Antibody', value: '1:320, speckled', referenceRange: '<1:40', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-018' } },
  { id: 'LAB-019', patientId: 'PT-002', testCode: 'ANCA', testName: 'ANCA (MPO/PR3)', value: 'Negative', referenceRange: 'Negative', dateTime: '2026-09-01T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-019' } },
  { id: 'LAB-020', patientId: 'PT-002', testCode: 'ANTI_GBM', testName: 'Anti-GBM Antibody', value: 'Negative', referenceRange: 'Negative', dateTime: '2026-09-01T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-020' } },

  // PT-003 — MGRS: SFLC, ratio, kidney function
  { id: 'LAB-021', patientId: 'PT-003', testCode: 'CREATININE', testName: 'Serum Creatinine', value: '1.4', numericValue: 1.4, unit: 'mg/dL', referenceRange: '0.7-1.3', dateTime: '2026-08-15T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-021' } },
  { id: 'LAB-022', patientId: 'PT-003', testCode: 'CREATININE', testName: 'Serum Creatinine', value: '1.6', numericValue: 1.6, unit: 'mg/dL', referenceRange: '0.7-1.3', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-022' } },
  { id: 'LAB-023', patientId: 'PT-003', testCode: 'EGFR', testName: 'eGFR (CKD-EPI)', value: '45', numericValue: 45, unit: 'mL/min/1.73m²', referenceRange: '>60', dateTime: '2026-09-01T08:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-023' } },
  { id: 'LAB-024', patientId: 'PT-003', testCode: 'SERUM_FREE_LIGHT_CHAIN_KAPPA', testName: 'Serum Free Light Chain, Kappa', value: '185', numericValue: 185, unit: 'mg/L', referenceRange: '3.3-19.4', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-024' } },
  { id: 'LAB-025', patientId: 'PT-003', testCode: 'SERUM_FREE_LIGHT_CHAIN_LAMBDA', testName: 'Serum Free Light Chain, Lambda', value: '12', numericValue: 12, unit: 'mg/L', referenceRange: '5.7-26.3', dateTime: '2026-08-20T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-025' } },
  { id: 'LAB-026', patientId: 'PT-003', testCode: 'FLC_RATIO', testName: 'Kappa/Lambda FLC Ratio', value: '15.4', numericValue: 15.4, referenceRange: '0.26-1.65', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-026' } },
  { id: 'LAB-027', patientId: 'PT-003', testCode: 'URINE_PROTEIN', testName: 'Urine Protein, dipstick', value: '2+', referenceRange: 'Negative', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-027' } },
  { id: 'LAB-028', patientId: 'PT-003', testCode: 'UPCR', testName: 'Urine Protein/Creatinine Ratio', value: '2.1', numericValue: 2.1, unit: 'g/g', referenceRange: '<0.2', dateTime: '2026-09-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-028' } },

  // PT-004 — gastric cancer: CEA/CA19-9 trend, nutrition
  { id: 'LAB-029', patientId: 'PT-004', testCode: 'CEA', testName: 'CEA', value: '8.2', numericValue: 8.2, unit: 'ng/mL', referenceRange: '<5.0', dateTime: '2025-07-10T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-029' } },
  { id: 'LAB-030', patientId: 'PT-004', testCode: 'CEA', testName: 'CEA', value: '9.5', numericValue: 9.5, unit: 'ng/mL', referenceRange: '<5.0', dateTime: '2025-08-15T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-030' } },
  { id: 'LAB-031', patientId: 'PT-004', testCode: 'CA19_9', testName: 'CA 19-9', value: '45', numericValue: 45, unit: 'U/mL', referenceRange: '<37', dateTime: '2025-08-15T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-031' } },
  { id: 'LAB-032', patientId: 'PT-004', testCode: 'ALBUMIN', testName: 'Serum Albumin', value: '3.8', numericValue: 3.8, unit: 'g/dL', referenceRange: '3.5-5.0', dateTime: '2026-08-25T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-032' } },
  { id: 'LAB-033', patientId: 'PT-004', testCode: 'HEMOGLOBIN', testName: 'Hemoglobin', value: '11.2', numericValue: 11.2, unit: 'g/dL', referenceRange: '13.0-17.0', dateTime: '2026-08-25T08:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-033' } },

  // PT-005 — HCC surveillance: AFP trend, liver panel, hepatitis markers
  { id: 'LAB-034', patientId: 'PT-005', testCode: 'AFP', testName: 'Alpha-Fetoprotein', value: '850', numericValue: 850, unit: 'ng/mL', referenceRange: '<8.1', dateTime: '2023-04-05T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-034' } },
  { id: 'LAB-035', patientId: 'PT-005', testCode: 'AFP', testName: 'Alpha-Fetoprotein', value: '8', numericValue: 8, unit: 'ng/mL', referenceRange: '<8.1', dateTime: '2024-04-01T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-035' } },
  { id: 'LAB-036', patientId: 'PT-005', testCode: 'AFP', testName: 'Alpha-Fetoprotein', value: '45', numericValue: 45, unit: 'ng/mL', referenceRange: '<8.1', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-036' } },
  { id: 'LAB-037', patientId: 'PT-005', testCode: 'AST', testName: 'AST', value: '58', numericValue: 58, unit: 'U/L', referenceRange: '<40', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-037' } },
  { id: 'LAB-038', patientId: 'PT-005', testCode: 'ALT', testName: 'ALT', value: '45', numericValue: 45, unit: 'U/L', referenceRange: '<41', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-038' } },
  { id: 'LAB-039', patientId: 'PT-005', testCode: 'ALP', testName: 'ALP', value: '130', numericValue: 130, unit: 'U/L', referenceRange: '40-129', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-039' } },
  { id: 'LAB-040', patientId: 'PT-005', testCode: 'GGT', testName: 'GGT', value: '88', numericValue: 88, unit: 'U/L', referenceRange: '<38', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-040' } },
  { id: 'LAB-041', patientId: 'PT-005', testCode: 'BILIRUBIN', testName: 'Total Bilirubin', value: '1.4', numericValue: 1.4, unit: 'mg/dL', referenceRange: '0.2-1.2', dateTime: '2026-08-20T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-041' } },
  { id: 'LAB-042', patientId: 'PT-005', testCode: 'ALBUMIN', testName: 'Serum Albumin', value: '3.2', numericValue: 3.2, unit: 'g/dL', referenceRange: '3.5-5.0', dateTime: '2026-08-20T08:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-042' } },
  { id: 'LAB-043', patientId: 'PT-005', testCode: 'HBSAG', testName: 'Hepatitis B Surface Antigen', value: 'Reactive', referenceRange: 'Non-reactive', dateTime: '2010-01-08T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-043' } },
  { id: 'LAB-044', patientId: 'PT-005', testCode: 'HBSAB', testName: 'Hepatitis B Surface Antibody', value: 'Non-reactive', referenceRange: 'Non-reactive', dateTime: '2010-01-08T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-044' } },

  // PT-006 / PT-007 — appendicitis: WBC/CRP
  { id: 'LAB-045', patientId: 'PT-006', testCode: 'WBC', testName: 'WBC Count', value: '14.2', numericValue: 14.2, unit: 'x10^3/µL', referenceRange: '4.0-10.0', dateTime: '2026-09-03T01:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-045' } },
  { id: 'LAB-046', patientId: 'PT-006', testCode: 'CRP', testName: 'C-Reactive Protein', value: '12.8', numericValue: 12.8, unit: 'mg/dL', referenceRange: '<0.5', dateTime: '2026-09-03T01:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-046' } },
  { id: 'LAB-047', patientId: 'PT-007', testCode: 'WBC', testName: 'WBC Count', value: '11.5', numericValue: 11.5, unit: 'x10^3/µL', referenceRange: '4.0-10.0', dateTime: '2026-09-02T22:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-047' } },
  { id: 'LAB-048', patientId: 'PT-007', testCode: 'CRP', testName: 'C-Reactive Protein', value: '3.2', numericValue: 3.2, unit: 'mg/dL', referenceRange: '<0.5', dateTime: '2026-09-02T22:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-048' } },

  // PT-008 — CEA trend: pre-op high, post-op normalized, now rising again
  { id: 'LAB-049', patientId: 'PT-008', testCode: 'CEA', testName: 'CEA', value: '12.5', numericValue: 12.5, unit: 'ng/mL', referenceRange: '<5.0', dateTime: '2022-02-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-049' } },
  { id: 'LAB-050', patientId: 'PT-008', testCode: 'CEA', testName: 'CEA', value: '2.1', numericValue: 2.1, unit: 'ng/mL', referenceRange: '<5.0', dateTime: '2022-09-10T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-050' } },
  { id: 'LAB-051', patientId: 'PT-008', testCode: 'CEA', testName: 'CEA', value: '6.8', numericValue: 6.8, unit: 'ng/mL', referenceRange: '<5.0', dateTime: '2026-08-15T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-051' } },

  // PT-009 — liver panel + AFP (normal, argues against HCC given no cirrhosis)
  { id: 'LAB-052', patientId: 'PT-009', testCode: 'AFP', testName: 'Alpha-Fetoprotein', value: '3.5', numericValue: 3.5, unit: 'ng/mL', referenceRange: '<8.1', dateTime: '2026-08-28T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-052' } },
  { id: 'LAB-053', patientId: 'PT-009', testCode: 'AST', testName: 'AST', value: '32', numericValue: 32, unit: 'U/L', referenceRange: '<35', dateTime: '2026-08-28T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-053' } },
  { id: 'LAB-054', patientId: 'PT-009', testCode: 'ALT', testName: 'ALT', value: '28', numericValue: 28, unit: 'U/L', referenceRange: '<35', dateTime: '2026-08-28T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-054' } },
  { id: 'LAB-055', patientId: 'PT-009', testCode: 'ALP', testName: 'ALP', value: '142', numericValue: 142, unit: 'U/L', referenceRange: '35-104', dateTime: '2026-08-28T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-055' } },
  { id: 'LAB-056', patientId: 'PT-009', testCode: 'BILIRUBIN', testName: 'Total Bilirubin', value: '0.8', numericValue: 0.8, unit: 'mg/dL', referenceRange: '0.2-1.2', dateTime: '2026-08-28T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-056' } },

  // PT-010 — CEA trend, nutrition
  { id: 'LAB-057', patientId: 'PT-010', testCode: 'CEA', testName: 'CEA', value: '15.2', numericValue: 15.2, unit: 'ng/mL', referenceRange: '<5.0', dateTime: '2025-06-25T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-057' } },
  { id: 'LAB-058', patientId: 'PT-010', testCode: 'CEA', testName: 'CEA', value: '18.9', numericValue: 18.9, unit: 'ng/mL', referenceRange: '<5.0', dateTime: '2025-08-01T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-058' } },
  { id: 'LAB-059', patientId: 'PT-010', testCode: 'ALBUMIN', testName: 'Serum Albumin', value: '3.9', numericValue: 3.9, unit: 'g/dL', referenceRange: '3.5-5.0', dateTime: '2026-08-30T08:00:00+09:00', flag: 'N', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-059' } },
  { id: 'LAB-060', patientId: 'PT-010', testCode: 'HEMOGLOBIN', testName: 'Hemoglobin', value: '10.8', numericValue: 10.8, unit: 'g/dL', referenceRange: '12.0-15.5', dateTime: '2026-08-30T08:00:00+09:00', flag: 'L', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-060' } },

  // PT-011 — PSA trend
  { id: 'LAB-061', patientId: 'PT-011', testCode: 'PSA', testName: 'PSA', value: '4.1', numericValue: 4.1, unit: 'ng/mL', referenceRange: '<4.0', dateTime: '2024-01-10T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-061' } },
  { id: 'LAB-062', patientId: 'PT-011', testCode: 'PSA', testName: 'PSA', value: '6.5', numericValue: 6.5, unit: 'ng/mL', referenceRange: '<4.0', dateTime: '2025-06-15T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-062' } },
  { id: 'LAB-063', patientId: 'PT-011', testCode: 'PSA', testName: 'PSA', value: '8.2', numericValue: 8.2, unit: 'ng/mL', referenceRange: '<4.0', dateTime: '2026-08-05T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-063' } },

  // PT-012 — LDH
  { id: 'LAB-064', patientId: 'PT-012', testCode: 'LDH', testName: 'LDH', value: '320', numericValue: 320, unit: 'U/L', referenceRange: '120-250', dateTime: '2026-08-25T08:00:00+09:00', flag: 'H', provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'LAB-064' } },
];

export function getLabResultsForPatient(patientId: string): LabResult[] {
  return mockLabResults.filter((l) => l.patientId === patientId);
}
