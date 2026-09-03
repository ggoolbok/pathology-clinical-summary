import type { DiseaseActivityStatus, PresenceStatus } from '../../models';

export function toDateOnly(isoOrDate: string): string {
  return isoOrDate.slice(0, 10);
}

export function presenceLabelKo(status: PresenceStatus | undefined): string {
  switch (status) {
    case 'present':
      return '있음';
    case 'absent':
      return '없음';
    case 'not_documented':
    case undefined:
      return '미기재';
  }
}

/** Tuberculosis-only activity label — see DiseaseActivityStatus. Never used for any other diagnosis category. */
export function tuberculosisActivityLabelKo(status: DiseaseActivityStatus | undefined): string {
  switch (status) {
    case 'active':
      return '활동성';
    case 'inactive':
      return '비활동성';
    case 'unknown':
    case undefined:
      return '활동성 확인되지 않음';
  }
}
