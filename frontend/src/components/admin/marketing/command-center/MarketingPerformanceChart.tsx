"use client";

import React, { useState } from "react";
import { ChartDataPoint } from "@/data/marketingCommandCenter.mock";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreVertical } from "lucide-react";

interface MarketingPerformanceChartProps {
  data: ChartDataPoint[];
  loading?: boolean;
}

export function MarketingPerformanceChart({
  data = [],
  loading = false,
}: MarketingPerformanceChartProps) {
  const [metricFilter, setMetricFilter] = useState("Revenue & Spend");
  const [timeFilter, setTimeFilter] = useState("Daily");

  const hasData = Array.isArray(data) && data.length > 0;

  // Fallback structural ticks for empty state
  const displayData = hasData
    ? data
    : Array.from({ length: 10 }, (_, i) => ({
        date: `Day ${i + 1}`,
        revenue: 0,
        spend: 0,
        conversions: 0,
      }));

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Marketing Performance
          </h3>
          <p className="text-[11px] text-gray-500">
            Spend, attributed revenue and conversions over time
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Metric Selector Dropdown */}
          <select
            value={metricFilter}
            onChange={(e) => setMetricFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 font-semibold text-gray-700 focus:outline-none"
          >
            <option>Revenue & Spend</option>
            <option>ROAS & Conversions</option>
            <option>Channel Breakdown</option>
          </select>

          {/* Time View Buttons */}
          <div className="inline-flex bg-gray-100 p-0.5 rounded-lg text-xs font-semibold text-gray-600">
            {(["Daily", "Weekly", "Monthly"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTimeFilter(mode)}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  timeFilter === mode
                    ? "bg-white text-[#800020] shadow-2xs font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-gray-600 pt-2.5 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#800020]" />
          <span>Attributed Revenue (LKR)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#f39cb3]" />
          <span>Marketing Spend (LKR)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a31c44] border-2 border-white shadow-2xs" />
          <span>Conversions</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative w-full h-[220px] sm:h-[240px] my-2">
        {!hasData && !loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-2xs">
            <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-500 shadow-2xs">
              No marketing performance data for selected period
            </div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={displayData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}M`)}
              tickLine={false}
              axisLine={false}
              domain={[0, 6]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(v) => (v === 0 ? "0" : `${v}`)}
              tickLine={false}
              axisLine={false}
              domain={[0, 2000]}
            />
            {hasData && (
              <Tooltip
                contentStyle={{
                  fontSize: "11px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
                formatter={(val: any, name: any) => {
                  if (name === "revenue") return [`LKR ${val}M`, "Attributed Revenue"];
                  if (name === "spend") return [`LKR ${val}M`, "Marketing Spend"];
                  if (name === "conversions") return [val, "Conversions"];
                  return [val, name];
                }}
              />
            )}
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="#800020"
              barSize={10}
              radius={[2, 2, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="spend"
              fill="#f39cb3"
              barSize={10}
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversions"
              stroke="#a31c44"
              strokeWidth={2}
              dot={{ r: 3, fill: "#a31c44", stroke: "#ffffff", strokeWidth: 1 }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer Bar */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100 text-center">
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Spend
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900">
            LKR 8.42M
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Attributed Revenue
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900">
            LKR 31.7M
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            ROAS
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900">
            3.76x
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-medium text-gray-500 uppercase">
            Conversions
          </span>
          <span className="text-xs sm:text-sm font-bold text-gray-900">
            28,416
          </span>
        </div>
      </div>
    </div>
  );
}
