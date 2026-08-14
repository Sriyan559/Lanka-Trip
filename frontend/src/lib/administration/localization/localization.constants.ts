import { LocalizationFullData } from './localization.types';

export const LOCALIZATION_METADATA = {
  id: 'AD08',
  name: 'Localization, Languages, Currency & Regional Settings',
  route: '/admin/administration/localization-regional',
  module: 'Administration',
  domain: 'Localization',
};

export const LOCALIZATION_TABS = [
  { id: 'overview', label: 'Localization Overview' },
  { id: 'countries', label: 'Countries & Regions' },
  { id: 'locales', label: 'Locales' },
  { id: 'languages', label: 'Languages' },
  { id: 'currencies', label: 'Currencies' },
  { id: 'exchange-rates', label: 'Exchange Rates' },
  { id: 'timezones', label: 'Timezones' },
  { id: 'formats', label: 'Formats' },
  { id: 'translations', label: 'Translations' },
  { id: 'inheritance', label: 'Inheritance & Overrides' },
  { id: 'readiness', label: 'Regional Readiness' },
  { id: 'activity', label: 'Activity' },
] as const;

export const LOCALIZATION_FILTERS = [
  { id: 'regions', label: 'All Regions' },
  { id: 'countries', label: 'All Countries' },
  { id: 'languages', label: 'All Languages' },
  { id: 'currencies', label: 'All Currencies' },
  { id: 'channels', label: 'All Channels' },
  { id: 'domains', label: 'All Domains' },
  { id: 'statuses', label: 'All Statuses' },
  { id: 'freshness', label: 'All Freshness' },
];

export const DEFAULT_LOCALIZATION_DATA: LocalizationFullData = {
  context: {
    tenant: 'SL Beauty',
    ecosystem: 'Beauty Marketplace',
    adminScope: 'Global Admin',
    region: 'APAC / EMEA',
    environment: 'Production',
    lifecycleState: 'Active',
    validationRules: 'Healthy',
    driftStatus: 'Low',
    lastEvaluated: 'May 13, 2026 3:30 AM',
    accessScope: 'Assigned Administration Scope',
  },

  kpis: {
    supportedCountries: { value: 118, trend: '4%', trendDirection: 'up', sparkline: [110, 112, 114, 115, 116, 118] },
    activeLocales: { value: 112, trend: '2%', trendDirection: 'up', sparkline: [105, 107, 109, 110, 111, 112] },
    languages: { value: 32, trend: '0%', trendDirection: 'up', sparkline: [32, 32, 32, 32, 32, 32] },
    currencies: { value: 28, trend: '0%', trendDirection: 'up', sparkline: [28, 28, 28, 28, 28, 28] },
    timezones: { value: 153, trend: '1%', trendDirection: 'up', sparkline: [150, 151, 152, 152, 153, 153] },
    translationCoverage: { value: '96%', trend: '1%', trendDirection: 'up', sparkline: [94, 94, 95, 95, 96, 96] },
    fxFreshness: { value: 'Current', trend: 'Current', trendDirection: 'up', sparkline: [1, 1, 1, 1, 1, 1] },
    localizationGaps: { value: 18, trend: '10%', trendDirection: 'down', sparkline: [25, 23, 22, 20, 19, 18] },
    translationGaps: { value: '12,745', trend: '8%', trendDirection: 'down', sparkline: [15000, 14200, 13800, 13100, 12900, 12745] },
    localizationExceptions: { value: 7, trend: '12%', trendDirection: 'down', sparkline: [10, 9, 8, 8, 7, 7] },
  },

  countryLocales: [
    { id: '1', country: 'United States (US)', locales: 'en-US', primaryLocale: 'English (United States)', status: 'Published', channels: 6, domains: 12, translationCoverage: 98, fxFreshness: 'Current' },
    { id: '2', country: 'Canada (CA)', locales: 'en-CA', primaryLocale: 'English (Canada)', status: 'Published', channels: 6, domains: 12, translationCoverage: 96, fxFreshness: 'Current' },
    { id: '3', country: 'Germany (DE)', locales: 'de-DE', primaryLocale: 'Deutsch (Deutschland)', status: 'Published', channels: 6, domains: 12, translationCoverage: 97, fxFreshness: 'Current' },
    { id: '4', country: 'France (FR)', locales: 'fr-FR', primaryLocale: 'Français (France)', status: 'Published', channels: 6, domains: 12, translationCoverage: 95, fxFreshness: 'Current' },
    { id: '5', country: 'Saudi Arabia (SA)', locales: 'ar-SA', primaryLocale: 'العربية (السعودية)', status: 'Published', channels: 6, domains: 12, translationCoverage: 92, fxFreshness: 'Current' },
    { id: '6', country: 'United Arab Emirates (AE)', locales: 'en-AE', primaryLocale: 'English (U.A.E.)', status: 'Published', channels: 6, domains: 12, translationCoverage: 94, fxFreshness: 'Current' },
    { id: '7', country: 'India (IN)', locales: 'en-IN', primaryLocale: 'English (India)', status: 'Published', channels: 6, domains: 12, translationCoverage: 93, fxFreshness: 'Stale' },
    { id: '8', country: 'China (CN)', locales: 'zh-CN', primaryLocale: '中文 (中国)', status: 'Published', channels: 6, domains: 12, translationCoverage: 92, fxFreshness: 'Current' },
  ],

  selectedLocale: {
    locale: 'English (United States)',
    direction: 'LTR',
    coverage: 98,
    primaryCurrency: 'USD (US Dollar)',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,234,567.89',
    fxFreshness: 'Current',
    localeCode: 'en-US',
  },

  regionalCoverage: [
    { id: 'r1', region: 'North America', countries: 3, locales: 8, coverage: 97, translations: 96, fxFreshness: 'Current' },
    { id: 'r2', region: 'Europe', countries: 44, locales: 48, coverage: 96, translations: 97, fxFreshness: 'Current' },
    { id: 'r3', region: 'Middle East', countries: 15, locales: 18, coverage: 94, translations: 93, fxFreshness: 'Current' },
    { id: 'r4', region: 'Asia Pacific', countries: 28, locales: 32, coverage: 93, translations: 92, fxFreshness: 'Current' },
    { id: 'r5', region: 'Latin America', countries: 14, locales: 16, coverage: 95, translations: 94, fxFreshness: 'Stale' },
    { id: 'r6', region: 'Africa', countries: 14, locales: 14, coverage: 93, translations: 92, fxFreshness: 'Stale' },
  ],

  translationCoverage: [
    { domain: 'Product Content', percentage: 98 },
    { domain: 'Marketing', percentage: 97 },
    { domain: 'Customer Support', percentage: 96 },
    { domain: 'Legal & Compliance', percentage: 95 },
    { domain: 'System & UI', percentage: 96 },
  ],

  translationGaps: [
    { id: 'g1', domain: 'Product Content', missingStrings: 5328 },
    { id: 'g2', domain: 'Marketing', missingStrings: 3102 },
    { id: 'g3', domain: 'Customer Support', missingStrings: 2145 },
    { id: 'g4', domain: 'Legal & Compliance', missingStrings: 1248 },
    { id: 'g5', domain: 'System & UI', missingStrings: 1609 },
  ],

  locales: [
    { id: 'loc-1', locale: 'en-US', language: 'English', country: 'United States', direction: 'LTR', status: 'Published', channels: 6, domains: 12, translated: 98 },
    { id: 'loc-2', locale: 'en-CA', language: 'English', country: 'Canada', direction: 'LTR', status: 'Published', channels: 6, domains: 12, translated: 96 },
    { id: 'loc-3', locale: 'de-DE', language: 'German', country: 'Germany', direction: 'LTR', status: 'Published', channels: 6, domains: 12, translated: 97 },
    { id: 'loc-4', locale: 'fr-FR', language: 'French', country: 'France', direction: 'LTR', status: 'Published', channels: 6, domains: 12, translated: 95 },
    { id: 'loc-5', locale: 'ar-SA', language: 'Arabic', country: 'Saudi Arabia', direction: 'RTL', status: 'Published', channels: 6, domains: 12, translated: 92 },
  ],

  languages: [
    { id: 'lang-1', language: 'English', code: 'en', direction: 'LTR', locales: 12, status: 'Active' },
    { id: 'lang-2', language: 'German', code: 'de', direction: 'LTR', locales: 6, status: 'Active' },
    { id: 'lang-3', language: 'French', code: 'fr', direction: 'LTR', locales: 6, status: 'Active' },
    { id: 'lang-4', language: 'Arabic', code: 'ar', direction: 'RTL', locales: 6, status: 'Active' },
    { id: 'lang-5', language: 'Chinese Simplified', code: 'zh-Hans', direction: 'LTR', locales: 4, status: 'Active' },
  ],

  languageCoverage: [
    { language: 'English', product: 98, marketing: 97, support: 97, legal: 98, ui: 97, overall: 98 },
    { language: 'German', product: 97, marketing: 97, support: 96, legal: 96, ui: 96, overall: 97 },
    { language: 'French', product: 97, marketing: 96, support: 95, legal: 95, ui: 95, overall: 96 },
    { language: 'Arabic', product: 95, marketing: 94, support: 93, legal: 94, ui: 95, overall: 94 },
    { language: 'Chinese Simplified', product: 93, marketing: 91, support: 91, legal: 90, ui: 91, overall: 92 },
  ],

  fallbacks: [
    { id: 'fb-1', type: 'Locale Fallback', count: 7 },
    { id: 'fb-2', type: 'Language Fallback', count: 12 },
    { id: 'fb-3', type: 'Content Fallback', count: 34 },
    { id: 'fb-4', type: 'Formatting Fallback', count: 18 },
  ],

  currencies: [
    { id: 'cur-1', currency: 'US Dollar', code: 'USD', symbol: '$', minorUnit: 2, status: 'Active', primaryDisplay: 'Yes' },
    { id: 'cur-2', currency: 'Euro', code: 'EUR', symbol: '€', minorUnit: 2, status: 'Active', primaryDisplay: 'No' },
    { id: 'cur-3', currency: 'British Pound', code: 'GBP', symbol: '£', minorUnit: 2, status: 'Active', primaryDisplay: 'No' },
    { id: 'cur-4', currency: 'Saudi Riyal', code: 'SAR', symbol: 'ر.س', minorUnit: 2, status: 'Active', primaryDisplay: 'No' },
    { id: 'cur-5', currency: 'UAE Dirham', code: 'AED', symbol: 'د.إ', minorUnit: 2, status: 'Active', primaryDisplay: 'No' },
  ],

  exchangeRateSources: [
    { id: 'ex-1', source: 'Refinitiv', provider: 'Refinitiv', coverage: 98, status: 'Active', lastUpdate: '3 hrs ago' },
    { id: 'ex-2', source: 'XE Currency', provider: 'XE', coverage: 96, status: 'Active', lastUpdate: '2 hrs ago' },
    { id: 'ex-3', source: 'Central Bank Feeds', provider: 'Various', coverage: 92, status: 'Active', lastUpdate: '6 hrs ago' },
    { id: 'ex-4', source: 'Manual Upload', provider: 'Admin', coverage: 85, status: 'Manual Controlled', lastUpdate: '1 day ago' },
  ],

  currencyOverrides: [
    { id: 'cov-1', type: 'Pricing Override', count: 6 },
    { id: 'cov-2', type: 'Rounding Override', count: 4 },
    { id: 'cov-3', type: 'Display Override', count: 8 },
    { id: 'cov-4', type: 'Payment Override', count: 3 },
  ],

  currencyFormatting: [
    { id: 'cf-1', setting: 'Decimal Places', example: '2' },
    { id: 'cf-2', setting: 'Rounding Rule', example: 'Half Up' },
    { id: 'cf-3', setting: 'Group Separator', example: ',' },
    { id: 'cf-4', setting: 'Decimal Separator', example: '.' },
    { id: 'cf-5', setting: 'Negative Format', example: '-1,234.57' },
  ],

  timezones: [
    { id: 'tz-1', timezone: 'America/New_York', region: 'North America', utcOffset: 'UTC-05:00', dst: 'Yes', status: 'Active' },
    { id: 'tz-2', timezone: 'Europe/Berlin', region: 'Europe', utcOffset: 'UTC+01:00', dst: 'Yes', status: 'Active' },
    { id: 'tz-3', timezone: 'Asia/Dubai', region: 'Middle East', utcOffset: 'UTC+04:00', dst: 'No', status: 'Active' },
    { id: 'tz-4', timezone: 'Asia/Kolkata', region: 'Asia Pacific', utcOffset: 'UTC+05:30', dst: 'No', status: 'Active' },
    { id: 'tz-5', timezone: 'Asia/Shanghai', region: 'Asia Pacific', utcOffset: 'UTC+08:00', dst: 'No', status: 'Active' },
  ],

  timezoneApplicability: [
    { id: 'tza-1', region: 'North America', timezones: 28, coverage: 100, dstSupported: 'Yes' },
    { id: 'tza-2', region: 'Europe', timezones: 42, coverage: 100, dstSupported: 'Yes' },
    { id: 'tza-3', region: 'Middle East', timezones: 16, coverage: 100, dstSupported: 'No' },
    { id: 'tza-4', region: 'Asia Pacific', timezones: 35, coverage: 100, dstSupported: 'No' },
    { id: 'tza-5', region: 'Latin America', timezones: 20, coverage: 100, dstSupported: 'Yes' },
  ],

  dateTimeFormats: [
    { id: 'dtf-1', formatType: 'Short Date', format: 'MM/DD/YYYY', example: '05/13/2026' },
    { id: 'dtf-2', formatType: 'Long Date', format: 'dddd, MMMM D, YYYY', example: 'Wednesday, May 13, 2026' },
    { id: 'dtf-3', formatType: 'Short Time', format: 'h:mm A', example: '2:30 PM' },
    { id: 'dtf-4', formatType: 'Long Time', format: 'h:mm:ss A', example: '2:30:45 PM' },
    { id: 'dtf-5', formatType: 'Date & Time', format: 'MMMM D, YYYY h:mm A', example: 'May 13, 2026 2:30 PM' },
  ],

  numberFormatting: [
    { id: 'nf-1', setting: 'Decimal', example: '1,234.57' },
    { id: 'nf-2', setting: 'Percent', example: '12.50%' },
    { id: 'nf-3', setting: 'Negative', example: '-1,234.57' },
    { id: 'nf-4', setting: 'Accounting', example: '(1,234.57)' },
    { id: 'nf-5', setting: 'Scientific', example: '1.23E+03' },
  ],

  addressPhoneFormatting: [
    { id: 'apf-1', setting: 'Address 1', example: '123 Beauty Lane' },
    { id: 'apf-2', setting: 'Address 2', example: 'Suite 500' },
    { id: 'apf-3', setting: 'City, State, Zip', example: 'New York, NY 10001' },
    { id: 'apf-4', setting: 'Phone', example: '(212) 555-0199' },
    { id: 'apf-5', setting: 'Intl Phone', example: '+1 212 555 0199' },
  ],

  measurementUnits: [
    { id: 'mu-1', category: 'Length', system: 'Metric (cm, m, km)', display: 'in, ft, mi', status: 'Active' },
    { id: 'mu-2', category: 'Weight', system: 'Metric (g, kg)', display: 'oz, lb', status: 'Active' },
    { id: 'mu-3', category: 'Volume', system: 'Metric (L, mL)', display: 'fl oz, gal', status: 'Active' },
    { id: 'mu-4', category: 'Temperature', system: 'Celsius (°C)', display: 'Fahrenheit (°F)', status: 'Active' },
  ],

  fiscalCalendars: [
    { id: 'fc-1', region: 'United States', fiscalYearStart: 'January', weekStart: 'Sunday', status: 'Active' },
    { id: 'fc-2', region: 'Europe', fiscalYearStart: 'January', weekStart: 'Monday', status: 'Active' },
    { id: 'fc-3', region: 'Middle East', fiscalYearStart: 'January', weekStart: 'Saturday', status: 'Active' },
    { id: 'fc-4', region: 'Asia Pacific', fiscalYearStart: 'April', weekStart: 'Monday', status: 'Active' },
  ],

  regionalOverrides: [
    { id: 'ro-1', type: 'Pricing & Tax Rules', activeRules: 14 },
    { id: 'ro-2', type: 'Content & Translations', activeRules: 9 },
    { id: 'ro-3', type: 'Formats & Preferences', activeRules: 11 },
    { id: 'ro-4', type: 'Compliance & Legal', activeRules: 8 },
  ],

  charts: {
    exchangeRateHealth: [
      { name: 'Current', value: 24, color: '#10b981' },
      { name: 'Stale', value: 2, color: '#f59e0b' },
      { name: 'Missing', value: 1, color: '#f43f5e' },
      { name: 'Fallback Active', value: 1, color: '#3b82f6' },
      { name: 'Manual Controlled', value: 0, color: '#6b7280' },
    ],
    inheritance: [
      { name: 'Inherited', value: 84, color: '#3b82f6' },
      { name: 'Overridden', value: 20, color: '#f59e0b' },
      { name: 'Independent', value: 8, color: '#10b981' },
    ],
    readinessTrend: [
      { label: 'Feb 17', 'Overall Readiness': 88, 'Translation Coverage': 92, 'FX Freshness': 94 },
      { label: 'Mar 03', 'Overall Readiness': 89, 'Translation Coverage': 92, 'FX Freshness': 95 },
      { label: 'Mar 17', 'Overall Readiness': 91, 'Translation Coverage': 93, 'FX Freshness': 95 },
      { label: 'Mar 31', 'Overall Readiness': 93, 'Translation Coverage': 94, 'FX Freshness': 96 },
      { label: 'Apr 14', 'Overall Readiness': 94, 'Translation Coverage': 95, 'FX Freshness': 96 },
      { label: 'Apr 28', 'Overall Readiness': 95, 'Translation Coverage': 96, 'FX Freshness': 96 },
      { label: 'May 12', 'Overall Readiness': 96, 'Translation Coverage': 96, 'FX Freshness': 96 },
    ],
    riskTrend: [
      { label: 'Feb 17', 'High Risk Items': 12, 'Missing Translations': 15, 'Stale FX': 4 },
      { label: 'Mar 03', 'High Risk Items': 11, 'Missing Translations': 14, 'Stale FX': 3 },
      { label: 'Mar 17', 'High Risk Items': 9, 'Missing Translations': 13, 'Stale FX': 3 },
      { label: 'Mar 31', 'High Risk Items': 8, 'Missing Translations': 12, 'Stale FX': 2 },
      { label: 'Apr 14', 'High Risk Items': 7, 'Missing Translations': 11, 'Stale FX': 2 },
      { label: 'Apr 28', 'High Risk Items': 6, 'Missing Translations': 11, 'Stale FX': 1 },
      { label: 'May 12', 'High Risk Items': 5, 'Missing Translations': 10, 'Stale FX': 1 },
    ],
  },
};
