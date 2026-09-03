import type { ClinicalSummary } from '../models';

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
            <ul className="space-y-1">
              {section.lines.map((l, idx) => (
                <li
                  key={idx}
                  className={`text-sm leading-relaxed ${
                    l.isNotDocumented ? 'italic text-clinical-muted' : 'text-clinical-text'
                  }`}
                >
                  {l.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
