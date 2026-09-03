import type { RadiologyRecord } from '../../models';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4">
      <h4 className="mb-1 text-xxs font-semibold uppercase tracking-wide text-clinical-muted">{label}</h4>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-clinical-text">{value}</p>
    </div>
  );
}

export function RadiologyDetailView({ record }: { record: RadiologyRecord }) {
  return (
    <div className="p-4">
      <Field label="전체 소견 (Full Findings)" value={record.fullFindingsText} />
      <Field label="전체 판독 (Full Impression)" value={record.fullImpressionText} />
    </div>
  );
}
