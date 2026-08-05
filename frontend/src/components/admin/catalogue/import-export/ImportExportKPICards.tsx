"use client";

import React from "react";
import { Activity, CheckCircle2, Clock, XCircle, AlertTriangle, Timer } from "lucide-react";

export function ImportExportKPICards() {
  const KPIS = [
    { label: "Active Jobs", value: "12", trend: "Running", trendUp: true, icon: Activity, color: "text-[#2563eb]", bg: "bg-blue-50 border-blue-100" },
    { label: "Completed Today", value: "48", trend: "+12.4%", trendUp: true, icon: CheckCircle2, color: "text-[#059669]", bg: "bg-green-50 border-green-100" },
    { label: "Scheduled Jobs", value: "24", trend: "Upcoming", trendUp: true, icon: Clock, color: "text-slate-500", bg: "bg-slate-50 border-line" },
    { label: "Failed Jobs", value: "3", trend: "-2.1%", trendUp: false, icon: XCircle, color: "text-[#dc2626]", bg: "bg-red-50 border-red-100", isWarning: true },
    { label: "Validation Errors", value: "14", trend: "+4.5%", trendUp: false, icon: AlertTriangle, color: "text-[#ea580c]", bg: "bg-orange-50 border-orange-100", isWarning: true },
    { label: "Avg Processing Time", value: "2.4m", trend: "-12s", trendUp: true, icon: Timer, color: "text-[#741d35]", bg: "bg-pink-50 border-pink-100" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
      {KPIS.map((kpi, i) => {
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
