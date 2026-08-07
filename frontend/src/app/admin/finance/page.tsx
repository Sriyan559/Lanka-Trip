'use client';

import React, { useState } from 'react';
import { FinanceCommandHeader } from '@/components/admin/finance/FinanceCommandHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { ExecutiveOverviewSection } from '@/components/admin/finance/ExecutiveOverviewSection';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { FinanceSearchFilterBar } from '@/components/admin/finance/FinanceSearchFilterBar';
import { FinanceOperationsTable } from '@/components/admin/finance/FinanceOperationsTable';
import { SelectedFinancialRecordPreview } from '@/components/admin/finance/SelectedFinancialRecordPreview';
import { FinanceDomainSummaryGrid } from '@/components/admin/finance/FinanceDomainSummaryGrid';
import { RightFinanceOperationsSidebar } from '@/components/admin/finance/RightFinanceOperationsSidebar';
import { FinancePortfolioRow } from '@/types/finance';

export default function FinanceCommandCenterPage() {
  const [activeSectionTab, setActiveSectionTab] = useState('Executive Overview');
  const [selectedRecord, setSelectedRecord] = useState<FinancePortfolioRow | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 md:p-5 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-4 items-start">
        {/* Main Center Finance Workspace */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. Header & Actions */}
          <FinanceCommandHeader />

          {/* 2. Context Strip */}
          <FinanceContextBar />

          {/* 3. KPI Grid (12 Cards) */}
          <FinanceKpiGrid />

          {/* 4. Finance Section Navigation Tabs */}
          <FinanceSectionTabs
            activeTab={activeSectionTab}
            onTabChange={(tab) => setActiveSectionTab(tab)}
          />

          {/* 5. Executive Overview Panels */}
          <ExecutiveOverviewSection />

          {/* 6. Health Scorecard */}
          <FinanceHealthScorecard />

          {/* 7. Search & Filter Bar */}
          <FinanceSearchFilterBar />

          {/* 8. Finance Operations Portfolio Table */}
          <FinanceOperationsTable
            selectedRef={selectedRecord?.ref}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
          />

          {/* 9. Selected Financial Record Preview */}
          <SelectedFinancialRecordPreview record={selectedRecord} />

          {/* 10. Bottom Finance Domain Mini Cards */}
          <FinanceDomainSummaryGrid />
        </main>

        {/* Right Finance Operations Sidebar */}
        <RightFinanceOperationsSidebar />
      </div>
    </div>
  );
}
