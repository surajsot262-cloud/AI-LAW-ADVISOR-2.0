import React, { useState } from 'react';
import { 
  Building2, Calendar, Users, Scale, ExternalLink, ArrowUpRight, Copy, Check, 
  FileText, HelpCircle, MessageSquareQuote, Award, BookOpen, Share2, Sparkles
} from 'lucide-react';
import { CaseMetadata, CaseSummary, PrecedentCited, TabType } from '../types';

interface AiInsightsDashboardProps {
  metadata: CaseMetadata;
  summary: CaseSummary;
  precedents: PrecedentCited[];
  onJumpToPara: (paraNum: number) => void;
}

export const AiInsightsDashboard: React.FC<AiInsightsDashboardProps> = ({
  metadata,
  summary,
  precedents,
  onJumpToPara,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('factual_matrix');
  const [copiedBadge, setCopiedBadge] = useState<string | null>(null);
  const [argumentSide, setArgumentSide] = useState<'appellant' | 'respondent'>('appellant');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopyBadge = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBadge(text);
    setTimeout(() => setCopiedBadge(null), 1800);
  };

  const handleCopyTabContent = () => {
    let textToCopy = '';
    if (activeTab === 'factual_matrix') {
      textToCopy = `FACTUAL MATRIX - ${metadata.case_name}:\n${summary.factual_matrix}`;
    } else if (activeTab === 'framed_issues') {
      textToCopy = `FRAMED ISSUES - ${metadata.case_name}:\n${summary.framed_issues.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}`;
    } else if (activeTab === 'arguments') {
      textToCopy = `ARGUMENTS - ${metadata.case_name}:\n[Appellant / Petitioner]\n${summary.appellant_arguments}\n\n[Respondent / State]\n${summary.respondent_arguments}`;
    } else if (activeTab === 'ratio_verdict') {
      textToCopy = `RATIO DECIDENDI & FINAL VERDICT - ${metadata.case_name}:\n\nRATIO:\n${summary.ratio_decidendi}\n\nFINAL VERDICT:\n${summary.final_verdict}`;
    } else if (activeTab === 'precedents') {
      textToCopy = `KEY PRECEDENTS CITED - ${metadata.case_name}:\n${precedents.map((p) => `${p.case_title} (${p.citation}) - ${p.context}`).join('\n')}`;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
      
      {/* Top Metadata Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-900 border-b border-neutral-800 space-y-3.5">
        
        {/* Case Title & Court */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                SC Landmark Precedent
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {metadata.citation_number}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-100 font-heading tracking-tight leading-snug truncate">
              {metadata.case_name}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCopyTabContent}
            title="Copy Active Tab Content"
            className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[11px]">Export Tab</span>
              </>
            )}
          </button>
        </div>

        {/* Metadata Details Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
            <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-500 block uppercase font-mono">Court</span>
              <span className="text-neutral-200 truncate font-medium block">{metadata.court}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
            <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-500 block uppercase font-mono">Judgment Date</span>
              <span className="text-neutral-200 truncate font-medium block">{metadata.judgment_date}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
            <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-500 block uppercase font-mono">Bench</span>
              <span className="text-neutral-200 truncate font-medium block">{metadata.bench}</span>
            </div>
          </div>

        </div>

        {/* Acts & Sections Pills (Click-to-Copy) */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
            <span>Cited Acts & Constitutional Articles:</span>
            <span className="text-[10px] text-neutral-500 italic">Click statute to copy</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {metadata.acts_and_sections.map((act, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCopyBadge(act)}
                className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-amber-300 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-sm"
              >
                <span>{act}</span>
                {copiedBadge === act ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-neutral-500 group-hover:text-amber-400" />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4 Interactive Primary Tabs */}
      <div className="flex items-center border-b border-neutral-800 bg-neutral-950 px-2 overflow-x-auto select-none">
        
        <button
          type="button"
          onClick={() => setActiveTab('factual_matrix')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'factual_matrix'
              ? 'border-amber-400 text-amber-300 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Factual Matrix</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('framed_issues')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'framed_issues'
              ? 'border-amber-400 text-amber-300 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Framed Issues</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-800 text-neutral-300">
            {summary.framed_issues.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('arguments')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'arguments'
              ? 'border-amber-400 text-amber-300 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>Arguments</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ratio_verdict')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'ratio_verdict'
              ? 'border-amber-400 text-amber-300 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Ratio & Verdict</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('precedents')}
          className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'precedents'
              ? 'border-amber-400 text-amber-300 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span>Precedents Cited</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-800 text-neutral-300">
            {precedents.length}
          </span>
        </button>

      </div>

      {/* Active Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-900/60 space-y-6">
        
        {/* TAB 1: FACTUAL MATRIX */}
        {activeTab === 'factual_matrix' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Overview Box */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-mono">
                Executive Synthesis of Facts
              </h3>
              <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                {summary.factual_matrix}
              </p>
            </div>

            {/* Key Factual Points with Jump to Source */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                Essential Factual Matrix & Chronology
              </h4>
              <div className="space-y-2.5">
                {summary.factual_matrix_points.map((point) => (
                  <div
                    key={point.id}
                    className="group p-3.5 rounded-xl bg-neutral-950/80 hover:bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-all flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                        {point.text}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onJumpToPara(point.para_ref)}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-neutral-800 group-hover:bg-amber-500/20 text-neutral-300 group-hover:text-amber-300 border border-neutral-700 group-hover:border-amber-500/40 transition-colors cursor-pointer"
                      title={`Highlight Paragraph ${point.para_ref} in Left Panel`}
                    >
                      <span>Jump to Source</span>
                      <span className="text-amber-400 font-bold">[Para {point.para_ref}]</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: FRAMED ISSUES */}
        {activeTab === 'framed_issues' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 leading-relaxed">
              ⚖️ The Court framed the following constitutional questions of law to determine the scope of fundamental rights versus legislative power.
            </div>

            <div className="space-y-3">
              {summary.framed_issues_detailed.map((item, index) => (
                <div
                  key={item.id}
                  className="group p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/40 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
                        Issue #{index + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/50 text-sky-300 border border-sky-800/50">
                        {item.statute}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onJumpToPara(item.para_ref)}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-neutral-800 group-hover:bg-amber-500/20 text-neutral-300 group-hover:text-amber-300 border border-neutral-700 group-hover:border-amber-500/40 transition-colors cursor-pointer"
                    >
                      <span>Jump to Source</span>
                      <span className="text-amber-400 font-bold">[Para {item.para_ref}]</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans font-medium">
                    {item.issue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ARGUMENTS (Appellant vs Respondent) */}
        {activeTab === 'arguments' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Toggle Switch */}
            <div className="flex items-center p-1 bg-neutral-950 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setArgumentSide('appellant')}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  argumentSide === 'appellant'
                    ? 'bg-purple-950/70 text-purple-200 border border-purple-800/60 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Appellant / Petitioner Arguments
              </button>
              <button
                type="button"
                onClick={() => setArgumentSide('respondent')}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  argumentSide === 'respondent'
                    ? 'bg-rose-950/70 text-rose-200 border border-rose-800/60 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Respondent / State Arguments
              </button>
            </div>

            {/* Content for Selected Side */}
            {argumentSide === 'appellant' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 leading-relaxed">
                  <span className="font-semibold text-purple-300 block mb-1.5 font-mono text-[11px] uppercase">
                    Petitioner Case Summary
                  </span>
                  {summary.appellant_arguments}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                    Submissions by Senior Counsels
                  </h4>
                  {summary.appellant_arguments_points.map((arg) => (
                    <div
                      key={arg.id}
                      className="group p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 hover:border-purple-500/40 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-purple-300 font-mono">
                          {arg.counsel}
                        </span>
                        <button
                          type="button"
                          onClick={() => onJumpToPara(arg.para_ref)}
                          className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-neutral-800 group-hover:bg-purple-500/20 text-neutral-300 group-hover:text-purple-300 border border-neutral-700 group-hover:border-purple-500/40 transition-colors cursor-pointer"
                        >
                          <span>Jump to Source</span>
                          <span className="text-purple-400 font-bold">[Para {arg.para_ref}]</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                        "{arg.argument}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 leading-relaxed">
                  <span className="font-semibold text-rose-300 block mb-1.5 font-mono text-[11px] uppercase">
                    Respondent / Union of India Case Summary
                  </span>
                  {summary.respondent_arguments}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                    Submissions on Behalf of State & Intervenors
                  </h4>
                  {summary.respondent_arguments_points.map((arg) => (
                    <div
                      key={arg.id}
                      className="group p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 hover:border-rose-500/40 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-rose-300 font-mono">
                          {arg.counsel}
                        </span>
                        <button
                          type="button"
                          onClick={() => onJumpToPara(arg.para_ref)}
                          className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-neutral-800 group-hover:bg-rose-500/20 text-neutral-300 group-hover:text-rose-300 border border-neutral-700 group-hover:border-rose-500/40 transition-colors cursor-pointer"
                        >
                          <span>Jump to Source</span>
                          <span className="text-rose-400 font-bold">[Para {arg.para_ref}]</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                        "{arg.argument}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 4: RATIO & VERDICT */}
        {activeTab === 'ratio_verdict' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Ratio Decidendi Box */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/30 via-neutral-950 to-neutral-950 border border-amber-500/40 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Ratio Decidendi (Binding Legal Principle)</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed font-serif">
                {summary.ratio_decidendi}
              </p>

              <div className="pt-2 border-t border-neutral-800/80 space-y-2.5">
                {summary.ratio_points.map((rp) => (
                  <div
                    key={rp.id}
                    className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-1 shrink-0" />
                      <p className="text-xs text-neutral-200 leading-relaxed">
                        {rp.principle}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onJumpToPara(rp.para_ref)}
                      className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 hover:bg-amber-500/20 text-amber-400 border border-neutral-700 transition-colors cursor-pointer"
                    >
                      [Para {rp.para_ref}]
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Verdict Box */}
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>Operative Holding & Final Order</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                {summary.final_verdict}
              </p>

              <div className="space-y-2 pt-2">
                {summary.final_verdict_points.map((fvp) => (
                  <div
                    key={fvp.id}
                    className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 flex items-start justify-between gap-3"
                  >
                    <p className="text-xs text-neutral-300 font-medium">
                      ⚖️ {fvp.order}
                    </p>
                    <button
                      type="button"
                      onClick={() => onJumpToPara(fvp.para_ref)}
                      className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-300 hover:text-emerald-400 border border-neutral-700 transition-colors cursor-pointer"
                    >
                      [Para {fvp.para_ref}]
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: KEY PRECEDENTS CITED */}
        {activeTab === 'precedents' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-800/30 text-xs text-sky-200/90 leading-relaxed">
              📚 Key precedents evaluated, affirmed, distinguished, or overruled in this judgment per the Backend RAG schema.
            </div>

            <div className="grid grid-cols-1 gap-3">
              {precedents.map((prec, idx) => (
                <div
                  key={idx}
                  className="group p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-sky-500/40 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-100 font-heading">
                        {prec.case_title}
                      </h4>
                      <span className="font-mono text-xs text-sky-400">
                        {prec.citation} {prec.year && `• ${prec.year}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onJumpToPara(prec.para_ref)}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-neutral-800 group-hover:bg-sky-500/20 text-neutral-300 group-hover:text-sky-300 border border-neutral-700 group-hover:border-sky-500/40 transition-colors cursor-pointer"
                    >
                      <span>Referenced in</span>
                      <span className="text-sky-400 font-bold">[Para {prec.para_ref}]</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans pt-1 border-t border-neutral-800/60">
                    <strong className="text-neutral-400 font-mono text-[11px] uppercase">Significance: </strong>
                    {prec.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
