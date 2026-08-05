"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface SharedKPI {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  color: string;
  bg: string;
  isWarning?: boolean;
}

export interface SharedKPICardsProps {
  kpis: SharedKPI[];
}

export function SharedKPICards({ kpis }: SharedKPICardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <div key={i} className={`bg-white rounded-xl border p-3.5 shadow-sm flex flex-col justify-between transition-colors hover:border-gray-300 ${kpi.isWarning ? 'border-red-100' : 'border-line'}`}>
             <div className="flex items-start justify-between mb-3">
               <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 border ${kpi.bg}`}>
                 <Icon size={14} className={kpi.color} strokeWidth={2} />
               </div>
               <span className="text-[11px] font-semibold text-ink leading-tight pl-2 text-right">{kpi.label}</span>
             </div>
             <div className="flex items-end justify-between">
               <div className={`text-[22px] font-bold leading-none tracking-tight text-ink`}>
                 {kpi.value}
               </div>
               {kpi.trend && (
                 <div className={`text-[10px] font-bold flex items-center gap-0.5 ${kpi.trendUp ? 'text-[#059669]' : 'text-[#dc2626]'}`}>
                   {kpi.trendUp ? (kpi.trend.includes('%') ? '▲ ' : '') : (kpi.trend.includes('%') ? '▼ ' : '')}{kpi.trend}
                 </div>
               )}
             </div>
          </div>
        );
      })}
    </div>
  );
}
