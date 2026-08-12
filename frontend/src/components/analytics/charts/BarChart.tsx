"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export interface BarSeriesConfig {
  key: string;
  name: string;
  color: string;
}

interface BarChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  series: BarSeriesConfig[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
}

export function BarChart({
  data = [],
  xAxisKey,
  series = [],
  height = 200,
  showLegend = true,
  showGrid = true,
  className = "",
}: BarChartProps) {
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
        Loading chart...
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 10, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "11px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "4px" }}
              iconType="square"
              iconSize={8}
            />
          )}
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color}
              radius={[3, 3, 0, 0]}
              barSize={18}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
