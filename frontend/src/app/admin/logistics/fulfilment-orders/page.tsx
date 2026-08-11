"use client";

import React, { Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Modular LG02 Fulfilment Order Management Components
import { FulfilmentPageHeader } from "@/components/admin/logistics/fulfilment/FulfilmentPageHeader";
import { FulfilmentContextBar } from "@/components/admin/logistics/fulfilment/FulfilmentContextBar";
import { FulfilmentServiceHealth } from "@/components/admin/logistics/fulfilment/FulfilmentServiceHealth";
import { FulfilmentKpiGrid } from "@/components/admin/logistics/fulfilment/FulfilmentKpiGrid";
import { FulfilmentEfficiencyStrip } from "@/components/admin/logistics/fulfilment/FulfilmentEfficiencyStrip";
import { FulfilmentWorkflowTabs } from "@/components/admin/logistics/fulfilment/FulfilmentWorkflowTabs";
import { FulfilmentAnalytics } from "@/components/admin/logistics/fulfilment/FulfilmentAnalytics";
import { FulfilmentScorecard } from "@/components/admin/logistics/fulfilment/FulfilmentScorecard";
import { FulfilmentAdvancedFilters } from "@/components/admin/logistics/fulfilment/FulfilmentAdvancedFilters";
import { FulfilmentPortfolioTable } from "@/components/admin/logistics/fulfilment/FulfilmentPortfolioTable";
import { FulfilmentIntelligenceSidebar } from "@/components/admin/logistics/fulfilment/FulfilmentIntelligenceSidebar";
import { SelectedFulfilmentPreview } from "@/components/admin/logistics/fulfilment/SelectedFulfilmentPreview";
import { FulfilmentOperationsSummary } from "@/components/admin/logistics/fulfilment/FulfilmentOperationsSummary";

// Modals
import { CreateShipmentModal } from "@/components/admin/logistics/CreateShipmentModal";
import { EditShipmentModal } from "@/components/admin/logistics/EditShipmentModal";
import { DeleteShipmentModal } from "@/components/admin/logistics/DeleteShipmentModal";

// Data Hook
import { useLogisticsDashboard } from "@/hooks/admin/useLogisticsDashboard";

function FulfilmentOrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<any | null>(null);
  const [editingShipment, setEditingShipment] = useState<any | null>(null);
  const [deletingShipment, setDeletingShipment] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const currentFilters = {
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "all",
    page: Number(searchParams.get("page")) || 1,
    per_page: Number(searchParams.get("per_page")) || 15,
  };

  const apiFilters = {
    search: currentFilters.search || undefined,
    status: currentFilters.status !== "all" ? currentFilters.status : undefined,
    page: currentFilters.page,
    per_page: currentFilters.per_page,
  };

  const { dashboard, shipmentsData, loading, error, refresh } = useLogisticsDashboard(apiFilters);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const updateUrlFilters = useCallback(
    (newFilters: Record<string, any>) => {
      const params = new URLSearchParams(searchParams.toString());
      const merged = { ...currentFilters, ...newFilters };

      Object.entries(merged).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`/admin/logistics/fulfilment-orders?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  const handleClearAllFilters = () => {
    router.push("/admin/logistics/fulfilment-orders");
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. BREADCRUMB, HEADING & TOP ACTION TOOLBAR */}
          <FulfilmentPageHeader
            onRefresh={refresh}
            onCreateClick={() => setIsCreateOpen(true)}
          />

          {/* 2. BUSINESS CONTEXT STRIP */}
          <FulfilmentContextBar
            lastSynced={dashboard?.lastSynced || "May 26 2025 10:15 AM"}
            onRefresh={refresh}
          />

          {/* 3. FULFILMENT SERVICE HEALTH STRIP */}
          <FulfilmentServiceHealth onRefresh={refresh} />

          {notification && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
            </div>
          )}

          {/* 4. PRIMARY KPI CARDS ROW (12 CARDS IN 1 ROW WITH SPARKLINES) */}
          <FulfilmentKpiGrid metrics={dashboard} />

          {/* 5. OPERATIONAL EFFICIENCY METRICS STRIP */}
          <FulfilmentEfficiencyStrip />

          {/* 6. FULFILMENT WORKFLOW TABS (20 TABS) */}
          <FulfilmentWorkflowTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 7. MAIN ANALYTICS SECTION (3 PANELS IN 1 ROW: TREND, DONUT, BOTTLENECK) */}
          <FulfilmentAnalytics
            loading={loading}
            error={error}
            onRetry={refresh}
            trendData={dashboard?.trend}
            donutData={dashboard?.by_status}
          />

          {/* 8. FULFILMENT PERFORMANCE SCORECARD */}
          <FulfilmentScorecard />

          {/* 9. ADVANCED FILTER SYSTEM */}
          <FulfilmentAdvancedFilters
            filters={currentFilters}
            onFilterChange={updateUrlFilters}
            onClearFilters={handleClearAllFilters}
            onRefresh={refresh}
            recordCount={shipmentsData?.total || 1248}
          />

          {/* 10. FULFILMENT ORDER PORTFOLIO TABLE & PAGINATION */}
          {loading ? (
            <div className="bg-white rounded-xl border border-line shadow-xs p-6 animate-pulse space-y-4">
              <div className="h-8 bg-canvas rounded w-1/4" />
              <div className="h-64 bg-canvas rounded w-full" />
            </div>
          ) : (
            <FulfilmentPortfolioTable
              fulfilments={shipmentsData?.data || []}
              meta={{
                current_page: shipmentsData?.current_page || 1,
                per_page: shipmentsData?.per_page || 15,
                total: shipmentsData?.total || 1248,
                last_page: shipmentsData?.last_page || 50,
              }}
              selectedRef={selectedOperation?.fulfilment_ref}
              onSelectOperation={(op) => setSelectedOperation(op)}
              onPageChange={(page) => updateUrlFilters({ page })}
              onEdit={(shipment) => setEditingShipment(shipment)}
              onDelete={(shipment) => setDeletingShipment(shipment)}
            />
          )}

          {/* 11. SELECTED FULFILMENT PREVIEW & 17-STAGE LIFECYCLE TIMELINE */}
          <SelectedFulfilmentPreview operation={selectedOperation} />

          {/* 12. BOTTOM OPERATIONAL SUMMARY CARDS & RECENT ACTIVITY */}
          <FulfilmentOperationsSummary />
        </main>

        {/* 13. RIGHT-SIDE FULFILMENT INTELLIGENCE SIDEBAR */}
        <FulfilmentIntelligenceSidebar />
      </div>

      {/* CRUD MODALS */}
      <CreateShipmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => {
          refresh();
          showToast("Fulfilment order record successfully created.");
        }}
      />

      <EditShipmentModal
        shipment={editingShipment}
        isOpen={Boolean(editingShipment)}
        onClose={() => setEditingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Fulfilment order record successfully updated.");
        }}
      />

      <DeleteShipmentModal
        shipment={deletingShipment}
        isOpen={Boolean(deletingShipment)}
        onClose={() => setDeletingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Fulfilment order record removed.");
        }}
      />
    </div>
  );
}

export default function FulfilmentOrdersPage() {
  return (
    <Suspense fallback={<div className="p-6 font-semibold text-xs">Loading Fulfilment Order Management...</div>}>
      <FulfilmentOrdersContent />
    </Suspense>
  );
}
