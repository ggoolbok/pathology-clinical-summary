import type { LabFlag } from './lab';

/** One point in a lab trend chain, newest-first per the sortByDateDesc rule. */
export interface LabTrendPoint {
  value: string;
  flag?: LabFlag;
  date: string;
}

/**
 * One line of a generated Korean clinical summary, plus whether it
 * represents real content or an explicit "not documented" placeholder.
 *
 * `subLines` lets a line (e.g. a chronic disease) nest related lines under
 * it (e.g. its medications) without introducing a second section type.
 * `labTrend` lets the lab-trend section attach structured, orderable
 * value/flag/date points so the UI can render the newest-left arrow chain
 * with H/L coloring instead of parsing it back out of plain text.
 */
export interface ClinicalSummaryLine {
  text: string;
  isNotDocumented: boolean;
  subLines?: ClinicalSummaryLine[];
  labTrend?: { testName: string; points: LabTrendPoint[] };
}

export interface ClinicalSummarySection {
  id: string;
  titleKo: string;
  lines: ClinicalSummaryLine[];
}

/** Output of TemplateBasedClinicalSummaryService for one pathology case. */
export interface ClinicalSummary {
  patientId: string;
  accessionNumber: string;
  generatedAt: string;
  sections: ClinicalSummarySection[];
}
