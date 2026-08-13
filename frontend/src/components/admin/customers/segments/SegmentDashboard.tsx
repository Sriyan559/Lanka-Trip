"use client";

import React, { useState } from "react";
import { CustomerContextStrip } from "@/components/admin/customers/CustomerContextStrip";
import { SegmentHeader } from "./SegmentHeader";
import { SegmentKpiGrid } from "./SegmentKpiGrid";
import { SegmentPrimaryTabs } from "./SegmentPrimaryTabs";
import { SegmentAnalyticsSection } from "./SegmentAnalyticsSection";
import { SegmentHealthMetricsRow } from "./SegmentHealthMetricsRow";
import { SegmentFilterToolbar } from "./SegmentFilterToolbar";
import { SegmentPortfolioTable } from "./SegmentPortfolioTable";
import { SegmentSelectedPreviewPanel } from "./SegmentSelectedPreviewPanel";
import { SegmentLowerCardsGrid } from "./SegmentLowerCardsGrid";
import { SegmentRightRail } from "./SegmentRightRail";
import { SegmentCreateModal } from "./SegmentCreateModal";
import { useCustomerSegments } from "@/hooks/useCustomerSegments";

export function SegmentDashboard() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "info" | "warning" | "danger">("info");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const showToast = (msg: string, type: "success" | "info" | "warning" | "danger" = "info") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const {
    isLoading,
    isRefreshing,
    portfolio,
    kpis,
    selectedSegment,
    selectedSegmentId,
    setSelectedSegmentId,
    selectedDetails,
    priorityAlerts,
    typeDistribution,
    statusDistribution,
    healthMetrics,
    operationsMetrics,
    membershipSummary,
    conflictSummary,
    recalculationSummary,
    quickQueues,
    segmentationHealth,
    pagination,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    selectedMembership,
    setSelectedMembership,
    selectedConsent,
    setSelectedConsent,
    selectedRisk,
    setSelectedRisk,
    selectedOwner,
    setSelectedOwner,
    selectedQuickFilter,
    setSelectedQuickFilter,
    activeTab,
    setActiveTab,
    selectedRowIds,
    handleToggleSelectRow,
    handleToggleSelectAll,
    handleRefresh,
    handleClearAll,
    handleCreateSegment,
    handleRecalculate,
    handleApprove,
    handleBulkAction,
    exportSegmentReportCSV,
  } = useCustomerSegments(showToast);

  const activeCount = statusDistribution?.find((s) => s.name === "Active")?.value || 0;
  const draftCount = statusDistribution?.find((s) => s.name === "Draft")?.value || 0;
  const pendingCount = statusDistribution?.find((s) => s.name === "Pending Approval")?.value || 0;

  return (
    <div className="w-full min-h-screen bg-slate-100/50">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-lg shadow-xl text-xs font-bold font-mono animate-in fade-in duration-150 flex items-center gap-2 text-white ${
          toastType === "success"
            ? "bg-emerald-800"
            : toastType === "warning"
            ? "bg-amber-800"
            : toastType === "danger"
            ? "bg-rose-900"
            : "bg-slate-900"
        }`}>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Layout Wrapper */}
      <div className="p-4 sm:p-6 space-y-4 max-w-[1700px] mx-auto min-w-0">
        {/* Page Header */}
        <SegmentHeader
          onExportReport={exportSegmentReportCSV}
          onReviewConflicts={() => {
            setSelectedStatus("Conflict");
            setActiveTab("conflicts");
            showToast("Filtering to Segment Conflicts...", "info");
          }}
          onOpenCreateSegment={() => setIsCreateModalOpen(true)}
          onBulkAction={(act) => handleBulkAction(act)}
          showToast={showToast}
        />

        {/* Business Context Strip */}
        <CustomerContextStrip onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        {/* Top 12 KPI Metric Cards */}
        <SegmentKpiGrid metrics={kpis} />

        {/* Primary 18 Tabs Bar */}
        <SegmentPrimaryTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Left Main Workspace (3 Cols on XL) */}
          <div className="xl:col-span-3 space-y-4 min-w-0">
            {/* Analytics Section (Membership Trend, Type Distribution, Status Summary) */}
            <SegmentAnalyticsSection
              totalSegments={pagination.total || portfolio.length}
              typeDistribution={typeDistribution}
              statusDistribution={statusDistribution}
            />

            {/* Health Metrics Row */}
            <SegmentHealthMetricsRow healthMetrics={healthMetrics} />

            {/* Dense Filter Toolbar & Quick Filter Chips */}
            <SegmentFilterToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedCategory="All"
              onCategoryChange={() => {}}
              selectedMembership={selectedMembership}
              onMembershipChange={setSelectedMembership}
              selectedConsent={selectedConsent}
              onConsentChange={setSelectedConsent}
              selectedRisk={selectedRisk}
              onRiskChange={setSelectedRisk}
              selectedOwner={selectedOwner}
              onOwnerChange={setSelectedOwner}
              selectedQuickFilter={selectedQuickFilter}
              onQuickFilterSelect={(val) =>
                setSelectedQuickFilter(selectedQuickFilter === val ? "" : val)
              }
              onClearAll={handleClearAll}
              onRefresh={handleRefresh}
            />

            {/* Main Segment Portfolio Table */}
            <SegmentPortfolioTable
              segments={portfolio}
              selectedSegmentId={selectedSegmentId || ""}
              onSelectSegment={(seg) => setSelectedSegmentId(seg.id)}
              onActionClick={(act, seg) => {
                if (act === "Recalculate") handleRecalculate(seg.id);
                else if (act === "Approve") handleApprove(seg.id);
                else showToast(`Action ${act} on ${seg.name}`);
              }}
              selectedRowIds={selectedRowIds}
              onToggleSelectRow={handleToggleSelectRow}
              onToggleSelectAll={handleToggleSelectAll}
              totalCount={pagination.total}
              currentPage={page}
              onPageChange={setPage}
            />

            {/* Selected Segment Custom Preview Panel */}
            <SegmentSelectedPreviewPanel
              details={selectedDetails}
              showToast={showToast}
              onActionClick={(act, seg) => {
                if (act === "Edit") showToast(`Editing rules for ${seg.name}`, "info");
              }}
            />

            {/* Lower 11 Operational Summary Cards Grid */}
            <SegmentLowerCardsGrid
              selectedDetails={selectedDetails}
              operationsMetrics={operationsMetrics}
              showToast={showToast}
            />
          </div>

          {/* Right Segmentation Health Summary Rail (1 Col on XL) */}
          <div className="xl:col-span-1 min-w-0">
            <SegmentRightRail
              priorityAlerts={priorityAlerts}
              membershipSummary={membershipSummary}
              conflictSummary={conflictSummary}
              recalculationSummary={recalculationSummary}
              quickQueues={quickQueues}
              typeDistribution={typeDistribution}
              segmentationHealth={segmentationHealth}
              totalSegments={pagination.total || portfolio.length}
              activeSegments={activeCount}
              pendingApproval={pendingCount}
              draftSegments={draftCount}
              showToast={showToast}
              onReviewConflicts={() => {
                setSelectedStatus("Conflict");
                setActiveTab("conflicts");
                showToast("Filtering to Segment Conflicts...", "info");
              }}
              onRecalculateSegments={() => {
                if (selectedSegmentId) handleRecalculate(selectedSegmentId);
                else showToast("Triggering global segment recalculation...", "info");
              }}
              onApproveDrafts={() => {
                setSelectedStatus("Draft");
                showToast("Filtering to Draft Segments for approval...", "info");
              }}
              onExportReport={exportSegmentReportCSV}
            />
          </div>
        </div>
      </div>

      {/* Create Segment Modal */}
      <SegmentCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateSegment}
      />
    </div>
  );
}
