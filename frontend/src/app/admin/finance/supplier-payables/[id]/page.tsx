'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { RefreshCw, AlertCircle, ChevronLeft } from 'lucide-react';

/* ── Shared Finance components (reused from FN01-FN06) ── */
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceAlertBanner } from '@/components/admin/finance/FinanceAlertBanner';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';

/* ── FN07-specific components ── */
import { SupplierPayableDetailHeader } from '@/components/admin/finance/SupplierPayableDetailHeader';
import { PayableSummaryMetrics } from '@/components/admin/finance/PayableSummaryMetrics';
import { PayableIdentitySummary } from '@/components/admin/finance/PayableIdentitySummary';
import { PayableLifecycleTimeline } from '@/components/admin/finance/PayableLifecycleTimeline';
import { PayableOverviewGrid } from '@/components/admin/finance/PayableOverviewGrid';
import { PayableLowerOperationsGrid } from '@/components/admin/finance/PayableLowerOperationsGrid';
import { SupplierPayableIntelligence } from '@/components/admin/finance/SupplierPayableIntelligence';

/* ── Data ── */
import { supplierPayablesById } from '@/data/mockSupplierPayableDetailData';
import { FN06_CONTEXT } from '@/data/mockSupplierPayableData';

/* ── Detail tabs ── */
const DETAIL_TABS = [
  'Overview',
  'Calculation',
  'Invoice',
  'Purchase Order',
  'Goods Receipt',
  'Deductions',
  'Taxes & Withholding',
  'Supplier',
  'Approval',
  'Payment Schedule',
  'Settlement & Payout',
  'Holds',
  'Disputes',
  'Reconciliation',
  'Exceptions',
  'Linked Records',
  'Activity',
  'Audit History',
];

/* ─────────────────────────────────────────
   Loading skeleton
───────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4 p-4">
      <div className="h-6 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-100 rounded w-2/3" />
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-lg" />
        ))}
      </div>
      <div className="h-14 bg-gray-100 rounded-lg" />
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-36 bg-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Error state
───────────────────────────────────────── */
function ErrorState({ payableId, onRetry }: { payableId: string; onRetry: () => void }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <AlertCircle size={40} className="text-red-400" />
      <div className="text-center">
        <p className="text-base font-bold text-gray-900">Unable to load supplier payable</p>
        <p className="text-xs text-gray-500 mt-1">
          Payable ID: <span className="font-mono text-gray-800">{payableId}</span>
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#8f002b] text-white text-xs font-bold rounded-lg hover:bg-[#741d35] flex items-center gap-1.5"
        >
          <RefreshCw size={13} /> Retry
        </button>
        <button
          onClick={() => router.push('/admin/finance/supplier-payables')}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-1.5"
        >
          <ChevronLeft size={13} /> Back to Supplier Payables
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Not-Found state
───────────────────────────────────────── */
function NotFoundState({ payableId }: { payableId: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <AlertCircle size={28} className="text-gray-400" />
      </div>
      <div className="text-center">
        <p className="text-base font-bold text-gray-900">Supplier payable not found</p>
        <p className="text-xs text-gray-500 mt-1">
          Payable: <span className="font-mono text-gray-800">{payableId}</span>
        </p>
        <p className="text-[11px] text-gray-400 mt-1">
          This payable ID does not exist in the current payable network.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => router.push('/admin/finance/supplier-payables')}
          className="px-4 py-2 bg-[#8f002b] text-white text-xs font-bold rounded-lg hover:bg-[#741d35] flex items-center gap-1.5"
        >
          <ChevronLeft size={13} /> Back to Supplier Payables
        </button>
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-1.5"
        >
          <RefreshCw size={13} /> Retry
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function SupplierPayableDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || '';
  const payableId = rawId || 'PAY-2025-008426';

  const [loading] = useState(false);
  const [error] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  /* ── Resolve record ── */
  const record = supplierPayablesById[payableId] ?? null;

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">

          {/* ── Sticky header strip ── */}
          <div className="flex flex-col gap-2 px-4 pt-3 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            {record ? (
              <SupplierPayableDetailHeader
                payableId={payableId}
                supplierName={record.identity.supplierName}
                supplierId={record.identity.supplierId}
                approvalStatus={record.approvalStatus}
                isSubmitted={record.approvalStep >= 1}
              />
            ) : (
              <div className="h-10 bg-gray-100 animate-pulse rounded" />
            )}
            <FinanceContextBar context={FN06_CONTEXT} />
          </div>

          {/* ── Body ── */}
          <div className="flex-1 flex">
            {loading ? (
              <div className="flex-1">
                <LoadingSkeleton />
              </div>
            ) : error ? (
              <div className="flex-1">
                <ErrorState payableId={payableId} onRetry={() => window.location.reload()} />
              </div>
            ) : !record ? (
              <div className="flex-1">
                <NotFoundState payableId={payableId} />
              </div>
            ) : (
              /* ── Main + Right rail ── */
              <div className="flex-1 flex gap-0 min-w-0">
                {/* ── Main content ── */}
                <div className="flex-1 min-w-0 p-3 flex flex-col gap-3 overflow-auto">

                  {/* Data Currency Warning */}
                  <FinanceAlertBanner message="Data Currency Warning: This payable was updated by another administrator at 10:18 AM. Please refresh data before approving to ensure data consistency." />

                  {/* 10-card Financial KPI Strip */}
                  <PayableSummaryMetrics
                    amountSummary={record.amountSummary}
                    approvalDetails={record.approvalDetails}
                    statusSnapshot={record.statusSnapshot}
                    lifecycleDates={record.lifecycleDates}
                    grossLiability={record.grossLiability}
                  />

                  {/* 5-panel Summary Row */}
                  <PayableIdentitySummary
                    identity={record.identity}
                    linkedRecords={record.linkedRecords}
                    amountSummary={record.amountSummary}
                    statusSnapshot={record.statusSnapshot}
                    lifecycleDates={record.lifecycleDates}
                  />

                  {/* Lifecycle Timeline */}
                  <PayableLifecycleTimeline stages={record.lifecycleStages} />

                  {/* Detail Tabs */}
                  <div>
                    <FinanceSectionTabs
                      tabs={DETAIL_TABS}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                    />

                    {/* Tab content — only Overview fully implemented */}
                    <div className="mt-3">
                      {activeTab === 'Overview' && (
                        <div className="flex flex-col gap-3">
                          {/* Analytics grid */}
                          <PayableOverviewGrid
                            trendData={record.trendData}
                            donutData={record.donutData}
                            statusSummaryRows={record.statusSummaryRows}
                            calculationRows={record.calculationRows}
                            matchingSummary={record.matchingSummary}
                            approvalDetails={record.approvalDetails}
                          />

                          {/* Lower operations grid */}
                          <PayableLowerOperationsGrid
                            paymentSchedule={record.paymentSchedule}
                            settlement={record.settlement}
                            reconciliationRows={record.reconciliationRows}
                            activityLog={record.activityLog}
                            auditSummary={record.auditSummary}
                            quickQueues={record.quickQueues}
                          />
                        </div>
                      )}

                      {activeTab !== 'Overview' && (
                        <div className="flex items-center justify-center py-12 bg-white border border-gray-200 rounded-lg shadow-sm">
                          <div className="text-center">
                            <p className="text-sm font-semibold text-gray-600">{activeTab}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              This tab content is available in the full implementation.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Right Intelligence Rail ── */}
                <div className="w-[260px] shrink-0 border-l border-gray-200 p-3 bg-white overflow-y-auto hidden xl:block">
                  <SupplierPayableIntelligence
                    healthScore={record.railHealthScore}
                    healthMetrics={record.railHealthMetrics}
                    alerts={record.railAlerts}
                    quickSummary={record.railQuickSummary}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
