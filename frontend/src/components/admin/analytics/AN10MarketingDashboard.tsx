"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  MARKETING_DATA,
  ChannelPerformanceRow,
  CampaignPortfolioRow,
  AcquisitionQualityRow,
  CreativePerformanceRow,
  PaidMediaRow,
  OnsiteMessagingRow,
  SavedMarketingView,
  UnderlyingMarketingRecord,
} from "@/data/analytics/marketingData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { ScatterChart } from "@/components/analytics/charts/ScatterChart";
import { FunnelChart } from "@/components/analytics/charts/FunnelChart";
import { MarketingHealthRail } from "@/components/analytics/MarketingHealthRail";
import { InsightList } from "@/components/analytics/InsightList";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import { Filter, RotateCcw, Save, RefreshCw, Download, ChevronDown } from "lucide-react";

export function AN10MarketingDashboard() {
  const data = MARKETING_DATA;
  const [activeTab, setActiveTab] = useState("Marketing Overview");
  const [selectedPreset, setSelectedPreset] = useState("Last 30 Days");

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  const presets = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "This Month",
    "Previous Month",
    "Quarter",
    "YTD",
    "Custom",
  ];

  // Column Definitions
  const channelCols: ColumnDef<ChannelPerformanceRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "Spend (LKR)", accessorKey: "spend", align: "right", cellType: "currency" },
    { header: "CTR", accessorKey: "ctr", align: "right", cellType: "percentage" },
    { header: "CPC (LKR)", accessorKey: "cpc", align: "right", cellType: "currency" },
    { header: "CAC (LKR)", accessorKey: "cac", align: "right", cellType: "currency" },
    { header: "Attrib. Revenue", accessorKey: "attribRevenue", align: "right", cellType: "currency" },
    { header: "ROAS", accessorKey: "roas", align: "right", cellType: "number" },
    { header: "CVR (%)", accessorKey: "cvr", align: "right", cellType: "percentage" },
    { header: "Repeat %", accessorKey: "repeatPercent", align: "right", cellType: "percentage" },
    {
      header: "Growth",
      accessorKey: "growth",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.growth} isPositive={row.isPositive !== false} />,
    },
  ];

  const campaignCols: ColumnDef<CampaignPortfolioRow>[] = [
    { header: "Campaign", accessorKey: "campaign", align: "left" },
    { header: "Type", accessorKey: "type", align: "center" },
    { header: "Audience", accessorKey: "audience", align: "center" },
    { header: "Budget (LKR)", accessorKey: "budget", align: "right", cellType: "currency" },
    { header: "Spend (LKR)", accessorKey: "spend", align: "right", cellType: "currency" },
    { header: "Pacing", accessorKey: "pacing", align: "right", cellType: "percentage" },
    { header: "CAC (LKR)", accessorKey: "cac", align: "right", cellType: "currency" },
    { header: "ROAS", accessorKey: "roas", align: "right", cellType: "number" },
    { header: "Fatigue", accessorKey: "fatigue", align: "center", cellType: "number" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.status} />,
    },
  ];

  const acqQualityCols: ColumnDef<AcquisitionQualityRow>[] = [
    { header: "Source", accessorKey: "source", align: "left" },
    { header: "New Customers", accessorKey: "newCustomers", align: "right", cellType: "number" },
    { header: "CAC (LKR)", accessorKey: "cac", align: "right", cellType: "currency" },
    { header: "Post-Order Value", accessorKey: "postOrderValue", align: "right", cellType: "currency" },
    { header: "30-Day Repeat", accessorKey: "repeat30", align: "right", cellType: "percentage" },
    { header: "90-Day Repeat", accessorKey: "repeat90", align: "right", cellType: "percentage" },
    { header: "Avg CLV", accessorKey: "avgClv", align: "right", cellType: "currency" },
    { header: "CLV/CAC", accessorKey: "clvCacRatio", align: "right", cellType: "number" },
    { header: "Margin %", accessorKey: "marginPercent", align: "right", cellType: "percentage" },
    { header: "Return Rate", accessorKey: "returnRate", align: "right", cellType: "percentage" },
    {
      header: "Rule",
      accessorKey: "cohortRule",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.cohortRule === "Good" ? "success" : "warning"}
          label={row.cohortRule}
        />
      ),
    },
  ];

  const creativeCols: ColumnDef<CreativePerformanceRow>[] = [
    { header: "Creative", accessorKey: "creative", align: "left" },
    { header: "Type", accessorKey: "type", align: "center" },
    { header: "Impressions", accessorKey: "impressions", align: "right", cellType: "number" },
    { header: "CTR", accessorKey: "ctr", align: "right", cellType: "percentage" },
    { header: "ROAS", accessorKey: "roas", align: "right", cellType: "number" },
    { header: "Frequency", accessorKey: "frequency", align: "center", cellType: "number" },
    { header: "Fatigue Score", accessorKey: "fatigueScore", align: "center", cellType: "number" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.status} />,
    },
  ];

  const paidMediaCols: ColumnDef<PaidMediaRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "Spend (LKR)", accessorKey: "spend", align: "right", cellType: "currency" },
    { header: "Impressions", accessorKey: "impressions", align: "right", cellType: "number" },
    { header: "CTR", accessorKey: "ctr", align: "right", cellType: "percentage" },
    { header: "CPC (LKR)", accessorKey: "cpc", align: "right", cellType: "currency" },
    { header: "Conversions", accessorKey: "conversions", align: "right", cellType: "number" },
    { header: "CAC (LKR)", accessorKey: "cac", align: "right", cellType: "currency" },
    { header: "ROAS", accessorKey: "roas", align: "right", cellType: "number" },
    { header: "Attrib Revenue", accessorKey: "attribRevenue", align: "right", cellType: "currency" },
  ];

  const onsiteMessagingCols: ColumnDef<OnsiteMessagingRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "Delivered", accessorKey: "delivered", align: "right", cellType: "number" },
    { header: "Open Rate", accessorKey: "openRate", align: "right", cellType: "percentage" },
    { header: "CTR", accessorKey: "ctr", align: "right", cellType: "percentage" },
    { header: "Conversions", accessorKey: "conversions", align: "right", cellType: "number" },
    { header: "Revenue (LKR)", accessorKey: "revenue", align: "right", cellType: "currency" },
    { header: "Opt-Out %", accessorKey: "optOut", align: "right", cellType: "percentage" },
    { header: "Cost (LKR)", accessorKey: "cost", align: "right", cellType: "currency" },
    { header: "ROAS", accessorKey: "roas", align: "right", cellType: "number" },
  ];

  const savedViewsCols: ColumnDef<SavedMarketingView>[] = [
    { header: "View Name", accessorKey: "viewName", align: "left" },
    { header: "Owner", accessorKey: "owner", align: "center" },
    { header: "Last Updated", accessorKey: "lastUpdated", align: "center" },
    {
      header: "Actions",
      accessorKey: "scope",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleAction(`View ${row.viewName}`)}
          className="text-burgundy font-bold text-[10px] hover:underline cursor-pointer"
        >
          Open View
        </button>
      ),
    },
  ];

  const underlyingCols: ColumnDef<UnderlyingMarketingRecord>[] = [
    { header: "Date", accessorKey: "date", align: "center" },
    { header: "Campaign", accessorKey: "campaign", align: "left" },
    { header: "ID", accessorKey: "campaignId", align: "center" },
    { header: "Channel", accessorKey: "channel", align: "center" },
    { header: "Source/Medium", accessorKey: "sourceMedium", align: "left" },
    { header: "Audience", accessorKey: "audience", align: "center" },
    { header: "Segment", accessorKey: "segment", align: "left" },
    { header: "Creative", accessorKey: "creative", align: "left" },
    { header: "Type", accessorKey: "creativeType", align: "center" },
    { header: "Spend (LKR)", accessorKey: "spend", align: "right", cellType: "currency" },
    { header: "Impressions", accessorKey: "impressions", align: "right", cellType: "number" },
    { header: "Clicks", accessorKey: "clicks", align: "right", cellType: "number" },
    { header: "CTR %", accessorKey: "ctr", align: "right", cellType: "percentage" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "Attrib Rev (LKR)", accessorKey: "attribRevenue", align: "right", cellType: "currency" },
    { header: "CAC (LKR)", accessorKey: "cac", align: "right", cellType: "currency" },
    { header: "ROAS", accessorKey: "roas", align: "right", cellType: "number" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.status} />,
    },
    {
      header: "Action",
      accessorKey: "action",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleAction(`Record ${row.campaignId}`)}
          className="text-burgundy font-bold text-[10px] hover:underline cursor-pointer"
        >
          {row.action}
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title without "AN10" */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            {data.headerMeta.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-4xl">
            {data.headerMeta.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleAction("Generate Marketing Analytics Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors"
          >
            Generate Marketing Analytics Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Campaign Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Campaign Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Channels")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Compare Channels
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Marketing Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Run Marketing Forecast
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Marketing Analytics")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Export Marketing Analytics
          </button>
          <button
            type="button"
            onClick={() => handleAction("More Actions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors inline-flex items-center gap-1"
          >
            <span>More Actions</span>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* 2. Upper Context / Connection Strip */}
      <ReadinessStrip items={data.contextStrip} />

      {/* 3. Primary KPI Grid (9 KPI Cards + 1 Marketing Analytics Health Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.primaryKpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Marketing Analytics Health */}
        <div className="an02-overall-health-card bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
            10. Analytics Health
          </span>
          <div className="my-1">
            <CircularScore score={data.analyticsHealthKpi.score} maxScore={100} size={64} strokeWidth={6} />
          </div>
          <span className="text-[11px] font-bold text-emerald-700">
            {data.analyticsHealthKpi.label}
          </span>
        </div>
      </div>

      {/* 4. Secondary KPI Strip Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-slate-50 border border-slate-200/80 rounded-lg p-2 text-xs">
        {data.secondaryKpis.map((sk) => (
          <div key={sk.id} className="bg-white border border-slate-100 p-2 rounded flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">{sk.title}</span>
            <span className="text-sm font-extrabold text-slate-900 mt-1">{sk.value}</span>
          </div>
        ))}
      </div>

      {/* 5. Tab Navigation */}
      <TabNavigation tabs={data.tabs} activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

      {/* 6. Date Range Presets Strip */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-lg p-1.5 text-xs">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setSelectedPreset(preset)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              selectedPreset === preset
                ? "bg-burgundy text-white font-bold shadow-2xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* 7. Readiness / Status Strip Row */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {data.readinessStrip.map((st, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[11px]">
                <span className="text-slate-600 font-medium">{st.label}</span>
                <span
                  className={`font-extrabold px-1 rounded ${
                    st.type === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : st.type === "danger"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {st.count}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={() => handleAction("Apply Filters")}
              className="px-3 py-1 bg-burgundy hover:bg-burgundy-dark text-white font-bold text-xs rounded shadow-xs transition-colors flex items-center gap-1"
            >
              <Filter size={11} /> Apply Filters
            </button>
            <button
              type="button"
              onClick={() => handleAction("Clear All")}
              className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1"
            >
              <RotateCcw size={11} /> Clear All
            </button>
            <button
              type="button"
              onClick={() => handleAction("Save View")}
              className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1"
            >
              <Save size={11} /> Save View
            </button>
            <button
              type="button"
              onClick={() => handleAction("Refresh")}
              className="px-2 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors"
            >
              <RefreshCw size={11} />
            </button>
            <button
              type="button"
              onClick={() => handleAction("Export")}
              className="px-2 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors"
            >
              <Download size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* 8. Main Grid Layout (Left 9 Cols vs Right 3 Cols MarketingHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Sections 1 to 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {/* Section 1: Marketing Spend & Attributed Revenue Trend */}
            <AnalyticsPanel number="1." title="Marketing Spend &amp; Attributed Revenue Trend">
              <LineChart
                data={data.marketingTrend}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "spend", name: "Spend (LKR)", color: "#800020" },
                  { key: "revenue", name: "Revenue (LKR)", color: "#2563eb" },
                  { key: "roas", name: "ROAS", color: "#059669" },
                ]}
              />
            </AnalyticsPanel>

            {/* Section 2: Marketing Conversion Funnel */}
            <AnalyticsPanel number="2." title="Marketing Conversion Funnel">
              <FunnelChart
                data={data.conversionFunnel.map((f) => ({
                  stage: f.stage,
                  volume: parseInt(f.volume.replace(/[^0-9]/g, "") || "100"),
                  conversionRate: f.conversion,
                })) as any}
                height={170}
              />
            </AnalyticsPanel>

            {/* Section 3: Channel Performance (Top 10) */}
            <AnalyticsPanel number="3." title="Channel Performance" subtitle="Top 10">
              <AnalyticsTable columns={channelCols} data={data.channelPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Section 4 - Channel Mix (4 Donut Charts) */}
          <AnalyticsPanel number="4." title="Channel Mix" subtitle="Spend, Revenue, New Customers &amp; Conversions">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-2 border border-slate-200/80 rounded text-center">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">Spend Share</span>
                <PieChart data={data.spendShareDonut} height={130} />
              </div>
              <div className="bg-slate-50 p-2 border border-slate-200/80 rounded text-center">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">Revenue Share</span>
                <PieChart data={data.revenueShareDonut} height={130} />
              </div>
              <div className="bg-slate-50 p-2 border border-slate-200/80 rounded text-center">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">New Customer Share</span>
                <PieChart data={data.newCustomerShareDonut} height={130} />
              </div>
              <div className="bg-slate-50 p-2 border border-slate-200/80 rounded text-center">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">Conversion Share</span>
                <PieChart data={data.conversionShareDonut} height={130} />
              </div>
            </div>
          </AnalyticsPanel>

          {/* Row 3: Sections 5 to 7 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 5: Campaign Performance Portfolio */}
            <AnalyticsPanel number="5." title="Campaign Performance Portfolio" subtitle="Top 5">
              <AnalyticsTable columns={campaignCols} data={data.campaignPortfolio} />
            </AnalyticsPanel>

            {/* Section 6: Acquisition Quality by Source */}
            <AnalyticsPanel number="6." title="Acquisition Quality by Source">
              <AnalyticsTable columns={acqQualityCols} data={data.acquisitionQuality} />
            </AnalyticsPanel>

            {/* Section 7: CLV vs CAC Matrix */}
            <AnalyticsPanel number="7." title="CLV vs CAC Matrix">
              <ScatterChart
                data={data.clvCacMatrix.map((cm) => ({ x: cm.x, y: cm.y, label: cm.name })) as any}
                height={170}
              />
            </AnalyticsPanel>
          </div>

          {/* Row 4: Sections 8 to 11 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 8: Creative Performance */}
            <AnalyticsPanel number="8." title="Creative Performance" subtitle="Top 5">
              <AnalyticsTable columns={creativeCols} data={data.creativePerformance} />
            </AnalyticsPanel>

            {/* Section 10: Paid Media Performance */}
            <AnalyticsPanel number="10." title="Paid Media Performance">
              <AnalyticsTable columns={paidMediaCols} data={data.paidMediaPerformance} />
            </AnalyticsPanel>

            {/* Section 11: Onsite Messaging Performance */}
            <AnalyticsPanel number="11." title="Onsite Messaging Performance">
              <AnalyticsTable columns={onsiteMessagingCols} data={data.onsiteMessaging} />
            </AnalyticsPanel>

            {/* Section 13: Saved Marketing Analytics Views */}
            <AnalyticsPanel number="13." title="Saved Marketing Analytics Views">
              <AnalyticsTable columns={savedViewsCols} data={data.savedViews} />
            </AnalyticsPanel>
          </div>

          {/* Row 5: Sections 14 to 15 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 14: Priority Insights */}
            <AnalyticsPanel number="14." title="Priority Insights" className="md:col-span-1">
              <InsightList insights={data.priorityInsights as any} />
            </AnalyticsPanel>

            {/* Section 15: Underlying Marketing Analytics Records */}
            <AnalyticsPanel number="15." title="Underlying Marketing Analytics Records" subtitle="Read Only" className="md:col-span-2">
              <AnalyticsTable columns={underlyingCols} data={data.underlyingMarketingRecords} />
            </AnalyticsPanel>
          </div>
        </div>

        {/* Right Marketing Health Rail (3 Cols) */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <MarketingHealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
