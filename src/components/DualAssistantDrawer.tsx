import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, Bot, Sparkles, AlertCircle, ShieldAlert, Home, ShoppingBag, 
  Briefcase, CreditCard, ChevronRight, CheckCircle2, BookOpen, Scale, 
  ArrowUpRight, Loader2, RotateCcw, Mic, MicOff, Volume2, VolumeX, 
  Camera, FileText, Globe, Check
} from 'lucide-react';
import { 
  CaseLawRecord, AssistantMode, ChatMessage, QuickStarterCard, 
  SupportedLanguage, ScannedDocumentAnalysis 
} from '../types';
import { QUICK_STARTER_CARDS } from '../data/mockData';
import { getLanguageByCode, getAdvocateWelcomeMessage } from '../data/languages';
import { getOfflineAdvisorResponse } from '../utils/legalAdvisorHelper';
import { getOfflineLexiResponse } from '../utils/lexiAdvisorHelper';

interface DualAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCase: CaseLawRecord;
  mode: AssistantMode;
  onModeChange: (newMode: AssistantMode) => void;
  onJumpToPara: (paraNum: number) => void;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
  attachedDoc: ScannedDocumentAnalysis | null;
  onClearAttachedDoc: () => void;
  onOpenScanner: () => void;
}

export const DualAssistantDrawer: React.FC<DualAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeCase,
  mode,
  onModeChange,
  onJumpToPara,
  selectedLanguage,
  onSelectLanguage,
  attachedDoc,
  onClearAttachedDoc,
  onOpenScanner,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      mode: 'ai_legal_advisor',
      content: `I am your **AI Legal Advocate & Indian Jurisprudence Expert** (विधिक सलाहकार).\n\nI deliver direct, actionable legal strategies grounded in the **Constitution of India**, **Bharatiya Nyaya Sanhita (BNS)**, **Bharatiya Nagarik Suraksha Sanhita (BNSS)**, **Bharatiya Sakshya Adhiniyam (BSA)**, and civil/consumer statutes. I understand and speak in **English**, **हिन्दी (Hindi)**, or **Bilingual/Hinglish** (e.g., *"mera account freeze ho gaya"*, *"police FIR nahi likh rahi"*). Ask your query below.`,
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micLang, setMicLang] = useState<'auto' | 'hi' | 'en'>('auto');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeakingMsgId, setCurrentlySpeakingMsgId] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isListening]);

  // Load available speech synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          setAvailableVoices(v);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      return () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Clean up speech synthesis on close or unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, []);

  // Update welcome message when mode toggles or language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].id.startsWith('init-')) {
      if (mode === 'talk_to_case') {
        setMessages([
          {
            id: 'init-case',
            sender: 'assistant',
            mode: 'talk_to_case',
            content: `You are examining **${activeCase.metadata.case_name}** (${activeCase.metadata.citation_number}).\n\nI explain this judgment in **plain, simple language (सरल भाषा) that anyone can easily understand** — with exact paragraph citations from the court transcript. Ask any question in English, हिन्दी, or Hinglish!`,
            timestamp: 'Just now',
          }
        ]);
      } else {
        const welcome = getAdvocateWelcomeMessage(selectedLanguage.code);
        setMessages([
          {
            id: 'init-advocate',
            sender: 'assistant',
            mode: 'ai_legal_advisor',
            content: welcome,
            timestamp: 'Just now',
          }
        ]);
      }
    }
  }, [mode, activeCase.metadata.case_name, selectedLanguage.code]);

  // Stop speaking when drawer closes or language changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentlySpeakingMsgId(null);
    }
  }, [isOpen, selectedLanguage.code]);

  // Voice output function (TTS) with language and script detection
  const speakText = (text: string, langCode?: string, msgId?: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    // If currently speaking this message, toggle stop
    if (isSpeaking && currentlySpeakingMsgId && msgId === currentlySpeakingMsgId) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();

    // Strip markdown symbols for natural speech
    const cleanText = text
      .replace(/[*_#`~[\]]/g, '')
      .replace(/\[Para \d+\]/g, '')
      .replace(/###\s+/g, '')
      .replace(/---\s*/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Resolve speech language code
    let targetLang = langCode || selectedLanguage.speechCode;
    if (!targetLang || targetLang === 'en-US' || selectedLanguage.code === 'auto' || selectedLanguage.code === 'hi-en') {
      if (/[\u0900-\u097F]/.test(cleanText)) targetLang = 'hi-IN';
      else if (/[\u0980-\u09FF]/.test(cleanText)) targetLang = 'bn-IN';
      else if (/[\u0B80-\u0BFF]/.test(cleanText)) targetLang = 'ta-IN';
      else if (/[\u0C00-\u0C7F]/.test(cleanText)) targetLang = 'te-IN';
      else if (/[\u0A80-\u0AFF]/.test(cleanText)) targetLang = 'gu-IN';
      else if (/[\u0D00-\u0D7F]/.test(cleanText)) targetLang = 'ml-IN';
      else if (/[\u0C80-\u0CFF]/.test(cleanText)) targetLang = 'kn-IN';
      else if (/[\u0A00-\u0A7F]/.test(cleanText)) targetLang = 'pa-IN';
      else if (/[\u0600-\u06FF]/.test(cleanText)) targetLang = 'ar-SA';
      else if (/[\u4E00-\u9FFF]/.test(cleanText)) targetLang = 'zh-CN';
      else targetLang = 'en-IN';
    }

    utterance.lang = targetLang;
    utterance.rate = 0.95; // empathetic, measured pace
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    const prefix = targetLang.slice(0, 2).toLowerCase();
    let matchedVoice = voices.find((v) => v.lang.toLowerCase().replace('_', '-') === targetLang.toLowerCase());
    if (!matchedVoice) {
      matchedVoice = voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
    }
    if (!matchedVoice && (targetLang === 'en-IN' || targetLang === 'hi-IN')) {
      matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
    }
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (msgId) setCurrentlySpeakingMsgId(msgId);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingMsgId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentlySpeakingMsgId(null);
    }
  };

  // Real-Time Speech Recognition (Multilingual Voice Interaction)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceNotice('Speech recognition is not supported in this browser. Please use text input or Chrome/Edge.');
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      // Select speech recognition language (handles Hindi, English, and Hinglish)
      let speechCode = 'hi-IN';
      let speechLabel = 'हिन्दी / English';

      if (micLang === 'en' || selectedLanguage.code === 'en') {
        speechCode = 'en-IN';
        speechLabel = 'English';
      } else if (micLang === 'hi' || selectedLanguage.code === 'hi') {
        speechCode = 'hi-IN';
        speechLabel = 'हिन्दी (Hindi)';
      } else {
        speechCode = 'hi-IN';
        speechLabel = 'English / हिन्दी Auto';
      }

      recognition.lang = speechCode;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(`Listening (${speechLabel})... Speak in English or हिन्दी.`);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceNotice(event.error === 'not-allowed' ? 'Microphone permission denied.' : 'Voice recognition ended.');
        setTimeout(() => setVoiceNotice(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNotice(null);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech start error:', err);
      setIsListening(false);
    }
  };

  // Suggested questions for Talk-to-Case mode in simple, clear language
  const suggestedQuestions = [
    '📌 What did the Supreme Court decide in simple words?',
    '⚖️ Why did the court say this violates Equality (Article 14)?',
    '🏛️ What did the Government and opponents argue in court?',
    '💡 What does this ruling mean for everyday citizens?',
  ];

  const handleSend = async (queryText?: string, isVoice: boolean = false) => {
    const query = queryText || inputQuery;
    if (!query.trim() || loading) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      setIsListening(false);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      mode: mode,
      content: query.trim(),
      language: selectedLanguage.name,
      isVoiceInput: isVoice,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      if (mode === 'talk_to_case') {
        // Mode 1: Grounded Talk-to-Case RAG
        const context_chunks = activeCase.full_transcript
          .map((p) => `[Para ${p.para_num}] ${p.speaker ? `(${p.speaker})` : ''}: ${p.text}`)
          .join('\n\n');

        let replyText = '';
        let citations: { para_num: number; textSnippet: string }[] = [];

        try {
          const res = await fetch('/api/chat-case', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_query: query,
              case_name: activeCase.metadata.case_name,
              context_chunks,
            }),
          });
          const data = await res.json();
          if (data && data.reply && !data.fallback) {
            replyText = data.reply;
          }
        } catch (e) {
          console.warn('Backend call fallback:', e);
        }

        if (!replyText) {
          const qLower = query.toLowerCase();
          if (qLower.includes('article 14') || qLower.includes('equality') || qLower.includes('arbitrar')) {
            replyText = `### 📌 In Plain Words (सरल शब्दों में):
The Supreme Court ruled that criminalizing consensual adult relationships in private is completely unfair and arbitrary. Everyone has the right to be treated equally under **Article 14** of the Constitution.

---

### ⚖️ What the Court Decided:
- **Unfair Discrimination:** Under **[Para 8]** and **[Para 31]**, the judges held that Section 377 IPC arbitrarily targeted citizens without any sensible or legitimate reason.
- **Equal Treatment:** As explained in **[Para 32]**, discriminating against people on the basis of sexual orientation is unconstitutional sex discrimination under **Article 15(1)**.

---

### 💡 What This Means:
Consensual private actions between adults can never be treated as a crime.`;
            citations = [
              { para_num: 8, textSnippet: 'First primary issue on Article 14 hostile classification' },
              { para_num: 31, textSnippet: 'Manifest arbitrariness doctrine under Article 14' },
              { para_num: 32, textSnippet: 'Sex discrimination includes sexual orientation' },
            ];
          } else if (qLower.includes('morality') || qLower.includes('state') || qLower.includes('public health')) {
            replyText = `### 📌 In Plain Words (सरल शब्दों में):
Opponents argued that traditional society customs should decide what is allowed. But the Supreme Court clearly held that the Constitution's principles of human freedom and dignity always defeat public prejudice.

---

### ⚖️ What Happened in Court:
- **Government Stance:** In **[Para 24]**, the Central Government did not oppose decriminalizing consensual adult acts in private.
- **Constitutional Morality:** In **[Para 15]** and **[Para 30]**, the Chief Justice emphasized that **Constitutional Morality** (protecting every person's individual rights) must always prevail over majority social morality.`;
            citations = [
              { para_num: 24, textSnippet: 'Union of India affidavit leaving validity to Court' },
              { para_num: 26, textSnippet: 'Intervenor submissions on societal morality' },
              { para_num: 30, textSnippet: 'Constitutional Morality prevailing over Social Morality' },
            ];
          } else {
            replyText = `### 📌 In Plain Words (सरल शब्दों में):
In this landmark ruling (**${activeCase.metadata.case_name}**), the Supreme Court affirmed that every Indian citizen has the fundamental right to personal freedom, equality, and privacy.

---

### ⚖️ Key Findings:
- **Privacy & Dignity:** In **[Para 1]** through **[Para 38]**, the Court held that who you love and your personal identity are protected under **Article 21** (Right to Life and Personal Liberty).
- **Clear Limits on State Power:** The police and government cannot intrude into the private, consensual lives of adult citizens.`;
            citations = [
              { para_num: 1, textSnippet: 'Origin and statutory definition' },
              { para_num: 34, textSnippet: 'Right to privacy and personal autonomy under Article 21' },
            ];
          }
        }

        const assistantMessage: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          mode: 'talk_to_case',
          content: replyText,
          citations,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, assistantMessage]);

      } else {
        // Mode 2: AI Legal Advocate & Indian Jurisprudence Expert
        let replyText = '';
        let detectedLang = selectedLanguage.name;
        let structuredResult: any = null;

        const docContextStr = attachedDoc
          ? `Document Type: ${attachedDoc.documentType}\nSummary: ${attachedDoc.plainLanguageSummary}\nRisk Flags: ${attachedDoc.riskFlags.map((r) => `[${r.level}] ${r.clause} - ${r.issue}`).join('; ')}`
          : undefined;

        try {
          // Attempt dedicated advocate-chat endpoint
          const res = await fetch('/api/advocate-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query,
              preferredLanguage: selectedLanguage.code,
              documentContext: docContextStr,
              caseContext: activeCase.metadata.case_name,
            }),
          });
          const data = await res.json();
          if (data && data.result && !data.fallback) {
            const r = data.result;
            if (r.reply && r.directAnswer && !r.reply.includes(r.directAnswer)) {
              replyText = `### ${r.directAnswer}\n\n${r.reply}`;
            } else {
              replyText = r.reply || r.directAnswer || '';
            }
            detectedLang = r.detectedLanguage || selectedLanguage.name;
            structuredResult = {
              case_classification: r.categorization || 'Indian Legal & Constitutional Advisory',
              categorization: r.categorization,
              applicableSections: r.applicableSections || r.legalPoints || [],
              applicable_statutes: r.applicableSections || r.legalPoints || [],
              constitutionalRights: r.constitutionalRights || [],
              actionPlan: r.actionPlan || r.actionSteps || [],
              proceduralSafeguards: r.proceduralSafeguards || [],
              action_roadmap: (r.actionPlan || r.actionSteps || []).map((step: string, idx: number) => ({
                step: idx + 1,
                title: `Action Step ${idx + 1}`,
                detail: step,
              })),
              evidence_checklist: ['Preserve digital records with metadata (BSA Sec 63)', 'Keep registered postal slips & acknowledgment cards', 'Detailed chronological log of communications'],
              landmark_precedents: [],
            };
          }
        } catch (e) {
          console.warn('Advocate backend call fallback:', e);
        }

        if (!replyText) {
          const fallback = getOfflineLexiResponse(query, selectedLanguage.code, docContextStr);
          if (fallback.reply && fallback.directAnswer && !fallback.reply.includes(fallback.directAnswer)) {
            replyText = `### ${fallback.directAnswer}\n\n${fallback.reply}`;
          } else {
            replyText = fallback.reply || fallback.directAnswer || '';
          }
          detectedLang = fallback.detectedLanguage;
          structuredResult = {
            case_classification: fallback.categorization || `Legal Advisory (${detectedLang})`,
            categorization: fallback.categorization,
            applicableSections: fallback.applicableSections || fallback.legalPoints,
            applicable_statutes: fallback.applicableSections || fallback.legalPoints,
            constitutionalRights: fallback.constitutionalRights || [],
            actionPlan: fallback.actionPlan || fallback.actionSteps,
            proceduralSafeguards: fallback.proceduralSafeguards || [],
            action_roadmap: (fallback.actionPlan || fallback.actionSteps).map((step, idx) => ({
              step: idx + 1,
              title: `Action Step ${idx + 1}`,
              detail: step,
            })),
            evidence_checklist: ['Written contracts or registered notices', 'Bank transaction statements / UTR references', 'Postal speed-post tracking receipts'],
            landmark_precedents: [],
          };
        }

        const assistantMessage: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          mode: 'ai_legal_advisor',
          content: replyText,
          detectedLanguage: detectedLang,
          structuredData: structuredResult,
          scannedDocSummary: attachedDoc ? {
            docType: attachedDoc.documentType,
            riskCount: attachedDoc.riskFlags.length,
          } : undefined,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Speak Advocate's response with natural cadence
        speakText(replyText, selectedLanguage.speechCode, assistantMessage.id);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStarterCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'Home':
        return <Home className="w-4 h-4 text-amber-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-sky-400" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4 text-purple-400" />;
      default:
        return <Scale className="w-4 h-4 text-amber-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[480px] lg:w-[560px] bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Drawer Header & Mode Switcher */}
      <div className="p-4 bg-neutral-950 border-b border-neutral-800 space-y-3 shrink-0">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              mode === 'ai_legal_advisor'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-sky-500/20 border-sky-500/40 text-sky-300'
            }`}>
              {mode === 'ai_legal_advisor' ? <Scale className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-neutral-100 font-heading">
                  {mode === 'ai_legal_advisor' ? 'AI Legal Advocate' : 'Talk to Case Assistant'}
                </h3>
                {mode === 'ai_legal_advisor' && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    BNS • BNSS • BSA
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 truncate max-w-[280px]">
                {mode === 'ai_legal_advisor'
                  ? `Indian Legal Framework & Constitutional Rights • ${selectedLanguage.name}`
                  : `Strictly Grounded on: ${activeCase.metadata.case_name}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Audio Speech Toggle */}
            {mode === 'ai_legal_advisor' && (
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setVoiceEnabled(!voiceEnabled);
                }}
                title={voiceEnabled ? 'Mute voice audio output' : 'Unmute voice audio output'}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  voiceEnabled
                    ? 'text-amber-400 hover:bg-neutral-800'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                setMessages([]);
              }}
              title="Clear conversation"
              className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dual Mode Switcher Pill */}
        <div className="flex items-center p-1 bg-neutral-900 rounded-xl border border-neutral-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onModeChange('talk_to_case')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'talk_to_case'
                ? 'bg-sky-950 text-sky-300 border border-sky-800/60 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Talk to Case</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('ai_legal_advisor')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'ai_legal_advisor'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold border border-amber-400 shadow'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>AI Legal Advocate</span>
          </button>
        </div>

        {/* Simple Plain Language Guarantee Banner */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-[11px] text-neutral-300">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium text-neutral-200">
              {mode === 'talk_to_case' 
                ? 'Plain Language Case Analysis / सरल भाषा विश्लेषण' 
                : 'Clear Citizen Advice / आसान कानूनी सलाह'}
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Simple & Clear • सरल शब्द
          </span>
        </div>

        {/* Live Speaking Indicator */}
        {isSpeaking && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs animate-pulse">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>AI Advocate is reading your legal advice...</span>
            </div>
            <button
              type="button"
              onClick={stopSpeaking}
              className="text-[10px] font-mono px-2 py-0.5 bg-neutral-950 rounded text-neutral-300 hover:text-white border border-neutral-800"
            >
              Stop Audio
            </button>
          </div>
        )}

      </div>

      {/* Message Thread Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950/70">
        
        {/* Quick Starter Cards (Shown when in AI Legal Advocate Mode) */}
        {mode === 'ai_legal_advisor' && messages.length <= 1 && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
              <span>Common Legal & Constitutional Scenarios:</span>
              <span className="text-[10px] text-amber-400">Click to evaluate</span>
            </div>

            {/* Quick Bilingual Starter Pills */}
            <div className="flex flex-wrap gap-1.5 pb-1">
              <button
                type="button"
                onClick={() => handleSend('बैंक खाते से ऑनलाइन धोखाधड़ी में पैसे कट गए, क्या कानूनी कदम उठाऊं?')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors text-left cursor-pointer"
              >
                🇮🇳 साइबर फ्रॉड: बैंक से पैसे कट गए (1930)
              </button>
              <button
                type="button"
                onClick={() => handleSend('पुलिस ने मेरी एफआईआर दर्ज करने से मना कर दिया है, मेरे क्या अधिकार हैं?')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-colors text-left cursor-pointer"
              >
                🇮🇳 पुलिस FIR मना कर रही है (Zero FIR BNSS 173)
              </button>
              <button
                type="button"
                onClick={() => handleSend('How to defend against unauthorized bank account freeze and cyber lien?')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors text-left cursor-pointer"
              >
                🇬🇧 Bank Account Lien & Cyber Freeze Remedy
              </button>
              <button
                type="button"
                onClick={() => handleSend('What is the legal procedure and 15-day statutory notice for cheque bounce under Section 138?')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors text-left cursor-pointer"
              >
                🇬🇧 Sec 138 NI Act Cheque Bounce Notice
              </button>
            </div>

            <div className="space-y-2">
              {QUICK_STARTER_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleSend(card.query)}
                  className="w-full text-left p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-sm flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 shrink-0 mt-0.5">
                    {getStarterCardIcon(card.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-amber-300 transition-colors truncate">
                        {card.title}
                      </h4>
                      <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                        {card.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {card.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {card.acts.slice(0, 2).map((act, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 shrink-0 self-center" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Questions (Shown when in Talk-to-Case Mode) */}
        {mode === 'talk_to_case' && messages.length <= 1 && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            <span className="text-xs text-neutral-400 font-medium block">
              Suggested questions for this judgment:
            </span>
            <div className="space-y-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs text-neutral-300 hover:text-sky-300 transition-colors flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span className="truncate">{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Bubble Thread */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col space-y-1.5 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`p-3.5 rounded-2xl max-w-[92%] text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-none'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none space-y-3'
              }`}
            >
              {/* Voice input indicator badge on user query */}
              {msg.sender === 'user' && msg.isVoiceInput && (
                <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-900 mb-1 opacity-80">
                  <Mic className="w-3 h-3" />
                  <span>Voice Input</span>
                </div>
              )}

              {/* Scanned Document banner on assistant reply */}
              {msg.scannedDocSummary && (
                <div className="p-2 rounded-lg bg-neutral-950 border border-amber-500/30 text-[11px] text-amber-300 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-semibold truncate">Referencing: {msg.scannedDocSummary.docType}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">
                    {msg.scannedDocSummary.riskCount} Risk(s)
                  </span>
                </div>
              )}

              {/* Message Content */}
              <div className="whitespace-pre-wrap font-sans">
                {msg.content}
              </div>

              {/* Speaker Replay Button for Advocate's Response */}
              {msg.sender === 'assistant' && mode === 'ai_legal_advisor' && (
                <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
                  <button
                    type="button"
                    onClick={() => speakText(msg.content, selectedLanguage.speechCode, msg.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      isSpeaking && currentlySpeakingMsgId === msg.id
                        ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm animate-pulse'
                        : 'bg-neutral-950 hover:bg-neutral-800 text-amber-300 border border-neutral-800'
                    }`}
                  >
                    {isSpeaking && currentlySpeakingMsgId === msg.id ? (
                      <>
                        <VolumeX className="w-3 h-3 text-neutral-950" />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>Listen to Advice</span>
                      </>
                    )}
                  </button>

                  {msg.detectedLanguage && (
                    <span className="text-[10px] font-mono text-neutral-500">
                      🌐 {msg.detectedLanguage}
                    </span>
                  )}
                </div>
              )}

              {/* Talk-to-Case Citations Pills */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-neutral-800/80 space-y-1.5">
                  <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider block font-mono">
                    Grounded Transcript References:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.citations.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onJumpToPara(c.para_num)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition-colors cursor-pointer"
                        title={`Jump to [Para ${c.para_num}]: ${c.textSnippet}`}
                      >
                        <ArrowUpRight className="w-3 h-3 text-sky-400" />
                        <span className="font-bold">[Para {c.para_num}]</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode 2: AI Legal Advocate Structured Advice Formatting */}
              {msg.structuredData && (
                <div className="space-y-3 pt-2 text-xs font-sans">
                  
                  {/* Legal Categorization Badge */}
                  {(msg.structuredData.categorization || msg.structuredData.case_classification) && (
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono uppercase tracking-wide">
                        {msg.structuredData.categorization || msg.structuredData.case_classification}
                      </span>
                    </div>
                  )}

                  {/* Applicable Statutes & BNS/BNSS/BSA Sections */}
                  {((msg.structuredData.applicableSections && msg.structuredData.applicableSections.length > 0) ||
                    (msg.structuredData.applicable_statutes && msg.structuredData.applicable_statutes.length > 0)) && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase font-mono block">
                        Applicable Criminal / Civil Statutes & Sections:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(msg.structuredData.applicableSections || msg.structuredData.applicable_statutes || []).map((sec, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950 text-neutral-200 border border-amber-500/30 flex items-center gap-1"
                          >
                            <Scale className="w-3 h-3 text-amber-400 shrink-0" />
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Constitutional Rights (Articles 14, 19, 20, 21, 22, 32, 226) */}
                  {msg.structuredData.constitutionalRights && msg.structuredData.constitutionalRights.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-amber-400 uppercase font-mono block">
                        Constitutional Safeguards & Fundamental Rights:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {msg.structuredData.constitutionalRights.map((right, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/40 text-amber-200 border border-amber-600/40 flex items-center gap-1"
                          >
                            <span>🇮🇳</span>
                            {right}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Procedural Safeguards (Zero FIR, Notice before arrest, electronic certificate) */}
                  {msg.structuredData.proceduralSafeguards && msg.structuredData.proceduralSafeguards.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 space-y-1.5">
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase font-mono block flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Procedural & Police Safeguards:
                      </span>
                      <div className="space-y-1 pl-1">
                        {msg.structuredData.proceduralSafeguards.map((safeguard, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-emerald-200/90 leading-relaxed">
                            <span className="text-emerald-400 shrink-0">•</span>
                            <span>{safeguard}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct Action Plan / Roadmap */}
                  {((msg.structuredData.actionPlan && msg.structuredData.actionPlan.length > 0) ||
                    (msg.structuredData.action_roadmap && msg.structuredData.action_roadmap.length > 0)) && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase font-mono block">
                        Actionable Legal Strategy Roadmap:
                      </span>
                      <div className="space-y-1.5">
                        {(msg.structuredData.actionPlan || msg.structuredData.action_roadmap || []).map((step: any, idx: number) => {
                          const title = typeof step === 'object' ? step.title : `Step ${idx + 1}`;
                          const detail = typeof step === 'object' ? step.detail : step;
                          return (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-neutral-950/90 border border-neutral-800 space-y-1"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <h5 className="font-semibold text-neutral-200 text-xs">
                                  {title}
                                </h5>
                              </div>
                              <p className="text-[11px] text-neutral-300 pl-7 leading-relaxed">
                                {detail}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Evidence Checklist */}
                  {msg.structuredData.evidence_checklist && msg.structuredData.evidence_checklist.length > 0 && (
                    <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 space-y-1.5">
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase font-mono block">
                        Evidence & Statutory Documentation Checklist:
                      </span>
                      <div className="space-y-1">
                        {msg.structuredData.evidence_checklist.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Disclaimer */}
                  <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-800/30 text-[10px] text-amber-300/80 leading-relaxed">
                    ⚖️ <strong>Advocate Legal Notice:</strong> Strategic orientation under the Constitution of India, BNS, BNSS, BSA, and statutory enactments. Consult an enrolled advocate for courtroom vakalatnama and filings.
                  </div>

                </div>
              )}
            </div>

            <span className="text-[10px] text-neutral-500 font-mono px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-400 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Analyzing Indian legal statutes (BNS/BNSS/BSA) and constitutional rights...</span>
          </div>
        )}

        {/* Real-time Voice Listening Visualizer */}
        {isListening && (
          <div className="p-3.5 bg-neutral-950 border border-amber-500/40 rounded-xl space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-amber-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="font-semibold">Listening to your voice ({selectedLanguage.name})...</span>
              </div>
              <button
                type="button"
                onClick={toggleListening}
                className="text-[10px] px-2 py-0.5 bg-neutral-900 rounded text-neutral-300 hover:text-white"
              >
                Stop
              </button>
            </div>

            {/* Pulsating Voice Wave Bars */}
            <div className="flex items-center justify-center gap-1.5 h-8">
              {[0.4, 0.8, 1.0, 0.6, 0.9, 0.3, 0.7, 0.95, 0.5, 0.85].map((scale, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full animate-pulse"
                  style={{
                    height: `${scale * 100}%`,
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
            </div>

            <p className="text-[11px] text-neutral-400 text-center italic">
              "{inputQuery || 'Listening for speech...'}"
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Notice Toast */}
      {voiceNotice && (
        <div className="px-4 py-1.5 bg-neutral-900 border-t border-neutral-800 text-[11px] text-amber-400 flex items-center justify-between">
          <span>{voiceNotice}</span>
          <button type="button" onClick={() => setVoiceNotice(null)} className="text-neutral-500 hover:text-neutral-300">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Attached Document Bar (if document was optionally scanned) */}
      {attachedDoc && (
        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium text-neutral-200 truncate">
              Attached: {attachedDoc.documentType}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-rose-950 text-rose-400 border border-rose-800 shrink-0">
              {attachedDoc.riskFlags.length} Risks
            </span>
          </div>
          <button
            type="button"
            onClick={onClearAttachedDoc}
            title="Remove document context"
            className="text-neutral-400 hover:text-neutral-200 p-1 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Form Bar */}
      <div className="p-3.5 bg-neutral-900 border-t border-neutral-800 shrink-0 space-y-2">
        {/* Quick Language & Voice Switcher Bar */}
        {mode === 'ai_legal_advisor' && (
          <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-neutral-800/70 text-[11px]">
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
              <span className="text-neutral-400 text-[10px] font-medium shrink-0 flex items-center gap-1">
                <Globe className="w-3 h-3 text-amber-400" />
                Lang:
              </span>
              <button
                type="button"
                onClick={() => {
                  const lang = getLanguageByCode('auto');
                  onSelectLanguage?.(lang);
                  setMicLang('auto');
                }}
                className={`px-2 py-0.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                  selectedLanguage.code === 'auto'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                🌐 Auto (Eng + हिन्दी)
              </button>
              <button
                type="button"
                onClick={() => {
                  const lang = getLanguageByCode('hi-en');
                  onSelectLanguage?.(lang);
                  setMicLang('hi');
                }}
                className={`px-2 py-0.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                  selectedLanguage.code === 'hi-en'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                🇮🇳 Bilingual (Eng + हिन्दी)
              </button>
              <button
                type="button"
                onClick={() => {
                  const lang = getLanguageByCode('hi');
                  onSelectLanguage?.(lang);
                  setMicLang('hi');
                }}
                className={`px-2 py-0.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                  selectedLanguage.code === 'hi'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                🇮🇳 हिन्दी (Hindi)
              </button>
              <button
                type="button"
                onClick={() => {
                  const lang = getLanguageByCode('en');
                  onSelectLanguage?.(lang);
                  setMicLang('en');
                }}
                className={`px-2 py-0.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                  selectedLanguage.code === 'en'
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            {/* Mic Toggle Switcher */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-neutral-500 text-[10px]">Mic:</span>
              <button
                type="button"
                onClick={() => setMicLang(micLang === 'hi' ? 'en' : 'hi')}
                title="Toggle microphone recognition between Hindi and English"
                className="px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 text-[10px] text-amber-400 font-medium cursor-pointer"
              >
                {micLang === 'hi' ? '🇮🇳 हिन्दी' : micLang === 'en' ? '🇬🇧 English' : '🌐 Auto'}
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Camera Scanner Shortcut */}
          <button
            type="button"
            onClick={onOpenScanner}
            title="Visual Document Scanner (Optional Tool)"
            className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Real-Time Microphone Voice Button */}
          <button
            id="advocate-mic-voice-btn"
            type="button"
            onClick={toggleListening}
            title={isListening ? 'Stop listening' : `Speak to AI Advocate in ${selectedLanguage.name}`}
            className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse ring-2 ring-rose-400/40'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            id="assistant-query-input"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              mode === 'ai_legal_advisor'
                ? 'Ask in simple words (English, हिन्दी, or Hinglish - e.g., fraud, FIR, cheque)...'
                : 'Ask anything about this judgment in simple words (English or हिन्दी)...'
            }
            className="flex-1 px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
          />

          <button
            id="send-assistant-btn"
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className={`p-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
              inputQuery.trim() && !loading
                ? mode === 'ai_legal_advisor'
                  ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md'
                  : 'bg-sky-500 hover:bg-sky-400 text-neutral-950 shadow-md'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between px-1 text-[10px] text-neutral-500">
          <span>AI Legal Advocate • Multilingual Voice Active ({selectedLanguage.name})</span>
          <span>{voiceEnabled ? '🔊 Audio Narrator On' : '🔇 Audio Narrator Muted'}</span>
        </div>
      </div>

    </div>
  );
};
