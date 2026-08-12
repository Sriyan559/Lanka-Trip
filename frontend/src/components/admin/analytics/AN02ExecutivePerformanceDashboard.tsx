"use client";

import React from "react";
import toast from "react-hot-toast";

import { EXECUTIVE_PERFORMANCE_DATA, StrategicScorecardRow, GenericTableRow, ForecastSnapshotRow } from "@/data/analytics/executivePerformanceData";
import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { AnalyticsFilters, FilterState } from "@/components/analytics/AnalyticsFilters";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { BarChart } from "@/components/analytics/charts/BarChart";
import { WaterfallChart } from "@/components/analytics/charts/WaterfallChart";
import { HealthRail } from "@/components/analytics/HealthRail";
import { InsightList } from "@/components/analytics/InsightList";
import { ExecutiveCommentary } from "@/components/analytics/ExecutiveCommentary";
import { ActionList } from "@/components/analytics/ActionList";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";

export function AN02ExecutivePerformanceDashboard() {
  const data = EXECUTIVE_PERFORMANCE_DATA;

  // Handlers for action buttons
  const handleAction = (name: string) => {
    toast.success(`Triggered: ${name}`);
  };

  const handleApplyFilters = (filters: FilterState) => {
    toast.success(`Executive Filters applied: ${filters.timePeriod} (${filters.region})`);
  };

  const handleClearFilters = () => {
    toast.success("Executive filters reset to default");
  };

  // Table Column Definitions for Strategic Scorecard
  const scorecardColumns: ColumnDef<StrategicScorecardRow>[] = [
    { header: "Pillar", accessorKey: "pillar", align: "left" },
    { header: "Score", accessorKey: "score", align: "right", cellType: "number" },
    {
      header: "vs. Target",
      accessorKey: "vsTarget",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsTarget} isPositive={true} />,
    },
    {
      header: "vs. Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={true} />,
    },
    { header: "Trend (30D)", accessorKey: "trend", cellType: "sparkline", align: "center" },
    { header: "Weight", accessorKey: "weight", align: "right", cellType: "percentage" },
    { header: "Score", accessorKey: "scoreWeighted", align: "right", cellType: "number" },
  ];

  // Generic Lower Table Columns
  const genericTableColumns: ColumnDef<GenericTableRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "number" },
    {
      header: "vs. Compare",
      accessorKey: "vsCompare",
      align: "right",
      cellType: "delta",
    },
  ];

  // Forecast Snapshot Table Columns
  const forecastTableColumns: ColumnDef<ForecastSnapshotRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Forecast (30D)", accessorKey: "forecast", align: "right", cellType: "number" },
    {
      header: "vs. Prior Forecast",
      accessorKey: "vsPriorForecast",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPriorForecast} isPositive={true} />,
    },
    { header: "Confidence", accessorKey: "confidence", align: "right" },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Strictly "Executive Performance & Enterprise KPI Analytics" without "AN02 — " */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Executive Performance &amp; Enterprise KPI Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Executive performance overview across the enterprise. All metrics as of {data.headerMeta.asOf} unless otherwise noted. Comparisons are {data.headerMeta.comparison}. Currency in {data.headerMeta.currency}.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleAction("Review KPI Guardrails")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review KPI Guardrails
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Periods")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Compare Periods
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Executive Report")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Export Executive Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Open Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Open Forecast
          </button>
          <button
            type="button"
            onClick={() => handleAction("Executive Insights Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors"
          >
            Executive Insights Report
          </button>
        </div>
      </div>

      {/* 2. Context / Data Strip */}
      <ReadinessStrip items={data.contextStrip} />

      {/* 3. Executive Filter Bar */}
      <AnalyticsFilters onApplyFilters={handleApplyFilters} onClearAll={handleClearFilters} />

      {/* 4. Primary KPI Section + Overall Health Score Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 6: Overall Executive Performance Health */}
        <div className="an02-overall-health-card bg-white p-3 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <h3 className="text-xs font-bold text-burgundy tracking-tight">
            Overall Executive Performance Health
          </h3>
          <p className="text-[10px] text-slate-400 font-medium mb-2">Current Overall Health Score</p>
          <CircularScore score={data.overallHealth.score} maxScore={100} size={82} strokeWidth={7} />
        </div>
      </div>

      {/* 5. Main Layout Grid: Main Content (Left 9 Cols) vs Right Health Rail (3 Cols) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Analytics Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Scorecard + Trend + Revenue/Profit + Revenue Bridge */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Card 6: Enterprise Strategic Scorecard */}
            <AnalyticsPanel
              number="6."
              title="Enterprise Strategic Scorecard"
              footerLinkText="View Full Scorecard"
              onFooterLinkClick={() => handleAction("Full Strategic Scorecard")}
            >
              <AnalyticsTable columns={scorecardColumns} data={data.strategicScorecard} />
            </AnalyticsPanel>

            {/* Card 7: Executive Performance Trend */}
            <AnalyticsPanel
              number="7."
              title="Executive Performance Trend"
              subtitle="Actual vs. Target"
            >
              <LineChart
                data={data.executiveTrend}
                xAxisKey="date"
                height={160}
                series={[
                  { key: "netRevenue", name: "Net Revenue (LKR)", color: "#800020" },
                  { key: "grossMargin", name: "Gross Margin (%)", color: "#059669" },
                  { key: "orders", name: "Orders (#)", color: "#2563eb" },
                  { key: "activeCustomers", name: "Active Customers (#)", color: "#0284c7" },
                  { key: "nps", name: "NPS (Score)", color: "#7c3aed", strokeDasharray: "3 3" },
                ]}
              />
            </AnalyticsPanel>

            {/* Card 8: Revenue & Profit */}
            <AnalyticsPanel
              number="8."
              title="Revenue & Profit"
              subtitle="LKR"
            >
              <BarChart
                data={data.revenueProfit}
                xAxisKey="metric"
                height={160}
                series={[
                  { key: "actual", name: "Actual", color: "#800020" },
                  { key: "target", name: "Target", color: "#94a3b8" },
                ]}
              />
            </AnalyticsPanel>

            {/* Card 9: Revenue Contribution Bridge */}
            <AnalyticsPanel
              number="9."
              title="Revenue Contribution Bridge"
              subtitle="LKR"
            >
              <WaterfallChart data={data.revenueBridge} height={160} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Lower Analytics Tables (3x3 Grid: Panels 10 to 18) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Card 10: Growth Scorecard */}
            <AnalyticsPanel number="10." title="Growth Scorecard" subtitle="vs. Target">
              <AnalyticsTable columns={genericTableColumns} data={data.growthScorecard} />
            </AnalyticsPanel>

            {/* Card 11: Customer Health */}
            <AnalyticsPanel number="11." title="Customer Health">
              <AnalyticsTable columns={genericTableColumns} data={data.customerHealth} />
            </AnalyticsPanel>

            {/* Card 12: Commercial Performance */}
            <AnalyticsPanel number="12." title="Commercial Performance" subtitle="LKR">
              <AnalyticsTable columns={genericTableColumns} data={data.commercialPerformance} />
            </AnalyticsPanel>

            {/* Card 13: Supplier Health */}
            <AnalyticsPanel number="13." title="Supplier Health" subtitle="OTIF">
              <AnalyticsTable columns={genericTableColumns} data={data.supplierHealth} />
            </AnalyticsPanel>

            {/* Card 14: Inventory & Operations Health */}
            <AnalyticsPanel number="14." title="Inventory & Operations Health">
              <AnalyticsTable columns={genericTableColumns} data={data.inventoryOperations} />
            </AnalyticsPanel>

            {/* Card 15: Marketing Efficiency */}
            <AnalyticsPanel number="15." title="Marketing Efficiency" subtitle="LKR">
              <AnalyticsTable columns={genericTableColumns} data={data.marketingEfficiency} />
            </AnalyticsPanel>

            {/* Card 16: Finance & Cash Health */}
            <AnalyticsPanel number="16." title="Finance & Cash Health" subtitle="LKR">
              <AnalyticsTable columns={genericTableColumns} data={data.financeCashHealth} />
            </AnalyticsPanel>

            {/* Card 17: Customer Support */}
            <AnalyticsPanel number="17." title="Customer Support" subtitle="Service">
              <AnalyticsTable columns={genericTableColumns} data={data.customerSupport} />
            </AnalyticsPanel>

            {/* Card 18: Compliance & Risk */}
            <AnalyticsPanel number="18." title="Compliance & Risk">
              <AnalyticsTable columns={genericTableColumns} data={data.complianceRisk} />
            </AnalyticsPanel>
          </div>

          {/* Row 3: Panels 19 to 23 in a 5-column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 items-stretch">
            {/* Card 19: Forecast Snapshot */}
            <AnalyticsPanel number="19." title="Forecast Snapshot" subtitle="Model-Generated">
              <AnalyticsTable columns={forecastTableColumns} data={data.forecastSnapshot} />
            </AnalyticsPanel>

            {/* Card 20: Forecast vs. Target */}
            <AnalyticsPanel number="20." title="Forecast vs. Target" subtitle="Next 30 Days">
              <div className="flex flex-col space-y-2">
                {/* Line Chart */}
                <div className="w-full h-[110px]">
                  <LineChart
                    data={data.forecastVsTarget}
                    xAxisKey="date"
                    height={110}
                    showLegend={true}
                    series={[
                      { key: "actual", name: "Actual", color: "#2563eb", strokeWidth: 1.5, strokeDasharray: "3 3" },
                      { key: "forecast", name: "Forecast", color: "#0f172a", strokeWidth: 2 },
                      { key: "target", name: "Target", color: "#ea580c", strokeWidth: 1.8 },
                    ]}
                  />
                </div>

                {/* PROJECTED Metrics 2x2 Grid */}
                <div className="border-t border-slate-100 pt-2">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 text-center">
                    PROJECTED (NEXT 30D)
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                    <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1 rounded border border-slate-200/80">
                      <span className="font-extrabold text-slate-900">129.2M</span>
                      <span className="font-bold text-emerald-600 text-[9px]">↑ 7.0%</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1 rounded border border-slate-200/80">
                      <span className="font-extrabold text-slate-900">32.1%</span>
                      <span className="font-bold text-emerald-600 text-[9px]">↑ 1.6pp</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1 rounded border border-slate-200/80">
                      <span className="font-extrabold text-slate-900">68.9K</span>
                      <span className="font-bold text-emerald-600 text-[9px]">↑ 5.4%</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1 rounded border border-slate-200/80">
                      <span className="font-extrabold text-slate-900">30.1K</span>
                      <span className="font-bold text-emerald-600 text-[9px]">↑ 4.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 21: Executive Priority Insights */}
            <AnalyticsPanel number="21." title="Executive Priority Insights" subtitle="Next 30 Days">
              <InsightList insights={data.priorityInsights as any} />
            </AnalyticsPanel>

            {/* Card 22: Executive Commentary */}
            <AnalyticsPanel number="22." title="Executive Commentary">
              <ExecutiveCommentary
                author={data.executiveCommentary.author}
                timeAgo={data.executiveCommentary.timeAgo}
                content={data.executiveCommentary.content}
                onViewFull={() => handleAction("Full Executive Commentary")}
              />
            </AnalyticsPanel>

            {/* Card 23: Quick Access Hub */}
            <AnalyticsPanel number="23." title="Quick Access Hub">
              <ActionList
                items={data.quickAccessHub}
                onItemClick={(item) => handleAction(item.title)}
              />
            </AnalyticsPanel>
          </div>

          {/* Bottom Footnote Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-200/80 text-[10px] text-slate-400 font-medium">
            <span>All forecasts are model-generated estimates and subject to change based on actual performance and market conditions.</span>
            <span>Model Refresh: Jul 24, 2026 9:45 AM SGT</span>
          </div>
        </div>

        {/* Right Executive Health Rail (3 Cols) */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <HealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
