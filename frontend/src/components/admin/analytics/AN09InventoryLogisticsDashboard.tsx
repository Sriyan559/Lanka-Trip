"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  INVENTORY_LOGISTICS_DATA,
  InventoryHealthRow,
  CategoryProductivityRow,
  WarehousePerformanceRow,
  OverstockAgeingRow,
  CarrierPerformanceRow,
  DeliveryExceptionRow,
  ForecastTargetRow,
  UnderlyingLogisticsRecord,
} from "@/data/analytics/inventoryLogisticsData";

import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";
import { ReadinessStrip } from "@/components/analytics/ReadinessStrip";
import { KpiCard } from "@/components/analytics/KpiCard";
import { CircularScore } from "@/components/analytics/charts/CircularScore";
import { TabNavigation } from "@/components/analytics/TabNavigation";
import { AnalyticsPanel } from "@/components/analytics/AnalyticsPanel";
import { AnalyticsTable, ColumnDef } from "@/components/analytics/AnalyticsTable";
import { LineChart } from "@/components/analytics/charts/LineChart";
import { HorizontalBarChart } from "@/components/analytics/charts/HorizontalBarChart";
import { WaterfallChart } from "@/components/analytics/charts/WaterfallChart";
import { PieChart } from "@/components/analytics/charts/PieChart";
import { ScatterChart } from "@/components/analytics/charts/ScatterChart";
import { InventoryLogisticsHealthRail } from "@/components/analytics/InventoryLogisticsHealthRail";
import { InsightList } from "@/components/analytics/InsightList";
import { TrendIndicator } from "@/components/analytics/TrendIndicator";
import { StatusBadge } from "@/components/analytics/StatusBadge";

import { Filter, RotateCcw, Save, RefreshCw, Download, ChevronDown, ArrowRight } from "lucide-react";

export function AN09InventoryLogisticsDashboard() {
  const data = INVENTORY_LOGISTICS_DATA;
  const [activeTab, setActiveTab] = useState("Inventory Overview");

  const handleAction = (name: string) => {
    toast.success(`Action: ${name}`);
  };

  // Column Definitions
  const healthCols: ColumnDef<InventoryHealthRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "number" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "number" },
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
          status={row.status === "Good" ? "success" : "warning"}
          label={row.status}
        />
      ),
    },
  ];

  const catProdCols: ColumnDef<CategoryProductivityRow>[] = [
    { header: "Category", accessorKey: "category", align: "left" },
    { header: "Inventory Value (LKR)", accessorKey: "inventoryValue", align: "right", cellType: "currency" },
    { header: "Turnover", accessorKey: "turnover", align: "right", cellType: "number" },
    { header: "Days of Inv", accessorKey: "daysOfInventory", align: "right", cellType: "number" },
    { header: "Sell-Through", accessorKey: "sellThrough", align: "right", cellType: "percentage" },
    { header: "GMROI", accessorKey: "gmroi", align: "right", cellType: "number" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.status === "Good" ? "success" : "warning"}
          label={row.status}
        />
      ),
    },
  ];

  const warehouseCols: ColumnDef<WarehousePerformanceRow>[] = [
    { header: "Warehouse / FC", accessorKey: "warehouse", align: "left" },
    { header: "Region", accessorKey: "region", align: "center" },
    { header: "Inventory Value", accessorKey: "inventoryValue", align: "right", cellType: "currency" },
    { header: "Available Units", accessorKey: "availableUnits", align: "right", cellType: "number" },
    { header: "Capacity", accessorKey: "capacity", align: "right", cellType: "number" },
    { header: "Utilisation", accessorKey: "utilisation", align: "right", cellType: "percentage" },
    { header: "Orders", accessorKey: "orders", align: "right", cellType: "number" },
    { header: "Pick Rate", accessorKey: "pickRate", align: "right", cellType: "number" },
    { header: "Dispatch SLA", accessorKey: "dispatchSla", align: "right", cellType: "percentage" },
    { header: "Stockout %", accessorKey: "stockoutPercent", align: "right", cellType: "percentage" },
    { header: "Exceptions", accessorKey: "exceptions", align: "center", cellType: "number" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          status={row.status === "Good" ? "success" : "warning"}
          label={row.status}
        />
      ),
    },
  ];

  const ageingCols: ColumnDef<OverstockAgeingRow>[] = [
    { header: "Age Band", accessorKey: "ageBand", align: "left" },
    { header: "Value (LKR)", accessorKey: "value", align: "right", cellType: "currency" },
    { header: "% of Total", accessorKey: "percentOfTotal", align: "right", cellType: "percentage" },
    { header: "Summary", accessorKey: "summary", align: "left" },
  ];

  const carrierCols: ColumnDef<CarrierPerformanceRow>[] = [
    { header: "Carrier", accessorKey: "carrier", align: "left" },
    { header: "Shipments", accessorKey: "shipments", align: "right", cellType: "number" },
    { header: "On-Time Delivery", accessorKey: "onTimeDelivery", align: "right", cellType: "percentage" },
    { header: "SLA %", accessorKey: "slaPercent", align: "right", cellType: "percentage" },
    { header: "Cost / Shipment", accessorKey: "costPerShipment", align: "right", cellType: "currency" },
    {
      header: "Trend",
      accessorKey: "trend",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.trend} />,
    },
  ];

  const exceptionCols: ColumnDef<DeliveryExceptionRow>[] = [
    { header: "Exception Type", accessorKey: "exceptionType", align: "left" },
    { header: "Open", accessorKey: "open", align: "right", cellType: "number" },
    { header: "% of Total", accessorKey: "percentOfTotal", align: "right", cellType: "percentage" },
    {
      header: "vs Prior 30D",
      accessorKey: "vsPrior30D",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.vsPrior30D} isPositive={row.isPositive !== false} />,
    },
  ];

  const forecastVsTargetCols: ColumnDef<ForecastTargetRow>[] = [
    { header: "Metric", accessorKey: "metric", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "number" },
    { header: "Target", accessorKey: "target", align: "right", cellType: "number" },
    {
      header: "Variance",
      accessorKey: "variance",
      align: "right",
      renderCell: (row) => <TrendIndicator value={row.variance} isPositive={row.isPositive !== false} />,
    },
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
  ];

  const underlyingCols: ColumnDef<UnderlyingLogisticsRecord>[] = [
    { header: "Record Type", accessorKey: "recordType", align: "left" },
    { header: "Business Unit", accessorKey: "businessUnit", align: "center" },
    { header: "Region", accessorKey: "region", align: "center" },
    { header: "Warehouse / FC", accessorKey: "warehouse", align: "left" },
    { header: "Carrier", accessorKey: "carrier", align: "center" },
    { header: "Date", accessorKey: "date", align: "center" },
    { header: "Reference", accessorKey: "reference", align: "left" },
    { header: "Actual", accessorKey: "actual", align: "right", cellType: "number" },
    { header: "Reserved", accessorKey: "reserved", align: "right", cellType: "number" },
    { header: "Allocated", accessorKey: "allocated", align: "right", cellType: "number" },
    { header: "Shipped", accessorKey: "shipped", align: "right", cellType: "number" },
    { header: "Delivered", accessorKey: "delivered", align: "right", cellType: "number" },
    { header: "SLA", accessorKey: "sla", align: "right", cellType: "percentage" },
    {
      header: "Status",
      accessorKey: "status",
      align: "center",
      renderCell: (row) => <StatusBadge status="success" label={row.status} />,
    },
    {
      header: "Actions",
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
      {/* 1. Page Header — Visible title without "AN09" */}
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
            onClick={() => handleAction("Generate Logistics Analytics Report")}
            className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold rounded shadow-xs transition-colors"
          >
            Generate Logistics Analytics Report
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Inventory Risks")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Inventory Risks
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Warehouse Capacity")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Warehouse Capacity
          </button>
          <button
            type="button"
            onClick={() => handleAction("Review Fulfilment SLA")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Review Fulfilment SLA
          </button>
          <button
            type="button"
            onClick={() => handleAction("Run Inventory Forecast")}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Run Inventory Forecast
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

      {/* 2. Primary KPI Grid (9 KPI Cards + 1 Inventory Analytics Health Card) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} data={kpi} onClick={() => handleAction(`KPI ${kpi.title}`)} />
        ))}

        {/* Card 10: Inventory & Logistics Health */}
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

      {/* 3. Tab Navigation */}
      <TabNavigation tabs={data.tabs} activeTab={activeTab} onSelectTab={(t) => setActiveTab(t)} />

      {/* 4. Readiness Strip Row */}
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

      {/* 5. Main Grid Layout (Left 9 Cols vs Right 3 Cols InventoryLogisticsHealthRail) */}
      <div className="flex flex-col 2xl:flex-row gap-4 items-start">
        {/* Left Primary Column (9 Cols) */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Row 1: Sections 1 to 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 1: Inventory Value & Stock Trend */}
            <AnalyticsPanel number="1." title="Inventory Value &amp; Stock Trend">
              <LineChart
                data={data.inventoryTrend}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "inventoryValue", name: "Value (LKR)", color: "#800020" },
                  { key: "availableStock", name: "Available", color: "#2563eb" },
                  { key: "reservedStock", name: "Reserved", color: "#d97706" },
                  { key: "allocatedStock", name: "Allocated", color: "#7c3aed" },
                ]}
              />
            </AnalyticsPanel>

            {/* Section 2: Inventory Composition */}
            <AnalyticsPanel number="2." title="Inventory Composition">
              <PieChart data={data.inventoryComposition} height={170} />
            </AnalyticsPanel>

            {/* Section 3: Inventory Health Summary */}
            <AnalyticsPanel number="3." title="Inventory Health Summary">
              <AnalyticsTable columns={healthCols} data={data.inventoryHealthSummary} />
            </AnalyticsPanel>

            {/* Section 4: Category Inventory Productivity */}
            <AnalyticsPanel number="4." title="Category Inventory Productivity">
              <AnalyticsTable columns={catProdCols} data={data.categoryProductivity} />
            </AnalyticsPanel>
          </div>

          {/* Row 2: Sections 5 to 7 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 5: Warehouse Portfolio Performance */}
            <AnalyticsPanel number="5." title="Warehouse Portfolio Performance" className="md:col-span-2">
              <AnalyticsTable columns={warehouseCols} data={data.warehousePerformance} />
            </AnalyticsPanel>

            {/* Section 6: Warehouse Capacity & Utilisation */}
            <AnalyticsPanel number="6." title="Warehouse Capacity &amp; Utilisation">
              <HorizontalBarChart
                data={data.capacityUtilisation.map((c) => ({
                  tier: c.warehouse,
                  priceVsMarket: `${c.utilisationPercent}%`,
                  skuPercent: c.utilisationPercent,
                }))}
                height={170}
              />
            </AnalyticsPanel>
          </div>

          {/* Row 3: Sections 7 to 10 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 7: Overstock, Dead Stock & Ageing */}
            <AnalyticsPanel number="7." title="Overstock, Dead Stock &amp; Ageing">
              <AnalyticsTable columns={ageingCols} data={data.overstockAgeing} />
            </AnalyticsPanel>

            {/* Section 8: Allocation & Reservation */}
            <AnalyticsPanel number="8." title="Allocation &amp; Reservation">
              <div className="space-y-1 text-xs">
                {data.allocationReservation.map((ar, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{ar.label}</span>
                    <span className="font-bold text-slate-900">{ar.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 9: Stocking Analytics */}
            <AnalyticsPanel number="9." title="Stocking Analytics">
              <div className="space-y-1 text-xs">
                {data.stockingAnalytics.map((sa, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{sa.label}</span>
                    <span className="font-bold text-slate-900">{sa.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 10: Fulfilment Performance */}
            <AnalyticsPanel number="10." title="Fulfilment Performance">
              <div className="space-y-1 text-xs">
                {data.fulfilmentPerformance.map((fp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{fp.label}</span>
                    <span className="font-bold text-slate-900">{fp.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>
          </div>

          {/* Row 4: Sections 11 to 13 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 11: Fulfilment Lifecycle */}
            <AnalyticsPanel number="11." title="Fulfilment Lifecycle">
              <div className="flex flex-wrap items-center justify-between gap-1.5 py-4">
                {data.fulfilmentLifecycle.map((fl, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center p-1.5 bg-slate-50 border border-slate-200 rounded text-center min-w-[65px]">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">{fl.step}</span>
                      <span className="text-xs font-extrabold text-slate-900 mt-0.5">{fl.count}</span>
                      <span className="text-[9px] font-bold text-emerald-600">{fl.percent}</span>
                    </div>
                    {idx < data.fulfilmentLifecycle.length - 1 && (
                      <ArrowRight size={10} className="text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 12: Pick & Pack Productivity */}
            <AnalyticsPanel number="12." title="Pick &amp; Pack Productivity">
              <div className="space-y-2 text-xs">
                {data.pickPackProductivity.map((pp, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 border border-slate-100 rounded space-y-1">
                    <span className="font-bold text-slate-800 block text-[11px]">{pp.label}</span>
                    <div className="flex justify-between text-[10px] text-slate-600">
                      <span>{pp.rate1}</span>
                      <span>{pp.rate2}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 13: Shipment Trend */}
            <AnalyticsPanel number="13." title="Shipment Trend">
              <LineChart
                data={data.shipmentTrend}
                xAxisKey="date"
                height={170}
                series={[
                  { key: "created", name: "Created", color: "#2563eb" },
                  { key: "dispatched", name: "Dispatched", color: "#059669" },
                  { key: "delivered", name: "Delivered", color: "#800020" },
                ]}
              />
            </AnalyticsPanel>
          </div>

          {/* Row 5: Sections 14 to 17 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 14: Carrier Performance */}
            <AnalyticsPanel number="14." title="Carrier Performance">
              <AnalyticsTable columns={carrierCols} data={data.carrierPerformance} />
            </AnalyticsPanel>

            {/* Section 15: Carrier Cost vs Service */}
            <AnalyticsPanel number="15." title="Carrier Cost vs Service">
              <ScatterChart
                data={data.carrierScatter.map((cs) => ({ x: cs.x, y: cs.y, label: cs.name })) as any}
                height={160}
              />
            </AnalyticsPanel>

            {/* Section 16: Delivery Exceptions */}
            <AnalyticsPanel number="16." title="Delivery Exceptions (Open)">
              <AnalyticsTable columns={exceptionCols} data={data.deliveryExceptions} />
            </AnalyticsPanel>

            {/* Section 17: Logistics Cost & Cost Bridge */}
            <AnalyticsPanel number="17." title="Logistics Cost Bridge">
              <WaterfallChart data={data.logisticsCostBridge} height={160} />
            </AnalyticsPanel>
          </div>

          {/* Row 6: Sections 18 to 22 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Section 18: Reverse Logistics */}
            <AnalyticsPanel number="18." title="Reverse Logistics">
              <div className="space-y-1 text-xs">
                {data.reverseLogistics.map((rl, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{rl.label}</span>
                    <span className="font-bold text-slate-900">{rl.value}</span>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 19: SLA Scorecard */}
            <AnalyticsPanel number="19." title="SLA Scorecard">
              <div className="space-y-1 text-xs">
                {data.slaScorecard.map((sla, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 text-[11px]">
                    <span className="text-slate-600">{sla.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900">{sla.value}</span>
                      <TrendIndicator value={sla.vsPrior} isPositive={sla.isPositive} />
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsPanel>

            {/* Section 21: Forecast vs Target */}
            <AnalyticsPanel number="21." title="Forecast vs Target">
              <AnalyticsTable columns={forecastVsTargetCols} data={data.forecastVsTarget} />
            </AnalyticsPanel>

            {/* Section 22: Priority Insights */}
            <AnalyticsPanel number="22." title="Priority Insights">
              <InsightList insights={data.priorityInsights as any} />
            </AnalyticsPanel>
          </div>

          {/* Section 23: Underlying Inventory & Logistics Records */}
          <AnalyticsPanel number="23." title="Underlying Inventory &amp; Logistics Records" subtitle="Read Only">
            <AnalyticsTable columns={underlyingCols} data={data.underlyingLogisticsRecords} />
          </AnalyticsPanel>
        </div>

        {/* Right Inventory Health Rail (3 Cols) */}
        <div className="w-full 2xl:w-[310px] shrink-0">
          <InventoryLogisticsHealthRail data={data.healthRail} onActionClick={(action) => handleAction(action)} />
        </div>
      </div>
    </AnalyticsShell>
  );
}
