"use client";

import React from "react";
import { Clock, TrendingUp, TrendingDown, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function FulfilmentEfficiencyStrip() {
  const items = [
    {
      label: "Avg. Allocation Time",
      value: "2h 18m",
      trend: "+12%",
      trendUp: false,
      icon: <Clock size={15} className="text-amber-600" />,
    },
    {
      label: "Avg. Picking Time",
      value: "3h 42m",
      trend: "-8%",
      trendUp: true,
      icon: <Zap size={15} className="text-purple-600" />,
    },
    {
      label: "Avg. Packing Time",
      value: "1h 56m",
      trend: "-5%",
      trendUp: true,
      icon: <Clock size={15} className="text-blue-600" />,
    },
    {
      label: "Same-Day Fulfilment Rate",
      value: "68.7%",
      trend: "+6.2%",
      trendUp: true,
      icon: <TrendingUp size={15} className="text-emerald-600" />,
    },
    {
      label: "Fully Allocated Rate",
      value: "93.4%",
      trend: "+2.8%",
      trendUp: true,
      icon: <CheckCircle2 size={15} className="text-emerald-600" />,
    },
    {
      label: "First-Pass Quality Rate",
      value: "97.1%",
      trend: "+1.4%",
      trendUp: true,
      icon: <ShieldCheck size={15} className="text-emerald-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-3 rounded-xl border border-line shadow-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-md bg-canvas border border-line flex-shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-muted truncate">{item.label}</div>
              <div className="text-sm font-bold text-ink truncate mt-0.5">{item.value}</div>
            </div>
          </div>

          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 flex-shrink-0 ${
            item.trendUp ? "text-emerald-700 bg-emerald-50 border border-emerald-200" : "text-amber-700 bg-amber-50 border border-amber-200"
          }`}>
            {item.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {item.trend}
          </span>
        </div>
      ))}
    </div>
  );
}
