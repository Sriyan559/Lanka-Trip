"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function JourneyStepPerformancePanel({
  steps = [],
}: {
  steps: Array<{
    step: string;
    type: string;
    entered: string;
    completed: string;
    dropOff: string;
    conversion: string;
    avgTime: string;
    deliveryHealth: string;
  }>;
}) {
  return (
    <MarketingSectionCard title="Step Performance" className="h-full">
      <div className="w-full font-sans text-[10px]">
        {/* Table Header Row using CSS Grid */}
        <div className="grid grid-cols-[1.1fr_0.6fr_0.6fr_0.6fr_0.6fr_0.6fr_0.6fr] items-center gap-1 bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight py-1 px-1 text-[8.5px]">
          <span className="truncate">STEP</span>
          <span className="truncate">TYPE</span>
          <span className="truncate">ENTERED</span>
          <span className="truncate">COMPLETED</span>
          <span className="truncate">DROP-OFF</span>
          <span className="truncate">CONVERSION</span>
          <span className="truncate text-right">AVG TIME</span>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-gray-100 font-medium text-[10px]">
          {steps.map((s) => (
            <div
              key={s.step}
              className="grid grid-cols-[1.1fr_0.6fr_0.6fr_0.6fr_0.6fr_0.6fr_0.6fr] items-center gap-1 py-1.5 px-1 hover:bg-gray-50/50"
            >
              <span className="font-bold text-gray-900 truncate" title={s.step}>
                {s.step}
              </span>
              <span className="text-gray-500 text-[9px] truncate">
                {s.type}
              </span>
              <span className="font-mono text-gray-800 text-[9.5px]">
                {s.entered}
              </span>
              <span className="font-mono text-gray-800 text-[9.5px]">
                {s.completed}
              </span>
              <span className="font-mono text-rose-600 font-bold text-[9.5px]">
                {s.dropOff}
              </span>
              <span className="font-mono font-bold text-emerald-700 text-[9.5px]">
                {s.conversion}
              </span>
              <span className="text-right font-mono text-gray-600 text-[9px]">
                {s.avgTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}
