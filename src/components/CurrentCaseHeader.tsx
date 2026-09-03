import type { CurrentPathologyCase } from '../models';

function formatDateTime(iso: string): string {
  const [date, time] = iso.split('T');
  return `${date} ${time?.slice(0, 5) ?? ''}`;
}

export function CurrentCaseHeader({ currentCase }: { currentCase: CurrentPathologyCase }) {
  return (
    <section className="border-b border-clinical-border bg-clinical-panel px-6 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-lg font-bold text-clinical-text">{currentCase.accessionNumber}</h1>
        <span className="text-xs text-clinical-muted">접수일시 {formatDateTime(currentCase.receivedDateTime)}</span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm md:grid-cols-4">
        <div>
          <dt className="text-xxs uppercase tracking-wide text-clinical-muted">나이/성별</dt>
          <dd className="font-medium text-clinical-text">
            {currentCase.age}세 / {currentCase.sex}
          </dd>
        </div>
        <div>
          <dt className="text-xxs uppercase tracking-wide text-clinical-muted">검체 (Specimen)</dt>
          <dd className="font-medium text-clinical-text">{currentCase.specimen}</dd>
        </div>
        <div>
          <dt className="text-xxs uppercase tracking-wide text-clinical-muted">장기/부위 (Organ/Site)</dt>
          <dd className="font-medium text-clinical-text">{currentCase.organSite}</dd>
        </div>
        <div>
          <dt className="text-xxs uppercase tracking-wide text-clinical-muted">시술 (Procedure)</dt>
          <dd className="font-medium text-clinical-text">{currentCase.procedure}</dd>
        </div>
      </dl>
      <div className="mt-3 rounded-md border border-clinical-border bg-clinical-bg px-3 py-2.5">
        <h2 className="text-xxs font-semibold uppercase tracking-wide text-clinical-muted">제출된 임상정보 (Clinical Information Submitted)</h2>
        <p className="mt-1 text-sm leading-relaxed text-clinical-text">{currentCase.clinicalInformationSubmitted}</p>
      </div>
    </section>
  );
}
