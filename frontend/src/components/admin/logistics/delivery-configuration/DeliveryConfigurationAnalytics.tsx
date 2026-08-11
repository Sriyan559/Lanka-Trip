"use client";

import React from "react";
import { ReusableCombinationChart, CombinationSeriesConfig } from "../charts/ReusableCombinationChart";
import { ReusableDonutChart, DonutDataItem } from "../charts/ReusableDonutChart";
import { ReusableBarChart, BarChartDataPoint } from "../charts/ReusableBarChart";

const COVERAGE_CAPACITY_TREND_DATA = [
  { date: "Apr 27", activeZones: 80, orders: 350, utilisation: 70, sameDayCap: 450, nextDayCap: 1200, exceptions: 2 },
  { date: "Apr 30", activeZones: 82, orders: 380, utilisation: 72, sameDayCap: 480, nextDayCap: 1250, exceptions: 3 },
  { date: "May 3", activeZones: 84, orders: 410, utilisation: 74, sameDayCap: 500, nextDayCap: 1300, exceptions: 1 },
  { date: "May 6", activeZones: 84, orders: 390, utilisation: 71, sameDayCap: 500, nextDayCap: 1280, exceptions: 2 },
  { date: "May 9", activeZones: 85, orders: 440, utilisation: 75, sameDayCap: 520, nextDayCap: 1320, exceptions: 2 },
  { date: "May 12", activeZones: 86, orders: 460, utilisation: 78, sameDayCap: 530, nextDayCap: 1350, exceptions: 4 },
  { date: "May 15", activeZones: 86, orders: 430, utilisation: 73, sameDayCap: 510, nextDayCap: 1310, exceptions: 1 },
  { date: "May 18", activeZones: 86, orders: 450, utilisation: 76, sameDayCap: 525, nextDayCap: 1330, exceptions: 2 },
  { date: "May 21", activeZones: 86, orders: 470, utilisation: 77, sameDayCap: 540, nextDayCap: 1360, exceptions: 3 },
  { date: "May 24", activeZones: 86, orders: 490, utilisation: 79, sameDayCap: 550, nextDayCap: 1380, exceptions: 1 },
];

const TREND_SERIES: CombinationSeriesConfig[] = [
  { key: "utilisation", name: "Capacity Utilisation (%)", type: "line", color: "#f59e0b" },
  { key: "exceptions", name: "Config Exceptions", type: "line", color: "#ef4444" },
  { key: "orders", name: "Covered Orders", type: "line", color: "#3b82f6" },
  { key: "nextDayCap", name: "Next-Day Capacity", type: "line", color: "#8b5cf6" },
  { key: "sameDayCap", name: "Same-Day Capacity", type: "line", color: "#10b981" },
];

const SERVICE_COVERAGE_DISTRIBUTION: DonutDataItem[] = [
  { name: "Same-Day", value: 5, percentage: "20.8%", color: "#f59e0b" },
  { name: "Next-Day", value: 8, percentage: "33.3%", color: "#3b82f6" },
  { name: "Standard", value: 6, percentage: "25.0%", color: "#10b981" },
  { name: "Express", value: 2, percentage: "8.3%", color: "#8b5cf6" },
  { name: "Scheduled", value: 1, percentage: "4.2%", color: "#06b6d4" },
  { name: "Remote", value: 1, percentage: "4.2%", color: "#ec4899" },
  { name: "Special Handling", value: 1, percentage: "4.2%", color: "#6366f1" },
  { name: "Unsupported", value: 0, percentage: "0.0%", color: "#94a3b8" },
];

const CONFIG_STATUS_SUMMARY_DATA: BarChartDataPoint[] = [
  { name: "Draft", count: 12, percentage: "4.1%", color: "#64748b" },
  { name: "Pending Review", count: 18, percentage: "6.2%", color: "#38bdf8" },
  { name: "Pending Approval", count: 24, percentage: "8.2%", color: "#3b82f6" },
  { name: "Active", count: 236, percentage: "80.5%", color: "#10b981" },
  { name: "Scheduled", count: 34, percentage: "11.6%", color: "#6366f1" },
  { name: "Expiring", count: 14, percentage: "4.8%", color: "#f59e0b" },
  { name: "Suspended", count: 6, percentage: "2.1%", color: "#ef4444" },
  { name: "Conflict", count: 8, percentage: "2.7%", color: "#f43f5e" },
  { name: "Exception", count: 9, percentage: "3.1%", color: "#d97706" },
];

export function DeliveryConfigurationAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 mb-3">
      {/* Panel A: Delivery Coverage & Capacity Trend (30 Days) */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Delivery Coverage &amp; Capacity Trend (Last 30 Days)
          </h3>
          <span className="text-[10px] text-gray-500 font-medium">Multi-Series Metric</span>
        </div>
        <ReusableCombinationChart
          data={COVERAGE_CAPACITY_TREND_DATA}
          xAxisKey="date"
          series={TREND_SERIES}
          height={240}
        />
      </div>

      {/* Panel B: Service Coverage Distribution */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Service Coverage Distribution
          </h3>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
            By Active Services
          </span>
        </div>
        <ReusableDonutChart
          data={SERVICE_COVERAGE_DISTRIBUTION}
          totalValue={24}
          totalLabel="Total Services"
          height={240}
        />
      </div>

      {/* Panel C: Configuration Status Summary */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">
            Configuration Status Summary
          </h3>
          <span className="text-[10px] text-gray-500 font-medium font-mono">248 Total</span>
        </div>
        <ReusableBarChart
          data={CONFIG_STATUS_SUMMARY_DATA}
          layout="horizontal"
          height={240}
        />
      </div>
    </div>
  );
}
