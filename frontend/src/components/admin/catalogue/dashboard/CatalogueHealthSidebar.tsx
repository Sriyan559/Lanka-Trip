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
    { id: 1, text: "High-risk authenticity review required", level: "High", icon: ShieldAlert, href: "/admin/catalogue/approvals" },
    { id: 2, text: "Approval SLA breached", level: "High", icon: Clock, href: "/admin/catalogue/approvals?priority=sla" },
    { id: 3, text: "Near-expiry inventory exposure", level: "Medium", icon: AlertCircle, href: "/admin/catalogue/inventory?status=near-expiry" },
    { id: 4, text: "Duplicate product candidates detected", level: "Medium", icon: Copy, href: "/admin/catalogue/quality?type=duplicate" },
    { id: 5, text: "Missing mandatory product media", level: "Medium", icon: AlertCircle, href: "/admin/catalogue/media?status=missing" },
    { id: 6, text: "Recalled stock linked to active listings", level: "High", icon: PackageX, href: "/admin/catalogue/inventory?status=recalled" },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Pending Product Approvals", count: 312, icon: Clock, href: "/admin/catalogue/approvals" },
    { label: "High-Risk Products", count: 46, icon: ShieldAlert, href: "/admin/catalogue/products?risk=high" },
    { label: "Missing Information", count: 124, icon: AlertCircle, href: "/admin/catalogue/quality?type=missing-info" },
    { label: "Duplicate Risks", count: 36, icon: Copy, href: "/admin/catalogue/quality?type=duplicate" },
    { label: "Near-Expiry Batches", count: 42, icon: Clock, href: "/admin/catalogue/inventory?status=near-expiry" },
    { label: "Publication Blockers", count: 22, icon: PackageX, href: "/admin/catalogue/quality?type=blocker" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Catalogue Health"
        score={89}
        statusText="Stable"
        linkText="View full health dashboard"
        href="/admin/catalogue/quality"
        layout="horizontal"
        metrics={HEALTH_METRICS}
      />

      <SharedPriorityAlerts 
        title="Priority Catalogue Alerts"
        alerts={ALERTS}
        layout="list"
        viewAllHref="/admin/catalogue/quality"
      />

      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
        viewAllHref="/admin/catalogue/quality"
      />
    </div>
  );
}
