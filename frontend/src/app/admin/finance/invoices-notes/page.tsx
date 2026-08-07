'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { InvoicesNotesHeader } from '@/components/admin/finance/InvoicesNotesHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { InvoiceNoteOverviewSection } from '@/components/admin/finance/InvoiceNoteOverviewSection';
import { InvoiceNoteSearchFilterBar } from '@/components/admin/finance/InvoiceNoteSearchFilterBar';
import { FinancialDocumentPortfolioTable } from '@/components/admin/finance/FinancialDocumentPortfolioTable';
import { SelectedDocumentPreview } from '@/components/admin/finance/SelectedDocumentPreview';
import { DocumentOperationsBottomGrid } from '@/components/admin/finance/DocumentOperationsBottomGrid';
import { RightInvoiceNoteSidebar } from '@/components/admin/finance/RightInvoiceNoteSidebar';

import {
  FN11_CONTEXT,
  FN11_KPIS,
  FN11_TABS,
  FN11_PORTFOLIO_ROWS,
  FN11_SELECTED_PREVIEW,
} from '@/data/mockInvoicesNotesData';
import { FinancialDocumentRow } from '@/types/finance';

export default function InvoicesNotesPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<FinancialDocumentRow>(FN11_PORTFOLIO_ROWS[0]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          {/* Header Strip */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <InvoicesNotesHeader />
            <FinanceContextBar context={FN11_CONTEXT} />
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4 max-w-[1720px] mx-auto w-full">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* 12 KPI Grid */}
              <FinanceKpiGrid kpis={FN11_KPIS} />

              {/* Navigation Tabs */}
              <FinanceSectionTabs
                tabs={FN11_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab View Content */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-4">
                  {/* Overview Analytics: 4 panels */}
                  <InvoiceNoteOverviewSection />

                  {/* Filter Matrix */}
                  <InvoiceNoteSearchFilterBar />

                  {/* Financial Document Portfolio Table */}
                  <FinancialDocumentPortfolioTable
                    rows={FN11_PORTFOLIO_ROWS}
                    selectedRowId={selectedRecord.id}
                    onSelectRow={(row) => setSelectedRecord(row)}
                  />

                  {/* Selected Document Preview */}
                  <SelectedDocumentPreview
                    record={{
                      ...FN11_SELECTED_PREVIEW,
                      ...selectedRecord,
                    }}
                  />

                  {/* 17 Operational Mini Cards */}
                  <DocumentOperationsBottomGrid />
                </div>
              )}

              {activeTab !== 'Overview' && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-xs text-gray-500 shadow-sm">
                  Viewing filtered tab: <strong className="text-gray-900">{activeTab}</strong>. Showing matching document records.
                </div>
              )}
            </div>

            {/* Right Operations Rail */}
            <div className="w-full xl:w-72 shrink-0">
              <RightInvoiceNoteSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
