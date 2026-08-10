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
    { time: "08:50 AM", text: "Shipment created — FUL25-0001245", user: "DHL Gateway", badge: "Shipment" },
  ];

  return (
    <div className="space-y-2 text-[10px]">
      {/* 9 BOTTOM OPERATIONAL CARDS IN 1 ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-1.5">
        {/* 1. Inventory Allocation Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Boxes size={12} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Allocation Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>1,076 Allocated</span><strong className="text-emerald-700">86.2%</strong></div>
            <div className="flex justify-between"><span>84 Partially</span><strong className="text-amber-700">6.7%</strong></div>
            <div className="flex justify-between"><span>88 Failed</span><strong className="text-rose-700">7.1%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-600 h-full" style={{ width: "86.2%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "6.7%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "7.1%" }} />
            </div>
          </div>
        </div>

        {/* 2. Picking Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Layers size={12} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Picking Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>1,124 Picked</span><strong className="text-emerald-700">90.1%</strong></div>
            <div className="flex justify-between"><span>126 In Progress</span><strong className="text-blue-700">10.1%</strong></div>
            <div className="flex justify-between"><span>12 Exceptions</span><strong className="text-rose-700">1.0%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-600 h-full" style={{ width: "90.1%" }} />
              <div className="bg-blue-500 h-full" style={{ width: "10.1%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "1.0%" }} />
            </div>
          </div>
        </div>

        {/* 3. Packing Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <CheckSquare size={12} className="text-sky-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Packing Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>968 Packed</span><strong className="text-emerald-700">77.6%</strong></div>
            <div className="flex justify-between"><span>96 In Progress</span><strong className="text-blue-700">7.7%</strong></div>
            <div className="flex justify-between"><span>48 Pending</span><strong className="text-muted">3.8%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-600 h-full" style={{ width: "77.6%" }} />
              <div className="bg-blue-500 h-full" style={{ width: "7.7%" }} />
              <div className="bg-gray-300 h-full" style={{ width: "3.8%" }} />
            </div>
          </div>
        </div>

        {/* 4. Quality Checks Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <ShieldCheck size={12} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Quality Checks</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>1,208 Passed</span><strong className="text-emerald-700">96.8%</strong></div>
            <div className="flex justify-between"><span>28 Pending</span><strong className="text-amber-700">2.2%</strong></div>
            <div className="flex justify-between"><span>12 Failed</span><strong className="text-rose-700">1.0%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-600 h-full" style={{ width: "96.8%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "2.2%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "1.0%" }} />
            </div>
          </div>
        </div>

        {/* 5. Warehouse & Capacity Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Warehouse size={12} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Warehouse Capacity</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>Overall Capacity</span><strong className="text-ink">77%</strong></div>
            <div className="flex justify-between"><span>Utilized</span><strong className="text-emerald-700">23%</strong></div>
            <div className="flex justify-between"><span>Available</span><strong className="text-muted">28%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-600 h-full" style={{ width: "77%" }} />
              <div className="bg-gray-300 h-full" style={{ width: "23%" }} />
            </div>
          </div>
        </div>

        {/* 6. Fulfilment Holds Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <ShieldAlert size={12} className="text-amber-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Holds Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>24 On Hold</span><strong className="text-amber-700">1.9%</strong></div>
            <div className="flex justify-between"><span>14 Payment Holds</span><strong className="text-amber-700">1.1%</strong></div>
            <div className="flex justify-between"><span>10 Manual Holds</span><strong className="text-muted">0.8%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-amber-500 h-full" style={{ width: "60%" }} />
              <div className="bg-gray-400 h-full" style={{ width: "40%" }} />
            </div>
          </div>
        </div>

        {/* 7. Fulfilment Exception Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <AlertTriangle size={12} className="text-rose-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Exception Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>38 Total Exceptions</span><strong className="text-rose-700">3.0%</strong></div>
            <div className="flex justify-between"><span>22 Stock Shortage</span><strong className="text-rose-700">1.7%</strong></div>
            <div className="flex justify-between"><span>16 Other Reasons</span><strong className="text-muted">1.3%</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-rose-600 h-full" style={{ width: "58%" }} />
              <div className="bg-gray-400 h-full" style={{ width: "42%" }} />
            </div>
          </div>
        </div>

        {/* 8. Fulfilment SLA Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Clock size={12} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">SLA Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>90% On Track</span><strong className="text-emerald-700">1,124</strong></div>
            <div className="flex justify-between"><span>8% At Risk</span><strong className="text-amber-700">101</strong></div>
            <div className="flex justify-between"><span>2% Breached</span><strong className="text-rose-700">23</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1.5 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-600 h-full" style={{ width: "90%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "8%" }} />
              <div className="bg-rose-600 h-full" style={{ width: "2%" }} />
            </div>
          </div>
        </div>

        {/* 9. Recent Activity Summary Card */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-line pb-1">
            <div className="flex items-center gap-1">
              <Activity size={12} className="text-primary-900" />
              <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Recent Activity</h4>
            </div>
          </div>
          <div className="space-y-0.5 text-[8px]">
            {recentActivities.slice(0, 3).map((act, idx) => (
              <div key={idx} className="truncate text-muted flex justify-between">
                <span className="truncate">{act.text}</span>
                <span className="font-mono ml-1">{act.time}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => alert("Viewing All Activity Logs...")}
            className="text-[8px] text-primary-900 hover:underline font-bold flex items-center gap-0.5 pt-0.5"
          >
            View All Activity <ChevronRight size={8} />
          </button>
        </div>
      </div>
    </div>
  );
}
