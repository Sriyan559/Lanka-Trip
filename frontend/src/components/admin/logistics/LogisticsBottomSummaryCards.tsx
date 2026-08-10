"use client";

import React from "react";
import { 
  Workflow, Boxes, Warehouse, Truck, Award, ShieldAlert, CheckSquare, RotateCcw, FileText, Scale, Activity, ChevronRight
} from "lucide-react";

export function LogisticsBottomSummaryCards() {
  const activityLogs = [
    { time: "10:15 AM", title: "Shipment SHP-99201 updated", user: "DHL Gateway" },
    { time: "09:45 AM", title: "Carrier pickup collected", user: "Kamal W." },
    { time: "09:20 AM", title: "Out-for-delivery status changed", user: "Delivery System" },
  ];

  return (
    <div className="space-y-2 text-[10px]">
      {/* 11 BOTTOM OPERATIONAL SUMMARY CARDS IN 1 ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-11 gap-1.5">
        {/* 1. Fulfilment Order Workflow */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Workflow size={11} className="text-blue-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Fulfilment Workflow</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>On Track</span><strong className="text-emerald-700">873</strong></div>
            <div className="flex justify-between"><span>At Risk</span><strong className="text-amber-700">187</strong></div>
            <div className="flex justify-between"><span>Delayed</span><strong className="text-rose-700">125</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-500 h-full" style={{ width: "70%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "15%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "15%" }} />
            </div>
          </div>
        </div>

        {/* 2. Inventory Allocation Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Boxes size={11} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Allocation Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>Auto Allocated</span><strong className="text-ink">1,092</strong></div>
            <div className="flex justify-between"><span>Manual</span><strong className="text-ink">156</strong></div>
            <div className="flex justify-between"><span>Failed</span><strong className="text-rose-700">84</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1 overflow-hidden flex mt-0.5">
              <div className="bg-purple-600 h-full" style={{ width: "82%" }} />
              <div className="bg-blue-500 h-full" style={{ width: "12%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "6%" }} />
            </div>
          </div>
        </div>

        {/* 3. Warehouse Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Warehouse size={11} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Warehouse Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>Avg Capacity</span><strong className="text-emerald-700">82%</strong></div>
            <div className="flex justify-between"><span>Hubs Active</span><strong className="text-ink">3 Hubs</strong></div>
            <div className="flex justify-between"><span>Critical &gt;95%</span><strong className="text-rose-700">1 Hub</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1 overflow-hidden flex mt-0.5">
              <div className="bg-emerald-600 h-full" style={{ width: "82%" }} />
            </div>
          </div>
        </div>

        {/* 4. Shipment Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Truck size={11} className="text-sky-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Shipment Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>In Transit</span><strong className="text-ink">286</strong></div>
            <div className="flex justify-between"><span>On Time</span><strong className="text-emerald-700">243</strong></div>
            <div className="flex justify-between"><span>Delayed</span><strong className="text-rose-700">15</strong></div>
            <div className="w-full bg-canvas border border-line rounded-full h-1 overflow-hidden flex mt-0.5">
              <div className="bg-sky-500 h-full" style={{ width: "85%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "15%" }} />
            </div>
          </div>
        </div>

        {/* 5. Carrier Performance */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Award size={11} className="text-amber-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Carrier Performance</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>DHL Express</span><strong className="text-emerald-700">96%</strong></div>
            <div className="flex justify-between"><span>PickMe Flash</span><strong className="text-emerald-700">92%</strong></div>
            <div className="flex justify-between"><span>Aramex Lanka</span><strong className="text-emerald-700">94%</strong></div>
          </div>
        </div>

        {/* 6. Delivery SLA & Exceptions */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <ShieldAlert size={11} className="text-rose-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Delivery SLA</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>On Track</span><strong className="text-emerald-700">91%</strong></div>
            <div className="flex justify-between"><span>At Risk</span><strong className="text-amber-700">8%</strong></div>
            <div className="flex justify-between"><span>Breached</span><strong className="text-rose-700">1%</strong></div>
          </div>
        </div>

        {/* 7. Proof of Delivery Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <CheckSquare size={11} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">POD Summary</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>Captured</span><strong className="text-emerald-700">93%</strong></div>
            <div className="flex justify-between"><span>Pending Sync</span><strong className="text-amber-700">5%</strong></div>
            <div className="flex justify-between"><span>Missing</span><strong className="text-rose-700">2%</strong></div>
          </div>
        </div>

        {/* 8. Reverse Logistics Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <RotateCcw size={11} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Reverse Logistics</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>In Progress</span><strong className="text-ink">38</strong></div>
            <div className="flex justify-between"><span>Pending Pickup</span><strong className="text-amber-700">24</strong></div>
            <div className="flex justify-between"><span>In Transit</span><strong className="text-blue-700">10</strong></div>
          </div>
        </div>

        {/* 9. Logistics Claims Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <FileText size={11} className="text-rose-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Logistics Claims</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>Open Claims</span><strong className="text-ink">8</strong></div>
            <div className="flex justify-between"><span>Under Review</span><strong className="text-amber-700">4</strong></div>
            <div className="flex justify-between"><span>Approved</span><strong className="text-emerald-700">3</strong></div>
          </div>
        </div>

        {/* 10. Logistics Reconciliation Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-1 flex flex-col justify-between">
          <div className="flex items-center gap-1 border-b border-line pb-1">
            <Scale size={11} className="text-blue-600" />
            <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Reconciliation</h4>
          </div>
          <div className="space-y-0.5 text-[8.5px]">
            <div className="flex justify-between"><span>Pending Total</span><strong className="text-amber-700">LKR 1.2M</strong></div>
            <div className="flex justify-between"><span>COD Remittance</span><strong className="text-ink">LKR 850K</strong></div>
            <div className="flex justify-between"><span>Carrier Freight</span><strong className="text-ink">LKR 250K</strong></div>
          </div>
        </div>

        {/* 11. Recent Logistics Activity Summary */}
        <div className="bg-white rounded-xl border border-line shadow-xs p-2 space-y-0.5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-line pb-1">
            <div className="flex items-center gap-1">
              <Activity size={11} className="text-primary-900" />
              <h4 className="font-bold text-ink text-[9px] uppercase tracking-wider truncate">Recent Activity</h4>
            </div>
          </div>
          <div className="space-y-0.5 text-[8px]">
            {activityLogs.map((act, idx) => (
              <div key={idx} className="truncate text-muted flex justify-between">
                <span className="truncate">{act.title}</span>
                <span className="font-mono ml-1 flex-shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => alert("Viewing All Logistics Activity Logs...")}
            className="text-[8px] text-primary-900 hover:underline font-bold flex items-center gap-0.5 pt-0.5"
          >
            View All <ChevronRight size={8} />
          </button>
        </div>
      </div>
    </div>
  );
}
