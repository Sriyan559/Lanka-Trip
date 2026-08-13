"use client";

import React, { Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Modular Logistics Command Center Components
import { LogisticsCommandHeader } from "@/components/admin/logistics/LogisticsCommandHeader";
import { LogisticsContextBar } from "@/components/admin/logistics/LogisticsContextBar";
import { LogisticsServiceHealthStrip } from "@/components/admin/logistics/LogisticsServiceHealthStrip";
import { LogisticsMetricsRow } from "@/components/admin/logistics/LogisticsMetricsRow";
import { LogisticsSecondaryMetricsStrip } from "@/components/admin/logistics/LogisticsSecondaryMetricsStrip";
import { LogisticsNavigationTabs } from "@/components/admin/logistics/LogisticsNavigationTabs";
import { LogisticsHealthScorecard } from "@/components/admin/logistics/LogisticsHealthScorecard";
import { LogisticsFilterPanel } from "@/components/admin/logistics/LogisticsFilterPanel";
import { LogisticsOperationsTable } from "@/components/admin/logistics/LogisticsOperationsTable";
import { LogisticsSidebars } from "@/components/admin/logistics/LogisticsSidebars";
import { LogisticsOperationPreviewSection } from "@/components/admin/logistics/LogisticsOperationPreviewSection";
import { LogisticsBottomSummaryCards } from "@/components/admin/logistics/LogisticsBottomSummaryCards";
import { CreateShipmentModal } from "@/components/admin/logistics/CreateShipmentModal";
import { EditShipmentModal } from "@/components/admin/logistics/EditShipmentModal";
import { DeleteShipmentModal } from "@/components/admin/logistics/DeleteShipmentModal";

// Shared Reusable Chart Visualization Components
import { ChartCard } from "@/components/admin/shared/ChartCard";
import { TrendChart } from "@/components/admin/shared/TrendChart";
import { DonutDistributionChart } from "@/components/admin/shared/DonutDistributionChart";
import { HorizontalStatusChart } from "@/components/admin/shared/HorizontalStatusChart";

// API & Dashboard Data Hook
import { useLogisticsDashboard } from "@/hooks/admin/useLogisticsDashboard";

function LogisticsContent() {
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

  const { dashboard, shipmentsData, loading, error, lastUpdated, refresh } = useLogisticsDashboard(apiFilters);

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

      router.push(`/admin/logistics?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  const handleClearAllFilters = () => {
    router.push("/admin/logistics");
  };

  // Extract Live API metrics or fall back gracefully
  const liveMetrics = dashboard
    ? {
        total_orders: dashboard.total_shipments,
        awaiting_allocation: dashboard.quick_queue?.unassigned_carrier,
        ready_for_dispatch: dashboard.quick_queue?.pending_dispatch,
        awaiting_carrier_pickup: dashboard.quick_queue?.pending_dispatch,
        shipments_in_transit: dashboard.dispatched_today,
        out_for_delivery: dashboard.out_for_delivery,
        delivered_this_period: dashboard.delivered_count,
        delayed_or_failed: dashboard.failed_count,
      }
    : undefined;

  // Real Database Chart Data Mapping
  const realTrendData = dashboard?.trend || [];
  const realStatusData = dashboard?.by_status?.map((item: any) => ({
    name: item.status?.replace("_", " ").toUpperCase(),
    value: Number(item.count) || 0,
    color: item.status === "delivered" ? "#10b981" : item.status === "failed" ? "#ef4444" : "#3b82f6",
  })) || [];

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. BREADCRUMB, HEADING & TOP ACTION TOOLBAR */}
          <LogisticsCommandHeader
            onRefresh={refresh}
            onCreateOperationClick={() => setIsCreateOpen(true)}
          />

          {/* 2. BUSINESS CONTEXT FILTER STRIP */}
          <LogisticsContextBar
            lastSynced={lastUpdated ? new Date(lastUpdated).toLocaleString() : "—"}
            onRefresh={refresh}
          />

          {/* 3. LOGISTICS SERVICE HEALTH STRIP */}
          <LogisticsServiceHealthStrip onRefresh={refresh} />

          {notification && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
            </div>
          )}

          {/* 4. PRIMARY KPI CARDS ROW (12 CARDS IN 1 ROW WITH SPARKLINES) */}
          <LogisticsMetricsRow metrics={liveMetrics} />

          {/* 5. SECONDARY LOGISTICS COST / CAPACITY SUMMARY STRIP */}
          <LogisticsSecondaryMetricsStrip
            logisticsCostToday={dashboard?.logisticsCostToday}
            carrierChargesPending={dashboard?.carrierChargesPending}
            codPendingRemittance={dashboard?.codPendingRemittance}
            warehouseCapacityUsed={dashboard?.warehouseCapacityUsed}
            carrierCapacityUsed={dashboard?.carrierCapacityUsed}
            podCompleteness={dashboard?.podCompleteness}
          />

          {/* 6. OPERATIONAL NAVIGATION TABS (19 TABS) */}
          <LogisticsNavigationTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 7. MAIN ANALYTICS ROW (3 PANELS IN 1 ROW: TREND, DONUT, BOTTLENECK) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <ChartCard
              title="Fulfilment & Delivery Trend (Last 30 Days)"
              subtitle="30-day operational volume trajectory across network"
              loading={loading}
              error={error}
              onRetry={refresh}
              className="min-h-[220px]"
            >
              <TrendChart
                data={realTrendData}
                colors={["#2563eb", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"]}
              />
            </ChartCard>

            <ChartCard
              title="Logistics Status Distribution"
              subtitle="Operational state breakdown"
              loading={loading}
              error={error}
              onRetry={refresh}
              className="min-h-[220px]"
            >
              <DonutDistributionChart
                data={realStatusData}
                totalLabel="Total Operations"
                totalValue={String(dashboard?.total_shipments ?? 0)}
              />
            </ChartCard>

            <ChartCard
              title="Operational Status Summary"
              subtitle="Health and resolution state breakdown"
              loading={loading}
              error={error}
              onRetry={refresh}
              className="min-h-[220px]"
            >
              <HorizontalStatusChart
                data={dashboard?.operational_summary ?? []}
                total={dashboard?.total_shipments ?? 0}
              />
            </ChartCard>
          </div>

          {/* 8. LOGISTICS & CUSTOMER HEALTH SCORECARD (THIN HORIZONTAL STRIP) */}
          <LogisticsHealthScorecard />

          {/* 9. ADVANCED FILTER SYSTEM */}
          <LogisticsFilterPanel
            filters={currentFilters}
            onFilterChange={updateUrlFilters}
            onClearFilters={handleClearAllFilters}
            onRefresh={refresh}
            onCreateClick={() => setIsCreateOpen(true)}
          />

          {/* 10. MAIN LOGISTICS OPERATIONS TABLE & PAGINATION */}
          {loading ? (
            <div className="bg-white rounded-xl border border-line shadow-xs p-6 animate-pulse space-y-4">
              <div className="h-8 bg-canvas rounded w-1/4" />
              <div className="h-64 bg-canvas rounded w-full" />
            </div>
          ) : (
            <LogisticsOperationsTable
              shipments={shipmentsData?.data || []}
              meta={{
                current_page: shipmentsData?.current_page || 1,
                per_page: shipmentsData?.per_page || 15,
                total: shipmentsData?.total ?? 0,
                last_page: shipmentsData?.last_page ?? 1,
              }}
              selectedRef={selectedOperation?.fulfilment_ref}
              onSelectOperation={(op) => setSelectedOperation(op)}
              onPageChange={(page) => updateUrlFilters({ page })}
              onEdit={(shipment) => setEditingShipment(shipment)}
              onDelete={(shipment) => setDeletingShipment(shipment)}
            />
          )}

          {/* 11. SELECTED LOGISTICS OPERATION PREVIEW & LIFECYCLE TIMELINE */}
          <LogisticsOperationPreviewSection operation={selectedOperation} />

          {/* 12. BOTTOM OPERATIONAL ANALYSIS CARDS & RECENT ACTIVITY */}
          <LogisticsBottomSummaryCards />
        </main>

        {/* 13. RIGHT-SIDE OPERATIONS HEALTH SIDEBAR */}
        <LogisticsSidebars
          operationsHealth={dashboard?.operations_health}
          priorityAlerts={dashboard?.priority_alerts}
          quickQueue={dashboard?.quick_queue}
          carrierPerformance={dashboard?.carrier_distribution}
        />
      </div>

      {/* CRUD MODALS */}
      <CreateShipmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => {
          refresh();
          showToast("Logistics operation record successfully created.");
        }}
      />

      <EditShipmentModal
        shipment={editingShipment}
        isOpen={Boolean(editingShipment)}
        onClose={() => setEditingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Logistics operation record successfully updated.");
        }}
      />

      <DeleteShipmentModal
        shipment={deletingShipment}
        isOpen={Boolean(deletingShipment)}
        onClose={() => setDeletingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Logistics operation record removed.");
        }}
      />
    </div>
  );
}

export default function LogisticsPage() {
  return (
    <Suspense fallback={<div className="p-6 font-semibold text-xs">Loading Logistics Command Center...</div>}>
      <LogisticsContent />
    </Suspense>
  );
}
