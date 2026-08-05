"use client";

import React from "react";
import { AlertCircle, Clock, Copy, ShieldAlert, PackageX } from "lucide-react";
import { SharedCircularHealth, SharedHealthMetric } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";

export function CatalogueHealthSidebar() {
  const HEALTH_METRICS: SharedHealthMetric[] = [
    { label: "Completeness", value: "91%" },
    { label: "Approval Efficiency", value: "86%" },
    { label: "Data Quality", value: "87%" },
    { label: "Media Readiness", value: "84%" },
    { label: "Compliance", value: "89%" },
  ];

  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "High-risk authenticity review required", level: "High", icon: ShieldAlert },
    { id: 2, text: "Approval SLA breached", level: "High", icon: Clock },
    { id: 3, text: "Near-expiry inventory exposure", level: "Medium", icon: AlertCircle },
    { id: 4, text: "Duplicate product candidates detected", level: "Medium", icon: Copy },
    { id: 5, text: "Missing mandatory product media", level: "Medium", icon: AlertCircle },
    { id: 6, text: "Recalled stock linked to active listings", level: "High", icon: PackageX },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Pending Product Approvals", count: 312, icon: Clock },
    { label: "High-Risk Products", count: 46, icon: ShieldAlert },
    { label: "Missing Information", count: 124, icon: AlertCircle },
    { label: "Duplicate Risks", count: 36, icon: Copy },
    { label: "Near-Expiry Batches", count: 42, icon: Clock },
    { label: "Publication Blockers", count: 22, icon: PackageX },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Catalogue Health"
        score={89}
        statusText="Stable"
        linkText="View full health dashboard"
        layout="horizontal"
        metrics={HEALTH_METRICS}
      />

      <SharedPriorityAlerts 
        title="Priority Catalogue Alerts"
        alerts={ALERTS}
        layout="list"
      />

      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
      />
    </div>
  );
}
