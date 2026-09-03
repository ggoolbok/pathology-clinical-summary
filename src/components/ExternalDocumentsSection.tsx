import type { ExternalClinicalDocument, ExternalReportType } from '../models';
import { EXTRACTION_STATUS_LABEL_KO } from '../models';
import { getExternalReportDefinition } from '../config/externalReportDefinitions';
import { sortByDateDesc } from '../utils/sorting';
import { DocumentIcon } from './PriorityTag';

export function ExternalDocumentsSection({
  relevantReportTypes,
  allDocuments,
  onOpenRecord,
}: {
  relevantReportTypes: ExternalReportType[];
  allDocuments: ExternalClinicalDocument[];
  onOpenRecord: (record: ExternalClinicalDocument) => void;
}) {
  const relevantSet = new Set(relevantReportTypes);
  const relevant = sortByDateDesc(
    allDocuments.filter((d) => relevantSet.has(d.reportType)),
    (d) => d.reportDate,
  );

  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-clinical-text">외부/스캔 검사 보고서 (External / Scanned Laboratory Reports)</h2>
      <p className="mb-2 text-xxs text-clinical-muted">
        본 시스템은 첨부된 원본 문서를 자동으로 해석하지 않습니다. 관련 문서의 존재만 확인하고, 원본은 열람하여 직접 검토하십시오.
      </p>
      {relevant.length === 0 ? (
        <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">
          현재 케이스에 설정된 관련 외부/스캔 보고서 없음 (미기재)
        </p>
      ) : (
        <ul className="space-y-2">
          {relevant.map((d) => {
            const def = getExternalReportDefinition(d.reportType);
            return (
              <li key={d.id} className="flex items-center justify-between gap-3 rounded-md border border-clinical-border bg-clinical-panel p-3">
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onOpenRecord(d)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-clinical-accent hover:underline"
                    title="원본 문서 열기"
                  >
                    <DocumentIcon className="h-4 w-4 shrink-0" />
                    {d.title}
                  </button>
                  <div className="mt-0.5 text-xxs text-clinical-muted">
                    {def.label} · {d.reportDate}
                    {d.organSite ? ` · ${d.organSite}` : ''}
                  </div>
                  <div className="mt-0.5 text-xxs text-clinical-muted">{EXTRACTION_STATUS_LABEL_KO[d.extractionStatus]}</div>
                </div>
                <span className="shrink-0 rounded bg-clinical-bg px-1.5 py-0.5 text-xxs uppercase text-clinical-muted">{def.viewerType}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
