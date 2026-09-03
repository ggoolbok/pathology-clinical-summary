import type { ProcedureRecord } from '../models';
import { sortByDateDesc } from '../utils/sorting';
import { DocumentIcon } from './PriorityTag';

const SURGEON_NOT_DOCUMENTED_KO = '기록상 확인되지 않음';

/**
 * 주요 수술력: only actual surgical operations (category === 'surgery') —
 * diagnostic biopsies, radiology procedures, and endoscopies are never
 * included here even when they're otherwise "related" to the current case;
 * that broader picture lives in the Procedures A/B section below.
 */
export function MajorSurgerySection({
  records,
  onOpenRecord,
}: {
  records: ProcedureRecord[];
  onOpenRecord: (record: ProcedureRecord) => void;
}) {
  const surgeries = sortByDateDesc(
    records.filter((r) => r.category === 'surgery'),
    (r) => r.procedureDate,
  );

  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-clinical-text">주요 수술력 (Major Surgery History)</h2>
      {surgeries.length === 0 ? (
        <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">
          문서화된 주요 수술력 없음 (미기재)
        </p>
      ) : (
        <div className="overflow-x-auto rounded border border-clinical-border">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-clinical-bg text-left text-xxs uppercase tracking-wide text-clinical-muted">
                <th className="px-3 py-2 font-semibold">날짜</th>
                <th className="px-3 py-2 font-semibold">수술명</th>
                <th className="px-3 py-2 font-semibold">집도의</th>
              </tr>
            </thead>
            <tbody>
              {surgeries.map((r) => (
                <tr key={r.id} className="border-t border-clinical-border">
                  <td className="whitespace-nowrap px-3 py-2 align-top">{r.procedureDate}</td>
                  <td className="px-3 py-2 align-top">
                    <button
                      type="button"
                      onClick={() => onOpenRecord(r)}
                      className="inline-flex items-center gap-1.5 font-medium text-clinical-accent hover:underline"
                      title="전체 수술 기록 열기"
                    >
                      <DocumentIcon className="h-4 w-4 shrink-0" />
                      {r.procedureName}
                    </button>
                  </td>
                  <td className={`whitespace-nowrap px-3 py-2 align-top ${r.surgeon ? 'text-clinical-text' : 'italic text-clinical-muted'}`}>
                    {r.surgeon ?? SURGEON_NOT_DOCUMENTED_KO}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
