"use client";

import React from "react";
import { useCustomerCommandCenter } from "@/hooks/useCustomerCommandCenter";
import { CustomerCommandHeader } from "./CustomerCommandHeader";
import { CustomerContextFilters } from "./CustomerContextFilters";
import { CustomerKpiGrid } from "./CustomerKpiGrid";
import { CustomerCommandTabs } from "./CustomerCommandTabs";
import { CustomerGrowthChart } from "./CustomerGrowthChart";
import { CustomerSegmentChart } from "./CustomerSegmentChart";
import { CustomerStatusSummary } from "./CustomerStatusSummary";
import { CustomerHealthScorecard } from "./CustomerHealthScorecard";
import { CustomerPortfolioFilters } from "./CustomerPortfolioFilters";
import { CustomerQuickFilters } from "./CustomerQuickFilters";
import { CustomerPortfolioTable } from "./CustomerPortfolioTable";
import { SelectedCustomerPreview } from "./SelectedCustomerPreview";
import { CustomerOperationsSidebar } from "./CustomerOperationsSidebar";
import { CustomerSummaryCards } from "./CustomerSummaryCards";
import { CustomerLifecycleJourney } from "./CustomerLifecycleJourney";

// Modals & Drawers
import { AddCustomerDrawer } from "./AddCustomerDrawer";
import { SaveCustomerViewModal } from "./SaveCustomerViewModal";
import { MoreCustomerFiltersDrawer } from "./MoreCustomerFiltersDrawer";

import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

export function CustomerCommandDashboard() {
  const {
    customers,
    setCustomers,
    selectedCustomerId,
    setSelectedCustomerId,
    selectedCustomer,
    selectedRowIds,
    statusSummary,
    healthScorecard,

    filters,
    setFilters,
    handleTabChange,
    handleToggleQuickChip,

    filteredCustomers,
    paginatedCustomers,

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

    // New data
    kpis,
    rightRail,
    pagination,
    isLoading,

    // Modals
    isAddCustomerOpen,
    setIsAddCustomerOpen,
    isSaveViewOpen,
    setIsSaveViewOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,
  } = useCustomerCommandCenter();

  const handleKPIFilterClick = (type: string, value: string) => {
    if (type === "tab") {
      handleTabChange(value);
      showToast(`Filtered customer workspace by tab: ${value}`);
    } else if (type === "chip") {
      handleToggleQuickChip(value);
      showToast(`Toggled quick filter: ${value}`);
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === "Restrict Selected") {
      setCustomers((prev) =>
        prev.map((c) =>
          selectedRowIds.includes(c.id) ? { ...c, restrictionStatus: "Restricted" as const } : c
        )
      );
      showToast(`Restricted ${selectedRowIds.length} selected customer records.`);
    } else {
      showToast(`Applied bulk action "${action}" to ${selectedRowIds.length} customer records.`);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#faf8f8] pb-12">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl border bg-white flex items-center gap-2.5 text-[12px] font-bold animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage.type === "success" && <CheckCircle2 size={16} className="text-emerald-600" />}
          {toastMessage.type === "info" && <Info size={16} className="text-sky-600" />}
          {toastMessage.type === "warning" && <AlertTriangle size={16} className="text-amber-600" />}
          <span className="text-ink">{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <CustomerCommandHeader
        selectedCount={selectedRowIds.length}
        onExportReport={handleExportCSV}
        onOpenAddCustomer={() => setIsAddCustomerOpen(true)}
        onBulkAction={handleBulkAction}
      />

      <div className="px-6 py-4 flex flex-col gap-2">
        {/* Business Context & Scope Filter Bar */}
        <CustomerContextFilters
          lastSynced={lastSynced}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        {/* 12 Customer KPI Cards */}
        <CustomerKpiGrid onFilterClick={handleKPIFilterClick} />

        {/* Command Center Tabs */}
        <CustomerCommandTabs
          activeTab={filters.activeTab}
          onTabChange={handleTabChange}
        />

        {/* Middle Analytics Area: Growth Chart + Segment Donut + Status Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] gap-4 mb-4 items-stretch">
          <CustomerGrowthChart />
          <CustomerSegmentChart
            onSegmentClick={(segment) => handleKPIFilterClick("tab", segment)}
          />
          <CustomerStatusSummary
            statusSummary={statusSummary}
            isLoading={isLoading}
            onStatusClick={(status) => handleKPIFilterClick("tab", status)}
            onRetry={handleRefresh}
          />
        </div>

        {/* Customer Health Scorecard */}
        <CustomerHealthScorecard
          items={healthScorecard}
          isLoading={isLoading}
          onRetry={handleRefresh}
        />

        {/* Main Workspace Layout: Left Content + Right Intelligence Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Left Workspace */}
          <div className="flex flex-col min-w-0">
            {/* Portfolio Search & Filters */}
            <CustomerPortfolioFilters
              filters={filters}
              onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              onClearAll={handleClearFilters}
              onOpenSaveView={() => setIsSaveViewOpen(true)}
              onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Quick Filter Chips */}
            <CustomerQuickFilters
              activeChips={filters.quickChips}
              onToggleChip={handleToggleQuickChip}
            />

            {/* Table & Selected Customer Preview Split */}
            <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_320px] gap-4 my-4 items-start">
              {/* Customer Portfolio Main Table */}
              <CustomerPortfolioTable
                customers={paginatedCustomers}
                totalCount={filteredCustomers.length}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={setSelectedCustomerId}
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
                showToast={showToast}
              />

              {/* Right Selected Customer Preview */}
              <SelectedCustomerPreview
                customer={selectedCustomer}
                hasCustomers={customers.length > 0}
                showToast={showToast}
              />
            </div>

            {/* 12 Lower Summary Panels */}
            <CustomerSummaryCards showToast={showToast} />

            {/* Full-Width Customer Lifecycle Journey */}
            <CustomerLifecycleJourney />
          </div>

          {/* Right Customer Operations Intelligence Sidebar */}
          <div className="w-full">
            <CustomerOperationsSidebar
              onFilterClick={handleKPIFilterClick}
              onOpenAddCustomer={() => setIsAddCustomerOpen(true)}
              onExportReport={handleExportCSV}
              showToast={showToast}
            />
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <AddCustomerDrawer
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
        onSuccess={(name) => showToast(`Added new customer record for "${name}".`, "success")}
      />

      <SaveCustomerViewModal
        isOpen={isSaveViewOpen}
        onClose={() => setIsSaveViewOpen(false)}
        onSave={(name) => showToast(`Saved custom view preset "${name}".`, "success")}
      />

      <MoreCustomerFiltersDrawer
        isOpen={isMoreFiltersOpen}
        filters={filters}
        onClose={() => setIsMoreFiltersOpen(false)}
        onApply={() => showToast("Applied advanced customer filters.", "info")}
      />
    </div>
  );
}
