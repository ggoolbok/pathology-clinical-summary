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

/**
 * The seam between the UI and any concrete clinical data source.
 *
 * `MockClinicalDataProvider` is the only implementation in Version 1. A
 * future hospital deployment replaces it with adapter(s) that translate
 * EMR/LIS/RIS/PACS data into this same canonical shape:
 *
 *   Hospital EMR/LIS/RIS  →  adapter  →  canonical model (src/models)
 *                                      →  ClinicalDataProvider implementation
 *                                      →  ClinicalDataService
 *                                      →  relevance/summary services
 *                                      →  UI
 *
 * Every method is async and Promise-based so a REST/GraphQL-backed
 * implementation can be dropped in without changing any caller — including
 * the UI, which never talks to a provider directly (see ClinicalDataService).
 */
export interface ClinicalDataProvider {
  getWorklist(): Promise<WorklistItem[]>;
  getPatient(patientId: string): Promise<Patient>;
  getCurrentPathologyCase(accessionNumber: string): Promise<CurrentPathologyCase>;
  getPreviousPathology(patientId: string): Promise<PathologyRecord[]>;
  getDiagnoses(patientId: string): Promise<DiagnosisRecord[]>;
  getMedications(patientId: string): Promise<MedicationRecord[]>;
  getProcedures(patientId: string): Promise<ProcedureRecord[]>;
  getRadiology(patientId: string): Promise<RadiologyRecord[]>;
  getLaboratoryResults(patientId: string): Promise<LabResult[]>;
  getExternalDocuments(patientId: string): Promise<ExternalClinicalDocument[]>;
}
