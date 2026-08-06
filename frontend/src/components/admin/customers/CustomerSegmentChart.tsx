"use client";

import React from "react";
import { MoreVertical } from "lucide-react";

interface CustomerSegmentChartProps {
  onSegmentClick?: (segment: string) => void;
}

export function CustomerSegmentChart({ onSegmentClick }: CustomerSegmentChartProps) {
  const segments = [
    { label: "New", count: "8,420", pct: "4.5%", color: "bg-amber-500", stroke: "#f59e0b" },
    { label: "Active", count: "142,680", pct: "76.5%", color: "bg-emerald-500", stroke: "#10b981" },
    { label: "Repeat", count: "18,260", pct: "9.8%", color: "bg-sky-500", stroke: "#06b6d4" },
    { label: "Loyalty", count: "84,260", pct: "45.2%", color: "bg-purple-600", stroke: "#9333ea" },
    { label: "High-Value", count: "12,840", pct: "6.9%", color: "bg-amber-600", stroke: "#d97706" },
    { label: "Dormant", count: "18,420", pct: "9.9%", color: "bg-[#671021]", stroke: "#671021" },
    { label: "Restricted", count: "428", pct: "0.2%", color: "bg-rose-600", stroke: "#e11d48" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col justify-between h-full min-w-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
          Customer Segment Distribution
        </h3>
        <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
          <MoreVertical size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4 my-auto">
        {/* Centered Donut SVG */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
            {/* Active (Emerald) */}
            <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="16" strokeDasharray="238" strokeDashoffset="55" fill="transparent" />
            {/* Loyalty (Purple) */}
            <circle cx="50" cy="50" r="38" stroke="#9333ea" strokeWidth="16" strokeDasharray="238" strokeDashoffset="130" fill="transparent" />
            {/* Repeat (Sky) */}
            <circle cx="50" cy="50" r="38" stroke="#06b6d4" strokeWidth="16" strokeDasharray="238" strokeDashoffset="190" fill="transparent" />
            {/* Dormant (Burgundy) */}
            <circle cx="50" cy="50" r="38" stroke="#671021" strokeWidth="16" strokeDasharray="238" strokeDashoffset="215" fill="transparent" />
            {/* New (Amber) */}
            <circle cx="50" cy="50" r="38" stroke="#f59e0b" strokeWidth="16" strokeDasharray="238" strokeDashoffset="230" fill="transparent" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-black text-ink font-mono leading-none">186,420</span>
            <span className="text-[9px] text-muted uppercase font-bold mt-0.5">Total</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-1 text-[10px]">
          {segments.map((seg) => (
            <div
              key={seg.label}
              onClick={() => onSegmentClick?.(seg.label)}
              className="flex items-center justify-between hover:bg-slate-50 p-0.5 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={`w-2 h-2 rounded-full ${seg.color} flex-shrink-0`} />
                <span className="font-semibold text-slate-700 truncate">{seg.label}</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[9.5px]">
                <span className="font-bold text-slate-800">{seg.count}</span>
                <span className="text-slate-400">({seg.pct})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
