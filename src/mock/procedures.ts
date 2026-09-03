import type { ProcedureRecord } from '../models';

export const mockProcedures: ProcedureRecord[] = [
  // PT-001 — transplant surgery + current allograft biopsy procedure
  {
    id: 'PROC-001',
    patientId: 'PT-001',
    category: 'surgery',
    procedureName: 'Deceased-donor kidney transplantation',
    procedureDate: '2021-02-10',
    organSite: 'Kidney (transplant allograft)',
    surgeon: 'Dr. K. Lim',
    operativeFindingsSummary: 'Uncomplicated deceased-donor kidney transplant, right iliac fossa. Immediate graft perfusion and urine output noted intraoperatively.',
    fullOperativeNote:
      'PREOPERATIVE DIAGNOSIS: End-stage renal disease.\nPROCEDURE: Deceased-donor kidney transplantation, right iliac fossa.\nFINDINGS: Donor kidney anastomosed to external iliac vessels; ureteroneocystostomy performed. Immediate graft reperfusion with good color and turgor. Urine output noted on table.\nESTIMATED BLOOD LOSS: 150 mL.\nCOMPLICATIONS: None.',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-001' },
  },
  {
    id: 'PROC-002',
    patientId: 'PT-001',
    category: 'biopsy',
    procedureName: 'Percutaneous allograft biopsy',
    procedureDate: '2026-09-03',
    organSite: 'Kidney (transplant allograft)',
    operativeFindingsSummary: 'Ultrasound-guided percutaneous core biopsy of allograft lower pole, 2 cores obtained, no immediate complication.',
    fullOperativeNote:
      'US-guided percutaneous core needle biopsy of renal allograft, lower pole. Two 18G cores obtained under real-time ultrasound guidance. No immediate post-procedure complication. Specimen sent to pathology as accession S26-0001.',
    relatedAccessionNumber: 'S26-0001',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-002' },
  },

  // PT-004 — gastrectomy for gastric cancer
  {
    id: 'PROC-003',
    patientId: 'PT-004',
    category: 'surgery',
    procedureName: 'Subtotal gastrectomy with D2 lymphadenectomy',
    procedureDate: '2026-09-01',
    organSite: 'Stomach',
    surgeon: 'Dr. K. Lim',
    operativeFindingsSummary:
      'Ulcerofungating mass at gastric body/antrum junction, no gross serosal invasion, no peritoneal dissemination seen. D2 lymphadenectomy performed.',
    cancerSurgeryFindings: {
      tumorLocation: 'Gastric body–antrum junction, lesser curvature',
      tumorSize: '4.2 cm',
      grossInvasion: 'present',
      adjacentOrganInvolvement: 'absent',
      lymphNodeFindings: 'D2 lymphadenectomy performed; 28 lymph nodes retrieved for pathologic evaluation.',
      metastaticLesions: 'absent',
      peritonealDissemination: 'absent',
      surgicalMarginInfo: 'Proximal and distal margins grossly clear, submitted for frozen section.',
      frozenSectionMarginInfo: 'Frozen section: proximal and distal margins negative for tumor.',
      resectionStatus: 'R0',
    },
    fullOperativeNote:
      'PREOPERATIVE DIAGNOSIS: Gastric adenocarcinoma (biopsy-proven, S25-0388).\nPROCEDURE: Subtotal gastrectomy with D2 lymphadenectomy, Billroth II reconstruction.\nFINDINGS: Ulcerofungating mass, approximately 4-5 cm, at the body-antrum junction along the lesser curvature. Serosal surface intact, no gross serosal breach. No palpable liver lesions. No peritoneal nodules identified on thorough exploration. D2 lymphadenectomy performed per protocol. Proximal and distal margins sent for frozen section, both negative.\nESTIMATED BLOOD LOSS: 200 mL.\nCOMPLICATIONS: None.',
    relatedAccessionNumber: 'S26-0004',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-003' },
  },

  // PT-005 — prior RFA for HCC
  {
    id: 'PROC-004',
    patientId: 'PT-005',
    category: 'other',
    procedureName: 'Radiofrequency ablation, liver segment 6 lesion',
    procedureDate: '2023-04-25',
    organSite: 'Liver, segment 6',
    operativeFindingsSummary: 'US-guided RFA of 2.1 cm segment 6 HCC, complete ablation zone achieved on immediate post-procedure imaging.',
    fullOperativeNote:
      'US-guided percutaneous radiofrequency ablation of segment 6 hepatic lesion (biopsy-proven HCC, S23-0290). Single applicator placement, ablation cycle completed per protocol. Post-procedure contrast imaging showed a complete ablation zone with no residual arterial enhancement. No immediate complication.',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-004' },
  },
  {
    id: 'PROC-005',
    patientId: 'PT-005',
    category: 'biopsy',
    procedureName: 'US-guided percutaneous liver biopsy',
    procedureDate: '2026-09-03',
    organSite: 'Liver, segment 6 new lesion',
    operativeFindingsSummary: 'US-guided core biopsy of new segment 6 arterial-enhancing lesion adjacent to prior ablation zone.',
    fullOperativeNote:
      'US-guided percutaneous core needle biopsy of new segment 6 lesion, adjacent to but distinct from the prior 2023 ablation zone. Two 18G cores obtained. No immediate complication. Specimen sent to pathology as accession S26-0005.',
    relatedAccessionNumber: 'S26-0005',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-005' },
  },

  // PT-006 — appendectomy WITH documented perforation/peritonitis
  {
    id: 'PROC-006',
    patientId: 'PT-006',
    category: 'surgery',
    procedureName: 'Laparoscopic appendectomy',
    procedureDate: '2026-09-03',
    organSite: 'Appendix',
    surgeon: 'Dr. K. Lim',
    operativeFindingsSummary: 'Perforated gangrenous appendicitis with generalized purulent peritonitis and periappendiceal abscess; appendicolith identified.',
    appendectomyFindings: {
      perforation: 'present',
      peritonitis: 'present',
      peritonitisExtent: 'generalized',
      abscess: 'present',
      gangrenousChange: 'present',
      appendicolith: 'present',
    },
    fullOperativeNote:
      'PREOPERATIVE DIAGNOSIS: Acute appendicitis.\nPROCEDURE: Laparoscopic appendectomy.\nFINDINGS: Gangrenous appendix with a 3mm perforation at the mid-body. Generalized purulent peritonitis with approximately 150 mL of purulent fluid in the pelvis and bilateral paracolic gutters. Periappendiceal abscess cavity identified and drained. An appendicolith was found free within the abscess cavity and retrieved. Peritoneal lavage performed with 3L normal saline.\nCOMPLICATIONS: None intraoperative.',
    relatedAccessionNumber: 'S26-0006',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-006' },
  },

  // PT-007 — appendectomy with sparse operative documentation
  {
    id: 'PROC-007',
    patientId: 'PT-007',
    category: 'surgery',
    procedureName: 'Laparoscopic appendectomy',
    procedureDate: '2026-09-02',
    organSite: 'Appendix',
    surgeon: 'Dr. S. Kwon',
    operativeFindingsSummary: 'Acute appendicitis. Operative note does not comment on perforation, peritonitis, abscess, or gangrenous change.',
    appendectomyFindings: {
      perforation: 'not_documented',
      peritonitis: 'not_documented',
      peritonitisExtent: 'not_documented',
      abscess: 'absent',
      gangrenousChange: 'not_documented',
      appendicolith: 'present',
    },
    fullOperativeNote:
      'PREOPERATIVE DIAGNOSIS: Acute appendicitis.\nPROCEDURE: Laparoscopic appendectomy.\nFINDINGS: Inflamed appendix consistent with acute appendicitis. Appendicolith noted within the lumen on gross inspection. No abscess cavity identified. Appendix removed and sent to pathology.\nCOMPLICATIONS: None.',
    relatedAccessionNumber: 'S26-0007',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-007' },
  },

  // PT-008 — prior sigmoid colectomy for colon cancer (other-organ malignancy history)
  {
    id: 'PROC-008',
    patientId: 'PT-008',
    category: 'surgery',
    procedureName: 'Sigmoid colectomy',
    procedureDate: '2022-02-09',
    organSite: 'Colon, sigmoid',
    surgeon: 'Dr. H. Yoon',
    operativeFindingsSummary: 'Sigmoid mass without gross serosal breach or peritoneal dissemination; regional lymphadenectomy performed.',
    cancerSurgeryFindings: {
      tumorLocation: 'Sigmoid colon',
      tumorSize: '3.8 cm',
      grossInvasion: 'present',
      adjacentOrganInvolvement: 'absent',
      lymphNodeFindings: '18 lymph nodes retrieved, 3 involved by metastatic carcinoma (pN1).',
      metastaticLesions: 'absent',
      peritonealDissemination: 'absent',
      surgicalMarginInfo: 'Proximal and distal margins grossly clear.',
      resectionStatus: 'R0',
    },
    fullOperativeNote:
      'PREOPERATIVE DIAGNOSIS: Sigmoid colon adenocarcinoma.\nPROCEDURE: Sigmoid colectomy with primary anastomosis.\nFINDINGS: Firm mass in the sigmoid colon without gross serosal breach. No peritoneal nodules on exploration. No palpable liver lesions. Regional lymphadenectomy performed.\nCOMPLICATIONS: None.',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-008' },
  },
  {
    id: 'PROC-009',
    patientId: 'PT-008',
    category: 'biopsy',
    procedureName: 'CT-guided transthoracic core biopsy',
    procedureDate: '2026-09-01',
    organSite: 'Lung, RUL nodule',
    operativeFindingsSummary: 'CT-guided core biopsy of RUL nodule, 3 cores obtained; small apical pneumothorax noted post-procedure, observed without intervention.',
    fullOperativeNote:
      'CT-guided percutaneous core needle biopsy of right upper lobe nodule. Three 18G cores obtained. Post-procedure CT showed a small apical pneumothorax (<10%), managed with observation. Specimen sent to pathology as accession S26-0008.',
    relatedAccessionNumber: 'S26-0008',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-009' },
  },

  // PT-009 — prior partial mastectomy for breast cancer (other-organ malignancy history)
  {
    id: 'PROC-010',
    patientId: 'PT-009',
    category: 'surgery',
    procedureName: 'Left partial mastectomy with sentinel lymph node biopsy',
    procedureDate: '2019-03-01',
    organSite: 'Breast, left',
    surgeon: 'Dr. M. Cho',
    operativeFindingsSummary: 'Palpable left breast mass excised with clear margins; sentinel nodes sampled and grossly unremarkable.',
    fullOperativeNote:
      'PREOPERATIVE DIAGNOSIS: Left breast carcinoma.\nPROCEDURE: Left partial mastectomy with sentinel lymph node biopsy.\nFINDINGS: Firm irregular mass in the upper outer quadrant, excised with a margin of grossly normal breast tissue. Two sentinel lymph nodes identified and excised, grossly unremarkable.\nCOMPLICATIONS: None.',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-010' },
  },

  // PT-010 — current colectomy for colon cancer
  {
    id: 'PROC-011',
    patientId: 'PT-010',
    category: 'surgery',
    procedureName: 'Right hemicolectomy',
    procedureDate: '2026-09-02',
    organSite: 'Colon, ascending',
    surgeon: 'Dr. K. Lim',
    operativeFindingsSummary: 'Ascending colon mass without gross serosal breach or peritoneal dissemination; regional lymphadenectomy performed.',
    cancerSurgeryFindings: {
      tumorLocation: 'Ascending colon, hepatic flexure',
      tumorSize: '5.1 cm',
      grossInvasion: 'present',
      adjacentOrganInvolvement: 'not_documented',
      lymphNodeFindings: 'Regional lymphadenectomy performed; nodal status pending final pathology.',
      metastaticLesions: 'absent',
      peritonealDissemination: 'absent',
      surgicalMarginInfo: 'Proximal and distal margins grossly clear.',
    },
    fullOperativeNote:
      'PREOPERATIVE DIAGNOSIS: Ascending colon adenocarcinoma (biopsy-proven, S25-0955).\nPROCEDURE: Right hemicolectomy with primary anastomosis.\nFINDINGS: Circumferential mass at the hepatic flexure without gross serosal breach. No peritoneal nodules on exploration. Regional lymphadenectomy performed.\nCOMPLICATIONS: None.',
    relatedAccessionNumber: 'S26-0010',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-011' },
  },

  // PT-002, PT-003, PT-011, PT-012 — current biopsy procedures with minimal documentation
  {
    id: 'PROC-012',
    patientId: 'PT-002',
    category: 'biopsy',
    procedureName: 'Percutaneous native kidney biopsy',
    procedureDate: '2026-09-03',
    organSite: 'Kidney (native)',
    operativeFindingsSummary: 'US-guided percutaneous core biopsy of left native kidney, 2 cores obtained.',
    fullOperativeNote:
      'US-guided percutaneous core needle biopsy of left native kidney. Two 18G cores obtained, one sent for light microscopy/IF, one for EM per protocol. No immediate complication. Specimen sent to pathology as accession S26-0002.',
    relatedAccessionNumber: 'S26-0002',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-012' },
  },
  {
    id: 'PROC-013',
    patientId: 'PT-003',
    category: 'biopsy',
    procedureName: 'Percutaneous native kidney biopsy',
    procedureDate: '2026-09-02',
    organSite: 'Kidney (native)',
    operativeFindingsSummary: 'US-guided percutaneous core biopsy of right native kidney for MGRS workup, 2 cores obtained.',
    fullOperativeNote:
      'US-guided percutaneous core needle biopsy of right native kidney. Two 18G cores obtained per renal biopsy protocol. No immediate complication. Specimen sent to pathology as accession S26-0003.',
    relatedAccessionNumber: 'S26-0003',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-013' },
  },
  {
    id: 'PROC-014',
    patientId: 'PT-011',
    category: 'biopsy',
    procedureName: 'TRUS-guided prostate biopsy',
    procedureDate: '2026-09-01',
    organSite: 'Prostate',
    operativeFindingsSummary: '12-core systematic TRUS-guided biopsy, no immediate complication.',
    fullOperativeNote:
      'Transrectal ultrasound-guided systematic 12-core prostate biopsy performed. No immediate complication. Specimens sent to pathology as accession S26-0011.',
    relatedAccessionNumber: 'S26-0011',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-014' },
  },
  {
    id: 'PROC-015',
    patientId: 'PT-012',
    category: 'biopsy',
    procedureName: 'Excisional lymph node biopsy',
    procedureDate: '2026-09-03',
    organSite: 'Lymph node, cervical',
    surgeon: 'Dr. H. Yoon',
    operativeFindingsSummary: 'Enlarged, firm right cervical lymph node excised in entirety, no matting to adjacent structures.',
    fullOperativeNote:
      'PROCEDURE: Excisional biopsy, right cervical lymph node.\nFINDINGS: 2.5 cm firm, mobile lymph node excised without evidence of matting or fixation to adjacent structures. Specimen sent fresh to pathology for flow cytometry and histology, accession S26-0012.\nCOMPLICATIONS: None.',
    relatedAccessionNumber: 'S26-0012',
    provenance: { sourceSystem: 'MOCK_EMR', sourceRecordId: 'PROC-015' },
  },
];

export function getProceduresForPatient(patientId: string): ProcedureRecord[] {
  return mockProcedures.filter((p) => p.patientId === patientId);
}
