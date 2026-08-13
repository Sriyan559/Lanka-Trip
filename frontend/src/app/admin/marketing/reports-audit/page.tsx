"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { MarketingReportItem } from "@/data/marketingReportsAudit.mock";
import { createMarketingReport, getMarketingReportDetail, getMarketingReports } from "@/services/marketingReportsService";

import { ReportsAuditHeader } from "@/components/admin/marketing/reports-audit/ReportsAuditHeader";
import { ReportsAuditContextStrip } from "@/components/admin/marketing/reports-audit/ReportsAuditContextStrip";
import { ReportsAuditKpiStrip } from "@/components/admin/marketing/reports-audit/ReportsAuditKpiStrip";
import { ReportsAuditTabs } from "@/components/admin/marketing/reports-audit/ReportsAuditTabs";
import {
  ReportFilters,
  ReportFilterState,
  INITIAL_REPORT_FILTERS,
} from "@/components/admin/marketing/reports-audit/ReportFilters";
import { ReportingStatusStrip } from "@/components/admin/marketing/reports-audit/ReportingStatusStrip";
import { MarketingReportLibrary } from "@/components/admin/marketing/reports-audit/MarketingReportLibrary";
import { ReportsPagination } from "@/components/admin/marketing/reports-audit/ReportsPagination";

import { SelectedReportWorkspace } from "@/components/admin/marketing/reports-audit/selected/SelectedReportWorkspace";
import { ReportingOperationsRail } from "@/components/admin/marketing/reports-audit/rail/ReportingOperationsRail";

export default function MarketingReportsAuditPage() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("reports");
  const [filters, setFilters] = useState<ReportFilterState>(INITIAL_REPORT_FILTERS);
  const [selectedReportId, setSelectedReportId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh=useCallback(async()=>{setLoading(true);try{const next=await getMarketingReports({...filters,search:filters.search,page:currentPage,per_page:20});setData(next);setSelectedReportId(id=>next.reports.some((x:any)=>x.id===id)?id:(next.reports[0]?.id??''));setError(null);}catch(e:any){setError(e?.message??'Unable to load marketing reports.');}finally{setLoading(false);}},[filters,currentPage]);
  useEffect(()=>{void handleRefresh();const timer=setInterval(()=>void handleRefresh(),30000);return()=>clearInterval(timer);},[handleRefresh]);
  if(!data)return <div className="min-h-screen bg-[#faf8f8] p-4 text-sm text-gray-600">{error||'Loading reports…'}</div>;

  const handleFilterChange = (key: keyof ReportFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_REPORT_FILTERS);
  };

  const handleSelectReport = (report: MarketingReportItem) => {
    setSelectedReportId(report.id);
    void getMarketingReportDetail(report.id).then(selectedReport=>setData((current:any)=>({...current,selectedReport}))).catch((e:any)=>setError(e?.message??'Unable to load the selected report.'));
  };

  const handleFilterQueue = (queueKey: string) => {
    if (queueKey === "failedExports") {
      setActiveTab("exports");
    } else if (queueKey === "failedImports") {
      setActiveTab("imports");
    } else if (queueKey === "privacyReviews") {
      setFilters((prev) => ({ ...prev, privacyClassification: "Restricted" }));
    } else if (queueKey === "approvalRequired") {
      setFilters((prev) => ({ ...prev, status: "Pending" }));
    } else if (queueKey === "mappingWarnings") {
      setActiveTab("mappings");
    } else if (queueKey === "retentionExpiring") {
      setActiveTab("retention");
    }
  };

  // Filter report list
  const filteredReports = data.reports.filter((item: MarketingReportItem) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchSearch =
        item.reportName.toLowerCase().includes(q) ||
        item.reportId.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.marketingDomain.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }
    if (filters.reportType !== "All" && item.reportType !== filters.reportType) {
      return false;
    }
    if (filters.marketingDomain !== "All" && item.marketingDomain !== filters.marketingDomain) {
      return false;
    }
    if (filters.status !== "All" && item.status !== filters.status) {
      return false;
    }
    if (filters.fileFormat !== "All" && item.format !== filters.fileFormat) {
      return false;
    }
    if (filters.privacyClassification !== "All" && item.privacy !== filters.privacyClassification) {
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
          <ReportsAuditHeader onCreateScheduledReport={async()=>{const name=window.prompt('Report name');if(name){await createMarketingReport({name,type:'detail',domain:'marketing',format:'csv'});await handleRefresh();}}} />

          {/* 2. CONTEXT STRIP */}
          <ReportsAuditContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. KPI STRIP (8 CARDS) */}
          <ReportsAuditKpiStrip kpis={data.kpis} />

          {/* 4. NAVIGATION TABS (12 TABS) */}
          <ReportsAuditTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <ReportFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleRefresh}
          />

          {/* 6. READINESS / HEALTH STATUS STRIP */}
          <ReportingStatusStrip
            counters={data.readiness}
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
              {/* 7. MARKETING REPORT LIBRARY TABLE */}
              <MarketingReportLibrary
                reports={filteredReports}
                selectedId={selectedReportId}
                onSelectReport={handleSelectReport}
              />

              {/* PAGINATION */}
              <ReportsPagination
                currentPage={currentPage}
                totalPages={data.pagination?.last_page??1}
                totalRecords={data.pagination?.total??0}
                onPageChange={setCurrentPage}
              />

              {/* 8. SELECTED REPORT WORKSPACE */}
              <SelectedReportWorkspace report={data.selectedReport} />
            </>
          )}
        </main>

        {/* 9. RIGHT OPERATIONAL RAIL */}
        <ReportingOperationsRail
          railData={data.rail}
          onCreateScheduledReport={async()=>{const name=window.prompt('Report name');if(name){await createMarketingReport({name,type:'detail',domain:'marketing',format:'csv'});await handleRefresh();}}}
          onFilterQueue={handleFilterQueue}
        />
      </div>
    </div>
  );
}
