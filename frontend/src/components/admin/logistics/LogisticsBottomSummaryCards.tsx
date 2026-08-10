"use client";

import React from "react";
import { 
  Workflow, Boxes, Warehouse, Truck, Award, ShieldAlert, CheckSquare, RotateCcw, FileText, Scale, Activity, CheckCircle2, AlertTriangle, Clock
} from "lucide-react";

export function LogisticsBottomSummaryCards() {
  const activityLogs = [
    { time: "10:15 AM", title: "Shipment SHP-99201 status updated to In Transit", user: "DHL Logistics Gateway", badge: "Status Update" },
    { time: "09:45 AM", title: "Carrier pickup collected by DHL Express at DC-01 Main Hub", user: "Kamal Wickrama", badge: "Pickup Collected" },
    { time: "09:20 AM", title: "Out-for-delivery status changed for Order ORD-884910", user: "Delivery System", badge: "Out for Delivery" },
    { time: "08:50 AM", title: "Return pickup scheduled for Return RET-1044", user: "Nimal Silva", badge: "Return Scheduled" },
    { time: "08:15 AM", title: "Logistics reconciliation batch created for May 2025 Period", user: "Finance Audit Gateway", badge: "Reconciliation Batch" },
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* 10 OPERATIONAL PANELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        {/* 1. Fulfilment Order Workflow */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Workflow size={16} className="text-blue-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Fulfilment Order Workflow</h4>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between font-semibold"><span className="text-muted">Total Active:</span><span>1,248</span></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: "70%" }} title="On Track (70%)" />
              <div className="bg-amber-500 h-full" style={{ width: "15%" }} title="At Risk (15%)" />
              <div className="bg-orange-500 h-full" style={{ width: "10%" }} title="Delayed (10%)" />
              <div className="bg-rose-600 h-full" style={{ width: "5%" }} title="Exception (5%)" />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-muted pt-1">
              <span>On Track: <strong className="text-emerald-700">873</strong></span>
              <span>At Risk: <strong className="text-amber-700">187</strong></span>
              <span>Delayed: <strong className="text-orange-700">125</strong></span>
              <span>Blocked/Ex: <strong className="text-rose-700">63</strong></span>
            </div>
          </div>
        </div>

        {/* 2. Inventory Allocation Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Boxes size={16} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Inventory Allocation</h4>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between font-semibold"><span className="text-muted">Total Records:</span><span>1,332</span></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex">
              <div className="bg-purple-600 h-full" style={{ width: "82%" }} />
              <div className="bg-blue-500 h-full" style={{ width: "12%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "6%" }} />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-muted pt-1">
              <span>Auto Allocated: <strong className="text-ink">1,092</strong></span>
              <span>Manual: <strong className="text-ink">156</strong></span>
              <span>Failed: <strong className="text-rose-700">84</strong></span>
              <span>Backordered: <strong className="text-muted">0</strong></span>
            </div>
          </div>
        </div>

        {/* 3. Warehouse Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Warehouse size={16} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Warehouse Operations</h4>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between font-semibold"><span className="text-muted">Avg Capacity Used:</span><span className="text-emerald-700 font-bold">82%</span></div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: "82%" }} />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-muted pt-1">
              <span>Hubs Active: <strong className="text-ink">3 Hubs</strong></span>
              <span>Capacity &gt;80%: <strong className="text-amber-700">2 Hubs</strong></span>
              <span>Critical &gt;95%: <strong className="text-rose-700">1 Hub</strong></span>
              <span>Pickers Active: <strong className="text-ink">48</strong></span>
            </div>
          </div>
        </div>

        {/* 4. Shipment Operations Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Truck size={16} className="text-sky-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Shipment Operations</h4>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between font-semibold"><span className="text-muted">In Transit Total:</span><span>286</span></div>
            <div className="w-full bg-canvas border border-line rounded-full h-2 overflow-hidden flex">
              <div className="bg-sky-500 h-full" style={{ width: "85%" }} />
              <div className="bg-amber-500 h-full" style={{ width: "10%" }} />
              <div className="bg-rose-500 h-full" style={{ width: "5%" }} />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-muted pt-1">
              <span>On Time: <strong className="text-emerald-700">243</strong></span>
              <span>At Risk: <strong className="text-amber-700">28</strong></span>
              <span>Delayed: <strong className="text-rose-700">15</strong></span>
              <span>Lost/Claim: <strong className="text-muted">0</strong></span>
            </div>
          </div>
        </div>

        {/* 5. Carrier Performance */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Award size={16} className="text-amber-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Carrier Performance</h4>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span>DHL Express</span><strong className="text-emerald-700">96% On-Time</strong></div>
            <div className="flex justify-between"><span>PickMe Flash</span><strong className="text-emerald-700">92% On-Time</strong></div>
            <div className="flex justify-between"><span>Aramex Lanka</span><strong className="text-emerald-700">94% On-Time</strong></div>
            <div className="flex justify-between"><span>Mint Delivery</span><strong className="text-amber-700">89% On-Time</strong></div>
          </div>
        </div>

        {/* 6. Delivery SLA & Exceptions */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <ShieldAlert size={16} className="text-rose-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Delivery SLA &amp; Exceptions</h4>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span>On Track</span><strong className="text-emerald-700">91% (1,135)</strong></div>
            <div className="flex justify-between"><span>At Risk</span><strong className="text-amber-700">8% (101)</strong></div>
            <div className="flex justify-between"><span>SLA Breached</span><strong className="text-rose-700">1% (12)</strong></div>
          </div>
        </div>

        {/* 7. Proof of Delivery Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <CheckSquare size={16} className="text-emerald-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Proof of Delivery (POD)</h4>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span>Captured / Signed</span><strong className="text-emerald-700">93% (783)</strong></div>
            <div className="flex justify-between"><span>Pending Sync</span><strong className="text-amber-700">5% (42)</strong></div>
            <div className="flex justify-between"><span>Failed / Missing</span><strong className="text-rose-700">2% (17)</strong></div>
          </div>
        </div>

        {/* 8. Reverse Logistics Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <RotateCcw size={16} className="text-purple-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Reverse Logistics</h4>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span>Returns in Progress</span><strong className="text-ink">38</strong></div>
            <div className="flex justify-between"><span>Pickup Pending</span><strong className="text-amber-700">24</strong></div>
            <div className="flex justify-between"><span>In Transit Return</span><strong className="text-blue-700">10</strong></div>
            <div className="flex justify-between"><span>Received Hub</span><strong className="text-emerald-700">4</strong></div>
          </div>
        </div>

        {/* 9. Logistics Claims Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <FileText size={16} className="text-rose-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Logistics Claims</h4>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span>Open Claims</span><strong className="text-ink">8</strong></div>
            <div className="flex justify-between"><span>Under Review</span><strong className="text-amber-700">4</strong></div>
            <div className="flex justify-between"><span>Approved</span><strong className="text-emerald-700">3</strong></div>
            <div className="flex justify-between"><span>Rejected</span><strong className="text-muted">1</strong></div>
          </div>
        </div>

        {/* 10. Logistics Reconciliation Summary */}
        <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Scale size={16} className="text-blue-600" />
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider">Logistics Reconciliation</h4>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span>Pending Total</span><strong className="text-amber-700">LKR 1.2M</strong></div>
            <div className="flex justify-between"><span>COD Remittance</span><strong className="text-ink">LKR 850K</strong></div>
            <div className="flex justify-between"><span>Carrier Freight</span><strong className="text-ink">LKR 250K</strong></div>
            <div className="flex justify-between"><span>Adjustments</span><strong className="text-muted">LKR 100K</strong></div>
          </div>
        </div>
      </div>

      {/* 11. RECENT LOGISTICS ACTIVITY STREAM */}
      <div className="bg-white rounded-xl border border-line shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-primary-900" />
            <h3 className="text-[12px] font-bold text-ink uppercase tracking-wider">Recent Logistics Activity</h3>
          </div>
          <span className="text-[11px] text-muted">Real-time System &amp; Carrier Audit Log</span>
        </div>

        <div className="divide-y divide-line">
          {activityLogs.map((log, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-canvas px-2 rounded transition-colors">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-muted w-14 flex-shrink-0">{log.time}</span>
                <div className="font-medium text-ink">{log.title}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted">by <strong className="text-ink font-semibold">{log.user}</strong></span>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-canvas border border-line text-muted">
                  {log.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
