"use client";

import React from "react";
import { ReusableCombinationChart, CombinationSeriesConfig } from "../charts/ReusableCombinationChart";
import { ReusableDonutChart, DonutDataItem } from "../charts/ReusableDonutChart";
import { ReusableBarChart, BarChartDataPoint } from "../charts/ReusableBarChart";

const TREND_DATA = [
  { date: "Apr 27", requested: 22, collected: 18, inTransit: 16 },
  { date: "May 4", requested: 28, collected: 22, inTransit: 20 },
  { date: "May 11", requested: 32, collected: 26, inTransit: 24 },
  { date: "May 18", requested: 29, collected: 24, inTransit: 21 },
  { date: "May 25", requested: 33, collected: 27, inTransit: 25 },
];

const COMBINATION_SERIES: CombinationSeriesConfig[] = [
  { key: "requested", name: "Returns Requested", type: "line", color: "#3b82f6" },
  { key: "collected", name: "Collected", type: "line", color: "#10b981" },
  { key: "inTransit", name: "In Transit", type: "line", color: "#f59e0b" },
];

const DISPOSITION_DATA: DonutDataItem[] = [
  { name: "Restock", value: 126, percentage: "44.4%", color: "#10b981" },
  { name: "Quarantine", value: 12, percentage: "4.2%", color: "#f59e0b" },
  { name: "Return to Supplier", value: 17, percentage: "6.0%", color: "#8b5cf6" },
  { name: "Dispose", value: 23, percentage: "8.1%", color: "#ef4444" },
  { name: "Exchange", value: 37, percentage: "13.0%", color: "#3b82f6" },
  { name: "Refurbish", value: 34, percentage: "12.0%", color: "#06b6d4" },
  { name: "Investigation", value: 17, percentage: "6.0%", color: "#ec4899" },
];

const STATUS_SUMMARY_DATA: BarChartDataPoint[] = [
  { name: "Reversed", count: 64, percentage: "22.5%", color: "#3b82f6" },
  { name: "Collection Scheduled", count: 48, percentage: "16.9%", color: "#f59e0b" },
  { name: "Collected", count: 56, percentage: "19.7%", color: "#10b981" },
  { name: "In Transit", count: 72, percentage: "25.4%", color: "#3b82f6" },
  { name: "WH Receipt Pending", count: 28, percentage: "9.9%", color: "#f59e0b" },
  { name: "Inspection Pending", count: 32, percentage: "11.3%", color: "#8b5cf6" },
  { name: "Disposition Pending", count: 24, percentage: "8.5%", color: "#8b5cf6" },
  { name: "Supplier Return", count: 18, percentage: "6.3%", color: "#8b5cf6" },
  { name: "Closed", count: 98, percentage: "34.5%", color: "#64748b" },
];

export function ReturnDetailAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 mb-3">
      {/* Chart A: Return & Collection Trend */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Return &amp; Collection Trend (Last 30 Days)
          </h3>
          <span className="text-[10px] text-gray-500 font-medium">30-Day View</span>
        </div>
        <ReusableCombinationChart
          data={TREND_DATA}
          xAxisKey="date"
          series={COMBINATION_SERIES}
          height={240}
        />
      </div>

      {/* Chart B: Return Disposition Distribution */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Return Disposition Distribution (Last 30 Days)
          </h3>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
            284 Total
          </span>
        </div>
        <ReusableDonutChart
          data={DISPOSITION_DATA}
          totalValue={284}
          totalLabel="Total"
          height={240}
        />
      </div>

      {/* Chart C: Reverse Logistics Status Summary */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Reverse Logistics Status Summary
          </h3>
          <span className="text-[10px] text-gray-500 font-medium font-mono">Active Cases</span>
        </div>
        <ReusableBarChart
          data={STATUS_SUMMARY_DATA}
          layout="horizontal"
          height={240}
        />
      </div>
    </div>
  );
}
