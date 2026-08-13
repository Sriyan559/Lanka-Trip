"use client";

import React from "react";

export interface SensitivityItem {
  label: string;
  value: number; // e.g. 20.8 or -15.2
  displayValue: string; // e.g. "+20.8%"
  color?: string;
}

interface SensitivityChartProps {
  data: SensitivityItem[];
  minDomain?: number; // e.g. -35
  maxDomain?: number; // e.g. 35
  height?: number;
  className?: string;
}

export function SensitivityChart({
  data = [],
  minDomain = -35,
  maxDomain = 35,
  height = 200,
  className = "",
}: SensitivityChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className={`w-full flex items-center justify-center text-xs text-slate-400 font-medium ${className}`}
        style={{ minHeight: height }}
      >
        No sensitivity data available
      </div>
    );
  }

  const range = maxDomain - minDomain;
  // Calculate zero line position as percentage from left
  const zeroPosPercent = ((0 - minDomain) / range) * 100; // e.g. 50%

  // X-axis ticks to display at bottom
  const ticks = [-30, -20, -10, 0, 10, 20, 30];

  return (
    <div
      className={`w-full min-w-0 flex flex-col justify-between text-xs py-1 ${className}`}
      style={{ minHeight: height }}
    >
      {/* Diverging Bars Container */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-center my-auto">
        {data.map((item, idx) => {
          const val = item.value;
          const isPositive = val >= 0;
          const barWidthPercent = (Math.abs(val) / range) * 100;
          const barColor =
            item.color || (isPositive ? "#2563eb" : "#f97316");

          // Compute left position
          const leftPercent = isPositive
            ? zeroPosPercent
            : zeroPosPercent - barWidthPercent;

          return (
            <div key={idx} className="grid grid-cols-[105px_minmax(0,1fr)] items-center gap-2">
              {/* Row Label */}
              <span className="text-[10px] font-bold text-slate-700 text-right truncate">
                {item.label}
              </span>

              {/* Bar Plot Area with Centered 0 Axis Line */}
              <div className="relative h-4 w-full bg-slate-50/60 rounded-xs flex items-center overflow-visible">
                {/* Vertical Zero Axis Line */}
                <div
                  className="absolute top-0 bottom-0 w-[1px] bg-slate-300 z-10"
                  style={{ left: `${zeroPosPercent}%` }}
                />

                {/* Filled Impact Bar */}
                <div
                  className={`absolute h-2.5 transition-all duration-300 ${
                    isPositive ? "rounded-r-xs" : "rounded-l-xs"
                  }`}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${barWidthPercent}%`,
                    backgroundColor: barColor,
                  }}
                />

                {/* Inline Value Label */}
                {isPositive ? (
                  <span
                    className="absolute text-[9.5px] font-extrabold tabular-nums whitespace-nowrap text-blue-600"
                    style={{ left: `calc(${leftPercent + barWidthPercent}% + 5px)` }}
                  >
                    {item.displayValue}
                  </span>
                ) : (
                  <span
                    className="absolute text-[9.5px] font-extrabold tabular-nums whitespace-nowrap"
                    style={{
                      right: `calc(${100 - leftPercent}% + 5px)`,
                      color: barColor,
                    }}
                  >
                    {item.displayValue}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom X-Axis Ticks */}
      <div className="grid grid-cols-[105px_minmax(0,1fr)] items-center gap-2 pt-2 border-t border-slate-100 mt-1">
        <div />
        <div className="relative w-full h-4 text-[9px] font-bold text-slate-500">
          {ticks.map((t) => {
            const pos = ((t - minDomain) / range) * 100;
            return (
              <span
                key={t}
                className="absolute -translate-x-1/2"
                style={{ left: `${pos}%` }}
              >
                {t > 0 ? `${t}%` : t === 0 ? "0%" : `${t}%`}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
