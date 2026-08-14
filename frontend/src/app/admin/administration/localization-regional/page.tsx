import React from 'react';
import { Metadata } from 'next';
import LocalizationPage from '@/components/administration/localization-regional/LocalizationPage';

export const metadata: Metadata = {
  title: 'Localization, Languages, Currency & Regional Settings | SL Beauty Administration',
  description: 'Govern locales, languages, formatting, timezones, and regional settings.',
};

export default function LocalizationRegionalRoute() {
  return <LocalizationPage />;
}
