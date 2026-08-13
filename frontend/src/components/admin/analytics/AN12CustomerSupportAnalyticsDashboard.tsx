"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  CUSTOMER_SUPPORT_DATA,
  SlaScorecardRow,
  QueuePerformanceRow,
  ChannelPerformanceRow,
  TeamPerformanceRow,
  AgentPerformanceRow,
  SupportExceptionRow,
  UnderlyingSupportRecord,
} from "@/data/analytics/customerSupportData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { ComboChart } from "@/components/analytics/charts/ComboChart";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { FunnelChart } from "@/components/analytics/charts/FunnelChart";
import { CustomerSupportHealthRail } from "@/components/analytics/CustomerSupportHealthRail";
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
} from "lucide-react";

export function AN12CustomerSupportAnalyticsDashboard() {
  const data = CUSTOMER_SUPPORT_DATA;
  const [activeTab, setActiveTab] = useState("Support Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  // Filter handlers
  const handleApplyFilters = () => toast.success("Filters applied successfully.");
  const handleClearFilters = () => toast.success("Filters cleared.");
  const handleSaveView = () => toast.success("Current view saved.");
  const handleRefresh = () => toast.success("Dashboard data refreshed.");
  const handleExport = () => toast.success("Analytics report exported (CSV/PDF).");

  // SLA Scorecard Columns
  const slaScorecardCols: ColumnDef<SlaScorecardRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "text" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "text" },
    {
      header: "Variance",
      accessorKey: "variance",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.variance} isPositive={row.isPositive !== false} />,
    },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.status === "Good" ? "success" : row.status === "Warning" ? "warning" : "danger"}
          label={row.status}
        />
      ),
    },
  ];

  // Queue Performance Matrix Columns
  const queueCols: ColumnDef<QueuePerformanceRow>[] = [
    { header: "Queue", accessorKey: "queue", align: "left" },
    { header: "Cases", accessorKey: "cases", align: "right", cellType: "number" },
    { header: "New", accessorKey: "newCases", align: "right", cellType: "number" },
    { header: "Backlog", accessorKey: "backlog", align: "right", cellType: "number" },
    { header: "SLA", accessorKey: "sla", align: "right", cellType: "text" },
    { header: "First Response", accessorKey: "firstResponse", align: "right", cellType: "text" },
    { header: "Resolution", accessorKey: "resolution", align: "right", cellType: "text" },
    { header: "FCR", accessorKey: "fcr", align: "right", cellType: "text" },
    { header: "Response Rate", accessorKey: "responseRate", align: "right", cellType: "text" },
    { header: "Escalation Rate", accessorKey: "escalationRate", align: "right", cellType: "text" },
    { header: "CSAT", accessorKey: "csat", align: "right", cellType: "text" },
    { header: "Utilization", accessorKey: "utilization", align: "right", cellType: "text" },
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
  ];

  // Channel Performance Columns
  const channelCols: ColumnDef<ChannelPerformanceRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "New", accessorKey: "newCases", align: "right", cellType: "number" },
    { header: "Resolved", accessorKey: "resolvedCases", align: "right", cellType: "number" },
    { header: "SLA", accessorKey: "sla", align: "right", cellType: "text" },
    { header: "FCR", accessorKey: "fcr", align: "right", cellType: "text" },
    { header: "CSAT", accessorKey: "csat", align: "right", cellType: "text" },
  ];

  // Team Performance Columns
  const teamCols: ColumnDef<TeamPerformanceRow>[] = [
    { header: "Team", accessorKey: "team", align: "left" },
    { header: "Cases", accessorKey: "cases", align: "right", cellType: "number" },
    { header: "SLA", accessorKey: "sla", align: "right", cellType: "text" },
    { header: "FCR", accessorKey: "fcr", align: "right", cellType: "text" },
    { header: "CSAT", accessorKey: "csat", align: "right", cellType: "text" },
    { header: "Backlog", accessorKey: "backlog", align: "right", cellType: "number" },
    { header: "Resolution", accessorKey: "resolution", align: "right", cellType: "text" },
  ];

  // Agent Performance Columns
  const agentCols: ColumnDef<AgentPerformanceRow>[] = [
    { header: "Agent", accessorKey: "agent", align: "left" },
    { header: "Resolved", accessorKey: "resolved", align: "right", cellType: "number" },
    { header: "Cases", accessorKey: "cases", align: "right", cellType: "number" },
    { header: "SLA", accessorKey: "sla", align: "right", cellType: "text" },
    { header: "FCR", accessorKey: "fcr", align: "right", cellType: "text" },
    { header: "CSAT", accessorKey: "csat", align: "right", cellType: "text" },
    { header: "Avg Resolution", accessorKey: "avgResolution", align: "right", cellType: "text" },
  ];

  // Support Exception Center Columns
  const exceptionCols: ColumnDef<SupportExceptionRow>[] = [
    { header: "Exception", accessorKey: "exception", align: "left" },
    { header: "Count", accessorKey: "count", align: "right", cellType: "number" },
    {
      header: "Impact",
      accessorKey: "impact",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.impact === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : row.impact === "Med"
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {row.impact}
        </span>
      ),
    },
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
      rec.caseReference.toLowerCase().includes(q) ||
      rec.customer.toLowerCase().includes(q) ||
      rec.queue.toLowerCase().includes(q) ||
      rec.agent.toLowerCase().includes(q) ||
      rec.issue.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const underlyingCols: ColumnDef<UnderlyingSupportRecord>[] = [
    { header: "Case Reference", accessorKey: "caseReference", align: "left" },
    { header: "Customer", accessorKey: "customer", align: "left" },
    { header: "Segment", accessorKey: "segment", align: "center" },
    { header: "Queue", accessorKey: "queue", align: "left" },
    { header: "Team", accessorKey: "team", align: "left" },
    { header: "Agent", accessorKey: "agent", align: "left" },
    { header: "Issue", accessorKey: "issue", align: "left" },
    {
      header: "Priority",
      accessorKey: "priority",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.priority === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : row.priority === "Medium"
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
        >
          {row.priority}
        </span>
      ),
    },
    { header: "Created", accessorKey: "created", align: "center" },
    { header: "First Response", accessorKey: "firstResponse", align: "right" },
    { header: "Resolution", accessorKey: "resolution", align: "right" },
    {
      header: "SLA",
      accessorKey: "sla",
      align: "center",
      renderCell: (row) => (
        <StatusBadge status={row.sla === "Met" ? "success" : "danger"} label={row.sla} />
      ),
    },
    { header: "FCR", accessorKey: "fcr", align: "center" },
    { header: "CSAT", accessorKey: "csat", align: "right", cellType: "number" },
    { header: "CES", accessorKey: "ces", align: "right", cellType: "number" },
    { header: "QA Score", accessorKey: "qaScore", align: "right" },
    { header: "Escalated", accessorKey: "escalated", align: "center" },
    { header: "Recovery", accessorKey: "recovery", align: "center" },
    {
      header: "Support Cost",
      accessorKey: "supportCost",
      align: "right",
      renderCell: (row) => formatCurrency(row.supportCost, "LKR"),
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
    {
      header: "Action",
      accessorKey: "action",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleAction(`Case ${row.caseReference}`)}
          className="text-burgundy font-bold text-[10px] hover:underline cursor-pointer"
        >
          {row.action}
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title without "AN12" */}
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
            onClick={() => handleAction("Generate Support Analytics Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
          >
            Generate Support Analytics Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Service Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Review Service Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review SLA Exceptions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Review SLA Exceptions
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Support Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Run Support Forecast
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

      {/* 2. Top Connection / Status Strip */}
      <ReadinessStrip items={data.connectionStatus} />

      {/* 3. Primary KPI Grid (9 KPI Cards + 1 Support Analytics Health Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.primaryKpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Support Analytics Health */}
        <div className="an02-overall-health-card bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
            Support Analytics Health
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

      {/* Secondary KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {data.secondaryKpis.map((kpi) => (
          <div
            key={kpi.id}
            onClick={() => handleAction(`KPI ${kpi.title}`)}
            className="bg-white border border-slate-200 rounded-lg p-2 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
          >
            <div className="text-[10px] font-semibold text-slate-500 truncate">{kpi.title}</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">{kpi.value}</div>
            <div className="mt-1 flex items-center justify-between text-[10px]">
              <span
                className={`font-bold flex items-center gap-0.5 ${
                  kpi.isPositive !== false ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {kpi.trendDirection === "up" ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Analytics Tabs */}
      <TabNavigation tabs={data.tabs} activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

      {/* 5. Filter Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs text-xs space-y-3">
        {/* Row 1 Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Reporting Period</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Quarter to Date</option>
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
              <option>Beauty Retail</option>
              <option>Wellness</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Region</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Regions</option>
              <option>Western Province</option>
              <option>Central Province</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Support Team</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Teams</option>
              <option>Customer Ops</option>
              <option>Returns Team</option>
              <option>Product Support</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Agent</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Agents</option>
              <option>Aarav Khan</option>
              <option>Rahul Das</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Queue</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Queues</option>
              <option>Order &amp; Delivery</option>
              <option>Returns &amp; Refunds</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Channel</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Channels</option>
              <option>Phone</option>
              <option>Email</option>
              <option>WhatsApp</option>
            </select>
          </div>
        </div>

        {/* Row 2 Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 flex-1 min-w-0">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Support Category</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Categories</option>
                <option>Order &amp; Delivery</option>
                <option>Product &amp; Quality</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Issue Type</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Issues</option>
                <option>Billing</option>
                <option>Refund Status</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Case Priority</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">SLA Status</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All SLA</option>
                <option>Met</option>
                <option>Breached</option>
                <option>At Risk</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Customer Segment</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Segments</option>
                <option>VIP</option>
                <option>Premium</option>
                <option>Standard</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Sentiment</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Sentiments</option>
                <option>Positive</option>
                <option>Neutral</option>
                <option>Negative</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Risk Level</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Risks</option>
                <option>Low Risk</option>
                <option>Medium Risk</option>
                <option>High Risk</option>
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

      {/* 7. Main Grid Layout (Left 9 Cols vs Right 3 Cols CustomerSupportHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Cards 1 to 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            {/* Card 1: Support Demand & Service Trend */}
            <AnalyticsPanel number="1." title="Support Demand & Service Trend" className="xl:col-span-2">
              <ComboChart
                data={data.supportDemandTrend}
                xAxisKey="date"
                height={180}
                series={[
                  { key: "newCases", name: "New Cases", type: "bar", color: "#800020" },
                  { key: "resolvedCases", name: "Resolved Cases", type: "bar", color: "#2563eb" },
                  { key: "openBacklog", name: "Open Backlog", type: "bar", color: "#d97706" },
                  { key: "slaCompliance", name: "SLA Compliance %", type: "line", color: "#059669", yAxisId: "right" },
                  { key: "csat", name: "CSAT %", type: "line", color: "#7c3aed", yAxisId: "right" },
                ]}
              />
            </AnalyticsPanel>

            {/* Card 2: Demand Composition */}
            <AnalyticsPanel number="2." title="Demand Composition">
              <PieChart
                data={data.demandComposition}
                centerText="1,184"
                centerSubtext="New Cases"
                height={180}
              />
            </AnalyticsPanel>

            {/* Card 3: Case Lifecycle Funnel */}
            <AnalyticsPanel number="3." title="Case Lifecycle Funnel">
              <FunnelChart data={data.caseLifecycleFunnel} height={180} />
            </AnalyticsPanel>

            {/* Card 4: SLA Performance */}
            <AnalyticsPanel number="4." title="SLA Performance">
              <div className="flex flex-col items-center justify-center space-y-2 py-1">
                <CircularScore score={data.slaPerformance.score} maxScore={100} size={78} strokeWidth={7} label="SLA Compliance" />
                <div className="w-full space-y-1 text-[11px] pt-1">
                  {data.slaPerformance.breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-600 font-medium">{item.label}</span>
                      </span>
                      <span className="font-bold text-slate-800">{item.value} ({item.percentage})</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 5: SLA Scorecard */}
            <AnalyticsPanel number="5." title="SLA Scorecard">
              <AnalyticsTable columns={slaScorecardCols} data={data.slaScorecard} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Cards 6 to 9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Card 6: Queue Performance Matrix */}
            <AnalyticsPanel number="6." title="Queue Performance Matrix" className="xl:col-span-2">
              <AnalyticsTable columns={queueCols} data={data.queuePerformance} />
            </AnalyticsPanel>

            {/* Card 7: Channel Performance */}
            <AnalyticsPanel number="7." title="Channel Performance">
              <AnalyticsTable columns={channelCols} data={data.channelPerformance} />
            </AnalyticsPanel>

            {/* Card 8: Top Contact Reasons (New Cases) */}
            <AnalyticsPanel number="8." title="Top Contact Reasons (New Cases)">
              <HorizontalBarChart
                data={data.topContactReasons.map((r) => ({
                  tier: r.category,
                  priceVsMarket: `${r.count} (${r.percentage}%)`,
                  skuPercent: r.percentage,
                }))}
                height={170}
              />
            </AnalyticsPanel>
          </div>

          {/* Row 3: Cards 9 to 18 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 9: Case Priority Distribution */}
            <AnalyticsPanel number="9." title="Case Priority Distribution">
              <PieChart data={data.casePriorityDistribution} height={170} />
            </AnalyticsPanel>

            {/* Card 10: Resolution Distribution */}
            <AnalyticsPanel number="10." title="Resolution Distribution">
              <div className="space-y-1.5 text-xs py-1">
                {data.resolutionDistribution.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-slate-700 truncate">{item.category}</span>
                      <span className="font-bold text-slate-900">{item.count} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Card 11: FCR Analytics */}
            <AnalyticsPanel number="11." title="FCR Analytics">
              <PieChart
                data={data.fcrAnalytics.breakdown}
                centerText="81%"
                centerSubtext="FCR"
                height={170}
              />
            </AnalyticsPanel>

            {/* Card 12: Customer Satisfaction (CSAT) */}
            <AnalyticsPanel number="12." title="Customer Satisfaction (CSAT)">
              <div className="space-y-2 py-1 text-xs">
                <div className="text-center bg-emerald-50 border border-emerald-100 rounded-lg p-2">
                  <span className="text-lg font-extrabold text-emerald-800">{data.csatAnalytics.avg}</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">Average CSAT Score</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Positive</span>
                    <span className="font-bold text-emerald-700">{data.csatAnalytics.positive}% ({data.csatAnalytics.positiveDelta})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Neutral</span>
                    <span className="font-bold text-amber-700">{data.csatAnalytics.neutral}% ({data.csatAnalytics.neutralDelta})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Negative</span>
                    <span className="font-bold text-rose-700">{data.csatAnalytics.negative}% ({data.csatAnalytics.negativeDelta})</span>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 13: Customer Effort (CES) */}
            <AnalyticsPanel number="13." title="Customer Effort (CES)">
              <div className="flex items-center gap-1.5 py-1 min-w-0 overflow-hidden">
                {/* Left Side: 3-Slice Segmented Donut Chart */}
                <div className="shrink-0 w-[92px] h-[92px] flex items-center justify-center relative">
                  <PieChart
                    data={data.cesDonut}
                    centerText={data.cesAnalytics.score}
                    centerSubtext={data.cesAnalytics.label}
                    innerRadius="58%"
                    outerRadius="84%"
                    height={92}
                    showLegend={false}
                  />
                </div>

                {/* Right Side: Aligned Legend Table */}
                <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                  {data.cesDonut.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-1 border-b border-slate-100 pb-1 last:border-0 last:pb-0 min-w-0">
                      <div className="flex items-center gap-1 min-w-0 pr-0.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-semibold text-slate-700 text-[10px] sm:text-[10.5px] truncate" title={item.name}>
                          {item.name}
                        </span>
                      </div>
                      <span className="font-extrabold text-slate-900 text-[10.5px] shrink-0 whitespace-nowrap">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 14: AI-Assisted Sentiment */}
            <AnalyticsPanel number="14." title="AI-Assisted Sentiment">
              <PieChart data={data.aiSentiment} height={170} />
            </AnalyticsPanel>
          </div>

          {/* Row 4: Cards 15 to 21 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 15: Complaints Analytics */}
            <AnalyticsPanel number="15." title="Complaints Analytics">
              <div className="space-y-2 py-1">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Complaints</span>
                    <span className="text-base font-extrabold text-slate-900">{data.complaintsAnalytics.totalComplaints}</span>
                  </div>
                  <TrendIndicator value={data.complaintsAnalytics.trend} isPositive={true} />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Complaint Rate</span>
                    <span className="text-base font-extrabold text-slate-900">{data.complaintsAnalytics.complaintRate}</span>
                  </div>
                  <TrendIndicator value={data.complaintsAnalytics.rateTrend} isPositive={true} />
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 16: Root Cause Analysis (Top 3) */}
            <AnalyticsPanel number="16." title="Root Cause Analysis (Top 3)">
              <HorizontalBarChart
                data={data.rootCauseAnalysis.map((rc) => ({
                  tier: rc.category,
                  priceVsMarket: `${rc.count} (${rc.percentage}%)`,
                  skuPercent: rc.percentage,
                }))}
                height={170}
              />
            </AnalyticsPanel>

            {/* Card 17: Escalation Analytics */}
            <AnalyticsPanel number="17." title="Escalation Analytics">
              <div className="space-y-2 py-1 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-rose-50 border border-rose-100">
                  <div>
                    <span className="text-[10px] text-rose-700 font-bold block uppercase">Total Escalations</span>
                    <span className="text-base font-extrabold text-rose-900">{data.escalationAnalytics.totalEscalations}</span>
                  </div>
                  <TrendIndicator value={data.escalationAnalytics.trend} isPositive={true} />
                </div>
                <div className="space-y-1 text-[11px]">
                  {data.escalationAnalytics.reasons.map((r, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-slate-600">{r.name}</span>
                      <span className="font-bold text-slate-800">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 18: Escalation Path */}
            <AnalyticsPanel number="18." title="Escalation Path">
              <div className="space-y-2 py-1 text-xs">
                {data.escalationPath.map((ep, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-700">{ep.stage}</span>
                      <span className="font-bold text-slate-900">{ep.rate}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: ep.rate, backgroundColor: ep.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Card 19: Team Performance (Top 6) */}
            <AnalyticsPanel number="19." title="Team Performance (Top 6)" className="xl:col-span-2">
              <AnalyticsTable columns={teamCols} data={data.teamPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 5: Cards 20 to 26 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 20: Agent Performance (Top 6) */}
            <AnalyticsPanel number="20." title="Agent Performance (Top 6)" className="xl:col-span-2">
              <AnalyticsTable columns={agentCols} data={data.agentPerformance} />
            </AnalyticsPanel>

            {/* Card 21: Workforce Capacity */}
            <AnalyticsPanel number="21." title="Workforce Capacity">
              <div className="flex flex-col items-center justify-center space-y-2 py-1">
                <CircularScore score={data.workforceCapacity.score} maxScore={100} size={70} strokeWidth={6} label="Utilization" />
                <div className="w-full space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Active</span>
                    <span className="font-bold text-slate-900">{data.workforceCapacity.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Available</span>
                    <span className="font-bold text-emerald-700">{data.workforceCapacity.available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">At Capacity</span>
                    <span className="font-bold text-amber-700">{data.workforceCapacity.atCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Overloaded</span>
                    <span className="font-bold text-rose-700">{data.workforceCapacity.overloaded}</span>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 22: QA Analytics */}
            <AnalyticsPanel number="22." title="QA Analytics">
              <div className="space-y-2 py-1 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-emerald-50 border border-emerald-100">
                  <div>
                    <span className="text-[10px] text-emerald-700 font-bold block uppercase">QA Score</span>
                    <span className="text-base font-extrabold text-emerald-900">{data.qaAnalytics.qaScore}</span>
                  </div>
                  <TrendIndicator value={data.qaAnalytics.trend} isPositive={true} />
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Evaluated Cases</span>
                    <span className="font-bold text-slate-900">{data.qaAnalytics.evaluatedCases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monitored Agents</span>
                    <span className="font-bold text-slate-900">{data.qaAnalytics.monitoredAgents}</span>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 23: Quality Defect Analysis (Top 3) */}
            <AnalyticsPanel number="23." title="Quality Defect Analysis (Top 3)">
              <HorizontalBarChart
                data={data.qualityDefects.map((qd) => ({
                  tier: qd.category,
                  priceVsMarket: `${qd.count} (${qd.percentage}%)`,
                  skuPercent: qd.percentage,
                }))}
                height={170}
              />
            </AnalyticsPanel>

            {/* Card 24: Knowledge & Assistance */}
            <AnalyticsPanel number="24." title="Knowledge & Assistance">
              <div className="space-y-2 py-1 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Articles Used</span>
                    <span className="text-base font-extrabold text-slate-900">{data.knowledgeAssistance.articlesUsed}</span>
                  </div>
                  <TrendIndicator value={data.knowledgeAssistance.trend} isPositive={true} />
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Helpful Votes</span>
                    <span className="font-bold text-emerald-700">{data.knowledgeAssistance.helpfulVotes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Knowledge Gaps</span>
                    <span className="font-bold text-slate-900">{data.knowledgeAssistance.knowledgeGaps}</span>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 6: Cards 25 to 30 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 25: Service Recovery */}
            <AnalyticsPanel number="25." title="Service Recovery">
              <div className="space-y-2 py-1 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Recoveries</span>
                    <span className="text-base font-extrabold text-slate-900">{data.serviceRecovery.totalRecoveries}</span>
                  </div>
                  <TrendIndicator value={data.serviceRecovery.trend} isPositive={true} />
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Recovery Rate</span>
                    <span className="font-bold text-emerald-700">{data.serviceRecovery.recoveryRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Recovered CSAT</span>
                    <span className="font-bold text-slate-900">{data.serviceRecovery.recoveredCsat}</span>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 26: Support Cost Analytics */}
            <AnalyticsPanel number="26." title="Support Cost Analytics">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Total Cost</span>
                  <span className="font-extrabold text-slate-900">{data.supportCostAnalytics.totalCost}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Cost / Case</span>
                  <span className="font-extrabold text-slate-900">{data.supportCostAnalytics.costPerCase}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Cost / Resolved</span>
                  <span className="font-extrabold text-slate-900">{data.supportCostAnalytics.costPerResolved}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 27: Customer Impact */}
            <AnalyticsPanel number="27." title="Customer Impact">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Impacted Customers</span>
                  <span className="font-extrabold text-slate-900">{data.customerImpact.impactedCustomers}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Repeat Impact</span>
                  <span className="font-extrabold text-slate-900">{data.customerImpact.repeatImpact}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Churn Risk</span>
                  <span className="font-extrabold text-slate-900">{data.customerImpact.churnRisk}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 28: Support Risk Portfolio */}
            <AnalyticsPanel number="28." title="Support Risk Portfolio">
              <PieChart
                data={data.supportRiskPortfolio}
                centerText="32"
                centerSubtext="Total Risk"
                height={170}
              />
            </AnalyticsPanel>

            {/* Card 29: Support Exception Center */}
            <AnalyticsPanel number="29." title="Support Exception Center" className="xl:col-span-2">
              <AnalyticsTable columns={exceptionCols} data={data.supportExceptions} />
            </AnalyticsPanel>
          </div>

          {/* Row 7: Forecasts (Cards 30 & 31) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card 30: Support Forecast (Next 7 Days) */}
            <AnalyticsPanel number="30." title="Support Forecast (Next 7 Days)">
              <LineChart
                data={data.supportForecast}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "forecast", name: "Forecast", color: "#2563eb" },
                  { key: "target", name: "Target", color: "#800020" },
                ]}
              />
            </AnalyticsPanel>

            {/* Card 31: Workforce Forecast (Next 7 Days) */}
            <AnalyticsPanel number="31." title="Workforce Forecast (Next 7 Days)">
              <LineChart
                data={data.workforceForecast}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "required", name: "Required", color: "#dc2626" },
                  { key: "available", name: "Available", color: "#059669" },
                ]}
              />
            </AnalyticsPanel>
          </div>

          {/* Bottom Table: Card 32 — Underlying Support Analytics Records */}
          <AnalyticsPanel number="32." title="Underlying Support Analytics Records">
            <div className="space-y-3">
              {/* Search & Action Bar */}
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
                    placeholder="Search by case ref, customer, agent, issue..."
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

              {/* Data Table */}
              <AnalyticsTable columns={underlyingCols} data={paginatedRecords} />

              {/* Pagination Controls */}
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

        {/* Right Summary Rail (3 Cols) */}
        <div className="w-full 2xl:w-80 shrink-0">
          <CustomerSupportHealthRail
            data={data.healthRailData}
            onActionClick={(action) => handleAction(action)}
          />
        </div>
      </div>
    </AnalyticsShell>
  );
}
