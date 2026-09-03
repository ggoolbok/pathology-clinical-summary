import type { PathologyRecord } from '../models';

/**
 * Previous (historical) pathology diagnoses — i.e. everything except the
 * accession currently open on the worklist. RuleBasedClinicalRelevanceService
 * splits these per-patient into "same/related organ" vs "other" and always
 * keeps any malignant record at highest priority regardless of organ.
 */
export const mockPathologyRecords: PathologyRecord[] = [
  // PT-001 — kidney transplant, two previous allograft biopsies
  {
    pathologyNumber: 'S24-0450',
    patientId: 'PT-001',
    organSite: 'Kidney (transplant allograft)',
    specimen: 'Renal allograft core biopsy',
    diagnosisDate: '2024-05-10',
    diagnosisSummary: 'Borderline changes suspicious for acute T-cell mediated rejection (Banff borderline)',
    pathologist: 'Dr. J. Han',
    isMalignant: false,
    fullFinalDiagnosis:
      'Renal allograft, core biopsy:\n- Borderline changes suspicious for acute T-cell mediated rejection (Banff borderline).\n- Mild interstitial fibrosis and tubular atrophy (IFTA, 10%).\n- No transplant glomerulopathy.\n- C4d negative by immunohistochemistry.',
    comment: 'Clinical correlation with donor-specific antibody status recommended.',
    microscopicDescription:
      '12 glomeruli sampled, none globally sclerosed. Focal tubulitis (t1) with mild interstitial inflammation (i1). No arteritis. No peritubular capillaritis.',
    immunohistochemistry: 'C4d: negative in peritubular capillaries.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S24-0450', recordedAt: '2024-05-12' },
  },
  {
    pathologyNumber: 'S25-0512',
    patientId: 'PT-001',
    organSite: 'Kidney (transplant allograft)',
    specimen: 'Renal allograft core biopsy',
    diagnosisDate: '2025-08-22',
    diagnosisSummary: 'No acute rejection; stable mild interstitial fibrosis and tubular atrophy',
    pathologist: 'Dr. S. Kwon',
    isMalignant: false,
    fullFinalDiagnosis:
      'Renal allograft, core biopsy:\n- No evidence of acute cellular or antibody-mediated rejection.\n- Mild interstitial fibrosis and tubular atrophy (IFTA, 15%), stable compared to prior biopsy (2024-05-10).\n- No transplant glomerulopathy.',
    microscopicDescription: '14 glomeruli sampled, 1 globally sclerosed. No tubulitis. No arteritis.',
    immunohistochemistry: 'C4d: negative.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S25-0512', recordedAt: '2025-08-24' },
  },

  // PT-002 — unrelated prior skin excision (other organ)
  {
    pathologyNumber: 'S21-0090',
    patientId: 'PT-002',
    organSite: 'Skin, back',
    specimen: 'Skin excision',
    diagnosisDate: '2021-06-04',
    diagnosisSummary: 'Compound melanocytic nevus, benign',
    pathologist: 'Dr. H. Yoon',
    isMalignant: false,
    fullFinalDiagnosis: 'Skin, back, excision: Compound melanocytic nevus. Margins uninvolved.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S21-0090', recordedAt: '2021-06-06' },
  },

  // PT-003 — prior bone marrow biopsy for plasma cell dyscrasia workup (other organ, not malignant)
  {
    pathologyNumber: 'S25-0700',
    patientId: 'PT-003',
    organSite: 'Bone marrow',
    specimen: 'Bone marrow core biopsy and aspirate',
    diagnosisDate: '2025-11-02',
    diagnosisSummary: 'Plasma cells 8% of marrow cellularity; no morphologic evidence of plasma cell myeloma',
    pathologist: 'Dr. M. Cho',
    isMalignant: false,
    fullFinalDiagnosis:
      'Bone marrow, core biopsy and aspirate:\n- Normocellular marrow for age (40% cellularity).\n- Plasma cells comprise 8% of marrow cellularity, no significant cytologic atypia or sheet-like growth.\n- Trilineage hematopoiesis present.\n- No morphologic evidence of plasma cell myeloma in this sample.',
    comment: 'Correlation with serum/urine protein studies and clinical findings recommended.',
    immunohistochemistry: 'CD138 highlights plasma cells, no aberrant loss of CD19; kappa/lambda in situ hybridization pending at time of report.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S25-0700', recordedAt: '2025-11-05' },
  },

  // PT-004 — prior diagnostic gastric biopsy, same organ as current gastrectomy
  {
    pathologyNumber: 'S25-0388',
    patientId: 'PT-004',
    organSite: 'Stomach, antrum',
    specimen: 'Endoscopic biopsy',
    diagnosisDate: '2025-07-15',
    diagnosisSummary: 'Gastric adenocarcinoma, moderately differentiated (diagnostic biopsy)',
    pathologist: 'Dr. J. Han',
    isMalignant: true,
    fullFinalDiagnosis:
      'Stomach, antrum, endoscopic biopsy: Adenocarcinoma, moderately differentiated, intestinal type (Lauren classification).',
    microscopicDescription: 'Glandular structures with moderate nuclear atypia infiltrating lamina propria.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S25-0388', recordedAt: '2025-07-17' },
  },

  // PT-005 — prior HCC pathology, same organ as current liver biopsy
  {
    pathologyNumber: 'S23-0290',
    patientId: 'PT-005',
    organSite: 'Liver, segment 6',
    specimen: 'US-guided liver core biopsy',
    diagnosisDate: '2023-04-18',
    diagnosisSummary: 'Hepatocellular carcinoma, moderately differentiated',
    pathologist: 'Dr. S. Kwon',
    isMalignant: true,
    fullFinalDiagnosis:
      'Liver, segment 6, core biopsy: Hepatocellular carcinoma, moderately differentiated, arising in a background of cirrhosis.',
    comment: 'Case discussed at multidisciplinary tumor board; patient underwent radiofrequency ablation (see procedure record).',
    immunohistochemistry: 'HepPar-1 positive, Glypican-3 focally positive, CD34 shows diffuse sinusoidal capillarization.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S23-0290', recordedAt: '2023-04-20' },
  },

  // PT-008 — prior colon adenocarcinoma (other organ than current lung biopsy) — must stay high priority
  {
    pathologyNumber: 'S22-0810',
    patientId: 'PT-008',
    organSite: 'Colon, sigmoid',
    specimen: 'Sigmoid colectomy specimen',
    diagnosisDate: '2022-02-09',
    diagnosisSummary: 'Colonic adenocarcinoma, moderately differentiated, pT3N1',
    pathologist: 'Dr. H. Yoon',
    isMalignant: true,
    fullFinalDiagnosis:
      'Colon, sigmoid, colectomy: Adenocarcinoma, moderately differentiated, invading through muscularis propria into pericolonic fat (pT3). 3 of 18 lymph nodes involved by metastatic carcinoma (pN1). Proximal and distal margins negative.',
    microscopicDescription: 'Infiltrating glandular structures with desmoplastic stroma, lymphovascular invasion present.',
    ancillaryStudies: 'Microsatellite stable (MSS) by immunohistochemistry (MLH1/MSH2/MSH6/PMS6 intact).',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S22-0810', recordedAt: '2022-02-14' },
  },

  // PT-009 — prior breast carcinoma (other organ than current liver biopsy) — must stay high priority
  {
    pathologyNumber: 'S19-0905',
    patientId: 'PT-009',
    organSite: 'Breast, left',
    specimen: 'Left partial mastectomy specimen',
    diagnosisDate: '2019-03-01',
    diagnosisSummary: 'Invasive ductal carcinoma, ER+/PR+/HER2-negative',
    pathologist: 'Dr. M. Cho',
    isMalignant: true,
    fullFinalDiagnosis:
      'Breast, left, partial mastectomy: Invasive ductal carcinoma, grade 2, 2.3 cm. Sentinel lymph nodes (0/2) negative for metastasis. Margins negative.',
    immunohistochemistry: 'ER: positive (90%), PR: positive (70%), HER2: negative (IHC 1+), Ki-67: 15%.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S19-0905', recordedAt: '2019-03-06' },
  },

  // PT-010 — prior diagnostic colon biopsy, same organ as current colectomy
  {
    pathologyNumber: 'S25-0955',
    patientId: 'PT-010',
    organSite: 'Colon, ascending',
    specimen: 'Colonoscopic biopsy',
    diagnosisDate: '2025-06-20',
    diagnosisSummary: 'Colonic adenocarcinoma (diagnostic biopsy)',
    pathologist: 'Dr. J. Han',
    isMalignant: true,
    fullFinalDiagnosis: 'Colon, ascending, biopsy: Adenocarcinoma, well to moderately differentiated.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S25-0955', recordedAt: '2025-06-22' },
  },

  // PT-012 — prior reactive lymph node, same organ category as current excisional biopsy
  {
    pathologyNumber: 'S20-1200',
    patientId: 'PT-012',
    organSite: 'Lymph node, axillary',
    specimen: 'Excisional lymph node biopsy',
    diagnosisDate: '2020-01-15',
    diagnosisSummary: 'Reactive lymphoid hyperplasia',
    pathologist: 'Dr. S. Kwon',
    isMalignant: false,
    fullFinalDiagnosis: 'Lymph node, axillary, excisional biopsy: Reactive follicular hyperplasia, no evidence of malignancy.',
    provenance: { sourceSystem: 'MOCK_LIS', sourceRecordId: 'S20-1200', recordedAt: '2020-01-17' },
  },
];

export function getPreviousPathologyForPatient(patientId: string): PathologyRecord[] {
  return mockPathologyRecords.filter((r) => r.patientId === patientId);
}
