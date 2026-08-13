"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  FORECASTING_INTELLIGENCE_DATA,
  ScorecardRow,
  TargetMatrixRow,
  OutlookRow,
  ProductDemandRow,
  CapacityPlanningRow,
  ScenarioComparisonRow,
  ForecastDriverRow,
  UnderlyingForecastRecord,
  ForecastExceptionRow,
} from "@/data/analytics/forecastingIntelligenceData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { ForecastChart } from "@/components/analytics/charts/ForecastChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { SensitivityChart } from "@/components/analytics/charts/SensitivityChart";
import { SparklineChart } from "@/components/analytics/charts/SparklineChart";
import { WaterfallChart } from "@/components/analytics/charts/WaterfallChart";
import { ForecastingHealthRail } from "@/components/analytics/ForecastingHealthRail";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { formatCurrency } from "@/utils/formatters";

import {
  Filter,
  RotateCcw,
  Save,
  RefreshCw,
  Download,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

export function AN14ForecastingIntelligenceDashboard() {
  const data = FORECASTING_INTELLIGENCE_DATA;
  const [activeTab, setActiveTab] = useState("Forecast Overview");
  const [activeRange, setActiveRange] = useState("Next 90 Days");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  // Filter handlers
  const handleApplyFilters = () => toast.success("Forecast filters applied successfully.");
  const handleClearFilters = () => toast.success("Filters reset to default.");
  const handleSaveView = () => toast.success("Current forecast view saved.");
  const handleRefresh = () => toast.success("Forecast models and predictions refreshed.");
  const handleExport = () => toast.success("Enterprise Forecast report exported (CSV/PDF).");

  // Time-range options
  const rangeOptions = [
    "Today",
    "Next 30 Days",
    "Next 60 Days",
    "Next 90 Days",
    "Next Quarter",
    "Next 6 Months",
    "Next 12 Months",
    "Custom",
  ];

  // Scorecard Columns
  const scorecardCols: ColumnDef<ScorecardRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Current", accessorKey: "current", align: "right" },
    { header: "Forecast", accessorKey: "forecast", align: "right" },
    { header: "Target", accessorKey: "target", align: "right" },
    {
      header: "Variance",
      accessorKey: "variance",
      align: "right",
      renderCell: (row) => (
        <span
          className={`font-bold ${
            row.variance.startsWith("+") || row.variance.startsWith("▲")
              ? "text-emerald-700"
              : row.variance.startsWith("-") || row.variance.startsWith("▼")
              ? "text-rose-700"
              : "text-slate-800"
          }`}
        >
          {row.variance}
        </span>
      ),
    },
    { header: "Confidence", accessorKey: "confidence", align: "right" },
    {
      header: "Trend",
      accessorKey: "trend",
      align: "center",
      renderCell: (row) => (
        <SparklineChart
          data={Array.isArray(row.trend) ? row.trend : [10, 15, 20]}
          color={row.variance.startsWith("-") ? "#dc2626" : "#16a34a"}
          width={45}
          height={16}
          showDots={true}
          dotSize={1.5}
        />
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={
            row.status === "Above Target" || row.status === "On Target"
              ? "success"
              : row.status === "Watch"
              ? "warning"
              : "danger"
          }
          label={row.status}
        />
      ),
    },
  ];

  // Target Matrix Columns
  const targetMatrixCols: ColumnDef<TargetMatrixRow>[] = [
    { header: "Domain", accessorKey: "domain", align: "left" },
    {
      header: "Above Target",
      accessorKey: "aboveTarget",
      align: "center",
      renderCell: (row) => <span className="font-extrabold text-emerald-600">{row.aboveTarget}</span>,
    },
    {
      header: "Below Target",
      accessorKey: "below",
      align: "center",
      renderCell: (row) => <span className="font-extrabold text-blue-600">{row.below}</span>,
    },
    {
      header: "Watch",
      accessorKey: "watch",
      align: "center",
      renderCell: (row) => <span className="font-extrabold text-amber-500">{row.watch}</span>,
    },
    {
      header: "N/A",
      accessorKey: "na",
      align: "center",
      renderCell: (row) => <span className="font-medium text-slate-400">{row.na ?? 0}</span>,
    },
    {
      header: "Critical",
      accessorKey: "critical",
      align: "center",
      renderCell: (row) => <span className="font-extrabold text-rose-600">{row.critical}</span>,
    },
  ];

  // Outlook Columns
  const outlookCols: ColumnDef<OutlookRow>[] = [
    { header: "Domain", accessorKey: "domain", align: "left" },
    { header: "Current", accessorKey: "current", align: "right" },
    { header: "Forecast", accessorKey: "forecast", align: "right" },
    { header: "Target", accessorKey: "target", align: "right" },
    {
      header: "Variance",
      accessorKey: "variance",
      align: "right",
      renderCell: (row) => (
        <span
          className={`font-bold ${
            row.variance.startsWith("+") || row.variance.startsWith("▲")
              ? "text-emerald-700"
              : row.variance.startsWith("-") || row.variance.startsWith("▼")
              ? "text-rose-700"
              : "text-slate-800"
          }`}
        >
          {row.variance}
        </span>
      ),
    },
    { header: "Conf.", accessorKey: "confidence", align: "right" },
    {
      header: "Trend",
      accessorKey: "trend",
      align: "center",
      renderCell: (row) => (
        <SparklineChart
          data={Array.isArray(row.trend) ? row.trend : [10, 15, 20]}
          color={row.variance.startsWith("-") ? "#dc2626" : "#2563eb"}
          width={45}
          height={16}
          showDots={true}
          dotSize={1.5}
        />
      ),
    },
    {
      header: "Risk",
      accessorKey: "risk",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.risk === "Low" ? "success" : row.risk === "Med" ? "warning" : "danger"}
          label={row.risk}
        />
      ),
    },
    { header: "Owner", accessorKey: "owner", align: "left" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={
            row.status === "Above Target" || row.status === "On Target"
              ? "success"
              : row.status === "Watch"
              ? "warning"
              : "danger"
          }
          label={row.status}
        />
      ),
    },
  ];

  // Product Demand Columns
  const demandCols: ColumnDef<ProductDemandRow>[] = [
    { header: "Category", accessorKey: "category", align: "left" },
    { header: "Current Demand", accessorKey: "currentDemand", align: "right" },
    { header: "Forecast Demand", accessorKey: "forecastDemand", align: "right" },
    { header: "Target Demand", accessorKey: "targetDemand", align: "right" },
    { header: "Variance", accessorKey: "variance", align: "right" },
    { header: "Gap", accessorKey: "gap", align: "right" },
    { header: "Revenue Exposure", accessorKey: "revenueExposure", align: "right" },
    { header: "Confidence", accessorKey: "confidence", align: "right" },
  ];

  // Capacity Planning Columns
  const capacityCols: ColumnDef<CapacityPlanningRow>[] = [
    { header: "Category", accessorKey: "category", align: "left" },
    { header: "Current", accessorKey: "current", align: "right" },
    { header: "Required", accessorKey: "required", align: "right" },
    { header: "Available", accessorKey: "available", align: "right" },
    { header: "Gap", accessorKey: "gap", align: "right" },
    { header: "Peak Date", accessorKey: "peakDate", align: "center" },
    {
      header: "Risk",
      accessorKey: "risk",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.risk === "Low" ? "success" : row.risk === "Med" ? "warning" : "danger"}
          label={row.risk}
        />
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.status === "On Target" ? "success" : row.status === "Watch" ? "warning" : "danger"}
          label={row.status}
        />
      ),
    },
  ];

  // Scenario Comparison Columns
  const scenarioCols: ColumnDef<ScenarioComparisonRow>[] = [
    { header: "Scenario", accessorKey: "scenario", align: "left" },
    { header: "Revenue (M)", accessorKey: "revenue", align: "right" },
    { header: "Gross Margin", accessorKey: "grossMargin", align: "right" },
    { header: "Cash (M)", accessorKey: "cash", align: "right" },
    { header: "Orders", accessorKey: "orders", align: "right" },
    { header: "Customers", accessorKey: "customers", align: "right" },
    { header: "Runway (Days)", accessorKey: "runway", align: "right" },
    { header: "Confidence", accessorKey: "confidence", align: "right" },
  ];

  // Driver Columns
  const driverCols: ColumnDef<ForecastDriverRow>[] = [
    { header: "Driver", accessorKey: "driver", align: "left" },
    { header: "Impact", accessorKey: "impact", align: "right" },
    { header: "MAPE", accessorKey: "mape", align: "right" },
    { header: "MAE", accessorKey: "mae", align: "right" },
  ];

  // Exception Columns
  const exceptionCols: ColumnDef<ForecastExceptionRow>[] = [
    { header: "Exception", accessorKey: "exception", align: "left" },
    { header: "Domain", accessorKey: "domain", align: "center" },
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Forecast", accessorKey: "forecast", align: "right" },
    { header: "Target", accessorKey: "target", align: "right" },
    { header: "Variance", accessorKey: "variance", align: "right" },
    { header: "Exposure", accessorKey: "exposure", align: "right" },
    {
      header: "Severity",
      accessorKey: "severity",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.severity === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : row.severity === "Med"
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
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
      renderCell: (row) => (
        <StatusBadge
          status={row.status === "Resolved" ? "success" : row.status === "Investigating" ? "warning" : "danger"}
          label={row.status}
        />
      ),
    },
  ];

  // Underlying Records Filtering & Pagination
  const filteredRecords = data.underlyingRecords.filter((rec) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      rec.recordRef.toLowerCase().includes(q) ||
      rec.domain.toLowerCase().includes(q) ||
      rec.metric.toLowerCase().includes(q) ||
      rec.owner.toLowerCase().includes(q) ||
      rec.model.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const underlyingCols: ColumnDef<UnderlyingForecastRecord>[] = [
    { header: "Record Ref", accessorKey: "recordRef", align: "left" },
    { header: "Domain", accessorKey: "domain", align: "center" },
    { header: "Subdomain", accessorKey: "subdomain", align: "left" },
    { header: "Metric", accessorKey: "metric", align: "right" },
    { header: "Forecast", accessorKey: "forecast", align: "right" },
    { header: "Target", accessorKey: "target", align: "right" },
    { header: "Variance", accessorKey: "variance", align: "right" },
    { header: "Confidence", accessorKey: "confidence", align: "right" },
    { header: "Model", accessorKey: "model", align: "center" },
    { header: "Scenario", accessorKey: "scenario", align: "center" },
    { header: "Horizon", accessorKey: "horizon", align: "center" },
    { header: "Owner", accessorKey: "owner", align: "left" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge status={row.status === "Published" ? "success" : "warning"} label={row.status} />
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleAction(`Record ${row.recordRef}`)}
          className="text-burgundy font-bold text-[10px] hover:underline cursor-pointer"
        >
          {row.action}
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title WITHOUT "AN14" */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-0.5">
            {data.headerMeta.breadcrumb}
          </div>
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
            onClick={() => handleAction("Generate Enterprise Forecast Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
          >
            Generate Enterprise Forecast Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Scenarios")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Compare Scenarios
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Forecast Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Review Forecast Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Enterprise Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Run Enterprise Forecast
          </button>
          <button
            type="button"
            onClick={() => handleAction("Export Forecast Analytics")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Export Forecast Analytics
          </button>
          <button
            type="button"
            onClick={() => handleAction("More Actions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>More Actions</span>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* 2. Top Source / Data Connection Status Strip */}
      <ReadinessStrip items={data.connectionStatus} />

      {/* 3. Primary KPI Grid (9 KPI Cards + 1 Health Card) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-10 gap-2 min-w-0">
        {data.primaryKpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Forecasting & Planning Health */}
        <div className="an02-overall-health-card bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
            Forecasting &amp; Planning Health
          </span>
          <div className="my-1">
            <CircularScore score={data.analyticsHealthKpi.score} maxScore={100} size={58} strokeWidth={5} />
          </div>
          <span className="text-[11px] font-bold text-emerald-700">
            {data.analyticsHealthKpi.label}
          </span>
          <span className="text-[9px] font-medium text-slate-500">
            {data.analyticsHealthKpi.subtext}
          </span>
        </div>
      </div>

      {/* 4. Analytics Tabs */}
      <TabNavigation tabs={data.tabs} activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

      {/* 5. Filter Section & Time-Range Selector */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-xs space-y-3">
        {/* Row 1 Filters & Time Range Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 flex-1">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Forecast Horizon</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>Next 90 Days</option>
                <option>Next 30 Days</option>
                <option>Next 60 Days</option>
                <option>Next 6 Months</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Comparison Period</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>Previous 90 Days</option>
                <option>Prior Year</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Scenario</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>Base Case</option>
                <option>Growth Case</option>
                <option>Downside Case</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Business Unit</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Business Units</option>
                <option>Beauty Retail</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Region</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Regions</option>
                <option>Sri Lanka</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Channel</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Channels</option>
                <option>Direct (Web)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Product Category</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Categories</option>
                <option>Skincare</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Customer Segment</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Segments</option>
              </select>
            </div>
          </div>

          {/* Quick Time Range Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-md shrink-0">
            {rangeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setActiveRange(opt)}
                className={`px-2 py-0.5 text-[10.5px] font-bold rounded transition-all cursor-pointer ${
                  activeRange === opt
                    ? "bg-burgundy text-white shadow-2xs"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2 Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 flex-1 min-w-0">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Supplier</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Suppliers</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Warehouse</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Warehouses</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Marketing Channel</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Channels</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Finance Domain</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Domains</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Forecast Model</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>Ensemble</option>
                <option>ARIMA</option>
                <option>Prophet</option>
                <option>XGBoost</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Confidence Band</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>90%</option>
                <option>95%</option>
                <option>80%</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Confidence Version</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>v2.2 - Final</option>
                <option>v2.1 - Draft</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Risk Domain</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Domains</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 ml-auto pt-2 sm:pt-0">
            <button
              type="button"
              onClick={handleApplyFilters}
              className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white font-bold text-xs rounded shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Filter size={11} /> Apply Filters
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={11} /> Clear All
            </button>
            <button
              type="button"
              onClick={handleSaveView}
              className="px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Save size={11} /> Save View
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="px-2 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw size={11} />
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="px-2 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer"
              title="Export"
            >
              <Download size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* 6. Readiness / Risk Status Strip */}
      <div className="flex flex-wrap items-center gap-2">
        {data.readinessStrip.map((st, idx) => (
          <div key={idx} className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-md text-[11px] shadow-2xs">
            <span className="text-slate-600 font-semibold">{st.label}</span>
            <span
              className={`font-extrabold px-1.5 py-0.2 rounded text-[10px] ${
                st.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : st.type === "danger"
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {st.count}
            </span>
          </div>
        ))}
      </div>

      {/* 7. Main Grid Layout (Left 9 Cols vs Right 3 Cols ForecastingHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Cards 1 to 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Card 1: Enterprise Forecast — Actual vs Forecast vs Target (Next 90 Days) */}
            <AnalyticsPanel number="1." title="Enterprise Forecast — Actual vs Forecast vs Target (Next 90 Days)">
              <ForecastChart data={data.enterpriseForecastChartData} xAxisKey="date" height={180} />
            </AnalyticsPanel>

            {/* Card 2: Enterprise Forecast Scorecard */}
            <AnalyticsPanel number="2." title="Enterprise Forecast Scorecard">
              <AnalyticsTable columns={scorecardCols} data={data.scorecardData} />
            </AnalyticsPanel>

            {/* Card 3: Forecast vs Target Matrix */}
            <AnalyticsPanel number="3." title="Forecast vs Target Matrix">
              <AnalyticsTable columns={targetMatrixCols} data={data.targetMatrixData} />
            </AnalyticsPanel>

            {/* Card 4: Domain Forecast Outlook */}
            <AnalyticsPanel number="4." title="Domain Forecast Outlook">
              <AnalyticsTable columns={outlookCols} data={data.domainForecastOutlook} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Cards 5 to 9 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">

            {/* Card 5: Revenue & Orders Forecast */}
            <AnalyticsPanel number="5." title="Revenue & Orders Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Revenue</span>
                  <span className="font-bold text-slate-900">{data.revenueOrdersForecast.revenue} ({data.revenueOrdersForecast.revenueTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Orders</span>
                  <span className="font-bold text-slate-900">{data.revenueOrdersForecast.orders} ({data.revenueOrdersForecast.ordersTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">AOV</span>
                  <span className="font-bold text-slate-900">{data.revenueOrdersForecast.aov} ({data.revenueOrdersForecast.aovTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Paid Orders</span>
                  <span className="font-bold text-slate-900">{data.revenueOrdersForecast.paidOrders} ({data.revenueOrdersForecast.paidTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Cancellation / Return</span>
                  <span className="font-bold text-emerald-700">{data.revenueOrdersForecast.cancellation} / {data.revenueOrdersForecast.returnRate}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 6: Revenue Driver Bridge (LKR M) */}
            <AnalyticsPanel number="6." title="Revenue Driver Bridge (LKR M)">
              <WaterfallChart data={data.revenueDriverBridge} height={170} />
            </AnalyticsPanel>

            {/* Card 7: Customer Forecast */}
            <AnalyticsPanel number="7." title="Customer Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Active Customers</span>
                  <span className="font-bold text-slate-900">{data.customerForecast.activeCustomers} ({data.customerForecast.activeTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">New Customers</span>
                  <span className="font-bold text-slate-900">{data.customerForecast.newCustomers} ({data.customerForecast.newTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Retention Rate</span>
                  <span className="font-bold text-emerald-700">{data.customerForecast.retentionRate} ({data.customerForecast.retentionTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Churn Rate</span>
                  <span className="font-bold text-emerald-700">{data.customerForecast.churnRate} ({data.customerForecast.churnTrend})</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 8: Marketplace Forecast */}
            <AnalyticsPanel number="8." title="Marketplace Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">GMV</span>
                  <span className="font-bold text-slate-900">{data.marketplaceForecast.gmv} ({data.marketplaceForecast.gmvTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Active Sellers</span>
                  <span className="font-bold text-slate-900">{data.marketplaceForecast.activeSellers} ({data.marketplaceForecast.sellersTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Buy Box</span>
                  <span className="font-bold text-slate-900">{data.marketplaceForecast.buyBox}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Return Rate</span>
                  <span className="font-bold text-emerald-700">{data.marketplaceForecast.returnRate}</span>
                </div>
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 3: Cards 9 to 18 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 9: Product Demand Forecast (Top Categories) */}
            <AnalyticsPanel number="9." title="Product Demand Forecast (Top Categories)" className="xl:col-span-2">
              <AnalyticsTable columns={demandCols} data={data.productDemandForecast} />
            </AnalyticsPanel>

            {/* Card 10: Supplier & Procurement Forecast */}
            <AnalyticsPanel number="10." title="Supplier & Procurement Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Forecast POs</span>
                  <span className="font-bold text-slate-900">{data.supplierProcurement.forecastPos}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Confirmed Spend</span>
                  <span className="font-bold text-slate-900">{data.supplierProcurement.confirmedSpend}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Supplier Capacity</span>
                  <span className="font-bold text-emerald-700">{data.supplierProcurement.supplierCapacity}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Lead Time</span>
                  <span className="font-bold text-slate-900">{data.supplierProcurement.leadTime}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 11: Inventory Outlook */}
            <AnalyticsPanel number="11." title="Inventory Outlook">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Stock Risk</span>
                  <span className="font-bold text-emerald-700">{data.inventoryOutlook.stockRisk}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Stock Cover</span>
                  <span className="font-bold text-slate-900">{data.inventoryOutlook.stockCover}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Inventory Value</span>
                  <span className="font-bold text-slate-900">{data.inventoryOutlook.inventoryValue}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Days of Inv</span>
                  <span className="font-bold text-slate-900">{data.inventoryOutlook.daysOfInventory}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 12: Warehouse Capacity Forecast */}
            <AnalyticsPanel number="12." title="Warehouse Capacity Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Utilization (Forecast)</span>
                  <span className="font-bold text-amber-700">{data.warehouseCapacity.utilizationForecast}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Capacity Gap</span>
                  <span className="font-bold text-amber-700">{data.warehouseCapacity.capacityGap}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Peak Capacity</span>
                  <span className="font-bold text-slate-900">{data.warehouseCapacity.peakCapacity}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Supported Demand</span>
                  <span className="font-bold text-emerald-700">{data.warehouseCapacity.supportedDemand}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 13: Fulfilment & Carrier Forecast */}
            <AnalyticsPanel number="13." title="Fulfilment & Carrier Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">On-Time Delivery</span>
                  <span className="font-bold text-emerald-700">{data.fulfilmentCarrier.onTimeDelivery}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Carrier SLA</span>
                  <span className="font-bold text-slate-900">{data.fulfilmentCarrier.carrierSla}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Service Capacity</span>
                  <span className="font-bold text-slate-900">{data.fulfilmentCarrier.serviceCapacity}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Capacity Gap</span>
                  <span className="font-bold text-amber-700">{data.fulfilmentCarrier.capacityGap}</span>
                </div>
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 4: Cards 14 to 20 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 14: Marketing Forecast */}
            <AnalyticsPanel number="14." title="Marketing Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Marketing Spend</span>
                  <span className="font-bold text-slate-900">{data.marketingForecast.marketingSpend}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Expected Revenue</span>
                  <span className="font-bold text-slate-900">{data.marketingForecast.expectedRevenue}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">ROAS</span>
                  <span className="font-bold text-emerald-700">{data.marketingForecast.roas}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">New Customers</span>
                  <span className="font-bold text-slate-900">{data.marketingForecast.newCustomers}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 15: Finance & Cash Forecast */}
            <AnalyticsPanel number="15." title="Finance & Cash Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Free Cash Flow</span>
                  <span className="font-bold text-slate-900">{data.financeCashForecast.freeCashFlow}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Operating Cash Flow</span>
                  <span className="font-bold text-slate-900">{data.financeCashForecast.operatingCashFlow}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Cash on Hand</span>
                  <span className="font-bold text-slate-900">{data.financeCashForecast.cashOnHand}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Current Ratio</span>
                  <span className="font-bold text-slate-900">{data.financeCashForecast.currentRatio}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 16: Receivables & Payables Forecast */}
            <AnalyticsPanel number="16." title="Receivables & Payables Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Receivables</span>
                  <span className="font-bold text-slate-900">{data.receivablesPayablesForecast.receivables}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">DSO</span>
                  <span className="font-bold text-slate-900">{data.receivablesPayablesForecast.dso}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Payables</span>
                  <span className="font-bold text-slate-900">{data.receivablesPayablesForecast.payables}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">DPO</span>
                  <span className="font-bold text-slate-900">{data.receivablesPayablesForecast.dpo}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 17: Forecast Drivers */}
            <AnalyticsPanel number="17." title="Forecast Drivers">
              <div className="space-y-1 text-[10.5px] py-0.5">
                <span className="font-bold text-emerald-700 block uppercase">Positive Drivers</span>
                {data.forecastDrivers.positiveDrivers.slice(0, 2).map((d, i) => (
                  <div key={i} className="flex justify-between text-slate-600">
                    <span className="truncate">{d.name}</span>
                    <span className="font-bold text-emerald-700">{d.val}</span>
                  </div>
                ))}
                <span className="font-bold text-rose-700 block uppercase pt-1">Negative Drivers</span>
                {data.forecastDrivers.negativeDrivers.slice(0, 2).map((d, i) => (
                  <div key={i} className="flex justify-between text-slate-600">
                    <span className="truncate">{d.name}</span>
                    <span className="font-bold text-rose-700">{d.val}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Card 18: Forecast Accuracy */}
            <AnalyticsPanel number="18." title="Forecast Accuracy">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Forecast Count</span>
                  <span className="font-bold text-slate-900">{data.forecastAccuracy.forecastCount}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Accuracy</span>
                  <span className="font-bold text-emerald-700">{data.forecastAccuracy.accuracy}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">MAPE / MAE</span>
                  <span className="font-bold text-slate-900">{data.forecastAccuracy.mape} / {data.forecastAccuracy.mae}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Bias</span>
                  <span className="font-bold text-slate-900">{data.forecastAccuracy.bias}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 19: Risk & Compliance Forecast */}
            <AnalyticsPanel number="19." title="Risk & Compliance Forecast">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Open Risks</span>
                  <span className="font-bold text-slate-900">{data.riskComplianceForecast.openRisks}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Critical Risks</span>
                  <span className="font-bold text-rose-700">{data.riskComplianceForecast.criticalRisks}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Compliance Score</span>
                  <span className="font-bold text-emerald-700">{data.riskComplianceForecast.complianceScore}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Exposure</span>
                  <span className="font-bold text-rose-700">{data.riskComplianceForecast.financialExposure}</span>
                </div>
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 5: Cards 20 to 24 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {/* Card 20: Enterprise Capacity Planning */}
            <AnalyticsPanel number="20." title="Enterprise Capacity Planning" className="xl:col-span-2">
              <AnalyticsTable columns={capacityCols} data={data.enterpriseCapacityPlanning} />
            </AnalyticsPanel>

            {/* Card 21: Capacity Gap Matrix */}
            <AnalyticsPanel number="21." title="Capacity Gap Matrix">
              <HorizontalBarChart
                data={data.capacityGapMatrix}
                height={170}
              />
            </AnalyticsPanel>

            {/* Card 22: Scenario Comparison */}
            <AnalyticsPanel number="22." title="Scenario Comparison" className="xl:col-span-2">
              <AnalyticsTable columns={scenarioCols} data={data.scenarioComparison} />
            </AnalyticsPanel>
          </div>

          {/* Row 6: Cards 23 to 24 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card 23: Sensitivity Analysis (Impact) */}
            <AnalyticsPanel number="23." title="Sensitivity Analysis (Impact)">
              <SensitivityChart data={data.sensitivityAnalysis} height={200} />
            </AnalyticsPanel>

            {/* Card 24: Forecast Drivers (Top) */}
            <AnalyticsPanel number="24." title="Forecast Drivers (Top)">
              <AnalyticsTable columns={driverCols} data={data.forecastDriversTop} />
            </AnalyticsPanel>
          </div>

          {/* Bottom Grid: Cards 25 to 27 */}
          <div className="space-y-4">
            {/* Card 25: Underlying Forecast & Planning Records */}
            <AnalyticsPanel number="25." title="Underlying Forecast & Planning Records">
              <div className="space-y-3">
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="relative w-full sm:w-72">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search ref, domain, metric, owner..."
                      className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-md text-xs bg-slate-50 focus:outline-none focus:border-burgundy"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>
                      Showing {paginatedRecords.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0} to{" "}
                      {Math.min(currentPage * recordsPerPage, filteredRecords.length)} of {filteredRecords.length} records
                    </span>
                  </div>
                </div>

                {/* Table */}
                <AnalyticsTable columns={underlyingCols} data={paginatedRecords} />

                {/* Pagination */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft size={12} /> Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setCurrentPage(p)}
                        className={`w-6 h-6 rounded text-xs font-semibold cursor-pointer ${
                          currentPage === p
                            ? "bg-burgundy text-white font-bold"
                            : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 cursor-pointer"
                  >
                    Next <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </AnalyticsPanel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Card 26: Forecast Exception Center */}
              <AnalyticsPanel number="26." title="Forecast Exception Center">
                <AnalyticsTable columns={exceptionCols} data={data.forecastExceptions} />
              </AnalyticsPanel>

              {/* Card 27: Early Warning Indicators */}
              <AnalyticsPanel number="27." title="Early Warning Indicators">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
                  {data.earlyWarnings.map((ew, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs space-y-1 flex flex-col justify-between ${
                        ew.severity === "danger"
                          ? "bg-rose-50/70 border-rose-200 text-rose-900"
                          : ew.severity === "warning"
                          ? "bg-amber-50/70 border-amber-200 text-amber-900"
                          : "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="truncate">{ew.label}</span>
                        {ew.severity === "danger" ? (
                          <AlertTriangle size={12} className="text-rose-600 shrink-0" />
                        ) : ew.severity === "warning" ? (
                          <Zap size={12} className="text-amber-600 shrink-0" />
                        ) : (
                          <CheckCircle size={12} className="text-emerald-600 shrink-0" />
                        )}
                      </div>

                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-base font-extrabold">{ew.metric}</span>
                        <span className="text-[10px] opacity-80 font-medium">{ew.horizon}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AnalyticsPanel>
            </div>
          </div>
        </div>

        {/* Right Summary Rail (3 Cols) */}
        <div className="w-full 2xl:w-80 shrink-0">
          <ForecastingHealthRail
            data={data.healthRailData}
            onActionClick={(action) => handleAction(action)}
          />
        </div>
      </div>
    </AnalyticsShell>
  );
}
