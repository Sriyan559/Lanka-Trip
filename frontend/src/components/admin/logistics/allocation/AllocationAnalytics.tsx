"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export function AllocationAnalytics() {
  const trendData = [
    { date: "Apr 27", Requests: 950, Allocated: 820, Partial: 60, Failed: 12, ResCreated: 980, ResExpired: 18, Transfers: 20 },
    { date: "May 1", Requests: 1100, Allocated: 940, Partial: 72, Failed: 15, ResCreated: 1120, ResExpired: 20, Transfers: 24 },
    { date: "May 5", Requests: 1020, Allocated: 880, Partial: 68, Failed: 14, ResCreated: 1050, ResExpired: 19, Transfers: 22 },
    { date: "May 9", Requests: 1250, Allocated: 1080, Partial: 84, Failed: 18, ResCreated: 1280, ResExpired: 24, Transfers: 28 },
    { date: "May 13", Requests: 1120, Allocated: 960, Partial: 76, Failed: 16, ResCreated: 1150, ResExpired: 21, Transfers: 25 },
    { date: "May 17", Requests: 1300, Allocated: 1120, Partial: 88, Failed: 20, ResCreated: 1340, ResExpired: 26, Transfers: 30 },
    { date: "May 21", Requests: 1200, Allocated: 1030, Partial: 80, Failed: 17, ResCreated: 1220, ResExpired: 23, Transfers: 26 },
    { date: "May 25", Requests: 1248, Allocated: 1078, Partial: 84, Failed: 18, ResCreated: 1270, ResExpired: 24, Transfers: 28 },
  ];

  const donutData = [
    { name: "Fully Allocated", value: 1078, pct: "86.4%", color: "#10b981" },
    { name: "Partially Allocated", value: 84, pct: "6.7%", color: "#f59e0b" },
    { name: "Allocation Pending", value: 42, pct: "3.4%", color: "#3b82f6" },
    { name: "Allocation Failed", value: 18, pct: "1.4%", color: "#ef4444" },
    { name: "Backordered", value: 12, pct: "1.0%", color: "#8b5cf6" },
    { name: "Transfer Required", value: 8, pct: "0.6%", color: "#0284c7" },
    { name: "Substitution Review", value: 6, pct: "0.5%", color: "#64748b" },
  ];

  const statusRows = [
    { label: "Stock Shortage", count: 26, pct: "20.8%", width: 65, color: "#ef4444" },
    { label: "Reservation Expired", count: 19, pct: "15.2%", width: 48, color: "#f59e0b" },
    { label: "No Eligible Batch", count: 18, pct: "14.4%", width: 45, color: "#f97316" },
    { label: "Warehouse Capacity Constraint", count: 14, pct: "11.2%", width: 35, color: "#a855f7" },
    { label: "Transfer Required", count: 28, pct: "22.4%", width: 70, color: "#0284c7" },
    { label: "Transfer Pending", count: 16, pct: "12.8%", width: 40, color: "#3b82f6" },
    { label: "Transfer In Transit", count: 12, pct: "9.6%", width: 30, color: "#2563eb" },
    { label: "Transfer Delayed", count: 6, pct: "4.8%", width: 15, color: "#d97706" },
    { label: "Transfer Failed", count: 2, pct: "1.6%", width: 5, color: "#dc2626" },
  ];

  const scorecardMetrics = [
    { name: "Inventory Availability", score: 94 },
    { name: "Reservation Integrity", score: 96 },
    { name: "Allocation Accuracy", score: 98 },
    { name: "Allocation Speed", score: 88 },
    { name: "Batch / Expiry Compliance", score: 92 },
    { name: "Transfer Readiness", score: 91 },
    { name: "Warehouse Source Coverage", score: 87 },
    { name: "Shortage Resolution", score: 89 },
    { name: "Allocation SLA", score: 90 },
    { name: "Audit Completeness", score: 94 },
  ];

  return (
    <div className="space-y-2.5 text-[10px]">
      {/* 3 MAIN ANALYTICS PANELS IN 1 DESKTOP ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2.5">
        {/* PANEL A: ALLOCATION & RESERVATION TREND (xl:col-span-4) */}
        <div className="xl:col-span-4 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
          <div>
            <h3 className="text-[11px] font-bold text-ink leading-tight">
              Allocation &amp; Reservation Trend (Last 30 Days)
            </h3>
          </div>

          <div className="h-[135px] w-full mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 8 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 8 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ fontSize: "10px" }} />
                <Line type="monotone" dataKey="Requests" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Allocated" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Partial" stroke="#f59e0b" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Failed" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-3 text-[8.5px] font-semibold pt-1 border-t border-line/50">
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-blue-600" /> Requests</span>
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-emerald-500" /> Allocated</span>
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-amber-500" /> Partial</span>
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-rose-500" /> Failed</span>
          </div>
        </div>

        {/* PANEL B: ALLOCATION OUTCOME DISTRIBUTION (xl:col-span-3) */}
        <div className="xl:col-span-3 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
          <h3 className="text-[11px] font-bold text-ink leading-tight">
            Allocation Outcome Distribution
          </h3>

          <div className="flex items-center justify-between gap-1 my-auto">
            {/* Centered Donut */}
            <div className="relative w-[95px] h-[95px] flex-shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={2} dataKey="value">
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-ink leading-none">1,248</span>
                <span className="text-[7px] font-bold text-muted uppercase">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-0.5 pl-1 max-h-[145px] overflow-y-auto scrollbar-none">
              {donutData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[8.5px] leading-tight">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-ink font-medium truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-ink flex-shrink-0 ml-1">
                    {item.value} <span className="text-muted font-normal text-[7.5px]">({item.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL C: SHORTAGE & TRANSFER STATUS SUMMARY (xl:col-span-5) */}
        <div className="xl:col-span-5 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
          <h3 className="text-[11px] font-bold text-ink leading-tight">
            Shortage &amp; Transfer Status Summary
          </h3>

          <div className="space-y-1 my-auto max-h-[160px] overflow-y-auto scrollbar-none">
            {statusRows.map((st, i) => (
              <div key={i} className="flex items-center justify-between text-[8.5px] gap-1">
                <span className="text-ink font-medium w-40 truncate">{st.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1 overflow-hidden mx-1">
                  <div className="h-full rounded-full" style={{ width: `${st.width}%`, backgroundColor: st.color }} />
                </div>
                <span className="font-bold text-ink text-[8px] flex-shrink-0 w-16 text-right">
                  {st.count} ({st.pct})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALLOCATION OPERATIONS HEALTH SCORECARD STRIP */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-sm space-y-1.5">
        <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider">
          Allocation Operations Health Scorecard
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-10 gap-2 text-[9.5px]">
          {scorecardMetrics.map((sm, i) => (
            <div key={i} className="p-1.5 bg-canvas border border-line rounded-lg space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[8.5px] text-muted font-semibold truncate leading-tight w-24" title={sm.name}>{sm.name}</span>
                <strong className="text-emerald-700 font-bold text-[9.5px]">{sm.score}%</strong>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${sm.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
