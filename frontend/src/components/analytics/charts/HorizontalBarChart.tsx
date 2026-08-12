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
  leftHeaderTitle = "Price vs Market",
  rightHeaderTitle = "% SKUs",
  height = 170,
  className = "",
}: HorizontalBarChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className={`horizontal-bar-chart flex flex-col justify-between pt-1 text-xs ${className}`} style={{ height }}>
      {/* Header Column Titles */}
      <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 pb-1 border-b border-slate-100">
        <span>{leftHeaderTitle}</span>
        <span className="text-right">{rightHeaderTitle}</span>
      </div>

      {/* Rows */}
      <div className="space-y-2.5 my-auto">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-800 leading-tight">
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="text-slate-900 truncate">{item.tier}</span>
                {item.priceVsMarket && (
                  <span className="text-slate-400 font-medium text-[9px] truncate">
                    ({item.priceVsMarket})
                  </span>
                )}
              </div>
              <span className="font-extrabold text-slate-900 text-[10px] shrink-0 ml-1">
                {item.skuPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-xs overflow-hidden">
              <div
                className="h-full rounded-xs bg-burgundy transition-all duration-300"
                style={{ width: `${Math.min(item.skuPercent * 2.2, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
