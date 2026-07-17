export const ADVISOR_LANGUAGES = [
  { code: 'en', label: 'English', speech: 'en-LK' },
  { code: 'si', label: 'සිංහල', speech: 'si-LK' },
  { code: 'ta', label: 'தமிழ்', speech: 'ta-LK' },
  { code: 'zh-CN', label: '简体中文', speech: 'zh-CN' },
  { code: 'zh-TW', label: '繁體中文', speech: 'zh-TW' },
  { code: 'ko', label: '한국어', speech: 'ko-KR' },
  { code: 'hi', label: 'हिन्दी', speech: 'hi-IN' },
  { code: 'dv', label: 'ދިވެހި', speech: 'dv-MV' },
];

const en = {
  subtitle:'Your personal beauty curator', start:'Start consultation', back:'Back', skip:'Skip', continue:'Continue',
  step:'Step {current} of {total}', welcome:'What would you like help with today?', review:'Review your beauty profile', edit:'Edit',
  retry:'Retry', unavailable:'The advisor could not connect. Your answers are safe; please retry.', finish:'Create my beauty plan',
  sources:'Sources', helpful:'Helpful', notHelpful:'Not helpful', searching:'Searching trusted beauty sources…', placeholder:'Ask about skincare, makeup, fragrance, or products…',
};

export const advisorTranslations = {
  en,
  si: { ...en, subtitle:'ඔබේ පුද්ගලික රූපලාවණ්‍ය උපදේශක', start:'උපදේශනය අරඹන්න', back:'ආපසු', skip:'මඟ හරින්න', continue:'ඉදිරියට', step:'පියවර {total} න් {current}', welcome:'අද ඔබට කුමන උදව්වක් අවශ්‍යද?', review:'ඔබේ රූපලාවණ්‍ය පැතිකඩ පරීක්ෂා කරන්න', edit:'සංස්කරණය', retry:'නැවත උත්සාහ කරන්න', finish:'මගේ රූපලාවණ්‍ය සැලැස්ම සාදන්න', sources:'මූලාශ්‍ර', helpful:'ප්‍රයෝජනවත්', notHelpful:'ප්‍රයෝජනවත් නැත', searching:'විශ්වාසදායක රූපලාවණ්‍ය මූලාශ්‍ර සොයමින්…', placeholder:'සම රැකවරණය, මේකප්, සුවඳ හෝ නිෂ්පාදන ගැන අසන්න…' },
  ta: { ...en, subtitle:'உங்கள் தனிப்பட்ட அழகு ஆலோசகர்', start:'ஆலோசனையைத் தொடங்கு', back:'பின்செல்', skip:'தவிர்', continue:'தொடர்க', step:'{total} இல் படி {current}', welcome:'இன்று உங்களுக்கு என்ன உதவி வேண்டும்?', review:'உங்கள் அழகு சுயவிவரத்தைச் சரிபார்க்கவும்', edit:'திருத்து', retry:'மீண்டும் முயற்சி', finish:'எனது அழகுத் திட்டத்தை உருவாக்கு', sources:'ஆதாரங்கள்', helpful:'பயனுள்ளது', notHelpful:'பயனில்லை', searching:'நம்பகமான அழகு ஆதாரங்களைத் தேடுகிறது…', placeholder:'தோல் பராமரிப்பு, ஒப்பனை, வாசனை அல்லது தயாரிப்புகள் பற்றி கேளுங்கள்…' },
  'zh-CN': { ...en, subtitle:'您的私人美容顾问', start:'开始咨询', back:'返回', skip:'跳过', continue:'继续', step:'第 {current} 步，共 {total} 步', welcome:'今天需要什么帮助？', review:'查看您的美容档案', edit:'编辑', retry:'重试', finish:'创建我的美容方案', sources:'来源', helpful:'有帮助', notHelpful:'没有帮助', searching:'正在搜索可信美容来源…', placeholder:'询问护肤、彩妆、香水或产品…' },
  'zh-TW': { ...en, subtitle:'您的私人美容顧問', start:'開始諮詢', back:'返回', skip:'跳過', continue:'繼續', step:'第 {current} 步，共 {total} 步', welcome:'今天需要什麼協助？', review:'查看您的美容檔案', edit:'編輯', retry:'重試', finish:'建立我的美容方案', sources:'來源', helpful:'有幫助', notHelpful:'沒有幫助', searching:'正在搜尋可信美容來源…', placeholder:'詢問護膚、彩妝、香水或產品…' },
  ko: { ...en, subtitle:'나만의 뷰티 큐레이터', start:'상담 시작', back:'뒤로', skip:'건너뛰기', continue:'계속', step:'{total}단계 중 {current}단계', welcome:'오늘 무엇을 도와드릴까요?', review:'뷰티 프로필 검토', edit:'수정', retry:'다시 시도', finish:'뷰티 플랜 만들기', sources:'출처', helpful:'도움이 됨', notHelpful:'도움이 안 됨', searching:'신뢰할 수 있는 뷰티 출처를 검색 중…', placeholder:'스킨케어, 메이크업, 향수 또는 제품에 대해 물어보세요…' },
  hi: { ...en, subtitle:'आपका निजी ब्यूटी क्यूरेटर', start:'परामर्श शुरू करें', back:'वापस', skip:'छोड़ें', continue:'जारी रखें', step:'{total} में से चरण {current}', welcome:'आज आपको किस चीज़ में मदद चाहिए?', review:'अपनी ब्यूटी प्रोफ़ाइल देखें', edit:'संपादित करें', retry:'फिर कोशिश करें', finish:'मेरा ब्यूटी प्लान बनाएँ', sources:'स्रोत', helpful:'मददगार', notHelpful:'मददगार नहीं', searching:'विश्वसनीय ब्यूटी स्रोत खोजे जा रहे हैं…', placeholder:'स्किनकेयर, मेकअप, खुशबू या उत्पादों के बारे में पूछें…' },
  dv: { ...en, subtitle:'ތިބާގެ އަމިއްލަ ރީތިކަން ލަފާދެންތެރި', start:'މަޝްވަރާ ފަށަން', back:'ފަހަތަށް', continue:'ކުރިއަށް', welcome:'މިއަދު ކޮން ކަމަކަށް އެހީވެދެވޭނީ؟', retry:'އަލުން އުޅޭ', sources:'މަސްދަރުތައް', helpful:'ފައިދާހުރި', notHelpful:'ފައިދާއެއް ނެތް', searching:'އިތުބާރުހުރި ރީތިކަން މަސްދަރުތައް ހޯދަނީ…', placeholder:'ސްކިންކެއަރ، މޭކަޕ، ވަސް ނުވަތަ ޕްރޮޑަކްޓްތަކާ މެދު ސުވާލު ކުރޭ…' },
};

export const tAdvisor = (language, key, vars = {}) => {
  let value = advisorTranslations[language]?.[key] || advisorTranslations.en[key] || key;
  Object.entries(vars).forEach(([name, replacement]) => { value = value.replace(`{${name}}`, replacement); });
  return value;
};
