"use client";

import React, { useState } from "react";
import {
  mockMarketingAudienceData,
  AudienceRecord,
} from "@/data/marketingAudience.mock";
import { AudienceHeader } from "@/components/admin/marketing/audiences/AudienceHeader";
import {
  AudienceContextStrip,
  AudienceKpiStrip,
} from "@/components/admin/marketing/audiences/AudienceContextStrip";
import {
  AudienceTabs,
  AudienceTabId,
} from "@/components/admin/marketing/audiences/AudienceTabs";
import {
  AudienceToolbar,
  AudienceReadinessStrip,
} from "@/components/admin/marketing/audiences/AudienceToolbar";
import { AudiencePortfolioTable } from "@/components/admin/marketing/audiences/AudiencePortfolioTable";
import { SelectedAudienceSummary } from "@/components/admin/marketing/audiences/SelectedAudienceSummary";
import { AudienceCompositionPanel } from "@/components/admin/marketing/audiences/AudienceCompositionPanel";
import {
  AudienceRulesPanel,
  AudienceFreshnessPanel,
} from "@/components/admin/marketing/audiences/AudienceRulesPanel";
import {
  AudienceLinkedCampaignsPanel,
  AudienceLinkedJourneysPanel,
} from "@/components/admin/marketing/audiences/AudienceLinkedCampaignsPanel";
import { AudienceChannelEligibilityPanel } from "@/components/admin/marketing/audiences/AudienceChannelEligibilityPanel";
import { AudienceSuppressionsPanel } from "@/components/admin/marketing/audiences/AudienceSuppressionsPanel";
import {
  AudienceOverlapAnalysisPanel,
  AudienceAuditPanel,
} from "@/components/admin/marketing/audiences/AudienceOverlapAnalysisPanel";
import { AudienceRightRail } from "@/components/admin/marketing/audiences/AudienceRightRail";

export default function MarketingAudiencesPage() {
  const [data, setData] = useState(mockMarketingAudienceData);
  const [activeTab, setActiveTab] = useState<AudienceTabId>("audiences");
  const [selectedRecord, setSelectedRecord] = useState<AudienceRecord>(
    mockMarketingAudienceData.portfolio[0]
  );
  const [searchFilter, setSearchFilter] = useState("");

  const handleRefresh = () => {
    setData({ ...mockMarketingAudienceData });
  };

  const filteredPortfolio = data.portfolio.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. HEADER */}
          <AudienceHeader onCreateAudience={() => {}} />

          {/* 2. CONTEXT STRIP */}
          <AudienceContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. TOP KPI STRIP */}
          <AudienceKpiStrip kpis={data.kpis} />

          {/* 4. TABS BAR */}
          <AudienceTabs activeTab={activeTab} onTabChange={(t) => setActiveTab(t)} />

          {/* 5. TOOLBAR */}
          <AudienceToolbar
            onSearchChange={(q) => setSearchFilter(q)}
            onResetFilters={() => setSearchFilter("")}
          />

          {/* 6. READINESS STRIP */}
          <AudienceReadinessStrip readiness={data.readiness} />

          {/* 7. AUDIENCE PORTFOLIO TABLE */}
          <AudiencePortfolioTable
            audiences={filteredPortfolio}
            selectedAudienceId={selectedRecord.id}
            onSelectAudience={(rec) => setSelectedRecord(rec)}
          />

          {/* 8. SELECTED AUDIENCE SUMMARY */}
          <SelectedAudienceSummary details={data.selectedAudience} />

          {/* 9. MIDDLE 5-PANEL GRID ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2.5 items-stretch w-full min-w-0">
            <AudienceCompositionPanel
              lifecycle={data.selectedAudience.composition.lifecycle}
              valueTier={data.selectedAudience.composition.valueTier}
            />
            <AudienceRulesPanel rules={data.selectedAudience.rules} />
            <AudienceFreshnessPanel freshness={data.selectedAudience.freshness} />
            <AudienceLinkedCampaignsPanel
              campaigns={data.selectedAudience.linkedCampaignsList}
            />
            <AudienceLinkedJourneysPanel
              journeys={data.selectedAudience.linkedJourneys}
            />
          </div>

          {/* 10. BOTTOM 4-PANEL GRID ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 items-stretch w-full min-w-0">
            <AudienceChannelEligibilityPanel
              eligibility={data.selectedAudience.channelEligibility}
            />
            <AudienceSuppressionsPanel
              suppressions={data.selectedAudience.suppressions}
            />
            <AudienceOverlapAnalysisPanel
              overlap={data.selectedAudience.overlap}
            />
            <AudienceAuditPanel audit={data.selectedAudience.audit} />
          </div>
        </main>

        {/* RIGHT OPERATIONAL RAIL */}
        <AudienceRightRail
          railData={data.rightRail}
          onRecalculateSelected={handleRefresh}
        />
      </div>
    </div>
  );
}
