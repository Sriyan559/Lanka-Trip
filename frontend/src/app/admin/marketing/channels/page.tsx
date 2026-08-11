"use client";

import React, { useState, useEffect } from "react";
import {
  MARKETING_CHANNELS_MOCK_DATA,
  ChannelRecord,
} from "@/data/marketingChannels.mock";

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
  const [data, setData] = useState(MARKETING_CHANNELS_MOCK_DATA);
  const [activeTab, setActiveTab] = useState("channels");
  const [filters, setFilters] = useState<ChannelFilterState>(INITIAL_CHANNEL_FILTERS);
  const [selectedChannelId, setSelectedChannelId] = useState<string>("CRM-EMS-0001");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Attempt backend API fetch if available
  useEffect(() => {
    let isMounted = true;
    async function fetchChannelsFromApi() {
      try {
        const res = await fetch("/api/admin/marketing/channels");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && Array.isArray(json.data)) {
            setData((prev) => ({
              ...prev,
              channels: json.data,
            }));
          }
        }
      } catch (err) {
        // Fallback to mock data structure
        console.warn("Marketing channels API not available, using default data structure.", err);
      }
    }
    fetchChannelsFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setData((prev: typeof MARKETING_CHANNELS_MOCK_DATA) => ({
        ...prev,
        context: {
          ...prev.context,
          lastSynced: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        },
      }));
      setLoading(false);
    }, 300);
  };

  const handleFilterChange = (key: keyof ChannelFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_CHANNEL_FILTERS);
    setCurrentPage(1);
  };

  // Filter channels based on search and selected filter values
  const filteredChannels = data.channels.filter((ch) => {
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
  const totalItems = filteredChannels.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedChannels = filteredChannels.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const selectedChannel =
    data.selectedChannelDetails[selectedChannelId] ||
    (filteredChannels.length > 0
      ? data.selectedChannelDetails[filteredChannels[0].id] || null
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
      setSelectedCheckboxes(paginatedChannels.map((c) => c.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <ChannelHeader onAddChannel={() => {}} />

          {/* 2. CONTEXT STRIP */}
          <ChannelContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. KPI STRIP (8 CARDS) */}
          <ChannelKpiStrip kpis={data.kpis} />

          {/* 4. NAVIGATION TABS (10 TABS) */}
          <ChannelTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <ChannelFilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* 6. READINESS OVERVIEW */}
          <ChannelReadinessOverview
            counters={data.readiness}
            onClearAll={handleClearFilters}
            onRefresh={handleRefresh}
            onApplyFilters={() => {}}
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
        <ChannelOperationsRail railData={data.rail} onAddChannel={() => {}} />
      </div>
    </div>
  );
}
