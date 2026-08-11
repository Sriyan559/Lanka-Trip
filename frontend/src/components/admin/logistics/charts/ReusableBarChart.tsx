"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

export interface BarChartDataPoint {
  name: string;
  count: number;
  percentage?: string;
  color?: string;
}

interface ReusableBarChartProps {
  data: BarChartDataPoint[];
  layout?: "horizontal" | "vertical";
  height?: number;
  barColor?: string;
  className?: string;
}

export function ReusableBarChart({
  data,
  layout = "horizontal",
  height = 180,
  barColor = "#3b82f6",
  className = "",
}: ReusableBarChartProps) {
  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        {layout === "horizontal" ? (
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 55, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" tick={{ fontSize: 9, fill: "#64748b" }} domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 10, fill: "#334155" }}
              width={95}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e2e8f0",
                fontSize: "11px",
                borderRadius: "6px",
              }}
              formatter={(val: any, name: any, item: any) => [
                `${val} carriers ${item.payload.percentage ? `(${item.payload.percentage})` : ""}`,
                "Count",
              ]}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={11}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || barColor} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                formatter={(val: any) => {
                  const match = data.find((d) => d.count === Number(val));
                  const pct = match?.percentage;
                  return `${val}${pct ? ` (${pct})` : ""}`;
                }}
                style={{ fontSize: "10px", fill: "#475569", fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} />
            <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e2e8f0",
                fontSize: "11px",
                borderRadius: "6px",
              }}
            />
            <Bar dataKey="count" fill={barColor} radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
