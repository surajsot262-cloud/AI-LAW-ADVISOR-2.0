import { ScannedDocumentAnalysis, SupportedLanguage } from '../types';

export interface AdvocateResponse {
  directAnswer: string;
  reply: string;
  detectedLanguage: string;
  categorization: string;
  applicableSections: string[];
  constitutionalRights: string[];
  actionPlan: string[];
  proceduralSafeguards: string[];
  empatheticReassurance?: string;
  actionSteps?: string[];
  legalPoints?: string[];
}

// Backward-compatibility alias
export type LexiResponse = AdvocateResponse;

export function getOfflineAdvocateResponse(
  query: string,
  preferredLanguage: string = 'en',
  docContext?: string
): AdvocateResponse {
  const q = query.toLowerCase();

  // Hinglish & Hindi detection
  const hasHinglish = /\b(kya|kaise|karu|kare|karein|karna|mera|meri|mere|mujhe|hum|police|thana|chowki|paisa|paise|rupaye|dhoka|dhokha|chori|gaya|gayi|gaye|hai|hain|nahi|madad|adhikar|kanoon|kanun|fir|darj|sunwai|vakil|daroga|khata|freeze|cheque|dhamki)\b/i.test(query);
  const hasHindiScript = /[\u0900-\u097F]/.test(query);
  const isBilingual = preferredLanguage === 'hi-en' || (hasHinglish && preferredLanguage !== 'hi');
  const isHindi = !isBilingual && (preferredLanguage === 'hi' || hasHindiScript || (hasHinglish && preferredLanguage === 'hi') || q.includes('namaste') || q.includes('madad'));
  const isBengali = preferredLanguage === 'bn' || /[\u0980-\u09FF]/.test(query);
  const isTamil = preferredLanguage === 'ta' || /[\u0B80-\u0BFF]/.test(query);
  const isTelugu = preferredLanguage === 'te' || /[\u0C00-\u0C7F]/.test(query);
  const isMarathi = preferredLanguage === 'mr';
  const isGujarati = preferredLanguage === 'gu' || /[\u0A80-\u0AFF]/.test(query);
  const isKannada = preferredLanguage === 'kn' || /[\u0C80-\u0CFF]/.test(query);
  const isMalayalam = preferredLanguage === 'ml' || /[\u0D00-\u0D7F]/.test(query);
  const isPunjabi = preferredLanguage === 'pa' || /[\u0A00-\u0A7F]/.test(query);
  const isUrdu = preferredLanguage === 'ur';
  const isSpanish = preferredLanguage === 'es' || q.includes('hola') || q.includes('ayuda') || q.includes('estafa');
  const isFrench = preferredLanguage === 'fr' || q.includes('bonjour') || q.includes('aide') || q.includes('fraude');
  const isGerman = preferredLanguage === 'de' || q.includes('hallo') || q.includes('hilfe');
  const isArabic = preferredLanguage === 'ar' || /[\u0600-\u06FF]/.test(query);
  const isChinese = preferredLanguage === 'zh' || /[\u4E00-\u9FFF]/.test(query);

  // 0. Bilingual (English + हिन्दी / Hinglish)
  if (isBilingual) {
    return {
      directAnswer: 'यह मामला BNS (भारतीय न्याय संहिता) एवं IT Act के अंतर्गत संज्ञेय अपराध (Cognizable Offense) है। You have clear statutory rights under Indian Law for immediate recovery and legal protection.',
      categorization: 'Cyber Fraud, Cheating & Criminal Infringement (साइबर धोखाधड़ी एवं छल - BNS Sec 318)',
      detectedLanguage: 'Bilingual (English + हिन्दी)',
      empatheticReassurance: 'Do not panic — कानून आपके पक्ष में है। Prompt action within the initial Golden Hour ensures both recovery and strict legal remedies.',
      applicableSections: [
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Section 318(4) (Cheating / धोखाधड़ी) [replaces legacy IPC 420]',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Section 173 (Mandatory Zero FIR / जीरो एफआईआर)',
        'Information Technology Act 2000 - Section 66D (Cheating by Personation / साइबर ठगी)',
        'Bharatiya Sakshya Adhiniyam (BSA) 2023 - Section 63 (Electronic Records Admissibility / डिजिटल साक्ष्य)',
        'Constitution of India - Article 21 (Right to Fair Investigation / निष्पक्ष जांच का मौलिक अधिकार)'
      ],
      constitutionalRights: [
        'Constitution of India - Article 21 (Protection of Life & Liberty / Right to Fair Investigation)',
        'Constitution of India - Article 22(1) (Right to Legal Counsel / वकील से विधिक परामर्श का अधिकार)'
      ],
      actionPlan: [
        'Call 1930 National Cyber Helpline immediately / राष्ट्रीय साइबर हेल्पलाइन 1930 पर तुरंत कॉल करें',
        'File Zero FIR under BNSS Section 173 at any police station (क्षेत्राधिकार के बहाने FIR मना करना गैरकानूनी है)',
        'Submit formal dispute notice with UTR transaction details to bank nodal officer to freeze funds / बैंक नोडल ऑफिसर को सस्पेक्ट खाता फ्रीज करने हेतु आवेदन दें',
        'Preserve all digital logs, screenshots, and call recordings under BSA 2023 Sec 63 certificate'
      ],
      proceduralSafeguards: [
        'Police cannot refuse Zero FIR under BNSS Section 173 regardless of jurisdictional boundaries',
        'If local police refuse to register FIR, submit complaint directly to Superintendent of Police (SP) under BNSS Sec 175(3)'
      ],
      reply: `### विधिक रणनीति एवं Actionable Legal Strategy:

1. **Offense Identification (अपराध का प्रत्यक्ष वर्गीकरण):**
   - **Hindi:** यह भारतीय न्याय संहिता (BNS) 2023 की धारा 318(4) (धोखाधड़ी) तथा आईटी अधिनियम की धारा 66D के तहत सीधे तौर पर दंडनीय संज्ञेय अपराध (Cognizable Offense) है।
   - **English:** This constitutes a cognizable criminal offense under BNS Section 318(4) (Cheating & Dishonest Inducement) and IT Act Section 66D (Fraud by Personation).

2. **Applicable Indian Laws & Constitutional Rights (लागू कानून एवं अधिकार):**
   - **BNS Sec 318(4):** Punishes fraud and cheating with rigorous imprisonment up to 7 years.
   - **BNSS Sec 173 (Zero FIR):** किसी भी पुलिस स्टेशन में जीरो एफआईआर दर्ज कराना आपका कानूनी अधिकार है। Police cannot refuse on jurisdictional grounds.
   - **BSA Sec 63:** डिजिटल साक्ष्य (Screenshots, UTR, WhatsApp chats) अदालत में पूर्णतः मान्य हैं।
   - **Articles 14 & 21:** Right to equality before law and protection against arbitrary police inaction.

3. **Step-by-Step Immediate Action Plan (त्वरित कार्ययोजना):**
   - **Step 1 (First 2 Hours):** Dial **1930** (National Cybercrime Helpline) immediately to lien-mark/freeze the recipient bank account. Also lodge a complaint on **cybercrime.gov.in**.
   - **Step 2 (Zero FIR):** नजदीकी पुलिस थाने जाकर **BNSS धारा 173** के तहत जीरो एफआईआर दर्ज करवाएं और निशुल्क प्रमाणित प्रति (Certified Free Copy) प्राप्त करें।
   - **Step 3 (Bank Notice):** संबंधित बैंक के नोडल अधिकारी को लिखित आवेदन देकर संदिग्ध खाते में लेनदेन रोकने की मांग करें।
   - **Step 4 (Evidence Preservation):** सुरक्षित रखें सभी SMS, WhatsApp चैट्स, व UTR ट्रांजेक्शन रसीदें।

4. **Procedural Safeguards (पुलिस प्रक्रिया एवं आपके अधिकार):**
   - यदि थाना प्रभारी (SHO) एफआईआर दर्ज करने से इनकार करे, तो आप **BNSS धारा 175(3)** के तहत पुलिस अधीक्षक (SP/DCP) को लिखित शिकायत भेज सकते हैं या न्यायिक मजिस्ट्रेट (JMIC) के समक्ष याचिका दायर कर सकते हैं।`,
      actionSteps: [
        'Call 1930 / 1930 पर तुरंत कॉल करें',
        'File Zero FIR under BNSS Sec 173 / जीरो एफआईआर दर्ज करवाएं',
        'Submit Bank Dispute Notice to freeze fraudulent funds'
      ]
    };
  }

  // 1. Hindi
  if (isHindi) {
    return {
      directAnswer: 'यह मामला भारतीय न्याय संहिता (BNS) और सूचना प्रौद्योगिकी अधिनियम के अंतर्गत संज्ञेय अपराध (Cognizable Offense) का है। आपको तुरंत वैधानिक कार्रवाई करनी चाहिए।',
      categorization: 'आपराधिक धोखाधड़ी एवं साइबर अपराध (Cyber Fraud & Cheating under BNS)',
      detectedLanguage: 'Hindi (हिन्दी)',
      empatheticReassurance: 'घबराएं नहीं — कानून आपके पक्ष में है। त्वरित रिपोर्टिंग और वैधानिक सुरक्षा उपाय आपको पूर्ण राहत प्रदान करेंगे।',
      applicableSections: [
        'भारतीय न्याय संहिता (BNS) 2023 - धारा 318(4) (धोखाधड़ी/Cheating) [पूर्व IPC 420]',
        'भारतीय नागरिक सुरक्षा संहिता (BNSS) 2023 - धारा 173 (जीरो एफआईआर / Zero FIR)',
        'सूचना प्रौद्योगिकी अधिनियम 2000 - धारा 66D (प्रतिरूपण द्वारा धोखाधड़ी)',
        'भारतीय साक्ष्य अधिनियम (BSA) 2023 - धारा 63 (डिजिटल साक्ष्य की स्वीकार्यता)'
      ],
      constitutionalRights: [
        'संविधान का अनुच्छेद 21 - विधि द्वारा स्थापित प्रक्रिया एवं व्यक्तिगत स्वतंत्रता का संरक्षण',
        'संविधान का अनुच्छेद 14 - विधि के समक्ष समानता एवं मनमानी कार्रवाई से सुरक्षा'
      ],
      actionPlan: [
        'गोल्डन ऑवर में 1930 राष्ट्रीय साइबर हेल्पलाइन पर कॉल करें या cybercrime.gov.in पर तत्काल शिकायत दर्ज करें',
        'बीएनएसएस धारा 173 के तहत किसी भी नजदीकी पुलिस स्टेशन में जीरो एफआईआर (Zero FIR) दर्ज करवाएं',
        'बैंक को लिखित आवेदन देकर संदिग्ध खाते को फ्रीज (Freeze) करने का औपचारिक अनुरोध करें',
        'सभी डिजिटल लेनदेन रसीदें, स्क्रीनशॉट और कॉल रिकॉर्ड बीएसए धारा 63 प्रमाणपत्र हेतु सुरक्षित रखें'
      ],
      proceduralSafeguards: [
        'बीएनएसएस के तहत पुलिस बिना किसी अधिकार क्षेत्र के बहाने जीरो एफआईआर दर्ज करने से मना नहीं कर सकती',
        'संविधान के अनुच्छेद 22(1) के अंतर्गत आपको अपनी पसंद के अधिवक्ता से विधिक परामर्श लेने का मौलिक अधिकार है'
      ],
      reply: `### विधिक रणनीति एवं विधिक विश्लेषण:
1. **अपराध का प्रत्यक्ष वर्गीकरण:**
   यह मामला भारतीय न्याय संहिता (BNS) 2023 की धारा 318(4) (धोखाधड़ी) तथा आईटी एक्ट की धारा 66D के तहत सीधे तौर पर दंडनीय संज्ञेय अपराध है।

2. **लागू कानून एवं सांविधानिक अधिकार:**
   - **BNS धारा 318(4):** छल या संपत्ति के बेईमानी से परिदान हेतु कठोर कारावास।
   - **BNSS धारा 173:** अधिकार क्षेत्र की परवाह किए बिना किसी भी थाने में जीरो एफआईआर (Zero FIR) दर्ज कराने की अनिवार्यता।
   - **अनुच्छेद 21:** निष्पक्ष जांच एवं सुरक्षा का मौलिक अधिकार।

3. **त्वरित कार्ययोजना (Action Steps):**
   - **चरण 1:** राष्ट्रीय साइबर हेल्पलाइन **1930** पर तुरंत रिपोर्ट करें और यूटीआर नंबर के साथ cybercrime.gov.in पर पावती प्राप्त करें।
   - **चरण 2:** संबंधित बैंक के नोडल अधिकारी को ईमेल भेजकर लेन-देन रोकने (Lien Mark) का आदेश प्राप्त करवाएं।
   - **चरण 3:** बीएसए (BSA) 2023 की धारा 63 के तहत इलेक्ट्रॉनिक रिकॉर्ड सुरक्षित रखें।

4. **प्रक्रियात्मक सुरक्षा (Procedural Safeguards):**
   - पुलिस अधिकारी एफआईआर दर्ज करने से इनकार नहीं कर सकते। यदि स्थानीय स्तर पर इनकार हो, तो बीएनएसएस धारा 175(3) के तहत पुलिस अधीक्षक (SP) या न्यायिक मजिस्ट्रेट को शिकायत प्रेषित की जा सकती है।`,
      actionSteps: [
        'राष्ट्रीय साइबर हेल्पलाइन 1930 पर तुरंत कॉल करें',
        'BNSS धारा 173 के तहत जीरो एफआईआर दर्ज करवाएं',
        'बैंक को लिखित शिकायत देकर लेनदेन फ्रीज करवाएं'
      ],
      legalPoints: [
        'BNS 2023 धारा 318(4) धोखाधड़ी',
        'BNSS 2023 धारा 173 जीरो एफआईआर',
        'संविधान अनुच्छेद 21'
      ]
    };
  }

  // 2. Tamil
  if (isTamil) {
    return {
      directAnswer: 'இது பாரதிய நியாய சன்ஹிதா (BNS) மற்றும் இந்திய அரசியலமைப்புச் சட்டத்தின் கீழ் நேரடி சட்டப்பூர்வ நடவடிக்கைக்கான குற்றமாகும்.',
      categorization: 'குற்றவியல் மோசடி மற்றும் உரிமைகள் மீறல் (Criminal Fraud & Rights Protection)',
      detectedLanguage: 'Tamil (தமிழ்)',
      empatheticReassurance: 'சட்டரீதியான தீர்வுகள் உங்கள் பக்கம் உள்ளன. உடனடி சட்ட நடவடிக்கைகளை துணிவுடன் மேற்கொள்ளுங்கள்.',
      applicableSections: [
        'பாரதிய நியாய சன்ஹிதா (BNS) பிரிவு 318(4) [முந்தைய IPC 420]',
        'பாரதிய நாகரிக் சுரக்ஷா சன்ஹிதா (BNSS) பிரிவு 173 (Zero FIR)',
        'இந்திய அரசியலமைப்பு பிரிவு 21 மற்றும் பிரிவு 226 (ரிட் மனு)'
      ],
      constitutionalRights: [
        'அரசியலமைப்பு உறுப்பு 21 - தனிநபர் சுதந்திரம் மற்றும் நியாயமான விசாரணை உரிமை',
        'அரசியலமைப்பு உறுப்பு 226 - உயர்நீதிமன்ற நீதிப்பேராணை உரிமை'
      ],
      actionPlan: [
        '1930 தேசிய சைபர் உதவி எண்ணில் உடனடியாக புகார் பதிவு செய்யவும்',
        'BNSS பிரிவு 173 கீழ் எல்லை வரம்பின்றி ஜீரோ எஃப்.ஐ.ஆர் (Zero FIR) பதிவு செய்யவும்',
        'வங்கி கணக்கு விவரங்கள் மற்றும் மின்னணு ஆதாரங்களை பாதுகாக்கவும்'
      ],
      proceduralSafeguards: [
        'காவல்துறை எல்லை பிரச்சனையை காரணம் காட்டி புகாரை மறுக்க முடியாது (Zero FIR)',
        'வழக்கறிஞர் ஆலோசனையைப் பெற உங்களுக்கு அடிப்படை உரிமை உள்ளது'
      ],
      reply: `### சட்ட வழிகாட்டல் & நடவடிக்கை திட்டம்:
1. **நேரடி சட்ட அடையாளம்:** இது BNS பிரிவு 318(4) மற்றும் IT Act கீழ் தண்டனைக்குரிய குற்றமாகும்.
2. **சட்டப்பிரிவுகள் & அரசியலமைப்பு உரிமைகள்:**
   - **BNS பிரிவு 318(4):** மோசடி மற்றும் சட்டவிரோத இழப்புக்கு எதிரான நடவடிக்கை.
   - **BNSS பிரிவு 173:** எந்தவொரு காவல் நிலையத்திலும் ஜீரோ எஃப்.ஐ.ஆர் பதிவு செய்யும் கட்டாயம்.
   - **உறுப்பு 21:** நியாயமான விசாரணை மற்றும் சட்டப்பூர்வ பாதுகாப்பு.
3. **உடனடி நடவடிக்கைகள்:** 1930 சைபர் உதவி எண், வங்கிக்கு உடனடி கடிதம், மற்றும் அதிகாரப்பூர்வ எஃப்.ஐ.ஆர் பதிவு செய்தல்.`,
      actionSteps: [
        '1930 உதவி எண்ணில் புகார் பதிவு செய்க',
        'Zero FIR பதிவு செய்ய காவல்துறையை அணுகுக'
      ],
      legalPoints: [
        'BNS பிரிவு 318(4)',
        'BNSS பிரிவு 173 (Zero FIR)'
      ]
    };
  }

  // 3. Bengali
  if (isBengali) {
    return {
      directAnswer: 'এটি ভারতীয় ন্যায় সংহিতা (BNS) এবং সংবিধানের আওতায় একটি সরাসরি আমলযোগ্য অপরাধ (Cognizable Offense)।',
      categorization: 'জালিয়াতি ও প্রতারণা সংক্রান্ত অপরাধ (Fraud under BNS)',
      detectedLanguage: 'Bengali (বাংলা)',
      empatheticReassurance: 'আইন আপনার সুরক্ষার জন্য স্পষ্ট বিধান দিয়েছে। অবিলম্বে আইনি পদক্ষেপ গ্রহণ করুন।',
      applicableSections: [
        'ভারতীয় ন্যায় সংহিতা (BNS) ধারা ৩১৮(৪) (প্রতারণা/Cheating)',
        'ভারতীয় নাগরিক সুরক্ষা সংহিতা (BNSS) ধারা ১৭৩ (Zero FIR)',
        'সংবিধানের অনুচ্ছেদ ২১ ও অনুচ্ছেদ ১৪'
      ],
      constitutionalRights: [
        'সংবিধানের অনুচ্ছেদ ২১ - ন্যায়বিচার ও ব্যক্তিগত স্বাধীনতার মৌলিক অধিকার',
        'সংবিধানের অনুচ্ছেদ ১৪ - আইনের দৃষ্টিতে সমতা'
      ],
      actionPlan: [
        'জাতীয় সাইবার হেল্পলাইন ১৯৩০ নম্বরে তৎক্ষণাৎ অভিযোগ দায়ের করুন',
        'বিএনএসএস ধারা ১৭৩ অনুযায়ী নিকটস্থ থানায় জিরো এফআইআর (Zero FIR) লিপিবদ্ধ করুন',
        'ব্যাঙ্ককে লিখিতভাবে জানিয়ে লেনদেন ফ্রিজ করার অনুরোধ জানান'
      ],
      proceduralSafeguards: [
        'থানা এলাকাগত কারণ দেখিয়ে জিরো এফআইআর নিতে অস্বীকার করতে পারে না',
        'আইনজীবীর পরামর্শ পাওয়ার আপনার সাংবিধানিক অধিকার রয়েছে'
      ],
      reply: `### আইনি বিশ্লেষণ ও কর্মপরিকল্পনা:
১. **সরাসরি অপরাধের ধরন:** এটি ভারতীয় ন্যায় সংহিতা (BNS) ২০২৩-এর ধারা ৩১৮(৪) অনুযায়ী স্পষ্ট প্রতারণামূলক আমলযোগ্য অপরাধ।
২. **প্রযোজ্য আইন ও অধিকার:**
   - **BNS ধারা ৩১৮(৪):** প্রতারণা ও অসাধু উপায়ে সম্পত্তি অর্পণে কঠোর দণ্ড।
   - **BNSS ধারা ১৭৩:** যেকোনো থানায় জিরো এফআইআর বাধ্যতামূলক।
   - **অনুচ্ছেদ ২১:** সুরক্ষার সাংবিধানিক অধিকার।
৩. **জরুরি করণীয়:** ১৯৩০ নম্বরে অভিযোগ ও থানায় লিখিত এজাহার দাখিল।`,
      actionSteps: ['১৯৩০ হেল্পলাইনে কল করুন', 'জিরো এফআইআর দায়ের করুন'],
      legalPoints: ['BNS ৩১৮(৪)', 'BNSS ১৭৩']
    };
  }

  // 4. Telugu
  if (isTelugu) {
    return {
      directAnswer: 'ఇది భారతీయ న్యాయ సంహిత (BNS) మరియు భారత రాజ్యాంగం ప్రకారం తక్షణ చట్టపరమైన చర్య తీసుకోదగిన నేరం.',
      categorization: 'మోసం మరియు హక్కుల ఉల్లంఘన (Fraud under BNS)',
      detectedLanguage: 'Telugu (తెలుగు)',
      empatheticReassurance: 'చట్టం మీ వైపు ఉంది. ధైర్యంగా తక్షణ న్యాయపరమైన చర్యలు ప్రారంభించండి.',
      applicableSections: [
        'భారతీయ న్యాయ సంహిత (BNS) సెక్షన్ 318(4) (మోసం/Cheating)',
        'భారతీయ నాగరిక్ సురక్ష సంహిత (BNSS) సెక్షన్ 173 (Zero FIR)',
        'రాజ్యాంగ అధికరణ 21 మరియు 14'
      ],
      constitutionalRights: [
        'రాజ్యాంగ అధికరణ 21 - జీవించే హక్కు మరియు న్యాయమైన విచారణ హక్కు',
        'రాజ్యాంగ అధికరణ 14 - చట్టం ముందు సమానత్వం'
      ],
      actionPlan: [
        '1930 జాతీయ సైబర్ హెల్ప్‌లైన్‌కు వెంటనే ఫిర్యాదు చేయండి',
        'BNSS సెక్షన్ 173 కింద ఏదైనా పోలీస్ స్టేషన్‌లో జీరో ఎఫ్‌ఐఆర్ నమోదు చేయండి',
        'బ్యాంకుకు లిఖితపూర్వకంగా దరఖాస్తు ఇచ్చి ఖాతాను ఫ్రీజ్ చేయించండి'
      ],
      proceduralSafeguards: [
        'పోలీసులు అధికార పరిధి లేదని జీరో ఎఫ్‌ఐఆర్ నమోదును నిరాకరించలేరు',
        'న్యాయవాది సహాయం పొందే రాజ్యాంగ హక్కు మీకు ఉంది'
      ],
      reply: `### చట్టపరమైన మార్గదర్శకత్వం & ప్రణాళిక:
1. **నేర విభజన:** ఇది BNS 2023 సెక్షన్ 318(4) కింద శిక్షార్హమైన కాగ్నిజబుల్ నేరం.
2. **వర్తించే చట్టాలు & హక్కులు:** BNS సెక్షన్ 318(4), BNSS సెక్షన్ 173 (జీరో ఎఫ్‌ఐఆర్), మరియు ఆర్టికల్ 21.
3. **తక్షణ చర్యలు:** 1930 కాల్ చేయడం, బ్యాంకు నోడల్ అధికారికి లేఖ రాయడం, మరియు పోలీస్ స్టేషన్‌లో రసీదు పొందడం.`,
      actionSteps: ['1930 కాల్ చేయండి', 'జీరో ఎఫ్‌ఐఆర్ నమోదు చేయండి'],
      legalPoints: ['BNS సెక్షన్ 318(4)', 'BNSS సెక్షన్ 173']
    };
  }

  // 5. Marathi
  if (isMarathi) {
    return {
      directAnswer: 'हा गुन्हा भारतीय न्याय संहिता (BNS) आणि भारतीय संविधानानुसार थेट दखलपात्र गुन्हा (Cognizable Offense) ठरतो.',
      categorization: 'फसवणूक व सायबर गुन्हा (Cheating & Fraud under BNS)',
      detectedLanguage: 'Marathi (मराठी)',
      empatheticReassurance: 'घाबरू नका — कायद्याने नागरिकांना भक्कम संरक्षण दिले आहे. त्वरित वैधानिक पावले उचला.',
      applicableSections: [
        'भारतीय न्याय संहिता (BNS) २०२३ - कलम ३१८(४) (फसवणूक)',
        'भारतीय नागरिक सुरक्षा संहिता (BNSS) २०२३ - कलम १७३ (झिरो एफआयआर)',
        'माहिती तंत्रज्ञान कायदा २००० - कलम ६६D',
        'संविधान अनुच्छेद २१ व १४'
      ],
      constitutionalRights: [
        'अनुच्छेद २१ - कायद्याने घालून दिलेल्या पद्धतीनुसार निष्पक्ष न्याय मिळवण्याचा हक्क',
        'अनुच्छेद १४ - कायद्यासमोर समानता'
      ],
      actionPlan: [
        '१९३० राष्ट्रीय सायबर हेल्पलाईनवर त्वरित तक्रार नोंदवा',
        'बीएनएसएस कलम १७३ अंतर्गत जवळच्या कोणत्याही पोलीस ठाण्यात झिरो एफआयआर नोंदवा',
        'संबंधित बँकेला त्वरित लेखी अर्ज देऊन संशयास्पद खात्यावर लियन किंवा फ्रीज लावा'
      ],
      proceduralSafeguards: [
        'अधिकार क्षेत्राचे कारण सांगून पोलीस झिरो एफआयआर नोंदवण्यास नकार देऊ शकत नाहीत',
        'आपल्या पसंतीच्या वकिलाचा सल्ला घेण्याचा आपल्याला मूलभूत अधिकार आहे'
      ],
      reply: `### कायदेशीर विश्लेषण व रणनीती:
१. **गुन्ह्याचे थेट वर्गीकरण:** हा BNS कलम ३१८(४) व आयटी कायद्यानुसार थेट दखलपात्र गुन्हा आहे.
२. **लागू कलमे व अधिकार:** BNS ३१८(४), BNSS १७३ (झिरो एफआयआर), आणि भारतीय राज्यघटनेचे अनुच्छेद २१.
३. **तातडीची कृती योजना:** १९३० वर त्वरित कॉल, बँकेला तात्काळ लेखी सूचना, व अधिकृत तक्रार नोंदणी.`,
      actionSteps: ['१९३० हेल्पलाईनवर कॉल करा', 'झिरो एफआयआर दाखल करा'],
      legalPoints: ['BNS ३१८(४)', 'BNSS १७३']
    };
  }

  // 6. Gujarati
  if (isGujarati) {
    return {
      directAnswer: 'આ મામલો ભારતીય ન્યાય સંહિતા (BNS) અને ભારતીય બંધારણ હેઠળ સીધો કોગ્નિઝેબલ ગુનો બને છે.',
      categorization: 'છેતરપિંડી અને સાયબર અપરાધ (Fraud under BNS)',
      detectedLanguage: 'Gujarati (ગુજરાતી)',
      empatheticReassurance: 'કાયદો તમારી સુરક્ષા માટે સ્પષ્ટ છે. તાત્કાલિક કાનૂની કાર્યવાહી શરૂ કરો.',
      applicableSections: [
        'ભારતીય ન્યાય સંહિતા (BNS) ૨૦૨૩ - કલમ ૩૧૮(૪) (છેતરપિંડી)',
        'ભારતીય નાગરિક સુરક્ષા સંહિતા (BNSS) ૨૦૨૩ - કલમ ૧૭૩ (ઝીરો એફઆઈઆર)',
        'બંધારણની કલમ ૨૧ અને કલમ ૧૪'
      ],
      constitutionalRights: [
        'બંધારણની કલમ ૨૧ - વ્યક્તિગત સ્વતંત્રતા અને યોગ્ય ન્યાયનો અધિકાર',
        'બંધારણની કલમ ૧૪ - કાયદા સમક્ષ સમાનતા'
      ],
      actionPlan: [
        '૧૯૩૦ રાષ્ટ્રીય સાયબર હેલ્પલાઈન પર તુરંત કોલ કરીને ફરિયાદ નોંધાવો',
        'BNSS કલમ ૧૭૩ હેઠળ કોઈપણ નજીકના પોલીસ સ્ટેશનમાં ઝીરો એફઆઈઆર નોંધાવો',
        'બેંકને લેખિત અરજી આપી શંકાસ્પદ ખાતું ફ્રીઝ કરાવો'
      ],
      proceduralSafeguards: [
        'પોલીસ અધિકારક્ષેત્રનું બહાનું કાઢીને ઝીરો એફઆઈઆર નોંધવાનો ઇનકાર કરી શકતી નથી',
        'વકીલની કાનૂની સલાહ મેળવવાનો તમારો મૂળભૂત અધિકાર છે'
      ],
      reply: `### કાનૂની માર્ગદર્શન અને કાર્યયોજના:
૧. **ગુનાનું વર્ગીકરણ:** આ BNS કલમ ૩૧૮(૪) હેઠળ સજાપાત્ર ગુનો છે.
૨. **લાગુ પડતા કાયદા:** BNS ૩૧૮(૪), BNSS ૧૭૩ (ઝીરો એફઆઈઆર), અને કલમ ૨૧.
૩. **તાત્કાલિક પગલાં:** ૧૯૩૦ પર ફરિયાદ અને સ્થાનિક પોલીસ મથકે લેખિત અરજી.`,
      actionSteps: ['૧૯૩૦ પર કોલ કરો', 'ઝીરો એફઆઈઆર નોંધાવો'],
      legalPoints: ['BNS ૩૧૮(૪)', 'BNSS ૧૭૩']
    };
  }

  // 7. Global Languages: Spanish, French, German, Arabic, Chinese
  if (isSpanish) {
    return {
      directAnswer: 'Este caso constituye un delito procesable bajo la Bharatiya Nyaya Sanhita (BNS) y la Constitución de la India.',
      categorization: 'Fraude y Protección Constitucional de Derechos',
      detectedLanguage: 'Spanish (Español)',
      empatheticReassurance: 'El marco jurídico indio ofrece remedios claros y expeditos. Actúe de inmediato con las salvaguardas legales.',
      applicableSections: [
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Sección 318(4) (Fraude/Estafa)',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Sección 173 (Zero FIR)',
        'Constitución de la India - Artículos 14 y 21'
      ],
      constitutionalRights: [
        'Artículo 21 - Derecho a la Vida, Libertad Personal y Debido Proceso',
        'Artículo 14 - Igualdad ante la Ley y Protección contra la Arbitrariedad'
      ],
      actionPlan: [
        'Reportar de inmediato a la línea de ciberdelitos 1930 o en cybercrime.gov.in',
        'Presentar una Zero FIR bajo la Sección 173 del BNSS en la estación policial más cercana',
        'Emitir notificación formal por escrito a la entidad bancaria para congelar transacciones'
      ],
      proceduralSafeguards: [
        'La policía no puede negar el registro de un Zero FIR por motivos de jurisdicción territorial',
        'Tiene derecho constitucional a ser asesorado por un abogado defensor de su elección'
      ],
      reply: `### Estrategia y Dictamen Jurídico:
1. **Identificación Legal:** Constituye una ofensa penal bajo la Sección 318(4) del BNS 2023.
2. **Estatutos y Derechos:** BNS 318(4), BNSS 173 (Zero FIR universal) y garantías del Artículo 21.
3. **Plan de Acción:** Denuncia en 1930, retención bancaria y asesoría legal formal.`,
      actionSteps: ['Llamar al 1930', 'Registrar Zero FIR bajo BNSS 173'],
      legalPoints: ['BNS Sec. 318(4)', 'BNSS Sec. 173']
    };
  }

  if (isFrench) {
    return {
      directAnswer: 'Cette affaire relève d\'une infraction punissable en vertu du Bharatiya Nyaya Sanhita (BNS) et de la Constitution indienne.',
      categorization: 'Fraude et Protection des Droits Fondamentaux',
      detectedLanguage: 'French (Français)',
      empatheticReassurance: 'Le cadre juridique garantit une protection stricte de vos droits. Suivez les étapes statutaires immédiates.',
      applicableSections: [
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Section 318(4) (Escroquerie)',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Section 173 (Zero FIR)',
        'Constitution de l\'Inde - Articles 14 & 21'
      ],
      constitutionalRights: [
        'Article 21 - Droit à un procès équitable et à la liberté individuelle',
        'Article 14 - Égalité devant la loi'
      ],
      actionPlan: [
        'Signaler immédiatement sur la ligne d\'assistance cybernétique 1930',
        'Déposer un Zero FIR auprès de tout commissariat selon l\'article 173 du BNSS',
        'Aviser la banque par écrit pour geler les comptes suspects'
      ],
      proceduralSafeguards: [
        'La police a l\'obligation légale d\'enregistrer le Zero FIR sans prétexte de compétence territoriale',
        'Droit à l\'assistance d\'un avocat qualifié'
      ],
      reply: `### Stratégie Juridique et Plan d'Action:
1. **Qualification de l'infraction:** Infraction caractérisée sous l'article 318(4) du BNS 2023.
2. **Lois applicables:** BNS Section 318(4), BNSS Section 173 (Zero FIR) et Article 21 constitutionnel.
3. **Actions immédiates:** Appel au 1930 et notification officielle écrite.`,
      actionSteps: ['Appeler le 1930', 'Enregistrer un Zero FIR'],
      legalPoints: ['BNS Sec. 318(4)', 'BNSS Sec. 173']
    };
  }

  if (isGerman) {
    return {
      directAnswer: 'Dies stellt eine unmittelbare Straftat nach dem indischen Bharatiya Nyaya Sanhita (BNS) und der Verfassung dar.',
      categorization: 'Betrug und Grundrechtsschutz',
      detectedLanguage: 'German (Deutsch)',
      empatheticReassurance: 'Das indische Recht bietet klare Schutzmechanismen. Handeln Sie unverzüglich.',
      applicableSections: [
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Abschnitt 318(4) (Betrug)',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Abschnitt 173 (Zero FIR)',
        'Verfassung Indiens - Artikel 14 & 21'
      ],
      constitutionalRights: [
        'Artikel 21 - Recht auf faires Verfahren und persönliche Freiheit',
        'Artikel 14 - Gleichheit vor dem Gesetz'
      ],
      actionPlan: [
        'Sofortige Meldung an die Cyber-Helpline 1930',
        'Einreichung einer Zero FIR nach BNSS Abschnitt 173 auf jeder Polizeiwache',
        'Schriftliche Aufforderung an die Bank zur Kontosperrung'
      ],
      proceduralSafeguards: [
        'Die Polizei darf die Aufnahme einer Zero FIR nicht verweigern',
        'Grundrecht auf rechtlichen Beistand durch einen Rechtsanwalt'
      ],
      reply: `### Rechtliche Bewertung und Handlungsempfehlung:
1. **Einordnung:** Straftatbestand nach BNS 2023 Abschnitt 318(4).
2. **Gesetze:** BNS 318(4), BNSS 173 (Zero FIR) und Artikel 21.
3. **Sofortmaßnahmen:** Meldung bei der Notrufnummer 1930 und Einreichung der FIR.`,
      actionSteps: ['Notruf 1930 wählen', 'Zero FIR einreichen'],
      legalPoints: ['BNS 318(4)', 'BNSS 173']
    };
  }

  if (isArabic) {
    return {
      directAnswer: 'تشكل هذه الواقعة جريمة يعاقب عليها القانون بموجب مدونة بهاراتيا نيايا سانهيتا (BNS) ودستور الهند.',
      categorization: 'الاحتيال وحماية الحقوق الدستورية',
      detectedLanguage: 'Arabic (العربية)',
      empatheticReassurance: 'القانون يمنحك وسائل حماية قانونية واضحة ومباشرة. بادر باتخاذ الإجراءات النظامية فوراً.',
      applicableSections: [
        'قانون BNS لعام 2023 - المادة 318(4) (الاحتيال)',
        'قانون BNSS لعام 2023 - المادة 173 (تسجيل بلاغ Zero FIR)',
        'دستور الهند - المادتان 14 و21'
      ],
      constitutionalRights: [
        'المادة 21 من الدستور - الحق في المحاكمة العادلة والحرية الشخصية',
        'المادة 14 من الدستور - المساواة أمام القانون'
      ],
      actionPlan: [
        'الاتصال فوراً بالرقم الوطني لمكافحة الجرائم الإلكترونية 1930',
        'تسجيل بلاغ (Zero FIR) بموجب المادة 173 من قانون BNSS في أي قسم شرطة',
        'مخاطبة البنك كتابياً لتجميد الحسابات المشتبه بها'
      ],
      proceduralSafeguards: [
        'لا يحق للشرطة الامتناع عن تسجيل بلاغ Zero FIR بحجة الاختصاص المكاني',
        'حقك الدستوري في توكيل محام للدفاع عن مصالحك'
      ],
      reply: `### الاستراتيجية والتحليل القانوني:
1. **التكييف القانوني:** جريمة معاقب عليها بموجب المادة 318(4) من قانون BNS 2023.
2. **النصوص الواجبة التطبيق:** مادة 318(4) BNS ومادة 173 BNSS (بلاغ بلا قيد اختصاص) وحماية المادة 21.
3. **خطة العمل السريعة:** إبلاغ 1930 وتجميد المعاملات البنكية فوراً.`,
      actionSteps: ['الاتصال بالرقم 1930', 'تسجيل بلاغ Zero FIR'],
      legalPoints: ['BNS 318(4)', 'BNSS 173']
    };
  }

  if (isChinese) {
    return {
      directAnswer: '根据《印度新刑法典 (BNS)》及《印度宪法》，该事项构成可直接采取法律行动的重大刑事/民事违法行为。',
      categorization: '刑事欺诈与宪法基本权利保护',
      detectedLanguage: 'Mandarin Chinese (中文)',
      empatheticReassurance: '法律为您提供了明确的救济渠道，请迅速依据法定程序启动维权。',
      applicableSections: [
        '印度新刑法典 (BNS 2023) 第 318(4) 条（欺诈罪）',
        '印度刑事诉讼安全法典 (BNSS 2023) 第 173 条（跨辖区零立案 Zero FIR）',
        '印度宪法第 14 条与第 21 条'
      ],
      constitutionalRights: [
        '宪法第 21 条 - 人身自由与正当法律程序保障',
        '宪法第 14 条 - 法律面前人人平等'
      ],
      actionPlan: [
        '立即拨打国家网络犯罪专线 1930 或登录 cybercrime.gov.in 进行报案',
        '依据 BNSS 第 173 条在就近警局申请“零立案 (Zero FIR)”并获取回执',
        '向开户银行发送书面申请紧急冻结涉案账户'
      ],
      proceduralSafeguards: [
        '警方不得以属地管辖权为由拒绝受理 Zero FIR 立案',
        '您拥有获得执业律师法律代理的宪法权利'
      ],
      reply: `### 法律分析与行动策略：
1. **定性认定:** 依据 BNS 2023 第 318(4) 条构成刑事欺诈罪。
2. **适用法律与权利:** BNS 第 318(4) 条、BNSS 第 173 条（Zero FIR 跨辖区保护）及宪法第 21 条。
3. **紧急行动步骤:** 拨打 1930 专线并书面通知银行止付，保存全部电子证据（BSA 63条标准）。`,
      actionSteps: ['拨打 1930 网络犯罪热线', '办理 Zero FIR 跨辖区报案'],
      legalPoints: ['BNS 第 318(4) 条', 'BNSS 第 173 条']
    };
  }

  // 3. Specific Domain: Cyber Fraud / Cheating / Financial Scam
  if (q.includes('fraud') || q.includes('scam') || q.includes('cyber') || q.includes('cheating') || q.includes('upi') || q.includes('phishing')) {
    return {
      directAnswer: 'This constitutes a direct cognizable criminal offense of Cyber Fraud and Cheating under Bharatiya Nyaya Sanhita (BNS) Section 318(4) and Information Technology Act Section 66D.',
      categorization: 'Cyber Fraud, Identity Theft & Criminal Cheating',
      detectedLanguage: 'English',
      empatheticReassurance: 'Act immediately within the "Golden Hour" — quick statutory reporting directly enables bank account lien freezes and asset recovery.',
      applicableSections: [
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Section 318(4) (Cheating & Dishonestly Inducing Delivery of Property) [Legacy IPC Section 420]',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Section 173 (Mandatory Zero FIR / e-FIR registration)',
        'Information Technology Act 2000 - Section 66D (Cheating by Personation using Computer Resource)',
        'Bharatiya Sakshya Adhiniyam (BSA) 2023 - Section 63 (Admissibility of Electronic Records and Digital Certificate)'
      ],
      constitutionalRights: [
        'Article 21 of the Constitution of India - Right to Fair Investigation, Due Process, and Protection of Livelihood',
        'Article 14 - Right to Equality & Protection against Arbitrary Inaction by Law Enforcement'
      ],
      actionPlan: [
        'Immediately dial the National Cybercrime Helpline 1930 to register the financial transaction and trigger the Indian Cyber Crime Coordination Centre (I4C) automated lien freeze on the beneficiary bank account',
        'Lodge a formal incident report on cybercrime.gov.in and obtain the official Acknowledgement Number (C-URN)',
        'Approach the nearest police station or cyber cell to register a Zero FIR under BNSS Section 173 regardless of geographical jurisdiction',
        'Send an email to the Nodal Grievance Officer of your bank citing RBI Master Direction on Customer Protection (Limiting Liability in Unauthorized Electronic Banking Transactions)'
      ],
      proceduralSafeguards: [
        'Under BNSS Section 173, police officers cannot refuse to lodge a First Information Report (Zero FIR) on grounds of territorial jurisdiction',
        'If the officer refuses registration, invoke BNSS Section 175(3) by sending the complaint to the Superintendent of Police (SP) by registered post, or approach the Judicial Magistrate under BNSS Section 175(3)/223',
        'Preserve all electronic proof with metadata intact for formal Section 63 BSA electronic evidence certification'
      ],
      reply: `### Direct Legal Identification & Offense Categorization
This matter constitutes a cognizable criminal offense:
- **Offense:** Criminal Cheating, Impersonation, and Cyber Deception.
- **Statutes:** **Bharatiya Nyaya Sanhita (BNS) 2023, Section 318(4)** (punishable with rigorous imprisonment up to 7 years and fine) read with **Section 66D of the Information Technology Act, 2000** (imprisonment up to 3 years).
- **Legacy Law Mapping:** Corresponds to legacy Indian Penal Code (IPC) Section 420 for offenses occurring prior to July 1, 2024.

---

### Constitutional & Statutory Protection
1. **Zero FIR Obligation (BNSS Section 173):** Any police station is legally bound to register an information disclose of a cognizable crime as a Zero FIR and immediately transfer it to the jurisdictional station.
2. **Right to Fair Investigation (Constitution of India, Article 21):** The Supreme Court has repeatedly affirmed in *Lalita Kumari v. Govt. of U.P.* that registration of FIR is mandatory where information discloses the commission of a cognizable offense.
3. **Digital Evidence Integrity (BSA 2023 Section 63):** Electronic logs, SMS alerts, UPI transaction reference numbers, and WhatsApp chats are primary admissible records when supported by a Section 63 certificate.

---

### Step-by-Step Strategic Action Plan
1. **Golden Hour Helpline (Call 1930):** Ring the 1930 portal right now. Provide the beneficiary account number, transaction reference ID, and debit timestamp to halt inter-bank fund diversion.
2. **File Online Complaint:** Submit a complaint on [cybercrime.gov.in](https://cybercrime.gov.in) under the "Financial Fraud" category and download the PDF acknowledgment.
3. **Zero FIR Registration:** Present the acknowledgment at your nearest police station. Request a free copy of the FIR under **BNSS Section 173(2)**.
4. **Bank Zero-Liability Claim:** Under RBI circular on Unauthorized Electronic Banking Transactions, reporting unauthorized electronic debits within 3 working days protects you from bearing financial liability.

---

### Procedural Safeguards Under BNSS
- **No Arbitrary Refusal:** If an SHO declines to register your FIR, you have the statutory right under **BNSS Section 175(3)** to write directly to the Superintendent of Police (SP), who is mandated either to investigate or direct an officer subordinate to investigate.
- **Magistrate Recourse:** You can file a formal application under **BNSS Section 175(3)** before the Judicial Magistrate to compel registration.`,
      actionSteps: [
        'Dial 1930 immediately to freeze fraudulent beneficiary transfers',
        'File report on cybercrime.gov.in and obtain acknowledgement number',
        'Register Zero FIR under BNSS Section 173 at nearest police station',
        'Issue formal liability dispute letter to bank citing RBI Customer Protection guidelines'
      ],
      legalPoints: [
        'BNS 2023 Section 318(4) (Cheating) [replaces IPC 420]',
        'BNSS 2023 Section 173 (Zero FIR mandate)',
        'IT Act Section 66D (Computer personation fraud)',
        'Article 21 Constitution of India (Due process & fair investigation)'
      ]
    };
  }

  // 4. Specific Domain: Theft / Extortion / Robbery
  if (q.includes('theft') || q.includes('stolen') || q.includes('robbery') || q.includes('extort') || q.includes('snatch') || q.includes('blackmail')) {
    return {
      directAnswer: 'This is a direct criminal offense of Theft and/or Extortion under Bharatiya Nyaya Sanhita (BNS) Sections 303, 308, and 309, requiring immediate police registration via Zero FIR.',
      categorization: 'Offenses Against Property & Personal Safety (Theft, Extortion & Robbery)',
      detectedLanguage: 'English',
      empatheticReassurance: 'Take immediate steps to report the crime. Police are mandated to register a Zero FIR under BNSS without territorial hesitation.',
      applicableSections: [
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Section 303(2) (Theft) [replaces IPC Section 379]',
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Section 308 (Extortion & Blackmail) [replaces IPC Section 383/384]',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Section 173 (Zero FIR & Electronic Information / e-FIR)',
        'Bharatiya Sakshya Adhiniyam (BSA) 2023 - Section 63 (Electronic Records & CCTV Footage)'
      ],
      constitutionalRights: [
        'Article 21 of the Constitution of India - Right to Life, Personal Security, and Property Rights under Article 300A',
        'Article 20(1) - Protection in respect of conviction for offenses'
      ],
      actionPlan: [
        'Visit the nearest police station immediately or file an e-FIR via your State Police Citizen Portal under BNSS Section 173',
        'Demand registration of a Zero FIR if the occurrence took place outside that station\'s local limits',
        'Obtain a signed and stamped copy of the FIR free of charge under BNSS Section 173(2)',
        'Collect and preserve all CCTV recordings, witness contact numbers, and IMEI numbers or invoices'
      ],
      proceduralSafeguards: [
        'Under BNSS Section 173, no police station can refuse to record information regarding theft or extortion on jurisdictional grounds',
        'Police must provide an unconditional, free signed copy of the FIR to the complainant immediately',
        'In case of extortion or harassment, communicate exclusively through recorded written channels'
      ],
      reply: `### Direct Legal Identification & Categorization
- **Offense:** Theft under **BNS Section 303(2)** (imprisonment up to 3 years) or Extortion under **BNS Section 308** (imprisonment up to 7 years and fine).
- **Constitutional Dimension:** Direct infringement of your right to security and lawful possession under **Article 21 and Article 300A** of the Constitution of India.

---

### Applicable Statutory Provisions
1. **BNS 2023 Section 303(2) [Legacy IPC 379]:** Dishonestly taking moveable property out of lawful possession without consent.
2. **BNS 2023 Section 308 [Legacy IPC 384]:** Intentionally putting any person in fear of injury or extortion to induce property delivery.
3. **BNSS 2023 Section 173 [Legacy CrPC 154]:** Mandatory registration of FIR / Zero FIR.

---

### Step-by-Step Strategic Action Plan
1. **Immediate Zero FIR Registration:** Approach the nearest police station. State clearly: *"Under BNSS Section 173, I am lodging a Zero FIR for a cognizable theft/extortion offense."*
2. **Collect FIR Copy:** Demand your statutory free copy under BNSS Section 173(2). Do not accept a mere "General Diary (GD)" entry if property was stolen or extortion threatened.
3. **Secure Evidence:** Secure all CCTV footage within 24 hours before systems overwrite footage. Preserve screenshots and phone records with metadata under BSA Section 63.
4. **CEIR Blocking (for Mobile Devices):** Block stolen mobile phones via Central Equipment Identity Register ([ceir.gov.in](https://ceir.gov.in)) using the FIR number and IMEI.`,
      actionSteps: [
        'Lodge Zero FIR under BNSS Section 173 at the nearest police station',
        'Insist on free stamped FIR copy under BNSS Section 173(2)',
        'Preserve CCTV, IMEI, and witness evidence under BSA Section 63',
        'Block stolen devices via ceir.gov.in'
      ],
      legalPoints: [
        'BNS Section 303(2) (Theft)',
        'BNS Section 308 (Extortion)',
        'BNSS Section 173 (Zero FIR mandate)',
        'Article 300A (Right to Property)'
      ]
    };
  }

  // 5. Specific Domain: Police Arrest / Interrogation / Harassment Safeguards
  if (q.includes('arrest') || q.includes('police') || q.includes('custody') || q.includes('interrogat') || q.includes('fir against me') || q.includes('bail')) {
    return {
      directAnswer: 'You are protected by mandatory statutory procedural safeguards under Bharatiya Nagarik Suraksha Sanhita (BNSS) Sections 35, 37, 43, and 482, and Articles 20, 21, and 22 of the Constitution of India.',
      categorization: 'Criminal Procedure, Police Powers & Constitutional Arrest Safeguards',
      detectedLanguage: 'English',
      empatheticReassurance: 'Do not panic. Indian jurisprudence strictly curtails arbitrary police arrest and guarantees your immediate right to legal counsel.',
      applicableSections: [
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Section 35 (Notice of Appearance before Arrest for offenses up to 7 years) [replaces CrPC 41A]',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Section 37 (Designated Police Officer & Arrest Display)',
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Section 482 / 480 (Anticipatory Bail & Regular Bail) [replaces CrPC 438/437]',
        'Constitution of India - Article 20(3) (Right against Self-Incrimination - No one can be compelled to be a witness against himself)',
        'Constitution of India - Article 22(1) (Right to consult and be defended by a legal practitioner of choice)',
        'Constitution of India - Article 22(2) (Mandatory production before nearest Magistrate within 24 hours of arrest)'
      ],
      constitutionalRights: [
        'Article 21 - Protection of Life & Personal Liberty; strict compliance with procedure established by law (Maneka Gandhi v. UOI)',
        'Article 22(1) - Right to be informed of grounds of arrest and consult legal counsel',
        'Article 22(2) - Right to be produced before a Magistrate within 24 hours exclusive of travel time'
      ],
      actionPlan: [
        'If receiving phone calls or notices, insist on a formal written Notice of Appearance under BNSS Section 35 specifying date and allegations',
        'If apprehending imminent arrest in a non-bailable offense, instruct counsel immediately to file an Anticipatory Bail application under BNSS Section 482 before the Sessions Court or High Court',
        'Inform a family member or trusted representative immediately upon being summoned or detained',
        'Exercise your constitutional right to silence on self-incriminating queries until your advocate is physically present'
      ],
      proceduralSafeguards: [
        'Arrest Memo: Police must prepare a formal Arrest Memo signed by at least one family member or respectable local witness',
        'Medical Examination: Mandatory medical examination under BNSS Section 53/54 upon arrest to document physical condition',
        'Female Accused: Women can only be arrested by female police officers and between sunrise and sunset, except with prior written judicial permission',
        'Notice under BNSS Section 35: For offenses punishable with 7 years or less, arrest is an exception; issuance of a notice of appearance is the statutory norm (Arnesh Kumar guidelines codified)'
      ],
      reply: `### Direct Legal Rights & Constitutional Safeguards
You have ironclad constitutional and statutory protections under the **Constitution of India** and **BNSS 2023**:

1. **Right to Legal Counsel (Article 22(1)):** You have the unfettered fundamental right to consult and be defended by an advocate of your choice during interrogation.
2. **Right to Remain Silent (Article 20(3)):** You cannot be compelled to confess or make self-incriminating statements. Forced confessions made to police officers are inadmissible under **BSA Section 23**.
3. **BNSS Section 35 Notice Requirement [Legacy CrPC 41A]:** For any offense carrying a maximum punishment of 7 years or less, police *must* issue a written Notice of Appearance rather than effecting a custodial arrest, unless exceptional reasons are recorded in writing.
4. **Production within 24 Hours (Article 22(2) & BNSS Section 57):** Detention beyond 24 hours without a Magistrate's order of remand is strictly unconstitutional and constitutes illegal confinement actionable under Habeas Corpus (Article 32/226).

---

### Step-by-Step Strategic Roadmap
1. **Demand Written Notice:** If police ask you to appear, state respectfully: *"Please serve a formal notice under BNSS Section 35 with the case details."*
2. **Move for Anticipatory Bail:** If a non-bailable FIR is lodged, your advocate can urgently move the Sessions Court or High Court under **BNSS Section 482** for pre-arrest protection.
3. **Mandatory Arrest Memo & Phone Call:** If detained, the officer must sign an Arrest Memo with the time, place, and date, and allow you to notify one nominated person immediately.
4. **Independent Medical Exam:** Insist on an independent medical checkup to create an official paper trail of your physical state.`,
      actionSteps: [
        'Insist on written Notice of Appearance under BNSS Section 35',
        'Contact an enrolled advocate immediately to file for anticipatory bail under BNSS Section 482',
        'Invoke Article 20(3) right against self-incrimination during questioning',
        'Ensure family is notified and demand production before Magistrate within 24 hours'
      ],
      legalPoints: [
        'BNSS Section 35 (Arrest restrictions for offenses <= 7 yrs)',
        'BNSS Section 482 (Anticipatory Bail)',
        'Article 20(3) (Right against self-incrimination)',
        'Article 22(1) & (2) (Right to counsel & 24h production)'
      ]
    };
  }

  // 6. Specific Domain: Cheque Bounce / Commercial Dispute / Statutory Notice
  if (q.includes('cheque') || q.includes('138') || q.includes('promissory') || q.includes('dishonour') || (docContext && docContext.includes('138'))) {
    return {
      directAnswer: 'This matter is governed strictly by Section 138 of the Negotiable Instruments Act, 1881 and Section 318(4) of Bharatiya Nyaya Sanhita, 2023. You have a strict 15-day statutory window from the date of notice receipt to act.',
      categorization: 'Negotiable Instruments & Commercial Cheque Dishonour',
      detectedLanguage: 'English',
      empatheticReassurance: 'Receiving a Section 138 notice is not a court judgment. It is a mandatory statutory demand period where an articulate legal reply can completely extinguish bad-faith litigation.',
      applicableSections: [
        'Negotiable Instruments Act, 1881 - Section 138 (Dishonour of Cheque for Insufficiency of Funds)',
        'Negotiable Instruments Act, 1881 - Section 139 (Presumption in Favour of Holder - Rebuttable on Preponderance of Probabilities)',
        'Negotiable Instruments Act, 1881 - Section 143A (Interim Compensation)',
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Section 318(4) (Cheating) [replaces IPC 420]',
        'Bharatiya Sakshya Adhiniyam (BSA) 2023 - Section 63 (Digital Bank Return Memos & Electronic Communications)'
      ],
      constitutionalRights: [
        'Article 19(1)(g) - Right to Practice Any Profession or Carry on Any Trade or Business',
        'Article 21 - Right to Fair Trial & Legal Representation'
      ],
      actionPlan: [
        'Verify the exact date of physical delivery / postal receipt. The 15-day clock begins strictly on the date of receipt, not the date typed on the notice',
        'Prepare a formal statutory reply through an enrolled advocate within the 15-day window',
        'Specifically plead that the cheque was handed over as an undated security instrument and that no legally enforceable debt existed on the date of presentment',
        'Retrieve bank ledger statements, delivery slips, and ledger acknowledgments to rebut the statutory presumption under Section 139 NI Act'
      ],
      proceduralSafeguards: [
        'Under Section 142 NI Act, the complainant cannot file a court case before the complete 15-day cure period expires',
        'Presumption under Section 139 is rebuttable by standard of preponderance of probabilities (Rangappa v. Sri Mohan)',
        'Territorial jurisdiction is strictly confined to the court within whose jurisdiction the payee bank branch is situated'
      ],
      reply: `### Direct Legal Identification & Analysis
This inquiry relates to proceedings under **Section 138 of the Negotiable Instruments Act, 1881 (NI Act)**:
- **Nature of Proceeding:** Quasi-criminal. It carries a penalty of imprisonment up to 2 years, or fine up to double the cheque amount, or both.
- **Critical Timeline:** You have exactly **15 calendar days** from the date you received the statutory notice to pay or dispatch a formal legal reply.

---

### Key Legal Provisions & Rebuttal Strategy
1. **Legally Enforceable Debt Requirement:** For an offense under Section 138, the cheque must have been issued in discharge of a *legally enforceable debt or other liability*. If issued as security for an unfulfilled transaction or under coercion, no criminal liability attaches.
2. **Rebutting Section 139 Presumption:** The statutory presumption that the holder received the cheque for debt discharge is **rebuttable**. You do not need proof beyond reasonable doubt; demonstrating a probable defense (preponderance of probabilities) is sufficient (*Rangappa v. Sri Mohan*).
3. **Mandatory 15-Day Reply:** Never ignore a Section 138 notice. Failure to reply allows the complainant to claim in court that you had no defense at the earliest opportunity.

---

### Step-by-Step Strategic Roadmap
1. **Preserve the Postal Envelope:** Save the Speed Post tracking receipt and envelope showing the exact date of delivery.
2. **Issue Reply Notice within 15 Days:** Engage an advocate to issue a registered reply denying liability, highlighting failure of consideration, and establishing that the cheque was a security instrument.
3. **Compile Defense Evidence:** Assemble the underlying contract, bank statements, and email/WhatsApp records with a Section 63 BSA certificate.`,
      actionSteps: [
        'Calculate 15 days from the exact date the notice was physically delivered',
        'Instruct an advocate to issue a comprehensive registered reply notice within 15 days',
        'Compile bank statements and contracts proving the cheque was a security instrument',
        'Preserve all tracking receipts and postal covers'
      ],
      legalPoints: [
        'Section 138 NI Act (15-day statutory window)',
        'Section 139 NI Act (Rebuttable presumption)',
        'Section 142 NI Act (Territorial jurisdiction)'
      ]
    };
  }

  // 7. Specific Domain: Property / Tenancy / Contractual Breach
  if (q.includes('rent') || q.includes('lease') || q.includes('tenant') || q.includes('landlord') || q.includes('evict') || q.includes('deposit') || q.includes('contract')) {
    return {
      directAnswer: 'Unilateral eviction, lockouts, utility cut-offs, or arbitrary forfeiture of security deposits are unlawful under the Transfer of Property Act, 1882, Indian Contract Act, 1872, and Consumer Protection Act, 2019.',
      categorization: 'Tenancy Rights, Property Law & Contractual Enforcement',
      detectedLanguage: 'English',
      empatheticReassurance: 'Tenancy laws and civil jurisprudence strictly bar landlords from extra-judicial self-help remedies like locking doors or cutting water/power.',
      applicableSections: [
        'Transfer of Property Act, 1882 - Section 106 (Mandatory 15 to 30 days written notice of termination)',
        'Transfer of Property Act, 1882 - Section 108 (Rights & Liabilities of Lessor and Lessee)',
        'Indian Contract Act, 1872 - Section 73 (Compensation for loss or damage caused by breach of contract)',
        'Consumer Protection Act, 2019 - Section 2(46) (Unfair Contract Terms & Arbitrary Forfeiture Clauses)',
        'Bharatiya Nyaya Sanhita (BNS) 2023 - Section 329 (Criminal Trespass) & Section 351 (Criminal Intimidation)'
      ],
      constitutionalRights: [
        'Article 21 of the Constitution of India - Right to Shelter as an integral facet of Right to Life (Chameli Singh v. State of U.P.)',
        'Article 14 - Protection against Arbitrary Exploitation and One-Sided Clauses'
      ],
      actionPlan: [
        'Inspect your registered lease agreement for notice periods and deposit refund terms',
        'Issue a formal written legal notice demanding refund of deposit within 15 days or cessation of harassment',
        'If essential utilities (water, power) are disconnected, lodge an immediate police complaint under BNS Section 329/351 and file an urgent interim application before the Rent Authority',
        'Take timestamped photos and video walkthroughs of the apartment upon vacating to disprove false structural damage claims'
      ],
      proceduralSafeguards: [
        'No landlord can dispossess a tenant without a valid decree from a competent Rent Authority / Civil Court',
        'Security deposit deductions can only be made for actual, documented damage beyond normal wear and tear',
        'Unilateral lock changes without judicial orders constitute criminal trespass under BNS'
      ],
      reply: `### Direct Legal Identification & Rights Breakdown
- **Legal Standing:** Extra-judicial eviction, unilateral termination without statutory notice, or arbitrary withholding of security deposits violates settled property jurisprudence and **Article 21 (Right to Shelter)**.
- **Due Process Requirement:** The Supreme Court has repeatedly held that even an unauthorized occupant or tenant whose lease has expired cannot be evicted except through **due process of law** (*Bishandas v. State of Punjab*).

---

### Applicable Statutes
1. **Transfer of Property Act (Section 106):** Requires a minimum of 15 days written notice for monthly tenancies and 6 months for agricultural/manufacturing leases.
2. **Indian Contract Act (Section 73):** Forfeiture of deposit without proving actual financial damage is an illegal penalty.
3. **Consumer Protection Act 2019 (Section 2(46)):** Protects individuals against one-sided, onerous contractual terms.

---

### Step-by-Step Strategic Roadmap
1. **Document Every Payment:** Compile bank/UPI statements proving timely rent payments and initial deposit transfer.
2. **Issue Formal Notice:** If deposit is unlawfully withheld, have an advocate dispatch a formal demand notice granting 15 days, with interest at 18% p.a.
3. **Emergency Injunction:** If facing an illegal eviction threat, file for an emergency temporary injunction under **Order 39 Rules 1 & 2 of the Code of Civil Procedure (CPC)** or approach the local Rent Controller.`,
      actionSteps: [
        'Review lease agreement notice clauses and deposit terms',
        'Issue formal 15-day statutory demand notice through counsel for deposit refund',
        'File for emergency injunction under CPC Order 39 if facing extra-judicial eviction',
        'Preserve all payment receipts and handover inspection footage'
      ],
      legalPoints: [
        'Section 106 Transfer of Property Act',
        'Indian Contract Act Section 73 (Unlawful penalties)',
        'Article 21 (Right to Shelter)',
        'CPC Order 39 Rules 1 & 2 (Injunctive relief)'
      ]
    };
  }

  // 8. Constitutional Writs & Fundamental Rights
  if (q.includes('writ') || q.includes('constitution') || q.includes('fundamental right') || q.includes('article 32') || q.includes('article 226') || q.includes('habeas') || q.includes('mandamus')) {
    return {
      directAnswer: 'You have direct recourse to the High Court under Article 226 and the Supreme Court under Article 32 of the Constitution of India for enforcement of Fundamental Rights via Constitutional Writs.',
      categorization: 'Constitutional Jurisprudence & Extraordinary Writ Jurisdiction',
      detectedLanguage: 'English',
      empatheticReassurance: 'The Constitution provides extraordinary remedies directly through High Courts and the Supreme Court against illegal state actions.',
      applicableSections: [
        'Constitution of India - Article 32 (Remedies for enforcement of Fundamental Rights by Supreme Court - Heart and Soul of Constitution)',
        'Constitution of India - Article 226 (Power of High Courts to issue Writs for Fundamental Rights and any other legal purpose)',
        'Habeas Corpus (Produce the body against illegal detention)',
        'Mandamus (Command public authority to perform statutory duty)',
        'Certiorari (Quash unlawful quasi-judicial or tribunal orders)',
        'Prohibition (Restrain lower courts from exceeding jurisdiction)',
        'Quo Warranto (Challenge unlawful usurpation of public office)'
      ],
      constitutionalRights: [
        'Article 14 - Right to Equality and Non-Arbitrariness',
        'Article 19 - Fundamental Freedoms (Speech, Assembly, Association, Movement)',
        'Article 21 - Protection of Life and Personal Liberty'
      ],
      actionPlan: [
        'Establish that the violating entity qualifies as "State" under Article 12 or performs public duties',
        'Identify the exact Fundamental Right infringed (e.g., Article 14 arbitrary action, Article 21 livelihood or liberty)',
        'File a Writ Petition under Article 226 before the jurisdictional High Court',
        'Seek urgent interim stay or directions under the writ jurisdiction'
      ],
      proceduralSafeguards: [
        'Writ petitions do not require exhaustive trial; they are adjudicated on affidavits and verified records',
        'High Court powers under Article 226 are wider than Supreme Court under Article 32 (covers "any other purpose")',
        'In cases of illegal detention, Habeas Corpus petitions are given highest emergency judicial priority'
      ],
      reply: `### Constitutional Framework & Extraordinary Remedies
The Constitution of India guarantees direct judicial review against state excesses:

1. **Article 226 (High Courts):** Broader than Article 32; empowers the High Court to issue prerogative writs not only for violation of Fundamental Rights (Part III) but also for "any other purpose" (statutory violations, administrative arbitrariness).
2. **Article 32 (Supreme Court):** Known as the *heart and soul of the Constitution*, granting citizens the fundamental right to approach the apex court directly for Fundamental Rights enforcement.

---

### The Five Prerogative Writs
- **Habeas Corpus:** *"Produce the body"* — Quashes unlawful detention or police custody without judicial remand.
- **Mandamus:** *"We command"* — Directs a public official, police commissioner, or statutory body to execute a mandatory public duty they refused to perform.
- **Certiorari:** Quashes illegal orders passed by lower courts, tribunals, or executive bodies acting without jurisdiction or violating natural justice.
- **Prohibition:** Prevents an inferior court/tribunal from usurping jurisdiction it does not possess.
- **Quo Warranto:** Challenges an individual unlawfully occupying a public office.

---

### Action Roadmap
1. **Drafting the Petition:** Formulate a structured petition supported by a verification affidavit detailing the exact statutory or constitutional violation.
2. **Establish Absence of Efficacy in Alternative Remedy:** While alternative remedies exist, writ petitions are maintainable where Fundamental Rights are infringed or natural justice (*Audi Alteram Partem*) is violated.`,
      actionSteps: [
        'Identify specific Fundamental Right violated by state authority',
        'Prepare Writ Petition under Article 226 before High Court',
        'Serve advance copy on Government Pleader / Standing Counsel',
        'Mention before Bench for urgent interim relief'
      ],
      legalPoints: [
        'Article 226 (High Court Writ Powers)',
        'Article 32 (Supreme Court Enforcement of Fundamental Rights)',
        'Article 14 (Doctrine of Non-Arbitrariness)',
        'Article 21 (Right to Life & Due Process)'
      ]
    };
  }

  // 9. General Default Legal Consultation
  return {
    directAnswer: 'Your situation involves actionable legal rights governed by the Constitution of India, Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and civil statutes.',
    categorization: 'Indian Jurisprudence & General Legal Strategy',
    detectedLanguage: 'English',
    empatheticReassurance: 'Direct, strategic legal orientation is provided below. I will guide you through your exact legal standing and procedural safeguards.',
    applicableSections: [
      'Constitution of India - Article 14 (Equality & Non-Arbitrariness) & Article 21 (Personal Liberty & Due Process)',
      'Bharatiya Nyaya Sanhita (BNS) 2023 - Substantive criminal provisions (replaces IPC)',
      'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 - Criminal procedure, notices, and Zero FIR Section 173',
      'Bharatiya Sakshya Adhiniyam (BSA) 2023 - Section 63 (Digital evidence preservation)',
      'Specific civil/statutory codes (Contract Act, Consumer Protection Act 2019, NI Act)'
    ],
    constitutionalRights: [
      'Article 21 - Right to Life, Personal Liberty, and Fair Legal Redress',
      'Article 14 - Right to Fair and Equal Protection of the Law'
    ],
    actionPlan: [
      'Summarize the exact facts: dates, monetary amounts, communications, and involved parties',
      'Preserve all communications, receipts, and documents digitally under BSA Section 63 electronic certification standards',
      'Issue or respond to statutory notices within their respective time-limits (typically 15 to 30 days)',
      'Consult an enrolled advocate for formal representation in judicial or regulatory forums'
    ],
    proceduralSafeguards: [
      'Right to natural justice: no adverse order can be passed without affording a reasonable opportunity to be heard (Audi Alteram Partem)',
      'Right to certified free copies of police complaints/FIRs under BNSS Section 173(2)',
      'Right to legal representation under the Advocates Act, 1961'
    ],
    reply: `### Direct Legal Solutions & Actionable Strategy
As your **AI Legal Advocate & Jurisprudence Expert**, here is your strategic roadmap under Indian law:

1. **Direct Categorization & Applicable Laws:**
   - **Constitutional Foundation:** All citizen-state and civil interactions are anchored in **Articles 14 and 21 of the Constitution of India**, guaranteeing non-arbitrary treatment, due process, and fair hearings.
   - **Substantive & Procedural Law:** Substantive criminal acts fall under the **Bharatiya Nyaya Sanhita (BNS) 2023**, while procedural safeguards and police actions are regulated by the **Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023**.
   - **Digital Evidence:** All communications (WhatsApp, emails, UPI logs, phone recordings) must be preserved in accordance with **Bharatiya Sakshya Adhiniyam (BSA) 2023 Section 63**.

2. **Immediate Action Protocol:**
   - **Document Fact Matrix:** Create a chronological timeline of events with dates and witnesses.
   - **Timely Response:** For legal notices, draft an exhaustive written response through an advocate within 15 to 30 days. Never leave an adverse notice unanswered.
   - **Zero FIR Utility:** For any cognizable offense (theft, cybercrime, assault), register a Zero FIR under **BNSS Section 173** at any convenient police station.

3. **Procedural Safeguards:**
   - You have the absolute right to be informed of allegations in writing.
   - Police cannot detain or arrest without complying with **BNSS Section 35** and Constitutional Article 22 safeguards.`,
    actionSteps: [
      'Document a chronological timeline of facts and damages',
      'Preserve electronic records under Section 63 BSA standards',
      'Draft a formal legal notice or registered reply through an enrolled advocate'
    ],
    legalPoints: [
      'Constitution of India (Articles 14, 21, 226)',
      'Bharatiya Nyaya Sanhita (BNS) 2023',
      'Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023'
    ]
  };
}

// Export alias for existing imports
export const getOfflineLexiResponse = getOfflineAdvocateResponse;

export function getMockScannedDocumentAnalysis(fileName: string = 'Contract_Scan.jpg'): ScannedDocumentAnalysis {
  const isNotice = fileName.toLowerCase().includes('notice') || fileName.toLowerCase().includes('summons');
  const isLease = fileName.toLowerCase().includes('lease') || fileName.toLowerCase().includes('rent') || fileName.toLowerCase().includes('tenancy');

  if (isNotice) {
    return {
      id: `doc-${Date.now()}`,
      documentType: 'Statutory Legal Notice (Section 138 NI Act & BNS Demand)',
      originalFileName: fileName,
      extractedText: `LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881
To: [Recipient / Addressee]
From: Advocate R.K. Sharma, High Court of Judicature

Sir/Madam,
Under instructions from our client M/s Apex Enterprises Ltd., we hereby state:
1. That towards discharge of your acknowledged liability, you issued Cheque No. 448201 dated 12/08/2024 for Rs. 4,50,000/- drawn on HDFC Bank.
2. The said cheque was presented by our client but returned unpaid by the bank with the memo "FUNDS INSUFFICIENT" on 18/08/2024.
3. You are hereby called upon to pay the sum of Rs. 4,50,000/- within 15 (fifteen) days from the receipt of this notice, failing which our client will institute criminal proceedings under Section 138/142 of the Negotiable Instruments Act and Section 318(4) of the Bharatiya Nyaya Sanhita, 2023, at your sole risk, cost, and consequences.`,
      plainLanguageSummary: `This is a formal statutory legal notice under Section 138 of the Negotiable Instruments Act demanding payment of Rs. 4,50,000 for a dishonoured cheque. The law grants you a strict 15-day window from receipt to either pay or send a formal legal reply demonstrating that the cheque was a security instrument or that no legally enforceable debt existed.`,
      keyObligations: [
        {
          party: 'Recipient (You)',
          obligation: 'Pay demanded sum of Rs. 4,50,000 or issue formal written rebuttal notice',
          deadline: 'Strictly 15 calendar days from date of receipt'
        },
        {
          party: 'Claimant (Apex Enterprises)',
          obligation: 'Must wait until expiry of 15-day period before filing criminal complaint under Section 138',
          deadline: '30 days after expiry of 15-day cure notice'
        }
      ],
      riskFlags: [
        {
          level: 'high',
          clause: 'Failing which criminal proceedings will be instituted under Section 138 NI Act and Section 318(4) BNS',
          issue: 'Criminal complaint under Section 138 carries up to 2 years imprisonment or double cheque fine. Silence creates an adverse inference.',
          recommendation: 'Issue a formal registered reply through an advocate denying the debt, disputing consideration, and asserting the cheque was a security instrument.'
        },
        {
          level: 'medium',
          clause: 'Demand for additional interest and advocate fees (Rs. 15,000)',
          issue: 'Statutory notices frequently bundle unliquidated legal charges not mandated under Section 138.',
          recommendation: 'Refute ancillary fees while addressing the principal cheque balance.'
        }
      ],
      jurisdiction: 'Courts of competent jurisdiction where payee bank branch is situated',
      recommendedNextSteps: [
        'Preserve postal delivery slip and envelope to establish exact date of receipt',
        'Collect bank statements and underlying commercial correspondence proving nature of transaction',
        'Engage counsel to send a registered reply notice before day 15'
      ],
      analyzedAt: new Date().toLocaleDateString(),
      language: 'English'
    };
  }

  // Default Tenancy / Agreement Mock
  return {
    id: `doc-${Date.now()}`,
    documentType: 'Residential Lease & Tenancy Agreement',
    originalFileName: fileName,
    extractedText: `RESIDENTIAL LEASE AGREEMENT
BETWEEN: Sri V.K. Menon ("Lessor") AND [Tenant Name] ("Lessee")
CLAUSE 4: SECURITY DEPOSIT
The Lessee deposits Rs. 2,00,000/- as refundable interest-free deposit. Lessor may forfeit deposit at sole discretion if premises require renovation.
CLAUSE 8: LOCK-IN & TERMINATION
The lease has a mandatory lock-in period of 11 months. The Lessee may not terminate early; early departure obligates full rent payment for remaining term.
CLAUSE 12: UNILATERAL ENTRY & EVICTION
The Lessor reserves the right to repossess the apartment with 7 days notice if Lessee causes annoyance.
CLAUSE 16: INDEMNIFICATION
Lessee indemnifies Lessor against all third-party claims, structural repairs, and municipal levies.`,
    plainLanguageSummary: `This tenancy agreement contains multiple one-sided clauses that violate standard tenant protections under the Transfer of Property Act and Consumer Protection Act, including a clause permitting arbitrary deposit forfeiture, an inflexible 11-month lock-in, and an unlawful 7-day eviction clause.`,
    keyObligations: [
      {
        party: 'Tenant (Lessee)',
        obligation: 'Monthly rent payment by 5th of each month + mandatory 11-month lock-in rent',
        deadline: 'Monthly by 5th'
      },
      {
        party: 'Landlord (Lessor)',
        obligation: 'Provide peaceful quiet enjoyment and refund deposit upon vacating',
        deadline: 'Upon handover of keys'
      }
    ],
    riskFlags: [
      {
        level: 'high',
        clause: 'Lessor may forfeit deposit at sole discretion if premises require renovation (Clause 4)',
        issue: 'Grants unbridled power to withhold Rs. 2,00,000 for normal wear and tear, which the landlord is legally obligated to absorb.',
        recommendation: 'Amend clause to: "Deposit refundable within 7 days of handover, deductions limited only to documented physical damage caused by tenant negligence."'
      },
      {
        level: 'high',
        clause: 'Lessor reserves the right to repossess the apartment with 7 days notice (Clause 12)',
        issue: 'Unlawful under Transfer of Property Act Section 106. Seven days is grossly inadequate and violates due process.',
        recommendation: 'Replace with minimum 30 days written notice with specific cure period.'
      },
      {
        level: 'medium',
        clause: 'Mandatory 11-month lock-in obligating full term rent upon early departure (Clause 8)',
        issue: 'Unreasonable penalty in the event of job relocation or unforeseen family emergencies under Contract Act Section 73.',
        recommendation: 'Add mutual 1-month notice break-clause after 3 months without full forfeiture.'
      }
    ],
    jurisdiction: 'Local Rent Court / Civil Court of competent jurisdiction',
    recommendedNextSteps: [
      'Refuse to sign until Clauses 4, 8, and 12 are balanced with written amendments',
      'Insist that security deposit refund terms specify normal wear and tear exceptions',
      'Take photos of existing apartment flaws and attach an inventory list before signing'
    ],
    analyzedAt: new Date().toLocaleDateString(),
    language: 'English'
  };
}
