"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { BubblePoint } from "@/data/analytics/salesRevenueData";

interface BubbleChartProps {
  data: BubblePoint[];
  height?: number;
  className?: string;
}

export function BubbleChart({ data = [], height = 170, className = "" }: BubbleChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data || data.length === 0) {
    return (
      <div
        className={`w-full bg-slate-50 animate-pulse rounded flex items-center justify-center text-xs text-slate-400 ${className}`}
        style={{ height }}
      >
        Loading bubble chart...
      </div>
    );
  }

  const highVolumeData = data.filter((d) => d.category === "High Volume");
  const midVolumeData = data.filter((d) => d.category === "Mid Volume");
  const lowVolumeData = data.filter((d) => d.category === "Low Volume");

  return (
    <div className={`w-full flex flex-col justify-between ${className}`} style={{ height }}>
      {/* Top Legend (Full Showing in Small Card Width) */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 mb-1 text-[9px] font-bold text-slate-700">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" /> High
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> Mid
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Low
        </span>
      </div>

      {/* Full Width Bubble Plot */}
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsScatterChart margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              type="number"
              dataKey="volume"
              domain={[0, 160]}
              ticks={[10, 80, 160]}
              tick={{ fontSize: 9, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickFormatter={(val) => (val === 160 ? "1M" : `${val}K`)}
            />
            <YAxis
              type="number"
              dataKey="gmPercent"
              domain={[0, 45]}
              ticks={[0, 22, 45]}
              tick={{ fontSize: 9, fill: "#64748b" }}
              axisLine={false}
              tickFormatter={(val) => `${val}%`}
              width={26}
            />
            <ZAxis type="number" dataKey="revenue" range={[60, 240]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "10px",
              }}
            />
            <Scatter name="High Volume" data={highVolumeData} fill="#16a34a" />
            <Scatter name="Mid Volume" data={midVolumeData} fill="#ea580c" />
            <Scatter name="Low Volume" data={lowVolumeData} fill="#2563eb" />
          </RechartsScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom X-Axis Label */}
      <div className="text-center text-[9px] font-bold text-slate-600 mt-0.5">
        Volume (Orders)
      </div>
    </div>
  );
}
