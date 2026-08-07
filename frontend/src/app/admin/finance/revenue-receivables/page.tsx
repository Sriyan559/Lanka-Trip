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
import { FN02_CONTEXT, FN02_KPIS } from '@/data/mockRevenueData';
import { RevenuePortfolioRow } from '@/types/finance';

export default function SalesRevenueReceivablesPage() {
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
          <FinanceContextBar context={FN02_CONTEXT} />

          {/* 3. Revenue KPI Cards (12) */}
          <FinanceKpiGrid kpis={FN02_KPIS} />

          {/* 4. Section Navigation Tabs */}
          <RevenueReceivablesTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. Section Content */}
          {activeTab === 'Revenue Overview' && <RevenueOverviewSection />}
          {activeTab === 'Receivables & Ageing' && <ReceivablesAgeingSection />}
          {activeTab === 'Collections & Disputes' && <CollectionsDisputesSection />}
          {activeTab === 'Adjustments & Deferred' && <AdjustmentsDeferredSection />}

          {/* 6. Search & Filter Bar */}
          <RevenueSearchFilterBar />

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
