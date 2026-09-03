import type { PathologyRecord } from '../models';
import { isSameOrRelatedOrgan } from '../services/relevance/organMatch';
import { sortByDateDesc } from '../utils/sorting';
import { DocumentIcon } from './PriorityTag';

interface PreviousPathologySectionProps {
  records: PathologyRecord[];
  currentOrganSite: string;
  onOpenRecord: (record: PathologyRecord) => void;
}

function PathologyTable({
  title,
  records,
  onOpenRecord,
  emphasize,
}: {
  title: string;
  records: PathologyRecord[];
  onOpenRecord: (record: PathologyRecord) => void;
  emphasize?: boolean;
}) {
  return (
    <div>
      <h3 className={`mb-1.5 text-xs font-bold uppercase tracking-wide ${emphasize ? 'text-clinical-highest' : 'text-clinical-text'}`}>
        {title}
      </h3>
      {records.length === 0 ? (
        <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">
          해당 항목의 이전 병리 기록 없음 (미기재)
        </p>
      ) : (
        <div className="overflow-x-auto rounded border border-clinical-border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-clinical-bg text-left text-xxs uppercase tracking-wide text-clinical-muted">
                <th className="px-3 py-2 font-semibold">병리번호</th>
                <th className="px-3 py-2 font-semibold">장기/검체</th>
                <th className="px-3 py-2 font-semibold">진단일</th>
                <th className="px-3 py-2 font-semibold">진단명</th>
                <th className="px-3 py-2 font-semibold">병리의</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.pathologyNumber} className="border-t border-clinical-border">
                  <td className="whitespace-nowrap px-3 py-2 align-top">
                    <button
                      type="button"
                      onClick={() => onOpenRecord(r)}
                      className="inline-flex items-center gap-1.5 font-medium text-clinical-accent hover:underline"
                      title="전체 병리 보고서 열기"
                    >
                      <DocumentIcon className="h-4 w-4 shrink-0" />
                      {r.pathologyNumber}
                    </button>
                    {r.isMalignant && (
                      <span className="ml-1.5 rounded bg-clinical-highestSoft px-1 py-0.5 text-xxs font-semibold text-clinical-highest">
                        악성
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 align-top">
                    {r.organSite}
                    <div className="text-xxs text-clinical-muted">{r.specimen}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 align-top">{r.diagnosisDate}</td>
                  <td className="px-3 py-2 align-top">{r.diagnosisSummary}</td>
                  <td className="whitespace-nowrap px-3 py-2 align-top">{r.pathologist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/**
 * Shows ALL previous pathology, split into same/related-organ vs other.
 * Any malignant record is pinned into the same/related-organ table
 * regardless of its actual organ, per the "previous malignancy stays high
 * priority regardless of organ" rule — it may represent metastasis.
 */
export function PreviousPathologySection({ records, currentOrganSite, onOpenRecord }: PreviousPathologySectionProps) {
  const sameOrRelated = sortByDateDesc(
    records.filter((r) => r.isMalignant || isSameOrRelatedOrgan(r.organSite, currentOrganSite)),
    (r) => r.diagnosisDate,
  );
  const other = sortByDateDesc(
    records.filter((r) => !r.isMalignant && !isSameOrRelatedOrgan(r.organSite, currentOrganSite)),
    (r) => r.diagnosisDate,
  );

  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-clinical-text">이전 병리 (Previous Pathology)</h2>
      <div className="space-y-5">
        <PathologyTable
          title="A. 동일/관련 장기 병리 및 악성종양 병력 (Same/Related Organ &amp; Any Malignancy)"
          records={sameOrRelated}
          onOpenRecord={onOpenRecord}
          emphasize
        />
        <PathologyTable title="B. 기타 이전 병리 (Other Previous Pathology)" records={other} onOpenRecord={onOpenRecord} />
      </div>
    </section>
  );
}
