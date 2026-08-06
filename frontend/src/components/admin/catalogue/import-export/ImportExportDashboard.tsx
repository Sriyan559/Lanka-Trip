"use client";

import React from "react";
import { useImportExportManagement } from "@/hooks/useImportExportManagement";
import { ImportExportHeader } from "./ImportExportHeader";
import { DataOperationsContext } from "./DataOperationsContext";
import { DataOperationsKpiGrid } from "./DataOperationsKpiGrid";
import { DataOperationsTrendChart } from "./DataOperationsTrendChart";
import { JobStatusDistributionChart } from "./JobStatusDistributionChart";
import { DataJobTabs } from "./DataJobTabs";
import { DataJobFilters } from "./DataJobFilters";
import { CatalogueDataJobsTable } from "./CatalogueDataJobsTable";
import { ActiveImportWorkflow } from "./ActiveImportWorkflow";
import { LowerWorkflowPanels } from "./LowerWorkflowPanels";
import { BottomOperationalPanels } from "./BottomOperationalPanels";
import { DataOperationsIntelligenceSidebar } from "./DataOperationsIntelligenceSidebar";

// Modals & Drawers
import { NewImportWizardModal } from "./NewImportWizardModal";
import { ScheduleExportDrawer } from "./ScheduleExportDrawer";
import { DuplicateComparisonModal } from "./DuplicateComparisonModal";
import { SaveDataViewModal } from "./SaveDataViewModal";
import { MoreDataFiltersDrawer } from "./MoreDataFiltersDrawer";

import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

export function ImportExportDashboard() {
  const {
    jobs,
    setJobs,
    selectedJobId,
    setSelectedJobId,
    selectedJob,
    selectedRowIds,
    activeWorkflowStage,
    setActiveWorkflowStage,

    filters,
    setFilters,
    filteredJobs,
    paginatedJobs,

    sortColumn,
    sortDirection,
    handleSort,
    handleSelectRow,
    handleSelectAllOnPage,
    handleClearFilters,
    handleExportCSV,

    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,

    toastMessage,
    showToast,
    lastSynced,
    isRefreshing,
    handleRefresh,

    // Modals
    isNewImportOpen,
    setIsNewImportOpen,
    isScheduleExportOpen,
    setIsScheduleExportOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,
    isSaveViewOpen,
    setIsSaveViewOpen,
    isDuplicateModalOpen,
    setIsDuplicateModalOpen,

    comparingConflict,
    handleOpenCompareDuplicate,
  } = useImportExportManagement();

  const handleKPIFilterClick = (type: string, value: string) => {
    if (type === "tab") {
      setFilters((prev) => ({ ...prev, activeTab: value }));
      showToast(`Filtered by tab: ${value}`);
    } else if (type === "chip") {
      setFilters((prev) => ({ ...prev, searchQuery: value }));
      showToast(`Applied search filter: ${value}`);
    } else if (type === "jobId") {
      setSelectedJobId(value);
      showToast(`Focused job ${value} in workspace.`);
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === "Approve Selected Jobs") {
      setJobs((prev) =>
        prev.map((j) => (selectedRowIds.includes(j.id) ? { ...j, approvalStatus: "Approved" } : j))
      );
      showToast(`Approved ${selectedRowIds.length} selected jobs.`);
    } else if (action === "Retry Failed Jobs") {
      setJobs((prev) =>
        prev.map((j) => (selectedRowIds.includes(j.id) && j.outcome === "Failed" ? { ...j, outcome: "In Progress", executionStatus: "Queued" } : j))
      );
      showToast(`Re-queued ${selectedRowIds.length} failed jobs.`);
    } else {
      showToast(`Applied bulk action "${action}" to ${selectedRowIds.length} jobs.`);
    }
  };

  const handleRetrySingleJob = (job: typeof selectedJob) => {
    if (confirm(`Retry execution for job ${job.id}?`)) {
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, outcome: "In Progress", executionStatus: "Queued" } : j))
      );
      showToast(`Re-queued job ${job.id} for execution.`);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#faf8f8] pb-12">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl border bg-white flex items-center gap-2.5 text-[12px] font-bold animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage.type === "success" && <CheckCircle2 size={16} className="text-emerald-600" />}
          {toastMessage.type === "info" && <Info size={16} className="text-sky-600" />}
          {toastMessage.type === "warning" && <AlertTriangle size={16} className="text-amber-600" />}
          <span className="text-ink">{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <ImportExportHeader
        selectedCount={selectedRowIds.length}
        onExportReport={handleExportCSV}
        onOpenNewImport={() => setIsNewImportOpen(true)}
        onOpenScheduleExport={() => setIsScheduleExportOpen(true)}
        onBulkAction={handleBulkAction}
      />

      <div className="px-6 py-4 flex flex-col gap-2">
        {/* Business Context Strip */}
        <DataOperationsContext
          lastSynced={lastSynced}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        {/* 12 KPI Cards */}
        <DataOperationsKpiGrid onFilterClick={handleKPIFilterClick} />

        {/* Charts Row: Data Operations Trend + Job Status Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_400px] gap-4 mb-4 items-stretch">
          <DataOperationsTrendChart />
          <JobStatusDistributionChart
            onStatusClick={(statusName) => handleKPIFilterClick("tab", statusName)}
          />
        </div>

        {/* Main Workspace Layout: Main Content Left + Intelligence Sidebar Right */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Main Left Workspace */}
          <div className="flex flex-col min-w-0">
            {/* Status Tabs */}
            <DataJobTabs
              activeTab={filters.activeTab}
              onTabChange={(tab) => setFilters((prev) => ({ ...prev, activeTab: tab }))}
            />

            {/* Filters */}
            <DataJobFilters
              filters={filters}
              onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              onClearAll={handleClearFilters}
              onOpenSaveView={() => setIsSaveViewOpen(true)}
              onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Catalogue Data Jobs Table */}
            <CatalogueDataJobsTable
              jobs={paginatedJobs}
              totalCount={filteredJobs.length}
              selectedJobId={selectedJobId}
              onSelectJob={setSelectedJobId}
              selectedRowIds={selectedRowIds}
              onSelectRow={handleSelectRow}
              onSelectAllOnPage={handleSelectAllOnPage}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={setRowsPerPage}
              onOpenReview={(job) => {
                setSelectedJobId(job.id);
                showToast(`Opened active workflow review for ${job.id}.`);
              }}
              onDownloadReport={(job) => {
                showToast(`Downloading dataset report for ${job.id}...`);
              }}
              onRetryJob={handleRetrySingleJob}
              showToast={showToast}
            />

            {/* Active Import Workflow Panel */}
            <ActiveImportWorkflow
              job={selectedJob}
              activeStage={activeWorkflowStage}
              onSelectStage={(stage) => {
                setActiveWorkflowStage(stage);
                showToast(`Switched active workflow stage to Step ${stage}.`);
              }}
            />

            {/* 4 Lower Workflow Summary Cards */}
            <LowerWorkflowPanels
              onOpenCompareDuplicate={handleOpenCompareDuplicate}
              onOpenMappingDrawer={() => showToast("Opening Field Mapping Editor...")}
              onOpenValidationDrawer={() => showToast("Opening Full Validation Log...")}
              onOpenChangePreviewDrawer={() => showToast("Opening Detailed Change Preview...")}
              showToast={showToast}
            />

            {/* 5 Bottom Operational Panels */}
            <BottomOperationalPanels showToast={showToast} />
          </div>

          {/* Right Intelligence Sidebar */}
          <div className="w-full">
            <DataOperationsIntelligenceSidebar
              onFilterClick={handleKPIFilterClick}
              showToast={showToast}
            />
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <NewImportWizardModal
        isOpen={isNewImportOpen}
        onClose={() => setIsNewImportOpen(false)}
        onSuccess={(name) => showToast(`Created and queued new import job "${name}".`)}
      />

      <ScheduleExportDrawer
        isOpen={isScheduleExportOpen}
        onClose={() => setIsScheduleExportOpen(false)}
        onSuccess={(name) => showToast(`Scheduled export feed "${name}" successfully.`)}
      />

      <DuplicateComparisonModal
        isOpen={isDuplicateModalOpen}
        conflict={comparingConflict}
        onClose={() => setIsDuplicateModalOpen(false)}
        onResolve={(action) => showToast(`Resolved duplicate conflict via "${action}".`)}
      />

      <SaveDataViewModal
        isOpen={isSaveViewOpen}
        onClose={() => setIsSaveViewOpen(false)}
        onSave={(name) => showToast(`Saved custom view preset "${name}".`)}
      />

      <MoreDataFiltersDrawer
        isOpen={isMoreFiltersOpen}
        filters={filters}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={() => showToast("Applied advanced filter criteria.")}
      />
    </div>
  );
}
