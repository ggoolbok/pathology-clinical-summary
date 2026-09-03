import type { ExternalClinicalDocument, PathologyRecord, ProcedureRecord, RadiologyRecord } from '../../models';

/**
 * Discriminated union of everything the single reusable detail drawer can
 * show — pathology, procedure/surgery/endoscopy, radiology, and external
 * clinical documents all render through the same DetailDrawer component.
 */
export type DrawerContent =
  | { kind: 'pathology'; record: PathologyRecord }
  | { kind: 'procedure'; record: ProcedureRecord }
  | { kind: 'radiology'; record: RadiologyRecord }
  | { kind: 'external_document'; record: ExternalClinicalDocument };
