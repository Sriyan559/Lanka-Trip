"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

export interface PieDataPoint {
  name: string;
  value: number;
  count?: number;
  color: string;
}

interface PieChartProps {
  data: PieDataPoint[];
  centerText?: string;
  centerSubtext?: string;
  height?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  className?: string;
}

export function PieChart({
  data = [],
  centerText,
  centerSubtext = "Total",
  height = 180,
  innerRadius = "42%",
  outerRadius = "72%",
  className = "",
}: PieChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = data.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
  const hasData = mounted && data && data.length > 0 && total > 0;

  if (!mounted) {
    return (
      <div
        className={`w-full bg-slate-50 animate-pulse rounded flex items-center justify-center text-xs text-slate-400 ${className}`}
        style={{ minHeight: height }}
      >
        Loading chart…
      </div>
    );
  }

  if (!hasData) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-center gap-2 ${className}`}
        style={{ minHeight: height }}
      >
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="26" fill="none" stroke="#e2e8f0" strokeWidth="10" />
        </svg>
        <span className="text-[11px] font-medium text-slate-400">No data available</span>
      </div>
    );
  }

  // Square container guarantees the full 360° circle is never clipped
  const chartAreaSize = Math.max(130, Math.min(height * 0.62, 200));

  return (
    <div className={`w-full flex flex-col items-center gap-2.5 ${className}`}>
      {/* Donut in a square container — prevents ANY side clipping */}
      <div className="relative flex-shrink-0" style={{ width: chartAreaSize, height: chartAreaSize }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              dataKey="value"
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "11px",
                padding: "5px 9px",
              }}
              formatter={(val: any, name: any) => [`${val}%`, name]}
            />
          </RechartsPieChart>
        </ResponsiveContainer>

        {/* Center label */}
        {centerText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[11px] font-extrabold text-slate-900 leading-tight">
              {centerText}
            </span>
            {centerSubtext && (
              <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">
                {centerSubtext}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend — CSS grid keeps label + value in stable columns, no overlap */}
      <div className="w-full space-y-1">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="grid items-center gap-x-3 text-[11px]"
            style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}
          >
            <span className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate font-medium text-slate-700">{item.name}</span>
            </span>
            <span className="tabular-nums font-bold text-slate-800 text-right whitespace-nowrap">
              {item.value}%
              {item.count !== undefined && (
                <span className="font-normal text-slate-400 ml-1">
                  ({item.count.toLocaleString()})
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
