"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export interface ComboSeriesConfig {
  key: string;
  name: string;
  color: string;
  type?: "bar" | "line";
  yAxisId?: "left" | "right";
  strokeWidth?: number;
  rightYAxis?: boolean;
}

interface ComboChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  series?: ComboSeriesConfig[];
  bars?: { key: string; name: string; color: string; yAxisId?: "left" | "right" }[];
  lines?: { key: string; name: string; color: string; yAxisId?: "left" | "right"; strokeWidth?: number; rightYAxis?: boolean }[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
}

export function ComboChart({
  data = [],
  xAxisKey,
  series = [],
  bars = [],
  lines = [],
  height = 220,
  showLegend = true,
  showGrid = true,
  className = "",
}: ComboChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Merge series or explicit bars/lines arrays into unified series config
  const combinedSeries: ComboSeriesConfig[] = [
    ...series,
    ...bars.map((b) => ({ ...b, type: "bar" as const })),
    ...lines.map((l) => ({
      ...l,
      type: "line" as const,
      yAxisId: l.rightYAxis ? ("right" as const) : l.yAxisId || ("left" as const),
    })),
  ];

  if (!mounted || !data || data.length === 0 || combinedSeries.length === 0) {
    return (
      <div
        className={`w-full bg-slate-50 animate-pulse rounded flex items-center justify-center text-xs text-slate-400 ${className}`}
        style={{ minHeight: height }}
      >
        Loading chart...
      </div>
    );
  }

  const hasRightAxis = combinedSeries.some((s) => s.yAxisId === "right");

  return (
    <div className={`w-full min-w-0 ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: hasRightAxis ? 25 : 10, left: 5, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 9.5, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 9.5, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          {hasRightAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 9.5, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={32}
              unit="%"
              domain={[0, 100]}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "10.5px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: "10px", paddingTop: "4px" }}
              iconType="square"
              iconSize={8}
            />
          )}
          {combinedSeries.map((s) =>
            s.type === "bar" ? (
              <Bar
                key={s.key}
                yAxisId={s.yAxisId || "left"}
                dataKey={s.key}
                name={s.name}
                fill={s.color}
                radius={[3, 3, 0, 0]}
                barSize={14}
              />
            ) : (
              <Line
                key={s.key}
                yAxisId={s.yAxisId || "left"}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={s.strokeWidth || 2}
                dot={{ r: 3, fill: s.color }}
                activeDot={{ r: 4.5 }}
              />
            )
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
