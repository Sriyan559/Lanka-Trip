"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

export function CustomerGrowthChart() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  // Dates matching reference image CU01: Apr 27, May 1, May 5, May 9, May 13, May 17, May 21, May 25
  const dates = ["Apr 27", "May 1", "May 5", "May 9", "May 13", "May 17", "May 21", "May 25"];

  return (
    <div className="bg-white border border-line rounded-lg p-4 shadow-sm flex flex-col justify-between h-full min-w-0">
      {/* Header & Controls */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider font-mono">
            Customer Growth & Activity Trend
          </h3>
          <span className="text-[10px] text-muted font-mono">
            Daily active vs new vs verified network growth
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-7 px-2 text-[10px] font-semibold border border-line rounded bg-slate-50 text-slate-700 focus:outline-none"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="This Quarter">This Quarter</option>
          </select>
          <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      {/* Series Legend */}
      <div className="flex items-center gap-4 text-[10px] font-semibold mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="text-slate-700">Total Customers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span className="text-slate-700">Active Customers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-slate-700">New Customers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
          <span className="text-slate-700">Verified Customers</span>
        </div>
      </div>

      {/* SVG Multi-Series Chart */}
      <div className="w-full h-44 relative flex flex-col justify-between pt-2 pb-1">
        {/* Y Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[8.5px] font-mono text-slate-400">
          <div className="border-b border-dashed border-slate-200 pl-1">200K</div>
          <div className="border-b border-dashed border-slate-200 pl-1">150K</div>
          <div className="border-b border-dashed border-slate-200 pl-1">100K</div>
          <div className="border-b border-dashed border-slate-200 pl-1">50K</div>
          <div className="pl-1">0</div>
        </div>

        {/* Chart SVG */}
        <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 400 130" preserveAspectRatio="none">
          {/* Total Customers (Blue) */}
          <path
            d="M 10 35 Q 60 32, 110 30 T 210 25 T 310 20 T 390 15"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
          {/* Active Customers (Green) */}
          <path
            d="M 10 58 Q 60 55, 110 52 T 210 48 T 310 44 T 390 40"
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
          />
          {/* Verified Customers (Purple) */}
          <path
            d="M 10 70 Q 60 68, 110 65 T 210 60 T 310 56 T 390 52"
            fill="none"
            stroke="#9333ea"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          {/* New Customers (Amber) */}
          <path
            d="M 10 115 Q 60 112, 110 110 T 210 108 T 310 105 T 390 102"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
          />

          {/* Dots */}
          <circle cx="390" cy="15" r="3.5" fill="#2563eb" />
          <circle cx="390" cy="40" r="3.5" fill="#059669" />
          <circle cx="390" cy="52" r="3.5" fill="#9333ea" />
          <circle cx="390" cy="102" r="3.5" fill="#d97706" />
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-slate-200">
          {dates.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
