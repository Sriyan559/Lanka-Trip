"use client";

import React, { useState, useEffect, useCallback } from "react";
import { marketingDeliveryService } from "@/services/marketingDeliveryService";

import { ChannelHeader } from "@/components/admin/marketing/channels/ChannelHeader";
import { ChannelContextStrip } from "@/components/admin/marketing/channels/ChannelContextStrip";
import { ChannelKpiStrip } from "@/components/admin/marketing/channels/ChannelKpiStrip";
import { ChannelTabs } from "@/components/admin/marketing/channels/ChannelTabs";
import {
  ChannelFilterBar,
  ChannelFilterState,
  INITIAL_CHANNEL_FILTERS,
} from "@/components/admin/marketing/channels/ChannelFilterBar";
import { ChannelReadinessOverview } from "@/components/admin/marketing/channels/ChannelReadinessOverview";
import { ChannelTable } from "@/components/admin/marketing/channels/ChannelTable";
import { ChannelPagination } from "@/components/admin/marketing/channels/ChannelPagination";
import { SelectedChannelWorkspace } from "@/components/admin/marketing/channels/selected/SelectedChannelWorkspace";
import { ChannelOperationsRail } from "@/components/admin/marketing/channels/rail/ChannelOperationsRail";

export default function MarketingChannelsPage() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("channels");
  const [filters, setFilters] = useState<ChannelFilterState>(INITIAL_CHANNEL_FILTERS);
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh=useCallback(async()=>{setLoading(true);try{const next=await marketingDeliveryService.channels({...filters,search:filters.search,type:filters.type,provider:filters.provider,business_unit:filters.businessUnit,market:filters.market,provider_sync:filters.providerSync,status:filters.status,page:currentPage,per_page:pageSize});setData(next);setSelectedChannelId(id=>next.channels.some((x:any)=>x.id===id)?id:(next.channels[0]?.id??''));setError(null);}catch(e:any){setError(e?.message??'Unable to load channels.');}finally{setLoading(false);}},[filters,currentPage,pageSize]);
  useEffect(()=>{void handleRefresh();const timer=setInterval(()=>void handleRefresh(),30000);return()=>clearInterval(timer);},[handleRefresh]);

  const handleFilterChange = (key: keyof ChannelFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_CHANNEL_FILTERS);
    setCurrentPage(1);
  };

  // Filter channels based on search and selected filter values
  const filteredChannels = (data?.channels??[]).filter((ch:any) => {
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        ch.channelName.toLowerCase().includes(q) ||
        ch.channelId.toLowerCase().includes(q) ||
        ch.provider.toLowerCase().includes(q) ||
        ch.senderAccount.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.status !== "All" && ch.status !== filters.status) return false;
    if (filters.type !== "All" && ch.type !== filters.type) return false;
    if (filters.provider !== "All" && ch.provider !== filters.provider) return false;
    if (filters.businessUnit !== "All" && ch.businessUnit !== filters.businessUnit) return false;
    if (filters.market !== "All" && ch.market !== filters.market) return false;
    if (filters.providerSync !== "All" && ch.providerSync !== filters.providerSync) return false;

    return true;
  });

  // Pagination calculation
  const totalItems = data?.pagination?.total??0;
  const totalPages = data?.pagination?.last_page??1;
  const paginatedChannels = filteredChannels;

  const selectedChannel =
    data?.selectedChannelDetails?.[selectedChannelId] ||
    (filteredChannels.length > 0
      ? data?.selectedChannelDetails?.[filteredChannels[0].id] || null
      : null);

  const handleToggleCheckbox = (id: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAllCheckboxes = () => {
    if (selectedCheckboxes.length === paginatedChannels.length) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(paginatedChannels.map((c:any) => c.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <ChannelHeader onAddChannel={async()=>{const name=window.prompt('Channel name');if(!name)return;await marketingDeliveryService.create('channels',{name,type:'other'});await handleRefresh();}} />

          {/* 2. CONTEXT STRIP */}
          {data && <ChannelContextStrip context={data.context} onRefresh={handleRefresh} />}

          {/* 3. KPI STRIP (8 CARDS) */}
          {data && <ChannelKpiStrip kpis={data.kpis} />}

          {/* 4. NAVIGATION TABS (10 TABS) */}
          <ChannelTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <ChannelFilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* 6. READINESS OVERVIEW */}
          <ChannelReadinessOverview
            counters={data?.readiness??{healthy:0,warning:0,degraded:0,disconnected:0,senderVerificationIssue:0,providerWarning:0,queueDelay:0}}
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
              {/* 7. CHANNEL DATA TABLE */}
              <ChannelTable
                channels={paginatedChannels}
                selectedId={selectedChannelId}
                onSelectChannel={(ch) => setSelectedChannelId(ch.id)}
                selectedCheckboxes={selectedCheckboxes}
                onToggleCheckbox={handleToggleCheckbox}
                onToggleAllCheckboxes={handleToggleAllCheckboxes}
              />

              {/* 8. PAGINATION */}
              <ChannelPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />

              {/* 9. SELECTED CHANNEL WORKSPACE (16 OPERATIONAL CARDS) */}
              <SelectedChannelWorkspace details={selectedChannel} />
            </>
          )}
        </main>

        {/* 10. RIGHT OPERATIONAL RAIL */}
        {data && <ChannelOperationsRail railData={data.rail} onAddChannel={async()=>{const name=window.prompt('Channel name');if(name){await marketingDeliveryService.create('channels',{name,type:'other'});await handleRefresh();}}} />}
      </div>
    </div>
  );
}
