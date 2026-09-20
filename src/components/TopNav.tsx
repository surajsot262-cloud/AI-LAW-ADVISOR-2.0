import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, UploadCloud, Bot, Sparkles, Copy, Check, ShieldCheck, ChevronDown, 
  BookOpen, Camera, Globe, Mic
} from 'lucide-react';
import { CaseLawRecord, AssistantMode, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface TopNavProps {
  cases: CaseLawRecord[];
  activeCase: CaseLawRecord;
  onSelectCase: (caseId: string) => void;
  onOpenUpload: () => void;
  onToggleDrawer: (mode?: AssistantMode) => void;
  isDrawerOpen: boolean;
  drawerMode: AssistantMode;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onOpenScanner: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  cases,
  activeCase,
  onSelectCase,
  onOpenUpload,
  onToggleDrawer,
  isDrawerOpen,
  drawerMode,
  selectedLanguage,
  onSelectLanguage,
  onOpenScanner,
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (caseRef.current && !caseRef.current.contains(event.target as Node)) {
        setCaseMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(`${activeCase.metadata.case_name}, ${activeCase.metadata.citation_number}`);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <header className="bg-neutral-950 border-b border-neutral-800/80 sticky top-0 z-30 select-none shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600/30 to-amber-950/60 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-100 truncate font-heading">
                Indian Legal Precedent & Summarization Hub
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                <ShieldCheck className="w-3 h-3" /> RAG Grounded
              </span>
            </div>
            <p className="text-xs text-neutral-400 truncate hidden sm:block">
              Supreme Court & High Court Case Analytics • Vector Indexing • Precedent Synthesis
            </p>
          </div>
        </div>

        {/* Middle: Landmark Precedent Selector */}
        <div ref={caseRef} className="relative hidden xl:block">
          <button
            id="landmark-case-selector-btn"
            type="button"
            onClick={() => setCaseMenuOpen(!caseMenuOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800/90 border border-neutral-700/80 rounded-lg text-xs text-neutral-200 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="max-w-[180px] truncate font-medium">{activeCase.metadata.case_name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {caseMenuOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl py-1.5 z-50">
              <div className="px-3 py-1.5 border-b border-neutral-800 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                Select Landmark Precedent
              </div>
              {cases.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onSelectCase(c.id);
                    setCaseMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors flex flex-col gap-0.5 cursor-pointer ${
                    c.id === activeCase.id
                      ? 'bg-amber-500/15 text-amber-300 font-medium'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <span className="truncate">{c.metadata.case_name}</span>
                  <span className="text-[10px] text-neutral-400 truncate">{c.metadata.citation_number}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Actions (Language Selector + Camera Scanner + Upload + Lexi) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Dynamic Language Selector (Prominently in upper navigation bar) */}
          <div ref={langRef} className="relative">
            <button
              id="dynamic-language-selector-btn"
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700/80 hover:border-amber-500/50 rounded-lg text-xs text-neutral-200 transition-colors cursor-pointer"
              title="Change Language for AI Voice & Text Output (Hindi, Tamil, English, etc.)"
            >
              <span className="text-sm leading-none">{selectedLanguage.flagEmoji}</span>
              <span className="font-medium max-w-[110px] sm:max-w-[140px] truncate hidden sm:inline">
                {selectedLanguage.code === 'auto'
                  ? 'English / हिन्दी'
                  : selectedLanguage.code === 'hi-en'
                  ? 'Eng + हिन्दी'
                  : selectedLanguage.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl py-1.5 z-50 max-h-[320px] overflow-y-auto">
                <div className="px-3 py-1.5 border-b border-neutral-800 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Output & Voice Language
                  </span>
                  <Globe className="w-3.5 h-3.5 text-neutral-500" />
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      lang.code === selectedLanguage.code
                        ? 'bg-amber-500/15 text-amber-300 font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm">{lang.flagEmoji}</span>
                      <span className="truncate">{lang.name}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                      {lang.nativeName}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Visual Document Scanner (Optional Upper Camera Integration) */}
          <button
            id="upper-camera-scanner-btn"
            type="button"
            onClick={onOpenScanner}
            title="Visual Document Scanner (Optional Camera Snap / File Upload)"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 hover:border-amber-500/60 border border-neutral-700/80 rounded-lg text-xs font-medium text-amber-300 transition-all shadow-sm cursor-pointer group"
          >
            <Camera className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Scan Document</span>
          </button>

          {/* Quick Citation Copy */}
          <button
            id="copy-citation-btn"
            type="button"
            onClick={handleCopyCitation}
            title="Copy Official Citation"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/70 rounded-lg text-xs transition-colors cursor-pointer"
          >
            {copiedCitation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[11px]">Cite</span>
              </>
            )}
          </button>

          {/* Upload Judgment Pipeline Stepper */}
          <button
            id="upload-judgment-btn"
            type="button"
            onClick={onOpenUpload}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 rounded-lg text-xs font-medium transition-all shadow-sm cursor-pointer hover:border-neutral-600"
          >
            <UploadCloud className="w-4 h-4 text-sky-400" />
            <span className="hidden md:inline">Upload Judgment</span>
            <span className="md:hidden">Upload</span>
          </button>

          {/* Talk to Case Button */}
          <button
            id="talk-to-case-nav-btn"
            type="button"
            onClick={() => onToggleDrawer('talk_to_case')}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
              isDrawerOpen && drawerMode === 'talk_to_case'
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm shadow-sky-900/30'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700/80'
            }`}
          >
            <Bot className="w-4 h-4 text-sky-400" />
            <span className="hidden lg:inline">Talk to Case</span>
          </button>

          {/* Prominent Gold AI Legal Advocate Button */}
          <button
            id="ai-legal-advocate-gold-btn"
            type="button"
            onClick={() => onToggleDrawer('ai_legal_advisor')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border shadow-md ${
              isDrawerOpen && drawerMode === 'ai_legal_advisor'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 border-amber-300 ring-2 ring-amber-400/40'
                : 'bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-400 hover:to-amber-500 text-neutral-950 border-amber-400/80 hover:shadow-amber-500/20'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
            <div className="flex items-center gap-1">
              <span>AI Legal Advocate</span>
              <Mic className="w-3 h-3 text-neutral-950/80" />
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};

