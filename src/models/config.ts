import type { RelevancePriority } from './common';
import type { ExternalReportType } from './externalDocument';

/**
 * Criteria used to decide whether a clinical relevance profile applies to
 * the current pathology case. Every populated field is matched against the
 * current case (organ/site, specimen text, submitted clinical information,
 * transplant type keywords); an unset field is not checked. A profile
 * matches when at least one of its populated fields matches.
 */
export interface ClinicalRelevanceProfileMatch {
  organ?: string[];
  specimenType?: string[];
  suspectedDisease?: string[];
  transplantType?: string[];
}

/**
 * Declares WHEN a set of labs/external reports becomes relevant for a case.
 * Does not declare WHAT a report type is — see ExternalReportDefinition.
 * New disease coverage should mean adding a profile here, not touching
 * React components or the relevance engine.
 */
export interface ClinicalRelevanceProfile {
  id: string;
  name: string;
  match: ClinicalRelevanceProfileMatch;
  relevantLabTestCodes: string[];
  relevantExternalReportTypes: ExternalReportType[];
  priority: RelevancePriority;
}

export type ExternalReportCategory =
  | 'immunology'
  | 'electrophoresis'
  | 'flow_cytometry'
  | 'genetics'
  | 'molecular'
  | 'lab_report'
  | 'other';

export type ExternalReportViewerType = 'image' | 'pdf';

/**
 * Declares WHAT an external report type is (label, category, viewer).
 * Kept separate from ClinicalRelevanceProfile, which declares WHEN it matters.
 */
export interface ExternalReportDefinition {
  type: ExternalReportType;
  label: string;
  category: ExternalReportCategory;
  viewerType: ExternalReportViewerType;
  description?: string;
}
