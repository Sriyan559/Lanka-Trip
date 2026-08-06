"use client";

import React from "react";
import { AlertCircle, Clock, Copy, ShieldAlert, FileWarning } from "lucide-react";
import { MOCK_PRIORITY_ALERTS } from "@/data/importExport.mock";

interface DataOperationsIntelligenceSidebarProps {
  onFilterClick?: (type: string, value: string) => void;
  showToast: (msg: string) => void;
}

export function DataOperationsIntelligenceSidebar({
  onFilterClick,
  showToast,
}: DataOperationsIntelligenceSidebarProps) {
  const healthMetrics = [
    { label: "File Validation", val: 98 },
    { label: "Mapping Accuracy", val: 91 },
    { label: "Approval Readiness", val: 89 },
    { label: "Execution Control", val: 93 },
    { label: "Reconciliation", val: 95 },
    { label: "Export Reliability", val: 97 },
    { label: "Audit Compliance", val: 98 },
  ];

  const importSummary = [
    { label: "Draft", count: 52, pct: 15, color: "bg-slate-400" },
    { label: "Uploaded", count: 186, pct: 25, color: "bg-sky-500" },
    { label: "Validating", count: 248, pct: 35, color: "bg-sky-400" },
    { label: "Pending Approval", count: 312, pct: 45, color: "bg-amber-500" },
    { label: "Approved", count: 682, pct: 75, color: "bg-emerald-500" },
    { label: "Executed", count: 1120, pct: 90, color: "bg-emerald-600" },
    { label: "Reconciled", count: 1048, pct: 85, color: "bg-emerald-600" },
    { label: "Failed", count: 50, pct: 10, color: "bg-rose-500" },
  ];

  const exportSummary = [
    { label: "Draft", count: 58, pct: 15, color: "bg-slate-400" },
    { label: "Scheduled", count: 34, pct: 20, color: "bg-purple-500" },
    { label: "Running", count: 12, pct: 10, color: "bg-sky-500" },
    { label: "Delivered", count: 842, pct: 90, color: "bg-emerald-500" },
    { label: "Failed", count: 9, pct: 5, color: "bg-rose-500" },
    { label: "Expired", count: 6, pct: 4, color: "bg-slate-400" },
  ];

  const quickQueues = [
    { label: "Pending Review", count: "18", icon: Clock, tab: "Pending Review" },
    { label: "Failed Jobs", count: "9", icon: ShieldAlert, tab: "Failed" },
    { label: "Scheduled Exports", count: "34", icon: Clock, tab: "Scheduled" },
    { label: "High Priority Alerts", count: "5", icon: FileWarning, chip: "High Priority" },
    { label: "Review Conflicts", count: "76", icon: Copy, chip: "Conflicts" },
  ];

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* 1. Data Operations Health */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Data Operations Health
          </h4>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">
            Excellent
          </span>
        </div>

        {/* Health Score Circular Banner */}
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
                strokeDashoffset="7"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-ink font-mono">94</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-[12px]">94 / 100 Overall Health</span>
            <span className="text-[10px] text-muted">All integration feeds running normally</span>
          </div>
        </div>

        {/* Health Progress Metrics */}
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
          onClick={() => showToast("Opening Full Operations Health Dashboard...")}
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block w-full"
        >
          View full health dashboard &rarr;
        </button>
      </div>

      {/* 2. Priority Data Alerts */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Priority Data Alerts
          </h4>
          <button
            onClick={() => showToast("Showing all priority alerts...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-1.5">
          {MOCK_PRIORITY_ALERTS.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                if (onFilterClick && alert.jobId) onFilterClick("jobId", alert.jobId);
                showToast(`Focused alert: ${alert.text}`);
              }}
              className="flex items-center justify-between p-1.5 bg-slate-50 hover:bg-slate-100 rounded border border-slate-100 cursor-pointer transition-colors text-[10px]"
            >
              <div className="flex items-center gap-1.5 min-w-0 pr-1">
                <AlertCircle size={12} className="text-amber-600 flex-shrink-0" />
                <span className="font-semibold text-slate-700 truncate" title={alert.text}>
                  {alert.text}
                </span>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold flex-shrink-0 ${
                  alert.severity === "High"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Import Status Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Import Status Summary
        </h4>

        <div className="space-y-1.5">
          {importSummary.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[9.5px] mb-0.5">
                <span className="text-slate-600 font-medium">{item.label}</span>
                <span className="font-bold text-slate-800 font-mono">{item.count.toLocaleString()}</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-line flex justify-between text-[10px] font-bold text-slate-700">
          <span>Total Import Jobs</span>
          <span className="font-mono">3,698</span>
        </div>
      </div>

      {/* 4. Export Status Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Export Status Summary
        </h4>

        <div className="space-y-1.5">
          {exportSummary.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[9.5px] mb-0.5">
                <span className="text-slate-600 font-medium">{item.label}</span>
                <span className="font-bold text-slate-800 font-mono">{item.count}</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-line flex justify-between text-[10px] font-bold text-slate-700">
          <span>Total Export Jobs</span>
          <span className="font-mono">921</span>
        </div>
      </div>

      {/* 5. Processing Queue */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Processing Queue
        </h4>

        <div className="grid grid-cols-3 gap-2 text-center p-2 bg-slate-50 rounded border border-slate-100">
          <div>
            <span className="text-[9px] font-bold text-slate-500 uppercase block">Running Jobs</span>
            <span className="font-black text-slate-800 font-mono text-[14px]">32</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-500 uppercase block">Waiting Jobs</span>
            <span className="font-black text-slate-800 font-mono text-[14px]">18</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-500 uppercase block">Avg Runtime</span>
            <span className="font-black text-slate-800 font-mono text-[11px]">00:18:24</span>
          </div>
        </div>
      </div>

      {/* 6. Quick Queues */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Quick Queues
          </h4>
        </div>

        <div className="space-y-1">
          {quickQueues.map((q) => {
            const Icon = q.icon;
            return (
              <div
                key={q.label}
                onClick={() => {
                  if (onFilterClick && q.tab) onFilterClick("tab", q.tab);
                  showToast(`Opened quick queue: ${q.label}`);
                }}
                className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors text-[10px]"
              >
                <div className="flex items-center gap-1.5">
                  <Icon size={12} className="text-slate-500" />
                  <span className="font-semibold text-slate-700">{q.label}</span>
                </div>
                <span className="font-bold font-mono text-ink bg-slate-100 px-1.5 py-0.5 rounded text-[9.5px]">
                  {q.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
