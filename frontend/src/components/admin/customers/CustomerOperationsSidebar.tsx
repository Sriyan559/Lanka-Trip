"use client";

import React from "react";
import { AlertCircle, Plus, ShieldAlert, Headphones, Download, Lock } from "lucide-react";
import { CustomerRightRailSectionData } from "@/types/customer";
import { MOCK_PRIORITY_ALERTS } from "@/data/customer.mock";

interface CustomerOperationsSidebarProps {
  data?: CustomerRightRailSectionData;
  onFilterClick?: (type: string, value: string) => void;
  onOpenAddCustomer?: () => void;
  onExportReport?: () => void;
  onActionClick?: (actionKey: string) => void;
  showToast?: (msg: string) => void;
}

export function CustomerOperationsSidebar({
  data,
  onFilterClick,
  onOpenAddCustomer,
  onExportReport,
  onActionClick,
  showToast = (msg: string) => console.log(msg),
}: CustomerOperationsSidebarProps) {
  const healthScore = data?.healthScore ?? 89;
  const healthGrade = data?.healthGrade ?? "Good / Stable";
  const healthTitle = data?.healthTitle ?? "Customer Operations Health";

  const healthMetrics = data?.healthBars ?? [
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

  const alerts = data?.alerts ?? MOCK_PRIORITY_ALERTS;
  const alertsTitle = data?.alertsTitle ?? "Priority Customer Alerts";

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* A. Health Scorecard Panel */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            {healthTitle}
          </h4>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">
            {healthGrade}
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
                strokeDashoffset={113 - (113 * healthScore) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[13px] font-black text-ink font-mono">{healthScore}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-[12px]">{healthScore} / 100 Health</span>
            <span className="text-[10px] text-muted">Customer operations in optimal range</span>
          </div>
        </div>

        {/* Health Metrics Progress Bars */}
        <div className="space-y-1.5">
          {healthMetrics.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[9.5px] mb-0.5">
                <span className="text-slate-600 font-medium truncate">{item.label}</span>
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
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#8F002B] hover:underline text-left block w-full"
        >
          View full health details &rarr;
        </button>
      </div>

      {/* B. Priority Alerts */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            {alertsTitle}
          </h4>
          <button
            onClick={() => showToast("Showing all priority customer alerts...")}
            className="text-[9.5px] font-bold text-[#8F002B] hover:underline"
          >
            View all alerts &rarr;
          </button>
        </div>

        <div className="space-y-1.5">
          {alerts.map((alert) => (
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
                {alert.count !== undefined && (
                  <span className="font-bold font-mono text-slate-700 text-[9.5px]">{alert.count}</span>
                )}
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

      {/* C. Dynamic Status Summaries */}
      {data?.summaries && data.summaries.length > 0 && (
        <div className="flex flex-col gap-3">
          {data.summaries.map((sec, idx) => (
            <div key={idx} className="bg-white border border-line rounded-lg p-3 shadow-sm text-[10px]">
              <h5 className="font-bold text-ink uppercase font-mono mb-2 text-[10px]">{sec.title}</h5>
              <div className="space-y-1">
                {sec.items.map((it, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-1.5">
                      {it.color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: it.color }} />}
                      <span className="text-slate-600">{it.label}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                      <span>{it.count}</span>
                      <span className="text-[9px] text-slate-400 font-normal">({it.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* D. Quick Queues */}
      {data?.quickQueues && (
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
              Quick Queues
            </h4>
            <button
              onClick={() => showToast("Opening operational queues...")}
              className="text-[9.5px] font-bold text-[#8F002B] hover:underline"
            >
              View all &rarr;
            </button>
          </div>

          <div className="space-y-1.5 text-[10px]">
            {data.quickQueues.map((q, idx) => (
              <div
                key={idx}
                onClick={() => onFilterClick?.("chip", q.label)}
                className="flex justify-between items-center p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors"
              >
                <span className="font-semibold text-slate-700">{q.label}</span>
                <span className="font-bold font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[9.5px]">
                  {q.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* E. Action Buttons Panel */}
      {data?.actions && (
        <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px] space-y-2">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-1">
            Final Actions
          </h4>

          {data.actions.map((act, idx) => {
            const isPrimary = act.primary || act.variant === "primary";
            const isDanger = act.variant === "danger";
            const isSecondary = act.variant === "secondary";

            let btnClass = "w-full h-8 rounded text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors ";
            if (isPrimary) {
              btnClass += "bg-[#8F002B] text-white hover:bg-[#720022] shadow-xs";
            } else if (isDanger) {
              btnClass += "bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100";
            } else if (isSecondary) {
              btnClass += "bg-slate-100 text-slate-700 hover:bg-slate-200";
            } else {
              btnClass += "bg-white border border-line text-slate-700 hover:bg-slate-50";
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  if (onActionClick && act.actionKey) onActionClick(act.actionKey);
                  else showToast(`Triggered action: ${act.label}`);
                }}
                className={btnClass}
              >
                {act.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
