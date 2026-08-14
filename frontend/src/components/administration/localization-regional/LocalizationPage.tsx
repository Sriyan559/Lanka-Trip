'use client';

import React, { useState, useEffect } from 'react';
import { fetchLocalizationData, addLocale, addLanguage, addCurrency, runReadinessOptimization, refreshExchangeRates } from '@/lib/administration/localization/localization.api';
import { LocalizationFullData, CountryLocaleRecord } from '@/lib/administration/localization/localization.types';
import { LOCALIZATION_TABS } from '@/lib/administration/localization/localization.constants';

import { LocalizationHeader } from './LocalizationHeader';
import { LocalizationContextBar } from './LocalizationContextBar';
import { LocalizationKpiGrid } from './LocalizationKpiGrid';
import { LocalizationFilterBar } from './LocalizationFilterBar';
import { LocalizationRightRail } from './LocalizationRightRail';
import { LocalizationTabContent } from './tabs/LocalizationTabContent';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog/ConfirmDialog';

export function LocalizationPage() {
  const [data, setData] = useState<LocalizationFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  
  const [selectedLocaleItem, setSelectedLocaleItem] = useState<CountryLocaleRecord | null>(null);

  // Dialog states
  const [isAddLocaleOpen, setIsAddLocaleOpen] = useState(false);
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [isAddCurrencyOpen, setIsAddCurrencyOpen] = useState(false);
  const [isReadinessOpen, setIsReadinessOpen] = useState(false);
  const [isRefreshFxOpen, setIsRefreshFxOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchLocalizationData();
      setData(result);
      if (result.countryLocales && result.countryLocales.length > 0) {
        setSelectedLocaleItem(result.countryLocales[0]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleAddLocale = async () => {
    await addLocale('es-ES', 'Spanish (Spain)');
    setIsAddLocaleOpen(false);
    alert('Locale added successfully.');
  };

  const handleAddLanguage = async () => {
    await addLanguage('es', 'Spanish');
    setIsAddLanguageOpen(false);
    alert('Language added successfully.');
  };

  const handleAddCurrency = async () => {
    await addCurrency('EUR', 'Euro');
    setIsAddCurrencyOpen(false);
    alert('Currency added successfully.');
  };

  const handleRunOptimization = async () => {
    await runReadinessOptimization();
    setIsReadinessOpen(false);
    alert('Optimization task triggered successfully.');
  };

  const handleRefreshFx = async () => {
    await refreshExchangeRates();
    setIsRefreshFxOpen(false);
    alert('Exchange rates refreshed successfully.');
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50/50">
        <div className="w-8 h-8 border-4 border-[#741d35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <LocalizationHeader
          onAddLocale={() => setIsAddLocaleOpen(true)}
          onAddLanguage={() => setIsAddLanguageOpen(true)}
          onAddCurrency={() => setIsAddCurrencyOpen(true)}
          onReviewReadiness={() => setIsReadinessOpen(true)}
          onExportRegistry={() => alert('Exporting localization registry...')}
        />

        <LocalizationContextBar context={data.context} />

        <LocalizationKpiGrid kpis={data.kpis} />

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 min-w-0">
            <LocalizationFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeQuickFilter={activeQuickFilter}
              onToggleQuickFilter={(id) => setActiveQuickFilter(prev => prev === id ? null : id)}
              onClearFilters={() => { setSearchQuery(''); setActiveQuickFilter(null); }}
              onRefresh={() => alert('Refreshing filter data...')}
            />

            {/* Tabs Header */}
            <div className="bg-white border-b border-x border-gray-200 rounded-t pt-1 px-2 flex gap-4 overflow-x-auto min-w-0">
              {LOCALIZATION_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 text-[11px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#741d35] text-[#741d35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border-b border-x border-gray-200 rounded-b p-3 shadow-2xs min-w-0">
              <LocalizationTabContent
                activeTab={activeTab}
                data={data}
                selectedLocaleItem={selectedLocaleItem!}
                onSelectLocaleItem={setSelectedLocaleItem}
                onNavigateTab={setActiveTab}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-72 shrink-0">
            <LocalizationRightRail
              onNavigateTab={setActiveTab}
              onActionClick={(action) => {
                if (action === 'add_locale') setIsAddLocaleOpen(true);
                else if (action === 'add_language') setIsAddLanguageOpen(true);
                else if (action === 'add_currency') setIsAddCurrencyOpen(true);
                else if (action === 'run_readiness_optimization') setIsReadinessOpen(true);
                else if (action === 'refresh_fx_rates') setIsRefreshFxOpen(true);
                else alert(`Action triggered: ${action}`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        isOpen={isAddLocaleOpen}
        title="Add New Locale"
        description="Configure and add a new locale into the platform repository. This action requires approval from the localization team."
        confirmLabel="Add Locale"
        cancelLabel="Cancel"
        onConfirm={handleAddLocale}
        onCancel={() => setIsAddLocaleOpen(false)}
      />

      <ConfirmDialog
        isOpen={isAddLanguageOpen}
        title="Add New Language"
        description="Submit a proposal to add a new supported language to the platform catalog."
        confirmLabel="Add Language"
        cancelLabel="Cancel"
        onConfirm={handleAddLanguage}
        onCancel={() => setIsAddLanguageOpen(false)}
      />

      <ConfirmDialog
        isOpen={isAddCurrencyOpen}
        title="Add New Currency"
        description="Register a new currency for multi-currency pricing and settlement. Requires finance department review."
        confirmLabel="Add Currency"
        cancelLabel="Cancel"
        onConfirm={handleAddCurrency}
        onCancel={() => setIsAddCurrencyOpen(false)}
      />

      <ConfirmDialog
        isOpen={isReadinessOpen}
        title="Run Readiness Optimization"
        description="Initiate validation rules and compilation processes to sync translation assets across environments."
        confirmLabel="Run Optimization"
        cancelLabel="Cancel"
        onConfirm={handleRunOptimization}
        onCancel={() => setIsReadinessOpen(false)}
      />

      <ConfirmDialog
        isOpen={isRefreshFxOpen}
        title="Refresh Exchange Rates"
        description="Force sync exchange rates from XE Currency & Refinitiv feeds immediately."
        confirmLabel="Refresh Rates"
        cancelLabel="Cancel"
        onConfirm={handleRefreshFx}
        onCancel={() => setIsRefreshFxOpen(false)}
      />
    </div>
  );
}
export default LocalizationPage;
