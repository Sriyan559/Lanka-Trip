"use client";

import React, { Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Modular LG07 Shipment Management Components
import { ShipmentPageHeader } from "@/components/admin/logistics/shipments/ShipmentPageHeader";
import { ShipmentContextBar } from "@/components/admin/logistics/shipments/ShipmentContextBar";
import { ShipmentServiceHealthStrip } from "@/components/admin/logistics/shipments/ShipmentServiceHealthStrip";
import { ShipmentKpiGrid } from "@/components/admin/logistics/shipments/ShipmentKpiGrid";
import { ShipmentWorkflowTabs } from "@/components/admin/logistics/shipments/ShipmentWorkflowTabs";
import { ShipmentAnalytics } from "@/components/admin/logistics/shipments/ShipmentAnalytics";
import { ShipmentHealthScorecard } from "@/components/admin/logistics/shipments/ShipmentHealthScorecard";
import { ShipmentAdvancedFilters } from "@/components/admin/logistics/shipments/ShipmentAdvancedFilters";
import { ShipmentPortfolioTable } from "@/components/admin/logistics/shipments/ShipmentPortfolioTable";
import { SelectedShipmentPreview } from "@/components/admin/logistics/shipments/SelectedShipmentPreview";
import { ShipmentIntelligenceSidebar } from "@/components/admin/logistics/shipments/ShipmentIntelligenceSidebar";
import { LogisticsBottomSummaryCards } from "@/components/admin/logistics/LogisticsBottomSummaryCards";

// Modals
import { CreateShipmentModal } from "@/components/admin/logistics/CreateShipmentModal";
import { EditShipmentModal } from "@/components/admin/logistics/EditShipmentModal";
import { DeleteShipmentModal } from "@/components/admin/logistics/DeleteShipmentModal";

// Data Hook
import { useLogisticsDashboard } from "@/hooks/admin/useLogisticsDashboard";

function ShipmentManagementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<any | null>(null);
  const [editingShipment, setEditingShipment] = useState<any | null>(null);
  const [deletingShipment, setDeletingShipment] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const currentFilters = {
    search: searchParams?.get("search") || "",
    status: searchParams?.get("status") || "all",
    page: Number(searchParams?.get("page")) || 1,
    per_page: Number(searchParams?.get("per_page")) || 15,
  };

  const apiFilters = {
    search: currentFilters.search || undefined,
    status: currentFilters.status !== "all" ? currentFilters.status : undefined,
    page: currentFilters.page,
    per_page: currentFilters.per_page,
  };

  const { dashboard, shipmentsData, loading, error, lastUpdated, refresh } = useLogisticsDashboard(apiFilters);

  React.useEffect(() => {
    if (searchParams?.get("open") !== "first" || !shipmentsData?.data) return;
    const firstShipment = shipmentsData.data[0];
    if (firstShipment?.shipment_number) {
      router.replace(`/admin/logistics/shipments/${encodeURIComponent(firstShipment.shipment_number)}`);
    }
  }, [router, searchParams, shipmentsData]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const updateUrlFilters = useCallback(
    (newFilters: Record<string, any>) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      const merged = { ...currentFilters, ...newFilters };

      Object.entries(merged).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      router.push(`/admin/logistics/shipments?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  const handleClearAllFilters = () => {
    router.push("/admin/logistics/shipments");
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. BREADCRUMB, HEADING & TOP ACTION TOOLBAR */}
          <ShipmentPageHeader
            onRefresh={refresh}
            onCreateClick={() => setIsCreateOpen(true)}
          />

          {/* 2. BUSINESS CONTEXT STRIP */}
          <ShipmentContextBar
            lastSynced={lastUpdated ? new Date(lastUpdated).toLocaleString() : "—"}
            onRefresh={refresh}
          />

          {/* 3. SHIPMENT SERVICE HEALTH STRIP */}
          <ShipmentServiceHealthStrip onRefresh={refresh} />

          {notification && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
            </div>
          )}

          {/* 4. PRIMARY KPI CARDS ROW (16 CARDS IN 1 ROW WITH SPARKLINES) */}
          <ShipmentKpiGrid metrics={dashboard} />

          {/* 5. OPERATIONAL SHIPMENT NAVIGATION TABS (22 TABS) */}
          <ShipmentWorkflowTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 6. MAIN ANALYTICS ROW (3 PANELS IN 1 ROW: TREND, DONUT, EXCEPTIONS) */}
          <ShipmentAnalytics
            loading={loading}
            error={error}
            onRetry={refresh}
            trendData={dashboard?.trend}
            donutData={dashboard?.by_status}
          />

          {/* 7. SHIPMENT OPERATIONS HEALTH SCORECARD */}
          <ShipmentHealthScorecard />

          {/* 8. ADVANCED FILTER SYSTEM */}
          <ShipmentAdvancedFilters
            filters={currentFilters}
            onFilterChange={updateUrlFilters}
            onClearFilters={handleClearAllFilters}
            onRefresh={refresh}
            recordCount={shipmentsData?.total ?? 0}
          />

          {/* 9. SHIPMENT MANAGEMENT PORTFOLIO TABLE & PAGINATION */}
          {loading ? (
            <div className="bg-white rounded-xl border border-line shadow-xs p-6 animate-pulse space-y-4">
              <div className="h-8 bg-canvas rounded w-1/4" />
              <div className="h-64 bg-canvas rounded w-full" />
            </div>
          ) : (
            <ShipmentPortfolioTable
              shipments={shipmentsData?.data || []}
              meta={{
                current_page: shipmentsData?.current_page || 1,
                per_page: shipmentsData?.per_page || 15,
                total: shipmentsData?.total ?? 0,
                last_page: shipmentsData?.last_page ?? 1,
              }}
              selectedRef={selectedOperation?.shipment_ref}
              onSelectOperation={(op) => setSelectedOperation(op)}
              onPageChange={(page) => updateUrlFilters({ page })}
              onEdit={(shipment) => setEditingShipment(shipment)}
              onDelete={(shipment) => setDeletingShipment(shipment)}
            />
          )}

          {/* 10. SELECTED SHIPMENT PREVIEW & 20-STAGE LIFECYCLE TIMELINE */}
          <SelectedShipmentPreview operation={selectedOperation} />

          {/* 11. BOTTOM OPERATIONAL SUMMARY CARDS & RECENT ACTIVITY */}
          <LogisticsBottomSummaryCards />
        </main>

        {/* 12. RIGHT-SIDE SHIPMENT INTELLIGENCE SIDEBAR */}
        <ShipmentIntelligenceSidebar />
      </div>

      {/* CRUD MODALS */}
      <CreateShipmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => {
          refresh();
          showToast("Shipment record successfully created.");
        }}
      />

      <EditShipmentModal
        shipment={editingShipment}
        isOpen={Boolean(editingShipment)}
        onClose={() => setEditingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Shipment record successfully updated.");
        }}
      />

      <DeleteShipmentModal
        shipment={deletingShipment}
        isOpen={Boolean(deletingShipment)}
        onClose={() => setDeletingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Shipment record removed.");
        }}
      />
    </div>
  );
}

export default function ShipmentManagementPage() {
  return (
    <Suspense fallback={<div className="p-6 font-semibold text-xs">Loading Shipment Management...</div>}>
      <ShipmentManagementContent />
    </Suspense>
  );
}
