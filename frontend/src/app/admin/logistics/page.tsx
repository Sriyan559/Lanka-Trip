"use client";

import React, { Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { LogisticsMetricsRow } from "@/components/admin/logistics/LogisticsMetricsRow";
import { LogisticsFilterPanel } from "@/components/admin/logistics/LogisticsFilterPanel";
import { ShipmentTable } from "@/components/admin/logistics/ShipmentTable";
import { LogisticsSidebars } from "@/components/admin/logistics/LogisticsSidebars";
import { CreateShipmentModal } from "@/components/admin/logistics/CreateShipmentModal";
import { EditShipmentModal } from "@/components/admin/logistics/EditShipmentModal";
import { DeleteShipmentModal } from "@/components/admin/logistics/DeleteShipmentModal";
import { useLogisticsDashboard } from "@/hooks/admin/useLogisticsDashboard";

function LogisticsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<any | null>(null);
  const [deletingShipment, setDeletingShipment] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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

  const liveMetrics = dashboard ? {
    totalActiveShipments: dashboard.total_shipments,
    pendingCarrierAssignment: dashboard.quick_queue?.unassigned_carrier,
    pickupScheduled: dashboard.quick_queue?.pending_dispatch,
    awaitingPickup: dashboard.quick_queue?.pending_dispatch,
    pickedUpToday: dashboard.dispatched_today,
    inTransit: dashboard.dispatched_today,
    outForDelivery: dashboard.out_for_delivery,
    deliveredToday: dashboard.delivered_count,
    deliveryExceptions: dashboard.failed_count,
    failedDeliveries: dashboard.failed_count,
    returnShipments: 0,
    slaBreaches: 0,
    codPendingRemittance: 0,
    logisticsCostToday: 0,
  } : undefined;

  return (
    <div className="space-y-6 max-w-[1920px] mx-auto pb-10">
      <PageHeader
        crumbs={["Logistics", "Shipment Operations"]}
        title="Logistics & Fulfilment Operations"
        description="Monitor shipment status, supplier pickup readiness, package preparation, carrier assignment, dispatch, tracking, delivery exceptions, and reverse logistics."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button 
              type="button" 
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-primary-900 text-white text-[13px] font-semibold rounded-lg hover:bg-primary-800 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Plus size={16} />
              Create Shipment
            </button>
            <button 
              type="button" 
              onClick={() => refresh()}
              className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm"
            >
              Refresh Operations Data
            </button>
          </div>
        }
      />

      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm flex items-center justify-between animate-in fade-in duration-200">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-6">
        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-w-0 space-y-6">
          <LogisticsMetricsRow metrics={liveMetrics} />
          
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
          carrierPerformance={dashboard?.carrier_distribution}
        />
      </div>

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
