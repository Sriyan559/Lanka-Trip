"use client";

import React from "react";
import { Activity, LayoutList, AlertTriangle, Copy, ShieldAlert, Ban, FileX, ImageMinus, FilterX, CheckCircle, Clock } from "lucide-react";

export function QualityKPICards() {
  const KPIS = [
    { label: "Overall Quality Score", value: "89", suffix: "/ 100", trend: "1.8%", trendUp: true, isScore: true },
    { label: "Open Quality Issues", value: "1,248", trend: "", trendUp: null, icon: LayoutList, color: "text-[#0284c7]", bg: "bg-blue-50" },
    { label: "Critical Issues", value: "42", trend: "", trendUp: null, icon: AlertTriangle, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Duplicate Product Candidates", value: "186", trend: "", trendUp: null, icon: Copy, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Duplicate SKU Conflicts", value: "58", trend: "", trendUp: null, icon: Copy, color: "text-[#ea580c]", bg: "bg-orange-50" },
    { label: "Duplicate Barcode Conflicts", value: "24", trend: "", trendUp: null, icon: Copy, color: "text-[#059669]", bg: "bg-green-50" },
    
    { label: "Incomplete Product Records", value: "248", trend: "", trendUp: null, icon: FileX, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Missing Mandatory Media", value: "124", trend: "", trendUp: null, icon: ImageMinus, color: "text-[#ea580c]", bg: "bg-orange-50" },
    { label: "Classification Conflicts", value: "36", trend: "", trendUp: null, icon: FilterX, color: "text-[#0284c7]", bg: "bg-blue-50" },
    { label: "Publication Blockers", value: "28", trend: "", trendUp: null, icon: Ban, color: "text-[#dc2626]", bg: "bg-red-50", isWarning: true },
    { label: "Resolved This Month", value: "842", trend: "", trendUp: null, icon: CheckCircle, color: "text-[#059669]", bg: "bg-green-50" },
    { label: "Resolution SLA Breaches", value: "17", trend: "", trendUp: null, icon: Clock, color: "text-[#8b5cf6]", bg: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {KPIS.map((kpi, i) => {
        if (kpi.isScore) {
          return (
            <div key={i} className="bg-white rounded-xl border border-line p-3.5 shadow-sm relative overflow-hidden flex flex-col justify-between">
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-6 h-6 rounded-full border-2 border-[#059669] flex items-center justify-center text-[#059669]">
                   <Activity size={12} strokeWidth={3} />
                 </div>
                 <span className="text-[11px] font-semibold text-ink">{kpi.label}</span>
               </div>
               <div className="flex items-end justify-between">
                 <div className="flex items-baseline gap-1">
                   <div className="text-[24px] font-bold text-ink leading-none">{kpi.value}</div>
                   <div className="text-[10px] font-semibold text-muted">{kpi.suffix}</div>
                 </div>
                 <div className="text-[10px] font-bold text-[#059669] flex items-center gap-0.5">
                   ▲ {kpi.trend}
                 </div>
               </div>
            </div>
          );
        }

        const Icon = kpi.icon!;
        return (
          <div key={i} className="bg-white rounded-xl border border-line p-3.5 shadow-sm flex flex-col justify-between">
             <div className="flex items-start justify-between mb-3">
               <span className="text-[11px] font-semibold text-ink leading-tight pr-4">{kpi.label}</span>
               <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${kpi.bg}`}>
                 <Icon size={14} className={kpi.color} strokeWidth={kpi.isWarning ? 2.5 : 2} />
               </div>
             </div>
             <div className="flex items-end justify-between">
               <div className={`text-[22px] font-bold leading-none tracking-tight ${kpi.isWarning ? 'text-[#dc2626]' : 'text-ink'}`}>
                 {kpi.value}
               </div>
             </div>
          </div>
        );
      })}
    </div>
  );
}
