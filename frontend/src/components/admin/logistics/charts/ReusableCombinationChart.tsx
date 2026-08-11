"use client";

import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface CombinationSeriesConfig {
  key: string;
  name: string;
  type: "line" | "bar";
  color: string;
  yAxisId?: "left" | "right";
}

interface ReusableCombinationChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  series: CombinationSeriesConfig[];
  height?: number;
  className?: string;
  showDualYAxis?: boolean;
}

export function ReusableCombinationChart({
  data,
  xAxisKey,
  series,
  height = 200,
  className = "",
  showDualYAxis = false,
}: ReusableCombinationChartProps) {
  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: showDualYAxis ? 15 : 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 10, fill: "#64748b" }} />
          <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#64748b" }} />
          {showDualYAxis && (
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#64748b" }} />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e2e8f0",
              fontSize: "11px",
              borderRadius: "6px",
            }}
          />
          <Legend
            verticalAlign="top"
            align="left"
            wrapperStyle={{ fontSize: "10px", paddingBottom: "6px" }}
            iconSize={8}
            iconType="circle"
          />
          {series.map((s) => {
            const axisId = s.yAxisId || "left";
            if (s.type === "bar") {
              return (
                <Bar
                  key={s.key}
                  yAxisId={axisId}
                  dataKey={s.key}
                  name={s.name}
                  fill={s.color}
                  barSize={8}
                  radius={[2, 2, 0, 0]}
                />
              );
            }
            return (
              <Line
                key={s.key}
                yAxisId={axisId}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={1.75}
                dot={{ r: 2.5 }}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
