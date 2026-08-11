'use client';

import React, { useState } from 'react';
import { PaymentsHeader } from '@/components/admin/finance/PaymentsHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceKpiGrid } from '@/components/admin/finance/FinanceKpiGrid';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';
import { PaymentOverviewSection } from '@/components/admin/finance/PaymentOverviewSection';
import { FinanceHealthScorecard } from '@/components/admin/finance/FinanceHealthScorecard';
import { PaymentFilterBar } from '@/components/admin/finance/PaymentFilterBar';
import { PaymentPortfolioTable } from '@/components/admin/finance/PaymentPortfolioTable';
import { SelectedPaymentPreview } from '@/components/admin/finance/SelectedPaymentPreview';
import { PaymentOperationsBottomGrid } from '@/components/admin/finance/PaymentOperationsBottomGrid';
import { RightPaymentSidebar } from '@/components/admin/finance/RightPaymentSidebar';
import { PaymentsManagementProvider, paymentsView, usePaymentsManagement } from '@/contexts/FinanceRevenuePaymentsContext';
import { PaymentPortfolioRow } from '@/types/finance';

const PAYMENT_TABS = [
  'Overview',
  'All Transactions',
  'Authorized',
  'Pending Capture',
  'Captured',
  'Partially Captured',
  'Failed',
  'Declined',
  'Reversed',
  'Voided',
  'Retry Eligible',
  'Duplicate Candidates',
  'Payment Holds',
  'High Risk',
  'Disputed',
  'Reconciliation',
  'Exceptions',
  'Audit History',
];

function PaymentsTransactionManagementContent() {
  const { data, loading, error, setFilters } = usePaymentsManagement();
  const live = paymentsView(data);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedPayment, setSelectedPayment] = useState<PaymentPortfolioRow | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] p-3 md:p-5 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-4 items-start">
        {/* Main Center Finance Workspace */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. Header & Top Actions */}
          <PaymentsHeader />

          {/* 2. Finance Context Strip */}
          {error && <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">{error.message}</div>}
          {loading && !data && <div className="rounded border border-gray-200 bg-white p-3 text-xs text-gray-500">Loading payments…</div>}
          {live.context && <FinanceContextBar context={live.context} />}

          {/* 3. Payment KPI Grid (12 Cards) */}
          <FinanceKpiGrid kpis={live.kpis} />

          {/* 4. Payment Navigation Tabs */}
          <FinanceSectionTabs
            tabs={PAYMENT_TABS}
            activeTab={activeTab}
            onTabChange={(tab) => {setActiveTab(tab);setFilters({status:tab==='Overview'||tab==='All Transactions'?'':tab.toLowerCase().replaceAll(' ','_')})}}
          />

          {/* 5. Payment Overview Section (3 Panels) */}
          <PaymentOverviewSection />

          {/* 6. Operations Health Scorecard */}
          <FinanceHealthScorecard metrics={live.health} />

          {/* 7. Active Filter Chips & Advanced Filter Matrix */}
          <PaymentFilterBar onSearch={(search)=>setFilters({search})} />

          {/* 8. Main Workspace Split: Portfolio Table + Selected Record Preview */}
          <div className="flex flex-col lg:flex-row gap-3 items-start">
            <div className="flex-1 min-w-0 w-full">
              <PaymentPortfolioTable
                selectedId={selectedPayment?.id}
                onSelectRow={(row) => setSelectedPayment(row)}
              />
            </div>
            <div className="w-full lg:w-80 xl:w-96 shrink-0">
              <SelectedPaymentPreview payment={selectedPayment} />
            </div>
          </div>

          {/* 9. Bottom Operational Mini Cards (16 Cards + Health Strip) */}
          <PaymentOperationsBottomGrid />
        </main>

        {/* Far-Right Payment Operations Rail */}
        <RightPaymentSidebar />
      </div>
    </div>
  );
}

export default function PaymentsTransactionManagementPage(){return <PaymentsManagementProvider><PaymentsTransactionManagementContent /></PaymentsManagementProvider>}
