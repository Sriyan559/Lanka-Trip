"use client";

import React, { useState } from "react";
import { PerformanceTrendPoint } from "@/data/marketingAttribution.mock";
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

interface MarketingPerformanceChartProps {
  trendData: PerformanceTrendPoint[];
}

export function MarketingPerformanceChart({ trendData }: MarketingPerformanceChartProps) {
  const [periodMode, setPeriodMode] = useState<"daily" | "weekly">("daily");
  const hasData = Array.isArray(trendData) && trendData.length > 0;

  const displayData = hasData
    ? trendData
    : [
        { date: "Jul 16", spend: 0, attributedRevenue: 0, roas: 0 },
        { date: "Aug 13", spend: 0, attributedRevenue: 0, roas: 0 },
      ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Marketing Performance</h4>
          <div className="flex items-center gap-2">
            <div className="inline-flex bg-gray-100 p-0.5 rounded text-[10px] font-semibold text-gray-600">
              <button
                onClick={() => setPeriodMode("daily")}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  periodMode === "daily"
                    ? "bg-[#800020] text-white font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setPeriodMode("weekly")}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  periodMode === "weekly"
                    ? "bg-[#800020] text-white font-bold"
                    : "hover:text-gray-900"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-gray-500 mt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-700" />
              <span>Spend (LKR)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Attributed Revenue (LKR)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>ROAS (x)</span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative w-full h-[140px] mt-2">
          {!hasData && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <span className="text-xs font-medium text-gray-400">
                No marketing performance data available.
              </span>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={displayData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 9, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 9, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              {hasData && (
                <Tooltip
                  contentStyle={{
                    fontSize: "11px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    padding: "4px 8px",
                  }}
                />
              )}
              <Bar yAxisId="left" dataKey="spend" fill="#be123c" radius={[2, 2, 0, 0]} maxBarSize={16} />
              <Line yAxisId="left" type="monotone" dataKey="attributedRevenue" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="roas" stroke="#9333ea" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Metrics Row */}
      <div className="mt-3 pt-2 border-t border-gray-100 grid grid-cols-5 gap-2 text-center text-xs">
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Spend</span>
          <span className="font-bold text-rose-700">LKR 8.42M</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Attributed Revenue</span>
          <span className="font-bold text-emerald-700">LKR 31.7M</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">ROAS</span>
          <span className="font-bold text-blue-700">3.76x</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Conversions</span>
          <span className="font-bold text-gray-900">28,416</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Assisted Revenue</span>
          <span className="font-bold text-blue-700">LKR 8.9M</span>
        </div>
      </div>
    </div>
  );
}
