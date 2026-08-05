"use client";

import React from "react";
import { Clock, AlertTriangle, ImageMinus, Copy, ShieldAlert, CircleAlert } from "lucide-react";
import { SharedCircularHealth } from "../shared/SharedCircularHealth";
import { SharedPriorityAlerts, PriorityAlert } from "../shared/SharedPriorityAlerts";
import { SharedProgressList, ProgressItem } from "../shared/SharedProgressList";

export function IntelligenceSidebar() {
  const ALERTS: PriorityAlert[] = [
    { id: 1, text: "312 Products Pending Approval", subtext: "Waiting for final review", level: "High", icon: Clock },
    { id: 2, text: "248 Incomplete Records", subtext: "Missing critical identity data", level: "High", icon: AlertTriangle },
    { id: 3, text: "124 Missing Required Media", subtext: "No primary image found", level: "Medium", icon: ImageMinus },
    { id: 4, text: "36 Duplicate Risks", subtext: "Potential SKU/Barcode clash", level: "Medium", icon: Copy },
  ];

  const STATUS_SUMMARY: ProgressItem[] = [
    { label: "Active", pct: 85, value: "10,962", color: "bg-[#059669]" },
    { label: "Draft", pct: 4, value: "486", color: "bg-[#d97706]" },
    { label: "Pending Approval", pct: 2, value: "312", color: "bg-[#3b82f6]" },
    { label: "Approved", pct: 79, value: "10,150", color: "bg-[#0d9488]" },
    { label: "Published", pct: 72, value: "9,246", color: "bg-[#8b5cf6]" },
    { label: "Blocked", pct: 0.2, value: "28", color: "bg-[#ef4444]" },
  ];

  const COMPLETENESS_SUMMARY: ProgressItem[] = [
    { label: "Identity", pct: 98, color: "bg-[#059669]" },
    { label: "Classification", pct: 94, color: "bg-[#059669]" },
    { label: "Brand", pct: 96, color: "bg-[#059669]" },
    { label: "Compliance", pct: 89, color: "bg-[#059669]" },
    { label: "Variant", pct: 91, color: "bg-[#059669]" },
    { label: "Media", pct: 84, color: "bg-[#d97706]" },
  ];

  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. Overall Health */}
      <SharedCircularHealth 
        title="Overall Product Master Health"
        score={90}
        statusText="Stable"
        linkText="View full health dashboard"
      />

      {/* 2. Priority Product Alerts */}
      <SharedPriorityAlerts 
        title="Priority Product Alerts"
        alerts={ALERTS}
      />

      {/* 3. Product Status Summary */}
      <SharedProgressList 
        title="Product Status Summary"
        items={STATUS_SUMMARY}
        layout="vertical"
      />

      {/* 4. Completeness Summary */}
      <SharedProgressList 
        title="Completeness Summary"
        items={COMPLETENESS_SUMMARY}
        layout="horizontal"
      />

      {/* 5. Publication Risk Summary */}
      <div className="bg-white rounded-xl border border-line p-5 shadow-sm">
        <h3 className="text-[13px] font-bold text-ink mb-4">Publication Risk Summary</h3>
        <div className="flex flex-col gap-3">
           <div className="flex items-center justify-between p-3 rounded-lg border border-red-100 bg-red-50">
              <div className="flex items-center gap-2">
                 <CircleAlert size={14} className="text-red-500" />
                 <span className="text-[11px] font-bold text-red-700">High Risk</span>
              </div>
              <span className="text-[12px] font-bold text-red-700">124</span>
           </div>
           <div className="flex items-center justify-between p-3 rounded-lg border border-orange-100 bg-orange-50">
              <div className="flex items-center gap-2">
                 <ShieldAlert size={14} className="text-orange-500" />
                 <span className="text-[11px] font-bold text-orange-700">Medium Risk</span>
              </div>
              <span className="text-[12px] font-bold text-orange-700">312</span>
           </div>
           <div className="flex items-center justify-between p-3 rounded-lg border border-green-100 bg-green-50">
              <div className="flex items-center gap-2">
                 <ShieldAlert size={14} className="text-green-500" />
                 <span className="text-[11px] font-bold text-green-700">Low Risk</span>
              </div>
              <span className="text-[12px] font-bold text-green-700">9,246</span>
           </div>
        </div>
      </div>

    </div>
  );
}
