export interface CaseMetadata {
  case_name: string;
  citation_number: string;
  court: string;
  judgment_date: string;
  bench: string;
  acts_and_sections: string[];
}

export interface CaseSummary {
  factual_matrix: string;
  factual_matrix_points: { id: string; text: string; para_ref: number }[];
  framed_issues: string[];
  framed_issues_detailed: { id: string; issue: string; para_ref: number; statute: string }[];
  appellant_arguments: string;
  appellant_arguments_points: { id: string; counsel: string; argument: string; para_ref: number }[];
  respondent_arguments: string;
  respondent_arguments_points: { id: string; counsel: string; argument: string; para_ref: number }[];
  ratio_decidendi: string;
  ratio_points: { id: string; principle: string; para_ref: number; landmark_ruling: boolean }[];
  final_verdict: string;
  final_verdict_points: { id: string; order: string; para_ref: number }[];
}

export interface PrecedentCited {
  case_title: string;
  citation: string;
  context: string;
  year?: string;
  para_ref: number;
}

export interface JudgmentParagraph {
  para_num: number;
  speaker?: string;
  section_type: 'header' | 'facts' | 'issues' | 'appellant_arguments' | 'respondent_arguments' | 'analysis' | 'ratio' | 'verdict';
  text: string;
  statutes_cited?: string[];
  key_phrases?: string[];
}

export interface CaseLawRecord {
  id: string;
  metadata: CaseMetadata;
  summary: CaseSummary;
  key_precedents_cited: PrecedentCited[];
  full_transcript: JudgmentParagraph[];
}

export type TabType = 'factual_matrix' | 'framed_issues' | 'arguments' | 'ratio_verdict' | 'precedents';

export type AssistantMode = 'talk_to_case' | 'ai_legal_advisor';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string;
  flagEmoji: string;
}

export interface RiskFlag {
  level: 'high' | 'medium' | 'low';
  clause: string;
  issue: string;
  recommendation: string;
}

export interface KeyObligation {
  party: string;
  obligation: string;
  deadline?: string;
}

export interface ScannedDocumentAnalysis {
  id: string;
  documentType: string;
  originalFileName?: string;
  imagePreviewUrl?: string;
  extractedText: string;
  plainLanguageSummary: string;
  keyObligations: KeyObligation[];
  riskFlags: RiskFlag[];
  jurisdiction: string;
  recommendedNextSteps: string[];
  analyzedAt: string;
  language: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  mode: AssistantMode;
  content: string;
  timestamp: string;
  language?: string;
  detectedLanguage?: string;
  isVoiceInput?: boolean;
  citations?: {
    para_num: number;
    textSnippet: string;
    section?: string;
  }[];
  scannedDocSummary?: {
    docType: string;
    riskCount: number;
  };
  structuredData?: {
    case_classification?: string;
    categorization?: string;
    applicable_statutes?: string[];
    applicableSections?: string[];
    constitutionalRights?: string[];
    action_roadmap?: { step: number; title: string; detail: string }[];
    actionPlan?: string[];
    proceduralSafeguards?: string[];
    evidence_checklist?: string[];
    landmark_precedents?: { title: string; citation: string; principle: string }[];
  };
}

export interface PipelineStage {
  id: 'idle' | 'extraction' | 'chunking' | 'indexing' | 'ready';
  label: string;
  progress: number;
  detail: string;
}

export interface QuickStarterCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  category: string;
  query: string;
  acts: string[];
}
