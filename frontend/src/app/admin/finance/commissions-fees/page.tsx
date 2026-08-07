'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CommissionsHeader } from '@/components/admin/finance/CommissionsHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { CommissionOverviewSection } from '@/components/admin/finance/CommissionOverviewSection';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { CommissionSearchFilterBar } from '@/components/admin/finance/CommissionSearchFilterBar';
import { CommissionPortfolioTable } from '@/components/admin/finance/CommissionPortfolioTable';
import { SelectedCommissionPreview } from '@/components/admin/finance/SelectedCommissionPreview';
import { CommissionOperationsBottomGrid } from '@/components/admin/finance/CommissionOperationsBottomGrid';
import { RightCommissionSidebar } from '@/components/admin/finance/RightCommissionSidebar';

import {
  FN08_CONTEXT,
  FN08_KPIS,
  FN08_TABS,
  FN08_HEALTH_METRICS,
  FN08_PORTFOLIO_ROWS,
  FN08_SELECTED_PREVIEW,
} from '@/data/mockCommissionData';
import { CommissionPortfolioRow } from '@/types/finance';

export default function MarketplaceCommissionsFeesPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<CommissionPortfolioRow>(FN08_PORTFOLIO_ROWS[0]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          {/* Header Strip */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <CommissionsHeader />
            <FinanceContextBar context={FN08_CONTEXT} />
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4 max-w-[1720px] mx-auto w-full">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* 12 KPI Grid */}
              <FinanceKpiGrid kpis={FN08_KPIS} />

              {/* Navigation Tabs */}
              <FinanceSectionTabs
                tabs={FN08_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab View Content */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-4">
                  {/* Overview Analytics: Trend Chart, Donut, Status Summary */}
                  <CommissionOverviewSection />

                  {/* Operations Health Scorecard (10 Metrics) */}
                  <FinanceHealthScorecard metrics={FN08_HEALTH_METRICS} title="Commission Operations Health Scorecard" />

                  {/* Filter Matrix */}
                  <CommissionSearchFilterBar />

                  {/* Commissions Portfolio Table */}
                  <CommissionPortfolioTable
                    rows={FN08_PORTFOLIO_ROWS}
                    selectedRowId={selectedRecord.id}
                    onSelectRow={(row) => setSelectedRecord(row)}
                  />

                  {/* Selected Record Preview */}
                  <SelectedCommissionPreview
                    record={{
                      ...FN08_SELECTED_PREVIEW,
                      ...selectedRecord,
                    }}
                  />

                  {/* 12 Operational Mini Cards */}
                  <CommissionOperationsBottomGrid />
                </div>
              )}

              {activeTab !== 'Overview' && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-xs text-gray-500 shadow-sm">
                  Viewing filtered tab: <strong className="text-gray-900">{activeTab}</strong>. Showing matching commission records.
                </div>
              )}
            </div>

            {/* Right Operations Rail */}
            <div className="w-full xl:w-72 shrink-0">
              <RightCommissionSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
