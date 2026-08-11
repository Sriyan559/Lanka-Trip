"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { ChevronRight } from "lucide-react";

export function AudienceSuppressionsPanel({
  suppressions,
}: {
  suppressions: {
    total: string;
    reasons: Array<{ reason: string; count: string; percentage: number }>;
  };
}) {
  return (
    <MarketingSectionCard
      title="Suppressions"
      headerActions={
        <div className="flex items-center gap-1">
          <span className="font-extrabold text-[#800020] text-xs font-mono">{suppressions.total}</span>
          <button className="text-[10px] font-bold text-amber-700 hover:underline inline-flex items-center">
            <span>Review Suppressions</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      }
      className="h-full"
    >
      <div className="flex flex-col gap-1 text-xs font-sans">
        <span className="text-gray-400 font-bold uppercase text-[8.5px] tracking-tight mb-0.5">
          5.41% vs previous recalculation
        </span>
        {suppressions.reasons.map((item) => (
          <div key={item.reason} className="flex items-center justify-between text-[10.5px]">
            <span className="text-gray-700 font-medium truncate flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-rose-500 shrink-0" />
              {item.reason}
            </span>
            <span className="font-mono text-gray-900 font-semibold">
              {item.count} <span className="text-gray-400 text-[9.5px]">({item.percentage}%)</span>
            </span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
