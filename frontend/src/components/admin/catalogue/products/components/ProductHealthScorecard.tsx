"use client";

import React from "react";
import { Info, ChevronRight } from "lucide-react";
import type { ProductHealthScorecardMetric } from "@/types/productMaster";

export const ProductHealthScorecard: React.FC<{ metrics: ProductHealthScorecardMetric[] }> = ({ metrics }) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xs font-bold text-gray-900">Product Master Health Scorecard</h2>
          <span title="Systemwide quality metrics across all master product records">
            <Info size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          </span>
        </div>
        <button className="text-[11px] font-semibold text-[#741d35] hover:underline flex items-center gap-0.5">
          <span>View full scorecard</span>
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {metrics.map((metric, idx) => (
          <div key={idx} title={metric.tooltipText} className="flex flex-col gap-1.5 p-2 rounded bg-gray-50/70 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-semibold text-gray-600 truncate">{metric.label}</span>
              <span className="text-[11px] font-bold text-gray-900">{metric.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  metric.status === "good"
                    ? "bg-emerald-500"
                    : metric.status === "warning"
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${metric.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
