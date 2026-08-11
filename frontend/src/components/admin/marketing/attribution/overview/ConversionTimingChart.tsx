"use client";

import React from "react";
import { ConversionTimingPoint } from "@/data/marketingAttribution.mock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ConversionTimingChartProps {
  timingPoints: ConversionTimingPoint[];
}

export function ConversionTimingChart({ timingPoints }: ConversionTimingChartProps) {
  const hasData = Array.isArray(timingPoints) && timingPoints.length > 0;

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Conversion Timing <span className="text-gray-400 font-normal">(Time to Conversion)</span></span>
        </h4>

        {/* Chart */}
        <div className="relative w-full h-[85px] mt-2">
          {!hasData && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <span className="text-[10px] font-medium text-gray-400">
                No timing data available
              </span>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timingPoints} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="bucket"
                tick={{ fontSize: 9, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#64748b" }}
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
              <Bar dataKey="volume" fill="#2563eb" radius={[2, 2, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Buckets summary table */}
        <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[10px] border-t border-gray-100 pt-1.5">
          {timingPoints.map((tp) => (
            <div key={tp.bucket}>
              <span className="text-gray-400 block font-medium">{tp.bucket}</span>
              <span className="font-bold text-gray-900">{tp.percent}</span>
              <span className="text-emerald-700 font-mono block text-[9px]">{tp.attributedRevenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
