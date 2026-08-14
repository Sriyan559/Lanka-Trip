/**
 * TypeScript definitions for Localization, Languages, Currency & Regional Settings (AD08)
 */

export type LocaleStatus = 'Published' | 'Draft' | 'In Review';
export type FreshnessStatus = 'Current' | 'Stale' | 'Missing';
export type ActiveStatus = 'Active' | 'Inactive' | 'Pending';

export interface CountryLocaleRecord {
  id: string;
  country: string;
  locales: string;
  primaryLocale: string;
  status: LocaleStatus;
  channels: number;
  domains: number;
  translationCoverage: number;
  fxFreshness: FreshnessStatus;
}

export interface SelectedLocaleDetails {
  locale: string;
  direction: 'LTR' | 'RTL';
  coverage: number;
  primaryCurrency: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
  fxFreshness: FreshnessStatus;
  localeCode: string;
}

export interface RegionalCoverageRow {
  id: string;
  region: string;
  countries: number;
  locales: number;
  coverage: number;
  translations: number;
  fxFreshness: FreshnessStatus;
}

export interface TranslationCoverageRow {
  domain: string;
  percentage: number;
}

export interface TranslationGapRow {
  id: string;
  domain: string;
  missingStrings: number;
}

export interface LocaleRegistryRow {
  id: string;
  locale: string;
  language: string;
  country: string;
  direction: 'LTR' | 'RTL';
  status: LocaleStatus;
  channels: number;
  domains: number;
  translated: number;
}

export interface LanguageRegistryRow {
  id: string;
  language: string;
  code: string;
  direction: 'LTR' | 'RTL';
  locales: number;
  status: ActiveStatus;
}

export interface LanguageCoverageRow {
  language: string;
  product: number;
  marketing: number;
  support: number;
  legal: number;
  ui: number;
  overall: number;
}

export interface FallbackRegistryRow {
  id: string;
  type: 'Locale Fallback' | 'Language Fallback' | 'Content Fallback' | 'Formatting Fallback';
  count: number;
}

export interface CurrencyRegistryRow {
  id: string;
  currency: string;
  code: string;
  symbol: string;
  minorUnit: number;
  status: ActiveStatus;
  primaryDisplay: 'Yes' | 'No';
}

export interface ExchangeRateSourceRow {
  id: string;
  source: string;
  provider: string;
  coverage: number;
  status: ActiveStatus | 'Manual Controlled';
  lastUpdate: string;
}

export interface CurrencyOverrideRow {
  id: string;
  type: 'Pricing Override' | 'Rounding Override' | 'Display Override' | 'Payment Override';
  count: number;
}

export interface CurrencyFormattingRow {
  id: string;
  setting: string;
  example: string;
}

export interface TimezoneRegistryRow {
  id: string;
  timezone: string;
  region: string;
  utcOffset: string;
  dst: 'Yes' | 'No';
  status: ActiveStatus;
}

export interface TimezoneApplicabilityRow {
  id: string;
  region: string;
  timezones: number;
  coverage: number;
  dstSupported: 'Yes' | 'No';
}

export interface DateTimeFormatRow {
  id: string;
  formatType: string;
  format: string;
  example: string;
}

export interface NumberFormattingRow {
  id: string;
  setting: string;
  example: string;
}

export interface AddressPhoneFormattingRow {
  id: string;
  setting: string;
  example: string;
}

export interface MeasurementUnitRow {
  id: string;
  category: string;
  system: string;
  display: string;
  status: ActiveStatus;
}

export interface FiscalCalendarRow {
  id: string;
  region: string;
  fiscalYearStart: string;
  weekStart: string;
  status: ActiveStatus;
}

export interface RegionalOverrideSummaryRow {
  id: string;
  type: string;
  activeRules: number;
}

export interface LocalizationFullData {
  context: Record<string, string>;
  kpis: Record<string, { value: number | string; trend: string; trendDirection: 'up' | 'down'; sparkline: number[] }>;
  countryLocales: CountryLocaleRecord[];
  selectedLocale: SelectedLocaleDetails;
  regionalCoverage: RegionalCoverageRow[];
  translationCoverage: TranslationCoverageRow[];
  translationGaps: TranslationGapRow[];
  locales: LocaleRegistryRow[];
  languages: LanguageRegistryRow[];
  languageCoverage: LanguageCoverageRow[];
  fallbacks: FallbackRegistryRow[];
  currencies: CurrencyRegistryRow[];
  exchangeRateSources: ExchangeRateSourceRow[];
  currencyOverrides: CurrencyOverrideRow[];
  currencyFormatting: CurrencyFormattingRow[];
  timezones: TimezoneRegistryRow[];
  timezoneApplicability: TimezoneApplicabilityRow[];
  dateTimeFormats: DateTimeFormatRow[];
  numberFormatting: NumberFormattingRow[];
  addressPhoneFormatting: AddressPhoneFormattingRow[];
  measurementUnits: MeasurementUnitRow[];
  fiscalCalendars: FiscalCalendarRow[];
  regionalOverrides: RegionalOverrideSummaryRow[];
  charts: {
    exchangeRateHealth: { name: string; value: number; color: string }[];
    inheritance: { name: string; value: number; color: string }[];
    readinessTrend: { label: string; 'Overall Readiness': number; 'Translation Coverage': number; 'FX Freshness': number }[];
    riskTrend: { label: string; 'High Risk Items': number; 'Missing Translations': number; 'Stale FX': number }[];
  };
}
