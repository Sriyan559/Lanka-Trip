"use client";

import React from "react";
import { AlertTriangle, AlertCircle, FileWarning, Layers, CheckCircle2, Copy } from "lucide-react";
import { SharedCircularHealth, SharedHealthMetric } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function AttributeHealthSidebar() {
  const TAXONOMY_METRICS: SharedHealthMetric[] = [
    { label: "Normalization Rate", value: "94%", color: "bg-[#059669]" },
    { label: "Mapping Completion", value: "98%", color: "bg-[#059669]" },
    { label: "Variant Consistency", value: "88%", color: "bg-[#ea580c]" },
    { label: "Category Coverage", value: "100%", color: "bg-[#059669]" },
  ];

  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "Orphaned custom attributes", count: "14", level: "High", icon: FileWarning },
    { id: 2, text: "Mismatched variant types", count: "8", level: "High", icon: AlertTriangle },
    { id: 3, text: "Duplicate value mappings", count: "22", level: "Medium", icon: Copy },
    { id: 4, text: "Missing mandatory attributes", count: "48", level: "Medium", icon: AlertCircle },
    { id: 5, text: "Unused attribute sets", count: "3", level: "Low", icon: Layers },
  ];

  const GROUPS: ProgressItem[] = [
    { label: "Skincare", value: "124", pct: 26, color: "bg-slate-400" },
    { label: "Makeup", value: "118", pct: 24, color: "bg-slate-400" },
    { label: "Haircare", value: "82", pct: 17, color: "bg-slate-400" },
    { label: "Fragrance", value: "46", pct: 10, color: "bg-slate-400" },
    { label: "Bath & Body", value: "64", pct: 13, color: "bg-slate-400" },
    { label: "Others", value: "48", pct: 10, color: "bg-slate-400" },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Pending Value Normalization", count: "24", icon: CheckCircle2, color: "text-[#0284c7]" },
    { label: "Review Variant Conflicts", count: "8", icon: AlertTriangle, color: "text-[#ea580c]" },
    { label: "Merge Duplicate Values", count: "12", icon: Copy, color: "text-[#0284c7]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Taxonomy Health"
        score={92}
        statusText="Stable"
        linkText="View full taxonomy report"
        layout="horizontal"
        metrics={TAXONOMY_METRICS}
      />

      <SharedPriorityAlerts 
        title="Priority Alerts"
        alerts={ALERTS}
        layout="list"
      />

      <SharedProgressList 
        title="Attribute Groups"
        items={GROUPS}
        layout="horizontal"
      />

      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
      />
    </div>
  );
}
