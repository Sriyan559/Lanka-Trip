"use client";

import React from "react";
import { CircleSlash, FileWarning, HelpCircle, Combine, AlertTriangle } from "lucide-react";
import { SharedCircularHealth } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedQuickQueues, QuickQueue } from "../shared/SharedQuickQueues";

export function CategoryHealthSidebar() {
  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "22 Uncategorized Products", level: "High", icon: CircleSlash },
    { id: 2, text: "6 Duplicate Candidates", level: "Medium", icon: Combine },
    { id: 3, text: "9 Channel Conflicts", level: "Medium", icon: AlertTriangle },
    { id: 4, text: "12 Compliance Gaps", level: "Medium", icon: FileWarning },
  ];

  const QUEUES: QuickQueue[] = [
    { label: "Uncategorized", count: 22, icon: CircleSlash },
    { label: "Duplicate Review", count: 6, icon: Combine },
    { label: "Attribute Gaps", count: 18, icon: HelpCircle },
    { label: "Compliance Review", count: 12, icon: FileWarning },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SharedCircularHealth 
        title="Taxonomy Health"
        score={90}
        statusText="Healthy"
        linkText="View full health dashboard"
      />
      <SharedPriorityAlerts 
        title="Priority Alerts"
        alerts={ALERTS}
      />
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Hierarchy Summary</h3>
        <div className="flex flex-col gap-2">
           <div className="flex justify-between text-[11px]"><span className="text-muted">Max Depth</span><span className="font-bold text-ink">5 Levels</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Avg Products/Category</span><span className="font-bold text-ink">245</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Leaf Categories</span><span className="font-bold text-ink">84</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Review Required</span><span className="font-bold text-ink">14</span></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Governance Summary</h3>
        <div className="flex flex-col gap-2">
           <div className="flex justify-between text-[11px]"><span className="text-muted">Approved Editors</span><span className="font-bold text-ink">4</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Pending Approvals</span><span className="font-bold text-ink">12</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Last Audit</span><span className="font-bold text-ink">2 Days Ago</span></div>
           <div className="flex justify-between text-[11px]"><span className="text-muted">Taxonomy Sync</span><span className="font-bold text-[#059669]">Success</span></div>
        </div>
      </div>
      <SharedQuickQueues 
        title="Quick Queues"
        queues={QUEUES}
      />
    </div>
  );
}
