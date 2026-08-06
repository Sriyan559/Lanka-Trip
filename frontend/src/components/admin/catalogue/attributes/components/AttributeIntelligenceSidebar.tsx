"use client";

import React from "react";
import {
  AlertTriangle, ShieldCheck, CheckCircle2, Copy, Barcode,
  HelpCircle, ImageOff, ChevronRight, Zap,
} from "lucide-react";

interface AttributeIntelligenceSidebarProps {
  onSelectQueue: (queueKey: string) => void;
}

export const AttributeIntelligenceSidebar: React.FC<AttributeIntelligenceSidebarProps> = ({
  onSelectQueue,
}) => {
  const healthMetrics = [
    { label: "Completeness", pct: 91, color: "emerald" },
    { label: "Validation", pct: 88, color: "emerald" },
    { label: "Variant Readiness", pct: 86, color: "emerald" },
    { label: "Coverage", pct: 89, color: "emerald" },
    { label: "Publication", pct: 87, color: "emerald" },
  ];

  const statusSummary = [
    { label: "Active", count: 1521, pct: 83, color: "emerald" },
    { label: "Draft", count: 128, pct: 7, color: "amber" },
    { label: "Pending Review", count: 82, pct: 4, color: "sky" },
    { label: "Deprecated", count: 56, pct: 3, color: "rose" },
    { label: "Retired", count: 55, pct: 3, color: "gray" },
  ];

  const variantReadiness = [
    { label: "Ready", count: "1,284", pct: "69%", color: "emerald" },
    { label: "Partial", count: "312", pct: "17%", color: "amber" },
    { label: "Needs Work", count: "146", pct: "8%", color: "orange" },
    { label: "Not Ready", count: "100", pct: "5%", color: "rose" },
  ];

  const coverageSummary = [
    { label: "Excellent (90–100%)", count: "1,021", pct: "55%", barPct: 55, color: "emerald" },
    { label: "Good (70–89%)", count: "612", pct: "33%", barPct: 33, color: "sky" },
    { label: "Fair (50–69%)", count: "146", pct: "8%", barPct: 8, color: "amber" },
    { label: "Poor (<50%)", count: "63", pct: "3%", barPct: 3, color: "rose" },
  ];

  const queues = [
    { label: "Missing Required Values", count: 248, key: "missing", icon: AlertTriangle, color: "rose" },
    { label: "Invalid Combinations", count: 36, key: "invalid", icon: CheckCircle2, color: "rose" },
    { label: "Duplicate SKUs", count: 16, key: "skus", icon: Copy, color: "amber" },
    { label: "Duplicate Barcodes", count: 22, key: "barcodes", icon: Barcode, color: "amber" },
    { label: "Missing Media", count: 78, key: "media", icon: ImageOff, color: "amber" },
    { label: "Publication Blockers", count: 24, key: "blockers", icon: HelpCircle, color: "rose" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    sky: "bg-sky-500",
    rose: "bg-rose-500",
    orange: "bg-orange-500",
    gray: "bg-gray-400",
  };

  const textColorMap: Record<string, string> = {
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    sky: "text-sky-700",
    rose: "text-rose-600",
    orange: "text-orange-600",
    gray: "text-gray-500",
  };

  return (
    <div className="flex flex-col gap-3 text-xs">
      {/* 1. Overall Health */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-1.5 text-[11.5px]">
            <ShieldCheck size={13} className="text-[#741d35]" />
            Overall Attribute & Variant Health
          </h3>
        </div>

        <div className="flex items-center gap-3 mb-3">
          {/* Health donut */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="88, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-sm font-black text-gray-900 leading-tight">88</span>
              <span className="text-[8px] font-bold text-gray-400">/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start">
              Good
            </span>
            <p className="text-gray-400 text-[10px] leading-snug">
              Coverage and validation in good health.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100">
          {healthMetrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between text-[10.5px]">
              <span className="text-gray-600">{m.label}</span>
              <span className="font-bold text-gray-900">{m.pct}%</span>
            </div>
          ))}
        </div>

        <button className="text-[10.5px] font-bold text-[#741d35] hover:underline mt-2.5 text-left flex items-center gap-1">
          View full health dashboard <ChevronRight size={11} />
        </button>
      </div>

      {/* 2. Priority Alerts */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-[11.5px]">Priority Alerts</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700 flex items-center gap-0.5">
            View all <ChevronRight size={10} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {[
            { label: "Missing required attribute values", count: 248, risk: "High", color: "rose" },
            { label: "Invalid variant combinations", count: 36, risk: "High", color: "rose" },
            { label: "Duplicate SKUs detected", count: 16, risk: "Medium", color: "amber" },
            { label: "Duplicate barcodes detected", count: 22, risk: "Medium", color: "amber" },
            { label: "Products without default variant", count: 42, risk: "Medium", color: "amber" },
            { label: "Variant media missing", count: 78, risk: "Medium", color: "amber" },
            { label: "Channel publication blockers", count: 24, risk: "High", color: "rose" },
          ].map((alert, idx) => (
            <div
              key={idx}
              onClick={() => onSelectQueue(alert.label)}
              className="flex items-center justify-between p-1.5 rounded bg-gray-50 hover:bg-gray-100 border border-gray-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-1.5 pr-1 min-w-0">
                <AlertTriangle
                  size={11}
                  className={`shrink-0 ${alert.color === "rose" ? "text-rose-500" : "text-amber-500"}`}
                />
                <span className="text-[10.5px] text-gray-700 truncate" title={alert.label}>
                  {alert.label}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-1">
                <span className="font-bold text-gray-900 text-[10.5px]">{alert.count}</span>
                <span
                  className={`px-1 py-0.5 rounded text-[9px] font-bold ${
                    alert.color === "rose"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {alert.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Attribute Status Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-[11.5px]">Attribute Status Summary</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700">
            <ChevronRight size={10} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {statusSummary.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between items-center mb-0.5 text-[10.5px]">
                <span className="text-gray-600 font-medium">{s.label}</span>
                <span className={`font-bold ${textColorMap[s.color]}`}>{s.count.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colorMap[s.color]}`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-1 border-t border-gray-100 text-[10.5px]">
            <span className="text-gray-600 font-semibold">Total Attributes</span>
            <span className="font-bold text-gray-900">1,842</span>
          </div>
        </div>
        <button className="text-[10.5px] font-bold text-[#741d35] hover:underline mt-2 text-left">
          View status breakdown →
        </button>
      </div>

      {/* 4. Variant Readiness Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-[11.5px]">Variant Readiness Summary</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700">
            <ChevronRight size={10} />
          </button>
        </div>
        <div className="flex flex-col gap-1.5 text-[10.5px]">
          {variantReadiness.map((r) => (
            <div key={r.label} className="flex justify-between py-0.5 border-b border-gray-50 last:border-0">
              <span className="text-gray-600">{r.label}</span>
              <span className={`font-bold ${textColorMap[r.color]}`}>
                {r.count} ({r.pct})
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-1 border-t border-gray-100">
            <span className="text-gray-500 font-semibold">Total Combinations</span>
            <span className="font-bold text-gray-900">1,842</span>
          </div>
        </div>
        <button className="text-[10.5px] font-bold text-[#741d35] hover:underline mt-2 text-left">
          View variant readiness report →
        </button>
      </div>

      {/* 5. Attribute Coverage Summary */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-[11.5px]">Attribute Coverage Summary</h3>
          <button className="text-[10px] font-bold text-gray-400 hover:text-gray-700">
            <ChevronRight size={10} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {coverageSummary.map((c) => (
            <div key={c.label}>
              <div className="flex justify-between items-center mb-0.5 text-[10.5px]">
                <span className="text-gray-600">{c.label}</span>
                <span className={`font-bold ${textColorMap[c.color]}`}>
                  {c.count} ({c.pct})
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colorMap[c.color]}`}
                  style={{ width: `${c.barPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <button className="text-[10.5px] font-bold text-[#741d35] hover:underline mt-2 text-left">
          View coverage details →
        </button>
      </div>

      {/* 6. Quick Queues */}
      <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-[11.5px] flex items-center gap-1.5">
            <Zap size={12} className="text-[#741d35]" />
            Quick Queues
          </h3>
          <button className="text-[10px] font-bold text-[#741d35] hover:underline flex items-center gap-0.5">
            View all <ChevronRight size={10} />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {queues.map((q) => {
            const Icon = q.icon;
            return (
              <button
                key={q.key}
                onClick={() => onSelectQueue(q.key)}
                className="flex items-center justify-between p-1.5 rounded bg-gray-50 hover:bg-gray-100 border border-gray-100 cursor-pointer transition-colors text-left"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon
                    size={11}
                    className={`shrink-0 ${q.color === "rose" ? "text-rose-500" : "text-amber-500"}`}
                  />
                  <span className="text-[10.5px] text-gray-700 truncate">{q.label}</span>
                </div>
                <span className="font-black text-gray-900 text-[11px] ml-2 shrink-0">{q.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
