'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PayablesHeader } from '@/components/admin/finance/PayablesHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { PayableOverviewSection } from '@/components/admin/finance/PayableOverviewSection';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { PayableSearchFilterBar } from '@/components/admin/finance/PayableSearchFilterBar';
import { SupplierPayablesPortfolioTable } from '@/components/admin/finance/SupplierPayablesPortfolioTable';
import { SelectedPayablePreview } from '@/components/admin/finance/SelectedPayablePreview';
import { PayableOperationsBottomGrid } from '@/components/admin/finance/PayableOperationsBottomGrid';
import { RightPayableSidebar } from '@/components/admin/finance/RightPayableSidebar';

import {
  FN06_CONTEXT,
  FN06_KPIS,
  FN06_TABS,
  FN06_HEALTH_METRICS,
  FN06_PORTFOLIO_ROWS,
  FN06_SELECTED_PREVIEW,
} from '@/data/mockSupplierPayableData';
import { SupplierPayableRow, SupplierPayableDetail } from '@/types/finance';

export default function SupplierPayablesPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<SupplierPayableDetail>(FN06_SELECTED_PREVIEW);

  const handleSelectRow = (row: SupplierPayableRow) => {
    setSelectedRecord({
      ...FN06_SELECTED_PREVIEW,
      id: row.id,
      payableType: row.payableType,
      supplierName: row.supplierName,
      supplierId: row.supplierId,
      supplierTier: row.supplierTier,
      invoiceRef: row.invoiceRef,
      poRef: row.poRef,
      grRef: row.grRef,
      businessUnit: row.businessUnit,
      channel: row.channel,
      currency: row.currency,
      grossAmount: row.grossAmount,
      discounts: row.discounts,
      credits: row.credits,
      returnsDeduction: row.returnsDeduction,
      commissionOffset: row.commissionOffset,
      marketplaceFees: row.marketplaceFees,
      taxAmount: row.taxAmount,
      withholdingTax: row.withholdingTax,
      netPayable: row.netPayable,
      paidAmount: row.paidAmount,
      outstandingAmount: row.outstandingAmount,
      matchStatus: row.matchStatus,
      approvalStatus: row.approvalStatus,
      dueStatus: row.dueStatus,
      dueDate: row.dueDate,
      paymentSchedule: row.paymentSchedule,
      payoutStatus: row.payoutStatus,
      hold: row.hold,
      dispute: row.dispute,
      reconciliationStatus: row.reconciliationStatus,
      exceptionReason: row.exceptionReason,
      owner: row.owner,
    });
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          
          {/* ── Fixed/Sticky Header Area ── */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <PayablesHeader />
            <FinanceContextBar context={FN06_CONTEXT} />
          </div>

          {/* ── Scrollable Body Area ── */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-3">
              
              {/* ── Main Left Column ── */}
              <div className="flex flex-col gap-3 min-w-0">
                {/* 12 KPI Grid */}
                <FinanceKpiGrid kpis={FN06_KPIS} />

                {/* 17 Section Tabs */}
                <FinanceSectionTabs
                  tabs={FN06_TABS}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {/* Tab-driven Content: Overview Tab */}
                {activeTab === 'Overview' && (
                  <>
                    {/* Charts & Summary Row */}
                    <PayableOverviewSection />

                    {/* 10-Metric Health Scorecard */}
                    <FinanceHealthScorecard metrics={FN06_HEALTH_METRICS} />

                    {/* Filter & Search Matrix */}
                    <PayableSearchFilterBar />

                    {/* Dense Portfolio Table */}
                    <SupplierPayablesPortfolioTable
                      rows={FN06_PORTFOLIO_ROWS}
                      selectedRowId={selectedRecord.id}
                      onSelectRow={handleSelectRow}
                    />

                    {/* Selected Payable Preview */}
                    <SelectedPayablePreview record={selectedRecord} />

                    {/* 12 Operational Cards */}
                    <PayableOperationsBottomGrid />
                  </>
                )}

                {/* Fallback for other tabs */}
                {activeTab !== 'Overview' && (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                    <p className="text-sm font-semibold">Viewing filtered category: <strong className="text-gray-800">{activeTab}</strong></p>
                    <p className="text-xs text-gray-400 mt-1">Filtered portfolio table view for {activeTab}</p>
                    <div className="mt-4">
                      <SupplierPayablesPortfolioTable
                        rows={FN06_PORTFOLIO_ROWS}
                        selectedRowId={selectedRecord.id}
                        onSelectRow={handleSelectRow}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ── Right Payables Rail ── */}
              <div className="flex flex-col gap-3">
                <RightPayableSidebar />
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
