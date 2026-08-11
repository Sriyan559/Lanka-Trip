"use client";

import React, { useState } from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { PerformanceChartPoint } from "@/data/campaignDetail.mock";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function CampaignPerformanceChartPanel({
  chartData = [],
  summary,
}: {
  chartData: PerformanceChartPoint[];
  summary: {
    spend: string;
    committed: string;
    conversions: string;
    roas: string;
    cpa: string;
  };
}) {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");

  return (
    <MarketingSectionCard
      title="Campaign Performance"
      headerActions={
        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold">
          <button
            onClick={() => setViewMode("daily")}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              viewMode === "daily"
                ? "bg-[#800020] text-white shadow-2xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setViewMode("weekly")}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              viewMode === "weekly"
                ? "bg-[#800020] text-white shadow-2xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Weekly
          </button>
        </div>
      }
      className="h-full"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Chart area */}
        <div className="w-full h-[155px] relative">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-gray-400">
              No campaign performance data available for this period.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 9, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 9, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 8]}
                  tick={{ fontSize: 9, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "9px", paddingTop: "2px" }}
                  iconSize={8}
                />
                <Bar
                  yAxisId="left"
                  dataKey="actualSpend"
                  name="Spend (LKR)"
                  fill="#800020"
                  barSize={6}
                  radius={[2, 2, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="roas"
                  name="ROAS (x)"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="conversions"
                  name="Conversions"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Footer Metrics Row */}
        <div className="grid grid-cols-5 gap-1 border-t border-gray-100 pt-2 mt-1 text-center font-sans">
          <div>
            <span className="text-gray-400 text-[9px] block">Spend</span>
            <span className="font-bold text-gray-900 text-xs">{summary.spend}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[9px] block">Committed</span>
            <span className="font-bold text-gray-900 text-xs">{summary.committed}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[9px] block">Conversions</span>
            <span className="font-bold text-gray-900 text-xs">{summary.conversions}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[9px] block">ROAS</span>
            <span className="font-bold text-emerald-700 text-xs">{summary.roas}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[9px] block">CPA</span>
            <span className="font-bold text-gray-900 text-xs">{summary.cpa}</span>
          </div>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
