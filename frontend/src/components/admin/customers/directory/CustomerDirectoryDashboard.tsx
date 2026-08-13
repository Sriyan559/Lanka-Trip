"use client";

import React from "react";
import { CustomerDirectoryHeader } from "./CustomerDirectoryHeader";
import { CustomerDirectoryTabs } from "./CustomerDirectoryTabs";
import { CustomerDirectoryFilters } from "./CustomerDirectoryFilters";
import { CustomerDirectoryTable } from "./CustomerDirectoryTable";
import { CustomerContextFilters } from "../CustomerContextFilters";
import { CustomerKpiGrid } from "../CustomerKpiGrid";
import { CustomerGrowthChart } from "../CustomerGrowthChart";
import { CustomerSegmentChart } from "../CustomerSegmentChart";
import { CustomerStatusSummary } from "../CustomerStatusSummary";
import { CustomerHealthScorecard } from "../CustomerHealthScorecard";
import { SelectedCustomerPreview } from "../SelectedCustomerPreview";
import { CustomerOperationsSidebar } from "../CustomerOperationsSidebar";
import { CustomerSummaryCards } from "../CustomerSummaryCards";
import { CustomerLifecycleJourney } from "../CustomerLifecycleJourney";
import { AddCustomerDrawer } from "../AddCustomerDrawer";
import { SaveCustomerViewModal } from "../SaveCustomerViewModal";
import { MoreCustomerFiltersDrawer } from "../MoreCustomerFiltersDrawer";
import { useCustomerDirectory } from "@/hooks/useCustomerDirectory";

export function CustomerDirectoryDashboard() {
  const {
    customers,
    selectedCustomer,
    selectedCustomerId,
    setSelectedCustomerId,
    selectedRowIds,
    kpis,
    statusSummary,
    healthScorecard,
    pagination,
    isLoading,
    isRefreshing,
    lastSynced,
    filters,
    setFilters,
    handleFilterChange,
    handleClearAll,
    handleToggleQuickChip,
    handleRefresh,
    handleToggleSelectRow,
    handleToggleSelectAll,
    handleExport,
    toastMessage,
    showToast,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isMoreFiltersOpen,
    setIsMoreFiltersOpen,
  } = useCustomerDirectory();

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#faf8f8] pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-[#671021] text-white text-[12px] font-bold px-4 py-2.5 rounded-lg shadow-xl z-50 animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <CustomerDirectoryHeader
        onExportReport={handleExport}
        onOpenAddCustomer={() => setIsAddDrawerOpen(true)}
        selectedCount={selectedRowIds.length}
        showToast={showToast}
      />

      {/* 2. Context & Scope Bar */}
      <CustomerContextFilters
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lastSynced={lastSynced || "Not available"}
      />

      {/* 3. Main Body */}
      <div className="px-6 pt-4 flex flex-col gap-4">
        {/* KPI Grid (12 Cards - CU02 variants) */}
        <CustomerKpiGrid kpis={kpis} showToast={showToast} />

        {/* 14 Directory Tabs */}
        <CustomerDirectoryTabs
          activeTab={filters.activeTab}
          onSelectTab={(t) => handleFilterChange("activeTab", t)}
        />

        {/* Workspace + Right Intelligence Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Left Main Workspace */}
          <div className="flex flex-col gap-4 min-w-0">
            {/* 3 Analytics Charts Panel */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] gap-4 items-stretch">
              <CustomerGrowthChart data={customers} />
              <CustomerSegmentChart totalCount={pagination.total} />
              <CustomerStatusSummary
                statusSummary={statusSummary}
                isLoading={isLoading}
                onRetry={handleRefresh}
              />
            </div>

            {/* Customer Health Scorecard */}
            <CustomerHealthScorecard
              items={healthScorecard}
              isLoading={isLoading}
              onRetry={handleRefresh}
            />

            {/* Filters + Quick Chips */}
            <CustomerDirectoryFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              onToggleQuickChip={handleToggleQuickChip}
              onOpenMoreFilters={() => setIsMoreFiltersOpen(true)}
              onOpenSaveView={() => setIsSaveModalOpen(true)}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Table + Selected Customer Preview */}
            <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_320px] gap-4 items-start">
              <CustomerDirectoryTable
                records={customers}
                selectedCustomerId={selectedCustomerId || ""}
                onSelectCustomer={(c) => setSelectedCustomerId(c.id)}
                selectedRowIds={selectedRowIds}
                onToggleSelectRow={handleToggleSelectRow}
                onToggleSelectAll={handleToggleSelectAll}
                showToast={showToast}
              />

              <SelectedCustomerPreview
                customer={selectedCustomer}
                hasCustomers={customers.length > 0}
                showToast={showToast}
              />
            </div>

            {/* 12 Lower Summary Cards */}
            <CustomerSummaryCards showToast={showToast} />

            {/* Customer Lifecycle Journey */}
            <CustomerLifecycleJourney />
          </div>

          {/* Right Customer Operations Intelligence Sidebar */}
          <CustomerOperationsSidebar
            onOpenAddCustomer={() => setIsAddDrawerOpen(true)}
            onExportReport={handleExport}
            showToast={showToast}
          />
        </div>
      </div>

      {/* Drawers and Modals */}
      <AddCustomerDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onSuccess={(name) => {
          showToast(`Created customer record for "${name}".`);
          handleRefresh();
        }}
      />

      <SaveCustomerViewModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={(name) => showToast(`Saved custom view preset "${name}".`)}
      />

      <MoreCustomerFiltersDrawer
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
        filters={filters}
        onApply={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
      />
    </div>
  );
}
