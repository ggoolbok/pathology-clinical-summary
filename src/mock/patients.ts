import type { Patient } from '../models';

/**
 * Synthetic patients only. No real patient data of any kind. IDs, names,
 * dates, and values are all fabricated for demonstration purposes.
 */
export const mockPatients: Patient[] = [
  { patientId: 'PT-001', mockPatientId: 'M0010021', age: 54, sex: 'M', displayName: '환자 A (PT-001)' },
  { patientId: 'PT-002', mockPatientId: 'M0010022', age: 29, sex: 'F', displayName: '환자 B (PT-002)' },
  { patientId: 'PT-003', mockPatientId: 'M0010023', age: 61, sex: 'M', displayName: '환자 C (PT-003)' },
  { patientId: 'PT-004', mockPatientId: 'M0010024', age: 68, sex: 'M', displayName: '환자 D (PT-004)' },
  { patientId: 'PT-005', mockPatientId: 'M0010025', age: 72, sex: 'F', displayName: '환자 E (PT-005)' },
  { patientId: 'PT-006', mockPatientId: 'M0010026', age: 34, sex: 'M', displayName: '환자 F (PT-006)' },
  { patientId: 'PT-007', mockPatientId: 'M0010027', age: 22, sex: 'F', displayName: '환자 G (PT-007)' },
  { patientId: 'PT-008', mockPatientId: 'M0010028', age: 66, sex: 'M', displayName: '환자 H (PT-008)' },
  { patientId: 'PT-009', mockPatientId: 'M0010029', age: 58, sex: 'F', displayName: '환자 I (PT-009)' },
  { patientId: 'PT-010', mockPatientId: 'M0010030', age: 70, sex: 'F', displayName: '환자 J (PT-010)' },
  { patientId: 'PT-011', mockPatientId: 'M0010031', age: 64, sex: 'M', displayName: '환자 K (PT-011)' },
  { patientId: 'PT-012', mockPatientId: 'M0010032', age: 45, sex: 'M', displayName: '환자 L (PT-012)' },
  { patientId: 'PT-013', mockPatientId: 'M0010033', age: 45, sex: 'F', displayName: '환자 M (PT-013)' },
  { patientId: 'PT-014', mockPatientId: 'M0010034', age: 51, sex: 'F', displayName: '환자 N (PT-014)' },
  { patientId: 'PT-015', mockPatientId: 'M0010035', age: 77, sex: 'M', displayName: '환자 O (PT-015)' },
];

export function findMockPatient(patientId: string): Patient | undefined {
  return mockPatients.find((p) => p.patientId === patientId);
}
