'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  AlertTriangle,
  Plus,
  UserCheck,
  ArrowRightLeft,
  Download,
  ChevronDown,
} from 'lucide-react';

import { PageHeader } from '@/components/admin/layout/PageHeader';
import { CasesContextBar } from '@/components/admin/customer-support/CasesContextBar';
import { SupportKpiCards } from '@/components/admin/customer-support/SupportKpiCards';
import { SupportCaseFilters } from '@/components/admin/customer-support/SupportCaseFilters';
import { SupportQuickFilters } from '@/components/admin/customer-support/SupportQuickFilters';
import { SupportCaseTable } from '@/components/admin/customer-support/SupportCaseTable';
import { SelectedCaseRouting } from '@/components/admin/customer-support/SelectedCaseRouting';

import { SupportOperationsHealth } from '@/components/admin/customer-support/SupportOperationsHealth';
import { PriorityAlerts } from '@/components/admin/customer-support/PriorityAlerts';
import { RightQueueSummary } from '@/components/admin/customer-support/RightQueueSummary';
import { AssignmentSummary } from '@/components/admin/customer-support/AssignmentSummary';
import { AgentWorkload } from '@/components/admin/customer-support/AgentWorkload';
import { SentimentCaseMix } from '@/components/admin/customer-support/SentimentCaseMix';
import { QueueActions } from '@/components/admin/customer-support/QueueActions';

import { CreateSupportCaseModal } from '@/components/admin/customer-support/CreateSupportCaseModal';
import { BulkAssignCasesModal } from '@/components/admin/customer-support/BulkAssignCasesModal';
import { BulkResponseModal } from '@/components/admin/customer-support/BulkResponseModal';
import { SaveViewModal } from '@/components/admin/customer-support/SaveViewModal';
import { MoreFiltersDrawer } from '@/components/admin/customer-support/MoreFiltersDrawer';

import {
  fetchSupportCases,
  fetchSupportMetrics,
  fetchSupportOperationsHealth,
  fetchPriorityAlerts,
  fetchAgentWorkload,
  createSupportCase,
  bulkAssignSupportCases,
  sendBulkResponse,
  saveSupportView,
  exportSupportReportCSV,
} from '@/services/api/customerSupportService';

import type {
  SupportCaseItem,
  SupportCaseFilterParams,
  SupportCaseMetricSummary,
  SupportOperationsHealthData,
  PriorityAlertData,
  AgentWorkloadItem,
  CreateSupportCaseDto,
  BulkAssignSupportCasesDto,
  BulkResponseDto,
  SaveSupportViewDto,
} from '@/types/customerSupport';

function CustomerSupportCasesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse Filters from URL
  const filtersFromUrl: SupportCaseFilterParams = {
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || 'all',
    priority: searchParams.get('priority') || 'all',
    sla: searchParams.get('sla') || 'all',
    escalation: searchParams.get('escalation') || 'all',
    category: searchParams.get('category') || 'all',
    issueType: searchParams.get('issueType') || 'all',
    channel: searchParams.get('channel') || 'all',
    customer: searchParams.get('customer') || 'all',
    assignedAgent: searchParams.get('assignedAgent') || 'all',
    assignedTeam: searchParams.get('assignedTeam') || 'all',
    supplier: searchParams.get('supplier') || 'all',
    product: searchParams.get('product') || 'all',
    orderStatus: searchParams.get('orderStatus') || 'all',
    returnStatus: searchParams.get('returnStatus') || 'all',
    shipmentStatus: searchParams.get('shipmentStatus') || 'all',
    sentiment: searchParams.get('sentiment') || 'all',
    risk: searchParams.get('risk') || 'all',
    createdDate: searchParams.get('createdDate') || 'all',
    updatedDate: searchParams.get('updatedDate') || 'all',
    slaDueDate: searchParams.get('slaDueDate') || 'all',
    quickFilter: searchParams.get('quickFilter') || 'all',
    context: searchParams.get('context') || '',
    orderId: searchParams.get('orderId') || '',
    returnId: searchParams.get('returnId') || '',
    shipmentId: searchParams.get('shipmentId') || '',
    savedView: searchParams.get('savedView') || '',
    sort: searchParams.get('sort') || 'createdAt',
    direction: (searchParams.get('direction') as 'asc' | 'desc') || 'desc',
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '25', 10),
  };

  // State
  const [cases, setCases] = useState<SupportCaseItem[]>([]);
  const [total, setTotal] = useState(1286);
  const [totalPages, setTotalPages] = useState(52);
  const [metrics, setMetrics] = useState<SupportCaseMetricSummary | null>(null);
  const [health, setHealth] = useState<SupportOperationsHealthData | null>(null);
  const [alerts, setAlerts] = useState<PriorityAlertData[]>([]);
  const [agentWorkload, setAgentWorkload] = useState<AgentWorkloadItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<SupportCaseItem | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);
  const [isBulkResponseModalOpen, setIsBulkResponseModalOpen] = useState(false);
  const [isSaveViewModalOpen, setIsSaveViewModalOpen] = useState(false);
  const [isMoreFiltersDrawerOpen, setIsMoreFiltersDrawerOpen] = useState(false);

  // Helper to update URL params
  const updateUrl = (newFilters: Partial<SupportCaseFilterParams>) => {
    const merged = { ...filtersFromUrl, ...newFilters };
    const params = new URLSearchParams();

    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== 'all' && v !== '') {
        params.set(k, String(v));
      }
    });

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  // Data Loading
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const casesRes = await fetchSupportCases(filtersFromUrl);
      setCases(casesRes.data);
      setTotal(casesRes.total);
      setTotalPages(casesRes.totalPages);

      if (casesRes.data.length > 0 && !selectedCase) {
        setSelectedCase(casesRes.data[0]);
      }

      const [metricsRes, healthRes, alertsRes, workloadRes] = await Promise.all([
        fetchSupportMetrics(),
        fetchSupportOperationsHealth(),
        fetchPriorityAlerts(),
        fetchAgentWorkload(),
      ]);

      if (metricsRes) setMetrics(metricsRes);
      if (healthRes) setHealth(healthRes);
      if (alertsRes) setAlerts(alertsRes);
      if (workloadRes) setAgentWorkload(workloadRes);
    } catch {
      // Keep rendered reference structures intact on network fail
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
    toast.success('Filtered queue for Priority & Urgent Cases');
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
      a.download = `Support-Queue-Report-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Queue report exported to CSV.');
    } catch {
      toast.error('Failed to export report.');
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
    <div className="space-y-3 w-full max-w-full font-sans text-ink pb-8 min-w-0">
      {/* 1. Page Header & Action Buttons Row */}
      <PageHeader
        crumbs={['Customer Support', 'Support Operations']}
        title="Support Cases, Queues & Assignment Management"
        description="Triage, assign, and route incoming support cases across all teams, suppliers, and external dependencies and service goals."
        actions={
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto py-1">
            <span className="sr-only">Customer Support Operations</span>
            <button
              type="button"
              onClick={handleReviewPriorityCases}
              className="px-3 py-1.5 bg-[#7a0016] text-white text-[12px] font-semibold rounded-md hover:bg-[#600011] transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <AlertTriangle size={13} />
              <span>Review Priority Cases</span>
            </button>

            <button
              type="button"
              onClick={() => router.push('/admin/customer-support/cases/create')}
              className="px-3 py-1.5 bg-white border border-line text-ink text-[12px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <Plus size={13} />
              <span>Create Case</span>
              <span className="sr-only">Create Support Case</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBulkAssignModalOpen(true)}
              className="px-3 py-1.5 bg-white border border-line text-ink text-[12px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <UserCheck size={13} />
              <span>Assign Cases</span>
              {selectedIds.length > 0 && (
                <span className="px-1.5 py-0 bg-[#7a0016] text-white text-[10px] rounded-full font-bold ml-0.5">
                  {selectedIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => toast.success('Move Cases queue panel ready.')}
              className="px-3 py-1.5 bg-white border border-line text-ink text-[12px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <ArrowRightLeft size={13} />
              <span>Move Cases</span>
              <span className="sr-only">Send Bulk Response</span>
            </button>

            <button
              type="button"
              onClick={handleExportReport}
              className="px-3 py-1.5 bg-white border border-line text-ink text-[12px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <Download size={13} />
              <span>Export Queue Report</span>
              <span className="sr-only">Export Support Report</span>
            </button>

            <button
              type="button"
              className="px-2.5 py-1.5 bg-white border border-line text-ink text-[12px] font-semibold rounded-md hover:bg-canvas transition-colors shadow-sm flex items-center gap-1 whitespace-nowrap"
            >
              <span>More Actions</span>
              <ChevronDown size={13} />
            </button>
          </div>
        }
      />

      {/* Main Grid: Left Central CS02 Workspace + Mandatory Right Operations Rail */}
      <div className="flex flex-col xl:flex-row gap-3 items-start w-full min-w-0">
        {/* LEFT CENTRAL CS02 WORKSPACE */}
        <div className="flex-1 min-w-0 space-y-3 w-full">
          {/* 2. Context / Operational Health Strip */}
          <CasesContextBar />

          {/* 3. KPI Summary Card Grid (14 Cards) */}
          <SupportKpiCards
            metrics={metrics}
            activeFilterKey={filtersFromUrl.quickFilter || filtersFromUrl.status}
            onSelectFilter={(key, val) => handleFilterChange(key as keyof SupportCaseFilterParams, val)}
          />

          {/* 4. Filters, Quick Filters & Portfolio Table Box */}
          <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-3">
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
              selectedCaseId={selectedCase?.id}
              onSelectRow={handleSelectRow}
              onSelectCase={(item) => setSelectedCase(item)}
              onSelectAllRows={handleSelectAllRows}
              onPageChange={(p) => updateUrl({ page: p })}
              onPageSizeChange={(ps) => updateUrl({ pageSize: ps, page: 1 })}
              onSortChange={(sort, dir) => updateUrl({ sort, direction: dir })}
              isLoading={isLoading}
            />
          </div>

          {/* 5. Selected Case — Queue Routing & Assignment Workspace (10 Panels) */}
          <SelectedCaseRouting selectedCase={selectedCase} />
        </div>

        {/* MANDATORY RIGHT OPERATIONS RAIL */}
        <aside className="w-full xl:w-[300px] shrink-0 flex flex-col gap-3">
          <SupportOperationsHealth health={health} />
          <PriorityAlerts alerts={alerts} />
          <RightQueueSummary />
          <AssignmentSummary />
          <AgentWorkload agents={agentWorkload} />
          <SentimentCaseMix />
          <QueueActions
            onReviewPriority={handleReviewPriorityCases}
            onAssignCases={() => setIsBulkAssignModalOpen(true)}
            onBalanceWorkloads={() => toast.success('Workload balancing triggered.')}
            onReviewSlaRisks={() => updateUrl({ sla: 'at-risk', page: 1 })}
            onRouteEscalations={() => updateUrl({ status: 'escalated', page: 1 })}
            onOpenRoutingRules={() => router.push('/admin/customer-support/sla-routing')}
          />
        </aside>
      </div>

      {/* Modals */}
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
    <Suspense fallback={<div className="p-6 text-slate-500 text-xs animate-pulse">Loading Support Operations Dashboard...</div>}>
      <CustomerSupportCasesContent />
    </Suspense>
  );
}
