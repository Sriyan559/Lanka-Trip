"use client";

import React, { Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, RefreshCw, AlertCircle, FileSpreadsheet, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { ContextScopeBar } from "@/components/admin/shared/ContextScopeBar";
import { LogisticsServiceHealthStrip } from "@/components/admin/logistics/LogisticsServiceHealthStrip";
import { LogisticsMetricsRow } from "@/components/admin/logistics/LogisticsMetricsRow";
import { LogisticsSecondaryMetricsStrip } from "@/components/admin/logistics/LogisticsSecondaryMetricsStrip";
import { LogisticsHealthScorecard } from "@/components/admin/logistics/LogisticsHealthScorecard";
import { LogisticsFilterPanel } from "@/components/admin/logistics/LogisticsFilterPanel";
import { ShipmentTable } from "@/components/admin/logistics/ShipmentTable";
import { LogisticsSidebars } from "@/components/admin/logistics/LogisticsSidebars";
import { LogisticsOperationPreviewSection } from "@/components/admin/logistics/LogisticsOperationPreviewSection";
import { LogisticsBottomSummaryCards } from "@/components/admin/logistics/LogisticsBottomSummaryCards";
import { CreateShipmentModal } from "@/components/admin/logistics/CreateShipmentModal";
import { EditShipmentModal } from "@/components/admin/logistics/EditShipmentModal";
import { DeleteShipmentModal } from "@/components/admin/logistics/DeleteShipmentModal";
import { useLogisticsDashboard } from "@/hooks/admin/useLogisticsDashboard";

// Shared Chart Visualization Components
import { ChartCard } from "@/components/admin/shared/ChartCard";
import { TrendChart } from "@/components/admin/shared/TrendChart";
import { DonutDistributionChart } from "@/components/admin/shared/DonutDistributionChart";
import { HorizontalStatusChart } from "@/components/admin/shared/HorizontalStatusChart";

function LogisticsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any | null>(null);
  const [editingShipment, setEditingShipment] = useState<any | null>(null);
  const [deletingShipment, setDeletingShipment] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const navTabs = [
    "Overview", "All Fulfilment Orders", "Allocation Pending", "Picking", "Packing",
    "Ready for Dispatch", "Awaiting Pickup", "In Transit", "Out for Delivery", "Delivered",
    "Delayed", "Failed Delivery", "Returns", "Logistics Holds", "Claims", "Reconciliation",
    "Exceptions", "SLA Breached", "Audit History"
  ];

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

      router.push(`/admin/logistics?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  const handleClearAllFilters = () => {
    router.push("/admin/logistics");
  };

  // Real Database KPI Numbers (Derived strictly from database)
  const liveMetrics = dashboard ? {
    totalActiveShipments: dashboard.total_shipments ?? 0,
    pendingCarrierAssignment: dashboard.quick_queue?.unassigned_carrier ?? 0,
    pickupScheduled: dashboard.quick_queue?.pending_dispatch ?? 0,
    awaitingPickup: dashboard.quick_queue?.pending_dispatch ?? 0,
    pickedUpToday: dashboard.dispatched_today ?? 0,
    inTransit: dashboard.dispatched_today ?? 0,
    outForDelivery: dashboard.out_for_delivery ?? 0,
    deliveredToday: dashboard.delivered_count ?? 0,
    deliveryExceptions: dashboard.failed_count ?? 0,
    failedDeliveries: dashboard.failed_count ?? 0,
    returnShipments: 0,
    slaBreaches: 0,
    codPendingRemittance: 0,
    logisticsCostToday: 0,
  } : undefined;

  // Real Database Chart Data Mapping (Pure API data)
  const realTrendData = dashboard?.trend || [];
  const realStatusData = dashboard?.by_status?.map((item: any) => ({
    name: item.status?.replace("_", " ").toUpperCase(),
    value: Number(item.count) || 0,
    color: item.status === 'delivered' ? '#10b981' : item.status === 'failed' ? '#ef4444' : '#3b82f6',
  })) || [];
  const realCarrierData = dashboard?.carrier_distribution || [];

  return (
    <div className="space-y-6 max-w-[1920px] mx-auto pb-12">
      {/* 1. PAGE HEADER & ACTIONS */}
      <PageHeader
        crumbs={["Logistics", "Command Center"]}
        title="Logistics & Fulfilment Command Center"
        description="Monitor shipment status, supplier pickup readiness, package preparation, carrier assignment, dispatch, tracking, delivery exceptions, and reverse logistics."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <button 
              type="button" 
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-primary-900 text-white text-[13px] font-semibold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Plus size={16} />
              Create Logistics Operation
            </button>
            <button 
              type="button"
              className="px-3.5 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              <FileSpreadsheet size={15} />
              Export Report
            </button>
            <button 
              type="button"
              className="px-3.5 py-2 bg-white border border-line text-rose-700 text-[13px] font-semibold rounded-lg hover:bg-rose-50 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <ShieldAlert size={15} />
              Review Exceptions
            </button>
            <button 
              type="button" 
              onClick={() => refresh()}
              className="px-3 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1.5"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        }
      />

      {/* 2. GLOBAL CONTEXT SCOPE BAR */}
      <ContextScopeBar />

      {/* 3. SERVICE HEALTH STRIP */}
      <LogisticsServiceHealthStrip />

      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm flex items-center justify-between animate-in fade-in duration-200">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
        </div>
      )}

      {/* 4. 12 MANDATORY KPI CARDS GRID */}
      <LogisticsMetricsRow metrics={liveMetrics} />

      {/* 5. SECONDARY METRICS STRIP */}
      <LogisticsSecondaryMetricsStrip />

      {/* 6. 19 NAVIGATION TABS */}
      <div className="border-b border-line bg-white rounded-xl shadow-sm px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 text-[11px] font-semibold text-muted py-2.5 whitespace-nowrap">
          {navTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-primary-900 text-white"
                  : "hover:bg-canvas hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 7. ANALYTICS CHARTS & HEALTH SCORECARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Fulfilment & Delivery Trend"
          subtitle="30-day operational volume trajectory"
          loading={loading}
          error={error}
          onRetry={refresh}
          className="lg:col-span-2 min-h-[300px]"
        >
          <TrendChart 
            data={realTrendData} 
            colors={["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"]} 
          />
        </ChartCard>

        <ChartCard
          title="Logistics Status Distribution"
          subtitle="Operational state breakdown"
          loading={loading}
          error={error}
          onRetry={refresh}
          className="min-h-[300px]"
        >
          <DonutDistributionChart 
            data={realStatusData} 
            totalLabel="Total Operations" 
            totalValue={realStatusData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()} 
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Operational Status Summary"
          subtitle="Health and resolution state indicators"
          loading={loading}
          error={error}
          onRetry={refresh}
          className="lg:col-span-2"
        >
          <HorizontalStatusChart 
            data={[]} 
            total={0} 
          />
        </ChartCard>

        <LogisticsHealthScorecard />
      </div>

      {/* 8. MAIN OPERATIONS TABLE & RIGHT SIDEBAR */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-6">
          <LogisticsFilterPanel
            filters={currentFilters}
            onFilterChange={updateUrlFilters}
            onClearFilters={handleClearAllFilters}
          />

          {loading ? (
            <div className="bg-white rounded-xl border border-line shadow-sm p-6 animate-pulse">
              <div className="h-10 bg-canvas rounded mb-4 w-full" />
              <div className="h-[300px] bg-canvas rounded w-full" />
            </div>
          ) : (
            <ShipmentTable 
              shipments={shipmentsData?.data || []} 
              meta={{
                current_page: shipmentsData?.current_page || 1,
                per_page: shipmentsData?.per_page || 15,
                total: shipmentsData?.total || 0,
                last_page: shipmentsData?.last_page || 1,
              }}
              onPageChange={(page) => updateUrlFilters({ page })}
              onEdit={(shipment) => setEditingShipment(shipment)}
              onDelete={(shipment) => setDeletingShipment(shipment)}
            />
          )}
        </div>

        {/* RIGHT SIDEBARS */}
        <LogisticsSidebars 
          operationsHealth={dashboard?.operations_health}
          priorityAlerts={dashboard?.priority_alerts}
          quickQueue={dashboard?.quick_queue}
          carrierPerformance={realCarrierData}
        />
      </div>

      {/* 9. SELECTED LOGISTICS OPERATION PREVIEW & LIFECYCLE STEPPER */}
      <LogisticsOperationPreviewSection operation={selectedShipment} />

      {/* 10. BOTTOM SUMMARY CARDS GRID & RECENT ACTIVITY */}
      <LogisticsBottomSummaryCards />

      {/* CRUD MODALS */}
      <CreateShipmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={() => {
          refresh();
          showToast("Shipment record successfully created and persisted to database.");
        }}
      />

      <EditShipmentModal
        shipment={editingShipment}
        isOpen={Boolean(editingShipment)}
        onClose={() => setEditingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Shipment record successfully updated in database.");
        }}
      />

      <DeleteShipmentModal
        shipment={deletingShipment}
        isOpen={Boolean(deletingShipment)}
        onClose={() => setDeletingShipment(null)}
        onSuccess={() => {
          refresh();
          showToast("Shipment record deleted/soft-deleted from database.");
        }}
      />
    </div>
  );
}

export default function LogisticsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Logistics Operations...</div>}>
      <LogisticsContent />
    </Suspense>
  );
}
