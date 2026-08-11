"use client";

import React from "react";
import { ReusableCombinationChart, CombinationSeriesConfig } from "../charts/ReusableCombinationChart";
import { ReusableDonutChart, DonutDataItem } from "../charts/ReusableDonutChart";
import { ReusableBarChart, BarChartDataPoint } from "../charts/ReusableBarChart";

const TREND_DATA = [
  { date: "Apr 27", opened: 28, resolved: 22, claims: 8, variances: 12, unmatched: 35, recovered: 5 },
  { date: "May 4", opened: 32, resolved: 28, claims: 10, variances: 14, unmatched: 40, recovered: 7 },
  { date: "May 11", opened: 45, resolved: 34, claims: 15, variances: 18, unmatched: 52, recovered: 10 },
  { date: "May 18", opened: 38, resolved: 31, claims: 12, variances: 16, unmatched: 48, recovered: 8 },
  { date: "May 25", opened: 42, resolved: 36, claims: 14, variances: 17, unmatched: 50, recovered: 12 },
];

const COMBINATION_SERIES: CombinationSeriesConfig[] = [
  { key: "opened", name: "Exceptions Opened", type: "line", color: "#ef4444" },
  { key: "resolved", name: "Exceptions Resolved", type: "line", color: "#10b981" },
  { key: "claims", name: "Claims Created", type: "line", color: "#f59e0b" },
  { key: "variances", name: "Cost Variances", type: "line", color: "#8b5cf6" },
  { key: "unmatched", name: "Unmatched Records", type: "line", color: "#3b82f6" },
  { key: "recovered", name: "Recoveries Confirmed", type: "line", color: "#059669" },
];

const EXCEPTION_DISTRIBUTION: DonutDataItem[] = [
  { name: "Shipment Delay", value: 46, percentage: "24.7%", color: "#ef4444" },
  { name: "Lost Shipment", value: 28, percentage: "15.1%", color: "#f59e0b" },
  { name: "Damage", value: 24, percentage: "12.9%", color: "#ec4899" },
  { name: "Failed Delivery", value: 20, percentage: "10.8%", color: "#3b82f6" },
  { name: "Carrier Charge", value: 14, percentage: "7.5%", color: "#8b5cf6" },
  { name: "Warehouse Charge", value: 13, percentage: "7.0%", color: "#10b981" },
  { name: "COD", value: 11, percentage: "5.9%", color: "#f97316" },
  { name: "Revenue Leakage", value: 8, percentage: "4.3%", color: "#14b8a6" },
  { name: "Reverse Logistics", value: 6, percentage: "3.2%", color: "#6366f1" },
  { name: "SLA", value: 5, percentage: "2.7%", color: "#a855f7" },
  { name: "Other", value: 11, percentage: "5.9%", color: "#64748b" },
];

const RECONCILIATION_SUMMARY: BarChartDataPoint[] = [
  { name: "Matched", count: 248, percentage: "53.5%", color: "#10b981" },
  { name: "Partially Matched", count: 75, percentage: "16.1%", color: "#3b82f6" },
  { name: "Unmatched", count: 58, percentage: "12.5%", color: "#ef4444" },
  { name: "Missing External Record", count: 35, percentage: "7.5%", color: "#f59e0b" },
  { name: "Missing Internal Record", count: 22, percentage: "4.7%", color: "#8b5cf6" },
  { name: "Duplicate", count: 12, percentage: "2.6%", color: "#ec4899" },
  { name: "Pending Verification", count: 18, percentage: "3.9%", color: "#38bdf8" },
  { name: "Under Investigation", count: 16, percentage: "3.4%", color: "#f97316" },
  { name: "Recovered", count: 28, percentage: "6.0%", color: "#059669" },
  { name: "Closed", count: 42, percentage: "9.0%", color: "#64748b" },
];

export function ExceptionAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 mb-3">
      {/* Chart A: Exception & Cost Trend */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Logistics Exception &amp; Cost Trend (Last 30 Days)
          </h3>
          <span className="text-[10px] text-gray-500 font-medium font-mono">30-Day Trend</span>
        </div>
        <ReusableCombinationChart
          data={TREND_DATA}
          xAxisKey="date"
          series={COMBINATION_SERIES}
          height={240}
        />
      </div>

      {/* Chart B: Exception Type Distribution */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Exception Type Distribution
          </h3>
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
            186 Total
          </span>
        </div>
        <ReusableDonutChart
          data={EXCEPTION_DISTRIBUTION}
          totalValue={186}
          totalLabel="Total Exceptions"
          height={240}
        />
      </div>

      {/* Chart C: Reconciliation Status Summary */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Reconciliation Status Summary
          </h3>
          <span className="text-[10px] text-gray-500 font-medium font-mono">Active Records</span>
        </div>
        <ReusableBarChart
          data={RECONCILIATION_SUMMARY}
          layout="horizontal"
          height={240}
        />
      </div>
    </div>
  );
}
