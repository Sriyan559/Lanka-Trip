"use client";

import React, { Suspense, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Modular LG04 Warehouse Management Components
import { WarehousePageHeader } from "@/components/admin/logistics/warehouse/WarehousePageHeader";
import { WarehouseContextBar } from "@/components/admin/logistics/warehouse/WarehouseContextBar";
import { WarehouseKpiGrid, WarehouseUtilizationStrip } from "@/components/admin/logistics/warehouse/WarehouseKpiGrid";
import { WarehouseNavigationTabs } from "@/components/admin/logistics/warehouse/WarehouseNavigationTabs";
import { WarehouseAnalytics } from "@/components/admin/logistics/warehouse/WarehouseAnalytics";
import { WarehouseAdvancedFilters } from "@/components/admin/logistics/warehouse/WarehouseAdvancedFilters";
import { WarehousePortfolioTable } from "@/components/admin/logistics/warehouse/WarehousePortfolioTable";
import { SelectedWarehousePreview } from "@/components/admin/logistics/warehouse/SelectedWarehousePreview";
import { WarehouseIntelligenceSidebar } from "@/components/admin/logistics/warehouse/WarehouseIntelligenceSidebar";
import { useWarehouses } from "@/hooks/admin/useFulfilmentWarehouse";

function WarehousesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedFacility, setSelectedFacility] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const currentFilters = {
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "all",
    status: searchParams.get("status") || "all",
  };
  const { data, loading, error, refresh } = useWarehouses(currentFilters);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const updateFilters = useCallback(
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

      router.push(`/admin/logistics/warehouses?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  const handleClearFilters = () => {
    router.push("/admin/logistics/warehouses");
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. BREADCRUMB, HEADING & TOP ACTION TOOLBAR */}
          <WarehousePageHeader
            onAddWarehouseClick={() => alert("Opening Add Warehouse Modal...")}
          />

          {/* 2. BUSINESS CONTEXT & SERVICE HEALTH STRIP */}
          <WarehouseContextBar onRefresh={refresh} />

          {notification && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
            </div>
          )}

          {/* 3. PRIMARY FACILITY KPI ROW (11 CARDS IN 1 ROW) */}
          <WarehouseKpiGrid metrics={data?.kpis} />

          {/* 4. CAPACITY & OPERATIONS UTILIZATION METRICS STRIP (6 METRICS IN 1 ROW) */}
          <WarehouseUtilizationStrip />

          {/* 5. OPERATIONAL NAVIGATION TABS (17 TABS) */}
          <WarehouseNavigationTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 6. MAIN ANALYTICS (4 PANELS IN 1 ROW AT DESKTOP) */}
          <WarehouseAnalytics loading={loading} error={error} onRetry={refresh} typeDistribution={data?.type_distribution} statusSummary={data?.status_summary} />

          {/* 7. ADVANCED FILTER SYSTEM */}
          <WarehouseAdvancedFilters
            filters={currentFilters}
            onFilterChange={updateFilters}
            onClearFilters={handleClearFilters}
            onRefresh={refresh}
            recordCount={data?.facilities?.total ?? 0}
          />

          {/* 8. WAREHOUSE & FULFILMENT CENTRE PORTFOLIO TABLE */}
          <WarehousePortfolioTable
            facilities={data?.facilities?.data ?? []}
            meta={data?.facilities}
            selectedRef={selectedFacility?.ref}
            onSelectFacility={(fac) => setSelectedFacility(fac)}
          />

          {/* 9. SELECTED WAREHOUSE / FACILITY PREVIEW (20 TABS + 16 CARDS + TIMELINE + MATRIX) */}
          <SelectedWarehousePreview facility={selectedFacility} />
        </main>

        {/* 10. DEDICATED RIGHT-SIDE WAREHOUSE NETWORK INTELLIGENCE SIDEBAR */}
        <WarehouseIntelligenceSidebar />
      </div>
    </div>
  );
}

export default function WarehousesPage() {
  return (
    <Suspense fallback={<div className="p-6 font-semibold text-xs">Loading Warehouse &amp; Fulfilment Centre Management...</div>}>
      <WarehousesContent />
    </Suspense>
  );
}
