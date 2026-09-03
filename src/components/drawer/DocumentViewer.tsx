import { useRef, useState } from 'react';
import type { ExternalDocumentFileType } from '../../models';

interface DocumentViewerProps {
  fileUrl: string;
  fileType: ExternalDocumentFileType;
  title: string;
}

const ZOOM_STEP = 0.25;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

/**
 * Generic image/PDF viewer for external clinical documents. Supports full
 * display, zoom in/out, fit-to-width, reset, and scrolling — implemented
 * with a CSS transform over the native browser image/PDF renderer rather
 * than a PDF.js dependency, to keep Version 1's dependency footprint small.
 */
export function DocumentViewer({ fileUrl, fileType, title }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function zoomIn() {
    setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  }
  function zoomOut() {
    setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
  }
  function resetZoom() {
    setZoom(1);
  }
  function fitToWidth() {
    const container = containerRef.current;
    const naturalWidth = imgRef.current?.naturalWidth;
    if (container && naturalWidth) {
      const available = container.clientWidth - 32;
      setZoom(+(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, available / naturalWidth))).toFixed(2));
    } else {
      setZoom(1);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-clinical-border bg-clinical-panel px-3 py-2">
        <span className="text-xxs font-medium uppercase tracking-wide text-clinical-muted">확대/축소</span>
        <button type="button" onClick={zoomOut} className="viewer-btn" aria-label="Zoom out">
          −
        </button>
        <span className="w-12 text-center text-xs tabular-nums text-clinical-text">{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={zoomIn} className="viewer-btn" aria-label="Zoom in">
          +
        </button>
        <button type="button" onClick={fitToWidth} className="viewer-btn px-2 text-xxs">
          너비 맞춤
        </button>
        <button type="button" onClick={resetZoom} className="viewer-btn px-2 text-xxs">
          초기화
        </button>
      </div>
      <div ref={containerRef} className="flex-1 overflow-auto bg-[#e9edf2] p-4">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: 'fit-content' }}>
          {fileType === 'image' ? (
            <img ref={imgRef} src={fileUrl} alt={title} className="block max-w-none shadow-sm" />
          ) : (
            <embed
              src={`${fileUrl}#toolbar=0&navpanes=0`}
              type="application/pdf"
              className="block h-[1100px] w-[850px] bg-white shadow-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
