"use client";

import React from "react";
import { ReusableCombinationChart, CombinationSeriesConfig } from "../charts/ReusableCombinationChart";
import { ReusableDonutChart, DonutDataItem } from "../charts/ReusableDonutChart";
import { ReusableBarChart, BarChartDataPoint } from "../charts/ReusableBarChart";

const TREND_DATA = [
  { date: "Apr 27", generated: 210, delivered: 200, imports: 140, records: 750, rejected: 12, exports: 80, failed: 2 },
  { date: "May 4", generated: 240, delivered: 235, imports: 160, records: 820, rejected: 15, exports: 95, failed: 3 },
  { date: "May 11", generated: 290, delivered: 280, imports: 190, records: 950, rejected: 18, exports: 115, failed: 4 },
  { date: "May 18", generated: 260, delivered: 250, imports: 175, records: 880, rejected: 14, exports: 105, failed: 2 },
  { date: "May 25", generated: 310, delivered: 300, imports: 210, records: 1050, rejected: 16, exports: 130, failed: 1 },
];

const COMBINATION_SERIES: CombinationSeriesConfig[] = [
  { key: "generated", name: "Reports Generated", type: "line", color: "#3b82f6" },
  { key: "delivered", name: "Reports Delivered", type: "line", color: "#10b981" },
  { key: "imports", name: "Import Jobs", type: "line", color: "#8b5cf6" },
  { key: "records", name: "Imported Records (k)", type: "line", color: "#06b6d4" },
  { key: "rejected", name: "Rejected Records (k)", type: "line", color: "#ef4444" },
  { key: "exports", name: "Exports Generated", type: "line", color: "#f59e0b" },
  { key: "failed", name: "Failed Jobs", type: "line", color: "#ec4899" },
];

const OPERATION_DISTRIBUTION: DonutDataItem[] = [
  { name: "Fulfilment Report", value: 286, percentage: "22.9%", color: "#3b82f6" },
  { name: "Warehouse Report", value: 198, percentage: "15.9%", color: "#10b981" },
  { name: "Shipment Report", value: 156, percentage: "12.5%", color: "#8b5cf6" },
  { name: "Carrier Report", value: 122, percentage: "9.8%", color: "#f59e0b" },
  { name: "Delivery Config Report", value: 98, percentage: "7.9%", color: "#06b6d4" },
  { name: "Revenue Leakage Report", value: 78, percentage: "6.3%", color: "#ec4899" },
  { name: "Exception / Claims Report", value: 67, percentage: "5.4%", color: "#ef4444" },
  { name: "Cost / Reconciliation Report", value: 58, percentage: "4.6%", color: "#f97316" },
  { name: "Operational Import", value: 48, percentage: "3.8%", color: "#a855f7" },
  { name: "Data Export", value: 30, percentage: "2.4%", color: "#6366f1" },
  { name: "Evidence Package", value: 22, percentage: "1.8%", color: "#14b8a6" },
  { name: "Audit Extract", value: 14, percentage: "1.1%", color: "#64748b" },
];

const JOB_STATUS_SUMMARY: BarChartDataPoint[] = [
  { name: "Draft", count: 12, percentage: "1.0%", color: "#94a3b8" },
  { name: "Pending Review", count: 164, percentage: "13.1%", color: "#f59e0b" },
  { name: "Pending Approval", count: 132, percentage: "10.6%", color: "#8b5cf6" },
  { name: "Running", count: 96, percentage: "7.7%", color: "#3b82f6" },
  { name: "Completed", count: 512, percentage: "41.0%", color: "#10b981" },
  { name: "Partial", count: 54, percentage: "4.3%", color: "#38bdf8" },
  { name: "Failed", count: 38, percentage: "3.0%", color: "#ef4444" },
  { name: "Quarantined", count: 28, percentage: "2.2%", color: "#ec4899" },
  { name: "Reconciliation Required", count: 110, percentage: "8.8%", color: "#f97316" },
  { name: "Reconciled", count: 182, percentage: "14.6%", color: "#059669" },
  { name: "Archived", count: 16, percentage: "1.3%", color: "#64748b" },
];

export function ReportAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 mb-3">
      {/* Chart A: Reporting & Data-Exchange Trend */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Reporting &amp; Data-Exchange Trend (Last 30 Days)
          </h3>
          <span className="text-[10px] text-gray-500 font-medium font-mono">30-Day Trend</span>
        </div>
        <ReusableCombinationChart
          data={TREND_DATA}
          xAxisKey="date"
          series={COMBINATION_SERIES}
          height={260}
        />
      </div>

      {/* Chart B: Logistics Operation Type Distribution */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Logistics Operation Type Distribution
          </h3>
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
            1,248 Total
          </span>
        </div>
        <ReusableDonutChart
          data={OPERATION_DISTRIBUTION}
          totalValue={1248}
          totalLabel="Total Operations"
          height={260}
        />
      </div>

      {/* Chart C: Job Status Summary */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Job Status Summary
          </h3>
          <span className="text-[10px] text-gray-500 font-medium font-mono">Active Jobs</span>
        </div>
        <ReusableBarChart
          data={JOB_STATUS_SUMMARY}
          layout="horizontal"
          height={260}
        />
      </div>
    </div>
  );
}
