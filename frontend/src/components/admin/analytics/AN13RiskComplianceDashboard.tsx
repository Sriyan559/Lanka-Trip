"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  RISK_COMPLIANCE_DATA,
  RiskScorecardRow,
  SafetyRecallRow,
  PaymentRiskRow,
  ControlFailureRow,
  ForecastVsTargetRow,
  UnderlyingRiskRecord,
} from "@/data/analytics/riskComplianceData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { ComboChart } from "@/components/analytics/charts/ComboChart";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { SparklineChart } from "@/components/analytics/charts/SparklineChart";
import { RiskComplianceHealthRail } from "@/components/analytics/RiskComplianceHealthRail";
import { StatusBadge } from "@/components/analytics/StatusBadge";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";

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
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  FileText,
} from "lucide-react";

export function AN13RiskComplianceDashboard() {
  const data = RISK_COMPLIANCE_DATA;
  const [activeTab, setActiveTab] = useState("Risk Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  const handleApplyFilters = () => toast.success("Risk & Compliance filters applied.");
  const handleClearFilters = () => toast.success("Filters reset to default.");
  const handleSaveView = () => toast.success("Risk analytics view saved.");
  const handleRefresh = () => toast.success("Risk indicators refreshed.");
  const handleExport = () => toast.success("Risk & Compliance Analytics report exported.");

  // Scorecard Columns
  const scorecardCols: ColumnDef<RiskScorecardRow>[] = [
    { header: "Domain", accessorKey: "domain", align: "left" },
    { header: "Current", accessorKey: "current", align: "right", cellType: "number" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "number" },
    { header: "Previous", accessorKey: "previous", align: "right", cellType: "number" },
    { header: "Variance", accessorKey: "variance", align: "right" },
    {
      header: "Trend",
      accessorKey: "trend",
      align: "center",
      renderCell: (row) => <TrendIndicator value={0} direction={row.trend} />,
    },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.status === "Good" ? "success" : row.status === "Watch" ? "warning" : "danger"}
          label={row.status}
        />
      ),
    },
  ];

  // Payment Risk Columns
  const paymentCols: ColumnDef<PaymentRiskRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "Total", accessorKey: "total", align: "right" },
    { header: "High Risk", accessorKey: "highRisk", align: "right" },
    { header: "Chargebacks", accessorKey: "chargebacks", align: "right" },
    { header: "Fraud Loss", accessorKey: "fraudLoss", align: "right" },
    { header: "Risk Rate", accessorKey: "riskRate", align: "right" },
  ];

  // Control Failures Columns
  const controlFailureCols: ColumnDef<ControlFailureRow>[] = [
    { header: "Domain", accessorKey: "domain", align: "left" },
    { header: "Open", accessorKey: "open", align: "right", cellType: "number" },
    { header: "Critical", accessorKey: "critical", align: "right", cellType: "number" },
    { header: "Repeat", accessorKey: "repeat", align: "right", cellType: "number" },
    { header: ">30 Days", accessorKey: "gt30Days", align: "right", cellType: "number" },
    { header: "Exposure", accessorKey: "status", align: "right" },
  ];

  // Forecast vs Target Columns
  const forecastVsTargetCols: ColumnDef<ForecastVsTargetRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Forecast", accessorKey: "forecast", align: "right" },
    { header: "Target", accessorKey: "target", align: "right" },
    { header: "Variance", accessorKey: "variance", align: "right" },
  ];

  // Underlying Records Filtering & Pagination
  const filteredRecords = data.underlyingRecords.filter((rec) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      rec.reference.toLowerCase().includes(q) ||
      rec.entity.toLowerCase().includes(q) ||
      rec.domain.toLowerCase().includes(q) ||
      rec.owner.toLowerCase().includes(q) ||
      rec.rulePolicy.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const underlyingCols: ColumnDef<UnderlyingRiskRecord>[] = [
    { header: "Reference", accessorKey: "reference", align: "left" },
    { header: "Record Type", accessorKey: "recordType", align: "left" },
    { header: "Entity Type", accessorKey: "entityType", align: "center" },
    { header: "Entity", accessorKey: "entity", align: "left" },
    { header: "Domain", accessorKey: "domain", align: "center" },
    { header: "Risk Score", accessorKey: "riskScore", align: "right", cellType: "number" },
    {
      header: "Risk Level",
      accessorKey: "riskLevel",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.riskLevel === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : row.riskLevel === "Med"
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {row.riskLevel}
        </span>
      ),
    },
    { header: "Rule / Policy", accessorKey: "rulePolicy", align: "left" },
    {
      header: "Compliance",
      accessorKey: "complianceStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={
            row.complianceStatus === "Good"
              ? "success"
              : row.complianceStatus === "Watch"
              ? "warning"
              : "danger"
          }
          label={row.complianceStatus}
        />
      ),
    },
    { header: "Fraud Signal", accessorKey: "fraudSignal", align: "center" },
    { header: "Control", accessorKey: "control", align: "left" },
    { header: "Exposure", accessorKey: "exposure", align: "right" },
    { header: "Owner", accessorKey: "owner", align: "left" },
    { header: "Detected", accessorKey: "detected", align: "center" },
    { header: "Age", accessorKey: "age", align: "center" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.status === "Resolved" ? "success" : row.status === "Pending" ? "warning" : "danger"}
          label={row.status}
        />
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleAction(`Record ${row.reference}`)}
          className="text-burgundy font-bold text-[10px] hover:underline cursor-pointer"
        >
          {row.action}
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Header — NO "AN13" in visible heading */}
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
            onClick={() => handleAction("Generate Risk Analytics Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
          >
            Generate Risk Analytics Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Critical Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Review Critical Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Compliance Exceptions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Review Compliance Exceptions
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Risk Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Run Risk Forecast
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

      {/* 2. Top System / Source Connectivity Row */}
      <ReadinessStrip items={data.connectionStatus} />

      {/* 3. KPI Section */}
      <div className="space-y-2.5">
        {/* Row 1 Primary KPIs + Health Gauge */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-9 gap-2 min-w-0">
          {data.primaryKpis.map((kpi) => (
            <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
          ))}

          {/* Card 9: Risk & Compliance Health Card */}
          <div className="an02-overall-health-card bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
              Risk &amp; Compliance Health
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

        {/* Row 2 Secondary Compact KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-7 gap-2 min-w-0">
          {data.secondaryKpis.map((skpi) => (
            <div key={skpi.id} className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between min-w-0 overflow-hidden">
              <div className="min-w-0 flex-1 pr-1">
                <span className="text-[9.5px] font-bold text-slate-500 uppercase block truncate">{skpi.title}</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 whitespace-nowrap">{skpi.mainValue}</span>
              </div>
              <div className="w-12 h-6 shrink-0 overflow-hidden">
                <SparklineChart data={skpi.sparklineData} color="#2563eb" width={48} height={22} showDots={true} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Analytics Tabs */}
      <TabNavigation tabs={data.tabs} activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

      {/* 5. Filter Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-2 flex-1">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Reporting Period</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>Last 30 Days</option>
                <option>Last 60 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Comparison Period</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>Previous 30 Days</option>
                <option>Prior Year</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Business Unit</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Business Units</option>
                <option>Beauty Marketplace</option>
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
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Risk Domain</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Domains</option>
                <option>Customer Risk</option>
                <option>Seller Risk</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Entity Type</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Entities</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Case Status</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Statuses</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Compliance Status</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Risk Level</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Levels</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 pt-2 lg:pt-0">
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

      {/* 6. Status / Risk Chips */}
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

      {/* 7. Main Dashboard Grid Layout */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Cards 1 to 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Card 1: Enterprise Risk & Compliance Trend (Last 30 Days) */}
            <AnalyticsPanel number="1." title="Enterprise Risk & Compliance Trend (Last 30 Days)" className="xl:col-span-2">
              <ComboChart
                data={data.enterpriseRiskTrendData}
                xAxisKey="date"
                bars={[
                  { key: "fraudAlerts", name: "Fraud Alerts", color: "#e11d48" },
                  { key: "policyViolations", name: "Policy Violations", color: "#ea580c" },
                ]}
                lines={[
                  { key: "openRisks", name: "Open Risks", color: "#2563eb", strokeWidth: 2.2 },
                  { key: "criticalRisks", name: "Critical Risks", color: "#be123c", strokeWidth: 2.2 },
                  { key: "complianceScore", name: "Compliance Score %", color: "#16a34a", strokeWidth: 2.2, rightYAxis: true },
                ]}
                height={180}
              />
            </AnalyticsPanel>

            {/* Card 2: Risk Composition */}
            <AnalyticsPanel number="2." title="Risk Composition">
              <PieChart
                data={data.riskCompositionData}
                centerLabel="184"
                centerSublabel="Open Risks"
                height={180}
              />
            </AnalyticsPanel>

            {/* Card 3: Enterprise Risk Scorecard */}
            <AnalyticsPanel number="3." title="Enterprise Risk Scorecard">
              <AnalyticsTable columns={scorecardCols} data={data.riskScorecardData} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Cards 4 to 11 */}
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-3">
            {/* Card 4: Risk Concentration (Pareto) */}
            <AnalyticsPanel number="4." title="Risk Concentration (Pareto)">
              <HorizontalBarChart data={data.riskConcentrationData} height={170} />
            </AnalyticsPanel>

            {/* Card 5: Customer Risk Portfolio */}
            <AnalyticsPanel number="5." title="Customer Risk Portfolio">
              <div className="space-y-1 text-xs py-1">
                {data.customerRiskPortfolio.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-extrabold text-rose-700">{item.count}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Card 6: Seller Risk Portfolio */}
            <AnalyticsPanel number="6." title="Seller Risk Portfolio">
              <div className="space-y-1 text-xs py-1">
                {data.sellerRiskPortfolio.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-extrabold text-rose-700">{item.count}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Card 7: Supplier Risk Portfolio */}
            <AnalyticsPanel number="7." title="Supplier Risk Portfolio">
              <div className="space-y-1 text-xs py-1">
                {data.supplierRiskPortfolio.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-extrabold text-rose-700">{item.count}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Card 8: Product Risk Portfolio */}
            <AnalyticsPanel number="8." title="Product Risk Portfolio">
              <div className="space-y-1 text-xs py-1">
                {data.productRiskPortfolio.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-extrabold text-rose-700">{item.count}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Card 9: Authenticity / Counterfeit Risk */}
            <AnalyticsPanel number="9." title="Authenticity / Counterfeit Risk">
              <PieChart data={data.authenticityData} height={130} />
              <div className="text-center text-[10.5px] font-bold text-rose-700 mt-1">
                Revenue Exposure: {data.authenticityExposure}
              </div>
            </AnalyticsPanel>

            {/* Card 10: Product Safety & Recall */}
            <AnalyticsPanel number="10." title="Product Safety & Recall">
              <div className="space-y-1 text-xs py-1">
                {data.productSafetyRecall.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                    <span className="text-slate-600 font-medium">{item.metric}</span>
                    <span className="font-extrabold text-slate-900">{item.val}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 3: Cards 11 to 16 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 11: Policy Violations (Top Types) */}
            <AnalyticsPanel number="11." title="Policy Violations (Top Types)">
              <HorizontalBarChart data={data.policyViolationsTypes} height={170} />
            </AnalyticsPanel>

            {/* Card 12: Fraud Analytics (Last 30 Days) */}
            <AnalyticsPanel number="12." title="Fraud Analytics (Last 30 Days)">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Fraud Alerts</span>
                  <span className="font-bold text-rose-700">{data.fraudAnalytics.fraudAlerts} ({data.fraudAnalytics.alertsTrend})</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Confirmed / Blocked</span>
                  <span className="font-bold text-slate-900">{data.fraudAnalytics.confirmed} / {data.fraudAnalytics.blocked}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Exposure</span>
                  <span className="font-bold text-rose-700">{data.fraudAnalytics.exposure}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Prevented</span>
                  <span className="font-bold text-emerald-700">{data.fraudAnalytics.prevented}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">False Positives</span>
                  <span className="font-bold text-slate-900">{data.fraudAnalytics.falsePositives}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 13: Fraud Trend (Last 30 Days) */}
            <AnalyticsPanel number="13." title="Fraud Trend (Last 30 Days)">
              <LineChart
                data={data.fraudTrendData}
                xAxisKey="date"
                series={[
                  { key: "alerts", name: "Alerts", color: "#e11d48" },
                  { key: "confirmed", name: "Confirmed", color: "#be123c" },
                  { key: "blocked", name: "Blocked", color: "#16a34a" },
                ]}
                height={170}
              />
            </AnalyticsPanel>

            {/* Card 14: Transaction Risk */}
            <AnalyticsPanel number="14." title="Transaction Risk">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Evaluated</span>
                  <span className="font-bold text-slate-900">{data.transactionRisk.evaluated}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">High Risk / Challenged</span>
                  <span className="font-bold text-rose-700">{data.transactionRisk.highRisk} / {data.transactionRisk.challenged}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Blocked</span>
                  <span className="font-bold text-emerald-700">{data.transactionRisk.blocked}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Fraud Loss</span>
                  <span className="font-bold text-rose-700">{data.transactionRisk.fraudLoss}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 15: Payment Risk Performance */}
            <AnalyticsPanel number="15." title="Payment Risk Performance" className="xl:col-span-2">
              <AnalyticsTable columns={paymentCols} data={data.paymentRiskPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 4: Cards 16 to 22 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 16: Policy Exposure Summary */}
            <AnalyticsPanel number="16." title="Policy Exposure Summary">
              <div className="space-y-2 text-xs py-1">
                <div className="p-2 bg-rose-50/60 border border-rose-100 rounded">
                  <span className="text-[10px] font-bold text-rose-800 uppercase block">Potential Exposure</span>
                  <span className="text-base font-extrabold text-rose-700">{data.policyExposureSummary.potentialExposure}</span>
                </div>
                <div className="p-2 bg-emerald-50/60 border border-emerald-100 rounded">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Prevented Exposure</span>
                  <span className="text-base font-extrabold text-emerald-700">{data.policyExposureSummary.preventedExposure}</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-[10px] font-bold text-slate-600 uppercase block">Realized Loss</span>
                  <span className="text-sm font-bold text-slate-900">{data.policyExposureSummary.realizedLoss}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 17: Control Effectiveness (Score) */}
            <AnalyticsPanel number="17." title="Control Effectiveness (Score)">
              <HorizontalBarChart data={data.controlEffectiveness} height={170} />
            </AnalyticsPanel>

            {/* Card 18: Control Failures */}
            <AnalyticsPanel number="18." title="Control Failures" className="xl:col-span-2">
              <AnalyticsTable columns={controlFailureCols} data={data.controlFailures} />
            </AnalyticsPanel>

            {/* Card 19: Emerging Risks (Top 5) */}
            <AnalyticsPanel number="19." title="Emerging Risks (Top 5)">
              <div className="flex items-center gap-3 py-1 min-w-0">
                {/* Segmented Donut Ring */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <PieChart
                    data={data.emergingRisksDonut}
                    innerRadius="60%"
                    outerRadius="90%"
                    height={96}
                    showLegend={false}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-base font-extrabold text-slate-900 leading-none">{data.emergingRisksCount}</span>
                    <span className="text-[9px] font-medium text-slate-500 mt-0.5">Open</span>
                  </div>
                </div>

                {/* Aligned Breakdown Table */}
                <div className="flex-1 min-w-0">
                  {/* Table Headers */}
                  <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 text-[10px] font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-1">
                    <span></span>
                    <span className="text-right w-16 whitespace-nowrap">Risk Score</span>
                    <span className="text-right w-14 whitespace-nowrap">Velocity</span>
                  </div>

                  {/* Table Rows */}
                  <div className="space-y-1.5">
                    {data.emergingRisksBreakdown.map((eb, idx) => (
                      <div key={idx} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 text-[11px]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: eb.color }} />
                          <span className="font-bold text-slate-700 truncate">{eb.label}</span>
                        </div>
                        <div className="font-extrabold text-slate-900 text-right tabular-nums w-16">{eb.count}</div>
                        <div className={`font-extrabold text-right tabular-nums w-14 ${eb.velocityColor}`}>{eb.velocity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 20: Enterprise Risk Forecast (Next 30 Days) */}
            <AnalyticsPanel number="20." title="Enterprise Risk Forecast (Next 30 Days)">
              <LineChart
                data={data.enterpriseRiskForecastData}
                xAxisKey="date"
                series={[
                  { key: "openRisks", name: "Open Risks", color: "#2563eb" },
                  { key: "criticalRisks", name: "Critical Risks", color: "#be123c" },
                  { key: "fraudAlerts", name: "Fraud Alerts", color: "#ea580c" },
                ]}
                height={170}
              />
            </AnalyticsPanel>
          </div>

          {/* Row 5: Cards 21 & 22 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card 21: Forecast vs Target */}
            <AnalyticsPanel number="21." title="Forecast vs Target">
              <AnalyticsTable columns={forecastVsTargetCols} data={data.forecastVsTarget} />
            </AnalyticsPanel>

            {/* Card 22: Priority Insights */}
            <AnalyticsPanel number="22." title="Priority Insights">
              <div className="space-y-2 py-1 text-xs">
                {data.priorityInsights.map((pi, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded text-[11px]">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-burgundy text-white shrink-0">
                      {pi.category}
                    </span>
                    <span className="text-slate-700 font-medium">{pi.detail}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>
          </div>

          {/* Card 23: Bottom Underlying Records Table */}
          <AnalyticsPanel number="23." title="Underlying Risk & Compliance Analytics Records">
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
                    placeholder="Search ref, entity, domain, rule, owner..."
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
        </div>

        {/* Right Summary Panel */}
        <div className="w-full 2xl:w-80 shrink-0">
          <RiskComplianceHealthRail
            data={data.healthRailData}
            onActionClick={(action) => handleAction(action)}
          />
        </div>
      </div>
    </AnalyticsShell>
  );
}
