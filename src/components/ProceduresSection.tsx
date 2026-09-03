import type { CurrentPathologyCase, ProcedureRecord } from '../models';
import { presenceLabelKo } from '../services/summary/textHelpers';
import { classifyProcedureRelevance } from '../services/relevance/classifyProcedureRelevance';
import { sortByDateDesc } from '../utils/sorting';
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

function ProcedureList({
  records,
  onOpenRecord,
  emptyText,
}: {
  records: ProcedureRecord[];
  onOpenRecord: (record: ProcedureRecord) => void;
  emptyText: string;
}) {
  if (records.length === 0) {
    return <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">{emptyText}</p>;
  }
  return (
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
  );
}

/**
 * Two subsections, analogous to Previous Pathology's A/B split: records
 * classified "related" to the current case (classifyProcedureRelevance,
 * shared with the relevance engine) vs everything else. Nothing is hidden
 * — section B still shows every other procedure/surgery/endoscopy record,
 * this is purely an organizational grouping.
 */
export function ProceduresSection({
  records,
  currentCase,
  onOpenRecord,
}: {
  records: ProcedureRecord[];
  currentCase: CurrentPathologyCase;
  onOpenRecord: (record: ProcedureRecord) => void;
}) {
  const related = sortByDateDesc(
    records.filter((r) => classifyProcedureRelevance(r, currentCase) === 'related'),
    (r) => r.procedureDate,
  );
  const other = sortByDateDesc(
    records.filter((r) => classifyProcedureRelevance(r, currentCase) === 'other'),
    (r) => r.procedureDate,
  );

  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-clinical-text">시술 / 수술 / 내시경 기록 (Procedure / Surgery / Endoscopy)</h2>
      <div className="space-y-5">
        <div>
          <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-clinical-text">
            A. 동일/관련 시술/수술/내시경 기록 (Same/Related Procedures)
          </h3>
          <ProcedureList records={related} onOpenRecord={onOpenRecord} emptyText="관련 시술/수술/내시경 기록 없음 (미기재)" />
        </div>
        <div>
          <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-clinical-text">
            B. 기타 이전 시술/수술/내시경 기록 (Other Previous Procedures)
          </h3>
          <ProcedureList records={other} onOpenRecord={onOpenRecord} emptyText="기타 이전 시술/수술/내시경 기록 없음 (미기재)" />
        </div>
      </div>
    </section>
  );
}
