import type { ProcedureRecord } from '../models';
import { presenceLabelKo } from '../services/summary/textHelpers';
import { DocumentIcon } from './PriorityTag';

const CATEGORY_LABEL_KO: Record<ProcedureRecord['category'], string> = {
  surgery: '수술',
  endoscopy: '내시경',
  biopsy: '시술/생검',
  other: '기타',
};

function FindingChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded border border-clinical-border bg-clinical-bg px-1.5 py-0.5 text-xxs text-clinical-text">
      {label}: <span className="font-semibold">{value}</span>
    </span>
  );
}

export function ProceduresSection({
  records,
  onOpenRecord,
}: {
  records: ProcedureRecord[];
  onOpenRecord: (record: ProcedureRecord) => void;
}) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-clinical-text">시술 / 수술 / 내시경 기록 (Procedure / Surgery / Endoscopy)</h2>
      {records.length === 0 ? (
        <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">
          관련 시술/수술 기록 없음 (미기재)
        </p>
      ) : (
        <ul className="space-y-3">
          {records.map((r) => (
            <li key={r.id} className="rounded-md border border-clinical-border bg-clinical-panel p-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="rounded bg-clinical-accentSoft px-1.5 py-0.5 text-xxs font-semibold text-clinical-accent">
                    {CATEGORY_LABEL_KO[r.category]}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenRecord(r)}
                    className="ml-2 inline-flex items-center gap-1.5 text-sm font-semibold text-clinical-accent hover:underline"
                    title="전체 시술/수술 기록 열기"
                  >
                    <DocumentIcon className="h-4 w-4 shrink-0" />
                    {r.procedureName}
                  </button>
                </div>
                <span className="text-xxs text-clinical-muted">
                  {r.procedureDate} · {r.organSite}
                </span>
              </div>
              {r.operativeFindingsSummary && <p className="mt-1.5 text-sm text-clinical-text">{r.operativeFindingsSummary}</p>}

              {r.cancerSurgeryFindings && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <FindingChip label="육안적 침습" value={presenceLabelKo(r.cancerSurgeryFindings.grossInvasion)} />
                  <FindingChip label="인접장기 침범" value={presenceLabelKo(r.cancerSurgeryFindings.adjacentOrganInvolvement)} />
                  <FindingChip label="전이" value={presenceLabelKo(r.cancerSurgeryFindings.metastaticLesions)} />
                  <FindingChip label="복막파종" value={presenceLabelKo(r.cancerSurgeryFindings.peritonealDissemination)} />
                  <FindingChip label="절제상태" value={r.cancerSurgeryFindings.resectionStatus ?? '미기재'} />
                </div>
              )}

              {r.appendectomyFindings && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <FindingChip label="천공" value={presenceLabelKo(r.appendectomyFindings.perforation)} />
                  <FindingChip label="복막염" value={presenceLabelKo(r.appendectomyFindings.peritonitis)} />
                  <FindingChip label="농양" value={presenceLabelKo(r.appendectomyFindings.abscess)} />
                  <FindingChip label="괴사성 변화" value={presenceLabelKo(r.appendectomyFindings.gangrenousChange)} />
                  <FindingChip label="충수결석" value={presenceLabelKo(r.appendectomyFindings.appendicolith)} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
