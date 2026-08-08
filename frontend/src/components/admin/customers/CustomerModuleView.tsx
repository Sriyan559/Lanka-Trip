"use client";

import React, { useState } from "react";

// Shared Components
import { CustomerCommandHeader } from "./CustomerCommandHeader";
import { CustomerContextStrip } from "./CustomerContextStrip";
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
import { CustomerSummaryCards } from "./CustomerSummaryCards";
import { CustomerLifecycleJourney } from "./CustomerLifecycleJourney";
import { CustomerOperationsSidebar } from "./CustomerOperationsSidebar";

// Types
import {
  CustomerKpiCard,
  CustomerTabItem,
  CustomerHealthMetricItem,
  CustomerRightRailSectionData,
  CustomerOperationCard,
  CustomerFilterState,
  LifecycleNode,
} from "@/types/customer";

// Chart data types
interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

interface StatusBarItem {
  label: string;
  count: number;
  pct: string;
  color: string;
}

interface PortfolioRow {
  [key: string]: string | number | undefined;
  id: string;
}

// Notification type
type ToastType = "success" | "info" | "warning" | "error";
interface ToastMessage {
  text: string;
  type: ToastType;
}

// The main view model configuration for any CU06-CU14 screen
export interface CustomerModuleViewConfig {
  // Header
  pageTitle: string;
  pageSubtitle: string;
  breadcrumbCurrent: string;
  primaryActionLabel?: string;

  // Context strip (optional overrides)
  customerScope?: string;

  // KPI grid
  kpis: CustomerKpiCard[];

  // Tabs
  tabs: CustomerTabItem[];

  // Charts (uses defaults if not provided)
  trendChartTitle?: string;
  donutData?: ChartDataItem[];
  statusBars?: StatusBarItem[];

  // Health scorecard
  healthTitle?: string;
  healthItems?: CustomerHealthMetricItem[];

  // Portfolio table (uses generic rows if provided)
  portfolioColumns?: { key: string; label: string; width?: string }[];
  portfolioRows?: PortfolioRow[];

  // Bottom operation cards
  operationCards: CustomerOperationCard[];

  // Lifecycle
  lifecycleNodes?: LifecycleNode[];
  lifecycleTitle?: string;

  // Right rail
  rightRail: CustomerRightRailSectionData;
}

interface CustomerModuleViewProps {
  config: CustomerModuleViewConfig;
}

import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { MOCK_CUSTOMER_RECORDS } from "@/data/customer.mock";

// Default filter state
const DEFAULT_FILTERS: CustomerFilterState = {
  searchQuery: "",
  segment: "",
  customerType: "",
  region: "",
  salesChannel: "",
  loyaltyTier: "",
  verificationStatus: "",
  consentStatus: "",
  riskLevel: "",
  owner: "",
  updatedDate: "",
  activeTab: "",
  quickChips: [],
};

export function CustomerModuleView({ config }: CustomerModuleViewProps) {
  const [activeTab, setActiveTab] = useState(config.tabs[0]?.id || "overview");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const [filters, setFilters] = useState<CustomerFilterState>({
    ...DEFAULT_FILTERS,
    activeTab: config.tabs[0]?.id || "overview",
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (msg: string, type: ToastType = "info") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setFilters((prev) => ({ ...prev, activeTab: tabId }));
    showToast(`Switched to: ${tabId}`);
  };

  const handleToggleQuickChip = (chip: string) => {
    setFilters((prev) => ({
      ...prev,
      quickChips: prev.quickChips.includes(chip)
        ? prev.quickChips.filter((c) => c !== chip)
        : [...prev.quickChips, chip],
    }));
  };

  const selectedCustomer = selectedCustomerId
    ? MOCK_CUSTOMER_RECORDS.find((c) => c.id === selectedCustomerId) ?? null
    : null;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#faf8f8] pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl border bg-white flex items-center gap-2.5 text-[12px] font-bold animate-in fade-in slide-in-from-top-2 duration-200 max-w-sm">
          {toastMessage.type === "success" && <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />}
          {toastMessage.type === "info" && <Info size={16} className="text-sky-600 flex-shrink-0" />}
          {toastMessage.type === "warning" && <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />}
          {toastMessage.type === "error" && <AlertTriangle size={16} className="text-rose-600 flex-shrink-0" />}
          <span className="text-ink">{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <CustomerCommandHeader
        title={config.pageTitle}
        subtitle={config.pageSubtitle}
        breadcrumbCurrent={config.breadcrumbCurrent}
        primaryActionLabel={config.primaryActionLabel}
        onPrimaryAction={() => showToast(`Opening ${config.primaryActionLabel || "action"}...`)}
        onExportReport={() => showToast("Exporting report...")}
      />

      <div className="px-6 py-4 flex flex-col gap-3">
        {/* Context Strip */}
        <CustomerContextStrip
          customerScope={config.customerScope}
          lastSynced="May 26, 2025 09:15 AM"
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* KPI Cards Grid */}
        <CustomerKpiGrid
          kpis={config.kpis}
          onFilterClick={(type, value) => {
            if (type === "tab") handleTabChange(value);
            else handleToggleQuickChip(value);
          }}
          showToast={showToast}
        />

        {/* Module Tabs */}
        <CustomerCommandTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          items={config.tabs}
        />

        {/* Middle Analytics: Trend Chart + Donut + Status Bars */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] gap-4 mb-4 items-stretch">
          <CustomerGrowthChart />
          <CustomerSegmentChart
            onSegmentClick={(seg) => handleTabChange(seg)}
          />
          <CustomerStatusSummary
            onStatusClick={(s) => handleTabChange(s)}
          />
        </div>

        {/* Health Scorecard */}
        <CustomerHealthScorecard
          title={config.healthTitle}
          items={config.healthItems}
        />

        {/* Main Workspace: Left Content + Right Rail */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Left Content Area */}
          <div className="flex flex-col min-w-0">
            {/* Portfolio Search & Filters */}
            <CustomerPortfolioFilters
              filters={filters}
              onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              onClearAll={() => setFilters({ ...DEFAULT_FILTERS, activeTab: config.tabs[0]?.id || "overview" })}
              onOpenSaveView={() => showToast("Save view opened...")}
              onOpenMoreFilters={() => showToast("More filters opened...")}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Quick Filter Chips */}
            <CustomerQuickFilters
              activeChips={filters.quickChips}
              onToggleChip={handleToggleQuickChip}
            />

            {/* Table + Preview Side-by-side */}
            <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_320px] gap-4 my-4 items-start">
              <CustomerPortfolioTable
                customers={MOCK_CUSTOMER_RECORDS}
                totalCount={MOCK_CUSTOMER_RECORDS.length}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={setSelectedCustomerId}
                selectedRowIds={[]}
                onSelectRow={() => {}}
                onSelectAllOnPage={() => {}}
                sortColumn={"name"}
                sortDirection="asc"
                onSort={() => {}}
                currentPage={1}
                rowsPerPage={10}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
                showToast={showToast}
              />
              <SelectedCustomerPreview
                customer={selectedCustomer}
                showToast={showToast}
              />
            </div>

            {/* 12–17 Bottom Operation Summary Cards */}
            <CustomerSummaryCards
              cards={config.operationCards}
              showToast={showToast}
            />

            {/* Lifecycle Journey Bar */}
            {config.lifecycleNodes && config.lifecycleNodes.length > 0 && (
              <CustomerLifecycleJourney
                nodes={config.lifecycleNodes}
                title={config.lifecycleTitle}
              />
            )}
          </div>

          {/* Right Intelligence Rail Sidebar */}
          <div className="w-full">
            <CustomerOperationsSidebar
              data={config.rightRail}
              onFilterClick={(type, value) => {
                if (type === "tab") handleTabChange(value);
                else handleToggleQuickChip(value);
              }}
              onExportReport={() => showToast("Exporting report...")}
              showToast={showToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
