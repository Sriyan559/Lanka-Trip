"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  SUPPLIERS_DATA,
  SupplierPerformanceRow,
  CostPerformanceRow,
  FulfilmentMetricRow,
  DependencyRow,
  SupplierRiskRow,
  ProcurementForecastRow,
  UnderlyingPoRecord,
} from "@/data/analytics/suppliersData";

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
import { PieChart } from "@/components/analytics/charts/PieChart";
import { ScatterChart } from "@/components/analytics/charts/ScatterChart";
import { CohortTable } from "@/components/analytics/CohortTable";
import { SupplierHealthRail } from "@/components/analytics/SupplierHealthRail";
import { InsightList } from "@/components/analytics/InsightList";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import { Filter, RotateCcw, Save, RefreshCw, Download, ChevronDown, ArrowRight } from "lucide-react";

export function AN08SuppliersDashboard() {
  const data = SUPPLIERS_DATA;
  const [activeTab, setActiveTab] = useState("Supplier Overview");

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  // Column Definitions
  const supplierPerfCols: ColumnDef<SupplierPerformanceRow>[] = [
    { header: "Supplier", accessorKey: "supplier", align: "left" },
    { header: "Tier", accessorKey: "tier", align: "center" },
    { header: "Spend (LKR)", accessorKey: "spend", align: "right", cellType: "currency" },
    { header: "POs", accessorKey: "pos", align: "right", cellType: "number" },
    { header: "Fill Rate", accessorKey: "fillRate", align: "right", cellType: "percentage" },
    { header: "On-Time", accessorKey: "onTime", align: "right", cellType: "percentage" },
    { header: "Lead Time", accessorKey: "leadTime", align: "right", cellType: "number" },
    { header: "Quality", accessorKey: "quality", align: "right", cellType: "percentage" },
    { header: "Contract Cov.", accessorKey: "contractCov", align: "right", cellType: "percentage" },
    { header: "Trend", accessorKey: "trend", align: "center", cellType: "sparkline" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.status} />,
    },
  ];

  const costPerfCols: ColumnDef<CostPerformanceRow>[] = [
    { header: "Supplier", accessorKey: "supplier", align: "left" },
    { header: "Current Cost", accessorKey: "currentCost", align: "right", cellType: "currency" },
    { header: "Prior Cost", accessorKey: "priorCost", align: "right", cellType: "currency" },
    { header: "Variance", accessorKey: "variance", align: "right", cellType: "number" },
    { header: "Freight Impact", accessorKey: "freightImpact", align: "right", cellType: "currency" },
    { header: "PPV Impact", accessorKey: "ppvImpact", align: "right", cellType: "currency" },
    { header: "Total Impact", accessorKey: "totalImpact", align: "right", cellType: "currency" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="warning" label={row.status} />,
    },
  ];

  const dependencyCols: ColumnDef<DependencyRow>[] = [
    { header: "Product/Category", accessorKey: "productCategory", align: "left" },
    { header: "Primary Supplier", accessorKey: "primarySupplier", align: "left" },
    { header: "Alt Suppliers", accessorKey: "altSuppliers", align: "center", cellType: "number" },
    { header: "Share", accessorKey: "share", align: "right", cellType: "percentage" },
    { header: "Lead Time", accessorKey: "leadTime", align: "right", cellType: "number" },
    { header: "Spend Exposure (LKR)", accessorKey: "spendExposure", align: "right", cellType: "currency" },
    {
      header: "Risk",
      accessorKey: "risk",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.risk === "High"
              ? "bg-rose-50 text-rose-700 border border-rose-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {row.risk}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="warning" label={row.status} />,
    },
  ];

  const riskCols: ColumnDef<SupplierRiskRow>[] = [
    { header: "Risk Type", accessorKey: "riskType", align: "left" },
    { header: "Low", accessorKey: "low", align: "right", cellType: "number" },
    { header: "Medium", accessorKey: "medium", align: "right", cellType: "number" },
    { header: "High", accessorKey: "high", align: "right", cellType: "number" },
    {
      header: "Critical",
      accessorKey: "critical",
      align: "center",
      renderCell: (row) => (
        <span className="font-bold text-rose-700 bg-rose-50 px-1 rounded">{row.critical}</span>
      ),
    },
  ];

  const forecastCols: ColumnDef<ProcurementForecastRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Forecast", accessorKey: "forecast", align: "right", cellType: "number" },
    { header: "vs Overall", accessorKey: "vsOverall", align: "right", cellType: "percentage" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "number" },
    { header: "Variance", accessorKey: "variance", align: "right", cellType: "number" },
    {
      header: "Expected State",
      accessorKey: "expectedState",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.expectedState} />,
    },
  ];

  const underlyingPoCols: ColumnDef<UnderlyingPoRecord>[] = [
    { header: "PO Number", accessorKey: "poNumber", align: "left" },
    { header: "Supplier", accessorKey: "supplier", align: "left" },
    { header: "Code", accessorKey: "supplierCode", align: "center" },
    { header: "Product", accessorKey: "product", align: "left" },
    { header: "Category", accessorKey: "category", align: "center" },
    { header: "Qty", accessorKey: "quantity", align: "right", cellType: "number" },
    { header: "Unit Cost", accessorKey: "unitCost", align: "right", cellType: "currency" },
    { header: "PO Value (LKR)", accessorKey: "poValue", align: "right", cellType: "currency" },
    { header: "Contract Price", accessorKey: "contractPrice", align: "right", cellType: "currency" },
    { header: "Variance", accessorKey: "priceVariance", align: "right", cellType: "number" },
    { header: "Order Date", accessorKey: "orderDate", align: "center" },
    { header: "Expected Date", accessorKey: "expectedDate", align: "center" },
    { header: "Receipt Date", accessorKey: "receiptDate", align: "center" },
    { header: "Lead Time", accessorKey: "leadTime", align: "center", cellType: "number" },
    { header: "Fill Rate", accessorKey: "fillRate", align: "right", cellType: "percentage" },
    { header: "QA Status", accessorKey: "qaStatus", align: "center" },
    {
      header: "Compliance",
      accessorKey: "compliance",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.compliance === "Compliant" ? "success" : "warning"}
          label={row.compliance}
        />
      ),
    },
    { header: "Terms", accessorKey: "paymentTerms", align: "center" },
    {
      header: "Risk",
      accessorKey: "risk",
      align: "center",
      renderCell: (row) => (
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            row.risk === "High"
              ? "bg-rose-50 text-rose-700"
              : row.risk === "Med"
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {row.risk}
        </span>
      ),
    },
    { header: "Owner", accessorKey: "owner", align: "left" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="info" label={row.status} />,
    },
    {
      header: "Action",
      accessorKey: "action",
      align: "center",
      renderCell: (row) => (
        <button
          type="button"
          onClick={() => handleAction(`Record ${row.poNumber}`)}
          className="text-burgundy font-bold text-[10px] hover:underline cursor-pointer"
        >
          {row.action}
        </button>
      ),
    },
  ];

  return (
    <AnalyticsShell>
      {/* 1. Page Header — Visible title without "AN08" */}
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
            onClick={() => handleAction("Generate Supplier Analytics Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors"
          >
            Generate Supplier Analytics Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Supplier Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Supplier Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Compare Suppliers")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Compare Suppliers
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Procurement Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Run Procurement Forecast
          </button>
          <button
            type="button"
            onClick={() => handleAction("More Actions")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors inline-flex items-center gap-1"
          >
            <span>Export Actions</span>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* 2. Upper Governance Strip (Context Strip) */}
      <ReadinessStrip items={data.governanceStrip} />

      {/* 3. Primary KPI Grid (9 KPI Cards + 1 Supplier Analytics Health Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Supplier Analytics Health */}
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

      {/* 5. Readiness Strip Row */}
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

      {/* 6. Main Grid Layout (Left 9 Cols vs Right 3 Cols SupplierHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Sections 1 to 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 1: Procurement Spend & Supplier Trend */}
            <AnalyticsPanel number="1." title="Procurement Spend & Supplier Trend">
              <LineChart
                data={data.procurementTrend}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "spend", name: "Spend (LKR)", color: "#800020" },
                  { key: "pos", name: "POs", color: "#2563eb" },
                  { key: "fillRate", name: "Fill Rate %", color: "#059669" },
                  { key: "onTime", name: "On-Time %", color: "#7c3aed" },
                  { key: "quality", name: "Quality %", color: "#d97706", strokeDasharray: "3 3" },
                ]}
              />
            </AnalyticsPanel>

            {/* Section 2: Spend Concentration */}
            <AnalyticsPanel number="2." title="Spend Concentration" subtitle="Pareto">
              <BarChart
                data={data.spendConcentration}
                xAxisKey="group"
                height={170}
                series={[
                  { key: "spendPercent", name: "Spend %", color: "#800020" },
                  { key: "cumulativePercent", name: "Cumulative %", color: "#2563eb" },
                ]}
              />
            </AnalyticsPanel>

            {/* Section 3: Supplier Performance Portfolio */}
            <AnalyticsPanel number="3." title="Supplier Performance Portfolio" className="md:col-span-2">
              <AnalyticsTable columns={supplierPerfCols} data={data.supplierPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Sections 4 to 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 4: Procurement Flow & Delays */}
            <AnalyticsPanel number="4." title="Procurement Flow & Delays">
              <div className="flex flex-wrap items-center justify-between gap-1.5 py-4">
                {data.procurementFlow.map((fl, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center p-1.5 bg-slate-50 border border-slate-200 rounded text-center min-w-[65px]">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{fl.step}</span>
                      <span className="text-xs font-extrabold text-slate-900 mt-0.5">{fl.count}</span>
                      {fl.delay && <span className="text-[9px] font-bold text-rose-600">{fl.delay}</span>}
                    </div>
                    {idx < data.procurementFlow.length - 1 && (
                      <ArrowRight size={10} className="text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 5: Price Variance (PPV) */}
            <AnalyticsPanel number="5." title="Price Variance (PPV)">
              <div className="space-y-1 text-xs">
                {data.priceVariance.map((pv, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{pv.label}</span>
                    <span className="font-bold text-slate-900">{pv.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 6: Cost Bridge (LKR) */}
            <AnalyticsPanel number="6." title="Cost Bridge" subtitle="LKR">
              <WaterfallChart data={data.costBridge} height={160} />
            </AnalyticsPanel>

            {/* Section 7: Supplier Cost Performance */}
            <AnalyticsPanel number="7." title="Supplier Cost Performance">
              <AnalyticsTable columns={costPerfCols} data={data.costPerformance} />
            </AnalyticsPanel>
          </div>

          {/* Row 3: Sections 8 to 11 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 8: Supplier Quality Reasons */}
            <AnalyticsPanel number="8." title="Supplier Quality Reasons">
              <PieChart data={data.qualityReasons} height={160} />
            </AnalyticsPanel>

            {/* Section 9: Supplier Fulfilment */}
            <AnalyticsPanel number="9." title="Supplier Fulfilment">
              <div className="space-y-1 text-xs">
                {data.fulfilmentMetrics.map((fm, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{fm.metric}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{fm.value}</span>
                      <TrendIndicator value={fm.vsPrior} isPositive={fm.isPositive} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 10: Dependency & Alternate Coverage */}
            <AnalyticsPanel number="10." title="Dependency &amp; Alternate Coverage" className="md:col-span-2">
              <AnalyticsTable columns={dependencyCols} data={data.dependencyData} />
            </AnalyticsPanel>
          </div>

          {/* Row 4: Sections 12 to 15 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 12: Supplier Concentration Matrix */}
            <AnalyticsPanel number="12." title="Supplier Concentration Matrix">
              <ScatterChart
                data={data.concentrationMatrix.map((cm) => ({ x: cm.x, y: cm.y, label: cm.name })) as any}
                height={160}
              />
            </AnalyticsPanel>

            {/* Section 14: Contract Analytics */}
            <AnalyticsPanel number="14." title="Contract Analytics">
              <div className="space-y-1 text-xs">
                {data.contractAnalytics.map((ca, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{ca.label}</span>
                    <span className="font-bold text-slate-900">{ca.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 15: Payment Terms Analytics */}
            <AnalyticsPanel number="15." title="Payment Terms Analytics">
              <div className="space-y-1 text-xs">
                {data.paymentTermsAnalytics.map((pt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{pt.label}</span>
                    <span className="font-bold text-slate-900">{pt.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 16: Supplier Risk Portfolio */}
            <AnalyticsPanel number="16." title="Supplier Risk Portfolio">
              <AnalyticsTable columns={riskCols} data={data.supplierRiskPortfolio} />
            </AnalyticsPanel>
          </div>

          {/* Row 5: Sections 17 to 20 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 17: Supplier Cohort Performance */}
            <AnalyticsPanel number="17." title="Supplier Cohort Performance">
              <CohortTable
                data={data.cohortData.map((cd) => ({
                  cohort: cd.cohort,
                  m0: cd.m0,
                  m1: cd.m1,
                  m2: cd.m2,
                  m3: cd.m3,
                  m4: cd.m4,
                  m5: cd.m5,
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

            {/* Section 18: Supplier Movement */}
            <AnalyticsPanel number="18." title="Supplier Governance">
              <div className="grid grid-cols-2 gap-1 text-xs">
                {data.supplierMovement.map((sm, idx) => (
                  <div key={idx} className="p-1.5 bg-slate-50 border border-slate-100 rounded flex justify-between items-center text-[11px]">
                    <span className="text-slate-600 font-medium">{sm.label}</span>
                    <span className="font-extrabold text-slate-900">{sm.count}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 19: Procurement Forecast (Next 90 Days) */}
            <AnalyticsPanel number="19." title="Procurement Forecast" subtitle="Next 90 Days">
              <AnalyticsTable columns={forecastCols} data={data.procurementForecast} />
            </AnalyticsPanel>

            {/* Section 20: Priority Insights */}
            <AnalyticsPanel number="20." title="Priority Insights" subtitle="Top 5">
              <InsightList insights={data.priorityInsights as any} />
            </AnalyticsPanel>
          </div>

          {/* Section 21: Underlying Procurement Analytics Records */}
          <AnalyticsPanel number="21." title="Underlying Procurement Analytics Records" subtitle="Read Only">
            <AnalyticsTable columns={underlyingPoCols} data={data.underlyingPoRecords} />
          </AnalyticsPanel>
        </div>

        {/* Right Supplier Health Rail (3 Cols) */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <SupplierHealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
