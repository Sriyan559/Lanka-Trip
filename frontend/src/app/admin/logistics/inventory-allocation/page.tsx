"use client";

import React, { Suspense, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Modular LG06 Inventory Allocation Components
import { AllocationPageHeader } from "@/components/admin/logistics/allocation/AllocationPageHeader";
import { AllocationContextBar } from "@/components/admin/logistics/allocation/AllocationContextBar";
import { AllocationKpiGrid } from "@/components/admin/logistics/allocation/AllocationKpiGrid";
import { AllocationWorkflowTabs } from "@/components/admin/logistics/allocation/AllocationWorkflowTabs";
import { AllocationAnalytics } from "@/components/admin/logistics/allocation/AllocationAnalytics";
import { AllocationAdvancedFilters } from "@/components/admin/logistics/allocation/AllocationAdvancedFilters";
import { AllocationPortfolioTable } from "@/components/admin/logistics/allocation/AllocationPortfolioTable";
import { SelectedAllocationPreview } from "@/components/admin/logistics/allocation/SelectedAllocationPreview";
import { AllocationOperationsHealthSidebar } from "@/components/admin/logistics/allocation/AllocationOperationsHealthSidebar";
import { useInventoryAllocations } from "@/hooks/admin/useFulfilmentWarehouse";

function InventoryAllocationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedAllocation, setSelectedAllocation] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const currentFilters = {
    search: searchParams?.get("search") || "",
    allocation_status: searchParams?.get("allocation_status") || "all",
    page: Number(searchParams?.get("page")) || 1,
    per_page: Number(searchParams?.get("per_page")) || 15,
  };
  const apiFilters={...currentFilters,allocation_status:currentFilters.allocation_status === "all" ? undefined : currentFilters.allocation_status};
  const {data,loading,error,refresh}=useInventoryAllocations(apiFilters);
  const allocationRows=(data?.allocations?.data ?? []).map((a:any)=>({...a,ref:a.reference,order_ref:a.order_number,product:a.product_name,supplier:a.supplier_name,dest_wh:a.destination_facility,ordered_qty:a.requested_quantity,allocated_qty:a.allocated_quantity,short_qty:Math.max(0,Number(a.requested_quantity)-Number(a.allocated_quantity)),source_wh:a.source_facility,alloc_status:a.status,res_status:"—",customer:"—",bu:"—",channel:"—",avail_qty:"—",reserved_qty:"—",strategy:"—",source_loc:"—",batch:"—",expiry:"—",res_ref:"—",res_expiry:"—",transfer_req:a.status === "transfer_required" ? "Yes" : "No",transfer_ref:"—",transfer_status:"—",backorder:"—",sub_status:"—",hold_status:"—",exception_status:a.status === "failed" ? "Allocation failed" : "—",owner:"—"}));

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const updateFilters = useCallback(
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

      router.push(`/admin/logistics/inventory-allocation?${params.toString()}`);
    },
    [searchParams, router, currentFilters]
  );

  const handleClearFilters = () => {
    router.push("/admin/logistics/inventory-allocation");
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. BREADCRUMB, HEADING & TOP ACTION TOOLBAR */}
          <AllocationPageHeader
            onRefresh={refresh}
            onCreateTransferClick={() => alert("Opening Create Transfer Request Modal...")}
          />

          {/* 2. BUSINESS CONTEXT & SERVICE HEALTH STRIP */}
          <AllocationContextBar onRefresh={refresh} />

          {notification && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span>{notification}</span>
              <button onClick={() => setNotification(null)} className="text-emerald-600 font-bold">&times;</button>
            </div>
          )}

          {/* 3. PRIMARY KPI GRID (12 CARDS) & 6 PERFORMANCE METRIC METERS */}
          <AllocationKpiGrid metrics={data?.kpis} />

          {/* 4. WORKFLOW NAVIGATION TABS (20 TABS) */}
          <AllocationWorkflowTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 5. MAIN ANALYTICS (3 PANELS + HEALTH SCORECARD STRIP) */}
          <AllocationAnalytics trendData={data?.trend} donutData={data?.distribution} statusRows={data?.summary} loading={loading} error={error} />

          {/* 6. ADVANCED FILTER SYSTEM */}
          <AllocationAdvancedFilters
            filters={currentFilters}
            onFilterChange={updateFilters}
            onClearFilters={handleClearFilters}
            onRefresh={refresh}
          />

          {/* 7. INVENTORY ALLOCATION PORTFOLIO TABLE */}
          <AllocationPortfolioTable
            allocations={allocationRows}
            total={data?.allocations?.total ?? 0}
            selectedRef={selectedAllocation?.ref}
            onSelectAllocation={(alloc) => setSelectedAllocation(alloc)}
          />

          {/* 8. SELECTED ALLOCATION PREVIEW (17 TABS + 10 PANELS + LIFECYCLE TIMELINE) */}
          <SelectedAllocationPreview allocation={selectedAllocation} />
        </main>

        {/* 9. DEDICATED RIGHT-SIDE ALLOCATION OPERATIONS HEALTH SIDEBAR */}
        <AllocationOperationsHealthSidebar />
      </div>
    </div>
  );
}

export default function InventoryAllocationPage() {
  return (
    <Suspense fallback={<div className="p-6 font-semibold text-xs">Loading Inventory Allocation, Reservation &amp; Transfer...</div>}>
      <InventoryAllocationContent />
    </Suspense>
  );
}
