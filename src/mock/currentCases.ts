import type { CurrentPathologyCase } from '../models';
import { mockWorklist } from './worklist';

/** Clinical information submitted by the ordering clinician with each pathology request. */
const clinicalInformationByAccession: Record<string, string> = {
  'S26-0001':
    '54세 남 . 2021년 사체 신장이식 상태. 최근 혈청 크레아티닌 상승 소견으로 이식신 기능 저하 감별 위해 이식신 생검 시행. Rule out rejection.',
  'S26-0002':
    '29세 여. 3주 전부터 발생한 하지부종 및 거품뇨. 요검사에서 단백뇨/혈뇨 확인됨. Nephrotic range proteinuria 감별 위해 신생검 시행.',
  'S26-0003':
    '61세 남. 건강검진에서 우연히 발견된 단백뇨 및 혈청 M-protein 양성. Monoclonal gammopathy of renal significance (MGRS) 감별 위해 신생검 시행.',
  'S26-0004':
    '68세 남. 상복부 불편감으로 시행한 상부위장관내시경에서 위 체부 궤양성 병변 발견, 조직검사상 선암 진단 후 아전위절제술 시행. Rule out invasion depth and margin status.',
  'S26-0005':
    '72세 여. B형 간염 연관 간경변, 2023년 간세포암종(HCC) 진단 후 고주파절제술 시행 병력. 추적 영상에서 새로운 간 병변(segment 6) 발견되어 조직검사 시행. Rule out recurrent HCC.',
  'S26-0006':
    '34세 남. 12시간 지속된 우하복부 통증, 발열, 반발통. 임상적으로 급성 충수염 의심되어 응급 복강경 충수절제술 시행.',
  'S26-0007':
    '22세 여. 8시간 전 발생한 우하복부 통증. 임상적으로 급성 충수염 의심되어 복강경 충수절제술 시행. 수술 소견 기록 간단함.',
  'S26-0008':
    '66세 남. 2022년 대장선암 진단 및 수술 병력. 추적 흉부 CT에서 우상엽 신생 결절 발견되어 전이 vs 원발성 폐암 감별 위해 CT 유도 생검 시행.',
  'S26-0009':
    '58세 여. 2019년 유방암 진단 및 치료 병력. 정기 추적 복부 영상에서 간 segment 4 병변 발견되어 전이 vs 원발성 병변 감별 위해 조직검사 시행.',
  'S26-0010':
    '70세 여. 만성 변비 및 혈변으로 시행한 대장내시경에서 상행결장 종괴 발견, 조직검사상 선암 진단 후 우측 반결장절제술 시행.',
  'S26-0011':
    '64세 남. 건강검진에서 PSA 상승 소견(8.2 ng/mL)으로 전립선암 감별 위해 경직장 초음파 유도 전립선 생검 시행.',
  'S26-0012':
    '45세 남. 2개월 전부터 촉지되는 경부 림프절 종대, 발열 및 체중감소 동반. 림프종 감별 위해 절제 생검 시행.',
  'S26-0013':
    '45세 여. 좌측 전완부에 서서히 커지는 색소성 병변. 임상적으로 이형성 모반 vs 흑색종 감별 위해 절제 생검 시행.',
  'S26-0014':
    '51세 여. 건강검진 갑상선 초음파에서 우엽 1.2cm 저에코 결절(TI-RADS 4) 발견되어 세침흡인검사 시행.',
  'S26-0015':
    '77세 남. 3개월간 진행하는 범혈구감소증. 골수 병리 감별 위해 골수생검 및 흡인 시행.',
};

export function buildCurrentPathologyCase(accessionNumber: string): CurrentPathologyCase | undefined {
  const item = mockWorklist.find((w) => w.accessionNumber === accessionNumber);
  if (!item) return undefined;
  return {
    accessionNumber: item.accessionNumber,
    patientId: item.patientId,
    age: item.age,
    sex: item.sex,
    specimen: item.specimen,
    organSite: item.organSite,
    procedure: item.procedure,
    receivedDateTime: item.receivedDateTime,
    status: item.status,
    clinicalInformationSubmitted:
      clinicalInformationByAccession[accessionNumber] ?? '제출된 임상정보가 기록되어 있지 않습니다.',
  };
}
