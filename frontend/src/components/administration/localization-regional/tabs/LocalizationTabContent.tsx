'use client';

import React from 'react';
import { LocalizationFullData, CountryLocaleRecord } from '@/lib/administration/localization/localization.types';
import { LocalizationOverviewTab } from './LocalizationOverviewTab';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ReusableDonutChart } from '@/components/shared/Chart/ReusableDonutChart';
import { ResponsiveLineChart } from '@/components/shared/Chart/ResponsiveLineChart';
import { ProgressBar } from '@/components/admin/logistics/shared/ProgressBar';

interface LocalizationTabContentProps {
  activeTab: string;
  data: LocalizationFullData;
  selectedLocaleItem: CountryLocaleRecord;
  onSelectLocaleItem: (item: CountryLocaleRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function LocalizationTabContent({
  activeTab,
  data,
  selectedLocaleItem,
  onSelectLocaleItem,
  onNavigateTab,
}: LocalizationTabContentProps) {
  const {
    locales,
    languages,
    languageCoverage,
    fallbacks,
    currencies,
    exchangeRateSources,
    currencyOverrides,
    currencyFormatting,
    timezones,
    timezoneApplicability,
    dateTimeFormats,
    numberFormatting,
    addressPhoneFormatting,
    measurementUnits,
    fiscalCalendars,
    regionalOverrides,
    charts,
  } = data;

  switch (activeTab) {
    case 'overview':
      return (
        <LocalizationOverviewTab
          data={data}
          selectedLocaleItem={selectedLocaleItem}
          onSelectLocaleItem={onSelectLocaleItem}
          onNavigateTab={onNavigateTab}
        />
      );

    case 'countries':
      return (
        <div className="grid grid-cols-1 gap-3">
          <SectionCard title="Countries & Regional Coverage">
            <DataTable
              columns={[
                { key: 'region', header: 'Region', cell: (r) => <span className="font-bold text-gray-900">{r.region}</span> },
                { key: 'countries', header: 'Countries', align: 'center' },
                { key: 'locales', header: 'Locales', align: 'center' },
                { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
                { key: 'translations', header: 'Translations', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.translations}%</span> },
                { key: 'fxFreshness', header: 'FX Freshness', cell: (r) => <StatusBadge status={r.fxFreshness} size="xs" /> },
              ]}
              data={data.regionalCoverage}
              density="compact"
            />
          </SectionCard>
        </div>
      );

    case 'locales':
      return (
        <SectionCard title="Locale Registry">
          <DataTable
            columns={[
              { key: 'locale', header: 'Locale Code', cell: (r) => <span className="font-mono font-bold text-gray-800">{r.locale}</span> },
              { key: 'language', header: 'Language' },
              { key: 'country', header: 'Country' },
              { key: 'direction', header: 'Direction' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
              { key: 'channels', header: 'Channels', align: 'center' },
              { key: 'domains', header: 'Domains', align: 'center' },
              { key: 'translated', header: 'Translated', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.translated}%</span> },
            ]}
            data={locales}
            density="compact"
          />
        </SectionCard>
      );

    case 'languages':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-4">
            <SectionCard title="Language Registry">
              <DataTable
                columns={[
                  { key: 'language', header: 'Language', cell: (r) => <span className="font-bold text-gray-900">{r.language}</span> },
                  { key: 'code', header: 'Code', cell: (r) => <span className="font-mono font-semibold">{r.code}</span> },
                  { key: 'direction', header: 'Direction' },
                  { key: 'locales', header: 'Locales', align: 'center' },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                ]}
                data={languages}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-5">
            <SectionCard title="Language Coverage by Domain">
              <DataTable
                columns={[
                  { key: 'language', header: 'Language', cell: (r) => <span className="font-bold text-gray-900">{r.language}</span> },
                  { key: 'product', header: 'Product', align: 'center', cell: (r) => <span className="font-medium">{r.product}%</span> },
                  { key: 'marketing', header: 'Marketing', align: 'center', cell: (r) => <span className="font-medium">{r.marketing}%</span> },
                  { key: 'support', header: 'Support', align: 'center', cell: (r) => <span className="font-medium">{r.support}%</span> },
                  { key: 'legal', header: 'Legal', align: 'center', cell: (r) => <span className="font-medium">{r.legal}%</span> },
                  { key: 'ui', header: 'UI', align: 'center', cell: (r) => <span className="font-medium">{r.ui}%</span> },
                  { key: 'overall', header: 'Overall', align: 'center', cell: (r) => <span className="font-extrabold text-emerald-700">{r.overall}%</span> },
                ]}
                data={languageCoverage}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-3">
            <SectionCard title="Locale / Language Fallback">
              <DataTable
                columns={[
                  { key: 'type', header: 'Fallback Type', cell: (r) => <span className="font-bold text-gray-900">{r.type}</span> },
                  { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-gray-800">{r.count}</span> },
                ]}
                data={fallbacks}
                density="compact"
              />
            </SectionCard>
          </div>
        </div>
      );

    case 'currencies':
    case 'exchange-rates':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-5">
            <SectionCard title="Currency Registry">
              <DataTable
                columns={[
                  { key: 'currency', header: 'Currency', cell: (r) => <span className="font-bold text-gray-900">{r.currency}</span> },
                  { key: 'code', header: 'Code', cell: (r) => <span className="font-mono font-bold text-gray-800">{r.code}</span> },
                  { key: 'symbol', header: 'Symbol', align: 'center' },
                  { key: 'minorUnit', header: 'Minor Unit', align: 'center' },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                  { key: 'primaryDisplay', header: 'Primary Display', align: 'center' },
                ]}
                data={currencies}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-4">
            <SectionCard title="Exchange Rate Sources">
              <DataTable
                columns={[
                  { key: 'source', header: 'Source', cell: (r) => <span className="font-bold text-gray-900">{r.source}</span> },
                  { key: 'provider', header: 'Provider' },
                  { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                  { key: 'lastUpdate', header: 'Last Update', cell: (r) => <span className="text-[9px] text-gray-500">{r.lastUpdate}</span> },
                ]}
                data={exchangeRateSources}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-3">
            <SectionCard title="Exchange Rate Health">
              <div className="flex flex-col items-center justify-center p-2">
                <ReusableDonutChart
                  data={charts.exchangeRateHealth}
                  totalValue="28"
                  totalLabel="Currencies"
                  height={150}
                />
              </div>
            </SectionCard>
          </div>
          
          <div className="lg:col-span-6">
            <SectionCard title="Currency Overrides">
              <DataTable
                columns={[
                  { key: 'type', header: 'Type', cell: (r) => <span className="font-bold text-gray-900">{r.type}</span> },
                  { key: 'count', header: 'Count', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.count}</span> },
                ]}
                data={currencyOverrides}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-6">
            <SectionCard title="Currency Formatting & Rounding">
              <DataTable
                columns={[
                  { key: 'setting', header: 'Setting', cell: (r) => <span className="font-bold text-gray-900">{r.setting}</span> },
                  { key: 'example', header: 'Example (USD)', align: 'right', cell: (r) => <span className="font-mono text-gray-800">{r.example}</span> },
                ]}
                data={currencyFormatting}
                density="compact"
              />
            </SectionCard>
          </div>
        </div>
      );

    case 'timezones':
    case 'formats':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-4">
            <SectionCard title="Timezone Registry">
              <DataTable
                columns={[
                  { key: 'timezone', header: 'Timezone', cell: (r) => <span className="font-bold text-gray-900">{r.timezone}</span> },
                  { key: 'region', header: 'Region' },
                  { key: 'utcOffset', header: 'UTC Offset', cell: (r) => <span className="font-mono">{r.utcOffset}</span> },
                  { key: 'dst', header: 'DST', align: 'center' },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                ]}
                data={timezones}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-4">
            <SectionCard title="Timezone Applicability">
              <DataTable
                columns={[
                  { key: 'region', header: 'Region', cell: (r) => <span className="font-bold text-gray-900">{r.region}</span> },
                  { key: 'timezones', header: 'Timezones', align: 'center' },
                  { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
                  { key: 'dstSupported', header: 'DST Supported', align: 'center' },
                ]}
                data={timezoneApplicability}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-4">
            <SectionCard title="Date & Time Formats (en-US)">
              <DataTable
                columns={[
                  { key: 'formatType', header: 'Format Type', cell: (r) => <span className="font-bold text-gray-900">{r.formatType}</span> },
                  { key: 'format', header: 'Format', cell: (r) => <span className="font-mono text-gray-500">{r.format}</span> },
                  { key: 'example', header: 'Example', cell: (r) => <span className="font-mono text-gray-800">{r.example}</span> },
                ]}
                data={dateTimeFormats}
                density="compact"
              />
            </SectionCard>
          </div>

          <div className="lg:col-span-4">
            <SectionCard title="Number Formatting (en-US)">
              <DataTable
                columns={[
                  { key: 'setting', header: 'Setting', cell: (r) => <span className="font-bold text-gray-900">{r.setting}</span> },
                  { key: 'example', header: 'Example', align: 'right', cell: (r) => <span className="font-mono text-gray-800">{r.example}</span> },
                ]}
                data={numberFormatting}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-4">
            <SectionCard title="Address & Phone Formatting (en-US)">
              <DataTable
                columns={[
                  { key: 'setting', header: 'Setting', cell: (r) => <span className="font-bold text-gray-900">{r.setting}</span> },
                  { key: 'example', header: 'Example', cell: (r) => <span className="font-mono text-gray-800">{r.example}</span> },
                ]}
                data={addressPhoneFormatting}
                density="compact"
              />
            </SectionCard>
          </div>
          <div className="lg:col-span-4">
            <SectionCard title="Measurement Units">
              <DataTable
                columns={[
                  { key: 'category', header: 'Category', cell: (r) => <span className="font-bold text-gray-900">{r.category}</span> },
                  { key: 'system', header: 'System (en-US)' },
                  { key: 'display', header: 'Display' },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                ]}
                data={measurementUnits}
                density="compact"
              />
            </SectionCard>
          </div>

          <div className="lg:col-span-6">
            <SectionCard title="Fiscal Calendars">
              <DataTable
                columns={[
                  { key: 'region', header: 'Region', cell: (r) => <span className="font-bold text-gray-900">{r.region}</span> },
                  { key: 'fiscalYearStart', header: 'Fiscal Year Start' },
                  { key: 'weekStart', header: 'Week Start' },
                  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
                ]}
                data={fiscalCalendars}
                density="compact"
              />
            </SectionCard>
          </div>
        </div>
      );

    case 'inheritance':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-4">
            <SectionCard title="Localization Inheritance">
              <div className="flex flex-col items-center justify-center p-2">
                <ReusableDonutChart
                  data={charts.inheritance}
                  totalValue="112"
                  totalLabel="Locales"
                  height={150}
                />
              </div>
            </SectionCard>
          </div>
          <div className="lg:col-span-8">
            <SectionCard title="Regional Overrides">
              <DataTable
                columns={[
                  { key: 'type', header: 'Type', cell: (r) => <span className="font-bold text-gray-900">{r.type}</span> },
                  { key: 'activeRules', header: 'Active Rules', align: 'right', cell: (r) => <span className="font-bold text-emerald-700">{r.activeRules}</span> },
                ]}
                data={regionalOverrides}
                density="compact"
              />
            </SectionCard>
          </div>
        </div>
      );

    case 'readiness':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SectionCard title="Localization Readiness Trend (90 Days)">
            <ResponsiveLineChart
              data={charts.readinessTrend}
              xAxisKey="label"
              series={[
                { key: 'Overall Readiness', label: 'Overall Readiness', color: '#10b981', strokeWidth: 2.5 },
                { key: 'Translation Coverage', label: 'Translation Coverage', color: '#3b82f6', dashed: true },
                { key: 'FX Freshness', label: 'FX Freshness', color: '#8b5cf6', dashed: true },
              ]}
              height={200}
            />
          </SectionCard>
          
          <SectionCard title="Localization Risk Trend (90 Days)">
            <ResponsiveLineChart
              data={charts.riskTrend}
              xAxisKey="label"
              series={[
                { key: 'High Risk Items', label: 'High Risk Items', color: '#f43f5e', strokeWidth: 2.5 },
                { key: 'Missing Translations', label: 'Missing Translations', color: '#f59e0b', dashed: true },
                { key: 'Stale FX', label: 'Stale FX', color: '#8b5cf6', dashed: true },
              ]}
              height={200}
            />
          </SectionCard>
        </div>
      );

    default:
      return (
        <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-500 text-sm shadow-2xs">
          The <span className="font-bold text-gray-700">{activeTab}</span> tab is under construction.
        </div>
      );
  }
}
export default LocalizationTabContent;
