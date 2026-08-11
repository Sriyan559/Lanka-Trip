"use client";

import React, { useState, useEffect } from "react";
import { MARKETING_GOVERNANCE_MOCK_DATA, GovernancePortfolioItem } from "@/data/marketingGovernance.mock";

import { GovernanceHeader } from "@/components/admin/marketing/governance/GovernanceHeader";
import { GovernanceContextStrip } from "@/components/admin/marketing/governance/GovernanceContextStrip";
import { GovernanceKpiStrip } from "@/components/admin/marketing/governance/GovernanceKpiStrip";
import { GovernanceTabs } from "@/components/admin/marketing/governance/GovernanceTabs";
import {
  GovernanceFilterBar,
  GovernanceFilterState,
  INITIAL_GOVERNANCE_FILTERS,
} from "@/components/admin/marketing/governance/GovernanceFilterBar";
import { GovernanceReadinessStrip } from "@/components/admin/marketing/governance/GovernanceReadinessStrip";

import { GovernancePortfolioTable } from "@/components/admin/marketing/governance/GovernancePortfolioTable";
import { GovernancePagination } from "@/components/admin/marketing/governance/GovernancePagination";
import { SelectedGovernanceWorkspace } from "@/components/admin/marketing/governance/selected/SelectedGovernanceWorkspace";

import { GovernanceOperationsRail } from "@/components/admin/marketing/governance/rail/GovernanceOperationsRail";

export default function MarketingGovernancePage() {
  const [data, setData] = useState(MARKETING_GOVERNANCE_MOCK_DATA);
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState<GovernanceFilterState>(INITIAL_GOVERNANCE_FILTERS);
  const [selectedRecordId, setSelectedRecordId] = useState<string>("gov-[#800020]");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Set initial selected item ID
  useEffect(() => {
    if (data.portfolio && data.portfolio.length > 0 && !selectedRecordId) {
      setSelectedRecordId(data.portfolio[0].id);
    }
  }, [data.portfolio, selectedRecordId]);

  // Fetch API data with fallback
  useEffect(() => {
    let isMounted = true;
    async function fetchGovernanceFromApi() {
      try {
        const res = await fetch("/api/admin/marketing/governance");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.data) {
            setData((prev) => ({
              ...prev,
              ...json.data,
            }));
          }
        }
      } catch (err) {
        console.warn("Marketing Governance API not available, using default data structure.", err);
      }
    }
    fetchGovernanceFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setData((prev) => ({
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

  const handleFilterChange = (key: keyof GovernanceFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_GOVERNANCE_FILTERS);
  };

  const handleSelectRecord = (record: GovernancePortfolioItem) => {
    setSelectedRecordId(record.id);
  };

  const handleFilterQueue = (queueKey: string) => {
    if (queueKey === "approvalPending") {
      setFilters((prev) => ({ ...prev, governanceStatus: "Approval Pending" }));
    } else if (queueKey === "contentWarnings" || queueKey === "frequencyWarnings") {
      setFilters((prev) => ({ ...prev, governanceStatus: "Warning" }));
    } else if (queueKey === "policyExceptions") {
      setActiveTab("exceptions");
    }
  };

  // Filtered portfolio records
  const filteredPortfolio = data.portfolio.filter((item) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchSearch =
        item.governanceItem.toLowerCase().includes(q) ||
        item.itemId.toLowerCase().includes(q) ||
        item.policy.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }
    if (filters.governanceStatus !== "All" && item.status !== filters.governanceStatus) {
      return false;
    }
    if (filters.policyType !== "All" && item.type !== filters.policyType) {
      return false;
    }
    if (filters.approvalState !== "All" && item.approval !== filters.approvalState) {
      return false;
    }
    if (filters.severity !== "All" && item.severity !== filters.severity) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <GovernanceHeader onCreatePolicy={() => {}} />

          {/* 2. CONTEXT STRIP */}
          <GovernanceContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. KPI STRIP (8 CARDS) */}
          <GovernanceKpiStrip kpis={data.kpis} />

          {/* 4. NAVIGATION TABS (12 TABS) */}
          <GovernanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <GovernanceFilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* 6. READINESS STRIP */}
          <GovernanceReadinessStrip
            counters={data.readiness}
            onClearAll={handleClearFilters}
            onRefresh={handleRefresh}
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
              {/* 7. PORTFOLIO TABLE */}
              <GovernancePortfolioTable
                portfolio={filteredPortfolio}
                selectedId={selectedRecordId}
                onSelectRecord={handleSelectRecord}
              />

              {/* PAGINATION */}
              <GovernancePagination
                currentPage={currentPage}
                totalPages={1}
                totalRecords={filteredPortfolio.length}
                onPageChange={setCurrentPage}
              />

              {/* 8. SELECTED GOVERNANCE RECORD WORKSPACE */}
              <SelectedGovernanceWorkspace record={data.selectedRecord} />
            </>
          )}
        </main>

        {/* 9. RIGHT OPERATIONAL RAIL */}
        <GovernanceOperationsRail
          railData={data.rail}
          onCreatePolicy={() => {}}
          onFilterQueue={handleFilterQueue}
        />
      </div>
    </div>
  );
}
