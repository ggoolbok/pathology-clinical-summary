import type { LabResult } from '../models';
import { toDateOnly } from '../services/summary/textHelpers';
import { sortByDateDesc } from '../utils/sorting';
import { LAB_FLAG_LABEL_KO, labFlagValueClassName } from '../utils/labFlag';

export function LabResultsSection({
  relevantTestCodes,
  allLabResults,
}: {
  relevantTestCodes: string[];
  allLabResults: LabResult[];
}) {
  const relevantSet = new Set(relevantTestCodes);
  const relevant = allLabResults.filter((l) => relevantSet.has(l.testCode));

  const byCode = new Map<string, LabResult[]>();
  for (const l of relevant) {
    const list = byCode.get(l.testCode) ?? [];
    list.push(l);
    byCode.set(l.testCode, list);
  }

  // Newest first, per the app-wide reverse-chronological timeline rule.
  const groups = Array.from(byCode.entries()).map(([code, results]) => ({
    code,
    testName: results[0].testName,
    recent: sortByDateDesc(results, (r) => r.dateTime).slice(0, 3),
  }));

  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-clinical-text">검사실 결과 (Laboratory Results)</h2>
      <p className="mb-2 text-xxs text-clinical-muted">
        표시된 검사 항목은 config/clinicalRelevanceProfiles.ts의 장기/질환별 프로파일로 결정됩니다.
      </p>
      {groups.length === 0 ? (
        <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">
          현재 케이스에 설정된 관련 검사 항목의 결과 없음 (미기재)
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.code} className="rounded-md border border-clinical-border bg-clinical-panel p-3">
              <h3 className="mb-1.5 text-sm font-semibold text-clinical-text">{g.testName}</h3>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="text-left text-xxs uppercase tracking-wide text-clinical-muted">
                    <th className="py-1 font-medium">일시</th>
                    <th className="py-1 font-medium">값</th>
                    <th className="py-1 font-medium">참고범위</th>
                    <th className="py-1 font-medium">플래그</th>
                  </tr>
                </thead>
                <tbody>
                  {g.recent.map((r) => (
                    <tr key={r.id} className="border-t border-clinical-border/60">
                      <td className="py-1 pr-2 text-clinical-muted">{toDateOnly(r.dateTime)}</td>
                      <td className={`py-1 pr-2 font-medium ${labFlagValueClassName(r.flag)}`}>
                        {r.value}
                        {r.unit ? ` ${r.unit}` : ''}
                      </td>
                      <td className="py-1 pr-2 text-clinical-muted">{r.referenceRange ?? '미기재'}</td>
                      <td className={`py-1 font-semibold ${labFlagValueClassName(r.flag)}`}>
                        {r.flag ? LAB_FLAG_LABEL_KO[r.flag] : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
