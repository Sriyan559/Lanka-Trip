"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function JourneyTimingAnalysisPanel({
  timing,
}: {
  timing: {
    avgDuration: string;
    median: string;
    waitingNow: string;
    delayed: string;
    waitHealth: string;
  };
}) {
  return (
    <MarketingSectionCard title="Timing & Wait Analysis" className="h-full">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-sans">
        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">AVG JOURNEY DURATION</span>
          <span className="font-extrabold text-gray-900 font-mono text-[10.5px]">{timing.avgDuration}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">MEDIAN</span>
          <span className="font-mono text-gray-700 text-[10px]">{timing.median}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CUSTOMERS WAITING</span>
          <span className="font-mono font-bold text-gray-900 text-[10.5px]">{timing.waitingNow}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CUSTOMERS DELAYED</span>
          <span className="font-mono font-bold text-amber-700 text-[10.5px]">{timing.delayed}</span>
        </div>

        <div className="col-span-2 pt-1 border-t border-gray-100 flex justify-between items-center">
          <span className="text-gray-400 text-[9px] font-bold uppercase">WAIT STEP HEALTH</span>
          <span className="font-bold text-emerald-700 text-[10px]">{timing.waitHealth}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyActiveExceptionsPanel({
  exceptions = [],
}: {
  exceptions: Array<{
    exception: string;
    severity: "Warning" | "Review Required" | "Critical";
    affected: string;
    step: string;
    status: string;
  }>;
}) {
  return (
    <MarketingSectionCard title="Active Journey Exceptions" className="h-full">
      <div className="w-full font-sans text-[10px]">
        {/* CSS Grid Header */}
        <div className="grid grid-cols-[1.1fr_0.8fr_0.6fr_0.8fr_0.6fr] items-center gap-1 bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight py-1 px-1 text-[8.5px]">
          <span className="truncate">EXCEPTION</span>
          <span className="truncate">SEVERITY</span>
          <span className="truncate">AFFECTED</span>
          <span className="truncate">STEP</span>
          <span className="truncate text-right">STATUS</span>
        </div>

        {/* CSS Grid Body Rows */}
        <div className="divide-y divide-gray-100 font-medium text-[10px]">
          {exceptions.map((e) => (
            <div
              key={e.exception}
              className="grid grid-cols-[1.1fr_0.8fr_0.6fr_0.8fr_0.6fr] items-center gap-1 py-1.5 px-1 hover:bg-gray-50/50"
            >
              <span className="font-bold text-gray-900 truncate" title={e.exception}>
                {e.exception}
              </span>
              <span>
                <span
                  className={`text-[8px] font-bold px-1 py-0.2 rounded ${
                    e.severity === "Critical"
                      ? "bg-rose-100 text-rose-800"
                      : e.severity === "Review Required"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {e.severity}
                </span>
              </span>
              <span className="font-mono text-gray-800 text-[9.5px]">
                {e.affected}
              </span>
              <span className="text-gray-600 text-[9px] truncate" title={e.step}>
                {e.step}
              </span>
              <span className="text-right font-bold text-emerald-700 text-[9.5px]">
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}
