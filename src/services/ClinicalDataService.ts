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
import type { ClinicalDataProvider } from '../providers/ClinicalDataProvider';

/** Everything the UI needs to render one pathology case, fetched in one call. */
export interface PatientCaseBundle {
  patient: Patient;
  currentCase: CurrentPathologyCase;
  previousPathology: PathologyRecord[];
  diagnoses: DiagnosisRecord[];
  medications: MedicationRecord[];
  procedures: ProcedureRecord[];
  radiology: RadiologyRecord[];
  labResults: LabResult[];
  externalDocuments: ExternalClinicalDocument[];
}

/**
 * The only object React components talk to for clinical data. Components
 * never import mock JSON or a ClinicalDataProvider directly — they go
 * through this service, which owns the provider instance. Swapping
 * MockClinicalDataProvider for a real hospital adapter later means
 * constructing ClinicalDataService with a different provider; no UI code
 * changes.
 */
export class ClinicalDataService {
  constructor(private readonly provider: ClinicalDataProvider) {}

  getWorklist(): Promise<WorklistItem[]> {
    return this.provider.getWorklist();
  }

  /** Fetches everything needed to render the clinical panels for one accession, in parallel. */
  async getPatientCaseBundle(accessionNumber: string): Promise<PatientCaseBundle> {
    const currentCase = await this.provider.getCurrentPathologyCase(accessionNumber);
    const patientId = currentCase.patientId;

    const [patient, previousPathology, diagnoses, medications, procedures, radiology, labResults, externalDocuments] =
      await Promise.all([
        this.provider.getPatient(patientId),
        this.provider.getPreviousPathology(patientId),
        this.provider.getDiagnoses(patientId),
        this.provider.getMedications(patientId),
        this.provider.getProcedures(patientId),
        this.provider.getRadiology(patientId),
        this.provider.getLaboratoryResults(patientId),
        this.provider.getExternalDocuments(patientId),
      ]);

    return {
      patient,
      currentCase,
      previousPathology,
      diagnoses,
      medications,
      procedures,
      radiology,
      labResults,
      externalDocuments,
    };
  }
}
