"use client";

import React, { useState } from "react";
import { mockCampaignDetailData } from "@/data/campaignDetail.mock";
import { CampaignDetailHeader } from "@/components/admin/marketing/campaign-detail/CampaignDetailHeader";
import { CampaignDetailContextStrip } from "@/components/admin/marketing/campaign-detail/CampaignDetailContextStrip";
import { CampaignDetailKpiStrip } from "@/components/admin/marketing/campaign-detail/CampaignDetailKpiStrip";
import { CampaignDetailTabs, Mk03TabId } from "@/components/admin/marketing/campaign-detail/CampaignDetailTabs";
import { CampaignOverviewPanel } from "@/components/admin/marketing/campaign-detail/CampaignOverviewPanel";
import { CampaignObjectivesPanel } from "@/components/admin/marketing/campaign-detail/CampaignObjectivesPanel";
import { CampaignPerformanceChartPanel } from "@/components/admin/marketing/campaign-detail/CampaignPerformanceChartPanel";
import { CampaignAudiencePanel } from "@/components/admin/marketing/campaign-detail/CampaignAudiencePanel";
import { CampaignChannelPerformancePanel } from "@/components/admin/marketing/campaign-detail/CampaignChannelPerformancePanel";
import { CampaignContentCreativePanel } from "@/components/admin/marketing/campaign-detail/CampaignContentCreativePanel";
import { CampaignBudgetSpendPanel } from "@/components/admin/marketing/campaign-detail/CampaignBudgetSpendPanel";
import { CampaignAttributionPanel } from "@/components/admin/marketing/campaign-detail/CampaignAttributionPanel";
import { CampaignGovernancePanel } from "@/components/admin/marketing/campaign-detail/CampaignGovernancePanel";
import { CampaignActiveExceptionsPanel } from "@/components/admin/marketing/campaign-detail/CampaignActiveExceptionsPanel";
import { CampaignLinkedPromotionsPanel } from "@/components/admin/marketing/campaign-detail/CampaignLinkedPromotionsPanel";
import { CampaignRelatedJourneysPanel } from "@/components/admin/marketing/campaign-detail/CampaignRelatedJourneysPanel";
import { CampaignDeliveryHealthPanel } from "@/components/admin/marketing/campaign-detail/CampaignDeliveryHealthPanel";
import { CampaignRecentActivityPanel } from "@/components/admin/marketing/campaign-detail/CampaignRecentActivityPanel";
import { CampaignAuditSummaryPanel } from "@/components/admin/marketing/campaign-detail/CampaignAuditSummaryPanel";
import { CampaignDetailRightRail } from "@/components/admin/marketing/campaign-detail/CampaignDetailRightRail";

export default function CampaignDetailPage({
  params,
}: {
  params: { campaignId: string };
}) {
  const [data, setData] = useState(mockCampaignDetailData);
  const [activeTab, setActiveTab] = useState<Mk03TabId>("overview");

  const handleRefresh = () => {
    setData({ ...mockCampaignDetailData });
  };

  // Derive display code (e.g. MKT-2026-0087 if generic parameter)
  const displayCode = params.campaignId.startsWith("MKT") ? params.campaignId : "MKT-2026-0087";

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN CAMPAIGN DETAIL WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. HEADER */}
          <CampaignDetailHeader
            header={{
              ...data.header,
              id: params.campaignId,
              code: displayCode,
            }}
          />

          {/* 2. CONTEXT STRIP */}
          <CampaignDetailContextStrip
            context={data.context}
            onRefresh={handleRefresh}
          />

          {/* 3. KPI SUMMARY STRIP */}
          <CampaignDetailKpiStrip kpis={data.kpis} />

          {/* 4. DETAIL TABS BAR */}
          <CampaignDetailTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* 5. MAIN WORKSPACE GRID LAYOUT */}
          {/* ROW 1: Overview (~30%), Objectives & Targets (~28%), Campaign Performance (~42%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.15fr)_minmax(0,1.65fr)] gap-2.5 items-stretch w-full min-w-0">
            <CampaignOverviewPanel overview={data.overview} />
            <CampaignObjectivesPanel objectives={data.objectives} />
            <CampaignPerformanceChartPanel
              chartData={data.performance.chartData}
              summary={data.performance.summary}
            />
          </div>

          {/* ROW 2: Audience (~30%), Channel Performance (~28%), Content & Creative (~42%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.15fr)_minmax(0,1.65fr)] gap-2.5 items-stretch w-full min-w-0">
            <CampaignAudiencePanel audience={data.audience} />
            <CampaignChannelPerformancePanel channels={data.channelPerformance} />
            <CampaignContentCreativePanel items={data.contentCreative} />
          </div>

          {/* ROW 3: Budget & Spend (~30%), Attribution (~28%), Governance & Approvals (~42%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.15fr)_minmax(0,1.65fr)] gap-2.5 items-stretch w-full min-w-0">
            <CampaignBudgetSpendPanel budget={data.budgetSpend} />
            <CampaignAttributionPanel attribution={data.attribution} />
            <CampaignGovernancePanel governance={data.governance} />
          </div>

          {/* ROW 4: Active Exceptions, Linked Promotions, Related Journeys */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 items-stretch w-full min-w-0">
            <CampaignActiveExceptionsPanel exceptions={data.activeExceptions} />
            <CampaignLinkedPromotionsPanel promotions={data.linkedPromotions} />
            <CampaignRelatedJourneysPanel journeys={data.relatedJourneys} />
          </div>

          {/* ROW 5: Delivery & Integration Health, Recent Activity, Audit Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 items-stretch w-full min-w-0">
            <CampaignDeliveryHealthPanel health={data.deliveryHealth} />
            <CampaignRecentActivityPanel activities={data.recentActivity} />
            <CampaignAuditSummaryPanel audit={data.auditSummary} />
          </div>
        </main>

        {/* RIGHT OPERATIONAL RAIL */}
        <CampaignDetailRightRail
          railData={data.rightRail}
          campaignId={params.campaignId}
        />
      </div>
    </div>
  );
}
