import type {
  ClinicalRelevanceResult,
  ClinicalSummary,
  ClinicalSummaryLine,
  ClinicalSummarySection,
} from '../../models';
import type { RelevanceInput } from '../relevance/RuleBasedClinicalRelevanceService';
import { isSameOrRelatedOrgan } from '../relevance/organMatch';
import { presenceLabelKo, toDateOnly } from './textHelpers';

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
 */
export class TemplateBasedClinicalSummaryService {
  generate(input: RelevanceInput, relevance: ClinicalRelevanceResult): ClinicalSummary {
    const sections: ClinicalSummarySection[] = [
      this.buildIndicationSection(input),
      this.buildChronicDiseaseSection(input),
      this.buildMedicationSection(input),
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

  private buildIndicationSection(input: RelevanceInput): ClinicalSummarySection {
    const text = input.currentCase.clinicalInformationSubmitted?.trim();
    const lines = text ? [line(text)] : [notDocumentedLine('현재 검사 적응증(제출된 임상정보)이 문서화되어 있지 않음.')];
    return { id: 'indication', titleKo: '현재 생검/수술 적응증', lines };
  }

  private buildChronicDiseaseSection(input: RelevanceInput): ClinicalSummarySection {
    const relevant = input.diagnoses.filter((d) => d.category !== 'malignancy');
    if (relevant.length === 0) {
      return {
        id: 'chronic-disease',
        titleKo: '주요 만성질환',
        lines: [notDocumentedLine('문서화된 주요 만성질환 없음 (미기재).')],
      };
    }
    const lines = relevant.map((d) => {
      const period = d.lastDocumentedDate ? `${d.firstDocumentedDate} ~ ${d.lastDocumentedDate}` : d.firstDocumentedDate;
      const statusKo = d.status === 'active' ? '활동성' : d.status === 'resolved' ? '해소됨' : '과거력';
      return line(`${d.diagnosisName} 진단: ${period} (${statusKo})`);
    });
    return { id: 'chronic-disease', titleKo: '주요 만성질환', lines };
  }

  private buildMedicationSection(input: RelevanceInput): ClinicalSummarySection {
    if (input.medications.length === 0) {
      return {
        id: 'medications',
        titleKo: '관련 약물',
        lines: [notDocumentedLine('문서화된 관련 약물 없음 (미기재).')],
      };
    }
    const lines = input.medications
      .slice()
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .map((m) => {
        const doseInfo = [m.dose, m.frequency, m.route].filter(Boolean).join(' ');
        const stopInfo = m.stopDate ? `, 중단: ${m.stopDate}` : '';
        const indicationInfo = m.indication ? ` — 적응증: ${m.indication}` : '';
        return line(`${m.medicationName} 투여 시작: ${m.startDate}${stopInfo}${doseInfo ? ` (${doseInfo})` : ''}${indicationInfo}`);
      });
    return { id: 'medications', titleKo: '관련 약물', lines };
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
    const lines = malignantPathology.map((p) =>
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
    const lines = sameOrgan.map((p) =>
      line(`[${p.pathologyNumber}] ${p.diagnosisDate} — ${p.organSite}: ${p.diagnosisSummary}`),
    );
    return { id: 'same-organ-pathology', titleKo: '현재 장기의 이전 병리 소견', lines };
  }

  private buildProcedureFindingsSection(input: RelevanceInput): ClinicalSummarySection {
    const relatedProcedures = input.procedures.filter(
      (p) =>
        p.relatedAccessionNumber === input.currentCase.accessionNumber ||
        isSameOrRelatedOrgan(p.organSite, input.currentCase.organSite),
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
    const lines = relevant
      .slice()
      .sort((a, b) => b.studyDate.localeCompare(a.studyDate))
      .map((r) => line(`[${r.studyDate}] ${r.studyType} — ${r.relevantFindings} / 판독 소견: ${r.impressionSummary}`));
    return { id: 'imaging', titleKo: '최근 영상 소견', lines };
  }

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
      const sorted = results.slice().sort((a, b) => a.dateTime.localeCompare(b.dateTime)).slice(-3);
      const testName = sorted[0].testName;
      const trend = sorted
        .map((r) => `${toDateOnly(r.dateTime)}: ${r.value}${r.unit ? ` ${r.unit}` : ''}${r.flag && r.flag !== 'N' ? ` (${r.flag})` : ''}`)
        .join(' → ');
      lines.push(line(`${testName}: ${trend}`));
    }
    return { id: 'lab-trends', titleKo: '관련 검사 추세', lines };
  }

  private buildExternalReportAvailabilitySection(
    input: RelevanceInput,
    relevance: ClinicalRelevanceResult,
  ): ClinicalSummarySection {
    const relevantTypes = new Set(relevance.relevantExternalReportTypes);
    const relevantDocs = input.externalDocuments.filter((d) => relevantTypes.has(d.reportType));
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
