"use client";

import React from "react";
import { AlertTriangle, Clock, FileWarning, HelpCircle } from "lucide-react";
import { SharedCircularHealth } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";

export function ProductApprovalsHealthSidebar() {
  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "12 Approvals SLA Breached", level: "High", icon: AlertTriangle },
    { id: 2, text: "8 Approvals Approaching SLA", level: "Medium", icon: Clock },
    { id: 3, text: "5 High Risk New Brands", level: "High", icon: FileWarning },
    { id: 4, text: "36 Missing Information", level: "Medium", icon: HelpCircle },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Urgent SLA Review", count: 12, icon: AlertTriangle },
    { label: "New Brand Approvals", count: 5, icon: FileWarning },
    { label: "Info Provided", count: 18, icon: HelpCircle },
    { label: "Price Changes", count: 14, icon: Clock },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="SLA Compliance Score"
        score={82}
        statusText="At Risk"
        linkText="View SLA performance metrics"
      />
      <SharedPriorityAlerts 
        title="Priority Alerts"
        alerts={ALERTS}
      />
      <div className="bg-white rounded-xl border border-line p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Approval Queue Summary</h3>
        <div className="flex flex-col gap-2">
           <div className="flex justify-between text-[11px]"><span className="text-muted">Total Pending</span><span className="font-bold text-ink">84</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Avg Wait Time</span><span className="font-bold text-ink">4.2 Hours</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Oldest Request</span><span className="font-bold text-[#dc2626]">3 Days</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Assigned To Me</span><span className="font-bold text-[#059669]">12</span></div>
        </div>
      </div>
      <SharedQuickQueues 
        title="Quick Action Queues"
        queues={QUEUES}
      />
    </div>
  );
}
