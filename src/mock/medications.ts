import type { MedicationRecord } from '../models';

export const mockMedications: MedicationRecord[] = [
  // PT-001
  {
    id: 'MED-001',
    patientId: 'PT-001',
    medicationName: 'Amlodipine',
    startDate: '2018-03-14',
    dose: '5 mg',
    frequency: 'QD',
    route: 'oral',
    indication: 'Hypertension',
    relatedDiagnosisId: 'DX-001',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-001' },
  },
  {
    id: 'MED-002',
    patientId: 'PT-001',
    medicationName: 'Losartan',
    startDate: '2021-06-02',
    dose: '50 mg',
    frequency: 'QD',
    route: 'oral',
    indication: 'Hypertension',
    relatedDiagnosisId: 'DX-001',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-002' },
  },
  {
    id: 'MED-003',
    patientId: 'PT-001',
    medicationName: 'Tacrolimus',
    startDate: '2021-02-10',
    dose: '2 mg',
    frequency: 'BID',
    route: 'oral',
    indication: 'Transplant immunosuppression',
    relatedDiagnosisId: 'DX-002',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-003' },
  },
  {
    id: 'MED-004',
    patientId: 'PT-001',
    medicationName: 'Mycophenolate mofetil',
    startDate: '2021-02-10',
    dose: '500 mg',
    frequency: 'BID',
    route: 'oral',
    indication: 'Transplant immunosuppression',
    relatedDiagnosisId: 'DX-002',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-004' },
  },

  // PT-004 — antihypertensive present on the med list, but the source record does not
  // document which condition it is prescribed for (demonstrates the "unknown indication" case).
  {
    id: 'MED-005',
    patientId: 'PT-004',
    medicationName: 'Amlodipine',
    startDate: '2015-02-20',
    dose: '5 mg',
    frequency: 'QD',
    route: 'oral',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-005' },
  },

  // PT-005
  {
    id: 'MED-006',
    patientId: 'PT-005',
    medicationName: 'Entecavir',
    startDate: '2010-01-08',
    dose: '0.5 mg',
    frequency: 'QD',
    route: 'oral',
    indication: 'Chronic hepatitis B',
    relatedDiagnosisId: 'DX-005',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-006' },
  },

  // PT-008
  {
    id: 'MED-007',
    patientId: 'PT-008',
    medicationName: 'FOLFOX (oxaliplatin/leucovorin/5-FU)',
    startDate: '2022-03-01',
    stopDate: '2022-08-15',
    route: 'IV',
    indication: 'Adjuvant chemotherapy, colonic adenocarcinoma',
    relatedDiagnosisId: 'DX-008',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-007' },
  },

  // PT-009
  {
    id: 'MED-008',
    patientId: 'PT-009',
    medicationName: 'Tamoxifen',
    startDate: '2019-04-01',
    stopDate: '2024-04-01',
    dose: '20 mg',
    frequency: 'QD',
    route: 'oral',
    indication: 'Hormone therapy, ER-positive breast carcinoma',
    relatedDiagnosisId: 'DX-009',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-008' },
  },

  // PT-010 — same "unknown indication" pattern as MED-005, on a different patient/case.
  {
    id: 'MED-009',
    patientId: 'PT-010',
    medicationName: 'Amlodipine',
    startDate: '2016-09-30',
    dose: '5 mg',
    frequency: 'QD',
    route: 'oral',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-009' },
  },

  // PT-011
  {
    id: 'MED-010',
    patientId: 'PT-011',
    medicationName: 'Tamsulosin',
    startDate: '2020-05-01',
    dose: '0.4 mg',
    frequency: 'QD',
    route: 'oral',
    indication: 'Benign prostatic hyperplasia',
    relatedDiagnosisId: 'DX-012',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'MED-010' },
  },
];

export function getMedicationsForPatient(patientId: string): MedicationRecord[] {
  return mockMedications.filter((m) => m.patientId === patientId);
}
