'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { RefreshCw, AlertCircle, ChevronLeft } from 'lucide-react';

/* ── Shared Finance components ── */
import { FinanceContextBar } from '@/components/admin/finance/FinanceContextBar';
import { FinanceAlertBanner } from '@/components/admin/finance/FinanceAlertBanner';
import { FinanceSectionTabs } from '@/components/admin/finance/FinanceSectionTabs';

/* ── FN10 components ── */
import { SettlementDetailHeader } from '@/components/admin/finance/SettlementDetailHeader';
import { SettlementDetailIdentityPanel } from '@/components/admin/finance/SettlementDetailIdentityPanel';
import { SettlementDetailTimeline } from '@/components/admin/finance/SettlementDetailTimeline';
import { SettlementDetailOverviewGrid } from '@/components/admin/finance/SettlementDetailOverviewGrid';
import { SettlementDetailCalculationTable } from '@/components/admin/finance/SettlementDetailCalculationTable';
import { RightSettlementDetailSidebar } from '@/components/admin/finance/RightSettlementDetailSidebar';

/* ── Data ── */
import { settlementDetailsById } from '@/data/mockSettlementDetailData';
import { FN09_CONTEXT } from '@/data/mockSettlementData';

/* ── Detail tabs ── */
const DETAIL_TABS = [
  'Overview',
  'Calculation',
  'Source Linkage',
  'Beneficiary',
  'Payment Destination',
  'Approval',
  'Payment Schedule',
  'Payout Execution',
  'Provider Events',
  'Reserves',
  'Holds',
  'Disputes',
  'Reconciliation',
  'Exceptions',
  'Linked Records',
  'Communications',
  'Activity',
  'Audit History',
];

/* ─────────────────────────────────────────
   Not-Found state
───────────────────────────────────────── */
function NotFoundState({ settlementId }: { settlementId: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <AlertCircle size={28} className="text-gray-400" />
      </div>
      <div className="text-center">
        <p className="text-base font-bold text-gray-900">Settlement / payout record not found</p>
        <p className="text-xs text-gray-500 mt-1">
          Settlement ID: <span className="font-mono text-gray-800">{settlementId}</span>
        </p>
        <p className="text-[11px] text-gray-400 mt-1">
          This settlement record does not exist in the current settlement network.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => router.push('/admin/finance/settlements-payouts')}
          className="px-4 py-2 bg-[#8f002b] text-white text-xs font-bold rounded-lg hover:bg-[#741d35] flex items-center gap-1.5"
        >
          <ChevronLeft size={13} /> Back to Settlements &amp; Payouts
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
   Main Page
───────────────────────────────────────── */
export default function SettlementDetailPage() {
  const params = useParams();
  const rawId = (params?.settlementId as string) || (params?.id as string) || '';
  const settlementId = rawId || 'SETL-2025-005621';

  const [activeTab, setActiveTab] = useState('Overview');

  /* ── Resolve record ── */
  const record = settlementDetailsById[settlementId] ?? null;

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">
          {/* Header Strip */}
          <div className="flex flex-col gap-2 px-4 pt-3 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <SettlementDetailHeader settlementId={settlementId} />
            <FinanceContextBar context={FN09_CONTEXT} />
          </div>

          {/* Body Content */}
          <div className="flex-1 flex">
            {!record ? (
              <div className="flex-1 p-4">
                <NotFoundState settlementId={settlementId} />
              </div>
            ) : (
              <div className="flex-1 flex gap-0 min-w-0">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0 p-3 flex flex-col gap-3 overflow-auto">
                  {/* Pale Amber Warning Banner */}
                  <FinanceAlertBanner message="This record is pending approval. Please review and take appropriate action." />

                  {/* Governed Actions, Identity, Status, Metadata, 12 KPIs */}
                  <SettlementDetailIdentityPanel record={record} />

                  {/* 16-stage Lifecycle Timeline */}
                  <SettlementDetailTimeline stages={record.lifecycleStages} />

                  {/* Navigation Tabs */}
                  <div>
                    <FinanceSectionTabs
                      tabs={DETAIL_TABS}
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                    />

                    {/* Tab View Content */}
                    <div className="mt-3">
                      {activeTab === 'Overview' && (
                        <div className="flex flex-col gap-3">
                          {/* 6 Analytics cards */}
                          <SettlementDetailOverviewGrid record={record} />

                          {/* Calculation Summary Table & Reconciliation */}
                          <SettlementDetailCalculationTable record={record} />
                        </div>
                      )}

                      {activeTab !== 'Overview' && (
                        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-xs text-gray-500 shadow-sm">
                          Viewing detail tab: <strong className="text-gray-900">{activeTab}</strong>. Content available in full view.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Intelligence Rail */}
                <div className="w-[260px] shrink-0 border-l border-gray-200 p-3 bg-white overflow-y-auto hidden xl:block">
                  <RightSettlementDetailSidebar record={record} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
