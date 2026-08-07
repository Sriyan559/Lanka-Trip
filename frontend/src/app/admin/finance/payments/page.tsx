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
import { FN03_CONTEXT, FN03_KPIS, FN03_HEALTH_SCORECARD } from '@/data/mockPaymentData';
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

export default function PaymentsTransactionManagementPage() {
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
          <FinanceContextBar context={FN03_CONTEXT} />

          {/* 3. Payment KPI Grid (12 Cards) */}
          <FinanceKpiGrid kpis={FN03_KPIS} />

          {/* 4. Payment Navigation Tabs */}
          <FinanceSectionTabs
            tabs={PAYMENT_TABS}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 5. Payment Overview Section (3 Panels) */}
          <PaymentOverviewSection />

          {/* 6. Operations Health Scorecard */}
          <FinanceHealthScorecard metrics={FN03_HEALTH_SCORECARD} />

          {/* 7. Active Filter Chips & Advanced Filter Matrix */}
          <PaymentFilterBar />

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
