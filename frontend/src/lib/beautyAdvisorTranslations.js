export const ADVISOR_LANGUAGES = [
  { code: 'en', label: 'English', speech: 'en-LK' },
  { code: 'si', label: 'සිංහල', speech: 'si-LK' },
  { code: 'ta', label: 'தமிழ்', speech: 'ta-LK' },
];

export const advisorTranslations = {
  en: {
    subtitle: 'Your personal beauty curator', start: 'Start consultation', back: 'Back', skip: 'Skip', continue: 'Continue',
    step: 'Step {current} of {total}', welcome: 'What would you like help with today?', review: 'Review your beauty profile', edit: 'Edit',
    retry: 'Retry', unavailable: 'The advisor could not connect. Your answers are safe; please retry.', finish: 'Create my beauty plan',
  },
  si: {
    subtitle: 'ඔබේ පුද්ගලික රූපලාවණ්‍ය උපදේශක', start: 'උපදේශනය අරඹන්න', back: 'ආපසු', skip: 'මඟ හරින්න', continue: 'ඉදිරියට',
    step: 'පියවර {total} න් {current}', welcome: 'අද ඔබට කුමන උදව්වක් අවශ්‍යද?', review: 'ඔබේ රූපලාවණ්‍ය පැතිකඩ පරීක්ෂා කරන්න', edit: 'සංස්කරණය',
    retry: 'නැවත උත්සාහ කරන්න', unavailable: 'උපදේශකයාට සම්බන්ධ විය නොහැක. ඔබේ පිළිතුරු සුරක්ෂිතයි; නැවත උත්සාහ කරන්න.', finish: 'මගේ රූපලාවණ්‍ය සැලැස්ම සාදන්න',
  },
  ta: {
    subtitle: 'உங்கள் தனிப்பட்ட அழகு ஆலோசகர்', start: 'ஆலோசனையைத் தொடங்கு', back: 'பின்செல்', skip: 'தவிர்', continue: 'தொடர்க',
    step: '{total} இல் படி {current}', welcome: 'இன்று உங்களுக்கு என்ன உதவி வேண்டும்?', review: 'உங்கள் அழகு சுயவிவரத்தைச் சரிபார்க்கவும்', edit: 'திருத்து',
    retry: 'மீண்டும் முயற்சி', unavailable: 'ஆலோசகரை இணைக்க முடியவில்லை. உங்கள் பதில்கள் பாதுகாப்பாக உள்ளன; மீண்டும் முயற்சிக்கவும்.', finish: 'எனது அழகுத் திட்டத்தை உருவாக்கு',
  },
};

export const tAdvisor = (language, key, vars = {}) => {
  let value = advisorTranslations[language]?.[key] || advisorTranslations.en[key] || key;
  Object.entries(vars).forEach(([name, replacement]) => { value = value.replace(`{${name}}`, replacement); });
  return value;
};
