"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

interface WarehouseAnalyticsProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  typeDistribution?: Array<{ type: string; count: number }>;
  statusSummary?: Array<{ status: string; count: number }>;
}

export function WarehouseAnalytics({
  loading = false,
  error = null,
  onRetry,
  typeDistribution = [],
  statusSummary = [],
}: WarehouseAnalyticsProps) {
  // 30-day capacity & workload trend data
  const trendData: any[] = [];

  // Facility Type Distribution donut data
  const donutTotal = typeDistribution.reduce((sum, item) => sum + Number(item.count), 0);
  const donutData = typeDistribution.map((item, index) => ({ name: item.type, value: Number(item.count), percentage: donutTotal ? `${(Number(item.count) / donutTotal * 100).toFixed(1)}%` : "0%", color: ["#2563eb", "#9333ea", "#0284c7", "#f59e0b", "#64748b"][index % 5] }));

  // Operational Status Summary horizontal bar data
  const statusData = statusSummary.length ? statusSummary.map(item => ({ label: item.status, count: Number(item.count), pct: donutTotal ? `${(Number(item.count) / donutTotal * 100).toFixed(1)}%` : "0%", width: donutTotal ? Number(item.count) / donutTotal * 100 : 0, dot: "bg-emerald-500" })) : [
    { label: "Healthy", count: 12, pct: "50.0%", width: 50, dot: "bg-emerald-500" },
    { label: "High Utilization", count: 5, pct: "20.8%", width: 21, dot: "bg-amber-500" },
    { label: "At Risk", count: 3, pct: "12.5%", width: 13, dot: "bg-orange-500" },
    { label: "Limited Service", count: 1, pct: "4.2%", width: 4, dot: "bg-blue-500" },
    { label: "Maintenance", count: 1, pct: "4.2%", width: 4, dot: "bg-purple-500" },
    { label: "On Hold", count: 1, pct: "4.2%", width: 4, dot: "bg-amber-600" },
    { label: "Critical", count: 1, pct: "4.2%", width: 4, dot: "bg-rose-500" },
    { label: "Offline", count: 0, pct: "0.0%", width: 0, dot: "bg-gray-400" },
  ];

  // Health Scorecard 10 circular gauges
  const scorecardMetrics = ["Facility Availability","Capacity Health","Inventory Coverage","Allocation Readiness","Picking Performance","Packing Performance","Dispatch Readiness","Transfer Readiness","Operational SLA","Audit Completeness"].map(name=>({name,score:0}));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2.5 text-[10px]">
      {/* PANEL 1: WAREHOUSE CAPACITY & WORKLOAD TREND (~25% width = xl:col-span-3) */}
      <div className="xl:col-span-3 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[210px]">
        <div>
          <h3 className="text-[11px] font-bold text-ink leading-tight">
            1. WAREHOUSE CAPACITY &amp; WORKLOAD TREND
          </h3>
          <p className="text-[9px] text-muted leading-tight">
            30-day capacity utilization and order dispatch volume trajectory
          </p>
        </div>

        <div className="h-[125px] w-full mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <XAxis dataKey="date" tick={{ fontSize: 8 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 8 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ fontSize: "10px" }} />
              <Line type="monotone" dataKey="Assigned" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="Dispatches" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="Utilization" stroke="#722F37" strokeWidth={1.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-3 text-[9px] font-semibold pt-1 border-t border-line/50">
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-blue-600" /> Assigned</span>
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-emerald-500" /> Dispatches</span>
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-primary-900" /> Utilization</span>
        </div>
      </div>

      {/* PANEL 2: FACILITY TYPE DISTRIBUTION (~22% width = xl:col-span-3) */}
      <div className="xl:col-span-3 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[210px]">
        <div>
          <h3 className="text-[11px] font-bold text-ink leading-tight">
            2. FACILITY TYPE DISTRIBUTION
          </h3>
          <p className="text-[9px] text-muted leading-tight">
            Breakdown by physical facility classification
          </p>
        </div>

        <div className="flex items-center justify-between gap-1 my-auto">
          {/* Centered Donut */}
          <div className="relative w-[95px] h-[95px] flex-shrink-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={44}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-bold text-ink leading-none">{donutTotal}</span>
              <span className="text-[7px] font-bold text-muted uppercase leading-tight">Total</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="flex-1 space-y-1 pl-1">
            {donutData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-[9px] leading-tight">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-ink font-medium truncate">{item.name}</span>
                </div>
                <span className="font-bold text-ink flex-shrink-0 ml-1">
                  {item.value} <span className="text-muted font-normal text-[8px]">({item.percentage})</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PANEL 3: FACILITY OPERATIONAL STATUS SUMMARY (~20% width = xl:col-span-2) */}
      <div className="xl:col-span-2 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[210px]">
        <div>
          <h3 className="text-[11px] font-bold text-ink leading-tight">
            3. FACILITY STATUS SUMMARY
          </h3>
          <p className="text-[9px] text-muted leading-tight truncate">
            Facility operational health category
          </p>
        </div>

        <div className="space-y-1 my-auto">
          {statusData.map((st, i) => (
            <div key={i} className="flex items-center justify-between text-[9px] gap-1">
              <div className="flex items-center gap-1 w-24 truncate">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`} />
                <span className="text-ink font-medium truncate">{st.label}</span>
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-1 overflow-hidden mx-1">
                <div className={`h-full rounded-full ${st.dot}`} style={{ width: `${st.width}%` }} />
              </div>
              <span className="font-bold text-ink text-[8px] flex-shrink-0">{st.count} ({st.pct})</span>
            </div>
          ))}
        </div>

        <div className="pt-1 border-t border-line/50 flex justify-between text-[9px] font-bold text-ink">
          <span>Total Operations</span>
          <span>{donutTotal} ({donutTotal ? "100%" : "0%"})</span>
        </div>
      </div>

      {/* PANEL 4: LOGISTICS OPERATIONS HEALTH SCORECARD (~35% width = xl:col-span-4) */}
      <div className="xl:col-span-4 bg-white p-2.5 rounded-xl border border-line shadow-sm flex flex-col justify-between h-[210px]">
        <div>
          <h3 className="text-[11px] font-bold text-ink leading-tight">
            4. LOGISTICS OPERATIONS HEALTH SCORECARD
          </h3>
          <p className="text-[9px] text-muted leading-tight">
            10 network-wide facility health dimensions
          </p>
        </div>

        <div className="grid grid-cols-5 gap-1.5 my-auto">
          {scorecardMetrics.map((item, idx) => (
            <div key={idx} className="p-1 bg-canvas border border-line rounded-md flex flex-col items-center text-center space-y-0.5">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-200" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-600" strokeDasharray={`${item.score}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[9px] font-bold text-ink">{item.score}</span>
              </div>
              <span className="text-[8px] font-medium text-muted leading-none line-clamp-1 w-full" title={item.name}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
