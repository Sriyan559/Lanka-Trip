"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function FacilityDetailKpis() {
  const cards = [
    { index: 1, title: "Overall Capacity Used", value: "76%", trend: "+4.2%", isUp: true },
    { index: 2, title: "Available Capacity", value: "24%", trend: "-4.2%", isUp: false },
    { index: 3, title: "Inventory Locations Used", value: "72%", trend: "+3.0%", isUp: true },
    { index: 4, title: "Active SKUs", value: "7,842", trend: "+6.1%", isUp: true },
    { index: 5, title: "Inventory Units On Hand", value: "1.62M", trend: "+5.4%", isUp: true },
    { index: 6, title: "Orders Assigned", value: "312", trend: "+8.3%", isUp: true },
    { index: 7, title: "Picking Queue", value: "126", trend: "+6.7%", isUp: true },
    { index: 8, title: "Packing Queue", value: "96", trend: "+4.3%", isUp: true },
    { index: 9, title: "Dispatch Queue", value: "142", trend: "+7.9%", isUp: true },
    { index: 10, title: "Transfers Pending", value: "38", trend: "+5.6%", isUp: true },
    { index: 11, title: "Returns Pending Receipt", value: "23", trend: "+3.1%", isUp: true },
    { index: 12, title: "Facility SLA Score", value: "94%", trend: "+3.2%", isUp: true, textClass: "text-emerald-700 font-bold" },
  ];

  const secondaryMetrics = [
    { label: "Picking Capacity Used", pct: "68%", barColor: "bg-blue-600", val: 68 },
    { label: "Packing Capacity Used", pct: "63%", barColor: "bg-sky-600", val: 63 },
    { label: "Dispatch Dock Capacity Used", pct: "71%", barColor: "bg-indigo-600", val: 71 },
    { label: "Return Receiving Capacity Used", pct: "54%", barColor: "bg-amber-500", val: 54 },
    { label: "Pick Accuracy", pct: "98.3%", isStat: true },
    { label: "Pack Accuracy", pct: "97.6%", isStat: true },
    { label: "Inventory Location Accuracy", pct: "99.1%", isStat: true },
    { label: "Fulfilment Throughput Today", pct: "1,248 Orders", isStat: true, isBold: true },
  ];

  return (
    <div className="space-y-2">
      {/* 12 KPI CARDS IN 1 DESKTOP ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 text-[10px]">
        {cards.map((card) => (
          <div key={card.index} className="bg-white p-2 rounded-xl border border-line shadow-sm flex flex-col justify-between space-y-1 hover:border-slate-300 transition-all">
            <span className="text-[10px] font-semibold text-muted leading-tight truncate">
              {card.title}
            </span>

            <div className={`text-base font-bold leading-none ${card.textClass || "text-ink"}`}>
              {card.value}
            </div>

            <div className="flex items-center gap-1 text-[9px] font-semibold pt-0.5 border-t border-line/50">
              {card.isUp ? (
                <span className="text-emerald-700 flex items-center gap-0.5"><TrendingUp size={10} /> {card.trend}</span>
              ) : (
                <span className="text-rose-700 flex items-center gap-0.5"><TrendingDown size={10} /> {card.trend}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SECONDARY METRICS STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-[10px]">
        {secondaryMetrics.map((sm, i) => (
          <div key={i} className="bg-white p-2 rounded-xl border border-line shadow-sm space-y-1">
            <span className="text-[9px] font-semibold text-muted truncate block">{sm.label}</span>
            <div className="text-xs font-bold text-ink">{sm.pct}</div>
            {!sm.isStat && sm.val !== undefined && (
              <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                <div className={`h-full rounded-full ${sm.barColor}`} style={{ width: `${sm.val}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
