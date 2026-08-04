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
import { PageHeader } from '@/components/admin/layout/PageHeader';

import '../support.css';

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

  const handleFilterChange = (key: keyof SupportCaseFilterParams, value: string) => {
    updateUrl({ [key]: value, page: 1 });
  };

  const handleClearAll = () => {
    router.replace(pathname, { scroll: false });
  };

  const handleReviewPriorityCases = () => {
    updateUrl({ priority: 'urgent', page: 1 });
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
    <div className="space-y-6 max-w-[1920px] mx-auto pb-10 support-dashboard">
      {/* Header Title Area */}
      <PageHeader
        crumbs={["Customer Support", "Support Operations"]}
        title="Customer Support Operations"
        description="Monitor customer inquiries, order complaints, delivery issues, payment concerns, return and refund questions, product safety reports, authenticity complaints, supplier-related problems, multi-channel communications, SLA performance, escalations, and case resolution across the SL Beauty marketplace."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReviewPriorityCases}
              className="px-4 py-2 bg-primary-900 text-white text-[13px] font-semibold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <AlertTriangle size={15} />
              Review Priority Cases
            </button>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Plus size={15} />
              Create Support Case
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
              className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              <UserCheck size={15} />
              Assign Cases
              {selectedIds.length > 0 && (
                <span className="px-1.5 py-0 bg-primary-900 text-white text-[10px] rounded-full font-bold ml-1">
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
              className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Send size={15} />
              Send Bulk Response
            </button>
            <button
              type="button"
              onClick={handleExportReport}
              className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Download size={15} />
              Export Support Report
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              More Actions
              <ChevronDown size={14} />
            </button>
          </div>
        }
      />

      <SupportKpiCards
        metrics={metrics}
        activeFilterKey={filtersFromUrl.quickFilter || filtersFromUrl.status}
        onSelectFilter={(key, val) => handleFilterChange(key as keyof SupportCaseFilterParams, val)}
      />

      <CommerceContextBanner
        context={filtersFromUrl.context}
        orderId={filtersFromUrl.orderId}
        returnId={filtersFromUrl.returnId}
        shipmentId={filtersFromUrl.shipmentId}
        onClearContext={() => updateUrl({ context: undefined, orderId: undefined, returnId: undefined, shipmentId: undefined })}
      />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden p-6">
            <SupportCaseFilters
              filters={filtersFromUrl}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              onOpenSaveViewModal={() => setIsSaveViewModalOpen(true)}
              onOpenMoreFiltersDrawer={() => setIsMoreFiltersDrawerOpen(true)}
              activeMoreFiltersCount={activeMoreFiltersCount}
            />

            <SupportQuickFilters
              activeQuickFilter={filtersFromUrl.quickFilter}
              onSelectQuickFilter={(id) => handleFilterChange('quickFilter', id)}
            />

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
        </div>

        {/* RIGHT SIDEBARS */}
        <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
          <SupportOperationsHealth health={health} />
          <PriorityAlerts alerts={alerts} />
          <AgentWorkload agents={agentWorkload} />
          <QuickQueue items={quickQueue} />
          <SentimentCaseMix sentiment={sentiment} caseMix={caseMix} />
        </div>
      </div>

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
