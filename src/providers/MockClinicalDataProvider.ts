import type {
  CurrentPathologyCase,
  DiagnosisRecord,
  ExternalClinicalDocument,
  LabResult,
  MedicationRecord,
  Patient,
  PathologyRecord,
  ProcedureRecord,
  RadiologyRecord,
  WorklistItem,
} from '../models';
import type { ClinicalDataProvider } from './ClinicalDataProvider';
import { findMockPatient } from '../mock/patients';
import { mockWorklist } from '../mock/worklist';
import { buildCurrentPathologyCase } from '../mock/currentCases';
import { getPreviousPathologyForPatient } from '../mock/pathologyRecords';
import { getDiagnosesForPatient } from '../mock/diagnoses';
import { getMedicationsForPatient } from '../mock/medications';
import { getProceduresForPatient } from '../mock/procedures';
import { getRadiologyForPatient } from '../mock/radiology';
import { getLabResultsForPatient } from '../mock/labResults';
import { getExternalDocumentsForPatient } from '../mock/externalDocuments';

const NETWORK_DELAY_MS = 150;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

/**
 * Synthetic-data implementation of ClinicalDataProvider (Version 1). Every
 * method just looks up in-memory mock arrays and resolves a Promise after a
 * small artificial delay, so callers behave exactly as they will once a
 * real REST/adapter-backed provider is substituted in — no caller code
 * needs to change when that happens.
 */
export class MockClinicalDataProvider implements ClinicalDataProvider {
  getWorklist(): Promise<WorklistItem[]> {
    return delay([...mockWorklist]);
  }

  getPatient(patientId: string): Promise<Patient> {
    const patient = findMockPatient(patientId);
    if (!patient) {
      return Promise.reject(new Error(`Unknown patientId: ${patientId}`));
    }
    return delay(patient);
  }

  getCurrentPathologyCase(accessionNumber: string): Promise<CurrentPathologyCase> {
    const currentCase = buildCurrentPathologyCase(accessionNumber);
    if (!currentCase) {
      return Promise.reject(new Error(`Unknown accessionNumber: ${accessionNumber}`));
    }
    return delay(currentCase);
  }

  getPreviousPathology(patientId: string): Promise<PathologyRecord[]> {
    return delay(getPreviousPathologyForPatient(patientId));
  }

  getDiagnoses(patientId: string): Promise<DiagnosisRecord[]> {
    return delay(getDiagnosesForPatient(patientId));
  }

  getMedications(patientId: string): Promise<MedicationRecord[]> {
    return delay(getMedicationsForPatient(patientId));
  }

  getProcedures(patientId: string): Promise<ProcedureRecord[]> {
    return delay(getProceduresForPatient(patientId));
  }

  getRadiology(patientId: string): Promise<RadiologyRecord[]> {
    return delay(getRadiologyForPatient(patientId));
  }

  getLaboratoryResults(patientId: string): Promise<LabResult[]> {
    return delay(getLabResultsForPatient(patientId));
  }

  getExternalDocuments(patientId: string): Promise<ExternalClinicalDocument[]> {
    return delay(getExternalDocumentsForPatient(patientId));
  }
}
