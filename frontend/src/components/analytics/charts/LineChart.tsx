"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export interface LineSeriesConfig {
  key: string;
  name: string;
  color: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  yAxisId?: string;
}

interface LineChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  series: LineSeriesConfig[];
  height?: number;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom";
  showGrid?: boolean;
  yAxisDomain?: [number | "auto", number | "auto"];
  rightYAxis?: boolean;
  className?: string;
}

export function LineChart({
  data = [],
  xAxisKey,
  series = [],
  height = 200,
  showLegend = true,
  legendPosition = "top",
  showGrid = true,
  yAxisDomain,
  rightYAxis = false,
  className = "",
}: LineChartProps) {
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

  // Custom legend to enforce side-by-side layout in tight spaces
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 pb-2">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-1 text-[8.5px] font-extrabold text-slate-700 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: rightYAxis ? 15 : 5, left: 2, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 9, fill: "#64748b", fontWeight: 500 }}
            axisLine={{ stroke: "#cbd5e1" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            domain={yAxisDomain || ["auto", "auto"]}
            tick={{ fontSize: 8.5, fill: "#64748b", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          {rightYAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 8.5, fill: "#64748b", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              unit="%"
              width={28}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
          {showLegend && (
            <Legend
              verticalAlign={legendPosition}
              align="center"
              content={renderCustomLegend}
            />
          )}
          {series.map((s) => (
            <Line
              key={s.key}
              yAxisId={s.yAxisId || "left"}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={s.strokeWidth || 2.5}
              strokeDasharray={s.strokeDasharray}
              dot={{ r: 2.5, fill: s.color }}
              activeDot={{ r: 4 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
