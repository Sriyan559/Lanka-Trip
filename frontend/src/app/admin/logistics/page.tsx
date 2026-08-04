"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { LogisticsMetricsRow } from "@/features/admin/logistics/components/LogisticsMetricsRow";
import { LogisticsFilterPanel } from "@/features/admin/logistics/components/LogisticsFilterPanel";
import { ShipmentTable } from "@/features/admin/logistics/components/ShipmentTable";
import { LogisticsSidebars } from "@/features/admin/logistics/components/LogisticsSidebars";
import { 
  LogisticsMetrics, Shipment, OperationsHealth, PriorityAlert, QuickQueueItem, CarrierPerformance, CODFinancials 
} from "@/types/logistics";
import { 
  mockLogisticsMetrics, mockShipments, mockOperationsHealth, 
  mockPriorityAlerts, mockQuickQueue, mockCarrierPerformance, mockCODFinancials 
} from "@/mocks/admin/logistics.mock";

function LogisticsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [metrics] = useState<LogisticsMetrics>(mockLogisticsMetrics);
  const [shipments] = useState<Shipment[]>(mockShipments);
  const [operationsHealth] = useState<OperationsHealth>(mockOperationsHealth);
  const [priorityAlerts] = useState<PriorityAlert[]>(mockPriorityAlerts);
  const [quickQueue] = useState<QuickQueueItem[]>(mockQuickQueue);
  const [carrierPerformance] = useState<CarrierPerformance[]>(mockCarrierPerformance);
  const [codFinancials] = useState<CODFinancials>(mockCODFinancials);
  
  const [loading, setLoading] = useState(true);

  const currentFilters = {
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "all",
    page: Number(searchParams.get("page")) || 1,
  };

  const updateUrlFilters = useCallback(
    (newFilters: any) => {
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

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleClearAllFilters = () => {
    router.push("/admin/logistics");
  };

  return (
    <div className="space-y-6 max-w-[1920px] mx-auto pb-10">
      <PageHeader
        crumbs={["Logistics", "Shipment Operations"]}
        title="Logistics & Fulfilment Operations"
        description="Monitor shipment status, supplier pickup readiness, package preparation, carrier assignment, dispatch, tracking, delivery exceptions, and reverse logistics."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm">
              Create Shipment
            </button>
            <button type="button" className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm">
              Bulk Assign Carrier
            </button>
            <button type="button" className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm">
              Schedule Pickups
            </button>
            <button type="button" className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm">
              Export Shipment Report
            </button>
            <button type="button" className="px-4 py-2 bg-primary-900 text-white text-[13px] font-semibold rounded-lg hover:bg-primary-800 transition-colors shadow-sm">
              Review Priority Shipments
            </button>
            <button type="button" className="px-4 py-2 bg-white border border-line text-ink text-[13px] font-semibold rounded-lg hover:bg-canvas transition-colors shadow-sm flex items-center gap-1">
              More Actions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        }
      />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-w-0 space-y-6">
          <LogisticsMetricsRow metrics={metrics} />
          
          <LogisticsFilterPanel
            filters={currentFilters}
            onFilterChange={updateUrlFilters}
            onClearFilters={handleClearAllFilters}
          />

          {loading ? (
            <div className="bg-white rounded-xl border border-line shadow-sm p-6 animate-pulse">
              <div className="h-10 bg-canvas rounded mb-4 w-full" />
              <div className="h-[400px] bg-canvas rounded w-full" />
            </div>
          ) : (
            <ShipmentTable shipments={shipments} />
          )}
        </div>

        {/* RIGHT SIDEBARS */}
        <LogisticsSidebars 
          operationsHealth={operationsHealth}
          priorityAlerts={priorityAlerts}
          quickQueue={quickQueue}
          carrierPerformance={carrierPerformance}
          codFinancials={codFinancials}
        />
      </div>
    </div>
  );
}

export default function LogisticsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading Logistics Hub...</div>}>
      <LogisticsContent />
    </Suspense>
  );
}
