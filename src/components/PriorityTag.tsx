import type { RelevancePriority } from '../models';

const STYLES: Record<RelevancePriority, { labelKo: string; className: string }> = {
  highest: { labelKo: '최우선', className: 'bg-clinical-highestSoft text-clinical-highest' },
  high: { labelKo: '높음', className: 'bg-clinical-highSoft text-clinical-high' },
  important: { labelKo: '참고', className: 'bg-clinical-importantSoft text-clinical-important' },
};

export function PriorityTag({ priority }: { priority: RelevancePriority }) {
  const { labelKo, className } = STYLES[priority];
  return <span className={`rounded px-1.5 py-0.5 text-xxs font-semibold ${className}`}>{labelKo}</span>;
}

export function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className ?? 'h-4 w-4'} aria-hidden="true">
      <path
        d="M5 2.5h6.5L15 6v11a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 5 17V3a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M11.5 2.5V6H15" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 10h6M7 12.5h6M7 15h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
