'use client';

import React from 'react';
import { LocalizationFullData, CountryLocaleRecord } from '@/lib/administration/localization/localization.types';
import { SectionCard } from '@/components/shared/SectionCard/SectionCard';
import { DataTable, ColumnDef } from '@/components/shared/DataTable/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge/StatusBadge';
import { ProgressBar } from '@/components/admin/logistics/shared/ProgressBar';
import { SelectedLocalePanel } from '../SelectedLocalePanel';
import { ChevronRight } from 'lucide-react';

interface LocalizationOverviewTabProps {
  data: LocalizationFullData;
  selectedLocaleItem: CountryLocaleRecord;
  onSelectLocaleItem: (item: CountryLocaleRecord) => void;
  onNavigateTab: (tabId: string) => void;
}

export function LocalizationOverviewTab({
  data,
  selectedLocaleItem,
  onSelectLocaleItem,
  onNavigateTab,
}: LocalizationOverviewTabProps) {
  const {
    countryLocales,
    selectedLocale,
    regionalCoverage,
    translationCoverage,
    translationGaps,
  } = data;

  const registryColumns: ColumnDef<CountryLocaleRecord>[] = [
    {
      key: 'country',
      header: 'Country / Locale',
      cell: (r) => (
        <button
          type="button"
          onClick={() => onSelectLocaleItem(r)}
          className="font-bold text-gray-900 hover:text-[#741d35] hover:underline text-left"
        >
          {r.country}
        </button>
      ),
    },
    { key: 'locales', header: 'Locales', cell: (r) => <span className="font-mono font-bold text-gray-800">{r.locales}</span> },
    { key: 'primaryLocale', header: 'Primary Locale' },
    { key: 'status', header: 'Locale Status', cell: (r) => <StatusBadge status={r.status} size="xs" /> },
    { key: 'channels', header: 'Channels', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.channels}</span> },
    { key: 'domains', header: 'Domains', align: 'center', cell: (r) => <span className="font-bold text-gray-900">{r.domains}</span> },
    { key: 'translationCoverage', header: 'Translation', align: 'center', cell: (r) => <span className="font-extrabold text-emerald-700">{r.translationCoverage}%</span> },
    { key: 'fxFreshness', header: 'FX Freshness', cell: (r) => <StatusBadge status={r.fxFreshness} size="xs" /> },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ROW 1: Country/Locale Registry, Selected Locale panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Registry Table (8 of 12) */}
        <div className="lg:col-span-8 min-w-0">
          <SectionCard
            title="Country / Locale Registry"
            actions={
              <button
                type="button"
                onClick={() => onNavigateTab('locales')}
                className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
              >
                <span>View all countries & locales</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            <DataTable columns={registryColumns} data={countryLocales} density="compact" />
          </SectionCard>
        </div>

        {/* Selected Locale Details (4 of 12) */}
        <div className="lg:col-span-4 min-w-0">
          <SelectedLocalePanel
            details={selectedLocale}
            onEdit={() => alert('Edit Locale')}
            onClone={() => alert('Clone Locale')}
            onViewDetails={() => onNavigateTab('locales')}
          />
        </div>
      </div>

      {/* ROW 2: Regional Coverage, Translation Coverage by Domain, Translation Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Country & Regional Coverage */}
        <SectionCard
          title="Country & Regional Coverage"
          actions={
            <button
              type="button"
              onClick={() => onNavigateTab('countries')}
              className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>View regional coverage</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          }
        >
          <DataTable
            columns={[
              { key: 'region', header: 'Region', cell: (r) => <span className="font-bold text-gray-900">{r.region}</span> },
              { key: 'countries', header: 'Countries', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.countries}</span> },
              { key: 'locales', header: 'Locales', align: 'center', cell: (r) => <span className="font-bold text-gray-800">{r.locales}</span> },
              { key: 'coverage', header: 'Coverage', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.coverage}%</span> },
              { key: 'translations', header: 'Translations', align: 'center', cell: (r) => <span className="font-bold text-emerald-700">{r.translations}%</span> },
              { key: 'fxFreshness', header: 'FX Freshness', cell: (r) => <StatusBadge status={r.fxFreshness} size="xs" /> },
            ]}
            data={regionalCoverage}
            density="compact"
          />
        </SectionCard>

        {/* Translation Coverage by Domain */}
        <SectionCard
          title="Translation Coverage by Domain"
          actions={
            <button
              type="button"
              onClick={() => onNavigateTab('translations')}
              className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>View domain coverage</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          }
        >
          <div className="flex flex-col gap-3.5 p-1 text-[11px]">
            {translationCoverage.map((tc, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between font-bold text-gray-850">
                  <span>{tc.domain}</span>
                  <span className="text-emerald-700">{tc.percentage}%</span>
                </div>
                <ProgressBar value={tc.percentage} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Translation Gaps (Top 5) */}
        <SectionCard
          title="Translation Gaps (Top 5)"
          actions={
            <button
              type="button"
              onClick={() => onNavigateTab('translations')}
              className="text-[#741d35] text-[10px] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>View all translation gaps</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          }
        >
          <DataTable
            columns={[
              { key: 'domain', header: 'Domain', cell: (r) => <span className="font-bold text-gray-900">{r.domain}</span> },
              { key: 'missingStrings', header: 'Missing Strings', align: 'right', cell: (r) => <span className="font-bold text-rose-700">{r.missingStrings.toLocaleString()}</span> },
            ]}
            data={translationGaps}
            density="compact"
          />
        </SectionCard>
      </div>
    </div>
  );
}
export default LocalizationOverviewTab;
