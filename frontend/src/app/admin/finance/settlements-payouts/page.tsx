'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { SettlementsHeader } from '@/components/admin/finance/SettlementsHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { SettlementOverviewSection } from '@/components/admin/finance/SettlementOverviewSection';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { SettlementSearchFilterBar } from '@/components/admin/finance/SettlementSearchFilterBar';
import { SettlementPortfolioTable } from '@/components/admin/finance/SettlementPortfolioTable';
import { SelectedSettlementPreview } from '@/components/admin/finance/SelectedSettlementPreview';
import { SettlementOperationsBottomGrid } from '@/components/admin/finance/SettlementOperationsBottomGrid';
import { RightSettlementSidebar } from '@/components/admin/finance/RightSettlementSidebar';

import {
  FN09_CONTEXT,
  FN09_KPIS,
  FN09_TABS,
  FN09_HEALTH_METRICS,
  FN09_PORTFOLIO_ROWS,
  FN09_SELECTED_PREVIEW,
} from '@/data/mockSettlementData';
import { SettlementPortfolioRow } from '@/types/finance';

export default function SettlementsPayoutsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<SettlementPortfolioRow>(FN09_PORTFOLIO_ROWS[0]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          {/* Header Strip */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <SettlementsHeader />
            <FinanceContextBar context={FN09_CONTEXT} />
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4 max-w-[1720px] mx-auto w-full">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* 12 KPI Grid */}
              <FinanceKpiGrid kpis={FN09_KPIS} />

              {/* Navigation Tabs */}
              <FinanceSectionTabs
                tabs={FN09_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab View Content */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-4">
                  {/* Overview Analytics: Trend Chart, Donut, Status Summary */}
                  <SettlementOverviewSection />

                  {/* Operations Health Scorecard (9 Metrics) */}
                  <FinanceHealthScorecard metrics={FN09_HEALTH_METRICS} title="Settlement Operations Health Scorecard" />

                  {/* Filter Matrix */}
                  <SettlementSearchFilterBar />

                  {/* Settlements & Payouts Portfolio Table */}
                  <SettlementPortfolioTable
                    rows={FN09_PORTFOLIO_ROWS}
                    selectedRowId={selectedRecord.id}
                    onSelectRow={(row) => setSelectedRecord(row)}
                  />

                  {/* Selected Record Preview */}
                  <SelectedSettlementPreview
                    record={{
                      ...FN09_SELECTED_PREVIEW,
                      ...selectedRecord,
                    }}
                  />

                  {/* 14 Operational Mini Cards */}
                  <SettlementOperationsBottomGrid />
                </div>
              )}

              {activeTab !== 'Overview' && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-xs text-gray-500 shadow-sm">
                  Viewing filtered tab: <strong className="text-gray-900">{activeTab}</strong>. Showing matching settlement records.
                </div>
              )}
            </div>

            {/* Right Operations Rail */}
            <div className="w-full xl:w-72 shrink-0">
              <RightSettlementSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
