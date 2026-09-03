import type { DiagnosisRecord } from '../models';

export const mockDiagnoses: DiagnosisRecord[] = [
  // PT-001 — kidney transplant recipient
  {
    id: 'DX-001',
    patientId: 'PT-001',
    diagnosisName: 'Hypertension',
    category: 'hypertension',
    firstDocumentedDate: '2018-03-14',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-001' },
  },
  {
    id: 'DX-002',
    patientId: 'PT-001',
    diagnosisName: 'Status post deceased-donor kidney transplantation',
    category: 'transplant_related',
    firstDocumentedDate: '2021-02-10',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-002' },
  },
  {
    id: 'DX-003',
    patientId: 'PT-001',
    diagnosisName: 'Chronic allograft interstitial fibrosis and tubular atrophy (IFTA)',
    category: 'ckd',
    firstDocumentedDate: '2024-05-10',
    lastDocumentedDate: '2025-08-22',
    status: 'active',
    notes: 'Stable mild IFTA on serial allograft biopsies.',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-003' },
  },

  // PT-004 — gastric cancer patient, incidental hypertension
  {
    id: 'DX-004',
    patientId: 'PT-004',
    diagnosisName: 'Hypertension',
    category: 'hypertension',
    firstDocumentedDate: '2015-02-20',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-004' },
  },

  // PT-005 — chronic hepatitis B, cirrhosis, HCC
  {
    id: 'DX-005',
    patientId: 'PT-005',
    diagnosisName: 'Chronic hepatitis B infection',
    category: 'chronic_hepatitis',
    firstDocumentedDate: '2010-01-08',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-005' },
  },
  {
    id: 'DX-006',
    patientId: 'PT-005',
    diagnosisName: 'Liver cirrhosis (HBV-related)',
    category: 'other',
    firstDocumentedDate: '2019-06-11',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-006' },
  },
  {
    id: 'DX-007',
    patientId: 'PT-005',
    diagnosisName: 'Hepatocellular carcinoma',
    category: 'malignancy',
    firstDocumentedDate: '2023-04-18',
    lastDocumentedDate: '2026-08-20',
    status: 'active',
    notes: 'Under active surveillance following radiofrequency ablation; new lesion under current workup.',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-007' },
  },

  // PT-008 — prior colon adenocarcinoma
  {
    id: 'DX-008',
    patientId: 'PT-008',
    diagnosisName: 'Colonic adenocarcinoma, s/p sigmoid colectomy',
    category: 'malignancy',
    firstDocumentedDate: '2022-02-09',
    lastDocumentedDate: '2026-08-01',
    status: 'historical',
    notes: 'No evidence of recurrence on surveillance through last documented follow-up.',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-008' },
  },

  // PT-009 — prior breast carcinoma
  {
    id: 'DX-009',
    patientId: 'PT-009',
    diagnosisName: 'Invasive ductal carcinoma of the breast, s/p partial mastectomy',
    category: 'malignancy',
    firstDocumentedDate: '2019-03-01',
    lastDocumentedDate: '2024-04-01',
    status: 'historical',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-009' },
  },

  // PT-010 — hypertension + newly diagnosed colon cancer
  {
    id: 'DX-010',
    patientId: 'PT-010',
    diagnosisName: 'Hypertension',
    category: 'hypertension',
    firstDocumentedDate: '2016-09-30',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-010' },
  },
  {
    id: 'DX-011',
    patientId: 'PT-010',
    diagnosisName: 'Colonic adenocarcinoma',
    category: 'malignancy',
    firstDocumentedDate: '2025-06-20',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-011' },
  },

  // PT-011 — benign prostatic hyperplasia
  {
    id: 'DX-012',
    patientId: 'PT-011',
    diagnosisName: 'Benign prostatic hyperplasia',
    category: 'other',
    firstDocumentedDate: '2020-05-01',
    status: 'active',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'DX-012' },
  },
];

export function getDiagnosesForPatient(patientId: string): DiagnosisRecord[] {
  return mockDiagnoses.filter((d) => d.patientId === patientId);
}
