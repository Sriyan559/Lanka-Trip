'use client';

import React, { useState } from 'react';
import { RevenueReceivablesHeader } from '@/components/admin/finance/RevenueReceivablesHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { RevenueReceivablesTabs } from '@/components/admin/finance/RevenueReceivablesTabs';
import { RevenueOverviewSection } from '@/components/admin/finance/RevenueOverviewSection';
import { ReceivablesAgeingSection } from '@/components/admin/finance/ReceivablesAgeingSection';
import { CollectionsDisputesSection } from '@/components/admin/finance/CollectionsDisputesSection';
import { AdjustmentsDeferredSection } from '@/components/admin/finance/AdjustmentsDeferredSection';
import { RevenueSearchFilterBar } from '@/components/admin/finance/RevenueSearchFilterBar';
import { RevenuePortfolioTable } from '@/components/admin/finance/RevenuePortfolioTable';
import { SelectedRevenueRecordPreview } from '@/components/admin/finance/SelectedRevenueRecordPreview';
import { RightRevenueSidebar } from '@/components/admin/finance/RightRevenueSidebar';
import { RevenueReceivablesProvider, revenueView, useRevenueReceivables } from '@/contexts/FinanceRevenuePaymentsContext';
import { RevenuePortfolioRow } from '@/types/finance';

function SalesRevenueReceivablesContent() {
  const { data, loading, error, setFilters } = useRevenueReceivables();
  const live = revenueView(data);
  const [activeTab, setActiveTab] = useState('Revenue Overview');
  const [selectedRecord, setSelectedRecord] = useState<RevenuePortfolioRow | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 md:p-5 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-4 items-start">
        {/* Main Workspace */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. Page Header */}
          <RevenueReceivablesHeader />

          {/* 2. Finance Context Strip */}
          {error && <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">{error.message}</div>}
          {loading && !data && <div className="rounded border border-gray-200 bg-white p-3 text-xs text-gray-500">Loading revenue and receivables…</div>}
          {live.context && <FinanceContextBar context={live.context} />}

          {/* 3. Revenue KPI Cards (12) */}
          <FinanceKpiGrid kpis={live.kpis} />

          {/* 4. Section Navigation Tabs */}
          <RevenueReceivablesTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. Section Content */}
          {activeTab === 'Revenue Overview' && <RevenueOverviewSection />}
          {activeTab === 'Receivables & Ageing' && <ReceivablesAgeingSection />}
          {activeTab === 'Collections & Disputes' && <CollectionsDisputesSection />}
          {activeTab === 'Adjustments & Deferred' && <AdjustmentsDeferredSection />}

          {/* 6. Search & Filter Bar */}
          <RevenueSearchFilterBar onSearch={(search)=>setFilters({search})} />

          {/* 7. Revenue Portfolio Table */}
          <RevenuePortfolioTable
            selectedRef={selectedRecord?.ref}
            onSelectRecord={(row) => setSelectedRecord(row)}
          />

          {/* 8. Selected Record Preview */}
          <SelectedRevenueRecordPreview
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
          />
        </main>

        {/* Right Sidebar */}
        <RightRevenueSidebar />
      </div>
    </div>
  );
}

export default function SalesRevenueReceivablesPage(){return <RevenueReceivablesProvider><SalesRevenueReceivablesContent /></RevenueReceivablesProvider>}
