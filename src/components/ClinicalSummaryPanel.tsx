import type { ClinicalSummary, ClinicalSummaryLine } from '../models';
import { labFlagSuffix, labFlagValueClassName } from '../utils/labFlag';

function LabTrendChain({ points }: { points: NonNullable<ClinicalSummaryLine['labTrend']>['points'] }) {
  return (
    <div className="text-sm leading-relaxed text-clinical-text">
      {points.map((p, idx) => (
        <span key={idx}>
          {idx > 0 && <span className="text-clinical-muted"> ← </span>}
          <span className={labFlagValueClassName(p.flag)}>
            {p.value}
            {labFlagSuffix(p.flag) && ` ${labFlagSuffix(p.flag)}`}
          </span>{' '}
          <span className="text-clinical-muted">({p.date})</span>
        </span>
      ))}
    </div>
  );
}

function SummaryLine({ line, depth = 0 }: { line: ClinicalSummaryLine; depth?: number }) {
  return (
    <li className={depth > 0 ? 'mt-0.5' : ''}>
      {line.labTrend ? (
        <div>
          <div className="text-sm font-semibold text-clinical-text">{line.labTrend.testName}</div>
          <LabTrendChain points={line.labTrend.points} />
        </div>
      ) : (
        <div
          className={`text-sm leading-relaxed ${
            line.isNotDocumented ? 'italic text-clinical-muted' : 'text-clinical-text'
          } ${depth > 0 ? 'text-xs' : ''}`}
        >
          {line.text}
        </div>
      )}
      {line.subLines && line.subLines.length > 0 && (
        <ul className="mt-0.5 space-y-0.5 border-l-2 border-clinical-border pl-3">
          {line.subLines.map((sub, idx) => (
            <SummaryLine key={idx} line={sub} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function ClinicalSummaryPanel({ summary }: { summary: ClinicalSummary }) {
  return (
    <section className="rounded-lg border-2 border-clinical-accent/30 bg-clinical-panel shadow-sm">
      <header className="rounded-t-lg border-b border-clinical-border bg-clinical-accentSoft px-5 py-3">
        <h2 className="text-sm font-bold text-clinical-accent">임상 요약 (Clinical Summary)</h2>
        <p className="text-xxs text-clinical-muted">규칙 기반 요약 · LLM 미사용 · Rule-based, template-generated (no LLM)</p>
      </header>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 px-5 py-4 lg:grid-cols-2">
        {summary.sections.map((section) => (
          <div key={section.id}>
            <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-clinical-text">{section.titleKo}</h3>
            <ul className="space-y-1.5">
              {section.lines.map((l, idx) => (
                <SummaryLine key={idx} line={l} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
