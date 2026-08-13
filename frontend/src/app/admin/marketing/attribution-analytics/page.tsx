"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getMarketingAttribution } from "@/services/marketingAttributionService";

import { AttributionHeader } from "@/components/admin/marketing/attribution/AttributionHeader";
import { AttributionContextStrip } from "@/components/admin/marketing/attribution/AttributionContextStrip";
import { AttributionKpiStrip } from "@/components/admin/marketing/attribution/AttributionKpiStrip";
import { AttributionTabs } from "@/components/admin/marketing/attribution/AttributionTabs";
import {
  AttributionFilterBar,
  AttributionFilterState,
  INITIAL_ATTRIBUTION_FILTERS,
} from "@/components/admin/marketing/attribution/AttributionFilterBar";
import { AttributionReadinessStrip } from "@/components/admin/marketing/attribution/AttributionReadinessStrip";

import { MarketingPerformanceChart } from "@/components/admin/marketing/attribution/overview/MarketingPerformanceChart";
import { AttributionModelCard } from "@/components/admin/marketing/attribution/overview/AttributionModelCard";
import { ChannelContributionChart } from "@/components/admin/marketing/attribution/overview/ChannelContributionChart";
import { ChannelPerformanceTable } from "@/components/admin/marketing/attribution/overview/ChannelPerformanceTable";

import { CampaignPerformanceTable } from "@/components/admin/marketing/attribution/overview/CampaignPerformanceTable";
import { DirectVsAssistedContribution } from "@/components/admin/marketing/attribution/overview/DirectVsAssistedContribution";
import { JourneyPositionAnalysis } from "@/components/admin/marketing/attribution/overview/JourneyPositionAnalysis";
import { AcquisitionIntelligenceCard } from "@/components/admin/marketing/attribution/overview/AcquisitionIntelligenceCard";

import { CustomerLifecycleImpactTable } from "@/components/admin/marketing/attribution/overview/CustomerLifecycleImpactTable";
import { JourneyContributionTable } from "@/components/admin/marketing/attribution/overview/JourneyContributionTable";
import { WebAppContributionTable } from "@/components/admin/marketing/attribution/overview/WebAppContributionTable";
import { ContentContributionTable } from "@/components/admin/marketing/attribution/overview/ContentContributionTable";

import { PaidMediaMeasurementComparisonTable } from "@/components/admin/marketing/attribution/overview/PaidMediaMeasurementComparisonTable";
import { AttributionModelComparisonTable } from "@/components/admin/marketing/attribution/overview/AttributionModelComparisonTable";
import { ConversionTimingChart } from "@/components/admin/marketing/attribution/overview/ConversionTimingChart";
import { IdentityResolutionCard } from "@/components/admin/marketing/attribution/overview/IdentityResolutionCard";

import { TrackingDataQualityCard } from "@/components/admin/marketing/attribution/overview/TrackingDataQualityCard";
import { IncrementalityLiftCard } from "@/components/admin/marketing/attribution/overview/IncrementalityLiftCard";
import { SpendEfficiencyTable } from "@/components/admin/marketing/attribution/overview/SpendEfficiencyTable";
import { BusinessPerformanceTable } from "@/components/admin/marketing/attribution/overview/BusinessPerformanceTable";
import { FinanceRevenueAlignmentCard } from "@/components/admin/marketing/attribution/overview/FinanceRevenueAlignmentCard";
import { AttributionGovernanceCard } from "@/components/admin/marketing/attribution/overview/AttributionGovernanceCard";

import { AttributionModelVersionCard } from "@/components/admin/marketing/attribution/overview/AttributionModelVersionCard";
import { AnalyticsActivityTable } from "@/components/admin/marketing/attribution/overview/AnalyticsActivityTable";
import { AnalyticsExceptionsSummaryTable } from "@/components/admin/marketing/attribution/overview/AnalyticsExceptionsSummaryTable";

import { AttributionOperationsRail } from "@/components/admin/marketing/attribution/rail/AttributionOperationsRail";

export default function MarketingAttributionPage() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState<AttributionFilterState>(INITIAL_ATTRIBUTION_FILTERS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh=useCallback(async()=>{setLoading(true);try{setData(await getMarketingAttribution(filters));setError(null);}catch(e:any){setError(e?.message??'Unable to load attribution analytics.');}finally{setLoading(false);}},[filters]);
  useEffect(()=>{void handleRefresh();const timer=setInterval(()=>void handleRefresh(),30000);return()=>clearInterval(timer);},[handleRefresh]);
  if(!data)return <div className="min-h-screen bg-[#faf8f8] p-4 text-sm text-gray-600">{error||'Loading attribution analytics…'}</div>;

  const handleFilterChange = (key: keyof AttributionFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_ATTRIBUTION_FILTERS);
  };

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <AttributionHeader onGenerateReport={handleRefresh} />

          {/* 2. CONTEXT STRIP */}
          <AttributionContextStrip context={data.context} onRefresh={handleRefresh} />

          {/* 3. KPI STRIP (8 CARDS) */}
          <AttributionKpiStrip kpis={data.kpis} />

          {/* 4. NAVIGATION TABS (12 TABS) */}
          <AttributionTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 5. FILTER BAR */}
          <AttributionFilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* 6. READINESS OVERVIEW */}
          <AttributionReadinessStrip
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
              {/* ANALYTICS MODULES GRID (5 ROWS + BOTTOM ROW) */}
              <div className="flex flex-col gap-3">
                {/* ROW 1: Marketing Performance Chart (lg:col-span-2), Attribution Model, Channel Contribution, Channel Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-stretch">
                  <div className="md:col-span-2">
                    <MarketingPerformanceChart trendData={data.performanceTrend} />
                  </div>
                  <AttributionModelCard />
                  <ChannelContributionChart channels={data.channelContribution} />
                </div>

                {/* ROW 1.5: Full-width Channel Performance Table */}
                <ChannelPerformanceTable channels={data.channelPerformance} />

                {/* ROW 2: Campaign Performance, Direct vs Assisted, Journey Position, Acquisition Intelligence */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
                  <div className="md:col-span-2">
                    <CampaignPerformanceTable campaigns={data.campaignPerformance} />
                  </div>
                  <DirectVsAssistedContribution data={data.directVsAssisted} />
                  <JourneyPositionAnalysis items={data.journeyPosition} />
                </div>

                {/* Acquisition Intelligence Row */}
                <AcquisitionIntelligenceCard acquisition={data.acquisitionIntelligence} />

                {/* ROW 3: Customer Lifecycle Impact, Journey Contribution, Web & App Contribution, Content Contribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
                  <CustomerLifecycleImpactTable items={data.lifecycleImpact} />
                  <JourneyContributionTable journeys={data.journeyContribution} />
                  <WebAppContributionTable experiences={data.webAppContribution} />
                  <ContentContributionTable contentList={data.contentContribution} />
                </div>

                {/* ROW 4: Paid Media Measurement Comparison, Attribution Model Comparison, Conversion Timing, Identity Resolution */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
                  <PaidMediaMeasurementComparisonTable comparisons={data.paidMediaComparison} />
                  <AttributionModelComparisonTable comparisonList={data.modelComparison} />
                  <ConversionTimingChart timingPoints={data.conversionTiming} />
                  <IdentityResolutionCard identity={data.identityResolution} />
                </div>

                {/* ROW 5: Tracking & Data Quality, Incrementality & Lift, Spend Efficiency, Business Performance, Finance Alignment, Attribution Governance */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 items-stretch">
                  <TrackingDataQualityCard tracking={data.trackingQuality} />
                  <IncrementalityLiftCard liftItems={data.incrementalityLift} />
                  <SpendEfficiencyTable efficiencyItems={data.spendEfficiency} />
                  <BusinessPerformanceTable businessItems={data.businessPerformance} />
                  <FinanceRevenueAlignmentCard finance={data.financeAlignment} />
                  <AttributionGovernanceCard governance={data.governance} />
                </div>

                {/* BOTTOM ROW: Attribution Model Version, Recent Analytics Activity, Exceptions Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                  <AttributionModelVersionCard versionInfo={data.modelVersion} />
                  <AnalyticsActivityTable activityLog={data.recentActivity} />
                  <AnalyticsExceptionsSummaryTable exceptionsSummary={data.exceptionsSummary} />
                </div>
              </div>
            </>
          )}
        </main>

        {/* 10. RIGHT OPERATIONAL RAIL */}
        <AttributionOperationsRail railData={data.rail} onGenerateReport={handleRefresh} />
      </div>
    </div>
  );
}
