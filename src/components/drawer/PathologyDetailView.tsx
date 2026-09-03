import type { PathologyRecord } from '../../models';

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="mb-4">
      <h4 className="mb-1 text-xxs font-semibold uppercase tracking-wide text-clinical-muted">{label}</h4>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-clinical-text">{value}</p>
    </div>
  );
}

export function PathologyDetailView({ record }: { record: PathologyRecord }) {
  return (
    <div className="p-4">
      <Field label="최종 진단 (Final Diagnosis)" value={record.fullFinalDiagnosis} />
      <Field label="코멘트 (Comment)" value={record.comment} />
      <Field label="현미경 소견 (Microscopic Description)" value={record.microscopicDescription} />
      <Field label="면역조직화학염색 (Immunohistochemistry)" value={record.immunohistochemistry} />
      <Field label="특수염색 (Special Stains)" value={record.specialStains} />
      <Field label="분자병리 (Molecular Studies)" value={record.molecularStudies} />
      <Field label="기타 보조검사 (Ancillary Studies)" value={record.ancillaryStudies} />
    </div>
  );
}
