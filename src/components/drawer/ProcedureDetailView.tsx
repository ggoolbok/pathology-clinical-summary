import type { ProcedureRecord } from '../../models';
import { presenceLabelKo } from '../../services/summary/textHelpers';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-clinical-border/60 py-1.5 text-sm">
      <span className="text-clinical-muted">{label}</span>
      <span className="font-medium text-clinical-text">{value}</span>
    </div>
  );
}

export function ProcedureDetailView({ record }: { record: ProcedureRecord }) {
  return (
    <div className="p-4">
      {record.cancerSurgeryFindings && (
        <div className="mb-5 rounded-md border border-clinical-border bg-clinical-bg p-3">
          <h4 className="mb-2 text-xxs font-semibold uppercase tracking-wide text-clinical-muted">암 수술 소견 (Cancer Surgery Findings)</h4>
          {record.cancerSurgeryFindings.tumorLocation && <Row label="종양 위치" value={record.cancerSurgeryFindings.tumorLocation} />}
          {record.cancerSurgeryFindings.tumorSize && <Row label="종양 크기" value={record.cancerSurgeryFindings.tumorSize} />}
          <Row label="육안적 침습" value={presenceLabelKo(record.cancerSurgeryFindings.grossInvasion)} />
          <Row label="인접 장기 침범" value={presenceLabelKo(record.cancerSurgeryFindings.adjacentOrganInvolvement)} />
          {record.cancerSurgeryFindings.lymphNodeFindings && <Row label="림프절 소견" value={record.cancerSurgeryFindings.lymphNodeFindings} />}
          <Row label="전이 병변" value={presenceLabelKo(record.cancerSurgeryFindings.metastaticLesions)} />
          <Row label="복막파종" value={presenceLabelKo(record.cancerSurgeryFindings.peritonealDissemination)} />
          {record.cancerSurgeryFindings.surgicalMarginInfo && <Row label="절제연 정보" value={record.cancerSurgeryFindings.surgicalMarginInfo} />}
          {record.cancerSurgeryFindings.frozenSectionMarginInfo && (
            <Row label="동결절편 절제연" value={record.cancerSurgeryFindings.frozenSectionMarginInfo} />
          )}
          <Row label="절제 상태 (R0/R1/R2)" value={record.cancerSurgeryFindings.resectionStatus ?? '미기재'} />
        </div>
      )}

      {record.appendectomyFindings && (
        <div className="mb-5 rounded-md border border-clinical-border bg-clinical-bg p-3">
          <h4 className="mb-2 text-xxs font-semibold uppercase tracking-wide text-clinical-muted">충수절제술 소견 (Appendectomy Findings)</h4>
          <Row label="천공 (Perforation)" value={presenceLabelKo(record.appendectomyFindings.perforation)} />
          <Row
            label="복막염 (Peritonitis)"
            value={
              presenceLabelKo(record.appendectomyFindings.peritonitis) +
              (record.appendectomyFindings.peritonitis === 'present'
                ? ` — ${
                    record.appendectomyFindings.peritonitisExtent === 'localized'
                      ? '국소성'
                      : record.appendectomyFindings.peritonitisExtent === 'generalized'
                        ? '전반성'
                        : '범위 미기재'
                  }`
                : '')
            }
          />
          <Row label="농양 (Abscess)" value={presenceLabelKo(record.appendectomyFindings.abscess)} />
          <Row label="괴사성 변화 (Gangrenous Change)" value={presenceLabelKo(record.appendectomyFindings.gangrenousChange)} />
          <Row label="충수결석 (Appendicolith)" value={presenceLabelKo(record.appendectomyFindings.appendicolith)} />
        </div>
      )}

      <div>
        <h4 className="mb-1 text-xxs font-semibold uppercase tracking-wide text-clinical-muted">원본 수술/시술 기록 (Full Operative Note)</h4>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-clinical-text">{record.fullOperativeNote}</p>
      </div>
    </div>
  );
}
