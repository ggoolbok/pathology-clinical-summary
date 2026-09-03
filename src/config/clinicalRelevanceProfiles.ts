import type { ClinicalRelevanceProfile } from '../models';

/**
 * Disease/organ relevance profiles. This is the single place that says
 * "for a kidney transplant biopsy, creatinine/eGFR/tacrolimus/BK/CMV/DSA
 * matter" — RuleBasedClinicalRelevanceService and the UI never hard-code
 * that logic themselves, they just match a case against this list.
 *
 * Matching: a profile matches the current case when the case's organSite,
 * specimen, or submitted clinical information contains any keyword from
 * `match.organ` / `match.specimenType` / `match.suspectedDisease`
 * (case-insensitive substring match), or `match.transplantType` matches a
 * detected transplant keyword. Multiple profiles can match the same case;
 * their relevantLabTestCodes / relevantExternalReportTypes are unioned
 * with duplicates removed by RuleBasedClinicalRelevanceService.
 *
 * To cover a new disease: add one entry to this array. Do not add
 * disease-specific branches to components or to the relevance engine.
 */
export const clinicalRelevanceProfiles: ClinicalRelevanceProfile[] = [
  {
    id: 'kidney-transplant',
    name: '신장 이식 (Kidney Transplant)',
    match: {
      organ: ['kidney', 'renal', 'allograft'],
      transplantType: ['kidney transplant', 'renal transplant', 'allograft'],
      suspectedDisease: ['transplant rejection', 'allograft dysfunction'],
    },
    relevantLabTestCodes: ['CREATININE', 'EGFR', 'TACROLIMUS', 'BK_PCR', 'CMV_PCR'],
    relevantExternalReportTypes: ['DSA'],
    priority: 'highest',
  },
  {
    id: 'native-kidney-disease',
    name: '자가 신장 질환 (Native Kidney Disease)',
    match: {
      organ: ['kidney', 'renal'],
      specimenType: ['kidney biopsy', 'renal biopsy'],
      suspectedDisease: [
        'proteinuria',
        'hematuria',
        'glomerulonephritis',
        'nephrotic',
        'nephritic',
        'lupus nephritis',
      ],
    },
    relevantLabTestCodes: [
      'CREATININE',
      'EGFR',
      'URINE_PROTEIN',
      'UPCR',
      'UACR',
      'C3',
      'C4',
      'ANA',
      'ANCA',
      'ANTI_GBM',
    ],
    relevantExternalReportTypes: [],
    priority: 'highest',
  },
  {
    id: 'monoclonal-gammopathy-mgrs',
    name: '단클론감마글로불린병증 / MGRS (Monoclonal Gammopathy / MGRS)',
    match: {
      suspectedDisease: [
        'monoclonal gammopathy',
        'mgrs',
        'myeloma',
        'paraproteinemia',
        'amyloidosis',
        'light chain',
      ],
    },
    relevantLabTestCodes: ['SERUM_FREE_LIGHT_CHAIN_KAPPA', 'SERUM_FREE_LIGHT_CHAIN_LAMBDA', 'FLC_RATIO'],
    relevantExternalReportTypes: [
      'SERUM_IMMUNOFIXATION',
      'URINE_IMMUNOFIXATION',
      'SERUM_PROTEIN_ELECTROPHORESIS',
      'URINE_PROTEIN_ELECTROPHORESIS',
    ],
    priority: 'highest',
  },
  {
    id: 'liver-disease-mass',
    name: '간 질환 / 간 종괴 (Liver Disease / Liver Mass)',
    match: {
      organ: ['liver', 'hepatic'],
      suspectedDisease: ['hepatocellular carcinoma', 'hcc', 'cirrhosis', 'hepatitis', 'liver mass'],
    },
    relevantLabTestCodes: ['AST', 'ALT', 'ALP', 'GGT', 'BILIRUBIN', 'ALBUMIN', 'AFP', 'HBSAG', 'HBSAB', 'HCV_AB'],
    relevantExternalReportTypes: [],
    priority: 'highest',
  },
  {
    id: 'gi-tract-cancer',
    name: '위장관암 (GI Tract Cancer)',
    match: {
      organ: ['stomach', 'gastric', 'colon', 'rectum', 'colorectal'],
      specimenType: ['gastrectomy', 'colectomy', 'endoscopic biopsy'],
      suspectedDisease: ['gastric cancer', 'colon cancer', 'colorectal cancer', 'adenocarcinoma'],
    },
    relevantLabTestCodes: ['CEA', 'CA19_9', 'ALBUMIN', 'HEMOGLOBIN'],
    relevantExternalReportTypes: [],
    priority: 'high',
  },
  {
    id: 'appendiceal-disease',
    name: '충수염 (Appendiceal Disease)',
    match: {
      organ: ['appendix'],
      specimenType: ['appendectomy'],
    },
    relevantLabTestCodes: ['WBC', 'CRP'],
    relevantExternalReportTypes: [],
    priority: 'high',
  },
  {
    id: 'prostate-cancer',
    name: '전립선암 (Prostate Cancer)',
    match: {
      organ: ['prostate'],
      suspectedDisease: ['prostate cancer', 'psa elevation'],
    },
    relevantLabTestCodes: ['PSA'],
    relevantExternalReportTypes: [],
    priority: 'high',
  },
  {
    id: 'lymphoproliferative-disease',
    name: '림프증식질환 (Lymphoproliferative Disease)',
    match: {
      organ: ['lymph node'],
      suspectedDisease: ['lymphoma', 'lymphadenopathy', 'lymphoproliferative'],
    },
    relevantLabTestCodes: ['LDH'],
    relevantExternalReportTypes: ['FLOW_CYTOMETRY', 'CYTOGENETICS', 'MOLECULAR_REPORT'],
    priority: 'high',
  },
];
