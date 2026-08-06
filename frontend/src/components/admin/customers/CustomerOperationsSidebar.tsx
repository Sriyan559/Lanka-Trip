"use client";

import React from "react";
import { AlertCircle, Plus, ShieldAlert, Headphones, Download, Lock } from "lucide-react";
import { MOCK_PRIORITY_ALERTS } from "@/data/customer.mock";

interface CustomerOperationsSidebarProps {
  onFilterClick?: (type: string, value: string) => void;
  onOpenAddCustomer?: () => void;
  onExportReport?: () => void;
  showToast: (msg: string) => void;
}

export function CustomerOperationsSidebar({
  onFilterClick,
  onOpenAddCustomer = () => showToast("Opening Add Customer..."),
  onExportReport = () => showToast("Exporting Customer Operations Report..."),
  showToast,
}: CustomerOperationsSidebarProps) {
  const healthMetrics = [
    { label: "Identity & Verification", val: 88 },
    { label: "Engagement", val: 82 },
    { label: "Purchase Behaviour", val: 80 },
    { label: "Loyalty & Retention", val: 78 },
    { label: "Service Quality", val: 84 },
    { label: "Returns Management", val: 74 },
    { label: "Privacy Compliance", val: 90 },
    { label: "Fraud Risk Control", val: 87 },
    { label: "Operational Efficiency", val: 86 },
    { label: "Data Quality", val: 92 },
  ];

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* A. Customer Operations Health */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Customer Operations Health
          </h4>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">
            Good / Stable
          </span>
        </div>

        {/* Circular Health Score */}
        <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 mb-3">
          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="18" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
              <circle
                cx="24"
                cy="24"
                r="18"
                stroke="#059669"
                strokeWidth="4"
                strokeDasharray="113"
                strokeDashoffset="12"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-ink font-mono">89</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-[12px]">89 / 100 Health</span>
            <span className="text-[10px] text-muted">Customer operations in optimal range</span>
          </div>
        </div>

        {/* Health Metrics Progress Bars */}
        <div className="space-y-1.5">
          {healthMetrics.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[9.5px] mb-0.5">
                <span className="text-slate-600 font-medium">{item.label}</span>
                <span className="font-bold text-slate-800 font-mono">{item.val}%</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.val}%` }} />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => showToast("Opening Full Customer Health Dashboard...")}
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block w-full"
        >
          View full health dashboard &rarr;
        </button>
      </div>

      {/* B. Priority Customer Alerts */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Priority Customer Alerts
          </h4>
          <button
            onClick={() => showToast("Showing all priority customer alerts...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-1.5">
          {MOCK_PRIORITY_ALERTS.map((alert) => (
            <div
              key={alert.id}
              onClick={() => showToast(`Focused alert: ${alert.text}`)}
              className="flex items-center justify-between p-1.5 bg-slate-50 hover:bg-slate-100 rounded border border-slate-100 cursor-pointer transition-colors text-[10px]"
            >
              <div className="flex items-center gap-1.5 min-w-0 pr-1">
                <AlertCircle size={12} className="text-amber-600 flex-shrink-0" />
                <span className="font-semibold text-slate-700 truncate" title={alert.text}>
                  {alert.text}
                </span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="font-bold font-mono text-slate-700 text-[9.5px]">{alert.count}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                    alert.severity === "High"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* C & D. Status & Verification Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[10px]">
          <h5 className="font-bold text-ink uppercase font-mono mb-2 text-[10px]">C. Status Summary</h5>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Active</span><span className="font-bold font-mono text-emerald-600">142.7K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Dormant</span><span className="font-bold font-mono text-amber-600">18.4K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Restricted</span><span className="font-bold font-mono text-rose-600">428</span></div>
          </div>
        </div>

        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[10px]">
          <h5 className="font-bold text-ink uppercase font-mono mb-2 text-[10px]">D. Verification Summary</h5>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Verified</span><span className="font-bold font-mono text-emerald-600">128.5K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Pending</span><span className="font-bold font-mono text-amber-600">6.2K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Unverified</span><span className="font-bold font-mono text-slate-600">51.7K</span></div>
          </div>
        </div>
      </div>

      {/* E & F. Loyalty & Service Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[10px]">
          <h5 className="font-bold text-ink uppercase font-mono mb-2 text-[10px]">E. Loyalty Summary</h5>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Members</span><span className="font-bold font-mono text-purple-700">84.3K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Redemptions</span><span className="font-bold font-mono text-slate-800">12.5K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Points Issued</span><span className="font-bold font-mono text-slate-800">9.6M</span></div>
          </div>
        </div>

        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[10px]">
          <h5 className="font-bold text-ink uppercase font-mono mb-2 text-[10px]">F. Service & Dispute</h5>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Open Cases</span><span className="font-bold font-mono text-rose-600">1.2K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Returns</span><span className="font-bold font-mono text-amber-600">842</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Disputes</span><span className="font-bold font-mono text-slate-800">412</span></div>
          </div>
        </div>
      </div>

      {/* G & H. Risk & Consent Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[10px]">
          <h5 className="font-bold text-ink uppercase font-mono mb-2 text-[10px]">G. Risk & Privacy</h5>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">High Risk</span><span className="font-bold font-mono text-rose-600">2.3K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Medium Risk</span><span className="font-bold font-mono text-amber-600">8.6K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Restricted</span><span className="font-bold font-mono text-slate-800">420</span></div>
          </div>
        </div>

        <div className="bg-white border border-line rounded-lg p-3 shadow-sm text-[10px]">
          <h5 className="font-bold text-ink uppercase font-mono mb-2 text-[10px]">H. Consent Summary</h5>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-slate-500">Consented</span><span className="font-bold font-mono text-emerald-600">154.3K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Pending</span><span className="font-bold font-mono text-amber-600">18.3K</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Revoked</span><span className="font-bold font-mono text-rose-600">13.8K</span></div>
          </div>
        </div>
      </div>

      {/* I. Quick Queues */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            I. Quick Queues
          </h4>
          <button
            onClick={() => showToast("Opening all customer queues...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View all queues &rarr;
          </button>
        </div>

        <div className="space-y-1.5 text-[10px]">
          <div
            onClick={() => onFilterClick?.("chip", "Verification Pending")}
            className="flex justify-between p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors"
          >
            <span className="font-semibold text-slate-700">Verification Queue</span>
            <span className="font-bold font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[9.5px]">
              6.2K
            </span>
          </div>

          <div
            onClick={() => onFilterClick?.("tab", "Service Cases")}
            className="flex justify-between p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors"
          >
            <span className="font-semibold text-slate-700">Open Cases Queue</span>
            <span className="font-bold font-mono text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[9.5px]">
              1.2K
            </span>
          </div>

          <div
            onClick={() => onFilterClick?.("tab", "Returns & Disputes")}
            className="flex justify-between p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors"
          >
            <span className="font-semibold text-slate-700">Returns Queue</span>
            <span className="font-bold font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[9.5px]">
              842
            </span>
          </div>

          <div
            onClick={() => onFilterClick?.("tab", "Privacy Requests")}
            className="flex justify-between p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors"
          >
            <span className="font-semibold text-slate-700">Privacy Requests Queue</span>
            <span className="font-bold font-mono text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded text-[9.5px]">
              126
            </span>
          </div>
        </div>
      </div>

      {/* J. Final Customer Actions */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px] space-y-2">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-1">
          J. Final Customer Actions
        </h4>

        <button
          onClick={() => showToast("Opening Customer Risk Review...")}
          className="w-full h-8 rounded border border-rose-200 bg-rose-50 text-rose-700 font-bold text-[11px] hover:bg-rose-100 flex items-center justify-center gap-1.5 transition-colors"
        >
          <ShieldAlert size={14} /> Review Customer Risks
        </button>

        <button
          onClick={onOpenAddCustomer}
          className="w-full h-8 rounded bg-[#671021] text-white font-bold text-[11px] hover:bg-[#520d1a] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus size={14} /> Add Customer
        </button>

        <button
          onClick={() => showToast("Opening Support Queue...")}
          className="w-full h-8 rounded border border-line bg-white text-slate-700 font-bold text-[11px] hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Headphones size={14} /> Open Service Queue
        </button>

        <button
          onClick={onExportReport}
          className="w-full h-8 rounded border border-line bg-white text-slate-700 font-bold text-[11px] hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Download size={14} /> Export Customer Operations Report
        </button>

        <button
          onClick={() => showToast("Opening Privacy Requests Manager...")}
          className="w-full h-8 rounded border border-line bg-white text-slate-700 font-bold text-[11px] hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Lock size={14} /> Review Privacy Requests
        </button>
      </div>
    </div>
  );
}
