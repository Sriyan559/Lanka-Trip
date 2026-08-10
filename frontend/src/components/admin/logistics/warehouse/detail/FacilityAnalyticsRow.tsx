"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export function FacilityAnalyticsRow() {
  const trendData = [
    { date: "02 May", Utilization: 70, Assigned: 950, Throughput: 900 },
    { date: "08 May", Utilization: 75, Assigned: 1100, Throughput: 1050 },
    { date: "14 May", Utilization: 72, Assigned: 1020, Throughput: 980 },
    { date: "20 May", Utilization: 78, Assigned: 1250, Throughput: 1180 },
    { date: "26 May", Utilization: 74, Assigned: 1120, Throughput: 1080 },
    { date: "30 May", Utilization: 76, Assigned: 1248, Throughput: 1200 },
  ];

  const donutData = [
    { name: "Fast Moving Zone", value: 593, pct: "28%", color: "#2563eb" },
    { name: "Standard Beauty", value: 509, pct: "24%", color: "#10b981" },
    { name: "High Value Zone", value: 297, pct: "14%", color: "#9333ea" },
    { name: "Temperature Controlled", value: 212, pct: "10%", color: "#0284c7" },
    { name: "Quarantine", value: 127, pct: "6%", color: "#f59e0b" },
    { name: "Returns Zone", value: 106, pct: "5%", color: "#ef4444" },
    { name: "Packing Zone", value: 106, pct: "5%", color: "#64748b" },
    { name: "Dispatch Zone", value: 106, pct: "5%", color: "#38bdf8" },
  ];

  const scorecardMetrics = [
    { name: "Capacity", score: 88 },
    { name: "Inventory", score: 90 },
    { name: "Allocation", score: 92 },
    { name: "Picking", score: 89 },
    { name: "Packing", score: 91 },
    { name: "Dispatch", score: 93 },
    { name: "Transfer", score: 90 },
    { name: "SLA", score: 94 },
  ];

  const zoneRows = [
    { name: "Fast Moving Zone", util: "82%", val: "448K / 552K", state: "High", badge: "text-amber-800 bg-amber-50 border-amber-200" },
    { name: "Standard Beauty", util: "71%", val: "348K / 490K", state: "Healthy", badge: "text-emerald-800 bg-emerald-50 border-emerald-200" },
    { name: "High Value Zone", util: "69%", val: "200K / 290K", state: "Healthy", badge: "text-emerald-800 bg-emerald-50 border-emerald-200" },
    { name: "Temperature Controlled", util: "74%", val: "157K / 212K", state: "High", badge: "text-amber-800 bg-amber-50 border-amber-200" },
    { name: "Quarantine", util: "45%", val: "51K / 112K", state: "Low", badge: "text-blue-800 bg-blue-50 border-blue-200" },
    { name: "Returns Zone", util: "62%", val: "106K / 170K", state: "Medium", badge: "text-emerald-800 bg-emerald-50 border-emerald-200" },
    { name: "Packing Zone", util: "66%", val: "69K / 105K", state: "Medium", badge: "text-emerald-800 bg-emerald-50 border-emerald-200" },
    { name: "Dispatch Zone", util: "64%", val: "70K / 108K", state: "Medium", badge: "text-emerald-800 bg-emerald-50 border-emerald-200" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 text-[10px]">
      {/* PANEL 1: CAPACITY & WORKLOAD TREND (xl:col-span-3) */}
      <div className="xl:col-span-3 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
        <div>
          <h3 className="text-[10px] font-bold text-ink leading-tight">
            Capacity &amp; Workload Trend (Last 30 Days)
          </h3>
        </div>

        <div className="h-[135px] w-full mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <XAxis dataKey="date" tick={{ fontSize: 8 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 8 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ fontSize: "10px" }} />
              <Line type="monotone" dataKey="Assigned" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="Throughput" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="Utilization" stroke="#722F37" strokeWidth={1.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-3 text-[8.5px] font-semibold pt-1 border-t border-line/50">
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-blue-600" /> Assigned</span>
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-emerald-500" /> Throughput</span>
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-primary-900" /> Utilization</span>
        </div>
      </div>

      {/* PANEL 2: CAPACITY BY AREA / ZONE (xl:col-span-3) */}
      <div className="xl:col-span-3 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
        <h3 className="text-[10px] font-bold text-ink leading-tight">
          Capacity by Area / Zone
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
              <span className="text-xs font-bold text-ink leading-none">2.12M</span>
              <span className="text-[7px] font-bold text-muted uppercase">Capacity</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="flex-1 space-y-0.5 pl-1 max-h-[145px] overflow-y-auto scrollbar-none">
            {donutData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-[8.5px] leading-tight">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-ink font-medium truncate">{item.name}</span>
                </div>
                <span className="font-bold text-ink flex-shrink-0 ml-1">
                  {item.pct} <span className="text-muted font-normal text-[7.5px]">({item.value}K)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PANEL 3: OPERATIONAL HEALTH SCORECARD (xl:col-span-2) */}
      <div className="xl:col-span-2 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
        <h3 className="text-[10px] font-bold text-ink leading-tight">
          Operational Health Scorecard
        </h3>

        <div className="grid grid-cols-4 gap-1.5 my-auto">
          {scorecardMetrics.map((item, idx) => (
            <div key={idx} className="p-1 bg-canvas border border-line rounded-md flex flex-col items-center text-center space-y-0.5">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-200" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-600" strokeDasharray={`${item.score}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[8.5px] font-bold text-ink">{item.score}</span>
              </div>
              <span className="text-[7.5px] font-medium text-muted leading-none truncate w-full" title={item.name}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL 4: AREA / ZONE CAPACITY TABLE (xl:col-span-2) */}
      <div className="xl:col-span-2 bg-white p-2 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
        <div className="flex items-center justify-between border-b border-line pb-1">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider">Area / Zone Capacity</h3>
          <button onClick={() => alert("Viewing All Areas...")} className="text-[8px] text-primary-900 font-bold hover:underline">View All</button>
        </div>

        <div className="overflow-y-auto scrollbar-thin max-h-[145px] my-auto">
          <table className="w-full text-left text-[8.5px]">
            <thead className="text-muted font-semibold uppercase text-[7.5px]">
              <tr>
                <th className="py-0.5">Area</th>
                <th className="py-0.5 text-center">Util</th>
                <th className="py-0.5 text-right">Used / Cap</th>
                <th className="py-0.5 text-center">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {zoneRows.map((zr, i) => (
                <tr key={i}>
                  <td className="py-0.5 font-medium text-ink truncate max-w-[70px]">{zr.name}</td>
                  <td className="py-0.5 text-center font-bold">{zr.util}</td>
                  <td className="py-0.5 text-right font-mono text-muted text-[8px]">{zr.val}</td>
                  <td className="py-0.5 text-center">
                    <span className={`px-1 py-0.1 rounded text-[7.5px] border ${zr.badge}`}>{zr.state}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PANEL 5: INVENTORY LOCATIONS SUMMARY (xl:col-span-2) */}
      <div className="xl:col-span-2 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[215px]">
        <div className="flex items-center justify-between border-b border-line pb-1">
          <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider">Inventory Locations Summary</h3>
        </div>

        <div className="space-y-1.5 my-auto text-[9.5px]">
          <div className="flex justify-between"><span>Total Locations:</span><strong className="text-ink">1,248</strong></div>
          <div className="flex justify-between"><span>Active Locations:</span><strong className="text-emerald-700 font-bold">1,196</strong></div>
          <div className="flex justify-between"><span>Utilization:</span><strong className="text-amber-700 font-bold">72%</strong></div>
          <div className="flex justify-between"><span>Locations Over 90%:</span><strong className="text-rose-700 font-bold">132</strong></div>
          <div className="flex justify-between"><span>Frozen / Quarantine:</span><strong className="text-purple-700 font-bold">24</strong></div>
          <div className="flex justify-between"><span>Accuracy:</span><strong className="text-emerald-700 font-bold">99.1%</strong></div>
        </div>

        <button onClick={() => alert("Viewing Inventory Locations...")} className="w-full py-1 text-[8.5px] font-bold text-primary-900 hover:underline border-t border-line text-center">
          View Inventory Locations →
        </button>
      </div>
    </div>
  );
}
