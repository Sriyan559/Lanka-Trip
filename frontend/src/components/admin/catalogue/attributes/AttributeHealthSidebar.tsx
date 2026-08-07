"use client";

import React from "react";
import { AlertTriangle, AlertCircle, FileWarning, Layers, CheckCircle2, Copy, XCircle, ImageOff, Box, Ban } from "lucide-react";
import { SharedCircularHealth, SharedHealthMetric } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function AttributeHealthSidebar() {
  const HEALTH_METRICS: SharedHealthMetric[] = [
    { label: "Completeness", value: "91%", color: "bg-[#059669]" },
    { label: "Validation", value: "92%", color: "bg-[#059669]" },
    { label: "Readiness", value: "86%", color: "bg-[#059669]" },
    { label: "Coverage", value: "89%", color: "bg-[#059669]" },
    { label: "Publication", value: "87%", color: "bg-[#059669]" },
  ];

  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "Missing required attribute values", count: "248", level: "High", icon: AlertTriangle },
    { id: 2, text: "Invalid variant combinations", count: "36", level: "High", icon: XCircle },
    { id: 3, text: "Duplicate SKUs detected", count: "16", level: "Medium", icon: Copy },
    { id: 4, text: "Duplicate barcodes detected", count: "22", level: "Medium", icon: Box },
    { id: 5, text: "Products without default variant", count: "42", level: "Medium", icon: FileWarning },
    { id: 6, text: "Variant media missing", count: "78", level: "Medium", icon: ImageOff },
    { id: 7, text: "Channel publication blockers", count: "24", level: "High", icon: Ban },
  ];

  const STATUS_SUMMARY: ProgressItem[] = [
    { label: "Active", value: "1,521", pct: 82, color: "bg-[#059669]" },
    { label: "Draft", value: "128", pct: 7, color: "bg-slate-400" },
    { label: "Pending Review", value: "82", pct: 4, color: "bg-[#0284c7]" },
    { label: "Deprecated", value: "56", pct: 3, color: "bg-[#ea580c]" },
    { label: "Retired", value: "55", pct: 3, color: "bg-[#dc2626]" },
  ];

  const READINESS_SUMMARY: ProgressItem[] = [
    { label: "Ready", value: "1,284", pct: 69, color: "bg-[#059669]" },
    { label: "Partial", value: "312", pct: 17, color: "bg-[#ea580c]" },
    { label: "Needs Work", value: "146", pct: 8, color: "bg-[#dc2626]" },
    { label: "Not Ready", value: "100", pct: 5, color: "bg-slate-400" },
  ];

  const COVERAGE_SUMMARY: ProgressItem[] = [
    { label: "Excellent (90-100%)", value: "1,021", pct: 55, color: "bg-[#059669]" },
    { label: "Good (70-89%)", value: "612", pct: 33, color: "bg-[#84cc16]" },
    { label: "Fair (50-69%)", value: "146", pct: 8, color: "bg-[#ea580c]" },
    { label: "Poor (<50%)", value: "63", pct: 3, color: "bg-[#dc2626]" },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Missing Required Values", count: "248", icon: AlertTriangle, color: "text-[#dc2626]" },
    { label: "Invalid Combinations", count: "36", icon: XCircle, color: "text-[#dc2626]" },
    { label: "Duplicate SKUs", count: "16", icon: Copy, color: "text-[#ea580c]" },
    { label: "Duplicate Barcodes", count: "22", icon: Box, color: "text-[#ea580c]" },
    { label: "Missing Media", count: "78", icon: ImageOff, color: "text-[#ea580c]" },
    { label: "Publication Blockers", count: "24", icon: Ban, color: "text-[#dc2626]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Overall Attribute & Variant Health"
        score={88}
        statusText="Good"
        linkText="View full health dashboard"
        layout="horizontal"
        metrics={HEALTH_METRICS}
      />

      <SharedPriorityAlerts 
        title="Priority Alerts"
        alerts={ALERTS}
        layout="list"
      />

      <div className="flex flex-col gap-6">
        <SharedProgressList 
          title="Attribute Status Summary"
          items={STATUS_SUMMARY}
          layout="vertical"
          footerText="View status breakdown"
        />

        <SharedProgressList 
          title="Variant Readiness Summary"
          items={READINESS_SUMMARY}
          layout="vertical"
          footerText="View variant readiness report"
        />

        <SharedProgressList 
          title="Attribute Coverage Summary"
          items={COVERAGE_SUMMARY}
          layout="vertical"
          footerText="View coverage details"
        />
      </div>

      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
      />
    </div>
  );
}
