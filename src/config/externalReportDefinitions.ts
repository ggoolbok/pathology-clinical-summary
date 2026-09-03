import type { ExternalReportDefinition } from '../models';
import type { ExternalReportType } from '../models';

/**
 * Registry of WHAT each external report type is: display label, category,
 * and which viewer (image vs. PDF) opens it. This file answers "what is a
 * SERUM_IMMUNOFIXATION report" — it never decides whether one is relevant
 * to a given case. That decision belongs to clinicalRelevanceProfiles.ts.
 *
 * To add a new external report type: add its literal to
 * `ExternalReportType` in src/models/externalDocument.ts, then add one
 * entry here. No other file needs to change to make the type displayable.
 */
export const externalReportDefinitions: Record<ExternalReportType, ExternalReportDefinition> = {
  DSA: {
    type: 'DSA',
    label: 'Donor-Specific Antibody (DSA)',
    category: 'immunology',
    viewerType: 'pdf',
    description: 'Solid-phase DSA panel report, typically from the HLA lab.',
  },
  SERUM_IMMUNOFIXATION: {
    type: 'SERUM_IMMUNOFIXATION',
    label: '혈청 면역고정전기영동 (Serum Immunofixation)',
    category: 'electrophoresis',
    viewerType: 'image',
    description: 'Scanned immunofixation gel image, serum.',
  },
  URINE_IMMUNOFIXATION: {
    type: 'URINE_IMMUNOFIXATION',
    label: '요 면역고정전기영동 (Urine Immunofixation)',
    category: 'electrophoresis',
    viewerType: 'image',
    description: 'Scanned immunofixation gel image, urine.',
  },
  SERUM_PROTEIN_ELECTROPHORESIS: {
    type: 'SERUM_PROTEIN_ELECTROPHORESIS',
    label: '혈청 단백전기영동 (Serum Protein Electrophoresis, SPEP)',
    category: 'electrophoresis',
    viewerType: 'pdf',
    description: 'SPEP densitometry tracing and report.',
  },
  URINE_PROTEIN_ELECTROPHORESIS: {
    type: 'URINE_PROTEIN_ELECTROPHORESIS',
    label: '요 단백전기영동 (Urine Protein Electrophoresis, UPEP)',
    category: 'electrophoresis',
    viewerType: 'pdf',
    description: 'UPEP densitometry tracing and report.',
  },
  FLOW_CYTOMETRY: {
    type: 'FLOW_CYTOMETRY',
    label: 'Flow Cytometry Report',
    category: 'flow_cytometry',
    viewerType: 'pdf',
    description: 'Peripheral blood / bone marrow flow cytometry immunophenotyping report.',
  },
  CYTOGENETICS: {
    type: 'CYTOGENETICS',
    label: 'Cytogenetics Report',
    category: 'genetics',
    viewerType: 'pdf',
    description: 'Karyotype / FISH cytogenetics report.',
  },
  MOLECULAR_REPORT: {
    type: 'MOLECULAR_REPORT',
    label: 'Molecular Pathology Report',
    category: 'molecular',
    viewerType: 'pdf',
    description: 'NGS panel or targeted molecular assay report.',
  },
  EXTERNAL_LAB_REPORT: {
    type: 'EXTERNAL_LAB_REPORT',
    label: 'External Laboratory Report',
    category: 'lab_report',
    viewerType: 'pdf',
    description: 'Report from an outside/reference laboratory not integrated as structured data.',
  },
  OTHER: {
    type: 'OTHER',
    label: 'Other External Document',
    category: 'other',
    viewerType: 'pdf',
    description: 'Miscellaneous scanned or attached external clinical document.',
  },
};

export function getExternalReportDefinition(type: ExternalReportType): ExternalReportDefinition {
  return externalReportDefinitions[type];
}
