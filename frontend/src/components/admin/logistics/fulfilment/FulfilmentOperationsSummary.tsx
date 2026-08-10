"use client";

import React from "react";
import {
  Boxes, Layers, CheckSquare, ShieldCheck, Warehouse, ShieldAlert, AlertTriangle, Clock, Activity, ChevronRight
} from "lucide-react";

export function FulfilmentOperationsSummary() {
  const recentActivities = [
    { time: "10:12 AM", text: "Packed 14 items — FUL25-0001248", user: "Udara K.", badge: "Packing" },
    { time: "09:48 AM", text: "Picking completed — FUL25-0001247", user: "Nimal S.", badge: "Picking" },
    { time: "09:32 AM", text: "Allocation failed — FUL25-0001246", user: "Auto Allocator", badge: "Allocation Error" },
    { time: "08:50 AM", text: "Shipment created — FUL25-0001245", user: "DHL Logistics Gateway", badge: "Shipment" },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* 8 BOTTOM OPERATIONAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {/* 1. Inventory Allocation Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Boxes size={15} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Inventory Allocation Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>1,076 Allocated</span><strong className="text-emerald-700">86.2%</strong></div>
            <div className="flex justify-between"><span>84 Partially Allocated</span><strong className="text-amber-700">6.7%</strong></div>
            <div className="flex justify-between"><span>88 Failed / Pending</span><strong className="text-rose-700">7.1%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-emerald-600 h-full" style={{ width: "86.2%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "6.7%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "7.1%" }} />
            </div>
          </div>
        </div>

        {/* 2. Picking Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Layers size={15} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Picking Operations Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>1,124 Picked</span><strong className="text-emerald-700">90.1%</strong></div>
            <div className="flex justify-between"><span>126 In Progress</span><strong className="text-blue-700">10.1%</strong></div>
            <div className="flex justify-between"><span>12 Exceptions</span><strong className="text-rose-700">1.0%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-emerald-600 h-full" style={{ width: "90.1%" }} />
              <div className="bg-blue-500 h-full" style={{ width: "10.1%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "1.0%" }} />
            </div>
          </div>
        </div>

        {/* 3. Packing Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <CheckSquare size={15} className="text-sky-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Packing Operations Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>968 Packed</span><strong className="text-emerald-700">77.6%</strong></div>
            <div className="flex justify-between"><span>96 In Progress</span><strong className="text-blue-700">7.7%</strong></div>
            <div className="flex justify-between"><span>48 Pending</span><strong className="text-muted">3.8%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-emerald-600 h-full" style={{ width: "77.6%" }} />
              <div className="bg-blue-500 h-full" style={{ width: "7.7%" }} />
              <div className="bg-gray-300 h-full" style={{ width: "3.8%" }} />
            </div>
          </div>
        </div>

        {/* 4. Quality Checks Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <ShieldCheck size={15} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Quality Checks Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>1,208 Passed</span><strong className="text-emerald-700">96.8%</strong></div>
            <div className="flex justify-between"><span>28 Pending</span><strong className="text-amber-700">2.2%</strong></div>
            <div className="flex justify-between"><span>12 Failed</span><strong className="text-rose-700">1.0%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-emerald-600 h-full" style={{ width: "96.8%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "2.2%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "1.0%" }} />
            </div>
          </div>
        </div>

        {/* 5. Warehouse & Capacity Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Warehouse size={15} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Warehouse &amp; Capacity Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>Overall Capacity</span><strong className="text-ink">77%</strong></div>
            <div className="flex justify-between"><span>Utilized</span><strong className="text-emerald-700">23%</strong></div>
            <div className="flex justify-between"><span>Available</span><strong className="text-muted">28%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-emerald-600 h-full" style={{ width: "77%" }} />
              <div className="bg-gray-300 h-full" style={{ width: "23%" }} />
            </div>
          </div>
        </div>

        {/* 6. Fulfilment Holds Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <ShieldAlert size={15} className="text-amber-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Fulfilment Holds Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>24 On Hold</span><strong className="text-amber-700">1.9%</strong></div>
            <div className="flex justify-between"><span>14 Payment Holds</span><strong className="text-amber-700">1.1%</strong></div>
            <div className="flex justify-between"><span>10 Manual Holds</span><strong className="text-muted">0.8%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-amber-500 h-full" style={{ width: "60%" }} />
              <div className="bg-gray-400 h-full" style={{ width: "40%" }} />
            </div>
          </div>
        </div>

        {/* 7. Fulfilment Exception Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <AlertTriangle size={15} className="text-rose-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Fulfilment Exception Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>38 Total Exceptions</span><strong className="text-rose-700">3.0%</strong></div>
            <div className="flex justify-between"><span>22 Stock Shortage</span><strong className="text-rose-700">1.7%</strong></div>
            <div className="flex justify-between"><span>16 Other Reasons</span><strong className="text-muted">1.3%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-rose-600 h-full" style={{ width: "58%" }} />
              <div className="bg-gray-400 h-full" style={{ width: "42%" }} />
            </div>
          </div>
        </div>

        {/* 8. Fulfilment SLA Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-3.5 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Clock size={15} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Fulfilment SLA Summary</h4>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span>90% On Track</span><strong className="text-emerald-700">1,124</strong></div>
            <div className="flex justify-between"><span>8% At Risk</span><strong className="text-amber-700">101</strong></div>
            <div className="flex justify-between"><span>2% Breached</span><strong className="text-rose-700">23</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex mt-1">
              <div className="bg-emerald-600 h-full" style={{ width: "90%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "8%" }} />
              <div className="bg-rose-600 h-full" style={{ width: "2%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* RECENT FULFILMENT ACTIVITY */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-primary-900" />
            <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider">Recent Fulfilment Activity</h3>
          </div>
          <button
            onClick={() => alert("Viewing All Activity Logs...")}
            className="text-[11px] text-primary-900 hover:underline font-bold flex items-center gap-0.5"
          >
            View All Activity <ChevronRight size={11} />
          </button>
        </div>

        <div className="divide-y divide-line">
          {recentActivities.map((act, idx) => (
            <div key={idx} className="py-2 flex items-center justify-between gap-3 hover:bg-canvas px-2 rounded transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono text-muted text-[10px] w-14">{act.time}</span>
                <span className="font-semibold text-ink">{act.text}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted">by <strong className="text-ink">{act.user}</strong></span>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-canvas border border-line text-muted">
                  {act.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
