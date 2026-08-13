"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  CUSTOMERS_SEGMENTS_DATA,
  SegmentPerformanceRow,
  HighValueCustomerRow,
  RetentionPerformanceRow,
  ChurnRiskCustomerRow,
  RfmRow,
  ClvCacSourceRow,
  AcquisitionQualityRow,
  RevenueConcentrationRow,
  CrossSellOpportunityRow,
  GeoPreferenceRow,
  CustomerSupportMetricRow,
  CustomerExceptionRow,
  ForecastVsTargetRow,
} from "@/data/analytics/customersSegmentsData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { CohortTable } from "@/components/analytics/CohortTable";
import { CustomerHealthRail } from "@/components/analytics/CustomerHealthRail";
import { InsightList } from "@/components/analytics/InsightList";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import { Filter, RotateCcw, Save, RefreshCw, Download, ChevronDown, X, CheckCircle } from "lucide-react";

export function AN05CustomersSegmentsDashboard() {
  const data = CUSTOMERS_SEGMENTS_DATA;
  const [filterChips, setFilterChips] = useState<string[]>(data.activeFilters);

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  const removeFilterChip = (chip: string) => {
    setFilterChips((prev) => prev.filter((c) => c !== chip));
  };

  // Full 8-column Segment Performance Table
  const fullSegmentCols: ColumnDef<SegmentPerformanceRow>[] = [
    { header: "Segment", accessorKey: "segment", align: "left" },
    { header: "Customers", accessorKey: "customers", align: "right", cellType: "number" },
    { header: "Revenue (LKR)", accessorKey: "revenue", align: "right", cellType: "currency" },
    { header: "AOV (LKR)", accessorKey: "aov", align: "right", cellType: "currency" },
    { header: "Frequency", accessorKey: "frequency", align: "right", cellType: "number" },
    { header: "Retention %", accessorKey: "retention", align: "right", cellType: "percentage" },
    { header: "Churn %", accessorKey: "churn", align: "right", cellType: "percentage" },
    {
      header: "Growth",
      accessorKey: "growth",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.growth} isPositive={row.isPositive !== false} />,
    },
  ];

  const highValueCols: ColumnDef<HighValueCustomerRow>[] = [
    { header: "Customer", accessorKey: "customer", align: "left" },
    { header: "Segment", accessorKey: "segment", align: "center" },
    { header: "Revenue (LKR)", accessorKey: "revenue", align: "right", cellType: "currency" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "AOV (LKR)", accessorKey: "aov", align: "right", cellType: "currency" },
    { header: "Loyalty Tier", accessorKey: "loyaltyTier", align: "center" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.status} />,
    },
  ];

  const retentionCols: ColumnDef<RetentionPerformanceRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "May 2026", accessorKey: "may2026", align: "right", cellType: "percentage" },
    { header: "Apr 2026", accessorKey: "apr2026", align: "right", cellType: "percentage" },
    {
      header: "Change",
      accessorKey: "change",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.change} isPositive={row.isPositive !== false} />,
    },
  ];

  const churnRiskCols: ColumnDef<ChurnRiskCustomerRow>[] = [
    { header: "Customer", accessorKey: "customer", align: "left" },
    {
      header: "Risk Score",
      accessorKey: "riskScore",
      align: "center",
      renderCell: (row) => (
        <span className="font-extrabold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
          {row.riskScore}
        </span>
      ),
    },
    { header: "CLV (Pred.)", accessorKey: "clvPred", align: "right", cellType: "currency" },
    { header: "Last Order", accessorKey: "lastOrder", align: "center" },
    { header: "Reason", accessorKey: "reason", align: "left" },
  ];

  const rfmCols: ColumnDef<RfmRow>[] = [
    { header: "RFM Score", accessorKey: "score", align: "left" },
    { header: "Customers", accessorKey: "customers", align: "right", cellType: "number" },
    { header: "%", accessorKey: "percent", align: "right", cellType: "percentage" },
    { header: "Revenue (LKR)", accessorKey: "revenue", align: "right", cellType: "currency" },
    { header: "Revenue %", accessorKey: "revenuePercent", align: "right", cellType: "percentage" },
  ];

  const clvCacCols: ColumnDef<ClvCacSourceRow>[] = [
    { header: "Source", accessorKey: "source", align: "left" },
    { header: "Customers", accessorKey: "customers", align: "right", cellType: "number" },
    { header: "Revenue (LKR)", accessorKey: "revenue", align: "right", cellType: "currency" },
    { header: "CAC (LKR)", accessorKey: "cac", align: "right", cellType: "currency" },
    { header: "CLV/CAC", accessorKey: "clvCacRatio", align: "right", cellType: "number" },
  ];

  const acqQualityCols: ColumnDef<AcquisitionQualityRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "Quality Score", accessorKey: "qualityScore", align: "center" },
    { header: "Retention (30D)", accessorKey: "retention30d", align: "right", cellType: "percentage" },
    { header: "Churn (30D)", accessorKey: "churn30d", align: "right", cellType: "percentage" },
  ];

  const revenueConcCols: ColumnDef<RevenueConcentrationRow>[] = [
    { header: "Customer Tier", accessorKey: "tier", align: "left" },
    { header: "Customers", accessorKey: "customers", align: "right", cellType: "number" },
    { header: "Revenue (LKR)", accessorKey: "revenue", align: "right", cellType: "currency" },
    { header: "Revenue %", accessorKey: "revenuePercent", align: "right", cellType: "percentage" },
  ];

  const crossSellCols: ColumnDef<CrossSellOpportunityRow>[] = [
    { header: "Opportunity", accessorKey: "opportunity", align: "left" },
    { header: "Customers", accessorKey: "customers", align: "right", cellType: "number" },
  ];

  const geoCols: ColumnDef<GeoPreferenceRow>[] = [
    { header: "Top Geography", accessorKey: "geography", align: "left" },
    { header: "Customers", accessorKey: "customers", align: "right", cellType: "number" },
    { header: "Primary Channel", accessorKey: "primaryChannel", align: "center" },
  ];

  const supportCols: ColumnDef<CustomerSupportMetricRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
  ];

  const exceptionCols: ColumnDef<CustomerExceptionRow>[] = [
    { header: "Customer ID", accessorKey: "customerID", align: "left" },
    { header: "Customer", accessorKey: "customerName", align: "left" },
    { header: "Segment", accessorKey: "segment", align: "center" },
    {
      header: "Risk Level",
      accessorKey: "riskLevel",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.riskLevel === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {row.riskLevel}
        </span>
      ),
    },
    { header: "CLV (Pred.)", accessorKey: "clvPred", align: "right", cellType: "currency" },
    { header: "Last Order Date", accessorKey: "lastOrderDate", align: "center" },
    { header: "Days Since Order", accessorKey: "daysSinceOrder", align: "center" },
    { header: "Churn Risk", accessorKey: "churnRisk", align: "center" },
    { header: "Loyalty Tier", accessorKey: "loyaltyTier", align: "center" },
    { header: "Total Revenue (LKR)", accessorKey: "totalRevenue", align: "right", cellType: "currency" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "Avg Order Value (LKR)", accessorKey: "aov", align: "right", cellType: "currency" },
    { header: "Support Tickets", accessorKey: "supportTickets", align: "center" },
    { header: "NPS Score", accessorKey: "npsScore", align: "center" },
    { header: "Region", accessorKey: "region", align: "left" },
    { header: "Channel", accessorKey: "channel", align: "center" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="warning" label={row.status} />,
    },
  ];

  const forecastVsTargetCols: ColumnDef<ForecastVsTargetRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "number" },
    { header: "Forecast", accessorKey: "forecast", align: "right", cellType: "number" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "number" },
    {
      header: "vs Target",
      accessorKey: "vsTarget",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsTarget} isPositive={row.isPositive !== false} />,
    },
  ];

  // Colors and counts matching Card 2 reference screenshot
  const compositionData = [
    { name: "Loyal Customers", value: 42.8, count: 12150, color: "#2563eb" },
    { name: "Potential Loyalists", value: 24.1, count: 6850, color: "#059669" },
    { name: "At Risk", value: 15.8, count: 4490, color: "#f59e0b" },
    { name: "New Customers", value: 10.6, count: 3012, color: "#ea580c" },
    { name: "Churned", value: 6.7, count: 1911, color: "#800020" },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title without "AN05" */}
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
            onClick={() => handleAction("Generate Customer Report")}
            className="px-4 py-1.5 text-white border border-[#3e0513] bg-[linear-gradient(180deg,#600c20_0%,#9e2040_45%,#50081a_100%)] text-xs font-bold rounded-full shadow-md transition-colors cursor-pointer hover:brightness-110"
          >
            Generate Customer Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Churn Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Review Churn Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Retention Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Run Retention Forecast
          </button>
          <button
            type="button"
            onClick={() => handleAction("More Actions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>More Actions</span>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* 2. Context / Reporting Strip */}
      <ReadinessStrip items={data.contextStrip} />

      {/* 3. Top KPI Cards Row (9 metric cards + Customer Analytics Health card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Customer Analytics Health */}
        <div className="an02-overall-health-card bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
            Customer Analytics Health
          </span>
          <div className="my-1 text-emerald-600 flex items-center gap-1">
            <CheckCircle size={16} />
            <span className="text-xs font-extrabold">{data.customerHealthKpi.scoreLabel}</span>
          </div>
          <span className="text-[9.5px] font-medium text-slate-400">
            {data.customerHealthKpi.subtext}
          </span>
        </div>
      </div>

      {/* 4. Filter Bar + Active Filter Chips */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-xs space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-col gap-0.5 min-w-[95px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Reporting Period</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>May 1 – May 31, 2026</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[105px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Comparison Period</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>Apr 1 – Apr 30, 2026</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[70px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Region</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All Regions</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[75px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Sales Channel</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All Channels</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Customer Source</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All Sources</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Segment</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All Segments</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[75px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Loyalty Tier</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All Tiers</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Customer Group</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All Groups</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[60px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Gender</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[65px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Age Band</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Date Granularity</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>Daily</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Filters:</span>
            {filterChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-800 border border-orange-200 rounded-full text-[10.5px] font-semibold"
              >
                <span>{chip}</span>
                <button type="button" onClick={() => removeFilterChip(chip)} className="hover:text-rose-600">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={() => handleAction("Apply Filters")}
              className="px-3 py-1 bg-burgundy hover:bg-burgundy-dark text-white font-bold text-xs rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Filter size={11} /> Apply Filters
            </button>
            <button
              type="button"
              onClick={() => handleAction("Clear All")}
              className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={11} /> Clear All
            </button>
            <button
              type="button"
              onClick={() => handleAction("Save View")}
              className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Save size={11} /> Save View
            </button>
            <button
              type="button"
              onClick={() => handleAction("Refresh")}
              className="px-2 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              <RefreshCw size={11} />
            </button>
            <button
              type="button"
              onClick={() => handleAction("Export")}
              className="px-2 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              <Download size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Main Grid Layout (Left 9 Cols vs Right 3 Cols CustomerHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Analytics Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Sections 1 to 4 with Proportional Grid Widths */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Section 1: Customer Growth & Retention Trend (3 Cols) */}
            <div className="md:col-span-3">
              <AnalyticsPanel number="1." title="Customer Growth &amp; Retention Trend">
                <LineChart
                  data={data.customerTrend}
                  xAxisKey="date"
                  height={170}
                  showLegend={true}
                  legendPosition="top"
                  rightYAxis={true}
                  series={[
                    { key: "activeCustomers", name: "Active Customers", color: "#9333ea" },
                    { key: "newCustomers", name: "New Customers", color: "#16a34a" },
                    { key: "returningCustomers", name: "Returning Customers", color: "#d946ef" },
                    { key: "retentionRate", name: "Retention Rate (30D)", color: "#dc2626", strokeDasharray: "3 3", yAxisId: "right" },
                  ]}
                />
              </AnalyticsPanel>
            </div>

            {/* Section 2: Customer Base Composition (3 Cols) */}
            <div className="md:col-span-3">
              <AnalyticsPanel number="2." title="Customer Base Composition">
                <PieChart data={compositionData} centerText="28,416" centerSubtext="Total" height={170} />
              </AnalyticsPanel>
            </div>

            {/* Section 3: Segment Performance (4 Cols — Wide for 8 Columns) */}
            <div className="md:col-span-4">
              <AnalyticsPanel number="3." title="Segment Performance" subtitle="vs Apr 2026">
                <AnalyticsTable columns={fullSegmentCols} data={data.segmentPerformance} />
              </AnalyticsPanel>
            </div>

            {/* Section 4: CLV Distribution (2 Cols — Compact Bar Component) */}
            <div className="md:col-span-2">
              <AnalyticsPanel number="4." title="CLV Distribution">
                <HorizontalBarChart
                  data={data.clvDistribution.map((d) => ({
                    tier: d.band,
                    priceVsMarket: `${d.customers.toLocaleString()} cust`,
                    skuPercent: d.revenueShare,
                  }))}
                  leftHeaderTitle="CLV Band"
                  rightHeaderTitle="Customers &amp; Share"
                  height={170}
                />
              </AnalyticsPanel>
            </div>
          </div>

          {/* Row 2: Sections 5 to 9 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Section 5: High-Value Customer Portfolio */}
            <AnalyticsPanel number="5." title="High-Value Customer Portfolio" className="xl:col-span-1">
              <AnalyticsTable columns={highValueCols} data={data.highValueCustomers} />
            </AnalyticsPanel>

            {/* Section 6: Retention Performance */}
            <AnalyticsPanel number="6." title="Retention Performance" subtitle="vs Apr 2026" className="xl:col-span-1">
              <AnalyticsTable columns={retentionCols} data={data.retentionPerformance} />
            </AnalyticsPanel>

            {/* Section 7: Customer Cohort Retention */}
            <AnalyticsPanel number="7." title="Customer Cohort Retention" subtitle="by Acquisition Month" className="xl:col-span-1">
              <CohortTable data={data.cohortData} />
            </AnalyticsPanel>

            {/* Section 8: Churn Analysis */}
            <AnalyticsPanel number="8." title="Churn Analysis" className="xl:col-span-1">
              <div className="space-y-1.5 text-xs">
                {data.churnAnalysis.map((ca, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{ca.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{ca.value}</span>
                      <TrendIndicator value={ca.change} isPositive={ca.isPositive} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 9: Churn-Risk Portfolio */}
            <AnalyticsPanel number="9." title="Churn-Risk Portfolio" className="xl:col-span-1">
              <AnalyticsTable columns={churnRiskCols} data={data.churnRiskPortfolio} />
            </AnalyticsPanel>
          </div>

          {/* Row 3: Sections 10 to 14 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Section 10: RFM Analysis */}
            <AnalyticsPanel number="10." title="RFM Analysis" className="xl:col-span-1">
              <AnalyticsTable columns={rfmCols} data={data.rfmAnalysis} highlightTotalRow={true} />
            </AnalyticsPanel>

            {/* Section 11: Purchase Behavior */}
            <AnalyticsPanel number="11." title="Purchase Behavior" className="xl:col-span-1">
              <div className="space-y-1.5 text-xs">
                {data.purchaseBehavior.map((pb, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{pb.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{pb.value}</span>
                      <TrendIndicator value={pb.vsPrior} isPositive={pb.isPositive} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 12: Customer Profitability */}
            <AnalyticsPanel number="12." title="Customer Profitability" className="xl:col-span-1">
              <div className="space-y-1.5 text-xs">
                {data.customerProfitability.map((cp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{cp.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{cp.value}</span>
                      <TrendIndicator value={cp.vsPrior} isPositive={cp.isPositive} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 13: CLV vs CAC by Acquisition Source */}
            <AnalyticsPanel number="13." title="CLV vs CAC" subtitle="by Acquisition Source" className="xl:col-span-1">
              <AnalyticsTable columns={clvCacCols} data={data.clvCacSource} />
            </AnalyticsPanel>

            {/* Section 14: Acquisition Quality */}
            <AnalyticsPanel number="14." title="Acquisition Quality" className="xl:col-span-1">
              <AnalyticsTable columns={acqQualityCols} data={data.acquisitionQuality} />
            </AnalyticsPanel>
          </div>

          {/* Row 4: Sections 15 to 19 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Section 15: Loyalty Analytics */}
            <AnalyticsPanel number="15." title="Loyalty Analytics" className="xl:col-span-1">
              <div className="space-y-1.5 text-xs">
                {data.loyaltyAnalyticsLeft.map((la, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{la.metric}</span>
                    <span className="font-bold text-slate-900">{la.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 16: Revenue Concentration */}
            <AnalyticsPanel number="16." title="Revenue Concentration" className="xl:col-span-1">
              <AnalyticsTable columns={revenueConcCols} data={data.revenueConcentration} />
            </AnalyticsPanel>

            {/* Section 17: Category & Brand Affinity */}
            <AnalyticsPanel number="17." title="Category &amp; Brand Affinity" className="xl:col-span-1">
              <div className="space-y-2 text-xs pt-1">
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 pb-1 border-b border-slate-100">
                  <span>Category</span>
                  <span className="text-right">Score</span>
                </div>
                {data.categoryAffinity.map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-800">
                      <span className="text-slate-900 truncate">{c.category}</span>
                      <span className="text-slate-600 text-[10px]">Affinity {c.score}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-xs overflow-hidden">
                      <div
                        className="h-full rounded-xs bg-burgundy transition-all duration-300"
                        style={{ width: `${c.score * 1.0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 18: Cross-Sell Opportunities */}
            <AnalyticsPanel number="18." title="Cross-Sell Opportunities" className="xl:col-span-1">
              <AnalyticsTable columns={crossSellCols} data={data.crossSellOpportunities} />
            </AnalyticsPanel>

            {/* Section 19: Geography & Channel Preference */}
            <AnalyticsPanel number="19." title="Geography &amp; Channel Preference" className="xl:col-span-1">
              <AnalyticsTable columns={geoCols} data={data.geoPreference} />
            </AnalyticsPanel>
          </div>

          {/* Row 5: Sections 20 to 22 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 20: Customer Support Impact */}
            <AnalyticsPanel number="20." title="Customer Support Impact">
              <AnalyticsTable columns={supportCols} data={data.supportImpact} />
            </AnalyticsPanel>

            {/* Section 21: Returns & Refund Behavior */}
            <AnalyticsPanel number="21." title="Returns &amp; Refund Behavior">
              <div className="space-y-1.5 text-xs">
                {data.returnsRefundBehavior.map((rr, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{rr.metric}</span>
                    <span className="font-bold text-slate-900">{rr.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 22: Dormancy & Reactivation */}
            <AnalyticsPanel number="22." title="Dormancy &amp; Reactivation">
              <div className="space-y-1.5 text-xs">
                {data.dormancyReactivation.map((dr, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-600 font-medium text-[11px]">{dr.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{dr.value}</span>
                      <TrendIndicator value={dr.vsPrior} isPositive={dr.isPositive} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>
          </div>

          {/* Section 23: Customer Exception Center */}
          <AnalyticsPanel number="23." title="Customer Exception Center">
            <AnalyticsTable columns={exceptionCols} data={data.customerExceptions} />
          </AnalyticsPanel>

          {/* Bottom Row: Sections 24 & 25 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Section 24: Forecast vs Target */}
            <AnalyticsPanel number="24." title="Forecast vs Target" subtitle="May 2026">
              <AnalyticsTable columns={forecastVsTargetCols} data={data.forecastVsTarget} />
            </AnalyticsPanel>

            {/* Section 25: Priority Insights */}
            <AnalyticsPanel number="25." title="Priority Insights" subtitle="Top 5">
              <InsightList insights={data.priorityInsights as any} />
            </AnalyticsPanel>
          </div>
        </div>

        {/* Right Customer Health Rail (3 Cols) */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <CustomerHealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
