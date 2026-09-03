import type { RadiologyRecord } from '../models';
import { sortByDateDesc } from '../utils/sorting';
import { DocumentIcon } from './PriorityTag';

export function RadiologySection({
  records,
  onOpenRecord,
}: {
  records: RadiologyRecord[];
  onOpenRecord: (record: RadiologyRecord) => void;
}) {
  const sorted = sortByDateDesc(records, (r) => r.studyDate);

  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-clinical-text">영상의학 (Radiology)</h2>
      {sorted.length === 0 ? (
        <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">관련 영상 기록 없음 (미기재)</p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((r) => (
            <li key={r.id} className="rounded-md border border-clinical-border bg-clinical-panel p-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenRecord(r)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-clinical-accent hover:underline"
                  title="전체 영상 판독 보고서 열기"
                >
                  <DocumentIcon className="h-4 w-4 shrink-0" />
                  {r.studyType}
                </button>
                <div className="flex gap-1.5 text-xxs">
                  {r.isSameLesion && <span className="rounded bg-clinical-highestSoft px-1.5 py-0.5 font-semibold text-clinical-highest">동일 병변</span>}
                  {r.isStaging && <span className="rounded bg-clinical-highSoft px-1.5 py-0.5 font-semibold text-clinical-high">병기설정</span>}
                  <span className="text-clinical-muted">
                    {r.studyDate} · {r.organSite}
                  </span>
                </div>
              </div>
              <p className="mt-1.5 text-sm text-clinical-text">
                <span className="font-medium">소견: </span>
                {r.relevantFindings}
              </p>
              <p className="mt-1 text-sm text-clinical-text">
                <span className="font-medium">판독: </span>
                {r.impressionSummary}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
