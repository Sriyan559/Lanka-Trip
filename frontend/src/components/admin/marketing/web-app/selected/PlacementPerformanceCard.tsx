"use client";

import React from "react";
import { PerformanceTrendPoint } from "@/data/marketingWebApp.mock";
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

interface PlacementPerformanceCardProps {
  trendData: PerformanceTrendPoint[];
}

export function PlacementPerformanceCard({ trendData }: PlacementPerformanceCardProps) {
  const hasData = Array.isArray(trendData) && trendData.length > 0;

  const displayData = hasData
    ? trendData
    : [
        { date: "Jul 16", impressions: 0, engagementRate: 0, conversionRate: 0 },
        { date: "Aug 14", impressions: 0, engagementRate: 0, conversionRate: 0 },
      ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Placement Performance</h4>
          <span className="text-[10px] text-gray-400 font-normal">(Last 30 Days)</span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs" />
            <span>Impressions</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            <span>Engagement Rate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Conversion Rate</span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative w-full h-[120px] mt-2">
          {!hasData && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <span className="text-[11px] font-medium text-gray-400">
                No placement performance data available
              </span>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={displayData}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
              />
              {hasData && (
                <Tooltip
                  contentStyle={{
                    fontSize: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    padding: "4px 8px",
                  }}
                />
              )}
              <Bar
                yAxisId="left"
                dataKey="impressions"
                fill="#2563eb"
                barSize={8}
                radius={[2, 2, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engagementRate"
                stroke="#e11d48"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "#e11d48" }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversionRate"
                stroke="#16a34a"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "#16a34a" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
