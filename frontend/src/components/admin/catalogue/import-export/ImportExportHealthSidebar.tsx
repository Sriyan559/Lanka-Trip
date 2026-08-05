"use client";

import React from "react";
import { AlertCircle, Clock, Copy, ShieldAlert, FileWarning, ArrowRightLeft } from "lucide-react";
import { SharedCircularHealth, SharedHealthMetric } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function ImportExportHealthSidebar() {
  const HEALTH_METRICS: SharedHealthMetric[] = [
    { label: "File Validation", value: "98%", color: "bg-[#059669]" },
    { label: "Mapping Accuracy", value: "91%", color: "bg-[#059669]" },
    { label: "Approval Readiness", value: "88%", color: "bg-[#ea580c]" },
    { label: "Execution Control", value: "92%", color: "bg-[#059669]" },
    { label: "Reconciliation", value: "95%", color: "bg-[#059669]" },
    { label: "Export Reliability", value: "97%", color: "bg-[#059669]" },
    { label: "Audit Compliance", value: "99%", color: "bg-[#059669]" },
  ];

  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "Duplicate conflicts in IMP-8902", level: "High", icon: Copy },
    { id: 2, text: "Missing mapped fields for supplier feed", level: "High", icon: FileWarning },
    { id: 3, text: "Scheduled export failed", level: "Medium", icon: ShieldAlert },
    { id: 4, text: "Review required for rejected records", level: "Medium", icon: AlertCircle },
    { id: 5, text: "Approval pending for high-impact import", level: "Medium", icon: Clock },
  ];

  const IMPORT_SUMMARY: ProgressItem[] = [
    { label: "Draft", value: "185", pct: 15, color: "bg-slate-400" },
    { label: "Uploaded", value: "248", pct: 20, color: "bg-blue-500" },
    { label: "Validating", value: "312", pct: 25, color: "bg-blue-400" },
    { label: "Pending Approval", value: "48", pct: 5, color: "bg-amber-500" },
    { label: "Approved", value: "1,120", pct: 85, color: "bg-emerald-500" },
    { label: "Executed", value: "1,043", pct: 80, color: "bg-emerald-600" },
    { label: "Reconciled", value: "50", pct: 4, color: "bg-red-500" },
    { label: "Failed", value: "3,006", pct: 0, color: "bg-transparent" },
  ];

  const EXPORT_SUMMARY: ProgressItem[] = [
    { label: "Scheduled", value: "34", pct: 5, color: "bg-blue-500" },
    { label: "Running", value: "12", pct: 2, color: "bg-blue-400" },
    { label: "Delivered", value: "842", pct: 90, color: "bg-emerald-500" },
    { label: "Failed", value: "9", pct: 1, color: "bg-red-500" },
    { label: "Expired", value: "6", pct: 1, color: "bg-slate-400" },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Pending Review", count: "18", icon: Clock, color: "text-[#0284c7]" },
    { label: "Failed Jobs", count: "9", icon: ShieldAlert, color: "text-[#dc2626]" },
    { label: "Scheduled Exports", count: "34", icon: Clock, color: "text-[#0284c7]" },
    { label: "High Priority Alerts", count: "5", icon: FileWarning, color: "text-[#ea580c]" },
    { label: "Review Conflicts", count: "76", icon: Copy, color: "text-[#ea580c]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Data Operations Health"
        score={94}
        statusText="Excellent"
        linkText="View full health dashboard"
        layout="horizontal"
        metrics={HEALTH_METRICS}
      />

      <SharedPriorityAlerts 
        title="Priority Data Alerts"
        alerts={ALERTS}
        layout="list"
      />

      <SharedProgressList 
        title="Import Status Summary"
        items={IMPORT_SUMMARY}
        layout="horizontal"
      />

      <SharedProgressList 
        title="Export Status Summary"
        items={EXPORT_SUMMARY}
        layout="horizontal"
      />

      <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Processing Queue</h3>
        <div className="flex items-center justify-between">
           <div className="flex flex-col items-center">
              <span className="text-muted text-[10px] font-bold">Running Jobs</span>
              <span className="text-[20px] font-bold text-ink">32<span className="text-[12px] text-green-600 ml-1">↑</span></span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-muted text-[10px] font-bold">Waiting Jobs</span>
              <span className="text-[20px] font-bold text-ink">18</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-muted text-[10px] font-bold">Avg Runtime</span>
              <span className="text-[20px] font-bold text-ink">00:18:24</span>
           </div>
        </div>
      </div>

      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
      />
    </div>
  );
}
