import type { WorklistItem } from '../models';

interface WorklistProps {
  items: WorklistItem[];
  selectedAccessionNumber: string | undefined;
  onSelect: (accessionNumber: string) => void;
}

const STATUS_LABEL_KO: Record<WorklistItem['status'], string> = {
  PENDING: '대기',
  IN_PROGRESS: '진행중',
  SIGNED_OUT: '판독완료',
  AMENDED: '정정',
};

const STATUS_CLASS: Record<WorklistItem['status'], string> = {
  PENDING: 'bg-clinical-highSoft text-clinical-high',
  IN_PROGRESS: 'bg-clinical-accentSoft text-clinical-accent',
  SIGNED_OUT: 'bg-slate-100 text-slate-500',
  AMENDED: 'bg-clinical-highestSoft text-clinical-highest',
};

function formatDateTime(iso: string): string {
  const [date, time] = iso.split('T');
  return `${date} ${time?.slice(0, 5) ?? ''}`;
}

export function Worklist({ items, selectedAccessionNumber, onSelect }: WorklistProps) {
  return (
    <nav className="flex h-full w-[340px] shrink-0 flex-col border-r border-clinical-border bg-clinical-panel">
      <div className="border-b border-clinical-border px-4 py-3">
        <h1 className="text-sm font-bold text-clinical-text">병리 워크리스트</h1>
        <p className="text-xxs text-clinical-muted">Pathology Worklist · {items.length}건</p>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {items.map((item) => {
          const isSelected = item.accessionNumber === selectedAccessionNumber;
          return (
            <li key={item.accessionNumber}>
              <button
                type="button"
                onClick={() => onSelect(item.accessionNumber)}
                className={`block w-full border-b border-clinical-border/70 px-4 py-3 text-left transition-colors ${
                  isSelected ? 'bg-clinical-accentSoft' : 'hover:bg-clinical-bg'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-clinical-text">{item.accessionNumber}</span>
                  <span className={`rounded px-1.5 py-0.5 text-xxs font-semibold ${STATUS_CLASS[item.status]}`}>
                    {STATUS_LABEL_KO[item.status]}
                  </span>
                </div>
                <div className="mt-1 text-xs text-clinical-muted">
                  {item.mockPatientId} · {item.age}세/{item.sex}
                </div>
                <div className="mt-1 text-xs font-medium text-clinical-text">{item.organSite}</div>
                <div className="text-xs text-clinical-muted">{item.specimen}</div>
                <div className="mt-1 text-xxs text-clinical-muted">{item.procedure}</div>
                <div className="mt-1 text-xxs text-clinical-muted">접수 {formatDateTime(item.receivedDateTime)}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
