import type {
  ClinicalRelevanceProfile,
  ClinicalRelevanceResult,
  CurrentPathologyCase,
  DiagnosisRecord,
  ExternalClinicalDocument,
  ExternalReportType,
  LabResult,
  MedicationRecord,
  PathologyRecord,
  ProcedureRecord,
  RadiologyRecord,
  RelevantItemRef,
  RelevancePriority,
} from '../../models';
import { clinicalRelevanceProfiles } from '../../config/clinicalRelevanceProfiles';
import { isSameOrRelatedOrgan, textContainsKeyword } from './organMatch';

export interface RelevanceInput {
  currentCase: CurrentPathologyCase;
  previousPathology: PathologyRecord[];
  diagnoses: DiagnosisRecord[];
  medications: MedicationRecord[];
  procedures: ProcedureRecord[];
  radiology: RadiologyRecord[];
  labResults: LabResult[];
  externalDocuments: ExternalClinicalDocument[];
}

const CANCER_TREATMENT_KEYWORDS = ['chemotherapy', 'hormone therapy', 'immunotherapy', 'radiotherapy', 'targeted therapy'];

/** Diagnosis categories that become clinically prioritized when a given profile matches. */
const PROFILE_RELEVANT_DIAGNOSIS_CATEGORIES: Record<string, string[]> = {
  'kidney-transplant': ['ckd', 'transplant_related'],
  'native-kidney-disease': ['ckd', 'autoimmune'],
  'monoclonal-gammopathy-mgrs': ['autoimmune'],
  'liver-disease-mass': ['chronic_hepatitis'],
};

function matchesProfile(profile: ClinicalRelevanceProfile, currentCase: CurrentPathologyCase): boolean {
  const haystack = [currentCase.organSite, currentCase.specimen, currentCase.clinicalInformationSubmitted, currentCase.procedure]
    .join(' ')
    .toLowerCase();

  const { organ, specimenType, suspectedDisease, transplantType } = profile.match;
  const keywordLists = [organ, specimenType, suspectedDisease, transplantType].filter(
    (list): list is string[] => Array.isArray(list) && list.length > 0,
  );
  if (keywordLists.length === 0) return false;

  return keywordLists.some((keywords) => keywords.some((kw) => textContainsKeyword(haystack, kw)));
}

/**
 * Deterministic, config-driven relevance engine. No disease-specific
 * branching lives here beyond the generic priority rules from the spec —
 * everything about WHICH labs/external reports matter for a given organ or
 * disease comes from clinicalRelevanceProfiles.ts.
 */
export class RuleBasedClinicalRelevanceService {
  evaluate(input: RelevanceInput): ClinicalRelevanceResult {
    const { currentCase } = input;

    const matchedProfiles = clinicalRelevanceProfiles.filter((p) => matchesProfile(p, currentCase));

    const relevantLabTestCodes = dedupe(matchedProfiles.flatMap((p) => p.relevantLabTestCodes));
    const relevantExternalReportTypes = dedupe(
      matchedProfiles.flatMap((p) => p.relevantExternalReportTypes),
    ) as ExternalReportType[];

    const rankedItems: RelevantItemRef[] = [
      ...this.rankPreviousPathology(input.previousPathology, currentCase),
      ...this.rankProcedures(input.procedures, currentCase),
      ...this.rankRadiology(input.radiology, currentCase),
      ...this.rankDiagnoses(input.diagnoses, matchedProfiles),
      ...this.rankMedications(input.medications),
      ...this.rankLabResults(input.labResults, relevantLabTestCodes),
      ...this.rankExternalDocuments(input.externalDocuments, relevantExternalReportTypes),
    ];

    rankedItems.sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority));

    return { matchedProfiles, relevantLabTestCodes, relevantExternalReportTypes, rankedItems };
  }

  private rankPreviousPathology(records: PathologyRecord[], currentCase: CurrentPathologyCase): RelevantItemRef[] {
    return records.map((r) => {
      if (r.isMalignant) {
        return item('pathology', r.pathologyNumber, 'highest', 'previous_malignancy_any_organ', '이전 악성 병리 소견 (장기 무관 최우선)');
      }
      if (isSameOrRelatedOrgan(r.organSite, currentCase.organSite)) {
        return item('pathology', r.pathologyNumber, 'highest', 'same_organ_previous_pathology', '동일/관련 장기 이전 병리');
      }
      return item('pathology', r.pathologyNumber, 'important', 'other_previous_pathology', '기타 이전 병리');
    });
  }

  private rankProcedures(records: ProcedureRecord[], currentCase: CurrentPathologyCase): RelevantItemRef[] {
    return records.map((r) => {
      if (r.relatedAccessionNumber === currentCase.accessionNumber) {
        return item('procedure', r.id, 'highest', 'procedure_generated_current_specimen', '현재 검체를 생성한 시술/수술');
      }
      if (isSameOrRelatedOrgan(r.organSite, currentCase.organSite)) {
        return item('procedure', r.id, 'high', 'same_organ_procedure_history', '동일 장기 관련 시술/수술 이력');
      }
      return item('procedure', r.id, 'important', 'other_procedure_history', '기타 시술/수술 이력');
    });
  }

  private rankRadiology(records: RadiologyRecord[], currentCase: CurrentPathologyCase): RelevantItemRef[] {
    return records.map((r) => {
      if (r.isSameLesion) {
        return item('radiology', r.id, 'highest', 'imaging_same_lesion', '현재 병변과 동일 병변 영상');
      }
      if (isSameOrRelatedOrgan(r.organSite, currentCase.organSite)) {
        return item('radiology', r.id, 'high', 'same_organ_imaging', '동일 장기 영상');
      }
      if (r.isStaging) {
        return item('radiology', r.id, 'high', 'staging_imaging', '병기설정/재병기설정 영상');
      }
      return item('radiology', r.id, 'important', 'other_imaging', '기타 영상');
    });
  }

  private rankDiagnoses(records: DiagnosisRecord[], matchedProfiles: ClinicalRelevanceProfile[]): RelevantItemRef[] {
    const matchedIds = matchedProfiles.map((p) => p.id);
    const organRelevantCategories = new Set(
      matchedIds.flatMap((id) => PROFILE_RELEVANT_DIAGNOSIS_CATEGORIES[id] ?? []),
    );

    return records.map((r) => {
      if (r.category === 'malignancy') {
        return item('diagnosis', r.id, 'high', 'malignancy_history_diagnosis_record', '진단 기록상 악성종양 병력');
      }
      if (organRelevantCategories.has(r.category)) {
        return item('diagnosis', r.id, 'high', 'organ_specific_chronic_disease', '현재 장기 관련 만성질환');
      }
      return item('diagnosis', r.id, 'important', 'general_chronic_disease', '기타 만성질환');
    });
  }

  private rankMedications(records: MedicationRecord[]): RelevantItemRef[] {
    return records.map((r) => {
      const indication = r.indication ?? '';
      const isCancerTreatment = CANCER_TREATMENT_KEYWORDS.some((kw) => textContainsKeyword(indication, kw)) ||
        textContainsKeyword(r.medicationName, 'FOLFOX') ||
        textContainsKeyword(indication, 'carcinoma') ||
        textContainsKeyword(indication, 'adenocarcinoma');
      if (isCancerTreatment) {
        return item('medication', r.id, 'high', 'cancer_treatment_history', '항암 치료 이력');
      }
      return item('medication', r.id, 'high', 'relevant_medication', '관련 약물');
    });
  }

  private rankLabResults(records: LabResult[], relevantTestCodes: string[]): RelevantItemRef[] {
    const relevantSet = new Set(relevantTestCodes);
    const countByCode = new Map<string, number>();
    for (const r of records) {
      if (!relevantSet.has(r.testCode)) continue;
      countByCode.set(r.testCode, (countByCode.get(r.testCode) ?? 0) + 1);
    }
    return records
      .filter((r) => relevantSet.has(r.testCode))
      .map((r) => {
        const hasTrend = (countByCode.get(r.testCode) ?? 0) >= 2;
        return hasTrend
          ? item('lab', r.id, 'highest', 'relevant_lab_trend', '관련 검사 추세')
          : item('lab', r.id, 'high', 'relevant_lab_value', '관련 검사 결과');
      });
  }

  private rankExternalDocuments(
    records: ExternalClinicalDocument[],
    relevantTypes: ExternalReportType[],
  ): RelevantItemRef[] {
    const relevantSet = new Set(relevantTypes);
    return records
      .filter((r) => relevantSet.has(r.reportType))
      .map((r) => item('external_document', r.id, 'high', 'relevant_external_report', '관련 외부/스캔 보고서'));
  }
}

function item(
  category: RelevantItemRef['category'],
  recordId: string,
  priority: RelevancePriority,
  reasonCode: string,
  reasonLabelKo: string,
): RelevantItemRef {
  return { category, recordId, priority, reasonCode, reasonLabelKo };
}

function priorityWeight(p: RelevancePriority): number {
  switch (p) {
    case 'highest':
      return 3;
    case 'high':
      return 2;
    case 'important':
      return 1;
  }
}

function dedupe<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}
