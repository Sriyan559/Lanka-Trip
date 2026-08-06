"use client";

import React from "react";
import { useMediaManagement } from "@/hooks/useMediaManagement";
import { MediaManagementHeader } from "./MediaManagementHeader";
import { MediaBusinessContext } from "./MediaBusinessContext";
import { MediaKpiGrid } from "./MediaKpiGrid";
import { MediaStatusTabs } from "./MediaStatusTabs";
import { MediaFilters } from "./MediaFilters";
import { MediaQuickFilters } from "./MediaQuickFilters";
import { MediaAssetTable } from "./MediaAssetTable";
import { MediaIntelligenceSidebar } from "./MediaIntelligenceSidebar";
import { MediaLowerPanels } from "./MediaLowerPanels";

// Modals & Drawers
import { UploadMediaModal } from "./UploadMediaModal";
import { ImportMediaModal } from "./ImportMediaModal";
import { EditMediaMetadataDrawer } from "./EditMediaMetadataDrawer";
import { MediaPreviewModal } from "./MediaPreviewModal";
import { DuplicateMediaComparisonModal } from "./DuplicateMediaComparisonModal";
import { SaveMediaViewModal } from "./SaveMediaViewModal";
import { MoreMediaFiltersDrawer } from "./MoreMediaFiltersDrawer";

import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

export function MediaManagementDashboard() {
  const {
    assets,
    setAssets,
    selectedAssetId,
    setSelectedAssetId,
    selectedRowIds,
    filters,
    setFilters,
    filteredAssets,
    paginatedAssets,
    selectedPreviewAsset,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    sortColumn,
    sortDirection,
    handleSort,
    handleSelectAllOnPage,
    handleSelectRow,
    handleClearFilters,
    handleToggleQuickChip,
    handleRefresh,
    handleExportCSV,
    handleApproveAsset,
    handleRevokeApproval,
    handleArchiveAsset,
    handleCompareDuplicate,
    lastSynced,
    isRefreshing,
    toastMessage,
    showToast,

    // Modals
    isUploadOpen,
    setIsUploadOpen,
    isImportOpen,
    setIsImportOpen,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    isPreviewOpen,
    setIsPreviewOpen,
    isCompareOpen,
    setIsCompareOpen,
    isSaveViewOpen,
    setIsSaveViewOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,

    // Targets
    editingAsset,
    setEditingAsset,
    previewingAsset,
    setPreviewingAsset,
    comparingCandidate,
  } = useMediaManagement();

  // Handle KPI / Sidebar clicks to set filters
  const handleKPIFilterClick = (type: string, value: string) => {
    if (type === "tab") {
      setFilters((prev) => ({ ...prev, activeTab: value }));
      showToast(`Filtered table by tab: ${value}`);
    } else if (type === "chip") {
      if (!filters.quickChips.includes(value)) {
        setFilters((prev) => ({ ...prev, quickChips: [...prev.quickChips, value] }));
        showToast(`Applied quick filter: ${value}`);
      }
    } else if (type === "approvalStatus") {
      setFilters((prev) => ({ ...prev, approvalStatus: value }));
      showToast(`Filtered by approval status: ${value}`);
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === "Approve Selected") {
      setAssets((prev) =>
        prev.map((a) => (selectedRowIds.includes(a.id) ? { ...a, approvalStatus: "Approved" } : a))
      );
      showToast(`Approved ${selectedRowIds.length} selected assets.`);
    } else if (action === "Archive Selected") {
      if (confirm(`Archive ${selectedRowIds.length} selected assets?`)) {
        setAssets((prev) =>
          prev.map((a) => (selectedRowIds.includes(a.id) ? { ...a, isArchived: true } : a))
        );
        showToast(`Archived ${selectedRowIds.length} selected assets.`, "info");
      }
    } else {
      showToast(`Applied bulk action "${action}" to ${selectedRowIds.length} assets.`);
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
      <MediaManagementHeader
        selectedCount={selectedRowIds.length}
        onExport={handleExportCSV}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onBulkAction={handleBulkAction}
      />

      <div className="px-6 py-4 flex flex-col gap-2">
        {/* Business Context Strip */}
        <MediaBusinessContext
          lastSynced={lastSynced}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        {/* 12 KPI Cards */}
        <MediaKpiGrid onFilterClick={handleKPIFilterClick} />

        {/* Main Workspace Layout: Table Left + Intelligence Sidebar Right */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Main Left Workspace */}
          <div className="flex flex-col min-w-0">
            {/* Status Tabs */}
            <MediaStatusTabs
              activeTab={filters.activeTab}
              onTabChange={(tab) => setFilters((prev) => ({ ...prev, activeTab: tab }))}
            />

            {/* Filters */}
            <MediaFilters
              filters={filters}
              onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              onClearAll={handleClearFilters}
              onOpenSaveView={() => setIsSaveViewOpen(true)}
              onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Quick Filter Chips */}
            <MediaQuickFilters
              activeChips={filters.quickChips}
              onToggleChip={handleToggleQuickChip}
            />

            {/* Media Asset Table */}
            <MediaAssetTable
              assets={paginatedAssets}
              totalCount={filteredAssets.length}
              selectedAssetId={selectedAssetId}
              onSelectAsset={setSelectedAssetId}
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
              onPreview={(asset) => {
                setPreviewingAsset(asset);
                setIsPreviewOpen(true);
              }}
              onEdit={(asset) => {
                setEditingAsset(asset);
                setIsEditDrawerOpen(true);
              }}
              onApprove={handleApproveAsset}
              onRevoke={handleRevokeApproval}
              onArchive={handleArchiveAsset}
              showToast={showToast}
            />

            {/* Lower Operational Summary Panels */}
            <MediaLowerPanels
              onCompareDuplicate={handleCompareDuplicate}
              showToast={showToast}
            />
          </div>

          {/* Right Intelligence Sidebar */}
          <div className="w-full">
            <MediaIntelligenceSidebar
              selectedAsset={selectedPreviewAsset}
              onOpenDetail={(asset) => {
                setPreviewingAsset(asset);
                setIsPreviewOpen(true);
              }}
              onReplace={(asset) => {
                setIsUploadOpen(true);
                showToast(`Opening upload replace flow for ${asset.id}...`);
              }}
              onRevoke={handleRevokeApproval}
              onFilterClick={handleKPIFilterClick}
            />
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <UploadMediaModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={(assetName) => showToast(`Successfully uploaded media asset: ${assetName}`)}
      />

      <ImportMediaModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={(count) => showToast(`Imported ${count} media asset records successfully.`)}
      />

      <EditMediaMetadataDrawer
        isOpen={isEditDrawerOpen}
        asset={editingAsset}
        onClose={() => setIsEditDrawerOpen(false)}
        onSave={(updated) => {
          setAssets((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
          showToast(`Saved updated metadata for ${updated.id}.`);
        }}
      />

      <MediaPreviewModal
        isOpen={isPreviewOpen}
        asset={previewingAsset}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={(asset) => showToast(`Downloading asset ${asset.id}...`)}
      />

      <DuplicateMediaComparisonModal
        isOpen={isCompareOpen}
        candidate={comparingCandidate}
        onClose={() => setIsCompareOpen(false)}
        onResolve={(action) => showToast(`Duplicate comparison resolved: ${action}`)}
      />

      <SaveMediaViewModal
        isOpen={isSaveViewOpen}
        onClose={() => setIsSaveViewOpen(false)}
        onSave={(name) => showToast(`Saved custom view preset "${name}".`)}
      />

      <MoreMediaFiltersDrawer
        isOpen={isMoreFiltersOpen}
        filters={filters}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={(updated) => showToast("Applied additional filter criteria.")}
      />
    </div>
  );
}
