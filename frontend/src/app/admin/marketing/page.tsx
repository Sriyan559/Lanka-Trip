"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MARKETING_MOCK_DATA, CampaignPortfolioItem } from "@/data/marketingCommandCenter.mock";

// Shared Components
import { MarketingPageHeader } from "@/components/admin/marketing/shared/MarketingPageHeader";
import { MarketingContextStrip } from "@/components/admin/marketing/shared/MarketingContextStrip";
import { MarketingKpiStrip } from "@/components/admin/marketing/shared/MarketingKpiCard";
import { MarketingOperationalRail } from "@/components/admin/marketing/shared/MarketingOperationalRail";

// Command Center Panels
import { MarketingPerformanceChart } from "@/components/admin/marketing/command-center/MarketingPerformanceChart";
import { CampaignOperations } from "@/components/admin/marketing/command-center/CampaignOperations";
import { ChannelPerformance } from "@/components/admin/marketing/command-center/ChannelPerformance";
import { CampaignOperationsPortfolio } from "@/components/admin/marketing/command-center/CampaignOperationsPortfolio";
import { SelectedCampaignSummary } from "@/components/admin/marketing/command-center/SelectedCampaignSummary";
import { JourneysAutomation } from "@/components/admin/marketing/command-center/JourneysAutomation";
import { BudgetSpend } from "@/components/admin/marketing/command-center/BudgetSpend";
import { ApprovalsGovernance } from "@/components/admin/marketing/command-center/ApprovalsGovernance";
import { UpcomingActivity } from "@/components/admin/marketing/command-center/UpcomingActivity";
import { JourneyAlerts } from "@/components/admin/marketing/command-center/JourneyAlerts";
import { AudienceSnapshot } from "@/components/admin/marketing/command-center/AudienceSnapshot";
import { AttributionSnapshot } from "@/components/admin/marketing/command-center/AttributionSnapshot";
import { LinkedMarketplacePromotions } from "@/components/admin/marketing/command-center/LinkedMarketplacePromotions";
import { RecentMarketingActivity } from "@/components/admin/marketing/command-center/RecentMarketingActivity";

const COMMAND_TABS = [
  { id: "overview", label: "Executive Overview", href: "/admin/marketing" },
  { id: "campaigns", label: "Campaigns", href: "/admin/marketing/campaigns" },
  { id: "audiences", label: "Audiences", href: "/admin/marketing/audiences" },
  { id: "journeys", label: "Journeys", href: "/admin/marketing/journeys" },
  { id: "channels", label: "Channels", href: "/admin/marketing/channels" },
  { id: "content", label: "Content", href: "/admin/marketing/content" },
  { id: "paid-media", label: "Paid Media", href: "/admin/marketing/paid-media" },
  { id: "web-app", label: "Web & App", href: "/admin/marketing/web-app-campaigns" },
  { id: "budget", label: "Budget", href: "/admin/marketing/budgets" },
  { id: "attribution", label: "Attribution", href: "/admin/marketing/attribution-analytics" },
  { id: "conversions", label: "Conversions", href: "/admin/marketing/attribution-analytics" },
  { id: "governance", label: "Governance", href: "/admin/marketing/governance" },
  { id: "approvals", label: "Approvals", href: "/admin/marketing/governance" },
  { id: "alerts", label: "Alerts", href: "/admin/marketing/governance" },
  { id: "audit-history", label: "Audit History", href: "/admin/marketing/reports-audit" },
];

export default function MarketingCommandCenterPage() {
  const [data, setData] = useState(MARKETING_MOCK_DATA);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignPortfolioItem | null>(
    MARKETING_MOCK_DATA.campaignPortfolio[0] || null
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

  return (
    <div className="min-h-screen bg-[#faf8f8] p-2.5 sm:p-4 text-gray-900 font-sans">
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-3.5 items-start">
        {/* MAIN COMMAND CENTER WORKSPACE */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {/* 1. PAGE HEADER */}
          <MarketingPageHeader onRefresh={handleRefresh} />

          {/* 2. MARKETING CONTEXT STRIP */}
          <MarketingContextStrip
            context={data.context}
            onRefresh={handleRefresh}
          />

          {/* 3. TOP KPI STRIP (6 CARDS) */}
          <MarketingKpiStrip kpis={data.kpis} />

          {/* 4. MARKETING COMMAND NAVIGATION TABS */}
          <div className="bg-white border border-gray-200/80 rounded-xl px-2 shadow-2xs">
            <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-100 py-1.5 text-xs font-semibold text-gray-600 scrollbar-none">
              {COMMAND_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-rose-50 text-[#800020] font-bold border border-rose-200/80 shadow-2xs"
                        : "hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 5. MARKETING PERFORMANCE & TOP OPERATIONS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Marketing Performance Chart (6 cols) */}
            <div className="lg:col-span-6">
              <MarketingPerformanceChart data={data.performanceChart} />
            </div>

            {/* Campaign Operations (3 cols) */}
            <div className="lg:col-span-3">
              <CampaignOperations items={data.campaignOperations} />
            </div>

            {/* Channel Performance (3 cols) */}
            <div className="lg:col-span-3">
              <ChannelPerformance channels={data.channelPerformance} />
            </div>
          </div>

          {/* 6. CAMPAIGN OPERATIONS PORTFOLIO & SELECTED CAMPAIGN SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
            {/* Campaign Portfolio Table (7 cols) */}
            <div className="lg:col-span-7">
              <CampaignOperationsPortfolio
                campaigns={data.campaignPortfolio}
                selectedId={selectedCampaign?.id || ""}
                onSelectCampaign={(cmp) => setSelectedCampaign(cmp)}
              />
            </div>

            {/* Selected Campaign Summary (5 cols) */}
            <div className="lg:col-span-5">
              <SelectedCampaignSummary
                campaign={selectedCampaign}
                onClose={() => setSelectedCampaign(null)}
              />
            </div>
          </div>

          {/* 7. LOWER ROW 1 (4-COLUMN GRID MATCHING IMAGE 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-start">
            <JourneysAutomation
              activeJourneys={data.journeys.activeJourneys}
              customers={data.journeys.customers}
              automatedMessages={data.journeys.automatedMessages}
              journeyConversion={data.journeys.journeyConversion}
              list={data.journeys.list}
            />

            <BudgetSpend
              totalBudget={data.budget.totalBudget}
              committed={data.budget.committed}
              actualSpend={data.budget.actualSpend}
              remaining={data.budget.remaining}
              utilizedPercent={data.budget.utilizedPercent}
              breakdown={data.budget.breakdown}
            />

            <ApprovalsGovernance
              awaitingApproval={data.governance.awaitingApproval}
              consentWarnings={data.governance.consentWarnings}
              frequencyCapExceptions={data.governance.frequencyCapExceptions}
              creativePolicyReviews={data.governance.creativePolicyReviews}
              issues={data.governance.issues}
            />

            <UpcomingActivity activities={data.upcomingActivity} />
          </div>

          {/* 8. LOWER ROW 2 (4-COLUMN GRID MATCHING IMAGE 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 items-start">
            <JourneyAlerts alerts={data.journeyAlerts} />

            <AudienceSnapshot
              marketable={data.audience.marketable}
              suppressed={data.audience.suppressed}
              highValue={data.audience.highValue}
              recentlyActive={data.audience.recentlyActive}
              atRisk={data.audience.atRisk}
              segments={data.audience.segments}
            />

            <AttributionSnapshot
              attributedRevenue={data.attribution.attributedRevenue}
              assistedRevenue={data.attribution.assistedRevenue}
              influencedOrders={data.attribution.influencedOrders}
              averageCac={data.attribution.averageCac}
              contributions={data.attribution.contributions}
            />

            <LinkedMarketplacePromotions promotions={data.linkedPromotions} />
          </div>

          {/* 9. RECENT MARKETING ACTIVITY */}
          <RecentMarketingActivity activities={data.recentActivity} />
        </main>

        {/* 10. RIGHT-SIDE MARKETING OPERATIONAL RAIL */}
        <MarketingOperationalRail railData={data.operationalRail} />
      </div>
    </div>
  );
}
