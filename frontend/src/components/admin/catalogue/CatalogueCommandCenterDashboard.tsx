"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { INITIAL_KPIS } from "@/data/catalogue.mock";
import { BusinessContextFilter, ProductApprovalItem, RecentActivityItem } from "@/types/catalogue";
import { CatalogueHeader } from "./components/CatalogueHeader";
import { CatalogueContextFilters } from "./components/CatalogueContextFilters";
import { CatalogueKpiGrid } from "./components/CatalogueKpiGrid";
import { CatalogueInsightSidebar } from "./components/CatalogueInsightSidebar";
import { CatalogueGrowthChart } from "./components/CatalogueGrowthChart";
import { CatalogueComposition } from "./components/CatalogueComposition";
import { CatalogueHealthScorecard } from "./components/CatalogueHealthScorecard";
import { ApprovalWorkflow } from "./components/ApprovalWorkflow";
import { PriorityProductApprovals } from "./components/PriorityProductApprovals";
import { CatalogueQualityReadiness } from "./components/CatalogueQualityReadiness";
import { InventoryExpiryOperations } from "./components/InventoryExpiryOperations";
import { RecentCatalogueActivity } from "./components/RecentCatalogueActivity";
import { ImportCatalogueModal } from "./components/ImportCatalogueModal";
import { QuickQueryDrawer } from "./components/QuickQueryDrawer";
import { DataCheckModal } from "./components/DataCheckModal";
import { FileCheck, Search } from "lucide-react";

export function CatalogueCommandCenterDashboard() {
  const [filters, setFilters] = useState<BusinessContextFilter>({
    tenant: "SL Beauty",
    ecosystem: "Beauty Marketplace",
    businessUnit: "All Business Units",
    salesChannel: "All Channels",
    region: "Sri Lanka",
    currency: "LKR",
    dateRange: "Last 30 Days",
  });

  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);
  const [selectedApprovalStage, setSelectedApprovalStage] = useState<string | null>(null);

  // Modals & Drawers
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isQuickQueryOpen, setIsQuickQueryOpen] = useState(false);
  const [isDataCheckOpen, setIsDataCheckOpen] = useState(false);

  // Export CSV handler
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Label,Value,Trend\n" +
      INITIAL_KPIS.map((kpi) => `${kpi.id},"${kpi.label}","${kpi.value}","${kpi.trend}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `catalogue_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Catalogue report exported successfully as CSV.");
  };

  const handleFilterChange = (updated: Partial<BusinessContextFilter>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    toast.success("Business context updated.");
  };

  const handleResetFilters = () => {
    setFilters({
      tenant: "SL Beauty",
      ecosystem: "Beauty Marketplace",
      businessUnit: "All Business Units",
      salesChannel: "All Channels",
      region: "Sri Lanka",
      currency: "LKR",
      dateRange: "Last 30 Days",
    });
    setActiveKpiFilter(null);
    setSelectedApprovalStage(null);
    toast.success("Filters reset to default.");
  };

  const handleKpiClick = (filterKey: string) => {
    setActiveKpiFilter((prev) => (prev === filterKey ? null : filterKey));
    toast(`Applied quick filter: ${filterKey}`, { icon: "🔍" });
  };

  const handleOpenApproval = (item: ProductApprovalItem) => {
    toast.success(`Opening approval workspace for ${item.submissionId}`);
  };

  const handleViewAudit = (item: RecentActivityItem) => {
    toast.success(`Opening audit record for ${item.productRecord}`);
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8fafc]">
      {/* 1. Header */}
      <CatalogueHeader
        onExport={handleExportCSV}
        onImportClick={() => setIsImportModalOpen(true)}
        onSettingsClick={() => toast("Navigating to Catalogue Settings", { icon: "⚙️" })}
        onCreateClick={() => toast.success("Opening Product Master Creator")}
      />

      {/* 2. Business Context Filter Bar */}
      <CatalogueContextFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Main Container */}
      <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1920px] mx-auto w-full">
        {/* 3. Primary KPI Cards */}
        <CatalogueKpiGrid
          kpis={INITIAL_KPIS}
          activeFilter={activeKpiFilter}
          onKpiClick={handleKpiClick}
        />

        {/* 2 Column Layout: Main Content (Left) & Insight Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Main Left Column */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Growth & Composition Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CatalogueGrowthChart />
              <CatalogueComposition />
            </div>

            {/* Health Scorecard */}
            <CatalogueHealthScorecard />

            {/* Approval Pipeline + Priority Approvals Table */}
            <div className="flex flex-col gap-4">
              <ApprovalWorkflow
                selectedStage={selectedApprovalStage}
                onSelectStage={setSelectedApprovalStage}
              />
              <PriorityProductApprovals
                selectedStageFilter={selectedApprovalStage}
                onOpenApproval={handleOpenApproval}
              />
            </div>

            {/* Quality & Readiness */}
            <CatalogueQualityReadiness
              onIssueClick={(title) => toast(`Filtering by issue: ${title}`, { icon: "⚠️" })}
            />

            {/* Inventory & Expiry Operations */}
            <InventoryExpiryOperations />

            {/* Recent Catalogue Activity */}
            <RecentCatalogueActivity onViewAudit={handleViewAudit} />
          </div>

          {/* Right Catalogue Health Sidebar */}
          <div className="sticky top-4">
            <CatalogueInsightSidebar
              onQueueClick={handleKpiClick}
              onAlertClick={(alertTitle) => toast(`Viewing alert: ${alertTitle}`, { icon: "🚨" })}
            />
          </div>
        </div>
      </div>

      {/* Floating Bottom-Right Utility Actions */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsDataCheckOpen(true)}
          className="h-9 px-3.5 rounded-full bg-white border border-gray-300 text-gray-800 text-[11.5px] font-bold shadow-lg hover:bg-gray-50 transition-all flex items-center gap-1.5"
          title="Run Catalogue Data Integrity Scan"
        >
          <FileCheck size={15} className="text-[#741d35]" />
          <span>Data Check</span>
        </button>

        <button
          onClick={() => setIsQuickQueryOpen(true)}
          className="h-9 px-3.5 rounded-full bg-[#741d35] text-white text-[11.5px] font-bold shadow-lg hover:bg-[#5c172a] transition-all flex items-center gap-1.5"
          title="Open Quick Query Console"
        >
          <Search size={15} />
          <span>Quick Query</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ImportCatalogueModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <QuickQueryDrawer
        isOpen={isQuickQueryOpen}
        onClose={() => setIsQuickQueryOpen(false)}
      />

      <DataCheckModal
        isOpen={isDataCheckOpen}
        onClose={() => setIsDataCheckOpen(false)}
      />
    </div>
  );
}
