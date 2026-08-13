"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { GovernancePortfolioItem } from "@/data/marketingGovernance.mock";
import { createGovernancePolicy, getGovernanceDetail, getMarketingGovernance } from "@/services/marketingGovernanceService";

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
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState<GovernanceFilterState>(INITIAL_GOVERNANCE_FILTERS);
  const [selectedRecordId, setSelectedRecordId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh=useCallback(async()=>{setLoading(true);try{const next=await getMarketingGovernance({...filters,search:filters.search,page:currentPage,per_page:20});setData(next);setSelectedRecordId(id=>next.portfolio.some((x:any)=>x.id===id)?id:(next.portfolio[0]?.id??''));setError(null);}catch(e:any){setError(e?.message??'Unable to load marketing governance.');}finally{setLoading(false);}},[filters,currentPage]);
  useEffect(()=>{void handleRefresh();const timer=setInterval(()=>void handleRefresh(),30000);return()=>clearInterval(timer);},[handleRefresh]);
  if(!data)return <div className="min-h-screen bg-[#faf8f8] p-4 text-sm text-gray-600">{error||'Loading governance…'}</div>;

  const handleFilterChange = (key: keyof GovernanceFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_GOVERNANCE_FILTERS);
  };

  const handleSelectRecord = (record: GovernancePortfolioItem) => {
    setSelectedRecordId(record.id);
    void getGovernanceDetail(record.id).then(selectedRecord=>setData((current:any)=>({...current,selectedRecord}))).catch((e:any)=>setError(e?.message??'Unable to load the selected policy.'));
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
  const filteredPortfolio = data.portfolio.filter((item: GovernancePortfolioItem) => {
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
          <GovernanceHeader onCreatePolicy={async()=>{const name=window.prompt('Policy name');if(name){await createGovernancePolicy({name,type:'policy'});await handleRefresh();}}} />

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
                totalPages={data.pagination?.last_page??1}
                totalRecords={data.pagination?.total??0}
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
          onCreatePolicy={async()=>{const name=window.prompt('Policy name');if(name){await createGovernancePolicy({name,type:'policy'});await handleRefresh();}}}
          onFilterQueue={handleFilterQueue}
        />
      </div>
    </div>
  );
}
