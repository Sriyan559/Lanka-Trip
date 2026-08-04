"use client";

import React from "react";
import { Package, CheckCircle, Clock, FileEdit, FileX, Copy, ImageMinus, ShieldAlert, Boxes, TrendingDown, CalendarClock, AlertTriangle } from "lucide-react";

const KPIS = [
  { id: 1, label: "Total Product Masters", value: "12,840", trend: "+ 2.4%", trendUp: true, icon: Package },
  { id: 2, label: "Active Products", value: "10,962", trend: "+ 3.1%", trendUp: true, icon: CheckCircle },
  { id: 3, label: "Pending Approval", value: "312", trend: "- 8.2%", trendUp: false, icon: Clock },
  { id: 4, label: "Draft Products", value: "486", trend: "- 1.3%", trendUp: false, icon: FileEdit },
  { id: 5, label: "Incomplete Records", value: "248", trend: "- 5.6%", trendUp: false, icon: FileX, isWarning: true },
  { id: 6, label: "Duplicate Risks", value: "36", trend: "+ 1.7%", trendUp: true, icon: Copy, isWarning: true },
  { id: 7, label: "Missing Media", value: "124", trend: "- 2.2%", trendUp: false, icon: ImageMinus },
  { id: 8, label: "Compliance Issues", value: "29", trend: "- 7.8%", trendUp: false, icon: ShieldAlert, isWarning: true },
  { id: 9, label: "Available Inventory", value: "184,620", trend: "+ 4.6%", trendUp: true, icon: Boxes, suffix: " units" },
  { id: 10, label: "Low-Stock Products", value: "318", trend: "+ 2.9%", trendUp: true, icon: TrendingDown },
  { id: 11, label: "Near-Expiry Batches", value: "42", trend: "+ 12.3%", trendUp: true, icon: CalendarClock },
  { id: 12, label: "Recalled or Quarantined", value: "14", trend: "- 3.4%", trendUp: false, icon: AlertTriangle, isWarning: true },
];

export function TopKPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.id} className="bg-white rounded-lg border border-line p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-muted text-[11px] font-semibold">{kpi.id}</span>
                <span className="text-[12px] font-medium text-muted">{kpi.label}</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-1">
              <div className="flex items-center gap-2">
                <Icon size={16} className={kpi.isWarning ? "text-red-500" : "text-muted"} />
                <div className="text-xl font-bold text-ink">
                  {kpi.value}
                  {kpi.suffix && <span className="text-[12px] font-medium text-muted ml-1">{kpi.suffix}</span>}
                </div>
              </div>
              <div className={`text-[11px] font-bold ${kpi.trendUp ? "text-green-600" : "text-red-600"}`}>
                {kpi.trend}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
