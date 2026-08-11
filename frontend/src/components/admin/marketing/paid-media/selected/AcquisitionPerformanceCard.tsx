"use client";

import React from "react";
import { TrendPoint } from "@/data/marketingPaidMedia.mock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AcquisitionPerformanceCardProps {
  acquisition: {
    cac: string;
    cpa: string;
    conversions: string;
    conversionRate: string;
    barData: TrendPoint[];
  };
}

export function AcquisitionPerformanceCard({ acquisition }: AcquisitionPerformanceCardProps) {
  const hasData = Array.isArray(acquisition.barData) && acquisition.barData.length > 0;

  const displayData = hasData
    ? acquisition.barData
    : [
        { date: "W1", value1: 0 },
        { date: "W4", value1: 0 },
      ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Acquisition Performance</span>
        </h4>

        <div className="mt-2 space-y-1 text-xs">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] font-medium text-gray-400">CAC</span>
            <span className="text-lg font-extrabold text-emerald-700">
              {acquisition.cac}
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
              <BarChart data={displayData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                <Bar
                  dataKey="value1"
                  fill="#800020"
                  barSize={10}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Acquisition Detail
        </button>
      </div>
    </div>
  );
}
