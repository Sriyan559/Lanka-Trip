"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  PRODUCTS_BRANDS_DATA,
  SkuVariantRow,
  AssortmentHealthRow,
  CatalogueQualityRow,
  PricingMarginRow,
  InventoryProductivityRow,
  ReturnsAnalyticsRow,
  RatingsReviewsRow,
  LifecycleRow,
  NewProductRow,
  SupplierDependencyRow,
  ComplianceRow,
  ExceptionIssueRow,
  ForecastSnapshotRow,
  RiskIndicatorRow,
} from "@/data/analytics/productsBrandsData";

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
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { ProductHealthRail } from "@/components/analytics/ProductHealthRail";
import { InsightList } from "@/components/analytics/InsightList";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import { Filter, RotateCcw, Save, RefreshCw, Download, ChevronDown } from "lucide-react";

export function AN07ProductsBrandsDashboard() {
  const data = PRODUCTS_BRANDS_DATA;
  const [activeTab, setActiveTab] = useState("Product Overview");

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  // Column Definitions
  const skuVariantCols: ColumnDef<SkuVariantRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Healthy" ? "success" : "warning"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const assortmentCols: ColumnDef<AssortmentHealthRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Healthy" || row.benchmark === "Good" ? "success" : "warning"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const catQualityCols: ColumnDef<CatalogueQualityRow>[] = [
    { header: "Dimension", accessorKey: "dimension", align: "left" },
    { header: "Score", accessorKey: "score", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Excellent" || row.benchmark === "Good" ? "success" : "info"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const pricingMarginCols: ColumnDef<PricingMarginRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Good" ? "success" : "warning"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const invProdCols: ColumnDef<InventoryProductivityRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Good" ? "success" : "warning"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const returnsCols: ColumnDef<ReturnsAnalyticsRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.benchmark} />,
    },
  ];

  const ratingsCols: ColumnDef<RatingsReviewsRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.benchmark} />,
    },
  ];

  const lifecycleCols: ColumnDef<LifecycleRow>[] = [
    { header: "Stage", accessorKey: "stage", align: "left" },
    { header: "Products", accessorKey: "products", align: "right", cellType: "number" },
    { header: "% of Total", accessorKey: "percentOfTotal", align: "right", cellType: "percentage" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
  ];

  const newProdCols: ColumnDef<NewProductRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Good" ? "success" : "warning"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const supplierCols: ColumnDef<SupplierDependencyRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Good" ? "success" : "warning"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const complianceCols: ColumnDef<ComplianceRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Benchmark",
      accessorKey: "benchmark",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.benchmark === "Good" ? "success" : row.benchmark === "Watch" ? "warning" : "danger"}
          label={row.benchmark}
        />
      ),
    },
  ];

  const exceptionIssueCols: ColumnDef<ExceptionIssueRow>[] = [
    { header: "Issue", accessorKey: "issue", align: "left" },
    { header: "Products", accessorKey: "products", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
  ];

  const forecastSnapshotCols: ColumnDef<ForecastSnapshotRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Value", accessorKey: "value", align: "right", cellType: "number" },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
  ];

  const riskCols: ColumnDef<RiskIndicatorRow>[] = [
    { header: "Indicator", accessorKey: "indicator", align: "left" },
    {
      header: "Level",
      accessorKey: "level",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.level === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : row.level === "Medium"
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {row.level}
        </span>
      ),
    },
    {
      header: "vs Prior",
      accessorKey: "vsPrior",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior} isPositive={row.isPositive !== false} />,
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title without "AN07" */}
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
            onClick={() => handleAction("Generate Product Analytics Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors"
          >
            Generate Product Analytics Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Product Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Product Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Catalogue Quality")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Catalogue Quality
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Product Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Run Product Forecast
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

      {/* 3. Primary KPI Grid (9 KPI Cards + 1 Product Analytics Health Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Product Analytics Health */}
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

      {/* 5. Readiness / Status Strip Row */}
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

      {/* 6. Main Grid Layout — flex so right panel never crushes the main section */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Sections 1 to 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Section 1: Product Revenue & GMV Trend */}
            <AnalyticsPanel number="1." title="Product Revenue & GMV Trend" className="xl:col-span-1">
              <LineChart
                data={data.productTrend}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "revenue", name: "Revenue (LKR)", color: "#800020" },
                  { key: "gmv", name: "GMV (LKR)", color: "#2563eb" },
                ]}
              />
            </AnalyticsPanel>

            {/* Section 2: Product Performance by Top Level Category */}
            <AnalyticsPanel number="2." title="Product Performance" subtitle="by Category" className="xl:col-span-1">
              <PieChart data={data.categoryPerformance} height={170} />
            </AnalyticsPanel>

            {/* Section 3: Brand Performance Matrix */}
            <AnalyticsPanel number="3." title="Brand Performance Matrix" className="xl:col-span-1">
              <ScatterChart
                data={data.brandPerformanceMatrix.map((b) => ({ x: b.x, y: b.y, label: b.name })) as any}
                height={170}
              />
            </AnalyticsPanel>

            {/* Section 4: Revenue Contribution / Pareto */}
            <AnalyticsPanel number="4." title="Revenue Contribution" subtitle="Pareto" className="xl:col-span-1">
              <HorizontalBarChart
                data={data.paretoContribution.map((p) => ({
                  tier: p.group,
                  priceVsMarket: `${p.percent}%`,
                  skuPercent: p.percent,
                }))}
                height={170}
              />
            </AnalyticsPanel>

            {/* Section 5: SKU & Variant Analytics */}
            <AnalyticsPanel number="5." title="SKU &amp; Variant Analytics" className="xl:col-span-1">
              <AnalyticsTable columns={skuVariantCols} data={data.skuVariantAnalytics} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Sections 6 to 10 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Section 6: Assortment Health */}
            <AnalyticsPanel number="6." title="Assortment Health" className="xl:col-span-1">
              <AnalyticsTable columns={assortmentCols} data={data.assortmentHealth} />
            </AnalyticsPanel>

            {/* Section 7: Catalogue Quality Overview */}
            <AnalyticsPanel number="7." title="Catalogue Quality Overview" className="xl:col-span-1">
              <AnalyticsTable columns={catQualityCols} data={data.catalogueQuality} />
            </AnalyticsPanel>

            {/* Section 8: Pricing & Margin Summary */}
            <AnalyticsPanel number="8." title="Pricing &amp; Margin Summary" className="xl:col-span-1">
              <AnalyticsTable columns={pricingMarginCols} data={data.pricingMarginSummary} />
            </AnalyticsPanel>

            {/* Section 9: Inventory Productivity */}
            <AnalyticsPanel number="9." title="Inventory Productivity" className="xl:col-span-1">
              <AnalyticsTable columns={invProdCols} data={data.inventoryProductivity} />
            </AnalyticsPanel>

            {/* Section 10: Returns Analytics */}
            <AnalyticsPanel number="10." title="Returns Analytics" className="xl:col-span-1">
              <AnalyticsTable columns={returnsCols} data={data.returnsAnalytics} />
            </AnalyticsPanel>
          </div>

          {/* Row 3: Sections 11 to 15 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Section 11: Ratings & Reviews */}
            <AnalyticsPanel number="11." title="Ratings &amp; Reviews" className="xl:col-span-1">
              <AnalyticsTable columns={ratingsCols} data={data.ratingsReviews} />
            </AnalyticsPanel>

            {/* Section 12: Lifecycle Analytics */}
            <AnalyticsPanel number="12." title="Lifecycle Analytics" className="xl:col-span-1">
              <AnalyticsTable columns={lifecycleCols} data={data.lifecycleAnalytics} />
            </AnalyticsPanel>

            {/* Section 13: New Product Performance */}
            <AnalyticsPanel number="13." title="New Product Performance" className="xl:col-span-1">
              <AnalyticsTable columns={newProdCols} data={data.newProductPerformance} />
            </AnalyticsPanel>

            {/* Section 14: Supplier Dependency */}
            <AnalyticsPanel number="14." title="Supplier Dependency" className="xl:col-span-1">
              <AnalyticsTable columns={supplierCols} data={data.supplierDependency} />
            </AnalyticsPanel>

            {/* Section 15: Product Compliance */}
            <AnalyticsPanel number="15." title="Product Compliance" className="xl:col-span-1">
              <AnalyticsTable columns={complianceCols} data={data.productCompliance} />
            </AnalyticsPanel>
          </div>

          {/* Row 4: Sections 16 to 20 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* Section 16: Product Compliance Audit */}
            <AnalyticsPanel number="16." title="Product Compliance Audit" className="xl:col-span-1">
              <PieChart data={data.complianceAudit} height={160} />
            </AnalyticsPanel>

            {/* Section 17: Exception Center (Top Issues) */}
            <AnalyticsPanel number="17." title="Exception Center" subtitle="Top Issues" className="xl:col-span-1">
              <AnalyticsTable columns={exceptionIssueCols} data={data.exceptionCenter} />
            </AnalyticsPanel>

            {/* Section 18: Forecast Snapshot */}
            <AnalyticsPanel number="18." title="Forecast Snapshot" subtitle="Next 30 Days" className="xl:col-span-1">
              <AnalyticsTable columns={forecastSnapshotCols} data={data.forecastSnapshot} />
            </AnalyticsPanel>

            {/* Section 19: Top Risk Indicators */}
            <AnalyticsPanel number="19." title="Top Risk Indicators" className="xl:col-span-1">
              <AnalyticsTable columns={riskCols} data={data.topRiskIndicators} />
            </AnalyticsPanel>

            {/* Section 20: Priority Insights */}
            <AnalyticsPanel number="20." title="Priority Insights" subtitle="Top 3" className="xl:col-span-1">
              <InsightList insights={data.priorityInsights as any} />
            </AnalyticsPanel>
          </div>
        </div>

        {/* Right Product Health Rail — fixed stable width so it never squeezes the main section */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <ProductHealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
