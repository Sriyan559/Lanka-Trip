'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ReconciliationControlsHeader } from '@/components/admin/finance/ReconciliationControlsHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { ReconciliationOverviewSection } from '@/components/admin/finance/ReconciliationOverviewSection';
import { ReconciliationSearchFilterBar } from '@/components/admin/finance/ReconciliationSearchFilterBar';
import { ReconciliationControlsPortfolioTable } from '@/components/admin/finance/ReconciliationControlsPortfolioTable';
import { SelectedReconciliationPreview } from '@/components/admin/finance/SelectedReconciliationPreview';
import { ReconciliationOperationsBottomGrid } from '@/components/admin/finance/ReconciliationOperationsBottomGrid';
import { RightReconciliationSidebar } from '@/components/admin/finance/RightReconciliationSidebar';

import {
  FN13_CONTEXT,
  FN13_KPIS,
  FN13_SECONDARY_KPIS,
  FN13_TABS,
  FN13_PORTFOLIO_ROWS,
  FN13_SELECTED_PREVIEW,
  FN13_HEALTH_METRICS,
} from '@/data/mockReconciliationControlsData';
import { ReconciliationRecordRow } from '@/types/finance';

export default function ReconciliationControlsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<ReconciliationRecordRow>(FN13_PORTFOLIO_ROWS[0]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          {/* Header Strip */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <ReconciliationControlsHeader />
            <FinanceContextBar context={FN13_CONTEXT} />
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4 max-w-[1720px] mx-auto w-full">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* 9 Primary KPI Grid */}
              <FinanceKpiGrid kpis={FN13_KPIS} />

              {/* Secondary Control KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {FN13_SECONDARY_KPIS.map((sk) => (
                  <div
                    key={sk.label}
                    className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm flex items-center justify-between"
                  >
                    <span className="text-[10px] font-semibold text-gray-600 truncate">{sk.label}</span>
                    <div className="flex items-center gap-1.5 font-mono font-bold">
                      <span className="text-gray-900">{sk.value}</span>
                      <span className={`text-[9px] ${sk.color === 'red' ? 'text-red-600' : sk.color === 'orange' ? 'text-orange-600' : 'text-blue-600'}`}>
                        {sk.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Tabs */}
              <FinanceSectionTabs
                tabs={FN13_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab View Content */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-4">
                  {/* Overview Analytics: 3 panels + Health Scorecard */}
                  <div className="flex flex-col gap-4">
                    <ReconciliationOverviewSection />

                    <FinanceHealthScorecard
                      title="Financial Control Health Scorecard"
                      metrics={FN13_HEALTH_METRICS.map((m) => ({
                        label: m.label,
                        score: m.score,
                      }))}
                    />
                  </div>

                  {/* Filter Matrix */}
                  <ReconciliationSearchFilterBar />

                  {/* Portfolio Table */}
                  <ReconciliationControlsPortfolioTable
                    rows={FN13_PORTFOLIO_ROWS}
                    selectedRowId={selectedRecord.id}
                    onSelectRow={(row) => setSelectedRecord(row)}
                  />

                  {/* Selected Preview */}
                  <SelectedReconciliationPreview
                    record={{
                      ...FN13_SELECTED_PREVIEW,
                      ...selectedRecord,
                    }}
                  />

                  {/* 14 Operational Mini Cards */}
                  <ReconciliationOperationsBottomGrid />
                </div>
              )}

              {activeTab !== 'Overview' && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-xs text-gray-500 shadow-sm">
                  Viewing filtered tab: <strong className="text-gray-900">{activeTab}</strong>. Showing matching reconciliation records.
                </div>
              )}
            </div>

            {/* Right Intelligence Rail */}
            <div className="w-full xl:w-72 shrink-0">
              <RightReconciliationSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
