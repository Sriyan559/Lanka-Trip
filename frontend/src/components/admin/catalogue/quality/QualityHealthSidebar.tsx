"use client";

import React from "react";
import { AlertTriangle, AlertCircle, Info, Clock, CheckCircle2, Ban, ImageMinus, Activity } from "lucide-react";
import { SharedCircularHealth, SharedHealthMetric } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function QualityHealthSidebar() {
  const HEALTH_METRICS: SharedHealthMetric[] = [
    { label: "Duplicate Control", value: "86%", color: "bg-[#059669]" },
    { label: "Data Completeness", value: "82%", color: "bg-[#059669]" },
    { label: "Validation Coverage", value: "91%", color: "bg-[#059669]" },
    { label: "Resolution Efficiency", value: "84%", color: "bg-[#059669]" },
    { label: "Audit Compliance", value: "97%", color: "bg-[#059669]" },
  ];

  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "Duplicate barcode cluster detected", count: "24", level: "High", icon: AlertTriangle },
    { id: 2, text: "High-risk incomplete safety fields", count: "19", level: "Medium", icon: AlertCircle },
    { id: 3, text: "Publication blocker affecting mobile app", count: "14", level: "High", icon: Ban },
    { id: 4, text: "Unresolved merge approval pending", count: "12", level: "Medium", icon: Clock },
    { id: 5, text: "Recurring classification mismatch", count: "9", level: "Medium", icon: Info },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Assigned to Me", count: "12", icon: CheckCircle2, color: "text-[#0284c7]" },
    { label: "Critical Issues", count: "42", icon: AlertTriangle, color: "text-[#dc2626]" },
    { label: "Pending Merge Review", count: "18", icon: Clock, color: "text-[#ea580c]" },
    { label: "Publication Blocked", count: "26", icon: Ban, color: "text-[#dc2626]" },
    { label: "Missing Mandatory Media", count: "124", icon: ImageMinus, color: "text-slate-600" },
  ];

  const SEVERITY_SUMMARY: ProgressItem[] = [
    { label: "Critical", value: "42", pct: 15, color: "bg-[#dc2626]" },
    { label: "High", value: "186", pct: 35, color: "bg-[#ea580c]" },
    { label: "Medium", value: "682", pct: 80, color: "bg-[#f59e0b]" },
    { label: "Low", value: "338", pct: 50, color: "bg-[#059669]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Quality Operations Health"
        score={89}
        statusText="Good"
        linkText="View full health dashboard"
        layout="horizontal"
        metrics={HEALTH_METRICS}
      />

      <SharedPriorityAlerts 
        title="Priority Quality Alerts"
        alerts={ALERTS}
        layout="list"
      />

      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
      />

      <SharedProgressList 
        title="Severity Summary"
        items={SEVERITY_SUMMARY}
        layout="horizontal"
      />

      {/* Duplicate Summary */}
      <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Duplicate Summary</h3>
        <div className="flex flex-col gap-2.5">
          {[
            { label: "Product Candidates", count: "186" },
            { label: "SKU Conflicts", count: "58" },
            { label: "Barcode Conflicts", count: "24" },
            { label: "Potential Duplicates", count: "164" },
            { label: "Merged This Month", count: "64", highlight: true },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between text-[11px] ${item.highlight ? 'pt-2 mt-1 border-t border-line' : ''}`}>
               <span className={`font-semibold ${item.highlight ? 'text-ink' : 'text-muted'}`}>{item.label}</span>
               <span className="font-bold text-ink">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SLA Summary */}
      <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">SLA Summary</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px]">
             <div className="flex items-center gap-2"><Clock size={14} className="text-[#dc2626]" /> <span className="font-semibold text-muted">SLA Breaches</span></div>
             <span className="font-bold text-ink">17</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
             <div className="flex items-center gap-2"><AlertTriangle size={14} className="text-[#ea580c]" /> <span className="font-semibold text-muted">At Risk (Next 24h)</span></div>
             <span className="font-bold text-ink">28</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
             <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#059669]" /> <span className="font-semibold text-muted">SLA Met</span></div>
             <div className="flex items-center gap-2">
               <span className="font-bold text-ink">1,020</span>
               <span className="text-[9px] font-bold text-muted">(81.7%)</span>
             </div>
          </div>
          <div className="pt-2 mt-1 border-t border-line flex items-center justify-between text-[11px]">
             <span className="font-bold text-ink flex items-center gap-2"><Activity size={14} className="text-ink" /> SLA Compliance</span>
             <span className="font-bold text-ink">89.3%</span>
          </div>
        </div>
      </div>

    </div>
  );
}
