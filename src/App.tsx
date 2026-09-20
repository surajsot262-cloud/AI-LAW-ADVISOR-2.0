/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { TranscriptViewer } from './components/TranscriptViewer';
import { AiInsightsDashboard } from './components/AiInsightsDashboard';
import { DualAssistantDrawer } from './components/DualAssistantDrawer';
import { PipelineUploadModal } from './components/PipelineUploadModal';
import { VisualDocumentScannerModal } from './components/VisualDocumentScannerModal';
import { LANDMARK_CASES } from './data/mockData';
import { SUPPORTED_LANGUAGES } from './data/languages';
import { CaseLawRecord, AssistantMode, SupportedLanguage, ScannedDocumentAnalysis } from './types';
import { Sparkles, Bot, Scale, CheckCircle2, Camera } from 'lucide-react';

export default function App() {
  const [cases, setCases] = useState<CaseLawRecord[]>(LANDMARK_CASES);
  const [activeCaseId, setActiveCaseId] = useState<string>(LANDMARK_CASES[0].id);
  
  // Highlight state for Jump-to-Source in left transcript panel
  const [highlightedParaNum, setHighlightedParaNum] = useState<number | null>(null);

  // Upload Pipeline Stepper Modal
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Visual Document Scanner Modal (Camera / Upload)
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Language state for Multilingual Lexi Real-Time Voice & Text
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(SUPPORTED_LANGUAGES[0]);

  // Scanned Document Context attached to Lexi
  const [attachedScannedDoc, setAttachedScannedDoc] = useState<ScannedDocumentAnalysis | null>(null);

  // Dual-mode assistant drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<AssistantMode>('ai_legal_advisor');

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const handleSelectCase = (caseId: string) => {
    setActiveCaseId(caseId);
    setHighlightedParaNum(null);
  };

  const handleJumpToPara = (paraNum: number) => {
    setHighlightedParaNum(paraNum);
  };

  const handleToggleDrawer = (targetMode?: AssistantMode) => {
    if (targetMode) {
      setDrawerMode(targetMode);
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleConsultLexiWithDoc = (doc: ScannedDocumentAnalysis) => {
    setAttachedScannedDoc(doc);
    setDrawerMode('ai_legal_advisor');
    setIsDrawerOpen(true);
    setToastMessage(`Document Attached: ${doc.documentType}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCaseSynthesized = (newCase: CaseLawRecord) => {
    setCases((prev) => [newCase, ...prev]);
    setActiveCaseId(newCase.id);
    setHighlightedParaNum(null);
    setToastMessage(`Loaded & Indexed: ${newCase.metadata.case_name}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navigation & Upload Header */}
      <TopNav
        cases={cases}
        activeCase={activeCase}
        onSelectCase={handleSelectCase}
        onOpenUpload={() => setIsUploadOpen(true)}
        onToggleDrawer={handleToggleDrawer}
        isDrawerOpen={isDrawerOpen}
        drawerMode={drawerMode}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Main Body Layout (Split-Screen Workspace) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-[calc(100vh-4rem)]">
        
        {/* LEFT PANEL: Document View (PDF / Raw Judgment Transcript) */}
        <section
          aria-label="Raw Judgment Transcript Panel"
          className="lg:col-span-6 xl:col-span-6 h-[600px] lg:h-[calc(100vh-6.5rem)] flex flex-col"
        >
          <TranscriptViewer
            caseName={activeCase.metadata.case_name}
            citationNumber={activeCase.metadata.citation_number}
            transcript={activeCase.full_transcript}
            highlightedParaNum={highlightedParaNum}
            onClearHighlight={() => setHighlightedParaNum(null)}
          />
        </section>

        {/* RIGHT PANEL: AI Insights Dashboard (Tabs, Metadata, Ratio & Verdict) */}
        <section
          aria-label="AI Insights Dashboard Panel"
          className="lg:col-span-6 xl:col-span-6 h-[600px] lg:h-[calc(100vh-6.5rem)] flex flex-col"
        >
          <AiInsightsDashboard
            metadata={activeCase.metadata}
            summary={activeCase.summary}
            precedents={activeCase.key_precedents_cited}
            onJumpToPara={handleJumpToPara}
          />
        </section>

      </main>

      {/* Slide-Over Dual-Mode Assistant Drawer (Talk to Case + Lexi AI Advisor) */}
      <DualAssistantDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeCase={activeCase}
        mode={drawerMode}
        onModeChange={setDrawerMode}
        onJumpToPara={(paraNum) => {
          handleJumpToPara(paraNum);
        }}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        attachedDoc={attachedScannedDoc}
        onClearAttachedDoc={() => setAttachedScannedDoc(null)}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Visual Document Scanner Modal (Upper Camera Integration) */}
      <VisualDocumentScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        selectedLanguage={selectedLanguage}
        onConsultLexiWithDoc={handleConsultLexiWithDoc}
      />

      {/* Pipeline Upload Modal (Extraction -> Chunking -> FAISS Indexing -> Ready) */}
      <PipelineUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onCaseSynthesized={handleCaseSynthesized}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-neutral-900 border border-emerald-500/50 text-neutral-100 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Assistant Trigger for Mobile/Tablet */}
      {!isDrawerOpen && (
        <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsScannerOpen(true)}
            className="p-3 rounded-full bg-neutral-900 border border-neutral-700 text-amber-400 shadow-xl hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center"
            title="Scan Document (Camera / Upload)"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleToggleDrawer('talk_to_case')}
            className="p-3 rounded-full bg-neutral-900 border border-neutral-700 text-sky-400 shadow-xl hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center"
            title="Talk to Case"
          >
            <Bot className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleToggleDrawer('ai_legal_advisor')}
            className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-xl hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer flex items-center justify-center"
            title="Lexi AI Legal Advisor"
          >
            <Sparkles className="w-5 h-5 fill-neutral-950" />
          </button>
        </div>
      )}

    </div>
  );
}
