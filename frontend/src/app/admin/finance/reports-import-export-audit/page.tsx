'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ReportsImportExportAuditHeader } from '@/components/admin/finance/ReportsImportExportAuditHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { ReportsOverviewSection } from '@/components/admin/finance/ReportsOverviewSection';
import { ReportsSearchFilterBar } from '@/components/admin/finance/ReportsSearchFilterBar';
import { FinanceDataOperationsPortfolioTable } from '@/components/admin/finance/FinanceDataOperationsPortfolioTable';
import { SelectedFinanceOperationPreview } from '@/components/admin/finance/SelectedFinanceOperationPreview';
import { ReportsOperationsBottomGrid } from '@/components/admin/finance/ReportsOperationsBottomGrid';
import { RightReportsSidebar } from '@/components/admin/finance/RightReportsSidebar';

import {
  FN14_CONTEXT,
  FN14_KPIS,
  FN14_TABS,
  FN14_PORTFOLIO_ROWS,
  FN14_SELECTED_PREVIEW,
  FN14_HEALTH_METRICS,
} from '@/data/mockReportsImportExportAuditData';
import { FinanceDataOperationRow } from '@/types/finance';

export default function ReportsImportExportAuditPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<FinanceDataOperationRow>(FN14_PORTFOLIO_ROWS[0]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          {/* Header Strip */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <ReportsImportExportAuditHeader />
            <FinanceContextBar context={FN14_CONTEXT} />
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4 max-w-[1720px] mx-auto w-full">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* 12 KPI Grid */}
              <FinanceKpiGrid kpis={FN14_KPIS} />

              {/* Navigation Tabs */}
              <FinanceSectionTabs
                tabs={FN14_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab View Content */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-4">
                  {/* Overview Analytics: 3 panels + Governance Health Scorecard */}
                  <div className="flex flex-col gap-4">
                    <ReportsOverviewSection />

                    <FinanceHealthScorecard
                      title="Finance Data Governance Health Scorecard"
                      metrics={FN14_HEALTH_METRICS.map((m) => ({
                        label: m.label,
                        score: m.score,
                      }))}
                    />
                  </div>

                  {/* Filter Matrix */}
                  <ReportsSearchFilterBar />

                  {/* Portfolio Table */}
                  <FinanceDataOperationsPortfolioTable
                    rows={FN14_PORTFOLIO_ROWS}
                    selectedRowId={selectedRecord.id}
                    onSelectRow={(row) => setSelectedRecord(row)}
                  />

                  {/* Selected Preview */}
                  <SelectedFinanceOperationPreview
                    record={{
                      ...FN14_SELECTED_PREVIEW,
                      ...selectedRecord,
                    }}
                  />

                  {/* 17 Operational Mini Cards */}
                  <ReportsOperationsBottomGrid />
                </div>
              )}

              {activeTab !== 'Overview' && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-xs text-gray-500 shadow-sm">
                  Viewing filtered tab: <strong className="text-gray-900">{activeTab}</strong>. Showing matching report &amp; data operation records.
                </div>
              )}
            </div>

            {/* Right Intelligence Rail */}
            <div className="w-full xl:w-72 shrink-0">
              <RightReportsSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
