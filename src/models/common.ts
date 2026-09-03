/**
 * Shared primitives for the canonical clinical data model.
 *
 * Every clinical fact in this system traces back to a source record via
 * `Provenance`, and every "did this happen or not" question is answered
 * with `PresenceStatus` rather than a boolean — because in real clinical
 * documentation, "not documented" and "absent" are different facts and
 * must never be collapsed into each other.
 */

export type Sex = 'M' | 'F';

/** present = explicitly documented as occurring; absent = explicitly documented as not occurring;
 *  not_documented = no statement found in the source record either way. */
export type PresenceStatus = 'present' | 'absent' | 'not_documented';

export type RelevancePriority = 'highest' | 'high' | 'important';

/**
 * Every clinical record carries provenance so the UI (and, later, a real
 * hospital adapter) can show where a fact came from instead of presenting
 * synthesized data as if it were a raw EMR fact.
 */
export interface Provenance {
  /** Mock system name today (e.g. 'MOCK_EMR'); a real deployment supplies the source system id. */
  sourceSystem: string;
  sourceRecordId: string;
  recordedAt?: string;
}

export interface WithProvenance {
  provenance: Provenance;
}
