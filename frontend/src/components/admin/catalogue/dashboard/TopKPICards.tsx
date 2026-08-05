"use client";

import React from "react";
import { Package, CheckCircle, Clock, FileEdit, FileX, Copy, ImageMinus, ShieldAlert, Boxes, TrendingDown, CalendarClock, AlertTriangle, ArrowUp, ArrowDown, Triangle, Hourglass } from "lucide-react";

export function TopKPICards() {
  const KPIS = [
    { label: "Total Product Masters", value: "12,840", trend: "2.4%", trendUp: true, isPositive: true, icon: Package },
    { label: "Active Products", value: "10,962", trend: "3.1%", trendUp: true, isPositive: true, icon: CheckCircle },
    { label: "Pending Approval", value: "312", trend: "8.2%", trendUp: false, isPositive: false, icon: Hourglass, isWarning: true },
    { label: "Draft Products", value: "486", trend: "1.3%", trendUp: false, isPositive: false, icon: FileEdit },
    { label: "Incomplete Records", value: "248", trend: "5.6%", trendUp: false, isPositive: false, icon: AlertTriangle, isWarning: true },
    { label: "Duplicate Risks", value: "36", trend: "1.7%", trendUp: true, isPositive: false, icon: Copy, isWarning: true },
    { label: "Missing Mandatory Media", value: "124", trend: "2.2%", trendUp: false, isPositive: false, icon: ImageMinus, isWarning: true },
    { label: "Compliance Issues", value: "29", trend: "7.8%", trendUp: false, isPositive: false, icon: ShieldAlert, isWarning: true },
    { label: "Available Inventory", value: "184,620", trend: "4.6%", trendUp: true, isPositive: true, icon: Boxes, suffix: " units" },
    { label: "Low-Stock Products", value: "318", trend: "2.9%", trendUp: true, isPositive: false, icon: TrendingDown, isWarning: true },
    { label: "Near-Expiry Batches", value: "42", trend: "12.3%", trendUp: true, isPositive: false, icon: CalendarClock, isWarning: true },
    { label: "Recalled or Quarantined", value: "14", trend: "3.4%", trendUp: false, isPositive: false, icon: AlertTriangle, isWarning: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {KPIS.map((kpi, i) => {
        const Icon = kpi.icon;
        const trendColor = kpi.trendUp === null ? "text-slate-400" : kpi.trendUp ? "text-green-600" : "text-red-600";
        return (
          <div key={i} className="bg-white rounded-lg border border-line p-3.5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center gap-1.5 mb-3">
              {kpi.trendUp === true && <ArrowUp size={12} className={trendColor} strokeWidth={3} />}
              {kpi.trendUp === false && <ArrowDown size={12} className={trendColor} strokeWidth={3} />}
              {kpi.trendUp === null && <div className="w-3" />}
              <span className="text-[11px] font-semibold text-ink">{kpi.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-2">
                <div className="text-[20px] font-bold text-ink leading-none tracking-tight">
                  {kpi.value}
                  {kpi.suffix && <span className="text-[10px] font-medium text-muted ml-1 tracking-normal">{kpi.suffix}</span>}
                </div>
                <div className={`text-[10px] font-bold flex items-center gap-0.5 ${trendColor}`}>
                  {kpi.trendUp === true && <Triangle size={8} className="fill-current" />}
                  {kpi.trendUp === false && <Triangle size={8} className="fill-current rotate-180" />}
                  {kpi.trendUp === null && <span>-</span>}
                  {kpi.trendUp !== null && kpi.trend}
                </div>
              </div>
              <div className={`opacity-80 ${kpi.isWarning ? "text-red-600" : "text-[#741d35]"}`}>
                <Icon size={18} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
