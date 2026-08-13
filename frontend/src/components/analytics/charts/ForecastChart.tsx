"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export interface ForecastPoint {
  date: string;
  actual?: number | null;
  forecast?: number | null;
  target?: number | null;
  confidenceLow?: number | null;
  confidenceHigh?: number | null;
}

interface ForecastChartProps {
  data: ForecastPoint[];
  xAxisKey?: string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
}

export function ForecastChart({
  data = [],
  xAxisKey = "date",
  height = 200,
  showLegend = true,
  showGrid = true,
  className = "",
}: ForecastChartProps) {
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
        Loading forecast chart...
      </div>
    );
  }

  // Pre-process data for confidence band [confidenceLow, confidenceHigh]
  const formattedData = data.map((d) => ({
    ...d,
    confidenceRange:
      d.confidenceLow !== undefined && d.confidenceHigh !== undefined
        ? [d.confidenceLow, d.confidenceHigh]
        : null,
  }));

  const renderCustomLegend = (props: any) => {
    return (
      <div className="flex flex-wrap justify-center items-center gap-3 text-[10px] font-bold text-slate-700 pb-1">
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Actual
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-0.5 bg-emerald-600 inline-block" /> Forecast
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-0.5 bg-purple-600 inline-block" /> Target
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-purple-100 border border-purple-200 rounded-xs inline-block" /> Confidence Band
        </span>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={formattedData} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 9, fill: "#64748b", fontWeight: 500 }}
            axisLine={{ stroke: "#cbd5e1" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#64748b", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "10.5px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
          {showLegend && <Legend verticalAlign="top" content={renderCustomLegend} />}

          {/* Confidence Band Area */}
          <Area
            type="monotone"
            dataKey="confidenceRange"
            name="Confidence Band"
            fill="#ede9fe"
            stroke="none"
            opacity={0.5}
          />

          {/* Target Line */}
          <Line
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#9333ea"
            strokeWidth={1.8}
            strokeDasharray="4 4"
            dot={false}
          />

          {/* Forecast Line */}
          <Line
            type="monotone"
            dataKey="forecast"
            name="Forecast"
            stroke="#16a34a"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: "#16a34a" }}
          />

          {/* Actual Line */}
          <Line
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 3.5, fill: "#2563eb" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
