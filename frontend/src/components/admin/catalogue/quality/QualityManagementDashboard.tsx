"use client";

import React from "react";
import { useCatalogueQualityManagement } from "@/hooks/useCatalogueQualityManagement";
import { CatalogueQualityHeader } from "./CatalogueQualityHeader";
import { QualityBusinessContext } from "./QualityBusinessContext";
import { QualityKpiGrid } from "./QualityKpiGrid";
import { QualityTabs } from "./QualityTabs";
import { CatalogueQualityTrend } from "./CatalogueQualityTrend";
import { IssueDistributionChart } from "./IssueDistributionChart";
import { IssueStatusSummary } from "./IssueStatusSummary";
import { CatalogueQualityScorecard } from "./CatalogueQualityScorecard";
import { QualityFilters } from "./QualityFilters";
import { QualityIssuesTable } from "./QualityIssuesTable";
import { LowerQualityPanels } from "./LowerQualityPanels";
import { QualityOperationsSidebar } from "./QualityOperationsSidebar";

// Modals & Drawers
import { CreateQualityCaseDrawer } from "./CreateQualityCaseDrawer";
import { QualityCaseDetailDrawer } from "./QualityCaseDetailDrawer";
import { RunValidationModal } from "./RunValidationModal";
import { DuplicateComparisonModal } from "./DuplicateComparisonModal";
import { SaveQualityViewModal } from "./SaveQualityViewModal";
import { MoreQualityFiltersDrawer } from "./MoreQualityFiltersDrawer";

import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

export function QualityManagementDashboard() {
  const {
    issues,
    setIssues,
    duplicateCandidates,
    setDuplicateCandidates,
    selectedJobId,
    setSelectedJobId,
    selectedIssue,
    selectedRowIds,

    filters,
    setFilters,
    handleTabChange,
    handleToggleQuickChip,

    filteredIssues,
    paginatedIssues,

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
    isCreateCaseOpen,
    setIsCreateCaseOpen,
    isDetailOpen,
    setIsDetailOpen,
    isRunValidationOpen,
    setIsRunValidationOpen,
    isDuplicateModalOpen,
    setIsDuplicateModalOpen,
    isSaveViewOpen,
    setIsSaveViewOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,

    activeCase,
    comparingCandidate,
    handleOpenCaseDetail,
    handleOpenCompareDuplicate,
  } = useCatalogueQualityManagement();

  const handleKPIFilterClick = (type: string, value: string) => {
    if (type === "tab") {
      handleTabChange(value);
      showToast(`Filtered workspace by tab: ${value}`);
    } else if (type === "chip") {
      handleToggleQuickChip(value);
      showToast(`Toggled quick filter: ${value}`);
    } else if (type === "issueType") {
      setFilters((prev) => ({ ...prev, issueType: value }));
      showToast(`Filtered by issue type: ${value}`);
    } else if (type === "severity") {
      setFilters((prev) => ({ ...prev, severity: value }));
      showToast(`Filtered by severity: ${value}`);
    } else if (type === "status") {
      setFilters((prev) => ({ ...prev, status: value }));
      showToast(`Filtered by status: ${value}`);
    } else if (type === "caseId") {
      setSelectedJobId(value);
      showToast(`Focused case ${value} in workspace.`);
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === "Resolve selected") {
      setIssues((prev) =>
        prev.map((item) => (selectedRowIds.includes(item.id) ? { ...item, status: "Resolved" } : item))
      );
      showToast(`Resolved ${selectedRowIds.length} selected quality cases.`);
    } else if (action === "Escalate selected") {
      setIssues((prev) =>
        prev.map((item) => (selectedRowIds.includes(item.id) ? { ...item, status: "Escalated" } : item))
      );
      showToast(`Escalated ${selectedRowIds.length} selected quality cases.`);
    } else {
      showToast(`Applied bulk action "${action}" to ${selectedRowIds.length} records.`);
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
      <CatalogueQualityHeader
        selectedCount={selectedRowIds.length}
        onExportReport={handleExportCSV}
        onRunValidation={() => setIsRunValidationOpen(true)}
        onOpenCreateCase={() => setIsCreateCaseOpen(true)}
        onBulkAction={handleBulkAction}
      />

      <div className="px-6 py-4 flex flex-col gap-2">
        {/* Business Context Strip */}
        <QualityBusinessContext
          lastSynced={lastSynced}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        {/* 12 Quality KPI Cards */}
        <QualityKpiGrid onFilterClick={handleKPIFilterClick} />

        {/* Horizontal Status Tabs */}
        <QualityTabs
          activeTab={filters.activeTab}
          onTabChange={handleTabChange}
        />

        {/* Middle Charts Row: Trend + Issue Distribution + Status Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] gap-4 mb-4 items-stretch">
          <CatalogueQualityTrend />
          <IssueDistributionChart
            onIssueTypeClick={(issueType) => handleKPIFilterClick("issueType", issueType)}
          />
          <IssueStatusSummary
            onStatusClick={(status) => handleKPIFilterClick("status", status)}
          />
        </div>

        {/* Catalogue Quality Scorecard */}
        <CatalogueQualityScorecard />

        {/* Main Workspace Layout: Left Content + Right Intelligence Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Left Workspace */}
          <div className="flex flex-col min-w-0">
            {/* Filters Bar */}
            <QualityFilters
              filters={filters}
              onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              onToggleQuickChip={handleToggleQuickChip}
              onClearAll={handleClearFilters}
              onOpenSaveView={() => setIsSaveViewOpen(true)}
              onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Catalogue Quality Issues Main Table */}
            <QualityIssuesTable
              issues={paginatedIssues}
              totalCount={filteredIssues.length}
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
              onOpenCase={handleOpenCaseDetail}
              onOpenCompareDuplicate={() => handleOpenCompareDuplicate()}
              showToast={showToast}
            />

            {/* 7 Lower Operational Panels */}
            <LowerQualityPanels
              onOpenCompareDuplicate={() => handleOpenCompareDuplicate()}
              showToast={showToast}
            />
          </div>

          {/* Right Quality Operations Intelligence Sidebar */}
          <div className="w-full">
            <QualityOperationsSidebar
              onFilterClick={handleKPIFilterClick}
              showToast={showToast}
            />
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <CreateQualityCaseDrawer
        isOpen={isCreateCaseOpen}
        onClose={() => setIsCreateCaseOpen(false)}
        onSuccess={(title) => showToast(`Created new quality case "${title}".`)}
      />

      <QualityCaseDetailDrawer
        isOpen={isDetailOpen}
        issue={activeCase}
        onClose={() => setIsDetailOpen(false)}
        onOpenCompareDuplicate={() => handleOpenCompareDuplicate()}
        showToast={showToast}
      />

      <RunValidationModal
        isOpen={isRunValidationOpen}
        onClose={() => setIsRunValidationOpen(false)}
        onSuccess={(scope) => showToast(`Validation scan for "${scope}" completed successfully.`)}
      />

      <DuplicateComparisonModal
        isOpen={isDuplicateModalOpen}
        candidate={comparingCandidate}
        onClose={() => setIsDuplicateModalOpen(false)}
        onResolve={(action) => showToast(`Resolved duplicate candidate via "${action}".`)}
      />

      <SaveQualityViewModal
        isOpen={isSaveViewOpen}
        onClose={() => setIsSaveViewOpen(false)}
        onSave={(name) => showToast(`Saved custom view preset "${name}".`)}
      />

      <MoreQualityFiltersDrawer
        isOpen={isMoreFiltersOpen}
        filters={filters}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={() => showToast("Applied advanced quality filters.")}
      />
    </div>
  );
}
