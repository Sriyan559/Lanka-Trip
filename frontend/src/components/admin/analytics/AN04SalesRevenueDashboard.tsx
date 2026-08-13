"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  SALES_REVENUE_DATA,
  CommercialTargetRow,
  ChannelPerformanceRow,
  CategoryPerformanceRow,
  CustomerSegmentRow,
  TopCustomerRow,
  SupplierPerformanceRow,
  PromotionPerformanceRow,
  ForecastAccuracyRow,
  RevenueLeakageRow,
} from "@/data/analytics/salesRevenueData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { BarChart } from "@/components/analytics/charts/BarChart";
import { WaterfallChart } from "@/components/analytics/charts/WaterfallChart";
import { ScatterChart } from "@/components/analytics/charts/ScatterChart";
import { BubbleChart } from "@/components/analytics/charts/BubbleChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { CommercialHealthRail } from "@/components/analytics/CommercialHealthRail";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { Filter, RotateCcw, Save, RefreshCw, Download, ChevronDown } from "lucide-react";

export function AN04SalesRevenueDashboard() {
  const data = SALES_REVENUE_DATA;
  const [activeTab, setActiveTab] = useState("Commercial Overview");

  const handleAction = (actionName: string) => {
    toast.success(`Action: ${actionName}`);
  };

  // Table Columns Setup
  const targetScorecardCols: ColumnDef<CommercialTargetRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "currency", currencyCode: "£" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs Target",
      accessorKey: "vsTarget",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsTarget} isPositive={row.isPositive !== false} />,
    },
    { header: "LY", accessorKey: "ly", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs LY",
      accessorKey: "vsLy",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsLy} isPositive={row.isPositive !== false} />,
    },
  ];

  const channelCols: ColumnDef<ChannelPerformanceRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "Net Revenue", accessorKey: "netRevenue", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs LY",
      accessorKey: "vsLy",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsLy} isPositive={true} />,
    },
    { header: "GM %", accessorKey: "gmPercent", align: "right", cellType: "percentage" },
    { header: "CM %", accessorKey: "cmPercent", align: "right", cellType: "percentage" },
    { header: "AOV", accessorKey: "aov", align: "right", cellType: "currency", currencyCode: "£" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
  ];

  const categoryCols: ColumnDef<CategoryPerformanceRow>[] = [
    { header: "Category", accessorKey: "category", align: "left" },
    { header: "Net Revenue", accessorKey: "netRevenue", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs LY",
      accessorKey: "vsLy",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsLy} isPositive={true} />,
    },
    { header: "GM %", accessorKey: "gmPercent", align: "right", cellType: "percentage" },
    { header: "CM %", accessorKey: "cmPercent", align: "right", cellType: "percentage" },
  ];

  const customerSegmentCols: ColumnDef<CustomerSegmentRow>[] = [
    { header: "Segment", accessorKey: "segment", align: "left" },
    { header: "Net Revenue", accessorKey: "netRevenue", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs LY",
      accessorKey: "vsLy",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsLy} isPositive={true} />,
    },
    { header: "GM %", accessorKey: "gmPercent", align: "right", cellType: "percentage" },
    { header: "CM %", accessorKey: "cmPercent", align: "right", cellType: "percentage" },
  ];

  const topCustomerCols: ColumnDef<TopCustomerRow>[] = [
    { header: "Customer", accessorKey: "customer", align: "left" },
    { header: "Net Revenue", accessorKey: "netRevenue", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs LY",
      accessorKey: "vsLy",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsLy} isPositive={true} />,
    },
    { header: "GM %", accessorKey: "gmPercent", align: "right", cellType: "percentage" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
  ];

  const supplierCols: ColumnDef<SupplierPerformanceRow>[] = [
    { header: "Supplier", accessorKey: "supplier", align: "left" },
    { header: "Net Revenue", accessorKey: "netRevenue", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs LY",
      accessorKey: "vsLy",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsLy} isPositive={true} />,
    },
    { header: "Fill Rate", accessorKey: "fillRate", align: "right", cellType: "percentage" },
    { header: "OTIF", accessorKey: "otif", align: "right", cellType: "percentage" },
    { header: "GM %", accessorKey: "gmPercent", align: "right", cellType: "percentage" },
  ];

  const promotionCols: ColumnDef<PromotionPerformanceRow>[] = [
    { header: "Promotion Type", accessorKey: "promotionType", align: "left" },
    { header: "Net Revenue", accessorKey: "netRevenue", align: "right", cellType: "currency", currencyCode: "£" },
    { header: "ROI", accessorKey: "roi", align: "right", cellType: "number" },
    {
      header: "Lift %",
      accessorKey: "liftPercent",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.liftPercent} isPositive={true} />,
    },
    { header: "CM Impact", accessorKey: "cmImpact", align: "right", cellType: "currency", currencyCode: "£" },
  ];

  const forecastAccuracyCols: ColumnDef<ForecastAccuracyRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Forecast", accessorKey: "forecast", align: "right", cellType: "number" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "number" },
    { header: "Accuracy", accessorKey: "accuracy", align: "right", cellType: "percentage" },
    { header: "MAPE", accessorKey: "mape", align: "right", cellType: "percentage" },
  ];

  const leakageCols: ColumnDef<RevenueLeakageRow>[] = [
    { header: "Leakage Type", accessorKey: "leakageType", align: "left" },
    { header: "Amount", accessorKey: "amount", align: "right", cellType: "currency", currencyCode: "£" },
    {
      header: "vs LY",
      accessorKey: "vsLy",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsLy} isPositive={false} />,
    },
    { header: "% of Revenue", accessorKey: "percentRevenue", align: "right", cellType: "percentage" },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title without "AN04" */}
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
            onClick={() => handleAction("Generate Commercial Report")}
            className="px-4 py-1.5 text-white border border-[#3e0513] bg-[linear-gradient(180deg,#600c20_0%,#9e2040_45%,#50081a_100%)] text-xs font-bold rounded-full shadow-md transition-colors cursor-pointer hover:brightness-110"
          >
            Generate Commercial Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Revenue Exceptions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Review Revenue Exceptions
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Margin Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Review Margin Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Commercial Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Run Commercial Forecast
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

      {/* 2. Context / Data Status Strip */}
      <ReadinessStrip items={data.contextStrip} />

      {/* 3. Primary KPI Grid (14 Cards) + Commercial Health Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {data.kpis.slice(0, 6).map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Commercial Health Card (Card 7) */}
        <div className="an02-overall-health-card bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-burgundy tracking-tight">
            7. Commercial Health
          </span>
          <div className="my-1">
            <CircularScore score={data.commercialHealthScore.score} maxScore={100} size={72} strokeWidth={6} />
          </div>
          <span className="text-[11px] font-bold text-emerald-700">
            {data.commercialHealthScore.label}
          </span>
        </div>

        {data.kpis.slice(6).map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}
      </div>

      {/* 4. Analytics Tab Navigation */}
      <TabNavigation
        tabs={data.tabs}
        activeTab={activeTab}
        onSelectTab={(t) => setActiveTab(t)}
      />

      {/* 5. Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-xs space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Dropdown filters */}
          <div className="flex flex-col gap-0.5 min-w-[95px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Time Period</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>Last 52 Weeks</option>
              <option>Last 12 Weeks</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[105px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Comparison Period</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>Prior 52 Weeks</option>
              <option>Prior Year Period</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Baseline</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>Budget</option>
              <option>Prior Year</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[70px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Region</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
              <option>UK &amp; IE</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[75px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Channel</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
              <option>DTC</option>
              <option>Marketplace</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Marketplace</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
              <option>Amazon</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[105px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Product Category</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
              <option>Skincare</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[75px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Brand</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
              <option>L&apos;Oreal</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[105px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Customer Segment</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
              <option>Loyalty</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[75px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Supplier</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>All</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[70px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Currency</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>GBP</option>
              <option>USD</option>
            </select>
          </div>

          <div className="flex flex-col gap-0.5 min-w-[85px] flex-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Margin Basis</label>
            <select className="border border-slate-200 rounded px-1.5 py-1 text-xs bg-slate-50 font-medium text-slate-800">
              <option>Standard</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 self-end ml-auto pt-1">
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

      {/* 6. Commercial Readiness Status Row */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 overflow-x-auto flex items-center gap-3 text-xs whitespace-nowrap scrollbar-thin">
        <span className="font-extrabold text-slate-800 text-xs">Commercial Readiness Status</span>
        {data.readinessStatus.map((st, idx) => (
          <div key={idx} className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded text-[11px]">
            <span className="text-slate-600 font-medium">{st.label}</span>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-1 rounded">{st.score}</span>
          </div>
        ))}
      </div>

      {/* 7. Main Grid Layout (Left 9 Cols vs Right 3 Cols Health Rail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Primary Charts Row (Cards 1 to 4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Chart 1: Sales & Returns Trend */}
            <AnalyticsPanel number="1." title="Sales &amp; Returns Trend" subtitle="GBP">
              <LineChart
                data={data.salesReturnsTrend}
                xAxisKey="date"
                height={180}
                series={[
                  { key: "netRevenue", name: "Net Revenue", color: "#800020" },
                  { key: "refunds", name: "Refunds", color: "#2563eb" },
                  { key: "netRevenueLY", name: "Net Revenue (LY)", color: "#94a3b8", strokeDasharray: "3 3" },
                  { key: "refundsLY", name: "Refunds (LY)", color: "#cbd5e1", strokeDasharray: "3 3" },
                ]}
              />
            </AnalyticsPanel>

            {/* Chart 2: Revenue Bridge */}
            <AnalyticsPanel number="2." title="Revenue Bridge" subtitle="GBP">
              <WaterfallChart data={data.revenueBridge as any} height={180} />
            </AnalyticsPanel>

            {/* Chart 3: Margin Bridge */}
            <AnalyticsPanel number="3." title="Margin Bridge" subtitle="GBP">
              <WaterfallChart data={data.marginBridge as any} height={180} />
            </AnalyticsPanel>

            {/* Chart 4: Revenue vs Target */}
            <AnalyticsPanel number="4." title="Revenue vs Target" subtitle="GBP">
              <BarChart
                data={data.revenueTarget}
                xAxisKey="metric"
                height={180}
                series={[
                  { key: "actual", name: "Actual", color: "#800020" },
                  { key: "target", name: "Target", color: "#64748b" },
                ]}
              />
            </AnalyticsPanel>
          </div>

          {/* Middle Table Row (Cards 5 to 9) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Card 5: Commercial Target Scorecard */}
            <AnalyticsPanel number="5." title="Commercial Target Scorecard" className="xl:col-span-1">
              <AnalyticsTable columns={targetScorecardCols} data={data.targetScorecard} />
            </AnalyticsPanel>

            {/* Card 6: Channel Performance */}
            <AnalyticsPanel number="6." title="Channel Performance" className="xl:col-span-1">
              <AnalyticsTable columns={channelCols} data={data.channelPerformance} highlightTotalRow={true} />
            </AnalyticsPanel>

            {/* Card 7: Category Revenue & Margin */}
            <AnalyticsPanel number="7." title="Category Revenue & Margin" className="xl:col-span-1">
              <AnalyticsTable columns={categoryCols} data={data.categoryPerformance} highlightTotalRow={true} />
            </AnalyticsPanel>

            {/* Card 8: Customer Segment Performance */}
            <AnalyticsPanel number="8." title="Customer Segment Performance" className="xl:col-span-1">
              <AnalyticsTable columns={customerSegmentCols} data={data.customerSegmentPerformance} highlightTotalRow={true} />
            </AnalyticsPanel>

            {/* Card 9: Top Customer Performance */}
            <AnalyticsPanel number="9." title="Top Customer Performance" className="xl:col-span-1">
              <AnalyticsTable columns={topCustomerCols} data={data.topCustomerPerformance} highlightTotalRow={true} />
            </AnalyticsPanel>
          </div>

          {/* Second Table Row (Cards 10 to 14) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Card 10: Supplier Performance */}
            <AnalyticsPanel number="10." title="Supplier Performance" className="xl:col-span-1">
              <AnalyticsTable columns={supplierCols} data={data.supplierPerformance} highlightTotalRow={true} />
            </AnalyticsPanel>

            {/* Card 11: Promotion Performance */}
            <AnalyticsPanel number="11." title="Promotion Performance" className="xl:col-span-1">
              <AnalyticsTable columns={promotionCols} data={data.promotionPerformance} highlightTotalRow={true} />
            </AnalyticsPanel>

            {/* Card 12: Forecast Accuracy */}
            <AnalyticsPanel number="12." title="Forecast Accuracy" className="xl:col-span-1">
              <AnalyticsTable columns={forecastAccuracyCols} data={data.forecastAccuracy} />
            </AnalyticsPanel>

            {/* Card 13: Revenue Leakage */}
            <AnalyticsPanel number="13." title="Revenue Leakage" className="xl:col-span-1">
              <AnalyticsTable columns={leakageCols} data={data.revenueLeakage} highlightTotalRow={true} />
            </AnalyticsPanel>

            {/* Card 14: Commercial Risks / Quick Queries */}
            <AnalyticsPanel number="14." title="Commercial Risks / Quick Queries" className="xl:col-span-1">
              <div className="space-y-1.5 text-xs">
                {data.commercialRisksQueries.map((rq, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[120px]">{rq.riskType}</span>
                    <span className="px-2 py-0.5 rounded-md border border-rose-300 bg-white text-rose-700 font-extrabold text-[10px] shrink-0 shadow-2xs">
                      {rq.count}
                    </span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>
          </div>

          {/* Bottom Visual Analytics (Cards 15 to 20) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3 items-stretch">
            {/* Card 15: Sales Scatter */}
            <AnalyticsPanel number="15." title="Sales Scatter" subtitle="Revenue vs GM%" className="xl:col-span-1">
              <ScatterChart data={data.scatterData} height={160} />
            </AnalyticsPanel>

            {/* Card 16: Profitability Matrix */}
            <AnalyticsPanel number="16." title="Profitability Matrix" subtitle="GM% vs Volume" className="xl:col-span-1">
              <BubbleChart data={data.bubbleData} height={160} />
            </AnalyticsPanel>

            {/* Card 17: Price Positioning */}
            <AnalyticsPanel number="17." title="Price Positioning" className="xl:col-span-1">
              <HorizontalBarChart data={data.pricePositioning} height={160} />
            </AnalyticsPanel>

            {/* Card 18: Commercial Insights (AI) */}
            <AnalyticsPanel number="18." title="Commercial Insights (AI)" className="xl:col-span-1">
              <div className="flex flex-col justify-between h-full text-[10px] text-slate-700 leading-tight">
                <div className="space-y-1">
                  {data.commercialInsights.map((ci, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span className="text-slate-800 font-bold">•</span>
                      <span>{ci.text}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 border-t border-slate-200 mt-2 pt-1 text-center">
                  <div>
                    <div className="text-[9px] font-bold text-emerald-700">Positive</div>
                    <div className="text-xs font-extrabold text-emerald-700 mt-0.5">{data.insightBadges.positive}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-amber-700">Watch</div>
                    <div className="text-xs font-extrabold text-amber-700 mt-0.5">{data.insightBadges.watch}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-rose-700">Risk</div>
                    <div className="text-xs font-extrabold text-rose-700 mt-0.5">{data.insightBadges.risk}</div>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 19: Commercial KPI Summary */}
            <AnalyticsPanel number="19." title="Commercial KPI Summary" className="xl:col-span-1">
              <div className="space-y-1.5 text-xs">
                {data.commercialKpiSummary.map((sum, idx) => {
                  const isPill = ["3", "5", "2"].includes(sum.value);

                  return (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-700 font-semibold text-[10px] leading-tight max-w-[110px]">{sum.label}</span>
                      {isPill ? (
                        <span className="px-2 py-0.5 rounded-md border border-rose-300 bg-white text-rose-700 font-extrabold text-[10px] shrink-0 shadow-2xs">
                          {sum.value}
                        </span>
                      ) : (
                        <span className="font-extrabold text-slate-900 text-xs shrink-0">{sum.value}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </AnalyticsPanel>

            {/* Card 20: Actions & Next Steps */}
            <AnalyticsPanel number="20." title="Actions &amp; Next Steps" className="xl:col-span-1">
              <div className="space-y-1.5">
                {data.actionsNextSteps.map((act, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAction(act)}
                    className={`w-full text-center py-1.5 px-1.5 rounded-full font-bold text-[10px] transition-colors whitespace-normal leading-tight shadow-xs cursor-pointer ${
                      idx === 0
                        ? "text-white border border-[#3e0513] bg-[linear-gradient(180deg,#600c20_0%,#9e2040_45%,#50081a_100%)] shadow-md"
                        : "bg-white hover:bg-rose-50/50 border border-rose-300 text-burgundy"
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </AnalyticsPanel>
          </div>
        </div>

        {/* Right Executive Commercial Health Rail (3 Cols) */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <CommercialHealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
