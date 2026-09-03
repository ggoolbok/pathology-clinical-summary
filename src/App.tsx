import { useEffect, useMemo, useState } from 'react';
import type { WorklistItem } from './models';
import { ClinicalDataService } from './services/ClinicalDataService';
import type { PatientCaseBundle } from './services/ClinicalDataService';
import { MockClinicalDataProvider } from './providers/MockClinicalDataProvider';
import { RuleBasedClinicalRelevanceService } from './services/relevance/RuleBasedClinicalRelevanceService';
import { TemplateBasedClinicalSummaryService } from './services/summary/TemplateBasedClinicalSummaryService';
import { Worklist } from './components/Worklist';
import { CurrentCaseHeader } from './components/CurrentCaseHeader';
import { ClinicalSummaryPanel } from './components/ClinicalSummaryPanel';
import { PreviousPathologySection } from './components/PreviousPathologySection';
import { DiagnosesMedicationsSection } from './components/DiagnosesMedicationsSection';
import { ProceduresSection } from './components/ProceduresSection';
import { RadiologySection } from './components/RadiologySection';
import { LabResultsSection } from './components/LabResultsSection';
import { ExternalDocumentsSection } from './components/ExternalDocumentsSection';
import { DetailDrawer } from './components/drawer/DetailDrawer';
import type { DrawerContent } from './components/drawer/DrawerContent';

// Single instances for the lifetime of the app. Swapping MockClinicalDataProvider
// for a real hospital adapter later only changes this one line.
const clinicalDataService = new ClinicalDataService(new MockClinicalDataProvider());
const relevanceService = new RuleBasedClinicalRelevanceService();
const summaryService = new TemplateBasedClinicalSummaryService();

export default function App() {
  const [worklist, setWorklist] = useState<WorklistItem[]>([]);
  const [selectedAccession, setSelectedAccession] = useState<string | undefined>(undefined);
  const [bundle, setBundle] = useState<PatientCaseBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerContent, setDrawerContent] = useState<DrawerContent | null>(null);

  useEffect(() => {
    clinicalDataService.getWorklist().then((items) => {
      setWorklist(items);
      if (items.length > 0) setSelectedAccession(items[0].accessionNumber);
    });
  }, []);

  useEffect(() => {
    if (!selectedAccession) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    clinicalDataService
      .getPatientCaseBundle(selectedAccession)
      .then((result) => {
        if (!cancelled) setBundle(result);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedAccession]);

  const relevance = useMemo(() => {
    if (!bundle) return null;
    return relevanceService.evaluate({
      currentCase: bundle.currentCase,
      previousPathology: bundle.previousPathology,
      diagnoses: bundle.diagnoses,
      medications: bundle.medications,
      procedures: bundle.procedures,
      radiology: bundle.radiology,
      labResults: bundle.labResults,
      externalDocuments: bundle.externalDocuments,
    });
  }, [bundle]);

  const summary = useMemo(() => {
    if (!bundle || !relevance) return null;
    return summaryService.generate(
      {
        currentCase: bundle.currentCase,
        previousPathology: bundle.previousPathology,
        diagnoses: bundle.diagnoses,
        medications: bundle.medications,
        procedures: bundle.procedures,
        radiology: bundle.radiology,
        labResults: bundle.labResults,
        externalDocuments: bundle.externalDocuments,
      },
      relevance,
    );
  }, [bundle, relevance]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-clinical-bg">
      <Worklist items={worklist} selectedAccessionNumber={selectedAccession} onSelect={setSelectedAccession} />

      <main className="flex-1 overflow-y-auto">
        {loading && <div className="p-8 text-sm text-clinical-muted">불러오는 중... (Loading)</div>}
        {error && <div className="p-8 text-sm text-clinical-highest">오류: {error}</div>}

        {!loading && !error && bundle && relevance && summary && (
          <>
            <CurrentCaseHeader currentCase={bundle.currentCase} />
            <div className="space-y-6 px-6 py-5">
              <ClinicalSummaryPanel summary={summary} />
              <PreviousPathologySection
                records={bundle.previousPathology}
                currentOrganSite={bundle.currentCase.organSite}
                onOpenRecord={(record) => setDrawerContent({ kind: 'pathology', record })}
              />
              <DiagnosesMedicationsSection diagnoses={bundle.diagnoses} medications={bundle.medications} />
              <ProceduresSection
                records={bundle.procedures}
                onOpenRecord={(record) => setDrawerContent({ kind: 'procedure', record })}
              />
              <RadiologySection
                records={bundle.radiology}
                onOpenRecord={(record) => setDrawerContent({ kind: 'radiology', record })}
              />
              <LabResultsSection relevantTestCodes={relevance.relevantLabTestCodes} allLabResults={bundle.labResults} />
              <ExternalDocumentsSection
                relevantReportTypes={relevance.relevantExternalReportTypes}
                allDocuments={bundle.externalDocuments}
                onOpenRecord={(record) => setDrawerContent({ kind: 'external_document', record })}
              />
            </div>
          </>
        )}
      </main>

      <DetailDrawer content={drawerContent} onClose={() => setDrawerContent(null)} />
    </div>
  );
}
