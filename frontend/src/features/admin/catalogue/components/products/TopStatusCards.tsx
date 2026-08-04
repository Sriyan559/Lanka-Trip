"use client";

import React from "react";
import { Package, CheckCircle, Clock, FileEdit, FileX, Copy, ImageMinus, ShieldAlert, Link, Archive } from "lucide-react";

export function TopStatusCards() {
  const cards = [
    { label: "Total Product Masters", value: "12,840", trend: "+ 2.4%", trendUp: true, icon: Package },
    { label: "Active Products", value: "10,962", trend: "+ 3.1%", trendUp: true, icon: CheckCircle },
    { label: "Draft Products", value: "486", trend: "- 1.2%", trendUp: false, icon: FileEdit },
    { label: "Pending Approval", value: "312", trend: "- 8.2%", trendUp: false, icon: Clock },
    { label: "Incomplete Records", value: "248", trend: "- 5.6%", trendUp: false, icon: FileX, isWarning: true },
    { label: "Duplicate Risks", value: "36", trend: "+ 1.7%", trendUp: true, icon: Copy, isWarning: true },
    { label: "Missing Required Media", value: "124", trend: "- 2.2%", trendUp: false, icon: ImageMinus, isWarning: true },
    { label: "Compliance Issues", value: "29", trend: "- 7.8%", trendUp: false, icon: ShieldAlert, isWarning: true },
    { label: "Products with Variants", value: "8,920", trend: "+ 4.6%", trendUp: true, icon: Package },
    { label: "Inventory Linked", value: "11,420", trend: "+ 3.9%", trendUp: true, icon: Link },
    { label: "Publication Ready", value: "9,846", trend: "+ 4.2%", trendUp: true, icon: CheckCircle },
    { label: "Archived Products", value: "1,128", trend: "-- 0%", trendUp: false, icon: Archive },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {cards.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <div key={i} className="bg-white rounded-lg border border-line p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} className={kpi.isWarning ? "text-red-500" : "text-muted"} />
              <span className="text-[11px] font-semibold text-muted leading-tight">{kpi.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-xl font-bold text-ink">{kpi.value}</div>
              <div className={`text-[11px] font-bold ${kpi.trend === '-- 0%' ? 'text-slate-400' : kpi.trendUp ? "text-green-600" : "text-red-600"}`}>
                {kpi.trend}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
