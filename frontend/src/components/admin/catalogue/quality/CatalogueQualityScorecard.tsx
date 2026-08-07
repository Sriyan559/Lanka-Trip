"use client";

import React from "react";
import { MOCK_SCORECARD_METRICS } from "@/data/catalogueQuality.mock";

export function CatalogueQualityScorecard() {
  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm mb-4">
      <h3 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2.5">
        Catalogue Quality Scorecard
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 items-stretch">
        {MOCK_SCORECARD_METRICS.map((metric) => (
          <div key={metric.label} className="flex flex-col justify-between">
            <span className="text-[10px] font-medium text-slate-600 truncate mb-1" title={metric.label}>
              {metric.label}
            </span>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[14px] font-black text-ink font-mono">{metric.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  metric.colorState === "green"
                    ? "bg-emerald-500"
                    : metric.colorState === "orange"
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
}
