"use client";

import React from "react";
import { WaterfallStepData } from "@/data/analytics/executivePerformanceData";

interface WaterfallChartProps {
  data: WaterfallStepData[];
  height?: number;
  className?: string;
}

export function WaterfallChart({
  data = [],
  height = 180,
  className = "",
}: WaterfallChartProps) {
  if (!data || data.length === 0) return null;

  // Calculate cumulative steps for floating positioning
  let currentVal = 0;
  const computedSteps = data.map((step) => {
    let startVal = currentVal;
    let endVal = currentVal;

    if (step.type === "base" || step.type === "total") {
      startVal = 0;
      endVal = step.value;
      if (step.type === "base") currentVal = step.value;
    } else if (step.type === "increase") {
      startVal = currentVal;
      endVal = currentVal + (step.value || 0);
      currentVal = endVal;
    } else if (step.type === "decrease") {
      startVal = currentVal;
      endVal = currentVal + (step.value || 0); // step.value is negative
      currentVal = endVal;
    }

    return {
      ...step,
      startVal: Math.min(startVal, endVal),
      endVal: Math.max(startVal, endVal),
      heightVal: Math.abs(step.value || 0),
    };
  });

  const rawMax = Math.max(...computedSteps.map((s) => s.endVal), 1);
  const maxScale = isFinite(rawMax) && rawMax > 0 ? rawMax * 1.18 : 100;

  return (
    <div className={`waterfall-chart-container flex flex-col justify-between w-full ${className}`} style={{ height }}>
      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mb-1 text-[10px] font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-xs bg-emerald-600 inline-block" /> Increase
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-xs bg-rose-600 inline-block" /> Decrease
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-xs bg-slate-800 inline-block" /> Total
        </span>
      </div>

      {/* Waterfall Columns Grid */}
      <div className="flex-1 flex items-end justify-between gap-1 pt-5 pb-1 border-b border-slate-200 relative w-full overflow-hidden">
        {computedSteps.map((step, idx) => {
          const rawBottom = (step.startVal / maxScale) * 100;
          const rawHeight = (step.heightVal / maxScale) * 100;
          const bottomPercent = isFinite(rawBottom) ? Math.max(0, Math.min(rawBottom, 85)) : 0;
          const heightPercent = isFinite(rawHeight) ? Math.max(5, Math.min(rawHeight, 90)) : 5;

          let barColor = "bg-slate-800";
          if (step.type === "increase") barColor = "bg-emerald-600";
          if (step.type === "decrease") barColor = "bg-rose-600";
          if (step.type === "base" || step.type === "total") barColor = "bg-slate-800";

          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end relative min-w-0">
              {/* Floating Value Label */}
              <div
                className="absolute text-[9px] font-bold text-slate-800 tracking-tighter truncate max-w-full text-center px-0.5"
                style={{ bottom: `calc(${bottomPercent + heightPercent}% + 2px)` }}
                title={step.displayValue || String(step.value)}
              >
                {step.displayValue || step.value}
              </div>

              {/* Bar Column */}
              <div className="w-full max-w-[28px] relative h-full flex items-end">
                <div
                  className={`w-full rounded-xs transition-all duration-300 ${barColor}`}
                  style={{
                    height: `${heightPercent}%`,
                    marginBottom: `${bottomPercent}%`,
                  }}
                />
              </div>

              {/* Step Name */}
              <span className="mt-1 text-[9px] font-semibold text-slate-600 truncate w-full text-center tracking-tight">
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
