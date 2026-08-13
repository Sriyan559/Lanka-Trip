"use client";

import React, { useState, useEffect, useCallback } from "react";
import { marketingDeliveryService } from "@/services/marketingDeliveryService";

import { PlacementHeader } from "@/components/admin/marketing/web-app/PlacementHeader";
import { PlacementContextStrip } from "@/components/admin/marketing/web-app/PlacementContextStrip";
import { PlacementKpiStrip } from "@/components/admin/marketing/web-app/PlacementKpiStrip";
import { PlacementTabs } from "@/components/admin/marketing/web-app/PlacementTabs";
import {
  PlacementFilterBar,
  PlacementFilterState,
  INITIAL_PLACEMENT_FILTERS,
} from "@/components/admin/marketing/web-app/PlacementFilterBar";
import { PlacementReadinessStrip } from "@/components/admin/marketing/web-app/PlacementReadinessStrip";
import { PlacementPortfolioTable } from "@/components/admin/marketing/web-app/PlacementPortfolioTable";
import { PlacementPagination } from "@/components/admin/marketing/web-app/PlacementPagination";
import { SelectedPlacementWorkspace } from "@/components/admin/marketing/web-app/selected/SelectedPlacementWorkspace";
import { ExperienceOperationsRail } from "@/components/admin/marketing/web-app/rail/ExperienceOperationsRail";

export default function MarketingWebAppCampaignsPage() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("placements");
  const [filters, setFilters] = useState<PlacementFilterState>(INITIAL_PLACEMENT_FILTERS);
  const [selectedPlacementId, setSelectedPlacementId] = useState<string>("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh=useCallback(async()=>{setLoading(true);try{const next=await marketingDeliveryService.placements({...filters,search:filters.search,page:currentPage,per_page:pageSize});setData(next);setSelectedPlacementId(id=>next.placements.some((x:any)=>x.id===id)?id:(next.placements[0]?.id??''));setError(null);}catch(e:any){setError(e?.message??'Unable to load placements.');}finally{setLoading(false);}},[filters,currentPage,pageSize]);
  useEffect(()=>{void handleRefresh();const timer=setInterval(()=>void handleRefresh(),30000);return()=>clearInterval(timer);},[handleRefresh]);

  const handleFilterChange = (key: keyof PlacementFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_PLACEMENT_FILTERS);
    setCurrentPage(1);
  };

  // Filter placements based on search and selected filter criteria
  const filteredPlacements = (data?.placements??[]).filter((plc:any) => {
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        plc.placementName.toLowerCase().includes(q) ||
        plc.placementId.toLowerCase().includes(q) ||
        plc.campaign.toLowerCase().includes(q) ||
        plc.audience.toLowerCase().includes(q) ||
        plc.content.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.status !== "All" && plc.status !== filters.status) return false;
    if (filters.surface !== "All" && plc.surface !== filters.surface) return false;
    if (filters.type !== "All" && plc.type !== filters.type) return false;
    if (filters.campaign !== "All" && plc.campaign !== filters.campaign) return false;
    if (filters.audience !== "All" && plc.audience !== filters.audience) return false;
    if (filters.contentStatus !== "All" && plc.contentReadiness !== filters.contentStatus) return false;
    if (filters.device !== "All" && plc.device !== filters.device) return false;
    if (filters.governance !== "All" && plc.governance !== filters.governance) return false;

    return true;
  });

  // Pagination calculation
  const totalItems=data?.pagination?.total??0;const totalPages=data?.pagination?.last_page??1;const paginatedPlacements=filteredPlacements;

  const selectedPlacement =
    data?.selectedPlacementDetails?.[selectedPlacementId] ||
    (filteredPlacements.length > 0
      ? data?.selectedPlacementDetails?.[filteredPlacements[0].id] || null
      : null);

  const handleToggleCheckbox = (id: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAllCheckboxes = () => {
    if (selectedCheckboxes.length === paginatedPlacements.length) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(paginatedPlacements.map((c:any) => c.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <PlacementHeader onCreateCampaign={async()=>{const name=window.prompt('Placement name');if(name){await marketingDeliveryService.create('web-app-campaigns',{name,surface:'website',type:'hero_banner'});await handleRefresh();}}} />

          {/* 2. CONTEXT STRIP */}
          {data && <PlacementContextStrip context={data.context} onRefresh={handleRefresh} />}

          {/* 3. KPI STRIP (8 CARDS) */}
          {data && <PlacementKpiStrip kpis={data.kpis} />}

          {/* 4. NAVIGATION TABS (10 TABS) */}
          <PlacementTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <PlacementFilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* 6. READINESS OVERVIEW */}
          <PlacementReadinessStrip
            counters={data?.readiness??{healthy:0,needsAttention:0,contentMissing:0,placementConflict:0,audienceWarning:0,governanceReview:0,renderingError:0}}
            onClearAll={handleClearFilters}
            onRefresh={handleRefresh}
            onApplyFilters={handleRefresh}
          />

          {/* Inline Error State */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700 flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={handleRefresh}
                className="font-bold underline text-rose-800 hover:text-rose-900 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Skeleton Loading State */}
          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-20 bg-gray-100 rounded w-full" />
              <div className="h-40 bg-gray-100 rounded w-full" />
            </div>
          ) : (
            <>
              {/* 7. PLACEMENT PORTFOLIO TABLE */}
              <PlacementPortfolioTable
                placements={paginatedPlacements}
                selectedId={selectedPlacementId}
                onSelectPlacement={(plc) => setSelectedPlacementId(plc.id)}
                selectedCheckboxes={selectedCheckboxes}
                onToggleCheckbox={handleToggleCheckbox}
                onToggleAllCheckboxes={handleToggleAllCheckboxes}
              />

              {/* 8. PAGINATION */}
              <PlacementPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />

              {/* 9. SELECTED PLACEMENT WORKSPACE (19 CARDS) */}
              <SelectedPlacementWorkspace details={selectedPlacement} />
            </>
          )}
        </main>

        {/* 10. RIGHT OPERATIONAL RAIL */}
        {data && <ExperienceOperationsRail railData={data.rail} onCreateCampaign={async()=>{const name=window.prompt('Placement name');if(name){await marketingDeliveryService.create('web-app-campaigns',{name,surface:'website',type:'hero_banner'});await handleRefresh();}}} />}
      </div>
    </div>
  );
}
