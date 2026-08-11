"use client";

import React, { useState } from "react";
import { SpendvsPlanPoint } from "@/data/marketingBudgets.mock";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpendVsPlanChartCardProps {
  trendData: SpendvsPlanPoint[];
}

export function SpendVsPlanChartCard({ trendData }: SpendVsPlanChartCardProps) {
  const [periodMode, setPeriodMode] = useState<"monthly" | "quarterly">("monthly");
  const hasData = Array.isArray(trendData) && trendData.length > 0;

  const displayData = hasData
    ? trendData
    : [
        { date: "Jul", planned: 0, actual: 0 },
        { date: "Jun", planned: 0, actual: 0 },
      ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Spend vs Plan</h4>
          <div className="inline-flex bg-gray-100 p-0.5 rounded text-[10px] font-semibold text-gray-600">
            <button
              onClick={() => setPeriodMode("monthly")}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                periodMode === "monthly"
                  ? "bg-[#800020] text-white font-bold"
                  : "hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriodMode("quarterly")}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                periodMode === "quarterly"
                  ? "bg-[#800020] text-white font-bold"
                  : "hover:text-gray-900"
              }`}
            >
              Quarterly
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span>Planned (Cum.)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Actual (Cum.)</span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative w-full h-[90px] mt-1">
          {!hasData && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <span className="text-[10px] font-medium text-gray-400">
                No spend data available
              </span>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 8, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                tick={{ fontSize: 8, fill: "#94a3b8" }}
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
              <Line
                type="monotone"
                dataKey="planned"
                stroke="#9333ea"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 2, fill: "#16a34a" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
