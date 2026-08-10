"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line } from "recharts";

export function AllocationKpiGrid() {
  const cards = [
    { title: "Allocation Requests", value: "1,248", data: [40, 50, 45, 60, 55, 70, 65] },
    { title: "Fully Allocated", value: "1,078", data: [35, 45, 40, 55, 50, 65, 60], stroke: "#10b981" },
    { title: "Partially Allocated", value: "84", data: [5, 8, 6, 7, 9, 8, 10], textClass: "text-amber-700 font-bold", stroke: "#f59e0b" },
    { title: "Allocation Pending", value: "42", data: [10, 8, 6, 5, 4, 5, 4], stroke: "#3b82f6" },
    { title: "Allocation Failed", value: "18", data: [2, 4, 3, 5, 2, 4, 3], textClass: "text-rose-700 font-bold", stroke: "#ef4444" },
    { title: "Active Reservations", value: "1,426", data: [80, 90, 85, 95, 90, 100, 95] },
    { title: "Reservations Expiring Soon", value: "24", data: [3, 5, 4, 6, 5, 7, 6], textClass: "text-amber-700 font-bold", stroke: "#f59e0b" },
    { title: "Reservation Failures", value: "8", data: [1, 2, 1, 3, 1, 2, 1], textClass: "text-rose-700 font-bold", stroke: "#ef4444" },
    { title: "Stock Shortage Cases", value: "36", data: [4, 6, 5, 7, 6, 8, 7], textClass: "text-amber-700 font-bold", stroke: "#f59e0b" },
    { title: "Transfers Required", value: "28", data: [3, 4, 5, 4, 6, 5, 6], stroke: "#0284c7" },
    { title: "Transfers In Transit", value: "12", data: [2, 3, 2, 4, 3, 5, 4], stroke: "#2563eb" },
    { title: "Allocation SLA Breaches", value: "6", data: [1, 2, 1, 2, 1, 2, 1], textClass: "text-rose-700 font-bold", stroke: "#ef4444" },
  ];

  const perfMetrics = [
    { title: "Fully Allocated Rate", val: "86.4%", data: [80, 82, 84, 85, 86, 86.4] },
    { title: "Avg Allocation Time", val: "2h 16m", data: [180, 160, 150, 140, 136] },
    { title: "Reservation Success Rate", val: "97.8%", data: [95, 96, 97, 97.5, 98.1] },
    { title: "Transfer Fulfilment Rate", val: "91.2%", data: [88, 89, 90, 91, 91.2] },
    { title: "Avg Transfer Lead Time", val: "9h 20m", data: [650, 600, 580, 560] },
    { title: "Allocation Accuracy", val: "98.1%", data: [96, 97, 97.5, 98, 98.1] },
  ];

  return (
    <div className="space-y-1.5">
      {/* 12 PRIMARY KPI CARDS IN 1 DESKTOP ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1.5 text-[10px]">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-1.5 sm:p-2 rounded-xl border border-line shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all h-[64px]">
            <span className="text-[9px] font-semibold text-muted leading-[1.1] block h-[22px] flex items-center overflow-hidden">
              {card.title}
            </span>

            <div className="flex items-end justify-between gap-1 my-0.5">
              <div className={`text-sm sm:text-base font-bold leading-none ${card.textClass || "text-ink"}`}>
                {card.value}
              </div>
              <div className="w-10 h-4 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={card.data.map(v => ({ v }))}>
                    <Line type="monotone" dataKey="v" stroke={card.stroke || "#2563eb"} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 6 PERFORMANCE METRICS STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-1.5 text-[10px]">
        {perfMetrics.map((pm, i) => (
          <div key={i} className="bg-white p-1.5 sm:p-2 rounded-xl border border-line shadow-xs flex items-center justify-between gap-2 h-[40px]">
            <div className="min-w-0">
              <span className="text-[8.5px] font-semibold text-muted truncate block">{pm.title}</span>
              <div className="text-xs font-bold text-ink leading-tight">{pm.val}</div>
            </div>
            <div className="w-12 h-5 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pm.data.map(v => ({ v }))}>
                  <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
