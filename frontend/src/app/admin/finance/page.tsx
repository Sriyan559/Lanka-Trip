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
import { FinanceCommandCenterProvider, useFinanceCommandCenter } from '@/contexts/FinanceCommandCenterContext';

export default function FinanceCommandCenterPage() {
  return <FinanceCommandCenterProvider><FinanceCommandCenterContent /></FinanceCommandCenterProvider>;
}

function FinanceCommandCenterContent() {
  const [activeSectionTab, setActiveSectionTab] = useState('Executive Overview');
  const {error,refresh}=useFinanceCommandCenter();

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 md:p-5 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-4 items-start">
        {/* Main Center Finance Workspace */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. Header & Actions */}
          <FinanceCommandHeader />
          {error && <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-xs flex justify-between"><span>{error.message || 'Unable to load finance data.'}</span><button onClick={refresh} className="font-bold underline">Retry</button></div>}

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
            selectedRef={undefined}
            onSelectRecord={() => undefined}
          />

          {/* 9. Selected Financial Record Preview */}
          <SelectedFinancialRecordPreview record={null} />

          {/* 10. Bottom Finance Domain Mini Cards */}
          <FinanceDomainSummaryGrid />
        </main>

        {/* Right Finance Operations Sidebar */}
        <RightFinanceOperationsSidebar />
      </div>
    </div>
  );
}
