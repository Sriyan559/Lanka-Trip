"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  FINANCE_PROFITABILITY_DATA,
  ProfitabilityScorecardRow,
  BusinessUnitProfitabilityRow,
  ChannelProfitabilityRow,
  AgingRow,
  ReconciliationExceptionRow,
  UnderlyingFinanceRecord,
} from "@/data/analytics/financeProfitabilityData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { ComboChart } from "@/components/analytics/charts/ComboChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { WaterfallChart } from "@/components/analytics/charts/WaterfallChart";
import { FinanceHealthRail } from "@/components/analytics/FinanceHealthRail";
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
  CheckCircle,
} from "lucide-react";

export function AN11FinanceProfitabilityDashboard() {
  const data = FINANCE_PROFITABILITY_DATA;
  const [activeTab, setActiveTab] = useState("Finance Overview");
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
  const handleExport = () => toast.success("Finance Analytics report exported (CSV/PDF).");

  // Scorecard Columns
  const scorecardCols: ColumnDef<ProfitabilityScorecardRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right" },
    { header: "Plan", accessorKey: "plan", align: "right" },
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

  // Business Unit Columns
  const buCols: ColumnDef<BusinessUnitProfitabilityRow>[] = [
    { header: "Business Unit", accessorKey: "businessUnit", align: "left" },
    { header: "Revenue", accessorKey: "revenue", align: "right" },
    { header: "GP Margin", accessorKey: "gpMargin", align: "right" },
    { header: "Op Margin", accessorKey: "opMargin", align: "right" },
  ];

  // Channel Columns
  const channelCols: ColumnDef<ChannelProfitabilityRow>[] = [
    { header: "Channel", accessorKey: "channel", align: "left" },
    { header: "Revenue", accessorKey: "revenue", align: "right" },
    { header: "GP Margin", accessorKey: "gpMargin", align: "right" },
    { header: "Op Margin", accessorKey: "opMargin", align: "right" },
  ];

  // Aging Columns
  const agingCols: ColumnDef<AgingRow>[] = [
    { header: "Age Band", accessorKey: "ageBand", align: "left" },
    { header: "Amount", accessorKey: "amount", align: "right" },
    { header: "% of Total", accessorKey: "percentOfTotal", align: "right" },
  ];

  // Reconciliation Exception Columns
  const exceptionCols: ColumnDef<ReconciliationExceptionRow>[] = [
    { header: "Break Type", accessorKey: "breakType", align: "left" },
    { header: "Count", accessorKey: "count", align: "right", cellType: "number" },
    { header: "Amount (LKR)", accessorKey: "amount", align: "right" },
  ];

  // Underlying Records Filtering & Pagination
  const filteredRecords = data.underlyingRecords.filter((rec) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      rec.reference.toLowerCase().includes(q) ||
      rec.counterparty.toLowerCase().includes(q) ||
      rec.businessUnit.toLowerCase().includes(q) ||
      rec.transactionId.toLowerCase().includes(q) ||
      rec.recordType.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const underlyingCols: ColumnDef<UnderlyingFinanceRecord>[] = [
    { header: "Reference", accessorKey: "reference", align: "left" },
    { header: "Record Type", accessorKey: "recordType", align: "center" },
    { header: "Transaction ID", accessorKey: "transactionId", align: "left" },
    { header: "Date / Invoice", accessorKey: "dateInvoice", align: "center" },
    { header: "Counterparty", accessorKey: "counterparty", align: "left" },
    { header: "Business Unit", accessorKey: "businessUnit", align: "left" },
    { header: "Payment Method", accessorKey: "paymentMethod", align: "center" },
    { header: "Currency", accessorKey: "currency", align: "center" },
    {
      header: "Gross Amount (LKR)",
      accessorKey: "grossAmount",
      align: "right",
      renderCell: (row) => formatCurrency(row.grossAmount, "LKR"),
    },
    {
      header: "Fees (LKR)",
      accessorKey: "fees",
      align: "right",
      renderCell: (row) => formatCurrency(row.fees, "LKR"),
    },
    {
      header: "Tax (LKR)",
      accessorKey: "tax",
      align: "right",
      renderCell: (row) => formatCurrency(row.tax, "LKR"),
    },
    {
      header: "Refund (LKR)",
      accessorKey: "refund",
      align: "right",
      renderCell: (row) => formatCurrency(row.refund, "LKR"),
    },
    {
      header: "Commission (LKR)",
      accessorKey: "commission",
      align: "right",
      renderCell: (row) => formatCurrency(row.commission, "LKR"),
    },
    {
      header: "Settlement (LKR)",
      accessorKey: "settlement",
      align: "right",
      renderCell: (row) => formatCurrency(row.settlement, "LKR"),
    },
    {
      header: "Net Amount (LKR)",
      accessorKey: "netAmount",
      align: "right",
      renderCell: (row) => formatCurrency(row.netAmount, "LKR"),
    },
    {
      header: "Expected (LKR)",
      accessorKey: "expected",
      align: "right",
      renderCell: (row) => formatCurrency(row.expected, "LKR"),
    },
    {
      header: "Variance (LKR)",
      accessorKey: "variance",
      align: "right",
      renderCell: (row) => formatCurrency(row.variance, "LKR"),
    },
    {
      header: "Reconciliation Status",
      accessorKey: "reconciliationStatus",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.reconciliationStatus === "Matched" ? "success" : row.reconciliationStatus === "Partially Matched" ? "warning" : "danger"}
          label={row.reconciliationStatus}
        />
      ),
    },
    { header: "Age", accessorKey: "age", align: "center" },
    { header: "Completed", accessorKey: "completedDate", align: "center" },
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
      {/* 1. Page Header — Visible title without "AN11" */}
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
            onClick={() => handleAction("Generate Finance Analytics Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
          >
            Generate Finance Analytics Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Finance Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Review Finance Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Reconciliation Exceptions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Review Reconciliation Exceptions
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Cash Flow Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            Run Cash Flow Forecast
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

      {/* 2. Top Source / Status Strip */}
      <ReadinessStrip items={data.connectionStatus} />

      {/* 3. Primary KPI Grid (9 KPI Cards + 1 Finance Analytics Health Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.primaryKpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Finance Analytics Health */}
        <div className="an02-overall-health-card bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
            Finance Analytics Health
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
              <option>SL Beauty Core</option>
              <option>Beauty Plus</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Region</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Regions</option>
              <option>Sri Lanka</option>
              <option>International</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Marketplace Channel</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Channels</option>
              <option>Direct (Web)</option>
              <option>Mobile App</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Customer Segment</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Segments</option>
              <option>VIP</option>
              <option>Retail</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Supplier</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Suppliers</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Product Category</label>
            <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
              <option>All Categories</option>
              <option>Skincare</option>
              <option>Makeup</option>
            </select>
          </div>
        </div>

        {/* Row 2 Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 flex-1 min-w-0">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Brand</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Brands</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Payment Method</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Methods</option>
                <option>Card</option>
                <option>eWallet</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Currency</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>LKR</option>
                <option>USD</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Transaction Type</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Types</option>
                <option>Revenue</option>
                <option>Payable</option>
                <option>Refund</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Settlement Status</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Statuses</option>
                <option>Settled</option>
                <option>Pending</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Reconciliation Status</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Statuses</option>
                <option>Matched</option>
                <option>Unmatched</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Invoice Status</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Statuses</option>
                <option>Paid</option>
                <option>Open</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Risk Level</label>
              <select className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50 font-medium">
                <option>All Risks</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
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

      {/* 7. Main Grid Layout (Left 9 Cols vs Right 3 Cols FinanceHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Cards 1 to 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 1: Finance Overview (Daily) */}
            <AnalyticsPanel number="1." title="Finance Overview (Daily)" className="xl:col-span-2">
              <ComboChart
                data={data.financeOverviewTrend}
                xAxisKey="date"
                height={180}
                series={[
                  { key: "netRevenue", name: "Net Revenue", type: "line", color: "#800020" },
                  { key: "grossProfit", name: "Gross Profit", type: "bar", color: "#059669" },
                  { key: "operatingCashFlow", name: "Operating Cash Flow", type: "line", color: "#2563eb" },
                ]}
              />
            </AnalyticsPanel>

            {/* Card 2: Profitability Scorecard (vs Plan) */}
            <AnalyticsPanel number="2." title="Profitability Scorecard (vs Plan)" className="xl:col-span-2">
              <AnalyticsTable columns={scorecardCols} data={data.profitabilityScorecard} />
            </AnalyticsPanel>

            {/* Card 3: Profit Bridge (Waterfall) */}
            <AnalyticsPanel number="3." title="Profit Bridge (Waterfall)" className="xl:col-span-2">
              <WaterfallChart data={data.profitBridgeWaterfall} height={180} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Cards 4 to 8 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {/* Card 4: Business Unit Profitability */}
            <AnalyticsPanel number="4." title="Business Unit Profitability">
              <AnalyticsTable columns={buCols} data={data.businessUnitProfitability} />
            </AnalyticsPanel>

            {/* Card 5: Channel Profitability */}
            <AnalyticsPanel number="5." title="Channel Profitability">
              <AnalyticsTable columns={channelCols} data={data.channelProfitability} />
            </AnalyticsPanel>

            {/* Card 6: Profitability Mix (Revenue Contribution) */}
            <AnalyticsPanel number="6." title="Profitability Mix (Revenue Contribution)">
              <PieChart
                data={data.profitabilityMix}
                centerText="LKR 116.8M"
                centerSubtext="Total Revenue"
                innerRadius="58%"
                outerRadius="84%"
                height={175}
              />
            </AnalyticsPanel>

            {/* Card 7: Cash & Liquidity Summary */}
            <AnalyticsPanel number="7." title="Cash & Liquidity Summary">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Cash on Hand</span>
                  <span className="font-extrabold text-slate-900">{data.cashLiquiditySummary.cashOnHand}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Available Liquidity</span>
                  <span className="font-extrabold text-slate-900">{data.cashLiquiditySummary.availableLiquidity}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Restricted Cash</span>
                  <span className="font-extrabold text-slate-900">{data.cashLiquiditySummary.restrictedCash}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-medium">Operating Cash Flow</span>
                  <span className="font-extrabold text-slate-900">{data.cashLiquiditySummary.operatingCashFlow}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 8: Cash Conversion Cycle */}
            <AnalyticsPanel number="8." title="Cash Conversion Cycle">
              <div className="flex flex-col items-center justify-center space-y-2 py-1 text-xs">
                <div className="flex items-center gap-1.5 text-center font-extrabold text-slate-800 text-sm">
                  <span>{data.cashConversionCycle.dio}</span>
                  <span className="text-slate-400 font-normal">+</span>
                  <span>{data.cashConversionCycle.dso}</span>
                  <span className="text-slate-400 font-normal">-</span>
                  <span>{data.cashConversionCycle.dpo}</span>
                  <span className="text-slate-400 font-normal">=</span>
                  <span className="text-emerald-700">{data.cashConversionCycle.ccc}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
                  <span>DIO</span>
                  <span>DSO</span>
                  <span>DPO</span>
                  <span className="font-bold text-slate-800">CCC</span>
                </div>
                <StatusBadge status="success" label={data.cashConversionCycle.status} />
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 3: Cards 9 to 15 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-3">
            {/* Card 9: Cash Flow Analysis */}
            <AnalyticsPanel number="9." title="Cash Flow Analysis (Inflow vs Outflow)" className="xl:col-span-2">
              <ComboChart
                data={data.cashFlowAnalysis}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "inflows", name: "Inflows", type: "bar", color: "#059669" },
                  { key: "outflows", name: "Outflows", type: "bar", color: "#dc2626" },
                  { key: "netCashFlow", name: "Net Cash Flow", type: "line", color: "#2563eb" },
                ]}
              />
            </AnalyticsPanel>

            {/* Card 10: Receivables Analytics */}
            <AnalyticsPanel number="10." title="Receivables Analytics">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Total Receivables</span>
                  <span className="font-bold text-slate-900">{data.receivablesAnalytics.totalReceivables}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">Overdue</span>
                  <span className="font-bold text-rose-700">{data.receivablesAnalytics.overdue}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">&gt; 30 Days</span>
                  <span className="font-bold text-slate-900">{data.receivablesAnalytics.over30Days}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">&gt; 60 Days</span>
                  <span className="font-bold text-slate-900">{data.receivablesAnalytics.over60Days}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100 text-[11px]">
                  <span className="text-slate-500">&gt; 90 Days</span>
                  <span className="font-bold text-slate-900">{data.receivablesAnalytics.over90Days}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Collection Rate</span>
                  <span className="font-bold text-emerald-700">{data.receivablesAnalytics.collectionRate}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 11: Receivable Aging (LKR) */}
            <AnalyticsPanel number="11." title="Receivable Aging (LKR)">
              <AnalyticsTable columns={agingCols} data={data.receivableAging} />
            </AnalyticsPanel>

            {/* Card 12: Payables Analytics */}
            <AnalyticsPanel number="12." title="Payables Analytics">
              <div className="space-y-2 py-1 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Payables</span>
                    <span className="text-base font-extrabold text-slate-900">{data.payablesAnalytics.totalPayables}</span>
                  </div>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Overdue</span>
                  <span className="font-bold text-amber-700">{data.payablesAnalytics.overdue}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Payment Rate</span>
                  <span className="font-bold text-emerald-700">{data.payablesAnalytics.paymentRate}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 13: Payable Aging (LKR) */}
            <AnalyticsPanel number="13." title="Payable Aging (LKR)">
              <AnalyticsTable columns={agingCols} data={data.payableAging} />
            </AnalyticsPanel>

            {/* Card 14: Working Capital */}
            <AnalyticsPanel number="14." title="Working Capital">
              <div className="space-y-1 text-xs py-1">
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Current Assets</span>
                  <span className="font-bold text-slate-900">{data.workingCapital.currentAssets}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Current Liabilities</span>
                  <span className="font-bold text-slate-900">{data.workingCapital.currentLiabilities}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Net Working Capital</span>
                  <span className="font-bold text-emerald-700">{data.workingCapital.netWorkingCapital}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Current Ratio</span>
                  <span className="font-bold text-slate-900">{data.workingCapital.currentRatio}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-500">Working Capital Trend</span>
                  <span className="font-bold text-slate-900">{data.workingCapital.workingCapitalTrend}</span>
                </div>
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 4: Cards 16 to 20 */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {/* Card 15: Tax Data Completeness */}
            <AnalyticsPanel number="15." title="Tax Data Completeness">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="flex justify-between items-center text-[11px] font-bold text-slate-800">
                  <span>Overall Completeness</span>
                  <span className="text-emerald-700">{data.taxDataCompleteness.overallCompleteness}</span>
                </div>
                <div className="space-y-1 text-[10.5px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Sales Tax Data</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5"><CheckCircle size={10} /> Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Purchase Tax Data</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5"><CheckCircle size={10} /> Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Withholding Tax Data</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5"><CheckCircle size={10} /> Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Tax Mapping Coverage</span>
                    <span className="font-bold text-slate-800">{data.taxDataCompleteness.taxMappingCoverage}</span>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 16: Reconciliation Health Summary */}
            <AnalyticsPanel number="16." title="Reconciliation Health Summary">
              <div className="flex items-center justify-around gap-2 py-1 text-xs">
                <CircularScore score={data.reconciliationHealth.matchedScore} maxScore={100} size={70} strokeWidth={6} label="Matched" />
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Coverage</span>
                    <span className="font-bold text-emerald-700">{data.reconciliationHealth.coverage}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Unmatched</span>
                    <span className="font-bold text-amber-700">{data.reconciliationHealth.unmatched}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Exposure</span>
                    <span className="font-bold text-rose-700">{data.reconciliationHealth.exposure}</span>
                  </div>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 17: Reconciliation Exceptions by Type */}
            <AnalyticsPanel number="17." title="Reconciliation Exceptions by Type">
              <AnalyticsTable columns={exceptionCols} data={data.reconciliationExceptions} />
            </AnalyticsPanel>

            {/* Card 18: Leakage Insights */}
            <AnalyticsPanel number="18." title="Leakage Insights">
              <div className="space-y-1.5 py-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Confirmed Leakage</span>
                  <span className="font-bold text-slate-900">{data.leakageInsights.confirmedLeakage} ({data.leakageInsights.confirmedPercent})</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Potential Leakage</span>
                  <span className="font-bold text-amber-700">{data.leakageInsights.potentialLeakage} ({data.leakageInsights.potentialPercent})</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Unreconciled Exposure</span>
                  <span className="font-bold text-rose-700">{data.leakageInsights.unreconciledExposure} ({data.leakageInsights.unreconciledPercent})</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100 text-[11px] font-bold">
                  <span className="text-slate-800">Total Leakage Identified</span>
                  <span className="text-slate-900">{data.leakageInsights.totalLeakageIdentified}</span>
                </div>
              </div>
            </AnalyticsPanel>

            {/* Card 19: Top Leakage Sources */}
            <AnalyticsPanel number="19." title="Top Leakage Sources">
              <HorizontalBarChart
                data={data.topLeakageSources.map((ls) => ({
                  tier: ls.category,
                  priceVsMarket: `LKR ${ls.count}K (${ls.percentage}%)`,
                  skuPercent: ls.percentage,
                }))}
                height={170}
              />
            </AnalyticsPanel>
          </div>

          {/* Card 20: Underlying Finance Analytics Records */}
          <AnalyticsPanel number="20." title="Underlying Finance Analytics Records (Recent)">
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
                    placeholder="Search by ref, counterparty, transaction ID..."
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
          <FinanceHealthRail
            data={data.healthRailData}
            onActionClick={(action) => handleAction(action)}
          />
        </div>
      </div>
    </AnalyticsShell>
  );
}
