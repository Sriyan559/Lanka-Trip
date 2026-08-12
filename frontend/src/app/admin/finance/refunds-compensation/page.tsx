'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  useRefundsOverview,
  useRefundsTable,
  useRefundDetail,
  useRefundActions,
} from '@/hooks/useRefundsCompensation';
import type { RefundFilters } from '@/services/api/financeRefundsService';
import type { RefundPortfolioRow } from '@/types/finance';
import { FN05_TABS } from '@/data/mockRefundData';

/* ── Tab → status filter map ─────────────────────────────────────────────── */
const TAB_STATUS_MAP: Record<string, Partial<RefundFilters>> = {
  'Overview': {},
  'Refunds & Compensation Trend': {},
  'Eligibility Review': { eligibility: 'Under Review' },
  'Pending Approval': { status: 'Pending Approval' },
  'Approved': { status: 'Approved' },
  'Processing': { processing: 'Processing' },
  'Completed': { processing: 'Completed' },
  'Rejected': { status: 'Rejected' },
  'Partial Refunds': { refundType: 'Partial Refund' },
  'Full Refunds': { refundType: 'Full Refund' },
  'Escalations': {},
  'Payment Methods': {},
  'Regional Office': {},
  'Exceptions': { status: 'Failed' },
  'Audit History': {},
};

/* ─────────────────────────────────────────────────────────────────────────
   Page
──────────────────────────────────────────────────────────────────────────*/
export default function RefundsCompensationPage() {
  const router = useRouter();

  /* ── Tab ── */
  const [activeTab, setActiveTab] = useState('Overview');

  /* ── Filters ── */
  const [filters, setFilters] = useState<RefundFilters>({
    dateFrom: undefined,
    dateTo: undefined,
    currency: 'LKR',
    search: '',
    status: undefined,
    eligibility: undefined,
    processing: undefined,
    refundType: undefined,
    paymentMethod: undefined,
    gateway: undefined,
    sort: 'dateRequested',
    direction: 'desc',
    page: 1,
    perPage: 15,
  });

  const tabFilters = useMemo<RefundFilters>(() => {
    const tabExtra = TAB_STATUS_MAP[activeTab] ?? {};
    return { ...filters, ...tabExtra };
  }, [filters, activeTab]);

  /* ── Hooks ── */
  const overview = useRefundsOverview(filters);
  const table    = useRefundsTable(tabFilters);

  /* ── Selected refund ── */
  const [selectedRefundId, setSelectedRefundId] = useState<string | null>(null);
  const { detail, loading: detailLoading } = useRefundDetail(selectedRefundId);

  /* ── Actions ── */
  const onMutationSuccess = useCallback(() => {
    overview.refresh();
    table.refresh();
    // Re-fetch detail for the current refund
    if (selectedRefundId) setSelectedRefundId((prev) => prev); // triggers effect
  }, [overview, table, selectedRefundId]);

  const actions = useRefundActions(onMutationSuccess);

  /* ── Handlers ── */
  const handleSelectRow = useCallback((row: RefundPortfolioRow) => {
    setSelectedRefundId(row.id);
  }, []);

  const handleFilterChange = useCallback((patch: Partial<RefundFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleSortChange = useCallback((sort: string, direction: 'asc' | 'desc') => {
    setFilters((prev) => ({ ...prev, sort, direction, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  /* ── Convert overview KPIs to FinanceKpi shape ── */
  const kpis = overview.data?.kpis ?? [];
  const healthMetrics = overview.data?.healthMetrics ?? [];

  /* ── Context bar: derive from overview or fall back ── */
  const context = overview.data?.context ?? null;

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2800, style: { fontSize: 12 } }} />
      <div className="min-h-screen bg-[#f8f9fb] font-sans text-gray-900">
        <div className="flex flex-col min-h-screen">

          {/* ── Fixed/Sticky Header ── */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-2 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <RefundsHeader />
            {context ? (
              <FinanceContextBar context={{
                tenant: context.tenant,
                ecosystem: context.ecosystem,
                businessUnit: context.businessUnit,
                salesChannel: context.salesChannel,
                region: context.region,
                baseCurrency: context.baseCurrency,
                scope: context.scope,
                accountingPeriod: context.accountingPeriod,
                dateRange: context.dateRange,
                liveData: context.liveData,
                dataCompleteness: context.dataCompleteness,
                lastSynced: context.lastSynced,
                periodState: context.periodState as 'Open' | 'Closed' | 'Locked',
                accessNotice: context.accessNotice,
              }} />
            ) : (
              <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
            )}
          </div>

          {/* ── Scrollable Body ── */}
          <div className="flex-1 p-4">
            {/* Overview API error banner */}
            {overview.error && !overview.loading && (
              <div className="mb-3 px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                <span className="text-red-500">⚠</span>
                Unable to load refund operations: {overview.error.message}
                <button
                  onClick={() => overview.refresh()}
                  className="ml-auto underline font-bold hover:no-underline"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-3">

              {/* ── Main Left Column ── */}
              <div className="flex flex-col gap-3 min-w-0">

                {/* 12 KPI Cards */}
                {overview.loading && kpis.length === 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-24 bg-white border border-gray-200 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <FinanceKpiGrid kpis={kpis} />
                )}

                {/* Background-refresh indicator */}
                {overview.refreshing && (
                  <div className="text-[10px] text-gray-400 font-semibold flex items-center gap-1 -mt-1 px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Updating…
                    {overview.updatedAt && (
                      <span className="ml-1 text-gray-300">
                        Last updated {new Date(overview.updatedAt).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                )}

                {/* 15 Section Tabs */}
                <FinanceSectionTabs
                  tabs={FN05_TABS}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />

                {/* Overview Tab: Charts + Health + Table + Preview + Workflow */}
                {activeTab === 'Overview' && (
                  <>
                    <RefundOverviewSection
                      trendData={overview.data?.trend ?? []}
                      donutData={overview.data?.typeDistribution ?? []}
                      statusSummary={overview.data?.statusSummary ?? []}
                      loading={overview.loading}
                      onStatusClick={(status) => handleFilterChange({ status })}
                    />

                    <FinanceHealthScorecard
                      metrics={healthMetrics}
                      title="Refund Operations Health Scorecard"
                    />
                  </>
                )}

                {/* Filter Toolbar (shown for Overview + status tabs) */}
                <RefundSearchFilterBar
                  onSearch={(search) => handleFilterChange({ search })}
                />

                {/* Portfolio Table — always visible, server-side */}
                <RefundPortfolioTable
                  rows={(table.data?.rows ?? []) as RefundPortfolioRow[]}
                  meta={table.data?.meta ?? null}
                  selectedRowId={selectedRefundId ?? undefined}
                  onSelectRow={handleSelectRow}
                  onSortChange={handleSortChange}
                  onPageChange={handlePageChange}
                  currentSort={filters.sort ?? 'dateRequested'}
                  currentDirection={filters.direction ?? 'desc'}
                  loading={table.loading}
                  refreshing={table.refreshing}
                  error={table.error}
                />

                {/* Selected Refund Preview */}
                <SelectedRefundPreview
                  record={detail ?? undefined}
                  loading={detailLoading}
                  onReview={(notes) => {
                    const numId = detail ? parseInt(detail.id.replace(/\D/g, '')) : 0;
                    if (numId) actions.review(numId, notes);
                  }}
                  onApprove={(notes) => {
                    const numId = detail ? parseInt(detail.id.replace(/\D/g, '')) : 0;
                    if (numId) actions.approve(numId, notes);
                  }}
                  onReject={(reason) => {
                    const numId = detail ? parseInt(detail.id.replace(/\D/g, '')) : 0;
                    if (numId) actions.reject(numId, reason);
                  }}
                  onProcess={() => {
                    const numId = detail ? parseInt(detail.id.replace(/\D/g, '')) : 0;
                    if (numId) actions.process(numId);
                  }}
                  submitting={actions.submitting}
                />

                {/* 7 Workflow Cards */}
                {activeTab === 'Overview' && (
                  <RefundOperationsWorkflow
                    steps={overview.data?.workflowSteps ?? []}
                    loading={overview.loading}
                  />
                )}
              </div>

              {/* ── Right Rail ── */}
              <div className="flex flex-col gap-3">
                <RightRefundSidebar
                  healthScore={overview.data?.healthScore ?? null}
                  healthMetrics={overview.data?.healthMetrics ?? []}
                  alerts={overview.data?.alerts ?? []}
                  quickSummary={overview.data?.quickSummary ?? []}
                  quickQueues={overview.data?.quickQueues ?? []}
                  actionButtons={overview.data?.actionButtons ?? []}
                  loading={overview.loading}
                  onQueueClick={(label) => {
                    const queueMap: Record<string, Partial<RefundFilters>> = {
                      'Review': { status: 'Pending Review' },
                      'Approval': { status: 'Pending Approval' },
                      'Processing': { processing: 'Processing' },
                      'Failed': { processing: 'Failed' },
                    };
                    if (queueMap[label]) handleFilterChange(queueMap[label]);
                  }}
                  onAlertClick={() => handleFilterChange({ status: 'Failed' })}
                  onActionClick={(btn) => {
                    if (btn === 'View Audit Trail') router.push('/admin/finance');
                    if (btn === 'View Reconciliation Dashboard') router.push('/admin/finance');
                    if (btn === 'Open Refund Queue') handleFilterChange({ status: 'Pending Review' });
                    if (btn === 'Review Refund Exceptions') handleFilterChange({ status: 'Failed' });
                    if (btn === 'Launch Refund Review') handleFilterChange({ eligibility: 'Under Review' });
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
