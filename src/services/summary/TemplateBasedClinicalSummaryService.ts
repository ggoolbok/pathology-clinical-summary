import type {
  ClinicalRelevanceResult,
  ClinicalSummary,
  ClinicalSummaryLine,
  ClinicalSummarySection,
  LabTrendPoint,
} from '../../models';
import type { RelevanceInput } from '../relevance/RuleBasedClinicalRelevanceService';
import { isSameOrRelatedOrgan } from '../relevance/organMatch';
import { presenceLabelKo, toDateOnly, tuberculosisActivityLabelKo } from './textHelpers';
import { sortByDateDesc } from '../../utils/sorting';

const UNKNOWN_INDICATION_KO = '적응증 확인되지 않음';

function line(text: string, isNotDocumented = false): ClinicalSummaryLine {
  return { text, isNotDocumented };
}

function notDocumentedLine(text: string): ClinicalSummaryLine {
  return { text, isNotDocumented: true };
}

/**
 * Renders a deterministic Korean clinical summary from already-fetched
 * clinical data plus the RuleBasedClinicalRelevanceService output — no LLM
 * involved. Every line is built directly from a documented field; nothing
 * here infers or fabricates a finding, and every section that has no
 * documented content says so explicitly rather than being silently blank
 * (so "not documented" is never confused with a real negative finding).
 *
 * All lists here use the shared `sortByDateDesc` utility (newest first),
 * per the app-wide reverse-chronological timeline rule.
 */
export class TemplateBasedClinicalSummaryService {
  generate(input: RelevanceInput, relevance: ClinicalRelevanceResult): ClinicalSummary {
    const sections: ClinicalSummarySection[] = [
      this.buildIndicationSection(input),
      this.buildChronicDiseaseSection(input),
      this.buildMalignancyHistorySection(input),
      this.buildSameOrganPathologySection(input),
      this.buildProcedureFindingsSection(input),
      this.buildImagingSection(input),
      this.buildLabTrendSection(input, relevance),
      this.buildExternalReportAvailabilitySection(input, relevance),
    ];

    return {
      patientId: input.currentCase.patientId,
      accessionNumber: input.currentCase.accessionNumber,
      generatedAt: new Date().toISOString(),
      sections,
    };
  }

  /**
   * 현재 생검/수술 적응증: submitted clinical information plus the actual
   * date the current biopsy/surgery was performed. That date comes only
   * from the ProcedureRecord that generated this specimen
   * (relatedAccessionNumber === currentCase.accessionNumber) — never from
   * the pathology-received date, which can legitimately differ (e.g. a
   * gastrectomy performed a day before the specimen reaches pathology).
   * When no such procedure record exists, the date is shown as explicitly
   * not documented rather than fabricated or backfilled from the received date.
   */
  private buildIndicationSection(input: RelevanceInput): ClinicalSummarySection {
    const performingProcedure = input.procedures.find(
      (p) => p.relatedAccessionNumber === input.currentCase.accessionNumber,
    );
    const dateSuffix = ` (${performingProcedure ? performingProcedure.procedureDate : '시행일 기록상 확인되지 않음'})`;

    const text = input.currentCase.clinicalInformationSubmitted?.trim();
    const lines = text
      ? [line(`${text}${dateSuffix}`)]
      : [notDocumentedLine(`현재 검사 적응증(제출된 임상정보)이 문서화되어 있지 않음.${dateSuffix}`)];
    return { id: 'indication', titleKo: '현재 생검/수술 적응증', lines };
  }

  /**
   * 주요 만성질환: each chronic disease line nests the medications explicitly
   * linked to it (via MedicationRecord.relatedDiagnosisId — never inferred
   * from drug-class knowledge or name matching), showing when the disease
   * was first documented and when each medication started. Any medication
   * with no such explicit link is collected under a single
   * "적응증 미확인 약물" line instead of being silently omitted.
   */
  private buildChronicDiseaseSection(input: RelevanceInput): ClinicalSummarySection {
    const chronicDiagnoses = input.diagnoses.filter((d) => d.category !== 'malignancy');
    const linkedMedicationIds = new Set(
      input.medications.filter((m) => m.relatedDiagnosisId).map((m) => m.id),
    );

    const diagnosisLines: ClinicalSummaryLine[] = sortByDateDesc(
      chronicDiagnoses,
      (d) => d.lastDocumentedDate ?? d.firstDocumentedDate,
    ).map((d) => {
      // General DiagnosisStatus lifecycle (활동성/해소됨/과거력) is deliberately not shown
      // here — it stays visible in 진단 및 약물 타임라인. Tuberculosis is the sole
      // exception: its disease-specific activityStatus is clinically meaningful and is
      // shown only when this category is 'tuberculosis', straight from the source data.
      const tbSuffix = d.category === 'tuberculosis' ? ` | ${tuberculosisActivityLabelKo(d.activityStatus)}` : '';
      const relatedMeds = sortByDateDesc(
        input.medications.filter((m) => m.relatedDiagnosisId === d.id),
        (m) => m.startDate,
      );
      const subLines = relatedMeds.map((m) =>
        line(`${m.medicationName} — ${m.startDate}${m.stopDate ? `부터 ${m.stopDate}까지` : '부터 복용'}`),
      );
      return { text: `${d.diagnosisName} | 최초 진단 ${d.firstDocumentedDate}${tbSuffix}`, isNotDocumented: false, subLines };
    });

    const unknownIndicationMeds = sortByDateDesc(
      input.medications.filter((m) => !linkedMedicationIds.has(m.id)),
      (m) => m.startDate,
    );
    if (unknownIndicationMeds.length > 0) {
      diagnosisLines.push({
        text: '적응증 미확인 약물',
        isNotDocumented: false,
        subLines: unknownIndicationMeds.map((m) =>
          notDocumentedLine(`${m.medicationName} — ${m.startDate}${m.stopDate ? `부터 ${m.stopDate}까지` : '부터 복용'} (${UNKNOWN_INDICATION_KO})`),
        ),
      });
    }

    if (diagnosisLines.length === 0) {
      return {
        id: 'chronic-disease',
        titleKo: '주요 만성질환',
        lines: [notDocumentedLine('문서화된 주요 만성질환 없음 (미기재).')],
      };
    }
    return { id: 'chronic-disease', titleKo: '주요 만성질환', lines: diagnosisLines };
  }

  private buildMalignancyHistorySection(input: RelevanceInput): ClinicalSummarySection {
    const malignantPathology = input.previousPathology.filter((p) => p.isMalignant);
    if (malignantPathology.length === 0) {
      return {
        id: 'malignancy-history',
        titleKo: '이전 악성종양 병력 (장기 무관)',
        lines: [notDocumentedLine('문서화된 이전 악성종양 병력 없음 (미기재).')],
      };
    }
    const lines = sortByDateDesc(malignantPathology, (p) => p.diagnosisDate).map((p) =>
      line(`[${p.pathologyNumber}] ${p.diagnosisDate} — ${p.organSite}: ${p.diagnosisSummary}`),
    );
    return { id: 'malignancy-history', titleKo: '이전 악성종양 병력 (장기 무관)', lines };
  }

  private buildSameOrganPathologySection(input: RelevanceInput): ClinicalSummarySection {
    const sameOrgan = input.previousPathology.filter((p) =>
      isSameOrRelatedOrgan(p.organSite, input.currentCase.organSite),
    );
    if (sameOrgan.length === 0) {
      return {
        id: 'same-organ-pathology',
        titleKo: '현재 장기의 이전 병리 소견',
        lines: [notDocumentedLine('현재 장기에 대한 이전 병리 기록 없음 (미기재).')],
      };
    }
    const lines = sortByDateDesc(sameOrgan, (p) => p.diagnosisDate).map((p) =>
      line(`[${p.pathologyNumber}] ${p.diagnosisDate} — ${p.organSite}: ${p.diagnosisSummary}`),
    );
    return { id: 'same-organ-pathology', titleKo: '현재 장기의 이전 병리 소견', lines };
  }

  private buildProcedureFindingsSection(input: RelevanceInput): ClinicalSummarySection {
    const relatedProcedures = sortByDateDesc(
      input.procedures.filter(
        (p) =>
          p.relatedAccessionNumber === input.currentCase.accessionNumber ||
          isSameOrRelatedOrgan(p.organSite, input.currentCase.organSite),
      ),
      (p) => p.procedureDate,
    );
    if (relatedProcedures.length === 0) {
      return {
        id: 'procedure-findings',
        titleKo: '관련 시술/수술/내시경 소견',
        lines: [notDocumentedLine('관련 시술/수술 기록 없음 (미기재).')],
      };
    }
    const lines: ClinicalSummaryLine[] = [];
    for (const p of relatedProcedures) {
      lines.push(line(`[${p.procedureDate}] ${p.procedureName}${p.operativeFindingsSummary ? ` — ${p.operativeFindingsSummary}` : ''}`));
      if (p.cancerSurgeryFindings) {
        const f = p.cancerSurgeryFindings;
        if (f.tumorLocation) lines.push(line(`  · 종양 위치: ${f.tumorLocation}`));
        if (f.tumorSize) lines.push(line(`  · 종양 크기: ${f.tumorSize}`));
        lines.push(line(`  · 육안적 침습: ${presenceLabelKo(f.grossInvasion)}`));
        lines.push(line(`  · 인접 장기 침범: ${presenceLabelKo(f.adjacentOrganInvolvement)}`));
        if (f.lymphNodeFindings) lines.push(line(`  · 림프절 소견: ${f.lymphNodeFindings}`));
        lines.push(line(`  · 전이 병변: ${presenceLabelKo(f.metastaticLesions)}`));
        lines.push(line(`  · 복막파종: ${presenceLabelKo(f.peritonealDissemination)}`));
        if (f.surgicalMarginInfo) lines.push(line(`  · 절제연 정보: ${f.surgicalMarginInfo}`));
        if (f.frozenSectionMarginInfo) lines.push(line(`  · 동결절편 절제연: ${f.frozenSectionMarginInfo}`));
        lines.push(
          f.resectionStatus
            ? line(`  · 절제 상태: ${f.resectionStatus}`)
            : notDocumentedLine('  · 절제 상태(R0/R1/R2): 미기재'),
        );
      }
      if (p.appendectomyFindings) {
        const f = p.appendectomyFindings;
        lines.push(line(`  · 천공: ${presenceLabelKo(f.perforation)}`));
        lines.push(
          line(
            `  · 복막염: ${presenceLabelKo(f.peritonitis)}${
              f.peritonitis === 'present' ? ` (${f.peritonitisExtent === 'not_documented' ? '범위 미기재' : f.peritonitisExtent === 'localized' ? '국소성' : '전반성'})` : ''
            }`,
          ),
        );
        lines.push(line(`  · 농양: ${presenceLabelKo(f.abscess)}`));
        lines.push(line(`  · 괴사성 변화: ${presenceLabelKo(f.gangrenousChange)}`));
        lines.push(line(`  · 충수결석: ${presenceLabelKo(f.appendicolith)}`));
      }
    }
    return { id: 'procedure-findings', titleKo: '관련 시술/수술/내시경 소견', lines };
  }

  private buildImagingSection(input: RelevanceInput): ClinicalSummarySection {
    const relevant = input.radiology.filter(
      (r) => r.isSameLesion || r.isStaging || isSameOrRelatedOrgan(r.organSite, input.currentCase.organSite),
    );
    if (relevant.length === 0) {
      return {
        id: 'imaging',
        titleKo: '최근 영상 소견',
        lines: [notDocumentedLine('관련 영상 기록 없음 (미기재).')],
      };
    }
    const lines = sortByDateDesc(relevant, (r) => r.studyDate).map((r) =>
      line(`[${r.studyDate}] ${r.studyType} — ${r.impressionSummary}`),
    );
    return { id: 'imaging', titleKo: '최근 영상 소견', lines };
  }

  /**
   * 관련 검사 추세: one line per test, newest value on the LEFT ("LATEST ←
   * OLDER ← OLDEST"), value immediately followed by its date in parentheses
   * — no colon between them. Each line also carries structured `labTrend`
   * points so the UI can color abnormal values (H red / L blue) using the
   * shared lab-flag utility instead of re-parsing the text.
   */
  private buildLabTrendSection(input: RelevanceInput, relevance: ClinicalRelevanceResult): ClinicalSummarySection {
    const relevantCodes = new Set(relevance.relevantLabTestCodes);
    const relevantLabs = input.labResults.filter((l) => relevantCodes.has(l.testCode));
    if (relevantLabs.length === 0) {
      return {
        id: 'lab-trends',
        titleKo: '관련 검사 추세',
        lines: [notDocumentedLine('설정된 관련 검사 항목에 대한 결과 없음 (미기재).')],
      };
    }
    const byCode = new Map<string, typeof relevantLabs>();
    for (const l of relevantLabs) {
      const list = byCode.get(l.testCode) ?? [];
      list.push(l);
      byCode.set(l.testCode, list);
    }
    const lines: ClinicalSummaryLine[] = [];
    for (const [, results] of byCode) {
      const newestFirst = sortByDateDesc(results, (r) => r.dateTime).slice(0, 3);
      const testName = newestFirst[0].testName;
      const points: LabTrendPoint[] = newestFirst.map((r) => ({
        value: r.value,
        flag: r.flag,
        date: toDateOnly(r.dateTime),
      }));
      const chain = points
        .map((p) => `${p.value}${p.flag === 'H' ? ' H' : p.flag === 'L' ? ' L' : ''} (${p.date})`)
        .join(' ← ');
      lines.push({ text: `${testName} ${chain}`, isNotDocumented: false, labTrend: { testName, points } });
    }
    return { id: 'lab-trends', titleKo: '관련 검사 추세', lines };
  }

  private buildExternalReportAvailabilitySection(
    input: RelevanceInput,
    relevance: ClinicalRelevanceResult,
  ): ClinicalSummarySection {
    const relevantTypes = new Set(relevance.relevantExternalReportTypes);
    const relevantDocs = sortByDateDesc(
      input.externalDocuments.filter((d) => relevantTypes.has(d.reportType)),
      (d) => d.reportDate,
    );
    if (relevantDocs.length === 0) {
      return {
        id: 'external-report-availability',
        titleKo: '주요 스캔/외부 검사 보고서',
        lines: [notDocumentedLine('설정된 관련 외부/스캔 보고서 없음 (미기재).')],
      };
    }
    const lines = relevantDocs.map((d) =>
      line(`[${d.reportDate}] ${d.title} — 원본 보고서 확인 가능 (본 시스템은 내용을 자동 해석하지 않음).`),
    );
    return { id: 'external-report-availability', titleKo: '주요 스캔/외부 검사 보고서', lines };
  }
}
