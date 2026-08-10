"use client";

import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BusinessContextFilter, ProductApprovalItem, RecentActivityItem } from "@/types/catalogue";
import { useRouter } from "next/navigation";
import { useCatalogueCommandCenter } from "@/hooks/useCatalogueCommandCenter";
import { exportCatalogueCommandCenter } from "@/services/api/catalogueCommandCenter";
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
import { QuickQueryDrawer } from "./components/QuickQueryDrawer";
import { DataCheckModal } from "./components/DataCheckModal";
import { ImportCatalogueModal } from "./components/ImportCatalogueModal";
import { FileCheck, Search } from "lucide-react";

export function CatalogueCommandCenterDashboard() {
  const router = useRouter();
  const [filters, setFilters] = useState<BusinessContextFilter>({
    tenant: "Platform catalogue",
    ecosystem: "All ecosystems",
    businessUnit: "All business units",
    salesChannel: "All channels",
    region: "All regions",
    currency: "",
    dateRange: "Last 30 Days",
  });

  const [activeKpiFilter, setActiveKpiFilter] = useState<string | null>(null);
  const [selectedApprovalStage, setSelectedApprovalStage] = useState<string | null>(null);

  const dates = useMemo(() => {
    const days = filters.dateRange === "Last 7 Days" ? 7 : filters.dateRange === "Last 90 Days" ? 90 : 30;
    const to = new Date(); const from = new Date(); from.setDate(to.getDate() - days + 1);
    return { dateFrom: from.toISOString().slice(0, 10), dateTo: to.toISOString().slice(0, 10) };
  }, [filters.dateRange]);
  const { data, error, loading, refreshing, refresh } = useCatalogueCommandCenter(dates);

  const [isQuickQueryOpen, setIsQuickQueryOpen] = useState(false);
  const [isDataCheckOpen, setIsDataCheckOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleExportCSV = async () => { try { await exportCatalogueCommandCenter(dates); toast.success("Catalogue report exported successfully."); } catch { toast.error("Unable to export catalogue report."); } };

  const handleFilterChange = (updated: Partial<BusinessContextFilter>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    toast.success("Business context updated.");
  };

  const handleResetFilters = () => {
    setFilters(data?.context.defaults ?? { tenant: "Platform catalogue", ecosystem: "All ecosystems", businessUnit: "All business units", salesChannel: "All channels", region: "All regions", currency: "", dateRange: "Last 30 Days" });
    setActiveKpiFilter(null);
    setSelectedApprovalStage(null);
    toast.success("Filters reset to default.");
  };

  const handleKpiClick = (filterKey: string) => {
    setActiveKpiFilter((prev) => (prev === filterKey ? null : filterKey));
    const inventory = ["available-inventory", "low-stock", "near-expiry", "recalled"].includes(filterKey);
    const quality = ["incomplete", "duplicate", "missing-media", "compliance"].includes(filterKey);
    router.push(`${inventory ? "/admin/catalogue/inventory" : quality ? "/admin/catalogue/quality" : "/admin/catalogue/products"}?filter=${encodeURIComponent(filterKey)}`);
  };

  const handleOpenApproval = (item: ProductApprovalItem) => {
    router.push(`/admin/catalogue/product-approvals/${item.id}`);
  };

  const handleViewAudit = (item: RecentActivityItem) => {
    router.push(`/admin/activity-logs?record=${encodeURIComponent(item.id)}`);
  };

  if (loading && !data) return <div className="min-h-screen bg-[#f8fafc] p-6" role="status"><div className="h-24 bg-white border border-gray-200 animate-pulse rounded mb-4" /><div className="grid grid-cols-6 gap-3">{Array.from({length:12}).map((_,i)=><div key={i} className="h-28 bg-white border border-gray-200 animate-pulse rounded" />)}</div></div>;
  if (error && !data) return <div className="min-h-screen bg-[#f8fafc] p-6"><CatalogueHeader onExport={()=>{}} onImportClick={()=>router.push('/admin/catalogue/import-export')} onSettingsClick={()=>router.push('/admin/catalogue/attributes')} onCreateClick={()=>router.push('/admin/catalogue/products/create')} /><div className="mt-6 bg-white border border-rose-200 rounded p-6 text-sm text-rose-700">Unable to load catalogue metrics. <button className="underline font-bold" onClick={()=>void refresh()}>Retry</button></div></div>;
  if (!data) return null;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8fafc]">
      {/* 1. Header */}
      <CatalogueHeader
        onExport={handleExportCSV}
        onImportClick={() => setIsImportModalOpen(true)}
        onSettingsClick={() => router.push("/admin/catalogue/attributes")}
        onCreateClick={() => router.push("/admin/catalogue/products/create")}
      />

      {/* 2. Business Context Filter Bar */}
      <CatalogueContextFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        options={data.context.options}
        unsupportedFilters={data.context.unsupportedFilters}
        lastUpdated={data.meta.generatedAt}
        isRefreshing={refreshing}
        onRefresh={() => void refresh()}
      />

      {/* Main Container */}
      <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1920px] mx-auto w-full">
        {/* 3. Primary KPI Cards */}
        <CatalogueKpiGrid
          kpis={data.kpis}
          activeFilter={activeKpiFilter}
          onKpiClick={handleKpiClick}
        />

        {/* 2 Column Layout: Main Content (Left) & Insight Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Main Left Column */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Growth & Composition Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CatalogueGrowthChart initialData={data.trend} query={dates} />
              <CatalogueComposition initialData={data.composition} />
            </div>

            {/* Health Scorecard */}
            <CatalogueHealthScorecard items={data.healthScorecard} />

            {/* Approval Pipeline + Priority Approvals Table */}
            <div className="flex flex-col gap-4">
              <ApprovalWorkflow
                selectedStage={selectedApprovalStage}
                onSelectStage={setSelectedApprovalStage}
                stages={data.approvalPipeline}
              />
              <PriorityProductApprovals
                selectedStageFilter={selectedApprovalStage}
                onOpenApproval={handleOpenApproval}
                initialData={data.priorityApprovals}
              />
            </div>

            {/* Quality & Readiness */}
            <CatalogueQualityReadiness
              onIssueClick={(title) => router.push(`/admin/catalogue/quality?search=${encodeURIComponent(title)}`)}
              data={data.quality}
            />

            {/* Inventory & Expiry Operations */}
            <InventoryExpiryOperations data={data.inventory} />

            {/* Recent Catalogue Activity */}
            <RecentCatalogueActivity activities={data.recentActivity} onViewAudit={handleViewAudit} />
          </div>

          {/* Right Catalogue Health Sidebar */}
          <div className="sticky top-4">
            <CatalogueInsightSidebar
              onQueueClick={handleKpiClick}
              onAlertClick={(alertTitle) => toast(`Viewing alert: ${alertTitle}`, { icon: "🚨" })}
              data={{ health: data.health, alerts: data.alerts, approvalStatusSummary: data.approvalStatusSummary, slaSummary: data.slaSummary, inventoryRiskSummary: data.inventoryRiskSummary, quickQueues: data.quickQueues }}
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
      <QuickQueryDrawer
        isOpen={isQuickQueryOpen}
        onClose={() => setIsQuickQueryOpen(false)}
      />

      <DataCheckModal
        isOpen={isDataCheckOpen}
        onClose={() => setIsDataCheckOpen(false)}
        kpis={data.kpis}
        isScanning={refreshing}
        onRunCheck={() => void refresh()}
      />
      <ImportCatalogueModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImported={() => void refresh()} />
    </div>
  );
}
