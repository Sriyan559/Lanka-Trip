"use client";

import React from "react";
import { FunnelStage } from "@/data/analytics/marketplaceSellersData";

interface FunnelChartProps {
  data: FunnelStage[];
  height?: number;
  className?: string;
}

export function FunnelChart({ data = [], height = 180, className = "" }: FunnelChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className={`w-full flex flex-col justify-center space-y-1.5 py-1 ${className}`} style={{ minHeight: height }}>
      {data.map((item, idx) => {
        // Calculate dynamic width percentage for funnel shape
        const widthPercent = Math.max(100 - idx * 12, 28);
        return (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <span className="w-32 text-right font-medium text-slate-600 truncate text-[10.5px]">
              {item.stage}
            </span>
            <div className="flex-1 flex justify-center">
              <div
                className="h-5 rounded-xs flex items-center justify-between px-2 text-[10px] font-bold transition-all shadow-2xs"
                style={{ width: `${widthPercent}%`, backgroundColor: item.color, color: "#ffffff" }}
              >
                <span className="truncate">{item.count}</span>
                <span className="opacity-90">{item.percentage}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
