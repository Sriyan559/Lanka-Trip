"use client";

import React from "react";
import { MoreVertical } from "lucide-react";

interface CustomerStatusSummaryProps {
  onStatusClick?: (status: string) => void;
}

export function CustomerStatusSummary({ onStatusClick }: CustomerStatusSummaryProps) {
  const statuses = [
    { label: "Active", count: 142680, display: "142,680", pct: 76.5, color: "bg-emerald-600" },
    { label: "Verification Pending", count: 6240, display: "6,240", pct: 3.3, color: "bg-amber-500" },
    { label: "Dormant", count: 18420, display: "18,420", pct: 9.9, color: "bg-[#671021]" },
    { label: "Restricted", count: 428, display: "428", pct: 0.2, color: "bg-rose-600" },
    { label: "Cases", count: 1248, display: "1,248", pct: 0.7, color: "bg-purple-600" },
    { label: "Returns", count: 842, display: "842", pct: 0.5, color: "bg-sky-600" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col justify-between h-full min-w-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
          Customer Status Summary
        </h3>
        <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
          <MoreVertical size={14} />
        </button>
      </div>

      <div className="space-y-2.5 my-auto text-[11px]">
        {statuses.map((item) => (
          <div
            key={item.label}
            onClick={() => onStatusClick?.(item.label)}
            className="cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
          >
            <div className="flex justify-between items-center mb-1 text-[10px]">
              <span className="font-semibold text-slate-700">{item.label}</span>
              <span className="font-bold font-mono text-slate-800">{item.display}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${Math.max(item.pct, 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[9px] font-mono text-slate-400 pt-2 border-t border-line">
        <span>0</span>
        <span>50K</span>
        <span>100K</span>
        <span>150K</span>
      </div>
    </div>
  );
}
