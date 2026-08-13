"use client";

import React, { useState, useEffect, useCallback } from "react";
import { marketingDeliveryService } from "@/services/marketingDeliveryService";

import { PaidMediaHeader } from "@/components/admin/marketing/paid-media/PaidMediaHeader";
import { PaidMediaContextStrip } from "@/components/admin/marketing/paid-media/PaidMediaContextStrip";
import { PaidMediaKpiStrip } from "@/components/admin/marketing/paid-media/PaidMediaKpiStrip";
import { PaidMediaTabs } from "@/components/admin/marketing/paid-media/PaidMediaTabs";
import {
  PaidMediaFilterBar,
  PaidMediaFilterState,
  INITIAL_PAID_MEDIA_FILTERS,
} from "@/components/admin/marketing/paid-media/PaidMediaFilterBar";
import { PaidMediaReadinessStrip } from "@/components/admin/marketing/paid-media/PaidMediaReadinessStrip";
import { PaidMediaPortfolioTable } from "@/components/admin/marketing/paid-media/PaidMediaPortfolioTable";
import { PaidMediaPagination } from "@/components/admin/marketing/paid-media/PaidMediaPagination";
import { SelectedPaidCampaignWorkspace } from "@/components/admin/marketing/paid-media/selected/SelectedPaidCampaignWorkspace";
import { PaidMediaOperationsRail } from "@/components/admin/marketing/paid-media/rail/PaidMediaOperationsRail";

export default function MarketingPaidMediaPage() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("campaigns");
  const [filters, setFilters] = useState<PaidMediaFilterState>(INITIAL_PAID_MEDIA_FILTERS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh=useCallback(async()=>{setLoading(true);try{const next=await marketingDeliveryService.paid({...filters,search:filters.search,page:currentPage,per_page:pageSize});setData(next);setSelectedCampaignId(id=>next.campaigns.some((x:any)=>x.id===id)?id:(next.campaigns[0]?.id??''));setError(null);}catch(e:any){setError(e?.message??'Unable to load paid media campaigns.');}finally{setLoading(false);}},[filters,currentPage,pageSize]);
  useEffect(()=>{void handleRefresh();const timer=setInterval(()=>void handleRefresh(),30000);return()=>clearInterval(timer);},[handleRefresh]);

  const handleFilterChange = (key: keyof PaidMediaFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_PAID_MEDIA_FILTERS);
    setCurrentPage(1);
  };

  // Filter campaigns based on search and selected options
  const filteredCampaigns = (data?.campaigns??[]).filter((cmp:any) => {
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        cmp.paidCampaign.toLowerCase().includes(q) ||
        cmp.mediaId.toLowerCase().includes(q) ||
        cmp.adAccount.toLowerCase().includes(q) ||
        cmp.linkedMarketingCampaign.toLowerCase().includes(q) ||
        cmp.audience.toLowerCase().includes(q) ||
        cmp.creativeSet.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.status !== "All" && cmp.status !== filters.status) return false;
    if (filters.platform !== "All" && cmp.platform !== filters.platform) return false;
    if (filters.objective !== "All" && cmp.objective !== filters.objective) return false;
    if (filters.audience !== "All" && cmp.audience !== filters.audience) return false;
    if (filters.deliveryHealth !== "All" && cmp.deliveryHealth !== filters.deliveryHealth) return false;
    if (filters.trackingHealth !== "All" && cmp.tracking !== filters.trackingHealth) return false;
    if (filters.governance !== "All" && cmp.governance !== filters.governance) return false;

    return true;
  });

  // Pagination calculations
  const totalItems=data?.pagination?.total??0;const totalPages=data?.pagination?.last_page??1;const paginatedCampaigns=filteredCampaigns;

  const selectedCampaign =
    data?.selectedCampaignDetails?.[selectedCampaignId] ||
    (filteredCampaigns.length > 0
      ? data?.selectedCampaignDetails?.[filteredCampaigns[0].id] || null
      : null);

  const handleToggleCheckbox = (id: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAllCheckboxes = () => {
    if (selectedCheckboxes.length === paginatedCampaigns.length) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(paginatedCampaigns.map((c:any) => c.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <PaidMediaHeader onCreateCampaign={async()=>{const name=window.prompt('Paid campaign name');if(name){await marketingDeliveryService.create('paid-media',{name,platform:'Meta Ads',objective:'Sales'});await handleRefresh();}}} />

          {/* 2. CONTEXT STRIP */}
          {data && <PaidMediaContextStrip context={data.context} onRefresh={handleRefresh} />}

          {/* 3. KPI STRIP (8 CARDS) */}
          {data && <PaidMediaKpiStrip kpis={data.kpis} />}

          {/* 4. NAVIGATION TABS (11 TABS) */}
          <PaidMediaTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <PaidMediaFilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* 6. READINESS OVERVIEW */}
          <PaidMediaReadinessStrip
            counters={data?.readiness??{healthy:0,needsAttention:0,budgetRisk:0,deliveryWarning:0,creativeIssue:0,trackingWarning:0,platformPolicyIssue:0,syncFailure:0}}
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
              {/* 7. PAID MEDIA PORTFOLIO TABLE */}
              <PaidMediaPortfolioTable
                campaigns={paginatedCampaigns}
                selectedId={selectedCampaignId}
                onSelectCampaign={(cmp) => setSelectedCampaignId(cmp.id)}
                selectedCheckboxes={selectedCheckboxes}
                onToggleCheckbox={handleToggleCheckbox}
                onToggleAllCheckboxes={handleToggleAllCheckboxes}
              />

              {/* 8. PAGINATION */}
              <PaidMediaPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />

              {/* 9. SELECTED PAID CAMPAIGN WORKSPACE (20 CARDS) */}
              <SelectedPaidCampaignWorkspace details={selectedCampaign} />
            </>
          )}
        </main>

        {/* 10. RIGHT OPERATIONAL RAIL */}
        {data && <PaidMediaOperationsRail railData={data.rail} onCreateCampaign={async()=>{const name=window.prompt('Paid campaign name');if(name){await marketingDeliveryService.create('paid-media',{name,platform:'Meta Ads',objective:'Sales'});await handleRefresh();}}} />}
      </div>
    </div>
  );
}
