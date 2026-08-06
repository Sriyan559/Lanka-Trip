"use client";

import React from "react";
import { 
  FolderCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  ImageDown, 
  Copy, 
  Link2Off, 
  EyeOff, 
  CalendarX, 
  Globe2, 
  Archive 
} from "lucide-react";

interface KpiProps {
  onFilterClick: (type: string, value: string) => void;
}

export function MediaKpiGrid({ onFilterClick }: KpiProps) {
  const kpiData = [
    {
      id: "total",
      label: "Total Media Assets",
      value: "48,620",
      trend: "2.4%",
      isUp: true,
      icon: FolderCheck,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-50 border-sky-200",
      filterType: "tab",
      filterValue: "All Assets",
    },
    {
      id: "active",
      label: "Active Assets",
      value: "46,910",
      trend: "3.1%",
      isUp: true,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border-emerald-200",
      filterType: "approvalStatus",
      filterValue: "Approved",
    },
    {
      id: "approved",
      label: "Approved Assets",
      value: "42,884",
      trend: "2.8%",
      isUp: true,
      icon: ShieldCheck,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border-emerald-200",
      filterType: "approvalStatus",
      filterValue: "Approved",
    },
    {
      id: "pending",
      label: "Pending Approval",
      value: "286",
      trend: "6.7%",
      isUp: false,
      icon: Clock,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-200",
      filterType: "tab",
      filterValue: "Pending Approval",
    },
    {
      id: "mandatory",
      label: "Missing Mandatory Media",
      value: "124",
      trend: "2.2%",
      isUp: true,
      icon: AlertTriangle,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 border-rose-200",
      filterType: "chip",
      filterValue: "Missing Mandatory",
    },
    {
      id: "lowres",
      label: "Low-Resolution Assets",
      value: "46",
      trend: "12.0%",
      isUp: false,
      icon: ImageDown,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-200",
      filterType: "chip",
      filterValue: "Low Resolution",
    },
    // Row 2
    {
      id: "duplicates",
      label: "Duplicate Media Risks",
      value: "38",
      trend: "8.9%",
      isUp: false,
      icon: Copy,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 border-rose-200",
      filterType: "chip",
      filterValue: "Duplicate Risk",
    },
    {
      id: "unlinked",
      label: "Unlinked Assets",
      value: "92",
      trend: "5.2%",
      isUp: false,
      icon: Link2Off,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-200",
      filterType: "chip",
      filterValue: "Unlinked",
    },
    {
      id: "alttext",
      label: "Missing Alt Text",
      value: "214",
      trend: "3.6%",
      isUp: false,
      icon: EyeOff,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-200",
      filterType: "chip",
      filterValue: "Missing Alt Text",
    },
    {
      id: "rights",
      label: "Usage Rights Expiring",
      value: "17",
      trend: "15.0%",
      isUp: false,
      icon: CalendarX,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 border-rose-200",
      filterType: "chip",
      filterValue: "Rights Expiring",
    },
    {
      id: "channels",
      label: "Channel Compatibility Issues",
      value: "54",
      trend: "7.1%",
      isUp: false,
      icon: Globe2,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-200",
      filterType: "tab",
      filterValue: "Quality Issues",
    },
    {
      id: "archived",
      label: "Archived Assets",
      value: "1,128",
      trend: "1.9%",
      isUp: true,
      icon: Archive,
      iconColor: "text-slate-500",
      iconBg: "bg-slate-100 border-slate-200",
      filterType: "tab",
      filterValue: "Archived",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-5">
      {kpiData.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <button
            key={kpi.id}
            onClick={() => onFilterClick(kpi.filterType, kpi.filterValue)}
            className="bg-white rounded-lg border border-line p-3 flex flex-col justify-between text-left hover:border-slate-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#671021]/30 group"
          >
            <div className="flex items-start justify-between gap-2 mb-2 w-full">
              <div className={`w-7 h-7 rounded-md border flex items-center justify-center flex-shrink-0 ${kpi.iconBg}`}>
                <IconComponent size={14} className={kpi.iconColor} />
              </div>
              <span className="text-[11px] font-medium text-slate-500 leading-tight text-right line-clamp-2 group-hover:text-ink">
                {kpi.label}
              </span>
            </div>

            <div className="flex items-baseline justify-between w-full mt-1">
              <span className="text-xl font-extrabold text-ink tracking-tight">
                {kpi.value}
              </span>
              <span className={`text-[10px] font-bold flex items-center gap-0.5 ${kpi.isUp ? "text-emerald-600" : "text-rose-600"}`}>
                {kpi.isUp ? "▲" : "▼"} {kpi.trend}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
