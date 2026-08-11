"use client";

import React, { useState } from "react";
import {
  mockCustomerJourneysData,
  JourneyRecord,
} from "@/data/customerJourneys.mock";
import { JourneyHeader } from "@/components/admin/marketing/journeys/JourneyHeader";
import {
  JourneyContextStrip,
  JourneyKpiStrip,
} from "@/components/admin/marketing/journeys/JourneyContextStrip";
import {
  JourneyTabs,
  JourneyTabId,
} from "@/components/admin/marketing/journeys/JourneyTabs";
import {
  JourneyToolbar,
  JourneyReadinessStrip,
} from "@/components/admin/marketing/journeys/JourneyToolbar";
import { JourneyPortfolioTable } from "@/components/admin/marketing/journeys/JourneyPortfolioTable";
import { SelectedJourneySummary } from "@/components/admin/marketing/journeys/SelectedJourneySummary";
import { JourneyFlowCanvas } from "@/components/admin/marketing/journeys/JourneyFlowCanvas";
import { JourneyStepPerformancePanel } from "@/components/admin/marketing/journeys/JourneyStepPerformancePanel";
import {
  JourneyEntryAudiencePanel,
  JourneyEntryTriggerPanel,
} from "@/components/admin/marketing/journeys/JourneyEntryAudiencePanel";
import {
  JourneyChannelExecutionPanel,
  JourneyGoalsPanel,
} from "@/components/admin/marketing/journeys/JourneyChannelExecutionPanel";
import { JourneyPerformanceChartPanel } from "@/components/admin/marketing/journeys/JourneyPerformanceChartPanel";
import {
  JourneyTimingAnalysisPanel,
  JourneyActiveExceptionsPanel,
} from "@/components/admin/marketing/journeys/JourneyTimingAnalysisPanel";
import {
  JourneyCollisionAnalysisPanel,
  JourneyExitAnalysisPanel,
  JourneyGovernancePanel,
} from "@/components/admin/marketing/journeys/JourneyCollisionAnalysisPanel";
import {
  JourneyLinkedCampaignsPanel,
  JourneyLinkedAudiencesPanel,
  JourneyRecentActivityPanel,
  JourneyVersionPanel,
} from "@/components/admin/marketing/journeys/JourneyLinkedCampaignsPanel";
import { JourneyRightRail } from "@/components/admin/marketing/journeys/JourneyRightRail";

export default function CustomerJourneysPage() {
  const [data, setData] = useState(mockCustomerJourneysData);
  const [activeTab, setActiveTab] = useState<JourneyTabId>("journeys");
  const [selectedRecord, setSelectedRecord] = useState<JourneyRecord>(
    mockCustomerJourneysData.portfolio[1] // Default selected: Abandoned Cart Recovery
  );
  const [searchFilter, setSearchFilter] = useState("");

  const handleRefresh = () => {
    setData({ ...mockCustomerJourneysData });
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
          <JourneyHeader onCreateJourney={() => {}} />

          {/* 2. CONTEXT STRIP */}
          <JourneyContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. TOP KPI STRIP */}
          <JourneyKpiStrip kpis={data.kpis} />

          {/* 4. TABS BAR */}
          <JourneyTabs activeTab={activeTab} onTabChange={(t) => setActiveTab(t)} />

          {/* 5. TOOLBAR */}
          <JourneyToolbar
            onSearchChange={(q) => setSearchFilter(q)}
            onResetFilters={() => setSearchFilter("")}
            onApplyFilters={handleRefresh}
          />

          {/* 6. READINESS STRIP */}
          <JourneyReadinessStrip readiness={data.readiness} />

          {/* 7. JOURNEY PORTFOLIO TABLE */}
          <JourneyPortfolioTable
            journeys={filteredPortfolio}
            selectedJourneyId={selectedRecord.id}
            onSelectJourney={(rec) => setSelectedRecord(rec)}
          />

          {/* 8. SELECTED JOURNEY SUMMARY WORKSPACE */}
          <SelectedJourneySummary details={data.selectedJourney} />

          {/* 9. JOURNEY FLOW CANVAS */}
          <JourneyFlowCanvas />

          {/* 10. MIDDLE 5-PANEL GRID ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)_minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2.5 items-stretch w-full min-w-0">
            <JourneyStepPerformancePanel
              steps={data.selectedJourney.stepPerformance}
            />
            <JourneyEntryAudiencePanel
              audience={data.selectedJourney.entryAudience}
            />
            <JourneyEntryTriggerPanel
              trigger={data.selectedJourney.entryTrigger}
            />
            <JourneyChannelExecutionPanel
              channels={data.selectedJourney.channelExecution}
            />
            <JourneyGoalsPanel goals={data.selectedJourney.goals} />
          </div>

          {/* 11. SECOND OPERATIONAL ROW (JOURNEY PERFORMANCE CHART + 4 PANELS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.8fr)] gap-2.5 items-stretch w-full min-w-0">
            <JourneyPerformanceChartPanel
              chartData={data.selectedJourney.performanceChart}
              summary={data.selectedJourney.performanceSummary}
            />
            <JourneyTimingAnalysisPanel
              timing={data.selectedJourney.timingAnalysis}
            />
            <JourneyActiveExceptionsPanel
              exceptions={data.selectedJourney.exceptions}
            />
            <JourneyCollisionAnalysisPanel
              collision={data.selectedJourney.collision}
            />
            <JourneyExitAnalysisPanel
              exitAnalysis={data.selectedJourney.exitAnalysis}
            />
          </div>

          {/* 12. BOTTOM ROW (GOVERNANCE, LINKED CAMPAIGNS, LINKED AUDIENCES, ACTIVITY, VERSION) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5 items-stretch w-full min-w-0">
            <JourneyGovernancePanel
              governance={data.selectedJourney.governance}
            />
            <JourneyLinkedCampaignsPanel
              campaigns={data.selectedJourney.linkedCampaigns}
            />
            <JourneyLinkedAudiencesPanel
              audiences={data.selectedJourney.linkedAudiences}
            />
            <JourneyRecentActivityPanel
              activity={data.selectedJourney.recentActivity}
            />
            <JourneyVersionPanel version={data.selectedJourney.version} />
          </div>
        </main>

        {/* RIGHT OPERATIONAL RAIL */}
        <JourneyRightRail
          railData={data.rightRail}
          onRecalculateSelected={handleRefresh}
        />
      </div>
    </div>
  );
}
