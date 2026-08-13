"use client";

import React from "react";

interface SegmentAnalyticsSectionProps {
  totalSegments?: number;
  typeDistribution?: { name: string; value: number }[];
  statusDistribution?: { name: string; value: number }[];
}

export function SegmentAnalyticsSection({
  totalSegments = 0,
  typeDistribution = [],
  statusDistribution = [],
}: SegmentAnalyticsSectionProps) {
  const hasData = totalSegments > 0;

  // Derive dynamic type breakdown percentages from typeDistribution array
  const dynamicCount = typeDistribution.find((t) => t.name === "Dynamic")?.value || 0;
  const staticCount = typeDistribution.find((t) => t.name === "Static Group")?.value || 0;
  const lifecycleCount = typeDistribution.find((t) => t.name === "Lifecycle")?.value || 0;
  const valueCount = typeDistribution.find((t) => t.name === "Value")?.value || 0;
  const loyaltyCount = typeDistribution.find((t) => t.name === "Loyalty")?.value || 0;

  const getPct = (cnt: number) => (totalSegments > 0 ? ((cnt / totalSegments) * 100).toFixed(1) : "0.0");

  const activeCount = statusDistribution.find((s) => s.name === "Active")?.value || 0;
  const draftCount = statusDistribution.find((s) => s.name === "Draft")?.value || 0;
  const pendingCount = statusDistribution.find((s) => s.name === "Pending Approval")?.value || 0;
  const scheduledCount = statusDistribution.find((s) => s.name === "Scheduled")?.value || 0;
  const retiredCount = statusDistribution.find((s) => s.name === "Retired")?.value || 0;
  const errorCount = statusDistribution.find((s) => s.name === "Error / Failed")?.value || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 mb-4">
      {/* 1. Segment Membership Trend (Last 30 Days) - 5 Cols */}
      <div className="lg:col-span-5 bg-white border border-line rounded-lg p-3.5 shadow-2xs flex flex-col justify-between relative min-h-[220px]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
              Segment Membership Trend (Last 30 Days)
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">30D Rolling</span>
          </div>

          {/* SVG Multi-Line Chart */}
          <div className="relative w-full h-[140px] pt-2">
            <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="30" y1="10" x2="390" y2="10" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="35" x2="390" y2="35" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="60" x2="390" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="30" y1="85" x2="390" y2="85" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="5" y="14" className="text-[9px] fill-slate-400 font-mono">100</text>
              <text x="5" y="39" className="text-[9px] fill-slate-400 font-mono">75</text>
              <text x="5" y="64" className="text-[9px] fill-slate-400 font-mono">50</text>
              <text x="5" y="89" className="text-[9px] fill-slate-400 font-mono">0</text>

              {hasData && (
                <>
                  <path d="M 30,20 Q 120,18 200,15 T 390,12" fill="none" stroke="#671021" strokeWidth="2.5" />
                  <path d="M 30,45 Q 120,40 200,35 T 390,30" fill="none" stroke="#059669" strokeWidth="2" />
                  <path d="M 30,75 Q 120,70 200,65 T 390,60" fill="none" stroke="#2563eb" strokeWidth="2" />
                  <path d="M 30,82 Q 120,80 200,78 T 390,75" fill="none" stroke="#ea580c" strokeWidth="2" />
                </>
              )}

              {/* X Axis Dates */}
              <text x="30" y="105" className="text-[8.5px] fill-slate-400 font-mono">Day 1</text>
              <text x="100" y="105" className="text-[8.5px] fill-slate-400 font-mono">Day 7</text>
              <text x="170" y="105" className="text-[8.5px] fill-slate-400 font-mono">Day 14</text>
              <text x="240" y="105" className="text-[8.5px] fill-slate-400 font-mono">Day 21</text>
              <text x="310" y="105" className="text-[8.5px] fill-slate-400 font-mono">Day 28</text>
              <text x="360" y="105" className="text-[8.5px] fill-slate-400 font-mono">Today</text>
            </svg>

            {!hasData && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                <span className="text-[11px] font-bold font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
                  No membership trend data available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-line/60 text-[9.5px] font-bold">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#671021]" />
            <span className="text-slate-700">Total Customers</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="text-slate-700">Active Customers</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-slate-700">New Members</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
            <span className="text-slate-700">Removed Members</span>
          </div>
        </div>
      </div>

      {/* 2. Segment Type Distribution (Donut Chart) - 3.5 Cols */}
      <div className="lg:col-span-4 bg-white border border-line rounded-lg p-3.5 shadow-2xs flex flex-col justify-between relative min-h-[220px]">
        <div>
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
            Segment Type Distribution
          </h4>

          <div className="flex items-center gap-3">
            {/* Donut Circle SVG */}
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-28 h-28 transform -rotate-90">
                <circle cx="50" cy="50" r="38" stroke={hasData ? "#671021" : "#e2e8f0"} strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset={hasData ? "85" : "0"} />
                {hasData && (
                  <>
                    <circle cx="50" cy="50" r="38" stroke="#2563eb" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="170" />
                    <circle cx="50" cy="50" r="38" stroke="#059669" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="200" />
                    <circle cx="50" cy="50" r="38" stroke="#d97706" strokeWidth="14" fill="transparent" strokeDasharray="238" strokeDashoffset="220" />
                  </>
                )}
              </svg>
              <div className="absolute text-center flex flex-col items-center justify-center">
                <span className="text-base font-black text-ink font-mono block leading-none">{totalSegments}</span>
                <span className="text-[8px] font-bold text-slate-400 block uppercase">Total</span>
              </div>
            </div>

            {/* Legend Stats */}
            <div className="space-y-1 text-[10px] flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#671021]" />
                  <span className="text-slate-600 font-medium">Dynamic</span>
                </div>
                <span className="font-bold text-slate-800 font-mono">{dynamicCount} ({getPct(dynamicCount)}%)</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-slate-600 font-medium">Static Group</span>
                </div>
                <span className="font-bold text-slate-800 font-mono">{staticCount} ({getPct(staticCount)}%)</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="text-slate-600 font-medium">Lifecycle</span>
                </div>
                <span className="font-bold text-slate-800 font-mono">{lifecycleCount} ({getPct(lifecycleCount)}%)</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span className="text-slate-600 font-medium">Value</span>
                </div>
                <span className="font-bold text-slate-800 font-mono">{valueCount} ({getPct(valueCount)}%)</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span className="text-slate-600 font-medium">Loyalty</span>
                </div>
                <span className="font-bold text-slate-800 font-mono">{loyaltyCount} ({getPct(loyaltyCount)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <span className="text-[11px] font-bold font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
              No segment type data available
            </span>
          </div>
        )}
      </div>

      {/* 3. Segment Status Summary (Horizontal Bar Chart) - 3.5 Cols */}
      <div className="lg:col-span-3 bg-white border border-line rounded-lg p-3.5 shadow-2xs flex flex-col justify-between min-h-[220px]">
        <div>
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
            Segment Status Summary
          </h4>

          <div className="space-y-2 text-[10px]">
            <div>
              <div className="flex justify-between font-medium mb-0.5">
                <span className="text-slate-600">Active</span>
                <span className="font-bold text-slate-800 font-mono">{activeCount} ({getPct(activeCount)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: getPct(activeCount) + "%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-0.5">
                <span className="text-slate-600">Draft</span>
                <span className="font-bold text-slate-800 font-mono">{draftCount} ({getPct(draftCount)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: getPct(draftCount) + "%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-0.5">
                <span className="text-slate-600">Pending Approval</span>
                <span className="font-bold text-slate-800 font-mono">{pendingCount} ({getPct(pendingCount)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: getPct(pendingCount) + "%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-0.5">
                <span className="text-slate-600">Scheduled</span>
                <span className="font-bold text-slate-800 font-mono">{scheduledCount} ({getPct(scheduledCount)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: getPct(scheduledCount) + "%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-0.5">
                <span className="text-slate-600">Retired</span>
                <span className="font-bold text-slate-800 font-mono">{retiredCount} ({getPct(retiredCount)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: getPct(retiredCount) + "%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-0.5">
                <span className="text-slate-600">Error / Failed</span>
                <span className="font-bold text-slate-800 font-mono">{errorCount} ({getPct(errorCount)}%)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-600 rounded-full" style={{ width: getPct(errorCount) + "%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
