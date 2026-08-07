'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { TaxCurrencyConfigHeader } from '@/components/admin/finance/TaxCurrencyConfigHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { ConfigurationOverviewSection } from '@/components/admin/finance/ConfigurationOverviewSection';
import { ConfigurationSearchFilterBar } from '@/components/admin/finance/ConfigurationSearchFilterBar';
import { ConfigurationPortfolioTable } from '@/components/admin/finance/ConfigurationPortfolioTable';
import { SelectedConfigurationPreview } from '@/components/admin/finance/SelectedConfigurationPreview';
import { ConfigOperationsBottomGrid } from '@/components/admin/finance/ConfigOperationsBottomGrid';
import { RightConfigSidebar } from '@/components/admin/finance/RightConfigSidebar';

import {
  FN12_CONTEXT,
  FN12_KPIS,
  FN12_TABS,
  FN12_PORTFOLIO_ROWS,
  FN12_SELECTED_PREVIEW,
  FN12_HEALTH_METRICS,
} from '@/data/mockTaxCurrencyConfigData';
import { ConfigurationPortfolioRow } from '@/types/finance';

export default function TaxCurrencyConfigPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<ConfigurationPortfolioRow>(FN12_PORTFOLIO_ROWS[2]); // default: FX Rate

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          {/* Header Strip */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <TaxCurrencyConfigHeader />
            <FinanceContextBar context={FN12_CONTEXT} />
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4 max-w-[1720px] mx-auto w-full">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* 12 KPI Grid */}
              <FinanceKpiGrid kpis={FN12_KPIS} />

              {/* Navigation Tabs */}
              <FinanceSectionTabs
                tabs={FN12_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab View Content */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-4">
                  {/* Overview Analytics: 3 panels + Health Scorecard */}
                  <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                      <ConfigurationOverviewSection />
                    </div>
                    <div className="xl:w-72 shrink-0">
                      <FinanceHealthScorecard
                        title="Configuration Health Scorecard"
                        metrics={FN12_HEALTH_METRICS.map((m) => ({
                          label: m.label,
                          score: m.score,
                        }))}
                      />
                    </div>
                  </div>

                  {/* Filter Matrix */}
                  <ConfigurationSearchFilterBar />

                  {/* Configuration Portfolio Table */}
                  <ConfigurationPortfolioTable
                    rows={FN12_PORTFOLIO_ROWS}
                    selectedRowId={selectedRecord.id}
                    onSelectRow={(row) => setSelectedRecord(row)}
                  />

                  {/* Selected Configuration Preview */}
                  <SelectedConfigurationPreview
                    record={{
                      ...FN12_SELECTED_PREVIEW,
                      ...selectedRecord,
                    }}
                  />

                  {/* 13 Operational Mini Cards */}
                  <ConfigOperationsBottomGrid />
                </div>
              )}

              {activeTab !== 'Overview' && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-xs text-gray-500 shadow-sm">
                  Viewing filtered tab: <strong className="text-gray-900">{activeTab}</strong>. Showing matching configuration records.
                </div>
              )}
            </div>

            {/* Right Intelligence Rail */}
            <div className="w-full xl:w-72 shrink-0">
              <RightConfigSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
