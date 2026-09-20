import { SupportedLanguage } from '../types';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    code: 'auto',
    name: 'Auto-Detect Language',
    nativeName: '🌐 English / हिन्दी Auto',
    speechCode: 'en-US',
    flagEmoji: '🌐',
  },
  {
    code: 'hi-en',
    name: 'Bilingual (English + हिन्दी)',
    nativeName: 'English + हिन्दी',
    speechCode: 'hi-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English (India/Global)',
    speechCode: 'en-IN',
    flagEmoji: '🇬🇧',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    speechCode: 'hi-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    speechCode: 'bn-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    speechCode: 'ta-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    speechCode: 'te-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    speechCode: 'mr-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    speechCode: 'gu-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    speechCode: 'kn-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    speechCode: 'ml-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    speechCode: 'pa-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    speechCode: 'or-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    speechCode: 'ur-IN',
    flagEmoji: '🇮🇳',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    speechCode: 'es-ES',
    flagEmoji: '🇪🇸',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    speechCode: 'fr-FR',
    flagEmoji: '🇫🇷',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    speechCode: 'de-DE',
    flagEmoji: '🇩🇪',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    speechCode: 'ar-SA',
    flagEmoji: '🇸🇦',
  },
  {
    code: 'zh',
    name: 'Mandarin Chinese',
    nativeName: '中文',
    speechCode: 'zh-CN',
    flagEmoji: '🇨🇳',
  },
];

export const getLanguageByCode = (code: string): SupportedLanguage => {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
};

export const getAdvocateWelcomeMessage = (langCode: string): string => {
  switch (langCode) {
    case 'hi-en':
      return `Welcome! I am your **Bilingual AI Legal Advocate** (अंग्रेजी और हिन्दी दोनों में सरल कानूनी सलाह)।\n\nमैं आपको **सरल और आसान भाषा में कानूनी सलाह** देता हूँ, जिसे कोई भी आम नागरिक आसानी से समझ सकता है — **भारत का संविधान**, **भारतीय न्याय संहिता (BNS)**, **BNSS** और **BSA** के तहत।\n\nकोई कठिन कानूनी शब्दजाल नहीं — सिर्फ स्पष्ट मार्गदर्शन और आसान कदम। आप मुझसे **English, हिन्दी, या Hinglish** में कभी भी पूछ या बोल सकते हैं (जैसे: *"खाता फ्रीज हो गया"*, *"साइबर फ्रॉड में पैसे कट गए"*, *"पुलिस FIR नहीं लिख रही"*).`;
    case 'hi':
      return `नमस्ते! मैं आपका **AI कानूनी सलाहकार (Legal Advocate)** हूँ।\n\nमेरा उद्देश्य कठिन कानूनी धाराओं को **बिल्कुल सरल, सीधी और आम बोलचाल की हिन्दी भाषा** में समझाना है ताकि हर नागरिक अपने अधिकारों को आसानी से जान और समझ सके।\n\nमैं **भारत के संविधान**, **भारतीय न्याय संहिता (BNS)**, **BNSS (जीरो एफआईआर)** और **BSA** के तहत पूरी कानूनी प्रक्रिया और आपके अधिकार समझाऊंगा। नीचे अपना सवाल बोलें या लिखें।`;
    case 'bn':
      return `আমি আপনার **আইনি উপদেষ্টা**।\n\nআমি জটিল আইনকে **সহজ ও স্পষ্ট ভাষায়** ব্যাখ্যা করি যাতে যে কোনো সাধারণ মানুষ সহজেই বুঝতে পারেন। ভারতের সংবিধান, BNS, BNSS এবং BSA অনুযায়ী আপনার অধিকার ও করণীয় সম্পর্কে জানতে নিচে প্রশ্ন করুন।`;
    case 'ta':
      return `நான் உங்கள் **சட்ட ஆலோசகர்** ஆவேன்.\n\nகடினமான சட்டங்களை **அனைவரும் எளிதில் புரிந்து கொள்ளும் எளிய மொழியில்** விளக்குகிறேன். இந்திய அரசியலமைப்பு, BNS, BNSS மற்றும் BSA சட்டங்களின்படி உங்கள் உரிமைகள் மற்றும் அடுத்த கட்ட நடவடிக்கைகள் பற்றி கேட்கலாம்.`;
    case 'te':
      return `నేను మీ **చట్టపరమైన సలహాదారుని**.\n\nఎవరైనా సులభంగా అర్థం చేసుకునేలా **స్పష్టమైన మరియు సరళమైన భాషలో** చట్టపరమైన సలహాలను అందిస్తాను. భారత రాజ్యాంగం, BNS, BNSS మరియు BSA ప్రకారం మీ హక్కులను తెలుసుకోవడానికి క్రింద అడగండి.`;
    case 'mr':
      return `मी आपला **कायदेशीर सल्लागार** आहे.\n\nमी गुंतागुंतीचे कायदे **अगदी सोप्या आणि सहज समजणाऱ्या भाषेत** समजावून सांगतो. भारतीय राज्यघटना, BNS, BNSS आणि BSA अंतर्गत तुमचे हक्क व पुढील पावले जाणून घेण्यासाठी खाली प्रश्न विचारा.`;
    case 'gu':
      return `હું આપનો **કાનૂની સલાહકાર** છું.\n\nહું કાયદાકીય બાબતોને **દરેક વ્યક્તિ સરળતાથી સમજી શકે તેવી સ્પષ્ટ ભાષામાં** સમજાવું છું. બંધારણ, BNS, BNSS હેઠળ તમારા હક અને ઉપાયો જાણવા માટે નીચે પ્રશ્ન પૂછો.`;
    case 'kn':
      return `ನಾನು ನಿಮ್ಮ **ಕಾನೂನು ಸಲಹೆಗಾರ**.\n\nಪ್ರತಿಯೊಬ್ಬರೂ ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ **ಸರಳ ಮತ್ತು ಸ್ಪಷ್ಟ ಭಾಷೆಯಲ್ಲಿ** ಕಾನೂನು ಸಲಹೆಯನ್ನು ನೀಡುತ್ತೇನೆ.`;
    case 'ml':
      return `ഞാൻ നിങ്ങളുടെ **നിയമ ഉപദേശകനാണ്**.\n\nഎല്ലാവർക്കും എളുപ്പത്തിൽ മനസ്സിലാകുന്ന **ലളിതവും വ്യക്തവുമായ ഭാഷയിൽ** നിയമോപദേശം നൽകുന്നു.`;
    case 'pa':
      return `ਮੈਂ ਤੁਹਾਡਾ **ਕਾਨੂੰਨੀ ਸਲਾਹਕਾਰ** ਹਾਂ।\n\nਮੈਂ ਹਰ ਕਿਸੇ ਲਈ **ਸਰਲ ਅਤੇ ਸਪਸ਼ਟ ਭਾਸ਼ਾ ਵਿੱਚ** ਕਾਨੂੰਨੀ ਸਲਾਹ ਅਤੇ ਹੱਲ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹਾਂ।`;
    case 'ur':
      return `میں آپ کا **قانونی مشیر** ہوں۔\n\nمیں پیچیدہ قوانین کو **انتہائی سادہ اور واضح زبان میں** سمجھاتا ہوں تاکہ ہر شہری اپنے حقوق کو آسانی سے سمجھ سکے۔`;
    case 'es':
      return `Soy su **Defensor Legal de IA**.\n\nExplico las leyes y sus derechos en un **lenguaje sencillo y claro que todos pueden entender**, con pasos prácticos a seguir.`;
    case 'fr':
      return `Je suis votre **Conseiller Juridique IA**.\n\nJ'explique vos droits et les lois dans un **langage simple et clair accessible à tous**, avec des démarches concrètes.`;
    case 'de':
      return `Ich bin Ihr **KI-Rechtsberater**.\n\nIch erkläre Gesetze und Ihre Rechte in **einfacher, klarer Sprache**, die für jeden leicht verständlich ist.`;
    case 'ar':
      return `أنا **مستشارك القانوني بالذكاء الاصطناعي**.\n\nأشرح القوانين وحقوقك بـ **لغة بسيطة وواضحة يفهمها الجميع** مع خطوات عملية واضحة.`;
    case 'zh':
      return `我是您的 **AI 法律顾问**。\n\n我用**通俗易懂、简单清晰的语言**为您解读法律与权利，提供具体实用的行动指南。`;
    default:
      return `I am your **AI Legal Advocate**.\n\nI explain Indian laws and your constitutional rights in **simple, clear, and plain language that anyone can easily understand**—grounded in the **Constitution of India**, **Bharatiya Nyaya Sanhita (BNS)**, **BNSS (Zero FIR)**, and **BSA**.\n\nNo confusing legal jargon—just clear explanations, your rights, and exact 1-2-3 steps to take. Speak or type in English, हिन्दी, or Hinglish below.`;
  }
};

