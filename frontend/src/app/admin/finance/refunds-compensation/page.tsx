'use client';

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RefundsHeader } from '@/components/admin/finance/RefundsHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { RefundOverviewSection } from '@/components/admin/finance/RefundOverviewSection';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { RefundSearchFilterBar } from '@/components/admin/finance/RefundSearchFilterBar';
import { RefundPortfolioTable } from '@/components/admin/finance/RefundPortfolioTable';
import { SelectedRefundPreview } from '@/components/admin/finance/SelectedRefundPreview';
import { RefundOperationsWorkflow } from '@/components/admin/finance/RefundOperationsWorkflow';
import { RightRefundSidebar } from '@/components/admin/finance/RightRefundSidebar';

import {
  FN05_CONTEXT,
  FN05_KPIS,
  FN05_TABS,
  FN05_HEALTH_METRICS,
  FN05_PORTFOLIO_ROWS,
  FN05_SELECTED_PREVIEW,
} from '@/data/mockRefundData';
import { RefundPortfolioRow, RefundRecordDetail } from '@/types/finance';

export default function RefundsCompensationPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRecord, setSelectedRecord] = useState<RefundRecordDetail>(FN05_SELECTED_PREVIEW);

  const handleSelectRow = (row: RefundPortfolioRow) => {
    setSelectedRecord({
      ...FN05_SELECTED_PREVIEW,
      id: row.id,
      orderId: row.orderId,
      customerName: row.customerName,
      customerId: row.customerId,
      reasonCode: row.reasonCode,
      paymentMethod: row.paymentMethod,
      productSeller: row.productSeller,
      refundType: row.refundType,
      refundAmount: row.refundAmount,
      compensationAmount: row.compensationAmount,
      eligibility: row.eligibility,
      approval: row.approval,
      processing: row.processing,
      settlementMethod: row.settlementMethod,
      gateway: row.gateway,
      locationRegion: row.locationRegion,
      reconciliationStatus: row.reconciliationStatus,
      dateRequested: row.dateRequested,
      sla: row.sla,
      csat: row.csat ?? 4.8,
    });
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          
          {/* ── Fixed/Sticky Header Area ── */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <RefundsHeader />
            <FinanceContextBar context={FN05_CONTEXT} />
          </div>

          {/* ── Scrollable Body Area ── */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-3">
              
              {/* ── Main Left Column ── */}
              <div className="flex flex-col gap-3 min-w-0">
                {/* 12 KPI Grid */}
                <FinanceKpiGrid kpis={FN05_KPIS} />

                {/* 15 Section Tabs */}
                <FinanceSectionTabs
                  tabs={FN05_TABS}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {/* Tab-driven Content: Overview Tab */}
                {activeTab === 'Overview' && (
                  <>
                    {/* Charts & Summary Row */}
                    <RefundOverviewSection />

                    {/* 11-Metric Health Scorecard */}
                    <FinanceHealthScorecard metrics={FN05_HEALTH_METRICS} />

                    {/* Filter & Search Matrix */}
                    <RefundSearchFilterBar />

                    {/* Dense Portfolio Table */}
                    <RefundPortfolioTable
                      rows={FN05_PORTFOLIO_ROWS}
                      selectedRowId={selectedRecord.id}
                      onSelectRow={handleSelectRow}
                    />

                    {/* Selected Refund Preview */}
                    <SelectedRefundPreview record={selectedRecord} />

                    {/* 7 Workflow Cards */}
                    <RefundOperationsWorkflow />
                  </>
                )}

                {/* Fallback for other tabs */}
                {activeTab !== 'Overview' && (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                    <p className="text-sm font-semibold">Viewing filtered category: <strong className="text-gray-800">{activeTab}</strong></p>
                    <p className="text-xs text-gray-400 mt-1">Filtered portfolio table view for {activeTab}</p>
                    <div className="mt-4">
                      <RefundPortfolioTable
                        rows={FN05_PORTFOLIO_ROWS}
                        selectedRowId={selectedRecord.id}
                        onSelectRow={handleSelectRow}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ── Right Refund Rail ── */}
              <div className="flex flex-col gap-3">
                <RightRefundSidebar />
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
