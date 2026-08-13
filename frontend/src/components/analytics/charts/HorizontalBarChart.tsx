"use client";

import React from "react";
import { PricePositioningItem } from "@/data/analytics/salesRevenueData";

interface HorizontalBarChartProps {
  data: PricePositioningItem[];
  leftHeaderTitle?: string;
  rightHeaderTitle?: string;
  height?: number;
  className?: string;
}

export function HorizontalBarChart({
  data = [],
  leftHeaderTitle = "Category / Driver",
  rightHeaderTitle = "Share / Impact",
  height = 170,
  className = "",
}: HorizontalBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className={`w-full flex items-center justify-center text-xs text-slate-400 font-medium ${className}`}
        style={{ minHeight: height }}
      >
        No data available
      </div>
    );
  }

  // Calculate max value to scale bar width proportionally
  const maxVal = Math.max(...data.map((d) => Math.abs(d.skuPercent || 0)), 100);

  return (
    <div className={`horizontal-bar-chart w-full min-w-0 flex flex-col justify-between text-xs ${className}`} style={{ minHeight: height }}>
      {/* Header Column Titles */}
      <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 pb-1 border-b border-slate-100">
        <span>{leftHeaderTitle}</span>
        <span className="text-right">{rightHeaderTitle}</span>
      </div>

      {/* Rows */}
      <div className="space-y-2 py-1.5 my-auto">
        {data.map((item, idx) => {
          const barWidthPercent = Math.min(Math.max((Math.abs(item.skuPercent) / maxVal) * 100, 4), 100);

          return (
            <div key={idx} className="space-y-1 min-w-0">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-800 leading-tight">
                <div className="flex items-baseline gap-1 min-w-0 pr-2">
                  <span className="text-slate-900 truncate font-semibold">{item.tier}</span>
                  {item.priceVsMarket && (
                    <span className="text-slate-400 font-medium text-[9px] truncate">
                      ({item.priceVsMarket})
                    </span>
                  )}
                </div>
                <span className="font-extrabold text-slate-900 text-[10px] shrink-0 tabular-nums">
                  {item.skuPercent}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-xs overflow-hidden">
                <div
                  className="h-full rounded-xs bg-burgundy transition-all duration-300"
                  style={{ width: `${barWidthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
