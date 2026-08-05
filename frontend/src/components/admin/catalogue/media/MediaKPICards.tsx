"use client";

import React from "react";
import { Image, Video, HardDrive, FileWarning, Globe, ShieldAlert } from "lucide-react";

export function MediaKPICards() {
  const KPIS = [
    { label: "Total Assets", value: "284,912", trend: "3.2%", trendUp: true, icon: Image, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Storage Used", value: "8.4 TB", trend: "1.1%", trendUp: true, icon: HardDrive, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Missing Mandatory", value: "1,204", trend: "4.1%", trendUp: false, icon: FileWarning, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Unmapped Swatches", value: "482", trend: "8.3%", trendUp: false, icon: ShieldAlert, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "Orphaned Media", value: "3,142", trend: "2.4%", trendUp: false, icon: FileWarning, color: "text-[#ea580c]", bg: "bg-orange-50", isWarning: true },
    { label: "CDN Cache Hit", value: "98.8%", trend: "0.2%", trendUp: true, icon: Globe, color: "text-[#059669]", bg: "bg-green-50" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
      {KPIS.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <div key={i} className="bg-white rounded-xl border border-line p-3.5 shadow-sm flex flex-col justify-between">
             <div className="flex items-start justify-between mb-3">
               <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${kpi.bg}`}>
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
                   {kpi.trendUp ? '▲' : '▼'} {kpi.trend}
                 </div>
               )}
             </div>
          </div>
        );
      })}
    </div>
  );
}
