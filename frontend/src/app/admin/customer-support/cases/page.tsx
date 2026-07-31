'use client';

import React, { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  LifeBuoy,
  Plus,
  UserCheck,
  Send,
  Download,
  AlertTriangle,
  ChevronDown,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import type {
  SupportCaseItem,
  SupportCaseFilterParams,
  SupportCaseMetricSummary,
  SupportOperationsHealthData,
  PriorityAlertData,
  AgentWorkloadItem,
  QuickQueueItemData,
  CustomerSentimentDistribution,
  CaseMixCategory,
  CreateSupportCaseDto,
  BulkAssignSupportCasesDto,
  BulkResponseDto,
  SaveSupportViewDto,
} from '@/types/customerSupport';

import {
  mockSupportCases,
  mockSupportMetricSummary,
  mockOperationsHealth,
  mockPriorityAlerts,
  mockAgentWorkload,
  mockQuickQueue,
  mockSentimentDistribution,
  mockCaseMixCategories,
} from '@/mocks/admin/customerSupport.mock';

import {
  fetchSupportCases,
  fetchSupportMetrics,
  fetchSupportOperationsHealth,
  fetchPriorityAlerts,
  fetchAgentWorkload,
  fetchQuickQueue,
  fetchSentimentAndCaseMix,
  createSupportCase,
  bulkAssignSupportCases,
  sendBulkResponse,
  saveSupportView,
  exportSupportReportCSV,
} from '@/services/api/customerSupportService';

import { SupportKpiCards } from '@/components/admin/customer-support/SupportKpiCards';
import { SupportCaseFilters } from '@/components/admin/customer-support/SupportCaseFilters';
import { SupportQuickFilters } from '@/components/admin/customer-support/SupportQuickFilters';
import { SupportCaseTable } from '@/components/admin/customer-support/SupportCaseTable';
import { SupportOperationsHealth } from '@/components/admin/customer-support/SupportOperationsHealth';
import { PriorityAlerts } from '@/components/admin/customer-support/PriorityAlerts';
import { AgentWorkload } from '@/components/admin/customer-support/AgentWorkload';
import { QuickQueue } from '@/components/admin/customer-support/QuickQueue';
import { SentimentCaseMix } from '@/components/admin/customer-support/SentimentCaseMix';

import { CreateSupportCaseModal } from '@/components/admin/customer-support/CreateSupportCaseModal';
import { BulkAssignCasesModal } from '@/components/admin/customer-support/BulkAssignCasesModal';
import { BulkResponseModal } from '@/components/admin/customer-support/BulkResponseModal';
import { SaveViewModal } from '@/components/admin/customer-support/SaveViewModal';
import { MoreFiltersDrawer } from '@/components/admin/customer-support/MoreFiltersDrawer';
import { CommerceContextBanner } from '@/components/admin/customer-support/CommerceContextBanner';

import styles from './page.module.css';

function CustomerSupportCasesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initial State initialized with mock dataset for fast initial render
  const [cases, setCases] = useState<SupportCaseItem[]>(mockSupportCases);
  const [total, setTotal] = useState(mockSupportCases.length);
  const [totalPages, setTotalPages] = useState(1);
  const [metrics, setMetrics] = useState<SupportCaseMetricSummary | null>(mockSupportMetricSummary);
  const [health, setHealth] = useState<SupportOperationsHealthData | null>(mockOperationsHealth);
  const [alerts, setAlerts] = useState<PriorityAlertData[]>(mockPriorityAlerts);
  const [agentWorkload, setAgentWorkload] = useState<AgentWorkloadItem[]>(mockAgentWorkload);
  const [quickQueue, setQuickQueue] = useState<QuickQueueItemData[]>(mockQuickQueue);
  const [sentiment, setSentiment] = useState<CustomerSentimentDistribution | null>(mockSentimentDistribution);
  const [caseMix, setCaseMix] = useState<CaseMixCategory[] | null>(mockCaseMixCategories);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modals / Drawers
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);
  const [isBulkResponseModalOpen, setIsBulkResponseModalOpen] = useState(false);
  const [isSaveViewModalOpen, setIsSaveViewModalOpen] = useState(false);
  const [isMoreFiltersDrawerOpen, setIsMoreFiltersDrawerOpen] = useState(false);
  const [isMoreActionsMenuOpen, setIsMoreActionsMenuOpen] = useState(false);

  const searchParamsString = searchParams ? searchParams.toString() : '';

  // Parse filters from URL with useMemo
  const filtersFromUrl: SupportCaseFilterParams = useMemo(
    () => ({
      search: searchParams?.get('search') || undefined,
      status: searchParams?.get('status') || undefined,
      priority: searchParams?.get('priority') || undefined,
      sla: searchParams?.get('sla') || undefined,
      escalation: searchParams?.get('escalation') || undefined,
      category: searchParams?.get('category') || undefined,
      issueType: searchParams?.get('issueType') || undefined,
      channel: searchParams?.get('channel') || undefined,
      customer: searchParams?.get('customer') || undefined,
      assignedAgent: searchParams?.get('assignedAgent') || undefined,
      assignedTeam: searchParams?.get('assignedTeam') || undefined,
      supplier: searchParams?.get('supplier') || undefined,
      product: searchParams?.get('product') || undefined,
      orderStatus: searchParams?.get('orderStatus') || undefined,
      returnStatus: searchParams?.get('returnStatus') || undefined,
      shipmentStatus: searchParams?.get('shipmentStatus') || undefined,
      sentiment: searchParams?.get('sentiment') || undefined,
      risk: searchParams?.get('risk') || undefined,
      createdDate: searchParams?.get('createdDate') || undefined,
      updatedDate: searchParams?.get('updatedDate') || undefined,
      slaDueDate: searchParams?.get('slaDueDate') || undefined,
      quickFilter: searchParams?.get('quickFilter') || undefined,
      context: searchParams?.get('context') || undefined,
      orderId: searchParams?.get('orderId') || undefined,
      returnId: searchParams?.get('returnId') || undefined,
      shipmentId: searchParams?.get('shipmentId') || undefined,
      savedView: searchParams?.get('savedView') || undefined,
      page: Number(searchParams?.get('page')) || 1,
      pageSize: Number(searchParams?.get('pageSize')) || 25,
      sort: searchParams?.get('sort') || undefined,
      direction: (searchParams?.get('direction') as 'asc' | 'desc') || undefined,
    }),
    [searchParamsString]
  );

  const updateUrl = useCallback(
    (newFilters: Partial<SupportCaseFilterParams>) => {
      const merged = { ...filtersFromUrl, ...newFilters };
      const params = new URLSearchParams();

      Object.entries(merged).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '' && val !== 'all') {
          params.set(key, String(val));
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [filtersFromUrl, pathname, router]
  );

  // Load data
  const loadData = useCallback(async () => {
    try {
      const [
        casesRes,
        metricsRes,
        healthRes,
        alertsRes,
        workloadRes,
        quickQueueRes,
        sentimentMixRes,
      ] = await Promise.all([
        fetchSupportCases(filtersFromUrl),
        fetchSupportMetrics(),
        fetchSupportOperationsHealth(),
        fetchPriorityAlerts(),
        fetchAgentWorkload(),
        fetchQuickQueue(),
        fetchSentimentAndCaseMix(),
      ]);

      setCases(casesRes.data);
      setTotal(casesRes.total);
      setTotalPages(casesRes.totalPages);
      setMetrics(metricsRes);
      setHealth(healthRes);
      setAlerts(alertsRes);
      setAgentWorkload(workloadRes);
      setQuickQueue(quickQueueRes);
      setSentiment(sentimentMixRes.sentiment);
      setCaseMix(sentimentMixRes.caseMix);
    } catch {
      toast.error('Failed to load customer support data.');
    } finally {
      setIsLoading(false);
    }
  }, [filtersFromUrl]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers
  const handleFilterChange = (key: keyof SupportCaseFilterParams, value: string) => {
    updateUrl({ [key]: value, page: 1 });
  };

  const handleClearAll = () => {
    router.replace(pathname, { scroll: false });
  };

  const handleReviewPriorityCases = () => {
    updateUrl({
      priority: 'urgent',
      page: 1,
    });
  };

  const handleCreateCaseSubmit = async (dto: CreateSupportCaseDto) => {
    const res = await createSupportCase(dto);
    toast.success(`Support case ${res.caseReference} created successfully!`);
    await loadData();
  };

  const handleBulkAssignSubmit = async (dto: BulkAssignSupportCasesDto) => {
    const res = await bulkAssignSupportCases(dto);
    toast.success(`Assigned ${res.count} cases to ${dto.assignedAgentName || dto.assignedTeam}.`);
    setSelectedIds([]);
    await loadData();
  };

  const handleBulkResponseSubmit = async (dto: BulkResponseDto) => {
    const res = await sendBulkResponse(dto);
    toast.success(`Bulk response sent to ${res.count} cases.`);
    setSelectedIds([]);
    await loadData();
  };

  const handleSaveViewSubmit = async (dto: SaveSupportViewDto) => {
    await saveSupportView(dto);
    toast.success(`View "${dto.name}" saved successfully.`);
  };

  const handleExportReport = () => {
    try {
      const csv = exportSupportReportCSV(cases);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Support-Operations-Report-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Support operations report exported to CSV.');
    } catch {
      toast.error('Failed to export CSV report.');
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllRows = () => {
    if (selectedIds.length === cases.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cases.map((c) => c.id));
    }
  };

  const activeMoreFiltersCount = [
    filtersFromUrl.context,
    filtersFromUrl.orderId,
    filtersFromUrl.returnId,
    filtersFromUrl.shipmentId,
    filtersFromUrl.savedView,
  ].filter(Boolean).length;

  return (
    <div className={styles.pageContainer}>
      {/* Breadcrumb & Header Title Area */}
      <div className={styles.pageHeader}>
        <nav className={styles.breadcrumbNav}>
          <span>Customer Support</span>
          <span>&gt;</span>
          <span className={styles.breadcrumbActive}>Support Operations</span>
        </nav>

        <div className={styles.headerTop}>
          <div className={styles.titleBlock}>
            <h1 className={styles.pageTitle}>
              <LifeBuoy size={24} className={styles.titleIcon} />
              Customer Support Operations
            </h1>
            <p className={styles.pageDescription}>
              Monitor customer inquiries, order complaints, delivery issues, payment concerns, return and refund questions, product safety reports, authenticity complaints, supplier-related problems, multi-channel communications, SLA performance, escalations, and case resolution across the SL Beauty marketplace.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className={styles.actionRow}>
            <button
              type="button"
              onClick={handleReviewPriorityCases}
              className={styles.btnPrimary}
            >
              <AlertTriangle size={15} />
              <span>Review Priority Cases</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className={styles.btnSecondary}
            >
              <Plus size={15} />
              <span>Create Support Case</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedIds.length === 0) {
                  toast.error('Please select at least one case to assign.');
                  return;
                }
                setIsBulkAssignModalOpen(true);
              }}
              className={styles.btnSecondary}
            >
              <UserCheck size={15} />
              <span>Assign Cases</span>
              {selectedIds.length > 0 && (
                <span className="px-1.5 py-0.2 bg-[#722140] text-white text-[10px] rounded-full font-bold">
                  {selectedIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedIds.length === 0) {
                  toast.error('Please select at least one case to respond.');
                  return;
                }
                setIsBulkResponseModalOpen(true);
              }}
              className={styles.btnSecondary}
            >
              <Send size={15} />
              <span>Send Bulk Response</span>
            </button>

            <button
              type="button"
              onClick={handleExportReport}
              className={styles.btnSecondary}
            >
              <Download size={15} />
              <span>Export Support Report</span>
            </button>

            {/* More Actions Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsMoreActionsMenuOpen(!isMoreActionsMenuOpen)}
                className={styles.btnSecondary}
              >
                <span>More Actions</span>
                <ChevronDown size={14} />
              </button>

              {isMoreActionsMenuOpen && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', width: '190px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 30, padding: '4px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      loadData();
                      setIsMoreActionsMenuOpen(false);
                      toast.success('Data refreshed.');
                    }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', border: 0, background: 'transparent', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <RefreshCw size={14} />
                    <span>Refresh Queue Data</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIds([]);
                      setIsMoreActionsMenuOpen(false);
                      toast.success('Cleared selected rows.');
                    }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', border: 0, background: 'transparent', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Trash2 size={14} />
                    <span>Clear Row Selection</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <SupportKpiCards
        metrics={metrics}
        activeFilterKey={filtersFromUrl.quickFilter || filtersFromUrl.status}
        onSelectFilter={(key, val) => handleFilterChange(key as keyof SupportCaseFilterParams, val)}
      />

      {/* Conditional Commerce Context Banner */}
      <CommerceContextBanner
        context={filtersFromUrl.context}
        orderId={filtersFromUrl.orderId}
        returnId={filtersFromUrl.returnId}
        shipmentId={filtersFromUrl.shipmentId}
        onClearContext={() => updateUrl({ context: undefined, orderId: undefined, returnId: undefined, shipmentId: undefined })}
      />

      {/* Main 2-Column Desktop Grid Layout */}
      <div className={styles.pageLayout}>
        {/* Workspace Column (Left) */}
        <div className={styles.mainSection}>
          {/* Search & Filter Workspace */}
          <SupportCaseFilters
            filters={filtersFromUrl}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            onOpenSaveViewModal={() => setIsSaveViewModalOpen(true)}
            onOpenMoreFiltersDrawer={() => setIsMoreFiltersDrawerOpen(true)}
            activeMoreFiltersCount={activeMoreFiltersCount}
          />

          {/* Quick Filter Chips */}
          <SupportQuickFilters
            activeQuickFilter={filtersFromUrl.quickFilter}
            onSelectQuickFilter={(id) => handleFilterChange('quickFilter', id)}
          />

          {/* Table */}
          <SupportCaseTable
            cases={cases}
            total={total}
            page={filtersFromUrl.page || 1}
            pageSize={filtersFromUrl.pageSize || 25}
            totalPages={totalPages}
            selectedIds={selectedIds}
            onSelectRow={handleSelectRow}
            onSelectAllRows={handleSelectAllRows}
            onPageChange={(p) => updateUrl({ page: p })}
            onPageSizeChange={(ps) => updateUrl({ pageSize: ps, page: 1 })}
            onSortChange={(sort, dir) => updateUrl({ sort, direction: dir })}
            isLoading={isLoading}
          />
        </div>

        {/* Right-Side Operational Intelligence Panel Column (1 Col) */}
        <div className="lg:col-span-1 space-y-4">
          <SupportOperationsHealth health={health} />
          <PriorityAlerts alerts={alerts} />
          <AgentWorkload agents={agentWorkload} />
          <QuickQueue items={quickQueue} />
          <SentimentCaseMix sentiment={sentiment} caseMix={caseMix} />
        </div>
      </div>

      {/* Modals & Drawers */}
      <CreateSupportCaseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCaseSubmit}
      />

      <BulkAssignCasesModal
        isOpen={isBulkAssignModalOpen}
        selectedCaseIds={selectedIds}
        onClose={() => setIsBulkAssignModalOpen(false)}
        onSubmit={handleBulkAssignSubmit}
      />

      <BulkResponseModal
        isOpen={isBulkResponseModalOpen}
        selectedCaseIds={selectedIds}
        onClose={() => setIsBulkResponseModalOpen(false)}
        onSubmit={handleBulkResponseSubmit}
      />

      <SaveViewModal
        isOpen={isSaveViewModalOpen}
        activeFilters={filtersFromUrl}
        onClose={() => setIsSaveViewModalOpen(false)}
        onSubmit={handleSaveViewSubmit}
      />

      <MoreFiltersDrawer
        isOpen={isMoreFiltersDrawerOpen}
        filters={filtersFromUrl}
        onClose={() => setIsMoreFiltersDrawerOpen(false)}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
      />
    </div>
  );
}

export default function CustomerSupportCasesPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-500 text-xs animate-pulse">Loading Customer Support Dashboard...</div>}>
      <CustomerSupportCasesContent />
    </Suspense>
  );
}
