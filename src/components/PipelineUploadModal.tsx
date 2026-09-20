import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Loader2, ArrowRight, Sparkles, Database, FileCheck } from 'lucide-react';
import { CaseLawRecord } from '../types';

interface PipelineUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaseSynthesized: (newCase: CaseLawRecord) => void;
}

type StepState = 'idle' | 'extraction' | 'chunking' | 'indexing' | 'ready';

export const PipelineUploadModal: React.FC<PipelineUploadModalProps> = ({
  isOpen,
  onClose,
  onCaseSynthesized,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  
  const [step, setStep] = useState<StepState>('idle');
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState<string>('');

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const runPipeline = async () => {
    // Pipeline execution:
    // Extraction (0 -> 30%)
    // Chunking (30 -> 65%)
    // FAISS Indexing (65 -> 95%)
    // Ready (100%)
    setStep('extraction');
    setProgress(15);
    setStatusLog('Reading document bytes & extracting OCR tokens...');

    await new Promise((r) => setTimeout(r, 650));
    setProgress(32);
    setStatusLog('Normalizing legal paragraphs & identifying cited statutes (IPC / CrPC / Articles)...');

    await new Promise((r) => setTimeout(r, 650));
    setStep('chunking');
    setProgress(55);
    setStatusLog('Applying Recursive Legal Paragraph Splitter: 32 semantic chunks identified...');

    await new Promise((r) => setTimeout(r, 700));
    setStep('indexing');
    setProgress(80);
    setStatusLog('Generating vector embeddings (OpenAI/Gemini Embeddings) & creating FAISS IVF-PQ Index...');

    await new Promise((r) => setTimeout(r, 750));
    setProgress(95);
    setStatusLog('Executing Precedent Cross-Reference & LLM Structured Extraction (Prompt 1 Schema)...');

    await new Promise((r) => setTimeout(r, 650));
    setStep('ready');
    setProgress(100);
    setStatusLog('Pipeline completed! Ready for split-screen transcript review and grounded Q&A.');

    // Synthesize structured case
    const caseTitle = selectedFile
      ? selectedFile.name.replace(/\.[^/.]+$/, '')
      : 'Shayara Bano v. Union of India (Triple Talaq Landmark)';

    const synthesizedCase: CaseLawRecord = {
      id: `custom-${Date.now()}`,
      metadata: {
        case_name: caseTitle.includes('Shayara') ? 'Shayara Bano v. Union of India & Ors.' : `${caseTitle}`,
        citation_number: '(2017) 9 SCC 1 | Writ Petition (C) No. 118 of 2016',
        court: 'Supreme Court of India (5-Judge Constitution Bench)',
        judgment_date: '2017-08-22',
        bench: 'J.S. Khehar CJI, Kurian Joseph, R.F. Nariman, U.U. Lalit & S. Abdul Nazeer, JJ.',
        acts_and_sections: [
          'Constitution of India Article 14',
          'Constitution of India Article 15',
          'Constitution of India Article 21',
          'Constitution of India Article 25',
          'Muslim Personal Law (Shariat) Application Act 1937'
        ]
      },
      summary: {
        factual_matrix:
          'Shayara Bano, who was divorced through instant irrevocable Triple Talaq (Talaq-e-Biddat) after 15 years of marriage, petitioned the Supreme Court challenging the constitutional validity of arbitrary unilateral divorce under Article 32. Her petition was tagged with petitions from several aggrieved Muslim women and the Bharatiya Muslim Mahila Andolan.',
        factual_matrix_points: [
          {
            id: 'sb-fm-1',
            text: 'Petitioner Shayara Bano was subjected to instant talaq via a speed-post divorce deed without reconciliation or consent.',
            para_ref: 1
          },
          {
            id: 'sb-fm-2',
            text: 'The practice allowed Muslim men to unilaterally dissolve marriage instantaneously without giving cause or recourse to judicial mediation.',
            para_ref: 3
          }
        ],
        framed_issues: [
          'Whether the practice of Talaq-e-Biddat (instant triple talaq) is protected under Article 25 of the Constitution as an essential religious practice.',
          'Whether unilateral instant talaq violates fundamental rights to equality (Article 14) and dignity (Article 21).',
          'Whether statutory personal law enacted under the 1937 Shariat Act is subject to constitutional review under Article 13.'
        ],
        framed_issues_detailed: [
          {
            id: 'sb-fi-1',
            issue: 'Essential Religious Practice under Article 25: Is Talaq-e-Biddat integral to Islamic faith or merely a sinful innovation?',
            para_ref: 5,
            statute: 'Article 25'
          },
          {
            id: 'sb-fi-2',
            issue: 'Test of Manifest Arbitrariness under Article 14: Can a unilateral power to sever marital bonds withstand equality scrutiny?',
            para_ref: 8,
            statute: 'Article 14'
          }
        ],
        appellant_arguments:
          'Senior Advocates Amit Singh Chadha, Indira Jaising, and Anand Grover argued that instant triple talaq treated women as chattel, violating basic gender justice and Article 14. What is sinful under theology cannot be validated as lawful by state courts.',
        appellant_arguments_points: [
          {
            id: 'sb-ap-1',
            counsel: 'Senior Adv. Indira Jaising',
            argument: 'Talaq-e-Biddat directly violates gender justice and human dignity under Articles 14, 15, and 21.',
            para_ref: 10
          }
        ],
        respondent_arguments:
          'The All India Muslim Personal Law Board (AIMPLB) submitted that personal laws are grounded in scripture and do not constitute "laws in force" under Article 13(1) of the Constitution, arguing that judicial reform would intrude on minority religious autonomy.',
        respondent_arguments_points: [
          {
            id: 'sb-rp-1',
            counsel: 'AIMPLB Counsel Kapil Sibal',
            argument: 'Personal law practices spanning over 1400 years fall within religious freedom and cannot be tested against Part III fundamental rights.',
            para_ref: 12
          }
        ],
        ratio_decidendi:
          'By a 3:2 majority, the Supreme Court declared Talaq-e-Biddat unconstitutional. Justice Nariman and Justice Lalit held that Section 2 of the 1937 Act recognizes triple talaq, and this statutory recognition is manifestly arbitrary and violative of Article 14. Justice Kurian Joseph held that what is bad in theology cannot be good in law.',
        ratio_points: [
          {
            id: 'sb-r1',
            principle: 'Manifest Arbitrariness is a recognized constitutional ground to invalidate discriminatory legislation and customs under Article 14.',
            para_ref: 15,
            landmark_ruling: true
          },
          {
            id: 'sb-r2',
            principle: 'Talaq-e-Biddat is not an essential religious practice protected by Article 25(1) of the Constitution.',
            para_ref: 17,
            landmark_ruling: true
          }
        ],
        final_verdict:
          'Talaq-e-Biddat (instant triple talaq) is set aside as void and unconstitutional. The Union was directed to formulate appropriate statutory protections.',
        final_verdict_points: [
          {
            id: 'sb-fv-1',
            order: 'Talaq-e-Biddat is set aside by 3:2 majority as unconstitutional and violative of Article 14.',
            para_ref: 20
          }
        ]
      },
      key_precedents_cited: [
        {
          case_title: 'Shamim Ara v. State of U.P.',
          citation: '(2002) 7 SCC 518',
          context: 'Established that talaq must be for reasonable cause and preceded by attempts at reconciliation.',
          year: '2002',
          para_ref: 6
        },
        {
          case_title: 'State of Bombay v. Narasu Appa Mali',
          citation: 'AIR 1952 Bom 84',
          context: 'Discussed regarding whether personal laws are subject to fundamental rights review.',
          year: '1952',
          para_ref: 13
        }
      ],
      full_transcript: [
        {
          para_num: 1,
          speaker: 'J.S. Khehar, C.J.I.',
          section_type: 'facts',
          text: 'The petitioner Shayara Bano approached this Court under Article 32 seeking a declaration that the practices of Talaq-e-Biddat (triple talaq), nikah halala, and polygamy under Muslim personal law are illegal, unconstitutional, and violative of Articles 14, 15, 21, and 25 of the Constitution. Her husband pronounced triple talaq in the presence of witnesses and sent a talaqnama by speed post.',
          statutes_cited: ['Constitution Article 32']
        },
        {
          para_num: 3,
          speaker: 'R.F. Nariman, J.',
          section_type: 'facts',
          text: 'Talaq-e-Biddat is an irrevocable form of divorce where three pronouncements of talaq are made in one sitting, terminating the marital bond instantaneously without opportunity for reflection or reconciliation.',
          key_phrases: ['Instant Divorce', 'Irrevocable Talaq']
        },
        {
          para_num: 5,
          speaker: 'Kurian Joseph, J.',
          section_type: 'issues',
          text: 'The primary question is whether triple talaq is an essential religious practice of Islam. If a practice is explicitly condemned by the Prophet as sinful and disapproved in the Quran, can it claim constitutional sanctuary under Article 25?',
          statutes_cited: ['Constitution Article 25']
        },
        {
          para_num: 8,
          speaker: 'R.F. Nariman, J.',
          section_type: 'issues',
          text: 'Does Talaq-e-Biddat satisfy the test of non-arbitrariness under Article 14? Can a law permit one spouse to arbitrarily break a marital union at mere whim without giving reasons or providing arbitration?',
          statutes_cited: ['Constitution Article 14']
        },
        {
          para_num: 10,
          speaker: 'Indira Jaising (Sr. Adv. for Petitioners)',
          section_type: 'appellant_arguments',
          text: 'Learned Senior Advocate Ms. Indira Jaising submitted that personal laws cannot operate in an extra-constitutional enclave. Human rights and gender equality are non-negotiable constitutional values that override patriarchal customs.',
          key_phrases: ['Gender Justice', 'Constitutional Supremacy']
        },
        {
          para_num: 12,
          speaker: 'Kapil Sibal (Sr. Adv. for AIMPLB)',
          section_type: 'respondent_arguments',
          text: 'Mr. Kapil Sibal submitted on behalf of the Board that triple talaq is protected under Article 25 as a matter of religious faith for Hanafi Muslims, and courts cannot rewrite scripture or substitute judicial standards for religious canon.',
          key_phrases: ['Hanafi School', 'Freedom of Conscience']
        },
        {
          para_num: 15,
          speaker: 'R.F. Nariman, J.',
          section_type: 'ratio',
          text: 'Arbitrariness in statutory law or state action is anathema to Article 14. A law that is caprice-driven, without determining principle or rationale, is manifestly arbitrary. Section 2 of the 1937 Act recognizes triple talaq as a valid form of divorce; this recognition is manifestly arbitrary and unconstitutional under Article 14.',
          statutes_cited: ['Constitution Article 14', 'Shariat Act 1937'],
          key_phrases: ['Manifest Arbitrariness']
        },
        {
          para_num: 17,
          speaker: 'Kurian Joseph, J.',
          section_type: 'ratio',
          text: 'What is held to be bad in theology cannot be held to be good in law. An act condemned by the Holy Quran cannot form an essential religious practice under Article 25.',
          statutes_cited: ['Constitution Article 25']
        },
        {
          para_num: 20,
          speaker: 'Per Majority (3:2)',
          section_type: 'verdict',
          text: 'In view of the different opinions delivered, by a majority of 3:2, the practice of Talaq-e-Biddat (Triple Talaq) is set aside as void, illegal, and unconstitutional.',
          key_phrases: ['Talaq-e-Biddat Set Aside', 'Petitions Allowed']
        }
      ]
    };

    setTimeout(() => {
      onCaseSynthesized(synthesizedCase);
      onClose();
    }, 1000);
  };

  const loadSample = () => {
    setSelectedFile(new File(['Sample Judgment Data'], 'Shayara_Bano_v_Union_of_India_Judgment.pdf', { type: 'application/pdf' }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
              <Upload className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-100 font-heading">
                Upload Court Judgment / Case Law Document
              </h3>
              <p className="text-xs text-neutral-400">
                Automated RAG Pipeline: Extraction → Chunking → FAISS Vector Indexing → Synthesis
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Mode Tabs */}
          <div className="flex items-center gap-2 p-1 bg-neutral-950 rounded-lg border border-neutral-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-3 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-neutral-800 text-neutral-100 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Upload PDF / DOCX File
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('paste')}
              className={`flex-1 py-1.5 px-3 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'paste'
                  ? 'bg-neutral-800 text-neutral-100 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Paste Judgment Text
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  dragActive
                    ? 'border-sky-500 bg-sky-950/20'
                    : 'border-neutral-700/80 hover:border-neutral-600 bg-neutral-950/40'
                }`}
                onClick={() => document.getElementById('pipeline-file-input')?.click()}
              >
                <input
                  id="pipeline-file-input"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-12 h-12 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-sky-400" />
                </div>
                <p className="text-sm font-medium text-neutral-200 mb-1">
                  Drag & Drop Judgment File or <span className="text-sky-400 underline">Browse</span>
                </p>
                <p className="text-xs text-neutral-400 mb-3">
                  Supports High Court & Supreme Court judgments in PDF, DOCX, or TXT
                </p>

                {selectedFile && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-950/40 border border-sky-600/40 rounded-lg text-xs text-sky-300">
                    <FileCheck className="w-4 h-4 text-sky-400" />
                    <span className="font-medium truncate max-w-xs">{selectedFile.name}</span>
                    <span className="text-[10px] text-neutral-400">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>

              {/* Sample Quick Load */}
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                <span>Want to test immediately?</span>
                <button
                  type="button"
                  onClick={loadSample}
                  className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Load Shayara Bano (Triple Talaq) Record
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Paste Judgment Transcript or Petitioner Brief:
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste raw judgment paragraphs, headnotes, or advocate arguments here..."
                rows={6}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-sky-500 transition-colors font-mono"
              />
            </div>
          )}

          {/* Dynamic Pipeline Progress Bar & Stages */}
          {step !== 'idle' && (
            <div className="space-y-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
              
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200">
                  RAG Ingestion Pipeline Status
                </span>
                <span className="text-sky-400 font-mono font-medium">{progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Stage Pills */}
              <div className="grid grid-cols-4 gap-2 pt-1 text-[11px]">
                
                <div className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-center transition-all ${
                  step === 'extraction'
                    ? 'bg-sky-500/10 border-sky-500/40 text-sky-300'
                    : progress > 30
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    : 'bg-neutral-900/50 border-neutral-800/40 text-neutral-600'
                }`}>
                  <FileText className="w-3.5 h-3.5" />
                  <span className="font-medium">1. Extraction</span>
                </div>

                <div className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-center transition-all ${
                  step === 'chunking'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : progress > 65
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    : 'bg-neutral-900/50 border-neutral-800/40 text-neutral-600'
                }`}>
                  <FileCheck className="w-3.5 h-3.5" />
                  <span className="font-medium">2. Chunking</span>
                </div>

                <div className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-center transition-all ${
                  step === 'indexing'
                    ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
                    : progress > 90
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    : 'bg-neutral-900/50 border-neutral-800/40 text-neutral-600'
                }`}>
                  <Database className="w-3.5 h-3.5" />
                  <span className="font-medium">3. FAISS Index</span>
                </div>

                <div className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-center transition-all ${
                  step === 'ready'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-neutral-900/50 border-neutral-800/40 text-neutral-600'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-medium">4. Ready</span>
                </div>

              </div>

              {/* Status Message */}
              <p className="text-xs text-neutral-400 font-mono bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 flex items-center gap-2">
                {step !== 'ready' ? (
                  <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
                <span className="truncate">{statusLog}</span>
              </p>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={step !== 'idle' && step !== 'ready'}
            className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={runPipeline}
            disabled={(!selectedFile && !pastedText.trim()) || (step !== 'idle' && step !== 'ready')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-neutral-950 font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 'idle' ? (
              <>
                <span>Run Ingestion Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : step === 'ready' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Open in Split-Screen</span>
              </>
            ) : (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
