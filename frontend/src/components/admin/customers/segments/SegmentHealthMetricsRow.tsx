"use client";

import React from "react";
import { SegmentHealthMetric } from "@/types/customer-segments";

interface SegmentHealthMetricsRowProps {
  healthMetrics: SegmentHealthMetric[];
}

export function SegmentHealthMetricsRow({ healthMetrics }: SegmentHealthMetricsRowProps) {
  return (
    <div className="bg-white border border-line rounded-lg p-3 shadow-2xs mb-4 overflow-x-auto scrollbar-thin">
      <div className="min-w-[950px] grid grid-cols-10 divide-x divide-line/70 py-0.5">
        {healthMetrics.map((m) => (
          <div key={m.id} className="flex flex-col items-center justify-between px-2 text-center">
            <span className="text-[9.5px] font-bold text-slate-600 truncate w-full" title={m.label}>
              {m.label}
            </span>

            <span className="text-[14px] font-black font-mono text-ink my-1">
              {m.valuePct}%
            </span>

            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  m.valuePct >= 85
                    ? "bg-emerald-600"
                    : m.valuePct >= 75
                    ? "bg-amber-500"
                    : "bg-rose-600"
                }`}
                style={{ width: `${m.valuePct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
