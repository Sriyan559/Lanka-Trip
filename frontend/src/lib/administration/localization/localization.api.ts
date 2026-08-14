import { LocalizationFullData } from './localization.types';
import { DEFAULT_LOCALIZATION_DATA } from './localization.constants';

/**
 * Service API for Localization, Languages, Currency & Regional Settings (AD08)
 * Namespace: /api/admin/administration/localization/...
 */
export async function fetchLocalizationData(): Promise<LocalizationFullData> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return DEFAULT_LOCALIZATION_DATA;
}

export async function addLocale(localeCode: string, name: string): Promise<{ success: boolean; localeId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    localeId: `LOC-${Date.now()}`,
  };
}

export async function addLanguage(code: string, name: string): Promise<{ success: boolean; languageId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    languageId: `LANG-${Date.now()}`,
  };
}

export async function addCurrency(code: string, name: string): Promise<{ success: boolean; currencyId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    currencyId: `CUR-${Date.now()}`,
  };
}

export async function runReadinessOptimization(): Promise<{ success: boolean; taskId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    taskId: `TSK-OPT-${Date.now()}`,
  };
}

export async function refreshExchangeRates(): Promise<{ success: boolean; auditId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {
    success: true,
    auditId: `AUD-FX-${Date.now()}`,
  };
}
