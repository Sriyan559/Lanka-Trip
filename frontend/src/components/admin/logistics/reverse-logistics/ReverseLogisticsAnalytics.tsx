"use client";

import React from "react";
import { ReusableCombinationChart, CombinationSeriesConfig } from "../charts/ReusableCombinationChart";
import { ReusableDonutChart, DonutDataItem } from "../charts/ReusableDonutChart";
import { ReusableBarChart, BarChartDataPoint } from "../charts/ReusableBarChart";

const TREND_DATA = [
  { date: "Apr 27", approved: 22, scheduled: 20, completed: 18, created: 16, receipts: 14, closed: 12 },
  { date: "Apr 30", approved: 25, scheduled: 22, completed: 20, created: 18, receipts: 16, closed: 14 },
  { date: "May 3", approved: 28, scheduled: 25, completed: 22, created: 20, receipts: 18, closed: 15 },
  { date: "May 6", approved: 24, scheduled: 21, completed: 19, created: 17, receipts: 15, closed: 13 },
  { date: "May 9", approved: 30, scheduled: 28, completed: 25, created: 22, receipts: 20, closed: 18 },
  { date: "May 12", approved: 32, scheduled: 29, completed: 26, created: 24, receipts: 21, closed: 19 },
  { date: "May 15", approved: 27, scheduled: 24, completed: 22, created: 20, receipts: 18, closed: 16 },
  { date: "May 18", approved: 29, scheduled: 26, completed: 24, created: 21, receipts: 19, closed: 17 },
  { date: "May 21", approved: 31, scheduled: 28, completed: 25, created: 23, receipts: 20, closed: 18 },
  { date: "May 24", approved: 33, scheduled: 30, completed: 27, created: 25, receipts: 22, closed: 20 },
];

const COMBINATION_SERIES: CombinationSeriesConfig[] = [
  { key: "approved", name: "Returns Approved", type: "line", color: "#3b82f6" },
  { key: "scheduled", name: "Collections Scheduled", type: "line", color: "#f59e0b" },
  { key: "completed", name: "Collections Completed", type: "line", color: "#10b981" },
  { key: "created", name: "Reverse Shipments Created", type: "line", color: "#8b5cf6" },
  { key: "receipts", name: "Warehouse Receipts", type: "bar", color: "#ec4899" },
  { key: "closed", name: "Cases Closed", type: "bar", color: "#64748b" },
];

const DISPOSITION_DISTRIBUTION: DonutDataItem[] = [
  { name: "Restock", value: 126, percentage: "44.4%", color: "#10b981" },
  { name: "Quarantine", value: 14, percentage: "4.9%", color: "#f59e0b" },
  { name: "Return to Supplier", value: 18, percentage: "6.3%", color: "#8b5cf6" },
  { name: "Dispose", value: 24, percentage: "8.5%", color: "#ef4444" },
  { name: "Exchange", value: 38, percentage: "13.4%", color: "#3b82f6" },
  { name: "Refurbish", value: 28, percentage: "9.9%", color: "#06b6d4" },
  { name: "Investigation", value: 36, percentage: "12.7%", color: "#ec4899" },
];

const STATUS_SUMMARY_DATA: BarChartDataPoint[] = [
  { name: "Awaiting Collection", count: 36, percentage: "12.7%", color: "#f59e0b" },
  { name: "Collection Scheduled", count: 48, percentage: "16.9%", color: "#3b82f6" },
  { name: "Collection Failed", count: 12, percentage: "4.2%", color: "#ef4444" },
  { name: "In Transit", count: 64, percentage: "22.5%", color: "#3b82f6" },
  { name: "Awaiting Receipt", count: 28, percentage: "9.9%", color: "#f59e0b" },
  { name: "Inspection Pending", count: 32, percentage: "11.3%", color: "#8b5cf6" },
  { name: "Quarantine", count: 14, percentage: "4.9%", color: "#8b5cf6" },
  { name: "Restock Pending", count: 126, percentage: "44.4%", color: "#10b981" },
  { name: "Supplier Return", count: 18, percentage: "6.3%", color: "#8b5cf6" },
  { name: "Disposal Pending", count: 24, percentage: "8.5%", color: "#ef4444" },
  { name: "Exception", count: 10, percentage: "3.5%", color: "#f43f5e" },
  { name: "Closed", count: 98, percentage: "34.5%", color: "#64748b" },
];

export function ReverseLogisticsAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 mb-3">
      {/* Panel A: Returns & Collection Trend (30 Days) */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            A. Returns &amp; Collection Trend (Last 30 Days)
          </h3>
          <span className="text-[10px] text-gray-500 font-medium">30-Day Multi-Series</span>
        </div>
        <ReusableCombinationChart
          data={TREND_DATA}
          xAxisKey="date"
          series={COMBINATION_SERIES}
          height={240}
        />
      </div>

      {/* Panel B: Return Disposition Distribution */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            B. Return Disposition Distribution
          </h3>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
            284 Cases
          </span>
        </div>
        <ReusableDonutChart
          data={DISPOSITION_DISTRIBUTION}
          totalValue={284}
          totalLabel="Total Cases"
          height={240}
        />
      </div>

      {/* Panel C: Reverse Logistics Status Summary */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            C. Reverse Logistics Status Summary
          </h3>
          <span className="text-[10px] text-gray-500 font-medium font-mono">284 Total</span>
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
