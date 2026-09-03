import { useEffect } from 'react';
import type { DrawerContent } from './DrawerContent';
import { getExternalReportDefinition } from '../../config/externalReportDefinitions';
import { PathologyDetailView } from './PathologyDetailView';
import { ProcedureDetailView } from './ProcedureDetailView';
import { RadiologyDetailView } from './RadiologyDetailView';
import { DocumentViewer } from './DocumentViewer';

interface DetailDrawerProps {
  content: DrawerContent | null;
  onClose: () => void;
}

function describe(content: DrawerContent): { sourceTypeKo: string; title: string; recordDate: string; sourceRecordId: string } {
  switch (content.kind) {
    case 'pathology':
      return {
        sourceTypeKo: '병리 (Pathology)',
        title: `${content.record.pathologyNumber} · ${content.record.organSite}`,
        recordDate: content.record.diagnosisDate,
        sourceRecordId: content.record.provenance.sourceRecordId,
      };
    case 'procedure':
      return {
        sourceTypeKo: content.record.category === 'surgery' ? '수술 (Surgery)' : content.record.category === 'endoscopy' ? '내시경 (Endoscopy)' : '시술 (Procedure)',
        title: content.record.procedureName,
        recordDate: content.record.procedureDate,
        sourceRecordId: content.record.provenance.sourceRecordId,
      };
    case 'radiology':
      return {
        sourceTypeKo: '영상 (Radiology)',
        title: content.record.studyType,
        recordDate: content.record.studyDate,
        sourceRecordId: content.record.provenance.sourceRecordId,
      };
    case 'external_document':
      return {
        sourceTypeKo: `외부 문서 (${getExternalReportDefinition(content.record.reportType).label})`,
        title: content.record.title,
        recordDate: content.record.reportDate,
        sourceRecordId: content.record.provenance.sourceRecordId,
      };
  }
}

/**
 * One reusable right-side drawer for pathology, procedure/surgery/endoscopy,
 * radiology, and external clinical documents. Desktop width ~44%. Closes on
 * the close button, Escape, or clicking the scrim; switches content
 * in-place when a different record is selected while already open.
 */
export function DetailDrawer({ content, onClose }: DetailDrawerProps) {
  useEffect(() => {
    if (!content) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, onClose]);

  if (!content) return null;

  const { sourceTypeKo, title, recordDate, sourceRecordId } = describe(content);

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />
      <aside className="relative flex h-full w-full max-w-full flex-col bg-clinical-panel shadow-2xl md:w-[46%] md:min-w-[520px]">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-clinical-border bg-clinical-panel px-5 py-4">
          <div className="min-w-0">
            <span className="inline-block rounded bg-clinical-accentSoft px-2 py-0.5 text-xxs font-semibold uppercase tracking-wide text-clinical-accent">
              {sourceTypeKo}
            </span>
            <h2 className="mt-1.5 truncate text-base font-semibold text-clinical-text">{title}</h2>
            <p className="mt-0.5 text-xs text-clinical-muted">
              기록일 {recordDate} · 원본 기록 ID {sourceRecordId}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기 (Close)"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg text-clinical-muted hover:bg-clinical-bg hover:text-clinical-text"
          >
            ×
          </button>
        </header>
        {content.kind === 'external_document' ? (
          <div className="min-h-0 flex-1">
            <DocumentViewer fileUrl={content.record.fileUrl} fileType={content.record.fileType} title={content.record.title} />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {content.kind === 'pathology' && <PathologyDetailView record={content.record} />}
            {content.kind === 'procedure' && <ProcedureDetailView record={content.record} />}
            {content.kind === 'radiology' && <RadiologyDetailView record={content.record} />}
          </div>
        )}
      </aside>
    </div>
  );
}
