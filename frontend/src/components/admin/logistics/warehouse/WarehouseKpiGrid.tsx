"use client";

import React from "react";
import { Warehouse, Boxes, Layers, CheckSquare, Send, AlertTriangle } from "lucide-react";

export function WarehouseKpiGrid() {
  const cards = [
    { index: 1, title: "Total Facilities", value: "24", subtitle: "All sites" },
    { index: 2, title: "Active Warehouses", value: "18", subtitle: "75.0%" },
    { index: 3, title: "Active FCs", value: "6", subtitle: "25.0%" },
    { index: 4, title: "High Capacity", value: "5", subtitle: "20.8%", textClass: "text-amber-700" },
    { index: 5, title: "Critical Capacity", value: "2", subtitle: "8.3%", textClass: "text-rose-700 font-bold" },
    { index: 6, title: "Available Storage", value: "24%", subtitle: "1.82M / 7.61M cbft" },
    { index: 7, title: "Orders Assigned", value: "1,248", subtitle: "This period" },
    { index: 8, title: "Picking Queue", value: "126", subtitle: "Orders" },
    { index: 9, title: "Packing Queue", value: "96", subtitle: "Orders" },
    { index: 10, title: "Dispatch Queue", value: "142", subtitle: "Shipments" },
    { index: 11, title: "SLA Breaches", value: "8", subtitle: "This period", textClass: "text-rose-600 font-bold" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2 text-[11px]">
      {cards.map((card) => (
        <div key={card.index} className="bg-white p-2 rounded-xl border border-line shadow-sm flex flex-col justify-between space-y-1 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-bold text-muted bg-canvas border border-line px-1 py-0.2 rounded">
              {card.index}
            </span>
            <span className="text-[10px] font-semibold text-muted leading-tight truncate">
              {card.title}
            </span>
          </div>

          <div className="flex items-end justify-between gap-1 my-0.5">
            <div className={`text-lg font-bold leading-none ${card.textClass || "text-ink"}`}>
              {card.value}
            </div>
          </div>

          <div className="text-[9px] text-muted pt-0.5 border-t border-line/50">
            {card.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WarehouseUtilizationStrip() {
  const metrics = [
    {
      title: "Overall Capacity Utilization",
      percentage: "76%",
      sub: "5.79M / 7.61M cbft",
      barColor: "bg-emerald-600",
      value: 76,
      icon: <Warehouse size={13} className="text-emerald-600" />,
    },
    {
      title: "Inventory Location Utilization",
      percentage: "72%",
      sub: "14,682 / 20,400",
      barColor: "bg-emerald-600",
      value: 72,
      icon: <Boxes size={13} className="text-purple-600" />,
    },
    {
      title: "Picking Capacity Used",
      percentage: "68%",
      sub: "12,240 / 18,000 picks",
      barColor: "bg-blue-600",
      value: 68,
      icon: <Layers size={13} className="text-purple-600" />,
    },
    {
      title: "Packing Capacity Used",
      percentage: "63%",
      sub: "7,560 / 12,000 packs",
      barColor: "bg-blue-600",
      value: 63,
      icon: <CheckSquare size={13} className="text-sky-600" />,
    },
    {
      title: "Dispatch Dock Capacity Used",
      percentage: "71%",
      sub: "32 / 45 doors",
      barColor: "bg-emerald-600",
      value: 71,
      icon: <Send size={13} className="text-blue-600" />,
    },
    {
      title: "Return Receiving Capacity Used",
      percentage: "54%",
      sub: "1,080 / 2,000 units",
      barColor: "bg-amber-500",
      value: 54,
      icon: <AlertTriangle size={13} className="text-amber-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 text-[11px]">
      {metrics.map((item, idx) => (
        <div key={idx} className="bg-white p-2 rounded-xl border border-line shadow-sm space-y-1">
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="p-0.5 rounded bg-canvas border border-line flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-[10px] font-semibold text-muted truncate">{item.title}</span>
            </div>
            <span className="text-xs font-bold text-ink flex-shrink-0">{item.percentage}</span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div className={`h-full rounded-full ${item.barColor}`} style={{ width: `${item.value}%` }} />
          </div>

          <div className="text-[9px] text-muted text-right">{item.sub}</div>
        </div>
      ))}
    </div>
  );
}
