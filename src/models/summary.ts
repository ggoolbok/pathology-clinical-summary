/** One line of a generated Korean clinical summary, plus whether it represents real content or an explicit "not documented" placeholder. */
export interface ClinicalSummaryLine {
  text: string;
  isNotDocumented: boolean;
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
