"use client";

import React from "react";
import { AlertCircle, Clock, Copy, ShieldAlert, FileWarning, CheckCircle2 } from "lucide-react";
import { MOCK_PRIORITY_QUALITY_ALERTS } from "@/data/catalogueQuality.mock";

interface QualityOperationsSidebarProps {
  onFilterClick?: (type: string, value: string) => void;
  showToast: (msg: string) => void;
}

export function QualityOperationsSidebar({
  onFilterClick,
  showToast,
}: QualityOperationsSidebarProps) {
  const healthMetrics = [
    { label: "Duplicate Control", val: 86 },
    { label: "Data Completeness", val: 82 },
    { label: "Validation Coverage", val: 91 },
    { label: "Resolution Efficiency", val: 84 },
    { label: "Audit Compliance", val: 97 },
  ];

  const quickQueues = [
    { label: "Assigned to Me", count: "12", chip: "Assigned to Me" },
    { label: "Critical Issues", count: "42", chip: "Critical" },
    { label: "Pending Merge Review", count: "18", tab: "Duplicate Products" },
    { label: "Publication Blocked", count: "28", chip: "Publication Blocked" },
    { label: "Missing Mandatory Media", count: "124", issueType: "Missing Mandatory Media" },
  ];

  const severitySummary = [
    { label: "Critical", count: 42, pct: 3.4, color: "bg-rose-600" },
    { label: "High", count: 186, pct: 14.9, color: "bg-rose-500" },
    { label: "Medium", count: 682, pct: 54.6, color: "bg-amber-500" },
    { label: "Low", count: 338, pct: 27.1, color: "bg-slate-400" },
  ];

  const duplicateSummary = [
    { label: "Product Candidates", count: 186 },
    { label: "SKU Conflicts", count: 58 },
    { label: "Barcode Conflicts", count: 24 },
    { label: "Potential Duplicates", count: 164 },
    { label: "Merged This Month", count: 84 },
  ];

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* 1. Quality Operations Health */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Quality Operations Health
          </h4>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">
            Good
          </span>
        </div>

        {/* Circular Health Indicator */}
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
            <span className="font-bold text-slate-800 text-[12px]">89 / 100 Quality Health</span>
            <span className="text-[10px] text-muted">Catalogue data quality in healthy range</span>
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
          onClick={() => showToast("Opening Full Health Dashboard...")}
          className="mt-3 pt-2 border-t border-line text-[10px] font-bold text-[#671021] hover:underline text-left block w-full"
        >
          View full health dashboard &rarr;
        </button>
      </div>

      {/* 2. Priority Quality Alerts */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Priority Quality Alerts
          </h4>
          <button
            onClick={() => showToast("Showing all priority quality alerts...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-1.5">
          {MOCK_PRIORITY_QUALITY_ALERTS.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                if (onFilterClick && alert.caseId) onFilterClick("caseId", alert.caseId);
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

      {/* 3. Quick Queues */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Quick Queues
        </h4>

        <div className="space-y-1">
          {quickQueues.map((q) => (
            <div
              key={q.label}
              onClick={() => {
                if (onFilterClick) {
                  if (q.chip) onFilterClick("chip", q.chip);
                  else if (q.tab) onFilterClick("tab", q.tab);
                  else if (q.issueType) onFilterClick("issueType", q.issueType);
                }
                showToast(`Opened quick queue: ${q.label}`);
              }}
              className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded cursor-pointer transition-colors text-[10px]"
            >
              <span className="font-semibold text-slate-700">{q.label}</span>
              <span className="font-bold font-mono text-ink bg-slate-100 px-1.5 py-0.5 rounded text-[9.5px]">
                {q.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Severity Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono">
            Severity Summary
          </h4>
          <button
            onClick={() => showToast("Opening Severity Breakdown Details...")}
            className="text-[9.5px] font-bold text-[#671021] hover:underline"
          >
            View details
          </button>
        </div>

        <div className="space-y-1.5">
          {severitySummary.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[9.5px] mb-0.5">
                <span className="text-slate-600 font-medium">{item.label}</span>
                <div className="flex items-center gap-1 font-mono">
                  <span className="font-bold text-slate-800">{item.count}</span>
                  <span className="text-slate-400 text-[9px]">({item.pct}%)</span>
                </div>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.pct * 1.5}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-line flex justify-between text-[10px] font-bold text-slate-700">
          <span>Total Issues</span>
          <span className="font-mono">1,248</span>
        </div>
      </div>

      {/* 5. Duplicate Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          Duplicate Summary
        </h4>

        <div className="space-y-1.5 text-[10px]">
          {duplicateSummary.map((d) => (
            <div key={d.label} className="flex justify-between">
              <span className="text-slate-600">{d.label}</span>
              <span className="font-bold text-slate-800 font-mono">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. SLA Summary */}
      <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm text-[11px]">
        <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider font-mono mb-2">
          SLA Summary
        </h4>

        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between">
            <span className="text-slate-600">SLA Breaches</span>
            <span className="font-bold text-rose-600 font-mono">17</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">At Risk (Next 24h)</span>
            <span className="font-bold text-amber-600 font-mono">28</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">SLA Met</span>
            <span className="font-bold text-emerald-600 font-mono">1,020 (81.7%)</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-line font-bold text-slate-800">
            <span>SLA Compliance</span>
            <span className="font-mono text-emerald-600">89.3%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
