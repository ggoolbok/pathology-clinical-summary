import type { DiagnosisRecord, MedicationRecord } from '../models';
import { sortByDateDesc } from '../utils/sorting';

const STATUS_LABEL_KO: Record<DiagnosisRecord['status'], string> = {
  active: '활동성',
  resolved: '해소됨',
  historical: '과거력',
};

const UNKNOWN_INDICATION_KO = '적응증 확인되지 않음';

function DiagnosisTable({ records }: { records: DiagnosisRecord[] }) {
  if (records.length === 0) {
    return <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">문서화된 진단 없음 (미기재)</p>;
  }
  const sorted = sortByDateDesc(records, (d) => d.lastDocumentedDate ?? d.firstDocumentedDate);
  return (
    <div className="overflow-x-auto rounded border border-clinical-border">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr className="bg-clinical-bg text-left text-xxs uppercase tracking-wide text-clinical-muted">
            <th className="px-3 py-2 font-semibold">진단명</th>
            <th className="px-3 py-2 font-semibold">최초 기록일</th>
            <th className="px-3 py-2 font-semibold">최근 기록일</th>
            <th className="px-3 py-2 font-semibold">상태</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((d) => (
            <tr key={d.id} className="border-t border-clinical-border">
              <td className="px-3 py-2 align-top font-medium text-clinical-text">{d.diagnosisName}</td>
              <td className="whitespace-nowrap px-3 py-2 align-top">{d.firstDocumentedDate}</td>
              <td className="whitespace-nowrap px-3 py-2 align-top">{d.lastDocumentedDate ?? '미기재'}</td>
              <td className="whitespace-nowrap px-3 py-2 align-top">{STATUS_LABEL_KO[d.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MedicationTable({ records, diagnoses }: { records: MedicationRecord[]; diagnoses: DiagnosisRecord[] }) {
  if (records.length === 0) {
    return <p className="rounded border border-dashed border-clinical-border px-3 py-2 text-xs italic text-clinical-muted">문서화된 약물 없음 (미기재)</p>;
  }
  const diagnosisById = new Map(diagnoses.map((d) => [d.id, d]));
  const sorted = sortByDateDesc(records, (m) => m.startDate);
  return (
    <div className="overflow-x-auto rounded border border-clinical-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-clinical-bg text-left text-xxs uppercase tracking-wide text-clinical-muted">
            <th className="px-3 py-2 font-semibold">약물명</th>
            <th className="px-3 py-2 font-semibold">시작일</th>
            <th className="px-3 py-2 font-semibold">중단일</th>
            <th className="px-3 py-2 font-semibold">용량/빈도/경로</th>
            <th className="px-3 py-2 font-semibold">관련 진단 / 적응증</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m) => {
            // Only ever resolved from an explicit relatedDiagnosisId — never guessed from the drug name.
            const linkedDiagnosisName = m.relatedDiagnosisId ? diagnosisById.get(m.relatedDiagnosisId)?.diagnosisName : undefined;
            const indicationDisplay = m.indication ?? linkedDiagnosisName;
            return (
              <tr key={m.id} className="border-t border-clinical-border">
                <td className="px-3 py-2 align-top font-medium text-clinical-text">{m.medicationName}</td>
                <td className="whitespace-nowrap px-3 py-2 align-top">{m.startDate}</td>
                <td className="whitespace-nowrap px-3 py-2 align-top">{m.stopDate ?? '—'}</td>
                <td className="px-3 py-2 align-top">{[m.dose, m.frequency, m.route].filter(Boolean).join(' · ') || '미기재'}</td>
                <td className={`px-3 py-2 align-top ${indicationDisplay ? 'text-clinical-text' : 'italic text-clinical-muted'}`}>
                  {indicationDisplay ?? UNKNOWN_INDICATION_KO}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function DiagnosesMedicationsSection({
  diagnoses,
  medications,
}: {
  diagnoses: DiagnosisRecord[];
  medications: MedicationRecord[];
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="mb-2 text-sm font-bold text-clinical-text">진단 및 약물 타임라인 (Diagnoses &amp; Medication Timeline)</h2>
        <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-clinical-text">진단 (Diagnoses)</h3>
        <DiagnosisTable records={diagnoses} />
      </div>
      <div>
        <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-clinical-text">약물 (Medications)</h3>
        <MedicationTable records={medications} diagnoses={diagnoses} />
      </div>
    </section>
  );
}
