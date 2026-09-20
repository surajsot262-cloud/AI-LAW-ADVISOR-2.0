import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronUp, ChevronDown, FileText, Bookmark, Copy, Check, Filter, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { JudgmentParagraph } from '../types';

interface TranscriptViewerProps {
  caseName: string;
  citationNumber: string;
  transcript: JudgmentParagraph[];
  highlightedParaNum: number | null;
  onClearHighlight: () => void;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  caseName,
  citationNumber,
  transcript,
  highlightedParaNum,
  onClearHighlight,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('all');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [copiedPara, setCopiedPara] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Collect unique speakers
  const speakers = Array.from(new Set(transcript.map((p) => p.speaker).filter(Boolean))) as string[];

  // Scroll smoothly to highlighted paragraph and apply amber glow
  useEffect(() => {
    if (highlightedParaNum !== null && paraRefs.current[highlightedParaNum]) {
      const el = paraRefs.current[highlightedParaNum];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedParaNum]);

  const filteredTranscript = transcript.filter((para) => {
    const matchesSpeaker = selectedSpeaker === 'all' || para.speaker === selectedSpeaker;
    const matchesSearch =
      searchQuery === '' ||
      para.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      para.speaker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      para.statutes_cited?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpeaker && matchesSearch;
  });

  const handleCopyPara = (paraNum: number, text: string) => {
    navigator.clipboard.writeText(`[Para ${paraNum}] ${caseName} (${citationNumber}):\n"${text}"`);
    setCopiedPara(paraNum);
    setTimeout(() => setCopiedPara(null), 2000);
  };

  const getSectionBadgeColor = (type: string) => {
    switch (type) {
      case 'facts':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/50';
      case 'issues':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/50';
      case 'appellant_arguments':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/50';
      case 'respondent_arguments':
        return 'bg-rose-950/60 text-rose-300 border-rose-800/50';
      case 'analysis':
      case 'ratio':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50';
      case 'verdict':
        return 'bg-yellow-950/60 text-yellow-300 border-yellow-800/50';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  const getSectionLabel = (type: string) => {
    switch (type) {
      case 'facts':
        return 'Factual Background';
      case 'issues':
        return 'Framed Issue';
      case 'appellant_arguments':
        return 'Petitioner / Appellant';
      case 'respondent_arguments':
        return 'Respondent / State';
      case 'analysis':
        return 'Bench Analysis';
      case 'ratio':
        return 'Ratio Decidendi';
      case 'verdict':
        return 'Operative Verdict';
      default:
        return 'Court Record';
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
      
      {/* Top Controls Bar */}
      <div className="p-3 bg-neutral-950/80 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Section Header */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-neutral-100 font-heading tracking-wide flex items-center gap-1.5">
              Raw Court Judgment Transcript
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-neutral-800 text-neutral-400 border border-neutral-700 font-normal">
                {transcript.length} Paras
              </span>
            </h2>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            id="transcript-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript, statutes, citations..."
            className="w-full pl-8 pr-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/80 transition-colors font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Right Tools: Speaker Filter & Font Zoom */}
        <div className="flex items-center gap-2">
          {speakers.length > 0 && (
            <div className="relative">
              <select
                id="speaker-filter-select"
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="text-[11px] py-1 pl-2 pr-6 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg focus:outline-none focus:border-neutral-600 appearance-none cursor-pointer"
              >
                <option value="all">All Speakers</option>
                {speakers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Filter className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          )}

          {/* Font Controls */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setFontSize('sm')}
              className={`p-1 rounded text-[11px] font-mono cursor-pointer ${
                fontSize === 'sm' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Small text"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('base')}
              className={`p-1 rounded text-[11px] font-mono cursor-pointer ${
                fontSize === 'base' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Standard text"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('lg')}
              className={`p-1 rounded text-[11px] font-mono cursor-pointer ${
                fontSize === 'lg' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Large text"
            >
              A+
            </button>
          </div>
        </div>

      </div>

      {/* Active Jump Highlight Notification Bar */}
      {highlightedParaNum !== null && (
        <div className="px-4 py-2 bg-gradient-to-r from-amber-500/20 via-amber-600/15 to-transparent border-b border-amber-500/40 flex items-center justify-between text-xs text-amber-300 animate-pulse">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Jumped to Source: [Paragraph {highlightedParaNum}]</span>
          </div>
          <button
            type="button"
            onClick={onClearHighlight}
            className="text-[11px] text-neutral-400 hover:text-amber-200 underline cursor-pointer"
          >
            Clear Highlight
          </button>
        </div>
      )}

      {/* Document Content Scroll Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-neutral-950 font-serif"
      >
        {filteredTranscript.length === 0 ? (
          <div className="text-center py-16 text-neutral-500 text-xs font-sans">
            No matching paragraphs found for "{searchQuery}".
          </div>
        ) : (
          filteredTranscript.map((para) => {
            const isHighlighted = highlightedParaNum === para.para_num;

            return (
              <div
                key={para.para_num}
                ref={(el) => {
                  paraRefs.current[para.para_num] = el;
                }}
                className={`group relative p-4 rounded-xl transition-all duration-300 border ${
                  isHighlighted
                    ? 'bg-amber-950/35 border-amber-500/80 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/60'
                    : 'bg-neutral-900/50 hover:bg-neutral-900/80 border-neutral-800/80 hover:border-neutral-700/80'
                }`}
              >
                {/* Paragraph Metadata Row */}
                <div className="flex items-center justify-between gap-2 mb-2 font-sans text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* Paragraph Number Pill */}
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] border ${
                        isHighlighted
                          ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                          : 'bg-neutral-800 text-amber-400 border-neutral-700'
                      }`}
                    >
                      [Para {para.para_num}]
                    </span>

                    {/* Speaker / Judge */}
                    {para.speaker && (
                      <span className="font-semibold text-neutral-200 flex items-center gap-1">
                        <Bookmark className="w-3 h-3 text-amber-400/70" />
                        {para.speaker}
                      </span>
                    )}

                    {/* Section Type Badge */}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider border ${getSectionBadgeColor(
                        para.section_type
                      )}`}
                    >
                      {getSectionLabel(para.section_type)}
                    </span>
                  </div>

                  {/* Actions: Copy */}
                  <button
                    type="button"
                    onClick={() => handleCopyPara(para.para_num, para.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded cursor-pointer"
                    title="Copy Paragraph Citation"
                  >
                    {copiedPara === para.para_num ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Paragraph Text with Typographic Fidelity */}
                <p
                  className={`leading-relaxed tracking-normal text-neutral-200 ${
                    fontSize === 'sm' ? 'text-xs leading-5' : fontSize === 'lg' ? 'text-base leading-7' : 'text-sm leading-6'
                  }`}
                >
                  {para.text}
                </p>

                {/* Statutes or Key Phrases Badges */}
                {(para.statutes_cited || para.key_phrases) && (
                  <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center gap-1.5 flex-wrap font-sans text-[11px]">
                    {para.statutes_cited?.map((statute, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-sky-950/40 text-sky-300 border border-sky-800/40 font-mono text-[10px]"
                      >
                        ⚖️ {statute}
                      </span>
                    ))}
                    {para.key_phrases?.map((phrase, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/60 text-[10px]"
                      >
                        🏷️ {phrase}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
