import type { Sex } from './common';

/** Synthetic patient identity. No real patient data — see README. */
export interface Patient {
  patientId: string;
  mockPatientId: string;
  age: number;
  sex: Sex;
  displayName: string;
}
