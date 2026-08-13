"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  MARKETPLACE_SELLERS_DATA,
  ChannelPerformanceRow,
  SellerPerformanceRow,
  SellerSegmentRow,
  ListingPerformanceRow,
  ListingQualityRow,
  CategoryPerformanceRow,
  SellerEconomicsRow,
  CommissionAnalyticsRow,
  SellerFulfilmentRow,
  PromotionPerformanceRow,
  ExceptionRow,
  ForecastVsTargetRow,
} from "@/data/analytics/marketplaceSellersData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { BarChart } from "@/components/analytics/charts/BarChart";
import { ScatterChart } from "@/components/analytics/charts/ScatterChart";
import { FunnelChart } from "@/components/analytics/charts/FunnelChart";
import { CohortTable } from "@/components/analytics/CohortTable";
import { MarketplaceHealthRail } from "@/components/analytics/MarketplaceHealthRail";
import { InsightList } from "@/components/analytics/InsightList";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import { Filter, RotateCcw, Save, RefreshCw, Download, ChevronDown } from "lucide-react";

export function AN06MarketplaceSellersDashboard() {
  const data = MARKETPLACE_SELLERS_DATA;
  const [activeTab, setActiveTab] = useState("Marketplace Overview");

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  // Column Definitions
  const channelCols: ColumnDef<ChannelPerformanceRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "GMV (LKR)", accessorKey: "gmv", align: "right", cellType: "currency" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "Sellers", accessorKey: "sellers", align: "right", cellType: "number" },
    { header: "Conv %", accessorKey: "convPercent", align: "right", cellType: "percentage" },
    { header: "AOV (LKR)", accessorKey: "aov", align: "right", cellType: "currency" },
    { header: "Gross %", accessorKey: "grossPercent", align: "right", cellType: "percentage" },
    { header: "Margin %", accessorKey: "marginPercent", align: "right", cellType: "percentage" },
    { header: "Retention %", accessorKey: "retentionPercent", align: "right", cellType: "percentage" },
    {
      header: "Growth %",
      accessorKey: "growth",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.growth} isPositive={row.isPositive !== false} />,
    },
  ];

  const sellerCols: ColumnDef<SellerPerformanceRow>[] = [
    { header: "Seller", accessorKey: "seller", align: "left" },
    { header: "Tier", accessorKey: "tier", align: "center" },
    { header: "GMV (LKR)", accessorKey: "gmv", align: "right", cellType: "currency" },
    { header: "Net Revenue", accessorKey: "netRevenue", align: "right", cellType: "currency" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "Conv %", accessorKey: "convPercent", align: "right", cellType: "percentage" },
    { header: "AOV (LKR)", accessorKey: "aov", align: "right", cellType: "currency" },
    { header: "F/R Rate %", accessorKey: "frRate", align: "right", cellType: "percentage" },
    { header: "SLA %", accessorKey: "slaPercent", align: "right", cellType: "percentage" },
    { header: "Return %", accessorKey: "returnPercent", align: "right", cellType: "percentage" },
    { header: "Rating", accessorKey: "rating", align: "center", cellType: "number" },
  ];

  const sellerSegmentCols: ColumnDef<SellerSegmentRow>[] = [
    { header: "Segment", accessorKey: "segment", align: "left" },
    { header: "Sellers", accessorKey: "sellers", align: "right", cellType: "number" },
    { header: "GMV (LKR)", accessorKey: "gmv", align: "right", cellType: "currency" },
    { header: "Share %", accessorKey: "sharePercent", align: "right", cellType: "percentage" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "Return %", accessorKey: "returnPercent", align: "right", cellType: "percentage" },
    {
      header: "Growth %",
      accessorKey: "growth",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.growth} isPositive={row.isPositive !== false} />,
    },
  ];

  const listingCols: ColumnDef<ListingPerformanceRow>[] = [
    { header: "Listing", accessorKey: "listing", align: "left" },
    { header: "Seller", accessorKey: "seller", align: "left" },
    { header: "Category", accessorKey: "category", align: "center" },
    { header: "Views", accessorKey: "views", align: "right", cellType: "number" },
    { header: "CTR %", accessorKey: "ctr", align: "right", cellType: "percentage" },
    { header: "Add-to-Cart %", accessorKey: "addToCart", align: "right", cellType: "percentage" },
    { header: "Conv %", accessorKey: "conv", align: "right", cellType: "percentage" },
    { header: "GMV (LKR)", accessorKey: "gmv", align: "right", cellType: "currency" },
    { header: "Return %", accessorKey: "returnPercent", align: "right", cellType: "percentage" },
    { header: "Stock", accessorKey: "stock", align: "center", cellType: "number" },
    {
      header: "Quality",
      accessorKey: "quality",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.quality === "High" ? "success" : row.quality === "Good" ? "info" : "warning"}
          label={row.quality}
        />
      ),
    },
  ];

  const listingQualityCols: ColumnDef<ListingQualityRow>[] = [
    { header: "Listing Quality", accessorKey: "quality", align: "left" },
    { header: "Listings", accessorKey: "listings", align: "right", cellType: "number" },
    { header: "Share %", accessorKey: "sharePercent", align: "right", cellType: "percentage" },
  ];

  const categoryCols: ColumnDef<CategoryPerformanceRow>[] = [
    { header: "Category", accessorKey: "category", align: "left" },
    { header: "GMV (LKR)", accessorKey: "gmv", align: "right", cellType: "currency" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "Margin %", accessorKey: "marginPercent", align: "right", cellType: "percentage" },
    { header: "Return %", accessorKey: "returnPercent", align: "right", cellType: "percentage" },
    {
      header: "Growth %",
      accessorKey: "growth",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.growth} isPositive={row.isPositive !== false} />,
    },
  ];

  const sellerEconCols: ColumnDef<SellerEconomicsRow>[] = [
    { header: "Segment", accessorKey: "segment", align: "left" },
    { header: "Avg Sales Comm %", accessorKey: "avgSalesComm", align: "right", cellType: "percentage" },
    { header: "Avg Comm %", accessorKey: "avgComm", align: "right", cellType: "percentage" },
    { header: "Net Comm %", accessorKey: "netComm", align: "right", cellType: "percentage" },
  ];

  const commCols: ColumnDef<CommissionAnalyticsRow>[] = [
    { header: "Tier", accessorKey: "tier", align: "left" },
    { header: "Seller Count", accessorKey: "sellerCount", align: "right", cellType: "number" },
    { header: "GMV (LKR)", accessorKey: "gmv", align: "right", cellType: "currency" },
    { header: "Cost Rate %", accessorKey: "costRate", align: "right", cellType: "percentage" },
    { header: "Gross Comm.", accessorKey: "grossComm", align: "right", cellType: "currency" },
    { header: "Waived", accessorKey: "waived", align: "right", cellType: "currency" },
    { header: "Net Comm.", accessorKey: "netComm", align: "right", cellType: "currency" },
    { header: "Eff Rate %", accessorKey: "effRate", align: "right", cellType: "percentage" },
    { header: "Exceptions", accessorKey: "exceptions", align: "center", cellType: "number" },
  ];

  const fulfilmentCols: ColumnDef<SellerFulfilmentRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Rate", accessorKey: "rate", align: "right", cellType: "percentage" },
    { header: "GMV", accessorKey: "gmv", align: "right", cellType: "currency" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
  ];

  const promoCols: ColumnDef<PromotionPerformanceRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
  ];

  const exceptionCols: ColumnDef<ExceptionRow>[] = [
    { header: "Code", accessorKey: "code", align: "left" },
    { header: "Exception", accessorKey: "exception", align: "left" },
    { header: "Seller/Channel", accessorKey: "sellerChannel", align: "left" },
    { header: "Metric", accessorKey: "metric", align: "center" },
    { header: "Expected", accessorKey: "expected", align: "right", cellType: "number" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "number" },
    { header: "Variance", accessorKey: "variance", align: "right", cellType: "number" },
    { header: "GMV Exposure", accessorKey: "gmvExposure", align: "right", cellType: "currency" },
    {
      header: "Severity",
      accessorKey: "severity",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.severity === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {row.severity}
        </span>
      ),
    },
    { header: "Owner", accessorKey: "owner", align: "left" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="warning" label={row.status} />,
    },
  ];

  const forecastVsTargetCols: ColumnDef<ForecastVsTargetRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Forecast", accessorKey: "forecast", align: "right", cellType: "number" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "number" },
    { header: "Variance", accessorKey: "variance", align: "right", cellType: "number" },
    {
      header: "Attainment %",
      accessorKey: "attainment",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.attainment} isPositive={row.isPositive !== false} />,
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title without "AN06" */}
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
            onClick={() => handleAction("Generate Marketplace Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors"
          >
            Generate Marketplace Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Seller Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Seller Risks
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
            onClick={() => handleAction("Run Seller Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Run Seller Forecast
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

      {/* 2. Readiness Strip */}
      <ReadinessStrip items={data.contextStrip} />

      {/* 3. Primary KPI Grid (9 KPI Cards + 1 Analytics Health Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Analytics Health */}
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

      {/* 4. Tab Navigation */}
      <TabNavigation tabs={data.tabs} activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

      {/* 5. Status / Alert Strip Row */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {data.statusAlerts.map((st, idx) => (
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

      {/* 6. Main Grid Layout (Left 9 Cols vs Right 3 Cols MarketplaceHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Sections 1 to 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 1: Marketplace GMV & Order Trend */}
            <AnalyticsPanel number="1." title="Marketplace GMV & Order Trend">
              <LineChart
                data={data.marketplaceTrend}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "gmv", name: "GMV (LKR)", color: "#800020" },
                  { key: "netRevenue", name: "Net Revenue", color: "#2563eb" },
                  { key: "orders", name: "Orders", color: "#059669" },
                  { key: "activeSellers", name: "Active Sellers", color: "#7c3aed" },
                  { key: "conversion", name: "Conversion %", color: "#d97706", strokeDasharray: "3 3" },
                ]}
              />
            </AnalyticsPanel>

            {/* Section 2: Marketplace Funnel */}
            <AnalyticsPanel number="2." title="Marketplace Funnel">
              <FunnelChart data={data.marketplaceFunnel} height={170} />
            </AnalyticsPanel>

            {/* Section 3: Seller Contribution (GMV) */}
            <AnalyticsPanel number="3." title="Seller Contribution" subtitle="GMV (LKR) / Cumulative %">
              <BarChart
                data={data.sellerContribution}
                xAxisKey="group"
                height={170}
                series={[
                  { key: "gmv", name: "GMV (LKR)", color: "#800020" },
                  { key: "cumulativePercent", name: "Cumulative %", color: "#2563eb" },
                ]}
              />
            </AnalyticsPanel>

            {/* Section 4: Channel Performance */}
            <AnalyticsPanel number="4." title="Channel Performance">
              <AnalyticsTable columns={channelCols} data={data.channelPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Sections 5 to 7 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 5: Seller Performance Portfolio */}
            <AnalyticsPanel number="5." title="Seller Performance Portfolio" className="md:col-span-1">
              <AnalyticsTable columns={sellerCols} data={data.sellerPerformance} />
            </AnalyticsPanel>

            {/* Section 6: Seller Segment Performance */}
            <AnalyticsPanel number="6." title="Seller Segment Performance" className="md:col-span-1">
              <AnalyticsTable columns={sellerSegmentCols} data={data.sellerSegmentPerformance} />
            </AnalyticsPanel>

            {/* Section 7: Seller Growth & Cohorts */}
            <AnalyticsPanel number="7." title="Seller Growth & Cohorts" className="md:col-span-1">
              <CohortTable
                data={data.sellerCohorts.map((sc) => ({
                  cohort: sc.cohort,
                  m0: sc.m0,
                  m1: sc.m1,
                  m2: sc.m2,
                  m3: sc.m3,
                  m4: sc.m4,
                  m5: sc.m5,
                  m6: 0,
                  m7: 0,
                  m8: 0,
                  m9: 0,
                  m10: 0,
                  m11: 0,
                  m12: 0,
                }))}
              />
            </AnalyticsPanel>
          </div>

          {/* Row 3: Sections 8 to 10 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 8: Listing Performance */}
            <AnalyticsPanel number="8." title="Listing Performance">
              <AnalyticsTable columns={listingCols} data={data.listingPerformance} />
            </AnalyticsPanel>

            {/* Section 9: Listing Quality */}
            <AnalyticsPanel number="9." title="Listing Quality">
              <AnalyticsTable columns={listingQualityCols} data={data.listingQuality} />
            </AnalyticsPanel>

            {/* Section 10: Category Performance */}
            <AnalyticsPanel number="10." title="Category Performance">
              <AnalyticsTable columns={categoryCols} data={data.categoryPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 4: Sections 11 to 13 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 11: Seller Economics */}
            <AnalyticsPanel number="11." title="Seller Economics">
              <AnalyticsTable columns={sellerEconCols} data={data.sellerEconomics} />
            </AnalyticsPanel>

            {/* Section 12: Commission Analytics */}
            <AnalyticsPanel number="12." title="Commission Analytics">
              <AnalyticsTable columns={commCols} data={data.commissionAnalytics} />
            </AnalyticsPanel>

            {/* Section 13: Seller Profitability Matrix */}
            <AnalyticsPanel number="13." title="Seller Profitability Matrix">
              <ScatterChart
                data={data.sellerProfitabilityMatrix.map((p) => ({ x: p.x, y: p.y, label: p.name })) as any}
                height={160}
              />
            </AnalyticsPanel>
          </div>

          {/* Row 5: Sections 14 to 17 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Section 14: Seller Fulfilment */}
            <AnalyticsPanel number="14." title="Seller Fulfilment">
              <AnalyticsTable columns={fulfilmentCols} data={data.sellerFulfilment} />
            </AnalyticsPanel>

            {/* Section 15: Seller Insights */}
            <AnalyticsPanel number="15." title="Seller Insights">
              <div className="space-y-1.5 text-[11px] text-slate-700">
                {data.sellerInsights.map((ins, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 p-1 bg-slate-50 rounded border border-slate-100">
                    <span className="text-burgundy font-bold">•</span>
                    <span>{ins}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 16: Returns & Refunds */}
            <AnalyticsPanel number="16." title="Returns &amp; Refunds">
              <div className="space-y-1.5 text-xs">
                {data.returnsRefunds.map((rr, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{rr.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{rr.value}</span>
                      <TrendIndicator value={rr.vsPrior} isPositive={rr.isPositive} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 17: Seller Experience */}
            <AnalyticsPanel number="17." title="Promotions Performance">
              <AnalyticsTable columns={promoCols} data={data.promotionsPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 6: Sections 19 to 21 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 19: Inventory Health */}
            <AnalyticsPanel number="19." title="Inventory Health">
              <div className="space-y-1.5 text-xs">
                {data.inventoryHealth.map((ih, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{ih.metric}</span>
                    <span className="font-bold text-slate-900">{ih.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 20: Seller Risk */}
            <AnalyticsPanel number="20." title="Seller Risk">
              <div className="space-y-1.5 text-xs">
                {data.sellerRisk.map((sr, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{sr.metric}</span>
                    <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">{sr.count}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 21: Seller Compliance */}
            <AnalyticsPanel number="21." title="Seller Compliance">
              <div className="space-y-1.5 text-xs">
                {data.sellerCompliance.map((sc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{sc.metric}</span>
                    <span className="font-bold text-slate-900">{sc.count}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>
          </div>

          {/* Section 22: Marketplace Exception Center */}
          <AnalyticsPanel number="22." title="Marketplace Exception Center">
            <AnalyticsTable columns={exceptionCols} data={data.exceptionsCenter} />
          </AnalyticsPanel>

          {/* Bottom Row: Sections 23 to 25 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 23: Forecast Snapshot */}
            <AnalyticsPanel number="23." title="Forecast Snapshot" subtitle="Next 30 Days">
              <div className="space-y-1.5 text-xs">
                {data.forecastSnapshot.map((fs, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{fs.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{fs.value}</span>
                      <span className="text-[10px] font-bold text-emerald-600">{fs.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 24: Forecast vs Target */}
            <AnalyticsPanel number="24." title="Forecast vs Target">
              <AnalyticsTable columns={forecastVsTargetCols} data={data.forecastVsTarget} />
            </AnalyticsPanel>

            {/* Section 25: Priority Insights */}
            <AnalyticsPanel number="25." title="Priority Insights" subtitle="Top 5">
              <InsightList insights={data.priorityInsights as any} />
            </AnalyticsPanel>
          </div>
        </div>

        {/* Right Marketplace Health Rail (3 Cols) */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <MarketplaceHealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
