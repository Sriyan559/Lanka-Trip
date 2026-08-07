'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { PaymentDetailHeader } from '@/components/admin/finance/PaymentDetailHeader';
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceAlertBanner } from '@/components/admin/finance/FinanceAlertBanner';
import { PaymentIdentityPanel } from '@/components/admin/finance/PaymentIdentityPanel';
import { PaymentLifecycleBar } from '@/components/admin/finance/PaymentLifecycleBar';
import { PaymentDetailTabs } from '@/components/admin/finance/PaymentDetailTabs';
import { PaymentCalculationTable } from '@/components/admin/finance/PaymentCalculationTable';
import { PaymentAmountTrendChart } from '@/components/admin/finance/PaymentAmountTrendChart';
import { PaymentDetailRightSidebar } from '@/components/admin/finance/PaymentDetailRightSidebar';
import {
  FN04_RECORD_BASE,
  FN04_LIFECYCLE,
  FN04_CALCULATION,
  FN04_AMOUNT_TREND,
  resolvePaymentTransaction,
} from '@/data/mockPaymentDetailData';

export default function PaymentDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || 'PAY-2025-082942';

  /* Resolve record — fall back to base record for any valid ID format */
  const record = resolvePaymentTransaction(rawId) ?? FN04_RECORD_BASE;

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans">
        <div className="flex flex-col h-screen">
          {/* ── Fixed top area ── */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm">
            <PaymentDetailHeader transactionId={record.paymentRef} />
            <FinanceContextBar />
            <FinanceAlertBanner />
          </div>

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-3 p-4">

              {/* ── Left/Main column ── */}
              <div className="flex flex-col gap-3 min-w-0">

                {/* Identity + Amounts + Statuses panel */}
                <PaymentIdentityPanel record={record} />

                {/* Lifecycle tracker */}
                <PaymentLifecycleBar events={FN04_LIFECYCLE} />

                {/* Detail tabs */}
                <PaymentDetailTabs record={record} />

                {/* Amount calculation table + trend chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <PaymentCalculationTable rows={FN04_CALCULATION} />
                  <PaymentAmountTrendChart data={FN04_AMOUNT_TREND} />
                </div>

              </div>

              {/* ── Right sidebar ── */}
              <div className="flex flex-col gap-3">
                <PaymentDetailRightSidebar record={record} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
