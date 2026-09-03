import type { PresenceStatus } from '../../models';

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
