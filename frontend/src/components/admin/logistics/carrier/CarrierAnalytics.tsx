"use client";

import React from "react";
import { ReusableCombinationChart, CombinationSeriesConfig } from "../charts/ReusableCombinationChart";
import { ReusableDonutChart, DonutDataItem } from "../charts/ReusableDonutChart";
import { ReusableBarChart, BarChartDataPoint } from "../charts/ReusableBarChart";

const PERFORMANCE_TREND_DATA = [
  { date: "Apr 27", assigned: 650, pickups: 550, deliveries: 480, delayed: 45, failed: 25, claims: 15 },
  { date: "Apr 30", assigned: 920, pickups: 780, deliveries: 700, delayed: 60, failed: 35, claims: 20 },
  { date: "May 3", assigned: 840, pickups: 720, deliveries: 620, delayed: 50, failed: 30, claims: 12 },
  { date: "May 6", assigned: 910, pickups: 760, deliveries: 680, delayed: 55, failed: 28, claims: 18 },
  { date: "May 9", assigned: 980, pickups: 820, deliveries: 740, delayed: 65, failed: 40, claims: 22 },
  { date: "May 12", assigned: 1050, pickups: 880, deliveries: 790, delayed: 70, failed: 45, claims: 25 },
  { date: "May 15", assigned: 1180, pickups: 950, deliveries: 860, delayed: 80, failed: 50, claims: 30 },
  { date: "May 18", assigned: 1020, pickups: 840, deliveries: 760, delayed: 60, failed: 35, claims: 20 },
  { date: "May 21", assigned: 960, pickups: 800, deliveries: 720, delayed: 55, failed: 32, claims: 16 },
  { date: "May 24", assigned: 890, pickups: 740, deliveries: 660, delayed: 50, failed: 28, claims: 14 },
];

const COMBINATION_SERIES: CombinationSeriesConfig[] = [
  { key: "assigned", name: "Shipments Assigned", type: "line", color: "#3b82f6", yAxisId: "left" },
  { key: "pickups", name: "Pickups Completed", type: "line", color: "#059669", yAxisId: "left" },
  { key: "deliveries", name: "Deliveries Completed", type: "line", color: "#a855f7", yAxisId: "left" },
  { key: "delayed", name: "Delayed Shipments", type: "bar", color: "#d97706", yAxisId: "right" },
  { key: "failed", name: "Failed Deliveries", type: "bar", color: "#dc2626", yAxisId: "right" },
  { key: "claims", name: "Claims Opened", type: "bar", color: "#c084fc", yAxisId: "right" },
];

const CARRIER_TYPE_DISTRIBUTION: DonutDataItem[] = [
  { name: "National Courier", value: 6, percentage: "33.3%", color: "#3b82f6" },
  { name: "Regional Courier", value: 4, percentage: "22.2%", color: "#10b981" },
  { name: "Same-Day Partner", value: 3, percentage: "16.7%", color: "#06b6d4" },
  { name: "3PL", value: 2, percentage: "11.1%", color: "#059669" },
  { name: "Internal Fleet", value: 2, percentage: "11.1%", color: "#334155" },
  { name: "Specialist Carrier", value: 1, percentage: "5.6%", color: "#c084fc" },
];

const OPERATIONAL_STATUS_DATA: BarChartDataPoint[] = [
  { name: "Healthy", count: 8, percentage: "44.4%", color: "#10b981" },
  { name: "High Capacity", count: 3, percentage: "16.7%", color: "#3b82f6" },
  { name: "At Risk", count: 2, percentage: "11.1%", color: "#f97316" },
  { name: "Limited Service", count: 2, percentage: "11.1%", color: "#eab308" },
  { name: "Compliance Review", count: 1, percentage: "5.6%", color: "#c084fc" },
  { name: "On Hold", count: 1, percentage: "5.6%", color: "#94a3b8" },
  { name: "Suspended", count: 1, percentage: "5.6%", color: "#ef4444" },
  { name: "Offline", count: 0, percentage: "0%", color: "#cbd5e1" },
];

export function CarrierAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 mb-3">
      {/* Card 1: Carrier Performance Trend (Last 30 Days) */}
      <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 tracking-tight">
            Carrier Performance Trend (Last 30 Days)
          </h3>
        </div>
        <ReusableCombinationChart
          data={PERFORMANCE_TREND_DATA}
          xAxisKey="date"
          series={COMBINATION_SERIES}
          showDualYAxis={true}
          height={240}
        />
      </div>

      {/* Card 2: Carrier Type Distribution */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 tracking-tight">
            Carrier Type Distribution
          </h3>
        </div>
        <ReusableDonutChart
          data={CARRIER_TYPE_DISTRIBUTION}
          totalValue={18}
          totalLabel="Total Carriers"
          height={240}
        />
      </div>

      {/* Card 3: Carrier Operational Status Summary */}
      <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-xs font-bold text-gray-900 tracking-tight">
            Carrier Operational Status Summary
          </h3>
        </div>
        <ReusableBarChart
          data={OPERATIONAL_STATUS_DATA}
          layout="horizontal"
          height={240}
        />
      </div>
    </div>
  );
}
