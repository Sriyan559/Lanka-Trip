"use client";

import React from "react";
import { MarketingKpi } from "@/data/marketingCommandCenter.mock";
import {
  Megaphone,
  Users,
  Wallet,
  TrendingUp,
  Target,
  Percent,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Megaphone,
  Users,
  Wallet,
  TrendingUp,
  Target,
  Percent,
};

export function MarketingKpiCard({ kpi }: { kpi: MarketingKpi }) {
  const IconComponent = ICON_MAP[kpi.icon] || Megaphone;

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between min-h-[92px] transition-all hover:border-gray-300">
      {/* Top row: Label & Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          {kpi.label}
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-50/90 border border-rose-100/80 flex items-center justify-center text-[#800020] shrink-0">
          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
        </div>
      </div>

      {/* Main value */}
      <div className="my-1 flex items-baseline justify-between gap-1">
        <span className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          {kpi.value}
        </span>
        {kpi.health === "good" && (
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        )}
      </div>

      {/* Progress bar if present */}
      {typeof kpi.progress === "number" && (
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-1">
          <div
            className="bg-[#800020] h-full rounded-full"
            style={{ width: `${kpi.progress}%` }}
          />
        </div>
      )}

      {/* Footer / Trend / Subtext */}
      <div className="flex items-center justify-between gap-2 text-[11px]">
        {kpi.change && (
          <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
            {kpi.change}
          </span>
        )}
        {kpi.target && (
          <span className="text-gray-500 font-medium">{kpi.target}</span>
        )}
        {kpi.subtext && (
          <span className="text-gray-500 font-medium truncate">
            {kpi.subtext}
          </span>
        )}
      </div>
    </div>
  );
}

export function MarketingKpiStrip({ kpis }: { kpis: MarketingKpi[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
      {kpis.map((kpi) => (
        <MarketingKpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
