"use client";

import React, { useState } from "react";
import {
  CAMPAIGN_MANAGEMENT_MOCK_DATA,
  CampaignPortfolioRecord,
} from "@/data/campaignManagement.mock";

// Shared Components
import { MarketingContextStrip } from "@/components/admin/marketing/shared/MarketingContextStrip";

// Campaign Specific Components
import { CampaignPageHeader } from "@/components/admin/marketing/campaigns/CampaignPageHeader";
import { CampaignKpiGrid } from "@/components/admin/marketing/campaigns/CampaignKpiGrid";
import { CampaignReadinessStrip } from "@/components/admin/marketing/campaigns/CampaignReadinessStrip";
import { CampaignLifecycleTabs } from "@/components/admin/marketing/campaigns/CampaignLifecycleTabs";
import { CampaignToolbar } from "@/components/admin/marketing/campaigns/CampaignToolbar";
import {
  CampaignFilterBar,
  CampaignFilterState,
} from "@/components/admin/marketing/campaigns/CampaignFilterBar";
import { CampaignPortfolioTable } from "@/components/admin/marketing/campaigns/CampaignPortfolioTable";
import { SelectedCampaignWorkspace } from "@/components/admin/marketing/campaigns/SelectedCampaignWorkspace";
import { CampaignLifecyclePanel } from "@/components/admin/marketing/campaigns/CampaignLifecyclePanel";
import { ApprovalQueue } from "@/components/admin/marketing/campaigns/ApprovalQueue";
import { CampaignExceptionsPanel } from "@/components/admin/marketing/campaigns/CampaignExceptionsPanel";
import { CampaignsByChannelChart } from "@/components/admin/marketing/campaigns/CampaignsByChannelChart";
import { CampaignMixChart } from "@/components/admin/marketing/campaigns/CampaignMixChart";
import { CampaignBudgetControl } from "@/components/admin/marketing/campaigns/CampaignBudgetControl";
import { CampaignLinkedPromotions } from "@/components/admin/marketing/campaigns/CampaignLinkedPromotions";
import { RecentCampaignActivity } from "@/components/admin/marketing/campaigns/RecentCampaignActivity";
import { CampaignOperationalRail } from "@/components/admin/marketing/campaigns/CampaignOperationalRail";

const INITIAL_FILTERS: CampaignFilterState = {
  status: "All",
  type: "All",
  channel: "All",
  audience: "All",
  businessUnit: "All",
  brand: "All",
  owner: "All",
  approvalStatus: "All",
  budgetStatus: "All",
  governance: "All",
  dateRange: "Last 90 Days",
};

export default function CampaignManagementPage() {
  const [data, setData] = useState(CAMPAIGN_MANAGEMENT_MOCK_DATA);
  const [activeTab, setActiveTab] = useState("All Campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<CampaignFilterState>(INITIAL_FILTERS);
  const [selectedRecord, setSelectedRecord] = useState<CampaignPortfolioRecord | null>(
    CAMPAIGN_MANAGEMENT_MOCK_DATA.portfolioRecords[0] || null
  );

  const handleRefresh = () => {
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
  };

  const handleFilterChange = (key: keyof CampaignFilterState, val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery("");
    setActiveTab("All Campaigns");
  };

  // Filter portfolio records based on search, activeTab, and dropdown filters
  const filteredRecords = data.portfolioRecords.filter((rec) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        rec.name.toLowerCase().includes(q) ||
        rec.code.toLowerCase().includes(q) ||
        rec.owner.toLowerCase().includes(q) ||
        rec.channels.some((c) => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Lifecycle tab filter
    if (activeTab !== "All Campaigns" && activeTab !== "Exceptions" && activeTab !== "Archived") {
      if (rec.lifecycleStatus !== activeTab) return false;
    }

    // Status filter
    if (filters.status !== "All" && rec.lifecycleStatus !== filters.status) {
      return false;
    }

    // Type filter
    if (filters.type !== "All" && rec.type !== filters.type) {
      return false;
    }

    // Channel filter
    if (filters.channel !== "All" && !rec.channels.includes(filters.channel)) {
      return false;
    }

    // Owner filter
    if (filters.owner !== "All" && rec.owner !== filters.owner) {
      return false;
    }

    // Approval Status filter
    if (filters.approvalStatus !== "All" && rec.approvalStatus !== filters.approvalStatus) {
      return false;
    }

    // Governance filter
    if (filters.governance !== "All" && rec.governanceStatus !== filters.governance) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN COMMAND CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <CampaignPageHeader onRefresh={handleRefresh} />

          {/* 2. BUSINESS CONTEXT STRIP */}
          <MarketingContextStrip
            context={data.context}
            onRefresh={handleRefresh}
          />

          {/* 3. TOP CAMPAIGN KPI CARDS (8 CARDS) */}
          <CampaignKpiGrid kpis={data.kpis} />

          {/* 4. CAMPAIGN READINESS & EXCEPTIONS STRIP */}
          <CampaignReadinessStrip counters={data.readinessStrip} />

          {/* 5. CAMPAIGN LIFECYCLE TABS */}
          <CampaignLifecycleTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 6. SEARCH & SAVED VIEWS TOOLBAR */}
          <CampaignToolbar
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            onClearAll={handleClearFilters}
            onRefresh={handleRefresh}
          />

          {/* 7. 11-FIELD FILTER BAR */}
          <CampaignFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* 8. CAMPAIGN PORTFOLIO DATA TABLE */}
          <CampaignPortfolioTable
            records={filteredRecords}
            selectedId={selectedRecord?.id || ""}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
          />

          {/* 9. SELECTED CAMPAIGN SUMMARY WORKSPACE */}
          <SelectedCampaignWorkspace campaign={selectedRecord} />

          {/* 10. OPERATIONAL ROW (ALL 5 PANELS SPANNING 100% WORKSPACE WIDTH - IMAGE 2 & 3 MATCH) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.25fr)_minmax(0,1.3fr)_minmax(0,0.65fr)_minmax(0,0.65fr)] gap-2.5 items-start w-full min-w-0">
            <CampaignLifecyclePanel stages={data.lifecycleCounts} />
            <ApprovalQueue records={data.approvalQueue} />
            <CampaignExceptionsPanel exceptions={data.exceptions} />
            <CampaignsByChannelChart data={data.channelChartData} />
            <CampaignMixChart data={data.campaignMixData} />
          </div>

          {/* 12. BOTTOM ROW (3 COLUMNS SPANNING 100% WORKSPACE WIDTH - IMAGE 2 & 3 MATCH) */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.55fr)] gap-2.5 items-start w-full min-w-0">
            <CampaignBudgetControl
              allocatedBudget={data.budgetControl.allocatedBudget}
              committed={data.budgetControl.committed}
              committedPercent={data.budgetControl.committedPercent}
              actualSpend={data.budgetControl.actualSpend}
              actualSpendPercent={data.budgetControl.actualSpendPercent}
              atRisk={data.budgetControl.atRisk}
              atRiskPercent={data.budgetControl.atRiskPercent}
              utilization={data.budgetControl.utilization}
            />

            <CampaignLinkedPromotions promotions={data.linkedPromotions} />

            <RecentCampaignActivity activities={data.recentActivity} />
          </div>
        </main>

        {/* 13. RIGHT-SIDE CAMPAIGN OPERATIONAL RAIL */}
        <CampaignOperationalRail railData={data.operationalRail} />
      </div>
    </div>
  );
}
