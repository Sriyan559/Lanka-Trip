"use client";

import React from "react";
import {
  Send, ShieldCheck, AlertTriangle, Clock, Link as LinkIcon, Activity, FileText, CheckCircle2, ChevronRight
} from "lucide-react";

export function FulfilmentBottomPanels() {
  const readinessChecklistLeft = [
    { label: "Inventory Allocation Complete", value: "Yes", type: "success" },
    { label: "Picking Complete", value: "Yes", type: "success" },
    { label: "Packing Complete", value: "No (Partial)", type: "danger" },
    { label: "Quality Passed", value: "No (Pending)", type: "danger" },
    { label: "Shipment Eligible", value: "No", type: "danger" },
    { label: "Delivery Address Valid", value: "Yes", type: "success" },
  ];

  const readinessChecklistRight = [
    { label: "Carrier Service Available", value: "Pending", type: "warning" },
    { label: "Documents Ready", value: "No", type: "danger" },
    { label: "Label Printed", value: "No", type: "danger" },
    { label: "No Blocking Hold", value: "Yes", type: "success" },
    { label: "No Critical Exception", value: "Yes", type: "success" },
  ];

  const slaItems = [
    { type: "Allocation SLA", target: "30m", actual: "18m", remaining: "12m", status: "Met" },
    { type: "Picking SLA", target: "2h", actual: "1h 30m", remaining: "30m", status: "Met" },
    { type: "Packing SLA", target: "2h", actual: "1h 45m", remaining: "15m", status: "Met" },
    { type: "Quality SLA", target: "1h", actual: "35m", remaining: "25m", status: "At Risk" },
    { type: "Dispatch SLA", target: "3h", actual: "0m", remaining: "-", status: "Pending" },
  ];

  const activities = [
    { title: "Quality check started", user: "Dilini R.", time: "May 26 12:15 PM" },
    { title: "Packing in progress", user: "Udari K.", time: "May 26 12:05 PM" },
    { title: "Picking completed", user: "Kasun P.", time: "May 26 11:35 AM" },
    { title: "Picking started", user: "Kasun P.", time: "May 26 10:45 AM" },
    { title: "Allocation completed", user: "System", time: "May 26 10:28 AM" },
  ];

  const getCheckStyle = (type: string) => {
    switch (type) {
      case "success": return "text-emerald-700 font-bold";
      case "warning": return "text-amber-700 font-bold";
      case "danger": return "text-rose-700 font-bold";
      default: return "text-muted";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-3 text-xs">
      {/* 1. DISPATCH READINESS (2 Cols / xl:col-span-2) */}
      <div className="bg-white p-3.5 rounded-xl border border-line shadow-sm space-y-3 flex flex-col justify-between xl:col-span-2">
        <div>
          <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider border-b border-line pb-1.5 flex items-center gap-1.5">
            <Send size={14} className="text-primary-900" /> Dispatch Readiness
          </h4>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] mt-2">
            <div className="space-y-1">
              {readinessChecklistLeft.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-muted">{item.label}:</span>
                  <span className={getCheckStyle(item.type)}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              {readinessChecklistRight.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-muted">{item.label}:</span>
                  <span className={getCheckStyle(item.type)}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OVERALL STATUS BANNER */}
        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-center font-bold text-rose-800 flex items-center justify-between text-xs">
          <span>Overall Status</span>
          <span className="bg-rose-600 text-white px-2.5 py-0.5 rounded uppercase tracking-wider text-[11px]">
            NOT READY FOR DISPATCH
          </span>
        </div>
      </div>

      {/* 2. HOLDS PANEL (1 Col) */}
      <div className="bg-white p-3.5 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider border-b border-line pb-1.5 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-600" /> Holds
        </h4>

        <div className="flex flex-col items-center justify-center text-center py-4 space-y-1 my-auto">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
          <div className="font-bold text-ink text-xs mt-1">No Active Hold</div>
          <div className="text-[10px] text-muted max-w-[140px] leading-tight">
            There are no active holds on this order.
          </div>
        </div>
      </div>

      {/* 3. EXCEPTIONS PANEL (1 Col) */}
      <div className="bg-white p-3.5 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-line pb-1.5">
            <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-rose-600" /> Exceptions
            </h4>
            <span className="text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded font-bold border border-rose-200">
              1 Exception
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] mt-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted uppercase">
              <span>Severity</span>
              <span>Type</span>
              <span>Message</span>
              <span>Raised By</span>
              <span>Status</span>
            </div>
            <div className="p-2 bg-canvas border border-line rounded flex items-center justify-between gap-1 text-[10px]">
              <span className="font-bold text-amber-700">Low</span>
              <span className="text-muted">Quality</span>
              <span className="font-medium text-ink truncate max-w-[80px]">Awaiting quality sign-off</span>
              <span className="text-muted">Dilini R.</span>
              <span className="font-bold text-rose-700">Open</span>
            </div>
          </div>
        </div>

        <button onClick={() => alert("Viewing Exceptions...")} className="text-[10px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View All Exceptions <ChevronRight size={10} />
        </button>
      </div>

      {/* 4. SLA DETAILS (1 Col) */}
      <div className="bg-white p-3.5 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider border-b border-line pb-1.5 flex items-center gap-1.5">
            <Clock size={14} className="text-purple-600" /> SLA Details
          </h4>

          <div className="space-y-1 text-[10px] mt-2">
            <div className="grid grid-cols-5 font-bold text-muted uppercase border-b border-line pb-1">
              <span>SLA Type</span>
              <span className="text-center">Target</span>
              <span className="text-center">Actual</span>
              <span className="text-center">Remaining</span>
              <span className="text-right">Status</span>
            </div>
            {slaItems.map((s, i) => (
              <div key={i} className="grid grid-cols-5 items-center py-0.5">
                <span className="font-medium text-ink truncate">{s.type.replace(" SLA", "")}</span>
                <span className="text-center text-muted font-mono">{s.target}</span>
                <span className="text-center text-muted font-mono">{s.actual}</span>
                <span className="text-center text-muted font-mono">{s.remaining}</span>
                <span className="text-right">
                  <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                    s.status === 'Met' ? 'text-emerald-800 bg-emerald-50' : s.status === 'At Risk' ? 'text-amber-800 bg-amber-50' : 'text-gray-600 bg-gray-100'
                  }`}>
                    {s.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-line flex items-center justify-between text-[11px]">
          <span className="text-muted font-semibold">Overall Fulfilment SLA:</span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-muted text-[10px]">6h / 5h 10m / 50m</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[10px]">
              On Track
            </span>
          </div>
        </div>
      </div>

      {/* 5. LINKED RECORDS (1 Col) */}
      <div className="bg-white p-3.5 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider border-b border-line pb-1.5 flex items-center gap-1.5">
            <LinkIcon size={14} className="text-blue-600" /> Linked Records
          </h4>

          <div className="space-y-1 text-[11px] mt-2">
            <div className="flex justify-between"><span className="text-muted">Marketplace Order:</span><strong className="font-mono text-blue-700">ORD-2026-500812</strong></div>
            <div className="flex justify-between"><span className="text-muted">Customer:</span><span className="font-mono text-muted">CUST-1000231</span></div>
            <div className="flex justify-between"><span className="text-muted">Supplier:</span><span className="font-mono text-muted">SUP-GLW-001</span></div>
            <div className="flex justify-between"><span className="text-muted">Warehouse:</span><span className="text-ink font-semibold">FC Colombo Central</span></div>
            <div className="flex justify-between"><span className="text-muted">Reservations:</span><span className="font-mono text-muted">RES-0526-1781</span></div>
            <div className="flex justify-between"><span className="text-muted">Transfers:</span><span className="font-mono text-muted">TRF-0526-3321</span></div>
            <div className="flex justify-between"><span className="text-muted">Shipment:</span><span className="text-muted italic">-</span></div>
            <div className="flex justify-between"><span className="text-muted">Exception Record:</span><span className="font-mono text-rose-700 font-semibold">EXC-0526-1157</span></div>
            <div className="flex justify-between"><span className="text-muted">Claim Record:</span><span className="text-muted italic">-</span></div>
          </div>
        </div>

        <button onClick={() => alert("Viewing Linked Records...")} className="text-[10px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View All Linked Records <ChevronRight size={10} />
        </button>
      </div>

      {/* 6. COMMUNICATIONS / ACTIVITY (1 Col) */}
      <div className="bg-white p-3.5 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider border-b border-line pb-1.5 flex items-center gap-1.5">
            <Activity size={14} className="text-primary-900" /> Communications / Activity
          </h4>

          <div className="space-y-1.5 text-[10px] mt-2">
            {activities.map((act, idx) => (
              <div key={idx} className="border-l-2 border-l-primary-900 pl-2 py-0.5 space-y-0.5">
                <div className="font-bold text-ink leading-tight">{act.title}</div>
                <div className="text-muted flex justify-between text-[9px]">
                  <span>{act.user}</span>
                  <span className="font-mono">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => alert("Viewing Activity Logs...")} className="text-[10px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View All Activity <ChevronRight size={10} />
        </button>
      </div>

      {/* 7. AUDIT SUMMARY (1 Col) */}
      <div className="bg-white p-3.5 rounded-xl border border-line shadow-sm space-y-2 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[11px] uppercase tracking-wider border-b border-line pb-1.5 flex items-center gap-1.5">
            <FileText size={14} className="text-muted" /> Audit Summary
          </h4>

          <div className="space-y-1 text-[11px] mt-2">
            <div className="flex justify-between"><span className="text-muted">Created By:</span><span className="text-ink font-medium">Nuwan W.</span></div>
            <div className="flex justify-between"><span className="text-muted">Created At:</span><span className="text-muted text-[10px]">May 26 2025 10:00 AM</span></div>
            <div className="flex justify-between"><span className="text-muted">Updated By:</span><span className="text-ink font-medium">Manjula K.</span></div>
            <div className="flex justify-between"><span className="text-muted">Updated At:</span><span className="text-muted text-[10px]">May 26 2025 12:15 PM</span></div>
            <div className="flex justify-between"><span className="text-muted">Last Action:</span><span className="text-ink font-semibold">Quality Check Started</span></div>
            <div className="flex justify-between"><span className="text-muted">Workflow Stage:</span><span className="text-blue-700 font-semibold">Quality Check</span></div>
            <div className="flex justify-between items-center pt-1 border-t border-line">
              <span className="text-muted font-medium">Compliance:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[10px] flex items-center gap-0.5">
                <CheckCircle2 size={10} /> Compliant
              </span>
            </div>
          </div>
        </div>

        <button onClick={() => alert("Viewing Audit Trail...")} className="text-[10px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View Audit Trail <ChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}
