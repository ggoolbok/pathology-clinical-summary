import type { CurrentPathologyCase, ProcedureRecord } from '../../models';
import { isSameOrRelatedOrgan } from './organMatch';

export type ProcedureRelevanceClass = 'related' | 'other';

/**
 * Single place that decides whether a procedure/surgery/endoscopy record is
 * "related" to the current pathology case (it generated the current
 * specimen, or shares the same/related organ) versus "other". Used both by
 * RuleBasedClinicalRelevanceService (for priority ranking) and directly by
 * the Procedures UI (for the A/B section split) so the two never disagree.
 */
export function classifyProcedureRelevance(
  procedure: ProcedureRecord,
  currentCase: CurrentPathologyCase,
): ProcedureRelevanceClass {
  if (procedure.relatedAccessionNumber === currentCase.accessionNumber) return 'related';
  if (isSameOrRelatedOrgan(procedure.organSite, currentCase.organSite)) return 'related';
  return 'other';
}
