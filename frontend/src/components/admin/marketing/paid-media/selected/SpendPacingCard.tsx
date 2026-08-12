"use client";

import React from "react";
import { TrendPoint } from "@/data/marketingPaidMedia.mock";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpendPacingCardProps {
  spendPacing: {
    utilizationPercent: number;
    budget: string;
    spend: string;
    trendData: TrendPoint[];
  };
}

export function SpendPacingCard({ spendPacing }: SpendPacingCardProps) {
  const hasData = Array.isArray(spendPacing.trendData) && spendPacing.trendData.length > 0;

  const displayData = hasData
    ? spendPacing.trendData
    : [
        { date: "Jul 16", value1: 0, value2: 0 },
        { date: "Aug 13", value1: 0, value2: 0 },
      ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Spend & Pacing</span>
        </h4>

        <div className="mt-2 space-y-1 text-xs">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-medium text-gray-400">Utilization</span>
            <span className="text-lg font-extrabold text-blue-700">
              {spendPacing.utilizationPercent}%
            </span>
          </div>

          {/* Chart Container */}
          <div className="relative w-full h-[80px] mt-1">
            {!hasData && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                <span className="text-[10px] font-medium text-gray-400">
                  No performance data available
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
                  dataKey="value1"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 2, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Pacing Analysis
        </button>
      </div>
    </div>
  );
}
