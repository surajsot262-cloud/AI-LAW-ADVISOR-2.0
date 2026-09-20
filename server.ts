import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initializer for Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Endpoint 1: Talk to Case (Grounded Q&A)
app.post("/api/chat-case", async (req, res) => {
  try {
    const { user_query, case_name, context_chunks } = req.body;

    if (!user_query) {
      return res.status(400).json({ error: "Missing user_query" });
    }

    const ai = getGeminiClient();
    if (ai) {
      const systemInstruction = `You are a helpful, crystal-clear Indian Legal AI Assistant embedded within an Indian Case Law Analytics Platform.

PRIMARY DIRECTIVE: EXTREME CLARITY & SIMPLE EVERYDAY LANGUAGE (सरल और स्पष्ट भाषा)
Your mission is to make complex court judgments and legal points easy for EVERYONE to understand—whether the user is a law student, advocate, or an everyday citizen with zero legal background.

RULES FOR CLEAR & ACCESSIBLE ANSWERS:
1. Plain Language First (सरल शब्दों में):
   - Always begin your answer with a 2-3 sentence "📌 In Plain Words / सरल शब्दों में:" summary explaining the bottom-line ruling in clear, simple, human language.
   - Avoid unnecessary Latin phrases, dense legalese, or convoluted sentences. If you must use a technical term (like "ratio decidendi" or "manifest arbitrariness"), immediately explain what it means in plain words in parentheses.
2. Grounding with Exact Paragraphs:
   - Base all answers strictly on the provided case context.
   - Cite specific paragraph numbers (e.g. "[Para 8]", "[Para 31]") and judge names for accuracy, but explain the judges' reasoning in simple, conversational terms so anyone understands why it matters.
3. Clean, Scannable Structure:
   - Use clear markdown sections and bullet points:
     - 📌 **In Plain Words (सरल शब्दों में)**
     - ⚖️ **What the Court Decided & Key Reasons**
     - 📖 **Exact Paragraph Citations**
     - 💡 **What This Means for Everyday People**
4. Multilingual & Bilingual Adaptation:
   - If the user asks in Hindi or Hinglish, explain in simple, warm, accessible Hindi/Hinglish.
   - If the user asks in English, write in simple, friendly, crystal-clear English.
5. If Not in Context:
   - If the judgment context does not cover the question, state simply: "This judgment does not contain information regarding this query."`;

      const prompt = `CONTEXT CHUNKS FOR CASE: ${case_name || "Active Case"}
${context_chunks || "No explicit context passed."}

USER QUESTION:
${user_query}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      return res.json({
        reply: response.text,
        grounded: true,
        source: "gemini-3.8-flash",
      });
    }

    // Fallback if Gemini key is not set:
    return res.json({
      fallback: true,
      message: "Server running without GEMINI_API_KEY; client-side grounded knowledge retrieval active.",
    });
  } catch (error: any) {
    console.error("Error in /api/chat-case:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

// Endpoint 2: AI Legal Advisor (Senior Advocate analysis)
app.post("/api/legal-advisor", async (req, res) => {
  try {
    const { query, category } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const systemPrompt = `You are a helpful Senior Advocate and Indian Legal Counsel.
Analyze the user's situation and return a structured JSON response tailored to Indian law (BNSS, BNS, CPC, CrPC, IT Act, Consumer Protection Act, etc.).

CRITICAL RULE: Write in simple, clear everyday language that anyone can understand without a law degree. Explain what happened, what the law says, and provide clear step-by-step guidance.

Return ONLY a valid JSON object matching this schema:
{
  "case_classification": "Simple category name (e.g., 'Criminal Cyber Fraud & Impersonation under IT Act & BNS')",
  "applicable_statutes": ["Array of cited Indian sections/acts with brief simple explanation in brackets, e.g. 'Section 318(4) Bharatiya Nyaya Sanhita 2023 (Cheating / धोखाधड़ी)'"],
  "summary_advice": "A clear, simple 2-3 paragraph explanation in plain everyday words explaining what happened, what rights the user has, and what their immediate legal standing is.",
  "action_roadmap": [
    { "step": 1, "title": "Immediate Action", "detail": "Specific step in simple plain words (e.g. Call 1930 within golden hour, file on cybercrime.gov.in)" },
    { "step": 2, "title": "Police or Statutory Step", "detail": "Filing Zero FIR under BNSS Section 173 at any station" },
    { "step": 3, "title": "Court or Tribunal Recourse", "detail": "Filing before Magistrate or Tribunal" }
  ],
  "evidence_checklist": ["Item 1", "Item 2", "Item 3"],
  "landmark_precedents": [
    { "title": "Case Title", "citation": "SCC Citation", "principle": "Simple explanation of what the court ruled" }
  ],
  "mandatory_disclaimer": "DISCLAIMER: This analysis is generated for informational purposes to help you understand your legal rights. Consult an enrolled advocate before initiating judicial proceedings."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `USER LEGAL INQUIRY (Category: ${category || "General Indian Law"}):\n${query}`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ result: parsed, source: "gemini-3.8-flash" });
    }

    return res.json({ fallback: true });
  } catch (error: any) {
    console.error("Error in /api/legal-advisor:", error);
    res.status(500).json({ error: error?.message || "Advisor error" });
  }
});

// Endpoint 3: Legal Summarization & Extraction (Backend LLM / RAG schema)
app.post("/api/summarize-custom", async (req, res) => {
  try {
    const { judgment_text } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const systemInstruction = `You are an expert Indian Legal AI Assistant specializing in legal research, judgment analysis, and precedent synthesis.

TASK:
Analyze the provided Indian court judgment text and generate a structured JSON object. Do not invent facts, modify citations, or hallucinate legal principles. Base all responses strictly on the provided context.

OUTPUT SCHEMA (Return ONLY valid JSON):
{
  "metadata": {
    "case_name": "String",
    "court": "String",
    "judgment_date": "YYYY-MM-DD or Unknown",
    "bench": "String (e.g., Single Judge, Division Bench)",
    "acts_and_sections": ["Array of cited statutes, e.g., 'IPC Section 302', 'CrPC Section 438'"]
  },
  "summary": {
    "factual_matrix": "A concise overview of the essential background facts of the case.",
    "framed_issues": ["List of core legal issues/questions framed or evaluated by the court."],
    "appellant_arguments": "Key arguments presented by the appellant/petitioner.",
    "respondent_arguments": "Key arguments presented by the respondent/state.",
    "ratio_decidendi": "Core legal reasoning and principle established by the court.",
    "final_verdict": "Final holding, judgment outcome, and specific relief granted or dismissed."
  },
  "key_precedents_cited": [
    {
      "case_title": "String",
      "citation": "String",
      "context": "Brief note on why this precedent was cited."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `CONTEXT TEXT:\n${judgment_text}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ result: parsed, source: "gemini-3.8-flash" });
    }

    return res.json({ fallback: true });
  } catch (error: any) {
    console.error("Error in /api/summarize-custom:", error);
    res.status(500).json({ error: error?.message || "Summarization error" });
  }
});

// Endpoint 4: AI Advocate & Legal Advisor (Indian Jurisprudence Expert)
const handleAdvocateChat = async (req: express.Request, res: express.Response) => {
  try {
    const { query, preferredLanguage, documentContext, caseContext } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    const ai = getGeminiClient();
    if (ai) {
      let langInstruction = '';
      if (preferredLanguage === 'hi-en') {
        langInstruction = `BILINGUAL (ENGLISH + HINDI / HINGLISH) MODE:
Explain everything in simple, conversational bilingual format (English and Hindi / fluent Hinglish). The user wants advice that ANY ordinary person can understand without being intimidated by legal jargon. Always provide crystal-clear Hindi explanations paired with English legal terms and section titles.`;
      } else if (preferredLanguage === 'hi') {
        langInstruction = `MANDATORY TARGET LANGUAGE: The user selected Hindi ('hi'). Provide your entire advice in simple, everyday Hindi (सरल हिन्दी) that any citizen can understand. Avoid archaic, dense Sanskrit words. Explain what each section means in plain, reassuring words.`;
      } else if (preferredLanguage === 'en') {
        langInstruction = `MANDATORY TARGET LANGUAGE: The user selected English ('en'). Provide your advice in crystal-clear, simple, and jargon-free English so any citizen can understand their rights and next steps.`;
      } else if (preferredLanguage && preferredLanguage !== 'auto') {
        langInstruction = `MANDATORY TARGET LANGUAGE: Produce your response in simple, clear '${preferredLanguage}' so it is easily understandable to ordinary citizens.`;
      } else {
        langInstruction = `BILINGUAL & MULTILINGUAL UNDERSTANDING: Understand English, Hindi, and conversational Hinglish seamlessly. Match the user's language in a simple, friendly, easy-to-understand conversational tone.`;
      }

      const systemPrompt = `System Prompt: AI Legal Advocate - Simple, Clear & Citizen-Friendly Legal Advisor

You are an expert Indian Legal AI Advocate. Your primary mandate is to translate complex Indian laws and constitutional protections into **crystal-clear, simple, and actionable advice that anyone can easily understand and use**.

CRITICAL DIRECTIVE: MAKE IT SIMPLE, CLEAR & EMPOWERING
- Avoid intimidating legalese, unnecessary Latin maxims, and dense legal jargon.
- Write as if you are a supportive, experienced senior advocate sitting with a regular citizen who is stressed and needs clear, step-by-step guidance.
- Always include:
  1. 📌 What happened in simple words (सरल शब्दों में क्या हुआ है).
  2. ⚖️ What the law says & the punishment or relief (लागू कानून).
  3. 🚀 Simple, numbered step-by-step instructions on what to do right now (1-2-3 Action Plan).
  4. 🛡️ Your rights & legal safeguards (what police or authorities can/cannot do).

Core Indian Legal Framework (Grounded & Accurate):
- Constitution of India: Fundamental Rights (Articles 14, 19, 21, 22), Writ Remedies (Articles 32 & 226).
- Bharatiya Nyaya Sanhita (BNS) 2023 [replaces legacy IPC]: Offenses like fraud (Sec 318), theft (Sec 303), extortion (Sec 308), assault, cyber crimes.
- Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 [replaces legacy CrPC]: Zero FIR (Sec 173 - any police station must register regardless of location), arrest notice (Sec 35), bail (Sec 480/482).
- Bharatiya Sakshya Adhiniyam (BSA) 2023 [replaces Indian Evidence Act]: Electronic records and digital proof (Sec 63).
- Specialized Laws: IT Act (Sec 66D cyber fraud), Negotiable Instruments Act (Sec 138 cheque bounce), Consumer Protection Act 2019, RERA, Labour Codes.

Language Tone:
${langInstruction}

OUTPUT SCHEMA (Return valid JSON):
{
  "directAnswer": "A 1-2 sentence crystal-clear, simple explanation of the legal situation in everyday words.",
  "reply": "Full actionable legal advice in clean markdown. Must include clear headings: '### 1. In Plain Words / सरल शब्दों में', '### 2. Applicable Law & Your Protection / लागू कानून', '### 3. Step-by-Step Action Plan (What to do next)', '### 4. Important Rights You Have / आपके अधिकार'.",
  "detectedLanguage": "e.g. 'English', 'Bilingual (English + हिन्दी)', 'Hindi (हिन्दी)'",
  "categorization": "Simple category name (e.g., 'Online Cheating & Cyber Fraud (साइबर धोखाधड़ी)')",
  "applicableSections": ["BNS Sec 318(4) (Fraud / धोखाधड़ी)", "BNSS Sec 173 (Zero FIR - File at any station)"],
  "constitutionalRights": ["Article 21 (Right to Fair Investigation & Protection of Livelihood)"],
  "actionPlan": ["Step 1: Call 1930 immediately to freeze stolen money", "Step 2: File Zero FIR at any nearby police station", "Step 3: Notify bank in writing within 3 days"],
  "proceduralSafeguards": ["Police cannot refuse your FIR by claiming 'wrong area' (BNSS Sec 173 Zero FIR rule)", "You have the right to consult a lawyer of your choice"]
}`;

      let fullPrompt = `USER INQUIRY:\n${query}`;
      if (documentContext) {
        fullPrompt += `\n\nATTACHED VOLUNTARY DOCUMENT CONTEXT:\n${documentContext}`;
      }
      if (caseContext) {
        fullPrompt += `\n\nACTIVE CASE PRECEDENT CONTEXT:\n${caseContext}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: fullPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.25,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ result: parsed, source: "gemini-3.8-flash" });
    }

    return res.json({ fallback: true });
  } catch (error: any) {
    console.error("Error in AI advocate chat:", error);
    res.status(500).json({ error: error?.message || "Advocate error" });
  }
};

app.post("/api/advocate-chat", handleAdvocateChat);
app.post("/api/lexi-chat", handleAdvocateChat); // Backward-compatible alias

// Endpoint 5: Visual Document Scanner (OCR, Obligation Breakdown, Risk & Ambiguity Flagging)
app.post("/api/scan-document", async (req, res) => {
  try {
    const { imageBase64, mimeType, documentText, fileName, preferredLanguage } = req.body;
    const ai = getGeminiClient();

    if (ai) {
      const langNotice = preferredLanguage && preferredLanguage !== 'auto'
        ? `Provide your plain-language explanation and risk breakdown in language '${preferredLanguage}'.`
        : `Provide your explanation and risk breakdown in the dominant language of the document or English.`;

      const systemPrompt = `You are an AI Legal Advocate and Contract Risk Auditor.
TASK:
Perform deep OCR extraction, document classification, plain-language breakdown, obligation mapping, and risk/ambiguity flagging on the uploaded legal document (contract, notice, summons, lease, agreement, FIR, invoice). This is an optional analysis utility for voluntarily submitted documents.

${langNotice}

CRITICAL AUDIT RULES:
- Ground scrutiny in Indian Contract Act, Transfer of Property Act, BNS, BNSS, RERA, and Consumer Protection Act.
- Identify one-sided termination clauses, arbitrary forfeiture, uncapped liability/indemnity, harsh interest rates, lock-in periods, waiver of judicial remedies, or missing dispute resolution mechanisms.
- Categorize each risk flag with level: "high", "medium", or "low".

OUTPUT SCHEMA (Return ONLY valid JSON):
{
  "documentType": "e.g. Residential Tenancy Agreement, Legal Notice for Cheque Bounce, Non-Disclosure Agreement, Employment Contract, Court Summons, FIR Copy",
  "extractedText": "Clean OCR text extracted from the document or image.",
  "plainLanguageSummary": "A concise, actionable breakdown of what this document is, what it binds the user to, and its practical effect.",
  "keyObligations": [
    {
      "party": "Party Name / Role (e.g., Tenant, Employee, Recipient)",
      "obligation": "Clear description of obligation or payment",
      "deadline": "Time limit, grace period, or notice requirement if specified"
    }
  ],
  "riskFlags": [
    {
      "level": "high",
      "clause": "Quoted or summarized problematic clause",
      "issue": "Plain language explanation of why this clause is dangerous or ambiguous",
      "recommendation": "Specific counter-clause, modification, or action to protect the user"
    }
  ],
  "jurisdiction": "Governing law and court jurisdiction identified in the document (or 'Unspecified')",
  "recommendedNextSteps": [
    "Immediate action step 1",
    "Immediate action step 2",
    "Immediate action step 3"
  ]
}`;

      let contentsPayload: any;
      if (imageBase64) {
        const extractedMime = imageBase64.match(/^data:([^;]+);base64,/)?.[1];
        const finalMime = mimeType || extractedMime || "image/jpeg";
        const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, "");
        contentsPayload = {
          parts: [
            {
              inlineData: {
                mimeType: finalMime,
                data: cleanBase64,
              },
            },
            {
              text: `Analyze this legal document image thoroughly. File name: ${fileName || "Scanned Document"}. Extract text and audit risks according to the schema.`,
            },
          ],
        };
      } else {
        contentsPayload = `Analyze this legal document text thoroughly. File name: ${fileName || "Uploaded Document"}.\n\nDOCUMENT CONTENT:\n${documentText || ""}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contentsPayload,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ result: parsed, source: "gemini-3.8-flash" });
    }

    return res.json({ fallback: true });
  } catch (error: any) {
    console.error("Error in /api/scan-document:", error);
    res.status(500).json({ error: error?.message || "Document scanner error" });
  }
});

// Vite middleware setup
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
