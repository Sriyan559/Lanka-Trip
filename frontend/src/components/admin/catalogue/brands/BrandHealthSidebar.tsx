"use client";

import React from "react";
import { AlertTriangle, XCircle, AlertCircle, Clock, CheckCircle2, Copy, UserX, Ban, Archive, HelpCircle } from "lucide-react";
import { SharedCircularHealth, SharedHealthMetric } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function BrandHealthSidebar() {
  const HEALTH_METRICS: SharedHealthMetric[] = [
    { label: "Verification Coverage", value: "92%", color: "bg-[#059669]" },
    { label: "Authorization Readiness", value: "76%", color: "bg-[#ea580c]" },
    { label: "Supplier Mapping", value: "85%", color: "bg-[#059669]" },
    { label: "Compliance", value: "89%", color: "bg-[#059669]" },
    { label: "Product Coverage", value: "82%", color: "bg-[#059669]" },
  ];

  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "Expiring authorizations (within 30 days)", count: "12", level: "High", icon: Clock },
    { id: 2, text: "Unauthorized brand use detected", count: "5", level: "High", icon: AlertTriangle },
    { id: 3, text: "Missing owner mapping", count: "12", level: "Medium", icon: UserX },
    { id: 4, text: "Duplicate brand candidates", count: "14", level: "Medium", icon: Copy },
    { id: 5, text: "Channel eligibility conflicts", count: "7", level: "Medium", icon: Ban },
    { id: 6, text: "Compliance gaps requiring attention", count: "8", level: "Low", icon: AlertCircle },
    { id: 7, text: "Brand recall watch", count: "3", level: "Low", icon: AlertCircle },
  ];

  const STATUS_SUMMARY: QuickQueue[] = [
    { label: "Active Brands", count: "438", icon: CheckCircle2, color: "text-[#059669]" },
    { label: "Pending Verification", count: "24", icon: Clock, color: "text-[#0284c7]" },
    { label: "Conditional Authorization", count: "18", icon: AlertTriangle, color: "text-[#ea580c]" },
    { label: "Unauthorized Use", count: "9", icon: HelpCircle, color: "text-[#dc2626]" },
    { label: "Expired Authorizations", count: "6", icon: XCircle, color: "text-[#dc2626]" },
    { label: "Archived Brands", count: "16", icon: Archive, color: "text-slate-500" },
  ];

  const AUTH_SUMMARY: QuickQueue[] = [
    { label: "Valid Authorizations", count: "312", icon: CheckCircle2, color: "text-[#059669]" },
    { label: "Expiring (≤ 30 days)", count: "18", icon: Clock, color: "text-[#ea580c]" },
    { label: "Expired Authorizations", count: "6", icon: XCircle, color: "text-[#dc2626]" },
    { label: "Pending Authorization", count: "34", icon: Clock, color: "text-slate-400" },
    { label: "Conditional Authorization", count: "18", icon: AlertTriangle, color: "text-[#ea580c]" },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Pending Verification", count: "24", icon: CheckCircle2, color: "text-[#0284c7]" },
    { label: "Conditional Review", count: "18", icon: AlertTriangle, color: "text-[#ea580c]" },
    { label: "Authorization Review", count: "24", icon: Clock, color: "text-[#ea580c]" },
    { label: "Duplicate Review", count: "14", icon: Copy, color: "text-[#0284c7]" },
    { label: "Unauthorized Use Cases", count: "9", icon: HelpCircle, color: "text-[#dc2626]" },
  ];

  const SUPPLIER_COVERAGE: ProgressItem[] = [
    { label: "Mapped Suppliers", value: "214", pct: 100, color: "bg-[#059669]" },
    { label: "Unmapped Brands", value: "12", pct: 10, color: "bg-[#dc2626]" },
    { label: "Supplier Coverage", value: "83%", pct: 83, color: "bg-[#0284c7]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Brand Catalogue Health"
        score={89}
        statusText="Stable"
        linkText="View full health dashboard"
        layout="horizontal"
        metrics={HEALTH_METRICS}
      />

      <SharedPriorityAlerts 
        title="Priority Brand Alerts"
        alerts={ALERTS}
        layout="list"
      />

      <SharedQuickQueues 
        title="Brand Status Summary"
        queues={STATUS_SUMMARY}
        viewAllText="View status breakdown"
      />

      <SharedQuickQueues 
        title="Authorization Summary"
        queues={AUTH_SUMMARY}
        viewAllText="View authorization report"
      />

      <SharedProgressList 
        title="Supplier Coverage Summary"
        items={SUPPLIER_COVERAGE}
        layout="vertical"
      />

      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
      />
    </div>
  );
}
