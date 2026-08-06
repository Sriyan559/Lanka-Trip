"use client";

import React, { useState } from "react";
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
import { MOCK_DIRECTORY_KPIS, MOCK_CUSTOMER_RECORDS } from "@/data/customer.mock";
import { CustomerFilterState } from "@/types/customer";
import { exportCustomerReportCSV } from "@/utils/exportCustomerReport";

export function CustomerDirectoryDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("CUST-100001");
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<CustomerFilterState>({
    searchQuery: "",
    segment: "All",
    customerType: "All",
    region: "All",
    salesChannel: "All",
    loyaltyTier: "All",
    verificationStatus: "All",
    consentStatus: "All",
    riskLevel: "All",
    owner: "All",
    updatedDate: "30D",
    activeTab: "all",
    quickChips: [],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFilterChange = (key: keyof CustomerFilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      searchQuery: "",
      segment: "All",
      customerType: "All",
      region: "All",
      salesChannel: "All",
      loyaltyTier: "All",
      verificationStatus: "All",
      consentStatus: "All",
      riskLevel: "All",
      owner: "All",
      updatedDate: "30D",
      activeTab: "all",
      quickChips: [],
    });
    showToast("Filters reset to default.");
  };

  const handleToggleQuickChip = (chip: string) => {
    setFilters((prev) => {
      const exists = prev.quickChips.includes(chip);
      const nextChips = exists
        ? prev.quickChips.filter((c) => c !== chip)
        : [...prev.quickChips, chip];
      return { ...prev, quickChips: nextChips };
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast("Syncing customer directory data...");
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Directory data successfully synced.");
    }, 600);
  };

  // Filter Customer Records
  const filteredRecords = MOCK_CUSTOMER_RECORDS.filter((c) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      const matchPhone = c.phone.includes(q);
      if (!matchName && !matchEmail && !matchId && !matchPhone) return false;
    }

    if (filters.customerType !== "All" && c.customerType !== filters.customerType) {
      return false;
    }
    if (filters.segment !== "All" && c.lifecycleSegment !== filters.segment) {
      return false;
    }
    if (filters.verificationStatus !== "All" && c.verificationStatus !== filters.verificationStatus) {
      return false;
    }
    if (filters.loyaltyTier !== "All" && c.loyaltyTier !== filters.loyaltyTier) {
      return false;
    }
    if (filters.consentStatus !== "All" && c.consentStatus !== filters.consentStatus) {
      return false;
    }
    if (filters.riskLevel !== "All" && c.riskLevel !== filters.riskLevel) {
      return false;
    }
    if (filters.region !== "All" && c.region !== filters.region) {
      return false;
    }
    if (filters.salesChannel !== "All" && c.preferredChannel !== filters.salesChannel) {
      return false;
    }
    if (filters.owner !== "All" && c.owner !== filters.owner) {
      return false;
    }

    return true;
  });

  const selectedCustomer =
    MOCK_CUSTOMER_RECORDS.find((c) => c.id === selectedCustomerId) || MOCK_CUSTOMER_RECORDS[0];

  const handleToggleSelectRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedRowIds.length === filteredRecords.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(filteredRecords.map((r) => r.id));
    }
  };

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
        onExportReport={() => exportCustomerReportCSV(filteredRecords)}
        onOpenAddCustomer={() => setIsAddDrawerOpen(true)}
        selectedCount={selectedRowIds.length}
        showToast={showToast}
      />

      {/* 2. Context & Scope Bar */}
      <CustomerContextFilters
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lastSynced="May 26, 2025 10:15 AM"
      />

      {/* 3. Main Body */}
      <div className="px-6 pt-4 flex flex-col gap-4">
        {/* KPI Grid (12 Cards - CU02 variants) */}
        <CustomerKpiGrid kpis={MOCK_DIRECTORY_KPIS} showToast={showToast} />

        {/* 14 Directory Tabs */}
        <CustomerDirectoryTabs activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

        {/* Workspace + Right Intelligence Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Left Main Workspace */}
          <div className="flex flex-col gap-4 min-w-0">
            {/* 3 Analytics Charts Panel */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] gap-4 items-stretch">
              <CustomerGrowthChart />
              <CustomerSegmentChart />
              <CustomerStatusSummary />
            </div>

            {/* Customer Health Scorecard */}
            <CustomerHealthScorecard />

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
                records={filteredRecords}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={(c) => setSelectedCustomerId(c.id)}
                selectedRowIds={selectedRowIds}
                onToggleSelectRow={handleToggleSelectRow}
                onToggleSelectAll={handleToggleSelectAll}
                showToast={showToast}
              />

              <SelectedCustomerPreview
                customer={selectedCustomer}
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
            onExportReport={() => exportCustomerReportCSV(filteredRecords)}
            showToast={showToast}
          />
        </div>
      </div>

      {/* Drawers and Modals */}
      <AddCustomerDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onSuccess={(name) => showToast(`Created customer record for "${name}".`)}
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
