"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { customerApi } from "@/lib/api/customers";
import { MOCK_CUSTOMER_RECORDS } from "@/data/customer.mock";

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
  CustomerRecord,
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
  [key: string]: any;
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
  module?: string;
}

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

export function CustomerModuleView({ config, module }: CustomerModuleViewProps) {
  const [activeTab, setActiveTab] = useState(config.tabs[0]?.id || "overview");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const [filters, setFilters] = useState<CustomerFilterState>({
    ...DEFAULT_FILTERS,
    activeTab: config.tabs[0]?.id || "overview",
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Table state
  const [sortColumn, setSortColumn] = useState<any>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [dataState, setDataState] = useState<{
    kpis: CustomerKpiCard[];
    tabs: CustomerTabItem[];
    healthItems: CustomerHealthMetricItem[];
    operationCards: CustomerOperationCard[];
    lifecycleNodes: LifecycleNode[];
    rightRail: CustomerRightRailSectionData;
    customers: any[];
    pagination: {
      total: number;
      currentPage: number;
      perPage: number;
      lastPage: number;
    };
  }>({
    kpis: config.kpis,
    tabs: config.tabs,
    healthItems: config.healthItems ?? [],
    operationCards: config.operationCards,
    lifecycleNodes: config.lifecycleNodes ?? [],
    rightRail: config.rightRail,
    customers: [],
    pagination: { total: 0, currentPage: 1, perPage: 25, lastPage: 1 }
  });

  const showToast = (msg: string, type: ToastType = "info") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchDashboardData = async () => {
    if (!module) return;
    setIsLoading(true);
    try {
      const response = await customerApi.getModuleDashboard(module, {
        page: currentPage,
        perPage: rowsPerPage,
        search: filters.searchQuery,
        sort: sortColumn,
        direction: sortDirection,
        segment: filters.segment,
        loyaltyTier: filters.loyaltyTier,
        verificationStatus: filters.verificationStatus,
        riskLevel: filters.riskLevel,
        region: filters.region,
        activeTab: activeTab
      });
      if (response) {
        setDataState({
          kpis: response.kpis ?? config.kpis,
          tabs: response.tabs ?? config.tabs,
          healthItems: response.healthScorecard ?? config.healthItems ?? [],
          operationCards: response.operationCards ?? config.operationCards,
          lifecycleNodes: response.lifecycleNodes ?? config.lifecycleNodes ?? [],
          rightRail: response.rightRail ?? config.rightRail,
          customers: response.customers ?? [],
          pagination: response.pagination ?? { total: 0, currentPage: 1, perPage: 25, lastPage: 1 }
        });
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch dashboard data from backend.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (module) {
      fetchDashboardData();
    } else {
      setDataState({
        kpis: config.kpis,
        tabs: config.tabs,
        healthItems: config.healthItems ?? [],
        operationCards: config.operationCards,
        lifecycleNodes: config.lifecycleNodes ?? [],
        rightRail: config.rightRail,
        customers: MOCK_CUSTOMER_RECORDS,
        pagination: { total: MOCK_CUSTOMER_RECORDS.length, currentPage: 1, perPage: 25, lastPage: 1 }
      });
    }
  }, [module, currentPage, rowsPerPage, filters.searchQuery, sortColumn, sortDirection, filters.segment, filters.loyaltyTier, filters.verificationStatus, filters.riskLevel, filters.region, activeTab]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (module) {
      await fetchDashboardData();
    }
    setIsRefreshing(false);
    showToast("Data updated successfully.", "success");
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
    ? dataState.customers.find((c) => c.id === selectedCustomerId) ?? null
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
          kpis={dataState.kpis}
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
          items={dataState.tabs}
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
          items={dataState.healthItems}
        />

        {/* Main Workspace: Left Content + Right Rail */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-5 items-start">
          {/* Left Content Area */}
          <div className="flex flex-col min-w-0">
            {/* Portfolio Search & Filters */}
            <CustomerPortfolioFilters
              filters={filters}
              onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              onClearAll={() => setFilters({ ...DEFAULT_FILTERS, activeTab: dataState.tabs[0]?.id || "overview" })}
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
                customers={dataState.customers}
                totalCount={dataState.pagination.total}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={setSelectedCustomerId}
                selectedRowIds={[]}
                onSelectRow={() => {}}
                onSelectAllOnPage={() => {}}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={(column) => {
                  const isAsc = sortColumn === column && sortDirection === "asc";
                  setSortDirection(isAsc ? "desc" : "asc");
                  setSortColumn(column);
                }}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                onRowsPerPageChange={(rows) => setRowsPerPage(rows)}
                showToast={showToast}
              />
              <SelectedCustomerPreview
                customer={selectedCustomer}
                showToast={showToast}
              />
            </div>

            {/* 12–17 Bottom Operation Summary Cards */}
            <CustomerSummaryCards
              cards={dataState.operationCards}
              showToast={showToast}
            />

            {/* Lifecycle Journey Bar */}
            {dataState.lifecycleNodes && dataState.lifecycleNodes.length > 0 && (
              <CustomerLifecycleJourney
                nodes={dataState.lifecycleNodes}
                title={config.lifecycleTitle}
              />
            )}
          </div>

          {/* Right Intelligence Rail Sidebar */}
          <div className="w-full">
            <CustomerOperationsSidebar
              data={dataState.rightRail}
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
