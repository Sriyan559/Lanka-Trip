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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2 text-[10px]">
      {/* 1. DISPATCH READINESS */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1 flex items-center gap-1">
            <Send size={12} className="text-primary-900" /> Dispatch Readiness
          </h4>

          <div className="space-y-0.5 text-[9px] mt-1.5">
            {readinessChecklistLeft.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-muted truncate max-w-[100px]">{item.label}:</span>
                <span className={getCheckStyle(item.type)}>{item.value}</span>
              </div>
            ))}
            {readinessChecklistRight.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-muted truncate max-w-[100px]">{item.label}:</span>
                <span className={getCheckStyle(item.type)}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* OVERALL STATUS BANNER */}
        <div className="p-1.5 bg-rose-50 border border-rose-200 rounded text-center font-bold text-rose-800 flex items-center justify-between text-[9px] mt-2">
          <span>Status</span>
          <span className="bg-rose-600 text-white px-1.5 py-0.2 rounded uppercase tracking-wider text-[8px]">
            NOT READY FOR DISPATCH
          </span>
        </div>
      </div>

      {/* 2. HOLDS PANEL */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1 flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald-600" /> Holds
        </h4>

        <div className="flex flex-col items-center justify-center text-center py-3 space-y-1 my-auto">
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={16} />
          </div>
          <div className="font-bold text-ink text-[10px] mt-0.5">No Active Hold</div>
          <div className="text-[8.5px] text-muted max-w-[120px] leading-tight">
            There are no active holds on this order.
          </div>
        </div>
      </div>

      {/* 3. EXCEPTIONS PANEL */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-line pb-1">
            <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle size={12} className="text-rose-600" /> Exceptions
            </h4>
            <span className="text-[8.5px] text-rose-700 bg-rose-50 px-1 py-0.1 rounded font-bold border border-rose-200">
              1 Exception
            </span>
          </div>

          <div className="space-y-1 text-[9px] mt-1.5">
            <div className="p-1.5 bg-canvas border border-line rounded space-y-0.5 text-[8.5px]">
              <div className="flex justify-between"><span>Severity:</span><strong className="text-amber-700 font-bold">Low</strong></div>
              <div className="flex justify-between"><span>Type:</span><span className="text-muted">Quality</span></div>
              <div className="flex justify-between"><span>Message:</span><span className="font-medium text-ink truncate max-w-[80px]">Awaiting quality sign-off</span></div>
              <div className="flex justify-between"><span>Raised By:</span><span className="text-muted">Dilini R.</span></div>
              <div className="flex justify-between"><span>Status:</span><strong className="text-rose-700 font-bold">Open</strong></div>
            </div>
          </div>
        </div>

        <button onClick={() => alert("Viewing Exceptions...")} className="text-[8.5px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View All Exceptions <ChevronRight size={9} />
        </button>
      </div>

      {/* 4. SLA DETAILS */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1 flex items-center gap-1">
            <Clock size={12} className="text-purple-600" /> SLA Details
          </h4>

          <div className="space-y-0.5 text-[8.5px] mt-1.5">
            <div className="grid grid-cols-5 font-bold text-muted uppercase border-b border-line pb-0.5 text-[7.5px]">
              <span>Type</span>
              <span className="text-center">Tgt</span>
              <span className="text-center">Act</span>
              <span className="text-center">Rem</span>
              <span className="text-right">Sts</span>
            </div>
            {slaItems.map((s, i) => (
              <div key={i} className="grid grid-cols-5 items-center py-0.5">
                <span className="font-medium text-ink truncate">{s.type.replace(" SLA", "")}</span>
                <span className="text-center text-muted font-mono">{s.target}</span>
                <span className="text-center text-muted font-mono">{s.actual}</span>
                <span className="text-center text-muted font-mono">{s.remaining}</span>
                <span className="text-right">
                  <span className={`px-1 py-0.1 rounded text-[7.5px] font-bold ${
                    s.status === 'Met' ? 'text-emerald-800 bg-emerald-50' : s.status === 'At Risk' ? 'text-amber-800 bg-amber-50' : 'text-gray-600 bg-gray-100'
                  }`}>
                    {s.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-1 border-t border-line flex items-center justify-between text-[9px]">
          <span className="text-muted font-semibold">Overall SLA:</span>
          <span className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 text-[8.5px]">
            On Track
          </span>
        </div>
      </div>

      {/* 5. LINKED RECORDS */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1 flex items-center gap-1">
            <LinkIcon size={12} className="text-blue-600" /> Linked Records
          </h4>

          <div className="space-y-0.5 text-[9px] mt-1.5">
            <div className="flex justify-between"><span>Order:</span><strong className="font-mono text-blue-700 text-[8.5px]">ORD-2026-500812</strong></div>
            <div className="flex justify-between"><span>Customer:</span><span className="font-mono text-muted text-[8.5px]">CUST-1000231</span></div>
            <div className="flex justify-between"><span>Supplier:</span><span className="font-mono text-muted text-[8.5px]">SUP-GLW-001</span></div>
            <div className="flex justify-between"><span>Warehouse:</span><span className="text-ink font-semibold truncate max-w-[70px]">FC Colombo</span></div>
            <div className="flex justify-between"><span>Reservations:</span><span className="font-mono text-muted text-[8.5px]">RES-0526-1781</span></div>
            <div className="flex justify-between"><span>Transfers:</span><span className="font-mono text-muted text-[8.5px]">TRF-0526-3321</span></div>
            <div className="flex justify-between"><span>Shipment:</span><span className="text-muted italic">-</span></div>
            <div className="flex justify-between"><span>Exception:</span><span className="font-mono text-rose-700 font-semibold text-[8.5px]">EXC-0526-1157</span></div>
          </div>
        </div>

        <button onClick={() => alert("Viewing Linked Records...")} className="text-[8.5px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View All Linked Records <ChevronRight size={9} />
        </button>
      </div>

      {/* 6. COMMUNICATIONS / ACTIVITY */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1 flex items-center gap-1">
            <Activity size={12} className="text-primary-900" /> Communications / Activity
          </h4>

          <div className="space-y-1 text-[9px] mt-1.5">
            {activities.map((act, idx) => (
              <div key={idx} className="border-l-2 border-l-primary-900 pl-1.5 py-0.5 space-y-0.2">
                <div className="font-bold text-ink leading-tight truncate">{act.title}</div>
                <div className="text-muted flex justify-between text-[8px]">
                  <span>{act.user}</span>
                  <span className="font-mono">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => alert("Viewing Activity Logs...")} className="text-[8.5px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View All Activity <ChevronRight size={9} />
        </button>
      </div>

      {/* 7. AUDIT SUMMARY */}
      <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs space-y-1.5 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-ink text-[10px] uppercase tracking-wider border-b border-line pb-1 flex items-center gap-1">
            <FileText size={12} className="text-muted" /> Audit Summary
          </h4>

          <div className="space-y-0.5 text-[9px] mt-1.5">
            <div className="flex justify-between"><span>Created By:</span><span className="text-ink font-semibold">Nuwan W.</span></div>
            <div className="flex justify-between"><span>Created At:</span><span className="text-muted text-[8.5px]">May 26 10:00</span></div>
            <div className="flex justify-between"><span>Updated By:</span><span className="text-ink font-semibold">Manjula K.</span></div>
            <div className="flex justify-between"><span>Updated At:</span><span className="text-muted text-[8.5px]">May 26 12:15</span></div>
            <div className="flex justify-between"><span>Last Action:</span><span className="text-ink font-semibold truncate max-w-[70px]">Quality Check</span></div>
            <div className="flex justify-between"><span>Workflow Stage:</span><span className="text-blue-700 font-semibold">Quality Check</span></div>
            <div className="flex justify-between items-center pt-1 border-t border-line">
              <span className="text-muted font-medium">Compliance:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-1 py-0.1 rounded border border-emerald-200 text-[8.5px] flex items-center gap-0.5">
                <CheckCircle2 size={9} /> Compliant
              </span>
            </div>
          </div>
        </div>

        <button onClick={() => alert("Viewing Audit Trail...")} className="text-[8.5px] text-primary-900 font-bold hover:underline flex items-center gap-0.5 pt-1">
          View Audit Trail <ChevronRight size={9} />
        </button>
      </div>
    </div>
  );
}
