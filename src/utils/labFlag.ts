import type { LabFlag } from '../models';

/**
 * Single shared High/Low styling rule for lab values, used by both the full
 * Laboratory Results table and the Clinical Summary's lab-trend chain, so
 * abnormal-value color never drifts between the two views.
 *
 * Per the clinical dashboard style: emphasize the value/flag text itself,
 * never the whole row — HIGH in red, LOW in blue, normal in standard text.
 */
export function labFlagValueClassName(flag: LabFlag | undefined): string {
  switch (flag) {
    case 'H':
      return 'text-clinical-highest font-semibold';
    case 'critical':
      return 'text-clinical-highest font-bold';
    case 'L':
      return 'text-clinical-accent font-semibold';
    case 'N':
    case undefined:
      return 'text-clinical-text';
  }
}

/** Short suffix shown next to an abnormal value, e.g. "1.82 H". Empty for normal values. */
export function labFlagSuffix(flag: LabFlag | undefined): string {
  switch (flag) {
    case 'H':
      return 'H';
    case 'L':
      return 'L';
    case 'critical':
      return '위험';
    case 'N':
    case undefined:
      return '';
  }
}

export const LAB_FLAG_LABEL_KO: Record<LabFlag, string> = {
  H: '높음',
  L: '낮음',
  N: '정상',
  critical: '위험',
};
